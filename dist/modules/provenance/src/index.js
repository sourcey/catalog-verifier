import { compareCanonicalStrings, compareInstants } from "provenry/primitives";
import { catalogEventPayloadSchemas, } from "../../../contracts/events/src/index.js";
import { catalogRevisionContracts, } from "../../../contracts/revisions/src/index.js";
import { deriveAuthorityState, entityAcceptsClaimAuthorityDomain, } from "../../authority-state/src/index.js";
import { assertEvidenceBindingClosure, evidenceAssertions } from "./evidence-bindings.js";
import { applicableEvidenceCoverageRequirements, evidenceAssertionSatisfiesRequirement, evidencePathsOverlap, evidenceRequirementIsCovered, } from "./evidence-coverage.js";
export { evidenceAssertions } from "./evidence-bindings.js";
export { applicableEvidenceCoverageRequirements, evaluateEvidenceCoverage, evidenceAssertionSatisfiesRequirement, evidenceCoverageCandidateRequirements, evidencePathsOverlap, evidenceRequirementIsCovered, valueAtEvidencePointer, } from "./evidence-coverage.js";
export * from "./material-claims.js";
export { buildProspectiveEvidenceStandingGraph } from "./prospective-evidence.js";
/** The unique observations that the evidence events among `eventIds` bind, in canonical order. */
export function boundObservationIds(eventIds, events) {
    const observationIds = new Set();
    for (const eventId of eventIds) {
        const event = events.get(eventId);
        if (event?.kind !== "evidence.bound")
            continue;
        const observationId = event.payload.observation_id;
        if (typeof observationId === "string")
            observationIds.add(observationId);
    }
    return [...observationIds].sort(compareCanonicalStrings);
}
const identityKinds = new Set([
    "entity.merged",
    "entity.split",
    "entity.succeeded",
    "program.merged",
    "program.reparented",
    "offer.merged",
    "offer.retired",
    "offer.reparented",
    "agent-readiness-profile.merged",
    "agent-readiness-profile.reparented",
]);
export function buildEventGraph(events, observations) {
    const byId = new Map();
    const byKind = new Map();
    const byRevisionDigest = new Map();
    const operationKeys = new Map();
    for (const event of events) {
        if (byId.has(event.event_id))
            throw new Error(`Duplicate event ${event.event_id}.`);
        byId.set(event.event_id, event);
        const kindEvents = byKind.get(event.kind) ?? [];
        kindEvents.push(event);
        byKind.set(event.kind, kindEvents);
        if (event.subject.revision_digest) {
            const revisionEvents = byRevisionDigest.get(event.subject.revision_digest) ?? [];
            revisionEvents.push(event);
            byRevisionDigest.set(event.subject.revision_digest, revisionEvents);
        }
        const operationKey = `${event.issuer_id}:${event.operation_id}`;
        const prior = operationKeys.get(operationKey);
        if (prior && prior !== event.event_id) {
            throw new Error(`Protected operation key ${operationKey} was reused with changed content.`);
        }
        operationKeys.set(operationKey, event.event_id);
    }
    const eventsOfKind = (kind) => byKind.get(kind) ?? [];
    const observationMap = new Map();
    for (const observation of observations) {
        if (observationMap.has(observation.observation_id)) {
            throw new Error(`Duplicate observation ${observation.observation_id}.`);
        }
        observationMap.set(observation.observation_id, observation);
    }
    for (const event of events.filter((candidate) => identityKinds.has(candidate.kind))) {
        if (event.kind === "entity.merged") {
            assertEntityIdentitySubject(event, payloadString(event, "surviving_entity_id"));
        }
        else if (event.kind === "entity.split") {
            assertEntityIdentitySubject(event, payloadString(event, "original_entity_id"));
        }
        else if (event.kind === "entity.succeeded") {
            assertEntityIdentitySubject(event, payloadString(event, "predecessor_entity_id"));
        }
        else if (event.kind === "program.merged") {
            assertProgramIdentitySubject(event, payloadString(event, "entity_id"), payloadString(event, "surviving_program_id"));
        }
        else if (event.kind === "program.reparented") {
            assertProgramIdentitySubject(event, payloadString(event, "old_entity_id"), payloadString(event, "program_id"));
        }
        else if (event.kind === "offer.merged") {
            assertOfferIdentitySubject(event, payloadString(event, "entity_id"), payloadString(event, "surviving_offer_id"));
        }
        else if (event.kind === "offer.retired") {
            assertOfferIdentitySubject(event, payloadString(event, "entity_id"), payloadString(event, "offer_id"));
        }
        else if (event.kind === "offer.reparented") {
            assertOfferIdentitySubject(event, payloadString(event, "old_entity_id"), payloadString(event, "offer_id"));
        }
        else if (event.kind === "agent-readiness-profile.merged") {
            assertAgentReadinessIdentitySubject(event, payloadString(event, "entity_id"), payloadString(event, "surviving_agent_readiness_profile_id"));
        }
        else if (event.kind === "agent-readiness-profile.reparented") {
            assertAgentReadinessIdentitySubject(event, payloadString(event, "old_entity_id"), payloadString(event, "agent_readiness_profile_id"));
        }
    }
    const inactive = new Set();
    const invalidationTargets = new Map();
    const targetKinds = {
        "evidence.retracted": "evidence.bound",
        "attestation.revoked": "subject.attested",
        "freshness.exception-revoked": "freshness.exception-granted",
    };
    for (const event of events) {
        const expectedTargetKind = targetKinds[event.kind];
        if (expectedTargetKind) {
            const target = payloadString(event, "target_event_id");
            const targetEvent = byId.get(target);
            if (!targetEvent)
                throw new Error(`${event.kind} targets missing event ${target}.`);
            if (targetEvent.kind !== expectedTargetKind) {
                throw new Error(`${event.kind} must target ${expectedTargetKind}, not ${targetEvent.kind}.`);
            }
            if (!sameSubject(targetEvent, event)) {
                throw new Error(`${event.kind} must target the exact same subject and revision.`);
            }
            if (event.kind === "attestation.revoked" &&
                payloadString(event, "authority_claim_id") !==
                    payloadString(targetEvent, "authority_claim_id")) {
                throw new Error("Attestation revocation authority claim does not match its target.");
            }
            const priorInvalidation = invalidationTargets.get(target);
            if (priorInvalidation) {
                throw new Error(`Event ${target} has multiple invalidations ${priorInvalidation} and ${event.event_id}.`);
            }
            invalidationTargets.set(target, event.event_id);
            inactive.add(target);
        }
        if (event.kind === "assurance.revoked") {
            const payload = catalogEventPayloadSchemas["assurance.revoked"].parse(event.payload);
            if (event.occurred_at !== payload.revoked_at) {
                throw new Error(`${event.kind} occurrence differs from its revocation time.`);
            }
            const matching = events.filter((candidate) => {
                if (payload.assurance_kind === "entity_identity") {
                    if (event.subject.subject_type !== "entity" ||
                        event.subject.revision_digest !== undefined ||
                        candidate.kind !== "entity.identity-checked" ||
                        candidate.subject.subject_type !== "entity" ||
                        candidate.subject.entity_id !== event.subject.entity_id) {
                        return false;
                    }
                    const checked = catalogEventPayloadSchemas["entity.identity-checked"].parse(candidate.payload);
                    return (checked.assurance_id === payload.assurance_id &&
                        checked.identity_epoch_digest === payload.identity_epoch_digest &&
                        compareInstants(checked.checked_at, payload.revoked_at) <= 0);
                }
                if (event.subject.subject_type !== "offer" ||
                    event.subject.revision_digest !== payload.revision_digest ||
                    candidate.kind !== "offer.terms-checked" ||
                    candidate.subject.subject_type !== "offer" ||
                    !sameSubject(candidate, event)) {
                    return false;
                }
                const checked = catalogEventPayloadSchemas["offer.terms-checked"].parse(candidate.payload);
                return (checked.assurance_id === payload.assurance_id &&
                    compareInstants(checked.checked_at, payload.revoked_at) <= 0);
            });
            if (matching.length === 0) {
                throw new Error(`${event.kind} does not match a completed assurance in its exact scope.`);
            }
            for (const target of matching)
                inactive.add(target.event_id);
        }
        if (event.kind === "identity.transition-superseded") {
            const target = payloadString(event, "target_event_id");
            const targetEvent = byId.get(target);
            if (!targetEvent || !identityKinds.has(targetEvent.kind)) {
                throw new Error(`${event.kind} must target an active identity transition.`);
            }
            if (inactive.has(target)) {
                throw new Error(`${event.kind} targets an already superseded identity transition.`);
            }
            if (!sameSubject(targetEvent, event, false)) {
                throw new Error(`${event.kind} must use the target transition's subject.`);
            }
            const replacements = payloadStrings(event, "replacement_event_ids");
            for (const replacement of replacements) {
                const replacementEvent = byId.get(replacement);
                if (!replacementEvent || !identityKinds.has(replacementEvent.kind)) {
                    throw new Error(`${event.kind} replacement ${replacement} is not an identity transition.`);
                }
                if (replacement === target || !sameSubject(replacementEvent, targetEvent, false)) {
                    throw new Error(`${event.kind} replacement ${replacement} has incompatible identity.`);
                }
            }
            inactive.add(target);
        }
    }
    const activeAuthorityClaims = deriveAuthorityState(events).activeClaims;
    for (const event of eventsOfKind("asset.bound")) {
        const payload = catalogEventPayloadSchemas["asset.bound"].parse(event.payload);
        if (payload.authority_basis === "vendor-authority") {
            const claimId = payload.authority_claim_id;
            if (!claimId) {
                throw new Error(`Vendor-authorized asset binding ${event.event_id} lacks its claim ID.`);
            }
            const claim = activeAuthorityClaims.get(claimId);
            if (!claim ||
                claim.entityId !== event.subject.entity_id ||
                claim.authorizedIssuerId !== event.issuer_id ||
                compareInstants(claim.validUntil, payload.effective_from) < 0) {
                throw new Error(`Asset binding ${event.event_id} lacks current exact-entity authority.`);
            }
        }
        const superseded = payload.superseded_binding_event_id;
        if (typeof superseded === "string") {
            const target = byId.get(superseded);
            if (target?.kind !== "asset.bound" ||
                target.subject.entity_id !== event.subject.entity_id ||
                payloadString(target, "role") !== payload.role) {
                throw new Error(`Asset binding ${event.event_id} supersedes an incompatible binding.`);
            }
        }
    }
    for (const event of [
        ...eventsOfKind("asset.withdrawn"),
        ...eventsOfKind("asset.takedown-ordered"),
    ]) {
        const target = byId.get(payloadString(event, "target_binding_event_id"));
        if (target?.kind !== "asset.bound" || target.subject.entity_id !== event.subject.entity_id) {
            throw new Error(`${event.kind} targets an incompatible asset binding.`);
        }
    }
    assertEvidenceBindingClosure({ events, observations: observationMap });
    const resolvedBindingIds = new Set();
    const evidenceBindingActivity = new Map();
    for (const event of eventsOfKind("discrepancy.resolved")) {
        const activeEventIds = new Set(payloadStrings(event, "active_event_ids"));
        for (const eventId of payloadStrings(event, "conflicting_event_ids")) {
            const target = byId.get(eventId);
            if (target?.kind !== "evidence.bound") {
                throw new Error(`Discrepancy resolution ${event.event_id} targets non-evidence ${eventId}.`);
            }
            if (!sameSubject(target, event)) {
                throw new Error(`Discrepancy resolution ${event.event_id} targets evidence for another subject.`);
            }
            if (resolvedBindingIds.has(eventId)) {
                throw new Error(`Evidence binding ${eventId} has conflicting active resolutions.`);
            }
            resolvedBindingIds.add(eventId);
            evidenceBindingActivity.set(eventId, activeEventIds.has(eventId));
        }
        const polarities = new Set(payloadStrings(event, "conflicting_event_ids").flatMap((eventId) => evidenceAssertions(byId.get(eventId)).map((assertion) => assertion.polarity)));
        if (!polarities.has("supports") || !polarities.has("contradicts")) {
            throw new Error(`Discrepancy resolution ${event.event_id} has no actual polarity conflict.`);
        }
        for (const eventId of payloadStrings(event, "active_event_ids")) {
            if (!payloadStrings(event, "conflicting_event_ids").includes(eventId)) {
                throw new Error(`Discrepancy resolution ${event.event_id} activates an event outside its conflict set.`);
            }
        }
    }
    const openedDisputes = new Map();
    for (const opened of eventsOfKind("dispute.opened")) {
        const disputeId = payloadString(opened, "dispute_id");
        if (openedDisputes.has(disputeId)) {
            throw new Error(`Dispute ${disputeId} has multiple active openings.`);
        }
        openedDisputes.set(disputeId, opened);
    }
    const resolvedDisputes = new Set();
    for (const resolution of eventsOfKind("dispute.resolved")) {
        const disputeId = payloadString(resolution, "dispute_id");
        const opened = openedDisputes.get(disputeId);
        if (!opened ||
            opened.event_id !== payloadString(resolution, "opened_event_id") ||
            !sameSubject(opened, resolution)) {
            throw new Error(`Dispute resolution ${resolution.event_id} does not close its exact dispute.`);
        }
        if (resolvedDisputes.has(disputeId)) {
            throw new Error(`Dispute ${disputeId} has multiple active resolutions.`);
        }
        resolvedDisputes.add(disputeId);
    }
    return {
        events,
        byId,
        byRevisionDigest,
        observations: observationMap,
        inactiveEventIds: inactive,
        evidenceBindingActivity,
        activeAuthorityClaims,
    };
}
/**
 * A revision's standing apart from field coverage: its open or resolved
 * disputes, the Entity's current attestation of it, and the events that
 * establish both. Every subject's provenance carries it; an Agent Readiness
 * profile's provenance is only this, its ratings resting on run records.
 */
