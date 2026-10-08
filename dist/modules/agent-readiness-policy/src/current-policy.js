import { AGENT_READINESS_JOB_LIBRARY_SOURCE, sealAgentReadinessJobLibrary, } from "../../agent-readiness-jobs/src/index.js";
import { agentReadinessPolicySource, sealAgentReadinessPolicy } from "./operate-policy.js";
/**
 * The policy this code pins: new declarations are validated against it.
 * Releases and their verifier read the pinned file instead, which the
 * generator writes from this value and a test proves equal to it.
 */
export const currentAgentReadinessPolicy = sealAgentReadinessPolicy(agentReadinessPolicySource({
    jobLibrary: sealAgentReadinessJobLibrary(AGENT_READINESS_JOB_LIBRARY_SOURCE),
}));
//# sourceMappingURL=current-policy.js.map