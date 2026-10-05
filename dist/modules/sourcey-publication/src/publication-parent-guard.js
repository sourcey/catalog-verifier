import { resolveCatalogPublicationImpact } from "../../catalog-admission/src/publication.js";
import { CatalogPublicationImpactIndex } from "../../catalog-admission/src/publication-dependencies.js";
import { catalogPublicationParentRelationGuard } from "./publication-parent-relations.js";
/** Executable validation stays with the exact verifier that admitted the bundle.
 * The host supplies current parent rows under its activation lock, not rules. */
export function catalogPublicationParentGuard(delta) {
    return {
        relations: catalogPublicationParentRelationGuard(delta),
        verifyImpact(registrations) {
            const changeSet = delta.publicationChangeSet;
            const index = new CatalogPublicationImpactIndex(registrations, changeSet.changed_dependency_keys);
            if (resolveCatalogPublicationImpact(changeSet, index).change_set_digest !==
                changeSet.change_set_digest)
                throw new Error("Catalog publication impact differs from its exact current dependency closure.");
        },
    };
}
//# sourceMappingURL=publication-parent-guard.js.map