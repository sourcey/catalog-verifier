import { z } from "zod";
import { AGENT_READINESS_PROFILE_ID_PATTERN, DIGEST_PATTERN, ENTITY_ID_PATTERN, IDENTIFIER_PATTERN, OFFER_ID_PATTERN, OPERATION_ID_PATTERN, PROGRAM_ID_PATTERN, SLUG_PATTERN, } from "../../../modules/primitives/src/index.js";
import { agentReadinessDeclarationDraftRequestSchema, agentReadinessDeclarationDraftResultSchema, agentReadinessDeclarationRevisionSchema, agentReadinessFreshnessSchema, agentReadinessGradeSchema, agentReadinessOfferRelationRevisionSchema, agentReadinessProfileSummarySchema, agentReadinessProjectionLineageSchema, agentReadinessProjectionSchema, agentReadinessPublicationVisibilitySchema, agentReadinessPublicStateSchema, agentReadinessRevisionHeadSchema, agentReadinessRevisionSchema, agentReadinessScopeKeySchema, } from "../../agent-readiness/src/index.js";
import { canonicalArtifactSchema, compiledEntitySchema, compiledOfferSchema, compiledPolicySchema, compiledProgramSchema, provenanceEntrySchema, } from "../../artifact/src/index.js";
import { assetBindingProjectionSchema, assetMediaTypeSchema, ENTITY_ICON_MAX_SOURCE_BYTES, entityAssetSubmissionSchema, entityAssetUploadHeadersSchema, entityAssetUploadReceiptSchema, } from "../../assets/src/index.js";
import { entityIdentityAssuranceSchema } from "../../assurance/src/index.js";
import { protectedSignatureSchema } from "../../authority/src/index.js";
import { commercialOrderIdSchema } from "../../billing/src/index.js";
import { catalogAdmissionConflictLookupRequestSchema, catalogVerifierIdentityContextPacketSchema, } from "../../catalog-verifier/src/index.js";
import { startupCreditsExistingRecordReviewPreparationRequestSchema, startupCreditsExistingRecordReviewPreparationResponseSchema, startupCreditsReviewProductDescriptor, startupCreditsReviewRequestIdSchema, startupCreditsReviewRequestSchema, startupCreditsReviewResponseSchema, } from "../../commercial-work/src/index.js";
import { agentReadinessDatasetSchema, companiesDatasetSchema, startupCreditsDatasetSchema, } from "../../datasets/src/index.js";
import { catalogEventPayloadSchemas, eventSubjectSchema } from "../../events/src/index.js";
import { captureReceiptSchema } from "../../evidence/src/index.js";
import { changeFeedPageSchema } from "../../feed/src/index.js";
import { observationSchema } from "../../observations/src/index.js";
import { catalogPublicationCurrentStateSchema, expectedPublicationEntitySchema, PUBLICATION_STAGES, publicationDiagnosticSchema, publicationStageResultSchema, } from "../../publication/src/index.js";
import { releaseDescriptorSchema, releaseResourceDigestsSchema } from "../../release/src/index.js";
import { eligibilityEvaluationSchema, eligibilityFactsSchema, entityRevisionSchema, lifecycleStatusSchema, offerRevisionSchema, programRevisionSchema, } from "../../revisions/src/index.js";
import { agentReadinessJsonCanonicalPath, companiesJsonCanonicalPath, startupCreditsJsonCanonicalPath, } from "../../routes/src/index.js";
import { catalogTaxonomySchema } from "../../taxonomy/src/index.js";
const digest = z.string().regex(DIGEST_PATTERN);
const nonEmpty = z.string().min(1);
const entityId = z.string().regex(ENTITY_ID_PATTERN);
const programId = z.string().regex(PROGRAM_ID_PATTERN);
const offerId = z.string().regex(OFFER_ID_PATTERN);
const agentReadinessProfileId = z.string().regex(AGENT_READINESS_PROFILE_ID_PATTERN);
const slug = z.string().regex(SLUG_PATTERN);
const identifier = z.string().regex(IDENTIFIER_PATTERN);
const operationId = z.string().regex(OPERATION_ID_PATTERN);
const instant = z.iso.datetime({ offset: true });
export const SOURCEY_PUBLIC_API_VERSION = "1.1.0";
/**
 * Sourcey's response-header budget leaves transport headroom beneath the
 * 16 KiB aggregate parser ceiling used by common HTTP clients. The x402
 * protocol permits larger envelopes; Sourcey's payable products do not.
 */
export const SOURCEY_X402_PAYMENT_REQUIRED_MAX_BYTES = 14 * 1_024;
export const catalogApiContractSchema = z.literal("sourcey.catalog-api/v1");
export const catalogSiteRecordContract = "sourcey.site-record/v1alpha1";
export const siteRecordEnvelopeSchema = z
    .object({
    contract: z.literal(catalogSiteRecordContract),
    release_id: digest,
    snapshot_id: digest,
    artifact_sha256: digest,
    data: z.unknown(),
})
    .strict();
export const catalogApiErrorCodeSchema = z.enum([
    "already_verified",
    "authentication_required",
    "capacity_unavailable",
    "capability_unavailable",
    "draft_changed",
    "draft_unavailable",
    "idempotency_conflict",
    "invalid_cursor",
    "invalid_credential",
    "invalid_credential_format",
    "invalid_request",
    "insufficient_scope",
    "internal_error",
    "method_not_allowed",
    "not_found",
    "payment_pending",
    "payment_refused",
    "product_unavailable",
    "rate_limited",
    "service_unavailable",
    "standing_stale",
]);
export const catalogApiErrorSchema = z
    .object({
    code: catalogApiErrorCodeSchema,
    message: z.string().min(1),
    capability: z.string().min(1).optional(),
})
    .strict();
