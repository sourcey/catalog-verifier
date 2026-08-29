import type { AgentReadinessPolicy, AgentReadinessRevision } from "../../../contracts/agent-readiness/src/index.js";
import type { StandardEvidenceRequirementResult } from "../../../contracts/standards/src/index.js";
export declare function agentReadinessValuesSupportedByStandardRequirementResults(input: {
    readonly mappings: AgentReadinessPolicy["signal_rules"][number]["standard_evidence"];
    readonly results: readonly StandardEvidenceRequirementResult[];
}): AgentReadinessRevision["signals"][number]["value"][];
//# sourceMappingURL=standard-mapping.d.ts.map