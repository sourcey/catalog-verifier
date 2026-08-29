import type { AssetBindingProjection, EntityAssetProposal } from "../../../contracts/assets/src/index.js";
import type { EntityAuthoring } from "../../../contracts/authoring/src/index.js";
import { type CatalogPublicationChangeSet, type CatalogPublicationCurrentState, type CatalogPublicationProposal, type PublicationIngressReceipt, type PublicationIngressReceiptCore } from "../../../contracts/publication/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
import { CatalogPublicationImpactIndex } from "./publication-dependencies.js";
export * from "./publication-dependencies.js";
export * from "./publication-entities.js";
export * from "./publication-recomposition.js";
export interface CatalogPublicationPolicyReference {
    readonly key: string;
    readonly digest: Digest;
}
export interface CatalogPublicationPlanningInput {
    readonly liveParentReleaseId: Digest;
    readonly currentEntities: readonly EntityAuthoring[];
    readonly candidateEntities: readonly EntityAuthoring[];
    readonly currentAssetBindings?: readonly AssetBindingProjection[];
    readonly candidateAssetProposals?: readonly EntityAssetProposal[];
    readonly removeEntityIds?: readonly string[];
    readonly authorityProposals?: readonly CatalogPublicationAuthorityProposal[];
    readonly currentPolicies: readonly CatalogPublicationPolicyReference[];
    readonly targetPolicies: readonly CatalogPublicationPolicyReference[];
    readonly currentContractAuthorityDigest: Digest;
    readonly targetContractAuthorityDigest: Digest;
    readonly impactIndex?: CatalogPublicationImpactIndex;
}
export interface CatalogPublicationAuthorityProposal {
    readonly purpose: CatalogPublicationChangeSet["required_authorities"][number];
    readonly proposal_digest: string;
}
export interface PlannedCatalogPublication {
    readonly proposal: CatalogPublicationProposal;
    readonly changeSet: CatalogPublicationChangeSet;
}
export interface PlannedCatalogPublicationIngress extends PlannedCatalogPublication {
    readonly ingressReceipt: PublicationIngressReceipt;
}
export declare function verifyCatalogPublicationCurrentState(input: unknown): CatalogPublicationCurrentState;
export interface CatalogCandidateChanges {
    readonly revisionChanges: CatalogPublicationChangeSet["revision_changes"];
    readonly sourceChanges: CatalogPublicationChangeSet["source_changes"];
    readonly routeChanges: CatalogPublicationChangeSet["route_changes"];
    readonly publicAuthoringPaths: readonly string[];
}
type IngressReceiptDetails<Kind extends PublicationIngressReceiptCore["kind"]> = Kind extends PublicationIngressReceiptCore["kind"] ? Omit<Extract<PublicationIngressReceiptCore, {
    readonly kind: Kind;
}>, "proposal_digest" | "semantic_input_digest"> : never;
export declare function buildCatalogPublicationProposal(input: Omit<CatalogPublicationPlanningInput, "impactIndex">): CatalogPublicationProposal;
export declare function verifyCatalogPublicationProposal(input: unknown): CatalogPublicationProposal;
export declare function planCatalogPublication(input: CatalogPublicationPlanningInput): PlannedCatalogPublication;
export declare function deriveCatalogPublicationChangeSet(input: {
    readonly proposal: CatalogPublicationProposal;
    readonly currentEntities: readonly EntityAuthoring[];
    readonly currentAssetBindings?: readonly AssetBindingProjection[];
    readonly currentPolicies: readonly CatalogPublicationPolicyReference[];
    readonly currentContractAuthorityDigest: Digest;
    readonly impactIndex?: CatalogPublicationImpactIndex;
}): CatalogPublicationChangeSet;
export declare function verifyCatalogPublicationChangeSet(input: unknown): CatalogPublicationChangeSet;
/**
 * The sole semantic diff over targeted Catalog Entity snapshots. Git review,
 * non-Git proposal adapters, evidence planning, and release composition derive
 * their changed revision set from this function.
 */
export declare function analyzeCatalogCandidateChanges(input: {
    readonly currentEntities: readonly EntityAuthoring[];
    readonly candidateEntities: readonly EntityAuthoring[];
}): CatalogCandidateChanges;
export declare function publicationSemanticInputDigest(proposal: CatalogPublicationProposal): Digest;
export declare function buildPublicationIngressReceipt(proposal: CatalogPublicationProposal, input: IngressReceiptDetails<PublicationIngressReceiptCore["kind"]>): PublicationIngressReceipt;
export declare function verifyPublicationIngressReceipt(input: unknown): PublicationIngressReceipt;
export declare function verifyCatalogPublicationInputClosure(input: {
    readonly proposal: CatalogPublicationProposal;
    readonly changeSet: CatalogPublicationChangeSet;
    readonly ingressReceipts: readonly PublicationIngressReceipt[];
}): {
    readonly proposal: CatalogPublicationProposal;
    readonly changeSet: CatalogPublicationChangeSet;
    readonly ingressReceipts: readonly PublicationIngressReceipt[];
};
export declare function catalogPublicationAdmittedInputDigests(input: {
    readonly proposal: CatalogPublicationProposal;
    readonly changeSet: CatalogPublicationChangeSet;
    readonly ingressReceipts: readonly PublicationIngressReceipt[];
}): Digest[];
export declare function planAuthenticatedFormCatalogPublication(input: CatalogPublicationPlanningInput, receipt: IngressReceiptDetails<"authenticated_form">): PlannedCatalogPublicationIngress;
export declare function planPaidAgentCatalogPublication(input: CatalogPublicationPlanningInput, receipt: IngressReceiptDetails<"paid_agent">): PlannedCatalogPublicationIngress;
export declare function planGovernedOpsCatalogPublication(input: CatalogPublicationPlanningInput, receipt: IngressReceiptDetails<"governed_ops">): PlannedCatalogPublicationIngress;
export declare function planScannerCatalogPublication(input: CatalogPublicationPlanningInput, receipt: IngressReceiptDetails<"scanner">): PlannedCatalogPublicationIngress;
export declare function planOperatorJobCatalogPublication(input: CatalogPublicationPlanningInput, receipt: IngressReceiptDetails<"operator_job">): PlannedCatalogPublicationIngress;
export declare function planPolicyTransitionCatalogPublication(input: CatalogPublicationPlanningInput, receipt: IngressReceiptDetails<"policy_transition">): PlannedCatalogPublicationIngress;
//# sourceMappingURL=publication.d.ts.map