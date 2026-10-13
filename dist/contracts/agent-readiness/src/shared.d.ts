import { z } from "zod";
export declare const agentReadinessDigestSchema: z.ZodString;
export declare const agentReadinessEntityIdSchema: z.ZodString;
export declare const agentReadinessOfferIdSchema: z.ZodString;
export declare const agentReadinessProfileIdSchema: z.ZodString;
export declare const agentReadinessIdentifierSchema: z.ZodString;
export declare const agentReadinessInstantSchema: z.ZodISODateTime;
export declare const agentReadinessScopeKeySchema: z.ZodString;
export declare const agentReadinessHostnameSchema: z.ZodString;
/** Whether a profile's last successful check is within the policy's freshness window. */
export declare const agentReadinessFreshnessSchema: z.ZodEnum<{
    fresh: "fresh";
    stale: "stale";
}>;
/** A profile is one service product and one library job: `job.key` is the job's id. */
export declare const agentReadinessScopeSchema: z.ZodObject<{
    product: z.ZodObject<{
        key: z.ZodString;
        name: z.ZodString;
    }, z.core.$strict>;
    job: z.ZodObject<{
        key: z.ZodString;
        name: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare function sameAgentReadinessScopeIdentity(left: z.infer<typeof agentReadinessScopeSchema>, right: z.infer<typeof agentReadinessScopeSchema>): boolean;
export declare const agentReadinessCatalogBindingSchema: z.ZodObject<{
    base_release_id: z.ZodString;
    entity_revision_digest: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessResourceRoleSchema: z.ZodEnum<{
    access: "access";
    authentication: "authentication";
    checkout: "checkout";
    descriptor: "descriptor";
    discovery: "discovery";
    documentation: "documentation";
    eligibility: "eligibility";
    operations: "operations";
    policy: "policy";
    pricing: "pricing";
    provisioning: "provisioning";
    recovery: "recovery";
    status: "status";
    terms: "terms";
}>;
export declare const agentReadinessSurfaceNodeKindSchema: z.ZodEnum<{
    endpoint: "endpoint";
    interface: "interface";
    resource: "resource";
    surface_exclusion: "surface_exclusion";
}>;
export declare const agentReadinessSurfaceReferenceSchema: z.ZodObject<{
    node_kind: z.ZodEnum<{
        endpoint: "endpoint";
        interface: "interface";
        resource: "resource";
        surface_exclusion: "surface_exclusion";
    }>;
    node_id: z.ZodString;
}, z.core.$strict>;
/**
 * The earlier runs of each group a refresh reads, newest first: the profile's
 * probe runs, and each binding's (north star §5.4).
 */
export declare const AGENT_READINESS_PRIOR_RUNS_READ = 4;
/** The most runs a policy asks to hold one finding before it counts (its reproduction's `attempts`). */
export declare const AGENT_READINESS_MAXIMUM_ATTEMPTS = 2;
/**
 * A revision rests on at most this many runs: its probe runs from the earliest
 * its grade rests on through the latest (the earlier ones a refresh reads, and
 * its own), and its binding's runs that decide.
 */
export declare const AGENT_READINESS_MAXIMUM_REVISION_RUNS: number;
/**
 * The roles of the pages a person's or a vendor's step happens on, which a
 * listing names and the probe requests (north star §5.3).
 */
export declare const AGENT_READINESS_PAGE_ROLES: readonly ["registration", "access_request", "access_setting", "claim", "checkout", "top_up", "key_renewal"];
/** A probe run requests each declared page once, and a listing names at most this many. */
export declare const AGENT_READINESS_MAXIMUM_PAGES = 8;
/**
 * The path, in the shape's order: the agent finds the job, gets authority for
 * it, registers, pays, confirms, and keeps its access up (north star §5.1).
 */
export declare const AGENT_READINESS_STEPS: readonly ["discover", "authority", "onboard", "pay", "confirm", "sustain"];
export declare const agentReadinessStepSchema: z.ZodEnum<{
    authority: "authority";
    confirm: "confirm";
    discover: "discover";
    onboard: "onboard";
    pay: "pay";
    sustain: "sustain";
}>;
export type AgentReadinessStep = z.infer<typeof agentReadinessStepSchema>;
/**
 * What happened at one step (north star §5.2): done by the agent, absent
 * (nothing to do), a principal's one-time decision, a person doing the
 * agent's work, or a vendor's decision standing in the way. `not_assessed` is
 * a step a run did not settle; a published revision holds one only on an F
 * card whose listing names no interface for the job.
 */
export declare const agentReadinessStepOutcomeSchema: z.ZodEnum<{
    approval: "approval";
    gated: "gated";
    machine: "machine";
    not_applicable: "not_applicable";
    not_assessed: "not_assessed";
    workaround: "workaround";
}>;
export type AgentReadinessStepOutcome = z.infer<typeof agentReadinessStepOutcomeSchema>;
/**
 * The job itself, which is not a step (north star §5.1): an interface for it
 * answers and the job has not been run, a run did it, or no machine interface
 * performs it (F). `not_assessed` until the probes settle it.
 */
export declare const agentReadinessJobOutcomeSchema: z.ZodEnum<{
    not_assessed: "not_assessed";
    reachable: "reachable";
    unavailable: "unavailable";
    verified: "verified";
}>;
export type AgentReadinessJobOutcome = z.infer<typeof agentReadinessJobOutcomeSchema>;
/** Once (per principal or credential lifetime), or every run, purchase or period. */
export declare const agentReadinessHumanStepTimingSchema: z.ZodEnum<{
    recurring: "recurring";
    setup: "setup";
}>;
/**
 * The kinds of person-step on the shape's scale (north star §5.7), lightest
 * first: a light, one-time step; a person signing up; a person handing over a
 * key; a card on file; a step that recurs; a vendor's decision.
 */
export declare const AGENT_READINESS_PERSON_STEP_KINDS: readonly ["light", "sign_up", "key", "card", "recurring", "gated"];
export declare const agentReadinessPersonStepKindSchema: z.ZodEnum<{
    card: "card";
    gated: "gated";
    key: "key";
    light: "light";
    recurring: "recurring";
    sign_up: "sign_up";
}>;
export type AgentReadinessPersonStepKind = z.infer<typeof agentReadinessPersonStepKindSchema>;
/**
 * Every person-step a step can need (north star §5.7): the outcomes, besides
 * `machine`, `not_applicable` and `not_assessed`, that a step result may hold.
 */
export declare const AGENT_READINESS_PERSON_STEPS: readonly [{
    readonly step: "discover";
    readonly outcome: "workaround";
    readonly timing: "setup";
}, {
    readonly step: "authority";
    readonly outcome: "approval";
    readonly timing: "setup";
}, {
    readonly step: "authority";
    readonly outcome: "workaround";
    readonly timing: "setup";
}, {
    readonly step: "onboard";
    readonly outcome: "approval";
    readonly timing: "setup";
}, {
    readonly step: "onboard";
    readonly outcome: "workaround";
    readonly timing: "setup";
}, {
    readonly step: "onboard";
    readonly outcome: "gated";
    readonly timing: null;
}, {
    readonly step: "pay";
    readonly outcome: "workaround";
    readonly timing: "setup";
}, {
    readonly step: "pay";
    readonly outcome: "workaround";
    readonly timing: "recurring";
}, {
    readonly step: "confirm";
    readonly outcome: "workaround";
    readonly timing: "recurring";
}, {
    readonly step: "sustain";
    readonly outcome: "workaround";
    readonly timing: "setup";
}, {
    readonly step: "sustain";
    readonly outcome: "workaround";
    readonly timing: "recurring";
}];
/** One person-step, keyed as `step:outcome:timing`. */
export declare function agentReadinessPersonStepKey(step: {
    readonly step: AgentReadinessStep;
    readonly outcome: AgentReadinessStepOutcome;
    readonly timing: z.infer<typeof agentReadinessHumanStepTimingSchema> | null;
}): string;
/** The scale, best first (north star §5.7). */
export declare const agentReadinessLetterSchema: z.ZodEnum<{
    A: "A";
    "A+": "A+";
    B: "B";
    "B+": "B+";
    C: "C";
    D: "D";
    F: "F";
}>;
export type AgentReadinessLetter = z.infer<typeof agentReadinessLetterSchema>;
export declare const agentReadinessEvidenceLabelSchema: z.ZodEnum<{
    probed: "probed";
    vendor_run_verified: "vendor_run_verified";
}>;
export type AgentReadinessEvidenceLabel = z.infer<typeof agentReadinessEvidenceLabelSchema>;
//# sourceMappingURL=shared.d.ts.map