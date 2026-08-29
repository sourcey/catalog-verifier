import { z } from "zod";
import { type Digest } from "../../primitives/src/index.js";
declare const admissionCoreSchema: z.ZodObject<{
    admission_contract: z.ZodLiteral<"sourcey.agent-readiness-repository-merge-admission/v1alpha1">;
    repository: z.ZodLiteral<"sourcey/agent-ready-services">;
    head_revision: z.ZodString;
    reviewer_id: z.ZodString;
    admitted_at: z.ZodISODateTime;
    rationale: z.ZodString;
    profile_allocations: z.ZodArray<z.ZodObject<{
        declaration_id: z.ZodString;
        agent_readiness_profile_id: z.ZodString;
        effective_from: z.ZodISODateTime;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessRepositoryMergeAdmissionSchema: z.ZodObject<{
    admission_contract: z.ZodLiteral<"sourcey.agent-readiness-repository-merge-admission/v1alpha1">;
    repository: z.ZodLiteral<"sourcey/agent-ready-services">;
    head_revision: z.ZodString;
    reviewer_id: z.ZodString;
    admitted_at: z.ZodISODateTime;
    rationale: z.ZodString;
    profile_allocations: z.ZodArray<z.ZodObject<{
        declaration_id: z.ZodString;
        agent_readiness_profile_id: z.ZodString;
        effective_from: z.ZodISODateTime;
    }, z.core.$strict>>;
    admission_digest: z.ZodString;
}, z.core.$strict>;
export type AgentReadinessRepositoryMergeAdmission = z.infer<typeof agentReadinessRepositoryMergeAdmissionSchema>;
export declare function buildAgentReadinessRepositoryMergeAdmission(input: z.input<typeof admissionCoreSchema>): AgentReadinessRepositoryMergeAdmission;
export declare function verifyAgentReadinessRepositoryMergeAdmission(input: unknown): AgentReadinessRepositoryMergeAdmission;
export declare function agentReadinessMergeAdmissionDigest(input: AgentReadinessRepositoryMergeAdmission): Digest;
export {};
//# sourceMappingURL=admission.d.ts.map