import { z } from "zod";
import { agentReadinessAuthoringPathSchema, agentReadinessDeclarationDraftRequestSchema, agentReadinessDeclarationDraftResultSchema, agentReadinessDraftDiagnosticSchema, } from "../../agent-readiness/src/index.js";
import { entityAssetSubmissionSchema, entityAssetUploadReceiptSchema, } from "../../assets/src/index.js";
import { catalogPublicationCurrentStateSchema, expectedPublicationEntitySchema, PUBLICATION_STAGES, publicationStageResultSchema, } from "../../publication/src/index.js";
import { apiEnvelope, digest, entityId, identifier, instant } from "./values.js";
export const submissionId = z.string().regex(/^sub_[a-f0-9]{64}$/);
export const CATALOG_SUBMISSION_STAGES = PUBLICATION_STAGES;
const submissionStage = z.enum(PUBLICATION_STAGES);
export const catalogSubmissionAuthoringFileSchema = z
    .object({
    path: z.string().regex(/^entities\/[a-z0-9]{2}\/[a-z0-9]+(?:-[a-z0-9]+)*\.ya?ml$/),
    content: z.string().min(1),
})
    .strict();
const catalogSubmissionAuthoritySchema = z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("authenticated_form") }).strict(),
    z
        .object({
        kind: z.literal("paid_agent"),
        request_id: z
            .string()
            .trim()
            .regex(/^[A-Za-z0-9_-]{32,128}$/u),
    })
        .strict(),
    z
        .object({
        kind: z.literal("governed_ops"),
        command_digest: digest,
        grant_digest: digest,
        approval_digest: digest.nullable(),
        run_receipt_digest: digest,
        admission_artifact_digests: z.array(digest).default([]),
    })
        .strict(),
]);
/**
 * Transport-safe authoring input. Catalog's canonical authoring schema remains
 * the sole semantic validator for each document; Cloud retains these exact
 * bytes and passes them to that validator without interpreting Entity, Program,
 * or Offer fields.
 */
const catalogRecordChangeShape = {
    authoring_files: z.array(catalogSubmissionAuthoringFileSchema).default([]),
    remove_entity_ids: z.array(entityId).default([]),
    asset_submissions: z.array(entityAssetSubmissionSchema).default([]),
    expected_current_entities: z.array(expectedPublicationEntitySchema).max(100).optional(),
};
function uniqueExpectedEntities(value, context) {
    const ids = value.expected_current_entities?.map(({ entity_id: entityId }) => entityId) ?? [];
    if (new Set(ids).size !== ids.length) {
        context.addIssue({
            code: "custom",
            path: ["expected_current_entities"],
            message: "Expected current Entity preconditions must be unique.",
        });
    }
}
function changesCatalogRecords(value) {
    return (value.authoring_files.length > 0 ||
        value.remove_entity_ids.length > 0 ||
        value.asset_submissions.length > 0);
}
const CATALOG_RECORD_CHANGE_REQUIRED = "A submission must contain authoring, an Entity removal, or an Entity asset.";
/** One Catalog record change: the existing Catalog proposal payload. */
const catalogRecordSubmissionPayloadSchema = z
    .object(catalogRecordChangeShape)
    .strict()
    .superRefine(uniqueExpectedEntities)
    .refine(changesCatalogRecords, CATALOG_RECORD_CHANGE_REQUIRED);
/** The Catalog record request Catalog processes: one change and the authority that sent it. */
export const catalogSubmissionRequestSchema = z
    .object({ ...catalogRecordChangeShape, authority: catalogSubmissionAuthoritySchema })
    .strict()
    .superRefine(uniqueExpectedEntities)
    .refine(changesCatalogRecords, CATALOG_RECORD_CHANGE_REQUIRED);
/**
 * One submission through the one transport, as a closed product union. The
 * envelope owns identity (the idempotency key and the authenticated
 * principal), origin (the authority) and status; each payload stays owned by
 * its Catalog contract.
 */
export const submissionRequestSchema = z.discriminatedUnion("product", [
    z
        .object({
        product: z.literal("catalog_record"),
        payload: catalogRecordSubmissionPayloadSchema,
        authority: catalogSubmissionAuthoritySchema,
    })
        .strict(),
    z
        .object({
        product: z.literal("agent_readiness"),
        payload: agentReadinessDeclarationDraftRequestSchema,
        authority: catalogSubmissionAuthoritySchema,
    })
        .strict(),
]);
const catalogSubmissionAuthorizationPolicySchema = z.enum(["proposal", "publication"]);
export const catalogSubmissionOperatorAdmissionCoreSchema = z
    .object({
    admission_contract: z.literal("sourcey.catalog-submission-operator-admission/v1alpha1"),
    submission_id: submissionId,
    payload_digest: digest,
    live_parent_release_id: digest,
    prior_work_item_digest: digest,
    reviewed_authoring_files: z.array(catalogSubmissionAuthoringFileSchema),
    reviewed_payload_digest: digest,
    admission_artifact_digests: z.array(digest).min(1),
    operator_id: z.string().trim().min(1),
    publication_authorization_digest: digest,
    attached_at: instant,
})
    .strict();
export const catalogSubmissionOperatorAdmissionSchema = catalogSubmissionOperatorAdmissionCoreSchema
    .extend({ operator_admission_digest: digest })
    .strict();
/**
 * Protected handoff from Cloud ingress custody to the Catalog application.
 * The public request bytes remain unchanged; Cloud adds only the exact
 * authentication, authorization-policy, parent, and idempotency bindings it
 * actually observed.
 */
