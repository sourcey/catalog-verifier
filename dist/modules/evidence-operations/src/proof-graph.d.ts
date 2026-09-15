import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import type { Observation } from "../../../contracts/observations/src/index.js";
import type { RetainedCaptureReceipt } from "../../authority/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
import type { RetainedCatalogRevision } from "./retained-revision.js";
/**
 * Verifies the complete public evidence graph from immutable local bytes.
 * Callers supply already-materialized objects; this kernel performs no I/O.
 */
export declare function verifyEvidenceObjectGraph(input: {
    readonly revisions: readonly RetainedCatalogRevision[];
    readonly events: readonly CatalogEvent[];
    readonly observations: readonly Observation[];
    readonly captureReceipts: readonly RetainedCaptureReceipt[];
    readonly captures: ReadonlyMap<Digest, Uint8Array>;
    readonly normalizedObjects: ReadonlyMap<Digest, Uint8Array>;
    readonly allowFixtureEvidence?: boolean;
}): void;
//# sourceMappingURL=proof-graph.d.ts.map