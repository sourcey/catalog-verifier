import { basename } from "node:path";
import { z } from "zod";
import { agentReadinessDigestSchema, agentReadinessProfileIdSchema, agentReadinessProjectionSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { catalogEventSchema } from "../../../contracts/events/src/index.js";
import { observationSchema } from "../../../contracts/observations/src/index.js";
import { deriveAgentReadinessReprojection, regradeAgentReadinessProjection, } from "../../agent-readiness-policy/src/index.js";
import { validateProtectedEvent } from "../../authority/src/index.js";
import { compareCanonicalStrings, digest } from "../../primitives/src/index.js";
import { buildEventGraph } from "../../provenance/src/index.js";
import { mergeCanonicalById } from "./evidence-admission.js";
export const AGENT_READINESS_REGRADE_EVIDENCE_PREFIX = "agent-readiness-regrade-evidence/";
/**
 * Exact evidence context for reprojection of an existing revision. New events
 * still require ordinary release admission; these bytes only close the graph
 * beside the prior projection for independent offline recomputation.
 */
export const agentReadinessRegradeEvidenceSchema = z
    .object({
    evidence_contract: z.literal("sourcey.agent-readiness-regrade-evidence/v1alpha1"),
    agent_readiness_profile_id: agentReadinessProfileIdSchema,
    revision_digest: agentReadinessDigestSchema,
    events: z.array(catalogEventSchema).min(1),
    observations: z.array(observationSchema),
})
    .strict();
/**
 * Select the changed evidence owned by one exact Agent Readiness revision.
 * A Catalog delta is not a complete event graph: unrelated transitions may
 * target immutable objects retained by the parent release.
 */
export function selectAgentReadinessEvidenceChanges(input) {
    const events = input.events.filter((event) => event.subject.subject_type === "agent_readiness_profile" &&
        event.subject.agent_readiness_profile_id === input.profileId &&
        event.subject.revision_digest === input.revisionDigest);
    const observationIds = new Set(events.flatMap((event) => {
        if (event.kind !== "evidence.bound")
            return [];
        const observationId = event.payload.observation_id;
        return typeof observationId === "string" ? [observationId] : [];
    }));
    return {
        events,
        observations: input.observations.filter((observation) => observationIds.has(observation.observation_id)),
    };
}
/**
 * Select, from the resolved closure, exactly the events and observations one
 * regrade is projected from: the prior projection's basis events, every event
 * on the same revision, and every event that invalidates one of those.
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
    const observationIds = new Set(events.flatMap((event) => {
        if (event.kind !== "evidence.bound")
            return [];
        const observationId = event.payload.observation_id;
        return typeof observationId === "string" ? [observationId] : [];
    }));
    const observations = input.observations
        .filter((observation) => observationIds.has(observation.observation_id))
        .sort((left, right) => compareCanonicalStrings(left.observation_id, right.observation_id));
    const missingObservations = [...observationIds].filter((observationId) => !observations.some((observation) => observation.observation_id === observationId));
    if (missingObservations.length > 0) {
        throw new Error(`Agent Readiness regrade ${input.profileId} cannot resolve observations ${missingObservations.join(", ")}.`);
    }
    return agentReadinessRegradeEvidenceSchema.parse({
        evidence_contract: "sourcey.agent-readiness-regrade-evidence/v1alpha1",
        agent_readiness_profile_id: input.profileId,
        revision_digest: input.revision.revision_digest,
        events,
        observations,
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
    return buildEventGraph(input.evidence.events, input.evidence.observations);
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
        validateProtectedEvent(event, input.registry, input.releaseSequence);
    }
    for (const observation of evidence.observations) {
        const { observation_id: observationId, ...core } = observation;
        if (digest(core) !== observationId) {
            throw new Error(`Catalog delta regrade evidence ${input.path} observation is not content-addressed.`);
        }
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
                events: mergeCanonicalById(input.evidence.events, input.deltaEvidence.events, "event", (event) => event.event_id),
                observations: mergeCanonicalById(input.evidence.observations, input.deltaEvidence.observations, "observation", (observation) => observation.observation_id),
            }),
            revision: input.revision,
            priorProjection,
        })
        : buildEventGraph(input.deltaEvidence.events, input.deltaEvidence.observations);
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
        freshnessPolicy: input.freshnessPolicy,
    });
}
//# sourceMappingURL=agent-readiness-regrade-evidence.js.map