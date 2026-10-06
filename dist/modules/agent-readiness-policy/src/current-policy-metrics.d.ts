import type { z } from "zod";
import type { agentReadinessEvaluationRoleSchema, agentReadinessStageSchema } from "../../../contracts/agent-readiness/src/shared.js";
type Stage = z.infer<typeof agentReadinessStageSchema>;
type EvidenceSemantics = "quality" | "availability" | "compatible_absence";
interface MetricDefinitionBase {
    readonly stage: Stage;
    readonly code: string;
    readonly role: z.infer<typeof agentReadinessEvaluationRoleSchema>;
    readonly selectorAlternatives: readonly (readonly Record<string, unknown>[])[];
    readonly coverage?: "at_least_one" | "all_matches";
    /** An approved, asserted public read of a service endpoint can prove this signal. */
    readonly serviceExchange?: true;
    readonly evidence: EvidenceSemantics;
    readonly evidenceTerms: readonly string[];
    readonly condition: string;
    readonly ready: string;
    readonly limited: string;
    readonly blocked: string;
    readonly remediation: string;
}
type FactPredicates = Readonly<Record<"yes" | "partial" | "no", string>>;
export type MetricDefinition = MetricDefinitionBase & ({
    readonly allowNotApplicable: true;
    readonly factPredicates: FactPredicates & {
        readonly not_applicable: string;
    };
} | {
    readonly allowNotApplicable?: false;
    readonly factPredicates: FactPredicates & {
        readonly not_applicable?: never;
    };
});
export declare const METRICS: readonly MetricDefinition[];
export {};
//# sourceMappingURL=current-policy-metrics.d.ts.map