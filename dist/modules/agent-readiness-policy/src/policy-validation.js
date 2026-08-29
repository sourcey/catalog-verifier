import { agentReadinessAssessmentMethodPackCoreSchema, agentReadinessPolicyCoreSchema, agentReadinessPolicySchema, methodCapabilityFor, missingAssessableValues, } from "../../../contracts/agent-readiness/src/index.js";
import { digest } from "../../primitives/src/index.js";
import { CURRENT_AGENT_READINESS_POLICY_DIGEST } from "./current-policy.js";
export function validateAgentReadinessPolicy(input) {
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
    for (const rule of policy.signal_rules) {
        const methods = rule.allowed_method_digests.map((methodDigest) => {
            const method = policy.assessment_methods.find((candidate) => candidate.method_digest === methodDigest);
            if (!method)
                throw new Error(`Agent readiness method ${methodDigest} is unresolved.`);
            return method;
        });
        const capabilitiesByMethod = methods.map((method) => ({
            method,
            capability: methodCapabilityFor(method, rule.stage, rule.signal_code),
        }));
        const capabilities = capabilitiesByMethod.flatMap(({ capability }) => capability ? [capability] : []);
        if (capabilities.length === 0) {
            throw new Error(`Agent readiness signal ${rule.stage}:${rule.signal_code} has no allowed method capability.`);
        }
        for (const { method, capability } of capabilitiesByMethod) {
            if (!capability) {
                throw new Error(`Agent readiness method ${method.name}@${method.version} cannot assess ${rule.stage}:${rule.signal_code}.`);
            }
        }
        const missingValues = missingAssessableValues(capabilities, rule);
        if (missingValues.length > 0) {
            throw new Error(`Agent readiness methods cannot close ${rule.stage}:${rule.signal_code}; missing ${missingValues.join(", ")}.`);
        }
        for (const evidenceRule of rule.value_evidence) {
            const executableAlternative = evidenceRule.alternatives.some((alternative) => capabilities.some((capability) => capability.values.includes(evidenceRule.value) &&
                alternative.required_basis_kinds.every((kind) => capability.determination_bases.includes(kind))));
            if (!executableAlternative) {
                throw new Error(`Agent readiness methods cannot satisfy evidence for ${rule.stage}:${rule.signal_code}=${evidenceRule.value}.`);
            }
        }
    }
    return policy;
}
export function verifyCurrentAgentReadinessPolicy(input) {
    const policy = validateAgentReadinessPolicy(input);
    if (policy.policy_digest !== CURRENT_AGENT_READINESS_POLICY_DIGEST) {
        throw new Error("Agent Readiness population operations require the current readiness policy.");
    }
    return policy;
}
//# sourceMappingURL=policy-validation.js.map