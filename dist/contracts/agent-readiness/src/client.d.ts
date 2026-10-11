/**
 * Sourcey's agent as an OAuth client, the one way it identifies itself to an
 * authorization server a probe reaches (north star §5.2, the authority chain).
 * Cloud serves this document at its client id; a server that supports Client
 * ID Metadata Documents fetches it, and dynamic registration sends the same
 * metadata without the client id. Sourcey never completes a flow: its
 * redirect URI discards any code.
 */
export declare const AGENT_READINESS_CLIENT_ID = "https://api.sourcey.com/.well-known/agent-readiness/client.json";
export declare const AGENT_READINESS_REDIRECT_URI = "https://api.sourcey.com/.well-known/agent-readiness/callback";
/** What a dynamic registration asks for: a public client that never holds a secret. */
export declare const AGENT_READINESS_CLIENT_REGISTRATION: Readonly<{
    client_name: "Sourcey Agent Readiness";
    client_uri: "https://sourcey.com/agent-readiness";
    redirect_uris: readonly string[];
    grant_types: readonly string[];
    response_types: readonly string[];
    token_endpoint_auth_method: "none";
}>;
/** The Client ID Metadata Document served at the client id. */
export declare const AGENT_READINESS_CLIENT_METADATA_DOCUMENT: Readonly<{
    client_name: "Sourcey Agent Readiness";
    client_uri: "https://sourcey.com/agent-readiness";
    redirect_uris: readonly string[];
    grant_types: readonly string[];
    response_types: readonly string[];
    token_endpoint_auth_method: "none";
    client_id: "https://api.sourcey.com/.well-known/agent-readiness/client.json";
}>;
//# sourceMappingURL=client.d.ts.map