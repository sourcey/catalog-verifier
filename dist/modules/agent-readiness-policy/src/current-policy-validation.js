import { CURRENT_AGENT_READINESS_POLICY_DIGEST } from "./current-policy.js";
import { validateAgentReadinessPolicy } from "./policy-validation.js";
/** Population operations may run only against the exact policy shipped by this checkout. */
export function verifyCurrentAgentReadinessPolicy(input) {
    const policy = validateAgentReadinessPolicy(input);
    if (policy.policy_digest !== CURRENT_AGENT_READINESS_POLICY_DIGEST) {
        throw new Error("Agent Readiness population operations require the current readiness policy.");
    }
    return policy;
}
//# sourceMappingURL=current-policy-validation.js.map