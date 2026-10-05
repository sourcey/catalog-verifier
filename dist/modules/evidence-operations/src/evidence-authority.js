import { canonicalJson, compareCanonicalStrings, deriveOperationId, digest, } from "provenry/primitives";
import { z } from "zod";
import { agentReadinessDeclarationRevisionCoreSchema, agentReadinessDeclarationRevisionSchema, agentReadinessOfferRelationInputSchema, agentReadinessProfileInputSchema, agentReadinessRevisionContract, agentReadinessRevisionSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { sourceyEvidenceCaptureMethodVersion } from "../../../contracts/capture/src/method-names.js";
import { catalogEventCoreSchema, catalogEventIntentSchema, } from "../../../contracts/events/src/index.js";
import { captureReceiptCoreSchema, evidenceReviewDecisionCoreSchema, evidenceReviewDecisionSchema, } from "../../../contracts/evidence/src/index.js";
import { observationCoreSchema, observationSchema, } from "../../../contracts/observations/src/index.js";
import { catalogRevisionContracts, entityRevisionSchema, offerRevisionSchema, programRevisionSchema, } from "../../../contracts/revisions/src/index.js";
import { evidenceReviewProposalSchema, verifyEvidenceReviewProposal, } from "./submission-verifier.js";
const digestSchema = z.string().regex(/^sha256:[a-f0-9]{64}$/);
const instantSchema = z.iso.datetime({ offset: true });
const captureReceiptIntentSchema = z
    .object({
    receipt_digest: digestSchema,
    core: captureReceiptCoreSchema,
})
    .strict();
export const evidenceCatalogProposalCoreSchema = z
    .object({
    catalog_proposal_contract: z.literal("sourcey.evidence-catalog-proposal/v1alpha1"),
    materialized_at: instantSchema,
    review_proposal: evidenceReviewProposalSchema,
    review_decision: evidenceReviewDecisionSchema,
    subject_revision: z.union([
        entityRevisionSchema,
        programRevisionSchema,
        offerRevisionSchema,
        agentReadinessRevisionSchema,
    ]),
    agent_readiness_profile_input: agentReadinessProfileInputSchema.nullable(),
    agent_readiness_declaration_revision: agentReadinessDeclarationRevisionSchema.nullable(),
    agent_readiness_offer_relation_inputs: z.array(agentReadinessOfferRelationInputSchema),
    authority_entity_revision: entityRevisionSchema,
    authority_program_revision: programRevisionSchema.nullable(),
    capture_receipt_intent: captureReceiptIntentSchema,
    observations: z.array(observationSchema).min(1).max(2),
    event_intents: z.array(catalogEventIntentSchema).min(1).max(2),
})
    .strict()
    .superRefine((value, context) => {
    const readiness = value.subject_revision.revision_contract === agentReadinessRevisionContract;
    if (readiness !== (value.agent_readiness_profile_input !== null)) {
        context.addIssue({
            code: "custom",
            path: ["agent_readiness_profile_input"],
            message: "Only an Agent Readiness revision requires its exact canonical profile input.",
        });
    }
    if (readiness !== (value.agent_readiness_declaration_revision !== null)) {
        context.addIssue({
            code: "custom",
            path: ["agent_readiness_declaration_revision"],
            message: "Only an Agent Readiness revision requires its exact declaration revision.",
        });
    }
    if (readiness &&
        (!value.agent_readiness_profile_input ||
            !value.agent_readiness_declaration_revision ||
            value.agent_readiness_profile_input.declaration_revision_digest !==
                value.agent_readiness_declaration_revision.revision_digest ||
            value.agent_readiness_profile_input.entity_id !==
                value.agent_readiness_declaration_revision.entity_id)) {
        context.addIssue({
            code: "custom",
            path: ["agent_readiness_declaration_revision"],
            message: "Agent Readiness evidence must bind one exact Entity declaration revision.",
        });
    }
    if (!readiness && value.agent_readiness_offer_relation_inputs.length > 0) {
        context.addIssue({
            code: "custom",
            path: ["agent_readiness_offer_relation_inputs"],
            message: "Only Agent Readiness evidence may carry Offer relations.",
        });
    }
    for (const [index, relation] of value.agent_readiness_offer_relation_inputs.entries()) {
        if (!value.agent_readiness_profile_input ||
            !value.agent_readiness_declaration_revision ||
            relation.agent_readiness_profile_id !==
                value.agent_readiness_profile_input.agent_readiness_profile_id ||
            relation.declaration_revision_digest !==
                value.agent_readiness_declaration_revision.revision_digest) {
            context.addIssue({
                code: "custom",
                path: ["agent_readiness_offer_relation_inputs", index],
                message: "Agent Readiness Offer relations must bind the exact profile and declaration.",
            });
        }
    }
});
export const evidenceCatalogProposalSchema = evidenceCatalogProposalCoreSchema
    .extend({ proposal_digest: digestSchema })
    .strict();
export function evidenceCatalogProposalRevisionDigests(input) {
    const proposal = evidenceCatalogProposalSchema.parse(input);
    return [
        ...new Set([
            proposal.subject_revision.revision_digest,
            proposal.authority_entity_revision.revision_digest,
            ...(proposal.authority_program_revision
                ? [proposal.authority_program_revision.revision_digest]
                : []),
            ...(proposal.agent_readiness_declaration_revision
                ? [proposal.agent_readiness_declaration_revision.revision_digest]
                : []),
        ]),
    ].sort(compareCanonicalStrings);
}
export function createEvidenceReviewDecision(input) {
    const proposal = evidenceReviewProposalSchema.parse(input.reviewProposal);
    const core = evidenceReviewDecisionCoreSchema.parse({
        review_decision_contract: "sourcey.evidence-review-decision/v1alpha1",
        review_proposal_digest: proposal.proposal_digest,
        decision_basis: input.decisionBasis,
        decision: input.decision,
        decided_at: input.decidedAt,
        rationale: input.rationale,
    });
    return evidenceReviewDecisionSchema.parse({
        ...core,
        decision_digest: digest(core),
    });
}
export function createEvidenceCatalogProposal(input) {
    const prepared = prepareEvidenceAuthorityIntents(input);
    return finalizeEvidenceCatalogProposal({
        prepared,
        agentReadinessProfileInput: input.agentReadinessProfileInput,
        agentReadinessDeclarationRevision: input.agentReadinessDeclarationRevision,
        agentReadinessOfferRelationInputs: input.agentReadinessOfferRelationInputs ?? [],
        ...(input.agentReadinessRevisionCompiler
            ? { agentReadinessRevisionCompiler: input.agentReadinessRevisionCompiler }
            : {}),
    });
}
export function prepareEvidenceAuthorityIntents(input) {
    const review = verifyEvidenceReviewProposal({
        proposal: input.reviewProposal,
        captureBytes: input.captureBytes,
        normalizedBytes: input.normalizedBytes,
        revision: input.revision,
        authorityEntityRevision: input.authorityEntityRevision,
        authorityProgramRevision: input.authorityProgramRevision,
    });
    const materializedAt = instantSchema.parse(input.materializedAt);
    const reviewDecision = evidenceReviewDecisionSchema.parse(input.reviewDecision);
    const { decision_digest: decisionDigest, ...decisionCore } = reviewDecision;
    if (digest(evidenceReviewDecisionCoreSchema.parse(decisionCore)) !== decisionDigest) {
        throw new Error("Evidence review decision digest mismatch.");
    }
    if (reviewDecision.review_proposal_digest !== review.proposal_digest ||
        reviewDecision.decision !== "approved") {
        throw new Error("Evidence catalog materialization requires approval of the exact review.");
    }
    if (reviewDecision.decided_at > materializedAt) {
        throw new Error("Evidence cannot be materialized before its review decision.");
    }
    if (review.submission.capture.availability !== "public") {
        throw new Error("Restricted evidence cannot be materialized into the public catalog.");
    }
    const subject = review.subject;
    const receiptCore = captureReceiptCoreSchema.parse({
        receipt_contract: "sourcey.capture-receipt/v1alpha1",
        issuer_id: input.policy.captureReceiptIssuerId,
        operation_id: deriveOperationId("sourcey.capture-receipt-operation/v1", {
            review_proposal_digest: review.proposal_digest,
            job_id: review.job_id,
            capture_digest: review.submission.capture.digest,
        }),
        job_id: review.job_id,
        base_release_id: review.base_release_id,
        subject,
        authority_entity_revision_digest: review.authority_entity_revision_digest,
        authority_program_revision_digest: review.authority_program_revision_digest,
        capture_policy_digest: review.capture_policy_digest,
        review_decision: reviewDecision,
        capture: {
            ...review.submission.capture,
            bytes: input.captureBytes.byteLength,
        },
        issued_at: materializedAt,
    });
    const captureReceiptIntent = {
        receipt_digest: digest(receiptCore),
        core: receiptCore,
    };
    const groups = groupAssertionsByPolarity(review);
    const observations = groups.map(({ polarity }) => {
        const core = observationCoreSchema.parse({
            observation_contract: "sourcey.observation/v1alpha1",
            source_id: review.target_id,
            source_uri: review.submission.capture.subject_source_url,
            retrieved_at: review.submission.capture.retrieved_at,
            method: {
                name: review.submission.capture.method,
                version: sourceyEvidenceCaptureMethodVersion,
            },
            outcome: polarity === "supports" ? "supports-candidate" : "contradicts-candidate",
            capture: {
                digest: review.submission.capture.digest,
                bytes: input.captureBytes.byteLength,
                media_type: review.submission.capture.media_type,
                availability: "public",
                requested_uri: review.submission.capture.requested_url,
                final_uri: review.submission.capture.final_url,
                redirect_chain: review.submission.capture.redirect_chain,
                source_standing: review.review_projection.source_standing,
                ...(review.submission.capture.artifact_scope === undefined
                    ? {}
                    : { artifact_scope: review.submission.capture.artifact_scope }),
                ...(review.submission.capture.source_content === undefined
                    ? {}
                    : { source_content: review.submission.capture.source_content }),
                normalized_object: {
                    digest: review.submission.normalization.object_digest,
                    bytes: input.normalizedBytes.byteLength,
                    media_type: "text/plain; charset=utf-8",
                    normalizer_contract: review.submission.normalization.normalizer_contract,
                    normalizer_id: review.submission.normalization.normalizer_id,
                    version: review.submission.normalization.version,
                    toolchain_digest: review.submission.normalization.toolchain_digest,
                },
            },
        });
        return observationSchema.parse({ ...core, observation_id: digest(core) });
    });
    const eventIntents = groups.map(({ assertions, polarity }, index) => {
        const observation = observations[index];
        if (!observation)
            throw new Error("Evidence observation projection is incomplete.");
        const core = catalogEventCoreSchema.parse({
            event_contract: "sourcey.catalog-event/v1alpha1",
            kind: "evidence.bound",
            issuer_id: input.policy.evidenceEventIssuerId,
            operation_id: deriveOperationId("sourcey.evidence-binding-operation/v1", {
                review_proposal_digest: review.proposal_digest,
                polarity,
            }),
            subject,
            occurred_at: materializedAt,
            payload: {
                observation_id: observation.observation_id,
                capture_receipt_digest: captureReceiptIntent.receipt_digest,
                normalized_object_digest: review.submission.normalization.object_digest,
                authority_entity_revision_digest: review.authority_entity_revision_digest,
                authority_program_revision_digest: review.authority_program_revision_digest,
                assertions,
                paths: assertions.map((assertion) => assertion.path),
                polarity,
                binding_method: "sourcey-reviewed-exact-path",
                binding_version: "1",
            },
        });
        return catalogEventIntentSchema.parse({ event_id: digest(core), core });
    });
    return {
        materializedAt,
        reviewProposal: review,
        reviewDecision,
        subjectRevision: input.revision,
        authorityEntityRevision: input.authorityEntityRevision,
        authorityProgramRevision: input.authorityProgramRevision,
        captureReceiptIntent,
        observations,
        eventIntents,
    };
}
export function finalizeEvidenceCatalogProposal(input) {
    const agentReadinessProfileInput = agentReadinessProfileInputSchema
        .nullable()
        .parse(input.agentReadinessProfileInput);
    const readinessRevision = input.prepared.subjectRevision.revision_contract === agentReadinessRevisionContract;
    if (readinessRevision !== (agentReadinessProfileInput !== null)) {
        throw new Error("Only an Agent Readiness revision requires its exact profile input.");
    }
    const agentReadinessDeclarationRevision = agentReadinessDeclarationRevisionSchema
        .nullable()
        .parse(input.agentReadinessDeclarationRevision);
    if (readinessRevision !== (agentReadinessDeclarationRevision !== null)) {
        throw new Error("Only an Agent Readiness revision requires its exact declaration revision.");
    }
    if (agentReadinessDeclarationRevision) {
        const { revision_digest: revisionDigest, ...core } = agentReadinessDeclarationRevision;
        if (digest(agentReadinessDeclarationRevisionCoreSchema.parse(core)) !== revisionDigest) {
            throw new Error("Agent Readiness declaration revision digest mismatch.");
        }
    }
    const agentReadinessOfferRelationInputs = z
        .array(agentReadinessOfferRelationInputSchema)
        .parse(input.agentReadinessOfferRelationInputs ?? []);
    if (agentReadinessProfileInput) {
        if (!input.agentReadinessRevisionCompiler) {
            throw new Error("Agent Readiness evidence requires its revision compiler.");
        }
        if (canonicalJson(input.agentReadinessRevisionCompiler(agentReadinessProfileInput)) !==
            canonicalJson(input.prepared.subjectRevision)) {
            throw new Error("Agent Readiness profile input does not compile to its reviewed revision.");
        }
    }
    const core = evidenceCatalogProposalCoreSchema.parse({
        catalog_proposal_contract: "sourcey.evidence-catalog-proposal/v1alpha1",
        materialized_at: input.prepared.materializedAt,
        review_proposal: input.prepared.reviewProposal,
        review_decision: input.prepared.reviewDecision,
        subject_revision: input.prepared.subjectRevision,
        agent_readiness_profile_input: agentReadinessProfileInput,
        agent_readiness_declaration_revision: agentReadinessDeclarationRevision,
        agent_readiness_offer_relation_inputs: agentReadinessOfferRelationInputs,
        authority_entity_revision: input.prepared.authorityEntityRevision,
        authority_program_revision: input.prepared.authorityProgramRevision,
        capture_receipt_intent: input.prepared.captureReceiptIntent,
        observations: input.prepared.observations,
        event_intents: input.prepared.eventIntents,
    });
    return evidenceCatalogProposalSchema.parse({ ...core, proposal_digest: digest(core) });
}
export function validateEvidenceCatalogProposal(input) {
    const proposal = evidenceCatalogProposalSchema.parse(input.proposal);
    const { proposal_digest: proposalDigest, ...proposalCore } = proposal;
    if (digest(evidenceCatalogProposalCoreSchema.parse(proposalCore)) !== proposalDigest) {
        throw new Error("Evidence catalog proposal digest mismatch.");
    }
    const review = proposal.review_proposal;
    const expectedCoveragePolicyDigest = proposal.subject_revision.revision_contract === agentReadinessRevisionContract
        ? input.catalog.agentReadinessPolicyDigest
        : input.catalog.coveragePolicyDigest;
    if (review.coverage_policy_digest !== expectedCoveragePolicyDigest) {
        throw new Error("Evidence proposal coverage policy is not current.");
    }
    const revision = proposal.subject_revision;
    const authorityRevision = proposal.authority_entity_revision;
    const authorityProgramRevision = proposal.authority_program_revision;
    if (revision.revision_digest !== review.subject.revision_digest ||
        authorityRevision.revision_digest !== review.authority_entity_revision_digest ||
        (authorityProgramRevision?.revision_digest ?? null) !== review.authority_program_revision_digest) {
        throw new Error("Evidence proposal embeds revisions other than the reviewed revisions.");
    }
    assertProspectiveRevisionIdentity({
        revision,
        authorityRevision,
        authorityProgramRevision,
        currentRevisionDigests: input.catalog.currentRevisionDigests,
        currentAgentReadinessHeads: input.catalog.currentAgentReadinessHeads,
        revisions: input.catalog.revisions,
        prospectiveRevisionDigests: input.prospectiveRevisionDigests,
    });
    const expected = createEvidenceCatalogProposal({
        reviewProposal: review,
        reviewDecision: proposal.review_decision,
        captureBytes: input.captureBytes,
        normalizedBytes: input.normalizedBytes,
        revision,
        agentReadinessProfileInput: proposal.agent_readiness_profile_input,
        agentReadinessDeclarationRevision: proposal.agent_readiness_declaration_revision,
        agentReadinessOfferRelationInputs: proposal.agent_readiness_offer_relation_inputs,
        authorityEntityRevision: authorityRevision,
        authorityProgramRevision,
        materializedAt: proposal.materialized_at,
        policy: input.policy,
        ...(input.agentReadinessRevisionCompiler
            ? { agentReadinessRevisionCompiler: input.agentReadinessRevisionCompiler }
            : {}),
    });
    if (canonicalJson(expected) !== canonicalJson(proposal)) {
        throw new Error("Evidence catalog proposal is not the deterministic reviewed projection.");
    }
    const existingReceiptByDigest = new Map(input.catalog.existingCaptureReceipts.map((receipt) => [receipt.receipt_digest, receipt]));
    const existingReceiptByOperation = new Map(input.catalog.existingCaptureReceipts.map((receipt) => [receipt.operation_id, receipt]));
    const receiptIntent = proposal.capture_receipt_intent;
    const existingReceipt = existingReceiptByDigest.get(receiptIntent.receipt_digest);
    let newCaptureReceiptIntent = receiptIntent;
    let existingCaptureReceiptDigest = null;
    if (existingReceipt) {
        const { receipt_digest: _, protected: __, ...existingCore } = existingReceipt;
        if (canonicalJson(existingCore) !== canonicalJson(receiptIntent.core)) {
            throw new Error(`Capture receipt collision for ${receiptIntent.receipt_digest}.`);
        }
        newCaptureReceiptIntent = null;
        existingCaptureReceiptDigest = receiptIntent.receipt_digest;
    }
    else {
        const operationCollision = existingReceiptByOperation.get(receiptIntent.core.operation_id);
        if (operationCollision) {
            throw new Error(`Capture operation ${receiptIntent.core.operation_id} is already bound to another receipt.`);
        }
    }
    const observationsById = new Map(input.catalog.existingObservations.map((observation) => [
        observation.observation_id,
        observation,
    ]));
    const newObservations = [];
    const existingObservationIds = [];
    for (const observation of proposal.observations) {
        const existing = observationsById.get(observation.observation_id);
        if (existing) {
            if (canonicalJson(existing) !== canonicalJson(observation)) {
                throw new Error(`Observation collision for ${observation.observation_id}.`);
            }
            existingObservationIds.push(observation.observation_id);
        }
        else {
            newObservations.push(observation);
        }
    }
    const eventsById = new Map(input.catalog.existingEvents.map((event) => [event.event_id, event]));
    const eventsByOperation = new Map(input.catalog.existingEvents.map((event) => [event.operation_id, event]));
    const newEventIntents = [];
    const existingEventIds = [];
    for (const intent of proposal.event_intents) {
        const existing = eventsById.get(intent.event_id);
        if (existing) {
            const { event_id: _, protected: __, ...existingCore } = existing;
            if (canonicalJson(existingCore) !== canonicalJson(intent.core)) {
                throw new Error(`Evidence event collision for ${intent.event_id}.`);
            }
            existingEventIds.push(intent.event_id);
            continue;
        }
        const operationCollision = eventsByOperation.get(intent.core.operation_id);
        if (operationCollision) {
            throw new Error(`Evidence operation ${intent.core.operation_id} is already bound to another event.`);
        }
        newEventIntents.push(intent);
    }
    return {
        proposal,
        newCaptureReceiptIntent,
        newObservations,
        newEventIntents,
        existingCaptureReceiptDigest,
        existingObservationIds: existingObservationIds.sort(compareCanonicalStrings),
        existingEventIds: existingEventIds.sort(compareCanonicalStrings),
    };
}
function assertProspectiveRevisionIdentity(input) {
    if (!input.prospectiveRevisionDigests.has(input.revision.revision_digest)) {
        throw new Error("Evidence subject revision is outside the exact prospective change closure.");
    }
    if (input.revision.entity_id !== input.authorityRevision.entity_id) {
        throw new Error("Prospective subject and authority revisions name different entities.");
    }
    if (input.revision.revision_contract === catalogRevisionContracts.entity &&
        input.revision.revision_digest !== input.authorityRevision.revision_digest) {
        throw new Error("Entity evidence must use that exact entity revision as its authority.");
    }
    if (input.revision.revision_contract === catalogRevisionContracts.offer) {
        if (input.revision.program_id === undefined) {
            if (input.authorityProgramRevision !== null) {
                throw new Error("Standalone Offer evidence cannot carry a Program authority.");
            }
        }
        else if (!input.authorityProgramRevision ||
            input.authorityProgramRevision.entity_id !== input.revision.entity_id ||
            input.authorityProgramRevision.program_id !== input.revision.program_id) {
            throw new Error("Program-backed Offer evidence must use its exact Program revision as authority.");
        }
    }
    else if (input.authorityProgramRevision !== null) {
        throw new Error("Only Program-backed Offer evidence may carry a Program authority.");
    }
    const currentEntities = new Map();
    const currentPrograms = new Map();
    const currentProgramOwners = new Map();
    const currentOfferOwners = new Map();
    const currentAgentReadinessOwners = new Map();
    const currentDomainOwners = new Map();
    const readinessHeadsByDigest = new Map([...input.currentAgentReadinessHeads.entries()].map(([profileId, head]) => [
        head.revisionDigest,
        { profileId, entityId: head.entityId },
    ]));
    for (const revisionDigest of input.currentRevisionDigests) {
        const revision = input.revisions.get(revisionDigest);
        if (!revision) {
            const readinessHead = readinessHeadsByDigest.get(revisionDigest);
            if (!readinessHead) {
                throw new Error(`Current catalog revision ${revisionDigest} is unavailable.`);
            }
            currentAgentReadinessOwners.set(readinessHead.profileId, readinessHead.entityId);
            continue;
        }
        if (revision.revision_contract === catalogRevisionContracts.entity) {
            currentEntities.set(revision.entity_id, revision);
            for (const domain of revision.content.domains) {
                if (domain.valid_until === undefined) {
                    currentDomainOwners.set(domain.value.toLowerCase(), revision.entity_id);
                }
            }
        }
        else if (revision.revision_contract === catalogRevisionContracts.program) {
            currentPrograms.set(revision.program_id, revision);
            currentProgramOwners.set(revision.program_id, revision.entity_id);
        }
        else if (revision.revision_contract === catalogRevisionContracts.offer) {
            currentOfferOwners.set(revision.offer_id, revision.entity_id);
        }
        else if (revision.revision_contract === agentReadinessRevisionContract) {
            currentAgentReadinessOwners.set(revision.agent_readiness_profile_id, revision.entity_id);
        }
    }
    if (input.revision.revision_contract === catalogRevisionContracts.program &&
        currentProgramOwners.has(input.revision.program_id) &&
        currentProgramOwners.get(input.revision.program_id) !== input.revision.entity_id) {
        throw new Error(`Program ${input.revision.program_id} is owned by another entity.`);
    }
    if (input.revision.revision_contract === catalogRevisionContracts.offer &&
        currentOfferOwners.has(input.revision.offer_id) &&
        currentOfferOwners.get(input.revision.offer_id) !== input.revision.entity_id) {
        throw new Error(`Offer ${input.revision.offer_id} is owned by another entity.`);
    }
    if (input.revision.revision_contract === agentReadinessRevisionContract &&
        currentAgentReadinessOwners.has(input.revision.agent_readiness_profile_id) &&
        currentAgentReadinessOwners.get(input.revision.agent_readiness_profile_id) !==
            input.revision.entity_id) {
        throw new Error(`Agent readiness profile ${input.revision.agent_readiness_profile_id} is owned by another entity.`);
    }
    for (const domain of input.authorityRevision.content.domains) {
        if (domain.valid_until !== undefined)
            continue;
        const owner = currentDomainOwners.get(domain.value.toLowerCase());
        if (owner && owner !== input.authorityRevision.entity_id) {
            throw new Error(`Current domain ${domain.value} is owned by another entity.`);
        }
    }
    const currentAuthority = currentEntities.get(input.authorityRevision.entity_id);
    if (!input.prospectiveRevisionDigests.has(input.authorityRevision.revision_digest)) {
        if (!currentAuthority ||
            currentAuthority.revision_digest !== input.authorityRevision.revision_digest ||
            canonicalJson(currentAuthority) !== canonicalJson(input.authorityRevision)) {
            throw new Error("Evidence Entity authority is neither exact current nor prospective state.");
        }
    }
    if (input.authorityProgramRevision &&
        !input.prospectiveRevisionDigests.has(input.authorityProgramRevision.revision_digest)) {
        const currentProgram = currentPrograms.get(input.authorityProgramRevision.program_id);
        if (!currentProgram ||
            currentProgram.revision_digest !== input.authorityProgramRevision.revision_digest ||
            canonicalJson(currentProgram) !== canonicalJson(input.authorityProgramRevision)) {
            throw new Error("Evidence Program authority is neither exact current nor prospective state.");
        }
    }
}
function groupAssertionsByPolarity(review) {
    const groups = ["supports", "contradicts"].flatMap((polarity) => {
        const assertions = review.submission.assertions.filter((assertion) => assertion.polarity === polarity);
        return assertions.length > 0 ? [{ polarity, assertions }] : [];
    });
    if (groups.length === 0)
        throw new Error("Evidence review proposal has no assertions.");
    return groups;
}
//# sourceMappingURL=evidence-authority.js.map