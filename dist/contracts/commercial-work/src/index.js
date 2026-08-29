import { z } from "zod";
import { DIGEST_PATTERN, ENTITY_ID_PATTERN, OFFER_ID_PATTERN, PROGRAM_ID_PATTERN, } from "../../../modules/primitives/src/index.js";
import { commercialOrderProjectionSchema } from "../../billing/src/index.js";
import { fundedWorkIntentEnvelopeSchema } from "../../funded-work/src/index.js";
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
export const startupCreditsPriceLookupKey = "startup-offer-human-verification-usd-25";
export const startupCreditsServicePolicySchema = z
    .object({
    policy_contract: z.literal("sourcey.startup-credits-verification-service-policy/v1alpha1"),
    product_code: z.literal(startupCreditsProductCode),
    price_lookup_key: z.literal(startupCreditsPriceLookupKey),
    price: z.object({ currency: z.literal("usd"), minor_units: z.literal(2_500) }).strict(),
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
    failed_review_refundable: z.literal(false),
    sla_miss_refundable: z.literal(true),
    sourcey_error_refundable: z.literal(true),
    payment_changes_truth_or_admission: z.literal(false),
})
    .strict();
export const startupCreditsVerificationMethodPolicySchema = z
    .object({
    policy_contract: z.literal("sourcey.startup-credits-verification-method/v1alpha1"),
    scope: z.literal("one-entity-one-offer"),
    evidence_authority: z.literal("first-party-public-sources"),
    reviewer_decides_from_admitted_evidence: z.literal(true),
    payment_can_select_findings: z.literal(false),
    payment_can_admit_or_publish: z.literal(false),
})
    .strict();
export const startupCreditsPurchaseDisclosureSchema = z
    .object({
    disclosure_contract: z.literal("sourcey.startup-credits-purchase-disclosure/v1alpha1"),
    statement: z.literal("Payment funds one human verification run. It does not buy admission, alter facts or ranking, guarantee a pass, or authorize publication."),
})
    .strict();
