import { catalogPublicationChangeSetCoreSchema, catalogPublicationChangeSetSchema, catalogPublicationCurrentStateCoreSchema, catalogPublicationCurrentStateSchema, catalogPublicationProposalCoreSchema, catalogPublicationProposalSchema, publicationIngressReceiptCoreSchema, publicationIngressReceiptSchema, publicationPolicyReferenceSchema, } from "../../../contracts/publication/src/index.js";
import { compileEntity } from "../../catalog-model/src/index.js";
import { canonicalJson, compareCanonicalStrings, digest, } from "../../primitives/src/index.js";
import { catalogPublicationAssetBindingKey as assetBindingKey, catalogPublicationAssetBindingMap as assetBindingMap, normalizeCatalogPublicationAssetProposals as normalizeAssetProposals, } from "./publication-assets.js";
import { CatalogPublicationImpactIndex, dependencyKeysForChanges, orderedUnique, requiredAuthoritiesForChanges, } from "./publication-dependencies.js";
import { catalogPublicationEntityMap as entityMap, catalogPublicationTargetAuthoring as publicationCandidateState, } from "./publication-entities.js";
export * from "./publication-dependencies.js";
export * from "./publication-entities.js";
export * from "./publication-recomposition.js";
export function verifyCatalogPublicationCurrentState(input) {
    const state = catalogPublicationCurrentStateSchema.parse(input);
    const targetEntityIds = orderedUnique(state.target_entity_ids);
    const entities = [...entityMap(state.current_entities).values()].sort((left, right) => compareCanonicalStrings(left.entity.entity_id, right.entity.entity_id));
    const assets = [...assetBindingMap(state.current_asset_bindings).values()].sort((left, right) => compareCanonicalStrings(assetBindingKey(left.entity_id, left.role), assetBindingKey(right.entity_id, right.role)));
    if (canonicalJson(state.target_entity_ids) !== canonicalJson(targetEntityIds) ||
        canonicalJson(state.current_entities) !== canonicalJson(entities) ||
        canonicalJson(state.current_asset_bindings) !== canonicalJson(assets) ||
        entities.some(({ entity: { entity_id: entityId } }) => !targetEntityIds.includes(entityId))) {
        throw new Error("Catalog publication current state is not a canonical targeted slice.");
    }
    const { state_digest: stateDigest, ...core } = state;
    if (digest(catalogPublicationCurrentStateCoreSchema.parse(core)) !== stateDigest) {
        throw new Error("Catalog publication current-state digest does not match its canonical input.");
    }
    return state;
}
export function buildCatalogPublicationProposal(input) {
    const current = entityMap(input.currentEntities);
    const candidates = [...entityMap(input.candidateEntities).values()].sort((left, right) => compareCanonicalStrings(left.entity.entity_id, right.entity.entity_id));
    const currentAssets = assetBindingMap(input.currentAssetBindings ?? []);
    const candidateAssets = normalizeAssetProposals(input.candidateAssetProposals ?? []);
    const removals = orderedUnique(input.removeEntityIds ?? []);
    const authorityProposals = normalizeAuthorityProposals([
        ...(input.authorityProposals ?? []),
        ...candidateAssets.map((proposal) => ({
            purpose: "catalog-identity",
            proposal_digest: proposal.proposal_digest,
        })),
    ]);
    const candidateIds = new Set(candidates.map(({ entity: { entity_id: entityId } }) => entityId));
    const overlap = removals.filter((entityId) => candidateIds.has(entityId));
    if (overlap.length > 0) {
        throw new Error(`Catalog proposal cannot update and remove the same Entity: ${overlap.join(", ")}.`);
    }
    const assetEntityIds = candidateAssets.map(({ entity_id: entityId }) => entityId);
    const removalAssets = [...currentAssets.values()].filter((binding) => removals.includes(binding.entity_id));
    const removalsWithoutIcon = removals.filter((entityId) => removalAssets.filter((binding) => binding.entity_id === entityId && binding.role === "icon")
        .length !== 1);
    if (removalsWithoutIcon.length > 0) {
        throw new Error(`Removed Catalog Entities require one exact current icon binding: ${removalsWithoutIcon.join(", ")}.`);
    }
    const candidateIconEntityIds = new Set(candidateAssets
        .filter(({ role }) => role === "icon")
        .map(({ entity_id: entityId }) => entityId));
    const addedWithoutIcon = candidates
        .filter(({ entity: { entity_id: entityId } }) => !current.has(entityId))
        .map(({ entity: { entity_id: entityId } }) => entityId)
        .filter((entityId) => !candidateIconEntityIds.has(entityId));
    if (addedWithoutIcon.length > 0) {
        throw new Error(`New Catalog Entities require an admitted icon proposal: ${addedWithoutIcon.join(", ")}.`);
    }
    const assetRemovalOverlap = removals.filter((entityId) => assetEntityIds.includes(entityId));
    if (assetRemovalOverlap.length > 0) {
        throw new Error(`Catalog proposal cannot bind an icon while removing its Entity: ${assetRemovalOverlap.join(", ")}.`);
    }
    for (const proposal of candidateAssets) {
        if (proposal.base_release_id !== input.liveParentReleaseId) {
            throw new Error(`Entity asset proposal ${proposal.proposal_digest} targets another release.`);
        }
        if (!current.has(proposal.entity_id) && !candidateIds.has(proposal.entity_id)) {
            throw new Error(`Entity asset proposal targets unknown Entity ${proposal.entity_id}.`);
        }
        const currentBinding = currentAssets.get(assetBindingKey(proposal.entity_id, proposal.role));
        if ((currentBinding?.binding_event_id ?? null) !== proposal.expected_current_binding_event_id) {
            throw new Error(`Entity asset proposal for ${proposal.entity_id} has a stale current binding.`);
        }
    }
    const targetIds = orderedUnique([...candidateIds, ...removals, ...assetEntityIds]);
    const core = catalogPublicationProposalCoreSchema.parse({
        live_parent_release_id: input.liveParentReleaseId,
        candidate_entities: candidates,
        candidate_assets: candidateAssets,
        remove_entity_ids: removals,
        expected_current_entities: targetIds.map((entityId) => ({
            entity_id: entityId,
            snapshot_digest: current.has(entityId) ? digest(current.get(entityId)) : null,
        })),
        expected_current_asset_bindings: [
            ...candidateAssets.map((proposal) => {
                const currentBinding = currentAssets.get(assetBindingKey(proposal.entity_id, proposal.role));
                return {
                    entity_id: proposal.entity_id,
                    role: proposal.role,
                    binding_event_id: currentBinding?.binding_event_id ?? null,
                    binding_digest: currentBinding ? digest(currentBinding) : null,
                };
            }),
            ...removalAssets.map((binding) => ({
                entity_id: binding.entity_id,
                role: binding.role,
                binding_event_id: binding.binding_event_id,
                binding_digest: digest(binding),
            })),
        ].sort((left, right) => compareCanonicalStrings(assetBindingKey(left.entity_id, left.role), assetBindingKey(right.entity_id, right.role))),
        authority_proposals: authorityProposals,
        target_policies: normalizePolicies(input.targetPolicies),
        target_contract_authority_digest: input.targetContractAuthorityDigest,
    });
    return verifyCatalogPublicationProposal({ ...core, proposal_digest: digest(core) });
}
export function verifyCatalogPublicationProposal(input) {
    const proposal = catalogPublicationProposalSchema.parse(input);
    const normalizedCandidates = [...entityMap(proposal.candidate_entities).values()].sort((left, right) => compareCanonicalStrings(left.entity.entity_id, right.entity.entity_id));
    const candidateAssets = normalizeAssetProposals(proposal.candidate_assets);
    const removals = orderedUnique(proposal.remove_entity_ids);
    const expected = [...proposal.expected_current_entities].sort((left, right) => compareCanonicalStrings(left.entity_id, right.entity_id));
    const expectedAssets = [...proposal.expected_current_asset_bindings].sort((left, right) => compareCanonicalStrings(assetBindingKey(left.entity_id, left.role), assetBindingKey(right.entity_id, right.role)));
    const authorityProposals = normalizeAuthorityProposals(proposal.authority_proposals);
    const policies = normalizePolicies(proposal.target_policies);
    if (canonicalJson(proposal.candidate_entities) !== canonicalJson(normalizedCandidates) ||
        canonicalJson(proposal.candidate_assets) !== canonicalJson(candidateAssets) ||
        canonicalJson(proposal.remove_entity_ids) !== canonicalJson(removals) ||
        canonicalJson(proposal.expected_current_entities) !== canonicalJson(expected) ||
        canonicalJson(proposal.expected_current_asset_bindings) !== canonicalJson(expectedAssets) ||
        canonicalJson(proposal.authority_proposals) !== canonicalJson(authorityProposals) ||
        canonicalJson(proposal.target_policies) !== canonicalJson(policies)) {
        throw new Error("Catalog publication proposal collections are not canonically ordered.");
    }
    const candidateIds = normalizedCandidates.map(({ entity: { entity_id: entityId } }) => entityId);
    if (removals.some((entityId) => candidateIds.includes(entityId))) {
        throw new Error("Catalog publication proposal cannot update and remove the same Entity.");
    }
    const assetEntityIds = candidateAssets.map(({ entity_id: entityId }) => entityId);
    if (removals.some((entityId) => assetEntityIds.includes(entityId))) {
        throw new Error("Catalog publication proposal cannot bind an icon while removing its Entity.");
    }
    if (candidateAssets.some((asset) => asset.base_release_id !== proposal.live_parent_release_id)) {
        throw new Error("Catalog publication asset proposal targets another live parent.");
    }
    const targetIds = orderedUnique([...candidateIds, ...removals, ...assetEntityIds]);
    if (canonicalJson(expected.map(({ entity_id: entityId }) => entityId)) !== canonicalJson(targetIds)) {
        throw new Error("Catalog publication proposal must bind every targeted live Entity.");
    }
    const expectedAssetByKey = new Map(expectedAssets.map((binding) => [assetBindingKey(binding.entity_id, binding.role), binding]));
    if (expectedAssetByKey.size !== expectedAssets.length ||
        candidateAssets.some((asset) => {
            const expectedBinding = expectedAssetByKey.get(assetBindingKey(asset.entity_id, asset.role));
            return (!expectedBinding ||
                expectedBinding.binding_event_id !== asset.expected_current_binding_event_id);
        }) ||
        expectedAssets.some((binding) => !candidateIds.includes(binding.entity_id) &&
            !assetEntityIds.includes(binding.entity_id) &&
            !removals.includes(binding.entity_id)) ||
        removals.some((entityId) => expectedAssets.filter((binding) => binding.entity_id === entityId).length !== 1 ||
            expectedAssets.find((binding) => binding.entity_id === entityId)?.binding_event_id === null) ||
        expectedAssetByKey.size !== candidateAssets.length + removals.length) {
        throw new Error("Catalog publication proposal must bind every exact current asset role.");
    }
    const { proposal_digest: proposalDigest, ...proposalCore } = proposal;
    if (digest(catalogPublicationProposalCoreSchema.parse(proposalCore)) !== proposalDigest) {
        throw new Error("Catalog publication proposal digest does not match its canonical input.");
    }
    return proposal;
}
export function planCatalogPublication(input) {
    const proposal = buildCatalogPublicationProposal(input);
    return {
        proposal,
        changeSet: deriveCatalogPublicationChangeSet({
            proposal,
            currentEntities: input.currentEntities,
            currentAssetBindings: input.currentAssetBindings ?? [],
            currentPolicies: input.currentPolicies,
            currentContractAuthorityDigest: input.currentContractAuthorityDigest,
            ...(input.impactIndex ? { impactIndex: input.impactIndex } : {}),
        }),
    };
}
export function deriveCatalogPublicationChangeSet(input) {
    const proposal = verifyCatalogPublicationProposal(input.proposal);
    const current = entityMap(input.currentEntities);
    const currentAssets = assetBindingMap(input.currentAssetBindings ?? []);
    const expectedIds = new Set(proposal.expected_current_entities.map(({ entity_id }) => entity_id));
    if ([...current.keys()].some((id) => !expectedIds.has(id))) {
        throw new Error("Catalog publication planning received state outside its targeted live slice.");
    }
    for (const expected of proposal.expected_current_entities) {
        const actual = current.get(expected.entity_id);
        const actualDigest = actual ? digest(actual) : null;
        if (actualDigest !== expected.snapshot_digest) {
            throw new Error(`Catalog publication live vendor ${expected.entity_id} has advanced.`);
        }
    }
    const expectedAssetKeys = new Set(proposal.expected_current_asset_bindings.map((binding) => assetBindingKey(binding.entity_id, binding.role)));
    if ([...currentAssets.keys()].some((key) => !expectedAssetKeys.has(key))) {
        throw new Error("Catalog publication planning received asset state outside its targeted slice.");
    }
    for (const expected of proposal.expected_current_asset_bindings) {
        const actual = currentAssets.get(assetBindingKey(expected.entity_id, expected.role));
        if ((actual?.binding_event_id ?? null) !== expected.binding_event_id ||
            (actual ? digest(actual) : null) !== expected.binding_digest) {
            throw new Error(`Catalog publication live asset ${expected.entity_id}:${expected.role} has advanced.`);
        }
    }
    const { revisionChanges, sourceChanges, routeChanges, publicAuthoringPaths } = analyzeCatalogCandidateChanges({
        currentEntities: [...current.values()],
        candidateEntities: publicationCandidateState({
            current: [...current.values()],
            candidates: proposal.candidate_entities,
            removals: proposal.remove_entity_ids,
        }),
    });
    const assetChanges = proposal.candidate_assets.map((candidate) => {
        const currentBinding = currentAssets.get(assetBindingKey(candidate.entity_id, candidate.role));
        return {
            change: "upsert",
            entity_id: candidate.entity_id,
            role: candidate.role,
            current_binding_event_id: currentBinding?.binding_event_id ?? null,
            candidate_proposal_digest: candidate.proposal_digest,
            current_asset_object_digest: currentBinding?.asset_object_digest ?? null,
            candidate_asset_object_digest: candidate.asset.asset_object_digest,
            current_served_digest: currentBinding?.served_digest ?? null,
            candidate_served_digest: candidate.served_digest,
        };
    });
    for (const entityId of proposal.remove_entity_ids) {
        const currentBinding = currentAssets.get(assetBindingKey(entityId, "icon"));
        if (!currentBinding) {
            throw new Error(`Removed Catalog Entity ${entityId} lacks its exact current icon binding.`);
        }
        assetChanges.push({
            change: "remove",
            entity_id: entityId,
            role: "icon",
            current_binding_event_id: currentBinding.binding_event_id,
            current_asset_object_digest: currentBinding.asset_object_digest,
            current_served_digest: currentBinding.served_digest,
        });
    }
    const currentPolicies = normalizePolicies(input.currentPolicies);
    const contextChanges = policyChanges(currentPolicies, proposal.target_policies);
    if (input.currentContractAuthorityDigest !== proposal.target_contract_authority_digest) {
        contextChanges.push({
            kind: "contract_authority",
            current_digest: input.currentContractAuthorityDigest,
            target_digest: proposal.target_contract_authority_digest,
        });
    }
    if (revisionChanges.length === 0 &&
        sourceChanges.length === 0 &&
        assetChanges.length === 0 &&
        routeChanges.length === 0 &&
        contextChanges.length === 0 &&
        proposal.authority_proposals.length === 0) {
        throw new Error("Catalog publication proposal has no semantic change against its live parent.");
    }
    const changedDependencyKeys = dependencyKeysForChanges({
        revisionChanges,
        sourceChanges,
        assetChanges,
        routeChanges,
        contextChanges,
    });
    const impactIndex = input.impactIndex ?? new CatalogPublicationImpactIndex();
    const impact = impactIndex.affected(changedDependencyKeys);
    const requiredAuthorities = requiredAuthoritiesForChanges({
        revisionChanges,
        sourceChanges,
        assetChanges,
        routeChanges,
        contextChanges,
        authorityProposals: proposal.authority_proposals,
    });
    const currentContextDigest = digest({
        policies: currentPolicies,
        contract_authority_digest: input.currentContractAuthorityDigest,
    });
    const targetContextDigest = digest({
        policies: proposal.target_policies,
        contract_authority_digest: proposal.target_contract_authority_digest,
    });
    const core = catalogPublicationChangeSetCoreSchema.parse({
        proposal_digest: proposal.proposal_digest,
        live_parent_release_id: proposal.live_parent_release_id,
        current_context_digest: currentContextDigest,
        target_context_digest: targetContextDigest,
        revision_changes: revisionChanges,
        source_changes: sourceChanges,
        asset_changes: assetChanges,
        route_changes: routeChanges,
        context_changes: contextChanges,
        public_authoring_paths: publicAuthoringPaths,
        changed_dependency_keys: changedDependencyKeys,
        impact_index_digest: impactIndex.indexDigest,
        dependency_lookups: impact.lookups,
        affected_dependents: impact.dependents,
        unaffected_dependents_proof_digest: digest({
            impact_index_digest: impactIndex.indexDigest,
            changed_dependency_keys: changedDependencyKeys,
            affected_dependents: impact.dependents,
        }),
        required_authorities: requiredAuthorities,
    });
    return verifyCatalogPublicationChangeSet({ ...core, change_set_digest: digest(core) });
}
export function verifyCatalogPublicationChangeSet(input) {
    const changeSet = catalogPublicationChangeSetSchema.parse(input);
    const { change_set_digest: changeSetDigest, ...core } = changeSet;
    if (digest(catalogPublicationChangeSetCoreSchema.parse(core)) !== changeSetDigest) {
        throw new Error("Catalog publication Change Set digest does not match its derived impact.");
    }
    return changeSet;
}
/**
 * The sole semantic diff over targeted Catalog Entity snapshots. Git review,
 * non-Git proposal adapters, evidence planning, and release composition derive
 * their changed revision set from this function.
 */
