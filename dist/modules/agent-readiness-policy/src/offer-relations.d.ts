import { type RecordReference } from "provenry/records/references";
import { type AgentReadinessOfferRelationIndex, type AgentReadinessOfferRelationInput, type AgentReadinessOfferRelationRevision } from "../../../contracts/agent-readiness/src/index.js";
/** Sourcey maps its signed Offer relation to an engine-owned exact record edge. */
export declare function agentReadinessOfferRecordReference(relation: AgentReadinessOfferRelationRevision): RecordReference;
/** Undefined means this Offer was not changed; null means it was removed. */
export declare function agentReadinessOfferRelationRequiresWithdrawal(input: {
    readonly relation: AgentReadinessOfferRelationRevision;
    readonly changedOfferRevisionDigest: string | null | undefined;
    readonly profileRetired: boolean;
}): boolean;
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