import { z } from "zod";
import { ACTOR_IDENTIFIER_PATTERN, DIGEST_PATTERN, IDENTIFIER_PATTERN, } from "../../../modules/primitives/src/index.js";
const digest = z.string().regex(DIGEST_PATTERN);
const identifier = z.string().regex(IDENTIFIER_PATTERN);
const actorIdentifier = z.string().regex(ACTOR_IDENTIFIER_PATTERN);
const instant = z.iso.datetime({ offset: true });
const rootSignatureSchema = z
    .object({
    key_id: identifier,
    algorithm: z.literal("ed25519"),
    signature: z.string().min(1),
})
    .strict();
export const signaturePurposeSchema = z.enum([
    "catalog-capture",
    "catalog-evidence",
    "catalog-identity",
    "catalog-authority",
    "catalog-attestation",
    "catalog-verification",
    "catalog-dispute",
    "catalog-policy",
    "catalog-release",
    "catalog-feed",
]);
export const registeredSignaturePurposeSchema = identifier;
/**
 * Exact authority for an immutable admission decision. Human review and
 * deterministic policy are two attribution forms on one decision contract;
 * neither may impersonate the other.
 */
export const decisionBasisSchema = z.discriminatedUnion("kind", [
    z
        .object({
        kind: z.literal("human"),
        actor_id: actorIdentifier,
    })
        .strict(),
    z
        .object({
        kind: z.literal("policy"),
        policy_id: identifier,
        policy_digest: digest,
        evaluator_id: identifier,
        evaluator_digest: digest,
        input_digest: digest,
        execution_receipt_digest: digest,
    })
        .strict(),
]);
export const rootSetSchema = z
    .object({
    schema_version: z.literal("sourcey.root-set/v1alpha1"),
    generation: z.number().int().positive(),
    threshold: z.number().int().positive(),
    keys: z
        .array(z
        .object({
        key_id: identifier,
        algorithm: z.literal("ed25519"),
        public_key_pem: z.string().min(1),
    })
        .strict())
        .min(1),
})
    .strict()
    .superRefine((value, context) => {
    if (value.threshold > value.keys.length) {
        context.addIssue({
            code: "custom",
            path: ["threshold"],
            message: "Root threshold cannot exceed the number of root keys.",
        });
    }
});
export const rootSetTransitionCoreSchema = z
    .object({
    transition_contract: z.literal("sourcey.root-set-transition/v1alpha1"),
    previous_root_set_digest: digest,
    next_root_set_digest: digest,
    previous_generation: z.number().int().positive(),
    next_generation: z.number().int().positive(),
    effective_release_sequence: z.number().int().positive(),
})
    .strict();
export const rootSetTransitionSchema = rootSetTransitionCoreSchema
    .extend({
    transition_digest: digest,
    previous_root_signatures: z.array(rootSignatureSchema).min(1),
    next_root_signatures: z.array(rootSignatureSchema).min(1),
})
    .strict();
export const signerRegistryCoreSchema = z
    .object({
    registry_contract: z.literal("sourcey.signer-registry/v1alpha1"),
    generation: z.number().int().positive(),
    parent_registry_digest: digest.nullable(),
    issuers: z.array(z
        .object({
        issuer_id: identifier,
        keys: z.array(z
            .object({
            key_id: identifier,
            algorithm: z.literal("ed25519"),
            public_key_pem: z.string().min(1),
            purposes: z.array(registeredSignaturePurposeSchema).min(1),
            valid_from: instant,
            valid_until: instant.optional(),
            compromised_after_sequence: z.number().int().positive().optional(),
        })
            .strict()),
    })
        .strict()),
})
    .strict();
export const signerRegistrySchema = signerRegistryCoreSchema
    .extend({
    registry_digest: digest,
    root_signatures: z.array(rootSignatureSchema).min(1),
})
    .strict();
export const protectedSignatureSchema = z
    .object({
    signature_purpose: signaturePurposeSchema,
    signer_registry_digest: digest,
    key_id: identifier,
    algorithm: z.literal("ed25519"),
    signature: z.string().min(1),
})
    .strict();
//# sourceMappingURL=index.js.map