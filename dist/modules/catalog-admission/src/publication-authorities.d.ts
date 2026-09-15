import type { CatalogPublicationProposal } from "../../../contracts/publication/src/index.js";
type AuthorityProposal = CatalogPublicationProposal["authority_proposals"][number];
export declare function normalizeCatalogPublicationAuthorityProposals(proposals: readonly AuthorityProposal[]): AuthorityProposal[];
export declare function mergeCatalogPublicationAuthorityProposalLanes(...lanes: readonly (readonly AuthorityProposal[])[]): AuthorityProposal[];
export {};
//# sourceMappingURL=publication-authorities.d.ts.map