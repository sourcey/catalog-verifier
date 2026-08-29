import type { EntityAuthoring } from "../../../contracts/authoring/src/index.js";
export declare function normalizeCatalogEntityAuthoring(authoring: EntityAuthoring): EntityAuthoring;
export declare function catalogPublicationEntityMap(authoring: readonly EntityAuthoring[]): Map<string, EntityAuthoring>;
export declare function catalogPublicationTargetAuthoring(input: {
    readonly current: readonly EntityAuthoring[];
    readonly candidates: readonly EntityAuthoring[];
    readonly removals: readonly string[];
}): EntityAuthoring[];
//# sourceMappingURL=publication-entities.d.ts.map