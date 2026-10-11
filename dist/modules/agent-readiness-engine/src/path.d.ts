import type { AgentReadinessPolicy } from "../../../contracts/agent-readiness/src/grade-policy.js";
import { type AgentReadinessJob, type AgentReadinessJobBinding, type AgentReadinessJobOperation, type AgentReadinessJobResult, type AgentReadinessRunRecord, type AgentReadinessStep, type AgentReadinessStepResult } from "../../../contracts/agent-readiness/src/index.js";
/** One interface's path, and whether a later run is due soon to settle or reproduce it. */
export interface EvaluatedPath {
    readonly steps: readonly AgentReadinessStepResult[];
    /** The job itself, beside the steps (north star §5.6, the job). */
    readonly job: AgentReadinessJobResult;
    /**
     * A later run can settle what this path leaves open: a page answer not yet
     * reproduced, or a failure of the job not yet reproduced.
     */
    readonly reproducible: boolean;
    /** The probe run whose discovery decided Discover; null when none did. */
    readonly discoveryRun: AgentReadinessRunRecord | null;
    /** The binding's run that decided its outcomes, assessed or not; null for a probed path. */
    readonly verifiedRun: AgentReadinessRunRecord | null;
    /** The probe runs that reproduce a read's standing answer: unanswered on each, since it last answered. */
    readonly standingRuns: readonly AgentReadinessRunRecord[];
}
/**
 * The probed path of one interface (north star §5.6). The latest probe run that
 * answered the operation decides its steps; a run that left its request, its
 * malformed request, its spec, its authority chain or a declared page
 * unanswered decides nothing, since residue is never a fact. Discovery's
 * latest run decides Discover and the payment manifests, unless an unanswered
 * read could change them: then the latest run whose reads were all answered,
 * or left unanswered only the service's standing answers, does. Earlier runs
 * count only to reproduce a page answer or a standing answer.
 */
export declare function evaluateProbePath(input: {
    readonly operation: AgentReadinessJobOperation;
    /** The operation's declared endpoint URI; null for a spec operation. */
    readonly endpoint: string | null;
    readonly policy: Pick<AgentReadinessPolicy, "reproduction">;
    /** The vendor's sales or approval pages that gate this interface, by page id. */
    readonly accessGates: readonly string[];
    /** The settings a person turns on once before an agent can use this interface, by page id. */
    readonly accessSettings: readonly string[];
    /** The listing rules out a checkout: the job is free, or paid per call by its request's offer. */
    readonly checkoutRuledOut: boolean;
    /** Probe runs of the profile's current declaration revision, any order. */
    readonly runs: readonly AgentReadinessRunRecord[];
}): EvaluatedPath;
/**
 * The verified path of one binding: what performing the job with its authority
 * establishes (north star §5.6, precedence). Only the vendor's own runs can
 * lower a letter: a refusal of authority a vendor run proved valid counts when
 * the vendor's latest run holds it and its earlier runs reproduce it (the
 * job's refusal makes the job `unavailable`, Authority's makes that step
 * `gated`, and a 402 is a balance a person tops up: Pay's recurring
 * `workaround`), and so do failed assertions reproduced the same way (the job
 * `unavailable`). Otherwise the latest run that did the job decides while it
 * is fresh; a failing run from anyone else never lowers a letter.
 */
export declare function evaluatePath(input: {
    readonly job: AgentReadinessJob;
    readonly binding: AgentReadinessJobBinding;
    readonly policy: Pick<AgentReadinessPolicy, "reproduction" | "fresh_for_days">;
    /** This binding's verified runs, any order. */
    readonly runs: readonly AgentReadinessRunRecord[];
    /** Declared endpoint URIs by id. */
    readonly endpoints: ReadonlyMap<string, string>;
    /** When freshness is judged: the refresh's own probe run. */
    readonly asOf: string;
}): EvaluatedPath;
/**
 * Verified outcomes replace probed ones for the steps the verified run
 * assessed, and for the job (north star §5.6, precedence); a step it left
 * unassessed keeps its probed outcome.
 */
export declare function combinePaths(probed: EvaluatedPath, verified: EvaluatedPath): EvaluatedPath;
export declare function notAssessed(step: AgentReadinessStep): AgentReadinessStepResult;
/** The job not yet settled by any run. */
export declare const NOT_ASSESSED_JOB: AgentReadinessJobResult;
/** The job unavailable on the run's declaration revision alone: it names no interface for the job. */
export declare function declaredUnavailable(run: AgentReadinessRunRecord): AgentReadinessJobResult;
//# sourceMappingURL=path.d.ts.map