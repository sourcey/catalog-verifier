import { DIGEST_PATTERN } from "provenry/primitives";
import { z } from "zod";
import { ENTITY_ID_PATTERN, OFFER_ID_PATTERN, PROGRAM_ID_PATTERN, } from "../../../modules/catalog-primitives/src/index.js";
const digestSchema = z.string().regex(DIGEST_PATTERN);
const instantSchema = z.iso.datetime({ offset: true });
const opaqueReferenceSchema = z.string().trim().min(1).max(512);
const entityIdSchema = z.string().regex(ENTITY_ID_PATTERN);
const programIdSchema = z.string().regex(PROGRAM_ID_PATTERN);
const offerIdSchema = z.string().regex(OFFER_ID_PATTERN);
export const commercialProductCodeSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u);
export const commercialPriceLookupKeySchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u);
export const fundedWorkIntentEnvelopeCoreSchema = z
    .object({
    intent_contract: z.literal("sourcey.funded-work-intent/v1alpha1"),
    intent_id: z.string().regex(/^fwi_[a-f0-9]{64}$/u),
    product_code: commercialProductCodeSchema,
    purchase_kind: z.literal("one_off"),
    actor_ref: opaqueReferenceSchema,
    owner_work_ref: opaqueReferenceSchema,
    owner_payload_digest: digestSchema,
    subject: z
        .object({
        entity_id: entityIdSchema,
        program_id: programIdSchema.optional(),
        offer_id: offerIdSchema.optional(),
    })
        .strict(),
    base_release_id: digestSchema,
    eligibility_digest: digestSchema,
    policy_bindings: z
        .array(z
        .object({
        role: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u),
        policy_digest: digestSchema,
    })
        .strict())
        .min(1)
        .max(20)
        .superRefine((bindings, context) => {
        const roles = bindings.map(({ role }) => role);
        if (new Set(roles).size !== roles.length) {
            context.addIssue({ code: "custom", message: "Policy binding roles must be unique." });
        }
        if (roles.some((role, index) => index > 0 && (roles[index - 1] ?? "") >= role)) {
            context.addIssue({
                code: "custom",
                message: "Policy bindings must use canonical role order.",
            });
        }
    }),
    work_class: commercialProductCodeSchema,
    forbidden_effects: z.tuple([
        z.literal("admit_without_evidence"),
        z.literal("alter_facts"),
        z.literal("alter_ranking"),
        z.literal("guarantee_outcome"),
        z.literal("publish_without_authority"),
    ]),
    price_lookup_key: commercialPriceLookupKeySchema,
    requested_by: z.enum(["subject", "contributor"]),
    issued_at: instantSchema,
    expires_at: instantSchema,
})
    .strict();
export const fundedWorkIntentEnvelopeSchema = fundedWorkIntentEnvelopeCoreSchema
    .safeExtend({ intent_digest: digestSchema })
    .strict();
//# sourceMappingURL=index.js.map