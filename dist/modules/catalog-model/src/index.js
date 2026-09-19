import { canonicalEntityDomains, } from "../../../contracts/authoring/src/index.js";
import { entityRevisionCoreSchema, entityRevisionSchema, offerRevisionCoreSchema, offerRevisionSchema, programRevisionCoreSchema, programRevisionSchema, } from "../../../contracts/revisions/src/index.js";
import { compareCanonicalStrings, digest } from "../../primitives/src/index.js";
function withDigest(core) {
    return { ...core, revision_digest: digest(core) };
}
export { canonicalEntityDomains } from "../../../contracts/authoring/src/index.js";
export function compileEntity(authoring) {
    const entity = authoring.entity;
    const profile = authoring.profile;
    const entityCore = entityRevisionCoreSchema.parse({
        revision_contract: "sourcey.entity-revision/v1alpha1",
        entity_id: entity.entity_id,
        content: {
            name: entity.name,
            ...(profile.summary ? { summary: profile.summary } : {}),
            description: profile.description,
            domains: canonicalEntityDomains(entity.domains),
            category: entity.category,
            links: profile.links,
        },
    });
    const entityRevision = entityRevisionSchema.parse(withDigest(entityCore));
    const programs = authoring.programs
        .map((program) => {
        const programCore = programRevisionCoreSchema.parse({
            revision_contract: "sourcey.program-revision/v1alpha1",
            entity_id: entity.entity_id,
            program_id: program.program_id,
            content: {
                title: program.title,
                ...(program.summary ? { summary: program.summary } : {}),
            },
        });
        return {
            revision: programRevisionSchema.parse(withDigest(programCore)),
            slug: program.program_slug,
            slugAliases: [...program.program_slug_aliases].sort(compareCanonicalStrings),
            sourceIds: [...program.source_ids].sort(compareCanonicalStrings),
        };
    })
        .sort((left, right) => compareCanonicalStrings(left.revision.program_id, right.revision.program_id));
    const offers = authoring.offers
        .map((offer) => {
        const offerCore = offerRevisionCoreSchema.parse({
            revision_contract: "sourcey.offer-revision/v1alpha1",
            entity_id: entity.entity_id,
            ...(offer.program_id ? { program_id: offer.program_id } : {}),
            offer_id: offer.offer_id,
            content: {
                title: offer.title,
                summary: offer.summary,
                ...(offer.description ? { description: offer.description } : {}),
                lifecycle: offer.lifecycle,
                economics: offer.economics,
                eligibility: offer.eligibility,
                roles: offer.roles,
                access: offer.access,
                ...(offer.terms_url ? { terms_url: offer.terms_url } : {}),
            },
        });
        return {
            revision: offerRevisionSchema.parse(withDigest(offerCore)),
            slug: offer.offer_slug,
            slugAliases: [...offer.offer_slug_aliases].sort(compareCanonicalStrings),
            sourceIds: [...(offer.source_ids ?? [])].sort(compareCanonicalStrings),
            declared: offer.declared === true,
        };
    })
        .sort((left, right) => compareCanonicalStrings(left.revision.offer_id, right.revision.offer_id));
    return {
        revision: entityRevision,
        slug: entity.slug,
        slugAliases: [...entity.slug_aliases].sort(compareCanonicalStrings),
        sources: [...authoring.sources].sort((left, right) => compareCanonicalStrings(left.source_id, right.source_id)),
        programs,
        offers,
    };
}
//# sourceMappingURL=index.js.map