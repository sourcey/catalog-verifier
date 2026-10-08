import type { AttestedCapture } from "provenry/capture/attestation";
import { type Digest } from "provenry/primitives";
import { type AgentReadinessOfferRelationRevision, type AgentReadinessProjection, agentReadinessIndexSchema } from "../../../contracts/agent-readiness/src/index.js";
import { type CanonicalArtifact, identityIndexSchema, provenanceIndexSchema } from "../../../contracts/artifact/src/index.js";
import { assetIndexSchema, assetNoticesSchema } from "../../../contracts/assets/src/index.js";
import { type EntityAuthoring } from "../../../contracts/authoring/src/index.js";
import type { RootSet, SignerRegistry } from "../../../contracts/authority/src/index.js";
import { type CatalogEvent } from "../../../contracts/events/src/index.js";
import { type Observation } from "../../../contracts/observations/src/index.js";
import { type CatalogReleaseBundle } from "../../../contracts/release/src/index.js";
import { routeIndexSchema } from "../../../contracts/routes/src/index.js";
import { type RetainedCatalogRevision } from "../../evidence-operations/src/retained-revision.js";
import { type VerifiedSourceyRelease } from "../../publication-instance/src/index.js";
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
    /** The attested captures the release holds, by attestation digest. */
    readonly attestedCaptures: ReadonlyMap<string, AttestedCapture>;
    /** Every current and historical revision the release retains, by digest. */
    readonly revisions: ReadonlyMap<Digest, RetainedCatalogRevision>;
    readonly files: ReadonlyMap<string, Buffer>;
}
export declare function verifyCatalogReleaseDirectory(directory: string, trust?: {
    readonly rootSetDigest: Digest;
}): Promise<VerifiedCatalogRelease>;
/** Verifies a full release whose envelope is already verified. */
export declare function verifyCatalogRelease(release: VerifiedSourceyRelease, trust?: {
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