import { type ExchangeRecord } from "provenry/exchange/records";
import { z } from "zod";
/**
 * The most descriptor retrievals, and the most facts, one run records: above
 * every listing's plan (the largest, 55 well-known reads on its domains and job
 * endpoints, reaches about 120 with every follow, route hop and skill).
 */
export declare const AGENT_READINESS_DISCOVERY_LIMIT = 128;
/** An agent-facing fact a descriptor on the service's domain states. */
export declare const agentReadinessDiscoveryFactSchema: z.ZodObject<{
    fact: z.ZodEnum<{
        agent_documentation: "agent_documentation";
        agent_skill: "agent_skill";
        api_catalog_link: "api_catalog_link";
        ard_entry: "ard_entry";
        documentation_route: "documentation_route";
        mcp_endpoint: "mcp_endpoint";
        oauth_authorization_server: "oauth_authorization_server";
        oauth_protected_resource: "oauth_protected_resource";
        openapi_server: "openapi_server";
        payment_manifest: "payment_manifest";
        unsupported_descriptor: "unsupported_descriptor";
    }>;
    value: z.ZodURL;
    descriptor_url: z.ZodURL;
    attempt_digest: z.ZodString;
    adapter: z.ZodObject<{
        namespace: z.ZodString;
        version: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
/**
 * What a probe run's exchanges are for (north star §5.3): the job operation
 * itself, the malformed request after a success, the authority chain an
 * answer points to (RFC 9728 metadata, the authorization server's metadata, a
 * dynamic client registration, the authorization request), and the pages the
 * listing names for a person's or a vendor's step.
 */
export declare const AGENT_READINESS_PROBE_PURPOSES: readonly ["probe_operation", "probe_malformed", "probe_resource_metadata", "probe_authorization_server", "probe_client_registration", "probe_authorization", "probe_page"];
export declare const agentReadinessRunExchangeSchema: z.ZodObject<{
    purpose: z.ZodEnum<{
        cleanup: "cleanup";
        delegation: "delegation";
        error_probe: "error_probe";
        job: "job";
        probe_authorization: "probe_authorization";
        probe_authorization_server: "probe_authorization_server";
        probe_client_registration: "probe_client_registration";
        probe_malformed: "probe_malformed";
        probe_operation: "probe_operation";
        probe_page: "probe_page";
        probe_resource_metadata: "probe_resource_metadata";
        sustain_baseline: "sustain_baseline";
        sustain_control_probe: "sustain_control_probe";
        sustain_revocation: "sustain_revocation";
        sustain_revoked_probe: "sustain_revoked_probe";
        sustain_rotated_probe: "sustain_rotated_probe";
        sustain_rotation: "sustain_rotation";
    }>;
    call_id: z.ZodString;
    role: z.ZodEnum<{
        request: "request";
        session_close: "session_close";
        session_opening: "session_opening";
        tool_listing: "tool_listing";
    }>;
    record: z.ZodCustom<ExchangeRecord, ExchangeRecord>;
    outcome_digest: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessCredentialSourceSchema: z.ZodObject<{
    role: z.ZodString;
    handle_digest: z.ZodString;
    source: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"entered">;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"issued">;
        exchange_digest: z.ZodString;
        pointer: z.ZodString;
    }, z.core.$strict>], "kind">;
}, z.core.$strict>;
/** How a request answered a probe with no authority (north star §5.4). */
export declare const agentReadinessProbeAnswerSchema: z.ZodEnum<{
    authority: "authority";
    error: "error";
    offer: "offer";
    page: "page";
    success: "success";
    unanswered: "unanswered";
}>;
export type AgentReadinessProbeAnswer = z.infer<typeof agentReadinessProbeAnswerSchema>;
/** The security an OpenAPI operation requires, by kind: none, a key or token, or OAuth. */
export declare const agentReadinessSpecSecuritySchema: z.ZodEnum<{
    key: "key";
    none: "none";
    oauth: "oauth";
}>;
/**
 * What the vendor's OpenAPI document states for the job's operation (north
 * star §5.6), as the probe read it; null fields when the document was not an
 * OpenAPI 3 document.
 */
export declare const agentReadinessSpecReadingSchema: z.ZodObject<{
    url: z.ZodURL;
    attempt_digest: z.ZodString;
    fetched: z.ZodEnum<{
        absent: "absent";
        read: "read";
        unanswered: "unanswered";
    }>;
    covers: z.ZodBoolean;
    security: z.ZodArray<z.ZodEnum<{
        key: "key";
        none: "none";
        oauth: "oauth";
    }>>;
    typed_errors: z.ZodBoolean;
    payment: z.ZodBoolean;
    key_operations: z.ZodBoolean;
}, z.core.$strict>;
/**
 * What the probe read for one job operation. Everything else the path needs
 * (statuses, challenges, the authorization request's outcome) is in the
 * exchange records themselves. A spec operation sends nothing: its answer is
 * null and its steps rest on its spec reading.
 */
export declare const agentReadinessOperationProbeSchema: z.ZodObject<{
    operation_id: z.ZodString;
    request: z.ZodNullable<z.ZodObject<{
        answer: z.ZodEnum<{
            authority: "authority";
            error: "error";
            offer: "offer";
            page: "page";
            success: "success";
            unanswered: "unanswered";
        }>;
        typed: z.ZodNullable<z.ZodBoolean>;
    }, z.core.$strict>>;
    tool_listed: z.ZodNullable<z.ZodBoolean>;
    offer: z.ZodNullable<z.ZodObject<{
        protocol: z.ZodEnum<{
            mpp: "mpp";
            x402: "x402";
        }>;
        version: z.ZodString;
    }, z.core.$strict>>;
    authority: z.ZodNullable<z.ZodObject<{
        authorization_server: z.ZodURL;
        registration: z.ZodNullable<z.ZodEnum<{
            agent: "agent";
            claimable: "claimable";
        }>>;
        client: z.ZodNullable<z.ZodEnum<{
            dynamic_registration: "dynamic_registration";
            metadata_document: "metadata_document";
        }>>;
        renewal: z.ZodBoolean;
        revocation: z.ZodBoolean;
    }, z.core.$strict>>;
    malformed: z.ZodNullable<z.ZodObject<{
        answer: z.ZodEnum<{
            authority: "authority";
            error: "error";
            offer: "offer";
            page: "page";
            success: "success";
            unanswered: "unanswered";
        }>;
        typed: z.ZodNullable<z.ZodBoolean>;
    }, z.core.$strict>>;
    spec: z.ZodNullable<z.ZodObject<{
        url: z.ZodURL;
        attempt_digest: z.ZodString;
        fetched: z.ZodEnum<{
            absent: "absent";
            read: "read";
            unanswered: "unanswered";
        }>;
        covers: z.ZodBoolean;
        security: z.ZodArray<z.ZodEnum<{
            key: "key";
            none: "none";
            oauth: "oauth";
        }>>;
        typed_errors: z.ZodBoolean;
        payment: z.ZodBoolean;
        key_operations: z.ZodBoolean;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type AgentReadinessOperationProbe = z.infer<typeof agentReadinessOperationProbeSchema>;
export declare const agentReadinessAssertionResultSchema: z.ZodObject<{
    assertion: z.ZodString;
    holds: z.ZodBoolean;
    failure: z.ZodNullable<z.ZodObject<{
        check: z.ZodNumber;
        reason: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
/**
 * A page the listing names for a person's or a vendor's step, as the probe
 * requested it (north star §5.3): its sign-up or registration endpoint, its
 * sales or approval page, its checkout.
 */
export declare const agentReadinessPageProbeSchema: z.ZodObject<{
    page_id: z.ZodString;
    role: z.ZodEnum<{
        access_request: "access_request";
        access_setting: "access_setting";
        checkout: "checkout";
        registration: "registration";
    }>;
    answer: z.ZodEnum<{
        authority: "authority";
        error: "error";
        offer: "offer";
        page: "page";
        success: "success";
        unanswered: "unanswered";
    }>;
    found: z.ZodBoolean;
}, z.core.$strict>;
export type AgentReadinessPageProbe = z.infer<typeof agentReadinessPageProbeSchema>;
/** A runner-side failure: never a fact about the service, always residue to retry. */
export declare const agentReadinessRunResidueSchema: z.ZodObject<{
    step: z.ZodUnion<readonly [z.ZodEnum<{
        authority: "authority";
        confirm: "confirm";
        discover: "discover";
        onboard: "onboard";
        pay: "pay";
        sustain: "sustain";
    }>, z.ZodLiteral<"job">]>;
    reason: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessRunRecordCoreSchema: z.ZodObject<{
    run_contract: z.ZodLiteral<"sourcey.agent-readiness-run/v1alpha1">;
    entity_id: z.ZodString;
    product_key: z.ZodString;
    job_id: z.ZodString;
    label: z.ZodEnum<{
        probed: "probed";
        sourcey_run: "sourcey_run";
        vendor_run_verified: "vendor_run_verified";
    }>;
    engine: z.ZodObject<{
        name: z.ZodString;
        version: z.ZodString;
        engine_digest: z.ZodString;
    }, z.core.$strict>;
    job_digest: z.ZodString;
    declaration_revision_digest: z.ZodString;
    binding_id: z.ZodNullable<z.ZodString>;
    binding_digest: z.ZodNullable<z.ZodString>;
    nonce: z.ZodString;
    started_at: z.ZodISODateTime;
    finished_at: z.ZodISODateTime;
    discovery: z.ZodObject<{
        domains: z.ZodArray<z.ZodString>;
        attempts: z.ZodArray<z.ZodString>;
        unanswered: z.ZodArray<z.ZodURL>;
        facts: z.ZodArray<z.ZodObject<{
            fact: z.ZodEnum<{
                agent_documentation: "agent_documentation";
                agent_skill: "agent_skill";
                api_catalog_link: "api_catalog_link";
                ard_entry: "ard_entry";
                documentation_route: "documentation_route";
                mcp_endpoint: "mcp_endpoint";
                oauth_authorization_server: "oauth_authorization_server";
                oauth_protected_resource: "oauth_protected_resource";
                openapi_server: "openapi_server";
                payment_manifest: "payment_manifest";
                unsupported_descriptor: "unsupported_descriptor";
            }>;
            value: z.ZodURL;
            descriptor_url: z.ZodURL;
            attempt_digest: z.ZodString;
            adapter: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    exchanges: z.ZodArray<z.ZodObject<{
        purpose: z.ZodEnum<{
            cleanup: "cleanup";
            delegation: "delegation";
            error_probe: "error_probe";
            job: "job";
            probe_authorization: "probe_authorization";
            probe_authorization_server: "probe_authorization_server";
            probe_client_registration: "probe_client_registration";
            probe_malformed: "probe_malformed";
            probe_operation: "probe_operation";
            probe_page: "probe_page";
            probe_resource_metadata: "probe_resource_metadata";
            sustain_baseline: "sustain_baseline";
            sustain_control_probe: "sustain_control_probe";
            sustain_revocation: "sustain_revocation";
            sustain_revoked_probe: "sustain_revoked_probe";
            sustain_rotated_probe: "sustain_rotated_probe";
            sustain_rotation: "sustain_rotation";
        }>;
        call_id: z.ZodString;
        role: z.ZodEnum<{
            request: "request";
            session_close: "session_close";
            session_opening: "session_opening";
            tool_listing: "tool_listing";
        }>;
        record: z.ZodCustom<ExchangeRecord, ExchangeRecord>;
        outcome_digest: z.ZodString;
    }, z.core.$strict>>;
    credentials: z.ZodArray<z.ZodObject<{
        role: z.ZodString;
        handle_digest: z.ZodString;
        source: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"entered">;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"issued">;
            exchange_digest: z.ZodString;
            pointer: z.ZodString;
        }, z.core.$strict>], "kind">;
    }, z.core.$strict>>;
    probes: z.ZodArray<z.ZodObject<{
        operation_id: z.ZodString;
        request: z.ZodNullable<z.ZodObject<{
            answer: z.ZodEnum<{
                authority: "authority";
                error: "error";
                offer: "offer";
                page: "page";
                success: "success";
                unanswered: "unanswered";
            }>;
            typed: z.ZodNullable<z.ZodBoolean>;
        }, z.core.$strict>>;
        tool_listed: z.ZodNullable<z.ZodBoolean>;
        offer: z.ZodNullable<z.ZodObject<{
            protocol: z.ZodEnum<{
                mpp: "mpp";
                x402: "x402";
            }>;
            version: z.ZodString;
        }, z.core.$strict>>;
        authority: z.ZodNullable<z.ZodObject<{
            authorization_server: z.ZodURL;
            registration: z.ZodNullable<z.ZodEnum<{
                agent: "agent";
                claimable: "claimable";
            }>>;
            client: z.ZodNullable<z.ZodEnum<{
                dynamic_registration: "dynamic_registration";
                metadata_document: "metadata_document";
            }>>;
            renewal: z.ZodBoolean;
            revocation: z.ZodBoolean;
        }, z.core.$strict>>;
        malformed: z.ZodNullable<z.ZodObject<{
            answer: z.ZodEnum<{
                authority: "authority";
                error: "error";
                offer: "offer";
                page: "page";
                success: "success";
                unanswered: "unanswered";
            }>;
            typed: z.ZodNullable<z.ZodBoolean>;
        }, z.core.$strict>>;
        spec: z.ZodNullable<z.ZodObject<{
            url: z.ZodURL;
            attempt_digest: z.ZodString;
            fetched: z.ZodEnum<{
                absent: "absent";
                read: "read";
                unanswered: "unanswered";
            }>;
            covers: z.ZodBoolean;
            security: z.ZodArray<z.ZodEnum<{
                key: "key";
                none: "none";
                oauth: "oauth";
            }>>;
            typed_errors: z.ZodBoolean;
            payment: z.ZodBoolean;
            key_operations: z.ZodBoolean;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    pages: z.ZodArray<z.ZodObject<{
        page_id: z.ZodString;
        role: z.ZodEnum<{
            access_request: "access_request";
            access_setting: "access_setting";
            checkout: "checkout";
            registration: "registration";
        }>;
        answer: z.ZodEnum<{
            authority: "authority";
            error: "error";
            offer: "offer";
            page: "page";
            success: "success";
            unanswered: "unanswered";
        }>;
        found: z.ZodBoolean;
    }, z.core.$strict>>;
    assertions: z.ZodArray<z.ZodObject<{
        assertion: z.ZodString;
        holds: z.ZodBoolean;
        failure: z.ZodNullable<z.ZodObject<{
            check: z.ZodNumber;
            reason: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    error_probe: z.ZodNullable<z.ZodObject<{
        typed: z.ZodBoolean;
        reason: z.ZodString;
    }, z.core.$strict>>;
    residue: z.ZodArray<z.ZodObject<{
        step: z.ZodUnion<readonly [z.ZodEnum<{
            authority: "authority";
            confirm: "confirm";
            discover: "discover";
            onboard: "onboard";
            pay: "pay";
            sustain: "sustain";
        }>, z.ZodLiteral<"job">]>;
        reason: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessRunRecordSchema: z.ZodObject<{
    run_contract: z.ZodLiteral<"sourcey.agent-readiness-run/v1alpha1">;
    entity_id: z.ZodString;
    product_key: z.ZodString;
    job_id: z.ZodString;
    label: z.ZodEnum<{
        probed: "probed";
        sourcey_run: "sourcey_run";
        vendor_run_verified: "vendor_run_verified";
    }>;
    engine: z.ZodObject<{
        name: z.ZodString;
        version: z.ZodString;
        engine_digest: z.ZodString;
    }, z.core.$strict>;
    job_digest: z.ZodString;
    declaration_revision_digest: z.ZodString;
    binding_id: z.ZodNullable<z.ZodString>;
    binding_digest: z.ZodNullable<z.ZodString>;
    nonce: z.ZodString;
    started_at: z.ZodISODateTime;
    finished_at: z.ZodISODateTime;
    discovery: z.ZodObject<{
        domains: z.ZodArray<z.ZodString>;
        attempts: z.ZodArray<z.ZodString>;
        unanswered: z.ZodArray<z.ZodURL>;
        facts: z.ZodArray<z.ZodObject<{
            fact: z.ZodEnum<{
                agent_documentation: "agent_documentation";
                agent_skill: "agent_skill";
                api_catalog_link: "api_catalog_link";
                ard_entry: "ard_entry";
                documentation_route: "documentation_route";
                mcp_endpoint: "mcp_endpoint";
                oauth_authorization_server: "oauth_authorization_server";
                oauth_protected_resource: "oauth_protected_resource";
                openapi_server: "openapi_server";
                payment_manifest: "payment_manifest";
                unsupported_descriptor: "unsupported_descriptor";
            }>;
            value: z.ZodURL;
            descriptor_url: z.ZodURL;
            attempt_digest: z.ZodString;
            adapter: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    exchanges: z.ZodArray<z.ZodObject<{
        purpose: z.ZodEnum<{
            cleanup: "cleanup";
            delegation: "delegation";
            error_probe: "error_probe";
            job: "job";
            probe_authorization: "probe_authorization";
            probe_authorization_server: "probe_authorization_server";
            probe_client_registration: "probe_client_registration";
            probe_malformed: "probe_malformed";
            probe_operation: "probe_operation";
            probe_page: "probe_page";
            probe_resource_metadata: "probe_resource_metadata";
            sustain_baseline: "sustain_baseline";
            sustain_control_probe: "sustain_control_probe";
            sustain_revocation: "sustain_revocation";
            sustain_revoked_probe: "sustain_revoked_probe";
            sustain_rotated_probe: "sustain_rotated_probe";
            sustain_rotation: "sustain_rotation";
        }>;
        call_id: z.ZodString;
        role: z.ZodEnum<{
            request: "request";
            session_close: "session_close";
            session_opening: "session_opening";
            tool_listing: "tool_listing";
        }>;
        record: z.ZodCustom<ExchangeRecord, ExchangeRecord>;
        outcome_digest: z.ZodString;
    }, z.core.$strict>>;
    credentials: z.ZodArray<z.ZodObject<{
        role: z.ZodString;
        handle_digest: z.ZodString;
        source: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"entered">;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"issued">;
            exchange_digest: z.ZodString;
            pointer: z.ZodString;
        }, z.core.$strict>], "kind">;
    }, z.core.$strict>>;
    probes: z.ZodArray<z.ZodObject<{
        operation_id: z.ZodString;
        request: z.ZodNullable<z.ZodObject<{
            answer: z.ZodEnum<{
                authority: "authority";
                error: "error";
                offer: "offer";
                page: "page";
                success: "success";
                unanswered: "unanswered";
            }>;
            typed: z.ZodNullable<z.ZodBoolean>;
        }, z.core.$strict>>;
        tool_listed: z.ZodNullable<z.ZodBoolean>;
        offer: z.ZodNullable<z.ZodObject<{
            protocol: z.ZodEnum<{
                mpp: "mpp";
                x402: "x402";
            }>;
            version: z.ZodString;
        }, z.core.$strict>>;
        authority: z.ZodNullable<z.ZodObject<{
            authorization_server: z.ZodURL;
            registration: z.ZodNullable<z.ZodEnum<{
                agent: "agent";
                claimable: "claimable";
            }>>;
            client: z.ZodNullable<z.ZodEnum<{
                dynamic_registration: "dynamic_registration";
                metadata_document: "metadata_document";
            }>>;
            renewal: z.ZodBoolean;
            revocation: z.ZodBoolean;
        }, z.core.$strict>>;
        malformed: z.ZodNullable<z.ZodObject<{
            answer: z.ZodEnum<{
                authority: "authority";
                error: "error";
                offer: "offer";
                page: "page";
                success: "success";
                unanswered: "unanswered";
            }>;
            typed: z.ZodNullable<z.ZodBoolean>;
        }, z.core.$strict>>;
        spec: z.ZodNullable<z.ZodObject<{
            url: z.ZodURL;
            attempt_digest: z.ZodString;
            fetched: z.ZodEnum<{
                absent: "absent";
                read: "read";
                unanswered: "unanswered";
            }>;
            covers: z.ZodBoolean;
            security: z.ZodArray<z.ZodEnum<{
                key: "key";
                none: "none";
                oauth: "oauth";
            }>>;
            typed_errors: z.ZodBoolean;
            payment: z.ZodBoolean;
            key_operations: z.ZodBoolean;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    pages: z.ZodArray<z.ZodObject<{
        page_id: z.ZodString;
        role: z.ZodEnum<{
            access_request: "access_request";
            access_setting: "access_setting";
            checkout: "checkout";
            registration: "registration";
        }>;
        answer: z.ZodEnum<{
            authority: "authority";
            error: "error";
            offer: "offer";
            page: "page";
            success: "success";
            unanswered: "unanswered";
        }>;
        found: z.ZodBoolean;
    }, z.core.$strict>>;
    assertions: z.ZodArray<z.ZodObject<{
        assertion: z.ZodString;
        holds: z.ZodBoolean;
        failure: z.ZodNullable<z.ZodObject<{
            check: z.ZodNumber;
            reason: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    error_probe: z.ZodNullable<z.ZodObject<{
        typed: z.ZodBoolean;
        reason: z.ZodString;
    }, z.core.$strict>>;
    residue: z.ZodArray<z.ZodObject<{
        step: z.ZodUnion<readonly [z.ZodEnum<{
            authority: "authority";
            confirm: "confirm";
            discover: "discover";
            onboard: "onboard";
            pay: "pay";
            sustain: "sustain";
        }>, z.ZodLiteral<"job">]>;
        reason: z.ZodString;
    }, z.core.$strict>>;
    run_digest: z.ZodString;
}, z.core.$strict>;
export type AgentReadinessRunRecord = z.infer<typeof agentReadinessRunRecordSchema>;
/**
 * The latest run as a card shows it: how many descriptors it read, every
 * request it sent and what came back (status, type, size and digest, never the
 * body), and what held. Compiled from the run record, so it is checked with it.
 * The steps state what a probe run's answers established.
 */
export declare const agentReadinessRunSummarySchema: z.ZodObject<{
    started_at: z.ZodISODateTime;
    finished_at: z.ZodISODateTime;
    discovery_reads: z.ZodNumber;
    exchanges: z.ZodArray<z.ZodObject<{
        purpose: z.ZodEnum<{
            cleanup: "cleanup";
            delegation: "delegation";
            error_probe: "error_probe";
            job: "job";
            probe_authorization: "probe_authorization";
            probe_authorization_server: "probe_authorization_server";
            probe_client_registration: "probe_client_registration";
            probe_malformed: "probe_malformed";
            probe_operation: "probe_operation";
            probe_page: "probe_page";
            probe_resource_metadata: "probe_resource_metadata";
            sustain_baseline: "sustain_baseline";
            sustain_control_probe: "sustain_control_probe";
            sustain_revocation: "sustain_revocation";
            sustain_revoked_probe: "sustain_revoked_probe";
            sustain_rotated_probe: "sustain_rotated_probe";
            sustain_rotation: "sustain_rotation";
        }>;
        role: z.ZodEnum<{
            request: "request";
            session_close: "session_close";
            session_opening: "session_opening";
            tool_listing: "tool_listing";
        }>;
        method: z.ZodEnum<{
            DELETE: "DELETE";
            GET: "GET";
            HEAD: "HEAD";
            PATCH: "PATCH";
            POST: "POST";
            PUT: "PUT";
        }>;
        url: z.ZodURL;
        started_at: z.ZodISODateTime;
        finished_at: z.ZodISODateTime;
        response: z.ZodNullable<z.ZodObject<{
            status: z.ZodNumber;
            media_type: z.ZodString;
            content_bytes: z.ZodNumber;
            content_digest: z.ZodString;
        }, z.core.$strict>>;
        transport_error: z.ZodNullable<z.ZodString>;
        exchange_digest: z.ZodString;
    }, z.core.$strict>>;
    assertions: z.ZodArray<z.ZodObject<{
        assertion: z.ZodString;
        holds: z.ZodBoolean;
        failure: z.ZodNullable<z.ZodObject<{
            check: z.ZodNumber;
            reason: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    error_probe: z.ZodNullable<z.ZodObject<{
        typed: z.ZodBoolean;
        reason: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type AgentReadinessRunSummary = z.infer<typeof agentReadinessRunSummarySchema>;
/** What a step outcome rests on: entries of a run record, by reference. */
export declare const agentReadinessStepEvidenceSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    kind: z.ZodLiteral<"exchange">;
    run_digest: z.ZodString;
    exchange_digest: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"discovery">;
    run_digest: z.ZodString;
    attempt_digest: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"credential">;
    run_digest: z.ZodString;
    handle_digest: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"declaration">;
    run_digest: z.ZodString;
}, z.core.$strict>], "kind">;
export declare const agentReadinessStepResultSchema: z.ZodObject<{
    step: z.ZodEnum<{
        authority: "authority";
        confirm: "confirm";
        discover: "discover";
        onboard: "onboard";
        pay: "pay";
        sustain: "sustain";
    }>;
    outcome: z.ZodEnum<{
        approval: "approval";
        gated: "gated";
        machine: "machine";
        not_applicable: "not_applicable";
        not_assessed: "not_assessed";
        workaround: "workaround";
    }>;
    timing: z.ZodNullable<z.ZodEnum<{
        recurring: "recurring";
        setup: "setup";
    }>>;
    evidence: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"exchange">;
        run_digest: z.ZodString;
        exchange_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"discovery">;
        run_digest: z.ZodString;
        attempt_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"credential">;
        run_digest: z.ZodString;
        handle_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"declaration">;
        run_digest: z.ZodString;
    }, z.core.$strict>], "kind">>;
}, z.core.$strict>;
export type AgentReadinessStepResult = z.infer<typeof agentReadinessStepResultSchema>;
/** The job's outcome (north star §5.6, the job), beside the steps, with what it rests on. */
export declare const agentReadinessJobResultSchema: z.ZodObject<{
    outcome: z.ZodEnum<{
        not_assessed: "not_assessed";
        reachable: "reachable";
        unavailable: "unavailable";
        verified: "verified";
    }>;
    evidence: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"exchange">;
        run_digest: z.ZodString;
        exchange_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"discovery">;
        run_digest: z.ZodString;
        attempt_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"credential">;
        run_digest: z.ZodString;
        handle_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"declaration">;
        run_digest: z.ZodString;
    }, z.core.$strict>], "kind">>;
}, z.core.$strict>;
export type AgentReadinessJobResult = z.infer<typeof agentReadinessJobResultSchema>;
//# sourceMappingURL=run.d.ts.map