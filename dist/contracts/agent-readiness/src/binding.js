import { EXCHANGE_METHODS, FORM_MEDIA_TYPE, HEADER_NAME_PATTERN } from "provenry/exchange/records";
import { canonicalJson } from "provenry/primitives";
import { z } from "zod";
import { agentReadinessScopeKeySchema } from "./shared.js";
/**
 * How one interface performs one library job: the exact calls, locations of
 * observations consumed by Sourcey's assertions, the safe invalid request that must fail
 * typed, and how authority, payment and credential upkeep work. A binding says
 * where and how; the job library says what success is. Origins are literal, so
 * a binding can never send a credential anywhere its declared endpoints do not
 * name.
 *
 * Templates substitute only `{{input.<name>}}`, `{{run.nonce}}`,
 * `{{sink.<name>}}` and `{{call.<call id><json pointer>}}` (an earlier call's
 * JSON response). A JSON string that is exactly one placeholder keeps the
 * referenced value's type; anywhere else a placeholder interpolates a scalar.
 */
const PLACEHOLDER = /\{\{(input\.[a-z][a-z0-9_]*|run\.nonce|sink\.[a-z][a-z0-9_]*|call\.[a-z0-9]+(?:-[a-z0-9]+)*(?:\/(?:[^~/{}]|~[01])*)+)\}\}/gu;
const JSON_POINTER = /^(?:\/(?:[^~/]|~[01])*)*$/u;
/** The references a template makes, or null when any `{{` is not a valid placeholder. */
export function agentReadinessTemplateReferences(template) {
    const references = [];
    const residue = template.replaceAll(PLACEHOLDER, (_match, body) => {
        if (body === "run.nonce")
            references.push({ kind: "nonce" });
        else if (body.startsWith("input."))
            references.push({ kind: "input", name: body.slice(6) });
        else if (body.startsWith("sink."))
            references.push({ kind: "sink", name: body.slice(5) });
        else {
            const rest = body.slice(5);
            const slash = rest.indexOf("/");
            references.push({ kind: "call", callId: rest.slice(0, slash), pointer: rest.slice(slash) });
        }
        return "";
    });
    return residue.includes("{{") || residue.includes("}}") ? null : references;
}
/** Every template string in a JSON template value. */
export function agentReadinessJsonTemplates(value) {
    if (typeof value === "string")
        return [value];
    if (Array.isArray(value))
        return value.flatMap(agentReadinessJsonTemplates);
    if (value !== null && typeof value === "object") {
        return Object.values(value).flatMap(agentReadinessJsonTemplates);
    }
    return [];
}
const templateSchema = (maximum) => z
    .string()
    .max(maximum)
    .refine((value) => agentReadinessTemplateReferences(value) !== null, "Invalid template.");
