import type { AssetBindingProjection, EntityAssetProposal } from "../../../contracts/assets/src/index.js";
import { type EntityAuthoring } from "../../../contracts/authoring/src/index.js";
import { type CatalogTaxonomy } from "../../../contracts/taxonomy/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
import { type CatalogChangeAnalysis } from "./change-analysis.js";
import { type CatalogPublicationImpactIndex, type CatalogPublicationPlanningInput, type CatalogPublicationPolicyReference } from "./publication.js";
export { validateCatalogCandidateSources } from "../../catalog-authoring-validation/src/index.js";
export * from "./admission-conflicts.js";
export * from "./change-analysis.js";
export * from "./machine-admission.js";
export * from "./publication.js";
export * from "./publication-composition.js";
export * from "./submission.js";
export declare const CATALOG_ENTITY_ROOT = "entities";
export declare function readCatalogTaxonomy(path: string): Promise<CatalogTaxonomy>;
/**
 * Resolve a deterministic Git tree containing only the exact changed Entity
 * files. This is the admission identity: unrelated repository and Catalog
 * changes cannot invalidate an independently reviewed pull request.
 */
export declare function resolveCatalogChangeTree(input: {
    readonly repositoryRoot: string;
    readonly revision: string;
    readonly entityFiles: readonly string[];
}): Promise<string>;
export declare function validateCatalogPrTree(input: {
    readonly repositoryRoot: string;
    readonly baseRevision: string;
    readonly headRevision: string;
    readonly taxonomy: CatalogTaxonomy;
}): Promise<{
    readonly entities: number;
    readonly programs: number;
    readonly offers: number;
}>;
/**
 * Validate explicit non-Git candidate bytes through the same compiler,
 * taxonomy, path, and role-closure rules used by changed-repository intake.
 * Transport-specific Git checks remain in validateCatalogPrTree.
 */
export declare function inspectCatalogPrTree(input: {
    readonly repositoryRoot: string;
    readonly baseRevision: string;
    readonly headRevision: string;
    readonly taxonomy: CatalogTaxonomy;
}): Promise<{
    readonly baseRevision: string;
    readonly entityFiles: readonly string[];
    readonly entities: number;
    readonly programs: number;
    readonly offers: number;
}>;
/**
 * The one exact pull-request analysis used by changed-closure validation,
 * private review preparation, and tree-bound admission. It reads only the
 * changed Entity files, their identity dependencies, and the corresponding
 * base versions of those same files.
 */
export declare function analyzeCatalogPrTree(input: {
    readonly repositoryRoot: string;
    readonly baseRevision: string;
    readonly headRevision: string;
    readonly taxonomy: CatalogTaxonomy;
}): Promise<CatalogChangeAnalysis>;
/**
 * Release construction uses the same changed-file and revision analysis as PR
 * validation while permitting unrelated documentation and workflow commits
 * that do not belong to Catalog data.
 */
export declare function analyzeCatalogReleaseTree(input: {
    readonly repositoryRoot: string;
    readonly baseRevision: string;
    readonly headRevision: string;
    readonly taxonomy: CatalogTaxonomy;
}): Promise<CatalogChangeAnalysis>;
/**
 * Analyze a data PR for admission against the release that is actually live.
 *
 * The PR comparison remains authoritative for its mutation boundary: it must
 * be data-only and identify every vendor the contributor changed. When main is
 * ahead of the live release, the release-relative comparison supplies the
 * complete final revisions that will be admitted. This permits a follow-up PR
 * to correct an unshipped version of the same vendor and permits independently
 * admitted vendor paths to advance without expanding this PR's authority.
 */
export declare function analyzeCatalogPrAdmissionTree(input: {
    readonly repositoryRoot: string;
    readonly liveRevision: string;
    readonly pullRequestBaseRevision: string;
    readonly pullRequestHeadRevision: string;
    readonly taxonomy: CatalogTaxonomy;
}): Promise<CatalogChangeAnalysis>;
/**
 * Git is one immutable ingress adapter over the canonical publication port.
 * Repository objects remain receipt metadata; they do not alter semantic
 * proposal or Change Set bytes produced by another ingress for the same state.
 */
