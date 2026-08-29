import { compareCanonicalStrings, digest } from "../../primitives/src/index.js";
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