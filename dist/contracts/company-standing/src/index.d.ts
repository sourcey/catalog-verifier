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
export type StandingPolicy = z.infer<typeof standingPolicySchema>;
export type StandingEvidence = z.infer<typeof standingEvidenceSchema>;
export type StandingResult = z.infer<typeof standingResultSchema>;
export declare function isFirstPartyUrlForDomain(value: string, domain: string): boolean;
//# sourceMappingURL=index.d.ts.map