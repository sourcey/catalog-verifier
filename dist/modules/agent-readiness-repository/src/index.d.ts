import { AGENT_READINESS_REPOSITORY, AGENT_READINESS_REPOSITORY_URL, type AgentReadinessAuthoring, type AgentReadinessDeclaration } from "../../../contracts/agent-readiness/src/declaration.js";
import type { AgentReadinessPolicy } from "../../../contracts/agent-readiness/src/index.js";
import { type AgentReadinessDeclarationBlob } from "./declaration-blob.js";
export * from "./admission.js";
export * from "./declaration-blob.js";
export { AGENT_READINESS_REPOSITORY, AGENT_READINESS_REPOSITORY_URL };
export interface AgentReadinessRepositoryTreeEntry {
    readonly path: string;
    readonly mode: "100644" | "100755" | "120000" | "160000";
    readonly objectType: "blob" | "commit";
    readonly gitObjectOid: string;
}
export interface AgentReadinessRepositoryInspection {
    readonly comparisonBase: string;
    readonly headRevision: string;
    readonly entitiesTreeOid: string;
    readonly treeEntries: readonly AgentReadinessRepositoryTreeEntry[];
    readonly entityFiles: readonly string[];
    readonly blobs: readonly AgentReadinessDeclarationBlob[];
    readonly declarations: number;
}
/**
 * Inspect one immutable repository tree for an explicit bootstrap or audit.
 * Ordinary pull-request admission must use the exact repository-change packet
 * so mixed-path and changed-closure rules remain enforced.
 */
export declare function inspectAgentReadinessRepositoryTreeAtRevision(input: {
    readonly repositoryRoot: string;
    readonly headRevision: string;
    readonly policy: AgentReadinessPolicy;
}): Promise<AgentReadinessRepositoryInspection>;
export declare function validateAgentReadinessRepositoryChange(input: {
    readonly repositoryRoot: string;
    readonly baseRevision: string;
    readonly headRevision: string;
    readonly policy: AgentReadinessPolicy;
}): Promise<{
    readonly entities: number;
    readonly declarations: number;
}>;
/**
 * Validate explicit non-Git declaration bytes through the same parser,
 * revision compiler, and policy closure used by repository intake.
 */
export declare function validateAgentReadinessCandidateSources(input: {
    readonly sources: readonly {
        readonly source: string;
        readonly content: string;
    }[];
    readonly policy: AgentReadinessPolicy;
}): {
    readonly entities: number;
    readonly declarations: number;
};
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
export type AgentReadinessCandidateDisposition = {
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