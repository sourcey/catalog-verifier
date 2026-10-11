/** Reading the documents a service publishes: their shape only, never their prose. */
/** A JSON object, or null for anything else. */
export declare function record(value: unknown): Record<string, unknown> | null;
/** An HTTPS URL carrying no credentials, normalised, or null. */
export declare function httpsUrl(value: unknown): string | null;
/** Strict UTF-8, or null for bytes that are not. */
export declare function utf8(bytes: Uint8Array): string | null;
/** Parsed JSON, or undefined for text that is not. */
export declare function json(text: string): unknown;
/**
 * The OpenAPI 3.x version a document states, when it is one: its `openapi`
 * version and the `info` object (a title and a version) OpenAPI requires.
 */
export declare function openApiVersion(document: Record<string, unknown> | null): string | null;
/**
 * A JSON or YAML document parsed, or undefined for text that is neither:
 * vendors publish OpenAPI documents in both. Aliases are bounded, so a small
 * document cannot expand into a large one.
 */
export declare function jsonOrYaml(text: string): unknown;
//# sourceMappingURL=documents.d.ts.map