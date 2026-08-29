import { z } from "zod";
export declare const commercialProductCodeSchema: z.ZodString;
export declare const commercialPriceLookupKeySchema: z.ZodString;
export declare const fundedWorkIntentEnvelopeCoreSchema: z.ZodObject<{
    intent_contract: z.ZodLiteral<"sourcey.funded-work-intent/v1alpha1">;
    intent_id: z.ZodString;
    product_code: z.ZodString;
    purchase_kind: z.ZodLiteral<"one_off">;
    actor_ref: z.ZodString;
    owner_work_ref: z.ZodString;
    owner_payload_digest: z.ZodString;
    subject: z.ZodObject<{
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
    }, z.core.$strict>;
    base_release_id: z.ZodString;
    eligibility_digest: z.ZodString;
    policy_bindings: z.ZodArray<z.ZodObject<{
        role: z.ZodString;
        policy_digest: z.ZodString;
    }, z.core.$strict>>;
    work_class: z.ZodString;
    forbidden_effects: z.ZodTuple<[z.ZodLiteral<"admit_without_evidence">, z.ZodLiteral<"alter_facts">, z.ZodLiteral<"alter_ranking">, z.ZodLiteral<"guarantee_outcome">, z.ZodLiteral<"publish_without_authority">], null>;
    price_lookup_key: z.ZodString;
    requested_by: z.ZodEnum<{
        subject: "subject";
        contributor: "contributor";
    }>;
    issued_at: z.ZodISODateTime;
    expires_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const fundedWorkIntentEnvelopeSchema: z.ZodObject<{
    intent_contract: z.ZodLiteral<"sourcey.funded-work-intent/v1alpha1">;
    intent_id: z.ZodString;
    product_code: z.ZodString;
    purchase_kind: z.ZodLiteral<"one_off">;
    actor_ref: z.ZodString;
    owner_work_ref: z.ZodString;
    owner_payload_digest: z.ZodString;
    subject: z.ZodObject<{
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
    }, z.core.$strict>;
    base_release_id: z.ZodString;
    eligibility_digest: z.ZodString;
    policy_bindings: z.ZodArray<z.ZodObject<{
        role: z.ZodString;
        policy_digest: z.ZodString;
    }, z.core.$strict>>;
    work_class: z.ZodString;
    forbidden_effects: z.ZodTuple<[z.ZodLiteral<"admit_without_evidence">, z.ZodLiteral<"alter_facts">, z.ZodLiteral<"alter_ranking">, z.ZodLiteral<"guarantee_outcome">, z.ZodLiteral<"publish_without_authority">], null>;
    price_lookup_key: z.ZodString;
    requested_by: z.ZodEnum<{
        subject: "subject";
        contributor: "contributor";
    }>;
    issued_at: z.ZodISODateTime;
    expires_at: z.ZodISODateTime;
    intent_digest: z.ZodString;
}, z.core.$strict>;
export type FundedWorkIntentEnvelope = z.infer<typeof fundedWorkIntentEnvelopeSchema>;
//# sourceMappingURL=index.d.ts.map