export function deriveSubjectStanding(input) {
    const { authorityEntityRevision, graph, policyAsOf } = input;
    const subjectEvents = activeSubjectEvents(graph, input.revisionDigest);
    const attestations = subjectEvents.filter((event) => {
        if (event.kind !== "subject.attested")
            return false;
        const claim = graph.activeAuthorityClaims.get(payloadString(event, "authority_claim_id"));
        if (!claim ||
            compareInstants(claim.validUntil, policyAsOf) <= 0 ||
            claim.authorizedIssuerId !== event.issuer_id) {
            return false;
        }
        if (claim.entityId !== event.subject.entity_id)
            return false;
        return entityAcceptsClaimAuthorityDomain(authorityEntityRevision, claim.controlledDomain);
    });
    if (attestations.length > 1) {
        throw new Error(`Revision ${input.revisionDigest} has multiple active attestations; revoke or supersede one.`);
    }
    const attestation = attestations[0];
    const openDisputes = subjectEvents.filter((event) => event.kind === "dispute.opened" &&
        !subjectEvents.some((candidate) => candidate.kind === "dispute.resolved" &&
            payloadString(candidate, "opened_event_id") === event.event_id));
    const resolvedDisputes = subjectEvents.filter((event) => event.kind === "dispute.resolved");
    const basis = new Set();
    if (attestation) {
        basis.add(attestation.event_id);
        const claim = graph.activeAuthorityClaims.get(payloadString(attestation, "authority_claim_id"));
        if (claim) {
            for (const eventId of claim.eventIds)
                basis.add(eventId);
        }
    }
    for (const event of [...openDisputes, ...resolvedDisputes])
        basis.add(event.event_id);
    for (const event of subjectEvents.filter((candidate) => ["evidence.retracted", "attestation.revoked", "freshness.exception-revoked"].includes(candidate.kind))) {
        basis.add(event.event_id);
    }
    return {
        dispute: openDisputes.length > 0 ? "open" : resolvedDisputes.length > 0 ? "resolved" : "none",
        vendor_attestation: attestation
            ? {
                status: "current",
                event_id: attestation.event_id,
                attested_at: payloadString(attestation, "attested_at"),
            }
            : { status: "none" },
        basis_event_ids: [...basis].sort(),
    };
}
function activeSubjectEvents(graph, revisionDigest) {
    return (graph.byRevisionDigest.get(revisionDigest) ?? []).filter((event) => !graph.inactiveEventIds.has(event.event_id));
}
export function deriveProvenance(input) {
    const { revision, graph, coveragePolicy, freshnessPolicy, policyAsOf } = input;
    const subjectEvents = activeSubjectEvents(graph, revision.revision_digest);
    const revisionValue = revision.content;
    const policyRequirements = revision.revision_contract === catalogRevisionContracts.entity
        ? coveragePolicy.entity_requirements
        : revision.revision_contract === catalogRevisionContracts.program
            ? coveragePolicy.program_requirements
            : coveragePolicy.offer_requirements;
    const requirements = applicableEvidenceCoverageRequirements(revisionValue, policyRequirements);
    const standing = deriveSubjectStanding({
        revisionDigest: revision.revision_digest,
        authorityEntityRevision: input.authorityEntityRevision,
        graph,
        policyAsOf,
    });
    const coverageStates = requirements.map((requirement) => {
        const { path } = requirement;
        const supporting = subjectEvents.filter((event) => event.kind === "evidence.bound" &&
            evidenceAssertions(event).some((assertion) => evidencePathsOverlap(assertion.path, path) &&
                evidenceAssertionSatisfiesRequirement(assertion, requirement)) &&
            evidenceBindingIsActive(event.event_id, graph));
        const contradicting = subjectEvents.filter((event) => event.kind === "evidence.bound" &&
            evidenceAssertions(event).some((assertion) => evidencePathsOverlap(assertion.path, path) && assertion.polarity === "contradicts") &&
            evidenceBindingIsActive(event.event_id, graph));
        const successfulSupporting = supporting.filter((event) => {
            const observation = graph.observations.get(payloadString(event, "observation_id"));
            return observation?.outcome === "supports-candidate";
        });
        const effectiveContradictions = contradicting.filter((event) => {
            const observation = graph.observations.get(payloadString(event, "observation_id"));
            return observation?.outcome === "contradicts-candidate";
        });
        const supportingObservations = successfulSupporting
            .map((event) => ({
            event,
            observation: graph.observations.get(payloadString(event, "observation_id")),
        }))
            .filter((value) => value.observation !== undefined);
        const latestObservation = supportingObservations
            .map(({ observation }) => observation)
            .sort((left, right) => compareInstants(left.retrieved_at, right.retrieved_at))
            .at(-1);
        const supportingAssertions = successfulSupporting.flatMap((event) => evidenceAssertions(event).filter((assertion) => evidencePathsOverlap(assertion.path, path) &&
            evidenceAssertionSatisfiesRequirement(assertion, requirement)));
        const observationComplete = evidenceRequirementIsCovered(revisionValue, requirement, supportingAssertions);
        const freshAssertions = supportingObservations.flatMap(({ event, observation }) => observationFreshness(observation, freshnessPolicy, policyAsOf) === "fresh"
            ? evidenceAssertions(event).filter((assertion) => evidencePathsOverlap(assertion.path, path) &&
                evidenceAssertionSatisfiesRequirement(assertion, requirement))
            : []);
        const exception = subjectEvents.find((event) => event.kind === "freshness.exception-granted" &&
            payloadStrings(event, "paths").includes(path) &&
            compareInstants(payloadString(event, "valid_until"), policyAsOf) > 0);
        const freshness = exception
            ? "fresh"
            : evidenceRequirementIsCovered(revisionValue, requirement, freshAssertions)
                ? "fresh"
                : observationComplete
                    ? "stale"
                    : "unknown";
        return {
            complete: observationComplete,
            field: {
                path,
                supporting_event_ids: successfulSupporting
                    .map((event) => event.event_id)
                    .sort(),
                contradicting_event_ids: effectiveContradictions
                    .map((event) => event.event_id)
                    .sort(),
                accepted_proof_kinds: [...requirement.proof_kinds],
                evidence_proof_kinds: [
                    ...new Set(supportingAssertions.map(({ proof_kind: proofKind }) => proofKind)),
                ].sort(compareCanonicalStrings),
                ...(latestObservation ? { latest_observation_at: latestObservation.retrieved_at } : {}),
                freshness,
            },
        };
    });
    const fieldCoverage = coverageStates.map(({ field }) => field);
    const basis = new Set(standing.basis_event_ids);
    for (const field of fieldCoverage) {
        for (const eventId of field.supporting_event_ids)
            basis.add(eventId);
        for (const eventId of field.contradicting_event_ids)
            basis.add(eventId);
    }
    for (const resolution of subjectEvents.filter((event) => event.kind === "discrepancy.resolved")) {
        basis.add(resolution.event_id);
    }
    for (const exception of subjectEvents.filter((event) => event.kind === "freshness.exception-granted" &&
        compareInstants(payloadString(event, "valid_until"), policyAsOf) > 0)) {
        basis.add(exception.event_id);
    }
    const freshness = fieldCoverage.some((field) => field.freshness === "unknown")
        ? "unknown"
        : fieldCoverage.some((field) => field.freshness === "stale")
            ? "stale"
            : "fresh";
    return {
        freshness,
        dispute: standing.dispute,
        coverage_policy_digest: coveragePolicy.policy_digest,
        freshness_policy_digest: freshnessPolicy.policy_digest,
        basis_event_ids: [...basis].sort(),
        fields: fieldCoverage,
        vendor_attestation: standing.vendor_attestation,
    };
}
function observationFreshness(observation, policy, policyAsOf) {
    const method = observation.capture?.source_standing?.startsWith("archived-")
        ? "archive"
        : observation.method.name;
    const maxAge = policy.max_age_days[method];
    if (maxAge === undefined) {
        throw new Error(`Freshness policy has no method ${observation.method.name}.`);
    }
    const freshUntil = new Date(observation.retrieved_at);
    freshUntil.setUTCDate(freshUntil.getUTCDate() + maxAge);
    return compareInstants(freshUntil.toISOString(), policyAsOf) > 0 ? "fresh" : "stale";
}
function evidenceBindingIsActive(eventId, graph) {
    return graph.evidenceBindingActivity.get(eventId) ?? true;
}
function payloadString(event, key) {
    const value = event.payload[key];
    if (typeof value !== "string") {
        throw new Error(`Event ${event.event_id} payload.${key} is not a string.`);
    }
    return value;
}
function payloadStrings(event, key) {
    const value = event.payload[key];
    if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
        throw new Error(`Event ${event.event_id} payload.${key} is not a string array.`);
    }
    return value;
}
function sameSubject(left, right, requireRevision = true) {
    if (left.subject.subject_type !== right.subject.subject_type ||
        left.subject.entity_id !== right.subject.entity_id) {
        return false;
    }
    if (left.subject.subject_type === "program" &&
        (right.subject.subject_type !== "program" ||
            left.subject.program_id !== right.subject.program_id)) {
        return false;
    }
    if (left.subject.subject_type === "offer" &&
        (right.subject.subject_type !== "offer" ||
            left.subject.program_id !== right.subject.program_id ||
            left.subject.offer_id !== right.subject.offer_id)) {
        return false;
    }
    if (left.subject.subject_type === "agent_readiness_profile" &&
        (right.subject.subject_type !== "agent_readiness_profile" ||
            left.subject.agent_readiness_profile_id !== right.subject.agent_readiness_profile_id)) {
        return false;
    }
    return !requireRevision || left.subject.revision_digest === right.subject.revision_digest;
}
function assertEntityIdentitySubject(event, entityId) {
    if (event.subject.subject_type !== "entity" || event.subject.entity_id !== entityId) {
        throw new Error(`${event.kind} does not use its canonical entity subject.`);
    }
}
function assertProgramIdentitySubject(event, entityId, programId) {
    if (event.subject.subject_type !== "program" ||
        event.subject.entity_id !== entityId ||
        event.subject.program_id !== programId) {
        throw new Error(`${event.kind} does not use its canonical program subject.`);
    }
}
function assertOfferIdentitySubject(event, entityId, offerId) {
    if (event.subject.subject_type !== "offer" ||
        event.subject.entity_id !== entityId ||
        event.subject.offer_id !== offerId) {
        throw new Error(`${event.kind} does not use its canonical offer subject.`);
    }
}
function assertAgentReadinessIdentitySubject(event, entityId, agentReadinessProfileId) {
    if (event.subject.subject_type !== "agent_readiness_profile" ||
        event.subject.entity_id !== entityId ||
        event.subject.agent_readiness_profile_id !== agentReadinessProfileId) {
        throw new Error(`${event.kind} does not use its canonical agent-readiness-profile subject.`);
    }
}
//# sourceMappingURL=index.js.map