import { type CatalogPublicationChangeSet, type CatalogPublicationProposal, type PublicationIngressReceipt } from "../../../contracts/publication/src/index.js";
import type { CatalogDelta, CatalogReleaseBundle } from "../../../contracts/release/src/index.js";
export interface VerifiedPublicationInputs {
    readonly proposal: CatalogPublicationProposal;
    readonly changeSet: CatalogPublicationChangeSet;
    readonly receipts: readonly PublicationIngressReceipt[];
}
export declare function verifyPublicationInputs(bundle: CatalogReleaseBundle, delta: CatalogDelta, files: ReadonlyMap<string, Buffer>): VerifiedPublicationInputs;
//# sourceMappingURL=publication-inputs.d.ts.map