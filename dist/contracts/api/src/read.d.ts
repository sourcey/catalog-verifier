import { z } from "zod";
export declare const SOURCEY_PUBLIC_API_VERSION = "1.2.8";
/**
 * Sourcey's response-header budget leaves transport headroom beneath the
 * 16 KiB aggregate parser ceiling used by common HTTP clients. The x402
 * protocol permits larger envelopes; Sourcey's payable products do not.
 */
export declare const SOURCEY_X402_PAYMENT_REQUIRED_MAX_BYTES: number;
export declare const catalogSiteRecordContract: "sourcey.site-record/v1alpha1";
export declare const siteRecordEnvelopeSchema: z.ZodObject<{
    contract: z.ZodLiteral<"sourcey.site-record/v1alpha1">;
    release_id: z.ZodString;
    snapshot_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodUnknown;
}, z.core.$strict>;
export type SiteRecordEnvelope = z.infer<typeof siteRecordEnvelopeSchema>;
export declare const catalogApiErrorResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    error: z.ZodObject<{
        code: z.ZodEnum<{
            already_bought: "already_bought";
            already_verified: "already_verified";
            authentication_required: "authentication_required";
            capability_unavailable: "capability_unavailable";
            capacity_unavailable: "capacity_unavailable";
            draft_changed: "draft_changed";
            draft_unavailable: "draft_unavailable";
            idempotency_conflict: "idempotency_conflict";
            insufficient_scope: "insufficient_scope";
            internal_error: "internal_error";
            invalid_credential: "invalid_credential";
            invalid_credential_format: "invalid_credential_format";
            invalid_cursor: "invalid_cursor";
            invalid_request: "invalid_request";
            method_not_allowed: "method_not_allowed";
            not_found: "not_found";
            payment_pending: "payment_pending";
            payment_refused: "payment_refused";
            product_unavailable: "product_unavailable";
            rate_limited: "rate_limited";
            service_unavailable: "service_unavailable";
            standing_stale: "standing_stale";
        }>;
        message: z.ZodString;
        capability: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const catalogStatusResponseSchema: z.ZodObject<{
    status: z.ZodLiteral<"ok">;
    service: z.ZodLiteral<"sourcey-serving-worker">;
    release_id: z.ZodString;
    snapshot_id: z.ZodString;
    artifact_sha256: z.ZodString;
}, z.core.$strict>;
export declare const catalogReleaseSummarySchema: z.ZodObject<{
    release_contract: z.ZodLiteral<"sourcey.release-read/v1alpha1">;
    release_id: z.ZodString;
    release_sequence: z.ZodNumber;
    snapshot_id: z.ZodString;
    parent_release_id: z.ZodNullable<z.ZodString>;
    policy_as_of: z.ZodISODateTime;
    artifact_sha256: z.ZodString;
    admitted_input_digests: z.ZodArray<z.ZodString>;
    resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
    bundle: z.ZodObject<{
        digest: z.ZodString;
        archive_url: z.ZodURL;
        verifier_digest: z.ZodString;
    }, z.core.$strict>;
    publication: z.ZodObject<{
        digest: z.ZodString;
        published_at: z.ZodISODateTime;
    }, z.core.$strict>;
}, z.core.$strict>;
export type CatalogReleaseSummary = z.infer<typeof catalogReleaseSummarySchema>;
export declare const catalogReleaseReadSchema: z.ZodObject<{
    release_contract: z.ZodLiteral<"sourcey.release-read/v1alpha1">;
    release_id: z.ZodString;
    release_sequence: z.ZodNumber;
    snapshot_id: z.ZodString;
    parent_release_id: z.ZodNullable<z.ZodString>;
    policy_as_of: z.ZodISODateTime;
    artifact_sha256: z.ZodString;
    admitted_input_digests: z.ZodArray<z.ZodString>;
    resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
    bundle: z.ZodObject<{
        digest: z.ZodString;
        archive_url: z.ZodURL;
        verifier_digest: z.ZodString;
    }, z.core.$strict>;
    publication: z.ZodObject<{
        digest: z.ZodString;
        published_at: z.ZodISODateTime;
    }, z.core.$strict>;
    descriptor: z.ZodObject<{
        descriptor_contract: z.ZodLiteral<string>;
        snapshot_core: z.ZodObject<{
            snapshot_contract: z.ZodLiteral<string>;
            release_sequence: z.ZodNumber;
            compiler_version: z.ZodString;
            artifact_contract: z.ZodLiteral<string>;
            input_set_digest: z.ZodString;
            artifact_digest: z.ZodString;
            resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
            root_set_digest: z.ZodString;
            signer_registry_digest: z.ZodString;
            trust_transition_digest: z.ZodNullable<z.ZodString>;
            policy_as_of: z.ZodISODateTime;
        }, z.core.$strict>;
        snapshot_id: z.ZodString;
        release_core: z.ZodObject<{
            release_contract: z.ZodLiteral<string>;
            release_sequence: z.ZodNumber;
            snapshot_id: z.ZodString;
            parent_release_id: z.ZodNullable<z.ZodString>;
            diff_digest: z.ZodString;
        }, z.core.$strict>;
        release_id: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export type CatalogReleaseRead = z.infer<typeof catalogReleaseReadSchema>;
export declare const catalogReleaseCursorSchema: z.ZodObject<{
    release_id: z.ZodString;
    admitted_input_digests: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type CatalogReleaseCursor = z.infer<typeof catalogReleaseCursorSchema>;
export declare const eligibilityCheckInputSchema: z.ZodObject<{
    offer_id: z.ZodString;
    facts: z.ZodRecord<z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"null">;
    }, z.core.$strict>, z.ZodObject<{
        type: z.ZodLiteral<"string">;
        value: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        type: z.ZodLiteral<"number">;
        value: z.ZodNumber;
    }, z.core.$strict>, z.ZodObject<{
        type: z.ZodLiteral<"boolean">;
        value: z.ZodBoolean;
    }, z.core.$strict>, z.ZodObject<{
        type: z.ZodLiteral<"date">;
        value: z.ZodISODate;
    }, z.core.$strict>, z.ZodObject<{
        type: z.ZodLiteral<"string-set">;
        values: z.ZodArray<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        type: z.ZodLiteral<"number-set">;
        values: z.ZodArray<z.ZodNumber>;
    }, z.core.$strict>], "type">>;
}, z.core.$strict>;
export declare const catalogVerifierIdentityContextResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodObject<{
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
}, z.core.$strict>;
export declare const catalogResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodObject<{
        artifact_contract: z.ZodLiteral<"sourcey.canonical-artifact/v1alpha1">;
        policy_as_of: z.ZodISODateTime;
        root_set_digest: z.ZodString;
        signer_registry_digest: z.ZodString;
        policy_digests: z.ZodRecord<z.ZodString, z.ZodString>;
        policies: z.ZodArray<z.ZodObject<{
            schema_version: z.ZodLiteral<"sourcey.policy/v1alpha1">;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodString;
            sections: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"prose">;
                heading: z.ZodOptional<z.ZodString>;
                paragraphs: z.ZodArray<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"clauses">;
                heading: z.ZodOptional<z.ZodString>;
                clauses: z.ZodArray<z.ZodObject<{
                    title: z.ZodString;
                    body: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"definitions">;
                heading: z.ZodOptional<z.ZodString>;
                definitions: z.ZodArray<z.ZodObject<{
                    term: z.ZodString;
                    detail: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"steps">;
                heading: z.ZodOptional<z.ZodString>;
                steps: z.ZodArray<z.ZodString>;
            }, z.core.$strict>], "kind">>;
            revision_digest: z.ZodString;
        }, z.core.$strict>>;
        entities: z.ZodArray<z.ZodObject<{
            entity_id: z.ZodString;
            slug: z.ZodString;
            slug_aliases: z.ZodOptional<z.ZodArray<z.ZodString>>;
            name: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            description: z.ZodString;
            website: z.ZodURL;
            category: z.ZodString;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
            identity_assurance: z.ZodOptional<z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                assurance_id: z.ZodString;
                verified_at: z.ZodISODateTime;
                identity_epoch_digest: z.ZodString;
                method_policy_digest: z.ZodString;
                coverage_policy_digest: z.ZodString;
                event_id: z.ZodString;
                receipt_digest: z.ZodString;
            }, z.core.$strict>>;
            programs: z.ZodArray<z.ZodObject<{
                program_id: z.ZodString;
                slug: z.ZodString;
                title: z.ZodString;
                summary: z.ZodOptional<z.ZodString>;
                revision_digest: z.ZodString;
                provenance: z.ZodObject<{
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                    dispute: z.ZodEnum<{
                        none: "none";
                        open: "open";
                        resolved: "resolved";
                    }>;
                    coverage_policy_digest: z.ZodString;
                    freshness_policy_digest: z.ZodString;
                    basis_event_ids: z.ZodArray<z.ZodString>;
                    fields: z.ZodArray<z.ZodObject<{
                        path: z.ZodString;
                        supporting_event_ids: z.ZodArray<z.ZodString>;
                        contradicting_event_ids: z.ZodArray<z.ZodString>;
                        accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                            attested: "attested";
                            derived: "derived";
                            editorial: "editorial";
                            observed: "observed";
                        }>>;
                        evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                            attested: "attested";
                            derived: "derived";
                            editorial: "editorial";
                            observed: "observed";
                        }>>;
                        latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                        freshness: z.ZodEnum<{
                            fresh: "fresh";
                            stale: "stale";
                            unknown: "unknown";
                        }>;
                    }, z.core.$strict>>;
                    vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        status: z.ZodLiteral<"none">;
                    }, z.core.$strict>, z.ZodObject<{
                        status: z.ZodLiteral<"current">;
                        event_id: z.ZodString;
                        attested_at: z.ZodISODateTime;
                    }, z.core.$strict>], "status">;
                }, z.core.$strict>;
            }, z.core.$strict>>;
            offers: z.ZodArray<z.ZodObject<{
                program_id: z.ZodOptional<z.ZodString>;
                offer_id: z.ZodString;
                slug: z.ZodString;
                title: z.ZodString;
                summary: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
                economics: z.ZodObject<{
                    consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"none">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"fixed">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"variable">;
                        description: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"unknown">;
                        description: z.ZodString;
                    }, z.core.$strict>], "kind">;
                    benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"credit">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"discount">;
                        percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                        applies_to: z.ZodOptional<z.ZodString>;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"cashback">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"money">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                                maximum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"percentage">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum_basis_points: z.ZodNumber;
                                maximum_basis_points: z.ZodNumber;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"waiver">;
                        waived_item: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"free-service">;
                        service: z.ZodString;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"other">;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>;
                eligibility: z.ZodObject<{
                    rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
                }, z.core.$strict>;
                roles: z.ZodObject<{
                    terms_authority_entity_id: z.ZodString;
                    access_operator_entity_id: z.ZodString;
                }, z.core.$strict>;
                access: z.ZodObject<{
                    availability: z.ZodEnum<{
                        automatic: "automatic";
                        invite: "invite";
                        membership: "membership";
                        other: "other";
                        public: "public";
                        referral: "referral";
                    }>;
                    method: z.ZodEnum<{
                        automatic: "automatic";
                        code: "code";
                        contact: "contact";
                        form: "form";
                        other: "other";
                    }>;
                    url: z.ZodOptional<z.ZodURL>;
                    public_code: z.ZodOptional<z.ZodString>;
                    instructions: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>;
                terms_url: z.ZodOptional<z.ZodURL>;
                lifecycle: z.ZodEnum<{
                    active: "active";
                    ended: "ended";
                    withdrawn: "withdrawn";
                }>;
                effective_from: z.ZodISODateTime;
                effective_until: z.ZodOptional<z.ZodISODateTime>;
                revision_digest: z.ZodString;
                provenance: z.ZodObject<{
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                    dispute: z.ZodEnum<{
                        none: "none";
                        open: "open";
                        resolved: "resolved";
                    }>;
                    coverage_policy_digest: z.ZodString;
                    freshness_policy_digest: z.ZodString;
                    basis_event_ids: z.ZodArray<z.ZodString>;
                    fields: z.ZodArray<z.ZodObject<{
                        path: z.ZodString;
                        supporting_event_ids: z.ZodArray<z.ZodString>;
                        contradicting_event_ids: z.ZodArray<z.ZodString>;
                        accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                            attested: "attested";
                            derived: "derived";
                            editorial: "editorial";
                            observed: "observed";
                        }>>;
                        evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                            attested: "attested";
                            derived: "derived";
                            editorial: "editorial";
                            observed: "observed";
                        }>>;
                        latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                        freshness: z.ZodEnum<{
                            fresh: "fresh";
                            stale: "stale";
                            unknown: "unknown";
                        }>;
                    }, z.core.$strict>>;
                    vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        status: z.ZodLiteral<"none">;
                    }, z.core.$strict>, z.ZodObject<{
                        status: z.ZodLiteral<"current">;
                        event_id: z.ZodString;
                        attested_at: z.ZodISODateTime;
                    }, z.core.$strict>], "status">;
                }, z.core.$strict>;
                terms_assurance: z.ZodOptional<z.ZodObject<{
                    status: z.ZodLiteral<"checked">;
                    assurance_id: z.ZodString;
                    checked_at: z.ZodISODateTime;
                    revision_digest: z.ZodString;
                    method_policy_digest: z.ZodString;
                    coverage_policy_digest: z.ZodString;
                    event_id: z.ZodString;
                    receipt_digest: z.ZodString;
                }, z.core.$strict>>;
                headline: z.ZodOptional<z.ZodObject<{
                    rule: z.ZodLiteral<"sourcey.offer-headline/v1">;
                    benefit_id: z.ZodString;
                    basis: z.ZodEnum<{
                        described: "described";
                        typed: "typed";
                    }>;
                    figure: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"credit">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"discount">;
                        percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                        applies_to: z.ZodOptional<z.ZodString>;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"cashback">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"money">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                                maximum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"percentage">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum_basis_points: z.ZodNumber;
                                maximum_basis_points: z.ZodNumber;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"free-service">;
                        service: z.ZodOptional<z.ZodString>;
                        duration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"waiver">;
                        waived_item: z.ZodString;
                    }, z.core.$strict>], "kind">;
                }, z.core.$strict>>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const catalogTaxonomyResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodObject<{
        schema_version: z.ZodLiteral<"sourcey.taxonomy/v1alpha1">;
        categories: z.ZodArray<z.ZodString>;
        labels: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const catalogEntityListSummarySchema: z.ZodObject<{
    entity_count: z.ZodNumber;
    program_count: z.ZodNumber;
    offer_count: z.ZodNumber;
    active_offer_count: z.ZodNumber;
    vendor_confirmed_entity_count: z.ZodNumber;
    verified_entity_count: z.ZodNumber;
    terms_checked_offer_count: z.ZodNumber;
    latest_observation_at: z.ZodNullable<z.ZodISODateTime>;
    categories: z.ZodArray<z.ZodObject<{
        category: z.ZodString;
        entity_count: z.ZodNumber;
        program_count: z.ZodNumber;
        offer_count: z.ZodNumber;
        active_offer_count: z.ZodNumber;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type CatalogEntityListSummary = z.infer<typeof catalogEntityListSummarySchema>;
export declare const catalogSitemapShardSchema: z.ZodString;
export declare const catalogSitemapEntrySchema: z.ZodObject<{
    path: z.ZodString;
    lastmod: z.ZodISODateTime;
}, z.core.$strict>;
export declare const catalogSitemapShardSummarySchema: z.ZodObject<{
    shard: z.ZodString;
    entry_count: z.ZodNumber;
    lastmod: z.ZodISODateTime;
}, z.core.$strict>;
export declare const catalogSitemapChangeSchema: z.ZodObject<{
    operation: z.ZodEnum<{
        delete: "delete";
        upsert: "upsert";
    }>;
    path: z.ZodString;
}, z.core.$strict>;
export declare const catalogSitemapShardListResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodArray<z.ZodObject<{
        shard: z.ZodString;
        entry_count: z.ZodNumber;
        lastmod: z.ZodISODateTime;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const catalogSitemapEntryListResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        lastmod: z.ZodISODateTime;
    }, z.core.$strict>>;
    next_cursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    shard: z.ZodString;
}, z.core.$strict>;
export declare const catalogSitemapChangeListResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodArray<z.ZodObject<{
        operation: z.ZodEnum<{
            delete: "delete";
            upsert: "upsert";
        }>;
        path: z.ZodString;
    }, z.core.$strict>>;
    next_cursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strict>;
export type CatalogSitemapEntry = z.infer<typeof catalogSitemapEntrySchema>;
export type CatalogSitemapShardSummary = z.infer<typeof catalogSitemapShardSummarySchema>;
export type CatalogSitemapChange = z.infer<typeof catalogSitemapChangeSchema>;
export declare const eligibilityStructureStatisticSchema: z.ZodObject<{
    statistic_id: z.ZodString;
    method_digest: z.ZodString;
    release_id: z.ZodString;
    denominator: z.ZodNumber;
    without_manual_review_node: z.ZodNumber;
    with_manual_review_node: z.ZodNumber;
    without_manual_review_basis_points: z.ZodNumber;
    result_digest: z.ZodString;
}, z.core.$strict>;
export type EligibilityStructureStatistic = z.infer<typeof eligibilityStructureStatisticSchema>;
export declare const eligibilityStructureStatisticResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodObject<{
        statistic_id: z.ZodString;
        method_digest: z.ZodString;
        release_id: z.ZodString;
        denominator: z.ZodNumber;
        without_manual_review_node: z.ZodNumber;
        with_manual_review_node: z.ZodNumber;
        without_manual_review_basis_points: z.ZodNumber;
        result_digest: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const entityListResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        slug: z.ZodString;
        slug_aliases: z.ZodOptional<z.ZodArray<z.ZodString>>;
        name: z.ZodString;
        summary: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
        website: z.ZodURL;
        category: z.ZodString;
        revision_digest: z.ZodString;
        provenance: z.ZodObject<{
            freshness: z.ZodEnum<{
                fresh: "fresh";
                stale: "stale";
                unknown: "unknown";
            }>;
            dispute: z.ZodEnum<{
                none: "none";
                open: "open";
                resolved: "resolved";
            }>;
            coverage_policy_digest: z.ZodString;
            freshness_policy_digest: z.ZodString;
            basis_event_ids: z.ZodArray<z.ZodString>;
            fields: z.ZodArray<z.ZodObject<{
                path: z.ZodString;
                supporting_event_ids: z.ZodArray<z.ZodString>;
                contradicting_event_ids: z.ZodArray<z.ZodString>;
                accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                    attested: "attested";
                    derived: "derived";
                    editorial: "editorial";
                    observed: "observed";
                }>>;
                evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                    attested: "attested";
                    derived: "derived";
                    editorial: "editorial";
                    observed: "observed";
                }>>;
                latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
            }, z.core.$strict>>;
            vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                status: z.ZodLiteral<"none">;
            }, z.core.$strict>, z.ZodObject<{
                status: z.ZodLiteral<"current">;
                event_id: z.ZodString;
                attested_at: z.ZodISODateTime;
            }, z.core.$strict>], "status">;
        }, z.core.$strict>;
        identity_assurance: z.ZodOptional<z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            assurance_id: z.ZodString;
            verified_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>>;
        programs: z.ZodArray<z.ZodObject<{
            program_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
        }, z.core.$strict>>;
        offers: z.ZodArray<z.ZodObject<{
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            economics: z.ZodObject<{
                consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"fixed">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"variable">;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"unknown">;
                    description: z.ZodString;
                }, z.core.$strict>], "kind">;
                benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodString;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"other">;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>;
            eligibility: z.ZodObject<{
                rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
            }, z.core.$strict>;
            roles: z.ZodObject<{
                terms_authority_entity_id: z.ZodString;
                access_operator_entity_id: z.ZodString;
            }, z.core.$strict>;
            access: z.ZodObject<{
                availability: z.ZodEnum<{
                    automatic: "automatic";
                    invite: "invite";
                    membership: "membership";
                    other: "other";
                    public: "public";
                    referral: "referral";
                }>;
                method: z.ZodEnum<{
                    automatic: "automatic";
                    code: "code";
                    contact: "contact";
                    form: "form";
                    other: "other";
                }>;
                url: z.ZodOptional<z.ZodURL>;
                public_code: z.ZodOptional<z.ZodString>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
            lifecycle: z.ZodEnum<{
                active: "active";
                ended: "ended";
                withdrawn: "withdrawn";
            }>;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
            terms_assurance: z.ZodOptional<z.ZodObject<{
                status: z.ZodLiteral<"checked">;
                assurance_id: z.ZodString;
                checked_at: z.ZodISODateTime;
                revision_digest: z.ZodString;
                method_policy_digest: z.ZodString;
                coverage_policy_digest: z.ZodString;
                event_id: z.ZodString;
                receipt_digest: z.ZodString;
            }, z.core.$strict>>;
            headline: z.ZodOptional<z.ZodObject<{
                rule: z.ZodLiteral<"sourcey.offer-headline/v1">;
                benefit_id: z.ZodString;
                basis: z.ZodEnum<{
                    described: "described";
                    typed: "typed";
                }>;
                figure: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodOptional<z.ZodString>;
                    duration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>], "kind">;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    next_cursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    query: z.ZodString;
    category: z.ZodNullable<z.ZodString>;
    summary: z.ZodObject<{
        entity_count: z.ZodNumber;
        program_count: z.ZodNumber;
        offer_count: z.ZodNumber;
        active_offer_count: z.ZodNumber;
        vendor_confirmed_entity_count: z.ZodNumber;
        verified_entity_count: z.ZodNumber;
        terms_checked_offer_count: z.ZodNumber;
        latest_observation_at: z.ZodNullable<z.ZodISODateTime>;
        categories: z.ZodArray<z.ZodObject<{
            category: z.ZodString;
            entity_count: z.ZodNumber;
            program_count: z.ZodNumber;
            offer_count: z.ZodNumber;
            active_offer_count: z.ZodNumber;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    assets: z.ZodDefault<z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        role: z.ZodEnum<{
            icon: "icon";
            "logo-dark": "logo-dark";
            "logo-light": "logo-light";
        }>;
        asset_object_digest: z.ZodString;
        served_digest: z.ZodString;
        served_path: z.ZodString;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/svg+xml": "image/svg+xml";
            "image/webp": "image/webp";
        }>;
        bytes: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
        authority_basis: z.ZodEnum<{
            "editorial-review": "editorial-review";
            "licensed-source": "licensed-source";
            "sourcey-owned": "sourcey-owned";
            "vendor-authority": "vendor-authority";
        }>;
        authority_claim_id: z.ZodOptional<z.ZodString>;
        approval_receipt_digest: z.ZodString;
        source_basis: z.ZodString;
        license_basis: z.ZodString;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        binding_event_id: z.ZodString;
    }, z.core.$strict>>>;
}, z.core.$strict>;
export declare const offerTombstoneSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    kind: z.ZodLiteral<"offer_tombstone">;
    offer_id: z.ZodString;
    transition: z.ZodLiteral<"merged">;
    canonical_offer_id: z.ZodString;
    event_id: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"offer_tombstone">;
    offer_id: z.ZodString;
    transition: z.ZodLiteral<"retired">;
}, z.core.$strict>], "transition">;
export declare const entityResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodUnion<readonly [z.ZodObject<{
        entity_id: z.ZodString;
        slug: z.ZodString;
        slug_aliases: z.ZodOptional<z.ZodArray<z.ZodString>>;
        name: z.ZodString;
        summary: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
        website: z.ZodURL;
        category: z.ZodString;
        revision_digest: z.ZodString;
        provenance: z.ZodObject<{
            freshness: z.ZodEnum<{
                fresh: "fresh";
                stale: "stale";
                unknown: "unknown";
            }>;
            dispute: z.ZodEnum<{
                none: "none";
                open: "open";
                resolved: "resolved";
            }>;
            coverage_policy_digest: z.ZodString;
            freshness_policy_digest: z.ZodString;
            basis_event_ids: z.ZodArray<z.ZodString>;
            fields: z.ZodArray<z.ZodObject<{
                path: z.ZodString;
                supporting_event_ids: z.ZodArray<z.ZodString>;
                contradicting_event_ids: z.ZodArray<z.ZodString>;
                accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                    attested: "attested";
                    derived: "derived";
                    editorial: "editorial";
                    observed: "observed";
                }>>;
                evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                    attested: "attested";
                    derived: "derived";
                    editorial: "editorial";
                    observed: "observed";
                }>>;
                latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
            }, z.core.$strict>>;
            vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                status: z.ZodLiteral<"none">;
            }, z.core.$strict>, z.ZodObject<{
                status: z.ZodLiteral<"current">;
                event_id: z.ZodString;
                attested_at: z.ZodISODateTime;
            }, z.core.$strict>], "status">;
        }, z.core.$strict>;
        identity_assurance: z.ZodOptional<z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            assurance_id: z.ZodString;
            verified_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>>;
        programs: z.ZodArray<z.ZodObject<{
            program_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
        }, z.core.$strict>>;
        offers: z.ZodArray<z.ZodObject<{
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            economics: z.ZodObject<{
                consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"fixed">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"variable">;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"unknown">;
                    description: z.ZodString;
                }, z.core.$strict>], "kind">;
                benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodString;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"other">;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>;
            eligibility: z.ZodObject<{
                rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
            }, z.core.$strict>;
            roles: z.ZodObject<{
                terms_authority_entity_id: z.ZodString;
                access_operator_entity_id: z.ZodString;
            }, z.core.$strict>;
            access: z.ZodObject<{
                availability: z.ZodEnum<{
                    automatic: "automatic";
                    invite: "invite";
                    membership: "membership";
                    other: "other";
                    public: "public";
                    referral: "referral";
                }>;
                method: z.ZodEnum<{
                    automatic: "automatic";
                    code: "code";
                    contact: "contact";
                    form: "form";
                    other: "other";
                }>;
                url: z.ZodOptional<z.ZodURL>;
                public_code: z.ZodOptional<z.ZodString>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
            lifecycle: z.ZodEnum<{
                active: "active";
                ended: "ended";
                withdrawn: "withdrawn";
            }>;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
            terms_assurance: z.ZodOptional<z.ZodObject<{
                status: z.ZodLiteral<"checked">;
                assurance_id: z.ZodString;
                checked_at: z.ZodISODateTime;
                revision_digest: z.ZodString;
                method_policy_digest: z.ZodString;
                coverage_policy_digest: z.ZodString;
                event_id: z.ZodString;
                receipt_digest: z.ZodString;
            }, z.core.$strict>>;
            headline: z.ZodOptional<z.ZodObject<{
                rule: z.ZodLiteral<"sourcey.offer-headline/v1">;
                benefit_id: z.ZodString;
                basis: z.ZodEnum<{
                    described: "described";
                    typed: "typed";
                }>;
                figure: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodOptional<z.ZodString>;
                    duration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>], "kind">;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>, z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"entity_tombstone">;
        entity_id: z.ZodString;
        transition: z.ZodLiteral<"merged">;
        canonical_entity_id: z.ZodString;
        event_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"entity_tombstone">;
        entity_id: z.ZodString;
        transition: z.ZodLiteral<"successor">;
        canonical_entity_id: z.ZodString;
        event_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"entity_tombstone">;
        entity_id: z.ZodString;
        transition: z.ZodLiteral<"split">;
        replacement_entity_ids: z.ZodArray<z.ZodString>;
        continuing_entity_id: z.ZodOptional<z.ZodString>;
        event_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"entity_tombstone">;
        entity_id: z.ZodString;
        transition: z.ZodLiteral<"retired">;
    }, z.core.$strict>], "transition">]>;
    assets: z.ZodDefault<z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        role: z.ZodEnum<{
            icon: "icon";
            "logo-dark": "logo-dark";
            "logo-light": "logo-light";
        }>;
        asset_object_digest: z.ZodString;
        served_digest: z.ZodString;
        served_path: z.ZodString;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/svg+xml": "image/svg+xml";
            "image/webp": "image/webp";
        }>;
        bytes: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
        authority_basis: z.ZodEnum<{
            "editorial-review": "editorial-review";
            "licensed-source": "licensed-source";
            "sourcey-owned": "sourcey-owned";
            "vendor-authority": "vendor-authority";
        }>;
        authority_claim_id: z.ZodOptional<z.ZodString>;
        approval_receipt_digest: z.ZodString;
        source_basis: z.ZodString;
        license_basis: z.ZodString;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        binding_event_id: z.ZodString;
    }, z.core.$strict>>>;
}, z.core.$strict>;
export declare const entityAssetListResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        role: z.ZodEnum<{
            icon: "icon";
            "logo-dark": "logo-dark";
            "logo-light": "logo-light";
        }>;
        asset_object_digest: z.ZodString;
        served_digest: z.ZodString;
        served_path: z.ZodString;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/svg+xml": "image/svg+xml";
            "image/webp": "image/webp";
        }>;
        bytes: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
        authority_basis: z.ZodEnum<{
            "editorial-review": "editorial-review";
            "licensed-source": "licensed-source";
            "sourcey-owned": "sourcey-owned";
            "vendor-authority": "vendor-authority";
        }>;
        authority_claim_id: z.ZodOptional<z.ZodString>;
        approval_receipt_digest: z.ZodString;
        source_basis: z.ZodString;
        license_basis: z.ZodString;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        binding_event_id: z.ZodString;
    }, z.core.$strict>>;
    next_cursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    entity_id: z.ZodNullable<z.ZodString>;
}, z.core.$strict>;
export declare const policyResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodObject<{
        schema_version: z.ZodLiteral<"sourcey.policy/v1alpha1">;
        slug: z.ZodString;
        title: z.ZodString;
        summary: z.ZodString;
        sections: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"prose">;
            heading: z.ZodOptional<z.ZodString>;
            paragraphs: z.ZodArray<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"clauses">;
            heading: z.ZodOptional<z.ZodString>;
            clauses: z.ZodArray<z.ZodObject<{
                title: z.ZodString;
                body: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"definitions">;
            heading: z.ZodOptional<z.ZodString>;
            definitions: z.ZodArray<z.ZodObject<{
                term: z.ZodString;
                detail: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"steps">;
            heading: z.ZodOptional<z.ZodString>;
            steps: z.ZodArray<z.ZodString>;
        }, z.core.$strict>], "kind">>;
        revision_digest: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const policyListResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodArray<z.ZodObject<{
        schema_version: z.ZodLiteral<"sourcey.policy/v1alpha1">;
        slug: z.ZodString;
        title: z.ZodString;
        summary: z.ZodString;
        sections: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"prose">;
            heading: z.ZodOptional<z.ZodString>;
            paragraphs: z.ZodArray<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"clauses">;
            heading: z.ZodOptional<z.ZodString>;
            clauses: z.ZodArray<z.ZodObject<{
                title: z.ZodString;
                body: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"definitions">;
            heading: z.ZodOptional<z.ZodString>;
            definitions: z.ZodArray<z.ZodObject<{
                term: z.ZodString;
                detail: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"steps">;
            heading: z.ZodOptional<z.ZodString>;
            steps: z.ZodArray<z.ZodString>;
        }, z.core.$strict>], "kind">>;
        revision_digest: z.ZodString;
    }, z.core.$strict>>;
    next_cursor: z.ZodNonOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
}, z.core.$strict>;
export declare const programResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodUnion<readonly [z.ZodObject<{
        entity: z.ZodObject<{
            entity_id: z.ZodString;
            slug: z.ZodString;
            slug_aliases: z.ZodOptional<z.ZodArray<z.ZodString>>;
            name: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            description: z.ZodString;
            website: z.ZodURL;
            category: z.ZodString;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
            identity_assurance: z.ZodOptional<z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                assurance_id: z.ZodString;
                verified_at: z.ZodISODateTime;
                identity_epoch_digest: z.ZodString;
                method_policy_digest: z.ZodString;
                coverage_policy_digest: z.ZodString;
                event_id: z.ZodString;
                receipt_digest: z.ZodString;
            }, z.core.$strict>>;
            programs: z.ZodArray<z.ZodObject<{
                program_id: z.ZodString;
                slug: z.ZodString;
                title: z.ZodString;
                summary: z.ZodOptional<z.ZodString>;
                revision_digest: z.ZodString;
                provenance: z.ZodObject<{
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                    dispute: z.ZodEnum<{
                        none: "none";
                        open: "open";
                        resolved: "resolved";
                    }>;
                    coverage_policy_digest: z.ZodString;
                    freshness_policy_digest: z.ZodString;
                    basis_event_ids: z.ZodArray<z.ZodString>;
                    fields: z.ZodArray<z.ZodObject<{
                        path: z.ZodString;
                        supporting_event_ids: z.ZodArray<z.ZodString>;
                        contradicting_event_ids: z.ZodArray<z.ZodString>;
                        accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                            attested: "attested";
                            derived: "derived";
                            editorial: "editorial";
                            observed: "observed";
                        }>>;
                        evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                            attested: "attested";
                            derived: "derived";
                            editorial: "editorial";
                            observed: "observed";
                        }>>;
                        latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                        freshness: z.ZodEnum<{
                            fresh: "fresh";
                            stale: "stale";
                            unknown: "unknown";
                        }>;
                    }, z.core.$strict>>;
                    vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        status: z.ZodLiteral<"none">;
                    }, z.core.$strict>, z.ZodObject<{
                        status: z.ZodLiteral<"current">;
                        event_id: z.ZodString;
                        attested_at: z.ZodISODateTime;
                    }, z.core.$strict>], "status">;
                }, z.core.$strict>;
            }, z.core.$strict>>;
            offers: z.ZodArray<z.ZodObject<{
                program_id: z.ZodOptional<z.ZodString>;
                offer_id: z.ZodString;
                slug: z.ZodString;
                title: z.ZodString;
                summary: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
                economics: z.ZodObject<{
                    consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"none">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"fixed">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"variable">;
                        description: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"unknown">;
                        description: z.ZodString;
                    }, z.core.$strict>], "kind">;
                    benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"credit">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"discount">;
                        percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                        applies_to: z.ZodOptional<z.ZodString>;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"cashback">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"money">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                                maximum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"percentage">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum_basis_points: z.ZodNumber;
                                maximum_basis_points: z.ZodNumber;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"waiver">;
                        waived_item: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"free-service">;
                        service: z.ZodString;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"other">;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>;
                eligibility: z.ZodObject<{
                    rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
                }, z.core.$strict>;
                roles: z.ZodObject<{
                    terms_authority_entity_id: z.ZodString;
                    access_operator_entity_id: z.ZodString;
                }, z.core.$strict>;
                access: z.ZodObject<{
                    availability: z.ZodEnum<{
                        automatic: "automatic";
                        invite: "invite";
                        membership: "membership";
                        other: "other";
                        public: "public";
                        referral: "referral";
                    }>;
                    method: z.ZodEnum<{
                        automatic: "automatic";
                        code: "code";
                        contact: "contact";
                        form: "form";
                        other: "other";
                    }>;
                    url: z.ZodOptional<z.ZodURL>;
                    public_code: z.ZodOptional<z.ZodString>;
                    instructions: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>;
                terms_url: z.ZodOptional<z.ZodURL>;
                lifecycle: z.ZodEnum<{
                    active: "active";
                    ended: "ended";
                    withdrawn: "withdrawn";
                }>;
                effective_from: z.ZodISODateTime;
                effective_until: z.ZodOptional<z.ZodISODateTime>;
                revision_digest: z.ZodString;
                provenance: z.ZodObject<{
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                    dispute: z.ZodEnum<{
                        none: "none";
                        open: "open";
                        resolved: "resolved";
                    }>;
                    coverage_policy_digest: z.ZodString;
                    freshness_policy_digest: z.ZodString;
                    basis_event_ids: z.ZodArray<z.ZodString>;
                    fields: z.ZodArray<z.ZodObject<{
                        path: z.ZodString;
                        supporting_event_ids: z.ZodArray<z.ZodString>;
                        contradicting_event_ids: z.ZodArray<z.ZodString>;
                        accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                            attested: "attested";
                            derived: "derived";
                            editorial: "editorial";
                            observed: "observed";
                        }>>;
                        evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                            attested: "attested";
                            derived: "derived";
                            editorial: "editorial";
                            observed: "observed";
                        }>>;
                        latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                        freshness: z.ZodEnum<{
                            fresh: "fresh";
                            stale: "stale";
                            unknown: "unknown";
                        }>;
                    }, z.core.$strict>>;
                    vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        status: z.ZodLiteral<"none">;
                    }, z.core.$strict>, z.ZodObject<{
                        status: z.ZodLiteral<"current">;
                        event_id: z.ZodString;
                        attested_at: z.ZodISODateTime;
                    }, z.core.$strict>], "status">;
                }, z.core.$strict>;
                terms_assurance: z.ZodOptional<z.ZodObject<{
                    status: z.ZodLiteral<"checked">;
                    assurance_id: z.ZodString;
                    checked_at: z.ZodISODateTime;
                    revision_digest: z.ZodString;
                    method_policy_digest: z.ZodString;
                    coverage_policy_digest: z.ZodString;
                    event_id: z.ZodString;
                    receipt_digest: z.ZodString;
                }, z.core.$strict>>;
                headline: z.ZodOptional<z.ZodObject<{
                    rule: z.ZodLiteral<"sourcey.offer-headline/v1">;
                    benefit_id: z.ZodString;
                    basis: z.ZodEnum<{
                        described: "described";
                        typed: "typed";
                    }>;
                    figure: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"credit">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"discount">;
                        percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                        applies_to: z.ZodOptional<z.ZodString>;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"cashback">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"money">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                                maximum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"percentage">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum_basis_points: z.ZodNumber;
                                maximum_basis_points: z.ZodNumber;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"free-service">;
                        service: z.ZodOptional<z.ZodString>;
                        duration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"waiver">;
                        waived_item: z.ZodString;
                    }, z.core.$strict>], "kind">;
                }, z.core.$strict>>;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        program: z.ZodObject<{
            program_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"program_tombstone">;
        program_id: z.ZodString;
        transition: z.ZodLiteral<"merged">;
        canonical_program_id: z.ZodString;
        event_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"program_tombstone">;
        program_id: z.ZodString;
        transition: z.ZodLiteral<"retired">;
    }, z.core.$strict>], "transition">]>;
}, z.core.$strict>;
export declare const offerResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodUnion<readonly [z.ZodObject<{
        entity: z.ZodObject<{
            entity_id: z.ZodString;
            slug: z.ZodString;
            slug_aliases: z.ZodOptional<z.ZodArray<z.ZodString>>;
            name: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            description: z.ZodString;
            website: z.ZodURL;
            category: z.ZodString;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
            identity_assurance: z.ZodOptional<z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                assurance_id: z.ZodString;
                verified_at: z.ZodISODateTime;
                identity_epoch_digest: z.ZodString;
                method_policy_digest: z.ZodString;
                coverage_policy_digest: z.ZodString;
                event_id: z.ZodString;
                receipt_digest: z.ZodString;
            }, z.core.$strict>>;
            programs: z.ZodArray<z.ZodObject<{
                program_id: z.ZodString;
                slug: z.ZodString;
                title: z.ZodString;
                summary: z.ZodOptional<z.ZodString>;
                revision_digest: z.ZodString;
                provenance: z.ZodObject<{
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                    dispute: z.ZodEnum<{
                        none: "none";
                        open: "open";
                        resolved: "resolved";
                    }>;
                    coverage_policy_digest: z.ZodString;
                    freshness_policy_digest: z.ZodString;
                    basis_event_ids: z.ZodArray<z.ZodString>;
                    fields: z.ZodArray<z.ZodObject<{
                        path: z.ZodString;
                        supporting_event_ids: z.ZodArray<z.ZodString>;
                        contradicting_event_ids: z.ZodArray<z.ZodString>;
                        accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                            attested: "attested";
                            derived: "derived";
                            editorial: "editorial";
                            observed: "observed";
                        }>>;
                        evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                            attested: "attested";
                            derived: "derived";
                            editorial: "editorial";
                            observed: "observed";
                        }>>;
                        latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                        freshness: z.ZodEnum<{
                            fresh: "fresh";
                            stale: "stale";
                            unknown: "unknown";
                        }>;
                    }, z.core.$strict>>;
                    vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        status: z.ZodLiteral<"none">;
                    }, z.core.$strict>, z.ZodObject<{
                        status: z.ZodLiteral<"current">;
                        event_id: z.ZodString;
                        attested_at: z.ZodISODateTime;
                    }, z.core.$strict>], "status">;
                }, z.core.$strict>;
            }, z.core.$strict>>;
            offers: z.ZodArray<z.ZodObject<{
                program_id: z.ZodOptional<z.ZodString>;
                offer_id: z.ZodString;
                slug: z.ZodString;
                title: z.ZodString;
                summary: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
                economics: z.ZodObject<{
                    consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"none">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"fixed">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"variable">;
                        description: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"unknown">;
                        description: z.ZodString;
                    }, z.core.$strict>], "kind">;
                    benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"credit">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"discount">;
                        percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                        applies_to: z.ZodOptional<z.ZodString>;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"cashback">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"money">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                                maximum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"percentage">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum_basis_points: z.ZodNumber;
                                maximum_basis_points: z.ZodNumber;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"waiver">;
                        waived_item: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"free-service">;
                        service: z.ZodString;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"other">;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>;
                eligibility: z.ZodObject<{
                    rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
                }, z.core.$strict>;
                roles: z.ZodObject<{
                    terms_authority_entity_id: z.ZodString;
                    access_operator_entity_id: z.ZodString;
                }, z.core.$strict>;
                access: z.ZodObject<{
                    availability: z.ZodEnum<{
                        automatic: "automatic";
                        invite: "invite";
                        membership: "membership";
                        other: "other";
                        public: "public";
                        referral: "referral";
                    }>;
                    method: z.ZodEnum<{
                        automatic: "automatic";
                        code: "code";
                        contact: "contact";
                        form: "form";
                        other: "other";
                    }>;
                    url: z.ZodOptional<z.ZodURL>;
                    public_code: z.ZodOptional<z.ZodString>;
                    instructions: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>;
                terms_url: z.ZodOptional<z.ZodURL>;
                lifecycle: z.ZodEnum<{
                    active: "active";
                    ended: "ended";
                    withdrawn: "withdrawn";
                }>;
                effective_from: z.ZodISODateTime;
                effective_until: z.ZodOptional<z.ZodISODateTime>;
                revision_digest: z.ZodString;
                provenance: z.ZodObject<{
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                    dispute: z.ZodEnum<{
                        none: "none";
                        open: "open";
                        resolved: "resolved";
                    }>;
                    coverage_policy_digest: z.ZodString;
                    freshness_policy_digest: z.ZodString;
                    basis_event_ids: z.ZodArray<z.ZodString>;
                    fields: z.ZodArray<z.ZodObject<{
                        path: z.ZodString;
                        supporting_event_ids: z.ZodArray<z.ZodString>;
                        contradicting_event_ids: z.ZodArray<z.ZodString>;
                        accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                            attested: "attested";
                            derived: "derived";
                            editorial: "editorial";
                            observed: "observed";
                        }>>;
                        evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                            attested: "attested";
                            derived: "derived";
                            editorial: "editorial";
                            observed: "observed";
                        }>>;
                        latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                        freshness: z.ZodEnum<{
                            fresh: "fresh";
                            stale: "stale";
                            unknown: "unknown";
                        }>;
                    }, z.core.$strict>>;
                    vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        status: z.ZodLiteral<"none">;
                    }, z.core.$strict>, z.ZodObject<{
                        status: z.ZodLiteral<"current">;
                        event_id: z.ZodString;
                        attested_at: z.ZodISODateTime;
                    }, z.core.$strict>], "status">;
                }, z.core.$strict>;
                terms_assurance: z.ZodOptional<z.ZodObject<{
                    status: z.ZodLiteral<"checked">;
                    assurance_id: z.ZodString;
                    checked_at: z.ZodISODateTime;
                    revision_digest: z.ZodString;
                    method_policy_digest: z.ZodString;
                    coverage_policy_digest: z.ZodString;
                    event_id: z.ZodString;
                    receipt_digest: z.ZodString;
                }, z.core.$strict>>;
                headline: z.ZodOptional<z.ZodObject<{
                    rule: z.ZodLiteral<"sourcey.offer-headline/v1">;
                    benefit_id: z.ZodString;
                    basis: z.ZodEnum<{
                        described: "described";
                        typed: "typed";
                    }>;
                    figure: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"credit">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"discount">;
                        percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                        applies_to: z.ZodOptional<z.ZodString>;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"cashback">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"money">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                                maximum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"percentage">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum_basis_points: z.ZodNumber;
                                maximum_basis_points: z.ZodNumber;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"free-service">;
                        service: z.ZodOptional<z.ZodString>;
                        duration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"waiver">;
                        waived_item: z.ZodString;
                    }, z.core.$strict>], "kind">;
                }, z.core.$strict>>;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        program: z.ZodOptional<z.ZodObject<{
            program_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
        }, z.core.$strict>>;
        offer: z.ZodObject<{
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            economics: z.ZodObject<{
                consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"fixed">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"variable">;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"unknown">;
                    description: z.ZodString;
                }, z.core.$strict>], "kind">;
                benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodString;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"other">;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>;
            eligibility: z.ZodObject<{
                rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
            }, z.core.$strict>;
            roles: z.ZodObject<{
                terms_authority_entity_id: z.ZodString;
                access_operator_entity_id: z.ZodString;
            }, z.core.$strict>;
            access: z.ZodObject<{
                availability: z.ZodEnum<{
                    automatic: "automatic";
                    invite: "invite";
                    membership: "membership";
                    other: "other";
                    public: "public";
                    referral: "referral";
                }>;
                method: z.ZodEnum<{
                    automatic: "automatic";
                    code: "code";
                    contact: "contact";
                    form: "form";
                    other: "other";
                }>;
                url: z.ZodOptional<z.ZodURL>;
                public_code: z.ZodOptional<z.ZodString>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
            lifecycle: z.ZodEnum<{
                active: "active";
                ended: "ended";
                withdrawn: "withdrawn";
            }>;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
            terms_assurance: z.ZodOptional<z.ZodObject<{
                status: z.ZodLiteral<"checked">;
                assurance_id: z.ZodString;
                checked_at: z.ZodISODateTime;
                revision_digest: z.ZodString;
                method_policy_digest: z.ZodString;
                coverage_policy_digest: z.ZodString;
                event_id: z.ZodString;
                receipt_digest: z.ZodString;
            }, z.core.$strict>>;
            headline: z.ZodOptional<z.ZodObject<{
                rule: z.ZodLiteral<"sourcey.offer-headline/v1">;
                benefit_id: z.ZodString;
                basis: z.ZodEnum<{
                    described: "described";
                    typed: "typed";
                }>;
                figure: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodOptional<z.ZodString>;
                    duration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>], "kind">;
            }, z.core.$strict>>;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"offer_tombstone">;
        offer_id: z.ZodString;
        transition: z.ZodLiteral<"merged">;
        canonical_offer_id: z.ZodString;
        event_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"offer_tombstone">;
        offer_id: z.ZodString;
        transition: z.ZodLiteral<"retired">;
    }, z.core.$strict>], "transition">]>;
}, z.core.$strict>;
export declare const searchEntitiesResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        slug: z.ZodString;
        slug_aliases: z.ZodOptional<z.ZodArray<z.ZodString>>;
        name: z.ZodString;
        summary: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
        website: z.ZodURL;
        category: z.ZodString;
        revision_digest: z.ZodString;
        provenance: z.ZodObject<{
            freshness: z.ZodEnum<{
                fresh: "fresh";
                stale: "stale";
                unknown: "unknown";
            }>;
            dispute: z.ZodEnum<{
                none: "none";
                open: "open";
                resolved: "resolved";
            }>;
            coverage_policy_digest: z.ZodString;
            freshness_policy_digest: z.ZodString;
            basis_event_ids: z.ZodArray<z.ZodString>;
            fields: z.ZodArray<z.ZodObject<{
                path: z.ZodString;
                supporting_event_ids: z.ZodArray<z.ZodString>;
                contradicting_event_ids: z.ZodArray<z.ZodString>;
                accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                    attested: "attested";
                    derived: "derived";
                    editorial: "editorial";
                    observed: "observed";
                }>>;
                evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                    attested: "attested";
                    derived: "derived";
                    editorial: "editorial";
                    observed: "observed";
                }>>;
                latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
            }, z.core.$strict>>;
            vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                status: z.ZodLiteral<"none">;
            }, z.core.$strict>, z.ZodObject<{
                status: z.ZodLiteral<"current">;
                event_id: z.ZodString;
                attested_at: z.ZodISODateTime;
            }, z.core.$strict>], "status">;
        }, z.core.$strict>;
        identity_assurance: z.ZodOptional<z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            assurance_id: z.ZodString;
            verified_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>>;
        programs: z.ZodArray<z.ZodObject<{
            program_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
        }, z.core.$strict>>;
        offers: z.ZodArray<z.ZodObject<{
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            economics: z.ZodObject<{
                consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"fixed">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"variable">;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"unknown">;
                    description: z.ZodString;
                }, z.core.$strict>], "kind">;
                benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodString;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"other">;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>;
            eligibility: z.ZodObject<{
                rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
            }, z.core.$strict>;
            roles: z.ZodObject<{
                terms_authority_entity_id: z.ZodString;
                access_operator_entity_id: z.ZodString;
            }, z.core.$strict>;
            access: z.ZodObject<{
                availability: z.ZodEnum<{
                    automatic: "automatic";
                    invite: "invite";
                    membership: "membership";
                    other: "other";
                    public: "public";
                    referral: "referral";
                }>;
                method: z.ZodEnum<{
                    automatic: "automatic";
                    code: "code";
                    contact: "contact";
                    form: "form";
                    other: "other";
                }>;
                url: z.ZodOptional<z.ZodURL>;
                public_code: z.ZodOptional<z.ZodString>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
            lifecycle: z.ZodEnum<{
                active: "active";
                ended: "ended";
                withdrawn: "withdrawn";
            }>;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
            terms_assurance: z.ZodOptional<z.ZodObject<{
                status: z.ZodLiteral<"checked">;
                assurance_id: z.ZodString;
                checked_at: z.ZodISODateTime;
                revision_digest: z.ZodString;
                method_policy_digest: z.ZodString;
                coverage_policy_digest: z.ZodString;
                event_id: z.ZodString;
                receipt_digest: z.ZodString;
            }, z.core.$strict>>;
            headline: z.ZodOptional<z.ZodObject<{
                rule: z.ZodLiteral<"sourcey.offer-headline/v1">;
                benefit_id: z.ZodString;
                basis: z.ZodEnum<{
                    described: "described";
                    typed: "typed";
                }>;
                figure: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodOptional<z.ZodString>;
                    duration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>], "kind">;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    query: z.ZodString;
    next_cursor: z.ZodNullable<z.ZodString>;
}, z.core.$strict>;
export declare const searchOffersResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        entity_id: z.ZodString;
        entity_slug: z.ZodString;
        entity_name: z.ZodString;
        category: z.ZodString;
        identity_assurance: z.ZodOptional<z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            assurance_id: z.ZodString;
            verified_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>>;
        offer: z.ZodObject<{
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            economics: z.ZodObject<{
                consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"fixed">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"variable">;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"unknown">;
                    description: z.ZodString;
                }, z.core.$strict>], "kind">;
                benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodString;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"other">;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>;
            eligibility: z.ZodObject<{
                rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
            }, z.core.$strict>;
            roles: z.ZodObject<{
                terms_authority_entity_id: z.ZodString;
                access_operator_entity_id: z.ZodString;
            }, z.core.$strict>;
            access: z.ZodObject<{
                availability: z.ZodEnum<{
                    automatic: "automatic";
                    invite: "invite";
                    membership: "membership";
                    other: "other";
                    public: "public";
                    referral: "referral";
                }>;
                method: z.ZodEnum<{
                    automatic: "automatic";
                    code: "code";
                    contact: "contact";
                    form: "form";
                    other: "other";
                }>;
                url: z.ZodOptional<z.ZodURL>;
                public_code: z.ZodOptional<z.ZodString>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
            lifecycle: z.ZodEnum<{
                active: "active";
                ended: "ended";
                withdrawn: "withdrawn";
            }>;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
            terms_assurance: z.ZodOptional<z.ZodObject<{
                status: z.ZodLiteral<"checked">;
                assurance_id: z.ZodString;
                checked_at: z.ZodISODateTime;
                revision_digest: z.ZodString;
                method_policy_digest: z.ZodString;
                coverage_policy_digest: z.ZodString;
                event_id: z.ZodString;
                receipt_digest: z.ZodString;
            }, z.core.$strict>>;
            headline: z.ZodOptional<z.ZodObject<{
                rule: z.ZodLiteral<"sourcey.offer-headline/v1">;
                benefit_id: z.ZodString;
                basis: z.ZodEnum<{
                    described: "described";
                    typed: "typed";
                }>;
                figure: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodOptional<z.ZodString>;
                    duration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>], "kind">;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        canonical_url: z.ZodURL;
        program_id: z.ZodString;
        program_slug: z.ZodString;
        program_title: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        entity_id: z.ZodString;
        entity_slug: z.ZodString;
        entity_name: z.ZodString;
        category: z.ZodString;
        identity_assurance: z.ZodOptional<z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            assurance_id: z.ZodString;
            verified_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>>;
        offer: z.ZodObject<{
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            economics: z.ZodObject<{
                consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"fixed">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"variable">;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"unknown">;
                    description: z.ZodString;
                }, z.core.$strict>], "kind">;
                benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodString;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"other">;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>;
            eligibility: z.ZodObject<{
                rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
            }, z.core.$strict>;
            roles: z.ZodObject<{
                terms_authority_entity_id: z.ZodString;
                access_operator_entity_id: z.ZodString;
            }, z.core.$strict>;
            access: z.ZodObject<{
                availability: z.ZodEnum<{
                    automatic: "automatic";
                    invite: "invite";
                    membership: "membership";
                    other: "other";
                    public: "public";
                    referral: "referral";
                }>;
                method: z.ZodEnum<{
                    automatic: "automatic";
                    code: "code";
                    contact: "contact";
                    form: "form";
                    other: "other";
                }>;
                url: z.ZodOptional<z.ZodURL>;
                public_code: z.ZodOptional<z.ZodString>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
            lifecycle: z.ZodEnum<{
                active: "active";
                ended: "ended";
                withdrawn: "withdrawn";
            }>;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
            terms_assurance: z.ZodOptional<z.ZodObject<{
                status: z.ZodLiteral<"checked">;
                assurance_id: z.ZodString;
                checked_at: z.ZodISODateTime;
                revision_digest: z.ZodString;
                method_policy_digest: z.ZodString;
                coverage_policy_digest: z.ZodString;
                event_id: z.ZodString;
                receipt_digest: z.ZodString;
            }, z.core.$strict>>;
            headline: z.ZodOptional<z.ZodObject<{
                rule: z.ZodLiteral<"sourcey.offer-headline/v1">;
                benefit_id: z.ZodString;
                basis: z.ZodEnum<{
                    described: "described";
                    typed: "typed";
                }>;
                figure: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodOptional<z.ZodString>;
                    duration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>], "kind">;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        canonical_url: z.ZodURL;
    }, z.core.$strict>]>>;
    query: z.ZodString;
    next_cursor: z.ZodNullable<z.ZodString>;
}, z.core.$strict>;
export declare const entityAgentReadinessProfilesResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodArray<z.ZodObject<{
        projection_contract: z.ZodLiteral<"sourcey.agent-readiness-projection/v1alpha1">;
        agent_readiness_profile_id: z.ZodString;
        entity_id: z.ZodString;
        scope: z.ZodObject<{
            product: z.ZodObject<{
                key: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
            job: z.ZodObject<{
                key: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        catalog_binding: z.ZodObject<{
            base_release_id: z.ZodString;
            entity_revision_digest: z.ZodString;
        }, z.core.$strict>;
        declaration_revision_digest: z.ZodString;
        declaration: z.ZodDiscriminatedUnion<[z.ZodObject<{
            status: z.ZodLiteral<"none">;
        }, z.core.$strict>, z.ZodObject<{
            declaration_id: z.ZodString;
            provenance: z.ZodUnion<readonly [z.ZodObject<{
                repository: z.ZodLiteral<"sourcey/agent-ready-services">;
                commit: z.ZodString;
                path: z.ZodString;
                git_blob_oid: z.ZodString;
                blob_digest: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                source: z.ZodLiteral<"sourcey">;
                path: z.ZodString;
                blob_digest: z.ZodString;
            }, z.core.$strict>]>;
            status: z.ZodEnum<{
                community_declared: "community_declared";
                entity_attested: "entity_attested";
            }>;
        }, z.core.$strict>], "status">;
        surface_catalog: z.ZodObject<{
            participants: z.ZodArray<z.ZodObject<{
                participant_id: z.ZodString;
                roles: z.ZodArray<z.ZodEnum<{
                    access_operator: "access_operator";
                    identity_provider: "identity_provider";
                    operations_provider: "operations_provider";
                    payment_provider: "payment_provider";
                    provisioning_provider: "provisioning_provider";
                    subject: "subject";
                }>>;
                identity: z.ZodUnion<readonly [z.ZodObject<{
                    entity_id: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    origin_source_id: z.ZodString;
                }, z.core.$strict>]>;
            }, z.core.$strict>>;
            resources: z.ZodArray<z.ZodObject<{
                resource_id: z.ZodString;
                uri: z.ZodURL;
                roles: z.ZodArray<z.ZodEnum<{
                    access: "access";
                    authentication: "authentication";
                    checkout: "checkout";
                    descriptor: "descriptor";
                    discovery: "discovery";
                    documentation: "documentation";
                    eligibility: "eligibility";
                    operations: "operations";
                    policy: "policy";
                    pricing: "pricing";
                    provisioning: "provisioning";
                    recovery: "recovery";
                    status: "status";
                    terms: "terms";
                }>>;
                operated_by_participant_id: z.ZodString;
                standard_bindings: z.ZodArray<z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                    relation: z.ZodEnum<{
                        declares: "declares";
                        describes: "describes";
                        implements: "implements";
                        uses: "uses";
                    }>;
                }, z.core.$strict>>;
                allowed_redirect_hosts: z.ZodOptional<z.ZodArray<z.ZodString>>;
            }, z.core.$strict>>;
            endpoints: z.ZodArray<z.ZodObject<{
                endpoint_id: z.ZodString;
                uri: z.ZodURL;
                transport: z.ZodEnum<{
                    grpc: "grpc";
                    http: "http";
                    websocket: "websocket";
                }>;
                roles: z.ZodArray<z.ZodEnum<{
                    authorization: "authorization";
                    checkout: "checkout";
                    protected_resource: "protected_resource";
                    recovery: "recovery";
                    registration: "registration";
                    service: "service";
                    status: "status";
                    token: "token";
                    webhook: "webhook";
                }>>;
                operated_by_participant_id: z.ZodString;
                standard_bindings: z.ZodArray<z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                    relation: z.ZodEnum<{
                        declares: "declares";
                        describes: "describes";
                        implements: "implements";
                        uses: "uses";
                    }>;
                }, z.core.$strict>>;
                allowed_redirect_hosts: z.ZodOptional<z.ZodArray<z.ZodString>>;
            }, z.core.$strict>>;
            interfaces: z.ZodArray<z.ZodObject<{
                interface_id: z.ZodString;
                modality: z.ZodEnum<{
                    agent_service: "agent_service";
                    command_line: "command_line";
                    network_api: "network_api";
                    software_library: "software_library";
                    tool_server: "tool_server";
                    web_application: "web_application";
                }>;
                functions: z.ZodArray<z.ZodEnum<{
                    authentication: "authentication";
                    commerce: "commerce";
                    events: "events";
                    recovery: "recovery";
                    service_operation: "service_operation";
                }>>;
                endpoint_ids: z.ZodArray<z.ZodString>;
                resource_ids: z.ZodArray<z.ZodString>;
                operated_by_participant_id: z.ZodString;
                standard_bindings: z.ZodArray<z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                    relation: z.ZodEnum<{
                        declares: "declares";
                        describes: "describes";
                        implements: "implements";
                        uses: "uses";
                    }>;
                }, z.core.$strict>>;
            }, z.core.$strict>>;
            relations: z.ZodArray<z.ZodObject<{
                relation_id: z.ZodString;
                kind: z.ZodEnum<{
                    alternative_to: "alternative_to";
                    authenticates: "authenticates";
                    describes: "describes";
                    precedes: "precedes";
                    requires: "requires";
                }>;
                from: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        endpoint: "endpoint";
                        interface: "interface";
                        resource: "resource";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>;
                to: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        endpoint: "endpoint";
                        interface: "interface";
                        resource: "resource";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>;
            }, z.core.$strict>>;
            surface_exclusions: z.ZodArray<z.ZodObject<{
                exclusion_id: z.ZodString;
                role: z.ZodEnum<{
                    access: "access";
                    authentication: "authentication";
                    checkout: "checkout";
                    descriptor: "descriptor";
                    discovery: "discovery";
                    documentation: "documentation";
                    eligibility: "eligibility";
                    operations: "operations";
                    policy: "policy";
                    pricing: "pricing";
                    provisioning: "provisioning";
                    recovery: "recovery";
                    status: "status";
                    terms: "terms";
                }>;
                rationale: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        lifecycle: z.ZodEnum<{
            active: "active";
            ended: "ended";
            withdrawn: "withdrawn";
        }>;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        revision_digest: z.ZodString;
        policy_digest: z.ZodString;
        policy_version: z.ZodString;
        policy_as_of: z.ZodISODateTime;
        job: z.ZodObject<{
            job_id: z.ZodString;
            job_digest: z.ZodString;
            category: z.ZodString;
            name: z.ZodString;
            statement: z.ZodString;
        }, z.core.$strict>;
        interface_id: z.ZodNullable<z.ZodString>;
        label: z.ZodEnum<{
            probed: "probed";
            sourcey_run: "sourcey_run";
            vendor_run_verified: "vendor_run_verified";
        }>;
        operate: z.ZodObject<{
            letter: z.ZodNullable<z.ZodEnum<{
                A: "A";
                "A+": "A+";
                B: "B";
                "B+": "B+";
                C: "C";
                "C+": "C+";
                D: "D";
                F: "F";
            }>>;
            statement: z.ZodNullable<z.ZodString>;
            steps: z.ZodArray<z.ZodObject<{
                step: z.ZodEnum<{
                    confirm: "confirm";
                    delegation: "delegation";
                    discover: "discover";
                    job: "job";
                    pay: "pay";
                    sustain: "sustain";
                }>;
                outcome: z.ZodEnum<{
                    approval: "approval";
                    blocked: "blocked";
                    machine: "machine";
                    not_applicable: "not_applicable";
                    not_assessed: "not_assessed";
                    workaround: "workaround";
                }>;
                timing: z.ZodNullable<z.ZodEnum<{
                    recurring: "recurring";
                    setup: "setup";
                }>>;
            }, z.core.$strict>>;
            missing: z.ZodArray<z.ZodEnum<{
                confirm: "confirm";
                delegation: "delegation";
                discover: "discover";
                job: "job";
                pay: "pay";
                sustain: "sustain";
            }>>;
            approvals: z.ZodArray<z.ZodEnum<{
                confirm: "confirm";
                delegation: "delegation";
                discover: "discover";
                job: "job";
                pay: "pay";
                sustain: "sustain";
            }>>;
            workarounds: z.ZodArray<z.ZodObject<{
                step: z.ZodEnum<{
                    confirm: "confirm";
                    delegation: "delegation";
                    discover: "discover";
                    job: "job";
                    pay: "pay";
                    sustain: "sustain";
                }>;
                timing: z.ZodEnum<{
                    recurring: "recurring";
                    setup: "setup";
                }>;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        onboard: z.ZodObject<{
            level: z.ZodNullable<z.ZodNumber>;
        }, z.core.$strict>;
        discovery: z.ZodArray<z.ZodObject<{
            fact: z.ZodEnum<{
                agent_documentation: "agent_documentation";
                agent_registration: "agent_registration";
                agent_skill: "agent_skill";
                api_catalog_link: "api_catalog_link";
                ard_entry: "ard_entry";
                mcp_endpoint: "mcp_endpoint";
                oauth_authorization_server: "oauth_authorization_server";
                oauth_protected_resource: "oauth_protected_resource";
                openapi_server: "openapi_server";
                payment_manifest: "payment_manifest";
                unsupported_descriptor: "unsupported_descriptor";
            }>;
            value: z.ZodURL;
            descriptor_url: z.ZodURL;
            attempt_digest: z.ZodString;
            adapter: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
        run: z.ZodObject<{
            started_at: z.ZodISODateTime;
            finished_at: z.ZodISODateTime;
            discovery_reads: z.ZodNumber;
            exchanges: z.ZodArray<z.ZodObject<{
                purpose: z.ZodEnum<{
                    cleanup: "cleanup";
                    delegation: "delegation";
                    error_probe: "error_probe";
                    job: "job";
                    sustain_baseline: "sustain_baseline";
                    sustain_control_probe: "sustain_control_probe";
                    sustain_revocation: "sustain_revocation";
                    sustain_revoked_probe: "sustain_revoked_probe";
                    sustain_rotated_probe: "sustain_rotated_probe";
                    sustain_rotation: "sustain_rotation";
                }>;
                role: z.ZodEnum<{
                    request: "request";
                    session_close: "session_close";
                    session_opening: "session_opening";
                    tool_listing: "tool_listing";
                }>;
                method: z.ZodEnum<{
                    DELETE: "DELETE";
                    GET: "GET";
                    HEAD: "HEAD";
                    PATCH: "PATCH";
                    POST: "POST";
                    PUT: "PUT";
                }>;
                url: z.ZodURL;
                started_at: z.ZodISODateTime;
                finished_at: z.ZodISODateTime;
                response: z.ZodNullable<z.ZodObject<{
                    status: z.ZodNumber;
                    media_type: z.ZodString;
                    content_bytes: z.ZodNumber;
                    content_digest: z.ZodString;
                }, z.core.$strict>>;
                transport_error: z.ZodNullable<z.ZodString>;
                exchange_digest: z.ZodString;
            }, z.core.$strict>>;
            error_probe: z.ZodNullable<z.ZodObject<{
                typed: z.ZodBoolean;
                reason: z.ZodString;
            }, z.core.$strict>>;
            assertions: z.ZodArray<z.ZodObject<{
                assertion: z.ZodString;
                holds: z.ZodBoolean;
                failure: z.ZodNullable<z.ZodObject<{
                    check: z.ZodNumber;
                    reason: z.ZodString;
                }, z.core.$strict>>;
                statement: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        last_run_at: z.ZodISODateTime;
        publication: z.ZodObject<{
            visibility: z.ZodEnum<{
                discoverable: "discoverable";
                private: "private";
                resolvable_only: "resolvable_only";
            }>;
            reasons: z.ZodArray<z.ZodEnum<{
                lifecycle_not_active: "lifecycle_not_active";
                open_dispute: "open_dispute";
            }>>;
        }, z.core.$strict>;
        provenance: z.ZodObject<{
            dispute: z.ZodEnum<{
                none: "none";
                open: "open";
                resolved: "resolved";
            }>;
            basis_event_ids: z.ZodArray<z.ZodString>;
            vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                status: z.ZodLiteral<"none">;
            }, z.core.$strict>, z.ZodObject<{
                status: z.ZodLiteral<"current">;
                event_id: z.ZodString;
                attested_at: z.ZodISODateTime;
            }, z.core.$strict>], "status">;
        }, z.core.$strict>;
        canonical_url: z.ZodURL;
        projection_digest: z.ZodString;
    }, z.core.$strict>>;
    entity_id: z.ZodString;
    next_cursor: z.ZodNullable<z.ZodString>;
    freshness: z.ZodRecord<z.ZodString, z.ZodObject<{
        checked_at: z.ZodISODateTime;
        succeeded_at: z.ZodNullable<z.ZodISODateTime>;
        next_due_at: z.ZodNullable<z.ZodISODateTime>;
        state: z.ZodEnum<{
            fresh: "fresh";
            stale: "stale";
        }>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessProfileResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodUnion<readonly [z.ZodObject<{
        projection_contract: z.ZodLiteral<"sourcey.agent-readiness-projection/v1alpha1">;
        agent_readiness_profile_id: z.ZodString;
        entity_id: z.ZodString;
        scope: z.ZodObject<{
            product: z.ZodObject<{
                key: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
            job: z.ZodObject<{
                key: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        catalog_binding: z.ZodObject<{
            base_release_id: z.ZodString;
            entity_revision_digest: z.ZodString;
        }, z.core.$strict>;
        declaration_revision_digest: z.ZodString;
        declaration: z.ZodDiscriminatedUnion<[z.ZodObject<{
            status: z.ZodLiteral<"none">;
        }, z.core.$strict>, z.ZodObject<{
            declaration_id: z.ZodString;
            provenance: z.ZodUnion<readonly [z.ZodObject<{
                repository: z.ZodLiteral<"sourcey/agent-ready-services">;
                commit: z.ZodString;
                path: z.ZodString;
                git_blob_oid: z.ZodString;
                blob_digest: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                source: z.ZodLiteral<"sourcey">;
                path: z.ZodString;
                blob_digest: z.ZodString;
            }, z.core.$strict>]>;
            status: z.ZodEnum<{
                community_declared: "community_declared";
                entity_attested: "entity_attested";
            }>;
        }, z.core.$strict>], "status">;
        surface_catalog: z.ZodObject<{
            participants: z.ZodArray<z.ZodObject<{
                participant_id: z.ZodString;
                roles: z.ZodArray<z.ZodEnum<{
                    access_operator: "access_operator";
                    identity_provider: "identity_provider";
                    operations_provider: "operations_provider";
                    payment_provider: "payment_provider";
                    provisioning_provider: "provisioning_provider";
                    subject: "subject";
                }>>;
                identity: z.ZodUnion<readonly [z.ZodObject<{
                    entity_id: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    origin_source_id: z.ZodString;
                }, z.core.$strict>]>;
            }, z.core.$strict>>;
            resources: z.ZodArray<z.ZodObject<{
                resource_id: z.ZodString;
                uri: z.ZodURL;
                roles: z.ZodArray<z.ZodEnum<{
                    access: "access";
                    authentication: "authentication";
                    checkout: "checkout";
                    descriptor: "descriptor";
                    discovery: "discovery";
                    documentation: "documentation";
                    eligibility: "eligibility";
                    operations: "operations";
                    policy: "policy";
                    pricing: "pricing";
                    provisioning: "provisioning";
                    recovery: "recovery";
                    status: "status";
                    terms: "terms";
                }>>;
                operated_by_participant_id: z.ZodString;
                standard_bindings: z.ZodArray<z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                    relation: z.ZodEnum<{
                        declares: "declares";
                        describes: "describes";
                        implements: "implements";
                        uses: "uses";
                    }>;
                }, z.core.$strict>>;
                allowed_redirect_hosts: z.ZodOptional<z.ZodArray<z.ZodString>>;
            }, z.core.$strict>>;
            endpoints: z.ZodArray<z.ZodObject<{
                endpoint_id: z.ZodString;
                uri: z.ZodURL;
                transport: z.ZodEnum<{
                    grpc: "grpc";
                    http: "http";
                    websocket: "websocket";
                }>;
                roles: z.ZodArray<z.ZodEnum<{
                    authorization: "authorization";
                    checkout: "checkout";
                    protected_resource: "protected_resource";
                    recovery: "recovery";
                    registration: "registration";
                    service: "service";
                    status: "status";
                    token: "token";
                    webhook: "webhook";
                }>>;
                operated_by_participant_id: z.ZodString;
                standard_bindings: z.ZodArray<z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                    relation: z.ZodEnum<{
                        declares: "declares";
                        describes: "describes";
                        implements: "implements";
                        uses: "uses";
                    }>;
                }, z.core.$strict>>;
                allowed_redirect_hosts: z.ZodOptional<z.ZodArray<z.ZodString>>;
            }, z.core.$strict>>;
            interfaces: z.ZodArray<z.ZodObject<{
                interface_id: z.ZodString;
                modality: z.ZodEnum<{
                    agent_service: "agent_service";
                    command_line: "command_line";
                    network_api: "network_api";
                    software_library: "software_library";
                    tool_server: "tool_server";
                    web_application: "web_application";
                }>;
                functions: z.ZodArray<z.ZodEnum<{
                    authentication: "authentication";
                    commerce: "commerce";
                    events: "events";
                    recovery: "recovery";
                    service_operation: "service_operation";
                }>>;
                endpoint_ids: z.ZodArray<z.ZodString>;
                resource_ids: z.ZodArray<z.ZodString>;
                operated_by_participant_id: z.ZodString;
                standard_bindings: z.ZodArray<z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                    relation: z.ZodEnum<{
                        declares: "declares";
                        describes: "describes";
                        implements: "implements";
                        uses: "uses";
                    }>;
                }, z.core.$strict>>;
            }, z.core.$strict>>;
            relations: z.ZodArray<z.ZodObject<{
                relation_id: z.ZodString;
                kind: z.ZodEnum<{
                    alternative_to: "alternative_to";
                    authenticates: "authenticates";
                    describes: "describes";
                    precedes: "precedes";
                    requires: "requires";
                }>;
                from: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        endpoint: "endpoint";
                        interface: "interface";
                        resource: "resource";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>;
                to: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        endpoint: "endpoint";
                        interface: "interface";
                        resource: "resource";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>;
            }, z.core.$strict>>;
            surface_exclusions: z.ZodArray<z.ZodObject<{
                exclusion_id: z.ZodString;
                role: z.ZodEnum<{
                    access: "access";
                    authentication: "authentication";
                    checkout: "checkout";
                    descriptor: "descriptor";
                    discovery: "discovery";
                    documentation: "documentation";
                    eligibility: "eligibility";
                    operations: "operations";
                    policy: "policy";
                    pricing: "pricing";
                    provisioning: "provisioning";
                    recovery: "recovery";
                    status: "status";
                    terms: "terms";
                }>;
                rationale: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        lifecycle: z.ZodEnum<{
            active: "active";
            ended: "ended";
            withdrawn: "withdrawn";
        }>;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        revision_digest: z.ZodString;
        policy_digest: z.ZodString;
        policy_version: z.ZodString;
        policy_as_of: z.ZodISODateTime;
        job: z.ZodObject<{
            job_id: z.ZodString;
            job_digest: z.ZodString;
            category: z.ZodString;
            name: z.ZodString;
            statement: z.ZodString;
        }, z.core.$strict>;
        interface_id: z.ZodNullable<z.ZodString>;
        label: z.ZodEnum<{
            probed: "probed";
            sourcey_run: "sourcey_run";
            vendor_run_verified: "vendor_run_verified";
        }>;
        operate: z.ZodObject<{
            letter: z.ZodNullable<z.ZodEnum<{
                A: "A";
                "A+": "A+";
                B: "B";
                "B+": "B+";
                C: "C";
                "C+": "C+";
                D: "D";
                F: "F";
            }>>;
            statement: z.ZodNullable<z.ZodString>;
            steps: z.ZodArray<z.ZodObject<{
                step: z.ZodEnum<{
                    confirm: "confirm";
                    delegation: "delegation";
                    discover: "discover";
                    job: "job";
                    pay: "pay";
                    sustain: "sustain";
                }>;
                outcome: z.ZodEnum<{
                    approval: "approval";
                    blocked: "blocked";
                    machine: "machine";
                    not_applicable: "not_applicable";
                    not_assessed: "not_assessed";
                    workaround: "workaround";
                }>;
                timing: z.ZodNullable<z.ZodEnum<{
                    recurring: "recurring";
                    setup: "setup";
                }>>;
            }, z.core.$strict>>;
            missing: z.ZodArray<z.ZodEnum<{
                confirm: "confirm";
                delegation: "delegation";
                discover: "discover";
                job: "job";
                pay: "pay";
                sustain: "sustain";
            }>>;
            approvals: z.ZodArray<z.ZodEnum<{
                confirm: "confirm";
                delegation: "delegation";
                discover: "discover";
                job: "job";
                pay: "pay";
                sustain: "sustain";
            }>>;
            workarounds: z.ZodArray<z.ZodObject<{
                step: z.ZodEnum<{
                    confirm: "confirm";
                    delegation: "delegation";
                    discover: "discover";
                    job: "job";
                    pay: "pay";
                    sustain: "sustain";
                }>;
                timing: z.ZodEnum<{
                    recurring: "recurring";
                    setup: "setup";
                }>;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        onboard: z.ZodObject<{
            level: z.ZodNullable<z.ZodNumber>;
        }, z.core.$strict>;
        discovery: z.ZodArray<z.ZodObject<{
            fact: z.ZodEnum<{
                agent_documentation: "agent_documentation";
                agent_registration: "agent_registration";
                agent_skill: "agent_skill";
                api_catalog_link: "api_catalog_link";
                ard_entry: "ard_entry";
                mcp_endpoint: "mcp_endpoint";
                oauth_authorization_server: "oauth_authorization_server";
                oauth_protected_resource: "oauth_protected_resource";
                openapi_server: "openapi_server";
                payment_manifest: "payment_manifest";
                unsupported_descriptor: "unsupported_descriptor";
            }>;
            value: z.ZodURL;
            descriptor_url: z.ZodURL;
            attempt_digest: z.ZodString;
            adapter: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
        run: z.ZodObject<{
            started_at: z.ZodISODateTime;
            finished_at: z.ZodISODateTime;
            discovery_reads: z.ZodNumber;
            exchanges: z.ZodArray<z.ZodObject<{
                purpose: z.ZodEnum<{
                    cleanup: "cleanup";
                    delegation: "delegation";
                    error_probe: "error_probe";
                    job: "job";
                    sustain_baseline: "sustain_baseline";
                    sustain_control_probe: "sustain_control_probe";
                    sustain_revocation: "sustain_revocation";
                    sustain_revoked_probe: "sustain_revoked_probe";
                    sustain_rotated_probe: "sustain_rotated_probe";
                    sustain_rotation: "sustain_rotation";
                }>;
                role: z.ZodEnum<{
                    request: "request";
                    session_close: "session_close";
                    session_opening: "session_opening";
                    tool_listing: "tool_listing";
                }>;
                method: z.ZodEnum<{
                    DELETE: "DELETE";
                    GET: "GET";
                    HEAD: "HEAD";
                    PATCH: "PATCH";
                    POST: "POST";
                    PUT: "PUT";
                }>;
                url: z.ZodURL;
                started_at: z.ZodISODateTime;
                finished_at: z.ZodISODateTime;
                response: z.ZodNullable<z.ZodObject<{
                    status: z.ZodNumber;
                    media_type: z.ZodString;
                    content_bytes: z.ZodNumber;
                    content_digest: z.ZodString;
                }, z.core.$strict>>;
                transport_error: z.ZodNullable<z.ZodString>;
                exchange_digest: z.ZodString;
            }, z.core.$strict>>;
            error_probe: z.ZodNullable<z.ZodObject<{
                typed: z.ZodBoolean;
                reason: z.ZodString;
            }, z.core.$strict>>;
            assertions: z.ZodArray<z.ZodObject<{
                assertion: z.ZodString;
                holds: z.ZodBoolean;
                failure: z.ZodNullable<z.ZodObject<{
                    check: z.ZodNumber;
                    reason: z.ZodString;
                }, z.core.$strict>>;
                statement: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        last_run_at: z.ZodISODateTime;
        publication: z.ZodObject<{
            visibility: z.ZodEnum<{
                discoverable: "discoverable";
                private: "private";
                resolvable_only: "resolvable_only";
            }>;
            reasons: z.ZodArray<z.ZodEnum<{
                lifecycle_not_active: "lifecycle_not_active";
                open_dispute: "open_dispute";
            }>>;
        }, z.core.$strict>;
        provenance: z.ZodObject<{
            dispute: z.ZodEnum<{
                none: "none";
                open: "open";
                resolved: "resolved";
            }>;
            basis_event_ids: z.ZodArray<z.ZodString>;
            vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                status: z.ZodLiteral<"none">;
            }, z.core.$strict>, z.ZodObject<{
                status: z.ZodLiteral<"current">;
                event_id: z.ZodString;
                attested_at: z.ZodISODateTime;
            }, z.core.$strict>], "status">;
        }, z.core.$strict>;
        canonical_url: z.ZodURL;
        projection_digest: z.ZodString;
    }, z.core.$strict>, z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"agent_readiness_profile_tombstone">;
        agent_readiness_profile_id: z.ZodString;
        transition: z.ZodLiteral<"merged">;
        canonical_agent_readiness_profile_id: z.ZodString;
        event_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"agent_readiness_profile_tombstone">;
        agent_readiness_profile_id: z.ZodString;
        transition: z.ZodLiteral<"retired">;
    }, z.core.$strict>], "transition">]>;
    freshness: z.ZodRecord<z.ZodString, z.ZodObject<{
        checked_at: z.ZodISODateTime;
        succeeded_at: z.ZodNullable<z.ZodISODateTime>;
        next_due_at: z.ZodNullable<z.ZodISODateTime>;
        state: z.ZodEnum<{
            fresh: "fresh";
            stale: "stale";
        }>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessProfileListResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodArray<z.ZodObject<{
        agent_readiness_profile_id: z.ZodString;
        entity_id: z.ZodString;
        scope: z.ZodObject<{
            product: z.ZodObject<{
                key: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
            job: z.ZodObject<{
                key: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        declaration_revision_digest: z.ZodString;
        lifecycle: z.ZodEnum<{
            active: "active";
            ended: "ended";
            withdrawn: "withdrawn";
        }>;
        effective_from: z.ZodISODateTime;
        revision_digest: z.ZodString;
        policy_digest: z.ZodString;
        policy_version: z.ZodString;
        policy_as_of: z.ZodISODateTime;
        label: z.ZodEnum<{
            probed: "probed";
            sourcey_run: "sourcey_run";
            vendor_run_verified: "vendor_run_verified";
        }>;
        last_run_at: z.ZodISODateTime;
        publication: z.ZodObject<{
            visibility: z.ZodEnum<{
                discoverable: "discoverable";
                private: "private";
                resolvable_only: "resolvable_only";
            }>;
            reasons: z.ZodArray<z.ZodEnum<{
                lifecycle_not_active: "lifecycle_not_active";
                open_dispute: "open_dispute";
            }>>;
        }, z.core.$strict>;
        provenance: z.ZodObject<{
            dispute: z.ZodEnum<{
                none: "none";
                open: "open";
                resolved: "resolved";
            }>;
            basis_event_ids: z.ZodArray<z.ZodString>;
            vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                status: z.ZodLiteral<"none">;
            }, z.core.$strict>, z.ZodObject<{
                status: z.ZodLiteral<"current">;
                event_id: z.ZodString;
                attested_at: z.ZodISODateTime;
            }, z.core.$strict>], "status">;
        }, z.core.$strict>;
        canonical_url: z.ZodURL;
        projection_digest: z.ZodString;
        operate: z.ZodObject<{
            letter: z.ZodNullable<z.ZodEnum<{
                A: "A";
                "A+": "A+";
                B: "B";
                "B+": "B+";
                C: "C";
                "C+": "C+";
                D: "D";
                F: "F";
            }>>;
            steps: z.ZodArray<z.ZodObject<{
                step: z.ZodEnum<{
                    confirm: "confirm";
                    delegation: "delegation";
                    discover: "discover";
                    job: "job";
                    pay: "pay";
                    sustain: "sustain";
                }>;
                outcome: z.ZodEnum<{
                    approval: "approval";
                    blocked: "blocked";
                    machine: "machine";
                    not_applicable: "not_applicable";
                    not_assessed: "not_assessed";
                    workaround: "workaround";
                }>;
                timing: z.ZodNullable<z.ZodEnum<{
                    recurring: "recurring";
                    setup: "setup";
                }>>;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        onboard: z.ZodObject<{
            level: z.ZodNullable<z.ZodNumber>;
        }, z.core.$strict>;
    }, z.core.$strict>>;
    query: z.ZodString;
    next_cursor: z.ZodNullable<z.ZodString>;
    freshness: z.ZodRecord<z.ZodString, z.ZodObject<{
        checked_at: z.ZodISODateTime;
        succeeded_at: z.ZodNullable<z.ZodISODateTime>;
        next_due_at: z.ZodNullable<z.ZodISODateTime>;
        state: z.ZodEnum<{
            fresh: "fresh";
            stale: "stale";
        }>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessOfferRelationResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodObject<{
        relation_id: z.ZodString;
        agent_readiness_profile_id: z.ZodString;
        offer_id: z.ZodString;
        purpose: z.ZodEnum<{
            application_path: "application_path";
            operating_path: "operating_path";
            redemption_path: "redemption_path";
        }>;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        declaration_revision_digest: z.ZodString;
        offer_relation_proposal_id: z.ZodString;
        admitted_offer_revision_digest: z.ZodString;
        relation_contract: z.ZodLiteral<"sourcey.agent-readiness-offer-relation/v1alpha1">;
        relation_revision_digest: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const agentReadinessOfferRelationListResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodArray<z.ZodObject<{
        relation_id: z.ZodString;
        agent_readiness_profile_id: z.ZodString;
        offer_id: z.ZodString;
        purpose: z.ZodEnum<{
            application_path: "application_path";
            operating_path: "operating_path";
            redemption_path: "redemption_path";
        }>;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        declaration_revision_digest: z.ZodString;
        offer_relation_proposal_id: z.ZodString;
        admitted_offer_revision_digest: z.ZodString;
        relation_contract: z.ZodLiteral<"sourcey.agent-readiness-offer-relation/v1alpha1">;
        relation_revision_digest: z.ZodString;
    }, z.core.$strict>>;
    next_cursor: z.ZodNullable<z.ZodString>;
}, z.core.$strict>;
export declare const offerAgentReadinessProfilesResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodArray<z.ZodObject<{
        relation: z.ZodObject<{
            relation_id: z.ZodString;
            agent_readiness_profile_id: z.ZodString;
            offer_id: z.ZodString;
            purpose: z.ZodEnum<{
                application_path: "application_path";
                operating_path: "operating_path";
                redemption_path: "redemption_path";
            }>;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            declaration_revision_digest: z.ZodString;
            offer_relation_proposal_id: z.ZodString;
            admitted_offer_revision_digest: z.ZodString;
            relation_contract: z.ZodLiteral<"sourcey.agent-readiness-offer-relation/v1alpha1">;
            relation_revision_digest: z.ZodString;
        }, z.core.$strict>;
        profile: z.ZodObject<{
            projection_contract: z.ZodLiteral<"sourcey.agent-readiness-projection/v1alpha1">;
            agent_readiness_profile_id: z.ZodString;
            entity_id: z.ZodString;
            scope: z.ZodObject<{
                product: z.ZodObject<{
                    key: z.ZodString;
                    name: z.ZodString;
                }, z.core.$strict>;
                job: z.ZodObject<{
                    key: z.ZodString;
                    name: z.ZodString;
                }, z.core.$strict>;
            }, z.core.$strict>;
            catalog_binding: z.ZodObject<{
                base_release_id: z.ZodString;
                entity_revision_digest: z.ZodString;
            }, z.core.$strict>;
            declaration_revision_digest: z.ZodString;
            declaration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                status: z.ZodLiteral<"none">;
            }, z.core.$strict>, z.ZodObject<{
                declaration_id: z.ZodString;
                provenance: z.ZodUnion<readonly [z.ZodObject<{
                    repository: z.ZodLiteral<"sourcey/agent-ready-services">;
                    commit: z.ZodString;
                    path: z.ZodString;
                    git_blob_oid: z.ZodString;
                    blob_digest: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    source: z.ZodLiteral<"sourcey">;
                    path: z.ZodString;
                    blob_digest: z.ZodString;
                }, z.core.$strict>]>;
                status: z.ZodEnum<{
                    community_declared: "community_declared";
                    entity_attested: "entity_attested";
                }>;
            }, z.core.$strict>], "status">;
            surface_catalog: z.ZodObject<{
                participants: z.ZodArray<z.ZodObject<{
                    participant_id: z.ZodString;
                    roles: z.ZodArray<z.ZodEnum<{
                        access_operator: "access_operator";
                        identity_provider: "identity_provider";
                        operations_provider: "operations_provider";
                        payment_provider: "payment_provider";
                        provisioning_provider: "provisioning_provider";
                        subject: "subject";
                    }>>;
                    identity: z.ZodUnion<readonly [z.ZodObject<{
                        entity_id: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        origin_source_id: z.ZodString;
                    }, z.core.$strict>]>;
                }, z.core.$strict>>;
                resources: z.ZodArray<z.ZodObject<{
                    resource_id: z.ZodString;
                    uri: z.ZodURL;
                    roles: z.ZodArray<z.ZodEnum<{
                        access: "access";
                        authentication: "authentication";
                        checkout: "checkout";
                        descriptor: "descriptor";
                        discovery: "discovery";
                        documentation: "documentation";
                        eligibility: "eligibility";
                        operations: "operations";
                        policy: "policy";
                        pricing: "pricing";
                        provisioning: "provisioning";
                        recovery: "recovery";
                        status: "status";
                        terms: "terms";
                    }>>;
                    operated_by_participant_id: z.ZodString;
                    standard_bindings: z.ZodArray<z.ZodObject<{
                        namespace: z.ZodString;
                        version: z.ZodString;
                        relation: z.ZodEnum<{
                            declares: "declares";
                            describes: "describes";
                            implements: "implements";
                            uses: "uses";
                        }>;
                    }, z.core.$strict>>;
                    allowed_redirect_hosts: z.ZodOptional<z.ZodArray<z.ZodString>>;
                }, z.core.$strict>>;
                endpoints: z.ZodArray<z.ZodObject<{
                    endpoint_id: z.ZodString;
                    uri: z.ZodURL;
                    transport: z.ZodEnum<{
                        grpc: "grpc";
                        http: "http";
                        websocket: "websocket";
                    }>;
                    roles: z.ZodArray<z.ZodEnum<{
                        authorization: "authorization";
                        checkout: "checkout";
                        protected_resource: "protected_resource";
                        recovery: "recovery";
                        registration: "registration";
                        service: "service";
                        status: "status";
                        token: "token";
                        webhook: "webhook";
                    }>>;
                    operated_by_participant_id: z.ZodString;
                    standard_bindings: z.ZodArray<z.ZodObject<{
                        namespace: z.ZodString;
                        version: z.ZodString;
                        relation: z.ZodEnum<{
                            declares: "declares";
                            describes: "describes";
                            implements: "implements";
                            uses: "uses";
                        }>;
                    }, z.core.$strict>>;
                    allowed_redirect_hosts: z.ZodOptional<z.ZodArray<z.ZodString>>;
                }, z.core.$strict>>;
                interfaces: z.ZodArray<z.ZodObject<{
                    interface_id: z.ZodString;
                    modality: z.ZodEnum<{
                        agent_service: "agent_service";
                        command_line: "command_line";
                        network_api: "network_api";
                        software_library: "software_library";
                        tool_server: "tool_server";
                        web_application: "web_application";
                    }>;
                    functions: z.ZodArray<z.ZodEnum<{
                        authentication: "authentication";
                        commerce: "commerce";
                        events: "events";
                        recovery: "recovery";
                        service_operation: "service_operation";
                    }>>;
                    endpoint_ids: z.ZodArray<z.ZodString>;
                    resource_ids: z.ZodArray<z.ZodString>;
                    operated_by_participant_id: z.ZodString;
                    standard_bindings: z.ZodArray<z.ZodObject<{
                        namespace: z.ZodString;
                        version: z.ZodString;
                        relation: z.ZodEnum<{
                            declares: "declares";
                            describes: "describes";
                            implements: "implements";
                            uses: "uses";
                        }>;
                    }, z.core.$strict>>;
                }, z.core.$strict>>;
                relations: z.ZodArray<z.ZodObject<{
                    relation_id: z.ZodString;
                    kind: z.ZodEnum<{
                        alternative_to: "alternative_to";
                        authenticates: "authenticates";
                        describes: "describes";
                        precedes: "precedes";
                        requires: "requires";
                    }>;
                    from: z.ZodObject<{
                        node_kind: z.ZodEnum<{
                            endpoint: "endpoint";
                            interface: "interface";
                            resource: "resource";
                            surface_exclusion: "surface_exclusion";
                        }>;
                        node_id: z.ZodString;
                    }, z.core.$strict>;
                    to: z.ZodObject<{
                        node_kind: z.ZodEnum<{
                            endpoint: "endpoint";
                            interface: "interface";
                            resource: "resource";
                            surface_exclusion: "surface_exclusion";
                        }>;
                        node_id: z.ZodString;
                    }, z.core.$strict>;
                }, z.core.$strict>>;
                surface_exclusions: z.ZodArray<z.ZodObject<{
                    exclusion_id: z.ZodString;
                    role: z.ZodEnum<{
                        access: "access";
                        authentication: "authentication";
                        checkout: "checkout";
                        descriptor: "descriptor";
                        discovery: "discovery";
                        documentation: "documentation";
                        eligibility: "eligibility";
                        operations: "operations";
                        policy: "policy";
                        pricing: "pricing";
                        provisioning: "provisioning";
                        recovery: "recovery";
                        status: "status";
                        terms: "terms";
                    }>;
                    rationale: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>;
            lifecycle: z.ZodEnum<{
                active: "active";
                ended: "ended";
                withdrawn: "withdrawn";
            }>;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            revision_digest: z.ZodString;
            policy_digest: z.ZodString;
            policy_version: z.ZodString;
            policy_as_of: z.ZodISODateTime;
            job: z.ZodObject<{
                job_id: z.ZodString;
                job_digest: z.ZodString;
                category: z.ZodString;
                name: z.ZodString;
                statement: z.ZodString;
            }, z.core.$strict>;
            interface_id: z.ZodNullable<z.ZodString>;
            label: z.ZodEnum<{
                probed: "probed";
                sourcey_run: "sourcey_run";
                vendor_run_verified: "vendor_run_verified";
            }>;
            operate: z.ZodObject<{
                letter: z.ZodNullable<z.ZodEnum<{
                    A: "A";
                    "A+": "A+";
                    B: "B";
                    "B+": "B+";
                    C: "C";
                    "C+": "C+";
                    D: "D";
                    F: "F";
                }>>;
                statement: z.ZodNullable<z.ZodString>;
                steps: z.ZodArray<z.ZodObject<{
                    step: z.ZodEnum<{
                        confirm: "confirm";
                        delegation: "delegation";
                        discover: "discover";
                        job: "job";
                        pay: "pay";
                        sustain: "sustain";
                    }>;
                    outcome: z.ZodEnum<{
                        approval: "approval";
                        blocked: "blocked";
                        machine: "machine";
                        not_applicable: "not_applicable";
                        not_assessed: "not_assessed";
                        workaround: "workaround";
                    }>;
                    timing: z.ZodNullable<z.ZodEnum<{
                        recurring: "recurring";
                        setup: "setup";
                    }>>;
                }, z.core.$strict>>;
                missing: z.ZodArray<z.ZodEnum<{
                    confirm: "confirm";
                    delegation: "delegation";
                    discover: "discover";
                    job: "job";
                    pay: "pay";
                    sustain: "sustain";
                }>>;
                approvals: z.ZodArray<z.ZodEnum<{
                    confirm: "confirm";
                    delegation: "delegation";
                    discover: "discover";
                    job: "job";
                    pay: "pay";
                    sustain: "sustain";
                }>>;
                workarounds: z.ZodArray<z.ZodObject<{
                    step: z.ZodEnum<{
                        confirm: "confirm";
                        delegation: "delegation";
                        discover: "discover";
                        job: "job";
                        pay: "pay";
                        sustain: "sustain";
                    }>;
                    timing: z.ZodEnum<{
                        recurring: "recurring";
                        setup: "setup";
                    }>;
                }, z.core.$strict>>;
            }, z.core.$strict>;
            onboard: z.ZodObject<{
                level: z.ZodNullable<z.ZodNumber>;
            }, z.core.$strict>;
            discovery: z.ZodArray<z.ZodObject<{
                fact: z.ZodEnum<{
                    agent_documentation: "agent_documentation";
                    agent_registration: "agent_registration";
                    agent_skill: "agent_skill";
                    api_catalog_link: "api_catalog_link";
                    ard_entry: "ard_entry";
                    mcp_endpoint: "mcp_endpoint";
                    oauth_authorization_server: "oauth_authorization_server";
                    oauth_protected_resource: "oauth_protected_resource";
                    openapi_server: "openapi_server";
                    payment_manifest: "payment_manifest";
                    unsupported_descriptor: "unsupported_descriptor";
                }>;
                value: z.ZodURL;
                descriptor_url: z.ZodURL;
                attempt_digest: z.ZodString;
                adapter: z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                }, z.core.$strict>;
            }, z.core.$strict>>;
            run: z.ZodObject<{
                started_at: z.ZodISODateTime;
                finished_at: z.ZodISODateTime;
                discovery_reads: z.ZodNumber;
                exchanges: z.ZodArray<z.ZodObject<{
                    purpose: z.ZodEnum<{
                        cleanup: "cleanup";
                        delegation: "delegation";
                        error_probe: "error_probe";
                        job: "job";
                        sustain_baseline: "sustain_baseline";
                        sustain_control_probe: "sustain_control_probe";
                        sustain_revocation: "sustain_revocation";
                        sustain_revoked_probe: "sustain_revoked_probe";
                        sustain_rotated_probe: "sustain_rotated_probe";
                        sustain_rotation: "sustain_rotation";
                    }>;
                    role: z.ZodEnum<{
                        request: "request";
                        session_close: "session_close";
                        session_opening: "session_opening";
                        tool_listing: "tool_listing";
                    }>;
                    method: z.ZodEnum<{
                        DELETE: "DELETE";
                        GET: "GET";
                        HEAD: "HEAD";
                        PATCH: "PATCH";
                        POST: "POST";
                        PUT: "PUT";
                    }>;
                    url: z.ZodURL;
                    started_at: z.ZodISODateTime;
                    finished_at: z.ZodISODateTime;
                    response: z.ZodNullable<z.ZodObject<{
                        status: z.ZodNumber;
                        media_type: z.ZodString;
                        content_bytes: z.ZodNumber;
                        content_digest: z.ZodString;
                    }, z.core.$strict>>;
                    transport_error: z.ZodNullable<z.ZodString>;
                    exchange_digest: z.ZodString;
                }, z.core.$strict>>;
                error_probe: z.ZodNullable<z.ZodObject<{
                    typed: z.ZodBoolean;
                    reason: z.ZodString;
                }, z.core.$strict>>;
                assertions: z.ZodArray<z.ZodObject<{
                    assertion: z.ZodString;
                    holds: z.ZodBoolean;
                    failure: z.ZodNullable<z.ZodObject<{
                        check: z.ZodNumber;
                        reason: z.ZodString;
                    }, z.core.$strict>>;
                    statement: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>;
            last_run_at: z.ZodISODateTime;
            publication: z.ZodObject<{
                visibility: z.ZodEnum<{
                    discoverable: "discoverable";
                    private: "private";
                    resolvable_only: "resolvable_only";
                }>;
                reasons: z.ZodArray<z.ZodEnum<{
                    lifecycle_not_active: "lifecycle_not_active";
                    open_dispute: "open_dispute";
                }>>;
            }, z.core.$strict>;
            provenance: z.ZodObject<{
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                basis_event_ids: z.ZodArray<z.ZodString>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
            canonical_url: z.ZodURL;
            projection_digest: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>>;
    offer_id: z.ZodString;
    next_cursor: z.ZodNullable<z.ZodString>;
    freshness: z.ZodRecord<z.ZodString, z.ZodObject<{
        checked_at: z.ZodISODateTime;
        succeeded_at: z.ZodNullable<z.ZodISODateTime>;
        next_due_at: z.ZodNullable<z.ZodISODateTime>;
        state: z.ZodEnum<{
            fresh: "fresh";
            stale: "stale";
        }>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const eligibilityResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodObject<{
        entity_id: z.ZodString;
        program_id: z.ZodString;
        offer_id: z.ZodString;
        revision_digest: z.ZodString;
        lifecycle: z.ZodEnum<{
            active: "active";
            ended: "ended";
            withdrawn: "withdrawn";
        }>;
        evaluation: z.ZodObject<{
            eligible: z.ZodNullable<z.ZodBoolean>;
            trace: z.ZodType<import("../../revisions/src/index.js").EligibilityTrace, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityTrace, unknown>>;
        }, z.core.$strict>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const provenanceResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodObject<{
        revision_digest: z.ZodString;
        first_inclusion_sequence: z.ZodNumber;
        event_ids: z.ZodArray<z.ZodString>;
        observation_ids: z.ZodArray<z.ZodString>;
        coverage_policy_digest: z.ZodString;
        freshness_policy_digest: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
/** A current revision. The API serves only revisions current state references. */
export declare const catalogRevisionSchema: z.ZodUnion<readonly [z.ZodObject<{
    revision_contract: z.ZodLiteral<"sourcey.entity-revision/v1alpha1">;
    entity_id: z.ZodString;
    content: z.ZodObject<{
        name: z.ZodString;
        summary: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
        domains: z.ZodArray<z.ZodObject<{
            value: z.ZodString;
            role: z.ZodEnum<{
                alias: "alias";
                primary: "primary";
            }>;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
        }, z.core.$strict>>;
        category: z.ZodString;
        links: z.ZodObject<{
            site: z.ZodURL;
            pricing: z.ZodOptional<z.ZodURL>;
        }, z.core.$strict>;
    }, z.core.$strict>;
    revision_digest: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    revision_contract: z.ZodLiteral<"sourcey.program-revision/v1alpha1">;
    entity_id: z.ZodString;
    program_id: z.ZodString;
    content: z.ZodObject<{
        title: z.ZodString;
        summary: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    revision_digest: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    revision_contract: z.ZodLiteral<"sourcey.offer-revision/v1alpha1">;
    entity_id: z.ZodString;
    program_id: z.ZodOptional<z.ZodString>;
    offer_id: z.ZodString;
    content: z.ZodObject<{
        title: z.ZodString;
        summary: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        lifecycle: z.ZodObject<{
            status: z.ZodEnum<{
                active: "active";
                ended: "ended";
                withdrawn: "withdrawn";
            }>;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
        }, z.core.$strict>;
        economics: z.ZodObject<{
            consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"none">;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"fixed">;
                amount: z.ZodObject<{
                    currency: z.ZodString;
                    minor_units: z.ZodNumber;
                }, z.core.$strict>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"variable">;
                description: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"unknown">;
                description: z.ZodString;
            }, z.core.$strict>], "kind">;
            benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                benefit_id: z.ZodString;
                description: z.ZodString;
                kind: z.ZodLiteral<"credit">;
                value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"exact">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"up-to">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"at-least">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"range">;
                    minimum: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                    maximum: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>], "kind">;
                duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"exact">;
                    value: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"up-to">;
                    value: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"at-least">;
                    value: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"range">;
                    minimum: z.ZodString;
                    maximum: z.ZodString;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>, z.ZodObject<{
                benefit_id: z.ZodString;
                description: z.ZodString;
                kind: z.ZodLiteral<"discount">;
                percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"exact">;
                    basis_points: z.ZodNumber;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"up-to">;
                    basis_points: z.ZodNumber;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"at-least">;
                    basis_points: z.ZodNumber;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"range">;
                    minimum_basis_points: z.ZodNumber;
                    maximum_basis_points: z.ZodNumber;
                }, z.core.$strict>], "kind">;
                applies_to: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"exact">;
                    value: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"up-to">;
                    value: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"at-least">;
                    value: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"range">;
                    minimum: z.ZodString;
                    maximum: z.ZodString;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>, z.ZodObject<{
                benefit_id: z.ZodString;
                description: z.ZodString;
                kind: z.ZodLiteral<"cashback">;
                value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"money">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"percentage">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                }, z.core.$strict>], "kind">;
                duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"exact">;
                    value: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"up-to">;
                    value: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"at-least">;
                    value: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"range">;
                    minimum: z.ZodString;
                    maximum: z.ZodString;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>, z.ZodObject<{
                benefit_id: z.ZodString;
                description: z.ZodString;
                kind: z.ZodLiteral<"waiver">;
                waived_item: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                benefit_id: z.ZodString;
                description: z.ZodString;
                kind: z.ZodLiteral<"free-service">;
                service: z.ZodString;
                duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"exact">;
                    value: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"up-to">;
                    value: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"at-least">;
                    value: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"range">;
                    minimum: z.ZodString;
                    maximum: z.ZodString;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>, z.ZodObject<{
                benefit_id: z.ZodString;
                description: z.ZodString;
                kind: z.ZodLiteral<"other">;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>;
        eligibility: z.ZodObject<{
            rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
        }, z.core.$strict>;
        roles: z.ZodObject<{
            terms_authority_entity_id: z.ZodString;
            access_operator_entity_id: z.ZodString;
        }, z.core.$strict>;
        access: z.ZodObject<{
            availability: z.ZodEnum<{
                automatic: "automatic";
                invite: "invite";
                membership: "membership";
                other: "other";
                public: "public";
                referral: "referral";
            }>;
            method: z.ZodEnum<{
                automatic: "automatic";
                code: "code";
                contact: "contact";
                form: "form";
                other: "other";
            }>;
            url: z.ZodOptional<z.ZodURL>;
            public_code: z.ZodOptional<z.ZodString>;
            instructions: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        terms_url: z.ZodOptional<z.ZodURL>;
    }, z.core.$strict>;
    revision_digest: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    agent_readiness_profile_id: z.ZodString;
    entity_id: z.ZodString;
    scope: z.ZodObject<{
        product: z.ZodObject<{
            key: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>;
        job: z.ZodObject<{
            key: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>;
    catalog_binding: z.ZodObject<{
        base_release_id: z.ZodString;
        entity_revision_digest: z.ZodString;
    }, z.core.$strict>;
    declaration_revision_digest: z.ZodString;
    declaration: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"none">;
    }, z.core.$strict>, z.ZodObject<{
        declaration_id: z.ZodString;
        provenance: z.ZodUnion<readonly [z.ZodObject<{
            repository: z.ZodLiteral<"sourcey/agent-ready-services">;
            commit: z.ZodString;
            path: z.ZodString;
            git_blob_oid: z.ZodString;
            blob_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"sourcey">;
            path: z.ZodString;
            blob_digest: z.ZodString;
        }, z.core.$strict>]>;
        status: z.ZodEnum<{
            community_declared: "community_declared";
            entity_attested: "entity_attested";
        }>;
    }, z.core.$strict>], "status">;
    lifecycle: z.ZodEnum<{
        active: "active";
        ended: "ended";
        withdrawn: "withdrawn";
    }>;
    effective_from: z.ZodISODateTime;
    effective_until: z.ZodOptional<z.ZodISODateTime>;
    job_digest: z.ZodString;
    engine: z.ZodObject<{
        name: z.ZodString;
        version: z.ZodString;
        engine_digest: z.ZodString;
    }, z.core.$strict>;
    binding_id: z.ZodNullable<z.ZodString>;
    binding_digest: z.ZodNullable<z.ZodString>;
    runs: z.ZodArray<z.ZodObject<{
        run_digest: z.ZodString;
        label: z.ZodEnum<{
            probed: "probed";
            sourcey_run: "sourcey_run";
            vendor_run_verified: "vendor_run_verified";
        }>;
        run_kind: z.ZodEnum<{
            onboard: "onboard";
            operate: "operate";
            operate_onboard: "operate_onboard";
        }>;
        finished_at: z.ZodISODateTime;
    }, z.core.$strict>>;
    steps: z.ZodArray<z.ZodObject<{
        step: z.ZodEnum<{
            confirm: "confirm";
            delegation: "delegation";
            discover: "discover";
            job: "job";
            pay: "pay";
            sustain: "sustain";
        }>;
        outcome: z.ZodEnum<{
            approval: "approval";
            blocked: "blocked";
            machine: "machine";
            not_applicable: "not_applicable";
            not_assessed: "not_assessed";
            workaround: "workaround";
        }>;
        timing: z.ZodNullable<z.ZodEnum<{
            recurring: "recurring";
            setup: "setup";
        }>>;
        evidence: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"exchange">;
            run_digest: z.ZodString;
            exchange_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"discovery">;
            run_digest: z.ZodString;
            attempt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"handoff">;
            run_digest: z.ZodString;
            handoff: z.ZodNumber;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"credential">;
            run_digest: z.ZodString;
            handle_digest: z.ZodString;
        }, z.core.$strict>], "kind">>;
    }, z.core.$strict>>;
    onboard_level: z.ZodNullable<z.ZodNumber>;
    discovery: z.ZodArray<z.ZodObject<{
        fact: z.ZodEnum<{
            agent_documentation: "agent_documentation";
            agent_registration: "agent_registration";
            agent_skill: "agent_skill";
            api_catalog_link: "api_catalog_link";
            ard_entry: "ard_entry";
            mcp_endpoint: "mcp_endpoint";
            oauth_authorization_server: "oauth_authorization_server";
            oauth_protected_resource: "oauth_protected_resource";
            openapi_server: "openapi_server";
            payment_manifest: "payment_manifest";
            unsupported_descriptor: "unsupported_descriptor";
        }>;
        value: z.ZodURL;
        descriptor_url: z.ZodURL;
        attempt_digest: z.ZodString;
        adapter: z.ZodObject<{
            namespace: z.ZodString;
            version: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>>;
    latest_run: z.ZodObject<{
        started_at: z.ZodISODateTime;
        finished_at: z.ZodISODateTime;
        discovery_reads: z.ZodNumber;
        exchanges: z.ZodArray<z.ZodObject<{
            purpose: z.ZodEnum<{
                cleanup: "cleanup";
                delegation: "delegation";
                error_probe: "error_probe";
                job: "job";
                sustain_baseline: "sustain_baseline";
                sustain_control_probe: "sustain_control_probe";
                sustain_revocation: "sustain_revocation";
                sustain_revoked_probe: "sustain_revoked_probe";
                sustain_rotated_probe: "sustain_rotated_probe";
                sustain_rotation: "sustain_rotation";
            }>;
            role: z.ZodEnum<{
                request: "request";
                session_close: "session_close";
                session_opening: "session_opening";
                tool_listing: "tool_listing";
            }>;
            method: z.ZodEnum<{
                DELETE: "DELETE";
                GET: "GET";
                HEAD: "HEAD";
                PATCH: "PATCH";
                POST: "POST";
                PUT: "PUT";
            }>;
            url: z.ZodURL;
            started_at: z.ZodISODateTime;
            finished_at: z.ZodISODateTime;
            response: z.ZodNullable<z.ZodObject<{
                status: z.ZodNumber;
                media_type: z.ZodString;
                content_bytes: z.ZodNumber;
                content_digest: z.ZodString;
            }, z.core.$strict>>;
            transport_error: z.ZodNullable<z.ZodString>;
            exchange_digest: z.ZodString;
        }, z.core.$strict>>;
        assertions: z.ZodArray<z.ZodObject<{
            assertion: z.ZodString;
            holds: z.ZodBoolean;
            failure: z.ZodNullable<z.ZodObject<{
                check: z.ZodNumber;
                reason: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        error_probe: z.ZodNullable<z.ZodObject<{
            typed: z.ZodBoolean;
            reason: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    revision_contract: z.ZodLiteral<"sourcey.agent-readiness-revision/v1alpha1">;
    revision_digest: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    revision_contract: z.ZodLiteral<"sourcey.agent-readiness-declaration-revision/v1alpha1">;
    entity_id: z.ZodString;
    declaration: z.ZodObject<{
        declaration_id: z.ZodString;
        scope: z.ZodObject<{
            product: z.ZodObject<{
                key: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
            job: z.ZodObject<{
                key: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        job_bindings: z.ZodArray<z.ZodObject<{
            binding_id: z.ZodString;
            interface_id: z.ZodString;
            calls: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"http">;
                call_id: z.ZodString;
                endpoint_id: z.ZodString;
                method: z.ZodEnum<{
                    DELETE: "DELETE";
                    GET: "GET";
                    HEAD: "HEAD";
                    PATCH: "PATCH";
                    POST: "POST";
                    PUT: "PUT";
                }>;
                url: z.ZodString;
                headers: z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    value: z.ZodString;
                }, z.core.$strict>>;
                body: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    media_type: z.ZodLiteral<"application/json">;
                    json: z.ZodJSONSchema;
                }, z.core.$strict>, z.ZodObject<{
                    media_type: z.ZodLiteral<"application/x-www-form-urlencoded">;
                    form: z.ZodArray<z.ZodObject<{
                        name: z.ZodString;
                        value: z.ZodString;
                    }, z.core.$strict>>;
                }, z.core.$strict>], "media_type">>;
                credentials: z.ZodArray<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"mcp">;
                call_id: z.ZodString;
                endpoint_id: z.ZodString;
                tool: z.ZodString;
                arguments: z.ZodJSONSchema;
                credentials: z.ZodArray<z.ZodString>;
            }, z.core.$strict>], "kind">>;
            assertions: z.ZodArray<z.ZodObject<{
                assertion: z.ZodString;
                observations: z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    call: z.ZodString;
                    source: z.ZodEnum<{
                        json: "json";
                        request: "request";
                        stream: "stream";
                    }>;
                    pointer: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>>;
            error_probe: z.ZodObject<{
                call: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"http">;
                    call_id: z.ZodString;
                    endpoint_id: z.ZodString;
                    method: z.ZodEnum<{
                        DELETE: "DELETE";
                        GET: "GET";
                        HEAD: "HEAD";
                        PATCH: "PATCH";
                        POST: "POST";
                        PUT: "PUT";
                    }>;
                    url: z.ZodString;
                    headers: z.ZodArray<z.ZodObject<{
                        name: z.ZodString;
                        value: z.ZodString;
                    }, z.core.$strict>>;
                    body: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        media_type: z.ZodLiteral<"application/json">;
                        json: z.ZodJSONSchema;
                    }, z.core.$strict>, z.ZodObject<{
                        media_type: z.ZodLiteral<"application/x-www-form-urlencoded">;
                        form: z.ZodArray<z.ZodObject<{
                            name: z.ZodString;
                            value: z.ZodString;
                        }, z.core.$strict>>;
                    }, z.core.$strict>], "media_type">>;
                    credentials: z.ZodArray<z.ZodString>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"mcp">;
                    call_id: z.ZodString;
                    endpoint_id: z.ZodString;
                    tool: z.ZodString;
                    arguments: z.ZodJSONSchema;
                    credentials: z.ZodArray<z.ZodString>;
                }, z.core.$strict>], "kind">;
                expect: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"http_error">;
                    status_class: z.ZodLiteral<"4xx">;
                    error_pointer: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"mcp_error">;
                }, z.core.$strict>], "kind">;
            }, z.core.$strict>;
            delegation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"none">;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"entered">;
                credentials: z.ZodArray<z.ZodObject<{
                    role: z.ZodString;
                    placement: z.ZodUnion<readonly [z.ZodObject<{
                        scheme: z.ZodEnum<{
                            basic: "basic";
                            bearer: "bearer";
                        }>;
                        header_name: z.ZodLiteral<"authorization">;
                    }, z.core.$strict>, z.ZodObject<{
                        scheme: z.ZodLiteral<"header">;
                        header_name: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        scheme: z.ZodLiteral<"form">;
                        field: z.ZodString;
                    }, z.core.$strict>]>;
                    endpoint_ids: z.ZodArray<z.ZodString>;
                    methods: z.ZodArray<z.ZodEnum<{
                        DELETE: "DELETE";
                        GET: "GET";
                        HEAD: "HEAD";
                        PATCH: "PATCH";
                        POST: "POST";
                        PUT: "PUT";
                    }>>;
                }, z.core.$strict>>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"oauth">;
                authorization_endpoint_id: z.ZodString;
                token_endpoint_id: z.ZodString;
                client: z.ZodEnum<{
                    client_id_metadata_document: "client_id_metadata_document";
                    dynamic_registration: "dynamic_registration";
                    preregistered: "preregistered";
                }>;
                scopes: z.ZodArray<z.ZodString>;
                keep: z.ZodArray<z.ZodObject<{
                    role: z.ZodString;
                    placement: z.ZodUnion<readonly [z.ZodObject<{
                        scheme: z.ZodEnum<{
                            basic: "basic";
                            bearer: "bearer";
                        }>;
                        header_name: z.ZodLiteral<"authorization">;
                    }, z.core.$strict>, z.ZodObject<{
                        scheme: z.ZodLiteral<"header">;
                        header_name: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        scheme: z.ZodLiteral<"form">;
                        field: z.ZodString;
                    }, z.core.$strict>]>;
                    endpoint_ids: z.ZodArray<z.ZodString>;
                    methods: z.ZodArray<z.ZodEnum<{
                        DELETE: "DELETE";
                        GET: "GET";
                        HEAD: "HEAD";
                        PATCH: "PATCH";
                        POST: "POST";
                        PUT: "PUT";
                    }>>;
                    pointer: z.ZodString;
                    expires_in_pointer: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
            }, z.core.$strict>, z.ZodObject<{
                call: z.ZodObject<{
                    kind: z.ZodLiteral<"http">;
                    call_id: z.ZodString;
                    endpoint_id: z.ZodString;
                    method: z.ZodEnum<{
                        DELETE: "DELETE";
                        GET: "GET";
                        HEAD: "HEAD";
                        PATCH: "PATCH";
                        POST: "POST";
                        PUT: "PUT";
                    }>;
                    url: z.ZodString;
                    headers: z.ZodArray<z.ZodObject<{
                        name: z.ZodString;
                        value: z.ZodString;
                    }, z.core.$strict>>;
                    body: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        media_type: z.ZodLiteral<"application/json">;
                        json: z.ZodJSONSchema;
                    }, z.core.$strict>, z.ZodObject<{
                        media_type: z.ZodLiteral<"application/x-www-form-urlencoded">;
                        form: z.ZodArray<z.ZodObject<{
                            name: z.ZodString;
                            value: z.ZodString;
                        }, z.core.$strict>>;
                    }, z.core.$strict>], "media_type">>;
                    credentials: z.ZodArray<z.ZodString>;
                }, z.core.$strict>;
                keep: z.ZodArray<z.ZodObject<{
                    role: z.ZodString;
                    placement: z.ZodUnion<readonly [z.ZodObject<{
                        scheme: z.ZodEnum<{
                            basic: "basic";
                            bearer: "bearer";
                        }>;
                        header_name: z.ZodLiteral<"authorization">;
                    }, z.core.$strict>, z.ZodObject<{
                        scheme: z.ZodLiteral<"header">;
                        header_name: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        scheme: z.ZodLiteral<"form">;
                        field: z.ZodString;
                    }, z.core.$strict>]>;
                    endpoint_ids: z.ZodArray<z.ZodString>;
                    methods: z.ZodArray<z.ZodEnum<{
                        DELETE: "DELETE";
                        GET: "GET";
                        HEAD: "HEAD";
                        PATCH: "PATCH";
                        POST: "POST";
                        PUT: "PUT";
                    }>>;
                    pointer: z.ZodString;
                    expires_in_pointer: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                kind: z.ZodLiteral<"minted">;
                from: z.ZodObject<{
                    role: z.ZodString;
                    placement: z.ZodUnion<readonly [z.ZodObject<{
                        scheme: z.ZodEnum<{
                            basic: "basic";
                            bearer: "bearer";
                        }>;
                        header_name: z.ZodLiteral<"authorization">;
                    }, z.core.$strict>, z.ZodObject<{
                        scheme: z.ZodLiteral<"header">;
                        header_name: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        scheme: z.ZodLiteral<"form">;
                        field: z.ZodString;
                    }, z.core.$strict>]>;
                    endpoint_ids: z.ZodArray<z.ZodString>;
                    methods: z.ZodArray<z.ZodEnum<{
                        DELETE: "DELETE";
                        GET: "GET";
                        HEAD: "HEAD";
                        PATCH: "PATCH";
                        POST: "POST";
                        PUT: "PUT";
                    }>>;
                }, z.core.$strict>;
            }, z.core.$strict>], "kind">;
            payment: z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"none">;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"prepaid_balance">;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"per_call">;
                protocol: z.ZodEnum<{
                    mpp: "mpp";
                    x402: "x402";
                }>;
            }, z.core.$strict>], "kind">;
            sustain: z.ZodObject<{
                rotation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"not_applicable">;
                }, z.core.$strict>, z.ZodObject<{
                    call: z.ZodObject<{
                        kind: z.ZodLiteral<"http">;
                        call_id: z.ZodString;
                        endpoint_id: z.ZodString;
                        method: z.ZodEnum<{
                            DELETE: "DELETE";
                            GET: "GET";
                            HEAD: "HEAD";
                            PATCH: "PATCH";
                            POST: "POST";
                            PUT: "PUT";
                        }>;
                        url: z.ZodString;
                        headers: z.ZodArray<z.ZodObject<{
                            name: z.ZodString;
                            value: z.ZodString;
                        }, z.core.$strict>>;
                        body: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            media_type: z.ZodLiteral<"application/json">;
                            json: z.ZodJSONSchema;
                        }, z.core.$strict>, z.ZodObject<{
                            media_type: z.ZodLiteral<"application/x-www-form-urlencoded">;
                            form: z.ZodArray<z.ZodObject<{
                                name: z.ZodString;
                                value: z.ZodString;
                            }, z.core.$strict>>;
                        }, z.core.$strict>], "media_type">>;
                        credentials: z.ZodArray<z.ZodString>;
                    }, z.core.$strict>;
                    keep: z.ZodArray<z.ZodObject<{
                        role: z.ZodString;
                        placement: z.ZodUnion<readonly [z.ZodObject<{
                            scheme: z.ZodEnum<{
                                basic: "basic";
                                bearer: "bearer";
                            }>;
                            header_name: z.ZodLiteral<"authorization">;
                        }, z.core.$strict>, z.ZodObject<{
                            scheme: z.ZodLiteral<"header">;
                            header_name: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            scheme: z.ZodLiteral<"form">;
                            field: z.ZodString;
                        }, z.core.$strict>]>;
                        endpoint_ids: z.ZodArray<z.ZodString>;
                        methods: z.ZodArray<z.ZodEnum<{
                            DELETE: "DELETE";
                            GET: "GET";
                            HEAD: "HEAD";
                            PATCH: "PATCH";
                            POST: "POST";
                            PUT: "PUT";
                        }>>;
                        pointer: z.ZodString;
                        expires_in_pointer: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>;
                    kind: z.ZodLiteral<"refresh">;
                }, z.core.$strict>, z.ZodObject<{
                    call: z.ZodObject<{
                        kind: z.ZodLiteral<"http">;
                        call_id: z.ZodString;
                        endpoint_id: z.ZodString;
                        method: z.ZodEnum<{
                            DELETE: "DELETE";
                            GET: "GET";
                            HEAD: "HEAD";
                            PATCH: "PATCH";
                            POST: "POST";
                            PUT: "PUT";
                        }>;
                        url: z.ZodString;
                        headers: z.ZodArray<z.ZodObject<{
                            name: z.ZodString;
                            value: z.ZodString;
                        }, z.core.$strict>>;
                        body: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            media_type: z.ZodLiteral<"application/json">;
                            json: z.ZodJSONSchema;
                        }, z.core.$strict>, z.ZodObject<{
                            media_type: z.ZodLiteral<"application/x-www-form-urlencoded">;
                            form: z.ZodArray<z.ZodObject<{
                                name: z.ZodString;
                                value: z.ZodString;
                            }, z.core.$strict>>;
                        }, z.core.$strict>], "media_type">>;
                        credentials: z.ZodArray<z.ZodString>;
                    }, z.core.$strict>;
                    keep: z.ZodArray<z.ZodObject<{
                        role: z.ZodString;
                        placement: z.ZodUnion<readonly [z.ZodObject<{
                            scheme: z.ZodEnum<{
                                basic: "basic";
                                bearer: "bearer";
                            }>;
                            header_name: z.ZodLiteral<"authorization">;
                        }, z.core.$strict>, z.ZodObject<{
                            scheme: z.ZodLiteral<"header">;
                            header_name: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            scheme: z.ZodLiteral<"form">;
                            field: z.ZodString;
                        }, z.core.$strict>]>;
                        endpoint_ids: z.ZodArray<z.ZodString>;
                        methods: z.ZodArray<z.ZodEnum<{
                            DELETE: "DELETE";
                            GET: "GET";
                            HEAD: "HEAD";
                            PATCH: "PATCH";
                            POST: "POST";
                            PUT: "PUT";
                        }>>;
                        pointer: z.ZodString;
                        expires_in_pointer: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>;
                    kind: z.ZodLiteral<"mint">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"manual">;
                }, z.core.$strict>], "kind">;
                revocation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"not_applicable">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"call">;
                    call: z.ZodObject<{
                        kind: z.ZodLiteral<"http">;
                        call_id: z.ZodString;
                        endpoint_id: z.ZodString;
                        method: z.ZodEnum<{
                            DELETE: "DELETE";
                            GET: "GET";
                            HEAD: "HEAD";
                            PATCH: "PATCH";
                            POST: "POST";
                            PUT: "PUT";
                        }>;
                        url: z.ZodString;
                        headers: z.ZodArray<z.ZodObject<{
                            name: z.ZodString;
                            value: z.ZodString;
                        }, z.core.$strict>>;
                        body: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            media_type: z.ZodLiteral<"application/json">;
                            json: z.ZodJSONSchema;
                        }, z.core.$strict>, z.ZodObject<{
                            media_type: z.ZodLiteral<"application/x-www-form-urlencoded">;
                            form: z.ZodArray<z.ZodObject<{
                                name: z.ZodString;
                                value: z.ZodString;
                            }, z.core.$strict>>;
                        }, z.core.$strict>], "media_type">>;
                        credentials: z.ZodArray<z.ZodString>;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"manual">;
                }, z.core.$strict>], "kind">;
                verification: z.ZodOptional<z.ZodObject<{
                    probe: z.ZodObject<{
                        kind: z.ZodLiteral<"http">;
                        call_id: z.ZodString;
                        endpoint_id: z.ZodString;
                        url: z.ZodString;
                        headers: z.ZodArray<z.ZodObject<{
                            name: z.ZodString;
                            value: z.ZodString;
                        }, z.core.$strict>>;
                        method: z.ZodLiteral<"GET">;
                        body: z.ZodNull;
                        credentials: z.ZodArray<z.ZodString>;
                    }, z.core.$strict>;
                    control: z.ZodObject<{
                        kind: z.ZodLiteral<"http">;
                        call_id: z.ZodString;
                        endpoint_id: z.ZodString;
                        url: z.ZodString;
                        headers: z.ZodArray<z.ZodObject<{
                            name: z.ZodString;
                            value: z.ZodString;
                        }, z.core.$strict>>;
                        method: z.ZodLiteral<"GET">;
                        body: z.ZodNull;
                        credentials: z.ZodArray<z.ZodString>;
                    }, z.core.$strict>;
                }, z.core.$strict>>;
            }, z.core.$strict>;
            cleanup: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"http">;
                call_id: z.ZodString;
                endpoint_id: z.ZodString;
                method: z.ZodEnum<{
                    DELETE: "DELETE";
                    GET: "GET";
                    HEAD: "HEAD";
                    PATCH: "PATCH";
                    POST: "POST";
                    PUT: "PUT";
                }>;
                url: z.ZodString;
                headers: z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    value: z.ZodString;
                }, z.core.$strict>>;
                body: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    media_type: z.ZodLiteral<"application/json">;
                    json: z.ZodJSONSchema;
                }, z.core.$strict>, z.ZodObject<{
                    media_type: z.ZodLiteral<"application/x-www-form-urlencoded">;
                    form: z.ZodArray<z.ZodObject<{
                        name: z.ZodString;
                        value: z.ZodString;
                    }, z.core.$strict>>;
                }, z.core.$strict>], "media_type">>;
                credentials: z.ZodArray<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"mcp">;
                call_id: z.ZodString;
                endpoint_id: z.ZodString;
                tool: z.ZodString;
                arguments: z.ZodJSONSchema;
                credentials: z.ZodArray<z.ZodString>;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>>;
        participants: z.ZodArray<z.ZodObject<{
            participant_id: z.ZodString;
            roles: z.ZodArray<z.ZodEnum<{
                access_operator: "access_operator";
                identity_provider: "identity_provider";
                operations_provider: "operations_provider";
                payment_provider: "payment_provider";
                provisioning_provider: "provisioning_provider";
                subject: "subject";
            }>>;
            identity: z.ZodUnion<readonly [z.ZodObject<{
                entity_id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                origin_source_id: z.ZodString;
            }, z.core.$strict>]>;
        }, z.core.$strict>>;
        resources: z.ZodArray<z.ZodObject<{
            resource_id: z.ZodString;
            uri: z.ZodURL;
            roles: z.ZodArray<z.ZodEnum<{
                access: "access";
                authentication: "authentication";
                checkout: "checkout";
                descriptor: "descriptor";
                discovery: "discovery";
                documentation: "documentation";
                eligibility: "eligibility";
                operations: "operations";
                policy: "policy";
                pricing: "pricing";
                provisioning: "provisioning";
                recovery: "recovery";
                status: "status";
                terms: "terms";
            }>>;
            operated_by_participant_id: z.ZodString;
            standard_bindings: z.ZodArray<z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
                relation: z.ZodEnum<{
                    declares: "declares";
                    describes: "describes";
                    implements: "implements";
                    uses: "uses";
                }>;
            }, z.core.$strict>>;
            allowed_redirect_hosts: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strict>>;
        endpoints: z.ZodArray<z.ZodObject<{
            endpoint_id: z.ZodString;
            uri: z.ZodURL;
            transport: z.ZodEnum<{
                grpc: "grpc";
                http: "http";
                websocket: "websocket";
            }>;
            roles: z.ZodArray<z.ZodEnum<{
                authorization: "authorization";
                checkout: "checkout";
                protected_resource: "protected_resource";
                recovery: "recovery";
                registration: "registration";
                service: "service";
                status: "status";
                token: "token";
                webhook: "webhook";
            }>>;
            operated_by_participant_id: z.ZodString;
            standard_bindings: z.ZodArray<z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
                relation: z.ZodEnum<{
                    declares: "declares";
                    describes: "describes";
                    implements: "implements";
                    uses: "uses";
                }>;
            }, z.core.$strict>>;
            allowed_redirect_hosts: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strict>>;
        interfaces: z.ZodArray<z.ZodObject<{
            interface_id: z.ZodString;
            modality: z.ZodEnum<{
                agent_service: "agent_service";
                command_line: "command_line";
                network_api: "network_api";
                software_library: "software_library";
                tool_server: "tool_server";
                web_application: "web_application";
            }>;
            functions: z.ZodArray<z.ZodEnum<{
                authentication: "authentication";
                commerce: "commerce";
                events: "events";
                recovery: "recovery";
                service_operation: "service_operation";
            }>>;
            endpoint_ids: z.ZodArray<z.ZodString>;
            resource_ids: z.ZodArray<z.ZodString>;
            operated_by_participant_id: z.ZodString;
            standard_bindings: z.ZodArray<z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
                relation: z.ZodEnum<{
                    declares: "declares";
                    describes: "describes";
                    implements: "implements";
                    uses: "uses";
                }>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        relations: z.ZodArray<z.ZodObject<{
            relation_id: z.ZodString;
            kind: z.ZodEnum<{
                alternative_to: "alternative_to";
                authenticates: "authenticates";
                describes: "describes";
                precedes: "precedes";
                requires: "requires";
            }>;
            from: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    endpoint: "endpoint";
                    interface: "interface";
                    resource: "resource";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>;
            to: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    endpoint: "endpoint";
                    interface: "interface";
                    resource: "resource";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
        surface_exclusions: z.ZodArray<z.ZodObject<{
            exclusion_id: z.ZodString;
            role: z.ZodEnum<{
                access: "access";
                authentication: "authentication";
                checkout: "checkout";
                descriptor: "descriptor";
                discovery: "discovery";
                documentation: "documentation";
                eligibility: "eligibility";
                operations: "operations";
                policy: "policy";
                pricing: "pricing";
                provisioning: "provisioning";
                recovery: "recovery";
                status: "status";
                terms: "terms";
            }>;
            rationale: z.ZodString;
        }, z.core.$strict>>;
        authority_intent: z.ZodEnum<{
            community: "community";
            entity: "entity";
        }>;
        declared_at: z.ZodISODateTime;
        source_bindings: z.ZodArray<z.ZodObject<{
            source_binding_id: z.ZodString;
            source_id: z.ZodString;
            field_paths: z.ZodArray<z.ZodString>;
            target: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    declaration: "declaration";
                    endpoint: "endpoint";
                    interface: "interface";
                    job_binding: "job_binding";
                    participant: "participant";
                    relation: "relation";
                    resource: "resource";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    sources: z.ZodArray<z.ZodObject<{
        source_id: z.ZodString;
        url: z.ZodURL;
    }, z.core.$strict>>;
    revision_digest: z.ZodString;
}, z.core.$strict>]>;
export type CatalogRevision = z.infer<typeof catalogRevisionSchema>;
export declare const revisionDocumentSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    revision_digest: z.ZodString;
    entity_id: z.ZodString;
    revision_contract: z.ZodLiteral<"sourcey.entity-revision/v1alpha1">;
}, z.core.$loose>, z.ZodObject<{
    revision_digest: z.ZodString;
    entity_id: z.ZodString;
    revision_contract: z.ZodLiteral<"sourcey.program-revision/v1alpha1">;
    program_id: z.ZodString;
}, z.core.$loose>, z.ZodObject<{
    revision_digest: z.ZodString;
    entity_id: z.ZodString;
    revision_contract: z.ZodLiteral<"sourcey.offer-revision/v1alpha1">;
    offer_id: z.ZodString;
}, z.core.$loose>, z.ZodObject<{
    revision_digest: z.ZodString;
    entity_id: z.ZodString;
    revision_contract: z.ZodLiteral<"sourcey.agent-readiness-revision/v1alpha1">;
    agent_readiness_profile_id: z.ZodString;
}, z.core.$loose>, z.ZodObject<{
    revision_digest: z.ZodString;
    entity_id: z.ZodString;
    revision_contract: z.ZodLiteral<"sourcey.agent-readiness-declaration-revision/v1alpha1">;
}, z.core.$loose>], "revision_contract">;
export type RevisionDocument = z.infer<typeof revisionDocumentSchema>;
export declare const revisionResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodUnion<readonly [z.ZodObject<{
        revision_contract: z.ZodLiteral<"sourcey.entity-revision/v1alpha1">;
        entity_id: z.ZodString;
        content: z.ZodObject<{
            name: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            description: z.ZodString;
            domains: z.ZodArray<z.ZodObject<{
                value: z.ZodString;
                role: z.ZodEnum<{
                    alias: "alias";
                    primary: "primary";
                }>;
                valid_from: z.ZodISODateTime;
                valid_until: z.ZodOptional<z.ZodISODateTime>;
            }, z.core.$strict>>;
            category: z.ZodString;
            links: z.ZodObject<{
                site: z.ZodURL;
                pricing: z.ZodOptional<z.ZodURL>;
            }, z.core.$strict>;
        }, z.core.$strict>;
        revision_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        revision_contract: z.ZodLiteral<"sourcey.program-revision/v1alpha1">;
        entity_id: z.ZodString;
        program_id: z.ZodString;
        content: z.ZodObject<{
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        revision_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        revision_contract: z.ZodLiteral<"sourcey.offer-revision/v1alpha1">;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
        content: z.ZodObject<{
            title: z.ZodString;
            summary: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            lifecycle: z.ZodObject<{
                status: z.ZodEnum<{
                    active: "active";
                    ended: "ended";
                    withdrawn: "withdrawn";
                }>;
                effective_from: z.ZodISODateTime;
                effective_until: z.ZodOptional<z.ZodISODateTime>;
            }, z.core.$strict>;
            economics: z.ZodObject<{
                consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"fixed">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"variable">;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"unknown">;
                    description: z.ZodString;
                }, z.core.$strict>], "kind">;
                benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodString;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"other">;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>;
            eligibility: z.ZodObject<{
                rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
            }, z.core.$strict>;
            roles: z.ZodObject<{
                terms_authority_entity_id: z.ZodString;
                access_operator_entity_id: z.ZodString;
            }, z.core.$strict>;
            access: z.ZodObject<{
                availability: z.ZodEnum<{
                    automatic: "automatic";
                    invite: "invite";
                    membership: "membership";
                    other: "other";
                    public: "public";
                    referral: "referral";
                }>;
                method: z.ZodEnum<{
                    automatic: "automatic";
                    code: "code";
                    contact: "contact";
                    form: "form";
                    other: "other";
                }>;
                url: z.ZodOptional<z.ZodURL>;
                public_code: z.ZodOptional<z.ZodString>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
        }, z.core.$strict>;
        revision_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        agent_readiness_profile_id: z.ZodString;
        entity_id: z.ZodString;
        scope: z.ZodObject<{
            product: z.ZodObject<{
                key: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
            job: z.ZodObject<{
                key: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        catalog_binding: z.ZodObject<{
            base_release_id: z.ZodString;
            entity_revision_digest: z.ZodString;
        }, z.core.$strict>;
        declaration_revision_digest: z.ZodString;
        declaration: z.ZodDiscriminatedUnion<[z.ZodObject<{
            status: z.ZodLiteral<"none">;
        }, z.core.$strict>, z.ZodObject<{
            declaration_id: z.ZodString;
            provenance: z.ZodUnion<readonly [z.ZodObject<{
                repository: z.ZodLiteral<"sourcey/agent-ready-services">;
                commit: z.ZodString;
                path: z.ZodString;
                git_blob_oid: z.ZodString;
                blob_digest: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                source: z.ZodLiteral<"sourcey">;
                path: z.ZodString;
                blob_digest: z.ZodString;
            }, z.core.$strict>]>;
            status: z.ZodEnum<{
                community_declared: "community_declared";
                entity_attested: "entity_attested";
            }>;
        }, z.core.$strict>], "status">;
        lifecycle: z.ZodEnum<{
            active: "active";
            ended: "ended";
            withdrawn: "withdrawn";
        }>;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        job_digest: z.ZodString;
        engine: z.ZodObject<{
            name: z.ZodString;
            version: z.ZodString;
            engine_digest: z.ZodString;
        }, z.core.$strict>;
        binding_id: z.ZodNullable<z.ZodString>;
        binding_digest: z.ZodNullable<z.ZodString>;
        runs: z.ZodArray<z.ZodObject<{
            run_digest: z.ZodString;
            label: z.ZodEnum<{
                probed: "probed";
                sourcey_run: "sourcey_run";
                vendor_run_verified: "vendor_run_verified";
            }>;
            run_kind: z.ZodEnum<{
                onboard: "onboard";
                operate: "operate";
                operate_onboard: "operate_onboard";
            }>;
            finished_at: z.ZodISODateTime;
        }, z.core.$strict>>;
        steps: z.ZodArray<z.ZodObject<{
            step: z.ZodEnum<{
                confirm: "confirm";
                delegation: "delegation";
                discover: "discover";
                job: "job";
                pay: "pay";
                sustain: "sustain";
            }>;
            outcome: z.ZodEnum<{
                approval: "approval";
                blocked: "blocked";
                machine: "machine";
                not_applicable: "not_applicable";
                not_assessed: "not_assessed";
                workaround: "workaround";
            }>;
            timing: z.ZodNullable<z.ZodEnum<{
                recurring: "recurring";
                setup: "setup";
            }>>;
            evidence: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"exchange">;
                run_digest: z.ZodString;
                exchange_digest: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"discovery">;
                run_digest: z.ZodString;
                attempt_digest: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"handoff">;
                run_digest: z.ZodString;
                handoff: z.ZodNumber;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"credential">;
                run_digest: z.ZodString;
                handle_digest: z.ZodString;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>>;
        onboard_level: z.ZodNullable<z.ZodNumber>;
        discovery: z.ZodArray<z.ZodObject<{
            fact: z.ZodEnum<{
                agent_documentation: "agent_documentation";
                agent_registration: "agent_registration";
                agent_skill: "agent_skill";
                api_catalog_link: "api_catalog_link";
                ard_entry: "ard_entry";
                mcp_endpoint: "mcp_endpoint";
                oauth_authorization_server: "oauth_authorization_server";
                oauth_protected_resource: "oauth_protected_resource";
                openapi_server: "openapi_server";
                payment_manifest: "payment_manifest";
                unsupported_descriptor: "unsupported_descriptor";
            }>;
            value: z.ZodURL;
            descriptor_url: z.ZodURL;
            attempt_digest: z.ZodString;
            adapter: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
        latest_run: z.ZodObject<{
            started_at: z.ZodISODateTime;
            finished_at: z.ZodISODateTime;
            discovery_reads: z.ZodNumber;
            exchanges: z.ZodArray<z.ZodObject<{
                purpose: z.ZodEnum<{
                    cleanup: "cleanup";
                    delegation: "delegation";
                    error_probe: "error_probe";
                    job: "job";
                    sustain_baseline: "sustain_baseline";
                    sustain_control_probe: "sustain_control_probe";
                    sustain_revocation: "sustain_revocation";
                    sustain_revoked_probe: "sustain_revoked_probe";
                    sustain_rotated_probe: "sustain_rotated_probe";
                    sustain_rotation: "sustain_rotation";
                }>;
                role: z.ZodEnum<{
                    request: "request";
                    session_close: "session_close";
                    session_opening: "session_opening";
                    tool_listing: "tool_listing";
                }>;
                method: z.ZodEnum<{
                    DELETE: "DELETE";
                    GET: "GET";
                    HEAD: "HEAD";
                    PATCH: "PATCH";
                    POST: "POST";
                    PUT: "PUT";
                }>;
                url: z.ZodURL;
                started_at: z.ZodISODateTime;
                finished_at: z.ZodISODateTime;
                response: z.ZodNullable<z.ZodObject<{
                    status: z.ZodNumber;
                    media_type: z.ZodString;
                    content_bytes: z.ZodNumber;
                    content_digest: z.ZodString;
                }, z.core.$strict>>;
                transport_error: z.ZodNullable<z.ZodString>;
                exchange_digest: z.ZodString;
            }, z.core.$strict>>;
            assertions: z.ZodArray<z.ZodObject<{
                assertion: z.ZodString;
                holds: z.ZodBoolean;
                failure: z.ZodNullable<z.ZodObject<{
                    check: z.ZodNumber;
                    reason: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>>;
            error_probe: z.ZodNullable<z.ZodObject<{
                typed: z.ZodBoolean;
                reason: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        revision_contract: z.ZodLiteral<"sourcey.agent-readiness-revision/v1alpha1">;
        revision_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        revision_contract: z.ZodLiteral<"sourcey.agent-readiness-declaration-revision/v1alpha1">;
        entity_id: z.ZodString;
        declaration: z.ZodObject<{
            declaration_id: z.ZodString;
            scope: z.ZodObject<{
                product: z.ZodObject<{
                    key: z.ZodString;
                    name: z.ZodString;
                }, z.core.$strict>;
                job: z.ZodObject<{
                    key: z.ZodString;
                    name: z.ZodString;
                }, z.core.$strict>;
            }, z.core.$strict>;
            job_bindings: z.ZodArray<z.ZodObject<{
                binding_id: z.ZodString;
                interface_id: z.ZodString;
                calls: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"http">;
                    call_id: z.ZodString;
                    endpoint_id: z.ZodString;
                    method: z.ZodEnum<{
                        DELETE: "DELETE";
                        GET: "GET";
                        HEAD: "HEAD";
                        PATCH: "PATCH";
                        POST: "POST";
                        PUT: "PUT";
                    }>;
                    url: z.ZodString;
                    headers: z.ZodArray<z.ZodObject<{
                        name: z.ZodString;
                        value: z.ZodString;
                    }, z.core.$strict>>;
                    body: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        media_type: z.ZodLiteral<"application/json">;
                        json: z.ZodJSONSchema;
                    }, z.core.$strict>, z.ZodObject<{
                        media_type: z.ZodLiteral<"application/x-www-form-urlencoded">;
                        form: z.ZodArray<z.ZodObject<{
                            name: z.ZodString;
                            value: z.ZodString;
                        }, z.core.$strict>>;
                    }, z.core.$strict>], "media_type">>;
                    credentials: z.ZodArray<z.ZodString>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"mcp">;
                    call_id: z.ZodString;
                    endpoint_id: z.ZodString;
                    tool: z.ZodString;
                    arguments: z.ZodJSONSchema;
                    credentials: z.ZodArray<z.ZodString>;
                }, z.core.$strict>], "kind">>;
                assertions: z.ZodArray<z.ZodObject<{
                    assertion: z.ZodString;
                    observations: z.ZodArray<z.ZodObject<{
                        name: z.ZodString;
                        call: z.ZodString;
                        source: z.ZodEnum<{
                            json: "json";
                            request: "request";
                            stream: "stream";
                        }>;
                        pointer: z.ZodString;
                    }, z.core.$strict>>;
                }, z.core.$strict>>;
                error_probe: z.ZodObject<{
                    call: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"http">;
                        call_id: z.ZodString;
                        endpoint_id: z.ZodString;
                        method: z.ZodEnum<{
                            DELETE: "DELETE";
                            GET: "GET";
                            HEAD: "HEAD";
                            PATCH: "PATCH";
                            POST: "POST";
                            PUT: "PUT";
                        }>;
                        url: z.ZodString;
                        headers: z.ZodArray<z.ZodObject<{
                            name: z.ZodString;
                            value: z.ZodString;
                        }, z.core.$strict>>;
                        body: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            media_type: z.ZodLiteral<"application/json">;
                            json: z.ZodJSONSchema;
                        }, z.core.$strict>, z.ZodObject<{
                            media_type: z.ZodLiteral<"application/x-www-form-urlencoded">;
                            form: z.ZodArray<z.ZodObject<{
                                name: z.ZodString;
                                value: z.ZodString;
                            }, z.core.$strict>>;
                        }, z.core.$strict>], "media_type">>;
                        credentials: z.ZodArray<z.ZodString>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"mcp">;
                        call_id: z.ZodString;
                        endpoint_id: z.ZodString;
                        tool: z.ZodString;
                        arguments: z.ZodJSONSchema;
                        credentials: z.ZodArray<z.ZodString>;
                    }, z.core.$strict>], "kind">;
                    expect: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"http_error">;
                        status_class: z.ZodLiteral<"4xx">;
                        error_pointer: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"mcp_error">;
                    }, z.core.$strict>], "kind">;
                }, z.core.$strict>;
                delegation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"entered">;
                    credentials: z.ZodArray<z.ZodObject<{
                        role: z.ZodString;
                        placement: z.ZodUnion<readonly [z.ZodObject<{
                            scheme: z.ZodEnum<{
                                basic: "basic";
                                bearer: "bearer";
                            }>;
                            header_name: z.ZodLiteral<"authorization">;
                        }, z.core.$strict>, z.ZodObject<{
                            scheme: z.ZodLiteral<"header">;
                            header_name: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            scheme: z.ZodLiteral<"form">;
                            field: z.ZodString;
                        }, z.core.$strict>]>;
                        endpoint_ids: z.ZodArray<z.ZodString>;
                        methods: z.ZodArray<z.ZodEnum<{
                            DELETE: "DELETE";
                            GET: "GET";
                            HEAD: "HEAD";
                            PATCH: "PATCH";
                            POST: "POST";
                            PUT: "PUT";
                        }>>;
                    }, z.core.$strict>>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"oauth">;
                    authorization_endpoint_id: z.ZodString;
                    token_endpoint_id: z.ZodString;
                    client: z.ZodEnum<{
                        client_id_metadata_document: "client_id_metadata_document";
                        dynamic_registration: "dynamic_registration";
                        preregistered: "preregistered";
                    }>;
                    scopes: z.ZodArray<z.ZodString>;
                    keep: z.ZodArray<z.ZodObject<{
                        role: z.ZodString;
                        placement: z.ZodUnion<readonly [z.ZodObject<{
                            scheme: z.ZodEnum<{
                                basic: "basic";
                                bearer: "bearer";
                            }>;
                            header_name: z.ZodLiteral<"authorization">;
                        }, z.core.$strict>, z.ZodObject<{
                            scheme: z.ZodLiteral<"header">;
                            header_name: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            scheme: z.ZodLiteral<"form">;
                            field: z.ZodString;
                        }, z.core.$strict>]>;
                        endpoint_ids: z.ZodArray<z.ZodString>;
                        methods: z.ZodArray<z.ZodEnum<{
                            DELETE: "DELETE";
                            GET: "GET";
                            HEAD: "HEAD";
                            PATCH: "PATCH";
                            POST: "POST";
                            PUT: "PUT";
                        }>>;
                        pointer: z.ZodString;
                        expires_in_pointer: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>;
                }, z.core.$strict>, z.ZodObject<{
                    call: z.ZodObject<{
                        kind: z.ZodLiteral<"http">;
                        call_id: z.ZodString;
                        endpoint_id: z.ZodString;
                        method: z.ZodEnum<{
                            DELETE: "DELETE";
                            GET: "GET";
                            HEAD: "HEAD";
                            PATCH: "PATCH";
                            POST: "POST";
                            PUT: "PUT";
                        }>;
                        url: z.ZodString;
                        headers: z.ZodArray<z.ZodObject<{
                            name: z.ZodString;
                            value: z.ZodString;
                        }, z.core.$strict>>;
                        body: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            media_type: z.ZodLiteral<"application/json">;
                            json: z.ZodJSONSchema;
                        }, z.core.$strict>, z.ZodObject<{
                            media_type: z.ZodLiteral<"application/x-www-form-urlencoded">;
                            form: z.ZodArray<z.ZodObject<{
                                name: z.ZodString;
                                value: z.ZodString;
                            }, z.core.$strict>>;
                        }, z.core.$strict>], "media_type">>;
                        credentials: z.ZodArray<z.ZodString>;
                    }, z.core.$strict>;
                    keep: z.ZodArray<z.ZodObject<{
                        role: z.ZodString;
                        placement: z.ZodUnion<readonly [z.ZodObject<{
                            scheme: z.ZodEnum<{
                                basic: "basic";
                                bearer: "bearer";
                            }>;
                            header_name: z.ZodLiteral<"authorization">;
                        }, z.core.$strict>, z.ZodObject<{
                            scheme: z.ZodLiteral<"header">;
                            header_name: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            scheme: z.ZodLiteral<"form">;
                            field: z.ZodString;
                        }, z.core.$strict>]>;
                        endpoint_ids: z.ZodArray<z.ZodString>;
                        methods: z.ZodArray<z.ZodEnum<{
                            DELETE: "DELETE";
                            GET: "GET";
                            HEAD: "HEAD";
                            PATCH: "PATCH";
                            POST: "POST";
                            PUT: "PUT";
                        }>>;
                        pointer: z.ZodString;
                        expires_in_pointer: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>;
                    kind: z.ZodLiteral<"minted">;
                    from: z.ZodObject<{
                        role: z.ZodString;
                        placement: z.ZodUnion<readonly [z.ZodObject<{
                            scheme: z.ZodEnum<{
                                basic: "basic";
                                bearer: "bearer";
                            }>;
                            header_name: z.ZodLiteral<"authorization">;
                        }, z.core.$strict>, z.ZodObject<{
                            scheme: z.ZodLiteral<"header">;
                            header_name: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            scheme: z.ZodLiteral<"form">;
                            field: z.ZodString;
                        }, z.core.$strict>]>;
                        endpoint_ids: z.ZodArray<z.ZodString>;
                        methods: z.ZodArray<z.ZodEnum<{
                            DELETE: "DELETE";
                            GET: "GET";
                            HEAD: "HEAD";
                            PATCH: "PATCH";
                            POST: "POST";
                            PUT: "PUT";
                        }>>;
                    }, z.core.$strict>;
                }, z.core.$strict>], "kind">;
                payment: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"prepaid_balance">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"per_call">;
                    protocol: z.ZodEnum<{
                        mpp: "mpp";
                        x402: "x402";
                    }>;
                }, z.core.$strict>], "kind">;
                sustain: z.ZodObject<{
                    rotation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"not_applicable">;
                    }, z.core.$strict>, z.ZodObject<{
                        call: z.ZodObject<{
                            kind: z.ZodLiteral<"http">;
                            call_id: z.ZodString;
                            endpoint_id: z.ZodString;
                            method: z.ZodEnum<{
                                DELETE: "DELETE";
                                GET: "GET";
                                HEAD: "HEAD";
                                PATCH: "PATCH";
                                POST: "POST";
                                PUT: "PUT";
                            }>;
                            url: z.ZodString;
                            headers: z.ZodArray<z.ZodObject<{
                                name: z.ZodString;
                                value: z.ZodString;
                            }, z.core.$strict>>;
                            body: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
                                media_type: z.ZodLiteral<"application/json">;
                                json: z.ZodJSONSchema;
                            }, z.core.$strict>, z.ZodObject<{
                                media_type: z.ZodLiteral<"application/x-www-form-urlencoded">;
                                form: z.ZodArray<z.ZodObject<{
                                    name: z.ZodString;
                                    value: z.ZodString;
                                }, z.core.$strict>>;
                            }, z.core.$strict>], "media_type">>;
                            credentials: z.ZodArray<z.ZodString>;
                        }, z.core.$strict>;
                        keep: z.ZodArray<z.ZodObject<{
                            role: z.ZodString;
                            placement: z.ZodUnion<readonly [z.ZodObject<{
                                scheme: z.ZodEnum<{
                                    basic: "basic";
                                    bearer: "bearer";
                                }>;
                                header_name: z.ZodLiteral<"authorization">;
                            }, z.core.$strict>, z.ZodObject<{
                                scheme: z.ZodLiteral<"header">;
                                header_name: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                scheme: z.ZodLiteral<"form">;
                                field: z.ZodString;
                            }, z.core.$strict>]>;
                            endpoint_ids: z.ZodArray<z.ZodString>;
                            methods: z.ZodArray<z.ZodEnum<{
                                DELETE: "DELETE";
                                GET: "GET";
                                HEAD: "HEAD";
                                PATCH: "PATCH";
                                POST: "POST";
                                PUT: "PUT";
                            }>>;
                            pointer: z.ZodString;
                            expires_in_pointer: z.ZodOptional<z.ZodString>;
                        }, z.core.$strict>>;
                        kind: z.ZodLiteral<"refresh">;
                    }, z.core.$strict>, z.ZodObject<{
                        call: z.ZodObject<{
                            kind: z.ZodLiteral<"http">;
                            call_id: z.ZodString;
                            endpoint_id: z.ZodString;
                            method: z.ZodEnum<{
                                DELETE: "DELETE";
                                GET: "GET";
                                HEAD: "HEAD";
                                PATCH: "PATCH";
                                POST: "POST";
                                PUT: "PUT";
                            }>;
                            url: z.ZodString;
                            headers: z.ZodArray<z.ZodObject<{
                                name: z.ZodString;
                                value: z.ZodString;
                            }, z.core.$strict>>;
                            body: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
                                media_type: z.ZodLiteral<"application/json">;
                                json: z.ZodJSONSchema;
                            }, z.core.$strict>, z.ZodObject<{
                                media_type: z.ZodLiteral<"application/x-www-form-urlencoded">;
                                form: z.ZodArray<z.ZodObject<{
                                    name: z.ZodString;
                                    value: z.ZodString;
                                }, z.core.$strict>>;
                            }, z.core.$strict>], "media_type">>;
                            credentials: z.ZodArray<z.ZodString>;
                        }, z.core.$strict>;
                        keep: z.ZodArray<z.ZodObject<{
                            role: z.ZodString;
                            placement: z.ZodUnion<readonly [z.ZodObject<{
                                scheme: z.ZodEnum<{
                                    basic: "basic";
                                    bearer: "bearer";
                                }>;
                                header_name: z.ZodLiteral<"authorization">;
                            }, z.core.$strict>, z.ZodObject<{
                                scheme: z.ZodLiteral<"header">;
                                header_name: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                scheme: z.ZodLiteral<"form">;
                                field: z.ZodString;
                            }, z.core.$strict>]>;
                            endpoint_ids: z.ZodArray<z.ZodString>;
                            methods: z.ZodArray<z.ZodEnum<{
                                DELETE: "DELETE";
                                GET: "GET";
                                HEAD: "HEAD";
                                PATCH: "PATCH";
                                POST: "POST";
                                PUT: "PUT";
                            }>>;
                            pointer: z.ZodString;
                            expires_in_pointer: z.ZodOptional<z.ZodString>;
                        }, z.core.$strict>>;
                        kind: z.ZodLiteral<"mint">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"manual">;
                    }, z.core.$strict>], "kind">;
                    revocation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"not_applicable">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"call">;
                        call: z.ZodObject<{
                            kind: z.ZodLiteral<"http">;
                            call_id: z.ZodString;
                            endpoint_id: z.ZodString;
                            method: z.ZodEnum<{
                                DELETE: "DELETE";
                                GET: "GET";
                                HEAD: "HEAD";
                                PATCH: "PATCH";
                                POST: "POST";
                                PUT: "PUT";
                            }>;
                            url: z.ZodString;
                            headers: z.ZodArray<z.ZodObject<{
                                name: z.ZodString;
                                value: z.ZodString;
                            }, z.core.$strict>>;
                            body: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
                                media_type: z.ZodLiteral<"application/json">;
                                json: z.ZodJSONSchema;
                            }, z.core.$strict>, z.ZodObject<{
                                media_type: z.ZodLiteral<"application/x-www-form-urlencoded">;
                                form: z.ZodArray<z.ZodObject<{
                                    name: z.ZodString;
                                    value: z.ZodString;
                                }, z.core.$strict>>;
                            }, z.core.$strict>], "media_type">>;
                            credentials: z.ZodArray<z.ZodString>;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"manual">;
                    }, z.core.$strict>], "kind">;
                    verification: z.ZodOptional<z.ZodObject<{
                        probe: z.ZodObject<{
                            kind: z.ZodLiteral<"http">;
                            call_id: z.ZodString;
                            endpoint_id: z.ZodString;
                            url: z.ZodString;
                            headers: z.ZodArray<z.ZodObject<{
                                name: z.ZodString;
                                value: z.ZodString;
                            }, z.core.$strict>>;
                            method: z.ZodLiteral<"GET">;
                            body: z.ZodNull;
                            credentials: z.ZodArray<z.ZodString>;
                        }, z.core.$strict>;
                        control: z.ZodObject<{
                            kind: z.ZodLiteral<"http">;
                            call_id: z.ZodString;
                            endpoint_id: z.ZodString;
                            url: z.ZodString;
                            headers: z.ZodArray<z.ZodObject<{
                                name: z.ZodString;
                                value: z.ZodString;
                            }, z.core.$strict>>;
                            method: z.ZodLiteral<"GET">;
                            body: z.ZodNull;
                            credentials: z.ZodArray<z.ZodString>;
                        }, z.core.$strict>;
                    }, z.core.$strict>>;
                }, z.core.$strict>;
                cleanup: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"http">;
                    call_id: z.ZodString;
                    endpoint_id: z.ZodString;
                    method: z.ZodEnum<{
                        DELETE: "DELETE";
                        GET: "GET";
                        HEAD: "HEAD";
                        PATCH: "PATCH";
                        POST: "POST";
                        PUT: "PUT";
                    }>;
                    url: z.ZodString;
                    headers: z.ZodArray<z.ZodObject<{
                        name: z.ZodString;
                        value: z.ZodString;
                    }, z.core.$strict>>;
                    body: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        media_type: z.ZodLiteral<"application/json">;
                        json: z.ZodJSONSchema;
                    }, z.core.$strict>, z.ZodObject<{
                        media_type: z.ZodLiteral<"application/x-www-form-urlencoded">;
                        form: z.ZodArray<z.ZodObject<{
                            name: z.ZodString;
                            value: z.ZodString;
                        }, z.core.$strict>>;
                    }, z.core.$strict>], "media_type">>;
                    credentials: z.ZodArray<z.ZodString>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"mcp">;
                    call_id: z.ZodString;
                    endpoint_id: z.ZodString;
                    tool: z.ZodString;
                    arguments: z.ZodJSONSchema;
                    credentials: z.ZodArray<z.ZodString>;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>>;
            participants: z.ZodArray<z.ZodObject<{
                participant_id: z.ZodString;
                roles: z.ZodArray<z.ZodEnum<{
                    access_operator: "access_operator";
                    identity_provider: "identity_provider";
                    operations_provider: "operations_provider";
                    payment_provider: "payment_provider";
                    provisioning_provider: "provisioning_provider";
                    subject: "subject";
                }>>;
                identity: z.ZodUnion<readonly [z.ZodObject<{
                    entity_id: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    origin_source_id: z.ZodString;
                }, z.core.$strict>]>;
            }, z.core.$strict>>;
            resources: z.ZodArray<z.ZodObject<{
                resource_id: z.ZodString;
                uri: z.ZodURL;
                roles: z.ZodArray<z.ZodEnum<{
                    access: "access";
                    authentication: "authentication";
                    checkout: "checkout";
                    descriptor: "descriptor";
                    discovery: "discovery";
                    documentation: "documentation";
                    eligibility: "eligibility";
                    operations: "operations";
                    policy: "policy";
                    pricing: "pricing";
                    provisioning: "provisioning";
                    recovery: "recovery";
                    status: "status";
                    terms: "terms";
                }>>;
                operated_by_participant_id: z.ZodString;
                standard_bindings: z.ZodArray<z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                    relation: z.ZodEnum<{
                        declares: "declares";
                        describes: "describes";
                        implements: "implements";
                        uses: "uses";
                    }>;
                }, z.core.$strict>>;
                allowed_redirect_hosts: z.ZodOptional<z.ZodArray<z.ZodString>>;
            }, z.core.$strict>>;
            endpoints: z.ZodArray<z.ZodObject<{
                endpoint_id: z.ZodString;
                uri: z.ZodURL;
                transport: z.ZodEnum<{
                    grpc: "grpc";
                    http: "http";
                    websocket: "websocket";
                }>;
                roles: z.ZodArray<z.ZodEnum<{
                    authorization: "authorization";
                    checkout: "checkout";
                    protected_resource: "protected_resource";
                    recovery: "recovery";
                    registration: "registration";
                    service: "service";
                    status: "status";
                    token: "token";
                    webhook: "webhook";
                }>>;
                operated_by_participant_id: z.ZodString;
                standard_bindings: z.ZodArray<z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                    relation: z.ZodEnum<{
                        declares: "declares";
                        describes: "describes";
                        implements: "implements";
                        uses: "uses";
                    }>;
                }, z.core.$strict>>;
                allowed_redirect_hosts: z.ZodOptional<z.ZodArray<z.ZodString>>;
            }, z.core.$strict>>;
            interfaces: z.ZodArray<z.ZodObject<{
                interface_id: z.ZodString;
                modality: z.ZodEnum<{
                    agent_service: "agent_service";
                    command_line: "command_line";
                    network_api: "network_api";
                    software_library: "software_library";
                    tool_server: "tool_server";
                    web_application: "web_application";
                }>;
                functions: z.ZodArray<z.ZodEnum<{
                    authentication: "authentication";
                    commerce: "commerce";
                    events: "events";
                    recovery: "recovery";
                    service_operation: "service_operation";
                }>>;
                endpoint_ids: z.ZodArray<z.ZodString>;
                resource_ids: z.ZodArray<z.ZodString>;
                operated_by_participant_id: z.ZodString;
                standard_bindings: z.ZodArray<z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                    relation: z.ZodEnum<{
                        declares: "declares";
                        describes: "describes";
                        implements: "implements";
                        uses: "uses";
                    }>;
                }, z.core.$strict>>;
            }, z.core.$strict>>;
            relations: z.ZodArray<z.ZodObject<{
                relation_id: z.ZodString;
                kind: z.ZodEnum<{
                    alternative_to: "alternative_to";
                    authenticates: "authenticates";
                    describes: "describes";
                    precedes: "precedes";
                    requires: "requires";
                }>;
                from: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        endpoint: "endpoint";
                        interface: "interface";
                        resource: "resource";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>;
                to: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        endpoint: "endpoint";
                        interface: "interface";
                        resource: "resource";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>;
            }, z.core.$strict>>;
            surface_exclusions: z.ZodArray<z.ZodObject<{
                exclusion_id: z.ZodString;
                role: z.ZodEnum<{
                    access: "access";
                    authentication: "authentication";
                    checkout: "checkout";
                    descriptor: "descriptor";
                    discovery: "discovery";
                    documentation: "documentation";
                    eligibility: "eligibility";
                    operations: "operations";
                    policy: "policy";
                    pricing: "pricing";
                    provisioning: "provisioning";
                    recovery: "recovery";
                    status: "status";
                    terms: "terms";
                }>;
                rationale: z.ZodString;
            }, z.core.$strict>>;
            authority_intent: z.ZodEnum<{
                community: "community";
                entity: "entity";
            }>;
            declared_at: z.ZodISODateTime;
            source_bindings: z.ZodArray<z.ZodObject<{
                source_binding_id: z.ZodString;
                source_id: z.ZodString;
                field_paths: z.ZodArray<z.ZodString>;
                target: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        declaration: "declaration";
                        endpoint: "endpoint";
                        interface: "interface";
                        job_binding: "job_binding";
                        participant: "participant";
                        relation: "relation";
                        resource: "resource";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        sources: z.ZodArray<z.ZodObject<{
            source_id: z.ZodString;
            url: z.ZodURL;
        }, z.core.$strict>>;
        revision_digest: z.ZodString;
    }, z.core.$strict>]>;
}, z.core.$strict>;
export declare const eventResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodUnion<[z.ZodObject<{
        event_contract: z.ZodLiteral<"sourcey.catalog-event/v1alpha1">;
        kind: z.ZodLiteral<string>;
        issuer_id: z.ZodString;
        operation_id: z.ZodString;
        subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
            subject_type: z.ZodLiteral<"entity">;
            entity_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"agent_readiness_profile">;
            entity_id: z.ZodString;
            agent_readiness_profile_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"program">;
            entity_id: z.ZodString;
            program_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"offer">;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>], "subject_type">;
        occurred_at: z.ZodISODateTime;
        payload: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
        }, z.core.$strict>], "assurance_kind"> | z.ZodObject<{
            observation_id: z.ZodString;
            capture_attestation_digest: z.ZodOptional<z.ZodString>;
            review_decision: z.ZodOptional<z.ZodObject<{
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
            }, z.core.$strict>>;
            capture_receipt_digest: z.ZodOptional<z.ZodString>;
            normalized_object_digest: z.ZodString;
            authority_entity_revision_digest: z.ZodString;
            authority_program_revision_digest: z.ZodNullable<z.ZodString>;
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
            paths: z.ZodArray<z.ZodString>;
            polarity: z.ZodEnum<{
                contradicts: "contradicts";
                supports: "supports";
            }>;
            binding_method: z.ZodString;
            binding_version: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            reason_code: z.ZodString;
            adjudication_evidence_digest: z.ZodString;
            replacement_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            conflicting_event_ids: z.ZodArray<z.ZodString>;
            outcome: z.ZodEnum<{
                "both-invalid": "both-invalid";
                "contradiction-prevails": "contradiction-prevails";
                "new-revision-required": "new-revision-required";
                "support-prevails": "support-prevails";
            }>;
            active_event_ids: z.ZodArray<z.ZodString>;
            replacement_revision_digest: z.ZodOptional<z.ZodString>;
            evidence_digests: z.ZodArray<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            authorized_issuer_id: z.ZodString;
            controlled_domain: z.ZodString;
            method: z.ZodString;
            proof_digest: z.ZodString;
            proven_at: z.ZodISODateTime;
            recheck_due_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            checked_at: z.ZodISODateTime;
            next_recheck_due_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            revoked_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            old_authority_claim_id: z.ZodString;
            new_authority_claim_id: z.ZodString;
            superseded_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            attested_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            authority_claim_id: z.ZodString;
            revoked_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            verification_id: z.ZodString;
            verifier_id: z.ZodString;
            method_version: z.ZodString;
            scope: z.ZodLiteral<"whole-revision">;
            result: z.ZodLiteral<"pass">;
            checked_at: z.ZodISODateTime;
            verified_paths: z.ZodArray<z.ZodString>;
            coverage_policy_digest: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            assurance_id: z.ZodString;
            reviewer_id: z.ZodString;
            method_policy_digest: z.ZodString;
            receipt_digest: z.ZodString;
            checked_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            coverage_paths: z.ZodArray<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            assurance_id: z.ZodString;
            reviewer_id: z.ZodString;
            method_policy_digest: z.ZodString;
            receipt_digest: z.ZodString;
            checked_at: z.ZodISODateTime;
            coverage_policy_digest: z.ZodString;
            coverage_paths: z.ZodArray<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            paths: z.ZodArray<z.ZodString>;
            valid_until: z.ZodISODateTime;
            reason_code: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            revoked_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            dispute_id: z.ZodString;
            opened_at: z.ZodISODateTime;
            public_reason_code: z.ZodString;
            case_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            dispute_id: z.ZodString;
            opened_event_id: z.ZodString;
            resolved_at: z.ZodISODateTime;
            resolution_code: z.ZodString;
            case_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            role: z.ZodEnum<{
                icon: "icon";
                "logo-dark": "logo-dark";
                "logo-light": "logo-light";
            }>;
            asset_object_digest: z.ZodString;
            served_derivative_digest: z.ZodString;
            authority_basis: z.ZodEnum<{
                "editorial-review": "editorial-review";
                "licensed-source": "licensed-source";
                "sourcey-owned": "sourcey-owned";
                "vendor-authority": "vendor-authority";
            }>;
            authority_claim_id: z.ZodOptional<z.ZodString>;
            approval_receipt_digest: z.ZodString;
            approval_scope: z.ZodString;
            source_basis: z.ZodString;
            license_basis: z.ZodString;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            superseded_binding_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            target_binding_event_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_binding_event_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            public_reason_code: z.ZodString;
            case_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_entity_id: z.ZodString;
            retired_entity_ids: z.ZodArray<z.ZodString>;
            disposition: z.ZodObject<{
                aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_program_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_offer_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    agent_readiness_profile_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    binding_event_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        rebind: "rebind";
                    }>;
                    replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
            }, z.core.$strict>;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            original_entity_id: z.ZodString;
            continuing_entity_id: z.ZodOptional<z.ZodString>;
            new_entity_ids: z.ZodArray<z.ZodString>;
            disposition: z.ZodObject<{
                aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_program_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_offer_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    agent_readiness_profile_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    binding_event_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        rebind: "rebind";
                    }>;
                    replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
            }, z.core.$strict>;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            predecessor_entity_id: z.ZodString;
            successor_entity_id: z.ZodString;
            relationship_code: z.ZodString;
            predecessor_retires: z.ZodBoolean;
            disposition: z.ZodOptional<z.ZodObject<{
                aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_program_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_offer_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    agent_readiness_profile_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    binding_event_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        rebind: "rebind";
                    }>;
                    replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
            }, z.core.$strict>>;
            effective_at: z.ZodISODateTime;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_offer_id: z.ZodString;
            retired_offer_ids: z.ZodArray<z.ZodString>;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_program_id: z.ZodString;
            retired_program_ids: z.ZodArray<z.ZodString>;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            program_id: z.ZodString;
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            continuity_evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            offer_id: z.ZodString;
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            continuity_evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_agent_readiness_profile_id: z.ZodString;
            retired_agent_readiness_profile_ids: z.ZodArray<z.ZodString>;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            continuity_evidence_digest: z.ZodString;
            reason: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            agent_readiness_profile_id: z.ZodString;
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            continuity_evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            input_digest: z.ZodString;
            relation_input_digests: z.ZodArray<z.ZodString>;
            policy_digest: z.ZodString;
            engine_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            agent_readiness_profile_id: z.ZodString;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            replacement_event_ids: z.ZodArray<z.ZodString>;
            corrected_at: z.ZodISODateTime;
            reason: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            offer_id: z.ZodString;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            program_id: z.ZodString;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict>;
        event_id: z.ZodString;
        protected: z.ZodObject<{
            signature_purpose: z.ZodEnum<{
                "catalog-attestation": "catalog-attestation";
                "catalog-authority": "catalog-authority";
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
    }, z.core.$strict>, z.ZodObject<{
        event_contract: z.ZodLiteral<"sourcey.catalog-event/v1alpha1">;
        kind: z.ZodLiteral<string>;
        issuer_id: z.ZodString;
        operation_id: z.ZodString;
        subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
            subject_type: z.ZodLiteral<"entity">;
            entity_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"agent_readiness_profile">;
            entity_id: z.ZodString;
            agent_readiness_profile_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"program">;
            entity_id: z.ZodString;
            program_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"offer">;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>], "subject_type">;
        occurred_at: z.ZodISODateTime;
        payload: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
        }, z.core.$strict>], "assurance_kind"> | z.ZodObject<{
            observation_id: z.ZodString;
            capture_attestation_digest: z.ZodOptional<z.ZodString>;
            review_decision: z.ZodOptional<z.ZodObject<{
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
            }, z.core.$strict>>;
            capture_receipt_digest: z.ZodOptional<z.ZodString>;
            normalized_object_digest: z.ZodString;
            authority_entity_revision_digest: z.ZodString;
            authority_program_revision_digest: z.ZodNullable<z.ZodString>;
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
            paths: z.ZodArray<z.ZodString>;
            polarity: z.ZodEnum<{
                contradicts: "contradicts";
                supports: "supports";
            }>;
            binding_method: z.ZodString;
            binding_version: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            reason_code: z.ZodString;
            adjudication_evidence_digest: z.ZodString;
            replacement_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            conflicting_event_ids: z.ZodArray<z.ZodString>;
            outcome: z.ZodEnum<{
                "both-invalid": "both-invalid";
                "contradiction-prevails": "contradiction-prevails";
                "new-revision-required": "new-revision-required";
                "support-prevails": "support-prevails";
            }>;
            active_event_ids: z.ZodArray<z.ZodString>;
            replacement_revision_digest: z.ZodOptional<z.ZodString>;
            evidence_digests: z.ZodArray<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            authorized_issuer_id: z.ZodString;
            controlled_domain: z.ZodString;
            method: z.ZodString;
            proof_digest: z.ZodString;
            proven_at: z.ZodISODateTime;
            recheck_due_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            checked_at: z.ZodISODateTime;
            next_recheck_due_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            revoked_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            old_authority_claim_id: z.ZodString;
            new_authority_claim_id: z.ZodString;
            superseded_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            attested_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            authority_claim_id: z.ZodString;
            revoked_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            verification_id: z.ZodString;
            verifier_id: z.ZodString;
            method_version: z.ZodString;
            scope: z.ZodLiteral<"whole-revision">;
            result: z.ZodLiteral<"pass">;
            checked_at: z.ZodISODateTime;
            verified_paths: z.ZodArray<z.ZodString>;
            coverage_policy_digest: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            assurance_id: z.ZodString;
            reviewer_id: z.ZodString;
            method_policy_digest: z.ZodString;
            receipt_digest: z.ZodString;
            checked_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            coverage_paths: z.ZodArray<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            assurance_id: z.ZodString;
            reviewer_id: z.ZodString;
            method_policy_digest: z.ZodString;
            receipt_digest: z.ZodString;
            checked_at: z.ZodISODateTime;
            coverage_policy_digest: z.ZodString;
            coverage_paths: z.ZodArray<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            paths: z.ZodArray<z.ZodString>;
            valid_until: z.ZodISODateTime;
            reason_code: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            revoked_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            dispute_id: z.ZodString;
            opened_at: z.ZodISODateTime;
            public_reason_code: z.ZodString;
            case_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            dispute_id: z.ZodString;
            opened_event_id: z.ZodString;
            resolved_at: z.ZodISODateTime;
            resolution_code: z.ZodString;
            case_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            role: z.ZodEnum<{
                icon: "icon";
                "logo-dark": "logo-dark";
                "logo-light": "logo-light";
            }>;
            asset_object_digest: z.ZodString;
            served_derivative_digest: z.ZodString;
            authority_basis: z.ZodEnum<{
                "editorial-review": "editorial-review";
                "licensed-source": "licensed-source";
                "sourcey-owned": "sourcey-owned";
                "vendor-authority": "vendor-authority";
            }>;
            authority_claim_id: z.ZodOptional<z.ZodString>;
            approval_receipt_digest: z.ZodString;
            approval_scope: z.ZodString;
            source_basis: z.ZodString;
            license_basis: z.ZodString;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            superseded_binding_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            target_binding_event_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_binding_event_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            public_reason_code: z.ZodString;
            case_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_entity_id: z.ZodString;
            retired_entity_ids: z.ZodArray<z.ZodString>;
            disposition: z.ZodObject<{
                aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_program_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_offer_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    agent_readiness_profile_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    binding_event_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        rebind: "rebind";
                    }>;
                    replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
            }, z.core.$strict>;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            original_entity_id: z.ZodString;
            continuing_entity_id: z.ZodOptional<z.ZodString>;
            new_entity_ids: z.ZodArray<z.ZodString>;
            disposition: z.ZodObject<{
                aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_program_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_offer_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    agent_readiness_profile_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    binding_event_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        rebind: "rebind";
                    }>;
                    replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
            }, z.core.$strict>;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            predecessor_entity_id: z.ZodString;
            successor_entity_id: z.ZodString;
            relationship_code: z.ZodString;
            predecessor_retires: z.ZodBoolean;
            disposition: z.ZodOptional<z.ZodObject<{
                aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_program_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_offer_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    agent_readiness_profile_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    binding_event_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        rebind: "rebind";
                    }>;
                    replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
            }, z.core.$strict>>;
            effective_at: z.ZodISODateTime;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_offer_id: z.ZodString;
            retired_offer_ids: z.ZodArray<z.ZodString>;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_program_id: z.ZodString;
            retired_program_ids: z.ZodArray<z.ZodString>;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            program_id: z.ZodString;
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            continuity_evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            offer_id: z.ZodString;
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            continuity_evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_agent_readiness_profile_id: z.ZodString;
            retired_agent_readiness_profile_ids: z.ZodArray<z.ZodString>;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            continuity_evidence_digest: z.ZodString;
            reason: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            agent_readiness_profile_id: z.ZodString;
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            continuity_evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            input_digest: z.ZodString;
            relation_input_digests: z.ZodArray<z.ZodString>;
            policy_digest: z.ZodString;
            engine_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            agent_readiness_profile_id: z.ZodString;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            replacement_event_ids: z.ZodArray<z.ZodString>;
            corrected_at: z.ZodISODateTime;
            reason: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            offer_id: z.ZodString;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            program_id: z.ZodString;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict>;
        event_id: z.ZodString;
        protected: z.ZodObject<{
            signature_purpose: z.ZodEnum<{
                "catalog-attestation": "catalog-attestation";
                "catalog-authority": "catalog-authority";
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
    }, z.core.$strict>, ...z.ZodObject<{
        event_contract: z.ZodLiteral<"sourcey.catalog-event/v1alpha1">;
        kind: z.ZodLiteral<string>;
        issuer_id: z.ZodString;
        operation_id: z.ZodString;
        subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
            subject_type: z.ZodLiteral<"entity">;
            entity_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"agent_readiness_profile">;
            entity_id: z.ZodString;
            agent_readiness_profile_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"program">;
            entity_id: z.ZodString;
            program_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"offer">;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>], "subject_type">;
        occurred_at: z.ZodISODateTime;
        payload: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
        }, z.core.$strict>], "assurance_kind"> | z.ZodObject<{
            observation_id: z.ZodString;
            capture_attestation_digest: z.ZodOptional<z.ZodString>;
            review_decision: z.ZodOptional<z.ZodObject<{
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
            }, z.core.$strict>>;
            capture_receipt_digest: z.ZodOptional<z.ZodString>;
            normalized_object_digest: z.ZodString;
            authority_entity_revision_digest: z.ZodString;
            authority_program_revision_digest: z.ZodNullable<z.ZodString>;
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
            paths: z.ZodArray<z.ZodString>;
            polarity: z.ZodEnum<{
                contradicts: "contradicts";
                supports: "supports";
            }>;
            binding_method: z.ZodString;
            binding_version: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            reason_code: z.ZodString;
            adjudication_evidence_digest: z.ZodString;
            replacement_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            conflicting_event_ids: z.ZodArray<z.ZodString>;
            outcome: z.ZodEnum<{
                "both-invalid": "both-invalid";
                "contradiction-prevails": "contradiction-prevails";
                "new-revision-required": "new-revision-required";
                "support-prevails": "support-prevails";
            }>;
            active_event_ids: z.ZodArray<z.ZodString>;
            replacement_revision_digest: z.ZodOptional<z.ZodString>;
            evidence_digests: z.ZodArray<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            authorized_issuer_id: z.ZodString;
            controlled_domain: z.ZodString;
            method: z.ZodString;
            proof_digest: z.ZodString;
            proven_at: z.ZodISODateTime;
            recheck_due_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            checked_at: z.ZodISODateTime;
            next_recheck_due_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            revoked_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            old_authority_claim_id: z.ZodString;
            new_authority_claim_id: z.ZodString;
            superseded_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            attested_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            authority_claim_id: z.ZodString;
            revoked_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            verification_id: z.ZodString;
            verifier_id: z.ZodString;
            method_version: z.ZodString;
            scope: z.ZodLiteral<"whole-revision">;
            result: z.ZodLiteral<"pass">;
            checked_at: z.ZodISODateTime;
            verified_paths: z.ZodArray<z.ZodString>;
            coverage_policy_digest: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            assurance_id: z.ZodString;
            reviewer_id: z.ZodString;
            method_policy_digest: z.ZodString;
            receipt_digest: z.ZodString;
            checked_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            coverage_paths: z.ZodArray<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            assurance_id: z.ZodString;
            reviewer_id: z.ZodString;
            method_policy_digest: z.ZodString;
            receipt_digest: z.ZodString;
            checked_at: z.ZodISODateTime;
            coverage_policy_digest: z.ZodString;
            coverage_paths: z.ZodArray<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            paths: z.ZodArray<z.ZodString>;
            valid_until: z.ZodISODateTime;
            reason_code: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            revoked_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            dispute_id: z.ZodString;
            opened_at: z.ZodISODateTime;
            public_reason_code: z.ZodString;
            case_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            dispute_id: z.ZodString;
            opened_event_id: z.ZodString;
            resolved_at: z.ZodISODateTime;
            resolution_code: z.ZodString;
            case_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            role: z.ZodEnum<{
                icon: "icon";
                "logo-dark": "logo-dark";
                "logo-light": "logo-light";
            }>;
            asset_object_digest: z.ZodString;
            served_derivative_digest: z.ZodString;
            authority_basis: z.ZodEnum<{
                "editorial-review": "editorial-review";
                "licensed-source": "licensed-source";
                "sourcey-owned": "sourcey-owned";
                "vendor-authority": "vendor-authority";
            }>;
            authority_claim_id: z.ZodOptional<z.ZodString>;
            approval_receipt_digest: z.ZodString;
            approval_scope: z.ZodString;
            source_basis: z.ZodString;
            license_basis: z.ZodString;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            superseded_binding_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            target_binding_event_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_binding_event_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            public_reason_code: z.ZodString;
            case_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_entity_id: z.ZodString;
            retired_entity_ids: z.ZodArray<z.ZodString>;
            disposition: z.ZodObject<{
                aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_program_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_offer_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    agent_readiness_profile_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    binding_event_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        rebind: "rebind";
                    }>;
                    replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
            }, z.core.$strict>;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            original_entity_id: z.ZodString;
            continuing_entity_id: z.ZodOptional<z.ZodString>;
            new_entity_ids: z.ZodArray<z.ZodString>;
            disposition: z.ZodObject<{
                aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_program_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_offer_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    agent_readiness_profile_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    binding_event_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        rebind: "rebind";
                    }>;
                    replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
            }, z.core.$strict>;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            predecessor_entity_id: z.ZodString;
            successor_entity_id: z.ZodString;
            relationship_code: z.ZodString;
            predecessor_retires: z.ZodBoolean;
            disposition: z.ZodOptional<z.ZodObject<{
                aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_program_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_offer_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    agent_readiness_profile_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    binding_event_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        rebind: "rebind";
                    }>;
                    replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
            }, z.core.$strict>>;
            effective_at: z.ZodISODateTime;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_offer_id: z.ZodString;
            retired_offer_ids: z.ZodArray<z.ZodString>;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_program_id: z.ZodString;
            retired_program_ids: z.ZodArray<z.ZodString>;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            program_id: z.ZodString;
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            continuity_evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            offer_id: z.ZodString;
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            continuity_evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_agent_readiness_profile_id: z.ZodString;
            retired_agent_readiness_profile_ids: z.ZodArray<z.ZodString>;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            continuity_evidence_digest: z.ZodString;
            reason: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            agent_readiness_profile_id: z.ZodString;
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            continuity_evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            input_digest: z.ZodString;
            relation_input_digests: z.ZodArray<z.ZodString>;
            policy_digest: z.ZodString;
            engine_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            agent_readiness_profile_id: z.ZodString;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            replacement_event_ids: z.ZodArray<z.ZodString>;
            corrected_at: z.ZodISODateTime;
            reason: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            offer_id: z.ZodString;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            program_id: z.ZodString;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict>;
        event_id: z.ZodString;
        protected: z.ZodObject<{
            signature_purpose: z.ZodEnum<{
                "catalog-attestation": "catalog-attestation";
                "catalog-authority": "catalog-authority";
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
    }, z.core.$strict>[]]>;
}, z.core.$strict>;
export declare const eventListResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        event_contract: z.ZodLiteral<"sourcey.catalog-event/v1alpha1">;
        kind: z.ZodLiteral<string>;
        issuer_id: z.ZodString;
        operation_id: z.ZodString;
        subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
            subject_type: z.ZodLiteral<"entity">;
            entity_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"agent_readiness_profile">;
            entity_id: z.ZodString;
            agent_readiness_profile_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"program">;
            entity_id: z.ZodString;
            program_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"offer">;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>], "subject_type">;
        occurred_at: z.ZodISODateTime;
        payload: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
        }, z.core.$strict>], "assurance_kind"> | z.ZodObject<{
            observation_id: z.ZodString;
            capture_attestation_digest: z.ZodOptional<z.ZodString>;
            review_decision: z.ZodOptional<z.ZodObject<{
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
            }, z.core.$strict>>;
            capture_receipt_digest: z.ZodOptional<z.ZodString>;
            normalized_object_digest: z.ZodString;
            authority_entity_revision_digest: z.ZodString;
            authority_program_revision_digest: z.ZodNullable<z.ZodString>;
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
            paths: z.ZodArray<z.ZodString>;
            polarity: z.ZodEnum<{
                contradicts: "contradicts";
                supports: "supports";
            }>;
            binding_method: z.ZodString;
            binding_version: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            reason_code: z.ZodString;
            adjudication_evidence_digest: z.ZodString;
            replacement_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            conflicting_event_ids: z.ZodArray<z.ZodString>;
            outcome: z.ZodEnum<{
                "both-invalid": "both-invalid";
                "contradiction-prevails": "contradiction-prevails";
                "new-revision-required": "new-revision-required";
                "support-prevails": "support-prevails";
            }>;
            active_event_ids: z.ZodArray<z.ZodString>;
            replacement_revision_digest: z.ZodOptional<z.ZodString>;
            evidence_digests: z.ZodArray<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            authorized_issuer_id: z.ZodString;
            controlled_domain: z.ZodString;
            method: z.ZodString;
            proof_digest: z.ZodString;
            proven_at: z.ZodISODateTime;
            recheck_due_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            checked_at: z.ZodISODateTime;
            next_recheck_due_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            revoked_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            old_authority_claim_id: z.ZodString;
            new_authority_claim_id: z.ZodString;
            superseded_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            attested_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            authority_claim_id: z.ZodString;
            revoked_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            verification_id: z.ZodString;
            verifier_id: z.ZodString;
            method_version: z.ZodString;
            scope: z.ZodLiteral<"whole-revision">;
            result: z.ZodLiteral<"pass">;
            checked_at: z.ZodISODateTime;
            verified_paths: z.ZodArray<z.ZodString>;
            coverage_policy_digest: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            assurance_id: z.ZodString;
            reviewer_id: z.ZodString;
            method_policy_digest: z.ZodString;
            receipt_digest: z.ZodString;
            checked_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            coverage_paths: z.ZodArray<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            assurance_id: z.ZodString;
            reviewer_id: z.ZodString;
            method_policy_digest: z.ZodString;
            receipt_digest: z.ZodString;
            checked_at: z.ZodISODateTime;
            coverage_policy_digest: z.ZodString;
            coverage_paths: z.ZodArray<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            paths: z.ZodArray<z.ZodString>;
            valid_until: z.ZodISODateTime;
            reason_code: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            revoked_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            dispute_id: z.ZodString;
            opened_at: z.ZodISODateTime;
            public_reason_code: z.ZodString;
            case_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            dispute_id: z.ZodString;
            opened_event_id: z.ZodString;
            resolved_at: z.ZodISODateTime;
            resolution_code: z.ZodString;
            case_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            role: z.ZodEnum<{
                icon: "icon";
                "logo-dark": "logo-dark";
                "logo-light": "logo-light";
            }>;
            asset_object_digest: z.ZodString;
            served_derivative_digest: z.ZodString;
            authority_basis: z.ZodEnum<{
                "editorial-review": "editorial-review";
                "licensed-source": "licensed-source";
                "sourcey-owned": "sourcey-owned";
                "vendor-authority": "vendor-authority";
            }>;
            authority_claim_id: z.ZodOptional<z.ZodString>;
            approval_receipt_digest: z.ZodString;
            approval_scope: z.ZodString;
            source_basis: z.ZodString;
            license_basis: z.ZodString;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            superseded_binding_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            target_binding_event_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_binding_event_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            public_reason_code: z.ZodString;
            case_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_entity_id: z.ZodString;
            retired_entity_ids: z.ZodArray<z.ZodString>;
            disposition: z.ZodObject<{
                aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_program_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_offer_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    agent_readiness_profile_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    binding_event_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        rebind: "rebind";
                    }>;
                    replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
            }, z.core.$strict>;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            original_entity_id: z.ZodString;
            continuing_entity_id: z.ZodOptional<z.ZodString>;
            new_entity_ids: z.ZodArray<z.ZodString>;
            disposition: z.ZodObject<{
                aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_program_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_offer_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    agent_readiness_profile_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    binding_event_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        rebind: "rebind";
                    }>;
                    replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
            }, z.core.$strict>;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            predecessor_entity_id: z.ZodString;
            successor_entity_id: z.ZodString;
            relationship_code: z.ZodString;
            predecessor_retires: z.ZodBoolean;
            disposition: z.ZodOptional<z.ZodObject<{
                aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_program_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_offer_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    agent_readiness_profile_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    binding_event_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        rebind: "rebind";
                    }>;
                    replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
            }, z.core.$strict>>;
            effective_at: z.ZodISODateTime;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_offer_id: z.ZodString;
            retired_offer_ids: z.ZodArray<z.ZodString>;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_program_id: z.ZodString;
            retired_program_ids: z.ZodArray<z.ZodString>;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            program_id: z.ZodString;
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            continuity_evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            offer_id: z.ZodString;
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            continuity_evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_agent_readiness_profile_id: z.ZodString;
            retired_agent_readiness_profile_ids: z.ZodArray<z.ZodString>;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            continuity_evidence_digest: z.ZodString;
            reason: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            agent_readiness_profile_id: z.ZodString;
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            continuity_evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            input_digest: z.ZodString;
            relation_input_digests: z.ZodArray<z.ZodString>;
            policy_digest: z.ZodString;
            engine_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            agent_readiness_profile_id: z.ZodString;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            replacement_event_ids: z.ZodArray<z.ZodString>;
            corrected_at: z.ZodISODateTime;
            reason: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            offer_id: z.ZodString;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            program_id: z.ZodString;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict>;
        event_id: z.ZodString;
        protected: z.ZodObject<{
            signature_purpose: z.ZodEnum<{
                "catalog-attestation": "catalog-attestation";
                "catalog-authority": "catalog-authority";
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
    }, z.core.$strict>, z.ZodObject<{
        event_contract: z.ZodLiteral<"sourcey.catalog-event/v1alpha1">;
        kind: z.ZodLiteral<string>;
        issuer_id: z.ZodString;
        operation_id: z.ZodString;
        subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
            subject_type: z.ZodLiteral<"entity">;
            entity_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"agent_readiness_profile">;
            entity_id: z.ZodString;
            agent_readiness_profile_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"program">;
            entity_id: z.ZodString;
            program_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"offer">;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>], "subject_type">;
        occurred_at: z.ZodISODateTime;
        payload: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
        }, z.core.$strict>], "assurance_kind"> | z.ZodObject<{
            observation_id: z.ZodString;
            capture_attestation_digest: z.ZodOptional<z.ZodString>;
            review_decision: z.ZodOptional<z.ZodObject<{
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
            }, z.core.$strict>>;
            capture_receipt_digest: z.ZodOptional<z.ZodString>;
            normalized_object_digest: z.ZodString;
            authority_entity_revision_digest: z.ZodString;
            authority_program_revision_digest: z.ZodNullable<z.ZodString>;
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
            paths: z.ZodArray<z.ZodString>;
            polarity: z.ZodEnum<{
                contradicts: "contradicts";
                supports: "supports";
            }>;
            binding_method: z.ZodString;
            binding_version: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            reason_code: z.ZodString;
            adjudication_evidence_digest: z.ZodString;
            replacement_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            conflicting_event_ids: z.ZodArray<z.ZodString>;
            outcome: z.ZodEnum<{
                "both-invalid": "both-invalid";
                "contradiction-prevails": "contradiction-prevails";
                "new-revision-required": "new-revision-required";
                "support-prevails": "support-prevails";
            }>;
            active_event_ids: z.ZodArray<z.ZodString>;
            replacement_revision_digest: z.ZodOptional<z.ZodString>;
            evidence_digests: z.ZodArray<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            authorized_issuer_id: z.ZodString;
            controlled_domain: z.ZodString;
            method: z.ZodString;
            proof_digest: z.ZodString;
            proven_at: z.ZodISODateTime;
            recheck_due_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            checked_at: z.ZodISODateTime;
            next_recheck_due_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            revoked_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            old_authority_claim_id: z.ZodString;
            new_authority_claim_id: z.ZodString;
            superseded_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            attested_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            authority_claim_id: z.ZodString;
            revoked_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            verification_id: z.ZodString;
            verifier_id: z.ZodString;
            method_version: z.ZodString;
            scope: z.ZodLiteral<"whole-revision">;
            result: z.ZodLiteral<"pass">;
            checked_at: z.ZodISODateTime;
            verified_paths: z.ZodArray<z.ZodString>;
            coverage_policy_digest: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            assurance_id: z.ZodString;
            reviewer_id: z.ZodString;
            method_policy_digest: z.ZodString;
            receipt_digest: z.ZodString;
            checked_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            coverage_paths: z.ZodArray<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            assurance_id: z.ZodString;
            reviewer_id: z.ZodString;
            method_policy_digest: z.ZodString;
            receipt_digest: z.ZodString;
            checked_at: z.ZodISODateTime;
            coverage_policy_digest: z.ZodString;
            coverage_paths: z.ZodArray<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            paths: z.ZodArray<z.ZodString>;
            valid_until: z.ZodISODateTime;
            reason_code: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            revoked_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            dispute_id: z.ZodString;
            opened_at: z.ZodISODateTime;
            public_reason_code: z.ZodString;
            case_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            dispute_id: z.ZodString;
            opened_event_id: z.ZodString;
            resolved_at: z.ZodISODateTime;
            resolution_code: z.ZodString;
            case_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            role: z.ZodEnum<{
                icon: "icon";
                "logo-dark": "logo-dark";
                "logo-light": "logo-light";
            }>;
            asset_object_digest: z.ZodString;
            served_derivative_digest: z.ZodString;
            authority_basis: z.ZodEnum<{
                "editorial-review": "editorial-review";
                "licensed-source": "licensed-source";
                "sourcey-owned": "sourcey-owned";
                "vendor-authority": "vendor-authority";
            }>;
            authority_claim_id: z.ZodOptional<z.ZodString>;
            approval_receipt_digest: z.ZodString;
            approval_scope: z.ZodString;
            source_basis: z.ZodString;
            license_basis: z.ZodString;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            superseded_binding_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            target_binding_event_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_binding_event_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            public_reason_code: z.ZodString;
            case_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_entity_id: z.ZodString;
            retired_entity_ids: z.ZodArray<z.ZodString>;
            disposition: z.ZodObject<{
                aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_program_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_offer_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    agent_readiness_profile_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    binding_event_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        rebind: "rebind";
                    }>;
                    replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
            }, z.core.$strict>;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            original_entity_id: z.ZodString;
            continuing_entity_id: z.ZodOptional<z.ZodString>;
            new_entity_ids: z.ZodArray<z.ZodString>;
            disposition: z.ZodObject<{
                aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_program_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_offer_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    agent_readiness_profile_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    binding_event_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        rebind: "rebind";
                    }>;
                    replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
            }, z.core.$strict>;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            predecessor_entity_id: z.ZodString;
            successor_entity_id: z.ZodString;
            relationship_code: z.ZodString;
            predecessor_retires: z.ZodBoolean;
            disposition: z.ZodOptional<z.ZodObject<{
                aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_program_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_offer_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    agent_readiness_profile_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    binding_event_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        rebind: "rebind";
                    }>;
                    replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
            }, z.core.$strict>>;
            effective_at: z.ZodISODateTime;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_offer_id: z.ZodString;
            retired_offer_ids: z.ZodArray<z.ZodString>;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_program_id: z.ZodString;
            retired_program_ids: z.ZodArray<z.ZodString>;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            program_id: z.ZodString;
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            continuity_evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            offer_id: z.ZodString;
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            continuity_evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_agent_readiness_profile_id: z.ZodString;
            retired_agent_readiness_profile_ids: z.ZodArray<z.ZodString>;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            continuity_evidence_digest: z.ZodString;
            reason: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            agent_readiness_profile_id: z.ZodString;
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            continuity_evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            input_digest: z.ZodString;
            relation_input_digests: z.ZodArray<z.ZodString>;
            policy_digest: z.ZodString;
            engine_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            agent_readiness_profile_id: z.ZodString;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            replacement_event_ids: z.ZodArray<z.ZodString>;
            corrected_at: z.ZodISODateTime;
            reason: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            offer_id: z.ZodString;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            program_id: z.ZodString;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict>;
        event_id: z.ZodString;
        protected: z.ZodObject<{
            signature_purpose: z.ZodEnum<{
                "catalog-attestation": "catalog-attestation";
                "catalog-authority": "catalog-authority";
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
    }, z.core.$strict>, ...z.ZodObject<{
        event_contract: z.ZodLiteral<"sourcey.catalog-event/v1alpha1">;
        kind: z.ZodLiteral<string>;
        issuer_id: z.ZodString;
        operation_id: z.ZodString;
        subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
            subject_type: z.ZodLiteral<"entity">;
            entity_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"agent_readiness_profile">;
            entity_id: z.ZodString;
            agent_readiness_profile_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"program">;
            entity_id: z.ZodString;
            program_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"offer">;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>], "subject_type">;
        occurred_at: z.ZodISODateTime;
        payload: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
        }, z.core.$strict>], "assurance_kind"> | z.ZodObject<{
            observation_id: z.ZodString;
            capture_attestation_digest: z.ZodOptional<z.ZodString>;
            review_decision: z.ZodOptional<z.ZodObject<{
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
            }, z.core.$strict>>;
            capture_receipt_digest: z.ZodOptional<z.ZodString>;
            normalized_object_digest: z.ZodString;
            authority_entity_revision_digest: z.ZodString;
            authority_program_revision_digest: z.ZodNullable<z.ZodString>;
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
            paths: z.ZodArray<z.ZodString>;
            polarity: z.ZodEnum<{
                contradicts: "contradicts";
                supports: "supports";
            }>;
            binding_method: z.ZodString;
            binding_version: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            reason_code: z.ZodString;
            adjudication_evidence_digest: z.ZodString;
            replacement_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            conflicting_event_ids: z.ZodArray<z.ZodString>;
            outcome: z.ZodEnum<{
                "both-invalid": "both-invalid";
                "contradiction-prevails": "contradiction-prevails";
                "new-revision-required": "new-revision-required";
                "support-prevails": "support-prevails";
            }>;
            active_event_ids: z.ZodArray<z.ZodString>;
            replacement_revision_digest: z.ZodOptional<z.ZodString>;
            evidence_digests: z.ZodArray<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            authorized_issuer_id: z.ZodString;
            controlled_domain: z.ZodString;
            method: z.ZodString;
            proof_digest: z.ZodString;
            proven_at: z.ZodISODateTime;
            recheck_due_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            checked_at: z.ZodISODateTime;
            next_recheck_due_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            revoked_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            old_authority_claim_id: z.ZodString;
            new_authority_claim_id: z.ZodString;
            superseded_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            authority_claim_id: z.ZodString;
            attested_at: z.ZodISODateTime;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            authority_claim_id: z.ZodString;
            revoked_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            verification_id: z.ZodString;
            verifier_id: z.ZodString;
            method_version: z.ZodString;
            scope: z.ZodLiteral<"whole-revision">;
            result: z.ZodLiteral<"pass">;
            checked_at: z.ZodISODateTime;
            verified_paths: z.ZodArray<z.ZodString>;
            coverage_policy_digest: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            assurance_id: z.ZodString;
            reviewer_id: z.ZodString;
            method_policy_digest: z.ZodString;
            receipt_digest: z.ZodString;
            checked_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            coverage_paths: z.ZodArray<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            assurance_id: z.ZodString;
            reviewer_id: z.ZodString;
            method_policy_digest: z.ZodString;
            receipt_digest: z.ZodString;
            checked_at: z.ZodISODateTime;
            coverage_policy_digest: z.ZodString;
            coverage_paths: z.ZodArray<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            paths: z.ZodArray<z.ZodString>;
            valid_until: z.ZodISODateTime;
            reason_code: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            revoked_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            dispute_id: z.ZodString;
            opened_at: z.ZodISODateTime;
            public_reason_code: z.ZodString;
            case_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            dispute_id: z.ZodString;
            opened_event_id: z.ZodString;
            resolved_at: z.ZodISODateTime;
            resolution_code: z.ZodString;
            case_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            role: z.ZodEnum<{
                icon: "icon";
                "logo-dark": "logo-dark";
                "logo-light": "logo-light";
            }>;
            asset_object_digest: z.ZodString;
            served_derivative_digest: z.ZodString;
            authority_basis: z.ZodEnum<{
                "editorial-review": "editorial-review";
                "licensed-source": "licensed-source";
                "sourcey-owned": "sourcey-owned";
                "vendor-authority": "vendor-authority";
            }>;
            authority_claim_id: z.ZodOptional<z.ZodString>;
            approval_receipt_digest: z.ZodString;
            approval_scope: z.ZodString;
            source_basis: z.ZodString;
            license_basis: z.ZodString;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            superseded_binding_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict> | z.ZodObject<{
            target_binding_event_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_binding_event_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            public_reason_code: z.ZodString;
            case_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_entity_id: z.ZodString;
            retired_entity_ids: z.ZodArray<z.ZodString>;
            disposition: z.ZodObject<{
                aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_program_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_offer_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    agent_readiness_profile_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    binding_event_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        rebind: "rebind";
                    }>;
                    replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
            }, z.core.$strict>;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            original_entity_id: z.ZodString;
            continuing_entity_id: z.ZodOptional<z.ZodString>;
            new_entity_ids: z.ZodArray<z.ZodString>;
            disposition: z.ZodObject<{
                aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_program_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_offer_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    agent_readiness_profile_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    binding_event_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        rebind: "rebind";
                    }>;
                    replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
            }, z.core.$strict>;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            predecessor_entity_id: z.ZodString;
            successor_entity_id: z.ZodString;
            relationship_code: z.ZodString;
            predecessor_retires: z.ZodBoolean;
            disposition: z.ZodOptional<z.ZodObject<{
                aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_program_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_offer_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>;
                agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    agent_readiness_profile_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        merge: "merge";
                        reparent: "reparent";
                    }>;
                    target_entity_id: z.ZodOptional<z.ZodString>;
                    target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
                asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    binding_event_id: z.ZodString;
                    disposition: z.ZodEnum<{
                        end: "end";
                        rebind: "rebind";
                    }>;
                    replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>>>;
            }, z.core.$strict>>;
            effective_at: z.ZodISODateTime;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_offer_id: z.ZodString;
            retired_offer_ids: z.ZodArray<z.ZodString>;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_program_id: z.ZodString;
            retired_program_ids: z.ZodArray<z.ZodString>;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            program_id: z.ZodString;
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            continuity_evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            offer_id: z.ZodString;
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            continuity_evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            surviving_agent_readiness_profile_id: z.ZodString;
            retired_agent_readiness_profile_ids: z.ZodArray<z.ZodString>;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            continuity_evidence_digest: z.ZodString;
            reason: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            agent_readiness_profile_id: z.ZodString;
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
            continuity_evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            input_digest: z.ZodString;
            relation_input_digests: z.ZodArray<z.ZodString>;
            policy_digest: z.ZodString;
            engine_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            agent_readiness_profile_id: z.ZodString;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            target_event_id: z.ZodString;
            replacement_event_ids: z.ZodArray<z.ZodString>;
            corrected_at: z.ZodISODateTime;
            reason: z.ZodString;
            evidence_digest: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            offer_id: z.ZodString;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict> | z.ZodObject<{
            program_id: z.ZodString;
            entity_id: z.ZodString;
            effective_at: z.ZodISODateTime;
            reason_code: z.ZodString;
        }, z.core.$strict>;
        event_id: z.ZodString;
        protected: z.ZodObject<{
            signature_purpose: z.ZodEnum<{
                "catalog-attestation": "catalog-attestation";
                "catalog-authority": "catalog-authority";
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
    }, z.core.$strict>[]]>>;
    next_cursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strict>;
