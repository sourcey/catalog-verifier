import { z } from "zod";
import { catalogAuthoringUrlSchema } from "../../revisions/src/index.js";
import { agentReadinessAssessmentTargetSchema, agentReadinessDeclaredInterfaceSchema, agentReadinessEndpointSchema, agentReadinessOfferRelationProposalSchema, agentReadinessParticipantRoleSchema, agentReadinessResourceSchema, agentReadinessSurfaceExclusionSchema, agentReadinessSurfaceRelationSchema, } from "./declaration.js";
import { agentReadinessAuthoringPathSchema } from "./declaration-reference.js";
import { agentReadinessDigestSchema, agentReadinessEntityIdSchema, agentReadinessInstantSchema, agentReadinessScopeKeySchema, agentReadinessScopeSchema, } from "./shared.js";
const sourceUrisSchema = z.array(catalogAuthoringUrlSchema).min(1);
export const agentReadinessDraftSubjectSchema = z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("entity_id"), value: agentReadinessEntityIdSchema }).strict(),
    z.object({ kind: z.literal("slug"), value: agentReadinessScopeKeySchema }).strict(),
    z
        .object({
        kind: z.literal("domain"),
        value: z
            .string()
            .regex(/^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/, "Domain references must be normalized lower-case DNS names."),
    })
        .strict(),
]);
export const agentReadinessDraftParticipantSchema = z
    .object({
    participant_id: agentReadinessScopeKeySchema.refine((value) => value !== "subject", "The subject participant is generated and uses the reserved ID 'subject'."),
    roles: z.array(agentReadinessParticipantRoleSchema.exclude(["subject"])).min(1),
    identity: z.discriminatedUnion("kind", [
        z.object({ kind: z.literal("entity_id"), entity_id: agentReadinessEntityIdSchema }).strict(),
        z.object({ kind: z.literal("origin_uri"), uri: catalogAuthoringUrlSchema }).strict(),
    ]),
    source_uris: sourceUrisSchema,
})
    .strict();
export const agentReadinessDraftResourceSchema = agentReadinessResourceSchema
    .safeExtend({ source_uris: sourceUrisSchema })
    .strict();
export const agentReadinessDraftEndpointSchema = agentReadinessEndpointSchema
    .safeExtend({ source_uris: sourceUrisSchema })
    .strict();
export const agentReadinessDraftInterfaceSchema = agentReadinessDeclaredInterfaceSchema
    .safeExtend({ source_uris: sourceUrisSchema })
    .strict();
export const agentReadinessDraftAssessmentTargetSchema = agentReadinessAssessmentTargetSchema
    .safeExtend({ source_uris: sourceUrisSchema })
    .strict();
export const agentReadinessDraftRelationSchema = agentReadinessSurfaceRelationSchema
    .safeExtend({ source_uris: sourceUrisSchema })
    .strict();
export const agentReadinessDraftOfferRelationSchema = agentReadinessOfferRelationProposalSchema
    .safeExtend({ source_uris: sourceUrisSchema })
    .strict();
export const agentReadinessDraftSurfaceExclusionSchema = agentReadinessSurfaceExclusionSchema
    .safeExtend({ source_uris: sourceUrisSchema })
    .strict();
/**
 * Transient command input. Its semantic fields are composed directly from the
 * canonical declaration schemas; only deterministic authoring boilerplate is
 * absent. This object is never a repository format or release record.
 */
export const agentReadinessDeclarationDraftRequestSchema = z
    .object({
    command_contract: z.literal("sourcey.agent-readiness-declaration-draft/v1alpha1"),
    subject: agentReadinessDraftSubjectSchema.optional(),
    scope: agentReadinessScopeSchema.optional(),
    scope_source_uris: z.array(catalogAuthoringUrlSchema).default([]),
    subject_roles: z.array(agentReadinessParticipantRoleSchema.exclude(["subject"])).default([]),
    assessment_targets: z.array(agentReadinessDraftAssessmentTargetSchema).default([]),
    participants: z.array(agentReadinessDraftParticipantSchema).default([]),
    resources: z.array(agentReadinessDraftResourceSchema).default([]),
    endpoints: z.array(agentReadinessDraftEndpointSchema).default([]),
    interfaces: z.array(agentReadinessDraftInterfaceSchema).default([]),
    relations: z.array(agentReadinessDraftRelationSchema).default([]),
    offer_relations: z.array(agentReadinessDraftOfferRelationSchema).default([]),
    surface_exclusions: z.array(agentReadinessDraftSurfaceExclusionSchema).default([]),
    authority_intent: z.enum(["entity", "community"]).optional(),
    declared_at: agentReadinessInstantSchema.optional(),
    base_authoring_file: z
        .object({
        path: agentReadinessAuthoringPathSchema,
        content: z.string().min(1),
        content_digest: agentReadinessDigestSchema,
    })
        .strict()
        .optional(),
})
    .strict();
export const agentReadinessDraftDiagnosticSchema = z
    .object({
    code: z.enum([
        "required",
        "invalid",
        "ambiguous_identity",
        "cross_entity_offer",
        "base_authoring_mismatch",
    ]),
    path: z.string().startsWith("/"),
    message: z.string().min(1).max(500),
})
    .strict();
const resolvedDraftFields = {
    base_release_id: agentReadinessDigestSchema,
    entity_id: agentReadinessEntityIdSchema,
    entity_revision_digest: agentReadinessDigestSchema,
};
export const agentReadinessDeclarationDraftResultSchema = z.discriminatedUnion("status", [
    z
        .object({
        status: z.literal("invalid"),
        diagnostics: z.array(agentReadinessDraftDiagnosticSchema).min(1),
    })
        .strict(),
    z
        .object({
        status: z.literal("identity_allocation_required"),
        diagnostics: z.array(agentReadinessDraftDiagnosticSchema).min(1),
    })
        .strict(),
    z
        .object({
        status: z.literal("incomplete"),
        ...resolvedDraftFields,
        diagnostics: z.array(agentReadinessDraftDiagnosticSchema).min(1),
    })
        .strict(),
    z
        .object({
        status: z.literal("conflict"),
        base_release_id: agentReadinessDigestSchema,
        entity_id: agentReadinessEntityIdSchema.optional(),
        entity_revision_digest: agentReadinessDigestSchema.optional(),
        diagnostics: z.array(agentReadinessDraftDiagnosticSchema).min(1),
    })
        .strict(),
    z
        .object({
        status: z.literal("materialized"),
        ...resolvedDraftFields,
        subject_display: z
            .object({
            slug: agentReadinessScopeKeySchema,
            name: z.string().trim().min(1).max(240),
        })
            .strict(),
        scope: agentReadinessScopeSchema,
        declaration_id: z.string().regex(/^[a-z0-9][a-z0-9_-]*$/),
        authoring_file: z
            .object({
            path: agentReadinessAuthoringPathSchema,
            content: z.string().min(1),
            content_digest: agentReadinessDigestSchema,
        })
            .strict(),
        /** Where the exact command is submitted: the one submission transport. */
        submission: z
            .object({
            method: z.literal("POST"),
            path: z.literal("/v1/submissions"),
            product: z.literal("agent_readiness"),
        })
            .strict(),
        diagnostics: z.array(agentReadinessDraftDiagnosticSchema).length(0),
    })
        .strict(),
]);
//# sourceMappingURL=declaration-acquisition.js.map