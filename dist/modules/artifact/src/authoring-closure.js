import { compileAuthoringEntities } from "../../compiler/src/index.js";
import { canonicalJson } from "../../primitives/src/index.js";
export function verifyReleasedAuthoringClosure(authoring, entities) {
    const compiled = compileAuthoringEntities([...authoring.values()]);
    const released = new Map(entities.map((entity) => [entity.entity_id, entity]));
    const matches = authoring.size === entities.length &&
        compiled.entities.every((facts) => {
            const entity = released.get(facts.revision.entity_id);
            return (entity?.revision_digest === facts.revision.revision_digest &&
                canonicalJson(entity.programs.map(({ revision_digest }) => revision_digest).sort()) ===
                    canonicalJson(facts.programs.map(({ revision }) => revision.revision_digest).sort()) &&
                canonicalJson(entity.offers.map(({ revision_digest }) => revision_digest).sort()) ===
                    canonicalJson(facts.offers.map(({ revision }) => revision.revision_digest).sort()));
        });
    if (!matches) {
        throw new Error("Canonical authoring does not close the released Catalog projections.");
    }
}
//# sourceMappingURL=authoring-closure.js.map