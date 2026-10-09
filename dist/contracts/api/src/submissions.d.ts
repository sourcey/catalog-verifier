import { z } from "zod";
export declare const submissionId: z.ZodString;
export declare const CATALOG_SUBMISSION_STAGES: readonly ["validation", "evidence", "identity", "readiness", "authorization", "publication", "readback"];
export declare const catalogSubmissionAuthoringFileSchema: z.ZodObject<{
    path: z.ZodString;
    content: z.ZodString;
}, z.core.$strict>;
/** The Catalog record request Catalog processes: one change and the authority that sent it. */
export declare const catalogSubmissionRequestSchema: z.ZodObject<{
    authoring_files: z.ZodDefault<z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        content: z.ZodString;
    }, z.core.$strict>>>;
    remove_entity_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
    asset_submissions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        role: z.ZodLiteral<"icon">;
        source: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"upload">;
            upload_receipt_digest: z.ZodString;
            original_digest: z.ZodString;
            bytes: z.ZodNumber;
            media_type: z.ZodEnum<{
                "image/jpeg": "image/jpeg";
                "image/png": "image/png";
                "image/svg+xml": "image/svg+xml";
                "image/webp": "image/webp";
            }>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"official_url">;
            url: z.ZodURL;
        }, z.core.$strict>], "kind">;
        redistribution: z.ZodObject<{
            basis: z.ZodEnum<{
                "nominative-use": "nominative-use";
                "redistributable-license": "redistributable-license";
                "sourcey-owned": "sourcey-owned";
                "vendor-approved": "vendor-approved";
            }>;
            license: z.ZodString;
            notice: z.ZodString;
            trademark_owner: z.ZodString;
            fallback_reason: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        submitter_context: z.ZodObject<{
            relationship: z.ZodEnum<{
                "community-contributor": "community-contributor";
                "vendor-representative": "vendor-representative";
            }>;
            authority_asserted: z.ZodBoolean;
        }, z.core.$strict>;
        expected_current_binding_event_id: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>>>;
    expected_current_entities: z.ZodOptional<z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        snapshot_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>>>;
    authority: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"authenticated_form">;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"paid_agent">;
        request_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"governed_ops">;
        command_digest: z.ZodString;
        grant_digest: z.ZodString;
        approval_digest: z.ZodNullable<z.ZodString>;
        run_receipt_digest: z.ZodString;
        admission_artifact_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>], "kind">;
}, z.core.$strict>;
/**
 * One submission through the one transport, as a closed product union. The
 * envelope owns identity (the idempotency key and the authenticated
 * principal), origin (the authority) and status; each payload stays owned by
 * its Catalog contract.
 */
