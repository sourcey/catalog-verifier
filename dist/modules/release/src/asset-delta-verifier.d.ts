import type { AssetDelta } from "../../../contracts/assets/src/index.js";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import type { CatalogPublicationProposal } from "../../../contracts/publication/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
export declare function assertCatalogAssetDeltaClosure(input: {
    readonly baseAssetIndexDigest: Digest;
    readonly publicationProposal: CatalogPublicationProposal;
    readonly events: readonly CatalogEvent[];
    readonly assetDelta: AssetDelta | null;
    readonly safeAssetBytes: ReadonlyMap<Digest, Buffer>;
}): void;
//# sourceMappingURL=asset-delta-verifier.d.ts.map