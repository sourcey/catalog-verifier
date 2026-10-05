import { canonicalJson } from "provenry/primitives";
import { agentReadinessOfferRelationRequiresWithdrawal, compileAgentReadinessOfferRelationRevision, } from "../../agent-readiness-policy/src/offer-relations.js";
import { orderedUnique } from "../../catalog-admission/src/publication-dependencies.js";
import { verifyAgentReadinessPublicationInputs } from "../../release/src/agent-readiness-publication-inputs.js";
/** The bundle proves admitted changes, not which associations existed in its
 * parent. Storage supplies this exact bounded slice under the live-head lock.
 * Selection never trusts the producer's affected_dependents list. */
export function catalogPublicationParentRelationGuard(delta) {
    const objects = delta.agentReadinessOfferRelationObjects;
    const admitted = verifyAgentReadinessPublicationInputs({
        files: delta.files,
        proposal: delta.publicationProposal,
        profiles: delta.agentReadinessObjects,
    });
    const desired = new Map([...admitted].map(([id, input]) => [
        id,
        new Map(input.offer_relation_inputs.map((input) => {
            const relation = compileAgentReadinessOfferRelationRevision(input);
            return [relation.relation_id, relation];
        })),
    ]));
    const changedOffers = new Map(delta.publicationChangeSet.revision_changes.flatMap((change) => change.kind === "offer"
        ? [[change.target_id, change.candidate_revision_digest]]
        : []));
    const profileIds = orderedUnique([
        ...delta.agentReadinessObjects.keys(),
        ...[...objects.values()].map((object) => relationSubject(object).agent_readiness_profile_id),
    ]);
    const selectors = {
        relationIds: orderedUnique([...objects.keys()]),
        profileIds,
        offerIds: orderedUnique([
            ...changedOffers.keys(),
            ...[...desired.values()].flatMap((relations) => [...relations.values()].map((relation) => relation.offer_id)),
            ...[...objects.values()].flatMap((object) => [object.relation, object.prior_relation].flatMap((relation) => relation ? [relation.offer_id] : [])),
        ]),
    };
    return {
        selectors,
        verify(parent) {
            const current = new Map(parent.relations.map((relation) => [relation.relation_id, relation]));
            if (current.size !== parent.relations.length)
                throw new Error("Catalog relation parent repeats an association.");
            const profiles = new Map(parent.profiles.map((profile) => [profile.agent_readiness_profile_id, profile]));
            const offers = new Map(parent.offers.map((offer) => [offer.offer_id, offer.revision_digest]));
            const assertCurrentOffer = (relation) => {
                const revision = changedOffers.has(relation.offer_id)
                    ? changedOffers.get(relation.offer_id)
                    : offers.get(relation.offer_id);
                if (revision !== relation.admitted_offer_revision_digest)
                    throw new Error(`Catalog Offer relation ${relation.relation_id} does not bind the current Offer.`);
            };
            for (const [id, object] of objects) {
                if (canonicalJson(current.get(id) ?? null) !== canonicalJson(object.prior_relation))
                    throw new Error(`Catalog Offer relation ${id} does not match its exact current base.`);
                const profileId = relationSubject(object).agent_readiness_profile_id;
                const transition = delta.agentReadinessObjects.get(profileId);
                // A retirement's withdrawal binds the old profile; a replacement binds
                // the admitted successor. An unchanged profile must still be live.
                const profile = transition?.projection ?? profiles.get(profileId);
                if (!profile ||
                    profile.revision_digest !== object.catalog_context.profile_revision_digest ||
                    profile.declaration_revision_digest !==
                        object.catalog_context.declaration_revision.revision_digest)
                    throw new Error(`Catalog Offer relation ${id} lacks its current profile closure.`);
                if (object.relation)
                    assertCurrentOffer(object.relation);
            }
            for (const relation of current.values()) {
                const profileId = relation.agent_readiness_profile_id;
                const profile = delta.agentReadinessObjects.get(profileId);
                const replacement = desired.get(profileId);
                const expected = replacement
                    ? (replacement.get(relation.relation_id) ?? null)
                    : agentReadinessOfferRelationRequiresWithdrawal({
                        relation,
                        changedOfferRevisionDigest: changedOffers.get(relation.offer_id),
                        profileRetired: profile?.projection === null,
                    })
                        ? null
                        : relation;
                const change = objects.get(relation.relation_id);
                const actual = change ? change.relation : relation;
                if (canonicalJson(actual) !== canonicalJson(expected))
                    throw new Error(`Catalog publication omits the required transition for Offer relation ${relation.relation_id}.`);
            }
            for (const relations of desired.values()) {
                for (const [id, relation] of relations) {
                    assertCurrentOffer(relation);
                    const actual = objects.has(id) ? objects.get(id)?.relation : current.get(id);
                    if (canonicalJson(actual ?? null) !== canonicalJson(relation))
                        throw new Error(`Catalog publication omits admitted Offer relation ${id}.`);
                }
            }
        },
    };
}
function relationSubject(object) {
    const relation = object.relation ?? object.prior_relation;
    if (!relation)
        throw new Error(`Offer relation ${object.relation_id} has no transition subject.`);
    return relation;
}
//# sourceMappingURL=publication-parent-relations.js.map