import { digest } from "provenry/primitives";
/** The one platform instance every Sourcey submission and candidate belongs to. */
export const SOURCEY_SUBMISSION_INSTANCE = "sourcey";
export const ENTITY_ID_PATTERN = /^ent_[0-9a-hjkmnp-tv-z]{26}$/;
export const PROGRAM_ID_PATTERN = /^prg_[0-9a-hjkmnp-tv-z]{26}$/;
export const OFFER_ID_PATTERN = /^off_[0-9a-hjkmnp-tv-z]{26}$/;
export const AGENT_READINESS_PROFILE_ID_PATTERN = /^arp_[0-9a-hjkmnp-tv-z]{26}$/;
export function slugify(value) {
    const slug = value
        .normalize("NFKD")
        .toLowerCase()
        .replace(/[\u0300-\u036f]/gu, "")
        .replace(/[^a-z0-9]+/gu, "-")
        .replace(/^-+|-+$/gu, "")
        .slice(0, 80)
        .replace(/-+$/u, "");
    if (!slug)
        throw new Error("Company or offer title cannot produce a stable slug.");
    return slug;
}
export function deriveOpaqueCatalogId(prefix, value) {
    const alphabet = "0123456789abcdefghjkmnpqrstvwxyz";
    let bits = BigInt(`0x${digest(value).slice("sha256:".length)}`) >> 126n;
    let encoded = "";
    for (let index = 0; index < 26; index += 1) {
        encoded = `${alphabet.charAt(Number(bits & 31n))}${encoded}`;
        bits >>= 5n;
    }
    return `${prefix}_${encoded}`;
}
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
//# sourceMappingURL=index.js.map