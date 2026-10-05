import { type Digest } from "provenry/primitives";
import type { CatalogSubmissionAuthoringFile, CatalogSubmissionWorkItem } from "../../../contracts/api/src/index.js";
import type { EntityAuthoring } from "../../../contracts/authoring/src/index.js";
import type { CatalogPublicationCurrentState } from "../../../contracts/publication/src/index.js";
import type { CompiledEntityFacts } from "../../catalog-model/src/index.js";
import { type CompiledCatalogFacts } from "../../compiler/src/index.js";
export interface CatalogChangedEntity {
    readonly entity: CompiledEntityFacts;
    readonly currentAuthoring: EntityAuthoring;
    readonly priorAuthoring: EntityAuthoring | null;
    readonly entityChanged: boolean;
    readonly changedProgramIds: readonly string[];
    readonly changedOfferIds: readonly string[];
}
export interface CatalogChangedRevision {
    readonly owner: CompiledEntityFacts;
    readonly kind: "entity" | "program" | "offer";
    readonly targetId: string;
    readonly revisionDigest: Digest;
    readonly title: string;
    readonly accessUrl: string | null;
    readonly termsUrl: string | null;
    readonly sourceIds: readonly string[];
}
export interface CatalogChangeAnalysis {
    readonly baseRevision: string;
    readonly entityFiles: readonly string[];
    /** Entity-root changes outside the admissible shapes, as `status:path`; scope policy names them. */
    readonly unsupportedChanges: readonly string[];
    readonly changedEntities: readonly CatalogChangedEntity[];
    readonly changedRevisions: readonly CatalogChangedRevision[];
    readonly closure: CompiledCatalogFacts;
    readonly entities: number;
    readonly programs: number;
    readonly offers: number;
}
/**
 * Analyze retained non-Git submission bytes through the same compiler and
 * semantic diff used by Git admission. This adapter contains no transport
 * coordinates and performs no publication planning or effects.
 */
export declare function analyzeCatalogSubmissionWorkItem(input: {
    readonly workItem: CatalogSubmissionWorkItem;
    readonly baseState: CatalogPublicationCurrentState;
    readonly currentState: CatalogPublicationCurrentState;
    readonly reviewedAuthoringFiles?: readonly CatalogSubmissionAuthoringFile[];
}): CatalogChangeAnalysis;
/** Compare compiled candidates with the exact live authoring slice, regardless of ingress. */
export declare function catalogChangedEntitiesFromCurrent(input: {
    readonly currentEntities: readonly EntityAuthoring[];
    readonly candidates: CompiledCatalogFacts;
}): CatalogChangedEntity[];
export declare function catalogChangedRevisions(changes: readonly CatalogChangedEntity[]): CatalogChangedRevision[];
export declare function canonicalChangedEntityIds(changes: readonly CatalogChangedEntity[]): readonly string[];
//# sourceMappingURL=change-analysis.d.ts.map