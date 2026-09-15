import { canonicalJson, compareCanonicalStrings } from "../../primitives/src/index.js";
import { orderedUnique } from "./publication-dependencies.js";
export function normalizeCatalogPublicationAuthorityProposals(proposals) {
    const normalized = proposals
        .map((proposal) => ({ ...proposal, dependency_keys: orderedUnique(proposal.dependency_keys) }))
        .sort((left, right) => compareCanonicalStrings(left.purpose, right.purpose) ||
        compareCanonicalStrings(left.proposal_digest, right.proposal_digest));
    if (new Set(normalized.map((proposal) => `${proposal.purpose}:${proposal.proposal_digest}`))
        .size !== normalized.length) {
        throw new Error("Catalog publication authority proposals must be unique.");
    }
    return normalized;
}
export function mergeCatalogPublicationAuthorityProposalLanes(...lanes) {
    const merged = new Map();
    for (const lane of lanes) {
        for (const proposal of normalizeCatalogPublicationAuthorityProposals(lane)) {
            const key = `${proposal.purpose}:${proposal.proposal_digest}`;
            const previous = merged.get(key);
            if (previous && canonicalJson(previous) !== canonicalJson(proposal))
                throw new Error("Catalog authority proposal has conflicting dependency bindings.");
            merged.set(key, proposal);
        }
    }
    return [...merged.values()].sort((left, right) => compareCanonicalStrings(left.purpose, right.purpose) ||
        compareCanonicalStrings(left.proposal_digest, right.proposal_digest));
}
//# sourceMappingURL=publication-authorities.js.map