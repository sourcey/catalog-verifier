import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { promisify } from "node:util";
import { parse } from "yaml";
import { retainedEntityAuthoringSchema, } from "../../../contracts/authoring/src/index.js";
import { catalogTaxonomySchema, } from "../../../contracts/taxonomy/src/index.js";
import { assertCatalogTaxonomy } from "../../catalog-authoring-validation/src/index.js";
import { compileEntity } from "../../catalog-model/src/index.js";
import { compileAuthoringFiles } from "../../compiler/src/index.js";
import { gitComparisonBase } from "../../git-input/src/index.js";
import { canonicalJson, compareCanonicalStrings } from "../../primitives/src/index.js";
import { catalogChangedRevisions, } from "./change-analysis.js";
import { analyzeCatalogCandidateChanges, buildPublicationIngressReceipt, planCatalogPublication, } from "./publication.js";
const execFileAsync = promisify(execFile);
export { validateCatalogCandidateSources } from "../../catalog-authoring-validation/src/index.js";
export * from "./admission-conflicts.js";
export * from "./change-analysis.js";
export * from "./machine-admission.js";
export * from "./publication.js";
export * from "./publication-composition.js";
export * from "./submission.js";
export const CATALOG_ENTITY_ROOT = "entities";
export async function readCatalogTaxonomy(path) {
    return catalogTaxonomySchema.parse(JSON.parse(await readFile(resolve(path), "utf8")));
}
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
    const analysis = await analyzeCatalogPrTree(input);
    // Public validation stays strict: a renamed, copied or deleted Entity file
    // is not a valid contribution shape, even though machine admission names it
    // as a scope reason instead of failing.
    if (analysis.unsupportedChanges.length > 0) {
        throw new Error(`Unsupported Entity change status ${analysis.unsupportedChanges.join(", ")}.`);
    }
    return {
        entities: analysis.entities,
        programs: analysis.programs,
        offers: analysis.offers,
    };
}
/**
 * Validate explicit non-Git candidate bytes through the same compiler,
 * taxonomy, path, and role-closure rules used by changed-repository intake.
 * Transport-specific Git checks remain in validateCatalogPrTree.
 */
export async function inspectCatalogPrTree(input) {
    const baseRevision = await catalogPullRequestComparisonBase(input);
    const { changes, changedAuthoring } = await catalogChangedHeadClosure({ ...input, baseRevision }, true);
    return {
        baseRevision,
        entityFiles: changes.entityFiles,
        entities: changedAuthoring.entities.length,
        programs: changedAuthoring.entities.flatMap((entity) => entity.programs).length,
        offers: changedAuthoring.entities.flatMap((entity) => entity.offers).length,
    };
}
/**
 * The one exact pull-request analysis used by changed-closure validation,
 * private review preparation, and tree-bound admission. It reads only the
 * changed Entity files, their identity dependencies, and the corresponding
 * base versions of those same files.
 */
export async function analyzeCatalogPrTree(input) {
    const baseRevision = await catalogPullRequestComparisonBase(input);
    return analyzeCatalogTree({ ...input, baseRevision }, true);
}
/**
 * Release construction uses the same changed-file and revision analysis as PR
 * validation while permitting unrelated documentation and workflow commits
 * that do not belong to Catalog data.
 */
export async function analyzeCatalogReleaseTree(input) {
    return analyzeCatalogTree(input, false);
}
/**
 * Analyze a data PR for admission against the release that is actually live.
 *
 * The PR comparison remains authoritative for its mutation boundary: it must
 * be data-only and identify every vendor the contributor changed. When main is
 * ahead of the live release, the release-relative comparison supplies the
 * complete final revisions that will be admitted. This permits a follow-up PR
 * to correct an unshipped version of the same vendor and permits independently
 * admitted vendor paths to advance without expanding this PR's authority.
 */
