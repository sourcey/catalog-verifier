import { DIGEST_PATTERN, digest } from "provenry/primitives";
import { z } from "zod";
import { ENTITY_ID_PATTERN, OFFER_ID_PATTERN, PROGRAM_ID_PATTERN, } from "../../../modules/catalog-primitives/src/index.js";
import { admissionSummarySchema } from "../../admission-results/src/index.js";
import { entityAssetSubmissionSourceSchema } from "../../assets/src/index.js";
import { offerTermsAssuranceSchema } from "../../assurance/src/index.js";
import { companyAuthoringFileSchema, companyDraftDiagnosticSchema, companySubmissionSchema, } from "../../company-authoring/src/index.js";
import { companyIdentityReviewDecisionSchema, companyVerificationNewListingTargetSchema, completedCompanyReviewCoreSchema, reviewEvidenceBasisSchema, } from "../../company-verification/src/index.js";
import { fundedWorkIntentEnvelopeSchema } from "../../funded-work/src/index.js";
import { expectedPublicationEntitySchema } from "../../publication/src/index.js";
import { catalogAuthoringUrlSchema } from "../../revisions/src/index.js";
export * from "../../funded-work/src/index.js";
const digestSchema = z.string().regex(DIGEST_PATTERN);
const instantSchema = z.iso.datetime({ offset: true });
const entityIdSchema = z.string().regex(ENTITY_ID_PATTERN);
const programIdSchema = z.string().regex(PROGRAM_ID_PATTERN);
const offerIdSchema = z.string().regex(OFFER_ID_PATTERN);
import { standingResultSchema } from "../../company-standing/src/index.js";
export const startupCreditsProductCode = "startup-offer-human-verification";
export const startupCreditsPrice = { currency: "usd", minor_units: 2_900 };
export const startupCreditsPriceLookupKey = "startup-offer-human-verification-usd-29";
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
const startupCreditsExistingEntityDraftBaseSchema = z
    .object({
    entity_id: entityIdSchema,
    entity_revision_digest: digestSchema,
})
    .strict();
