import { z } from "zod";
export declare const AGENT_READINESS_REPOSITORY: "sourcey/agent-ready-services";
export declare const AGENT_READINESS_REPOSITORY_URL: "https://github.com/sourcey/agent-ready-services";
/**
 * An immutable declaration locator records the path at its pinned Git commit.
 * It is intentionally independent of the repository's current authoring root.
 */
export declare const agentReadinessRepositoryYamlPathSchema: z.ZodString;
/** The single accepted path shape for new Agent Readiness authoring. */
export declare const agentReadinessAuthoringPathSchema: z.ZodString;
/** A declaration held in the public repository at one pinned commit. */
declare const agentReadinessGitDeclarationProvenanceSchema: z.ZodObject<{
    repository: z.ZodLiteral<"sourcey/agent-ready-services">;
    commit: z.ZodString;
    path: z.ZodString;
    git_blob_oid: z.ZodString;
    blob_digest: z.ZodString;
}, z.core.$strict>;
/**
 * A declaration submitted to Sourcey without Git. Sourcey serves the exact
 * authoring bytes by their digest once a published profile cites them.
 */
declare const agentReadinessHostedDeclarationProvenanceSchema: z.ZodObject<{
    source: z.ZodLiteral<"sourcey">;
    path: z.ZodString;
    blob_digest: z.ZodString;
}, z.core.$strict>;
/**
 * Where a declaration's exact bytes live. The two shapes share no field that
 * could make one parse as the other, so a Git locator stays byte-identical.
 */
export declare const agentReadinessDeclarationProvenanceSchema: z.ZodUnion<readonly [z.ZodObject<{
    repository: z.ZodLiteral<"sourcey/agent-ready-services">;
    commit: z.ZodString;
    path: z.ZodString;
    git_blob_oid: z.ZodString;
    blob_digest: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    source: z.ZodLiteral<"sourcey">;
    path: z.ZodString;
    blob_digest: z.ZodString;
}, z.core.$strict>]>;
export type AgentReadinessDeclarationProvenance = z.infer<typeof agentReadinessDeclarationProvenanceSchema>;
type AgentReadinessGitDeclarationProvenance = z.infer<typeof agentReadinessGitDeclarationProvenanceSchema>;
export type AgentReadinessHostedDeclarationProvenance = z.infer<typeof agentReadinessHostedDeclarationProvenanceSchema>;
/** Narrow a provenance to the Git locator; the local Git lane refuses anything else. */
export declare function agentReadinessGitProvenance(provenance: AgentReadinessDeclarationProvenance): AgentReadinessGitDeclarationProvenance;
export declare const agentReadinessDeclarationReferenceSchema: z.ZodObject<{
    declaration_id: z.ZodString;
    provenance: z.ZodUnion<readonly [z.ZodObject<{
        repository: z.ZodLiteral<"sourcey/agent-ready-services">;
        commit: z.ZodString;
        path: z.ZodString;
        git_blob_oid: z.ZodString;
        blob_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        source: z.ZodLiteral<"sourcey">;
        path: z.ZodString;
        blob_digest: z.ZodString;
    }, z.core.$strict>]>;
}, z.core.$strict>;
export declare const agentReadinessDeclarationStateSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    status: z.ZodLiteral<"none">;
}, z.core.$strict>, z.ZodObject<{
    declaration_id: z.ZodString;
    provenance: z.ZodUnion<readonly [z.ZodObject<{
        repository: z.ZodLiteral<"sourcey/agent-ready-services">;
        commit: z.ZodString;
        path: z.ZodString;
        git_blob_oid: z.ZodString;
        blob_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        source: z.ZodLiteral<"sourcey">;
        path: z.ZodString;
        blob_digest: z.ZodString;
    }, z.core.$strict>]>;
    status: z.ZodEnum<{
        community_declared: "community_declared";
        entity_attested: "entity_attested";
    }>;
}, z.core.$strict>], "status">;
export {};
//# sourceMappingURL=declaration-reference.d.ts.map