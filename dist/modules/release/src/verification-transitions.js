import { canonicalJson, compareCanonicalStrings, digest } from "provenry/primitives";
import { agentReadinessRevisionContract, } from "../../../contracts/agent-readiness/src/index.js";
import { agentReadinessOfferRelationRequiresWithdrawal, compileAgentReadinessOfferRelationRevision, } from "../../agent-readiness-policy/src/offer-relations.js";
/** Withdrawal is an independently verified transition, not permission to omit
 * an arbitrary live association. All evidence is in this exact delta. */
export function verifyAgentReadinessOfferRelationWithdrawals(input) {
    const changedOffers = new Map(input.changeSet.revision_changes.flatMap((change) => change.kind === "offer"
        ? [[change.target_id, change.candidate_revision_digest]]
        : []));
    for (const object of input.objects.values()) {
        if (object.relation !== null) {
            const relation = object.relation;
            const admitted = input.admittedProfileInputs.get(relation.agent_readiness_profile_id);
            if (agentReadinessOfferRelationRequiresWithdrawal({
                relation,
                changedOfferRevisionDigest: changedOffers.get(relation.offer_id),
                profileRetired: input.retiredProfileIds.has(relation.agent_readiness_profile_id),
            }) ||
                !admitted?.offer_relation_inputs.some((value) => canonicalJson(compileAgentReadinessOfferRelationRevision(value)) ===
                    canonicalJson(relation)))
                throw new Error(`Offer relation ${object.relation_id} differs from its admitted current Offer closure.`);
            continue;
        }
        const prior = object.prior_relation;
        if (!prior)
            throw new Error(`Offer relation withdrawal ${object.relation_id} lacks prior authority.`);
        const context = object.catalog_context;
        const revision = input.revisions.get(context.profile_revision_digest);
        const declaration = input.revisions.get(context.declaration_revision.revision_digest);
        const profile = input.profiles.get(prior.agent_readiness_profile_id);
        const replaced = Boolean(profile?.profile_input && profile.projection);
        const admitted = input.admittedProfileInputs.get(prior.agent_readiness_profile_id);
        const admittedRemoval = replaced &&
            admitted &&
            !admitted.offer_relation_inputs.some((value) => compileAgentReadinessOfferRelationRevision(value).relation_id === prior.relation_id);
        const retired = input.retiredProfileIds.has(prior.agent_readiness_profile_id) && profile?.projection === null;
        if (revision?.revision_contract !== agentReadinessRevisionContract ||
            revision.agent_readiness_profile_id !== prior.agent_readiness_profile_id ||
            revision.entity_id !== context.entity_id ||
            declaration?.revision_contract !== "sourcey.agent-readiness-declaration-revision/v1alpha1" ||
            canonicalJson(declaration) !== canonicalJson(context.declaration_revision) ||
            declaration.entity_id !== context.entity_id ||
            revision.declaration_revision_digest !== declaration.revision_digest ||
            (!replaced && prior.declaration_revision_digest !== declaration.revision_digest) ||
            (replaced && profile?.projection?.revision_digest !== revision.revision_digest) ||
            (retired && profile?.prior_projection?.revision_digest !== revision.revision_digest))
            throw new Error(`Offer relation withdrawal ${object.relation_id} lacks exact profile/declaration closure.`);
        if (!admittedRemoval &&
            !agentReadinessOfferRelationRequiresWithdrawal({
                relation: prior,
                changedOfferRevisionDigest: changedOffers.get(prior.offer_id),
                profileRetired: retired,
            }))
            throw new Error(`Offer relation withdrawal ${object.relation_id} has no admitted cause.`);
    }
}
export function verifiedAgentReadinessTransitions(objects) {
    return [...objects.values()]
        .map((object) => ({
        agent_readiness_profile_id: object.agent_readiness_profile_id,
        input_digest: object.profile_input ? digest(object.profile_input) : null,
        revision_digest: object.projection ? object.projection.revision_digest : null,
        projection_digest: object.projection ? object.projection.projection_digest : null,
    }))
        .sort((left, right) => compareCanonicalStrings(left.agent_readiness_profile_id, right.agent_readiness_profile_id));
}
export function verifiedAgentReadinessOfferRelationTransitions(objects) {
    return [...objects.values()]
        .map((object) => ({
        relation_id: object.relation_id,
        input_digest: object.relation_input ? digest(object.relation_input) : null,
        relation_revision_digest: object.relation
            ? object.relation.relation_revision_digest
            : null,
        previous_relation_revision_digest: object.prior_relation
            ? object.prior_relation.relation_revision_digest
            : null,
    }))
        .sort((left, right) => compareCanonicalStrings(left.relation_id, right.relation_id));
}
//# sourceMappingURL=verification-transitions.js.map