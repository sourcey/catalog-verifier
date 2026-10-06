import type { z } from "zod";
export * from "./current-policy.js";
export * from "./current-policy-validation.js";
export * from "./grading.js";
export * from "./impact.js";
export * from "./offer-relations.js";
export * from "./policy-validation.js";
export * from "./revision.js";
export * from "./standard-mapping.js";
import { type AgentReadinessDeclarationRevision, type AgentReadinessPolicy, type AgentReadinessProjection, type AgentReadinessProjectionLineage, type AgentReadinessRevision, type agentReadinessStageOutcomeSchema } from "../../../contracts/agent-readiness/src/index.js";
import type { FreshnessPolicy } from "../../../contracts/policies/src/index.js";
import type { EntityRevision } from "../../../contracts/revisions/src/index.js";
import type { StandardEvidenceResult } from "../../../contracts/standards/src/index.js";
import { type EvidenceStandingGraph } from "../../provenance/src/index.js";
export { agentReadinessAssessmentTargetIdsForSurface, agentReadinessSelectorGroupUsesAssessmentTargets, assertAgentReadinessDeclarationPolicyScope, assertAgentReadinessSignalSelectorCoverage, } from "./surface-selection.js";
type StageOutcome = z.infer<typeof agentReadinessStageOutcomeSchema>;
export declare function agentReadinessValuesSupportedByStandardEvidence(input: {
    readonly policy: unknown;
    readonly stage: string;
    readonly signalCode: string;
    readonly result: StandardEvidenceResult | unknown;
}): AgentReadinessRevision["signals"][number]["value"][];
export declare function deriveAgentReadinessProjection(input: {
    readonly revision: AgentReadinessRevision;
    readonly declarationRevision: AgentReadinessDeclarationRevision;
    readonly authorityEntityRevision: EntityRevision;
    readonly priorProjection?: AgentReadinessProjectionLineage | null;
    readonly graph: EvidenceStandingGraph;
    readonly policy: AgentReadinessPolicy;
    readonly policyAsOf: string;
    readonly freshnessPolicy: FreshnessPolicy;
    readonly entitySlug: string;
}): AgentReadinessProjection;
export declare function deriveAgentReadinessAssessment(input: {
    readonly revision: AgentReadinessRevision;
    readonly declarationRevision: AgentReadinessDeclarationRevision;
    readonly authorityEntityRevision: EntityRevision;
    readonly graph: EvidenceStandingGraph;
    readonly policy: AgentReadinessPolicy;
    readonly policyAsOf: string;
    readonly freshnessPolicy: FreshnessPolicy;
}): {
    readonly stages: {
        stage: "evaluate" | "operate" | "pay" | "provision" | "sign_up";
        stage_label: string;
        outcome: "constrained" | "fail" | "not_applicable" | "pass" | "unknown";
        public_state: "blocked" | "limited" | "not_applicable" | "ready" | "unknown";
        state_label: string;
        primary_finding: {
            signal_code: string;
            condition: string;
            finding: string;
            context?: string;
        };
        secondary_context: {
            signal_code: string;
            condition: string;
            finding: string;
            context?: string;
        }[];
        signals: ({
            signal_code: string;
            evaluation_role: "barrier" | "graded" | "informational";
            required: boolean;
            value: "no" | "not_applicable" | "partial" | "unknown" | "yes";
            value_label: string;
            outcome: "constrained" | "fail" | "not_applicable" | "pass" | "unknown";
            public_state: "blocked" | "limited" | "not_applicable" | "ready" | "unknown";
            condition: string;
            finding: string;
            evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
            freshness: "fresh" | "stale" | "unknown";
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
            note?: string;
            blocker?: {
                code: string;
                explanation: string;
                signal_code: string;
            };
            remediation?: {
                code: string;
                instruction: string;
                signal_code: string;
            };
        } | {
            signal_code: string;
            evaluation_role: "barrier" | "graded" | "informational";
            required: boolean;
            value: "no" | "not_applicable" | "partial" | "unknown" | "yes";
            value_label: string;
            outcome: "constrained" | "fail" | "not_applicable" | "pass" | "unknown";
            public_state: "blocked" | "limited" | "not_applicable" | "ready" | "unknown";
            condition: string;
            finding: string;
            evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
            freshness: "fresh" | "stale" | "unknown";
            tested_surfaces: {
                node_kind: "endpoint" | "interface" | "resource" | "surface_exclusion";
                node_id: string;
            }[];
            determination_bases: never[];
            blocker?: {
                code: string;
                explanation: string;
                signal_code: string;
            };
            remediation?: {
                code: string;
                instruction: string;
                signal_code: string;
            };
        })[];
        blockers: {
            code: string;
            explanation: string;
            signal_code: string;
        }[];
        remediations: {
            code: string;
            instruction: string;
            signal_code: string;
        }[];
    }[];
    readonly signals: ({
        signal_code: string;
        evaluation_role: "barrier" | "graded" | "informational";
        required: boolean;
        value: "no" | "not_applicable" | "partial" | "unknown" | "yes";
        value_label: string;
        outcome: "constrained" | "fail" | "not_applicable" | "pass" | "unknown";
        public_state: "blocked" | "limited" | "not_applicable" | "ready" | "unknown";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "fresh" | "stale" | "unknown";
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
        note?: string;
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
    } | {
        signal_code: string;
        evaluation_role: "barrier" | "graded" | "informational";
        required: boolean;
        value: "no" | "not_applicable" | "partial" | "unknown" | "yes";
        value_label: string;
        outcome: "constrained" | "fail" | "not_applicable" | "pass" | "unknown";
        public_state: "blocked" | "limited" | "not_applicable" | "ready" | "unknown";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "fresh" | "stale" | "unknown";
        tested_surfaces: {
            node_kind: "endpoint" | "interface" | "resource" | "surface_exclusion";
            node_id: string;
        }[];
        determination_bases: never[];
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
    })[];
    readonly gradedSignals: ({
        signal_code: string;
        evaluation_role: "barrier" | "graded" | "informational";
        required: boolean;
        value: "no" | "not_applicable" | "partial" | "unknown" | "yes";
        value_label: string;
        outcome: "constrained" | "fail" | "not_applicable" | "pass" | "unknown";
        public_state: "blocked" | "limited" | "not_applicable" | "ready" | "unknown";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "fresh" | "stale" | "unknown";
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
        note?: string;
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
    } | {
        signal_code: string;
        evaluation_role: "barrier" | "graded" | "informational";
        required: boolean;
        value: "no" | "not_applicable" | "partial" | "unknown" | "yes";
        value_label: string;
        outcome: "constrained" | "fail" | "not_applicable" | "pass" | "unknown";
        public_state: "blocked" | "limited" | "not_applicable" | "ready" | "unknown";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "fresh" | "stale" | "unknown";
        tested_surfaces: {
            node_kind: "endpoint" | "interface" | "resource" | "surface_exclusion";
            node_id: string;
        }[];
        determination_bases: never[];
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
    })[];
    readonly coveredSignals: ({
        signal_code: string;
        evaluation_role: "barrier" | "graded" | "informational";
        required: boolean;
        value: "no" | "not_applicable" | "partial" | "unknown" | "yes";
        value_label: string;
        outcome: "constrained" | "fail" | "not_applicable" | "pass" | "unknown";
        public_state: "blocked" | "limited" | "not_applicable" | "ready" | "unknown";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "fresh" | "stale" | "unknown";
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
        note?: string;
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
    } | {
        signal_code: string;
        evaluation_role: "barrier" | "graded" | "informational";
        required: boolean;
        value: "no" | "not_applicable" | "partial" | "unknown" | "yes";
        value_label: string;
        outcome: "constrained" | "fail" | "not_applicable" | "pass" | "unknown";
        public_state: "blocked" | "limited" | "not_applicable" | "ready" | "unknown";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "fresh" | "stale" | "unknown";
        tested_surfaces: {
            node_kind: "endpoint" | "interface" | "resource" | "surface_exclusion";
            node_id: string;
        }[];
        determination_bases: never[];
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
    })[];
    readonly coverageRatio: number;
    readonly coverageStatus: "complete" | "incomplete";
    readonly barrierSignals: ({
        signal_code: string;
        evaluation_role: "barrier" | "graded" | "informational";
        required: boolean;
        value: "no" | "not_applicable" | "partial" | "unknown" | "yes";
        value_label: string;
        outcome: "constrained" | "fail" | "not_applicable" | "pass" | "unknown";
        public_state: "blocked" | "limited" | "not_applicable" | "ready" | "unknown";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "fresh" | "stale" | "unknown";
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
        note?: string;
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
    } | {
        signal_code: string;
        evaluation_role: "barrier" | "graded" | "informational";
        required: boolean;
        value: "no" | "not_applicable" | "partial" | "unknown" | "yes";
        value_label: string;
        outcome: "constrained" | "fail" | "not_applicable" | "pass" | "unknown";
        public_state: "blocked" | "limited" | "not_applicable" | "ready" | "unknown";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "fresh" | "stale" | "unknown";
        tested_surfaces: {
            node_kind: "endpoint" | "interface" | "resource" | "surface_exclusion";
            node_id: string;
        }[];
        determination_bases: never[];
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
    })[];
    readonly verifiedBarrierSignals: ({
        signal_code: string;
        evaluation_role: "barrier" | "graded" | "informational";
        required: boolean;
        value: "no" | "not_applicable" | "partial" | "unknown" | "yes";
        value_label: string;
        outcome: "constrained" | "fail" | "not_applicable" | "pass" | "unknown";
        public_state: "blocked" | "limited" | "not_applicable" | "ready" | "unknown";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "fresh" | "stale" | "unknown";
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
        note?: string;
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
    } | {
        signal_code: string;
        evaluation_role: "barrier" | "graded" | "informational";
        required: boolean;
        value: "no" | "not_applicable" | "partial" | "unknown" | "yes";
        value_label: string;
        outcome: "constrained" | "fail" | "not_applicable" | "pass" | "unknown";
        public_state: "blocked" | "limited" | "not_applicable" | "ready" | "unknown";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "fresh" | "stale" | "unknown";
        tested_surfaces: {
            node_kind: "endpoint" | "interface" | "resource" | "surface_exclusion";
            node_id: string;
        }[];
        determination_bases: never[];
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
    })[];
    readonly barrierRatio: number;
    readonly freshness: "fresh" | "stale" | "unknown";
    readonly overallOutcome: "constrained" | "fail" | "not_applicable" | "pass" | "unknown";
    readonly grade: "A" | "A+" | "B" | "B+" | "C" | "C+" | "D" | "F" | "unrated";
};
export type AgentReadinessAssessment = ReturnType<typeof deriveAgentReadinessAssessment>;
export declare function verifyAgentReadinessProjection(input: unknown): AgentReadinessProjection;
export declare function regradeAgentReadinessProjection(input: {
    readonly revision: AgentReadinessRevision;
    readonly declarationRevision: AgentReadinessDeclarationRevision;
    readonly authorityEntityRevision: EntityRevision;
    readonly priorProjection: AgentReadinessProjection;
    readonly graph: EvidenceStandingGraph;
    readonly policy: AgentReadinessPolicy;
    readonly policyAsOf: string;
    readonly freshnessPolicy: FreshnessPolicy;
    readonly entitySlug: string;
}): AgentReadinessProjection;
/**
 * Move only the public route of an immutable assessment projection. This is
 * the contract-transition path: it retains every assessed fact, grade,
 * evidence binding, policy result, and publication decision byte-for-byte.
 */
