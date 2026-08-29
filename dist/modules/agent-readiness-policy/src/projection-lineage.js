import { agentReadinessProjectionLineageSchema, sameAgentReadinessScopeIdentity, } from "../../../contracts/agent-readiness/src/index.js";
export function priorAgentReadinessVisibility(revision, candidate) {
    if (!candidate)
        return null;
    const prior = agentReadinessProjectionLineageSchema.parse(candidate);
    if (prior.agent_readiness_profile_id !== revision.agent_readiness_profile_id ||
        !sameAgentReadinessScopeIdentity(prior.scope, revision.scope)) {
        throw new Error("Agent Readiness projection history does not bind the same profile scope.");
    }
    return prior.publication.visibility;
}
//# sourceMappingURL=projection-lineage.js.map