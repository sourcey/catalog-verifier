import { type RevisionDocument } from "../../../contracts/api/src/index.js";
import { type ListingRevision } from "../../../contracts/revisions/src/index.js";
/** A revision a release admitted, as its exact bytes. */
export type RetainedCatalogRevision = RevisionDocument;
/** Reads a retained revision's contract and digest, and proves its bytes against the digest. */
export declare function parseRetainedCatalogRevision(value: unknown): RetainedCatalogRevision;
/** A retained listing revision read for its meaning; any other contract is refused. */
export declare function currentListingRevision(revision: RetainedCatalogRevision): ListingRevision;
//# sourceMappingURL=retained-revision.d.ts.map