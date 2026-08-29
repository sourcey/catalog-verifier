import { AGENT_READINESS_REPOSITORY, type AgentReadinessAuthoring, type AgentReadinessDeclaration, type AgentReadinessDeclarationRevision } from "../../../contracts/agent-readiness/src/declaration.js";
import { type Digest } from "../../primitives/src/index.js";
export interface AgentReadinessDeclarationBlob {
    readonly repository: typeof AGENT_READINESS_REPOSITORY;
    readonly commit: string;
    readonly path: string;
    readonly gitBlobOid: string;
    readonly blobDigest: Digest;
    readonly authoring: AgentReadinessAuthoring;
    readonly declarationRevisions: Readonly<Record<string, AgentReadinessDeclarationRevision>>;
}
/** Parse explicit non-Git authoring bytes without manufacturing Git identity. */
export declare function compileAgentReadinessDeclarationSource(input: {
    readonly source: string;
    readonly content: string;
}): {
    readonly authoring: AgentReadinessAuthoring;
    readonly declarationRevisions: Readonly<Record<string, AgentReadinessDeclarationRevision>>;
};
export declare function readAgentReadinessDeclarationBlobAtRevision(repositoryRoot: string, headRevision: string, file: string): Promise<AgentReadinessDeclarationBlob>;
export declare function agentReadinessDeclarationRevisionDigest(input: {
    readonly authoring: AgentReadinessAuthoring;
    readonly declaration: AgentReadinessDeclaration;
}): Digest;
export declare function compileAgentReadinessDeclarationRevision(input: {
    readonly authoring: AgentReadinessAuthoring;
    readonly declaration: AgentReadinessDeclaration;
}): AgentReadinessDeclarationRevision;
//# sourceMappingURL=declaration-blob.d.ts.map