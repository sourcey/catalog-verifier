import { EXCHANGE_METHODS, verifyExchangeRecord, } from "provenry/exchange/records";
import { ACTOR_IDENTIFIER_PATTERN, compareInstants } from "provenry/primitives";
import { z } from "zod";
import { agentReadinessDigestSchema, agentReadinessEntityIdSchema, agentReadinessEvidenceLabelSchema, agentReadinessHandoffTimingSchema, agentReadinessInstantSchema, agentReadinessScopeKeySchema, agentReadinessStepOutcomeSchema, agentReadinessStepSchema, } from "./shared.js";
/**
 * One assessment run as evidence: what was discovered, every exchange made (by
 * its sealed exchange record and retained outcome), where each credential came
 * from, every human step a runner recorded, and whether each library assertion
 * held. Step outcomes and the letter are derived from run records by the
 * engine, so anyone holding the records re-derives the same rating.
 */
const AGENT_READINESS_RUN_CONTRACT = "sourcey.agent-readiness-run/v1alpha1";
const nameSchema = z.string().regex(/^[a-z][a-z0-9_]{0,63}$/u);
const reasonSchema = z.string().trim().min(1).max(300);
export const agentReadinessRunKindSchema = z.enum(["operate", "onboard", "operate_onboard"]);
/** The most descriptor retrievals, and the most facts, one run records. */
export const AGENT_READINESS_DISCOVERY_LIMIT = 64;
/** An agent-facing fact a descriptor on the service's domain states. */
export const agentReadinessDiscoveryFactSchema = z
    .object({
    fact: z.enum([
        "mcp_endpoint",
        "openapi_server",
        "oauth_protected_resource",
        "oauth_authorization_server",
        "ard_entry",
        "api_catalog_link",
        "agent_registration",
        /** An llms.txt overview written for agents. */
        "agent_documentation",
        /** A skill an agent-skills index publishes. */
        "agent_skill",
        "payment_manifest",
        /** A descriptor was found in a version or shape no adapter reads. */
        "unsupported_descriptor",
    ]),
    /** The URL the descriptor names. */
    value: z.url({ protocol: /^https$/u }),
    descriptor_url: z.url({ protocol: /^https$/u }),
    /** The Provenry capture attempt that retrieved the descriptor. */
    attempt_digest: agentReadinessDigestSchema,
    adapter: z
        .object({ namespace: z.string().min(1).max(160), version: z.string().min(1).max(80) })
        .strict(),
})
    .strict();
export const agentReadinessRunExchangeSchema = z
    .object({
    purpose: z.enum([
        "delegation",
        "job",
        "error_probe",
        "sustain_rotation",
        "sustain_revocation",
        "sustain_baseline",
        "sustain_rotated_probe",
        "sustain_revoked_probe",
        "sustain_control_probe",
        "cleanup",
    ]),
    call_id: agentReadinessScopeKeySchema,
    /** The request itself, or an MCP session's opening, tool listing or close. */
    role: z.enum(["request", "session_opening", "tool_listing", "session_close"]),
    /** The sealed record of what was sent and what came back; never a secret. */
    record: z.custom((value) => {
        try {
            verifyExchangeRecord(value);
            return true;
        }
        catch {
            return false;
        }
    }, "Expected a sealed exchange record."),
    /** The retained outcome (readable body and anything custody kept), held privately. */
    outcome_digest: agentReadinessDigestSchema,
})
    .strict();
export const agentReadinessCredentialSourceSchema = z
    .object({
    role: nameSchema,
    handle_digest: agentReadinessDigestSchema,
    source: z.discriminatedUnion("kind", [
        z.object({ kind: z.literal("entered") }).strict(),
        z
            .object({
            kind: z.literal("issued"),
            exchange_digest: agentReadinessDigestSchema,
            pointer: z.string().max(256),
        })
            .strict(),
    ]),
})
    .strict();
/** A human step a runner recorded as it happened. */
export const agentReadinessHandoffSchema = z
    .object({
    step: agentReadinessStepSchema,
    kind: z.enum(["approval", "workaround"]),
    timing: agentReadinessHandoffTimingSchema,
    statement: reasonSchema,
    recorded_by: z.string().max(128).regex(ACTOR_IDENTIFIER_PATTERN),
    recorded_at: agentReadinessInstantSchema,
})
    .strict();
