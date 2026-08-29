import { type CatalogSubmissionProcessingResult, type CatalogSubmissionWorkItem } from "../../../contracts/api/src/index.js";
import type { AssetBindingProjection, EntityAssetProposal, EntityAssetSubmission } from "../../../contracts/assets/src/index.js";
import type { EntityAuthoring } from "../../../contracts/authoring/src/index.js";
import type { SignaturePurpose } from "../../../contracts/authority/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
import { type CatalogPublicationImpactIndex, type CatalogPublicationPolicyReference } from "./publication.js";
export declare function verifyCatalogSubmissionWorkItem(input: unknown): CatalogSubmissionWorkItem;
export declare function catalogSubmissionCandidates(input: CatalogSubmissionWorkItem): {
    readonly candidateEntities: readonly EntityAuthoring[];
    readonly assetSubmissions: readonly EntityAssetSubmission[];
    readonly targetEntityIds: readonly string[];
};
export declare function catalogSubmissionAwaitingReviewResult(input: CatalogSubmissionWorkItem): CatalogSubmissionProcessingResult;
export declare function planCatalogSubmissionPublication(input: {
    readonly workItem: CatalogSubmissionWorkItem;
    readonly currentEntities: readonly EntityAuthoring[];
    readonly currentAssetBindings?: readonly AssetBindingProjection[];
    readonly candidateAssetProposals?: readonly EntityAssetProposal[];
    readonly authorityProposals?: readonly {
        readonly purpose: SignaturePurpose;
        readonly proposal_digest: string;
    }[];
    readonly currentPolicies: readonly CatalogPublicationPolicyReference[];
    readonly targetPolicies: readonly CatalogPublicationPolicyReference[];
    readonly currentContractAuthorityDigest: Digest;
    readonly targetContractAuthorityDigest: Digest;
    readonly impactIndex?: CatalogPublicationImpactIndex;
}): {
    publicationAuthorized: boolean;
    targetEntityIds: readonly string[];
    ingressReceipt: import("../../../contracts/publication/src/index.js").PublicationIngressReceipt;
    proposal: import("../../../contracts/publication/src/index.js").CatalogPublicationProposal;
    changeSet: import("../../../contracts/publication/src/index.js").CatalogPublicationChangeSet;
};
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
export declare function catalogSubmissionMissingAdmissionPurposes(planned: ReturnType<typeof planCatalogSubmissionPublication>): SignaturePurpose[];
//# sourceMappingURL=submission.d.ts.map