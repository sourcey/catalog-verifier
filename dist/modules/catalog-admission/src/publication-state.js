import { canonicalJson, compareCanonicalStrings, digest } from "provenry/primitives";
import { catalogPublicationCurrentStateCoreSchema, catalogPublicationCurrentStateSchema, } from "../../../contracts/publication/src/index.js";
import { catalogPublicationAssetBindingKey as assetBindingKey, catalogPublicationAssetBindingMap as assetBindingMap, } from "./publication-assets.js";
import { orderedUnique } from "./publication-dependencies.js";
import { catalogPublicationEntityMap as entityMap } from "./publication-entities.js";
/** Build one canonical targeted snapshot, never a catalog-wide projection. */
export function createCatalogPublicationCurrentState(input) {
    const parsed = catalogPublicationCurrentStateCoreSchema
        .omit({ state_contract: true })
        .parse(input);
    const core = catalogPublicationCurrentStateCoreSchema.parse({
        ...parsed,
        state_contract: catalogPublicationCurrentStateCoreSchema.shape.state_contract.value,
        target_entity_ids: orderedUnique(parsed.target_entity_ids),
        current_entities: [...entityMap(parsed.current_entities).values()].sort((left, right) => compareCanonicalStrings(left.entity.entity_id, right.entity.entity_id)),
        current_asset_bindings: [...assetBindingMap(parsed.current_asset_bindings).values()].sort((left, right) => compareCanonicalStrings(assetBindingKey(left.entity_id, left.role), assetBindingKey(right.entity_id, right.role))),
    });
    if (core.target_entity_ids.length !== parsed.target_entity_ids.length) {
        throw new Error("Catalog publication current-state targets must be unique.");
    }
    return verifyCatalogPublicationCurrentState({ ...core, state_digest: digest(core) });
}
export function verifyCatalogPublicationCurrentState(input) {
    const state = catalogPublicationCurrentStateSchema.parse(input);
    const targetEntityIds = orderedUnique(state.target_entity_ids);
    const entities = [...entityMap(state.current_entities).values()].sort((left, right) => compareCanonicalStrings(left.entity.entity_id, right.entity.entity_id));
    const assets = [...assetBindingMap(state.current_asset_bindings).values()].sort((left, right) => compareCanonicalStrings(assetBindingKey(left.entity_id, left.role), assetBindingKey(right.entity_id, right.role)));
    if (canonicalJson(state.target_entity_ids) !== canonicalJson(targetEntityIds) ||
        canonicalJson(state.current_entities) !== canonicalJson(entities) ||
        canonicalJson(state.current_asset_bindings) !== canonicalJson(assets) ||
        entities.some(({ entity: { entity_id: entityId } }) => !targetEntityIds.includes(entityId)) ||
        assets.some(({ entity_id: entityId }) => !targetEntityIds.includes(entityId))) {
        throw new Error("Catalog publication current state is not a canonical targeted slice.");
    }
    const { state_digest: stateDigest, ...core } = state;
    if (digest(catalogPublicationCurrentStateCoreSchema.parse(core)) !== stateDigest) {
        throw new Error("Catalog publication current-state digest does not match its canonical input.");
    }
    return state;
}
export class CatalogPublicationPreconditionError extends Error {
    entityId;
    role;
    constructor(entityId, role, message) {
        super(message);
        this.entityId = entityId;
        this.role = role;
        this.name = "CatalogPublicationPreconditionError";
    }
}
/** The same exact-state preconditions protect initial planning and rebased activation. */
export function assertCatalogPublicationPreconditions(input) {
    const current = entityMap(input.currentEntities);
    const currentAssets = assetBindingMap(input.currentAssetBindings);
    const expectedIds = new Set(input.expected.expected_current_entities.map(({ entity_id }) => entity_id));
    if ([...current.keys()].some((id) => !expectedIds.has(id))) {
        throw new Error("Catalog publication planning received state outside its targeted live slice.");
    }
    for (const expected of input.expected.expected_current_entities) {
        const actual = current.get(expected.entity_id);
        if ((actual ? digest(actual) : null) !== expected.snapshot_digest) {
            throw new CatalogPublicationPreconditionError(expected.entity_id, null, `Catalog publication live vendor ${expected.entity_id} has advanced.`);
        }
    }
    const expectedAssetKeys = new Set(input.expected.expected_current_asset_bindings.map((binding) => assetBindingKey(binding.entity_id, binding.role)));
    if ([...currentAssets.keys()].some((key) => !expectedAssetKeys.has(key))) {
        throw new Error("Catalog publication planning received asset state outside its targeted slice.");
    }
    for (const expected of input.expected.expected_current_asset_bindings) {
        const actual = currentAssets.get(assetBindingKey(expected.entity_id, expected.role));
        if ((actual?.binding_event_id ?? null) !== expected.binding_event_id ||
            (actual ? digest(actual) : null) !== expected.binding_digest) {
            throw new CatalogPublicationPreconditionError(expected.entity_id, expected.role, `Catalog publication live asset ${expected.entity_id}:${expected.role} has advanced.`);
        }
    }
}
export function catalogPublicationStatePreconditions(input) {
    const state = verifyCatalogPublicationCurrentState(input);
    const current = entityMap(state.current_entities);
    const assets = assetBindingMap(state.current_asset_bindings);
    return {
        expected_current_entities: state.target_entity_ids.map((entityId) => ({
            entity_id: entityId,
            snapshot_digest: current.has(entityId) ? digest(current.get(entityId)) : null,
        })),
        expected_current_asset_bindings: state.target_entity_ids.map((entityId) => {
            const binding = assets.get(assetBindingKey(entityId, "icon"));
            return {
                entity_id: entityId,
                role: "icon",
                binding_event_id: binding?.binding_event_id ?? null,
                binding_digest: binding ? digest(binding) : null,
            };
        }),
    };
}
//# sourceMappingURL=publication-state.js.map