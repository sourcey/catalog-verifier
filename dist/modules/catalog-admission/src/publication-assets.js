import { compareCanonicalStrings } from "provenry/primitives";
import { verifyEntityAssetProposal } from "../../assets/src/index.js";
export function catalogPublicationAssetBindingKey(entityId, role) {
    return `${entityId}:${role}`;
}
export function catalogPublicationAssetBindingMap(bindings) {
    const result = new Map();
    for (const binding of bindings) {
        const key = catalogPublicationAssetBindingKey(binding.entity_id, binding.role);
        if (result.has(key)) {
            throw new Error(`Catalog publication asset binding ${key} is repeated.`);
        }
        result.set(key, binding);
    }
    return result;
}
export function normalizeCatalogPublicationAssetProposals(proposals) {
    const normalized = proposals
        .map(verifyEntityAssetProposal)
        .sort((left, right) => compareCanonicalStrings(catalogPublicationAssetBindingKey(left.entity_id, left.role), catalogPublicationAssetBindingKey(right.entity_id, right.role)));
    if (new Set(normalized.map((proposal) => catalogPublicationAssetBindingKey(proposal.entity_id, proposal.role))).size !== normalized.length) {
        throw new Error("Catalog publication may propose each Entity asset role only once.");
    }
    return normalized;
}
//# sourceMappingURL=publication-assets.js.map