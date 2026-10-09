import { canonicalJson, compareCanonicalStrings } from "provenry/primitives";
import { CATALOG_SUBMISSION_STAGES, catalogSubmissionProcessingResultSchema, } from "../../../contracts/api/src/index.js";
import { compileAuthoringEntities } from "../../compiler/src/index.js";
import { buildPublicationIngressReceipt, planCatalogPublication, } from "./publication.js";
import { verifyCatalogPublicationInputClosure } from "./publication-composition.js";
import { catalogSubmissionCandidates, verifyCatalogSubmissionWorkItem, } from "./submission-input.js";
import { verifyCatalogSubmissionPublicationState } from "./submission-state.js";
export { catalogSubmissionCandidates, verifyCatalogSubmissionWorkItem, } from "./submission-input.js";
export function catalogSubmissionAwaitingReviewResult(input) {
    const state = verifyCatalogSubmissionPublicationState(input);
    const workItem = input.workItem;
    return catalogSubmissionProcessingResultSchema.parse({
        state: "awaiting_review",
        proposal_digest: null,
        change_set_digest: null,
        live_parent_release_id: state.live_parent_release_id,
        publication_release_id: null,
        stages: CATALOG_SUBMISSION_STAGES.map((stage) => ({
            stage,
            status: stage === "validation"
                ? "passed"
                : stage === "evidence" && workItem.request.authoring_files.length === 0
                    ? "not_required"
                    : "pending",
            diagnostics: stage === "authorization" && workItem.operator_admission
                ? [
                    {
                        stage,
                        code: "operator_admission_incomplete",
                        message: "Sourcey needs to complete its retained review. Your submission and payment remain unchanged.",
                    },
                ]
                : [],
        })),
        telemetry: {
            active_ms: 0,
            live_readback_ms: null,
            closure_cardinality: state.target_entity_ids.length,
            stages_invoked: ["validation"],
            cache_reuse: { reused: 0, created: 0 },
        },
    });
}
export function catalogSubmissionInvalidatedResult(input) {
    const { targetEntityIds } = catalogSubmissionCandidates(input.workItem);
    return catalogSubmissionProcessingResultSchema.parse({
        state: "invalidated",
        proposal_digest: null,
        change_set_digest: null,
        live_parent_release_id: input.currentState.live_parent_release_id,
        publication_release_id: null,
        stages: CATALOG_SUBMISSION_STAGES.map((stage) => ({
            stage,
            status: stage === "validation" ? "invalidated" : "not_required",
            diagnostics: stage === "validation"
                ? [
                    {
                        stage,
                        code: "target_state_changed",
                        message: input.conflict.role
                            ? "This company's icon changed after submission. Review the current record before continuing."
                            : "This company changed after submission. Review the current record before continuing.",
                        path: input.conflict.entityId,
                    },
                ]
                : [],
        })),
        telemetry: {
            active_ms: 0,
            live_readback_ms: null,
            closure_cardinality: targetEntityIds.length,
            stages_invoked: ["validation"],
            cache_reuse: { reused: 0, created: 0 },
        },
    });
}
export function planCatalogSubmissionPublication(input) {
    const scope = submissionPublicationScope(input.workItem);
    const { workItem, candidateEntities, targetEntityIds, publicationAuthorized } = scope;
    const state = verifyCatalogSubmissionPublicationState(input);
    const candidateAssetProposals = input.candidateAssetProposals ?? [];
    const currentEntityIds = state.current_entities
        .map(({ entity: { entity_id: entityId } }) => entityId)
        .sort(compareCanonicalStrings);
    if (currentEntityIds.some((entityId) => !targetEntityIds.includes(entityId))) {
        throw new Error("Submission publication current state exceeds its exact targeted slice.");
    }
    const planning = {
        liveParentReleaseId: state.live_parent_release_id,
        currentEntities: state.current_entities,
        candidateEntities,
        currentAssetBindings: state.current_asset_bindings,
        candidateAssetProposals,
        removeEntityIds: workItem.request.remove_entity_ids,
        ...(input.authorityProposals ? { authorityProposals: input.authorityProposals } : {}),
        currentPolicies: input.currentPolicies,
        targetPolicies: input.targetPolicies,
        currentContractAuthorityDigest: input.currentContractAuthorityDigest,
        targetContractAuthorityDigest: input.targetContractAuthorityDigest,
        ...(input.impactIndex ? { impactIndex: input.impactIndex } : {}),
    };
    const planned = planCatalogPublication(planning);
    assertSubmissionPublicationScope(scope, planned.proposal);
    if (planned.proposal.live_parent_release_id !== state.live_parent_release_id) {
        throw new Error("Catalog submission planner changed its exact semantic input.");
    }
    return {
        ...planned,
        ingressReceipt: submissionIngressReceipt(workItem, planned.proposal),
        publicationAuthorized,
        targetEntityIds,
    };
}
/** Binds retained submission work to already verified publication inputs.
 * This does not replan against current state or assert that the release is live. */
