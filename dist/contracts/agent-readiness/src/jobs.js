import { compareCanonicalStrings } from "provenry/primitives";
import { z } from "zod";
import { agentReadinessDigestSchema, agentReadinessScopeKeySchema } from "./shared.js";
/**
 * Sourcey's job library: the canonical job per service category, each with the
 * success assertions a run must satisfy and the class of safe invalid request
 * that must fail typed. A profile binds one service to one library job; a
 * binding maps each assertion to concrete checks, never the other way round,
 * so a service cannot choose an easier job than its category's.
 */
export const AGENT_READINESS_JOB_LIBRARY_CONTRACT = "sourcey.agent-readiness-job-library/v1alpha1";
const nameSchema = z.string().regex(/^[a-z][a-z0-9_]{0,63}$/u);
const statementSchema = z.string().trim().min(1).max(400);
const observationReferenceSchema = z
    .object({ assertion: nameSchema, observation: nameSchema })
    .strict();
const agentReadinessJobInputSchema = z.discriminatedUnion("kind", [
    /** The same value on every run, such as a Sourcey-controlled name to resolve. */
    z
        .object({
        kind: z.literal("fixed"),
        name: nameSchema,
        value: z.union([z.string().min(1).max(512), z.number().finite(), z.boolean()]),
    })
        .strict(),
    /** A fresh value per run, so a result cannot be replayed from an earlier one. */
    z.object({ kind: z.literal("nonce"), name: nameSchema }).strict(),
    /** An address Sourcey controls, where an outcome lands and is observed. */
    z
        .object({
        kind: z.literal("sink"),
        name: nameSchema,
        sink: z.enum(["email", "phone", "webhook"]),
    })
        .strict(),
]);
const agentReadinessJobAssertionSchema = z
    .object({
    name: nameSchema,
    statement: statementSchema,
    /** Executable Sourcey semantics, never selected or replaced by a binding. */
    proof: z.enum([
        "dns_answer",
        "dns_success",
        "model_selected",
        "stream_chunks",
        "tool_called",
        "resource_created",
        "resource_read_back",
        "message_accepted",
        "sink_received",
    ]),
})
    .strict();
const agentReadinessJobSchema = z
    .object({
    job_id: agentReadinessScopeKeySchema,
    category: agentReadinessScopeKeySchema,
    name: z.string().trim().min(1).max(120),
    statement: statementSchema,
    inputs: z.array(agentReadinessJobInputSchema).max(8),
    assertions: z.array(agentReadinessJobAssertionSchema).min(1).max(8),
    /** Evidence across assertions must come from the same physical call. */
    observation_links: z
        .array(z
        .object({
        from: observationReferenceSchema,
        to: observationReferenceSchema,
    })
        .strict())
        .max(16),
    error_probe: z.object({ statement: statementSchema }).strict(),
    /** A consequential job changes something and must clean it up; a billable one costs money. */
    effect: z.enum(["read", "consequential", "billable"]),
    cleanup: z.enum(["none", "required"]),
})
    .strict()
    .superRefine((job, context) => {
    unique(job.inputs.map(({ name }) => name), context, ["inputs"], "Job input names are unique.");
    unique(job.assertions.map(({ name }) => name), context, ["assertions"], "Job assertion names are unique.");
    const assertions = new Set(job.assertions.map(({ name }) => name));
    for (const link of job.observation_links) {
        if (!assertions.has(link.from.assertion) || !assertions.has(link.to.assertion)) {
            context.addIssue({
                code: "custom",
                path: ["observation_links"],
                message: "A link names assertions of this job.",
            });
        }
    }
    if ((job.effect === "consequential") !== (job.cleanup === "required")) {
        context.addIssue({
            code: "custom",
            path: ["cleanup"],
            message: "A consequential job, and only a consequential job, requires cleanup.",
        });
    }
});
export const agentReadinessJobLibraryCoreSchema = z
    .object({
    library_contract: z.literal(AGENT_READINESS_JOB_LIBRARY_CONTRACT),
    library_version: z.string().trim().min(1).max(80),
    /** One canonical job per category, ordered by job id. */
    jobs: z.array(agentReadinessJobSchema).min(1),
})
    .strict()
    .superRefine((library, context) => {
    const ids = library.jobs.map(({ job_id }) => job_id);
    if (ids.some((id, index) => index > 0 && compareCanonicalStrings(ids[index - 1], id) >= 0)) {
        context.addIssue({
            code: "custom",
            path: ["jobs"],
            message: "Library jobs are unique and ordered by job id.",
        });
    }
    unique(library.jobs.map(({ category }) => category), context, ["jobs"], "A category has one canonical job.");
});
export const agentReadinessJobLibrarySchema = agentReadinessJobLibraryCoreSchema
    .safeExtend({ library_digest: agentReadinessDigestSchema })
    .strict();
function unique(values, context, path, message) {
    if (new Set(values).size !== values.length)
        context.addIssue({ code: "custom", path, message });
}
//# sourceMappingURL=jobs.js.map