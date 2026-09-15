/** Materialize a clean detached checkout of one repository's current main. */
export declare function prepareGitRepositoryMain(input: {
    readonly root: string;
    readonly remoteUrl: string;
}): Promise<string>;
/** Materialize an exact pull-request head as inert Git input. */
export declare function prepareGitRepositoryHead(input: {
    readonly root: string;
    readonly remoteUrl: string;
    readonly pullRequestNumber: number;
    readonly baseSha: string;
    readonly headSha: string;
}): Promise<void>;
export declare function assertExactGitCheckout(repositoryRoot: string, expectedHeadSha: string): Promise<void>;
export declare function fetchExactGitObject(repositoryRoot: string, revision: string): Promise<void>;
export declare function readGitObject(repositoryRoot: string, revision: string): Promise<string>;
/** Resolve the exact shared comparison ancestor for two retained commits. */
export declare function gitComparisonBase(input: {
    readonly repositoryRoot: string;
    readonly baseRevision: string;
    readonly headRevision: string;
}): Promise<string>;
/** Reuse one object database without changing its checkout. */
export declare function prepareGitRepositoryObjects(input: {
    readonly root: string;
    readonly remoteUrl: string;
    readonly commits: readonly string[];
}): Promise<void>;
export declare function gitBytes(repositoryRoot: string, ...arguments_: readonly string[]): Promise<Buffer>;
export declare function gitInput(repositoryRoot: string, arguments_: readonly string[], input: string, maximumOutputBytes: number): Promise<Buffer>;
//# sourceMappingURL=index.d.ts.map