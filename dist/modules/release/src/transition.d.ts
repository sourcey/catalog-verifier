import { type Digest } from "provenry/primitives";
import type { AgentReadinessProjection } from "../../../contracts/agent-readiness/src/index.js";
import type { IdentityIndex } from "../../../contracts/artifact/src/index.js";
import { type CompiledEntity, releaseChangeSchema } from "../../../contracts/artifact/src/index.js";
import type { AssetDelta } from "../../../contracts/assets/src/index.js";
import { type CatalogDelta, type CatalogStateTransitionCore, type SnapshotCore } from "../../../contracts/release/src/index.js";
export declare function buildDeltaChanges(entities: readonly {
    readonly current: CompiledEntity;
    readonly prior: CompiledEntity | null;
}[], identities: IdentityIndex, agentReadiness: {
    readonly current: readonly AgentReadinessProjection[];
    readonly prior: readonly AgentReadinessProjection[];
    readonly regradedProfileIds: ReadonlySet<string>;
}, assetDelta: AssetDelta | null): ReturnType<typeof releaseChangeSchema.parse>[];
type CatalogStateTransitionInput = Pick<CatalogDelta, "base" | "policy_as_of" | "artifact_core" | "entity_changes" | "routes" | "identities" | "provenance" | "authority_set_digests" | "object_manifest_digest">;
/** The canonical state transition a delta's `state_digest` commits to. */
export declare function catalogStateTransitionCore(delta: CatalogStateTransitionInput): CatalogStateTransitionCore;
/** A parsed delta already holds schema-valid fields, so its digests need no second parse. */
export declare function verifyCatalogDeltaState(delta: CatalogDelta): void;
export declare function buildDeltaSnapshotCore(input: {
    readonly parent: SnapshotCore;
    readonly delta: CatalogDelta;
    readonly releaseSequence: number;
    readonly rootSetDigest: Digest;
    readonly signerRegistryDigest: Digest;
    readonly agentReadinessChanges: readonly {
        readonly agent_readiness_profile_id: string;
        readonly input_digest: Digest | null;
        readonly revision_digest: Digest | null;
        readonly projection_digest: Digest | null;
    }[];
    readonly agentReadinessOfferRelationChanges: readonly {
        readonly relation_id: string;
        readonly input_digest: Digest | null;
        readonly relation_revision_digest: Digest | null;
        readonly previous_relation_revision_digest: Digest | null;
    }[];
    readonly assetDelta: AssetDelta | null;
}): SnapshotCore;
export {};
//# sourceMappingURL=transition.d.ts.map