import type { PublicationDependencyRegistration } from "../../../contracts/publication/src/index.js";
import { catalogPublicationParentRelationGuard } from "./publication-parent-relations.js";
/** Executable validation stays with the exact verifier that admitted the bundle.
 * The host supplies current parent rows under its activation lock, not rules. */
export declare function catalogPublicationParentGuard(delta: Parameters<typeof catalogPublicationParentRelationGuard>[0]): {
    relations: {
        selectors: {
            relationIds: string[];
            profileIds: string[];
            offerIds: string[];
        };
        verify(parent: import("./publication-parent-relations.js").CatalogPublicationParentRelations): void;
    };
    verifyImpact(registrations: readonly PublicationDependencyRegistration[]): void;
};
export type CatalogPublicationParentGuard = ReturnType<typeof catalogPublicationParentGuard>;
//# sourceMappingURL=publication-parent-guard.d.ts.map