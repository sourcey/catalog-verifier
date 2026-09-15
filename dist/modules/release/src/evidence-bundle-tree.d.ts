/**
 * Byte-exact verification of an evidence authority bundle's file tree: every
 * object present, declared, safely pathed, and matching its manifest digest.
 * Split from evidence-admission so admission keeps its semantic checks and
 * this module owns the storage shape.
 */
export declare function verifyBundleTree(directory: string, declarations: Record<string, {
    readonly sha256: string;
    readonly bytes: number;
}>): Promise<void>;
export declare function assertOnlyObjectPaths(declarations: Record<string, unknown>, prefix: string, expected: readonly string[]): void;
export declare function assertSafeObjectPath(path: string): void;
export declare function filesUnder(path: string): Promise<string[]>;
//# sourceMappingURL=evidence-bundle-tree.d.ts.map