const nameSchema = z.string().regex(/^[a-z][a-z0-9_]{0,63}$/u);
const pointerSchema = z.string().max(256).regex(JSON_POINTER);
const callIdSchema = agentReadinessScopeKeySchema;
const methodsSchema = z.array(z.enum(EXCHANGE_METHODS)).min(1);
/** Headers a binding never sets: the transport and custody own them. */
const RESERVED_HEADERS = new Set([
    "accept-encoding",
    "authorization",
    "connection",
    "content-length",
    "content-type",
    "cookie",
    "host",
    "proxy-authorization",
    "transfer-encoding",
    "user-agent",
]);
const httpBodySchema = z.discriminatedUnion("media_type", [
    z.object({ media_type: z.literal("application/json"), json: z.json() }).strict(),
    z
        .object({
        media_type: z.literal(FORM_MEDIA_TYPE),
        form: z
            .array(z
            .object({
            name: z.string().regex(/^[A-Za-z0-9_.-]{1,64}$/u),
            value: templateSchema(2_048),
        })
            .strict())
            .max(32),
    })
        .strict(),
]);
const agentReadinessHttpCallSchema = z
    .object({
    kind: z.literal("http"),
    call_id: callIdSchema,
    /** The declared endpoint whose origin the URL must keep. */
    endpoint_id: agentReadinessScopeKeySchema,
    method: z.enum(EXCHANGE_METHODS),
    /** An HTTPS URL whose scheme and authority are literal; only path and query may substitute. */
    url: templateSchema(2_048).refine((value) => /^https:\/\/[^/{}?#\s]+(?:[/?]|$)/u.test(value), "A call URL has a literal HTTPS origin."),
    headers: z
        .array(z
        .object({
        name: z
            .string()
            .regex(HEADER_NAME_PATTERN)
            .refine((name) => !RESERVED_HEADERS.has(name), "This header is not a binding's."),
        value: templateSchema(512),
    })
        .strict())
        .max(16),
    body: httpBodySchema.nullable(),
    /** Credential roles the call carries; custody attaches each by its grant. */
    credentials: z.array(nameSchema).max(4),
})
    .strict()
    .superRefine((call, context) => {
    const names = call.headers.map(({ name }) => name);
    if (names.some((name, index) => index > 0 && names[index - 1] >= name)) {
        context.addIssue({
            code: "custom",
            path: ["headers"],
            message: "Call headers are unique and ordered by name.",
        });
    }
    if ((call.method === "GET" || call.method === "HEAD") && call.body !== null) {
        context.addIssue({ code: "custom", path: ["body"], message: "GET and HEAD carry no body." });
    }
    unique(call.credentials, context, ["credentials"], "A call names each credential once.");
});
const agentReadinessMcpCallSchema = z
    .object({
    kind: z.literal("mcp"),
    call_id: callIdSchema,
    /** The declared MCP endpoint; the session speaks whichever era the server does. */
    endpoint_id: agentReadinessScopeKeySchema,
    tool: z.string().min(1).max(128),
    arguments: z.json(),
    credentials: z.array(nameSchema).max(4),
})
    .strict()
    .superRefine((call, context) => {
    unique(call.credentials, context, ["credentials"], "A call names each credential once.");
});
const agentReadinessCallSchema = z.discriminatedUnion("kind", [
    agentReadinessHttpCallSchema,
    agentReadinessMcpCallSchema,
]);
/** A binding locates evidence; it cannot supply a predicate or expected value. */
const agentReadinessAssertionObservationSchema = z
    .object({
    name: nameSchema,
    call: callIdSchema,
    source: z.enum(["json", "stream"]),
    pointer: pointerSchema,
})
    .strict();
const placementSchema = z.union([
    z
        .object({ scheme: z.enum(["bearer", "basic"]), header_name: z.literal("authorization") })
        .strict(),
    z
        .object({
        scheme: z.literal("header"),
        header_name: z
            .string()
            .regex(HEADER_NAME_PATTERN)
            .refine((name) => name !== "authorization", "A header credential is not authorization."),
    })
        .strict(),
    z
        .object({ scheme: z.literal("form"), field: z.string().regex(/^[A-Za-z0-9_.-]{1,64}$/u) })
        .strict(),
]);
/** One credential the binding uses: its role, how it travels, and where it may go. */
const agentReadinessCredentialDeclarationSchema = z
    .object({
    role: nameSchema,
    placement: placementSchema,
    endpoint_ids: z.array(agentReadinessScopeKeySchema).min(1).max(8),
    methods: methodsSchema,
})
    .strict();
/** A credential a successful response issues, kept by custody under its role. */
const agentReadinessKeptCredentialSchema = agentReadinessCredentialDeclarationSchema
    .safeExtend({
    pointer: pointerSchema,
    expires_in_pointer: pointerSchema.optional(),
})
    .strict();
const issuingCall = {
    call: agentReadinessHttpCallSchema,
    keep: z.array(agentReadinessKeptCredentialSchema).min(1).max(4),
};
const agentReadinessDelegationSchema = z.discriminatedUnion("kind", [
    /** The job needs no authority. */
    z.object({ kind: z.literal("none") }).strict(),
    /** A person enters a credential the service issued, such as a key copied from a dashboard. */
    z
        .object({
        kind: z.literal("entered"),
        credentials: z.array(agentReadinessCredentialDeclarationSchema).min(1).max(4),
    })
        .strict(),
    /** The principal consents through OAuth, MCP authorization included; custody keeps the tokens. */
    z
        .object({
        kind: z.literal("oauth"),
        authorization_endpoint_id: agentReadinessScopeKeySchema,
        token_endpoint_id: agentReadinessScopeKeySchema,
        client: z.enum(["client_id_metadata_document", "dynamic_registration", "preregistered"]),
        scopes: z.array(z.string().regex(/^[\x21\x23-\x5B\x5D-\x7E]{1,128}$/u)).max(32),
        keep: z.array(agentReadinessKeptCredentialSchema).min(1).max(4),
    })
        .strict(),
    /** An entered credential mints the one the job uses, through the service's own API. */
    z
        .object({
        kind: z.literal("minted"),
        from: agentReadinessCredentialDeclarationSchema,
        ...issuingCall,
    })
        .strict(),
]);
const agentReadinessPaymentSchema = z.discriminatedUnion("kind", [
    /** The job costs nothing at the exercised use. */
    z.object({ kind: z.literal("none") }).strict(),
    /** The account holds a balance; a manual top-up is a recorded human step. */
    z.object({ kind: z.literal("prepaid_balance") }).strict(),
    /** The agent pays per call inside the exchange. */
    z.object({ kind: z.literal("per_call"), protocol: z.enum(["x402", "mpp"]) }).strict(),
]);
const agentReadinessSustainSchema = z
    .object({
    rotation: z.discriminatedUnion("kind", [
        z.object({ kind: z.literal("not_applicable") }).strict(),
        /** A refresh exchange issues the next credential. */
        z.object({ kind: z.literal("refresh"), ...issuingCall }).strict(),
        /** The service's API mints a replacement credential. */
        z.object({ kind: z.literal("mint"), ...issuingCall }).strict(),
        /** Only a person can rotate it; a run records that step. */
        z.object({ kind: z.literal("manual") }).strict(),
    ]),
    revocation: z.discriminatedUnion("kind", [
        z.object({ kind: z.literal("not_applicable") }).strict(),
        z.object({ kind: z.literal("call"), call: agentReadinessHttpCallSchema }).strict(),
        z.object({ kind: z.literal("manual") }).strict(),
    ]),
    /** Read-only effect witnesses; without them a 2xx establishes no upkeep. */
    verification: z
        .object({
        probe: agentReadinessHttpCallSchema.safeExtend({
            method: z.literal("GET"),
            body: z.null(),
            credentials: z.array(nameSchema).min(1).max(4),
        }),
        control: agentReadinessHttpCallSchema.safeExtend({
            method: z.literal("GET"),
            body: z.null(),
            credentials: z.array(nameSchema).min(1).max(4),
        }),
    })
        .strict()
        .optional(),
})
    .strict();
const agentReadinessErrorProbeSchema = z
    .object({
    call: agentReadinessCallSchema,
    expect: z.discriminatedUnion("kind", [
        /** A 4xx whose JSON body carries a machine-readable error at `error_pointer`. */
        z
            .object({
            kind: z.literal("http_error"),
            status_class: z.literal("4xx"),
            error_pointer: pointerSchema,
        })
            .strict(),
        /** A JSON-RPC error, or a tool result marked `isError`. */
        z.object({ kind: z.literal("mcp_error") }).strict(),
    ]),
})
    .strict();
export const agentReadinessJobBindingSchema = z
    .object({
    binding_id: agentReadinessScopeKeySchema,
    interface_id: agentReadinessScopeKeySchema,
    /** The job, in order; a call may use any earlier call's response. */
    calls: z.array(agentReadinessCallSchema).min(1).max(8),
    /** Exactly one entry per library assertion of the job. */
    assertions: z
        .array(z
        .object({
        assertion: nameSchema,
        observations: z.array(agentReadinessAssertionObservationSchema).max(8),
    })
        .strict())
        .min(1)
        .max(8),
    error_probe: agentReadinessErrorProbeSchema,
    delegation: agentReadinessDelegationSchema,
    payment: agentReadinessPaymentSchema,
    sustain: agentReadinessSustainSchema,
    /** What a consequential job's calls created, removed again; may use the job's responses. */
    cleanup: z.array(agentReadinessCallSchema).max(4),
})
    .strict()
    .superRefine(validateBinding);
/** Every call a binding can make, with the calls each may read. */
export function agentReadinessBindingCalls(binding) {
    const jobIds = binding.calls.map(({ call_id }) => call_id);
    const calls = [];
    if (binding.delegation.kind === "minted")
        calls.push({ call: binding.delegation.call, mayRead: [] });
    for (const [index, call] of binding.calls.entries()) {
        calls.push({ call, mayRead: jobIds.slice(0, index) });
    }
    calls.push({ call: binding.error_probe.call, mayRead: jobIds });
    const { rotation, revocation } = binding.sustain;
    if (rotation.kind === "refresh" || rotation.kind === "mint") {
        calls.push({ call: rotation.call, mayRead: [] });
    }
    if (revocation.kind === "call")
        calls.push({ call: revocation.call, mayRead: [] });
    if (binding.sustain.verification) {
        calls.push({ call: binding.sustain.verification.probe, mayRead: jobIds });
        calls.push({ call: binding.sustain.verification.control, mayRead: jobIds });
    }
    for (const call of binding.cleanup)
        calls.push({ call, mayRead: jobIds });
    return calls;
}
/** Credential roles the binding obtains, from delegation and any minting or rotation. */
function agentReadinessBindingRoles(binding) {
    const { delegation } = binding;
    const roles = delegation.kind === "none"
        ? []
        : delegation.kind === "entered"
            ? delegation.credentials.map(({ role }) => role)
            : delegation.kind === "oauth"
                ? delegation.keep.map(({ role }) => role)
                : [delegation.from.role, ...delegation.keep.map(({ role }) => role)];
    const rotation = binding.sustain.rotation;
    const rotated = rotation.kind === "refresh" || rotation.kind === "mint"
        ? rotation.keep.map(({ role }) => role)
        : [];
    return [...new Set([...roles, ...rotated])];
}
function validateBinding(binding, context) {
    const calls = agentReadinessBindingCalls(binding);
    unique(calls.map(({ call }) => call.call_id), context, ["calls"], "Call ids are unique across the binding.");
    const roles = new Set(agentReadinessBindingRoles(binding));
    for (const { call, mayRead } of calls) {
        for (const role of call.credentials) {
            if (!roles.has(role)) {
                context.addIssue({
                    code: "custom",
                    path: ["calls"],
                    message: `Call ${call.call_id} carries credential ${role}, which the binding never obtains.`,
                });
            }
        }
        const readable = new Set(mayRead);
        for (const template of callTemplates(call)) {
            const references = agentReadinessTemplateReferences(template);
            if (references === null) {
                context.addIssue({
                    code: "custom",
                    path: ["calls"],
                    message: `Call ${call.call_id} has an invalid template.`,
                });
            }
            for (const reference of references ?? []) {
                if (reference.kind === "call" && !readable.has(reference.callId)) {
                    context.addIssue({
                        code: "custom",
                        path: ["calls"],
                        message: `Call ${call.call_id} reads ${reference.callId}, which does not run before it.`,
                    });
                }
            }
        }
    }
    const jobCalls = new Map(binding.calls.map((call) => [call.call_id, call]));
    unique(binding.assertions.map(({ assertion }) => assertion), context, ["assertions"], "Each assertion is mapped once.");
    for (const [index, { observations }] of binding.assertions.entries()) {
        unique(observations.map(({ name }) => name), context, ["assertions", index], "Each assertion observation is located once.");
        for (const observation of observations) {
            const call = jobCalls.get(observation.call);
            if (!call) {
                context.addIssue({
                    code: "custom",
                    path: ["assertions", index],
                    message: `An observation reads ${observation.call}, which is not a job call.`,
                });
            }
            else if (observation.source === "stream" && call.kind !== "http") {
                context.addIssue({
                    code: "custom",
                    path: ["assertions", index],
                    message: "A streamed observation belongs to an HTTP event stream.",
                });
            }
        }
    }
    const probe = binding.error_probe;
    if ((probe.expect.kind === "mcp_error") !== (probe.call.kind === "mcp")) {
        context.addIssue({
            code: "custom",
            path: ["error_probe"],
            message: "An MCP probe expects an MCP error; an HTTP probe expects an HTTP error.",
        });
    }
    const credentialed = binding.delegation.kind !== "none";
    const { rotation, revocation } = binding.sustain;
    if ((rotation.kind === "not_applicable") === credentialed ||
        (revocation.kind === "not_applicable") === credentialed) {
        context.addIssue({
            code: "custom",
            path: ["sustain"],
            message: "Sustain is not applicable exactly when the job needs no credential.",
        });
    }
    const verification = binding.sustain.verification;
    if (verification) {
        const { probe, control } = verification;
        if (rotation.kind !== "refresh" && rotation.kind !== "mint" && revocation.kind !== "call") {
            context.addIssue({
                code: "custom",
                path: ["sustain", "verification"],
                message: "Upkeep witnesses require an executable maintenance operation.",
            });
        }
        if (probe.endpoint_id !== control.endpoint_id ||
            probe.url !== control.url ||
            canonicalJson(probe.headers) !== canonicalJson(control.headers) ||
            probe.credentials.some((role) => control.credentials.includes(role))) {
            context.addIssue({
                code: "custom",
                path: ["sustain", "verification"],
                message: "The control reads the same surface with independent authority.",
            });
        }
        if ((rotation.kind === "mint" || rotation.kind === "refresh") &&
            probe.credentials.some((role) => !rotation.keep.some((kept) => kept.role === role))) {
            context.addIssue({
                code: "custom",
                path: ["sustain", "verification"],
                message: "The probe uses the authority issued by rotation.",
            });
        }
    }
}
function callTemplates(call) {
    if (call.kind === "mcp")
        return agentReadinessJsonTemplates(call.arguments);
    return [
        call.url,
        ...call.headers.map(({ value }) => value),
        ...(call.body === null
            ? []
            : call.body.media_type === "application/json"
                ? agentReadinessJsonTemplates(call.body.json)
                : call.body.form.map(({ value }) => value)),
    ];
}
function unique(values, context, path, message) {
    if (new Set(values).size !== values.length)
        context.addIssue({ code: "custom", path, message });
}
//# sourceMappingURL=binding.js.map