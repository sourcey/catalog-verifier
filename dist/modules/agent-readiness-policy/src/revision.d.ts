import { type AgentReadinessDeclarationRevision, type AgentReadinessPolicy, type AgentReadinessProfileInput, type AgentReadinessRevision } from "../../../contracts/agent-readiness/src/index.js";
/** The revision an input compiles to: its fields, without the run records they rest on. */
export declare function compileAgentReadinessRevision(input: AgentReadinessProfileInput): AgentReadinessRevision;
/**
 * An input whose grade is exactly what the engine derives from its run
 * records, under the pinned policy and the job library it carries, for the
 * interface and binding it names in its declaration revision: every step, a
 * letter, and the discovery facts. Anything else is refused.
 */
export declare function verifyAgentReadinessProfileInput(input: {
    readonly profileInput: AgentReadinessProfileInput;
    readonly declarationRevision: AgentReadinessDeclarationRevision;
    readonly policy: AgentReadinessPolicy;
}): AgentReadinessProfileInput;
//# sourceMappingURL=revision.d.ts.map