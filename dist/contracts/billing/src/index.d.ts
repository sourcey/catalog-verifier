import { z } from "zod";
export declare const commercialOrderIdSchema: z.ZodString;
export declare const paymentRailSchema: z.ZodEnum<{
    stripe: "stripe";
    x402: "x402";
}>;
export type PaymentRail = z.infer<typeof paymentRailSchema>;
export declare const commercialProductDefinitionSchema: z.ZodObject<{
    product_code: z.ZodString;
    purchase_kind: z.ZodLiteral<"one_off">;
    price_lookup_key: z.ZodString;
    amount: z.ZodObject<{
        currency: z.ZodString;
        minor_units: z.ZodNumber;
    }, z.core.$strict>;
    checkout_line_item_name: z.ZodString;
    payment_rails: z.ZodArray<z.ZodEnum<{
        stripe: "stripe";
        x402: "x402";
    }>>;
    maximum_open_work: z.ZodNumber;
}, z.core.$strict>;
export declare const stripePaymentAttemptSchema: z.ZodObject<{
    attempt_contract: z.ZodLiteral<"sourcey.payment-attempt/v1alpha1">;
    attempt_id: z.ZodString;
    order_id: z.ZodString;
    request_binding_digest: z.ZodString;
    amount: z.ZodObject<{
        currency: z.ZodString;
        minor_units: z.ZodNumber;
    }, z.core.$strict>;
    state: z.ZodEnum<{
        verified: "verified";
        failed: "failed";
        prepared: "prepared";
        payment_pending: "payment_pending";
        settlement_pending: "settlement_pending";
        settled: "settled";
        expired: "expired";
        refund_pending: "refund_pending";
        refunded: "refunded";
    }>;
    expires_at: z.ZodISODateTime;
    created_at: z.ZodISODateTime;
    updated_at: z.ZodISODateTime;
    rail: z.ZodLiteral<"stripe">;
    checkout_session_id: z.ZodNullable<z.ZodString>;
    checkout_url: z.ZodNullable<z.ZodURL>;
    payment_intent_id: z.ZodNullable<z.ZodString>;
    refund_id: z.ZodNullable<z.ZodString>;
}, z.core.$strict>;
export declare const x402PaymentAttemptSchema: z.ZodObject<{
    attempt_contract: z.ZodLiteral<"sourcey.payment-attempt/v1alpha1">;
    attempt_id: z.ZodString;
    order_id: z.ZodString;
    request_binding_digest: z.ZodString;
    amount: z.ZodObject<{
        currency: z.ZodString;
        minor_units: z.ZodNumber;
    }, z.core.$strict>;
    state: z.ZodEnum<{
        verified: "verified";
        failed: "failed";
        prepared: "prepared";
        payment_pending: "payment_pending";
        settlement_pending: "settlement_pending";
        settled: "settled";
        expired: "expired";
        refund_pending: "refund_pending";
        refunded: "refunded";
    }>;
    expires_at: z.ZodISODateTime;
    created_at: z.ZodISODateTime;
    updated_at: z.ZodISODateTime;
    rail: z.ZodLiteral<"x402">;
    resource: z.ZodURL;
    challenge_digest: z.ZodString;
    payment_payload_digest: z.ZodString;
    payment_requirements_digest: z.ZodString;
    payment_ref: z.ZodNullable<z.ZodString>;
    verification_ref: z.ZodNullable<z.ZodString>;
    settlement_ref: z.ZodNullable<z.ZodString>;
    payer_ref: z.ZodNullable<z.ZodString>;
    refund_ref: z.ZodNullable<z.ZodString>;
}, z.core.$strict>;
export declare const paymentAttemptSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    attempt_contract: z.ZodLiteral<"sourcey.payment-attempt/v1alpha1">;
    attempt_id: z.ZodString;
    order_id: z.ZodString;
    request_binding_digest: z.ZodString;
    amount: z.ZodObject<{
        currency: z.ZodString;
        minor_units: z.ZodNumber;
    }, z.core.$strict>;
    state: z.ZodEnum<{
        verified: "verified";
        failed: "failed";
        prepared: "prepared";
        payment_pending: "payment_pending";
        settlement_pending: "settlement_pending";
        settled: "settled";
        expired: "expired";
        refund_pending: "refund_pending";
        refunded: "refunded";
    }>;
    expires_at: z.ZodISODateTime;
    created_at: z.ZodISODateTime;
    updated_at: z.ZodISODateTime;
    rail: z.ZodLiteral<"stripe">;
    checkout_session_id: z.ZodNullable<z.ZodString>;
    checkout_url: z.ZodNullable<z.ZodURL>;
    payment_intent_id: z.ZodNullable<z.ZodString>;
    refund_id: z.ZodNullable<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    attempt_contract: z.ZodLiteral<"sourcey.payment-attempt/v1alpha1">;
    attempt_id: z.ZodString;
    order_id: z.ZodString;
    request_binding_digest: z.ZodString;
    amount: z.ZodObject<{
        currency: z.ZodString;
        minor_units: z.ZodNumber;
    }, z.core.$strict>;
    state: z.ZodEnum<{
        verified: "verified";
        failed: "failed";
        prepared: "prepared";
        payment_pending: "payment_pending";
        settlement_pending: "settlement_pending";
        settled: "settled";
        expired: "expired";
        refund_pending: "refund_pending";
        refunded: "refunded";
    }>;
    expires_at: z.ZodISODateTime;
    created_at: z.ZodISODateTime;
    updated_at: z.ZodISODateTime;
    rail: z.ZodLiteral<"x402">;
    resource: z.ZodURL;
    challenge_digest: z.ZodString;
    payment_payload_digest: z.ZodString;
    payment_requirements_digest: z.ZodString;
    payment_ref: z.ZodNullable<z.ZodString>;
    verification_ref: z.ZodNullable<z.ZodString>;
    settlement_ref: z.ZodNullable<z.ZodString>;
    payer_ref: z.ZodNullable<z.ZodString>;
    refund_ref: z.ZodNullable<z.ZodString>;
}, z.core.$strict>], "rail">;
export declare const commercialOrderSchema: z.ZodObject<{
    order_contract: z.ZodLiteral<"sourcey.commercial-order/v1alpha1">;
    order_id: z.ZodString;
    actor_ref: z.ZodString;
    product_code: z.ZodString;
    purchase_kind: z.ZodLiteral<"one_off">;
    product_definition_digest: z.ZodString;
    funded_work_intent_id: z.ZodString;
    funded_work_intent_digest: z.ZodString;
    owner_work_ref: z.ZodString;
    amount: z.ZodObject<{
        currency: z.ZodString;
        minor_units: z.ZodNumber;
    }, z.core.$strict>;
    payment_state: z.ZodEnum<{
        payment_pending: "payment_pending";
        refund_pending: "refund_pending";
        refunded: "refunded";
        paid: "paid";
        cancelled: "cancelled";
    }>;
    payment_attempt_id: z.ZodString;
    work_state: z.ZodEnum<{
        failed: "failed";
        blocked: "blocked";
        cancelled: "cancelled";
        queued: "queued";
        in_review: "in_review";
        fulfilled: "fulfilled";
    }>;
    paid_at: z.ZodNullable<z.ZodISODateTime>;
    sla_due_at: z.ZodNullable<z.ZodISODateTime>;
    refund_reason: z.ZodNullable<z.ZodEnum<{
        scope_superseded: "scope_superseded";
        service_level_missed: "service_level_missed";
        sourcey_error: "sourcey_error";
        duplicate_charge: "duplicate_charge";
    }>>;
    refund_requested_at: z.ZodNullable<z.ZodISODateTime>;
    refunded_at: z.ZodNullable<z.ZodISODateTime>;
    fulfilment_receipt_digest: z.ZodNullable<z.ZodString>;
    failure_receipt_digest: z.ZodNullable<z.ZodString>;
    created_at: z.ZodISODateTime;
    updated_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const paymentEffectSchema: z.ZodObject<{
    effect_contract: z.ZodLiteral<"sourcey.payment-effect/v1alpha1">;
    effect_id: z.ZodString;
    order_id: z.ZodString;
    attempt_id: z.ZodString;
    rail: z.ZodEnum<{
        stripe: "stripe";
        x402: "x402";
    }>;
    kind: z.ZodEnum<{
        "attempt.prepared": "attempt.prepared";
        "payment.verified": "payment.verified";
        "payment.settlement_pending": "payment.settlement_pending";
        "payment.settled": "payment.settled";
        "payment.failed": "payment.failed";
        "refund.requested": "refund.requested";
        "refund.settlement_pending": "refund.settlement_pending";
        "refund.settled": "refund.settled";
        "refund.failed": "refund.failed";
    }>;
    provider_effect_ref: z.ZodNullable<z.ZodString>;
    provider_payload_digest: z.ZodString;
    provider_readback_digest: z.ZodNullable<z.ZodString>;
    money_state: z.ZodEnum<{
        unknown: "unknown";
        none: "none";
        moved: "moved";
    }>;
    occurred_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const commercialOrderEventSchema: z.ZodObject<{
    event_contract: z.ZodLiteral<"sourcey.commercial-order-event/v1alpha1">;
    event_id: z.ZodString;
    order_id: z.ZodString;
    kind: z.ZodEnum<{
        "payment.settled": "payment.settled";
        "payment.failed": "payment.failed";
        "refund.requested": "refund.requested";
        "refund.settled": "refund.settled";
        "order.created": "order.created";
        "payment.attempted": "payment.attempted";
        "work.authorized": "work.authorized";
        "work.started": "work.started";
        "work.fulfilled": "work.fulfilled";
        "work.failed": "work.failed";
        "order.cancelled": "order.cancelled";
    }>;
    payment_effect_id: z.ZodNullable<z.ZodString>;
    payload_digest: z.ZodString;
    occurred_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const createCommercialOrderRequestSchema: z.ZodObject<{
    funded_work_intent_id: z.ZodString;
    funded_work_intent_digest: z.ZodString;
    payment_rail: z.ZodLiteral<"stripe">;
}, z.core.$strict>;
export declare const commercialOrderProjectionSchema: z.ZodObject<{
    order: z.ZodObject<{
        order_contract: z.ZodLiteral<"sourcey.commercial-order/v1alpha1">;
        order_id: z.ZodString;
        actor_ref: z.ZodString;
        product_code: z.ZodString;
        purchase_kind: z.ZodLiteral<"one_off">;
        product_definition_digest: z.ZodString;
        funded_work_intent_id: z.ZodString;
        funded_work_intent_digest: z.ZodString;
        owner_work_ref: z.ZodString;
        amount: z.ZodObject<{
            currency: z.ZodString;
            minor_units: z.ZodNumber;
        }, z.core.$strict>;
        payment_state: z.ZodEnum<{
            payment_pending: "payment_pending";
            refund_pending: "refund_pending";
            refunded: "refunded";
            paid: "paid";
            cancelled: "cancelled";
        }>;
        payment_attempt_id: z.ZodString;
        work_state: z.ZodEnum<{
            failed: "failed";
            blocked: "blocked";
            cancelled: "cancelled";
            queued: "queued";
            in_review: "in_review";
            fulfilled: "fulfilled";
        }>;
        paid_at: z.ZodNullable<z.ZodISODateTime>;
        sla_due_at: z.ZodNullable<z.ZodISODateTime>;
        refund_reason: z.ZodNullable<z.ZodEnum<{
            scope_superseded: "scope_superseded";
            service_level_missed: "service_level_missed";
            sourcey_error: "sourcey_error";
            duplicate_charge: "duplicate_charge";
        }>>;
        refund_requested_at: z.ZodNullable<z.ZodISODateTime>;
        refunded_at: z.ZodNullable<z.ZodISODateTime>;
        fulfilment_receipt_digest: z.ZodNullable<z.ZodString>;
        failure_receipt_digest: z.ZodNullable<z.ZodString>;
        created_at: z.ZodISODateTime;
        updated_at: z.ZodISODateTime;
    }, z.core.$strict>;
    payment_attempt: z.ZodDiscriminatedUnion<[z.ZodObject<{
        attempt_contract: z.ZodLiteral<"sourcey.payment-attempt/v1alpha1">;
        attempt_id: z.ZodString;
        order_id: z.ZodString;
        request_binding_digest: z.ZodString;
        amount: z.ZodObject<{
            currency: z.ZodString;
            minor_units: z.ZodNumber;
        }, z.core.$strict>;
        state: z.ZodEnum<{
            verified: "verified";
            failed: "failed";
            prepared: "prepared";
            payment_pending: "payment_pending";
            settlement_pending: "settlement_pending";
            settled: "settled";
            expired: "expired";
            refund_pending: "refund_pending";
            refunded: "refunded";
        }>;
        expires_at: z.ZodISODateTime;
        created_at: z.ZodISODateTime;
        updated_at: z.ZodISODateTime;
        rail: z.ZodLiteral<"stripe">;
        checkout_session_id: z.ZodNullable<z.ZodString>;
        checkout_url: z.ZodNullable<z.ZodURL>;
        payment_intent_id: z.ZodNullable<z.ZodString>;
        refund_id: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        attempt_contract: z.ZodLiteral<"sourcey.payment-attempt/v1alpha1">;
        attempt_id: z.ZodString;
        order_id: z.ZodString;
        request_binding_digest: z.ZodString;
        amount: z.ZodObject<{
            currency: z.ZodString;
            minor_units: z.ZodNumber;
        }, z.core.$strict>;
        state: z.ZodEnum<{
            verified: "verified";
            failed: "failed";
            prepared: "prepared";
            payment_pending: "payment_pending";
            settlement_pending: "settlement_pending";
            settled: "settled";
            expired: "expired";
            refund_pending: "refund_pending";
            refunded: "refunded";
        }>;
        expires_at: z.ZodISODateTime;
        created_at: z.ZodISODateTime;
        updated_at: z.ZodISODateTime;
        rail: z.ZodLiteral<"x402">;
        resource: z.ZodURL;
        challenge_digest: z.ZodString;
        payment_payload_digest: z.ZodString;
        payment_requirements_digest: z.ZodString;
        payment_ref: z.ZodNullable<z.ZodString>;
        verification_ref: z.ZodNullable<z.ZodString>;
        settlement_ref: z.ZodNullable<z.ZodString>;
        payer_ref: z.ZodNullable<z.ZodString>;
        refund_ref: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>], "rail">;
}, z.core.$strict>;
/**
 * The rail-neutral order state a product may return to its purchaser. Internal
 * payment-attempt identities and provider reconciliation evidence remain in
 * Billing; callers retain the exact product, intent, money, work, SLA, refund,
 * receipt, and revision bindings needed to understand their purchase.
 */
export declare const commercialOrderStatusSchema: z.ZodObject<{
    status_contract: z.ZodLiteral<"sourcey.commercial-order-status/v1alpha1">;
    order_id: z.ZodString;
    product_code: z.ZodString;
    purchase_kind: z.ZodLiteral<"one_off">;
    product_definition_digest: z.ZodString;
    funded_work_intent_digest: z.ZodString;
    amount: z.ZodObject<{
        currency: z.ZodString;
        minor_units: z.ZodNumber;
    }, z.core.$strict>;
    payment_rail: z.ZodEnum<{
        stripe: "stripe";
        x402: "x402";
    }>;
    payment_state: z.ZodEnum<{
        payment_pending: "payment_pending";
        refund_pending: "refund_pending";
        refunded: "refunded";
        paid: "paid";
        cancelled: "cancelled";
    }>;
    work_state: z.ZodEnum<{
        failed: "failed";
        blocked: "blocked";
        cancelled: "cancelled";
        queued: "queued";
        in_review: "in_review";
        fulfilled: "fulfilled";
    }>;
    paid_at: z.ZodNullable<z.ZodISODateTime>;
    sla_due_at: z.ZodNullable<z.ZodISODateTime>;
    refund_reason: z.ZodNullable<z.ZodEnum<{
        scope_superseded: "scope_superseded";
        service_level_missed: "service_level_missed";
        sourcey_error: "sourcey_error";
        duplicate_charge: "duplicate_charge";
    }>>;
    refund_requested_at: z.ZodNullable<z.ZodISODateTime>;
    refunded_at: z.ZodNullable<z.ZodISODateTime>;
    fulfilment_receipt_digest: z.ZodNullable<z.ZodString>;
    failure_receipt_digest: z.ZodNullable<z.ZodString>;
    created_at: z.ZodISODateTime;
    updated_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const createCommercialOrderResponseSchema: z.ZodObject<{
    order: z.ZodObject<{
        order_contract: z.ZodLiteral<"sourcey.commercial-order/v1alpha1">;
        order_id: z.ZodString;
        actor_ref: z.ZodString;
        product_code: z.ZodString;
        purchase_kind: z.ZodLiteral<"one_off">;
        product_definition_digest: z.ZodString;
        funded_work_intent_id: z.ZodString;
        funded_work_intent_digest: z.ZodString;
        owner_work_ref: z.ZodString;
        amount: z.ZodObject<{
            currency: z.ZodString;
            minor_units: z.ZodNumber;
        }, z.core.$strict>;
        payment_state: z.ZodEnum<{
            payment_pending: "payment_pending";
            refund_pending: "refund_pending";
            refunded: "refunded";
            paid: "paid";
            cancelled: "cancelled";
        }>;
        payment_attempt_id: z.ZodString;
        work_state: z.ZodEnum<{
            failed: "failed";
            blocked: "blocked";
            cancelled: "cancelled";
            queued: "queued";
            in_review: "in_review";
            fulfilled: "fulfilled";
        }>;
        paid_at: z.ZodNullable<z.ZodISODateTime>;
        sla_due_at: z.ZodNullable<z.ZodISODateTime>;
        refund_reason: z.ZodNullable<z.ZodEnum<{
            scope_superseded: "scope_superseded";
            service_level_missed: "service_level_missed";
            sourcey_error: "sourcey_error";
            duplicate_charge: "duplicate_charge";
        }>>;
        refund_requested_at: z.ZodNullable<z.ZodISODateTime>;
        refunded_at: z.ZodNullable<z.ZodISODateTime>;
        fulfilment_receipt_digest: z.ZodNullable<z.ZodString>;
        failure_receipt_digest: z.ZodNullable<z.ZodString>;
        created_at: z.ZodISODateTime;
        updated_at: z.ZodISODateTime;
    }, z.core.$strict>;
    payment_attempt: z.ZodDiscriminatedUnion<[z.ZodObject<{
        attempt_contract: z.ZodLiteral<"sourcey.payment-attempt/v1alpha1">;
        attempt_id: z.ZodString;
        order_id: z.ZodString;
        request_binding_digest: z.ZodString;
        amount: z.ZodObject<{
            currency: z.ZodString;
            minor_units: z.ZodNumber;
        }, z.core.$strict>;
        state: z.ZodEnum<{
            verified: "verified";
            failed: "failed";
            prepared: "prepared";
            payment_pending: "payment_pending";
            settlement_pending: "settlement_pending";
            settled: "settled";
            expired: "expired";
            refund_pending: "refund_pending";
            refunded: "refunded";
        }>;
        expires_at: z.ZodISODateTime;
        created_at: z.ZodISODateTime;
        updated_at: z.ZodISODateTime;
        rail: z.ZodLiteral<"stripe">;
        checkout_session_id: z.ZodNullable<z.ZodString>;
        checkout_url: z.ZodNullable<z.ZodURL>;
        payment_intent_id: z.ZodNullable<z.ZodString>;
        refund_id: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        attempt_contract: z.ZodLiteral<"sourcey.payment-attempt/v1alpha1">;
        attempt_id: z.ZodString;
        order_id: z.ZodString;
        request_binding_digest: z.ZodString;
        amount: z.ZodObject<{
            currency: z.ZodString;
            minor_units: z.ZodNumber;
        }, z.core.$strict>;
        state: z.ZodEnum<{
            verified: "verified";
            failed: "failed";
            prepared: "prepared";
            payment_pending: "payment_pending";
            settlement_pending: "settlement_pending";
            settled: "settled";
            expired: "expired";
            refund_pending: "refund_pending";
            refunded: "refunded";
        }>;
        expires_at: z.ZodISODateTime;
        created_at: z.ZodISODateTime;
        updated_at: z.ZodISODateTime;
        rail: z.ZodLiteral<"x402">;
        resource: z.ZodURL;
        challenge_digest: z.ZodString;
        payment_payload_digest: z.ZodString;
        payment_requirements_digest: z.ZodString;
        payment_ref: z.ZodNullable<z.ZodString>;
        verification_ref: z.ZodNullable<z.ZodString>;
        settlement_ref: z.ZodNullable<z.ZodString>;
        payer_ref: z.ZodNullable<z.ZodString>;
        refund_ref: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>], "rail">;
}, z.core.$strict>;
export declare const commercialOrderResponseSchema: z.ZodObject<{
    order: z.ZodObject<{
        order_contract: z.ZodLiteral<"sourcey.commercial-order/v1alpha1">;
        order_id: z.ZodString;
        actor_ref: z.ZodString;
        product_code: z.ZodString;
        purchase_kind: z.ZodLiteral<"one_off">;
        product_definition_digest: z.ZodString;
        funded_work_intent_id: z.ZodString;
        funded_work_intent_digest: z.ZodString;
        owner_work_ref: z.ZodString;
        amount: z.ZodObject<{
            currency: z.ZodString;
            minor_units: z.ZodNumber;
        }, z.core.$strict>;
        payment_state: z.ZodEnum<{
            payment_pending: "payment_pending";
            refund_pending: "refund_pending";
            refunded: "refunded";
            paid: "paid";
            cancelled: "cancelled";
        }>;
        payment_attempt_id: z.ZodString;
        work_state: z.ZodEnum<{
            failed: "failed";
            blocked: "blocked";
            cancelled: "cancelled";
            queued: "queued";
            in_review: "in_review";
            fulfilled: "fulfilled";
        }>;
        paid_at: z.ZodNullable<z.ZodISODateTime>;
        sla_due_at: z.ZodNullable<z.ZodISODateTime>;
        refund_reason: z.ZodNullable<z.ZodEnum<{
            scope_superseded: "scope_superseded";
            service_level_missed: "service_level_missed";
            sourcey_error: "sourcey_error";
            duplicate_charge: "duplicate_charge";
        }>>;
        refund_requested_at: z.ZodNullable<z.ZodISODateTime>;
        refunded_at: z.ZodNullable<z.ZodISODateTime>;
        fulfilment_receipt_digest: z.ZodNullable<z.ZodString>;
        failure_receipt_digest: z.ZodNullable<z.ZodString>;
        created_at: z.ZodISODateTime;
        updated_at: z.ZodISODateTime;
    }, z.core.$strict>;
    payment_attempt: z.ZodDiscriminatedUnion<[z.ZodObject<{
        attempt_contract: z.ZodLiteral<"sourcey.payment-attempt/v1alpha1">;
        attempt_id: z.ZodString;
        order_id: z.ZodString;
        request_binding_digest: z.ZodString;
        amount: z.ZodObject<{
            currency: z.ZodString;
            minor_units: z.ZodNumber;
        }, z.core.$strict>;
        state: z.ZodEnum<{
            verified: "verified";
            failed: "failed";
            prepared: "prepared";
            payment_pending: "payment_pending";
            settlement_pending: "settlement_pending";
            settled: "settled";
            expired: "expired";
            refund_pending: "refund_pending";
            refunded: "refunded";
        }>;
        expires_at: z.ZodISODateTime;
        created_at: z.ZodISODateTime;
        updated_at: z.ZodISODateTime;
        rail: z.ZodLiteral<"stripe">;
        checkout_session_id: z.ZodNullable<z.ZodString>;
        checkout_url: z.ZodNullable<z.ZodURL>;
        payment_intent_id: z.ZodNullable<z.ZodString>;
        refund_id: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        attempt_contract: z.ZodLiteral<"sourcey.payment-attempt/v1alpha1">;
        attempt_id: z.ZodString;
        order_id: z.ZodString;
        request_binding_digest: z.ZodString;
        amount: z.ZodObject<{
            currency: z.ZodString;
            minor_units: z.ZodNumber;
        }, z.core.$strict>;
        state: z.ZodEnum<{
            verified: "verified";
            failed: "failed";
            prepared: "prepared";
            payment_pending: "payment_pending";
            settlement_pending: "settlement_pending";
            settled: "settled";
            expired: "expired";
            refund_pending: "refund_pending";
            refunded: "refunded";
        }>;
        expires_at: z.ZodISODateTime;
        created_at: z.ZodISODateTime;
        updated_at: z.ZodISODateTime;
        rail: z.ZodLiteral<"x402">;
        resource: z.ZodURL;
        challenge_digest: z.ZodString;
        payment_payload_digest: z.ZodString;
        payment_requirements_digest: z.ZodString;
        payment_ref: z.ZodNullable<z.ZodString>;
        verification_ref: z.ZodNullable<z.ZodString>;
        settlement_ref: z.ZodNullable<z.ZodString>;
        payer_ref: z.ZodNullable<z.ZodString>;
        refund_ref: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>], "rail">;
}, z.core.$strict>;
export declare const fulfilCommercialOrderRequestSchema: z.ZodObject<{
    receipt_digest: z.ZodString;
}, z.core.$strict>;
export type CommercialOrder = z.infer<typeof commercialOrderSchema>;
export type CommercialOrderEvent = z.infer<typeof commercialOrderEventSchema>;
export type CommercialProductDefinition = z.infer<typeof commercialProductDefinitionSchema>;
export type CommercialOrderStatus = z.infer<typeof commercialOrderStatusSchema>;
export type PaymentAttempt = z.infer<typeof paymentAttemptSchema>;
export type PaymentEffect = z.infer<typeof paymentEffectSchema>;
export type CommercialOrderProjection = z.infer<typeof commercialOrderProjectionSchema>;
export declare function commercialProductDefinitionDigest(definition: CommercialProductDefinition): `sha256:${string}`;
export declare function projectCommercialOrderStatus(projection: CommercialOrderProjection): CommercialOrderStatus;
export declare function buildCommercialOrderEvent(order: CommercialOrder, kind: CommercialOrderEvent["kind"], paymentEffectId: string | null, payload: unknown, occurredAt: string): CommercialOrderEvent;
export declare function buildPaymentEffect(input: Omit<PaymentEffect, "effect_id">): PaymentEffect;
//# sourceMappingURL=index.d.ts.map