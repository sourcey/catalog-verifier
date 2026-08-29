import type { AgentReadinessProjection, AgentReadinessProjectionLineage } from "../../../contracts/agent-readiness/src/index.js";
import type { CanonicalArtifact, IdentityIndex, ReleaseChange } from "../../../contracts/artifact/src/index.js";
import type { AssetIndex } from "../../../contracts/assets/src/index.js";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import { type routeIndexSchema } from "../../../contracts/routes/src/index.js";
export declare function buildChanges(input: {
    readonly parent: CanonicalArtifact | null;
    readonly current: CanonicalArtifact;
    readonly identities: IdentityIndex;
    readonly parentRoutes: ReturnType<typeof routeIndexSchema.parse> | null;
    readonly agentReadinessProfiles: readonly AgentReadinessProjection[];
    readonly parentAgentReadinessProfiles: readonly AgentReadinessProjectionLineage[];
    readonly assetIndex: AssetIndex;
    readonly parentAssetIndex: AssetIndex | null;
    readonly events: readonly CatalogEvent[];
}): ReleaseChange[];
export declare function buildAgentReadinessChanges(input: {
    readonly current: readonly AgentReadinessProjection[];
    readonly prior: readonly AgentReadinessProjectionLineage[];
    readonly identities: IdentityIndex;
    readonly regradedProfileIds?: ReadonlySet<string>;
}): ReleaseChange[];
//# sourceMappingURL=changes.d.ts.map