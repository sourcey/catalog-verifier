export const AI_CATALOG_ENTRIES_REQUIREMENT = {
    namespace: "ai-catalog",
    version: "1.0",
    requirement_id: "document.entries",
    relation: "tests",
};
export const OPENAPI_REQUIREMENTS = {
    responses: {
        namespace: "openapi",
        version: "3.1.2",
        requirement_id: "operations.responses",
        relation: "tests",
    },
    errorResponses: {
        namespace: "openapi",
        version: "3.1.2",
        requirement_id: "operations.error-responses",
        relation: "tests",
    },
    oauth: {
        namespace: "openapi",
        version: "3.1.2",
        requirement_id: "security.oauth2-or-openid-connect",
        relation: "tests",
    },
};
export const MCP_REQUIREMENTS = {
    protocolVersion: {
        namespace: "mcp",
        version: "2026-07-28",
        requirement_id: "server.protocol-version",
        relation: "tests",
    },
    toolInputSchema: {
        namespace: "mcp",
        version: "2026-07-28",
        requirement_id: "tools.input-schema",
        relation: "tests",
    },
    errorResponse: {
        namespace: "mcp",
        version: "2026-07-28",
        requirement_id: "protocol.error-response",
        relation: "tests",
    },
};
export const OAUTH_AUTHORIZATION_SERVER_REQUIREMENTS = {
    authorizationCode: {
        namespace: "oauth-as-metadata",
        version: "rfc8414",
        requirement_id: "grant.authorization_code",
        relation: "tests",
    },
    clientCredentials: {
        namespace: "oauth-as-metadata",
        version: "rfc8414",
        requirement_id: "grant.client_credentials",
        relation: "tests",
    },
    deviceCode: {
        namespace: "oauth-as-metadata",
        version: "rfc8414",
        requirement_id: "grant.device_code",
        relation: "tests",
    },
    pkceS256: {
        namespace: "oauth-as-metadata",
        version: "rfc8414",
        requirement_id: "pkce.s256",
        relation: "tests",
    },
    scopes: {
        namespace: "oauth-as-metadata",
        version: "rfc8414",
        requirement_id: "scopes.supported",
        relation: "tests",
    },
    revocation: {
        namespace: "oauth-as-metadata",
        version: "rfc8414",
        requirement_id: "revocation.endpoint",
        relation: "tests",
    },
};
export const OAUTH_PROTECTED_RESOURCE_REQUIREMENTS = {
    authorizationServers: {
        namespace: "oauth-protected-resource-metadata",
        version: "rfc9728",
        requirement_id: "authorization-servers.advertised",
        relation: "tests",
    },
    bearerHeader: {
        namespace: "oauth-protected-resource-metadata",
        version: "rfc9728",
        requirement_id: "bearer.header",
        relation: "tests",
    },
};
//# sourceMappingURL=current-policy-standards.js.map