import type { ExchangeRecord } from "provenry/exchange/records";
import type { AgentReadinessJob, AgentReadinessJobBinding } from "../../../contracts/agent-readiness/src/index.js";
import { type TemplateContext } from "./templates.js";
/** What one call returned, in the terms checks read. */
export interface CallResult {
    readonly kind: "http" | "mcp";
    /** The HTTP status of a call that got a response. */
    readonly status: number | null;
    /** The JSON document returned: an HTTP body read as JSON by content, or an MCP tool result. */
    readonly document: unknown;
    /** The JSON `data:` events of an event-stream response. */
    readonly events: readonly unknown[] | null;
    /** For an MCP call: true when the tool answered without error. */
    readonly mcpOk: boolean | null;
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
/** An HTTP response as a call result: JSON by content, or the events of a stream. */
export declare function httpCallResult(record: ExchangeRecord, body: Uint8Array | null): CallResult;
/** An MCP tool call's answer as a call result. */
export declare function mcpCallResult(answer: {
    readonly outcome: "result" | "error" | "unanswered";
    readonly result?: unknown;
}): CallResult;
/** Each library assertion, under Sourcey's semantics over the located observations. */
export declare function evaluateAssertions(input: {
    readonly job: AgentReadinessJob;
    readonly binding: AgentReadinessJobBinding;
    readonly calls: ReadonlyMap<string, CallResult>;
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