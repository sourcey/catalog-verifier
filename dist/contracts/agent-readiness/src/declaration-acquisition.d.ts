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
export declare const agentReadinessDraftParticipantSchema: z.ZodObject<{
    participant_id: z.ZodString;
    roles: z.ZodArray<z.ZodEnum<{
        access_operator: "access_operator";
        identity_provider: "identity_provider";
        payment_provider: "payment_provider";
        provisioning_provider: "provisioning_provider";
        operations_provider: "operations_provider";
    }>>;
    identity: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"entity_id">;
        entity_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"origin_uri">;
        uri: z.ZodURL;
    }, z.core.$strict>], "kind">;
    source_uris: z.ZodArray<z.ZodURL>;
}, z.core.$strict>;
export declare const agentReadinessDraftResourceSchema: z.ZodObject<{
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
    source_uris: z.ZodArray<z.ZodURL>;
}, z.core.$strict>;
export declare const agentReadinessDraftEndpointSchema: z.ZodObject<{
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
    source_uris: z.ZodArray<z.ZodURL>;
}, z.core.$strict>;
export declare const agentReadinessDraftInterfaceSchema: z.ZodObject<{
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
    source_uris: z.ZodArray<z.ZodURL>;
}, z.core.$strict>;
export declare const agentReadinessDraftAssessmentTargetSchema: z.ZodObject<{
    target_id: z.ZodString;
    name: z.ZodString;
    interface_ids: z.ZodArray<z.ZodString>;
    source_uris: z.ZodArray<z.ZodURL>;
}, z.core.$strict>;
export declare const agentReadinessDraftRelationSchema: z.ZodObject<{
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
    source_uris: z.ZodArray<z.ZodURL>;
}, z.core.$strict>;
export declare const agentReadinessDraftOfferRelationSchema: z.ZodObject<{
    offer_relation_proposal_id: z.ZodString;
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
    source_uris: z.ZodArray<z.ZodURL>;
}, z.core.$strict>;
export declare const agentReadinessDraftSurfaceExclusionSchema: z.ZodObject<{
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
    source_uris: z.ZodArray<z.ZodURL>;
}, z.core.$strict>;
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
        funnel: z.ZodObject<{
            key: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>>;
    scope_source_uris: z.ZodDefault<z.ZodArray<z.ZodURL>>;
    subject_roles: z.ZodDefault<z.ZodArray<z.ZodEnum<{
        access_operator: "access_operator";
        identity_provider: "identity_provider";
        payment_provider: "payment_provider";
        provisioning_provider: "provisioning_provider";
        operations_provider: "operations_provider";
    }>>>;
    assessment_targets: z.ZodDefault<z.ZodArray<z.ZodObject<{
        target_id: z.ZodString;
        name: z.ZodString;
        interface_ids: z.ZodArray<z.ZodString>;
        source_uris: z.ZodArray<z.ZodURL>;
    }, z.core.$strict>>>;
    participants: z.ZodDefault<z.ZodArray<z.ZodObject<{
        participant_id: z.ZodString;
        roles: z.ZodArray<z.ZodEnum<{
            access_operator: "access_operator";
            identity_provider: "identity_provider";
            payment_provider: "payment_provider";
            provisioning_provider: "provisioning_provider";
            operations_provider: "operations_provider";
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
        source_uris: z.ZodArray<z.ZodURL>;
    }, z.core.$strict>>>;
    endpoints: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
        source_uris: z.ZodArray<z.ZodURL>;
    }, z.core.$strict>>>;
    interfaces: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
        source_uris: z.ZodArray<z.ZodURL>;
    }, z.core.$strict>>>;
    relations: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
        source_uris: z.ZodArray<z.ZodURL>;
    }, z.core.$strict>>>;
    offer_relations: z.ZodDefault<z.ZodArray<z.ZodObject<{
        offer_relation_proposal_id: z.ZodString;
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
        source_uris: z.ZodArray<z.ZodURL>;
    }, z.core.$strict>>>;
    surface_exclusions: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
        source_uris: z.ZodArray<z.ZodURL>;
    }, z.core.$strict>>>;
    authority_intent: z.ZodOptional<z.ZodEnum<{
        entity: "entity";
        community: "community";
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
        required: "required";
        invalid: "invalid";
        ambiguous_identity: "ambiguous_identity";
        cross_entity_offer: "cross_entity_offer";
        base_authoring_mismatch: "base_authoring_mismatch";
    }>;
    path: z.ZodString;
    message: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessDeclarationDraftResultSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    status: z.ZodLiteral<"invalid">;
    diagnostics: z.ZodArray<z.ZodObject<{
        code: z.ZodEnum<{
            required: "required";
            invalid: "invalid";
            ambiguous_identity: "ambiguous_identity";
            cross_entity_offer: "cross_entity_offer";
            base_authoring_mismatch: "base_authoring_mismatch";
        }>;
        path: z.ZodString;
        message: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>, z.ZodObject<{
    status: z.ZodLiteral<"identity_allocation_required">;
    diagnostics: z.ZodArray<z.ZodObject<{
        code: z.ZodEnum<{
            required: "required";
            invalid: "invalid";
            ambiguous_identity: "ambiguous_identity";
            cross_entity_offer: "cross_entity_offer";
            base_authoring_mismatch: "base_authoring_mismatch";
        }>;
        path: z.ZodString;
        message: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>, z.ZodObject<{
    diagnostics: z.ZodArray<z.ZodObject<{
        code: z.ZodEnum<{
            required: "required";
            invalid: "invalid";
            ambiguous_identity: "ambiguous_identity";
            cross_entity_offer: "cross_entity_offer";
            base_authoring_mismatch: "base_authoring_mismatch";
        }>;
        path: z.ZodString;
        message: z.ZodString;
    }, z.core.$strict>>;
    base_release_id: z.ZodString;
    entity_id: z.ZodString;
    entity_revision_digest: z.ZodString;
    status: z.ZodLiteral<"incomplete">;
}, z.core.$strict>, z.ZodObject<{
    status: z.ZodLiteral<"conflict">;
    base_release_id: z.ZodString;
    entity_id: z.ZodOptional<z.ZodString>;
    entity_revision_digest: z.ZodOptional<z.ZodString>;
    diagnostics: z.ZodArray<z.ZodObject<{
        code: z.ZodEnum<{
            required: "required";
            invalid: "invalid";
            ambiguous_identity: "ambiguous_identity";
            cross_entity_offer: "cross_entity_offer";
            base_authoring_mismatch: "base_authoring_mismatch";
        }>;
        path: z.ZodString;
        message: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>, z.ZodObject<{
    subject_display: z.ZodObject<{
        slug: z.ZodString;
        name: z.ZodString;
    }, z.core.$strict>;
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
    declaration_id: z.ZodString;
    authoring_file: z.ZodObject<{
        path: z.ZodString;
        content: z.ZodString;
        content_digest: z.ZodString;
    }, z.core.$strict>;
    submission: z.ZodObject<{
        repository: z.ZodLiteral<"sourcey/agent-ready-services">;
        authority: z.ZodLiteral<"pull_request_merge">;
    }, z.core.$strict>;
    diagnostics: z.ZodArray<z.ZodObject<{
        code: z.ZodEnum<{
            required: "required";
            invalid: "invalid";
            ambiguous_identity: "ambiguous_identity";
            cross_entity_offer: "cross_entity_offer";
            base_authoring_mismatch: "base_authoring_mismatch";
        }>;
        path: z.ZodString;
        message: z.ZodString;
    }, z.core.$strict>>;
    base_release_id: z.ZodString;
    entity_id: z.ZodString;
    entity_revision_digest: z.ZodString;
    status: z.ZodLiteral<"materialized">;
}, z.core.$strict>], "status">;
export type AgentReadinessDeclarationDraftRequest = z.infer<typeof agentReadinessDeclarationDraftRequestSchema>;
export type AgentReadinessDeclarationDraftResult = z.infer<typeof agentReadinessDeclarationDraftResultSchema>;
//# sourceMappingURL=declaration-acquisition.d.ts.map