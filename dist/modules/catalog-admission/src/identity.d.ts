import { type CompiledCatalogFacts } from "../../compiler/src/index.js";
/** Git binds a file to one identity; its old payload is not the semantic parent. */
export declare function assertFileIdentityContinuity(input: {
    readonly repositoryRoot: string;
    readonly baseRevision: string;
    readonly changedAuthoring: CompiledCatalogFacts;
}): Promise<void>;
/**
 * The unchanged files that own an identity the changed files name, at any of `revisions`: each is
 * read at the revision it was found in, so a company only one revision lists is still found.
 */
export declare function identityDependencyFiles(input: {
    readonly repositoryRoot: string;
    readonly authoringRoot: string;
    readonly revisions: readonly string[];
    readonly changedFiles: readonly string[];
    readonly changedAuthoring: CompiledCatalogFacts;
}): Promise<string[]>;
/**
 * A changed file that claims an identity an unchanged company already owns is its contributor's to
 * change; a collision between two unchanged files is Sourcey's own and stays an error.
 */
export declare function changedIdentityCollision(error: unknown, changedFiles: readonly string[]): unknown;
/** Every offer the changed files carry names companies the closure lists. */
export declare function assertChangedRoleClosure(changed: CompiledCatalogFacts, closure: CompiledCatalogFacts): void;
//# sourceMappingURL=identity.d.ts.map