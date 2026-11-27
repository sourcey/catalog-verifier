import { z } from "zod";
import { agentReadinessDigestSchema, agentReadinessIntakeIdSchema, agentReadinessProfileIdSchema, } from "./shared.js";
/**
 * A request to admit retained execution evidence through the declaration repository's PR lane.
 * It locates evidence; it grants no authority and carries no execution result or grade.
 * The intake's retained challenge supplies the exact binding, job, engine and runner identity.
 */
export const agentReadinessVerificationProposalSchema = z
    .object({
    schema_version: z.literal("sourcey.agent-readiness-verification-authoring/v1alpha1"),
    profile_id: agentReadinessProfileIdSchema,
    declaration_revision_digest: agentReadinessDigestSchema,
    intake_id: agentReadinessIntakeIdSchema,
    run_digest: agentReadinessDigestSchema,
})
    .strict();
export const agentReadinessVerificationPathSchema = z
    .string()
    .regex(/^verifications\/arp_[0-9a-hjkmnp-tv-z]{26}\.yaml$/u);
/** The current request for this profile; Git retains previous proposals without a run-data log. */
export function agentReadinessVerificationPath(profileId) {
    return `verifications/${agentReadinessProfileIdSchema.parse(profileId)}.yaml`;
}
//# sourceMappingURL=verification-proposal.js.map