export declare const observationResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodObject<{
        observation_contract: z.ZodLiteral<"sourcey.observation/v1alpha1">;
        source_id: z.ZodString;
        source_uri: z.ZodURL;
        retrieved_at: z.ZodISODateTime;
        method: z.ZodObject<{
            name: z.ZodString;
            version: z.ZodString;
        }, z.core.$strict>;
        outcome: z.ZodEnum<{
            "contradicts-candidate": "contradicts-candidate";
            error: "error";
            "supports-candidate": "supports-candidate";
            unreachable: "unreachable";
        }>;
        capture: z.ZodOptional<z.ZodObject<{
            digest: z.ZodString;
            bytes: z.ZodNumber;
            media_type: z.ZodString;
            availability: z.ZodEnum<{
                "private-receipt": "private-receipt";
                public: "public";
            }>;
            requested_uri: z.ZodOptional<z.ZodURL>;
            final_uri: z.ZodOptional<z.ZodURL>;
            redirect_chain: z.ZodOptional<z.ZodArray<z.ZodObject<{
                status: z.ZodUnion<readonly [z.ZodLiteral<301>, z.ZodLiteral<302>, z.ZodLiteral<303>, z.ZodLiteral<307>, z.ZodLiteral<308>]>;
                from: z.ZodURL;
                to: z.ZodURL;
            }, z.core.$strict>>>;
            source_standing: z.ZodOptional<z.ZodEnum<{
                "archived-first-party": "archived-first-party";
                "archived-third-party": "archived-third-party";
                "live-first-party": "live-first-party";
                "live-third-party": "live-third-party";
                "manual-first-party": "manual-first-party";
                "manual-third-party": "manual-third-party";
            }>>;
            normalized_object: z.ZodOptional<z.ZodObject<{
                digest: z.ZodString;
                bytes: z.ZodNumber;
                media_type: z.ZodLiteral<"text/plain; charset=utf-8">;
                normalizer_contract: z.ZodLiteral<"sourcey.evidence-normalizer/v1alpha1">;
                normalizer_id: z.ZodString;
                version: z.ZodString;
                toolchain_digest: z.ZodString;
            }, z.core.$strict>>;
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
        }, z.core.$strict>>;
        no_capture_reason: z.ZodOptional<z.ZodEnum<{
            "access-denied": "access-denied";
            "connect-timeout": "connect-timeout";
            "dns-failure": "dns-failure";
            "empty-response": "empty-response";
            "extractor-error": "extractor-error";
            "policy-blocked": "policy-blocked";
            "tls-failure": "tls-failure";
        }>>;
        observation_id: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
/** Client-side semantic query; transport adapters partition it into bounded requests. */
export declare const catalogClosureQuerySchema: z.ZodObject<{
    entity_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
    domains: z.ZodDefault<z.ZodArray<z.ZodString>>;
    program_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
    offer_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
    agent_readiness_profile_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
    revision_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
    event_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
    event_operation_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
    observation_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
    capture_attestation_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strict>;
export declare const catalogClosureRequestSchema: z.ZodObject<{
    entity_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
    domains: z.ZodDefault<z.ZodArray<z.ZodString>>;
    program_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
    offer_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
    agent_readiness_profile_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
    revision_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
    event_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
    event_operation_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
    observation_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
    capture_attestation_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strict>;
export declare const catalogClosureResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodObject<{
        resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
        current_revision_digests: z.ZodArray<z.ZodString>;
        revisions: z.ZodArray<z.ZodObject<{
            revision_digest: z.ZodString;
            revision: z.ZodUnion<readonly [z.ZodObject<{
                revision_contract: z.ZodLiteral<"sourcey.entity-revision/v1alpha1">;
                entity_id: z.ZodString;
                content: z.ZodObject<{
                    name: z.ZodString;
                    summary: z.ZodOptional<z.ZodString>;
                    description: z.ZodString;
                    domains: z.ZodArray<z.ZodObject<{
                        value: z.ZodString;
                        role: z.ZodEnum<{
                            alias: "alias";
                            primary: "primary";
                        }>;
                        valid_from: z.ZodISODateTime;
                        valid_until: z.ZodOptional<z.ZodISODateTime>;
                    }, z.core.$strict>>;
                    category: z.ZodString;
                    links: z.ZodObject<{
                        site: z.ZodURL;
                        pricing: z.ZodOptional<z.ZodURL>;
                    }, z.core.$strict>;
                }, z.core.$strict>;
                revision_digest: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                revision_contract: z.ZodLiteral<"sourcey.program-revision/v1alpha1">;
                entity_id: z.ZodString;
                program_id: z.ZodString;
                content: z.ZodObject<{
                    title: z.ZodString;
                    summary: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>;
                revision_digest: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                revision_contract: z.ZodLiteral<"sourcey.offer-revision/v1alpha1">;
                entity_id: z.ZodString;
                program_id: z.ZodOptional<z.ZodString>;
                offer_id: z.ZodString;
                content: z.ZodObject<{
                    title: z.ZodString;
                    summary: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                    lifecycle: z.ZodObject<{
                        status: z.ZodEnum<{
                            active: "active";
                            ended: "ended";
                            withdrawn: "withdrawn";
                        }>;
                        effective_from: z.ZodISODateTime;
                        effective_until: z.ZodOptional<z.ZodISODateTime>;
                    }, z.core.$strict>;
                    economics: z.ZodObject<{
                        consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"none">;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"fixed">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"variable">;
                            description: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"unknown">;
                            description: z.ZodString;
                        }, z.core.$strict>], "kind">;
                        benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            benefit_id: z.ZodString;
                            description: z.ZodString;
                            kind: z.ZodLiteral<"credit">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                                maximum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>], "kind">;
                            duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodString;
                                maximum: z.ZodString;
                            }, z.core.$strict>], "kind">>;
                        }, z.core.$strict>, z.ZodObject<{
                            benefit_id: z.ZodString;
                            description: z.ZodString;
                            kind: z.ZodLiteral<"discount">;
                            percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum_basis_points: z.ZodNumber;
                                maximum_basis_points: z.ZodNumber;
                            }, z.core.$strict>], "kind">;
                            applies_to: z.ZodOptional<z.ZodString>;
                            duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodString;
                                maximum: z.ZodString;
                            }, z.core.$strict>], "kind">>;
                        }, z.core.$strict>, z.ZodObject<{
                            benefit_id: z.ZodString;
                            description: z.ZodString;
                            kind: z.ZodLiteral<"cashback">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"money">;
                                value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                    kind: z.ZodLiteral<"exact">;
                                    amount: z.ZodObject<{
                                        currency: z.ZodString;
                                        minor_units: z.ZodNumber;
                                    }, z.core.$strict>;
                                }, z.core.$strict>, z.ZodObject<{
                                    kind: z.ZodLiteral<"up-to">;
                                    amount: z.ZodObject<{
                                        currency: z.ZodString;
                                        minor_units: z.ZodNumber;
                                    }, z.core.$strict>;
                                }, z.core.$strict>, z.ZodObject<{
                                    kind: z.ZodLiteral<"at-least">;
                                    amount: z.ZodObject<{
                                        currency: z.ZodString;
                                        minor_units: z.ZodNumber;
                                    }, z.core.$strict>;
                                }, z.core.$strict>, z.ZodObject<{
                                    kind: z.ZodLiteral<"range">;
                                    minimum: z.ZodObject<{
                                        currency: z.ZodString;
                                        minor_units: z.ZodNumber;
                                    }, z.core.$strict>;
                                    maximum: z.ZodObject<{
                                        currency: z.ZodString;
                                        minor_units: z.ZodNumber;
                                    }, z.core.$strict>;
                                }, z.core.$strict>], "kind">;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"percentage">;
                                value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                    kind: z.ZodLiteral<"exact">;
                                    basis_points: z.ZodNumber;
                                }, z.core.$strict>, z.ZodObject<{
                                    kind: z.ZodLiteral<"up-to">;
                                    basis_points: z.ZodNumber;
                                }, z.core.$strict>, z.ZodObject<{
                                    kind: z.ZodLiteral<"at-least">;
                                    basis_points: z.ZodNumber;
                                }, z.core.$strict>, z.ZodObject<{
                                    kind: z.ZodLiteral<"range">;
                                    minimum_basis_points: z.ZodNumber;
                                    maximum_basis_points: z.ZodNumber;
                                }, z.core.$strict>], "kind">;
                            }, z.core.$strict>], "kind">;
                            duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodString;
                                maximum: z.ZodString;
                            }, z.core.$strict>], "kind">>;
                        }, z.core.$strict>, z.ZodObject<{
                            benefit_id: z.ZodString;
                            description: z.ZodString;
                            kind: z.ZodLiteral<"waiver">;
                            waived_item: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            benefit_id: z.ZodString;
                            description: z.ZodString;
                            kind: z.ZodLiteral<"free-service">;
                            service: z.ZodString;
                            duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodString;
                                maximum: z.ZodString;
                            }, z.core.$strict>], "kind">>;
                        }, z.core.$strict>, z.ZodObject<{
                            benefit_id: z.ZodString;
                            description: z.ZodString;
                            kind: z.ZodLiteral<"other">;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>;
                    eligibility: z.ZodObject<{
                        rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
                    }, z.core.$strict>;
                    roles: z.ZodObject<{
                        terms_authority_entity_id: z.ZodString;
                        access_operator_entity_id: z.ZodString;
                    }, z.core.$strict>;
                    access: z.ZodObject<{
                        availability: z.ZodEnum<{
                            automatic: "automatic";
                            invite: "invite";
                            membership: "membership";
                            other: "other";
                            public: "public";
                            referral: "referral";
                        }>;
                        method: z.ZodEnum<{
                            automatic: "automatic";
                            code: "code";
                            contact: "contact";
                            form: "form";
                            other: "other";
                        }>;
                        url: z.ZodOptional<z.ZodURL>;
                        public_code: z.ZodOptional<z.ZodString>;
                        instructions: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>;
                    terms_url: z.ZodOptional<z.ZodURL>;
                }, z.core.$strict>;
                revision_digest: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                revision_contract: z.ZodLiteral<"sourcey.agent-readiness-revision/v1alpha1">;
                agent_readiness_profile_id: z.ZodString;
                entity_id: z.ZodString;
                revision_digest: z.ZodString;
            }, z.core.$strip>]>;
        }, z.core.$strict>>;
        events: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            event_contract: z.ZodLiteral<"sourcey.catalog-event/v1alpha1">;
            kind: z.ZodLiteral<string>;
            issuer_id: z.ZodString;
            operation_id: z.ZodString;
            subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
                subject_type: z.ZodLiteral<"entity">;
                entity_id: z.ZodString;
                revision_digest: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                subject_type: z.ZodLiteral<"agent_readiness_profile">;
                entity_id: z.ZodString;
                agent_readiness_profile_id: z.ZodString;
                revision_digest: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                subject_type: z.ZodLiteral<"program">;
                entity_id: z.ZodString;
                program_id: z.ZodString;
                revision_digest: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                subject_type: z.ZodLiteral<"offer">;
                entity_id: z.ZodString;
                program_id: z.ZodOptional<z.ZodString>;
                offer_id: z.ZodString;
                revision_digest: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>], "subject_type">;
            occurred_at: z.ZodISODateTime;
            payload: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
            }, z.core.$strict>], "assurance_kind"> | z.ZodObject<{
                observation_id: z.ZodString;
                capture_attestation_digest: z.ZodOptional<z.ZodString>;
                review_decision: z.ZodOptional<z.ZodObject<{
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
                }, z.core.$strict>>;
                capture_receipt_digest: z.ZodOptional<z.ZodString>;
                normalized_object_digest: z.ZodString;
                authority_entity_revision_digest: z.ZodString;
                authority_program_revision_digest: z.ZodNullable<z.ZodString>;
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
                paths: z.ZodArray<z.ZodString>;
                polarity: z.ZodEnum<{
                    contradicts: "contradicts";
                    supports: "supports";
                }>;
                binding_method: z.ZodString;
                binding_version: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                target_event_id: z.ZodString;
                reason_code: z.ZodString;
                adjudication_evidence_digest: z.ZodString;
                replacement_event_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict> | z.ZodObject<{
                conflicting_event_ids: z.ZodArray<z.ZodString>;
                outcome: z.ZodEnum<{
                    "both-invalid": "both-invalid";
                    "contradiction-prevails": "contradiction-prevails";
                    "new-revision-required": "new-revision-required";
                    "support-prevails": "support-prevails";
                }>;
                active_event_ids: z.ZodArray<z.ZodString>;
                replacement_revision_digest: z.ZodOptional<z.ZodString>;
                evidence_digests: z.ZodArray<z.ZodString>;
            }, z.core.$strict> | z.ZodObject<{
                authority_claim_id: z.ZodString;
                authorized_issuer_id: z.ZodString;
                controlled_domain: z.ZodString;
                method: z.ZodString;
                proof_digest: z.ZodString;
                proven_at: z.ZodISODateTime;
                recheck_due_at: z.ZodISODateTime;
            }, z.core.$strict> | z.ZodObject<{
                authority_claim_id: z.ZodString;
                checked_at: z.ZodISODateTime;
                next_recheck_due_at: z.ZodISODateTime;
            }, z.core.$strict> | z.ZodObject<{
                authority_claim_id: z.ZodString;
                revoked_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                old_authority_claim_id: z.ZodString;
                new_authority_claim_id: z.ZodString;
                superseded_at: z.ZodISODateTime;
            }, z.core.$strict> | z.ZodObject<{
                authority_claim_id: z.ZodString;
                attested_at: z.ZodISODateTime;
            }, z.core.$strict> | z.ZodObject<{
                target_event_id: z.ZodString;
                authority_claim_id: z.ZodString;
                revoked_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                verification_id: z.ZodString;
                verifier_id: z.ZodString;
                method_version: z.ZodString;
                scope: z.ZodLiteral<"whole-revision">;
                result: z.ZodLiteral<"pass">;
                checked_at: z.ZodISODateTime;
                verified_paths: z.ZodArray<z.ZodString>;
                coverage_policy_digest: z.ZodString;
                receipt_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                assurance_id: z.ZodString;
                reviewer_id: z.ZodString;
                method_policy_digest: z.ZodString;
                receipt_digest: z.ZodString;
                checked_at: z.ZodISODateTime;
                identity_epoch_digest: z.ZodString;
                coverage_policy_digest: z.ZodString;
                coverage_paths: z.ZodArray<z.ZodString>;
            }, z.core.$strict> | z.ZodObject<{
                assurance_id: z.ZodString;
                reviewer_id: z.ZodString;
                method_policy_digest: z.ZodString;
                receipt_digest: z.ZodString;
                checked_at: z.ZodISODateTime;
                coverage_policy_digest: z.ZodString;
                coverage_paths: z.ZodArray<z.ZodString>;
            }, z.core.$strict> | z.ZodObject<{
                paths: z.ZodArray<z.ZodString>;
                valid_until: z.ZodISODateTime;
                reason_code: z.ZodString;
                evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                target_event_id: z.ZodString;
                revoked_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                dispute_id: z.ZodString;
                opened_at: z.ZodISODateTime;
                public_reason_code: z.ZodString;
                case_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                dispute_id: z.ZodString;
                opened_event_id: z.ZodString;
                resolved_at: z.ZodISODateTime;
                resolution_code: z.ZodString;
                case_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                role: z.ZodEnum<{
                    icon: "icon";
                    "logo-dark": "logo-dark";
                    "logo-light": "logo-light";
                }>;
                asset_object_digest: z.ZodString;
                served_derivative_digest: z.ZodString;
                authority_basis: z.ZodEnum<{
                    "editorial-review": "editorial-review";
                    "licensed-source": "licensed-source";
                    "sourcey-owned": "sourcey-owned";
                    "vendor-authority": "vendor-authority";
                }>;
                authority_claim_id: z.ZodOptional<z.ZodString>;
                approval_receipt_digest: z.ZodString;
                approval_scope: z.ZodString;
                source_basis: z.ZodString;
                license_basis: z.ZodString;
                effective_from: z.ZodISODateTime;
                effective_until: z.ZodOptional<z.ZodISODateTime>;
                superseded_binding_event_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict> | z.ZodObject<{
                target_binding_event_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                target_binding_event_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                public_reason_code: z.ZodString;
                case_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                surviving_entity_id: z.ZodString;
                retired_entity_ids: z.ZodArray<z.ZodString>;
                disposition: z.ZodObject<{
                    aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                    programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        program_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_program_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                    offers: z.ZodArray<z.ZodObject<{
                        offer_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_offer_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>;
                    agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        agent_readiness_profile_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                    asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        binding_event_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            rebind: "rebind";
                        }>;
                        replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                }, z.core.$strict>;
                effective_at: z.ZodISODateTime;
                reason: z.ZodString;
                evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                original_entity_id: z.ZodString;
                continuing_entity_id: z.ZodOptional<z.ZodString>;
                new_entity_ids: z.ZodArray<z.ZodString>;
                disposition: z.ZodObject<{
                    aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                    programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        program_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_program_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                    offers: z.ZodArray<z.ZodObject<{
                        offer_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_offer_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>;
                    agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        agent_readiness_profile_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                    asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        binding_event_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            rebind: "rebind";
                        }>;
                        replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                }, z.core.$strict>;
                effective_at: z.ZodISODateTime;
                reason: z.ZodString;
                evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                predecessor_entity_id: z.ZodString;
                successor_entity_id: z.ZodString;
                relationship_code: z.ZodString;
                predecessor_retires: z.ZodBoolean;
                disposition: z.ZodOptional<z.ZodObject<{
                    aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                    programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        program_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_program_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                    offers: z.ZodArray<z.ZodObject<{
                        offer_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_offer_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>;
                    agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        agent_readiness_profile_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                    asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        binding_event_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            rebind: "rebind";
                        }>;
                        replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                }, z.core.$strict>>;
                effective_at: z.ZodISODateTime;
                evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                surviving_offer_id: z.ZodString;
                retired_offer_ids: z.ZodArray<z.ZodString>;
                entity_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                reason: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                surviving_program_id: z.ZodString;
                retired_program_ids: z.ZodArray<z.ZodString>;
                entity_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                reason: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                program_id: z.ZodString;
                old_entity_id: z.ZodString;
                new_entity_id: z.ZodString;
                valid_from: z.ZodISODateTime;
                valid_until: z.ZodOptional<z.ZodISODateTime>;
                continuity_evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                offer_id: z.ZodString;
                old_entity_id: z.ZodString;
                new_entity_id: z.ZodString;
                valid_from: z.ZodISODateTime;
                valid_until: z.ZodOptional<z.ZodISODateTime>;
                continuity_evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                surviving_agent_readiness_profile_id: z.ZodString;
                retired_agent_readiness_profile_ids: z.ZodArray<z.ZodString>;
                entity_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                continuity_evidence_digest: z.ZodString;
                reason: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                agent_readiness_profile_id: z.ZodString;
                old_entity_id: z.ZodString;
                new_entity_id: z.ZodString;
                valid_from: z.ZodISODateTime;
                valid_until: z.ZodOptional<z.ZodISODateTime>;
                continuity_evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                input_digest: z.ZodString;
                relation_input_digests: z.ZodArray<z.ZodString>;
                policy_digest: z.ZodString;
                engine_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                agent_readiness_profile_id: z.ZodString;
                entity_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                target_event_id: z.ZodString;
                replacement_event_ids: z.ZodArray<z.ZodString>;
                corrected_at: z.ZodISODateTime;
                reason: z.ZodString;
                evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                offer_id: z.ZodString;
                entity_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                program_id: z.ZodString;
                entity_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict>;
            event_id: z.ZodString;
            protected: z.ZodObject<{
                signature_purpose: z.ZodEnum<{
                    "catalog-attestation": "catalog-attestation";
                    "catalog-authority": "catalog-authority";
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
        }, z.core.$strict>, z.ZodObject<{
            event_contract: z.ZodLiteral<"sourcey.catalog-event/v1alpha1">;
            kind: z.ZodLiteral<string>;
            issuer_id: z.ZodString;
            operation_id: z.ZodString;
            subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
                subject_type: z.ZodLiteral<"entity">;
                entity_id: z.ZodString;
                revision_digest: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                subject_type: z.ZodLiteral<"agent_readiness_profile">;
                entity_id: z.ZodString;
                agent_readiness_profile_id: z.ZodString;
                revision_digest: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                subject_type: z.ZodLiteral<"program">;
                entity_id: z.ZodString;
                program_id: z.ZodString;
                revision_digest: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                subject_type: z.ZodLiteral<"offer">;
                entity_id: z.ZodString;
                program_id: z.ZodOptional<z.ZodString>;
                offer_id: z.ZodString;
                revision_digest: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>], "subject_type">;
            occurred_at: z.ZodISODateTime;
            payload: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
            }, z.core.$strict>], "assurance_kind"> | z.ZodObject<{
                observation_id: z.ZodString;
                capture_attestation_digest: z.ZodOptional<z.ZodString>;
                review_decision: z.ZodOptional<z.ZodObject<{
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
                }, z.core.$strict>>;
                capture_receipt_digest: z.ZodOptional<z.ZodString>;
                normalized_object_digest: z.ZodString;
                authority_entity_revision_digest: z.ZodString;
                authority_program_revision_digest: z.ZodNullable<z.ZodString>;
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
                paths: z.ZodArray<z.ZodString>;
                polarity: z.ZodEnum<{
                    contradicts: "contradicts";
                    supports: "supports";
                }>;
                binding_method: z.ZodString;
                binding_version: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                target_event_id: z.ZodString;
                reason_code: z.ZodString;
                adjudication_evidence_digest: z.ZodString;
                replacement_event_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict> | z.ZodObject<{
                conflicting_event_ids: z.ZodArray<z.ZodString>;
                outcome: z.ZodEnum<{
                    "both-invalid": "both-invalid";
                    "contradiction-prevails": "contradiction-prevails";
                    "new-revision-required": "new-revision-required";
                    "support-prevails": "support-prevails";
                }>;
                active_event_ids: z.ZodArray<z.ZodString>;
                replacement_revision_digest: z.ZodOptional<z.ZodString>;
                evidence_digests: z.ZodArray<z.ZodString>;
            }, z.core.$strict> | z.ZodObject<{
                authority_claim_id: z.ZodString;
                authorized_issuer_id: z.ZodString;
                controlled_domain: z.ZodString;
                method: z.ZodString;
                proof_digest: z.ZodString;
                proven_at: z.ZodISODateTime;
                recheck_due_at: z.ZodISODateTime;
            }, z.core.$strict> | z.ZodObject<{
                authority_claim_id: z.ZodString;
                checked_at: z.ZodISODateTime;
                next_recheck_due_at: z.ZodISODateTime;
            }, z.core.$strict> | z.ZodObject<{
                authority_claim_id: z.ZodString;
                revoked_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                old_authority_claim_id: z.ZodString;
                new_authority_claim_id: z.ZodString;
                superseded_at: z.ZodISODateTime;
            }, z.core.$strict> | z.ZodObject<{
                authority_claim_id: z.ZodString;
                attested_at: z.ZodISODateTime;
            }, z.core.$strict> | z.ZodObject<{
                target_event_id: z.ZodString;
                authority_claim_id: z.ZodString;
                revoked_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                verification_id: z.ZodString;
                verifier_id: z.ZodString;
                method_version: z.ZodString;
                scope: z.ZodLiteral<"whole-revision">;
                result: z.ZodLiteral<"pass">;
                checked_at: z.ZodISODateTime;
                verified_paths: z.ZodArray<z.ZodString>;
                coverage_policy_digest: z.ZodString;
                receipt_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                assurance_id: z.ZodString;
                reviewer_id: z.ZodString;
                method_policy_digest: z.ZodString;
                receipt_digest: z.ZodString;
                checked_at: z.ZodISODateTime;
                identity_epoch_digest: z.ZodString;
                coverage_policy_digest: z.ZodString;
                coverage_paths: z.ZodArray<z.ZodString>;
            }, z.core.$strict> | z.ZodObject<{
                assurance_id: z.ZodString;
                reviewer_id: z.ZodString;
                method_policy_digest: z.ZodString;
                receipt_digest: z.ZodString;
                checked_at: z.ZodISODateTime;
                coverage_policy_digest: z.ZodString;
                coverage_paths: z.ZodArray<z.ZodString>;
            }, z.core.$strict> | z.ZodObject<{
                paths: z.ZodArray<z.ZodString>;
                valid_until: z.ZodISODateTime;
                reason_code: z.ZodString;
                evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                target_event_id: z.ZodString;
                revoked_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                dispute_id: z.ZodString;
                opened_at: z.ZodISODateTime;
                public_reason_code: z.ZodString;
                case_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                dispute_id: z.ZodString;
                opened_event_id: z.ZodString;
                resolved_at: z.ZodISODateTime;
                resolution_code: z.ZodString;
                case_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                role: z.ZodEnum<{
                    icon: "icon";
                    "logo-dark": "logo-dark";
                    "logo-light": "logo-light";
                }>;
                asset_object_digest: z.ZodString;
                served_derivative_digest: z.ZodString;
                authority_basis: z.ZodEnum<{
                    "editorial-review": "editorial-review";
                    "licensed-source": "licensed-source";
                    "sourcey-owned": "sourcey-owned";
                    "vendor-authority": "vendor-authority";
                }>;
                authority_claim_id: z.ZodOptional<z.ZodString>;
                approval_receipt_digest: z.ZodString;
                approval_scope: z.ZodString;
                source_basis: z.ZodString;
                license_basis: z.ZodString;
                effective_from: z.ZodISODateTime;
                effective_until: z.ZodOptional<z.ZodISODateTime>;
                superseded_binding_event_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict> | z.ZodObject<{
                target_binding_event_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                target_binding_event_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                public_reason_code: z.ZodString;
                case_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                surviving_entity_id: z.ZodString;
                retired_entity_ids: z.ZodArray<z.ZodString>;
                disposition: z.ZodObject<{
                    aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                    programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        program_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_program_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                    offers: z.ZodArray<z.ZodObject<{
                        offer_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_offer_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>;
                    agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        agent_readiness_profile_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                    asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        binding_event_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            rebind: "rebind";
                        }>;
                        replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                }, z.core.$strict>;
                effective_at: z.ZodISODateTime;
                reason: z.ZodString;
                evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                original_entity_id: z.ZodString;
                continuing_entity_id: z.ZodOptional<z.ZodString>;
                new_entity_ids: z.ZodArray<z.ZodString>;
                disposition: z.ZodObject<{
                    aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                    programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        program_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_program_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                    offers: z.ZodArray<z.ZodObject<{
                        offer_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_offer_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>;
                    agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        agent_readiness_profile_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                    asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        binding_event_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            rebind: "rebind";
                        }>;
                        replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                }, z.core.$strict>;
                effective_at: z.ZodISODateTime;
                reason: z.ZodString;
                evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                predecessor_entity_id: z.ZodString;
                successor_entity_id: z.ZodString;
                relationship_code: z.ZodString;
                predecessor_retires: z.ZodBoolean;
                disposition: z.ZodOptional<z.ZodObject<{
                    aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                    programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        program_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_program_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                    offers: z.ZodArray<z.ZodObject<{
                        offer_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_offer_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>;
                    agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        agent_readiness_profile_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                    asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        binding_event_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            rebind: "rebind";
                        }>;
                        replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                }, z.core.$strict>>;
                effective_at: z.ZodISODateTime;
                evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                surviving_offer_id: z.ZodString;
                retired_offer_ids: z.ZodArray<z.ZodString>;
                entity_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                reason: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                surviving_program_id: z.ZodString;
                retired_program_ids: z.ZodArray<z.ZodString>;
                entity_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                reason: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                program_id: z.ZodString;
                old_entity_id: z.ZodString;
                new_entity_id: z.ZodString;
                valid_from: z.ZodISODateTime;
                valid_until: z.ZodOptional<z.ZodISODateTime>;
                continuity_evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                offer_id: z.ZodString;
                old_entity_id: z.ZodString;
                new_entity_id: z.ZodString;
                valid_from: z.ZodISODateTime;
                valid_until: z.ZodOptional<z.ZodISODateTime>;
                continuity_evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                surviving_agent_readiness_profile_id: z.ZodString;
                retired_agent_readiness_profile_ids: z.ZodArray<z.ZodString>;
                entity_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                continuity_evidence_digest: z.ZodString;
                reason: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                agent_readiness_profile_id: z.ZodString;
                old_entity_id: z.ZodString;
                new_entity_id: z.ZodString;
                valid_from: z.ZodISODateTime;
                valid_until: z.ZodOptional<z.ZodISODateTime>;
                continuity_evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                input_digest: z.ZodString;
                relation_input_digests: z.ZodArray<z.ZodString>;
                policy_digest: z.ZodString;
                engine_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                agent_readiness_profile_id: z.ZodString;
                entity_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                target_event_id: z.ZodString;
                replacement_event_ids: z.ZodArray<z.ZodString>;
                corrected_at: z.ZodISODateTime;
                reason: z.ZodString;
                evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                offer_id: z.ZodString;
                entity_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                program_id: z.ZodString;
                entity_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict>;
            event_id: z.ZodString;
            protected: z.ZodObject<{
                signature_purpose: z.ZodEnum<{
                    "catalog-attestation": "catalog-attestation";
                    "catalog-authority": "catalog-authority";
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
        }, z.core.$strict>, ...z.ZodObject<{
            event_contract: z.ZodLiteral<"sourcey.catalog-event/v1alpha1">;
            kind: z.ZodLiteral<string>;
            issuer_id: z.ZodString;
            operation_id: z.ZodString;
            subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
                subject_type: z.ZodLiteral<"entity">;
                entity_id: z.ZodString;
                revision_digest: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                subject_type: z.ZodLiteral<"agent_readiness_profile">;
                entity_id: z.ZodString;
                agent_readiness_profile_id: z.ZodString;
                revision_digest: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                subject_type: z.ZodLiteral<"program">;
                entity_id: z.ZodString;
                program_id: z.ZodString;
                revision_digest: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                subject_type: z.ZodLiteral<"offer">;
                entity_id: z.ZodString;
                program_id: z.ZodOptional<z.ZodString>;
                offer_id: z.ZodString;
                revision_digest: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>], "subject_type">;
            occurred_at: z.ZodISODateTime;
            payload: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
            }, z.core.$strict>], "assurance_kind"> | z.ZodObject<{
                observation_id: z.ZodString;
                capture_attestation_digest: z.ZodOptional<z.ZodString>;
                review_decision: z.ZodOptional<z.ZodObject<{
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
                }, z.core.$strict>>;
                capture_receipt_digest: z.ZodOptional<z.ZodString>;
                normalized_object_digest: z.ZodString;
                authority_entity_revision_digest: z.ZodString;
                authority_program_revision_digest: z.ZodNullable<z.ZodString>;
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
                paths: z.ZodArray<z.ZodString>;
                polarity: z.ZodEnum<{
                    contradicts: "contradicts";
                    supports: "supports";
                }>;
                binding_method: z.ZodString;
                binding_version: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                target_event_id: z.ZodString;
                reason_code: z.ZodString;
                adjudication_evidence_digest: z.ZodString;
                replacement_event_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict> | z.ZodObject<{
                conflicting_event_ids: z.ZodArray<z.ZodString>;
                outcome: z.ZodEnum<{
                    "both-invalid": "both-invalid";
                    "contradiction-prevails": "contradiction-prevails";
                    "new-revision-required": "new-revision-required";
                    "support-prevails": "support-prevails";
                }>;
                active_event_ids: z.ZodArray<z.ZodString>;
                replacement_revision_digest: z.ZodOptional<z.ZodString>;
                evidence_digests: z.ZodArray<z.ZodString>;
            }, z.core.$strict> | z.ZodObject<{
                authority_claim_id: z.ZodString;
                authorized_issuer_id: z.ZodString;
                controlled_domain: z.ZodString;
                method: z.ZodString;
                proof_digest: z.ZodString;
                proven_at: z.ZodISODateTime;
                recheck_due_at: z.ZodISODateTime;
            }, z.core.$strict> | z.ZodObject<{
                authority_claim_id: z.ZodString;
                checked_at: z.ZodISODateTime;
                next_recheck_due_at: z.ZodISODateTime;
            }, z.core.$strict> | z.ZodObject<{
                authority_claim_id: z.ZodString;
                revoked_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                old_authority_claim_id: z.ZodString;
                new_authority_claim_id: z.ZodString;
                superseded_at: z.ZodISODateTime;
            }, z.core.$strict> | z.ZodObject<{
                authority_claim_id: z.ZodString;
                attested_at: z.ZodISODateTime;
            }, z.core.$strict> | z.ZodObject<{
                target_event_id: z.ZodString;
                authority_claim_id: z.ZodString;
                revoked_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                verification_id: z.ZodString;
                verifier_id: z.ZodString;
                method_version: z.ZodString;
                scope: z.ZodLiteral<"whole-revision">;
                result: z.ZodLiteral<"pass">;
                checked_at: z.ZodISODateTime;
                verified_paths: z.ZodArray<z.ZodString>;
                coverage_policy_digest: z.ZodString;
                receipt_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                assurance_id: z.ZodString;
                reviewer_id: z.ZodString;
                method_policy_digest: z.ZodString;
                receipt_digest: z.ZodString;
                checked_at: z.ZodISODateTime;
                identity_epoch_digest: z.ZodString;
                coverage_policy_digest: z.ZodString;
                coverage_paths: z.ZodArray<z.ZodString>;
            }, z.core.$strict> | z.ZodObject<{
                assurance_id: z.ZodString;
                reviewer_id: z.ZodString;
                method_policy_digest: z.ZodString;
                receipt_digest: z.ZodString;
                checked_at: z.ZodISODateTime;
                coverage_policy_digest: z.ZodString;
                coverage_paths: z.ZodArray<z.ZodString>;
            }, z.core.$strict> | z.ZodObject<{
                paths: z.ZodArray<z.ZodString>;
                valid_until: z.ZodISODateTime;
                reason_code: z.ZodString;
                evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                target_event_id: z.ZodString;
                revoked_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                dispute_id: z.ZodString;
                opened_at: z.ZodISODateTime;
                public_reason_code: z.ZodString;
                case_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                dispute_id: z.ZodString;
                opened_event_id: z.ZodString;
                resolved_at: z.ZodISODateTime;
                resolution_code: z.ZodString;
                case_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                role: z.ZodEnum<{
                    icon: "icon";
                    "logo-dark": "logo-dark";
                    "logo-light": "logo-light";
                }>;
                asset_object_digest: z.ZodString;
                served_derivative_digest: z.ZodString;
                authority_basis: z.ZodEnum<{
                    "editorial-review": "editorial-review";
                    "licensed-source": "licensed-source";
                    "sourcey-owned": "sourcey-owned";
                    "vendor-authority": "vendor-authority";
                }>;
                authority_claim_id: z.ZodOptional<z.ZodString>;
                approval_receipt_digest: z.ZodString;
                approval_scope: z.ZodString;
                source_basis: z.ZodString;
                license_basis: z.ZodString;
                effective_from: z.ZodISODateTime;
                effective_until: z.ZodOptional<z.ZodISODateTime>;
                superseded_binding_event_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict> | z.ZodObject<{
                target_binding_event_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                target_binding_event_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                public_reason_code: z.ZodString;
                case_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                surviving_entity_id: z.ZodString;
                retired_entity_ids: z.ZodArray<z.ZodString>;
                disposition: z.ZodObject<{
                    aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                    programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        program_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_program_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                    offers: z.ZodArray<z.ZodObject<{
                        offer_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_offer_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>;
                    agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        agent_readiness_profile_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                    asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        binding_event_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            rebind: "rebind";
                        }>;
                        replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                }, z.core.$strict>;
                effective_at: z.ZodISODateTime;
                reason: z.ZodString;
                evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                original_entity_id: z.ZodString;
                continuing_entity_id: z.ZodOptional<z.ZodString>;
                new_entity_ids: z.ZodArray<z.ZodString>;
                disposition: z.ZodObject<{
                    aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                    programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        program_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_program_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                    offers: z.ZodArray<z.ZodObject<{
                        offer_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_offer_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>;
                    agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        agent_readiness_profile_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                    asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        binding_event_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            rebind: "rebind";
                        }>;
                        replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                }, z.core.$strict>;
                effective_at: z.ZodISODateTime;
                reason: z.ZodString;
                evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                predecessor_entity_id: z.ZodString;
                successor_entity_id: z.ZodString;
                relationship_code: z.ZodString;
                predecessor_retires: z.ZodBoolean;
                disposition: z.ZodOptional<z.ZodObject<{
                    aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                    programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        program_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_program_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                    offers: z.ZodArray<z.ZodObject<{
                        offer_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_offer_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>;
                    agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        agent_readiness_profile_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            merge: "merge";
                            reparent: "reparent";
                        }>;
                        target_entity_id: z.ZodOptional<z.ZodString>;
                        target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                    asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        binding_event_id: z.ZodString;
                        disposition: z.ZodEnum<{
                            end: "end";
                            rebind: "rebind";
                        }>;
                        replacement_binding_event_id: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>>>;
                }, z.core.$strict>>;
                effective_at: z.ZodISODateTime;
                evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                surviving_offer_id: z.ZodString;
                retired_offer_ids: z.ZodArray<z.ZodString>;
                entity_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                reason: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                surviving_program_id: z.ZodString;
                retired_program_ids: z.ZodArray<z.ZodString>;
                entity_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                reason: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                program_id: z.ZodString;
                old_entity_id: z.ZodString;
                new_entity_id: z.ZodString;
                valid_from: z.ZodISODateTime;
                valid_until: z.ZodOptional<z.ZodISODateTime>;
                continuity_evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                offer_id: z.ZodString;
                old_entity_id: z.ZodString;
                new_entity_id: z.ZodString;
                valid_from: z.ZodISODateTime;
                valid_until: z.ZodOptional<z.ZodISODateTime>;
                continuity_evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                surviving_agent_readiness_profile_id: z.ZodString;
                retired_agent_readiness_profile_ids: z.ZodArray<z.ZodString>;
                entity_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                continuity_evidence_digest: z.ZodString;
                reason: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                agent_readiness_profile_id: z.ZodString;
                old_entity_id: z.ZodString;
                new_entity_id: z.ZodString;
                valid_from: z.ZodISODateTime;
                valid_until: z.ZodOptional<z.ZodISODateTime>;
                continuity_evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                input_digest: z.ZodString;
                relation_input_digests: z.ZodArray<z.ZodString>;
                policy_digest: z.ZodString;
                engine_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                agent_readiness_profile_id: z.ZodString;
                entity_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                target_event_id: z.ZodString;
                replacement_event_ids: z.ZodArray<z.ZodString>;
                corrected_at: z.ZodISODateTime;
                reason: z.ZodString;
                evidence_digest: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                offer_id: z.ZodString;
                entity_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict> | z.ZodObject<{
                program_id: z.ZodString;
                entity_id: z.ZodString;
                effective_at: z.ZodISODateTime;
                reason_code: z.ZodString;
            }, z.core.$strict>;
            event_id: z.ZodString;
            protected: z.ZodObject<{
                signature_purpose: z.ZodEnum<{
                    "catalog-attestation": "catalog-attestation";
                    "catalog-authority": "catalog-authority";
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
        }, z.core.$strict>[]]>>;
        observations: z.ZodArray<z.ZodObject<{
            observation_contract: z.ZodLiteral<"sourcey.observation/v1alpha1">;
            source_id: z.ZodString;
            source_uri: z.ZodURL;
            retrieved_at: z.ZodISODateTime;
            method: z.ZodObject<{
                name: z.ZodString;
                version: z.ZodString;
            }, z.core.$strict>;
            outcome: z.ZodEnum<{
                "contradicts-candidate": "contradicts-candidate";
                error: "error";
                "supports-candidate": "supports-candidate";
                unreachable: "unreachable";
            }>;
            capture: z.ZodOptional<z.ZodObject<{
                digest: z.ZodString;
                bytes: z.ZodNumber;
                media_type: z.ZodString;
                availability: z.ZodEnum<{
                    "private-receipt": "private-receipt";
                    public: "public";
                }>;
                requested_uri: z.ZodOptional<z.ZodURL>;
                final_uri: z.ZodOptional<z.ZodURL>;
                redirect_chain: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    status: z.ZodUnion<readonly [z.ZodLiteral<301>, z.ZodLiteral<302>, z.ZodLiteral<303>, z.ZodLiteral<307>, z.ZodLiteral<308>]>;
                    from: z.ZodURL;
                    to: z.ZodURL;
                }, z.core.$strict>>>;
                source_standing: z.ZodOptional<z.ZodEnum<{
                    "archived-first-party": "archived-first-party";
                    "archived-third-party": "archived-third-party";
                    "live-first-party": "live-first-party";
                    "live-third-party": "live-third-party";
                    "manual-first-party": "manual-first-party";
                    "manual-third-party": "manual-third-party";
                }>>;
                normalized_object: z.ZodOptional<z.ZodObject<{
                    digest: z.ZodString;
                    bytes: z.ZodNumber;
                    media_type: z.ZodLiteral<"text/plain; charset=utf-8">;
                    normalizer_contract: z.ZodLiteral<"sourcey.evidence-normalizer/v1alpha1">;
                    normalizer_id: z.ZodString;
                    version: z.ZodString;
                    toolchain_digest: z.ZodString;
                }, z.core.$strict>>;
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
            }, z.core.$strict>>;
            no_capture_reason: z.ZodOptional<z.ZodEnum<{
                "access-denied": "access-denied";
                "connect-timeout": "connect-timeout";
                "dns-failure": "dns-failure";
                "empty-response": "empty-response";
                "extractor-error": "extractor-error";
                "policy-blocked": "policy-blocked";
                "tls-failure": "tls-failure";
            }>>;
            observation_id: z.ZodString;
        }, z.core.$strict>>;
        capture_attestations: z.ZodArray<z.ZodObject<{
            attestation_contract: z.ZodLiteral<"provenry.capture-attempt-attestation/v1alpha1">;
            capture_key: z.ZodString;
            start_digest: z.ZodString;
            attempt_digest: z.ZodString;
            method_registry_digest: z.ZodString;
            signed_at: z.ZodISODateTime;
            attestation_digest: z.ZodString;
            protected: z.ZodObject<{
                signature_purpose: z.ZodLiteral<"provenry-capture-attempt">;
                issuer_id: z.ZodString;
                key_id: z.ZodString;
                signer_registry_digest: z.ZodString;
                algorithm: z.ZodLiteral<"ed25519">;
                signature: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
}, z.core.$strict>;
export type CatalogClosureRequest = z.infer<typeof catalogClosureRequestSchema>;
//# sourceMappingURL=read.d.ts.map