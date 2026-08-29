import { agentReadinessFactualInputSchema, agentReadinessProfileInputSchema, agentReadinessRevisionCoreSchema, agentReadinessRevisionSchema, agentReadinessStageSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { compareCanonicalStrings, digest } from "../../primitives/src/index.js";
import { surfaceKey } from "./surface-selection.js";
export function compileAgentReadinessRevision(input) {
    const parsed = agentReadinessProfileInputSchema.parse(input);
    return compileAgentReadinessFactualRevision({
        factual_input_contract: "sourcey.agent-readiness-factual-input/v1alpha1",
        agent_readiness_profile_id: parsed.agent_readiness_profile_id,
        entity_id: parsed.entity_id,
        scope: parsed.scope,
        catalog_binding: parsed.catalog_binding,
        declaration_revision_digest: parsed.declaration_revision_digest,
        declaration: parsed.declaration,
        lifecycle: parsed.lifecycle,
        effective_from: parsed.effective_from,
        ...(parsed.effective_until ? { effective_until: parsed.effective_until } : {}),
        signals: parsed.signals,
    });
}
export function compileAgentReadinessFactualRevision(input) {
    const parsed = agentReadinessFactualInputSchema.parse(input);
    const core = agentReadinessRevisionCoreSchema.parse({
        revision_contract: "sourcey.agent-readiness-revision/v1alpha1",
        agent_readiness_profile_id: parsed.agent_readiness_profile_id,
        entity_id: parsed.entity_id,
        scope: parsed.scope,
        catalog_binding: parsed.catalog_binding,
        declaration_revision_digest: parsed.declaration_revision_digest,
        declaration: parsed.declaration,
        lifecycle: parsed.lifecycle,
        effective_from: parsed.effective_from,
        ...(parsed.effective_until ? { effective_until: parsed.effective_until } : {}),
        signals: [...parsed.signals].sort(compareSignals).map((signal) => ({
            ...signal,
            tested_surfaces: [...signal.tested_surfaces].sort((left, right) => compareCanonicalStrings(surfaceKey(left), surfaceKey(right))),
            determination_bases: [...signal.determination_bases].sort((left, right) => compareCanonicalStrings(digest(left), digest(right))),
        })),
    });
    return agentReadinessRevisionSchema.parse({ ...core, revision_digest: digest(core) });
}
function compareSignals(left, right) {
    return (agentReadinessStageSchema.options.indexOf(left.stage) -
        agentReadinessStageSchema.options.indexOf(right.stage) ||
        compareCanonicalStrings(left.signal_code, right.signal_code));
}
//# sourceMappingURL=revision.js.map