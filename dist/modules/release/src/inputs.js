import { readdir, readFile } from "node:fs/promises";
import { isAbsolute, join, resolve, sep } from "node:path";
import { parse as parseYaml } from "yaml";
import { agentReadinessIndexSchema, agentReadinessProfileReleaseInputSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { policyCoreSchema } from "../../../contracts/artifact/src/index.js";
import { catalogEventSchema } from "../../../contracts/events/src/index.js";
import { captureReceiptSchema, } from "../../../contracts/evidence/src/index.js";
import { compileAgentReadinessOfferRelationRevision, compileAgentReadinessRevision, } from "../../agent-readiness-policy/src/index.js";
import { validateProtectedCaptureReceipt, validateProtectedEvent, } from "../../authority/src/index.js";
import { parseRetainedCatalogRevision, } from "../../evidence-operations/src/retained-revision.js";
import { canonicalizePublicHttpsUrl, compareCanonicalStrings, digest, digestPathSegment, sha256Bytes, } from "../../primitives/src/index.js";
const policyInputSchema = policyCoreSchema;
export async function loadCheckpointRevisions(directory) {
    const revisions = new Map();
    for (const path of (await filesUnder(directory))
        .filter((file) => file.endsWith(".json"))
        .sort(compareCanonicalStrings)) {
        const revision = parseRetainedCatalogRevision(JSON.parse(await readFile(path, "utf8")));
        const revisionDigest = revision.revision_digest;
        const existing = revisions.get(revisionDigest);
        if (existing && digest(existing) !== digest(revision)) {
            throw new Error(`Checkpoint revision ${revisionDigest} collides with another object.`);
        }
        revisions.set(revisionDigest, revision);
    }
    return revisions;
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
        const releaseInput = agentReadinessProfileReleaseInputSchema.parse(path.endsWith(".json") ? JSON.parse(source) : parseYaml(source));
        const input = releaseInput.profile_input;
        if (ids.has(input.agent_readiness_profile_id)) {
            throw new Error(`Duplicate agent readiness profile ${input.agent_readiness_profile_id}.`);
        }
        ids.add(input.agent_readiness_profile_id);
        profiles.push({
            input,
            declarationRevision: releaseInput.declaration_revision,
            revision: compileAgentReadinessRevision(input),
            offerRelationInputs: releaseInput.offer_relation_inputs,
            offerRelations: releaseInput.offer_relation_inputs.map(compileAgentReadinessOfferRelationRevision),
        });
    }
    return profiles.sort((left, right) => compareCanonicalStrings(left.revision.agent_readiness_profile_id, right.revision.agent_readiness_profile_id));
}
export function validateAgentReadinessClosure(input) {
    const events = new Map(input.events.map((event) => [event.event_id, event]));
    const observations = new Map(input.observations.map((observation) => [observation.observation_id, observation]));
    assertAgentReadinessOfferRelationAdmission({
        profiles: input.profiles,
        offers: input.offers,
    });
    for (const profile of input.profiles) {
        const { revision, declarationRevision } = profile;
        if (!input.entityIds.has(revision.entity_id)) {
            throw new Error(`Agent readiness profile ${revision.agent_readiness_profile_id} targets an unknown entity.`);
        }
        if (declarationRevision.entity_id !== revision.entity_id ||
            declarationRevision.revision_digest !== revision.declaration_revision_digest) {
            throw new Error(`Agent readiness profile ${revision.agent_readiness_profile_id} does not bind its exact declaration revision.`);
        }
        for (const binding of profile.input.evidence_bindings) {
            const signalIndex = revision.signals.findIndex((signal) => signal.stage === binding.stage && signal.signal_code === binding.signal_code);
            const signal = revision.signals[signalIndex];
            if (!signal) {
                throw new Error(`Agent readiness evidence binding ${binding.stage}:${binding.signal_code} has no signal fact.`);
            }
            const assessmentMethod = input.policy.assessment_methods.find((method) => method.method_digest === signal.assessment_method.method_digest);
            if (!assessmentMethod ||
                assessmentMethod.name !== signal.assessment_method.name ||
                assessmentMethod.version !== signal.assessment_method.version) {
                throw new Error(`Agent readiness signal ${signal.stage}:${signal.signal_code} names an unresolved assessment method.`);
            }
            const testedSurfaceUris = captureUrisBySurface(signal.tested_surfaces, declarationRevision);
            const allowedObservationUris = new Set(testedSurfaceUris.flatMap((uris) => [...uris].map(canonicalCaptureUri)));
            const boundObservations = [];
            for (const observationId of binding.observation_ids) {
                const observation = observations.get(observationId);
                if (!observation) {
                    throw new Error(`Agent readiness profile ${revision.agent_readiness_profile_id} targets missing observation ${observationId}.`);
                }
                boundObservations.push(observation);
                if (!assessmentMethod.capture.rungs.some((rung) => rung === observation.method.name)) {
                    throw new Error(`Agent readiness signal ${signal.stage}:${signal.signal_code} uses an observation capture rung outside its assessment method.`);
                }
                if (!allowedObservationUris.has(canonicalCaptureUri(observation.source_uri))) {
                    throw new Error(`Agent readiness signal ${signal.stage}:${signal.signal_code} observation is not in its tested surface closure.`);
                }
            }
            const latestObservation = [...boundObservations]
                .sort((left, right) => Date.parse(left.retrieved_at) - Date.parse(right.retrieved_at))
                .at(-1);
            if (latestObservation?.retrieved_at !== signal.observed_at) {
                throw new Error(`Agent readiness profile ${revision.agent_readiness_profile_id} signal ${signal.stage}:${signal.signal_code} observed_at is not its latest bound observation.`);
            }
            for (const eventId of binding.evidence_event_ids) {
                const event = events.get(eventId);
                if (event?.kind !== "evidence.bound" ||
                    event.subject.subject_type !== "agent_readiness_profile" ||
                    event.subject.entity_id !== revision.entity_id ||
                    event.subject.agent_readiness_profile_id !== revision.agent_readiness_profile_id ||
                    event.subject.revision_digest !== revision.revision_digest) {
                    throw new Error(`Agent readiness profile ${revision.agent_readiness_profile_id} has an invalid evidence binding ${eventId}.`);
                }
                const observationId = stringValue(event.payload.observation_id);
                if (!binding.observation_ids.includes(observationId)) {
                    throw new Error(`Agent readiness evidence event ${eventId} is not closed over its declared observations.`);
                }
                const assertions = event.payload.assertions;
                const signalPath = `/signals/${signalIndex}`;
                if (!Array.isArray(assertions) ||
                    !assertions.some((assertion) => {
                        if (typeof assertion !== "object" || assertion === null)
                            return false;
                        const path = assertion.path;
                        return (typeof path === "string" && (path === signalPath || path.startsWith(`${signalPath}/`)));
                    })) {
                    throw new Error(`Agent readiness evidence event ${eventId} does not prove its bound signal path.`);
                }
            }
        }
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
function captureUrisBySurface(surfaces, revision) {
    return surfaces.map((surface) => {
        const uris = new Set();
        if (surface.node_kind === "resource") {
            const resource = revision.declaration.resources.find((candidate) => candidate.resource_id === surface.node_id);
            if (!resource)
                throw new Error(`Unknown tested resource ${surface.node_id}.`);
            uris.add(resource.uri);
        }
        else if (surface.node_kind === "endpoint") {
            const endpoint = revision.declaration.endpoints.find((candidate) => candidate.endpoint_id === surface.node_id);
            if (!endpoint)
                throw new Error(`Unknown tested endpoint ${surface.node_id}.`);
            uris.add(endpoint.uri);
        }
        else if (surface.node_kind === "interface") {
            const declaredInterface = revision.declaration.interfaces.find((candidate) => candidate.interface_id === surface.node_id);
            if (!declaredInterface)
                throw new Error(`Unknown tested interface ${surface.node_id}.`);
            for (const resourceId of declaredInterface.resource_ids) {
                const resource = revision.declaration.resources.find((candidate) => candidate.resource_id === resourceId);
                if (!resource)
                    throw new Error(`Interface ${surface.node_id} lost resource ${resourceId}.`);
                uris.add(resource.uri);
            }
            for (const endpointId of declaredInterface.endpoint_ids) {
                const endpoint = revision.declaration.endpoints.find((candidate) => candidate.endpoint_id === endpointId);
                if (!endpoint)
                    throw new Error(`Interface ${surface.node_id} lost endpoint ${endpointId}.`);
                uris.add(endpoint.uri);
            }
        }
        else if (surface.node_kind === "surface_exclusion") {
            const exclusion = revision.declaration.surface_exclusions.find((candidate) => candidate.exclusion_id === surface.node_id);
            if (!exclusion)
                throw new Error(`Unknown tested surface exclusion ${surface.node_id}.`);
            const sourceIds = revision.declaration.source_bindings
                .filter((binding) => binding.target.node_kind === "surface_exclusion" &&
                binding.target.node_id === surface.node_id)
                .map((binding) => binding.source_id);
            for (const sourceId of new Set(sourceIds)) {
                const source = revision.sources.find((candidate) => candidate.source_id === sourceId);
                if (!source) {
                    throw new Error(`Surface exclusion ${surface.node_id} lost source ${sourceId}.`);
                }
                uris.add(source.url);
            }
            if (uris.size === 0) {
                throw new Error(`Surface exclusion ${surface.node_id} has no capture URI.`);
            }
        }
        else {
            throw new Error(`Unknown Agent Readiness surface kind ${surface.node_kind}.`);
        }
        return uris;
    });
}
function canonicalCaptureUri(value) {
    return canonicalizePublicHttpsUrl(value, {
        fragment: "remove",
        trimTrailingPathSlash: true,
    });
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
export async function loadCaptureReceipts(directory, registry, sequence) {
    const receiptDigests = new Set();
    const operationIds = new Set();
    const receipts = [];
    for (const file of (await filesUnder(directory))
        .filter((path) => path.endsWith(".json"))
        .sort(compareCanonicalStrings)) {
        const raw = JSON.parse(await readFile(file, "utf8"));
        captureReceiptSchema.parse(raw);
        const receipt = validateProtectedCaptureReceipt(raw, registry, sequence);
        if (receiptDigests.has(receipt.receipt_digest)) {
            throw new Error(`Duplicate capture receipt ${receipt.receipt_digest}.`);
        }
        if (operationIds.has(receipt.operation_id)) {
            throw new Error(`Duplicate capture receipt operation ${receipt.operation_id}.`);
        }
        receiptDigests.add(receipt.receipt_digest);
        operationIds.add(receipt.operation_id);
        receipts.push(receipt);
    }
    return receipts.sort((left, right) => compareCanonicalStrings(left.receipt_digest, right.receipt_digest));
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
export function unionHistoricalCaptureReceipts(parent, current) {
    const receipts = new Map(parent?.captureReceipts.map((receipt) => [receipt.receipt_digest, receipt]) ?? []);
    const operations = new Map(parent?.captureReceipts.map((receipt) => [receipt.operation_id, receipt.receipt_digest]) ?? []);
    for (const receipt of current) {
        const prior = receipts.get(receipt.receipt_digest);
        if (prior && digest(prior) !== digest(receipt)) {
            throw new Error(`Historical capture receipt ${receipt.receipt_digest} was mutated.`);
        }
        const operationReceipt = operations.get(receipt.operation_id);
        if (operationReceipt && operationReceipt !== receipt.receipt_digest) {
            throw new Error(`Capture operation ${receipt.operation_id} is already bound to ${operationReceipt}.`);
        }
        receipts.set(receipt.receipt_digest, receipt);
        operations.set(receipt.operation_id, receipt.receipt_digest);
    }
    return [...receipts.values()].sort((left, right) => compareCanonicalStrings(left.receipt_digest, right.receipt_digest));
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
        if (revision.revision_contract === "sourcey.offer-revision/v1alpha1") {
            offerIds.add(revision.offer_id);
        }
        else if (revision.revision_contract === "sourcey.agent-readiness-revision/v1alpha1") {
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
                (revision.revision_contract !== "sourcey.offer-revision/v1alpha1" ||
                    revision.offer_id !== event.subject.offer_id)) {
                throw new Error(`Event ${event.event_id} has a mismatched offer revision subject.`);
            }
            if (event.subject.subject_type === "agent_readiness_profile" &&
                (revision.revision_contract !== "sourcey.agent-readiness-revision/v1alpha1" ||
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