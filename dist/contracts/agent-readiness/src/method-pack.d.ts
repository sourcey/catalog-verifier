import { z } from "zod";
import { agentReadinessSignalCodeSchema, agentReadinessSignalValueSchema, agentReadinessStageSchema } from "./shared.js";
export declare const agentReadinessCaptureRungSchema: z.ZodEnum<{
    http: "http";
    headless: "headless";
    archive: "archive";
    manual: "manual";
}>;
export declare const agentReadinessMethodCapabilitySchema: z.ZodObject<{
    stage: z.ZodEnum<{
        evaluate: "evaluate";
        sign_up: "sign_up";
        pay: "pay";
        provision: "provision";
        operate: "operate";
    }>;
    signal_code: z.ZodString;
    values: z.ZodArray<z.ZodEnum<{
        yes: "yes";
        no: "no";
        partial: "partial";
        not_applicable: "not_applicable";
    }>>;
    determination_bases: z.ZodArray<z.ZodEnum<{
        direct_observation: "direct_observation";
        bounded_absence: "bounded_absence";
        explicit_first_party_declaration: "explicit_first_party_declaration";
        standard_requirement: "standard_requirement";
        certification_receipt: "certification_receipt";
    }>>;
}, z.core.$strict>;
export declare const agentReadinessMethodFailureClassSchema: z.ZodEnum<{
    network_failure: "network_failure";
    policy_refusal: "policy_refusal";
    authentication_required: "authentication_required";
    timeout: "timeout";
    render_failure: "render_failure";
    invalid_structure: "invalid_structure";
    interaction_budget_exhausted: "interaction_budget_exhausted";
    capture_unavailable: "capture_unavailable";
}>;
export declare const agentReadinessMethodResidueClassSchema: z.ZodEnum<{
    unresolved_signal: "unresolved_signal";
    insufficient_determination_basis: "insufficient_determination_basis";
    conflicting_observations: "conflicting_observations";
    scope_mismatch: "scope_mismatch";
    manual_review_required: "manual_review_required";
    unsupported_interaction: "unsupported_interaction";
}>;
export declare const agentReadinessAssessmentMethodPackCoreSchema: z.ZodObject<{
    method_contract: z.ZodLiteral<"sourcey.agent-readiness-method/v1alpha1">;
    name: z.ZodString;
    version: z.ZodString;
    capabilities: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        signal_code: z.ZodString;
        values: z.ZodArray<z.ZodEnum<{
            yes: "yes";
            no: "no";
            partial: "partial";
            not_applicable: "not_applicable";
        }>>;
        determination_bases: z.ZodArray<z.ZodEnum<{
            direct_observation: "direct_observation";
            bounded_absence: "bounded_absence";
            explicit_first_party_declaration: "explicit_first_party_declaration";
            standard_requirement: "standard_requirement";
            certification_receipt: "certification_receipt";
        }>>;
    }, z.core.$strict>>;
    surface_support: z.ZodObject<{
        node_kinds: z.ZodArray<z.ZodEnum<{
            resource: "resource";
            endpoint: "endpoint";
            interface: "interface";
            surface_exclusion: "surface_exclusion";
        }>>;
        resource_roles: z.ZodArray<z.ZodEnum<{
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
        endpoint_roles: z.ZodArray<z.ZodEnum<{
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
        interface_modalities: z.ZodArray<z.ZodEnum<{
            web_application: "web_application";
            network_api: "network_api";
            command_line: "command_line";
            software_library: "software_library";
            tool_server: "tool_server";
            agent_service: "agent_service";
        }>>;
        interface_functions: z.ZodArray<z.ZodEnum<{
            events: "events";
            recovery: "recovery";
            authentication: "authentication";
            service_operation: "service_operation";
            commerce: "commerce";
        }>>;
    }, z.core.$strict>;
    capture: z.ZodObject<{
        rungs: z.ZodArray<z.ZodEnum<{
            http: "http";
            headless: "headless";
            archive: "archive";
            manual: "manual";
        }>>;
        redirects: z.ZodEnum<{
            reject: "reject";
            "same-origin": "same-origin";
            "allowed-hosts": "allowed-hosts";
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
            navigate: "navigate";
            follow_link: "follow_link";
            expand_disclosure: "expand_disclosure";
            select_non_submitting_control: "select_non_submitting_control";
            scroll: "scroll";
            wait: "wait";
        }>>;
        forbidden_effects: z.ZodArray<z.ZodEnum<{
            provision: "provision";
            submit_application: "submit_application";
            create_account: "create_account";
            send_verification_code: "send_verification_code";
            accept_terms: "accept_terms";
            enter_credentials: "enter_credentials";
            enter_payment_details: "enter_payment_details";
            purchase: "purchase";
            create_key: "create_key";
            invoke_billable_service: "invoke_billable_service";
        }>>;
    }, z.core.$strict>;
    required_artifacts: z.ZodArray<z.ZodEnum<{
        redirect_chain: "redirect_chain";
        interaction_trace: "interaction_trace";
        raw_bytes: "raw_bytes";
        normalized_text: "normalized_text";
        structured_validation: "structured_validation";
        standard_evidence_result: "standard_evidence_result";
        utf8_locators: "utf8_locators";
        screenshot: "screenshot";
        capture_interaction_trace: "capture_interaction_trace";
        manual_review_note: "manual_review_note";
    }>>;
    failure_classes: z.ZodArray<z.ZodEnum<{
        network_failure: "network_failure";
        policy_refusal: "policy_refusal";
        authentication_required: "authentication_required";
        timeout: "timeout";
        render_failure: "render_failure";
        invalid_structure: "invalid_structure";
        interaction_budget_exhausted: "interaction_budget_exhausted";
        capture_unavailable: "capture_unavailable";
    }>>;
    residue_classes: z.ZodArray<z.ZodEnum<{
        unresolved_signal: "unresolved_signal";
        insufficient_determination_basis: "insufficient_determination_basis";
        conflicting_observations: "conflicting_observations";
        scope_mismatch: "scope_mismatch";
        manual_review_required: "manual_review_required";
        unsupported_interaction: "unsupported_interaction";
    }>>;
    external_references: z.ZodArray<z.ZodObject<{
        namespace: z.ZodString;
        version: z.ZodString;
        requirement_id: z.ZodString;
        relation: z.ZodEnum<{
            tests: "tests";
            "informational-reference": "informational-reference";
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
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>;
        signal_code: z.ZodString;
        values: z.ZodArray<z.ZodEnum<{
            yes: "yes";
            no: "no";
            partial: "partial";
            not_applicable: "not_applicable";
        }>>;
        determination_bases: z.ZodArray<z.ZodEnum<{
            direct_observation: "direct_observation";
            bounded_absence: "bounded_absence";
            explicit_first_party_declaration: "explicit_first_party_declaration";
            standard_requirement: "standard_requirement";
            certification_receipt: "certification_receipt";
        }>>;
    }, z.core.$strict>>;
    surface_support: z.ZodObject<{
        node_kinds: z.ZodArray<z.ZodEnum<{
            resource: "resource";
            endpoint: "endpoint";
            interface: "interface";
            surface_exclusion: "surface_exclusion";
        }>>;
        resource_roles: z.ZodArray<z.ZodEnum<{
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
        endpoint_roles: z.ZodArray<z.ZodEnum<{
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
        interface_modalities: z.ZodArray<z.ZodEnum<{
            web_application: "web_application";
            network_api: "network_api";
            command_line: "command_line";
            software_library: "software_library";
            tool_server: "tool_server";
            agent_service: "agent_service";
        }>>;
        interface_functions: z.ZodArray<z.ZodEnum<{
            events: "events";
            recovery: "recovery";
            authentication: "authentication";
            service_operation: "service_operation";
            commerce: "commerce";
        }>>;
    }, z.core.$strict>;
    capture: z.ZodObject<{
        rungs: z.ZodArray<z.ZodEnum<{
            http: "http";
            headless: "headless";
            archive: "archive";
            manual: "manual";
        }>>;
        redirects: z.ZodEnum<{
            reject: "reject";
            "same-origin": "same-origin";
            "allowed-hosts": "allowed-hosts";
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
            navigate: "navigate";
            follow_link: "follow_link";
            expand_disclosure: "expand_disclosure";
            select_non_submitting_control: "select_non_submitting_control";
            scroll: "scroll";
            wait: "wait";
        }>>;
        forbidden_effects: z.ZodArray<z.ZodEnum<{
            provision: "provision";
            submit_application: "submit_application";
            create_account: "create_account";
            send_verification_code: "send_verification_code";
            accept_terms: "accept_terms";
            enter_credentials: "enter_credentials";
            enter_payment_details: "enter_payment_details";
            purchase: "purchase";
            create_key: "create_key";
            invoke_billable_service: "invoke_billable_service";
        }>>;
    }, z.core.$strict>;
    required_artifacts: z.ZodArray<z.ZodEnum<{
        redirect_chain: "redirect_chain";
        interaction_trace: "interaction_trace";
        raw_bytes: "raw_bytes";
        normalized_text: "normalized_text";
        structured_validation: "structured_validation";
        standard_evidence_result: "standard_evidence_result";
        utf8_locators: "utf8_locators";
        screenshot: "screenshot";
        capture_interaction_trace: "capture_interaction_trace";
        manual_review_note: "manual_review_note";
    }>>;
    failure_classes: z.ZodArray<z.ZodEnum<{
        network_failure: "network_failure";
        policy_refusal: "policy_refusal";
        authentication_required: "authentication_required";
        timeout: "timeout";
        render_failure: "render_failure";
        invalid_structure: "invalid_structure";
        interaction_budget_exhausted: "interaction_budget_exhausted";
        capture_unavailable: "capture_unavailable";
    }>>;
    residue_classes: z.ZodArray<z.ZodEnum<{
        unresolved_signal: "unresolved_signal";
        insufficient_determination_basis: "insufficient_determination_basis";
        conflicting_observations: "conflicting_observations";
        scope_mismatch: "scope_mismatch";
        manual_review_required: "manual_review_required";
        unsupported_interaction: "unsupported_interaction";
    }>>;
    external_references: z.ZodArray<z.ZodObject<{
        namespace: z.ZodString;
        version: z.ZodString;
        requirement_id: z.ZodString;
        relation: z.ZodEnum<{
            tests: "tests";
            "informational-reference": "informational-reference";
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