import { type AgentReadinessDeltaObject, type AgentReadinessOfferRelationDeltaObject, type AgentReadinessProjection } from "../../../contracts/agent-readiness/src/index.js";
import type { CompiledEntity } from "../../../contracts/artifact/src/index.js";
import { releaseChangeSchema } from "../../../contracts/artifact/src/index.js";
import type { AssetDelta } from "../../../contracts/assets/src/index.js";
import type { EntityAuthoring } from "../../../contracts/authoring/src/index.js";
import type { RootSet, SignerRegistry } from "../../../contracts/authority/src/index.js";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import { type CaptureReceipt } from "../../../contracts/evidence/src/index.js";
import { type Observation } from "../../../contracts/observations/src/index.js";
import type { CatalogPublicationChangeSet, CatalogPublicationProposal, PublicationIngressReceipt } from "../../../contracts/publication/src/index.js";
import { type CatalogDelta, type CatalogReleaseBundle } from "../../../contracts/release/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
import { type ReleaseRevision } from "./release-revision-parser.js";
export interface VerifiedCatalogDelta {
    readonly bundle: CatalogReleaseBundle;
    readonly delta: CatalogDelta;
    readonly entities: ReadonlyMap<string, CompiledEntity>;
    readonly priorEntities: ReadonlyMap<string, CompiledEntity | null>;
    readonly authoring: ReadonlyMap<string, EntityAuthoring>;
    readonly priorAuthoring: ReadonlyMap<string, EntityAuthoring | null>;
    readonly assetDelta: AssetDelta | null;
    readonly safeAssetBytes: ReadonlyMap<Digest, Buffer>;
    readonly revisions: ReadonlyMap<Digest, ReleaseRevision>;
    readonly agentReadinessProfiles: ReadonlyMap<string, AgentReadinessProjection>;
    readonly agentReadinessObjects: ReadonlyMap<string, AgentReadinessDeltaObject>;
    readonly agentReadinessOfferRelationObjects: ReadonlyMap<string, AgentReadinessOfferRelationDeltaObject>;
    readonly events: readonly CatalogEvent[];
    readonly observations: readonly Observation[];
    readonly captureReceipts: readonly CaptureReceipt[];
    readonly publicationProposal: CatalogPublicationProposal;
    readonly publicationChangeSet: CatalogPublicationChangeSet;
    readonly ingressReceipts: readonly PublicationIngressReceipt[];
    readonly rootSet: RootSet;
    readonly registry: SignerRegistry;
    readonly files: ReadonlyMap<string, Buffer>;
    readonly changes: readonly ReturnType<typeof releaseChangeSchema.parse>[];
}
export declare function verifyCatalogDeltaDirectory(directory: string, trust?: {
    readonly rootSetDigest: Digest;
}): Promise<VerifiedCatalogDelta>;
//# sourceMappingURL=verifier.d.ts.map