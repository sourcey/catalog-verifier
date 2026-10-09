import { z } from "zod";
import { agentReadinessEvidenceLabelSchema, agentReadinessFreshnessSchema, agentReadinessOnboardLevelSchema, agentReadinessOperateLetterSchema, agentReadinessPublicationVisibilitySchema, agentReadinessScopeKeySchema, } from "../../agent-readiness/src/index.js";
import { agentReadinessDatasetSchema, companiesDatasetSchema, startupCreditsDatasetSchema, } from "../../datasets/src/index.js";
import { lifecycleStatusSchema } from "../../revisions/src/index.js";
import { agentReadinessJsonCanonicalPath, companiesJsonCanonicalPath, startupCreditsJsonCanonicalPath, } from "../../routes/src/index.js";
import { catalogApiErrorResponseSchema, catalogSitemapShardSchema } from "./read.js";
import { agentReadinessProfileId, digest, entityId, nonEmpty, offerId, operationId, slug, } from "./values.js";
/**
 * Canonical root-level downloads over the current Catalog release.
 *
 * These belong to the public HTTP contract even though they are not members of
 * the versioned resource API. Hosted transports must import this registry
 * rather than restating paths, operation names, or response schemas.
 */
export const publicDatasetEndpointByDataset = {
    companies: {
        operationId: "getCompaniesDataset",
        method: "GET",
        path: companiesJsonCanonicalPath(),
        summary: "Download the current company records dataset.",
        tags: ["Datasets"],
        responses: { 200: companiesDatasetSchema },
    },
    startupCredits: {
        operationId: "getStartupCreditsDataset",
        method: "GET",
        path: startupCreditsJsonCanonicalPath(),
        summary: "Download the current startup credits dataset.",
        tags: ["Datasets"],
        responses: { 200: startupCreditsDatasetSchema },
    },
    agentReadiness: {
        operationId: "getAgentReadinessDataset",
        method: "GET",
        path: agentReadinessJsonCanonicalPath(),
        summary: "Download the current Agent Readiness dataset.",
        tags: ["Datasets"],
        responses: { 200: agentReadinessDatasetSchema },
    },
};
export const publicDatasetEndpoints = [
    publicDatasetEndpointByDataset.companies,
    publicDatasetEndpointByDataset.startupCredits,
    publicDatasetEndpointByDataset.agentReadiness,
];
export const idPath = z.object({ id: nonEmpty }).strict();
export const releaseIdPath = z.object({ release_id: digest }).strict();
export const sitemapShardPath = z.object({ shard: catalogSitemapShardSchema }).strict();
export const entityIdPath = z.object({ entity: entityId }).strict();
export const entitySlugPath = z.object({ entity: slug }).strict();
export const entityProgramPath = z.object({ entity: slug, program: slug }).strict();
export const entityOfferPath = z.object({ entity: slug, offer: slug }).strict();
export const entityAgentReadinessScopePath = z
    .object({
    entity: entityId,
    product: agentReadinessScopeKeySchema,
    job: agentReadinessScopeKeySchema,
})
    .strict();
export const pageQuery = z
    .object({
    cursor: z.string().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(20),
})
    .strict();
export const query = pageQuery.extend({ q: z.string().max(256).default("") });
export const entityListQuery = z
    .object({
    q: z.string().max(256).default(""),
    category: slug.optional(),
    cursor: z.string().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).optional(),
    domain: z.string().min(1).max(253).optional(),
})
    .strict();
export const entityAssetListQuery = z
    .object({
    entity_id: entityId.optional(),
    cursor: z.string().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(100),
})
    .strict();
export const agentReadinessProfileListQuerySchema = z
    .object({
    q: z.string().max(256).default(""),
    entity_id: entityId.optional(),
    offer_id: offerId.optional(),
    product_key: agentReadinessScopeKeySchema.optional(),
    job_key: agentReadinessScopeKeySchema.optional(),
    operate_letter: agentReadinessOperateLetterSchema.optional(),
    onboard_level: z.coerce.number().pipe(agentReadinessOnboardLevelSchema).optional(),
    label: agentReadinessEvidenceLabelSchema.optional(),
    visibility: agentReadinessPublicationVisibilitySchema.exclude(["private"]).optional().meta({
        description: "Publication visibility. Defaults to discoverable. Select resolvable_only to enumerate public records retained outside discovery, including stale report cards. Private candidates are never returned.",
    }),
    lifecycle: lifecycleStatusSchema.optional(),
    freshness: agentReadinessFreshnessSchema.optional(),
    cursor: z.string().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(20),
})
    .strict();
export const agentReadinessOfferRelationListQuerySchema = z
    .object({
    agent_readiness_profile_id: agentReadinessProfileId.optional(),
    offer_id: offerId.optional(),
    cursor: z.string().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(20),
})
    .strict();
export const eventListQuery = z
    .object({
    operation_id: operationId.optional(),
    entity_id: entityId.optional(),
    revision_digest: digest.optional(),
    cursor: z.string().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).optional(),
})
    .strict()
    .refine((value) => value.operation_id !== undefined ||
    value.entity_id !== undefined ||
    value.revision_digest !== undefined, { message: "An exact operation_id, entity_id or revision_digest filter is required." });
export const sitemapPageQuery = z
    .object({
    cursor: z.string().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(1_000).default(1_000),
})
    .strict();
export const commonErrors = {
    400: catalogApiErrorResponseSchema,
    404: catalogApiErrorResponseSchema,
};
//# sourceMappingURL=routes.js.map