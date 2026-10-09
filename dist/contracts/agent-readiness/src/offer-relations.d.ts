import { z } from "zod";
export declare const agentReadinessOfferRelationRevisionCoreSchema: z.ZodObject<{
    relation_id: z.ZodString;
    agent_readiness_profile_id: z.ZodString;
    offer_id: z.ZodString;
    purpose: z.ZodEnum<{
        application_path: "application_path";
        operating_path: "operating_path";
        redemption_path: "redemption_path";
    }>;
    effective_from: z.ZodISODateTime;
    effective_until: z.ZodOptional<z.ZodISODateTime>;
    declaration_revision_digest: z.ZodString;
    offer_relation_proposal_id: z.ZodString;
    admitted_offer_revision_digest: z.ZodString;
    relation_contract: z.ZodLiteral<"sourcey.agent-readiness-offer-relation/v1alpha1">;
}, z.core.$strict>;
export declare const agentReadinessOfferRelationRevisionSchema: z.ZodObject<{
    relation_id: z.ZodString;
    agent_readiness_profile_id: z.ZodString;
    offer_id: z.ZodString;
    purpose: z.ZodEnum<{
        application_path: "application_path";
        operating_path: "operating_path";
        redemption_path: "redemption_path";
    }>;
    effective_from: z.ZodISODateTime;
    effective_until: z.ZodOptional<z.ZodISODateTime>;
    declaration_revision_digest: z.ZodString;
    offer_relation_proposal_id: z.ZodString;
    admitted_offer_revision_digest: z.ZodString;
    relation_contract: z.ZodLiteral<"sourcey.agent-readiness-offer-relation/v1alpha1">;
    relation_revision_digest: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessOfferRelationTransitionSchema: z.ZodObject<{
    previous: z.ZodNullable<z.ZodObject<{
        relation_id: z.ZodString;
        agent_readiness_profile_id: z.ZodString;
        offer_id: z.ZodString;
        purpose: z.ZodEnum<{
            application_path: "application_path";
            operating_path: "operating_path";
            redemption_path: "redemption_path";
        }>;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        declaration_revision_digest: z.ZodString;
        offer_relation_proposal_id: z.ZodString;
        admitted_offer_revision_digest: z.ZodString;
        relation_contract: z.ZodLiteral<"sourcey.agent-readiness-offer-relation/v1alpha1">;
        relation_revision_digest: z.ZodString;
    }, z.core.$strict>>;
    current: z.ZodNullable<z.ZodObject<{
        relation_id: z.ZodString;
        agent_readiness_profile_id: z.ZodString;
        offer_id: z.ZodString;
        purpose: z.ZodEnum<{
            application_path: "application_path";
            operating_path: "operating_path";
            redemption_path: "redemption_path";
        }>;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        declaration_revision_digest: z.ZodString;
        offer_relation_proposal_id: z.ZodString;
        admitted_offer_revision_digest: z.ZodString;
        relation_contract: z.ZodLiteral<"sourcey.agent-readiness-offer-relation/v1alpha1">;
        relation_revision_digest: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessOfferRelationDeltaObjectSchema: z.ZodObject<{
    object_contract: z.ZodLiteral<"sourcey.agent-readiness-offer-relation-delta-object/v1alpha1">;
    relation_id: z.ZodString;
    relation_input: z.ZodNullable<z.ZodObject<{
        relation_input_contract: z.ZodLiteral<"sourcey.agent-readiness-offer-relation-input/v1alpha1">;
        agent_readiness_profile_id: z.ZodString;
        offer_id: z.ZodString;
        purpose: z.ZodEnum<{
            application_path: "application_path";
            operating_path: "operating_path";
            redemption_path: "redemption_path";
        }>;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        declaration_revision_digest: z.ZodString;
        offer_relation_proposal_id: z.ZodString;
        admitted_offer_revision_digest: z.ZodString;
    }, z.core.$strict>>;
    relation: z.ZodNullable<z.ZodObject<{
        relation_id: z.ZodString;
        agent_readiness_profile_id: z.ZodString;
        offer_id: z.ZodString;
        purpose: z.ZodEnum<{
            application_path: "application_path";
            operating_path: "operating_path";
            redemption_path: "redemption_path";
        }>;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        declaration_revision_digest: z.ZodString;
        offer_relation_proposal_id: z.ZodString;
        admitted_offer_revision_digest: z.ZodString;
        relation_contract: z.ZodLiteral<"sourcey.agent-readiness-offer-relation/v1alpha1">;
        relation_revision_digest: z.ZodString;
    }, z.core.$strict>>;
    prior_relation: z.ZodNullable<z.ZodObject<{
        relation_id: z.ZodString;
        agent_readiness_profile_id: z.ZodString;
        offer_id: z.ZodString;
        purpose: z.ZodEnum<{
            application_path: "application_path";
            operating_path: "operating_path";
            redemption_path: "redemption_path";
        }>;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        declaration_revision_digest: z.ZodString;
        offer_relation_proposal_id: z.ZodString;
        admitted_offer_revision_digest: z.ZodString;
        relation_contract: z.ZodLiteral<"sourcey.agent-readiness-offer-relation/v1alpha1">;
        relation_revision_digest: z.ZodString;
    }, z.core.$strict>>;
    catalog_context: z.ZodObject<{
        entity_id: z.ZodString;
        profile_revision_digest: z.ZodString;
        declaration_revision: z.ZodObject<{
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
        offer_revision: z.ZodNullable<z.ZodObject<{
            revision_contract: z.ZodLiteral<"sourcey.offer-revision/v1alpha1">;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            content: z.ZodObject<{
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
                    url: z.ZodOptional<z.ZodURL>;
                    public_code: z.ZodOptional<z.ZodString>;
                    instructions: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>;
                terms_url: z.ZodOptional<z.ZodURL>;
            }, z.core.$strict>;
            revision_digest: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const agentReadinessOfferRelationIndexSchema: z.ZodObject<{
    relation_index_contract: z.ZodLiteral<"sourcey.agent-readiness-offer-relation-index/v1alpha1">;
    relations: z.ZodRecord<z.ZodString, z.ZodObject<{
        relation_id: z.ZodString;
        agent_readiness_profile_id: z.ZodString;
        offer_id: z.ZodString;
        purpose: z.ZodEnum<{
            application_path: "application_path";
            operating_path: "operating_path";
            redemption_path: "redemption_path";
        }>;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        declaration_revision_digest: z.ZodString;
        offer_relation_proposal_id: z.ZodString;
        admitted_offer_revision_digest: z.ZodString;
        relation_contract: z.ZodLiteral<"sourcey.agent-readiness-offer-relation/v1alpha1">;
        relation_revision_digest: z.ZodString;
    }, z.core.$strict>>;
    by_profile: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
    by_offer: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
}, z.core.$strict>;
export declare const agentReadinessOfferRelationInputsSchema: z.ZodObject<{
    input_contract: z.ZodLiteral<"sourcey.agent-readiness-offer-relation-inputs/v1alpha1">;
    relations: z.ZodArray<z.ZodObject<{
        relation_id: z.ZodString;
        input_digest: z.ZodString;
        relation_revision_digest: z.ZodString;
        path: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type AgentReadinessOfferRelationRevision = z.infer<typeof agentReadinessOfferRelationRevisionSchema>;
export type AgentReadinessOfferRelationIndex = z.infer<typeof agentReadinessOfferRelationIndexSchema>;
export type AgentReadinessOfferRelationInputs = z.infer<typeof agentReadinessOfferRelationInputsSchema>;
export type AgentReadinessOfferRelationDeltaObject = z.infer<typeof agentReadinessOfferRelationDeltaObjectSchema>;
//# sourceMappingURL=offer-relations.d.ts.map