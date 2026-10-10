import { execFile } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";
import { assertExactGitCheckout, gitComparisonBase } from "provenry/git";
import { canonicalJson, compareCanonicalStrings } from "provenry/primitives";
import { assertCatalogContributionAuthoring, assertCatalogTaxonomy, } from "../../catalog-authoring-validation/src/index.js";
import { compileEntity } from "../../catalog-model/src/index.js";
import { compileAuthoringFiles, compileAuthoringSources, } from "../../compiler/src/index.js";
import { catalogChangedEntitiesFromCurrent, catalogChangedRevisions, } from "./change-analysis.js";
import { CatalogContributionError, changedAuthoringFindings } from "./contribution.js";
import { assertChangedRoleClosure, assertFileIdentityContinuity, changedIdentityCollision, identityDependencyFiles, } from "./identity.js";
import { buildPublicationIngressReceipt, planCatalogPublication, } from "./publication.js";
import { verifyCatalogPublicationCurrentState } from "./publication-state.js";
import { assertGitRevision, CATALOG_ENTITY_ROOT, entityPath, gitIsAncestor, gitRevision, gitSourceAtRevision, repositoryPath, resolveInside, } from "./repository.js";
const execFileAsync = promisify(execFile);
export { validateCatalogCandidateSources } from "../../catalog-authoring-validation/src/index.js";
export * from "./admission-conflicts.js";
export * from "./change-analysis.js";
export * from "./contribution.js";
export * from "./machine-admission.js";
export * from "./publication.js";
export * from "./publication-composition.js";
export { CATALOG_ENTITY_ROOT } from "./repository.js";
export * from "./submission.js";
export * from "./taxonomy.js";
/**
 * Resolve a deterministic Git tree containing only the exact changed Entity
 * files. This is the admission identity: unrelated repository and Catalog
 * changes cannot invalidate an independently reviewed pull request.
 */
