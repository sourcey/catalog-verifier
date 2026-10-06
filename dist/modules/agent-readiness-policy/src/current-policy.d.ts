import { type AgentReadinessPolicy } from "../../../contracts/agent-readiness/src/index.js";
export declare function buildCurrentAgentReadinessPolicy(): AgentReadinessPolicy;
export declare const currentAgentReadinessPolicy: {
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
        permitted_human_boundaries: ("account_ownership_confirmation" | "delegated_identity_consent" | "final_payment_or_irreversible_commitment" | "regulated_approval")[];
        required_handoff_properties: ("deterministic_continuation" | "exact_disclosure" | "resumable_handoff")[];
        forbidden_substitutions: ("captcha_solving" | "concealed_agent_identity" | "human_password_or_session_sharing" | "invented_eligibility" | "unapproved_consequential_action" | "unbound_out_of_band_code" | "vendor_policy_bypass")[];
        success: {
            target_coverage: "every_declared_target";
            interface_coverage: "at_least_one_declared_alternative" | "one_selected_interface_per_target";
            authority: "scoped";
            failure_semantics: "documented";
            recovery: "supported";
        };
        observed_assessment: {
            allowed_sources: ("non_mutating_interaction" | "operator_attested_public_observation" | "public_documentation" | "public_endpoints" | "public_metadata")[];
            consequential_claims: "certification_required";
        };
    };
    assessment_methods: {
        method_contract: "sourcey.agent-readiness-method/v1alpha1";
        name: string;
        version: string;
        capabilities: {
            stage: "evaluate" | "operate" | "pay" | "provision" | "sign_up";
            signal_code: string;
            values: ("no" | "not_applicable" | "partial" | "yes")[];
            determination_bases: ("bounded_absence" | "certification_receipt" | "direct_observation" | "explicit_first_party_declaration" | "service_exchange" | "standard_requirement")[];
        }[];
        surface_support: {
            node_kinds: ("endpoint" | "interface" | "resource" | "surface_exclusion")[];
            resource_roles: ("access" | "authentication" | "checkout" | "descriptor" | "discovery" | "documentation" | "eligibility" | "operations" | "policy" | "pricing" | "provisioning" | "recovery" | "status" | "terms")[];
            endpoint_roles: ("authorization" | "checkout" | "protected_resource" | "recovery" | "registration" | "service" | "status" | "token" | "webhook")[];
            interface_modalities: ("agent_service" | "command_line" | "network_api" | "software_library" | "tool_server" | "web_application")[];
            interface_functions: ("authentication" | "commerce" | "events" | "recovery" | "service_operation")[];
        };
        capture: {
            rungs: ("archive" | "headless" | "http" | "manual")[];
            redirects: "allowed-hosts" | "reject" | "same-origin";
            require_https: true;
            max_redirects: number;
            timeout_ms: number;
            max_bytes: number;
            freshness_capability: "current" | "history-only";
        };
        interaction: {
            mode: "non_mutating";
            max_actions: number;
            allowed_actions: ("expand_disclosure" | "follow_link" | "navigate" | "scroll" | "select_non_submitting_control" | "wait")[];
            forbidden_effects: ("accept_terms" | "create_account" | "create_key" | "enter_credentials" | "enter_payment_details" | "invoke_billable_service" | "provision" | "purchase" | "send_verification_code" | "submit_application")[];
        };
        required_artifacts: ("capture_interaction_trace" | "evidence_excerpt" | "interaction_trace" | "manual_review_note" | "screenshot" | "source_observation" | "standard_evidence_result")[];
        failure_classes: ("authentication_required" | "capture_unavailable" | "interaction_budget_exhausted" | "invalid_structure" | "network_failure" | "policy_refusal" | "render_failure" | "timeout")[];
        residue_classes: ("conflicting_observations" | "insufficient_determination_basis" | "manual_review_required" | "scope_mismatch" | "unresolved_signal" | "unsupported_interaction")[];
        external_references: {
            namespace: string;
            version: string;
            requirement_id: string;
            relation: "informational-reference" | "tests";
        }[];
        method_digest: string;
    }[];
    signal_rules: {
        stage: "evaluate" | "operate" | "pay" | "provision" | "sign_up";
        signal_code: string;
        evaluation_role: "barrier" | "graded" | "informational";
        required: boolean;
        pass_values: ("no" | "not_applicable" | "partial" | "unknown" | "yes")[];
        constrained_values: ("no" | "not_applicable" | "partial" | "unknown" | "yes")[];
        fail_values: ("no" | "not_applicable" | "partial" | "unknown" | "yes")[];
        allow_not_applicable: boolean;
        allowed_method_digests: string[];
        selector_groups: {
            selector_group_id: string;
            coverage: "all_matches" | "at_least_one";
            alternatives: {
                alternative_id: string;
                selectors: ({
                    kind: "resource_role";
                    roles: ("access" | "authentication" | "checkout" | "descriptor" | "discovery" | "documentation" | "eligibility" | "operations" | "policy" | "pricing" | "provisioning" | "recovery" | "status" | "terms")[];
                } | {
                    kind: "endpoint_role";
                    roles: ("authorization" | "checkout" | "protected_resource" | "recovery" | "registration" | "service" | "status" | "token" | "webhook")[];
                } | {
                    kind: "interface_signature";
                    modalities: ("agent_service" | "command_line" | "network_api" | "software_library" | "tool_server" | "web_application")[];
                    functions: ("authentication" | "commerce" | "events" | "recovery" | "service_operation")[];
                } | {
                    kind: "assessment_target_membership";
                    membership: "direct" | "reachable" | "selected_path";
                } | {
                    kind: "target_relation";
                    relation_kind: "alternative_to" | "authenticates" | "describes" | "precedes" | "requires";
                    direction: "from_target" | "to_target";
                } | {
                    kind: "standard_requirement";
                    requirement: {
                        namespace: string;
                        version: string;
                        requirement_id: string;
                        relation: "informational-reference" | "tests";
                    };
                })[];
            }[];
        }[];
        evidence_terms?: string[] | undefined;
        value_evidence: {
            value: "no" | "not_applicable" | "partial" | "yes";
            alternatives: {
                alternative_id: string;
                required_basis_kinds: ("bounded_absence" | "certification_receipt" | "direct_observation" | "explicit_first_party_declaration" | "service_exchange" | "standard_requirement")[];
                minimum_distinct_captures: number;
                require_independent_capture_rungs: boolean;
                required_artifacts: ("capture_interaction_trace" | "evidence_excerpt" | "interaction_trace" | "manual_review_note" | "screenshot" | "source_observation" | "standard_evidence_result")[];
                minimum_surfaces: number;
                minimum_branches: number;
            }[];
        }[];
        priority: number;
        blocker?: {
            code: string;
            explanation: string;
        } | undefined;
        remediation?: {
            code: string;
            instruction: string;
        } | undefined;
        fact_question: string;
        fact_predicates: {
            yes: string;
            partial: string;
            no: string;
            unknown: string;
            not_applicable: string;
        };
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
            relation: "informational-reference" | "tests";
        }[];
        standard_evidence: {
            requirement: {
                namespace: string;
                version: string;
                requirement_id: string;
                relation: "informational-reference" | "tests";
            };
            support: {
                result: "not_satisfied" | "satisfied";
                values: ("no" | "not_applicable" | "partial" | "yes")[];
            }[];
        }[];
    }[];
    aggregation: {
        stage: "worst-signal";
        overall: "worst-stage";
        outcome_precedence: ("constrained" | "fail" | "not_applicable" | "pass" | "unknown")[];
        blocker_precedence: "outcome-then-rule-priority";
        tie_breaker: "signal-code";
    };
    coverage: {
        unknown_signals: "uncovered";
        contradicted_signals: "uncovered";
    };
    freshness: {
        source: "observation-freshness-policy";
        aggregation: "worst-evaluated-signal" | "worst-required-signal" | "worst-signal";
    };
    public_states: {
        pass: {
            state: "blocked" | "limited" | "not_applicable" | "ready" | "unknown";
            label: string;
        };
        constrained: {
            state: "blocked" | "limited" | "not_applicable" | "ready" | "unknown";
            label: string;
        };
        fail: {
            state: "blocked" | "limited" | "not_applicable" | "ready" | "unknown";
            label: string;
        };
        unknown: {
            state: "blocked" | "limited" | "not_applicable" | "ready" | "unknown";
            label: string;
        };
        not_applicable: {
            state: "blocked" | "limited" | "not_applicable" | "ready" | "unknown";
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
        unverified_barrier_grade_cap?: "B+" | undefined;
        unobserved_operation_grade_cap: "B+";
        not_applicable_signals: "excluded";
        unrated_when: {
            coverage: "not-complete";
            freshness: "not-fresh";
            except: "fresh-supported-essential-failure";
        };
    };
    grade_derivation: {
        label: string;
        explanation: string;
        coverage_rule: string;
        outcome_rule: string;
    };
    policy_digest: string;
};
export declare const CURRENT_AGENT_READINESS_POLICY_DIGEST: string;
//# sourceMappingURL=current-policy.d.ts.map