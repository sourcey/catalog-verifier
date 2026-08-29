import { z } from "zod";
import { authoringSourceSchema, entityIdentityAuthoringSchema } from "../../authoring/src/index.js";
import { catalogAuthoringUrlSchema } from "../../revisions/src/index.js";
import { standardImplementationBindingSchema } from "../../standards/src/index.js";
export { AGENT_READINESS_REPOSITORY, AGENT_READINESS_REPOSITORY_URL, agentReadinessDeclarationProvenanceSchema, agentReadinessDeclarationReferenceSchema, } from "./declaration-reference.js";
import { agentReadinessDigestSchema, agentReadinessEntityIdSchema, agentReadinessHostnameSchema, agentReadinessIdentifierSchema, agentReadinessInstantSchema, agentReadinessOfferIdSchema, agentReadinessResourceRoleSchema, agentReadinessScopeKeySchema, agentReadinessScopeSchema, agentReadinessStageSchema, agentReadinessSurfaceReferenceSchema, } from "./shared.js";
export const agentReadinessParticipantRoleSchema = z.enum([
    "subject",
    "access_operator",
    "identity_provider",
    "payment_provider",
    "provisioning_provider",
    "operations_provider",
]);
export const agentReadinessParticipantIdentitySchema = z.union([
    z.object({ entity_id: agentReadinessEntityIdSchema }).strict(),
    z.object({ origin_source_id: agentReadinessIdentifierSchema }).strict(),
]);
export const agentReadinessParticipantSchema = z
    .object({
    participant_id: agentReadinessScopeKeySchema,
    roles: z.array(agentReadinessParticipantRoleSchema).min(1),
    identity: agentReadinessParticipantIdentitySchema,
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.roles, context, ["roles"], "Participant roles must be unique.");
});
export const agentReadinessResourceSchema = z
    .object({
    resource_id: agentReadinessScopeKeySchema,
    uri: catalogAuthoringUrlSchema,
    roles: z.array(agentReadinessResourceRoleSchema).min(1),
    operated_by_participant_id: agentReadinessScopeKeySchema,
    standard_bindings: z.array(standardImplementationBindingSchema),
    allowed_redirect_hosts: z.array(agentReadinessHostnameSchema).max(16).optional(),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.roles, context, ["roles"], "Resource roles must be unique.");
    assertUniqueStandardBindings(value.standard_bindings, context, ["standard_bindings"]);
    assertCanonicalOptionalHosts(value.allowed_redirect_hosts, context);
});
export const agentReadinessEndpointTransportSchema = z.enum(["http", "websocket", "grpc"]);
export const agentReadinessEndpointRoleSchema = z.enum([
    "service",
    "authorization",
    "token",
    "registration",
    "protected_resource",
    "checkout",
    "status",
    "recovery",
    "webhook",
]);
export const agentReadinessEndpointSchema = z
    .object({
    endpoint_id: agentReadinessScopeKeySchema,
    uri: catalogAuthoringUrlSchema,
    transport: agentReadinessEndpointTransportSchema,
    roles: z.array(agentReadinessEndpointRoleSchema).min(1),
    operated_by_participant_id: agentReadinessScopeKeySchema,
    standard_bindings: z.array(standardImplementationBindingSchema),
    allowed_redirect_hosts: z.array(agentReadinessHostnameSchema).max(16).optional(),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.roles, context, ["roles"], "Endpoint roles must be unique.");
    assertUniqueStandardBindings(value.standard_bindings, context, ["standard_bindings"]);
    assertCanonicalOptionalHosts(value.allowed_redirect_hosts, context);
});
export const agentReadinessInterfaceModalitySchema = z.enum([
    "web_application",
    "network_api",
    "command_line",
    "software_library",
    "tool_server",
    "agent_service",
]);
export const agentReadinessInterfaceFunctionSchema = z.enum([
    "service_operation",
    "authentication",
    "commerce",
    "events",
    "recovery",
]);
export const agentReadinessDeclaredInterfaceSchema = z
    .object({
    interface_id: agentReadinessScopeKeySchema,
    modality: agentReadinessInterfaceModalitySchema,
    functions: z.array(agentReadinessInterfaceFunctionSchema).min(1),
    endpoint_ids: z.array(agentReadinessScopeKeySchema),
    resource_ids: z.array(agentReadinessScopeKeySchema),
    operated_by_participant_id: agentReadinessScopeKeySchema,
    standard_bindings: z.array(standardImplementationBindingSchema),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.functions, context, ["functions"], "Interface functions must be unique.");
    assertUnique(value.endpoint_ids, context, ["endpoint_ids"], "Interface endpoint IDs must be unique.");
    assertUnique(value.resource_ids, context, ["resource_ids"], "Interface resource IDs must be unique.");
    assertUniqueStandardBindings(value.standard_bindings, context, ["standard_bindings"]);
    if (value.endpoint_ids.length === 0 && value.resource_ids.length === 0) {
        context.addIssue({
            code: "custom",
            path: ["endpoint_ids"],
            message: "An interface must reference at least one endpoint or resource.",
        });
    }
});
export const agentReadinessAssessmentTargetSchema = z
    .object({
    target_id: agentReadinessScopeKeySchema,
    name: z.string().trim().min(1).max(240),
    interface_ids: z
        .array(agentReadinessScopeKeySchema)
        .min(1, "An assessment target must reference at least one interface."),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.interface_ids, context, ["interface_ids"], "Assessment target interface IDs must be unique.");
});
export const agentReadinessSurfaceRelationKindSchema = z.enum([
    "describes",
    "authenticates",
    "requires",
    "alternative_to",
    "precedes",
]);
export const agentReadinessSurfaceRelationSchema = z
    .object({
    relation_id: agentReadinessScopeKeySchema,
    kind: agentReadinessSurfaceRelationKindSchema,
    from: agentReadinessSurfaceReferenceSchema,
    to: agentReadinessSurfaceReferenceSchema,
})
    .strict();
