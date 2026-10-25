import { EXCHANGE_METHODS, FORM_MEDIA_TYPE, HEADER_NAME_PATTERN } from "provenry/exchange/records";
import { z } from "zod";
import { AGENT_READINESS_OBSERVED_CALL_METHODS, agentReadinessOperandReads, agentReadinessProofSignature, } from "./jobs.js";
import { agentReadinessScopeKeySchema, agentReadinessUrlOrigin, valueAtPointer } from "./shared.js";
/**
 * How one interface performs one library job, for a verified run: the exact
 * calls, locations of observations consumed by Sourcey's assertions, and how
 * authority and payment work. A run is proof, not the grade (north star §5.6).
 * A binding says where and how; the job library says what success is. Sourcey runs a binding only where it needs no account; any
 * other is run by its account holder with their own credentials, which Sourcey
 * never holds. Origins are literal, so a binding can never send a credential
 * anywhere its declared endpoints do not name.
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
/**
 * What a request observation's pointer reads in what a call sends. For an HTTP
 * call, `/query` holds each URL query parameter by name and `/body` the JSON
 * body, each form field by name, or null; for an MCP call, `/arguments` holds
 * the tool's arguments. A name sent more than once holds its values in order.
 */
export function agentReadinessRequestDocument(request) {
    if ("arguments" in request)
        return { arguments: request.arguments };
    const { body } = request;
    return {
        query: byName(request.query),
        body: body === null ? null : "json" in body ? body.json : byName(body.form),
    };
}
/** A call's request document as its templates write it: the template each location sends. */
export function agentReadinessRequestTemplate(call) {
    if (call.kind === "mcp")
        return agentReadinessRequestDocument({ arguments: call.arguments });
    // A `?` or `#` inside a placeholder's pointer is not the URL's own.
    const masked = call.url.replaceAll(PLACEHOLDER, (placeholder) => " ".repeat(placeholder.length));
    const start = masked.indexOf("?");
    const end = masked.indexOf("#");
    return agentReadinessRequestDocument({
        query: start < 0
            ? []
            : [...new URLSearchParams(call.url.slice(start + 1, end < 0 ? undefined : end))],
        body: call.body === null
            ? null
            : call.body.media_type === "application/json"
                ? { json: call.body.json }
                : { form: call.body.form.map(({ name, value }) => [name, value]) },
    });
}
function byName(fields) {
    const named = new Map();
    for (const [name, value] of fields)
        named.set(name, [...(named.get(name) ?? []), value]);
    return Object.fromEntries([...named].map(([name, values]) => [
        name,
        values.length === 1 ? values[0] : values,
    ]));
}
const templateSchema = (maximum) => z
    .string()
    .max(maximum)
    .refine((value) => agentReadinessTemplateReferences(value) !== null, "Invalid template.");
const nameSchema = z.string().regex(/^[a-z][a-z0-9_]{0,63}$/u);
const pointerSchema = z.string().max(256).regex(JSON_POINTER);
const callIdSchema = agentReadinessScopeKeySchema;
const methodsSchema = z.array(z.enum(EXCHANGE_METHODS)).min(1);
/** Headers a binding or a job operation never sets: the transport and the runner's custody do. */
export const AGENT_READINESS_RESERVED_HEADERS = new Set([
    "accept-encoding",
    "authorization",
    "connection",
    "content-length",
    "content-type",
    "cookie",
    "host",
    "proxy-authorization",
    "te",
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
            .refine((name) => !AGENT_READINESS_RESERVED_HEADERS.has(name), "This header is not a binding's."),
        value: templateSchema(512),
    })
        .strict())
        .max(16),
    body: httpBodySchema.nullable(),
    /** Credential roles the call carries; the runner's custody attaches each by its grant. */
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
/**
 * A binding locates evidence; it cannot supply a predicate or expected value.
 * An observation reads the call's JSON response, its event stream, or what the
 * call sent (`request`, by {@link agentReadinessRequestDocument}).
 */
