import { execFile } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { promisify } from "node:util";
import { assertExactGitCheckout, gitComparisonBase } from "provenry/git";
import { canonicalJson, compareCanonicalStrings, mapLimit } from "provenry/primitives";
import { parse } from "yaml";
import { assertCatalogContributionAuthoring, assertCatalogTaxonomy, } from "../../catalog-authoring-validation/src/index.js";
import { compileEntity } from "../../catalog-model/src/index.js";
import { ENTITY_ID_PATTERN } from "../../catalog-primitives/src/index.js";
import { compileAuthoringFiles } from "../../compiler/src/index.js";
import { catalogChangedEntitiesFromCurrent, catalogChangedRevisions, } from "./change-analysis.js";
import { buildPublicationIngressReceipt, planCatalogPublication, } from "./publication.js";
import { verifyCatalogPublicationCurrentState } from "./publication-state.js";
const execFileAsync = promisify(execFile);
export { validateCatalogCandidateSources } from "../../catalog-authoring-validation/src/index.js";
export * from "./admission-conflicts.js";
export * from "./change-analysis.js";
export * from "./machine-admission.js";
export * from "./publication.js";
export * from "./publication-composition.js";
export * from "./submission.js";
export * from "./taxonomy.js";
export const CATALOG_ENTITY_ROOT = "entities";
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
    if (pullRequestChanges.entityFiles.length > 0 && pullRequestChanges.otherFiles.length > 0) {
        throw new Error(`Catalog data changes cannot be mixed with other repository paths: ${pullRequestChanges.otherFiles.join(", ")}.`);
    }
    if (pullRequestChanges.unsupportedChanges.length > 0) {
        throw new Error(`Unsupported Entity change status ${pullRequestChanges.unsupportedChanges.join(", ")}.`);
    }
    if (pullRequestChanges.entityFiles.length === 0) {
        throw new Error("Catalog PR admission requires a changed Entity file.");
    }
    const { changedAuthoring, identityClosure, dependencyFiles } = await catalogChangedHeadClosure({
        repositoryRoot: input.repositoryRoot,
        baseRevision: input.liveRevision,
        headRevision: input.pullRequestHeadRevision,
        taxonomy: input.taxonomy,
    }, false, pullRequestChanges.entityFiles);
    assertCatalogContributionAuthoring(changedAuthoring.authoring);
    await Promise.all([comparisonBase, input.liveRevision].map((baseRevision) => assertFileIdentityContinuity({
        repositoryRoot: input.repositoryRoot,
        baseRevision,
        changedAuthoring,
    })));
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
    for (const sourceFile of dependencyFiles) {
        const head = identityClosure.entities.find((entity) => identityClosure.sourceFiles.get(entity.revision.entity_id) === sourceFile);
        if (!head)
            throw new Error(`Catalog identity dependency ${sourceFile} is unavailable.`);
        const live = currentById.get(head.revision.entity_id);
        if (!live || canonicalJson(compileEntity(live)) !== canonicalJson(head)) {
            throw new Error(`Catalog identity dependency changed outside this pull request: ${sourceFile}.`);
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
async function catalogChangedHeadClosure(input, rejectMixedPullRequest, selectedVendorFiles) {
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
/** Git binds a file to one identity; its old payload is not the semantic parent. */
async function assertFileIdentityContinuity(input) {
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
            throw new Error(`Historical Entity file ${sourceFile} has no valid Entity ID.`);
        }
        if (priorId !== entityId) {
            throw new Error(`Entity file ${sourceFile} cannot replace Entity '${priorId}' with '${entityId}'.`);
        }
    });
}
async function gitSourceAtRevision(input) {
    const path = `${CATALOG_ENTITY_ROOT}/${input.sourceFile}`;
    try {
        const { stdout } = await execFileAsync("git", ["show", `${input.revision}:${path}`], {
            cwd: input.repositoryRoot,
            encoding: "utf8",
            maxBuffer: 4 * 1024 * 1024,
        });
        return stdout;
    }
    catch (error) {
        if (error.code === 128)
            return null;
        throw error;
    }
}
async function identityDependencyFiles(input) {
    const needles = identityNeedles(input.changedAuthoring);
    if (needles.length === 0)
        return [];
    const authoringPath = repositoryPath(input.repositoryRoot, input.authoringRoot);
    // Whole values only, in any case: domain needles are lower-cased, authoring need not be.
    const arguments_ = [
        "grep",
        "-l",
        "-F",
        "-w",
        "-i",
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
    const candidates = stdout
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
    const needlesByIdentity = new Set(needles);
    const owners = await mapLimit(candidates, 8, async (path) => {
        const facts = await compileAuthoringFiles(input.authoringRoot, [path], {
            allowExternalRoleEntities: true,
        });
        return ownedIdentityKeys(facts).some((key) => needlesByIdentity.has(key)) ? path : null;
    });
    return owners.filter((path) => path !== null);
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