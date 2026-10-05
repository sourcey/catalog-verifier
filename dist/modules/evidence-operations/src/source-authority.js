import { canonicalizePublicHttpsUrl } from "../../catalog-primitives/src/index.js";
import { domainIsPublicSuffix } from "../../evidence-comparison/src/values.js";
import { evidenceHttpAllowedHosts } from "./url-canonicalization.js";
/**
 * Canonical-source authority for catalog evidence.
 *
 * A cited source may prove facts for a subject only when the party publishing
 * it controls those facts. The vendor's own domains always qualify. A third
 * party qualifies only when the subject's roles name that party's entity, the
 * channel-operator case: Pulley's perks page is canonical for the terms of a
 * perk Pulley grants, because the record says Pulley operates it. Directory
 * and aggregator listings match neither test and are inert; they never count
 * toward evidence coverage. Aggregators copy one another's numbers, so citing
 * them would join the chain of restated guesses this catalog exists to break.
 * (2026-08-12: 47 live offers were found carrying economics, eligibility, and
 * access sourced from an aggregator that neither operated nor published the
 * underlying programs.)
 */
export function hostnameWithinEntityDomains(hostname, domains, retrievedAt) {
    const subject = hostname.toLowerCase().replace(/\.$/, "");
    return domains.some((domain) => {
        // A public suffix is shared by every party registered under it and grants no one authority.
        if (domainIsPublicSuffix(domain.value))
            return false;
        if (Date.parse(domain.valid_from) > retrievedAt ||
            (domain.valid_until !== undefined && Date.parse(domain.valid_until) <= retrievedAt)) {
            return false;
        }
        const declared = domain.value.toLowerCase().replace(/\.$/, "");
        return subject === declared || subject.endsWith(`.${declared}`);
    });
}
/**
 * The one Entity among a subject's canonical publishers whose current domains
 * serve a URL: canonical when exactly one does, ambiguous when several do,
 * and inert when none does.
 */
export function resolveCanonicalPublisher(url, publishers, at) {
    const hostname = new URL(url).hostname;
    const matches = publishers.filter((publisher) => hostnameWithinEntityDomains(hostname, publisher.content.domains, at));
    const [only] = matches;
    if (only && matches.length === 1)
        return { authority: "canonical", publisher: only };
    return { authority: matches.length > 1 ? "ambiguous" : "inert", publisher: null };
}
/**
 * Split a subject's cited sources into the canonical set worth capturing and
 * the inert hosts that cannot carry authority for it. Inert sources are not
 * captured at all: the capture allowlist pins each job to its cited host, so
 * a listing on the wrong host can never redirect its way into authority, and
 * skipping it avoids spending extraction effort on text that will not count.
 */
export function partitionCanonicalEvidenceSources(sources, canonicalDomains, retrievalInstant) {
    const canonical = [];
    const inertHosts = new Set();
    for (const source of sources) {
        let candidates;
        try {
            candidates = evidenceHttpAllowedHosts(source.url);
        }
        catch {
            // A URL the canonicalizer rejects (http://, credentials) cannot be
            // judged here; pass it through so the capture attempt reports the
            // precise transport error instead of a misleading authority one.
            canonical.push(source);
            continue;
        }
        if (candidates.some((host) => hostnameWithinEntityDomains(host, canonicalDomains, retrievalInstant))) {
            canonical.push(source);
        }
        else {
            inertHosts.add(new URL(canonicalizePublicHttpsUrl(source.url, { fragment: "remove" })).hostname);
        }
    }
    return { canonical, inertHosts: [...inertHosts].sort() };
}
//# sourceMappingURL=source-authority.js.map