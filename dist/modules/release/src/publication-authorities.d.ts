import type { CatalogEvent, CatalogEventIntent } from "../../../contracts/events/src/index.js";
import type { CatalogPublicationProposal } from "../../../contracts/publication/src/index.js";
import type { EvidenceCatalogProposal } from "../../evidence-operations/src/evidence-authority.js";
export type ReadinessPublicationProposal = Pick<EvidenceCatalogProposal, "agent_readiness_profile_input" | "agent_readiness_declaration_revision" | "agent_readiness_offer_relation_inputs">;
/** Public canonical input only; private review and model material stay private. */
export declare function agentReadinessPublicationInput(proposal: ReadinessPublicationProposal): {
    release_input_contract: "sourcey.agent-readiness-release-input/v1alpha1";
    profile_input: {
        evidence_bindings: {
            stage: "evaluate" | "sign_up" | "pay" | "provision" | "operate";
            signal_code: string;
            evidence_event_ids: string[];
            observation_ids: string[];
        }[];
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
            };
            status: "community_declared" | "entity_attested";
        };
        lifecycle: "active" | "ended" | "withdrawn";
        effective_from: string;
        signals: {
            stage: "evaluate" | "sign_up" | "pay" | "provision" | "operate";
            signal_code: string;
            selector_group_id: string;
            value: "unknown" | "yes" | "no" | "partial" | "not_applicable";
            observed_at: string;
            tested_surfaces: {
                node_kind: "resource" | "endpoint" | "interface" | "surface_exclusion";
                node_id: string;
            }[];
            assessment_method: {
                name: string;
                version: string;
                method_digest: string;
            };
            determination_bases: ({
                locators: {
                    artifact_digest: string;
                    start_byte: number;
                    end_byte: number;
                    value_digest: string;
                }[];
                captures: {
                    retained_capture_digest: string;
                    capture_rung: "http" | "headless" | "archive" | "manual";
                }[];
                artifact_digests: string[];
                kind: "direct_observation";
            } | {
                coverage_scope: "exact_resource" | "tested_surfaces" | "exact_funnel";
                covered_surfaces: {
                    node_kind: "resource" | "endpoint" | "interface" | "surface_exclusion";
                    node_id: string;
                }[];
                covered_branches: number;
                captures: {
                    retained_capture_digest: string;
                    capture_rung: "http" | "headless" | "archive" | "manual";
                }[];
                artifact_digests: string[];
                kind: "bounded_absence";
            } | {
                source_surface: {
                    node_kind: "resource" | "endpoint" | "interface" | "surface_exclusion";
                    node_id: string;
                };
                locators: {
                    artifact_digest: string;
                    start_byte: number;
                    end_byte: number;
                    value_digest: string;
                }[];
                captures: {
                    retained_capture_digest: string;
                    capture_rung: "http" | "headless" | "archive" | "manual";
                }[];
                artifact_digests: string[];
                kind: "explicit_first_party_declaration";
            } | {
                kind: "standard_requirement";
                adapter_digest: string;
                evidence_record_digest: string;
                requirement: {
                    namespace: string;
                    version: string;
                    requirement_id: string;
                    relation: "tests" | "informational-reference";
                };
                artifact_digests: string[];
            } | {
                kind: "certification_receipt";
                certification_receipt_digest: string;
            })[];
            note?: string | undefined;
        }[];
        input_contract: "sourcey.agent-readiness-input/v1alpha1";
        effective_until?: string | undefined;
    };
    declaration_revision: {
        revision_contract: "sourcey.agent-readiness-declaration-revision/v1alpha1";
        entity_id: string;
        declaration: {
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
            resources: {
                resource_id: string;
                uri: string;
                roles: ("policy" | "discovery" | "status" | "pricing" | "eligibility" | "access" | "terms" | "checkout" | "provisioning" | "operations" | "recovery" | "authentication" | "descriptor" | "documentation")[];
                operated_by_participant_id: string;
                standard_bindings: {
                    namespace: string;
                    version: string;
                    relation: "declares" | "describes" | "implements" | "uses";
                }[];
                allowed_redirect_hosts?: string[] | undefined;
            }[];
            relations: {
                relation_id: string;
                kind: "describes" | "authenticates" | "requires" | "alternative_to" | "precedes";
                from: {
                    node_kind: "resource" | "endpoint" | "interface" | "surface_exclusion";
                    node_id: string;
                };
                to: {
                    node_kind: "resource" | "endpoint" | "interface" | "surface_exclusion";
                    node_id: string;
                };
            }[];
            declaration_id: string;
            declared_at: string;
            assessment_targets: {
                target_id: string;
                name: string;
                interface_ids: string[];
            }[];
            participants: {
                participant_id: string;
                roles: ("subject" | "access_operator" | "identity_provider" | "payment_provider" | "provisioning_provider" | "operations_provider")[];
                identity: {
                    entity_id: string;
                } | {
                    origin_source_id: string;
                };
            }[];
            endpoints: {
                endpoint_id: string;
                uri: string;
                transport: "http" | "websocket" | "grpc";
                roles: ("status" | "service" | "checkout" | "recovery" | "authorization" | "token" | "registration" | "protected_resource" | "webhook")[];
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
                modality: "web_application" | "network_api" | "command_line" | "software_library" | "tool_server" | "agent_service";
                functions: ("events" | "recovery" | "authentication" | "service_operation" | "commerce")[];
                endpoint_ids: string[];
                resource_ids: string[];
                operated_by_participant_id: string;
                standard_bindings: {
                    namespace: string;
                    version: string;
                    relation: "declares" | "describes" | "implements" | "uses";
                }[];
            }[];
            surface_exclusions: {
                exclusion_id: string;
                role: "policy" | "discovery" | "status" | "pricing" | "eligibility" | "access" | "terms" | "checkout" | "provisioning" | "operations" | "recovery" | "authentication" | "descriptor" | "documentation";
                rationale: string;
            }[];
            authority_intent: "entity" | "community";
            source_bindings: {
                target: {
                    node_kind: "relation" | "resource" | "endpoint" | "interface" | "surface_exclusion" | "declaration" | "participant" | "assessment_target";
                    node_id: string;
                };
                source_binding_id: string;
                source_id: string;
                field_paths: string[];
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
        purpose: "application_path" | "redemption_path" | "operating_path";
        applicable_stages: ("evaluate" | "sign_up" | "pay" | "provision" | "operate")[];
        effective_from: string;
        declaration_revision_digest: string;
        offer_relation_proposal_id: string;
        admitted_offer_revision_digest: string;
        effective_until?: string | undefined;
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