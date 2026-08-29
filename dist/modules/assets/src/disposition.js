export function eventDisposesAssetBinding(event, entityId, bindingEventId) {
    if (!eventDisposesEntity(event, entityId))
        return false;
    if (typeof event.payload !== "object" || event.payload === null)
        return false;
    const disposition = event.payload.disposition;
    if (typeof disposition !== "object" || disposition === null)
        return false;
    const bindings = disposition.asset_bindings;
    return (Array.isArray(bindings) &&
        bindings.some((binding) => typeof binding === "object" &&
            binding !== null &&
            binding.binding_event_id === bindingEventId &&
            ["end", "rebind"].includes(String(binding.disposition ?? ""))));
}
function eventDisposesEntity(event, entityId) {
    if (typeof event.payload !== "object" || event.payload === null)
        return false;
    const payload = event.payload;
    if (event.kind === "entity.merged") {
        return (Array.isArray(payload.retired_entity_ids) && payload.retired_entity_ids.includes(entityId));
    }
    if (event.kind === "entity.split")
        return payload.original_entity_id === entityId;
    if (event.kind === "entity.succeeded") {
        return payload.predecessor_retires === true && payload.predecessor_entity_id === entityId;
    }
    return false;
}
//# sourceMappingURL=disposition.js.map