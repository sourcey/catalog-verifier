import type { AgentReadinessPolicy } from "../../../contracts/agent-readiness/src/grade-policy.js";
import { type AgentReadinessAccountOperation, type AgentReadinessJob, type AgentReadinessJobOperation, type AgentReadinessJobResult, type AgentReadinessRunRecord, type AgentReadinessStep, type AgentReadinessStepResult } from "../../../contracts/agent-readiness/src/index.js";
/** One interface's path, and whether a later run is due soon to settle or reproduce it. */
export interface EvaluatedPath {
    readonly steps: readonly AgentReadinessStepResult[];
    /** The job itself, beside the steps (north star §5.6, the job). */
    readonly job: AgentReadinessJobResult;
    /** A later run can settle what this path leaves open: a page answer not yet reproduced. */
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
    /** The pages where a person claims later what the agent made alone through it, by page id. */
    readonly claimPages: readonly string[];
    /** The pages where a person replaces its key, which the vendor expires with no API to renew it. */
    readonly keyRenewalPages: readonly string[];
    /** The listing rules out a checkout: the job is free, or paid per call by its request's offer. */
    readonly checkoutRuledOut: boolean;
    /** The account operations this interface declares: its sign-up API, its top-up. */
    readonly accountOperations: readonly Pick<AgentReadinessAccountOperation, "operation_id" | "role">[];
    /** Probe runs of the profile's current declaration revision, any order. */
    readonly runs: readonly AgentReadinessRunRecord[];
}): EvaluatedPath;
/**
 * The verified path of one binding: proof, not the grade (north star §5.6). The
 * latest run that did the job, while it is fresh, makes the job `verified`; a
 * verified run sets no step and never makes the job `unavailable`, which only
 * the probes find. The path rests on that run, or on the latest run when none
 * did the job.
 */
export declare function evaluatePath(input: {
    readonly job: AgentReadinessJob;
    readonly policy: Pick<AgentReadinessPolicy, "fresh_for_days">;
    /** This binding's verified runs, any order. */
    readonly runs: readonly AgentReadinessRunRecord[];
    /** When freshness is judged: the refresh's own probe run. */
    readonly asOf: string;
}): EvaluatedPath;
/**
 * A binding's path: every step the probes', and the job verified where its run
 * proved a job the probes found reachable (north star §5.6). A verified job
 * grades as a reachable one does, so the run never changes the letter: it
 * cannot lift a probed `unavailable` or settle a job the probes left open.
 */
export declare function combinePaths(probed: EvaluatedPath, verified: EvaluatedPath): EvaluatedPath;
export declare function notAssessed(step: AgentReadinessStep): AgentReadinessStepResult;
/** The job not yet settled by any run. */
export declare const NOT_ASSESSED_JOB: AgentReadinessJobResult;
/** The job unavailable on the run's declaration revision alone: it names no interface for the job. */
export declare function declaredUnavailable(run: AgentReadinessRunRecord): AgentReadinessJobResult;
//# sourceMappingURL=path.d.ts.map