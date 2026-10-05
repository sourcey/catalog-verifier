import type { AgentReadinessDeltaObject } from "../../../contracts/agent-readiness/src/index.js";
import type { CompiledEntity, ReleaseChange } from "../../../contracts/artifact/src/index.js";
import type { AssetDelta } from "../../../contracts/assets/src/index.js";
import type { CatalogDelta } from "../../../contracts/release/src/index.js";
/**
 * The engine already proved the change log's bytes, order, identities and
 * snapshot binding. Sourcey proves its meaning: the log is exactly the change set
 * its Entity, Agent Readiness and asset transitions imply.
 */
export declare function verifyChanges(changes: readonly ReleaseChange[], delta: CatalogDelta, entities: ReadonlyMap<string, CompiledEntity>, priorEntities: ReadonlyMap<string, CompiledEntity | null>, agentReadinessObjects: ReadonlyMap<string, AgentReadinessDeltaObject>, assetDelta: AssetDelta | null): void;
//# sourceMappingURL=verification-changes.d.ts.map