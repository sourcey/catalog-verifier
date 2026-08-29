import { digest, sha256Bytes } from "../../primitives/src/index.js";
export function assertReleasedAssetClosure(input) {
    if (digest(input.notices) !== input.index.notices_digest) {
        throw new Error("Asset notices do not match the asset index.");
    }
    const entityIds = new Set(input.artifact.entities.map((entity) => entity.entity_id));
    const eventById = new Map(input.events.map((event) => [event.event_id, event]));
    const declaredSafeDigests = new Set(input.inputs.safe_variant_digests);
    const noticesByObject = new Set(input.notices.notices.map((notice) => notice.asset_object_digest));
    const activeKeys = new Set();
    for (const binding of input.index.bindings) {
        const key = `${binding.entity_id}:${binding.role}`;
        const event = eventById.get(binding.binding_event_id);
        const payload = event && typeof event.payload === "object" && event.payload !== null
            ? event.payload
            : {};
        const bytes = input.files.get(binding.served_path);
        if (activeKeys.has(key) ||
            !entityIds.has(binding.entity_id) ||
            !event ||
            event.kind !== "asset.bound" ||
            event.subject.entity_id !== binding.entity_id ||
            payload.asset_object_digest !== binding.asset_object_digest ||
            payload.served_derivative_digest !== binding.served_digest ||
            !declaredSafeDigests.has(binding.served_digest) ||
            !noticesByObject.has(binding.asset_object_digest) ||
            !bytes ||
            bytes.byteLength !== binding.bytes ||
            sha256Bytes(bytes) !== binding.served_digest) {
            throw new Error(`Asset binding ${binding.binding_event_id} is not fully closed.`);
        }
        activeKeys.add(key);
    }
    for (const entityId of entityIds) {
        if (!activeKeys.has(`${entityId}:icon`)) {
            throw new Error(`Entity ${entityId} has no active icon binding.`);
        }
    }
}
//# sourceMappingURL=asset-closure.js.map