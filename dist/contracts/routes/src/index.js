import { DIGEST_PATTERN, SLUG_PATTERN } from "provenry/primitives";
import { z } from "zod";
import { ENTITY_ID_PATTERN, OFFER_ID_PATTERN, PROGRAM_ID_PATTERN, } from "../../../modules/catalog-primitives/src/index.js";
import { lifecycleStatusSchema } from "../../revisions/src/index.js";
const digest = z.string().regex(DIGEST_PATTERN);
const entityId = z.string().regex(ENTITY_ID_PATTERN);
const programId = z.string().regex(PROGRAM_ID_PATTERN);
const offerId = z.string().regex(OFFER_ID_PATTERN);
const publicRouteSlugSchema = z.string().regex(SLUG_PATTERN, "Invalid route slug");
const entityCanonicalPathInputSchema = z
    .object({
    entity_slug: publicRouteSlugSchema,
})
    .strict();
const programCanonicalPathInputSchema = z
    .object({
    entity_slug: publicRouteSlugSchema,
    program_slug: publicRouteSlugSchema,
})
    .strict();
export const offerCanonicalPathInputSchema = z
    .object({
    entity_slug: publicRouteSlugSchema,
    offer_slug: publicRouteSlugSchema,
})
    .strict();
const agentReadinessCanonicalPathInputSchema = z
    .object({
    entity_slug: publicRouteSlugSchema,
    product_key: publicRouteSlugSchema,
    job_key: publicRouteSlugSchema,
})
    .strict();
const entityIconCurrentPathInputSchema = z.object({ entity_id: entityId }).strict();
const pullRequestJourneySchema = z
    .object({
    repository: z.string().regex(/^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/u),
    pull_request_number: z.number().int().min(1).max(Number.MAX_SAFE_INTEGER),
    head_sha: z
        .string()
        .regex(/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u)
        .nullable(),
})
    .strict();
