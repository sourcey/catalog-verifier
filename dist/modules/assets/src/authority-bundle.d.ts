import { type Digest } from "provenry/primitives";
import { type AssetAuthorityBundleManifest, type EntityAssetProposal, type EntityAssetReviewArtifact } from "../../../contracts/assets/src/index.js";
import type { SignerRegistry } from "../../../contracts/authority/src/index.js";
import { type CatalogEvent, type CatalogEventCore } from "../../../contracts/events/src/index.js";
import type { CatalogPublicationProposal } from "../../../contracts/publication/src/index.js";
export interface ReadAssetAuthorityBundle {
    readonly manifest: AssetAuthorityBundleManifest;
    readonly proposals: readonly EntityAssetProposal[];
    readonly reviews: readonly EntityAssetReviewArtifact[];
    readonly events: readonly CatalogEvent[];
    readonly safeBytes: ReadonlyMap<Digest, Buffer>;
}
export declare function createAssetBindingEventIntent(input: {
    readonly proposal: EntityAssetProposal;
    readonly issuerId: string;
}): {
    readonly event_id: Digest;
    readonly core: CatalogEventCore;
};
export declare function readAssetAuthorityBundle(root: string): Promise<ReadAssetAuthorityBundle>;
export declare function admitAssetAuthorityBundle(input: {
    readonly bundle: ReadAssetAuthorityBundle;
    readonly existingEvents: readonly CatalogEvent[];
    readonly publicationProposal: CatalogPublicationProposal;
    readonly targetRegistry: SignerRegistry;
    readonly targetReleaseSequence: number;
}): {
    readonly authoritySetDigest: Digest;
    readonly proposals: readonly EntityAssetProposal[];
    readonly events: readonly CatalogEvent[];
    readonly safeBytes: ReadonlyMap<Digest, Buffer>;
};
/**
 * The converse of one bundle's own check, asserted where every admitted bundle
 * is visible: each declared asset has signed binding authority. Distinct
 * materializations may carry the same exact proposal; each is independently
 * admitted before the release owner composes their byte-identical events.
 */
export declare function assertAssetAuthorityCoverage(input: {
    readonly declared: readonly EntityAssetProposal[];
    readonly admitted: readonly {
        readonly proposals: readonly EntityAssetProposal[];
    }[];
}): void;
export declare function assetAuthorityObjectPaths(input: {
    readonly proposals: readonly EntityAssetProposal[];
    readonly events: readonly CatalogEvent[];
}): readonly string[];
//# sourceMappingURL=authority-bundle.d.ts.map