import { catalogPublicationCompositionSchema, catalogPublicationProposalCoreSchema, } from "../../../contracts/publication/src/index.js";
import { canonicalJson, compareCanonicalStrings, digest, } from "../../primitives/src/index.js";
import { analyzeCatalogCandidateChanges, deriveCatalogPublicationChangeSet, planCatalogPublication, publicationSemanticInputDigest, resolveCatalogPublicationImpact, verifyCatalogPublicationChangeSet, verifyCatalogPublicationProposal, verifyPublicationIngressReceipt, } from "./publication.js";
import { catalogPublicationAssetBindingKey, catalogPublicationAssetBindingMap, normalizeCatalogPublicationAssetProposals, } from "./publication-assets.js";
import { normalizeCatalogPublicationAuthorityProposals } from "./publication-authorities.js";
import { catalogPublicationImpactProof, dependencyKeysForChanges, requiredAuthoritiesForChanges, } from "./publication-dependencies.js";
import { catalogPublicationEntityMap, catalogPublicationTargetAuthoring, } from "./publication-entities.js";
/** Resolve every member and the union against one exact-parent index. Ingress
 * authorization stays unchanged; only its dependency-derived Change Set moves. */
export function resolveCatalogPublicationCompositionImpact(publication, index) {
    const resolved = verifyCatalogPublicationInputClosure({
        ...publication,
        change_set: resolveCatalogPublicationImpact(publication.change_set, index),
        ingresses: publication.ingresses.map((ingress) => ({
            ...ingress,
            change_set: resolveCatalogPublicationImpact(ingress.change_set, index),
        })),
    });
    return { ...publication, ...resolved };
}
/** Combine admitted plans, not authorizations. Every member is independently
 * revalidated against the same targeted live slice before the ordinary planner
 * constructs the union. This operation does no capture, model work or effects. */
export function composeCatalogPublication(input) {
    const ingresses = verifyIngresses(input.ingresses);
    const first = ingresses[0];
    const current = catalogPublicationEntityMap(input.currentEntities);
    const assets = catalogPublicationAssetBindingMap(input.currentAssetBindings);
    for (const ingress of ingresses) {
        const derived = deriveCatalogPublicationChangeSet({
            ...input,
            proposal: ingress.proposal,
            currentEntities: ingress.proposal.expected_current_entities.flatMap(({ entity_id }) => {
                const entity = current.get(entity_id);
                return entity ? [entity] : [];
            }),
            currentAssetBindings: ingress.proposal.expected_current_asset_bindings.flatMap(({ entity_id, role }) => {
                const binding = assets.get(catalogPublicationAssetBindingKey(entity_id, role));
                return binding ? [binding] : [];
            }),
        });
        if (derived.change_set_digest !== ingress.change_set.change_set_digest)
            throw new Error("Catalog ingress Change Set differs from its exact current inputs.");
    }
    const planned = planCatalogPublication({
        ...input,
        liveParentReleaseId: first.proposal.live_parent_release_id,
        targetPolicies: first.proposal
            .target_policies,
        targetContractAuthorityDigest: first.proposal.target_contract_authority_digest,
        candidateEntities: union(ingresses.flatMap(({ proposal }) => proposal.candidate_entities)),
        candidateAssetProposals: union(ingresses.flatMap(({ proposal }) => proposal.candidate_assets)),
        removeEntityIds: union(ingresses.flatMap(({ proposal }) => proposal.remove_entity_ids)),
        authorityProposals: union(ingresses.flatMap(({ proposal }) => proposal.authority_proposals)),
    });
    return verifyCatalogPublicationInputClosure({
        proposal: planned.proposal,
        change_set: planned.changeSet,
        ingresses,
    });
}
/** Verify retained membership without broadening an ingress to the aggregate.
 * The production composer also rederives every member against actual current
 * inputs. Retained objects remain ordinary addressed proposals and Change Sets. */
export function verifyCatalogPublicationInputClosure(input) {
    const parsed = catalogPublicationCompositionSchema.parse({
        proposal: input.proposal,
        change_set: input.change_set,
        ingresses: input.ingresses,
    });
    const proposal = verifyCatalogPublicationProposal(parsed.proposal);
    const changeSet = verifyCatalogPublicationChangeSet(parsed.change_set);
    const ingresses = verifyIngresses(parsed.ingresses);
    const first = ingresses[0];
    assertSameContext(first, { proposal, change_set: changeSet });
    if (changeSet.proposal_digest !== proposal.proposal_digest)
        throw new Error("Catalog publication Change Set does not bind its aggregate proposal.");
    if (proposal.proposal_digest !== catalogPublicationIngressUnion(ingresses).proposal_digest)
        throw new Error("Catalog publication proposal is not the exact admitted union.");
    const changeCollections = [
        "revision_changes",
        "source_changes",
        "asset_changes",
        "route_changes",
        "context_changes",
        "public_authoring_paths",
        "changed_dependency_keys",
        "affected_dependents",
        "required_authorities",
    ];
    for (const key of changeCollections) {
        assertUnion(changeSet[key], ingresses.flatMap((ingress) => ingress.change_set[key]), key);
    }
    verifyChangeSetDerivations({ proposal, change_set: changeSet });
    const scope = {
        revision_changes: byEntity(changeSet.revision_changes),
        source_changes: byEntity(changeSet.source_changes),
        route_changes: byEntity(changeSet.route_changes),
        asset_changes: byEntity(changeSet.asset_changes),
        public_authoring_paths: new Set(changeSet.public_authoring_paths.map(canonicalJson)),
        affected_dependents: new Set(changeSet.affected_dependents.map(canonicalJson)),
    };
    for (const ingress of ingresses) {
        verifyMemberChangeScope(ingress, scope);
        verifyChangeSetDerivations(ingress);
    }
    return { proposal, change_set: changeSet, ingresses };
}
/** Validate retained authoring changes against the verified parent slice, not
 * against other caller-supplied Change Sets. Membership alone cannot establish
 * completeness when every member omits the same change or public path. */
