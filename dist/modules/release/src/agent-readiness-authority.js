import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { canonicalJson, compareCanonicalStrings, digest, parseJsonFile, prettyJson, sha256Bytes, } from "provenry/primitives";
import { AGENT_READINESS_AUTHORITY_BUNDLE_CONTRACT, AGENT_READINESS_AUTHORITY_OBJECTS, agentReadinessAuthorityBundleCoreSchema, agentReadinessAuthorityBundleManifestSchema, agentReadinessProfileReleaseInputSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { catalogEventCoreSchema, catalogEventSchema, } from "../../../contracts/events/src/index.js";
import { compileAgentReadinessRevision, verifyAgentReadinessProfileInput, } from "../../agent-readiness-policy/src/index.js";
import { validateProtectedEvent } from "../../authority/src/index.js";
import { verifyBundleTree } from "./evidence-bundle-tree.js";
import { loadedAgentReadinessProfile } from "./inputs.js";
const READINESS_BUNDLE = "Agent Readiness authority bundle";
/**
 * The event that admits one revision: the automatic lane's decision that the
 * engine derived these ratings from exactly this input under this policy.
 */
export function agentReadinessAdmissionIntent(input) {
    const releaseInput = agentReadinessProfileReleaseInputSchema.parse(input.releaseInput);
    const profile = releaseInput.profile_input;
    const core = catalogEventCoreSchema.parse({
        event_contract: "sourcey.catalog-event/v1alpha1",
        kind: "agent-readiness-profile.admitted",
        issuer_id: input.issuerId,
        operation_id: input.operationId,
        subject: {
            subject_type: "agent_readiness_profile",
            entity_id: profile.entity_id,
            agent_readiness_profile_id: profile.agent_readiness_profile_id,
            revision_digest: compileAgentReadinessRevision(profile).revision_digest,
        },
        occurred_at: input.admittedAt,
        payload: {
            input_digest: digest(profile),
            relation_input_digests: [
                ...new Set(releaseInput.offer_relation_inputs.map((relation) => digest(relation))),
            ].sort(compareCanonicalStrings),
            policy_digest: input.policy.policy_digest,
            engine_digest: profile.engine.engine_digest,
        },
    });
    return { event_id: digest(core), core };
}
/**
 * A delta's new readiness input stands only on its one signed admission: an
 * event among the delta's own that is exactly what this release input earns
 * under this policy.
 */
export function assertAgentReadinessAdmitted(input) {
    const profile = input.releaseInput.profile_input;
    const revisionDigest = compileAgentReadinessRevision(profile).revision_digest;
    const admissions = input.events.filter((event) => event.kind === "agent-readiness-profile.admitted" &&
        event.subject.revision_digest === revisionDigest);
    const [event] = admissions;
    if (admissions.length !== 1 ||
        !event ||
        agentReadinessAdmissionIntent({
            releaseInput: input.releaseInput,
            policy: input.policy,
            issuerId: event.issuer_id,
            operationId: event.operation_id,
            admittedAt: event.occurred_at,
        }).event_id !== event.event_id) {
        throw new Error(`Agent Readiness profile ${profile.agent_readiness_profile_id} lacks its one exact admission.`);
    }
}
/**
 * Admit one verified revision as release authority: its ratings are
 * re-derived under the policy, the admission is signed by the evidence
 * issuer, and the bundle carries exactly the public release input and that
 * event.
 */
export async function materializeAgentReadinessAuthority(input) {
    const releaseInput = agentReadinessProfileReleaseInputSchema.parse(input.releaseInput);
    verifyAgentReadinessProfileInput({
        profileInput: releaseInput.profile_input,
        declarationRevision: releaseInput.declaration_revision,
        policy: input.policy,
    });
    const intent = agentReadinessAdmissionIntent({ ...input, releaseInput });
    const signed = await input.signer.signCatalogEvent({
        purpose: "catalog-evidence",
        core: intent.core,
        eventId: intent.event_id,
        signerRegistryDigest: input.targetRegistry.registry_digest,
    });
    const event = validateProtectedEvent({ ...intent.core, event_id: intent.event_id, protected: signed.protected }, input.targetRegistry, input.releaseSequence);
    const objects = new Map([
        [AGENT_READINESS_AUTHORITY_OBJECTS.releaseInput, Buffer.from(prettyJson(releaseInput))],
        [AGENT_READINESS_AUTHORITY_OBJECTS.admission, Buffer.from(prettyJson(event))],
    ]);
    const core = agentReadinessAuthorityBundleCoreSchema.parse({
        bundle_contract: AGENT_READINESS_AUTHORITY_BUNDLE_CONTRACT,
        agent_readiness_profile_id: releaseInput.profile_input.agent_readiness_profile_id,
        revision_digest: event.subject.revision_digest,
        release_input_digest: digest(releaseInput),
        admission_event_id: event.event_id,
        target_signer_registry_digest: input.targetRegistry.registry_digest,
        objects: Object.fromEntries([...objects].map(([path, bytes]) => [
            path,
            { sha256: sha256Bytes(bytes), bytes: bytes.byteLength },
        ])),
    });
    const manifest = agentReadinessAuthorityBundleManifestSchema.parse({
        ...core,
        bundle_digest: digest(core),
    });
    return {
        manifest,
        files: new Map([...objects, ["manifest.json", Buffer.from(prettyJson(manifest))]]),
        event,
    };
}
/** A bundle's exact bytes, each object matching its manifest and the manifest its digest. */
export async function readAgentReadinessAuthorityBundle(root) {
    const manifest = agentReadinessAuthorityBundleManifestSchema.parse(JSON.parse(await readFile(join(root, "manifest.json"), "utf8")));
    const { bundle_digest: bundleDigest, ...core } = manifest;
    if (digest(agentReadinessAuthorityBundleCoreSchema.parse(core)) !== bundleDigest) {
        throw new Error(`${READINESS_BUNDLE} is not content-addressed.`);
    }
    await verifyBundleTree(root, manifest.objects, READINESS_BUNDLE);
    const objects = new Map(await Promise.all(Object.keys(manifest.objects).map(async (path) => [path, await readFile(join(root, path))])));
    const releaseInput = agentReadinessProfileReleaseInputSchema.parse(parseJsonFile(objects, AGENT_READINESS_AUTHORITY_OBJECTS.releaseInput, READINESS_BUNDLE));
    const event = catalogEventSchema.parse(parseJsonFile(objects, AGENT_READINESS_AUTHORITY_OBJECTS.admission, READINESS_BUNDLE));
    if (digest(releaseInput) !== manifest.release_input_digest ||
        event.event_id !== manifest.admission_event_id ||
        releaseInput.profile_input.agent_readiness_profile_id !== manifest.agent_readiness_profile_id ||
        event.subject.revision_digest !== manifest.revision_digest) {
        throw new Error(`${READINESS_BUNDLE} manifest disagrees with its objects.`);
    }
    return { manifest, releaseInput, event };
}
/**
 * Admit a bundle into a release: its event is signed for this registry and is
 * exactly the admission its release input earns under the target policy, and
 * the engine re-derives every rating from the run records.
 */
export function admitAgentReadinessAuthorityBundle(input) {
    const { manifest, releaseInput } = input.bundle;
    if (manifest.target_signer_registry_digest !== input.targetRegistry.registry_digest) {
        throw new Error(`${READINESS_BUNDLE} targets another signer registry.`);
    }
    const event = validateProtectedEvent(input.bundle.event, input.targetRegistry, input.targetReleaseSequence);
    const expected = agentReadinessAdmissionIntent({
        releaseInput,
        policy: input.policy,
        issuerId: event.issuer_id,
        operationId: event.operation_id,
        admittedAt: event.occurred_at,
    });
    const { event_id: _eventId, protected: _protected, ...eventCore } = event;
    if (expected.event_id !== event.event_id ||
        canonicalJson(expected.core) !== canonicalJson(eventCore)) {
        throw new Error(`${READINESS_BUNDLE} admission is not the one its input earns.`);
    }
    verifyAgentReadinessProfileInput({
        profileInput: releaseInput.profile_input,
        declarationRevision: releaseInput.declaration_revision,
        policy: input.policy,
    });
    return {
        bundleDigest: manifest.bundle_digest,
        profile: loadedAgentReadinessProfile(releaseInput),
        events: [event],
    };
}
//# sourceMappingURL=agent-readiness-authority.js.map