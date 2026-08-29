import { evidenceAssertionSchema, } from "../../../contracts/evidence/src/index.js";
export function assertEvidenceBindingClosure(input) {
    for (const event of input.events) {
        if (event.kind !== "evidence.bound")
            continue;
        const observationId = payloadString(event, "observation_id");
        const observation = input.observations.get(observationId);
        if (!observation) {
            throw new Error(`Evidence event ${event.event_id} targets missing observation ${observationId}.`);
        }
        const assertions = evidenceAssertions(event);
        if (assertions.length === 0) {
            throw new Error(`Evidence event ${event.event_id} lacks exact proof assertions.`);
        }
        if (!observation.capture?.normalized_object) {
            throw new Error(`Evidence event ${event.event_id} lacks normalized evidence.`);
        }
        if (payloadString(event, "normalized_object_digest") !==
            observation.capture.normalized_object.digest) {
            throw new Error(`Evidence event ${event.event_id} targets the wrong normalized evidence object.`);
        }
        if (new Set(assertions.map((assertion) => assertion.path)).size !== assertions.length) {
            throw new Error(`Evidence event ${event.event_id} repeats an asserted path.`);
        }
        const expectedPolarity = observation.outcome === "supports-candidate"
            ? "supports"
            : observation.outcome === "contradicts-candidate"
                ? "contradicts"
                : null;
        if (!expectedPolarity ||
            assertions.some((assertion) => assertion.polarity !== expectedPolarity)) {
            throw new Error(`Evidence event ${event.event_id} assertions do not match its observation outcome.`);
        }
    }
}
export function evidenceAssertions(event) {
    if (event.kind !== "evidence.bound")
        return [];
    const assertions = event.payload.assertions;
    return Array.isArray(assertions) ? evidenceAssertionSchema.array().parse(assertions) : [];
}
function payloadString(event, key) {
    const value = event.payload[key];
    if (typeof value !== "string") {
        throw new Error(`Event ${event.event_id} payload.${key} is not a string.`);
    }
    return value;
}
//# sourceMappingURL=evidence-bindings.js.map