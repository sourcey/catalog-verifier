import type { AgentReadinessDeclarationRevision, AgentReadinessRevision } from "../../../contracts/agent-readiness/src/index.js";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import type { CaptureReceipt } from "../../../contracts/evidence/src/index.js";
import type { Observation } from "../../../contracts/observations/src/index.js";
import type { EntityRevision, OfferRevision, ProgramRevision } from "../../../contracts/revisions/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
type Revision = EntityRevision | ProgramRevision | OfferRevision | AgentReadinessRevision | AgentReadinessDeclarationRevision;
/**
 * Verifies the complete public evidence graph from immutable local bytes.
 * Callers supply already-materialized objects; this kernel performs no I/O.
 */
export declare function verifyEvidenceObjectGraph(input: {
    readonly revisions: readonly Revision[];
    readonly events: readonly CatalogEvent[];
    readonly observations: readonly Observation[];
    readonly captureReceipts: readonly CaptureReceipt[];
    readonly captures: ReadonlyMap<Digest, Uint8Array>;
    readonly normalizedObjects: ReadonlyMap<Digest, Uint8Array>;
    readonly allowFixtureEvidence?: boolean;
}): void;
export {};
//# sourceMappingURL=proof-graph.d.ts.map