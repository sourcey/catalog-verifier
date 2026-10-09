/** Where a data repository keeps its company files. */
export declare const CATALOG_ENTITY_ROOT = "entities";
/** Run Git in `root` and return its output; a non-zero exit throws with Git's exit code. */
export declare function git(root: string, args: readonly string[], maxBuffer?: number): Promise<string>;
export declare function gitIsAncestor(root: string, ancestor: string, descendant: string): Promise<boolean>;
/** A company file's bytes at `revision`, or null where the revision has no such file. */
export declare function gitSourceAtRevision(input: {
    readonly repositoryRoot: string;
    readonly revision: string;
    readonly sourceFile: string;
}): Promise<string | null>;
export declare function gitRevision(root: string, revision: string): Promise<string>;
export declare function assertGitRevision(value: string, label: string): void;
/** A file under the Entity root as its contributor finds it in their repository. */
export declare function entityPath(source: string): string;
export declare function entityPathOf(source: string | undefined): string | null;
export declare function repositoryPath(repositoryRoot: string, path: string): string;
export declare function resolveInside(root: string, path: string): string;
//# sourceMappingURL=repository.d.ts.map