export function catalogCanonicalPath() {
    return "/companies";
}
export function companiesJsonCanonicalPath() {
    return "/companies.json";
}
export function startupCreditsJsonCanonicalPath() {
    return "/startup-credits.json";
}
export function agentReadinessJsonCanonicalPath() {
    return "/agent-readiness.json";
}
/** Canonical namespace for an individual company and every record it owns. */
export function entityRecordCanonicalRootPath() {
    return "/c";
}
export function policyCanonicalPath(slug) {
    return `/policies/${publicRouteSlugSchema.parse(slug)}`;
}
/** Retained namespaces resolve historical route rows without rewriting history. */
export const catalogRecordNamespaceRelocations = [
    { from: "/log", to: entityRecordCanonicalRootPath() },
    { from: "/catalog", to: entityRecordCanonicalRootPath() },
];
/** Permanent public URL moves, not aliases for a second record surface. */
export const catalogRecordRedirects = [
    {
        kind: "exact",
        path: "/log.json",
        canonical_target: startupCreditsJsonCanonicalPath(),
        action: "301",
    },
    {
        kind: "exact",
        path: "/catalog.json",
        canonical_target: startupCreditsJsonCanonicalPath(),
        action: "301",
    },
    { kind: "exact", path: "/catalog", canonical_target: catalogCanonicalPath(), action: "301" },
    { kind: "exact", path: "/catalog/", canonical_target: catalogCanonicalPath(), action: "301" },
    {
        kind: "exact",
        path: "/log",
        canonical_target: catalogCanonicalPath(),
        action: "301",
    },
    {
        kind: "exact",
        path: "/log/",
        canonical_target: catalogCanonicalPath(),
        action: "301",
    },
    ...catalogRecordNamespaceRelocations.flatMap(({ from, to }) => [
        {
            kind: "pattern",
            path: `${from}/*/`,
            canonical_target: `${to}/:splat`,
            action: "301",
        },
        {
            kind: "pattern",
            path: `${from}/*`,
            canonical_target: `${to}/:splat`,
            action: "301",
        },
    ]),
];
export function currentCatalogRecordPath(path) {
    for (const move of catalogRecordNamespaceRelocations) {
        if (path.length > move.from.length + 1 && path.startsWith(`${move.from}/`)) {
            return `${move.to}${path.slice(move.from.length)}`;
        }
    }
    return path;
}
export function entityCanonicalPath(input) {
    const parsed = entityCanonicalPathInputSchema.parse(input);
    return `${entityRecordCanonicalRootPath()}/${parsed.entity_slug}`;
}
export function parseEntityCanonicalPath(path) {
    const current = currentCatalogRecordPath(path).replace(/\/$/u, "");
    const prefix = `${entityRecordCanonicalRootPath()}/`;
    if (!current.startsWith(prefix))
        return null;
    const slug = publicRouteSlugSchema.safeParse(current.slice(prefix.length));
    return slug.success ? { entity_slug: slug.data } : null;
}
export function programCanonicalPath(input) {
    const parsed = programCanonicalPathInputSchema.parse(input);
    return `${entityCanonicalPath({ entity_slug: parsed.entity_slug })}/programs/${parsed.program_slug}`;
}
export function offerCanonicalPath(input) {
    const parsed = offerCanonicalPathInputSchema.parse(input);
    return `${entityCanonicalPath({ entity_slug: parsed.entity_slug })}/offers/${parsed.offer_slug}`;
}
/** Resolve a current or retained Offer path without duplicating its namespace in consumers. */
export function parseOfferCanonicalPath(path) {
    const current = currentCatalogRecordPath(path).replace(/\/$/u, "");
    const prefix = `${entityRecordCanonicalRootPath()}/`;
    if (!current.startsWith(prefix))
        return null;
    const segments = current.slice(prefix.length).split("/");
    if (segments.length !== 3 || segments[1] !== "offers")
        return null;
    const parsed = offerCanonicalPathInputSchema.safeParse({
        entity_slug: segments[0],
        offer_slug: segments[2],
    });
    return parsed.success ? parsed.data : null;
}
export function agentReadinessCanonicalPath(input) {
    const parsed = agentReadinessCanonicalPathInputSchema.parse(input);
    return `${entityCanonicalPath({ entity_slug: parsed.entity_slug })}/agent-readiness/${parsed.product_key}/${parsed.job_key}`;
}
/**
 * Stable public delivery route for the current icon binding. The transport
 * redirects this path to the binding's immutable digest URL, so static pages
 * never need rebuilding when only an adjacent icon changes.
 */
export function entityIconCurrentPath(input) {
    const parsed = entityIconCurrentPathInputSchema.parse(input);
    return `/assets/entities/${parsed.entity_id}/icon`;
}
export function parseEntityIconCurrentPath(path) {
    const match = /^\/assets\/entities\/([^/]+)\/icon$/u.exec(path);
    if (!match?.[1])
        return null;
    const parsed = entityIconCurrentPathInputSchema.safeParse({ entity_id: match[1] });
    return parsed.success ? parsed.data : null;
}
/**
 * Sourcey's page for a data repository's pull request, from its check to its result. A link from
 * the pull request's own check or notice names the head it was made for; one from a checkout or
 * an account may not.
 */
