import { type AgentReadinessOfferRelationIndex, type AgentReadinessOfferRelationInput, type AgentReadinessOfferRelationRevision } from "../../../contracts/agent-readiness/src/index.js";
export declare function agentReadinessOfferRelationId(input: {
    readonly agentReadinessProfileId: string;
    readonly offerId: string;
    readonly purpose: string;
}): string;
export declare function compileAgentReadinessOfferRelationRevision(input: AgentReadinessOfferRelationInput): AgentReadinessOfferRelationRevision;
export declare function projectAgentReadinessOfferRelationIndex(input: {
    readonly relations: readonly AgentReadinessOfferRelationRevision[];
    readonly policyAsOf: string;
}): AgentReadinessOfferRelationIndex;
//# sourceMappingURL=offer-relations.d.ts.map