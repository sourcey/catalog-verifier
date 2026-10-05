import { canonicalJson, compareCanonicalStrings, digest } from "provenry/primitives";
import { catalogSubmissionOperatorAdmissionCoreSchema, catalogSubmissionOperatorAdmissionSchema, catalogSubmissionRequestSchema, catalogSubmissionWorkItemCoreSchema, catalogSubmissionWorkItemSchema, } from "../../../contracts/api/src/index.js";
import { parseCatalogAuthoringSources } from "../../catalog-authoring-validation/src/index.js";
export function reviewedAssetWorkItemDigest(workItem) {
    return (workItem.operator_admission?.prior_work_item_digest ??
        workItem.work_item_digest);
}
export function catalogSubmissionAdmissionArtifactDigests(workItem) {
    const verified = verifyCatalogSubmissionWorkItem(workItem);
    const requested = verified.request.authority.kind === "governed_ops"
        ? verified.request.authority.admission_artifact_digests
        : (verified.operator_admission?.admission_artifact_digests ?? []);
    const unique = [...new Set(requested)].sort(compareCanonicalStrings);
    if (unique.length !== requested.length) {
        throw new Error("Submission admission artifact digests must be unique.");
    }
    return unique;
}
/** Pure authoring inspection for intake; publication still runs the compiler. */
export function catalogSubmissionRequestCandidates(input) {
    const request = catalogSubmissionRequestSchema.parse(input);
    const candidateEntities = submissionAuthoring(request.authoring_files);
    return {
        candidateEntities,
        assetSubmissions: request.asset_submissions,
        targetEntityIds: [
            ...new Set([
                ...candidateEntities.map(({ entity }) => entity.entity_id),
                ...request.remove_entity_ids,
                ...request.asset_submissions.map(({ entity_id }) => entity_id),
            ]),
        ].sort(compareCanonicalStrings),
    };
}
export function catalogSubmissionPayloadDigest(input) {
    const request = catalogSubmissionRequestSchema.parse(input);
    return digest({
        authoring_files: request.authoring_files,
        remove_entity_ids: request.remove_entity_ids,
        asset_submissions: request.asset_submissions,
    });
}
/** A corrected admission still binds the original immutable submission, never a replacement customer request. */
export function catalogSubmissionWithOperatorAdmission(input) {
    const workItem = verifyCatalogSubmissionWorkItem(input.workItem);
    const { work_item_digest: _workItemDigest, ...submittedCore } = workItem;
    const originalCore = catalogSubmissionWorkItemCoreSchema.parse({
        ...submittedCore,
        operator_admission: null,
    });
    const admissionCore = catalogSubmissionOperatorAdmissionCoreSchema.parse({
        ...input.admission,
        admission_contract: "sourcey.catalog-submission-operator-admission/v1alpha1",
        submission_id: workItem.submission_id,
        payload_digest: workItem.payload_digest,
        live_parent_release_id: workItem.live_parent_release_id,
        prior_work_item_digest: digest(originalCore),
        reviewed_payload_digest: catalogSubmissionPayloadDigest({
            ...workItem.request,
            authoring_files: input.admission.reviewed_authoring_files,
        }),
    });
    const core = catalogSubmissionWorkItemCoreSchema.parse({
        ...originalCore,
        operator_admission: catalogSubmissionOperatorAdmissionSchema.parse({
            ...admissionCore,
            operator_admission_digest: digest(admissionCore),
        }),
    });
    const admitted = verifyCatalogSubmissionWorkItem({ ...core, work_item_digest: digest(core) });
    catalogSubmissionAdmissionArtifactDigests(admitted);
    catalogSubmissionCandidates(admitted);
    return admitted;
}
function submissionAuthoring(files) {
    return parseCatalogAuthoringSources(files.map(({ path, content }) => ({ source: path.slice("entities/".length), content })), { allowExternalRoleEntities: true })
        .map(({ value }) => value)
        .sort((left, right) => compareCanonicalStrings(left.entity.entity_id, right.entity.entity_id));
}
export function verifyCatalogSubmissionWorkItem(input) {
    const workItem = catalogSubmissionWorkItemSchema.parse(input);
    const { work_item_digest: workItemDigest, ...core } = workItem;
    if (digest(catalogSubmissionWorkItemCoreSchema.parse(core)) !== workItemDigest) {
        throw new Error("Catalog submission work-item digest does not match its protected input.");
    }
    const expectedPayloadDigest = catalogSubmissionPayloadDigest(workItem.request);
    if (expectedPayloadDigest !== workItem.payload_digest) {
        throw new Error("Catalog submission payload digest does not match its authoring bytes.");
    }
    if (workItem.operator_admission) {
        const { operator_admission_digest: admissionDigest, ...admissionCore } = workItem.operator_admission;
        const priorCore = catalogSubmissionWorkItemCoreSchema.parse({
            ...core,
            operator_admission: null,
        });
        if (digest(catalogSubmissionOperatorAdmissionCoreSchema.parse(admissionCore)) !==
            admissionDigest ||
            workItem.operator_admission.submission_id !== workItem.submission_id ||
            workItem.operator_admission.payload_digest !== workItem.payload_digest ||
            workItem.operator_admission.live_parent_release_id !== workItem.live_parent_release_id ||
            workItem.operator_admission.prior_work_item_digest !== digest(priorCore) ||
            !["authenticated_form", "paid_agent"].includes(workItem.request.authority.kind)) {
            throw new Error("Catalog submission operator admission differs from its protected work item.");
        }
        assertReviewedAuthoringPathClosure(workItem.request.authoring_files, workItem.operator_admission.reviewed_authoring_files);
        const reviewedPayloadDigest = digest({
            authoring_files: workItem.operator_admission.reviewed_authoring_files,
            remove_entity_ids: workItem.request.remove_entity_ids,
            asset_submissions: workItem.request.asset_submissions,
        });
        if (reviewedPayloadDigest !== workItem.operator_admission.reviewed_payload_digest) {
            throw new Error("Catalog submission reviewed payload digest does not match its exact bytes.");
        }
    }
    return workItem;
}
export function catalogSubmissionCandidates(input) {
    const workItem = verifyCatalogSubmissionWorkItem(input);
    const authoringFiles = workItem.operator_admission?.reviewed_authoring_files ?? workItem.request.authoring_files;
    if (workItem.operator_admission) {
        assertReviewedAuthoringIdentityClosure(workItem.request.authoring_files, authoringFiles);
    }
    return catalogSubmissionRequestCandidates({
        ...workItem.request,
        authoring_files: authoringFiles,
    });
}
/**
 * Validate a prospective operator correction before an immutable admission
 * exists. Review applications use this to evaluate the exact repaired bytes;
 * attaching authority remains a later, separately protected transition.
 */