export declare function planCatalogGitPublication(input: {
    readonly repositoryId: string;
    readonly repositoryRoot: string;
    readonly liveRevision: string;
    readonly headRevision: string;
    readonly liveParentReleaseId: Digest;
    readonly currentEntities: readonly EntityAuthoring[];
    readonly currentAssetBindings?: readonly AssetBindingProjection[];
    readonly candidateAssetProposals?: readonly EntityAssetProposal[];
    readonly authorityProposals?: CatalogPublicationPlanningInput["authorityProposals"];
    readonly taxonomy: CatalogTaxonomy;
    readonly currentPolicies: readonly CatalogPublicationPolicyReference[];
    readonly targetPolicies: readonly CatalogPublicationPolicyReference[];
    readonly currentContractAuthorityDigest: Digest;
    readonly targetContractAuthorityDigest: Digest;
    readonly impactIndex?: CatalogPublicationImpactIndex;
}): Promise<{
    analysis: CatalogChangeAnalysis;
    ingressReceipt: {
        kind: "git";
        repository_id: string;
        base_commit: string;
        head_commit: string;
        head_tree: string;
        changed_tree: string;
        proposal_digest: string;
        semantic_input_digest: string;
        receipt_digest: string;
    } | {
        kind: "authenticated_form";
        submission_work_item_digest: string;
        schema_digest: string;
        payload_digest: string;
        authentication_digest: string;
        authorization_digest: string;
        operator_admission_digest: string | null;
        idempotency_key: string;
        proposal_digest: string;
        semantic_input_digest: string;
        receipt_digest: string;
    } | {
        kind: "paid_agent";
        submission_work_item_digest: string;
        schema_digest: string;
        payload_digest: string;
        authentication_digest: string;
        authorization_digest: string;
        operator_admission_digest: string | null;
        request_id: string;
        idempotency_key: string;
        proposal_digest: string;
        semantic_input_digest: string;
        receipt_digest: string;
    } | {
        kind: "governed_ops";
        submission_work_item_digest: string | null;
        command_digest: string;
        grant_digest: string;
        approval_digest: string | null;
        run_receipt_digest: string;
        authentication_digest: string;
        authorization_digest: string;
        idempotency_key: string;
        proposal_digest: string;
        semantic_input_digest: string;
        receipt_digest: string;
    } | {
        kind: "scanner";
        inventory_digest: string;
        run_receipt_digest: string;
        idempotency_key: string;
        proposal_digest: string;
        semantic_input_digest: string;
        receipt_digest: string;
    } | {
        kind: "operator_job";
        job_input_digest: string;
        authority_digest: string;
        run_receipt_digest: string;
        idempotency_key: string;
        proposal_digest: string;
        semantic_input_digest: string;
        receipt_digest: string;
    } | {
        kind: "policy_transition";
        intent_digest: string;
        configuration_digest: string;
        idempotency_key: string;
        proposal_digest: string;
        semantic_input_digest: string;
        receipt_digest: string;
    };
    proposal: import("../../../contracts/publication/src/index.js").CatalogPublicationProposal;
    changeSet: import("../../../contracts/publication/src/index.js").CatalogPublicationChangeSet;
}>;
export declare function catalogPullRequestComparisonBase(input: {
    readonly repositoryRoot: string;
    readonly baseRevision: string;
    readonly headRevision: string;
}): Promise<string>;
export declare function catalogChangedPaths(input: {
    readonly repositoryRoot: string;
    readonly baseRevision: string;
    readonly headRevision: string;
}): Promise<{
    readonly entityFiles: string[];
    readonly otherFiles: string[];
    /** Entity-root changes the policy cannot admit (renames, copies, deletions), as `status:path`. */
    readonly unsupportedChanges: string[];
}>;
/**
 * A PR may independently trail the live release when its changed vendor paths
 * do not overlap intervening live changes. A base ahead of live may contain
 * independently admitted Entity changes; they do not enter this PR's changed
 * tree. An unpublished predecessor is permitted when the PR explicitly
 * changes that same vendor again, so review covers its final state relative to
 * live.
 */
export declare function validateCatalogPrReleaseBase(input: {
    readonly repositoryRoot: string;
    readonly liveRevision: string;
    readonly pullRequestBaseRevision: string;
    readonly pullRequestHeadRevision: string;
}): Promise<void>;
//# sourceMappingURL=index.d.ts.map