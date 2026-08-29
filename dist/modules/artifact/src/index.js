import { readdir, readFile } from "node:fs/promises";
import { basename, join, relative, sep } from "node:path";
import { agentReadinessDeclarationRevisionSchema, agentReadinessIndexSchema, agentReadinessInputsSchema, agentReadinessOfferRelationIndexSchema, agentReadinessOfferRelationInputsSchema, agentReadinessProjectionCoreSchema, agentReadinessProjectionSchema, agentReadinessRevisionSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { canonicalArtifactSchema, compiledPolicySchema, identityIndexSchema, provenanceIndexSchema, releaseChangeSchema, releaseDiffSchema, searchIndexSchema, } from "../../../contracts/artifact/src/index.js";
import { assetIndexSchema, assetInputsSchema, assetNoticesSchema, } from "../../../contracts/assets/src/index.js";
import { entityAuthoringSchema, } from "../../../contracts/authoring/src/index.js";
import { rootSetSchema, rootSetTransitionSchema } from "../../../contracts/authority/src/index.js";
import { captureReceiptSchema, } from "../../../contracts/evidence/src/index.js";
import { observationSchema } from "../../../contracts/observations/src/index.js";
import { catalogReleaseBundleCoreSchema, catalogReleaseBundleSchema, RELEASE_RESOURCES, releaseDescriptorSchema, releaseObjectManifestSchema, releaseResourceDigest, } from "../../../contracts/release/src/index.js";
import { entityRevisionSchema, offerRevisionSchema, programRevisionSchema, } from "../../../contracts/revisions/src/index.js";
import { routeIndexSchema } from "../../../contracts/routes/src/index.js";
import { validateProtectedCaptureReceipt, validateProtectedEvent, validateRootSetTransition, validateSignerRegistry, } from "../../authority/src/index.js";
import { verifyEvidenceObjectGraph } from "../../evidence-operations/src/proof-graph.js";
import { canonicalJson, compareCanonicalStrings, digest, digestFromPathSegment, sha256Bytes, } from "../../primitives/src/index.js";
import { assertReleasedAgentReadinessClosure, assertReleasedAgentReadinessOfferRelationClosure, } from "./agent-readiness-closure.js";
import { assertReleasedAssetClosure } from "./asset-closure.js";
import { verifyReleasedAuthoringClosure } from "./authoring-closure.js";
import { validateTrustHistory } from "./trust-history.js";
export async function verifyCatalogReleaseDirectory(directory, trust) {
    return inspectCatalogReleaseDirectory(directory, trust, true);
}
/**
 * Loads an exact bundle already admitted with verifyCatalogReleaseDirectory and
 * pinned by an immutable consumer lock. It repeats byte closure, schemas,
 * identities, signatures, and semantic graph closure, but does not re-run raw
 * capture normalization on every serving-process start.
 */
export async function loadAdmittedCatalogReleaseDirectory(directory, trust) {
    return inspectCatalogReleaseDirectory(directory, trust, false);
}
async function inspectCatalogReleaseDirectory(directory, trust, replayEvidenceObjects) {
    const bundle = catalogReleaseBundleSchema.parse(JSON.parse(await readFile(join(directory, "bundle.json"), "utf8")));
    const { bundle_digest: bundleDigest, ...bundleCoreInput } = bundle;
    const bundleCore = catalogReleaseBundleCoreSchema.parse(bundleCoreInput);
    if (digest(bundleCore) !== bundleDigest) {
        throw new Error("Release bundle digest does not match its canonical core.");
    }
    const actualPaths = (await filesUnder(directory))
        .map((file) => relative(directory, file).split(sep).join("/"))
        .filter((path) => path !== "bundle.json")
        .sort();
    const declaredPaths = Object.keys(bundle.files).sort();
    if (JSON.stringify(actualPaths) !== JSON.stringify(declaredPaths)) {
        throw new Error("Release file set does not match its immutable declaration.");
    }
    const files = new Map();
    for (const path of declaredPaths) {
        const bytes = await readFile(join(directory, path));
        const declaration = bundle.files[path];
        if (!declaration)
            throw new Error(`Missing bundle declaration for ${path}.`);
        if (bytes.byteLength !== declaration.bytes || sha256Bytes(bytes) !== declaration.sha256) {
            throw new Error(`Release file ${path} does not match its byte declaration.`);
        }
        files.set(path, bytes);
    }
    const artifact = canonicalArtifactSchema.parse(parseJson(files, "catalog.json"));
    const routes = routeIndexSchema.parse(parseJson(files, "routes.json"));
    const identities = identityIndexSchema.parse(parseJson(files, "identities.json"));
    const search = searchIndexSchema.parse(parseJson(files, "indexes/search.json"));
    const agentReadinessIndex = agentReadinessIndexSchema.parse(parseJson(files, "indexes/agent-readiness.json"));
    const hasAgentReadinessOfferRelations = bundle.release.snapshot_core.resource_digests[RELEASE_RESOURCES.agentReadinessOfferRelationIndex] !== undefined ||
        bundle.release.snapshot_core.resource_digests[RELEASE_RESOURCES.agentReadinessOfferRelationInputs] !== undefined;
    if (hasAgentReadinessOfferRelations &&
        (bundle.release.snapshot_core.resource_digests[RELEASE_RESOURCES.agentReadinessOfferRelationIndex] === undefined ||
            bundle.release.snapshot_core.resource_digests[RELEASE_RESOURCES.agentReadinessOfferRelationInputs] === undefined)) {
        throw new Error("Release has an incomplete Agent Readiness Offer relation resource pair.");
    }
    const agentReadinessOfferRelationIndex = agentReadinessOfferRelationIndexSchema.parse(hasAgentReadinessOfferRelations
        ? parseJson(files, "indexes/agent-readiness-offer-relations.json")
        : {
            relation_index_contract: "sourcey.agent-readiness-offer-relation-index/v1alpha1",
            relations: {},
            by_profile: {},
            by_offer: {},
        });
    const assetIndex = assetIndexSchema.parse(parseJson(files, "assets/index.json"));
    const assetNotices = assetNoticesSchema.parse(parseJson(files, "assets/notices.json"));
    const provenance = provenanceIndexSchema.parse(parseJson(files, "provenance/index.json"));
    const descriptor = releaseDescriptorSchema.parse(parseJson(files, "release.json"));
    const releaseDiff = releaseDiffSchema.parse(parseJson(files, "release-diff.json"));
    const objectManifest = releaseObjectManifestSchema.parse(parseJson(files, "manifest.json"));
    assertDigest("release object manifest", digest(objectManifest), bundle.object_manifest_digest);
    const expectedManifestPaths = Object.keys(bundle.files)
        .filter((path) => !["manifest.json", "changes.ndjson", "release-diff.json", "release.json"].includes(path))
        .sort();
    if (JSON.stringify(Object.keys(objectManifest.objects).sort()) !==
        JSON.stringify(expectedManifestPaths)) {
        throw new Error("Release object manifest does not close the semantic object set.");
    }
    for (const [path, declaration] of Object.entries(objectManifest.objects)) {
        const bundleDeclaration = bundle.files[path];
        if (!bundleDeclaration ||
            bundleDeclaration.sha256 !== declaration.sha256 ||
            bundleDeclaration.bytes !== declaration.bytes) {
            throw new Error(`Release object manifest disagrees with bundle file ${path}.`);
        }
    }
    if (digest(descriptor.snapshot_core) !== descriptor.snapshot_id) {
        throw new Error("Snapshot ID does not match the canonical snapshot core.");
    }
    if (digest(descriptor.release_core) !== descriptor.release_id) {
        throw new Error("Release ID does not match the canonical release core.");
    }
    if (descriptor.release_core.snapshot_id !== descriptor.snapshot_id ||
        descriptor.release_core.release_sequence !== descriptor.snapshot_core.release_sequence) {
        throw new Error("Release and snapshot cores disagree.");
    }
    if (bundle.release.release_id !== descriptor.release_id ||
        bundle.release.snapshot_id !== descriptor.snapshot_id) {
        throw new Error("Release and release descriptor identities disagree.");
    }
    if (releaseDiff.snapshot_id !== descriptor.snapshot_id ||
        (descriptor.release_core.parent_release_id === null) !==
            (releaseDiff.parent_snapshot_id === null)) {
        throw new Error("Release diff does not bind the descriptor's snapshot chain.");
    }
    const changeBytes = requiredFile(files, "changes.ndjson");
    if (sha256Bytes(changeBytes) !== descriptor.release_core.diff_digest) {
        throw new Error("Release diff bytes do not match release_core.diff_digest.");
    }
    const changes = parseNdjson(changeBytes).map((value) => releaseChangeSchema.parse(value));
    if (JSON.stringify(changes) !== JSON.stringify(releaseDiff.changes)) {
        throw new Error("changes.ndjson and release-diff.json disagree.");
    }
    for (const change of changes) {
        const { change_id: changeId, ...core } = change;
        if (digest(core) !== changeId)
            throw new Error(`Change ${changeId} has an invalid identity.`);
    }
    const changeIds = new Set(changes.map((change) => change.change_id));
    if (changeIds.size !== changes.length)
        throw new Error("Release diff contains duplicate changes.");
    const orderedChanges = [...changes].sort((left, right) => compareCanonicalStrings(left.subject_type, right.subject_type) ||
        compareCanonicalStrings(left.subject_id, right.subject_id) ||
        compareCanonicalStrings(left.kind, right.kind));
    if (JSON.stringify(changes) !== JSON.stringify(orderedChanges)) {
        throw new Error("Release diff changes are not in canonical order.");
    }
    const snapshot = descriptor.snapshot_core;
    assertDigest("artifact", digest(artifact), snapshot.artifact_digest);
    assertDigest("routes", digest(routes), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.routes));
    assertDigest("identities", digest(identities), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.identities));
    assertDigest("search index", digest(search), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.searchIndex));
    assertDigest("agent readiness index", digest(agentReadinessIndex), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.agentReadinessIndex));
    assertDigest("asset index", digest(assetIndex), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.assetIndex));
    const agentReadinessInputs = agentReadinessInputsSchema.parse(parseJson(files, "inputs/agent-readiness.json"));
    const agentReadinessOfferRelationInputs = agentReadinessOfferRelationInputsSchema.parse(hasAgentReadinessOfferRelations
        ? parseJson(files, "inputs/agent-readiness-offer-relations.json")
        : {
            input_contract: "sourcey.agent-readiness-offer-relation-inputs/v1alpha1",
            relations: [],
        });
    const assetInputs = assetInputsSchema.parse(parseJson(files, "inputs/assets.json"));
    assertDigest("agent readiness inputs", digest(agentReadinessInputs), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.agentReadinessInputs));
    if (hasAgentReadinessOfferRelations) {
        assertDigest("agent readiness Offer relation index", digest(agentReadinessOfferRelationIndex), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.agentReadinessOfferRelationIndex));
        assertDigest("agent readiness Offer relation inputs", digest(agentReadinessOfferRelationInputs), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.agentReadinessOfferRelationInputs));
    }
    assertDigest("asset inputs", digest(assetInputs), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.assetInputs));
    if (releaseResourceDigest(bundle.resource_digests, RELEASE_RESOURCES.agentReadinessPolicy) !==
        agentReadinessInputs.policy_digest ||
        releaseResourceDigest(bundle.resource_digests, RELEASE_RESOURCES.assetManifest) !==
            assetInputs.manifest_digest) {
        throw new Error("Release input declarations disagree with the closed input set.");
    }
    const agentReadinessPolicyPath = `policies/${releaseResourceDigest(bundle.resource_digests, RELEASE_RESOURCES.agentReadinessPolicy).replace(":", "-")}.json`;
    if (!files.has(agentReadinessPolicyPath)) {
        throw new Error("Release is missing its addressed agent readiness policy.");
    }
    assertDigest("observation inputs", digest(parseJson(files, "inputs/observations.json")), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.observationInputs));
    assertDigest("policy inputs", digest(parseJson(files, "inputs/policies.json")), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.policyInputs));
    const inputSet = parseJson(files, "inputs/input-set.json");
    assertDigest("input set", digest(inputSet), snapshot.input_set_digest);
    const declaredEnvironment = typeof inputSet === "object" && inputSet !== null
        ? inputSet.environment
        : undefined;
    const environment = declaredEnvironment ??
        (artifact.entities.every((entity) => new URL(entity.website).hostname.endsWith(".example"))
            ? "dogfood"
            : undefined);
    if (environment !== "production" && environment !== "dogfood") {
        throw new Error("Release closed input set lacks its environment boundary.");
    }
    const admittedInputs = [...new Set(bundle.admitted_input_digests)].sort(compareCanonicalStrings);
    if (canonicalJson(admittedInputs) !== canonicalJson(bundle.admitted_input_digests)) {
        throw new Error("Catalog admitted inputs must be unique and canonically ordered.");
    }
    assertDigest("provenance", digest(provenance), releaseResourceDigest(snapshot.resource_digests, RELEASE_RESOURCES.provenance));
    assertDigest("root set", artifact.root_set_digest, snapshot.root_set_digest);
    assertDigest("signer registry", artifact.signer_registry_digest, snapshot.signer_registry_digest);
    const rootPath = `trust/roots/${artifact.root_set_digest.replace(":", "-")}.json`;
    const registryPath = `trust/registries/${artifact.signer_registry_digest.replace(":", "-")}.json`;
    const rootSet = rootSetSchema.parse(parseJson(files, rootPath));
    if (digest(rootSet) !== artifact.root_set_digest)
        throw new Error("Root-set object is misaddressed.");
    if (trust && artifact.root_set_digest !== trust.rootSetDigest) {
        throw new Error("Release root set does not match the caller's trusted root pin.");
    }
    const registry = validateSignerRegistry(rootSet, parseJson(files, registryPath));
    if (registry.registry_digest !== artifact.signer_registry_digest) {
        throw new Error("Signer-registry object is misaddressed.");
    }
    const transitionDigest = snapshot.trust_transition_digest ?? null;
    if (transitionDigest) {
        const transitionPath = `trust/transitions/${transitionDigest.replace(":", "-")}.json`;
        const transition = rootSetTransitionSchema.parse(parseJson(files, transitionPath));
        if (transition.transition_digest !== transitionDigest) {
            throw new Error("Root-set transition object is misaddressed.");
        }
        const previousRootPath = `trust/roots/${transition.previous_root_set_digest.replace(":", "-")}.json`;
        const previousRootSet = rootSetSchema.parse(parseJson(files, previousRootPath));
        validateRootSetTransition({
            previousRootSet,
            nextRootSet: rootSet,
            transition,
            releaseSequence: descriptor.release_core.release_sequence,
        });
    }
    const trustedRegistries = validateTrustHistory(files, rootSet, registry);
    const revisions = new Map();
    const authoring = new Map();
    const hasCurrentAuthoring = [...files.keys()].some((path) => path.startsWith("authoring/entities/"));
    const events = [];
    const observations = [];
    const captureReceipts = [];
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
            const input = JSON.parse(bytes.toString("utf8"));
            const revision = input.revision_contract === "sourcey.entity-revision/v1alpha1"
                ? entityRevisionSchema.parse(input)
                : input.revision_contract === "sourcey.program-revision/v1alpha1"
                    ? programRevisionSchema.parse(input)
                    : input.revision_contract === "sourcey.offer-revision/v1alpha1"
                        ? offerRevisionSchema.parse(input)
                        : input.revision_contract === "sourcey.agent-readiness-revision/v1alpha1"
                            ? agentReadinessRevisionSchema.parse(input)
                            : agentReadinessDeclarationRevisionSchema.parse(input);
            const address = addressFromJsonPath(path);
            const { revision_digest: revisionDigest, ...core } = revision;
            if (address !== revisionDigest || digest(core) !== revisionDigest) {
                throw new Error(`Revision object ${path} is not content-addressed correctly.`);
            }
            revisions.set(revisionDigest, revision);
        }
        else if (path.startsWith("events/")) {
            const input = JSON.parse(bytes.toString("utf8"));
            const address = addressFromJsonPath(path);
            if (input.event_id !== address)
                throw new Error(`Event object ${path} is misaddressed.`);
            const inclusion = provenance.events[address];
            if (!inclusion)
                throw new Error(`Event ${address} lacks first-inclusion provenance.`);
            const eventRegistry = trustedRegistries.get(input.protected?.signer_registry_digest);
            if (!eventRegistry) {
                throw new Error(`Event ${address} names a registry outside the trusted history.`);
            }
            const event = validateProtectedEvent(input, eventRegistry, inclusion.first_inclusion_sequence);
            if (digest(event) !== inclusion.event_object_digest) {
                throw new Error(`Event ${address} differs from its witnessed object digest.`);
            }
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
        else if (path.startsWith("capture-receipts/")) {
            const input = captureReceiptSchema.parse(JSON.parse(bytes.toString("utf8")));
            const address = addressFromJsonPath(path);
            if (input.receipt_digest !== address) {
                throw new Error(`Capture receipt object ${path} is misaddressed.`);
            }
            const inclusion = provenance.capture_receipts?.[address];
            if (!inclusion) {
                throw new Error(`Capture receipt ${address} lacks first-inclusion provenance.`);
            }
            const receiptRegistry = trustedRegistries.get(input.protected.signer_registry_digest);
            if (!receiptRegistry) {
                throw new Error(`Capture receipt ${address} names a registry outside the trusted history.`);
            }
            const receipt = validateProtectedCaptureReceipt(input, receiptRegistry, inclusion.first_inclusion_sequence);
            if (digest(receipt) !== inclusion.receipt_object_digest) {
                throw new Error(`Capture receipt ${address} differs from its witnessed object digest.`);
            }
            captureReceipts.push(receipt);
        }
    }
    const receiptAddresses = captureReceipts
        .map((receipt) => receipt.receipt_digest)
        .sort(compareCanonicalStrings);
    const witnessedReceiptAddresses = Object.keys(provenance.capture_receipts ?? {}).sort(compareCanonicalStrings);
    if (JSON.stringify(receiptAddresses) !== JSON.stringify(witnessedReceiptAddresses)) {
        throw new Error("Capture receipt objects and provenance witnesses disagree.");
    }
    // Authoring is a release-generation input, not a timeless wire contract.
    // Current releases publish it under the current contract-owned path and can
    // be recompiled for closure. Historical releases retain their original
    // bytes and remain verifiable through their immutable bundle, manifest,
    // projections, revisions, signatures, and provenance without being parsed
    // by a later authoring schema.
    if (hasCurrentAuthoring) {
        verifyReleasedAuthoringClosure(authoring, artifact.entities);
    }
    const inputSetRecord = typeof inputSet === "object" && inputSet !== null ? inputSet : {};
    const declaredCaptureReceipts = inputSetRecord.capture_receipt_digests;
    if ((environment === "production" && !Array.isArray(declaredCaptureReceipts)) ||
        (declaredCaptureReceipts !== undefined &&
            (!Array.isArray(declaredCaptureReceipts) ||
                declaredCaptureReceipts.some((value) => typeof value !== "string"))) ||
        JSON.stringify(Array.isArray(declaredCaptureReceipts) ? declaredCaptureReceipts : []) !==
            JSON.stringify(receiptAddresses)) {
        throw new Error("Closed input set disagrees with the capture receipt set.");
    }
    const agentReadinessProfiles = Object.values(agentReadinessIndex.profiles)
        .map((entry) => {
        const profile = agentReadinessProjectionSchema.parse(parseJson(files, entry.path));
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
    assertArtifactClosure(artifact, revisions, provenance, events, observations, captureReceipts, changes, files, agentReadinessProfiles, assetIndex, assetNotices, agentReadinessInputs, assetInputs, environment, replayEvidenceObjects);
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
        captureReceipts: captureReceipts.sort((left, right) => compareCanonicalStrings(left.receipt_digest, right.receipt_digest)),
        revisions,
        files,
    };
}
function assertArtifactClosure(artifact, revisions, provenance, events, observations, captureReceipts, changes, files, agentReadinessProfiles, assetIndex, assetNotices, agentReadinessInputs, assetInputs, environment, replayEvidenceObjects) {
    const eventIds = new Set(events.map((event) => event.event_id));
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
            const expectedObservationIds = entry.event_ids
                .flatMap((eventId) => {
                const event = events.find((bundle) => bundle.event_id === eventId);
                if (event?.kind !== "evidence.bound")
                    return [];
                const observationId = event.payload.observation_id;
                return typeof observationId === "string" ? [observationId] : [];
            })
                .filter((value, index, values) => values.indexOf(value) === index)
                .sort();
            if (JSON.stringify(entry.observation_ids) !== JSON.stringify(expectedObservationIds)) {
                throw new Error(`Revision ${subject.revision_digest} provenance observations disagree with its events.`);
            }
            for (const eventId of entry.event_ids) {
                if (!eventIds.has(eventId)) {
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
        provenance,
        events,
        observations,
        profiles: agentReadinessProfiles,
        inputs: agentReadinessInputs,
    });
    assertReleasedAssetClosure({
        artifact,
        events,
        files,
        index: assetIndex,
        notices: assetNotices,
        inputs: assetInputs,
    });
    const captureBytes = new Map();
    const normalizedObjects = new Map();
    for (const observation of observations) {
        if (observation.capture?.availability !== "public")
            continue;
        const captureDigest = observation.capture.digest;
        const capture = files.get(`captures/${captureDigest.replace(":", "-")}`);
        if (capture)
            captureBytes.set(captureDigest, capture);
        const normalizedDigest = observation.capture.normalized_object?.digest;
        if (normalizedDigest) {
            const normalized = files.get(`evidence/normalized/${normalizedDigest.replace(":", "-")}`);
            if (normalized)
                normalizedObjects.set(normalizedDigest, normalized);
        }
    }
    if (replayEvidenceObjects) {
        verifyEvidenceObjectGraph({
            revisions: [...revisions.values()],
            events,
            observations,
            captureReceipts,
            captures: captureBytes,
            normalizedObjects,
            allowFixtureEvidence: environment === "dogfood",
        });
    }
    for (const policy of artifact.policies) {
        const policyPath = `policies/${policy.revision_digest.replace(":", "-")}.json`;
        const bytes = files.get(policyPath);
        if (!bytes)
            throw new Error(`Policy ${policy.revision_digest} lacks its addressed object.`);
        const parsed = compiledPolicySchema.parse(JSON.parse(bytes.toString("utf8")));
        const { revision_digest: revisionDigest, ...core } = parsed;
        if (revisionDigest !== policy.revision_digest || digest(core) !== revisionDigest) {
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
            const { programs: _, offers: __, ...projection } = entity;
            if (change.projection_digest !== undefined &&
                change.projection_digest !== digest(projection)) {
                throw new Error(`Entity change ${change.change_id} has the wrong projection digest.`);
            }
        }
        else if (change.subject_type === "program" && change.revision_digest) {
            const program = currentPrograms.get(change.subject_id);
            if (!program || program.revision_digest !== change.revision_digest) {
                throw new Error(`Program change ${change.change_id} does not target the current program.`);
            }
            if (change.projection_digest !== undefined && change.projection_digest !== digest(program)) {
                throw new Error(`Program change ${change.change_id} has the wrong projection digest.`);
            }
        }
        else if (change.subject_type === "offer" && change.revision_digest) {
            const offer = currentOffers.get(change.subject_id);
            if (!offer || offer.revision_digest !== change.revision_digest) {
                throw new Error(`Offer change ${change.change_id} does not target the current offer.`);
            }
            if (change.projection_digest !== undefined && change.projection_digest !== digest(offer)) {
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
function parseJson(files, path) {
    return JSON.parse(requiredFile(files, path).toString("utf8"));
}
function requiredFile(files, path) {
    const bytes = files.get(path);
    if (!bytes)
        throw new Error(`Release is missing ${path}.`);
    return bytes;
}
function parseNdjson(bytes) {
    return bytes
        .toString("utf8")
        .split("\n")
        .filter((line) => line.length > 0)
        .map((line) => JSON.parse(line));
}
function addressFromJsonPath(path) {
    return digestFromPathSegment(basename(path, ".json"));
}
function assertDigest(label, actual, expected) {
    if (actual !== expected)
        throw new Error(`${label} digest mismatch.`);
}
async function filesUnder(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const nested = await Promise.all(entries.map((entry) => {
        const path = join(directory, entry.name);
        return entry.isDirectory() ? filesUnder(path) : [path];
    }));
    return nested.flat();
}
//# sourceMappingURL=index.js.map