export function analyzeCatalogCandidateChanges(input) {
    const current = entityMap(input.currentEntities);
    const candidates = entityMap(input.candidateEntities);
    const revisionChanges = [];
    const sourceChanges = [];
    const routeChanges = [];
    const publicAuthoringPaths = new Set();
    for (const entityId of orderedUnique([...current.keys(), ...candidates.keys()])) {
        const before = current.get(entityId) ?? null;
        const after = candidates.get(entityId) ?? null;
        let authoringChanged = false;
        const entitySourceChanges = sourceChangesForEntity(entityId, before, after);
        sourceChanges.push(...entitySourceChanges);
        if (entitySourceChanges.length > 0)
            authoringChanged = true;
        const changedEntitySourceIds = new Set(entitySourceChanges.map(({ source_id }) => source_id));
        const beforeEntries = before ? revisionEntries(compileEntity(before)) : new Map();
        const afterEntries = after ? revisionEntries(compileEntity(after)) : new Map();
        for (const entryKey of orderedUnique([...beforeEntries.keys(), ...afterEntries.keys()])) {
            const currentEntry = beforeEntries.get(entryKey) ?? null;
            const candidateEntry = afterEntries.get(entryKey) ?? null;
            const citationChanges = symmetricDifference(currentEntry?.sourceIds ?? [], candidateEntry?.sourceIds ?? []);
            const sourceChangeIds = orderedUnique([
                ...citationChanges,
                ...[...(currentEntry?.sourceIds ?? []), ...(candidateEntry?.sourceIds ?? [])].filter((sourceId) => changedEntitySourceIds.has(sourceId)),
            ]);
            if (currentEntry?.revisionDigest !== candidateEntry?.revisionDigest ||
                sourceChangeIds.length > 0) {
                authoringChanged = true;
                const entry = candidateEntry ?? currentEntry;
                if (!entry)
                    throw new Error("Catalog publication revision entry disappeared.");
                revisionChanges.push({
                    kind: entry.kind,
                    entity_id: entry.entityId,
                    target_id: entry.targetId,
                    change: currentEntry === null ? "added" : candidateEntry === null ? "removed" : "updated",
                    current_revision_digest: currentEntry?.revisionDigest ?? null,
                    candidate_revision_digest: candidateEntry?.revisionDigest ?? null,
                    semantic_paths: currentEntry && candidateEntry
                        ? semanticJsonPointerChanges(currentEntry.content, candidateEntry.content)
                        : [],
                    source_change_ids: sourceChangeIds,
                    parent_changed: currentEntry?.parentId !== candidateEntry?.parentId,
                });
            }
            if (currentEntry?.slug !== candidateEntry?.slug ||
                canonicalJson(currentEntry?.aliases ?? []) !== canonicalJson(candidateEntry?.aliases ?? [])) {
                authoringChanged = true;
                const entry = candidateEntry ?? currentEntry;
                if (!entry)
                    throw new Error("Catalog publication route entry disappeared.");
                routeChanges.push({
                    kind: entry.kind,
                    entity_id: entry.entityId,
                    target_id: entry.targetId,
                    current_slug: currentEntry?.slug ?? null,
                    candidate_slug: candidateEntry?.slug ?? null,
                    added_aliases: difference(candidateEntry?.aliases ?? [], currentEntry?.aliases ?? []),
                    removed_aliases: difference(currentEntry?.aliases ?? [], candidateEntry?.aliases ?? []),
                });
            }
        }
        if (authoringChanged) {
            if (before)
                publicAuthoringPaths.add(authoringPath(before.entity.slug));
            if (after)
                publicAuthoringPaths.add(authoringPath(after.entity.slug));
        }
    }
    return {
        revisionChanges,
        sourceChanges,
        routeChanges,
        publicAuthoringPaths: [...publicAuthoringPaths].sort(compareCanonicalStrings),
    };
}
export function publicationSemanticInputDigest(proposal) {
    const verified = verifyCatalogPublicationProposal(proposal);
    return digest({
        candidate_entities: verified.candidate_entities,
        candidate_assets: verified.candidate_assets,
        remove_entity_ids: verified.remove_entity_ids,
        authority_proposals: verified.authority_proposals,
    });
}
export function buildPublicationIngressReceipt(proposal, input) {
    const core = publicationIngressReceiptCoreSchema.parse({
        ...input,
        proposal_digest: proposal.proposal_digest,
        semantic_input_digest: publicationSemanticInputDigest(proposal),
    });
    return verifyPublicationIngressReceipt({ ...core, receipt_digest: digest(core) });
}
export function verifyPublicationIngressReceipt(input) {
    const receipt = publicationIngressReceiptSchema.parse(input);
    const { receipt_digest: receiptDigest, ...core } = receipt;
    if (digest(publicationIngressReceiptCoreSchema.parse(core)) !== receiptDigest) {
        throw new Error("Publication ingress receipt digest does not match its immutable input.");
    }
    return receipt;
}
export function verifyCatalogPublicationInputClosure(input) {
    const proposal = verifyCatalogPublicationProposal(input.proposal);
    const changeSet = verifyCatalogPublicationChangeSet(input.changeSet);
    const ingressReceipts = input.ingressReceipts
        .map(verifyPublicationIngressReceipt)
        .sort((left, right) => compareCanonicalStrings(left.receipt_digest, right.receipt_digest));
    const semanticInputDigest = publicationSemanticInputDigest(proposal);
    if (ingressReceipts.length === 0 ||
        changeSet.proposal_digest !== proposal.proposal_digest ||
        changeSet.live_parent_release_id !== proposal.live_parent_release_id ||
        ingressReceipts.some((receipt) => receipt.proposal_digest !== proposal.proposal_digest ||
            receipt.semantic_input_digest !== semanticInputDigest)) {
        throw new Error("Catalog publication inputs do not close one proposal and live parent.");
    }
    if (new Set(ingressReceipts.map((receipt) => receipt.receipt_digest)).size !==
        ingressReceipts.length) {
        throw new Error("Catalog publication ingress receipts must be unique.");
    }
    return { proposal, changeSet, ingressReceipts };
}
export function catalogPublicationAdmittedInputDigests(input) {
    const verified = verifyCatalogPublicationInputClosure(input);
    return [
        verified.proposal.proposal_digest,
        verified.changeSet.change_set_digest,
        ...verified.ingressReceipts.map((receipt) => receipt.receipt_digest),
    ].sort(compareCanonicalStrings);
}
export function planAuthenticatedFormCatalogPublication(input, receipt) {
    return planCatalogPublicationWithIngress(input, receipt);
}
export function planPaidAgentCatalogPublication(input, receipt) {
    return planCatalogPublicationWithIngress(input, receipt);
}
export function planGovernedOpsCatalogPublication(input, receipt) {
    return planCatalogPublicationWithIngress(input, receipt);
}
export function planScannerCatalogPublication(input, receipt) {
    return planCatalogPublicationWithIngress(input, receipt);
}
export function planOperatorJobCatalogPublication(input, receipt) {
    return planCatalogPublicationWithIngress(input, receipt);
}
export function planPolicyTransitionCatalogPublication(input, receipt) {
    return planCatalogPublicationWithIngress(input, receipt);
}
function planCatalogPublicationWithIngress(input, receipt) {
    const plan = planCatalogPublication(input);
    return {
        ...plan,
        ingressReceipt: buildPublicationIngressReceipt(plan.proposal, receipt),
    };
}
function revisionEntries(entity) {
    const values = [
        {
            kind: "entity",
            entityId: entity.revision.entity_id,
            targetId: entity.revision.entity_id,
            revisionDigest: entity.revision.revision_digest,
            content: entity.revision.content,
            parentId: null,
            sourceIds: entity.sources.map(({ source_id: sourceId }) => sourceId),
            slug: entity.slug,
            aliases: entity.slugAliases,
        },
        ...entity.programs.map(({ revision, slug, slugAliases, sourceIds }) => ({
            kind: "program",
            entityId: revision.entity_id,
            targetId: revision.program_id,
            revisionDigest: revision.revision_digest,
            content: revision.content,
            parentId: revision.entity_id,
            sourceIds,
            slug,
            aliases: slugAliases,
        })),
        ...entity.offers.map(({ revision, slug, slugAliases, sourceIds }) => ({
            kind: "offer",
            entityId: revision.entity_id,
            targetId: revision.offer_id,
            revisionDigest: revision.revision_digest,
            content: revision.content,
            parentId: revision.program_id ?? revision.entity_id,
            sourceIds,
            slug,
            aliases: slugAliases,
        })),
    ];
    return new Map(values.map((value) => [`${value.kind}:${value.targetId}`, value]));
}
function sourceChangesForEntity(entityId, current, candidate) {
    const before = new Map(current?.sources.map((source) => [source.source_id, source.url]) ?? []);
    const after = new Map(candidate?.sources.map((source) => [source.source_id, source.url]) ?? []);
    return orderedUnique([...before.keys(), ...after.keys()]).flatMap((sourceId) => {
        const currentUrl = before.get(sourceId) ?? null;
        const candidateUrl = after.get(sourceId) ?? null;
        if (currentUrl === candidateUrl)
            return [];
        return [
            {
                entity_id: entityId,
                source_id: sourceId,
                change: currentUrl === null
                    ? "added"
                    : candidateUrl === null
                        ? "removed"
                        : "updated",
                current_url: currentUrl,
                candidate_url: candidateUrl,
            },
        ];
    });
}
function semanticJsonPointerChanges(current, candidate, path = "") {
    if (canonicalJson(current) === canonicalJson(candidate))
        return [];
    if (Array.isArray(current) || Array.isArray(candidate))
        return [path];
    if (isRecord(current) && isRecord(candidate)) {
        return orderedUnique([...Object.keys(current), ...Object.keys(candidate)]).flatMap((key) => {
            const childPath = `${path}/${escapePointerSegment(key)}`;
            if (!(key in current) || !(key in candidate))
                return [childPath];
            return semanticJsonPointerChanges(current[key], candidate[key], childPath);
        });
    }
    return [path];
}
function policyChanges(current, target) {
    const before = new Map(current.map(({ key, digest: value }) => [key, value]));
    const after = new Map(target.map(({ key, digest: value }) => [key, value]));
    return orderedUnique([...before.keys(), ...after.keys()]).flatMap((key) => {
        const currentDigest = before.get(key) ?? null;
        const targetDigest = after.get(key) ?? null;
        return currentDigest === targetDigest
            ? []
            : [
                {
                    kind: "policy",
                    key,
                    current_digest: currentDigest,
                    target_digest: targetDigest,
                },
            ];
    });
}
function normalizeAuthorityProposals(proposals) {
    const normalized = proposals
        .map((proposal) => ({ ...proposal }))
        .sort((left, right) => compareCanonicalStrings(left.purpose, right.purpose) ||
        compareCanonicalStrings(left.proposal_digest, right.proposal_digest));
    if (new Set(normalized.map((proposal) => `${proposal.purpose}:${proposal.proposal_digest}`))
        .size !== normalized.length) {
        throw new Error("Catalog publication authority proposals must be unique.");
    }
    return normalized;
}
function normalizePolicies(policies) {
    const normalized = policies
        .map((policy) => publicationPolicyReferenceSchema.parse(policy))
        .sort((left, right) => compareCanonicalStrings(left.key, right.key));
    if (new Set(normalized.map(({ key }) => key)).size !== normalized.length) {
        throw new Error("Catalog publication policy keys must be unique.");
    }
    return normalized;
}
function authoringPath(slug) {
    return `entities/${slug.slice(0, 2)}/${slug}.yaml`;
}
function difference(left, right) {
    const excluded = new Set(right);
    return orderedUnique(left.filter((value) => !excluded.has(value)));
}
function symmetricDifference(left, right) {
    return orderedUnique([...difference(left, right), ...difference(right, left)]);
}
function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function escapePointerSegment(value) {
    return value.replaceAll("~", "~0").replaceAll("/", "~1");
}
//# sourceMappingURL=publication.js.map