export declare function reprojectAgentReadinessCanonicalRoute(input: {
    readonly revision: AgentReadinessRevision;
    readonly priorProjection: AgentReadinessProjection;
    readonly entitySlug: string;
}): AgentReadinessProjection;
/** A relocation changes the locator, never the immutable assessment facts. */
export declare function isAgentReadinessRouteOnlySuccession(prior: AgentReadinessProjectionLineage, current: AgentReadinessProjection): boolean;
export declare function deriveAgentReadinessReprojection(input: {
    readonly currentProjection: AgentReadinessProjection;
    readonly revision: AgentReadinessRevision;
    readonly declarationRevision: AgentReadinessDeclarationRevision;
    readonly authorityEntityRevision: EntityRevision;
    readonly priorProjection: AgentReadinessProjection;
    readonly graph: EvidenceStandingGraph;
    readonly policy: AgentReadinessPolicy;
    readonly policyAsOf: string;
    readonly freshnessPolicy: FreshnessPolicy;
    readonly entitySlug: string;
}): AgentReadinessProjection;
export declare function agentReadinessSignalOutcome(rule: AgentReadinessPolicy["signal_rules"][number], value: AgentReadinessRevision["signals"][number]["value"]): StageOutcome;
export declare function worstAgentReadinessOutcome(outcomes: readonly StageOutcome[], precedence: readonly StageOutcome[]): StageOutcome;
//# sourceMappingURL=index.d.ts.map