import { z } from "zod";
import { agentReadinessDeclarationDraftRequestSchema } from "../../agent-readiness/src/index.js";
import { assetMediaTypeSchema, ENTITY_ICON_MAX_SOURCE_BYTES, entityAssetUploadHeadersSchema, } from "../../assets/src/index.js";
import { commercialOrderIdSchema } from "../../billing/src/index.js";
import { catalogAdmissionConflictLookupRequestSchema } from "../../catalog-verifier/src/index.js";
import { changeFeedPageSchema } from "../../feed/src/index.js";
import { startupCreditsExistingRecordReviewPreparationRequestSchema, startupCreditsExistingRecordReviewPreparationResponseSchema, startupCreditsGitPullRequestReviewPreparationRequestSchema, startupCreditsGitPullRequestReviewPreparationResponseSchema, startupCreditsPullRequestQuerySchema, startupCreditsPullRequestStatusResponseSchema, startupCreditsReviewProductDescriptor, startupCreditsReviewRequestIdSchema, startupCreditsReviewRequestSchema, startupCreditsReviewResponseSchema, } from "../../startup-credits-commercial/src/index.js";
import { agentReadinessOfferRelationListResponseSchema, agentReadinessOfferRelationResponseSchema, agentReadinessProfileListResponseSchema, agentReadinessProfileResponseSchema, catalogApiErrorResponseSchema, catalogClosureRequestSchema, catalogClosureResponseSchema, catalogReleaseReadSchema, catalogReleaseSummarySchema, catalogResponseSchema, catalogSitemapChangeListResponseSchema, catalogSitemapEntryListResponseSchema, catalogSitemapShardListResponseSchema, catalogStatusResponseSchema, catalogTaxonomyResponseSchema, catalogVerifierIdentityContextResponseSchema, eligibilityCheckInputSchema, eligibilityResponseSchema, eligibilityStructureStatisticResponseSchema, entityAgentReadinessProfilesResponseSchema, entityAssetListResponseSchema, entityListResponseSchema, entityResponseSchema, eventListResponseSchema, eventResponseSchema, observationResponseSchema, offerAgentReadinessProfilesResponseSchema, offerResponseSchema, policyListResponseSchema, policyResponseSchema, programResponseSchema, provenanceResponseSchema, revisionResponseSchema, searchEntitiesResponseSchema, searchOffersResponseSchema, } from "./read.js";
import { agentReadinessOfferRelationListQuerySchema, agentReadinessProfileListQuerySchema, commonErrors, entityAgentReadinessScopePath, entityAssetListQuery, entityIdPath, entityListQuery, entityOfferPath, entityProgramPath, entitySlugPath, eventListQuery, idPath, pageQuery, publicDatasetEndpoints, query, releaseIdPath, sitemapPageQuery, sitemapShardPath, } from "./routes.js";
import { agentReadinessDeclarationBytesResponseSchema, agentReadinessDeclarationDraftResponseSchema, catalogSubmissionHeadersSchema, entityAssetUploadResponseSchema, submissionId, submissionRequestSchema, submissionResponseSchema, } from "./submissions.js";
import { agentReadinessProfileId, digest, identifier, offerId, slug } from "./values.js";
const submissionIdPath = z.object({ submission_id: submissionId }).strict();
/**
 * The complete public Sourcey HTTP API surface for major version 1.
 *
 * Hosted account, claim, operator, and provider routes are intentionally owned
 * by Cloud capability contracts and must never be appended to this registry.
 */
