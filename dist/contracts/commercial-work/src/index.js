import { z } from "zod";
import { DIGEST_PATTERN, digest, ENTITY_ID_PATTERN, OFFER_ID_PATTERN, PROGRAM_ID_PATTERN, } from "../../../modules/primitives/src/index.js";
import { entityAssetSubmissionSourceSchema } from "../../assets/src/index.js";
import { entityIdentityAssuranceSchema, offerTermsAssuranceSchema, } from "../../assurance/src/index.js";
import { fundedWorkIntentEnvelopeSchema } from "../../funded-work/src/index.js";
import { expectedPublicationEntitySchema } from "../../publication/src/index.js";
import { catalogAuthoringUrlSchema } from "../../revisions/src/index.js";
export * from "../../funded-work/src/index.js";
const digestSchema = z.string().regex(DIGEST_PATTERN);
const instantSchema = z.iso.datetime({ offset: true });
const entityIdSchema = z.string().regex(ENTITY_ID_PATTERN);
const programIdSchema = z.string().regex(PROGRAM_ID_PATTERN);
const offerIdSchema = z.string().regex(OFFER_ID_PATTERN);
export const domainNameSchema = z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/u);
export const startupCreditsProductCode = "startup-offer-human-verification";
export const startupCreditsPrice = { currency: "usd", minor_units: 4_900 };
export const startupCreditsPriceLookupKey = "startup-offer-human-verification-usd-49";
export const startupCreditsPurchaseDisclosureStatement = "Human verification includes publication of a supportable company record with verified status for a legitimate company. Sourcey cannot publish false, unsafe, conflicting, duplicate, or non-existent company or offer claims. Refunds apply when Sourcey cannot deliver the purchased service or misses the review deadline.";
const startupCreditsPriceSchema = z
    .object({
    currency: z.literal(startupCreditsPrice.currency),
    minor_units: z.literal(startupCreditsPrice.minor_units),
})
    .strict();
export const startupCreditsServicePolicySchema = z
    .object({
    policy_contract: z.literal("sourcey.startup-credits-verification-service-policy/v1alpha1"),
    product_code: z.literal(startupCreditsProductCode),
    price_lookup_key: z.literal(startupCreditsPriceLookupKey),
    price: startupCreditsPriceSchema,
    service_calendar: z
        .object({
        time_zone: z.literal("Australia/Sydney"),
        business_days: z.literal(3),
        counting: z.literal("next-business-day"),
        deadline: z.literal("end-of-local-day"),
        holiday_dates: z.array(z.iso.date()).min(1),
        valid_through: z.iso.date(),
        source_url: z.literal("https://www.nsw.gov.au/about-nsw/public-holidays"),
        source_observed_at: instantSchema,
    })
        .strict()
        .superRefine((calendar, context) => {
        if (new Set(calendar.holiday_dates).size !== calendar.holiday_dates.length) {
            context.addIssue({ code: "custom", message: "Service holidays must be unique." });
        }
        if (calendar.holiday_dates.some((date, index) => index > 0 && (calendar.holiday_dates[index - 1] ?? "") >= date)) {
            context.addIssue({ code: "custom", message: "Service holidays must be sorted." });
        }
    }),
    material_misrepresentation_refundable: z.literal(false),
    sla_miss_refundable: z.literal(true),
    sourcey_error_refundable: z.literal(true),
    payment_authorizes_human_verification: z.literal(true),
    payment_changes_truth: z.literal(false),
})
    .strict();
export const startupCreditsReviewWorkDefinitionSchema = z
    .object({
    work_contract: z.literal("sourcey.startup-credits-review-work-definition/v1alpha1"),
    scope: z.literal("one-entity-one-offer"),
    passing_results: z
        .object({
        entity_identity: z
            .object({
            status: z.literal("verified"),
            binding: z.literal("identity-epoch"),
        })
            .strict(),
        offer_terms: z
            .object({
            status: z.literal("checked"),
            binding: z.literal("exact-offer-revision"),
        })
            .strict(),
    })
        .strict(),
})
    .strict();
export const startupCreditsPurchaseDisclosureSchema = z
    .object({
    disclosure_contract: z.literal("sourcey.startup-credits-purchase-disclosure/v1alpha1"),
    statement: z.literal(startupCreditsPurchaseDisclosureStatement),
})
    .strict();
