export * from "./current-policy.js";
export * from "./grading.js";
export * from "./impact.js";
export * from "./offer-relations.js";
export * from "./policy-validation.js";
export * from "./revision.js";
export * from "./standard-mapping.js";
import { agentReadinessDeclarationRevisionCoreSchema, agentReadinessDeclarationRevisionSchema, agentReadinessProjectionCoreSchema, agentReadinessProjectionSchema, agentReadinessRevisionSchema, agentReadinessStageLabel, agentReadinessStageSchema, methodCapabilityFor, sameAgentReadinessScopeIdentity, } from "../../../contracts/agent-readiness/src/index.js";
import { agentReadinessCanonicalPath } from "../../../contracts/routes/src/index.js";
import { canonicalJson, compareCanonicalStrings, digest } from "../../primitives/src/index.js";
import { deriveProvenance, evidenceStatusFor, } from "../../provenance/src/index.js";
import { verifyStandardEvidenceResult } from "../../standard-evidence/src/index.js";
import { deriveAgentReadinessGrade, isAgentReadinessGradingSignal, isAgentReadinessResolvedBarrierSignal, isAgentReadinessVerifiedBarrierSignal, } from "./grading.js";
import { validateAgentReadinessPolicy } from "./policy-validation.js";
import { priorAgentReadinessVisibility } from "./projection-lineage.js";
import { agentReadinessValuesSupportedByStandardRequirementResults } from "./standard-mapping.js";
import { assertAgentReadinessSignalSelectorCoverage, assertSignalSurfaceClosure, surfaceCatalogFromDeclaration, } from "./surface-selection.js";
export { agentReadinessDeclarationPolicyGaps, assertAgentReadinessDeclarationPolicyClosure, assertAgentReadinessSignalSelectorCoverage, } from "./surface-selection.js";
export function agentReadinessValuesSupportedByStandardEvidence(input) {
    const policy = validateAgentReadinessPolicy(input.policy);
    const rule = policy.signal_rules.find((candidate) => candidate.stage === input.stage && candidate.signal_code === input.signalCode);
    if (!rule) {
        throw new Error(`Unknown Agent Readiness signal ${input.stage}:${input.signalCode} for standard evidence.`);
    }
    const result = verifyStandardEvidenceResult(input.result);
    return agentReadinessValuesSupportedByStandardRequirementResults({
        mappings: rule.standard_evidence,
        results: result.requirements,
    });
}
export function deriveAgentReadinessProjection(input) {
    const context = deriveAgentReadinessProjectionContext(input);
    return projectAgentReadinessProjection({
        ...context,
        entitySlug: input.entitySlug,
        priorVisibility: priorAgentReadinessVisibility(context.revision, input.priorProjection),
    });
}
export function deriveAgentReadinessAssessment(input) {
    return evaluateAgentReadinessProjection(deriveAgentReadinessProjectionContext(input));
}
export function verifyAgentReadinessProjection(input) {
    const projection = agentReadinessProjectionSchema.parse(input);
    const { projection_digest: projectionDigest, ...coreInput } = projection;
    const core = agentReadinessProjectionCoreSchema.parse(coreInput);
    if (digest(core) !== projectionDigest) {
        throw new Error("Agent Readiness projection digest mismatch.");
    }
    return projection;
}
function deriveAgentReadinessProjectionContext(input) {
    const revision = agentReadinessRevisionSchema.parse(input.revision);
    const declarationRevision = agentReadinessDeclarationRevisionSchema.parse(input.declarationRevision);
    const { revision_digest: declarationDigest, ...declarationCore } = declarationRevision;
    if (digest(agentReadinessDeclarationRevisionCoreSchema.parse(declarationCore)) !==
        declarationDigest ||
        revision.declaration_revision_digest !== declarationDigest ||
        revision.entity_id !== declarationRevision.entity_id ||
        !sameAgentReadinessScopeIdentity(revision.scope, declarationRevision.declaration.scope)) {
        throw new Error("Agent Readiness projection does not bind its exact declaration revision and declaration scope.");
    }
    assertSignalSurfaceClosure(revision, declarationRevision);
    const policy = validateAgentReadinessPolicy(input.policy);
    if (!Number.isFinite(Date.parse(input.policyAsOf))) {
        throw new Error("Agent readiness projection policy time is invalid.");
    }
    const provenance = deriveProvenance({
        revision,
        authorityEntityRevision: input.authorityEntityRevision,
        graph: input.graph,
        coveragePolicy: policy,
        freshnessPolicy: input.freshnessPolicy,
        policyAsOf: input.policyAsOf,
    });
    return {
        revision,
        policy,
        policyAsOf: input.policyAsOf,
        freshnessPolicy: input.freshnessPolicy,
        surfaceCatalog: surfaceCatalogFromDeclaration(declarationRevision),
        provenance,
    };
}
export function regradeAgentReadinessProjection(input) {
    const revision = agentReadinessRevisionSchema.parse(input.revision);
    const prior = verifyAgentReadinessProjection(input.priorProjection);
    const policy = validateAgentReadinessPolicy(input.policy);
    assertCurrentAgentReadinessProjectionRevision(prior, revision);
    if (Date.parse(input.policyAsOf) < Date.parse(prior.policy_as_of) ||
        prior.provenance.coverage_policy_digest !== prior.policy_digest) {
        throw new Error("Agent Readiness regrade does not bind the exact current revision.");
    }
    return deriveAgentReadinessProjection({
        revision,
        declarationRevision: input.declarationRevision,
        authorityEntityRevision: input.authorityEntityRevision,
        priorProjection: prior,
        graph: input.graph,
        policy,
        policyAsOf: input.policyAsOf,
        freshnessPolicy: input.freshnessPolicy,
        entitySlug: input.entitySlug,
    });
}
/**
 * Move only the public route of an immutable assessment projection. This is
 * the contract-transition path: it retains every assessed fact, grade,
 * evidence binding, policy result, and publication decision byte-for-byte.
 */
