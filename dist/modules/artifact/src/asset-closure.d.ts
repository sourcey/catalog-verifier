import type { CanonicalArtifact } from "../../../contracts/artifact/src/index.js";
import type { assetIndexSchema, assetInputsSchema, assetNoticesSchema } from "../../../contracts/assets/src/index.js";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
export declare function assertReleasedAssetClosure(input: {
    readonly artifact: CanonicalArtifact;
    readonly events: readonly CatalogEvent[];
    readonly files: ReadonlyMap<string, Buffer>;
    readonly index: ReturnType<typeof assetIndexSchema.parse>;
    readonly notices: ReturnType<typeof assetNoticesSchema.parse>;
    readonly inputs: ReturnType<typeof assetInputsSchema.parse>;
}): void;
//# sourceMappingURL=asset-closure.d.ts.map