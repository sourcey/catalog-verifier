import { type CatalogReleaseBundle } from "../../../contracts/release/src/index.js";
/**
 * Proves that every policy pin, addressed policy object, Artifact projection,
 * and closed policy-input declaration names the same content-addressed bytes.
 */
export declare function assertReleasedPolicyClosure(input: {
    readonly files: ReadonlyMap<string, Buffer>;
    readonly bundle: CatalogReleaseBundle;
    readonly artifactPolicyDigests: Readonly<Record<string, string>>;
    readonly snapshotResourceDigests: Readonly<Record<string, string>>;
}): void;
//# sourceMappingURL=policy-closure.d.ts.map