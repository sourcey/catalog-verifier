import { type AgentReadinessDeclarationRevision, type AgentReadinessOfferRelationRevision, type AgentReadinessProjection, type AgentReadinessRevision, agentReadinessIndexSchema } from "../../../contracts/agent-readiness/src/index.js";
import { type CanonicalArtifact, identityIndexSchema, provenanceIndexSchema } from "../../../contracts/artifact/src/index.js";
import { assetIndexSchema, assetNoticesSchema } from "../../../contracts/assets/src/index.js";
import { type EntityAuthoring } from "../../../contracts/authoring/src/index.js";
import type { RootSet, SignerRegistry } from "../../../contracts/authority/src/index.js";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import { type CaptureReceipt } from "../../../contracts/evidence/src/index.js";
import { type Observation } from "../../../contracts/observations/src/index.js";
import { type CatalogReleaseBundle } from "../../../contracts/release/src/index.js";
import { type EntityRevision, type OfferRevision, type ProgramRevision } from "../../../contracts/revisions/src/index.js";
import { routeIndexSchema } from "../../../contracts/routes/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
export interface VerifiedCatalogRelease {
    readonly bundle: CatalogReleaseBundle;
    readonly descriptor: CatalogReleaseBundle["release"];
    readonly artifact: CanonicalArtifact;
    readonly authoring: readonly EntityAuthoring[];
    readonly routes: ReturnType<typeof routeIndexSchema.parse>;
    readonly identities: ReturnType<typeof identityIndexSchema.parse>;
    readonly provenance: ReturnType<typeof provenanceIndexSchema.parse>;
    readonly agentReadinessIndex: ReturnType<typeof agentReadinessIndexSchema.parse>;
    readonly agentReadinessProfiles: AgentReadinessProjection[];
    readonly agentReadinessOfferRelations: AgentReadinessOfferRelationRevision[];
    readonly assetIndex: ReturnType<typeof assetIndexSchema.parse>;
    readonly assetNotices: ReturnType<typeof assetNoticesSchema.parse>;
    readonly rootSet: RootSet;
    readonly registry: SignerRegistry;
    readonly events: CatalogEvent[];
    readonly observations: Observation[];
    readonly captureReceipts: CaptureReceipt[];
    readonly revisions: Map<Digest, EntityRevision | ProgramRevision | OfferRevision | AgentReadinessRevision | AgentReadinessDeclarationRevision>;
    readonly files: Map<string, Buffer>;
}
export declare function verifyCatalogReleaseDirectory(directory: string, trust?: {
    readonly rootSetDigest: Digest;
}): Promise<VerifiedCatalogRelease>;
/**
 * Loads an exact bundle already admitted with verifyCatalogReleaseDirectory and
 * pinned by an immutable consumer lock. It repeats byte closure, schemas,
 * identities, signatures, and semantic graph closure, but does not re-run raw
 * capture normalization on every serving-process start.
 */
export declare function loadAdmittedCatalogReleaseDirectory(directory: string, trust?: {
    readonly rootSetDigest: Digest;
}): Promise<VerifiedCatalogRelease>;
//# sourceMappingURL=index.d.ts.map