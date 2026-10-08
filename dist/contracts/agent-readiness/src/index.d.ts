import { z } from "zod";
import { agentReadinessScopeSchema } from "./shared.js";
export * from "./authority.js";
export * from "./binding.js";
export * from "./declaration.js";
export * from "./declaration-acquisition.js";
export * from "./declaration-reference.js";
export * from "./jobs.js";
export * from "./operate-policy.js";
export * from "./run.js";
export * from "./shared.js";
/** Canonical discriminant for a published Agent Readiness revision. */
export declare const agentReadinessRevisionContract: "sourcey.agent-readiness-revision/v1alpha1";
export declare const agentReadinessEngineIdentitySchema: z.ZodObject<{
    name: z.ZodString;
    version: z.ZodString;
    engine_digest: z.ZodString;
}, z.core.$strict>;
/** A revision's exact input: its fields and the run records they rest on, oldest first. */
export declare const agentReadinessProfileInputSchema: z.ZodObject<{
    agent_readiness_profile_id: z.ZodString;
    entity_id: z.ZodString;
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
    catalog_binding: z.ZodObject<{
        base_release_id: z.ZodString;
        entity_revision_digest: z.ZodString;
    }, z.core.$strict>;
    declaration_revision_digest: z.ZodString;
    declaration: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"none">;
    }, z.core.$strict>, z.ZodObject<{
        declaration_id: z.ZodString;
        provenance: z.ZodUnion<readonly [z.ZodObject<{
            repository: z.ZodLiteral<"sourcey/agent-ready-services">;
            commit: z.ZodString;
            path: z.ZodString;
            git_blob_oid: z.ZodString;
            blob_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"sourcey">;
            path: z.ZodString;
            blob_digest: z.ZodString;
        }, z.core.$strict>]>;
        status: z.ZodEnum<{
            community_declared: "community_declared";
            entity_attested: "entity_attested";
        }>;
    }, z.core.$strict>], "status">;
    lifecycle: z.ZodEnum<{
        active: "active";
        ended: "ended";
        withdrawn: "withdrawn";
    }>;
    effective_from: z.ZodISODateTime;
    effective_until: z.ZodOptional<z.ZodISODateTime>;
    job_digest: z.ZodString;
    engine: z.ZodObject<{
        name: z.ZodString;
        version: z.ZodString;
        engine_digest: z.ZodString;
    }, z.core.$strict>;
    binding_id: z.ZodNullable<z.ZodString>;
    binding_digest: z.ZodNullable<z.ZodString>;
    runs: z.ZodArray<z.ZodObject<{
        run_digest: z.ZodString;
        label: z.ZodEnum<{
            probed: "probed";
            sourcey_run: "sourcey_run";
            vendor_run_verified: "vendor_run_verified";
        }>;
        run_kind: z.ZodEnum<{
            onboard: "onboard";
            operate: "operate";
            operate_onboard: "operate_onboard";
        }>;
        finished_at: z.ZodISODateTime;
    }, z.core.$strict>>;
    steps: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strict>>;
    onboard_level: z.ZodNullable<z.ZodNumber>;
    discovery: z.ZodArray<z.ZodObject<{
        fact: z.ZodEnum<{
            agent_registration: "agent_registration";
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
    latest_run: z.ZodObject<{
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
    input_contract: z.ZodLiteral<"sourcey.agent-readiness-input/v1alpha1">;
    run_records: z.ZodArray<z.ZodObject<{
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
                    agent_registration: "agent_registration";
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
            record: z.ZodCustom<import("provenry/exchange/records").ExchangeRecord, import("provenry/exchange/records").ExchangeRecord>;
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
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessOfferRelationInputSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const agentReadinessProfileReleaseInputSchema: z.ZodObject<{
    release_input_contract: z.ZodLiteral<"sourcey.agent-readiness-release-input/v1alpha1">;
    profile_input: z.ZodObject<{
        agent_readiness_profile_id: z.ZodString;
        entity_id: z.ZodString;
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
        catalog_binding: z.ZodObject<{
            base_release_id: z.ZodString;
            entity_revision_digest: z.ZodString;
        }, z.core.$strict>;
        declaration_revision_digest: z.ZodString;
        declaration: z.ZodDiscriminatedUnion<[z.ZodObject<{
            status: z.ZodLiteral<"none">;
        }, z.core.$strict>, z.ZodObject<{
            declaration_id: z.ZodString;
            provenance: z.ZodUnion<readonly [z.ZodObject<{
                repository: z.ZodLiteral<"sourcey/agent-ready-services">;
                commit: z.ZodString;
                path: z.ZodString;
                git_blob_oid: z.ZodString;
                blob_digest: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                source: z.ZodLiteral<"sourcey">;
                path: z.ZodString;
                blob_digest: z.ZodString;
            }, z.core.$strict>]>;
            status: z.ZodEnum<{
                community_declared: "community_declared";
                entity_attested: "entity_attested";
            }>;
        }, z.core.$strict>], "status">;
        lifecycle: z.ZodEnum<{
            active: "active";
            ended: "ended";
            withdrawn: "withdrawn";
        }>;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        job_digest: z.ZodString;
        engine: z.ZodObject<{
            name: z.ZodString;
            version: z.ZodString;
            engine_digest: z.ZodString;
        }, z.core.$strict>;
        binding_id: z.ZodNullable<z.ZodString>;
        binding_digest: z.ZodNullable<z.ZodString>;
        runs: z.ZodArray<z.ZodObject<{
            run_digest: z.ZodString;
            label: z.ZodEnum<{
                probed: "probed";
                sourcey_run: "sourcey_run";
                vendor_run_verified: "vendor_run_verified";
            }>;
            run_kind: z.ZodEnum<{
                onboard: "onboard";
                operate: "operate";
                operate_onboard: "operate_onboard";
            }>;
            finished_at: z.ZodISODateTime;
        }, z.core.$strict>>;
        steps: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        onboard_level: z.ZodNullable<z.ZodNumber>;
        discovery: z.ZodArray<z.ZodObject<{
            fact: z.ZodEnum<{
                agent_registration: "agent_registration";
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
        latest_run: z.ZodObject<{
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
        input_contract: z.ZodLiteral<"sourcey.agent-readiness-input/v1alpha1">;
        run_records: z.ZodArray<z.ZodObject<{
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
                        agent_registration: "agent_registration";
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
                record: z.ZodCustom<import("provenry/exchange/records").ExchangeRecord, import("provenry/exchange/records").ExchangeRecord>;
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
        }, z.core.$strict>>;
    }, z.core.$strict>;
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
    offer_relation_inputs: z.ZodArray<z.ZodObject<{
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
}, z.core.$strict>;
export declare const agentReadinessRevisionCoreSchema: z.ZodObject<{
    agent_readiness_profile_id: z.ZodString;
    entity_id: z.ZodString;
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
    catalog_binding: z.ZodObject<{
        base_release_id: z.ZodString;
        entity_revision_digest: z.ZodString;
    }, z.core.$strict>;
    declaration_revision_digest: z.ZodString;
    declaration: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"none">;
    }, z.core.$strict>, z.ZodObject<{
        declaration_id: z.ZodString;
        provenance: z.ZodUnion<readonly [z.ZodObject<{
            repository: z.ZodLiteral<"sourcey/agent-ready-services">;
            commit: z.ZodString;
            path: z.ZodString;
            git_blob_oid: z.ZodString;
            blob_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"sourcey">;
            path: z.ZodString;
            blob_digest: z.ZodString;
        }, z.core.$strict>]>;
        status: z.ZodEnum<{
            community_declared: "community_declared";
            entity_attested: "entity_attested";
        }>;
    }, z.core.$strict>], "status">;
    lifecycle: z.ZodEnum<{
        active: "active";
        ended: "ended";
        withdrawn: "withdrawn";
    }>;
    effective_from: z.ZodISODateTime;
    effective_until: z.ZodOptional<z.ZodISODateTime>;
    job_digest: z.ZodString;
    engine: z.ZodObject<{
        name: z.ZodString;
        version: z.ZodString;
        engine_digest: z.ZodString;
    }, z.core.$strict>;
    binding_id: z.ZodNullable<z.ZodString>;
    binding_digest: z.ZodNullable<z.ZodString>;
    runs: z.ZodArray<z.ZodObject<{
        run_digest: z.ZodString;
        label: z.ZodEnum<{
            probed: "probed";
            sourcey_run: "sourcey_run";
            vendor_run_verified: "vendor_run_verified";
        }>;
        run_kind: z.ZodEnum<{
            onboard: "onboard";
            operate: "operate";
            operate_onboard: "operate_onboard";
        }>;
        finished_at: z.ZodISODateTime;
    }, z.core.$strict>>;
    steps: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strict>>;
    onboard_level: z.ZodNullable<z.ZodNumber>;
    discovery: z.ZodArray<z.ZodObject<{
        fact: z.ZodEnum<{
            agent_registration: "agent_registration";
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
    latest_run: z.ZodObject<{
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
    revision_contract: z.ZodLiteral<"sourcey.agent-readiness-revision/v1alpha1">;
}, z.core.$strict>;
export declare const agentReadinessRevisionSchema: z.ZodObject<{
    agent_readiness_profile_id: z.ZodString;
    entity_id: z.ZodString;
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
    catalog_binding: z.ZodObject<{
        base_release_id: z.ZodString;
        entity_revision_digest: z.ZodString;
    }, z.core.$strict>;
    declaration_revision_digest: z.ZodString;
    declaration: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"none">;
    }, z.core.$strict>, z.ZodObject<{
        declaration_id: z.ZodString;
        provenance: z.ZodUnion<readonly [z.ZodObject<{
            repository: z.ZodLiteral<"sourcey/agent-ready-services">;
            commit: z.ZodString;
            path: z.ZodString;
            git_blob_oid: z.ZodString;
            blob_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"sourcey">;
            path: z.ZodString;
            blob_digest: z.ZodString;
        }, z.core.$strict>]>;
        status: z.ZodEnum<{
            community_declared: "community_declared";
            entity_attested: "entity_attested";
        }>;
    }, z.core.$strict>], "status">;
    lifecycle: z.ZodEnum<{
        active: "active";
        ended: "ended";
        withdrawn: "withdrawn";
    }>;
    effective_from: z.ZodISODateTime;
    effective_until: z.ZodOptional<z.ZodISODateTime>;
    job_digest: z.ZodString;
    engine: z.ZodObject<{
        name: z.ZodString;
        version: z.ZodString;
        engine_digest: z.ZodString;
    }, z.core.$strict>;
    binding_id: z.ZodNullable<z.ZodString>;
    binding_digest: z.ZodNullable<z.ZodString>;
    runs: z.ZodArray<z.ZodObject<{
        run_digest: z.ZodString;
        label: z.ZodEnum<{
            probed: "probed";
            sourcey_run: "sourcey_run";
            vendor_run_verified: "vendor_run_verified";
        }>;
        run_kind: z.ZodEnum<{
            onboard: "onboard";
            operate: "operate";
            operate_onboard: "operate_onboard";
        }>;
        finished_at: z.ZodISODateTime;
    }, z.core.$strict>>;
    steps: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strict>>;
    onboard_level: z.ZodNullable<z.ZodNumber>;
    discovery: z.ZodArray<z.ZodObject<{
        fact: z.ZodEnum<{
            agent_registration: "agent_registration";
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
    latest_run: z.ZodObject<{
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
    revision_contract: z.ZodLiteral<"sourcey.agent-readiness-revision/v1alpha1">;
    revision_digest: z.ZodString;
}, z.core.$strict>;
/**
 * Stable head identity for closure and ownership checks. Historical Agent
 * Readiness revision bodies remain opaque and are never reparsed through the
 * current contract.
 */
export declare const agentReadinessRevisionHeadSchema: z.ZodObject<{
    revision_contract: z.ZodLiteral<"sourcey.agent-readiness-revision/v1alpha1">;
    agent_readiness_profile_id: z.ZodString;
    entity_id: z.ZodString;
    revision_digest: z.ZodString;
}, z.core.$strip>;
export declare const agentReadinessPublicationVisibilitySchema: z.ZodEnum<{
    discoverable: "discoverable";
    private: "private";
    resolvable_only: "resolvable_only";
}>;
export declare const agentReadinessProjectionCoreSchema: z.ZodObject<{
    projection_contract: z.ZodLiteral<"sourcey.agent-readiness-projection/v1alpha1">;
    agent_readiness_profile_id: z.ZodString;
    entity_id: z.ZodString;
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
    catalog_binding: z.ZodObject<{
        base_release_id: z.ZodString;
        entity_revision_digest: z.ZodString;
    }, z.core.$strict>;
    declaration_revision_digest: z.ZodString;
    declaration: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"none">;
    }, z.core.$strict>, z.ZodObject<{
        declaration_id: z.ZodString;
        provenance: z.ZodUnion<readonly [z.ZodObject<{
            repository: z.ZodLiteral<"sourcey/agent-ready-services">;
            commit: z.ZodString;
            path: z.ZodString;
            git_blob_oid: z.ZodString;
            blob_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"sourcey">;
            path: z.ZodString;
            blob_digest: z.ZodString;
        }, z.core.$strict>]>;
        status: z.ZodEnum<{
            community_declared: "community_declared";
            entity_attested: "entity_attested";
        }>;
    }, z.core.$strict>], "status">;
    surface_catalog: z.ZodObject<{
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
    }, z.core.$strict>;
    lifecycle: z.ZodEnum<{
        active: "active";
        ended: "ended";
        withdrawn: "withdrawn";
    }>;
    effective_from: z.ZodISODateTime;
    effective_until: z.ZodOptional<z.ZodISODateTime>;
    revision_digest: z.ZodString;
    policy_digest: z.ZodString;
    policy_version: z.ZodString;
    policy_as_of: z.ZodISODateTime;
    job: z.ZodObject<{
        job_id: z.ZodString;
        job_digest: z.ZodString;
        category: z.ZodString;
        name: z.ZodString;
        statement: z.ZodString;
    }, z.core.$strict>;
    interface_id: z.ZodNullable<z.ZodString>;
    label: z.ZodEnum<{
        probed: "probed";
        sourcey_run: "sourcey_run";
        vendor_run_verified: "vendor_run_verified";
    }>;
    operate: z.ZodObject<{
        letter: z.ZodNullable<z.ZodEnum<{
            A: "A";
            "A+": "A+";
            B: "B";
            "B+": "B+";
            C: "C";
            "C+": "C+";
            D: "D";
            F: "F";
        }>>;
        statement: z.ZodNullable<z.ZodString>;
        steps: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        missing: z.ZodArray<z.ZodEnum<{
            confirm: "confirm";
            delegation: "delegation";
            discover: "discover";
            job: "job";
            pay: "pay";
            sustain: "sustain";
        }>>;
        approvals: z.ZodArray<z.ZodEnum<{
            confirm: "confirm";
            delegation: "delegation";
            discover: "discover";
            job: "job";
            pay: "pay";
            sustain: "sustain";
        }>>;
        workarounds: z.ZodArray<z.ZodObject<{
            step: z.ZodEnum<{
                confirm: "confirm";
                delegation: "delegation";
                discover: "discover";
                job: "job";
                pay: "pay";
                sustain: "sustain";
            }>;
            timing: z.ZodEnum<{
                recurring: "recurring";
                setup: "setup";
            }>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    onboard: z.ZodObject<{
        level: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strict>;
    discovery: z.ZodArray<z.ZodObject<{
        fact: z.ZodEnum<{
            agent_registration: "agent_registration";
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
    run: z.ZodObject<{
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
        error_probe: z.ZodNullable<z.ZodObject<{
            typed: z.ZodBoolean;
            reason: z.ZodString;
        }, z.core.$strict>>;
        assertions: z.ZodArray<z.ZodObject<{
            assertion: z.ZodString;
            holds: z.ZodBoolean;
            failure: z.ZodNullable<z.ZodObject<{
                check: z.ZodNumber;
                reason: z.ZodString;
            }, z.core.$strict>>;
            statement: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    last_run_at: z.ZodISODateTime;
    publication: z.ZodObject<{
        visibility: z.ZodEnum<{
            discoverable: "discoverable";
            private: "private";
            resolvable_only: "resolvable_only";
        }>;
        reasons: z.ZodArray<z.ZodEnum<{
            lifecycle_not_active: "lifecycle_not_active";
            open_dispute: "open_dispute";
        }>>;
    }, z.core.$strict>;
    provenance: z.ZodObject<{
        dispute: z.ZodEnum<{
            none: "none";
            open: "open";
            resolved: "resolved";
        }>;
        basis_event_ids: z.ZodArray<z.ZodString>;
        vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
            status: z.ZodLiteral<"none">;
        }, z.core.$strict>, z.ZodObject<{
            status: z.ZodLiteral<"current">;
            event_id: z.ZodString;
            attested_at: z.ZodISODateTime;
        }, z.core.$strict>], "status">;
    }, z.core.$strict>;
    canonical_url: z.ZodURL;
}, z.core.$strict>;
export declare const agentReadinessProjectionSchema: z.ZodObject<{
    projection_contract: z.ZodLiteral<"sourcey.agent-readiness-projection/v1alpha1">;
    agent_readiness_profile_id: z.ZodString;
    entity_id: z.ZodString;
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
    catalog_binding: z.ZodObject<{
        base_release_id: z.ZodString;
        entity_revision_digest: z.ZodString;
    }, z.core.$strict>;
    declaration_revision_digest: z.ZodString;
    declaration: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"none">;
    }, z.core.$strict>, z.ZodObject<{
        declaration_id: z.ZodString;
        provenance: z.ZodUnion<readonly [z.ZodObject<{
            repository: z.ZodLiteral<"sourcey/agent-ready-services">;
            commit: z.ZodString;
            path: z.ZodString;
            git_blob_oid: z.ZodString;
            blob_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"sourcey">;
            path: z.ZodString;
            blob_digest: z.ZodString;
        }, z.core.$strict>]>;
        status: z.ZodEnum<{
            community_declared: "community_declared";
            entity_attested: "entity_attested";
        }>;
    }, z.core.$strict>], "status">;
    surface_catalog: z.ZodObject<{
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
    }, z.core.$strict>;
    lifecycle: z.ZodEnum<{
        active: "active";
        ended: "ended";
        withdrawn: "withdrawn";
    }>;
    effective_from: z.ZodISODateTime;
    effective_until: z.ZodOptional<z.ZodISODateTime>;
    revision_digest: z.ZodString;
    policy_digest: z.ZodString;
    policy_version: z.ZodString;
    policy_as_of: z.ZodISODateTime;
    job: z.ZodObject<{
        job_id: z.ZodString;
        job_digest: z.ZodString;
        category: z.ZodString;
        name: z.ZodString;
        statement: z.ZodString;
    }, z.core.$strict>;
    interface_id: z.ZodNullable<z.ZodString>;
    label: z.ZodEnum<{
        probed: "probed";
        sourcey_run: "sourcey_run";
        vendor_run_verified: "vendor_run_verified";
    }>;
    operate: z.ZodObject<{
        letter: z.ZodNullable<z.ZodEnum<{
            A: "A";
            "A+": "A+";
            B: "B";
            "B+": "B+";
            C: "C";
            "C+": "C+";
            D: "D";
            F: "F";
        }>>;
        statement: z.ZodNullable<z.ZodString>;
        steps: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        missing: z.ZodArray<z.ZodEnum<{
            confirm: "confirm";
            delegation: "delegation";
            discover: "discover";
            job: "job";
            pay: "pay";
            sustain: "sustain";
        }>>;
        approvals: z.ZodArray<z.ZodEnum<{
            confirm: "confirm";
            delegation: "delegation";
            discover: "discover";
            job: "job";
            pay: "pay";
            sustain: "sustain";
        }>>;
        workarounds: z.ZodArray<z.ZodObject<{
            step: z.ZodEnum<{
                confirm: "confirm";
                delegation: "delegation";
                discover: "discover";
                job: "job";
                pay: "pay";
                sustain: "sustain";
            }>;
            timing: z.ZodEnum<{
                recurring: "recurring";
                setup: "setup";
            }>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    onboard: z.ZodObject<{
        level: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strict>;
    discovery: z.ZodArray<z.ZodObject<{
        fact: z.ZodEnum<{
            agent_registration: "agent_registration";
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
    run: z.ZodObject<{
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
        error_probe: z.ZodNullable<z.ZodObject<{
            typed: z.ZodBoolean;
            reason: z.ZodString;
        }, z.core.$strict>>;
        assertions: z.ZodArray<z.ZodObject<{
            assertion: z.ZodString;
            holds: z.ZodBoolean;
            failure: z.ZodNullable<z.ZodObject<{
                check: z.ZodNumber;
                reason: z.ZodString;
            }, z.core.$strict>>;
            statement: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    last_run_at: z.ZodISODateTime;
    publication: z.ZodObject<{
        visibility: z.ZodEnum<{
            discoverable: "discoverable";
            private: "private";
            resolvable_only: "resolvable_only";
        }>;
        reasons: z.ZodArray<z.ZodEnum<{
            lifecycle_not_active: "lifecycle_not_active";
            open_dispute: "open_dispute";
        }>>;
    }, z.core.$strict>;
    provenance: z.ZodObject<{
        dispute: z.ZodEnum<{
            none: "none";
            open: "open";
            resolved: "resolved";
        }>;
        basis_event_ids: z.ZodArray<z.ZodString>;
        vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
            status: z.ZodLiteral<"none">;
        }, z.core.$strict>, z.ZodObject<{
            status: z.ZodLiteral<"current">;
            event_id: z.ZodString;
            attested_at: z.ZodISODateTime;
        }, z.core.$strict>], "status">;
    }, z.core.$strict>;
    canonical_url: z.ZodURL;
    projection_digest: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessProfileSummarySchema: z.ZodObject<{
    agent_readiness_profile_id: z.ZodString;
    entity_id: z.ZodString;
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
    declaration_revision_digest: z.ZodString;
    lifecycle: z.ZodEnum<{
        active: "active";
        ended: "ended";
        withdrawn: "withdrawn";
    }>;
    effective_from: z.ZodISODateTime;
    revision_digest: z.ZodString;
    policy_digest: z.ZodString;
    policy_version: z.ZodString;
    policy_as_of: z.ZodISODateTime;
    label: z.ZodEnum<{
        probed: "probed";
        sourcey_run: "sourcey_run";
        vendor_run_verified: "vendor_run_verified";
    }>;
    last_run_at: z.ZodISODateTime;
    publication: z.ZodObject<{
        visibility: z.ZodEnum<{
            discoverable: "discoverable";
            private: "private";
            resolvable_only: "resolvable_only";
        }>;
        reasons: z.ZodArray<z.ZodEnum<{
            lifecycle_not_active: "lifecycle_not_active";
            open_dispute: "open_dispute";
        }>>;
    }, z.core.$strict>;
    provenance: z.ZodObject<{
        dispute: z.ZodEnum<{
            none: "none";
            open: "open";
            resolved: "resolved";
        }>;
        basis_event_ids: z.ZodArray<z.ZodString>;
        vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
            status: z.ZodLiteral<"none">;
        }, z.core.$strict>, z.ZodObject<{
            status: z.ZodLiteral<"current">;
            event_id: z.ZodString;
            attested_at: z.ZodISODateTime;
        }, z.core.$strict>], "status">;
    }, z.core.$strict>;
    canonical_url: z.ZodURL;
    projection_digest: z.ZodString;
    operate: z.ZodObject<{
        letter: z.ZodNullable<z.ZodEnum<{
            A: "A";
            "A+": "A+";
            B: "B";
            "B+": "B+";
            C: "C";
            "C+": "C+";
            D: "D";
            F: "F";
        }>>;
        steps: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
    }, z.core.$strict>;
    onboard: z.ZodObject<{
        level: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strict>;
}, z.core.$strict>;
/** The freshness index's namespace for report cards; each subject is a profile id. */
export declare const AGENT_READINESS_FRESHNESS_NAMESPACE = "agent-readiness";
/**
 * A card's freshness as serving reads it from the freshness index, beside the
 * released facts: never released itself, so a recheck that changes nothing
 * publishes nothing.
 */
export declare const agentReadinessServedFreshnessSchema: z.ZodObject<{
    checked_at: z.ZodISODateTime;
    succeeded_at: z.ZodNullable<z.ZodISODateTime>;
    next_due_at: z.ZodNullable<z.ZodISODateTime>;
    state: z.ZodEnum<{
        fresh: "fresh";
        stale: "stale";
    }>;
}, z.core.$strict>;
export type AgentReadinessServedFreshness = z.infer<typeof agentReadinessServedFreshnessSchema>;
/** Served freshness by profile id: what a response carries beside its released profiles. */
export declare const agentReadinessServedFreshnessMapSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    checked_at: z.ZodISODateTime;
    succeeded_at: z.ZodNullable<z.ZodISODateTime>;
    next_due_at: z.ZodNullable<z.ZodISODateTime>;
    state: z.ZodEnum<{
        fresh: "fresh";
        stale: "stale";
    }>;
}, z.core.$strict>>;
/** The instant before which a card's last success makes it stale, under the policy's window. */
export declare function agentReadinessStaleBefore(now: string, policy: {
    readonly fresh_for_days: number;
}): string;
/** The one definition of staleness: no success yet, or the last one before `staleBefore`. */
export declare function agentReadinessServedFreshness(record: {
    readonly checkedAt: string;
    readonly succeededAt: string | null;
    readonly nextDueAt: string | null;
}, staleBefore: string): AgentReadinessServedFreshness;
/** The one compact public-list projection of a complete released profile. */
export declare function summarizeAgentReadinessProfile(profile: AgentReadinessProjection): AgentReadinessProfileSummary;
/** Whether two profiles rate the same product and job. */
export declare function sameAgentReadinessScope(left: z.infer<typeof agentReadinessScopeSchema>, right: z.infer<typeof agentReadinessScopeSchema>): boolean;
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
export declare const agentReadinessIndexSchema: z.ZodObject<{
    agent_readiness_index_contract: z.ZodLiteral<"sourcey.agent-readiness-index/v1alpha1">;
    profiles: z.ZodRecord<z.ZodString, z.ZodObject<{
        agent_readiness_profile_id: z.ZodString;
        entity_id: z.ZodString;
        lifecycle: z.ZodEnum<{
            active: "active";
            ended: "ended";
            withdrawn: "withdrawn";
        }>;
        revision_digest: z.ZodString;
        policy_digest: z.ZodString;
        projection_digest: z.ZodString;
        canonical_url: z.ZodURL;
        path: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessInputsSchema: z.ZodObject<{
    input_contract: z.ZodLiteral<"sourcey.agent-readiness-inputs/v1alpha1">;
    policy_digest: z.ZodString;
    profiles: z.ZodArray<z.ZodObject<{
        agent_readiness_profile_id: z.ZodString;
        input_digest: z.ZodString;
        revision_digest: z.ZodString;
        path: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessDeltaObjectSchema: z.ZodObject<{
    object_contract: z.ZodLiteral<"sourcey.agent-readiness-delta-object/v1alpha1">;
    agent_readiness_profile_id: z.ZodString;
    profile_input: z.ZodNullable<z.ZodObject<{
        agent_readiness_profile_id: z.ZodString;
        entity_id: z.ZodString;
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
        catalog_binding: z.ZodObject<{
            base_release_id: z.ZodString;
            entity_revision_digest: z.ZodString;
        }, z.core.$strict>;
        declaration_revision_digest: z.ZodString;
        declaration: z.ZodDiscriminatedUnion<[z.ZodObject<{
            status: z.ZodLiteral<"none">;
        }, z.core.$strict>, z.ZodObject<{
            declaration_id: z.ZodString;
            provenance: z.ZodUnion<readonly [z.ZodObject<{
                repository: z.ZodLiteral<"sourcey/agent-ready-services">;
                commit: z.ZodString;
                path: z.ZodString;
                git_blob_oid: z.ZodString;
                blob_digest: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                source: z.ZodLiteral<"sourcey">;
                path: z.ZodString;
                blob_digest: z.ZodString;
            }, z.core.$strict>]>;
            status: z.ZodEnum<{
                community_declared: "community_declared";
                entity_attested: "entity_attested";
            }>;
        }, z.core.$strict>], "status">;
        lifecycle: z.ZodEnum<{
            active: "active";
            ended: "ended";
            withdrawn: "withdrawn";
        }>;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        job_digest: z.ZodString;
        engine: z.ZodObject<{
            name: z.ZodString;
            version: z.ZodString;
            engine_digest: z.ZodString;
        }, z.core.$strict>;
        binding_id: z.ZodNullable<z.ZodString>;
        binding_digest: z.ZodNullable<z.ZodString>;
        runs: z.ZodArray<z.ZodObject<{
            run_digest: z.ZodString;
            label: z.ZodEnum<{
                probed: "probed";
                sourcey_run: "sourcey_run";
                vendor_run_verified: "vendor_run_verified";
            }>;
            run_kind: z.ZodEnum<{
                onboard: "onboard";
                operate: "operate";
                operate_onboard: "operate_onboard";
            }>;
            finished_at: z.ZodISODateTime;
        }, z.core.$strict>>;
        steps: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
        onboard_level: z.ZodNullable<z.ZodNumber>;
        discovery: z.ZodArray<z.ZodObject<{
            fact: z.ZodEnum<{
                agent_registration: "agent_registration";
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
        latest_run: z.ZodObject<{
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
        input_contract: z.ZodLiteral<"sourcey.agent-readiness-input/v1alpha1">;
        run_records: z.ZodArray<z.ZodObject<{
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
                        agent_registration: "agent_registration";
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
                record: z.ZodCustom<import("provenry/exchange/records").ExchangeRecord, import("provenry/exchange/records").ExchangeRecord>;
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
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    projection: z.ZodNullable<z.ZodObject<{
        projection_contract: z.ZodLiteral<"sourcey.agent-readiness-projection/v1alpha1">;
        agent_readiness_profile_id: z.ZodString;
        entity_id: z.ZodString;
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
        catalog_binding: z.ZodObject<{
            base_release_id: z.ZodString;
            entity_revision_digest: z.ZodString;
        }, z.core.$strict>;
        declaration_revision_digest: z.ZodString;
        declaration: z.ZodDiscriminatedUnion<[z.ZodObject<{
            status: z.ZodLiteral<"none">;
        }, z.core.$strict>, z.ZodObject<{
            declaration_id: z.ZodString;
            provenance: z.ZodUnion<readonly [z.ZodObject<{
                repository: z.ZodLiteral<"sourcey/agent-ready-services">;
                commit: z.ZodString;
                path: z.ZodString;
                git_blob_oid: z.ZodString;
                blob_digest: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                source: z.ZodLiteral<"sourcey">;
                path: z.ZodString;
                blob_digest: z.ZodString;
            }, z.core.$strict>]>;
            status: z.ZodEnum<{
                community_declared: "community_declared";
                entity_attested: "entity_attested";
            }>;
        }, z.core.$strict>], "status">;
        surface_catalog: z.ZodObject<{
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
        }, z.core.$strict>;
        lifecycle: z.ZodEnum<{
            active: "active";
            ended: "ended";
            withdrawn: "withdrawn";
        }>;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        revision_digest: z.ZodString;
        policy_digest: z.ZodString;
        policy_version: z.ZodString;
        policy_as_of: z.ZodISODateTime;
        job: z.ZodObject<{
            job_id: z.ZodString;
            job_digest: z.ZodString;
            category: z.ZodString;
            name: z.ZodString;
            statement: z.ZodString;
        }, z.core.$strict>;
        interface_id: z.ZodNullable<z.ZodString>;
        label: z.ZodEnum<{
            probed: "probed";
            sourcey_run: "sourcey_run";
            vendor_run_verified: "vendor_run_verified";
        }>;
        operate: z.ZodObject<{
            letter: z.ZodNullable<z.ZodEnum<{
                A: "A";
                "A+": "A+";
                B: "B";
                "B+": "B+";
                C: "C";
                "C+": "C+";
                D: "D";
                F: "F";
            }>>;
            statement: z.ZodNullable<z.ZodString>;
            steps: z.ZodArray<z.ZodObject<{
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
            }, z.core.$strict>>;
            missing: z.ZodArray<z.ZodEnum<{
                confirm: "confirm";
                delegation: "delegation";
                discover: "discover";
                job: "job";
                pay: "pay";
                sustain: "sustain";
            }>>;
            approvals: z.ZodArray<z.ZodEnum<{
                confirm: "confirm";
                delegation: "delegation";
                discover: "discover";
                job: "job";
                pay: "pay";
                sustain: "sustain";
            }>>;
            workarounds: z.ZodArray<z.ZodObject<{
                step: z.ZodEnum<{
                    confirm: "confirm";
                    delegation: "delegation";
                    discover: "discover";
                    job: "job";
                    pay: "pay";
                    sustain: "sustain";
                }>;
                timing: z.ZodEnum<{
                    recurring: "recurring";
                    setup: "setup";
                }>;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        onboard: z.ZodObject<{
            level: z.ZodNullable<z.ZodNumber>;
        }, z.core.$strict>;
        discovery: z.ZodArray<z.ZodObject<{
            fact: z.ZodEnum<{
                agent_registration: "agent_registration";
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
        run: z.ZodObject<{
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
            error_probe: z.ZodNullable<z.ZodObject<{
                typed: z.ZodBoolean;
                reason: z.ZodString;
            }, z.core.$strict>>;
            assertions: z.ZodArray<z.ZodObject<{
                assertion: z.ZodString;
                holds: z.ZodBoolean;
                failure: z.ZodNullable<z.ZodObject<{
                    check: z.ZodNumber;
                    reason: z.ZodString;
                }, z.core.$strict>>;
                statement: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        last_run_at: z.ZodISODateTime;
        publication: z.ZodObject<{
            visibility: z.ZodEnum<{
                discoverable: "discoverable";
                private: "private";
                resolvable_only: "resolvable_only";
            }>;
            reasons: z.ZodArray<z.ZodEnum<{
                lifecycle_not_active: "lifecycle_not_active";
                open_dispute: "open_dispute";
            }>>;
        }, z.core.$strict>;
        provenance: z.ZodObject<{
            dispute: z.ZodEnum<{
                none: "none";
                open: "open";
                resolved: "resolved";
            }>;
            basis_event_ids: z.ZodArray<z.ZodString>;
            vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                status: z.ZodLiteral<"none">;
            }, z.core.$strict>, z.ZodObject<{
                status: z.ZodLiteral<"current">;
                event_id: z.ZodString;
                attested_at: z.ZodISODateTime;
            }, z.core.$strict>], "status">;
        }, z.core.$strict>;
        canonical_url: z.ZodURL;
        projection_digest: z.ZodString;
    }, z.core.$strict>>;
    prior_projection: z.ZodNullable<z.ZodObject<{
        projection_contract: z.ZodLiteral<"sourcey.agent-readiness-projection/v1alpha1">;
        agent_readiness_profile_id: z.ZodString;
        entity_id: z.ZodString;
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
        catalog_binding: z.ZodObject<{
            base_release_id: z.ZodString;
            entity_revision_digest: z.ZodString;
        }, z.core.$strict>;
        declaration_revision_digest: z.ZodString;
        declaration: z.ZodDiscriminatedUnion<[z.ZodObject<{
            status: z.ZodLiteral<"none">;
        }, z.core.$strict>, z.ZodObject<{
            declaration_id: z.ZodString;
            provenance: z.ZodUnion<readonly [z.ZodObject<{
                repository: z.ZodLiteral<"sourcey/agent-ready-services">;
                commit: z.ZodString;
                path: z.ZodString;
                git_blob_oid: z.ZodString;
                blob_digest: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                source: z.ZodLiteral<"sourcey">;
                path: z.ZodString;
                blob_digest: z.ZodString;
            }, z.core.$strict>]>;
            status: z.ZodEnum<{
                community_declared: "community_declared";
                entity_attested: "entity_attested";
            }>;
        }, z.core.$strict>], "status">;
        surface_catalog: z.ZodObject<{
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
        }, z.core.$strict>;
        lifecycle: z.ZodEnum<{
            active: "active";
            ended: "ended";
            withdrawn: "withdrawn";
        }>;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        revision_digest: z.ZodString;
        policy_digest: z.ZodString;
        policy_version: z.ZodString;
        policy_as_of: z.ZodISODateTime;
        job: z.ZodObject<{
            job_id: z.ZodString;
            job_digest: z.ZodString;
            category: z.ZodString;
            name: z.ZodString;
            statement: z.ZodString;
        }, z.core.$strict>;
        interface_id: z.ZodNullable<z.ZodString>;
        label: z.ZodEnum<{
            probed: "probed";
            sourcey_run: "sourcey_run";
            vendor_run_verified: "vendor_run_verified";
        }>;
        operate: z.ZodObject<{
            letter: z.ZodNullable<z.ZodEnum<{
                A: "A";
                "A+": "A+";
                B: "B";
                "B+": "B+";
                C: "C";
                "C+": "C+";
                D: "D";
                F: "F";
            }>>;
            statement: z.ZodNullable<z.ZodString>;
            steps: z.ZodArray<z.ZodObject<{
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
            }, z.core.$strict>>;
            missing: z.ZodArray<z.ZodEnum<{
                confirm: "confirm";
                delegation: "delegation";
                discover: "discover";
                job: "job";
                pay: "pay";
                sustain: "sustain";
            }>>;
            approvals: z.ZodArray<z.ZodEnum<{
                confirm: "confirm";
                delegation: "delegation";
                discover: "discover";
                job: "job";
                pay: "pay";
                sustain: "sustain";
            }>>;
            workarounds: z.ZodArray<z.ZodObject<{
                step: z.ZodEnum<{
                    confirm: "confirm";
                    delegation: "delegation";
                    discover: "discover";
                    job: "job";
                    pay: "pay";
                    sustain: "sustain";
                }>;
                timing: z.ZodEnum<{
                    recurring: "recurring";
                    setup: "setup";
                }>;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        onboard: z.ZodObject<{
            level: z.ZodNullable<z.ZodNumber>;
        }, z.core.$strict>;
        discovery: z.ZodArray<z.ZodObject<{
            fact: z.ZodEnum<{
                agent_registration: "agent_registration";
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
        run: z.ZodObject<{
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
            error_probe: z.ZodNullable<z.ZodObject<{
                typed: z.ZodBoolean;
                reason: z.ZodString;
            }, z.core.$strict>>;
            assertions: z.ZodArray<z.ZodObject<{
                assertion: z.ZodString;
                holds: z.ZodBoolean;
                failure: z.ZodNullable<z.ZodObject<{
                    check: z.ZodNumber;
                    reason: z.ZodString;
                }, z.core.$strict>>;
                statement: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        last_run_at: z.ZodISODateTime;
        publication: z.ZodObject<{
            visibility: z.ZodEnum<{
                discoverable: "discoverable";
                private: "private";
                resolvable_only: "resolvable_only";
            }>;
            reasons: z.ZodArray<z.ZodEnum<{
                lifecycle_not_active: "lifecycle_not_active";
                open_dispute: "open_dispute";
            }>>;
        }, z.core.$strict>;
        provenance: z.ZodObject<{
            dispute: z.ZodEnum<{
                none: "none";
                open: "open";
                resolved: "resolved";
            }>;
            basis_event_ids: z.ZodArray<z.ZodString>;
            vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                status: z.ZodLiteral<"none">;
            }, z.core.$strict>, z.ZodObject<{
                status: z.ZodLiteral<"current">;
                event_id: z.ZodString;
                attested_at: z.ZodISODateTime;
            }, z.core.$strict>], "status">;
        }, z.core.$strict>;
        canonical_url: z.ZodURL;
        projection_digest: z.ZodString;
    }, z.core.$strict>>;
    catalog_context: z.ZodNullable<z.ZodObject<{
        entity_slug: z.ZodString;
        entity_revision: z.ZodObject<{
            revision_contract: z.ZodLiteral<"sourcey.entity-revision/v1alpha1">;
            entity_id: z.ZodString;
            content: z.ZodObject<{
                name: z.ZodString;
                summary: z.ZodOptional<z.ZodString>;
                description: z.ZodString;
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
                links: z.ZodObject<{
                    site: z.ZodURL;
                    pricing: z.ZodOptional<z.ZodURL>;
                }, z.core.$strict>;
            }, z.core.$strict>;
            revision_digest: z.ZodString;
        }, z.core.$strict>;
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
    }, z.core.$strict>>;
}, z.core.$strict>;
export type AgentReadinessProfileInput = z.infer<typeof agentReadinessProfileInputSchema>;
export type AgentReadinessProfileReleaseInput = z.infer<typeof agentReadinessProfileReleaseInputSchema>;
export type AgentReadinessRevision = z.infer<typeof agentReadinessRevisionSchema>;
export type AgentReadinessProjection = z.infer<typeof agentReadinessProjectionSchema>;
export type AgentReadinessProfileSummary = z.infer<typeof agentReadinessProfileSummarySchema>;
export type AgentReadinessOfferRelationInput = z.infer<typeof agentReadinessOfferRelationInputSchema>;
export type AgentReadinessOfferRelationRevision = z.infer<typeof agentReadinessOfferRelationRevisionSchema>;
export type AgentReadinessOfferRelationIndex = z.infer<typeof agentReadinessOfferRelationIndexSchema>;
export type AgentReadinessOfferRelationInputs = z.infer<typeof agentReadinessOfferRelationInputsSchema>;
export type AgentReadinessIndex = z.infer<typeof agentReadinessIndexSchema>;
export type AgentReadinessDeltaObject = z.infer<typeof agentReadinessDeltaObjectSchema>;
export type AgentReadinessOfferRelationDeltaObject = z.infer<typeof agentReadinessOfferRelationDeltaObjectSchema>;
//# sourceMappingURL=index.d.ts.map