export const agentReadinessOfferRelationPurposeSchema = z.enum([
    "application_path",
    "redemption_path",
    "operating_path",
]);
export const agentReadinessOfferRelationProposalSchema = z
    .object({
    offer_relation_proposal_id: agentReadinessIdentifierSchema,
    offer_id: agentReadinessOfferIdSchema,
    purpose: agentReadinessOfferRelationPurposeSchema,
    applicable_stages: z.array(agentReadinessStageSchema).min(1),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.applicable_stages, context, ["applicable_stages"], "Offer relation stages must be unique.");
});
export const agentReadinessDeclarationSourceTargetSchema = z
    .object({
    node_kind: z.enum([
        "declaration",
        "participant",
        "resource",
        "endpoint",
        "interface",
        "relation",
        "offer_relation",
        "assessment_target",
        "surface_exclusion",
    ]),
    node_id: agentReadinessIdentifierSchema,
})
    .strict();
const canonicalJsonPointerSchema = z.string().regex(/^\/(?:[^~/]|~0|~1)+(?:\/(?:[^~/]|~0|~1)+)*$/u);
const agentReadinessDeclarationSourceBindingFields = {
    source_binding_id: agentReadinessIdentifierSchema,
    source_id: agentReadinessIdentifierSchema,
    field_paths: z.array(canonicalJsonPointerSchema).min(1),
};
export const agentReadinessDeclarationSourceBindingSchema = z
    .object({
    ...agentReadinessDeclarationSourceBindingFields,
    target: agentReadinessDeclarationSourceTargetSchema,
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.field_paths, context, ["field_paths"], "Source-binding paths must be unique.");
});
const agentReadinessDeclarationGraphSourceTargetSchema = z
    .object({
    node_kind: z.enum([
        "declaration",
        "participant",
        "resource",
        "endpoint",
        "interface",
        "relation",
        "assessment_target",
        "surface_exclusion",
    ]),
    node_id: agentReadinessIdentifierSchema,
})
    .strict();
