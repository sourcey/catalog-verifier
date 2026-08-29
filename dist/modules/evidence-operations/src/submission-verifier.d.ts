import { z } from "zod";
import type { AgentReadinessRevision } from "../../../contracts/agent-readiness/src/index.js";
import { type EvidenceAssertion, type EvidenceDerivationRule, type EvidenceProofKind, type EvidenceSourceStanding } from "../../../contracts/evidence/src/index.js";
import type { EntityRevision, OfferRevision, ProgramRevision } from "../../../contracts/revisions/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
export { EVIDENCE_NORMALIZER, EVIDENCE_NORMALIZER_CANONICAL_LINK, EVIDENCE_NORMALIZER_CANONICAL_LINK_TOOLCHAIN, EVIDENCE_NORMALIZER_FOUNDATION, EVIDENCE_NORMALIZER_FOUNDATION_TOOLCHAIN, EVIDENCE_NORMALIZER_PRE_EMPTY_HTML_VALUES_TOOLCHAIN, EVIDENCE_NORMALIZER_PRE_EMPTY_HTML_VALUES_XML_TOOLCHAIN, EVIDENCE_NORMALIZER_PRE_JSON_VARIANTS_TOOLCHAIN, EVIDENCE_NORMALIZER_TOOLCHAIN, EVIDENCE_NORMALIZER_WEB_LINK_TOOLCHAIN, EVIDENCE_NORMALIZER_XML, EVIDENCE_NORMALIZER_XML_TOOLCHAIN, evidenceNormalizerForToolchainDigest, evidenceNormalizerSchema, normalizeEvidenceCapture, } from "./evidence-normalization.js";
export declare const EVIDENCE_SUBMISSION_LIMITS: {
    readonly captureBytes: number;
    readonly normalizedBytes: number;
    readonly assertions: 128;
    readonly locatorsPerAssertion: 16;
    readonly redirects: 5;
};
export declare const evidenceSubmissionCaptureSchema: z.ZodObject<{
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
        http: "http";
        headless: "headless";
        archive: "archive";
        manual: "manual";
    }>;
    response_status_code: z.ZodNumber;
    media_type: z.ZodString;
    digest: z.ZodString;
    availability: z.ZodEnum<{
        public: "public";
        restricted: "restricted";
    }>;
}, z.core.$strict>;
export declare const evidenceSubmissionNormalizationSchema: z.ZodObject<{
    normalizer_contract: z.ZodLiteral<"sourcey.evidence-normalizer/v1alpha1">;
    normalizer_id: z.ZodLiteral<"sourcey-deterministic-content">;
    version: z.ZodLiteral<"1">;
    toolchain_digest: z.ZodString;
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
            http: "http";
            headless: "headless";
            archive: "archive";
            manual: "manual";
        }>;
        response_status_code: z.ZodNumber;
        media_type: z.ZodString;
        digest: z.ZodString;
        availability: z.ZodEnum<{
            public: "public";
            restricted: "restricted";
        }>;
    }, z.core.$strict>;
    normalization: z.ZodObject<{
        normalizer_contract: z.ZodLiteral<"sourcey.evidence-normalizer/v1alpha1">;
        normalizer_id: z.ZodLiteral<"sourcey-deterministic-content">;
        version: z.ZodLiteral<"1">;
        toolchain_digest: z.ZodString;
        object_digest: z.ZodString;
    }, z.core.$strict>;
    assertions: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        polarity: z.ZodEnum<{
            supports: "supports";
            contradicts: "contradicts";
        }>;
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
    }, z.core.$strict>>;
}, z.core.$strict>;
export type EvidenceSubmission = z.infer<typeof evidenceSubmissionSchema>;
export type EvidenceSubmissionCapture = z.infer<typeof evidenceSubmissionCaptureSchema>;
export type EvidenceSubmissionNormalization = z.infer<typeof evidenceSubmissionNormalizationSchema>;
export type { EvidenceSourceStanding };
export interface VerifiedEvidenceAssertion {
    readonly path: string;
    readonly polarity: "supports" | "contradicts";
    readonly proofKind: EvidenceProofKind;
    readonly derivationRule: EvidenceDerivationRule | null;
    readonly values: readonly {
        readonly valueDigest: Digest;
        readonly text: string;
    }[];
}
export interface VerifiedEvidenceSubmission {
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
                http: "http";
                headless: "headless";
                archive: "archive";
                manual: "manual";
            }>;
            response_status_code: z.ZodNumber;
            media_type: z.ZodString;
            digest: z.ZodString;
            availability: z.ZodEnum<{
                public: "public";
                restricted: "restricted";
            }>;
        }, z.core.$strict>;
        normalization: z.ZodObject<{
            normalizer_contract: z.ZodLiteral<"sourcey.evidence-normalizer/v1alpha1">;
            normalizer_id: z.ZodLiteral<"sourcey-deterministic-content">;
            version: z.ZodLiteral<"1">;
            toolchain_digest: z.ZodString;
            object_digest: z.ZodString;
        }, z.core.$strict>;
        assertions: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            polarity: z.ZodEnum<{
                supports: "supports";
                contradicts: "contradicts";
            }>;
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
        }, z.core.$strict>>;
    }, z.core.$strict>;
    review_projection: z.ZodObject<{
        source_standing: z.ZodEnum<{
            "live-first-party": "live-first-party";
            "archived-first-party": "archived-first-party";
            "live-third-party": "live-third-party";
            "archived-third-party": "archived-third-party";
            "manual-first-party": "manual-first-party";
            "manual-third-party": "manual-third-party";
        }>;
        assertions: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            polarity: z.ZodEnum<{
                supports: "supports";
                contradicts: "contradicts";
            }>;
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
type Revision = EntityRevision | ProgramRevision | OfferRevision | AgentReadinessRevision;
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
    readonly revision: Revision;
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
    readonly revision: Revision;
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
    readonly revision: Revision;
    readonly authorityEntityRevision: EntityRevision;
    readonly authorityProgramRevision: ProgramRevision | null;
}): EvidenceReviewProposal;
export declare function verifyEvidenceReviewProposal(input: {
    readonly proposal: unknown;
    readonly captureBytes: Uint8Array;
    readonly normalizedBytes: Uint8Array;
    readonly revision: Revision;
    readonly authorityEntityRevision: EntityRevision;
    readonly authorityProgramRevision: ProgramRevision | null;
    readonly expectedBaseReleaseId?: Digest;
}): EvidenceReviewProposal;
export declare function deriveSourceStanding(capture: EvidenceSubmission["capture"], authorityEntityRevision: EntityRevision): EvidenceSourceStanding;
export declare function validateEvidenceCaptureDeclaration(capture: EvidenceSubmission["capture"]): EvidenceSubmission["capture"];
//# sourceMappingURL=submission-verifier.d.ts.map