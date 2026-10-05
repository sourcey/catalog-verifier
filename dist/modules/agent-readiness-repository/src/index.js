import { execFile } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { promisify } from "node:util";
import { compareCanonicalStrings } from "provenry/primitives";
import { parse as parseYaml } from "yaml";
import { AGENT_READINESS_REPOSITORY, AGENT_READINESS_REPOSITORY_URL, agentReadinessAuthoringSchema, } from "../../../contracts/agent-readiness/src/declaration.js";
import { assertAgentReadinessDeclarationPolicyClosure } from "../../agent-readiness-policy/src/index.js";
import { compileAgentReadinessDeclarationRevision, compileAgentReadinessDeclarationSource, readAgentReadinessDeclarationBlobAtRevision, } from "./declaration-blob.js";
export * from "./admission.js";
export * from "./declaration-blob.js";
const execFileAsync = promisify(execFile);
export { AGENT_READINESS_REPOSITORY, AGENT_READINESS_REPOSITORY_URL };
/**
 * Inspect one immutable repository tree for an explicit bootstrap or audit.
 * Ordinary pull-request admission must use the exact repository-change packet
 * so mixed-path and changed-closure rules remain enforced.
 */
export async function inspectAgentReadinessRepositoryTreeAtRevision(input) {
    const repositoryRoot = resolve(input.repositoryRoot);
    if (!/^[a-f0-9]{40,64}$/u.test(input.headRevision)) {
        throw new Error("Agent Readiness tree inspection requires an exact Git object ID.");
    }
    const [treeEntries, entitiesTreeOid] = await Promise.all([
        inspectEntitiesTreeEntries(repositoryRoot, input.headRevision),
        resolveEntitiesTreeOid(repositoryRoot, input.headRevision),
    ]);
    const entityFiles = treeEntries
        .filter((entry) => /^entities\/.+\.ya?ml$/u.test(entry.path))
        .map((entry) => entry.path.slice("entities/".length))
        .sort(compareCanonicalStrings);
    const blobs = await Promise.all(entityFiles.map((file) => readAgentReadinessDeclarationBlobAtRevision(repositoryRoot, input.headRevision, file)));
    assertRepositoryInspectionClosure(blobs, input.policy);
    return {
        comparisonBase: input.headRevision,
        headRevision: input.headRevision,
        entitiesTreeOid,
        treeEntries,
        entityFiles,
        blobs,
        declarations: blobs.reduce((count, blob) => count + blob.authoring.declarations.length, 0),
    };
}
async function inspectEntitiesTreeEntries(repositoryRoot, headRevision) {
    const { stdout } = await execFileAsync("git", ["ls-tree", "-r", "-z", headRevision, "--", "entities"], {
        cwd: repositoryRoot,
        encoding: "buffer",
        maxBuffer: 4 * 1024 * 1024,
    });
    const entries = stdout
        .toString("utf8")
        .split("\0")
        .filter(Boolean)
        .map((record) => {
        const match = /^(100644|100755|120000|160000) (blob|commit) ([a-f0-9]{40,64})\t([^\0]+)$/u.exec(record);
        if (!match) {
            throw new Error("Agent Readiness entities tree contains an unsupported Git entry.");
        }
        const [, mode, objectType, gitObjectOid, path] = match;
        if (!mode ||
            !objectType ||
            !gitObjectOid ||
            !path?.startsWith("entities/") ||
            (objectType === "commit") !== (mode === "160000")) {
            throw new Error("Agent Readiness entities tree contains an invalid Git entry.");
        }
        return {
            path,
            mode: mode,
            objectType: objectType,
            gitObjectOid,
        };
    })
        .sort((left, right) => compareCanonicalStrings(left.path, right.path));
    if (entries.length < 1 || new Set(entries.map(({ path }) => path)).size !== entries.length) {
        throw new Error("Agent Readiness entities tree must contain unique retained entries.");
    }
    return entries;
}
async function resolveEntitiesTreeOid(repositoryRoot, headRevision) {
    const { stdout } = await execFileAsync("git", ["rev-parse", `${headRevision}:entities`], {
        cwd: repositoryRoot,
        encoding: "utf8",
        maxBuffer: 1024,
    });
    const oid = stdout.trim();
    if (!/^[a-f0-9]{40,64}$/u.test(oid)) {
        throw new Error("Agent Readiness entities tree has an invalid Git object identity.");
    }
    return oid;
}
function assertRepositoryInspectionClosure(blobs, policy) {
    assertUnique(blobs.map((blob) => blob.authoring.entity.entity_id), "Agent Readiness inspected Entity IDs");
    assertUnique(blobs.flatMap((blob) => blob.authoring.declarations.map((declaration) => declaration.declaration_id)), "Agent Readiness inspected declaration IDs");
    for (const blob of blobs) {
        for (const declaration of Object.values(blob.declarationRevisions)) {
            assertAgentReadinessDeclarationPolicyClosure({
                declaration: declaration.declaration,
                policy,
            });
        }
    }
}
export async function validateAgentReadinessRepositoryChange(input) {
    const { inspectAgentReadinessRepositoryChangePacket } = await import("./change.js");
    const inspection = await inspectAgentReadinessRepositoryChangePacket(input);
    return {
        entities: inspection.paths.length,
        declarations: inspection.paths.reduce((count, path) => count + path.declarations.filter((item) => item.kind !== "declaration_unchanged").length, 0),
    };
}
/**
 * Validate explicit non-Git declaration bytes through the same parser,
 * revision compiler, and policy closure used by repository intake.
 */
