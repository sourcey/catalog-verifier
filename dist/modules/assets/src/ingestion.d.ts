import { type Digest } from "provenry/primitives";
import type { AssetMediaType, AssetRedistribution, AssetTransformProfile, EntityAssetProposal, EntityAssetReviewArtifact, RetainedAssetCapture } from "../../../contracts/assets/src/index.js";
export declare const ENTITY_ICON_MAX_SOURCE_PIXELS: number;
export declare const ENTITY_ICON_MAX_SOURCE_ASPECT_RATIO = 1.5;
export declare const ENTITY_ICON_SIZE = 256;
export interface AssetObjectStoreReceipt {
    readonly objectDigest: Digest;
    readonly bytes: number;
    readonly mediaType: string;
    readonly classification: "public" | "restricted";
    readonly receiptDigest: Digest;
}
export interface AssetObjectStorePort {
    put(input: {
        readonly expectedDigest: Digest;
        readonly bytes: Uint8Array;
        readonly mediaType: string;
        readonly classification: "public" | "restricted";
    }): Promise<AssetObjectStoreReceipt>;
}
export interface EntityIconTransformResult {
    readonly bytes: Uint8Array;
    readonly mediaType: AssetMediaType;
    readonly width: number;
    readonly height: number;
}
export interface EntityIconTransformerPort {
    readonly profile: AssetTransformProfile;
    transform(input: {
        readonly bytes: Uint8Array;
        readonly declaredMediaType: AssetMediaType;
    }): Promise<EntityIconTransformResult>;
}
export declare function retainEntityAssetCapture(input: {
    readonly source: {
        readonly kind: "upload";
        readonly uploadReceiptDigest: Digest;
    } | {
        readonly kind: "official_url";
        readonly requestedUrl: string;
        readonly finalUrl: string;
        readonly redirectCount: number;
        readonly captureReceiptDigest: Digest;
    } | {
        readonly kind: "sourcey_fallback";
        readonly generationRule: "sourcey.entity-monogram-5x7/v1";
        readonly fallbackReasonDigest: Digest;
    };
    readonly bytes: Uint8Array;
    readonly mediaType: AssetMediaType;
    readonly capturedAt: string;
    readonly objects: AssetObjectStorePort;
}): Promise<RetainedAssetCapture>;
export declare function prepareEntityAssetProposal(input: {
    readonly baseReleaseId: Digest;
    readonly entityId: string;
    readonly expectedCurrentBindingEventId: Digest | null;
    readonly capture: RetainedAssetCapture;
    readonly originalBytes: Uint8Array;
    readonly redistribution: AssetRedistribution;
    readonly authorityBasis: "vendor-authority" | "editorial-review" | "licensed-source" | "sourcey-owned";
    readonly authorityClaimId?: string;
    readonly sourceBasis: string;
    readonly reviewArtifact: EntityAssetReviewArtifact;
    readonly effectiveFrom: string;
    readonly transformer: EntityIconTransformerPort;
    readonly objects: AssetObjectStorePort;
}): Promise<EntityAssetProposal>;
//# sourceMappingURL=ingestion.d.ts.map