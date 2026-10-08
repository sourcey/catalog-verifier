import { z } from "zod";
import { agentReadinessJobLibrarySchema } from "./jobs.js";
import { AGENT_READINESS_MAXIMUM_REVISION_RUNS, AGENT_READINESS_STEPS, agentReadinessDigestSchema, agentReadinessOperateLetterSchema, agentReadinessStepSchema, } from "./shared.js";
/**
 * The rating rules as data: the jobs a profile can be rated on, which letter a
 * path earns and what it must have assessed to earn it, when a step counts as
 * blocked, and how long a run stays fresh. The engine applies them; the
 * published file is what every reader, the verifier included, applies.
 */
export const AGENT_READINESS_POLICY_CONTRACT = "sourcey.agent-readiness-policy/v1alpha1";
const stepsSchema = z.array(agentReadinessStepSchema).max(AGENT_READINESS_STEPS.length);
const agentReadinessLetterRuleSchema = z
    .object({
    letter: agentReadinessOperateLetterSchema.exclude(["D", "F"]),
    condition: z
        .object({
        /** False: no `workaround` on any step. */
        workarounds_allowed: z.boolean(),
        /** Steps where a recurring `workaround` may appear; empty allows none. */
        recurring_allowed_in: stepsSchema,
        /** At least one recurring `workaround` in these steps, when set. */
        recurring_required_in: stepsSchema.min(1).nullable(),
        setup_workarounds: z
            .object({
            minimum: z.number().int().nonnegative(),
            maximum: z.number().int().nonnegative().nullable(),
        })
            .strict(),
    })
        .strict(),
    /** Steps that must be assessed (any outcome but `not_assessed`) for this letter. */
    coverage: stepsSchema.min(1),
    statement: z.string().trim().min(1).max(280),
})
    .strict();
export const agentReadinessPolicyCoreSchema = z
    .object({
    policy_contract: z.literal(AGENT_READINESS_POLICY_CONTRACT),
    policy_version: z.string().trim().min(1).max(80),
    /** The sealed library itself: a new job is a new policy. */
    job_library: agentReadinessJobLibrarySchema,
    /** Tried best first; the first rule whose condition and coverage hold is the letter. */
    letters: z.array(agentReadinessLetterRuleSchema).min(1),
    blocked: z
        .object({
        /** Executed attempts with the same refusal; a revision cites every one of them. */
        attempts: z.number().int().min(2).max(AGENT_READINESS_MAXIMUM_REVISION_RUNS),
        /** The least time between the first and the last of them. */
        minimum_interval_seconds: z.number().int().positive(),
        /** Statuses that refuse a valid authority; 401 (invalid authority) is never one. */
        statuses: z.array(z.number().int().min(400).max(499)).min(1),
        /** What D (Delegation or Pay blocked) and F (the job blocked) tell a reader. */
        statements: z
            .object({
            D: z.string().trim().min(1).max(280),
            F: z.string().trim().min(1).max(280),
        })
            .strict(),
    })
        .strict(),
    /** A rating rests on its latest run; older than this, it is stale. */
    fresh_for_days: z.number().int().positive(),
})
    .strict()
    .superRefine((policy, context) => {
    const letters = policy.letters.map(({ letter }) => letter);
    const order = agentReadinessOperateLetterSchema.options;
    if (letters.some((letter, index) => index > 0 && order.indexOf(letters[index - 1]) >= order.indexOf(letter))) {
        context.addIssue({
            code: "custom",
            path: ["letters"],
            message: "Letter rules are unique and ordered best first.",
        });
    }
    if (policy.blocked.statuses.includes(401)) {
        context.addIssue({
            code: "custom",
            path: ["blocked", "statuses"],
            message: "401 says the authority is invalid, which is residue, never a blocker.",
        });
    }
});
export const agentReadinessPolicySchema = agentReadinessPolicyCoreSchema
    .safeExtend({ policy_digest: agentReadinessDigestSchema })
    .strict();
//# sourceMappingURL=operate-policy.js.map