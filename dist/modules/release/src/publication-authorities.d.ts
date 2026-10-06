import type { CatalogEvent, CatalogEventIntent } from "../../../contracts/events/src/index.js";
import type { CatalogPublicationProposal } from "../../../contracts/publication/src/index.js";
import type { EvidenceCatalogProposal } from "../../evidence-operations/src/evidence-authority.js";
export type ReadinessPublicationProposal = Pick<EvidenceCatalogProposal, "agent_readiness_profile_input" | "agent_readiness_declaration_revision" | "agent_readiness_offer_relation_inputs">;
/** Public canonical input only; private review and model material stay private. */
export declare function agentReadinessPublicationInput(proposal: ReadinessPublicationProposal): {
    release_input_contract: "sourcey.agent-readiness-release-input/v1alpha1";
    profile_input: {
        agent_readiness_profile_id: string;
        entity_id: string;
        scope: {
            product: {
                key: string;
                name: string;
            };
            funnel: {
                key: string;
                name: string;
            };
        };
        catalog_binding: {
            base_release_id: string;
            entity_revision_digest: string;
        };
        declaration_revision_digest: string;
        declaration: {
            status: "none";
        } | {
            declaration_id: string;
            provenance: {
                repository: "sourcey/agent-ready-services";
                commit: string;
                path: string;
                git_blob_oid: string;
                blob_digest: string;
            } | {
                source: "sourcey";
                path: string;
                blob_digest: string;
            };
            status: "community_declared" | "entity_attested";
        };
        lifecycle: "active" | "ended" | "withdrawn";
        effective_from: string;
        effective_until?: string | undefined;
        signals: {
            stage: "evaluate" | "operate" | "pay" | "provision" | "sign_up";
            signal_code: string;
            selector_group_id: string;
            value: "no" | "not_applicable" | "partial" | "unknown" | "yes";
            observed_at: string;
            tested_surfaces: {
                node_kind: "endpoint" | "interface" | "resource" | "surface_exclusion";
                node_id: string;
            }[];
            assessment_method: {
                name: string;
                version: string;
                method_digest: string;
            };
            determination_bases: ({
                captures: {
                    retained_capture_digest: string;
                    capture_rung: "archive" | "headless" | "http" | "manual";
                }[];
                artifact_digests: string[];
                kind: "direct_observation";
                locators: {
                    artifact_digest: string;
                    start_byte: number;
                    end_byte: number;
                    value_digest: string;
                }[];
            } | {
                captures: {
                    retained_capture_digest: string;
                    capture_rung: "archive" | "headless" | "http" | "manual";
                }[];
                artifact_digests: string[];
                kind: "service_exchange";
                endpoint_id: string;
                assessment_target_id: string;
                source_observation_digest: string;
                approved_request: {
                    source_url: string;
                    request: {
                        method: "GET";
                        target_url?: string | undefined;
                        headers: {
                            name: string;
                            value: string;
                        }[];
                        success_assertions?: {
                            pointer: string;
                            equals: string | number | boolean | null;
                        }[] | undefined;
                    };
                };
                response_status_code: number;
                response_content_digest: string;
            } | {
                captures: {
                    retained_capture_digest: string;
                    capture_rung: "archive" | "headless" | "http" | "manual";
                }[];
                artifact_digests: string[];
                kind: "bounded_absence";
                coverage_scope: "exact_funnel" | "exact_resource" | "tested_surfaces";
                covered_surfaces: {
                    node_kind: "endpoint" | "interface" | "resource" | "surface_exclusion";
                    node_id: string;
                }[];
                covered_branches: number;
            } | {
                captures: {
                    retained_capture_digest: string;
                    capture_rung: "archive" | "headless" | "http" | "manual";
                }[];
                artifact_digests: string[];
                kind: "explicit_first_party_declaration";
                source_surface: {
                    node_kind: "endpoint" | "interface" | "resource" | "surface_exclusion";
                    node_id: string;
                };
                locators: {
                    artifact_digest: string;
                    start_byte: number;
                    end_byte: number;
                    value_digest: string;
                }[];
            } | {
                kind: "standard_requirement";
                adapter_digest: string;
                evidence_record_digest: string;
                requirement: {
                    namespace: string;
                    version: string;
                    requirement_id: string;
                    relation: "informational-reference" | "tests";
                };
                artifact_digests: string[];
            } | {
                kind: "certification_receipt";
                certification_receipt_digest: string;
            })[];
            note?: string | undefined;
        }[];
        input_contract: "sourcey.agent-readiness-input/v1alpha1";
        evidence_bindings: {
            stage: "evaluate" | "operate" | "pay" | "provision" | "sign_up";
            signal_code: string;
            evidence_event_ids: string[];
            observation_ids: string[];
        }[];
    };
    declaration_revision: {
        revision_contract: "sourcey.agent-readiness-declaration-revision/v1alpha1";
        entity_id: string;
        declaration: {
            declaration_id: string;
            scope: {
                product: {
                    key: string;
                    name: string;
                };
                funnel: {
                    key: string;
                    name: string;
                };
            };
            assessment_targets: {
                target_id: string;
                name: string;
                interface_ids: string[];
            }[];
            participants: {
                participant_id: string;
                roles: ("access_operator" | "identity_provider" | "operations_provider" | "payment_provider" | "provisioning_provider" | "subject")[];
                identity: {
                    entity_id: string;
                } | {
                    origin_source_id: string;
                };
            }[];
            resources: {
                resource_id: string;
                uri: string;
                roles: ("access" | "authentication" | "checkout" | "descriptor" | "discovery" | "documentation" | "eligibility" | "operations" | "policy" | "pricing" | "provisioning" | "recovery" | "status" | "terms")[];
                operated_by_participant_id: string;
                standard_bindings: {
                    namespace: string;
                    version: string;
                    relation: "declares" | "describes" | "implements" | "uses";
                }[];
                allowed_redirect_hosts?: string[] | undefined;
            }[];
            endpoints: {
                endpoint_id: string;
                uri: string;
                transport: "grpc" | "http" | "websocket";
                roles: ("authorization" | "checkout" | "protected_resource" | "recovery" | "registration" | "service" | "status" | "token" | "webhook")[];
                operated_by_participant_id: string;
                standard_bindings: {
                    namespace: string;
                    version: string;
                    relation: "declares" | "describes" | "implements" | "uses";
                }[];
                allowed_redirect_hosts?: string[] | undefined;
            }[];
            interfaces: {
                interface_id: string;
                modality: "agent_service" | "command_line" | "network_api" | "software_library" | "tool_server" | "web_application";
                functions: ("authentication" | "commerce" | "events" | "recovery" | "service_operation")[];
                endpoint_ids: string[];
                resource_ids: string[];
                operated_by_participant_id: string;
                standard_bindings: {
                    namespace: string;
                    version: string;
                    relation: "declares" | "describes" | "implements" | "uses";
                }[];
            }[];
            relations: {
                relation_id: string;
                kind: "alternative_to" | "authenticates" | "describes" | "precedes" | "requires";
                from: {
                    node_kind: "endpoint" | "interface" | "resource" | "surface_exclusion";
                    node_id: string;
                };
                to: {
                    node_kind: "endpoint" | "interface" | "resource" | "surface_exclusion";
                    node_id: string;
                };
            }[];
            surface_exclusions: {
                exclusion_id: string;
                role: "access" | "authentication" | "checkout" | "descriptor" | "discovery" | "documentation" | "eligibility" | "operations" | "policy" | "pricing" | "provisioning" | "recovery" | "status" | "terms";
                rationale: string;
            }[];
            authority_intent: "community" | "entity";
            declared_at: string;
            source_bindings: {
                source_binding_id: string;
                source_id: string;
                field_paths: string[];
                target: {
                    node_kind: "assessment_target" | "declaration" | "endpoint" | "interface" | "participant" | "relation" | "resource" | "surface_exclusion";
                    node_id: string;
                };
            }[];
        };
        sources: {
            source_id: string;
            url: string;
        }[];
        revision_digest: string;
    };
    offer_relation_inputs: {
        relation_input_contract: "sourcey.agent-readiness-offer-relation-input/v1alpha1";
        agent_readiness_profile_id: string;
        offer_id: string;
        purpose: "application_path" | "operating_path" | "redemption_path";
        applicable_stages: ("evaluate" | "operate" | "pay" | "provision" | "sign_up")[];
        effective_from: string;
        effective_until?: string | undefined;
        declaration_revision_digest: string;
        offer_relation_proposal_id: string;
        admitted_offer_revision_digest: string;
    }[];
} | null;
type ProposalReference = Pick<CatalogPublicationProposal["authority_proposals"][number], "proposal_digest">;
export interface PublicationAuthorityBundles {
    readonly evidenceProposals: readonly (ProposalReference & ReadinessPublicationProposal & {
        readonly event_intents: readonly CatalogEventIntent[];
    })[];
    readonly claimBundles: readonly {
        readonly proposal: ProposalReference;
        readonly events: readonly CatalogEvent[];
    }[];
    readonly assetBundles: readonly {
        readonly proposals: readonly ProposalReference[];
        readonly events: readonly CatalogEvent[];
    }[];
    readonly identityBundles: readonly {
        readonly proposal: ProposalReference;
        readonly events: readonly CatalogEvent[];
    }[];
    readonly assuranceBundles: readonly {
        readonly action: {
            readonly action_digest: string;
        };
        readonly events: readonly CatalogEvent[];
    }[];
}
/** Every materialization remains admitted independently; only semantic references form a union. */
export declare function authorityProposalsForBundles(input: PublicationAuthorityBundles): CatalogPublicationProposal["authority_proposals"];
export {};
//# sourceMappingURL=publication-authorities.d.ts.map