const agentReadinessAssertionObservationSchema = z
    .object({
    name: nameSchema,
    call: callIdSchema,
    source: z.enum(["json", "stream", "request"]),
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
    z
        .object({
        scheme: z.literal("query"),
        parameter: z.string().regex(/^[A-Za-z0-9_.-]{1,64}$/u),
    })
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
/** A credential a successful response issues, kept under its role by the runner's custody. */
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
/** Where an access token an OAuth grant issues may go: the binding's calls carry it by its role. */
const agentReadinessOAuthAccessSchema = z
    .object({
    role: nameSchema,
    endpoint_ids: z.array(agentReadinessScopeKeySchema).min(1).max(8),
    methods: methodsSchema,
})
    .strict();
const oauthGrant = {
    /** The declared endpoint whose URI is the authorization server's token endpoint. */
    token_endpoint_id: agentReadinessScopeKeySchema,
    scopes: z
        .array(z.string().regex(/^[\x21\x23-\x5B\x5D-\x7E]{1,128}$/u))
        .max(32)
        .refine((scopes) => new Set(scopes).size === scopes.length, "Scopes are unique."),
    access: agentReadinessOAuthAccessSchema,
};
/**
 * How the job's authority is obtained on the account holder's runner (north
 * star §7.4). Consent never happens inside a run: an OAuth grant starts from
 * what the account holder already holds.
 */
const agentReadinessDelegationSchema = z.discriminatedUnion("kind", [
    /** The job needs no authority. */
    z.object({ kind: z.literal("none") }).strict(),
    /**
     * The account holder enters a credential the service issued, such as a key
     * from its dashboard, as a secret of their own run.
     */
    z
        .object({
        kind: z.literal("entered"),
        credentials: z.array(agentReadinessCredentialDeclarationSchema).min(1).max(4),
    })
        .strict(),
    /** A credential the account holder entered mints the job's, through the service's own API. */
    z
        .object({
        kind: z.literal("minted"),
        from: agentReadinessCredentialDeclarationSchema,
        ...issuingCall,
    })
        .strict(),
    /** A client id and secret obtain a fresh access token each run (RFC 6749 §4.4). */
    z
        .object({
        kind: z.literal("oauth_client_credentials"),
        client_authentication: z.enum(["client_secret_basic", "client_secret_post"]),
        ...oauthGrant,
    })
        .strict(),
    /**
     * A refresh token from one consent the account holder gave obtains an access
     * token each run (RFC 6749 §6); a rotated one is kept, for the account holder
     * to write back to their own secret.
     */
    z
        .object({
        kind: z.literal("oauth_refresh_token"),
        client_authentication: z.enum(["client_secret_basic", "client_secret_post", "none"]),
        ...oauthGrant,
    })
        .strict(),
]);
const agentReadinessPaymentSchema = z.discriminatedUnion("kind", [
    /** The job costs nothing at the exercised use. */
    z.object({ kind: z.literal("none") }).strict(),
    /** The account holds a balance a person set up; the run leaves Pay to the probes. */
    z.object({ kind: z.literal("prepaid_balance") }).strict(),
    /** The agent pays per call inside the exchange. */
    z.object({ kind: z.literal("per_call"), protocol: z.enum(["x402", "mpp"]) }).strict(),
]);
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
    delegation: agentReadinessDelegationSchema,
    payment: agentReadinessPaymentSchema,
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
    for (const call of binding.cleanup)
        calls.push({ call, mayRead: jobIds });
    return calls;
}
/** Credential roles the binding's calls may carry, from its delegation. */
function agentReadinessBindingRoles(binding) {
    const { delegation } = binding;
    switch (delegation.kind) {
        case "none":
            return [];
        case "entered":
            return [...new Set(delegation.credentials.map(({ role }) => role))];
        case "minted":
            return [...new Set([delegation.from.role, ...delegation.keep.map(({ role }) => role)])];
        case "oauth_client_credentials":
        case "oauth_refresh_token":
            return [delegation.access.role];
    }
}
/**
 * The OAuth client and grant credentials a delegation starts from, by the role
 * the account holder names each under. They travel only to the token endpoint,
 * never with a job call.
 */
export const AGENT_READINESS_OAUTH_ROLES = {
    clientId: "client_id",
    clientSecret: "client_secret",
    refreshToken: "refresh_token",
    /** A basic client's one credential: the form-encoded `client_id:client_secret` pair (RFC 6749 §2.3.1). */
    client: "client",
};
/** The call id an OAuth delegation's token request is recorded under; no binding call takes it. */
export const AGENT_READINESS_OAUTH_TOKEN_CALL = "oauth-token";
function validateBinding(binding, context) {
    const calls = agentReadinessBindingCalls(binding);
    unique(calls.map(({ call }) => call.call_id), context, ["calls"], "Call ids are unique across the binding.");
    if (calls.some(({ call }) => call.call_id === AGENT_READINESS_OAUTH_TOKEN_CALL)) {
        context.addIssue({
            code: "custom",
            path: ["calls"],
            message: `The call id ${AGENT_READINESS_OAUTH_TOKEN_CALL} names an OAuth delegation's token request.`,
        });
    }
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
        for (const template of agentReadinessCallTemplates(call)) {
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
}
/** Every template string a call sends. */
export function agentReadinessCallTemplates(call) {
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
/**
 * Each binding performs the job through its own interface: that interface is
 * declared, every call it makes uses one of the interface's HTTP endpoints and
 * keeps that endpoint's origin, and every credential reaches only declared
 * endpoints. Whether it performs the right job is checked against the job
 * library, which a declaration does not carry.
 */
export function validateDeclaredJobBindings(value, context) {
    const endpoints = new Map(value.endpoints.map((endpoint) => [endpoint.endpoint_id, endpoint]));
    const interfaces = new Map(value.interfaces.map((declared) => [declared.interface_id, declared.endpoint_ids]));
    for (const [index, binding] of value.job_bindings.entries()) {
        const issue = (message) => context.addIssue({ code: "custom", path: ["job_bindings", index], message });
        const reachable = interfaces.get(binding.interface_id);
        if (!reachable)
            issue(`Job binding references unknown interface '${binding.interface_id}'.`);
        for (const { call } of agentReadinessBindingCalls(binding)) {
            const endpoint = endpoints.get(call.endpoint_id);
            if (!endpoint) {
                issue(`Call '${call.call_id}' uses unknown endpoint '${call.endpoint_id}'.`);
                continue;
            }
            if (reachable && !reachable.includes(call.endpoint_id)) {
                issue(`Call '${call.call_id}' uses '${call.endpoint_id}', outside its interface.`);
            }
            if (endpoint.transport !== "http") {
                issue(`Call '${call.call_id}' needs an HTTP endpoint.`);
            }
            const endpointOrigin = agentReadinessUrlOrigin(endpoint.uri);
            if (call.kind === "http" &&
                endpointOrigin &&
                call.url.match(/^https:\/\/[^/?#]+/u)?.[0] !== endpointOrigin) {
                issue(`Call '${call.call_id}' leaves the origin of '${call.endpoint_id}'.`);
            }
        }
        const { delegation } = binding;
        const oauth = delegation.kind === "oauth_client_credentials" || delegation.kind === "oauth_refresh_token";
        const credentialEndpoints = [
            ...(delegation.kind === "entered" ? delegation.credentials : []),
            ...(delegation.kind === "minted" ? [delegation.from, ...delegation.keep] : []),
            ...(oauth ? [delegation.access] : []),
        ].flatMap(({ endpoint_ids }) => endpoint_ids);
        if (oauth)
            credentialEndpoints.push(delegation.token_endpoint_id);
        for (const id of new Set(credentialEndpoints)) {
            if (!endpoints.has(id))
                issue(`Credentials reach unknown endpoint '${id}'.`);
        }
        if (oauth && endpoints.get(delegation.token_endpoint_id)?.transport !== "http") {
            issue(`The token endpoint '${delegation.token_endpoint_id}' is an HTTP endpoint.`);
        }
    }
}
/**
 * Why a binding cannot perform its library job, or nothing. A binding maps
 * every library observation exactly once, reads only the job's inputs and sinks,
 * places the run's nonce wherever it locates a request observation, and cleans
 * up when the job is consequential. Whether its calls stay on its declared
 * surface is the declaration's own rule, checked where it is parsed.
 */
export function agentReadinessBindingIssues(input) {
    const { job, binding } = input;
    const issues = [];
    const mapped = binding.assertions.map(({ assertion }) => assertion);
    const required = job.assertions.map(({ name }) => name);
    for (const name of required) {
        if (!mapped.includes(name))
            issues.push(`Assertion ${name} is not mapped.`);
    }
    for (const name of mapped) {
        if (!required.includes(name))
            issues.push(`Assertion ${name} is not one of ${job.job_id}'s.`);
    }
    const calls = new Map(binding.calls.map((call) => [call.call_id, call]));
    const nonces = new Set([
        "{{run.nonce}}",
        ...job.inputs.flatMap(({ kind, name }) => (kind === "nonce" ? [`{{input.${name}}}`] : [])),
    ]);
    for (const assertion of job.assertions) {
        const located = binding.assertions.find(({ assertion: name }) => name === assertion.name);
        if (!located)
            continue;
        const proof = agentReadinessProofSignature(assertion.proof);
        const observations = new Map(located.observations.map((item) => [item.name, item]));
        for (const required of proof.observations) {
            const observed = observations.get(required.name);
            if (!observed) {
                issues.push(`Assertion ${assertion.name} does not locate ${required.name}.`);
                continue;
            }
            if (!agentReadinessOperandReads(required, observed.source)) {
                issues.push(`Assertion ${assertion.name}'s ${required.name} must read ${required.source}.`);
            }
            const call = calls.get(observed.call);
            if (call?.kind === "http" &&
                required.method &&
                !AGENT_READINESS_OBSERVED_CALL_METHODS[required.method].includes(call.method)) {
                issues.push(`Assertion ${assertion.name}'s ${required.name} needs a ${required.method} call.`);
            }
            if (call &&
                observed.source === "request" &&
                agentReadinessOperandReads(required, "request")) {
                // A query is the nonce itself; a name the caller gives carries it.
                const template = valueAtPointer(agentReadinessRequestTemplate(call), observed.pointer);
                const placed = typeof template === "string" &&
                    (required.source === "request"
                        ? nonces.has(template)
                        : [...nonces].some((nonce) => template.includes(nonce)));
                if (!placed) {
                    issues.push(`Assertion ${assertion.name}'s ${required.name} must locate the run's nonce in the request.`);
                }
            }
        }
        for (const name of observations.keys()) {
            if (!proof.observations.some((operand) => operand.name === name)) {
                issues.push(`Observation ${name} is not one of ${assertion.name}'s.`);
            }
        }
        for (const [left, right] of proof.sameCall ?? []) {
            const a = observations.get(left);
            const b = observations.get(right);
            if (a && b && a.call !== b.call)
                issues.push(`Assertion ${assertion.name}'s ${left} and ${right} must read the same call.`);
        }
        for (const [left, right] of proof.differentCall ?? []) {
            const a = observations.get(left);
            const b = observations.get(right);
            if (a && b && a.call === b.call)
                issues.push(`Assertion ${assertion.name}'s ${left} and ${right} must read different calls.`);
        }
        for (const [left, right] of proof.independentCall ?? []) {
            const a = observations.get(left);
            const b = observations.get(right);
            const sent = a && calls.get(a.call);
            const reads = (template) => agentReadinessTemplateReferences(template)?.some((reference) => reference.kind === "call" && reference.callId === b?.call);
            if (b && sent && agentReadinessCallTemplates(sent).some(reads))
                issues.push(`Assertion ${assertion.name}'s ${left} must not read ${right}'s call.`);
        }
    }
    for (const { from, to } of job.observation_links) {
        const locate = (reference) => binding.assertions
            .find(({ assertion }) => assertion === reference.assertion)
            ?.observations.find(({ name }) => name === reference.observation);
        const left = locate(from);
        const right = locate(to);
        if (left && right && left.call !== right.call) {
            issues.push(`${from.assertion}.${from.observation} and ${to.assertion}.${to.observation} must read the same call.`);
        }
    }
    const values = new Set(job.inputs.filter(({ kind }) => kind !== "sink").map(({ name }) => name));
    const sinks = new Set(job.inputs.filter(({ kind }) => kind === "sink").map(({ name }) => name));
    const templates = agentReadinessBindingCalls(binding).flatMap(({ call }) => agentReadinessCallTemplates(call));
    for (const template of templates) {
        for (const reference of agentReadinessTemplateReferences(template) ?? []) {
            if (reference.kind === "input" && !values.has(reference.name)) {
                issues.push(`Input ${reference.name} is not one of the job's.`);
            }
            if (reference.kind === "sink" && !sinks.has(reference.name)) {
                issues.push(`Sink ${reference.name} is not one of the job's.`);
            }
        }
    }
    if (job.cleanup === "required" && binding.cleanup.length === 0) {
        issues.push(`${job.job_id} is consequential; the binding must clean up after it.`);
    }
    return [...new Set(issues)];
}
//# sourceMappingURL=binding.js.map