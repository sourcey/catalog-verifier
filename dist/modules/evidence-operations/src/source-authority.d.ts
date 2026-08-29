import type { Domain } from "../../../contracts/revisions/src/index.js";
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
export declare function hostnameWithinEntityDomains(hostname: string, domains: readonly Domain[], retrievedAt: number): boolean;
/**
 * Split a subject's cited sources into the canonical set worth capturing and
 * the inert hosts that cannot carry authority for it. Inert sources are not
 * captured at all: the capture allowlist pins each job to its cited host, so
 * a listing on the wrong host can never redirect its way into authority, and
 * skipping it avoids spending extraction effort on text that will not count.
 */
export declare function partitionCanonicalEvidenceSources<Source extends {
    readonly url: string;
}>(sources: readonly Source[], canonicalDomains: readonly Domain[], retrievalInstant: number): {
    readonly canonical: Source[];
    readonly inertHosts: string[];
};
//# sourceMappingURL=source-authority.d.ts.map