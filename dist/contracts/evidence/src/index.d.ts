import { z } from "zod";
export declare const evidenceArtifactScopeSchema: z.ZodEnum<{
    complete_document: "complete_document";
    document_excerpt: "document_excerpt";
}>;
export declare const evidenceSourceContentSchema: z.ZodObject<{
    digest: z.ZodString;
    bytes: z.ZodNumber;
    media_type: z.ZodString;
    normalized_digest: z.ZodString;
    normalized_bytes: z.ZodNumber;
}, z.core.$strict>;
export declare function validateEvidenceArtifactScopeClosure(value: {
    readonly artifact_scope?: z.infer<typeof evidenceArtifactScopeSchema> | undefined;
    readonly source_content?: z.infer<typeof evidenceSourceContentSchema> | undefined;
}, context: z.RefinementCtx): void;
export declare const EVIDENCE_LOCATORS_PER_ASSERTION_LIMIT = 16;
export declare const evidenceCaptureMethodSchema: z.ZodEnum<{
    archive: "archive";
    headless: "headless";
    http: "http";
    manual: "manual";
}>;
export declare const evidenceCaptureAvailabilitySchema: z.ZodEnum<{
    "private-receipt": "private-receipt";
    public: "public";
}>;
export declare const evidencePublicReadRequestSchema: z.ZodObject<{
    method: z.ZodLiteral<"GET">;
    target_url: z.ZodOptional<z.ZodURL>;
    headers: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
/** The exact physical request retained for evidence replay. */
export declare const evidenceCaptureRequestSchema: z.ZodUnion<readonly [z.ZodObject<{
    method: z.ZodLiteral<"GET">;
    target_url: z.ZodOptional<z.ZodURL>;
    headers: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>, z.ZodObject<{
    method: z.ZodLiteral<"STANDARD_OBSERVATION">;
    observations: z.ZodArray<z.ZodObject<{
        standard: z.ZodObject<{
            namespace: z.ZodString;
            version: z.ZodString;
        }, z.core.$strict>;
        probe_digest: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>]>;
export declare const evidencePublicReadRequestSetSchema: z.ZodObject<{
    request_set_contract: z.ZodLiteral<"sourcey.evidence-public-read-request-set/v1alpha1">;
    requests: z.ZodArray<z.ZodObject<{
        source_url: z.ZodURL;
        request: z.ZodObject<{
            method: z.ZodLiteral<"GET">;
            target_url: z.ZodOptional<z.ZodURL>;
            headers: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                value: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const evidenceProofKindSchema: z.ZodEnum<{
    attested: "attested";
    derived: "derived";
    editorial: "editorial";
    observed: "observed";
}>;
export declare const evidenceDerivationRuleSchema: z.ZodEnum<{
    "consideration-from-benefits": "consideration-from-benefits";
    "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
    "eligibility-composition-from-criteria": "eligibility-composition-from-criteria";
    "first-party-access-operator": "first-party-access-operator";
    "form-access-from-first-party-application": "form-access-from-first-party-application";
    "public-availability-from-application": "public-availability-from-application";
}>;
export declare function evidenceDerivationRuleTarget(rule: z.infer<typeof evidenceDerivationRuleSchema>): string;
/** True when `path` is a pointer the rule may assert. */
export declare function evidenceDerivationRuleApplies(rule: z.infer<typeof evidenceDerivationRuleSchema>, path: string): boolean;
export declare const evidenceSourceStandingSchema: z.ZodEnum<{
    "archived-first-party": "archived-first-party";
    "archived-third-party": "archived-third-party";
    "live-first-party": "live-first-party";
    "live-third-party": "live-third-party";
    "manual-first-party": "manual-first-party";
    "manual-third-party": "manual-third-party";
}>;
export declare const evidenceRedirectSchema: z.ZodObject<{
    status: z.ZodUnion<readonly [z.ZodLiteral<301>, z.ZodLiteral<302>, z.ZodLiteral<303>, z.ZodLiteral<307>, z.ZodLiteral<308>]>;
    from: z.ZodURL;
    to: z.ZodURL;
}, z.core.$strict>;
export declare const evidenceNormalizedObjectSchema: z.ZodObject<{
    digest: z.ZodString;
    bytes: z.ZodNumber;
    media_type: z.ZodLiteral<"text/plain; charset=utf-8">;
    normalizer_contract: z.ZodLiteral<"sourcey.evidence-normalizer/v1alpha1">;
    normalizer_id: z.ZodString;
    version: z.ZodString;
    toolchain_digest: z.ZodString;
}, z.core.$strict>;
export declare const evidenceLocatorSchema: z.ZodObject<{
    kind: z.ZodLiteral<"utf8-range">;
    start_byte: z.ZodNumber;
    end_byte: z.ZodNumber;
    value_digest: z.ZodString;
}, z.core.$strict>;
export declare const evidenceAssertionSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const entityEvidenceSubjectSchema: z.ZodObject<{
    subject_type: z.ZodLiteral<"entity">;
    entity_id: z.ZodString;
}, z.core.$strict>;
export declare const programEvidenceSubjectSchema: z.ZodObject<{
    subject_type: z.ZodLiteral<"program">;
    entity_id: z.ZodString;
    program_id: z.ZodString;
}, z.core.$strict>;
export declare const offerEvidenceSubjectSchema: z.ZodObject<{
    subject_type: z.ZodLiteral<"offer">;
    entity_id: z.ZodString;
    program_id: z.ZodOptional<z.ZodString>;
    offer_id: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessEvidenceSubjectSchema: z.ZodObject<{
    subject_type: z.ZodLiteral<"agent_readiness_profile">;
    entity_id: z.ZodString;
    agent_readiness_profile_id: z.ZodString;
}, z.core.$strict>;
export declare const evidenceSubjectSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    subject_type: z.ZodLiteral<"entity">;
    entity_id: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    subject_type: z.ZodLiteral<"program">;
    entity_id: z.ZodString;
    program_id: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    subject_type: z.ZodLiteral<"offer">;
    entity_id: z.ZodString;
    program_id: z.ZodOptional<z.ZodString>;
    offer_id: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    subject_type: z.ZodLiteral<"agent_readiness_profile">;
    entity_id: z.ZodString;
    agent_readiness_profile_id: z.ZodString;
}, z.core.$strict>], "subject_type">;
export declare const evidenceReceiptSubjectSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
export declare const evidenceReviewDecisionCoreSchema: z.ZodObject<{
    review_decision_contract: z.ZodLiteral<"sourcey.evidence-review-decision/v1alpha1">;
    review_proposal_digest: z.ZodString;
    decision_basis: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"human">;
        actor_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"policy">;
        policy_id: z.ZodString;
        policy_digest: z.ZodString;
        evaluator_id: z.ZodString;
        evaluator_digest: z.ZodString;
        input_digest: z.ZodString;
        execution_receipt_digest: z.ZodString;
    }, z.core.$strict>], "kind">;
    decision: z.ZodEnum<{
        approved: "approved";
        rejected: "rejected";
    }>;
    decided_at: z.ZodISODateTime;
    rationale: z.ZodNullable<z.ZodString>;
}, z.core.$strict>;
export declare const evidenceReviewDecisionSchema: z.ZodObject<{
    review_decision_contract: z.ZodLiteral<"sourcey.evidence-review-decision/v1alpha1">;
    review_proposal_digest: z.ZodString;
    decision_basis: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"human">;
        actor_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"policy">;
        policy_id: z.ZodString;
        policy_digest: z.ZodString;
        evaluator_id: z.ZodString;
        evaluator_digest: z.ZodString;
        input_digest: z.ZodString;
        execution_receipt_digest: z.ZodString;
    }, z.core.$strict>], "kind">;
    decision: z.ZodEnum<{
        approved: "approved";
        rejected: "rejected";
    }>;
    decided_at: z.ZodISODateTime;
    rationale: z.ZodNullable<z.ZodString>;
    decision_digest: z.ZodString;
}, z.core.$strict>;
export declare const evidenceCaptureDeclarationSchema: z.ZodObject<{
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
export declare const captureReceiptCoreSchema: z.ZodObject<{
    receipt_contract: z.ZodLiteral<"sourcey.capture-receipt/v1alpha1">;
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
        decision_basis: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"human">;
            actor_id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"policy">;
            policy_id: z.ZodString;
            policy_digest: z.ZodString;
            evaluator_id: z.ZodString;
            evaluator_digest: z.ZodString;
            input_digest: z.ZodString;
            execution_receipt_digest: z.ZodString;
        }, z.core.$strict>], "kind">;
        decision: z.ZodEnum<{
            approved: "approved";
            rejected: "rejected";
        }>;
        decided_at: z.ZodISODateTime;
        rationale: z.ZodNullable<z.ZodString>;
        decision_digest: z.ZodString;
    }, z.core.$strict>;
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
        bytes: z.ZodNumber;
    }, z.core.$strict>;
    issued_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const captureReceiptSchema: z.ZodObject<{
    receipt_contract: z.ZodLiteral<"sourcey.capture-receipt/v1alpha1">;
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
        decision_basis: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"human">;
            actor_id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"policy">;
            policy_id: z.ZodString;
            policy_digest: z.ZodString;
            evaluator_id: z.ZodString;
            evaluator_digest: z.ZodString;
            input_digest: z.ZodString;
            execution_receipt_digest: z.ZodString;
        }, z.core.$strict>], "kind">;
        decision: z.ZodEnum<{
            approved: "approved";
            rejected: "rejected";
        }>;
        decided_at: z.ZodISODateTime;
        rationale: z.ZodNullable<z.ZodString>;
        decision_digest: z.ZodString;
    }, z.core.$strict>;
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
        bytes: z.ZodNumber;
    }, z.core.$strict>;
    issued_at: z.ZodISODateTime;
    receipt_digest: z.ZodString;
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
}, z.core.$strict>;
export declare const evidenceAuthorityBundleCoreSchema: z.ZodObject<{
    bundle_contract: z.ZodLiteral<"sourcey.evidence-authority-bundle/v1alpha1">;
    proposal_digest: z.ZodString;
    review_decision_digest: z.ZodString;
    base_release_id: z.ZodString;
    capture_receipt_digest: z.ZodString;
    revision_digests: z.ZodArray<z.ZodString>;
    observation_ids: z.ZodArray<z.ZodString>;
    event_ids: z.ZodArray<z.ZodString>;
    release_inclusion: z.ZodLiteral<"pending">;
    objects: z.ZodRecord<z.ZodString, z.ZodObject<{
        sha256: z.ZodString;
        bytes: z.ZodNumber;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const evidenceAuthorityBundleManifestSchema: z.ZodObject<{
    bundle_contract: z.ZodLiteral<"sourcey.evidence-authority-bundle/v1alpha1">;
    proposal_digest: z.ZodString;
    review_decision_digest: z.ZodString;
    base_release_id: z.ZodString;
    capture_receipt_digest: z.ZodString;
    revision_digests: z.ZodArray<z.ZodString>;
    observation_ids: z.ZodArray<z.ZodString>;
    event_ids: z.ZodArray<z.ZodString>;
    release_inclusion: z.ZodLiteral<"pending">;
    objects: z.ZodRecord<z.ZodString, z.ZodObject<{
        sha256: z.ZodString;
        bytes: z.ZodNumber;
    }, z.core.$strict>>;
    bundle_digest: z.ZodString;
}, z.core.$strict>;
export declare const evidenceAuthoritySetCoreSchema: z.ZodObject<{
    authority_set_contract: z.ZodLiteral<"sourcey.evidence-authority-set/v1alpha1">;
    base_release_id: z.ZodString;
    target_signer_registry_digest: z.ZodString;
    bundles: z.ZodArray<z.ZodObject<{
        proposal_digest: z.ZodString;
        bundle_digest: z.ZodString;
        manifest: z.ZodObject<{
            digest: z.ZodString;
            bytes: z.ZodNumber;
        }, z.core.$strict>;
    }, z.core.$strict>>;
    objects: z.ZodArray<z.ZodObject<{
        digest: z.ZodString;
        bytes: z.ZodNumber;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const evidenceAuthoritySetManifestSchema: z.ZodObject<{
    authority_set_contract: z.ZodLiteral<"sourcey.evidence-authority-set/v1alpha1">;
    base_release_id: z.ZodString;
    target_signer_registry_digest: z.ZodString;
    bundles: z.ZodArray<z.ZodObject<{
        proposal_digest: z.ZodString;
        bundle_digest: z.ZodString;
        manifest: z.ZodObject<{
            digest: z.ZodString;
            bytes: z.ZodNumber;
        }, z.core.$strict>;
    }, z.core.$strict>>;
    objects: z.ZodArray<z.ZodObject<{
        digest: z.ZodString;
        bytes: z.ZodNumber;
    }, z.core.$strict>>;
    authority_set_digest: z.ZodString;
}, z.core.$strict>;
export type EvidenceSourceStanding = z.infer<typeof evidenceSourceStandingSchema>;
export type EvidenceCaptureRequest = z.infer<typeof evidenceCaptureRequestSchema>;
export type EvidenceRedirect = z.infer<typeof evidenceRedirectSchema>;
export type EvidenceNormalizedObject = z.infer<typeof evidenceNormalizedObjectSchema>;
export type EvidenceProofKind = z.infer<typeof evidenceProofKindSchema>;
export type EvidenceDerivationRule = z.infer<typeof evidenceDerivationRuleSchema>;
export type EvidenceAssertion = z.infer<typeof evidenceAssertionSchema>;
export type EvidenceReceiptSubject = z.infer<typeof evidenceReceiptSubjectSchema>;
export type EvidenceReviewDecisionCore = z.infer<typeof evidenceReviewDecisionCoreSchema>;
export type EvidenceReviewDecision = z.infer<typeof evidenceReviewDecisionSchema>;
export type CaptureReceiptCore = z.infer<typeof captureReceiptCoreSchema>;
export type CaptureReceipt = z.infer<typeof captureReceiptSchema>;
export type EvidenceAuthorityBundleManifest = z.infer<typeof evidenceAuthorityBundleManifestSchema>;
export type EvidenceAuthoritySetManifest = z.infer<typeof evidenceAuthoritySetManifestSchema>;
//# sourceMappingURL=index.d.ts.map