export const catalogApiErrorResponseSchema = z
    .object({
    api_contract: catalogApiContractSchema,
    release_id: digest,
    artifact_sha256: digest,
    error: catalogApiErrorSchema,
})
    .strict();
export const catalogStatusResponseSchema = z
    .object({
    status: z.literal("ok"),
    service: z.literal("sourcey-serving-worker"),
    release_id: digest,
    snapshot_id: digest,
    artifact_sha256: digest,
})
    .strict();
export const catalogReleaseSummarySchema = z
    .object({
    release_contract: z.literal("sourcey.release-read/v1alpha1"),
    release_id: digest,
    release_sequence: z.number().int().positive(),
    snapshot_id: digest,
    parent_release_id: digest.nullable(),
    policy_as_of: z.iso.datetime({ offset: true }),
    artifact_sha256: digest,
    admitted_input_digests: z.array(digest).min(1),
    resource_digests: releaseResourceDigestsSchema,
    bundle: z
        .object({
        digest,
        archive_url: z.url({ protocol: /^https$/ }),
        verifier_digest: digest,
    })
        .strict(),
    publication: z
        .object({
        digest,
        published_at: instant,
    })
        .strict(),
})
    .strict();
const catalogReleaseReadObjectSchema = catalogReleaseSummarySchema
    .extend({ descriptor: releaseDescriptorSchema })
    .strict();
export const catalogReleaseReadSchema = catalogReleaseReadObjectSchema.superRefine((value, context) => {
    if (value.release_id !== value.descriptor.release_id ||
        value.release_sequence !== value.descriptor.release_core.release_sequence ||
        value.snapshot_id !== value.descriptor.snapshot_id ||
        value.parent_release_id !== value.descriptor.release_core.parent_release_id ||
        value.policy_as_of !== value.descriptor.snapshot_core.policy_as_of) {
        context.addIssue({
            code: "custom",
            path: ["descriptor"],
            message: "Release summary differs from its canonical descriptor.",
        });
    }
});
export const catalogReleaseCursorSchema = catalogReleaseSummarySchema
    .pick({
    release_id: true,
    admitted_input_digests: true,
})
    .strip();
export const eligibilityCheckInputSchema = z
    .object({
    offer_id: offerId,
    facts: eligibilityFactsSchema,
})
    .strict();
function apiEnvelope(data) {
    return z
        .object({
        api_contract: catalogApiContractSchema,
        release_id: digest,
        artifact_sha256: digest,
        data,
    })
        .strict();
}
export const catalogVerifierIdentityContextResponseSchema = apiEnvelope(catalogVerifierIdentityContextPacketSchema);
function pagedApiEnvelope(data) {
    return apiEnvelope(z.array(data)).extend({
        next_cursor: z.string().min(1).nullable().optional(),
    });
}
const entityAssetBindingsSchema = z.array(assetBindingProjectionSchema).default([]);
export const catalogResponseSchema = apiEnvelope(canonicalArtifactSchema);
export const catalogTaxonomyResponseSchema = apiEnvelope(catalogTaxonomySchema);
export const catalogEntityListSummarySchema = z
    .object({
    entity_count: z.number().int().nonnegative(),
    program_count: z.number().int().nonnegative(),
    offer_count: z.number().int().nonnegative(),
    active_offer_count: z.number().int().nonnegative(),
    vendor_confirmed_entity_count: z.number().int().nonnegative(),
    verified_entity_count: z.number().int().nonnegative(),
    terms_checked_offer_count: z.number().int().nonnegative(),
    latest_observation_at: instant.nullable(),
    categories: z.array(z
        .object({
        category: slug,
        entity_count: z.number().int().nonnegative(),
        program_count: z.number().int().nonnegative(),
        offer_count: z.number().int().nonnegative(),
        active_offer_count: z.number().int().nonnegative(),
    })
        .strict()),
})
    .strict();