export const agentReadinessAssertionResultSchema = z
    .object({
    assertion: nameSchema,
    holds: z.boolean(),
    /** The first check that did not hold, and why. */
    failure: z
        .object({ check: z.number().int().nonnegative(), reason: reasonSchema })
        .strict()
        .nullable(),
})
    .strict()
    .refine((result) => result.holds === (result.failure === null), {
    message: "An assertion that holds has no failure, and one that fails names it.",
});
/** A runner-side failure: never a fact about the service, always residue to retry. */
export const agentReadinessRunResidueSchema = z
    .object({ step: agentReadinessStepSchema, reason: reasonSchema })
    .strict();
export const agentReadinessRunRecordCoreSchema = z
    .object({
    run_contract: z.literal(AGENT_READINESS_RUN_CONTRACT),
    entity_id: agentReadinessEntityIdSchema,
    product_key: agentReadinessScopeKeySchema,
    job_id: agentReadinessScopeKeySchema,
    run_kind: agentReadinessRunKindSchema,
    /** `probed` exactly when the run made no exchange: discovery alone, which earns no letter. */
    label: agentReadinessEvidenceLabelSchema,
    engine: z
        .object({
        name: z.string().min(1).max(80),
        version: z.string().min(1).max(80),
        engine_digest: agentReadinessDigestSchema,
    })
        .strict(),
    /** The exact library job this run performed. */
    job_digest: agentReadinessDigestSchema,
    declaration_revision_digest: agentReadinessDigestSchema,
    /** Null for a listing with no binding yet: the run only probed the service. */
    binding_id: agentReadinessScopeKeySchema.nullable(),
    binding_digest: agentReadinessDigestSchema.nullable(),
    /** The fresh value this run's inputs and assertions carry. */
    nonce: z.string().regex(/^[0-9a-f]{32}$/u),
    started_at: agentReadinessInstantSchema,
    finished_at: agentReadinessInstantSchema,
    discovery: z
        .object({
        /** Every descriptor retrieval attempted, found or not, by its capture attempt digest. */
        attempts: z.array(agentReadinessDigestSchema).max(AGENT_READINESS_DISCOVERY_LIMIT),
        facts: z.array(agentReadinessDiscoveryFactSchema).max(AGENT_READINESS_DISCOVERY_LIMIT),
    })
        .strict(),
    exchanges: z.array(agentReadinessRunExchangeSchema).max(64),
    /** Every credential the run held or was issued, in the order it came to hold them. */
    credentials: z.array(agentReadinessCredentialSourceSchema).max(16),
    handoffs: z.array(agentReadinessHandoffSchema).max(16),
    /** Empty when the job's calls did not all complete. */
    assertions: z.array(agentReadinessAssertionResultSchema).max(8),
    error_probe: z.object({ typed: z.boolean(), reason: reasonSchema }).strict().nullable(),
    residue: z.array(agentReadinessRunResidueSchema).max(16),
})
    .strict()
    .superRefine((run, context) => {
    if (compareInstants(run.finished_at, run.started_at) < 0) {
        context.addIssue({
            code: "custom",
            path: ["finished_at"],
            message: "A run cannot finish before it starts.",
        });
    }
    const assertions = run.assertions.map(({ assertion }) => assertion);
    if (new Set(assertions).size !== assertions.length) {
        context.addIssue({
            code: "custom",
            path: ["assertions"],
            message: "A run reports each assertion once.",
        });
    }
    if ((run.binding_id === null) !== (run.binding_digest === null)) {
        context.addIssue({
            code: "custom",
            path: ["binding_digest"],
            message: "A run names its binding and its digest together, or neither.",
        });
    }
    if (run.binding_id === null && (run.exchanges.length > 0 || run.handoffs.length > 0)) {
        context.addIssue({
            code: "custom",
            path: ["binding_id"],
            message: "A run with no binding only probes: no exchange and no handoff.",
        });
    }
    if ((run.label === "probed") !== (run.exchanges.length === 0)) {
        context.addIssue({
            code: "custom",
            path: ["label"],
            message: "A run is probed exactly when it made no exchange.",
        });
    }
    const handles = run.credentials.map(({ handle_digest }) => handle_digest);
    if (new Set(handles).size !== handles.length) {
        context.addIssue({
            code: "custom",
            path: ["credentials"],
            message: "A run lists each credential it held once.",
        });
    }
});
export const agentReadinessRunRecordSchema = agentReadinessRunRecordCoreSchema
    .safeExtend({ run_digest: agentReadinessDigestSchema })
    .strict();
