import type { CatalogSubmissionProcessingResult } from "../../../contracts/api/src/index.js";
import type { CatalogSubmissionVerifierModule } from "../../../contracts/catalog-verifier/src/index.js";
import type { CatalogSubmissionPublicationReference } from "../../../contracts/publication/src/index.js";
import { type VerifiedCatalogDelta } from "./verifier.js";
/** Stable host-facing binding. The exact verifier retains its semantic plan in
 * the completion closure; newer hosts never reinterpret historical findings. */
export interface VerifiedCatalogSubmissionPublication {
    readonly binding: Pick<CatalogSubmissionPublicationReference, "work_item_digest" | "release_id" | "release_sequence" | "parent_release_id" | "bundle_digest" | "verifier_digest">;
    readonly admittedInputDigests: readonly string[];
    /** Complete submission membership of the verified bundle, not only this result's member. */
    readonly submissionWorkItemDigests: readonly string[];
    complete(timing: {
        readonly activeMs: number;
        readonly liveReadbackMs: number;
    }): CatalogSubmissionProcessingResult;
}
/** Exported by the immutable Catalog Verifier alongside raw delta verification.
 * Admission confirmation stays with the publication application, not this
 * verifier. Merely verifying a directory never claims it is live. */
export declare function verifyCatalogSubmissionDirectory(input: Parameters<CatalogSubmissionVerifierModule["verifyCatalogSubmissionDirectory"]>[0]): Promise<VerifiedCatalogSubmissionPublication>;
/** Membership in a release already checked by this installed verifier. Callers
 * retain this result only within that exact preparation; persisted recovery
 * always re-enters through the bound directory verifier above. */
export declare function verifyCatalogSubmissionInRelease(checked: Pick<VerifiedCatalogDelta, "bundle" | "publicationProposal" | "publicationChangeSet" | "publicationIngresses">, input: unknown): VerifiedCatalogSubmissionPublication;
//# sourceMappingURL=submission-verification.d.ts.map