import { type Digest } from "provenry/primitives";
import { z } from "zod";
import type { CoverageRequirement } from "../../../contracts/policies/src/index.js";
import { type ListingRevision } from "../../../contracts/revisions/src/index.js";
declare const materialClaimSchema: z.ZodObject<{
    policy_path: z.ZodString;
    path: z.ZodString;
    value_digest: z.ZodString;
    semantic_type: z.ZodEnum<{
        access: "access";
        boolean: "boolean";
        composition: "composition";
        currency: "currency";
        domain: "domain";
        duration: "duration";
        editorial_text: "editorial_text";
        eligibility_composition: "eligibility_composition";
        eligibility_value: "eligibility_value";
        exact_text: "exact_text";
        lifecycle_state: "lifecycle_state";
        money_amount: "money_amount";
        number: "number";
        percentage: "percentage";
        qualifier: "qualifier";
        source_authority: "source_authority";
        structured_value: "structured_value";
        taxonomy: "taxonomy";
        url: "url";
    }>;
    proof_kinds: z.ZodArray<z.ZodEnum<{
        attested: "attested";
        derived: "derived";
        editorial: "editorial";
        observed: "observed";
    }>>;
    derivation_rules: z.ZodArray<z.ZodString>;
    guidance: z.ZodString;
    depends_on: z.ZodArray<z.ZodString>;
    claim_id: z.ZodString;
}, z.core.$strict>;
export declare const materialClaimPlanSchema: z.ZodObject<{
    plan_contract: z.ZodLiteral<"sourcey.material-claim-plan/v1alpha1">;
    coverage_policy_digest: z.ZodString;
    subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
        subject_type: z.ZodLiteral<"entity">;
        entity_id: z.ZodString;
        revision_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        subject_type: z.ZodLiteral<"program">;
        entity_id: z.ZodString;
        program_id: z.ZodString;
        revision_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        subject_type: z.ZodLiteral<"offer">;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
        revision_digest: z.ZodString;
    }, z.core.$strict>], "subject_type">;
    claims: z.ZodArray<z.ZodObject<{
        policy_path: z.ZodString;
        path: z.ZodString;
        value_digest: z.ZodString;
        semantic_type: z.ZodEnum<{
            access: "access";
            boolean: "boolean";
            composition: "composition";
            currency: "currency";
            domain: "domain";
            duration: "duration";
            editorial_text: "editorial_text";
            eligibility_composition: "eligibility_composition";
            eligibility_value: "eligibility_value";
            exact_text: "exact_text";
            lifecycle_state: "lifecycle_state";
            money_amount: "money_amount";
            number: "number";
            percentage: "percentage";
            qualifier: "qualifier";
            source_authority: "source_authority";
            structured_value: "structured_value";
            taxonomy: "taxonomy";
            url: "url";
        }>;
        proof_kinds: z.ZodArray<z.ZodEnum<{
            attested: "attested";
            derived: "derived";
            editorial: "editorial";
            observed: "observed";
        }>>;
        derivation_rules: z.ZodArray<z.ZodString>;
        guidance: z.ZodString;
        depends_on: z.ZodArray<z.ZodString>;
        claim_id: z.ZodString;
    }, z.core.$strict>>;
    plan_digest: z.ZodString;
}, z.core.$strict>;
declare const materialClaimMatchBindingCoreSchema: z.ZodObject<{
    source_id: z.ZodString;
    capture_digest: z.ZodString;
    normalized_object_digest: z.ZodString;
    adapter_id: z.ZodString;
    adapter_digest: z.ZodString;
    proof_kind: z.ZodEnum<{
        attested: "attested";
        derived: "derived";
        editorial: "editorial";
        observed: "observed";
    }>;
    derivation_rule: z.ZodNullable<z.ZodEnum<{
        "consideration-from-benefits": "consideration-from-benefits";
        "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
        "eligibility-composition-from-criteria": "eligibility-composition-from-criteria";
        "first-party-access-operator": "first-party-access-operator";
        "form-access-from-first-party-application": "form-access-from-first-party-application";
        "public-availability-from-application": "public-availability-from-application";
    }>>;
    locators: z.ZodArray<z.ZodObject<{
        kind: z.ZodLiteral<"utf8-range">;
        start_byte: z.ZodNumber;
        end_byte: z.ZodNumber;
        value_digest: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
declare const materialClaimMatchBindingSchema: z.ZodObject<{
    source_id: z.ZodString;
    capture_digest: z.ZodString;
    normalized_object_digest: z.ZodString;
    adapter_id: z.ZodString;
    adapter_digest: z.ZodString;
    proof_kind: z.ZodEnum<{
        attested: "attested";
        derived: "derived";
        editorial: "editorial";
        observed: "observed";
    }>;
    derivation_rule: z.ZodNullable<z.ZodEnum<{
        "consideration-from-benefits": "consideration-from-benefits";
        "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
        "eligibility-composition-from-criteria": "eligibility-composition-from-criteria";
        "first-party-access-operator": "first-party-access-operator";
        "form-access-from-first-party-application": "form-access-from-first-party-application";
        "public-availability-from-application": "public-availability-from-application";
    }>>;
    locators: z.ZodArray<z.ZodObject<{
        kind: z.ZodLiteral<"utf8-range">;
        start_byte: z.ZodNumber;
        end_byte: z.ZodNumber;
        value_digest: z.ZodString;
    }, z.core.$strict>>;
    binding_digest: z.ZodString;
}, z.core.$strict>;
declare const materialClaimResultCoreSchema: z.ZodObject<{
    result_contract: z.ZodLiteral<"sourcey.material-claim-result/v1alpha1">;
    claim_id: z.ZodString;
    status: z.ZodEnum<{
        contradicted: "contradicted";
        supported: "supported";
        unresolved: "unresolved";
        unsupported: "unsupported";
    }>;
    bindings: z.ZodArray<z.ZodObject<{
        source_id: z.ZodString;
        capture_digest: z.ZodString;
        normalized_object_digest: z.ZodString;
        adapter_id: z.ZodString;
        adapter_digest: z.ZodString;
        proof_kind: z.ZodEnum<{
            attested: "attested";
            derived: "derived";
            editorial: "editorial";
            observed: "observed";
        }>;
        derivation_rule: z.ZodNullable<z.ZodEnum<{
            "consideration-from-benefits": "consideration-from-benefits";
            "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
            "eligibility-composition-from-criteria": "eligibility-composition-from-criteria";
            "first-party-access-operator": "first-party-access-operator";
            "form-access-from-first-party-application": "form-access-from-first-party-application";
            "public-availability-from-application": "public-availability-from-application";
        }>>;
        locators: z.ZodArray<z.ZodObject<{
            kind: z.ZodLiteral<"utf8-range">;
            start_byte: z.ZodNumber;
            end_byte: z.ZodNumber;
            value_digest: z.ZodString;
        }, z.core.$strict>>;
        binding_digest: z.ZodString;
    }, z.core.$strict>>;
    dependency_result_digests: z.ZodArray<z.ZodString>;
    residue: z.ZodArray<z.ZodObject<{
        code: z.ZodString;
        detail_digest: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const materialClaimResultSchema: z.ZodObject<{
    result_contract: z.ZodLiteral<"sourcey.material-claim-result/v1alpha1">;
    claim_id: z.ZodString;
    status: z.ZodEnum<{
        contradicted: "contradicted";
        supported: "supported";
        unresolved: "unresolved";
        unsupported: "unsupported";
    }>;
    bindings: z.ZodArray<z.ZodObject<{
        source_id: z.ZodString;
        capture_digest: z.ZodString;
        normalized_object_digest: z.ZodString;
        adapter_id: z.ZodString;
        adapter_digest: z.ZodString;
        proof_kind: z.ZodEnum<{
            attested: "attested";
            derived: "derived";
            editorial: "editorial";
            observed: "observed";
        }>;
        derivation_rule: z.ZodNullable<z.ZodEnum<{
            "consideration-from-benefits": "consideration-from-benefits";
            "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
            "eligibility-composition-from-criteria": "eligibility-composition-from-criteria";
            "first-party-access-operator": "first-party-access-operator";
            "form-access-from-first-party-application": "form-access-from-first-party-application";
            "public-availability-from-application": "public-availability-from-application";
        }>>;
        locators: z.ZodArray<z.ZodObject<{
            kind: z.ZodLiteral<"utf8-range">;
            start_byte: z.ZodNumber;
            end_byte: z.ZodNumber;
            value_digest: z.ZodString;
        }, z.core.$strict>>;
        binding_digest: z.ZodString;
    }, z.core.$strict>>;
    dependency_result_digests: z.ZodArray<z.ZodString>;
    residue: z.ZodArray<z.ZodObject<{
        code: z.ZodString;
        detail_digest: z.ZodString;
    }, z.core.$strict>>;
    result_digest: z.ZodString;
}, z.core.$strict>;
export type MaterialClaim = z.infer<typeof materialClaimSchema>;
export type MaterialClaimPlan = z.infer<typeof materialClaimPlanSchema>;
type MaterialClaimMatchBinding = z.infer<typeof materialClaimMatchBindingSchema>;
export type MaterialClaimResult = z.infer<typeof materialClaimResultSchema>;
/** Compile every applicable policy root into exact material leaves. */
export declare function deriveMaterialClaimPlan(input: {
    readonly revision: ListingRevision;
    readonly requirements: readonly CoverageRequirement[];
    readonly coveragePolicyDigest: Digest;
}): MaterialClaimPlan;
export declare function createMaterialClaimMatchBinding(input: z.input<typeof materialClaimMatchBindingCoreSchema>): MaterialClaimMatchBinding;
export declare function createMaterialClaimResult(input: z.input<typeof materialClaimResultCoreSchema>): MaterialClaimResult;
export declare function verifyMaterialClaimEvaluation(input: {
    readonly plan: unknown;
    readonly results: readonly unknown[];
}): {
    readonly plan: MaterialClaimPlan;
    readonly results: readonly MaterialClaimResult[];
};
export {};
//# sourceMappingURL=material-claims.d.ts.map