export declare const submissionRequestSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    product: z.ZodLiteral<"catalog_record">;
    payload: z.ZodObject<{
        authoring_files: z.ZodDefault<z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            content: z.ZodString;
        }, z.core.$strict>>>;
        remove_entity_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
        asset_submissions: z.ZodDefault<z.ZodArray<z.ZodObject<{
            entity_id: z.ZodString;
            role: z.ZodLiteral<"icon">;
            source: z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"upload">;
                upload_receipt_digest: z.ZodString;
                original_digest: z.ZodString;
                bytes: z.ZodNumber;
                media_type: z.ZodEnum<{
                    "image/jpeg": "image/jpeg";
                    "image/png": "image/png";
                    "image/svg+xml": "image/svg+xml";
                    "image/webp": "image/webp";
                }>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"official_url">;
                url: z.ZodURL;
            }, z.core.$strict>], "kind">;
            redistribution: z.ZodObject<{
                basis: z.ZodEnum<{
                    "nominative-use": "nominative-use";
                    "redistributable-license": "redistributable-license";
                    "sourcey-owned": "sourcey-owned";
                    "vendor-approved": "vendor-approved";
                }>;
                license: z.ZodString;
                notice: z.ZodString;
                trademark_owner: z.ZodString;
                fallback_reason: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            submitter_context: z.ZodObject<{
                relationship: z.ZodEnum<{
                    "community-contributor": "community-contributor";
                    "vendor-representative": "vendor-representative";
                }>;
                authority_asserted: z.ZodBoolean;
            }, z.core.$strict>;
            expected_current_binding_event_id: z.ZodNullable<z.ZodString>;
        }, z.core.$strict>>>;
        expected_current_entities: z.ZodOptional<z.ZodArray<z.ZodObject<{
            entity_id: z.ZodString;
            snapshot_digest: z.ZodNullable<z.ZodString>;
        }, z.core.$strict>>>;
    }, z.core.$strict>;
    authority: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"authenticated_form">;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"paid_agent">;
        request_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"governed_ops">;
        command_digest: z.ZodString;
        grant_digest: z.ZodString;
        approval_digest: z.ZodNullable<z.ZodString>;
        run_receipt_digest: z.ZodString;
        admission_artifact_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>], "kind">;
}, z.core.$strict>, z.ZodObject<{
    product: z.ZodLiteral<"agent_readiness">;
    payload: z.ZodObject<{
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
                            request: "request";
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
    authority: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"authenticated_form">;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"paid_agent">;
        request_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"governed_ops">;
        command_digest: z.ZodString;
        grant_digest: z.ZodString;
        approval_digest: z.ZodNullable<z.ZodString>;
        run_receipt_digest: z.ZodString;
        admission_artifact_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>], "kind">;
}, z.core.$strict>], "product">;
declare const catalogSubmissionAuthorizationPolicySchema: z.ZodEnum<{
    proposal: "proposal";
    publication: "publication";
}>;
export declare const catalogSubmissionOperatorAdmissionCoreSchema: z.ZodObject<{
    admission_contract: z.ZodLiteral<"sourcey.catalog-submission-operator-admission/v1alpha1">;
    submission_id: z.ZodString;
    payload_digest: z.ZodString;
    live_parent_release_id: z.ZodString;
    prior_work_item_digest: z.ZodString;
    reviewed_authoring_files: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        content: z.ZodString;
    }, z.core.$strict>>;
    reviewed_payload_digest: z.ZodString;
    admission_artifact_digests: z.ZodArray<z.ZodString>;
    operator_id: z.ZodString;
    publication_authorization_digest: z.ZodString;
    attached_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const catalogSubmissionOperatorAdmissionSchema: z.ZodObject<{
    admission_contract: z.ZodLiteral<"sourcey.catalog-submission-operator-admission/v1alpha1">;
    submission_id: z.ZodString;
    payload_digest: z.ZodString;
    live_parent_release_id: z.ZodString;
    prior_work_item_digest: z.ZodString;
    reviewed_authoring_files: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        content: z.ZodString;
    }, z.core.$strict>>;
    reviewed_payload_digest: z.ZodString;
    admission_artifact_digests: z.ZodArray<z.ZodString>;
    operator_id: z.ZodString;
    publication_authorization_digest: z.ZodString;
    attached_at: z.ZodISODateTime;
    operator_admission_digest: z.ZodString;
}, z.core.$strict>;
/**
 * Protected handoff from Cloud ingress custody to the Catalog application.
 * The public request bytes remain unchanged; Cloud adds only the exact
 * authentication, authorization-policy, parent, and idempotency bindings it
 * actually observed.
 */