const startupCreditsPurchasePreviewCoreSchema = z
    .object({
    preview_contract: z.literal("sourcey.startup-credits-purchase-preview/v1alpha1"),
    product_code: z.literal(startupCreditsProductCode),
    purchase_kind: z.literal("one_off"),
    price_lookup_key: z.literal(startupCreditsPriceLookupKey),
    price: startupCreditsPriceSchema,
    work_scope: z.literal("one-entity-one-offer"),
    passing_results: startupCreditsReviewWorkDefinitionSchema.shape.passing_results,
    service_level: z
        .object({
        starts_after: z.literal("settled-payment"),
        business_days: z.literal(3),
        time_zone: z.literal("Australia/Sydney"),
    })
        .strict(),
    refunds: z
        .object({
        material_misrepresentation_refundable: z.literal(false),
        service_level_missed_refundable: z.literal(true),
        sourcey_error_refundable: z.literal(true),
    })
        .strict(),
    disclosure: startupCreditsPurchaseDisclosureSchema.shape.statement,
    policy_bindings: z
        .object({
        assurance_method: digestSchema,
        purchase_disclosure: digestSchema,
        service: digestSchema,
    })
        .strict(),
})
    .strict();
export const startupCreditsPurchasePreviewSchema = startupCreditsPurchasePreviewCoreSchema
    .safeExtend({ preview_digest: digestSchema })
    .strict();
export const standingRouteSchema = z.enum([
    "correction_required",
    "repair_required",
    "temporarily_unavailable",
    "free_machine_review",
    "human_verification_required",
]);
export const standingPolicySchema = z
    .object({
    policy_contract: z.literal("sourcey.standing-policy/v1alpha1"),
    reach_provider: z.literal("ahrefs-domain-rating"),
    reach_threshold_exclusive: z.number().int().min(0).max(100),
    fallback_domain_age_days: z.number().int().positive(),
    fallback_certificate_age_days: z.number().int().positive(),
    cache_ttl_seconds: z.number().int().positive().max(86_400),
})
    .strict();
export const standingEvidenceSchema = z
    .object({
    registrable_domain: domainNameSchema,
    official_source_url: catalogAuthoringUrlSchema,
    source: z
        .object({
        status: z.enum(["reachable", "unreachable", "invalid"]),
        first_party: z.boolean(),
        observed_at: instantSchema,
        observation_digest: digestSchema,
    })
        .strict(),
    catalog_identity: z.discriminatedUnion("status", [
        z.object({ status: z.literal("unresolved") }).strict(),
        z
            .object({
            status: z.literal("existing"),
            entity_id: entityIdSchema,
            entity_revision_digest: digestSchema,
        })
            .strict(),
        z
            .object({
            status: z.literal("ambiguous"),
            entity_ids: z.array(entityIdSchema).min(2),
        })
            .strict(),
    ]),
    reach: z.discriminatedUnion("status", [
        z
            .object({
            status: z.literal("available"),
            rating: z.number().min(0).max(100),
            observed_at: instantSchema,
            observation_digest: digestSchema,
        })
            .strict(),
        z
            .object({
            status: z.literal("unavailable"),
            reason: z.enum(["not_found", "provider_unavailable", "provider_rejected"]),
            observed_at: instantSchema,
        })
            .strict(),
    ]),
    domain_age: z.discriminatedUnion("status", [
        z
            .object({ status: z.literal("available"), age_days: z.number().int().nonnegative() })
            .strict(),
        z.object({ status: z.literal("unavailable") }).strict(),
    ]),
    certificate_age: z.discriminatedUnion("status", [
        z
            .object({ status: z.literal("available"), age_days: z.number().int().nonnegative() })
            .strict(),
        z.object({ status: z.literal("unavailable") }).strict(),
    ]),
    mx: z.discriminatedUnion("status", [
        z.object({ status: z.literal("available"), present: z.boolean() }).strict(),
        z.object({ status: z.literal("unavailable") }).strict(),
    ]),
})
    .strict();
export const standingResultCoreSchema = z
    .object({
    result_contract: z.literal("sourcey.standing-result/v1alpha1"),
    policy_digest: digestSchema,
    evidence_digest: digestSchema,
    registrable_domain: domainNameSchema,
    official_source_url: catalogAuthoringUrlSchema,
    route: standingRouteSchema,
    reasons: z.array(z.string().trim().min(1).max(500)).min(1).max(12),
    evaluated_at: instantSchema,
    expires_at: instantSchema,
})
    .strict();
export const standingResultSchema = standingResultCoreSchema
    .safeExtend({ result_digest: digestSchema })
    .strict();
