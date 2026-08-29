import { releaseChangeSchema } from "../../../contracts/artifact/src/index.js";
import { offerCanonicalPath, programCanonicalPath, } from "../../../contracts/routes/src/index.js";
import { compareCanonicalStrings, digest } from "../../primitives/src/index.js";
export function buildChanges(input) {
    const { parent, current, identities, parentRoutes } = input;
    const candidates = [];
    const priorEntities = new Map(parent?.entities.map((entity) => [entity.entity_id, entity]) ?? []);
    for (const entity of current.entities) {
        const prior = priorEntities.get(entity.entity_id);
        const projectionDigest = entityProjectionDigest(entity);
        if (!prior) {
            candidates.push({
                kind: "entity.added",
                subject_type: "entity",
                subject_id: entity.entity_id,
                revision_digest: entity.revision_digest,
                projection_digest: projectionDigest,
                basis_event_ids: [...entity.provenance.basis_event_ids],
            });
        }
        else if (entityProjectionDigest(prior) !== projectionDigest) {
            candidates.push({
                kind: "entity.updated",
                subject_type: "entity",
                subject_id: entity.entity_id,
                previous_revision_digest: prior.revision_digest,
                revision_digest: entity.revision_digest,
                previous_projection_digest: entityProjectionDigest(prior),
                projection_digest: projectionDigest,
                basis_event_ids: [...entity.provenance.basis_event_ids],
            });
        }
        priorEntities.delete(entity.entity_id);
    }
    for (const entity of priorEntities.values()) {
        if (!identities.retired_entities.includes(entity.entity_id)) {
            throw new Error(`Entity ${entity.entity_id} disappeared without an identity tombstone.`);
        }
        candidates.push({
            kind: "entity.retired",
            subject_type: "entity",
            subject_id: entity.entity_id,
            previous_revision_digest: entity.revision_digest,
            previous_projection_digest: entityProjectionDigest(entity),
            basis_event_ids: [],
            tombstone: {
                reason: "retired",
                ...(canonicalRoute(parentRoutes, entity.entity_id)
                    ? { canonical_route: canonicalRoute(parentRoutes, entity.entity_id) }
                    : {}),
            },
        });
    }
    const priorPrograms = new Map(parent?.entities.flatMap((entity) => entity.programs.map((program) => [program.program_id, { entity, program }])) ?? []);
    for (const entity of current.entities) {
        for (const program of entity.programs) {
            const prior = priorPrograms.get(program.program_id);
            const projectionDigest = programProjectionDigest(program);
            const reparent = prior && prior.entity.entity_id !== entity.entity_id
                ? identities.program_reparents?.[program.program_id]
                : undefined;
            if (!prior) {
                candidates.push({
                    kind: "program.added",
                    subject_type: "program",
                    subject_id: program.program_id,
                    revision_digest: program.revision_digest,
                    projection_digest: projectionDigest,
                    basis_event_ids: [...program.provenance.basis_event_ids],
                });
            }
            else if (programProjectionDigest(prior.program) !== projectionDigest ||
                prior.entity.entity_id !== entity.entity_id) {
                if (prior.entity.entity_id !== entity.entity_id &&
                    (!reparent ||
                        (reparent.old_entity_id !== undefined &&
                            reparent.old_entity_id !== prior.entity.entity_id) ||
                        reparent.new_entity_id !== entity.entity_id)) {
                    throw new Error(`Program ${program.program_id} changed entity without an exact reparent event.`);
                }
                candidates.push({
                    kind: "program.updated",
                    subject_type: "program",
                    subject_id: program.program_id,
                    previous_revision_digest: prior.program.revision_digest,
                    revision_digest: program.revision_digest,
                    previous_projection_digest: programProjectionDigest(prior.program),
                    projection_digest: projectionDigest,
                    basis_event_ids: [
                        ...new Set([
                            ...program.provenance.basis_event_ids,
                            ...(reparent ? [reparent.event_id] : []),
                        ]),
                    ].sort(),
                });
            }
            priorPrograms.delete(program.program_id);
        }
    }
    for (const { entity, program } of priorPrograms.values()) {
        if (!identities.retired_programs.includes(program.program_id)) {
            throw new Error(`Program ${program.program_id} disappeared without an identity tombstone.`);
        }
        candidates.push({
            kind: "program.retired",
            subject_type: "program",
            subject_id: program.program_id,
            previous_revision_digest: program.revision_digest,
            previous_projection_digest: programProjectionDigest(program),
            basis_event_ids: [],
            tombstone: {
                reason: "retired",
                canonical_route: canonicalRoute(parentRoutes, entity.entity_id, program.program_id) ??
                    programCanonicalPath({ entity_slug: entity.slug, program_slug: program.slug }),
            },
        });
    }
    const priorOffers = new Map(parent?.entities.flatMap((entity) => entity.offers.map((offer) => [offer.offer_id, { entity, offer }])) ?? []);
    for (const entity of current.entities) {
        for (const offer of entity.offers) {
            const prior = priorOffers.get(offer.offer_id);
            const projectionDigest = digest(offer);
            const reparent = prior && prior.entity.entity_id !== entity.entity_id
                ? identities.offer_reparents?.[offer.offer_id]
                : undefined;
            if (!prior) {
                candidates.push({
                    kind: "offer.added",
                    subject_type: "offer",
                    subject_id: offer.offer_id,
                    revision_digest: offer.revision_digest,
                    projection_digest: projectionDigest,
                    basis_event_ids: [...offer.provenance.basis_event_ids],
                });
            }
            else if (digest(prior.offer) !== projectionDigest ||
                prior.entity.entity_id !== entity.entity_id) {
                if (prior.entity.entity_id !== entity.entity_id &&
                    (!reparent ||
                        (reparent.old_entity_id !== undefined &&
                            reparent.old_entity_id !== prior.entity.entity_id) ||
                        reparent.new_entity_id !== entity.entity_id)) {
                    throw new Error(`Offer ${offer.offer_id} changed Entity without an exact reparent event.`);
                }
                const lifecycleKind = offer.lifecycle === "ended"
                    ? "offer.ended"
                    : offer.lifecycle === "withdrawn"
                        ? "offer.withdrawn"
                        : "offer.updated";
                candidates.push({
                    kind: lifecycleKind,
                    subject_type: "offer",
                    subject_id: offer.offer_id,
                    previous_revision_digest: prior.offer.revision_digest,
                    revision_digest: offer.revision_digest,
                    previous_projection_digest: digest(prior.offer),
                    projection_digest: projectionDigest,
                    basis_event_ids: [
                        ...new Set([
                            ...offer.provenance.basis_event_ids,
                            ...(reparent ? [reparent.event_id] : []),
                        ]),
                    ].sort(),
                    ...(lifecycleKind === "offer.updated"
                        ? {}
                        : {
                            tombstone: {
                                reason: lifecycleKind === "offer.ended" ? "ended" : "withdrawn",
                                canonical_route: offerCanonicalPath({
                                    entity_slug: entity.slug,
                                    offer_slug: offer.slug,
                                }),
                            },
                        }),
                });
            }
            priorOffers.delete(offer.offer_id);
        }
    }
    for (const { entity, offer } of priorOffers.values()) {
        if (!identities.retired_offers.includes(offer.offer_id)) {
            throw new Error(`Offer ${offer.offer_id} disappeared without an identity tombstone.`);
        }
        candidates.push({
            kind: "offer.retired",
            subject_type: "offer",
            subject_id: offer.offer_id,
            previous_revision_digest: offer.revision_digest,
            previous_projection_digest: digest(offer),
            basis_event_ids: [],
            tombstone: {
                reason: "retired",
                canonical_route: canonicalRoute(parentRoutes, entity.entity_id, offer.program_id, offer.offer_id) ??
                    offerCanonicalPath({ entity_slug: entity.slug, offer_slug: offer.slug }),
            },
        });
    }
    const priorPolicies = new Map(parent?.policies.map((policy) => [policy.slug, policy]) ?? []);
    for (const policy of current.policies) {
        const prior = priorPolicies.get(policy.slug);
        if (!prior) {
            candidates.push({
                kind: "policy.added",
                subject_type: "policy",
                subject_id: policy.slug,
                revision_digest: policy.revision_digest,
                projection_digest: policy.revision_digest,
                basis_event_ids: [],
            });
        }
        else if (prior.revision_digest !== policy.revision_digest) {
            candidates.push({
                kind: "policy.updated",
                subject_type: "policy",
                subject_id: policy.slug,
                previous_revision_digest: prior.revision_digest,
                revision_digest: policy.revision_digest,
                previous_projection_digest: prior.revision_digest,
                projection_digest: policy.revision_digest,
                basis_event_ids: [],
            });
        }
        priorPolicies.delete(policy.slug);
    }
    for (const policy of priorPolicies.values()) {
        candidates.push({
            kind: "policy.retired",
            subject_type: "policy",
            subject_id: policy.slug,
            previous_revision_digest: policy.revision_digest,
            previous_projection_digest: policy.revision_digest,
            basis_event_ids: [],
            tombstone: { reason: "retired" },
        });
    }
    candidates.push(...agentReadinessChangeCandidates({
        current: input.agentReadinessProfiles,
        prior: input.parentAgentReadinessProfiles,
        identities,
    }));
    const priorBindings = new Map((input.parentAssetIndex?.bindings ?? []).map((binding) => [
        `${binding.entity_id}:${binding.role}`,
        binding,
    ]));
    for (const binding of input.assetIndex.bindings) {
        const key = `${binding.entity_id}:${binding.role}`;
        const prior = priorBindings.get(key);
        if (!prior) {
            candidates.push({
                kind: "asset.bound",
                subject_type: "asset_binding",
                subject_id: binding.binding_event_id,
                projection_digest: digest(binding),
                basis_event_ids: [binding.binding_event_id],
            });
        }
        else if (digest(prior) !== digest(binding)) {
            candidates.push({
                kind: "asset.updated",
                subject_type: "asset_binding",
                subject_id: binding.binding_event_id,
                previous_projection_digest: digest(prior),
                projection_digest: digest(binding),
                basis_event_ids: [binding.binding_event_id],
            });
        }
        priorBindings.delete(key);
    }
    for (const binding of priorBindings.values()) {
        const termination = input.events.find((event) => ["asset.withdrawn", "asset.takedown-ordered"].includes(event.kind) &&
            event.payload.target_binding_event_id ===
                binding.binding_event_id);
        const disposition = identities.asset_binding_dispositions[binding.binding_event_id];
        if (!termination && !disposition) {
            throw new Error(`Asset binding ${binding.binding_event_id} disappeared without a protected disposition.`);
        }
        candidates.push({
            kind: "asset.withdrawn",
            subject_type: "asset_binding",
            subject_id: binding.binding_event_id,
            previous_projection_digest: digest(binding),
            basis_event_ids: termination
                ? [termination.event_id]
                : disposition
                    ? [disposition.event_id]
                    : [],
        });
    }
    return candidates
        .map((candidate) => releaseChangeSchema.parse({ ...candidate, change_id: digest(candidate) }))
        .sort((left, right) => compareCanonicalStrings(left.subject_type, right.subject_type) ||
        compareCanonicalStrings(left.subject_id, right.subject_id) ||
        compareCanonicalStrings(left.kind, right.kind));
}
export function buildAgentReadinessChanges(input) {
    return agentReadinessChangeCandidates(input)
        .map((candidate) => releaseChangeSchema.parse({ ...candidate, change_id: digest(candidate) }))
        .sort((left, right) => compareCanonicalStrings(left.subject_id, right.subject_id) ||
        compareCanonicalStrings(left.kind, right.kind));
}
function agentReadinessChangeCandidates(input) {
    const candidates = [];
    const priorProfiles = new Map(input.prior.map((profile) => [profile.agent_readiness_profile_id, profile]));
    for (const profile of input.current) {
        const prior = priorProfiles.get(profile.agent_readiness_profile_id);
        if (!prior) {
            candidates.push({
                kind: "agent-readiness.added",
                subject_type: "agent_readiness_profile",
                subject_id: profile.agent_readiness_profile_id,
                revision_digest: profile.revision_digest,
                projection_digest: profile.projection_digest,
                basis_event_ids: [...profile.provenance.basis_event_ids],
            });
        }
        else if (prior.projection_digest !== profile.projection_digest) {
            const reparent = prior.entity_id !== profile.entity_id
                ? input.identities.agent_readiness_profile_reparents[profile.agent_readiness_profile_id]
                : undefined;
            if (prior.entity_id !== profile.entity_id &&
                (!reparent ||
                    reparent.old_entity_id !== prior.entity_id ||
                    reparent.new_entity_id !== profile.entity_id)) {
                throw new Error(`Agent readiness profile ${profile.agent_readiness_profile_id} changed entity without an exact reparent event.`);
            }
            const lifecycleChanged = prior.lifecycle !== profile.lifecycle;
            const policyProjectionRefresh = prior.revision_digest === profile.revision_digest &&
                (prior.policy_digest !== profile.policy_digest ||
                    prior.policy_as_of !== profile.policy_as_of ||
                    prior.provenance.freshness_policy_digest !== profile.provenance.freshness_policy_digest ||
                    prior.canonical_url !== profile.canonical_url);
            const kind = lifecycleChanged && profile.lifecycle === "ended"
                ? "agent-readiness.ended"
                : lifecycleChanged && profile.lifecycle === "withdrawn"
                    ? "agent-readiness.withdrawn"
                    : input.regradedProfileIds?.has(profile.agent_readiness_profile_id) === true ||
                        policyProjectionRefresh
                        ? "agent-readiness.regraded"
                        : "agent-readiness.updated";
            candidates.push({
                kind,
                subject_type: "agent_readiness_profile",
                subject_id: profile.agent_readiness_profile_id,
                previous_revision_digest: prior.revision_digest,
                revision_digest: profile.revision_digest,
                previous_projection_digest: prior.projection_digest,
                projection_digest: profile.projection_digest,
                basis_event_ids: [
                    ...new Set([
                        ...profile.provenance.basis_event_ids,
                        ...(reparent ? [reparent.event_id] : []),
                    ]),
                ].sort(compareCanonicalStrings),
            });
        }
        priorProfiles.delete(profile.agent_readiness_profile_id);
    }
    for (const profile of priorProfiles.values()) {
        if (!input.identities.retired_agent_readiness_profiles.includes(profile.agent_readiness_profile_id)) {
            throw new Error(`Agent readiness profile ${profile.agent_readiness_profile_id} disappeared without an identity tombstone.`);
        }
        candidates.push({
            kind: "agent-readiness.withdrawn",
            subject_type: "agent_readiness_profile",
            subject_id: profile.agent_readiness_profile_id,
            previous_revision_digest: profile.revision_digest,
            previous_projection_digest: profile.projection_digest,
            basis_event_ids: [],
            tombstone: { reason: "retired" },
        });
    }
    return candidates;
}
function entityProjectionDigest(entity) {
    const { programs: _, offers: __, ...projection } = entity;
    return digest(projection);
}
function programProjectionDigest(program) {
    return digest(program);
}
function canonicalRoute(routes, entityId, programId, offerId) {
    if (!routes)
        return undefined;
    return Object.values(routes.routes).find((entry) => entry.canonical &&
        entry.entity_id === entityId &&
        (programId === undefined ? entry.program_id === undefined : entry.program_id === programId) &&
        (offerId === undefined ? entry.offer_id === undefined : entry.offer_id === offerId))?.canonical_route;
}
//# sourceMappingURL=changes.js.map