import { z } from "zod";
import { agentReadinessDigestSchema, agentReadinessIdentifierSchema } from "./shared.js";
export const AGENT_READINESS_REPOSITORY = "sourcey/agent-ready-services";
export const AGENT_READINESS_REPOSITORY_URL = "https://github.com/sourcey/agent-ready-services";
const gitObjectIdSchema = z.string().regex(/^[a-f0-9]{40,64}$/);
/**
 * An immutable declaration locator records the path at its pinned Git commit.
 * It is intentionally independent of the repository's current authoring root.
 */
export const agentReadinessRepositoryYamlPathSchema = z
    .string()
    .regex(/^(?:[a-z0-9]+(?:-[a-z0-9]+)*\/)+[a-z0-9]+(?:-[a-z0-9]+)*\.yaml$/);
/** The single accepted path shape for new Agent Readiness authoring. */
export const agentReadinessAuthoringPathSchema = z
    .string()
    .regex(/^entities\/[a-z0-9]{1,2}\/[a-z0-9]+(?:-[a-z0-9]+)*\.yaml$/);
export const agentReadinessDeclarationProvenanceSchema = z
    .object({
    repository: z.literal(AGENT_READINESS_REPOSITORY),
    commit: gitObjectIdSchema,
    path: agentReadinessRepositoryYamlPathSchema,
    git_blob_oid: gitObjectIdSchema,
    blob_digest: agentReadinessDigestSchema,
})
    .strict();
export const agentReadinessDeclarationReferenceSchema = z
    .object({
    declaration_id: agentReadinessIdentifierSchema,
    provenance: agentReadinessDeclarationProvenanceSchema,
})
    .strict();
export const agentReadinessDeclarationAuthoritySchema = z.enum([
    "community_declared",
    "entity_attested",
]);
export const agentReadinessDeclarationStateSchema = z.discriminatedUnion("status", [
    z.object({ status: z.literal("none") }).strict(),
    agentReadinessDeclarationReferenceSchema
        .safeExtend({ status: agentReadinessDeclarationAuthoritySchema })
        .strict(),
]);
//# sourceMappingURL=declaration-reference.js.map