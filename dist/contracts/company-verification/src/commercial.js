import { DIGEST_PATTERN } from "provenry/primitives";
import { z } from "zod";
import { ENTITY_ID_PATTERN } from "../../../modules/catalog-primitives/src/index.js";
import { standingResultSchema } from "../../company-standing/src/index.js";
import { fundedWorkIntentEnvelopeSchema } from "../../funded-work/src/index.js";
import { companyIdentityReviewDecisionSchema, completedCompanyReviewCoreSchema } from "./index.js";
/**
 * Sourcey's company-only Human Verification: a person verifies one company that falls below the
 * standing bar, with no Offer, and the verified company is published. Its records are its own
 * contracts; the Offer product's records keep theirs byte for byte.
 */
const digestSchema = z.string().regex(DIGEST_PATTERN);
const entityIdSchema = z.string().regex(ENTITY_ID_PATTERN);
const instantSchema = z.iso.datetime({ offset: true });
export const companyVerificationProductCode = "company-human-verification";
export const companyVerificationPrice = { currency: "usd", minor_units: 2_900 };
export const companyVerificationPriceLookupKey = "company-human-verification-usd-29";
export const companyVerificationPurchaseDisclosureStatement = "Human verification of a company includes publication of a supportable company record with verified status for a legitimate company. Sourcey cannot publish false, unsafe, conflicting, duplicate, or non-existent company claims. Refunds apply when Sourcey cannot deliver the purchased service or misses the review deadline.";
/** The business days a paid verification is delivered in, counted on Sydney's calendar. */
export const humanVerificationServiceCalendarSchema = z
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
});
const companyVerificationPriceSchema = z
    .object({
    currency: z.literal(companyVerificationPrice.currency),
    minor_units: z.literal(companyVerificationPrice.minor_units),
})
    .strict();
export const companyVerificationServicePolicySchema = z
    .object({
    policy_contract: z.literal("sourcey.company-verification-service-policy/v1alpha1"),
    product_code: z.literal(companyVerificationProductCode),
    price_lookup_key: z.literal(companyVerificationPriceLookupKey),
    price: companyVerificationPriceSchema,
    service_calendar: humanVerificationServiceCalendarSchema,
    material_misrepresentation_refundable: z.literal(false),
    sla_miss_refundable: z.literal(true),
    sourcey_error_refundable: z.literal(true),
    payment_authorizes_human_verification: z.literal(true),
    payment_changes_truth: z.literal(false),
})
    .strict();
export const companyVerificationWorkDefinitionSchema = z
    .object({
    work_contract: z.literal("sourcey.company-review-work-definition/v1alpha1"),
    scope: z.literal("one-entity"),
    passing_results: z
        .object({
        entity_identity: z
            .object({ status: z.literal("verified"), binding: z.literal("identity-epoch") })
            .strict(),
    })
        .strict(),
})
    .strict();
export const companyVerificationPurchaseDisclosureSchema = z
    .object({
    disclosure_contract: z.literal("sourcey.company-purchase-disclosure/v1alpha1"),
    statement: z.literal(companyVerificationPurchaseDisclosureStatement),
})
    .strict();
const companyVerificationPurchasePreviewCoreSchema = z
    .object({
    preview_contract: z.literal("sourcey.company-purchase-preview/v1alpha1"),
    product_code: z.literal(companyVerificationProductCode),
    purchase_kind: z.literal("one_off"),
    price_lookup_key: z.literal(companyVerificationPriceLookupKey),
    price: companyVerificationPriceSchema,
    work_scope: z.literal("one-entity"),
    passing_results: companyVerificationWorkDefinitionSchema.shape.passing_results,
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
    disclosure: companyVerificationPurchaseDisclosureSchema.shape.statement,
    policy_bindings: z
        .object({
        assurance_method: digestSchema,
        purchase_disclosure: digestSchema,
        service: digestSchema,
    })
        .strict(),
})
    .strict();
export const companyVerificationPurchasePreviewSchema = companyVerificationPurchasePreviewCoreSchema
    .safeExtend({ preview_digest: digestSchema })
    .strict();
/**
 * A data repository's pull request adding a company alone (no Offer) below Sourcey's standing bar.
 * The order serves the pull request's own submission and its exact Entity; the head is where it
 * was bought. A later head keeps the service while it keeps that Entity, and the person verifies
 * each head again.
 */
