/**
 * When a discovery fact names a job's endpoint (north star §5.2, Discover).
 * The engine rates Discover by this rule, and a card marks the surface the
 * job's request reached by the same one.
 */
/**
 * Facts that name an interface an agent can call; others (metadata,
 * registration) do not. An API catalog names an API through the OpenAPI it
 * links to, whose servers are `openapi_server` facts; its anchor alone does
 * not. An ARD entry names its artifact, not the service (ARD §5.3.2): the
 * card or OpenAPI document it carries or links to names the endpoint.
 */
export declare const AGENT_READINESS_NAMING_FACTS: ReadonlySet<string>;
/** A URL names an endpoint when it gives its exact URI or a base the URI sits under. */
export declare function agentReadinessNamesEndpoint(value: string, uri: string): boolean;
/** A discovery fact that names the endpoint: one of the naming facts, naming it. */
export declare function agentReadinessFactNamesEndpoint(fact: {
    readonly fact: string;
    readonly value: string;
}, uri: string): boolean;
//# sourceMappingURL=naming.d.ts.map