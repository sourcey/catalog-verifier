import { type Digest } from "provenry/primitives";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import type { Observation } from "../../../contracts/observations/src/index.js";
import type { RetainedCaptureReceipt } from "../../authority/src/index.js";
import type { RetainedCatalogRevision } from "./retained-revision.js";
/**
 * Verifies the complete public evidence graph from immutable local bytes.
 * Callers supply already-materialized objects; this kernel performs no I/O.
 * Normalized bytes are proven by reproducing them from their capture.
 */
export declare function verifyEvidenceObjectGraph(input: {
    readonly revisions: readonly RetainedCatalogRevision[];
    readonly events: readonly CatalogEvent[];
    readonly observations: readonly Observation[];
    readonly captureReceipts: readonly RetainedCaptureReceipt[];
    readonly captures: ReadonlyMap<Digest, Uint8Array>;
    readonly normalizedObjects: ReadonlyMap<Digest, Uint8Array>;
    /**
     * Set when every capture already matches its digest key, as a verified release's
     * byte declarations prove. Otherwise each capture is hashed here.
     */
    readonly capturesProven?: boolean;
    readonly allowFixtureEvidence?: boolean;
}): void;
//# sourceMappingURL=proof-graph.d.ts.map