/**
 * The latest run as a card shows it: how many descriptors it read, every
 * request it sent and what came back (status, type, size and digest, never the
 * body), and what held. Compiled from the run record, so it is checked with it.
 */
export const agentReadinessRunSummarySchema = z
    .object({
    started_at: agentReadinessInstantSchema,
    finished_at: agentReadinessInstantSchema,
    discovery_reads: z.number().int().nonnegative().max(64),
    exchanges: z
        .array(z
        .object({
        purpose: agentReadinessRunExchangeSchema.shape.purpose,
        role: agentReadinessRunExchangeSchema.shape.role,
        method: z.enum(EXCHANGE_METHODS),
        url: z.url(),
        started_at: agentReadinessInstantSchema,
        finished_at: agentReadinessInstantSchema,
        /** Null when the request never got an answer. */
        response: z
            .object({
            status: z.number().int().min(100).max(999),
            media_type: z.string().min(1).max(256),
            content_bytes: z.number().int().nonnegative(),
            content_digest: agentReadinessDigestSchema,
        })
            .strict()
            .nullable(),
        /** Why no answer came, when none did. */
        transport_error: z.string().min(1).max(40).nullable(),
        exchange_digest: agentReadinessDigestSchema,
    })
        .strict()
        .refine((exchange) => (exchange.response === null) !== (exchange.transport_error === null), {
        message: "An exchange either responded or failed in transport.",
    }))
        .max(64),
    assertions: z.array(agentReadinessAssertionResultSchema).max(8),
    error_probe: agentReadinessRunRecordCoreSchema.shape.error_probe,
})
    .strict();
/** What a step outcome rests on: entries of a run record, by reference. */
export const agentReadinessStepEvidenceSchema = z.discriminatedUnion("kind", [
    z
        .object({
        kind: z.literal("exchange"),
        run_digest: agentReadinessDigestSchema,
        exchange_digest: agentReadinessDigestSchema,
    })
        .strict(),
    z
        .object({
        kind: z.literal("discovery"),
        run_digest: agentReadinessDigestSchema,
        attempt_digest: agentReadinessDigestSchema,
    })
        .strict(),
    z
        .object({
        kind: z.literal("handoff"),
        run_digest: agentReadinessDigestSchema,
        handoff: z.number().int().nonnegative(),
    })
        .strict(),
    z
        .object({
        kind: z.literal("credential"),
        run_digest: agentReadinessDigestSchema,
        handle_digest: agentReadinessDigestSchema,
    })
        .strict(),
]);
export const agentReadinessStepResultSchema = z
    .object({
    step: agentReadinessStepSchema,
    outcome: agentReadinessStepOutcomeSchema,
    /** Set for a human step (`approval`, `workaround`), never otherwise. */
    timing: agentReadinessHandoffTimingSchema.nullable(),
    evidence: z.array(agentReadinessStepEvidenceSchema).max(32),
})
    .strict()
    .superRefine((step, context) => {
    const human = step.outcome === "approval" || step.outcome === "workaround";
    if (human !== (step.timing !== null)) {
        context.addIssue({
            code: "custom",
            path: ["timing"],
            message: "A human step, and only a human step, is setup or recurring.",
        });
    }
    if ((step.outcome === "not_assessed") !== (step.evidence.length === 0)) {
        context.addIssue({
            code: "custom",
            path: ["evidence"],
            message: "Every assessed step rests on evidence; a step not assessed has none.",
        });
    }
});
//# sourceMappingURL=run.js.map