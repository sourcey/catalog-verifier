import { z } from "zod";
export declare const offerCanonicalPathInputSchema: z.ZodObject<{
    entity_slug: z.ZodString;
    offer_slug: z.ZodString;
}, z.core.$strict>;
export declare function catalogCanonicalPath(): string;
export declare function companiesJsonCanonicalPath(): string;
export declare function startupCreditsJsonCanonicalPath(): string;
export declare function agentReadinessJsonCanonicalPath(): string;
/** Canonical namespace for an individual company and every record it owns. */
export declare function entityRecordCanonicalRootPath(): string;
export declare function policyCanonicalPath(slug: string): string;
/** Retained namespaces resolve historical route rows without rewriting history. */
export declare const catalogRecordNamespaceRelocations: readonly [{
    readonly from: "/log";
    readonly to: string;
}, {
    readonly from: "/catalog";
    readonly to: string;
}];
/** Permanent public URL moves, not aliases for a second record surface. */
export declare const catalogRecordRedirects: readonly [{
    readonly kind: "exact";
    readonly path: "/log.json";
    readonly canonical_target: string;
    readonly action: "301";
}, {
    readonly kind: "exact";
    readonly path: "/catalog.json";
    readonly canonical_target: string;
    readonly action: "301";
}, {
    readonly kind: "exact";
    readonly path: "/catalog";
    readonly canonical_target: string;
    readonly action: "301";
}, {
    readonly kind: "exact";
    readonly path: "/catalog/";
    readonly canonical_target: string;
    readonly action: "301";
}, {
    readonly kind: "exact";
    readonly path: "/log";
    readonly canonical_target: string;
    readonly action: "301";
}, {
    readonly kind: "exact";
    readonly path: "/log/";
    readonly canonical_target: string;
    readonly action: "301";
}, ...({
    readonly kind: "pattern";
    readonly path: "/catalog/*/" | "/log/*/";
    readonly canonical_target: `${string}/:splat`;
    readonly action: "301";
} | {
    readonly kind: "pattern";
    readonly path: "/catalog/*" | "/log/*";
    readonly canonical_target: `${string}/:splat`;
    readonly action: "301";
})[]];
export declare function currentCatalogRecordPath(path: string): string;
export declare function entityCanonicalPath(input: {
    readonly entity_slug: string;
}): string;
export declare function parseEntityCanonicalPath(path: string): {
    readonly entity_slug: string;
} | null;
export declare function programCanonicalPath(input: {
    readonly entity_slug: string;
    readonly program_slug: string;
}): string;
export declare function offerCanonicalPath(input: {
    readonly entity_slug: string;
    readonly offer_slug: string;
}): string;
/** Resolve a current or retained Offer path without duplicating its namespace in consumers. */
export declare function parseOfferCanonicalPath(path: string): {
    readonly entity_slug: string;
    readonly offer_slug: string;
} | null;
export declare function agentReadinessCanonicalPath(input: {
    readonly entity_slug: string;
    readonly product_key: string;
    readonly job_key: string;
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
export declare const routeEntrySchema: z.ZodObject<{
    kind: z.ZodEnum<{
        entity: "entity";
        offer: "offer";
        program: "program";
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
            offer: "offer";
            program: "program";
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