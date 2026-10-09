import { z } from "zod";
import { admissionSummarySchema } from "../../admission-results/src/index.js";
import { entityAssetSubmissionSourceSchema } from "../../assets/src/index.js";
import { fundedWorkIntentEnvelopeSchema } from "../../funded-work/src/index.js";
import { startupCreditsPrice, startupCreditsPriceLookupKey, startupCreditsPriceSchema, startupCreditsProductCode, startupCreditsPurchasePreviewSchema, } from "./product.js";
import { startupCreditsDraftRequestSchema, startupCreditsExistingRecordReferenceSchema, startupCreditsGitPullRequestTargetSchema, startupCreditsVerificationCaseIdSchema, } from "./purchase.js";
import { digestSchema, instantSchema } from "./values.js";
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
//# sourceMappingURL=requests.js.map