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
export declare const agentReadinessDeclarationProvenanceSchema: z.ZodObject<{
    repository: z.ZodLiteral<"sourcey/agent-ready-services">;
    commit: z.ZodString;
    path: z.ZodString;
    git_blob_oid: z.ZodString;
    blob_digest: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessDeclarationReferenceSchema: z.ZodObject<{
    declaration_id: z.ZodString;
    provenance: z.ZodObject<{
        repository: z.ZodLiteral<"sourcey/agent-ready-services">;
        commit: z.ZodString;
        path: z.ZodString;
        git_blob_oid: z.ZodString;
        blob_digest: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const agentReadinessDeclarationAuthoritySchema: z.ZodEnum<{
    community_declared: "community_declared";
    entity_attested: "entity_attested";
}>;
export declare const agentReadinessDeclarationStateSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    status: z.ZodLiteral<"none">;
}, z.core.$strict>, z.ZodObject<{
    declaration_id: z.ZodString;
    provenance: z.ZodObject<{
        repository: z.ZodLiteral<"sourcey/agent-ready-services">;
        commit: z.ZodString;
        path: z.ZodString;
        git_blob_oid: z.ZodString;
        blob_digest: z.ZodString;
    }, z.core.$strict>;
    status: z.ZodEnum<{
        community_declared: "community_declared";
        entity_attested: "entity_attested";
    }>;
}, z.core.$strict>], "status">;
//# sourceMappingURL=declaration-reference.d.ts.map