export const startupCreditsExistingEntityDraftBaseSchema = z
    .object({
    entity_id: entityIdSchema,
    entity_revision_digest: digestSchema,
})
    .strict();
export const startupCreditsDraftRequestSchema = z
    .object({
    standing_result: standingResultSchema,
    existing_entity: startupCreditsExistingEntityDraftBaseSchema.optional(),
    company: z
        .object({
        name: z.string().trim().min(1).max(160),
        domain: domainNameSchema,
        category: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u),
        summary: z.string().trim().min(1).max(240),
        site_url: catalogAuthoringUrlSchema,
    })
        .strict(),
    program: z
        .object({
        title: z.string().trim().min(1).max(240),
        summary: z.string().trim().min(1).max(240),
    })
        .strict()
        .optional(),
    offer: z
        .object({
        title: z.string().trim().min(1).max(240),
        summary: z.string().trim().min(1).max(240),
        benefit: z.string().trim().min(1).max(500),
        eligibility: z.string().trim().min(1).max(500),
        access_method: z.enum(["form", "contact", "automatic", "other"]),
        access_url: catalogAuthoringUrlSchema.optional(),
    })
        .strict()
        .superRefine((offer, context) => {
        if (offer.access_method === "form" && offer.access_url === undefined) {
            context.addIssue({
                code: "custom",
                path: ["access_url"],
                message: "A form offer requires its public application URL.",
            });
        }
    }),
})
    .strict()
    .superRefine((request, context) => {
    const existingRoute = request.standing_result.route === "correction_required";
    if (existingRoute !== (request.existing_entity !== undefined)) {
        context.addIssue({
            code: "custom",
            path: ["existing_entity"],
            message: "An existing Entity reference is required only for an exact existing-record draft.",
        });
    }
});
const diagnosticSchema = z
    .object({
    code: z.enum(["required", "invalid", "conflict", "ineligible"]),
    path: z.string().startsWith("/"),
    message: z.string().trim().min(1).max(1_000),
})
    .strict();
export const startupCreditsDraftResultSchema = z.discriminatedUnion("status", [
    z
        .object({
        status: z.enum(["invalid", "incomplete", "conflict", "ineligible"]),
        diagnostics: z.array(diagnosticSchema).min(1),
    })
        .strict(),
    z
        .object({
        status: z.literal("materialized"),
        base_release_id: digestSchema,
        entity_id: entityIdSchema,
        program_id: programIdSchema.optional(),
        offer_id: offerIdSchema,
        purchase_preview: startupCreditsPurchasePreviewSchema,
        expected_current_entities: z.array(expectedPublicationEntitySchema).max(1),
        authoring_file: z
            .object({
            path: z.string().regex(/^entities\/[a-z0-9]{1,2}\/[a-z0-9-]+\.yaml$/u),
            content: z.string().min(1),
            content_digest: digestSchema,
        })
            .strict(),
        diagnostics: z.array(diagnosticSchema).max(20),
    })
        .strict(),
]);
export const startupCreditsVerificationCaseIdSchema = z.string().regex(/^hvc_[a-f0-9]{64}$/u);
const startupCreditsNewListingIntentTargetSchema = z
    .object({
    kind: z.literal("new_listing"),
    base_release_id: digestSchema,
    entity_id: entityIdSchema,
    program_id: programIdSchema.optional(),
    offer_id: offerIdSchema,
    submission: z
        .object({
        submission_id: z.string().regex(/^sub_[a-f0-9]{64}$/u),
        payload_digest: digestSchema,
        authorization_policy: z.literal("proposal"),
    })
        .strict(),
    standing_result: standingResultSchema,
    authoring_file_digest: digestSchema,
})
    .strict();
export const startupCreditsExistingRecordTargetSchema = z
    .object({
    kind: z.literal("existing_record"),
    base_release_id: digestSchema,
    entity_id: entityIdSchema,
    program_id: programIdSchema.optional(),
    entity_revision_digest: digestSchema,
    offer_id: offerIdSchema,
    offer_revision_digest: digestSchema,
})
    .strict();
/**
 * Stable customer reference to one admitted Entity and Offer revision.
 *
 * The current Catalog head is deliberately absent: an unrelated release must
 * not invalidate checkout for this exact record. The product resolver adds the
 * current base release only after proving both revision digests still match.
 */
export const startupCreditsExistingRecordReferenceSchema = startupCreditsExistingRecordTargetSchema
    .omit({ base_release_id: true })
    .strict();
