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
export declare const agentReadinessParticipantIdentitySchema: z.ZodUnion<readonly [z.ZodObject<{
    entity_id: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    origin_source_id: z.ZodString;
}, z.core.$strict>]>;
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
export declare const agentReadinessEndpointTransportSchema: z.ZodEnum<{
    grpc: "grpc";
    http: "http";
    websocket: "websocket";
}>;
export declare const agentReadinessEndpointRoleSchema: z.ZodEnum<{
    authorization: "authorization";
    checkout: "checkout";
    protected_resource: "protected_resource";
    recovery: "recovery";
    registration: "registration";
    service: "service";
    status: "status";
    token: "token";
    webhook: "webhook";
}>;
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
export declare const agentReadinessInterfaceModalitySchema: z.ZodEnum<{
    agent_service: "agent_service";
    command_line: "command_line";
    network_api: "network_api";
    software_library: "software_library";
    tool_server: "tool_server";
    web_application: "web_application";
}>;
export declare const agentReadinessInterfaceFunctionSchema: z.ZodEnum<{
    authentication: "authentication";
    commerce: "commerce";
    events: "events";
    recovery: "recovery";
    service_operation: "service_operation";
}>;
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
export declare const agentReadinessAssessmentTargetSchema: z.ZodObject<{
    target_id: z.ZodString;
    name: z.ZodString;
    interface_ids: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export declare const agentReadinessSurfaceRelationKindSchema: z.ZodEnum<{
    alternative_to: "alternative_to";
    authenticates: "authenticates";
    describes: "describes";
    precedes: "precedes";
    requires: "requires";
}>;
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
    applicable_stages: z.ZodArray<z.ZodEnum<{
        evaluate: "evaluate";
        operate: "operate";
        pay: "pay";
        provision: "provision";
        sign_up: "sign_up";
    }>>;
}, z.core.$strict>;
export declare const agentReadinessDeclarationSourceTargetSchema: z.ZodObject<{
    node_kind: z.ZodEnum<{
        assessment_target: "assessment_target";
        declaration: "declaration";
        endpoint: "endpoint";
        interface: "interface";
        offer_relation: "offer_relation";
        participant: "participant";
        relation: "relation";
        resource: "resource";
        surface_exclusion: "surface_exclusion";
    }>;
    node_id: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessDeclarationSourceBindingSchema: z.ZodObject<{
    source_binding_id: z.ZodString;
    source_id: z.ZodString;
    field_paths: z.ZodArray<z.ZodString>;
    target: z.ZodObject<{
        node_kind: z.ZodEnum<{
            assessment_target: "assessment_target";
            declaration: "declaration";
            endpoint: "endpoint";
            interface: "interface";
            offer_relation: "offer_relation";
            participant: "participant";
            relation: "relation";
            resource: "resource";
            surface_exclusion: "surface_exclusion";
        }>;
        node_id: z.ZodString;
    }, z.core.$strict>;
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
export declare const agentReadinessDeclarationSchema: z.ZodObject<{
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
    offer_relations: z.ZodArray<z.ZodObject<{
        offer_relation_proposal_id: z.ZodString;
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
    }, z.core.$strict>>;
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
export declare const agentReadinessDeclarationGraphSchema: z.ZodObject<{
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
        offer_relations: z.ZodArray<z.ZodObject<{
            offer_relation_proposal_id: z.ZodString;
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
        }, z.core.$strict>>;
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
export type AgentReadinessParticipant = z.infer<typeof agentReadinessParticipantSchema>;
export type AgentReadinessAssessmentTarget = z.infer<typeof agentReadinessAssessmentTargetSchema>;
export type AgentReadinessResource = z.infer<typeof agentReadinessResourceSchema>;
export type AgentReadinessEndpoint = z.infer<typeof agentReadinessEndpointSchema>;
export type AgentReadinessDeclaredInterface = z.infer<typeof agentReadinessDeclaredInterfaceSchema>;
export type AgentReadinessSurfaceRelation = z.infer<typeof agentReadinessSurfaceRelationSchema>;
export type AgentReadinessOfferRelationProposal = z.infer<typeof agentReadinessOfferRelationProposalSchema>;
export type AgentReadinessDeclaration = z.infer<typeof agentReadinessDeclarationSchema>;
export type AgentReadinessDeclarationGraph = z.infer<typeof agentReadinessDeclarationGraphSchema>;
export type AgentReadinessDeclarationRevision = z.infer<typeof agentReadinessDeclarationRevisionSchema>;
export type AgentReadinessAuthoring = z.infer<typeof agentReadinessAuthoringSchema>;
//# sourceMappingURL=declaration.d.ts.map