import { z } from "zod";
export * from "./declaration.js";
export * from "./declaration-acquisition.js";
export * from "./declaration-reference.js";
export * from "./evidence.js";
export * from "./interaction.js";
export * from "./method-pack.js";
export * from "./shared.js";
/** Canonical discriminant for a published Agent Readiness revision. */
export declare const agentReadinessRevisionContract: "sourcey.agent-readiness-revision/v1alpha1";
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
        operate: "operate";
        pay: "pay";
        provision: "provision";
        sign_up: "sign_up";
    }>;
    signal_code: z.ZodString;
    selector_group_id: z.ZodString;
    value: z.ZodEnum<{
        no: "no";
        not_applicable: "not_applicable";
        partial: "partial";
        unknown: "unknown";
        yes: "yes";
    }>;
    observed_at: z.ZodISODateTime;
    tested_surfaces: z.ZodArray<z.ZodObject<{
        node_kind: z.ZodEnum<{
            endpoint: "endpoint";
            interface: "interface";
            resource: "resource";
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
        captures: z.ZodArray<z.ZodObject<{
            retained_capture_digest: z.ZodString;
            capture_rung: z.ZodEnum<{
                archive: "archive";
                headless: "headless";
                http: "http";
                manual: "manual";
            }>;
        }, z.core.$strict>>;
        artifact_digests: z.ZodArray<z.ZodString>;
        kind: z.ZodLiteral<"direct_observation">;
        locators: z.ZodArray<z.ZodObject<{
            artifact_digest: z.ZodString;
            start_byte: z.ZodNumber;
            end_byte: z.ZodNumber;
            value_digest: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>, z.ZodObject<{
        captures: z.ZodArray<z.ZodObject<{
            retained_capture_digest: z.ZodString;
            capture_rung: z.ZodEnum<{
                archive: "archive";
                headless: "headless";
                http: "http";
                manual: "manual";
            }>;
        }, z.core.$strict>>;
        artifact_digests: z.ZodArray<z.ZodString>;
        kind: z.ZodLiteral<"service_exchange">;
        endpoint_id: z.ZodString;
        assessment_target_id: z.ZodString;
        source_observation_digest: z.ZodString;
        approved_request: z.ZodObject<{
            source_url: z.ZodURL;
            request: z.ZodObject<{
                method: z.ZodLiteral<"GET">;
                target_url: z.ZodOptional<z.ZodURL>;
                headers: z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    value: z.ZodString;
                }, z.core.$strict>>;
                success_assertions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    pointer: z.ZodString;
                    equals: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
                }, z.core.$strict>>>;
            }, z.core.$strict>;
        }, z.core.$strict>;
        response_status_code: z.ZodNumber;
        response_content_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        captures: z.ZodArray<z.ZodObject<{
            retained_capture_digest: z.ZodString;
            capture_rung: z.ZodEnum<{
                archive: "archive";
                headless: "headless";
                http: "http";
                manual: "manual";
            }>;
        }, z.core.$strict>>;
        artifact_digests: z.ZodArray<z.ZodString>;
        kind: z.ZodLiteral<"bounded_absence">;
        coverage_scope: z.ZodEnum<{
            exact_funnel: "exact_funnel";
            exact_resource: "exact_resource";
            tested_surfaces: "tested_surfaces";
        }>;
        covered_surfaces: z.ZodArray<z.ZodObject<{
            node_kind: z.ZodEnum<{
                endpoint: "endpoint";
                interface: "interface";
                resource: "resource";
                surface_exclusion: "surface_exclusion";
            }>;
            node_id: z.ZodString;
        }, z.core.$strict>>;
        covered_branches: z.ZodNumber;
    }, z.core.$strict>, z.ZodObject<{
        captures: z.ZodArray<z.ZodObject<{
            retained_capture_digest: z.ZodString;
            capture_rung: z.ZodEnum<{
                archive: "archive";
                headless: "headless";
                http: "http";
                manual: "manual";
            }>;
        }, z.core.$strict>>;
        artifact_digests: z.ZodArray<z.ZodString>;
        kind: z.ZodLiteral<"explicit_first_party_declaration">;
        source_surface: z.ZodObject<{
            node_kind: z.ZodEnum<{
                endpoint: "endpoint";
                interface: "interface";
                resource: "resource";
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
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"standard_requirement">;
        adapter_digest: z.ZodString;
        evidence_record_digest: z.ZodString;
        requirement: z.ZodObject<{
            namespace: z.ZodString;
            version: z.ZodString;
            requirement_id: z.ZodString;
            relation: z.ZodEnum<{
                "informational-reference": "informational-reference";
                tests: "tests";
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
        operate: "operate";
        pay: "pay";
        provision: "provision";
        sign_up: "sign_up";
    }>;
    signal_code: z.ZodString;
    evidence_event_ids: z.ZodArray<z.ZodString>;
    observation_ids: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export declare const agentReadinessProfileInputSchema: z.ZodObject<{
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
    signals: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
        }>;
        signal_code: z.ZodString;
        selector_group_id: z.ZodString;
        value: z.ZodEnum<{
            no: "no";
            not_applicable: "not_applicable";
            partial: "partial";
            unknown: "unknown";
            yes: "yes";
        }>;
        observed_at: z.ZodISODateTime;
        tested_surfaces: z.ZodArray<z.ZodObject<{
            node_kind: z.ZodEnum<{
                endpoint: "endpoint";
                interface: "interface";
                resource: "resource";
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
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"direct_observation">;
            locators: z.ZodArray<z.ZodObject<{
                artifact_digest: z.ZodString;
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>, z.ZodObject<{
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"service_exchange">;
            endpoint_id: z.ZodString;
            assessment_target_id: z.ZodString;
            source_observation_digest: z.ZodString;
            approved_request: z.ZodObject<{
                source_url: z.ZodURL;
                request: z.ZodObject<{
                    method: z.ZodLiteral<"GET">;
                    target_url: z.ZodOptional<z.ZodURL>;
                    headers: z.ZodArray<z.ZodObject<{
                        name: z.ZodString;
                        value: z.ZodString;
                    }, z.core.$strict>>;
                    success_assertions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                        pointer: z.ZodString;
                        equals: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
                    }, z.core.$strict>>>;
                }, z.core.$strict>;
            }, z.core.$strict>;
            response_status_code: z.ZodNumber;
            response_content_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"bounded_absence">;
            coverage_scope: z.ZodEnum<{
                exact_funnel: "exact_funnel";
                exact_resource: "exact_resource";
                tested_surfaces: "tested_surfaces";
            }>;
            covered_surfaces: z.ZodArray<z.ZodObject<{
                node_kind: z.ZodEnum<{
                    endpoint: "endpoint";
                    interface: "interface";
                    resource: "resource";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>>;
            covered_branches: z.ZodNumber;
        }, z.core.$strict>, z.ZodObject<{
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"explicit_first_party_declaration">;
            source_surface: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    endpoint: "endpoint";
                    interface: "interface";
                    resource: "resource";
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
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"standard_requirement">;
            adapter_digest: z.ZodString;
            evidence_record_digest: z.ZodString;
            requirement: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
                requirement_id: z.ZodString;
                relation: z.ZodEnum<{
                    "informational-reference": "informational-reference";
                    tests: "tests";
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
    evidence_bindings: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
        }>;
        signal_code: z.ZodString;
        evidence_event_ids: z.ZodArray<z.ZodString>;
        observation_ids: z.ZodArray<z.ZodString>;
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
    applicable_stages: z.ZodArray<z.ZodEnum<{
        evaluate: "evaluate";
        operate: "operate";
        pay: "pay";
        provision: "provision";
        sign_up: "sign_up";
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
        signals: z.ZodArray<z.ZodObject<{
            stage: z.ZodEnum<{
                evaluate: "evaluate";
                operate: "operate";
                pay: "pay";
                provision: "provision";
                sign_up: "sign_up";
            }>;
            signal_code: z.ZodString;
            selector_group_id: z.ZodString;
            value: z.ZodEnum<{
                no: "no";
                not_applicable: "not_applicable";
                partial: "partial";
                unknown: "unknown";
                yes: "yes";
            }>;
            observed_at: z.ZodISODateTime;
            tested_surfaces: z.ZodArray<z.ZodObject<{
                node_kind: z.ZodEnum<{
                    endpoint: "endpoint";
                    interface: "interface";
                    resource: "resource";
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
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        archive: "archive";
                        headless: "headless";
                        http: "http";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"direct_observation">;
                locators: z.ZodArray<z.ZodObject<{
                    artifact_digest: z.ZodString;
                    start_byte: z.ZodNumber;
                    end_byte: z.ZodNumber;
                    value_digest: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>, z.ZodObject<{
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        archive: "archive";
                        headless: "headless";
                        http: "http";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"service_exchange">;
                endpoint_id: z.ZodString;
                assessment_target_id: z.ZodString;
                source_observation_digest: z.ZodString;
                approved_request: z.ZodObject<{
                    source_url: z.ZodURL;
                    request: z.ZodObject<{
                        method: z.ZodLiteral<"GET">;
                        target_url: z.ZodOptional<z.ZodURL>;
                        headers: z.ZodArray<z.ZodObject<{
                            name: z.ZodString;
                            value: z.ZodString;
                        }, z.core.$strict>>;
                        success_assertions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                            pointer: z.ZodString;
                            equals: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
                        }, z.core.$strict>>>;
                    }, z.core.$strict>;
                }, z.core.$strict>;
                response_status_code: z.ZodNumber;
                response_content_digest: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        archive: "archive";
                        headless: "headless";
                        http: "http";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"bounded_absence">;
                coverage_scope: z.ZodEnum<{
                    exact_funnel: "exact_funnel";
                    exact_resource: "exact_resource";
                    tested_surfaces: "tested_surfaces";
                }>;
                covered_surfaces: z.ZodArray<z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        endpoint: "endpoint";
                        interface: "interface";
                        resource: "resource";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>>;
                covered_branches: z.ZodNumber;
            }, z.core.$strict>, z.ZodObject<{
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        archive: "archive";
                        headless: "headless";
                        http: "http";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"explicit_first_party_declaration">;
                source_surface: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        endpoint: "endpoint";
                        interface: "interface";
                        resource: "resource";
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
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"standard_requirement">;
                adapter_digest: z.ZodString;
                evidence_record_digest: z.ZodString;
                requirement: z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                    requirement_id: z.ZodString;
                    relation: z.ZodEnum<{
                        "informational-reference": "informational-reference";
                        tests: "tests";
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
        evidence_bindings: z.ZodArray<z.ZodObject<{
            stage: z.ZodEnum<{
                evaluate: "evaluate";
                operate: "operate";
                pay: "pay";
                provision: "provision";
                sign_up: "sign_up";
            }>;
            signal_code: z.ZodString;
            evidence_event_ids: z.ZodArray<z.ZodString>;
            observation_ids: z.ZodArray<z.ZodString>;
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
                funnel: z.ZodObject<{
                    key: z.ZodString;
                    name: z.ZodString;
                }, z.core.$strict>;
            }, z.core.$strict>;
            assessment_targets: z.ZodArray<z.ZodObject<{
                target_id: z.ZodString;
                name: z.ZodString;
                interface_ids: z.ZodArray<z.ZodString>;
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
                        assessment_target: "assessment_target";
                        declaration: "declaration";
                        endpoint: "endpoint";
                        interface: "interface";
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
        applicable_stages: z.ZodArray<z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
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
    signals: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
        }>;
        signal_code: z.ZodString;
        selector_group_id: z.ZodString;
        value: z.ZodEnum<{
            no: "no";
            not_applicable: "not_applicable";
            partial: "partial";
            unknown: "unknown";
            yes: "yes";
        }>;
        observed_at: z.ZodISODateTime;
        tested_surfaces: z.ZodArray<z.ZodObject<{
            node_kind: z.ZodEnum<{
                endpoint: "endpoint";
                interface: "interface";
                resource: "resource";
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
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"direct_observation">;
            locators: z.ZodArray<z.ZodObject<{
                artifact_digest: z.ZodString;
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>, z.ZodObject<{
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"service_exchange">;
            endpoint_id: z.ZodString;
            assessment_target_id: z.ZodString;
            source_observation_digest: z.ZodString;
            approved_request: z.ZodObject<{
                source_url: z.ZodURL;
                request: z.ZodObject<{
                    method: z.ZodLiteral<"GET">;
                    target_url: z.ZodOptional<z.ZodURL>;
                    headers: z.ZodArray<z.ZodObject<{
                        name: z.ZodString;
                        value: z.ZodString;
                    }, z.core.$strict>>;
                    success_assertions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                        pointer: z.ZodString;
                        equals: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
                    }, z.core.$strict>>>;
                }, z.core.$strict>;
            }, z.core.$strict>;
            response_status_code: z.ZodNumber;
            response_content_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"bounded_absence">;
            coverage_scope: z.ZodEnum<{
                exact_funnel: "exact_funnel";
                exact_resource: "exact_resource";
                tested_surfaces: "tested_surfaces";
            }>;
            covered_surfaces: z.ZodArray<z.ZodObject<{
                node_kind: z.ZodEnum<{
                    endpoint: "endpoint";
                    interface: "interface";
                    resource: "resource";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>>;
            covered_branches: z.ZodNumber;
        }, z.core.$strict>, z.ZodObject<{
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"explicit_first_party_declaration">;
            source_surface: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    endpoint: "endpoint";
                    interface: "interface";
                    resource: "resource";
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
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"standard_requirement">;
            adapter_digest: z.ZodString;
            evidence_record_digest: z.ZodString;
            requirement: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
                requirement_id: z.ZodString;
                relation: z.ZodEnum<{
                    "informational-reference": "informational-reference";
                    tests: "tests";
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
    signals: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
        }>;
        signal_code: z.ZodString;
        selector_group_id: z.ZodString;
        value: z.ZodEnum<{
            no: "no";
            not_applicable: "not_applicable";
            partial: "partial";
            unknown: "unknown";
            yes: "yes";
        }>;
        observed_at: z.ZodISODateTime;
        tested_surfaces: z.ZodArray<z.ZodObject<{
            node_kind: z.ZodEnum<{
                endpoint: "endpoint";
                interface: "interface";
                resource: "resource";
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
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"direct_observation">;
            locators: z.ZodArray<z.ZodObject<{
                artifact_digest: z.ZodString;
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>, z.ZodObject<{
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"service_exchange">;
            endpoint_id: z.ZodString;
            assessment_target_id: z.ZodString;
            source_observation_digest: z.ZodString;
            approved_request: z.ZodObject<{
                source_url: z.ZodURL;
                request: z.ZodObject<{
                    method: z.ZodLiteral<"GET">;
                    target_url: z.ZodOptional<z.ZodURL>;
                    headers: z.ZodArray<z.ZodObject<{
                        name: z.ZodString;
                        value: z.ZodString;
                    }, z.core.$strict>>;
                    success_assertions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                        pointer: z.ZodString;
                        equals: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
                    }, z.core.$strict>>>;
                }, z.core.$strict>;
            }, z.core.$strict>;
            response_status_code: z.ZodNumber;
            response_content_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"bounded_absence">;
            coverage_scope: z.ZodEnum<{
                exact_funnel: "exact_funnel";
                exact_resource: "exact_resource";
                tested_surfaces: "tested_surfaces";
            }>;
            covered_surfaces: z.ZodArray<z.ZodObject<{
                node_kind: z.ZodEnum<{
                    endpoint: "endpoint";
                    interface: "interface";
                    resource: "resource";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>>;
            covered_branches: z.ZodNumber;
        }, z.core.$strict>, z.ZodObject<{
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"explicit_first_party_declaration">;
            source_surface: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    endpoint: "endpoint";
                    interface: "interface";
                    resource: "resource";
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
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"standard_requirement">;
            adapter_digest: z.ZodString;
            evidence_record_digest: z.ZodString;
            requirement: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
                requirement_id: z.ZodString;
                relation: z.ZodEnum<{
                    "informational-reference": "informational-reference";
                    tests: "tests";
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
    signals: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
        }>;
        signal_code: z.ZodString;
        selector_group_id: z.ZodString;
        value: z.ZodEnum<{
            no: "no";
            not_applicable: "not_applicable";
            partial: "partial";
            unknown: "unknown";
            yes: "yes";
        }>;
        observed_at: z.ZodISODateTime;
        tested_surfaces: z.ZodArray<z.ZodObject<{
            node_kind: z.ZodEnum<{
                endpoint: "endpoint";
                interface: "interface";
                resource: "resource";
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
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"direct_observation">;
            locators: z.ZodArray<z.ZodObject<{
                artifact_digest: z.ZodString;
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>, z.ZodObject<{
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"service_exchange">;
            endpoint_id: z.ZodString;
            assessment_target_id: z.ZodString;
            source_observation_digest: z.ZodString;
            approved_request: z.ZodObject<{
                source_url: z.ZodURL;
                request: z.ZodObject<{
                    method: z.ZodLiteral<"GET">;
                    target_url: z.ZodOptional<z.ZodURL>;
                    headers: z.ZodArray<z.ZodObject<{
                        name: z.ZodString;
                        value: z.ZodString;
                    }, z.core.$strict>>;
                    success_assertions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                        pointer: z.ZodString;
                        equals: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
                    }, z.core.$strict>>>;
                }, z.core.$strict>;
            }, z.core.$strict>;
            response_status_code: z.ZodNumber;
            response_content_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"bounded_absence">;
            coverage_scope: z.ZodEnum<{
                exact_funnel: "exact_funnel";
                exact_resource: "exact_resource";
                tested_surfaces: "tested_surfaces";
            }>;
            covered_surfaces: z.ZodArray<z.ZodObject<{
                node_kind: z.ZodEnum<{
                    endpoint: "endpoint";
                    interface: "interface";
                    resource: "resource";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>>;
            covered_branches: z.ZodNumber;
        }, z.core.$strict>, z.ZodObject<{
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"explicit_first_party_declaration">;
            source_surface: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    endpoint: "endpoint";
                    interface: "interface";
                    resource: "resource";
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
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"standard_requirement">;
            adapter_digest: z.ZodString;
            evidence_record_digest: z.ZodString;
            requirement: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
                requirement_id: z.ZodString;
                relation: z.ZodEnum<{
                    "informational-reference": "informational-reference";
                    tests: "tests";
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
        all_matches: "all_matches";
        at_least_one: "at_least_one";
    }>;
    alternatives: z.ZodArray<z.ZodObject<{
        alternative_id: z.ZodString;
        selectors: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"resource_role">;
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
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"endpoint_role">;
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
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"interface_signature">;
            modalities: z.ZodArray<z.ZodEnum<{
                agent_service: "agent_service";
                command_line: "command_line";
                network_api: "network_api";
                software_library: "software_library";
                tool_server: "tool_server";
                web_application: "web_application";
            }>>;
            functions: z.ZodArray<z.ZodEnum<{
                authentication: "authentication";
                commerce: "commerce";
                events: "events";
                recovery: "recovery";
                service_operation: "service_operation";
            }>>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"assessment_target_membership">;
            membership: z.ZodEnum<{
                direct: "direct";
                reachable: "reachable";
                selected_path: "selected_path";
            }>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"target_relation">;
            relation_kind: z.ZodEnum<{
                alternative_to: "alternative_to";
                authenticates: "authenticates";
                describes: "describes";
                precedes: "precedes";
                requires: "requires";
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
                    "informational-reference": "informational-reference";
                    tests: "tests";
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
            "informational-reference": "informational-reference";
            tests: "tests";
        }>;
    }, z.core.$strict>;
    support: z.ZodArray<z.ZodObject<{
        result: z.ZodEnum<{
            not_satisfied: "not_satisfied";
            satisfied: "satisfied";
        }>;
        values: z.ZodArray<z.ZodEnum<{
            no: "no";
            not_applicable: "not_applicable";
            partial: "partial";
            yes: "yes";
        }>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessPolicySignalRuleSchema: z.ZodObject<{
    stage: z.ZodEnum<{
        evaluate: "evaluate";
        operate: "operate";
        pay: "pay";
        provision: "provision";
        sign_up: "sign_up";
    }>;
    signal_code: z.ZodString;
    evaluation_role: z.ZodEnum<{
        barrier: "barrier";
        graded: "graded";
        informational: "informational";
    }>;
    required: z.ZodBoolean;
    pass_values: z.ZodArray<z.ZodEnum<{
        no: "no";
        not_applicable: "not_applicable";
        partial: "partial";
        unknown: "unknown";
        yes: "yes";
    }>>;
    constrained_values: z.ZodArray<z.ZodEnum<{
        no: "no";
        not_applicable: "not_applicable";
        partial: "partial";
        unknown: "unknown";
        yes: "yes";
    }>>;
    fail_values: z.ZodArray<z.ZodEnum<{
        no: "no";
        not_applicable: "not_applicable";
        partial: "partial";
        unknown: "unknown";
        yes: "yes";
    }>>;
    allow_not_applicable: z.ZodBoolean;
    allowed_method_digests: z.ZodArray<z.ZodString>;
    selector_groups: z.ZodArray<z.ZodObject<{
        selector_group_id: z.ZodString;
        coverage: z.ZodEnum<{
            all_matches: "all_matches";
            at_least_one: "at_least_one";
        }>;
        alternatives: z.ZodArray<z.ZodObject<{
            alternative_id: z.ZodString;
            selectors: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"resource_role">;
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
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"endpoint_role">;
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
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"interface_signature">;
                modalities: z.ZodArray<z.ZodEnum<{
                    agent_service: "agent_service";
                    command_line: "command_line";
                    network_api: "network_api";
                    software_library: "software_library";
                    tool_server: "tool_server";
                    web_application: "web_application";
                }>>;
                functions: z.ZodArray<z.ZodEnum<{
                    authentication: "authentication";
                    commerce: "commerce";
                    events: "events";
                    recovery: "recovery";
                    service_operation: "service_operation";
                }>>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"assessment_target_membership">;
                membership: z.ZodEnum<{
                    direct: "direct";
                    reachable: "reachable";
                    selected_path: "selected_path";
                }>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"target_relation">;
                relation_kind: z.ZodEnum<{
                    alternative_to: "alternative_to";
                    authenticates: "authenticates";
                    describes: "describes";
                    precedes: "precedes";
                    requires: "requires";
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
                        "informational-reference": "informational-reference";
                        tests: "tests";
                    }>;
                }, z.core.$strict>;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    evidence_terms: z.ZodOptional<z.ZodArray<z.ZodString>>;
    value_evidence: z.ZodArray<z.ZodObject<{
        value: z.ZodEnum<{
            no: "no";
            not_applicable: "not_applicable";
            partial: "partial";
            yes: "yes";
        }>;
        alternatives: z.ZodArray<z.ZodObject<{
            alternative_id: z.ZodString;
            required_basis_kinds: z.ZodArray<z.ZodEnum<{
                bounded_absence: "bounded_absence";
                certification_receipt: "certification_receipt";
                direct_observation: "direct_observation";
                explicit_first_party_declaration: "explicit_first_party_declaration";
                service_exchange: "service_exchange";
                standard_requirement: "standard_requirement";
            }>>;
            minimum_distinct_captures: z.ZodNumber;
            require_independent_capture_rungs: z.ZodBoolean;
            required_artifacts: z.ZodArray<z.ZodEnum<{
                capture_interaction_trace: "capture_interaction_trace";
                evidence_excerpt: "evidence_excerpt";
                interaction_trace: "interaction_trace";
                manual_review_note: "manual_review_note";
                screenshot: "screenshot";
                source_observation: "source_observation";
                standard_evidence_result: "standard_evidence_result";
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
    fact_question: z.ZodString;
    fact_predicates: z.ZodObject<{
        yes: z.ZodString;
        partial: z.ZodString;
        no: z.ZodString;
        unknown: z.ZodString;
        not_applicable: z.ZodString;
    }, z.core.$strict>;
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
            "informational-reference": "informational-reference";
            tests: "tests";
        }>;
    }, z.core.$strict>>;
    standard_evidence: z.ZodArray<z.ZodObject<{
        requirement: z.ZodObject<{
            namespace: z.ZodString;
            version: z.ZodString;
            requirement_id: z.ZodString;
            relation: z.ZodEnum<{
                "informational-reference": "informational-reference";
                tests: "tests";
            }>;
        }, z.core.$strict>;
        support: z.ZodArray<z.ZodObject<{
            result: z.ZodEnum<{
                not_satisfied: "not_satisfied";
                satisfied: "satisfied";
            }>;
            values: z.ZodArray<z.ZodEnum<{
                no: "no";
                not_applicable: "not_applicable";
                partial: "partial";
                yes: "yes";
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
        final_payment_or_irreversible_commitment: "final_payment_or_irreversible_commitment";
        regulated_approval: "regulated_approval";
    }>>;
    required_handoff_properties: z.ZodArray<z.ZodEnum<{
        deterministic_continuation: "deterministic_continuation";
        exact_disclosure: "exact_disclosure";
        resumable_handoff: "resumable_handoff";
    }>>;
    forbidden_substitutions: z.ZodArray<z.ZodEnum<{
        captcha_solving: "captcha_solving";
        concealed_agent_identity: "concealed_agent_identity";
        human_password_or_session_sharing: "human_password_or_session_sharing";
        invented_eligibility: "invented_eligibility";
        unapproved_consequential_action: "unapproved_consequential_action";
        unbound_out_of_band_code: "unbound_out_of_band_code";
        vendor_policy_bypass: "vendor_policy_bypass";
    }>>;
    success: z.ZodObject<{
        target_coverage: z.ZodLiteral<"every_declared_target">;
        interface_coverage: z.ZodEnum<{
            at_least_one_declared_alternative: "at_least_one_declared_alternative";
            one_selected_interface_per_target: "one_selected_interface_per_target";
        }>;
        authority: z.ZodLiteral<"scoped">;
        failure_semantics: z.ZodLiteral<"documented">;
        recovery: z.ZodLiteral<"supported">;
    }, z.core.$strict>;
    observed_assessment: z.ZodObject<{
        allowed_sources: z.ZodArray<z.ZodEnum<{
            non_mutating_interaction: "non_mutating_interaction";
            operator_attested_public_observation: "operator_attested_public_observation";
            public_documentation: "public_documentation";
            public_endpoints: "public_endpoints";
            public_metadata: "public_metadata";
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
            final_payment_or_irreversible_commitment: "final_payment_or_irreversible_commitment";
            regulated_approval: "regulated_approval";
        }>>;
        required_handoff_properties: z.ZodArray<z.ZodEnum<{
            deterministic_continuation: "deterministic_continuation";
            exact_disclosure: "exact_disclosure";
            resumable_handoff: "resumable_handoff";
        }>>;
        forbidden_substitutions: z.ZodArray<z.ZodEnum<{
            captcha_solving: "captcha_solving";
            concealed_agent_identity: "concealed_agent_identity";
            human_password_or_session_sharing: "human_password_or_session_sharing";
            invented_eligibility: "invented_eligibility";
            unapproved_consequential_action: "unapproved_consequential_action";
            unbound_out_of_band_code: "unbound_out_of_band_code";
            vendor_policy_bypass: "vendor_policy_bypass";
        }>>;
        success: z.ZodObject<{
            target_coverage: z.ZodLiteral<"every_declared_target">;
            interface_coverage: z.ZodEnum<{
                at_least_one_declared_alternative: "at_least_one_declared_alternative";
                one_selected_interface_per_target: "one_selected_interface_per_target";
            }>;
            authority: z.ZodLiteral<"scoped">;
            failure_semantics: z.ZodLiteral<"documented">;
            recovery: z.ZodLiteral<"supported">;
        }, z.core.$strict>;
        observed_assessment: z.ZodObject<{
            allowed_sources: z.ZodArray<z.ZodEnum<{
                non_mutating_interaction: "non_mutating_interaction";
                operator_attested_public_observation: "operator_attested_public_observation";
                public_documentation: "public_documentation";
                public_endpoints: "public_endpoints";
                public_metadata: "public_metadata";
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
                operate: "operate";
                pay: "pay";
                provision: "provision";
                sign_up: "sign_up";
            }>;
            signal_code: z.ZodString;
            values: z.ZodArray<z.ZodEnum<{
                no: "no";
                not_applicable: "not_applicable";
                partial: "partial";
                yes: "yes";
            }>>;
            determination_bases: z.ZodArray<z.ZodEnum<{
                bounded_absence: "bounded_absence";
                certification_receipt: "certification_receipt";
                direct_observation: "direct_observation";
                explicit_first_party_declaration: "explicit_first_party_declaration";
                service_exchange: "service_exchange";
                standard_requirement: "standard_requirement";
            }>>;
        }, z.core.$strict>>;
        surface_support: z.ZodObject<{
            node_kinds: z.ZodArray<z.ZodEnum<{
                endpoint: "endpoint";
                interface: "interface";
                resource: "resource";
                surface_exclusion: "surface_exclusion";
            }>>;
            resource_roles: z.ZodArray<z.ZodEnum<{
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
            endpoint_roles: z.ZodArray<z.ZodEnum<{
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
            interface_modalities: z.ZodArray<z.ZodEnum<{
                agent_service: "agent_service";
                command_line: "command_line";
                network_api: "network_api";
                software_library: "software_library";
                tool_server: "tool_server";
                web_application: "web_application";
            }>>;
            interface_functions: z.ZodArray<z.ZodEnum<{
                authentication: "authentication";
                commerce: "commerce";
                events: "events";
                recovery: "recovery";
                service_operation: "service_operation";
            }>>;
        }, z.core.$strict>;
        capture: z.ZodObject<{
            rungs: z.ZodArray<z.ZodEnum<{
                archive: "archive";
                headless: "headless";
                http: "http";
                manual: "manual";
            }>>;
            redirects: z.ZodEnum<{
                "allowed-hosts": "allowed-hosts";
                reject: "reject";
                "same-origin": "same-origin";
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
                expand_disclosure: "expand_disclosure";
                follow_link: "follow_link";
                navigate: "navigate";
                scroll: "scroll";
                select_non_submitting_control: "select_non_submitting_control";
                wait: "wait";
            }>>;
            forbidden_effects: z.ZodArray<z.ZodEnum<{
                accept_terms: "accept_terms";
                create_account: "create_account";
                create_key: "create_key";
                enter_credentials: "enter_credentials";
                enter_payment_details: "enter_payment_details";
                invoke_billable_service: "invoke_billable_service";
                provision: "provision";
                purchase: "purchase";
                send_verification_code: "send_verification_code";
                submit_application: "submit_application";
            }>>;
        }, z.core.$strict>;
        required_artifacts: z.ZodArray<z.ZodEnum<{
            capture_interaction_trace: "capture_interaction_trace";
            evidence_excerpt: "evidence_excerpt";
            interaction_trace: "interaction_trace";
            manual_review_note: "manual_review_note";
            screenshot: "screenshot";
            source_observation: "source_observation";
            standard_evidence_result: "standard_evidence_result";
        }>>;
        failure_classes: z.ZodArray<z.ZodEnum<{
            authentication_required: "authentication_required";
            capture_unavailable: "capture_unavailable";
            interaction_budget_exhausted: "interaction_budget_exhausted";
            invalid_structure: "invalid_structure";
            network_failure: "network_failure";
            policy_refusal: "policy_refusal";
            render_failure: "render_failure";
            timeout: "timeout";
        }>>;
        residue_classes: z.ZodArray<z.ZodEnum<{
            conflicting_observations: "conflicting_observations";
            insufficient_determination_basis: "insufficient_determination_basis";
            manual_review_required: "manual_review_required";
            scope_mismatch: "scope_mismatch";
            unresolved_signal: "unresolved_signal";
            unsupported_interaction: "unsupported_interaction";
        }>>;
        external_references: z.ZodArray<z.ZodObject<{
            namespace: z.ZodString;
            version: z.ZodString;
            requirement_id: z.ZodString;
            relation: z.ZodEnum<{
                "informational-reference": "informational-reference";
                tests: "tests";
            }>;
        }, z.core.$strict>>;
        method_digest: z.ZodString;
    }, z.core.$strict>>;
    signal_rules: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
        }>;
        signal_code: z.ZodString;
        evaluation_role: z.ZodEnum<{
            barrier: "barrier";
            graded: "graded";
            informational: "informational";
        }>;
        required: z.ZodBoolean;
        pass_values: z.ZodArray<z.ZodEnum<{
            no: "no";
            not_applicable: "not_applicable";
            partial: "partial";
            unknown: "unknown";
            yes: "yes";
        }>>;
        constrained_values: z.ZodArray<z.ZodEnum<{
            no: "no";
            not_applicable: "not_applicable";
            partial: "partial";
            unknown: "unknown";
            yes: "yes";
        }>>;
        fail_values: z.ZodArray<z.ZodEnum<{
            no: "no";
            not_applicable: "not_applicable";
            partial: "partial";
            unknown: "unknown";
            yes: "yes";
        }>>;
        allow_not_applicable: z.ZodBoolean;
        allowed_method_digests: z.ZodArray<z.ZodString>;
        selector_groups: z.ZodArray<z.ZodObject<{
            selector_group_id: z.ZodString;
            coverage: z.ZodEnum<{
                all_matches: "all_matches";
                at_least_one: "at_least_one";
            }>;
            alternatives: z.ZodArray<z.ZodObject<{
                alternative_id: z.ZodString;
                selectors: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"resource_role">;
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
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"endpoint_role">;
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
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"interface_signature">;
                    modalities: z.ZodArray<z.ZodEnum<{
                        agent_service: "agent_service";
                        command_line: "command_line";
                        network_api: "network_api";
                        software_library: "software_library";
                        tool_server: "tool_server";
                        web_application: "web_application";
                    }>>;
                    functions: z.ZodArray<z.ZodEnum<{
                        authentication: "authentication";
                        commerce: "commerce";
                        events: "events";
                        recovery: "recovery";
                        service_operation: "service_operation";
                    }>>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"assessment_target_membership">;
                    membership: z.ZodEnum<{
                        direct: "direct";
                        reachable: "reachable";
                        selected_path: "selected_path";
                    }>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"target_relation">;
                    relation_kind: z.ZodEnum<{
                        alternative_to: "alternative_to";
                        authenticates: "authenticates";
                        describes: "describes";
                        precedes: "precedes";
                        requires: "requires";
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
                            "informational-reference": "informational-reference";
                            tests: "tests";
                        }>;
                    }, z.core.$strict>;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        evidence_terms: z.ZodOptional<z.ZodArray<z.ZodString>>;
        value_evidence: z.ZodArray<z.ZodObject<{
            value: z.ZodEnum<{
                no: "no";
                not_applicable: "not_applicable";
                partial: "partial";
                yes: "yes";
            }>;
            alternatives: z.ZodArray<z.ZodObject<{
                alternative_id: z.ZodString;
                required_basis_kinds: z.ZodArray<z.ZodEnum<{
                    bounded_absence: "bounded_absence";
                    certification_receipt: "certification_receipt";
                    direct_observation: "direct_observation";
                    explicit_first_party_declaration: "explicit_first_party_declaration";
                    service_exchange: "service_exchange";
                    standard_requirement: "standard_requirement";
                }>>;
                minimum_distinct_captures: z.ZodNumber;
                require_independent_capture_rungs: z.ZodBoolean;
                required_artifacts: z.ZodArray<z.ZodEnum<{
                    capture_interaction_trace: "capture_interaction_trace";
                    evidence_excerpt: "evidence_excerpt";
                    interaction_trace: "interaction_trace";
                    manual_review_note: "manual_review_note";
                    screenshot: "screenshot";
                    source_observation: "source_observation";
                    standard_evidence_result: "standard_evidence_result";
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
        fact_question: z.ZodString;
        fact_predicates: z.ZodObject<{
            yes: z.ZodString;
            partial: z.ZodString;
            no: z.ZodString;
            unknown: z.ZodString;
            not_applicable: z.ZodString;
        }, z.core.$strict>;
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
                "informational-reference": "informational-reference";
                tests: "tests";
            }>;
        }, z.core.$strict>>;
        standard_evidence: z.ZodArray<z.ZodObject<{
            requirement: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
                requirement_id: z.ZodString;
                relation: z.ZodEnum<{
                    "informational-reference": "informational-reference";
                    tests: "tests";
                }>;
            }, z.core.$strict>;
            support: z.ZodArray<z.ZodObject<{
                result: z.ZodEnum<{
                    not_satisfied: "not_satisfied";
                    satisfied: "satisfied";
                }>;
                values: z.ZodArray<z.ZodEnum<{
                    no: "no";
                    not_applicable: "not_applicable";
                    partial: "partial";
                    yes: "yes";
                }>>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    aggregation: z.ZodObject<{
        stage: z.ZodLiteral<"worst-signal">;
        overall: z.ZodLiteral<"worst-stage">;
        outcome_precedence: z.ZodArray<z.ZodEnum<{
            constrained: "constrained";
            fail: "fail";
            not_applicable: "not_applicable";
            pass: "pass";
            unknown: "unknown";
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
            "worst-evaluated-signal": "worst-evaluated-signal";
            "worst-required-signal": "worst-required-signal";
            "worst-signal": "worst-signal";
        }>;
    }, z.core.$strict>;
    public_states: z.ZodObject<{
        pass: z.ZodObject<{
            state: z.ZodEnum<{
                blocked: "blocked";
                limited: "limited";
                not_applicable: "not_applicable";
                ready: "ready";
                unknown: "unknown";
            }>;
            label: z.ZodString;
        }, z.core.$strict>;
        constrained: z.ZodObject<{
            state: z.ZodEnum<{
                blocked: "blocked";
                limited: "limited";
                not_applicable: "not_applicable";
                ready: "ready";
                unknown: "unknown";
            }>;
            label: z.ZodString;
        }, z.core.$strict>;
        fail: z.ZodObject<{
            state: z.ZodEnum<{
                blocked: "blocked";
                limited: "limited";
                not_applicable: "not_applicable";
                ready: "ready";
                unknown: "unknown";
            }>;
            label: z.ZodString;
        }, z.core.$strict>;
        unknown: z.ZodObject<{
            state: z.ZodEnum<{
                blocked: "blocked";
                limited: "limited";
                not_applicable: "not_applicable";
                ready: "ready";
                unknown: "unknown";
            }>;
            label: z.ZodString;
        }, z.core.$strict>;
        not_applicable: z.ZodObject<{
            state: z.ZodEnum<{
                blocked: "blocked";
                limited: "limited";
                not_applicable: "not_applicable";
                ready: "ready";
                unknown: "unknown";
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
        unobserved_operation_grade_cap: z.ZodLiteral<"B+">;
        not_applicable_signals: z.ZodLiteral<"excluded">;
        unrated_when: z.ZodObject<{
            coverage: z.ZodLiteral<"not-complete">;
            freshness: z.ZodLiteral<"not-fresh">;
            except: z.ZodLiteral<"fresh-supported-essential-failure">;
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
            final_payment_or_irreversible_commitment: "final_payment_or_irreversible_commitment";
            regulated_approval: "regulated_approval";
        }>>;
        required_handoff_properties: z.ZodArray<z.ZodEnum<{
            deterministic_continuation: "deterministic_continuation";
            exact_disclosure: "exact_disclosure";
            resumable_handoff: "resumable_handoff";
        }>>;
        forbidden_substitutions: z.ZodArray<z.ZodEnum<{
            captcha_solving: "captcha_solving";
            concealed_agent_identity: "concealed_agent_identity";
            human_password_or_session_sharing: "human_password_or_session_sharing";
            invented_eligibility: "invented_eligibility";
            unapproved_consequential_action: "unapproved_consequential_action";
            unbound_out_of_band_code: "unbound_out_of_band_code";
            vendor_policy_bypass: "vendor_policy_bypass";
        }>>;
        success: z.ZodObject<{
            target_coverage: z.ZodLiteral<"every_declared_target">;
            interface_coverage: z.ZodEnum<{
                at_least_one_declared_alternative: "at_least_one_declared_alternative";
                one_selected_interface_per_target: "one_selected_interface_per_target";
            }>;
            authority: z.ZodLiteral<"scoped">;
            failure_semantics: z.ZodLiteral<"documented">;
            recovery: z.ZodLiteral<"supported">;
        }, z.core.$strict>;
        observed_assessment: z.ZodObject<{
            allowed_sources: z.ZodArray<z.ZodEnum<{
                non_mutating_interaction: "non_mutating_interaction";
                operator_attested_public_observation: "operator_attested_public_observation";
                public_documentation: "public_documentation";
                public_endpoints: "public_endpoints";
                public_metadata: "public_metadata";
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
                operate: "operate";
                pay: "pay";
                provision: "provision";
                sign_up: "sign_up";
            }>;
            signal_code: z.ZodString;
            values: z.ZodArray<z.ZodEnum<{
                no: "no";
                not_applicable: "not_applicable";
                partial: "partial";
                yes: "yes";
            }>>;
            determination_bases: z.ZodArray<z.ZodEnum<{
                bounded_absence: "bounded_absence";
                certification_receipt: "certification_receipt";
                direct_observation: "direct_observation";
                explicit_first_party_declaration: "explicit_first_party_declaration";
                service_exchange: "service_exchange";
                standard_requirement: "standard_requirement";
            }>>;
        }, z.core.$strict>>;
        surface_support: z.ZodObject<{
            node_kinds: z.ZodArray<z.ZodEnum<{
                endpoint: "endpoint";
                interface: "interface";
                resource: "resource";
                surface_exclusion: "surface_exclusion";
            }>>;
            resource_roles: z.ZodArray<z.ZodEnum<{
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
            endpoint_roles: z.ZodArray<z.ZodEnum<{
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
            interface_modalities: z.ZodArray<z.ZodEnum<{
                agent_service: "agent_service";
                command_line: "command_line";
                network_api: "network_api";
                software_library: "software_library";
                tool_server: "tool_server";
                web_application: "web_application";
            }>>;
            interface_functions: z.ZodArray<z.ZodEnum<{
                authentication: "authentication";
                commerce: "commerce";
                events: "events";
                recovery: "recovery";
                service_operation: "service_operation";
            }>>;
        }, z.core.$strict>;
        capture: z.ZodObject<{
            rungs: z.ZodArray<z.ZodEnum<{
                archive: "archive";
                headless: "headless";
                http: "http";
                manual: "manual";
            }>>;
            redirects: z.ZodEnum<{
                "allowed-hosts": "allowed-hosts";
                reject: "reject";
                "same-origin": "same-origin";
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
                expand_disclosure: "expand_disclosure";
                follow_link: "follow_link";
                navigate: "navigate";
                scroll: "scroll";
                select_non_submitting_control: "select_non_submitting_control";
                wait: "wait";
            }>>;
            forbidden_effects: z.ZodArray<z.ZodEnum<{
                accept_terms: "accept_terms";
                create_account: "create_account";
                create_key: "create_key";
                enter_credentials: "enter_credentials";
                enter_payment_details: "enter_payment_details";
                invoke_billable_service: "invoke_billable_service";
                provision: "provision";
                purchase: "purchase";
                send_verification_code: "send_verification_code";
                submit_application: "submit_application";
            }>>;
        }, z.core.$strict>;
        required_artifacts: z.ZodArray<z.ZodEnum<{
            capture_interaction_trace: "capture_interaction_trace";
            evidence_excerpt: "evidence_excerpt";
            interaction_trace: "interaction_trace";
            manual_review_note: "manual_review_note";
            screenshot: "screenshot";
            source_observation: "source_observation";
            standard_evidence_result: "standard_evidence_result";
        }>>;
        failure_classes: z.ZodArray<z.ZodEnum<{
            authentication_required: "authentication_required";
            capture_unavailable: "capture_unavailable";
            interaction_budget_exhausted: "interaction_budget_exhausted";
            invalid_structure: "invalid_structure";
            network_failure: "network_failure";
            policy_refusal: "policy_refusal";
            render_failure: "render_failure";
            timeout: "timeout";
        }>>;
        residue_classes: z.ZodArray<z.ZodEnum<{
            conflicting_observations: "conflicting_observations";
            insufficient_determination_basis: "insufficient_determination_basis";
            manual_review_required: "manual_review_required";
            scope_mismatch: "scope_mismatch";
            unresolved_signal: "unresolved_signal";
            unsupported_interaction: "unsupported_interaction";
        }>>;
        external_references: z.ZodArray<z.ZodObject<{
            namespace: z.ZodString;
            version: z.ZodString;
            requirement_id: z.ZodString;
            relation: z.ZodEnum<{
                "informational-reference": "informational-reference";
                tests: "tests";
            }>;
        }, z.core.$strict>>;
        method_digest: z.ZodString;
    }, z.core.$strict>>;
    signal_rules: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
        }>;
        signal_code: z.ZodString;
        evaluation_role: z.ZodEnum<{
            barrier: "barrier";
            graded: "graded";
            informational: "informational";
        }>;
        required: z.ZodBoolean;
        pass_values: z.ZodArray<z.ZodEnum<{
            no: "no";
            not_applicable: "not_applicable";
            partial: "partial";
            unknown: "unknown";
            yes: "yes";
        }>>;
        constrained_values: z.ZodArray<z.ZodEnum<{
            no: "no";
            not_applicable: "not_applicable";
            partial: "partial";
            unknown: "unknown";
            yes: "yes";
        }>>;
        fail_values: z.ZodArray<z.ZodEnum<{
            no: "no";
            not_applicable: "not_applicable";
            partial: "partial";
            unknown: "unknown";
            yes: "yes";
        }>>;
        allow_not_applicable: z.ZodBoolean;
        allowed_method_digests: z.ZodArray<z.ZodString>;
        selector_groups: z.ZodArray<z.ZodObject<{
            selector_group_id: z.ZodString;
            coverage: z.ZodEnum<{
                all_matches: "all_matches";
                at_least_one: "at_least_one";
            }>;
            alternatives: z.ZodArray<z.ZodObject<{
                alternative_id: z.ZodString;
                selectors: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"resource_role">;
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
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"endpoint_role">;
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
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"interface_signature">;
                    modalities: z.ZodArray<z.ZodEnum<{
                        agent_service: "agent_service";
                        command_line: "command_line";
                        network_api: "network_api";
                        software_library: "software_library";
                        tool_server: "tool_server";
                        web_application: "web_application";
                    }>>;
                    functions: z.ZodArray<z.ZodEnum<{
                        authentication: "authentication";
                        commerce: "commerce";
                        events: "events";
                        recovery: "recovery";
                        service_operation: "service_operation";
                    }>>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"assessment_target_membership">;
                    membership: z.ZodEnum<{
                        direct: "direct";
                        reachable: "reachable";
                        selected_path: "selected_path";
                    }>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"target_relation">;
                    relation_kind: z.ZodEnum<{
                        alternative_to: "alternative_to";
                        authenticates: "authenticates";
                        describes: "describes";
                        precedes: "precedes";
                        requires: "requires";
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
                            "informational-reference": "informational-reference";
                            tests: "tests";
                        }>;
                    }, z.core.$strict>;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        evidence_terms: z.ZodOptional<z.ZodArray<z.ZodString>>;
        value_evidence: z.ZodArray<z.ZodObject<{
            value: z.ZodEnum<{
                no: "no";
                not_applicable: "not_applicable";
                partial: "partial";
                yes: "yes";
            }>;
            alternatives: z.ZodArray<z.ZodObject<{
                alternative_id: z.ZodString;
                required_basis_kinds: z.ZodArray<z.ZodEnum<{
                    bounded_absence: "bounded_absence";
                    certification_receipt: "certification_receipt";
                    direct_observation: "direct_observation";
                    explicit_first_party_declaration: "explicit_first_party_declaration";
                    service_exchange: "service_exchange";
                    standard_requirement: "standard_requirement";
                }>>;
                minimum_distinct_captures: z.ZodNumber;
                require_independent_capture_rungs: z.ZodBoolean;
                required_artifacts: z.ZodArray<z.ZodEnum<{
                    capture_interaction_trace: "capture_interaction_trace";
                    evidence_excerpt: "evidence_excerpt";
                    interaction_trace: "interaction_trace";
                    manual_review_note: "manual_review_note";
                    screenshot: "screenshot";
                    source_observation: "source_observation";
                    standard_evidence_result: "standard_evidence_result";
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
        fact_question: z.ZodString;
        fact_predicates: z.ZodObject<{
            yes: z.ZodString;
            partial: z.ZodString;
            no: z.ZodString;
            unknown: z.ZodString;
            not_applicable: z.ZodString;
        }, z.core.$strict>;
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
                "informational-reference": "informational-reference";
                tests: "tests";
            }>;
        }, z.core.$strict>>;
        standard_evidence: z.ZodArray<z.ZodObject<{
            requirement: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
                requirement_id: z.ZodString;
                relation: z.ZodEnum<{
                    "informational-reference": "informational-reference";
                    tests: "tests";
                }>;
            }, z.core.$strict>;
            support: z.ZodArray<z.ZodObject<{
                result: z.ZodEnum<{
                    not_satisfied: "not_satisfied";
                    satisfied: "satisfied";
                }>;
                values: z.ZodArray<z.ZodEnum<{
                    no: "no";
                    not_applicable: "not_applicable";
                    partial: "partial";
                    yes: "yes";
                }>>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    aggregation: z.ZodObject<{
        stage: z.ZodLiteral<"worst-signal">;
        overall: z.ZodLiteral<"worst-stage">;
        outcome_precedence: z.ZodArray<z.ZodEnum<{
            constrained: "constrained";
            fail: "fail";
            not_applicable: "not_applicable";
            pass: "pass";
            unknown: "unknown";
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
            "worst-evaluated-signal": "worst-evaluated-signal";
            "worst-required-signal": "worst-required-signal";
            "worst-signal": "worst-signal";
        }>;
    }, z.core.$strict>;
    public_states: z.ZodObject<{
        pass: z.ZodObject<{
            state: z.ZodEnum<{
                blocked: "blocked";
                limited: "limited";
                not_applicable: "not_applicable";
                ready: "ready";
                unknown: "unknown";
            }>;
            label: z.ZodString;
        }, z.core.$strict>;
        constrained: z.ZodObject<{
            state: z.ZodEnum<{
                blocked: "blocked";
                limited: "limited";
                not_applicable: "not_applicable";
                ready: "ready";
                unknown: "unknown";
            }>;
            label: z.ZodString;
        }, z.core.$strict>;
        fail: z.ZodObject<{
            state: z.ZodEnum<{
                blocked: "blocked";
                limited: "limited";
                not_applicable: "not_applicable";
                ready: "ready";
                unknown: "unknown";
            }>;
            label: z.ZodString;
        }, z.core.$strict>;
        unknown: z.ZodObject<{
            state: z.ZodEnum<{
                blocked: "blocked";
                limited: "limited";
                not_applicable: "not_applicable";
                ready: "ready";
                unknown: "unknown";
            }>;
            label: z.ZodString;
        }, z.core.$strict>;
        not_applicable: z.ZodObject<{
            state: z.ZodEnum<{
                blocked: "blocked";
                limited: "limited";
                not_applicable: "not_applicable";
                ready: "ready";
                unknown: "unknown";
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
        unobserved_operation_grade_cap: z.ZodLiteral<"B+">;
        not_applicable_signals: z.ZodLiteral<"excluded">;
        unrated_when: z.ZodObject<{
            coverage: z.ZodLiteral<"not-complete">;
            freshness: z.ZodLiteral<"not-fresh">;
            except: z.ZodLiteral<"fresh-supported-essential-failure">;
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
        barrier: "barrier";
        graded: "graded";
        informational: "informational";
    }>;
    required: z.ZodBoolean;
    value: z.ZodEnum<{
        no: "no";
        not_applicable: "not_applicable";
        partial: "partial";
        unknown: "unknown";
        yes: "yes";
    }>;
    value_label: z.ZodString;
    outcome: z.ZodEnum<{
        constrained: "constrained";
        fail: "fail";
        not_applicable: "not_applicable";
        pass: "pass";
        unknown: "unknown";
    }>;
    public_state: z.ZodEnum<{
        blocked: "blocked";
        limited: "limited";
        not_applicable: "not_applicable";
        ready: "ready";
        unknown: "unknown";
    }>;
    condition: z.ZodString;
    finding: z.ZodString;
    evidence_status: z.ZodEnum<{
        contradicted: "contradicted";
        missing: "missing";
        mixed: "mixed";
        supported: "supported";
    }>;
    freshness: z.ZodEnum<{
        fresh: "fresh";
        stale: "stale";
        unknown: "unknown";
    }>;
    observed_at: z.ZodOptional<z.ZodISODateTime>;
    tested_surfaces: z.ZodArray<z.ZodObject<{
        node_kind: z.ZodEnum<{
            endpoint: "endpoint";
            interface: "interface";
            resource: "resource";
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
        captures: z.ZodArray<z.ZodObject<{
            retained_capture_digest: z.ZodString;
            capture_rung: z.ZodEnum<{
                archive: "archive";
                headless: "headless";
                http: "http";
                manual: "manual";
            }>;
        }, z.core.$strict>>;
        artifact_digests: z.ZodArray<z.ZodString>;
        kind: z.ZodLiteral<"direct_observation">;
        locators: z.ZodArray<z.ZodObject<{
            artifact_digest: z.ZodString;
            start_byte: z.ZodNumber;
            end_byte: z.ZodNumber;
            value_digest: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>, z.ZodObject<{
        captures: z.ZodArray<z.ZodObject<{
            retained_capture_digest: z.ZodString;
            capture_rung: z.ZodEnum<{
                archive: "archive";
                headless: "headless";
                http: "http";
                manual: "manual";
            }>;
        }, z.core.$strict>>;
        artifact_digests: z.ZodArray<z.ZodString>;
        kind: z.ZodLiteral<"service_exchange">;
        endpoint_id: z.ZodString;
        assessment_target_id: z.ZodString;
        source_observation_digest: z.ZodString;
        approved_request: z.ZodObject<{
            source_url: z.ZodURL;
            request: z.ZodObject<{
                method: z.ZodLiteral<"GET">;
                target_url: z.ZodOptional<z.ZodURL>;
                headers: z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    value: z.ZodString;
                }, z.core.$strict>>;
                success_assertions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    pointer: z.ZodString;
                    equals: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
                }, z.core.$strict>>>;
            }, z.core.$strict>;
        }, z.core.$strict>;
        response_status_code: z.ZodNumber;
        response_content_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        captures: z.ZodArray<z.ZodObject<{
            retained_capture_digest: z.ZodString;
            capture_rung: z.ZodEnum<{
                archive: "archive";
                headless: "headless";
                http: "http";
                manual: "manual";
            }>;
        }, z.core.$strict>>;
        artifact_digests: z.ZodArray<z.ZodString>;
        kind: z.ZodLiteral<"bounded_absence">;
        coverage_scope: z.ZodEnum<{
            exact_funnel: "exact_funnel";
            exact_resource: "exact_resource";
            tested_surfaces: "tested_surfaces";
        }>;
        covered_surfaces: z.ZodArray<z.ZodObject<{
            node_kind: z.ZodEnum<{
                endpoint: "endpoint";
                interface: "interface";
                resource: "resource";
                surface_exclusion: "surface_exclusion";
            }>;
            node_id: z.ZodString;
        }, z.core.$strict>>;
        covered_branches: z.ZodNumber;
    }, z.core.$strict>, z.ZodObject<{
        captures: z.ZodArray<z.ZodObject<{
            retained_capture_digest: z.ZodString;
            capture_rung: z.ZodEnum<{
                archive: "archive";
                headless: "headless";
                http: "http";
                manual: "manual";
            }>;
        }, z.core.$strict>>;
        artifact_digests: z.ZodArray<z.ZodString>;
        kind: z.ZodLiteral<"explicit_first_party_declaration">;
        source_surface: z.ZodObject<{
            node_kind: z.ZodEnum<{
                endpoint: "endpoint";
                interface: "interface";
                resource: "resource";
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
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"standard_requirement">;
        adapter_digest: z.ZodString;
        evidence_record_digest: z.ZodString;
        requirement: z.ZodObject<{
            namespace: z.ZodString;
            version: z.ZodString;
            requirement_id: z.ZodString;
            relation: z.ZodEnum<{
                "informational-reference": "informational-reference";
                tests: "tests";
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
        operate: "operate";
        pay: "pay";
        provision: "provision";
        sign_up: "sign_up";
    }>;
    stage_label: z.ZodString;
    outcome: z.ZodEnum<{
        constrained: "constrained";
        fail: "fail";
        not_applicable: "not_applicable";
        pass: "pass";
        unknown: "unknown";
    }>;
    public_state: z.ZodEnum<{
        blocked: "blocked";
        limited: "limited";
        not_applicable: "not_applicable";
        ready: "ready";
        unknown: "unknown";
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
            barrier: "barrier";
            graded: "graded";
            informational: "informational";
        }>;
        required: z.ZodBoolean;
        value: z.ZodEnum<{
            no: "no";
            not_applicable: "not_applicable";
            partial: "partial";
            unknown: "unknown";
            yes: "yes";
        }>;
        value_label: z.ZodString;
        outcome: z.ZodEnum<{
            constrained: "constrained";
            fail: "fail";
            not_applicable: "not_applicable";
            pass: "pass";
            unknown: "unknown";
        }>;
        public_state: z.ZodEnum<{
            blocked: "blocked";
            limited: "limited";
            not_applicable: "not_applicable";
            ready: "ready";
            unknown: "unknown";
        }>;
        condition: z.ZodString;
        finding: z.ZodString;
        evidence_status: z.ZodEnum<{
            contradicted: "contradicted";
            missing: "missing";
            mixed: "mixed";
            supported: "supported";
        }>;
        freshness: z.ZodEnum<{
            fresh: "fresh";
            stale: "stale";
            unknown: "unknown";
        }>;
        observed_at: z.ZodOptional<z.ZodISODateTime>;
        tested_surfaces: z.ZodArray<z.ZodObject<{
            node_kind: z.ZodEnum<{
                endpoint: "endpoint";
                interface: "interface";
                resource: "resource";
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
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"direct_observation">;
            locators: z.ZodArray<z.ZodObject<{
                artifact_digest: z.ZodString;
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>, z.ZodObject<{
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"service_exchange">;
            endpoint_id: z.ZodString;
            assessment_target_id: z.ZodString;
            source_observation_digest: z.ZodString;
            approved_request: z.ZodObject<{
                source_url: z.ZodURL;
                request: z.ZodObject<{
                    method: z.ZodLiteral<"GET">;
                    target_url: z.ZodOptional<z.ZodURL>;
                    headers: z.ZodArray<z.ZodObject<{
                        name: z.ZodString;
                        value: z.ZodString;
                    }, z.core.$strict>>;
                    success_assertions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                        pointer: z.ZodString;
                        equals: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
                    }, z.core.$strict>>>;
                }, z.core.$strict>;
            }, z.core.$strict>;
            response_status_code: z.ZodNumber;
            response_content_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"bounded_absence">;
            coverage_scope: z.ZodEnum<{
                exact_funnel: "exact_funnel";
                exact_resource: "exact_resource";
                tested_surfaces: "tested_surfaces";
            }>;
            covered_surfaces: z.ZodArray<z.ZodObject<{
                node_kind: z.ZodEnum<{
                    endpoint: "endpoint";
                    interface: "interface";
                    resource: "resource";
                    surface_exclusion: "surface_exclusion";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>>;
            covered_branches: z.ZodNumber;
        }, z.core.$strict>, z.ZodObject<{
            captures: z.ZodArray<z.ZodObject<{
                retained_capture_digest: z.ZodString;
                capture_rung: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
            }, z.core.$strict>>;
            artifact_digests: z.ZodArray<z.ZodString>;
            kind: z.ZodLiteral<"explicit_first_party_declaration">;
            source_surface: z.ZodObject<{
                node_kind: z.ZodEnum<{
                    endpoint: "endpoint";
                    interface: "interface";
                    resource: "resource";
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
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"standard_requirement">;
            adapter_digest: z.ZodString;
            evidence_record_digest: z.ZodString;
            requirement: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
                requirement_id: z.ZodString;
                relation: z.ZodEnum<{
                    "informational-reference": "informational-reference";
                    tests: "tests";
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
        assessment_targets: z.ZodArray<z.ZodObject<{
            target_id: z.ZodString;
            name: z.ZodString;
            interface_ids: z.ZodArray<z.ZodString>;
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
            final_payment_or_irreversible_commitment: "final_payment_or_irreversible_commitment";
            regulated_approval: "regulated_approval";
        }>>;
        required_handoff_properties: z.ZodArray<z.ZodEnum<{
            deterministic_continuation: "deterministic_continuation";
            exact_disclosure: "exact_disclosure";
            resumable_handoff: "resumable_handoff";
        }>>;
        forbidden_substitutions: z.ZodArray<z.ZodEnum<{
            captcha_solving: "captcha_solving";
            concealed_agent_identity: "concealed_agent_identity";
            human_password_or_session_sharing: "human_password_or_session_sharing";
            invented_eligibility: "invented_eligibility";
            unapproved_consequential_action: "unapproved_consequential_action";
            unbound_out_of_band_code: "unbound_out_of_band_code";
            vendor_policy_bypass: "vendor_policy_bypass";
        }>>;
        success: z.ZodObject<{
            target_coverage: z.ZodLiteral<"every_declared_target">;
            interface_coverage: z.ZodEnum<{
                at_least_one_declared_alternative: "at_least_one_declared_alternative";
                one_selected_interface_per_target: "one_selected_interface_per_target";
            }>;
            authority: z.ZodLiteral<"scoped">;
            failure_semantics: z.ZodLiteral<"documented">;
            recovery: z.ZodLiteral<"supported">;
        }, z.core.$strict>;
        observed_assessment: z.ZodObject<{
            allowed_sources: z.ZodArray<z.ZodEnum<{
                non_mutating_interaction: "non_mutating_interaction";
                operator_attested_public_observation: "operator_attested_public_observation";
                public_documentation: "public_documentation";
                public_endpoints: "public_endpoints";
                public_metadata: "public_metadata";
            }>>;
            consequential_claims: z.ZodLiteral<"certification_required">;
        }, z.core.$strict>;
    }, z.core.$strict>;
    overall_outcome: z.ZodEnum<{
        constrained: "constrained";
        fail: "fail";
        not_applicable: "not_applicable";
        pass: "pass";
        unknown: "unknown";
    }>;
    public_state: z.ZodEnum<{
        blocked: "blocked";
        limited: "limited";
        not_applicable: "not_applicable";
        ready: "ready";
        unknown: "unknown";
    }>;
    state_label: z.ZodString;
    grade: z.ZodEnum<{
        A: "A";
        "A+": "A+";
        B: "B";
        "B+": "B+";
        C: "C";
        "C+": "C+";
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
            private: "private";
            resolvable_only: "resolvable_only";
        }>;
        reasons: z.ZodArray<z.ZodEnum<{
            coverage_incomplete: "coverage_incomplete";
            freshness_not_fresh: "freshness_not_fresh";
            lifecycle_not_active: "lifecycle_not_active";
            no_useful_finding: "no_useful_finding";
            open_dispute: "open_dispute";
            required_evidence_not_supported: "required_evidence_not_supported";
            unrated: "unrated";
        }>>;
    }, z.core.$strict>;
    primary_finding: z.ZodOptional<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
        }>;
        stage_label: z.ZodString;
        public_state: z.ZodEnum<{
            blocked: "blocked";
            limited: "limited";
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
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
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
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
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
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
        }>;
        stage_label: z.ZodString;
        outcome: z.ZodEnum<{
            constrained: "constrained";
            fail: "fail";
            not_applicable: "not_applicable";
            pass: "pass";
            unknown: "unknown";
        }>;
        public_state: z.ZodEnum<{
            blocked: "blocked";
            limited: "limited";
            not_applicable: "not_applicable";
            ready: "ready";
            unknown: "unknown";
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
                barrier: "barrier";
                graded: "graded";
                informational: "informational";
            }>;
            required: z.ZodBoolean;
            value: z.ZodEnum<{
                no: "no";
                not_applicable: "not_applicable";
                partial: "partial";
                unknown: "unknown";
                yes: "yes";
            }>;
            value_label: z.ZodString;
            outcome: z.ZodEnum<{
                constrained: "constrained";
                fail: "fail";
                not_applicable: "not_applicable";
                pass: "pass";
                unknown: "unknown";
            }>;
            public_state: z.ZodEnum<{
                blocked: "blocked";
                limited: "limited";
                not_applicable: "not_applicable";
                ready: "ready";
                unknown: "unknown";
            }>;
            condition: z.ZodString;
            finding: z.ZodString;
            evidence_status: z.ZodEnum<{
                contradicted: "contradicted";
                missing: "missing";
                mixed: "mixed";
                supported: "supported";
            }>;
            freshness: z.ZodEnum<{
                fresh: "fresh";
                stale: "stale";
                unknown: "unknown";
            }>;
            observed_at: z.ZodOptional<z.ZodISODateTime>;
            tested_surfaces: z.ZodArray<z.ZodObject<{
                node_kind: z.ZodEnum<{
                    endpoint: "endpoint";
                    interface: "interface";
                    resource: "resource";
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
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        archive: "archive";
                        headless: "headless";
                        http: "http";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"direct_observation">;
                locators: z.ZodArray<z.ZodObject<{
                    artifact_digest: z.ZodString;
                    start_byte: z.ZodNumber;
                    end_byte: z.ZodNumber;
                    value_digest: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>, z.ZodObject<{
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        archive: "archive";
                        headless: "headless";
                        http: "http";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"service_exchange">;
                endpoint_id: z.ZodString;
                assessment_target_id: z.ZodString;
                source_observation_digest: z.ZodString;
                approved_request: z.ZodObject<{
                    source_url: z.ZodURL;
                    request: z.ZodObject<{
                        method: z.ZodLiteral<"GET">;
                        target_url: z.ZodOptional<z.ZodURL>;
                        headers: z.ZodArray<z.ZodObject<{
                            name: z.ZodString;
                            value: z.ZodString;
                        }, z.core.$strict>>;
                        success_assertions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                            pointer: z.ZodString;
                            equals: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
                        }, z.core.$strict>>>;
                    }, z.core.$strict>;
                }, z.core.$strict>;
                response_status_code: z.ZodNumber;
                response_content_digest: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        archive: "archive";
                        headless: "headless";
                        http: "http";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"bounded_absence">;
                coverage_scope: z.ZodEnum<{
                    exact_funnel: "exact_funnel";
                    exact_resource: "exact_resource";
                    tested_surfaces: "tested_surfaces";
                }>;
                covered_surfaces: z.ZodArray<z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        endpoint: "endpoint";
                        interface: "interface";
                        resource: "resource";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>>;
                covered_branches: z.ZodNumber;
            }, z.core.$strict>, z.ZodObject<{
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        archive: "archive";
                        headless: "headless";
                        http: "http";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"explicit_first_party_declaration">;
                source_surface: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        endpoint: "endpoint";
                        interface: "interface";
                        resource: "resource";
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
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"standard_requirement">;
                adapter_digest: z.ZodString;
                evidence_record_digest: z.ZodString;
                requirement: z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                    requirement_id: z.ZodString;
                    relation: z.ZodEnum<{
                        "informational-reference": "informational-reference";
                        tests: "tests";
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
            complete: "complete";
            incomplete: "incomplete";
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
        fresh: "fresh";
        stale: "stale";
        unknown: "unknown";
    }>;
    provenance: z.ZodObject<{
        freshness: z.ZodEnum<{
            fresh: "fresh";
            stale: "stale";
            unknown: "unknown";
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
                attested: "attested";
                derived: "derived";
                editorial: "editorial";
                observed: "observed";
            }>>;
            evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                attested: "attested";
                derived: "derived";
                editorial: "editorial";
                observed: "observed";
            }>>;
            latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
            freshness: z.ZodEnum<{
                fresh: "fresh";
                stale: "stale";
                unknown: "unknown";
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
        assessment_targets: z.ZodArray<z.ZodObject<{
            target_id: z.ZodString;
            name: z.ZodString;
            interface_ids: z.ZodArray<z.ZodString>;
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
            final_payment_or_irreversible_commitment: "final_payment_or_irreversible_commitment";
            regulated_approval: "regulated_approval";
        }>>;
        required_handoff_properties: z.ZodArray<z.ZodEnum<{
            deterministic_continuation: "deterministic_continuation";
            exact_disclosure: "exact_disclosure";
            resumable_handoff: "resumable_handoff";
        }>>;
        forbidden_substitutions: z.ZodArray<z.ZodEnum<{
            captcha_solving: "captcha_solving";
            concealed_agent_identity: "concealed_agent_identity";
            human_password_or_session_sharing: "human_password_or_session_sharing";
            invented_eligibility: "invented_eligibility";
            unapproved_consequential_action: "unapproved_consequential_action";
            unbound_out_of_band_code: "unbound_out_of_band_code";
            vendor_policy_bypass: "vendor_policy_bypass";
        }>>;
        success: z.ZodObject<{
            target_coverage: z.ZodLiteral<"every_declared_target">;
            interface_coverage: z.ZodEnum<{
                at_least_one_declared_alternative: "at_least_one_declared_alternative";
                one_selected_interface_per_target: "one_selected_interface_per_target";
            }>;
            authority: z.ZodLiteral<"scoped">;
            failure_semantics: z.ZodLiteral<"documented">;
            recovery: z.ZodLiteral<"supported">;
        }, z.core.$strict>;
        observed_assessment: z.ZodObject<{
            allowed_sources: z.ZodArray<z.ZodEnum<{
                non_mutating_interaction: "non_mutating_interaction";
                operator_attested_public_observation: "operator_attested_public_observation";
                public_documentation: "public_documentation";
                public_endpoints: "public_endpoints";
                public_metadata: "public_metadata";
            }>>;
            consequential_claims: z.ZodLiteral<"certification_required">;
        }, z.core.$strict>;
    }, z.core.$strict>;
    overall_outcome: z.ZodEnum<{
        constrained: "constrained";
        fail: "fail";
        not_applicable: "not_applicable";
        pass: "pass";
        unknown: "unknown";
    }>;
    public_state: z.ZodEnum<{
        blocked: "blocked";
        limited: "limited";
        not_applicable: "not_applicable";
        ready: "ready";
        unknown: "unknown";
    }>;
    state_label: z.ZodString;
    grade: z.ZodEnum<{
        A: "A";
        "A+": "A+";
        B: "B";
        "B+": "B+";
        C: "C";
        "C+": "C+";
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
            private: "private";
            resolvable_only: "resolvable_only";
        }>;
        reasons: z.ZodArray<z.ZodEnum<{
            coverage_incomplete: "coverage_incomplete";
            freshness_not_fresh: "freshness_not_fresh";
            lifecycle_not_active: "lifecycle_not_active";
            no_useful_finding: "no_useful_finding";
            open_dispute: "open_dispute";
            required_evidence_not_supported: "required_evidence_not_supported";
            unrated: "unrated";
        }>>;
    }, z.core.$strict>;
    primary_finding: z.ZodOptional<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
        }>;
        stage_label: z.ZodString;
        public_state: z.ZodEnum<{
            blocked: "blocked";
            limited: "limited";
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
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
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
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
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
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
        }>;
        stage_label: z.ZodString;
        outcome: z.ZodEnum<{
            constrained: "constrained";
            fail: "fail";
            not_applicable: "not_applicable";
            pass: "pass";
            unknown: "unknown";
        }>;
        public_state: z.ZodEnum<{
            blocked: "blocked";
            limited: "limited";
            not_applicable: "not_applicable";
            ready: "ready";
            unknown: "unknown";
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
                barrier: "barrier";
                graded: "graded";
                informational: "informational";
            }>;
            required: z.ZodBoolean;
            value: z.ZodEnum<{
                no: "no";
                not_applicable: "not_applicable";
                partial: "partial";
                unknown: "unknown";
                yes: "yes";
            }>;
            value_label: z.ZodString;
            outcome: z.ZodEnum<{
                constrained: "constrained";
                fail: "fail";
                not_applicable: "not_applicable";
                pass: "pass";
                unknown: "unknown";
            }>;
            public_state: z.ZodEnum<{
                blocked: "blocked";
                limited: "limited";
                not_applicable: "not_applicable";
                ready: "ready";
                unknown: "unknown";
            }>;
            condition: z.ZodString;
            finding: z.ZodString;
            evidence_status: z.ZodEnum<{
                contradicted: "contradicted";
                missing: "missing";
                mixed: "mixed";
                supported: "supported";
            }>;
            freshness: z.ZodEnum<{
                fresh: "fresh";
                stale: "stale";
                unknown: "unknown";
            }>;
            observed_at: z.ZodOptional<z.ZodISODateTime>;
            tested_surfaces: z.ZodArray<z.ZodObject<{
                node_kind: z.ZodEnum<{
                    endpoint: "endpoint";
                    interface: "interface";
                    resource: "resource";
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
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        archive: "archive";
                        headless: "headless";
                        http: "http";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"direct_observation">;
                locators: z.ZodArray<z.ZodObject<{
                    artifact_digest: z.ZodString;
                    start_byte: z.ZodNumber;
                    end_byte: z.ZodNumber;
                    value_digest: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>, z.ZodObject<{
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        archive: "archive";
                        headless: "headless";
                        http: "http";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"service_exchange">;
                endpoint_id: z.ZodString;
                assessment_target_id: z.ZodString;
                source_observation_digest: z.ZodString;
                approved_request: z.ZodObject<{
                    source_url: z.ZodURL;
                    request: z.ZodObject<{
                        method: z.ZodLiteral<"GET">;
                        target_url: z.ZodOptional<z.ZodURL>;
                        headers: z.ZodArray<z.ZodObject<{
                            name: z.ZodString;
                            value: z.ZodString;
                        }, z.core.$strict>>;
                        success_assertions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                            pointer: z.ZodString;
                            equals: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
                        }, z.core.$strict>>>;
                    }, z.core.$strict>;
                }, z.core.$strict>;
                response_status_code: z.ZodNumber;
                response_content_digest: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        archive: "archive";
                        headless: "headless";
                        http: "http";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"bounded_absence">;
                coverage_scope: z.ZodEnum<{
                    exact_funnel: "exact_funnel";
                    exact_resource: "exact_resource";
                    tested_surfaces: "tested_surfaces";
                }>;
                covered_surfaces: z.ZodArray<z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        endpoint: "endpoint";
                        interface: "interface";
                        resource: "resource";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>>;
                covered_branches: z.ZodNumber;
            }, z.core.$strict>, z.ZodObject<{
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        archive: "archive";
                        headless: "headless";
                        http: "http";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"explicit_first_party_declaration">;
                source_surface: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        endpoint: "endpoint";
                        interface: "interface";
                        resource: "resource";
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
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"standard_requirement">;
                adapter_digest: z.ZodString;
                evidence_record_digest: z.ZodString;
                requirement: z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                    requirement_id: z.ZodString;
                    relation: z.ZodEnum<{
                        "informational-reference": "informational-reference";
                        tests: "tests";
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
            complete: "complete";
            incomplete: "incomplete";
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
        fresh: "fresh";
        stale: "stale";
        unknown: "unknown";
    }>;
    provenance: z.ZodObject<{
        freshness: z.ZodEnum<{
            fresh: "fresh";
            stale: "stale";
            unknown: "unknown";
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
                attested: "attested";
                derived: "derived";
                editorial: "editorial";
                observed: "observed";
            }>>;
            evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                attested: "attested";
                derived: "derived";
                editorial: "editorial";
                observed: "observed";
            }>>;
            latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
            freshness: z.ZodEnum<{
                fresh: "fresh";
                stale: "stale";
                unknown: "unknown";
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
    stage: z.ZodEnum<{
        evaluate: "evaluate";
        operate: "operate";
        pay: "pay";
        provision: "provision";
        sign_up: "sign_up";
    }>;
    stage_label: z.ZodString;
    outcome: z.ZodEnum<{
        constrained: "constrained";
        fail: "fail";
        not_applicable: "not_applicable";
        pass: "pass";
        unknown: "unknown";
    }>;
    public_state: z.ZodEnum<{
        blocked: "blocked";
        limited: "limited";
        not_applicable: "not_applicable";
        ready: "ready";
        unknown: "unknown";
    }>;
    state_label: z.ZodString;
    primary_finding: z.ZodObject<{
        signal_code: z.ZodString;
        condition: z.ZodString;
        finding: z.ZodString;
        context: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const agentReadinessProvenanceSummarySchema: z.ZodObject<{
    freshness: z.ZodEnum<{
        fresh: "fresh";
        stale: "stale";
        unknown: "unknown";
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
    overall_outcome: z.ZodEnum<{
        constrained: "constrained";
        fail: "fail";
        not_applicable: "not_applicable";
        pass: "pass";
        unknown: "unknown";
    }>;
    public_state: z.ZodEnum<{
        blocked: "blocked";
        limited: "limited";
        not_applicable: "not_applicable";
        ready: "ready";
        unknown: "unknown";
    }>;
    state_label: z.ZodString;
    grade: z.ZodEnum<{
        A: "A";
        "A+": "A+";
        B: "B";
        "B+": "B+";
        C: "C";
        "C+": "C+";
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
            private: "private";
            resolvable_only: "resolvable_only";
        }>;
        reasons: z.ZodArray<z.ZodEnum<{
            coverage_incomplete: "coverage_incomplete";
            freshness_not_fresh: "freshness_not_fresh";
            lifecycle_not_active: "lifecycle_not_active";
            no_useful_finding: "no_useful_finding";
            open_dispute: "open_dispute";
            required_evidence_not_supported: "required_evidence_not_supported";
            unrated: "unrated";
        }>>;
    }, z.core.$strict>;
    primary_finding: z.ZodOptional<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
        }>;
        stage_label: z.ZodString;
        public_state: z.ZodEnum<{
            blocked: "blocked";
            limited: "limited";
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
    coverage: z.ZodObject<{
        status: z.ZodEnum<{
            complete: "complete";
            incomplete: "incomplete";
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
        fresh: "fresh";
        stale: "stale";
        unknown: "unknown";
    }>;
    canonical_url: z.ZodURL;
    projection_digest: z.ZodString;
    stages: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
        }>;
        stage_label: z.ZodString;
        outcome: z.ZodEnum<{
            constrained: "constrained";
            fail: "fail";
            not_applicable: "not_applicable";
            pass: "pass";
            unknown: "unknown";
        }>;
        public_state: z.ZodEnum<{
            blocked: "blocked";
            limited: "limited";
            not_applicable: "not_applicable";
            ready: "ready";
            unknown: "unknown";
        }>;
        state_label: z.ZodString;
        primary_finding: z.ZodObject<{
            signal_code: z.ZodString;
            condition: z.ZodString;
            finding: z.ZodString;
            context: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
    }, z.core.$strict>>;
    provenance: z.ZodObject<{
        freshness: z.ZodEnum<{
            fresh: "fresh";
            stale: "stale";
            unknown: "unknown";
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
            private: "private";
            resolvable_only: "resolvable_only";
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
        operating_path: "operating_path";
        redemption_path: "redemption_path";
    }>;
    applicable_stages: z.ZodArray<z.ZodEnum<{
        evaluate: "evaluate";
        operate: "operate";
        pay: "pay";
        provision: "provision";
        sign_up: "sign_up";
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
        operating_path: "operating_path";
        redemption_path: "redemption_path";
    }>;
    applicable_stages: z.ZodArray<z.ZodEnum<{
        evaluate: "evaluate";
        operate: "operate";
        pay: "pay";
        provision: "provision";
        sign_up: "sign_up";
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
            operating_path: "operating_path";
            redemption_path: "redemption_path";
        }>;
        applicable_stages: z.ZodArray<z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
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
            operating_path: "operating_path";
            redemption_path: "redemption_path";
        }>;
        applicable_stages: z.ZodArray<z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
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
            operating_path: "operating_path";
            redemption_path: "redemption_path";
        }>;
        applicable_stages: z.ZodArray<z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
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
            operating_path: "operating_path";
            redemption_path: "redemption_path";
        }>;
        applicable_stages: z.ZodArray<z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
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
            operating_path: "operating_path";
            redemption_path: "redemption_path";
        }>;
        applicable_stages: z.ZodArray<z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
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
                declaration_id: z.ZodString;
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
                assessment_targets: z.ZodArray<z.ZodObject<{
                    target_id: z.ZodString;
                    name: z.ZodString;
                    interface_ids: z.ZodArray<z.ZodString>;
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
                            assessment_target: "assessment_target";
                            declaration: "declaration";
                            endpoint: "endpoint";
                            interface: "interface";
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
        applicable_stages: z.ZodArray<z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
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
        signals: z.ZodArray<z.ZodObject<{
            stage: z.ZodEnum<{
                evaluate: "evaluate";
                operate: "operate";
                pay: "pay";
                provision: "provision";
                sign_up: "sign_up";
            }>;
            signal_code: z.ZodString;
            selector_group_id: z.ZodString;
            value: z.ZodEnum<{
                no: "no";
                not_applicable: "not_applicable";
                partial: "partial";
                unknown: "unknown";
                yes: "yes";
            }>;
            observed_at: z.ZodISODateTime;
            tested_surfaces: z.ZodArray<z.ZodObject<{
                node_kind: z.ZodEnum<{
                    endpoint: "endpoint";
                    interface: "interface";
                    resource: "resource";
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
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        archive: "archive";
                        headless: "headless";
                        http: "http";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"direct_observation">;
                locators: z.ZodArray<z.ZodObject<{
                    artifact_digest: z.ZodString;
                    start_byte: z.ZodNumber;
                    end_byte: z.ZodNumber;
                    value_digest: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>, z.ZodObject<{
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        archive: "archive";
                        headless: "headless";
                        http: "http";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"service_exchange">;
                endpoint_id: z.ZodString;
                assessment_target_id: z.ZodString;
                source_observation_digest: z.ZodString;
                approved_request: z.ZodObject<{
                    source_url: z.ZodURL;
                    request: z.ZodObject<{
                        method: z.ZodLiteral<"GET">;
                        target_url: z.ZodOptional<z.ZodURL>;
                        headers: z.ZodArray<z.ZodObject<{
                            name: z.ZodString;
                            value: z.ZodString;
                        }, z.core.$strict>>;
                        success_assertions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                            pointer: z.ZodString;
                            equals: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
                        }, z.core.$strict>>>;
                    }, z.core.$strict>;
                }, z.core.$strict>;
                response_status_code: z.ZodNumber;
                response_content_digest: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        archive: "archive";
                        headless: "headless";
                        http: "http";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"bounded_absence">;
                coverage_scope: z.ZodEnum<{
                    exact_funnel: "exact_funnel";
                    exact_resource: "exact_resource";
                    tested_surfaces: "tested_surfaces";
                }>;
                covered_surfaces: z.ZodArray<z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        endpoint: "endpoint";
                        interface: "interface";
                        resource: "resource";
                        surface_exclusion: "surface_exclusion";
                    }>;
                    node_id: z.ZodString;
                }, z.core.$strict>>;
                covered_branches: z.ZodNumber;
            }, z.core.$strict>, z.ZodObject<{
                captures: z.ZodArray<z.ZodObject<{
                    retained_capture_digest: z.ZodString;
                    capture_rung: z.ZodEnum<{
                        archive: "archive";
                        headless: "headless";
                        http: "http";
                        manual: "manual";
                    }>;
                }, z.core.$strict>>;
                artifact_digests: z.ZodArray<z.ZodString>;
                kind: z.ZodLiteral<"explicit_first_party_declaration">;
                source_surface: z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        endpoint: "endpoint";
                        interface: "interface";
                        resource: "resource";
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
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"standard_requirement">;
                adapter_digest: z.ZodString;
                evidence_record_digest: z.ZodString;
                requirement: z.ZodObject<{
                    namespace: z.ZodString;
                    version: z.ZodString;
                    requirement_id: z.ZodString;
                    relation: z.ZodEnum<{
                        "informational-reference": "informational-reference";
                        tests: "tests";
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
        evidence_bindings: z.ZodArray<z.ZodObject<{
            stage: z.ZodEnum<{
                evaluate: "evaluate";
                operate: "operate";
                pay: "pay";
                provision: "provision";
                sign_up: "sign_up";
            }>;
            signal_code: z.ZodString;
            evidence_event_ids: z.ZodArray<z.ZodString>;
            observation_ids: z.ZodArray<z.ZodString>;
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
            assessment_targets: z.ZodArray<z.ZodObject<{
                target_id: z.ZodString;
                name: z.ZodString;
                interface_ids: z.ZodArray<z.ZodString>;
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
                final_payment_or_irreversible_commitment: "final_payment_or_irreversible_commitment";
                regulated_approval: "regulated_approval";
            }>>;
            required_handoff_properties: z.ZodArray<z.ZodEnum<{
                deterministic_continuation: "deterministic_continuation";
                exact_disclosure: "exact_disclosure";
                resumable_handoff: "resumable_handoff";
            }>>;
            forbidden_substitutions: z.ZodArray<z.ZodEnum<{
                captcha_solving: "captcha_solving";
                concealed_agent_identity: "concealed_agent_identity";
                human_password_or_session_sharing: "human_password_or_session_sharing";
                invented_eligibility: "invented_eligibility";
                unapproved_consequential_action: "unapproved_consequential_action";
                unbound_out_of_band_code: "unbound_out_of_band_code";
                vendor_policy_bypass: "vendor_policy_bypass";
            }>>;
            success: z.ZodObject<{
                target_coverage: z.ZodLiteral<"every_declared_target">;
                interface_coverage: z.ZodEnum<{
                    at_least_one_declared_alternative: "at_least_one_declared_alternative";
                    one_selected_interface_per_target: "one_selected_interface_per_target";
                }>;
                authority: z.ZodLiteral<"scoped">;
                failure_semantics: z.ZodLiteral<"documented">;
                recovery: z.ZodLiteral<"supported">;
            }, z.core.$strict>;
            observed_assessment: z.ZodObject<{
                allowed_sources: z.ZodArray<z.ZodEnum<{
                    non_mutating_interaction: "non_mutating_interaction";
                    operator_attested_public_observation: "operator_attested_public_observation";
                    public_documentation: "public_documentation";
                    public_endpoints: "public_endpoints";
                    public_metadata: "public_metadata";
                }>>;
                consequential_claims: z.ZodLiteral<"certification_required">;
            }, z.core.$strict>;
        }, z.core.$strict>;
        overall_outcome: z.ZodEnum<{
            constrained: "constrained";
            fail: "fail";
            not_applicable: "not_applicable";
            pass: "pass";
            unknown: "unknown";
        }>;
        public_state: z.ZodEnum<{
            blocked: "blocked";
            limited: "limited";
            not_applicable: "not_applicable";
            ready: "ready";
            unknown: "unknown";
        }>;
        state_label: z.ZodString;
        grade: z.ZodEnum<{
            A: "A";
            "A+": "A+";
            B: "B";
            "B+": "B+";
            C: "C";
            "C+": "C+";
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
                private: "private";
                resolvable_only: "resolvable_only";
            }>;
            reasons: z.ZodArray<z.ZodEnum<{
                coverage_incomplete: "coverage_incomplete";
                freshness_not_fresh: "freshness_not_fresh";
                lifecycle_not_active: "lifecycle_not_active";
                no_useful_finding: "no_useful_finding";
                open_dispute: "open_dispute";
                required_evidence_not_supported: "required_evidence_not_supported";
                unrated: "unrated";
            }>>;
        }, z.core.$strict>;
        primary_finding: z.ZodOptional<z.ZodObject<{
            stage: z.ZodEnum<{
                evaluate: "evaluate";
                operate: "operate";
                pay: "pay";
                provision: "provision";
                sign_up: "sign_up";
            }>;
            stage_label: z.ZodString;
            public_state: z.ZodEnum<{
                blocked: "blocked";
                limited: "limited";
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
                operate: "operate";
                pay: "pay";
                provision: "provision";
                sign_up: "sign_up";
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
                operate: "operate";
                pay: "pay";
                provision: "provision";
                sign_up: "sign_up";
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
                operate: "operate";
                pay: "pay";
                provision: "provision";
                sign_up: "sign_up";
            }>;
            stage_label: z.ZodString;
            outcome: z.ZodEnum<{
                constrained: "constrained";
                fail: "fail";
                not_applicable: "not_applicable";
                pass: "pass";
                unknown: "unknown";
            }>;
            public_state: z.ZodEnum<{
                blocked: "blocked";
                limited: "limited";
                not_applicable: "not_applicable";
                ready: "ready";
                unknown: "unknown";
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
                    barrier: "barrier";
                    graded: "graded";
                    informational: "informational";
                }>;
                required: z.ZodBoolean;
                value: z.ZodEnum<{
                    no: "no";
                    not_applicable: "not_applicable";
                    partial: "partial";
                    unknown: "unknown";
                    yes: "yes";
                }>;
                value_label: z.ZodString;
                outcome: z.ZodEnum<{
                    constrained: "constrained";
                    fail: "fail";
                    not_applicable: "not_applicable";
                    pass: "pass";
                    unknown: "unknown";
                }>;
                public_state: z.ZodEnum<{
                    blocked: "blocked";
                    limited: "limited";
                    not_applicable: "not_applicable";
                    ready: "ready";
                    unknown: "unknown";
                }>;
                condition: z.ZodString;
                finding: z.ZodString;
                evidence_status: z.ZodEnum<{
                    contradicted: "contradicted";
                    missing: "missing";
                    mixed: "mixed";
                    supported: "supported";
                }>;
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                observed_at: z.ZodOptional<z.ZodISODateTime>;
                tested_surfaces: z.ZodArray<z.ZodObject<{
                    node_kind: z.ZodEnum<{
                        endpoint: "endpoint";
                        interface: "interface";
                        resource: "resource";
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
                    captures: z.ZodArray<z.ZodObject<{
                        retained_capture_digest: z.ZodString;
                        capture_rung: z.ZodEnum<{
                            archive: "archive";
                            headless: "headless";
                            http: "http";
                            manual: "manual";
                        }>;
                    }, z.core.$strict>>;
                    artifact_digests: z.ZodArray<z.ZodString>;
                    kind: z.ZodLiteral<"direct_observation">;
                    locators: z.ZodArray<z.ZodObject<{
                        artifact_digest: z.ZodString;
                        start_byte: z.ZodNumber;
                        end_byte: z.ZodNumber;
                        value_digest: z.ZodString;
                    }, z.core.$strict>>;
                }, z.core.$strict>, z.ZodObject<{
                    captures: z.ZodArray<z.ZodObject<{
                        retained_capture_digest: z.ZodString;
                        capture_rung: z.ZodEnum<{
                            archive: "archive";
                            headless: "headless";
                            http: "http";
                            manual: "manual";
                        }>;
                    }, z.core.$strict>>;
                    artifact_digests: z.ZodArray<z.ZodString>;
                    kind: z.ZodLiteral<"service_exchange">;
                    endpoint_id: z.ZodString;
                    assessment_target_id: z.ZodString;
                    source_observation_digest: z.ZodString;
                    approved_request: z.ZodObject<{
                        source_url: z.ZodURL;
                        request: z.ZodObject<{
                            method: z.ZodLiteral<"GET">;
                            target_url: z.ZodOptional<z.ZodURL>;
                            headers: z.ZodArray<z.ZodObject<{
                                name: z.ZodString;
                                value: z.ZodString;
                            }, z.core.$strict>>;
                            success_assertions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                                pointer: z.ZodString;
                                equals: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
                            }, z.core.$strict>>>;
                        }, z.core.$strict>;
                    }, z.core.$strict>;
                    response_status_code: z.ZodNumber;
                    response_content_digest: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    captures: z.ZodArray<z.ZodObject<{
                        retained_capture_digest: z.ZodString;
                        capture_rung: z.ZodEnum<{
                            archive: "archive";
                            headless: "headless";
                            http: "http";
                            manual: "manual";
                        }>;
                    }, z.core.$strict>>;
                    artifact_digests: z.ZodArray<z.ZodString>;
                    kind: z.ZodLiteral<"bounded_absence">;
                    coverage_scope: z.ZodEnum<{
                        exact_funnel: "exact_funnel";
                        exact_resource: "exact_resource";
                        tested_surfaces: "tested_surfaces";
                    }>;
                    covered_surfaces: z.ZodArray<z.ZodObject<{
                        node_kind: z.ZodEnum<{
                            endpoint: "endpoint";
                            interface: "interface";
                            resource: "resource";
                            surface_exclusion: "surface_exclusion";
                        }>;
                        node_id: z.ZodString;
                    }, z.core.$strict>>;
                    covered_branches: z.ZodNumber;
                }, z.core.$strict>, z.ZodObject<{
                    captures: z.ZodArray<z.ZodObject<{
                        retained_capture_digest: z.ZodString;
                        capture_rung: z.ZodEnum<{
                            archive: "archive";
                            headless: "headless";
                            http: "http";
                            manual: "manual";
                        }>;
                    }, z.core.$strict>>;
                    artifact_digests: z.ZodArray<z.ZodString>;
                    kind: z.ZodLiteral<"explicit_first_party_declaration">;
                    source_surface: z.ZodObject<{
                        node_kind: z.ZodEnum<{
                            endpoint: "endpoint";
                            interface: "interface";
                            resource: "resource";
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
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"standard_requirement">;
                    adapter_digest: z.ZodString;
                    evidence_record_digest: z.ZodString;
                    requirement: z.ZodObject<{
                        namespace: z.ZodString;
                        version: z.ZodString;
                        requirement_id: z.ZodString;
                        relation: z.ZodEnum<{
                            "informational-reference": "informational-reference";
                            tests: "tests";
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
                complete: "complete";
                incomplete: "incomplete";
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
            fresh: "fresh";
            stale: "stale";
            unknown: "unknown";
        }>;
        provenance: z.ZodObject<{
            freshness: z.ZodEnum<{
                fresh: "fresh";
                stale: "stale";
                unknown: "unknown";
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
                    attested: "attested";
                    derived: "derived";
                    editorial: "editorial";
                    observed: "observed";
                }>>;
                evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                    attested: "attested";
                    derived: "derived";
                    editorial: "editorial";
                    observed: "observed";
                }>>;
                latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
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
                private: "private";
                resolvable_only: "resolvable_only";
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
                    funnel: z.ZodObject<{
                        key: z.ZodString;
                        name: z.ZodString;
                    }, z.core.$strict>;
                }, z.core.$strict>;
                assessment_targets: z.ZodArray<z.ZodObject<{
                    target_id: z.ZodString;
                    name: z.ZodString;
                    interface_ids: z.ZodArray<z.ZodString>;
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
                            assessment_target: "assessment_target";
                            declaration: "declaration";
                            endpoint: "endpoint";
                            interface: "interface";
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