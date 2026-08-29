import { entityAuthoringSchema } from "../../../contracts/authoring/src/index.js";
import { canonicalJson, compareCanonicalStrings } from "../../primitives/src/index.js";
import { orderedUnique } from "./publication-dependencies.js";
export function normalizeCatalogEntityAuthoring(authoring) {
    const parsed = entityAuthoringSchema.parse(authoring);
    return entityAuthoringSchema.parse({
        ...parsed,
        entity: {
            ...parsed.entity,
            slug_aliases: orderedUnique(parsed.entity.slug_aliases),
            domains: [...parsed.entity.domains].sort((left, right) => compareCanonicalStrings(canonicalJson(left), canonicalJson(right))),
        },
        sources: [...parsed.sources].sort((left, right) => compareCanonicalStrings(left.source_id, right.source_id)),
        programs: [...parsed.programs]
            .map((program) => ({
            ...program,
            program_slug_aliases: orderedUnique(program.program_slug_aliases),
            source_ids: orderedUnique(program.source_ids),
        }))
            .sort((left, right) => compareCanonicalStrings(left.program_id, right.program_id)),
        offers: [...parsed.offers]
            .map((offer) => ({
            ...offer,
            offer_slug_aliases: orderedUnique(offer.offer_slug_aliases),
            ...(offer.source_ids !== undefined ? { source_ids: orderedUnique(offer.source_ids) } : {}),
        }))
            .sort((left, right) => compareCanonicalStrings(left.offer_id, right.offer_id)),
    });
}
export function catalogPublicationEntityMap(authoring) {
    const values = authoring.map(normalizeCatalogEntityAuthoring);
    const result = new Map(values.map((value) => [value.entity.entity_id, value]));
    if (result.size !== values.length) {
        throw new Error("Catalog publication Entity IDs must be unique.");
    }
    return result;
}
export function catalogPublicationTargetAuthoring(input) {
    const state = catalogPublicationEntityMap(input.current);
    for (const candidate of input.candidates) {
        const normalized = normalizeCatalogEntityAuthoring(candidate);
        state.set(normalized.entity.entity_id, normalized);
    }
    for (const entityId of input.removals)
        state.delete(entityId);
    return [...state.values()].sort((left, right) => compareCanonicalStrings(left.entity.entity_id, right.entity.entity_id));
}
//# sourceMappingURL=publication-entities.js.map