import { type Digest } from "provenry/primitives";
import { type CatalogSubmissionProcessingResult, type CatalogSubmissionWorkItem } from "../../../contracts/api/src/index.js";
import type { EntityAssetProposal, EntityAssetSubmission } from "../../../contracts/assets/src/index.js";
import type { SignaturePurpose } from "../../../contracts/authority/src/index.js";
import type { CatalogPublicationCurrentState, CatalogPublicationProposal } from "../../../contracts/publication/src/index.js";
import { type CatalogPublicationImpactQuery, type CatalogPublicationPolicyReference } from "./publication.js";
import { verifyCatalogPublicationInputClosure } from "./publication-composition.js";
import type { CatalogPublicationPreconditionError } from "./publication-state.js";
import { verifyCatalogSubmissionPublicationState } from "./submission-state.js";
export { catalogSubmissionCandidates, verifyCatalogSubmissionWorkItem, } from "./submission-input.js";
export declare function catalogSubmissionAwaitingReviewResult(input: Parameters<typeof verifyCatalogSubmissionPublicationState>[0]): CatalogSubmissionProcessingResult;
export declare function catalogSubmissionInvalidatedResult(input: {
    readonly workItem: CatalogSubmissionWorkItem;
    readonly currentState: CatalogPublicationCurrentState;
    readonly conflict: CatalogPublicationPreconditionError;
}): CatalogSubmissionProcessingResult;
export declare function planCatalogSubmissionPublication(input: {
    readonly workItem: CatalogSubmissionWorkItem;
    readonly baseState: CatalogPublicationCurrentState;
    readonly currentState: CatalogPublicationCurrentState;
    readonly candidateAssetProposals?: readonly EntityAssetProposal[];
    readonly authorityProposals?: Readonly<CatalogPublicationProposal["authority_proposals"]>;
    readonly currentPolicies: readonly CatalogPublicationPolicyReference[];
    readonly targetPolicies: readonly CatalogPublicationPolicyReference[];
    readonly currentContractAuthorityDigest: Digest;
    readonly targetContractAuthorityDigest: Digest;
    readonly impactIndex?: CatalogPublicationImpactQuery;
}): {
    proposal: CatalogPublicationProposal;
    changeSet: import("../../../contracts/publication/src/index.js").CatalogPublicationChangeSet;
    ingressReceipt: {
        proposal_digest: string;
        semantic_input_digest: string;
        kind: "git";
        repository_id: string;
        base_commit: string;
        head_commit: string;
        head_tree: string;
        changed_tree: string;
        receipt_digest: string;
    } | {
        proposal_digest: string;
        semantic_input_digest: string;
        kind: "authenticated_form";
        submission_work_item_digest: string;
        schema_digest: string;
        payload_digest: string;
        authentication_digest: string;
        authorization_digest: string;
        operator_admission_digest: string | null;
        idempotency_key: string;
        receipt_digest: string;
    } | {
        proposal_digest: string;
        semantic_input_digest: string;
        kind: "paid_agent";
        submission_work_item_digest: string;
        schema_digest: string;
        payload_digest: string;
        authentication_digest: string;
        authorization_digest: string;
        operator_admission_digest: string | null;
        request_id: string;
        idempotency_key: string;
        receipt_digest: string;
    } | {
        proposal_digest: string;
        semantic_input_digest: string;
        kind: "governed_ops";
        submission_work_item_digest: string | null;
        command_digest: string;
        grant_digest: string;
        approval_digest: string | null;
        run_receipt_digest: string;
        authentication_digest: string;
        authorization_digest: string;
        idempotency_key: string;
        receipt_digest: string;
    } | {
        proposal_digest: string;
        semantic_input_digest: string;
        kind: "scanner";
        inventory_digest: string;
        run_receipt_digest: string;
        idempotency_key: string;
        receipt_digest: string;
    } | {
        proposal_digest: string;
        semantic_input_digest: string;
        kind: "operator_job";
        job_input_digest: string;
        authority_digest: string;
        run_receipt_digest: string;
        idempotency_key: string;
        receipt_digest: string;
    } | {
        proposal_digest: string;
        semantic_input_digest: string;
        kind: "policy_transition";
        intent_digest: string;
        configuration_digest: string;
        idempotency_key: string;
        receipt_digest: string;
    };
    publicationAuthorized: boolean;
    targetEntityIds: readonly string[];
};
/** Binds retained submission work to already verified publication inputs.
 * This does not replan against current state or assert that the release is live. */
export declare function verifyCatalogSubmissionPublication(input: Parameters<typeof verifyCatalogPublicationInputClosure>[0] & {
    readonly workItem: CatalogSubmissionWorkItem;
}): ReturnType<typeof planCatalogSubmissionPublication>;
export declare function catalogSubmissionAssetProposalMatches(submission: EntityAssetSubmission, proposal: EntityAssetProposal): boolean;
export declare function catalogSubmissionAwaitingResult(planned: ReturnType<typeof planCatalogSubmissionPublication>): CatalogSubmissionProcessingResult;
export declare function catalogSubmissionPublishedResult(input: {
    readonly planned: ReturnType<typeof planCatalogSubmissionPublication>;
    readonly publicationReleaseId: Digest;
    readonly activeMs: number;
    readonly liveReadbackMs: number;
    readonly cacheReuse?: {
        readonly reused: number;
        readonly created: number;
    };
}): CatalogSubmissionProcessingResult;
export declare function assertCatalogSubmissionPublicationReady(planned: ReturnType<typeof planCatalogSubmissionPublication>): void;
export declare function catalogSubmissionMissingAdmissionPurposes(planned: ReturnType<typeof planCatalogSubmissionPublication>): SignaturePurpose[];
//# sourceMappingURL=submission.d.ts.map