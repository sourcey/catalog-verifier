import type { AgentReadinessDeclarationRevision, AgentReadinessOfferRelationRevision, AgentReadinessProjection, AgentReadinessRevision } from "../../../contracts/agent-readiness/src/index.js";
import { type agentReadinessInputsSchema, type agentReadinessOfferRelationInputsSchema } from "../../../contracts/agent-readiness/src/index.js";
import type { CanonicalArtifact, ProvenanceIndex } from "../../../contracts/artifact/src/index.js";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import type { Observation } from "../../../contracts/observations/src/index.js";
import type { EntityRevision, OfferRevision, ProgramRevision } from "../../../contracts/revisions/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
export declare function assertReleasedAgentReadinessClosure(input: {
    readonly artifact: CanonicalArtifact;
    readonly revisions: ReadonlyMap<Digest, EntityRevision | ProgramRevision | OfferRevision | AgentReadinessRevision | AgentReadinessDeclarationRevision>;
    readonly provenance: ProvenanceIndex;
    readonly events: readonly CatalogEvent[];
    readonly observations: readonly Observation[];
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