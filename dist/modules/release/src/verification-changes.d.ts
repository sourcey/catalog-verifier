import type { AgentReadinessDeltaObject } from "../../../contracts/agent-readiness/src/index.js";
import { type CompiledEntity, releaseChangeSchema } from "../../../contracts/artifact/src/index.js";
import type { AssetDelta } from "../../../contracts/assets/src/index.js";
import type { CatalogDelta, CatalogReleaseBundle } from "../../../contracts/release/src/index.js";
export declare function verifyChanges(files: ReadonlyMap<string, Buffer>, descriptor: CatalogReleaseBundle["release"], delta: CatalogDelta, entities: ReadonlyMap<string, CompiledEntity>, priorEntities: ReadonlyMap<string, CompiledEntity | null>, agentReadinessObjects: ReadonlyMap<string, AgentReadinessDeltaObject>, assetDelta: AssetDelta | null): ReturnType<typeof releaseChangeSchema.parse>[];
//# sourceMappingURL=verification-changes.d.ts.map