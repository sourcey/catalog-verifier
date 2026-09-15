import { z } from "zod";
export * from "./declaration.js";
export * from "./declaration-acquisition.js";
export * from "./declaration-reference.js";
export * from "./evidence.js";
export * from "./interaction.js";
export * from "./method-pack.js";
export * from "./shared.js";
/** Rendering residue in a captured segment: the surface did not render. */
export declare function agentReadinessRenderingResidue(value: string): string | null;
/**
 * Finds deterministic evidence of unresolved runtime or interpolation residue
 * in text that would otherwise become a public factual claim.
 */
export declare function agentReadinessPublicClaimResidue(value: string): string | null;
/** The one bound on public claim text: observation notes, the fact response schema and its prompt share it. */
export declare const AGENT_READINESS_PUBLIC_CLAIM_TEXT_MAXIMUM_CHARACTERS = 500;
export declare const agentReadinessPublicClaimTextSchema: z.ZodString;
export declare const agentReadinessSignalInputSchema: z.ZodObject<{
    stage: z.ZodEnum<{
        evaluate: "evaluate";
        sign_up: "sign_up";
        pay: "pay";
        provision: "provision";
        operate: "operate";
    }>;
    signal_code: z.ZodString;
    selector_group_id: z.ZodString;
    value: z.ZodEnum<{
        unknown: "unknown";
        yes: "yes";
        no: "no";
        partial: "partial";
        not_applicable: "not_applicable";
    }>;
    observed_at: z.ZodISODateTime;
    tested_surfaces: z.ZodArray<z.ZodObject<{
        node_kind: z.ZodEnum<{
            resource: "resource";
            endpoint: "endpoint";
            interface: "interface";
            surface_exclusion: "surface_exclusion";
        }>;
        node_id: z.ZodString;
    }, z.core.$strict>>;
    assessment_method: z.ZodObject<{
        name: z.ZodString;
        version: z.ZodString;
        method_digest: z.ZodString;
    }, z.core.$strict>;
    determination_bases: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        locators: z.ZodArray<z.ZodObject<{
            artifact_digest: z.ZodString;
            start_byte: z.ZodNumber;
            end_byte: z.ZodNumber;
            value_digest: z.ZodString;
        }, z.core.$strict>>;
        captures: z.ZodArray<z.ZodObject<{
            retained_capture_digest: z.ZodString;
            capture_rung: z.ZodEnum<{
                http: "http";
                headless: "headless";
                archive: "archive";
                manual: "manual";
            }>;
        }, z.core.$strict>>;
        artifact_digests: z.ZodArray<z.ZodString>;
        kind: z.ZodLiteral<"direct_observation">;
    }, z.core.$strict>, z.ZodObject<{
        coverage_scope: z.ZodEnum<{
            exact_resource: "exact_resource";
            tested_surfaces: "tested_surfaces";
            exact_funnel: "exact_funnel";
        }>;
        covered_surfaces: z.ZodArray<z.ZodObject<{
            node_kind: z.ZodEnum<{
                resource: "resource";
                endpoint: "endpoint";
                interface: "interface";
                surface_exclusion: "surface_exclusion";
            }>;
            node_id: z.ZodString;
        }, z.core.$strict>>;
        covered_branches: z.ZodNumber;
        captures: z.ZodArray<z.ZodObject<{
            retained_capture_digest: z.ZodString;
            capture_rung: z.ZodEnum<{
                http: "http";
                headless: "headless";
                archive: "archive";
                manual: "manual";
            }>;
        }, z.core.$strict>>;
        artifact_digests: z.ZodArray<z.ZodString>;
        kind: z.ZodLiteral<"bounded_absence">;
    }, z.core.$strict>, z.ZodObject<{
        source_surface: z.ZodObject<{
            node_kind: z.ZodEnum<{
                resource: "resource";
                endpoint: "endpoint";
                interface: "interface";
                surface_exclusion: "surface_exclusion";
            }>;
            node_id: z.ZodString;
        }, z.core.$strict>;
        locators: z.ZodArray<z.ZodObject<{
            artifact_digest: z.ZodString;
            start_byte: z.ZodNumber;
            end_byte: z.ZodNumber;
            value_digest: z.ZodString;
        }, z.core.$strict>>;
        captures: z.ZodArray<z.ZodObject<{
            retained_capture_digest: z.ZodString;
            capture_rung: z.ZodEnum<{
                http: "http";
                headless: "headless";
                archive: "archive";
                manual: "manual";
            }>;
        }, z.core.$strict>>;
        artifact_digests: z.ZodArray<z.ZodString>;
        kind: z.ZodLiteral<"explicit_first_party_declaration">;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"standard_requirement">;
        adapter_digest: z.ZodString;
        evidence_record_digest: z.ZodString;
        requirement: z.ZodObject<{
            namespace: z.ZodString;
            version: z.ZodString;
            requirement_id: z.ZodString;
            relation: z.ZodEnum<{
                tests: "tests";
                "informational-reference": "informational-reference";
            }>;
        }, z.core.$strict>;
        artifact_digests: z.ZodArray<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"certification_receipt">;
        certification_receipt_digest: z.ZodString;
    }, z.core.$strict>], "kind">>;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const agentReadinessEvidenceBindingSchema: z.ZodObject<{
    stage: z.ZodEnum<{
        evaluate: "evaluate";
        sign_up: "sign_up";
        pay: "pay";
        provision: "provision";
        operate: "operate";
    }>;
    signal_code: z.ZodString;
    evidence_event_ids: z.ZodArray<z.ZodString>;
    observation_ids: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export declare const agentReadinessProfileInputSchema: z.ZodObject<{
    evidence_bindings: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        signal_code: z.ZodString;
        evidence_event_ids: z.ZodArray<z.ZodString>;
        observation_ids: z.ZodArray<z.ZodString>;
    }, z.core.$strict>>;
    agent_readiness_profile_id: z.ZodString;
    entity_id: z.ZodString;
    scope: z.ZodObject<{
        product: z.ZodObject<{
            key: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>;
        funnel: z.ZodObject<{
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
        provenance: z.ZodObject<{
            repository: z.ZodLiteral<"sourcey/agent-ready-services">;
            commit: z.ZodString;
            path: z.ZodString;
            git_blob_oid: z.ZodString;
            blob_digest: z.ZodString;
        }, z.core.$strict>;
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
    signals: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        signal_code: z.ZodString;
        selector_group_id: z.ZodString;
        value: z.ZodEnum<{
            unknown: "unknown";
            yes: "yes";
            no: "no";
            partial: "partial";
            not_applicable: "not_applicable";
        }>;
        observed_at: z.ZodISODateTime;
        tested_surfaces: z.ZodArray<z.ZodObject<{
            node_kind: z.ZodEnum<{
                resource: "resource";
                endpoint: "endpoint";
                interface: "interface";
                surface_exclusion: "surface_exclusion";
            }>;
            node_id: z.ZodString;
        }, z.core.$strict>>;
        assessment_method: z.ZodObject<{
            name: z.ZodString;
            version: z.ZodString;
            method_digest: z.ZodString;
        }, z.core.$strict>;
        determination_bases: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            locators: z.ZodArray<z.ZodObject<{
                artifact_digest: z.ZodString;
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
            }, z.core.$strict>>;
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    http: "http";
                    headless: "headless";
                    archive: "archive";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"direct_observation">;
        }, z.core.$strict>, z.ZodObject<{
            coverage_scope: z.ZodEnum<{
                exact_resource: "exact_resource";
                tested_surfaces: "tested_surfaces";
                exact_funnel: "exact_funnel";
            }>;
            covered_surfaces: z.ZodArray<z.ZodObject<{
                node_kind: z.ZodEnum<{
                    resource: "resource";
                    endpoint: "endpoint";
                    interface: "interface";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>>;
            covered_branches: z.ZodNumber;
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    http: "http";
                    headless: "headless";
                    archive: "archive";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"bounded_absence">;
        }, z.core.$strict>, z.ZodObject<{
            source_surface: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    resource: "resource";
                    endpoint: "endpoint";
                    interface: "interface";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>;
            locators: z.ZodArray<z.ZodObject<{
                artifact_digest: z.ZodString;
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
            }, z.core.$strict>>;
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    http: "http";
                    headless: "headless";
                    archive: "archive";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"explicit_first_party_declaration">;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"standard_requirement">;
            adapter_digest: z.ZodString;
            evidence_record_digest: z.ZodString;
            requirement: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
                requirement_id: z.ZodString;
                relation: z.ZodEnum<{
                    tests: "tests";
                    "informational-reference": "informational-reference";
                }>;
            }, z.core.$strict>;
            artifact_digests: z.ZodArray<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"certification_receipt">;
            certification_receipt_digest: z.ZodString;
        }, z.core.$strict>], "kind">>;
        note: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    input_contract: z.ZodLiteral<"sourcey.agent-readiness-input/v1alpha1">;
}, z.core.$strict>;
export declare const agentReadinessOfferRelationInputSchema: z.ZodObject<{
    relation_input_contract: z.ZodLiteral<"sourcey.agent-readiness-offer-relation-input/v1alpha1">;
    agent_readiness_profile_id: z.ZodString;
    offer_id: z.ZodString;
    purpose: z.ZodEnum<{
        application_path: "application_path";
        redemption_path: "redemption_path";
        operating_path: "operating_path";
    }>;
    applicable_stages: z.ZodArray<z.ZodEnum<{
        evaluate: "evaluate";
        sign_up: "sign_up";
        pay: "pay";
        provision: "provision";
        operate: "operate";
    }>>;
    effective_from: z.ZodISODateTime;
    effective_until: z.ZodOptional<z.ZodISODateTime>;
    declaration_revision_digest: z.ZodString;
    offer_relation_proposal_id: z.ZodString;
    admitted_offer_revision_digest: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessProfileReleaseInputSchema: z.ZodObject<{
    release_input_contract: z.ZodLiteral<"sourcey.agent-readiness-release-input/v1alpha1">;
    profile_input: z.ZodObject<{
        evidence_bindings: z.ZodArray<z.ZodObject<{
            stage: z.ZodEnum<{
                evaluate: "evaluate";
                sign_up: "sign_up";
                pay: "pay";
                provision: "provision";
                operate: "operate";
            }>;
            signal_code: z.ZodString;
            evidence_event_ids: z.ZodArray<z.ZodString>;
            observation_ids: z.ZodArray<z.ZodString>;
        }, z.core.$strict>>;
        agent_readiness_profile_id: z.ZodString;
        entity_id: z.ZodString;
        scope: z.ZodObject<{
            product: z.ZodObject<{
                key: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
            funnel: z.ZodObject<{
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
            provenance: z.ZodObject<{
                repository: z.ZodLiteral<"sourcey/agent-ready-services">;
                commit: z.ZodString;
                path: z.ZodString;
                git_blob_oid: z.ZodString;
                blob_digest: z.ZodString;
            }, z.core.$strict>;
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
        signals: z.ZodArray<z.ZodObject<{
            stage: z.ZodEnum<{
                evaluate: "evaluate";
                sign_up: "sign_up";
                pay: "pay";
                provision: "provision";
                operate: "operate";
            }>;
            signal_code: z.ZodString;
            selector_group_id: z.ZodString;
            value: z.ZodEnum<{
                unknown: "unknown";
                yes: "yes";
                no: "no";
                partial: "partial";
                not_applicable: "not_applicable";
            }>;
            observed_at: z.ZodISODateTime;
            tested_surfaces: z.ZodArray<z.ZodObject<{
                node_kind: z.ZodEnum<{
                    resource: "resource";
                    endpoint: "endpoint";
                    interface: "interface";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>>;
            assessment_method: z.ZodObject<{
                name: z.ZodString;
                version: z.ZodString;
                method_digest: z.ZodString;
            }, z.core.$strict>;
            determination_bases: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                locators: z.ZodArray<z.ZodObject<{
                    artifact_digest: z.ZodString;
                    start_byte: z.ZodNumber;
                    end_byte: z.ZodNumber;
                    value_digest: z.ZodString;
                }, z.core.$strict>>;
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        http: "http";
                        headless: "headless";
                        archive: "archive";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"direct_observation">;
            }, z.core.$strict>, z.ZodObject<{
                coverage_scope: z.ZodEnum<{
                    exact_resource: "exact_resource";
                    tested_surfaces: "tested_surfaces";
                    exact_funnel: "exact_funnel";
                }>;
                covered_surfaces: z.ZodArray<z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        resource: "resource";
                        endpoint: "endpoint";
                        interface: "interface";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>>;
                covered_branches: z.ZodNumber;
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        http: "http";
                        headless: "headless";
                        archive: "archive";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"bounded_absence">;
            }, z.core.$strict>, z.ZodObject<{
                source_surface: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        resource: "resource";
                        endpoint: "endpoint";
                        interface: "interface";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>;
                locators: z.ZodArray<z.ZodObject<{
                    artifact_digest: z.ZodString;
                    start_byte: z.ZodNumber;
                    end_byte: z.ZodNumber;
                    value_digest: z.ZodString;
                }, z.core.$strict>>;
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        http: "http";
                        headless: "headless";
                        archive: "archive";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"explicit_first_party_declaration">;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"standard_requirement">;
                adapter_digest: z.ZodString;
                evidence_record_digest: z.ZodString;
                requirement: z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                    requirement_id: z.ZodString;
                    relation: z.ZodEnum<{
                        tests: "tests";
                        "informational-reference": "informational-reference";
                    }>;
                }, z.core.$strict>;
                artifact_digests: z.ZodArray<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"certification_receipt">;
                certification_receipt_digest: z.ZodString;
            }, z.core.$strict>], "kind">>;
            note: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
        input_contract: z.ZodLiteral<"sourcey.agent-readiness-input/v1alpha1">;
    }, z.core.$strict>;
    declaration_revision: z.ZodObject<{
        revision_contract: z.ZodLiteral<"sourcey.agent-readiness-declaration-revision/v1alpha1">;
        entity_id: z.ZodString;
        declaration: z.ZodObject<{
            scope: z.ZodObject<{
                product: z.ZodObject<{
                    key: z.ZodString;
                    name: z.ZodString;
                }, z.core.$strict>;
                funnel: z.ZodObject<{
                    key: z.ZodString;
                    name: z.ZodString;
                }, z.core.$strict>;
            }, z.core.$strict>;
            resources: z.ZodArray<z.ZodObject<{
                resource_id: z.ZodString;
                uri: z.ZodURL;
                roles: z.ZodArray<z.ZodEnum<{
                    policy: "policy";
                    discovery: "discovery";
                    status: "status";
                    pricing: "pricing";
                    eligibility: "eligibility";
                    access: "access";
                    terms: "terms";
                    checkout: "checkout";
                    provisioning: "provisioning";
                    operations: "operations";
                    recovery: "recovery";
                    authentication: "authentication";
                    descriptor: "descriptor";
                    documentation: "documentation";
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
            relations: z.ZodArray<z.ZodObject<{
                relation_id: z.ZodString;
                kind: z.ZodEnum<{
                    describes: "describes";
                    authenticates: "authenticates";
                    requires: "requires";
                    alternative_to: "alternative_to";
                    precedes: "precedes";
                }>;
                from: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        resource: "resource";
                        endpoint: "endpoint";
                        interface: "interface";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>;
                to: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        resource: "resource";
                        endpoint: "endpoint";
                        interface: "interface";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>;
            }, z.core.$strict>>;
            declaration_id: z.ZodString;
            declared_at: z.ZodISODateTime;
            assessment_targets: z.ZodArray<z.ZodObject<{
                target_id: z.ZodString;
                name: z.ZodString;
                interface_ids: z.ZodArray<z.ZodString>;
            }, z.core.$strict>>;
            participants: z.ZodArray<z.ZodObject<{
                participant_id: z.ZodString;
                roles: z.ZodArray<z.ZodEnum<{
                    subject: "subject";
                    access_operator: "access_operator";
                    identity_provider: "identity_provider";
                    payment_provider: "payment_provider";
                    provisioning_provider: "provisioning_provider";
                    operations_provider: "operations_provider";
                }>>;
                identity: z.ZodUnion<readonly [z.ZodObject<{
                    entity_id: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    origin_source_id: z.ZodString;
                }, z.core.$strict>]>;
            }, z.core.$strict>>;
            endpoints: z.ZodArray<z.ZodObject<{
                endpoint_id: z.ZodString;
                uri: z.ZodURL;
                transport: z.ZodEnum<{
                    http: "http";
                    websocket: "websocket";
                    grpc: "grpc";
                }>;
                roles: z.ZodArray<z.ZodEnum<{
                    status: "status";
                    service: "service";
                    checkout: "checkout";
                    recovery: "recovery";
                    authorization: "authorization";
                    token: "token";
                    registration: "registration";
                    protected_resource: "protected_resource";
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
                    web_application: "web_application";
                    network_api: "network_api";
                    command_line: "command_line";
                    software_library: "software_library";
                    tool_server: "tool_server";
                    agent_service: "agent_service";
                }>;
                functions: z.ZodArray<z.ZodEnum<{
                    events: "events";
                    recovery: "recovery";
                    authentication: "authentication";
                    service_operation: "service_operation";
                    commerce: "commerce";
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
            surface_exclusions: z.ZodArray<z.ZodObject<{
                exclusion_id: z.ZodString;
                role: z.ZodEnum<{
                    policy: "policy";
                    discovery: "discovery";
                    status: "status";
                    pricing: "pricing";
                    eligibility: "eligibility";
                    access: "access";
                    terms: "terms";
                    checkout: "checkout";
                    provisioning: "provisioning";
                    operations: "operations";
                    recovery: "recovery";
                    authentication: "authentication";
                    descriptor: "descriptor";
                    documentation: "documentation";
                }>;
                rationale: z.ZodString;
            }, z.core.$strict>>;
            authority_intent: z.ZodEnum<{
                entity: "entity";
                community: "community";
            }>;
            source_bindings: z.ZodArray<z.ZodObject<{
                target: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        relation: "relation";
                        resource: "resource";
                        endpoint: "endpoint";
                        interface: "interface";
                        surface_exclusion: "surface_exclusion";
                        declaration: "declaration";
                        participant: "participant";
                        assessment_target: "assessment_target";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>;
                source_binding_id: z.ZodString;
                source_id: z.ZodString;
                field_paths: z.ZodArray<z.ZodString>;
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
            redemption_path: "redemption_path";
            operating_path: "operating_path";
        }>;
        applicable_stages: z.ZodArray<z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>>;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        declaration_revision_digest: z.ZodString;
        offer_relation_proposal_id: z.ZodString;
        admitted_offer_revision_digest: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessFactualInputSchema: z.ZodObject<{
    agent_readiness_profile_id: z.ZodString;
    entity_id: z.ZodString;
    scope: z.ZodObject<{
        product: z.ZodObject<{
            key: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>;
        funnel: z.ZodObject<{
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
        provenance: z.ZodObject<{
            repository: z.ZodLiteral<"sourcey/agent-ready-services">;
            commit: z.ZodString;
            path: z.ZodString;
            git_blob_oid: z.ZodString;
            blob_digest: z.ZodString;
        }, z.core.$strict>;
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
    signals: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        signal_code: z.ZodString;
        selector_group_id: z.ZodString;
        value: z.ZodEnum<{
            unknown: "unknown";
            yes: "yes";
            no: "no";
            partial: "partial";
            not_applicable: "not_applicable";
        }>;
        observed_at: z.ZodISODateTime;
        tested_surfaces: z.ZodArray<z.ZodObject<{
            node_kind: z.ZodEnum<{
                resource: "resource";
                endpoint: "endpoint";
                interface: "interface";
                surface_exclusion: "surface_exclusion";
            }>;
            node_id: z.ZodString;
        }, z.core.$strict>>;
        assessment_method: z.ZodObject<{
            name: z.ZodString;
            version: z.ZodString;
            method_digest: z.ZodString;
        }, z.core.$strict>;
        determination_bases: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            locators: z.ZodArray<z.ZodObject<{
                artifact_digest: z.ZodString;
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
            }, z.core.$strict>>;
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    http: "http";
                    headless: "headless";
                    archive: "archive";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"direct_observation">;
        }, z.core.$strict>, z.ZodObject<{
            coverage_scope: z.ZodEnum<{
                exact_resource: "exact_resource";
                tested_surfaces: "tested_surfaces";
                exact_funnel: "exact_funnel";
            }>;
            covered_surfaces: z.ZodArray<z.ZodObject<{
                node_kind: z.ZodEnum<{
                    resource: "resource";
                    endpoint: "endpoint";
                    interface: "interface";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>>;
            covered_branches: z.ZodNumber;
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    http: "http";
                    headless: "headless";
                    archive: "archive";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"bounded_absence">;
        }, z.core.$strict>, z.ZodObject<{
            source_surface: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    resource: "resource";
                    endpoint: "endpoint";
                    interface: "interface";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>;
            locators: z.ZodArray<z.ZodObject<{
                artifact_digest: z.ZodString;
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
            }, z.core.$strict>>;
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    http: "http";
                    headless: "headless";
                    archive: "archive";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"explicit_first_party_declaration">;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"standard_requirement">;
            adapter_digest: z.ZodString;
            evidence_record_digest: z.ZodString;
            requirement: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
                requirement_id: z.ZodString;
                relation: z.ZodEnum<{
                    tests: "tests";
                    "informational-reference": "informational-reference";
                }>;
            }, z.core.$strict>;
            artifact_digests: z.ZodArray<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"certification_receipt">;
            certification_receipt_digest: z.ZodString;
        }, z.core.$strict>], "kind">>;
        note: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    factual_input_contract: z.ZodLiteral<"sourcey.agent-readiness-factual-input/v1alpha1">;
}, z.core.$strict>;
export declare const agentReadinessRevisionCoreSchema: z.ZodObject<{
    agent_readiness_profile_id: z.ZodString;
    entity_id: z.ZodString;
    scope: z.ZodObject<{
        product: z.ZodObject<{
            key: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>;
        funnel: z.ZodObject<{
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
        provenance: z.ZodObject<{
            repository: z.ZodLiteral<"sourcey/agent-ready-services">;
            commit: z.ZodString;
            path: z.ZodString;
            git_blob_oid: z.ZodString;
            blob_digest: z.ZodString;
        }, z.core.$strict>;
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
    signals: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        signal_code: z.ZodString;
        selector_group_id: z.ZodString;
        value: z.ZodEnum<{
            unknown: "unknown";
            yes: "yes";
            no: "no";
            partial: "partial";
            not_applicable: "not_applicable";
        }>;
        observed_at: z.ZodISODateTime;
        tested_surfaces: z.ZodArray<z.ZodObject<{
            node_kind: z.ZodEnum<{
                resource: "resource";
                endpoint: "endpoint";
                interface: "interface";
                surface_exclusion: "surface_exclusion";
            }>;
            node_id: z.ZodString;
        }, z.core.$strict>>;
        assessment_method: z.ZodObject<{
            name: z.ZodString;
            version: z.ZodString;
            method_digest: z.ZodString;
        }, z.core.$strict>;
        determination_bases: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            locators: z.ZodArray<z.ZodObject<{
                artifact_digest: z.ZodString;
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
            }, z.core.$strict>>;
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    http: "http";
                    headless: "headless";
                    archive: "archive";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"direct_observation">;
        }, z.core.$strict>, z.ZodObject<{
            coverage_scope: z.ZodEnum<{
                exact_resource: "exact_resource";
                tested_surfaces: "tested_surfaces";
                exact_funnel: "exact_funnel";
            }>;
            covered_surfaces: z.ZodArray<z.ZodObject<{
                node_kind: z.ZodEnum<{
                    resource: "resource";
                    endpoint: "endpoint";
                    interface: "interface";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>>;
            covered_branches: z.ZodNumber;
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    http: "http";
                    headless: "headless";
                    archive: "archive";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"bounded_absence">;
        }, z.core.$strict>, z.ZodObject<{
            source_surface: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    resource: "resource";
                    endpoint: "endpoint";
                    interface: "interface";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>;
            locators: z.ZodArray<z.ZodObject<{
                artifact_digest: z.ZodString;
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
            }, z.core.$strict>>;
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    http: "http";
                    headless: "headless";
                    archive: "archive";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"explicit_first_party_declaration">;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"standard_requirement">;
            adapter_digest: z.ZodString;
            evidence_record_digest: z.ZodString;
            requirement: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
                requirement_id: z.ZodString;
                relation: z.ZodEnum<{
                    tests: "tests";
                    "informational-reference": "informational-reference";
                }>;
            }, z.core.$strict>;
            artifact_digests: z.ZodArray<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"certification_receipt">;
            certification_receipt_digest: z.ZodString;
        }, z.core.$strict>], "kind">>;
        note: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
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
        funnel: z.ZodObject<{
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
        provenance: z.ZodObject<{
            repository: z.ZodLiteral<"sourcey/agent-ready-services">;
            commit: z.ZodString;
            path: z.ZodString;
            git_blob_oid: z.ZodString;
            blob_digest: z.ZodString;
        }, z.core.$strict>;
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
    signals: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        signal_code: z.ZodString;
        selector_group_id: z.ZodString;
        value: z.ZodEnum<{
            unknown: "unknown";
            yes: "yes";
            no: "no";
            partial: "partial";
            not_applicable: "not_applicable";
        }>;
        observed_at: z.ZodISODateTime;
        tested_surfaces: z.ZodArray<z.ZodObject<{
            node_kind: z.ZodEnum<{
                resource: "resource";
                endpoint: "endpoint";
                interface: "interface";
                surface_exclusion: "surface_exclusion";
            }>;
            node_id: z.ZodString;
        }, z.core.$strict>>;
        assessment_method: z.ZodObject<{
            name: z.ZodString;
            version: z.ZodString;
            method_digest: z.ZodString;
        }, z.core.$strict>;
        determination_bases: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            locators: z.ZodArray<z.ZodObject<{
                artifact_digest: z.ZodString;
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
            }, z.core.$strict>>;
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    http: "http";
                    headless: "headless";
                    archive: "archive";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"direct_observation">;
        }, z.core.$strict>, z.ZodObject<{
            coverage_scope: z.ZodEnum<{
                exact_resource: "exact_resource";
                tested_surfaces: "tested_surfaces";
                exact_funnel: "exact_funnel";
            }>;
            covered_surfaces: z.ZodArray<z.ZodObject<{
                node_kind: z.ZodEnum<{
                    resource: "resource";
                    endpoint: "endpoint";
                    interface: "interface";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>>;
            covered_branches: z.ZodNumber;
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    http: "http";
                    headless: "headless";
                    archive: "archive";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"bounded_absence">;
        }, z.core.$strict>, z.ZodObject<{
            source_surface: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    resource: "resource";
                    endpoint: "endpoint";
                    interface: "interface";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>;
            locators: z.ZodArray<z.ZodObject<{
                artifact_digest: z.ZodString;
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
            }, z.core.$strict>>;
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    http: "http";
                    headless: "headless";
                    archive: "archive";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"explicit_first_party_declaration">;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"standard_requirement">;
            adapter_digest: z.ZodString;
            evidence_record_digest: z.ZodString;
            requirement: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
                requirement_id: z.ZodString;
                relation: z.ZodEnum<{
                    tests: "tests";
                    "informational-reference": "informational-reference";
                }>;
            }, z.core.$strict>;
            artifact_digests: z.ZodArray<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"certification_receipt">;
            certification_receipt_digest: z.ZodString;
        }, z.core.$strict>], "kind">>;
        note: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    revision_contract: z.ZodLiteral<"sourcey.agent-readiness-revision/v1alpha1">;
    revision_digest: z.ZodString;
}, z.core.$strict>;
/**
 * Stable head identity for closure and ownership checks. Historical Agent
 * Readiness revision bodies remain opaque and are never reparsed through the
 * current factual contract.
 */
export declare const agentReadinessRevisionHeadSchema: z.ZodObject<{
    revision_contract: z.ZodLiteral<"sourcey.agent-readiness-revision/v1alpha1">;
    agent_readiness_profile_id: z.ZodString;
    entity_id: z.ZodString;
    revision_digest: z.ZodString;
}, z.core.$strip>;
export type AgentReadinessRevisionHead = z.infer<typeof agentReadinessRevisionHeadSchema>;
export declare const agentReadinessSurfaceSelectorGroupSchema: z.ZodObject<{
    selector_group_id: z.ZodString;
    coverage: z.ZodEnum<{
        at_least_one: "at_least_one";
        all_matches: "all_matches";
    }>;
    alternatives: z.ZodArray<z.ZodObject<{
        alternative_id: z.ZodString;
        selectors: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"resource_role">;
            roles: z.ZodArray<z.ZodEnum<{
                policy: "policy";
                discovery: "discovery";
                status: "status";
                pricing: "pricing";
                eligibility: "eligibility";
                access: "access";
                terms: "terms";
                checkout: "checkout";
                provisioning: "provisioning";
                operations: "operations";
                recovery: "recovery";
                authentication: "authentication";
                descriptor: "descriptor";
                documentation: "documentation";
            }>>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"endpoint_role">;
            roles: z.ZodArray<z.ZodEnum<{
                status: "status";
                service: "service";
                checkout: "checkout";
                recovery: "recovery";
                authorization: "authorization";
                token: "token";
                registration: "registration";
                protected_resource: "protected_resource";
                webhook: "webhook";
            }>>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"interface_signature">;
            modalities: z.ZodArray<z.ZodEnum<{
                web_application: "web_application";
                network_api: "network_api";
                command_line: "command_line";
                software_library: "software_library";
                tool_server: "tool_server";
                agent_service: "agent_service";
            }>>;
            functions: z.ZodArray<z.ZodEnum<{
                events: "events";
                recovery: "recovery";
                authentication: "authentication";
                service_operation: "service_operation";
                commerce: "commerce";
            }>>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"assessment_target_membership">;
            membership: z.ZodEnum<{
                direct: "direct";
                reachable: "reachable";
            }>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"target_relation">;
            relation_kind: z.ZodEnum<{
                describes: "describes";
                authenticates: "authenticates";
                requires: "requires";
                alternative_to: "alternative_to";
                precedes: "precedes";
            }>;
            direction: z.ZodEnum<{
                from_target: "from_target";
                to_target: "to_target";
            }>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"standard_requirement">;
            requirement: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
                requirement_id: z.ZodString;
                relation: z.ZodEnum<{
                    tests: "tests";
                    "informational-reference": "informational-reference";
                }>;
            }, z.core.$strict>;
        }, z.core.$strict>], "kind">>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessStandardEvidenceMappingSchema: z.ZodObject<{
    requirement: z.ZodObject<{
        namespace: z.ZodString;
        version: z.ZodString;
        requirement_id: z.ZodString;
        relation: z.ZodEnum<{
            tests: "tests";
            "informational-reference": "informational-reference";
        }>;
    }, z.core.$strict>;
    support: z.ZodArray<z.ZodObject<{
        result: z.ZodEnum<{
            satisfied: "satisfied";
            not_satisfied: "not_satisfied";
        }>;
        values: z.ZodArray<z.ZodEnum<{
            yes: "yes";
            no: "no";
            partial: "partial";
            not_applicable: "not_applicable";
        }>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessPolicySignalRuleSchema: z.ZodObject<{
    stage: z.ZodEnum<{
        evaluate: "evaluate";
        sign_up: "sign_up";
        pay: "pay";
        provision: "provision";
        operate: "operate";
    }>;
    signal_code: z.ZodString;
    evaluation_role: z.ZodEnum<{
        graded: "graded";
        barrier: "barrier";
        informational: "informational";
    }>;
    required: z.ZodBoolean;
    pass_values: z.ZodArray<z.ZodEnum<{
        unknown: "unknown";
        yes: "yes";
        no: "no";
        partial: "partial";
        not_applicable: "not_applicable";
    }>>;
    constrained_values: z.ZodArray<z.ZodEnum<{
        unknown: "unknown";
        yes: "yes";
        no: "no";
        partial: "partial";
        not_applicable: "not_applicable";
    }>>;
    fail_values: z.ZodArray<z.ZodEnum<{
        unknown: "unknown";
        yes: "yes";
        no: "no";
        partial: "partial";
        not_applicable: "not_applicable";
    }>>;
    allow_not_applicable: z.ZodBoolean;
    allowed_method_digests: z.ZodArray<z.ZodString>;
    selector_groups: z.ZodArray<z.ZodObject<{
        selector_group_id: z.ZodString;
        coverage: z.ZodEnum<{
            at_least_one: "at_least_one";
            all_matches: "all_matches";
        }>;
        alternatives: z.ZodArray<z.ZodObject<{
            alternative_id: z.ZodString;
            selectors: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"resource_role">;
                roles: z.ZodArray<z.ZodEnum<{
                    policy: "policy";
                    discovery: "discovery";
                    status: "status";
                    pricing: "pricing";
                    eligibility: "eligibility";
                    access: "access";
                    terms: "terms";
                    checkout: "checkout";
                    provisioning: "provisioning";
                    operations: "operations";
                    recovery: "recovery";
                    authentication: "authentication";
                    descriptor: "descriptor";
                    documentation: "documentation";
                }>>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"endpoint_role">;
                roles: z.ZodArray<z.ZodEnum<{
                    status: "status";
                    service: "service";
                    checkout: "checkout";
                    recovery: "recovery";
                    authorization: "authorization";
                    token: "token";
                    registration: "registration";
                    protected_resource: "protected_resource";
                    webhook: "webhook";
                }>>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"interface_signature">;
                modalities: z.ZodArray<z.ZodEnum<{
                    web_application: "web_application";
                    network_api: "network_api";
                    command_line: "command_line";
                    software_library: "software_library";
                    tool_server: "tool_server";
                    agent_service: "agent_service";
                }>>;
                functions: z.ZodArray<z.ZodEnum<{
                    events: "events";
                    recovery: "recovery";
                    authentication: "authentication";
                    service_operation: "service_operation";
                    commerce: "commerce";
                }>>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"assessment_target_membership">;
                membership: z.ZodEnum<{
                    direct: "direct";
                    reachable: "reachable";
                }>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"target_relation">;
                relation_kind: z.ZodEnum<{
                    describes: "describes";
                    authenticates: "authenticates";
                    requires: "requires";
                    alternative_to: "alternative_to";
                    precedes: "precedes";
                }>;
                direction: z.ZodEnum<{
                    from_target: "from_target";
                    to_target: "to_target";
                }>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"standard_requirement">;
                requirement: z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                    requirement_id: z.ZodString;
                    relation: z.ZodEnum<{
                        tests: "tests";
                        "informational-reference": "informational-reference";
                    }>;
                }, z.core.$strict>;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    evidence_terms: z.ZodOptional<z.ZodArray<z.ZodString>>;
    value_evidence: z.ZodArray<z.ZodObject<{
        value: z.ZodEnum<{
            yes: "yes";
            no: "no";
            partial: "partial";
            not_applicable: "not_applicable";
        }>;
        alternatives: z.ZodArray<z.ZodObject<{
            alternative_id: z.ZodString;
            required_basis_kinds: z.ZodArray<z.ZodEnum<{
                direct_observation: "direct_observation";
                bounded_absence: "bounded_absence";
                explicit_first_party_declaration: "explicit_first_party_declaration";
                standard_requirement: "standard_requirement";
                certification_receipt: "certification_receipt";
            }>>;
            minimum_distinct_captures: z.ZodNumber;
            require_independent_capture_rungs: z.ZodBoolean;
            required_artifacts: z.ZodArray<z.ZodEnum<{
                redirect_chain: "redirect_chain";
                interaction_trace: "interaction_trace";
                raw_bytes: "raw_bytes";
                normalized_text: "normalized_text";
                structured_validation: "structured_validation";
                standard_evidence_result: "standard_evidence_result";
                utf8_locators: "utf8_locators";
                screenshot: "screenshot";
                capture_interaction_trace: "capture_interaction_trace";
                manual_review_note: "manual_review_note";
            }>>;
            minimum_surfaces: z.ZodNumber;
            minimum_branches: z.ZodNumber;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    priority: z.ZodNumber;
    blocker: z.ZodOptional<z.ZodObject<{
        code: z.ZodString;
        explanation: z.ZodString;
    }, z.core.$strict>>;
    remediation: z.ZodOptional<z.ZodObject<{
        code: z.ZodString;
        instruction: z.ZodString;
    }, z.core.$strict>>;
    public_findings: z.ZodObject<{
        yes: z.ZodObject<{
            condition: z.ZodString;
            finding: z.ZodString;
        }, z.core.$strict>;
        no: z.ZodObject<{
            condition: z.ZodString;
            finding: z.ZodString;
        }, z.core.$strict>;
        partial: z.ZodObject<{
            condition: z.ZodString;
            finding: z.ZodString;
        }, z.core.$strict>;
        unknown: z.ZodObject<{
            condition: z.ZodString;
            finding: z.ZodString;
        }, z.core.$strict>;
        not_applicable: z.ZodObject<{
            condition: z.ZodString;
            finding: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>;
    external_references: z.ZodArray<z.ZodObject<{
        namespace: z.ZodString;
        version: z.ZodString;
        requirement_id: z.ZodString;
        relation: z.ZodEnum<{
            tests: "tests";
            "informational-reference": "informational-reference";
        }>;
    }, z.core.$strict>>;
    standard_evidence: z.ZodArray<z.ZodObject<{
        requirement: z.ZodObject<{
            namespace: z.ZodString;
            version: z.ZodString;
            requirement_id: z.ZodString;
            relation: z.ZodEnum<{
                tests: "tests";
                "informational-reference": "informational-reference";
            }>;
        }, z.core.$strict>;
        support: z.ZodArray<z.ZodObject<{
            result: z.ZodEnum<{
                satisfied: "satisfied";
                not_satisfied: "not_satisfied";
            }>;
            values: z.ZodArray<z.ZodEnum<{
                yes: "yes";
                no: "no";
                partial: "partial";
                not_applicable: "not_applicable";
            }>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessAssessmentBasisSchema: z.ZodObject<{
    principal: z.ZodLiteral<"authorized_human_or_organization">;
    initial_state: z.ZodObject<{
        product_specific_account: z.ZodLiteral<false>;
        product_credentials: z.ZodLiteral<false>;
        paid_subscription: z.ZodLiteral<false>;
        provisioned_resource: z.ZodLiteral<false>;
        external_identity: z.ZodLiteral<"only_when_declared_by_exact_funnel">;
    }, z.core.$strict>;
    permitted_human_boundaries: z.ZodArray<z.ZodEnum<{
        account_ownership_confirmation: "account_ownership_confirmation";
        delegated_identity_consent: "delegated_identity_consent";
        regulated_approval: "regulated_approval";
        final_payment_or_irreversible_commitment: "final_payment_or_irreversible_commitment";
    }>>;
    required_handoff_properties: z.ZodArray<z.ZodEnum<{
        exact_disclosure: "exact_disclosure";
        resumable_handoff: "resumable_handoff";
        deterministic_continuation: "deterministic_continuation";
    }>>;
    forbidden_substitutions: z.ZodArray<z.ZodEnum<{
        captcha_solving: "captcha_solving";
        human_password_or_session_sharing: "human_password_or_session_sharing";
        concealed_agent_identity: "concealed_agent_identity";
        invented_eligibility: "invented_eligibility";
        unbound_out_of_band_code: "unbound_out_of_band_code";
        vendor_policy_bypass: "vendor_policy_bypass";
        unapproved_consequential_action: "unapproved_consequential_action";
    }>>;
    success: z.ZodObject<{
        target_coverage: z.ZodLiteral<"every_declared_target">;
        interface_coverage: z.ZodLiteral<"at_least_one_declared_alternative">;
        authority: z.ZodLiteral<"scoped">;
        failure_semantics: z.ZodLiteral<"documented">;
        recovery: z.ZodLiteral<"supported">;
    }, z.core.$strict>;
    observed_assessment: z.ZodObject<{
        allowed_sources: z.ZodArray<z.ZodEnum<{
            public_documentation: "public_documentation";
            public_metadata: "public_metadata";
            public_endpoints: "public_endpoints";
            non_mutating_interaction: "non_mutating_interaction";
            operator_attested_public_observation: "operator_attested_public_observation";
        }>>;
        consequential_claims: z.ZodLiteral<"certification_required">;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const agentReadinessPolicyCoreSchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.agent-readiness-policy/v1alpha1">;
    policy_version: z.ZodString;
    assessment_basis: z.ZodObject<{
        principal: z.ZodLiteral<"authorized_human_or_organization">;
        initial_state: z.ZodObject<{
            product_specific_account: z.ZodLiteral<false>;
            product_credentials: z.ZodLiteral<false>;
            paid_subscription: z.ZodLiteral<false>;
            provisioned_resource: z.ZodLiteral<false>;
            external_identity: z.ZodLiteral<"only_when_declared_by_exact_funnel">;
        }, z.core.$strict>;
        permitted_human_boundaries: z.ZodArray<z.ZodEnum<{
            account_ownership_confirmation: "account_ownership_confirmation";
            delegated_identity_consent: "delegated_identity_consent";
            regulated_approval: "regulated_approval";
            final_payment_or_irreversible_commitment: "final_payment_or_irreversible_commitment";
        }>>;
        required_handoff_properties: z.ZodArray<z.ZodEnum<{
            exact_disclosure: "exact_disclosure";
            resumable_handoff: "resumable_handoff";
            deterministic_continuation: "deterministic_continuation";
        }>>;
        forbidden_substitutions: z.ZodArray<z.ZodEnum<{
            captcha_solving: "captcha_solving";
            human_password_or_session_sharing: "human_password_or_session_sharing";
            concealed_agent_identity: "concealed_agent_identity";
            invented_eligibility: "invented_eligibility";
            unbound_out_of_band_code: "unbound_out_of_band_code";
            vendor_policy_bypass: "vendor_policy_bypass";
            unapproved_consequential_action: "unapproved_consequential_action";
        }>>;
        success: z.ZodObject<{
            target_coverage: z.ZodLiteral<"every_declared_target">;
            interface_coverage: z.ZodLiteral<"at_least_one_declared_alternative">;
            authority: z.ZodLiteral<"scoped">;
            failure_semantics: z.ZodLiteral<"documented">;
            recovery: z.ZodLiteral<"supported">;
        }, z.core.$strict>;
        observed_assessment: z.ZodObject<{
            allowed_sources: z.ZodArray<z.ZodEnum<{
                public_documentation: "public_documentation";
                public_metadata: "public_metadata";
                public_endpoints: "public_endpoints";
                non_mutating_interaction: "non_mutating_interaction";
                operator_attested_public_observation: "operator_attested_public_observation";
            }>>;
            consequential_claims: z.ZodLiteral<"certification_required">;
        }, z.core.$strict>;
    }, z.core.$strict>;
    assessment_methods: z.ZodArray<z.ZodObject<{
        method_contract: z.ZodLiteral<"sourcey.agent-readiness-method/v1alpha1">;
        name: z.ZodString;
        version: z.ZodString;
        capabilities: z.ZodArray<z.ZodObject<{
            stage: z.ZodEnum<{
                evaluate: "evaluate";
                sign_up: "sign_up";
                pay: "pay";
                provision: "provision";
                operate: "operate";
            }>;
            signal_code: z.ZodString;
            values: z.ZodArray<z.ZodEnum<{
                yes: "yes";
                no: "no";
                partial: "partial";
                not_applicable: "not_applicable";
            }>>;
            determination_bases: z.ZodArray<z.ZodEnum<{
                direct_observation: "direct_observation";
                bounded_absence: "bounded_absence";
                explicit_first_party_declaration: "explicit_first_party_declaration";
                standard_requirement: "standard_requirement";
                certification_receipt: "certification_receipt";
            }>>;
        }, z.core.$strict>>;
        surface_support: z.ZodObject<{
            node_kinds: z.ZodArray<z.ZodEnum<{
                resource: "resource";
                endpoint: "endpoint";
                interface: "interface";
                surface_exclusion: "surface_exclusion";
            }>>;
            resource_roles: z.ZodArray<z.ZodEnum<{
                policy: "policy";
                discovery: "discovery";
                status: "status";
                pricing: "pricing";
                eligibility: "eligibility";
                access: "access";
                terms: "terms";
                checkout: "checkout";
                provisioning: "provisioning";
                operations: "operations";
                recovery: "recovery";
                authentication: "authentication";
                descriptor: "descriptor";
                documentation: "documentation";
            }>>;
            endpoint_roles: z.ZodArray<z.ZodEnum<{
                status: "status";
                service: "service";
                checkout: "checkout";
                recovery: "recovery";
                authorization: "authorization";
                token: "token";
                registration: "registration";
                protected_resource: "protected_resource";
                webhook: "webhook";
            }>>;
            interface_modalities: z.ZodArray<z.ZodEnum<{
                web_application: "web_application";
                network_api: "network_api";
                command_line: "command_line";
                software_library: "software_library";
                tool_server: "tool_server";
                agent_service: "agent_service";
            }>>;
            interface_functions: z.ZodArray<z.ZodEnum<{
                events: "events";
                recovery: "recovery";
                authentication: "authentication";
                service_operation: "service_operation";
                commerce: "commerce";
            }>>;
        }, z.core.$strict>;
        capture: z.ZodObject<{
            rungs: z.ZodArray<z.ZodEnum<{
                http: "http";
                headless: "headless";
                archive: "archive";
                manual: "manual";
            }>>;
            redirects: z.ZodEnum<{
                reject: "reject";
                "same-origin": "same-origin";
                "allowed-hosts": "allowed-hosts";
            }>;
            require_https: z.ZodLiteral<true>;
            max_redirects: z.ZodNumber;
            timeout_ms: z.ZodNumber;
            max_bytes: z.ZodNumber;
            freshness_capability: z.ZodEnum<{
                current: "current";
                "history-only": "history-only";
            }>;
        }, z.core.$strict>;
        interaction: z.ZodObject<{
            mode: z.ZodLiteral<"non_mutating">;
            max_actions: z.ZodNumber;
            allowed_actions: z.ZodArray<z.ZodEnum<{
                navigate: "navigate";
                follow_link: "follow_link";
                expand_disclosure: "expand_disclosure";
                select_non_submitting_control: "select_non_submitting_control";
                scroll: "scroll";
                wait: "wait";
            }>>;
            forbidden_effects: z.ZodArray<z.ZodEnum<{
                provision: "provision";
                submit_application: "submit_application";
                create_account: "create_account";
                send_verification_code: "send_verification_code";
                accept_terms: "accept_terms";
                enter_credentials: "enter_credentials";
                enter_payment_details: "enter_payment_details";
                purchase: "purchase";
                create_key: "create_key";
                invoke_billable_service: "invoke_billable_service";
            }>>;
        }, z.core.$strict>;
        required_artifacts: z.ZodArray<z.ZodEnum<{
            redirect_chain: "redirect_chain";
            interaction_trace: "interaction_trace";
            raw_bytes: "raw_bytes";
            normalized_text: "normalized_text";
            structured_validation: "structured_validation";
            standard_evidence_result: "standard_evidence_result";
            utf8_locators: "utf8_locators";
            screenshot: "screenshot";
            capture_interaction_trace: "capture_interaction_trace";
            manual_review_note: "manual_review_note";
        }>>;
        failure_classes: z.ZodArray<z.ZodEnum<{
            network_failure: "network_failure";
            policy_refusal: "policy_refusal";
            authentication_required: "authentication_required";
            timeout: "timeout";
            render_failure: "render_failure";
            invalid_structure: "invalid_structure";
            interaction_budget_exhausted: "interaction_budget_exhausted";
            capture_unavailable: "capture_unavailable";
        }>>;
        residue_classes: z.ZodArray<z.ZodEnum<{
            unresolved_signal: "unresolved_signal";
            insufficient_determination_basis: "insufficient_determination_basis";
            conflicting_observations: "conflicting_observations";
            scope_mismatch: "scope_mismatch";
            manual_review_required: "manual_review_required";
            unsupported_interaction: "unsupported_interaction";
        }>>;
        external_references: z.ZodArray<z.ZodObject<{
            namespace: z.ZodString;
            version: z.ZodString;
            requirement_id: z.ZodString;
            relation: z.ZodEnum<{
                tests: "tests";
                "informational-reference": "informational-reference";
            }>;
        }, z.core.$strict>>;
        method_digest: z.ZodString;
    }, z.core.$strict>>;
    signal_rules: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        signal_code: z.ZodString;
        evaluation_role: z.ZodEnum<{
            graded: "graded";
            barrier: "barrier";
            informational: "informational";
        }>;
        required: z.ZodBoolean;
        pass_values: z.ZodArray<z.ZodEnum<{
            unknown: "unknown";
            yes: "yes";
            no: "no";
            partial: "partial";
            not_applicable: "not_applicable";
        }>>;
        constrained_values: z.ZodArray<z.ZodEnum<{
            unknown: "unknown";
            yes: "yes";
            no: "no";
            partial: "partial";
            not_applicable: "not_applicable";
        }>>;
        fail_values: z.ZodArray<z.ZodEnum<{
            unknown: "unknown";
            yes: "yes";
            no: "no";
            partial: "partial";
            not_applicable: "not_applicable";
        }>>;
        allow_not_applicable: z.ZodBoolean;
        allowed_method_digests: z.ZodArray<z.ZodString>;
        selector_groups: z.ZodArray<z.ZodObject<{
            selector_group_id: z.ZodString;
            coverage: z.ZodEnum<{
                at_least_one: "at_least_one";
                all_matches: "all_matches";
            }>;
            alternatives: z.ZodArray<z.ZodObject<{
                alternative_id: z.ZodString;
                selectors: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"resource_role">;
                    roles: z.ZodArray<z.ZodEnum<{
                        policy: "policy";
                        discovery: "discovery";
                        status: "status";
                        pricing: "pricing";
                        eligibility: "eligibility";
                        access: "access";
                        terms: "terms";
                        checkout: "checkout";
                        provisioning: "provisioning";
                        operations: "operations";
                        recovery: "recovery";
                        authentication: "authentication";
                        descriptor: "descriptor";
                        documentation: "documentation";
                    }>>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"endpoint_role">;
                    roles: z.ZodArray<z.ZodEnum<{
                        status: "status";
                        service: "service";
                        checkout: "checkout";
                        recovery: "recovery";
                        authorization: "authorization";
                        token: "token";
                        registration: "registration";
                        protected_resource: "protected_resource";
                        webhook: "webhook";
                    }>>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"interface_signature">;
                    modalities: z.ZodArray<z.ZodEnum<{
                        web_application: "web_application";
                        network_api: "network_api";
                        command_line: "command_line";
                        software_library: "software_library";
                        tool_server: "tool_server";
                        agent_service: "agent_service";
                    }>>;
                    functions: z.ZodArray<z.ZodEnum<{
                        events: "events";
                        recovery: "recovery";
                        authentication: "authentication";
                        service_operation: "service_operation";
                        commerce: "commerce";
                    }>>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"assessment_target_membership">;
                    membership: z.ZodEnum<{
                        direct: "direct";
                        reachable: "reachable";
                    }>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"target_relation">;
                    relation_kind: z.ZodEnum<{
                        describes: "describes";
                        authenticates: "authenticates";
                        requires: "requires";
                        alternative_to: "alternative_to";
                        precedes: "precedes";
                    }>;
                    direction: z.ZodEnum<{
                        from_target: "from_target";
                        to_target: "to_target";
                    }>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"standard_requirement">;
                    requirement: z.ZodObject<{
                        namespace: z.ZodString;
                        version: z.ZodString;
                        requirement_id: z.ZodString;
                        relation: z.ZodEnum<{
                            tests: "tests";
                            "informational-reference": "informational-reference";
                        }>;
                    }, z.core.$strict>;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        evidence_terms: z.ZodOptional<z.ZodArray<z.ZodString>>;
        value_evidence: z.ZodArray<z.ZodObject<{
            value: z.ZodEnum<{
                yes: "yes";
                no: "no";
                partial: "partial";
                not_applicable: "not_applicable";
            }>;
            alternatives: z.ZodArray<z.ZodObject<{
                alternative_id: z.ZodString;
                required_basis_kinds: z.ZodArray<z.ZodEnum<{
                    direct_observation: "direct_observation";
                    bounded_absence: "bounded_absence";
                    explicit_first_party_declaration: "explicit_first_party_declaration";
                    standard_requirement: "standard_requirement";
                    certification_receipt: "certification_receipt";
                }>>;
                minimum_distinct_captures: z.ZodNumber;
                require_independent_capture_rungs: z.ZodBoolean;
                required_artifacts: z.ZodArray<z.ZodEnum<{
                    redirect_chain: "redirect_chain";
                    interaction_trace: "interaction_trace";
                    raw_bytes: "raw_bytes";
                    normalized_text: "normalized_text";
                    structured_validation: "structured_validation";
                    standard_evidence_result: "standard_evidence_result";
                    utf8_locators: "utf8_locators";
                    screenshot: "screenshot";
                    capture_interaction_trace: "capture_interaction_trace";
                    manual_review_note: "manual_review_note";
                }>>;
                minimum_surfaces: z.ZodNumber;
                minimum_branches: z.ZodNumber;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        priority: z.ZodNumber;
        blocker: z.ZodOptional<z.ZodObject<{
            code: z.ZodString;
            explanation: z.ZodString;
        }, z.core.$strict>>;
        remediation: z.ZodOptional<z.ZodObject<{
            code: z.ZodString;
            instruction: z.ZodString;
        }, z.core.$strict>>;
        public_findings: z.ZodObject<{
            yes: z.ZodObject<{
                condition: z.ZodString;
                finding: z.ZodString;
            }, z.core.$strict>;
            no: z.ZodObject<{
                condition: z.ZodString;
                finding: z.ZodString;
            }, z.core.$strict>;
            partial: z.ZodObject<{
                condition: z.ZodString;
                finding: z.ZodString;
            }, z.core.$strict>;
            unknown: z.ZodObject<{
                condition: z.ZodString;
                finding: z.ZodString;
            }, z.core.$strict>;
            not_applicable: z.ZodObject<{
                condition: z.ZodString;
                finding: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        external_references: z.ZodArray<z.ZodObject<{
            namespace: z.ZodString;
            version: z.ZodString;
            requirement_id: z.ZodString;
            relation: z.ZodEnum<{
                tests: "tests";
                "informational-reference": "informational-reference";
            }>;
        }, z.core.$strict>>;
        standard_evidence: z.ZodArray<z.ZodObject<{
            requirement: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
                requirement_id: z.ZodString;
                relation: z.ZodEnum<{
                    tests: "tests";
                    "informational-reference": "informational-reference";
                }>;
            }, z.core.$strict>;
            support: z.ZodArray<z.ZodObject<{
                result: z.ZodEnum<{
                    satisfied: "satisfied";
                    not_satisfied: "not_satisfied";
                }>;
                values: z.ZodArray<z.ZodEnum<{
                    yes: "yes";
                    no: "no";
                    partial: "partial";
                    not_applicable: "not_applicable";
                }>>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    aggregation: z.ZodObject<{
        stage: z.ZodLiteral<"worst-signal">;
        overall: z.ZodLiteral<"worst-stage">;
        outcome_precedence: z.ZodArray<z.ZodEnum<{
            unknown: "unknown";
            not_applicable: "not_applicable";
            pass: "pass";
            constrained: "constrained";
            fail: "fail";
        }>>;
        blocker_precedence: z.ZodLiteral<"outcome-then-rule-priority">;
        tie_breaker: z.ZodLiteral<"signal-code">;
    }, z.core.$strict>;
    coverage: z.ZodObject<{
        unknown_signals: z.ZodLiteral<"uncovered">;
        contradicted_signals: z.ZodLiteral<"uncovered">;
    }, z.core.$strict>;
    freshness: z.ZodObject<{
        source: z.ZodLiteral<"observation-freshness-policy">;
        aggregation: z.ZodEnum<{
            "worst-signal": "worst-signal";
            "worst-required-signal": "worst-required-signal";
            "worst-evaluated-signal": "worst-evaluated-signal";
        }>;
    }, z.core.$strict>;
    public_states: z.ZodObject<{
        pass: z.ZodObject<{
            state: z.ZodEnum<{
                unknown: "unknown";
                not_applicable: "not_applicable";
                ready: "ready";
                limited: "limited";
                blocked: "blocked";
            }>;
            label: z.ZodString;
        }, z.core.$strict>;
        constrained: z.ZodObject<{
            state: z.ZodEnum<{
                unknown: "unknown";
                not_applicable: "not_applicable";
                ready: "ready";
                limited: "limited";
                blocked: "blocked";
            }>;
            label: z.ZodString;
        }, z.core.$strict>;
        fail: z.ZodObject<{
            state: z.ZodEnum<{
                unknown: "unknown";
                not_applicable: "not_applicable";
                ready: "ready";
                limited: "limited";
                blocked: "blocked";
            }>;
            label: z.ZodString;
        }, z.core.$strict>;
        unknown: z.ZodObject<{
            state: z.ZodEnum<{
                unknown: "unknown";
                not_applicable: "not_applicable";
                ready: "ready";
                limited: "limited";
                blocked: "blocked";
            }>;
            label: z.ZodString;
        }, z.core.$strict>;
        not_applicable: z.ZodObject<{
            state: z.ZodEnum<{
                unknown: "unknown";
                not_applicable: "not_applicable";
                ready: "ready";
                limited: "limited";
                blocked: "blocked";
            }>;
            label: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>;
    grading: z.ZodObject<{
        strategy: z.ZodLiteral<"stage-state-cardinality">;
        grade_by_limited_stage_count: z.ZodObject<{
            "0": z.ZodLiteral<"A+">;
            "1": z.ZodLiteral<"A">;
            "2": z.ZodLiteral<"B+">;
            "3": z.ZodLiteral<"B">;
            "4": z.ZodLiteral<"C+">;
            "5": z.ZodLiteral<"C">;
        }, z.core.$strict>;
        failure_grade_by_stage: z.ZodObject<{
            evaluate: z.ZodLiteral<"D">;
            sign_up: z.ZodLiteral<"D">;
            pay: z.ZodLiteral<"D">;
            provision: z.ZodLiteral<"F">;
            operate: z.ZodLiteral<"F">;
        }, z.core.$strict>;
        unverified_barrier_grade_cap: z.ZodOptional<z.ZodLiteral<"B+">>;
        not_applicable_signals: z.ZodLiteral<"excluded">;
        unrated_when: z.ZodObject<{
            coverage: z.ZodLiteral<"not-complete">;
            freshness: z.ZodLiteral<"not-fresh">;
        }, z.core.$strict>;
    }, z.core.$strict>;
    grade_derivation: z.ZodObject<{
        label: z.ZodString;
        explanation: z.ZodString;
        coverage_rule: z.ZodString;
        outcome_rule: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const agentReadinessPolicySchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.agent-readiness-policy/v1alpha1">;
    policy_version: z.ZodString;
    assessment_basis: z.ZodObject<{
        principal: z.ZodLiteral<"authorized_human_or_organization">;
        initial_state: z.ZodObject<{
            product_specific_account: z.ZodLiteral<false>;
            product_credentials: z.ZodLiteral<false>;
            paid_subscription: z.ZodLiteral<false>;
            provisioned_resource: z.ZodLiteral<false>;
            external_identity: z.ZodLiteral<"only_when_declared_by_exact_funnel">;
        }, z.core.$strict>;
        permitted_human_boundaries: z.ZodArray<z.ZodEnum<{
            account_ownership_confirmation: "account_ownership_confirmation";
            delegated_identity_consent: "delegated_identity_consent";
            regulated_approval: "regulated_approval";
            final_payment_or_irreversible_commitment: "final_payment_or_irreversible_commitment";
        }>>;
        required_handoff_properties: z.ZodArray<z.ZodEnum<{
            exact_disclosure: "exact_disclosure";
            resumable_handoff: "resumable_handoff";
            deterministic_continuation: "deterministic_continuation";
        }>>;
        forbidden_substitutions: z.ZodArray<z.ZodEnum<{
            captcha_solving: "captcha_solving";
            human_password_or_session_sharing: "human_password_or_session_sharing";
            concealed_agent_identity: "concealed_agent_identity";
            invented_eligibility: "invented_eligibility";
            unbound_out_of_band_code: "unbound_out_of_band_code";
            vendor_policy_bypass: "vendor_policy_bypass";
            unapproved_consequential_action: "unapproved_consequential_action";
        }>>;
        success: z.ZodObject<{
            target_coverage: z.ZodLiteral<"every_declared_target">;
            interface_coverage: z.ZodLiteral<"at_least_one_declared_alternative">;
            authority: z.ZodLiteral<"scoped">;
            failure_semantics: z.ZodLiteral<"documented">;
            recovery: z.ZodLiteral<"supported">;
        }, z.core.$strict>;
        observed_assessment: z.ZodObject<{
            allowed_sources: z.ZodArray<z.ZodEnum<{
                public_documentation: "public_documentation";
                public_metadata: "public_metadata";
                public_endpoints: "public_endpoints";
                non_mutating_interaction: "non_mutating_interaction";
                operator_attested_public_observation: "operator_attested_public_observation";
            }>>;
            consequential_claims: z.ZodLiteral<"certification_required">;
        }, z.core.$strict>;
    }, z.core.$strict>;
    assessment_methods: z.ZodArray<z.ZodObject<{
        method_contract: z.ZodLiteral<"sourcey.agent-readiness-method/v1alpha1">;
        name: z.ZodString;
        version: z.ZodString;
        capabilities: z.ZodArray<z.ZodObject<{
            stage: z.ZodEnum<{
                evaluate: "evaluate";
                sign_up: "sign_up";
                pay: "pay";
                provision: "provision";
                operate: "operate";
            }>;
            signal_code: z.ZodString;
            values: z.ZodArray<z.ZodEnum<{
                yes: "yes";
                no: "no";
                partial: "partial";
                not_applicable: "not_applicable";
            }>>;
            determination_bases: z.ZodArray<z.ZodEnum<{
                direct_observation: "direct_observation";
                bounded_absence: "bounded_absence";
                explicit_first_party_declaration: "explicit_first_party_declaration";
                standard_requirement: "standard_requirement";
                certification_receipt: "certification_receipt";
            }>>;
        }, z.core.$strict>>;
        surface_support: z.ZodObject<{
            node_kinds: z.ZodArray<z.ZodEnum<{
                resource: "resource";
                endpoint: "endpoint";
                interface: "interface";
                surface_exclusion: "surface_exclusion";
            }>>;
            resource_roles: z.ZodArray<z.ZodEnum<{
                policy: "policy";
                discovery: "discovery";
                status: "status";
                pricing: "pricing";
                eligibility: "eligibility";
                access: "access";
                terms: "terms";
                checkout: "checkout";
                provisioning: "provisioning";
                operations: "operations";
                recovery: "recovery";
                authentication: "authentication";
                descriptor: "descriptor";
                documentation: "documentation";
            }>>;
            endpoint_roles: z.ZodArray<z.ZodEnum<{
                status: "status";
                service: "service";
                checkout: "checkout";
                recovery: "recovery";
                authorization: "authorization";
                token: "token";
                registration: "registration";
                protected_resource: "protected_resource";
                webhook: "webhook";
            }>>;
            interface_modalities: z.ZodArray<z.ZodEnum<{
                web_application: "web_application";
                network_api: "network_api";
                command_line: "command_line";
                software_library: "software_library";
                tool_server: "tool_server";
                agent_service: "agent_service";
            }>>;
            interface_functions: z.ZodArray<z.ZodEnum<{
                events: "events";
                recovery: "recovery";
                authentication: "authentication";
                service_operation: "service_operation";
                commerce: "commerce";
            }>>;
        }, z.core.$strict>;
        capture: z.ZodObject<{
            rungs: z.ZodArray<z.ZodEnum<{
                http: "http";
                headless: "headless";
                archive: "archive";
                manual: "manual";
            }>>;
            redirects: z.ZodEnum<{
                reject: "reject";
                "same-origin": "same-origin";
                "allowed-hosts": "allowed-hosts";
            }>;
            require_https: z.ZodLiteral<true>;
            max_redirects: z.ZodNumber;
            timeout_ms: z.ZodNumber;
            max_bytes: z.ZodNumber;
            freshness_capability: z.ZodEnum<{
                current: "current";
                "history-only": "history-only";
            }>;
        }, z.core.$strict>;
        interaction: z.ZodObject<{
            mode: z.ZodLiteral<"non_mutating">;
            max_actions: z.ZodNumber;
            allowed_actions: z.ZodArray<z.ZodEnum<{
                navigate: "navigate";
                follow_link: "follow_link";
                expand_disclosure: "expand_disclosure";
                select_non_submitting_control: "select_non_submitting_control";
                scroll: "scroll";
                wait: "wait";
            }>>;
            forbidden_effects: z.ZodArray<z.ZodEnum<{
                provision: "provision";
                submit_application: "submit_application";
                create_account: "create_account";
                send_verification_code: "send_verification_code";
                accept_terms: "accept_terms";
                enter_credentials: "enter_credentials";
                enter_payment_details: "enter_payment_details";
                purchase: "purchase";
                create_key: "create_key";
                invoke_billable_service: "invoke_billable_service";
            }>>;
        }, z.core.$strict>;
        required_artifacts: z.ZodArray<z.ZodEnum<{
            redirect_chain: "redirect_chain";
            interaction_trace: "interaction_trace";
            raw_bytes: "raw_bytes";
            normalized_text: "normalized_text";
            structured_validation: "structured_validation";
            standard_evidence_result: "standard_evidence_result";
            utf8_locators: "utf8_locators";
            screenshot: "screenshot";
            capture_interaction_trace: "capture_interaction_trace";
            manual_review_note: "manual_review_note";
        }>>;
        failure_classes: z.ZodArray<z.ZodEnum<{
            network_failure: "network_failure";
            policy_refusal: "policy_refusal";
            authentication_required: "authentication_required";
            timeout: "timeout";
            render_failure: "render_failure";
            invalid_structure: "invalid_structure";
            interaction_budget_exhausted: "interaction_budget_exhausted";
            capture_unavailable: "capture_unavailable";
        }>>;
        residue_classes: z.ZodArray<z.ZodEnum<{
            unresolved_signal: "unresolved_signal";
            insufficient_determination_basis: "insufficient_determination_basis";
            conflicting_observations: "conflicting_observations";
            scope_mismatch: "scope_mismatch";
            manual_review_required: "manual_review_required";
            unsupported_interaction: "unsupported_interaction";
        }>>;
        external_references: z.ZodArray<z.ZodObject<{
            namespace: z.ZodString;
            version: z.ZodString;
            requirement_id: z.ZodString;
            relation: z.ZodEnum<{
                tests: "tests";
                "informational-reference": "informational-reference";
            }>;
        }, z.core.$strict>>;
        method_digest: z.ZodString;
    }, z.core.$strict>>;
    signal_rules: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        signal_code: z.ZodString;
        evaluation_role: z.ZodEnum<{
            graded: "graded";
            barrier: "barrier";
            informational: "informational";
        }>;
        required: z.ZodBoolean;
        pass_values: z.ZodArray<z.ZodEnum<{
            unknown: "unknown";
            yes: "yes";
            no: "no";
            partial: "partial";
            not_applicable: "not_applicable";
        }>>;
        constrained_values: z.ZodArray<z.ZodEnum<{
            unknown: "unknown";
            yes: "yes";
            no: "no";
            partial: "partial";
            not_applicable: "not_applicable";
        }>>;
        fail_values: z.ZodArray<z.ZodEnum<{
            unknown: "unknown";
            yes: "yes";
            no: "no";
            partial: "partial";
            not_applicable: "not_applicable";
        }>>;
        allow_not_applicable: z.ZodBoolean;
        allowed_method_digests: z.ZodArray<z.ZodString>;
        selector_groups: z.ZodArray<z.ZodObject<{
            selector_group_id: z.ZodString;
            coverage: z.ZodEnum<{
                at_least_one: "at_least_one";
                all_matches: "all_matches";
            }>;
            alternatives: z.ZodArray<z.ZodObject<{
                alternative_id: z.ZodString;
                selectors: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"resource_role">;
                    roles: z.ZodArray<z.ZodEnum<{
                        policy: "policy";
                        discovery: "discovery";
                        status: "status";
                        pricing: "pricing";
                        eligibility: "eligibility";
                        access: "access";
                        terms: "terms";
                        checkout: "checkout";
                        provisioning: "provisioning";
                        operations: "operations";
                        recovery: "recovery";
                        authentication: "authentication";
                        descriptor: "descriptor";
                        documentation: "documentation";
                    }>>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"endpoint_role">;
                    roles: z.ZodArray<z.ZodEnum<{
                        status: "status";
                        service: "service";
                        checkout: "checkout";
                        recovery: "recovery";
                        authorization: "authorization";
                        token: "token";
                        registration: "registration";
                        protected_resource: "protected_resource";
                        webhook: "webhook";
                    }>>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"interface_signature">;
                    modalities: z.ZodArray<z.ZodEnum<{
                        web_application: "web_application";
                        network_api: "network_api";
                        command_line: "command_line";
                        software_library: "software_library";
                        tool_server: "tool_server";
                        agent_service: "agent_service";
                    }>>;
                    functions: z.ZodArray<z.ZodEnum<{
                        events: "events";
                        recovery: "recovery";
                        authentication: "authentication";
                        service_operation: "service_operation";
                        commerce: "commerce";
                    }>>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"assessment_target_membership">;
                    membership: z.ZodEnum<{
                        direct: "direct";
                        reachable: "reachable";
                    }>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"target_relation">;
                    relation_kind: z.ZodEnum<{
                        describes: "describes";
                        authenticates: "authenticates";
                        requires: "requires";
                        alternative_to: "alternative_to";
                        precedes: "precedes";
                    }>;
                    direction: z.ZodEnum<{
                        from_target: "from_target";
                        to_target: "to_target";
                    }>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"standard_requirement">;
                    requirement: z.ZodObject<{
                        namespace: z.ZodString;
                        version: z.ZodString;
                        requirement_id: z.ZodString;
                        relation: z.ZodEnum<{
                            tests: "tests";
                            "informational-reference": "informational-reference";
                        }>;
                    }, z.core.$strict>;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        evidence_terms: z.ZodOptional<z.ZodArray<z.ZodString>>;
        value_evidence: z.ZodArray<z.ZodObject<{
            value: z.ZodEnum<{
                yes: "yes";
                no: "no";
                partial: "partial";
                not_applicable: "not_applicable";
            }>;
            alternatives: z.ZodArray<z.ZodObject<{
                alternative_id: z.ZodString;
                required_basis_kinds: z.ZodArray<z.ZodEnum<{
                    direct_observation: "direct_observation";
                    bounded_absence: "bounded_absence";
                    explicit_first_party_declaration: "explicit_first_party_declaration";
                    standard_requirement: "standard_requirement";
                    certification_receipt: "certification_receipt";
                }>>;
                minimum_distinct_captures: z.ZodNumber;
                require_independent_capture_rungs: z.ZodBoolean;
                required_artifacts: z.ZodArray<z.ZodEnum<{
                    redirect_chain: "redirect_chain";
                    interaction_trace: "interaction_trace";
                    raw_bytes: "raw_bytes";
                    normalized_text: "normalized_text";
                    structured_validation: "structured_validation";
                    standard_evidence_result: "standard_evidence_result";
                    utf8_locators: "utf8_locators";
                    screenshot: "screenshot";
                    capture_interaction_trace: "capture_interaction_trace";
                    manual_review_note: "manual_review_note";
                }>>;
                minimum_surfaces: z.ZodNumber;
                minimum_branches: z.ZodNumber;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        priority: z.ZodNumber;
        blocker: z.ZodOptional<z.ZodObject<{
            code: z.ZodString;
            explanation: z.ZodString;
        }, z.core.$strict>>;
        remediation: z.ZodOptional<z.ZodObject<{
            code: z.ZodString;
            instruction: z.ZodString;
        }, z.core.$strict>>;
        public_findings: z.ZodObject<{
            yes: z.ZodObject<{
                condition: z.ZodString;
                finding: z.ZodString;
            }, z.core.$strict>;
            no: z.ZodObject<{
                condition: z.ZodString;
                finding: z.ZodString;
            }, z.core.$strict>;
            partial: z.ZodObject<{
                condition: z.ZodString;
                finding: z.ZodString;
            }, z.core.$strict>;
            unknown: z.ZodObject<{
                condition: z.ZodString;
                finding: z.ZodString;
            }, z.core.$strict>;
            not_applicable: z.ZodObject<{
                condition: z.ZodString;
                finding: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        external_references: z.ZodArray<z.ZodObject<{
            namespace: z.ZodString;
            version: z.ZodString;
            requirement_id: z.ZodString;
            relation: z.ZodEnum<{
                tests: "tests";
                "informational-reference": "informational-reference";
            }>;
        }, z.core.$strict>>;
        standard_evidence: z.ZodArray<z.ZodObject<{
            requirement: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
                requirement_id: z.ZodString;
                relation: z.ZodEnum<{
                    tests: "tests";
                    "informational-reference": "informational-reference";
                }>;
            }, z.core.$strict>;
            support: z.ZodArray<z.ZodObject<{
                result: z.ZodEnum<{
                    satisfied: "satisfied";
                    not_satisfied: "not_satisfied";
                }>;
                values: z.ZodArray<z.ZodEnum<{
                    yes: "yes";
                    no: "no";
                    partial: "partial";
                    not_applicable: "not_applicable";
                }>>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    aggregation: z.ZodObject<{
        stage: z.ZodLiteral<"worst-signal">;
        overall: z.ZodLiteral<"worst-stage">;
        outcome_precedence: z.ZodArray<z.ZodEnum<{
            unknown: "unknown";
            not_applicable: "not_applicable";
            pass: "pass";
            constrained: "constrained";
            fail: "fail";
        }>>;
        blocker_precedence: z.ZodLiteral<"outcome-then-rule-priority">;
        tie_breaker: z.ZodLiteral<"signal-code">;
    }, z.core.$strict>;
    coverage: z.ZodObject<{
        unknown_signals: z.ZodLiteral<"uncovered">;
        contradicted_signals: z.ZodLiteral<"uncovered">;
    }, z.core.$strict>;
    freshness: z.ZodObject<{
        source: z.ZodLiteral<"observation-freshness-policy">;
        aggregation: z.ZodEnum<{
            "worst-signal": "worst-signal";
            "worst-required-signal": "worst-required-signal";
            "worst-evaluated-signal": "worst-evaluated-signal";
        }>;
    }, z.core.$strict>;
    public_states: z.ZodObject<{
        pass: z.ZodObject<{
            state: z.ZodEnum<{
                unknown: "unknown";
                not_applicable: "not_applicable";
                ready: "ready";
                limited: "limited";
                blocked: "blocked";
            }>;
            label: z.ZodString;
        }, z.core.$strict>;
        constrained: z.ZodObject<{
            state: z.ZodEnum<{
                unknown: "unknown";
                not_applicable: "not_applicable";
                ready: "ready";
                limited: "limited";
                blocked: "blocked";
            }>;
            label: z.ZodString;
        }, z.core.$strict>;
        fail: z.ZodObject<{
            state: z.ZodEnum<{
                unknown: "unknown";
                not_applicable: "not_applicable";
                ready: "ready";
                limited: "limited";
                blocked: "blocked";
            }>;
            label: z.ZodString;
        }, z.core.$strict>;
        unknown: z.ZodObject<{
            state: z.ZodEnum<{
                unknown: "unknown";
                not_applicable: "not_applicable";
                ready: "ready";
                limited: "limited";
                blocked: "blocked";
            }>;
            label: z.ZodString;
        }, z.core.$strict>;
        not_applicable: z.ZodObject<{
            state: z.ZodEnum<{
                unknown: "unknown";
                not_applicable: "not_applicable";
                ready: "ready";
                limited: "limited";
                blocked: "blocked";
            }>;
            label: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>;
    grading: z.ZodObject<{
        strategy: z.ZodLiteral<"stage-state-cardinality">;
        grade_by_limited_stage_count: z.ZodObject<{
            "0": z.ZodLiteral<"A+">;
            "1": z.ZodLiteral<"A">;
            "2": z.ZodLiteral<"B+">;
            "3": z.ZodLiteral<"B">;
            "4": z.ZodLiteral<"C+">;
            "5": z.ZodLiteral<"C">;
        }, z.core.$strict>;
        failure_grade_by_stage: z.ZodObject<{
            evaluate: z.ZodLiteral<"D">;
            sign_up: z.ZodLiteral<"D">;
            pay: z.ZodLiteral<"D">;
            provision: z.ZodLiteral<"F">;
            operate: z.ZodLiteral<"F">;
        }, z.core.$strict>;
        unverified_barrier_grade_cap: z.ZodOptional<z.ZodLiteral<"B+">>;
        not_applicable_signals: z.ZodLiteral<"excluded">;
        unrated_when: z.ZodObject<{
            coverage: z.ZodLiteral<"not-complete">;
            freshness: z.ZodLiteral<"not-fresh">;
        }, z.core.$strict>;
    }, z.core.$strict>;
    grade_derivation: z.ZodObject<{
        label: z.ZodString;
        explanation: z.ZodString;
        coverage_rule: z.ZodString;
        outcome_rule: z.ZodString;
    }, z.core.$strict>;
    policy_digest: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessProjectedSignalSchema: z.ZodObject<{
    signal_code: z.ZodString;
    evaluation_role: z.ZodEnum<{
        graded: "graded";
        barrier: "barrier";
        informational: "informational";
    }>;
    required: z.ZodBoolean;
    value: z.ZodEnum<{
        unknown: "unknown";
        yes: "yes";
        no: "no";
        partial: "partial";
        not_applicable: "not_applicable";
    }>;
    value_label: z.ZodString;
    outcome: z.ZodEnum<{
        unknown: "unknown";
        not_applicable: "not_applicable";
        pass: "pass";
        constrained: "constrained";
        fail: "fail";
    }>;
    public_state: z.ZodEnum<{
        unknown: "unknown";
        not_applicable: "not_applicable";
        ready: "ready";
        limited: "limited";
        blocked: "blocked";
    }>;
    condition: z.ZodString;
    finding: z.ZodString;
    evidence_status: z.ZodEnum<{
        supported: "supported";
        contradicted: "contradicted";
        mixed: "mixed";
        missing: "missing";
    }>;
    freshness: z.ZodEnum<{
        unknown: "unknown";
        fresh: "fresh";
        stale: "stale";
    }>;
    observed_at: z.ZodOptional<z.ZodISODateTime>;
    tested_surfaces: z.ZodArray<z.ZodObject<{
        node_kind: z.ZodEnum<{
            resource: "resource";
            endpoint: "endpoint";
            interface: "interface";
            surface_exclusion: "surface_exclusion";
        }>;
        node_id: z.ZodString;
    }, z.core.$strict>>;
    assessment_method: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        version: z.ZodString;
        method_digest: z.ZodString;
    }, z.core.$strict>>;
    determination_bases: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        locators: z.ZodArray<z.ZodObject<{
            artifact_digest: z.ZodString;
            start_byte: z.ZodNumber;
            end_byte: z.ZodNumber;
            value_digest: z.ZodString;
        }, z.core.$strict>>;
        captures: z.ZodArray<z.ZodObject<{
            retained_capture_digest: z.ZodString;
            capture_rung: z.ZodEnum<{
                http: "http";
                headless: "headless";
                archive: "archive";
                manual: "manual";
            }>;
        }, z.core.$strict>>;
        artifact_digests: z.ZodArray<z.ZodString>;
        kind: z.ZodLiteral<"direct_observation">;
    }, z.core.$strict>, z.ZodObject<{
        coverage_scope: z.ZodEnum<{
            exact_resource: "exact_resource";
            tested_surfaces: "tested_surfaces";
            exact_funnel: "exact_funnel";
        }>;
        covered_surfaces: z.ZodArray<z.ZodObject<{
            node_kind: z.ZodEnum<{
                resource: "resource";
                endpoint: "endpoint";
                interface: "interface";
                surface_exclusion: "surface_exclusion";
            }>;
            node_id: z.ZodString;
        }, z.core.$strict>>;
        covered_branches: z.ZodNumber;
        captures: z.ZodArray<z.ZodObject<{
            retained_capture_digest: z.ZodString;
            capture_rung: z.ZodEnum<{
                http: "http";
                headless: "headless";
                archive: "archive";
                manual: "manual";
            }>;
        }, z.core.$strict>>;
        artifact_digests: z.ZodArray<z.ZodString>;
        kind: z.ZodLiteral<"bounded_absence">;
    }, z.core.$strict>, z.ZodObject<{
        source_surface: z.ZodObject<{
            node_kind: z.ZodEnum<{
                resource: "resource";
                endpoint: "endpoint";
                interface: "interface";
                surface_exclusion: "surface_exclusion";
            }>;
            node_id: z.ZodString;
        }, z.core.$strict>;
        locators: z.ZodArray<z.ZodObject<{
            artifact_digest: z.ZodString;
            start_byte: z.ZodNumber;
            end_byte: z.ZodNumber;
            value_digest: z.ZodString;
        }, z.core.$strict>>;
        captures: z.ZodArray<z.ZodObject<{
            retained_capture_digest: z.ZodString;
            capture_rung: z.ZodEnum<{
                http: "http";
                headless: "headless";
                archive: "archive";
                manual: "manual";
            }>;
        }, z.core.$strict>>;
        artifact_digests: z.ZodArray<z.ZodString>;
        kind: z.ZodLiteral<"explicit_first_party_declaration">;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"standard_requirement">;
        adapter_digest: z.ZodString;
        evidence_record_digest: z.ZodString;
        requirement: z.ZodObject<{
            namespace: z.ZodString;
            version: z.ZodString;
            requirement_id: z.ZodString;
            relation: z.ZodEnum<{
                tests: "tests";
                "informational-reference": "informational-reference";
            }>;
        }, z.core.$strict>;
        artifact_digests: z.ZodArray<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"certification_receipt">;
        certification_receipt_digest: z.ZodString;
    }, z.core.$strict>], "kind">>;
    note: z.ZodOptional<z.ZodString>;
    blocker: z.ZodOptional<z.ZodObject<{
        signal_code: z.ZodString;
        code: z.ZodString;
        explanation: z.ZodString;
    }, z.core.$strict>>;
    remediation: z.ZodOptional<z.ZodObject<{
        signal_code: z.ZodString;
        code: z.ZodString;
        instruction: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessStageProjectionSchema: z.ZodObject<{
    stage: z.ZodEnum<{
        evaluate: "evaluate";
        sign_up: "sign_up";
        pay: "pay";
        provision: "provision";
        operate: "operate";
    }>;
    stage_label: z.ZodString;
    outcome: z.ZodEnum<{
        unknown: "unknown";
        not_applicable: "not_applicable";
        pass: "pass";
        constrained: "constrained";
        fail: "fail";
    }>;
    public_state: z.ZodEnum<{
        unknown: "unknown";
        not_applicable: "not_applicable";
        ready: "ready";
        limited: "limited";
        blocked: "blocked";
    }>;
    state_label: z.ZodString;
    primary_finding: z.ZodObject<{
        signal_code: z.ZodString;
        condition: z.ZodString;
        finding: z.ZodString;
        context: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    secondary_context: z.ZodArray<z.ZodObject<{
        signal_code: z.ZodString;
        condition: z.ZodString;
        finding: z.ZodString;
        context: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    signals: z.ZodArray<z.ZodObject<{
        signal_code: z.ZodString;
        evaluation_role: z.ZodEnum<{
            graded: "graded";
            barrier: "barrier";
            informational: "informational";
        }>;
        required: z.ZodBoolean;
        value: z.ZodEnum<{
            unknown: "unknown";
            yes: "yes";
            no: "no";
            partial: "partial";
            not_applicable: "not_applicable";
        }>;
        value_label: z.ZodString;
        outcome: z.ZodEnum<{
            unknown: "unknown";
            not_applicable: "not_applicable";
            pass: "pass";
            constrained: "constrained";
            fail: "fail";
        }>;
        public_state: z.ZodEnum<{
            unknown: "unknown";
            not_applicable: "not_applicable";
            ready: "ready";
            limited: "limited";
            blocked: "blocked";
        }>;
        condition: z.ZodString;
        finding: z.ZodString;
        evidence_status: z.ZodEnum<{
            supported: "supported";
            contradicted: "contradicted";
            mixed: "mixed";
            missing: "missing";
        }>;
        freshness: z.ZodEnum<{
            unknown: "unknown";
            fresh: "fresh";
            stale: "stale";
        }>;
        observed_at: z.ZodOptional<z.ZodISODateTime>;
        tested_surfaces: z.ZodArray<z.ZodObject<{
            node_kind: z.ZodEnum<{
                resource: "resource";
                endpoint: "endpoint";
                interface: "interface";
                surface_exclusion: "surface_exclusion";
            }>;
            node_id: z.ZodString;
        }, z.core.$strict>>;
        assessment_method: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            version: z.ZodString;
            method_digest: z.ZodString;
        }, z.core.$strict>>;
        determination_bases: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            locators: z.ZodArray<z.ZodObject<{
                artifact_digest: z.ZodString;
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
            }, z.core.$strict>>;
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    http: "http";
                    headless: "headless";
                    archive: "archive";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"direct_observation">;
        }, z.core.$strict>, z.ZodObject<{
            coverage_scope: z.ZodEnum<{
                exact_resource: "exact_resource";
                tested_surfaces: "tested_surfaces";
                exact_funnel: "exact_funnel";
            }>;
            covered_surfaces: z.ZodArray<z.ZodObject<{
                node_kind: z.ZodEnum<{
                    resource: "resource";
                    endpoint: "endpoint";
                    interface: "interface";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>>;
            covered_branches: z.ZodNumber;
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    http: "http";
                    headless: "headless";
                    archive: "archive";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"bounded_absence">;
        }, z.core.$strict>, z.ZodObject<{
            source_surface: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    resource: "resource";
                    endpoint: "endpoint";
                    interface: "interface";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>;
            locators: z.ZodArray<z.ZodObject<{
                artifact_digest: z.ZodString;
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
            }, z.core.$strict>>;
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    http: "http";
                    headless: "headless";
                    archive: "archive";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"explicit_first_party_declaration">;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"standard_requirement">;
            adapter_digest: z.ZodString;
            evidence_record_digest: z.ZodString;
            requirement: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
                requirement_id: z.ZodString;
                relation: z.ZodEnum<{
                    tests: "tests";
                    "informational-reference": "informational-reference";
                }>;
            }, z.core.$strict>;
            artifact_digests: z.ZodArray<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"certification_receipt">;
            certification_receipt_digest: z.ZodString;
        }, z.core.$strict>], "kind">>;
        note: z.ZodOptional<z.ZodString>;
        blocker: z.ZodOptional<z.ZodObject<{
            signal_code: z.ZodString;
            code: z.ZodString;
            explanation: z.ZodString;
        }, z.core.$strict>>;
        remediation: z.ZodOptional<z.ZodObject<{
            signal_code: z.ZodString;
            code: z.ZodString;
            instruction: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    blockers: z.ZodArray<z.ZodObject<{
        signal_code: z.ZodString;
        code: z.ZodString;
        explanation: z.ZodString;
    }, z.core.$strict>>;
    remediations: z.ZodArray<z.ZodObject<{
        signal_code: z.ZodString;
        code: z.ZodString;
        instruction: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessPublicationVisibilitySchema: z.ZodEnum<{
    discoverable: "discoverable";
    resolvable_only: "resolvable_only";
    private: "private";
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
        funnel: z.ZodObject<{
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
        provenance: z.ZodObject<{
            repository: z.ZodLiteral<"sourcey/agent-ready-services">;
            commit: z.ZodString;
            path: z.ZodString;
            git_blob_oid: z.ZodString;
            blob_digest: z.ZodString;
        }, z.core.$strict>;
        status: z.ZodEnum<{
            community_declared: "community_declared";
            entity_attested: "entity_attested";
        }>;
    }, z.core.$strict>], "status">;
    surface_catalog: z.ZodObject<{
        assessment_targets: z.ZodArray<z.ZodObject<{
            target_id: z.ZodString;
            name: z.ZodString;
            interface_ids: z.ZodArray<z.ZodString>;
        }, z.core.$strict>>;
        participants: z.ZodArray<z.ZodObject<{
            participant_id: z.ZodString;
            roles: z.ZodArray<z.ZodEnum<{
                subject: "subject";
                access_operator: "access_operator";
                identity_provider: "identity_provider";
                payment_provider: "payment_provider";
                provisioning_provider: "provisioning_provider";
                operations_provider: "operations_provider";
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
                policy: "policy";
                discovery: "discovery";
                status: "status";
                pricing: "pricing";
                eligibility: "eligibility";
                access: "access";
                terms: "terms";
                checkout: "checkout";
                provisioning: "provisioning";
                operations: "operations";
                recovery: "recovery";
                authentication: "authentication";
                descriptor: "descriptor";
                documentation: "documentation";
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
                http: "http";
                websocket: "websocket";
                grpc: "grpc";
            }>;
            roles: z.ZodArray<z.ZodEnum<{
                status: "status";
                service: "service";
                checkout: "checkout";
                recovery: "recovery";
                authorization: "authorization";
                token: "token";
                registration: "registration";
                protected_resource: "protected_resource";
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
                web_application: "web_application";
                network_api: "network_api";
                command_line: "command_line";
                software_library: "software_library";
                tool_server: "tool_server";
                agent_service: "agent_service";
            }>;
            functions: z.ZodArray<z.ZodEnum<{
                events: "events";
                recovery: "recovery";
                authentication: "authentication";
                service_operation: "service_operation";
                commerce: "commerce";
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
                describes: "describes";
                authenticates: "authenticates";
                requires: "requires";
                alternative_to: "alternative_to";
                precedes: "precedes";
            }>;
            from: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    resource: "resource";
                    endpoint: "endpoint";
                    interface: "interface";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>;
            to: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    resource: "resource";
                    endpoint: "endpoint";
                    interface: "interface";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
        surface_exclusions: z.ZodArray<z.ZodObject<{
            exclusion_id: z.ZodString;
            role: z.ZodEnum<{
                policy: "policy";
                discovery: "discovery";
                status: "status";
                pricing: "pricing";
                eligibility: "eligibility";
                access: "access";
                terms: "terms";
                checkout: "checkout";
                provisioning: "provisioning";
                operations: "operations";
                recovery: "recovery";
                authentication: "authentication";
                descriptor: "descriptor";
                documentation: "documentation";
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
    assessment_basis: z.ZodObject<{
        principal: z.ZodLiteral<"authorized_human_or_organization">;
        initial_state: z.ZodObject<{
            product_specific_account: z.ZodLiteral<false>;
            product_credentials: z.ZodLiteral<false>;
            paid_subscription: z.ZodLiteral<false>;
            provisioned_resource: z.ZodLiteral<false>;
            external_identity: z.ZodLiteral<"only_when_declared_by_exact_funnel">;
        }, z.core.$strict>;
        permitted_human_boundaries: z.ZodArray<z.ZodEnum<{
            account_ownership_confirmation: "account_ownership_confirmation";
            delegated_identity_consent: "delegated_identity_consent";
            regulated_approval: "regulated_approval";
            final_payment_or_irreversible_commitment: "final_payment_or_irreversible_commitment";
        }>>;
        required_handoff_properties: z.ZodArray<z.ZodEnum<{
            exact_disclosure: "exact_disclosure";
            resumable_handoff: "resumable_handoff";
            deterministic_continuation: "deterministic_continuation";
        }>>;
        forbidden_substitutions: z.ZodArray<z.ZodEnum<{
            captcha_solving: "captcha_solving";
            human_password_or_session_sharing: "human_password_or_session_sharing";
            concealed_agent_identity: "concealed_agent_identity";
            invented_eligibility: "invented_eligibility";
            unbound_out_of_band_code: "unbound_out_of_band_code";
            vendor_policy_bypass: "vendor_policy_bypass";
            unapproved_consequential_action: "unapproved_consequential_action";
        }>>;
        success: z.ZodObject<{
            target_coverage: z.ZodLiteral<"every_declared_target">;
            interface_coverage: z.ZodLiteral<"at_least_one_declared_alternative">;
            authority: z.ZodLiteral<"scoped">;
            failure_semantics: z.ZodLiteral<"documented">;
            recovery: z.ZodLiteral<"supported">;
        }, z.core.$strict>;
        observed_assessment: z.ZodObject<{
            allowed_sources: z.ZodArray<z.ZodEnum<{
                public_documentation: "public_documentation";
                public_metadata: "public_metadata";
                public_endpoints: "public_endpoints";
                non_mutating_interaction: "non_mutating_interaction";
                operator_attested_public_observation: "operator_attested_public_observation";
            }>>;
            consequential_claims: z.ZodLiteral<"certification_required">;
        }, z.core.$strict>;
    }, z.core.$strict>;
    overall_outcome: z.ZodEnum<{
        unknown: "unknown";
        not_applicable: "not_applicable";
        pass: "pass";
        constrained: "constrained";
        fail: "fail";
    }>;
    public_state: z.ZodEnum<{
        unknown: "unknown";
        not_applicable: "not_applicable";
        ready: "ready";
        limited: "limited";
        blocked: "blocked";
    }>;
    state_label: z.ZodString;
    grade: z.ZodEnum<{
        "A+": "A+";
        A: "A";
        "B+": "B+";
        B: "B";
        "C+": "C+";
        C: "C";
        D: "D";
        F: "F";
        unrated: "unrated";
    }>;
    grade_derivation: z.ZodObject<{
        label: z.ZodString;
        explanation: z.ZodString;
        coverage_rule: z.ZodString;
        outcome_rule: z.ZodString;
    }, z.core.$strict>;
    publication: z.ZodObject<{
        visibility: z.ZodEnum<{
            discoverable: "discoverable";
            resolvable_only: "resolvable_only";
            private: "private";
        }>;
        reasons: z.ZodArray<z.ZodEnum<{
            unrated: "unrated";
            lifecycle_not_active: "lifecycle_not_active";
            coverage_incomplete: "coverage_incomplete";
            required_evidence_not_supported: "required_evidence_not_supported";
            freshness_not_fresh: "freshness_not_fresh";
            no_useful_finding: "no_useful_finding";
            open_dispute: "open_dispute";
        }>>;
    }, z.core.$strict>;
    primary_finding: z.ZodOptional<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        stage_label: z.ZodString;
        public_state: z.ZodEnum<{
            limited: "limited";
            blocked: "blocked";
        }>;
        finding: z.ZodObject<{
            signal_code: z.ZodString;
            condition: z.ZodString;
            finding: z.ZodString;
            context: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        blocker: z.ZodOptional<z.ZodObject<{
            signal_code: z.ZodString;
            code: z.ZodString;
            explanation: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    first_blocked_stage: z.ZodOptional<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        stage_label: z.ZodString;
        finding: z.ZodObject<{
            signal_code: z.ZodString;
            condition: z.ZodString;
            finding: z.ZodString;
            context: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        blocker: z.ZodOptional<z.ZodObject<{
            signal_code: z.ZodString;
            code: z.ZodString;
            explanation: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    limitations: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        stage_label: z.ZodString;
        finding: z.ZodObject<{
            signal_code: z.ZodString;
            condition: z.ZodString;
            finding: z.ZodString;
            context: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        remediation: z.ZodOptional<z.ZodObject<{
            signal_code: z.ZodString;
            code: z.ZodString;
            instruction: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    stages: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        stage_label: z.ZodString;
        outcome: z.ZodEnum<{
            unknown: "unknown";
            not_applicable: "not_applicable";
            pass: "pass";
            constrained: "constrained";
            fail: "fail";
        }>;
        public_state: z.ZodEnum<{
            unknown: "unknown";
            not_applicable: "not_applicable";
            ready: "ready";
            limited: "limited";
            blocked: "blocked";
        }>;
        state_label: z.ZodString;
        primary_finding: z.ZodObject<{
            signal_code: z.ZodString;
            condition: z.ZodString;
            finding: z.ZodString;
            context: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        secondary_context: z.ZodArray<z.ZodObject<{
            signal_code: z.ZodString;
            condition: z.ZodString;
            finding: z.ZodString;
            context: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
        signals: z.ZodArray<z.ZodObject<{
            signal_code: z.ZodString;
            evaluation_role: z.ZodEnum<{
                graded: "graded";
                barrier: "barrier";
                informational: "informational";
            }>;
            required: z.ZodBoolean;
            value: z.ZodEnum<{
                unknown: "unknown";
                yes: "yes";
                no: "no";
                partial: "partial";
                not_applicable: "not_applicable";
            }>;
            value_label: z.ZodString;
            outcome: z.ZodEnum<{
                unknown: "unknown";
                not_applicable: "not_applicable";
                pass: "pass";
                constrained: "constrained";
                fail: "fail";
            }>;
            public_state: z.ZodEnum<{
                unknown: "unknown";
                not_applicable: "not_applicable";
                ready: "ready";
                limited: "limited";
                blocked: "blocked";
            }>;
            condition: z.ZodString;
            finding: z.ZodString;
            evidence_status: z.ZodEnum<{
                supported: "supported";
                contradicted: "contradicted";
                mixed: "mixed";
                missing: "missing";
            }>;
            freshness: z.ZodEnum<{
                unknown: "unknown";
                fresh: "fresh";
                stale: "stale";
            }>;
            observed_at: z.ZodOptional<z.ZodISODateTime>;
            tested_surfaces: z.ZodArray<z.ZodObject<{
                node_kind: z.ZodEnum<{
                    resource: "resource";
                    endpoint: "endpoint";
                    interface: "interface";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>>;
            assessment_method: z.ZodOptional<z.ZodObject<{
                name: z.ZodString;
                version: z.ZodString;
                method_digest: z.ZodString;
            }, z.core.$strict>>;
            determination_bases: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                locators: z.ZodArray<z.ZodObject<{
                    artifact_digest: z.ZodString;
                    start_byte: z.ZodNumber;
                    end_byte: z.ZodNumber;
                    value_digest: z.ZodString;
                }, z.core.$strict>>;
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        http: "http";
                        headless: "headless";
                        archive: "archive";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"direct_observation">;
            }, z.core.$strict>, z.ZodObject<{
                coverage_scope: z.ZodEnum<{
                    exact_resource: "exact_resource";
                    tested_surfaces: "tested_surfaces";
                    exact_funnel: "exact_funnel";
                }>;
                covered_surfaces: z.ZodArray<z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        resource: "resource";
                        endpoint: "endpoint";
                        interface: "interface";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>>;
                covered_branches: z.ZodNumber;
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        http: "http";
                        headless: "headless";
                        archive: "archive";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"bounded_absence">;
            }, z.core.$strict>, z.ZodObject<{
                source_surface: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        resource: "resource";
                        endpoint: "endpoint";
                        interface: "interface";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>;
                locators: z.ZodArray<z.ZodObject<{
                    artifact_digest: z.ZodString;
                    start_byte: z.ZodNumber;
                    end_byte: z.ZodNumber;
                    value_digest: z.ZodString;
                }, z.core.$strict>>;
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        http: "http";
                        headless: "headless";
                        archive: "archive";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"explicit_first_party_declaration">;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"standard_requirement">;
                adapter_digest: z.ZodString;
                evidence_record_digest: z.ZodString;
                requirement: z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                    requirement_id: z.ZodString;
                    relation: z.ZodEnum<{
                        tests: "tests";
                        "informational-reference": "informational-reference";
                    }>;
                }, z.core.$strict>;
                artifact_digests: z.ZodArray<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"certification_receipt">;
                certification_receipt_digest: z.ZodString;
            }, z.core.$strict>], "kind">>;
            note: z.ZodOptional<z.ZodString>;
            blocker: z.ZodOptional<z.ZodObject<{
                signal_code: z.ZodString;
                code: z.ZodString;
                explanation: z.ZodString;
            }, z.core.$strict>>;
            remediation: z.ZodOptional<z.ZodObject<{
                signal_code: z.ZodString;
                code: z.ZodString;
                instruction: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        blockers: z.ZodArray<z.ZodObject<{
            signal_code: z.ZodString;
            code: z.ZodString;
            explanation: z.ZodString;
        }, z.core.$strict>>;
        remediations: z.ZodArray<z.ZodObject<{
            signal_code: z.ZodString;
            code: z.ZodString;
            instruction: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    coverage: z.ZodObject<{
        status: z.ZodEnum<{
            incomplete: "incomplete";
            complete: "complete";
        }>;
        required_signals: z.ZodNumber;
        covered_signals: z.ZodNumber;
        ratio: z.ZodNumber;
        barrier_signals: z.ZodNumber;
        verified_barrier_signals: z.ZodNumber;
        barrier_ratio: z.ZodNumber;
    }, z.core.$strict>;
    last_tested_at: z.ZodISODateTime;
    freshness: z.ZodEnum<{
        unknown: "unknown";
        fresh: "fresh";
        stale: "stale";
    }>;
    provenance: z.ZodObject<{
        freshness: z.ZodEnum<{
            unknown: "unknown";
            fresh: "fresh";
            stale: "stale";
        }>;
        dispute: z.ZodEnum<{
            none: "none";
            open: "open";
            resolved: "resolved";
        }>;
        coverage_policy_digest: z.ZodString;
        freshness_policy_digest: z.ZodString;
        basis_event_ids: z.ZodArray<z.ZodString>;
        fields: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            supporting_event_ids: z.ZodArray<z.ZodString>;
            contradicting_event_ids: z.ZodArray<z.ZodString>;
            accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                observed: "observed";
                derived: "derived";
                editorial: "editorial";
                attested: "attested";
            }>>;
            evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                observed: "observed";
                derived: "derived";
                editorial: "editorial";
                attested: "attested";
            }>>;
            latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
            freshness: z.ZodEnum<{
                unknown: "unknown";
                fresh: "fresh";
                stale: "stale";
            }>;
        }, z.core.$strict>>;
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
        funnel: z.ZodObject<{
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
        provenance: z.ZodObject<{
            repository: z.ZodLiteral<"sourcey/agent-ready-services">;
            commit: z.ZodString;
            path: z.ZodString;
            git_blob_oid: z.ZodString;
            blob_digest: z.ZodString;
        }, z.core.$strict>;
        status: z.ZodEnum<{
            community_declared: "community_declared";
            entity_attested: "entity_attested";
        }>;
    }, z.core.$strict>], "status">;
    surface_catalog: z.ZodObject<{
        assessment_targets: z.ZodArray<z.ZodObject<{
            target_id: z.ZodString;
            name: z.ZodString;
            interface_ids: z.ZodArray<z.ZodString>;
        }, z.core.$strict>>;
        participants: z.ZodArray<z.ZodObject<{
            participant_id: z.ZodString;
            roles: z.ZodArray<z.ZodEnum<{
                subject: "subject";
                access_operator: "access_operator";
                identity_provider: "identity_provider";
                payment_provider: "payment_provider";
                provisioning_provider: "provisioning_provider";
                operations_provider: "operations_provider";
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
                policy: "policy";
                discovery: "discovery";
                status: "status";
                pricing: "pricing";
                eligibility: "eligibility";
                access: "access";
                terms: "terms";
                checkout: "checkout";
                provisioning: "provisioning";
                operations: "operations";
                recovery: "recovery";
                authentication: "authentication";
                descriptor: "descriptor";
                documentation: "documentation";
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
                http: "http";
                websocket: "websocket";
                grpc: "grpc";
            }>;
            roles: z.ZodArray<z.ZodEnum<{
                status: "status";
                service: "service";
                checkout: "checkout";
                recovery: "recovery";
                authorization: "authorization";
                token: "token";
                registration: "registration";
                protected_resource: "protected_resource";
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
                web_application: "web_application";
                network_api: "network_api";
                command_line: "command_line";
                software_library: "software_library";
                tool_server: "tool_server";
                agent_service: "agent_service";
            }>;
            functions: z.ZodArray<z.ZodEnum<{
                events: "events";
                recovery: "recovery";
                authentication: "authentication";
                service_operation: "service_operation";
                commerce: "commerce";
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
                describes: "describes";
                authenticates: "authenticates";
                requires: "requires";
                alternative_to: "alternative_to";
                precedes: "precedes";
            }>;
            from: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    resource: "resource";
                    endpoint: "endpoint";
                    interface: "interface";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>;
            to: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    resource: "resource";
                    endpoint: "endpoint";
                    interface: "interface";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
        surface_exclusions: z.ZodArray<z.ZodObject<{
            exclusion_id: z.ZodString;
            role: z.ZodEnum<{
                policy: "policy";
                discovery: "discovery";
                status: "status";
                pricing: "pricing";
                eligibility: "eligibility";
                access: "access";
                terms: "terms";
                checkout: "checkout";
                provisioning: "provisioning";
                operations: "operations";
                recovery: "recovery";
                authentication: "authentication";
                descriptor: "descriptor";
                documentation: "documentation";
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
    assessment_basis: z.ZodObject<{
        principal: z.ZodLiteral<"authorized_human_or_organization">;
        initial_state: z.ZodObject<{
            product_specific_account: z.ZodLiteral<false>;
            product_credentials: z.ZodLiteral<false>;
            paid_subscription: z.ZodLiteral<false>;
            provisioned_resource: z.ZodLiteral<false>;
            external_identity: z.ZodLiteral<"only_when_declared_by_exact_funnel">;
        }, z.core.$strict>;
        permitted_human_boundaries: z.ZodArray<z.ZodEnum<{
            account_ownership_confirmation: "account_ownership_confirmation";
            delegated_identity_consent: "delegated_identity_consent";
            regulated_approval: "regulated_approval";
            final_payment_or_irreversible_commitment: "final_payment_or_irreversible_commitment";
        }>>;
        required_handoff_properties: z.ZodArray<z.ZodEnum<{
            exact_disclosure: "exact_disclosure";
            resumable_handoff: "resumable_handoff";
            deterministic_continuation: "deterministic_continuation";
        }>>;
        forbidden_substitutions: z.ZodArray<z.ZodEnum<{
            captcha_solving: "captcha_solving";
            human_password_or_session_sharing: "human_password_or_session_sharing";
            concealed_agent_identity: "concealed_agent_identity";
            invented_eligibility: "invented_eligibility";
            unbound_out_of_band_code: "unbound_out_of_band_code";
            vendor_policy_bypass: "vendor_policy_bypass";
            unapproved_consequential_action: "unapproved_consequential_action";
        }>>;
        success: z.ZodObject<{
            target_coverage: z.ZodLiteral<"every_declared_target">;
            interface_coverage: z.ZodLiteral<"at_least_one_declared_alternative">;
            authority: z.ZodLiteral<"scoped">;
            failure_semantics: z.ZodLiteral<"documented">;
            recovery: z.ZodLiteral<"supported">;
        }, z.core.$strict>;
        observed_assessment: z.ZodObject<{
            allowed_sources: z.ZodArray<z.ZodEnum<{
                public_documentation: "public_documentation";
                public_metadata: "public_metadata";
                public_endpoints: "public_endpoints";
                non_mutating_interaction: "non_mutating_interaction";
                operator_attested_public_observation: "operator_attested_public_observation";
            }>>;
            consequential_claims: z.ZodLiteral<"certification_required">;
        }, z.core.$strict>;
    }, z.core.$strict>;
    overall_outcome: z.ZodEnum<{
        unknown: "unknown";
        not_applicable: "not_applicable";
        pass: "pass";
        constrained: "constrained";
        fail: "fail";
    }>;
    public_state: z.ZodEnum<{
        unknown: "unknown";
        not_applicable: "not_applicable";
        ready: "ready";
        limited: "limited";
        blocked: "blocked";
    }>;
    state_label: z.ZodString;
    grade: z.ZodEnum<{
        "A+": "A+";
        A: "A";
        "B+": "B+";
        B: "B";
        "C+": "C+";
        C: "C";
        D: "D";
        F: "F";
        unrated: "unrated";
    }>;
    grade_derivation: z.ZodObject<{
        label: z.ZodString;
        explanation: z.ZodString;
        coverage_rule: z.ZodString;
        outcome_rule: z.ZodString;
    }, z.core.$strict>;
    publication: z.ZodObject<{
        visibility: z.ZodEnum<{
            discoverable: "discoverable";
            resolvable_only: "resolvable_only";
            private: "private";
        }>;
        reasons: z.ZodArray<z.ZodEnum<{
            unrated: "unrated";
            lifecycle_not_active: "lifecycle_not_active";
            coverage_incomplete: "coverage_incomplete";
            required_evidence_not_supported: "required_evidence_not_supported";
            freshness_not_fresh: "freshness_not_fresh";
            no_useful_finding: "no_useful_finding";
            open_dispute: "open_dispute";
        }>>;
    }, z.core.$strict>;
    primary_finding: z.ZodOptional<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        stage_label: z.ZodString;
        public_state: z.ZodEnum<{
            limited: "limited";
            blocked: "blocked";
        }>;
        finding: z.ZodObject<{
            signal_code: z.ZodString;
            condition: z.ZodString;
            finding: z.ZodString;
            context: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        blocker: z.ZodOptional<z.ZodObject<{
            signal_code: z.ZodString;
            code: z.ZodString;
            explanation: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    first_blocked_stage: z.ZodOptional<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        stage_label: z.ZodString;
        finding: z.ZodObject<{
            signal_code: z.ZodString;
            condition: z.ZodString;
            finding: z.ZodString;
            context: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        blocker: z.ZodOptional<z.ZodObject<{
            signal_code: z.ZodString;
            code: z.ZodString;
            explanation: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    limitations: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        stage_label: z.ZodString;
        finding: z.ZodObject<{
            signal_code: z.ZodString;
            condition: z.ZodString;
            finding: z.ZodString;
            context: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        remediation: z.ZodOptional<z.ZodObject<{
            signal_code: z.ZodString;
            code: z.ZodString;
            instruction: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    stages: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        stage_label: z.ZodString;
        outcome: z.ZodEnum<{
            unknown: "unknown";
            not_applicable: "not_applicable";
            pass: "pass";
            constrained: "constrained";
            fail: "fail";
        }>;
        public_state: z.ZodEnum<{
            unknown: "unknown";
            not_applicable: "not_applicable";
            ready: "ready";
            limited: "limited";
            blocked: "blocked";
        }>;
        state_label: z.ZodString;
        primary_finding: z.ZodObject<{
            signal_code: z.ZodString;
            condition: z.ZodString;
            finding: z.ZodString;
            context: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        secondary_context: z.ZodArray<z.ZodObject<{
            signal_code: z.ZodString;
            condition: z.ZodString;
            finding: z.ZodString;
            context: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
        signals: z.ZodArray<z.ZodObject<{
            signal_code: z.ZodString;
            evaluation_role: z.ZodEnum<{
                graded: "graded";
                barrier: "barrier";
                informational: "informational";
            }>;
            required: z.ZodBoolean;
            value: z.ZodEnum<{
                unknown: "unknown";
                yes: "yes";
                no: "no";
                partial: "partial";
                not_applicable: "not_applicable";
            }>;
            value_label: z.ZodString;
            outcome: z.ZodEnum<{
                unknown: "unknown";
                not_applicable: "not_applicable";
                pass: "pass";
                constrained: "constrained";
                fail: "fail";
            }>;
            public_state: z.ZodEnum<{
                unknown: "unknown";
                not_applicable: "not_applicable";
                ready: "ready";
                limited: "limited";
                blocked: "blocked";
            }>;
            condition: z.ZodString;
            finding: z.ZodString;
            evidence_status: z.ZodEnum<{
                supported: "supported";
                contradicted: "contradicted";
                mixed: "mixed";
                missing: "missing";
            }>;
            freshness: z.ZodEnum<{
                unknown: "unknown";
                fresh: "fresh";
                stale: "stale";
            }>;
            observed_at: z.ZodOptional<z.ZodISODateTime>;
            tested_surfaces: z.ZodArray<z.ZodObject<{
                node_kind: z.ZodEnum<{
                    resource: "resource";
                    endpoint: "endpoint";
                    interface: "interface";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>>;
            assessment_method: z.ZodOptional<z.ZodObject<{
                name: z.ZodString;
                version: z.ZodString;
                method_digest: z.ZodString;
            }, z.core.$strict>>;
            determination_bases: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                locators: z.ZodArray<z.ZodObject<{
                    artifact_digest: z.ZodString;
                    start_byte: z.ZodNumber;
                    end_byte: z.ZodNumber;
                    value_digest: z.ZodString;
                }, z.core.$strict>>;
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        http: "http";
                        headless: "headless";
                        archive: "archive";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"direct_observation">;
            }, z.core.$strict>, z.ZodObject<{
                coverage_scope: z.ZodEnum<{
                    exact_resource: "exact_resource";
                    tested_surfaces: "tested_surfaces";
                    exact_funnel: "exact_funnel";
                }>;
                covered_surfaces: z.ZodArray<z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        resource: "resource";
                        endpoint: "endpoint";
                        interface: "interface";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>>;
                covered_branches: z.ZodNumber;
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        http: "http";
                        headless: "headless";
                        archive: "archive";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"bounded_absence">;
            }, z.core.$strict>, z.ZodObject<{
                source_surface: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        resource: "resource";
                        endpoint: "endpoint";
                        interface: "interface";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>;
                locators: z.ZodArray<z.ZodObject<{
                    artifact_digest: z.ZodString;
                    start_byte: z.ZodNumber;
                    end_byte: z.ZodNumber;
                    value_digest: z.ZodString;
                }, z.core.$strict>>;
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        http: "http";
                        headless: "headless";
                        archive: "archive";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"explicit_first_party_declaration">;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"standard_requirement">;
                adapter_digest: z.ZodString;
                evidence_record_digest: z.ZodString;
                requirement: z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                    requirement_id: z.ZodString;
                    relation: z.ZodEnum<{
                        tests: "tests";
                        "informational-reference": "informational-reference";
                    }>;
                }, z.core.$strict>;
                artifact_digests: z.ZodArray<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"certification_receipt">;
                certification_receipt_digest: z.ZodString;
            }, z.core.$strict>], "kind">>;
            note: z.ZodOptional<z.ZodString>;
            blocker: z.ZodOptional<z.ZodObject<{
                signal_code: z.ZodString;
                code: z.ZodString;
                explanation: z.ZodString;
            }, z.core.$strict>>;
            remediation: z.ZodOptional<z.ZodObject<{
                signal_code: z.ZodString;
                code: z.ZodString;
                instruction: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        blockers: z.ZodArray<z.ZodObject<{
            signal_code: z.ZodString;
            code: z.ZodString;
            explanation: z.ZodString;
        }, z.core.$strict>>;
        remediations: z.ZodArray<z.ZodObject<{
            signal_code: z.ZodString;
            code: z.ZodString;
            instruction: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    coverage: z.ZodObject<{
        status: z.ZodEnum<{
            incomplete: "incomplete";
            complete: "complete";
        }>;
        required_signals: z.ZodNumber;
        covered_signals: z.ZodNumber;
        ratio: z.ZodNumber;
        barrier_signals: z.ZodNumber;
        verified_barrier_signals: z.ZodNumber;
        barrier_ratio: z.ZodNumber;
    }, z.core.$strict>;
    last_tested_at: z.ZodISODateTime;
    freshness: z.ZodEnum<{
        unknown: "unknown";
        fresh: "fresh";
        stale: "stale";
    }>;
    provenance: z.ZodObject<{
        freshness: z.ZodEnum<{
            unknown: "unknown";
            fresh: "fresh";
            stale: "stale";
        }>;
        dispute: z.ZodEnum<{
            none: "none";
            open: "open";
            resolved: "resolved";
        }>;
        coverage_policy_digest: z.ZodString;
        freshness_policy_digest: z.ZodString;
        basis_event_ids: z.ZodArray<z.ZodString>;
        fields: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            supporting_event_ids: z.ZodArray<z.ZodString>;
            contradicting_event_ids: z.ZodArray<z.ZodString>;
            accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                observed: "observed";
                derived: "derived";
                editorial: "editorial";
                attested: "attested";
            }>>;
            evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                observed: "observed";
                derived: "derived";
                editorial: "editorial";
                attested: "attested";
            }>>;
            latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
            freshness: z.ZodEnum<{
                unknown: "unknown";
                fresh: "fresh";
                stale: "stale";
            }>;
        }, z.core.$strict>>;
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
export declare const agentReadinessStageSummarySchema: z.ZodObject<{
    outcome: z.ZodEnum<{
        unknown: "unknown";
        not_applicable: "not_applicable";
        pass: "pass";
        constrained: "constrained";
        fail: "fail";
    }>;
    stage: z.ZodEnum<{
        evaluate: "evaluate";
        sign_up: "sign_up";
        pay: "pay";
        provision: "provision";
        operate: "operate";
    }>;
    public_state: z.ZodEnum<{
        unknown: "unknown";
        not_applicable: "not_applicable";
        ready: "ready";
        limited: "limited";
        blocked: "blocked";
    }>;
    primary_finding: z.ZodObject<{
        signal_code: z.ZodString;
        condition: z.ZodString;
        finding: z.ZodString;
        context: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    stage_label: z.ZodString;
    state_label: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessProvenanceSummarySchema: z.ZodObject<{
    freshness: z.ZodEnum<{
        unknown: "unknown";
        fresh: "fresh";
        stale: "stale";
    }>;
    dispute: z.ZodEnum<{
        none: "none";
        open: "open";
        resolved: "resolved";
    }>;
    vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"none">;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"current">;
        event_id: z.ZodString;
        attested_at: z.ZodISODateTime;
    }, z.core.$strict>], "status">;
}, z.core.$strict>;
export declare const agentReadinessProfileSummarySchema: z.ZodObject<{
    policy_digest: z.ZodString;
    entity_id: z.ZodString;
    effective_from: z.ZodISODateTime;
    revision_digest: z.ZodString;
    agent_readiness_profile_id: z.ZodString;
    scope: z.ZodObject<{
        product: z.ZodObject<{
            key: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>;
        funnel: z.ZodObject<{
            key: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>;
    coverage: z.ZodObject<{
        status: z.ZodEnum<{
            incomplete: "incomplete";
            complete: "complete";
        }>;
        required_signals: z.ZodNumber;
        covered_signals: z.ZodNumber;
        ratio: z.ZodNumber;
        barrier_signals: z.ZodNumber;
        verified_barrier_signals: z.ZodNumber;
        barrier_ratio: z.ZodNumber;
    }, z.core.$strict>;
    lifecycle: z.ZodEnum<{
        active: "active";
        ended: "ended";
        withdrawn: "withdrawn";
    }>;
    freshness: z.ZodEnum<{
        unknown: "unknown";
        fresh: "fresh";
        stale: "stale";
    }>;
    policy_as_of: z.ZodISODateTime;
    projection_digest: z.ZodString;
    declaration_revision_digest: z.ZodString;
    policy_version: z.ZodString;
    grade_derivation: z.ZodObject<{
        label: z.ZodString;
        explanation: z.ZodString;
        coverage_rule: z.ZodString;
        outcome_rule: z.ZodString;
    }, z.core.$strict>;
    public_state: z.ZodEnum<{
        unknown: "unknown";
        not_applicable: "not_applicable";
        ready: "ready";
        limited: "limited";
        blocked: "blocked";
    }>;
    primary_finding: z.ZodOptional<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        stage_label: z.ZodString;
        public_state: z.ZodEnum<{
            limited: "limited";
            blocked: "blocked";
        }>;
        finding: z.ZodObject<{
            signal_code: z.ZodString;
            condition: z.ZodString;
            finding: z.ZodString;
            context: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        blocker: z.ZodOptional<z.ZodObject<{
            signal_code: z.ZodString;
            code: z.ZodString;
            explanation: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    state_label: z.ZodString;
    overall_outcome: z.ZodEnum<{
        unknown: "unknown";
        not_applicable: "not_applicable";
        pass: "pass";
        constrained: "constrained";
        fail: "fail";
    }>;
    grade: z.ZodEnum<{
        "A+": "A+";
        A: "A";
        "B+": "B+";
        B: "B";
        "C+": "C+";
        C: "C";
        D: "D";
        F: "F";
        unrated: "unrated";
    }>;
    last_tested_at: z.ZodISODateTime;
    publication: z.ZodObject<{
        visibility: z.ZodEnum<{
            discoverable: "discoverable";
            resolvable_only: "resolvable_only";
            private: "private";
        }>;
        reasons: z.ZodArray<z.ZodEnum<{
            unrated: "unrated";
            lifecycle_not_active: "lifecycle_not_active";
            coverage_incomplete: "coverage_incomplete";
            required_evidence_not_supported: "required_evidence_not_supported";
            freshness_not_fresh: "freshness_not_fresh";
            no_useful_finding: "no_useful_finding";
            open_dispute: "open_dispute";
        }>>;
    }, z.core.$strict>;
    canonical_url: z.ZodURL;
    stages: z.ZodArray<z.ZodObject<{
        outcome: z.ZodEnum<{
            unknown: "unknown";
            not_applicable: "not_applicable";
            pass: "pass";
            constrained: "constrained";
            fail: "fail";
        }>;
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        public_state: z.ZodEnum<{
            unknown: "unknown";
            not_applicable: "not_applicable";
            ready: "ready";
            limited: "limited";
            blocked: "blocked";
        }>;
        primary_finding: z.ZodObject<{
            signal_code: z.ZodString;
            condition: z.ZodString;
            finding: z.ZodString;
            context: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        stage_label: z.ZodString;
        state_label: z.ZodString;
    }, z.core.$strict>>;
    provenance: z.ZodObject<{
        freshness: z.ZodEnum<{
            unknown: "unknown";
            fresh: "fresh";
            stale: "stale";
        }>;
        dispute: z.ZodEnum<{
            none: "none";
            open: "open";
            resolved: "resolved";
        }>;
        vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
            status: z.ZodLiteral<"none">;
        }, z.core.$strict>, z.ZodObject<{
            status: z.ZodLiteral<"current">;
            event_id: z.ZodString;
            attested_at: z.ZodISODateTime;
        }, z.core.$strict>], "status">;
    }, z.core.$strict>;
}, z.core.$strict>;
/** The one compact public-list projection of a complete released profile. */
export declare function summarizeAgentReadinessProfile(profile: AgentReadinessProjection): AgentReadinessProfileSummary;
/**
 * Stable identity and lineage fields for an immutable projection already admitted by a
 * previous release. Unknown fields are retained so its exact historical bytes remain
 * digest-verifiable; callers must not use this contract for current semantic reads.
 */
export declare const agentReadinessProjectionLineageSchema: z.ZodObject<{
    projection_contract: z.ZodLiteral<"sourcey.agent-readiness-projection/v1alpha1">;
    agent_readiness_profile_id: z.ZodString;
    entity_id: z.ZodString;
    scope: z.ZodObject<{
        product: z.ZodObject<{
            key: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>;
        funnel: z.ZodObject<{
            key: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>;
    lifecycle: z.ZodEnum<{
        active: "active";
        ended: "ended";
        withdrawn: "withdrawn";
    }>;
    revision_digest: z.ZodString;
    policy_digest: z.ZodString;
    policy_as_of: z.ZodISODateTime;
    publication: z.ZodObject<{
        visibility: z.ZodEnum<{
            discoverable: "discoverable";
            resolvable_only: "resolvable_only";
            private: "private";
        }>;
    }, z.core.$loose>;
    provenance: z.ZodObject<{
        freshness_policy_digest: z.ZodString;
    }, z.core.$loose>;
    canonical_url: z.ZodURL;
    projection_digest: z.ZodString;
}, z.core.$loose>;
export declare const agentReadinessOfferRelationRevisionCoreSchema: z.ZodObject<{
    relation_id: z.ZodString;
    agent_readiness_profile_id: z.ZodString;
    offer_id: z.ZodString;
    purpose: z.ZodEnum<{
        application_path: "application_path";
        redemption_path: "redemption_path";
        operating_path: "operating_path";
    }>;
    applicable_stages: z.ZodArray<z.ZodEnum<{
        evaluate: "evaluate";
        sign_up: "sign_up";
        pay: "pay";
        provision: "provision";
        operate: "operate";
    }>>;
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
        redemption_path: "redemption_path";
        operating_path: "operating_path";
    }>;
    applicable_stages: z.ZodArray<z.ZodEnum<{
        evaluate: "evaluate";
        sign_up: "sign_up";
        pay: "pay";
        provision: "provision";
        operate: "operate";
    }>>;
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
            redemption_path: "redemption_path";
            operating_path: "operating_path";
        }>;
        applicable_stages: z.ZodArray<z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>>;
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
            redemption_path: "redemption_path";
            operating_path: "operating_path";
        }>;
        applicable_stages: z.ZodArray<z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>>;
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
            redemption_path: "redemption_path";
            operating_path: "operating_path";
        }>;
        applicable_stages: z.ZodArray<z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>>;
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
            redemption_path: "redemption_path";
            operating_path: "operating_path";
        }>;
        applicable_stages: z.ZodArray<z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>>;
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
            redemption_path: "redemption_path";
            operating_path: "operating_path";
        }>;
        applicable_stages: z.ZodArray<z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>>;
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
                scope: z.ZodObject<{
                    product: z.ZodObject<{
                        key: z.ZodString;
                        name: z.ZodString;
                    }, z.core.$strict>;
                    funnel: z.ZodObject<{
                        key: z.ZodString;
                        name: z.ZodString;
                    }, z.core.$strict>;
                }, z.core.$strict>;
                resources: z.ZodArray<z.ZodObject<{
                    resource_id: z.ZodString;
                    uri: z.ZodURL;
                    roles: z.ZodArray<z.ZodEnum<{
                        policy: "policy";
                        discovery: "discovery";
                        status: "status";
                        pricing: "pricing";
                        eligibility: "eligibility";
                        access: "access";
                        terms: "terms";
                        checkout: "checkout";
                        provisioning: "provisioning";
                        operations: "operations";
                        recovery: "recovery";
                        authentication: "authentication";
                        descriptor: "descriptor";
                        documentation: "documentation";
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
                relations: z.ZodArray<z.ZodObject<{
                    relation_id: z.ZodString;
                    kind: z.ZodEnum<{
                        describes: "describes";
                        authenticates: "authenticates";
                        requires: "requires";
                        alternative_to: "alternative_to";
                        precedes: "precedes";
                    }>;
                    from: z.ZodObject<{
                        node_kind: z.ZodEnum<{
                            resource: "resource";
                            endpoint: "endpoint";
                            interface: "interface";
                            surface_exclusion: "surface_exclusion";
                        }>;
                        node_id: z.ZodString;
                    }, z.core.$strict>;
                    to: z.ZodObject<{
                        node_kind: z.ZodEnum<{
                            resource: "resource";
                            endpoint: "endpoint";
                            interface: "interface";
                            surface_exclusion: "surface_exclusion";
                        }>;
                        node_id: z.ZodString;
                    }, z.core.$strict>;
                }, z.core.$strict>>;
                declaration_id: z.ZodString;
                declared_at: z.ZodISODateTime;
                assessment_targets: z.ZodArray<z.ZodObject<{
                    target_id: z.ZodString;
                    name: z.ZodString;
                    interface_ids: z.ZodArray<z.ZodString>;
                }, z.core.$strict>>;
                participants: z.ZodArray<z.ZodObject<{
                    participant_id: z.ZodString;
                    roles: z.ZodArray<z.ZodEnum<{
                        subject: "subject";
                        access_operator: "access_operator";
                        identity_provider: "identity_provider";
                        payment_provider: "payment_provider";
                        provisioning_provider: "provisioning_provider";
                        operations_provider: "operations_provider";
                    }>>;
                    identity: z.ZodUnion<readonly [z.ZodObject<{
                        entity_id: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        origin_source_id: z.ZodString;
                    }, z.core.$strict>]>;
                }, z.core.$strict>>;
                endpoints: z.ZodArray<z.ZodObject<{
                    endpoint_id: z.ZodString;
                    uri: z.ZodURL;
                    transport: z.ZodEnum<{
                        http: "http";
                        websocket: "websocket";
                        grpc: "grpc";
                    }>;
                    roles: z.ZodArray<z.ZodEnum<{
                        status: "status";
                        service: "service";
                        checkout: "checkout";
                        recovery: "recovery";
                        authorization: "authorization";
                        token: "token";
                        registration: "registration";
                        protected_resource: "protected_resource";
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
                        web_application: "web_application";
                        network_api: "network_api";
                        command_line: "command_line";
                        software_library: "software_library";
                        tool_server: "tool_server";
                        agent_service: "agent_service";
                    }>;
                    functions: z.ZodArray<z.ZodEnum<{
                        events: "events";
                        recovery: "recovery";
                        authentication: "authentication";
                        service_operation: "service_operation";
                        commerce: "commerce";
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
                surface_exclusions: z.ZodArray<z.ZodObject<{
                    exclusion_id: z.ZodString;
                    role: z.ZodEnum<{
                        policy: "policy";
                        discovery: "discovery";
                        status: "status";
                        pricing: "pricing";
                        eligibility: "eligibility";
                        access: "access";
                        terms: "terms";
                        checkout: "checkout";
                        provisioning: "provisioning";
                        operations: "operations";
                        recovery: "recovery";
                        authentication: "authentication";
                        descriptor: "descriptor";
                        documentation: "documentation";
                    }>;
                    rationale: z.ZodString;
                }, z.core.$strict>>;
                authority_intent: z.ZodEnum<{
                    entity: "entity";
                    community: "community";
                }>;
                source_bindings: z.ZodArray<z.ZodObject<{
                    target: z.ZodObject<{
                        node_kind: z.ZodEnum<{
                            relation: "relation";
                            resource: "resource";
                            endpoint: "endpoint";
                            interface: "interface";
                            surface_exclusion: "surface_exclusion";
                            declaration: "declaration";
                            participant: "participant";
                            assessment_target: "assessment_target";
                        }>;
                        node_id: z.ZodString;
                    }, z.core.$strict>;
                    source_binding_id: z.ZodString;
                    source_id: z.ZodString;
                    field_paths: z.ZodArray<z.ZodString>;
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
                        }, z.core.$strict>], "kind">>;
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
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
                        }, z.core.$strict>], "kind">>;
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
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
                        }, z.core.$strict>], "kind">>;
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"waiver">;
                        waived_item: z.ZodString;
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
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
                        }, z.core.$strict>], "kind">>;
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"other">;
                        benefit_id: z.ZodString;
                        description: z.ZodString;
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
                        public: "public";
                        other: "other";
                        referral: "referral";
                        membership: "membership";
                        invite: "invite";
                        automatic: "automatic";
                    }>;
                    method: z.ZodEnum<{
                        code: "code";
                        other: "other";
                        automatic: "automatic";
                        form: "form";
                        contact: "contact";
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
            redemption_path: "redemption_path";
            operating_path: "operating_path";
        }>;
        applicable_stages: z.ZodArray<z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>>;
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
        evidence_bindings: z.ZodArray<z.ZodObject<{
            stage: z.ZodEnum<{
                evaluate: "evaluate";
                sign_up: "sign_up";
                pay: "pay";
                provision: "provision";
                operate: "operate";
            }>;
            signal_code: z.ZodString;
            evidence_event_ids: z.ZodArray<z.ZodString>;
            observation_ids: z.ZodArray<z.ZodString>;
        }, z.core.$strict>>;
        agent_readiness_profile_id: z.ZodString;
        entity_id: z.ZodString;
        scope: z.ZodObject<{
            product: z.ZodObject<{
                key: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
            funnel: z.ZodObject<{
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
            provenance: z.ZodObject<{
                repository: z.ZodLiteral<"sourcey/agent-ready-services">;
                commit: z.ZodString;
                path: z.ZodString;
                git_blob_oid: z.ZodString;
                blob_digest: z.ZodString;
            }, z.core.$strict>;
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
        signals: z.ZodArray<z.ZodObject<{
            stage: z.ZodEnum<{
                evaluate: "evaluate";
                sign_up: "sign_up";
                pay: "pay";
                provision: "provision";
                operate: "operate";
            }>;
            signal_code: z.ZodString;
            selector_group_id: z.ZodString;
            value: z.ZodEnum<{
                unknown: "unknown";
                yes: "yes";
                no: "no";
                partial: "partial";
                not_applicable: "not_applicable";
            }>;
            observed_at: z.ZodISODateTime;
            tested_surfaces: z.ZodArray<z.ZodObject<{
                node_kind: z.ZodEnum<{
                    resource: "resource";
                    endpoint: "endpoint";
                    interface: "interface";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>>;
            assessment_method: z.ZodObject<{
                name: z.ZodString;
                version: z.ZodString;
                method_digest: z.ZodString;
            }, z.core.$strict>;
            determination_bases: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                locators: z.ZodArray<z.ZodObject<{
                    artifact_digest: z.ZodString;
                    start_byte: z.ZodNumber;
                    end_byte: z.ZodNumber;
                    value_digest: z.ZodString;
                }, z.core.$strict>>;
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        http: "http";
                        headless: "headless";
                        archive: "archive";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"direct_observation">;
            }, z.core.$strict>, z.ZodObject<{
                coverage_scope: z.ZodEnum<{
                    exact_resource: "exact_resource";
                    tested_surfaces: "tested_surfaces";
                    exact_funnel: "exact_funnel";
                }>;
                covered_surfaces: z.ZodArray<z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        resource: "resource";
                        endpoint: "endpoint";
                        interface: "interface";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>>;
                covered_branches: z.ZodNumber;
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        http: "http";
                        headless: "headless";
                        archive: "archive";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"bounded_absence">;
            }, z.core.$strict>, z.ZodObject<{
                source_surface: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        resource: "resource";
                        endpoint: "endpoint";
                        interface: "interface";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>;
                locators: z.ZodArray<z.ZodObject<{
                    artifact_digest: z.ZodString;
                    start_byte: z.ZodNumber;
                    end_byte: z.ZodNumber;
                    value_digest: z.ZodString;
                }, z.core.$strict>>;
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        http: "http";
                        headless: "headless";
                        archive: "archive";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"explicit_first_party_declaration">;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"standard_requirement">;
                adapter_digest: z.ZodString;
                evidence_record_digest: z.ZodString;
                requirement: z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                    requirement_id: z.ZodString;
                    relation: z.ZodEnum<{
                        tests: "tests";
                        "informational-reference": "informational-reference";
                    }>;
                }, z.core.$strict>;
                artifact_digests: z.ZodArray<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"certification_receipt">;
                certification_receipt_digest: z.ZodString;
            }, z.core.$strict>], "kind">>;
            note: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
        input_contract: z.ZodLiteral<"sourcey.agent-readiness-input/v1alpha1">;
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
            funnel: z.ZodObject<{
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
            provenance: z.ZodObject<{
                repository: z.ZodLiteral<"sourcey/agent-ready-services">;
                commit: z.ZodString;
                path: z.ZodString;
                git_blob_oid: z.ZodString;
                blob_digest: z.ZodString;
            }, z.core.$strict>;
            status: z.ZodEnum<{
                community_declared: "community_declared";
                entity_attested: "entity_attested";
            }>;
        }, z.core.$strict>], "status">;
        surface_catalog: z.ZodObject<{
            assessment_targets: z.ZodArray<z.ZodObject<{
                target_id: z.ZodString;
                name: z.ZodString;
                interface_ids: z.ZodArray<z.ZodString>;
            }, z.core.$strict>>;
            participants: z.ZodArray<z.ZodObject<{
                participant_id: z.ZodString;
                roles: z.ZodArray<z.ZodEnum<{
                    subject: "subject";
                    access_operator: "access_operator";
                    identity_provider: "identity_provider";
                    payment_provider: "payment_provider";
                    provisioning_provider: "provisioning_provider";
                    operations_provider: "operations_provider";
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
                    policy: "policy";
                    discovery: "discovery";
                    status: "status";
                    pricing: "pricing";
                    eligibility: "eligibility";
                    access: "access";
                    terms: "terms";
                    checkout: "checkout";
                    provisioning: "provisioning";
                    operations: "operations";
                    recovery: "recovery";
                    authentication: "authentication";
                    descriptor: "descriptor";
                    documentation: "documentation";
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
                    http: "http";
                    websocket: "websocket";
                    grpc: "grpc";
                }>;
                roles: z.ZodArray<z.ZodEnum<{
                    status: "status";
                    service: "service";
                    checkout: "checkout";
                    recovery: "recovery";
                    authorization: "authorization";
                    token: "token";
                    registration: "registration";
                    protected_resource: "protected_resource";
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
                    web_application: "web_application";
                    network_api: "network_api";
                    command_line: "command_line";
                    software_library: "software_library";
                    tool_server: "tool_server";
                    agent_service: "agent_service";
                }>;
                functions: z.ZodArray<z.ZodEnum<{
                    events: "events";
                    recovery: "recovery";
                    authentication: "authentication";
                    service_operation: "service_operation";
                    commerce: "commerce";
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
                    describes: "describes";
                    authenticates: "authenticates";
                    requires: "requires";
                    alternative_to: "alternative_to";
                    precedes: "precedes";
                }>;
                from: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        resource: "resource";
                        endpoint: "endpoint";
                        interface: "interface";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>;
                to: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        resource: "resource";
                        endpoint: "endpoint";
                        interface: "interface";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>;
            }, z.core.$strict>>;
            surface_exclusions: z.ZodArray<z.ZodObject<{
                exclusion_id: z.ZodString;
                role: z.ZodEnum<{
                    policy: "policy";
                    discovery: "discovery";
                    status: "status";
                    pricing: "pricing";
                    eligibility: "eligibility";
                    access: "access";
                    terms: "terms";
                    checkout: "checkout";
                    provisioning: "provisioning";
                    operations: "operations";
                    recovery: "recovery";
                    authentication: "authentication";
                    descriptor: "descriptor";
                    documentation: "documentation";
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
        assessment_basis: z.ZodObject<{
            principal: z.ZodLiteral<"authorized_human_or_organization">;
            initial_state: z.ZodObject<{
                product_specific_account: z.ZodLiteral<false>;
                product_credentials: z.ZodLiteral<false>;
                paid_subscription: z.ZodLiteral<false>;
                provisioned_resource: z.ZodLiteral<false>;
                external_identity: z.ZodLiteral<"only_when_declared_by_exact_funnel">;
            }, z.core.$strict>;
            permitted_human_boundaries: z.ZodArray<z.ZodEnum<{
                account_ownership_confirmation: "account_ownership_confirmation";
                delegated_identity_consent: "delegated_identity_consent";
                regulated_approval: "regulated_approval";
                final_payment_or_irreversible_commitment: "final_payment_or_irreversible_commitment";
            }>>;
            required_handoff_properties: z.ZodArray<z.ZodEnum<{
                exact_disclosure: "exact_disclosure";
                resumable_handoff: "resumable_handoff";
                deterministic_continuation: "deterministic_continuation";
            }>>;
            forbidden_substitutions: z.ZodArray<z.ZodEnum<{
                captcha_solving: "captcha_solving";
                human_password_or_session_sharing: "human_password_or_session_sharing";
                concealed_agent_identity: "concealed_agent_identity";
                invented_eligibility: "invented_eligibility";
                unbound_out_of_band_code: "unbound_out_of_band_code";
                vendor_policy_bypass: "vendor_policy_bypass";
                unapproved_consequential_action: "unapproved_consequential_action";
            }>>;
            success: z.ZodObject<{
                target_coverage: z.ZodLiteral<"every_declared_target">;
                interface_coverage: z.ZodLiteral<"at_least_one_declared_alternative">;
                authority: z.ZodLiteral<"scoped">;
                failure_semantics: z.ZodLiteral<"documented">;
                recovery: z.ZodLiteral<"supported">;
            }, z.core.$strict>;
            observed_assessment: z.ZodObject<{
                allowed_sources: z.ZodArray<z.ZodEnum<{
                    public_documentation: "public_documentation";
                    public_metadata: "public_metadata";
                    public_endpoints: "public_endpoints";
                    non_mutating_interaction: "non_mutating_interaction";
                    operator_attested_public_observation: "operator_attested_public_observation";
                }>>;
                consequential_claims: z.ZodLiteral<"certification_required">;
            }, z.core.$strict>;
        }, z.core.$strict>;
        overall_outcome: z.ZodEnum<{
            unknown: "unknown";
            not_applicable: "not_applicable";
            pass: "pass";
            constrained: "constrained";
            fail: "fail";
        }>;
        public_state: z.ZodEnum<{
            unknown: "unknown";
            not_applicable: "not_applicable";
            ready: "ready";
            limited: "limited";
            blocked: "blocked";
        }>;
        state_label: z.ZodString;
        grade: z.ZodEnum<{
            "A+": "A+";
            A: "A";
            "B+": "B+";
            B: "B";
            "C+": "C+";
            C: "C";
            D: "D";
            F: "F";
            unrated: "unrated";
        }>;
        grade_derivation: z.ZodObject<{
            label: z.ZodString;
            explanation: z.ZodString;
            coverage_rule: z.ZodString;
            outcome_rule: z.ZodString;
        }, z.core.$strict>;
        publication: z.ZodObject<{
            visibility: z.ZodEnum<{
                discoverable: "discoverable";
                resolvable_only: "resolvable_only";
                private: "private";
            }>;
            reasons: z.ZodArray<z.ZodEnum<{
                unrated: "unrated";
                lifecycle_not_active: "lifecycle_not_active";
                coverage_incomplete: "coverage_incomplete";
                required_evidence_not_supported: "required_evidence_not_supported";
                freshness_not_fresh: "freshness_not_fresh";
                no_useful_finding: "no_useful_finding";
                open_dispute: "open_dispute";
            }>>;
        }, z.core.$strict>;
        primary_finding: z.ZodOptional<z.ZodObject<{
            stage: z.ZodEnum<{
                evaluate: "evaluate";
                sign_up: "sign_up";
                pay: "pay";
                provision: "provision";
                operate: "operate";
            }>;
            stage_label: z.ZodString;
            public_state: z.ZodEnum<{
                limited: "limited";
                blocked: "blocked";
            }>;
            finding: z.ZodObject<{
                signal_code: z.ZodString;
                condition: z.ZodString;
                finding: z.ZodString;
                context: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            blocker: z.ZodOptional<z.ZodObject<{
                signal_code: z.ZodString;
                code: z.ZodString;
                explanation: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        first_blocked_stage: z.ZodOptional<z.ZodObject<{
            stage: z.ZodEnum<{
                evaluate: "evaluate";
                sign_up: "sign_up";
                pay: "pay";
                provision: "provision";
                operate: "operate";
            }>;
            stage_label: z.ZodString;
            finding: z.ZodObject<{
                signal_code: z.ZodString;
                condition: z.ZodString;
                finding: z.ZodString;
                context: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            blocker: z.ZodOptional<z.ZodObject<{
                signal_code: z.ZodString;
                code: z.ZodString;
                explanation: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        limitations: z.ZodArray<z.ZodObject<{
            stage: z.ZodEnum<{
                evaluate: "evaluate";
                sign_up: "sign_up";
                pay: "pay";
                provision: "provision";
                operate: "operate";
            }>;
            stage_label: z.ZodString;
            finding: z.ZodObject<{
                signal_code: z.ZodString;
                condition: z.ZodString;
                finding: z.ZodString;
                context: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            remediation: z.ZodOptional<z.ZodObject<{
                signal_code: z.ZodString;
                code: z.ZodString;
                instruction: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        stages: z.ZodArray<z.ZodObject<{
            stage: z.ZodEnum<{
                evaluate: "evaluate";
                sign_up: "sign_up";
                pay: "pay";
                provision: "provision";
                operate: "operate";
            }>;
            stage_label: z.ZodString;
            outcome: z.ZodEnum<{
                unknown: "unknown";
                not_applicable: "not_applicable";
                pass: "pass";
                constrained: "constrained";
                fail: "fail";
            }>;
            public_state: z.ZodEnum<{
                unknown: "unknown";
                not_applicable: "not_applicable";
                ready: "ready";
                limited: "limited";
                blocked: "blocked";
            }>;
            state_label: z.ZodString;
            primary_finding: z.ZodObject<{
                signal_code: z.ZodString;
                condition: z.ZodString;
                finding: z.ZodString;
                context: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            secondary_context: z.ZodArray<z.ZodObject<{
                signal_code: z.ZodString;
                condition: z.ZodString;
                finding: z.ZodString;
                context: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>;
            signals: z.ZodArray<z.ZodObject<{
                signal_code: z.ZodString;
                evaluation_role: z.ZodEnum<{
                    graded: "graded";
                    barrier: "barrier";
                    informational: "informational";
                }>;
                required: z.ZodBoolean;
                value: z.ZodEnum<{
                    unknown: "unknown";
                    yes: "yes";
                    no: "no";
                    partial: "partial";
                    not_applicable: "not_applicable";
                }>;
                value_label: z.ZodString;
                outcome: z.ZodEnum<{
                    unknown: "unknown";
                    not_applicable: "not_applicable";
                    pass: "pass";
                    constrained: "constrained";
                    fail: "fail";
                }>;
                public_state: z.ZodEnum<{
                    unknown: "unknown";
                    not_applicable: "not_applicable";
                    ready: "ready";
                    limited: "limited";
                    blocked: "blocked";
                }>;
                condition: z.ZodString;
                finding: z.ZodString;
                evidence_status: z.ZodEnum<{
                    supported: "supported";
                    contradicted: "contradicted";
                    mixed: "mixed";
                    missing: "missing";
                }>;
                freshness: z.ZodEnum<{
                    unknown: "unknown";
                    fresh: "fresh";
                    stale: "stale";
                }>;
                observed_at: z.ZodOptional<z.ZodISODateTime>;
                tested_surfaces: z.ZodArray<z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        resource: "resource";
                        endpoint: "endpoint";
                        interface: "interface";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>>;
                assessment_method: z.ZodOptional<z.ZodObject<{
                    name: z.ZodString;
                    version: z.ZodString;
                    method_digest: z.ZodString;
                }, z.core.$strict>>;
                determination_bases: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    locators: z.ZodArray<z.ZodObject<{
                        artifact_digest: z.ZodString;
                        start_byte: z.ZodNumber;
                        end_byte: z.ZodNumber;
                        value_digest: z.ZodString;
                    }, z.core.$strict>>;
                    captures: z.ZodArray<z.ZodObject<{
                        retained_capture_digest: z.ZodString;
                        capture_rung: z.ZodEnum<{
                            http: "http";
                            headless: "headless";
                            archive: "archive";
                            manual: "manual";
                        }>;
                    }, z.core.$strict>>;
                    artifact_digests: z.ZodArray<z.ZodString>;
                    kind: z.ZodLiteral<"direct_observation">;
                }, z.core.$strict>, z.ZodObject<{
                    coverage_scope: z.ZodEnum<{
                        exact_resource: "exact_resource";
                        tested_surfaces: "tested_surfaces";
                        exact_funnel: "exact_funnel";
                    }>;
                    covered_surfaces: z.ZodArray<z.ZodObject<{
                        node_kind: z.ZodEnum<{
                            resource: "resource";
                            endpoint: "endpoint";
                            interface: "interface";
                            surface_exclusion: "surface_exclusion";
                        }>;
                        node_id: z.ZodString;
                    }, z.core.$strict>>;
                    covered_branches: z.ZodNumber;
                    captures: z.ZodArray<z.ZodObject<{
                        retained_capture_digest: z.ZodString;
                        capture_rung: z.ZodEnum<{
                            http: "http";
                            headless: "headless";
                            archive: "archive";
                            manual: "manual";
                        }>;
                    }, z.core.$strict>>;
                    artifact_digests: z.ZodArray<z.ZodString>;
                    kind: z.ZodLiteral<"bounded_absence">;
                }, z.core.$strict>, z.ZodObject<{
                    source_surface: z.ZodObject<{
                        node_kind: z.ZodEnum<{
                            resource: "resource";
                            endpoint: "endpoint";
                            interface: "interface";
                            surface_exclusion: "surface_exclusion";
                        }>;
                        node_id: z.ZodString;
                    }, z.core.$strict>;
                    locators: z.ZodArray<z.ZodObject<{
                        artifact_digest: z.ZodString;
                        start_byte: z.ZodNumber;
                        end_byte: z.ZodNumber;
                        value_digest: z.ZodString;
                    }, z.core.$strict>>;
                    captures: z.ZodArray<z.ZodObject<{
                        retained_capture_digest: z.ZodString;
                        capture_rung: z.ZodEnum<{
                            http: "http";
                            headless: "headless";
                            archive: "archive";
                            manual: "manual";
                        }>;
                    }, z.core.$strict>>;
                    artifact_digests: z.ZodArray<z.ZodString>;
                    kind: z.ZodLiteral<"explicit_first_party_declaration">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"standard_requirement">;
                    adapter_digest: z.ZodString;
                    evidence_record_digest: z.ZodString;
                    requirement: z.ZodObject<{
                        namespace: z.ZodString;
                        version: z.ZodString;
                        requirement_id: z.ZodString;
                        relation: z.ZodEnum<{
                            tests: "tests";
                            "informational-reference": "informational-reference";
                        }>;
                    }, z.core.$strict>;
                    artifact_digests: z.ZodArray<z.ZodString>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"certification_receipt">;
                    certification_receipt_digest: z.ZodString;
                }, z.core.$strict>], "kind">>;
                note: z.ZodOptional<z.ZodString>;
                blocker: z.ZodOptional<z.ZodObject<{
                    signal_code: z.ZodString;
                    code: z.ZodString;
                    explanation: z.ZodString;
                }, z.core.$strict>>;
                remediation: z.ZodOptional<z.ZodObject<{
                    signal_code: z.ZodString;
                    code: z.ZodString;
                    instruction: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>>;
            blockers: z.ZodArray<z.ZodObject<{
                signal_code: z.ZodString;
                code: z.ZodString;
                explanation: z.ZodString;
            }, z.core.$strict>>;
            remediations: z.ZodArray<z.ZodObject<{
                signal_code: z.ZodString;
                code: z.ZodString;
                instruction: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        coverage: z.ZodObject<{
            status: z.ZodEnum<{
                incomplete: "incomplete";
                complete: "complete";
            }>;
            required_signals: z.ZodNumber;
            covered_signals: z.ZodNumber;
            ratio: z.ZodNumber;
            barrier_signals: z.ZodNumber;
            verified_barrier_signals: z.ZodNumber;
            barrier_ratio: z.ZodNumber;
        }, z.core.$strict>;
        last_tested_at: z.ZodISODateTime;
        freshness: z.ZodEnum<{
            unknown: "unknown";
            fresh: "fresh";
            stale: "stale";
        }>;
        provenance: z.ZodObject<{
            freshness: z.ZodEnum<{
                unknown: "unknown";
                fresh: "fresh";
                stale: "stale";
            }>;
            dispute: z.ZodEnum<{
                none: "none";
                open: "open";
                resolved: "resolved";
            }>;
            coverage_policy_digest: z.ZodString;
            freshness_policy_digest: z.ZodString;
            basis_event_ids: z.ZodArray<z.ZodString>;
            fields: z.ZodArray<z.ZodObject<{
                path: z.ZodString;
                supporting_event_ids: z.ZodArray<z.ZodString>;
                contradicting_event_ids: z.ZodArray<z.ZodString>;
                accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                    observed: "observed";
                    derived: "derived";
                    editorial: "editorial";
                    attested: "attested";
                }>>;
                evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                    observed: "observed";
                    derived: "derived";
                    editorial: "editorial";
                    attested: "attested";
                }>>;
                latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                freshness: z.ZodEnum<{
                    unknown: "unknown";
                    fresh: "fresh";
                    stale: "stale";
                }>;
            }, z.core.$strict>>;
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
            funnel: z.ZodObject<{
                key: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        lifecycle: z.ZodEnum<{
            active: "active";
            ended: "ended";
            withdrawn: "withdrawn";
        }>;
        revision_digest: z.ZodString;
        policy_digest: z.ZodString;
        policy_as_of: z.ZodISODateTime;
        publication: z.ZodObject<{
            visibility: z.ZodEnum<{
                discoverable: "discoverable";
                resolvable_only: "resolvable_only";
                private: "private";
            }>;
        }, z.core.$loose>;
        provenance: z.ZodObject<{
            freshness_policy_digest: z.ZodString;
        }, z.core.$loose>;
        canonical_url: z.ZodURL;
        projection_digest: z.ZodString;
    }, z.core.$loose>>;
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
                        primary: "primary";
                        alias: "alias";
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
                scope: z.ZodObject<{
                    product: z.ZodObject<{
                        key: z.ZodString;
                        name: z.ZodString;
                    }, z.core.$strict>;
                    funnel: z.ZodObject<{
                        key: z.ZodString;
                        name: z.ZodString;
                    }, z.core.$strict>;
                }, z.core.$strict>;
                resources: z.ZodArray<z.ZodObject<{
                    resource_id: z.ZodString;
                    uri: z.ZodURL;
                    roles: z.ZodArray<z.ZodEnum<{
                        policy: "policy";
                        discovery: "discovery";
                        status: "status";
                        pricing: "pricing";
                        eligibility: "eligibility";
                        access: "access";
                        terms: "terms";
                        checkout: "checkout";
                        provisioning: "provisioning";
                        operations: "operations";
                        recovery: "recovery";
                        authentication: "authentication";
                        descriptor: "descriptor";
                        documentation: "documentation";
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
                relations: z.ZodArray<z.ZodObject<{
                    relation_id: z.ZodString;
                    kind: z.ZodEnum<{
                        describes: "describes";
                        authenticates: "authenticates";
                        requires: "requires";
                        alternative_to: "alternative_to";
                        precedes: "precedes";
                    }>;
                    from: z.ZodObject<{
                        node_kind: z.ZodEnum<{
                            resource: "resource";
                            endpoint: "endpoint";
                            interface: "interface";
                            surface_exclusion: "surface_exclusion";
                        }>;
                        node_id: z.ZodString;
                    }, z.core.$strict>;
                    to: z.ZodObject<{
                        node_kind: z.ZodEnum<{
                            resource: "resource";
                            endpoint: "endpoint";
                            interface: "interface";
                            surface_exclusion: "surface_exclusion";
                        }>;
                        node_id: z.ZodString;
                    }, z.core.$strict>;
                }, z.core.$strict>>;
                declaration_id: z.ZodString;
                declared_at: z.ZodISODateTime;
                assessment_targets: z.ZodArray<z.ZodObject<{
                    target_id: z.ZodString;
                    name: z.ZodString;
                    interface_ids: z.ZodArray<z.ZodString>;
                }, z.core.$strict>>;
                participants: z.ZodArray<z.ZodObject<{
                    participant_id: z.ZodString;
                    roles: z.ZodArray<z.ZodEnum<{
                        subject: "subject";
                        access_operator: "access_operator";
                        identity_provider: "identity_provider";
                        payment_provider: "payment_provider";
                        provisioning_provider: "provisioning_provider";
                        operations_provider: "operations_provider";
                    }>>;
                    identity: z.ZodUnion<readonly [z.ZodObject<{
                        entity_id: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        origin_source_id: z.ZodString;
                    }, z.core.$strict>]>;
                }, z.core.$strict>>;
                endpoints: z.ZodArray<z.ZodObject<{
                    endpoint_id: z.ZodString;
                    uri: z.ZodURL;
                    transport: z.ZodEnum<{
                        http: "http";
                        websocket: "websocket";
                        grpc: "grpc";
                    }>;
                    roles: z.ZodArray<z.ZodEnum<{
                        status: "status";
                        service: "service";
                        checkout: "checkout";
                        recovery: "recovery";
                        authorization: "authorization";
                        token: "token";
                        registration: "registration";
                        protected_resource: "protected_resource";
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
                        web_application: "web_application";
                        network_api: "network_api";
                        command_line: "command_line";
                        software_library: "software_library";
                        tool_server: "tool_server";
                        agent_service: "agent_service";
                    }>;
                    functions: z.ZodArray<z.ZodEnum<{
                        events: "events";
                        recovery: "recovery";
                        authentication: "authentication";
                        service_operation: "service_operation";
                        commerce: "commerce";
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
                surface_exclusions: z.ZodArray<z.ZodObject<{
                    exclusion_id: z.ZodString;
                    role: z.ZodEnum<{
                        policy: "policy";
                        discovery: "discovery";
                        status: "status";
                        pricing: "pricing";
                        eligibility: "eligibility";
                        access: "access";
                        terms: "terms";
                        checkout: "checkout";
                        provisioning: "provisioning";
                        operations: "operations";
                        recovery: "recovery";
                        authentication: "authentication";
                        descriptor: "descriptor";
                        documentation: "documentation";
                    }>;
                    rationale: z.ZodString;
                }, z.core.$strict>>;
                authority_intent: z.ZodEnum<{
                    entity: "entity";
                    community: "community";
                }>;
                source_bindings: z.ZodArray<z.ZodObject<{
                    target: z.ZodObject<{
                        node_kind: z.ZodEnum<{
                            relation: "relation";
                            resource: "resource";
                            endpoint: "endpoint";
                            interface: "interface";
                            surface_exclusion: "surface_exclusion";
                            declaration: "declaration";
                            participant: "participant";
                            assessment_target: "assessment_target";
                        }>;
                        node_id: z.ZodString;
                    }, z.core.$strict>;
                    source_binding_id: z.ZodString;
                    source_id: z.ZodString;
                    field_paths: z.ZodArray<z.ZodString>;
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
export declare function sameAgentReadinessOfferRelationIdentity(left: {
    readonly relation_id: string;
    readonly agent_readiness_profile_id: string;
    readonly offer_id: string;
    readonly purpose: string;
}, right: {
    readonly relation_id: string;
    readonly agent_readiness_profile_id: string;
    readonly offer_id: string;
    readonly purpose: string;
}): boolean;
export type AgentReadinessProfileInput = z.infer<typeof agentReadinessProfileInputSchema>;
export type AgentReadinessProfileReleaseInput = z.infer<typeof agentReadinessProfileReleaseInputSchema>;
export type AgentReadinessFactualInput = z.infer<typeof agentReadinessFactualInputSchema>;
export type AgentReadinessRevisionCore = z.infer<typeof agentReadinessRevisionCoreSchema>;
export type AgentReadinessRevision = z.infer<typeof agentReadinessRevisionSchema>;
export type AgentReadinessPolicyCore = z.infer<typeof agentReadinessPolicyCoreSchema>;
export type AgentReadinessPolicy = z.infer<typeof agentReadinessPolicySchema>;
export type AgentReadinessProjectionCore = z.infer<typeof agentReadinessProjectionCoreSchema>;
export type AgentReadinessProjection = z.infer<typeof agentReadinessProjectionSchema>;
export type AgentReadinessStageSummary = z.infer<typeof agentReadinessStageSummarySchema>;
export type AgentReadinessProfileSummary = z.infer<typeof agentReadinessProfileSummarySchema>;
export type AgentReadinessProjectionLineage = z.infer<typeof agentReadinessProjectionLineageSchema>;
export type AgentReadinessOfferRelationRevisionCore = z.infer<typeof agentReadinessOfferRelationRevisionCoreSchema>;
export type AgentReadinessOfferRelationInput = z.infer<typeof agentReadinessOfferRelationInputSchema>;
export type AgentReadinessOfferRelationRevision = z.infer<typeof agentReadinessOfferRelationRevisionSchema>;
export type AgentReadinessOfferRelationIndex = z.infer<typeof agentReadinessOfferRelationIndexSchema>;
export type AgentReadinessOfferRelationInputs = z.infer<typeof agentReadinessOfferRelationInputsSchema>;
export type AgentReadinessIndex = z.infer<typeof agentReadinessIndexSchema>;
export type AgentReadinessInputs = z.infer<typeof agentReadinessInputsSchema>;
export type AgentReadinessDeltaObject = z.infer<typeof agentReadinessDeltaObjectSchema>;
export type AgentReadinessOfferRelationDeltaObject = z.infer<typeof agentReadinessOfferRelationDeltaObjectSchema>;
//# sourceMappingURL=index.d.ts.map