export const startupCreditsDraftRequestSchema = z
    .object({
    standing_result: standingResultSchema,
    existing_entity: startupCreditsExistingEntityDraftBaseSchema.optional(),
    company: companySubmissionSchema,
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
export const startupCreditsDraftResultSchema = z.discriminatedUnion("status", [
    z
        .object({
        status: z.enum(["invalid", "incomplete", "conflict", "ineligible"]),
        diagnostics: z.array(companyDraftDiagnosticSchema).min(1),
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
        authoring_file: companyAuthoringFileSchema,
        diagnostics: z.array(companyDraftDiagnosticSchema).max(20),
    })
        .strict(),
]);
const startupCreditsVerificationCaseIdSchema = z.string().regex(/^hvc_[a-f0-9]{64}$/u);
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
const startupCreditsExistingRecordReferenceSchema = startupCreditsExistingRecordTargetSchema
    .omit({ base_release_id: true })
    .strict();
/**
 * A data repository's pull request adding a company below Sourcey's standing bar, with its Offer.
 * The order serves the pull request's own submission and its exact Entity and Offer; the head is
 * where it was bought. A later head keeps the service while it keeps that Entity and Offer, and
 * the person verifies each head again.
 */
export const startupCreditsGitPullRequestTargetSchema = z
    .object({
    kind: z.literal("git_pull_request"),
    base_release_id: digestSchema,
    entity_id: entityIdSchema,
    program_id: programIdSchema.optional(),
    offer_id: offerIdSchema,
    pull_request: z
        .object({
        repository_id: z.string().regex(/^[1-9][0-9]*$/u),
        repository: z.string().regex(/^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/u),
        pull_request_number: z.number().int().positive(),
        submission_id: z.string().regex(/^pull_[a-f0-9]{64}$/u),
        head_sha: z.string().regex(/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u),
    })
        .strict(),
    standing_result: standingResultSchema,
    /** The canonical Entity authoring at the head it was bought at. */
    authoring_digest: digestSchema,
    /** The exact Entity and Offer revisions that head compiles to. */
    revisions: z
        .object({ entity_revision_digest: digestSchema, offer_revision_digest: digestSchema })
        .strict(),
    /** What that head names, as the person verifying it reads it. */
    labels: z
        .object({
        company_name: z.string().trim().min(1).max(240),
        company_site_url: z.url({ protocol: /^https$/u }),
        offer_title: z.string().trim().min(1).max(240),
        offer_url: z.url({ protocol: /^https$/u }),
    })
        .strict(),
})
    .strict();
/**
 * The exact pull request head a person verified: its submission revision, and the Entity and
 * Offer revisions that head compiles to, which the verification attests and nothing later.
 */
export const startupCreditsReviewedPullRequestRevisionSchema = z
    .object({
    submission_id: z.string().regex(/^pull_[a-f0-9]{64}$/u),
    revision_digest: digestSchema,
    head_sha: z.string().regex(/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u),
    entity_revision_digest: digestSchema,
    offer_revision_digest: digestSchema,
})
    .strict();
const startupCreditsVerificationIntentTargetSchema = z.discriminatedUnion("kind", [
    startupCreditsNewListingIntentTargetSchema,
    startupCreditsExistingRecordTargetSchema,
    startupCreditsGitPullRequestTargetSchema,
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
    const eligibilityDigest = intent.target.kind === "existing_record"
        ? digest(intent.target)
        : intent.target.standing_result.result_digest;
    if (intent.billing.eligibility_digest !== eligibilityDigest) {
        context.addIssue({
            code: "custom",
            path: ["billing", "eligibility_digest"],
            message: "The billing eligibility binding must be the exact verification target.",
        });
    }
    const bindings = new Map(intent.billing.policy_bindings.map((binding) => [binding.role, binding.policy_digest]));
    if (intent.target.kind !== "existing_record" &&
        bindings.get("standing") !== intent.target.standing_result.policy_digest) {
        context.addIssue({
            code: "custom",
            path: ["billing", "policy_bindings"],
            message: "The standing policy binding must match the exact standing result.",
        });
    }
    if (intent.target.kind === "git_pull_request" &&
        intent.target.standing_result.route !== "human_verification_required") {
        context.addIssue({
            code: "custom",
            path: ["target", "standing_result", "route"],
            message: "A pull request buys verification only for a company below the standing bar.",
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
const startupCreditsOfferTermsFailureReasonSchema = z.enum([
    "terms_mismatch",
    "source_unavailable",
    "insufficient_evidence",
]);
const startupCreditsOfferTermsReviewDecisionSchema = z.discriminatedUnion("status", [
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
        basis: reviewEvidenceBasisSchema,
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
    entity_identity: companyIdentityReviewDecisionSchema,
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
        basis: reviewEvidenceBasisSchema,
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
const startupCreditsReviewCompletionTargetSchema = z.discriminatedUnion("kind", [
    companyVerificationNewListingTargetSchema
        .extend({ program_id: programIdSchema.optional(), offer_id: offerIdSchema })
        .strict(),
    startupCreditsExistingRecordTargetSchema,
    startupCreditsGitPullRequestTargetSchema,
]);
export const startupCreditsReviewCompletionReceiptCoreSchema = completedCompanyReviewCoreSchema
    .safeExtend({
    receipt_contract: z.literal("sourcey.startup-credits-review-completion/v1alpha1"),
    target: startupCreditsReviewCompletionTargetSchema,
    /** For a pull request, the exact head the person verified, which may follow the one bought. */
    reviewed_revision: startupCreditsReviewedPullRequestRevisionSchema.optional(),
    offer_terms: offerTermsReviewOutcomeSchema,
})
    .strict()
    .superRefine((receipt, context) => {
    if ((receipt.target.kind === "git_pull_request") !== (receipt.reviewed_revision !== undefined) ||
        (receipt.target.kind === "git_pull_request" &&
            receipt.reviewed_revision?.submission_id !== receipt.target.pull_request.submission_id)) {
        context.addIssue({
            code: "custom",
            path: ["reviewed_revision"],
            message: "A pull request's completion names exactly the head its person verified.",
        });
    }
    if (receipt.offer_terms.entity_id !== receipt.target.entity_id ||
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
const startupCreditsEntityIconInputSchema = z
    .object({
    source: entityAssetSubmissionSourceSchema,
    trademark_owner: z.string().trim().min(1).max(240),
    relationship: z.enum(["vendor-representative", "community-contributor"]),
})
    .strict();
const startupCreditsExpectedDraftSchema = z
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
const startupCreditsExistingRecordReviewTargetSchema = startupCreditsExistingRecordReferenceSchema
    .extend({ expected_purchase_preview_digest: digestSchema })
    .strict();
export const startupCreditsExistingRecordReviewPreparationRequestSchema = z
    .object({ target: startupCreditsExistingRecordReferenceSchema })
    .strict();
const startupCreditsExistingRecordReviewPreparationSchema = z
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
/** One exact pull request head of a Sourcey data repository, as its buyer names it. */
export const startupCreditsGitPullRequestReferenceSchema = z
    .object({
    kind: z.literal("git_pull_request"),
    repository: z.string().regex(/^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/u),
    pull_request_number: z.number().int().positive(),
    head_sha: z.string().regex(/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u),
})
    .strict();
const startupCreditsGitPullRequestReviewTargetSchema = startupCreditsGitPullRequestReferenceSchema
    .extend({ expected_purchase_preview_digest: digestSchema })
    .strict();
export const startupCreditsGitPullRequestReviewPreparationRequestSchema = z
    .object({ target: startupCreditsGitPullRequestReferenceSchema })
    .strict();
/** What one held pull request head's verification buys, before checkout. */
export const startupCreditsGitPullRequestReviewPreparationResponseSchema = z
    .object({
    data: z
        .object({
        target: startupCreditsGitPullRequestReviewTargetSchema,
        purchase_preview: startupCreditsPurchasePreviewSchema,
        offer: startupCreditsGitPullRequestTargetSchema,
    })
        .strict(),
})
    .strict();
const pullRequestHeadSchema = z.string().regex(/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u);
/** Which pull request of a Sourcey data repository a reader asks about. */
export const startupCreditsPullRequestQuerySchema = z
    .object({
    repository: z.string().regex(/^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/u),
    pull: z.coerce.number().int().positive().max(Number.MAX_SAFE_INTEGER),
})
    .strict();
/**
 * Where one pull request stands with Sourcey, for its contributor's page: its current head, what
 * Sourcey's admission concluded for it, and its company verification. The buyer's own order is
 * shown only to the account that bought it.
 */
export const startupCreditsPullRequestStatusSchema = z
    .object({
    pull_request: z
        .object({
        repository: z.string().regex(/^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/u),
        pull_request_number: z.number().int().positive(),
        url: z.url({ protocol: /^https$/u }),
        /** Open while Sourcey reads it as an open pull request; merged once admission merged it. */
        state: z.enum(["open", "merged", "closed"]),
        /** The head Sourcey checks now; null once closed. */
        head_sha: pullRequestHeadSchema.nullable(),
    })
        .strict(),
    /** What admission concluded for the current head, or for the last head it checked. */
    result: admissionSummarySchema.nullable(),
    /** The current head is being checked, so `result` is for an earlier head or absent. */
    checking: z.boolean(),
    verification: z
        .object({
        phase: z.enum(["checkout_open", "paid", "approved", "refused", "refunding", "refunded"]),
        company: z.string().trim().min(1).max(240),
        /** The head a person approved or refused. */
        reviewed_head_sha: pullRequestHeadSchema.nullable(),
        checkout_expires_at: instantSchema.nullable(),
        /** When the person's decision is due, once paid. */
        due_at: instantSchema.nullable(),
        /** The person's finding, when they refused it. */
        finding: z.string().trim().min(1).max(2_000).nullable(),
        refund_reason: z
            .string()
            .regex(/^[a-z0-9]+(?:_[a-z0-9]+)*$/u)
            .nullable(),
    })
        .strict()
        .nullable(),
    /** The signed-in reader's own purchase for it. */
    purchase: z
        .object({
        order_id: z.string().regex(/^ord_[a-f0-9]{64}$/u),
        checkout_url: z.url({ protocol: /^https$/u }).nullable(),
    })
        .strict()
        .nullable(),
})
    .strict();
export const startupCreditsPullRequestStatusResponseSchema = z
    .object({ data: startupCreditsPullRequestStatusSchema })
    .strict();
const startupCreditsX402ReviewTargetSchema = z.discriminatedUnion("kind", [
    startupCreditsNewListingReviewTargetCoreSchema,
    startupCreditsExistingRecordReviewTargetSchema,
    startupCreditsGitPullRequestReviewTargetSchema,
]);
const startupCreditsStripeReviewTargetSchema = z.discriminatedUnion("kind", [
    startupCreditsNewListingReviewTargetCoreSchema
        .extend({ expected_draft: startupCreditsExpectedDraftSchema })
        .strict(),
    startupCreditsExistingRecordReviewTargetSchema,
    startupCreditsGitPullRequestReviewTargetSchema,
]);
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
const startupCreditsVerificationPublicStateSchema = z.enum([
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
//# sourceMappingURL=index.js.map