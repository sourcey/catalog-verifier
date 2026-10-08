import { readdir, readFile } from "node:fs/promises";
import { isAbsolute, join, resolve, sep } from "node:path";
import { compareCanonicalStrings, digest, digestPathSegment, sha256Bytes, } from "provenry/primitives";
import { parse as parseYaml } from "yaml";
import { agentReadinessIndexSchema, agentReadinessProfileReleaseInputSchema, agentReadinessRevisionContract, } from "../../../contracts/agent-readiness/src/index.js";
import { policyCoreSchema } from "../../../contracts/artifact/src/index.js";
import { catalogEventSchema } from "../../../contracts/events/src/index.js";
import { catalogRevisionContracts, } from "../../../contracts/revisions/src/index.js";
import { compileAgentReadinessOfferRelationRevision, compileAgentReadinessRevision, verifyAgentReadinessProfileInput, } from "../../agent-readiness-policy/src/index.js";
import { validateProtectedEvent } from "../../authority/src/index.js";
const policyInputSchema = policyCoreSchema;
/** One released profile as every lane loads it: its input, the revision it compiles to and its relations. */
export function loadedAgentReadinessProfile(releaseInput) {
    const input = releaseInput.profile_input;
    return {
        input,
        declarationRevision: releaseInput.declaration_revision,
        revision: compileAgentReadinessRevision(input),
        offerRelationInputs: releaseInput.offer_relation_inputs,
        offerRelations: releaseInput.offer_relation_inputs.map(compileAgentReadinessOfferRelationRevision),
    };
}
export async function loadAssetSourceBytes(manifest, assetRoot) {
    const paths = new Set(manifest.objects.flatMap((object) => [
        object.original.source_path,
        ...object.safe_variants.map((variant) => variant.source_path),
    ]));
    const bytes = new Map();
    for (const path of [...paths].sort(compareCanonicalStrings)) {
        bytes.set(path, await readFile(resolveInside(assetRoot, path)));
    }
    return bytes;
}
export function missingAssetBytes(path) {
    throw new Error(`Asset manifest bytes are missing at ${path}.`);
}
export async function loadAgentReadinessRevisions(directory) {
    const profiles = [];
    const ids = new Set();
    for (const path of (await filesUnder(directory))
        .filter((file) => /\.(?:json|ya?ml)$/i.test(file))
        .sort(compareCanonicalStrings)) {
        const source = await readFile(path, "utf8");
        const profile = loadedAgentReadinessProfile(agentReadinessProfileReleaseInputSchema.parse(path.endsWith(".json") ? JSON.parse(source) : parseYaml(source)));
        const profileId = profile.revision.agent_readiness_profile_id;
        if (ids.has(profileId)) {
            throw new Error(`Duplicate agent readiness profile ${profileId}.`);
        }
        ids.add(profileId);
        profiles.push(profile);
    }
    return profiles.sort((left, right) => compareCanonicalStrings(left.revision.agent_readiness_profile_id, right.revision.agent_readiness_profile_id));
}
/**
 * Every profile names a released Entity, binds its exact declaration revision,
 * and rates exactly what the engine derives from its run records under the
 * pinned policy; every Offer relation binds its same-Entity profile.
 */
