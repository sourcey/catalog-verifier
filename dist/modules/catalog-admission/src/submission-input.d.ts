import { type Digest } from "provenry/primitives";
import { type CatalogSubmissionAuthoringFile, type CatalogSubmissionOperatorAdmission, type CatalogSubmissionRequest, type CatalogSubmissionWorkItem } from "../../../contracts/api/src/index.js";
import type { EntityAssetSubmission } from "../../../contracts/assets/src/index.js";
import type { EntityAuthoring } from "../../../contracts/authoring/src/index.js";
export declare function reviewedAssetWorkItemDigest(workItem: {
    readonly work_item_digest: string;
    readonly operator_admission: {
        readonly prior_work_item_digest: string;
    } | null;
}): Digest;
export declare function catalogSubmissionAdmissionArtifactDigests(workItem: CatalogSubmissionWorkItem): Digest[];
/** Pure authoring inspection for intake; publication still runs the compiler. */
export declare function catalogSubmissionRequestCandidates(input: CatalogSubmissionRequest): {
    readonly candidateEntities: readonly EntityAuthoring[];
    readonly assetSubmissions: readonly EntityAssetSubmission[];
    readonly targetEntityIds: readonly string[];
};
export declare function catalogSubmissionPayloadDigest(input: CatalogSubmissionRequest): Digest;
/** A corrected admission still binds the original immutable submission, never a replacement customer request. */
export declare function catalogSubmissionWithOperatorAdmission(input: {
    readonly workItem: CatalogSubmissionWorkItem;
    readonly admission: Pick<CatalogSubmissionOperatorAdmission, "reviewed_authoring_files" | "admission_artifact_digests" | "operator_id" | "publication_authorization_digest" | "attached_at">;
}): CatalogSubmissionWorkItem;
export declare function verifyCatalogSubmissionWorkItem(input: unknown): CatalogSubmissionWorkItem;
export declare function catalogSubmissionCandidates(input: CatalogSubmissionWorkItem): {
    readonly candidateEntities: readonly EntityAuthoring[];
    readonly assetSubmissions: readonly EntityAssetSubmission[];
    readonly targetEntityIds: readonly string[];
};
/**
 * Validate a prospective operator correction before an immutable admission
 * exists. Review applications use this to evaluate the exact repaired bytes;
 * attaching authority remains a later, separately protected transition.
 */
export declare function catalogSubmissionReviewCandidates(input: {
    readonly workItem: CatalogSubmissionWorkItem;
    readonly reviewedAuthoringFiles: readonly CatalogSubmissionAuthoringFile[];
}): {
    readonly candidateEntities: readonly EntityAuthoring[];
    readonly assetSubmissions: readonly EntityAssetSubmission[];
    readonly targetEntityIds: readonly string[];
    readonly reviewedPayloadDigest: Digest;
};
//# sourceMappingURL=submission-input.d.ts.map