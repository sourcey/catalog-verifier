import { digest } from "provenry/primitives";
import { agentReadinessRunRecordCoreSchema, agentReadinessRunRecordSchema, agentReadinessRunSummarySchema, } from "../../../contracts/agent-readiness/src/index.js";
/** A run record with its digest, checked as every reader checks it. */
export function sealAgentReadinessRunRecord(core) {
    const parsed = agentReadinessRunRecordCoreSchema.parse(core);
    return agentReadinessRunRecordSchema.parse({ ...parsed, run_digest: digest(parsed) });
}
/** A published run record, only when its digest closes its content. */
export function verifyAgentReadinessRunRecord(value) {
    const record = agentReadinessRunRecordSchema.parse(value);
    const { run_digest, ...core } = record;
    if (digest(agentReadinessRunRecordCoreSchema.parse(core)) !== run_digest) {
        throw new Error("Agent Readiness run record digest does not match its content.");
    }
    return record;
}
/** The run as a card shows it: its reads, each request and what came back, what held. */
export function summarizeAgentReadinessRun(record) {
    return agentReadinessRunSummarySchema.parse({
        started_at: record.started_at,
        finished_at: record.finished_at,
        discovery_reads: record.discovery.attempts.length,
        exchanges: record.exchanges.map(({ purpose, role, record: exchange }) => ({
            purpose,
            role,
            method: exchange.request.method,
            url: exchange.request.url,
            started_at: exchange.started_at,
            finished_at: exchange.finished_at,
            response: exchange.outcome === "responded"
                ? {
                    status: exchange.response.status,
                    media_type: exchange.response.body.media_type,
                    content_bytes: exchange.response.body.content_bytes,
                    content_digest: exchange.response.body.content_digest,
                }
                : null,
            transport_error: exchange.outcome === "transport_error" ? exchange.reason : null,
            exchange_digest: exchange.exchange_digest,
        })),
        assertions: record.assertions,
        error_probe: record.error_probe,
    });
}
//# sourceMappingURL=run.js.map