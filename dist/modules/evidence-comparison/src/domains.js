import { getPublicSuffix } from "tldts";
/**
 * Whether a domain is a public suffix, such as `io`, `co.uk` or `github.io`:
 * a namespace many parties register under, which no one vendor can claim.
 */
export function domainIsPublicSuffix(domain) {
    const normalized = domain.toLowerCase().replace(/\.$/u, "");
    return getPublicSuffix(normalized, { allowPrivateDomains: true }) === normalized;
}
/** A host is the domain itself or one of its subdomains. */
export function hostWithinDomain(host, domain) {
    const normalizedHost = host.toLowerCase().replace(/\.$/u, "");
    const normalizedDomain = domain.toLowerCase().replace(/\.$/u, "");
    return normalizedHost === normalizedDomain || normalizedHost.endsWith(`.${normalizedDomain}`);
}
//# sourceMappingURL=domains.js.map