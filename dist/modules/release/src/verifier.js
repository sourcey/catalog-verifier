import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { agentReadinessDeltaObjectSchema, agentReadinessInputsSchema, agentReadinessOfferRelationDeltaObjectSchema, agentReadinessOfferRelationInputsSchema, agentReadinessOfferRelationRevisionCoreSchema, agentReadinessProfileInputSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { assetDeltaSchema } from "../../../contracts/assets/src/index.js";
import { rootSetSchema } from "../../../contracts/authority/src/index.js";
import { captureReceiptSchema, } from "../../../contracts/evidence/src/index.js";
import { observationSchema } from "../../../contracts/observations/src/index.js";
import { catalogDeltaAuthoringObjectSchema, catalogDeltaEntityObjectSchema, catalogDeltaSchema, RELEASE_RESOURCES, releaseDescriptorSchema, releaseObjectManifestSchema, releaseResourceDigest, releaseRootSetObjectPath, releaseSignerRegistryObjectPath, verifyCatalogReleaseBundle, } from "../../../contracts/release/src/index.js";
import { compileAgentReadinessOfferRelationRevision, compileAgentReadinessRevision, deriveAgentReadinessProjection, } from "../../agent-readiness-policy/src/index.js";
import { addressFromReleaseJsonPath, parseReleaseJson, verifiedReleaseFiles, } from "../../artifact/src/release-directory-files.js";
import { verifyAssetDelta } from "../../assets/src/index.js";
import { validateProtectedCaptureReceipt, validateProtectedEvent, validateSignerRegistry, } from "../../authority/src/index.js";
import { verifyCatalogPublicationAuthoringChanges } from "../../catalog-admission/src/publication-composition.js";
import { verifyEvidenceObjectGraph } from "../../evidence-operations/src/proof-graph.js";
import { canonicalJson, compareCanonicalStrings, digest, digestFromPathSegment, digestPathSegment, sha256Bytes, } from "../../primitives/src/index.js";
import { buildEventGraph } from "../../provenance/src/index.js";
import { verifyAgentReadinessPublicationInputs } from "./agent-readiness-publication-inputs.js";
import { AGENT_READINESS_REGRADE_EVIDENCE_PREFIX, assertAgentReadinessRegradeEvidenceClosure, expectedAgentReadinessRegradeProjection, readAgentReadinessRegradeEvidenceFile, selectAgentReadinessEvidenceChanges, } from "./agent-readiness-regrade-evidence.js";
import { assertCatalogAssetDeltaClosure } from "./asset-delta-verifier.js";
import { assertAgentReadinessReleaseAdmission, validateAgentReadinessClosure } from "./inputs.js";
import { verifyPublicationInputs } from "./publication-inputs.js";
import { catalogPublicationParentGuard, } from "./publication-parent-guard.js";
import { parseReleaseRevision } from "./release-revision-parser.js";
import { buildDeltaSnapshotCore, verifyCatalogDeltaState } from "./transition.js";
import { verifyChanges } from "./verification-changes.js";
import { verifyCatalogDeltaPolicies } from "./verification-policies.js";
import { verifiedAgentReadinessOfferRelationTransitions, verifiedAgentReadinessTransitions, verifyAgentReadinessOfferRelationWithdrawals, } from "./verification-transitions.js";
export async function verifyCatalogDeltaDirectory(directory, trust) {
    const bundle = verifyCatalogReleaseBundle(JSON.parse(await readFile(join(directory, "bundle.json"), "utf8")));
    const admittedInputs = [...new Set(bundle.admitted_input_digests)].sort(compareCanonicalStrings);
    if (canonicalJson(admittedInputs) !== canonicalJson(bundle.admitted_input_digests)) {
        throw new Error("Catalog delta admitted inputs must be unique and canonically ordered.");
    }
    const files = await verifiedReleaseFiles(directory, bundle);
    const delta = catalogDeltaSchema.parse(parseReleaseJson(files, "delta.json"));
    verifyCatalogDeltaState(delta);
    if (delta.object_manifest_digest !== bundle.object_manifest_digest) {
        throw new Error("Catalog delta and bundle do not address the same object manifest.");
    }
    const descriptor = releaseDescriptorSchema.parse(parseReleaseJson(files, "release.json"));
    const manifest = releaseObjectManifestSchema.parse(parseReleaseJson(files, "manifest.json"));
    if (digest(manifest) !== bundle.object_manifest_digest) {
        throw new Error("Catalog delta object manifest digest does not match the bundle.");
    }
    const manifestPaths = Object.keys(bundle.files)
        .filter((path) => ![
        "manifest.json",
        "delta.json",
        "changes.ndjson",
        "release-diff.json",
        "release.json",
    ].includes(path))
        .sort(compareCanonicalStrings);
    if (JSON.stringify(Object.keys(manifest.objects).sort(compareCanonicalStrings)) !==
        JSON.stringify(manifestPaths)) {
        throw new Error("Catalog delta object manifest does not close the exact payload.");
    }
    for (const [path, declaration] of Object.entries(manifest.objects)) {
        const bundleDeclaration = bundle.files[path];
        if (!bundleDeclaration ||
            bundleDeclaration.sha256 !== declaration.sha256 ||
            bundleDeclaration.bytes !== declaration.bytes) {
            throw new Error(`Catalog delta manifest disagrees with ${path}.`);
        }
    }
    const rootSet = rootSetSchema.parse(parseReleaseJson(files, releaseRootSetObjectPath(descriptor.snapshot_core.root_set_digest)));
    if (digest(rootSet) !== descriptor.snapshot_core.root_set_digest) {
        throw new Error("Catalog delta root set is not addressed by the snapshot.");
    }
    if (trust && digest(rootSet) !== trust.rootSetDigest) {
        throw new Error("Catalog delta root set does not match the trusted root pin.");
    }
    const registry = validateSignerRegistry(rootSet, parseReleaseJson(files, releaseSignerRegistryObjectPath(descriptor.snapshot_core.signer_registry_digest)));
    if (registry.registry_digest !== descriptor.snapshot_core.signer_registry_digest) {
        throw new Error("Catalog delta signer registry is not addressed by the snapshot.");
    }
    const policies = verifyCatalogDeltaPolicies(bundle, delta, files);
    const publication = verifyPublicationInputs(bundle, delta, files);
    const assetDelta = files.has("assets/delta.json")
        ? verifyAssetDelta(assetDeltaSchema.parse(parseReleaseJson(files, "assets/delta.json")))
        : null;
    const safeAssetBytes = new Map();
    for (const [path, bytes] of files) {
        if (!path.startsWith("assets/sha256/"))
            continue;
        const objectDigest = digestFromPathSegment(basename(path));
        if (sha256Bytes(bytes) !== objectDigest || safeAssetBytes.has(objectDigest)) {
            throw new Error(`Catalog delta safe asset ${path} is not content addressed.`);
        }
        safeAssetBytes.set(objectDigest, bytes);
    }
    const entities = new Map();
    const priorEntities = new Map();
    const authoring = new Map();
    const priorAuthoring = new Map();
    const revisions = new Map();
    const events = [];
    const observations = [];
    const captureReceipts = [];
    const agentReadinessObjects = new Map();
    const agentReadinessRegradeEvidence = new Map();
    const agentReadinessOfferRelationObjects = new Map();
    for (const [path, bytes] of files) {
        if (path.startsWith(AGENT_READINESS_REGRADE_EVIDENCE_PREFIX)) {
            const [address, evidence] = readAgentReadinessRegradeEvidenceFile({
                path,
                bytes,
                registry,
                releaseSequence: descriptor.release_core.release_sequence,
            });
            if (agentReadinessRegradeEvidence.has(address)) {
                throw new Error(`Catalog delta regrade evidence ${path} repeats a profile.`);
            }
            agentReadinessRegradeEvidence.set(address, evidence);
        }
        else if (path.startsWith("agent-readiness-offer-relations/")) {
            const object = agentReadinessOfferRelationDeltaObjectSchema.parse(JSON.parse(bytes.toString("utf8")));
            const address = basename(path, ".json");
            if (object.relation_id !== address || agentReadinessOfferRelationObjects.has(address)) {
                throw new Error(`Catalog delta Offer relation object ${path} is not addressed correctly.`);
            }
            agentReadinessOfferRelationObjects.set(address, object);
        }
        else if (path.startsWith("agent-readiness/")) {
            const object = agentReadinessDeltaObjectSchema.parse(JSON.parse(bytes.toString("utf8")));
            const address = basename(path, ".json");
            if (object.agent_readiness_profile_id !== address || agentReadinessObjects.has(address)) {
                throw new Error(`Catalog delta Agent Readiness object ${path} is not addressed correctly.`);
            }
            agentReadinessObjects.set(address, object);
        }
        else if (path.startsWith("authoring/")) {
            const object = catalogDeltaAuthoringObjectSchema.parse(JSON.parse(bytes.toString("utf8")));
            const address = basename(path, ".json");
            if (object.entity_id !== address || priorAuthoring.has(address)) {
                throw new Error(`Catalog delta authoring object ${path} is not addressed correctly.`);
            }
            if (object.authoring)
                authoring.set(address, object.authoring);
            priorAuthoring.set(address, object.prior_authoring);
        }
        else if (path.startsWith("entities/")) {
            const object = catalogDeltaEntityObjectSchema.parse(JSON.parse(bytes.toString("utf8")));
            const address = basename(path, ".json");
            const change = delta.entity_changes.find((bundle) => bundle.operation === "upsert" && bundle.entity_id === address);
            if (object.entity.entity_id !== address ||
                entities.has(address) ||
                digest(object.entity) !== change?.projection_digest ||
                (object.prior_entity !== null && object.prior_entity.entity_id !== address) ||
                (object.prior_entity === null
                    ? change?.prior_projection_digest !== null
                    : digest(object.prior_entity) !== change?.prior_projection_digest)) {
                throw new Error(`Catalog delta Entity object ${path} is not addressed correctly.`);
            }
            entities.set(address, object.entity);
            priorEntities.set(address, object.prior_entity);
        }
        else if (path.startsWith("revisions/")) {
            const revision = parseReleaseRevision(JSON.parse(bytes.toString("utf8")));
            const address = addressFromReleaseJsonPath(path);
            const { revision_digest: revisionDigest, ...core } = revision;
            if (address !== revisionDigest || digest(core) !== revisionDigest) {
                throw new Error(`Catalog delta revision ${path} is not content-addressed.`);
            }
            revisions.set(revisionDigest, revision);
        }
        else if (path.startsWith("events/")) {
            const input = JSON.parse(bytes.toString("utf8"));
            const address = addressFromReleaseJsonPath(path);
            const inclusion = delta.provenance.events[address];
            if (!inclusion || input.event_id !== address) {
                throw new Error(`Catalog delta event ${path} lacks its exact inclusion.`);
            }
            const event = validateProtectedEvent(input, registry, inclusion.first_inclusion_sequence);
            if (digest(event) !== inclusion.event_object_digest ||
                event.operation_id !== inclusion.operation_id ||
                event.issuer_id !== inclusion.issuer_id ||
                inclusion.signer_registry_digest !== registry.registry_digest) {
                throw new Error(`Catalog delta event ${path} disagrees with its inclusion.`);
            }
            events.push(event);
        }
        else if (path.startsWith("observations/")) {
            const observation = observationSchema.parse(JSON.parse(bytes.toString("utf8")));
            const address = addressFromReleaseJsonPath(path);
            const { observation_id: observationId, ...core } = observation;
            if (address !== observationId || digest(core) !== observationId) {
                throw new Error(`Catalog delta observation ${path} is not content-addressed.`);
            }
            observations.push(observation);
        }
        else if (path.startsWith("capture-receipts/")) {
            const input = captureReceiptSchema.parse(JSON.parse(bytes.toString("utf8")));
            const address = addressFromReleaseJsonPath(path);
            const inclusion = delta.provenance.capture_receipts?.[address];
            if (!inclusion || input.receipt_digest !== address) {
                throw new Error(`Catalog delta capture receipt ${path} lacks its exact inclusion.`);
            }
            const receipt = validateProtectedCaptureReceipt(input, registry, inclusion.first_inclusion_sequence);
            if (digest(receipt) !== inclusion.receipt_object_digest ||
                receipt.operation_id !== inclusion.operation_id ||
                receipt.issuer_id !== inclusion.issuer_id ||
                inclusion.signer_registry_digest !== registry.registry_digest) {
                throw new Error(`Catalog delta capture receipt ${path} disagrees with its inclusion.`);
            }
            captureReceipts.push(receipt);
        }
    }
    assertDeltaClosure(delta, entities, priorEntities, authoring, priorAuthoring, publication.proposal, publication.change_set, revisions, events, observations, captureReceipts, files, agentReadinessObjects, agentReadinessRegradeEvidence, agentReadinessOfferRelationObjects, policies, assetDelta, safeAssetBytes);
    verifyCatalogPublicationAuthoringChanges({ publication, priorAuthoring });
    const readinessTransitions = verifiedAgentReadinessTransitions(agentReadinessObjects);
    const relationTransitions = verifiedAgentReadinessOfferRelationTransitions(agentReadinessOfferRelationObjects);
    verifyReleaseChain(bundle, delta, descriptor, readinessTransitions, relationTransitions, assetDelta);
    const changes = verifyChanges(files, descriptor, delta, entities, priorEntities, agentReadinessObjects, assetDelta);
    return {
        parentGuard: catalogPublicationParentGuard({
            publicationProposal: publication.proposal,
            publicationChangeSet: publication.change_set,
            agentReadinessObjects,
            agentReadinessOfferRelationObjects,
            files,
        }),
        bundle,
        delta,
        entities,
        priorEntities,
        authoring,
        priorAuthoring,
        assetDelta,
        safeAssetBytes,
        revisions,
        agentReadinessProfiles: new Map([...agentReadinessObjects].flatMap(([profileId, object]) => object.projection ? [[profileId, object.projection]] : [])),
        agentReadinessObjects,
        agentReadinessOfferRelationObjects,
        events: events.sort((left, right) => compareCanonicalStrings(left.event_id, right.event_id)),
        observations: observations.sort((left, right) => compareCanonicalStrings(left.observation_id, right.observation_id)),
        captureReceipts: captureReceipts.sort((left, right) => compareCanonicalStrings(left.receipt_digest, right.receipt_digest)),
        publicationProposal: publication.proposal,
        publicationChangeSet: publication.change_set,
        ingressReceipts: publication.ingresses.map(({ ingress_receipt }) => ingress_receipt),
        publicationIngresses: publication.ingresses,
        rootSet,
        registry,
        files,
        changes,
    };
}
function verifyReleaseChain(bundle, delta, descriptor, agentReadinessChanges, agentReadinessOfferRelationChanges, assetDelta) {
    if (!delta.base)
        throw new Error("Production Catalog delta requires an exact live base.");
    const base = delta.base.release;
    const expectedSnapshot = buildDeltaSnapshotCore({
        parent: base.snapshot_core,
        delta,
        releaseSequence: base.release_core.release_sequence + 1,
        rootSetDigest: descriptor.snapshot_core.root_set_digest,
        signerRegistryDigest: descriptor.snapshot_core.signer_registry_digest,
        agentReadinessChanges,
        agentReadinessOfferRelationChanges,
        assetDelta,
    });
    if (digest(base.snapshot_core) !== base.snapshot_id ||
        digest(base.release_core) !== base.release_id ||
        digest(expectedSnapshot) !== descriptor.snapshot_id ||
        JSON.stringify(expectedSnapshot) !== JSON.stringify(descriptor.snapshot_core) ||
        digest(descriptor.release_core) !== descriptor.release_id ||
        descriptor.release_core.snapshot_id !== descriptor.snapshot_id ||
        descriptor.release_core.parent_release_id !== base.release_id ||
        descriptor.release_core.release_sequence !== base.release_core.release_sequence + 1 ||
        JSON.stringify(bundle.release) !== JSON.stringify(descriptor) ||
        delta.artifact_core.policy_as_of !== delta.policy_as_of ||
        delta.artifact_core.root_set_digest !== descriptor.snapshot_core.root_set_digest ||
        delta.artifact_core.signer_registry_digest !==
            descriptor.snapshot_core.signer_registry_digest ||
        canonicalJson(bundle.admitted_input_digests) !== canonicalJson(delta.admitted_input_digests)) {
        throw new Error("Catalog delta does not form one exact canonical successor.");
    }
}
function assertDeltaClosure(delta, entities, priorEntities, authoring, priorAuthoring, publicationProposal, publicationChangeSet, revisions, events, observations, captureReceipts, files, agentReadinessObjects, agentReadinessRegradeEvidence, agentReadinessOfferRelationObjects, policies, assetDelta, safeAssetBytes) {
    assertAgentReadinessRegradeEvidenceClosure(agentReadinessRegradeEvidence, agentReadinessObjects);
    verifyAgentReadinessOfferRelationWithdrawals({
        admittedProfileInputs: verifyAgentReadinessPublicationInputs({
            files,
            proposal: publicationProposal,
            profiles: agentReadinessObjects,
        }),
        objects: agentReadinessOfferRelationObjects,
        profiles: agentReadinessObjects,
        revisions,
        changeSet: publicationChangeSet,
        retiredProfileIds: new Set(delta.identities.retired_agent_readiness_profiles),
    });
    const candidates = new Map(publicationProposal.candidate_entities.map((authoring) => [
        authoring.entity.entity_id,
        authoring,
    ]));
    const expectedCurrent = new Map(publicationProposal.expected_current_entities.map((vendor) => [vendor.entity_id, vendor]));
    const authoredEntityIds = new Set([
        ...publicationProposal.candidate_entities.map((candidate) => candidate.entity.entity_id),
        ...publicationProposal.remove_entity_ids,
    ]);
    if (candidates.size !== authoring.size ||
        authoredEntityIds.size !== priorAuthoring.size ||
        [...authoring].some(([entityId, vendor]) => canonicalJson(vendor) !== canonicalJson(candidates.get(entityId))) ||
        [...priorAuthoring].some(([entityId, vendor]) => {
            const expected = expectedCurrent.get(entityId);
            return (!authoredEntityIds.has(entityId) ||
                !expected ||
                expected.snapshot_digest !== (vendor ? digest(vendor) : null));
        })) {
        throw new Error("Catalog delta authoring does not close its publication proposal.");
    }
    assertCatalogAssetDeltaClosure({
        baseAssetIndexDigest: releaseResourceDigest(delta.base?.release.snapshot_core.resource_digests ?? {}, RELEASE_RESOURCES.assetIndex),
        publicationProposal,
        events,
        assetDelta,
        safeAssetBytes,
    });
    const upserts = delta.entity_changes.filter((change) => change.operation === "upsert");
    if (upserts.length !== entities.size) {
        throw new Error("Catalog delta Entity changes and projection objects disagree.");
    }
    const changedEntityIds = new Set(delta.entity_changes.map((change) => change.entity_id));
    for (const route of Object.values(delta.routes.routes)) {
        if (!changedEntityIds.has(route.entity_id)) {
            throw new Error("Catalog delta route escaped its changed Entity closure.");
        }
    }
    for (const entity of entities.values()) {
        for (const subject of [entity, ...entity.programs, ...entity.offers]) {
            if (!revisions.has(subject.revision_digest)) {
                throw new Error(`Catalog delta Entity targets missing revision ${subject.revision_digest}.`);
            }
            const provenance = delta.provenance.revisions[subject.revision_digest];
            const prior = priorEntities.get(entity.entity_id);
            const existed = Boolean(prior &&
                [prior, ...prior.programs, ...prior.offers].some((bundle) => bundle.revision_digest === subject.revision_digest));
            if (!existed && !provenance) {
                throw new Error(`New revision ${subject.revision_digest} lacks admitted provenance.`);
            }
            if (provenance &&
                (JSON.stringify(provenance.event_ids) !==
                    JSON.stringify([...subject.provenance.basis_event_ids].sort(compareCanonicalStrings)) ||
                    provenance.coverage_policy_digest !== subject.provenance.coverage_policy_digest ||
                    provenance.freshness_policy_digest !== subject.provenance.freshness_policy_digest)) {
                throw new Error(`Catalog delta provenance disagrees with ${subject.revision_digest}.`);
            }
        }
    }
    if (events.length !== Object.keys(delta.provenance.events).length ||
        captureReceipts.length !== Object.keys(delta.provenance.capture_receipts ?? {}).length) {
        throw new Error("Catalog delta evidence objects and inclusion records disagree.");
    }
    const changedInputCount = [...agentReadinessObjects.values()].filter((object) => object.profile_input !== null).length;
    const readinessInputs = changedInputCount > 0
        ? agentReadinessInputsSchema.parse(parseReleaseJson(files, "inputs/agent-readiness.json"))
        : null;
    const inputEntries = new Map(readinessInputs?.profiles.map((entry) => [entry.agent_readiness_profile_id, entry]) ?? []);
    if (readinessInputs &&
        (readinessInputs.policy_digest !== policies.agentReadinessPolicy.policy_digest ||
            inputEntries.size !== readinessInputs.profiles.length)) {
        throw new Error("Agent Readiness delta input index is not canonical for the current policy.");
    }
    const changedRelationInputCount = [...agentReadinessOfferRelationObjects.values()].filter((object) => object.relation_input !== null).length;
    const relationInputs = changedRelationInputCount > 0
        ? agentReadinessOfferRelationInputsSchema.parse(parseReleaseJson(files, "inputs/agent-readiness-offer-relations.json"))
        : null;
    const relationInputEntries = new Map(relationInputs?.relations.map((entry) => [entry.relation_id, entry]) ?? []);
    if (relationInputs && relationInputEntries.size !== relationInputs.relations.length) {
        throw new Error("Agent Readiness Offer relation input index repeats an identity.");
    }
    const relationInputsByProfile = new Map();
    const relationsByProfile = new Map();
    const relationOffers = new Map();
    for (const [relationId, object] of agentReadinessOfferRelationObjects) {
        if (object.prior_relation) {
            const { relation_revision_digest: priorDigest, ...priorCore } = object.prior_relation;
            if (digest(agentReadinessOfferRelationRevisionCoreSchema.parse(priorCore)) !== priorDigest) {
                throw new Error(`Offer relation delta ${relationId} has invalid prior revision bytes.`);
            }
        }
        if (!object.relation || !object.relation_input)
            continue;
        const entry = relationInputEntries.get(relationId);
        const inputDigest = digest(object.relation_input);
        if (!entry ||
            entry.input_digest !== inputDigest ||
            entry.relation_revision_digest !== object.relation.relation_revision_digest ||
            entry.path !==
                `inputs/agent-readiness-offer-relations/${digestPathSegment(inputDigest)}.json` ||
            canonicalJson(parseReleaseJson(files, entry.path)) !== canonicalJson(object.relation_input) ||
            canonicalJson(compileAgentReadinessOfferRelationRevision(object.relation_input)) !==
                canonicalJson(object.relation)) {
            throw new Error(`Offer relation delta ${relationId} has invalid canonical input.`);
        }
        const profileObject = agentReadinessObjects.get(object.relation.agent_readiness_profile_id);
        if (!profileObject?.projection ||
            profileObject.projection.revision_digest !== object.catalog_context.profile_revision_digest ||
            profileObject.projection.entity_id !== object.catalog_context.entity_id) {
            throw new Error(`Offer relation delta ${relationId} lacks its exact profile transition.`);
        }
        const offerRevision = object.catalog_context.offer_revision;
        if (!offerRevision)
            throw new Error(`Offer relation delta ${relationId} lacks its Offer.`);
        const priorOffer = relationOffers.get(offerRevision.offer_id);
        if (priorOffer && canonicalJson(priorOffer) !== canonicalJson(offerRevision)) {
            throw new Error(`Offer relation delta ${relationId} has conflicting Offer closure.`);
        }
        relationOffers.set(offerRevision.offer_id, offerRevision);
        const profileId = object.relation.agent_readiness_profile_id;
        relationInputsByProfile.set(profileId, [
            ...(relationInputsByProfile.get(profileId) ?? []),
            object.relation_input,
        ]);
        relationsByProfile.set(profileId, [
            ...(relationsByProfile.get(profileId) ?? []),
            object.relation,
        ]);
    }
    if (relationInputEntries.size !== changedRelationInputCount) {
        throw new Error("Offer relation input index escapes its changed relation closure.");
    }
    const profileInputs = [];
    for (const [profileId, object] of agentReadinessObjects) {
        const current = object.projection;
        if (object.prior_projection) {
            const { projection_digest: priorDigest, ...priorCore } = object.prior_projection;
            if (digest(priorCore) !== priorDigest) {
                throw new Error(`Agent Readiness delta ${profileId} has invalid prior projection bytes.`);
            }
        }
        if (!current)
            continue;
        const context = object.catalog_context;
        if (!context)
            throw new Error(`Agent Readiness delta ${profileId} lacks Catalog context.`);
        const revision = revisions.get(current.revision_digest);
        if (revision?.revision_contract !== "sourcey.agent-readiness-revision/v1alpha1") {
            throw new Error(`Agent Readiness delta ${profileId} lacks its exact revision.`);
        }
        const declarationRevision = revisions.get(revision.declaration_revision_digest);
        if (declarationRevision?.revision_contract !==
            "sourcey.agent-readiness-declaration-revision/v1alpha1" ||
            canonicalJson(declarationRevision) !== canonicalJson(context.declaration_revision)) {
            throw new Error(`Agent Readiness delta ${profileId} lacks its declaration revision.`);
        }
        if (context.entity_revision.revision_digest !== revision.catalog_binding.entity_revision_digest ||
            context.entity_revision.entity_id !== revision.entity_id ||
            declarationRevision.entity_id !== revision.entity_id ||
            (object.profile_input !== null &&
                revision.catalog_binding.base_release_id !== delta.base?.release.release_id)) {
            throw new Error(`Agent Readiness delta ${profileId} has invalid Catalog bindings.`);
        }
        let expected;
        if (object.profile_input) {
            const profileEvidence = selectAgentReadinessEvidenceChanges({
                profileId,
                revisionDigest: revision.revision_digest,
                events,
                observations,
            });
            const graph = buildEventGraph(profileEvidence.events, profileEvidence.observations);
            const inputEntry = inputEntries.get(profileId);
            if (!inputEntry ||
                inputEntry.input_digest !== digest(object.profile_input) ||
                inputEntry.revision_digest !== revision.revision_digest ||
                inputEntry.path !==
                    `inputs/agent-readiness/${digestPathSegment(inputEntry.input_digest)}.json` ||
                canonicalJson(agentReadinessProfileInputSchema.parse(parseReleaseJson(files, inputEntry.path))) !== canonicalJson(object.profile_input) ||
                canonicalJson(compileAgentReadinessRevision(object.profile_input)) !==
                    canonicalJson(revision)) {
                throw new Error(`Agent Readiness delta ${profileId} has invalid canonical input.`);
            }
            profileInputs.push({
                input: object.profile_input,
                declarationRevision,
                revision,
                offerRelationInputs: relationInputsByProfile.get(profileId) ?? [],
                offerRelations: relationsByProfile.get(profileId) ?? [],
            });
            expected = deriveAgentReadinessProjection({
                revision,
                declarationRevision,
                authorityEntityRevision: context.entity_revision,
                priorProjection: object.prior_projection,
                entitySlug: context.entity_slug,
                graph,
                policy: policies.agentReadinessPolicy,
                policyAsOf: delta.policy_as_of,
                freshnessPolicy: policies.freshnessPolicy,
            });
        }
        else {
            expected = expectedAgentReadinessRegradeProjection({
                profileId,
                object,
                current,
                revision,
                declarationRevision,
                entityRevision: context.entity_revision,
                entitySlug: context.entity_slug,
                evidence: agentReadinessRegradeEvidence.get(profileId),
                deltaEvidence: selectAgentReadinessEvidenceChanges({
                    profileId,
                    revisionDigest: revision.revision_digest,
                    events,
                    observations,
                }),
                policy: policies.agentReadinessPolicy,
                policyAsOf: delta.policy_as_of,
                freshnessPolicy: policies.freshnessPolicy,
            });
        }
        if (canonicalJson(expected) !== canonicalJson(current)) {
            throw new Error(`Agent Readiness delta ${profileId} is not the canonical policy projection.`);
        }
    }
    if (inputEntries.size !== changedInputCount) {
        throw new Error("Agent Readiness delta input index escapes its changed profile closure.");
    }
    assertAgentReadinessReleaseAdmission([...agentReadinessObjects.values()].flatMap((object) => object.projection ? [object.projection] : []));
    const declaredInputPaths = new Set([...inputEntries.values()].map((entry) => entry.path));
    const actualInputPaths = [...files.keys()].filter((path) => path.startsWith("inputs/agent-readiness/"));
    if (declaredInputPaths.size !== actualInputPaths.length ||
        actualInputPaths.some((path) => !declaredInputPaths.has(path))) {
        throw new Error("Agent Readiness delta input objects do not match their exact index.");
    }
    validateAgentReadinessClosure({
        profiles: profileInputs,
        policy: policies.agentReadinessPolicy,
        entityIds: new Set([...agentReadinessObjects.values()].flatMap((object) => object.catalog_context ? [object.catalog_context.entity_revision.entity_id] : [])),
        offers: relationOffers,
        events,
        observations,
    });
    const declaredRelationInputPaths = new Set([...relationInputEntries.values()].map((entry) => entry.path));
    const actualRelationInputPaths = [...files.keys()].filter((path) => path.startsWith("inputs/agent-readiness-offer-relations/"));
    if (declaredRelationInputPaths.size !== actualRelationInputPaths.length ||
        actualRelationInputPaths.some((path) => !declaredRelationInputPaths.has(path))) {
        throw new Error("Offer relation input objects do not match their exact index.");
    }
    const captures = new Map();
    const normalizedObjects = new Map();
    for (const observation of observations) {
        if (observation.capture?.availability !== "public")
            continue;
        const captureDigest = observation.capture.digest;
        const capture = files.get(`captures/${captureDigest.replace(":", "-")}`);
        if (capture)
            captures.set(captureDigest, capture);
        const normalizedDigest = observation.capture.normalized_object?.digest;
        if (normalizedDigest) {
            const normalized = files.get(`evidence/normalized/${normalizedDigest.replace(":", "-")}`);
            if (normalized)
                normalizedObjects.set(normalizedDigest, normalized);
        }
    }
    verifyEvidenceObjectGraph({
        revisions: [...revisions.values()],
        events,
        observations,
        captureReceipts,
        captures,
        normalizedObjects,
    });
}
//# sourceMappingURL=verifier.js.map