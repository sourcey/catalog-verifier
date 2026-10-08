import { AGENT_READINESS_REPOSITORY, AGENT_READINESS_REPOSITORY_URL, type AgentReadinessAuthoring, type AgentReadinessDeclaration } from "../../../contracts/agent-readiness/src/declaration.js";
import type { AgentReadinessPolicy } from "../../../contracts/agent-readiness/src/index.js";
export * from "./declaration-blob.js";
export { AGENT_READINESS_REPOSITORY, AGENT_READINESS_REPOSITORY_URL };
export declare function inspectAgentReadinessCandidateSources(input: {
    readonly sources: readonly {
        readonly source: string;
        readonly content: string;
    }[];
    readonly policy: AgentReadinessPolicy;
}): {
    readonly authoring: readonly AgentReadinessAuthoring[];
    readonly summary: {
        readonly entities: number;
        readonly declarations: number;
    };
};
/**
 * Validate the complete current declaration tree with the same canonical
 * parser and policy-closure authority used for changed Git blobs. This is a
 * local/audit adapter only; ordinary PR validation remains changed-closure.
 */
export declare function validateAgentReadinessRepositoryTree(input: {
    readonly repositoryRoot: string;
    readonly policy: AgentReadinessPolicy;
}): Promise<{
    readonly entities: number;
    readonly declarations: number;
}>;
type AgentReadinessCandidateDisposition = {
    readonly status: "ready_for_scope_review";
    readonly declarationAuthority: "community_claimed" | "entity_authority_proven";
} | {
    readonly status: "held";
    readonly reason: "identity_allocation_required" | "entity_identity_mismatch" | "entity_authority_required";
};
/**
 * Classify only exact identity and claimed authority context. A ready result is
 * still a private scope-review candidate; it is never an observation or grade.
 */
export declare function dispositionAgentReadinessDeclaration(input: {
    readonly authoring: AgentReadinessAuthoring;
    readonly declaration: AgentReadinessDeclaration;
    readonly context: {
        readonly entity: {
            readonly entityId: string;
        } | undefined;
        readonly entityAuthorityProven: boolean;
    };
}): AgentReadinessCandidateDisposition;
export * from "./change.js";
//# sourceMappingURL=index.d.ts.map