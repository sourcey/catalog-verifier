import type { z } from "zod";
import { type AgentReadinessJobBinding } from "../../../contracts/agent-readiness/src/binding.js";
import type { AgentReadinessJobLibrary } from "../../../contracts/agent-readiness/src/jobs.js";
import type { agentReadinessScopeSchema } from "../../../contracts/agent-readiness/src/shared.js";
/**
 * Why a declaration cannot be rated, as declaration-relative paths: its job is
 * not in the job library, or a binding does not perform that job. Empty when
 * it can be rated. Only the library decides this, never the grading rules.
 */
export declare function agentReadinessDeclarationJobIssues(input: {
    readonly declaration: {
        readonly scope: z.infer<typeof agentReadinessScopeSchema>;
        readonly job_bindings: readonly AgentReadinessJobBinding[];
    };
    readonly jobLibrary: AgentReadinessJobLibrary;
}): readonly {
    readonly path: string;
    readonly message: string;
}[];
/** Refuses a declaration its job library cannot rate. */
export declare function assertAgentReadinessDeclarationJobs(input: Parameters<typeof agentReadinessDeclarationJobIssues>[0]): void;
//# sourceMappingURL=declaration-jobs.d.ts.map