export const startupCreditsVerificationIntentTargetSchema = z.discriminatedUnion("kind", [
    startupCreditsNewListingIntentTargetSchema,
    startupCreditsExistingRecordTargetSchema,
]);
export const startupCreditsFundedWorkIntentSchema = z
    .object({
    product_intent_contract: z.literal("sourcey.startup-offer-human-verification-intent/v1alpha1"),
    verification_case_id: startupCreditsVerificationCaseIdSchema,
    billing: fundedWorkIntentEnvelopeSchema,
    target: startupCreditsVerificationIntentTargetSchema,
    purchase_preview_digest: digestSchema,
    disclosure_digest: digestSchema,
    product_intent_digest: digestSchema,
})
    .strict()
    .superRefine((intent, context) => {
    if (intent.billing.product_code !== startupCreditsProductCode) {
        context.addIssue({
            code: "custom",
            path: ["billing", "product_code"],
            message: "Startup Credits work must use the Startup Credits product code.",
        });
    }
    if (intent.billing.price_lookup_key !== startupCreditsPriceLookupKey) {
        context.addIssue({
            code: "custom",
            path: ["billing", "price_lookup_key"],
            message: "Startup Credits work must use the published Startup Credits price key.",
        });
    }
    if (intent.billing.work_class !== "human-verification") {
        context.addIssue({
            code: "custom",
            path: ["billing", "work_class"],
            message: "Startup Credits funded work must remain human verification.",
        });
    }
    const eligibilityDigest = intent.target.kind === "new_listing"
        ? intent.target.standing_result.result_digest
        : digest(intent.target);
    if (intent.billing.eligibility_digest !== eligibilityDigest) {
        context.addIssue({
            code: "custom",
            path: ["billing", "eligibility_digest"],
            message: "The billing eligibility binding must be the exact verification target.",
        });
    }
    const bindings = new Map(intent.billing.policy_bindings.map((binding) => [binding.role, binding.policy_digest]));
    if (intent.target.kind === "new_listing" &&
        bindings.get("standing") !== intent.target.standing_result.policy_digest) {
        context.addIssue({
            code: "custom",
            path: ["billing", "policy_bindings"],
            message: "The standing policy binding must match the exact standing result.",
        });
    }
    if (intent.target.kind === "existing_record" && bindings.has("standing")) {
        context.addIssue({
            code: "custom",
            path: ["billing", "policy_bindings"],
            message: "Existing-record verification must not invent a standing-policy binding.",
        });
    }
    if (bindings.get("purchase-disclosure") !== intent.disclosure_digest) {
        context.addIssue({
            code: "custom",
            path: ["billing", "policy_bindings"],
            message: "The purchase disclosure binding must match the exact product disclosure.",
        });
    }
    for (const role of ["assurance-method", "service"]) {
        if (bindings.has(role))
            continue;
        context.addIssue({
            code: "custom",
            path: ["billing", "policy_bindings"],
            message: `The ${role} policy binding is required.`,
        });
    }
    if (intent.billing.owner_work_ref !== intent.verification_case_id ||
        intent.billing.base_release_id !== intent.target.base_release_id ||
        intent.billing.subject.entity_id !== intent.target.entity_id ||
        intent.billing.subject.program_id !== intent.target.program_id ||
        intent.billing.subject.offer_id !== intent.target.offer_id) {
        context.addIssue({
            code: "custom",
            path: ["billing"],
            message: "Billing must bind this exact Human Verification case and target.",
        });
    }
});
export const startupCreditsCompletedReviewBasisSchema = z
    .object({
    evidence_event_ids: z.array(digestSchema),
    observation_ids: z.array(digestSchema),
    retained_artifact_digests: z.array(digestSchema).default([]),
})
    .strict()
    .superRefine((basis, context) => {
    if (basis.evidence_event_ids.length +
        basis.observation_ids.length +
        basis.retained_artifact_digests.length ===
        0) {
        context.addIssue({
            code: "custom",
            message: "A review outcome requires at least one retained evidence or observation ID.",
        });
    }
    for (const [field, values] of Object.entries(basis)) {
        if (new Set(values).size !== values.length ||
            [...values].sort().some((v, i) => v !== values[i])) {
            context.addIssue({
                code: "custom",
                path: [field],
                message: "Review basis IDs must be unique and canonically sorted.",
            });
        }
    }
});
export const startupCreditsEntityIdentityFailureReasonSchema = z.enum([
    "identity_mismatch",
    "identity_unresolved",
    "insufficient_evidence",
]);
export const startupCreditsOfferTermsFailureReasonSchema = z.enum([
    "terms_mismatch",
    "source_unavailable",
    "insufficient_evidence",
]);
export const startupCreditsEntityIdentityReviewDecisionSchema = z.discriminatedUnion("status", [
    z
        .object({
        status: z.literal("passed"),
        rationale: z.string().trim().min(1).max(2_000),
    })
        .strict(),
    z
        .object({
        status: z.literal("failed"),
        reason_code: startupCreditsEntityIdentityFailureReasonSchema,
        rationale: z.string().trim().min(1).max(2_000),
        basis: startupCreditsCompletedReviewBasisSchema,
    })
        .strict(),
]);
export const startupCreditsOfferTermsReviewDecisionSchema = z.discriminatedUnion("status", [
    z
        .object({
        status: z.literal("passed"),
        rationale: z.string().trim().min(1).max(2_000),
    })
        .strict(),
    z
        .object({
        status: z.literal("failed"),
        reason_code: startupCreditsOfferTermsFailureReasonSchema,
        rationale: z.string().trim().min(1).max(2_000),
        basis: startupCreditsCompletedReviewBasisSchema,
    })
        .strict(),
    z
        .object({
        status: z.literal("not_evaluated"),
        reason_code: z.literal("identity_unresolved"),
    })
        .strict(),
]);
/** The reviewer records two factual decisions. Their dependency is explicit:
 * Offer terms are skipped exactly when company identity cannot be established. */
