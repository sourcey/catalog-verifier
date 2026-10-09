import { FORM_MEDIA_TYPE, } from "provenry/exchange/records";
import { sha256Bytes } from "provenry/primitives";
import { agentReadinessRequestDocument, } from "../../../contracts/agent-readiness/src/index.js";
import { agentReadinessAssertionProof } from "./assertions.js";
import { valueAtPointer } from "./templates.js";
/** An HTTP exchange as a call result: its response as JSON by content, or the events of a stream. */
export function httpCallResult(handed, record, body) {
    const sent = sentHttpRequest(handed, record);
    const { method } = record.request;
    if (record.outcome !== "responded" || body === null) {
        return {
            kind: "http",
            method,
            request: sent,
            status: null,
            document: undefined,
            events: null,
            mcpOk: null,
        };
    }
    const text = utf8(body);
    const streamed = record.response.body.media_type === "text/event-stream";
    return {
        kind: "http",
        method,
        request: sent,
        status: record.response.status,
        document: streamed || text === null ? undefined : json(text),
        events: streamed && text !== null ? streamEvents(text) : null,
        mcpOk: null,
    };
}
/** An MCP tool call's exchange and answer as a call result. */
export function mcpCallResult(handed, record, answer) {
    const isError = answer.outcome === "result" &&
        answer.result?.isError === true;
    return {
        kind: "mcp",
        method: record.request.method,
        request: sentMcpRequest(handed, record),
        status: record.outcome === "responded" ? record.response.status : null,
        document: answer.outcome === "result" ? answer.result : undefined,
        events: null,
        mcpOk: answer.outcome === "result" ? !isError : answer.outcome === "error" ? false : null,
    };
}
/** What an HTTP call sent: its URL query and body, and every input with its path and headers. */
function sentHttpRequest(handed, record) {
    const text = sealedBody(handed, record);
    if (text === undefined)
        return null;
    const mediaType = record.request.body?.media_type;
    const parsed = text !== null && mediaType === "application/json" ? json(text) : undefined;
    const body = text === null
        ? null
        : mediaType === FORM_MEDIA_TYPE
            ? { form: [...new URLSearchParams(text)] }
            : parsed === undefined
                ? undefined
                : { json: parsed };
    // A body that is neither JSON nor a form is not one a binding sends.
    if (body === undefined)
        return null;
    const url = new URL(record.request.url);
    const document = agentReadinessRequestDocument({ query: [...url.searchParams], body });
    return sentRequest(handed, record, document, [
        ...url.pathname
            .split("/")
            .filter((segment) => segment !== "")
            .map(decodedSegment),
        ...Object.values(document).flatMap(texts),
    ]);
}
/** What an MCP call sent: the tool name and arguments of its JSON-RPC request. */
function sentMcpRequest(handed, record) {
    const text = sealedBody(handed, record);
    const message = text ? json(text) : undefined;
    if (message === undefined)
        return null;
    const params = message?.params;
    return sentRequest(handed, record, agentReadinessRequestDocument({ arguments: params?.arguments }), [...texts(params?.name), ...texts(params?.arguments)]);
}
/** A sealed request with its headers and credentials, as its record and the handed values show them. */
function sentRequest(handed, record, document, inputs) {
    const { body, credentials, header_names } = record.request;
    return {
        document,
        inputs: [
            ...header_names,
            ...Object.values(handed.headers),
            ...(body ? [body.media_type] : []),
            ...inputs,
        ],
        credentials: credentials.map(({ handle_digest }) => handle_digest),
    };
}
/**
 * The body text handed with a request, only when its record seals those exact
 * bytes: null when neither has a body; undefined when the bytes are not the
 * record's or are not text.
 */
