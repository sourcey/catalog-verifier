import { type CatalogPublicationComposition } from "../../../contracts/publication/src/index.js";
import type { CatalogDelta, CatalogReleaseBundle } from "../../../contracts/release/src/index.js";
export type VerifiedPublicationInputs = CatalogPublicationComposition;
export declare function verifyPublicationInputs(bundle: CatalogReleaseBundle, delta: CatalogDelta, files: ReadonlyMap<string, Buffer>): VerifiedPublicationInputs;
//# sourceMappingURL=publication-inputs.d.ts.map