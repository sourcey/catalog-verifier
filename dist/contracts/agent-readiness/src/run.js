import { EXCHANGE_METHODS, verifyExchangeRecord, } from "provenry/exchange/records";
import { compareInstants } from "provenry/primitives";
import { z } from "zod";
import { AGENT_READINESS_MAXIMUM_ACCOUNT_OPERATIONS, AGENT_READINESS_MAXIMUM_PAGES, AGENT_READINESS_MAXIMUM_REFERENCED_DOCUMENTS, AGENT_READINESS_PAGE_ROLES, AGENT_READINESS_PERSON_STEPS, agentReadinessDigestSchema, agentReadinessEntityIdSchema, agentReadinessEvidenceLabelSchema, agentReadinessHostnameSchema, agentReadinessHumanStepTimingSchema, agentReadinessInstantSchema, agentReadinessJobOutcomeSchema, agentReadinessPersonStepKey, agentReadinessScopeKeySchema, agentReadinessStepOutcomeSchema, agentReadinessStepSchema, } from "./shared.js";
/**
 * One assessment run as evidence: what was discovered, every exchange made (by
 * its sealed exchange record and retained outcome), and what was read from the
 * answers and the vendor's specs. A probe run sends the declared job
 * operations with no authority and records how each answered; a verified run
 * performs a binding and records where each credential came from and whether
 * each library assertion held. Step outcomes and the letter are derived from
 * run records by the engine, so anyone holding the records re-derives the same
 * rating.
 */
const AGENT_READINESS_RUN_CONTRACT = "sourcey.agent-readiness-run/v1alpha1";
const nameSchema = z.string().regex(/^[a-z][a-z0-9_]{0,63}$/u);
const reasonSchema = z.string().trim().min(1).max(300);
/**
 * The most descriptor retrievals, and the most facts, one run records: above
 * every listing's plan (the largest, 55 well-known reads on its domains and job
 * endpoints, reaches about 120 with every follow, route hop and skill).
 */
export const AGENT_READINESS_DISCOVERY_LIMIT = 128;
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
        /** A document written for agents: an llms.txt overview, or auth.md. */
        "agent_documentation",
        /** A skill an agent-skills index publishes, its artifact matching the digest the index states. */
        "agent_skill",
        "payment_manifest",
        /**
         * An origin a document written for agents names (north star §6.1): an
         * llms.txt root or a document it links to, auth.md, or the interface's
         * documentation served as markdown on request.
         */
        "documentation_route",
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
/**
 * What a probe run's exchanges are for (north star §5.3): the job operation
 * itself, the malformed request after a success, the authority chain an
 * answer points to (RFC 9728 metadata, the authorization server's metadata, a
 * dynamic client registration, the authorization request), and the pages the
 * listing names for a person's or a vendor's step.
 */
