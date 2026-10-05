import type { AgentReadinessDeclarationRevision, AgentReadinessPolicy, AgentReadinessProjection, AgentReadinessRevision } from "../../../contracts/agent-readiness/src/index.js";
export declare function surfaceKey(value: {
    readonly node_kind: string;
    readonly node_id: string;
}): string;
export declare function surfaceCatalogFromDeclaration(revision: AgentReadinessDeclarationRevision): AgentReadinessProjection["surface_catalog"];
export declare function surfaceCatalogFromDeclarationGraph(declaration: AgentReadinessDeclarationRevision["declaration"]): AgentReadinessProjection["surface_catalog"];
export declare function assertSignalSurfaceClosure(revision: AgentReadinessRevision, declarationRevision: AgentReadinessDeclarationRevision): void;
export declare function assertAgentReadinessSignalSelectorCoverage(signal: AgentReadinessRevision["signals"][number], group: AgentReadinessPolicy["signal_rules"][number]["selector_groups"][number], catalog: AgentReadinessProjection["surface_catalog"], allowNotApplicable: boolean): void;
export declare function selectAgentReadinessTestedSurfaces(input: {
    readonly group: AgentReadinessPolicy["signal_rules"][number]["selector_groups"][number];
    readonly catalog: AgentReadinessProjection["surface_catalog"];
    readonly allowNotApplicable: boolean;
}): AgentReadinessRevision["signals"][number]["tested_surfaces"];
export declare function matchingAgentReadinessSurfaceExclusions(group: AgentReadinessPolicy["signal_rules"][number]["selector_groups"][number], catalog: AgentReadinessProjection["surface_catalog"]): readonly {
    readonly node_kind: "surface_exclusion";
    readonly node_id: string;
}[];
export declare function matchingAgentReadinessSurfaces(group: AgentReadinessPolicy["signal_rules"][number]["selector_groups"][number], catalog: AgentReadinessProjection["surface_catalog"]): readonly {
    readonly node_kind: "resource" | "endpoint" | "interface";
    readonly node_id: string;
}[];
export declare function agentReadinessSelectorGroupUsesAssessmentTargets(group: AgentReadinessPolicy["signal_rules"][number]["selector_groups"][number]): boolean;
/**
 * Resolve the exact workload targets for which one selected semantic surface
 * satisfies a target-scoped selector group. The policy's existing selector
 * semantics remain the single authority: evaluating against one target at a
 * time prevents the union of several targets from being mistaken for closure
 * of every target.
 */
export declare function agentReadinessAssessmentTargetIdsForSurface(input: {
    readonly group: AgentReadinessPolicy["signal_rules"][number]["selector_groups"][number];
    readonly catalog: AgentReadinessProjection["surface_catalog"];
    readonly surface: AgentReadinessRevision["signals"][number]["tested_surfaces"][number];
}): readonly string[];
export interface AgentReadinessDeclarationPolicyGap {
    readonly stage: AgentReadinessPolicy["signal_rules"][number]["stage"];
    readonly signalCode: string;
    readonly selectorGroupIds: readonly string[];
}
export declare function agentReadinessDeclarationPolicyGaps(input: {
    readonly declaration: AgentReadinessDeclarationRevision["declaration"];
    readonly policy: AgentReadinessPolicy;
}): readonly AgentReadinessDeclarationPolicyGap[];
export declare function assertAgentReadinessDeclarationPolicyClosure(input: {
    readonly declaration: AgentReadinessDeclarationRevision["declaration"];
    readonly policy: AgentReadinessPolicy;
}): void;
export declare function agentReadinessDeclarationPolicyScopeIssue(input: {
    readonly declaration: AgentReadinessDeclarationRevision["declaration"];
    readonly policy: AgentReadinessPolicy;
}): string | null;
//# sourceMappingURL=surface-selection.d.ts.map