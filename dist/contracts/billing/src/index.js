import { digest } from "provenry/primitives";
import { z } from "zod";
import { commercialPriceLookupKeySchema, commercialProductCodeSchema, fundedWorkIntentEnvelopeSchema, } from "../../funded-work/src/index.js";
const digestSchema = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const instantSchema = z.iso.datetime({ offset: true });
export const commercialOrderIdSchema = z.string().regex(/^ord_[a-f0-9]{64}$/u);
const paymentAttemptIdSchema = z.string().regex(/^pat_[a-f0-9]{64}$/u);
const paymentRailSchema = z.enum(["stripe", "x402"]);
export const commercialProductDefinitionSchema = z
    .object({
    product_code: commercialProductCodeSchema,
    purchase_kind: z.literal("one_off"),
    price_lookup_key: commercialPriceLookupKeySchema,
    amount: z
        .object({
        currency: z.string().regex(/^[a-z]{3}$/u),
        minor_units: z.number().int().positive().max(100_000_000),
    })
        .strict(),
    checkout_line_item_name: z.string().trim().min(1).max(127),
    payment_rails: z.array(paymentRailSchema).min(1).max(paymentRailSchema.options.length),
    maximum_open_work: z.number().int().positive().max(10_000),
})
    .strict()
    .superRefine((definition, context) => {
    const expected = paymentRailSchema.options.filter((rail) => definition.payment_rails.includes(rail));
    if (new Set(definition.payment_rails).size !== definition.payment_rails.length ||
        expected.some((rail, index) => definition.payment_rails[index] !== rail)) {
        context.addIssue({
            code: "custom",
            path: ["payment_rails"],
            message: "Payment rails must be unique and in canonical registry order.",
        });
    }
});
const paymentAttemptCoreSchema = z.object({
    attempt_contract: z.literal("sourcey.payment-attempt/v1alpha1"),
    attempt_id: paymentAttemptIdSchema,
    order_id: commercialOrderIdSchema,
    request_binding_digest: digestSchema,
    amount: commercialProductDefinitionSchema.shape.amount,
    state: z.enum([
        "prepared",
        "payment_pending",
        "verified",
        "settlement_pending",
        "settled",
        "failed",
        "expired",
        "refund_pending",
        "refunded",
    ]),
    expires_at: instantSchema,
    created_at: instantSchema,
    updated_at: instantSchema,
});
export const stripePaymentAttemptSchema = paymentAttemptCoreSchema
    .extend({
    rail: z.literal("stripe"),
    checkout_session_id: z.string().trim().min(1).max(255).nullable(),
    checkout_url: z.url({ protocol: /^https$/u }).nullable(),
    payment_intent_id: z.string().trim().min(1).max(255).nullable(),
    refund_id: z.string().trim().min(1).max(255).nullable(),
})
    .strict()
    .superRefine((attempt, context) => {
    if (attempt.state !== "prepared" && attempt.checkout_session_id === null) {
        context.addIssue({
            code: "custom",
            message: "A Stripe attempt past preparation requires its hosted Checkout identity.",
        });
    }
    // Payment can still be processing after hosted Checkout has closed.
    // The session identity is authoritative; its temporary URL is not.
    if (["verified", "settlement_pending", "settled", "refund_pending", "refunded"].includes(attempt.state) &&
        attempt.payment_intent_id === null) {
        context.addIssue({
            code: "custom",
            message: "A verified Stripe attempt requires its payment intent identity.",
        });
    }
    if (attempt.state === "refunded" && attempt.refund_id === null) {
        context.addIssue({
            code: "custom",
            message: "A completed Stripe refund requires its refund identity.",
        });
    }
    if (!["refund_pending", "refunded"].includes(attempt.state) && attempt.refund_id !== null) {
        context.addIssue({
            code: "custom",
            message: "A Stripe refund identity is valid only during or after refund processing.",
        });
    }
});
export const x402PaymentAttemptSchema = paymentAttemptCoreSchema
    .extend({
    rail: z.literal("x402"),
    resource: z.url({ protocol: /^https$/u }),
    challenge_digest: digestSchema,
    payment_payload_digest: digestSchema,
    payment_requirements_digest: digestSchema,
    payment_ref: z.string().trim().min(1).max(1_024).nullable(),
    verification_ref: z.string().trim().min(1).max(1_024).nullable(),
    settlement_ref: z.string().trim().min(1).max(1_024).nullable(),
    payer_ref: z.string().trim().min(1).max(1_024).nullable(),
    refund_ref: z.string().trim().min(1).max(1_024).nullable(),
})
    .strict()
    .superRefine((attempt, context) => {
    if (["settlement_pending", "verified", "settled", "refund_pending", "refunded"].includes(attempt.state) &&
        attempt.payment_ref === null) {
        context.addIssue({
            code: "custom",
            message: "An in-flight x402 settlement requires its hosted payment identity.",
        });
    }
    if (["verified", "settled", "refund_pending", "refunded"].includes(attempt.state) &&
        (attempt.verification_ref === null || attempt.payer_ref === null)) {
        context.addIssue({
            code: "custom",
            message: "An admitted x402 payment requires facilitator verification and payer identity.",
        });
    }
    if (["settled", "refund_pending", "refunded"].includes(attempt.state) &&
        attempt.settlement_ref === null) {
        context.addIssue({
            code: "custom",
            message: "A settled x402 payment requires its settlement identity.",
        });
    }
    if (attempt.state === "refunded" && attempt.refund_ref === null) {
        context.addIssue({
            code: "custom",
            message: "A completed x402 refund requires its refund identity.",
        });
    }
    if (!["refund_pending", "refunded"].includes(attempt.state) && attempt.refund_ref !== null) {
        context.addIssue({
            code: "custom",
            message: "An x402 refund identity is valid only during or after refund processing.",
        });
    }
});
const paymentAttemptSchema = z.discriminatedUnion("rail", [
    stripePaymentAttemptSchema,
    x402PaymentAttemptSchema,
]);
export const commercialOrderSchema = z
    .object({
    order_contract: z.literal("sourcey.commercial-order/v1alpha1"),
    order_id: commercialOrderIdSchema,
    actor_ref: z.string().trim().min(1).max(512),
    product_code: commercialProductCodeSchema,
    purchase_kind: z.literal("one_off"),
    product_definition_digest: digestSchema,
    funded_work_intent_id: fundedWorkIntentEnvelopeSchema.shape.intent_id,
    funded_work_intent_digest: digestSchema,
    owner_work_ref: z.string().trim().min(1).max(512),
    amount: commercialProductDefinitionSchema.shape.amount,
    payment_state: z.enum(["payment_pending", "paid", "refund_pending", "refunded", "cancelled"]),
    payment_attempt_id: paymentAttemptIdSchema,
    work_state: z.enum(["blocked", "queued", "in_review", "fulfilled", "failed", "cancelled"]),
    paid_at: instantSchema.nullable(),
    sla_due_at: instantSchema.nullable(),
    refund_reason: z
        .enum(["scope_superseded", "service_level_missed", "sourcey_error", "duplicate_charge"])
        .nullable(),
    refund_requested_at: instantSchema.nullable(),
    refunded_at: instantSchema.nullable(),
    fulfilment_receipt_digest: digestSchema.nullable(),
    failure_receipt_digest: digestSchema.nullable(),
    created_at: instantSchema,
    updated_at: instantSchema,
})
    .strict()
    .superRefine((order, context) => {
    if (order.work_state !== "blocked" && order.payment_state === "payment_pending") {
        context.addIssue({ code: "custom", message: "Unsettled payment cannot authorize work." });
    }
    if (order.payment_state === "paid" && (order.paid_at === null || order.sla_due_at === null)) {
        context.addIssue({
            code: "custom",
            message: "Settled work requires payment and service times.",
        });
    }
    if ((order.payment_state === "refund_pending" || order.payment_state === "refunded") &&
        (order.refund_reason === null || order.refund_requested_at === null || order.paid_at === null)) {
        context.addIssue({
            code: "custom",
            message: "A refund transition requires its payment, reason, and request time.",
        });
    }
    if ((order.payment_state === "refunded") !== (order.refunded_at !== null)) {
        context.addIssue({
            code: "custom",
            message: "Refund completion time must agree with the refunded state.",
        });
    }
    if (order.work_state === "fulfilled" && order.fulfilment_receipt_digest === null) {
        context.addIssue({ code: "custom", message: "Fulfilled work requires its exact receipt." });
    }
    if (order.work_state === "failed" && order.failure_receipt_digest === null) {
        context.addIssue({ code: "custom", message: "Failed work requires its exact receipt." });
    }
});
export const createCommercialOrderRequestSchema = z
    .object({
    funded_work_intent_id: fundedWorkIntentEnvelopeSchema.shape.intent_id,
    funded_work_intent_digest: digestSchema,
    payment_rail: z.literal("stripe"),
})
    .strict();
