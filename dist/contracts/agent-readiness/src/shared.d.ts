import { z } from "zod";
export declare const agentReadinessDigestSchema: z.ZodString;
export declare const agentReadinessEntityIdSchema: z.ZodString;
export declare const agentReadinessOfferIdSchema: z.ZodString;
export declare const agentReadinessProfileIdSchema: z.ZodString;
export declare const agentReadinessIdentifierSchema: z.ZodString;
/** A reviewer identity, in the same form the authority contract's human actor id takes. */
export declare const agentReadinessReviewerIdSchema: z.ZodString;
export declare const agentReadinessInstantSchema: z.ZodISODateTime;
export declare const agentReadinessSignalCodeSchema: z.ZodString;
export declare const agentReadinessScopeKeySchema: z.ZodString;
export declare const agentReadinessMethodNameSchema: z.ZodString;
export declare const agentReadinessHostnameSchema: z.ZodString;
export declare const agentReadinessStageSchema: z.ZodEnum<{
    evaluate: "evaluate";
    operate: "operate";
    pay: "pay";
    provision: "provision";
    sign_up: "sign_up";
}>;
export declare function agentReadinessStageLabel(input: z.infer<typeof agentReadinessStageSchema>): string;
export declare const agentReadinessSignalValueSchema: z.ZodEnum<{
    no: "no";
    not_applicable: "not_applicable";
    partial: "partial";
    unknown: "unknown";
    yes: "yes";
}>;
export declare const agentReadinessStageOutcomeSchema: z.ZodEnum<{
    constrained: "constrained";
    fail: "fail";
    not_applicable: "not_applicable";
    pass: "pass";
    unknown: "unknown";
}>;
export declare const agentReadinessPublicStateSchema: z.ZodEnum<{
    blocked: "blocked";
    limited: "limited";
    not_applicable: "not_applicable";
    ready: "ready";
    unknown: "unknown";
}>;
export declare const agentReadinessEvaluationRoleSchema: z.ZodEnum<{
    barrier: "barrier";
    graded: "graded";
    informational: "informational";
}>;
export declare const agentReadinessGradeSchema: z.ZodEnum<{
    A: "A";
    "A+": "A+";
    B: "B";
    "B+": "B+";
    C: "C";
    "C+": "C+";
    D: "D";
    F: "F";
    unrated: "unrated";
}>;
export declare const agentReadinessFreshnessSchema: z.ZodEnum<{
    fresh: "fresh";
    stale: "stale";
    unknown: "unknown";
}>;
export declare const agentReadinessScopeSubjectSchema: z.ZodObject<{
    key: z.ZodString;
    name: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessScopeSchema: z.ZodObject<{
    product: z.ZodObject<{
        key: z.ZodString;
        name: z.ZodString;
    }, z.core.$strict>;
    funnel: z.ZodObject<{
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
export declare function agentReadinessResourceRoleLabel(input: z.infer<typeof agentReadinessResourceRoleSchema>): string;
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
export declare const agentReadinessAssessmentMethodSchema: z.ZodObject<{
    name: z.ZodString;
    version: z.ZodString;
    method_digest: z.ZodString;
}, z.core.$strict>;
export type AgentReadinessAssessmentMethod = z.infer<typeof agentReadinessAssessmentMethodSchema>;
//# sourceMappingURL=shared.d.ts.map