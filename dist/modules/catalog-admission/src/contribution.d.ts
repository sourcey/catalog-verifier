import type { CatalogTaxonomy } from "../../../contracts/taxonomy/src/index.js";
/** One thing a contributor changes in their pull request: the file, the field when there is one, and why. */
export interface CatalogContributionFinding {
    readonly file: string | null;
    readonly field: string | null;
    readonly message: string;
}
/**
 * A pull request its contributor can fix (`revise`), or one admission cannot judge on its own
 * (`person`). It is raised only where a finding is about what the pull request changed; a fault in
 * live state, Git, policy or Sourcey's own derivation stays an ordinary error. A person's hold that
 * changes nothing Sourcey publishes is `mergeOnly`: a person's Accept merges the head as it is.
 */
export declare class CatalogContributionError extends Error {
    readonly route: "revise" | "person";
    readonly findings: readonly CatalogContributionFinding[];
    readonly options: {
        readonly mergeOnly?: true;
    };
    readonly name = "CatalogContributionError";
    constructor(route: "revise" | "person", findings: readonly CatalogContributionFinding[], options?: {
        readonly mergeOnly?: true;
    });
}
/**
 * Every way the changed files break what a contribution keeps, file by file: each parses on its own
 * as strict authoring, names a canonical category and keeps the public contribution rules; then
 * together they claim no identity twice. Read before anything else depends on them, so one broken
 * file is named rather than failing the whole set.
 */
export declare function changedAuthoringFindings(input: {
    readonly authoringRoot: string;
    readonly changedFiles: readonly string[];
    readonly taxonomy: CatalogTaxonomy;
}): Promise<readonly CatalogContributionFinding[]>;
//# sourceMappingURL=contribution.d.ts.map