export declare const catalogSubmissionWorkItemCoreSchema: z.ZodObject<{
    submission_id: z.ZodString;
    idempotency_key: z.ZodString;
    request: z.ZodObject<{
        authoring_files: z.ZodDefault<z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            content: z.ZodString;
        }, z.core.$strict>>>;
        remove_entity_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
        asset_submissions: z.ZodDefault<z.ZodArray<z.ZodObject<{
            entity_id: z.ZodString;
            role: z.ZodLiteral<"icon">;
            source: z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"upload">;
                upload_receipt_digest: z.ZodString;
                original_digest: z.ZodString;
                bytes: z.ZodNumber;
                media_type: z.ZodEnum<{
                    "image/jpeg": "image/jpeg";
                    "image/png": "image/png";
                    "image/svg+xml": "image/svg+xml";
                    "image/webp": "image/webp";
                }>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"official_url">;
                url: z.ZodURL;
            }, z.core.$strict>], "kind">;
            redistribution: z.ZodObject<{
                basis: z.ZodEnum<{
                    "nominative-use": "nominative-use";
                    "redistributable-license": "redistributable-license";
                    "sourcey-owned": "sourcey-owned";
                    "vendor-approved": "vendor-approved";
                }>;
                license: z.ZodString;
                notice: z.ZodString;
                trademark_owner: z.ZodString;
                fallback_reason: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            submitter_context: z.ZodObject<{
                relationship: z.ZodEnum<{
                    "community-contributor": "community-contributor";
                    "vendor-representative": "vendor-representative";
                }>;
                authority_asserted: z.ZodBoolean;
            }, z.core.$strict>;
            expected_current_binding_event_id: z.ZodNullable<z.ZodString>;
        }, z.core.$strict>>>;
        expected_current_entities: z.ZodOptional<z.ZodArray<z.ZodObject<{
            entity_id: z.ZodString;
            snapshot_digest: z.ZodNullable<z.ZodString>;
        }, z.core.$strict>>>;
        authority: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"authenticated_form">;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"paid_agent">;
            request_id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"governed_ops">;
            command_digest: z.ZodString;
            grant_digest: z.ZodString;
            approval_digest: z.ZodNullable<z.ZodString>;
            run_receipt_digest: z.ZodString;
            admission_artifact_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
        }, z.core.$strict>], "kind">;
    }, z.core.$strict>;
    payload_digest: z.ZodString;
    authentication_digest: z.ZodString;
    authorization_digest: z.ZodString;
    authorization_policy: z.ZodEnum<{
        proposal: "proposal";
        publication: "publication";
    }>;
    live_parent_release_id: z.ZodString;
    operator_admission: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        admission_contract: z.ZodLiteral<"sourcey.catalog-submission-operator-admission/v1alpha1">;
        submission_id: z.ZodString;
        payload_digest: z.ZodString;
        live_parent_release_id: z.ZodString;
        prior_work_item_digest: z.ZodString;
        reviewed_authoring_files: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            content: z.ZodString;
        }, z.core.$strict>>;
        reviewed_payload_digest: z.ZodString;
        admission_artifact_digests: z.ZodArray<z.ZodString>;
        operator_id: z.ZodString;
        publication_authorization_digest: z.ZodString;
        attached_at: z.ZodISODateTime;
        operator_admission_digest: z.ZodString;
    }, z.core.$strict>>>;
}, z.core.$strict>;
export declare const catalogSubmissionWorkItemSchema: z.ZodObject<{
    submission_id: z.ZodString;
    idempotency_key: z.ZodString;
    request: z.ZodObject<{
        authoring_files: z.ZodDefault<z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            content: z.ZodString;
        }, z.core.$strict>>>;
        remove_entity_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
        asset_submissions: z.ZodDefault<z.ZodArray<z.ZodObject<{
            entity_id: z.ZodString;
            role: z.ZodLiteral<"icon">;
            source: z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"upload">;
                upload_receipt_digest: z.ZodString;
                original_digest: z.ZodString;
                bytes: z.ZodNumber;
                media_type: z.ZodEnum<{
                    "image/jpeg": "image/jpeg";
                    "image/png": "image/png";
                    "image/svg+xml": "image/svg+xml";
                    "image/webp": "image/webp";
                }>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"official_url">;
                url: z.ZodURL;
            }, z.core.$strict>], "kind">;
            redistribution: z.ZodObject<{
                basis: z.ZodEnum<{
                    "nominative-use": "nominative-use";
                    "redistributable-license": "redistributable-license";
                    "sourcey-owned": "sourcey-owned";
                    "vendor-approved": "vendor-approved";
                }>;
                license: z.ZodString;
                notice: z.ZodString;
                trademark_owner: z.ZodString;
                fallback_reason: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            submitter_context: z.ZodObject<{
                relationship: z.ZodEnum<{
                    "community-contributor": "community-contributor";
                    "vendor-representative": "vendor-representative";
                }>;
                authority_asserted: z.ZodBoolean;
            }, z.core.$strict>;
            expected_current_binding_event_id: z.ZodNullable<z.ZodString>;
        }, z.core.$strict>>>;
        expected_current_entities: z.ZodOptional<z.ZodArray<z.ZodObject<{
            entity_id: z.ZodString;
            snapshot_digest: z.ZodNullable<z.ZodString>;
        }, z.core.$strict>>>;
        authority: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"authenticated_form">;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"paid_agent">;
            request_id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"governed_ops">;
            command_digest: z.ZodString;
            grant_digest: z.ZodString;
            approval_digest: z.ZodNullable<z.ZodString>;
            run_receipt_digest: z.ZodString;
            admission_artifact_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
        }, z.core.$strict>], "kind">;
    }, z.core.$strict>;
    payload_digest: z.ZodString;
    authentication_digest: z.ZodString;
    authorization_digest: z.ZodString;
    authorization_policy: z.ZodEnum<{
        proposal: "proposal";
        publication: "publication";
    }>;
    live_parent_release_id: z.ZodString;
    operator_admission: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        admission_contract: z.ZodLiteral<"sourcey.catalog-submission-operator-admission/v1alpha1">;
        submission_id: z.ZodString;
        payload_digest: z.ZodString;
        live_parent_release_id: z.ZodString;
        prior_work_item_digest: z.ZodString;
        reviewed_authoring_files: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            content: z.ZodString;
        }, z.core.$strict>>;
        reviewed_payload_digest: z.ZodString;
        admission_artifact_digests: z.ZodArray<z.ZodString>;
        operator_id: z.ZodString;
        publication_authorization_digest: z.ZodString;
        attached_at: z.ZodISODateTime;
        operator_admission_digest: z.ZodString;
    }, z.core.$strict>>>;
    work_item_digest: z.ZodString;
}, z.core.$strict>;
/** Mutable execution progress never rewrites the protected submission identity. */
declare const catalogSubmissionExecutionSchema: z.ZodObject<{
    work_item: z.ZodObject<{
        submission_id: z.ZodString;
        idempotency_key: z.ZodString;
        request: z.ZodObject<{
            authoring_files: z.ZodDefault<z.ZodArray<z.ZodObject<{
                path: z.ZodString;
                content: z.ZodString;
            }, z.core.$strict>>>;
            remove_entity_ids: z.ZodDefault<z.ZodArray<z.ZodString>>;
            asset_submissions: z.ZodDefault<z.ZodArray<z.ZodObject<{
                entity_id: z.ZodString;
                role: z.ZodLiteral<"icon">;
                source: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"upload">;
                    upload_receipt_digest: z.ZodString;
                    original_digest: z.ZodString;
                    bytes: z.ZodNumber;
                    media_type: z.ZodEnum<{
                        "image/jpeg": "image/jpeg";
                        "image/png": "image/png";
                        "image/svg+xml": "image/svg+xml";
                        "image/webp": "image/webp";
                    }>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"official_url">;
                    url: z.ZodURL;
                }, z.core.$strict>], "kind">;
                redistribution: z.ZodObject<{
                    basis: z.ZodEnum<{
                        "nominative-use": "nominative-use";
                        "redistributable-license": "redistributable-license";
                        "sourcey-owned": "sourcey-owned";
                        "vendor-approved": "vendor-approved";
                    }>;
                    license: z.ZodString;
                    notice: z.ZodString;
                    trademark_owner: z.ZodString;
                    fallback_reason: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>;
                submitter_context: z.ZodObject<{
                    relationship: z.ZodEnum<{
                        "community-contributor": "community-contributor";
                        "vendor-representative": "vendor-representative";
                    }>;
                    authority_asserted: z.ZodBoolean;
                }, z.core.$strict>;
                expected_current_binding_event_id: z.ZodNullable<z.ZodString>;
            }, z.core.$strict>>>;
            expected_current_entities: z.ZodOptional<z.ZodArray<z.ZodObject<{
                entity_id: z.ZodString;
                snapshot_digest: z.ZodNullable<z.ZodString>;
            }, z.core.$strict>>>;
            authority: z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"authenticated_form">;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"paid_agent">;
                request_id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"governed_ops">;
                command_digest: z.ZodString;
                grant_digest: z.ZodString;
                approval_digest: z.ZodNullable<z.ZodString>;
                run_receipt_digest: z.ZodString;
                admission_artifact_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
            }, z.core.$strict>], "kind">;
        }, z.core.$strict>;
        payload_digest: z.ZodString;
        authentication_digest: z.ZodString;
        authorization_digest: z.ZodString;
        authorization_policy: z.ZodEnum<{
            proposal: "proposal";
            publication: "publication";
        }>;
        live_parent_release_id: z.ZodString;
        operator_admission: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            admission_contract: z.ZodLiteral<"sourcey.catalog-submission-operator-admission/v1alpha1">;
            submission_id: z.ZodString;
            payload_digest: z.ZodString;
            live_parent_release_id: z.ZodString;
            prior_work_item_digest: z.ZodString;
            reviewed_authoring_files: z.ZodArray<z.ZodObject<{
                path: z.ZodString;
                content: z.ZodString;
            }, z.core.$strict>>;
            reviewed_payload_digest: z.ZodString;
            admission_artifact_digests: z.ZodArray<z.ZodString>;
            operator_id: z.ZodString;
            publication_authorization_digest: z.ZodString;
            attached_at: z.ZodISODateTime;
            operator_admission_digest: z.ZodString;
        }, z.core.$strict>>>;
        work_item_digest: z.ZodString;
    }, z.core.$strict>;
    publication_base: z.ZodObject<{
        state_contract: z.ZodLiteral<"sourcey.catalog-publication-state/v1alpha1">;
        live_parent_release_id: z.ZodString;
        target_entity_ids: z.ZodArray<z.ZodString>;
        current_entities: z.ZodArray<z.ZodObject<{
            schema_version: z.ZodLiteral<"sourcey.entity-authoring/v1alpha1">;
            programs: z.ZodArray<z.ZodObject<{
                program_id: z.ZodString;
                program_slug: z.ZodString;
                program_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                title: z.ZodString;
                summary: z.ZodOptional<z.ZodString>;
                source_ids: z.ZodArray<z.ZodString>;
            }, z.core.$strict>>;
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
            profile: z.ZodObject<{
                summary: z.ZodOptional<z.ZodString>;
                description: z.ZodString;
                links: z.ZodObject<{
                    site: z.ZodURL;
                    pricing: z.ZodOptional<z.ZodURL>;
                }, z.core.$strict>;
            }, z.core.$strict>;
            sources: z.ZodArray<z.ZodObject<{
                source_id: z.ZodString;
                url: z.ZodURL;
            }, z.core.$strict>>;
            offers: z.ZodArray<z.ZodObject<{
                offer_id: z.ZodString;
                program_id: z.ZodOptional<z.ZodString>;
                offer_slug: z.ZodString;
                offer_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                title: z.ZodString;
                summary: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
                lifecycle: z.ZodObject<{
                    status: z.ZodEnum<{
                        active: "active";
                        ended: "ended";
                        withdrawn: "withdrawn";
                    }>;
                    effective_from: z.ZodISODateTime;
                    effective_until: z.ZodOptional<z.ZodISODateTime>;
                }, z.core.$strict>;
                economics: z.ZodObject<{
                    consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"none">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"fixed">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"variable">;
                        description: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"unknown">;
                        description: z.ZodString;
                    }, z.core.$strict>], "kind">;
                    benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"credit">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"discount">;
                        percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                        applies_to: z.ZodOptional<z.ZodString>;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"cashback">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"money">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                                maximum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"percentage">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum_basis_points: z.ZodNumber;
                                maximum_basis_points: z.ZodNumber;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"waiver">;
                        waived_item: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"free-service">;
                        service: z.ZodString;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"other">;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>;
                eligibility: z.ZodObject<{
                    rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
                }, z.core.$strict>;
                roles: z.ZodObject<{
                    terms_authority_entity_id: z.ZodString;
                    access_operator_entity_id: z.ZodString;
                }, z.core.$strict>;
                source_ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
                declared: z.ZodOptional<z.ZodLiteral<true>>;
                access: z.ZodObject<{
                    availability: z.ZodEnum<{
                        automatic: "automatic";
                        invite: "invite";
                        membership: "membership";
                        other: "other";
                        public: "public";
                        referral: "referral";
                    }>;
                    method: z.ZodEnum<{
                        automatic: "automatic";
                        code: "code";
                        contact: "contact";
                        form: "form";
                        other: "other";
                    }>;
                    public_code: z.ZodOptional<z.ZodString>;
                    url: z.ZodOptional<z.ZodURL>;
                    instructions: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>;
                terms_url: z.ZodOptional<z.ZodURL>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        current_asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
            entity_id: z.ZodString;
            role: z.ZodEnum<{
                icon: "icon";
                "logo-dark": "logo-dark";
                "logo-light": "logo-light";
            }>;
            asset_object_digest: z.ZodString;
            served_digest: z.ZodString;
            served_path: z.ZodString;
            media_type: z.ZodEnum<{
                "image/jpeg": "image/jpeg";
                "image/png": "image/png";
                "image/svg+xml": "image/svg+xml";
                "image/webp": "image/webp";
            }>;
            bytes: z.ZodNumber;
            width: z.ZodNumber;
            height: z.ZodNumber;
            authority_basis: z.ZodEnum<{
                "editorial-review": "editorial-review";
                "licensed-source": "licensed-source";
                "sourcey-owned": "sourcey-owned";
                "vendor-authority": "vendor-authority";
            }>;
            authority_claim_id: z.ZodOptional<z.ZodString>;
            approval_receipt_digest: z.ZodString;
            source_basis: z.ZodString;
            license_basis: z.ZodString;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            binding_event_id: z.ZodString;
        }, z.core.$strict>>>;
        git_cursor: z.ZodNullable<z.ZodObject<{
            repository_id: z.ZodString;
            head_commit: z.ZodString;
            head_tree: z.ZodString;
        }, z.core.$strict>>;
        state_digest: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const catalogSubmissionHeadersSchema: z.ZodObject<{
    "idempotency-key": z.ZodString;
}, z.core.$loose>;
export declare const catalogSubmissionProcessingResultSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    state: z.ZodEnum<{
        awaiting_review: "awaiting_review";
        invalidated: "invalidated";
    }>;
    proposal_digest: z.ZodNull;
    change_set_digest: z.ZodNull;
    live_parent_release_id: z.ZodString;
    publication_release_id: z.ZodNull;
    stages: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            authorization: "authorization";
            evidence: "evidence";
            identity: "identity";
            publication: "publication";
            readback: "readback";
            readiness: "readiness";
            validation: "validation";
        }>;
        status: z.ZodEnum<{
            failed: "failed";
            invalidated: "invalidated";
            not_required: "not_required";
            passed: "passed";
            pending: "pending";
        }>;
        diagnostics: z.ZodArray<z.ZodObject<{
            stage: z.ZodEnum<{
                authorization: "authorization";
                evidence: "evidence";
                identity: "identity";
                publication: "publication";
                readback: "readback";
                readiness: "readiness";
                validation: "validation";
            }>;
            code: z.ZodString;
            message: z.ZodString;
            path: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    telemetry: z.ZodObject<{
        active_ms: z.ZodNumber;
        live_readback_ms: z.ZodNullable<z.ZodNumber>;
        closure_cardinality: z.ZodNumber;
        stages_invoked: z.ZodArray<z.ZodEnum<{
            authorization: "authorization";
            evidence: "evidence";
            identity: "identity";
            publication: "publication";
            readback: "readback";
            readiness: "readiness";
            validation: "validation";
        }>>;
        cache_reuse: z.ZodObject<{
            reused: z.ZodNumber;
            created: z.ZodNumber;
        }, z.core.$strict>;
    }, z.core.$strict>;
}, z.core.$strict>, z.ZodObject<{
    state: z.ZodEnum<{
        awaiting_admission: "awaiting_admission";
        awaiting_authorization: "awaiting_authorization";
        published: "published";
        rejected: "rejected";
    }>;
    proposal_digest: z.ZodString;
    change_set_digest: z.ZodString;
    live_parent_release_id: z.ZodString;
    publication_release_id: z.ZodNullable<z.ZodString>;
    stages: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            authorization: "authorization";
            evidence: "evidence";
            identity: "identity";
            publication: "publication";
            readback: "readback";
            readiness: "readiness";
            validation: "validation";
        }>;
        status: z.ZodEnum<{
            failed: "failed";
            invalidated: "invalidated";
            not_required: "not_required";
            passed: "passed";
            pending: "pending";
        }>;
        diagnostics: z.ZodArray<z.ZodObject<{
            stage: z.ZodEnum<{
                authorization: "authorization";
                evidence: "evidence";
                identity: "identity";
                publication: "publication";
                readback: "readback";
                readiness: "readiness";
                validation: "validation";
            }>;
            code: z.ZodString;
            message: z.ZodString;
            path: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    telemetry: z.ZodObject<{
        active_ms: z.ZodNumber;
        live_readback_ms: z.ZodNullable<z.ZodNumber>;
        closure_cardinality: z.ZodNumber;
        stages_invoked: z.ZodArray<z.ZodEnum<{
            authorization: "authorization";
            evidence: "evidence";
            identity: "identity";
            publication: "publication";
            readback: "readback";
            readiness: "readiness";
            validation: "validation";
        }>>;
        cache_reuse: z.ZodObject<{
            reused: z.ZodNumber;
            created: z.ZodNumber;
        }, z.core.$strict>;
    }, z.core.$strict>;
}, z.core.$strict>], "state">;
export declare const catalogSubmissionStatusSchema: z.ZodObject<{
    submission_id: z.ZodString;
    product: z.ZodLiteral<"catalog_record">;
    links: z.ZodObject<{
        self: z.ZodString;
    }, z.core.$strict>;
    state: z.ZodEnum<{
        active: "active";
        awaiting_admission: "awaiting_admission";
        awaiting_authorization: "awaiting_authorization";
        awaiting_review: "awaiting_review";
        invalidated: "invalidated";
        published: "published";
        queued: "queued";
        rejected: "rejected";
    }>;
    ingress: z.ZodEnum<{
        authenticated_form: "authenticated_form";
        governed_ops: "governed_ops";
        paid_agent: "paid_agent";
    }>;
    payload_digest: z.ZodString;
    authentication_digest: z.ZodString;
    proposal_digest: z.ZodNullable<z.ZodString>;
    change_set_digest: z.ZodNullable<z.ZodString>;
    live_parent_release_id: z.ZodString;
    publication_release_id: z.ZodNullable<z.ZodString>;
    stages: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            authorization: "authorization";
            evidence: "evidence";
            identity: "identity";
            publication: "publication";
            readback: "readback";
            readiness: "readiness";
            validation: "validation";
        }>;
        status: z.ZodEnum<{
            failed: "failed";
            invalidated: "invalidated";
            not_required: "not_required";
            passed: "passed";
            pending: "pending";
        }>;
        diagnostics: z.ZodArray<z.ZodObject<{
            stage: z.ZodEnum<{
                authorization: "authorization";
                evidence: "evidence";
                identity: "identity";
                publication: "publication";
                readback: "readback";
                readiness: "readiness";
                validation: "validation";
            }>;
            code: z.ZodString;
            message: z.ZodString;
            path: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    telemetry: z.ZodObject<{
        queued_ms: z.ZodNumber;
        active_ms: z.ZodNumber;
        live_readback_ms: z.ZodNullable<z.ZodNumber>;
        closure_cardinality: z.ZodNumber;
        stages_invoked: z.ZodArray<z.ZodEnum<{
            authorization: "authorization";
            evidence: "evidence";
            identity: "identity";
            publication: "publication";
            readback: "readback";
            readiness: "readiness";
            validation: "validation";
        }>>;
        cache_reuse: z.ZodObject<{
            reused: z.ZodNumber;
            created: z.ZodNumber;
        }, z.core.$strict>;
    }, z.core.$strict>;
    created_at: z.ZodISODateTime;
    updated_at: z.ZodISODateTime;
}, z.core.$strict>;
/**
 * A hosted Agent Readiness declaration: queued until the evidence worker
 * drafts it against the Entity's current authoring source, then admitted with
 * its exact hosted bytes or refused with the draft's diagnostics.
 */
