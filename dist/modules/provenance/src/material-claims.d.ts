import { z } from "zod";
import type { CoverageRequirement } from "../../../contracts/policies/src/index.js";
import type { EntityRevision, OfferRevision, ProgramRevision } from "../../../contracts/revisions/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
export declare const materialClaimSemanticTypeSchema: z.ZodEnum<{
    number: "number";
    boolean: "boolean";
    url: "url";
    duration: "duration";
    currency: "currency";
    percentage: "percentage";
    access: "access";
    domain: "domain";
    taxonomy: "taxonomy";
    exact_text: "exact_text";
    editorial_text: "editorial_text";
    lifecycle_state: "lifecycle_state";
    qualifier: "qualifier";
    money_amount: "money_amount";
    eligibility_composition: "eligibility_composition";
    eligibility_value: "eligibility_value";
    source_authority: "source_authority";
    composition: "composition";
    structured_value: "structured_value";
}>;
export declare const materialClaimSubjectSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
export declare const materialClaimCoreSchema: z.ZodObject<{
    policy_path: z.ZodString;
    path: z.ZodString;
    value_digest: z.ZodString;
    semantic_type: z.ZodEnum<{
        number: "number";
        boolean: "boolean";
        url: "url";
        duration: "duration";
        currency: "currency";
        percentage: "percentage";
        access: "access";
        domain: "domain";
        taxonomy: "taxonomy";
        exact_text: "exact_text";
        editorial_text: "editorial_text";
        lifecycle_state: "lifecycle_state";
        qualifier: "qualifier";
        money_amount: "money_amount";
        eligibility_composition: "eligibility_composition";
        eligibility_value: "eligibility_value";
        source_authority: "source_authority";
        composition: "composition";
        structured_value: "structured_value";
    }>;
    proof_kinds: z.ZodArray<z.ZodEnum<{
        observed: "observed";
        derived: "derived";
        editorial: "editorial";
        attested: "attested";
    }>>;
    derivation_rules: z.ZodArray<z.ZodString>;
    guidance: z.ZodString;
    depends_on: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export declare const materialClaimSchema: z.ZodObject<{
    policy_path: z.ZodString;
    path: z.ZodString;
    value_digest: z.ZodString;
    semantic_type: z.ZodEnum<{
        number: "number";
        boolean: "boolean";
        url: "url";
        duration: "duration";
        currency: "currency";
        percentage: "percentage";
        access: "access";
        domain: "domain";
        taxonomy: "taxonomy";
        exact_text: "exact_text";
        editorial_text: "editorial_text";
        lifecycle_state: "lifecycle_state";
        qualifier: "qualifier";
        money_amount: "money_amount";
        eligibility_composition: "eligibility_composition";
        eligibility_value: "eligibility_value";
        source_authority: "source_authority";
        composition: "composition";
        structured_value: "structured_value";
    }>;
    proof_kinds: z.ZodArray<z.ZodEnum<{
        observed: "observed";
        derived: "derived";
        editorial: "editorial";
        attested: "attested";
    }>>;
    derivation_rules: z.ZodArray<z.ZodString>;
    guidance: z.ZodString;
    depends_on: z.ZodArray<z.ZodString>;
    claim_id: z.ZodString;
}, z.core.$strict>;
export declare const materialClaimPlanCoreSchema: z.ZodObject<{
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
            number: "number";
            boolean: "boolean";
            url: "url";
            duration: "duration";
            currency: "currency";
            percentage: "percentage";
            access: "access";
            domain: "domain";
            taxonomy: "taxonomy";
            exact_text: "exact_text";
            editorial_text: "editorial_text";
            lifecycle_state: "lifecycle_state";
            qualifier: "qualifier";
            money_amount: "money_amount";
            eligibility_composition: "eligibility_composition";
            eligibility_value: "eligibility_value";
            source_authority: "source_authority";
            composition: "composition";
            structured_value: "structured_value";
        }>;
        proof_kinds: z.ZodArray<z.ZodEnum<{
            observed: "observed";
            derived: "derived";
            editorial: "editorial";
            attested: "attested";
        }>>;
        derivation_rules: z.ZodArray<z.ZodString>;
        guidance: z.ZodString;
        depends_on: z.ZodArray<z.ZodString>;
        claim_id: z.ZodString;
    }, z.core.$strict>>;
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
            number: "number";
            boolean: "boolean";
            url: "url";
            duration: "duration";
            currency: "currency";
            percentage: "percentage";
            access: "access";
            domain: "domain";
            taxonomy: "taxonomy";
            exact_text: "exact_text";
            editorial_text: "editorial_text";
            lifecycle_state: "lifecycle_state";
            qualifier: "qualifier";
            money_amount: "money_amount";
            eligibility_composition: "eligibility_composition";
            eligibility_value: "eligibility_value";
            source_authority: "source_authority";
            composition: "composition";
            structured_value: "structured_value";
        }>;
        proof_kinds: z.ZodArray<z.ZodEnum<{
            observed: "observed";
            derived: "derived";
            editorial: "editorial";
            attested: "attested";
        }>>;
        derivation_rules: z.ZodArray<z.ZodString>;
        guidance: z.ZodString;
        depends_on: z.ZodArray<z.ZodString>;
        claim_id: z.ZodString;
    }, z.core.$strict>>;
    plan_digest: z.ZodString;
}, z.core.$strict>;
export declare const materialClaimMatchBindingCoreSchema: z.ZodObject<{
    source_id: z.ZodString;
    capture_digest: z.ZodString;
    normalized_object_digest: z.ZodString;
    adapter_id: z.ZodString;
    adapter_digest: z.ZodString;
    proof_kind: z.ZodEnum<{
        observed: "observed";
        derived: "derived";
        editorial: "editorial";
        attested: "attested";
    }>;
    derivation_rule: z.ZodNullable<z.ZodEnum<{
        "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
        "form-access-from-first-party-application": "form-access-from-first-party-application";
        "first-party-access-operator": "first-party-access-operator";
        "public-availability-from-application": "public-availability-from-application";
    }>>;
    locators: z.ZodArray<z.ZodObject<{
        kind: z.ZodLiteral<"utf8-range">;
        start_byte: z.ZodNumber;
        end_byte: z.ZodNumber;
        value_digest: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const materialClaimMatchBindingSchema: z.ZodObject<{
    source_id: z.ZodString;
    capture_digest: z.ZodString;
    normalized_object_digest: z.ZodString;
    adapter_id: z.ZodString;
    adapter_digest: z.ZodString;
    proof_kind: z.ZodEnum<{
        observed: "observed";
        derived: "derived";
        editorial: "editorial";
        attested: "attested";
    }>;
    derivation_rule: z.ZodNullable<z.ZodEnum<{
        "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
        "form-access-from-first-party-application": "form-access-from-first-party-application";
        "first-party-access-operator": "first-party-access-operator";
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
export declare const materialClaimResultCoreSchema: z.ZodObject<{
    result_contract: z.ZodLiteral<"sourcey.material-claim-result/v1alpha1">;
    claim_id: z.ZodString;
    status: z.ZodEnum<{
        supported: "supported";
        contradicted: "contradicted";
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
            observed: "observed";
            derived: "derived";
            editorial: "editorial";
            attested: "attested";
        }>;
        derivation_rule: z.ZodNullable<z.ZodEnum<{
            "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
            "form-access-from-first-party-application": "form-access-from-first-party-application";
            "first-party-access-operator": "first-party-access-operator";
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
        supported: "supported";
        contradicted: "contradicted";
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
            observed: "observed";
            derived: "derived";
            editorial: "editorial";
            attested: "attested";
        }>;
        derivation_rule: z.ZodNullable<z.ZodEnum<{
            "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
            "form-access-from-first-party-application": "form-access-from-first-party-application";
            "first-party-access-operator": "first-party-access-operator";
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
export type MaterialClaimMatchBinding = z.infer<typeof materialClaimMatchBindingSchema>;
export type MaterialClaimResult = z.infer<typeof materialClaimResultSchema>;
type CatalogRevision = EntityRevision | ProgramRevision | OfferRevision;
/** Compile every applicable policy root into exact material leaves. */
export declare function deriveMaterialClaimPlan(input: {
    readonly revision: CatalogRevision;
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