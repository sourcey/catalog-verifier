import { type AssetDelta, type AssetIndex, type AssetInputs, type AssetManifest, type AssetNotices, type EntityAssetProposal, type RetainedAssetCapture, type SourceyOwnedEntityIconCandidate } from "../../../contracts/assets/src/index.js";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
interface MaterializedAssets {
    readonly manifest: AssetManifest;
    readonly inputs: AssetInputs;
    readonly safeBytes: ReadonlyMap<string, Uint8Array>;
}
export declare function verifyRetainedAssetCapture(input: unknown): RetainedAssetCapture;
export declare function verifySourceyOwnedEntityIconCandidate(input: unknown): SourceyOwnedEntityIconCandidate;
export declare function verifyEntityAssetProposal(input: unknown): EntityAssetProposal;
export declare function verifyAssetDelta(input: unknown): AssetDelta;
export declare function validateAssetManifest(input: unknown): AssetManifest;
export declare function materializeAssetManifest(input: unknown, readBytes: (relativePath: string) => Uint8Array): MaterializedAssets;
export declare function projectAssets(input: {
    readonly manifest: AssetManifest;
    readonly events: readonly CatalogEvent[];
    readonly policyAsOf: string;
}): {
    readonly index: AssetIndex;
    readonly notices: AssetNotices;
};
export * from "./authority-bundle.js";
export * from "./delta.js";
export * from "./ingestion.js";
//# sourceMappingURL=index.d.ts.map