export async function resolveCatalogChangeTree(input) {
    assertGitRevision(input.revision, "change-tree");
    if (input.entityFiles.length === 0) {
        throw new Error("Catalog change tree requires at least one changed Entity file.");
    }
    const repositoryRoot = resolve(input.repositoryRoot);
    const files = [...new Set(input.entityFiles)].sort(compareCanonicalStrings);
    const temporaryRoot = await mkdtemp(join(tmpdir(), "sourcey-catalog-change-tree-"));
    const environment = { ...process.env, GIT_INDEX_FILE: join(temporaryRoot, "index") };
    try {
        await execFileAsync("git", ["read-tree", "--empty"], {
            cwd: repositoryRoot,
            env: environment,
        });
        for (const file of files) {
            const repositoryFile = `${CATALOG_ENTITY_ROOT}/${file}`;
            const { stdout } = await execFileAsync("git", ["rev-parse", `${input.revision}:${repositoryFile}`], {
                cwd: repositoryRoot,
                encoding: "utf8",
                maxBuffer: 4 * 1024 * 1024,
            });
            const blob = stdout.trim();
            assertGitRevision(blob, "changed Entity blob");
            await execFileAsync("git", ["update-index", "--add", "--cacheinfo", `100644,${blob},${file}`], { cwd: repositoryRoot, env: environment });
        }
        const { stdout } = await execFileAsync("git", ["write-tree"], {
            cwd: repositoryRoot,
            env: environment,
            encoding: "utf8",
            maxBuffer: 4 * 1024 * 1024,
        });
        const tree = stdout.trim();
        assertGitRevision(tree, "change-tree");
        return tree;
    }
    finally {
        await rm(temporaryRoot, { recursive: true, force: true });
    }
}
export async function validateCatalogPrTree(input) {
    const inspection = await inspectCatalogPrTree(input);
    return {
        entities: inspection.entities,
        programs: inspection.programs,
        offers: inspection.offers,
    };
}
/** Enforce the public contribution policy over the one shared PR analysis. */
function assertCatalogContributionAnalysis(analysis) {
    assertCatalogContributionSelection(analysis.unsupportedChanges, analysis.changedEntities.map(({ currentAuthoring }) => currentAuthoring));
}
function assertCatalogContributionSelection(unsupportedChanges, authoring) {
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
/**
 * Private PR admission compares the strict head with the materialized live
 * authoring slice. Git supplies scope and file identity, not the semantic parent.
 */
export async function analyzeCatalogPrAgainstCurrent(input) {
    const comparisonBase = await catalogPullRequestComparisonBase({
        repositoryRoot: input.repositoryRoot,
        baseRevision: input.pullRequestBaseRevision,
        headRevision: input.pullRequestHeadRevision,
    });
    await validateCatalogPrReleaseBase(input);
    const pullRequestChanges = await catalogChangedPaths({
        repositoryRoot: input.repositoryRoot,
        baseRevision: comparisonBase,
        headRevision: input.pullRequestHeadRevision,
    });
    // A publication lands company files alone, so a mixed head is split by its contributor.
    if (pullRequestChanges.entityFiles.length > 0 && pullRequestChanges.otherFiles.length > 0) {
        throw new CatalogContributionError("revise", [
            {
                file: null,
                field: null,
                message: `It changes company files together with ${pullRequestChanges.otherFiles.join(", ")}. Put the company files in a pull request of their own.`,
            },
        ]);
    }
    if (pullRequestChanges.unsupportedChanges.length > 0) {
        // No Git publication retires or re-identifies a company, so no person could admit this head.
        throw new CatalogContributionError("revise", pullRequestChanges.unsupportedChanges.map((change) => ({
            file: change.slice(change.indexOf(":") + 1),
            field: null,
            message: "Sourcey cannot publish a renamed, copied or deleted company file. Keep the file where it is and change only its contents.",
        })));
    }
    if (pullRequestChanges.entityFiles.length === 0) {
        throw new CatalogContributionError("person", [
            {
                file: null,
                field: null,
                message: "It changes no company file, so a maintainer reviews it.",
            },
        ], { mergeOnly: true });
    }
    await assertExactGitCheckout(resolve(input.repositoryRoot), input.pullRequestHeadRevision);
    const findings = await changedAuthoringFindings({
        authoringRoot: resolveInside(resolve(input.repositoryRoot), CATALOG_ENTITY_ROOT),
        changedFiles: pullRequestChanges.entityFiles,
        taxonomy: input.taxonomy,
    });
    if (findings.length > 0) {
        throw new CatalogContributionError("revise", findings.map((finding) => ({ ...finding, file: finding.file && entityPath(finding.file) })));
    }
    const authoringRoot = resolveInside(resolve(input.repositoryRoot), CATALOG_ENTITY_ROOT);
    const changedAuthoring = await compileAuthoringFiles(authoringRoot, pullRequestChanges.entityFiles, { allowExternalRoleEntities: true });
    // The companies a change names are found where the branch names them and where main lists
    // them now, so one main added since the branch is a dependency too.
    const dependencyFiles = await identityDependencyFiles({
        repositoryRoot: input.repositoryRoot,
        authoringRoot,
        revisions: [input.pullRequestHeadRevision, input.liveRevision],
        changedFiles: pullRequestChanges.entityFiles,
        changedAuthoring,
    });
    await Promise.all([comparisonBase, input.liveRevision].map((baseRevision) => assertFileIdentityContinuity({
        repositoryRoot: input.repositoryRoot,
        baseRevision,
        changedAuthoring,
    })));
    // A dependency the pull request does not change merges as it stands live, not as it stood when
    // the pull request branched. The changed files are judged against that live copy, so a company
    // edited on main since sends its contributor back only when their change no longer fits it.
    const read = (revision, sourceFile) => gitSourceAtRevision({ repositoryRoot: input.repositoryRoot, revision, sourceFile });
    const sources = await Promise.all([
        ...pullRequestChanges.entityFiles.map(async (source) => ({
            source,
            content: await read(input.pullRequestHeadRevision, source),
        })),
        ...dependencyFiles.map(async (source) => ({
            source,
            content: await read(input.liveRevision, source),
        })),
    ]);
    const removed = sources.filter(({ content }) => content === null).map(({ source }) => source);
    if (removed.length > 0) {
        throw new CatalogContributionError("revise", removed.map((source) => ({
            file: entityPath(source),
            field: null,
            message: "Your change refers to this company, which Sourcey no longer lists. Update your branch from main and push.",
        })));
    }
    let identityClosure;
    try {
        identityClosure = compileAuthoringSources(sources.map(({ source, content }) => ({ source, content: content })), { allowExternalRoleEntities: true });
    }
    catch (error) {
        throw changedIdentityCollision(error, pullRequestChanges.entityFiles);
    }
    assertChangedRoleClosure(changedAuthoring, identityClosure);
    const entityIds = identityClosure.entities
        .map(({ revision }) => revision.entity_id)
        .sort(compareCanonicalStrings);
    const state = verifyCatalogPublicationCurrentState(await input.readCurrentState(entityIds));
    const liveTree = await gitRevision(input.repositoryRoot, `${input.liveRevision}^{tree}`);
    if (canonicalJson(state.target_entity_ids) !== canonicalJson(entityIds) ||
        state.live_parent_release_id !== input.liveParentReleaseId ||
        state.git_cursor?.repository_id !== input.repositoryId ||
        state.git_cursor.head_commit !== input.liveRevision ||
        state.git_cursor.head_tree !== liveTree) {
        throw new Error("Catalog PR analysis did not receive the exact live authoring slice.");
    }
    const currentById = new Map(state.current_entities.map((entity) => [entity.entity.entity_id, entity]));
    // Read live, each dependency must be what live state publishes; a difference is Sourcey's own.
    for (const sourceFile of dependencyFiles) {
        const live = identityClosure.entities.find((entity) => identityClosure.sourceFiles.get(entity.revision.entity_id) === sourceFile);
        const published = live && currentById.get(live.revision.entity_id);
        if (!live || !published || canonicalJson(compileEntity(published)) !== canonicalJson(live)) {
            throw new Error(`Live Git and live state disagree on Catalog dependency ${sourceFile}.`);
        }
    }
    const changedEntities = catalogChangedEntitiesFromCurrent({
        currentEntities: state.current_entities,
        candidates: changedAuthoring,
    });
    return {
        baseRevision: input.liveRevision,
        entityFiles: pullRequestChanges.entityFiles,
        unsupportedChanges: [],
        changedEntities,
        changedRevisions: catalogChangedRevisions(changedEntities),
        closure: identityClosure,
        entities: changedAuthoring.entities.length,
        programs: changedAuthoring.entities.flatMap((entity) => entity.programs).length,
        offers: changedAuthoring.entities.flatMap((entity) => entity.offers).length,
    };
}
/**
 * Git is one immutable ingress adapter over the canonical publication port.
 * Repository objects remain receipt metadata; they do not alter semantic
 * proposal or Change Set bytes produced by another ingress for the same state.
 */
export async function planCatalogGitPublication(input) {
    const head = await inspectCatalogReleaseHead({
        repositoryRoot: input.repositoryRoot,
        baseRevision: input.liveRevision,
        headRevision: input.headRevision,
        taxonomy: input.taxonomy,
    });
    const changedEntities = catalogChangedEntitiesFromCurrent({
        currentEntities: input.currentEntities,
        candidates: head.changedAuthoring,
    });
    const analysis = {
        baseRevision: input.liveRevision,
        entityFiles: head.entityFiles,
        unsupportedChanges: head.unsupportedChanges,
        changedEntities,
        changedRevisions: catalogChangedRevisions(changedEntities),
        closure: head.identityClosure,
        entities: head.changedAuthoring.entities.length,
        programs: head.changedAuthoring.entities.flatMap((entity) => entity.programs).length,
        offers: head.changedAuthoring.entities.flatMap((entity) => entity.offers).length,
    };
    assertCatalogContributionAnalysis(analysis);
    const targetEntityIds = [
        ...new Set([
            ...analysis.changedEntities.map(({ currentAuthoring }) => currentAuthoring.entity.entity_id),
            ...(input.candidateAssetProposals ?? []).map(({ entity_id: entityId }) => entityId),
        ]),
    ].sort(compareCanonicalStrings);
    const suppliedCurrentEntityIds = input.currentEntities
        .map(({ entity: { entity_id: entityId } }) => entityId)
        .sort(compareCanonicalStrings);
    if (suppliedCurrentEntityIds.some((entityId) => !targetEntityIds.includes(entityId))) {
        throw new Error("Git publication current state exceeds its exact changed Entity slice.");
    }
    const plan = planCatalogPublication({
        liveParentReleaseId: input.liveParentReleaseId,
        currentEntities: input.currentEntities,
        candidateEntities: analysis.changedEntities.map(({ currentAuthoring }) => currentAuthoring),
        currentAssetBindings: input.currentAssetBindings ?? [],
        candidateAssetProposals: input.candidateAssetProposals ?? [],
        ...(input.authorityProposals ? { authorityProposals: input.authorityProposals } : {}),
        currentPolicies: input.currentPolicies,
        targetPolicies: input.targetPolicies,
        currentContractAuthorityDigest: input.currentContractAuthorityDigest,
        targetContractAuthorityDigest: input.targetContractAuthorityDigest,
        ...(input.impactIndex ? { impactIndex: input.impactIndex } : {}),
    });
    const [headTree, changedTree] = await Promise.all([
        gitRevision(input.repositoryRoot, `${input.headRevision}^{tree}`),
        resolveCatalogChangeTree({
            repositoryRoot: input.repositoryRoot,
            revision: input.headRevision,
            entityFiles: analysis.entityFiles,
        }),
    ]);
    return {
        ...plan,
        analysis,
        ingressReceipt: buildPublicationIngressReceipt(plan.proposal, {
            kind: "git",
            repository_id: input.repositoryId,
            base_commit: input.liveRevision,
            head_commit: input.headRevision,
            head_tree: headTree,
            changed_tree: changedTree,
        }),
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
async function catalogPullRequestComparisonBase(input) {
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
/**
 * A PR may independently trail the live release when its changed vendor paths
 * do not overlap intervening live changes. A base ahead of live may contain
 * independently admitted Entity changes; they do not enter this PR's changed
 * tree. An unpublished predecessor is permitted when the PR explicitly
 * changes that same vendor again, so review covers its final state relative to
 * live.
 */
export async function validateCatalogPrReleaseBase(input) {
    assertGitRevision(input.liveRevision, "live");
    assertGitRevision(input.pullRequestBaseRevision, "pull-request base");
    assertGitRevision(input.pullRequestHeadRevision, "pull-request head");
    const comparisonBase = await catalogPullRequestComparisonBase({
        repositoryRoot: input.repositoryRoot,
        baseRevision: input.pullRequestBaseRevision,
        headRevision: input.pullRequestHeadRevision,
    });
    if (await gitIsAncestor(input.repositoryRoot, input.liveRevision, comparisonBase)) {
        return;
    }
    if (!(await gitIsAncestor(input.repositoryRoot, comparisonBase, input.liveRevision))) {
        // Publication needs the head to descend from the live release, so only a new head can pass.
        throw new CatalogContributionError("revise", [
            {
                file: null,
                field: null,
                message: "Its branch has diverged from Sourcey's main. Update it from main and Sourcey reads it again.",
            },
        ]);
    }
    const [pullRequestChanges, liveChanges] = await Promise.all([
        catalogChangedPaths({
            repositoryRoot: input.repositoryRoot,
            baseRevision: comparisonBase,
            headRevision: input.pullRequestHeadRevision,
        }),
        catalogChangedPaths({
            repositoryRoot: input.repositoryRoot,
            baseRevision: comparisonBase,
            headRevision: input.liveRevision,
        }),
    ]);
    const liveVendorFiles = new Set(liveChanges.touchedEntityFiles);
    const overlaps = pullRequestChanges.entityFiles.filter((file) => liveVendorFiles.has(file));
    if (overlaps.length > 0) {
        throw new CatalogContributionError("revise", overlaps.map((file) => ({
            file: entityPath(file),
            field: null,
            message: "Sourcey changed this company file after your branch was made. Update your branch from main and push.",
        })));
    }
}
//# sourceMappingURL=index.js.map