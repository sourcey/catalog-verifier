import { readdir, readFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { compareCanonicalStrings } from "provenry/primitives";
import { parse as parseYaml } from "yaml";
import { AGENT_READINESS_REPOSITORY, AGENT_READINESS_REPOSITORY_URL, agentReadinessAuthoringSchema, } from "../../../contracts/agent-readiness/src/declaration.js";
import { assertAgentReadinessDeclarationJobs } from "../../agent-readiness-policy/src/declaration-jobs.js";
import { compileAgentReadinessDeclarationRevision, compileAgentReadinessDeclarationSource, } from "./declaration-blob.js";
export * from "./declaration-blob.js";
export { AGENT_READINESS_REPOSITORY, AGENT_READINESS_REPOSITORY_URL };
export function inspectAgentReadinessCandidateSources(input) {
    const compiled = input.sources.map((source) => compileAgentReadinessDeclarationSource(source));
    assertUnique(compiled.map(({ authoring }) => authoring.entity.entity_id), "Agent Readiness candidate Entity IDs");
    const revisions = compiled.flatMap(({ declarationRevisions }) => Object.values(declarationRevisions));
    assertUnique(revisions.map(({ declaration }) => declaration.declaration_id), "Agent Readiness candidate declaration IDs");
    for (const revision of revisions) {
        assertAgentReadinessDeclarationJobs({
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
                assertAgentReadinessDeclarationJobs({
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