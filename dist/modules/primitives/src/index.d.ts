export declare const DIGEST_PATTERN: RegExp;
export declare const IDENTIFIER_PATTERN: RegExp;
export declare const SLUG_PATTERN: RegExp;
export declare const ENTITY_ID_PATTERN: RegExp;
export declare const PROGRAM_ID_PATTERN: RegExp;
export declare const OFFER_ID_PATTERN: RegExp;
export declare const AGENT_READINESS_PROFILE_ID_PATTERN: RegExp;
export declare const OPERATION_ID_PATTERN: RegExp;
export type Digest = `sha256:${string}`;
export type EntityId = `ent_${string}`;
export type ProgramId = `prg_${string}`;
export type OfferId = `off_${string}`;
export type AgentReadinessProfileId = `arp_${string}`;
export type OperationId = `op_${string}`;
/** Query metadata that tracks acquisition rather than selecting a resource. */
export declare function isTrackingQueryParameter(name: string): boolean;
export declare function isFunctionalAccessQueryParameter(name: string): boolean;
/** Canonical identity for credential-free public HTTPS resources. */
export declare function canonicalizePublicHttpsUrl(input: string, options: {
    readonly fragment: "reject" | "remove";
    readonly trimTrailingPathSlash?: boolean;
}): string;
export declare function canonicalJson(value: unknown): string;
/** Depth-first visit of every string in a JSON-shaped value, with its path. */
export declare function visitStrings(value: unknown, visit: (text: string, path: readonly PropertyKey[]) => void, path?: readonly PropertyKey[]): void;
/**
 * Locale-independent lexical ordering for every byte-affecting projection.
 * Relational string comparison is defined over UTF-16 code units and cannot
 * change with the host locale or ICU version.
 */
export declare function compareCanonicalStrings(left: string, right: string): number;
export declare function sha256Bytes(bytes: Uint8Array | string): Digest;
export declare function digest(value: unknown): Digest;
export declare function deriveOperationId(operationContract: string, value: unknown): OperationId;
export declare function prettyJson(value: unknown): string;
export declare function assertDigest(value: string, label?: string): asserts value is Digest;
export declare function digestPathSegment(value: Digest): string;
export declare function digestFromPathSegment(value: string): Digest;
export declare function mapLimit<T, U>(values: readonly T[], concurrency: number, operation: (value: T) => Promise<U>): Promise<U[]>;
//# sourceMappingURL=index.d.ts.map