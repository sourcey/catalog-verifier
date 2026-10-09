import { z } from "zod";
export declare const domainNameSchema: z.ZodString;
export declare const standingPolicySchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.standing-policy/v1alpha1">;
    reach_provider: z.ZodLiteral<"ahrefs-domain-rating">;
    reach_threshold_exclusive: z.ZodNumber;
    fallback_domain_age_days: z.ZodNumber;
    fallback_certificate_age_days: z.ZodNumber;
    cache_ttl_seconds: z.ZodNumber;
}, z.core.$strict>;
export declare const standingEvidenceSchema: z.ZodObject<{
    registrable_domain: z.ZodString;
    official_source_url: z.ZodURL;
    source: z.ZodObject<{
        status: z.ZodEnum<{
            invalid: "invalid";
            reachable: "reachable";
            unreachable: "unreachable";
        }>;
        first_party: z.ZodBoolean;
        observed_at: z.ZodISODateTime;
        observation_digest: z.ZodString;
    }, z.core.$strict>;
    catalog_identity: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"unresolved">;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"existing">;
        entity_id: z.ZodString;
        entity_revision_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"ambiguous">;
        entity_ids: z.ZodArray<z.ZodString>;
    }, z.core.$strict>], "status">;
    reach: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"available">;
        rating: z.ZodNumber;
        observed_at: z.ZodISODateTime;
        observation_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"unavailable">;
        reason: z.ZodEnum<{
            not_found: "not_found";
            provider_rejected: "provider_rejected";
            provider_unavailable: "provider_unavailable";
        }>;
        observed_at: z.ZodISODateTime;
    }, z.core.$strict>], "status">;
    domain_age: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"available">;
        age_days: z.ZodNumber;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"unavailable">;
    }, z.core.$strict>], "status">;
    certificate_age: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"available">;
        age_days: z.ZodNumber;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"unavailable">;
    }, z.core.$strict>], "status">;
    mx: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"available">;
        present: z.ZodBoolean;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"unavailable">;
    }, z.core.$strict>], "status">;
}, z.core.$strict>;
export declare const standingResultCoreSchema: z.ZodObject<{
    result_contract: z.ZodLiteral<"sourcey.standing-result/v1alpha1">;
    policy_digest: z.ZodString;
    evidence_digest: z.ZodString;
    registrable_domain: z.ZodString;
    official_source_url: z.ZodURL;
    route: z.ZodEnum<{
        correction_required: "correction_required";
        free_machine_review: "free_machine_review";
        human_verification_required: "human_verification_required";
        repair_required: "repair_required";
        temporarily_unavailable: "temporarily_unavailable";
    }>;
    reasons: z.ZodArray<z.ZodString>;
    evaluated_at: z.ZodISODateTime;
    expires_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const standingResultSchema: z.ZodObject<{
    result_contract: z.ZodLiteral<"sourcey.standing-result/v1alpha1">;
    policy_digest: z.ZodString;
    evidence_digest: z.ZodString;
    registrable_domain: z.ZodString;
    official_source_url: z.ZodURL;
    route: z.ZodEnum<{
        correction_required: "correction_required";
        free_machine_review: "free_machine_review";
        human_verification_required: "human_verification_required";
        repair_required: "repair_required";
        temporarily_unavailable: "temporarily_unavailable";
    }>;
    reasons: z.ZodArray<z.ZodString>;
    evaluated_at: z.ZodISODateTime;
    expires_at: z.ZodISODateTime;
    result_digest: z.ZodString;
}, z.core.$strict>;
/** One rule of the standing bar as a company's contributor reads it, from `standingCriteria`. */
export declare const standingCriterionSchema: z.ZodObject<{
    key: z.ZodEnum<{
        certificate_age: "certificate_age";
        domain_age: "domain_age";
        mx: "mx";
        reach: "reach";
        source: "source";
    }>;
    label: z.ZodString;
    value: z.ZodString;
    requirement: z.ZodString;
    met: z.ZodNullable<z.ZodBoolean>;
}, z.core.$strict>;
export type StandingPolicy = z.infer<typeof standingPolicySchema>;
export type StandingCriterion = z.infer<typeof standingCriterionSchema>;
export type StandingEvidence = z.infer<typeof standingEvidenceSchema>;
export type StandingResult = z.infer<typeof standingResultSchema>;
export declare function isFirstPartyUrlForDomain(value: string, domain: string): boolean;
/**
 * What admitted a new company: the Sourcey-retained standing assessment of its domain and
 * official source that routed it, bound to the Entity identity Sourcey derived for it. A company
 * below the bar also names the person's verification that admitted it. Final admission verifies
 * the binding again against the same retained assessment.
 */
export declare const companyAdmissionBindingSchema: z.ZodObject<{
    binding_contract: z.ZodLiteral<"sourcey.company-admission-binding/v1alpha1">;
    entity_id: z.ZodString;
    registrable_domain: z.ZodString;
    official_source_url: z.ZodURL;
    route: z.ZodEnum<{
        free_machine_review: "free_machine_review";
        human_verification_required: "human_verification_required";
    }>;
    result_digest: z.ZodString;
    evidence_digest: z.ZodString;
    policy_digest: z.ZodString;
    expires_at: z.ZodISODateTime;
    verification_digest: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export type CompanyAdmissionBinding = z.infer<typeof companyAdmissionBindingSchema>;
//# sourceMappingURL=index.d.ts.map