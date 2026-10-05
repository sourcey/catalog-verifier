import { canonicalJson, compareCanonicalStrings, digest } from "provenry/primitives";
import { publicationRecompositionNodeSchema } from "../../../contracts/publication/src/index.js";
import { dependentKey, orderedUnique, } from "./publication-dependencies.js";
/**
 * Plans one digest-gated DAG to a fixed point. Callers supply semantic outputs
 * produced from immutable inputs; this owner decides propagation and proves
 * that no intermediate wave becomes a publication head.
 */
export function planCatalogPublicationRecomposition(input) {
    if (input.changeSet.impact_index_digest !== input.impactIndex.indexDigest) {
        throw new Error("Recomposition requires the Change Set's exact dependency index.");
    }
    const nodes = input.nodes
        .map((node) => {
        const parsed = publicationRecompositionNodeSchema.parse({
            ...node,
            dependency_keys: orderedUnique(node.dependency_keys),
        });
        const indexed = input.impactIndex.registration(parsed.dependent);
        if (!indexed ||
            canonicalJson(indexed.dependency_keys) !== canonicalJson(parsed.dependency_keys)) {
            throw new Error(`Recomposition node ${dependentKey(parsed.dependent)} does not match its indexed dependency registration.`);
        }
        return parsed;
    })
        .sort((left, right) => compareCanonicalStrings(dependentKey(left.dependent), dependentKey(right.dependent)));
    const nodesByDependent = new Map();
    const nodesByOutput = new Map();
    for (const node of nodes) {
        const key = dependentKey(node.dependent);
        if (nodesByDependent.has(key)) {
            throw new Error(`Recomposition dependent ${key} is registered more than once.`);
        }
        if (nodesByOutput.has(node.output_dependency_key)) {
            throw new Error(`Recomposition output ${node.output_dependency_key} has more than one owner.`);
        }
        nodesByDependent.set(key, node);
        nodesByOutput.set(node.output_dependency_key, node);
    }
    assertAcyclicRecompositionGraph(nodes, nodesByOutput);
    const initialChangedDependencyKeys = orderedUnique([
        ...input.changeSet.changed_dependency_keys,
        ...(input.invalidatedDependencyKeys ?? []),
    ]);
    const additionalInvalidations = orderedUnique(input.invalidatedDependencyKeys ?? []).filter((key) => !input.changeSet.changed_dependency_keys.includes(key));
    const additionalImpact = input.impactIndex.affected(additionalInvalidations);
    const initialAffected = new Map([...input.changeSet.affected_dependents, ...additionalImpact.dependents].map((dependent) => [
        dependentKey(dependent),
        dependent,
    ]));
    const allChanged = new Set(initialChangedDependencyKeys);
    const pending = new Map();
    const processed = new Set();
    const waves = [];
    let dependencyLookups = input.changeSet.dependency_lookups + additionalImpact.lookups;
    let changedThisWave = initialChangedDependencyKeys;
    let firstWave = true;
    while (changedThisWave.length > 0) {
        const affected = firstWave
            ? [...initialAffected.values()]
            : input.impactIndex.affected(changedThisWave).dependents;
        if (!firstWave)
            dependencyLookups += orderedUnique(changedThisWave).length;
        firstWave = false;
        for (const dependent of affected) {
            const key = dependentKey(dependent);
            if (processed.has(key))
                continue;
            const node = nodesByDependent.get(key);
            if (!node)
                throw new Error(`Missing affected recomposition registration ${key}.`);
            pending.set(key, node);
        }
        if (pending.size === 0)
            break;
        const ready = [...pending.values()]
            .filter((node) => node.dependency_keys.every((dependencyKey) => {
            const producer = nodesByOutput.get(dependencyKey);
            return !producer || !pending.has(dependentKey(producer.dependent));
        }))
            .sort((left, right) => compareCanonicalStrings(dependentKey(left.dependent), dependentKey(right.dependent)));
        if (ready.length === 0) {
            throw new Error("Affected recomposition graph cannot make topological progress.");
        }
        const actions = ready.map((node) => {
            const key = dependentKey(node.dependent);
            pending.delete(key);
            processed.add(key);
            const changedDependencyKeys = node.dependency_keys.filter((dependencyKey) => allChanged.has(dependencyKey));
            if (changedDependencyKeys.length === 0) {
                throw new Error(`Affected recomposition node ${key} has no changed indexed dependency.`);
            }
            const outputChanged = node.current_output_digest !== node.candidate_output_digest;
            return {
                dependent: node.dependent,
                action: node.action,
                changedDependencyKeys,
                currentOutputDigest: node.current_output_digest,
                candidateOutputDigest: node.candidate_output_digest,
                outputChanged,
                emittedDependencyKey: outputChanged ? node.output_dependency_key : null,
                work: node.work,
            };
        });
        changedThisWave = orderedUnique(actions.flatMap((action) => action.emittedDependencyKey === null ? [] : [action.emittedDependencyKey]));
        for (const key of changedThisWave)
            allChanged.add(key);
        waves.push({
            wave: waves.length,
            changedDependencyKeys: orderedUnique(actions.flatMap((action) => action.changedDependencyKeys)),
            actions,
        });
    }
    const work = sumRecompositionWork(waves.flatMap((wave) => wave.actions.map((action) => action.work)));
    const core = {
        changeSetDigest: input.changeSet.change_set_digest,
        impactIndexDigest: input.impactIndex.indexDigest,
        initialChangedDependencyKeys,
        waves,
        changedDependencyKeys: [...allChanged].sort(compareCanonicalStrings),
        work,
        dependencyLookups,
        sourceUnaffectedDependentsProofDigest: input.changeSet.unaffected_dependents_proof_digest,
    };
    const unaffectedDependentsProofDigest = digest({
        impact_index_digest: input.impactIndex.indexDigest,
        changed_dependency_keys: core.changedDependencyKeys,
        affected_dependents: [...processed].sort(compareCanonicalStrings),
    });
    const planCore = { ...core, unaffectedDependentsProofDigest };
    return { ...planCore, planDigest: digest(planCore) };
}
function assertAcyclicRecompositionGraph(nodes, nodesByOutput) {
    const visiting = new Set();
    const visited = new Set();
    const visit = (node) => {
        const key = dependentKey(node.dependent);
        if (visiting.has(key))
            throw new Error(`Recomposition dependency cycle reaches ${key}.`);
        if (visited.has(key))
            return;
        visiting.add(key);
        for (const dependency of node.dependency_keys) {
            const producer = nodesByOutput.get(dependency);
            if (producer)
                visit(producer);
        }
        visiting.delete(key);
        visited.add(key);
    };
    for (const node of nodes)
        visit(node);
}
function sumRecompositionWork(values) {
    return values.reduce((total, value) => ({
        capture: total.capture + value.capture,
        interpretation: total.interpretation + value.interpretation,
        signal: total.signal + value.signal,
        profile: total.profile + value.profile,
        projection: total.projection + value.projection,
    }), { capture: 0, interpretation: 0, signal: 0, profile: 0, projection: 0 });
}
//# sourceMappingURL=publication-recomposition.js.map