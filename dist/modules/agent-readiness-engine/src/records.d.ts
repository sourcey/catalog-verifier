import type { ExchangeRecord } from "provenry/exchange/records";
import { type AgentReadinessRunRecord } from "../../../contracts/agent-readiness/src/index.js";
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
/**
 * A residue transport failure, 429 or 5xx, or a gRPC call's like: residue to
 * retry, never the service's answer. A gRPC call's own status decides it,
 * whatever its HTTP status; one whose status the exchange could not read is
 * residue too, never a guess.
 */
export declare function unansweredRecord(record: ExchangeRecord): boolean;
/**
 * A gRPC call's status (north star §5.4): an answer under a gRPC media type to
 * a request that carried a gRPC message, read from the `grpc-status` it sent
 * before any message, as a refusal does, whatever its HTTP status (a proxy may
 * refuse with a 403). Null for any other exchange, an answer with no status
 * there, or a `grpc-status` that is not a status. Only a gRPC call's answer is
 * read so: a gRPC server answers other requests (a metadata read) under its
 * media type too.
 */
export declare function grpcStatus(record: ExchangeRecord): number | null;
/**
 * Whether a probe run left one job operation unanswered: the request itself,
 * the malformed request after a success, the spec it names or a document its
 * references reach, any read of its authority chain (a metadata location
 * passed over for the next one could have named another server), a page the
 * listing names (which every operation's Onboard and Pay read), or the spec of
 * an account operation its interface declares (`accountOperationIds`).
 * Residue is never a fact about the service, so such a run decides nothing
 * about the operation, and the profile is probed again.
 */
export declare function probeUnanswered(run: Pick<AgentReadinessRunRecord, "probes" | "exchanges" | "pages" | "accounts">, operationId: string, accountOperationIds?: readonly string[]): boolean;
/** A spec reading that rests on a read left unanswered: the spec's own, or a reference's. */
export declare function specUnanswered(spec: AgentReadinessRunRecord["probes"][number]["spec"]): boolean;
/** A response header a record kept, or null. */
export declare function responseHeader(record: ExchangeRecord, name: string): string | null;
//# sourceMappingURL=records.d.ts.map