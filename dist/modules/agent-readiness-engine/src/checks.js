import { agentReadinessAssertionProof } from "./assertions.js";
import { valueAtPointer } from "./templates.js";
/** An HTTP response as a call result: JSON by content, or the events of a stream. */
export function httpCallResult(record, body) {
    if (record.outcome !== "responded" || body === null) {
        return { kind: "http", status: null, document: undefined, events: null, mcpOk: null };
    }
    const text = utf8(body);
    const streamed = record.response.body.media_type === "text/event-stream";
    return {
        kind: "http",
        status: record.response.status,
        document: streamed || text === null ? undefined : json(text),
        events: streamed && text !== null ? streamEvents(text) : null,
        mcpOk: null,
    };
}
/** An MCP tool call's answer as a call result. */
export function mcpCallResult(answer) {
    const isError = answer.outcome === "result" &&
        answer.result?.isError === true;
    return {
        kind: "mcp",
        status: null,
        document: answer.outcome === "result" ? answer.result : undefined,
        events: null,
        mcpOk: answer.outcome === "result" ? !isError : answer.outcome === "error" ? false : null,
    };
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
        let failure = null;
        for (const [index, required] of proof.observations.entries()) {
            const observation = mapped.observations.find(({ name }) => name === required.name);
            const call = observation ? input.calls.get(observation.call) : undefined;
            const ok = call?.kind === "http"
                ? call.status !== null && call.status >= 200 && call.status <= 299
                : call?.mcpOk === true;
            if (!observation || observation.source !== required.source || !call || !ok) {
                failure = {
                    check: index,
                    reason: `No successful ${required.source} observation establishes ${required.name}.`,
                };
                break;
            }
            values.set(required.name, observation.source === "json"
                ? valueAtPointer(call.document, observation.pointer)
                : call.events?.map((event) => valueAtPointer(event, observation.pointer)));
        }
        if (failure === null) {
            const outcome = await proof.evaluate({
                values,
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