export function pullRequestJourneyPath(input) {
    if (!input)
        return "/submit/pull-request";
    const parsed = pullRequestJourneySchema.parse({ ...input, head_sha: input.head_sha ?? null });
    // Every character the schema admits stands for itself in a query, so the link is written with no
    // escapes and reads back exactly as written wherever it is stored, as a GitHub check's link is.
    const head = parsed.head_sha ? `&head=${parsed.head_sha}` : "";
    return `${pullRequestJourneyPath()}?repository=${parsed.repository}&pull=${parsed.pull_request_number}${head}`;
}
/** The pull request a journey link names, or null when it does not name one exactly. */
export function parsePullRequestJourneyQuery(search) {
    const pull = search.get("pull") ?? "";
    if (!/^[1-9][0-9]{0,15}$/u.test(pull))
        return null;
    const parsed = pullRequestJourneySchema.safeParse({
        repository: search.get("repository") ?? "",
        pull_request_number: Number(pull),
        head_sha: search.get("head"),
    });
    return parsed.success ? parsed.data : null;
}
export function jsonTwinPath(canonicalPath) {
    if (!canonicalPath.startsWith("/") || canonicalPath.endsWith(".json")) {
        throw new Error(`Invalid canonical path for a JSON twin: ${canonicalPath}`);
    }
    return `${canonicalPath}.json`;
}
export const routeEntrySchema = z
    .object({
    kind: z.enum(["entity", "program", "offer", "tombstone"]),
    entity_id: entityId,
    program_id: programId.optional(),
    offer_id: offerId.optional(),
    revision_digest: digest.optional(),
    canonical: z.boolean(),
    canonical_route: z.string().startsWith("/"),
    lifecycle: lifecycleStatusSchema.optional(),
    tombstone_reason: z.string().optional(),
})
    .strict()
    .superRefine((entry, context) => {
    const reject = (path, message) => context.addIssue({ code: "custom", path: [path], message });
    if (entry.kind === "entity") {
        if (!entry.revision_digest)
            reject("revision_digest", "Entity routes require a revision.");
        if (entry.program_id)
            reject("program_id", "Entity routes cannot name a Program.");
        if (entry.offer_id)
            reject("offer_id", "Entity routes cannot name an Offer.");
        if (entry.lifecycle)
            reject("lifecycle", "Entity routes have no Offer lifecycle.");
        if (entry.tombstone_reason) {
            reject("tombstone_reason", "Active Entity routes cannot be tombstones.");
        }
        return;
    }
    if (entry.kind === "program") {
        if (!entry.program_id)
            reject("program_id", "Program routes require a Program.");
        if (!entry.revision_digest)
            reject("revision_digest", "Program routes require a revision.");
        if (entry.offer_id)
            reject("offer_id", "Program routes cannot name an Offer.");
        if (entry.lifecycle)
            reject("lifecycle", "Program routes have no Offer lifecycle.");
        if (entry.tombstone_reason) {
            reject("tombstone_reason", "Active Program routes cannot be tombstones.");
        }
        return;
    }
    if (entry.kind === "offer") {
        if (!entry.offer_id)
            reject("offer_id", "Offer routes require an Offer.");
        if (!entry.revision_digest)
            reject("revision_digest", "Offer routes require a revision.");
        if (!entry.lifecycle)
            reject("lifecycle", "Offer routes require their lifecycle.");
        if (entry.tombstone_reason) {
            reject("tombstone_reason", "Active Offer routes cannot be tombstones.");
        }
        return;
    }
    if (entry.canonical)
        reject("canonical", "Tombstone routes cannot be canonical.");
    if (entry.revision_digest) {
        reject("revision_digest", "Tombstone routes cannot claim a current revision.");
    }
    if (entry.lifecycle)
        reject("lifecycle", "Tombstone routes have no current lifecycle.");
    if (!entry.tombstone_reason) {
        reject("tombstone_reason", "Tombstone routes require a reason.");
        return;
    }
    const expectedHierarchy = entry.tombstone_reason === "offer-retired"
        ? Boolean(entry.offer_id)
        : entry.tombstone_reason === "program-retired"
            ? Boolean(entry.program_id && !entry.offer_id)
            : entry.tombstone_reason === "entity-retired"
                ? !entry.program_id && !entry.offer_id
                : false;
    if (!expectedHierarchy) {
        reject("tombstone_reason", "Tombstone reason must match its Entity, optional Program, and Offer identity.");
    }
});
export const routeIndexSchema = z
    .object({
    route_contract: z.literal("sourcey.catalog-routes/v1alpha1"),
    routes: z.record(z.string(), routeEntrySchema),
})
    .strict();
//# sourceMappingURL=index.js.map