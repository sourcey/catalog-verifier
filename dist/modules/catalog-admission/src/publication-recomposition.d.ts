import type { CatalogPublicationChangeSet, PublicationRecompositionNode, PublicationRecompositionWorkCounts } from "../../../contracts/publication/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
import { type CatalogPublicationImpactQuery } from "./publication-dependencies.js";
export interface CatalogPublicationRecompositionAction {
    readonly dependent: {
        readonly domain: string;
        readonly key: string;
    };
    readonly action: PublicationRecompositionNode["action"];
    readonly changedDependencyKeys: readonly string[];
    readonly currentOutputDigest: Digest | null;
    readonly candidateOutputDigest: Digest | null;
    readonly outputChanged: boolean;
    readonly emittedDependencyKey: string | null;
    readonly work: PublicationRecompositionWorkCounts;
}
export interface CatalogPublicationRecompositionWave {
    readonly wave: number;
    readonly changedDependencyKeys: readonly string[];
    readonly actions: readonly CatalogPublicationRecompositionAction[];
}
export interface CatalogPublicationRecompositionPlan {
    readonly initialChangedDependencyKeys: readonly string[];
    readonly waves: readonly CatalogPublicationRecompositionWave[];
    readonly changedDependencyKeys: readonly string[];
    readonly work: PublicationRecompositionWorkCounts;
    readonly dependencyLookups: number;
    readonly unaffectedDependentsProofDigest: Digest;
    readonly planDigest: Digest;
}
/**
 * Plans one digest-gated DAG to a fixed point. Callers supply semantic outputs
 * produced from immutable inputs; this owner decides propagation and proves
 * that no intermediate wave becomes a publication head.
 */
export declare function planCatalogPublicationRecomposition(input: {
    readonly changeSet: CatalogPublicationChangeSet;
    readonly impactIndex: CatalogPublicationImpactQuery;
    readonly nodes: readonly PublicationRecompositionNode[];
    readonly invalidatedDependencyKeys?: readonly string[];
}): CatalogPublicationRecompositionPlan;
//# sourceMappingURL=publication-recomposition.d.ts.map