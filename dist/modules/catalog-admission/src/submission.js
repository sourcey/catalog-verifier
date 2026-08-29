import { CATALOG_SUBMISSION_STAGES, catalogSubmissionOperatorAdmissionCoreSchema, catalogSubmissionProcessingResultSchema, catalogSubmissionWorkItemCoreSchema, catalogSubmissionWorkItemSchema, } from "../../../contracts/api/src/index.js";
import { compileAuthoringSources } from "../../compiler/src/index.js";
import { canonicalJson, compareCanonicalStrings, digest, } from "../../primitives/src/index.js";
import { planAuthenticatedFormCatalogPublication, planGovernedOpsCatalogPublication, planPaidAgentCatalogPublication, } from "./publication.js";
export function verifyCatalogSubmissionWorkItem(input) {
    const workItem = catalogSubmissionWorkItemSchema.parse(input);
    const { work_item_digest: workItemDigest, ...core } = workItem;
    if (digest(catalogSubmissionWorkItemCoreSchema.parse(core)) !== workItemDigest) {
        throw new Error("Catalog submission work-item digest does not match its protected input.");
    }
    const expectedPayloadDigest = digest({
        authoring_files: workItem.request.authoring_files,
        remove_entity_ids: workItem.request.remove_entity_ids,
        asset_submissions: workItem.request.asset_submissions,
    });
    if (expectedPayloadDigest !== workItem.payload_digest) {
        throw new Error("Catalog submission payload digest does not match its authoring bytes.");
    }
    if (workItem.operator_admission) {
        const { operator_admission_digest: admissionDigest, ...admissionCore } = workItem.operator_admission;
        if (digest(catalogSubmissionOperatorAdmissionCoreSchema.parse(admissionCore)) !==
            admissionDigest ||
            workItem.operator_admission.submission_id !== workItem.submission_id ||
            workItem.operator_admission.payload_digest !== workItem.payload_digest ||
            workItem.operator_admission.live_parent_release_id !== workItem.live_parent_release_id ||
            !["authenticated_form", "paid_agent"].includes(workItem.request.authority.kind)) {
            throw new Error("Catalog submission operator admission differs from its protected work item.");
        }
    }
    return workItem;
}
export function catalogSubmissionCandidates(input) {
    const workItem = verifyCatalogSubmissionWorkItem(input);
    const candidateEntities = compileAuthoringSources(workItem.request.authoring_files.map(({ path, content }) => ({
        source: path.slice("entities/".length),
        content,
    })), { allowExternalRoleEntities: true }).authoring;
    const targetEntityIds = [
        ...new Set([
            ...candidateEntities.map(({ entity: { entity_id: entityId } }) => entityId),
            ...workItem.request.remove_entity_ids,
            ...workItem.request.asset_submissions.map(({ entity_id: entityId }) => entityId),
        ]),
    ].sort(compareCanonicalStrings);
    return {
        candidateEntities,
        assetSubmissions: workItem.request.asset_submissions,
        targetEntityIds,
    };
}
export function catalogSubmissionAwaitingReviewResult(input) {
    const workItem = verifyCatalogSubmissionWorkItem(input);
    if (workItem.request.asset_submissions.length === 0 || workItem.operator_admission) {
        throw new Error("Only an unresolved Entity asset submission can await operator review.");
    }
    return catalogSubmissionProcessingResultSchema.parse({
        state: "awaiting_review",
        proposal_digest: null,
        change_set_digest: null,
        live_parent_release_id: workItem.live_parent_release_id,
        publication_release_id: null,
        stages: CATALOG_SUBMISSION_STAGES.map((stage) => ({
            stage,
            status: stage === "validation"
                ? "passed"
                : stage === "evidence" || stage === "content"
                    ? "not_required"
                    : "pending",
            diagnostics: [],
        })),
        telemetry: {
            active_ms: 0,
            live_readback_ms: null,
            closure_cardinality: workItem.request.asset_submissions.length,
            stages_invoked: ["validation"],
            cache_reuse: { reused: 0, created: 0 },
        },
    });
}
export function planCatalogSubmissionPublication(input) {
    const workItem = verifyCatalogSubmissionWorkItem(input.workItem);
    const { candidateEntities, assetSubmissions, targetEntityIds } = catalogSubmissionCandidates(workItem);
    const candidateAssetProposals = input.candidateAssetProposals ?? [];
    assertAssetSubmissionProposalClosure(assetSubmissions, candidateAssetProposals);
    const currentEntityIds = input.currentEntities
        .map(({ entity: { entity_id: entityId } }) => entityId)
        .sort(compareCanonicalStrings);
    if (currentEntityIds.some((entityId) => !targetEntityIds.includes(entityId))) {
        throw new Error("Submission publication current state exceeds its exact targeted slice.");
    }
    const planning = {
        liveParentReleaseId: workItem.live_parent_release_id,
        currentEntities: input.currentEntities,
        candidateEntities,
        currentAssetBindings: input.currentAssetBindings ?? [],
        candidateAssetProposals,
        removeEntityIds: workItem.request.remove_entity_ids,
        ...(input.authorityProposals ? { authorityProposals: input.authorityProposals } : {}),
        currentPolicies: input.currentPolicies,
        targetPolicies: input.targetPolicies,
        currentContractAuthorityDigest: input.currentContractAuthorityDigest,
        targetContractAuthorityDigest: input.targetContractAuthorityDigest,
        ...(input.impactIndex ? { impactIndex: input.impactIndex } : {}),
    };
    const authority = workItem.request.authority;
    const planned = authority.kind === "authenticated_form"
        ? planAuthenticatedFormCatalogPublication(planning, {
            kind: "authenticated_form",
            schema_digest: input.targetContractAuthorityDigest,
            payload_digest: workItem.payload_digest,
            authentication_digest: workItem.authentication_digest,
            authorization_digest: workItem.authorization_digest,
            operator_admission_digest: workItem.operator_admission?.operator_admission_digest ?? null,
            idempotency_key: workItem.idempotency_key,
        })
        : authority.kind === "paid_agent"
            ? planPaidAgentCatalogPublication(planning, {
                kind: "paid_agent",
                schema_digest: input.targetContractAuthorityDigest,
                payload_digest: workItem.payload_digest,
                authentication_digest: workItem.authentication_digest,
                authorization_digest: workItem.authorization_digest,
                request_id: authority.request_id,
                idempotency_key: workItem.idempotency_key,
            })
            : planGovernedOpsCatalogPublication(planning, {
                kind: "governed_ops",
                command_digest: authority.command_digest,
                grant_digest: authority.grant_digest,
                approval_digest: authority.approval_digest,
                run_receipt_digest: authority.run_receipt_digest,
                authentication_digest: workItem.authentication_digest,
                authorization_digest: workItem.authorization_digest,
                idempotency_key: workItem.idempotency_key,
            });
    if (canonicalJson(planned.proposal.candidate_entities) !== canonicalJson(candidateEntities) ||
        planned.proposal.live_parent_release_id !== workItem.live_parent_release_id) {
        throw new Error("Catalog submission planner changed its exact semantic input.");
    }
    return {
        ...planned,
        publicationAuthorized: workItem.authorization_policy === "publication" || workItem.operator_admission !== null,
        targetEntityIds,
    };
}
function assertAssetSubmissionProposalClosure(submissions, proposals) {
    if (submissions.length !== proposals.length) {
        throw new Error("Entity asset submissions require one exact admitted asset proposal each.");
    }
    const unmatched = [...proposals];
    for (const submission of submissions) {
        const index = unmatched.findIndex((proposal) => assetSubmissionMatches(submission, proposal));
        if (index < 0) {
            throw new Error(`Entity asset submission ${submission.entity_id}:${submission.role} is unresolved.`);
        }
        unmatched.splice(index, 1);
    }
}
function assetSubmissionMatches(submission, proposal) {
    if (submission.entity_id !== proposal.entity_id ||
        submission.role !== proposal.role ||
        submission.expected_current_binding_event_id !== proposal.expected_current_binding_event_id ||
        canonicalJson(submission.redistribution) !== canonicalJson(proposal.asset.redistribution)) {
        return false;
    }
    if (submission.source.kind === "upload") {
        return (proposal.capture.source.kind === "upload" &&
            proposal.capture.source.upload_receipt_digest === submission.source.upload_receipt_digest &&
            proposal.capture.original_digest === submission.source.original_digest &&
            proposal.capture.bytes === submission.source.bytes &&
            proposal.capture.media_type === submission.source.media_type);
    }
    return (proposal.capture.source.kind === "official_url" &&
        proposal.capture.source.requested_url === submission.source.url);
}
export function catalogSubmissionAwaitingResult(planned) {
    if (planned.publicationAuthorized &&
        catalogSubmissionMissingAdmissionPurposes(planned).length === 0) {
        throw new Error("Authorized submission with admissions is ready for publication.");
    }
    const state = planned.publicationAuthorized
        ? "awaiting_admission"
        : "awaiting_authorization";
    return catalogSubmissionProcessingResultSchema.parse({
        state,
        proposal_digest: planned.proposal.proposal_digest,
        change_set_digest: planned.changeSet.change_set_digest,
        live_parent_release_id: planned.proposal.live_parent_release_id,
        publication_release_id: null,
        stages: submissionStages(planned, state),
        telemetry: {
            active_ms: 0,
            live_readback_ms: null,
            closure_cardinality: planned.changeSet.revision_changes.length,
            stages_invoked: ["validation", "authorization"],
            cache_reuse: { reused: 0, created: 0 },
        },
    });
}
export function catalogSubmissionPublishedResult(input) {
    if (!input.planned.publicationAuthorized) {
        throw new Error("A proposal-only submission cannot be reported as published.");
    }
    if (catalogSubmissionMissingAdmissionPurposes(input.planned).length > 0) {
        throw new Error("A submission with missing admissions cannot be reported as published.");
    }
    const stages = submissionStages(input.planned, "published");
    return catalogSubmissionProcessingResultSchema.parse({
        state: "published",
        proposal_digest: input.planned.proposal.proposal_digest,
        change_set_digest: input.planned.changeSet.change_set_digest,
        live_parent_release_id: input.planned.proposal.live_parent_release_id,
        publication_release_id: input.publicationReleaseId,
        stages,
        telemetry: {
            active_ms: input.activeMs,
            live_readback_ms: input.liveReadbackMs,
            closure_cardinality: input.planned.changeSet.revision_changes.length,
            stages_invoked: stages.filter(({ status }) => status === "passed").map(({ stage }) => stage),
            cache_reuse: input.cacheReuse ?? { reused: 0, created: 0 },
        },
    });
}
export function catalogSubmissionMissingAdmissionPurposes(planned) {
    const admitted = new Set(planned.proposal.authority_proposals.map(({ purpose }) => purpose));
    const operatorAuthorizedContext = planned.publicationAuthorized && planned.ingressReceipt.kind === "governed_ops";
    return planned.changeSet.required_authorities.filter((purpose) => purpose !== "catalog-release" &&
        !admitted.has(purpose) &&
        !(operatorAuthorizedContext &&
            (purpose === "catalog-authority" || purpose === "catalog-policy")));
}
function submissionStages(planned, state) {
    const required = new Set(planned.changeSet.required_authorities);
    const affectedDomains = new Set(planned.changeSet.affected_dependents.map(({ domain }) => domain));
    const requiredStage = (required_) => state === "published"
        ? required_
            ? "passed"
            : "not_required"
        : required_
            ? "pending"
            : "not_required";
    return [
        { stage: "validation", status: "passed", diagnostics: [] },
        {
            stage: "evidence",
            status: requiredStage(required.has("catalog-evidence") || required.has("catalog-capture")),
            diagnostics: [],
        },
        {
            stage: "identity",
            status: requiredStage(required.has("catalog-identity")),
            diagnostics: [],
        },
        {
            stage: "content",
            status: requiredStage(affectedDomains.has("content")),
            diagnostics: [],
        },
        {
            stage: "readiness",
            status: requiredStage(affectedDomains.has("readiness")),
            diagnostics: [],
        },
        {
            stage: "authorization",
            status: state === "awaiting_authorization" ? "pending" : "passed",
            diagnostics: state === "awaiting_authorization"
                ? [
                    {
                        stage: "authorization",
                        code: "publication_authorization_required",
                        message: "This exact proposal requires a publication authorization.",
                    },
                ]
                : [],
        },
        {
            stage: "publication",
            status: state === "published" ? "passed" : "pending",
            diagnostics: [],
        },
        {
            stage: "readback",
            status: state === "published" ? "passed" : "pending",
            diagnostics: [],
        },
    ];
}
//# sourceMappingURL=submission.js.map