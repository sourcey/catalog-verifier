import { agentReadinessOfferRelationIndexSchema, agentReadinessOfferRelationInputsSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { releaseChangeSchema } from "../../../contracts/artifact/src/index.js";
import { catalogDeltaCoreSchema, catalogStateTransitionCoreSchema, RELEASE_RESOURCES, releaseResourceDigest, snapshotCoreSchema, } from "../../../contracts/release/src/index.js";
import { offerCanonicalPath, programCanonicalPath } from "../../../contracts/routes/src/index.js";
import { assetIndexTransitionDigest, verifyAssetDelta } from "../../assets/src/index.js";
import { compareCanonicalStrings, digest } from "../../primitives/src/index.js";
import { buildAgentReadinessChanges } from "./changes.js";
export function buildDeltaChanges(entities, identities, agentReadiness = { current: [], prior: [] }, assetDelta = null) {
    const changes = [];
    for (const { current, prior } of entities) {
        changes.push(releaseChangeSchema.parse(withChangeId({
            kind: prior ? "entity.updated" : "entity.added",
            subject_type: "entity",
            subject_id: current.entity_id,
            ...(prior ? { previous_revision_digest: prior.revision_digest } : {}),
            revision_digest: current.revision_digest,
            ...(prior ? { previous_projection_digest: digest(prior) } : {}),
            projection_digest: digest(current),
            basis_event_ids: [...current.provenance.basis_event_ids],
        })));
        const priorPrograms = new Map(prior?.programs.map((value) => [value.program_id, value]) ?? []);
        for (const program of current.programs) {
            const previous = priorPrograms.get(program.program_id);
            if (!previous || digest(previous) !== digest(program)) {
                changes.push(releaseChangeSchema.parse(withChangeId({
                    kind: previous ? "program.updated" : "program.added",
                    subject_type: "program",
                    subject_id: program.program_id,
                    ...(previous ? { previous_revision_digest: previous.revision_digest } : {}),
                    revision_digest: program.revision_digest,
                    ...(previous ? { previous_projection_digest: digest(previous) } : {}),
                    projection_digest: digest(program),
                    basis_event_ids: [...program.provenance.basis_event_ids],
                })));
            }
            priorPrograms.delete(program.program_id);
        }
        for (const program of priorPrograms.values()) {
            if (!identities.retired_programs.includes(program.program_id)) {
                throw new Error("Program removal requires an identity transition.");
            }
            changes.push(releaseChangeSchema.parse(withChangeId({
                kind: "program.retired",
                subject_type: "program",
                subject_id: program.program_id,
                previous_revision_digest: program.revision_digest,
                previous_projection_digest: digest(program),
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
            if (!previous || digest(previous) !== digest(offer)) {
                const kind = offer.lifecycle === "ended"
                    ? "offer.ended"
                    : offer.lifecycle === "withdrawn"
                        ? "offer.withdrawn"
                        : previous
                            ? "offer.updated"
                            : "offer.added";
                changes.push(releaseChangeSchema.parse(withChangeId({
                    kind,
                    subject_type: "offer",
                    subject_id: offer.offer_id,
                    ...(previous ? { previous_revision_digest: previous.revision_digest } : {}),
                    revision_digest: offer.revision_digest,
                    ...(previous ? { previous_projection_digest: digest(previous) } : {}),
                    projection_digest: digest(offer),
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
            changes.push(releaseChangeSchema.parse(withChangeId({
                kind: "offer.retired",
                subject_type: "offer",
                subject_id: offer.offer_id,
                previous_revision_digest: offer.revision_digest,
                previous_projection_digest: digest(offer),
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
    changes.push(...buildAgentReadinessChanges({
        current: agentReadiness.current,
        prior: agentReadiness.prior,
        identities,
        ...(agentReadiness.regradedProfileIds
            ? { regradedProfileIds: agentReadiness.regradedProfileIds }
            : {}),
    }));
    if (assetDelta) {
        for (const change of verifyAssetDelta(assetDelta).changes) {
            if (change.operation === "remove") {
                changes.push(releaseChangeSchema.parse(withChangeId({
                    kind: "asset.withdrawn",
                    subject_type: "asset_binding",
                    subject_id: change.prior_binding_event_id,
                    previous_projection_digest: change.prior_binding_digest,
                    basis_event_ids: [change.disposition_event_id],
                })));
                continue;
            }
            changes.push(releaseChangeSchema.parse(withChangeId({
                kind: change.prior_binding_event_id ? "asset.updated" : "asset.bound",
                subject_type: "asset_binding",
                subject_id: change.binding.binding_event_id,
                projection_digest: digest(change.binding),
                basis_event_ids: [change.binding.binding_event_id],
            })));
        }
    }
    return changes.sort((left, right) => compareCanonicalStrings(left.subject_type, right.subject_type) ||
        compareCanonicalStrings(left.subject_id, right.subject_id) ||
        compareCanonicalStrings(left.kind, right.kind));
}
export function verifyCatalogDeltaState(delta) {
    const stateCore = catalogStateTransitionCoreSchema.parse({
        state_contract: "sourcey.catalog-state-transition/v1alpha1",
        parent_state_digest: delta.base?.release.snapshot_core.artifact_digest ?? null,
        policy_as_of: delta.policy_as_of,
        artifact_core: delta.artifact_core,
        entity_changes: delta.entity_changes,
        routes: delta.routes,
        identities: delta.identities,
        provenance: delta.provenance,
        authority_set_digests: delta.authority_set_digests,
        object_manifest_digest: delta.object_manifest_digest,
    });
    if (digest(stateCore) !== delta.state_digest) {
        throw new Error("Catalog delta state digest does not match its canonical transition.");
    }
    const { delta_digest: deltaDigest, ...coreInput } = delta;
    const core = catalogDeltaCoreSchema.parse(coreInput);
    if (digest(core) !== deltaDigest) {
        throw new Error("Catalog delta digest does not match its canonical core.");
    }
}
export function buildDeltaSnapshotCore(input) {
    const entityTransition = { entity_changes: input.delta.entity_changes };
    const provenanceTransition = {
        provenance: input.delta.provenance,
        authority_set_digests: input.delta.authority_set_digests,
    };
    const readinessChanges = input.agentReadinessChanges ?? [];
    const readinessIndexDigest = readinessChanges.length === 0
        ? releaseResourceDigest(input.parent.resource_digests, RELEASE_RESOURCES.agentReadinessIndex)
        : transitionDigest(releaseResourceDigest(input.parent.resource_digests, RELEASE_RESOURCES.agentReadinessIndex), RELEASE_RESOURCES.agentReadinessIndex, readinessChanges.map(({ input_digest: _, ...change }) => change));
    const readinessInputsDigest = readinessChanges.every((change) => change.input_digest === null)
        ? releaseResourceDigest(input.parent.resource_digests, RELEASE_RESOURCES.agentReadinessInputs)
        : transitionDigest(releaseResourceDigest(input.parent.resource_digests, RELEASE_RESOURCES.agentReadinessInputs), RELEASE_RESOURCES.agentReadinessInputs, readinessChanges.map((change) => ({
            agent_readiness_profile_id: change.agent_readiness_profile_id,
            input_digest: change.input_digest,
            revision_digest: change.revision_digest,
        })));
    const relationChanges = input.agentReadinessOfferRelationChanges ?? [];
    const priorRelationIndexDigest = optionalResourceDigest(input.parent.resource_digests, RELEASE_RESOURCES.agentReadinessOfferRelationIndex, digest(agentReadinessOfferRelationIndexSchema.parse({
        relation_index_contract: "sourcey.agent-readiness-offer-relation-index/v1alpha1",
        relations: {},
        by_profile: {},
        by_offer: {},
    })));
    const priorRelationInputsDigest = optionalResourceDigest(input.parent.resource_digests, RELEASE_RESOURCES.agentReadinessOfferRelationInputs, digest(agentReadinessOfferRelationInputsSchema.parse({
        input_contract: "sourcey.agent-readiness-offer-relation-inputs/v1alpha1",
        relations: [],
    })));
    const relationIndexDigest = relationChanges.length === 0
        ? priorRelationIndexDigest
        : transitionDigest(priorRelationIndexDigest, RELEASE_RESOURCES.agentReadinessOfferRelationIndex, relationChanges.map(({ input_digest: _, ...change }) => change));
    const relationInputsDigest = relationChanges.every((change) => change.input_digest === null)
        ? priorRelationInputsDigest
        : transitionDigest(priorRelationInputsDigest, RELEASE_RESOURCES.agentReadinessOfferRelationInputs, relationChanges.map((change) => ({
            relation_id: change.relation_id,
            input_digest: change.input_digest,
            relation_revision_digest: change.relation_revision_digest,
        })));
    const agentReadinessPolicyDigest = input.delta.artifact_core.policy_digests[RELEASE_RESOURCES.agentReadinessPolicy];
    const parentAssetIndexDigest = releaseResourceDigest(input.parent.resource_digests, RELEASE_RESOURCES.assetIndex);
    const assetIndexDigest = input.assetDelta
        ? (() => {
            const assetDelta = verifyAssetDelta(input.assetDelta);
            if (assetDelta.parent_asset_index_digest !== parentAssetIndexDigest) {
                throw new Error("Asset delta does not target the exact parent asset index.");
            }
            return assetIndexTransitionDigest(assetDelta);
        })()
        : parentAssetIndexDigest;
    return snapshotCoreSchema.parse({
        snapshot_contract: "sourcey.snapshot-core/v1alpha1",
        release_sequence: input.releaseSequence,
        compiler_version: input.parent.compiler_version,
        artifact_contract: input.parent.artifact_contract,
        input_set_digest: input.delta.delta_digest,
        artifact_digest: input.delta.state_digest,
        resource_digests: {
            ...input.parent.resource_digests,
            [RELEASE_RESOURCES.agentReadinessIndex]: readinessIndexDigest,
            [RELEASE_RESOURCES.agentReadinessInputs]: readinessInputsDigest,
            [RELEASE_RESOURCES.agentReadinessOfferRelationIndex]: relationIndexDigest,
            [RELEASE_RESOURCES.agentReadinessOfferRelationInputs]: relationInputsDigest,
            ...(agentReadinessPolicyDigest
                ? { [RELEASE_RESOURCES.agentReadinessPolicy]: agentReadinessPolicyDigest }
                : {}),
            [RELEASE_RESOURCES.assetIndex]: assetIndexDigest,
            [RELEASE_RESOURCES.identities]: transitionDigest(releaseResourceDigest(input.parent.resource_digests, RELEASE_RESOURCES.identities), RELEASE_RESOURCES.identities, { ...entityTransition, identities: input.delta.identities }),
            [RELEASE_RESOURCES.observationInputs]: transitionDigest(releaseResourceDigest(input.parent.resource_digests, RELEASE_RESOURCES.observationInputs), RELEASE_RESOURCES.observationInputs, provenanceTransition),
            [RELEASE_RESOURCES.policyInputs]: transitionDigest(releaseResourceDigest(input.parent.resource_digests, RELEASE_RESOURCES.policyInputs), RELEASE_RESOURCES.policyInputs, input.delta.artifact_core.policy_digests),
            [RELEASE_RESOURCES.provenance]: transitionDigest(releaseResourceDigest(input.parent.resource_digests, RELEASE_RESOURCES.provenance), RELEASE_RESOURCES.provenance, provenanceTransition),
            [RELEASE_RESOURCES.routes]: transitionDigest(releaseResourceDigest(input.parent.resource_digests, RELEASE_RESOURCES.routes), RELEASE_RESOURCES.routes, input.delta.routes),
            [RELEASE_RESOURCES.searchIndex]: transitionDigest(releaseResourceDigest(input.parent.resource_digests, RELEASE_RESOURCES.searchIndex), RELEASE_RESOURCES.searchIndex, entityTransition),
        },
        root_set_digest: input.rootSetDigest,
        signer_registry_digest: input.signerRegistryDigest,
        trust_transition_digest: null,
        policy_as_of: input.delta.policy_as_of,
    });
}
function optionalResourceDigest(resources, name, emptyDigest) {
    const value = resources[name];
    return value === undefined ? emptyDigest : releaseResourceDigest(resources, name);
}
function transitionDigest(parentDigest, projection, changes) {
    return digest({
        transition_contract: "sourcey.projection-transition/v1alpha1",
        projection,
        parent_digest: parentDigest,
        changes,
    });
}
function withChangeId(core) {
    return { change_id: digest(core), ...core };
}
//# sourceMappingURL=transition.js.map