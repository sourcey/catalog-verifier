import { z } from "zod";
export { AGENT_READINESS_REPOSITORY, AGENT_READINESS_REPOSITORY_URL, agentReadinessDeclarationProvenanceSchema, agentReadinessDeclarationReferenceSchema, } from "./declaration-reference.js";
export declare const agentReadinessParticipantRoleSchema: z.ZodEnum<{
    subject: "subject";
    access_operator: "access_operator";
    identity_provider: "identity_provider";
    payment_provider: "payment_provider";
    provisioning_provider: "provisioning_provider";
    operations_provider: "operations_provider";
}>;
export declare const agentReadinessParticipantIdentitySchema: z.ZodUnion<readonly [z.ZodObject<{
    entity_id: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    origin_source_id: z.ZodString;
}, z.core.$strict>]>;
export declare const agentReadinessParticipantSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const agentReadinessResourceSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const agentReadinessEndpointTransportSchema: z.ZodEnum<{
    http: "http";
    websocket: "websocket";
    grpc: "grpc";
}>;
export declare const agentReadinessEndpointRoleSchema: z.ZodEnum<{
    status: "status";
    service: "service";
    checkout: "checkout";
    recovery: "recovery";
    authorization: "authorization";
    token: "token";
    registration: "registration";
    protected_resource: "protected_resource";
    webhook: "webhook";
}>;
export declare const agentReadinessEndpointSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const agentReadinessInterfaceModalitySchema: z.ZodEnum<{
    web_application: "web_application";
    network_api: "network_api";
    command_line: "command_line";
    software_library: "software_library";
    tool_server: "tool_server";
    agent_service: "agent_service";
}>;
export declare const agentReadinessInterfaceFunctionSchema: z.ZodEnum<{
    events: "events";
    recovery: "recovery";
    authentication: "authentication";
    service_operation: "service_operation";
    commerce: "commerce";
}>;
export declare const agentReadinessDeclaredInterfaceSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const agentReadinessAssessmentTargetSchema: z.ZodObject<{
    target_id: z.ZodString;
    name: z.ZodString;
    interface_ids: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export declare const agentReadinessSurfaceRelationKindSchema: z.ZodEnum<{
    describes: "describes";
    authenticates: "authenticates";
    requires: "requires";
    alternative_to: "alternative_to";
    precedes: "precedes";
}>;
export declare const agentReadinessSurfaceRelationSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const agentReadinessOfferRelationPurposeSchema: z.ZodEnum<{
    application_path: "application_path";
    redemption_path: "redemption_path";
    operating_path: "operating_path";
}>;
export declare const agentReadinessOfferRelationProposalSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const agentReadinessDeclarationSourceTargetSchema: z.ZodObject<{
    node_kind: z.ZodEnum<{
        relation: "relation";
        resource: "resource";
        endpoint: "endpoint";
        interface: "interface";
        surface_exclusion: "surface_exclusion";
        declaration: "declaration";
        participant: "participant";
        offer_relation: "offer_relation";
        assessment_target: "assessment_target";
    }>;
    node_id: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessDeclarationSourceBindingSchema: z.ZodObject<{
    target: z.ZodObject<{
        node_kind: z.ZodEnum<{
            relation: "relation";
            resource: "resource";
            endpoint: "endpoint";
            interface: "interface";
            surface_exclusion: "surface_exclusion";
            declaration: "declaration";
            participant: "participant";
            offer_relation: "offer_relation";
            assessment_target: "assessment_target";
        }>;
        node_id: z.ZodString;
    }, z.core.$strict>;
    source_binding_id: z.ZodString;
    source_id: z.ZodString;
    field_paths: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export declare const agentReadinessSurfaceExclusionSchema: z.ZodObject<{
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
    offer_relations: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strict>>;
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
                offer_relation: "offer_relation";
                assessment_target: "assessment_target";
            }>;
            node_id: z.ZodString;
        }, z.core.$strict>;
        source_binding_id: z.ZodString;
        source_id: z.ZodString;
        field_paths: z.ZodArray<z.ZodString>;
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
    declared_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const agentReadinessDeclarationGraphSchema: z.ZodObject<{
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
export declare const agentReadinessDeclarationRevisionCoreSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const agentReadinessDeclarationRevisionSchema: z.ZodObject<{
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
                primary: "primary";
                alias: "alias";
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
        offer_relations: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strict>>;
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
                    offer_relation: "offer_relation";
                    assessment_target: "assessment_target";
                }>;
                node_id: z.ZodString;
            }, z.core.$strict>;
            source_binding_id: z.ZodString;
            source_id: z.ZodString;
            field_paths: z.ZodArray<z.ZodString>;
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