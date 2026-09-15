import { type AssuranceMethodPolicy, type EntityIdentityAssurance, type OfferTermsAssurance } from "../../../contracts/assurance/src/index.js";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import type { EntityRevision, OfferRevision } from "../../../contracts/revisions/src/index.js";
export declare function deriveEntityIdentityAnchor(revision: EntityRevision): {
    anchor_contract: "sourcey.entity-identity-anchor/v1alpha1";
    entity_id: string;
    name: string;
    primary_domain: string;
    identity_epoch_digest: string;
};
export declare function validateAssuranceMethodPolicy(input: unknown): AssuranceMethodPolicy;
export declare function deriveEntityIdentityAssurance(input: {
    readonly revision: EntityRevision;
    readonly events: readonly CatalogEvent[];
    readonly inactiveEventIds: ReadonlySet<string>;
}): EntityIdentityAssurance | undefined;
export declare function deriveOfferTermsAssurance(input: {
    readonly revision: OfferRevision;
    readonly events: readonly CatalogEvent[];
    readonly inactiveEventIds: ReadonlySet<string>;
}): OfferTermsAssurance | undefined;
//# sourceMappingURL=index.d.ts.map