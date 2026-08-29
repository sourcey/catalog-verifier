import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import type { EntityRevision } from "../../../contracts/revisions/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
export interface ActiveAuthorityClaim {
    readonly authorityClaimId: string;
    readonly entityId: string;
    readonly authorizedIssuerId: string;
    readonly controlledDomain: string;
    readonly validUntil: string;
    readonly eventIds: readonly Digest[];
}
export interface AuthorityState {
    readonly activeClaims: ReadonlyMap<string, ActiveAuthorityClaim>;
    readonly activeAttestations: readonly CatalogEvent[];
}
export interface EntityIdentityAuthorityClosure {
    readonly canonical_entity_resolutions: Readonly<Record<string, string>>;
    readonly split_relationships: Readonly<Record<string, readonly string[]>>;
}
/**
 * The canonical domain used when opening a new authority claim. A claim is
 * bound to the Entity revision, so this comes from its domain contract rather
 * than from a presentation URL that may use `www` or another site hostname.
 */
export declare function currentEntityPrimaryDomain(revision: EntityRevision): string;
/**
 * Exact current hostnames that can support authority for an Entity revision.
 * The primary domain is canonical. The recorded site hostname is retained as
 * an authority domain only when it is the primary domain or one of its
 * subdomains; this admits an exact official `www` proof without treating an
 * arbitrary or cross-domain link as vendor authority.
 */
export declare function entityClaimAuthorityDomains(revision: EntityRevision): readonly string[];
export declare function entityAcceptsClaimAuthorityDomain(revision: EntityRevision, domain: string): boolean;
export declare function deriveAuthorityState(events: readonly CatalogEvent[]): AuthorityState;
/** A connected Entity identity lineage may carry only one live claim authority. */
export declare function assertEntityIdentityAuthorityClosure(input: {
    readonly activeClaims: ReadonlyMap<string, {
        readonly entityId: string;
    }>;
    readonly identities: EntityIdentityAuthorityClosure;
}): void;
//# sourceMappingURL=index.d.ts.map