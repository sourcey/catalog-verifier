import type { z } from "zod";
import type { agentReadinessEvaluationRoleSchema, agentReadinessStageSchema } from "../../../contracts/agent-readiness/src/shared.js";
type Stage = z.infer<typeof agentReadinessStageSchema>;
type EvidenceSemantics = "quality" | "availability" | "compatible_absence";
export interface MetricDefinition {
    readonly stage: Stage;
    readonly code: string;
    readonly role: z.infer<typeof agentReadinessEvaluationRoleSchema>;
    readonly allowNotApplicable?: boolean;
    readonly selectorAlternatives: readonly (readonly Record<string, unknown>[])[];
    readonly coverage?: "at_least_one" | "all_matches";
    readonly evidence: EvidenceSemantics;
    readonly evidenceTerms: readonly string[];
    readonly condition: string;
    readonly ready: string;
    readonly limited: string;
    readonly blocked: string;
    readonly remediation: string;
}
export declare const METRICS: readonly MetricDefinition[];
export {};
//# sourceMappingURL=current-policy-metrics.d.ts.map