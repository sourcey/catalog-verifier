import { type Digest } from "provenry/primitives";
import type { AgentReadinessOfferRelationRevision, AgentReadinessProjection } from "../../../contracts/agent-readiness/src/index.js";
import type { PublicationDependencyRegistration } from "../../../contracts/publication/src/index.js";
export interface AgentReadinessDependencySubject {
    readonly profileId: string;
    readonly profileRevisionDigest: Digest;
    readonly entityId: string;
    readonly entityRevisionDigest: Digest;
    readonly evidenceEventIds: readonly Digest[];
    readonly declarationRevisionDigest: Digest;
    readonly sourceLocatorDigests: readonly Digest[];
}
export declare function agentReadinessDependencySubject(profile: AgentReadinessProjection): AgentReadinessDependencySubject;
export declare function agentReadinessDependencyRegistration(subject: AgentReadinessDependencySubject): PublicationDependencyRegistration;
export interface AgentReadinessOfferRelationDependencySubject {
    readonly relationId: string;
    readonly profileId: string;
    readonly offerId: string;
    readonly offerRevisionDigest: Digest;
    readonly declarationRevisionDigest: Digest;
}
export declare function agentReadinessOfferRelationDependencySubject(relation: AgentReadinessOfferRelationRevision): AgentReadinessOfferRelationDependencySubject;
export declare function agentReadinessOfferRelationDependencyRegistration(subject: AgentReadinessOfferRelationDependencySubject): PublicationDependencyRegistration;
//# sourceMappingURL=impact.d.ts.map