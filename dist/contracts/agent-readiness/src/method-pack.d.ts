import { z } from "zod";
import { agentReadinessSignalCodeSchema, agentReadinessSignalValueSchema, agentReadinessStageSchema } from "./shared.js";
export declare const agentReadinessCaptureRungSchema: z.ZodEnum<{
    archive: "archive";
    headless: "headless";
    http: "http";
    manual: "manual";
}>;
export type AgentReadinessCaptureRung = z.infer<typeof agentReadinessCaptureRungSchema>;
export declare const agentReadinessMethodCapabilitySchema: z.ZodObject<{
    stage: z.ZodEnum<{
        evaluate: "evaluate";
        operate: "operate";
        pay: "pay";
        provision: "provision";
        sign_up: "sign_up";
    }>;
    signal_code: z.ZodString;
    values: z.ZodArray<z.ZodEnum<{
        no: "no";
        not_applicable: "not_applicable";
        partial: "partial";
        yes: "yes";
    }>>;
    determination_bases: z.ZodArray<z.ZodEnum<{
        bounded_absence: "bounded_absence";
        certification_receipt: "certification_receipt";
        direct_observation: "direct_observation";
        explicit_first_party_declaration: "explicit_first_party_declaration";
        service_exchange: "service_exchange";
        standard_requirement: "standard_requirement";
    }>>;
}, z.core.$strict>;
export declare const agentReadinessMethodFailureClassSchema: z.ZodEnum<{
    authentication_required: "authentication_required";
    capture_unavailable: "capture_unavailable";
    interaction_budget_exhausted: "interaction_budget_exhausted";
    invalid_structure: "invalid_structure";
    network_failure: "network_failure";
    policy_refusal: "policy_refusal";
    render_failure: "render_failure";
    timeout: "timeout";
}>;
export declare const agentReadinessMethodResidueClassSchema: z.ZodEnum<{
    conflicting_observations: "conflicting_observations";
    insufficient_determination_basis: "insufficient_determination_basis";
    manual_review_required: "manual_review_required";
    scope_mismatch: "scope_mismatch";
    unresolved_signal: "unresolved_signal";
    unsupported_interaction: "unsupported_interaction";
}>;
export declare const agentReadinessAssessmentMethodPackCoreSchema: z.ZodObject<{
    method_contract: z.ZodLiteral<"sourcey.agent-readiness-method/v1alpha1">;
    name: z.ZodString;
    version: z.ZodString;
    capabilities: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
        }>;
        signal_code: z.ZodString;
        values: z.ZodArray<z.ZodEnum<{
            no: "no";
            not_applicable: "not_applicable";
            partial: "partial";
            yes: "yes";
        }>>;
        determination_bases: z.ZodArray<z.ZodEnum<{
            bounded_absence: "bounded_absence";
            certification_receipt: "certification_receipt";
            direct_observation: "direct_observation";
            explicit_first_party_declaration: "explicit_first_party_declaration";
            service_exchange: "service_exchange";
            standard_requirement: "standard_requirement";
        }>>;
    }, z.core.$strict>>;
    surface_support: z.ZodObject<{
        node_kinds: z.ZodArray<z.ZodEnum<{
            endpoint: "endpoint";
            interface: "interface";
            resource: "resource";
            surface_exclusion: "surface_exclusion";
        }>>;
        resource_roles: z.ZodArray<z.ZodEnum<{
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
        endpoint_roles: z.ZodArray<z.ZodEnum<{
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
        interface_modalities: z.ZodArray<z.ZodEnum<{
            agent_service: "agent_service";
            command_line: "command_line";
            network_api: "network_api";
            software_library: "software_library";
            tool_server: "tool_server";
            web_application: "web_application";
        }>>;
        interface_functions: z.ZodArray<z.ZodEnum<{
            authentication: "authentication";
            commerce: "commerce";
            events: "events";
            recovery: "recovery";
            service_operation: "service_operation";
        }>>;
    }, z.core.$strict>;
    capture: z.ZodObject<{
        rungs: z.ZodArray<z.ZodEnum<{
            archive: "archive";
            headless: "headless";
            http: "http";
            manual: "manual";
        }>>;
        redirects: z.ZodEnum<{
            "allowed-hosts": "allowed-hosts";
            reject: "reject";
            "same-origin": "same-origin";
        }>;
        require_https: z.ZodLiteral<true>;
        max_redirects: z.ZodNumber;
        timeout_ms: z.ZodNumber;
        max_bytes: z.ZodNumber;
        freshness_capability: z.ZodEnum<{
            current: "current";
            "history-only": "history-only";
        }>;
    }, z.core.$strict>;
    interaction: z.ZodObject<{
        mode: z.ZodLiteral<"non_mutating">;
        max_actions: z.ZodNumber;
        allowed_actions: z.ZodArray<z.ZodEnum<{
            expand_disclosure: "expand_disclosure";
            follow_link: "follow_link";
            navigate: "navigate";
            scroll: "scroll";
            select_non_submitting_control: "select_non_submitting_control";
            wait: "wait";
        }>>;
        forbidden_effects: z.ZodArray<z.ZodEnum<{
            accept_terms: "accept_terms";
            create_account: "create_account";
            create_key: "create_key";
            enter_credentials: "enter_credentials";
            enter_payment_details: "enter_payment_details";
            invoke_billable_service: "invoke_billable_service";
            provision: "provision";
            purchase: "purchase";
            send_verification_code: "send_verification_code";
            submit_application: "submit_application";
        }>>;
    }, z.core.$strict>;
    required_artifacts: z.ZodArray<z.ZodEnum<{
        capture_interaction_trace: "capture_interaction_trace";
        evidence_excerpt: "evidence_excerpt";
        interaction_trace: "interaction_trace";
        manual_review_note: "manual_review_note";
        screenshot: "screenshot";
        source_observation: "source_observation";
        standard_evidence_result: "standard_evidence_result";
    }>>;
    failure_classes: z.ZodArray<z.ZodEnum<{
        authentication_required: "authentication_required";
        capture_unavailable: "capture_unavailable";
        interaction_budget_exhausted: "interaction_budget_exhausted";
        invalid_structure: "invalid_structure";
        network_failure: "network_failure";
        policy_refusal: "policy_refusal";
        render_failure: "render_failure";
        timeout: "timeout";
    }>>;
    residue_classes: z.ZodArray<z.ZodEnum<{
        conflicting_observations: "conflicting_observations";
        insufficient_determination_basis: "insufficient_determination_basis";
        manual_review_required: "manual_review_required";
        scope_mismatch: "scope_mismatch";
        unresolved_signal: "unresolved_signal";
        unsupported_interaction: "unsupported_interaction";
    }>>;
    external_references: z.ZodArray<z.ZodObject<{
        namespace: z.ZodString;
        version: z.ZodString;
        requirement_id: z.ZodString;
        relation: z.ZodEnum<{
            "informational-reference": "informational-reference";
            tests: "tests";
        }>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessAssessmentMethodPackSchema: z.ZodObject<{
    method_contract: z.ZodLiteral<"sourcey.agent-readiness-method/v1alpha1">;
    name: z.ZodString;
    version: z.ZodString;
    capabilities: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            operate: "operate";
            pay: "pay";
            provision: "provision";
            sign_up: "sign_up";
        }>;
        signal_code: z.ZodString;
        values: z.ZodArray<z.ZodEnum<{
            no: "no";
            not_applicable: "not_applicable";
            partial: "partial";
            yes: "yes";
        }>>;
        determination_bases: z.ZodArray<z.ZodEnum<{
            bounded_absence: "bounded_absence";
            certification_receipt: "certification_receipt";
            direct_observation: "direct_observation";
            explicit_first_party_declaration: "explicit_first_party_declaration";
            service_exchange: "service_exchange";
            standard_requirement: "standard_requirement";
        }>>;
    }, z.core.$strict>>;
    surface_support: z.ZodObject<{
        node_kinds: z.ZodArray<z.ZodEnum<{
            endpoint: "endpoint";
            interface: "interface";
            resource: "resource";
            surface_exclusion: "surface_exclusion";
        }>>;
        resource_roles: z.ZodArray<z.ZodEnum<{
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
        endpoint_roles: z.ZodArray<z.ZodEnum<{
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
        interface_modalities: z.ZodArray<z.ZodEnum<{
            agent_service: "agent_service";
            command_line: "command_line";
            network_api: "network_api";
            software_library: "software_library";
            tool_server: "tool_server";
            web_application: "web_application";
        }>>;
        interface_functions: z.ZodArray<z.ZodEnum<{
            authentication: "authentication";
            commerce: "commerce";
            events: "events";
            recovery: "recovery";
            service_operation: "service_operation";
        }>>;
    }, z.core.$strict>;
    capture: z.ZodObject<{
        rungs: z.ZodArray<z.ZodEnum<{
            archive: "archive";
            headless: "headless";
            http: "http";
            manual: "manual";
        }>>;
        redirects: z.ZodEnum<{
            "allowed-hosts": "allowed-hosts";
            reject: "reject";
            "same-origin": "same-origin";
        }>;
        require_https: z.ZodLiteral<true>;
        max_redirects: z.ZodNumber;
        timeout_ms: z.ZodNumber;
        max_bytes: z.ZodNumber;
        freshness_capability: z.ZodEnum<{
            current: "current";
            "history-only": "history-only";
        }>;
    }, z.core.$strict>;
    interaction: z.ZodObject<{
        mode: z.ZodLiteral<"non_mutating">;
        max_actions: z.ZodNumber;
        allowed_actions: z.ZodArray<z.ZodEnum<{
            expand_disclosure: "expand_disclosure";
            follow_link: "follow_link";
            navigate: "navigate";
            scroll: "scroll";
            select_non_submitting_control: "select_non_submitting_control";
            wait: "wait";
        }>>;
        forbidden_effects: z.ZodArray<z.ZodEnum<{
            accept_terms: "accept_terms";
            create_account: "create_account";
            create_key: "create_key";
            enter_credentials: "enter_credentials";
            enter_payment_details: "enter_payment_details";
            invoke_billable_service: "invoke_billable_service";
            provision: "provision";
            purchase: "purchase";
            send_verification_code: "send_verification_code";
            submit_application: "submit_application";
        }>>;
    }, z.core.$strict>;
    required_artifacts: z.ZodArray<z.ZodEnum<{
        capture_interaction_trace: "capture_interaction_trace";
        evidence_excerpt: "evidence_excerpt";
        interaction_trace: "interaction_trace";
        manual_review_note: "manual_review_note";
        screenshot: "screenshot";
        source_observation: "source_observation";
        standard_evidence_result: "standard_evidence_result";
    }>>;
    failure_classes: z.ZodArray<z.ZodEnum<{
        authentication_required: "authentication_required";
        capture_unavailable: "capture_unavailable";
        interaction_budget_exhausted: "interaction_budget_exhausted";
        invalid_structure: "invalid_structure";
        network_failure: "network_failure";
        policy_refusal: "policy_refusal";
        render_failure: "render_failure";
        timeout: "timeout";
    }>>;
    residue_classes: z.ZodArray<z.ZodEnum<{
        conflicting_observations: "conflicting_observations";
        insufficient_determination_basis: "insufficient_determination_basis";
        manual_review_required: "manual_review_required";
        scope_mismatch: "scope_mismatch";
        unresolved_signal: "unresolved_signal";
        unsupported_interaction: "unsupported_interaction";
    }>>;
    external_references: z.ZodArray<z.ZodObject<{
        namespace: z.ZodString;
        version: z.ZodString;
        requirement_id: z.ZodString;
        relation: z.ZodEnum<{
            "informational-reference": "informational-reference";
            tests: "tests";
        }>;
    }, z.core.$strict>>;
    method_digest: z.ZodString;
}, z.core.$strict>;
export type AgentReadinessMethodCapability = z.infer<typeof agentReadinessMethodCapabilitySchema>;
type AgentReadinessStage = z.infer<typeof agentReadinessStageSchema>;
type AgentReadinessSignalValue = z.infer<typeof agentReadinessSignalValueSchema>;
/** The capability a method declares for one exact stage and signal, if any. */
export declare function methodCapabilityFor(method: {
    readonly capabilities: readonly AgentReadinessMethodCapability[];
}, stage: AgentReadinessStage, signalCode: z.infer<typeof agentReadinessSignalCodeSchema>): AgentReadinessMethodCapability | undefined;
/** Rule-assessable values (pass, constrained, fail) no listed capability can establish. */
export declare function missingAssessableValues(capabilities: readonly AgentReadinessMethodCapability[], rule: {
    readonly pass_values: readonly AgentReadinessSignalValue[];
    readonly constrained_values: readonly AgentReadinessSignalValue[];
    readonly fail_values: readonly AgentReadinessSignalValue[];
}): AgentReadinessSignalValue[];
export type AgentReadinessAssessmentMethodPackCore = z.infer<typeof agentReadinessAssessmentMethodPackCoreSchema>;
export type AgentReadinessAssessmentMethodPack = z.infer<typeof agentReadinessAssessmentMethodPackSchema>;
export {};
//# sourceMappingURL=method-pack.d.ts.map