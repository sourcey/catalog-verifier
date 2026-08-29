import { z } from "zod";
export declare const coverageRequirementSchema: z.ZodObject<{
    path: z.ZodString;
    proof_kinds: z.ZodArray<z.ZodEnum<{
        observed: "observed";
        derived: "derived";
        editorial: "editorial";
        attested: "attested";
    }>>;
    derivation_rules: z.ZodArray<z.ZodEnum<{
        "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
        "form-access-from-first-party-application": "form-access-from-first-party-application";
        "first-party-access-operator": "first-party-access-operator";
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
            observed: "observed";
            derived: "derived";
            editorial: "editorial";
            attested: "attested";
        }>>;
        derivation_rules: z.ZodArray<z.ZodEnum<{
            "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
            "form-access-from-first-party-application": "form-access-from-first-party-application";
            "first-party-access-operator": "first-party-access-operator";
            "public-availability-from-application": "public-availability-from-application";
        }>>;
        guidance: z.ZodString;
    }, z.core.$strict>>;
    program_requirements: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        proof_kinds: z.ZodArray<z.ZodEnum<{
            observed: "observed";
            derived: "derived";
            editorial: "editorial";
            attested: "attested";
        }>>;
        derivation_rules: z.ZodArray<z.ZodEnum<{
            "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
            "form-access-from-first-party-application": "form-access-from-first-party-application";
            "first-party-access-operator": "first-party-access-operator";
            "public-availability-from-application": "public-availability-from-application";
        }>>;
        guidance: z.ZodString;
    }, z.core.$strict>>;
    offer_requirements: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        proof_kinds: z.ZodArray<z.ZodEnum<{
            observed: "observed";
            derived: "derived";
            editorial: "editorial";
            attested: "attested";
        }>>;
        derivation_rules: z.ZodArray<z.ZodEnum<{
            "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
            "form-access-from-first-party-application": "form-access-from-first-party-application";
            "first-party-access-operator": "first-party-access-operator";
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
            observed: "observed";
            derived: "derived";
            editorial: "editorial";
            attested: "attested";
        }>>;
        derivation_rules: z.ZodArray<z.ZodEnum<{
            "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
            "form-access-from-first-party-application": "form-access-from-first-party-application";
            "first-party-access-operator": "first-party-access-operator";
            "public-availability-from-application": "public-availability-from-application";
        }>>;
        guidance: z.ZodString;
    }, z.core.$strict>>;
    program_requirements: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        proof_kinds: z.ZodArray<z.ZodEnum<{
            observed: "observed";
            derived: "derived";
            editorial: "editorial";
            attested: "attested";
        }>>;
        derivation_rules: z.ZodArray<z.ZodEnum<{
            "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
            "form-access-from-first-party-application": "form-access-from-first-party-application";
            "first-party-access-operator": "first-party-access-operator";
            "public-availability-from-application": "public-availability-from-application";
        }>>;
        guidance: z.ZodString;
    }, z.core.$strict>>;
    offer_requirements: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        proof_kinds: z.ZodArray<z.ZodEnum<{
            observed: "observed";
            derived: "derived";
            editorial: "editorial";
            attested: "attested";
        }>>;
        derivation_rules: z.ZodArray<z.ZodEnum<{
            "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
            "form-access-from-first-party-application": "form-access-from-first-party-application";
            "first-party-access-operator": "first-party-access-operator";
            "public-availability-from-application": "public-availability-from-application";
        }>>;
        guidance: z.ZodString;
    }, z.core.$strict>>;
    policy_digest: z.ZodString;
}, z.core.$strict>;
/**
 * Current Catalog policy completeness. Historical content-addressed policies
 * continue to parse under the contract that produced their releases, while a
 * production target must account for every current public factual root. An
 * optional field is applicable only when a revision publishes it.
 */
export declare const currentCatalogMaterialClaimPaths: {
    readonly entity: readonly ["/category", "/description", "/domains", "/links", "/name", "/summary"];
    readonly program: readonly ["/summary", "/title"];
    readonly offer: readonly ["/access", "/description", "/economics", "/eligibility", "/lifecycle", "/roles", "/summary", "/terms_url", "/title"];
};
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
export type CoveragePolicyCore = z.infer<typeof coveragePolicyCoreSchema>;
export type CoveragePolicy = z.infer<typeof coveragePolicySchema>;
export type CoverageRequirement = z.infer<typeof coverageRequirementSchema>;
export type FreshnessPolicyCore = z.infer<typeof freshnessPolicyCoreSchema>;
export type FreshnessPolicy = z.infer<typeof freshnessPolicySchema>;
//# sourceMappingURL=index.d.ts.map