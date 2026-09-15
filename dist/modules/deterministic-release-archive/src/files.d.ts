export interface DeterministicReleaseArchiveEntry {
    readonly path: string;
    readonly bytes: Buffer;
}
/** Canonical traversal shared by archive production and file-closure checking.
 * Reading a release must not load the compression implementation. */
export declare function regularReleaseFiles(root: string, directory?: string): Promise<DeterministicReleaseArchiveEntry[]>;
//# sourceMappingURL=files.d.ts.map