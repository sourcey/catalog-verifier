import { type AgentReadinessDeclarationRevision, type AgentReadinessPolicy, type AgentReadinessProjection, type AgentReadinessRevision } from "../../../contracts/agent-readiness/src/index.js";
import type { EntityRevision } from "../../../contracts/revisions/src/index.js";
import { type EvidenceStandingGraph } from "../../provenance/src/index.js";
export * from "./current-policy.js";
export * from "./declaration-jobs.js";
export * from "./impact.js";
export * from "./offer-relations.js";
export * from "./operate-policy.js";
export * from "./prior-projection.js";
export * from "./revision.js";
/**
 * The projection a release publishes for one revision: the Operate letter the
 * pinned policy gives its steps, its Onboard level and evidence label, the
 * human boundaries a reader sees, and whether it is discoverable. Freshness is
 * served from the freshness index, never released. Nothing here reads
 * documentation or calls out.
 */
export declare function deriveAgentReadinessProjection(input: {
    readonly revision: AgentReadinessRevision;
    readonly declarationRevision: AgentReadinessDeclarationRevision;
    readonly authorityEntityRevision: EntityRevision;
    readonly priorProjection?: AgentReadinessProjection | null;
    readonly graph: EvidenceStandingGraph;
    readonly policy: AgentReadinessPolicy;
    readonly policyAsOf: string;
    readonly entitySlug: string;
}): AgentReadinessProjection;
/** The same revision under a newer policy or a later policy instant. */
export declare function regradeAgentReadinessProjection(input: Parameters<typeof deriveAgentReadinessProjection>[0] & {
    readonly priorProjection: AgentReadinessProjection;
}): AgentReadinessProjection;
/**
 * Move only the public route of an immutable projection: every assessed fact,
 * letter and publication decision is kept byte for byte.
 */
export declare function reprojectAgentReadinessCanonicalRoute(input: {
    readonly revision: AgentReadinessRevision;
    readonly priorProjection: AgentReadinessProjection;
    readonly entitySlug: string;
}): AgentReadinessProjection;
/** A relocation changes the locator, never the immutable assessment facts. */
export declare function isAgentReadinessRouteOnlySuccession(prior: AgentReadinessProjection, current: AgentReadinessProjection): boolean;
/** A route move when that is all that changed; otherwise the revision re-rated. */
export declare function deriveAgentReadinessReprojection(input: Parameters<typeof regradeAgentReadinessProjection>[0] & {
    readonly currentProjection: AgentReadinessProjection;
}): AgentReadinessProjection;
//# sourceMappingURL=index.d.ts.map