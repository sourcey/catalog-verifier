import { type CatalogVerifierCandidateInput, type CatalogVerifierCriterion, type CatalogVerifierResult, type VerifierRepositoryKind } from "../../../contracts/catalog-verifier/src/index.js";
import type { CatalogTaxonomy } from "../../../contracts/taxonomy/src/index.js";
import { type CatalogAdmissionCandidate } from "../../../modules/catalog-admission/src/index.js";
export interface CatalogVerifierIdentityContextInput {
    readonly packet: unknown;
    readonly rootSet: unknown;
    readonly trustedRootDigest: string;
    readonly verifiedAt: string;
}
export interface CatalogVerifierRepositoryInput {
    readonly repositoryKind: VerifierRepositoryKind;
    readonly repositoryRoot: string;
    readonly baseRevision: string;
    readonly headRevision: string;
    readonly taxonomy?: CatalogTaxonomy;
}
export declare class CatalogVerifierApplication {
    explain(repositoryKind: VerifierRepositoryKind): readonly CatalogVerifierCriterion[];
    validateRepositoryChange(input: {
        readonly repositoryKind: VerifierRepositoryKind;
        readonly repositoryRoot: string;
        readonly baseRevision: string;
        readonly headRevision: string;
        readonly taxonomy?: CatalogTaxonomy;
        readonly candidate: CatalogAdmissionCandidate;
        readonly identityContext: CatalogVerifierIdentityContextInput;
    }): Promise<CatalogVerifierResult>;
    createRepositoryIdentityContextRequest(input: CatalogVerifierRepositoryInput & {
        readonly liveParentReleaseId: string;
        readonly candidate: CatalogAdmissionCandidate;
    }): Promise<{
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
        };
    }>;
    validateCandidate(input: CatalogVerifierCandidateInput & {
        readonly candidate: CatalogAdmissionCandidate;
        readonly identityContext: CatalogVerifierIdentityContextInput;
    }): CatalogVerifierResult;
    createCandidateIdentityContextRequest(input: CatalogVerifierCandidateInput & {
        readonly liveParentReleaseId: string;
        readonly candidate?: CatalogAdmissionCandidate;
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
        };
    };
    verifyRelease(input: {
        readonly directory: string;
        readonly trustedRootDigest: string;
    }): Promise<CatalogVerifierResult>;
}
export declare function validateCatalogCandidate(input: CatalogVerifierCandidateInput & {
    readonly candidate: CatalogAdmissionCandidate;
    readonly identityContext: CatalogVerifierIdentityContextInput;
}): CatalogVerifierResult;
//# sourceMappingURL=application.d.ts.map