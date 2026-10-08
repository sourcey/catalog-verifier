import { canonicalJson, digest, parseJsonFile } from "provenry/primitives";
import { agentReadinessOfferRelationInputSchema, agentReadinessRevisionContract, } from "../../../contracts/agent-readiness/src/index.js";
import { compileAgentReadinessOfferRelationRevision } from "../../agent-readiness-policy/src/index.js";
import { CATALOG_RELEASE } from "./release-directory-files.js";
export function assertReleasedAgentReadinessClosure(input) {
    const entityIds = new Set(input.artifact.entities.map((entity) => entity.entity_id));
    const eventIds = new Set(input.events.map((event) => event.event_id));
    const inputProfiles = new Map(input.inputs.profiles.map((profile) => [profile.agent_readiness_profile_id, profile]));
    if (inputProfiles.size !== input.profiles.length) {
        throw new Error("Agent readiness inputs and projections do not have the same closed profile set.");
    }
    for (const projection of input.profiles) {
        const revision = input.revisions.get(projection.revision_digest);
        const declaredInput = inputProfiles.get(projection.agent_readiness_profile_id);
        if (revision?.revision_contract !== agentReadinessRevisionContract ||
            revision.agent_readiness_profile_id !== projection.agent_readiness_profile_id ||
            revision.entity_id !== projection.entity_id ||
            declaredInput?.revision_digest !== projection.revision_digest ||
            !entityIds.has(projection.entity_id)) {
            throw new Error(`Agent readiness projection ${projection.agent_readiness_profile_id} is not closed over its inputs.`);
        }
        // Ratings rest on the run records inside the released input; standing rests on events.
        for (const eventId of projection.provenance.basis_event_ids) {
            if (!eventIds.has(eventId)) {
                throw new Error(`Agent readiness projection ${projection.agent_readiness_profile_id} cites unreleased event ${eventId}.`);
            }
        }
    }
}
export function assertReleasedAgentReadinessOfferRelationClosure(input) {
    const profiles = new Map(input.profiles.map((profile) => [profile.agent_readiness_profile_id, profile]));
    const offers = new Map(input.artifact.entities.flatMap((entity) => entity.offers.map((offer) => [offer.offer_id, { entityId: entity.entity_id, offer }])));
    const compiledInputs = new Map();
    for (const entry of input.inputs.relations) {
        const relationInput = agentReadinessOfferRelationInputSchema.parse(parseJsonFile(input.files, entry.path, CATALOG_RELEASE));
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
        const released = parseJsonFile(input.files, `agent-readiness-offer-relations/${relation.relation_id}.json`, CATALOG_RELEASE);
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
//# sourceMappingURL=agent-readiness-closure.js.map