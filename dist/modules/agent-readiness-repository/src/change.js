import { execFile } from "node:child_process";
import { resolve } from "node:path";
import { promisify } from "node:util";
import { AGENT_READINESS_REPOSITORY, } from "../../../contracts/agent-readiness/src/index.js";
import { assertAgentReadinessDeclarationPolicyClosure } from "../../agent-readiness-policy/src/index.js";
import { catalogPullRequestComparisonBase } from "../../catalog-admission/src/index.js";
import { canonicalJson, compareCanonicalStrings, digest, } from "../../primitives/src/index.js";
import { readAgentReadinessDeclarationBlobAtRevision, } from "./declaration-blob.js";
const executeFile = promisify(execFile);
/**
 * Exact ordinary-change intake. Work is proportional to changed blobs and never
 * constructs the recursive entities manifest retained by explicit cohort audits.
 */
export async function inspectAgentReadinessRepositoryChangePacket(input) {
    const repositoryRoot = resolve(input.repositoryRoot);
    const comparisonBase = await catalogPullRequestComparisonBase(input);
    const changed = await changedRepositoryPaths(repositoryRoot, comparisonBase, input.headRevision);
    const entityPaths = changed.filter(({ path }) => path.startsWith("entities/"));
    const otherPaths = changed.filter(({ path }) => !path.startsWith("entities/"));
    if (entityPaths.length > 0 && otherPaths.length > 0) {
        throw new Error(`Agent Readiness declaration changes cannot be mixed with other repository paths: ${otherPaths
            .map(({ path }) => path)
            .join(", ")}.`);
    }
    const [headRevision, baseRootTreeOid, baseEntitiesTreeOid] = await Promise.all([
        resolveGitObject(repositoryRoot, `${input.headRevision}^{commit}`),
        resolveGitObject(repositoryRoot, `${comparisonBase}^{tree}`),
        resolveOptionalGitObject(repositoryRoot, `${comparisonBase}:entities`),
    ]);
    const pathStatuses = validateEntityPaths(entityPaths);
    const [headRootTreeOid, headEntitiesTreeOid] = await Promise.all([
        resolveGitObject(repositoryRoot, `${headRevision}^{tree}`),
        resolveOptionalGitObject(repositoryRoot, `${headRevision}:entities`),
    ]);
    const paths = await Promise.all(pathStatuses.map(async ({ status, path }) => {
        const file = path.slice("entities/".length);
        const [base, head] = await Promise.all([
            status === "added"
                ? null
                : readAgentReadinessDeclarationBlobAtRevision(repositoryRoot, comparisonBase, file),
            status === "removed"
                ? null
                : readAgentReadinessDeclarationBlobAtRevision(repositoryRoot, headRevision, file),
        ]);
        assertBlobPolicy(base, input.policy);
        assertBlobPolicy(head, input.policy);
        return pathDelta(status, path, base, head);
    }));
    const core = {
        change_contract: "sourcey.agent-readiness-repository-change/v1alpha1",
        repository: AGENT_READINESS_REPOSITORY,
        comparisonBase,
        baseRootTreeOid,
        baseEntitiesTreeOid,
        headRevision,
        headRootTreeOid,
        headEntitiesTreeOid,
        paths: paths.sort((left, right) => compareCanonicalStrings(left.path, right.path)),
    };
    return { ...core, packetDigest: digest(core) };
}
export async function verifyAgentReadinessRepositoryChangePacket(input) {
    const verified = await inspectAgentReadinessRepositoryChangePacket({
        repositoryRoot: input.repositoryRoot,
        baseRevision: input.packet.comparisonBase,
        headRevision: input.packet.headRevision,
        policy: input.policy,
    });
    if (canonicalJson(verified) !== canonicalJson(input.packet)) {
        throw new Error("Agent Readiness repository-change packet failed exact Git readback.");
    }
}
export function selectedAgentReadinessDeclarationDeltas(packet) {
    return packet.paths.flatMap((path) => path.declarations.filter((delta) => path.entitySubjectChanged || delta.kind !== "declaration_unchanged"));
}
function pathDelta(status, path, base, head) {
    const prior = base?.declarationRevisions ?? {};
    const current = head?.declarationRevisions ?? {};
    const ids = [...new Set([...Object.keys(prior), ...Object.keys(current)])].sort(compareCanonicalStrings);
    const declarations = ids.map((declarationId) => {
        const before = prior[declarationId];
        const after = current[declarationId];
        if (!before && after) {
            return {
                kind: "declaration_added",
                declarationId,
                currentRevisionDigest: after.revision_digest,
                changedNodeKeys: revisionNodeKeys(after),
            };
        }
        if (before && !after) {
            return {
                kind: "declaration_removed",
                declarationId,
                priorRevisionDigest: before.revision_digest,
                changedNodeKeys: revisionNodeKeys(before),
            };
        }
        if (!before || !after)
            throw new Error("Declaration delta is incomplete.");
        if (before.revision_digest === after.revision_digest) {
            return {
                kind: "declaration_unchanged",
                declarationId,
                revisionDigest: after.revision_digest,
                changedNodeKeys: [],
            };
        }
        return {
            kind: "declaration_changed",
            declarationId,
            priorRevisionDigest: before.revision_digest,
            currentRevisionDigest: after.revision_digest,
            changedNodeKeys: changedRevisionNodeKeys(before, after),
        };
    });
    return {
        status,
        path,
        base,
        head,
        entitySubjectChanged: base === null || head === null || digest(entitySubject(base)) !== digest(entitySubject(head)),
        declarations,
    };
}
function entitySubject(blob) {
    return blob.authoring.entity;
}
function revisionNodeKeys(revision) {
    return [...revisionNodes(revision).keys()].sort(compareCanonicalStrings);
}
function changedRevisionNodeKeys(before, after) {
    const beforeNodes = revisionNodes(before);
    const afterNodes = revisionNodes(after);
    return [...new Set([...beforeNodes.keys(), ...afterNodes.keys()])]
        .filter((key) => beforeNodes.get(key) !== afterNodes.get(key))
        .sort(compareCanonicalStrings);
}
function revisionNodes(revision) {
    const declaration = revision.declaration;
    return new Map([
        ["declaration.identity", digest(declaration.declaration_id)],
        ["declaration.scope", digest(declaration.scope)],
        ["declaration.authority_intent", digest(declaration.authority_intent)],
        ["declaration.declared_at", digest(declaration.declared_at)],
        ...keyedNodes("assessment_target", declaration.assessment_targets, "target_id"),
        ...keyedNodes("participant", declaration.participants, "participant_id"),
        ...keyedNodes("resource", declaration.resources, "resource_id"),
        ...keyedNodes("endpoint", declaration.endpoints, "endpoint_id"),
        ...keyedNodes("interface", declaration.interfaces, "interface_id"),
        ...keyedNodes("relation", declaration.relations, "relation_id"),
        ...keyedNodes("source_binding", declaration.source_bindings, "source_binding_id"),
        ...keyedNodes("surface_exclusion", declaration.surface_exclusions, "exclusion_id"),
        ...keyedNodes("source", revision.sources, "source_id"),
    ]);
}
function keyedNodes(kind, values, identity) {
    return values.map((value) => [`declaration.${kind}.${value[identity]}`, digest(value)]);
}
async function changedRepositoryPaths(repositoryRoot, baseRevision, headRevision) {
    const { stdout } = await executeFile("git", ["diff", "--name-status", "-z", "--no-renames", baseRevision, headRevision], { cwd: repositoryRoot, encoding: "buffer", maxBuffer: 4 * 1024 * 1024 });
    const fields = stdout.toString("utf8").split("\0").filter(Boolean);
    if (fields.length % 2 !== 0)
        throw new Error("Agent Readiness Git path delta is malformed.");
    const paths = [];
    for (let index = 0; index < fields.length; index += 2) {
        const code = fields[index];
        const path = fields[index + 1];
        if (!path)
            throw new Error("Agent Readiness change contains an invalid path.");
        const status = code === "A" ? "added" : code === "M" ? "modified" : code === "D" ? "removed" : null;
        if (!status)
            throw new Error(`Agent Readiness change has unsupported Git status ${code}.`);
        paths.push({ status, path });
    }
    return paths.sort((left, right) => compareCanonicalStrings(left.path, right.path));
}
function validateEntityPaths(paths) {
    for (const { path } of paths) {
        if (!/^entities\/[a-z0-9]{1,2}\/[a-z0-9]+(?:-[a-z0-9]+)*\.ya?ml$/u.test(path)) {
            throw new Error("Agent Readiness change contains an invalid Entity path.");
        }
    }
    return paths;
}
async function resolveGitObject(repositoryRoot, revision) {
    const { stdout } = await executeFile("git", ["rev-parse", revision], {
        cwd: repositoryRoot,
        encoding: "utf8",
        maxBuffer: 1024,
    });
    const oid = stdout.trim();
    if (!/^[a-f0-9]{40,64}$/u.test(oid))
        throw new Error("Git object identity is invalid.");
    return oid;
}
async function resolveOptionalGitObject(repositoryRoot, revision) {
    try {
        return await resolveGitObject(repositoryRoot, revision);
    }
    catch (error) {
        const candidate = error;
        if (candidate.code === 128 && candidate.stderr?.includes("does not exist"))
            return null;
        if (candidate.code === 128 && candidate.stderr?.includes("exists on disk, but not in")) {
            return null;
        }
        throw error;
    }
}
function assertBlobPolicy(blob, policy) {
    if (!blob)
        return;
    for (const revision of Object.values(blob.declarationRevisions)) {
        assertAgentReadinessDeclarationPolicyClosure({ declaration: revision.declaration, policy });
    }
}
//# sourceMappingURL=change.js.map