export const startupCreditsReviewDecisionSchema = z
    .object({
    entity_identity: startupCreditsEntityIdentityReviewDecisionSchema,
    offer_terms: startupCreditsOfferTermsReviewDecisionSchema,
})
    .strict()
    .superRefine((decision, context) => {
    const identityFailed = decision.entity_identity.status === "failed";
    const termsNotEvaluated = decision.offer_terms.status === "not_evaluated";
    if (identityFailed !== termsNotEvaluated) {
        context.addIssue({
            code: "custom",
            path: ["offer_terms", "status"],
            message: "Offer terms may be not evaluated only when Entity identity failed, and identity failure cannot carry an Offer terms decision.",
        });
    }
});
const entityIdentityReviewOutcomeSchema = z.discriminatedUnion("status", [
    z
        .object({
        status: z.literal("passed"),
        entity_id: entityIdSchema,
        assurance: entityIdentityAssuranceSchema,
    })
        .strict(),
    z
        .object({
        status: z.literal("reused"),
        entity_id: entityIdSchema,
        assurance: entityIdentityAssuranceSchema,
    })
        .strict(),
    z
        .object({
        status: z.literal("failed"),
        entity_id: entityIdSchema,
        reason_code: startupCreditsEntityIdentityFailureReasonSchema,
        rationale: z.string().trim().min(1).max(2_000),
        basis: startupCreditsCompletedReviewBasisSchema,
    })
        .strict(),
]);
const offerTermsReviewOutcomeSchema = z.discriminatedUnion("status", [
    z
        .object({
        status: z.literal("passed"),
        entity_id: entityIdSchema,
        offer_id: offerIdSchema,
        assurance: offerTermsAssuranceSchema,
    })
        .strict(),
    z
        .object({
        status: z.literal("reused"),
        entity_id: entityIdSchema,
        offer_id: offerIdSchema,
        assurance: offerTermsAssuranceSchema,
    })
        .strict(),
    z
        .object({
        status: z.literal("failed"),
        entity_id: entityIdSchema,
        offer_id: offerIdSchema,
        revision_digest: digestSchema,
        reason_code: startupCreditsOfferTermsFailureReasonSchema,
        rationale: z.string().trim().min(1).max(2_000),
        basis: startupCreditsCompletedReviewBasisSchema,
    })
        .strict(),
    z
        .object({
        status: z.literal("not_evaluated"),
        entity_id: entityIdSchema,
        offer_id: offerIdSchema,
        reason_code: z.literal("identity_unresolved"),
    })
        .strict(),
]);
export const startupCreditsReviewCompletionTargetSchema = z.discriminatedUnion("kind", [
    z
        .object({
        kind: z.literal("new_listing"),
        base_release_id: digestSchema,
        entity_id: entityIdSchema,
        program_id: programIdSchema.optional(),
        offer_id: offerIdSchema,
        submission_id: z.string().regex(/^sub_[a-f0-9]{64}$/u),
        submission_payload_digest: digestSchema,
    })
        .strict(),
    startupCreditsExistingRecordTargetSchema,
]);
export const startupCreditsReviewCompletionReceiptCoreSchema = z
    .object({
    receipt_contract: z.literal("sourcey.startup-credits-review-completion/v1alpha1"),
    order_id: z.string().regex(/^ord_[a-f0-9]{64}$/u),
    funded_work_intent_id: fundedWorkIntentEnvelopeSchema.shape.intent_id,
    funded_work_intent_digest: digestSchema,
    verification_case_id: startupCreditsVerificationCaseIdSchema,
    target: startupCreditsReviewCompletionTargetSchema,
    method_policy_digest: digestSchema,
    reviewer_id: z.string().trim().min(1).max(256),
    reviewed_at: instantSchema,
    readback_release_id: digestSchema,
    work_outcome: z.literal("review_delivered"),
    entity_identity: entityIdentityReviewOutcomeSchema,
    offer_terms: offerTermsReviewOutcomeSchema,
})
    .strict()
    .superRefine((receipt, context) => {
    if (receipt.entity_identity.entity_id !== receipt.target.entity_id ||
        receipt.offer_terms.entity_id !== receipt.target.entity_id ||
        receipt.offer_terms.offer_id !== receipt.target.offer_id) {
        context.addIssue({
            code: "custom",
            path: ["target"],
            message: "Review outcomes must bind the exact Human Verification target.",
        });
    }
    const identityFailed = receipt.entity_identity.status === "failed";
    const termsNotEvaluated = receipt.offer_terms.status === "not_evaluated";
    if (identityFailed !== termsNotEvaluated) {
        context.addIssue({
            code: "custom",
            path: ["offer_terms", "status"],
            message: "Offer terms may be not evaluated only when Entity identity failed, and identity failure cannot carry an Offer terms decision.",
        });
    }
    if (receipt.entity_identity.status === "passed") {
        if (receipt.entity_identity.assurance.method_policy_digest !== receipt.method_policy_digest ||
            receipt.entity_identity.assurance.verified_at !== receipt.reviewed_at) {
            context.addIssue({
                code: "custom",
                path: ["entity_identity", "assurance"],
                message: "A newly passed Entity identity assurance must use this review method and timestamp.",
            });
        }
    }
    if (receipt.entity_identity.status === "reused" &&
        (receipt.entity_identity.assurance.method_policy_digest !== receipt.method_policy_digest ||
            Date.parse(receipt.entity_identity.assurance.verified_at) > Date.parse(receipt.reviewed_at))) {
        context.addIssue({
            code: "custom",
            path: ["entity_identity", "assurance"],
            message: "A reused Entity identity assurance must use this review method and cannot postdate this review.",
        });
    }
    if (receipt.offer_terms.status === "passed" &&
        (receipt.offer_terms.assurance.method_policy_digest !== receipt.method_policy_digest ||
            receipt.offer_terms.assurance.checked_at !== receipt.reviewed_at)) {
        context.addIssue({
            code: "custom",
            path: ["offer_terms", "assurance"],
            message: "A passed Offer terms assurance must use this review method and timestamp.",
        });
    }
    if (receipt.offer_terms.status === "reused" &&
        (receipt.offer_terms.assurance.method_policy_digest !== receipt.method_policy_digest ||
            Date.parse(receipt.offer_terms.assurance.checked_at) > Date.parse(receipt.reviewed_at))) {
        context.addIssue({
            code: "custom",
            path: ["offer_terms", "assurance"],
            message: "A reused Offer terms assurance must use this review method and cannot postdate this review.",
        });
    }
});
export const startupCreditsReviewCompletionReceiptSchema = startupCreditsReviewCompletionReceiptCoreSchema
    .safeExtend({ receipt_digest: digestSchema })
    .strict();
