import { z } from "zod";
/**
 * Exact historical receipt envelope used only when replaying an immutable
 * release. Current receipt issuance remains governed by captureReceiptSchema.
 * Unknown historical fields are retained because they are signed bytes.
 */
export declare const retainedCaptureReceiptSchema: z.ZodObject<{
    receipt_contract: z.ZodLiteral<"sourcey.capture-receipt/v1alpha1">;
    receipt_digest: z.ZodString;
    issuer_id: z.ZodString;
    operation_id: z.ZodString;
    job_id: z.ZodString;
    base_release_id: z.ZodString;
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
    }, z.core.$strict>, z.ZodObject<{
        subject_type: z.ZodLiteral<"agent_readiness_profile">;
        entity_id: z.ZodString;
        agent_readiness_profile_id: z.ZodString;
        revision_digest: z.ZodString;
    }, z.core.$strict>], "subject_type">;
    authority_entity_revision_digest: z.ZodString;
    authority_program_revision_digest: z.ZodNullable<z.ZodString>;
    capture_policy_digest: z.ZodString;
    review_decision: z.ZodObject<{
        review_decision_contract: z.ZodLiteral<"sourcey.evidence-review-decision/v1alpha1">;
        review_proposal_digest: z.ZodString;
        decision_digest: z.ZodString;
        decision: z.ZodEnum<{
            approved: "approved";
            rejected: "rejected";
        }>;
        decided_at: z.ZodISODateTime;
        rationale: z.ZodNullable<z.ZodString>;
    }, z.core.$loose>;
    capture: z.ZodObject<{
        subject_source_url: z.ZodURL;
        requested_url: z.ZodURL;
        final_url: z.ZodURL;
        redirect_chain: z.ZodArray<z.ZodObject<{
            status: z.ZodUnion<readonly [z.ZodLiteral<301>, z.ZodLiteral<302>, z.ZodLiteral<303>, z.ZodLiteral<307>, z.ZodLiteral<308>]>;
            from: z.ZodURL;
            to: z.ZodURL;
        }, z.core.$strict>>;
        retrieved_at: z.ZodISODateTime;
        method: z.ZodEnum<{
            archive: "archive";
            headless: "headless";
            http: "http";
            manual: "manual";
        }>;
        response_status_code: z.ZodOptional<z.ZodNumber>;
        media_type: z.ZodString;
        digest: z.ZodString;
        availability: z.ZodEnum<{
            public: "public";
            restricted: "restricted";
        }>;
        bytes: z.ZodNumber;
    }, z.core.$loose>;
    issued_at: z.ZodISODateTime;
    protected: z.ZodObject<{
        signature_purpose: z.ZodEnum<{
            "catalog-attestation": "catalog-attestation";
            "catalog-authority": "catalog-authority";
            "catalog-capture": "catalog-capture";
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
}, z.core.$loose>;
export type RetainedCaptureReceipt = z.infer<typeof retainedCaptureReceiptSchema>;
//# sourceMappingURL=retained-capture-receipt.d.ts.map