export function reprojectAgentReadinessCanonicalRoute(input) {
    const revision = agentReadinessRevisionSchema.parse(input.revision);
    const prior = verifyAgentReadinessProjection(input.priorProjection);
    assertCurrentAgentReadinessProjectionRevision(prior, revision);
    const { projection_digest: _projectionDigest, ...priorCore } = prior;
    const core = agentReadinessProjectionCoreSchema.parse({
        ...priorCore,
        canonical_url: `https://sourcey.com${agentReadinessCanonicalPath({
            entity_slug: input.entitySlug,
            product_key: revision.scope.product.key,
            funnel_key: revision.scope.funnel.key,
        })}`,
    });
    return agentReadinessProjectionSchema.parse({
        ...core,
        projection_digest: digest(core),
    });
}
export function deriveAgentReadinessReprojection(input) {
    const routeProjection = reprojectAgentReadinessCanonicalRoute(input);
    return canonicalJson(routeProjection) === canonicalJson(input.currentProjection)
        ? routeProjection
        : regradeAgentReadinessProjection(input);
}
function assertCurrentAgentReadinessProjectionRevision(prior, revision) {
    if (prior.agent_readiness_profile_id !== revision.agent_readiness_profile_id ||
        prior.revision_digest !== revision.revision_digest ||
        prior.entity_id !== revision.entity_id ||
        JSON.stringify(prior.scope) !== JSON.stringify(revision.scope) ||
        JSON.stringify(prior.catalog_binding) !== JSON.stringify(revision.catalog_binding) ||
        prior.declaration_revision_digest !== revision.declaration_revision_digest ||
        JSON.stringify(prior.declaration) !== JSON.stringify(revision.declaration) ||
        prior.lifecycle !== revision.lifecycle ||
        prior.effective_from !== revision.effective_from ||
        prior.effective_until !== revision.effective_until) {
        throw new Error("Agent Readiness projection does not bind the exact current revision.");
    }
}
function evaluateAgentReadinessProjection(input) {
    const { revision, policy, provenance } = input;
    if (!Number.isFinite(Date.parse(input.policyAsOf))) {
        throw new Error("Agent readiness projection policy time is invalid.");
    }
    const facts = new Map(revision.signals.map((signal, index) => [
        `${signal.stage}:${signal.signal_code}`,
        {
            signal,
            field: provenance.fields.find((candidate) => candidate.path === `/signals/${index}`),
        },
    ]));
    const policySignalKeys = new Set(policy.signal_rules.map((rule) => `${rule.stage}:${rule.signal_code}`));
    const unmodeledSignals = revision.signals
        .map((signal) => `${signal.stage}:${signal.signal_code}`)
        .filter((key) => !policySignalKeys.has(key));
    if (unmodeledSignals.length > 0) {
        throw new Error(`Agent readiness revision contains signals outside policy: ${unmodeledSignals.join(", ")}.`);
    }
    const stages = agentReadinessStageSchema.options.map((stage) => {
        const rules = policy.signal_rules.filter((rule) => rule.stage === stage);
        const evaluated = rules.map((rule) => {
            const fact = facts.get(`${stage}:${rule.signal_code}`);
            if (fact)
                assertAllowedAssessmentMethod(fact.signal, rule, policy, input.surfaceCatalog);
            const evidenceStatus = fact ? evidenceStatusFor(fact.field) : "missing";
            const outcome = fact && evidenceStatus === "supported" && fact.signal.value !== "unknown"
                ? agentReadinessSignalOutcome(rule, fact.signal.value)
                : "unknown";
            const value = fact && evidenceStatus === "supported" ? fact.signal.value : "unknown";
            const descriptor = rule.public_findings[value];
            const publicState = policy.public_states[outcome];
            const freshness = fact
                ? assessmentFreshness(fact.signal, fact.field?.freshness ?? "unknown", policy)
                : "unknown";
            const blocker = outcome === "fail" && rule.blocker
                ? { signal_code: rule.signal_code, ...rule.blocker }
                : undefined;
            const remediation = ["constrained", "fail"].includes(outcome) && rule.remediation
                ? { signal_code: rule.signal_code, ...rule.remediation }
                : undefined;
            return {
                rule,
                outcome,
                evidenceStatus,
                signal: {
                    signal_code: rule.signal_code,
                    evaluation_role: rule.evaluation_role,
                    required: rule.required,
                    value,
                    value_label: publicState.label,
                    outcome,
                    public_state: publicState.state,
                    condition: descriptor.condition,
                    finding: descriptor.finding,
                    evidence_status: evidenceStatus,
                    freshness,
                    ...(fact
                        ? {
                            observed_at: fact.signal.observed_at,
                            tested_surfaces: fact.signal.tested_surfaces,
                            assessment_method: fact.signal.assessment_method,
                            determination_bases: fact.signal.determination_bases,
                            ...(fact.signal.note ? { note: fact.signal.note } : {}),
                        }
                        : { tested_surfaces: [], determination_bases: [] }),
                    ...(blocker ? { blocker } : {}),
                    ...(remediation ? { remediation } : {}),
                },
            };
        });
        const graded = evaluated.filter((entry) => isAgentReadinessGradingSignal(entry.rule));
        const resolvedBarriers = evaluated.filter((entry) => isAgentReadinessResolvedBarrierSignal(entry.signal));
        const stageSignals = [...graded, ...resolvedBarriers];
        const outcome = worstAgentReadinessOutcome(stageSignals.map((entry) => entry.outcome), policy.aggregation.outcome_precedence);
        const orderedStageSignals = [...stageSignals].sort((left, right) => compareEvaluatedRules(left, right, policy.aggregation.outcome_precedence));
        const primary = orderedStageSignals[0];
        if (!primary)
            throw new Error(`Agent readiness stage ${stage} has no graded primary finding.`);
        const orderedSecondary = evaluated
            .filter((entry) => entry !== primary)
            .sort((left, right) => compareEvaluatedRules(left, right, policy.aggregation.outcome_precedence));
        return {
            stage,
            stage_label: agentReadinessStageLabel(stage),
            outcome,
            public_state: policy.public_states[outcome].state,
            state_label: policy.public_states[outcome].label,
            primary_finding: projectedFinding(primary),
            secondary_context: orderedSecondary.map(projectedFinding),
            signals: evaluated
                .map((entry) => entry.signal)
                .sort((left, right) => compareCanonicalStrings(left.signal_code, right.signal_code)),
            blockers: orderedStageSignals.flatMap((entry) => entry.signal.blocker ? [entry.signal.blocker] : []),
            remediations: orderedStageSignals.flatMap((entry) => entry.signal.remediation ? [entry.signal.remediation] : []),
        };
    });
    const signals = stages.flatMap((stage) => stage.signals);
    const gradedSignals = signals.filter((signal) => signal.evaluation_role === "graded");
    const coveredSignals = gradedSignals.filter((signal) => signal.evidence_status === "supported" &&
        signal.value !== "unknown" &&
        signal.outcome !== "unknown" &&
        signal.freshness === "fresh");
    const coverageRatio = gradedSignals.length === 0 ? 1 : coveredSignals.length / gradedSignals.length;
    const coverageStatus = coverageRatio === 1 ? "complete" : "incomplete";
    const barrierSignals = signals.filter((signal) => signal.evaluation_role === "barrier");
    const verifiedBarrierSignals = barrierSignals.filter(isAgentReadinessVerifiedBarrierSignal);
    const barrierRatio = barrierSignals.length === 0 ? 1 : verifiedBarrierSignals.length / barrierSignals.length;
    const freshnessSignals = policy.freshness.aggregation === "worst-required-signal"
        ? gradedSignals
        : policy.freshness.aggregation === "worst-evaluated-signal"
            ? signals.filter((signal) => signal.evaluation_role !== "informational")
            : signals;
    const freshness = freshnessSignals.some((signal) => signal.freshness === "unknown")
        ? "unknown"
        : freshnessSignals.some((signal) => signal.freshness === "stale")
            ? "stale"
            : "fresh";
    const overallOutcome = worstAgentReadinessOutcome(stages.map((stage) => stage.outcome), policy.aggregation.outcome_precedence);
    const grade = deriveAgentReadinessGrade({
        policy,
        stages,
        coverageStatus,
        freshness,
    });
    return {
        stages,
        signals,
        gradedSignals,
        coveredSignals,
        coverageRatio,
        coverageStatus,
        barrierSignals,
        verifiedBarrierSignals,
        barrierRatio,
        freshness,
        overallOutcome,
        grade,
    };
}
function projectAgentReadinessProjection(input) {
    const { revision, policy, provenance } = input;
    const { stages, gradedSignals, coveredSignals, coverageRatio, coverageStatus, barrierSignals, verifiedBarrierSignals, barrierRatio, freshness, overallOutcome, grade, } = evaluateAgentReadinessProjection(input);
    const actionableFindings = stages
        .flatMap((stage) => stage.signals
        .filter((signal) => signal.evaluation_role !== "informational" &&
        signal.evidence_status === "supported" &&
        (signal.public_state === "blocked" || signal.public_state === "limited"))
        .map((signal) => ({ stage, signal })))
        .sort((left, right) => compareActionableFindings(left, right, policy));
    const primaryFinding = actionableFindings[0];
    const firstBlockedStage = stages.find((stage) => stage.public_state === "blocked");
    const limitations = actionableFindings.filter(({ signal }) => signal.public_state === "limited");
    const publicationReasons = agentReadinessPublicationReasons({
        revision,
        stages,
        coverageStatus,
        freshness,
        grade,
        provenance,
    });
    const visibility = publicationReasons.length === 0
        ? "discoverable"
        : input.priorVisibility === "discoverable" || input.priorVisibility === "resolvable_only"
            ? "resolvable_only"
            : "private";
    const core = agentReadinessProjectionCoreSchema.parse({
        projection_contract: "sourcey.agent-readiness-projection/v1alpha1",
        agent_readiness_profile_id: revision.agent_readiness_profile_id,
        entity_id: revision.entity_id,
        scope: revision.scope,
        catalog_binding: revision.catalog_binding,
        declaration_revision_digest: revision.declaration_revision_digest,
        declaration: revision.declaration,
        surface_catalog: input.surfaceCatalog,
        lifecycle: revision.lifecycle,
        effective_from: revision.effective_from,
        ...(revision.effective_until ? { effective_until: revision.effective_until } : {}),
        revision_digest: revision.revision_digest,
        policy_digest: policy.policy_digest,
        policy_version: policy.policy_version,
        policy_as_of: input.policyAsOf,
        assessment_basis: policy.assessment_basis,
        overall_outcome: overallOutcome,
        public_state: policy.public_states[overallOutcome].state,
        state_label: policy.public_states[overallOutcome].label,
        grade,
        grade_derivation: policy.grade_derivation,
        publication: {
            visibility,
            reasons: publicationReasons,
        },
        ...(primaryFinding
            ? {
                primary_finding: {
                    stage: primaryFinding.stage.stage,
                    stage_label: primaryFinding.stage.stage_label,
                    public_state: primaryFinding.signal.public_state,
                    finding: {
                        signal_code: primaryFinding.signal.signal_code,
                        condition: primaryFinding.signal.condition,
                        finding: primaryFinding.signal.finding,
                        ...("note" in primaryFinding.signal && primaryFinding.signal.note
                            ? { context: primaryFinding.signal.note }
                            : {}),
                    },
                    ...(primaryFinding.signal.blocker ? { blocker: primaryFinding.signal.blocker } : {}),
                },
            }
            : {}),
        ...(firstBlockedStage
            ? {
                first_blocked_stage: {
                    stage: firstBlockedStage.stage,
                    stage_label: firstBlockedStage.stage_label,
                    finding: firstBlockedStage.primary_finding,
                    ...(firstBlockedStage.blockers[0] ? { blocker: firstBlockedStage.blockers[0] } : {}),
                },
            }
            : {}),
        limitations: limitations.map(({ stage, signal }) => ({
            stage: stage.stage,
            stage_label: stage.stage_label,
            finding: {
                signal_code: signal.signal_code,
                condition: signal.condition,
                finding: signal.finding,
                ...("note" in signal && signal.note ? { context: signal.note } : {}),
            },
            ...(signal.remediation ? { remediation: signal.remediation } : {}),
        })),
        stages,
        coverage: {
            status: coverageStatus,
            required_signals: gradedSignals.length,
            covered_signals: coveredSignals.length,
            ratio: coverageRatio,
            barrier_signals: barrierSignals.length,
            verified_barrier_signals: verifiedBarrierSignals.length,
            barrier_ratio: barrierRatio,
        },
        last_tested_at: latestInstant(revision.signals.map((signal) => signal.observed_at)),
        freshness,
        provenance,
        canonical_url: `https://sourcey.com${agentReadinessCanonicalPath({
            entity_slug: input.entitySlug,
            product_key: revision.scope.product.key,
            funnel_key: revision.scope.funnel.key,
        })}`,
    });
    return agentReadinessProjectionSchema.parse({
        ...core,
        projection_digest: digest(core),
    });
}
function latestInstant(instants) {
    const latest = [...instants].sort((left, right) => Date.parse(left) - Date.parse(right)).at(-1);
    if (!latest)
        throw new Error("Agent Readiness projection requires a tested signal instant.");
    return latest;
}
function agentReadinessPublicationReasons(input) {
    const reasons = [];
    const signals = input.stages.flatMap((stage) => stage.signals);
    if (input.revision.lifecycle !== "active")
        reasons.push("lifecycle_not_active");
    if (input.coverageStatus !== "complete")
        reasons.push("coverage_incomplete");
    if (signals.some((signal) => signal.evaluation_role === "graded" && signal.evidence_status !== "supported")) {
        reasons.push("required_evidence_not_supported");
    }
    if (input.freshness !== "fresh")
        reasons.push("freshness_not_fresh");
    if (input.grade === "unrated")
        reasons.push("unrated");
    if (!signals.some((signal) => signal.evidence_status === "supported")) {
        reasons.push("no_useful_finding");
    }
    if (input.provenance.dispute === "open")
        reasons.push("open_dispute");
    return reasons;
}
function projectedFinding(entry) {
    return {
        signal_code: entry.rule.signal_code,
        condition: entry.signal.condition,
        finding: entry.signal.finding,
        ...(entry.signal.note ? { context: entry.signal.note } : {}),
    };
}
export function agentReadinessSignalOutcome(rule, value) {
    if (rule.pass_values.includes(value))
        return value === "not_applicable" ? "not_applicable" : "pass";
    if (rule.constrained_values.includes(value)) {
        return value === "not_applicable" ? "not_applicable" : "constrained";
    }
    if (rule.fail_values.includes(value))
        return value === "not_applicable" ? "not_applicable" : "fail";
    return "unknown";
}
export function worstAgentReadinessOutcome(outcomes, precedence) {
    return ([...outcomes].sort((left, right) => precedence.indexOf(left) - precedence.indexOf(right))[0] ??
        "unknown");
}
function assertAllowedAssessmentMethod(signal, rule, policy, surfaceCatalog) {
    const method = policy.assessment_methods.find((candidate) => candidate.method_digest === signal.assessment_method.method_digest);
    if (!method ||
        method.name !== signal.assessment_method.name ||
        method.version !== signal.assessment_method.version ||
        !rule.allowed_method_digests.includes(method.method_digest)) {
        throw new Error(`Agent readiness signal ${signal.stage}:${signal.signal_code} uses an unapproved assessment method.`);
    }
    const selectorGroup = rule.selector_groups.find((group) => group.selector_group_id === signal.selector_group_id);
    if (!selectorGroup) {
        throw new Error(`Agent readiness signal ${signal.stage}:${signal.signal_code} uses an unknown selector group.`);
    }
    assertAgentReadinessSignalSelectorCoverage(signal, selectorGroup, surfaceCatalog, rule.allow_not_applicable);
    if (signal.tested_surfaces.some((surface) => surface.node_kind !== "surface_exclusion" &&
        !method.surface_support.node_kinds.includes(surface.node_kind))) {
        throw new Error(`Agent readiness signal ${signal.stage}:${signal.signal_code} uses an unsupported surface kind.`);
    }
    const capability = methodCapabilityFor(method, signal.stage, signal.signal_code);
    if (!capability || (signal.value !== "unknown" && !capability.values.includes(signal.value))) {
        throw new Error(`Agent readiness method ${method.name}@${method.version} cannot establish ${signal.stage}:${signal.signal_code}=${signal.value}.`);
    }
    if (signal.determination_bases.some((basis) => !capability.determination_bases.includes(basis.kind))) {
        throw new Error(`Agent readiness signal ${signal.stage}:${signal.signal_code} uses an unsupported determination basis.`);
    }
}
function assessmentFreshness(signal, evidenceFreshness, policy) {
    const method = policy.assessment_methods.find((candidate) => candidate.method_digest === signal.assessment_method.method_digest);
    return method?.capture.freshness_capability === "history-only" ? "stale" : evidenceFreshness;
}
function compareActionableFindings(left, right, policy) {
    const severity = { blocked: 0, limited: 1 };
    const leftRule = policy.signal_rules.find((rule) => rule.stage === left.stage.stage && rule.signal_code === left.signal.signal_code);
    const rightRule = policy.signal_rules.find((rule) => rule.stage === right.stage.stage && rule.signal_code === right.signal.signal_code);
    if (!leftRule || !rightRule)
        throw new Error("Actionable finding lost its policy rule.");
    return (severity[left.signal.public_state] -
        severity[right.signal.public_state] ||
        agentReadinessStageSchema.options.indexOf(left.stage.stage) -
            agentReadinessStageSchema.options.indexOf(right.stage.stage) ||
        leftRule.priority - rightRule.priority ||
        compareCanonicalStrings(left.signal.signal_code, right.signal.signal_code));
}
function compareEvaluatedRules(left, right, precedence) {
    return (precedence.indexOf(left.outcome) - precedence.indexOf(right.outcome) ||
        left.rule.priority - right.rule.priority ||
        compareCanonicalStrings(left.rule.signal_code, right.rule.signal_code));
}
//# sourceMappingURL=index.js.map