const agentReadinessDeclarationGraphSourceBindingSchema = z
    .object({
    ...agentReadinessDeclarationSourceBindingFields,
    target: agentReadinessDeclarationGraphSourceTargetSchema,
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.field_paths, context, ["field_paths"], "Source-binding paths must be unique.");
});
export const agentReadinessSurfaceExclusionSchema = z
    .object({
    exclusion_id: agentReadinessScopeKeySchema,
    role: agentReadinessResourceRoleSchema,
    rationale: z.string().trim().min(1).max(300),
})
    .strict();
const agentReadinessDeclarationCoreSchema = z
    .object({
    declaration_id: agentReadinessIdentifierSchema,
    scope: agentReadinessScopeSchema,
    assessment_targets: z.array(agentReadinessAssessmentTargetSchema).min(1),
    participants: z.array(agentReadinessParticipantSchema).min(1),
    resources: z.array(agentReadinessResourceSchema).min(1),
    endpoints: z.array(agentReadinessEndpointSchema),
    interfaces: z.array(agentReadinessDeclaredInterfaceSchema),
    relations: z.array(agentReadinessSurfaceRelationSchema),
    offer_relations: z.array(agentReadinessOfferRelationProposalSchema),
    source_bindings: z.array(agentReadinessDeclarationSourceBindingSchema).min(1),
    surface_exclusions: z.array(agentReadinessSurfaceExclusionSchema),
    authority_intent: z.enum(["entity", "community"]),
    declared_at: agentReadinessInstantSchema,
})
    .strict();
function validateSurfaceExclusions(value, context) {
    const ruledOut = value.surface_exclusions;
    assertUnique(ruledOut.map(({ exclusion_id }) => exclusion_id), context, ["surface_exclusions"], "Surface exclusion IDs must be unique.");
    const roles = ruledOut.map(({ role }) => role);
    if (new Set(roles).size !== roles.length) {
        context.addIssue({
            code: "custom",
            path: ["surface_exclusions"],
            message: "A surface role may be excluded only once.",
        });
    }
    const declared = new Set(value.resources.flatMap((resource) => resource.roles));
    for (const [index, surface] of ruledOut.entries()) {
        if (declared.has(surface.role)) {
            context.addIssue({
                code: "custom",
                path: ["surface_exclusions", index, "role"],
                message: `Role '${surface.role}' is declared by a resource and cannot also be excluded.`,
            });
        }
    }
}
export const agentReadinessDeclarationSchema = agentReadinessDeclarationCoreSchema
    .superRefine(validateDeclarationGraph)
    .superRefine(validateSurfaceExclusions);
const agentReadinessDeclarationGraphCoreSchema = agentReadinessDeclarationCoreSchema
    .omit({ offer_relations: true, source_bindings: true })
    .safeExtend({
    source_bindings: z.array(agentReadinessDeclarationGraphSourceBindingSchema).min(1),
})
    .strict();
