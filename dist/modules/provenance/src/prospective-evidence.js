import { canonicalJson, digest } from "provenry/primitives";
import { catalogEventIntentSchema } from "../../../contracts/events/src/index.js";
import { observationSchema } from "../../../contracts/observations/src/index.js";
import { assertEvidenceBindingClosure } from "./evidence-bindings.js";
export function buildProspectiveEvidenceStandingGraph(input) {
    const intents = input.eventIntents.map((intent) => catalogEventIntentSchema.parse(intent));
    const events = intents.map((intent) => {
        if (digest(intent.core) !== intent.event_id) {
            throw new Error(`Prospective evidence event ${intent.event_id} has an invalid identity.`);
        }
        if (intent.core.kind !== "evidence.bound") {
            throw new Error("Prospective Agent Readiness standing accepts evidence-bound events only.");
        }
        return { ...intent.core, event_id: intent.event_id };
    });
    const byId = new Map(events.map((event) => [event.event_id, event]));
    const operationKeys = new Set(events.map((event) => `${event.issuer_id}:${event.operation_id}`));
    if (byId.size !== events.length || operationKeys.size !== events.length) {
        throw new Error("Prospective evidence standing requires unique events and operations.");
    }
    const observations = new Map();
    for (const value of input.observations) {
        const observation = observationSchema.parse(value);
        const prior = observations.get(observation.observation_id);
        if (prior && canonicalJson(prior) !== canonicalJson(observation)) {
            throw new Error(`Prospective observation ${observation.observation_id} has conflicting content.`);
        }
        observations.set(observation.observation_id, observation);
    }
    const referencedObservationIds = new Set(events.map(evidenceObservationId));
    if (referencedObservationIds.size !== observations.size ||
        [...referencedObservationIds].some((observationId) => !observations.has(observationId))) {
        throw new Error("Prospective evidence standing does not close its exact observations.");
    }
    assertEvidenceBindingClosure({ events, observations });
    const byRevisionDigest = new Map();
    for (const event of events) {
        const revisionDigest = event.subject.revision_digest;
        if (!revisionDigest) {
            throw new Error("Prospective evidence standing requires revision-pinned events.");
        }
        const revisionEvents = byRevisionDigest.get(revisionDigest) ?? [];
        revisionEvents.push(event);
        byRevisionDigest.set(revisionDigest, revisionEvents);
    }
    return {
        byRevisionDigest,
        observations,
        inactiveEventIds: new Set(),
        evidenceBindingActivity: new Map(events.map((event) => [event.event_id, true])),
        activeAuthorityClaims: new Map(),
    };
}
function evidenceObservationId(event) {
    const observationId = event.payload.observation_id;
    if (typeof observationId !== "string") {
        throw new Error(`Prospective evidence event ${event.event_id} lacks an observation.`);
    }
    return observationId;
}
//# sourceMappingURL=prospective-evidence.js.map