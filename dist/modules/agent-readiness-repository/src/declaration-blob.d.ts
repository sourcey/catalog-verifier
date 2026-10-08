import { type AgentReadinessAuthoring, type AgentReadinessDeclaration, type AgentReadinessDeclarationRevision } from "../../../contracts/agent-readiness/src/declaration.js";
import type { AgentReadinessDeclarationProvenance, AgentReadinessHostedDeclarationProvenance } from "../../../contracts/agent-readiness/src/declaration-reference.js";
/** One Entity's exact authoring bytes, compiled, and where those bytes live. */
export interface AgentReadinessDeclarationBlob {
    readonly provenance: AgentReadinessDeclarationProvenance;
    readonly authoring: AgentReadinessAuthoring;
    readonly declarationRevisions: Readonly<Record<string, AgentReadinessDeclarationRevision>>;
}
/** Compile hosted authoring bytes; the path follows the Entity slug and the digest the bytes. */
export declare function compileAgentReadinessHostedDeclarationBlob(input: {
    readonly content: string;
}): AgentReadinessDeclarationBlob & {
    readonly provenance: AgentReadinessHostedDeclarationProvenance;
};
/** Parse explicit non-Git authoring bytes without manufacturing Git identity. */
export declare function compileAgentReadinessDeclarationSource(input: {
    readonly source: string;
    readonly content: string;
}): {
    readonly authoring: AgentReadinessAuthoring;
    readonly declarationRevisions: Readonly<Record<string, AgentReadinessDeclarationRevision>>;
};
export declare function readAgentReadinessDeclarationBlobAtRevision(repositoryRoot: string, headRevision: string, file: string): Promise<AgentReadinessDeclarationBlob>;
export declare function compileAgentReadinessDeclarationRevision(input: {
    readonly authoring: AgentReadinessAuthoring;
    readonly declaration: AgentReadinessDeclaration;
}): AgentReadinessDeclarationRevision;
//# sourceMappingURL=declaration-blob.d.ts.map