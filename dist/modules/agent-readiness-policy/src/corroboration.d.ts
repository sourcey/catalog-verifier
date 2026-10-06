import type { z } from "zod";
import type { AgentReadinessPolicy, AgentReadinessRevision, agentReadinessCaptureRungSchema, agentReadinessDeterminationBasisKindSchema, agentReadinessDeterminationBasisSchema, agentReadinessRetainedArtifactSchema, agentReadinessSurfaceReferenceSchema } from "../../../contracts/agent-readiness/src/index.js";
type CorroborationRule = AgentReadinessPolicy["signal_rules"][number]["value_evidence"][number];
/**
 * Evidence inventory shared by early fact-candidate validation and final
 * proposal admission. Policy remains the sole owner of sufficiency.
 */
export interface AgentReadinessCorroborationInventory {
    readonly basisKinds: ReadonlySet<z.infer<typeof agentReadinessDeterminationBasisKindSchema>>;
    readonly captures: ReadonlyMap<string, z.infer<typeof agentReadinessCaptureRungSchema>>;
    readonly artifactKinds: ReadonlySet<z.infer<typeof agentReadinessRetainedArtifactSchema>>;
    readonly coveredSurfaces: ReadonlySet<string>;
    readonly coveredBranches: number;
}
/** One sufficiency evaluator; callers only project retained evidence into it. */
export declare function agentReadinessCorroborationInventorySatisfied(input: {
    readonly rule: CorroborationRule;
    readonly inventory: AgentReadinessCorroborationInventory;
}): boolean;
/** The same evidence sufficiency rule applies before interpretation and at admission. */
export declare function agentReadinessCorroborationSatisfied(input: {
    readonly rule: CorroborationRule;
    readonly bases: readonly z.infer<typeof agentReadinessDeterminationBasisSchema>[];
    readonly artifactKinds: ReadonlySet<z.infer<typeof agentReadinessRetainedArtifactSchema>>;
    readonly testedSurfaces: readonly z.infer<typeof agentReadinessSurfaceReferenceSchema>[];
}): boolean;
/**
 * A policy transition may reuse an admitted fact only when its immutable bases
 * still satisfy the new rule. A revision records basis identities, not the full
 * artifact inventory; infer only the artifact kinds guaranteed by admission of
 * those bases. New requirements such as screenshots therefore need recapture.
 */
export declare function agentReadinessAdmittedFactSupportsPolicy(input: {
    readonly signal: AgentReadinessRevision["signals"][number];
    readonly rule: CorroborationRule;
}): boolean;
export {};
//# sourceMappingURL=corroboration.d.ts.map