export async function analyzeCatalogPrAdmissionTree(input) {
    const comparisonBase = await catalogPullRequestComparisonBase({
        repositoryRoot: input.repositoryRoot,
        baseRevision: input.pullRequestBaseRevision,
        headRevision: input.pullRequestHeadRevision,
    });
    await validateCatalogPrReleaseBase(input);
    if (!(await gitIsAncestor(input.repositoryRoot, input.liveRevision, comparisonBase))) {
        return analyzeCatalogPrTree({
            repositoryRoot: input.repositoryRoot,
            baseRevision: input.pullRequestBaseRevision,
            headRevision: input.pullRequestHeadRevision,
            taxonomy: input.taxonomy,
        });
    }
    const pullRequestChanges = await catalogChangedPaths({
        repositoryRoot: input.repositoryRoot,
        baseRevision: comparisonBase,
        headRevision: input.pullRequestHeadRevision,
    });
    if (pullRequestChanges.entityFiles.length > 0 && pullRequestChanges.otherFiles.length > 0) {
        throw new Error(`Catalog data changes cannot be mixed with other repository paths: ${pullRequestChanges.otherFiles.join(", ")}.`);
    }
    return analyzeSelectedCatalogTree({
        repositoryRoot: input.repositoryRoot,
        baseRevision: input.liveRevision,
        headRevision: input.pullRequestHeadRevision,
        entityFiles: pullRequestChanges.entityFiles,
        unsupportedChanges: pullRequestChanges.unsupportedChanges,
        taxonomy: input.taxonomy,
    });
}
/**
 * Git is one immutable ingress adapter over the canonical publication port.
 * Repository objects remain receipt metadata; they do not alter semantic
 * proposal or Change Set bytes produced by another ingress for the same state.
 */
