import { releaseChangeSchema, releaseDiffSchema, } from "../../../contracts/artifact/src/index.js";
import { isAgentReadinessRouteOnlySuccession } from "../../agent-readiness-policy/src/index.js";
import { parseReleaseJson, requiredReleaseFile, } from "../../artifact/src/release-directory-files.js";
import { compareCanonicalStrings, digest, sha256Bytes } from "../../primitives/src/index.js";
import { buildDeltaChanges } from "./transition.js";
export function verifyChanges(files, descriptor, delta, entities, priorEntities, agentReadinessObjects, assetDelta) {
    const bytes = requiredReleaseFile(files, "changes.ndjson");
    if (sha256Bytes(bytes) !== descriptor.release_core.diff_digest) {
        throw new Error("Catalog delta change bytes do not match the release descriptor.");
    }
    const changes = bytes
        .toString("utf8")
        .split("\n")
        .filter(Boolean)
        .map((line) => releaseChangeSchema.parse(JSON.parse(line)));
    const diff = releaseDiffSchema.parse(parseReleaseJson(files, "release-diff.json"));
    if (diff.parent_snapshot_id !==
        (descriptor.release_core.parent_release_id
            ? (delta.base?.release.snapshot_id ?? null)
            : null) ||
        diff.snapshot_id !== descriptor.snapshot_id ||
        JSON.stringify(diff.changes) !== JSON.stringify(changes)) {
        throw new Error("Catalog delta change feed does not bind the exact snapshot transition.");
    }
    const ordered = [...changes].sort((left, right) => compareCanonicalStrings(left.subject_type, right.subject_type) ||
        compareCanonicalStrings(left.subject_id, right.subject_id) ||
        compareCanonicalStrings(left.kind, right.kind));
    if (JSON.stringify(ordered) !== JSON.stringify(changes)) {
        throw new Error("Catalog delta changes are not in canonical order.");
    }
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
    for (const change of changes) {
        const { change_id: changeId, ...core } = change;
        if (digest(core) !== changeId)
            throw new Error(`Catalog change ${changeId} is misaddressed.`);
    }
    return changes;
}
//# sourceMappingURL=verification-changes.js.map