import { canonicalJson, compareCanonicalStrings, digest } from "provenry/primitives";
import { assetDeltaCoreSchema } from "../../../contracts/assets/src/index.js";
import { catalogEventPayloadSchemas } from "../../../contracts/events/src/index.js";
import { eventDisposesAssetBinding } from "./disposition.js";
import { verifyAssetDelta, verifyEntityAssetProposal } from "./index.js";
export function buildAssetDelta(input) {
    const current = bindingMap(input.currentBindings);
    const events = input.events.filter((event) => event.kind === "asset.bound");
    const upserts = input.proposals
        .map(verifyEntityAssetProposal)
        .map((proposal) => {
        const key = bindingKey(proposal.entity_id, proposal.role);
        const prior = current.get(key);
        if ((prior?.binding_event_id ?? null) !== proposal.expected_current_binding_event_id) {
            throw new Error(`Asset proposal ${proposal.proposal_digest} has a stale live binding.`);
        }
        const matching = events.filter((event) => eventMatchesEntityAssetProposal(event, proposal));
        if (matching.length !== 1) {
            throw new Error(`Asset proposal ${proposal.proposal_digest} requires one exact protected binding event.`);
        }
        const event = matching[0];
        if (!event)
            throw new Error("Asset binding event disappeared.");
        const payload = catalogEventPayloadSchemas["asset.bound"].parse(event.payload);
        const variant = proposal.asset.safe_variants.find((candidate) => candidate.digest === proposal.served_digest);
        if (!variant)
            throw new Error("Asset proposal lost its served safe variant.");
        const binding = {
            entity_id: proposal.entity_id,
            role: proposal.role,
            asset_object_digest: proposal.asset.asset_object_digest,
            served_digest: proposal.served_digest,
            served_path: `assets/${variant.served_path}`,
            media_type: variant.media_type,
            bytes: variant.bytes,
            width: variant.width,
            height: variant.height,
            authority_basis: payload.authority_basis,
            ...(payload.authority_claim_id ? { authority_claim_id: payload.authority_claim_id } : {}),
            approval_receipt_digest: payload.approval_receipt_digest,
            source_basis: payload.source_basis,
            license_basis: payload.license_basis,
            effective_from: payload.effective_from,
            ...(payload.effective_until ? { effective_until: payload.effective_until } : {}),
            binding_event_id: event.event_id,
        };
        return {
            operation: "upsert",
            entity_id: proposal.entity_id,
            role: proposal.role,
            prior_binding_event_id: prior?.binding_event_id ?? null,
            binding,
            asset: proposal.asset,
            original_path: proposal.asset.original.source_path,
            safe_variant_path: variant.source_path,
        };
    })
        .sort((left, right) => compareCanonicalStrings(bindingKey(left.entity_id, left.role), bindingKey(right.entity_id, right.role)));
    const removals = [...new Set(input.removedEntityIds ?? [])]
        .sort(compareCanonicalStrings)
        .map((entityId) => {
        const prior = current.get(bindingKey(entityId, "icon"));
        if (!prior) {
            throw new Error(`Removed Entity ${entityId} lacks its exact current icon binding.`);
        }
        const dispositions = input.events.filter((event) => eventDisposesAssetBinding(event, entityId, prior.binding_event_id));
        if (dispositions.length !== 1) {
            throw new Error(`Removed Entity ${entityId} requires one exact protected icon disposition event.`);
        }
        const disposition = dispositions[0];
        if (!disposition)
            throw new Error("Asset disposition event disappeared.");
        return {
            operation: "remove",
            entity_id: entityId,
            role: "icon",
            prior_binding_event_id: prior.binding_event_id,
            prior_binding_digest: digest(prior),
            disposition_event_id: disposition.event_id,
        };
    });
    const changes = [...upserts, ...removals].sort((left, right) => compareCanonicalStrings(bindingKey(left.entity_id, left.role), bindingKey(right.entity_id, right.role)));
    const core = assetDeltaCoreSchema.parse({
        delta_contract: "sourcey.asset-delta/v1alpha1",
        parent_asset_index_digest: input.parentAssetIndexDigest,
        changes,
    });
    return verifyAssetDelta({ ...core, delta_digest: digest(core) });
}
/** The asset index changes a release chains onto its parent asset index. */
export function assetIndexTransitionChanges(delta) {
    return verifyAssetDelta(delta).changes.map((change) => ({
        entity_id: change.entity_id,
        role: change.role,
        prior_binding_event_id: change.prior_binding_event_id,
        operation: change.operation,
        ...(change.operation === "upsert"
            ? { binding: change.binding }
            : {
                prior_binding_digest: change.prior_binding_digest,
                disposition_event_id: change.disposition_event_id,
            }),
    }));
}
export function eventMatchesEntityAssetProposal(event, proposal) {
    if (event.kind !== "asset.bound" || event.subject.entity_id !== proposal.entity_id)
        return false;
    const parsed = catalogEventPayloadSchemas["asset.bound"].safeParse(event.payload);
    if (!parsed.success)
        return false;
    const payload = parsed.data;
    return (payload.role === proposal.role &&
        payload.asset_object_digest === proposal.asset.asset_object_digest &&
        payload.served_derivative_digest === proposal.served_digest &&
        payload.authority_basis === proposal.authority_basis &&
        (payload.authority_claim_id ?? null) === (proposal.authority_claim_id ?? null) &&
        payload.approval_receipt_digest === proposal.review.review_artifact_digest &&
        payload.approval_scope === proposal.approval_scope &&
        payload.source_basis === proposal.source_basis &&
        payload.license_basis === proposal.asset.redistribution.basis &&
        payload.effective_from === proposal.effective_from &&
        (payload.superseded_binding_event_id ?? null) === proposal.expected_current_binding_event_id);
}
function bindingKey(entityId, role) {
    return `${entityId}:${role}`;
}
function bindingMap(bindings) {
    const result = new Map();
    for (const binding of bindings) {
        const key = bindingKey(binding.entity_id, binding.role);
        const prior = result.get(key);
        if (prior && canonicalJson(prior) !== canonicalJson(binding)) {
            throw new Error(`Current asset bindings disagree at ${key}.`);
        }
        if (prior)
            throw new Error(`Current asset binding ${key} is repeated.`);
        result.set(key, binding);
    }
    return result;
}
//# sourceMappingURL=delta.js.map