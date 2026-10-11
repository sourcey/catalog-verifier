import type { AgentReadinessPolicy } from "../../../contracts/agent-readiness/src/grade-policy.js";
import { type AgentReadinessJobResult, type AgentReadinessLetter, type AgentReadinessStepResult } from "../../../contracts/agent-readiness/src/index.js";
/**
 * The letter of a path (north star §5.7): the kind of each person-step it
 * holds, read from the policy, and the first letter, best first, that allows
 * every one of them and as many as there are where it names a most (A's one). The job `unavailable` is F whatever else the path holds,
 * once every step it can show is assessed: all of them, or none where the
 * listing names no interface for the job. Any path is null (not publishable)
 * until then.
 */
export declare function rateGrade(policy: Pick<AgentReadinessPolicy, "letters" | "person_steps">, steps: readonly AgentReadinessStepResult[], job: AgentReadinessJobResult): AgentReadinessLetter | null;
/** Best first: the scale's order, then a path not yet graded. */
export declare function agentReadinessLetterRank(letter: AgentReadinessLetter | null): number;
//# sourceMappingURL=rate.d.ts.map