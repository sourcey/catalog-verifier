import { compareCanonicalStrings } from "provenry/primitives";
export function agentReadinessValuesSupportedByStandardRequirementResults(input) {
    const values = input.results.flatMap((requirementResult) => {
        if (requirementResult.status === "indeterminate")
            return [];
        const mapping = input.mappings.find((candidate) => candidate.requirement.namespace === requirementResult.requirement.namespace &&
            candidate.requirement.version === requirementResult.requirement.version &&
            candidate.requirement.requirement_id === requirementResult.requirement.requirement_id &&
            candidate.requirement.relation === requirementResult.requirement.relation);
        return (mapping?.support.find((support) => support.result === requirementResult.status)?.values ?? []);
    });
    return [...new Set(values)].sort(compareCanonicalStrings);
}
//# sourceMappingURL=standard-mapping.js.map