export function validateAgentReadinessCandidateSources(input) {
    return inspectAgentReadinessCandidateSources(input).summary;
}
export function inspectAgentReadinessCandidateSources(input) {
    const compiled = input.sources.map((source) => compileAgentReadinessDeclarationSource(source));
    assertUnique(compiled.map(({ authoring }) => authoring.entity.entity_id), "Agent Readiness candidate Entity IDs");
    const revisions = compiled.flatMap(({ declarationRevisions }) => Object.values(declarationRevisions));
    assertUnique(revisions.map(({ declaration }) => declaration.declaration_id), "Agent Readiness candidate declaration IDs");
    for (const revision of revisions) {
        assertAgentReadinessDeclarationPolicyClosure({
            declaration: revision.declaration,
            policy: input.policy,
        });
    }
    return {
        authoring: compiled.map((candidate) => candidate.authoring),
        summary: { entities: compiled.length, declarations: revisions.length },
    };
}
/**
 * Validate the complete current declaration tree with the same canonical
 * parser and policy-closure authority used for changed Git blobs. This is a
 * local/audit adapter only; ordinary PR validation remains changed-closure.
 */
export async function validateAgentReadinessRepositoryTree(input) {
    const repositoryRoot = resolve(input.repositoryRoot);
    const entityRoot = join(repositoryRoot, "entities");
    const entries = (await readdir(entityRoot, { recursive: true, withFileTypes: true }))
        .filter((entry) => entry.isFile() && /\.ya?ml$/u.test(entry.name))
        .map((entry) => join(entry.parentPath, entry.name))
        .sort(compareCanonicalStrings);
    const authoring = [];
    const failures = [];
    for (const path of entries) {
        const actual = relative(repositoryRoot, path).replaceAll("\\", "/");
        try {
            const parsed = agentReadinessAuthoringSchema.parse(parseYaml(await readFile(path, "utf8")));
            const expected = `entities/${parsed.entity.slug.slice(0, 2)}/${parsed.entity.slug}.yaml`;
            if (actual !== expected) {
                throw new Error(`Agent Readiness Entity ${parsed.entity.slug} must live at ${expected}.`);
            }
            for (const declaration of parsed.declarations) {
                assertAgentReadinessDeclarationPolicyClosure({
                    declaration: compileAgentReadinessDeclarationRevision({
                        authoring: parsed,
                        declaration,
                    }).declaration,
                    policy: input.policy,
                });
            }
            authoring.push(parsed);
        }
        catch (error) {
            failures.push(`${actual}: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    if (failures.length > 0) {
        throw new Error(`Agent Readiness repository validation failed:\n${failures.join("\n")}`);
    }
    assertUnique(authoring.map(({ entity }) => entity.entity_id), "Agent Readiness repository Entity IDs");
    assertUnique(authoring.flatMap(({ declarations }) => declarations.map(({ declaration_id: declarationId }) => declarationId)), "Agent Readiness repository declaration IDs");
    return {
        entities: authoring.length,
        declarations: authoring.reduce((count, item) => count + item.declarations.length, 0),
    };
}
/**
 * Classify only exact identity and claimed authority context. A ready result is
 * still a private scope-review candidate; it is never an observation or grade.
 */
export function dispositionAgentReadinessDeclaration(input) {
    const entity = input.context.entity;
    if (!entity)
        return { status: "held", reason: "identity_allocation_required" };
    if (entity.entityId !== input.authoring.entity.entity_id) {
        return { status: "held", reason: "entity_identity_mismatch" };
    }
    if (input.declaration.authority_intent === "entity" && !input.context.entityAuthorityProven) {
        return { status: "held", reason: "entity_authority_required" };
    }
    return {
        status: "ready_for_scope_review",
        declarationAuthority: input.declaration.authority_intent === "entity"
            ? "entity_authority_proven"
            : "community_claimed",
    };
}
export * from "./change.js";
function assertUnique(values, label) {
    if (new Set(values).size !== values.length)
        throw new Error(`${label} must be unique.`);
}
//# sourceMappingURL=index.js.map