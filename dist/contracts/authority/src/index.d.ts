import { z } from "zod";
export declare const signaturePurposeSchema: z.ZodEnum<{
    "catalog-attestation": "catalog-attestation";
    "catalog-authority": "catalog-authority";
    "catalog-dispute": "catalog-dispute";
    "catalog-evidence": "catalog-evidence";
    "catalog-feed": "catalog-feed";
    "catalog-identity": "catalog-identity";
    "catalog-policy": "catalog-policy";
    "catalog-release": "catalog-release";
    "catalog-verification": "catalog-verification";
}>;
/**
 * Exact authority for an immutable admission decision. Human review and
 * deterministic policy are two attribution forms on one decision contract;
 * neither may impersonate the other.
 */
export declare const decisionBasisSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    kind: z.ZodLiteral<"human">;
    actor_id: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"policy">;
    policy_id: z.ZodString;
    policy_digest: z.ZodString;
    evaluator_id: z.ZodString;
    evaluator_digest: z.ZodString;
    input_digest: z.ZodString;
    execution_receipt_digest: z.ZodString;
}, z.core.$strict>], "kind">;
export declare const rootSetSchema: z.ZodObject<{
    schema_version: z.ZodLiteral<"sourcey.root-set/v1alpha1">;
    generation: z.ZodNumber;
    threshold: z.ZodNumber;
    keys: z.ZodArray<z.ZodObject<{
        key_id: z.ZodString;
        algorithm: z.ZodLiteral<"ed25519">;
        public_key_pem: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const rootSetTransitionCoreSchema: z.ZodObject<{
    transition_contract: z.ZodLiteral<"sourcey.root-set-transition/v1alpha1">;
    previous_root_set_digest: z.ZodString;
    next_root_set_digest: z.ZodString;
    previous_generation: z.ZodNumber;
    next_generation: z.ZodNumber;
    effective_release_sequence: z.ZodNumber;
}, z.core.$strict>;
export declare const rootSetTransitionSchema: z.ZodObject<{
    transition_contract: z.ZodLiteral<"sourcey.root-set-transition/v1alpha1">;
    previous_root_set_digest: z.ZodString;
    next_root_set_digest: z.ZodString;
    previous_generation: z.ZodNumber;
    next_generation: z.ZodNumber;
    effective_release_sequence: z.ZodNumber;
    transition_digest: z.ZodString;
    previous_root_signatures: z.ZodArray<z.ZodObject<{
        key_id: z.ZodString;
        algorithm: z.ZodLiteral<"ed25519">;
        signature: z.ZodString;
    }, z.core.$strict>>;
    next_root_signatures: z.ZodArray<z.ZodObject<{
        key_id: z.ZodString;
        algorithm: z.ZodLiteral<"ed25519">;
        signature: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const signerRegistryCoreSchema: z.ZodObject<{
    registry_contract: z.ZodLiteral<"sourcey.signer-registry/v1alpha1">;
    generation: z.ZodNumber;
    parent_registry_digest: z.ZodNullable<z.ZodString>;
    issuers: z.ZodArray<z.ZodObject<{
        issuer_id: z.ZodString;
        keys: z.ZodArray<z.ZodObject<{
            key_id: z.ZodString;
            algorithm: z.ZodLiteral<"ed25519">;
            public_key_pem: z.ZodString;
            purposes: z.ZodArray<z.ZodString>;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            compromised_after_sequence: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const signerRegistrySchema: z.ZodObject<{
    registry_contract: z.ZodLiteral<"sourcey.signer-registry/v1alpha1">;
    generation: z.ZodNumber;
    parent_registry_digest: z.ZodNullable<z.ZodString>;
    issuers: z.ZodArray<z.ZodObject<{
        issuer_id: z.ZodString;
        keys: z.ZodArray<z.ZodObject<{
            key_id: z.ZodString;
            algorithm: z.ZodLiteral<"ed25519">;
            public_key_pem: z.ZodString;
            purposes: z.ZodArray<z.ZodString>;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            compromised_after_sequence: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    registry_digest: z.ZodString;
    root_signatures: z.ZodArray<z.ZodObject<{
        key_id: z.ZodString;
        algorithm: z.ZodLiteral<"ed25519">;
        signature: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const protectedSignatureSchema: z.ZodObject<{
    signature_purpose: z.ZodEnum<{
        "catalog-attestation": "catalog-attestation";
        "catalog-authority": "catalog-authority";
        "catalog-dispute": "catalog-dispute";
        "catalog-evidence": "catalog-evidence";
        "catalog-feed": "catalog-feed";
        "catalog-identity": "catalog-identity";
        "catalog-policy": "catalog-policy";
        "catalog-release": "catalog-release";
        "catalog-verification": "catalog-verification";
    }>;
    signer_registry_digest: z.ZodString;
    key_id: z.ZodString;
    algorithm: z.ZodLiteral<"ed25519">;
    signature: z.ZodString;
}, z.core.$strict>;
export type SignaturePurpose = z.infer<typeof signaturePurposeSchema>;
export type DecisionBasis = z.infer<typeof decisionBasisSchema>;
export type RootSet = z.infer<typeof rootSetSchema>;
export type RootSetTransitionCore = z.infer<typeof rootSetTransitionCoreSchema>;
export type RootSetTransition = z.infer<typeof rootSetTransitionSchema>;
export type SignerRegistryCore = z.infer<typeof signerRegistryCoreSchema>;
export type SignerRegistry = z.infer<typeof signerRegistrySchema>;
export type ProtectedSignature = z.infer<typeof protectedSignatureSchema>;
//# sourceMappingURL=index.d.ts.map