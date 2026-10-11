import { z } from "zod";
import { agentReadinessJobLibrarySchema } from "./jobs.js";
import { AGENT_READINESS_MAXIMUM_ATTEMPTS, agentReadinessDigestSchema, agentReadinessLetterSchema, } from "./shared.js";
/**
 * The rating rules as data (north star §5.7): the jobs a profile is rated on,
 * the person-steps each letter allows, how a finding is reproduced, and how
 * long a run stays fresh. The engine applies them; the published file is what
 * every reader, the verifier included, applies.
 */
export const AGENT_READINESS_POLICY_CONTRACT = "sourcey.agent-readiness-policy/v1alpha1";
const agentReadinessLetterRuleSchema = z
    .object({
    letter: agentReadinessLetterSchema,
    /** The person-steps a path may hold and still earn this letter. */
    allows: z
        .object({
        /** The most principal's one-time decisions (`approval`); null for any number. */
        approvals: z.number().int().nonnegative().nullable(),
        /** The most setup `workaround`s; null for any number. */
        setup_workarounds: z.number().int().nonnegative().nullable(),
        recurring_workarounds: z.boolean(),
        gated: z.boolean(),
        /** Job `unavailable`. */
        unavailable: z.boolean(),
    })
        .strict(),
    statement: z.string().trim().min(1).max(280),
})
    .strict();
export const agentReadinessPolicyCoreSchema = z
    .object({
    policy_contract: z.literal(AGENT_READINESS_POLICY_CONTRACT),
    policy_version: z.string().trim().min(1).max(80),
    /** The sealed library itself: a new job is a new policy. */
    job_library: agentReadinessJobLibrarySchema,
    /** Every letter, best first; the first whose allowance covers a path is its letter. */
    letters: z
        .array(agentReadinessLetterRuleSchema)
        .length(agentReadinessLetterSchema.options.length),
    /**
     * How a finding is reproduced: a page answer, a read left unanswered, or a
     * refusal of valid authority in a verified run.
     */
    reproduction: z
        .object({
        /** Runs holding the same finding; a revision cites the latest that reproduce it. */
        attempts: z.number().int().min(2).max(AGENT_READINESS_MAXIMUM_ATTEMPTS),
        /** The least time between the first and the last of them. */
        minimum_interval_seconds: z.number().int().positive(),
        /**
         * Statuses that refuse a valid authority in a verified run. 401 (invalid
         * authority) is residue, and 402 is Pay's own answer.
         */
        statuses: z.array(z.number().int().min(400).max(499)).min(1),
    })
        .strict(),
    /** A rating rests on its latest run; older than this, it is stale. */
    fresh_for_days: z.number().int().positive(),
})
    .strict()
    .superRefine((policy, context) => {
    if (policy.letters.some(({ letter }, index) => letter !== agentReadinessLetterSchema.options[index])) {
        context.addIssue({
            code: "custom",
            path: ["letters"],
            message: "The policy states every letter once, best first.",
        });
    }
    const last = policy.letters.at(-1)?.allows;
    const allowsEvery = last?.approvals === null &&
        last.setup_workarounds === null &&
        last.recurring_workarounds &&
        last.gated &&
        last.unavailable;
    if (!allowsEvery) {
        context.addIssue({
            code: "custom",
            path: ["letters"],
            message: "The last letter allows every path, so every assessed path has a letter.",
        });
    }
    if (policy.reproduction.statuses.some((status) => status === 401 || status === 402)) {
        context.addIssue({
            code: "custom",
            path: ["reproduction", "statuses"],
            message: "401 is residue and 402 is Pay's own answer; neither refuses valid authority.",
        });
    }
});
export const agentReadinessPolicySchema = agentReadinessPolicyCoreSchema
    .safeExtend({ policy_digest: agentReadinessDigestSchema })
    .strict();
//# sourceMappingURL=grade-policy.js.map