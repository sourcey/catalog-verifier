import type { AgentReadinessDeltaObject, AgentReadinessOfferRelationDeltaObject } from "../../../contracts/agent-readiness/src/index.js";
export declare function verifiedAgentReadinessTransitions(objects: ReadonlyMap<string, AgentReadinessDeltaObject>): {
    agent_readiness_profile_id: string;
    input_digest: `sha256:${string}` | null;
    revision_digest: `sha256:${string}` | null;
    projection_digest: `sha256:${string}` | null;
}[];
export declare function verifiedAgentReadinessOfferRelationTransitions(objects: ReadonlyMap<string, AgentReadinessOfferRelationDeltaObject>): {
    relation_id: string;
    input_digest: `sha256:${string}` | null;
    relation_revision_digest: `sha256:${string}` | null;
    previous_relation_revision_digest: `sha256:${string}` | null;
}[];
//# sourceMappingURL=verification-transitions.d.ts.map