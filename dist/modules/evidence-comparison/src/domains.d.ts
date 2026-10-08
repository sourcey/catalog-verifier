/**
 * Whether a domain is a public suffix, such as `io`, `co.uk` or `github.io`:
 * a namespace many parties register under, which no one vendor can claim.
 */
export declare function domainIsPublicSuffix(domain: string): boolean;
/** A host is the domain itself or one of its subdomains. */
export declare function hostWithinDomain(host: string, domain: string): boolean;
//# sourceMappingURL=domains.d.ts.map