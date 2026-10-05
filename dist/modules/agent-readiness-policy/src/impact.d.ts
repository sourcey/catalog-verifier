import { type Digest } from "provenry/primitives";
import type { AgentReadinessOfferRelationRevision, AgentReadinessProjection } from "../../../contracts/agent-readiness/src/index.js";
import type { CatalogPublicationChangeSet, PublicationDependencyRegistration, SurfaceDependencyReference } from "../../../contracts/publication/src/index.js";
import { type CatalogPublicationImpactQuery } from "../../catalog-admission/src/publication-dependencies.js";
export declare function agentReadinessProfileDependencyKey(profileId: string): string;
export declare function agentReadinessPolicyComponentDependencyKey(input: {
    readonly policyDigest: Digest;
    readonly component: "freshness" | "grade" | "headline" | "presentation" | "stage-aggregation";
    readonly stage?: AgentReadinessProjection["stages"][number]["stage"];
    readonly signalCode?: string;
}): string;
export declare function agentReadinessSignalRuleDependencyKey(input: {
    readonly policyDigest: Digest;
    readonly stage: AgentReadinessProjection["stages"][number]["stage"];
    readonly signalCode: string;
    readonly ruleDigest: Digest;
}): string;
export declare function agentReadinessDeclarationNodeDependencyKey(input: {
    readonly declarationRevisionDigest: Digest;
    readonly nodeKind: "target" | "participant" | "resource" | "endpoint" | "interface" | "relation" | "exclusion";
    readonly nodeId: string;
    readonly nodeDigest: Digest;
}): string;
export declare function agentReadinessSignalConclusionDependencyKey(input: {
    readonly profileId: string;
    readonly stage: AgentReadinessProjection["stages"][number]["stage"];
    readonly signalCode: string;
    readonly conclusionDigest: Digest;
}): string;
export declare function agentReadinessStageProjectionDependencyKey(input: {
    readonly profileId: string;
    readonly stage: AgentReadinessProjection["stages"][number]["stage"];
    readonly stageProjectionDigest: Digest;
}): string;
export declare function agentReadinessGradeProjectionDependencyKey(input: {
    readonly profileId: string;
    readonly gradeProjectionDigest: Digest;
}): string;
export declare function agentReadinessProfileRevisionDependencyKey(input: {
    readonly profileId: string;
    readonly profileRevisionDigest: Digest;
}): string;
export declare function agentReadinessOfferRelationDependencyKey(relationId: string): string;
export declare function agentReadinessOfferRelationRevisionDependencyKey(input: {
    readonly relationId: string;
    readonly relationRevisionDigest: Digest;
}): string;
export declare function agentReadinessProjectionDependencyReferences(projection: AgentReadinessProjection): SurfaceDependencyReference[];
export declare function agentReadinessOfferRelationDependencyReference(relation: AgentReadinessOfferRelationRevision): SurfaceDependencyReference;
export declare function agentReadinessSignalConclusionDigest(input: {
    readonly stage: AgentReadinessProjection["stages"][number]["stage"];
    readonly signal: AgentReadinessProjection["stages"][number]["signals"][number];
}): Digest;
export declare function agentReadinessStageProjectionDigest(stage: AgentReadinessProjection["stages"][number]): Digest;
export declare function agentReadinessGradeProjectionDigest(projection: AgentReadinessProjection): Digest;
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
export declare function planAgentReadinessOfferRelationImpact(input: {
    readonly changeSet: CatalogPublicationChangeSet;
    readonly impactIndex: CatalogPublicationImpactQuery;
    readonly subjectsById: ReadonlyMap<string, AgentReadinessOfferRelationDependencySubject>;
}): {
    readonly actions: readonly {
        readonly relationId: string;
        readonly action: "recompute" | "withdraw";
        readonly changedDependencyKeys: readonly string[];
    }[];
    readonly dependencyLookups: number;
    readonly planDigest: Digest;
};
export declare function planAgentReadinessImpact(input: {
    readonly changeSet: CatalogPublicationChangeSet;
    readonly impactIndex: CatalogPublicationImpactQuery;
    readonly subjectsById: ReadonlyMap<string, AgentReadinessDependencySubject>;
    readonly invalidatedEvidenceEventIds?: readonly Digest[];
}): {
    readonly actions: readonly {
        readonly profileId: string;
        readonly action: "recompute" | "withdraw";
        readonly changedDependencyKeys: readonly string[];
    }[];
    readonly dependencyLookups: number;
    readonly planDigest: Digest;
};
//# sourceMappingURL=impact.d.ts.map