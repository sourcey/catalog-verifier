import { z } from "zod";
/**
 * A request to admit retained execution evidence through the declaration repository's PR lane.
 * It locates evidence; it grants no authority and carries no execution result or grade.
 * The intake's retained challenge supplies the exact binding, job, engine and runner identity.
 */
export declare const agentReadinessVerificationProposalSchema: z.ZodObject<{
    schema_version: z.ZodLiteral<"sourcey.agent-readiness-verification-authoring/v1alpha1">;
    profile_id: z.ZodString;
    declaration_revision_digest: z.ZodString;
    intake_id: z.ZodString;
    run_digest: z.ZodString;
}, z.core.$strict>;
export type AgentReadinessVerificationProposal = z.infer<typeof agentReadinessVerificationProposalSchema>;
export declare const agentReadinessVerificationPathSchema: z.ZodString;
/** The current request for this profile; Git retains previous proposals without a run-data log. */
export declare function agentReadinessVerificationPath(profileId: string): string;
//# sourceMappingURL=verification-proposal.d.ts.map