import { z } from "zod";
import { ALLOCATED_PUBLIC_ROUTE_ROOTS } from "./public-route-allocations.generated.js";
export declare const publicRouteSlugSchema: z.ZodString;
export declare const entityCanonicalPathInputSchema: z.ZodObject<{
    entity_slug: z.ZodString;
}, z.core.$strict>;
export declare const programCanonicalPathInputSchema: z.ZodObject<{
    entity_slug: z.ZodString;
    program_slug: z.ZodString;
}, z.core.$strict>;
export declare const offerCanonicalPathInputSchema: z.ZodObject<{
    entity_slug: z.ZodString;
    offer_slug: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessCanonicalPathInputSchema: z.ZodObject<{
    entity_slug: z.ZodString;
    product_key: z.ZodString;
    funnel_key: z.ZodString;
}, z.core.$strict>;
export declare const entityIconCurrentPathInputSchema: z.ZodObject<{
    entity_id: z.ZodString;
}, z.core.$strict>;
export declare function entityCanonicalPath(input: {
    readonly entity_slug: string;
}): string;
export declare function programCanonicalPath(input: {
    readonly entity_slug: string;
    readonly program_slug: string;
}): string;
export declare function offerCanonicalPath(input: {
    readonly entity_slug: string;
    readonly offer_slug: string;
}): string;
export declare function agentReadinessCanonicalPath(input: {
    readonly entity_slug: string;
    readonly product_key: string;
    readonly funnel_key: string;
}): string;
/**
 * Stable public delivery route for the current icon binding. The transport
 * redirects this path to the binding's immutable digest URL, so static pages
 * never need rebuilding when only an adjacent icon changes.
 */
export declare function entityIconCurrentPath(input: {
    readonly entity_id: string;
}): string;
export declare function parseEntityIconCurrentPath(path: string): {
    readonly entity_id: string;
} | null;
export declare function jsonTwinPath(canonicalPath: string): string;
/**
 * Root paths owned by the site, machine surfaces, or retained public pages.
 * Catalog identities may never claim these names. Keeping this in
 * the public route contract makes collision prevention identical in the
 * compiler, site, and any future release tooling.
 */
export { ALLOCATED_PUBLIC_ROUTE_ROOTS };
export declare const routeEntrySchema: z.ZodObject<{
    kind: z.ZodEnum<{
        entity: "entity";
        program: "program";
        offer: "offer";
        tombstone: "tombstone";
    }>;
    entity_id: z.ZodString;
    program_id: z.ZodOptional<z.ZodString>;
    offer_id: z.ZodOptional<z.ZodString>;
    revision_digest: z.ZodOptional<z.ZodString>;
    canonical: z.ZodBoolean;
    canonical_route: z.ZodString;
    lifecycle: z.ZodOptional<z.ZodEnum<{
        active: "active";
        ended: "ended";
        withdrawn: "withdrawn";
    }>>;
    tombstone_reason: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const routeIndexSchema: z.ZodObject<{
    route_contract: z.ZodLiteral<"sourcey.catalog-routes/v1alpha1">;
    routes: z.ZodRecord<z.ZodString, z.ZodObject<{
        kind: z.ZodEnum<{
            entity: "entity";
            program: "program";
            offer: "offer";
            tombstone: "tombstone";
        }>;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodOptional<z.ZodString>;
        revision_digest: z.ZodOptional<z.ZodString>;
        canonical: z.ZodBoolean;
        canonical_route: z.ZodString;
        lifecycle: z.ZodOptional<z.ZodEnum<{
            active: "active";
            ended: "ended";
            withdrawn: "withdrawn";
        }>>;
        tombstone_reason: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type RouteEntry = z.infer<typeof routeEntrySchema>;
export type RouteIndex = z.infer<typeof routeIndexSchema>;
//# sourceMappingURL=index.d.ts.map