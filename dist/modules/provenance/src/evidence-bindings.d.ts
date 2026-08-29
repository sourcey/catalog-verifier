import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import { type EvidenceAssertion } from "../../../contracts/evidence/src/index.js";
import type { Observation } from "../../../contracts/observations/src/index.js";
export type EvidenceBindingEvent = Omit<CatalogEvent, "protected">;
export declare function assertEvidenceBindingClosure(input: {
    readonly events: readonly EvidenceBindingEvent[];
    readonly observations: ReadonlyMap<string, Observation>;
}): void;
export declare function evidenceAssertions(event: EvidenceBindingEvent): readonly EvidenceAssertion[];
//# sourceMappingURL=evidence-bindings.d.ts.map