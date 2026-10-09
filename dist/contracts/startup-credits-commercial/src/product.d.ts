import { z } from "zod";
export declare const startupCreditsProductCode: "startup-offer-human-verification";
export declare const startupCreditsPrice: {
    readonly currency: "usd";
    readonly minor_units: 2900;
};
export declare const startupCreditsPriceLookupKey: "startup-offer-human-verification-usd-29";
export declare const startupCreditsPurchaseDisclosureStatement: "Human verification includes publication of a supportable company record with verified status for a legitimate company. Sourcey cannot publish false, unsafe, conflicting, duplicate, or non-existent company or offer claims. Refunds apply when Sourcey cannot deliver the purchased service or misses the review deadline.";
export declare const startupCreditsPriceSchema: z.ZodObject<{
    currency: z.ZodLiteral<"usd">;
    minor_units: z.ZodLiteral<2900>;
}, z.core.$strict>;
export declare const startupCreditsServicePolicySchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.startup-credits-verification-service-policy/v1alpha1">;
    product_code: z.ZodLiteral<"startup-offer-human-verification">;
    price_lookup_key: z.ZodLiteral<"startup-offer-human-verification-usd-29">;
    price: z.ZodObject<{
        currency: z.ZodLiteral<"usd">;
        minor_units: z.ZodLiteral<2900>;
    }, z.core.$strict>;
    service_calendar: z.ZodObject<{
        time_zone: z.ZodLiteral<"Australia/Sydney">;
        business_days: z.ZodLiteral<3>;
        counting: z.ZodLiteral<"next-business-day">;
        deadline: z.ZodLiteral<"end-of-local-day">;
        holiday_dates: z.ZodArray<z.ZodISODate>;
        valid_through: z.ZodISODate;
        source_url: z.ZodLiteral<"https://www.nsw.gov.au/about-nsw/public-holidays">;
        source_observed_at: z.ZodISODateTime;
    }, z.core.$strict>;
    material_misrepresentation_refundable: z.ZodLiteral<false>;
    sla_miss_refundable: z.ZodLiteral<true>;
    sourcey_error_refundable: z.ZodLiteral<true>;
    payment_authorizes_human_verification: z.ZodLiteral<true>;
    payment_changes_truth: z.ZodLiteral<false>;
}, z.core.$strict>;
export declare const startupCreditsReviewWorkDefinitionSchema: z.ZodObject<{
    work_contract: z.ZodLiteral<"sourcey.startup-credits-review-work-definition/v1alpha1">;
    scope: z.ZodLiteral<"one-entity-one-offer">;
    passing_results: z.ZodObject<{
        entity_identity: z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            binding: z.ZodLiteral<"identity-epoch">;
        }, z.core.$strict>;
        offer_terms: z.ZodObject<{
            status: z.ZodLiteral<"checked">;
            binding: z.ZodLiteral<"exact-offer-revision">;
        }, z.core.$strict>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const startupCreditsPurchaseDisclosureSchema: z.ZodObject<{
    disclosure_contract: z.ZodLiteral<"sourcey.startup-credits-purchase-disclosure/v1alpha1">;
    statement: z.ZodLiteral<"Human verification includes publication of a supportable company record with verified status for a legitimate company. Sourcey cannot publish false, unsafe, conflicting, duplicate, or non-existent company or offer claims. Refunds apply when Sourcey cannot deliver the purchased service or misses the review deadline.">;
}, z.core.$strict>;
export declare const startupCreditsPurchasePreviewSchema: z.ZodObject<{
    preview_contract: z.ZodLiteral<"sourcey.startup-credits-purchase-preview/v1alpha1">;
    product_code: z.ZodLiteral<"startup-offer-human-verification">;
    purchase_kind: z.ZodLiteral<"one_off">;
    price_lookup_key: z.ZodLiteral<"startup-offer-human-verification-usd-29">;
    price: z.ZodObject<{
        currency: z.ZodLiteral<"usd">;
        minor_units: z.ZodLiteral<2900>;
    }, z.core.$strict>;
    work_scope: z.ZodLiteral<"one-entity-one-offer">;
    passing_results: z.ZodObject<{
        entity_identity: z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            binding: z.ZodLiteral<"identity-epoch">;
        }, z.core.$strict>;
        offer_terms: z.ZodObject<{
            status: z.ZodLiteral<"checked">;
            binding: z.ZodLiteral<"exact-offer-revision">;
        }, z.core.$strict>;
    }, z.core.$strict>;
    service_level: z.ZodObject<{
        starts_after: z.ZodLiteral<"settled-payment">;
        business_days: z.ZodLiteral<3>;
        time_zone: z.ZodLiteral<"Australia/Sydney">;
    }, z.core.$strict>;
    refunds: z.ZodObject<{
        material_misrepresentation_refundable: z.ZodLiteral<false>;
        service_level_missed_refundable: z.ZodLiteral<true>;
        sourcey_error_refundable: z.ZodLiteral<true>;
    }, z.core.$strict>;
    disclosure: z.ZodLiteral<"Human verification includes publication of a supportable company record with verified status for a legitimate company. Sourcey cannot publish false, unsafe, conflicting, duplicate, or non-existent company or offer claims. Refunds apply when Sourcey cannot deliver the purchased service or misses the review deadline.">;
    policy_bindings: z.ZodObject<{
        assurance_method: z.ZodString;
        purchase_disclosure: z.ZodString;
        service: z.ZodString;
    }, z.core.$strict>;
    preview_digest: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsExistingEntityDraftBaseSchema: z.ZodObject<{
    entity_id: z.ZodString;
    entity_revision_digest: z.ZodString;
}, z.core.$strict>;
export type StartupCreditsPurchasePreview = z.infer<typeof startupCreditsPurchasePreviewSchema>;
export type StartupCreditsServicePolicy = z.infer<typeof startupCreditsServicePolicySchema>;
//# sourceMappingURL=product.d.ts.map