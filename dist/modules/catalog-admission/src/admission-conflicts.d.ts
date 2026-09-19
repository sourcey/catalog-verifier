import type { z } from "zod";
import { type CatalogAdmissionCandidate, type CatalogAdmissionKeyKind, type CatalogVerifierIdentityContextCore, catalogAdmissionCandidateSchema, catalogAdmissionConflictLookupRequestSchema, catalogAdmissionConflictLookupResponseSchema, catalogAdmissionKeyDigestsSchema, catalogAdmissionKeyKindSchema, catalogAdmissionKeyMatchSchema, catalogAdmissionKeySchema, MAXIMUM_CATALOG_ADMISSION_KEYS, MAXIMUM_CATALOG_ADMISSION_MATCHES, MAXIMUM_PENDING_ADMISSION_KEYS, openPullRequestAdmissionCandidateSchema, openPullRequestAdmissionKeySchema } from "../../../contracts/catalog-verifier/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
export type { CatalogAdmissionCandidate, CatalogAdmissionKeyKind };
export { catalogAdmissionCandidateSchema, catalogAdmissionConflictLookupRequestSchema, catalogAdmissionConflictLookupResponseSchema, catalogAdmissionKeyDigestsSchema, catalogAdmissionKeyKindSchema, catalogAdmissionKeyMatchSchema, catalogAdmissionKeySchema, MAXIMUM_CATALOG_ADMISSION_KEYS, MAXIMUM_CATALOG_ADMISSION_MATCHES, MAXIMUM_PENDING_ADMISSION_KEYS, openPullRequestAdmissionCandidateSchema, openPullRequestAdmissionKeySchema, };
export declare function createCatalogAdmissionConflictLookupResponse(input: {
    readonly query: z.infer<typeof catalogAdmissionConflictLookupRequestSchema>;
    readonly matches: readonly CatalogAdmissionKeyMatch[];
}): {
    response_contract: "sourcey.catalog-admission-conflict-response/v1alpha1";
    query_digest: `sha256:${string}`;
    matches: {
        keyDigest: `sha256:${string}`;
        targetReference: string;
        source: {
            kind: "current_catalog";
            liveParentReleaseId: `sha256:${string}`;
        } | {
            kind: "open_pull_request";
            repository: string;
            pullRequestNumber: number;
            headSha: string;
        } | {
            kind: "pending_git_lineage";
            repository: string;
            liveSourceCommit: string;
            targetCommit: string;
        } | {
            kind: "pending_submission";
            candidateReference: string;
            candidateDigest: `sha256:${string}`;
        };
        targetIdentityDigest?: `sha256:${string}` | undefined;
    }[];
    response_digest: `sha256:${string}`;
};
export declare function verifyCatalogAdmissionConflictLookupResponse(input: {
    readonly query: z.infer<typeof catalogAdmissionConflictLookupRequestSchema>;
    readonly response: unknown;
}): {
    response_contract: "sourcey.catalog-admission-conflict-response/v1alpha1";
    query_digest: `sha256:${string}`;
    matches: {
        keyDigest: `sha256:${string}`;
        targetReference: string;
        source: {
            kind: "current_catalog";
            liveParentReleaseId: `sha256:${string}`;
        } | {
            kind: "open_pull_request";
            repository: string;
            pullRequestNumber: number;
            headSha: string;
        } | {
            kind: "pending_git_lineage";
            repository: string;
            liveSourceCommit: string;
            targetCommit: string;
        } | {
            kind: "pending_submission";
            candidateReference: string;
            candidateDigest: `sha256:${string}`;
        };
        targetIdentityDigest?: `sha256:${string}` | undefined;
    }[];
    response_digest: `sha256:${string}`;
};
export declare function createCatalogVerifierIdentityContextCore(input: {
    readonly query: z.infer<typeof catalogAdmissionConflictLookupRequestSchema>;
    readonly response: z.infer<typeof catalogAdmissionConflictLookupResponseSchema>;
    readonly liveParentReleaseSequence: number;
    readonly issuedAt: string;
    readonly expiresAt: string;
}): CatalogVerifierIdentityContextCore;
export declare function createCatalogVerifierIdentityContextPacket(input: {
    readonly query: z.infer<typeof catalogAdmissionConflictLookupRequestSchema>;
    readonly response: z.infer<typeof catalogAdmissionConflictLookupResponseSchema>;
    readonly context: unknown;
    readonly signerRegistry: unknown;
}): {
    packet_contract: "sourcey.catalog-verifier-identity-context-packet/v1alpha1";
    query: {
        query_contract: "sourcey.catalog-admission-conflict-query/v1alpha1";
        keys: {
            kind: "entity_id" | "entity_name" | "program_id" | "offer_id" | "offer_slug" | "program_slug" | "domain" | "entity_slug" | "entity_url" | "evidence_url" | "offer_url" | "semantic_offer";
            normalizedValue: string;
            keyDigest: `sha256:${string}`;
            candidateReference: string;
            candidateIdentityDigest?: `sha256:${string}` | undefined;
        }[];
        liveParentReleaseId: `sha256:${string}`;
        candidate: {
            kind: "git_pull_request";
            repository: string;
            pullRequestNumber: number;
            headSha: string;
        } | {
            kind: "detached";
            repositoryKind: "startup-credits" | "agent-readiness";
            candidateDigest: `sha256:${string}`;
            candidateReference: string;
        };
    };
    response: {
        response_contract: "sourcey.catalog-admission-conflict-response/v1alpha1";
        query_digest: `sha256:${string}`;
        matches: {
            keyDigest: `sha256:${string}`;
            targetReference: string;
            source: {
                kind: "current_catalog";
                liveParentReleaseId: `sha256:${string}`;
            } | {
                kind: "open_pull_request";
                repository: string;
                pullRequestNumber: number;
                headSha: string;
            } | {
                kind: "pending_git_lineage";
                repository: string;
                liveSourceCommit: string;
                targetCommit: string;
            } | {
                kind: "pending_submission";
                candidateReference: string;
                candidateDigest: `sha256:${string}`;
            };
            targetIdentityDigest?: `sha256:${string}` | undefined;
        }[];
        response_digest: `sha256:${string}`;
    };
    context: {
        context_contract: "sourcey.catalog-verifier-identity-context/v1alpha1";
        query_digest: `sha256:${string}`;
        response_digest: `sha256:${string}`;
        live_parent_release_id: `sha256:${string}`;
        live_parent_release_sequence: number;
        issued_at: string;
        expires_at: string;
        context_digest: `sha256:${string}`;
        protected: {
            signature_purpose: "catalog-capture" | "catalog-evidence" | "catalog-identity" | "catalog-authority" | "catalog-attestation" | "catalog-verification" | "catalog-dispute" | "catalog-policy" | "catalog-release" | "catalog-feed";
            signer_registry_digest: string;
            key_id: string;
            algorithm: "ed25519";
            signature: string;
        };
    };
    signer_registry: {
        registry_contract: "sourcey.signer-registry/v1alpha1";
        generation: number;
        parent_registry_digest: string | null;
        issuers: {
            issuer_id: string;
            keys: {
                key_id: string;
                algorithm: "ed25519";
                public_key_pem: string;
                purposes: string[];
                valid_from: string;
                valid_until?: string | undefined;
                compromised_after_sequence?: number | undefined;
            }[];
        }[];
        registry_digest: string;
        root_signatures: {
            key_id: string;
            algorithm: "ed25519";
            signature: string;
        }[];
    };
};
export declare function verifyCatalogVerifierIdentityContextPacket(input: {
    readonly packet: unknown;
    readonly rootSet: unknown;
    readonly trustedRootDigest: Digest;
    readonly verifiedAt: string;
}): {
    packet: {
        packet_contract: "sourcey.catalog-verifier-identity-context-packet/v1alpha1";
        query: {
            query_contract: "sourcey.catalog-admission-conflict-query/v1alpha1";
            keys: {
                kind: "entity_id" | "entity_name" | "program_id" | "offer_id" | "offer_slug" | "program_slug" | "domain" | "entity_slug" | "entity_url" | "evidence_url" | "offer_url" | "semantic_offer";
                normalizedValue: string;
                keyDigest: `sha256:${string}`;
                candidateReference: string;
                candidateIdentityDigest?: `sha256:${string}` | undefined;
            }[];
            liveParentReleaseId: `sha256:${string}`;
            candidate: {
                kind: "git_pull_request";
                repository: string;
                pullRequestNumber: number;
                headSha: string;
            } | {
                kind: "detached";
                repositoryKind: "startup-credits" | "agent-readiness";
                candidateDigest: `sha256:${string}`;
                candidateReference: string;
            };
        };
        response: {
            response_contract: "sourcey.catalog-admission-conflict-response/v1alpha1";
            query_digest: `sha256:${string}`;
            matches: {
                keyDigest: `sha256:${string}`;
                targetReference: string;
                source: {
                    kind: "current_catalog";
                    liveParentReleaseId: `sha256:${string}`;
                } | {
                    kind: "open_pull_request";
                    repository: string;
                    pullRequestNumber: number;
                    headSha: string;
                } | {
                    kind: "pending_git_lineage";
                    repository: string;
                    liveSourceCommit: string;
                    targetCommit: string;
                } | {
                    kind: "pending_submission";
                    candidateReference: string;
                    candidateDigest: `sha256:${string}`;
                };
                targetIdentityDigest?: `sha256:${string}` | undefined;
            }[];
            response_digest: `sha256:${string}`;
        };
        context: {
            context_contract: "sourcey.catalog-verifier-identity-context/v1alpha1";
            query_digest: `sha256:${string}`;
            response_digest: `sha256:${string}`;
            live_parent_release_id: `sha256:${string}`;
            live_parent_release_sequence: number;
            issued_at: string;
            expires_at: string;
            context_digest: `sha256:${string}`;
            protected: {
                signature_purpose: "catalog-capture" | "catalog-evidence" | "catalog-identity" | "catalog-authority" | "catalog-attestation" | "catalog-verification" | "catalog-dispute" | "catalog-policy" | "catalog-release" | "catalog-feed";
                signer_registry_digest: string;
                key_id: string;
                algorithm: "ed25519";
                signature: string;
            };
        };
        signer_registry: {
            registry_contract: "sourcey.signer-registry/v1alpha1";
            generation: number;
            parent_registry_digest: string | null;
            issuers: {
                issuer_id: string;
                keys: {
                    key_id: string;
                    algorithm: "ed25519";
                    public_key_pem: string;
                    purposes: string[];
                    valid_from: string;
                    valid_until?: string | undefined;
                    compromised_after_sequence?: number | undefined;
                }[];
            }[];
            registry_digest: string;
            root_signatures: {
                key_id: string;
                algorithm: "ed25519";
                signature: string;
            }[];
        };
    };
    query: {
        query_contract: "sourcey.catalog-admission-conflict-query/v1alpha1";
        keys: {
            kind: "entity_id" | "entity_name" | "program_id" | "offer_id" | "offer_slug" | "program_slug" | "domain" | "entity_slug" | "entity_url" | "evidence_url" | "offer_url" | "semantic_offer";
            normalizedValue: string;
            keyDigest: `sha256:${string}`;
            candidateReference: string;
            candidateIdentityDigest?: `sha256:${string}` | undefined;
        }[];
        liveParentReleaseId: `sha256:${string}`;
        candidate: {
            kind: "git_pull_request";
            repository: string;
            pullRequestNumber: number;
            headSha: string;
        } | {
            kind: "detached";
            repositoryKind: "startup-credits" | "agent-readiness";
            candidateDigest: `sha256:${string}`;
            candidateReference: string;
        };
    };
    response: {
        response_contract: "sourcey.catalog-admission-conflict-response/v1alpha1";
        query_digest: `sha256:${string}`;
        matches: {
            keyDigest: `sha256:${string}`;
            targetReference: string;
            source: {
                kind: "current_catalog";
                liveParentReleaseId: `sha256:${string}`;
            } | {
                kind: "open_pull_request";
                repository: string;
                pullRequestNumber: number;
                headSha: string;
            } | {
                kind: "pending_git_lineage";
                repository: string;
                liveSourceCommit: string;
                targetCommit: string;
            } | {
                kind: "pending_submission";
                candidateReference: string;
                candidateDigest: `sha256:${string}`;
            };
            targetIdentityDigest?: `sha256:${string}` | undefined;
        }[];
        response_digest: `sha256:${string}`;
    };
    context: {
        context_contract: "sourcey.catalog-verifier-identity-context/v1alpha1";
        query_digest: `sha256:${string}`;
        response_digest: `sha256:${string}`;
        live_parent_release_id: `sha256:${string}`;
        live_parent_release_sequence: number;
        issued_at: string;
        expires_at: string;
        context_digest: `sha256:${string}`;
        protected: {
            signature_purpose: "catalog-capture" | "catalog-evidence" | "catalog-identity" | "catalog-authority" | "catalog-attestation" | "catalog-verification" | "catalog-dispute" | "catalog-policy" | "catalog-release" | "catalog-feed";
            signer_registry_digest: string;
            key_id: string;
            algorithm: "ed25519";
            signature: string;
        };
    };
};
export interface CatalogAdmissionKey {
    readonly kind: CatalogAdmissionKeyKind;
    readonly normalizedValue: string;
    readonly keyDigest: Digest;
    readonly candidateReference: string;
    readonly candidateIdentityDigest?: Digest | undefined;
}
export interface CatalogAdmissionKeyMatch {
    readonly keyDigest: Digest;
    readonly targetReference: string;
    readonly targetIdentityDigest?: Digest | undefined;
    readonly source: {
        readonly kind: "current_catalog";
        readonly liveParentReleaseId: Digest;
    } | {
        readonly kind: "open_pull_request";
        readonly repository: string;
        readonly pullRequestNumber: number;
        readonly headSha: string;
    } | {
        readonly kind: "pending_git_lineage";
        readonly repository: string;
        readonly liveSourceCommit: string;
        readonly targetCommit: string;
    } | {
        readonly kind: "pending_submission";
        readonly candidateReference: string;
        readonly candidateDigest: Digest;
    };
}
export interface CatalogAdmissionConflict {
    readonly kind: "domain" | "identity" | "slug" | "name" | "url" | "program" | "offer" | "semantic_offer" | "open_pull_request" | "pending_git_lineage" | "pending_submission";
    readonly strength: "exact" | "ambiguous";
    readonly keyDigest: Digest;
    readonly targetReferences: readonly string[];
    readonly sourceReferences: readonly string[];
}
/** Bounded current-state port. Adapters batch exact candidate keys only. */
export interface CatalogAdmissionConflictQuery {
    lookupAdmissionKeys(input: {
        readonly keys: readonly CatalogAdmissionKey[];
        readonly liveParentReleaseId: Digest;
        readonly candidate: CatalogAdmissionCandidate;
    }): Promise<readonly CatalogAdmissionKeyMatch[]>;
}
export declare function createCatalogAdmissionConflictLookupRequest(input: {
    readonly identities: readonly unknown[];
    readonly liveParentReleaseId: Digest;
    readonly candidate: CatalogAdmissionCandidate;
}): {
    query_contract: "sourcey.catalog-admission-conflict-query/v1alpha1";
    keys: {
        kind: "entity_id" | "entity_name" | "program_id" | "offer_id" | "offer_slug" | "program_slug" | "domain" | "entity_slug" | "entity_url" | "evidence_url" | "offer_url" | "semantic_offer";
        normalizedValue: string;
        keyDigest: `sha256:${string}`;
        candidateReference: string;
        candidateIdentityDigest?: `sha256:${string}` | undefined;
    }[];
    liveParentReleaseId: `sha256:${string}`;
    candidate: {
        kind: "git_pull_request";
        repository: string;
        pullRequestNumber: number;
        headSha: string;
    } | {
        kind: "detached";
        repositoryKind: "startup-credits" | "agent-readiness";
        candidateDigest: `sha256:${string}`;
        candidateReference: string;
    };
};
export type OpenPullRequestAdmissionCandidate = z.infer<typeof openPullRequestAdmissionCandidateSchema>;
export type OpenPullRequestAdmissionKey = z.infer<typeof openPullRequestAdmissionKeySchema>;
/** Derive once at capture; pending lookups need neither YAML nor normalized offer text. */
export declare function deriveOpenPullRequestAdmissionKeys(input: {
    readonly path: string;
    readonly document: unknown;
}): readonly OpenPullRequestAdmissionKey[];
export interface OpenPullRequestAdmissionCandidateReader {
    listOpenPullRequestAdmissionCandidates(repository: string, keyDigests: readonly Digest[]): Promise<readonly OpenPullRequestAdmissionCandidate[]>;
}
type DetachedCatalogAdmissionCandidate = Extract<CatalogAdmissionCandidate, {
    readonly kind: "detached";
}>;
export interface OpenPullRequestCatalogAdmissionConflictQueryConfiguration {
    readonly reader: OpenPullRequestAdmissionCandidateReader;
    readonly maximumOpenPullRequests?: number;
    /**
     * A detached candidate names its product collection, not a Git repository.
     * The host binds that collection to the one repository projection it owns.
     */
    readonly detachedRepository?: {
        readonly repositoryKind: DetachedCatalogAdmissionCandidate["repositoryKind"];
        readonly repository: string;
    };
}
/**
 * Query pending keys derived by the same authority as live Catalog state.
 * The reader returns only requested matches, never sibling authoring documents.
 */
