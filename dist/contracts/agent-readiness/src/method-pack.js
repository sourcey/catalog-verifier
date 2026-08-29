import { z } from "zod";
import { evidenceCaptureMethodSchema } from "../../evidence/src/index.js";
import { standardRequirementReferenceSchema } from "../../standards/src/index.js";
import { agentReadinessEndpointRoleSchema, agentReadinessInterfaceFunctionSchema, agentReadinessInterfaceModalitySchema, } from "./declaration.js";
import { agentReadinessDeterminationBasisKindSchema, agentReadinessRetainedArtifactSchema, } from "./evidence.js";
import { agentReadinessAllowedActionSchema, agentReadinessForbiddenEffectSchema, } from "./interaction.js";
import { agentReadinessDigestSchema, agentReadinessMethodNameSchema, agentReadinessResourceRoleSchema, agentReadinessSignalCodeSchema, agentReadinessSignalValueSchema, agentReadinessStageSchema, agentReadinessSurfaceNodeKindSchema, } from "./shared.js";
export const agentReadinessCaptureRungSchema = evidenceCaptureMethodSchema;
export const agentReadinessMethodCapabilitySchema = z
    .object({
    stage: agentReadinessStageSchema,
    signal_code: agentReadinessSignalCodeSchema,
    values: z.array(agentReadinessSignalValueSchema.exclude(["unknown"])).min(1),
    determination_bases: z.array(agentReadinessDeterminationBasisKindSchema).min(1),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.values, context, ["values"]);
    assertUnique(value.determination_bases, context, ["determination_bases"]);
    if (value.determination_bases.includes("certification_receipt")) {
        context.addIssue({
            code: "custom",
            path: ["determination_bases"],
            message: "Observed assessment methods cannot mint certification receipts.",
        });
    }
});
export const agentReadinessMethodFailureClassSchema = z.enum([
    "network_failure",
    "policy_refusal",
    "authentication_required",
    "timeout",
    "render_failure",
    "invalid_structure",
    "interaction_budget_exhausted",
    "capture_unavailable",
]);
export const agentReadinessMethodResidueClassSchema = z.enum([
    "unresolved_signal",
    "insufficient_determination_basis",
    "conflicting_observations",
    "scope_mismatch",
    "manual_review_required",
    "unsupported_interaction",
]);
export const agentReadinessAssessmentMethodPackCoreSchema = z
    .object({
    method_contract: z.literal("sourcey.agent-readiness-method/v1alpha1"),
    name: agentReadinessMethodNameSchema,
    version: z.string().min(1).max(160),
    capabilities: z.array(agentReadinessMethodCapabilitySchema).min(1),
    surface_support: z
        .object({
        node_kinds: z.array(agentReadinessSurfaceNodeKindSchema).min(1),
        resource_roles: z.array(agentReadinessResourceRoleSchema),
        endpoint_roles: z.array(agentReadinessEndpointRoleSchema),
        interface_modalities: z.array(agentReadinessInterfaceModalitySchema),
        interface_functions: z.array(agentReadinessInterfaceFunctionSchema),
    })
        .strict(),
    capture: z
        .object({
        rungs: z.array(agentReadinessCaptureRungSchema).min(1),
        redirects: z.enum(["reject", "same-origin", "allowed-hosts"]),
        require_https: z.literal(true),
        max_redirects: z.number().int().min(0).max(5),
        timeout_ms: z.number().int().positive().max(120_000),
        max_bytes: z.number().int().positive().max(20_000_000),
        freshness_capability: z.enum(["current", "history-only"]),
    })
        .strict(),
    interaction: z
        .object({
        mode: z.literal("non_mutating"),
        max_actions: z.number().int().nonnegative().max(50),
        allowed_actions: z.array(agentReadinessAllowedActionSchema),
        forbidden_effects: z
            .array(agentReadinessForbiddenEffectSchema)
            .length(agentReadinessForbiddenEffectSchema.options.length),
    })
        .strict(),
    required_artifacts: z.array(agentReadinessRetainedArtifactSchema).min(1),
    failure_classes: z.array(agentReadinessMethodFailureClassSchema).min(1),
    residue_classes: z.array(agentReadinessMethodResidueClassSchema).min(1),
    external_references: z.array(standardRequirementReferenceSchema),
})
    .strict()
    .superRefine((value, context) => {
    const capabilityKeys = value.capabilities.map((capability) => `${capability.stage}:${capability.signal_code}`);
    assertUnique(capabilityKeys, context, ["capabilities"]);
    assertUnique(value.surface_support.node_kinds, context, ["surface_support", "node_kinds"]);
    assertUnique(value.surface_support.resource_roles, context, [
        "surface_support",
        "resource_roles",
    ]);
    assertUnique(value.surface_support.endpoint_roles, context, [
        "surface_support",
        "endpoint_roles",
    ]);
    assertUnique(value.surface_support.interface_modalities, context, [
        "surface_support",
        "interface_modalities",
    ]);
    assertUnique(value.surface_support.interface_functions, context, [
        "surface_support",
        "interface_functions",
    ]);
    for (const [nodeKind, selectors] of [
        ["resource", value.surface_support.resource_roles],
        ["endpoint", value.surface_support.endpoint_roles],
    ]) {
        if (value.surface_support.node_kinds.includes(nodeKind) !== selectors.length > 0) {
            context.addIssue({
                code: "custom",
                path: ["surface_support"],
                message: `Method surface support must declare selectors exactly for ${nodeKind} support.`,
            });
        }
    }
    const supportsInterfaces = value.surface_support.node_kinds.includes("interface");
    if (supportsInterfaces !== value.surface_support.interface_modalities.length > 0 ||
        supportsInterfaces !== value.surface_support.interface_functions.length > 0) {
        context.addIssue({
            code: "custom",
            path: ["surface_support"],
            message: "Method interface support must declare both modality and function selectors exactly when interfaces are supported.",
        });
    }
    assertUnique(value.capture.rungs, context, ["capture", "rungs"]);
    assertUnique(value.interaction.allowed_actions, context, ["interaction", "allowed_actions"]);
    assertUnique(value.interaction.forbidden_effects, context, [
        "interaction",
        "forbidden_effects",
    ]);
    assertUnique(value.required_artifacts, context, ["required_artifacts"]);
    assertUnique(value.failure_classes, context, ["failure_classes"]);
    assertUnique(value.residue_classes, context, ["residue_classes"]);
    for (const effect of agentReadinessForbiddenEffectSchema.options) {
        if (!value.interaction.forbidden_effects.includes(effect)) {
            context.addIssue({
                code: "custom",
                path: ["interaction", "forbidden_effects"],
                message: `Observed readiness method packs must forbid ${effect}.`,
            });
        }
    }
    if (value.capture.freshness_capability === "history-only" &&
        !value.capture.rungs.includes("archive")) {
        context.addIssue({
            code: "custom",
            path: ["capture", "freshness_capability"],
            message: "Only a method with the archive capture rung may be history-only.",
        });
    }
    if (value.capture.freshness_capability === "current" &&
        value.capture.rungs.every((rung) => rung === "archive")) {
        context.addIssue({
            code: "custom",
            path: ["capture", "freshness_capability"],
            message: "An archive-only method cannot establish current freshness.",
        });
    }
});
export const agentReadinessAssessmentMethodPackSchema = agentReadinessAssessmentMethodPackCoreSchema
    .safeExtend({ method_digest: agentReadinessDigestSchema })
    .strict();
/** The capability a method declares for one exact stage and signal, if any. */
export function methodCapabilityFor(method, stage, signalCode) {
    return method.capabilities.find((capability) => capability.stage === stage && capability.signal_code === signalCode);
}
/** Rule-assessable values (pass, constrained, fail) no listed capability can establish. */
export function missingAssessableValues(capabilities, rule) {
    const establishable = new Set(capabilities.flatMap((capability) => capability.values));
    return [...rule.pass_values, ...rule.constrained_values, ...rule.fail_values].filter((value) => !establishable.has(value));
}
function assertUnique(values, context, path) {
    if (new Set(values).size !== values.length) {
        context.addIssue({ code: "custom", path, message: "Values must be unique." });
    }
}
//# sourceMappingURL=method-pack.js.map