export const entityListResponseSchema = pagedApiEnvelope(compiledEntitySchema).extend({
    query: z.string(),
    category: slug.nullable(),
    summary: catalogEntityListSummarySchema,
    assets: entityAssetBindingsSchema,
});
export const entityTombstoneSchema = z.discriminatedUnion("transition", [
    z
        .object({
        kind: z.literal("entity_tombstone"),
        entity_id: entityId,
        transition: z.literal("merged"),
        canonical_entity_id: entityId,
        event_id: digest,
    })
        .strict(),
    z
        .object({
        kind: z.literal("entity_tombstone"),
        entity_id: entityId,
        transition: z.literal("successor"),
        canonical_entity_id: entityId,
        event_id: digest,
    })
        .strict(),
    z
        .object({
        kind: z.literal("entity_tombstone"),
        entity_id: entityId,
        transition: z.literal("split"),
        replacement_entity_ids: z.array(entityId).min(1),
        continuing_entity_id: entityId.optional(),
        event_id: digest,
    })
        .strict(),
    z
        .object({
        kind: z.literal("entity_tombstone"),
        entity_id: entityId,
        transition: z.literal("retired"),
    })
        .strict(),
]);
export const offerTombstoneSchema = z.discriminatedUnion("transition", [
    z
        .object({
        kind: z.literal("offer_tombstone"),
        offer_id: z.string().regex(OFFER_ID_PATTERN),
        transition: z.literal("merged"),
        canonical_offer_id: z.string().regex(OFFER_ID_PATTERN),
        event_id: digest,
    })
        .strict(),
    z
        .object({
        kind: z.literal("offer_tombstone"),
        offer_id: z.string().regex(OFFER_ID_PATTERN),
        transition: z.literal("retired"),
    })
        .strict(),
]);
export const programTombstoneSchema = z.discriminatedUnion("transition", [
    z
        .object({
        kind: z.literal("program_tombstone"),
        program_id: programId,
        transition: z.literal("merged"),
        canonical_program_id: programId,
        event_id: digest,
    })
        .strict(),
    z
        .object({
        kind: z.literal("program_tombstone"),
        program_id: programId,
        transition: z.literal("retired"),
    })
        .strict(),
]);
export const agentReadinessProfileTombstoneSchema = z.discriminatedUnion("transition", [
    z
        .object({
        kind: z.literal("agent_readiness_profile_tombstone"),
        agent_readiness_profile_id: agentReadinessProfileId,
        transition: z.literal("merged"),
        canonical_agent_readiness_profile_id: agentReadinessProfileId,
        event_id: digest,
    })
        .strict(),
    z
        .object({
        kind: z.literal("agent_readiness_profile_tombstone"),
        agent_readiness_profile_id: agentReadinessProfileId,
        transition: z.literal("retired"),
    })
        .strict(),
]);
export const entityResponseSchema = apiEnvelope(z.union([compiledEntitySchema, entityTombstoneSchema])).extend({ assets: entityAssetBindingsSchema });
export const entityAssetListResponseSchema = pagedApiEnvelope(assetBindingProjectionSchema).extend({
    entity_id: entityId.nullable(),
});
export const policyResponseSchema = apiEnvelope(compiledPolicySchema);
export const policyListResponseSchema = pagedApiEnvelope(compiledPolicySchema).required({
    next_cursor: true,
});
export const programResponseSchema = apiEnvelope(z.union([
    z.object({ entity: compiledEntitySchema, program: compiledProgramSchema }).strict(),
    programTombstoneSchema,
]));
export const offerResponseSchema = apiEnvelope(z.union([
    z
        .object({
        entity: compiledEntitySchema,
        program: compiledProgramSchema.optional(),
        offer: compiledOfferSchema,
    })
        .strict(),
    offerTombstoneSchema,
]));
const offerSearchResultBaseSchema = z
    .object({
    entity_id: entityId,
    entity_slug: slug,
    entity_name: nonEmpty,
    category: slug,
    identity_assurance: entityIdentityAssuranceSchema.optional(),
    offer: compiledOfferSchema,
    canonical_url: z.url(),
})
    .strict();
export const offerSearchResultSchema = z.union([
    offerSearchResultBaseSchema.extend({
        program_id: programId,
        program_slug: slug,
        program_title: nonEmpty,
    }),
    offerSearchResultBaseSchema,
]);
export const searchEntitiesResponseSchema = apiEnvelope(z.array(compiledEntitySchema)).extend({
    query: z.string(),
    next_cursor: z.string().min(1).nullable(),
});
export const searchOffersResponseSchema = apiEnvelope(z.array(offerSearchResultSchema)).extend({
    query: z.string(),
    next_cursor: z.string().min(1).nullable(),
});
export const entityAgentReadinessProfilesResponseSchema = apiEnvelope(z.array(agentReadinessProjectionSchema)).extend({
    entity_id: entityId,
});
export const agentReadinessProfileResponseSchema = apiEnvelope(z.union([agentReadinessProjectionSchema, agentReadinessProfileTombstoneSchema]));
export const agentReadinessProjectionLineageResponseSchema = apiEnvelope(z.union([agentReadinessProjectionLineageSchema, agentReadinessProfileTombstoneSchema]));
export const agentReadinessProjectionLineageListResponseSchema = apiEnvelope(z.array(agentReadinessProjectionLineageSchema)).extend({
    query: z.string(),
    next_cursor: z.string().min(1).nullable(),
});
export const entityAgentReadinessProjectionLineageResponseSchema = apiEnvelope(z.array(agentReadinessProjectionLineageSchema)).extend({ entity_id: entityId });
export const agentReadinessProfileListResponseSchema = apiEnvelope(z.array(agentReadinessProfileSummarySchema)).extend({
    query: z.string(),
    next_cursor: z.string().min(1).nullable(),
});
export const agentReadinessOfferRelationResponseSchema = apiEnvelope(agentReadinessOfferRelationRevisionSchema);
export const agentReadinessOfferRelationListResponseSchema = apiEnvelope(z.array(agentReadinessOfferRelationRevisionSchema)).extend({
    next_cursor: z.string().min(1).nullable(),
});
export const offerAgentReadinessProfilesResponseSchema = apiEnvelope(z.array(z
    .object({
    relation: agentReadinessOfferRelationRevisionSchema,
    profile: agentReadinessProjectionSchema,
})
    .strict()
    .superRefine((value, context) => {
    if (value.relation.agent_readiness_profile_id !== value.profile.agent_readiness_profile_id) {
        context.addIssue({
            code: "custom",
            message: "Offer readiness relation does not bind its exact profile projection.",
        });
    }
})))
    .extend({ offer_id: offerId })
    .superRefine((value, context) => {
    if (value.data.some((item) => item.relation.offer_id !== value.offer_id)) {
        context.addIssue({
            code: "custom",
            path: ["data"],
            message: "Offer readiness response contains a relation for another Offer.",
        });
    }
});
export const eligibilityResponseSchema = apiEnvelope(z
    .object({
    entity_id: entityId,
    program_id: programId,
    offer_id: offerId,
    revision_digest: digest,
    lifecycle: lifecycleStatusSchema,
    evaluation: eligibilityEvaluationSchema,
})
    .strict());
export const provenanceResponseSchema = apiEnvelope(provenanceEntrySchema);
export const revisionResponseSchema = apiEnvelope(z.union([
    entityRevisionSchema,
    programRevisionSchema,
    offerRevisionSchema,
    agentReadinessRevisionSchema,
    agentReadinessDeclarationRevisionSchema,
]));
const publicCatalogEventVariants = Object.entries(catalogEventPayloadSchemas).map(([kind, payload]) => z
    .object({
    event_contract: z.literal("sourcey.catalog-event/v1alpha1"),
    kind: z.literal(kind),
    issuer_id: identifier,
    operation_id: operationId,
    subject: eventSubjectSchema,
    occurred_at: instant,
    payload,
    event_id: digest,
    protected: protectedSignatureSchema,
})
    .strict());