export const companyVerificationGitPullRequestTargetSchema = z
    .object({
    kind: z.literal("git_pull_request"),
    base_release_id: digestSchema,
    entity_id: entityIdSchema,
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
    /** The exact Entity revision that head compiles to. */
    revisions: z.object({ entity_revision_digest: digestSchema }).strict(),
    /** What that head names, as the person verifying it reads it. */
    labels: z
        .object({
        company_name: z.string().trim().min(1).max(240),
        company_site_url: z.url({ protocol: /^https$/u }),
    })
        .strict(),
})
    .strict();
/** The exact pull request head a person verified, and the Entity revision it compiles to. */
export const companyVerificationReviewedRevisionSchema = z
    .object({
    submission_id: z.string().regex(/^pull_[a-f0-9]{64}$/u),
    revision_digest: digestSchema,
    head_sha: z.string().regex(/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u),
    entity_revision_digest: digestSchema,
})
    .strict();
export const companyVerificationFundedWorkIntentSchema = z
    .object({
    product_intent_contract: z.literal("sourcey.company-human-verification-intent/v1alpha1"),
    verification_case_id: z.string().regex(/^hvc_[a-f0-9]{64}$/u),
    billing: fundedWorkIntentEnvelopeSchema,
    target: companyVerificationGitPullRequestTargetSchema,
    purchase_preview_digest: digestSchema,
    disclosure_digest: digestSchema,
    product_intent_digest: digestSchema,
})
    .strict()
    .superRefine((intent, context) => {
    const issue = (path, message) => context.addIssue({ code: "custom", path, message });
    const { billing, target } = intent;
    if (billing.product_code !== companyVerificationProductCode) {
        issue(["billing", "product_code"], "Company verification uses its own product code.");
    }
    if (billing.price_lookup_key !== companyVerificationPriceLookupKey) {
        issue(["billing", "price_lookup_key"], "Company verification uses its own price key.");
    }
    if (billing.work_class !== "human-verification") {
        issue(["billing", "work_class"], "Company verification remains human verification.");
    }
    if (target.standing_result.route !== "human_verification_required") {
        issue(["target", "standing_result", "route"], "A company is verified for payment only when it falls below the standing bar.");
    }
    if (billing.eligibility_digest !== target.standing_result.result_digest) {
        issue(["billing", "eligibility_digest"], "Billing binds the exact standing result.");
    }
    const bindings = new Map(billing.policy_bindings.map((b) => [b.role, b.policy_digest]));
    if (bindings.get("standing") !== target.standing_result.policy_digest) {
        issue(["billing", "policy_bindings"], "The standing binding matches the standing result.");
    }
    if (bindings.get("purchase-disclosure") !== intent.disclosure_digest) {
        issue(["billing", "policy_bindings"], "The disclosure binding matches the disclosure.");
    }
    for (const role of ["assurance-method", "service"]) {
        if (!bindings.has(role)) {
            issue(["billing", "policy_bindings"], `The ${role} policy binding is required.`);
        }
    }
    if (billing.owner_work_ref !== intent.verification_case_id ||
        billing.base_release_id !== target.base_release_id ||
        billing.subject.entity_id !== target.entity_id ||
        billing.subject.program_id !== undefined ||
        billing.subject.offer_id !== undefined) {
        issue(["billing"], "Billing binds this exact verification case and its company alone.");
    }
});
/** What a person records verifying a company alone: its identity, and nothing about an Offer. */
export const companyVerificationReviewDecisionSchema = z
    .object({ entity_identity: companyIdentityReviewDecisionSchema })
    .strict();
export const companyVerificationReviewCompletionReceiptCoreSchema = completedCompanyReviewCoreSchema
    .safeExtend({
    receipt_contract: z.literal("sourcey.company-review-completion/v1alpha1"),
    target: companyVerificationGitPullRequestTargetSchema,
    /** The exact head the person verified, which may follow the one bought. */
    reviewed_revision: companyVerificationReviewedRevisionSchema,
})
    .strict()
    .superRefine((receipt, context) => {
    if (receipt.reviewed_revision.submission_id !== receipt.target.pull_request.submission_id) {
        context.addIssue({
            code: "custom",
            path: ["reviewed_revision"],
            message: "A pull request's completion names exactly the head its person verified.",
        });
    }
});
export const companyVerificationReviewCompletionReceiptSchema = companyVerificationReviewCompletionReceiptCoreSchema
    .safeExtend({ receipt_digest: digestSchema })
    .strict();
//# sourceMappingURL=commercial.js.map