export const agentReadinessDeclarationGraphSchema = agentReadinessDeclarationGraphCoreSchema.superRefine((value, context) => {
    validateDeclarationGraph({ ...value, offer_relations: [] }, context);
    validateSurfaceExclusions(value, context);
});
const agentReadinessDeclarationRevisionFieldsSchema = z
    .object({
    revision_contract: z.literal("sourcey.agent-readiness-declaration-revision/v1alpha1"),
    entity_id: agentReadinessEntityIdSchema,
    declaration: agentReadinessDeclarationGraphSchema,
    sources: z.array(authoringSourceSchema).min(1),
})
    .strict()
    .superRefine((value, context) => {
    const sourceIds = value.sources.map((source) => source.source_id);
    assertUnique(sourceIds, context, ["sources"], "Declaration revision sources must be unique.");
    const resolved = new Set(sourceIds);
    for (const [index, binding] of value.declaration.source_bindings.entries()) {
        if (!resolved.has(binding.source_id)) {
            context.addIssue({
                code: "custom",
                path: ["declaration", "source_bindings", index, "source_id"],
                message: `Declaration revision source '${binding.source_id}' is unresolved.`,
            });
        }
    }
    for (const [index, participant] of value.declaration.participants.entries()) {
        if ("origin_source_id" in participant.identity &&
            !resolved.has(participant.identity.origin_source_id)) {
            context.addIssue({
                code: "custom",
                path: ["declaration", "participants", index, "identity"],
                message: `Participant origin source '${participant.identity.origin_source_id}' is unresolved.`,
            });
        }
    }
    const subjects = value.declaration.participants.filter((participant) => participant.roles.includes("subject"));
    const subject = subjects[0];
    if (subjects.length !== 1 ||
        !subject ||
        !("entity_id" in subject.identity) ||
        subject.identity.entity_id !== value.entity_id) {
        context.addIssue({
            code: "custom",
            path: ["declaration", "participants"],
            message: "A declaration revision must bind one subject participant to its Entity.",
        });
    }
});
export const agentReadinessDeclarationRevisionCoreSchema = agentReadinessDeclarationRevisionFieldsSchema;
export const agentReadinessDeclarationRevisionSchema = agentReadinessDeclarationRevisionCoreSchema
    .safeExtend({ revision_digest: agentReadinessDigestSchema })
    .strict();