export const publicCatalogEventSchema = z.union(publicCatalogEventVariants);
export const eventResponseSchema = apiEnvelope(publicCatalogEventSchema);
export const eventListResponseSchema = pagedApiEnvelope(publicCatalogEventSchema);
export const captureReceiptResponseSchema = apiEnvelope(captureReceiptSchema);
export const captureReceiptListResponseSchema = pagedApiEnvelope(captureReceiptSchema);
export const publicObservationSchema = observationSchema;
export const observationResponseSchema = apiEnvelope(publicObservationSchema);
const closureItems = (item) => z.array(item).max(1_000).default([]);
const closureQueryItems = (item) => z.array(item).default([]);
const catalogClosureFields = (items) => ({
    entity_ids: items(entityId),
    domains: items(z.string().min(1).max(253)),
    program_ids: items(programId),
    offer_ids: items(offerId),
    agent_readiness_profile_ids: items(agentReadinessProfileId),
    revision_digests: items(digest),
    event_ids: items(digest),
    event_operation_ids: items(operationId),
    observation_ids: items(digest),
    capture_receipt_digests: items(digest),
    capture_operation_ids: items(operationId),
});
const nonEmptyCatalogClosureQuery = (schema) => schema.refine((value) => Object.values(value).some((items) => Array.isArray(items) && items.length > 0), {
    message: "A catalog closure query must name at least one immutable object or current subject.",
});
/** Client-side semantic query; transport adapters partition it into bounded requests. */
export const catalogClosureQuerySchema = nonEmptyCatalogClosureQuery(z.object(catalogClosureFields(closureQueryItems)).strict());
export const catalogClosureRequestSchema = nonEmptyCatalogClosureQuery(z.object(catalogClosureFields(closureItems)).strict());
const catalogClosureRevisionSchema = z.union([
    entityRevisionSchema,
    programRevisionSchema,
    offerRevisionSchema,
    agentReadinessRevisionHeadSchema,
]);
export const catalogClosureResponseSchema = apiEnvelope(z
    .object({
    resource_digests: releaseResourceDigestsSchema,
    current_revision_digests: z.array(digest),
    revisions: z.array(z
        .object({
        revision_digest: digest,
        revision: catalogClosureRevisionSchema,
    })
        .strict()),
    events: z.array(publicCatalogEventSchema),
    observations: z.array(publicObservationSchema),
    capture_receipts: z.array(captureReceiptSchema),
})
    .strict());
/**
 * Canonical root-level downloads over the current Catalog release.
 *
 * These belong to the public HTTP contract even though they are not members of
 * the versioned resource API. Hosted transports must import this registry
 * rather than restating paths, operation names, or response schemas.
 */
export const publicDatasetEndpointByDataset = {
    companies: {
        operationId: "getCompaniesDataset",
        method: "GET",
        path: companiesJsonCanonicalPath(),
        summary: "Download the current company records dataset.",
        tags: ["Datasets"],
        responses: { 200: companiesDatasetSchema },
    },
    startupCredits: {
        operationId: "getStartupCreditsDataset",
        method: "GET",
        path: startupCreditsJsonCanonicalPath(),
        summary: "Download the current startup credits dataset.",
        tags: ["Datasets"],
        responses: { 200: startupCreditsDatasetSchema },
    },
    agentReadiness: {
        operationId: "getAgentReadinessDataset",
        method: "GET",
        path: agentReadinessJsonCanonicalPath(),
        summary: "Download the current Agent Readiness dataset.",
        tags: ["Datasets"],
        responses: { 200: agentReadinessDatasetSchema },
    },
};
export const publicDatasetEndpoints = [
    publicDatasetEndpointByDataset.companies,
    publicDatasetEndpointByDataset.startupCredits,
    publicDatasetEndpointByDataset.agentReadiness,
];
const idPath = z.object({ id: nonEmpty }).strict();
const releaseIdPath = z.object({ release_id: digest }).strict();
const entityIdPath = z.object({ entity: entityId }).strict();
const entitySlugPath = z.object({ entity: slug }).strict();
const entityProgramPath = z.object({ entity: slug, program: slug }).strict();
const entityOfferPath = z.object({ entity: slug, offer: slug }).strict();
const entityAgentReadinessScopePath = z
    .object({
    entity: entityId,
    product: agentReadinessScopeKeySchema,
    funnel: agentReadinessScopeKeySchema,
})
    .strict();
const pageQuery = z
    .object({
    cursor: z.string().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(20),
})
    .strict();
const query = pageQuery.extend({ q: z.string().max(256).default("") });
const entityListQuery = z
    .object({
    q: z.string().max(256).default(""),
    category: slug.optional(),
    cursor: z.string().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).optional(),
    domain: z.string().min(1).max(253).optional(),
})
    .strict();
const entityAssetListQuery = z
    .object({
    entity_id: entityId.optional(),
    cursor: z.string().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(100),
})
    .strict();
export const agentReadinessProfileListQuerySchema = z
    .object({
    q: z.string().max(256).default(""),
    entity_id: entityId.optional(),
    offer_id: offerId.optional(),
    product_key: agentReadinessScopeKeySchema.optional(),
    funnel_key: agentReadinessScopeKeySchema.optional(),
    grade: agentReadinessGradeSchema.optional(),
    public_state: agentReadinessPublicStateSchema.optional(),
    visibility: agentReadinessPublicationVisibilitySchema.exclude(["private"]).optional().meta({
        description: "Publication visibility. Defaults to discoverable. Select resolvable_only to enumerate public records retained outside discovery, including stale report cards. Private candidates are never returned.",
    }),
    lifecycle: lifecycleStatusSchema.optional(),
    freshness: agentReadinessFreshnessSchema.optional(),
    cursor: z.string().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(20),
})
    .strict();