export function verifyCatalogSubmissionPublication(input) {
    const scope = submissionPublicationScope(input.workItem);
    const { ingresses } = verifyCatalogPublicationInputClosure(input);
    const matches = ingresses.filter(({ proposal, ingress_receipt }) => ingress_receipt.receipt_digest ===
        submissionIngressReceipt(scope.workItem, proposal).receipt_digest);
    const [matched] = matches;
    if (!matched || matches.length !== 1)
        throw new Error("Retained publication does not bind this submission's exact authorization.");
    const { proposal, change_set: changeSet, ingress_receipt: ingressReceipt } = matched;
    assertSubmissionPublicationScope(scope, proposal);
    return {
        proposal,
        changeSet,
        ingressReceipt,
        publicationAuthorized: scope.publicationAuthorized,
        targetEntityIds: scope.targetEntityIds,
    };
}
function submissionPublicationScope(input) {
    const workItem = verifyCatalogSubmissionWorkItem(input);
    const { candidateEntities, assetSubmissions, targetEntityIds } = catalogSubmissionCandidates(workItem);
    const { authoring } = compileAuthoringEntities(candidateEntities, {
        allowExternalRoleEntities: true,
    });
    return {
        workItem,
        candidateEntities: authoring,
        assetSubmissions,
        targetEntityIds,
        publicationAuthorized: workItem.authorization_policy === "publication" || workItem.operator_admission !== null,
    };
}
function assertSubmissionPublicationScope(scope, proposal) {
    assertAssetSubmissionProposalClosure(scope.assetSubmissions, proposal.candidate_assets, {
        candidateEntityIds: scope.candidateEntities.map(({ entity }) => entity.entity_id),
        currentEntityIds: proposal.expected_current_entities
            .filter(({ snapshot_digest }) => snapshot_digest !== null)
            .map(({ entity_id }) => entity_id),
    });
    if (canonicalJson(proposal.candidate_entities) !== canonicalJson(scope.candidateEntities) ||
        canonicalJson(proposal.remove_entity_ids) !==
            canonicalJson([...scope.workItem.request.remove_entity_ids].sort(compareCanonicalStrings)) ||
        canonicalJson(proposal.expected_current_entities.map(({ entity_id }) => entity_id)) !==
            canonicalJson(scope.targetEntityIds))
        throw new Error("Publication does not contain the exact submitted changes.");
}
function submissionIngressReceipt(workItem, proposal) {
    const authority = workItem.request.authority;
    const common = {
        submission_work_item_digest: workItem.work_item_digest,
        authentication_digest: workItem.authentication_digest,
        authorization_digest: workItem.authorization_digest,
        idempotency_key: workItem.idempotency_key,
    };
    return buildPublicationIngressReceipt(proposal, authority.kind === "governed_ops"
        ? {
            ...common,
            kind: authority.kind,
            command_digest: authority.command_digest,
            grant_digest: authority.grant_digest,
            approval_digest: authority.approval_digest,
            run_receipt_digest: authority.run_receipt_digest,
        }
        : {
            ...common,
            schema_digest: proposal.target_contract_authority_digest,
            payload_digest: workItem.payload_digest,
            operator_admission_digest: workItem.operator_admission?.operator_admission_digest ?? null,
            ...(authority.kind === "paid_agent"
                ? { kind: authority.kind, request_id: authority.request_id }
                : { kind: authority.kind }),
        });
}
function assertAssetSubmissionProposalClosure(submissions, proposals, context) {
    const unmatched = [...proposals];
    for (const submission of submissions) {
        const index = unmatched.findIndex((proposal) => catalogSubmissionAssetProposalMatches(submission, proposal));
        if (index < 0) {
            throw new Error(`Entity asset submission ${submission.entity_id}:${submission.role} is unresolved.`);
        }
        unmatched.splice(index, 1);
    }
    const newEntityIds = new Set(context.candidateEntityIds.filter((entityId) => !context.currentEntityIds.includes(entityId)));
    if (unmatched.length > 0 &&
        unmatched.some((proposal) => proposal.role !== "icon" || !newEntityIds.has(proposal.entity_id))) {
        throw new Error("A reviewed asset may supplement only a new submitted Entity with its icon proposal.");
    }
}
export function catalogSubmissionAssetProposalMatches(submission, proposal) {
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
    assertCatalogSubmissionPublicationReady(input.planned);
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
export function assertCatalogSubmissionPublicationReady(planned) {
    if (!planned.publicationAuthorized) {
        throw new Error("A proposal-only submission cannot be reported as published.");
    }
    if (catalogSubmissionMissingAdmissionPurposes(planned).length > 0) {
        throw new Error("A submission with missing admissions cannot be reported as published.");
    }
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
            status: requiredStage(required.has("catalog-evidence")),
            diagnostics: [],
        },
        {
            stage: "identity",
            status: requiredStage(required.has("catalog-identity")),
            diagnostics: [],
        },
        {
            stage: "readiness",
            status: requiredStage(affectedDomains.has("agent-readiness") ||
                affectedDomains.has("agent-readiness-offer-relation")),
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