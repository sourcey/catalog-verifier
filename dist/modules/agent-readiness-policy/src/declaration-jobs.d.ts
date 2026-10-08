import type { z } from "zod";
import type { AgentReadinessJobBinding, AgentReadinessPolicy, agentReadinessScopeSchema } from "../../../contracts/agent-readiness/src/index.js";
/**
 * Why a declaration cannot be rated under a policy, as declaration-relative
 * paths: its job is not one of the policy's library, or a binding does not
 * perform that job. Empty when it can be rated.
 */
export declare function agentReadinessDeclarationJobIssues(input: {
    readonly declaration: {
        readonly scope: z.infer<typeof agentReadinessScopeSchema>;
        readonly job_bindings: readonly AgentReadinessJobBinding[];
    };
    readonly policy: AgentReadinessPolicy;
}): readonly {
    readonly path: string;
    readonly message: string;
}[];
/** Refuses a declaration its policy cannot rate. */
export declare function assertAgentReadinessDeclarationJobs(input: Parameters<typeof agentReadinessDeclarationJobIssues>[0]): void;
//# sourceMappingURL=declaration-jobs.d.ts.map