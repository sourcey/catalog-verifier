import { type EntityAuthoring } from "../../../contracts/authoring/src/index.js";
import type { CatalogTaxonomy } from "../../../contracts/taxonomy/src/index.js";
export interface CatalogAuthoringEntry {
    readonly source: string;
    readonly value: EntityAuthoring;
}
/** Canonical parsing and cross-document identity validation for authoring bytes. */
export declare function parseCatalogAuthoringSources(sources: readonly {
    readonly source: string;
    readonly content: string;
}[], options?: {
    readonly allowExternalRoleEntities?: boolean;
}): readonly CatalogAuthoringEntry[];
export declare function parseCatalogAuthoringSource(source: string, content: string): CatalogAuthoringEntry;
export declare function assertCatalogAuthoringIdentity(entries: readonly CatalogAuthoringEntry[], allowExternalRoleEntities: boolean): void;
/**
 * Canonical non-Git validation for explicit Catalog authoring bytes. Git
 * changed-path isolation and release admission remain transport adapters.
 */
export declare function validateCatalogCandidateSources(input: {
    readonly sources: readonly {
        readonly source: string;
        readonly content: string;
    }[];
    readonly taxonomy: CatalogTaxonomy;
}): {
    readonly entities: number;
    readonly programs: number;
    readonly offers: number;
};
export declare function inspectCatalogCandidateSources(input: {
    readonly sources: readonly {
        readonly source: string;
        readonly content: string;
    }[];
    readonly taxonomy: CatalogTaxonomy;
}): {
    readonly entries: readonly CatalogAuthoringEntry[];
    readonly summary: {
        readonly entities: number;
        readonly programs: number;
        readonly offers: number;
    };
};
export declare function assertCatalogTaxonomy(values: readonly EntityAuthoring[], taxonomy: CatalogTaxonomy): void;
/** Apply rules that belong to public contributions, not retained or hosted authoring. */
export declare function assertCatalogContributionAuthoring(values: readonly EntityAuthoring[]): void;
//# sourceMappingURL=index.d.ts.map