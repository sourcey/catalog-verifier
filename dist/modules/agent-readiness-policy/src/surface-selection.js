import { canonicalJson, compareCanonicalStrings } from "../../primitives/src/index.js";
export function surfaceKey(value) {
    return `${value.node_kind}:${value.node_id}`;
}
export function surfaceCatalogFromDeclaration(revision) {
    return surfaceCatalogFromDeclarationGraph(revision.declaration);
}
export function surfaceCatalogFromDeclarationGraph(declaration) {
    const { assessment_targets, participants, resources, endpoints, interfaces, relations, surface_exclusions, } = declaration;
    return {
        assessment_targets,
        participants,
        resources,
        endpoints,
        interfaces,
        relations,
        surface_exclusions,
    };
}
export function assertSignalSurfaceClosure(revision, declarationRevision) {
    const surfaces = new Set([
        ...declarationRevision.declaration.resources.map((resource) => `resource:${resource.resource_id}`),
        ...declarationRevision.declaration.endpoints.map((endpoint) => `endpoint:${endpoint.endpoint_id}`),
        ...declarationRevision.declaration.interfaces.map((declaredInterface) => `interface:${declaredInterface.interface_id}`),
        ...declarationRevision.declaration.surface_exclusions.map((exclusion) => `surface_exclusion:${exclusion.exclusion_id}`),
    ]);
    for (const signal of revision.signals) {
        const unresolved = signal.tested_surfaces.filter((surface) => !surfaces.has(surfaceKey(surface)));
        if (unresolved.length > 0) {
            throw new Error(`Agent readiness signal ${signal.stage}:${signal.signal_code} names a surface outside its declaration revision.`);
        }
    }
}
export function assertAgentReadinessSignalSelectorCoverage(signal, group, catalog, allowNotApplicable) {
    const selected = selectAgentReadinessTestedSurfaces({
        group,
        catalog,
        allowNotApplicable,
    });
    const selectedKeys = new Set(selected.map(surfaceKey));
    const tested = [...signal.tested_surfaces].sort((left, right) => compareCanonicalStrings(surfaceKey(left), surfaceKey(right)));
    if (selected.length === 0 ||
        tested.length === 0 ||
        canonicalJson(tested) !== canonicalJson(signal.tested_surfaces) ||
        tested.some((surface) => !selectedKeys.has(surfaceKey(surface))) ||
        (group.coverage === "all_matches" && canonicalJson(selected) !== canonicalJson(tested))) {
        throw new Error(`Agent readiness signal ${signal.stage}:${signal.signal_code} does not close selector group ${group.selector_group_id}.`);
    }
}
export function selectAgentReadinessTestedSurfaces(input) {
    const surfaces = input.group.coverage === "all_matches"
        ? [
            ...matchingAgentReadinessSurfaces(input.group, input.catalog),
            ...(input.allowNotApplicable
                ? matchingAgentReadinessSurfaceExclusions(input.group, input.catalog)
                : []),
        ]
        : preferredAgentReadinessSurfaces(input.group, input.catalog, input.allowNotApplicable);
    return [...surfaces].sort((left, right) => compareCanonicalStrings(surfaceKey(left), surfaceKey(right)));
}
function preferredAgentReadinessSurfaces(group, catalog, allowNotApplicable) {
    for (const alternative of group.alternatives) {
        const matches = matchingAgentReadinessSurfaces({ ...group, alternatives: [alternative] }, catalog);
        if (matches.length > 0)
            return [...matches];
    }
    if (allowNotApplicable) {
        for (const alternative of group.alternatives) {
            const exclusions = matchingAgentReadinessSurfaceExclusions({ ...group, alternatives: [alternative] }, catalog);
            if (exclusions.length > 0)
                return [...exclusions];
        }
    }
    return [];
}
export function matchingAgentReadinessSurfaceExclusions(group, catalog) {
    return catalog.surface_exclusions
        .filter((exclusion) => group.alternatives.some((alternative) => alternative.selectors.some((selector) => selector.kind === "resource_role" && selector.roles.includes(exclusion.role))))
        .map((exclusion) => ({
        node_kind: "surface_exclusion",
        node_id: exclusion.exclusion_id,
    }));
}
export function matchingAgentReadinessSurfaces(group, catalog) {
    return allDeclaredSurfaces(catalog)
        .filter((surface) => group.alternatives.some((alternative) => alternative.selectors.every((selector) => selectorMatchesSurface(selector, surface, catalog))))
        .map(({ node_kind, node_id }) => ({ node_kind, node_id }));
}
export function agentReadinessDeclarationPolicyGaps(input) {
    const catalog = surfaceCatalogFromDeclarationGraph(input.declaration);
    const surfaces = allDeclaredSurfaces(catalog);
    const excludedRoles = new Set(input.declaration.surface_exclusions.map((item) => item.role));
    const gaps = [];
    for (const rule of input.policy.signal_rules.filter((candidate) => candidate.evaluation_role !== "informational")) {
        const matchedGroups = rule.selector_groups.filter((group) => {
            const matched = surfaces.some((surface) => group.alternatives.some((alternative) => alternative.selectors.every((selector) => selectorMatchesSurface(selector, surface, catalog))));
            const excluded = rule.allow_not_applicable &&
                group.alternatives.some((alternative) => alternative.selectors.some((selector) => selector.kind === "resource_role" &&
                    selector.roles.some((role) => excludedRoles.has(role))));
            return matched || excluded;
        });
        if (matchedGroups.length === 0) {
            gaps.push({
                stage: rule.stage,
                signalCode: rule.signal_code,
                selectorGroupIds: rule.selector_groups.map((group) => group.selector_group_id),
            });
        }
    }
    return gaps;
}
export function assertAgentReadinessDeclarationPolicyClosure(input) {
    const gap = agentReadinessDeclarationPolicyGaps(input)[0];
    if (gap) {
        throw new Error(`Declaration ${input.declaration.declaration_id} cannot plan ${gap.stage}:${gap.signalCode} through any selector group (${gap.selectorGroupIds.join(", ")}).`);
    }
}
function allDeclaredSurfaces(catalog) {
    return [
        ...catalog.resources.map((resource) => ({
            ...resource,
            node_kind: "resource",
            node_id: resource.resource_id,
        })),
        ...catalog.endpoints.map((endpoint) => ({
            ...endpoint,
            node_kind: "endpoint",
            node_id: endpoint.endpoint_id,
        })),
        ...catalog.interfaces.map((declaredInterface) => ({
            ...declaredInterface,
            node_kind: "interface",
            node_id: declaredInterface.interface_id,
        })),
    ];
}
function selectorMatchesSurface(selector, surface, catalog) {
    if (selector.kind === "resource_role") {
        return (surface.node_kind === "resource" &&
            selector.roles.some((role) => surface.roles.includes(role)));
    }
    if (selector.kind === "endpoint_role") {
        return (surface.node_kind === "endpoint" &&
            selector.roles.some((role) => surface.roles.includes(role)));
    }
    if (selector.kind === "interface_signature") {
        return (surface.node_kind === "interface" &&
            selector.modalities.includes(surface.modality) &&
            selector.functions.every((fn) => surface.functions.includes(fn)));
    }
    if (selector.kind === "assessment_target_membership") {
        if (selector.membership === "direct") {
            return (surface.node_kind === "interface" &&
                catalog.assessment_targets.some((target) => target.interface_ids.includes(surface.interface_id)));
        }
        return targetReachableSurfaceKeys(catalog).has(surfaceKey(surface));
    }
    if (selector.kind === "target_relation") {
        const targetInterfaces = new Set(catalog.assessment_targets.flatMap((target) => target.interface_ids));
        return catalog.relations.some((relation) => {
            if (relation.kind !== selector.relation_kind)
                return false;
            const targetSide = selector.direction === "from_target" ? relation.from : relation.to;
            const surfaceSide = selector.direction === "from_target" ? relation.to : relation.from;
            return (targetSide.node_kind === "interface" &&
                targetInterfaces.has(targetSide.node_id) &&
                surfaceKey(surfaceSide) === surfaceKey(surface));
        });
    }
    return surface.standard_bindings.some((binding) => binding.namespace === selector.requirement.namespace &&
        binding.version === selector.requirement.version);
}
function targetReachableSurfaceKeys(catalog) {
    const reachable = new Set(catalog.assessment_targets.flatMap((target) => target.interface_ids.map((interfaceId) => `interface:${interfaceId}`)));
    let changed = true;
    while (changed) {
        changed = false;
        for (const declaredInterface of catalog.interfaces) {
            if (!reachable.has(`interface:${declaredInterface.interface_id}`))
                continue;
            for (const resourceId of declaredInterface.resource_ids) {
                changed = addToSet(reachable, `resource:${resourceId}`) || changed;
            }
            for (const endpointId of declaredInterface.endpoint_ids) {
                changed = addToSet(reachable, `endpoint:${endpointId}`) || changed;
            }
        }
        for (const relation of catalog.relations) {
            const from = surfaceKey(relation.from);
            const to = surfaceKey(relation.to);
            if (relation.kind === "alternative_to") {
                if (reachable.has(from))
                    changed = addToSet(reachable, to) || changed;
                if (reachable.has(to))
                    changed = addToSet(reachable, from) || changed;
            }
            else if (relation.kind === "requires" && reachable.has(from)) {
                changed = addToSet(reachable, to) || changed;
            }
            else if (["describes", "authenticates", "precedes"].includes(relation.kind) &&
                reachable.has(to)) {
                changed = addToSet(reachable, from) || changed;
            }
        }
    }
    return reachable;
}
function addToSet(values, value) {
    if (values.has(value))
        return false;
    values.add(value);
    return true;
}
//# sourceMappingURL=surface-selection.js.map