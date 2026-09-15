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
export { agentReadinessDeclarationPolicyGaps, assertAgentReadinessDeclarationPolicyClosure, assertAgentReadinessSignalSelectorCoverage, } from "./surface-selection.js";
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
        stage: "evaluate" | "sign_up" | "pay" | "provision" | "operate";
        stage_label: string;
        outcome: "unknown" | "not_applicable" | "pass" | "constrained" | "fail";
        public_state: "unknown" | "not_applicable" | "ready" | "limited" | "blocked";
        state_label: string;
        primary_finding: {
            context?: string;
            signal_code: string;
            condition: string;
            finding: string;
        };
        secondary_context: {
            context?: string;
            signal_code: string;
            condition: string;
            finding: string;
        }[];
        signals: ({
            remediation?: {
                code: string;
                instruction: string;
                signal_code: string;
            };
            blocker?: {
                code: string;
                explanation: string;
                signal_code: string;
            };
            note?: string;
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
            signal_code: string;
            evaluation_role: "graded" | "barrier" | "informational";
            required: boolean;
            value: "unknown" | "yes" | "no" | "partial" | "not_applicable";
            value_label: string;
            outcome: "unknown" | "not_applicable" | "pass" | "constrained" | "fail";
            public_state: "unknown" | "not_applicable" | "ready" | "limited" | "blocked";
            condition: string;
            finding: string;
            evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
            freshness: "unknown" | "fresh" | "stale";
        } | {
            remediation?: {
                code: string;
                instruction: string;
                signal_code: string;
            };
            blocker?: {
                code: string;
                explanation: string;
                signal_code: string;
            };
            tested_surfaces: never[];
            determination_bases: never[];
            signal_code: string;
            evaluation_role: "graded" | "barrier" | "informational";
            required: boolean;
            value: "unknown" | "yes" | "no" | "partial" | "not_applicable";
            value_label: string;
            outcome: "unknown" | "not_applicable" | "pass" | "constrained" | "fail";
            public_state: "unknown" | "not_applicable" | "ready" | "limited" | "blocked";
            condition: string;
            finding: string;
            evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
            freshness: "unknown" | "fresh" | "stale";
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
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        note?: string;
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
        signal_code: string;
        evaluation_role: "graded" | "barrier" | "informational";
        required: boolean;
        value: "unknown" | "yes" | "no" | "partial" | "not_applicable";
        value_label: string;
        outcome: "unknown" | "not_applicable" | "pass" | "constrained" | "fail";
        public_state: "unknown" | "not_applicable" | "ready" | "limited" | "blocked";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "unknown" | "fresh" | "stale";
    } | {
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        tested_surfaces: never[];
        determination_bases: never[];
        signal_code: string;
        evaluation_role: "graded" | "barrier" | "informational";
        required: boolean;
        value: "unknown" | "yes" | "no" | "partial" | "not_applicable";
        value_label: string;
        outcome: "unknown" | "not_applicable" | "pass" | "constrained" | "fail";
        public_state: "unknown" | "not_applicable" | "ready" | "limited" | "blocked";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "unknown" | "fresh" | "stale";
    })[];
    readonly gradedSignals: ({
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        note?: string;
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
        signal_code: string;
        evaluation_role: "graded" | "barrier" | "informational";
        required: boolean;
        value: "unknown" | "yes" | "no" | "partial" | "not_applicable";
        value_label: string;
        outcome: "unknown" | "not_applicable" | "pass" | "constrained" | "fail";
        public_state: "unknown" | "not_applicable" | "ready" | "limited" | "blocked";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "unknown" | "fresh" | "stale";
    } | {
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        tested_surfaces: never[];
        determination_bases: never[];
        signal_code: string;
        evaluation_role: "graded" | "barrier" | "informational";
        required: boolean;
        value: "unknown" | "yes" | "no" | "partial" | "not_applicable";
        value_label: string;
        outcome: "unknown" | "not_applicable" | "pass" | "constrained" | "fail";
        public_state: "unknown" | "not_applicable" | "ready" | "limited" | "blocked";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "unknown" | "fresh" | "stale";
    })[];
    readonly coveredSignals: ({
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        note?: string;
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
        signal_code: string;
        evaluation_role: "graded" | "barrier" | "informational";
        required: boolean;
        value: "unknown" | "yes" | "no" | "partial" | "not_applicable";
        value_label: string;
        outcome: "unknown" | "not_applicable" | "pass" | "constrained" | "fail";
        public_state: "unknown" | "not_applicable" | "ready" | "limited" | "blocked";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "unknown" | "fresh" | "stale";
    } | {
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        tested_surfaces: never[];
        determination_bases: never[];
        signal_code: string;
        evaluation_role: "graded" | "barrier" | "informational";
        required: boolean;
        value: "unknown" | "yes" | "no" | "partial" | "not_applicable";
        value_label: string;
        outcome: "unknown" | "not_applicable" | "pass" | "constrained" | "fail";
        public_state: "unknown" | "not_applicable" | "ready" | "limited" | "blocked";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "unknown" | "fresh" | "stale";
    })[];
    readonly coverageRatio: number;
    readonly coverageStatus: "incomplete" | "complete";
    readonly barrierSignals: ({
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        note?: string;
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
        signal_code: string;
        evaluation_role: "graded" | "barrier" | "informational";
        required: boolean;
        value: "unknown" | "yes" | "no" | "partial" | "not_applicable";
        value_label: string;
        outcome: "unknown" | "not_applicable" | "pass" | "constrained" | "fail";
        public_state: "unknown" | "not_applicable" | "ready" | "limited" | "blocked";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "unknown" | "fresh" | "stale";
    } | {
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        tested_surfaces: never[];
        determination_bases: never[];
        signal_code: string;
        evaluation_role: "graded" | "barrier" | "informational";
        required: boolean;
        value: "unknown" | "yes" | "no" | "partial" | "not_applicable";
        value_label: string;
        outcome: "unknown" | "not_applicable" | "pass" | "constrained" | "fail";
        public_state: "unknown" | "not_applicable" | "ready" | "limited" | "blocked";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "unknown" | "fresh" | "stale";
    })[];
    readonly verifiedBarrierSignals: ({
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        note?: string;
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
        signal_code: string;
        evaluation_role: "graded" | "barrier" | "informational";
        required: boolean;
        value: "unknown" | "yes" | "no" | "partial" | "not_applicable";
        value_label: string;
        outcome: "unknown" | "not_applicable" | "pass" | "constrained" | "fail";
        public_state: "unknown" | "not_applicable" | "ready" | "limited" | "blocked";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "unknown" | "fresh" | "stale";
    } | {
        remediation?: {
            code: string;
            instruction: string;
            signal_code: string;
        };
        blocker?: {
            code: string;
            explanation: string;
            signal_code: string;
        };
        tested_surfaces: never[];
        determination_bases: never[];
        signal_code: string;
        evaluation_role: "graded" | "barrier" | "informational";
        required: boolean;
        value: "unknown" | "yes" | "no" | "partial" | "not_applicable";
        value_label: string;
        outcome: "unknown" | "not_applicable" | "pass" | "constrained" | "fail";
        public_state: "unknown" | "not_applicable" | "ready" | "limited" | "blocked";
        condition: string;
        finding: string;
        evidence_status: import("../../provenance/src/index.js").EvidenceStanding;
        freshness: "unknown" | "fresh" | "stale";
    })[];
    readonly barrierRatio: number;
    readonly freshness: "unknown" | "fresh" | "stale";
    readonly overallOutcome: "unknown" | "not_applicable" | "pass" | "constrained" | "fail";
    readonly grade: "A+" | "A" | "B+" | "B" | "C+" | "C" | "D" | "F" | "unrated";
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