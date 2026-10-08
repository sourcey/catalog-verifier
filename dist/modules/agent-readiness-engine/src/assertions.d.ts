import type { AgentReadinessJob } from "../../../contracts/agent-readiness/src/index.js";
import type { CheckOutcome, SinkPort } from "./checks.js";
import type { TemplateContext } from "./templates.js";
type Proof = AgentReadinessJob["assertions"][number]["proof"];
interface Operand {
    readonly name: string;
    readonly source: "json" | "stream";
    readonly method?: "read" | "write";
}
interface AssertionInput {
    readonly values: ReadonlyMap<string, unknown>;
    readonly context: TemplateContext;
    readonly sink?: SinkPort;
}
/** One owner for an assertion's inputs, their correlation and its meaning. */
interface AssertionProof {
    readonly observations: readonly Operand[];
    readonly sameCall?: readonly (readonly [string, string])[];
    readonly differentCall?: readonly (readonly [string, string])[];
    evaluate(input: AssertionInput): CheckOutcome | Promise<CheckOutcome>;
}
export declare function agentReadinessAssertionProof(proof: Proof): AssertionProof;
export {};
//# sourceMappingURL=assertions.d.ts.map