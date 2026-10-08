import { extname, isAbsolute } from "node:path";
import { compareCanonicalStrings } from "provenry/primitives";
import { parse } from "yaml";
import { contributionEntityAuthoringSchema, entityAuthoringSchema, } from "../../../contracts/authoring/src/index.js";
/** Canonical parsing and cross-document identity validation for authoring bytes. */
export function parseCatalogAuthoringSources(sources, options = {}) {
    const ordered = [...sources].sort((left, right) => compareCanonicalStrings(left.source, right.source));
    if (new Set(ordered.map(({ source }) => source)).size !== ordered.length) {
        throw new Error("Authoring source selection contains a duplicate path.");
    }
    const entries = ordered.map(({ source, content }) => parseCatalogAuthoringSource(source, content));
    assertCatalogAuthoringIdentity(entries, options.allowExternalRoleEntities ?? false);
    return entries;
}
function parseCatalogAuthoringSource(source, content) {
    if (isAbsolute(source) ||
        source.includes("\\") ||
        source.split("/").some((part) => part === "" || part === "." || part === "..") ||
        ![".yaml", ".yml"].includes(extname(source))) {
        throw new Error(`Authoring selection is not a safe relative YAML file: ${source}.`);
    }
    const value = entityAuthoringSchema.parse(parse(content));
    const expected = `${value.entity.slug.slice(0, 2)}/${value.entity.slug}${extname(source)}`;
    if (source !== expected) {
        throw new Error(`Entity '${value.entity.slug}' must be stored at entities/${expected}.`);
    }
    return { source, value };
}
export function assertCatalogAuthoringIdentity(entries, allowExternalRoleEntities) {
    const entityIds = new Map();
    const slugs = new Map();
    const programIds = new Map();
    const offerIds = new Map();
    const currentDomains = new Map();
    for (const { source, value } of entries) {
        unique(entityIds, value.entity.entity_id, source, "entity ID");
        for (const candidate of [value.entity.slug, ...value.entity.slug_aliases]) {
            unique(slugs, candidate, source, "entity slug or alias");
        }
        for (const domain of value.entity.domains.filter((candidate) => candidate.valid_until === undefined)) {
            unique(currentDomains, domain.value.toLowerCase(), source, "current domain");
        }
        for (const program of value.programs) {
            unique(programIds, program.program_id, source, "program ID");
        }
        for (const offer of value.offers) {
            unique(offerIds, offer.offer_id, source, "offer ID");
        }
    }
    for (const { source, value } of entries) {
        for (const offer of value.offers) {
            for (const roleEntityId of [
                offer.roles.terms_authority_entity_id,
                offer.roles.access_operator_entity_id,
            ]) {
                if (!entityIds.has(roleEntityId) && !allowExternalRoleEntities) {
                    throw new Error(`Offer '${offer.offer_id}' in ${source} references unknown role entity '${roleEntityId}'.`);
                }
            }
        }
    }
}
/**
 * Canonical non-Git validation for explicit Catalog authoring bytes. Git
 * changed-path isolation and release admission remain transport adapters.
 */
export function validateCatalogCandidateSources(input) {
    return inspectCatalogCandidateSources(input).summary;
}
export function inspectCatalogCandidateSources(input) {
    const entries = parseCatalogAuthoringSources(input.sources, {
        allowExternalRoleEntities: true,
    });
    assertCatalogTaxonomy(entries.map(({ value }) => value), input.taxonomy);
    return {
        entries,
        summary: {
            entities: entries.length,
            programs: entries.flatMap(({ value }) => value.programs).length,
            offers: entries.flatMap(({ value }) => value.offers).length,
        },
    };
}
export function assertCatalogTaxonomy(values, taxonomy) {
    const allowed = new Set(taxonomy.categories);
    for (const value of values) {
        if (!allowed.has(value.entity.category)) {
            throw new Error(`Catalog category '${value.entity.category}' for Entity '${value.entity.slug}' is not canonical. Choose one of: ${taxonomy.categories.join(", ")}.`);
        }
    }
}
/** Apply rules that belong to public contributions, not retained or hosted authoring. */
export function assertCatalogContributionAuthoring(values) {
    for (const value of values) {
        contributionEntityAuthoringSchema.parse(value);
    }
}
function unique(seen, value, source, label) {
    const prior = seen.get(value);
    if (prior)
        throw new Error(`Duplicate ${label} '${value}' in ${prior} and ${source}.`);
    seen.set(value, source);
}
//# sourceMappingURL=index.js.map