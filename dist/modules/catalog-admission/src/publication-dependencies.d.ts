import { type Digest } from "provenry/primitives";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import type { PublicationDependencyRegistration } from "../../../contracts/publication/src/index.js";
export declare function catalogSourceLocatorDigest(url: string): Digest;
export declare function catalogPublicationImpactProof(input: {
    readonly impact_index_digest: string;
    readonly changed_dependency_keys: readonly string[];
    readonly affected_dependents: readonly {
        readonly domain: string;
        readonly key: string;
    }[];
}): Digest;
export declare function dependencyKeysForChanges(input: {
    readonly revisionChanges: readonly {
        kind: string;
        entity_id: string;
        target_id: string;
        current_revision_digest: string | null;
        candidate_revision_digest: string | null;
        semantic_paths: readonly string[];
        source_change_ids: readonly string[];
        parent_changed: boolean;
    }[];
    readonly sourceChanges: readonly {
        entity_id: string;
        source_id: string;
        current_url: string | null;
        candidate_url: string | null;
    }[];
    readonly assetChanges: readonly {
        change: "upsert" | "remove";
        entity_id: string;
        role: string;
        current_binding_event_id: string | null;
        candidate_proposal_digest?: string;
    }[];
    readonly routeChanges: readonly {
        kind: string;
        entity_id: string;
        target_id: string;
    }[];
    readonly authorityProposals?: readonly {
        readonly dependency_keys: readonly string[];
    }[];
}): string[];
/** Event identity and exact revision are generic publication dependencies.
 * Retractions invalidate their target, not merely the new retraction's ID. */
export declare function catalogPublicationEventDependencyKeys(events: readonly Pick<CatalogEvent, "event_id" | "subject" | "payload">[]): string[];
export declare function requiredAuthoritiesForChanges(input: {
    readonly revisionChanges: readonly {
        kind: string;
        change: string;
        parent_changed: boolean;
    }[];
    readonly sourceChanges: readonly {
        change: string;
    }[];
    readonly assetChanges: readonly unknown[];
    readonly routeChanges: readonly {
        current_slug: string | null;
        candidate_slug: string | null;
    }[];
    readonly contextChanges: readonly {
        kind: string;
    }[];
    readonly authorityProposals: readonly {
        purpose: string;
    }[];
}): string[];
export declare const catalogPublicationDependencyKey: {
    readonly event: (eventId: string) => string;
    readonly entity: (entityId: string) => string;
    readonly subject: (kind: string, targetId: string) => string;
    readonly revision: (revisionDigest: string) => string;
    readonly field: (kind: string, targetId: string, path: string) => string;
    readonly source: (entityId: string, sourceId: string) => string;
    readonly asset: (entityId: string, role: string) => string;
    readonly sourceLocator: (sourceLocatorDigest: string) => string;
    readonly parent: (kind: string, targetId: string) => string;
    readonly route: (kind: string, targetId: string) => string;
};
/** Structural read port across purpose-scoped distributions. Its public shape
 * is derived from the owner, never copied by a host or coupled to JS private fields. */
export type CatalogPublicationImpactQuery = Pick<CatalogPublicationImpactIndex, keyof CatalogPublicationImpactIndex>;
export type CatalogPublicationImpactReader = (input: {
    readonly releaseId: string;
    readonly dependencyKeys: readonly string[];
}) => Promise<CatalogPublicationImpactQuery>;
export declare class CatalogPublicationImpactIndex {
    #private;
    readonly indexDigest: Digest;
    constructor(registrations?: readonly PublicationDependencyRegistration[], selectedDependencyKeys?: readonly string[]);
    registrations(): readonly PublicationDependencyRegistration[];
    affected(dependencyKeys: readonly string[]): {
        readonly dependents: readonly {
            domain: string;
            key: string;
        }[];
        readonly lookups: number;
    };
}
export declare function orderedUnique(values: Iterable<string>): string[];
export declare function dependentKey(value: {
    readonly domain: string;
    readonly key: string;
}): string;
//# sourceMappingURL=publication-dependencies.d.ts.map