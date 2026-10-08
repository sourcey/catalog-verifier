import { z } from "zod";
export declare const coverageRequirementSchema: z.ZodObject<{
    path: z.ZodString;
    proof_kinds: z.ZodArray<z.ZodEnum<{
        attested: "attested";
        derived: "derived";
        editorial: "editorial";
        observed: "observed";
    }>>;
    derivation_rules: z.ZodArray<z.ZodEnum<{
        "consideration-from-benefits": "consideration-from-benefits";
        "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
        "eligibility-composition-from-criteria": "eligibility-composition-from-criteria";
        "first-party-access-operator": "first-party-access-operator";
        "form-access-from-first-party-application": "form-access-from-first-party-application";
        "public-availability-from-application": "public-availability-from-application";
    }>>;
    guidance: z.ZodString;
}, z.core.$strict>;
export declare const coveragePolicyCoreSchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.coverage/v1alpha1">;
    version: z.ZodString;
    entity_requirements: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        proof_kinds: z.ZodArray<z.ZodEnum<{
            attested: "attested";
            derived: "derived";
            editorial: "editorial";
            observed: "observed";
        }>>;
        derivation_rules: z.ZodArray<z.ZodEnum<{
            "consideration-from-benefits": "consideration-from-benefits";
            "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
            "eligibility-composition-from-criteria": "eligibility-composition-from-criteria";
            "first-party-access-operator": "first-party-access-operator";
            "form-access-from-first-party-application": "form-access-from-first-party-application";
            "public-availability-from-application": "public-availability-from-application";
        }>>;
        guidance: z.ZodString;
    }, z.core.$strict>>;
    program_requirements: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        proof_kinds: z.ZodArray<z.ZodEnum<{
            attested: "attested";
            derived: "derived";
            editorial: "editorial";
            observed: "observed";
        }>>;
        derivation_rules: z.ZodArray<z.ZodEnum<{
            "consideration-from-benefits": "consideration-from-benefits";
            "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
            "eligibility-composition-from-criteria": "eligibility-composition-from-criteria";
            "first-party-access-operator": "first-party-access-operator";
            "form-access-from-first-party-application": "form-access-from-first-party-application";
            "public-availability-from-application": "public-availability-from-application";
        }>>;
        guidance: z.ZodString;
    }, z.core.$strict>>;
    offer_requirements: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        proof_kinds: z.ZodArray<z.ZodEnum<{
            attested: "attested";
            derived: "derived";
            editorial: "editorial";
            observed: "observed";
        }>>;
        derivation_rules: z.ZodArray<z.ZodEnum<{
            "consideration-from-benefits": "consideration-from-benefits";
            "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
            "eligibility-composition-from-criteria": "eligibility-composition-from-criteria";
            "first-party-access-operator": "first-party-access-operator";
            "form-access-from-first-party-application": "form-access-from-first-party-application";
            "public-availability-from-application": "public-availability-from-application";
        }>>;
        guidance: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const coveragePolicySchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.coverage/v1alpha1">;
    version: z.ZodString;
    entity_requirements: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        proof_kinds: z.ZodArray<z.ZodEnum<{
            attested: "attested";
            derived: "derived";
            editorial: "editorial";
            observed: "observed";
        }>>;
        derivation_rules: z.ZodArray<z.ZodEnum<{
            "consideration-from-benefits": "consideration-from-benefits";
            "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
            "eligibility-composition-from-criteria": "eligibility-composition-from-criteria";
            "first-party-access-operator": "first-party-access-operator";
            "form-access-from-first-party-application": "form-access-from-first-party-application";
            "public-availability-from-application": "public-availability-from-application";
        }>>;
        guidance: z.ZodString;
    }, z.core.$strict>>;
    program_requirements: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        proof_kinds: z.ZodArray<z.ZodEnum<{
            attested: "attested";
            derived: "derived";
            editorial: "editorial";
            observed: "observed";
        }>>;
        derivation_rules: z.ZodArray<z.ZodEnum<{
            "consideration-from-benefits": "consideration-from-benefits";
            "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
            "eligibility-composition-from-criteria": "eligibility-composition-from-criteria";
            "first-party-access-operator": "first-party-access-operator";
            "form-access-from-first-party-application": "form-access-from-first-party-application";
            "public-availability-from-application": "public-availability-from-application";
        }>>;
        guidance: z.ZodString;
    }, z.core.$strict>>;
    offer_requirements: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        proof_kinds: z.ZodArray<z.ZodEnum<{
            attested: "attested";
            derived: "derived";
            editorial: "editorial";
            observed: "observed";
        }>>;
        derivation_rules: z.ZodArray<z.ZodEnum<{
            "consideration-from-benefits": "consideration-from-benefits";
            "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
            "eligibility-composition-from-criteria": "eligibility-composition-from-criteria";
            "first-party-access-operator": "first-party-access-operator";
            "form-access-from-first-party-application": "form-access-from-first-party-application";
            "public-availability-from-application": "public-availability-from-application";
        }>>;
        guidance: z.ZodString;
    }, z.core.$strict>>;
    policy_digest: z.ZodString;
}, z.core.$strict>;
export declare function assertCurrentCoveragePolicyClaimClosure(policy: CoveragePolicy): CoveragePolicy;
export declare const freshnessPolicyCoreSchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.freshness/v1alpha1">;
    version: z.ZodString;
    max_age_days: z.ZodRecord<z.ZodString, z.ZodNumber>;
}, z.core.$strict>;
export declare const freshnessPolicySchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.freshness/v1alpha1">;
    version: z.ZodString;
    max_age_days: z.ZodRecord<z.ZodString, z.ZodNumber>;
    policy_digest: z.ZodString;
}, z.core.$strict>;
export type CoveragePolicy = z.infer<typeof coveragePolicySchema>;
export type CoverageRequirement = z.infer<typeof coverageRequirementSchema>;
export type FreshnessPolicy = z.infer<typeof freshnessPolicySchema>;
//# sourceMappingURL=index.d.ts.map