export const publicCatalogV1Endpoints = [
    {
        operationId: "getCatalogStatus",
        method: "GET",
        path: "/v1/status",
        summary: "Read serving status and the exact catalog release pin.",
        tags: ["Catalog"],
        responses: { 200: catalogStatusResponseSchema },
    },
    {
        operationId: "getCatalogRelease",
        method: "GET",
        path: "/v1/release",
        summary: "Read the immutable catalog release descriptor.",
        tags: ["Catalog"],
        responses: { 200: catalogReleaseReadSchema },
    },
    {
        operationId: "getCatalogReleaseById",
        method: "GET",
        path: "/v1/releases/{release_id}",
        summary: "Read an immutable retained catalog release.",
        tags: ["Catalog"],
        request: { path: releaseIdPath },
        responses: { 200: catalogReleaseSummarySchema, ...commonErrors },
    },
    {
        operationId: "getCatalog",
        method: "GET",
        path: "/v1/catalog",
        summary: "Read the complete canonical catalog artifact.",
        tags: ["Catalog"],
        responses: { 200: catalogResponseSchema },
    },
    {
        operationId: "getCatalogTaxonomy",
        method: "GET",
        path: "/v1/taxonomy",
        summary: "Read the exact current Catalog taxonomy.",
        tags: ["Catalog"],
        responses: { 200: catalogTaxonomyResponseSchema },
    },
    {
        operationId: "listCatalogSitemapShards",
        method: "GET",
        path: "/v1/discovery/sitemap-shards",
        summary: "List the bounded non-empty shards of the current Catalog sitemap.",
        tags: ["Catalog"],
        responses: { 200: catalogSitemapShardListResponseSchema },
    },
    {
        operationId: "listCatalogSitemapEntries",
        method: "GET",
        path: "/v1/discovery/sitemap-shards/{shard}",
        summary: "List one release-bound Catalog sitemap shard.",
        tags: ["Catalog"],
        request: { path: sitemapShardPath, query: sitemapPageQuery },
        responses: { 200: catalogSitemapEntryListResponseSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "listCatalogSitemapChanges",
        method: "GET",
        path: "/v1/discovery/sitemap-changes",
        summary: "List changed Catalog sitemap paths for the current release.",
        tags: ["Catalog"],
        request: { query: sitemapPageQuery },
        responses: { 200: catalogSitemapChangeListResponseSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "getActiveOfferEligibilityStructure",
        method: "GET",
        path: "/v1/statistics/active-offer-eligibility-structure",
        summary: "Read the release-bound active Offer eligibility-structure statistic.",
        tags: ["Catalog"],
        responses: { 200: eligibilityStructureStatisticResponseSchema },
    },
    {
        operationId: "listEntities",
        method: "GET",
        path: "/v1/entities",
        summary: "List catalog entities.",
        tags: ["Catalog"],
        request: { query: entityListQuery },
        responses: { 200: entityListResponseSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "listPolicies",
        method: "GET",
        path: "/v1/policies",
        summary: "List current Sourcey policy records, with their exact text and revision digests.",
        tags: ["Catalog"],
        request: { query: pageQuery },
        responses: { 200: policyListResponseSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "getPolicy",
        method: "GET",
        path: "/v1/policies/{slug}",
        summary: "Read one current Sourcey policy record by slug.",
        tags: ["Catalog"],
        request: { path: z.object({ slug }).strict() },
        responses: { 200: policyResponseSchema, ...commonErrors },
    },
    {
        operationId: "getEntity",
        method: "GET",
        path: "/v1/entities/{entity}",
        summary: "Read an entity by immutable ID.",
        tags: ["Catalog"],
        request: { path: entityIdPath },
        responses: { 200: entityResponseSchema, ...commonErrors },
    },
    {
        operationId: "getEntityBySlug",
        method: "GET",
        path: "/v1/entities/by-slug/{entity}",
        summary: "Read an entity through its current or historical slug.",
        tags: ["Catalog"],
        request: { path: entitySlugPath },
        responses: { 200: entityResponseSchema, ...commonErrors },
    },
    {
        operationId: "listEntityAssets",
        method: "GET",
        path: "/v1/entity-assets",
        summary: "List exact current Entity icon bindings and immutable derivative paths.",
        tags: ["Catalog"],
        request: { query: entityAssetListQuery },
        responses: { 200: entityAssetListResponseSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "listEntityAgentReadinessProfiles",
        method: "GET",
        path: "/v1/entities/{entity}/agent-readiness-profiles",
        summary: "List published agent readiness profiles for an entity.",
        tags: ["Catalog"],
        request: { path: entityIdPath, query: pageQuery },
        responses: { 200: entityAgentReadinessProfilesResponseSchema, ...commonErrors },
    },
    {
        operationId: "getEntityAgentReadinessProfile",
        method: "GET",
        path: "/v1/entities/{entity}/agent-readiness-profiles/{product}/{job}",
        summary: "Resolve a published agent readiness profile by immutable entity and exact scope keys.",
        tags: ["Catalog"],
        request: { path: entityAgentReadinessScopePath },
        responses: { 200: agentReadinessProfileResponseSchema, ...commonErrors },
    },
    {
        operationId: "getProgram",
        method: "GET",
        path: "/v1/programs/{id}",
        summary: "Read a program by immutable ID.",
        tags: ["Catalog"],
        request: { path: idPath },
        responses: { 200: programResponseSchema, ...commonErrors },
    },
    {
        operationId: "getProgramBySlug",
        method: "GET",
        path: "/v1/programs/{entity}/{program}",
        summary: "Read a program by entity and program slug.",
        tags: ["Catalog"],
        request: { path: entityProgramPath },
        responses: { 200: programResponseSchema, ...commonErrors },
    },
    {
        operationId: "getOffer",
        method: "GET",
        path: "/v1/offers/{id}",
        summary: "Read an offer by immutable ID.",
        tags: ["Catalog"],
        request: { path: idPath },
        responses: { 200: offerResponseSchema, ...commonErrors },
    },
    {
        operationId: "getOfferBySlug",
        method: "GET",
        path: "/v1/offers/{entity}/{offer}",
        summary: "Read an offer by entity and offer slug.",
        tags: ["Catalog"],
        request: { path: entityOfferPath },
        responses: { 200: offerResponseSchema, ...commonErrors },
    },
    {
        operationId: "searchCatalog",
        method: "GET",
        path: "/v1/search",
        summary: "Search the catalog.",
        tags: ["Catalog"],
        request: { query },
        responses: { 200: searchEntitiesResponseSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "searchOffers",
        method: "GET",
        path: "/v1/search/offers",
        summary: "Search offers through the catalog index.",
        tags: ["Catalog"],
        request: { query },
        responses: { 200: searchOffersResponseSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "checkEligibility",
        method: "POST",
        path: "/v1/eligibility/check",
        summary: "Evaluate structured eligibility by immutable offer ID.",
        tags: ["Catalog"],
        request: { body: eligibilityCheckInputSchema },
        responses: {
            200: eligibilityResponseSchema,
            ...commonErrors,
        },
    },
    {
        operationId: "getProvenance",
        method: "GET",
        path: "/v1/provenance/{id}",
        summary: "Read the closed provenance graph for a revision.",
        tags: ["Catalog"],
        request: { path: idPath },
        responses: { 200: provenanceResponseSchema, ...commonErrors },
    },
    {
        operationId: "getRevisionProvenance",
        method: "GET",
        path: "/v1/revisions/{id}/provenance",
        summary: "Read provenance through a revision-scoped route.",
        tags: ["Catalog"],
        request: { path: idPath },
        responses: { 200: provenanceResponseSchema, ...commonErrors },
    },
    {
        operationId: "getRevision",
        method: "GET",
        path: "/v1/revisions/{id}",
        summary: "Read an immutable entity, program, offer, or agent readiness revision.",
        tags: ["Catalog"],
        request: { path: idPath },
        responses: { 200: revisionResponseSchema, ...commonErrors },
    },
    {
        operationId: "listEvents",
        method: "GET",
        path: "/v1/events",
        summary: "Find catalog events by exact operation, company or revision identity.",
        tags: ["Catalog"],
        request: { query: eventListQuery },
        responses: { 200: eventListResponseSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "getEvent",
        method: "GET",
        path: "/v1/events/{id}",
        summary: "Read an immutable catalog event.",
        tags: ["Catalog"],
        request: { path: idPath },
        responses: { 200: eventResponseSchema, ...commonErrors },
    },
    {
        operationId: "getObservation",
        method: "GET",
        path: "/v1/observations/{id}",
        summary: "Read an immutable source observation.",
        tags: ["Catalog"],
        request: { path: idPath },
        responses: { 200: observationResponseSchema, ...commonErrors },
    },
    {
        operationId: "resolveCatalogClosure",
        method: "POST",
        path: "/v1/catalog/closure",
        summary: "Resolve the existing catalog objects relevant to a bounded mutation.",
        tags: ["Catalog"],
        request: { body: catalogClosureRequestSchema },
        responses: { 200: catalogClosureResponseSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "getChanges",
        method: "GET",
        path: "/v1/changes",
        summary: "Read deterministic release changes using a signed cursor.",
        tags: ["Catalog"],
        request: {
            query: z.object({ cursor: z.string().min(1).optional() }).strict(),
        },
        responses: { 200: changeFeedPageSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "listAgentReadinessProfiles",
        method: "GET",
        path: "/v1/agent-readiness-profiles",
        summary: "Search and filter published agent readiness profiles.",
        tags: ["Catalog"],
        request: { query: agentReadinessProfileListQuerySchema },
        responses: { 200: agentReadinessProfileListResponseSchema, 400: catalogApiErrorResponseSchema },
    },
    {
        operationId: "getAgentReadinessProfile",
        method: "GET",
        path: "/v1/agent-readiness-profiles/{id}",
        summary: "Read a published agent readiness profile by immutable ID.",
        tags: ["Catalog"],
        request: { path: z.object({ id: agentReadinessProfileId }).strict() },
        responses: {
            200: agentReadinessProfileResponseSchema,
            ...commonErrors,
        },
    },
    {
        operationId: "listAgentReadinessOfferRelations",
        method: "GET",
        path: "/v1/agent-readiness-offer-relations",
        summary: "List exact released relations between agent readiness profiles and Offers.",
        tags: ["Catalog"],
        request: { query: agentReadinessOfferRelationListQuerySchema },
        responses: {
            200: agentReadinessOfferRelationListResponseSchema,
            400: catalogApiErrorResponseSchema,
        },
    },
    {
        operationId: "getAgentReadinessOfferRelation",
        method: "GET",
        path: "/v1/agent-readiness-offer-relations/{id}",
        summary: "Read an exact released Agent Readiness Offer relation by immutable identity.",
        tags: ["Catalog"],
        request: { path: z.object({ id: identifier }).strict() },
        responses: { 200: agentReadinessOfferRelationResponseSchema, ...commonErrors },
    },
    {
        operationId: "listOfferAgentReadinessProfiles",
        method: "GET",
        path: "/v1/agent-readiness-profiles/by-offer/{offer}",
        summary: "List published Agent Readiness profiles through exact released Offer relations.",
        tags: ["Catalog"],
        request: { path: z.object({ offer: offerId }).strict(), query: pageQuery },
        responses: { 200: offerAgentReadinessProfilesResponseSchema, ...commonErrors },
    },
];
/** Hosted mutation operations share the v1 OpenAPI authority but are not read-runtime routes. */
export const catalogSubmissionV1Endpoints = [
    {
        operationId: "uploadEntityAsset",
        method: "POST",
        path: "/v1/submission-asset-uploads",
        summary: "Retain exact authenticated company-icon bytes and return a digest-bound upload receipt for a Catalog submission.",
        tags: ["Catalog"],
        auth: "cookie_or_bearer",
        request: {
            headers: entityAssetUploadHeadersSchema,
            binary_body: {
                media_types: assetMediaTypeSchema.options,
                maximum_bytes: ENTITY_ICON_MAX_SOURCE_BYTES,
            },
        },
        responses: {
            201: entityAssetUploadResponseSchema,
            400: catalogApiErrorResponseSchema,
            401: catalogApiErrorResponseSchema,
            403: catalogApiErrorResponseSchema,
            409: catalogApiErrorResponseSchema,
        },
    },
    {
        operationId: "createCatalogSubmission",
        method: "POST",
        path: "/v1/submissions",
        summary: "Submit a Catalog record change or an Agent Readiness declaration through the one authenticated submission transport.",
        tags: ["Catalog"],
        auth: "cookie_or_bearer",
        request: {
            headers: catalogSubmissionHeadersSchema,
            body: submissionRequestSchema,
        },
        responses: {
            202: submissionResponseSchema,
            400: catalogApiErrorResponseSchema,
            401: catalogApiErrorResponseSchema,
            403: catalogApiErrorResponseSchema,
            409: catalogApiErrorResponseSchema,
        },
    },
    {
        operationId: "getCatalogSubmission",
        method: "GET",
        path: "/v1/submissions/{submission_id}",
        summary: "Read aggregate validation, admission, and publication state for a submission.",
        tags: ["Catalog"],
        auth: "cookie_or_bearer",
        request: { path: submissionIdPath },
        responses: {
            200: submissionResponseSchema,
            400: catalogApiErrorResponseSchema,
            401: catalogApiErrorResponseSchema,
            403: catalogApiErrorResponseSchema,
            404: catalogApiErrorResponseSchema,
        },
    },
];
/** Pure public authoring command; Cloud hosts transport, not semantics or admission. */
export const agentReadinessDeclarationDraftV1Endpoints = [
    {
        operationId: "prepareAgentReadinessDeclaration",
        method: "POST",
        path: "/v1/agent-readiness/declaration-drafts",
        summary: "Prepare canonical Agent Readiness service, API, authentication, payment, operation, recovery and agent-standard declaration YAML for an existing Sourcey company, to submit through POST /v1/submissions. Drafts publish no facts or grades.",
        tags: ["Catalog"],
        request: { body: agentReadinessDeclarationDraftRequestSchema },
        responses: {
            200: agentReadinessDeclarationDraftResponseSchema,
            400: catalogApiErrorResponseSchema,
            401: catalogApiErrorResponseSchema,
            403: catalogApiErrorResponseSchema,
        },
    },
];
/** Hosted declaration bytes, public once a published profile cites them. */
export const agentReadinessHostedDeclarationV1Endpoints = [
    {
        operationId: "getAgentReadinessDeclaration",
        method: "GET",
        path: "/v1/agent-readiness/declarations/{blob_digest}",
        summary: "Read the exact authoring bytes a published Agent Readiness profile cites for a declaration submitted without Git.",
        tags: ["Catalog"],
        request: { path: z.object({ blob_digest: digest }).strict() },
        responses: {
            200: agentReadinessDeclarationBytesResponseSchema,
            400: catalogApiErrorResponseSchema,
            404: catalogApiErrorResponseSchema,
        },
    },
];
/** Signed bounded identity projection; Cloud owns transport and signing custody. */
export const catalogVerifierV1Endpoints = [
    {
        operationId: "createCatalogVerifierIdentityContext",
        method: "POST",
        path: "/v1/catalog-verifier/identity-contexts",
        summary: "Issue a bounded signed live-Catalog identity context for an exact verifier query.",
        tags: ["Catalog"],
        request: { body: catalogAdmissionConflictLookupRequestSchema },
        responses: {
            200: catalogVerifierIdentityContextResponseSchema,
            400: catalogApiErrorResponseSchema,
            405: catalogApiErrorResponseSchema,
            409: catalogApiErrorResponseSchema,
            429: catalogApiErrorResponseSchema,
            503: catalogApiErrorResponseSchema,
        },
    },
];
/** One product-semantic commercial operation; payment never changes Catalog authority. */
export const startupCreditsReviewV1Endpoints = [
    {
        operationId: "prepareStartupCreditsExistingRecordReview",
        method: "POST",
        path: "/v1/startup-credits/review-preparations",
        summary: "Prepare current Human verification terms and exact assurance work for one published startup Offer.",
        tags: ["Catalog"],
        request: { body: startupCreditsExistingRecordReviewPreparationRequestSchema },
        responses: {
            200: startupCreditsExistingRecordReviewPreparationResponseSchema,
            400: catalogApiErrorResponseSchema,
            409: catalogApiErrorResponseSchema,
            503: catalogApiErrorResponseSchema,
        },
    },
    {
        operationId: "prepareStartupCreditsPullRequestReview",
        method: "POST",
        path: "/v1/startup-credits/pull-request-review-preparations",
        summary: "Prepare Human verification for the company a held pull request adds, at its exact current head.",
        tags: ["Catalog"],
        request: { body: startupCreditsGitPullRequestReviewPreparationRequestSchema },
        responses: {
            200: startupCreditsGitPullRequestReviewPreparationResponseSchema,
            400: catalogApiErrorResponseSchema,
            409: catalogApiErrorResponseSchema,
            503: catalogApiErrorResponseSchema,
        },
    },
    {
        operationId: "getStartupCreditsPullRequest",
        method: "GET",
        path: "/v1/startup-credits/pull-requests",
        summary: "Read where one Startup Credits pull request stands: its checks, and its company verification.",
        tags: ["Catalog"],
        request: { query: startupCreditsPullRequestQuerySchema },
        responses: {
            200: startupCreditsPullRequestStatusResponseSchema,
            400: catalogApiErrorResponseSchema,
            404: catalogApiErrorResponseSchema,
            503: catalogApiErrorResponseSchema,
        },
    },
    {
        operationId: "getStartupCreditsReviewPaymentRequirements",
        method: "GET",
        path: "/v1/startup-credits/reviews",
        summary: "Read effect-free x402 payment requirements for Sourcey Human Verification.",
        tags: ["Catalog"],
        responses: {},
        x402Discovery: startupCreditsReviewProductDescriptor,
    },
    {
        operationId: "createStartupCreditsReview",
        method: "POST",
        path: "/v1/startup-credits/reviews",
        summary: "Start Human verification for one startup credit or startup program.",
        tags: ["Catalog"],
        request: {
            headers: z
                .object({ "payment-signature": z.string().trim().min(1).max(65_536).optional() })
                .passthrough(),
            body: startupCreditsReviewRequestSchema,
        },
        responses: {
            202: startupCreditsReviewResponseSchema,
            400: catalogApiErrorResponseSchema,
            401: catalogApiErrorResponseSchema,
            409: catalogApiErrorResponseSchema,
            503: catalogApiErrorResponseSchema,
        },
        payable: startupCreditsReviewProductDescriptor,
    },
    {
        operationId: "getStartupCreditsReview",
        method: "GET",
        path: "/v1/startup-credits/reviews/{request_id}",
        summary: "Read the durable status of one exact Human verification request.",
        tags: ["Catalog"],
        request: {
            path: z.object({ request_id: startupCreditsReviewRequestIdSchema }).strict(),
            headers: z
                .object({ "payment-signature": z.string().trim().min(1).max(65_536).optional() })
                .passthrough(),
        },
        responses: {
            200: startupCreditsReviewResponseSchema,
            400: catalogApiErrorResponseSchema,
            401: catalogApiErrorResponseSchema,
            404: catalogApiErrorResponseSchema,
        },
    },
    {
        operationId: "getStartupCreditsReviewByOrder",
        method: "GET",
        path: "/v1/startup-credits/reviews/orders/{order_id}",
        summary: "Recover one Human verification from its Stripe order.",
        tags: ["Catalog"],
        request: {
            path: z.object({ order_id: commercialOrderIdSchema }).strict(),
        },
        responses: {
            200: startupCreditsReviewResponseSchema,
            400: catalogApiErrorResponseSchema,
            401: catalogApiErrorResponseSchema,
            404: catalogApiErrorResponseSchema,
        },
    },
];
export const catalogOpenApiV1Endpoints = [
    ...publicCatalogV1Endpoints,
    ...catalogSubmissionV1Endpoints,
    ...agentReadinessDeclarationDraftV1Endpoints,
    ...agentReadinessHostedDeclarationV1Endpoints,
    ...catalogVerifierV1Endpoints,
    ...startupCreditsReviewV1Endpoints,
    ...publicDatasetEndpoints,
];
export const publicCatalogV1BoundaryErrors = {
    401: catalogApiErrorResponseSchema,
    403: catalogApiErrorResponseSchema,
    405: catalogApiErrorResponseSchema,
    429: catalogApiErrorResponseSchema,
    500: catalogApiErrorResponseSchema,
    503: catalogApiErrorResponseSchema,
};
const catalogOpenApiEndpointIndex = new Map(catalogOpenApiV1Endpoints.map((endpoint) => [endpoint.operationId, endpoint]));
const publicCatalogReadOperationIds = new Set([...publicCatalogV1Endpoints, ...publicDatasetEndpoints]
    .filter(({ method }) => method === "GET")
    .map(({ operationId }) => operationId));
const catalogOpenApiPathMatchers = catalogOpenApiV1Endpoints.map((endpoint) => ({
    endpoint,
    pattern: new RegExp(`^${endpoint.path
        .split("/")
        .map((segment) => segment.startsWith("{") && segment.endsWith("}")
        ? "[^/]+"
        : segment.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&"))
        .join("/")}$`, "u"),
}));
/** Resolve one HTTP operation from the canonical registry. */
function catalogOpenApiEndpoint(operationId) {
    const endpoint = catalogOpenApiEndpointIndex.get(operationId);
    if (!endpoint)
        throw new Error(`Unknown Sourcey API operation: ${operationId}`);
    return endpoint;
}
/**
 * Build an exact API path from the canonical route template. Path parameter
 * names and escaping remain owned by the API registry rather than consumers.
 */
export function catalogOpenApiPath(operationId, parameters = {}) {
    const endpoint = catalogOpenApiEndpoint(operationId);
    const required = [...endpoint.path.matchAll(/\{([^}]+)\}/gu)].map((match) => match[1]);
    if (required.some((name) => name === undefined || parameters[name] === undefined) ||
        Object.keys(parameters).some((name) => !required.includes(name))) {
        throw new Error(`Path parameters do not match Sourcey API operation ${operationId}.`);
    }
    return endpoint.path.replace(/\{([^}]+)\}/gu, (_placeholder, name) => encodeURIComponent(parameters[name]));
}
/** Match a concrete request path to its stable operation identity. */
export function matchCatalogOpenApiEndpoint(method, pathname) {
    const normalizedMethod = method.toUpperCase() === "HEAD" ? "GET" : method.toUpperCase();
    return (catalogOpenApiPathMatchers.find(({ endpoint, pattern }) => endpoint.method === normalizedMethod && pattern.test(pathname))?.endpoint ?? null);
}
/**
 * Decide whether one matched operation is an anonymous public read. Consumers
 * use this semantic boundary instead of rebuilding public-route allowlists.
 */
export function isPublicCatalogReadOperation(operationId) {
    return publicCatalogReadOperationIds.has(operationId);
}
//# sourceMappingURL=endpoints.js.map