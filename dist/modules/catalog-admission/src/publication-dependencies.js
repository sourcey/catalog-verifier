import { compareCanonicalStrings, digest } from "provenry/primitives";
import { publicationDependencyRegistrationSchema } from "../../../contracts/publication/src/index.js";
import { canonicalizePublicHttpsUrl } from "../../catalog-primitives/src/index.js";
export function catalogSourceLocatorDigest(url) {
    return digest({
        canonical_requested_public_uri: canonicalizePublicHttpsUrl(url, {
            fragment: "remove",
            trimTrailingPathSlash: true,
        }),
    });
}
export function catalogPublicationImpactProof(input) {
    return digest({
        impact_index_digest: input.impact_index_digest,
        changed_dependency_keys: input.changed_dependency_keys,
        affected_dependents: input.affected_dependents,
    });
}
export function dependencyKeysForChanges(input) {
    // Context changes (policy pins, the verifier) have no dependency keys: they
    // govern future decisions and never fan out to published resources.
    const keys = [];
    for (const change of input.revisionChanges) {
        keys.push(catalogPublicationDependencyKey.entity(change.entity_id));
        keys.push(catalogPublicationDependencyKey.subject(change.kind, change.target_id));
        if (change.current_revision_digest) {
            keys.push(catalogPublicationDependencyKey.revision(change.current_revision_digest));
        }
        if (change.candidate_revision_digest) {
            keys.push(catalogPublicationDependencyKey.revision(change.candidate_revision_digest));
        }
        for (const path of change.semantic_paths) {
            keys.push(catalogPublicationDependencyKey.field(change.kind, change.target_id, path));
        }
        for (const sourceId of change.source_change_ids) {
            keys.push(catalogPublicationDependencyKey.source(change.entity_id, sourceId));
        }
        if (change.parent_changed) {
            keys.push(catalogPublicationDependencyKey.parent(change.kind, change.target_id));
        }
    }
    for (const change of input.sourceChanges) {
        keys.push(catalogPublicationDependencyKey.entity(change.entity_id));
        keys.push(catalogPublicationDependencyKey.source(change.entity_id, change.source_id));
        for (const url of [change.current_url, change.candidate_url]) {
            if (url) {
                keys.push(catalogPublicationDependencyKey.sourceLocator(catalogSourceLocatorDigest(url)));
            }
        }
    }
    for (const change of input.assetChanges) {
        keys.push(catalogPublicationDependencyKey.entity(change.entity_id));
        keys.push(catalogPublicationDependencyKey.asset(change.entity_id, change.role));
        if (change.change === "upsert" && change.candidate_proposal_digest) {
            keys.push(`catalog:asset-proposal:${change.candidate_proposal_digest}`);
        }
        if (change.current_binding_event_id) {
            keys.push(`catalog:asset-binding:${change.current_binding_event_id}`);
        }
    }
    for (const change of input.routeChanges) {
        keys.push(catalogPublicationDependencyKey.entity(change.entity_id));
        keys.push(catalogPublicationDependencyKey.route(change.kind, change.target_id));
    }
    for (const proposal of input.authorityProposals ?? [])
        keys.push(...proposal.dependency_keys);
    return orderedUnique(keys);
}
/** Event identity and exact revision are generic publication dependencies.
 * Retractions invalidate their target, not merely the new retraction's ID. */
