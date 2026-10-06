import { z } from "zod";
export declare const agentReadinessRetainedArtifactSchema: z.ZodEnum<{
    capture_interaction_trace: "capture_interaction_trace";
    evidence_excerpt: "evidence_excerpt";
    interaction_trace: "interaction_trace";
    manual_review_note: "manual_review_note";
    screenshot: "screenshot";
    source_observation: "source_observation";
    standard_evidence_result: "standard_evidence_result";
}>;
export declare const agentReadinessManualCaptureAttestationSchema: z.ZodObject<{
    attestation_contract: z.ZodLiteral<"sourcey.manual-capture-attestation/v1alpha1">;
    operator_id: z.ZodString;
    attested_at: z.ZodISODateTime;
    observation_mode: z.ZodLiteral<"operator_visible_browser">;
    artifact_scope: z.ZodEnum<{
        complete_document: "complete_document";
        document_excerpt: "document_excerpt";
    }>;
    rationale: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessSourceObservationSchema: z.ZodObject<{
    observation_contract: z.ZodLiteral<"sourcey.agent-readiness-source-observation/v1alpha1">;
    source_url: z.ZodURL;
    requested_url: z.ZodURL;
    final_url: z.ZodURL;
    redirect_chain: z.ZodArray<z.ZodObject<{
        status: z.ZodUnion<readonly [z.ZodLiteral<301>, z.ZodLiteral<302>, z.ZodLiteral<303>, z.ZodLiteral<307>, z.ZodLiteral<308>]>;
        from: z.ZodURL;
        to: z.ZodURL;
    }, z.core.$strict>>;
    response_status_code: z.ZodNumber;
    request: z.ZodOptional<z.ZodUnion<readonly [z.ZodObject<{
        method: z.ZodLiteral<"GET">;
        target_url: z.ZodOptional<z.ZodURL>;
        headers: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            value: z.ZodString;
        }, z.core.$strict>>;
        success_assertions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            pointer: z.ZodString;
            equals: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
        }, z.core.$strict>>>;
    }, z.core.$strict>, z.ZodObject<{
        method: z.ZodLiteral<"STANDARD_OBSERVATION">;
        observations: z.ZodArray<z.ZodObject<{
            standard: z.ZodObject<{
                namespace: z.ZodString;
                version: z.ZodString;
            }, z.core.$strict>;
            probe_digest: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>]>>;
    capture_method: z.ZodEnum<{
        archive: "archive";
        headless: "headless";
        http: "http";
        manual: "manual";
    }>;
    captured_at: z.ZodISODateTime;
    capture_policy_digest: z.ZodString;
    normalizer_toolchain_digest: z.ZodString;
    source_content: z.ZodObject<{
        digest: z.ZodString;
        bytes: z.ZodNumber;
        media_type: z.ZodString;
        normalized_digest: z.ZodString;
        normalized_bytes: z.ZodNumber;
    }, z.core.$strict>;
    manual_capture_attestation: z.ZodNullable<z.ZodObject<{
        attestation_contract: z.ZodLiteral<"sourcey.manual-capture-attestation/v1alpha1">;
        operator_id: z.ZodString;
        attested_at: z.ZodISODateTime;
        observation_mode: z.ZodLiteral<"operator_visible_browser">;
        artifact_scope: z.ZodEnum<{
            complete_document: "complete_document";
            document_excerpt: "document_excerpt";
        }>;
        rationale: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessDeterminationBasisKindSchema: z.ZodEnum<{
    bounded_absence: "bounded_absence";
    certification_receipt: "certification_receipt";
    direct_observation: "direct_observation";
    explicit_first_party_declaration: "explicit_first_party_declaration";
    service_exchange: "service_exchange";
    standard_requirement: "standard_requirement";
}>;
export declare const agentReadinessEvidenceLocatorSchema: z.ZodObject<{
    artifact_digest: z.ZodString;
    start_byte: z.ZodNumber;
    end_byte: z.ZodNumber;
    value_digest: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessDeterminationBasisSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    captures: z.ZodArray<z.ZodObject<{
        retained_capture_digest: z.ZodString;
        capture_rung: z.ZodEnum<{
            archive: "archive";
            headless: "headless";
            http: "http";
            manual: "manual";
        }>;
    }, z.core.$strict>>;
    artifact_digests: z.ZodArray<z.ZodString>;
    kind: z.ZodLiteral<"direct_observation">;
    locators: z.ZodArray<z.ZodObject<{
        artifact_digest: z.ZodString;
        start_byte: z.ZodNumber;
        end_byte: z.ZodNumber;
        value_digest: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>, z.ZodObject<{
    captures: z.ZodArray<z.ZodObject<{
        retained_capture_digest: z.ZodString;
        capture_rung: z.ZodEnum<{
            archive: "archive";
            headless: "headless";
            http: "http";
            manual: "manual";
        }>;
    }, z.core.$strict>>;
    artifact_digests: z.ZodArray<z.ZodString>;
    kind: z.ZodLiteral<"service_exchange">;
    endpoint_id: z.ZodString;
    assessment_target_id: z.ZodString;
    source_observation_digest: z.ZodString;
    approved_request: z.ZodObject<{
        source_url: z.ZodURL;
        request: z.ZodObject<{
            method: z.ZodLiteral<"GET">;
            target_url: z.ZodOptional<z.ZodURL>;
            headers: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                value: z.ZodString;
            }, z.core.$strict>>;
            success_assertions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                pointer: z.ZodString;
                equals: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
            }, z.core.$strict>>>;
        }, z.core.$strict>;
    }, z.core.$strict>;
    response_status_code: z.ZodNumber;
    response_content_digest: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    captures: z.ZodArray<z.ZodObject<{
        retained_capture_digest: z.ZodString;
        capture_rung: z.ZodEnum<{
            archive: "archive";
            headless: "headless";
            http: "http";
            manual: "manual";
        }>;
    }, z.core.$strict>>;
    artifact_digests: z.ZodArray<z.ZodString>;
    kind: z.ZodLiteral<"bounded_absence">;
    coverage_scope: z.ZodEnum<{
        exact_funnel: "exact_funnel";
        exact_resource: "exact_resource";
        tested_surfaces: "tested_surfaces";
    }>;
    covered_surfaces: z.ZodArray<z.ZodObject<{
        node_kind: z.ZodEnum<{
            endpoint: "endpoint";
            interface: "interface";
            resource: "resource";
            surface_exclusion: "surface_exclusion";
        }>;
        node_id: z.ZodString;
    }, z.core.$strict>>;
    covered_branches: z.ZodNumber;
}, z.core.$strict>, z.ZodObject<{
    captures: z.ZodArray<z.ZodObject<{
        retained_capture_digest: z.ZodString;
        capture_rung: z.ZodEnum<{
            archive: "archive";
            headless: "headless";
            http: "http";
            manual: "manual";
        }>;
    }, z.core.$strict>>;
    artifact_digests: z.ZodArray<z.ZodString>;
    kind: z.ZodLiteral<"explicit_first_party_declaration">;
    source_surface: z.ZodObject<{
        node_kind: z.ZodEnum<{
            endpoint: "endpoint";
            interface: "interface";
            resource: "resource";
            surface_exclusion: "surface_exclusion";
        }>;
        node_id: z.ZodString;
    }, z.core.$strict>;
    locators: z.ZodArray<z.ZodObject<{
        artifact_digest: z.ZodString;
        start_byte: z.ZodNumber;
        end_byte: z.ZodNumber;
        value_digest: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"standard_requirement">;
    adapter_digest: z.ZodString;
    evidence_record_digest: z.ZodString;
    requirement: z.ZodObject<{
        namespace: z.ZodString;
        version: z.ZodString;
        requirement_id: z.ZodString;
        relation: z.ZodEnum<{
            "informational-reference": "informational-reference";
            tests: "tests";
        }>;
    }, z.core.$strict>;
    artifact_digests: z.ZodArray<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"certification_receipt">;
    certification_receipt_digest: z.ZodString;
}, z.core.$strict>], "kind">;
export declare const agentReadinessCorroborationAlternativeSchema: z.ZodObject<{
    alternative_id: z.ZodString;
    required_basis_kinds: z.ZodArray<z.ZodEnum<{
        bounded_absence: "bounded_absence";
        certification_receipt: "certification_receipt";
        direct_observation: "direct_observation";
        explicit_first_party_declaration: "explicit_first_party_declaration";
        service_exchange: "service_exchange";
        standard_requirement: "standard_requirement";
    }>>;
    minimum_distinct_captures: z.ZodNumber;
    require_independent_capture_rungs: z.ZodBoolean;
    required_artifacts: z.ZodArray<z.ZodEnum<{
        capture_interaction_trace: "capture_interaction_trace";
        evidence_excerpt: "evidence_excerpt";
        interaction_trace: "interaction_trace";
        manual_review_note: "manual_review_note";
        screenshot: "screenshot";
        source_observation: "source_observation";
        standard_evidence_result: "standard_evidence_result";
    }>>;
    minimum_surfaces: z.ZodNumber;
    minimum_branches: z.ZodNumber;
}, z.core.$strict>;
export type AgentReadinessDeterminationBasis = z.infer<typeof agentReadinessDeterminationBasisSchema>;
export type AgentReadinessDeterminationBasisKind = z.infer<typeof agentReadinessDeterminationBasisKindSchema>;
export type AgentReadinessRetainedArtifact = z.infer<typeof agentReadinessRetainedArtifactSchema>;
//# sourceMappingURL=evidence.d.ts.map