export const AGENT_READINESS_PROBE_PURPOSES = [
    "probe_operation",
    "probe_malformed",
    "probe_resource_metadata",
    "probe_authorization_server",
    "probe_client_registration",
    "probe_authorization",
    "probe_page",
];
/** A verified run's exchanges: the binding's delegation, job and cleanup. */
const AGENT_READINESS_BINDING_PURPOSES = ["delegation", "job", "cleanup"];
export const agentReadinessRunExchangeSchema = z
    .object({
    purpose: z.enum([...AGENT_READINESS_BINDING_PURPOSES, ...AGENT_READINESS_PROBE_PURPOSES]),
    /**
     * The binding's call; for a probe, the job operation it belongs to, or the
     * declared endpoint or resource a page request reads.
     */
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
/** How a request answered a probe with no authority (north star §5.4). */
export const agentReadinessProbeAnswerSchema = z.enum([
    /** A 2xx API answer carrying no error member. */
    "success",
    /** A 402 with a valid x402 or MPP offer. */
    "offer",
    /** A 401, or a 403 API answer: the operation needs authority it was not given. */
    "authority",
    /** Any other non-5xx API answer, a JSON-RPC or tool error included. */
    "error",
    /** HTML, plain text, an empty body or a redirect: not an API. */
    "page",
    /** A transport failure, a timeout, 429 or 5xx: residue to retry. */
    "unanswered",
]);
const answerReadingSchema = z
    .object({
    answer: agentReadinessProbeAnswerSchema,
    /** For a refusal (offer, authority, error): whether it carried a machine-readable reason. */
    typed: z.boolean().nullable(),
})
    .strict()
    .superRefine((reading, context) => {
    const refusal = ["offer", "authority", "error"].includes(reading.answer);
    if (refusal !== (reading.typed !== null)) {
        context.addIssue({
            code: "custom",
            path: ["typed"],
            message: "A refusal, and only a refusal, is typed or untyped.",
        });
    }
    if ((reading.answer === "offer" || reading.answer === "error") && reading.typed === false) {
        context.addIssue({
            code: "custom",
            path: ["typed"],
            message: "An offer or an error is an API answer, so it is typed.",
        });
    }
});
/** The security an OpenAPI operation requires, by kind: none, a key or token, or OAuth. */
export const agentReadinessSpecSecuritySchema = z.enum(["none", "key", "oauth"]);
/**
 * What the vendor's OpenAPI document states for the job's operation (north
 * star §5.6), as the probe read it; null fields when the document was not an
 * OpenAPI 3 document.
 */
export const agentReadinessSpecReadingSchema = z
    .object({
    url: z.url({ protocol: /^https$/u }),
    /** The capture attempt that retrieved the document. */
    attempt_digest: agentReadinessDigestSchema,
    /** Read; absent (an error status, or not an OpenAPI 3 document); or unanswered (residue). */
    fetched: z.enum(["read", "absent", "unanswered"]),
    /**
     * The documents on the spec's host its references reached for this
     * reading, in the order they were read (north star §5.6): read, absent (an
     * error status, or not JSON or YAML) or unanswered (residue). Named only
     * when the reading reached one, so every earlier run's record reads as it
     * was written.
     */
    references: z
        .array(z
        .object({
        url: z.url({ protocol: /^https$/u }),
        attempt_digest: agentReadinessDigestSchema,
        fetched: z.enum(["read", "absent", "unanswered"]),
    })
        .strict())
        .min(1)
        .max(AGENT_READINESS_MAXIMUM_REFERENCED_DOCUMENTS)
        .optional(),
    /** The document is OpenAPI 3 and has the job's method under a matching path template. */
    covers: z.boolean(),
    /** The kinds of security the operation accepts; empty when it does not cover the job. */
    security: z.array(agentReadinessSpecSecuritySchema).max(3),
    /** The operation declares a 4xx response with a JSON or XML schema. */
    typed_errors: z.boolean(),
    /**
     * The operation declares a machine payment: `x-payment-info`, or a 402
     * response with a `WWW-Authenticate` challenge (MPP).
     */
    payment: z.boolean(),
    /** The document covers the key operations the listing names. */
    key_operations: z.boolean(),
})
    .strict()
    .superRefine((reading, context) => {
    if (reading.covers && reading.fetched !== "read") {
        context.addIssue({
            code: "custom",
            path: ["covers"],
            message: "Only a document that was read can cover the job.",
        });
    }
    if (!reading.covers &&
        (reading.security.length > 0 || reading.typed_errors || reading.payment)) {
        context.addIssue({
            code: "custom",
            path: ["covers"],
            message: "Only a document that covers the job states its operation.",
        });
    }
});
/**
 * What the probe read for one job operation. Everything else the path needs
 * (statuses, challenges, the authorization request's outcome) is in the
 * exchange records themselves. A spec operation sends nothing: its answer is
 * null and its steps rest on its spec reading.
 */
export const agentReadinessOperationProbeSchema = z
    .object({
    operation_id: agentReadinessScopeKeySchema,
    /** The job's request, or for an MCP server the job tool's call; null for a spec operation. */
    request: answerReadingSchema.nullable(),
    /**
     * For an MCP server that listed its tools without authority, whether the
     * job's tool was among them (every page read); null otherwise, or when
     * more pages remained than the probe reads.
     */
    tool_listed: z.boolean().nullable(),
    /** The offer a 402 made, validated by its protocol's shape. */
    offer: z
        .object({ protocol: z.enum(["x402", "mpp"]), version: z.string().min(1).max(40) })
        .strict()
        .nullable(),
    /**
     * What the authority chain's metadata stated, when an authority answer, or
     * an error before authority, led to it (north star §5.5).
     */
    authority: z
        .object({
        authorization_server: z.url({ protocol: /^https$/u }),
        /**
         * The server's auth.md registration (`agent_auth`): `agent` when it
         * registers an agent with no person (`anonymous`), `claimable` when a
         * person claims what the agent made later (an `anonymous` registration
         * with a `claim_endpoint`) or confirms the registration once; null when
         * it has none.
         */
        registration: z.enum(["agent", "claimable"]).nullable(),
        /** How the agent identified itself as an OAuth client, or null when it could not. */
        client: z.enum(["metadata_document", "dynamic_registration"]).nullable(),
        /** The server offers a renewal grant: refresh, or with auth.md the JWT-bearer grant. */
        renewal: z.boolean(),
        /** The server names a revocation endpoint. */
        revocation: z.boolean(),
    })
        .strict()
        .nullable(),
    /** The malformed request sent after a success. */
    malformed: answerReadingSchema.nullable(),
    /** The vendor's OpenAPI document the operation names. */
    spec: agentReadinessSpecReadingSchema.nullable(),
})
    .strict()
    .superRefine((probe, context) => {
    const answer = probe.request?.answer ?? null;
    if ((answer === "offer") !== (probe.offer !== null)) {
        context.addIssue({
            code: "custom",
            path: ["offer"],
            message: "An offer answer, and only one, carries its offer.",
        });
    }
    if (probe.authority !== null && answer !== "authority" && answer !== "error") {
        context.addIssue({
            code: "custom",
            path: ["authority"],
            message: "Only an authority answer, or an error before authority, leads to an authority chain.",
        });
    }
    if (probe.tool_listed !== null && answer === null) {
        context.addIssue({
            code: "custom",
            path: ["tool_listed"],
            message: "Only an MCP server's probe lists tools.",
        });
    }
    if (probe.malformed !== null && answer !== "success") {
        context.addIssue({
            code: "custom",
            path: ["malformed"],
            message: "Only a success is followed by the malformed request.",
        });
    }
    if (probe.request === null && probe.spec === null) {
        context.addIssue({
            code: "custom",
            path: ["spec"],
            message: "A spec operation rests on its spec reading.",
        });
    }
});
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
/**
 * A page the listing names for a person's or a vendor's step, as the probe
 * requested it (north star §5.3): its sign-up or registration endpoint, its
 * sales or approval page, an access setting, a claim page, its checkout or
 * top-up page, a key renewal page.
 */
export const agentReadinessPageProbeSchema = z
    .object({
    /** The declared endpoint or resource. */
    page_id: agentReadinessScopeKeySchema,
    role: z.enum(AGENT_READINESS_PAGE_ROLES),
    answer: agentReadinessProbeAnswerSchema,
    /** The page is there: answered with anything but 404 or 410 (gone). */
    found: z.boolean(),
})
    .strict()
    .refine((page) => !(page.found && page.answer === "unanswered"), {
    message: "An unanswered page is not found.",
});
/**
 * What the probe read for one account operation: the vendor's spec alone,
 * since nothing is sent to a sign-up or a top-up (north star §5.6).
 */
export const agentReadinessAccountReadingSchema = z
    .object({
    operation_id: agentReadinessScopeKeySchema,
    spec: agentReadinessSpecReadingSchema,
})
    .strict();
/** A runner-side failure: never a fact about the service, always residue to retry. */
export const agentReadinessRunResidueSchema = z
    .object({ step: z.union([agentReadinessStepSchema, z.literal("job")]), reason: reasonSchema })
    .strict();
export const agentReadinessRunRecordCoreSchema = z
    .object({
    run_contract: z.literal(AGENT_READINESS_RUN_CONTRACT),
    entity_id: agentReadinessEntityIdSchema,
    product_key: agentReadinessScopeKeySchema,
    job_id: agentReadinessScopeKeySchema,
    /** `probed` exactly when the run has no binding: the probe suite, with no authority. */
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
    /** Null for a probe run; a verified run names the binding it performed. */
    binding_id: agentReadinessScopeKeySchema.nullable(),
    binding_digest: agentReadinessDigestSchema.nullable(),
    /** The fresh value this run's inputs and assertions carry. */
    nonce: z.string().regex(/^[0-9a-f]{32}$/u),
    started_at: agentReadinessInstantSchema,
    finished_at: agentReadinessInstantSchema,
    discovery: z
        .object({
        /** The Entity's domains discovery read as the vendor's own; their subdomains are too. */
        domains: z.array(agentReadinessHostnameSchema).max(16),
        /** Every descriptor retrieval attempted, found or not, by its capture attempt digest. */
        attempts: z.array(agentReadinessDigestSchema).max(AGENT_READINESS_DISCOVERY_LIMIT),
        /**
         * The URLs whose reads went unanswered: residue, never the descriptor's
         * absence, until a later probe reproduces it (north star §5.4).
         */
        unanswered: z.array(z.url({ protocol: /^https$/u })).max(AGENT_READINESS_DISCOVERY_LIMIT),
        facts: z.array(agentReadinessDiscoveryFactSchema).max(AGENT_READINESS_DISCOVERY_LIMIT),
    })
        .strict(),
    /** At most a probe run's allowance of 80, or a binding run's 64. */
    exchanges: z.array(agentReadinessRunExchangeSchema).max(96),
    /** Every credential the run held or was issued, in the order it came to hold them. */
    credentials: z.array(agentReadinessCredentialSourceSchema).max(16),
    /** A probe run's reading of each job operation it sent; empty for a verified run. */
    probes: z.array(agentReadinessOperationProbeSchema).max(4),
    /** A probe run's requests for the pages its listing names; empty for a verified run. */
    pages: z.array(agentReadinessPageProbeSchema).max(AGENT_READINESS_MAXIMUM_PAGES),
    /**
     * A probe run's reading of each account operation its listing declares,
     * from the vendor's spec alone. Named only when the listing declares one,
     * so every earlier run's record reads as it was written.
     */
    accounts: z
        .array(agentReadinessAccountReadingSchema)
        .min(1)
        .max(AGENT_READINESS_MAXIMUM_ACCOUNT_OPERATIONS)
        .optional(),
    /** Empty when the job's calls did not all complete. */
    assertions: z.array(agentReadinessAssertionResultSchema).max(8),
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
    const probe = run.binding_id === null;
    if (probe !== (run.label === "probed")) {
        context.addIssue({
            code: "custom",
            path: ["label"],
            message: "A run is probed exactly when it performs no binding.",
        });
    }
    const probePurpose = (purpose) => AGENT_READINESS_PROBE_PURPOSES.includes(purpose);
    if (run.exchanges.some(({ purpose }) => probePurpose(purpose) !== probe)) {
        context.addIssue({
            code: "custom",
            path: ["exchanges"],
            message: "A probe run makes only probe exchanges, and a verified run none.",
        });
    }
    if (probe && (run.credentials.length > 0 || run.assertions.length > 0)) {
        context.addIssue({
            code: "custom",
            path: ["credentials"],
            message: "A probe run holds no credential and checks no assertion.",
        });
    }
    if (!probe && (run.probes.length > 0 || run.pages.length > 0 || run.accounts)) {
        context.addIssue({
            code: "custom",
            path: ["probes"],
            message: "Only a probe run reads job operations, pages and account operations.",
        });
    }
    const pages = run.pages.map(({ page_id, role }) => `${page_id} ${role}`);
    if (new Set(pages).size !== pages.length) {
        context.addIssue({
            code: "custom",
            path: ["pages"],
            message: "A probe run requests each page once.",
        });
    }
    if (run.discovery.unanswered.length > run.discovery.attempts.length) {
        context.addIssue({
            code: "custom",
            path: ["discovery", "unanswered"],
            message: "Each unanswered read is one of discovery's attempts.",
        });
    }
    const operations = run.probes.map(({ operation_id }) => operation_id);
    if (new Set(operations).size !== operations.length) {
        context.addIssue({
            code: "custom",
            path: ["probes"],
            message: "A probe run reads each job operation once.",
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
 * The steps state what a probe run's answers established.
 */
export const agentReadinessRunSummarySchema = z
    .object({
    started_at: agentReadinessInstantSchema,
    finished_at: agentReadinessInstantSchema,
    discovery_reads: z.number().int().nonnegative().max(AGENT_READINESS_DISCOVERY_LIMIT),
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
        .max(96),
    assertions: z.array(agentReadinessAssertionResultSchema).max(8),
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
        kind: z.literal("credential"),
        run_digest: agentReadinessDigestSchema,
        handle_digest: agentReadinessDigestSchema,
    })
        .strict(),
    /**
     * The run's declaration revision itself: it declares no interface that
     * performs the job, or rules out a checkout.
     */
    z
        .object({
        kind: z.literal("declaration"),
        run_digest: agentReadinessDigestSchema,
    })
        .strict(),
]);
const AGENT_READINESS_PERSON_STEP_KEYS = new Set(AGENT_READINESS_PERSON_STEPS.map(agentReadinessPersonStepKey));
export const agentReadinessStepResultSchema = z
    .object({
    step: agentReadinessStepSchema,
    outcome: agentReadinessStepOutcomeSchema,
    /** Set for a human step (`approval`, `workaround`), never otherwise. */
    timing: agentReadinessHumanStepTimingSchema.nullable(),
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
    if (step.outcome !== "machine" &&
        step.outcome !== "not_applicable" &&
        step.outcome !== "not_assessed" &&
        !AGENT_READINESS_PERSON_STEP_KEYS.has(agentReadinessPersonStepKey(step))) {
        context.addIssue({
            code: "custom",
            path: ["outcome"],
            message: "A step holds only a person-step the scale names for it (north star §5.7).",
        });
    }
});
/** The job's outcome (north star §5.6, the job), beside the steps, with what it rests on. */
export const agentReadinessJobResultSchema = z
    .object({
    outcome: agentReadinessJobOutcomeSchema,
    evidence: z.array(agentReadinessStepEvidenceSchema).max(32),
})
    .strict()
    .refine((job) => (job.outcome === "not_assessed") === (job.evidence.length === 0), {
    message: "An assessed job rests on evidence; a job not assessed has none.",
});
//# sourceMappingURL=run.js.map