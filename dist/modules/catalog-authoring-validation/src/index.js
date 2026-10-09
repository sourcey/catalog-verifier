import { extname, isAbsolute } from "node:path";
import { compareCanonicalStrings } from "provenry/primitives";
import { parse } from "yaml";
import { contributionEntityAuthoringSchema, entityAuthoringSchema, } from "../../../contracts/authoring/src/index.js";
/**
 * Authoring that breaks a rule about its own content, naming its file and, when there is one, its
 * field. It is its author's to fix; any other failure here is not.
 */
export class CatalogAuthoringError extends Error {
    source;
    field;
    name = "CatalogAuthoringError";
    constructor(message, source, field = null) {
        super(message);
        this.source = source;
        this.field = field;
    }
}
/** Two files claim one identity, `value`: `prior` first, then `claim`, each at its own field. */
export class CatalogAuthoringDuplicateError extends CatalogAuthoringError {
    label;
    value;
    prior;
    claim;
    constructor(label, value, prior, claim) {
        super(`Duplicate ${label} '${value}' in ${prior.source} and ${claim.source}.`, claim.source, claim.field);
        this.label = label;
        this.value = value;
        this.prior = prior;
        this.claim = claim;
    }
}
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
        throw new CatalogAuthoringError(`Authoring selection is not a safe relative YAML file: ${source}.`, source);
    }
    const value = entityAuthoringSchema.parse(parse(content));
    const expected = `${value.entity.slug.slice(0, 2)}/${value.entity.slug}${extname(source)}`;
    if (source !== expected) {
        throw new CatalogAuthoringError(`Entity '${value.entity.slug}' must be stored at entities/${expected}.`, source, "entity.slug");
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
        unique(entityIds, value.entity.entity_id, source, "entity ID", "entity.entity_id");
        unique(slugs, value.entity.slug, source, "entity slug or alias", "entity.slug");
        value.entity.slug_aliases.forEach((alias, index) => {
            unique(slugs, alias, source, "entity slug or alias", `entity.slug_aliases[${index}]`);
        });
        value.entity.domains.forEach((domain, index) => {
            if (domain.valid_until !== undefined)
                return;
            const field = `entity.domains[${index}].value`;
            unique(currentDomains, domain.value.toLowerCase(), source, "current domain", field);
        });
        value.programs.forEach((program, index) => {
            unique(programIds, program.program_id, source, "program ID", `programs[${index}].program_id`);
        });
        value.offers.forEach((offer, index) => {
            unique(offerIds, offer.offer_id, source, "offer ID", `offers[${index}].offer_id`);
        });
    }
    for (const { source, value } of entries) {
        for (const offer of value.offers) {
            for (const roleEntityId of [
                offer.roles.terms_authority_entity_id,
                offer.roles.access_operator_entity_id,
            ]) {
                if (!entityIds.has(roleEntityId) && !allowExternalRoleEntities) {
                    throw new CatalogAuthoringError(`Offer '${offer.offer_id}' in ${source} references unknown role entity '${roleEntityId}'.`, source, `offers[${value.offers.indexOf(offer)}].roles`);
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
            throw new CatalogAuthoringError(`Catalog category '${value.entity.category}' for Entity '${value.entity.slug}' is not canonical. Choose one of: ${taxonomy.categories.join(", ")}.`, null, "entity.category");
        }
    }
}
/** Apply rules that belong to public contributions, not retained or hosted authoring. */
export function assertCatalogContributionAuthoring(values) {
    for (const value of values) {
        contributionEntityAuthoringSchema.parse(value);
    }
}
function unique(seen, value, source, label, field) {
    const prior = seen.get(value);
    if (prior)
        throw new CatalogAuthoringDuplicateError(label, value, prior, { source, field });
    seen.set(value, { source, field });
}
//# sourceMappingURL=index.js.map