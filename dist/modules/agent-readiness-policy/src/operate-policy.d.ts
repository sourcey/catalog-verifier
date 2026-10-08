import type { z } from "zod";
import type { AgentReadinessJobLibrary } from "../../../contracts/agent-readiness/src/jobs.js";
import { type AgentReadinessPolicy, agentReadinessPolicyCoreSchema } from "../../../contracts/agent-readiness/src/operate-policy.js";
/**
 * The rating policy's authored source (north star §3.6). Readers load the
 * content-addressed file generated from it and pinned by release
 * configuration, never this object.
 */
export declare function agentReadinessPolicySource(input: {
    readonly jobLibrary: AgentReadinessJobLibrary;
}): z.input<typeof agentReadinessPolicyCoreSchema>;
/** The policy with its digest, checked as every reader checks it. */
export declare function sealAgentReadinessPolicy(source: z.input<typeof agentReadinessPolicyCoreSchema>): AgentReadinessPolicy;
/** A published policy, only when its digest and its job library's digest close their content. */
export declare function verifyAgentReadinessPolicy(value: unknown): AgentReadinessPolicy;
//# sourceMappingURL=operate-policy.d.ts.map