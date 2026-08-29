import type { CatalogReleaseBundle } from "../../../contracts/release/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
export declare function verifiedReleaseFiles(directory: string, bundle: CatalogReleaseBundle): Promise<Map<string, Buffer>>;
export declare function parseReleaseJson(files: ReadonlyMap<string, Buffer>, path: string): unknown;
export declare function requiredReleaseFile(files: ReadonlyMap<string, Buffer>, path: string): Buffer;
export declare function addressFromReleaseJsonPath(path: string): Digest;
//# sourceMappingURL=release-directory-files.d.ts.map