export function validateAgentReadinessClosure(input) {
    assertAgentReadinessOfferRelationAdmission({
        profiles: input.profiles,
        offers: input.offers,
    });
    for (const profile of input.profiles) {
        if (!input.entityIds.has(profile.revision.entity_id)) {
            throw new Error(`Agent readiness profile ${profile.revision.agent_readiness_profile_id} targets an unknown entity.`);
        }
        verifyAgentReadinessProfileInput({
            profileInput: profile.input,
            declarationRevision: profile.declarationRevision,
            policy: input.policy,
        });
    }
}
export function assertAgentReadinessOfferRelationAdmission(input) {
    const relationIdentities = new Set();
    const relationIds = new Set();
    for (const profile of input.profiles) {
        for (const relation of profile.offerRelations) {
            const offer = input.offers.get(relation.offer_id);
            if (relation.agent_readiness_profile_id !== profile.revision.agent_readiness_profile_id ||
                relation.declaration_revision_digest !== profile.declarationRevision.revision_digest ||
                !offer ||
                offer.entity_id !== profile.revision.entity_id ||
                offer.revision_digest !== relation.admitted_offer_revision_digest) {
                throw new Error(`Agent readiness Offer relation ${relation.relation_id} does not bind its exact same-Entity profile, declaration, and current Offer revision.`);
            }
            const identity = `${relation.agent_readiness_profile_id}:${relation.offer_id}:${relation.purpose}`;
            if (relationIds.has(relation.relation_id) || relationIdentities.has(identity)) {
                throw new Error(`Duplicate Agent Readiness Offer relation ${relation.relation_id}.`);
            }
            relationIds.add(relation.relation_id);
            relationIdentities.add(identity);
        }
    }
}
export function projectAgentReadinessIndex(profiles) {
    return agentReadinessIndexSchema.parse({
        agent_readiness_index_contract: "sourcey.agent-readiness-index/v1alpha1",
        profiles: Object.fromEntries(profiles
            .filter((profile) => profile.publication.visibility === "discoverable")
            .map((profile) => [
            profile.agent_readiness_profile_id,
            {
                agent_readiness_profile_id: profile.agent_readiness_profile_id,
                entity_id: profile.entity_id,
                lifecycle: profile.lifecycle,
                revision_digest: profile.revision_digest,
                policy_digest: profile.policy_digest,
                projection_digest: profile.projection_digest,
                canonical_url: profile.canonical_url,
                path: `agent-readiness/${profile.agent_readiness_profile_id}.json`,
            },
        ])),
    });
}
export function assertAgentReadinessReleaseAdmission(profiles) {
    const privateProfile = profiles.find((profile) => profile.publication.visibility === "private");
    if (privateProfile) {
        throw new Error(`Agent Readiness profile ${privateProfile.agent_readiness_profile_id} is private and must remain outside the Catalog release.`);
    }
}
export async function loadEvents(directory, registry, sequence) {
    const eventIds = new Set();
    const events = [];
    for (const file of (await filesUnder(directory))
        .filter((path) => path.endsWith(".json"))
        .sort()) {
        const raw = JSON.parse(await readFile(file, "utf8"));
        catalogEventSchema.parse(raw);
        const event = validateProtectedEvent(raw, registry, sequence);
        if (eventIds.has(event.event_id))
            throw new Error(`Duplicate event ${event.event_id}.`);
        eventIds.add(event.event_id);
        events.push(event);
    }
    return events.sort((left, right) => compareCanonicalStrings(left.event_id, right.event_id));
}
/**
 * The former generic verification event remains readable as immutable history,
 * but it is not an authoring surface and must never enter a successor release as
 * newly admitted authority. Current assurance uses the typed Entity and Offer
 * events instead.
 */
