import { type CatalogVerifierCandidateInput, type CatalogVerifierCriterion, type CatalogVerifierResult, type VerifierRepositoryKind } from "../../../contracts/catalog-verifier/src/index.js";
import type { CatalogTaxonomy } from "../../../contracts/taxonomy/src/index.js";
import { type CatalogAdmissionCandidate } from "../../../modules/catalog-admission/src/index.js";
export interface CatalogVerifierIdentityContextInput {
    readonly packet: unknown;
    readonly rootSet: unknown;
    readonly trustedRootDigest: string;
    readonly verifiedAt: string;
}
interface CatalogVerifierRepositoryInput {
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
    /**
     * The whole public check of one pull request head, as each data repository's validation
     * workflow runs it: every commit it adds is signed off, the live Catalog is signed under the
     * root the repository trusts, Sourcey issues the identity context for the exact candidate keys,
     * and the change closes against that context.
     */
    validatePullRequest(input: CatalogVerifierRepositoryInput & {
        readonly repository: string;
        readonly pullRequestNumber: number;
        readonly rootSet: unknown;
        readonly trustedRootDigest: string;
        /** Sourcey's API origin, such as https://api.sourcey.com. */
        readonly api: URL;
        readonly fetch?: typeof fetch;
        readonly now?: () => Date;
    }): Promise<CatalogVerifierResult>;
    createRepositoryIdentityContextRequest(input: CatalogVerifierRepositoryInput & {
        readonly liveParentReleaseId: string;
        readonly candidate: CatalogAdmissionCandidate;
    }): Promise<{
        query_contract: "sourcey.catalog-admission-conflict-query/v1alpha1";
        keys: {
            kind: "domain" | "entity_id" | "entity_name" | "entity_slug" | "entity_url" | "evidence_url" | "offer_id" | "offer_slug" | "offer_url" | "program_id" | "program_slug" | "semantic_offer";
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
            repositoryKind: "agent-readiness" | "startup-credits";
            candidateDigest: `sha256:${string}`;
            candidateReference: string;
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
            kind: "domain" | "entity_id" | "entity_name" | "entity_slug" | "entity_url" | "evidence_url" | "offer_id" | "offer_slug" | "offer_url" | "program_id" | "program_slug" | "semantic_offer";
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
            repositoryKind: "agent-readiness" | "startup-credits";
            candidateDigest: `sha256:${string}`;
            candidateReference: string;
        };
    };
    verifyRelease(input: {
        readonly directory: string;
        readonly trustedRootDigest: string;
    }): Promise<CatalogVerifierResult>;
}
export {};
//# sourceMappingURL=application.d.ts.map