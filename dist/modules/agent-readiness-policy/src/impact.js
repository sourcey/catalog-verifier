import { catalogPublicationDependencyKey, catalogSourceLocatorDigest, } from "../../catalog-admission/src/publication.js";
import { compareCanonicalStrings, digest } from "../../primitives/src/index.js";
export function agentReadinessProfileDependencyKey(profileId) {
    return `agent-readiness:profile:${profileId}`;
}
export function agentReadinessPolicyComponentDependencyKey(input) {
    return `agent-readiness:policy-component:${digest(input)}`;
}
export function agentReadinessSignalRuleDependencyKey(input) {
    return `agent-readiness:signal-rule:${digest(input)}`;
}
export function agentReadinessDeclarationNodeDependencyKey(input) {
    return `agent-readiness:declaration-node:${digest(input)}`;
}
export function agentReadinessSignalConclusionDependencyKey(input) {
    return `agent-readiness:signal-conclusion:${input.profileId}:${input.stage}:${input.signalCode}:${input.conclusionDigest}`;
}
export function agentReadinessStageProjectionDependencyKey(input) {
    return `agent-readiness:stage-projection:${input.profileId}:${input.stage}:${input.stageProjectionDigest}`;
}
export function agentReadinessGradeProjectionDependencyKey(input) {
    return `agent-readiness:grade-projection:${input.profileId}:${input.gradeProjectionDigest}`;
}
export function agentReadinessProfileRevisionDependencyKey(input) {
    return `agent-readiness:profile-revision:${input.profileId}:${input.profileRevisionDigest}`;
}
export function agentReadinessOfferRelationDependencyKey(relationId) {
    return `agent-readiness:offer-relation:${relationId}`;
}
export function agentReadinessOfferRelationRevisionDependencyKey(input) {
    return `agent-readiness:offer-relation-revision:${input.relationId}:${input.relationRevisionDigest}`;
}
export function agentReadinessProjectionDependencyReferences(projection) {
    const profileId = projection.agent_readiness_profile_id;
    return [
        {
            kind: "agent_readiness_profile_revision",
            agent_readiness_profile_id: profileId,
            profile_revision_digest: projection.revision_digest,
        },
        ...projection.stages.flatMap((stage) => [
            {
                kind: "agent_readiness_stage_projection",
                agent_readiness_profile_id: profileId,
                stage: stage.stage,
                stage_projection_digest: agentReadinessStageProjectionDigest(stage),
            },
            ...stage.signals.map((signal) => ({
                kind: "agent_readiness_signal_conclusion",
                agent_readiness_profile_id: profileId,
                stage: stage.stage,
                signal_code: signal.signal_code,
                conclusion_digest: agentReadinessSignalConclusionDigest({
                    stage: stage.stage,
                    signal,
                }),
            })),
        ]),
        {
            kind: "agent_readiness_grade_projection",
            agent_readiness_profile_id: profileId,
            grade_projection_digest: agentReadinessGradeProjectionDigest(projection),
        },
    ];
}
export function agentReadinessOfferRelationDependencyReference(relation) {
    return {
        kind: "agent_readiness_offer_relation_revision",
        relation_id: relation.relation_id,
        agent_readiness_profile_id: relation.agent_readiness_profile_id,
        offer_id: relation.offer_id,
        relation_revision_digest: relation.relation_revision_digest,
    };
}
export function agentReadinessSignalConclusionDigest(input) {
    const { signal } = input;
    return digest({
        stage: input.stage,
        signal_code: signal.signal_code,
        evaluation_role: signal.evaluation_role,
        required: signal.required,
        value: signal.value,
        value_label: signal.value_label,
        outcome: signal.outcome,
        public_state: signal.public_state,
        condition: signal.condition,
        finding: signal.finding,
        evidence_status: signal.evidence_status,
        freshness: signal.freshness,
        observed_at: signal.observed_at ?? null,
        ...(signal.note ? { context: signal.note } : {}),
        ...(signal.blocker ? { blocker: signal.blocker } : {}),
        ...(signal.remediation ? { remediation: signal.remediation } : {}),
    });
}
export function agentReadinessStageProjectionDigest(stage) {
    return digest({
        stage: stage.stage,
        stage_label: stage.stage_label,
        outcome: stage.outcome,
        public_state: stage.public_state,
        state_label: stage.state_label,
        primary_finding: stage.primary_finding,
        secondary_context: stage.secondary_context,
        signal_conclusion_digests: stage.signals.map((signal) => agentReadinessSignalConclusionDigest({ stage: stage.stage, signal })),
        blockers: stage.blockers,
        remediations: stage.remediations,
    });
}
export function agentReadinessGradeProjectionDigest(projection) {
    return digest({
        grade: projection.grade,
        overall_outcome: projection.overall_outcome,
        public_state: projection.public_state,
        state_label: projection.state_label,
        grade_derivation: projection.grade_derivation,
        coverage_status: projection.coverage.status,
    });
}
export function agentReadinessDependencySubject(profile) {
    return {
        profileId: profile.agent_readiness_profile_id,
        entityId: profile.entity_id,
        entityRevisionDigest: profile.catalog_binding.entity_revision_digest,
        policyDigest: profile.policy_digest,
        evidenceEventIds: profile.provenance.basis_event_ids,
        declarationRevisionDigest: profile.declaration_revision_digest,
        sourceLocatorDigests: orderedUnique([
            ...profile.surface_catalog.resources.map((resource) => resource.uri),
            ...profile.surface_catalog.endpoints.map((endpoint) => endpoint.uri),
        ].map(catalogSourceLocatorDigest)),
    };
}
export function agentReadinessDependencyRegistration(subject) {
    const keys = [
        catalogPublicationDependencyKey.subject("entity", subject.entityId),
        catalogPublicationDependencyKey.revision(subject.entityRevisionDigest),
        catalogPublicationDependencyKey.policy("agent-readiness-policy"),
        catalogPublicationDependencyKey.policy("freshness-policy"),
        `agent-readiness:policy:${subject.policyDigest}`,
        ...subject.evidenceEventIds.map((eventId) => agentReadinessEvidenceDependencyKey(eventId)),
        ...subject.sourceLocatorDigests.map(catalogPublicationDependencyKey.sourceLocator),
        `agent-readiness:declaration:${subject.declarationRevisionDigest}`,
    ];
    return {
        dependent: { domain: "agent-readiness", key: subject.profileId },
        dependency_keys: orderedUnique(keys),
    };
}
export function agentReadinessOfferRelationDependencySubject(relation) {
    return {
        relationId: relation.relation_id,
        profileId: relation.agent_readiness_profile_id,
        offerId: relation.offer_id,
        offerRevisionDigest: relation.admitted_offer_revision_digest,
        declarationRevisionDigest: relation.declaration_revision_digest,
    };
}
export function agentReadinessOfferRelationDependencyRegistration(subject) {
    return {
        dependent: { domain: "agent-readiness-offer-relation", key: subject.relationId },
        dependency_keys: orderedUnique([
            agentReadinessProfileDependencyKey(subject.profileId),
            catalogPublicationDependencyKey.subject("offer", subject.offerId),
            catalogPublicationDependencyKey.revision(subject.offerRevisionDigest),
            `agent-readiness:declaration:${subject.declarationRevisionDigest}`,
        ]),
    };
}
export function planAgentReadinessOfferRelationImpact(input) {
    assertImpactIndex(input.changeSet, input.impactIndex);
    const removedOffers = new Set(input.changeSet.revision_changes
        .filter((change) => change.kind === "offer" && change.change === "removed")
        .map((change) => change.target_id));
    const affected = input.changeSet.affected_dependents
        .filter((dependent) => dependent.domain === "agent-readiness-offer-relation")
        .map((dependent) => dependent.key);
    const changed = new Set(input.changeSet.changed_dependency_keys);
    const actions = orderedUnique(affected).map((relationId) => {
        const subject = input.subjectsById.get(relationId);
        if (!subject)
            throw new Error(`Missing affected Agent Readiness Offer relation ${relationId}.`);
        const registration = agentReadinessOfferRelationDependencyRegistration(subject);
        const changedDependencyKeys = registration.dependency_keys.filter((key) => changed.has(key));
        if (changedDependencyKeys.length === 0) {
            throw new Error(`Agent Readiness Offer relation ${relationId} has no changed indexed dependency.`);
        }
        return {
            relationId,
            action: removedOffers.has(subject.offerId) ? "withdraw" : "recompute",
            changedDependencyKeys,
        };
    });
    const core = {
        changeSetDigest: input.changeSet.change_set_digest,
        actions,
        dependencyLookups: input.changeSet.dependency_lookups,
        unaffectedDependentsProofDigest: input.changeSet.unaffected_dependents_proof_digest,
    };
    return { ...core, planDigest: digest(core) };
}
export function planAgentReadinessImpact(input) {
    assertImpactIndex(input.changeSet, input.impactIndex);
    const invalidatedKeys = orderedUnique((input.invalidatedEvidenceEventIds ?? []).map(agentReadinessEvidenceDependencyKey));
    const evidenceImpact = input.impactIndex.affected(invalidatedKeys);
    const affectedIds = new Set([...input.changeSet.affected_dependents, ...evidenceImpact.dependents]
        .filter((dependent) => dependent.domain === "agent-readiness")
        .map((dependent) => dependent.key));
    const changed = new Set([...input.changeSet.changed_dependency_keys, ...invalidatedKeys]);
    const removedEntities = new Set(input.changeSet.revision_changes
        .filter((change) => change.kind === "entity" && change.change === "removed")
        .map((change) => change.entity_id));
    const actions = [...affectedIds].sort(compareCanonicalStrings).map((profileId) => {
        const subject = input.subjectsById.get(profileId);
        if (!subject)
            throw new Error(`Missing affected Agent Readiness profile ${profileId}.`);
        const registration = agentReadinessDependencyRegistration(subject);
        const changedDependencyKeys = registration.dependency_keys.filter((key) => changed.has(key));
        if (changedDependencyKeys.length === 0) {
            throw new Error(`Agent Readiness profile ${profileId} has no changed indexed dependency.`);
        }
        return {
            profileId,
            action: removedEntities.has(subject.entityId)
                ? "withdraw"
                : "recompute",
            changedDependencyKeys,
        };
    });
    const core = {
        changeSetDigest: input.changeSet.change_set_digest,
        actions,
        dependencyLookups: input.changeSet.dependency_lookups + evidenceImpact.lookups,
        unaffectedDependentsProofDigest: input.changeSet.unaffected_dependents_proof_digest,
    };
    return { ...core, planDigest: digest(core) };
}
function assertImpactIndex(changeSet, impactIndex) {
    if (changeSet.impact_index_digest !== impactIndex.indexDigest) {
        throw new Error("Agent Readiness impact requires the Change Set's exact dependency index.");
    }
}
function agentReadinessEvidenceDependencyKey(eventId) {
    return `agent-readiness:evidence:${eventId}`;
}
function orderedUnique(values) {
    return [...new Set(values)].sort(compareCanonicalStrings);
}
//# sourceMappingURL=impact.js.map