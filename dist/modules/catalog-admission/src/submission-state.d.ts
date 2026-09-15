import type { CatalogSubmissionWorkItem } from "../../../contracts/api/src/index.js";
import type { CatalogPublicationCurrentState } from "../../../contracts/publication/src/index.js";
/** Admission authority is immutable; only its activation head can move. */
export declare function verifyCatalogSubmissionPublicationState(input: {
    readonly workItem: CatalogSubmissionWorkItem;
    readonly baseState: CatalogPublicationCurrentState;
    readonly currentState: CatalogPublicationCurrentState;
}): CatalogPublicationCurrentState;
//# sourceMappingURL=submission-state.d.ts.map