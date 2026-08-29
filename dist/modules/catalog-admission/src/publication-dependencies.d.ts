import type { PublicationDependencyRegistration, SurfaceDependencyReference } from "../../../contracts/publication/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
export declare function catalogSourceLocatorDigest(url: string): Digest;
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
    readonly contextChanges: readonly ({
        kind: "policy";
        key: string;
    } | {
        kind: "contract_authority";
    })[];
}): string[];
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
    readonly entity: (entityId: string) => string;
    readonly subject: (kind: string, targetId: string) => string;
    readonly revision: (revisionDigest: string) => string;
    readonly field: (kind: string, targetId: string, path: string) => string;
    readonly source: (entityId: string, sourceId: string) => string;
    readonly asset: (entityId: string, role: string) => string;
    readonly sourceLocator: (sourceLocatorDigest: string) => string;
    readonly parent: (kind: string, targetId: string) => string;
    readonly route: (kind: string, targetId: string) => string;
    readonly policy: (key: string) => string;
    readonly contractAuthority: () => string;
};
export declare function surfaceDependencyReferenceKey(reference: SurfaceDependencyReference): string;
export declare class CatalogPublicationImpactIndex {
    #private;
    readonly indexDigest: Digest;
    constructor(registrations?: readonly PublicationDependencyRegistration[]);
    registration(dependent: {
        readonly domain: string;
        readonly key: string;
    }): PublicationDependencyRegistration | undefined;
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