export const startupCreditsReviewRequestIdSchema = z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9_-]{32,128}$/u);
export const startupCreditsEntityIconInputSchema = z
    .object({
    source: entityAssetSubmissionSourceSchema,
    trademark_owner: z.string().trim().min(1).max(240),
    relationship: z.enum(["vendor-representative", "community-contributor"]),
})
    .strict();
export const startupCreditsExpectedDraftSchema = z
    .object({
    base_release_id: digestSchema,
    content_digest: digestSchema,
    purchase_preview_digest: digestSchema,
})
    .strict();
const startupCreditsNewListingReviewTargetCoreSchema = z
    .object({
    kind: z.literal("new_listing"),
    draft: startupCreditsDraftRequestSchema,
    entity_icon: startupCreditsEntityIconInputSchema.optional(),
})
    .strict();
export const startupCreditsExistingRecordReviewTargetSchema = startupCreditsExistingRecordReferenceSchema
    .extend({ expected_purchase_preview_digest: digestSchema })
    .strict();
export const startupCreditsExistingRecordReviewPreparationRequestSchema = z
    .object({ target: startupCreditsExistingRecordReferenceSchema })
    .strict();
export const startupCreditsExistingRecordReviewPreparationSchema = z
    .object({
    target: startupCreditsExistingRecordReviewTargetSchema,
    purchase_preview: startupCreditsPurchasePreviewSchema,
    assurance_requirements: z
        .object({
        entity_identity: z.enum(["required", "already_verified"]),
        offer_terms: z.enum(["required", "already_checked"]),
    })
        .strict(),
})
    .strict();
