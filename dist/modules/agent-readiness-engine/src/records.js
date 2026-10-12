import { isAgentReadinessGrpcMediaType, } from "../../../contracts/agent-readiness/src/index.js";
/**
 * What a sealed exchange record and a run record say without any response
 * body: whether an exchange was answered, a header it kept, and whether a run
 * left an operation unanswered. The verifier re-derives letters from these
 * alone; reading a body is `answers.ts`.
 */
/**
 * The transport failures that are residue: no answer came, and a later probe
 * may get one. A response over the read's bound did answer, and a read Sourcey
 * refused before sending (outside the service's hosts, or to a private
 * address) has nothing to retry.
 */
export const RESIDUE_FAILURES = new Set([
    "deadline_exceeded",
    "dns_failure",
    "tls_failure",
    "other",
]);
/**
 * The gRPC statuses that are residue, as a 429 or 5xx is (gRPC's own mapping
 * to HTTP): unknown, deadline exceeded, resource exhausted, internal,
 * unavailable and data loss. Unimplemented, which that mapping sends to 501,
 * is a service's answer that it has no such method.
 */
const GRPC_RESIDUE = new Set([2, 4, 8, 13, 14, 15]);
/**
 * A residue transport failure, 429 or 5xx, or a gRPC call's like: residue to
 * retry, never the service's answer. A gRPC call's own status decides it,
 * whatever its HTTP status; one whose status the exchange could not read is
 * residue too, never a guess.
 */
export function unansweredRecord(record) {
    if (record.outcome !== "responded")
        return RESIDUE_FAILURES.has(record.reason);
    const grpc = grpcStatus(record);
    if (grpc !== null)
        return GRPC_RESIDUE.has(grpc);
    if (grpcStatusUnread(record))
        return true;
    const { status } = record.response;
    return status === 429 || status >= 500;
}
/**
 * A gRPC call's status (north star §5.4): an answer under a gRPC media type to
 * a request that carried a gRPC message, read from the `grpc-status` it sent
 * before any message, as a refusal does, whatever its HTTP status (a proxy may
 * refuse with a 403). Null for any other exchange, an answer with no status
 * there, or a `grpc-status` that is not a status. Only a gRPC call's answer is
 * read so: a gRPC server answers other requests (a metadata read) under its
 * media type too.
 */
export function grpcStatus(record) {
    if (!grpcCall(record))
        return null;
    const sent = responseHeader(record, "grpc-status");
    if (sent === null || !/^(?:0|[1-9][0-9]{0,2})$/u.test(sent))
        return null;
    // A success is a 2xx; a refusal's HTTP status claiming success is read as HTTP.
    const status = Number(sent);
    return status === 0 && !served(record) ? null : status;
}
/**
 * A gRPC call served with no status before its body: the status came after
 * it, in trailers the exchange does not keep, so the answer is unread (north
 * star §5.4). Whether a message preceded it says nothing of the status that
 * followed.
 */
function grpcStatusUnread(record) {
    return grpcCall(record) && served(record) && responseHeader(record, "grpc-status") === null;
}
/** An answer under a gRPC media type to a request that carried a gRPC message. */
function grpcCall(record) {
    if (record.outcome !== "responded")
        return false;
    const { request, response } = record;
    return (request.body !== null &&
        isAgentReadinessGrpcMediaType(request.body.media_type) &&
        isAgentReadinessGrpcMediaType(response.body.media_type));
}
function served(record) {
    return record.response.status >= 200 && record.response.status <= 299;
}
/** The exchanges that follow an *authority* answer to the agent's client and consent. */
const AUTHORITY_CHAIN = new Set([
    "probe_resource_metadata",
    "probe_authorization_server",
    "probe_client_registration",
    "probe_authorization",
]);
/**
 * Whether a probe run left one job operation unanswered: the request itself,
 * the malformed request after a success, the spec it names, any read of its
 * authority chain (a metadata location passed over for the next one could
 * have named another server), or a page the listing names (which every
 * operation's Onboard and Pay read). Residue is never a fact about the
 * service, so such a run decides nothing about the operation, and the profile
 * is probed again.
 */
export function probeUnanswered(run, operationId) {
    const probe = run.probes.find(({ operation_id }) => operation_id === operationId);
    if (!probe ||
        probe.request?.answer === "unanswered" ||
        probe.malformed?.answer === "unanswered" ||
        probe.spec?.fetched === "unanswered" ||
        run.pages.some(({ answer }) => answer === "unanswered")) {
        return true;
    }
    return run.exchanges.some(({ call_id, purpose, record }) => call_id === operationId && AUTHORITY_CHAIN.has(purpose) && unansweredRecord(record));
}
/** A response header a record kept, or null. */
export function responseHeader(record, name) {
    if (record.outcome !== "responded")
        return null;
    return record.response.headers.find(([header]) => header === name)?.[1] ?? null;
}
//# sourceMappingURL=records.js.map