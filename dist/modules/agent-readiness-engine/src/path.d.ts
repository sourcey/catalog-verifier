import { type Digest } from "provenry/primitives";
import { type AgentReadinessJob, type AgentReadinessJobBinding, type AgentReadinessRunRecord, type AgentReadinessStepResult } from "../../../contracts/agent-readiness/src/index.js";
import type { AgentReadinessPolicy } from "../../../contracts/agent-readiness/src/operate-policy.js";
/**
 * The Operate path a profile's runs establish: one outcome per step, each
 * resting on entries of the runs. The latest run decides every step; earlier
 * runs count only to reproduce a refusal, the one way a step is `blocked`.
 * Documentation never enters: only exchanges, discovery attempts, recorded
 * credentials and recorded human steps.
 */
export declare function evaluatePath(input: {
    readonly job: AgentReadinessJob;
    readonly binding: AgentReadinessJobBinding;
    readonly policy: Pick<AgentReadinessPolicy, "blocked">;
    readonly runs: readonly AgentReadinessRunRecord[];
    /** Declared endpoint URIs by id. */
    readonly endpoints: ReadonlyMap<string, string>;
}): {
    readonly runDigest: Digest;
    readonly steps: readonly AgentReadinessStepResult[];
};
/** A listing no binding has run: every step not assessed, so no letter. */
export declare function unexercisedPath(): readonly AgentReadinessStepResult[];
//# sourceMappingURL=path.d.ts.map