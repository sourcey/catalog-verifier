import { identityIndexSchema } from "../../../contracts/artifact/src/index.js";
import { assertEntityIdentityAuthorityClosure } from "../../authority-state/src/index.js";
import { canonicalJson } from "../../primitives/src/index.js";
const identityKinds = new Set([
    "entity.merged",
    "entity.split",
    "entity.succeeded",
    "program.merged",
    "program.reparented",
    "program.retired",
    "offer.merged",
    "offer.retired",
    "offer.reparented",
    "agent-readiness-profile.merged",
    "agent-readiness-profile.reparented",
    "agent-readiness-profile.retired",
]);
export function projectIdentities(graph, prior) {
    const entityResolutions = {
        ...(prior?.canonical_entity_resolutions ?? {}),
    };
    const programResolutions = {
        ...(prior?.canonical_program_resolutions ?? {}),
    };
    const offerResolutions = {
        ...(prior?.canonical_offer_resolutions ?? {}),
    };
    const agentReadinessResolutions = {
        ...(prior?.canonical_agent_readiness_profile_resolutions ?? {}),
    };
    const programReparents = {
        ...(prior?.program_reparents ?? {}),
    };
    const offerReparents = {
        ...(prior?.offer_reparents ?? {}),
    };
    const agentReadinessReparents = {
        ...(prior?.agent_readiness_profile_reparents ?? {}),
    };
    const assetDispositions = {
        ...(prior?.asset_binding_dispositions ?? {}),
    };
    const splits = { ...(prior?.split_relationships ?? {}) };
    const retiredEntities = new Set(prior?.retired_entities ?? []);
    const retiredPrograms = new Set(prior?.retired_programs ?? []);
    const retiredOffers = new Set(prior?.retired_offers ?? []);
    const retiredAgentReadinessProfiles = new Set(prior?.retired_agent_readiness_profiles ?? []);
    for (const event of graph.events) {
        if (graph.inactiveEventIds.has(event.event_id) || !identityKinds.has(event.kind))
            continue;
        const payload = event.payload;
        if (event.kind === "entity.merged") {
            const retiredEntityIds = stringArray(payload.retired_entity_ids);
            for (const retired of retiredEntityIds) {
                assignOnce(entityResolutions, retired, stringValue(payload.surviving_entity_id));
                retiredEntities.add(retired);
            }
            applyDisposition(payload.disposition, programResolutions, retiredPrograms, programReparents, offerResolutions, retiredOffers, offerReparents, agentReadinessResolutions, retiredAgentReadinessProfiles, agentReadinessReparents, assetDispositions, event, retiredEntityIds.length === 1 ? retiredEntityIds[0] : undefined);
        }
        else if (event.kind === "entity.succeeded" && payload.predecessor_retires === true) {
            const predecessor = stringValue(payload.predecessor_entity_id);
            assignOnce(entityResolutions, predecessor, stringValue(payload.successor_entity_id));
            retiredEntities.add(predecessor);
            if (payload.disposition) {
                applyDisposition(payload.disposition, programResolutions, retiredPrograms, programReparents, offerResolutions, retiredOffers, offerReparents, agentReadinessResolutions, retiredAgentReadinessProfiles, agentReadinessReparents, assetDispositions, event);
            }
        }
        else if (event.kind === "entity.split") {
            const original = stringValue(payload.original_entity_id);
            const nextSplit = stringArray(payload.new_entity_ids).sort();
            if (splits[original] && canonicalJson(splits[original]) !== canonicalJson(nextSplit)) {
                throw new Error(`Entity ${original} has multiple active split events.`);
            }
            splits[original] = nextSplit;
            const continuing = optionalStringValue(payload.continuing_entity_id);
            if (continuing && continuing !== original)
                assignOnce(entityResolutions, original, continuing);
            if (continuing !== original)
                retiredEntities.add(original);
            applyDisposition(payload.disposition, programResolutions, retiredPrograms, programReparents, offerResolutions, retiredOffers, offerReparents, agentReadinessResolutions, retiredAgentReadinessProfiles, agentReadinessReparents, assetDispositions, event);
        }
        else if (event.kind === "program.merged") {
            for (const retired of stringArray(payload.retired_program_ids)) {
                assignOnce(programResolutions, retired, stringValue(payload.surviving_program_id));
                retiredPrograms.add(retired);
            }
        }
        else if (event.kind === "program.reparented") {
            assignReparent(programReparents, stringValue(payload.program_id), {
                old_entity_id: stringValue(payload.old_entity_id),
                new_entity_id: stringValue(payload.new_entity_id),
                event_id: event.event_id,
            });
        }
        else if (event.kind === "offer.merged") {
            for (const retired of stringArray(payload.retired_offer_ids)) {
                assignOnce(offerResolutions, retired, stringValue(payload.surviving_offer_id));
                retiredOffers.add(retired);
            }
        }
        else if (event.kind === "offer.retired") {
            retiredOffers.add(stringValue(payload.offer_id));
        }
        else if (event.kind === "program.retired") {
            retiredPrograms.add(stringValue(payload.program_id));
        }
        else if (event.kind === "offer.reparented") {
            assignReparent(offerReparents, stringValue(payload.offer_id), {
                old_entity_id: stringValue(payload.old_entity_id),
                new_entity_id: stringValue(payload.new_entity_id),
                event_id: event.event_id,
            });
        }
        else if (event.kind === "agent-readiness-profile.merged") {
            for (const retired of stringArray(payload.retired_agent_readiness_profile_ids)) {
                assignOnce(agentReadinessResolutions, retired, stringValue(payload.surviving_agent_readiness_profile_id));
                retiredAgentReadinessProfiles.add(retired);
            }
        }
        else if (event.kind === "agent-readiness-profile.reparented") {
            assignReparent(agentReadinessReparents, stringValue(payload.agent_readiness_profile_id), {
                old_entity_id: stringValue(payload.old_entity_id),
                new_entity_id: stringValue(payload.new_entity_id),
                event_id: event.event_id,
            });
        }
        else if (event.kind === "agent-readiness-profile.retired") {
            retiredAgentReadinessProfiles.add(stringValue(payload.agent_readiness_profile_id));
        }
    }
    assertAcyclic(entityResolutions, "entity");
    assertAcyclic(programResolutions, "program");
    assertAcyclic(offerResolutions, "offer");
    assertAcyclic(agentReadinessResolutions, "agent readiness profile");
    return {
        identity_contract: "sourcey.identities/v1alpha1",
        canonical_entity_resolutions: entityResolutions,
        canonical_program_resolutions: programResolutions,
        canonical_offer_resolutions: offerResolutions,
        canonical_agent_readiness_profile_resolutions: agentReadinessResolutions,
        program_reparents: programReparents,
        offer_reparents: offerReparents,
        agent_readiness_profile_reparents: agentReadinessReparents,
        asset_binding_dispositions: assetDispositions,
        split_relationships: splits,
        retired_entities: [...retiredEntities].sort(),
        retired_programs: [...retiredPrograms].sort(),
        retired_offers: [...retiredOffers].sort(),
        retired_agent_readiness_profiles: [...retiredAgentReadinessProfiles].sort(),
    };
}
/** Release projection cannot admit two active claims across connected Entity identities. */
export function projectAuthorityClosedIdentities(graph, prior) {
    const identities = identityIndexSchema.parse(projectIdentities(graph, prior));
    assertEntityIdentityAuthorityClosure({
        activeClaims: graph.activeAuthorityClaims,
        identities,
    });
    return identities;
}
function applyDisposition(input, programResolutions, retiredPrograms, programReparents, offerResolutions, retiredOffers, offerReparents, agentReadinessResolutions, retiredAgentReadinessProfiles, agentReadinessReparents, assetDispositions, event, sourceEntityId = event.subject.entity_id) {
    if (typeof input !== "object" || input === null) {
        throw new Error("Identity transition disposition is missing.");
    }
    const programs = input.programs;
    if (!Array.isArray(programs))
        throw new Error("Identity disposition programs are invalid.");
    for (const value of programs) {
        if (typeof value !== "object" || value === null) {
            throw new Error("Identity program disposition is invalid.");
        }
        const program = value;
        const programId = stringValue(program.program_id);
        const disposition = stringValue(program.disposition);
        if (disposition === "merge") {
            assignOnce(programResolutions, programId, stringValue(program.target_program_id));
            retiredPrograms.add(programId);
        }
        else if (disposition === "end") {
            retiredPrograms.add(programId);
        }
        else if (disposition === "reparent") {
            assignReparent(programReparents, programId, {
                old_entity_id: requiredSourceEntityId(sourceEntityId, event),
                new_entity_id: stringValue(program.target_entity_id),
                event_id: event.event_id,
            });
        }
        else {
            throw new Error(`Unknown program disposition ${disposition}.`);
        }
    }
    const offers = input.offers;
    if (!Array.isArray(offers))
        throw new Error("Identity disposition offers are invalid.");
    for (const value of offers) {
        if (typeof value !== "object" || value === null) {
            throw new Error("Identity offer disposition is invalid.");
        }
        const offer = value;
        const offerId = stringValue(offer.offer_id);
        const disposition = stringValue(offer.disposition);
        if (disposition === "merge") {
            const target = stringValue(offer.target_offer_id);
            assignOnce(offerResolutions, offerId, target);
            retiredOffers.add(offerId);
        }
        else if (disposition === "end") {
            retiredOffers.add(offerId);
        }
        else if (disposition === "reparent") {
            assignReparent(offerReparents, offerId, {
                old_entity_id: requiredSourceEntityId(sourceEntityId, event),
                new_entity_id: stringValue(offer.target_entity_id),
                event_id: event.event_id,
            });
        }
        else {
            throw new Error(`Unknown offer disposition ${disposition}.`);
        }
    }
    const agentReadinessProfiles = input
        .agent_readiness_profiles;
    if (!Array.isArray(agentReadinessProfiles)) {
        throw new Error("Identity disposition agent readiness profiles are invalid.");
    }
    for (const value of agentReadinessProfiles) {
        if (typeof value !== "object" || value === null) {
            throw new Error("Identity agent-readiness-profile disposition is invalid.");
        }
        const profile = value;
        const profileId = stringValue(profile.agent_readiness_profile_id);
        const disposition = stringValue(profile.disposition);
        if (disposition === "merge") {
            assignOnce(agentReadinessResolutions, profileId, stringValue(profile.target_agent_readiness_profile_id));
            retiredAgentReadinessProfiles.add(profileId);
        }
        else if (disposition === "end") {
            retiredAgentReadinessProfiles.add(profileId);
        }
        else if (disposition === "reparent") {
            assignReparent(agentReadinessReparents, profileId, {
                old_entity_id: requiredSourceEntityId(sourceEntityId, event),
                new_entity_id: stringValue(profile.target_entity_id),
                event_id: event.event_id,
            });
        }
        else {
            throw new Error(`Unknown agent-readiness-profile disposition ${disposition}.`);
        }
    }
    const assetBindings = input.asset_bindings;
    if (!Array.isArray(assetBindings)) {
        throw new Error("Identity disposition asset bindings are invalid.");
    }
    for (const value of assetBindings) {
        if (typeof value !== "object" || value === null) {
            throw new Error("Identity asset-binding disposition is invalid.");
        }
        const binding = value;
        const bindingEventId = stringValue(binding.binding_event_id);
        const disposition = stringValue(binding.disposition);
        const nextDisposition = {
            disposition: disposition,
            event_id: event.event_id,
            ...(binding.replacement_binding_event_id
                ? {
                    replacement_binding_event_id: stringValue(binding.replacement_binding_event_id),
                }
                : {}),
        };
        if (assetDispositions[bindingEventId] &&
            canonicalJson(assetDispositions[bindingEventId]) !== canonicalJson(nextDisposition)) {
            throw new Error(`Asset binding ${bindingEventId} has more than one disposition.`);
        }
        assetDispositions[bindingEventId] = nextDisposition;
    }
}
function requiredSourceEntityId(value, event) {
    if (!value) {
        throw new Error(`${event.kind} cannot reparent child identities from more than one retired Entity.`);
    }
    return value;
}
export function validateIdentityClosure(identities, revisions, facts, agentReadinessProfiles, parent) {
    const historicalEntities = new Set();
    const historicalPrograms = new Set();
    const historicalOffers = new Set();
    const historicalAgentReadinessProfiles = new Set();
    for (const revision of revisions.all.values()) {
        historicalEntities.add(revision.entity_id);
        if (revision.revision_contract === "sourcey.program-revision/v1alpha1") {
            historicalPrograms.add(revision.program_id);
        }
        else if (revision.revision_contract === "sourcey.offer-revision/v1alpha1") {
            historicalOffers.add(revision.offer_id);
        }
        else if (revision.revision_contract === "sourcey.agent-readiness-revision/v1alpha1") {
            historicalAgentReadinessProfiles.add(revision.agent_readiness_profile_id);
        }
    }
    const currentEntities = new Set(facts.entities.map((entity) => entity.revision.entity_id));
    const currentPrograms = new Set(facts.entities.flatMap((entity) => entity.programs.map((program) => program.revision.program_id)));
    const currentProgramOwners = new Map(facts.entities.flatMap((entity) => entity.programs.map((program) => [program.revision.program_id, entity.revision.entity_id])));
    const currentOffers = new Set(facts.entities.flatMap((entity) => entity.offers.map((offer) => offer.revision.offer_id)));
    const currentOfferOwners = new Map(facts.entities.flatMap((entity) => entity.offers.map((offer) => [offer.revision.offer_id, entity.revision.entity_id])));
    const currentAgentReadinessOwners = new Map(agentReadinessProfiles.map((profile) => [
        profile.agent_readiness_profile_id,
        profile.entity_id,
    ]));
    const priorProgramOwners = new Map(parent?.artifact.entities.flatMap((entity) => entity.programs.map((program) => [program.program_id, entity.entity_id])) ?? []);
    const priorOfferOwners = new Map(parent?.artifact.entities.flatMap((entity) => entity.offers.map((offer) => [offer.offer_id, entity.entity_id])) ?? []);
    const priorAgentReadinessOwners = new Map(parent?.agentReadinessProfiles.map((profile) => [
        profile.agent_readiness_profile_id,
        profile.entity_id,
    ]) ?? []);
    for (const [retired, target] of Object.entries(identities.canonical_entity_resolutions)) {
        if (!historicalEntities.has(retired) || !currentEntities.has(target) || retired === target) {
            throw new Error(`Entity identity resolution ${retired} -> ${target} is not closed.`);
        }
    }
    for (const [retired, target] of Object.entries(identities.canonical_offer_resolutions)) {
        if (!historicalOffers.has(retired) || !currentOffers.has(target) || retired === target) {
            throw new Error(`Offer identity resolution ${retired} -> ${target} is not closed.`);
        }
    }
    for (const [retired, target] of Object.entries(identities.canonical_program_resolutions)) {
        if (!historicalPrograms.has(retired) || !currentPrograms.has(target) || retired === target) {
            throw new Error(`Program identity resolution ${retired} -> ${target} is not closed.`);
        }
    }
    for (const [retired, target] of Object.entries(identities.canonical_agent_readiness_profile_resolutions)) {
        if (!historicalAgentReadinessProfiles.has(retired) ||
            !currentAgentReadinessOwners.has(target) ||
            retired === target) {
            throw new Error(`Agent-readiness-profile identity resolution ${retired} -> ${target} is not closed.`);
        }
    }
    for (const retired of identities.retired_entities) {
        if (!historicalEntities.has(retired) || currentEntities.has(retired)) {
            throw new Error(`Retired entity ${retired} is missing history or remains current.`);
        }
    }
    for (const retired of identities.retired_offers) {
        if (!historicalOffers.has(retired) || currentOffers.has(retired)) {
            throw new Error(`Retired offer ${retired} is missing history or remains current.`);
        }
    }
    for (const retired of identities.retired_programs) {
        if (!historicalPrograms.has(retired) || currentPrograms.has(retired)) {
            throw new Error(`Retired program ${retired} is missing history or remains current.`);
        }
    }
    for (const retired of identities.retired_agent_readiness_profiles) {
        if (!historicalAgentReadinessProfiles.has(retired) ||
            currentAgentReadinessOwners.has(retired)) {
            throw new Error(`Retired agent readiness profile ${retired} is missing history or remains current.`);
        }
    }
    for (const [programId, reparent] of Object.entries(identities.program_reparents ?? {})) {
        if (!historicalPrograms.has(programId) ||
            (reparent.old_entity_id !== undefined &&
                priorProgramOwners.get(programId) !== reparent.old_entity_id) ||
            currentProgramOwners.get(programId) !== reparent.new_entity_id ||
            priorProgramOwners.get(programId) === reparent.new_entity_id) {
            throw new Error(`Program reparent ${programId} is not closed over adjacent releases.`);
        }
    }
    for (const [offerId, reparent] of Object.entries(identities.offer_reparents ?? {})) {
        if (!historicalOffers.has(offerId) ||
            (reparent.old_entity_id !== undefined &&
                priorOfferOwners.get(offerId) !== reparent.old_entity_id) ||
            currentOfferOwners.get(offerId) !== reparent.new_entity_id ||
            priorOfferOwners.get(offerId) === reparent.new_entity_id) {
            throw new Error(`Offer reparent ${offerId} is not closed over the adjacent releases.`);
        }
    }
    for (const [profileId, reparent] of Object.entries(identities.agent_readiness_profile_reparents)) {
        if (!historicalAgentReadinessProfiles.has(profileId) ||
            priorAgentReadinessOwners.get(profileId) !== reparent.old_entity_id ||
            currentAgentReadinessOwners.get(profileId) !== reparent.new_entity_id ||
            reparent.old_entity_id === reparent.new_entity_id) {
            throw new Error(`Agent-readiness-profile reparent ${profileId} is not closed over adjacent releases.`);
        }
    }
    for (const [original, replacements] of Object.entries(identities.split_relationships)) {
        if (!historicalEntities.has(original) ||
            replacements.length === 0 ||
            replacements.some((replacement) => !currentEntities.has(replacement))) {
            throw new Error(`Entity split ${original} is not closed over current entities.`);
        }
    }
}
function stringValue(value) {
    if (typeof value !== "string")
        throw new Error("Expected a string in a validated event payload.");
    return value;
}
function optionalStringValue(value) {
    return value === undefined ? undefined : stringValue(value);
}
function stringArray(value) {
    if (!Array.isArray(value) || value.some((entry) => typeof entry !== "string")) {
        throw new Error("Expected a string array in a validated event payload.");
    }
    return value;
}
function assignOnce(target, source, destination) {
    if (target[source] && target[source] !== destination) {
        throw new Error(`Identity ${source} has multiple canonical resolutions.`);
    }
    target[source] = destination;
}
function assignReparent(target, subjectId, reparent) {
    const prior = target[subjectId];
    if (prior && canonicalJson(prior) !== canonicalJson(reparent)) {
        throw new Error(`${subjectId} has multiple active reparent transitions.`);
    }
    target[subjectId] = reparent;
}
function assertAcyclic(edges, label) {
    for (const start of Object.keys(edges)) {
        const seen = new Set();
        let current = start;
        while (current && edges[current]) {
            if (seen.has(current))
                throw new Error(`${label} identity resolution contains a cycle.`);
            seen.add(current);
            current = edges[current];
        }
    }
}
//# sourceMappingURL=identity.js.map