export function catalogPublicationEventDependencyKeys(events) {
    return orderedUnique(events.flatMap((event) => {
        const keys = [catalogPublicationDependencyKey.event(event.event_id)];
        if (event.subject.revision_digest)
            keys.push(catalogPublicationDependencyKey.revision(event.subject.revision_digest));
        const target = event.payload.target_event_id;
        if (typeof target === "string")
            keys.push(catalogPublicationDependencyKey.event(target));
        return keys;
    }));
}
export function requiredAuthoritiesForChanges(input) {
    const purposes = new Set(["catalog-release"]);
    for (const proposal of input.authorityProposals)
        purposes.add(proposal.purpose);
    // The evidence event admits a source: it carries the review decision and
    // cites the capture's attestation.
    if (input.revisionChanges.some(({ change }) => change !== "removed") ||
        input.sourceChanges.some(({ change }) => change !== "removed")) {
        purposes.add("catalog-evidence");
    }
    if (input.assetChanges.length > 0)
        purposes.add("catalog-identity");
    if (input.revisionChanges.some(({ kind, change }) => kind === "entity" && change === "added") ||
        input.revisionChanges.some(({ change, parent_changed: parentChanged }) => change === "removed" || parentChanged) ||
        input.routeChanges.some(({ current_slug: currentSlug }) => currentSlug !== null)) {
        purposes.add("catalog-identity");
    }
    if (input.contextChanges.some(({ kind }) => kind === "policy")) {
        purposes.add("catalog-policy");
    }
    if (input.contextChanges.some(({ kind }) => kind === "contract_authority")) {
        purposes.add("catalog-authority");
    }
    return [...purposes].sort(compareCanonicalStrings);
}
export const catalogPublicationDependencyKey = {
    event: (eventId) => `catalog:event:${eventId}`,
    entity: (entityId) => `catalog:entity:${entityId}`,
    subject: (kind, targetId) => `catalog:subject:${kind}:${targetId}`,
    revision: (revisionDigest) => `catalog:revision:${revisionDigest}`,
    field: (kind, targetId, path) => `catalog:field:${kind}:${targetId}:${path}`,
    source: (entityId, sourceId) => `catalog:source:${entityId}:${sourceId}`,
    asset: (entityId, role) => `catalog:asset:${entityId}:${role}`,
    sourceLocator: (sourceLocatorDigest) => `catalog:source-locator:${sourceLocatorDigest}`,
    parent: (kind, targetId) => `catalog:parent:${kind}:${targetId}`,
    route: (kind, targetId) => `catalog:route:${kind}:${targetId}`,
};
export class CatalogPublicationImpactIndex {
    indexDigest;
    #byDependency = new Map();
    #registrations = new Map();
    #selectedKeys;
    constructor(registrations = [], selectedDependencyKeys) {
        this.#selectedKeys = selectedDependencyKeys ? new Set(selectedDependencyKeys) : undefined;
        const normalized = registrations
            .map((registration) => publicationDependencyRegistrationSchema.parse({
            dependent: registration.dependent,
            dependency_keys: orderedUnique(registration.dependency_keys),
        }))
            .sort((left, right) => compareCanonicalStrings(dependentKey(left.dependent), dependentKey(right.dependent)));
        const dependents = normalized.map(({ dependent }) => dependentKey(dependent));
        if (new Set(dependents).size !== dependents.length) {
            throw new Error("A publication dependent may register its dependency manifest only once.");
        }
        const mutable = new Map();
        for (const registration of normalized) {
            this.#registrations.set(dependentKey(registration.dependent), registration);
            for (const dependency of registration.dependency_keys) {
                const values = mutable.get(dependency) ?? [];
                values.push(registration.dependent);
                mutable.set(dependency, values);
            }
        }
        for (const [dependency, values] of mutable) {
            this.#byDependency.set(dependency, values.sort((left, right) => compareCanonicalStrings(dependentKey(left), dependentKey(right))));
        }
        this.indexDigest = digest(normalized);
    }
    registrations() {
        return [...this.#registrations.values()];
    }
    affected(dependencyKeys) {
        const keys = orderedUnique(dependencyKeys);
        if (this.#selectedKeys && keys.some((key) => !this.#selectedKeys?.has(key)))
            throw new Error("Publication impact lookup exceeds its complete dependency selection.");
        const affected = new Map();
        for (const key of keys) {
            for (const dependent of this.#byDependency.get(key) ?? []) {
                affected.set(dependentKey(dependent), dependent);
            }
        }
        return {
            dependents: [...affected.values()].sort((left, right) => compareCanonicalStrings(dependentKey(left), dependentKey(right))),
            lookups: keys.length,
        };
    }
}
export function orderedUnique(values) {
    return [...new Set(values)].sort(compareCanonicalStrings);
}
export function dependentKey(value) {
    return `${value.domain}\0${value.key}`;
}
//# sourceMappingURL=publication-dependencies.js.map