/** One sufficiency evaluator; callers only project retained evidence into it. */
export function agentReadinessCorroborationInventorySatisfied(input) {
    return input.rule.alternatives.some((alternative) => {
        if (alternative.required_basis_kinds.some((kind) => !input.inventory.basisKinds.has(kind)))
            return false;
        if (input.inventory.captures.size < alternative.minimum_distinct_captures)
            return false;
        if (alternative.require_independent_capture_rungs &&
            new Set(input.inventory.captures.values()).size < 2)
            return false;
        if (alternative.required_artifacts.some((kind) => !input.inventory.artifactKinds.has(kind)))
            return false;
        if (input.inventory.coveredSurfaces.size < alternative.minimum_surfaces)
            return false;
        return input.inventory.coveredBranches >= alternative.minimum_branches;
    });
}
/** The same evidence sufficiency rule applies before interpretation and at admission. */
export function agentReadinessCorroborationSatisfied(input) {
    const captures = new Map();
    for (const basis of input.bases) {
        if (!("captures" in basis))
            continue;
        for (const capture of basis.captures)
            captures.set(capture.retained_capture_digest, capture.capture_rung);
    }
    return agentReadinessCorroborationInventorySatisfied({
        rule: input.rule,
        inventory: {
            basisKinds: new Set(input.bases.map((basis) => basis.kind)),
            captures,
            artifactKinds: input.artifactKinds,
            coveredSurfaces: new Set(input.bases.flatMap((basis) => (basis.kind === "bounded_absence" ? basis.covered_surfaces : input.testedSurfaces).map((surface) => `${surface.node_kind}:${surface.node_id}`))),
            coveredBranches: input.bases.reduce((count, basis) => count + (basis.kind === "bounded_absence" ? basis.covered_branches : 0), 0),
        },
    });
}
/**
 * A policy transition may reuse an admitted fact only when its immutable bases
 * still satisfy the new rule. A revision records basis identities, not the full
 * artifact inventory; infer only the artifact kinds guaranteed by admission of
 * those bases. New requirements such as screenshots therefore need recapture.
 */
export function agentReadinessAdmittedFactSupportsPolicy(input) {
    if (input.signal.value === "unknown")
        return false;
    if (input.rule.value !== input.signal.value)
        return false;
    const artifactKinds = new Set();
    for (const basis of input.signal.determination_bases) {
        if (basis.kind === "standard_requirement") {
            artifactKinds.add("standard_evidence_result");
        }
        else if (basis.kind !== "certification_receipt") {
            artifactKinds.add("source_observation");
            artifactKinds.add("evidence_excerpt");
        }
    }
    return agentReadinessCorroborationSatisfied({
        rule: input.rule,
        bases: input.signal.determination_bases,
        artifactKinds,
        testedSurfaces: input.signal.tested_surfaces,
    });
}
//# sourceMappingURL=corroboration.js.map