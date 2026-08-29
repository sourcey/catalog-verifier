import { z } from "zod";
import { DIGEST_PATTERN, ENTITY_ID_PATTERN, OFFER_ID_PATTERN, PROGRAM_ID_PATTERN, SLUG_PATTERN, } from "../../../modules/primitives/src/index.js";
import { lifecycleStatusSchema } from "../../revisions/src/index.js";
import { ALLOCATED_PUBLIC_ROUTE_ROOTS } from "./public-route-allocations.generated.js";
const digest = z.string().regex(DIGEST_PATTERN);
const entityId = z.string().regex(ENTITY_ID_PATTERN);
const programId = z.string().regex(PROGRAM_ID_PATTERN);
const offerId = z.string().regex(OFFER_ID_PATTERN);
export const publicRouteSlugSchema = z.string().regex(SLUG_PATTERN, "Invalid route slug");
export const entityCanonicalPathInputSchema = z
    .object({
    entity_slug: publicRouteSlugSchema,
})
    .strict();
export const programCanonicalPathInputSchema = z
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
export const agentReadinessCanonicalPathInputSchema = z
    .object({
    entity_slug: publicRouteSlugSchema,
    product_key: publicRouteSlugSchema,
    funnel_key: publicRouteSlugSchema,
})
    .strict();
export const entityIconCurrentPathInputSchema = z.object({ entity_id: entityId }).strict();
export function entityCanonicalPath(input) {
    const parsed = entityCanonicalPathInputSchema.parse(input);
    return `/catalog/${parsed.entity_slug}`;
}
export function programCanonicalPath(input) {
    const parsed = programCanonicalPathInputSchema.parse(input);
    return `/catalog/${parsed.entity_slug}/programs/${parsed.program_slug}`;
}
export function offerCanonicalPath(input) {
    const parsed = offerCanonicalPathInputSchema.parse(input);
    return `/catalog/${parsed.entity_slug}/offers/${parsed.offer_slug}`;
}
export function agentReadinessCanonicalPath(input) {
    const parsed = agentReadinessCanonicalPathInputSchema.parse(input);
    return `/catalog/${parsed.entity_slug}/agent-readiness/${parsed.product_key}/${parsed.funnel_key}`;
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
export function jsonTwinPath(canonicalPath) {
    if (!canonicalPath.startsWith("/") || canonicalPath.endsWith(".json")) {
        throw new Error(`Invalid canonical path for a JSON twin: ${canonicalPath}`);
    }
    return `${canonicalPath}.json`;
}
/**
 * Root paths owned by the site, machine surfaces, or retained public pages.
 * Catalog identities may never claim these names. Keeping this in
 * the public route contract makes collision prevention identical in the
 * compiler, site, and any future release tooling.
 */
export { ALLOCATED_PUBLIC_ROUTE_ROOTS };
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