export const catalogSubmissionWorkItemCoreSchema = z
    .object({
    submission_id: submissionId,
    idempotency_key: z.string().min(8).max(128),
    request: catalogSubmissionRequestSchema,
    payload_digest: digest,
    authentication_digest: digest,
    authorization_digest: digest,
    authorization_policy: catalogSubmissionAuthorizationPolicySchema,
    live_parent_release_id: digest,
    operator_admission: catalogSubmissionOperatorAdmissionSchema.nullable().default(null),
})
    .strict();
export const catalogSubmissionWorkItemSchema = catalogSubmissionWorkItemCoreSchema
    .extend({ work_item_digest: digest })
    .strict();
/** Mutable execution progress never rewrites the protected submission identity. */
const catalogSubmissionExecutionSchema = z
    .object({
    work_item: catalogSubmissionWorkItemSchema,
    publication_base: catalogPublicationCurrentStateSchema,
})
    .strict();
export const catalogSubmissionHeadersSchema = z.looseObject({
    "idempotency-key": z.string().min(8).max(128),
});
const catalogSubmissionStageResultSchema = publicationStageResultSchema;
const catalogSubmissionStateSchema = z.enum([
    "queued",
    "active",
    "awaiting_review",
    "awaiting_admission",
    "awaiting_authorization",
    "rejected",
    "invalidated",
    "published",
]);
const catalogSubmissionTelemetrySchema = z
    .object({
    queued_ms: z.number().int().nonnegative(),
    active_ms: z.number().int().nonnegative(),
    live_readback_ms: z.number().int().nonnegative().nullable(),
    closure_cardinality: z.number().int().nonnegative(),
    stages_invoked: z.array(submissionStage),
    cache_reuse: z
        .object({
        reused: z.number().int().nonnegative(),
        created: z.number().int().nonnegative(),
    })
        .strict(),
})
    .strict();
export const catalogSubmissionProcessingResultSchema = z.discriminatedUnion("state", [
    z
        .object({
        state: z.enum(["awaiting_review", "invalidated"]),
        proposal_digest: z.null(),
        change_set_digest: z.null(),
        live_parent_release_id: digest,
        publication_release_id: z.null(),
        stages: z.array(catalogSubmissionStageResultSchema),
        telemetry: catalogSubmissionTelemetrySchema.omit({ queued_ms: true }),
    })
        .strict(),
    z
        .object({
        state: z.enum(["awaiting_admission", "awaiting_authorization", "rejected", "published"]),
        proposal_digest: digest,
        change_set_digest: digest,
        live_parent_release_id: digest,
        publication_release_id: digest.nullable(),
        stages: z.array(catalogSubmissionStageResultSchema),
        telemetry: catalogSubmissionTelemetrySchema.omit({ queued_ms: true }),
    })
        .strict(),
]);
const submissionLinksSchema = z
    .object({ self: z.string().regex(/^\/v1\/submissions\/sub_[a-f0-9]{64}$/) })
    .strict();
const submissionIngressSchema = z.enum(["authenticated_form", "paid_agent", "governed_ops"]);
export const catalogSubmissionStatusSchema = z
    .object({
    submission_id: submissionId,
    product: z.literal("catalog_record"),
    links: submissionLinksSchema,
    state: catalogSubmissionStateSchema,
    ingress: submissionIngressSchema,
    payload_digest: digest,
    authentication_digest: digest,
    proposal_digest: digest.nullable(),
    change_set_digest: digest.nullable(),
    live_parent_release_id: digest,
    publication_release_id: digest.nullable(),
    stages: z.array(catalogSubmissionStageResultSchema),
    telemetry: catalogSubmissionTelemetrySchema,
    created_at: instant,
    updated_at: instant,
})
    .strict();
/**
 * A hosted Agent Readiness declaration: queued until the evidence worker
 * drafts it against the Entity's current authoring source, then admitted with
 * its exact hosted bytes or refused with the draft's diagnostics.
 */
const agentReadinessSubmissionStatusSchema = z
    .object({
    submission_id: submissionId,
    product: z.literal("agent_readiness"),
    links: submissionLinksSchema,
    state: z.enum(["queued", "admitted", "refused"]),
    ingress: submissionIngressSchema,
    payload_digest: digest,
    subject: z
        .object({ entity_id: entityId, declaration_ids: z.array(identifier).min(1) })
        .strict()
        .nullable(),
    authoring_blob_digest: digest.nullable(),
    diagnostics: z.array(agentReadinessDraftDiagnosticSchema),
    created_at: instant,
    updated_at: instant,
})
    .strict();
export const submissionStatusSchema = z.discriminatedUnion("product", [
    catalogSubmissionStatusSchema,
    agentReadinessSubmissionStatusSchema,
]);
export const submissionResponseSchema = apiEnvelope(submissionStatusSchema);
/** The exact authoring bytes a published profile cites for a hosted declaration. */
const agentReadinessDeclarationBytesSchema = z
    .object({
    blob_digest: digest,
    path: agentReadinessAuthoringPathSchema,
    content: z.string().min(1),
})
    .strict();
export const agentReadinessDeclarationBytesResponseSchema = apiEnvelope(agentReadinessDeclarationBytesSchema);
export const entityAssetUploadResponseSchema = apiEnvelope(entityAssetUploadReceiptSchema);
export const agentReadinessDeclarationDraftResponseSchema = apiEnvelope(agentReadinessDeclarationDraftResultSchema);
//# sourceMappingURL=submissions.js.map