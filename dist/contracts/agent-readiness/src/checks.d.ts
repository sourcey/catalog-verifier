import type { z } from "zod";
import type { agentReadinessScopeSchema } from "./shared.js";
/** Whether two profiles rate the same product and job. */
export declare function sameAgentReadinessScope(left: z.infer<typeof agentReadinessScopeSchema>, right: z.infer<typeof agentReadinessScopeSchema>): boolean;
export declare function validateOfferRelationInterval(value: {
    readonly effective_from: string;
    readonly effective_until?: string | undefined;
}, context: z.RefinementCtx): void;
export declare function sameAgentReadinessOfferRelationIdentity(left: {
    readonly relation_id: string;
    readonly agent_readiness_profile_id: string;
    readonly offer_id: string;
    readonly purpose: string;
}, right: {
    readonly relation_id: string;
    readonly agent_readiness_profile_id: string;
    readonly offer_id: string;
    readonly purpose: string;
}): boolean;
export declare function relationMembership(relations: Readonly<Record<string, {
    readonly relation_id: string;
    readonly agent_readiness_profile_id: string;
    readonly offer_id: string;
}>>, field: "agent_readiness_profile_id" | "offer_id"): Map<string, string[]>;
export declare function validateRelationMembership(actual: Readonly<Record<string, readonly string[]>>, expected: ReadonlyMap<string, readonly string[]>, context: z.RefinementCtx, path: PropertyKey[]): void;
//# sourceMappingURL=checks.d.ts.map