export function verifyCatalogPublicationAuthoringChanges(input) {
    for (const member of [input.publication, ...input.publication.ingresses]) {
        const current = member.proposal.expected_current_entities.flatMap(({ entity_id }) => {
            const prior = input.priorAuthoring.get(entity_id);
            return prior ? [prior] : [];
        });
        const changes = analyzeCatalogCandidateChanges({
            currentEntities: current,
            candidateEntities: catalogPublicationTargetAuthoring({
                current,
                candidates: member.proposal.candidate_entities,
                removals: member.proposal.remove_entity_ids,
            }),
        });
        for (const [key, expected] of [
            ["revision_changes", changes.revisionChanges],
            ["source_changes", changes.sourceChanges],
            ["route_changes", changes.routeChanges],
            ["public_authoring_paths", changes.publicAuthoringPaths],
        ]) {
            assertUnion(member.change_set[key], expected, `retained ${key}`);
        }
    }
}
function byEntity(values) {
    const indexed = new Map();
    for (const value of values) {
        const entries = indexed.get(value.entity_id);
        if (entries)
            entries.push(value);
        else
            indexed.set(value.entity_id, [value]);
    }
    return indexed;
}
function verifyMemberChangeScope(member, aggregate) {
    const authoringIds = new Set([
        ...member.proposal.candidate_entities.map(({ entity }) => entity.entity_id),
        ...member.proposal.remove_entity_ids,
    ]);
    for (const key of ["revision_changes", "source_changes", "route_changes"]) {
        assertUnion(member.change_set[key], [...authoringIds].flatMap((id) => aggregate[key].get(id) ?? []), `ingress ${key}`);
    }
    const removed = new Set(member.proposal.remove_entity_ids);
    const assets = new Set(member.proposal.candidate_assets.map(({ entity_id, role }) => catalogPublicationAssetBindingKey(entity_id, role)));
    const assetEntities = new Set([
        ...removed,
        ...member.proposal.candidate_assets.map(({ entity_id }) => entity_id),
    ]);
    assertUnion(member.change_set.asset_changes, [...assetEntities]
        .flatMap((id) => aggregate.asset_changes.get(id) ?? [])
        .filter(({ entity_id, role }) => removed.has(entity_id) || assets.has(catalogPublicationAssetBindingKey(entity_id, role))), "ingress asset_changes");
    for (const key of ["public_authoring_paths", "affected_dependents"]) {
        const allowed = aggregate[key];
        const values = member.change_set[key];
        if (union(values).length !== values.length ||
            values.some((value) => !allowed.has(canonicalJson(value))))
            throw new Error(`Catalog ingress ${key} exceeds its aggregate closure.`);
    }
}
function verifyChangeSetDerivations(member) {
    const changeSet = member.change_set;
    const changes = {
        revisionChanges: changeSet.revision_changes,
        sourceChanges: changeSet.source_changes,
        assetChanges: changeSet.asset_changes,
        routeChanges: changeSet.route_changes,
        contextChanges: changeSet.context_changes,
        authorityProposals: member.proposal.authority_proposals,
    };
    if (canonicalJson(changeSet.changed_dependency_keys) !==
        canonicalJson(dependencyKeysForChanges(changes)) ||
        canonicalJson(changeSet.required_authorities) !==
            canonicalJson(requiredAuthoritiesForChanges(changes)) ||
        changeSet.dependency_lookups !== changeSet.changed_dependency_keys.length ||
        changeSet.unaffected_dependents_proof_digest !== catalogPublicationImpactProof(changeSet))
        throw new Error("Catalog publication Change Set has invalid dependency or authority derivations.");
}
/** The aggregate is the exact union, not a caller-selected root or new receipt. */
export function catalogPublicationIngressUnion(input) {
    const ingresses = verifyIngresses(input);
    const first = ingresses[0];
    const orderedByEntity = (values) => union(values).sort((left, right) => compareCanonicalStrings(left.entity_id, right.entity_id));
    const core = catalogPublicationProposalCoreSchema.parse({
        live_parent_release_id: first.proposal.live_parent_release_id,
        target_policies: first.proposal.target_policies,
        target_contract_authority_digest: first.proposal.target_contract_authority_digest,
        candidate_entities: union(ingresses.flatMap(({ proposal }) => proposal.candidate_entities)).sort((left, right) => compareCanonicalStrings(left.entity.entity_id, right.entity.entity_id)),
        candidate_assets: normalizeCatalogPublicationAssetProposals(union(ingresses.flatMap(({ proposal }) => proposal.candidate_assets))),
        remove_entity_ids: union(ingresses.flatMap(({ proposal }) => proposal.remove_entity_ids)),
        expected_current_entities: orderedByEntity(ingresses.flatMap(({ proposal }) => proposal.expected_current_entities)),
        expected_current_asset_bindings: union(ingresses.flatMap(({ proposal }) => proposal.expected_current_asset_bindings)).sort((left, right) => compareCanonicalStrings(`${left.entity_id}:${left.role}`, `${right.entity_id}:${right.role}`)),
        authority_proposals: normalizeCatalogPublicationAuthorityProposals(union(ingresses.flatMap(({ proposal }) => proposal.authority_proposals))),
    });
    return verifyCatalogPublicationProposal({ ...core, proposal_digest: digest(core) });
}
export function catalogPublicationAdmittedInputDigests(input) {
    const verified = verifyCatalogPublicationInputClosure(input);
    return union([
        verified.proposal.proposal_digest,
        verified.change_set.change_set_digest,
        ...verified.ingresses.flatMap((ingress) => [
            ingress.proposal.proposal_digest,
            ingress.change_set.change_set_digest,
            ingress.ingress_receipt.receipt_digest,
        ]),
    ]);
}
function verifyIngresses(input) {
    const ingresses = input
        .map((ingress) => {
        const proposal = verifyCatalogPublicationProposal(ingress.proposal);
        const changeSet = verifyCatalogPublicationChangeSet(ingress.change_set);
        const receipt = verifyPublicationIngressReceipt(ingress.ingress_receipt);
        if (changeSet.proposal_digest !== proposal.proposal_digest ||
            changeSet.live_parent_release_id !== proposal.live_parent_release_id ||
            receipt.proposal_digest !== proposal.proposal_digest ||
            receipt.semantic_input_digest !== publicationSemanticInputDigest(proposal)) {
            throw new Error("Catalog ingress does not close its exact proposal, Change Set and receipt.");
        }
        return { proposal, change_set: changeSet, ingress_receipt: receipt };
    })
        .sort((left, right) => compareCanonicalStrings(left.ingress_receipt.receipt_digest, right.ingress_receipt.receipt_digest));
    if (new Set(ingresses.map(({ ingress_receipt }) => ingress_receipt.receipt_digest)).size !==
        ingresses.length)
        throw new Error("Catalog publication ingress receipts must be unique.");
    const submissionWork = new Set();
    const gitRepositories = new Set();
    for (const { ingress_receipt: receipt } of ingresses) {
        if ("submission_work_item_digest" in receipt && receipt.submission_work_item_digest !== null) {
            if (submissionWork.has(receipt.submission_work_item_digest))
                throw new Error("Catalog publication must bind each submission work item exactly once.");
            submissionWork.add(receipt.submission_work_item_digest);
        }
        if (receipt.kind === "git") {
            if (gitRepositories.has(receipt.repository_id))
                throw new Error("Catalog publication requires one admitted Git span per repository.");
            gitRepositories.add(receipt.repository_id);
        }
    }
    const [first, ...rest] = ingresses;
    if (!first)
        throw new Error("Catalog publication requires at least one admitted ingress.");
    for (const ingress of ingresses)
        assertSameContext(first, ingress);
    return [first, ...rest];
}
function assertSameContext(left, right) {
    for (const key of [
        "live_parent_release_id",
        "target_policies",
        "target_contract_authority_digest",
    ]) {
        if (canonicalJson(left.proposal[key]) !== canonicalJson(right.proposal[key]))
            throw new Error(`Catalog publication ingresses disagree on ${key}.`);
    }
    for (const key of [
        "live_parent_release_id",
        "current_context_digest",
        "target_context_digest",
        "impact_index_digest",
        "context_changes",
    ]) {
        if (canonicalJson(left.change_set[key]) !== canonicalJson(right.change_set[key]))
            throw new Error(`Catalog publication ingresses disagree on ${key}.`);
    }
}
function union(values) {
    return [...new Map(values.map((value) => [canonicalJson(value), value])).entries()]
        .sort(([left], [right]) => compareCanonicalStrings(left, right))
        .map(([, value]) => value);
}
function assertUnion(actual, members, label) {
    const actualUnion = union(actual);
    if (canonicalJson(actualUnion) !== canonicalJson(union(members)) ||
        actualUnion.length !== actual.length)
        throw new Error(`Catalog publication ${label} is not the exact admitted union.`);
}
//# sourceMappingURL=publication-composition.js.map