export function catalogSubmissionReviewCandidates(input) {
    const workItem = verifyCatalogSubmissionWorkItem(input.workItem);
    const reviewedAuthoringFiles = input.reviewedAuthoringFiles.map((file) => ({ ...file }));
    assertReviewedAuthoringPathClosure(workItem.request.authoring_files, reviewedAuthoringFiles);
    assertReviewedAuthoringIdentityClosure(workItem.request.authoring_files, reviewedAuthoringFiles);
    return {
        ...catalogSubmissionRequestCandidates({
            ...workItem.request,
            authoring_files: reviewedAuthoringFiles,
        }),
        reviewedPayloadDigest: catalogSubmissionPayloadDigest({
            ...workItem.request,
            authoring_files: reviewedAuthoringFiles,
        }),
    };
}
function assertReviewedAuthoringPathClosure(submitted, reviewed) {
    const submittedPaths = submitted.map(({ path }) => path).sort(compareCanonicalStrings);
    const reviewedPaths = reviewed.map(({ path }) => path).sort(compareCanonicalStrings);
    if (new Set(submittedPaths).size !== submittedPaths.length ||
        new Set(reviewedPaths).size !== reviewedPaths.length ||
        canonicalJson(submittedPaths) !== canonicalJson(reviewedPaths)) {
        throw new Error("Catalog submission review must preserve the exact submitted authoring path set.");
    }
}
function assertReviewedAuthoringIdentityClosure(submitted, reviewed) {
    const identitySet = (files) => {
        return submissionAuthoring(files)
            .map(({ entity, programs, offers }) => ({
            entity_id: entity.entity_id,
            program_ids: programs
                .map(({ program_id: programId }) => programId)
                .sort(compareCanonicalStrings),
            offer_ids: offers.map(({ offer_id: offerId }) => offerId).sort(compareCanonicalStrings),
        }))
            .sort((left, right) => compareCanonicalStrings(left.entity_id, right.entity_id));
    };
    if (canonicalJson(identitySet(submitted)) !== canonicalJson(identitySet(reviewed))) {
        throw new Error("Catalog submission review must preserve every submitted Entity, Program, and Offer identity.");
    }
}
//# sourceMappingURL=submission-input.js.map