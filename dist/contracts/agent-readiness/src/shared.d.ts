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
/** A revision rests on at most this many runs: its latest and the earlier refusals it reproduces. */
export declare const AGENT_READINESS_MAXIMUM_REVISION_RUNS = 4;
/** The Operate path, in order: how a principal's authority becomes a completed, confirmed job. */
export declare const AGENT_READINESS_STEPS: readonly ["discover", "delegation", "pay", "job", "confirm", "sustain"];
export declare const agentReadinessStepSchema: z.ZodEnum<{
    confirm: "confirm";
    delegation: "delegation";
    discover: "discover";
    job: "job";
    pay: "pay";
    sustain: "sustain";
}>;
export type AgentReadinessStep = z.infer<typeof agentReadinessStepSchema>;
/**
 * What happened at one step: done by the agent, a legitimate principal decision,
 * a human doing the agent's work, reproducibly impossible, proved absent by the
 * executed path, or not yet evidenced.
 */
export declare const agentReadinessStepOutcomeSchema: z.ZodEnum<{
    approval: "approval";
    blocked: "blocked";
    machine: "machine";
    not_applicable: "not_applicable";
    not_assessed: "not_assessed";
    workaround: "workaround";
}>;
export type AgentReadinessStepOutcome = z.infer<typeof agentReadinessStepOutcomeSchema>;
/** Once per principal or credential lifetime, or on every job, purchase or period. */
export declare const agentReadinessHandoffTimingSchema: z.ZodEnum<{
    recurring: "recurring";
    setup: "setup";
}>;
export declare const agentReadinessOperateLetterSchema: z.ZodEnum<{
    A: "A";
    "A+": "A+";
    B: "B";
    "B+": "B+";
    C: "C";
    "C+": "C+";
    D: "D";
    F: "F";
}>;
export type AgentReadinessOperateLetter = z.infer<typeof agentReadinessOperateLetterSchema>;
/** 1 no account needed … 6 sales-gated; absence is "not yet assessed". */
export declare const agentReadinessOnboardLevelSchema: z.ZodNumber;
export declare const agentReadinessEvidenceLabelSchema: z.ZodEnum<{
    probed: "probed";
    sourcey_run: "sourcey_run";
    vendor_run_verified: "vendor_run_verified";
}>;
//# sourceMappingURL=shared.d.ts.map