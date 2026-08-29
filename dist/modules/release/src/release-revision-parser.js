import { agentReadinessDeclarationRevisionSchema, agentReadinessRevisionSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { entityRevisionSchema, offerRevisionSchema, programRevisionSchema, } from "../../../contracts/revisions/src/index.js";
export function parseReleaseRevision(value) {
    const input = typeof value === "object" && value !== null ? value : {};
    if (input.revision_contract === "sourcey.entity-revision/v1alpha1") {
        return entityRevisionSchema.parse(value);
    }
    if (input.revision_contract === "sourcey.program-revision/v1alpha1") {
        return programRevisionSchema.parse(value);
    }
    if (input.revision_contract === "sourcey.offer-revision/v1alpha1") {
        return offerRevisionSchema.parse(value);
    }
    if (input.revision_contract === "sourcey.agent-readiness-revision/v1alpha1") {
        return agentReadinessRevisionSchema.parse(value);
    }
    return agentReadinessDeclarationRevisionSchema.parse(value);
}
//# sourceMappingURL=release-revision-parser.js.map