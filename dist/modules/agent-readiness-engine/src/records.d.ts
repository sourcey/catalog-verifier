import type { ExchangeRecord } from "provenry/exchange/records";
import type { AgentReadinessRunRecord } from "../../../contracts/agent-readiness/src/index.js";
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
export declare const RESIDUE_FAILURES: ReadonlySet<string>;
/** A residue transport failure, 429 or 5xx: residue to retry, never the service's answer. */
export declare function unansweredRecord(record: ExchangeRecord): boolean;
/**
 * Whether a probe run left one job operation unanswered: the request itself,
 * the malformed request after a success, the spec it names, any read of its
 * authority chain (a metadata location passed over for the next one could
 * have named another server), or a page the listing names (which every
 * operation's Onboard and Pay read). Residue is never a fact about the
 * service, so such a run decides nothing about the operation, and the profile
 * is probed again.
 */
export declare function probeUnanswered(run: Pick<AgentReadinessRunRecord, "probes" | "exchanges" | "pages">, operationId: string): boolean;
/** A response header a record kept, or null. */
export declare function responseHeader(record: ExchangeRecord, name: string): string | null;
//# sourceMappingURL=records.d.ts.map