import type { AssetBindingProjection } from "../../../contracts/assets/src/index.js";
import type { EntityAuthoring } from "../../../contracts/authoring/src/index.js";
import { type CatalogPublicationCurrentState, type CatalogPublicationProposal } from "../../../contracts/publication/src/index.js";
/** Build one canonical targeted snapshot, never a catalog-wide projection. */
export declare function createCatalogPublicationCurrentState(input: unknown): CatalogPublicationCurrentState;
export declare function verifyCatalogPublicationCurrentState(input: unknown): CatalogPublicationCurrentState;
export declare class CatalogPublicationPreconditionError extends Error {
    readonly entityId: string;
    readonly role: "icon" | null;
    constructor(entityId: string, role: "icon" | null, message: string);
}
/** The same exact-state preconditions protect initial planning and rebased activation. */
export declare function assertCatalogPublicationPreconditions(input: {
    readonly expected: Pick<CatalogPublicationProposal, "expected_current_entities" | "expected_current_asset_bindings">;
    readonly currentEntities: readonly EntityAuthoring[];
    readonly currentAssetBindings: readonly AssetBindingProjection[];
}): void;
export declare function catalogPublicationStatePreconditions(input: CatalogPublicationCurrentState): Pick<CatalogPublicationProposal, "expected_current_entities" | "expected_current_asset_bindings">;
//# sourceMappingURL=publication-state.d.ts.map