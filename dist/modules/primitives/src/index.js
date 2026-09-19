import { createHash } from "node:crypto";
export const DIGEST_PATTERN = /^sha256:[a-f0-9]{64}$/;
export const IDENTIFIER_PATTERN = /^[a-z0-9][a-z0-9_-]*$/;
/**
 * A human actor: an identifier, or identifiers joined by dots when a provider
 * namespace qualifies a login (`github.<login>`). Every plain identifier is a
 * valid actor identifier.
 */
export const ACTOR_IDENTIFIER_PATTERN = /^[a-z0-9][a-z0-9_-]*(?:\.[a-z0-9][a-z0-9_-]*)*$/;
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const ENTITY_ID_PATTERN = /^ent_[0-9a-hjkmnp-tv-z]{26}$/;
export const PROGRAM_ID_PATTERN = /^prg_[0-9a-hjkmnp-tv-z]{26}$/;
export const OFFER_ID_PATTERN = /^off_[0-9a-hjkmnp-tv-z]{26}$/;
export const AGENT_READINESS_PROFILE_ID_PATTERN = /^arp_[0-9a-hjkmnp-tv-z]{26}$/;
export const OPERATION_ID_PATTERN = /^op_[0-9a-hjkmnp-tv-z]{26}$/;
const TRACKING_QUERY_PARAMETER_PATTERN = /^(?:utm_.+|fbclid|gclid|dclid|_gl|gad_campaignid|gad_source|gbraid|wbraid|msclkid|twclid|li_fat_id|mc_cid|mc_eid|irclickid|irgwc|click_?id|ref|referrer|referral(?:_id)?|aff|aff_id|affiliate(?:_id)?|campaign(?:_id)?|marketing(?:_id)?|partner_ref)$/iu;
const FUNCTIONAL_ACCESS_QUERY_PARAMETER_PATTERN = /^(?:id|offer(?:_?id)?|program(?:_?id)?|plan(?:_?id)?|product(?:_?id)?|sku|code|coupon(?:_?code)?|promo(?:_?code)?|promotion(?:_?id)?|deal(?:_?id)?|package(?:_?id)?|tier|variant|form(?:_?id)?|template(?:_?id)?|destination)$/iu;
/** Query metadata that tracks acquisition rather than selecting a resource. */
export function isTrackingQueryParameter(name) {
    return TRACKING_QUERY_PARAMETER_PATTERN.test(name);
}
export function isFunctionalAccessQueryParameter(name) {
    return FUNCTIONAL_ACCESS_QUERY_PARAMETER_PATTERN.test(name);
}
/** Canonical identity for credential-free public HTTPS resources. */
export function canonicalizePublicHttpsUrl(input, options) {
    const url = new URL(input);
    if (url.protocol !== "https:" || url.username || url.password) {
        throw new Error("Public evidence URLs must be credential-free HTTPS.");
    }
    if (options.fragment === "reject" && url.hash) {
        throw new Error("Public evidence URLs cannot contain fragments.");
    }
    url.hash = "";
    url.hostname = url.hostname.toLowerCase().replace(/\.$/u, "");
    if (options.trimTrailingPathSlash && url.pathname !== "/") {
        url.pathname = url.pathname.replace(/\/+$/u, "");
    }
    for (const key of [...url.searchParams.keys()]) {
        if (isTrackingQueryParameter(key))
            url.searchParams.delete(key);
    }
    return url.toString();
}
const CROCKFORD = "0123456789abcdefghjkmnpqrstvwxyz";
export function canonicalJson(value) {
    if (value === null || typeof value === "boolean") {
        return JSON.stringify(value);
    }
    if (typeof value === "string") {
        return JSON.stringify(value.normalize("NFC"));
    }
    if (typeof value === "number") {
        if (!Number.isFinite(value))
            throw new TypeError("Canonical JSON rejects non-finite numbers.");
        return JSON.stringify(value);
    }
    if (Array.isArray(value)) {
        return `[${value.map(canonicalJson).join(",")}]`;
    }
    if (typeof value === "object") {
        const record = value;
        const normalizedKeys = Object.keys(record).map((key) => ({
            source: key,
            normalized: key.normalize("NFC"),
        }));
        if (new Set(normalizedKeys.map(({ normalized }) => normalized)).size !== normalizedKeys.length) {
            throw new TypeError("Canonical JSON rejects object keys that collide after NFC normalization.");
        }
        return `{${normalizedKeys
            .sort((left, right) => compareCanonicalStrings(left.normalized, right.normalized))
            .map((key) => {
            const child = record[key.source];
            if (child === undefined) {
                throw new TypeError(`Canonical JSON rejects undefined at key '${key.source}'.`);
            }
            return `${JSON.stringify(key.normalized)}:${canonicalJson(child)}`;
        })
            .join(",")}}`;
    }
    throw new TypeError(`Canonical JSON rejects values of type '${typeof value}'.`);
}
/** Depth-first visit of every string in a JSON-shaped value, with its path. */
export function visitStrings(value, visit, path = []) {
    if (typeof value === "string") {
        visit(value, path);
        return;
    }
    if (Array.isArray(value)) {
        for (const [index, entry] of value.entries()) {
            visitStrings(entry, visit, [...path, index]);
        }
        return;
    }
    if (value && typeof value === "object") {
        for (const [key, entry] of Object.entries(value)) {
            visitStrings(entry, visit, [...path, key]);
        }
    }
}
/**
 * Locale-independent lexical ordering for every byte-affecting projection.
 * Relational string comparison is defined over UTF-16 code units and cannot
 * change with the host locale or ICU version.
 */