export const commercialOrderProjectionSchema = z
    .object({ order: commercialOrderSchema, payment_attempt: paymentAttemptSchema })
    .strict()
    .superRefine((projection, context) => {
    if (projection.order.order_id !== projection.payment_attempt.order_id ||
        projection.order.payment_attempt_id !== projection.payment_attempt.attempt_id ||
        projection.order.amount.currency !== projection.payment_attempt.amount.currency ||
        projection.order.amount.minor_units !== projection.payment_attempt.amount.minor_units) {
        context.addIssue({ code: "custom", message: "Order and payment attempt do not compose." });
    }
    const compatibleAttemptStates = {
        payment_pending: ["prepared", "payment_pending", "verified", "settlement_pending"],
        paid: ["settled"],
        refund_pending: ["refund_pending"],
        refunded: ["refunded"],
        cancelled: ["failed", "expired"],
    };
    if (!compatibleAttemptStates[projection.order.payment_state].includes(projection.payment_attempt.state)) {
        context.addIssue({
            code: "custom",
            message: "Order payment state and payment-attempt state do not compose.",
        });
    }
});
export const createCommercialOrderResponseSchema = commercialOrderProjectionSchema;
export const commercialOrderResponseSchema = commercialOrderProjectionSchema;
export function commercialProductDefinitionDigest(definition) {
    return digest(commercialProductDefinitionSchema.parse(definition));
}
//# sourceMappingURL=index.js.map