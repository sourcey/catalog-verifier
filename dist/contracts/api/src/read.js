import { captureAttemptAttestationSchema } from "provenry/capture/attestation";
import { publicationResourceDigestsSchema } from "provenry/contracts/publication";
import { z } from "zod";
import { OFFER_ID_PATTERN } from "../../../modules/catalog-primitives/src/index.js";
import { agentReadinessDeclarationRevisionContract, agentReadinessDeclarationRevisionSchema, agentReadinessOfferRelationRevisionSchema, agentReadinessProfileSummarySchema, agentReadinessProjectionSchema, agentReadinessRevisionContract, agentReadinessRevisionHeadSchema, agentReadinessRevisionSchema, agentReadinessServedFreshnessMapSchema, } from "../../agent-readiness/src/index.js";
import { canonicalArtifactSchema, compiledEntitySchema, compiledOfferSchema, compiledPolicySchema, compiledProgramSchema, provenanceEntrySchema, } from "../../artifact/src/index.js";
import { assetBindingProjectionSchema } from "../../assets/src/index.js";
import { entityIdentityAssuranceSchema } from "../../assurance/src/index.js";
import { protectedSignatureSchema } from "../../authority/src/index.js";
import { catalogVerifierIdentityContextPacketSchema } from "../../catalog-verifier/src/index.js";
import { catalogEventPayloadSchemas, eventSubjectSchema } from "../../events/src/index.js";
import { observationSchema } from "../../observations/src/index.js";
import { sourceyReleaseEnvelopeSchemas } from "../../release/src/index.js";
import { catalogRevisionContracts, eligibilityEvaluationSchema, eligibilityFactsSchema, entityRevisionSchema, lifecycleStatusSchema, offerRevisionSchema, programRevisionSchema, } from "../../revisions/src/index.js";
import { catalogTaxonomySchema } from "../../taxonomy/src/index.js";
import { agentReadinessProfileId, apiEnvelope, catalogApiContractSchema, digest, entityId, identifier, instant, nonEmpty, offerId, operationId, pagedApiEnvelope, programId, slug, } from "./values.js";
export const SOURCEY_PUBLIC_API_VERSION = "1.2.7";
/**
 * Sourcey's response-header budget leaves transport headroom beneath the
 * 16 KiB aggregate parser ceiling used by common HTTP clients. The x402
 * protocol permits larger envelopes; Sourcey's payable products do not.
 */