declare const agentReadinessSubmissionStatusSchema: z.ZodObject<{
    submission_id: z.ZodString;
    product: z.ZodLiteral<"agent_readiness">;
    links: z.ZodObject<{
        self: z.ZodString;
    }, z.core.$strict>;
    state: z.ZodEnum<{
        admitted: "admitted";
        queued: "queued";
        refused: "refused";
    }>;
    ingress: z.ZodEnum<{
        authenticated_form: "authenticated_form";
        governed_ops: "governed_ops";
        paid_agent: "paid_agent";
    }>;
    payload_digest: z.ZodString;
    subject: z.ZodNullable<z.ZodObject<{
        entity_id: z.ZodString;
        declaration_ids: z.ZodArray<z.ZodString>;
    }, z.core.$strict>>;
    authoring_blob_digest: z.ZodNullable<z.ZodString>;
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
    created_at: z.ZodISODateTime;
    updated_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const submissionStatusSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    submission_id: z.ZodString;
    product: z.ZodLiteral<"catalog_record">;
    links: z.ZodObject<{
        self: z.ZodString;
    }, z.core.$strict>;
    state: z.ZodEnum<{
        active: "active";
        awaiting_admission: "awaiting_admission";
        awaiting_authorization: "awaiting_authorization";
        awaiting_review: "awaiting_review";
        invalidated: "invalidated";
        published: "published";
        queued: "queued";
        rejected: "rejected";
    }>;
    ingress: z.ZodEnum<{
        authenticated_form: "authenticated_form";
        governed_ops: "governed_ops";
        paid_agent: "paid_agent";
    }>;
    payload_digest: z.ZodString;
    authentication_digest: z.ZodString;
    proposal_digest: z.ZodNullable<z.ZodString>;
    change_set_digest: z.ZodNullable<z.ZodString>;
    live_parent_release_id: z.ZodString;
    publication_release_id: z.ZodNullable<z.ZodString>;
    stages: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            authorization: "authorization";
            evidence: "evidence";
            identity: "identity";
            publication: "publication";
            readback: "readback";
            readiness: "readiness";
            validation: "validation";
        }>;
        status: z.ZodEnum<{
            failed: "failed";
            invalidated: "invalidated";
            not_required: "not_required";
            passed: "passed";
            pending: "pending";
        }>;
        diagnostics: z.ZodArray<z.ZodObject<{
            stage: z.ZodEnum<{
                authorization: "authorization";
                evidence: "evidence";
                identity: "identity";
                publication: "publication";
                readback: "readback";
                readiness: "readiness";
                validation: "validation";
            }>;
            code: z.ZodString;
            message: z.ZodString;
            path: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    telemetry: z.ZodObject<{
        queued_ms: z.ZodNumber;
        active_ms: z.ZodNumber;
        live_readback_ms: z.ZodNullable<z.ZodNumber>;
        closure_cardinality: z.ZodNumber;
        stages_invoked: z.ZodArray<z.ZodEnum<{
            authorization: "authorization";
            evidence: "evidence";
            identity: "identity";
            publication: "publication";
            readback: "readback";
            readiness: "readiness";
            validation: "validation";
        }>>;
        cache_reuse: z.ZodObject<{
            reused: z.ZodNumber;
            created: z.ZodNumber;
        }, z.core.$strict>;
    }, z.core.$strict>;
    created_at: z.ZodISODateTime;
    updated_at: z.ZodISODateTime;
}, z.core.$strict>, z.ZodObject<{
    submission_id: z.ZodString;
    product: z.ZodLiteral<"agent_readiness">;
    links: z.ZodObject<{
        self: z.ZodString;
    }, z.core.$strict>;
    state: z.ZodEnum<{
        admitted: "admitted";
        queued: "queued";
        refused: "refused";
    }>;
    ingress: z.ZodEnum<{
        authenticated_form: "authenticated_form";
        governed_ops: "governed_ops";
        paid_agent: "paid_agent";
    }>;
    payload_digest: z.ZodString;
    subject: z.ZodNullable<z.ZodObject<{
        entity_id: z.ZodString;
        declaration_ids: z.ZodArray<z.ZodString>;
    }, z.core.$strict>>;
    authoring_blob_digest: z.ZodNullable<z.ZodString>;
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
    created_at: z.ZodISODateTime;
    updated_at: z.ZodISODateTime;
}, z.core.$strict>], "product">;
export declare const submissionResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodDiscriminatedUnion<[z.ZodObject<{
        submission_id: z.ZodString;
        product: z.ZodLiteral<"catalog_record">;
        links: z.ZodObject<{
            self: z.ZodString;
        }, z.core.$strict>;
        state: z.ZodEnum<{
            active: "active";
            awaiting_admission: "awaiting_admission";
            awaiting_authorization: "awaiting_authorization";
            awaiting_review: "awaiting_review";
            invalidated: "invalidated";
            published: "published";
            queued: "queued";
            rejected: "rejected";
        }>;
        ingress: z.ZodEnum<{
            authenticated_form: "authenticated_form";
            governed_ops: "governed_ops";
            paid_agent: "paid_agent";
        }>;
        payload_digest: z.ZodString;
        authentication_digest: z.ZodString;
        proposal_digest: z.ZodNullable<z.ZodString>;
        change_set_digest: z.ZodNullable<z.ZodString>;
        live_parent_release_id: z.ZodString;
        publication_release_id: z.ZodNullable<z.ZodString>;
        stages: z.ZodArray<z.ZodObject<{
            stage: z.ZodEnum<{
                authorization: "authorization";
                evidence: "evidence";
                identity: "identity";
                publication: "publication";
                readback: "readback";
                readiness: "readiness";
                validation: "validation";
            }>;
            status: z.ZodEnum<{
                failed: "failed";
                invalidated: "invalidated";
                not_required: "not_required";
                passed: "passed";
                pending: "pending";
            }>;
            diagnostics: z.ZodArray<z.ZodObject<{
                stage: z.ZodEnum<{
                    authorization: "authorization";
                    evidence: "evidence";
                    identity: "identity";
                    publication: "publication";
                    readback: "readback";
                    readiness: "readiness";
                    validation: "validation";
                }>;
                code: z.ZodString;
                message: z.ZodString;
                path: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        telemetry: z.ZodObject<{
            queued_ms: z.ZodNumber;
            active_ms: z.ZodNumber;
            live_readback_ms: z.ZodNullable<z.ZodNumber>;
            closure_cardinality: z.ZodNumber;
            stages_invoked: z.ZodArray<z.ZodEnum<{
                authorization: "authorization";
                evidence: "evidence";
                identity: "identity";
                publication: "publication";
                readback: "readback";
                readiness: "readiness";
                validation: "validation";
            }>>;
            cache_reuse: z.ZodObject<{
                reused: z.ZodNumber;
                created: z.ZodNumber;
            }, z.core.$strict>;
        }, z.core.$strict>;
        created_at: z.ZodISODateTime;
        updated_at: z.ZodISODateTime;
    }, z.core.$strict>, z.ZodObject<{
        submission_id: z.ZodString;
        product: z.ZodLiteral<"agent_readiness">;
        links: z.ZodObject<{
            self: z.ZodString;
        }, z.core.$strict>;
        state: z.ZodEnum<{
            admitted: "admitted";
            queued: "queued";
            refused: "refused";
        }>;
        ingress: z.ZodEnum<{
            authenticated_form: "authenticated_form";
            governed_ops: "governed_ops";
            paid_agent: "paid_agent";
        }>;
        payload_digest: z.ZodString;
        subject: z.ZodNullable<z.ZodObject<{
            entity_id: z.ZodString;
            declaration_ids: z.ZodArray<z.ZodString>;
        }, z.core.$strict>>;
        authoring_blob_digest: z.ZodNullable<z.ZodString>;
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
        created_at: z.ZodISODateTime;
        updated_at: z.ZodISODateTime;
    }, z.core.$strict>], "product">;
}, z.core.$strict>;
export declare const agentReadinessDeclarationBytesResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodObject<{
        blob_digest: z.ZodString;
        path: z.ZodString;
        content: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const entityAssetUploadResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodObject<{
        receipt_contract: z.ZodLiteral<"sourcey.entity-asset-upload-receipt/v1alpha1">;
        actor_id: z.ZodString;
        authentication_digest: z.ZodString;
        original_digest: z.ZodString;
        bytes: z.ZodNumber;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/svg+xml": "image/svg+xml";
            "image/webp": "image/webp";
        }>;
        storage_receipt_digest: z.ZodString;
        retained_at: z.ZodISODateTime;
        upload_receipt_digest: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const agentReadinessDeclarationDraftResponseSchema: z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
}, z.core.$strict>;
export type CatalogSubmissionRequest = z.input<typeof catalogSubmissionRequestSchema>;
export type CatalogSubmissionAuthorizationPolicy = z.infer<typeof catalogSubmissionAuthorizationPolicySchema>;
export type CatalogSubmissionWorkItem = z.infer<typeof catalogSubmissionWorkItemSchema>;
export type CatalogSubmissionExecution = z.infer<typeof catalogSubmissionExecutionSchema>;
export type CatalogSubmissionAuthoringFile = z.infer<typeof catalogSubmissionAuthoringFileSchema>;
export type CatalogSubmissionOperatorAdmission = z.infer<typeof catalogSubmissionOperatorAdmissionSchema>;
export type CatalogSubmissionProcessingResult = z.infer<typeof catalogSubmissionProcessingResultSchema>;
export type CatalogSubmissionStatus = z.infer<typeof catalogSubmissionStatusSchema>;
export type SubmissionRequest = z.infer<typeof submissionRequestSchema>;
export type SubmissionStatus = z.infer<typeof submissionStatusSchema>;
export type AgentReadinessSubmissionStatus = z.infer<typeof agentReadinessSubmissionStatusSchema>;
export {};
//# sourceMappingURL=submissions.d.ts.map