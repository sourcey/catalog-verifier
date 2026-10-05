import { compareCanonicalStrings, IDENTIFIER_PATTERN, SLUG_PATTERN, visitStrings, } from "provenry/primitives";
import { z } from "zod";
import { ENTITY_ID_PATTERN, OFFER_ID_PATTERN, PROGRAM_ID_PATTERN, } from "../../../modules/catalog-primitives/src/index.js";
import { accessSchema, catalogAccessUrlSchema, catalogAuthoringUrlSchema, catalogUrlSchema, domainSchema, economicsSchema, eligibilitySchema, entityOfficialSiteProblem, entityRevisionContentSchema, entitySynopsisInvariant, offerRevisionContentSchema, offerRolesSchema, programRevisionContentSchema, } from "../../revisions/src/index.js";
const entityId = z.string().regex(ENTITY_ID_PATTERN);
const programId = z.string().regex(PROGRAM_ID_PATTERN);
const offerId = z.string().regex(OFFER_ID_PATTERN);
const identifier = z.string().regex(IDENTIFIER_PATTERN);
const slug = z.string().regex(SLUG_PATTERN);
const publicAccessInstructions = accessSchema.shape.instructions.refine((value) => value === undefined || !/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/iu.test(value), "Public Catalog access instructions must not contain an email address; keep the clean vendor page URL and contact method instead.");
const authoringAccessSchema = accessSchema.safeExtend({
    url: catalogAccessUrlSchema.optional(),
    instructions: publicAccessInstructions,
});
export const retainedAuthoringSourceSchema = z
    .object({
    source_id: identifier,
    url: catalogUrlSchema,
})
    .strict();
export const authoringSourceSchema = retainedAuthoringSourceSchema.safeExtend({
    url: catalogAuthoringUrlSchema,
});
function validateEntityIdentity(entity, context) {
    const currentPrimary = entity.domains.filter((domain) => domain.role === "primary" && domain.valid_until === undefined);
    if (currentPrimary.length !== 1) {
        context.addIssue({
            code: "custom",
            path: ["domains"],
            message: "Exactly one current primary domain is required.",
        });
    }
}
const entitySubjectFields = {
    entity_id: entityId,
    slug,
    slug_aliases: z.array(slug).default([]),
    name: z.string().min(1),
    domains: z.array(domainSchema).min(1),
    category: slug,
};
export const retainedEntityIdentityAuthoringSchema = z
    .object({
    ...entitySubjectFields,
})
    .strict()
    .superRefine(validateEntityIdentity);
export const entityIdentityAuthoringSchema = retainedEntityIdentityAuthoringSchema;
export const retainedEntityProfileAuthoringSchema = z
    .object({
    summary: entityRevisionContentSchema.shape.summary,
    description: entityRevisionContentSchema.shape.description,
    links: z
        .object({
        site: catalogUrlSchema,
        pricing: catalogUrlSchema.optional(),
    })
        .strict(),
})
    .strict()
    .superRefine(entitySynopsisInvariant);
export const entityProfileAuthoringSchema = retainedEntityProfileAuthoringSchema.safeExtend({
    links: z
        .object({
        site: catalogAuthoringUrlSchema,
        pricing: catalogAuthoringUrlSchema.optional(),
    })
        .strict(),
});
/**
 * An offer's evidence basis is exactly one of two shapes: observed, carrying
 * source_ids into the evidence pipeline, or declared, carrying no sources
 * because a revision-pinned Entity attestation is the evidence. The declared
 * shape is reserved for the hosted authority lane; contribution intake
 * rejects it (see contributionEntityAuthoringSchema).
 */
function offerEvidenceBasisInvariant(offer, context) {
    const sourced = offer.source_ids !== undefined;
    const declared = offer.declared === true;
    if (sourced === declared) {
        context.addIssue({
            code: "custom",
            path: [sourced ? "declared" : "source_ids"],
            message: "An offer carries either source_ids or declared: true, exactly one.",
        });
    }
}
const retainedAuthoringOfferObject = z
    .object({
    offer_id: offerId,
    program_id: programId.optional(),
    offer_slug: slug,
    offer_slug_aliases: z.array(slug).default([]),
    title: offerRevisionContentSchema.shape.title,
    summary: offerRevisionContentSchema.shape.summary,
    description: offerRevisionContentSchema.shape.description,
    lifecycle: offerRevisionContentSchema.shape.lifecycle,
    economics: economicsSchema,
    eligibility: eligibilitySchema,
    roles: offerRolesSchema,
    access: accessSchema,
    terms_url: offerRevisionContentSchema.shape.terms_url,
    source_ids: z.array(identifier).min(1).optional(),
    declared: z.literal(true).optional(),
})
    .strict();
const retainedAuthoringOfferSchema = retainedAuthoringOfferObject.superRefine(offerEvidenceBasisInvariant);
export const authoringOfferSchema = retainedAuthoringOfferObject
    .safeExtend({
    access: authoringAccessSchema,
    terms_url: catalogAuthoringUrlSchema.optional(),
})
    .superRefine(offerEvidenceBasisInvariant);
export const authoringProgramSchema = z
    .object({
    program_id: programId,
    program_slug: slug,
    program_slug_aliases: z.array(slug).default([]),
    title: programRevisionContentSchema.shape.title,
    summary: programRevisionContentSchema.shape.summary,
    source_ids: z.array(identifier).min(1),
})
    .strict();
