import { digest, digestPathSegment, sha256Bytes } from "provenry/primitives";
import { assetObjectCoreSchema, assetTransformProfileCoreSchema, assetTransformProfileSchema, assetTransformReceiptCoreSchema, ENTITY_ICON_MAX_SOURCE_BYTES, ENTITY_ICON_RASTER_PROFILE_VERSION, entityAssetProposalCoreSchema, retainedAssetCaptureCoreSchema, SOURCEY_ENTITY_MONOGRAM_PROFILE_VERSION, } from "../../../contracts/assets/src/index.js";
import { verifyEntityAssetProposal, verifyRetainedAssetCapture } from "./index.js";
export const ENTITY_ICON_MAX_SOURCE_PIXELS = 4096 * 4096;
export const ENTITY_ICON_MAX_SOURCE_ASPECT_RATIO = 1.5;
export const ENTITY_ICON_SIZE = 256;
export async function retainEntityAssetCapture(input) {
    if (input.bytes.byteLength === 0 || input.bytes.byteLength > ENTITY_ICON_MAX_SOURCE_BYTES) {
        throw new Error("Entity icon original bytes violate the encoded byte limit.");
    }
    const originalDigest = sha256Bytes(input.bytes);
    const storage = await input.objects.put({
        expectedDigest: originalDigest,
        bytes: input.bytes,
        mediaType: input.mediaType,
        classification: "restricted",
    });
    verifyStoreReceipt(storage, {
        objectDigest: originalDigest,
        bytes: input.bytes.byteLength,
        mediaType: input.mediaType,
        classification: "restricted",
    });
    const source = input.source.kind === "upload"
        ? {
            kind: "upload",
            upload_receipt_digest: input.source.uploadReceiptDigest,
        }
        : input.source.kind === "official_url"
            ? {
                kind: "official_url",
                requested_url: input.source.requestedUrl,
                final_url: input.source.finalUrl,
                redirect_count: input.source.redirectCount,
                capture_receipt_digest: input.source.captureReceiptDigest,
            }
            : {
                kind: "sourcey_fallback",
                generation_rule: input.source.generationRule,
                fallback_reason_digest: input.source.fallbackReasonDigest,
            };
    const core = retainedAssetCaptureCoreSchema.parse({
        capture_contract: "sourcey.retained-asset-capture/v1alpha1",
        source,
        original_digest: originalDigest,
        bytes: input.bytes.byteLength,
        media_type: input.mediaType,
        captured_at: input.capturedAt,
        storage_receipt_digest: storage.receiptDigest,
    });
    return verifyRetainedAssetCapture({ ...core, capture_digest: digest(core) });
}
export async function prepareEntityAssetProposal(input) {
    const capture = verifyRetainedAssetCapture(input.capture);
    if (input.originalBytes.byteLength !== capture.bytes ||
        sha256Bytes(input.originalBytes) !== capture.original_digest) {
        throw new Error("Entity asset original bytes differ from the retained capture.");
    }
    if (input.originalBytes.byteLength > ENTITY_ICON_MAX_SOURCE_BYTES) {
        throw new Error("Entity icon exceeds the maximum encoded byte size.");
    }
    verifyTransformProfile(input.transformer.profile, input.authorityBasis);
    const transformed = await input.transformer.transform({
        bytes: input.originalBytes,
        declaredMediaType: capture.media_type,
    });
    if (transformed.width !== ENTITY_ICON_SIZE ||
        transformed.height !== ENTITY_ICON_SIZE ||
        transformed.mediaType !== input.transformer.profile.output_media_type) {
        throw new Error("Entity icon transformer did not produce the exact canonical canvas.");
    }
    const safeDigest = sha256Bytes(transformed.bytes);
    const safeStorage = await input.objects.put({
        expectedDigest: safeDigest,
        bytes: transformed.bytes,
        mediaType: transformed.mediaType,
        classification: "public",
    });
    verifyStoreReceipt(safeStorage, {
        objectDigest: safeDigest,
        bytes: transformed.bytes.byteLength,
        mediaType: transformed.mediaType,
        classification: "public",
    });
    const receiptCore = assetTransformReceiptCoreSchema.parse({
        receipt_contract: "sourcey.asset-transform-receipt/v1alpha1",
        original_digest: capture.original_digest,
        safe_digest: safeDigest,
        profile_digest: input.transformer.profile.profile_digest,
        toolchain_digest: input.transformer.profile.toolchain_digest,
    });
    const receipt = { ...receiptCore, receipt_digest: digest(receiptCore) };
    const safePath = `safe/sha256/${digestPathSegment(safeDigest)}`;
    const objectCore = assetObjectCoreSchema.parse({
        asset_contract: "sourcey.asset/v1alpha1",
        original: {
            digest: capture.original_digest,
            bytes: capture.bytes,
            media_type: capture.media_type,
            source_path: `originals/sha256/${digestPathSegment(capture.original_digest)}`,
        },
        safe_variants: [
            {
                digest: safeDigest,
                bytes: transformed.bytes.byteLength,
                media_type: transformed.mediaType,
                source_path: safePath,
                served_path: `sha256/${digestPathSegment(safeDigest)}`,
                width: transformed.width,
                height: transformed.height,
                transform_profile_digest: input.transformer.profile.profile_digest,
                transform_receipt_digest: receipt.receipt_digest,
            },
        ],
        transform_receipts: [receipt],
        redistribution: input.redistribution,
    });
    const asset = { ...objectCore, asset_object_digest: digest(objectCore) };
    const core = entityAssetProposalCoreSchema.parse({
        proposal_contract: "sourcey.entity-asset-proposal/v1alpha1",
        base_release_id: input.baseReleaseId,
        entity_id: input.entityId,
        role: "icon",
        expected_current_binding_event_id: input.expectedCurrentBindingEventId,
        capture,
        transform_profile: input.transformer.profile,
        asset,
        served_digest: safeDigest,
        safe_storage_receipt_digest: safeStorage.receiptDigest,
        authority_basis: input.authorityBasis,
        ...(input.authorityClaimId ? { authority_claim_id: input.authorityClaimId } : {}),
        source_basis: input.sourceBasis,
        approval_scope: "entity-icon",
        review: input.reviewArtifact,
        effective_from: input.effectiveFrom,
    });
    return verifyEntityAssetProposal({ ...core, proposal_digest: digest(core) });
}
function verifyTransformProfile(profile, authorityBasis) {
    const parsed = assetTransformProfileSchema.parse(profile);
    const { profile_digest: profileDigest, ...core } = parsed;
    if (digest(assetTransformProfileCoreSchema.parse(core)) !== profileDigest) {
        throw new Error("Entity icon transform profile digest is invalid.");
    }
    const canonicalRaster = profile.profile_version === ENTITY_ICON_RASTER_PROFILE_VERSION &&
        profile.output_media_type === "image/png" &&
        profile.maximum_width === ENTITY_ICON_SIZE &&
        profile.maximum_height === ENTITY_ICON_SIZE &&
        profile.maximum_source_aspect_ratio === ENTITY_ICON_MAX_SOURCE_ASPECT_RATIO;
    const canonicalSourceyVector = profile.profile_version === SOURCEY_ENTITY_MONOGRAM_PROFILE_VERSION &&
        profile.output_media_type === "image/svg+xml" &&
        profile.maximum_width === ENTITY_ICON_SIZE &&
        profile.maximum_height === ENTITY_ICON_SIZE &&
        profile.maximum_source_aspect_ratio === 1;
    if ((authorityBasis === "sourcey-owned" && !canonicalSourceyVector) ||
        (authorityBasis !== "sourcey-owned" && !canonicalRaster)) {
        throw new Error("Entity icon transformer does not implement the canonical profile.");
    }
}
function verifyStoreReceipt(receipt, expected) {
    if (receipt.objectDigest !== expected.objectDigest ||
        receipt.bytes !== expected.bytes ||
        receipt.mediaType !== expected.mediaType ||
        receipt.classification !== expected.classification ||
        !receipt.receiptDigest.startsWith("sha256:")) {
        throw new Error("Asset object-store receipt does not bind the exact safe object.");
    }
}
//# sourceMappingURL=ingestion.js.map