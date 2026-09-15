import { agentReadinessOfferRelationIndexSchema, agentReadinessOfferRelationInputSchema, agentReadinessOfferRelationRevisionCoreSchema, agentReadinessOfferRelationRevisionSchema, agentReadinessStageSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { compareCanonicalStrings, digest } from "../../primitives/src/index.js";
/** Undefined means this Offer was not changed; null means it was removed. */
export function agentReadinessOfferRelationRequiresWithdrawal(input) {
    return (input.profileRetired ||
        (input.changedOfferRevisionDigest !== undefined &&
            input.changedOfferRevisionDigest !== input.relation.admitted_offer_revision_digest));
}
export function agentReadinessOfferRelationId(input) {
    const identityDigest = digest({
        relation_contract: "sourcey.agent-readiness-offer-relation-identity/v1alpha1",
        agent_readiness_profile_id: input.agentReadinessProfileId,
        offer_id: input.offerId,
        purpose: input.purpose,
    });
    return `arr_${identityDigest.slice("sha256:".length, "sha256:".length + 26)}`;
}
export function compileAgentReadinessOfferRelationRevision(input) {
    const parsed = agentReadinessOfferRelationInputSchema.parse(input);
    const core = agentReadinessOfferRelationRevisionCoreSchema.parse({
        relation_contract: "sourcey.agent-readiness-offer-relation/v1alpha1",
        relation_id: agentReadinessOfferRelationId({
            agentReadinessProfileId: parsed.agent_readiness_profile_id,
            offerId: parsed.offer_id,
            purpose: parsed.purpose,
        }),
        agent_readiness_profile_id: parsed.agent_readiness_profile_id,
        offer_id: parsed.offer_id,
        purpose: parsed.purpose,
        applicable_stages: [...parsed.applicable_stages].sort((left, right) => agentReadinessStageSchema.options.indexOf(left) -
            agentReadinessStageSchema.options.indexOf(right)),
        effective_from: parsed.effective_from,
        ...(parsed.effective_until ? { effective_until: parsed.effective_until } : {}),
        declaration_revision_digest: parsed.declaration_revision_digest,
        offer_relation_proposal_id: parsed.offer_relation_proposal_id,
        admitted_offer_revision_digest: parsed.admitted_offer_revision_digest,
    });
    return agentReadinessOfferRelationRevisionSchema.parse({
        ...core,
        relation_revision_digest: digest(core),
    });
}
export function projectAgentReadinessOfferRelationIndex(input) {
    if (!Number.isFinite(Date.parse(input.policyAsOf))) {
        throw new Error("Agent Readiness Offer relation projection time is invalid.");
    }
    const policyAsOf = Date.parse(input.policyAsOf);
    const ordered = input.relations
        .filter((relation) => Date.parse(relation.effective_from) <= policyAsOf &&
        (!relation.effective_until || policyAsOf < Date.parse(relation.effective_until)))
        .sort((left, right) => compareCanonicalStrings(left.relation_id, right.relation_id));
    const byProfile = new Map();
    const byOffer = new Map();
    for (const relation of ordered) {
        byProfile.set(relation.agent_readiness_profile_id, [
            ...(byProfile.get(relation.agent_readiness_profile_id) ?? []),
            relation.relation_id,
        ]);
        byOffer.set(relation.offer_id, [
            ...(byOffer.get(relation.offer_id) ?? []),
            relation.relation_id,
        ]);
    }
    return agentReadinessOfferRelationIndexSchema.parse({
        relation_index_contract: "sourcey.agent-readiness-offer-relation-index/v1alpha1",
        relations: Object.fromEntries(ordered.map((relation) => [relation.relation_id, relation])),
        by_profile: Object.fromEntries([...byProfile].sort(([left], [right]) => compareCanonicalStrings(left, right))),
        by_offer: Object.fromEntries([...byOffer].sort(([left], [right]) => compareCanonicalStrings(left, right))),
    });
}
//# sourceMappingURL=offer-relations.js.map