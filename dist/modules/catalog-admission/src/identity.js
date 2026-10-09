import { resolve } from "node:path";
import { compareCanonicalStrings, mapLimit } from "provenry/primitives";
import { parse } from "yaml";
import { CatalogAuthoringDuplicateError } from "../../catalog-authoring-validation/src/index.js";
import { ENTITY_ID_PATTERN } from "../../catalog-primitives/src/index.js";
import { compileAuthoringSources } from "../../compiler/src/index.js";
import { CatalogContributionError } from "./contribution.js";
import { entityPath, entityPathOf, git, gitSourceAtRevision, repositoryPath, } from "./repository.js";
/** Git binds a file to one identity; its old payload is not the semantic parent. */
export async function assertFileIdentityContinuity(input) {
    await mapLimit(input.changedAuthoring.entities, 8, async (entity) => {
        const entityId = entity.revision.entity_id;
        const sourceFile = input.changedAuthoring.sourceFiles.get(entityId);
        if (!sourceFile)
            throw new Error(`Changed Entity '${entityId}' has no source file.`);
        const source = await gitSourceAtRevision({
            repositoryRoot: input.repositoryRoot,
            revision: input.baseRevision,
            sourceFile,
        });
        if (source === null)
            return;
        const parsed = parse(source);
        const priorEntity = typeof parsed === "object" && parsed !== null && "entity" in parsed ? parsed.entity : null;
        const priorId = typeof priorEntity === "object" && priorEntity !== null && "entity_id" in priorEntity
            ? priorEntity.entity_id
            : null;
        if (typeof priorId !== "string" || !ENTITY_ID_PATTERN.test(priorId)) {
            throw new CatalogContributionError("person", [
                {
                    file: entityPath(sourceFile),
                    field: "entity.entity_id",
                    message: "Its earlier version has no valid company ID, so a maintainer reviews it.",
                },
            ]);
        }
        if (priorId !== entityId) {
            throw new CatalogContributionError("revise", [
                {
                    file: entityPath(sourceFile),
                    field: "entity.entity_id",
                    message: `This file is company '${priorId}'; keep its entity_id, and add a new company in its own file.`,
                },
            ]);
        }
    });
}
/**
 * The unchanged files that own an identity the changed files name, at any of `revisions`: each is
 * read at the revision it was found in, so a company only one revision lists is still found.
 */
export async function identityDependencyFiles(input) {
    const needles = identityNeedles(input.changedAuthoring);
    if (needles.length === 0)
        return [];
    const revisions = [...new Set(input.revisions)];
    const authoringPath = repositoryPath(input.repositoryRoot, input.authoringRoot);
    // Whole values only, in any case: domain needles are lower-cased, authoring need not be.
    const arguments_ = [
        "grep",
        "-l",
        "-F",
        "-w",
        "-i",
        ...needles.flatMap((value) => ["-e", value]),
        ...revisions,
        "--",
        authoringPath,
    ];
    let stdout = "";
    try {
        stdout = await git(input.repositoryRoot, arguments_, 16 * 1024 * 1024);
    }
    catch (error) {
        if (error.code !== 1)
            throw error;
    }
    const changed = new Set(input.changedFiles);
    const candidates = stdout
        .split("\n")
        .filter(Boolean)
        .map((line) => {
        const revision = revisions.find((candidate) => line.startsWith(`${candidate}:`));
        if (!revision) {
            throw new Error("Git identity lookup returned a path outside the requested revisions.");
        }
        const path = repositoryPath(input.authoringRoot, resolve(input.repositoryRoot, line.slice(revision.length + 1)));
        return { revision, path };
    })
        .filter(({ path }) => !changed.has(path))
        .sort((left, right) => compareCanonicalStrings(left.path, right.path) ||
        compareCanonicalStrings(left.revision, right.revision));
    const needlesByIdentity = new Set(needles);
    const owners = await mapLimit(candidates, 8, async ({ revision, path }) => {
        const content = await gitSourceAtRevision({
            repositoryRoot: input.repositoryRoot,
            revision,
            sourceFile: path,
        });
        if (content === null)
            throw new Error(`Git listed ${path} at a revision without it.`);
        const facts = compileAuthoringSources([{ source: path, content }], {
            allowExternalRoleEntities: true,
        });
        return ownedIdentityKeys(facts).some((key) => needlesByIdentity.has(key)) ? path : null;
    });
    return [...new Set(owners.filter((path) => path !== null))];
}
/**
 * A changed file that claims an identity an unchanged company already owns is its contributor's to
 * change; a collision between two unchanged files is Sourcey's own and stays an error.
 */
export function changedIdentityCollision(error, changedFiles) {
    if (!(error instanceof CatalogAuthoringDuplicateError))
        return error;
    const changed = new Set(changedFiles);
    const mine = [error.prior, error.claim].find(({ source }) => changed.has(source));
    if (!mine)
        return error;
    const theirs = mine === error.prior ? error.claim : error.prior;
    return new CatalogContributionError("revise", [
        {
            file: entityPath(mine.source),
            field: mine.field,
            message: `Its ${error.label} '${error.value}' already belongs to ${entityPath(theirs.source)}. Use another, or change that company's file instead.`,
        },
    ]);
}
/** Every offer the changed files carry names companies the closure lists. */
export function assertChangedRoleClosure(changed, closure) {
    const entityIds = new Set(closure.entities.map((entity) => entity.revision.entity_id));
    for (const entity of changed.entities) {
        for (const offer of entity.offers) {
            for (const roleEntityId of [
                offer.revision.content.roles.terms_authority_entity_id,
                offer.revision.content.roles.access_operator_entity_id,
            ]) {
                if (!entityIds.has(roleEntityId)) {
                    throw new CatalogContributionError("revise", [
                        {
                            file: entityPathOf(changed.sourceFiles.get(entity.revision.entity_id)),
                            field: null,
                            message: `Offer '${offer.revision.offer_id}' names company '${roleEntityId}', which Sourcey doesn't list. Use the entity_id of a company in entities/.`,
                        },
                    ]);
                }
            }
        }
    }
}
function ownedIdentityKeys(facts) {
    return [
        ...new Set(facts.entities.flatMap((entity) => [
            entity.revision.entity_id,
            entity.slug,
            ...entity.slugAliases,
            ...entity.revision.content.domains
                .filter((domain) => domain.valid_until === undefined)
                .map((domain) => domain.value.toLowerCase()),
            ...entity.programs.map((program) => program.revision.program_id),
            ...entity.offers.map((offer) => offer.revision.offer_id),
        ])),
    ].sort(compareCanonicalStrings);
}
function identityNeedles(facts) {
    return [
        ...new Set([
            ...ownedIdentityKeys(facts),
            ...facts.entities.flatMap((entity) => entity.offers.flatMap((offer) => [
                offer.revision.content.roles.terms_authority_entity_id,
                offer.revision.content.roles.access_operator_entity_id,
            ])),
        ]),
    ].sort(compareCanonicalStrings);
}
//# sourceMappingURL=identity.js.map