import { basename } from "node:path";
import { canonicalJson, compareCanonicalStrings, digest, digestFromPathSegment, digestPathSegment, parseJsonFile, } from "provenry/primitives";
import { publicationParent } from "provenry/publication/envelope";
import { agentReadinessDeclarationRevisionSchema, agentReadinessDeltaObjectSchema, agentReadinessInputsSchema, agentReadinessOfferRelationDeltaObjectSchema, agentReadinessOfferRelationInputsSchema, agentReadinessOfferRelationRevisionCoreSchema, agentReadinessProfileInputSchema, agentReadinessRevisionContract, agentReadinessRevisionSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { assetDeltaSchema } from "../../../contracts/assets/src/index.js";
import { rootSetSchema } from "../../../contracts/authority/src/index.js";
import { observationSchema } from "../../../contracts/observations/src/index.js";
import { catalogDeltaAuthoringObjectSchema, catalogDeltaEntityObjectSchema, catalogDeltaSchema, RELEASE_RESOURCES, releaseResourceDigest, releaseRootSetObjectPath, releaseSignerRegistryObjectPath, } from "../../../contracts/release/src/index.js";
import { compileAgentReadinessOfferRelationRevision, compileAgentReadinessRevision, deriveAgentReadinessProjection, } from "../../agent-readiness-policy/src/index.js";
import { addressFromReleaseJsonPath, CATALOG_RELEASE, releasedEvidenceObjects, } from "../../artifact/src/release-directory-files.js";
import { validateTrustHistory } from "../../artifact/src/trust-history.js";
import { verifyAssetDelta } from "../../assets/src/index.js";
import { validateProtectedEvent, validateSignerRegistry } from "../../authority/src/index.js";
import { verifyCatalogPublicationAuthoringChanges } from "../../catalog-admission/src/publication-composition.js";
import { verifyReleasedCaptureRecords } from "../../evidence-operations/src/attested-capture.js";
import { verifyEvidenceObjectGraph } from "../../evidence-operations/src/proof-graph.js";
import { parseRetainedCatalogRevision, } from "../../evidence-operations/src/retained-revision.js";
import { buildEventGraph } from "../../provenance/src/index.js";
import { readVerifiedSourceyRelease, SOURCEY_DELTA_STATE_FILE, sourceyReleaseEnvelope, } from "../../publication-instance/src/index.js";
import { assertAgentReadinessAdmitted } from "../../release/src/agent-readiness-authority.js";
import { verifyAgentReadinessPublicationInputs } from "../../release/src/agent-readiness-publication-inputs.js";
import { AGENT_READINESS_REGRADE_EVIDENCE_PREFIX, assertAgentReadinessRegradeEvidenceClosure, expectedAgentReadinessRegradeProjection, readAgentReadinessRegradeEvidenceFile, selectAgentReadinessEvidenceChanges, } from "../../release/src/agent-readiness-regrade-evidence.js";
import { assertCatalogAssetDeltaClosure } from "../../release/src/asset-delta-verifier.js";
import { assertAgentReadinessReleaseAdmission, validateAgentReadinessClosure, } from "../../release/src/inputs.js";
import { verifyPublicationInputs } from "../../release/src/publication-inputs.js";
import { buildDeltaSnapshotCore, verifyCatalogDeltaState } from "../../release/src/transition.js";
import { verifyChanges } from "../../release/src/verification-changes.js";
import { verifyCatalogDeltaPolicies } from "../../release/src/verification-policies.js";
import { verifiedAgentReadinessOfferRelationTransitions, verifiedAgentReadinessTransitions, verifyAgentReadinessOfferRelationWithdrawals, } from "../../release/src/verification-transitions.js";
import { catalogPublicationParentGuard, } from "./publication-parent-guard.js";
export async function verifyCatalogDeltaDirectory(directory, trust) {
    return verifyCatalogDelta(await readVerifiedSourceyRelease(directory), trust);
}
/** Verifies a delta release whose envelope is already verified. */
export async function verifyCatalogDelta(release, trust) {
    if (release.kind !== "delta") {
        throw new Error(`Catalog delta bundle is missing ${SOURCEY_DELTA_STATE_FILE}.`);
    }
    const { envelope } = release;
    const { bundle, descriptor, files } = envelope;
    const delta = catalogDeltaSchema.parse(JSON.parse(release.delta.toString("utf8")));
    verifyCatalogDeltaState(delta);
    if (delta.object_manifest_digest !== bundle.object_manifest_digest) {
        throw new Error("Catalog delta and bundle do not address the same object manifest.");
    }
    sourceyReleaseEnvelope.assertSuccessor({
        descriptor,
        diff: envelope.diff,
        parent: publicationParent(delta.base.release),
    });
    const rootSet = rootSetSchema.parse(parseJsonFile(files, releaseRootSetObjectPath(descriptor.snapshot_core.root_set_digest), CATALOG_RELEASE));
    if (digest(rootSet) !== descriptor.snapshot_core.root_set_digest) {
        throw new Error("Catalog delta root set is not addressed by the snapshot.");
    }
    if (trust && digest(rootSet) !== trust.rootSetDigest) {
        throw new Error("Catalog delta root set does not match the trusted root pin.");
    }
    const registry = validateSignerRegistry(rootSet, parseJsonFile(files, releaseSignerRegistryObjectPath(descriptor.snapshot_core.signer_registry_digest), CATALOG_RELEASE));
    if (registry.registry_digest !== descriptor.snapshot_core.signer_registry_digest) {
        throw new Error("Catalog delta signer registry is not addressed by the snapshot.");
    }
    const trustedRegistries = [...files.keys()].some((path) => path.startsWith(AGENT_READINESS_REGRADE_EVIDENCE_PREFIX))
        ? validateTrustHistory(files, rootSet, registry)
        : new Map([[registry.registry_digest, registry]]);
    const policies = verifyCatalogDeltaPolicies(bundle, delta, files);
    const publication = verifyPublicationInputs(bundle, delta, files);
    const assetDelta = files.has("assets/delta.json")
        ? verifyAssetDelta(assetDeltaSchema.parse(parseJsonFile(files, "assets/delta.json", CATALOG_RELEASE)))
        : null;
    const entityUpserts = new Map(delta.entity_changes.flatMap((change) => change.operation === "upsert" ? [[change.entity_id, change]] : []));
    const safeAssetBytes = new Map();
    const profileInputPaths = [];
    const relationInputPaths = [];
    const entities = new Map();
    const priorEntities = new Map();
    const authoring = new Map();
    const priorAuthoring = new Map();
    const revisions = new Map();
    const events = [];
    const eventIds = new Set();
    const observations = [];
    const agentReadinessObjects = new Map();
    const agentReadinessRegradeEvidence = new Map();
    const agentReadinessOfferRelationObjects = new Map();
    for (const [path, bytes] of files) {
        if (path.startsWith("assets/sha256/")) {
            // The envelope proved these bytes against their declaration.
            const objectDigest = digestFromPathSegment(basename(path));
            if (bundle.files[path]?.sha256 !== objectDigest || safeAssetBytes.has(objectDigest)) {
                throw new Error(`Catalog delta safe asset ${path} is not content addressed.`);
            }
            safeAssetBytes.set(objectDigest, bytes);
        }
        else if (path.startsWith("inputs/agent-readiness/")) {
            profileInputPaths.push(path);
        }
        else if (path.startsWith("inputs/agent-readiness-offer-relations/")) {
            relationInputPaths.push(path);
        }
        else if (path.startsWith(AGENT_READINESS_REGRADE_EVIDENCE_PREFIX)) {
            const [address, evidence] = readAgentReadinessRegradeEvidenceFile({
                path,
                bytes,
                registries: trustedRegistries,
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
            const change = entityUpserts.get(address);
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
            const revision = parseRetainedCatalogRevision(JSON.parse(bytes.toString("utf8")));
            const address = addressFromReleaseJsonPath(path);
            if (address !== revision.revision_digest) {
                throw new Error(`Catalog delta revision ${path} is not content-addressed.`);
            }
            revisions.set(address, revision);
        }
        else if (path.startsWith("events/")) {
            const input = JSON.parse(bytes.toString("utf8"));
            const address = addressFromReleaseJsonPath(path);
            const inclusion = delta.provenance.events[address];
            if (!inclusion ||
                input.event_id !== address ||
                inclusion.event_id !== address ||
                eventIds.has(address) ||
                inclusion.first_inclusion_sequence !== descriptor.release_core.release_sequence) {
                throw new Error(`Catalog delta event ${path} lacks its exact first inclusion.`);
            }
            eventIds.add(address);
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
    }
    // A delta carries nothing: each attestation is first included here, judged by its registry.
    const deltaSequence = descriptor.release_core.release_sequence;
    if (Object.values(delta.provenance.capture_attestations).some((inclusion) => inclusion.first_inclusion_sequence !== deltaSequence)) {
        throw new Error("Catalog delta capture attestations must be first included in the delta.");
    }
    const attestedCaptures = await verifyReleasedCaptureRecords({
        files,
        inclusions: delta.provenance.capture_attestations,
        releaseSequence: deltaSequence,
        registryFor: (signerRegistryDigest) => signerRegistryDigest === registry.registry_digest ? registry : undefined,
    });
    assertDeltaClosure(delta, entities, priorEntities, authoring, priorAuthoring, publication.proposal, publication.change_set, revisions, events, files, { agentReadiness: profileInputPaths, offerRelations: relationInputPaths }, agentReadinessObjects, agentReadinessRegradeEvidence, agentReadinessOfferRelationObjects, policies, assetDelta, safeAssetBytes);
    verifyEvidenceObjectGraph({
        revisions: [...revisions.values()],
        events,
        observations,
        attestedCaptures,
        ...releasedEvidenceObjects(observations, files, bundle.files),
        capturesProven: true,
    });
    verifyCatalogPublicationAuthoringChanges({ publication, priorAuthoring });
    const readinessTransitions = verifiedAgentReadinessTransitions(agentReadinessObjects);
    const relationTransitions = verifiedAgentReadinessOfferRelationTransitions(agentReadinessOfferRelationObjects);
    verifyReleaseChain(bundle, delta, descriptor, readinessTransitions, relationTransitions, assetDelta);
    verifyChanges(envelope.changes, delta, entities, priorEntities, agentReadinessObjects, assetDelta);
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
        attestedCaptures,
        publicationProposal: publication.proposal,
        publicationChangeSet: publication.change_set,
        ingressReceipts: publication.ingresses.map(({ ingress_receipt }) => ingress_receipt),
        publicationIngresses: publication.ingresses,
        rootSet,
        registry,
        files,
        changes: envelope.changes,
    };
}
function verifyReleaseChain(bundle, delta, descriptor, agentReadinessChanges, agentReadinessOfferRelationChanges, assetDelta) {
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
    // The engine verified both descriptors and the exact successor position.
    if (digest(expectedSnapshot) !== descriptor.snapshot_id ||
        delta.artifact_core.policy_as_of !== delta.policy_as_of ||
        delta.artifact_core.root_set_digest !== descriptor.snapshot_core.root_set_digest ||
        delta.artifact_core.signer_registry_digest !==
            descriptor.snapshot_core.signer_registry_digest ||
        canonicalJson(bundle.admitted_input_digests) !== canonicalJson(delta.admitted_input_digests)) {
        throw new Error("Catalog delta does not form one exact canonical successor.");
    }
}
function assertDeltaClosure(delta, entities, priorEntities, authoring, priorAuthoring, publicationProposal, publicationChangeSet, revisions, events, files, inputPaths, agentReadinessObjects, agentReadinessRegradeEvidence, agentReadinessOfferRelationObjects, policies, assetDelta, safeAssetBytes) {
    assertAgentReadinessRegradeEvidenceClosure(agentReadinessRegradeEvidence, agentReadinessObjects);
    const admittedProfileInputs = verifyAgentReadinessPublicationInputs({
        files,
        proposal: publicationProposal,
        profiles: agentReadinessObjects,
    });
    verifyAgentReadinessOfferRelationWithdrawals({
        admittedProfileInputs,
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
        baseAssetIndexDigest: releaseResourceDigest(delta.base.release.snapshot_core.resource_digests, RELEASE_RESOURCES.assetIndex),
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
    // Event ids are distinct and each has its witness, so equal counts make equal sets.
    if (events.length !== Object.keys(delta.provenance.events).length) {
        throw new Error("Catalog delta evidence objects and inclusion records disagree.");
    }
    const changedInputCount = [...agentReadinessObjects.values()].filter((object) => object.profile_input !== null).length;
    const readinessInputs = changedInputCount > 0
        ? agentReadinessInputsSchema.parse(parseJsonFile(files, "inputs/agent-readiness.json", CATALOG_RELEASE))
        : null;
    const inputEntries = new Map(readinessInputs?.profiles.map((entry) => [entry.agent_readiness_profile_id, entry]) ?? []);
    if (readinessInputs &&
        (readinessInputs.policy_digest !== policies.agentReadinessPolicy.policy_digest ||
            inputEntries.size !== readinessInputs.profiles.length)) {
        throw new Error("Agent Readiness delta input index is not canonical for the current policy.");
    }
    const changedRelationInputCount = [...agentReadinessOfferRelationObjects.values()].filter((object) => object.relation_input !== null).length;
    const relationInputs = changedRelationInputCount > 0
        ? agentReadinessOfferRelationInputsSchema.parse(parseJsonFile(files, "inputs/agent-readiness-offer-relations.json", CATALOG_RELEASE))
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
            canonicalJson(parseJsonFile(files, entry.path, CATALOG_RELEASE)) !==
                canonicalJson(object.relation_input) ||
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
        appendTo(relationInputsByProfile, profileId, object.relation_input);
        appendTo(relationsByProfile, profileId, object.relation);
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
        const retainedRevision = revisions.get(current.revision_digest);
        if (retainedRevision?.revision_contract !== agentReadinessRevisionContract) {
            throw new Error(`Agent Readiness delta ${profileId} lacks its exact revision.`);
        }
        const revision = agentReadinessRevisionSchema.parse(retainedRevision);
        const declarationRevision = agentReadinessDeclarationRevisionSchema.parse(revisions.get(revision.declaration_revision_digest));
        if (canonicalJson(declarationRevision) !== canonicalJson(context.declaration_revision)) {
            throw new Error(`Agent Readiness delta ${profileId} lacks its declaration revision.`);
        }
        if (
        // catalog_binding.base_release_id is the reviewed assessment context,
        // not a second publication-parent pin. The delta and its proposal bind
        // the current parent; these exact revision checks close the dependencies.
        context.entity_revision.revision_digest !== revision.catalog_binding.entity_revision_digest ||
            context.entity_revision.entity_id !== revision.entity_id ||
            declarationRevision.entity_id !== revision.entity_id) {
            throw new Error(`Agent Readiness delta ${profileId} has invalid Catalog bindings.`);
        }
        let expected;
        if (object.profile_input) {
            const graph = buildEventGraph(selectAgentReadinessEvidenceChanges({
                profileId,
                revisionDigest: revision.revision_digest,
                events,
            }), []);
            const inputEntry = inputEntries.get(profileId);
            if (!inputEntry ||
                inputEntry.input_digest !== digest(object.profile_input) ||
                inputEntry.revision_digest !== revision.revision_digest ||
                inputEntry.path !==
                    `inputs/agent-readiness/${digestPathSegment(inputEntry.input_digest)}.json` ||
                canonicalJson(agentReadinessProfileInputSchema.parse(parseJsonFile(files, inputEntry.path, CATALOG_RELEASE))) !== canonicalJson(object.profile_input) ||
                canonicalJson(compileAgentReadinessRevision(object.profile_input)) !==
                    canonicalJson(revision)) {
                throw new Error(`Agent Readiness delta ${profileId} has invalid canonical input.`);
            }
            const releaseInput = admittedProfileInputs.get(profileId);
            if (!releaseInput) {
                throw new Error(`Agent Readiness delta ${profileId} lacks its admitted release input.`);
            }
            assertAgentReadinessAdmitted({
                events,
                releaseInput,
                policy: policies.agentReadinessPolicy,
            });
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
                deltaEvents: selectAgentReadinessEvidenceChanges({
                    profileId,
                    revisionDigest: revision.revision_digest,
                    events,
                }),
                policy: policies.agentReadinessPolicy,
                policyAsOf: delta.policy_as_of,
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
    if (declaredInputPaths.size !== inputPaths.agentReadiness.length ||
        inputPaths.agentReadiness.some((path) => !declaredInputPaths.has(path))) {
        throw new Error("Agent Readiness delta input objects do not match their exact index.");
    }
    validateAgentReadinessClosure({
        profiles: profileInputs,
        policy: policies.agentReadinessPolicy,
        entityIds: new Set([...agentReadinessObjects.values()].flatMap((object) => object.catalog_context ? [object.catalog_context.entity_revision.entity_id] : [])),
        offers: relationOffers,
    });
    const declaredRelationInputPaths = new Set([...relationInputEntries.values()].map((entry) => entry.path));
    if (declaredRelationInputPaths.size !== inputPaths.offerRelations.length ||
        inputPaths.offerRelations.some((path) => !declaredRelationInputPaths.has(path))) {
        throw new Error("Offer relation input objects do not match their exact index.");
    }
}
function appendTo(lists, key, value) {
    const list = lists.get(key);
    if (list)
        list.push(value);
    else
        lists.set(key, [value]);
}
//# sourceMappingURL=verifier.js.map