import { type EntityAuthoring } from "../../../contracts/authoring/src/index.js";
import type { CatalogTaxonomy } from "../../../contracts/taxonomy/src/index.js";
/**
 * Authoring that breaks a rule about its own content, naming its file and, when there is one, its
 * field. It is its author's to fix; any other failure here is not.
 */
export declare class CatalogAuthoringError extends Error {
    readonly source: string | null;
    readonly field: string | null;
    readonly name = "CatalogAuthoringError";
    constructor(message: string, source: string | null, field?: string | null);
}
/** Two files claim one identity, `value`: `prior` first, then `claim`, each at its own field. */
export declare class CatalogAuthoringDuplicateError extends CatalogAuthoringError {
    readonly label: string;
    readonly value: string;
    readonly prior: {
        readonly source: string;
        readonly field: string;
    };
    readonly claim: {
        readonly source: string;
        readonly field: string;
    };
    constructor(label: string, value: string, prior: {
        readonly source: string;
        readonly field: string;
    }, claim: {
        readonly source: string;
        readonly field: string;
    });
}
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