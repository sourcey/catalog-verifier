import { z } from "zod";
export declare const reviewEvidenceBasisSchema: z.ZodObject<{
    evidence_event_ids: z.ZodArray<z.ZodString>;
    observation_ids: z.ZodArray<z.ZodString>;
    retained_artifact_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strict>;
export declare const companyIdentityReviewDecisionSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    status: z.ZodLiteral<"passed">;
    rationale: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    status: z.ZodLiteral<"failed">;
    reason_code: z.ZodEnum<{
        identity_mismatch: "identity_mismatch";
        identity_unresolved: "identity_unresolved";
        insufficient_evidence: "insufficient_evidence";
    }>;
    rationale: z.ZodString;
    basis: z.ZodObject<{
        evidence_event_ids: z.ZodArray<z.ZodString>;
        observation_ids: z.ZodArray<z.ZodString>;
        retained_artifact_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>;
}, z.core.$strict>], "status">;
/** The new-listing company target; a product review composes its own required fields. */
export declare const companyVerificationNewListingTargetSchema: z.ZodObject<{
    kind: z.ZodLiteral<"new_listing">;
    base_release_id: z.ZodString;
    entity_id: z.ZodString;
    submission_id: z.ZodString;
    submission_payload_digest: z.ZodString;
}, z.core.$strict>;
/**
 * One completed identity review's factual fields and binding checks. It is
 * neither payment authority nor evidence admission. Fulfilment must read back
 * the exact assurance against the current identity epoch before completing.
 * Each product composes its exact target; this core binds only its company.
 */
export declare const completedCompanyReviewCoreSchema: z.ZodObject<{
    order_id: z.ZodString;
    funded_work_intent_id: z.ZodString;
    funded_work_intent_digest: z.ZodString;
    verification_case_id: z.ZodString;
    target: z.ZodObject<{
        entity_id: z.ZodString;
    }, z.core.$strip>;
    method_policy_digest: z.ZodString;
    reviewer_id: z.ZodString;
    reviewed_at: z.ZodISODateTime;
    readback_release_id: z.ZodString;
    work_outcome: z.ZodLiteral<"review_delivered">;
    entity_identity: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"passed">;
        entity_id: z.ZodString;
        assurance: z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            assurance_id: z.ZodString;
            verified_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"reused">;
        entity_id: z.ZodString;
        assurance: z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            assurance_id: z.ZodString;
            verified_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"failed">;
        entity_id: z.ZodString;
        reason_code: z.ZodEnum<{
            identity_mismatch: "identity_mismatch";
            identity_unresolved: "identity_unresolved";
            insufficient_evidence: "insufficient_evidence";
        }>;
        rationale: z.ZodString;
        basis: z.ZodObject<{
            evidence_event_ids: z.ZodArray<z.ZodString>;
            observation_ids: z.ZodArray<z.ZodString>;
            retained_artifact_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
        }, z.core.$strict>;
    }, z.core.$strict>], "status">;
}, z.core.$strict>;
export type CompletedCompanyReviewCore = z.infer<typeof completedCompanyReviewCoreSchema>;
//# sourceMappingURL=index.d.ts.map