export const SOURCEY_X402_PAYMENT_REQUIRED_MAX_BYTES = 14 * 1_024;
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
const catalogApiErrorCodeSchema = z.enum([
    "already_bought",
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
const catalogApiErrorSchema = z
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
    resource_digests: publicationResourceDigestsSchema,
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
    .extend({ descriptor: sourceyReleaseEnvelopeSchemas.descriptor })
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
export const catalogVerifierIdentityContextResponseSchema = apiEnvelope(catalogVerifierIdentityContextPacketSchema);
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
export const catalogSitemapShardSchema = z.string().regex(/^[a-f0-9]{2,3}$/);
export const catalogSitemapEntrySchema = z
    .object({
    path: z
        .string()
        .startsWith("/")
        .max(2_048)
        .refine((value) => !/[?#]/u.test(value)),
    lastmod: instant,
})
    .strict();
export const catalogSitemapShardSummarySchema = z
    .object({
    shard: catalogSitemapShardSchema,
    entry_count: z.number().int().positive().max(50_000),
    lastmod: instant,
})
    .strict();
export const catalogSitemapChangeSchema = z
    .object({
    operation: z.enum(["upsert", "delete"]),
    path: catalogSitemapEntrySchema.shape.path,
})
    .strict();
export const catalogSitemapShardListResponseSchema = apiEnvelope(z.array(catalogSitemapShardSummarySchema).max(4_096));
export const catalogSitemapEntryListResponseSchema = pagedApiEnvelope(catalogSitemapEntrySchema).extend({ shard: catalogSitemapShardSchema });
export const catalogSitemapChangeListResponseSchema = pagedApiEnvelope(catalogSitemapChangeSchema);
export const eligibilityStructureStatisticSchema = z
    .object({
    statistic_id: digest,
    method_digest: digest,
    release_id: digest,
    denominator: z.number().int().nonnegative(),
    without_manual_review_node: z.number().int().nonnegative(),
    with_manual_review_node: z.number().int().nonnegative(),
    without_manual_review_basis_points: z.number().int().min(0).max(10_000),
    result_digest: digest,
})
    .strict()
    .superRefine((value, context) => {
    if (value.without_manual_review_node + value.with_manual_review_node !== value.denominator) {
        context.addIssue({
            code: "custom",
            message: "Eligibility-structure buckets must close over their denominator.",
        });
    }
});
export const eligibilityStructureStatisticResponseSchema = apiEnvelope(eligibilityStructureStatisticSchema);
export const entityListResponseSchema = pagedApiEnvelope(compiledEntitySchema).extend({
    query: z.string(),
    category: slug.nullable(),
    summary: catalogEntityListSummarySchema,
    assets: entityAssetBindingsSchema,
});
const entityTombstoneSchema = z.discriminatedUnion("transition", [
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
const programTombstoneSchema = z.discriminatedUnion("transition", [
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
const agentReadinessProfileTombstoneSchema = z.discriminatedUnion("transition", [
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
const offerSearchResultSchema = z.union([
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
    next_cursor: z.string().min(1).nullable(),
    freshness: agentReadinessServedFreshnessMapSchema,
});
export const agentReadinessProfileResponseSchema = apiEnvelope(z.union([agentReadinessProjectionSchema, agentReadinessProfileTombstoneSchema])).extend({ freshness: agentReadinessServedFreshnessMapSchema });
export const agentReadinessProfileListResponseSchema = apiEnvelope(z.array(agentReadinessProfileSummarySchema)).extend({
    query: z.string(),
    next_cursor: z.string().min(1).nullable(),
    freshness: agentReadinessServedFreshnessMapSchema,
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
    .extend({
    offer_id: offerId,
    next_cursor: z.string().min(1).nullable(),
    freshness: agentReadinessServedFreshnessMapSchema,
})
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
/** A current revision. The API serves only revisions current state references. */
export const catalogRevisionSchema = z.union([
    entityRevisionSchema,
    programRevisionSchema,
    offerRevisionSchema,
    agentReadinessRevisionSchema,
    agentReadinessDeclarationRevisionSchema,
]);
/**
 * A revision as a release admitted it: its contract, digest and identity, and otherwise its exact
 * bytes, which the release that first included it verified. A reader that needs its meaning
 * parses the current schema for its contract.
 */
const revisionDocumentHead = { revision_digest: digest, entity_id: entityId };
export const revisionDocumentSchema = z.discriminatedUnion("revision_contract", [
    z
        .object({
        revision_contract: z.literal(catalogRevisionContracts.entity),
        ...revisionDocumentHead,
    })
        .passthrough(),
    z
        .object({
        revision_contract: z.literal(catalogRevisionContracts.program),
        ...revisionDocumentHead,
        program_id: programId,
    })
        .passthrough(),
    z
        .object({
        revision_contract: z.literal(catalogRevisionContracts.offer),
        ...revisionDocumentHead,
        offer_id: offerId,
    })
        .passthrough(),
    z
        .object({
        revision_contract: z.literal(agentReadinessRevisionContract),
        ...revisionDocumentHead,
        agent_readiness_profile_id: agentReadinessProfileId,
    })
        .passthrough(),
    z
        .object({
        revision_contract: z.literal(agentReadinessDeclarationRevisionContract),
        ...revisionDocumentHead,
    })
        .passthrough(),
]);
export const revisionResponseSchema = apiEnvelope(catalogRevisionSchema);
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
const publicCatalogEventSchema = z.union(publicCatalogEventVariants);
export const eventResponseSchema = apiEnvelope(publicCatalogEventSchema);
export const eventListResponseSchema = pagedApiEnvelope(publicCatalogEventSchema);
const publicObservationSchema = observationSchema;
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
    capture_attestation_digests: items(digest),
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
    resource_digests: publicationResourceDigestsSchema,
    current_revision_digests: z.array(digest),
    revisions: z.array(z
        .object({
        revision_digest: digest,
        revision: catalogClosureRevisionSchema,
    })
        .strict()),
    events: z.array(publicCatalogEventSchema),
    observations: z.array(publicObservationSchema),
    /** The named capture attestations the live release already carries. */
    capture_attestations: z.array(captureAttemptAttestationSchema),
})
    .strict());
//# sourceMappingURL=read.js.map