export function compareCanonicalStrings(left, right) {
    const normalizedLeft = left.normalize("NFC");
    const normalizedRight = right.normalize("NFC");
    return normalizedLeft < normalizedRight ? -1 : normalizedLeft > normalizedRight ? 1 : 0;
}
/** Chronological ordering for ISO-8601 instants, independent of offset spelling. */
export function compareInstants(left, right) {
    const leftTime = Date.parse(left);
    const rightTime = Date.parse(right);
    if (!Number.isFinite(leftTime) || !Number.isFinite(rightTime)) {
        throw new TypeError("Instant comparison requires valid ISO-8601 values.");
    }
    return leftTime - rightTime;
}
export function sha256Bytes(bytes) {
    return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}
export function digest(value) {
    return sha256Bytes(canonicalJson(value));
}
export function deriveOperationId(operationContract, value) {
    if (!operationContract.trim()) {
        throw new TypeError("Operation contract must not be empty.");
    }
    const source = digest({ operation_contract: operationContract, value }).slice("sha256:".length, "sha256:".length + 32);
    let remaining = BigInt(`0x${source}`);
    let encoded = "";
    for (let index = 0; index < 26; index += 1) {
        encoded = `${CROCKFORD[Number(remaining & 31n)]}${encoded}`;
        remaining >>= 5n;
    }
    return `op_${encoded}`;
}
export function prettyJson(value) {
    return `${JSON.stringify(value, null, 2)}\n`;
}
export function assertDigest(value, label = "digest") {
    if (!DIGEST_PATTERN.test(value))
        throw new TypeError(`${label} must be a SHA-256 digest.`);
}
export function digestPathSegment(value) {
    return value.replace(":", "-");
}
export function digestFromPathSegment(value) {
    const candidate = value.replace(/^sha256-/, "sha256:");
    assertDigest(candidate);
    return candidate;
}
export async function mapLimit(values, concurrency, operation) {
    if (!Number.isSafeInteger(concurrency) || concurrency <= 0) {
        throw new TypeError("Concurrency must be a positive safe integer.");
    }
    const results = new Array(values.length);
    let cursor = 0;
    let failure;
    await Promise.all(Array.from({ length: Math.min(concurrency, values.length) }, async () => {
        while (!failure && cursor < values.length) {
            const index = cursor;
            cursor += 1;
            try {
                results[index] = await operation(values[index]);
            }
            catch (cause) {
                failure ??= { cause };
            }
        }
    }));
    // Callers may close stores after settlement. Stop scheduling and drain every active effect first.
    if (failure)
        throw failure.cause;
    return results;
}
//# sourceMappingURL=index.js.map