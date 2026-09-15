import { agentReadinessAssessmentMethodPackCoreSchema, agentReadinessAssessmentMethodPackSchema, agentReadinessPolicyCoreSchema, agentReadinessPolicySchema, } from "../../../contracts/agent-readiness/src/index.js";
import { digest } from "../../primitives/src/index.js";
import { METRICS } from "./current-policy-metrics.js";
const AI_CATALOG_ENTRIES_REQUIREMENT = {
    namespace: "ai-catalog",
    version: "1.0",
    requirement_id: "document.entries",
    relation: "tests",
};
const OPENAPI_REQUIREMENTS = {
    operations: {
        namespace: "openapi",
        version: "3.1.2",
        requirement_id: "operations.present",
        relation: "tests",
    },
    responses: {
        namespace: "openapi",
        version: "3.1.2",
        requirement_id: "operations.responses",
        relation: "tests",
    },
    errorResponses: {
        namespace: "openapi",
        version: "3.1.2",
        requirement_id: "operations.error-responses",
        relation: "tests",
    },
    oauth: {
        namespace: "openapi",
        version: "3.1.2",
        requirement_id: "security.oauth2-or-openid-connect",
        relation: "tests",
    },
};
function metricStandardEvidence(metric) {
    if (metric.code === "structured_evaluation_discovery") {
        return [
            {
                requirement: AI_CATALOG_ENTRIES_REQUIREMENT,
                support: [
                    { result: "satisfied", values: ["yes"] },
                    { result: "not_satisfied", values: ["no"] },
                ],
            },
        ];
    }
    if (metric.code === "target_interface_access") {
        return [
            {
                requirement: OPENAPI_REQUIREMENTS.operations,
                support: [{ result: "satisfied", values: ["yes"] }],
            },
        ];
    }
    if (metric.code === "operation_contract") {
        return [
            {
                requirement: OPENAPI_REQUIREMENTS.responses,
                support: [
                    { result: "satisfied", values: ["partial"] },
                    { result: "not_satisfied", values: ["no"] },
                ],
            },
        ];
    }
    if (metric.code === "failure_contract") {
        return [
            {
                requirement: OPENAPI_REQUIREMENTS.errorResponses,
                support: [
                    { result: "satisfied", values: ["partial"] },
                    { result: "not_satisfied", values: ["no"] },
                ],
            },
        ];
    }
    if (metric.code === "operation_authentication") {
        return [
            {
                requirement: OPENAPI_REQUIREMENTS.oauth,
                support: [{ result: "satisfied", values: ["partial"] }],
            },
        ];
    }
    return [];
}
function buildMethod(input) {
    const determinationBases = input.determinationBases ?? [
        "direct_observation",
        "bounded_absence",
        "explicit_first_party_declaration",
        "standard_requirement",
    ];
    const core = agentReadinessAssessmentMethodPackCoreSchema.parse({
        method_contract: "sourcey.agent-readiness-method/v1alpha1",
        name: input.name,
        version: input.version,
        capabilities: METRICS.map((metric) => ({
            stage: metric.stage,
            signal_code: metric.code,
            values: metric.allowNotApplicable
                ? ["yes", "partial", "no", "not_applicable"]
                : ["yes", "partial", "no"],
            determination_bases: determinationBases,
        })),
        surface_support: {
            node_kinds: ["resource", "endpoint", "interface"],
            resource_roles: [
                "discovery",
                "terms",
                "eligibility",
                "pricing",
                "access",
                "checkout",
                "provisioning",
                "operations",
                "recovery",
                "authentication",
                "descriptor",
                "documentation",
                "policy",
                "status",
            ],
            endpoint_roles: [
                "service",
                "authorization",
                "token",
                "registration",
                "protected_resource",
                "checkout",
                "status",
                "recovery",
                "webhook",
            ],
            interface_modalities: [
                "web_application",
                "network_api",
                "command_line",
                "software_library",
                "tool_server",
                "agent_service",
            ],
            interface_functions: [
                "service_operation",
                "authentication",
                "commerce",
                "events",
                "recovery",
            ],
        },
        capture: {
            rungs: input.rungs,
            redirects: "allowed-hosts",
            require_https: true,
            max_redirects: 5,
            timeout_ms: 30_000,
            max_bytes: 5_000_000,
            freshness_capability: "current",
        },
        interaction: {
            mode: "non_mutating",
            max_actions: input.maxActions,
            allowed_actions: input.maxActions === 0
                ? []
                : [
                    "navigate",
                    "follow_link",
                    "expand_disclosure",
                    "select_non_submitting_control",
                    "scroll",
                    "wait",
                ],
            forbidden_effects: [
                "submit_application",
                "create_account",
                "send_verification_code",
                "accept_terms",
                "enter_credentials",
                "enter_payment_details",
                "purchase",
                "provision",
                "create_key",
                "invoke_billable_service",
            ],
        },
        required_artifacts: [
            "raw_bytes",
            "normalized_text",
            "utf8_locators",
            "redirect_chain",
            ...(input.rungs.includes("headless") ? ["interaction_trace"] : []),
            ...(input.rungs.includes("manual") ? ["manual_review_note"] : []),
        ],
        failure_classes: [
            "network_failure",
            "policy_refusal",
            "authentication_required",
            "timeout",
            "render_failure",
            "invalid_structure",
            "interaction_budget_exhausted",
            "capture_unavailable",
        ],
        residue_classes: [
            "unresolved_signal",
            "insufficient_determination_basis",
            "conflicting_observations",
            "scope_mismatch",
            "manual_review_required",
            "unsupported_interaction",
        ],
        external_references: [],
    });
    return agentReadinessAssessmentMethodPackSchema.parse({
        ...core,
        method_digest: digest(core),
    });
}
function alternative(id, kinds, input = {}) {
    return {
        alternative_id: id,
        required_basis_kinds: kinds,
        minimum_distinct_captures: input.captures ?? (kinds.includes("standard_requirement") ? 0 : 1),
        require_independent_capture_rungs: input.independent ?? false,
        required_artifacts: kinds.includes("standard_requirement")
            ? ["standard_evidence_result"]
            : kinds.includes("bounded_absence")
                ? ["normalized_text", "redirect_chain"]
                : ["normalized_text", "utf8_locators"],
        minimum_surfaces: input.surfaces ?? (kinds.includes("standard_requirement") ? 0 : 1),
        minimum_branches: input.branches ?? (kinds.includes("bounded_absence") ? 1 : 0),
    };
}
function evidenceAlternatives(metric, value) {
    if (value === "not_applicable") {
        return [
            alternative("explicit-no-step", ["explicit_first_party_declaration"]),
            alternative("bounded-exact-funnel", ["bounded_absence"], { captures: 2, branches: 1 }),
            alternative("verified-standard-not-applicable", ["standard_requirement"]),
        ];
    }
    if (value === "partial") {
        return [
            alternative("located-partial-condition", ["direct_observation"]),
            alternative("declared-partial-condition", ["explicit_first_party_declaration"]),
            alternative("verified-standard-partial", ["standard_requirement"]),
        ];
    }
    if (metric.evidence === "availability") {
        return value === "yes"
            ? [
                alternative("located-available-surface", ["direct_observation"]),
                alternative("declared-available-surface", ["explicit_first_party_declaration"]),
                alternative("verified-standard-available", ["standard_requirement"]),
            ]
            : [
                alternative("bounded-unavailable-scope", ["bounded_absence"], {
                    captures: 2,
                    branches: 1,
                }),
                alternative("declared-unavailable-scope", ["explicit_first_party_declaration"]),
                alternative("verified-standard-unavailable", ["standard_requirement"]),
            ];
    }
    if (metric.evidence === "compatible_absence") {
        return value === "yes"
            ? [
                alternative("declared-compatible-alternative", ["explicit_first_party_declaration"]),
                alternative("verified-standard-compatible", ["standard_requirement"]),
            ]
            : [
                alternative("corroborated-mandatory-blocker", ["direct_observation"], { captures: 2 }),
                alternative("declared-mandatory-blocker", ["explicit_first_party_declaration"]),
                alternative("verified-standard-blocker", ["standard_requirement"]),
            ];
    }
    if (value === "no") {
        return [
            alternative("corroborated-blocker", ["direct_observation"], { captures: 2 }),
            alternative("declared-blocker", ["explicit_first_party_declaration"]),
            alternative("verified-standard-blocker", ["standard_requirement"]),
        ];
    }
    return [
        alternative(`located-${value}-condition`, ["direct_observation"]),
        alternative(`declared-${value}-condition`, ["explicit_first_party_declaration"]),
        alternative(`verified-standard-${value}`, ["standard_requirement"]),
    ];
}
export function buildCurrentAgentReadinessPolicy() {
    const methods = [
        buildMethod({
            name: "public-semantic-assessment",
            version: "2026-09-06",
            rungs: ["http", "headless"],
            maxActions: 20,
        }),
        buildMethod({
            name: "operator-reviewed-public-document",
            version: "2026-08-20",
            rungs: ["manual"],
            maxActions: 0,
            determinationBases: ["direct_observation", "explicit_first_party_declaration"],
        }),
    ];
    const methodDigests = methods.map((method) => method.method_digest);
    const core = agentReadinessPolicyCoreSchema.parse({
        policy_contract: "sourcey.agent-readiness-policy/v1alpha1",
        policy_version: "service-use-2026-09-07-blocking-barriers-r12",
        assessment_basis: {
            principal: "authorized_human_or_organization",
            initial_state: {
                product_specific_account: false,
                product_credentials: false,
                paid_subscription: false,
                provisioned_resource: false,
                external_identity: "only_when_declared_by_exact_funnel",
            },
            permitted_human_boundaries: [
                "account_ownership_confirmation",
                "delegated_identity_consent",
                "regulated_approval",
                "final_payment_or_irreversible_commitment",
            ],
            required_handoff_properties: [
                "exact_disclosure",
                "resumable_handoff",
                "deterministic_continuation",
            ],
            forbidden_substitutions: [
                "captcha_solving",
                "human_password_or_session_sharing",
                "concealed_agent_identity",
                "invented_eligibility",
                "unbound_out_of_band_code",
                "vendor_policy_bypass",
                "unapproved_consequential_action",
            ],
            success: {
                target_coverage: "every_declared_target",
                interface_coverage: "at_least_one_declared_alternative",
                authority: "scoped",
                failure_semantics: "documented",
                recovery: "supported",
            },
            observed_assessment: {
                allowed_sources: [
                    "public_documentation",
                    "public_metadata",
                    "public_endpoints",
                    "non_mutating_interaction",
                    "operator_attested_public_observation",
                ],
                consequential_claims: "certification_required",
            },
        },
        assessment_methods: methods,
        signal_rules: METRICS.map((metric, index) => {
            const assessableValues = metric.allowNotApplicable
                ? ["yes", "partial", "no", "not_applicable"]
                : ["yes", "partial", "no"];
            const standardEvidence = metricStandardEvidence(metric);
            return {
                stage: metric.stage,
                signal_code: metric.code,
                evaluation_role: metric.role,
                required: metric.role === "graded",
                pass_values: metric.allowNotApplicable ? ["yes", "not_applicable"] : ["yes"],
                constrained_values: ["partial"],
                fail_values: ["no"],
                allow_not_applicable: metric.allowNotApplicable ?? false,
                allowed_method_digests: methodDigests,
                selector_groups: [
                    {
                        selector_group_id: `${metric.code}-primary`,
                        coverage: metric.coverage ?? "at_least_one",
                        alternatives: metric.selectorAlternatives.map((selectors, alternativeIndex) => ({
                            alternative_id: `${metric.code}-surface-${alternativeIndex + 1}`,
                            selectors,
                        })),
                    },
                ],
                evidence_terms: [...metric.evidenceTerms],
                value_evidence: assessableValues.map((value) => ({
                    value,
                    alternatives: evidenceAlternatives(metric, value),
                })),
                priority: index,
                ...(metric.role !== "informational"
                    ? { blocker: { code: `${metric.stage}.${metric.code}`, explanation: metric.blocked } }
                    : {}),
                ...(metric.role !== "informational"
                    ? {
                        remediation: {
                            code: `improve.${metric.stage}.${metric.code}`,
                            instruction: metric.remediation,
                        },
                    }
                    : {}),
                public_findings: {
                    yes: { condition: metric.condition, finding: metric.ready },
                    partial: { condition: metric.condition, finding: metric.limited },
                    no: { condition: metric.condition, finding: metric.blocked },
                    unknown: {
                        condition: metric.condition,
                        finding: "Current admissible evidence does not resolve this finding.",
                    },
                    not_applicable: {
                        condition: metric.condition,
                        finding: "Admitted evidence establishes that this step does not apply to the assessed service.",
                    },
                },
                external_references: standardEvidence.map((mapping) => mapping.requirement),
                standard_evidence: standardEvidence,
            };
        }),
        aggregation: {
            stage: "worst-signal",
            overall: "worst-stage",
            outcome_precedence: ["unknown", "fail", "constrained", "pass", "not_applicable"],
            blocker_precedence: "outcome-then-rule-priority",
            tie_breaker: "signal-code",
        },
        coverage: { unknown_signals: "uncovered", contradicted_signals: "uncovered" },
        freshness: { source: "observation-freshness-policy", aggregation: "worst-evaluated-signal" },
        public_states: {
            pass: { state: "ready", label: "Ready" },
            constrained: { state: "limited", label: "Limited" },
            fail: { state: "blocked", label: "Blocked" },
            unknown: { state: "unknown", label: "Unknown" },
            not_applicable: { state: "not_applicable", label: "Not applicable" },
        },
        grading: {
            strategy: "stage-state-cardinality",
            grade_by_limited_stage_count: {
                "0": "A+",
                "1": "A",
                "2": "B+",
                "3": "B",
                "4": "C+",
                "5": "C",
            },
            failure_grade_by_stage: {
                evaluate: "D",
                sign_up: "D",
                pay: "D",
                provision: "F",
                operate: "F",
            },
            not_applicable_signals: "excluded",
            unrated_when: { coverage: "not-complete", freshness: "not-fresh" },
        },
        grade_derivation: {
            label: "Five-stage Agent Readiness report card",
            explanation: "A through C grades count Limited stages; D and F reflect Blocked stages by lifecycle severity.",
            coverage_rule: "Coverage is complete only when every graded signal has supported, fresh, non-conflicting evidence. Barrier and informational signals do not change coverage; only fresh, supported barrier values that passed their admission evidence rule participate in stage outcomes.",
            outcome_rule: "Each stage takes its worst graded signal or verified barrier. A fresh, supported mandatory barrier that passed its admission evidence rule can block that stage; incomplete or stale barrier evidence remains context only. The overall grade is derived from the five stage states.",
        },
    });
    return agentReadinessPolicySchema.parse({ ...core, policy_digest: digest(core) });
}
export const currentAgentReadinessPolicy = buildCurrentAgentReadinessPolicy();
export const CURRENT_AGENT_READINESS_POLICY_DIGEST = currentAgentReadinessPolicy.policy_digest;
//# sourceMappingURL=current-policy.js.map