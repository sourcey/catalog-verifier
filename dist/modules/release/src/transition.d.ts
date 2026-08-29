import { type AgentReadinessProjection, type AgentReadinessProjectionLineage } from "../../../contracts/agent-readiness/src/index.js";
import type { IdentityIndex } from "../../../contracts/artifact/src/index.js";
import { type CompiledEntity, releaseChangeSchema } from "../../../contracts/artifact/src/index.js";
import type { AssetDelta } from "../../../contracts/assets/src/index.js";
import { type CatalogDelta, type SnapshotCore } from "../../../contracts/release/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
export declare function buildDeltaChanges(entities: readonly {
    readonly current: CompiledEntity;
    readonly prior: CompiledEntity | null;
}[], identities: IdentityIndex, agentReadiness?: {
    readonly current: readonly AgentReadinessProjection[];
    readonly prior: readonly AgentReadinessProjectionLineage[];
    readonly regradedProfileIds?: ReadonlySet<string>;
}, assetDelta?: AssetDelta | null): ReturnType<typeof releaseChangeSchema.parse>[];
export declare function verifyCatalogDeltaState(delta: CatalogDelta): void;
export declare function buildDeltaSnapshotCore(input: {
    readonly parent: SnapshotCore;
    readonly delta: CatalogDelta;
    readonly releaseSequence: number;
    readonly rootSetDigest: Digest;
    readonly signerRegistryDigest: Digest;
    readonly agentReadinessChanges?: readonly {
        readonly agent_readiness_profile_id: string;
        readonly input_digest: Digest | null;
        readonly revision_digest: Digest | null;
        readonly projection_digest: Digest | null;
    }[];
    readonly agentReadinessOfferRelationChanges?: readonly {
        readonly relation_id: string;
        readonly input_digest: Digest | null;
        readonly relation_revision_digest: Digest | null;
        readonly previous_relation_revision_digest: Digest | null;
    }[];
    readonly assetDelta?: AssetDelta | null;
}): SnapshotCore;
//# sourceMappingURL=transition.d.ts.map