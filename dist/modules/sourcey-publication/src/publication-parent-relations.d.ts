import type { AgentReadinessOfferRelationRevision, AgentReadinessProjection } from "../../../contracts/agent-readiness/src/index.js";
import type { VerifiedCatalogDelta } from "./verifier.js";
type Delta = Pick<VerifiedCatalogDelta, "publicationProposal" | "publicationChangeSet" | "agentReadinessObjects" | "agentReadinessOfferRelationObjects" | "files">;
export interface CatalogPublicationParentRelations {
    readonly relations: readonly AgentReadinessOfferRelationRevision[];
    readonly profiles: readonly Pick<AgentReadinessProjection, "agent_readiness_profile_id" | "revision_digest" | "declaration_revision_digest">[];
    readonly offers: readonly {
        readonly offer_id: string;
        readonly revision_digest: string;
    }[];
}
/** The bundle proves admitted changes, not which associations existed in its
 * parent. Storage supplies this exact bounded slice under the live-head lock.
 * Selection never trusts the producer's affected_dependents list. */
export declare function catalogPublicationParentRelationGuard(delta: Delta): {
    selectors: {
        relationIds: string[];
        profileIds: string[];
        offerIds: string[];
    };
    verify(parent: CatalogPublicationParentRelations): void;
};
export {};
//# sourceMappingURL=publication-parent-relations.d.ts.map