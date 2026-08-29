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
//# sourceMappingURL=surface-selection.d.ts.map