export const startupCreditsExistingRecordReviewPreparationResponseSchema = z
    .object({ data: startupCreditsExistingRecordReviewPreparationSchema })
    .strict();
const startupCreditsX402ReviewTargetSchema = z.discriminatedUnion("kind", [
    startupCreditsNewListingReviewTargetCoreSchema,
    startupCreditsExistingRecordReviewTargetSchema,
]);
const startupCreditsStripeReviewTargetSchema = z.discriminatedUnion("kind", [
    startupCreditsNewListingReviewTargetCoreSchema
        .extend({ expected_draft: startupCreditsExpectedDraftSchema })
        .strict(),
    startupCreditsExistingRecordReviewTargetSchema,
]);
export const startupCreditsReviewTargetSchema = startupCreditsX402ReviewTargetSchema;
const startupCreditsReviewRequestCoreSchema = z.object({
    request_id: startupCreditsReviewRequestIdSchema,
});
export const startupCreditsReviewRequestSchema = z.discriminatedUnion("payment_rail", [
    startupCreditsReviewRequestCoreSchema
        .extend({
        payment_rail: z.literal("x402"),
        target: startupCreditsX402ReviewTargetSchema,
    })
        .strict(),
    startupCreditsReviewRequestCoreSchema
        .extend({
        payment_rail: z.literal("stripe"),
        target: startupCreditsStripeReviewTargetSchema,
        replaces_intent: fundedWorkIntentEnvelopeSchema
            .pick({ intent_id: true, intent_digest: true })
            .optional(),
    })
        .strict(),
]);
export const startupCreditsVerificationPublicStateSchema = z.enum([
    "awaiting_payment",
    "verifying",
    "input_needed",
    "publishing",
    "live",
    "refused",
]);
export const startupCreditsVerificationRequiredInputSchema = z
    .object({
    code: z.enum([
        "domain_control",
        "official_offer_page",
        "company_identity",
        "offer_existence",
        "current_terms",
        "pricing_or_consideration",
        "access_instructions",
        "conflicting_identity",
        "unsupported_material_claim",
    ]),
    path: z.string().startsWith("/"),
    message: z.string().trim().min(1).max(500),
})
    .strict();
export const startupCreditsVerificationStatusSchema = z
    .object({
    verification_case_id: startupCreditsVerificationCaseIdSchema,
    state: startupCreditsVerificationPublicStateSchema,
    required_input: z.array(startupCreditsVerificationRequiredInputSchema).max(20),
    decision_ref: digestSchema.nullable(),
    publication_release_id: digestSchema.nullable(),
    public_record_url: z.url({ protocol: /^https$/u }).nullable(),
    updated_at: instantSchema,
})
    .strict()
    .superRefine((status, context) => {
    if ((status.state === "input_needed") !== status.required_input.length > 0) {
        context.addIssue({
            code: "custom",
            path: ["required_input"],
            message: "Only an input-needed verification may carry required input.",
        });
    }
    if (status.state === "live" &&
        (!status.decision_ref || !status.publication_release_id || !status.public_record_url)) {
        context.addIssue({
            code: "custom",
            path: ["state"],
            message: "A live verification requires its decision and public readback.",
        });
    }
    if (status.publication_release_id && status.state !== "live") {
        context.addIssue({
            code: "custom",
            path: ["publication_release_id"],
            message: "Only a live verification may retain its publication release.",
        });
    }
});
export const startupCreditsReviewResponseSchema = z
    .object({
    data: z
        .object({
        request_id: startupCreditsReviewRequestIdSchema,
        verification: startupCreditsVerificationStatusSchema,
        order_id: z.string().regex(/^ord_[a-f0-9]{64}$/u),
        status_url: z.url({ protocol: /^https$/u }),
        checkout_url: z.url({ protocol: /^https$/u }).nullable(),
    })
        .strict(),
})
    .strict();
