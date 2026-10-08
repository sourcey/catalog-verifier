import { type Digest } from "provenry/primitives";
import type { AssetBindingProjection, AssetDelta, EntityAssetProposal } from "../../../contracts/assets/src/index.js";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
export declare function buildAssetDelta(input: {
    readonly parentAssetIndexDigest: Digest;
    readonly proposals: readonly EntityAssetProposal[];
    readonly events: readonly CatalogEvent[];
    readonly currentBindings: readonly AssetBindingProjection[];
    readonly removedEntityIds?: readonly string[];
}): AssetDelta;
/** The asset index changes a release chains onto its parent asset index. */
export declare function assetIndexTransitionChanges(delta: AssetDelta): ({
    entity_id: string;
    role: "icon";
    prior_binding_event_id: string | null;
    operation: "remove" | "upsert";
    binding: {
        entity_id: string;
        role: "icon" | "logo-dark" | "logo-light";
        asset_object_digest: string;
        served_digest: string;
        served_path: string;
        media_type: "image/jpeg" | "image/png" | "image/svg+xml" | "image/webp";
        bytes: number;
        width: number;
        height: number;
        authority_basis: "editorial-review" | "licensed-source" | "sourcey-owned" | "vendor-authority";
        authority_claim_id?: string | undefined;
        approval_receipt_digest: string;
        source_basis: string;
        license_basis: string;
        effective_from: string;
        effective_until?: string | undefined;
        binding_event_id: string;
    };
} | {
    entity_id: string;
    role: "icon";
    prior_binding_event_id: string | null;
    operation: "remove" | "upsert";
    prior_binding_digest: string;
    disposition_event_id: string;
})[];
export declare function eventMatchesEntityAssetProposal(event: CatalogEvent, proposal: EntityAssetProposal): boolean;
//# sourceMappingURL=delta.d.ts.map