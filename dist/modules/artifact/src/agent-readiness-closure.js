import { agentReadinessOfferRelationInputSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { compileAgentReadinessOfferRelationRevision } from "../../agent-readiness-policy/src/index.js";
import { canonicalJson, digest } from "../../primitives/src/index.js";
export function assertReleasedAgentReadinessClosure(input) {
    const entityIds = new Set(input.artifact.entities.map((entity) => entity.entity_id));
    const eventById = new Map(input.events.map((event) => [event.event_id, event]));
    const observationIds = new Set(input.observations.map((observation) => observation.observation_id));
    const inputProfiles = new Map(input.inputs.profiles.map((profile) => [profile.agent_readiness_profile_id, profile]));
    if (inputProfiles.size !== input.profiles.length) {
        throw new Error("Agent readiness inputs and projections do not have the same closed profile set.");
    }
    for (const projection of input.profiles) {
        const revision = input.revisions.get(projection.revision_digest);
        const declaredInput = inputProfiles.get(projection.agent_readiness_profile_id);
        if (revision?.revision_contract !== "sourcey.agent-readiness-revision/v1alpha1" ||
            revision.agent_readiness_profile_id !== projection.agent_readiness_profile_id ||
            revision.entity_id !== projection.entity_id ||
            declaredInput?.revision_digest !== projection.revision_digest ||
            projection.policy_digest !== input.inputs.policy_digest ||
            !entityIds.has(projection.entity_id)) {
            throw new Error(`Agent readiness projection ${projection.agent_readiness_profile_id} is not closed over its inputs.`);
        }
        const provenance = input.provenance.revisions[projection.revision_digest];
        if (!provenance ||
            JSON.stringify(provenance.event_ids) !==
                JSON.stringify([...projection.provenance.basis_event_ids].sort()) ||
            provenance.coverage_policy_digest !== projection.provenance.coverage_policy_digest ||
            provenance.freshness_policy_digest !== projection.provenance.freshness_policy_digest) {
            throw new Error(`Agent readiness projection ${projection.agent_readiness_profile_id} has invalid provenance closure.`);
        }
        for (const eventId of provenance.event_ids) {
            const event = eventById.get(eventId);
            if (event?.kind !== "evidence.bound" ||
                event.subject.subject_type !== "agent_readiness_profile" ||
                event.subject.agent_readiness_profile_id !== projection.agent_readiness_profile_id ||
                event.subject.revision_digest !== projection.revision_digest) {
                throw new Error(`Agent readiness projection ${projection.agent_readiness_profile_id} targets invalid event ${eventId}.`);
            }
        }
        for (const observationId of provenance.observation_ids) {
            if (!observationIds.has(observationId)) {
                throw new Error(`Agent readiness projection ${projection.agent_readiness_profile_id} targets missing observation ${observationId}.`);
            }
        }
    }
}
export function assertReleasedAgentReadinessOfferRelationClosure(input) {
    const profiles = new Map(input.profiles.map((profile) => [profile.agent_readiness_profile_id, profile]));
    const offers = new Map(input.artifact.entities.flatMap((entity) => entity.offers.map((offer) => [offer.offer_id, { entityId: entity.entity_id, offer }])));
    const compiledInputs = new Map();
    for (const entry of input.inputs.relations) {
        const relationInput = agentReadinessOfferRelationInputSchema.parse(parseJson(input.files, entry.path));
        if (digest(relationInput) !== entry.input_digest) {
            throw new Error(`Agent Readiness Offer relation input ${entry.relation_id} is misaddressed.`);
        }
        const relation = compileAgentReadinessOfferRelationRevision(relationInput);
        if (relation.relation_id !== entry.relation_id ||
            relation.relation_revision_digest !== entry.relation_revision_digest) {
            throw new Error(`Agent Readiness Offer relation input ${entry.relation_id} does not compile to its declared revision.`);
        }
        const profile = profiles.get(relation.agent_readiness_profile_id);
        const offer = offers.get(relation.offer_id);
        if (!profile ||
            !offer ||
            profile.entity_id !== offer.entityId ||
            relation.declaration_revision_digest !== profile.declaration_revision_digest ||
            relation.admitted_offer_revision_digest !== offer.offer.revision_digest) {
            throw new Error(`Agent Readiness Offer relation ${relation.relation_id} does not close over its exact same-Entity profile and Offer.`);
        }
        compiledInputs.set(relation.relation_id, relation);
    }
    for (const relation of input.relations) {
        const compiled = compiledInputs.get(relation.relation_id);
        const released = parseJson(input.files, `agent-readiness-offer-relations/${relation.relation_id}.json`);
        if (!compiled ||
            canonicalJson(compiled) !== canonicalJson(relation) ||
            canonicalJson(released) !== canonicalJson(relation)) {
            throw new Error(`Agent Readiness Offer relation ${relation.relation_id} is not its exact admitted revision.`);
        }
    }
    const releasedRelationPaths = [...input.files.keys()].filter((path) => path.startsWith("agent-readiness-offer-relations/"));
    if (releasedRelationPaths.length !== input.relations.length) {
        throw new Error("Agent Readiness Offer relation files escape the current relation index.");
    }
    const declaredInputPaths = new Set(input.inputs.relations.map((entry) => entry.path));
    const actualInputPaths = [...input.files.keys()].filter((path) => path.startsWith("inputs/agent-readiness-offer-relations/"));
    if (actualInputPaths.length !== declaredInputPaths.size ||
        actualInputPaths.some((path) => !declaredInputPaths.has(path))) {
        throw new Error("Agent Readiness Offer relation input files escape their exact input index.");
    }
}
function parseJson(files, path) {
    const bytes = files.get(path);
    if (!bytes)
        throw new Error(`Release is missing required file ${path}.`);
    return JSON.parse(bytes.toString("utf8"));
}
//# sourceMappingURL=agent-readiness-closure.js.map