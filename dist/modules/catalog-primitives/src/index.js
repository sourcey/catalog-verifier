/** The one platform instance every Sourcey submission and candidate belongs to. */
export const SOURCEY_SUBMISSION_INSTANCE = "sourcey";
export const ENTITY_ID_PATTERN = /^ent_[0-9a-hjkmnp-tv-z]{26}$/;
export const PROGRAM_ID_PATTERN = /^prg_[0-9a-hjkmnp-tv-z]{26}$/;
export const OFFER_ID_PATTERN = /^off_[0-9a-hjkmnp-tv-z]{26}$/;
export const AGENT_READINESS_PROFILE_ID_PATTERN = /^arp_[0-9a-hjkmnp-tv-z]{26}$/;
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