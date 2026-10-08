import type { z } from "zod";
import { type AgentReadinessRunRecord, type AgentReadinessRunSummary, agentReadinessRunRecordCoreSchema } from "../../../contracts/agent-readiness/src/index.js";
/** A run record with its digest, checked as every reader checks it. */
export declare function sealAgentReadinessRunRecord(core: z.input<typeof agentReadinessRunRecordCoreSchema>): AgentReadinessRunRecord;
/** A published run record, only when its digest closes its content. */
export declare function verifyAgentReadinessRunRecord(value: unknown): AgentReadinessRunRecord;
/** The run as a card shows it: its reads, each request and what came back, what held. */
export declare function summarizeAgentReadinessRun(record: AgentReadinessRunRecord): AgentReadinessRunSummary;
//# sourceMappingURL=run.d.ts.map