export const agentReadinessAuthoringSchema = z
    .object({
    schema_version: z.literal("sourcey.agent-readiness-authoring/v1alpha1"),
    entity: entityIdentityAuthoringSchema,
    sources: z.array(authoringSourceSchema).min(1),
    declarations: z.array(agentReadinessDeclarationSchema).min(1),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.declarations.map((declaration) => declaration.declaration_id), context, ["declarations"], "Readiness declaration IDs must be unique inside an Entity declaration.");
    assertUnique(value.declarations.map(({ scope }) => `${scope.product.key}\0${scope.funnel.key}`), context, ["declarations"], "An Entity can declare each product and funnel scope only once.");
    const sourceIds = new Set(value.sources.map((source) => source.source_id));
    for (const [declarationIndex, declaration] of value.declarations.entries()) {
        const subjectParticipants = declaration.participants.filter((participant) => participant.roles.includes("subject"));
        const subject = subjectParticipants[0];
        if (subjectParticipants.length !== 1 ||
            !subject ||
            !("entity_id" in subject.identity) ||
            subject.identity.entity_id !== value.entity.entity_id) {
            context.addIssue({
                code: "custom",
                path: ["declarations", declarationIndex, "participants"],
                message: "A declaration requires exactly one subject participant for its Entity.",
            });
        }
        for (const [participantIndex, participant] of declaration.participants.entries()) {
            if ("origin_source_id" in participant.identity &&
                !sourceIds.has(participant.identity.origin_source_id)) {
                context.addIssue({
                    code: "custom",
                    path: ["declarations", declarationIndex, "participants", participantIndex, "identity"],
                    message: `Unknown participant origin source '${participant.identity.origin_source_id}'.`,
                });
            }
        }
        for (const [bindingIndex, binding] of declaration.source_bindings.entries()) {
            if (!sourceIds.has(binding.source_id)) {
                context.addIssue({
                    code: "custom",
                    path: ["declarations", declarationIndex, "source_bindings", bindingIndex, "source_id"],
                    message: `Unknown source_id '${binding.source_id}'.`,
                });
            }
        }
    }
});
function validateDeclarationGraph(value, context) {
    assertUnique(value.assessment_targets.map((target) => target.target_id), context, ["assessment_targets"], "Assessment target IDs must be unique.");
    assertUnique(value.participants.map((participant) => participant.participant_id), context, ["participants"], "Participant IDs must be unique.");
    assertUnique(value.resources.map((resource) => resource.resource_id), context, ["resources"], "Resource IDs must be unique.");
    assertUnique(value.resources.map((resource) => resource.uri), context, ["resources"], "A resource URI must appear once and carry every applicable role.");
    assertUnique(value.endpoints.map((endpoint) => endpoint.endpoint_id), context, ["endpoints"], "Endpoint IDs must be unique.");
    assertUnique(value.endpoints.map((endpoint) => `${endpoint.transport}:${endpoint.uri}`), context, ["endpoints"], "An endpoint URI and transport pair must appear once and carry every applicable role.");
    assertUnique(value.interfaces.map((declaredInterface) => declaredInterface.interface_id), context, ["interfaces"], "Interface IDs must be unique.");
    assertUnique(value.relations.map((relation) => relation.relation_id), context, ["relations"], "Surface relation IDs must be unique.");
    assertUnique(value.offer_relations.map((relation) => relation.offer_relation_proposal_id), context, ["offer_relations"], "Offer relation proposal IDs must be unique.");
    assertUnique(value.offer_relations.map((relation) => `${relation.offer_id}:${relation.purpose}`), context, ["offer_relations"], "A declaration cannot repeat one Offer relation identity.");
    assertUnique(value.source_bindings.map((binding) => binding.source_binding_id), context, ["source_bindings"], "Source binding IDs must be unique.");
    const participants = new Set(value.participants.map((participant) => participant.participant_id));
    assertSurfaceOperators(value.resources, "resources", participants, context);
    assertSurfaceOperators(value.endpoints, "endpoints", participants, context);
    assertSurfaceOperators(value.interfaces, "interfaces", participants, context);
    const resourceIds = new Set(value.resources.map((resource) => resource.resource_id));
    const endpointIds = new Set(value.endpoints.map((endpoint) => endpoint.endpoint_id));
    const interfaceIds = new Set(value.interfaces.map((declaredInterface) => declaredInterface.interface_id));
    for (const [index, target] of value.assessment_targets.entries()) {
        for (const interfaceId of target.interface_ids) {
            if (!interfaceIds.has(interfaceId)) {
                context.addIssue({
                    code: "custom",
                    path: ["assessment_targets", index, "interface_ids"],
                    message: `Assessment target references unknown interface '${interfaceId}'.`,
                });
            }
        }
    }
    for (const [index, declaredInterface] of value.interfaces.entries()) {
        for (const endpointId of declaredInterface.endpoint_ids) {
            if (!endpointIds.has(endpointId)) {
                context.addIssue({
                    code: "custom",
                    path: ["interfaces", index, "endpoint_ids"],
                    message: `Interface references unknown endpoint '${endpointId}'.`,
                });
            }
        }
        for (const resourceId of declaredInterface.resource_ids) {
            if (!resourceIds.has(resourceId)) {
                context.addIssue({
                    code: "custom",
                    path: ["interfaces", index, "resource_ids"],
                    message: `Interface references unknown resource '${resourceId}'.`,
                });
            }
        }
    }
    const nodeKeys = new Set([
        ...value.resources.map((resource) => nodeKey("resource", resource.resource_id)),
        ...value.endpoints.map((endpoint) => nodeKey("endpoint", endpoint.endpoint_id)),
        ...value.interfaces.map((declaredInterface) => nodeKey("interface", declaredInterface.interface_id)),
    ]);
    for (const [index, relation] of value.relations.entries()) {
        const from = nodeKey(relation.from.node_kind, relation.from.node_id);
        const to = nodeKey(relation.to.node_kind, relation.to.node_id);
        if (!nodeKeys.has(from) || !nodeKeys.has(to)) {
            context.addIssue({
                code: "custom",
                path: ["relations", index],
                message: "A surface relation must close over nodes in the same declaration.",
            });
            continue;
        }
        if (from === to) {
            context.addIssue({
                code: "custom",
                path: ["relations", index],
                message: "A surface cannot relate to itself.",
            });
        }
        if (relation.kind === "describes" && relation.from.node_kind !== "resource") {
            context.addIssue({
                code: "custom",
                path: ["relations", index, "from"],
                message: "Only a retrievable resource can describe another surface.",
            });
        }
        if (relation.kind === "authenticates" &&
            !["endpoint", "interface"].includes(relation.to.node_kind)) {
            context.addIssue({
                code: "custom",
                path: ["relations", index, "to"],
                message: "Authentication relations must target a callable endpoint or interface.",
            });
        }
        if (relation.kind === "alternative_to" && from.localeCompare(to) >= 0) {
            context.addIssue({
                code: "custom",
                path: ["relations", index],
                message: "Alternative surfaces must be stored once in canonical node order.",
            });
        }
    }
    assertAcyclic(value.relations, "requires", context);
    assertAcyclic(value.relations, "precedes", context);
    assertInterfaceTargetClosure(value, context);
    validateSourceBindings(value, context);
}
function assertInterfaceTargetClosure(value, context) {
    const reachable = new Set(value.assessment_targets.flatMap((target) => target.interface_ids));
    let changed = true;
    while (changed) {
        changed = false;
        for (const relation of value.relations) {
            if (relation.from.node_kind !== "interface" || relation.to.node_kind !== "interface") {
                continue;
            }
            if (reachable.has(relation.from.node_id) && !reachable.has(relation.to.node_id)) {
                reachable.add(relation.to.node_id);
                changed = true;
            }
            if (reachable.has(relation.to.node_id) && !reachable.has(relation.from.node_id)) {
                reachable.add(relation.from.node_id);
                changed = true;
            }
        }
    }
    const orphaned = value.interfaces
        .map((declaredInterface) => declaredInterface.interface_id)
        .filter((interfaceId) => !reachable.has(interfaceId));
    if (orphaned.length > 0) {
        context.addIssue({
            code: "custom",
            path: ["interfaces"],
            message: `Interfaces must close from an assessment target: ${orphaned.sort().join(", ")}.`,
        });
    }
}
function validateSourceBindings(value, context) {
    const targets = new Map();
    const required = new Set();
    const addTarget = (kind, id, paths) => {
        targets.set(`${kind}:${id}`, new Set(paths));
        for (const path of paths)
            required.add(`${kind}:${id}:${path}`);
    };
    addTarget("declaration", value.declaration_id, ["/scope/product/name", "/scope/funnel/name"]);
    for (const target of value.assessment_targets) {
        addTarget("assessment_target", target.target_id, ["/name", "/interface_ids"]);
    }
    for (const participant of value.participants) {
        addTarget("participant", participant.participant_id, ["/roles", "/identity"]);
    }
    for (const resource of value.resources) {
        addTarget("resource", resource.resource_id, [
            "/uri",
            "/roles",
            "/operated_by_participant_id",
            ...(resource.standard_bindings.length > 0 ? ["/standard_bindings"] : []),
            ...(resource.allowed_redirect_hosts ? ["/allowed_redirect_hosts"] : []),
        ]);
    }
    for (const endpoint of value.endpoints) {
        addTarget("endpoint", endpoint.endpoint_id, [
            "/uri",
            "/transport",
            "/roles",
            "/operated_by_participant_id",
            ...(endpoint.standard_bindings.length > 0 ? ["/standard_bindings"] : []),
            ...(endpoint.allowed_redirect_hosts ? ["/allowed_redirect_hosts"] : []),
        ]);
    }
    for (const declaredInterface of value.interfaces) {
        addTarget("interface", declaredInterface.interface_id, [
            "/modality",
            "/functions",
            ...(declaredInterface.endpoint_ids.length > 0 ? ["/endpoint_ids"] : []),
            ...(declaredInterface.resource_ids.length > 0 ? ["/resource_ids"] : []),
            "/operated_by_participant_id",
            ...(declaredInterface.standard_bindings.length > 0 ? ["/standard_bindings"] : []),
        ]);
    }
    for (const relation of value.relations) {
        addTarget("relation", relation.relation_id, ["/kind", "/from", "/to"]);
    }
    for (const relation of value.offer_relations) {
        addTarget("offer_relation", relation.offer_relation_proposal_id, [
            "/offer_id",
            "/purpose",
            "/applicable_stages",
        ]);
    }
    for (const exclusion of value.surface_exclusions) {
        addTarget("surface_exclusion", exclusion.exclusion_id, ["/role", "/rationale"]);
    }
    const covered = new Set();
    const claims = new Set();
    for (const [index, binding] of value.source_bindings.entries()) {
        const targetKey = `${binding.target.node_kind}:${binding.target.node_id}`;
        const allowed = targets.get(targetKey);
        if (!allowed) {
            context.addIssue({
                code: "custom",
                path: ["source_bindings", index, "target"],
                message: "A source binding must target a node in the same declaration.",
            });
            continue;
        }
        for (const [pathIndex, path] of binding.field_paths.entries()) {
            if (!allowed.has(path)) {
                context.addIssue({
                    code: "custom",
                    path: ["source_bindings", index, "field_paths", pathIndex],
                    message: `Source binding path '${path}' is not a material field of ${targetKey}.`,
                });
                continue;
            }
            const claim = `${binding.source_id}:${targetKey}:${path}`;
            if (claims.has(claim)) {
                context.addIssue({
                    code: "custom",
                    path: ["source_bindings", index, "field_paths", pathIndex],
                    message: "A source cannot bind the same target field more than once.",
                });
            }
            claims.add(claim);
            covered.add(`${targetKey}:${path}`);
        }
    }
    const missing = [...required].filter((claim) => !covered.has(claim)).sort();
    if (missing.length > 0) {
        context.addIssue({
            code: "custom",
            path: ["source_bindings"],
            message: `Material declaration fields lack source coverage: ${missing.join(", ")}.`,
        });
    }
}
function assertAcyclic(relations, kind, context) {
    const edges = new Map();
    for (const relation of relations) {
        if (relation.kind !== kind)
            continue;
        const from = nodeKey(relation.from.node_kind, relation.from.node_id);
        const to = nodeKey(relation.to.node_kind, relation.to.node_id);
        edges.set(from, [...(edges.get(from) ?? []), to]);
    }
    const visiting = new Set();
    const visited = new Set();
    const visit = (node) => {
        if (visiting.has(node))
            return true;
        if (visited.has(node))
            return false;
        visiting.add(node);
        for (const next of edges.get(node) ?? [])
            if (visit(next))
                return true;
        visiting.delete(node);
        visited.add(node);
        return false;
    };
    if ([...edges.keys()].some(visit)) {
        context.addIssue({
            code: "custom",
            path: ["relations"],
            message: `Surface ${kind} relations must be acyclic.`,
        });
    }
}
function assertSurfaceOperators(surfaces, path, participantIds, context) {
    for (const [index, surface] of surfaces.entries()) {
        if (!participantIds.has(surface.operated_by_participant_id)) {
            context.addIssue({
                code: "custom",
                path: [path, index, "operated_by_participant_id"],
                message: "A surface operator must reference a participant in the same declaration.",
            });
        }
    }
}
function assertUniqueStandardBindings(bindings, context, path) {
    assertUnique(bindings.map((binding) => `${binding.namespace}:${binding.version}:${binding.relation}`), context, path, "Standard implementation bindings must be unique.");
}
function assertCanonicalOptionalHosts(hosts, context) {
    if (!hosts)
        return;
    const ordered = [...hosts].sort();
    if (new Set(hosts).size !== hosts.length ||
        hosts.some((host, index) => host !== ordered[index])) {
        context.addIssue({
            code: "custom",
            path: ["allowed_redirect_hosts"],
            message: "Allowed redirect hosts must be unique and canonically ordered.",
        });
    }
}
function nodeKey(kind, id) {
    return `${kind}:${id}`;
}
function assertUnique(values, context, path, message) {
    if (new Set(values).size !== values.length)
        context.addIssue({ code: "custom", path, message });
}
//# sourceMappingURL=declaration.js.map