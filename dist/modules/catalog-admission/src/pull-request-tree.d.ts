import type { EntityAuthoring } from "../../../contracts/authoring/src/index.js";
import type { CatalogTaxonomy } from "../../../contracts/taxonomy/src/index.js";
import { type CompiledCatalogFacts } from "../../compiler/src/index.js";
export declare function validateCatalogPrTree(input: {
    readonly repositoryRoot: string;
    readonly baseRevision: string;
    readonly headRevision: string;
    readonly taxonomy: CatalogTaxonomy;
}): Promise<{
    readonly entities: number;
    readonly programs: number;
    readonly offers: number;
}>;
export declare function assertCatalogContributionSelection(unsupportedChanges: readonly string[], authoring: readonly EntityAuthoring[]): void;
/**
 * Validate strict changed-head authoring and Git scope for public PR intake.
 * Historical Git supplies file identity only, never the semantic parent.
 */
export declare function inspectCatalogPrTree(input: {
    readonly repositoryRoot: string;
    readonly baseRevision: string;
    readonly headRevision: string;
    readonly taxonomy: CatalogTaxonomy;
}): Promise<{
    readonly baseRevision: string;
    readonly entityFiles: readonly string[];
    readonly identities: readonly EntityAuthoring["entity"][];
    readonly entities: number;
    readonly programs: number;
    readonly offers: number;
}>;
/** Read the strict head authoring and its identity closure without interpreting old Git YAML. */
export declare function inspectCatalogReleaseHead(input: {
    readonly repositoryRoot: string;
    readonly baseRevision: string;
    readonly headRevision: string;
    readonly taxonomy: CatalogTaxonomy;
}): Promise<{
    entityFiles: string[];
    unsupportedChanges: string[];
    changedAuthoring: CompiledCatalogFacts;
    identityClosure: CompiledCatalogFacts;
}>;
export declare function catalogPullRequestComparisonBase(input: {
    readonly repositoryRoot: string;
    readonly baseRevision: string;
    readonly headRevision: string;
}): Promise<string>;
export declare function catalogChangedPaths(input: {
    readonly repositoryRoot: string;
    readonly baseRevision: string;
    readonly headRevision: string;
}): Promise<{
    readonly entityFiles: string[];
    readonly otherFiles: string[];
    /** Entity-root changes the policy cannot admit (renames, copies, deletions), as `status:path`. */
    readonly unsupportedChanges: string[];
    /** Every Entity file whose content differs, a deleted one or a renamed one's old path included. */
    readonly touchedEntityFiles: string[];
}>;
//# sourceMappingURL=pull-request-tree.d.ts.map