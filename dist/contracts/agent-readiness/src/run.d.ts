import { type ExchangeRecord } from "provenry/exchange/records";
import { z } from "zod";
export declare const agentReadinessRunKindSchema: z.ZodEnum<{
    onboard: "onboard";
    operate: "operate";
    operate_onboard: "operate_onboard";
}>;
/** The most descriptor retrievals, and the most facts, one run records. */
export declare const AGENT_READINESS_DISCOVERY_LIMIT = 64;
/** An agent-facing fact a descriptor on the service's domain states. */
export declare const agentReadinessDiscoveryFactSchema: z.ZodObject<{
    fact: z.ZodEnum<{
        agent_documentation: "agent_documentation";
        agent_registration: "agent_registration";
        agent_skill: "agent_skill";
        api_catalog_link: "api_catalog_link";
        ard_entry: "ard_entry";
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
export declare const agentReadinessRunExchangeSchema: z.ZodObject<{
    purpose: z.ZodEnum<{
        cleanup: "cleanup";
        delegation: "delegation";
        error_probe: "error_probe";
        job: "job";
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
/** A human step a runner recorded as it happened. */
export declare const agentReadinessHandoffSchema: z.ZodObject<{
    step: z.ZodEnum<{
        confirm: "confirm";
        delegation: "delegation";
        discover: "discover";
        job: "job";
        pay: "pay";
        sustain: "sustain";
    }>;
    kind: z.ZodEnum<{
        approval: "approval";
        workaround: "workaround";
    }>;
    timing: z.ZodEnum<{
        recurring: "recurring";
        setup: "setup";
    }>;
    statement: z.ZodString;
    recorded_by: z.ZodString;
    recorded_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const agentReadinessAssertionResultSchema: z.ZodObject<{
    assertion: z.ZodString;
    holds: z.ZodBoolean;
    failure: z.ZodNullable<z.ZodObject<{
        check: z.ZodNumber;
        reason: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
/** A runner-side failure: never a fact about the service, always residue to retry. */
export declare const agentReadinessRunResidueSchema: z.ZodObject<{
    step: z.ZodEnum<{
        confirm: "confirm";
        delegation: "delegation";
        discover: "discover";
        job: "job";
        pay: "pay";
        sustain: "sustain";
    }>;
    reason: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessRunRecordCoreSchema: z.ZodObject<{
    run_contract: z.ZodLiteral<"sourcey.agent-readiness-run/v1alpha1">;
    entity_id: z.ZodString;
    product_key: z.ZodString;
    job_id: z.ZodString;
    run_kind: z.ZodEnum<{
        onboard: "onboard";
        operate: "operate";
        operate_onboard: "operate_onboard";
    }>;
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
        attempts: z.ZodArray<z.ZodString>;
        facts: z.ZodArray<z.ZodObject<{
            fact: z.ZodEnum<{
                agent_documentation: "agent_documentation";
                agent_registration: "agent_registration";
                agent_skill: "agent_skill";
                api_catalog_link: "api_catalog_link";
                ard_entry: "ard_entry";
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
    handoffs: z.ZodArray<z.ZodObject<{
        step: z.ZodEnum<{
            confirm: "confirm";
            delegation: "delegation";
            discover: "discover";
            job: "job";
            pay: "pay";
            sustain: "sustain";
        }>;
        kind: z.ZodEnum<{
            approval: "approval";
            workaround: "workaround";
        }>;
        timing: z.ZodEnum<{
            recurring: "recurring";
            setup: "setup";
        }>;
        statement: z.ZodString;
        recorded_by: z.ZodString;
        recorded_at: z.ZodISODateTime;
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
        step: z.ZodEnum<{
            confirm: "confirm";
            delegation: "delegation";
            discover: "discover";
            job: "job";
            pay: "pay";
            sustain: "sustain";
        }>;
        reason: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessRunRecordSchema: z.ZodObject<{
    run_contract: z.ZodLiteral<"sourcey.agent-readiness-run/v1alpha1">;
    entity_id: z.ZodString;
    product_key: z.ZodString;
    job_id: z.ZodString;
    run_kind: z.ZodEnum<{
        onboard: "onboard";
        operate: "operate";
        operate_onboard: "operate_onboard";
    }>;
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
        attempts: z.ZodArray<z.ZodString>;
        facts: z.ZodArray<z.ZodObject<{
            fact: z.ZodEnum<{
                agent_documentation: "agent_documentation";
                agent_registration: "agent_registration";
                agent_skill: "agent_skill";
                api_catalog_link: "api_catalog_link";
                ard_entry: "ard_entry";
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
    handoffs: z.ZodArray<z.ZodObject<{
        step: z.ZodEnum<{
            confirm: "confirm";
            delegation: "delegation";
            discover: "discover";
            job: "job";
            pay: "pay";
            sustain: "sustain";
        }>;
        kind: z.ZodEnum<{
            approval: "approval";
            workaround: "workaround";
        }>;
        timing: z.ZodEnum<{
            recurring: "recurring";
            setup: "setup";
        }>;
        statement: z.ZodString;
        recorded_by: z.ZodString;
        recorded_at: z.ZodISODateTime;
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
        step: z.ZodEnum<{
            confirm: "confirm";
            delegation: "delegation";
            discover: "discover";
            job: "job";
            pay: "pay";
            sustain: "sustain";
        }>;
        reason: z.ZodString;
    }, z.core.$strict>>;
    run_digest: z.ZodString;
}, z.core.$strict>;
export type AgentReadinessRunRecord = z.infer<typeof agentReadinessRunRecordSchema>;
/**
 * The latest run as a card shows it: how many descriptors it read, every
 * request it sent and what came back (status, type, size and digest, never the
 * body), and what held. Compiled from the run record, so it is checked with it.
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
    kind: z.ZodLiteral<"handoff">;
    run_digest: z.ZodString;
    handoff: z.ZodNumber;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"credential">;
    run_digest: z.ZodString;
    handle_digest: z.ZodString;
}, z.core.$strict>], "kind">;
export declare const agentReadinessStepResultSchema: z.ZodObject<{
    step: z.ZodEnum<{
        confirm: "confirm";
        delegation: "delegation";
        discover: "discover";
        job: "job";
        pay: "pay";
        sustain: "sustain";
    }>;
    outcome: z.ZodEnum<{
        approval: "approval";
        blocked: "blocked";
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
        kind: z.ZodLiteral<"handoff">;
        run_digest: z.ZodString;
        handoff: z.ZodNumber;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"credential">;
        run_digest: z.ZodString;
        handle_digest: z.ZodString;
    }, z.core.$strict>], "kind">>;
}, z.core.$strict>;
export type AgentReadinessStepResult = z.infer<typeof agentReadinessStepResultSchema>;
//# sourceMappingURL=run.d.ts.map