export async function planCatalogGitPublication(input) {
    const analysis = await analyzeCatalogReleaseTree({
        repositoryRoot: input.repositoryRoot,
        baseRevision: input.liveRevision,
        headRevision: input.headRevision,
        taxonomy: input.taxonomy,
    });
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
async function analyzeCatalogTree(input, rejectMixedPullRequest) {
    const repositoryRoot = resolve(input.repositoryRoot);
    const { changes, changedAuthoring, identityClosure } = await catalogChangedHeadClosure(input, rejectMixedPullRequest);
    const changedEntities = await changedRevisionClosure({
        repositoryRoot,
        baseRevision: input.baseRevision,
        changedAuthoring,
    });
    return {
        baseRevision: input.baseRevision,
        entityFiles: changes.entityFiles,
        unsupportedChanges: changes.unsupportedChanges,
        changedEntities,
        changedRevisions: catalogChangedRevisions(changedEntities),
        closure: identityClosure,
        entities: changedAuthoring.entities.length,
        programs: changedAuthoring.entities.flatMap((entity) => entity.programs).length,
        offers: changedAuthoring.entities.flatMap((entity) => entity.offers).length,
    };
}
async function analyzeSelectedCatalogTree(input) {
    const repositoryRoot = resolve(input.repositoryRoot);
    const { changedAuthoring, identityClosure, dependencyFiles } = await catalogChangedHeadClosure(input, false, input.entityFiles);
    await assertStableIdentityDependencies({
        repositoryRoot,
        liveRevision: input.baseRevision,
        dependencyFiles,
        identityClosure,
    });
    const changedEntities = await changedRevisionClosure({
        repositoryRoot,
        baseRevision: input.baseRevision,
        changedAuthoring,
    });
    return {
        baseRevision: input.baseRevision,
        entityFiles: [...input.entityFiles],
        unsupportedChanges: [...(input.unsupportedChanges ?? [])],
        changedEntities,
        changedRevisions: catalogChangedRevisions(changedEntities),
        closure: identityClosure,
        entities: changedAuthoring.entities.length,
        programs: changedAuthoring.entities.flatMap((entity) => entity.programs).length,
        offers: changedAuthoring.entities.flatMap((entity) => entity.offers).length,
    };
}
async function catalogChangedHeadClosure(input, rejectMixedPullRequest, selectedVendorFiles) {
    const repositoryRoot = resolve(input.repositoryRoot);
    const authoringRoot = resolveInside(repositoryRoot, CATALOG_ENTITY_ROOT);
    const changes = await catalogChangedPaths({
        repositoryRoot,
        baseRevision: input.baseRevision,
        headRevision: input.headRevision,
    });
    if (rejectMixedPullRequest && changes.entityFiles.length > 0 && changes.otherFiles.length > 0) {
        throw new Error(`Catalog data changes cannot be mixed with other repository paths: ${changes.otherFiles.join(", ")}.`);
    }
    const changedFiles = selectedVendorFiles ?? changes.entityFiles;
    const changedAuthoring = await compileAuthoringFiles(authoringRoot, changedFiles, {
        allowExternalRoleEntities: true,
    });
    assertCatalogTaxonomy(changedAuthoring.authoring, input.taxonomy);
    const dependencyFiles = await identityDependencyFiles({
        repositoryRoot,
        authoringRoot,
        headRevision: input.headRevision,
        changedFiles,
        changedAuthoring,
    });
    const identityClosure = await compileAuthoringFiles(authoringRoot, [...changedFiles, ...dependencyFiles], { allowExternalRoleEntities: true });
    assertChangedRoleClosure(changedAuthoring, identityClosure);
    return { changes, changedAuthoring, identityClosure, dependencyFiles };
}
export async function catalogPullRequestComparisonBase(input) {
    return gitComparisonBase(input);
}
export async function catalogChangedPaths(input) {
    assertGitRevision(input.baseRevision, "base");
    assertGitRevision(input.headRevision, "head");
    const authoringRoot = resolveInside(resolve(input.repositoryRoot), CATALOG_ENTITY_ROOT);
    const authoringPath = repositoryPath(input.repositoryRoot, authoringRoot);
    const { stdout } = await execFileAsync("git", ["diff", "--name-status", "-z", "--find-renames", input.baseRevision, input.headRevision], { cwd: input.repositoryRoot, encoding: "buffer", maxBuffer: 16 * 1024 * 1024 });
    const fields = stdout.toString("utf8").split("\0");
    if (fields.at(-1) === "")
        fields.pop();
    const entityFiles = new Set();
    const otherFiles = new Set();
    const unsupportedChanges = new Set();
    for (let index = 0; index < fields.length;) {
        const status = fields[index++];
        if (!status)
            throw new Error("Git produced an incomplete catalog change record.");
        const kind = status.slice(0, 1);
        const oldPath = fields[index++];
        const path = kind === "R" || kind === "C" ? fields[index++] : oldPath;
        if (!path)
            throw new Error("Git produced an incomplete catalog change path.");
        const touchesEntityRoot = [oldPath, path].some((candidate) => candidate === authoringPath || candidate?.startsWith(`${authoringPath}/`));
        if (touchesEntityRoot) {
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
        throw new Error("Catalog pull-request base and live source revision have diverged.");
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
    const liveVendorFiles = new Set(liveChanges.entityFiles);
    const overlaps = pullRequestChanges.entityFiles.filter((file) => liveVendorFiles.has(file));
    if (overlaps.length > 0) {
        throw new Error(`Catalog pull request overlaps live Entity changes: ${overlaps.join(", ")}.`);
    }
}
async function gitIsAncestor(root, ancestor, descendant) {
    try {
        await execFileAsync("git", ["merge-base", "--is-ancestor", ancestor, descendant], {
            cwd: resolve(root),
            encoding: "utf8",
            maxBuffer: 4 * 1024 * 1024,
        });
        return true;
    }
    catch (error) {
        if (error.code === 1)
            return false;
        throw error;
    }
}
async function changedRevisionClosure(input) {
    const pairs = [];
    for (const entity of input.changedAuthoring.entities) {
        const sourceFile = input.changedAuthoring.sourceFiles.get(entity.revision.entity_id);
        if (!sourceFile)
            throw new Error("Changed Catalog entity has no source file.");
        const currentAuthoring = retainedEntityAuthoringSchema.parse(parse(await readFile(resolveInside(input.repositoryRoot, `${CATALOG_ENTITY_ROOT}/${sourceFile}`), "utf8")));
        const priorAuthoring = await entityAuthoringAtRevision({
            repositoryRoot: input.repositoryRoot,
            revision: input.baseRevision,
            sourceFile,
        });
        const prior = priorAuthoring ? compileEntity(priorAuthoring) : null;
        if (prior && prior.revision.entity_id !== entity.revision.entity_id) {
            throw new Error(`Entity file ${sourceFile} cannot replace Entity '${prior.revision.entity_id}' with '${entity.revision.entity_id}'.`);
        }
        pairs.push({ entity, currentAuthoring, priorAuthoring });
    }
    const semantic = analyzeCatalogCandidateChanges({
        currentEntities: pairs.flatMap(({ priorAuthoring }) => priorAuthoring ? [priorAuthoring] : []),
        candidateEntities: pairs.map(({ currentAuthoring }) => currentAuthoring),
    });
    return pairs.map(({ entity, currentAuthoring, priorAuthoring }) => {
        const changes = semantic.revisionChanges.filter(({ entity_id: entityId }) => entityId === entity.revision.entity_id);
        return {
            entity,
            currentAuthoring,
            priorAuthoring,
            entityChanged: changes.some(({ kind }) => kind === "entity"),
            changedProgramIds: changes
                .filter(({ kind }) => kind === "program")
                .map(({ target_id: targetId }) => targetId),
            changedOfferIds: changes
                .filter(({ kind }) => kind === "offer")
                .map(({ target_id: targetId }) => targetId),
        };
    });
}
async function compiledEntityAtRevision(input) {
    const authoring = await entityAuthoringAtRevision(input);
    return authoring ? compileEntity(authoring) : null;
}
async function entityAuthoringAtRevision(input) {
    const path = `${CATALOG_ENTITY_ROOT}/${input.sourceFile}`;
    try {
        const { stdout } = await execFileAsync("git", ["show", `${input.revision}:${path}`], {
            cwd: input.repositoryRoot,
            encoding: "utf8",
            maxBuffer: 4 * 1024 * 1024,
        });
        return retainedEntityAuthoringSchema.parse(parse(stdout));
    }
    catch (error) {
        if (error.code === 128)
            return null;
        throw error;
    }
}
async function assertStableIdentityDependencies(input) {
    for (const sourceFile of input.dependencyFiles) {
        const current = input.identityClosure.entities.find((entity) => input.identityClosure.sourceFiles.get(entity.revision.entity_id) === sourceFile);
        if (!current)
            throw new Error(`Catalog identity dependency ${sourceFile} is unavailable.`);
        const live = await compiledEntityAtRevision({
            repositoryRoot: input.repositoryRoot,
            revision: input.liveRevision,
            sourceFile,
        });
        if (!live || canonicalJson(live) !== canonicalJson(current)) {
            throw new Error(`Catalog identity dependency changed outside this pull request: ${sourceFile}.`);
        }
    }
}
async function identityDependencyFiles(input) {
    const needles = identityNeedles(input.changedAuthoring);
    if (needles.length === 0)
        return [];
    const authoringPath = repositoryPath(input.repositoryRoot, input.authoringRoot);
    const arguments_ = [
        "grep",
        "-l",
        "-F",
        ...needles.flatMap((value) => ["-e", value]),
        input.headRevision,
        "--",
        authoringPath,
    ];
    let stdout = "";
    try {
        ({ stdout } = await execFileAsync("git", arguments_, {
            cwd: input.repositoryRoot,
            encoding: "utf8",
            maxBuffer: 16 * 1024 * 1024,
        }));
    }
    catch (error) {
        if (error.code !== 1)
            throw error;
    }
    const changed = new Set(input.changedFiles);
    const revisionPrefix = `${input.headRevision}:`;
    return stdout
        .split("\n")
        .filter(Boolean)
        .map((path) => {
        if (!path.startsWith(revisionPrefix)) {
            throw new Error("Git identity lookup returned a path outside the requested revision.");
        }
        return repositoryPath(input.authoringRoot, resolve(input.repositoryRoot, path.slice(revisionPrefix.length)));
    })
        .filter((path) => !changed.has(path))
        .sort(compareCanonicalStrings);
}
function identityNeedles(facts) {
    return [
        ...new Set(facts.entities.flatMap((entity) => [
            entity.revision.entity_id,
            entity.slug,
            ...entity.slugAliases,
            ...entity.revision.content.domains
                .filter((domain) => domain.valid_until === undefined)
                .map((domain) => domain.value.toLowerCase()),
            ...entity.programs.map((program) => program.revision.program_id),
            ...entity.offers.flatMap((offer) => [
                offer.revision.offer_id,
                offer.revision.content.roles.terms_authority_entity_id,
                offer.revision.content.roles.access_operator_entity_id,
            ]),
        ])),
    ].sort(compareCanonicalStrings);
}
function assertChangedRoleClosure(changed, closure) {
    const entityIds = new Set(closure.entities.map((entity) => entity.revision.entity_id));
    for (const entity of changed.entities) {
        for (const offer of entity.offers) {
            for (const roleEntityId of [
                offer.revision.content.roles.terms_authority_entity_id,
                offer.revision.content.roles.access_operator_entity_id,
            ]) {
                if (!entityIds.has(roleEntityId)) {
                    throw new Error(`Offer '${offer.revision.offer_id}' references unknown role entity '${roleEntityId}'.`);
                }
            }
        }
    }
}
function repositoryPath(repositoryRoot, path) {
    return relative(repositoryRoot, path).split(sep).join("/");
}
function resolveInside(root, path) {
    if (isAbsolute(path))
        throw new Error(`Catalog input must be repository-relative: ${path}.`);
    const resolved = resolve(root, path);
    if (!resolved.startsWith(`${root}${sep}`)) {
        throw new Error(`Catalog input escapes the repository: ${path}.`);
    }
    return resolved;
}
async function gitRevision(root, revision) {
    const { stdout } = await execFileAsync("git", ["rev-parse", revision], {
        cwd: resolve(root),
        encoding: "utf8",
        maxBuffer: 4 * 1024 * 1024,
    });
    const value = stdout.trim();
    assertGitRevision(value, "resolved");
    return value;
}
function assertGitRevision(value, label) {
    if (!/^[a-f0-9]{40,64}$/.test(value)) {
        throw new Error(`Catalog ${label} revision is not an exact Git object ID.`);
    }
}
//# sourceMappingURL=index.js.map