function sealedBody(handed, record) {
    const sealed = record.request.body;
    if (handed.body === null)
        return sealed === null ? null : undefined;
    return sealed?.content_digest === sha256Bytes(handed.body)
        ? (utf8(handed.body) ?? undefined)
        : undefined;
}
/** A JSON value's keys and scalars, as text. */
function texts(value) {
    if (typeof value === "string")
        return [value];
    if (typeof value === "number" || typeof value === "boolean")
        return [String(value)];
    if (Array.isArray(value))
        return value.flatMap(texts);
    if (value !== null && typeof value === "object") {
        return Object.entries(value).flatMap(([key, item]) => [key, ...texts(item)]);
    }
    return [];
}
function decodedSegment(segment) {
    try {
        return decodeURIComponent(segment);
    }
    catch {
        return segment;
    }
}
/** Each library assertion, under Sourcey's semantics over the located observations. */
export async function evaluateAssertions(input) {
    const results = [];
    for (const assertion of input.job.assertions) {
        const mapped = input.binding.assertions.find((entry) => entry.assertion === assertion.name);
        if (!mapped)
            throw new Error(`The binding does not map assertion ${assertion.name}.`);
        const proof = agentReadinessAssertionProof(assertion.proof);
        const values = new Map();
        const requests = new Map();
        let failure = null;
        for (const [index, required] of proof.observations.entries()) {
            const observation = mapped.observations.find(({ name }) => name === required.name);
            const call = observation ? input.calls.get(observation.call) : undefined;
            const ok = call?.kind === "http"
                ? call.status !== null && call.status >= 200 && call.status <= 299
                : call?.mcpOk === true;
            const sent = observation?.source === "request" ? call?.request : undefined;
            if (!observation || observation.source !== required.source || !call || !ok || sent === null) {
                failure = {
                    check: index,
                    reason: `No successful ${required.source} observation establishes ${required.name}.`,
                };
                break;
            }
            const declared = input.binding.calls.find(({ call_id }) => call_id === observation.call);
            const unrecorded = recordIssue(declared, call, sent, input.credentialsBeforeJob);
            if (unrecorded !== null) {
                failure = { check: index, reason: unrecorded };
                break;
            }
            const { pointer } = observation;
            if (sent)
                requests.set(required.name, sent.inputs);
            values.set(required.name, sent
                ? valueAtPointer(sent.document, pointer)
                : observation.source === "json"
                    ? valueAtPointer(call.document, pointer)
                    : call.events?.map((event) => valueAtPointer(event, pointer)));
        }
        if (failure === null) {
            const outcome = await proof.evaluate({
                values,
                requests,
                context: input.context,
                ...(input.sink ? { sink: input.sink } : {}),
            });
            if (!outcome.holds)
                failure = { check: 0, reason: outcome.reason };
        }
        results.push({ assertion: assertion.name, holds: failure === null, failure });
    }
    return results;
}
/**
 * Why an observed call's record cannot stand for it, or nothing. The record
 * must show the method the binding declared. A request observation also reads
 * only a request whose every credential the run held before the job: custody's
 * one addition Sourcey cannot read is a credential's value, and only then can
 * no value it added derive from a job call's response.
 */
function recordIssue(declared, call, sent, credentialsBeforeJob) {
    if (declared?.kind === "http" && call.method !== declared.method) {
        return `Call ${declared.call_id} was sent as ${call.method}, not its declared ${declared.method}.`;
    }
    if (sent?.credentials.some((handle) => !credentialsBeforeJob.has(handle))) {
        return "The request carried a credential the run did not hold before the job.";
    }
    return null;
}
/**
 * Whether the safe invalid request failed typed: true or false is a fact about
 * the service; null (a transport failure, a 5xx, an unanswered call) is residue.
 */
export function evaluateErrorProbe(probe, result) {
    if (probe.expect.kind === "mcp_error") {
        if (result.mcpOk === null)
            return null;
        return result.mcpOk
            ? { typed: false, reason: "The invalid request was accepted." }
            : { typed: true, reason: "The invalid request failed with a typed MCP error." };
    }
    if (result.status === null || result.status >= 500)
        return null;
    if (result.status < 400)
        return { typed: false, reason: "The invalid request was accepted." };
    if (!present(valueAtPointer(result.document, probe.expect.error_pointer))) {
        return { typed: false, reason: "The refusal carries no machine-readable error." };
    }
    return { typed: true, reason: `HTTP ${result.status} with a machine-readable error.` };
}
function present(value) {
    return value !== undefined && value !== null && value !== "";
}
function utf8(bytes) {
    try {
        return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    }
    catch {
        return null;
    }
}
function json(text) {
    try {
        return JSON.parse(text);
    }
    catch {
        return undefined;
    }
}
function streamEvents(text) {
    const events = [];
    for (const block of text.split(/\r?\n\r?\n/u)) {
        const data = block
            .split(/\r?\n/u)
            .filter((line) => line.startsWith("data:"))
            .map((line) => line.slice("data:".length).trimStart())
            .join("\n");
        if (!data || data === "[DONE]")
            continue;
        const parsed = json(data);
        if (parsed !== undefined)
            events.push(parsed);
    }
    return events;
}
//# sourceMappingURL=checks.js.map