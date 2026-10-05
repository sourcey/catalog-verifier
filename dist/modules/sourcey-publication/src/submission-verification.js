import { orderedUnique } from "../../catalog-admission/src/publication-dependencies.js";
import { assertCatalogSubmissionPublicationReady, catalogSubmissionPublishedResult, verifyCatalogSubmissionPublication, verifyCatalogSubmissionWorkItem, } from "../../catalog-admission/src/submission.js";
import { verifyCatalogDeltaDirectory } from "./verifier.js";
/** Exported by the immutable Catalog Verifier alongside raw delta verification.
 * Admission confirmation stays with the publication application, not this
 * verifier. Merely verifying a directory never claims it is live. */
export async function verifyCatalogSubmissionDirectory(input) {
    const checked = await verifyCatalogDeltaDirectory(input.directory);
    return verifyCatalogSubmissionInRelease(checked, input.workItem);
}
/** Membership in a release already checked by this installed verifier. Callers
 * retain this result only within that exact preparation; persisted recovery
 * always re-enters through the bound directory verifier above. */
export function verifyCatalogSubmissionInRelease(checked, input) {
    const workItem = verifyCatalogSubmissionWorkItem(input);
    const planned = verifyCatalogSubmissionPublication({
        workItem,
        proposal: checked.publicationProposal,
        change_set: checked.publicationChangeSet,
        ingresses: [...checked.publicationIngresses],
    });
    assertCatalogSubmissionPublicationReady(planned);
    const release = checked.bundle.release;
    const parent = release.release_core.parent_release_id;
    if (parent === null)
        throw new Error("A submission publication must extend a retained parent.");
    const releaseId = release.release_id;
    return {
        binding: {
            work_item_digest: workItem.work_item_digest,
            release_id: releaseId,
            release_sequence: release.release_core.release_sequence,
            parent_release_id: parent,
            bundle_digest: checked.bundle.bundle_digest,
            verifier_digest: checked.bundle.verifier_digest,
        },
        admittedInputDigests: checked.bundle.admitted_input_digests,
        submissionWorkItemDigests: orderedUnique(checked.publicationIngresses.flatMap(({ ingress_receipt }) => "submission_work_item_digest" in ingress_receipt &&
            ingress_receipt.submission_work_item_digest
            ? [ingress_receipt.submission_work_item_digest]
            : [])),
        complete: (timing) => catalogSubmissionPublishedResult({ planned, publicationReleaseId: releaseId, ...timing }),
    };
}
//# sourceMappingURL=submission-verification.js.map