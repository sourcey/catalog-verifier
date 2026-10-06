import type { AgentReadinessPolicy, AgentReadinessProjection } from "../../../contracts/agent-readiness/src/index.js";
type AgentReadinessStage = "evaluate" | "sign_up" | "pay" | "provision" | "operate";
type AgentReadinessOutcome = "pass" | "constrained" | "fail" | "unknown" | "not_applicable";
export declare function deriveAgentReadinessGrade(input: {
    readonly policy: AgentReadinessPolicy;
    readonly stages: readonly {
        readonly stage: AgentReadinessStage;
        readonly outcome: AgentReadinessOutcome;
        readonly signals: readonly {
            readonly evaluation_role: "graded" | "barrier" | "informational";
            readonly required: boolean;
            readonly evidence_status: "supported" | "contradicted" | "mixed" | "missing";
            readonly value: "yes" | "partial" | "no" | "unknown" | "not_applicable";
            readonly outcome: AgentReadinessOutcome;
            readonly freshness: "fresh" | "stale" | "unknown";
        }[];
    }[];
    readonly coverageStatus: AgentReadinessProjection["coverage"]["status"];
    readonly freshness: AgentReadinessProjection["freshness"];
    readonly observedOperationCoverage: boolean;
}): AgentReadinessProjection["grade"];
export declare function isAgentReadinessVerifiedBarrierSignal(signal: {
    readonly evaluation_role: "graded" | "barrier" | "informational";
    readonly evidence_status: "supported" | "contradicted" | "mixed" | "missing";
    readonly value: "yes" | "partial" | "no" | "unknown" | "not_applicable";
    readonly outcome: AgentReadinessOutcome;
    readonly freshness: "fresh" | "stale" | "unknown";
}): boolean;
export declare function isAgentReadinessResolvedBarrierSignal(signal: {
    readonly evaluation_role: "graded" | "barrier" | "informational";
    readonly evidence_status: "supported" | "contradicted" | "mixed" | "missing";
    readonly value: "yes" | "partial" | "no" | "unknown" | "not_applicable";
    readonly outcome: AgentReadinessOutcome;
}): boolean;
export declare function isAgentReadinessUnverifiedBarrierSignal(signal: Parameters<typeof isAgentReadinessVerifiedBarrierSignal>[0]): boolean;
export declare function isAgentReadinessGradingSignal(signal: {
    readonly evaluation_role: "graded" | "barrier" | "informational";
}): boolean;
export {};
//# sourceMappingURL=grading.d.ts.map