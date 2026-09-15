import { canonicalJson } from "../../primitives/src/index.js";
import { assertCatalogPublicationPreconditions, catalogPublicationStatePreconditions, verifyCatalogPublicationCurrentState, } from "./publication-state.js";
import { catalogSubmissionCandidates, verifyCatalogSubmissionWorkItem, } from "./submission-input.js";
/** Admission authority is immutable; only its activation head can move. */
export function verifyCatalogSubmissionPublicationState(input) {
    const workItem = verifyCatalogSubmissionWorkItem(input.workItem);
    const base = verifyCatalogPublicationCurrentState(input.baseState);
    const current = verifyCatalogPublicationCurrentState(input.currentState);
    const { targetEntityIds } = catalogSubmissionCandidates(workItem);
    if (base.live_parent_release_id !== workItem.live_parent_release_id ||
        base.git_cursor !== null ||
        current.git_cursor !== null ||
        canonicalJson(base.target_entity_ids) !== canonicalJson(targetEntityIds) ||
        canonicalJson(current.target_entity_ids) !== canonicalJson(targetEntityIds)) {
        throw new Error("Submission publication state does not bind its original parent and exact targets.");
    }
    assertCatalogPublicationPreconditions({
        expected: catalogPublicationStatePreconditions(base),
        currentEntities: current.current_entities,
        currentAssetBindings: current.current_asset_bindings,
    });
    return current;
}
//# sourceMappingURL=submission-state.js.map