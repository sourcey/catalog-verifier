/**
 * When a discovery fact names a job's endpoint (north star §5.2, Discover).
 * The engine rates Discover by this rule, and a card marks the surface the
 * job's request reached by the same one.
 */
/**
 * Facts that name an interface an agent can call; others (metadata,
 * registration) do not. An API catalog names an API through the OpenAPI it
 * links to, whose servers are `openapi_server` facts; its anchor alone does not.
 */
export const AGENT_READINESS_NAMING_FACTS = new Set([
    "mcp_endpoint",
    "ard_entry",
    "openapi_server",
    "oauth_protected_resource",
    "documentation_route",
]);
/** A URL names an endpoint when it gives its exact URI or a base the URI sits under. */
export function agentReadinessNamesEndpoint(value, uri) {
    const base = value.replace(/[?#].*$/u, "").replace(/\/+$/u, "");
    const endpoint = uri.replace(/[?#].*$/u, "").replace(/\/+$/u, "");
    return endpoint === base || endpoint.startsWith(`${base}/`);
}
/** A discovery fact that names the endpoint: one of the naming facts, naming it. */
export function agentReadinessFactNamesEndpoint(fact, uri) {
    return (AGENT_READINESS_NAMING_FACTS.has(fact.fact) && agentReadinessNamesEndpoint(fact.value, uri));
}
//# sourceMappingURL=naming.js.map