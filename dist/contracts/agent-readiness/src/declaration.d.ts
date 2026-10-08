import { z } from "zod";
export { AGENT_READINESS_REPOSITORY, AGENT_READINESS_REPOSITORY_URL, agentReadinessDeclarationProvenanceSchema, agentReadinessDeclarationReferenceSchema, } from "./declaration-reference.js";
export declare const agentReadinessParticipantRoleSchema: z.ZodEnum<{
    access_operator: "access_operator";
    identity_provider: "identity_provider";
    operations_provider: "operations_provider";
    payment_provider: "payment_provider";
    provisioning_provider: "provisioning_provider";
    subject: "subject";
}>;
export declare const agentReadinessParticipantSchema: z.ZodObject<{
    participant_id: z.ZodString;
    roles: z.ZodArray<z.ZodEnum<{
        access_operator: "access_operator";
        identity_provider: "identity_provider";
        operations_provider: "operations_provider";
        payment_provider: "payment_provider";
        provisioning_provider: "provisioning_provider";
        subject: "subject";
    }>>;
    identity: z.ZodUnion<readonly [z.ZodObject<{
        entity_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        origin_source_id: z.ZodString;
    }, z.core.$strict>]>;
}, z.core.$strict>;
export declare const agentReadinessResourceSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const agentReadinessEndpointSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const agentReadinessDeclaredInterfaceSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const agentReadinessSurfaceRelationSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const agentReadinessOfferRelationPurposeSchema: z.ZodEnum<{
    application_path: "application_path";
    operating_path: "operating_path";
    redemption_path: "redemption_path";
}>;
export declare const agentReadinessOfferRelationProposalSchema: z.ZodObject<{
    offer_relation_proposal_id: z.ZodString;
    offer_id: z.ZodString;
    purpose: z.ZodEnum<{
        application_path: "application_path";
        operating_path: "operating_path";
        redemption_path: "redemption_path";
    }>;
}, z.core.$strict>;
export declare const agentReadinessSurfaceExclusionSchema: z.ZodObject<{
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
}, z.core.$strict>;
declare const agentReadinessDeclarationSchema: z.ZodObject<{
    declaration_id: z.ZodString;
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
    job_bindings: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strict>>;
    participants: z.ZodArray<z.ZodObject<{
        participant_id: z.ZodString;
        roles: z.ZodArray<z.ZodEnum<{
            access_operator: "access_operator";
            identity_provider: "identity_provider";
            operations_provider: "operations_provider";
            payment_provider: "payment_provider";
            provisioning_provider: "provisioning_provider";
            subject: "subject";
        }>>;
        identity: z.ZodUnion<readonly [z.ZodObject<{
            entity_id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            origin_source_id: z.ZodString;
        }, z.core.$strict>]>;
    }, z.core.$strict>>;
    resources: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strict>>;
    endpoints: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strict>>;
    interfaces: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strict>>;
    relations: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strict>>;
    offer_relations: z.ZodArray<z.ZodObject<{
        offer_relation_proposal_id: z.ZodString;
        offer_id: z.ZodString;
        purpose: z.ZodEnum<{
            application_path: "application_path";
            operating_path: "operating_path";
            redemption_path: "redemption_path";
        }>;
    }, z.core.$strict>>;
    source_bindings: z.ZodArray<z.ZodObject<{
        source_binding_id: z.ZodString;
        source_id: z.ZodString;
        field_paths: z.ZodArray<z.ZodString>;
        target: z.ZodObject<{
            node_kind: z.ZodEnum<{
                declaration: "declaration";
                endpoint: "endpoint";
                interface: "interface";
                job_binding: "job_binding";
                offer_relation: "offer_relation";
                participant: "participant";
                relation: "relation";
                resource: "resource";
                surface_exclusion: "surface_exclusion";
            }>;
            node_id: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>>;
    surface_exclusions: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strict>>;
    authority_intent: z.ZodEnum<{
        community: "community";
        entity: "entity";
    }>;
    declared_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const agentReadinessDeclarationRevisionContract: "sourcey.agent-readiness-declaration-revision/v1alpha1";
export declare const agentReadinessDeclarationRevisionCoreSchema: z.ZodObject<{
    revision_contract: z.ZodLiteral<"sourcey.agent-readiness-declaration-revision/v1alpha1">;
    entity_id: z.ZodString;
    declaration: z.ZodObject<{
        declaration_id: z.ZodString;
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
        job_bindings: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        participants: z.ZodArray<z.ZodObject<{
            participant_id: z.ZodString;
            roles: z.ZodArray<z.ZodEnum<{
                access_operator: "access_operator";
                identity_provider: "identity_provider";
                operations_provider: "operations_provider";
                payment_provider: "payment_provider";
                provisioning_provider: "provisioning_provider";
                subject: "subject";
            }>>;
            identity: z.ZodUnion<readonly [z.ZodObject<{
                entity_id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                origin_source_id: z.ZodString;
            }, z.core.$strict>]>;
        }, z.core.$strict>>;
        resources: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        endpoints: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        interfaces: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        relations: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        surface_exclusions: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        authority_intent: z.ZodEnum<{
            community: "community";
            entity: "entity";
        }>;
        declared_at: z.ZodISODateTime;
        source_bindings: z.ZodArray<z.ZodObject<{
            source_binding_id: z.ZodString;
            source_id: z.ZodString;
            field_paths: z.ZodArray<z.ZodString>;
            target: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    declaration: "declaration";
                    endpoint: "endpoint";
                    interface: "interface";
                    job_binding: "job_binding";
                    participant: "participant";
                    relation: "relation";
                    resource: "resource";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    sources: z.ZodArray<z.ZodObject<{
        source_id: z.ZodString;
        url: z.ZodURL;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessDeclarationRevisionSchema: z.ZodObject<{
    revision_contract: z.ZodLiteral<"sourcey.agent-readiness-declaration-revision/v1alpha1">;
    entity_id: z.ZodString;
    declaration: z.ZodObject<{
        declaration_id: z.ZodString;
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
        job_bindings: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        participants: z.ZodArray<z.ZodObject<{
            participant_id: z.ZodString;
            roles: z.ZodArray<z.ZodEnum<{
                access_operator: "access_operator";
                identity_provider: "identity_provider";
                operations_provider: "operations_provider";
                payment_provider: "payment_provider";
                provisioning_provider: "provisioning_provider";
                subject: "subject";
            }>>;
            identity: z.ZodUnion<readonly [z.ZodObject<{
                entity_id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                origin_source_id: z.ZodString;
            }, z.core.$strict>]>;
        }, z.core.$strict>>;
        resources: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        endpoints: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        interfaces: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        relations: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        surface_exclusions: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        authority_intent: z.ZodEnum<{
            community: "community";
            entity: "entity";
        }>;
        declared_at: z.ZodISODateTime;
        source_bindings: z.ZodArray<z.ZodObject<{
            source_binding_id: z.ZodString;
            source_id: z.ZodString;
            field_paths: z.ZodArray<z.ZodString>;
            target: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    declaration: "declaration";
                    endpoint: "endpoint";
                    interface: "interface";
                    job_binding: "job_binding";
                    participant: "participant";
                    relation: "relation";
                    resource: "resource";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    sources: z.ZodArray<z.ZodObject<{
        source_id: z.ZodString;
        url: z.ZodURL;
    }, z.core.$strict>>;
    revision_digest: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessAuthoringSchema: z.ZodObject<{
    schema_version: z.ZodLiteral<"sourcey.agent-readiness-authoring/v1alpha1">;
    entity: z.ZodObject<{
        entity_id: z.ZodString;
        slug: z.ZodString;
        slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
        name: z.ZodString;
        domains: z.ZodArray<z.ZodObject<{
            value: z.ZodString;
            role: z.ZodEnum<{
                alias: "alias";
                primary: "primary";
            }>;
            valid_from: z.ZodISODateTime;
            valid_until: z.ZodOptional<z.ZodISODateTime>;
        }, z.core.$strict>>;
        category: z.ZodString;
    }, z.core.$strict>;
    sources: z.ZodArray<z.ZodObject<{
        source_id: z.ZodString;
        url: z.ZodURL;
    }, z.core.$strict>>;
    declarations: z.ZodArray<z.ZodObject<{
        declaration_id: z.ZodString;
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
        job_bindings: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        participants: z.ZodArray<z.ZodObject<{
            participant_id: z.ZodString;
            roles: z.ZodArray<z.ZodEnum<{
                access_operator: "access_operator";
                identity_provider: "identity_provider";
                operations_provider: "operations_provider";
                payment_provider: "payment_provider";
                provisioning_provider: "provisioning_provider";
                subject: "subject";
            }>>;
            identity: z.ZodUnion<readonly [z.ZodObject<{
                entity_id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                origin_source_id: z.ZodString;
            }, z.core.$strict>]>;
        }, z.core.$strict>>;
        resources: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        endpoints: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        interfaces: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        relations: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        offer_relations: z.ZodArray<z.ZodObject<{
            offer_relation_proposal_id: z.ZodString;
            offer_id: z.ZodString;
            purpose: z.ZodEnum<{
                application_path: "application_path";
                operating_path: "operating_path";
                redemption_path: "redemption_path";
            }>;
        }, z.core.$strict>>;
        source_bindings: z.ZodArray<z.ZodObject<{
            source_binding_id: z.ZodString;
            source_id: z.ZodString;
            field_paths: z.ZodArray<z.ZodString>;
            target: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    declaration: "declaration";
                    endpoint: "endpoint";
                    interface: "interface";
                    job_binding: "job_binding";
                    offer_relation: "offer_relation";
                    participant: "participant";
                    relation: "relation";
                    resource: "resource";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
        surface_exclusions: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        authority_intent: z.ZodEnum<{
            community: "community";
            entity: "entity";
        }>;
        declared_at: z.ZodISODateTime;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type AgentReadinessOfferRelationProposal = z.infer<typeof agentReadinessOfferRelationProposalSchema>;
export type AgentReadinessDeclaration = z.infer<typeof agentReadinessDeclarationSchema>;
export type AgentReadinessDeclarationRevision = z.infer<typeof agentReadinessDeclarationRevisionSchema>;
export type AgentReadinessAuthoring = z.infer<typeof agentReadinessAuthoringSchema>;
//# sourceMappingURL=declaration.d.ts.map