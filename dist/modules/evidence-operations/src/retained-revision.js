import { digest } from "provenry/primitives";
import { revisionDocumentSchema } from "../../../contracts/api/src/index.js";
import { catalogRevisionContracts, entityRevisionSchema, offerRevisionSchema, programRevisionSchema, } from "../../../contracts/revisions/src/index.js";
/** Reads a retained revision's contract and digest, and proves its bytes against the digest. */
export function parseRetainedCatalogRevision(value) {
    const parsed = revisionDocumentSchema.safeParse(value);
    if (!parsed.success) {
        const candidate = typeof value === "object" && value !== null ? value : {};
        throw new Error(`Retained revision ${String(candidate.revision_digest ?? "unknown")} (${String(candidate.revision_contract ?? "unknown")}) does not use a released revision contract.`);
    }
    const { revision_digest: revisionDigest, ...core } = parsed.data;
    if (digest(core) !== revisionDigest) {
        throw new Error(`Retained revision ${revisionDigest} does not match its canonical core.`);
    }
    return parsed.data;
}
/** A retained listing revision read for its meaning; any other contract is refused. */
export function currentListingRevision(revision) {
    switch (revision.revision_contract) {
        case catalogRevisionContracts.entity:
            return entityRevisionSchema.parse(revision);
        case catalogRevisionContracts.program:
            return programRevisionSchema.parse(revision);
        case catalogRevisionContracts.offer:
            return offerRevisionSchema.parse(revision);
        default:
            throw new Error(`Revision ${revision.revision_digest} is not a listing revision.`);
    }
}
//# sourceMappingURL=retained-revision.js.map