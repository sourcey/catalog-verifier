type Stage = "evaluate" | "sign_up" | "pay" | "provision" | "operate";
type EvidenceSemantics = "quality" | "availability" | "compatible_absence";
export interface MetricDefinition {
    readonly stage: Stage;
    readonly code: string;
    readonly role: "graded" | "barrier" | "informational";
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