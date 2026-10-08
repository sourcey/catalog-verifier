import type { AgentReadinessJobBinding, AgentReadinessOperateLetter, AgentReadinessStep, AgentReadinessStepResult } from "../../../contracts/agent-readiness/src/index.js";
import type { AgentReadinessPolicy } from "../../../contracts/agent-readiness/src/operate-policy.js";
export interface OperateRating {
    /** Null shows the dash: the job has not been exercised, or no letter's coverage is met. */
    readonly letter: AgentReadinessOperateLetter | null;
    /** Steps not yet assessed, in path order. */
    readonly missing: readonly AgentReadinessStep[];
}
/**
 * The Operate letter of a path, by the policy's rules: a blocked Delegation or
 * Pay is D and a blocked Job is F; otherwise the job must have been exercised,
 * and the first letter, best first, whose condition and coverage both hold is
 * the letter. A lower letter is never inferred: each asserts a recurring
 * workaround that would have to be observed.
 */
export declare function rateOperate(policy: Pick<AgentReadinessPolicy, "letters">, steps: readonly AgentReadinessStepResult[]): OperateRating;
/**
 * The Onboard level the Operate path alone establishes: 1 when the exercised
 * job needed no account (no credential, and no payment or payment per call).
 * Levels 2 to 6 come only from onboarding runs; otherwise not yet assessed.
 */
export declare function onboardLevelFromOperate(binding: Pick<AgentReadinessJobBinding, "payment">, steps: readonly AgentReadinessStepResult[]): number | null;
//# sourceMappingURL=rate.d.ts.map