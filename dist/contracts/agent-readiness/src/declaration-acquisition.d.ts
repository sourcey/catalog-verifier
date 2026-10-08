import { z } from "zod";
export declare const agentReadinessDraftSubjectSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    kind: z.ZodLiteral<"entity_id">;
    value: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"slug">;
    value: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"domain">;
    value: z.ZodString;
}, z.core.$strict>], "kind">;
/**
 * Transient command input. Its semantic fields are composed directly from the
 * canonical declaration schemas; only deterministic authoring boilerplate is
 * absent. This object is never a repository format or release record.
 */
export declare const agentReadinessDeclarationDraftRequestSchema: z.ZodObject<{
    command_contract: z.ZodLiteral<"sourcey.agent-readiness-declaration-draft/v1alpha1">;
    subject: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"entity_id">;
        value: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"slug">;
        value: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"domain">;
        value: z.ZodString;
    }, z.core.$strict>], "kind">>;
    scope: z.ZodOptional<z.ZodObject<{
        product: z.ZodObject<{
            key: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>;
        job: z.ZodObject<{
            key: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>>;
    scope_source_uris: z.ZodDefault<z.ZodArray<z.ZodURL>>;
    subject_roles: z.ZodDefault<z.ZodArray<z.ZodEnum<{
        access_operator: "access_operator";
        identity_provider: "identity_provider";
        operations_provider: "operations_provider";
        payment_provider: "payment_provider";
        provisioning_provider: "provisioning_provider";
    }>>>;
    job_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
        binding: z.ZodObject<{
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
        source_uris: z.ZodArray<z.ZodURL>;
    }, z.core.$strict>>>;
    participants: z.ZodDefault<z.ZodArray<z.ZodObject<{
        participant_id: z.ZodString;
        roles: z.ZodArray<z.ZodEnum<{
            access_operator: "access_operator";
            identity_provider: "identity_provider";
            operations_provider: "operations_provider";
            payment_provider: "payment_provider";
            provisioning_provider: "provisioning_provider";
        }>>;
        identity: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"entity_id">;
            entity_id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"origin_uri">;
            uri: z.ZodURL;
        }, z.core.$strict>], "kind">;
        source_uris: z.ZodArray<z.ZodURL>;
    }, z.core.$strict>>>;
    resources: z.ZodDefault<z.ZodArray<z.ZodObject<{
        resource_id: z.ZodString;
        uri: z.ZodURL;
        roles: z.ZodArray<z.ZodEnum<{
            access: "access";
            authentication: "authentication";
            checkout: "checkout";
            descriptor: "descriptor";
            discovery: "discovery";
            documentation: "documentation";
            eligibility: "eligibility";
            operations: "operations";
            policy: "policy";
            pricing: "pricing";
            provisioning: "provisioning";
            recovery: "recovery";
            status: "status";
            terms: "terms";
        }>>;
        operated_by_participant_id: z.ZodString;
        standard_bindings: z.ZodArray<z.ZodObject<{
            namespace: z.ZodString;
            version: z.ZodString;
            relation: z.ZodEnum<{
                declares: "declares";
                describes: "describes";
                implements: "implements";
                uses: "uses";
            }>;
        }, z.core.$strict>>;
        allowed_redirect_hosts: z.ZodOptional<z.ZodArray<z.ZodString>>;
        source_uris: z.ZodArray<z.ZodURL>;
    }, z.core.$strict>>>;
    endpoints: z.ZodDefault<z.ZodArray<z.ZodObject<{
        endpoint_id: z.ZodString;
        uri: z.ZodURL;
        transport: z.ZodEnum<{
            grpc: "grpc";
            http: "http";
            websocket: "websocket";
        }>;
        roles: z.ZodArray<z.ZodEnum<{
            authorization: "authorization";
            checkout: "checkout";
            protected_resource: "protected_resource";
            recovery: "recovery";
            registration: "registration";
            service: "service";
            status: "status";
            token: "token";
            webhook: "webhook";
        }>>;
        operated_by_participant_id: z.ZodString;
        standard_bindings: z.ZodArray<z.ZodObject<{
            namespace: z.ZodString;
            version: z.ZodString;
            relation: z.ZodEnum<{
                declares: "declares";
                describes: "describes";
                implements: "implements";
                uses: "uses";
            }>;
        }, z.core.$strict>>;
        allowed_redirect_hosts: z.ZodOptional<z.ZodArray<z.ZodString>>;
        source_uris: z.ZodArray<z.ZodURL>;
    }, z.core.$strict>>>;
    interfaces: z.ZodDefault<z.ZodArray<z.ZodObject<{
        interface_id: z.ZodString;
        modality: z.ZodEnum<{
            agent_service: "agent_service";
            command_line: "command_line";
            network_api: "network_api";
            software_library: "software_library";
            tool_server: "tool_server";
            web_application: "web_application";
        }>;
        functions: z.ZodArray<z.ZodEnum<{
            authentication: "authentication";
            commerce: "commerce";
            events: "events";
            recovery: "recovery";
            service_operation: "service_operation";
        }>>;
        endpoint_ids: z.ZodArray<z.ZodString>;
        resource_ids: z.ZodArray<z.ZodString>;
        operated_by_participant_id: z.ZodString;
        standard_bindings: z.ZodArray<z.ZodObject<{
            namespace: z.ZodString;
            version: z.ZodString;
            relation: z.ZodEnum<{
                declares: "declares";
                describes: "describes";
                implements: "implements";
                uses: "uses";
            }>;
        }, z.core.$strict>>;
        source_uris: z.ZodArray<z.ZodURL>;
    }, z.core.$strict>>>;
    relations: z.ZodDefault<z.ZodArray<z.ZodObject<{
        relation_id: z.ZodString;
        kind: z.ZodEnum<{
            alternative_to: "alternative_to";
            authenticates: "authenticates";
            describes: "describes";
            precedes: "precedes";
            requires: "requires";
        }>;
        from: z.ZodObject<{
            node_kind: z.ZodEnum<{
                endpoint: "endpoint";
                interface: "interface";
                resource: "resource";
                surface_exclusion: "surface_exclusion";
            }>;
            node_id: z.ZodString;
        }, z.core.$strict>;
        to: z.ZodObject<{
            node_kind: z.ZodEnum<{
                endpoint: "endpoint";
                interface: "interface";
                resource: "resource";
                surface_exclusion: "surface_exclusion";
            }>;
            node_id: z.ZodString;
        }, z.core.$strict>;
        source_uris: z.ZodArray<z.ZodURL>;
    }, z.core.$strict>>>;
    offer_relations: z.ZodDefault<z.ZodArray<z.ZodObject<{
        offer_relation_proposal_id: z.ZodString;
        offer_id: z.ZodString;
        purpose: z.ZodEnum<{
            application_path: "application_path";
            operating_path: "operating_path";
            redemption_path: "redemption_path";
        }>;
        source_uris: z.ZodArray<z.ZodURL>;
    }, z.core.$strict>>>;
    surface_exclusions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        exclusion_id: z.ZodString;
        role: z.ZodEnum<{
            access: "access";
            authentication: "authentication";
            checkout: "checkout";
            descriptor: "descriptor";
            discovery: "discovery";
            documentation: "documentation";
            eligibility: "eligibility";
            operations: "operations";
            policy: "policy";
            pricing: "pricing";
            provisioning: "provisioning";
            recovery: "recovery";
            status: "status";
            terms: "terms";
        }>;
        rationale: z.ZodString;
        source_uris: z.ZodArray<z.ZodURL>;
    }, z.core.$strict>>>;
    authority_intent: z.ZodOptional<z.ZodEnum<{
        community: "community";
        entity: "entity";
    }>>;
    declared_at: z.ZodOptional<z.ZodISODateTime>;
    base_authoring_file: z.ZodOptional<z.ZodObject<{
        path: z.ZodString;
        content: z.ZodString;
        content_digest: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessDraftDiagnosticSchema: z.ZodObject<{
    code: z.ZodEnum<{
        ambiguous_identity: "ambiguous_identity";
        base_authoring_mismatch: "base_authoring_mismatch";
        cross_entity_offer: "cross_entity_offer";
        invalid: "invalid";
        required: "required";
    }>;
    path: z.ZodString;
    message: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessDeclarationDraftResultSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    status: z.ZodLiteral<"invalid">;
    diagnostics: z.ZodArray<z.ZodObject<{
        code: z.ZodEnum<{
            ambiguous_identity: "ambiguous_identity";
            base_authoring_mismatch: "base_authoring_mismatch";
            cross_entity_offer: "cross_entity_offer";
            invalid: "invalid";
            required: "required";
        }>;
        path: z.ZodString;
        message: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>, z.ZodObject<{
    status: z.ZodLiteral<"identity_allocation_required">;
    diagnostics: z.ZodArray<z.ZodObject<{
        code: z.ZodEnum<{
            ambiguous_identity: "ambiguous_identity";
            base_authoring_mismatch: "base_authoring_mismatch";
            cross_entity_offer: "cross_entity_offer";
            invalid: "invalid";
            required: "required";
        }>;
        path: z.ZodString;
        message: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>, z.ZodObject<{
    base_release_id: z.ZodString;
    entity_id: z.ZodString;
    entity_revision_digest: z.ZodString;
    status: z.ZodLiteral<"incomplete">;
    diagnostics: z.ZodArray<z.ZodObject<{
        code: z.ZodEnum<{
            ambiguous_identity: "ambiguous_identity";
            base_authoring_mismatch: "base_authoring_mismatch";
            cross_entity_offer: "cross_entity_offer";
            invalid: "invalid";
            required: "required";
        }>;
        path: z.ZodString;
        message: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>, z.ZodObject<{
    status: z.ZodLiteral<"conflict">;
    base_release_id: z.ZodString;
    entity_id: z.ZodOptional<z.ZodString>;
    entity_revision_digest: z.ZodOptional<z.ZodString>;
    diagnostics: z.ZodArray<z.ZodObject<{
        code: z.ZodEnum<{
            ambiguous_identity: "ambiguous_identity";
            base_authoring_mismatch: "base_authoring_mismatch";
            cross_entity_offer: "cross_entity_offer";
            invalid: "invalid";
            required: "required";
        }>;
        path: z.ZodString;
        message: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>, z.ZodObject<{
    base_release_id: z.ZodString;
    entity_id: z.ZodString;
    entity_revision_digest: z.ZodString;
    status: z.ZodLiteral<"materialized">;
    subject_display: z.ZodObject<{
        slug: z.ZodString;
        name: z.ZodString;
    }, z.core.$strict>;
    scope: z.ZodObject<{
        product: z.ZodObject<{
            key: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>;
        job: z.ZodObject<{
            key: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>;
    declaration_id: z.ZodString;
    authoring_file: z.ZodObject<{
        path: z.ZodString;
        content: z.ZodString;
        content_digest: z.ZodString;
    }, z.core.$strict>;
    submission: z.ZodObject<{
        method: z.ZodLiteral<"POST">;
        path: z.ZodLiteral<"/v1/submissions">;
        product: z.ZodLiteral<"agent_readiness">;
    }, z.core.$strict>;
    diagnostics: z.ZodArray<z.ZodObject<{
        code: z.ZodEnum<{
            ambiguous_identity: "ambiguous_identity";
            base_authoring_mismatch: "base_authoring_mismatch";
            cross_entity_offer: "cross_entity_offer";
            invalid: "invalid";
            required: "required";
        }>;
        path: z.ZodString;
        message: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>], "status">;
export type AgentReadinessDeclarationDraftRequest = z.infer<typeof agentReadinessDeclarationDraftRequestSchema>;
export type AgentReadinessDeclarationDraftResult = z.infer<typeof agentReadinessDeclarationDraftResultSchema>;
//# sourceMappingURL=declaration-acquisition.d.ts.map