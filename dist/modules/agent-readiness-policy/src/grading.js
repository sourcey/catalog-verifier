export function deriveAgentReadinessGrade(input) {
    const failedStages = input.stages.filter((stage) => stage.signals.some((signal) => isAgentReadinessStageSignal(signal) &&
        signal.outcome === "fail" &&
        signal.evidence_status === "supported" &&
        signal.freshness === "fresh"));
    if (failedStages.length > 0) {
        return failedStages.some((stage) => input.policy.grading.failure_grade_by_stage[stage.stage] === "F")
            ? "F"
            : "D";
    }
    if (input.coverageStatus !== "complete" || input.freshness !== "fresh")
        return "unrated";
    if (input.stages.some((stage) => stage.signals.some((signal) => signal.evaluation_role === "graded" && signal.outcome === "unknown"))) {
        return "unrated";
    }
    const limitedStages = input.stages.filter((stage) => stage.outcome === "constrained").length;
    const grade = input.policy.grading.grade_by_limited_stage_count[String(limitedStages)];
    const hasUnverifiedBarrier = input.stages.some((stage) => stage.signals.some(isAgentReadinessUnverifiedBarrierSignal));
    const barrierCapped = hasUnverifiedBarrier &&
        input.policy.grading.unverified_barrier_grade_cap !== undefined &&
        (grade === "A+" || grade === "A")
        ? input.policy.grading.unverified_barrier_grade_cap
        : grade;
    return !input.observedOperationCoverage && (barrierCapped === "A+" || barrierCapped === "A")
        ? input.policy.grading.unobserved_operation_grade_cap
        : barrierCapped;
}
export function isAgentReadinessVerifiedBarrierSignal(signal) {
    return isAgentReadinessResolvedBarrierSignal(signal) && signal.freshness === "fresh";
}
export function isAgentReadinessResolvedBarrierSignal(signal) {
    return (signal.evaluation_role === "barrier" &&
        signal.evidence_status === "supported" &&
        signal.value !== "unknown" &&
        signal.outcome !== "unknown");
}
export function isAgentReadinessUnverifiedBarrierSignal(signal) {
    return signal.evaluation_role === "barrier" && !isAgentReadinessVerifiedBarrierSignal(signal);
}
export function isAgentReadinessGradingSignal(signal) {
    return signal.evaluation_role === "graded";
}
function isAgentReadinessStageSignal(signal) {
    return signal.evaluation_role === "graded" || isAgentReadinessVerifiedBarrierSignal(signal);
}
//# sourceMappingURL=grading.js.map