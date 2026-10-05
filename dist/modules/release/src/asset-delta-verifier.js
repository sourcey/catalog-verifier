import { eventDisposesAssetBinding } from "../../assets/src/disposition.js";
import { eventMatchesEntityAssetProposal, verifyAssetDelta } from "../../assets/src/index.js";
export function assertCatalogAssetDeltaClosure(input) {
    const proposals = input.publicationProposal.candidate_assets;
    const removals = new Set(input.publicationProposal.remove_entity_ids);
    if (proposals.length === 0 && removals.size === 0) {
        if (input.assetDelta || input.safeAssetBytes.size > 0) {
            throw new Error("Catalog delta contains asset objects without an admitted asset proposal.");
        }
        return;
    }
    if (!input.assetDelta) {
        throw new Error("Catalog delta omitted the admitted asset transition.");
    }
    const delta = verifyAssetDelta(input.assetDelta);
    if (delta.parent_asset_index_digest !== input.baseAssetIndexDigest) {
        throw new Error("Catalog asset delta does not target the exact live asset index.");
    }
    const proposalByKey = new Map(proposals.map((proposal) => [`${proposal.entity_id}:${proposal.role}`, proposal]));
    if (proposalByKey.size !== proposals.length ||
        delta.changes.length !== proposals.length + removals.size) {
        throw new Error("Catalog asset delta does not close its unique proposal set.");
    }
    const requiredSafeDigests = new Set();
    for (const change of delta.changes) {
        const key = `${change.entity_id}:${change.role}`;
        if (change.operation === "remove") {
            const expected = input.publicationProposal.expected_current_asset_bindings.find((binding) => binding.entity_id === change.entity_id && binding.role === change.role);
            const disposition = input.events.find((event) => event.event_id === change.disposition_event_id);
            if (!removals.delete(change.entity_id) ||
                !expected ||
                expected.binding_event_id !== change.prior_binding_event_id ||
                expected.binding_digest !== change.prior_binding_digest ||
                !disposition ||
                !eventDisposesAssetBinding(disposition, change.entity_id, change.prior_binding_event_id)) {
                throw new Error(`Catalog asset removal ${key} lacks its exact protected disposition.`);
            }
            continue;
        }
        const proposal = proposalByKey.get(key);
        if (!proposal ||
            change.prior_binding_event_id !== proposal.expected_current_binding_event_id ||
            change.asset.asset_object_digest !== proposal.asset.asset_object_digest ||
            change.binding.asset_object_digest !== proposal.asset.asset_object_digest ||
            change.binding.served_digest !== proposal.served_digest ||
            change.binding.authority_basis !== proposal.authority_basis ||
            (change.binding.authority_claim_id ?? null) !== (proposal.authority_claim_id ?? null) ||
            change.binding.approval_receipt_digest !== proposal.review.review_artifact_digest ||
            change.binding.source_basis !== proposal.source_basis ||
            change.binding.license_basis !== proposal.asset.redistribution.basis ||
            change.binding.effective_from !== proposal.effective_from) {
            throw new Error(`Catalog asset delta disagrees with proposal ${key}.`);
        }
        const event = input.events.find((candidate) => candidate.event_id === change.binding.binding_event_id);
        if (!event || !eventMatchesEntityAssetProposal(event, proposal)) {
            throw new Error(`Catalog asset delta ${key} lacks its exact protected binding event.`);
        }
        const variant = proposal.asset.safe_variants.find((candidate) => candidate.digest === proposal.served_digest);
        const bytes = variant ? input.safeAssetBytes.get(variant.digest) : undefined;
        if (!variant ||
            change.safe_variant_path !== variant.source_path ||
            change.binding.media_type !== variant.media_type ||
            change.binding.bytes !== variant.bytes ||
            change.binding.width !== variant.width ||
            change.binding.height !== variant.height ||
            !bytes ||
            bytes.byteLength !== variant.bytes) {
            throw new Error(`Catalog asset delta ${key} lacks its exact safe derivative.`);
        }
        requiredSafeDigests.add(variant.digest);
        proposalByKey.delete(key);
    }
    if (proposalByKey.size > 0 ||
        removals.size > 0 ||
        requiredSafeDigests.size !== input.safeAssetBytes.size ||
        [...input.safeAssetBytes.keys()].some((objectDigest) => !requiredSafeDigests.has(objectDigest))) {
        throw new Error("Catalog safe asset payload escapes its admitted proposal closure.");
    }
}
//# sourceMappingURL=asset-delta-verifier.js.map