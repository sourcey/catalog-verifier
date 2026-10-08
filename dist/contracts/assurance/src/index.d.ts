import { z } from "zod";
export declare const ENTITY_IDENTITY_ASSURANCE_COVERAGE_PATHS: readonly ["/domains", "/links", "/name"];
export declare const assuranceMethodPolicyCoreSchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.assurance-method-policy/v1alpha1">;
    method_id: z.ZodString;
    title: z.ZodString;
    summary: z.ZodString;
    decision_authority: z.ZodLiteral<"authorized-human-review">;
    accepted_observation_methods: z.ZodArray<z.ZodString>;
    accepted_capture_availability: z.ZodArray<z.ZodEnum<{
        "private-receipt": "private-receipt";
        public: "public";
    }>>;
    accepted_source_standings: z.ZodArray<z.ZodEnum<{
        "archived-first-party": "archived-first-party";
        "archived-third-party": "archived-third-party";
        "live-first-party": "live-first-party";
        "live-third-party": "live-third-party";
        "manual-first-party": "manual-first-party";
        "manual-third-party": "manual-third-party";
    }>>;
    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
        attested: "attested";
        derived: "derived";
        editorial: "editorial";
        observed: "observed";
    }>>;
    outcomes: z.ZodObject<{
        entity_identity: z.ZodObject<{
            scope: z.ZodLiteral<"identity-epoch">;
            coverage_paths: z.ZodTuple<[z.ZodLiteral<"/domains">, z.ZodLiteral<"/links">, z.ZodLiteral<"/name">], null>;
        }, z.core.$strict>;
        offer_terms: z.ZodObject<{
            scope: z.ZodLiteral<"exact-revision">;
            coverage: z.ZodLiteral<"applicable-offer-coverage-policy">;
        }, z.core.$strict>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const assuranceMethodPolicySchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.assurance-method-policy/v1alpha1">;
    method_id: z.ZodString;
    title: z.ZodString;
    summary: z.ZodString;
    decision_authority: z.ZodLiteral<"authorized-human-review">;
    accepted_observation_methods: z.ZodArray<z.ZodString>;
    accepted_capture_availability: z.ZodArray<z.ZodEnum<{
        "private-receipt": "private-receipt";
        public: "public";
    }>>;
    accepted_source_standings: z.ZodArray<z.ZodEnum<{
        "archived-first-party": "archived-first-party";
        "archived-third-party": "archived-third-party";
        "live-first-party": "live-first-party";
        "live-third-party": "live-third-party";
        "manual-first-party": "manual-first-party";
        "manual-third-party": "manual-third-party";
    }>>;
    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
        attested: "attested";
        derived: "derived";
        editorial: "editorial";
        observed: "observed";
    }>>;
    outcomes: z.ZodObject<{
        entity_identity: z.ZodObject<{
            scope: z.ZodLiteral<"identity-epoch">;
            coverage_paths: z.ZodTuple<[z.ZodLiteral<"/domains">, z.ZodLiteral<"/links">, z.ZodLiteral<"/name">], null>;
        }, z.core.$strict>;
        offer_terms: z.ZodObject<{
            scope: z.ZodLiteral<"exact-revision">;
            coverage: z.ZodLiteral<"applicable-offer-coverage-policy">;
        }, z.core.$strict>;
    }, z.core.$strict>;
    policy_digest: z.ZodString;
}, z.core.$strict>;
export declare const entityIdentityAnchorCoreSchema: z.ZodObject<{
    anchor_contract: z.ZodLiteral<"sourcey.entity-identity-anchor/v1alpha1">;
    entity_id: z.ZodString;
    name: z.ZodString;
    primary_domain: z.ZodString;
}, z.core.$strict>;
export declare const entityIdentityAnchorSchema: z.ZodObject<{
    anchor_contract: z.ZodLiteral<"sourcey.entity-identity-anchor/v1alpha1">;
    entity_id: z.ZodString;
    name: z.ZodString;
    primary_domain: z.ZodString;
    identity_epoch_digest: z.ZodString;
}, z.core.$strict>;
export declare const entityIdentityCheckedPayloadSchema: z.ZodObject<{
    assurance_id: z.ZodString;
    reviewer_id: z.ZodString;
    method_policy_digest: z.ZodString;
    receipt_digest: z.ZodString;
    checked_at: z.ZodISODateTime;
    identity_epoch_digest: z.ZodString;
    coverage_policy_digest: z.ZodString;
    coverage_paths: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export declare const offerTermsCheckedPayloadSchema: z.ZodObject<{
    assurance_id: z.ZodString;
    reviewer_id: z.ZodString;
    method_policy_digest: z.ZodString;
    receipt_digest: z.ZodString;
    checked_at: z.ZodISODateTime;
    coverage_policy_digest: z.ZodString;
    coverage_paths: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export declare const assuranceRevokedPayloadSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    assurance_id: z.ZodString;
    reviewer_id: z.ZodString;
    receipt_digest: z.ZodString;
    revoked_at: z.ZodISODateTime;
    reason_code: z.ZodString;
    assurance_kind: z.ZodLiteral<"entity_identity">;
    identity_epoch_digest: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    assurance_id: z.ZodString;
    reviewer_id: z.ZodString;
    receipt_digest: z.ZodString;
    revoked_at: z.ZodISODateTime;
    reason_code: z.ZodString;
    assurance_kind: z.ZodLiteral<"offer_terms">;
    revision_digest: z.ZodString;
}, z.core.$strict>], "assurance_kind">;
export declare const entityIdentityAssuranceSchema: z.ZodObject<{
    status: z.ZodLiteral<"verified">;
    assurance_id: z.ZodString;
    verified_at: z.ZodISODateTime;
    identity_epoch_digest: z.ZodString;
    method_policy_digest: z.ZodString;
    coverage_policy_digest: z.ZodString;
    event_id: z.ZodString;
    receipt_digest: z.ZodString;
}, z.core.$strict>;
export declare const offerTermsAssuranceSchema: z.ZodObject<{
    status: z.ZodLiteral<"checked">;
    assurance_id: z.ZodString;
    checked_at: z.ZodISODateTime;
    revision_digest: z.ZodString;
    method_policy_digest: z.ZodString;
    coverage_policy_digest: z.ZodString;
    event_id: z.ZodString;
    receipt_digest: z.ZodString;
}, z.core.$strict>;
export type EntityIdentityAssurance = z.infer<typeof entityIdentityAssuranceSchema>;
export type OfferTermsAssurance = z.infer<typeof offerTermsAssuranceSchema>;
export type AssuranceMethodPolicy = z.infer<typeof assuranceMethodPolicySchema>;
//# sourceMappingURL=index.d.ts.map