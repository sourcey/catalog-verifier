import { compareCanonicalStrings } from "provenry/primitives";
import { z } from "zod";
import { agentReadinessDigestSchema, agentReadinessScopeKeySchema } from "./shared.js";
/**
 * Sourcey's job library: the canonical job per service category, each with the
 * success assertions a run must satisfy. A profile binds one service to one library job; a
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
        sink: z.enum(["email", "webhook"]),
    })
        .strict(),
    /**
     * A value whoever runs the job supplies for that run, such as the number a
     * text message goes to: Sourcey has no phone, so delivery is read from the
     * service's own status, never from a sink.
     */
    z.object({ kind: z.literal("supplied"), name: nameSchema }).strict(),
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
        "resource_found_by_query",
        "message_accepted",
        "message_delivered",
        "sink_received",
    ]),
})
    .strict();
export const agentReadinessJobSchema = z
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
/** The HTTP methods an observed call may use; a query may send its terms in a body. */
export const AGENT_READINESS_OBSERVED_CALL_METHODS = {
    read: ["GET", "HEAD"],
    write: ["POST", "PUT", "PATCH", "DELETE"],
    query: ["GET", "POST"],
};
/** Whether an observation may locate the operand from this source. */
export function agentReadinessOperandReads(operand, source) {
    return source === operand.source || (operand.callerNamed === true && source === "request");
}
/**
 * Portable Sourcey job semantics. A binding supplies locations only: never a
 * comparison value, predicate, threshold, verdict or executable callback.
 */
const PROOF_SIGNATURES = {
    dns_answer: {
        observations: [
            { name: "query_name", source: "json", method: "read" },
            { name: "records", source: "json", method: "read" },
        ],
        sameCall: [["query_name", "records"]],
    },
    dns_success: { observations: [{ name: "status", source: "json", method: "read" }] },
    model_selected: {
        observations: [
            { name: "models", source: "json", method: "read" },
            { name: "used_model", source: "stream", method: "write" },
        ],
        differentCall: [["models", "used_model"]],
    },
    stream_chunks: { observations: [{ name: "chunks", source: "stream", method: "write" }] },
    tool_called: {
        observations: [
            { name: "tool_name", source: "stream", method: "write" },
            { name: "tool_arguments", source: "stream", method: "write" },
        ],
        sameCall: [["tool_name", "tool_arguments"]],
    },
    resource_created: {
        observations: [{ name: "id", source: "json", method: "write", callerNamed: true }],
    },
    resource_read_back: {
        observations: [
            { name: "created_id", source: "json", method: "write", callerNamed: true },
            { name: "read_id", source: "json", method: "read" },
            { name: "content", source: "json", method: "read" },
        ],
        sameCall: [["read_id", "content"]],
        differentCall: [["created_id", "read_id"]],
    },
    resource_found_by_query: {
        observations: [
            { name: "created_id", source: "json", method: "write", callerNamed: true },
            { name: "query", source: "request", method: "query" },
            { name: "found_id", source: "json", method: "query" },
            { name: "content", source: "json", method: "query" },
        ],
        sameCall: [
            ["query", "found_id"],
            ["found_id", "content"],
        ],
        differentCall: [["created_id", "found_id"]],
        independentCall: [["query", "created_id"]],
    },
    /** A message's identifier is the service's: a caller never names it. */
    message_accepted: { observations: [{ name: "id", source: "json", method: "write" }] },
    message_delivered: {
        observations: [
            { name: "message_id", source: "json", method: "write" },
            { name: "read_id", source: "json", method: "read" },
            { name: "status", source: "json", method: "read" },
        ],
        sameCall: [["read_id", "status"]],
        differentCall: [["message_id", "read_id"]],
    },
    sink_received: { observations: [] },
};
export function agentReadinessProofSignature(proof) {
    return PROOF_SIGNATURES[proof];
}
function unique(values, context, path, message) {
    if (new Set(values).size !== values.length)
        context.addIssue({ code: "custom", path, message });
}
//# sourceMappingURL=jobs.js.map