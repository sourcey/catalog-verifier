import { z } from "zod";
import { type AgentReadinessJob } from "./jobs.js";
type AgentReadinessTemplateReference = {
    readonly kind: "input";
    readonly name: string;
} | {
    readonly kind: "nonce";
} | {
    readonly kind: "sink";
    readonly name: string;
} | {
    readonly kind: "call";
    readonly callId: string;
    readonly pointer: string;
};
/** The references a template makes, or null when any `{{` is not a valid placeholder. */
export declare function agentReadinessTemplateReferences(template: string): readonly AgentReadinessTemplateReference[] | null;
/** Every template string in a JSON template value. */
export declare function agentReadinessJsonTemplates(value: unknown): readonly string[];
type AgentReadinessFields = readonly (readonly [string, string])[];
/**
 * What a request observation's pointer reads in what a call sends. For an HTTP
 * call, `/query` holds each URL query parameter by name and `/body` the JSON
 * body, each form field by name, or null; for an MCP call, `/arguments` holds
 * the tool's arguments. A name sent more than once holds its values in order.
 */
export declare function agentReadinessRequestDocument(request: {
    readonly query: AgentReadinessFields;
    readonly body: {
        readonly json: unknown;
    } | {
        readonly form: AgentReadinessFields;
    } | null;
} | {
    readonly arguments: unknown;
}): Readonly<Record<string, unknown>>;
/** A call's request document as its templates write it: the template each location sends. */
export declare function agentReadinessRequestTemplate(call: AgentReadinessCall): Readonly<Record<string, unknown>>;
/** Headers a binding or a job operation never sets: the transport and the runner's custody do. */
export declare const AGENT_READINESS_RESERVED_HEADERS: ReadonlySet<string>;
declare const agentReadinessCallSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    kind: z.ZodLiteral<"http">;
    call_id: z.ZodString;
    endpoint_id: z.ZodString;
    method: z.ZodEnum<{
        DELETE: "DELETE";
        GET: "GET";
        HEAD: "HEAD";
        PATCH: "PATCH";
        POST: "POST";
        PUT: "PUT";
    }>;
    url: z.ZodString;
    headers: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodString;
    }, z.core.$strict>>;
    body: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
        media_type: z.ZodLiteral<"application/json">;
        json: z.ZodJSONSchema;
    }, z.core.$strict>, z.ZodObject<{
        media_type: z.ZodLiteral<"application/x-www-form-urlencoded">;
        form: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            value: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>], "media_type">>;
    credentials: z.ZodArray<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"mcp">;
    call_id: z.ZodString;
    endpoint_id: z.ZodString;
    tool: z.ZodString;
    arguments: z.ZodJSONSchema;
    credentials: z.ZodArray<z.ZodString>;
}, z.core.$strict>], "kind">;
export type AgentReadinessCall = z.infer<typeof agentReadinessCallSchema>;
/** One credential the binding uses: its role, how it travels, and where it may go. */
declare const agentReadinessCredentialDeclarationSchema: z.ZodObject<{
    role: z.ZodString;
    placement: z.ZodUnion<readonly [z.ZodObject<{
        scheme: z.ZodEnum<{
            basic: "basic";
            bearer: "bearer";
        }>;
        header_name: z.ZodLiteral<"authorization">;
    }, z.core.$strict>, z.ZodObject<{
        scheme: z.ZodLiteral<"header">;
        header_name: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        scheme: z.ZodLiteral<"form">;
        field: z.ZodString;
    }, z.core.$strict>]>;
    endpoint_ids: z.ZodArray<z.ZodString>;
    methods: z.ZodArray<z.ZodEnum<{
        DELETE: "DELETE";
        GET: "GET";
        HEAD: "HEAD";
        PATCH: "PATCH";
        POST: "POST";
        PUT: "PUT";
    }>>;
}, z.core.$strict>;
export type AgentReadinessCredentialDeclaration = z.infer<typeof agentReadinessCredentialDeclarationSchema>;
/** A credential a successful response issues, kept under its role by the runner's custody. */
declare const agentReadinessKeptCredentialSchema: z.ZodObject<{
    role: z.ZodString;
    placement: z.ZodUnion<readonly [z.ZodObject<{
        scheme: z.ZodEnum<{
            basic: "basic";
            bearer: "bearer";
        }>;
        header_name: z.ZodLiteral<"authorization">;
    }, z.core.$strict>, z.ZodObject<{
        scheme: z.ZodLiteral<"header">;
        header_name: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        scheme: z.ZodLiteral<"form">;
        field: z.ZodString;
    }, z.core.$strict>]>;
    endpoint_ids: z.ZodArray<z.ZodString>;
    methods: z.ZodArray<z.ZodEnum<{
        DELETE: "DELETE";
        GET: "GET";
        HEAD: "HEAD";
        PATCH: "PATCH";
        POST: "POST";
        PUT: "PUT";
    }>>;
    pointer: z.ZodString;
    expires_in_pointer: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export type AgentReadinessKeptCredential = z.infer<typeof agentReadinessKeptCredentialSchema>;
export declare const agentReadinessJobBindingSchema: z.ZodObject<{
    binding_id: z.ZodString;
    interface_id: z.ZodString;
    calls: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"http">;
        call_id: z.ZodString;
        endpoint_id: z.ZodString;
        method: z.ZodEnum<{
            DELETE: "DELETE";
            GET: "GET";
            HEAD: "HEAD";
            PATCH: "PATCH";
            POST: "POST";
            PUT: "PUT";
        }>;
        url: z.ZodString;
        headers: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            value: z.ZodString;
        }, z.core.$strict>>;
        body: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
            media_type: z.ZodLiteral<"application/json">;
            json: z.ZodJSONSchema;
        }, z.core.$strict>, z.ZodObject<{
            media_type: z.ZodLiteral<"application/x-www-form-urlencoded">;
            form: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                value: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>], "media_type">>;
        credentials: z.ZodArray<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"mcp">;
        call_id: z.ZodString;
        endpoint_id: z.ZodString;
        tool: z.ZodString;
        arguments: z.ZodJSONSchema;
        credentials: z.ZodArray<z.ZodString>;
    }, z.core.$strict>], "kind">>;
    assertions: z.ZodArray<z.ZodObject<{
        assertion: z.ZodString;
        observations: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            call: z.ZodString;
            source: z.ZodEnum<{
                json: "json";
                request: "request";
                stream: "stream";
            }>;
            pointer: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    delegation: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"none">;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"entered">;
        credentials: z.ZodArray<z.ZodObject<{
            role: z.ZodString;
            placement: z.ZodUnion<readonly [z.ZodObject<{
                scheme: z.ZodEnum<{
                    basic: "basic";
                    bearer: "bearer";
                }>;
                header_name: z.ZodLiteral<"authorization">;
            }, z.core.$strict>, z.ZodObject<{
                scheme: z.ZodLiteral<"header">;
                header_name: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                scheme: z.ZodLiteral<"form">;
                field: z.ZodString;
            }, z.core.$strict>]>;
            endpoint_ids: z.ZodArray<z.ZodString>;
            methods: z.ZodArray<z.ZodEnum<{
                DELETE: "DELETE";
                GET: "GET";
                HEAD: "HEAD";
                PATCH: "PATCH";
                POST: "POST";
                PUT: "PUT";
            }>>;
        }, z.core.$strict>>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"oauth">;
        authorization_endpoint_id: z.ZodString;
        token_endpoint_id: z.ZodString;
        client: z.ZodEnum<{
            client_id_metadata_document: "client_id_metadata_document";
            dynamic_registration: "dynamic_registration";
            preregistered: "preregistered";
        }>;
        scopes: z.ZodArray<z.ZodString>;
        keep: z.ZodArray<z.ZodObject<{
            role: z.ZodString;
            placement: z.ZodUnion<readonly [z.ZodObject<{
                scheme: z.ZodEnum<{
                    basic: "basic";
                    bearer: "bearer";
                }>;
                header_name: z.ZodLiteral<"authorization">;
            }, z.core.$strict>, z.ZodObject<{
                scheme: z.ZodLiteral<"header">;
                header_name: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                scheme: z.ZodLiteral<"form">;
                field: z.ZodString;
            }, z.core.$strict>]>;
            endpoint_ids: z.ZodArray<z.ZodString>;
            methods: z.ZodArray<z.ZodEnum<{
                DELETE: "DELETE";
                GET: "GET";
                HEAD: "HEAD";
                PATCH: "PATCH";
                POST: "POST";
                PUT: "PUT";
            }>>;
            pointer: z.ZodString;
            expires_in_pointer: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
    }, z.core.$strict>, z.ZodObject<{
        call: z.ZodObject<{
            kind: z.ZodLiteral<"http">;
            call_id: z.ZodString;
            endpoint_id: z.ZodString;
            method: z.ZodEnum<{
                DELETE: "DELETE";
                GET: "GET";
                HEAD: "HEAD";
                PATCH: "PATCH";
                POST: "POST";
                PUT: "PUT";
            }>;
            url: z.ZodString;
            headers: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                value: z.ZodString;
            }, z.core.$strict>>;
            body: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
                media_type: z.ZodLiteral<"application/json">;
                json: z.ZodJSONSchema;
            }, z.core.$strict>, z.ZodObject<{
                media_type: z.ZodLiteral<"application/x-www-form-urlencoded">;
                form: z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    value: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>], "media_type">>;
            credentials: z.ZodArray<z.ZodString>;
        }, z.core.$strict>;
        keep: z.ZodArray<z.ZodObject<{
            role: z.ZodString;
            placement: z.ZodUnion<readonly [z.ZodObject<{
                scheme: z.ZodEnum<{
                    basic: "basic";
                    bearer: "bearer";
                }>;
                header_name: z.ZodLiteral<"authorization">;
            }, z.core.$strict>, z.ZodObject<{
                scheme: z.ZodLiteral<"header">;
                header_name: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                scheme: z.ZodLiteral<"form">;
                field: z.ZodString;
            }, z.core.$strict>]>;
            endpoint_ids: z.ZodArray<z.ZodString>;
            methods: z.ZodArray<z.ZodEnum<{
                DELETE: "DELETE";
                GET: "GET";
                HEAD: "HEAD";
                PATCH: "PATCH";
                POST: "POST";
                PUT: "PUT";
            }>>;
            pointer: z.ZodString;
            expires_in_pointer: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
        kind: z.ZodLiteral<"minted">;
        from: z.ZodObject<{
            role: z.ZodString;
            placement: z.ZodUnion<readonly [z.ZodObject<{
                scheme: z.ZodEnum<{
                    basic: "basic";
                    bearer: "bearer";
                }>;
                header_name: z.ZodLiteral<"authorization">;
            }, z.core.$strict>, z.ZodObject<{
                scheme: z.ZodLiteral<"header">;
                header_name: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                scheme: z.ZodLiteral<"form">;
                field: z.ZodString;
            }, z.core.$strict>]>;
            endpoint_ids: z.ZodArray<z.ZodString>;
            methods: z.ZodArray<z.ZodEnum<{
                DELETE: "DELETE";
                GET: "GET";
                HEAD: "HEAD";
                PATCH: "PATCH";
                POST: "POST";
                PUT: "PUT";
            }>>;
        }, z.core.$strict>;
    }, z.core.$strict>], "kind">;
    payment: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"none">;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"prepaid_balance">;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"per_call">;
        protocol: z.ZodEnum<{
            mpp: "mpp";
            x402: "x402";
        }>;
    }, z.core.$strict>], "kind">;
    cleanup: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"http">;
        call_id: z.ZodString;
        endpoint_id: z.ZodString;
        method: z.ZodEnum<{
            DELETE: "DELETE";
            GET: "GET";
            HEAD: "HEAD";
            PATCH: "PATCH";
            POST: "POST";
            PUT: "PUT";
        }>;
        url: z.ZodString;
        headers: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            value: z.ZodString;
        }, z.core.$strict>>;
        body: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
            media_type: z.ZodLiteral<"application/json">;
            json: z.ZodJSONSchema;
        }, z.core.$strict>, z.ZodObject<{
            media_type: z.ZodLiteral<"application/x-www-form-urlencoded">;
            form: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                value: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>], "media_type">>;
        credentials: z.ZodArray<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"mcp">;
        call_id: z.ZodString;
        endpoint_id: z.ZodString;
        tool: z.ZodString;
        arguments: z.ZodJSONSchema;
        credentials: z.ZodArray<z.ZodString>;
    }, z.core.$strict>], "kind">>;
}, z.core.$strict>;
export type AgentReadinessJobBinding = z.infer<typeof agentReadinessJobBindingSchema>;
/** Every call a binding can make, with the calls each may read. */
export declare function agentReadinessBindingCalls(binding: Pick<AgentReadinessJobBinding, "calls" | "delegation" | "cleanup">): readonly {
    readonly call: AgentReadinessCall;
    readonly mayRead: readonly string[];
}[];
/** Every template string a call sends. */
export declare function agentReadinessCallTemplates(call: AgentReadinessCall): readonly string[];
/** The declared surfaces a job operation or binding resolves against. */
export interface AgentReadinessDeclaredSurfaces {
    readonly endpoints: readonly {
        readonly endpoint_id: string;
        readonly uri: string;
        readonly transport: string;
        readonly roles: readonly string[];
    }[];
    readonly interfaces: readonly {
        readonly interface_id: string;
        readonly modality: string;
        readonly functions: readonly string[];
        readonly endpoint_ids: readonly string[];
    }[];
}
/**
 * Each binding performs the job through its own interface: that interface is
 * declared, every call it makes uses one of the interface's HTTP endpoints and
 * keeps that endpoint's origin, and every credential reaches only declared
 * endpoints. Whether it performs the right job is checked against the job
 * library, which a declaration does not carry.
 */
export declare function validateDeclaredJobBindings(value: AgentReadinessDeclaredSurfaces & {
    readonly job_bindings: readonly AgentReadinessJobBinding[];
}, context: z.RefinementCtx): void;
/**
 * Why a binding cannot perform its library job, or nothing. A binding maps
 * every library observation exactly once, reads only the job's inputs and sinks,
 * places the run's nonce wherever it locates a request observation, and cleans
 * up when the job is consequential. Whether its calls stay on its declared
 * surface is the declaration's own rule, checked where it is parsed.
 */
export declare function agentReadinessBindingIssues(input: {
    readonly job: AgentReadinessJob;
    readonly binding: AgentReadinessJobBinding;
}): readonly string[];
export {};
//# sourceMappingURL=binding.d.ts.map