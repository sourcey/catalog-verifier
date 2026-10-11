import { z } from "zod";
import { agentReadinessJobLibrarySchema } from "./jobs.js";
import { AGENT_READINESS_MAXIMUM_ATTEMPTS, AGENT_READINESS_PERSON_STEP_KINDS, AGENT_READINESS_PERSON_STEPS, AGENT_READINESS_STEPS, agentReadinessDigestSchema, agentReadinessHumanStepTimingSchema, agentReadinessLetterSchema, agentReadinessPersonStepKey, agentReadinessPersonStepKindSchema, agentReadinessStepSchema, } from "./shared.js";
/**
 * The rating rules as data (north star §5.7): the jobs a profile is rated on,
 * the kind of each person-step a path can hold, the kinds each letter allows
 * (and, for A, how many),
 * how a finding is reproduced, and how long a run stays fresh. The engine
 * applies them; the published file is what every reader, the verifier
 * included, applies.
 */
export const AGENT_READINESS_POLICY_CONTRACT = "sourcey.agent-readiness-policy/v1alpha1";
/** One person-step a step can need, and its kind on the shape's scale. */
const agentReadinessPersonStepRuleSchema = z
    .object({
    step: agentReadinessStepSchema,
    outcome: z.enum(["approval", "workaround", "gated"]),
    timing: agentReadinessHumanStepTimingSchema.nullable(),
    kind: agentReadinessPersonStepKindSchema,
})
    .strict();
const agentReadinessLetterRuleSchema = z
    .object({
    letter: agentReadinessLetterSchema,
    /** The person-step kinds a path may hold and still earn this letter. */
    allows: z
        .object({
        kinds: z
            .array(agentReadinessPersonStepKindSchema)
            .max(AGENT_READINESS_PERSON_STEP_KINDS.length),
        /**
         * The most person-steps the path may hold, or null for any number: the
         * shape names one count, A's "one light, one-time human step".
         */
        most_steps: z.number().int().min(0).max(AGENT_READINESS_STEPS.length).nullable(),
        /** The probes found no machine interface for the job. */
        unavailable: z.boolean(),
    })
        .strict(),
    statement: z.string().trim().min(1).max(280),
})
    .strict();
const KIND_ORDER = new Map(AGENT_READINESS_PERSON_STEP_KINDS.map((kind, index) => [kind, index]));
export const agentReadinessPolicyCoreSchema = z
    .object({
    policy_contract: z.literal(AGENT_READINESS_POLICY_CONTRACT),
    policy_version: z.string().trim().min(1).max(80),
    /** The sealed library itself: a new job is a new policy. */
    job_library: agentReadinessJobLibrarySchema,
    /** Every person-step a step can need, once each, with its kind. */
    person_steps: z
        .array(agentReadinessPersonStepRuleSchema)
        .length(AGENT_READINESS_PERSON_STEPS.length),
    /** Every letter, best first; a path earns the first that allows every kind it holds. */
    letters: z
        .array(agentReadinessLetterRuleSchema)
        .length(agentReadinessLetterSchema.options.length),
    /** How a finding the probes read is reproduced: a page answer, or a read left unanswered. */
    reproduction: z
        .object({
        /** Runs holding the same finding; a revision cites the latest that reproduce it. */
        attempts: z.number().int().min(2).max(AGENT_READINESS_MAXIMUM_ATTEMPTS),
        /** The least time between the first and the last of them. */
        minimum_interval_seconds: z.number().int().positive(),
    })
        .strict(),
    /** A rating rests on its latest run; older than this, it is stale. */
    fresh_for_days: z.number().int().positive(),
})
    .strict()
    .superRefine((policy, context) => {
    const admitted = AGENT_READINESS_PERSON_STEPS.map(agentReadinessPersonStepKey).sort();
    const mapped = policy.person_steps.map(agentReadinessPersonStepKey).sort();
    if (admitted.join("\n") !== mapped.join("\n")) {
        context.addIssue({
            code: "custom",
            path: ["person_steps"],
            message: "The policy gives every person-step a step can need exactly one kind.",
        });
    }
    if (policy.letters.some(({ letter }, index) => letter !== agentReadinessLetterSchema.options[index])) {
        context.addIssue({
            code: "custom",
            path: ["letters"],
            message: "The policy states every letter once, best first.",
        });
    }
    policy.letters.forEach(({ allows }, index) => {
        const order = allows.kinds.map((kind) => KIND_ORDER.get(kind) ?? -1);
        if (order.some((position, at) => at > 0 && position <= (order[at - 1] ?? -1))) {
            context.addIssue({
                code: "custom",
                path: ["letters", index, "allows", "kinds"],
                message: "A letter lists each kind it allows once, lightest first.",
            });
        }
        const next = policy.letters[index + 1]?.allows;
        if (next &&
            (allows.kinds.some((kind) => !next.kinds.includes(kind)) ||
                (next.most_steps !== null &&
                    (allows.most_steps === null || next.most_steps < allows.most_steps)) ||
                (allows.unavailable && !next.unavailable))) {
            context.addIssue({
                code: "custom",
                path: ["letters", index + 1, "allows"],
                message: "Each letter allows everything the better letter before it does.",
            });
        }
    });
    const last = policy.letters.at(-1)?.allows;
    if (!last ||
        last.kinds.length !== AGENT_READINESS_PERSON_STEP_KINDS.length ||
        last.most_steps !== null ||
        !last.unavailable) {
        context.addIssue({
            code: "custom",
            path: ["letters"],
            message: "The last letter allows every path, so every assessed path has a letter.",
        });
    }
});
export const agentReadinessPolicySchema = agentReadinessPolicyCoreSchema
    .safeExtend({ policy_digest: agentReadinessDigestSchema })
    .strict();
//# sourceMappingURL=grade-policy.js.map