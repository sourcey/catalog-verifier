/** The one platform instance every Sourcey submission and candidate belongs to. */
export declare const SOURCEY_SUBMISSION_INSTANCE = "sourcey";
export declare const ENTITY_ID_PATTERN: RegExp;
export declare const PROGRAM_ID_PATTERN: RegExp;
export declare const OFFER_ID_PATTERN: RegExp;
export declare const AGENT_READINESS_PROFILE_ID_PATTERN: RegExp;
export declare function slugify(value: string): string;
export declare function deriveOpaqueCatalogId(prefix: "ent" | "prg" | "off", value: unknown): string;
/** Query metadata that tracks acquisition rather than selecting a resource. */
export declare function isTrackingQueryParameter(name: string): boolean;
export declare function isFunctionalAccessQueryParameter(name: string): boolean;
/** Canonical identity for credential-free public HTTPS resources. */
export declare function canonicalizePublicHttpsUrl(input: string, options: {
    readonly fragment: "reject" | "remove";
    readonly trimTrailingPathSlash?: boolean;
}): string;
//# sourceMappingURL=index.d.ts.map