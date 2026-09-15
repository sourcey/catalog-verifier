import { type CatalogDelta, type CatalogReleaseBundle } from "../../../contracts/release/src/index.js";
export declare function verifyCatalogDeltaPolicies(bundle: CatalogReleaseBundle, delta: CatalogDelta, files: ReadonlyMap<string, Buffer>): {
    coveragePolicy: {
        policy_contract: "sourcey.coverage/v1alpha1";
        version: string;
        entity_requirements: {
            path: string;
            proof_kinds: ("observed" | "derived" | "editorial" | "attested")[];
            derivation_rules: ("contact-access-from-first-party-mailto" | "form-access-from-first-party-application" | "first-party-access-operator" | "public-availability-from-application")[];
            guidance: string;
        }[];
        program_requirements: {
            path: string;
            proof_kinds: ("observed" | "derived" | "editorial" | "attested")[];
            derivation_rules: ("contact-access-from-first-party-mailto" | "form-access-from-first-party-application" | "first-party-access-operator" | "public-availability-from-application")[];
            guidance: string;
        }[];
        offer_requirements: {
            path: string;
            proof_kinds: ("observed" | "derived" | "editorial" | "attested")[];
            derivation_rules: ("contact-access-from-first-party-mailto" | "form-access-from-first-party-application" | "first-party-access-operator" | "public-availability-from-application")[];
            guidance: string;
        }[];
        policy_digest: string;
    };
    freshnessPolicy: {
        policy_contract: "sourcey.freshness/v1alpha1";
        version: string;
        max_age_days: Record<string, number>;
        policy_digest: string;
    };
    agentReadinessPolicy: {
        policy_contract: "sourcey.agent-readiness-policy/v1alpha1";
        policy_version: string;
        assessment_basis: {
            principal: "authorized_human_or_organization";
            initial_state: {
                product_specific_account: false;
                product_credentials: false;
                paid_subscription: false;
                provisioned_resource: false;
                external_identity: "only_when_declared_by_exact_funnel";
            };
            permitted_human_boundaries: ("account_ownership_confirmation" | "delegated_identity_consent" | "regulated_approval" | "final_payment_or_irreversible_commitment")[];
            required_handoff_properties: ("exact_disclosure" | "resumable_handoff" | "deterministic_continuation")[];
            forbidden_substitutions: ("captcha_solving" | "human_password_or_session_sharing" | "concealed_agent_identity" | "invented_eligibility" | "unbound_out_of_band_code" | "vendor_policy_bypass" | "unapproved_consequential_action")[];
            success: {
                target_coverage: "every_declared_target";
                interface_coverage: "at_least_one_declared_alternative";
                authority: "scoped";
                failure_semantics: "documented";
                recovery: "supported";
            };
            observed_assessment: {
                allowed_sources: ("public_documentation" | "public_metadata" | "public_endpoints" | "non_mutating_interaction" | "operator_attested_public_observation")[];
                consequential_claims: "certification_required";
            };
        };
        assessment_methods: {
            method_contract: "sourcey.agent-readiness-method/v1alpha1";
            name: string;
            version: string;
            capabilities: {
                stage: "evaluate" | "sign_up" | "pay" | "provision" | "operate";
                signal_code: string;
                values: ("yes" | "no" | "partial" | "not_applicable")[];
                determination_bases: ("direct_observation" | "bounded_absence" | "explicit_first_party_declaration" | "standard_requirement" | "certification_receipt")[];
            }[];
            surface_support: {
                node_kinds: ("resource" | "endpoint" | "interface" | "surface_exclusion")[];
                resource_roles: ("policy" | "discovery" | "status" | "pricing" | "eligibility" | "access" | "terms" | "checkout" | "provisioning" | "operations" | "recovery" | "authentication" | "descriptor" | "documentation")[];
                endpoint_roles: ("status" | "service" | "checkout" | "recovery" | "authorization" | "token" | "registration" | "protected_resource" | "webhook")[];
                interface_modalities: ("web_application" | "network_api" | "command_line" | "software_library" | "tool_server" | "agent_service")[];
                interface_functions: ("events" | "recovery" | "authentication" | "service_operation" | "commerce")[];
            };
            capture: {
                rungs: ("http" | "headless" | "archive" | "manual")[];
                redirects: "reject" | "same-origin" | "allowed-hosts";
                require_https: true;
                max_redirects: number;
                timeout_ms: number;
                max_bytes: number;
                freshness_capability: "current" | "history-only";
            };
            interaction: {
                mode: "non_mutating";
                max_actions: number;
                allowed_actions: ("navigate" | "follow_link" | "expand_disclosure" | "select_non_submitting_control" | "scroll" | "wait")[];
                forbidden_effects: ("provision" | "submit_application" | "create_account" | "send_verification_code" | "accept_terms" | "enter_credentials" | "enter_payment_details" | "purchase" | "create_key" | "invoke_billable_service")[];
            };
            required_artifacts: ("redirect_chain" | "interaction_trace" | "raw_bytes" | "normalized_text" | "structured_validation" | "standard_evidence_result" | "utf8_locators" | "screenshot" | "capture_interaction_trace" | "manual_review_note")[];
            failure_classes: ("network_failure" | "policy_refusal" | "authentication_required" | "timeout" | "render_failure" | "invalid_structure" | "interaction_budget_exhausted" | "capture_unavailable")[];
            residue_classes: ("unresolved_signal" | "insufficient_determination_basis" | "conflicting_observations" | "scope_mismatch" | "manual_review_required" | "unsupported_interaction")[];
            external_references: {
                namespace: string;
                version: string;
                requirement_id: string;
                relation: "tests" | "informational-reference";
            }[];
            method_digest: string;
        }[];
        signal_rules: {
            stage: "evaluate" | "sign_up" | "pay" | "provision" | "operate";
            signal_code: string;
            evaluation_role: "graded" | "barrier" | "informational";
            required: boolean;
            pass_values: ("unknown" | "yes" | "no" | "partial" | "not_applicable")[];
            constrained_values: ("unknown" | "yes" | "no" | "partial" | "not_applicable")[];
            fail_values: ("unknown" | "yes" | "no" | "partial" | "not_applicable")[];
            allow_not_applicable: boolean;
            allowed_method_digests: string[];
            selector_groups: {
                selector_group_id: string;
                coverage: "at_least_one" | "all_matches";
                alternatives: {
                    alternative_id: string;
                    selectors: ({
                        kind: "resource_role";
                        roles: ("policy" | "discovery" | "status" | "pricing" | "eligibility" | "access" | "terms" | "checkout" | "provisioning" | "operations" | "recovery" | "authentication" | "descriptor" | "documentation")[];
                    } | {
                        kind: "endpoint_role";
                        roles: ("status" | "service" | "checkout" | "recovery" | "authorization" | "token" | "registration" | "protected_resource" | "webhook")[];
                    } | {
                        kind: "interface_signature";
                        modalities: ("web_application" | "network_api" | "command_line" | "software_library" | "tool_server" | "agent_service")[];
                        functions: ("events" | "recovery" | "authentication" | "service_operation" | "commerce")[];
                    } | {
                        kind: "assessment_target_membership";
                        membership: "direct" | "reachable";
                    } | {
                        kind: "target_relation";
                        relation_kind: "describes" | "authenticates" | "requires" | "alternative_to" | "precedes";
                        direction: "from_target" | "to_target";
                    } | {
                        kind: "standard_requirement";
                        requirement: {
                            namespace: string;
                            version: string;
                            requirement_id: string;
                            relation: "tests" | "informational-reference";
                        };
                    })[];
                }[];
            }[];
            value_evidence: {
                value: "yes" | "no" | "partial" | "not_applicable";
                alternatives: {
                    alternative_id: string;
                    required_basis_kinds: ("direct_observation" | "bounded_absence" | "explicit_first_party_declaration" | "standard_requirement" | "certification_receipt")[];
                    minimum_distinct_captures: number;
                    require_independent_capture_rungs: boolean;
                    required_artifacts: ("redirect_chain" | "interaction_trace" | "raw_bytes" | "normalized_text" | "structured_validation" | "standard_evidence_result" | "utf8_locators" | "screenshot" | "capture_interaction_trace" | "manual_review_note")[];
                    minimum_surfaces: number;
                    minimum_branches: number;
                }[];
            }[];
            priority: number;
            public_findings: {
                yes: {
                    condition: string;
                    finding: string;
                };
                no: {
                    condition: string;
                    finding: string;
                };
                partial: {
                    condition: string;
                    finding: string;
                };
                unknown: {
                    condition: string;
                    finding: string;
                };
                not_applicable: {
                    condition: string;
                    finding: string;
                };
            };
            external_references: {
                namespace: string;
                version: string;
                requirement_id: string;
                relation: "tests" | "informational-reference";
            }[];
            standard_evidence: {
                requirement: {
                    namespace: string;
                    version: string;
                    requirement_id: string;
                    relation: "tests" | "informational-reference";
                };
                support: {
                    result: "satisfied" | "not_satisfied";
                    values: ("yes" | "no" | "partial" | "not_applicable")[];
                }[];
            }[];
            evidence_terms?: string[] | undefined;
            blocker?: {
                code: string;
                explanation: string;
            } | undefined;
            remediation?: {
                code: string;
                instruction: string;
            } | undefined;
        }[];
        aggregation: {
            stage: "worst-signal";
            overall: "worst-stage";
            outcome_precedence: ("unknown" | "not_applicable" | "pass" | "constrained" | "fail")[];
            blocker_precedence: "outcome-then-rule-priority";
            tie_breaker: "signal-code";
        };
        coverage: {
            unknown_signals: "uncovered";
            contradicted_signals: "uncovered";
        };
        freshness: {
            source: "observation-freshness-policy";
            aggregation: "worst-signal" | "worst-required-signal" | "worst-evaluated-signal";
        };
        public_states: {
            pass: {
                state: "unknown" | "not_applicable" | "ready" | "limited" | "blocked";
                label: string;
            };
            constrained: {
                state: "unknown" | "not_applicable" | "ready" | "limited" | "blocked";
                label: string;
            };
            fail: {
                state: "unknown" | "not_applicable" | "ready" | "limited" | "blocked";
                label: string;
            };
            unknown: {
                state: "unknown" | "not_applicable" | "ready" | "limited" | "blocked";
                label: string;
            };
            not_applicable: {
                state: "unknown" | "not_applicable" | "ready" | "limited" | "blocked";
                label: string;
            };
        };
        grading: {
            strategy: "stage-state-cardinality";
            grade_by_limited_stage_count: {
                "0": "A+";
                "1": "A";
                "2": "B+";
                "3": "B";
                "4": "C+";
                "5": "C";
            };
            failure_grade_by_stage: {
                evaluate: "D";
                sign_up: "D";
                pay: "D";
                provision: "F";
                operate: "F";
            };
            not_applicable_signals: "excluded";
            unrated_when: {
                coverage: "not-complete";
                freshness: "not-fresh";
            };
            unverified_barrier_grade_cap?: "B+" | undefined;
        };
        grade_derivation: {
            label: string;
            explanation: string;
            coverage_rule: string;
            outcome_rule: string;
        };
        policy_digest: string;
    };
    assuranceMethodPolicy: {
        policy_contract: "sourcey.assurance-method-policy/v1alpha1";
        method_id: string;
        title: string;
        summary: string;
        decision_authority: "authorized-human-review";
        accepted_observation_methods: string[];
        accepted_capture_availability: ("public" | "private-receipt")[];
        accepted_source_standings: ("live-first-party" | "archived-first-party" | "live-third-party" | "archived-third-party" | "manual-first-party" | "manual-third-party")[];
        accepted_proof_kinds: ("observed" | "derived" | "editorial" | "attested")[];
        outcomes: {
            entity_identity: {
                scope: "identity-epoch";
                coverage_paths: ["/domains", "/links", "/name"];
            };
            offer_terms: {
                scope: "exact-revision";
                coverage: "applicable-offer-coverage-policy";
            };
        };
        policy_digest: string;
    };
};
//# sourceMappingURL=verification-policies.d.ts.map