const startupCreditsPurchasePreviewCoreSchema = z
    .object({
    preview_contract: z.literal("sourcey.startup-credits-purchase-preview/v1alpha1"),
    product_code: z.literal(startupCreditsProductCode),
    purchase_kind: z.literal("one_off"),
    price_lookup_key: z.literal(startupCreditsPriceLookupKey),
    price: z.object({ currency: z.literal("usd"), minor_units: z.literal(2_500) }).strict(),
    work_scope: z.literal("one-entity-one-offer"),
    service_level: z
        .object({
        starts_after: z.literal("settled-payment"),
        business_days: z.literal(3),
        time_zone: z.literal("Australia/Sydney"),
    })
        .strict(),
    refunds: z
        .object({
        failed_review_refundable: z.literal(false),
        service_level_missed_refundable: z.literal(true),
        sourcey_error_refundable: z.literal(true),
    })
        .strict(),
    disclosure: startupCreditsPurchaseDisclosureSchema.shape.statement,
    policy_bindings: z
        .object({
        purchase_disclosure: digestSchema,
        service: digestSchema,
        verification_method: digestSchema,
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
    "claim_or_fund",
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
export const startupCreditsDraftRequestSchema = z
    .object({
    standing_result: standingResultSchema,
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
    .strict();
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
export const startupCreditsFundedWorkIntentSchema = z
    .object({
    product_intent_contract: z.literal("sourcey.startup-offer-human-verification-intent/v1alpha1"),
    billing: fundedWorkIntentEnvelopeSchema,
    submission: z
        .object({
        submission_id: z.string().regex(/^sub_[a-f0-9]{64}$/u),
        payload_digest: digestSchema,
        authorization_policy: z.literal("proposal"),
    })
        .strict(),
    standing_result: standingResultSchema,
    authoring_file_digest: digestSchema,
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
    if (intent.billing.eligibility_digest !== intent.standing_result.result_digest) {
        context.addIssue({
            code: "custom",
            path: ["billing", "eligibility_digest"],
            message: "The billing eligibility binding must be the exact standing result.",
        });
    }
    const bindings = new Map(intent.billing.policy_bindings.map((binding) => [binding.role, binding.policy_digest]));
    if (bindings.get("standing") !== intent.standing_result.policy_digest) {
        context.addIssue({
            code: "custom",
            path: ["billing", "policy_bindings"],
            message: "The standing policy binding must match the exact standing result.",
        });
    }
    if (bindings.get("purchase-disclosure") !== intent.disclosure_digest) {
        context.addIssue({
            code: "custom",
            path: ["billing", "policy_bindings"],
            message: "The purchase disclosure binding must match the exact product disclosure.",
        });
    }
    for (const role of ["service", "verification-method"]) {
        if (bindings.has(role))
            continue;
        context.addIssue({
            code: "custom",
            path: ["billing", "policy_bindings"],
            message: `The ${role} policy binding is required.`,
        });
    }
});
export const startupCreditsReviewRequestIdSchema = z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9_-]{32,128}$/u);
export const startupCreditsReviewRequestSchema = z
    .object({
    request_id: startupCreditsReviewRequestIdSchema,
    draft: startupCreditsDraftRequestSchema,
})
    .strict();
export const startupCreditsReviewResponseSchema = z
    .object({
    data: z
        .object({
        request_id: startupCreditsReviewRequestIdSchema,
        submission_id: z.string().regex(/^sub_[a-f0-9]{64}$/u),
        order: commercialOrderProjectionSchema,
        status_url: z.url({ protocol: /^https$/u }),
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
    floor_price: z.object({ currency: z.literal("usd"), minor_units: z.literal(2_500) }).strict(),
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
const exampleAttemptId = `pat_${"0".repeat(64)}`;
const exampleSubmissionId = `sub_${"0".repeat(64)}`;
const exampleRequestId = `sourcey_example_${"0".repeat(32)}`;
export const startupCreditsReviewProductDescriptor = payableProductDescriptorSchema.parse({
    descriptor_contract: "sourcey.payable-product-descriptor/v1alpha1",
    product_code: startupCreditsProductCode,
    price_lookup_key: startupCreditsPriceLookupKey,
    operation_id: "createStartupCreditsReview",
    method: "POST",
    path: "/v1/startup-credits/reviews",
    success_status: 202,
    service_name: "Sourcey Startup Review",
    description: "Submit a startup credit or startup program for evidence-backed human review and receive a durable decision receipt. Payment funds review and never guarantees publication.",
    tags: ["startup-credits", "startup-programs", "catalog-listing", "human-review", "sourcey"],
    floor_price: { currency: "usd", minor_units: 2_500 },
    service_policy_url: "https://sourcey.com/startup-credits",
    refund_policy_url: "https://sourcey.com/terms",
    input_example: {
        request_id: exampleRequestId,
        draft: {
            standing_result: {
                result_contract: "sourcey.standing-result/v1alpha1",
                policy_digest: exampleDigest,
                evidence_digest: exampleDigest,
                registrable_domain: "example.invalid",
                official_source_url: "https://example.invalid/startups",
                route: "claim_or_fund",
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
    output_example: {
        data: {
            request_id: exampleRequestId,
            submission_id: exampleSubmissionId,
            order: {
                order: {
                    order_contract: "sourcey.commercial-order/v1alpha1",
                    order_id: exampleOrderId,
                    actor_ref: `request:${exampleRequestId}`,
                    product_code: startupCreditsProductCode,
                    purchase_kind: "one_off",
                    product_definition_digest: exampleDigest,
                    funded_work_intent_id: `fwi_${"0".repeat(64)}`,
                    funded_work_intent_digest: exampleDigest,
                    owner_work_ref: exampleSubmissionId,
                    amount: { currency: "usd", minor_units: 2_500 },
                    payment_state: "paid",
                    payment_attempt_id: exampleAttemptId,
                    work_state: "queued",
                    paid_at: "2026-01-01T00:00:01.000Z",
                    sla_due_at: "2026-01-06T23:59:59.000+11:00",
                    refund_reason: null,
                    refund_requested_at: null,
                    refunded_at: null,
                    fulfilment_receipt_digest: null,
                    failure_receipt_digest: null,
                    created_at: "2026-01-01T00:00:00.000Z",
                    updated_at: "2026-01-01T00:00:01.000Z",
                },
                payment_attempt: {
                    attempt_contract: "sourcey.payment-attempt/v1alpha1",
                    attempt_id: exampleAttemptId,
                    order_id: exampleOrderId,
                    request_binding_digest: exampleDigest,
                    amount: { currency: "usd", minor_units: 2_500 },
                    rail: "x402",
                    state: "settled",
                    resource: "https://sourcey.invalid/v1/startup-credits/reviews",
                    challenge_digest: exampleDigest,
                    payment_payload_digest: exampleDigest,
                    payment_requirements_digest: exampleDigest,
                    payment_ref: "runx:x402-payment:example",
                    verification_ref: "runx:payment-verification:example",
                    settlement_ref: "0x0000000000000000000000000000000000000000000000000000000000000000",
                    payer_ref: "eip155:8453:0x0000000000000000000000000000000000000000",
                    refund_ref: null,
                    expires_at: "2026-01-01T01:00:00.000Z",
                    created_at: "2026-01-01T00:00:00.000Z",
                    updated_at: "2026-01-01T00:00:01.000Z",
                },
            },
            status_url: `https://sourcey.invalid/account/work/${exampleOrderId}`,
        },
    },
});
export function isFirstPartyUrlForDomain(value, domain) {
    const hostname = new URL(value).hostname.toLowerCase().replace(/\.$/u, "");
    const canonicalDomain = domainNameSchema.parse(domain);
    return hostname === canonicalDomain || hostname.endsWith(`.${canonicalDomain}`);
}
//# sourceMappingURL=index.js.map