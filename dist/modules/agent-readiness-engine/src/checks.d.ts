import { type ExchangeMethod, type ExchangeRecord } from "provenry/exchange/records";
import { type AgentReadinessJob, type AgentReadinessJobBinding } from "../../../contracts/agent-readiness/src/index.js";
import { type TemplateContext } from "./templates.js";
/** What one call sent and returned, in the terms checks read. */
export interface CallResult {
    readonly kind: "http" | "mcp";
    /** The method its record says was sent; null when no exchange of the call was recorded. */
    readonly method: ExchangeMethod | null;
    /** What the call sent; null unless the body handed with it is the one its record seals. */
    readonly request: SentRequest | null;
    /** The HTTP status of a call that got a response. */
    readonly status: number | null;
    /** The JSON document returned: an HTTP body read as JSON by content, or an MCP tool result. */
    readonly document: unknown;
    /** The JSON `data:` events of an event-stream response. */
    readonly events: readonly unknown[] | null;
    /** For an MCP call: true when the tool answered without error. */
    readonly mcpOk: boolean | null;
}
/**
 * What a call handed to its exchange beyond what its record keeps: the body,
 * which the record seals only by digest, and header values, which it never
 * records. Method, URL and media type are read from the record itself.
 */
export interface HandedRequest {
    readonly body: Uint8Array | null;
    readonly headers: Readonly<Record<string, string>>;
}
/**
 * A request as it was sent, in the terms checks read. Exchange custody adds to
 * what a call hands it only the body's content type, its own transport headers
 * (`accept-encoding` and its user agent) and the credentials the call names;
 * every header name it adds is recorded, but a credential's value never
 * reaches Sourcey.
 */
export interface SentRequest {
    /** What request observations read: see `agentReadinessRequestDocument`. */
    readonly document: unknown;
    /**
     * Every value it sent that Sourcey can read, as text: each header name its
     * record keeps, custody's included, the header values handed with it and its
     * content type; then an HTTP call's path segments, query parameters and body
     * fields, or an MCP call's tool name and arguments, names and keys included.
     */
    readonly inputs: readonly string[];
    /** The credentials custody attached, by the handle digests its record names. */
    readonly credentials: readonly string[];
}
/** Observes Sourcey's sinks; a run without one cannot hold a sink assertion. */
export interface SinkPort {
    received(input: {
        readonly sink: string;
        readonly contains: string;
    }): Promise<boolean>;
}
export interface CheckOutcome {
    readonly holds: boolean;
    readonly reason: string;
}
/** An HTTP exchange as a call result: its response as JSON by content, or the events of a stream. */
export declare function httpCallResult(handed: HandedRequest, record: ExchangeRecord, body: Uint8Array | null): CallResult;
/** An MCP tool call's exchange and answer as a call result. */
export declare function mcpCallResult(handed: HandedRequest, record: ExchangeRecord, answer: {
    readonly outcome: "result" | "error" | "unanswered";
    readonly result?: unknown;
}): CallResult;
/** Each library assertion, under Sourcey's semantics over the located observations. */
export declare function evaluateAssertions(input: {
    readonly job: AgentReadinessJob;
    readonly binding: AgentReadinessJobBinding;
    readonly calls: ReadonlyMap<string, CallResult>;
    /**
     * The credentials the run held before its first job call, by handle digest:
     * entered, or issued by its delegation. A job call keeps no credential, so
     * none of these derives from any job call's response.
     */
    readonly credentialsBeforeJob: ReadonlySet<string>;
    readonly context: TemplateContext;
    readonly sink?: SinkPort;
}): Promise<readonly {
    readonly assertion: string;
    readonly holds: boolean;
    readonly failure: {
        readonly check: number;
        readonly reason: string;
    } | null;
}[]>;
/**
 * Whether the safe invalid request failed typed: true or false is a fact about
 * the service; null (a transport failure, a 5xx, an unanswered call) is residue.
 */
export declare function evaluateErrorProbe(probe: AgentReadinessJobBinding["error_probe"], result: CallResult): {
    readonly typed: boolean;
    readonly reason: string;
} | null;
//# sourceMappingURL=checks.d.ts.map