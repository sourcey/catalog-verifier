/**
 * Byte-exact verification of an authority bundle's file tree: every object
 * present, declared, safely pathed, and matching its manifest digest. Split
 * from admission so each lane keeps its semantic checks and this module owns
 * the storage shape.
 */
export declare function verifyBundleTree(directory: string, declarations: Record<string, {
    readonly sha256: string;
    readonly bytes: number;
}>, label: string): Promise<void>;
export declare function assertOnlyObjectPaths(declarations: Record<string, unknown>, prefix: string, expected: readonly string[]): void;
export declare function assertSafeObjectPath(path: string, label: string): void;
export declare function filesUnder(path: string, label: string): Promise<string[]>;
//# sourceMappingURL=evidence-bundle-tree.d.ts.map