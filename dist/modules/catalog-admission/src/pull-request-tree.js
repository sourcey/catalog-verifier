import { execFile } from "node:child_process";
import { resolve } from "node:path";
import { promisify } from "node:util";
import { assertExactGitCheckout, gitComparisonBase } from "provenry/git";
import { compareCanonicalStrings } from "provenry/primitives";
import { assertCatalogContributionAuthoring, assertCatalogTaxonomy, } from "../../catalog-authoring-validation/src/index.js";
import { compileAuthoringFiles } from "../../compiler/src/index.js";
import { assertChangedRoleClosure, assertFileIdentityContinuity, identityDependencyFiles, } from "./identity.js";
import { assertGitRevision, CATALOG_ENTITY_ROOT, repositoryPath, resolveInside, } from "./repository.js";
/**
 * A pull request's changed tree as the public verifier and Sourcey's admission both read it: its
 * changed paths, its strict changed authoring and that authoring's identity closure. The verifier
 * imports this module alone, so admission's other work never ships inside it.
 */
const execFileAsync = promisify(execFile);
export async function validateCatalogPrTree(input) {
    const inspection = await inspectCatalogPrTree(input);
    return {
        entities: inspection.entities,
        programs: inspection.programs,
        offers: inspection.offers,
    };
}
export function assertCatalogContributionSelection(unsupportedChanges, authoring) {
    if (unsupportedChanges.length > 0) {
        throw new Error(`Unsupported Entity change status ${unsupportedChanges.join(", ")}.`);
    }
    assertCatalogContributionAuthoring(authoring);
}
/**
 * Validate strict changed-head authoring and Git scope for public PR intake.
 * Historical Git supplies file identity only, never the semantic parent.
 */
export async function inspectCatalogPrTree(input) {
    const baseRevision = await catalogPullRequestComparisonBase(input);
    const { changes, changedAuthoring } = await catalogChangedHeadClosure({ ...input, baseRevision }, true);
    assertCatalogContributionSelection(changes.unsupportedChanges, changedAuthoring.authoring);
    await assertFileIdentityContinuity({
        repositoryRoot: input.repositoryRoot,
        baseRevision,
        changedAuthoring,
    });
    return {
        baseRevision,
        entityFiles: changes.entityFiles,
        identities: changedAuthoring.authoring.map(({ entity }) => entity),
        entities: changedAuthoring.entities.length,
        programs: changedAuthoring.entities.flatMap((entity) => entity.programs).length,
        offers: changedAuthoring.entities.flatMap((entity) => entity.offers).length,
    };
}
/** Read the strict head authoring and its identity closure without interpreting old Git YAML. */
export async function inspectCatalogReleaseHead(input) {
    const { changes, changedAuthoring, identityClosure } = await catalogChangedHeadClosure(input, false);
    return {
        entityFiles: changes.entityFiles,
        unsupportedChanges: changes.unsupportedChanges,
        changedAuthoring,
        identityClosure,
    };
}
async function catalogChangedHeadClosure(input, rejectMixedPullRequest) {
    const repositoryRoot = resolve(input.repositoryRoot);
    await assertExactGitCheckout(repositoryRoot, input.headRevision);
    const authoringRoot = resolveInside(repositoryRoot, CATALOG_ENTITY_ROOT);
    const changes = await catalogChangedPaths({
        repositoryRoot,
        baseRevision: input.baseRevision,
        headRevision: input.headRevision,
    });
    if (rejectMixedPullRequest && changes.entityFiles.length > 0 && changes.otherFiles.length > 0) {
        throw new Error(`Catalog data changes cannot be mixed with other repository paths: ${changes.otherFiles.join(", ")}.`);
    }
    const changedFiles = changes.entityFiles;
    const changedAuthoring = await compileAuthoringFiles(authoringRoot, changedFiles, {
        allowExternalRoleEntities: true,
    });
    assertCatalogTaxonomy(changedAuthoring.authoring, input.taxonomy);
    const dependencyFiles = await identityDependencyFiles({
        repositoryRoot,
        authoringRoot,
        revisions: [input.headRevision],
        changedFiles,
        changedAuthoring,
    });
    const identityClosure = await compileAuthoringFiles(authoringRoot, [...changedFiles, ...dependencyFiles], { allowExternalRoleEntities: true });
    assertChangedRoleClosure(changedAuthoring, identityClosure);
    return { changes, changedAuthoring, identityClosure };
}
export async function catalogPullRequestComparisonBase(input) {
    return gitComparisonBase(input);
}
export async function catalogChangedPaths(input) {
    assertGitRevision(input.baseRevision, "base");
    assertGitRevision(input.headRevision, "head");
    const authoringRoot = resolveInside(resolve(input.repositoryRoot), CATALOG_ENTITY_ROOT);
    const authoringPath = repositoryPath(input.repositoryRoot, authoringRoot);
    const { stdout } = await execFileAsync("git", [
        "diff",
        "--name-status",
        "-z",
        "--find-renames",
        "--find-copies-harder",
        input.baseRevision,
        input.headRevision,
    ], { cwd: input.repositoryRoot, encoding: "buffer", maxBuffer: 16 * 1024 * 1024 });
    const fields = stdout.toString("utf8").split("\0");
    if (fields.at(-1) === "")
        fields.pop();
    const entityFiles = new Set();
    const otherFiles = new Set();
    const unsupportedChanges = new Set();
    const touchedEntityFiles = new Set();
    const inEntityRoot = (candidate) => candidate === authoringPath || candidate?.startsWith(`${authoringPath}/`);
    for (let index = 0; index < fields.length;) {
        const status = fields[index++];
        if (!status)
            throw new Error("Git produced an incomplete catalog change record.");
        const kind = status.slice(0, 1);
        const oldPath = fields[index++];
        const path = kind === "R" || kind === "C" ? fields[index++] : oldPath;
        if (!path)
            throw new Error("Git produced an incomplete catalog change path.");
        // A copy leaves its source as it was; every other change touches both of its paths.
        for (const touched of kind === "C" ? [path] : [oldPath, path]) {
            if (touched && inEntityRoot(touched)) {
                touchedEntityFiles.add(repositoryPath(authoringRoot, resolve(input.repositoryRoot, touched)));
            }
        }
        if ([oldPath, path].some(inEntityRoot)) {
            // Renames, copies and deletions are contributor mistakes the scope
            // policy names, not analyzer failures.
            if (!["A", "M"].includes(kind)) {
                unsupportedChanges.add(`${status}:${path}`);
                continue;
            }
            entityFiles.add(repositoryPath(authoringRoot, resolve(input.repositoryRoot, path)));
            continue;
        }
        otherFiles.add(path);
    }
    return {
        entityFiles: [...entityFiles].sort(compareCanonicalStrings),
        otherFiles: [...otherFiles].sort(compareCanonicalStrings),
        unsupportedChanges: [...unsupportedChanges].sort(compareCanonicalStrings),
        touchedEntityFiles: [...touchedEntityFiles].sort(compareCanonicalStrings),
    };
}
//# sourceMappingURL=pull-request-tree.js.map