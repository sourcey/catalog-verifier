/**
 * Sourcey's agent as an OAuth client, the one way it identifies itself to an
 * authorization server a probe reaches (north star §5.2, the authority chain).
 * Cloud serves this document at its client id; a server that supports Client
 * ID Metadata Documents fetches it, and dynamic registration sends the same
 * metadata without the client id. Sourcey never completes a flow: its
 * redirect URI discards any code.
 */
export const AGENT_READINESS_CLIENT_ID = "https://api.sourcey.com/.well-known/agent-readiness/client.json";
export const AGENT_READINESS_REDIRECT_URI = "https://api.sourcey.com/.well-known/agent-readiness/callback";
/** What a dynamic registration asks for: a public client that never holds a secret. */
export const AGENT_READINESS_CLIENT_REGISTRATION = Object.freeze({
    client_name: "Sourcey Agent Readiness",
    client_uri: "https://sourcey.com/agent-readiness",
    redirect_uris: Object.freeze([AGENT_READINESS_REDIRECT_URI]),
    grant_types: Object.freeze(["authorization_code"]),
    response_types: Object.freeze(["code"]),
    token_endpoint_auth_method: "none",
});
/** The Client ID Metadata Document served at the client id. */
export const AGENT_READINESS_CLIENT_METADATA_DOCUMENT = Object.freeze({
    client_id: AGENT_READINESS_CLIENT_ID,
    ...AGENT_READINESS_CLIENT_REGISTRATION,
});
//# sourceMappingURL=client.js.map