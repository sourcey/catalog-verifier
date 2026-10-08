import { type Digest } from "provenry/primitives";
import { type AgentReadinessOfferRelationRevision, type AgentReadinessProjection, type agentReadinessInputsSchema, type agentReadinessOfferRelationInputsSchema } from "../../../contracts/agent-readiness/src/index.js";
import type { CanonicalArtifact } from "../../../contracts/artifact/src/index.js";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import type { RetainedCatalogRevision } from "../../evidence-operations/src/retained-revision.js";
export declare function assertReleasedAgentReadinessClosure(input: {
    readonly artifact: CanonicalArtifact;
    readonly revisions: ReadonlyMap<Digest, RetainedCatalogRevision>;
    readonly events: readonly CatalogEvent[];
    readonly profiles: readonly AgentReadinessProjection[];
    readonly inputs: ReturnType<typeof agentReadinessInputsSchema.parse>;
}): void;
export declare function assertReleasedAgentReadinessOfferRelationClosure(input: {
    readonly artifact: CanonicalArtifact;
    readonly profiles: readonly AgentReadinessProjection[];
    readonly relations: readonly AgentReadinessOfferRelationRevision[];
    readonly inputs: ReturnType<typeof agentReadinessOfferRelationInputsSchema.parse>;
    readonly files: ReadonlyMap<string, Buffer>;
}): void;
//# sourceMappingURL=agent-readiness-closure.d.ts.map