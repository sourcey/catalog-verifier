import { ipAddressVersion } from "provenry/primitives";
/** The HTTP methods an observed call may use; a query may send its terms in a body. */
export const OBSERVED_CALL_METHODS = {
    read: ["GET", "HEAD"],
    write: ["POST", "PUT", "PATCH", "DELETE"],
    query: ["GET", "POST"],
};
const pass = () => ({ holds: true, reason: "The canonical assertion holds." });
const fail = (reason) => ({ holds: false, reason });
const identifier = (value) => typeof value === "string" && value.trim().length > 0 && value.length <= 512;
const resourceIdentifier = (value) => identifier(value) || (typeof value === "number" && Number.isSafeInteger(value) && value > 0);
const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value)
    ? value
    : null;
/**
 * Whether a sent value carries an identifier: it occurs there, and not as part
 * of a longer run of letters and digits, so `id:rec-1` carries `rec-1` and
 * `rec-10` does not.
 */
function carries(text, id) {
    const word = /^[A-Za-z0-9]$/u;
    for (let at = text.indexOf(id); at >= 0; at = text.indexOf(id, at + 1)) {
        const joinsBefore = word.test(id[0]) && word.test(text[at - 1] ?? "");
        const joinsAfter = word.test(id.at(-1)) && word.test(text[at + id.length] ?? "");
        if (!joinsBefore && !joinsAfter)
            return true;
    }
    return false;
}
const created = {
    observations: [{ name: "id", source: "json", method: "write" }],
    evaluate: ({ values }) => resourceIdentifier(values.get("id"))
        ? pass()
        : fail("The creation did not return a resource identifier."),
};
/**
 * Portable Sourcey job semantics. A binding supplies locations only: never a
 * comparison value, predicate, threshold, verdict or executable callback.
 */
const proofs = {
    dns_answer: {
        observations: [
            { name: "query_name", source: "json", method: "read" },
            { name: "records", source: "json", method: "read" },
        ],
        sameCall: [["query_name", "records"]],
        evaluate({ values, context }) {
            const normalize = (value) => typeof value === "string" ? value.toLowerCase().replace(/\.$/u, "") : null;
            if (normalize(values.get("query_name")) !== normalize(context.inputs.name)) {
                return fail("The answer does not name the queried domain.");
            }
            const records = values.get("records");
            const address = (value) => {
                if (typeof value === "string")
                    return ipAddressVersion(value) !== 0;
                const record = object(value);
                if (!record || typeof record.data !== "string")
                    return false;
                return ((record.type === 1 && ipAddressVersion(record.data) === 4) ||
                    (record.type === 28 && ipAddressVersion(record.data) === 6));
            };
            return Array.isArray(records) && records.some(address)
                ? pass()
                : fail("The answer carries no valid address record.");
        },
    },
    dns_success: {
        observations: [{ name: "status", source: "json", method: "read" }],
        evaluate: ({ values }) => values.get("status") === 0
            ? pass()
            : fail("The resolver did not report successful resolution."),
    },
    model_selected: {
        observations: [
            { name: "models", source: "json", method: "read" },
            { name: "used_model", source: "stream", method: "write" },
        ],
        differentCall: [["models", "used_model"]],
        evaluate({ values }) {
            const listed = values.get("models");
            const used = values.get("used_model");
            if (!Array.isArray(listed) || !Array.isArray(used))
                return fail("No live model list and streamed model identity.");
            const ids = new Set(listed.flatMap((value) => {
                const id = typeof value === "string" ? value : object(value)?.id;
                return identifier(id) ? [id] : [];
            }));
            const selected = used.filter((value) => value !== undefined && value !== null);
            return selected.length > 0 && selected.every((value) => identifier(value) && ids.has(value))
                ? pass()
                : fail("The streamed model is not established by the live model list.");
        },
    },
    stream_chunks: {
        observations: [{ name: "chunks", source: "stream", method: "write" }],
        evaluate({ values }) {
            const chunks = values.get("chunks");
            return Array.isArray(chunks) &&
                chunks.length >= 2 &&
                chunks.every((chunk) => object(chunk) !== null && object(chunk)?.error === undefined)
                ? pass()
                : fail("The completion did not stream multiple successful chunks.");
        },
    },
    tool_called: {
        observations: [
            { name: "tool_name", source: "stream", method: "write" },
            { name: "tool_arguments", source: "stream", method: "write" },
        ],
        sameCall: [["tool_name", "tool_arguments"]],
        evaluate({ values, context }) {
            const names = values.get("tool_name");
            const arguments_ = values.get("tool_arguments");
            if (!Array.isArray(names) || !Array.isArray(arguments_))
                return fail("No streamed tool call.");
            const parts = (items) => items.every((item) => item === undefined || item === null || typeof item === "string")
                ? items.filter((item) => typeof item === "string").join("")
                : null;
            if (parts(names) !== "sourcey_probe")
                return fail("The completion did not call the provided Sourcey probe tool.");
            const encoded = parts(arguments_);
            if (encoded === null)
                return fail("The tool arguments are not readable.");
            let argumentsValue;
            try {
                argumentsValue = JSON.parse(encoded);
            }
            catch {
                return fail("The tool arguments are not complete JSON.");
            }
            return object(argumentsValue)?.nonce === context.nonce
                ? pass()
                : fail("The tool call does not carry this run's nonce.");
        },
    },
    resource_created: created,
    resource_read_back: {
        observations: [
            { name: "created_id", source: "json", method: "write" },
            { name: "read_id", source: "json", method: "read" },
            { name: "content", source: "json", method: "read" },
        ],
        sameCall: [["read_id", "content"]],
        differentCall: [["created_id", "read_id"]],
        evaluate: ({ values, context }) => resourceIdentifier(values.get("created_id")) &&
            values.get("created_id") === values.get("read_id") &&
            values.get("content") === context.nonce
            ? pass()
            : fail("The readback does not establish the created resource with this run's nonce."),
    },
    /**
     * Found by what was asked, not by the key: the query the call sent is the
     * run's nonce, and nothing it sent carries the created identifier, which the
     * request's templates alone cannot rule out (a literal or another response
     * can still hold it).
     */
    resource_found_by_query: {
        observations: [
            { name: "created_id", source: "json", method: "write" },
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
        evaluate({ values, requests, context }) {
            const id = values.get("created_id");
            const sent = requests.get("query");
            if (!resourceIdentifier(id))
                return fail("The creation did not return a resource identifier.");
            if (values.get("query") !== context.nonce || sent === undefined) {
                return fail("The query did not send this run's nonce.");
            }
            if (sent.some((text) => carries(text, String(id)))) {
                return fail("The query sent the created identifier, so it did not find the resource.");
            }
            return values.get("found_id") === id && values.get("content") === context.nonce
                ? pass()
                : fail("The query did not return the created resource with this run's nonce.");
        },
    },
    message_accepted: created,
    sink_received: {
        observations: [],
        async evaluate({ context, sink }) {
            if (!sink || !context.sinks.recipient)
                return fail("No controlled recipient observes delivery.");
            return (await sink.received({ sink: "recipient", contains: context.nonce }))
                ? pass()
                : fail("The controlled recipient did not receive this run's nonce.");
        },
    },
};
export function agentReadinessAssertionProof(proof) {
    return proofs[proof];
}
//# sourceMappingURL=assertions.js.map