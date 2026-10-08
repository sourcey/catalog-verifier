import { sameAgentReadinessScope, } from "../../../contracts/agent-readiness/src/index.js";
export function priorAgentReadinessVisibility(revision, prior) {
    if (!prior)
        return null;
    if (prior.agent_readiness_profile_id !== revision.agent_readiness_profile_id ||
        !sameAgentReadinessScope(prior.scope, revision.scope)) {
        throw new Error("Agent Readiness projection history does not bind the same profile scope.");
    }
    return prior.publication.visibility;
}
//# sourceMappingURL=prior-projection.js.map