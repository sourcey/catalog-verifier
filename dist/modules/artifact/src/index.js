import { basename } from "node:path";
import { compareCanonicalStrings, digest, digestFromPathSegment, parseJsonFile, } from "provenry/primitives";
import { agentReadinessIndexSchema, agentReadinessInputsSchema, agentReadinessOfferRelationIndexSchema, agentReadinessOfferRelationInputsSchema, agentReadinessProjectionCoreSchema, agentReadinessProjectionSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { canonicalArtifactSchema, compiledPolicySchema, identityIndexSchema, provenanceIndexSchema, searchIndexSchema, } from "../../../contracts/artifact/src/index.js";
import { assetIndexSchema, assetInputsSchema, assetNoticesSchema, } from "../../../contracts/assets/src/index.js";
import { entityAuthoringSchema, } from "../../../contracts/authoring/src/index.js";
import { rootSetSchema, rootSetTransitionSchema } from "../../../contracts/authority/src/index.js";
import { catalogEventSchema } from "../../../contracts/events/src/index.js";
import { observationSchema } from "../../../contracts/observations/src/index.js";
import { closedInputSetSchema, RELEASE_RESOURCES, releaseObservationInputsSchema, releasePolicyObjectPath, releaseResourceDigest, releaseRootSetObjectPath, releaseSignerRegistryObjectPath, releaseTrustTransitionObjectPath, } from "../../../contracts/release/src/index.js";
import { routeIndexSchema } from "../../../contracts/routes/src/index.js";
import { validateProtectedEvent, validateRootSetTransition, validateSignerRegistry, } from "../../authority/src/index.js";
import { attestedCaptureDigests, verifyReleasedCaptureRecords, } from "../../evidence-operations/src/attested-capture.js";
import { verifyEvidenceObjectGraph } from "../../evidence-operations/src/proof-graph.js";
import { parseRetainedCatalogRevision, } from "../../evidence-operations/src/retained-revision.js";
import { catalogEntityProjectionDigest, catalogOfferProjectionDigest, catalogPolicyRevisionDigest, catalogProgramProjectionDigest, } from "../../projection-identity/src/index.js";
import { boundObservationIds } from "../../provenance/src/index.js";
import { readVerifiedSourceyRelease, } from "../../publication-instance/src/index.js";
import { assertReleasedAgentReadinessClosure, assertReleasedAgentReadinessOfferRelationClosure, } from "./agent-readiness-closure.js";
import { assertReleasedAssetClosure } from "./asset-closure.js";
import { verifyReleasedAuthoringClosure } from "./authoring-closure.js";
import { assertReleasedPolicyClosure } from "./policy-closure.js";
import { CATALOG_RELEASE, releasedEvidenceObjects } from "./release-directory-files.js";
import { validateTrustHistory } from "./trust-history.js";
export async function verifyCatalogReleaseDirectory(directory, trust) {
    return verifyCatalogRelease(await readVerifiedSourceyRelease(directory), trust);
}
/** Verifies a full release whose envelope is already verified. */
export function verifyCatalogRelease(release, trust) {
    return inspectCatalogRelease(release, trust, true);
}
/**
 * Loads an exact bundle already admitted with verifyCatalogReleaseDirectory and
 * pinned by an immutable consumer lock. It repeats byte closure, schemas,
 * identities, signatures, and semantic graph closure, but does not re-run raw
 * capture normalization on every serving-process start.
 */
export async function loadAdmittedCatalogReleaseDirectory(directory, trust) {
    return inspectCatalogRelease(await readVerifiedSourceyRelease(directory), trust, false);
}
async function inspectCatalogRelease(release, trust, replayEvidenceObjects) {
    if (release.kind !== "full") {
        throw new Error("A full Catalog release cannot carry a delta state file.");
    }
    const { bundle, descriptor, changes, files } = release.envelope;
    const artifact = canonicalArtifactSchema.parse(parseJsonFile(files, "catalog.json", CATALOG_RELEASE));
    const routes = routeIndexSchema.parse(parseJsonFile(files, "routes.json", CATALOG_RELEASE));
    const identities = identityIndexSchema.parse(parseJsonFile(files, "identities.json", CATALOG_RELEASE));
    const search = searchIndexSchema.parse(parseJsonFile(files, "indexes/search.json", CATALOG_RELEASE));
    const agentReadinessIndex = agentReadinessIndexSchema.parse(parseJsonFile(files, "indexes/agent-readiness.json", CATALOG_RELEASE));
    const agentReadinessOfferRelationIndex = agentReadinessOfferRelationIndexSchema.parse(parseJsonFile(files, "indexes/agent-readiness-offer-relations.json", CATALOG_RELEASE));
    const assetIndex = assetIndexSchema.parse(parseJsonFile(files, "assets/index.json", CATALOG_RELEASE));
    const assetNotices = assetNoticesSchema.parse(parseJsonFile(files, "assets/notices.json", CATALOG_RELEASE));
    const provenance = provenanceIndexSchema.parse(parseJsonFile(files, "provenance/index.json", CATALOG_RELEASE));
    const snapshot = descriptor.snapshot_core;
    assertDigest("artifact", digest(artifact), snapshot.artifact_digest);
    assertDigest("routes", digest(routes), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.routes));
    assertDigest("identities", digest(identities), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.identities));
    assertDigest("search index", digest(search), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.searchIndex));
    assertDigest("agent readiness index", digest(agentReadinessIndex), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.agentReadinessIndex));
    assertDigest("asset index", digest(assetIndex), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.assetIndex));
    const agentReadinessInputs = agentReadinessInputsSchema.parse(parseJsonFile(files, "inputs/agent-readiness.json", CATALOG_RELEASE));
    const agentReadinessOfferRelationInputs = agentReadinessOfferRelationInputsSchema.parse(parseJsonFile(files, "inputs/agent-readiness-offer-relations.json", CATALOG_RELEASE));
    const assetInputs = assetInputsSchema.parse(parseJsonFile(files, "inputs/assets.json", CATALOG_RELEASE));
    assertDigest("agent readiness inputs", digest(agentReadinessInputs), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.agentReadinessInputs));
    assertDigest("agent readiness Offer relation index", digest(agentReadinessOfferRelationIndex), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.agentReadinessOfferRelationIndex));
    assertDigest("agent readiness Offer relation inputs", digest(agentReadinessOfferRelationInputs), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.agentReadinessOfferRelationInputs));
    assertDigest("asset inputs", digest(assetInputs), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.assetInputs));
    if (releaseResourceDigest(bundle.resource_digests, RELEASE_RESOURCES.agentReadinessPolicy) !==
        agentReadinessInputs.policy_digest ||
        releaseResourceDigest(bundle.resource_digests, RELEASE_RESOURCES.assetManifest) !==
            assetInputs.manifest_digest) {
        throw new Error("Release input declarations disagree with the closed input set.");
    }
    assertReleasedPolicyClosure({
        files,
        bundle,
        artifactPolicyDigests: artifact.policy_digests,
        snapshotResourceDigests: snapshot.resource_digests,
    });
    assertDigest("observation inputs", digest(releaseObservationInputsSchema.parse(parseJsonFile(files, "inputs/observations.json", CATALOG_RELEASE))), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.observationInputs));
    const inputSet = closedInputSetSchema.parse(parseJsonFile(files, "inputs/input-set.json", CATALOG_RELEASE));
    assertDigest("input set", digest(inputSet), snapshot.input_set_digest);
    const { environment } = inputSet;
    assertDigest("provenance", digest(provenance), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.provenance));
    assertDigest("root set", artifact.root_set_digest, snapshot.root_set_digest);
    assertDigest("signer registry", artifact.signer_registry_digest, snapshot.signer_registry_digest);
    const rootSet = rootSetSchema.parse(parseJsonFile(files, releaseRootSetObjectPath(artifact.root_set_digest), CATALOG_RELEASE));
    if (digest(rootSet) !== artifact.root_set_digest)
        throw new Error("Root-set object is misaddressed.");
    if (trust && artifact.root_set_digest !== trust.rootSetDigest) {
        throw new Error("Release root set does not match the caller's trusted root pin.");
    }
    const registry = validateSignerRegistry(rootSet, parseJsonFile(files, releaseSignerRegistryObjectPath(artifact.signer_registry_digest), CATALOG_RELEASE));
    if (registry.registry_digest !== artifact.signer_registry_digest) {
        throw new Error("Signer-registry object is misaddressed.");
    }
    const transitionDigest = snapshot.trust_transition_digest;
    if (transitionDigest) {
        const transition = rootSetTransitionSchema.parse(parseJsonFile(files, releaseTrustTransitionObjectPath(transitionDigest), CATALOG_RELEASE));
        if (transition.transition_digest !== transitionDigest) {
            throw new Error("Root-set transition object is misaddressed.");
        }
        const previousRootSet = rootSetSchema.parse(parseJsonFile(files, releaseRootSetObjectPath(transition.previous_root_set_digest), CATALOG_RELEASE));
        validateRootSetTransition({
            previousRootSet,
            nextRootSet: rootSet,
            transition,
            releaseSequence: descriptor.release_core.release_sequence,
        });
    }
    const trustedRegistries = validateTrustHistory(files, rootSet, registry);
    const releaseSequence = descriptor.release_core.release_sequence;
    const revisions = new Map();
    const authoring = new Map();
    const events = [];
    const eventIds = new Set();
    const carriedEventIds = new Set();
    const observations = [];
    for (const [path, bytes] of files) {
        if (path.startsWith("authoring/entities/")) {
            const value = entityAuthoringSchema.parse(JSON.parse(bytes.toString("utf8")));
            const address = basename(path, ".json");
            if (value.entity.entity_id !== address || authoring.has(address)) {
                throw new Error(`Authoring object ${path} is not addressed correctly.`);
            }
            authoring.set(address, value);
        }
        else if (path.startsWith("revisions/")) {
            const revision = parseRetainedCatalogRevision(JSON.parse(bytes.toString("utf8")));
            const address = addressFromJsonPath(path);
            if (address !== revision.revision_digest) {
                throw new Error(`Revision object ${path} is not content-addressed correctly.`);
            }
            revisions.set(address, revision);
        }
        else if (path.startsWith("events/")) {
            const input = JSON.parse(bytes.toString("utf8"));
            const address = addressFromJsonPath(path);
            if (input.event_id !== address || eventIds.has(address)) {
                throw new Error(`Event object ${path} is misaddressed.`);
            }
            eventIds.add(address);
            const inclusion = provenance.events[address];
            if (!inclusion || inclusion.event_id !== address) {
                throw new Error(`Event ${address} lacks first-inclusion provenance.`);
            }
            const eventRegistry = trustedRegistries.get(inclusion.signer_registry_digest);
            if (!eventRegistry ||
                input.protected?.signer_registry_digest !== eventRegistry.registry_digest) {
                throw new Error(`Event ${address} names a registry outside the trusted history.`);
            }
            if (inclusion.first_inclusion_sequence > releaseSequence) {
                throw new Error(`Event ${address} claims a later first inclusion.`);
            }
            // An event an earlier release first included was verified there; it is carried by witness.
            const carried = inclusion.first_inclusion_sequence < releaseSequence;
            const event = carried
                ? catalogEventSchema.parse(input)
                : validateProtectedEvent(input, eventRegistry, releaseSequence);
            if (digest(event) !== inclusion.event_object_digest ||
                event.operation_id !== inclusion.operation_id ||
                event.issuer_id !== inclusion.issuer_id) {
                throw new Error(`Event ${address} differs from its provenance witness.`);
            }
            if (carried)
                carriedEventIds.add(address);
            events.push(event);
        }
        else if (path.startsWith("observations/")) {
            const observation = observationSchema.parse(JSON.parse(bytes.toString("utf8")));
            const address = addressFromJsonPath(path);
            const { observation_id: observationId, ...core } = observation;
            if (address !== observationId || digest(core) !== observationId) {
                throw new Error(`Observation object ${path} is not content-addressed correctly.`);
            }
            observations.push(observation);
        }
    }
    // Every event has its witness, so equal sizes make the two sets equal.
    if (eventIds.size !== Object.keys(provenance.events).length) {
        throw new Error("Event objects and their provenance witnesses disagree.");
    }
    const attestedCaptures = await verifyReleasedCaptureRecords({
        files,
        inclusions: provenance.capture_attestations,
        releaseSequence,
        registryFor: (signerRegistryDigest) => trustedRegistries.get(signerRegistryDigest),
    });
    if (JSON.stringify(inputSet.capture_attestation_digests) !==
        JSON.stringify(attestedCaptureDigests(attestedCaptures))) {
        throw new Error("Closed input set disagrees with the capture attestation set.");
    }
    verifyReleasedAuthoringClosure(authoring, artifact.entities);
    const agentReadinessProfiles = Object.values(agentReadinessIndex.profiles)
        .map((entry) => {
        const profile = agentReadinessProjectionSchema.parse(parseJsonFile(files, entry.path, CATALOG_RELEASE));
        const { projection_digest: projectionDigest, ...core } = profile;
        if (profile.agent_readiness_profile_id !== entry.agent_readiness_profile_id ||
            projectionDigest !== entry.projection_digest ||
            digest(agentReadinessProjectionCoreSchema.parse(core)) !== projectionDigest) {
            throw new Error(`Agent readiness projection ${entry.agent_readiness_profile_id} is not content-addressed correctly.`);
        }
        return profile;
    })
        .sort((left, right) => compareCanonicalStrings(left.agent_readiness_profile_id, right.agent_readiness_profile_id));
    const agentReadinessOfferRelations = Object.values(agentReadinessOfferRelationIndex.relations).sort((left, right) => compareCanonicalStrings(left.relation_id, right.relation_id));
    assertReleasedAgentReadinessOfferRelationClosure({
        artifact,
        profiles: agentReadinessProfiles,
        relations: agentReadinessOfferRelations,
        inputs: agentReadinessOfferRelationInputs,
        files,
    });
    assertArtifactClosure(artifact, revisions, provenance, events, carriedEventIds, observations, attestedCaptures, changes, files, bundle.files, agentReadinessProfiles, assetIndex, assetNotices, agentReadinessInputs, assetInputs, environment, replayEvidenceObjects);
    return {
        bundle,
        descriptor,
        artifact,
        authoring: [...authoring.values()].sort((left, right) => compareCanonicalStrings(left.entity.entity_id, right.entity.entity_id)),
        routes,
        identities,
        provenance,
        agentReadinessIndex,
        agentReadinessProfiles,
        agentReadinessOfferRelations,
        assetIndex,
        assetNotices,
        rootSet,
        registry,
        events: events.sort((left, right) => compareCanonicalStrings(left.event_id, right.event_id)),
        observations: observations.sort((left, right) => compareCanonicalStrings(left.observation_id, right.observation_id)),
        attestedCaptures,
        revisions,
        files,
    };
}
function assertArtifactClosure(artifact, revisions, provenance, events, carriedEventIds, observations, attestedCaptures, changes, files, declarations, agentReadinessProfiles, assetIndex, assetNotices, agentReadinessInputs, assetInputs, environment, replayEvidenceObjects) {
    const eventsById = new Map(events.map((event) => [event.event_id, event]));
    const observationIds = new Set(observations.map((observation) => observation.observation_id));
    for (const entity of artifact.entities) {
        for (const subject of [entity, ...entity.programs, ...entity.offers]) {
            if (!revisions.has(subject.revision_digest)) {
                throw new Error(`Artifact targets missing revision ${subject.revision_digest}.`);
            }
            const entry = provenance.revisions[subject.revision_digest];
            if (!entry)
                throw new Error(`Revision ${subject.revision_digest} lacks provenance closure.`);
            if (JSON.stringify(entry.event_ids) !==
                JSON.stringify([...subject.provenance.basis_event_ids].sort()) ||
                entry.coverage_policy_digest !== subject.provenance.coverage_policy_digest ||
                entry.freshness_policy_digest !== subject.provenance.freshness_policy_digest) {
                throw new Error(`Revision ${subject.revision_digest} provenance index disagrees with its projection basis.`);
            }
            const expectedObservationIds = boundObservationIds(entry.event_ids, eventsById);
            if (JSON.stringify(entry.observation_ids) !== JSON.stringify(expectedObservationIds)) {
                throw new Error(`Revision ${subject.revision_digest} provenance observations disagree with its events.`);
            }
            for (const eventId of entry.event_ids) {
                if (!eventsById.has(eventId)) {
                    throw new Error(`Provenance targets missing event ${eventId}.`);
                }
            }
            for (const observationId of entry.observation_ids) {
                if (!observationIds.has(observationId)) {
                    throw new Error(`Provenance targets missing observation ${observationId}.`);
                }
            }
        }
    }
    assertReleasedAgentReadinessClosure({
        artifact,
        revisions,
        events,
        profiles: agentReadinessProfiles,
        inputs: agentReadinessInputs,
    });
    assertReleasedAssetClosure({
        artifact,
        events,
        declarations,
        index: assetIndex,
        notices: assetNotices,
        inputs: assetInputs,
    });
    if (replayEvidenceObjects) {
        verifyEvidenceObjectGraph({
            revisions: [...revisions.values()],
            events,
            carriedEventIds,
            observations,
            attestedCaptures,
            ...releasedEvidenceObjects(observations, files, declarations),
            capturesProven: true,
            allowFixtureEvidence: environment === "dogfood",
        });
    }
    for (const policy of artifact.policies) {
        const bytes = files.get(releasePolicyObjectPath(policy.revision_digest));
        if (!bytes)
            throw new Error(`Policy ${policy.revision_digest} lacks its addressed object.`);
        const parsed = compiledPolicySchema.parse(JSON.parse(bytes.toString("utf8")));
        if (parsed.revision_digest !== policy.revision_digest ||
            catalogPolicyRevisionDigest(parsed) !== parsed.revision_digest) {
            throw new Error(`Policy ${policy.revision_digest} is not content-addressed correctly.`);
        }
    }
    const currentEntities = new Map(artifact.entities.map((entity) => [entity.entity_id, entity]));
    const currentPrograms = new Map(artifact.entities.flatMap((entity) => entity.programs.map((program) => [program.program_id, program])));
    const currentOffers = new Map(artifact.entities.flatMap((entity) => entity.offers.map((offer) => [offer.offer_id, offer])));
    const currentPolicies = new Map(artifact.policies.map((policy) => [policy.slug, policy]));
    const currentAgentReadinessProfiles = new Map(agentReadinessProfiles.map((profile) => [profile.agent_readiness_profile_id, profile]));
    const currentAssetBindings = new Map(assetIndex.bindings.map((binding) => [binding.binding_event_id, binding]));
    for (const change of changes) {
        if (change.subject_type === "entity" && change.revision_digest) {
            const entity = currentEntities.get(change.subject_id);
            if (!entity || entity.revision_digest !== change.revision_digest) {
                throw new Error(`Entity change ${change.change_id} does not target the current entity.`);
            }
            if (change.projection_digest !== undefined &&
                change.projection_digest !== catalogEntityProjectionDigest(entity)) {
                throw new Error(`Entity change ${change.change_id} has the wrong projection digest.`);
            }
        }
        else if (change.subject_type === "program" && change.revision_digest) {
            const program = currentPrograms.get(change.subject_id);
            if (!program || program.revision_digest !== change.revision_digest) {
                throw new Error(`Program change ${change.change_id} does not target the current program.`);
            }
            if (change.projection_digest !== undefined &&
                change.projection_digest !== catalogProgramProjectionDigest(program)) {
                throw new Error(`Program change ${change.change_id} has the wrong projection digest.`);
            }
        }
        else if (change.subject_type === "offer" && change.revision_digest) {
            const offer = currentOffers.get(change.subject_id);
            if (!offer || offer.revision_digest !== change.revision_digest) {
                throw new Error(`Offer change ${change.change_id} does not target the current offer.`);
            }
            if (change.projection_digest !== undefined &&
                change.projection_digest !== catalogOfferProjectionDigest(offer)) {
                throw new Error(`Offer change ${change.change_id} has the wrong projection digest.`);
            }
        }
        else if (change.subject_type === "policy" && change.revision_digest) {
            const policy = currentPolicies.get(change.subject_id);
            if (!policy ||
                policy.revision_digest !== change.revision_digest ||
                (change.projection_digest !== undefined &&
                    change.projection_digest !== policy.revision_digest)) {
                throw new Error(`Policy change ${change.change_id} does not target the current policy.`);
            }
        }
        else if (change.subject_type === "agent_readiness_profile" && change.revision_digest) {
            const profile = currentAgentReadinessProfiles.get(change.subject_id);
            if (!profile ||
                profile.revision_digest !== change.revision_digest ||
                (change.projection_digest !== undefined &&
                    change.projection_digest !== profile.projection_digest)) {
                throw new Error(`Agent readiness change ${change.change_id} does not target the current profile.`);
            }
        }
        else if (change.subject_type === "asset_binding" && change.kind !== "asset.withdrawn") {
            const binding = currentAssetBindings.get(change.subject_id);
            if (!binding ||
                (change.projection_digest !== undefined && change.projection_digest !== digest(binding))) {
                throw new Error(`Asset change ${change.change_id} does not target the current binding.`);
            }
        }
    }
}
function addressFromJsonPath(path) {
    return digestFromPathSegment(basename(path, ".json"));
}
function assertDigest(label, actual, expected) {
    if (actual !== expected)
        throw new Error(`${label} digest mismatch.`);
}
//# sourceMappingURL=index.js.map