import { z } from "zod";
export declare const verifierRepositoryKindSchema: z.ZodEnum<{
    "agent-readiness": "agent-readiness";
    "startup-credits": "startup-credits";
}>;
export type VerifierRepositoryKind = z.infer<typeof verifierRepositoryKindSchema>;
export declare const MAXIMUM_CATALOG_ADMISSION_KEYS = 128;
export declare const MAXIMUM_CATALOG_ADMISSION_MATCHES = 512;
export declare const MAXIMUM_PENDING_ADMISSION_KEYS = 8192;
export declare const catalogAdmissionKeyDigestsSchema: z.ZodArray<z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>>;
export declare const catalogAdmissionKeyKindSchema: z.ZodEnum<{
    domain: "domain";
    entity_id: "entity_id";
    entity_name: "entity_name";
    entity_slug: "entity_slug";
    entity_url: "entity_url";
    evidence_url: "evidence_url";
    offer_id: "offer_id";
    offer_slug: "offer_slug";
    offer_url: "offer_url";
    program_id: "program_id";
    program_slug: "program_slug";
    semantic_offer: "semantic_offer";
}>;
export type CatalogAdmissionKeyKind = z.infer<typeof catalogAdmissionKeyKindSchema>;
export declare const catalogAdmissionKeySchema: z.ZodObject<{
    kind: z.ZodEnum<{
        domain: "domain";
        entity_id: "entity_id";
        entity_name: "entity_name";
        entity_slug: "entity_slug";
        entity_url: "entity_url";
        evidence_url: "evidence_url";
        offer_id: "offer_id";
        offer_slug: "offer_slug";
        offer_url: "offer_url";
        program_id: "program_id";
        program_slug: "program_slug";
        semantic_offer: "semantic_offer";
    }>;
    normalizedValue: z.ZodString;
    keyDigest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
    candidateReference: z.ZodString;
    candidateIdentityDigest: z.ZodOptional<z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>>;
}, z.core.$strict>;
export declare const catalogAdmissionCandidateSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    kind: z.ZodLiteral<"git_pull_request">;
    repository: z.ZodString;
    pullRequestNumber: z.ZodNumber;
    headSha: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"detached">;
    repositoryKind: z.ZodEnum<{
        "agent-readiness": "agent-readiness";
        "startup-credits": "startup-credits";
    }>;
    candidateDigest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
    candidateReference: z.ZodString;
}, z.core.$strict>], "kind">;
export type CatalogAdmissionCandidate = z.infer<typeof catalogAdmissionCandidateSchema>;
export declare const catalogAdmissionKeyMatchSchema: z.ZodObject<{
    keyDigest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
    targetReference: z.ZodString;
    targetIdentityDigest: z.ZodOptional<z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>>;
    source: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"current_catalog">;
        liveParentReleaseId: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"open_pull_request">;
        repository: z.ZodString;
        pullRequestNumber: z.ZodNumber;
        headSha: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"pending_git_lineage">;
        repository: z.ZodString;
        liveSourceCommit: z.ZodString;
        targetCommit: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"pending_submission">;
        candidateReference: z.ZodString;
        candidateDigest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
    }, z.core.$strict>], "kind">;
}, z.core.$strict>;
/** Private pending-contribution projection, derived by Catalog, never authored by contributors. */
export declare const openPullRequestAdmissionKeySchema: z.ZodObject<{
    keyDigest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
    targetReference: z.ZodString;
    targetIdentityDigest: z.ZodOptional<z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>>;
}, z.core.$strict>;
export declare const openPullRequestAdmissionCandidateSchema: z.ZodObject<{
    repository: z.ZodString;
    pullRequestNumber: z.ZodNumber;
    headSha: z.ZodString;
    baseSha: z.ZodString;
    keys: z.ZodReadonly<z.ZodArray<z.ZodObject<{
        keyDigest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
        targetReference: z.ZodString;
        targetIdentityDigest: z.ZodOptional<z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>>;
    }, z.core.$strict>>>;
}, z.core.$strict>;
export declare const catalogAdmissionConflictLookupRequestSchema: z.ZodObject<{
    query_contract: z.ZodLiteral<"sourcey.catalog-admission-conflict-query/v1alpha1">;
    keys: z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            domain: "domain";
            entity_id: "entity_id";
            entity_name: "entity_name";
            entity_slug: "entity_slug";
            entity_url: "entity_url";
            evidence_url: "evidence_url";
            offer_id: "offer_id";
            offer_slug: "offer_slug";
            offer_url: "offer_url";
            program_id: "program_id";
            program_slug: "program_slug";
            semantic_offer: "semantic_offer";
        }>;
        normalizedValue: z.ZodString;
        keyDigest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
        candidateReference: z.ZodString;
        candidateIdentityDigest: z.ZodOptional<z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>>;
    }, z.core.$strict>>;
    liveParentReleaseId: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
    candidate: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"git_pull_request">;
        repository: z.ZodString;
        pullRequestNumber: z.ZodNumber;
        headSha: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"detached">;
        repositoryKind: z.ZodEnum<{
            "agent-readiness": "agent-readiness";
            "startup-credits": "startup-credits";
        }>;
        candidateDigest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
        candidateReference: z.ZodString;
    }, z.core.$strict>], "kind">;
}, z.core.$strict>;
export declare const catalogAdmissionConflictLookupResponseCoreSchema: z.ZodObject<{
    response_contract: z.ZodLiteral<"sourcey.catalog-admission-conflict-response/v1alpha1">;
    query_digest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
    matches: z.ZodArray<z.ZodObject<{
        keyDigest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
        targetReference: z.ZodString;
        targetIdentityDigest: z.ZodOptional<z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>>;
        source: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"current_catalog">;
            liveParentReleaseId: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"open_pull_request">;
            repository: z.ZodString;
            pullRequestNumber: z.ZodNumber;
            headSha: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"pending_git_lineage">;
            repository: z.ZodString;
            liveSourceCommit: z.ZodString;
            targetCommit: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"pending_submission">;
            candidateReference: z.ZodString;
            candidateDigest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
        }, z.core.$strict>], "kind">;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const catalogAdmissionConflictLookupResponseSchema: z.ZodObject<{
    response_contract: z.ZodLiteral<"sourcey.catalog-admission-conflict-response/v1alpha1">;
    query_digest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
    matches: z.ZodArray<z.ZodObject<{
        keyDigest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
        targetReference: z.ZodString;
        targetIdentityDigest: z.ZodOptional<z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>>;
        source: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"current_catalog">;
            liveParentReleaseId: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"open_pull_request">;
            repository: z.ZodString;
            pullRequestNumber: z.ZodNumber;
            headSha: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"pending_git_lineage">;
            repository: z.ZodString;
            liveSourceCommit: z.ZodString;
            targetCommit: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"pending_submission">;
            candidateReference: z.ZodString;
            candidateDigest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
        }, z.core.$strict>], "kind">;
    }, z.core.$strict>>;
    response_digest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
}, z.core.$strict>;
export declare const catalogVerifierDiagnosticSchema: z.ZodObject<{
    rule_id: z.ZodString;
    classification: z.ZodEnum<{
        contract_failure: "contract_failure";
        environmental_failure: "environmental_failure";
        identity_conflict: "identity_conflict";
        invalid_input: "invalid_input";
        policy_failure: "policy_failure";
    }>;
    path: z.ZodNullable<z.ZodString>;
    message: z.ZodString;
    guidance: z.ZodString;
}, z.core.$strict>;
export declare const catalogVerifierResultSchema: z.ZodObject<{
    result_contract: z.ZodLiteral<"sourcey.catalog-verifier-result/v1alpha1">;
    operation: z.ZodEnum<{
        "validate.agent-readiness": "validate.agent-readiness";
        "validate.startup-credits": "validate.startup-credits";
        "verify-release": "verify-release";
    }>;
    status: z.ZodEnum<{
        invalid: "invalid";
        valid: "valid";
    }>;
    summary: z.ZodNullable<z.ZodObject<{
        entities: z.ZodNumber;
        programs: z.ZodOptional<z.ZodNumber>;
        offers: z.ZodOptional<z.ZodNumber>;
        declarations: z.ZodOptional<z.ZodNumber>;
        release_id: z.ZodOptional<z.ZodString>;
        snapshot_id: z.ZodOptional<z.ZodString>;
        files: z.ZodOptional<z.ZodNumber>;
        identity_context_digest: z.ZodOptional<z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>>;
        live_parent_release_id: z.ZodOptional<z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>>;
    }, z.core.$strict>>;
    diagnostics: z.ZodArray<z.ZodObject<{
        rule_id: z.ZodString;
        classification: z.ZodEnum<{
            contract_failure: "contract_failure";
            environmental_failure: "environmental_failure";
            identity_conflict: "identity_conflict";
            invalid_input: "invalid_input";
            policy_failure: "policy_failure";
        }>;
        path: z.ZodNullable<z.ZodString>;
        message: z.ZodString;
        guidance: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type CatalogVerifierResult = z.infer<typeof catalogVerifierResultSchema>;
export declare const catalogVerifierCriterionSchema: z.ZodObject<{
    rule_id: z.ZodString;
    repository_kind: z.ZodEnum<{
        "agent-readiness": "agent-readiness";
        "startup-credits": "startup-credits";
    }>;
    title: z.ZodString;
    requirement: z.ZodString;
    exclusion: z.ZodNullable<z.ZodString>;
}, z.core.$strict>;
export type CatalogVerifierCriterion = z.infer<typeof catalogVerifierCriterionSchema>;
export declare const catalogVerifierCandidateInputSchema: z.ZodObject<{
    repositoryKind: z.ZodEnum<{
        "agent-readiness": "agent-readiness";
        "startup-credits": "startup-credits";
    }>;
    sources: z.ZodArray<z.ZodObject<{
        source: z.ZodString;
        content: z.ZodString;
    }, z.core.$strict>>;
    taxonomy: z.ZodOptional<z.ZodObject<{
        schema_version: z.ZodLiteral<"sourcey.taxonomy/v1alpha1">;
        categories: z.ZodArray<z.ZodString>;
        labels: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type CatalogVerifierCandidateInput = z.infer<typeof catalogVerifierCandidateInputSchema>;
export declare const catalogVerifierIdentityContextCoreSchema: z.ZodObject<{
    context_contract: z.ZodLiteral<"sourcey.catalog-verifier-identity-context/v1alpha1">;
    query_digest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
    response_digest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
    live_parent_release_id: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
    live_parent_release_sequence: z.ZodNumber;
    issued_at: z.ZodISODateTime;
    expires_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const catalogVerifierIdentityContextSchema: z.ZodObject<{
    context_contract: z.ZodLiteral<"sourcey.catalog-verifier-identity-context/v1alpha1">;
    query_digest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
    response_digest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
    live_parent_release_id: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
    live_parent_release_sequence: z.ZodNumber;
    issued_at: z.ZodISODateTime;
    expires_at: z.ZodISODateTime;
    context_digest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
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
export declare const catalogVerifierIdentityContextPacketSchema: z.ZodObject<{
    packet_contract: z.ZodLiteral<"sourcey.catalog-verifier-identity-context-packet/v1alpha1">;
    query: z.ZodObject<{
        query_contract: z.ZodLiteral<"sourcey.catalog-admission-conflict-query/v1alpha1">;
        keys: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<{
                domain: "domain";
                entity_id: "entity_id";
                entity_name: "entity_name";
                entity_slug: "entity_slug";
                entity_url: "entity_url";
                evidence_url: "evidence_url";
                offer_id: "offer_id";
                offer_slug: "offer_slug";
                offer_url: "offer_url";
                program_id: "program_id";
                program_slug: "program_slug";
                semantic_offer: "semantic_offer";
            }>;
            normalizedValue: z.ZodString;
            keyDigest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
            candidateReference: z.ZodString;
            candidateIdentityDigest: z.ZodOptional<z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>>;
        }, z.core.$strict>>;
        liveParentReleaseId: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
        candidate: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"git_pull_request">;
            repository: z.ZodString;
            pullRequestNumber: z.ZodNumber;
            headSha: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"detached">;
            repositoryKind: z.ZodEnum<{
                "agent-readiness": "agent-readiness";
                "startup-credits": "startup-credits";
            }>;
            candidateDigest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
            candidateReference: z.ZodString;
        }, z.core.$strict>], "kind">;
    }, z.core.$strict>;
    response: z.ZodObject<{
        response_contract: z.ZodLiteral<"sourcey.catalog-admission-conflict-response/v1alpha1">;
        query_digest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
        matches: z.ZodArray<z.ZodObject<{
            keyDigest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
            targetReference: z.ZodString;
            targetIdentityDigest: z.ZodOptional<z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>>;
            source: z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"current_catalog">;
                liveParentReleaseId: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"open_pull_request">;
                repository: z.ZodString;
                pullRequestNumber: z.ZodNumber;
                headSha: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"pending_git_lineage">;
                repository: z.ZodString;
                liveSourceCommit: z.ZodString;
                targetCommit: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"pending_submission">;
                candidateReference: z.ZodString;
                candidateDigest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
            }, z.core.$strict>], "kind">;
        }, z.core.$strict>>;
        response_digest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
    }, z.core.$strict>;
    context: z.ZodObject<{
        context_contract: z.ZodLiteral<"sourcey.catalog-verifier-identity-context/v1alpha1">;
        query_digest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
        response_digest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
        live_parent_release_id: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
        live_parent_release_sequence: z.ZodNumber;
        issued_at: z.ZodISODateTime;
        expires_at: z.ZodISODateTime;
        context_digest: z.ZodType<`sha256:${string}`, unknown, z.core.$ZodTypeInternals<`sha256:${string}`, unknown>>;
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
    signer_registry: z.ZodObject<{
        registry_contract: z.ZodLiteral<"sourcey.signer-registry/v1alpha1">;
        generation: z.ZodNumber;
        parent_registry_digest: z.ZodNullable<z.ZodString>;
        issuers: z.ZodArray<z.ZodObject<{
            issuer_id: z.ZodString;
            keys: z.ZodArray<z.ZodObject<{
                key_id: z.ZodString;
                algorithm: z.ZodLiteral<"ed25519">;
                public_key_pem: z.ZodString;
                purposes: z.ZodArray<z.ZodString>;
                valid_from: z.ZodISODateTime;
                valid_until: z.ZodOptional<z.ZodISODateTime>;
                compromised_after_sequence: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        registry_digest: z.ZodString;
        root_signatures: z.ZodArray<z.ZodObject<{
            key_id: z.ZodString;
            algorithm: z.ZodLiteral<"ed25519">;
            signature: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>;
}, z.core.$strict>;
export type CatalogVerifierIdentityContextCore = z.infer<typeof catalogVerifierIdentityContextCoreSchema>;
export type CatalogVerifierIdentityContext = z.infer<typeof catalogVerifierIdentityContextSchema>;
export type CatalogVerifierIdentityContextPacket = z.infer<typeof catalogVerifierIdentityContextPacketSchema>;
/** Optional operation resolved only when recovering a retained submission.
 * Work remains opaque to the host; its bound verifier interprets it. Results
 * are internal application values, not another serialized release contract. */
export interface CatalogSubmissionVerifierModule<Result = unknown> {
    readonly verifyCatalogSubmissionDirectory: (input: {
        readonly directory: string;
        readonly workItem: unknown;
    }) => Promise<Result>;
}
//# sourceMappingURL=index.d.ts.map