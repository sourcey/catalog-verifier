import type { ExchangeRecord } from "provenry/exchange/records";
import { type Challenge } from "./challenges.js";
/**
 * The authority chain an *authority* answer, or an error before authority,
 * points to (north star §5.5): RFC 9728 protected-resource metadata, then the
 * authorization server's RFC 8414 or OpenID metadata, then its auth.md agent
 * registration or how Sourcey's agent can identify itself as an OAuth client,
 * then whether a PKCE authorization request with that client reaches consent.
 * These are the pure readings; the probe suite performs the exchanges.
 */
/** The Bearer challenge's parameters an agent follows: where the metadata is, and what scope. */
export declare function bearerChallenge(record: ExchangeRecord): Challenge | null;
/**
 * Where the protected-resource metadata for a resource is: the challenge's
 * `resource_metadata`, else RFC 9728 §3.1's well-known location with the
 * resource's path inserted, then at the root.
 */
export declare function protectedResourceMetadataUrls(resource: string, challenge: Challenge | null): readonly string[];
/** RFC 9728 metadata as published: the resource, its authorization servers and its scopes. */
export declare function protectedResourceMetadata(document: unknown): {
    readonly resource: string;
    readonly authorizationServers: readonly string[];
    readonly scopes: readonly string[];
} | null;
/** RFC 9728 metadata for a resource on the operation's origin: its first authorization server. */
export declare function readProtectedResource(document: unknown, operationUrl: string): {
    readonly authorizationServer: string;
    readonly scopes: readonly string[];
} | null;
/**
 * Where an authorization server's metadata is, in the order MCP clients try:
 * RFC 8414 with the issuer's path inserted, OpenID with it inserted, OpenID
 * with it appended; or, for an issuer without a path, RFC 8414 then OpenID.
 */
export declare function authorizationServerMetadataUrls(issuer: string): readonly string[];
export interface AuthorizationServerMetadata {
    readonly issuer: string;
    /** Null for a server that only registers agents (auth.md) and runs no authorization flow. */
    readonly authorizationEndpoint: string | null;
    readonly registrationEndpoint: string | null;
    readonly clientIdMetadataDocument: boolean;
    /** S256 is listed: an MCP client refuses a server that does not list it. */
    readonly pkce: boolean;
    /**
     * The server's auth.md agent registration (`agent_auth` with an
     * `identity_endpoint`): `agent` when it offers `anonymous`, which needs no
     * person; `claimable` when it offers only `service_auth` or
     * `identity_assertion`, which a person claims or confirms once.
     */
    readonly registration: "agent" | "claimable" | null;
    /** A renewal grant is offered: refresh, or with auth.md the JWT-bearer exchange of its assertion. */
    readonly renewal: boolean;
    /** A revocation endpoint is named. */
    readonly revocation: boolean;
}
/** Server metadata for exactly this issuer (RFC 8414 §3.3), or null. */
export declare function readAuthorizationServer(document: unknown, issuer: string): AuthorizationServerMetadata | null;
/** The client id a dynamic registration returned, or null. */
export declare function registeredClientId(document: unknown): string | null;
/**
 * The PKCE authorization request a probe sends: Sourcey's client, its redirect
 * URI, a challenge derived from the run's nonce, and the resource and scope the
 * chain named. Sourcey never redeems a code, so the verifier is never sent.
 */
export declare function authorizationRequestUrl(input: {
    readonly authorizationEndpoint: string;
    readonly clientId: string;
    readonly resource: string;
    readonly scopes: readonly string[];
    readonly nonce: string;
}): string;
/**
 * Whether an answered authorization request reached consent: the server
 * accepted it and moved to the person's sign-in or consent, answering with a
 * page (2xx HTML) or redirecting, with no `error`, anywhere but back to
 * Sourcey. A redirect back carries an error or a code Sourcey discards; a
 * redirect carrying `error` refused the client; any other answer refused it
 * too. An unanswered request is residue (`probeUnanswered`) and never read here.
 */
export declare function consentReached(record: ExchangeRecord): boolean;
//# sourceMappingURL=authority.d.ts.map