export declare class OpenPullRequestCatalogAdmissionConflictQuery implements CatalogAdmissionConflictQuery {
    #private;
    constructor(configuration: OpenPullRequestCatalogAdmissionConflictQueryConfiguration);
    lookupAdmissionKeys(input: Parameters<CatalogAdmissionConflictQuery["lookupAdmissionKeys"]>[0]): Promise<CatalogAdmissionKeyMatch[]>;
}
export declare class CompositeCatalogAdmissionConflictQuery implements CatalogAdmissionConflictQuery {
    private readonly queries;
    constructor(queries: readonly CatalogAdmissionConflictQuery[]);
    lookupAdmissionKeys(input: Parameters<CatalogAdmissionConflictQuery["lookupAdmissionKeys"]>[0]): Promise<CatalogAdmissionKeyMatch[]>;
}
/**
 * Derive the cross-repository identity keys from the one shared Entity identity
 * envelope. Product repositories may add their own facts, but they cannot
 * redefine identity matching.
 */
export declare function deriveCatalogEntityIdentityAdmissionKeys(input: unknown): readonly CatalogAdmissionKey[];
/** The one slug key an entity authoring path proves without a parseable document. */
export declare function deriveOpenPullRequestPathAdmissionKeys(path: string): readonly CatalogAdmissionKey[];
/** Derive all exact conflict keys once from the canonical compiled candidate. */
export declare function deriveCatalogAdmissionKeys(input: unknown): readonly CatalogAdmissionKey[];
export declare function evaluateCatalogAdmissionConflicts(input: {
    readonly keys: readonly CatalogAdmissionKey[];
    readonly matches: readonly CatalogAdmissionKeyMatch[];
    readonly liveParentReleaseId: Digest;
    readonly candidate: CatalogAdmissionCandidate;
}): readonly CatalogAdmissionConflict[];
/**
 * Exact identity-envelope digest shared by admission projection and verifier
 * context. Retained Catalog documents and authoring files order aliases and
 * domains differently, so the digest reads the canonical envelope: one
 * identity has one digest wherever it was written.
 */
export declare function catalogEntityIdentityDigest(identity: unknown): Digest;
//# sourceMappingURL=admission-conflicts.d.ts.map