export const payableProductDescriptorSchema = z
    .object({
    descriptor_contract: z.literal("sourcey.payable-product-descriptor/v1alpha1"),
    product_code: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u),
    price_lookup_key: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u),
    operation_id: z.string().regex(/^[a-z][A-Za-z0-9]*$/u),
    method: z.literal("POST"),
    path: z.string().regex(/^\/v1\/[a-z0-9-/]+$/u),
    success_status: z.literal(202),
    service_name: z.string().trim().min(1).max(80),
    description: z.string().trim().min(1).max(499),
    tags: z.tuple([
        z.string().trim().min(1).max(48),
        z.string().trim().min(1).max(48),
        z.string().trim().min(1).max(48),
        z.string().trim().min(1).max(48),
        z.string().trim().min(1).max(48),
    ]),
    floor_price: startupCreditsPriceSchema,
    service_policy_url: z.url({ protocol: /^https$/u }),
    refund_policy_url: z.url({ protocol: /^https$/u }),
    input_example: startupCreditsReviewRequestSchema,
    output_example: startupCreditsReviewResponseSchema,
})
    .strict()
    .superRefine((descriptor, context) => {
    if (new Set(descriptor.tags).size !== descriptor.tags.length) {
        context.addIssue({
            code: "custom",
            path: ["tags"],
            message: "Payable product tags must be unique.",
        });
    }
});
const exampleDigest = `sha256:${"0".repeat(64)}`;
const exampleOrderId = `ord_${"0".repeat(64)}`;
const exampleVerificationCaseId = `hvc_${"0".repeat(64)}`;
const exampleRequestId = `sourcey_example_${"0".repeat(32)}`;
export const startupCreditsReviewProductDescriptor = payableProductDescriptorSchema.parse({
    descriptor_contract: "sourcey.payable-product-descriptor/v1alpha1",
    product_code: startupCreditsProductCode,
    price_lookup_key: startupCreditsPriceLookupKey,
    operation_id: "createStartupCreditsReview",
    method: "POST",
    path: "/v1/startup-credits/reviews",
    success_status: 202,
    service_name: "Sourcey Human Verification",
    description: "Human verification and publication for a startup credit or program with Verified status.",
    tags: ["startup-credits", "startup-programs", "listing", "human-review", "sourcey"],
    floor_price: startupCreditsPrice,
    service_policy_url: "https://sourcey.com/startup-credits",
    refund_policy_url: "https://sourcey.com/terms",
    input_example: {
        payment_rail: "x402",
        request_id: exampleRequestId,
        target: {
            kind: "new_listing",
            draft: {
                standing_result: {
                    result_contract: "sourcey.standing-result/v1alpha1",
                    policy_digest: exampleDigest,
                    evidence_digest: exampleDigest,
                    registrable_domain: "example.invalid",
                    official_source_url: "https://example.invalid/startups",
                    route: "human_verification_required",
                    reasons: ["Inert discovery example."],
                    evaluated_at: "2026-01-01T00:00:00.000Z",
                    expires_at: "2026-01-01T01:00:00.000Z",
                    result_digest: exampleDigest,
                },
                company: {
                    name: "Example Company",
                    domain: "example.invalid",
                    category: "devtools-other",
                    summary: "An inert company used only to describe the request contract.",
                    site_url: "https://example.invalid",
                },
                offer: {
                    title: "Example startup program",
                    summary: "An inert offer used only to describe the request contract.",
                    benefit: "An inert example benefit.",
                    eligibility: "An inert example eligibility statement.",
                    access_method: "form",
                    access_url: "https://example.invalid/apply",
                },
            },
        },
    },
    output_example: {
        data: {
            request_id: exampleRequestId,
            verification: {
                verification_case_id: exampleVerificationCaseId,
                state: "verifying",
                required_input: [],
                decision_ref: null,
                publication_release_id: null,
                public_record_url: null,
                updated_at: "2026-01-01T00:00:01.000Z",
            },
            order_id: exampleOrderId,
            status_url: `https://sourcey.invalid/v1/startup-credits/reviews/${exampleRequestId}`,
            checkout_url: null,
        },
    },
});
export function isFirstPartyUrlForDomain(value, domain) {
    const hostname = new URL(value).hostname.toLowerCase().replace(/\.$/u, "");
    const canonicalDomain = domainNameSchema.parse(domain);
    return hostname === canonicalDomain || hostname.endsWith(`.${canonicalDomain}`);
}
//# sourceMappingURL=index.js.map