export const agentReadinessOfferRelationListQuerySchema = z
    .object({
    agent_readiness_profile_id: agentReadinessProfileId.optional(),
    offer_id: offerId.optional(),
    cursor: z.string().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(20),
})
    .strict();
const eventListQuery = z
    .object({
    operation_id: operationId.optional(),
    entity_id: entityId.optional(),
    revision_digest: digest.optional(),
    cursor: z.string().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).optional(),
})
    .strict()
    .refine((value) => value.operation_id !== undefined ||
    value.entity_id !== undefined ||
    value.revision_digest !== undefined, { message: "An exact operation_id, entity_id or revision_digest filter is required." });
const operationLookupQuery = z
    .object({
    operation_id: operationId,
    cursor: z.string().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).optional(),
})
    .strict();
const commonErrors = {
    400: catalogApiErrorResponseSchema,
    404: catalogApiErrorResponseSchema,
};
const submissionId = z.string().regex(/^sub_[a-f0-9]{64}$/);
export const CATALOG_SUBMISSION_STAGES = PUBLICATION_STAGES;
const submissionStage = z.enum(PUBLICATION_STAGES);
export const catalogSubmissionAuthoringFileSchema = z
    .object({
    path: z.string().regex(/^entities\/[a-z0-9]{2}\/[a-z0-9]+(?:-[a-z0-9]+)*\.ya?ml$/),
    content: z.string().min(1),
})
    .strict();
