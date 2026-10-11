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
/** A residue transport failure, 429 or 5xx: residue to retry, never the service's answer. */
export function unansweredRecord(record) {
    if (record.outcome !== "responded")
        return RESIDUE_FAILURES.has(record.reason);
    const { status } = record.response;
    return status === 429 || status >= 500;
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