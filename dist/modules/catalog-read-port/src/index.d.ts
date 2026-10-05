import type { Digest } from "provenry/primitives";
import type { AgentReadinessDeclarationRevision, AgentReadinessRevision } from "../../../contracts/agent-readiness/src/index.js";
import type { CatalogClosureRequest } from "../../../contracts/api/src/index.js";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import type { Observation } from "../../../contracts/observations/src/index.js";
import type { EntityRevision, OfferRevision, ProgramRevision } from "../../../contracts/revisions/src/index.js";
import type { RetainedCaptureReceipt } from "../../authority/src/index.js";
type CatalogRevision = EntityRevision | ProgramRevision | OfferRevision | AgentReadinessRevision | AgentReadinessDeclarationRevision;
export interface CatalogHead {
    readonly releaseId: Digest;
    readonly releaseSequence: number;
}
/** The immutable semantic Catalog view used by evidence consumers. */
export interface EvidenceCatalogView {
    readonly releaseId: Digest;
    readonly coveragePolicyDigest: Digest;
    readonly agentReadinessPolicyDigest: Digest;
    readonly currentRevisionDigests: ReadonlySet<string>;
    readonly currentAgentReadinessHeads: ReadonlyMap<string, {
        readonly entityId: string;
        readonly revisionDigest: Digest;
    }>;
    readonly revisions: ReadonlyMap<Digest, CatalogRevision>;
    readonly existingEvents: readonly CatalogEvent[];
    readonly existingObservations: readonly Observation[];
    readonly existingCaptureReceipts: readonly RetainedCaptureReceipt[];
}
/** A read-only Catalog port, independent of evidence execution and publication. */
export interface EvidenceCatalogLookup {
    readonly head: CatalogHead;
    resolveEvidenceClosure(query: CatalogClosureRequest): Promise<EvidenceCatalogView>;
}
export {};
//# sourceMappingURL=index.d.ts.map