export const catalogSubmissionAuthoritySchema = z.discriminatedUnion("kind", [
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
export const catalogSubmissionRequestSchema = z
    .object({
    authoring_files: z.array(catalogSubmissionAuthoringFileSchema).default([]),
    remove_entity_ids: z.array(entityId).default([]),
    asset_submissions: z.array(entityAssetSubmissionSchema).default([]),
    expected_current_entities: z.array(expectedPublicationEntitySchema).max(100).optional(),
    authority: catalogSubmissionAuthoritySchema,
})
    .strict()
    .superRefine((value, context) => {
    const ids = value.expected_current_entities?.map(({ entity_id: entityId }) => entityId) ?? [];
    if (new Set(ids).size !== ids.length) {
        context.addIssue({
            code: "custom",
            path: ["expected_current_entities"],
            message: "Expected current Entity preconditions must be unique.",
        });
    }
})
    .refine((value) => value.authoring_files.length > 0 ||
    value.remove_entity_ids.length > 0 ||
    value.asset_submissions.length > 0, "A submission must contain authoring, an Entity removal, or an Entity asset.");
export const catalogSubmissionAuthorizationPolicySchema = z.enum(["proposal", "publication"]);
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
export const catalogSubmissionExecutionSchema = z
    .object({
    work_item: catalogSubmissionWorkItemSchema,
    publication_base: catalogPublicationCurrentStateSchema,
})
    .strict();
export const catalogSubmissionHeadersSchema = z.looseObject({
    "idempotency-key": z.string().min(8).max(128),
});
export const catalogSubmissionDiagnosticSchema = publicationDiagnosticSchema;
export const catalogSubmissionStageResultSchema = publicationStageResultSchema;
export const catalogSubmissionStateSchema = z.enum([
    "queued",
    "active",
    "awaiting_review",
    "awaiting_admission",
    "awaiting_authorization",
    "rejected",
    "invalidated",
    "published",
]);
export const catalogSubmissionTelemetrySchema = z
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
export const catalogSubmissionStatusSchema = z
    .object({
    submission_id: submissionId,
    state: catalogSubmissionStateSchema,
    ingress: z.enum(["authenticated_form", "paid_agent", "governed_ops"]),
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
export const catalogSubmissionResponseSchema = apiEnvelope(catalogSubmissionStatusSchema);
export const entityAssetUploadResponseSchema = apiEnvelope(entityAssetUploadReceiptSchema);
export const agentReadinessDeclarationDraftResponseSchema = apiEnvelope(agentReadinessDeclarationDraftResultSchema);
const submissionIdPath = z.object({ submission_id: submissionId }).strict();
/**
 * The complete public Sourcey HTTP API surface for major version 1.
 *
 * Hosted account, claim, operator, and provider routes are intentionally owned
 * by Cloud capability contracts and must never be appended to this registry.
 */
export const publicCatalogV1Endpoints = [
    {
        operationId: "getCatalogStatus",
        method: "GET",
        path: "/v1/status",
        summary: "Read serving status and the exact catalog release pin.",
        tags: ["Catalog"],
        responses: { 200: catalogStatusResponseSchema },
    },
    {
        operationId: "getCatalogRelease",
        method: "GET",
        path: "/v1/release",
        summary: "Read the immutable catalog release descriptor.",
        tags: ["Catalog"],
        responses: { 200: catalogReleaseReadSchema },
    },
    {
        operationId: "getCatalogReleaseById",
        method: "GET",
        path: "/v1/releases/{release_id}",
        summary: "Read an immutable retained catalog release.",
        tags: ["Catalog"],
        request: { path: releaseIdPath },
        responses: { 200: catalogReleaseSummarySchema, ...commonErrors },
    },
    {
        operationId: "getCatalog",
        method: "GET",
        path: "/v1/catalog",
        summary: "Read the complete canonical catalog artifact.",
        tags: ["Catalog"],
        responses: { 200: catalogResponseSchema },
    },
    {
        operationId: "getCatalogTaxonomy",
        method: "GET",
        path: "/v1/taxonomy",
        summary: "Read the exact current Catalog taxonomy.",
        tags: ["Catalog"],
        responses: { 200: catalogTaxonomyResponseSchema },
    },
    {
        operationId: "listEntities",
        method: "GET",
        path: "/v1/entities",
        summary: "List catalog entities.",
        tags: ["Catalog"],
        request: { query: entityListQuery },
        responses: { 200: entityListResponseSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "listPolicies",
        method: "GET",
        path: "/v1/policies",
        summary: "List current Sourcey policy records, with their exact text and revision digests.",
        tags: ["Catalog"],
        request: { query: pageQuery },
        responses: { 200: policyListResponseSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "getPolicy",
        method: "GET",
        path: "/v1/policies/{slug}",
        summary: "Read one current Sourcey policy record by slug.",
        tags: ["Catalog"],
        request: { path: z.object({ slug }).strict() },
        responses: { 200: policyResponseSchema, ...commonErrors },
    },
    {
        operationId: "getEntity",
        method: "GET",
        path: "/v1/entities/{entity}",
        summary: "Read an entity by immutable ID.",
        tags: ["Catalog"],
        request: { path: entityIdPath },
        responses: { 200: entityResponseSchema, ...commonErrors },
    },
    {
        operationId: "getEntityBySlug",
        method: "GET",
        path: "/v1/entities/by-slug/{entity}",
        summary: "Read an entity through its current or historical slug.",
        tags: ["Catalog"],
        request: { path: entitySlugPath },
        responses: { 200: entityResponseSchema, ...commonErrors },
    },
    {
        operationId: "listEntityAssets",
        method: "GET",
        path: "/v1/entity-assets",
        summary: "List exact current Entity icon bindings and immutable derivative paths.",
        tags: ["Catalog"],
        request: { query: entityAssetListQuery },
        responses: { 200: entityAssetListResponseSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "listEntityAgentReadinessProfiles",
        method: "GET",
        path: "/v1/entities/{entity}/agent-readiness-profiles",
        summary: "List published agent readiness profiles for an entity.",
        tags: ["Catalog"],
        request: { path: entityIdPath },
        responses: { 200: entityAgentReadinessProfilesResponseSchema, ...commonErrors },
    },
    {
        operationId: "getEntityAgentReadinessProfile",
        method: "GET",
        path: "/v1/entities/{entity}/agent-readiness-profiles/{product}/{funnel}",
        summary: "Resolve a published agent readiness profile by immutable entity and exact scope keys.",
        tags: ["Catalog"],
        request: { path: entityAgentReadinessScopePath },
        responses: { 200: agentReadinessProfileResponseSchema, ...commonErrors },
    },
    {
        operationId: "getProgram",
        method: "GET",
        path: "/v1/programs/{id}",
        summary: "Read a program by immutable ID.",
        tags: ["Catalog"],
        request: { path: idPath },
        responses: { 200: programResponseSchema, ...commonErrors },
    },
    {
        operationId: "getProgramBySlug",
        method: "GET",
        path: "/v1/programs/{entity}/{program}",
        summary: "Read a program by entity and program slug.",
        tags: ["Catalog"],
        request: { path: entityProgramPath },
        responses: { 200: programResponseSchema, ...commonErrors },
    },
    {
        operationId: "getOffer",
        method: "GET",
        path: "/v1/offers/{id}",
        summary: "Read an offer by immutable ID.",
        tags: ["Catalog"],
        request: { path: idPath },
        responses: { 200: offerResponseSchema, ...commonErrors },
    },
    {
        operationId: "getOfferBySlug",
        method: "GET",
        path: "/v1/offers/{entity}/{offer}",
        summary: "Read an offer by entity and offer slug.",
        tags: ["Catalog"],
        request: { path: entityOfferPath },
        responses: { 200: offerResponseSchema, ...commonErrors },
    },
    {
        operationId: "searchCatalog",
        method: "GET",
        path: "/v1/search",
        summary: "Search the catalog.",
        tags: ["Catalog"],
        request: { query },
        responses: { 200: searchEntitiesResponseSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "searchOffers",
        method: "GET",
        path: "/v1/search/offers",
        summary: "Search offers through the catalog index.",
        tags: ["Catalog"],
        request: { query },
        responses: { 200: searchOffersResponseSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "checkEligibility",
        method: "POST",
        path: "/v1/eligibility/check",
        summary: "Evaluate structured eligibility by immutable offer ID.",
        tags: ["Catalog"],
        request: { body: eligibilityCheckInputSchema },
        responses: {
            200: eligibilityResponseSchema,
            ...commonErrors,
        },
    },
    {
        operationId: "getProvenance",
        method: "GET",
        path: "/v1/provenance/{id}",
        summary: "Read the closed provenance graph for a revision.",
        tags: ["Catalog"],
        request: { path: idPath },
        responses: { 200: provenanceResponseSchema, ...commonErrors },
    },
    {
        operationId: "getRevisionProvenance",
        method: "GET",
        path: "/v1/revisions/{id}/provenance",
        summary: "Read provenance through a revision-scoped route.",
        tags: ["Catalog"],
        request: { path: idPath },
        responses: { 200: provenanceResponseSchema, ...commonErrors },
    },
    {
        operationId: "getRevision",
        method: "GET",
        path: "/v1/revisions/{id}",
        summary: "Read an immutable entity, program, offer, or agent readiness revision.",
        tags: ["Catalog"],
        request: { path: idPath },
        responses: { 200: revisionResponseSchema, ...commonErrors },
    },
    {
        operationId: "listEvents",
        method: "GET",
        path: "/v1/events",
        summary: "Find catalog events by exact operation, company or revision identity.",
        tags: ["Catalog"],
        request: { query: eventListQuery },
        responses: { 200: eventListResponseSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "getEvent",
        method: "GET",
        path: "/v1/events/{id}",
        summary: "Read an immutable catalog event.",
        tags: ["Catalog"],
        request: { path: idPath },
        responses: { 200: eventResponseSchema, ...commonErrors },
    },
    {
        operationId: "listCaptureReceipts",
        method: "GET",
        path: "/v1/capture-receipts",
        summary: "Find capture receipts by exact operation identity.",
        tags: ["Catalog"],
        request: { query: operationLookupQuery },
        responses: {
            200: captureReceiptListResponseSchema,
            400: catalogApiErrorResponseSchema,
        },
    },
    {
        operationId: "getCaptureReceipt",
        method: "GET",
        path: "/v1/capture-receipts/{id}",
        summary: "Read an immutable evidence capture receipt.",
        tags: ["Catalog"],
        request: { path: idPath },
        responses: { 200: captureReceiptResponseSchema, ...commonErrors },
    },
    {
        operationId: "getObservation",
        method: "GET",
        path: "/v1/observations/{id}",
        summary: "Read an immutable source observation.",
        tags: ["Catalog"],
        request: { path: idPath },
        responses: { 200: observationResponseSchema, ...commonErrors },
    },
    {
        operationId: "resolveCatalogClosure",
        method: "POST",
        path: "/v1/catalog/closure",
        summary: "Resolve the existing catalog objects relevant to a bounded mutation.",
        tags: ["Catalog"],
        request: { body: catalogClosureRequestSchema },
        responses: { 200: catalogClosureResponseSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "getChanges",
        method: "GET",
        path: "/v1/changes",
        summary: "Read deterministic release changes using a signed cursor.",
        tags: ["Catalog"],
        request: {
            query: z.object({ cursor: z.string().min(1).optional() }).strict(),
        },
        responses: { 200: changeFeedPageSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "listAgentReadinessProfiles",
        method: "GET",
        path: "/v1/agent-readiness-profiles",
        summary: "Search and filter published agent readiness profiles.",
        tags: ["Catalog"],
        request: { query: agentReadinessProfileListQuerySchema },
        responses: { 200: agentReadinessProfileListResponseSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "getAgentReadinessProfile",
        method: "GET",
        path: "/v1/agent-readiness-profiles/{id}",
        summary: "Read a published agent readiness profile by immutable ID.",
        tags: ["Catalog"],
        request: { path: z.object({ id: agentReadinessProfileId }).strict() },
        responses: {
            200: agentReadinessProfileResponseSchema,
            ...commonErrors,
        },
    },
    {
        operationId: "listAgentReadinessOfferRelations",
        method: "GET",
        path: "/v1/agent-readiness-offer-relations",
        summary: "List exact released relations between agent readiness profiles and Offers.",
        tags: ["Catalog"],
        request: { query: agentReadinessOfferRelationListQuerySchema },
        responses: {
            200: agentReadinessOfferRelationListResponseSchema,
            400: catalogApiErrorResponseSchema,
        },
    },
    {
        operationId: "getAgentReadinessOfferRelation",
        method: "GET",
        path: "/v1/agent-readiness-offer-relations/{id}",
        summary: "Read an exact released Agent Readiness Offer relation by immutable identity.",
        tags: ["Catalog"],
        request: { path: z.object({ id: identifier }).strict() },
        responses: { 200: agentReadinessOfferRelationResponseSchema, ...commonErrors },
    },
    {
        operationId: "listOfferAgentReadinessProfiles",
        method: "GET",
        path: "/v1/agent-readiness-profiles/by-offer/{offer}",
        summary: "List published Agent Readiness profiles through exact released Offer relations.",
        tags: ["Catalog"],
        request: { path: z.object({ offer: offerId }).strict() },
        responses: { 200: offerAgentReadinessProfilesResponseSchema, ...commonErrors },
    },
];
/** Hosted mutation operations share the v1 OpenAPI authority but are not read-runtime routes. */
export const catalogSubmissionV1Endpoints = [
    {
        operationId: "uploadEntityAsset",
        method: "POST",
        path: "/v1/submission-asset-uploads",
        summary: "Retain exact authenticated company-icon bytes and return a digest-bound upload receipt for a Catalog submission.",
        tags: ["Catalog"],
        auth: "cookie_or_bearer",
        request: {
            headers: entityAssetUploadHeadersSchema,
            binary_body: {
                media_types: assetMediaTypeSchema.options,
                maximum_bytes: ENTITY_ICON_MAX_SOURCE_BYTES,
            },
        },
        responses: {
            201: entityAssetUploadResponseSchema,
            400: catalogApiErrorResponseSchema,
            401: catalogApiErrorResponseSchema,
            403: catalogApiErrorResponseSchema,
            409: catalogApiErrorResponseSchema,
        },
    },
    {
        operationId: "createCatalogSubmission",
        method: "POST",
        path: "/v1/submissions",
        summary: "Submit exact Catalog authoring bytes through an authenticated ingress.",
        tags: ["Catalog"],
        auth: "cookie_or_bearer",
        request: {
            headers: catalogSubmissionHeadersSchema,
            body: catalogSubmissionRequestSchema,
        },
        responses: {
            202: catalogSubmissionResponseSchema,
            400: catalogApiErrorResponseSchema,
            401: catalogApiErrorResponseSchema,
            403: catalogApiErrorResponseSchema,
            409: catalogApiErrorResponseSchema,
        },
    },
    {
        operationId: "getCatalogSubmission",
        method: "GET",
        path: "/v1/submissions/{submission_id}",
        summary: "Read aggregate validation, admission, and publication state for a submission.",
        tags: ["Catalog"],
        auth: "cookie_or_bearer",
        request: { path: submissionIdPath },
        responses: {
            200: catalogSubmissionResponseSchema,
            400: catalogApiErrorResponseSchema,
            401: catalogApiErrorResponseSchema,
            403: catalogApiErrorResponseSchema,
            404: catalogApiErrorResponseSchema,
        },
    },
];
/** Pure public authoring command; Cloud hosts transport, not semantics or admission. */
export const agentReadinessDeclarationDraftV1Endpoints = [
    {
        operationId: "prepareAgentReadinessDeclaration",
        method: "POST",
        path: "/v1/agent-readiness/declaration-drafts",
        summary: "Prepare canonical Agent Readiness vendor, service, API, authentication, payment, provisioning, operation, recovery, and agent-standard declaration YAML for a GitHub pull request.",
        tags: ["Catalog"],
        request: { body: agentReadinessDeclarationDraftRequestSchema },
        responses: {
            200: agentReadinessDeclarationDraftResponseSchema,
            400: catalogApiErrorResponseSchema,
            401: catalogApiErrorResponseSchema,
            403: catalogApiErrorResponseSchema,
        },
    },
];
/** Signed bounded identity projection; Cloud owns transport and signing custody. */
export const catalogVerifierV1Endpoints = [
    {
        operationId: "createCatalogVerifierIdentityContext",
        method: "POST",
        path: "/v1/catalog-verifier/identity-contexts",
        summary: "Issue a bounded signed live-Catalog identity context for an exact verifier query.",
        tags: ["Catalog"],
        request: { body: catalogAdmissionConflictLookupRequestSchema },
        responses: {
            200: catalogVerifierIdentityContextResponseSchema,
            400: catalogApiErrorResponseSchema,
            405: catalogApiErrorResponseSchema,
            409: catalogApiErrorResponseSchema,
            429: catalogApiErrorResponseSchema,
            503: catalogApiErrorResponseSchema,
        },
    },
];
/** One product-semantic commercial operation; payment never changes Catalog authority. */
export const startupCreditsReviewV1Endpoints = [
    {
        operationId: "prepareStartupCreditsExistingRecordReview",
        method: "POST",
        path: "/v1/startup-credits/review-preparations",
        summary: "Prepare current Human verification terms and exact assurance work for one published startup Offer.",
        tags: ["Catalog"],
        request: { body: startupCreditsExistingRecordReviewPreparationRequestSchema },
        responses: {
            200: startupCreditsExistingRecordReviewPreparationResponseSchema,
            400: catalogApiErrorResponseSchema,
            409: catalogApiErrorResponseSchema,
            503: catalogApiErrorResponseSchema,
        },
    },
    {
        operationId: "getStartupCreditsReviewPaymentRequirements",
        method: "GET",
        path: "/v1/startup-credits/reviews",
        summary: "Read effect-free x402 payment requirements for Sourcey Human Verification.",
        tags: ["Catalog"],
        responses: {},
        x402Discovery: startupCreditsReviewProductDescriptor,
    },
    {
        operationId: "createStartupCreditsReview",
        method: "POST",
        path: "/v1/startup-credits/reviews",
        summary: "Start Human verification for one startup credit or startup program.",
        tags: ["Catalog"],
        request: {
            headers: z
                .object({ "payment-signature": z.string().trim().min(1).max(65_536).optional() })
                .passthrough(),
            body: startupCreditsReviewRequestSchema,
        },
        responses: {
            202: startupCreditsReviewResponseSchema,
            400: catalogApiErrorResponseSchema,
            401: catalogApiErrorResponseSchema,
            409: catalogApiErrorResponseSchema,
            503: catalogApiErrorResponseSchema,
        },
        payable: startupCreditsReviewProductDescriptor,
    },
    {
        operationId: "getStartupCreditsReview",
        method: "GET",
        path: "/v1/startup-credits/reviews/{request_id}",
        summary: "Read the durable status of one exact Human verification request.",
        tags: ["Catalog"],
        request: {
            path: z.object({ request_id: startupCreditsReviewRequestIdSchema }).strict(),
            headers: z
                .object({ "payment-signature": z.string().trim().min(1).max(65_536).optional() })
                .passthrough(),
        },
        responses: {
            200: startupCreditsReviewResponseSchema,
            400: catalogApiErrorResponseSchema,
            401: catalogApiErrorResponseSchema,
            404: catalogApiErrorResponseSchema,
        },
    },
    {
        operationId: "getStartupCreditsReviewByOrder",
        method: "GET",
        path: "/v1/startup-credits/reviews/orders/{order_id}",
        summary: "Recover one Human verification from its Stripe order.",
        tags: ["Catalog"],
        request: {
            path: z.object({ order_id: commercialOrderIdSchema }).strict(),
        },
        responses: {
            200: startupCreditsReviewResponseSchema,
            400: catalogApiErrorResponseSchema,
            401: catalogApiErrorResponseSchema,
            404: catalogApiErrorResponseSchema,
        },
    },
];
export const catalogOpenApiV1Endpoints = [
    ...publicCatalogV1Endpoints,
    ...catalogSubmissionV1Endpoints,
    ...agentReadinessDeclarationDraftV1Endpoints,
    ...catalogVerifierV1Endpoints,
    ...startupCreditsReviewV1Endpoints,
    ...publicDatasetEndpoints,
];
export const publicCatalogV1BoundaryErrors = {
    401: catalogApiErrorResponseSchema,
    403: catalogApiErrorResponseSchema,
    405: catalogApiErrorResponseSchema,
    429: catalogApiErrorResponseSchema,
    500: catalogApiErrorResponseSchema,
    503: catalogApiErrorResponseSchema,
};
//# sourceMappingURL=index.js.map