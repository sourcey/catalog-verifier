import type { ExchangeMethod } from "provenry/exchange/records";
import type { AgentReadinessJob } from "../../../contracts/agent-readiness/src/index.js";
import type { CheckOutcome, SinkPort } from "./checks.js";
import type { TemplateContext } from "./templates.js";
type Proof = AgentReadinessJob["assertions"][number]["proof"];
/** The HTTP methods an observed call may use; a query may send its terms in a body. */
export declare const OBSERVED_CALL_METHODS: Readonly<Record<"read" | "write" | "query", readonly ExchangeMethod[]>>;
interface Operand {
    readonly name: string;
    /**
     * The call's JSON response or event stream, or what it sent. A binding must
     * place the run's nonce wherever it locates a request observation, so the
     * value is the run's, never the binding's.
     */
    readonly source: "json" | "stream" | "request";
    readonly method?: keyof typeof OBSERVED_CALL_METHODS;
    /**
     * An identifier the caller may name, as a storage bucket or a vector is named: a binding
     * may locate it in what the write call sent instead of its response, and then the value
     * must carry the run's nonce. A call is observed only once it succeeded, so the service
     * accepted that name.
     */
    readonly callerNamed?: true;
}
/** Whether an observation may locate the operand from this source. */
export declare function operandReads(operand: Operand, source: Operand["source"]): boolean;
interface AssertionInput {
    readonly values: ReadonlyMap<string, unknown>;
    /** Every operation input the call behind each request observation sent, as text. */
    readonly requests: ReadonlyMap<string, readonly string[]>;
    readonly context: TemplateContext;
    readonly sink?: SinkPort;
}
/** One owner for an assertion's inputs, their correlation and its meaning. */
interface AssertionProof {
    readonly observations: readonly Operand[];
    readonly sameCall?: readonly (readonly [string, string])[];
    readonly differentCall?: readonly (readonly [string, string])[];
    /** [a, b]: a's call is sent without reading anything b's call returned. */
    readonly independentCall?: readonly (readonly [string, string])[];
    evaluate(input: AssertionInput): CheckOutcome | Promise<CheckOutcome>;
}
export declare function agentReadinessAssertionProof(proof: Proof): AssertionProof;
export {};
//# sourceMappingURL=assertions.d.ts.map