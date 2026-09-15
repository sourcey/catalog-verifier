import { assuranceMethodPolicyCoreSchema, assuranceMethodPolicySchema, entityIdentityAnchorCoreSchema, entityIdentityAnchorSchema, entityIdentityCheckedPayloadSchema, offerTermsCheckedPayloadSchema, } from "../../../contracts/assurance/src/index.js";
import { currentEntityPrimaryDomain } from "../../authority-state/src/index.js";
import { compareCanonicalStrings, compareInstants, digest, } from "../../primitives/src/index.js";
export function deriveEntityIdentityAnchor(revision) {
    const core = entityIdentityAnchorCoreSchema.parse({
        anchor_contract: "sourcey.entity-identity-anchor/v1alpha1",
        entity_id: revision.entity_id,
        name: revision.content.name,
        primary_domain: currentEntityPrimaryDomain(revision),
    });
    return entityIdentityAnchorSchema.parse({ ...core, identity_epoch_digest: digest(core) });
}
export function validateAssuranceMethodPolicy(input) {
    const policy = assuranceMethodPolicySchema.parse(input);
    const { policy_digest: policyDigest, ...core } = policy;
    if (digest(assuranceMethodPolicyCoreSchema.parse(core)) !== policyDigest) {
        throw new Error("Assurance method policy is not content-addressed correctly.");
    }
    return policy;
}
export function deriveEntityIdentityAssurance(input) {
    const anchor = deriveEntityIdentityAnchor(input.revision);
    const candidates = input.events
        .filter((event) => event.kind === "entity.identity-checked" &&
        event.subject.subject_type === "entity" &&
        event.subject.entity_id === input.revision.entity_id &&
        !input.inactiveEventIds.has(event.event_id))
        .map((event) => ({ event, payload: entityIdentityCheckedPayloadSchema.parse(event.payload) }))
        .filter(({ payload }) => payload.identity_epoch_digest === anchor.identity_epoch_digest)
        .sort(compareAssuranceEvents);
    const active = candidates.at(-1);
    if (!active)
        return undefined;
    return {
        status: "verified",
        assurance_id: active.payload.assurance_id,
        verified_at: active.payload.checked_at,
        identity_epoch_digest: anchor.identity_epoch_digest,
        method_policy_digest: active.payload.method_policy_digest,
        coverage_policy_digest: active.payload.coverage_policy_digest,
        event_id: active.event.event_id,
        receipt_digest: active.payload.receipt_digest,
    };
}
export function deriveOfferTermsAssurance(input) {
    const candidates = input.events
        .filter((event) => event.kind === "offer.terms-checked" &&
        event.subject.subject_type === "offer" &&
        event.subject.entity_id === input.revision.entity_id &&
        event.subject.offer_id === input.revision.offer_id &&
        event.subject.revision_digest === input.revision.revision_digest &&
        !input.inactiveEventIds.has(event.event_id))
        .map((event) => ({ event, payload: offerTermsCheckedPayloadSchema.parse(event.payload) }))
        .sort(compareAssuranceEvents);
    const active = candidates.at(-1);
    if (!active)
        return undefined;
    return {
        status: "checked",
        assurance_id: active.payload.assurance_id,
        checked_at: active.payload.checked_at,
        revision_digest: input.revision.revision_digest,
        method_policy_digest: active.payload.method_policy_digest,
        coverage_policy_digest: active.payload.coverage_policy_digest,
        event_id: active.event.event_id,
        receipt_digest: active.payload.receipt_digest,
    };
}
function compareAssuranceEvents(left, right) {
    return (compareInstants(left.payload.checked_at, right.payload.checked_at) ||
        compareCanonicalStrings(left.event.event_id, right.event.event_id));
}
//# sourceMappingURL=index.js.map