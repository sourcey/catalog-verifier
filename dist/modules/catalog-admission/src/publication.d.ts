import { type Digest } from "provenry/primitives";
import type { AssetBindingProjection, EntityAssetProposal } from "../../../contracts/assets/src/index.js";
import type { EntityAuthoring } from "../../../contracts/authoring/src/index.js";
import { type CatalogPublicationChangeSet, type CatalogPublicationProposal, type PublicationIngressReceipt, type PublicationIngressReceiptCore } from "../../../contracts/publication/src/index.js";
import { type CatalogPublicationImpactQuery } from "./publication-dependencies.js";
export * from "./publication-dependencies.js";
export * from "./publication-entities.js";
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
    readonly impactIndex?: CatalogPublicationImpactQuery;
}
type CatalogPublicationAuthorityProposal = CatalogPublicationProposal["authority_proposals"][number];
export interface PlannedCatalogPublication {
    readonly proposal: CatalogPublicationProposal;
    readonly changeSet: CatalogPublicationChangeSet;
}
interface PlannedCatalogPublicationIngress extends PlannedCatalogPublication {
    readonly ingressReceipt: PublicationIngressReceipt;
}
export { verifyCatalogPublicationCurrentState } from "./publication-state.js";
interface CatalogCandidateChanges {
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
    readonly impactIndex?: CatalogPublicationImpactQuery;
}): CatalogPublicationChangeSet;
/** Resolve impact after a bounded batch's exact authored changes are known.
 * Proposal, ingress authority and change analysis remain unchanged. This is the
 * same impact derivation as the ordinary planner, not a second diff or score. */
export declare function resolveCatalogPublicationImpact(analysis: CatalogPublicationChangeSet, impactIndex: CatalogPublicationImpactQuery): CatalogPublicationChangeSet;
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
export declare function planOperatorJobCatalogPublication(input: CatalogPublicationPlanningInput & {
    /** Operator jobs plan against an exact retained state, including assets. */
    readonly currentAssetBindings: readonly AssetBindingProjection[];
}, receipt: IngressReceiptDetails<"operator_job">): PlannedCatalogPublicationIngress;
export declare function planPolicyTransitionCatalogPublication(input: CatalogPublicationPlanningInput, receipt: IngressReceiptDetails<"policy_transition">): PlannedCatalogPublicationIngress;
export declare function catalogPublicationPolicyChanges(current: readonly {
    readonly key: string;
    readonly digest: string;
}[], target: readonly {
    readonly key: string;
    readonly digest: string;
}[]): {
    kind: "policy";
    key: string;
    current_digest: string | null;
    target_digest: string | null;
}[];
//# sourceMappingURL=publication.d.ts.map