export function assertNoRetiredVerificationIntroductions(events) {
    const retired = events.find((event) => event.kind === "verification.completed");
    if (retired) {
        throw new Error(`Retired verification event ${retired.event_id} cannot be newly introduced; use typed assurance.`);
    }
}
export async function loadPublicPolicies(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const policies = [];
    for (const entry of entries.filter((bundle) => bundle.isFile()).sort(byName)) {
        if (!entry.name.endsWith(".json"))
            continue;
        policies.push(policyInputSchema.parse(JSON.parse(await readFile(join(directory, entry.name), "utf8"))));
    }
    return policies;
}
export async function validateCaptures(observations, captureRoot, normalizedRoot) {
    const captures = new Map();
    const normalizedObjects = new Map();
    for (const observation of observations) {
        const capture = observation.capture;
        if (capture?.availability !== "public")
            continue;
        const path = join(captureRoot, `${digestPathSegment(capture.digest)}.txt`);
        const bytes = await readFile(path);
        if (bytes.byteLength !== capture.bytes || sha256Bytes(bytes) !== capture.digest) {
            throw new Error(`Capture ${capture.digest} does not match its observation declaration.`);
        }
        captures.set(capture.digest, bytes);
        if (!capture.normalized_object) {
            throw new Error(`Current observation ${observation.observation_id} lacks normalized evidence.`);
        }
        const normalizedPath = join(normalizedRoot, `${digestPathSegment(capture.normalized_object.digest)}.txt`);
        const normalizedBytes = await readFile(normalizedPath);
        if (normalizedBytes.byteLength !== capture.normalized_object.bytes ||
            sha256Bytes(normalizedBytes) !== capture.normalized_object.digest) {
            throw new Error(`Normalized object ${capture.normalized_object.digest} does not match its observation declaration.`);
        }
        normalizedObjects.set(capture.normalized_object.digest, normalizedBytes);
    }
    return { captures, normalizedObjects };
}
export function unionHistoricalEvents(parent, current) {
    const events = new Map(parent?.events.map((event) => [event.event_id, event]) ?? []);
    for (const event of current) {
        const prior = events.get(event.event_id);
        if (prior && digest(prior) !== digest(event)) {
            throw new Error(`Historical event ${event.event_id} was re-enveloped or mutated.`);
        }
        events.set(event.event_id, event);
    }
    return [...events.values()].sort((left, right) => compareCanonicalStrings(left.event_id, right.event_id));
}
export function unionHistoricalObservations(parent, current) {
    const observations = new Map(parent?.observations.map((observation) => [observation.observation_id, observation]) ?? []);
    for (const observation of current) {
        const prior = observations.get(observation.observation_id);
        if (prior && digest(prior) !== digest(observation)) {
            throw new Error(`Historical observation ${observation.observation_id} was mutated.`);
        }
        observations.set(observation.observation_id, observation);
    }
    return [...observations.values()].sort((left, right) => compareCanonicalStrings(left.observation_id, right.observation_id));
}
export function unionHistoricalRevisions(parent, facts, agentReadinessRevisions, agentReadinessDeclarationRevisions) {
    const all = new Map(parent?.revisions ?? []);
    const currentRevisionDigests = [];
    for (const entity of facts.entities) {
        for (const revision of [
            entity.revision,
            ...entity.programs.map((program) => program.revision),
            ...entity.offers.map((offer) => offer.revision),
        ]) {
            const revisionDigest = revision.revision_digest;
            const prior = all.get(revisionDigest);
            if (prior && digest(withoutKey(prior, "revision_digest")) !== revisionDigest) {
                throw new Error(`Historical revision ${revisionDigest} is corrupt.`);
            }
            all.set(revisionDigest, revision);
            currentRevisionDigests.push(revisionDigest);
        }
    }
    for (const revision of agentReadinessRevisions) {
        const revisionDigest = revision.revision_digest;
        const prior = all.get(revisionDigest);
        if (prior && digest(withoutKey(prior, "revision_digest")) !== revisionDigest) {
            throw new Error(`Historical agent readiness revision ${revisionDigest} is corrupt.`);
        }
        all.set(revisionDigest, revision);
        currentRevisionDigests.push(revisionDigest);
    }
    for (const revision of agentReadinessDeclarationRevisions) {
        const revisionDigest = revision.revision_digest;
        const prior = all.get(revisionDigest);
        if (prior && digest(withoutKey(prior, "revision_digest")) !== revisionDigest) {
            throw new Error(`Historical agent readiness declaration ${revisionDigest} is corrupt.`);
        }
        all.set(revisionDigest, revision);
        currentRevisionDigests.push(revisionDigest);
    }
    return { all, currentRevisionDigests: currentRevisionDigests.sort() };
}
export function assertEventClosure(revisions, events, observations) {
    const entityIds = new Set();
    const offerIds = new Set();
    const agentReadinessProfileIds = new Set();
    for (const revision of revisions.all.values()) {
        entityIds.add(revision.entity_id);
        if (revision.revision_contract === catalogRevisionContracts.offer) {
            offerIds.add(revision.offer_id);
        }
        else if (revision.revision_contract === agentReadinessRevisionContract) {
            agentReadinessProfileIds.add(revision.agent_readiness_profile_id);
        }
    }
    const observationIds = new Set(observations.map((observation) => observation.observation_id));
    for (const event of events) {
        if (!entityIds.has(event.subject.entity_id)) {
            throw new Error(`Event ${event.event_id} targets unknown entity ${event.subject.entity_id}.`);
        }
        if (event.subject.subject_type === "offer" && !offerIds.has(event.subject.offer_id)) {
            throw new Error(`Event ${event.event_id} targets unknown offer ${event.subject.offer_id}.`);
        }
        if (event.subject.subject_type === "agent_readiness_profile" &&
            !agentReadinessProfileIds.has(event.subject.agent_readiness_profile_id)) {
            throw new Error(`Event ${event.event_id} targets unknown agent readiness profile ${event.subject.agent_readiness_profile_id}.`);
        }
        if (event.subject.revision_digest) {
            const revision = revisions.all.get(event.subject.revision_digest);
            if (!revision) {
                throw new Error(`Event ${event.event_id} targets missing revision ${event.subject.revision_digest}.`);
            }
            if (revision.entity_id !== event.subject.entity_id) {
                throw new Error(`Event ${event.event_id} has a mismatched revision/entity subject.`);
            }
            if (event.subject.subject_type === "offer" &&
                (revision.revision_contract !== catalogRevisionContracts.offer ||
                    revision.offer_id !== event.subject.offer_id)) {
                throw new Error(`Event ${event.event_id} has a mismatched offer revision subject.`);
            }
            if (event.subject.subject_type === "agent_readiness_profile" &&
                (revision.revision_contract !== agentReadinessRevisionContract ||
                    revision.agent_readiness_profile_id !== event.subject.agent_readiness_profile_id)) {
                throw new Error(`Event ${event.event_id} has a mismatched agent readiness revision subject.`);
            }
        }
        if (event.kind === "evidence.bound") {
            const observationId = stringValue(event.payload.observation_id);
            if (!observationIds.has(observationId)) {
                throw new Error(`Event ${event.event_id} targets missing observation ${observationId}.`);
            }
        }
    }
}
async function filesUnder(path) {
    const entries = await readdir(path, { withFileTypes: true }).catch((error) => {
        if (error.code === "ENOTDIR")
            return null;
        throw error;
    });
    if (entries === null)
        return [path];
    const nested = await Promise.all(entries.map((entry) => {
        if (entry.isSymbolicLink()) {
            throw new Error(`Symlinks are forbidden in closed inputs: ${path}`);
        }
        const child = join(path, entry.name);
        return entry.isDirectory() ? filesUnder(child) : [child];
    }));
    return nested.flat();
}
function resolveInside(root, path) {
    if (isAbsolute(path))
        throw new Error(`Input path must be repository-relative: ${path}.`);
    const resolved = resolve(root, path);
    if (!resolved.startsWith(`${root}${sep}`)) {
        throw new Error(`Input path escapes repository: ${path}.`);
    }
    return resolved;
}
function withoutKey(value, key) {
    const copy = { ...value };
    delete copy[key];
    return copy;
}
function byName(left, right) {
    return compareCanonicalStrings(left.name, right.name);
}
function stringValue(value) {
    if (typeof value !== "string")
        throw new Error("Expected a string in a validated event payload.");
    return value;
}
//# sourceMappingURL=inputs.js.map