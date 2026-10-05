import { digest } from "provenry/primitives";
import { orderPublicationChanges, sealPublicationChange } from "provenry/publication/changes";
import { releaseChangeSchema } from "../../../contracts/artifact/src/index.js";
import { catalogStateTransitionCoreSchema, RELEASE_RESOURCES, releaseResourceDigest, SOURCEY_PUBLICATION_CONTRACTS, sourceyReleaseEnvelopeSchemas, } from "../../../contracts/release/src/index.js";
import { offerCanonicalPath, programCanonicalPath } from "../../../contracts/routes/src/index.js";
import { assetIndexTransitionChanges, verifyAssetDelta } from "../../assets/src/index.js";
import { catalogEntityProjectionDigest, catalogOfferProjectionDigest, catalogProgramProjectionDigest, } from "../../projection-identity/src/index.js";
import { sourceyReleaseEnvelope } from "../../publication-instance/src/index.js";
import { buildAgentReadinessChanges } from "./changes.js";
export function buildDeltaChanges(entities, identities, agentReadiness, assetDelta) {
    const changes = [];
    for (const { current, prior } of entities) {
        changes.push(releaseChangeSchema.parse(sealPublicationChange({
            kind: prior ? "entity.updated" : "entity.added",
            subject_type: "entity",
            subject_id: current.entity_id,
            ...(prior ? { previous_revision_digest: prior.revision_digest } : {}),
            revision_digest: current.revision_digest,
            ...(prior ? { previous_projection_digest: catalogEntityProjectionDigest(prior) } : {}),
            projection_digest: catalogEntityProjectionDigest(current),
            basis_event_ids: [...current.provenance.basis_event_ids],
        })));
        const priorPrograms = new Map(prior?.programs.map((value) => [value.program_id, value]) ?? []);
        for (const program of current.programs) {
            const previous = priorPrograms.get(program.program_id);
            if (!previous ||
                catalogProgramProjectionDigest(previous) !== catalogProgramProjectionDigest(program)) {
                changes.push(releaseChangeSchema.parse(sealPublicationChange({
                    kind: previous ? "program.updated" : "program.added",
                    subject_type: "program",
                    subject_id: program.program_id,
                    ...(previous ? { previous_revision_digest: previous.revision_digest } : {}),
                    revision_digest: program.revision_digest,
                    ...(previous
                        ? { previous_projection_digest: catalogProgramProjectionDigest(previous) }
                        : {}),
                    projection_digest: catalogProgramProjectionDigest(program),
                    basis_event_ids: [...program.provenance.basis_event_ids],
                })));
            }
            priorPrograms.delete(program.program_id);
        }
        for (const program of priorPrograms.values()) {
            if (!identities.retired_programs.includes(program.program_id)) {
                throw new Error("Program removal requires an identity transition.");
            }
            changes.push(releaseChangeSchema.parse(sealPublicationChange({
                kind: "program.retired",
                subject_type: "program",
                subject_id: program.program_id,
                previous_revision_digest: program.revision_digest,
                previous_projection_digest: catalogProgramProjectionDigest(program),
                basis_event_ids: [],
                tombstone: {
                    reason: "retired",
                    canonical_route: programCanonicalPath({
                        entity_slug: prior?.slug ?? current.slug,
                        program_slug: program.slug,
                    }),
                },
            })));
        }
        const priorOffers = new Map(prior?.offers.map((value) => [value.offer_id, value]) ?? []);
        for (const offer of current.offers) {
            const previous = priorOffers.get(offer.offer_id);
            if (!previous ||
                catalogOfferProjectionDigest(previous) !== catalogOfferProjectionDigest(offer)) {
                const kind = offer.lifecycle === "ended"
                    ? "offer.ended"
                    : offer.lifecycle === "withdrawn"
                        ? "offer.withdrawn"
                        : previous
                            ? "offer.updated"
                            : "offer.added";
                changes.push(releaseChangeSchema.parse(sealPublicationChange({
                    kind,
                    subject_type: "offer",
                    subject_id: offer.offer_id,
                    ...(previous ? { previous_revision_digest: previous.revision_digest } : {}),
                    revision_digest: offer.revision_digest,
                    ...(previous
                        ? { previous_projection_digest: catalogOfferProjectionDigest(previous) }
                        : {}),
                    projection_digest: catalogOfferProjectionDigest(offer),
                    basis_event_ids: [...offer.provenance.basis_event_ids],
                    ...(kind === "offer.ended" || kind === "offer.withdrawn"
                        ? {
                            tombstone: {
                                reason: kind === "offer.ended" ? "ended" : "withdrawn",
                                canonical_route: offerCanonicalPath({
                                    entity_slug: current.slug,
                                    offer_slug: offer.slug,
                                }),
                            },
                        }
                        : {}),
                })));
            }
            priorOffers.delete(offer.offer_id);
        }
        for (const offer of priorOffers.values()) {
            if (!identities.retired_offers.includes(offer.offer_id)) {
                throw new Error("Offer removal requires an identity transition.");
            }
            changes.push(releaseChangeSchema.parse(sealPublicationChange({
                kind: "offer.retired",
                subject_type: "offer",
                subject_id: offer.offer_id,
                previous_revision_digest: offer.revision_digest,
                previous_projection_digest: catalogOfferProjectionDigest(offer),
                basis_event_ids: [],
                tombstone: {
                    reason: "retired",
                    canonical_route: offerCanonicalPath({
                        entity_slug: prior?.slug ?? current.slug,
                        offer_slug: offer.slug,
                    }),
                },
            })));
        }
    }
    changes.push(...buildAgentReadinessChanges({ ...agentReadiness, identities }));
    if (assetDelta) {
        for (const change of verifyAssetDelta(assetDelta).changes) {
            if (change.operation === "remove") {
                changes.push(releaseChangeSchema.parse(sealPublicationChange({
                    kind: "asset.withdrawn",
                    subject_type: "asset_binding",
                    subject_id: change.prior_binding_event_id,
                    previous_projection_digest: change.prior_binding_digest,
                    basis_event_ids: [change.disposition_event_id],
                })));
                continue;
            }
            changes.push(releaseChangeSchema.parse(sealPublicationChange({
                kind: change.prior_binding_event_id ? "asset.updated" : "asset.bound",
                subject_type: "asset_binding",
                subject_id: change.binding.binding_event_id,
                projection_digest: digest(change.binding),
                basis_event_ids: [change.binding.binding_event_id],
            })));
        }
    }
    return orderPublicationChanges(changes);
}
/** The canonical state transition a delta's `state_digest` commits to. */
export function catalogStateTransitionCore(delta) {
    return catalogStateTransitionCoreSchema.parse(stateTransition(delta));
}
/** A parsed delta already holds schema-valid fields, so its digests need no second parse. */
export function verifyCatalogDeltaState(delta) {
    if (digest(stateTransition(delta)) !== delta.state_digest) {
        throw new Error("Catalog delta state digest does not match its canonical transition.");
    }
    const { delta_digest: deltaDigest, ...core } = delta;
    if (digest(core) !== deltaDigest) {
        throw new Error("Catalog delta digest does not match its canonical core.");
    }
}
function stateTransition(delta) {
    return {
        state_contract: "sourcey.catalog-state-transition/v1alpha1",
        parent_state_digest: delta.base.release.snapshot_core.artifact_digest,
        policy_as_of: delta.policy_as_of,
        artifact_core: delta.artifact_core,
        entity_changes: delta.entity_changes,
        routes: delta.routes,
        identities: delta.identities,
        provenance: delta.provenance,
        authority_set_digests: delta.authority_set_digests,
        object_manifest_digest: delta.object_manifest_digest,
    };
}
export function buildDeltaSnapshotCore(input) {
    const parentResources = input.parent.resource_digests;
    const chain = (resource, changes) => sourceyReleaseEnvelope.resourceTransitionDigest(resource, releaseResourceDigest(parentResources, resource), changes);
    const carried = (resource) => releaseResourceDigest(parentResources, resource);
    const entityTransition = { entity_changes: input.delta.entity_changes };
    const provenanceTransition = {
        provenance: input.delta.provenance,
        authority_set_digests: input.delta.authority_set_digests,
    };
    const readinessChanges = input.agentReadinessChanges;
    const relationChanges = input.agentReadinessOfferRelationChanges;
    const assetDelta = input.assetDelta ? verifyAssetDelta(input.assetDelta) : null;
    if (assetDelta &&
        assetDelta.parent_asset_index_digest !== carried(RELEASE_RESOURCES.assetIndex)) {
        throw new Error("Asset delta does not target the exact parent asset index.");
    }
    const resourceDigests = {
        ...parentResources,
        [RELEASE_RESOURCES.agentReadinessIndex]: readinessChanges.length === 0
            ? carried(RELEASE_RESOURCES.agentReadinessIndex)
            : chain(RELEASE_RESOURCES.agentReadinessIndex, readinessChanges.map(({ input_digest: _, ...change }) => change)),
        [RELEASE_RESOURCES.agentReadinessInputs]: readinessChanges.every((change) => change.input_digest === null)
            ? carried(RELEASE_RESOURCES.agentReadinessInputs)
            : chain(RELEASE_RESOURCES.agentReadinessInputs, readinessChanges.map((change) => ({
                agent_readiness_profile_id: change.agent_readiness_profile_id,
                input_digest: change.input_digest,
                revision_digest: change.revision_digest,
            }))),
        [RELEASE_RESOURCES.agentReadinessOfferRelationIndex]: relationChanges.length === 0
            ? carried(RELEASE_RESOURCES.agentReadinessOfferRelationIndex)
            : chain(RELEASE_RESOURCES.agentReadinessOfferRelationIndex, relationChanges.map(({ input_digest: _, ...change }) => change)),
        [RELEASE_RESOURCES.agentReadinessOfferRelationInputs]: relationChanges.every((change) => change.input_digest === null)
            ? carried(RELEASE_RESOURCES.agentReadinessOfferRelationInputs)
            : chain(RELEASE_RESOURCES.agentReadinessOfferRelationInputs, relationChanges.map((change) => ({
                relation_id: change.relation_id,
                input_digest: change.input_digest,
                relation_revision_digest: change.relation_revision_digest,
            }))),
        [RELEASE_RESOURCES.agentReadinessPolicy]: releaseResourceDigest(input.delta.artifact_core.policy_digests, RELEASE_RESOURCES.agentReadinessPolicy),
        [RELEASE_RESOURCES.assetIndex]: assetDelta
            ? chain(RELEASE_RESOURCES.assetIndex, assetIndexTransitionChanges(assetDelta))
            : carried(RELEASE_RESOURCES.assetIndex),
        [RELEASE_RESOURCES.identities]: chain(RELEASE_RESOURCES.identities, {
            ...entityTransition,
            identities: input.delta.identities,
        }),
        [RELEASE_RESOURCES.observationInputs]: chain(RELEASE_RESOURCES.observationInputs, provenanceTransition),
        [RELEASE_RESOURCES.policyInputs]: chain(RELEASE_RESOURCES.policyInputs, input.delta.artifact_core.policy_digests),
        [RELEASE_RESOURCES.provenance]: chain(RELEASE_RESOURCES.provenance, provenanceTransition),
        [RELEASE_RESOURCES.routes]: chain(RELEASE_RESOURCES.routes, input.delta.routes),
        [RELEASE_RESOURCES.searchIndex]: chain(RELEASE_RESOURCES.searchIndex, entityTransition),
    };
    return sourceyReleaseEnvelopeSchemas.snapshotCore.parse({
        snapshot_contract: SOURCEY_PUBLICATION_CONTRACTS.snapshot,
        release_sequence: input.releaseSequence,
        compiler_version: input.parent.compiler_version,
        artifact_contract: input.parent.artifact_contract,
        input_set_digest: input.delta.delta_digest,
        artifact_digest: input.delta.state_digest,
        resource_digests: resourceDigests,
        root_set_digest: input.rootSetDigest,
        signer_registry_digest: input.signerRegistryDigest,
        trust_transition_digest: null,
        policy_as_of: input.delta.policy_as_of,
    });
}
//# sourceMappingURL=transition.js.map