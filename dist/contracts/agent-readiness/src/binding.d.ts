import { z } from "zod";
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
/** A credential a successful response issues, kept by custody under its role. */
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
                stream: "stream";
            }>;
            pointer: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    error_probe: z.ZodObject<{
        call: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
        expect: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"http_error">;
            status_class: z.ZodLiteral<"4xx">;
            error_pointer: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"mcp_error">;
        }, z.core.$strict>], "kind">;
    }, z.core.$strict>;
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
    sustain: z.ZodObject<{
        rotation: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"not_applicable">;
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
            kind: z.ZodLiteral<"refresh">;
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
            kind: z.ZodLiteral<"mint">;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"manual">;
        }, z.core.$strict>], "kind">;
        revocation: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"not_applicable">;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"call">;
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
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"manual">;
        }, z.core.$strict>], "kind">;
        verification: z.ZodOptional<z.ZodObject<{
            probe: z.ZodObject<{
                kind: z.ZodLiteral<"http">;
                call_id: z.ZodString;
                endpoint_id: z.ZodString;
                url: z.ZodString;
                headers: z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    value: z.ZodString;
                }, z.core.$strict>>;
                method: z.ZodLiteral<"GET">;
                body: z.ZodNull;
                credentials: z.ZodArray<z.ZodString>;
            }, z.core.$strict>;
            control: z.ZodObject<{
                kind: z.ZodLiteral<"http">;
                call_id: z.ZodString;
                endpoint_id: z.ZodString;
                url: z.ZodString;
                headers: z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    value: z.ZodString;
                }, z.core.$strict>>;
                method: z.ZodLiteral<"GET">;
                body: z.ZodNull;
                credentials: z.ZodArray<z.ZodString>;
            }, z.core.$strict>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
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
export declare function agentReadinessBindingCalls(binding: Pick<AgentReadinessJobBinding, "calls" | "error_probe" | "delegation" | "sustain" | "cleanup">): readonly {
    readonly call: AgentReadinessCall;
    readonly mayRead: readonly string[];
}[];
export {};
//# sourceMappingURL=binding.d.ts.map