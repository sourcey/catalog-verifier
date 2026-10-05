import { digest } from "provenry/primitives";
import { agentReadinessAssessmentMethodPackCoreSchema, agentReadinessPolicyCoreSchema, agentReadinessPolicySchema, } from "../../../contracts/agent-readiness/src/index.js";
/**
 * Validate the immutable identity of any Agent Readiness policy without
 * importing the executable current-policy registry or grading runtime.
 */
export function validateAgentReadinessPolicyIdentity(input) {
    const policy = agentReadinessPolicySchema.parse(input);
    const { policy_digest: _, ...coreInput } = policy;
    const core = agentReadinessPolicyCoreSchema.parse(coreInput);
    if (digest(core) !== policy.policy_digest) {
        throw new Error("Agent readiness policy digest does not match its canonical core.");
    }
    for (const method of policy.assessment_methods) {
        const { method_digest: __, ...methodCoreInput } = method;
        const methodCore = agentReadinessAssessmentMethodPackCoreSchema.parse(methodCoreInput);
        if (digest(methodCore) !== method.method_digest) {
            throw new Error(`Agent readiness method ${method.name}@${method.version} digest does not match its canonical core.`);
        }
    }
    return policy;
}
//# sourceMappingURL=index.js.map