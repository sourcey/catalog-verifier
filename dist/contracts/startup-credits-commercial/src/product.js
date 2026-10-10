import { z } from "zod";
import { humanVerificationServiceCalendarSchema } from "../../company-verification/src/commercial.js";
import { digestSchema, entityIdSchema, instantSchema } from "./values.js";
export const startupCreditsProductCode = "startup-offer-human-verification";
export const startupCreditsPrice = { currency: "usd", minor_units: 2_900 };
export const startupCreditsPriceLookupKey = "startup-offer-human-verification-usd-29";
export const startupCreditsPurchaseDisclosureStatement = "Human verification includes publication of a supportable company record with verified status for a legitimate company. Sourcey cannot publish false, unsafe, conflicting, duplicate, or non-existent company or offer claims. Refunds apply when Sourcey cannot deliver the purchased service or misses the review deadline.";
export const startupCreditsPriceSchema = z
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
    service_calendar: humanVerificationServiceCalendarSchema,
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
export const startupCreditsExistingEntityDraftBaseSchema = z
    .object({
    entity_id: entityIdSchema,
    entity_revision_digest: digestSchema,
})
    .strict();
//# sourceMappingURL=product.js.map