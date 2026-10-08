import { type AgentReadinessJob, type AgentReadinessJobBinding } from "../../../contracts/agent-readiness/src/index.js";
/**
 * Why a binding cannot perform its library job, or nothing. A binding maps
 * every library observation exactly once, reads only the job's inputs and sinks,
 * and cleans up when the job is consequential. Whether its calls stay on its
 * declared surface is the declaration's own rule, checked where it is parsed.
 */
export declare function agentReadinessBindingIssues(input: {
    readonly job: AgentReadinessJob;
    readonly binding: AgentReadinessJobBinding;
}): readonly string[];
//# sourceMappingURL=binding.d.ts.map