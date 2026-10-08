import { canonicalJson, compareCanonicalStrings, compareInstants, deriveOperationId, digest, } from "provenry/primitives";
import { z } from "zod";
import { sourceyEvidenceCaptureMethodVersion } from "../../../contracts/capture/src/method-names.js";
import { catalogEventCoreSchema, catalogEventIntentSchema, } from "../../../contracts/events/src/index.js";
import { evidenceReviewDecisionCoreSchema, evidenceReviewDecisionSchema, } from "../../../contracts/evidence/src/index.js";
import { observationCoreSchema, observationSchema, } from "../../../contracts/observations/src/index.js";
import { catalogRevisionContracts, entityRevisionSchema, offerRevisionSchema, programRevisionSchema, } from "../../../contracts/revisions/src/index.js";
import { assertAttestedObservationCapture } from "./attested-capture.js";
import { evidenceReviewProposalSchema, verifyEvidenceReviewProposal, } from "./submission-verifier.js";
const digestSchema = z.string().regex(/^sha256:[a-f0-9]{64}$/);
const instantSchema = z.iso.datetime({ offset: true });
const evidenceCatalogProposalCoreSchema = z
    .object({
    catalog_proposal_contract: z.literal("sourcey.evidence-catalog-proposal/v1alpha1"),
    materialized_at: instantSchema,
    review_proposal: evidenceReviewProposalSchema,
    review_decision: evidenceReviewDecisionSchema,
    subject_revision: z.union([entityRevisionSchema, programRevisionSchema, offerRevisionSchema]),
    authority_entity_revision: entityRevisionSchema,
    authority_program_revision: programRevisionSchema.nullable(),
    /** The Provenry attestation that proves the reviewed capture. */
    capture_attestation_digest: digestSchema,
    observations: z.array(observationSchema).min(1).max(2),
    event_intents: z.array(catalogEventIntentSchema).min(1).max(2),
})
    .strict();
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
    return finalizeEvidenceCatalogProposal(prepareEvidenceAuthorityIntents(input));
}
function prepareEvidenceAuthorityIntents(input) {
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
    const { attestedCapture } = input;
    if (compareInstants(attestedCapture.attestation.signed_at, materializedAt) > 0) {
        throw new Error("Evidence cannot be materialized before its capture is attested.");
    }
    const subject = review.subject;
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
        const observation = observationSchema.parse({ ...core, observation_id: digest(core) });
        assertAttestedObservationCapture(observation, attestedCapture);
        return observation;
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
                capture_attestation_digest: attestedCapture.attestation.attestation_digest,
                review_decision: reviewDecision,
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
        attestedCapture,
        observations,
        eventIntents,
    };
}
function finalizeEvidenceCatalogProposal(prepared) {
    const core = evidenceCatalogProposalCoreSchema.parse({
        catalog_proposal_contract: "sourcey.evidence-catalog-proposal/v1alpha1",
        materialized_at: prepared.materializedAt,
        review_proposal: prepared.reviewProposal,
        review_decision: prepared.reviewDecision,
        subject_revision: prepared.subjectRevision,
        authority_entity_revision: prepared.authorityEntityRevision,
        authority_program_revision: prepared.authorityProgramRevision,
        capture_attestation_digest: prepared.attestedCapture.attestation.attestation_digest,
        observations: prepared.observations,
        event_intents: prepared.eventIntents,
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
    if (review.coverage_policy_digest !== input.catalog.coveragePolicyDigest) {
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
        attestedCapture: input.attestedCapture,
        captureBytes: input.captureBytes,
        normalizedBytes: input.normalizedBytes,
        revision,
        authorityEntityRevision: authorityRevision,
        authorityProgramRevision,
        materializedAt: proposal.materialized_at,
        policy: input.policy,
    });
    if (canonicalJson(expected) !== canonicalJson(proposal)) {
        throw new Error("Evidence catalog proposal is not the deterministic reviewed projection.");
    }
    // A capture the release already carries is the same attestation, byte for byte.
    const existingAttestation = input.catalog.existingCaptureAttestations.find((attestation) => attestation.attestation_digest === proposal.capture_attestation_digest);
    if (existingAttestation &&
        digest(existingAttestation) !== digest(input.attestedCapture.attestation)) {
        throw new Error(`Capture attestation collision for ${proposal.capture_attestation_digest}.`);
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
    // An attestation is first included with the evidence it proves, once; an
    // exact retry is a no-op, and new evidence is attested by a read of its own.
    if (existingAttestation && newEventIntents.length > 0) {
        throw new Error(`Capture attestation ${proposal.capture_attestation_digest} was first included by an earlier release; new evidence needs its own attested read.`);
    }
    return {
        proposal,
        existingCaptureAttestation: existingAttestation !== undefined,
        newObservations,
        newEventIntents,
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
    const currentDomainOwners = new Map();
    // Readiness heads are current state this lane neither reads nor owns.
    const readinessHeadDigests = new Set([...input.currentAgentReadinessHeads.values()].map((head) => head.revisionDigest));
    for (const revisionDigest of input.currentRevisionDigests) {
        const revision = input.revisions.get(revisionDigest);
        if (!revision) {
            if (!readinessHeadDigests.has(revisionDigest)) {
                throw new Error(`Current catalog revision ${revisionDigest} is unavailable.`);
            }
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