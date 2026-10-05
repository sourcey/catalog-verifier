import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { compareCanonicalStrings, digest, sha256Bytes } from "provenry/primitives";
import { parse as parseYaml } from "yaml";
import { AGENT_READINESS_REPOSITORY, agentReadinessAuthoringSchema, agentReadinessDeclarationRevisionCoreSchema, agentReadinessDeclarationRevisionSchema, } from "../../../contracts/agent-readiness/src/declaration.js";
const executeFile = promisify(execFile);
/** Compile hosted authoring bytes; the path follows the Entity slug and the digest the bytes. */
export function compileAgentReadinessHostedDeclarationBlob(input) {
    const authoring = agentReadinessAuthoringSchema.parse(parseYaml(input.content));
    const file = `${authoring.entity.slug.slice(0, 2)}/${authoring.entity.slug}.yaml`;
    return {
        provenance: {
            source: "sourcey",
            path: `entities/${file}`,
            blob_digest: sha256Bytes(input.content),
        },
        ...compileAgentReadinessDeclarationSource({ source: file, content: input.content }),
    };
}
/** Parse explicit non-Git authoring bytes without manufacturing Git identity. */
export function compileAgentReadinessDeclarationSource(input) {
    const authoring = agentReadinessAuthoringSchema.parse(parseYaml(input.content));
    const expectedPath = `${authoring.entity.slug.slice(0, 2)}/${authoring.entity.slug}.yaml`;
    if (input.source !== expectedPath) {
        throw new Error(`Agent Readiness Entity ${authoring.entity.slug} must live at entities/${expectedPath}.`);
    }
    return {
        authoring,
        declarationRevisions: Object.fromEntries(authoring.declarations.map((declaration) => [
            declaration.declaration_id,
            compileAgentReadinessDeclarationRevision({ authoring, declaration }),
        ])),
    };
}
export async function readAgentReadinessDeclarationBlobAtRevision(repositoryRoot, headRevision, file) {
    const path = `entities/${file}`;
    const [{ stdout: bytes }, { stdout: oidOutput }] = await Promise.all([
        executeFile("git", ["show", `${headRevision}:${path}`], {
            cwd: repositoryRoot,
            encoding: "buffer",
            maxBuffer: 4 * 1024 * 1024,
        }),
        executeFile("git", ["rev-parse", `${headRevision}:${path}`], {
            cwd: repositoryRoot,
            encoding: "utf8",
            maxBuffer: 4 * 1024 * 1024,
        }),
    ]);
    const compiled = compileAgentReadinessDeclarationSource({
        source: file,
        content: bytes.toString("utf8"),
    });
    const gitBlobOid = oidOutput.trim();
    if (!/^[a-f0-9]{40,64}$/u.test(gitBlobOid)) {
        throw new Error(`Agent Readiness declaration ${path} has an invalid Git blob identity.`);
    }
    return {
        provenance: {
            repository: AGENT_READINESS_REPOSITORY,
            commit: headRevision,
            path,
            git_blob_oid: gitBlobOid,
            blob_digest: sha256Bytes(bytes),
        },
        authoring: compiled.authoring,
        declarationRevisions: compiled.declarationRevisions,
    };
}
export function agentReadinessDeclarationRevisionDigest(input) {
    return compileAgentReadinessDeclarationRevision(input).revision_digest;
}
export function compileAgentReadinessDeclarationRevision(input) {
    const authoring = agentReadinessAuthoringSchema.parse(input.authoring);
    const parsed = agentReadinessAuthoringSchema.shape.declarations.element.parse(input.declaration);
    const standardBindings = (values) => [...values].sort((left, right) => compareCanonicalStrings(`${left.namespace}:${left.version}:${left.relation}`, `${right.namespace}:${right.version}:${right.relation}`));
    const canonicalDeclaration = {
        ...parsed,
        assessment_targets: [...parsed.assessment_targets]
            .map((target) => ({
            ...target,
            interface_ids: [...target.interface_ids].sort(compareCanonicalStrings),
        }))
            .sort((left, right) => compareCanonicalStrings(left.target_id, right.target_id)),
        participants: [...parsed.participants]
            .map((participant) => ({
            ...participant,
            roles: [...participant.roles].sort(compareCanonicalStrings),
        }))
            .sort((left, right) => compareCanonicalStrings(left.participant_id, right.participant_id)),
        resources: [...parsed.resources]
            .map((resource) => ({
            ...resource,
            roles: [...resource.roles].sort(compareCanonicalStrings),
            standard_bindings: standardBindings(resource.standard_bindings),
        }))
            .sort((left, right) => compareCanonicalStrings(left.resource_id, right.resource_id)),
        endpoints: [...parsed.endpoints]
            .map((endpoint) => ({
            ...endpoint,
            roles: [...endpoint.roles].sort(compareCanonicalStrings),
            standard_bindings: standardBindings(endpoint.standard_bindings),
        }))
            .sort((left, right) => compareCanonicalStrings(left.endpoint_id, right.endpoint_id)),
        interfaces: [...parsed.interfaces]
            .map((declaredInterface) => ({
            ...declaredInterface,
            functions: [...declaredInterface.functions].sort(compareCanonicalStrings),
            endpoint_ids: [...declaredInterface.endpoint_ids].sort(compareCanonicalStrings),
            resource_ids: [...declaredInterface.resource_ids].sort(compareCanonicalStrings),
            standard_bindings: standardBindings(declaredInterface.standard_bindings),
        }))
            .sort((left, right) => compareCanonicalStrings(left.interface_id, right.interface_id)),
        relations: [...parsed.relations].sort((left, right) => compareCanonicalStrings(left.relation_id, right.relation_id)),
        surface_exclusions: [...parsed.surface_exclusions].sort((left, right) => compareCanonicalStrings(left.exclusion_id, right.exclusion_id)),
        source_bindings: [...parsed.source_bindings]
            .filter((binding) => binding.target.node_kind !== "offer_relation")
            .map((binding) => ({
            ...binding,
            field_paths: [...binding.field_paths].sort(compareCanonicalStrings),
        }))
            .sort((left, right) => compareCanonicalStrings(left.source_binding_id, right.source_binding_id)),
    };
    const { offer_relations: _, ...declaration } = canonicalDeclaration;
    const requiredSourceIds = new Set([
        ...declaration.source_bindings.map((binding) => binding.source_id),
        ...declaration.participants.flatMap((participant) => "origin_source_id" in participant.identity ? [participant.identity.origin_source_id] : []),
    ]);
    const core = agentReadinessDeclarationRevisionCoreSchema.parse({
        revision_contract: "sourcey.agent-readiness-declaration-revision/v1alpha1",
        entity_id: authoring.entity.entity_id,
        declaration,
        sources: authoring.sources
            .filter((source) => requiredSourceIds.has(source.source_id))
            .sort((left, right) => compareCanonicalStrings(left.source_id, right.source_id)),
    });
    return agentReadinessDeclarationRevisionSchema.parse({
        ...core,
        revision_digest: digest(core),
    });
}
//# sourceMappingURL=declaration-blob.js.map