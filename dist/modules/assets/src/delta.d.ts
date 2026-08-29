import type { AssetBindingProjection, AssetDelta, EntityAssetProposal } from "../../../contracts/assets/src/index.js";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
export declare function buildAssetDelta(input: {
    readonly parentAssetIndexDigest: Digest;
    readonly proposals: readonly EntityAssetProposal[];
    readonly events: readonly CatalogEvent[];
    readonly currentBindings: readonly AssetBindingProjection[];
    readonly removedEntityIds?: readonly string[];
}): AssetDelta;
export declare function assetIndexTransitionDigest(delta: AssetDelta): Digest;
export declare function applyAssetDelta(input: {
    readonly currentBindings: readonly AssetBindingProjection[];
    readonly delta: AssetDelta;
    readonly requiredEntityIds?: ReadonlySet<string>;
}): readonly AssetBindingProjection[];
export declare function eventMatchesEntityAssetProposal(event: CatalogEvent, proposal: EntityAssetProposal): boolean;
//# sourceMappingURL=delta.d.ts.map