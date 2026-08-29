import { z } from "zod";
export declare const agentReadinessRetainedArtifactSchema: z.ZodEnum<{
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
}>;
export declare const agentReadinessDeterminationBasisKindSchema: z.ZodEnum<{
    direct_observation: "direct_observation";
    bounded_absence: "bounded_absence";
    explicit_first_party_declaration: "explicit_first_party_declaration";
    standard_requirement: "standard_requirement";
    certification_receipt: "certification_receipt";
}>;
export declare const agentReadinessEvidenceLocatorSchema: z.ZodObject<{
    artifact_digest: z.ZodString;
    start_byte: z.ZodNumber;
    end_byte: z.ZodNumber;
    value_digest: z.ZodString;
}, z.core.$strict>;
export declare const agentReadinessDeterminationBasisSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    locators: z.ZodArray<z.ZodObject<{
        artifact_digest: z.ZodString;
        start_byte: z.ZodNumber;
        end_byte: z.ZodNumber;
        value_digest: z.ZodString;
    }, z.core.$strict>>;
    captures: z.ZodArray<z.ZodObject<{
        retained_capture_digest: z.ZodString;
        capture_rung: z.ZodEnum<{
            http: "http";
            headless: "headless";
            archive: "archive";
            manual: "manual";
        }>;
    }, z.core.$strict>>;
    artifact_digests: z.ZodArray<z.ZodString>;
    kind: z.ZodLiteral<"direct_observation">;
}, z.core.$strict>, z.ZodObject<{
    coverage_scope: z.ZodEnum<{
        exact_resource: "exact_resource";
        tested_surfaces: "tested_surfaces";
        exact_funnel: "exact_funnel";
    }>;
    covered_surfaces: z.ZodArray<z.ZodObject<{
        node_kind: z.ZodEnum<{
            resource: "resource";
            endpoint: "endpoint";
            interface: "interface";
            surface_exclusion: "surface_exclusion";
        }>;
        node_id: z.ZodString;
    }, z.core.$strict>>;
    covered_branches: z.ZodNumber;
    captures: z.ZodArray<z.ZodObject<{
        retained_capture_digest: z.ZodString;
        capture_rung: z.ZodEnum<{
            http: "http";
            headless: "headless";
            archive: "archive";
            manual: "manual";
        }>;
    }, z.core.$strict>>;
    artifact_digests: z.ZodArray<z.ZodString>;
    kind: z.ZodLiteral<"bounded_absence">;
}, z.core.$strict>, z.ZodObject<{
    source_surface: z.ZodObject<{
        node_kind: z.ZodEnum<{
            resource: "resource";
            endpoint: "endpoint";
            interface: "interface";
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
    captures: z.ZodArray<z.ZodObject<{
        retained_capture_digest: z.ZodString;
        capture_rung: z.ZodEnum<{
            http: "http";
            headless: "headless";
            archive: "archive";
            manual: "manual";
        }>;
    }, z.core.$strict>>;
    artifact_digests: z.ZodArray<z.ZodString>;
    kind: z.ZodLiteral<"explicit_first_party_declaration">;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"standard_requirement">;
    adapter_digest: z.ZodString;
    evidence_record_digest: z.ZodString;
    requirement: z.ZodObject<{
        namespace: z.ZodString;
        version: z.ZodString;
        requirement_id: z.ZodString;
        relation: z.ZodEnum<{
            tests: "tests";
            "informational-reference": "informational-reference";
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
        direct_observation: "direct_observation";
        bounded_absence: "bounded_absence";
        explicit_first_party_declaration: "explicit_first_party_declaration";
        standard_requirement: "standard_requirement";
        certification_receipt: "certification_receipt";
    }>>;
    minimum_distinct_captures: z.ZodNumber;
    require_independent_capture_rungs: z.ZodBoolean;
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
    minimum_surfaces: z.ZodNumber;
    minimum_branches: z.ZodNumber;
}, z.core.$strict>;
export type AgentReadinessDeterminationBasis = z.infer<typeof agentReadinessDeterminationBasisSchema>;
export type AgentReadinessDeterminationBasisKind = z.infer<typeof agentReadinessDeterminationBasisKindSchema>;
export type AgentReadinessRetainedArtifact = z.infer<typeof agentReadinessRetainedArtifactSchema>;
//# sourceMappingURL=evidence.d.ts.map