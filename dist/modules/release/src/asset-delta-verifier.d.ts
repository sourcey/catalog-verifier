import type { Digest } from "provenry/primitives";
import type { AssetDelta } from "../../../contracts/assets/src/index.js";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import type { CatalogPublicationProposal } from "../../../contracts/publication/src/index.js";
export declare function assertCatalogAssetDeltaClosure(input: {
    readonly baseAssetIndexDigest: Digest;
    readonly publicationProposal: CatalogPublicationProposal;
    readonly events: readonly CatalogEvent[];
    readonly assetDelta: AssetDelta | null;
    /** Safe bytes keyed by the digest they are already proven to match. */
    readonly safeAssetBytes: ReadonlyMap<Digest, Buffer>;
}): void;
//# sourceMappingURL=asset-delta-verifier.d.ts.map