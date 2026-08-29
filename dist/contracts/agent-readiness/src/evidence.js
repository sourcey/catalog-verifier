import { z } from "zod";
import { evidenceCaptureMethodSchema } from "../../evidence/src/index.js";
import { standardRequirementReferenceSchema } from "../../standards/src/index.js";
import { agentReadinessDigestSchema, agentReadinessScopeKeySchema, agentReadinessSurfaceReferenceSchema, } from "./shared.js";
export const agentReadinessRetainedArtifactSchema = z.enum([
    "raw_bytes",
    "normalized_text",
    "structured_validation",
    "standard_evidence_result",
    "utf8_locators",
    "redirect_chain",
    "screenshot",
    "capture_interaction_trace",
    "interaction_trace",
    "manual_review_note",
]);
export const agentReadinessDeterminationBasisKindSchema = z.enum([
    "direct_observation",
    "bounded_absence",
    "explicit_first_party_declaration",
    "standard_requirement",
    "certification_receipt",
]);
export const agentReadinessEvidenceLocatorSchema = z
    .object({
    artifact_digest: agentReadinessDigestSchema,
    start_byte: z.number().int().nonnegative(),
    end_byte: z.number().int().positive(),
    value_digest: agentReadinessDigestSchema,
})
    .strict()
    .superRefine((value, context) => {
    if (value.end_byte <= value.start_byte) {
        context.addIssue({
            code: "custom",
            path: ["end_byte"],
            message: "An evidence locator must span at least one byte.",
        });
    }
});
const captureBoundEvidenceFields = {
    captures: z
        .array(z
        .object({
        retained_capture_digest: agentReadinessDigestSchema,
        capture_rung: evidenceCaptureMethodSchema,
    })
        .strict())
        .min(1),
    artifact_digests: z.array(agentReadinessDigestSchema).min(1),
};
const directObservationBasisSchema = z
    .object({
    kind: z.literal("direct_observation"),
    ...captureBoundEvidenceFields,
    locators: z.array(agentReadinessEvidenceLocatorSchema).min(1),
})
    .strict();
const boundedAbsenceBasisSchema = z
    .object({
    kind: z.literal("bounded_absence"),
    ...captureBoundEvidenceFields,
    coverage_scope: z.enum(["exact_resource", "tested_surfaces", "exact_funnel"]),
    covered_surfaces: z.array(agentReadinessSurfaceReferenceSchema).min(1),
    covered_branches: z.number().int().positive(),
})
    .strict();
const explicitFirstPartyDeclarationBasisSchema = z
    .object({
    kind: z.literal("explicit_first_party_declaration"),
    ...captureBoundEvidenceFields,
    source_surface: agentReadinessSurfaceReferenceSchema,
    locators: z.array(agentReadinessEvidenceLocatorSchema).min(1),
})
    .strict();
const standardRequirementBasisSchema = z
    .object({
    kind: z.literal("standard_requirement"),
    adapter_digest: agentReadinessDigestSchema,
    evidence_record_digest: agentReadinessDigestSchema,
    requirement: standardRequirementReferenceSchema,
    artifact_digests: z.array(agentReadinessDigestSchema).min(1),
})
    .strict();
const certificationReceiptBasisSchema = z
    .object({
    kind: z.literal("certification_receipt"),
    certification_receipt_digest: agentReadinessDigestSchema,
})
    .strict();
export const agentReadinessDeterminationBasisSchema = z
    .discriminatedUnion("kind", [
    directObservationBasisSchema,
    boundedAbsenceBasisSchema,
    explicitFirstPartyDeclarationBasisSchema,
    standardRequirementBasisSchema,
    certificationReceiptBasisSchema,
])
    .superRefine((value, context) => {
    if ("captures" in value) {
        assertUnique(value.captures.map((capture) => capture.retained_capture_digest), context, ["captures"]);
    }
    if ("artifact_digests" in value) {
        assertUnique(value.artifact_digests, context, ["artifact_digests"]);
    }
    if ("locators" in value) {
        assertUnique(value.locators.map((locator) => `${locator.artifact_digest}:${locator.start_byte}:${locator.end_byte}`), context, ["locators"]);
        if (value.locators.some((locator) => !value.artifact_digests.includes(locator.artifact_digest))) {
            context.addIssue({
                code: "custom",
                path: ["locators"],
                message: "Every determination locator must bind one of its retained artifacts.",
            });
        }
    }
    if (value.kind === "bounded_absence") {
        assertUnique(value.covered_surfaces.map((surface) => `${surface.node_kind}:${surface.node_id}`), context, ["covered_surfaces"]);
    }
    if (value.kind === "standard_requirement" && value.requirement.relation !== "tests") {
        context.addIssue({
            code: "custom",
            path: ["requirement", "relation"],
            message: "A standard determination basis must test an exact requirement.",
        });
    }
});
export const agentReadinessCorroborationAlternativeSchema = z
    .object({
    alternative_id: agentReadinessScopeKeySchema,
    required_basis_kinds: z.array(agentReadinessDeterminationBasisKindSchema).min(1),
    minimum_distinct_captures: z.number().int().nonnegative(),
    require_independent_capture_rungs: z.boolean(),
    required_artifacts: z.array(agentReadinessRetainedArtifactSchema),
    minimum_surfaces: z.number().int().nonnegative(),
    minimum_branches: z.number().int().nonnegative(),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.required_basis_kinds, context, ["required_basis_kinds"]);
    assertUnique(value.required_artifacts, context, ["required_artifacts"]);
    if (value.require_independent_capture_rungs && value.minimum_distinct_captures < 2) {
        context.addIssue({
            code: "custom",
            path: ["minimum_distinct_captures"],
            message: "Independent capture rungs require at least two distinct capture receipts.",
        });
    }
});
function assertUnique(values, context, path) {
    if (new Set(values).size !== values.length) {
        context.addIssue({ code: "custom", path, message: "Values must be unique." });
    }
}
//# sourceMappingURL=evidence.js.map