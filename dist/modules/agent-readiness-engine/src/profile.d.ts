import type { AgentReadinessPolicy } from "../../../contracts/agent-readiness/src/grade-policy.js";
import { type AgentReadinessDeclaration, type AgentReadinessJob, type AgentReadinessJobBinding, type AgentReadinessJobResult, type AgentReadinessLetter, type AgentReadinessRunRecord, type AgentReadinessStepResult } from "../../../contracts/agent-readiness/src/index.js";
type Declaration = Pick<AgentReadinessDeclaration, "job_operations" | "account_operations" | "job_bindings" | "interfaces" | "endpoints" | "surface_exclusions">;
/** One interface's path as a card shows it, with the runs it rests on. */
export interface AgentReadinessProfilePath {
    /** The interface whose path this is; null when the declaration names no API or MCP server for the job. */
    readonly interfaceId: string | null;
    /** The binding whose verified runs the path also rests on, or null for probes alone. */
    readonly binding: AgentReadinessJobBinding | null;
    readonly steps: readonly AgentReadinessStepResult[];
    /** The job itself: reachable, verified or unavailable. */
    readonly job: AgentReadinessJobResult;
    /** Null until the job and every step are assessed: such a path is not published. */
    readonly letter: AgentReadinessLetter | null;
    /**
     * Oldest first: every probe run from the earliest the path rests on (the
     * latest, the one that decided Discover, those a step or the job cites, and
     * those that reproduce a standing answer) through the latest, and the
     * binding's runs that decided its outcomes.
     */
    readonly runs: readonly AgentReadinessRunRecord[];
    /** The discovery facts the card shows: the run's that decided Discover, else the latest probe run's. */
    readonly discovery: AgentReadinessRunRecord["discovery"]["facts"];
    /** The probe run those facts are from. */
    readonly discoveryRunDigest: string;
    /** A later run can settle or reproduce what this path leaves open. */
    readonly reproducible: boolean;
}
/**
 * The vendor's sales or approval pages that stand between an agent and one
 * interface (north star §5.6, Onboard `gated`): one the interface names, since
 * the vendor approves who calls it whatever sign-up exists beside it; and,
 * with no sign-up declared (a registration endpoint or account operation),
 * one no interface names, since the vendor decides who gets an account at
 * all. Each holds once the probe's request for it is answered.
 */
export declare function agentReadinessAccessGates(declaration: Pick<Declaration, "endpoints" | "interfaces" | "account_operations">, interfaceId: string): readonly string[];
/**
 * The pages one interface lists for a person's step on it (north star §5.6):
 * the `access_setting` a person on the account turns on once and the `claim`
 * page where a person claims later what the agent made alone (Onboard
 * `approval`), and the `key_renewal` page where a person replaces a key the
 * vendor expires with no API to renew it (Sustain, recurring). Each holds once
 * the probe's request for it is answered.
 */
export declare function agentReadinessInterfacePages(declaration: Pick<Declaration, "endpoints" | "interfaces">, interfaceId: string, role: "access_setting" | "claim" | "key_renewal"): readonly string[];
/**
 * The declaration rules out a checkout (north star §5.6, Pay): the job is free
 * on an account, or paid per call by the offer its own request answers, which
 * sets Pay before this does.
 */
export declare function agentReadinessCheckoutRuledOut(declaration: Pick<Declaration, "surface_exclusions">): boolean;
/**
 * The path of one interface (north star §5.6): its probed path, with the job
 * verified where the binding's run proved it. With no
 * interface, nothing declared performs the job: F on the declaration itself.
 * The verifier re-derives a revision's steps here, for exactly the interface
 * and binding the revision names.
 */
export declare function evaluateInterfacePath(input: {
    readonly job: AgentReadinessJob;
    readonly declaration: Declaration;
    readonly policy: Pick<AgentReadinessPolicy, "reproduction" | "letters" | "person_steps" | "fresh_for_days">;
    readonly interfaceId: string | null;
    readonly binding: AgentReadinessJobBinding | null;
    /** Probe runs of the profile's current declaration revision. */
    readonly probeRuns: readonly AgentReadinessRunRecord[];
    /** Verified runs of the profile's current declaration revision, of any binding. */
    readonly verifiedRuns: readonly AgentReadinessRunRecord[];
}): AgentReadinessProfilePath;
/**
 * Every interface that performs the job gives its own path: probes alone, or
 * each binding on it that has verified runs, which can only prove the job.
 * The best letter is the profile's; at the same letter a path whose job a run
 * proved comes first, then the earlier declared operation and binding.
 * `reproducible` holds only while nothing grades, since a reproduced finding
 * can only lower a letter.
 */
export declare function evaluateProfile(input: {
    readonly job: AgentReadinessJob;
    readonly declaration: Declaration;
    readonly policy: Pick<AgentReadinessPolicy, "reproduction" | "letters" | "person_steps" | "fresh_for_days">;
    readonly probeRuns: readonly AgentReadinessRunRecord[];
    readonly verifiedRuns: readonly AgentReadinessRunRecord[];
}): AgentReadinessProfilePath;
export {};
//# sourceMappingURL=profile.d.ts.map