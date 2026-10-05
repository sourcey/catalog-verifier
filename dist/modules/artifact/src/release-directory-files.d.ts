import { type Digest } from "provenry/primitives";
import type { Observation } from "../../../contracts/observations/src/index.js";
import { type CatalogReleaseBundle } from "../../../contracts/release/src/index.js";
/** How errors name the file set of one Catalog release. */
export declare const CATALOG_RELEASE = "Catalog release";
export declare function addressFromReleaseJsonPath(path: string): Digest;
/**
 * The public evidence bytes a verified release carries for its observations. The
 * envelope proved every file against its declaration, so a declared digest equal
 * to the object's address proves the bytes without hashing them again.
 */
export declare function releasedEvidenceObjects(observations: readonly Observation[], files: ReadonlyMap<string, Buffer>, declarations: CatalogReleaseBundle["files"]): {
    readonly captures: ReadonlyMap<Digest, Buffer>;
    readonly normalizedObjects: ReadonlyMap<Digest, Buffer>;
};
//# sourceMappingURL=release-directory-files.d.ts.map