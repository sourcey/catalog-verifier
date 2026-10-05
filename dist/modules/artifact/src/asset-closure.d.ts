import type { CanonicalArtifact } from "../../../contracts/artifact/src/index.js";
import type { assetIndexSchema, assetInputsSchema, assetNoticesSchema } from "../../../contracts/assets/src/index.js";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import type { CatalogReleaseBundle } from "../../../contracts/release/src/index.js";
/**
 * Served asset bytes close through their verified byte declarations: the envelope
 * already proved each file against them.
 */
export declare function assertReleasedAssetClosure(input: {
    readonly artifact: CanonicalArtifact;
    readonly events: readonly CatalogEvent[];
    readonly declarations: CatalogReleaseBundle["files"];
    readonly index: ReturnType<typeof assetIndexSchema.parse>;
    readonly notices: ReturnType<typeof assetNoticesSchema.parse>;
    readonly inputs: ReturnType<typeof assetInputsSchema.parse>;
}): void;
//# sourceMappingURL=asset-closure.d.ts.map