export const retainedEntityAuthoringSchema = z
    .object({
    schema_version: z.literal("sourcey.entity-authoring/v1alpha1"),
    entity: retainedEntityIdentityAuthoringSchema,
    profile: retainedEntityProfileAuthoringSchema,
    sources: z.array(retainedAuthoringSourceSchema).min(1),
    programs: z.array(authoringProgramSchema),
    offers: z.array(retainedAuthoringOfferSchema),
})
    .strict()
    .superRefine((authoring, context) => {
    if (entityOfficialSiteProblem(authoring.entity.domains, authoring.profile.links.site) ===
        "site-outside-current-domains") {
        context.addIssue({
            code: "custom",
            path: ["profile", "links", "site"],
            message: "The official site must use a current Entity domain or one of its subdomains.",
        });
    }
    const sourceIds = new Set(authoring.sources.map((source) => source.source_id));
    const programIds = new Set();
    const programSlugs = new Set();
    for (const [programIndex, program] of authoring.programs.entries()) {
        assertUnique(programIds, program.program_id, context, ["programs", programIndex, "program_id"], "Program IDs must be unique inside an Entity declaration.");
        for (const candidate of [program.program_slug, ...program.program_slug_aliases]) {
            assertUnique(programSlugs, candidate, context, ["programs", programIndex, "program_slug"], "Program slugs and aliases must be unique inside an Entity declaration.");
        }
        assertKnownSources(program.source_ids, sourceIds, context, ["programs", programIndex]);
    }
    const offerIds = new Set();
    const offerSlugs = new Set();
    for (const [offerIndex, offer] of authoring.offers.entries()) {
        assertUnique(offerIds, offer.offer_id, context, ["offers", offerIndex, "offer_id"], "Offer IDs must be unique inside an Entity declaration.");
        for (const candidate of [offer.offer_slug, ...offer.offer_slug_aliases]) {
            assertUnique(offerSlugs, candidate, context, ["offers", offerIndex, "offer_slug"], "Offer slugs and aliases must be unique inside an Entity declaration.");
        }
        if (offer.program_id !== undefined && !programIds.has(offer.program_id)) {
            context.addIssue({
                code: "custom",
                path: ["offers", offerIndex, "program_id"],
                message: `Unknown program_id '${offer.program_id}'.`,
            });
        }
        if (offer.source_ids !== undefined) {
            assertKnownSources(offer.source_ids, sourceIds, context, ["offers", offerIndex]);
        }
    }
});
export const entityAuthoringSchema = retainedEntityAuthoringSchema.safeExtend({
    entity: entityIdentityAuthoringSchema,
    profile: entityProfileAuthoringSchema,
    sources: z.array(authoringSourceSchema).min(1),
    offers: z.array(authoringOfferSchema),
});
// Contribution intake only. Release delta objects parse admitted history with
// entityAuthoringSchema, and history published before this bar may contain
// em dashes, so the content rule must not attach to the shared schema.
export const contributionEntityAuthoringSchema = entityAuthoringSchema.superRefine((authoring, context) => {
    visitStrings(authoring, (text, path) => {
        if (text.includes("—")) {
            context.addIssue({
                code: "custom",
                path: [...path],
                message: "Em dashes are not allowed in authored content.",
            });
        }
    });
    for (const [offerIndex, offer] of authoring.offers.entries()) {
        if (offer.declared === true) {
            context.addIssue({
                code: "custom",
                path: ["offers", offerIndex, "declared"],
                message: "Declared offers are a hosted Entity-attestation lane; contributions carry source_ids.",
            });
        }
    }
});
export function parseEntityAuthoring(input) {
    return entityAuthoringSchema.parse(input);
}
/**
 * The one canonical order of an Entity's domains. Authoring order carries no
 * meaning (the primary is marked by role), so every compiled revision and every
 * identity comparison sorts by value, then role, then validity start.
 */
export function canonicalEntityDomains(domains) {
    return [...domains].sort((left, right) => compareCanonicalStrings(left.value, right.value) ||
        compareCanonicalStrings(left.role, right.role) ||
        compareCanonicalStrings(left.valid_from, right.valid_from));
}
/**
 * The one shared Entity identity envelope in its canonical order. Authoring
 * files, retained Catalog documents and declaration repositories may each
 * list the same aliases and domains differently; identity digests and
 * identity comparisons read this form so order never separates one identity
 * into two.
 */
export function canonicalEntityIdentity(identity) {
    const parsed = entityIdentityAuthoringSchema.parse(identity);
    return entityIdentityAuthoringSchema.parse({
        ...parsed,
        slug_aliases: [...parsed.slug_aliases].sort(compareCanonicalStrings),
        domains: canonicalEntityDomains(parsed.domains),
    });
}
function assertUnique(seen, value, context, path, message) {
    if (seen.has(value))
        context.addIssue({ code: "custom", path, message });
    seen.add(value);
}
function assertKnownSources(candidates, sourceIds, context, path) {
    for (const sourceId of candidates) {
        if (!sourceIds.has(sourceId)) {
            context.addIssue({
                code: "custom",
                path: [...path, "source_ids"],
                message: `Unknown source_id '${sourceId}'.`,
            });
        }
    }
}
//# sourceMappingURL=index.js.map