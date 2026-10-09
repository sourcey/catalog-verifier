/** Whether two profiles rate the same product and job. */
export function sameAgentReadinessScope(left, right) {
    return left.product.key === right.product.key && left.job.key === right.job.key;
}
export function validateOfferRelationInterval(value, context) {
    if (value.effective_until &&
        Date.parse(value.effective_until) <= Date.parse(value.effective_from)) {
        context.addIssue({
            code: "custom",
            path: ["effective_until"],
            message: "Agent Readiness Offer relation effective interval is empty.",
        });
    }
}
export function sameAgentReadinessOfferRelationIdentity(left, right) {
    return (left.relation_id === right.relation_id &&
        left.agent_readiness_profile_id === right.agent_readiness_profile_id &&
        left.offer_id === right.offer_id &&
        left.purpose === right.purpose);
}
export function relationMembership(relations, field) {
    const memberships = new Map();
    for (const relation of Object.values(relations)) {
        memberships.set(field === "offer_id" ? relation.offer_id : relation.agent_readiness_profile_id, [
            ...(memberships.get(field === "offer_id" ? relation.offer_id : relation.agent_readiness_profile_id) ?? []),
            relation.relation_id,
        ]);
    }
    for (const [key, ids] of memberships)
        memberships.set(key, [...ids].sort());
    return memberships;
}
export function validateRelationMembership(actual, expected, context, path) {
    if (Object.keys(actual).length !== expected.size) {
        context.addIssue({
            code: "custom",
            path,
            message: "Offer relation index membership is incomplete.",
        });
        return;
    }
    for (const [key, expectedIds] of expected) {
        const actualIds = actual[key];
        if (!actualIds ||
            actualIds.length !== expectedIds.length ||
            new Set(actualIds).size !== actualIds.length ||
            actualIds.some((id, index) => id !== expectedIds[index])) {
            context.addIssue({
                code: "custom",
                path: [...path, key],
                message: "Offer relation index membership must be unique, complete, and canonically ordered.",
            });
        }
    }
}
//# sourceMappingURL=checks.js.map