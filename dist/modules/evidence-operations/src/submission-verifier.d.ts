import { type Digest } from "provenry/primitives";
import { z } from "zod";
import { type EvidenceAssertion, type EvidenceDerivationRule, type EvidenceProofKind, type EvidenceSourceStanding } from "../../../contracts/evidence/src/index.js";
import { type EntityRevision, type ListingRevision, type ProgramRevision } from "../../../contracts/revisions/src/index.js";
export { EVIDENCE_NORMALIZER, EVIDENCE_NORMALIZER_TOOLCHAIN, evidenceNormalizerSchema, normalizeEvidenceCapture, } from "./evidence-normalization.js";
declare const evidenceSubmissionCaptureSchema: z.ZodObject<{
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
    response_status_code: z.ZodNumber;
    media_type: z.ZodString;
    digest: z.ZodString;
    availability: z.ZodEnum<{
        public: "public";
        restricted: "restricted";
    }>;
    artifact_scope: z.ZodOptional<z.ZodEnum<{
        complete_document: "complete_document";
        document_excerpt: "document_excerpt";
    }>>;
    source_content: z.ZodOptional<z.ZodObject<{
        digest: z.ZodString;
        bytes: z.ZodNumber;
        media_type: z.ZodString;
        normalized_digest: z.ZodString;
        normalized_bytes: z.ZodNumber;
    }, z.core.$strict>>;
}, z.core.$strict>;
declare const evidenceSubmissionNormalizationSchema: z.ZodObject<{
    normalizer_contract: z.ZodLiteral<"sourcey.evidence-normalizer/v1alpha1">;
    normalizer_id: z.ZodLiteral<"sourcey-deterministic-content">;
    version: z.ZodLiteral<"1">;
    toolchain_digest: z.ZodLiteral<`sha256:${string}`>;
    object_digest: z.ZodString;
}, z.core.$strict>;
export declare const evidenceSubmissionSchema: z.ZodObject<{
    submission_contract: z.ZodLiteral<"sourcey.evidence-submission/v1alpha1">;
    base_revision_digest: z.ZodString;
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
        response_status_code: z.ZodNumber;
        media_type: z.ZodString;
        digest: z.ZodString;
        availability: z.ZodEnum<{
            public: "public";
            restricted: "restricted";
        }>;
        artifact_scope: z.ZodOptional<z.ZodEnum<{
            complete_document: "complete_document";
            document_excerpt: "document_excerpt";
        }>>;
        source_content: z.ZodOptional<z.ZodObject<{
            digest: z.ZodString;
            bytes: z.ZodNumber;
            media_type: z.ZodString;
            normalized_digest: z.ZodString;
            normalized_bytes: z.ZodNumber;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    normalization: z.ZodObject<{
        normalizer_contract: z.ZodLiteral<"sourcey.evidence-normalizer/v1alpha1">;
        normalizer_id: z.ZodLiteral<"sourcey-deterministic-content">;
        version: z.ZodLiteral<"1">;
        toolchain_digest: z.ZodLiteral<`sha256:${string}`>;
        object_digest: z.ZodString;
    }, z.core.$strict>;
    assertions: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        polarity: z.ZodEnum<{
            contradicts: "contradicts";
            supports: "supports";
        }>;
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
    }, z.core.$strict>>;
}, z.core.$strict>;
export type EvidenceSubmission = z.infer<typeof evidenceSubmissionSchema>;
export type EvidenceSubmissionCapture = z.infer<typeof evidenceSubmissionCaptureSchema>;
export type EvidenceSubmissionNormalization = z.infer<typeof evidenceSubmissionNormalizationSchema>;
export type { EvidenceSourceStanding };
interface VerifiedEvidenceAssertion {
    readonly path: string;
    readonly polarity: "supports" | "contradicts";
    readonly proofKind: EvidenceProofKind;
    readonly derivationRule: EvidenceDerivationRule | null;
    readonly values: readonly {
        readonly valueDigest: Digest;
        readonly text: string;
    }[];
}
interface VerifiedEvidenceSubmission {
    readonly submission: EvidenceSubmission;
    readonly sourceStanding: EvidenceSourceStanding;
    readonly normalizedBytes: Uint8Array;
    readonly assertions: readonly VerifiedEvidenceAssertion[];
}
export declare const evidenceReviewProposalSchema: z.ZodObject<{
    proposal_contract: z.ZodLiteral<"sourcey.evidence-review-proposal/v1alpha1">;
    operation_id: z.ZodString;
    job_id: z.ZodString;
    target_id: z.ZodString;
    base_release_id: z.ZodString;
    capture_policy_digest: z.ZodString;
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
    }, z.core.$strict>, z.ZodObject<{
        subject_type: z.ZodLiteral<"agent_readiness_profile">;
        entity_id: z.ZodString;
        agent_readiness_profile_id: z.ZodString;
        revision_digest: z.ZodString;
    }, z.core.$strict>], "subject_type">;
    authority_entity_revision_digest: z.ZodString;
    authority_program_revision_digest: z.ZodNullable<z.ZodString>;
    submission: z.ZodObject<{
        submission_contract: z.ZodLiteral<"sourcey.evidence-submission/v1alpha1">;
        base_revision_digest: z.ZodString;
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
            response_status_code: z.ZodNumber;
            media_type: z.ZodString;
            digest: z.ZodString;
            availability: z.ZodEnum<{
                public: "public";
                restricted: "restricted";
            }>;
            artifact_scope: z.ZodOptional<z.ZodEnum<{
                complete_document: "complete_document";
                document_excerpt: "document_excerpt";
            }>>;
            source_content: z.ZodOptional<z.ZodObject<{
                digest: z.ZodString;
                bytes: z.ZodNumber;
                media_type: z.ZodString;
                normalized_digest: z.ZodString;
                normalized_bytes: z.ZodNumber;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        normalization: z.ZodObject<{
            normalizer_contract: z.ZodLiteral<"sourcey.evidence-normalizer/v1alpha1">;
            normalizer_id: z.ZodLiteral<"sourcey-deterministic-content">;
            version: z.ZodLiteral<"1">;
            toolchain_digest: z.ZodLiteral<`sha256:${string}`>;
            object_digest: z.ZodString;
        }, z.core.$strict>;
        assertions: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            polarity: z.ZodEnum<{
                contradicts: "contradicts";
                supports: "supports";
            }>;
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
        }, z.core.$strict>>;
    }, z.core.$strict>;
    review_projection: z.ZodObject<{
        source_standing: z.ZodEnum<{
            "archived-first-party": "archived-first-party";
            "archived-third-party": "archived-third-party";
            "live-first-party": "live-first-party";
            "live-third-party": "live-third-party";
            "manual-first-party": "manual-first-party";
            "manual-third-party": "manual-third-party";
        }>;
        assertions: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            polarity: z.ZodEnum<{
                contradicts: "contradicts";
                supports: "supports";
            }>;
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
            values: z.ZodArray<z.ZodObject<{
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
                text: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    proposal_digest: z.ZodString;
}, z.core.$strict>;
export type EvidenceReviewProposal = z.infer<typeof evidenceReviewProposalSchema>;
/**
 * Validates the self-contained proposal envelope at a persistence or provider
 * boundary. This intentionally does not claim that the referenced evidence is
 * true; the offline verifier below performs that stronger check from the exact
 * capture, normalized, and revision bytes.
 */
export declare function validateEvidenceReviewProposalEnvelope(proposal: unknown): EvidenceReviewProposal;
/**
 * The one local-byte verification kernel used by proposal preparation and CI.
 * It has no network, filesystem, provider, signing, or mutation dependency.
 */
export declare function verifyEvidenceSubmission(input: {
    readonly submission: unknown;
    readonly captureBytes: Uint8Array;
    readonly normalizedBytes: Uint8Array;
    readonly revision: ListingRevision;
    readonly authorityEntityRevision: EntityRevision;
    readonly authorityProgramRevision: ProgramRevision | null;
}): VerifiedEvidenceSubmission;
/**
 * The one byte-level capture verifier used before claim matching and again
 * when accepted matches enter ordinary evidence authority.
 */
export declare function verifyEvidenceCaptureObjects(input: {
    readonly capture: unknown;
    readonly normalization: unknown;
    readonly captureBytes: Uint8Array;
    readonly normalizedBytes: Uint8Array;
}): {
    readonly capture: EvidenceSubmissionCapture;
    readonly normalization: EvidenceSubmissionNormalization;
    readonly normalizedBytes: Uint8Array;
};
export declare function verifyEvidenceAssertions(input: {
    readonly assertions: readonly EvidenceAssertion[];
    readonly normalizedBytes: Uint8Array;
    readonly revision: ListingRevision;
}): readonly VerifiedEvidenceAssertion[];
export declare function prepareEvidenceReviewProposal(input: {
    readonly operationId: Digest;
    readonly jobId: Digest;
    readonly targetId: string;
    readonly baseReleaseId: Digest;
    readonly capturePolicyDigest: Digest;
    readonly coveragePolicyDigest: Digest;
    readonly submission: unknown;
    readonly captureBytes: Uint8Array;
    readonly normalizedBytes: Uint8Array;
    readonly revision: ListingRevision;
    readonly authorityEntityRevision: EntityRevision;
    readonly authorityProgramRevision: ProgramRevision | null;
}): EvidenceReviewProposal;
export declare function verifyEvidenceReviewProposal(input: {
    readonly proposal: unknown;
    readonly captureBytes: Uint8Array;
    readonly normalizedBytes: Uint8Array;
    readonly revision: ListingRevision;
    readonly authorityEntityRevision: EntityRevision;
    readonly authorityProgramRevision: ProgramRevision | null;
    readonly expectedBaseReleaseId?: Digest;
}): EvidenceReviewProposal;
export declare function deriveSourceStanding(capture: Pick<EvidenceSubmission["capture"], "subject_source_url" | "final_url" | "retrieved_at" | "method">, authorityEntityRevision: {
    readonly content: Pick<EntityRevision["content"], "domains">;
}): EvidenceSourceStanding;
export declare function validateEvidenceCaptureDeclaration(capture: EvidenceSubmission["capture"]): EvidenceSubmission["capture"];
//# sourceMappingURL=submission-verifier.d.ts.map