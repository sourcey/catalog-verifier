import type { AssetBindingProjection, EntityAssetProposal } from "../../../contracts/assets/src/index.js";
export declare function catalogPublicationAssetBindingKey(entityId: string, role: string): string;
export declare function catalogPublicationAssetBindingMap(bindings: readonly AssetBindingProjection[]): Map<string, AssetBindingProjection>;
export declare function normalizeCatalogPublicationAssetProposals(proposals: readonly EntityAssetProposal[]): EntityAssetProposal[];
//# sourceMappingURL=publication-assets.d.ts.map