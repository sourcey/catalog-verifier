import { compareCanonicalStrings } from "provenry/primitives";
import { catalogPublicationDependencyKey, catalogSourceLocatorDigest, } from "../../catalog-admission/src/publication-dependencies.js";
function agentReadinessProfileDependencyKey(profileId) {
    return `agent-readiness:profile:${profileId}`;
}
export function agentReadinessDependencySubject(profile) {
    return {
        profileId: profile.agent_readiness_profile_id,
        profileRevisionDigest: profile.revision_digest,
        entityId: profile.entity_id,
        entityRevisionDigest: profile.catalog_binding.entity_revision_digest,
        evidenceEventIds: profile.provenance.basis_event_ids,
        declarationRevisionDigest: profile.declaration_revision_digest,
        sourceLocatorDigests: orderedUnique([
            ...profile.surface_catalog.resources.map((resource) => resource.uri),
            ...profile.surface_catalog.endpoints.map((endpoint) => endpoint.uri),
        ].map(catalogSourceLocatorDigest)),
    };
}
export function agentReadinessDependencyRegistration(subject) {
    const keys = [
        catalogPublicationDependencyKey.revision(subject.profileRevisionDigest),
        catalogPublicationDependencyKey.subject("entity", subject.entityId),
        catalogPublicationDependencyKey.revision(subject.entityRevisionDigest),
        // No policy key: a profile records the policy it was graded under, and a
        // pin change governs future grading without rewriting any profile.
        ...subject.evidenceEventIds.map(catalogPublicationDependencyKey.event),
        ...subject.sourceLocatorDigests.map(catalogPublicationDependencyKey.sourceLocator),
        `agent-readiness:declaration:${subject.declarationRevisionDigest}`,
    ];
    return {
        dependent: { domain: "agent-readiness", key: subject.profileId },
        dependency_keys: orderedUnique(keys),
    };
}
export function agentReadinessOfferRelationDependencySubject(relation) {
    return {
        relationId: relation.relation_id,
        profileId: relation.agent_readiness_profile_id,
        offerId: relation.offer_id,
        offerRevisionDigest: relation.admitted_offer_revision_digest,
        declarationRevisionDigest: relation.declaration_revision_digest,
    };
}
export function agentReadinessOfferRelationDependencyRegistration(subject) {
    return {
        dependent: { domain: "agent-readiness-offer-relation", key: subject.relationId },
        dependency_keys: orderedUnique([
            agentReadinessProfileDependencyKey(subject.profileId),
            catalogPublicationDependencyKey.subject("offer", subject.offerId),
            catalogPublicationDependencyKey.revision(subject.offerRevisionDigest),
            `agent-readiness:declaration:${subject.declarationRevisionDigest}`,
        ]),
    };
}
function orderedUnique(values) {
    return [...new Set(values)].sort(compareCanonicalStrings);
}
//# sourceMappingURL=impact.js.map