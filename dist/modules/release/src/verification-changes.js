import { compareCanonicalStrings } from "provenry/primitives";
import { isAgentReadinessRouteOnlySuccession } from "../../agent-readiness-policy/src/index.js";
import { buildDeltaChanges } from "./transition.js";
/**
 * The engine already proved the change log's bytes, order, identities and
 * snapshot binding. Sourcey proves its meaning: the log is exactly the change set
 * its Entity, Agent Readiness and asset transitions imply.
 */
export function verifyChanges(changes, delta, entities, priorEntities, agentReadinessObjects, assetDelta) {
    const expected = buildDeltaChanges([...entities.entries()]
        .map(([entityId, current]) => ({
        current,
        prior: priorEntities.get(entityId) ?? null,
    }))
        .sort((left, right) => compareCanonicalStrings(left.current.entity_id, right.current.entity_id)), delta.identities, {
        current: [...agentReadinessObjects.values()].flatMap((object) => object.projection ? [object.projection] : []),
        prior: [...agentReadinessObjects.values()].flatMap((object) => object.prior_projection ? [object.prior_projection] : []),
        regradedProfileIds: new Set([...agentReadinessObjects.values()].flatMap((object) => object.projection &&
            object.profile_input === null &&
            !(object.prior_projection &&
                isAgentReadinessRouteOnlySuccession(object.prior_projection, object.projection))
            ? [object.agent_readiness_profile_id]
            : [])),
    }, assetDelta);
    if (JSON.stringify(expected) !== JSON.stringify(changes)) {
        throw new Error("Catalog delta change feed does not match its exact Entity transitions.");
    }
}
//# sourceMappingURL=verification-changes.js.map