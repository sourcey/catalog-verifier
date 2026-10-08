import { basename } from "node:path";
import { compareCanonicalStrings } from "provenry/primitives";
import { z } from "zod";
import { agentReadinessDigestSchema, agentReadinessProfileIdSchema, agentReadinessProjectionSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { catalogEventSchema } from "../../../contracts/events/src/index.js";
import { deriveAgentReadinessReprojection, regradeAgentReadinessProjection, } from "../../agent-readiness-policy/src/index.js";
import { validateProtectedEvent } from "../../authority/src/index.js";
import { buildEventGraph } from "../../provenance/src/index.js";
import { mergeCanonicalById } from "./evidence-admission.js";
export const AGENT_READINESS_REGRADE_EVIDENCE_PREFIX = "agent-readiness-regrade-evidence/";
/**
 * Exact standing context for reprojection of an existing revision: the events
 * its dispute and attestation state rest on. New events still require ordinary
 * release admission; these bytes only close the graph beside the prior
 * projection for independent offline recomputation. Ratings rest on the
 * revision's own steps and need no evidence here.
 */
export const agentReadinessRegradeEvidenceSchema = z
    .object({
    evidence_contract: z.literal("sourcey.agent-readiness-regrade-evidence/v1alpha1"),
    agent_readiness_profile_id: agentReadinessProfileIdSchema,
    revision_digest: agentReadinessDigestSchema,
    events: z.array(catalogEventSchema).min(1),
})
    .strict();
/**
 * Select the changed events owned by one exact Agent Readiness revision.
 * A Catalog delta is not a complete event graph: unrelated transitions may
 * target immutable objects retained by the parent release.
 */
export function selectAgentReadinessEvidenceChanges(input) {
    return input.events.filter((event) => event.subject.subject_type === "agent_readiness_profile" &&
        event.subject.agent_readiness_profile_id === input.profileId &&
        event.subject.revision_digest === input.revisionDigest);
}
/**
 * Select, from the resolved closure, exactly the events one regrade is
 * projected from: the prior projection's basis events, every event on the same
 * revision, and every event that invalidates one of those.
 */
export function selectAgentReadinessRegradeEvidence(input) {
    const included = new Set(input.priorProjection.provenance.basis_event_ids);
    for (const event of input.events) {
        if (event.subject.revision_digest === input.revision.revision_digest) {
            included.add(event.event_id);
        }
    }
    for (const event of input.events) {
        const target = event.payload.target_event_id;
        if (typeof target === "string" && included.has(target))
            included.add(event.event_id);
    }
    const events = input.events
        .filter((event) => included.has(event.event_id))
        .sort((left, right) => compareCanonicalStrings(left.event_id, right.event_id));
    const missing = [...included].filter((eventId) => !events.some((event) => event.event_id === eventId));
    if (missing.length > 0) {
        throw new Error(`Agent Readiness regrade ${input.profileId} cannot resolve basis events ${missing.join(", ")}.`);
    }
    return agentReadinessRegradeEvidenceSchema.parse({
        evidence_contract: "sourcey.agent-readiness-regrade-evidence/v1alpha1",
        agent_readiness_profile_id: input.profileId,
        revision_digest: input.revision.revision_digest,
        events,
    });
}
/** The evidence must close the prior projection exactly before it can rebuild its graph. */
export function verifyAgentReadinessRegradeEvidence(input) {
    const profileId = input.priorProjection.agent_readiness_profile_id;
    if (input.evidence.agent_readiness_profile_id !== profileId ||
        input.evidence.revision_digest !== input.revision.revision_digest) {
        throw new Error(`Agent Readiness regrade evidence does not address ${profileId}.`);
    }
    const eventIds = new Set(input.evidence.events.map((event) => event.event_id));
    const missing = input.priorProjection.provenance.basis_event_ids.filter((eventId) => !eventIds.has(eventId));
    if (missing.length > 0) {
        throw new Error(`Agent Readiness regrade ${profileId} evidence omits basis events ${missing.join(", ")}.`);
    }
    for (const event of input.evidence.events) {
        if (event.subject.revision_digest !== undefined &&
            event.subject.revision_digest !== input.revision.revision_digest &&
            !input.priorProjection.provenance.basis_event_ids.includes(event.event_id)) {
            throw new Error(`Agent Readiness regrade ${profileId} evidence carries foreign event ${event.event_id}.`);
        }
    }
    return buildEventGraph(input.evidence.events, []);
}
/**
 * Read one shipped regrade evidence file. Retained evidence re-verifies every
 * event signature against the release-pinned registry at this release's
 * sequence; it admits nothing and carries no inclusion record.
 */
export function readAgentReadinessRegradeEvidenceFile(input) {
    const evidence = agentReadinessRegradeEvidenceSchema.parse(JSON.parse(input.bytes.toString("utf8")));
    const address = basename(input.path, ".json");
    if (evidence.agent_readiness_profile_id !== address) {
        throw new Error(`Catalog delta regrade evidence ${input.path} is not addressed correctly.`);
    }
    for (const event of evidence.events) {
        const registry = input.registries.get(event.protected.signer_registry_digest);
        if (!registry) {
            throw new Error(`Catalog delta regrade event ${event.event_id} names a registry outside the trusted history.`);
        }
        validateProtectedEvent(event, registry, input.releaseSequence);
    }
    return [address, evidence];
}
/** Every shipped evidence file must belong to exactly one policy regrade object. */
export function assertAgentReadinessRegradeEvidenceClosure(evidence, objects) {
    for (const profileId of evidence.keys()) {
        const object = objects.get(profileId);
        if (!object ||
            object.profile_input !== null ||
            !object.projection ||
            !object.prior_projection) {
            throw new Error(`Catalog delta carries regrade evidence for non-regrade ${profileId}.`);
        }
    }
}
/** The canonical projection a policy-only regrade object must equal. */
export function expectedAgentReadinessRegradeProjection(input) {
    if (!input.object.prior_projection) {
        throw new Error(`Agent Readiness regrade ${input.profileId} lacks its exact prior projection.`);
    }
    const priorProjection = agentReadinessProjectionSchema.parse(input.object.prior_projection);
    if (input.evidence) {
        // Validate the supplied context before selecting from it. Selection must not
        // silently discard a foreign profile, revision or event from the archive.
        verifyAgentReadinessRegradeEvidence({
            evidence: input.evidence,
            revision: input.revision,
            priorProjection,
        });
    }
    const graph = input.evidence
        ? verifyAgentReadinessRegradeEvidence({
            // A retained context may not hide a newly admitted retraction. Merge
            // the verified successor graph before selecting this profile's closure.
            evidence: selectAgentReadinessRegradeEvidence({
                profileId: input.profileId,
                revision: input.revision,
                priorProjection,
                events: mergeCanonicalById(input.evidence.events, input.deltaEvents, "event", (event) => event.event_id),
            }),
            revision: input.revision,
            priorProjection,
        })
        : buildEventGraph(input.deltaEvents, []);
    const reproject = input.evidence
        ? regradeAgentReadinessProjection
        : deriveAgentReadinessReprojection;
    return reproject({
        currentProjection: input.current,
        revision: input.revision,
        declarationRevision: input.declarationRevision,
        authorityEntityRevision: input.entityRevision,
        priorProjection,
        graph,
        entitySlug: input.entitySlug,
        policy: input.policy,
        policyAsOf: input.policyAsOf,
    });
}
//# sourceMappingURL=agent-readiness-regrade-evidence.js.map