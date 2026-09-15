import { z } from "zod";
import { SLUG_PATTERN } from "../../../modules/primitives/src/index.js";
import { provenanceSchema } from "../../artifact/src/index.js";
import { entityRevisionSchema, lifecycleStatusSchema, offerRevisionSchema, } from "../../revisions/src/index.js";
import { standardRequirementReferenceSchema } from "../../standards/src/index.js";
import { agentReadinessAssessmentTargetSchema, agentReadinessDeclarationRevisionSchema, agentReadinessDeclaredInterfaceSchema, agentReadinessEndpointRoleSchema, agentReadinessEndpointSchema, agentReadinessInterfaceFunctionSchema, agentReadinessInterfaceModalitySchema, agentReadinessOfferRelationPurposeSchema, agentReadinessParticipantSchema, agentReadinessResourceSchema, agentReadinessSurfaceExclusionSchema, agentReadinessSurfaceRelationKindSchema, agentReadinessSurfaceRelationSchema, } from "./declaration.js";
import { agentReadinessDeclarationStateSchema } from "./declaration-reference.js";
import { agentReadinessCorroborationAlternativeSchema, agentReadinessDeterminationBasisSchema, } from "./evidence.js";
import { agentReadinessAssessmentMethodPackSchema } from "./method-pack.js";
import { agentReadinessAssessmentMethodSchema, agentReadinessCatalogBindingSchema, agentReadinessDigestSchema, agentReadinessEntityIdSchema, agentReadinessEvaluationRoleSchema, agentReadinessFreshnessSchema, agentReadinessGradeSchema, agentReadinessIdentifierSchema, agentReadinessInstantSchema, agentReadinessOfferIdSchema, agentReadinessProfileIdSchema, agentReadinessPublicStateSchema, agentReadinessResourceRoleSchema, agentReadinessScopeSchema, agentReadinessSignalCodeSchema, agentReadinessSignalValueSchema, agentReadinessStageOutcomeSchema, agentReadinessStageSchema, agentReadinessSurfaceReferenceSchema, sameAgentReadinessScopeIdentity, } from "./shared.js";
export * from "./declaration.js";
export * from "./declaration-acquisition.js";
export * from "./declaration-reference.js";
export * from "./evidence.js";
export * from "./interaction.js";
export * from "./method-pack.js";
export * from "./shared.js";
/**
 * Runtime residue that proves a document failed to render: serialized
 * JavaScript values, replacement characters, and a sentence whose interpolated
 * value is missing. These disqualify a captured segment as evidence for a
 * known finding and can never appear in a public claim.
 */
const unresolvedRenderingPatterns = [
    /\bundefined\b/iu,
    /\[object Object\]/u,
    /\bNaN\b/u,
    /\uFFFD/u,
    /\b(?:amount|cost|currency|date|duration|fee|limit|number|percentage|period|price|quantity|rate|time|total|value)\s+(?:at|by|for|from|is|of|to|with)\s*[.,;:!?](?:\s|$)/iu,
];
/**
 * Template syntax that must not reach a public claim, but is ordinary literal
 * content in the documentation Sourcey assesses: vendors write
 * `PINECONE_API_KEY="{{YOUR_API_KEY}}"` and `${{ secrets.GITHUB_TOKEN }}` as
 * reader placeholders, and `${API_KEY}` is shell interpolation in every curl
 * sample. A quote may carry them; a note may not. GitHub Actions expressions
 * are excluded from the Mustache form because they are not template output.
 */
const unresolvedTemplatePatterns = [/(?<!\$)\{\{[^}]*\}\}/u, /<%[^%]*%>/u];
/** Rendering residue in a captured segment: the surface did not render. */
export function agentReadinessRenderingResidue(value) {
    const text = value.trim();
    return unresolvedRenderingPatterns.some((pattern) => pattern.test(text))
        ? "Captured evidence carries unresolved rendered content."
        : null;
}
/**
 * Finds deterministic evidence of unresolved runtime or interpolation residue
 * in text that would otherwise become a public factual claim.
 */
export function agentReadinessPublicClaimResidue(value) {
    const text = value.trim();
    return [...unresolvedRenderingPatterns, ...unresolvedTemplatePatterns].some((pattern) => pattern.test(text))
        ? "Public Agent Readiness claims cannot contain unresolved rendered content."
        : null;
}
/** The one bound on public claim text: observation notes, the fact response schema and its prompt share it. */
export const AGENT_READINESS_PUBLIC_CLAIM_TEXT_MAXIMUM_CHARACTERS = 500;
export const agentReadinessPublicClaimTextSchema = z
    .string()
    .trim()
    .min(1)
    .max(AGENT_READINESS_PUBLIC_CLAIM_TEXT_MAXIMUM_CHARACTERS)
    .superRefine((value, context) => {
    const issue = agentReadinessPublicClaimResidue(value);
    if (issue)
        context.addIssue({ code: "custom", message: issue });
});
export const agentReadinessSignalInputSchema = z
    .object({
    stage: agentReadinessStageSchema,
    signal_code: agentReadinessSignalCodeSchema,
    selector_group_id: agentReadinessIdentifierSchema,
    value: agentReadinessSignalValueSchema,
    observed_at: agentReadinessInstantSchema,
    tested_surfaces: z.array(agentReadinessSurfaceReferenceSchema).min(1),
    assessment_method: agentReadinessAssessmentMethodSchema,
    determination_bases: z.array(agentReadinessDeterminationBasisSchema),
    note: agentReadinessPublicClaimTextSchema.optional(),
})
    .strict()
    .superRefine((value, context) => {
    assertUniqueSurfaceReferences(value.tested_surfaces, context, ["tested_surfaces"]);
    if ((value.value === "unknown") !== (value.determination_bases.length === 0)) {
        context.addIssue({
            code: "custom",
            path: ["determination_bases"],
            message: "Every factual signal requires a determination basis; unknown signals cannot claim one.",
        });
    }
    if (new Set(value.determination_bases.map((basis) => JSON.stringify(basis))).size !==
        value.determination_bases.length) {
        context.addIssue({
            code: "custom",
            path: ["determination_bases"],
            message: "A signal cannot repeat a determination basis.",
        });
    }
    for (const [index, basis] of value.determination_bases.entries()) {
        if (basis.kind === "bounded_absence" &&
            basis.covered_surfaces.some((covered) => !value.tested_surfaces.some((tested) => sameSurface(covered, tested)))) {
            context.addIssue({
                code: "custom",
                path: ["determination_bases", index, "covered_surfaces"],
                message: "Bounded absence must cover tested surfaces from the same signal.",
            });
        }
    }
});
export const agentReadinessEvidenceBindingSchema = z
    .object({
    stage: agentReadinessStageSchema,
    signal_code: agentReadinessSignalCodeSchema,
    evidence_event_ids: z.array(agentReadinessDigestSchema).min(1),
    observation_ids: z.array(agentReadinessDigestSchema).min(1),
})
    .strict();
const agentReadinessRevisionFields = {
    agent_readiness_profile_id: agentReadinessProfileIdSchema,
    entity_id: agentReadinessEntityIdSchema,
    scope: agentReadinessScopeSchema,
    catalog_binding: agentReadinessCatalogBindingSchema,
    declaration_revision_digest: agentReadinessDigestSchema,
    declaration: agentReadinessDeclarationStateSchema,
    lifecycle: lifecycleStatusSchema,
    effective_from: agentReadinessInstantSchema,
    effective_until: agentReadinessInstantSchema.optional(),
    signals: z.array(agentReadinessSignalInputSchema).min(1),
};
function validateAgentReadinessProfile(value, context) {
    const keys = value.signals.map((signal) => `${signal.stage}:${signal.signal_code}`);
    if (new Set(keys).size !== keys.length) {
        context.addIssue({
            code: "custom",
            path: ["signals"],
            message: "An agent readiness profile cannot repeat a stage signal.",
        });
    }
    if (value.effective_until &&
        Date.parse(value.effective_until) <= Date.parse(value.effective_from)) {
        context.addIssue({
            code: "custom",
            path: ["effective_until"],
            message: "Agent readiness profile effective interval is empty.",
        });
    }
}
export const agentReadinessProfileInputSchema = z
    .object({
    input_contract: z.literal("sourcey.agent-readiness-input/v1alpha1"),
    ...agentReadinessRevisionFields,
    evidence_bindings: z.array(agentReadinessEvidenceBindingSchema).min(1),
})
    .strict()
    .superRefine((value, context) => {
    validateAgentReadinessProfile(value, context);
    const signalKeys = new Set(value.signals.map((signal) => `${signal.stage}:${signal.signal_code}`));
    const bindingKeys = value.evidence_bindings.map((binding) => `${binding.stage}:${binding.signal_code}`);
    if (new Set(bindingKeys).size !== bindingKeys.length ||
        bindingKeys.some((key) => !signalKeys.has(key)) ||
        bindingKeys.length !== signalKeys.size) {
        context.addIssue({
            code: "custom",
            path: ["evidence_bindings"],
            message: "Every agent readiness signal requires exactly one separate evidence binding.",
        });
    }
});
export const agentReadinessOfferRelationInputSchema = z
    .object({
    relation_input_contract: z.literal("sourcey.agent-readiness-offer-relation-input/v1alpha1"),
    agent_readiness_profile_id: agentReadinessProfileIdSchema,
    offer_id: agentReadinessOfferIdSchema,
    purpose: agentReadinessOfferRelationPurposeSchema,
    applicable_stages: z.array(agentReadinessStageSchema).min(1),
    effective_from: agentReadinessInstantSchema,
    effective_until: agentReadinessInstantSchema.optional(),
    declaration_revision_digest: agentReadinessDigestSchema,
    offer_relation_proposal_id: agentReadinessIdentifierSchema,
    admitted_offer_revision_digest: agentReadinessDigestSchema,
})
    .strict()
    .superRefine((value, context) => {
    if (new Set(value.applicable_stages).size !== value.applicable_stages.length) {
        context.addIssue({
            code: "custom",
            path: ["applicable_stages"],
            message: "Offer relation input stages must be unique.",
        });
    }
    validateOfferRelationInterval(value, context);
});
export const agentReadinessProfileReleaseInputSchema = z
    .object({
    release_input_contract: z.literal("sourcey.agent-readiness-release-input/v1alpha1"),
    profile_input: agentReadinessProfileInputSchema,
    declaration_revision: agentReadinessDeclarationRevisionSchema,
    offer_relation_inputs: z.array(agentReadinessOfferRelationInputSchema),
})
    .strict()
    .superRefine((value, context) => {
    if (value.profile_input.entity_id !== value.declaration_revision.entity_id ||
        value.profile_input.declaration_revision_digest !==
            value.declaration_revision.revision_digest ||
        !sameAgentReadinessScopeIdentity(value.profile_input.scope, value.declaration_revision.declaration.scope)) {
        context.addIssue({
            code: "custom",
            path: ["declaration_revision"],
            message: "A profile release input must bind its exact Entity declaration revision.",
        });
    }
    for (const [index, relation] of value.offer_relation_inputs.entries()) {
        if (relation.agent_readiness_profile_id !== value.profile_input.agent_readiness_profile_id ||
            relation.declaration_revision_digest !== value.declaration_revision.revision_digest) {
            context.addIssue({
                code: "custom",
                path: ["offer_relation_inputs", index],
                message: "An Offer relation input must bind its exact profile and declaration revision.",
            });
        }
    }
    const relationIdentities = value.offer_relation_inputs.map((relation) => `${relation.offer_id}:${relation.purpose}`);
    if (new Set(relationIdentities).size !== relationIdentities.length) {
        context.addIssue({
            code: "custom",
            path: ["offer_relation_inputs"],
            message: "A profile release input cannot repeat an Offer and purpose relation.",
        });
    }
});
export const agentReadinessFactualInputSchema = z
    .object({
    factual_input_contract: z.literal("sourcey.agent-readiness-factual-input/v1alpha1"),
    ...agentReadinessRevisionFields,
})
    .strict()
    .superRefine(validateAgentReadinessProfile);
export const agentReadinessRevisionCoreSchema = z
    .object({
    revision_contract: z.literal("sourcey.agent-readiness-revision/v1alpha1"),
    ...agentReadinessRevisionFields,
})
    .strict()
    .superRefine(validateAgentReadinessProfile);
export const agentReadinessRevisionSchema = agentReadinessRevisionCoreSchema
    .safeExtend({ revision_digest: agentReadinessDigestSchema })
    .strict();
/**
 * Stable head identity for closure and ownership checks. Historical Agent
 * Readiness revision bodies remain opaque and are never reparsed through the
 * current factual contract.
 */
export const agentReadinessRevisionHeadSchema = z.object({
    revision_contract: z.literal("sourcey.agent-readiness-revision/v1alpha1"),
    agent_readiness_profile_id: agentReadinessProfileIdSchema,
    entity_id: agentReadinessEntityIdSchema,
    revision_digest: agentReadinessDigestSchema,
});
const publicFindingSchema = z
    .object({
    condition: z.string().min(1).max(160),
    finding: z.string().min(1).max(280),
})
    .strict();
const publicFindingByValueSchema = z
    .object({
    yes: publicFindingSchema,
    no: publicFindingSchema,
    partial: publicFindingSchema,
    unknown: publicFindingSchema,
    not_applicable: publicFindingSchema,
})
    .strict();
const standardEvidenceSupportSchema = z
    .object({
    result: z.enum(["satisfied", "not_satisfied"]),
    values: z.array(agentReadinessSignalValueSchema.exclude(["unknown"])).min(1),
})
    .strict()
    .superRefine((value, context) => {
    if (new Set(value.values).size !== value.values.length) {
        context.addIssue({
            code: "custom",
            path: ["values"],
            message: "Standard evidence support values must be unique.",
        });
    }
});
const agentReadinessSurfaceSelectorSchema = z.discriminatedUnion("kind", [
    z
        .object({
        kind: z.literal("resource_role"),
        roles: z.array(agentReadinessResourceRoleSchema).min(1),
    })
        .strict(),
    z
        .object({
        kind: z.literal("endpoint_role"),
        roles: z.array(agentReadinessEndpointRoleSchema).min(1),
    })
        .strict(),
    z
        .object({
        kind: z.literal("interface_signature"),
        modalities: z.array(agentReadinessInterfaceModalitySchema).min(1),
        functions: z.array(agentReadinessInterfaceFunctionSchema).min(1),
    })
        .strict(),
    z
        .object({
        kind: z.literal("assessment_target_membership"),
        membership: z.enum(["direct", "reachable"]),
    })
        .strict(),
    z
        .object({
        kind: z.literal("target_relation"),
        relation_kind: agentReadinessSurfaceRelationKindSchema,
        direction: z.enum(["from_target", "to_target"]),
    })
        .strict(),
    z
        .object({
        kind: z.literal("standard_requirement"),
        requirement: standardRequirementReferenceSchema,
    })
        .strict(),
]);
const agentReadinessSurfaceSelectorAlternativeSchema = z
    .object({
    alternative_id: agentReadinessIdentifierSchema,
    selectors: z.array(agentReadinessSurfaceSelectorSchema).min(1),
})
    .strict()
    .superRefine((value, context) => {
    if (new Set(value.selectors.map((selector) => JSON.stringify(selector))).size !==
        value.selectors.length) {
        context.addIssue({
            code: "custom",
            path: ["selectors"],
            message: "A surface selector alternative cannot repeat a predicate.",
        });
    }
});
export const agentReadinessSurfaceSelectorGroupSchema = z
    .object({
    selector_group_id: agentReadinessIdentifierSchema,
    coverage: z.enum(["at_least_one", "all_matches"]),
    alternatives: z.array(agentReadinessSurfaceSelectorAlternativeSchema).min(1),
})
    .strict()
    .superRefine((value, context) => {
    const ids = value.alternatives.map((alternative) => alternative.alternative_id);
    if (new Set(ids).size !== ids.length) {
        context.addIssue({
            code: "custom",
            path: ["alternatives"],
            message: "Surface selector alternative IDs must be unique within a group.",
        });
    }
});
const agentReadinessValueEvidenceRuleSchema = z
    .object({
    value: agentReadinessSignalValueSchema.exclude(["unknown"]),
    alternatives: z.array(agentReadinessCorroborationAlternativeSchema).min(1),
})
    .strict()
    .superRefine((value, context) => {
    const ids = value.alternatives.map((alternative) => alternative.alternative_id);
    if (new Set(ids).size !== ids.length) {
        context.addIssue({
            code: "custom",
            path: ["alternatives"],
            message: "Corroboration alternative IDs must be unique for one signal value.",
        });
    }
});
export const agentReadinessStandardEvidenceMappingSchema = z
    .object({
    requirement: standardRequirementReferenceSchema,
    support: z.array(standardEvidenceSupportSchema).min(1).max(2),
})
    .strict()
    .superRefine((value, context) => {
    if (value.requirement.relation !== "tests") {
        context.addIssue({
            code: "custom",
            path: ["requirement", "relation"],
            message: "Standard evidence mappings must test an exact requirement.",
        });
    }
    if (new Set(value.support.map((mapping) => mapping.result)).size !== value.support.length) {
        context.addIssue({
            code: "custom",
            path: ["support"],
            message: "A standard result may appear only once per requirement mapping.",
        });
    }
});
export const agentReadinessPolicySignalRuleSchema = z
    .object({
    stage: agentReadinessStageSchema,
    signal_code: agentReadinessSignalCodeSchema,
    evaluation_role: agentReadinessEvaluationRoleSchema,
    required: z.boolean(),
    pass_values: z.array(agentReadinessSignalValueSchema).min(1),
    constrained_values: z.array(agentReadinessSignalValueSchema),
    fail_values: z.array(agentReadinessSignalValueSchema),
    allow_not_applicable: z.boolean(),
    allowed_method_digests: z.array(agentReadinessDigestSchema).min(1),
    selector_groups: z.array(agentReadinessSurfaceSelectorGroupSchema).min(1),
    evidence_terms: z
        .array(z.string().regex(/^[a-z0-9][a-z0-9 .+/_:-]*[a-z0-9+]$/u))
        .min(1)
        .optional(),
    value_evidence: z.array(agentReadinessValueEvidenceRuleSchema).min(1),
    priority: z.number().int().nonnegative(),
    blocker: z
        .object({
        code: z.string().min(1).max(160),
        explanation: z.string().min(1).max(500),
    })
        .strict()
        .optional(),
    remediation: z
        .object({
        code: z.string().min(1).max(160),
        instruction: z.string().min(1).max(500),
    })
        .strict()
        .optional(),
    public_findings: publicFindingByValueSchema,
    external_references: z.array(standardRequirementReferenceSchema),
    standard_evidence: z.array(agentReadinessStandardEvidenceMappingSchema),
})
    .strict()
    .superRefine((value, context) => {
    if (value.evidence_terms &&
        new Set(value.evidence_terms).size !== value.evidence_terms.length) {
        context.addIssue({
            code: "custom",
            path: ["evidence_terms"],
            message: "Evidence retrieval terms must be unique within a signal rule.",
        });
    }
    const assignments = [...value.pass_values, ...value.constrained_values, ...value.fail_values];
    if (new Set(assignments).size !== assignments.length) {
        context.addIssue({
            code: "custom",
            message: "An agent readiness signal value can map to only one outcome.",
        });
    }
    if (assignments.includes("not_applicable") !== value.allow_not_applicable) {
        context.addIssue({
            code: "custom",
            path: ["allow_not_applicable"],
            message: "not_applicable must be explicitly allowed and mapped.",
        });
    }
    if (assignments.includes("unknown")) {
        context.addIssue({
            code: "custom",
            message: "unknown is an unevaluated result and cannot be mapped to an outcome.",
        });
    }
    const expected = value.allow_not_applicable
        ? ["yes", "no", "partial", "not_applicable"]
        : ["yes", "no", "partial"];
    if (expected.some((candidate) => !assignments.includes(candidate)) ||
        assignments.some((candidate) => !expected.includes(candidate))) {
        context.addIssue({
            code: "custom",
            message: "Each assessable signal value must map to exactly one policy outcome.",
        });
    }
    if (new Set(value.allowed_method_digests).size !== value.allowed_method_digests.length) {
        context.addIssue({
            code: "custom",
            path: ["allowed_method_digests"],
            message: "Allowed Agent Readiness method digests must be unique.",
        });
    }
    const selectorGroupIds = value.selector_groups.map((group) => group.selector_group_id);
    if (new Set(selectorGroupIds).size !== selectorGroupIds.length) {
        context.addIssue({
            code: "custom",
            path: ["selector_groups"],
            message: "Signal selector group IDs must be unique.",
        });
    }
    const evidenceValues = value.value_evidence.map((evidence) => evidence.value);
    if (new Set(evidenceValues).size !== evidenceValues.length ||
        evidenceValues.length !== assignments.length ||
        assignments.some((assignment) => assignment === "unknown" || !evidenceValues.includes(assignment))) {
        context.addIssue({
            code: "custom",
            path: ["value_evidence"],
            message: "Every assessable signal value requires exactly one evidence rule.",
        });
    }
    const mappingKeys = value.standard_evidence.map(({ requirement }) => standardRequirementKey(requirement));
    if (new Set(mappingKeys).size !== mappingKeys.length) {
        context.addIssue({
            code: "custom",
            path: ["standard_evidence"],
            message: "A signal rule cannot repeat an external standard requirement mapping.",
        });
    }
    const testedReferenceKeys = value.external_references
        .filter((reference) => reference.relation === "tests")
        .map(standardRequirementKey);
    if (testedReferenceKeys.length !== mappingKeys.length ||
        testedReferenceKeys.some((key) => !mappingKeys.includes(key))) {
        context.addIssue({
            code: "custom",
            path: ["standard_evidence"],
            message: "Every tests reference must have exactly one policy-owned standard evidence mapping.",
        });
    }
    const assessableValues = new Set(assignments);
    if (value.standard_evidence.some((mapping) => mapping.support.some((support) => support.values.some((candidate) => !assessableValues.has(candidate))))) {
        context.addIssue({
            code: "custom",
            path: ["standard_evidence"],
            message: "Standard evidence can support only values assessed by the same signal rule.",
        });
    }
    if (value.evaluation_role === "informational") {
        if (value.required || value.blocker !== undefined || value.remediation !== undefined) {
            context.addIssue({
                code: "custom",
                message: "Informational signals must be optional and cannot own blockers or remediation.",
            });
        }
    }
    if (value.evaluation_role === "barrier" && value.required) {
        context.addIssue({
            code: "custom",
            path: ["required"],
            message: "Barrier signals are assessed but cannot be required for core coverage.",
        });
    }
    if (value.fail_values.length > 0 &&
        value.evaluation_role !== "informational" &&
        !value.blocker) {
        context.addIssue({
            code: "custom",
            path: ["blocker"],
            message: "A failing readiness signal requires a blocker explanation.",
        });
    }
    if ((value.constrained_values.length > 0 || value.fail_values.length > 0) &&
        value.evaluation_role !== "informational" &&
        !value.remediation) {
        context.addIssue({
            code: "custom",
            path: ["remediation"],
            message: "A constrained or failing readiness signal requires remediation.",
        });
    }
});
function standardRequirementKey(value) {
    return `${value.namespace}\u0000${value.version}\u0000${value.requirement_id}`;
}
const stageOutcomePrecedenceSchema = z
    .array(agentReadinessStageOutcomeSchema)
    .length(agentReadinessStageOutcomeSchema.options.length)
    .superRefine((value, context) => {
    if (new Set(value).size !== agentReadinessStageOutcomeSchema.options.length ||
        agentReadinessStageOutcomeSchema.options.some((outcome) => !value.includes(outcome))) {
        context.addIssue({
            code: "custom",
            message: "Agent readiness outcome precedence must contain every outcome exactly once.",
        });
    }
});
const publicStateDescriptorSchema = z
    .object({
    state: agentReadinessPublicStateSchema,
    label: z.string().min(1).max(40),
})
    .strict();
const agentReadinessGradingSchema = z
    .object({
    strategy: z.literal("stage-state-cardinality"),
    grade_by_limited_stage_count: z
        .object({
        "0": z.literal("A+"),
        "1": z.literal("A"),
        "2": z.literal("B+"),
        "3": z.literal("B"),
        "4": z.literal("C+"),
        "5": z.literal("C"),
    })
        .strict(),
    failure_grade_by_stage: z
        .object({
        evaluate: z.literal("D"),
        sign_up: z.literal("D"),
        pay: z.literal("D"),
        provision: z.literal("F"),
        operate: z.literal("F"),
    })
        .strict(),
    unverified_barrier_grade_cap: z.literal("B+").optional(),
    not_applicable_signals: z.literal("excluded"),
    unrated_when: z
        .object({
        coverage: z.literal("not-complete"),
        freshness: z.literal("not-fresh"),
    })
        .strict(),
})
    .strict();
export const agentReadinessAssessmentBasisSchema = z
    .object({
    principal: z.literal("authorized_human_or_organization"),
    initial_state: z
        .object({
        product_specific_account: z.literal(false),
        product_credentials: z.literal(false),
        paid_subscription: z.literal(false),
        provisioned_resource: z.literal(false),
        external_identity: z.literal("only_when_declared_by_exact_funnel"),
    })
        .strict(),
    permitted_human_boundaries: z.array(z.enum([
        "account_ownership_confirmation",
        "delegated_identity_consent",
        "regulated_approval",
        "final_payment_or_irreversible_commitment",
    ])),
    required_handoff_properties: z.array(z.enum(["exact_disclosure", "resumable_handoff", "deterministic_continuation"])),
    forbidden_substitutions: z.array(z.enum([
        "captcha_solving",
        "human_password_or_session_sharing",
        "concealed_agent_identity",
        "invented_eligibility",
        "unbound_out_of_band_code",
        "vendor_policy_bypass",
        "unapproved_consequential_action",
    ])),
    success: z
        .object({
        target_coverage: z.literal("every_declared_target"),
        interface_coverage: z.literal("at_least_one_declared_alternative"),
        authority: z.literal("scoped"),
        failure_semantics: z.literal("documented"),
        recovery: z.literal("supported"),
    })
        .strict(),
    observed_assessment: z
        .object({
        allowed_sources: z.array(z.enum([
            "public_documentation",
            "public_metadata",
            "public_endpoints",
            "non_mutating_interaction",
            "operator_attested_public_observation",
        ])),
        consequential_claims: z.literal("certification_required"),
    })
        .strict(),
})
    .strict()
    .superRefine((value, context) => {
    for (const key of [
        "permitted_human_boundaries",
        "required_handoff_properties",
        "forbidden_substitutions",
    ]) {
        if (new Set(value[key]).size !== value[key].length) {
            context.addIssue({
                code: "custom",
                path: [key],
                message: `Assessment basis ${key} must be unique.`,
            });
        }
    }
    if (new Set(value.observed_assessment.allowed_sources).size !==
        value.observed_assessment.allowed_sources.length) {
        context.addIssue({
            code: "custom",
            path: ["observed_assessment", "allowed_sources"],
            message: "Assessment basis allowed sources must be unique.",
        });
    }
});
export const agentReadinessPolicyCoreSchema = z
    .object({
    policy_contract: z.literal("sourcey.agent-readiness-policy/v1alpha1"),
    policy_version: z.string().min(1),
    assessment_basis: agentReadinessAssessmentBasisSchema,
    assessment_methods: z.array(agentReadinessAssessmentMethodPackSchema).min(1),
    signal_rules: z.array(agentReadinessPolicySignalRuleSchema).min(1),
    aggregation: z
        .object({
        stage: z.literal("worst-signal"),
        overall: z.literal("worst-stage"),
        outcome_precedence: stageOutcomePrecedenceSchema,
        blocker_precedence: z.literal("outcome-then-rule-priority"),
        tie_breaker: z.literal("signal-code"),
    })
        .strict(),
    coverage: z
        .object({
        unknown_signals: z.literal("uncovered"),
        contradicted_signals: z.literal("uncovered"),
    })
        .strict(),
    freshness: z
        .object({
        source: z.literal("observation-freshness-policy"),
        aggregation: z.enum(["worst-required-signal", "worst-evaluated-signal", "worst-signal"]),
    })
        .strict(),
    public_states: z
        .object({
        pass: publicStateDescriptorSchema,
        constrained: publicStateDescriptorSchema,
        fail: publicStateDescriptorSchema,
        unknown: publicStateDescriptorSchema,
        not_applicable: publicStateDescriptorSchema,
    })
        .strict(),
    grading: agentReadinessGradingSchema,
    grade_derivation: z
        .object({
        label: z.string().min(1).max(80),
        explanation: z.string().min(1).max(500),
        coverage_rule: z.string().min(1).max(280),
        outcome_rule: z.string().min(1).max(280),
    })
        .strict(),
})
    .strict()
    .superRefine((value, context) => {
    const keys = value.signal_rules.map((rule) => `${rule.stage}:${rule.signal_code}`);
    if (new Set(keys).size !== keys.length) {
        context.addIssue({
            code: "custom",
            path: ["signal_rules"],
            message: "An agent readiness policy cannot repeat a stage signal rule.",
        });
    }
    const priorities = value.signal_rules.map((rule) => `${rule.stage}:${rule.priority}`);
    if (new Set(priorities).size !== priorities.length) {
        context.addIssue({
            code: "custom",
            path: ["signal_rules"],
            message: "Agent readiness rule priorities must be unique within each stage.",
        });
    }
    const methodDigests = new Set(value.assessment_methods.map((method) => method.method_digest));
    if (methodDigests.size !== value.assessment_methods.length) {
        context.addIssue({
            code: "custom",
            path: ["assessment_methods"],
            message: "Agent readiness policy method digests must be unique.",
        });
    }
    for (const [index, rule] of value.signal_rules.entries()) {
        for (const methodDigest of rule.allowed_method_digests) {
            if (!methodDigests.has(methodDigest)) {
                context.addIssue({
                    code: "custom",
                    path: ["signal_rules", index, "allowed_method_digests"],
                    message: `Agent readiness signal rule references unresolved method ${methodDigest}.`,
                });
            }
        }
        if (rule.evaluation_role === "graded" && !rule.required) {
            context.addIssue({
                code: "custom",
                path: ["signal_rules", index, "required"],
                message: "Every graded Agent Readiness signal is required for coverage.",
            });
        }
        if (rule.evaluation_role === "informational" && rule.required) {
            context.addIssue({
                code: "custom",
                path: ["signal_rules", index, "required"],
                message: "Informational Agent Readiness signals cannot be required for coverage.",
            });
        }
        if (rule.evaluation_role === "barrier" && rule.required) {
            context.addIssue({
                code: "custom",
                path: ["signal_rules", index, "required"],
                message: "Barrier Agent Readiness signals cannot be required for core coverage.",
            });
        }
        const standardSelectorKeys = rule.selector_groups.flatMap((group) => group.alternatives.flatMap((alternative) => alternative.selectors
            .filter((selector) => selector.kind === "standard_requirement")
            .map((selector) => standardRequirementKey(selector.requirement))));
        if (standardSelectorKeys.some((key) => !rule.standard_evidence.some(({ requirement }) => standardRequirementKey(requirement) === key))) {
            context.addIssue({
                code: "custom",
                path: ["signal_rules", index, "selector_groups"],
                message: "Standard requirement selectors must bind exact policy evidence mappings.",
            });
        }
    }
    for (const stage of agentReadinessStageSchema.options) {
        if (!value.signal_rules.some((rule) => rule.stage === stage && rule.evaluation_role === "graded" && rule.required)) {
            context.addIssue({
                code: "custom",
                path: ["signal_rules"],
                message: `Agent readiness policy has no required graded rules for ${stage}.`,
            });
        }
    }
    const expectedStates = {
        pass: "ready",
        constrained: "limited",
        fail: "blocked",
        unknown: "unknown",
        not_applicable: "not_applicable",
    };
    for (const [outcome, state] of Object.entries(expectedStates)) {
        if (value.public_states[outcome].state !== state) {
            context.addIssue({
                code: "custom",
                path: ["public_states", outcome, "state"],
                message: `Outcome ${outcome} must project to public state ${state}.`,
            });
        }
    }
});
export const agentReadinessPolicySchema = agentReadinessPolicyCoreSchema
    .safeExtend({ policy_digest: agentReadinessDigestSchema })
    .strict();
const projectedBlockerSchema = z
    .object({
    signal_code: agentReadinessSignalCodeSchema,
    code: z.string().min(1).max(160),
    explanation: z.string().min(1).max(500),
})
    .strict();
const projectedRemediationSchema = z
    .object({
    signal_code: agentReadinessSignalCodeSchema,
    code: z.string().min(1).max(160),
    instruction: z.string().min(1).max(500),
})
    .strict();
const projectedFindingSchema = z
    .object({
    signal_code: agentReadinessSignalCodeSchema,
    condition: z.string().min(1).max(160),
    finding: z.string().min(1).max(280),
    context: agentReadinessPublicClaimTextSchema.optional(),
})
    .strict();
export const agentReadinessProjectedSignalSchema = z
    .object({
    signal_code: agentReadinessSignalCodeSchema,
    evaluation_role: agentReadinessEvaluationRoleSchema,
    required: z.boolean(),
    value: agentReadinessSignalValueSchema,
    value_label: z.string().min(1).max(40),
    outcome: agentReadinessStageOutcomeSchema,
    public_state: agentReadinessPublicStateSchema,
    condition: z.string().min(1).max(160),
    finding: z.string().min(1).max(280),
    evidence_status: z.enum(["supported", "contradicted", "mixed", "missing"]),
    freshness: agentReadinessFreshnessSchema,
    observed_at: agentReadinessInstantSchema.optional(),
    tested_surfaces: z.array(agentReadinessSurfaceReferenceSchema),
    assessment_method: agentReadinessAssessmentMethodSchema.optional(),
    determination_bases: z.array(agentReadinessDeterminationBasisSchema),
    note: agentReadinessPublicClaimTextSchema.optional(),
    blocker: projectedBlockerSchema.optional(),
    remediation: projectedRemediationSchema.optional(),
})
    .strict();
export const agentReadinessStageProjectionSchema = z
    .object({
    stage: agentReadinessStageSchema,
    stage_label: z.string().min(1).max(40),
    outcome: agentReadinessStageOutcomeSchema,
    public_state: agentReadinessPublicStateSchema,
    state_label: z.string().min(1).max(40),
    primary_finding: projectedFindingSchema,
    secondary_context: z.array(projectedFindingSchema),
    signals: z.array(agentReadinessProjectedSignalSchema),
    blockers: z.array(projectedBlockerSchema),
    remediations: z.array(projectedRemediationSchema),
})
    .strict();
export const agentReadinessPublicationVisibilitySchema = z.enum([
    "discoverable",
    "resolvable_only",
    "private",
]);
export const agentReadinessProjectionCoreSchema = z
    .object({
    projection_contract: z.literal("sourcey.agent-readiness-projection/v1alpha1"),
    agent_readiness_profile_id: agentReadinessProfileIdSchema,
    entity_id: agentReadinessEntityIdSchema,
    scope: agentReadinessScopeSchema,
    catalog_binding: agentReadinessCatalogBindingSchema,
    declaration_revision_digest: agentReadinessDigestSchema,
    declaration: agentReadinessDeclarationStateSchema,
    surface_catalog: z
        .object({
        assessment_targets: z.array(agentReadinessAssessmentTargetSchema),
        participants: z.array(agentReadinessParticipantSchema),
        resources: z.array(agentReadinessResourceSchema),
        endpoints: z.array(agentReadinessEndpointSchema),
        interfaces: z.array(agentReadinessDeclaredInterfaceSchema),
        relations: z.array(agentReadinessSurfaceRelationSchema),
        surface_exclusions: z.array(agentReadinessSurfaceExclusionSchema),
    })
        .strict(),
    lifecycle: lifecycleStatusSchema,
    effective_from: agentReadinessInstantSchema,
    effective_until: agentReadinessInstantSchema.optional(),
    revision_digest: agentReadinessDigestSchema,
    policy_digest: agentReadinessDigestSchema,
    policy_version: z.string().min(1),
    policy_as_of: agentReadinessInstantSchema,
    assessment_basis: agentReadinessAssessmentBasisSchema,
    overall_outcome: agentReadinessStageOutcomeSchema,
    public_state: agentReadinessPublicStateSchema,
    state_label: z.string().min(1).max(40),
    grade: agentReadinessGradeSchema,
    grade_derivation: z
        .object({
        label: z.string().min(1).max(80),
        explanation: z.string().min(1).max(500),
        coverage_rule: z.string().min(1).max(280),
        outcome_rule: z.string().min(1).max(280),
    })
        .strict(),
    publication: z
        .object({
        visibility: agentReadinessPublicationVisibilitySchema,
        reasons: z.array(z.enum([
            "lifecycle_not_active",
            "coverage_incomplete",
            "required_evidence_not_supported",
            "freshness_not_fresh",
            "unrated",
            "no_useful_finding",
            "open_dispute",
        ])),
    })
        .strict(),
    primary_finding: z
        .object({
        stage: agentReadinessStageSchema,
        stage_label: z.string().min(1).max(40),
        public_state: z.enum(["limited", "blocked"]),
        finding: projectedFindingSchema,
        blocker: projectedBlockerSchema.optional(),
    })
        .strict()
        .optional(),
    first_blocked_stage: z
        .object({
        stage: agentReadinessStageSchema,
        stage_label: z.string().min(1).max(40),
        finding: projectedFindingSchema,
        blocker: projectedBlockerSchema.optional(),
    })
        .strict()
        .optional(),
    limitations: z.array(z
        .object({
        stage: agentReadinessStageSchema,
        stage_label: z.string().min(1).max(40),
        finding: projectedFindingSchema,
        remediation: projectedRemediationSchema.optional(),
    })
        .strict()),
    stages: z.array(agentReadinessStageProjectionSchema).length(5),
    coverage: z
        .object({
        status: z.enum(["complete", "incomplete"]),
        required_signals: z.number().int().nonnegative(),
        covered_signals: z.number().int().nonnegative(),
        ratio: z.number().min(0).max(1),
        barrier_signals: z.number().int().nonnegative(),
        verified_barrier_signals: z.number().int().nonnegative(),
        barrier_ratio: z.number().min(0).max(1),
    })
        .strict(),
    last_tested_at: agentReadinessInstantSchema,
    freshness: agentReadinessFreshnessSchema,
    provenance: provenanceSchema,
    canonical_url: z.url(),
})
    .strict();
export const agentReadinessProjectionSchema = agentReadinessProjectionCoreSchema
    .safeExtend({ projection_digest: agentReadinessDigestSchema })
    .strict();
export const agentReadinessStageSummarySchema = agentReadinessStageProjectionSchema
    .pick({
    stage: true,
    stage_label: true,
    outcome: true,
    public_state: true,
    state_label: true,
    primary_finding: true,
})
    .strict();
export const agentReadinessProvenanceSummarySchema = provenanceSchema
    .pick({
    freshness: true,
    dispute: true,
    vendor_attestation: true,
})
    .strict();
export const agentReadinessProfileSummarySchema = agentReadinessProjectionSchema
    .pick({
    agent_readiness_profile_id: true,
    entity_id: true,
    scope: true,
    declaration_revision_digest: true,
    lifecycle: true,
    effective_from: true,
    revision_digest: true,
    policy_digest: true,
    policy_version: true,
    policy_as_of: true,
    overall_outcome: true,
    public_state: true,
    state_label: true,
    grade: true,
    grade_derivation: true,
    publication: true,
    primary_finding: true,
    coverage: true,
    last_tested_at: true,
    freshness: true,
    canonical_url: true,
    projection_digest: true,
})
    .safeExtend({
    stages: z.array(agentReadinessStageSummarySchema).length(5),
    provenance: agentReadinessProvenanceSummarySchema,
})
    .strict();
/** The one compact public-list projection of a complete released profile. */
export function summarizeAgentReadinessProfile(profile) {
    return agentReadinessProfileSummarySchema.parse({
        agent_readiness_profile_id: profile.agent_readiness_profile_id,
        entity_id: profile.entity_id,
        scope: profile.scope,
        declaration_revision_digest: profile.declaration_revision_digest,
        lifecycle: profile.lifecycle,
        effective_from: profile.effective_from,
        revision_digest: profile.revision_digest,
        policy_digest: profile.policy_digest,
        policy_version: profile.policy_version,
        policy_as_of: profile.policy_as_of,
        overall_outcome: profile.overall_outcome,
        public_state: profile.public_state,
        state_label: profile.state_label,
        grade: profile.grade,
        grade_derivation: profile.grade_derivation,
        publication: profile.publication,
        primary_finding: profile.primary_finding,
        stages: profile.stages.map((stage) => ({
            stage: stage.stage,
            stage_label: stage.stage_label,
            outcome: stage.outcome,
            public_state: stage.public_state,
            state_label: stage.state_label,
            primary_finding: stage.primary_finding,
        })),
        coverage: profile.coverage,
        last_tested_at: profile.last_tested_at,
        freshness: profile.freshness,
        provenance: {
            freshness: profile.provenance.freshness,
            dispute: profile.provenance.dispute,
            vendor_attestation: profile.provenance.vendor_attestation,
        },
        canonical_url: profile.canonical_url,
        projection_digest: profile.projection_digest,
    });
}
/**
 * Stable identity and lineage fields for an immutable projection already admitted by a
 * previous release. Unknown fields are retained so its exact historical bytes remain
 * digest-verifiable; callers must not use this contract for current semantic reads.
 */
export const agentReadinessProjectionLineageSchema = z
    .object({
    projection_contract: z.literal("sourcey.agent-readiness-projection/v1alpha1"),
    agent_readiness_profile_id: agentReadinessProfileIdSchema,
    entity_id: agentReadinessEntityIdSchema,
    scope: agentReadinessScopeSchema,
    lifecycle: lifecycleStatusSchema,
    revision_digest: agentReadinessDigestSchema,
    policy_digest: agentReadinessDigestSchema,
    policy_as_of: agentReadinessInstantSchema,
    publication: z.object({ visibility: agentReadinessPublicationVisibilitySchema }).passthrough(),
    provenance: z.object({ freshness_policy_digest: agentReadinessDigestSchema }).passthrough(),
    canonical_url: z.url(),
    projection_digest: agentReadinessDigestSchema,
})
    .passthrough();
const agentReadinessOfferRelationRevisionFields = {
    relation_id: agentReadinessIdentifierSchema,
    agent_readiness_profile_id: agentReadinessProfileIdSchema,
    offer_id: agentReadinessOfferIdSchema,
    purpose: agentReadinessOfferRelationPurposeSchema,
    applicable_stages: z.array(agentReadinessStageSchema).min(1),
    effective_from: agentReadinessInstantSchema,
    effective_until: agentReadinessInstantSchema.optional(),
    declaration_revision_digest: agentReadinessDigestSchema,
    offer_relation_proposal_id: agentReadinessIdentifierSchema,
    admitted_offer_revision_digest: agentReadinessDigestSchema,
};
const agentReadinessOfferRelationRevisionFieldsSchema = z
    .object({
    relation_contract: z.literal("sourcey.agent-readiness-offer-relation/v1alpha1"),
    ...agentReadinessOfferRelationRevisionFields,
})
    .strict();
export const agentReadinessOfferRelationRevisionCoreSchema = agentReadinessOfferRelationRevisionFieldsSchema.superRefine(validateOfferRelationRevision);
export const agentReadinessOfferRelationRevisionSchema = agentReadinessOfferRelationRevisionCoreSchema
    .safeExtend({ relation_revision_digest: agentReadinessDigestSchema })
    .strict();
export const agentReadinessOfferRelationTransitionSchema = z
    .object({
    previous: agentReadinessOfferRelationRevisionSchema.nullable(),
    current: agentReadinessOfferRelationRevisionSchema.nullable(),
})
    .strict()
    .superRefine((value, context) => {
    if (!value.previous && !value.current) {
        context.addIssue({
            code: "custom",
            message: "An Offer relation transition cannot be empty.",
        });
        return;
    }
    if (value.previous &&
        value.current &&
        !sameAgentReadinessOfferRelationIdentity(value.previous, value.current)) {
        context.addIssue({
            code: "custom",
            path: ["current"],
            message: "An Offer relation revision cannot change profile, Offer, or purpose identity.",
        });
    }
});
export const agentReadinessOfferRelationDeltaObjectSchema = z
    .object({
    object_contract: z.literal("sourcey.agent-readiness-offer-relation-delta-object/v1alpha1"),
    relation_id: agentReadinessIdentifierSchema,
    relation_input: agentReadinessOfferRelationInputSchema.nullable(),
    relation: agentReadinessOfferRelationRevisionSchema.nullable(),
    prior_relation: agentReadinessOfferRelationRevisionSchema.nullable(),
    catalog_context: z
        .object({
        entity_id: agentReadinessEntityIdSchema,
        profile_revision_digest: agentReadinessDigestSchema,
        declaration_revision: agentReadinessDeclarationRevisionSchema,
        offer_revision: offerRevisionSchema.nullable(),
    })
        .strict(),
})
    .strict()
    .superRefine((value, context) => {
    const transition = agentReadinessOfferRelationTransitionSchema.safeParse({
        previous: value.prior_relation,
        current: value.relation,
    });
    if (!transition.success) {
        context.addIssue({
            code: "custom",
            message: "Offer relation delta must contain one identity-stable transition.",
        });
        return;
    }
    for (const [field, relation] of [
        ["relation", value.relation],
        ["prior_relation", value.prior_relation],
    ]) {
        if (relation && relation.relation_id !== value.relation_id) {
            context.addIssue({
                code: "custom",
                path: [field, "relation_id"],
                message: "Offer relation delta objects retain one exact relation identity.",
            });
        }
    }
    if ((value.relation === null) !== (value.relation_input === null)) {
        context.addIssue({
            code: "custom",
            path: ["relation_input"],
            message: "A current Offer relation requires its exact canonical input.",
        });
    }
    if (value.relation && value.relation_input) {
        const offerRevision = value.catalog_context.offer_revision;
        if (value.relation_input.agent_readiness_profile_id !==
            value.relation.agent_readiness_profile_id ||
            value.relation_input.offer_id !== value.relation.offer_id ||
            value.relation_input.purpose !== value.relation.purpose ||
            value.relation_input.declaration_revision_digest !==
                value.relation.declaration_revision_digest ||
            value.relation_input.admitted_offer_revision_digest !==
                value.relation.admitted_offer_revision_digest ||
            value.catalog_context.declaration_revision.revision_digest !==
                value.relation.declaration_revision_digest ||
            value.catalog_context.entity_id !== value.catalog_context.declaration_revision.entity_id ||
            offerRevision?.offer_id !== value.relation.offer_id ||
            offerRevision?.entity_id !== value.catalog_context.entity_id ||
            offerRevision?.revision_digest !== value.relation.admitted_offer_revision_digest) {
            context.addIssue({
                code: "custom",
                path: ["catalog_context"],
                message: "Current Offer relation delta lacks exact same-Entity Catalog closure.",
            });
        }
    }
    else if (value.catalog_context.offer_revision !== null) {
        context.addIssue({
            code: "custom",
            path: ["catalog_context", "offer_revision"],
            message: "A withdrawn Offer relation carries no current Offer closure.",
        });
    }
});
export const agentReadinessOfferRelationIndexSchema = z
    .object({
    relation_index_contract: z.literal("sourcey.agent-readiness-offer-relation-index/v1alpha1"),
    relations: z.record(agentReadinessIdentifierSchema, agentReadinessOfferRelationRevisionSchema),
    by_profile: z.record(agentReadinessProfileIdSchema, z.array(agentReadinessIdentifierSchema)),
    by_offer: z.record(agentReadinessOfferIdSchema, z.array(agentReadinessIdentifierSchema)),
})
    .strict()
    .superRefine((value, context) => {
    const expectedByProfile = relationMembership(value.relations, "agent_readiness_profile_id");
    const expectedByOffer = relationMembership(value.relations, "offer_id");
    validateRelationMembership(value.by_profile, expectedByProfile, context, ["by_profile"]);
    validateRelationMembership(value.by_offer, expectedByOffer, context, ["by_offer"]);
    for (const [relationId, relation] of Object.entries(value.relations)) {
        if (relation.relation_id !== relationId) {
            context.addIssue({
                code: "custom",
                path: ["relations", relationId, "relation_id"],
                message: "An Offer relation index key must equal the relation identity.",
            });
        }
    }
    const identities = Object.values(value.relations).map((relation) => `${relation.agent_readiness_profile_id}:${relation.offer_id}:${relation.purpose}`);
    if (new Set(identities).size !== identities.length) {
        context.addIssue({
            code: "custom",
            path: ["relations"],
            message: "Current Offer relations cannot repeat profile, Offer, and purpose identity.",
        });
    }
});
export const agentReadinessOfferRelationInputsSchema = z
    .object({
    input_contract: z.literal("sourcey.agent-readiness-offer-relation-inputs/v1alpha1"),
    relations: z.array(z
        .object({
        relation_id: agentReadinessIdentifierSchema,
        input_digest: agentReadinessDigestSchema,
        relation_revision_digest: agentReadinessDigestSchema,
        path: z
            .string()
            .regex(/^inputs\/agent-readiness-offer-relations\/sha256-[a-f0-9]{64}\.json$/u),
    })
        .strict()),
})
    .strict()
    .superRefine((value, context) => {
    const relationIds = value.relations.map((relation) => relation.relation_id);
    const inputDigests = value.relations.map((relation) => relation.input_digest);
    if (new Set(relationIds).size !== relationIds.length ||
        new Set(inputDigests).size !== inputDigests.length) {
        context.addIssue({
            code: "custom",
            path: ["relations"],
            message: "Offer relation input index identities and input digests must be unique.",
        });
    }
    const sorted = [...value.relations].sort((left, right) => left.relation_id.localeCompare(right.relation_id));
    if (sorted.some((relation, index) => relation.relation_id !== value.relations[index]?.relation_id)) {
        context.addIssue({
            code: "custom",
            path: ["relations"],
            message: "Offer relation inputs must be canonically ordered by relation identity.",
        });
    }
});
export const agentReadinessIndexSchema = z
    .object({
    agent_readiness_index_contract: z.literal("sourcey.agent-readiness-index/v1alpha1"),
    profiles: z.record(z.string(), z
        .object({
        agent_readiness_profile_id: agentReadinessProfileIdSchema,
        entity_id: agentReadinessEntityIdSchema,
        lifecycle: lifecycleStatusSchema,
        revision_digest: agentReadinessDigestSchema,
        policy_digest: agentReadinessDigestSchema,
        projection_digest: agentReadinessDigestSchema,
        canonical_url: z.url(),
        path: z.string().startsWith("agent-readiness/"),
    })
        .strict()),
})
    .strict();
export const agentReadinessInputsSchema = z
    .object({
    input_contract: z.literal("sourcey.agent-readiness-inputs/v1alpha1"),
    policy_digest: agentReadinessDigestSchema,
    profiles: z.array(z
        .object({
        agent_readiness_profile_id: agentReadinessProfileIdSchema,
        input_digest: agentReadinessDigestSchema,
        revision_digest: agentReadinessDigestSchema,
        path: z.string().startsWith("inputs/agent-readiness/"),
    })
        .strict()),
})
    .strict();
export const agentReadinessDeltaObjectSchema = z
    .object({
    object_contract: z.literal("sourcey.agent-readiness-delta-object/v1alpha1"),
    agent_readiness_profile_id: agentReadinessProfileIdSchema,
    profile_input: agentReadinessProfileInputSchema.nullable(),
    projection: agentReadinessProjectionSchema.nullable(),
    prior_projection: agentReadinessProjectionLineageSchema.nullable(),
    catalog_context: z
        .object({
        entity_slug: z.string().regex(SLUG_PATTERN),
        entity_revision: entityRevisionSchema,
        declaration_revision: agentReadinessDeclarationRevisionSchema,
    })
        .strict()
        .nullable(),
})
    .strict()
    .superRefine((value, context) => {
    if (!value.projection && !value.prior_projection) {
        context.addIssue({
            code: "custom",
            message: "An Agent Readiness delta object requires a current or prior projection.",
        });
        return;
    }
    for (const [key, projection] of [
        ["projection", value.projection],
        ["prior_projection", value.prior_projection],
    ]) {
        if (projection &&
            projection.agent_readiness_profile_id !== value.agent_readiness_profile_id) {
            context.addIssue({
                code: "custom",
                path: [key, "agent_readiness_profile_id"],
                message: "Agent Readiness delta projections must retain the addressed profile ID.",
            });
        }
    }
    const current = value.projection;
    if (!current) {
        if (value.profile_input || value.catalog_context) {
            context.addIssue({
                code: "custom",
                message: "A retired Agent Readiness delta cannot carry current input or context.",
            });
        }
        return;
    }
    if (!value.catalog_context) {
        context.addIssue({
            code: "custom",
            path: ["catalog_context"],
            message: "A current Agent Readiness projection requires its exact Catalog context.",
        });
        return;
    }
    if (value.prior_projection &&
        !sameAgentReadinessScopeIdentity(value.prior_projection.scope, current.scope)) {
        context.addIssue({
            code: "custom",
            path: ["projection", "scope"],
            message: "An Agent Readiness profile cannot change product or funnel identity.",
        });
    }
    if (!value.prior_projection && !value.profile_input) {
        context.addIssue({
            code: "custom",
            path: ["profile_input"],
            message: "A new Agent Readiness profile requires its exact input.",
        });
    }
    if (!value.profile_input &&
        value.prior_projection?.revision_digest !== current.revision_digest) {
        context.addIssue({
            code: "custom",
            path: ["profile_input"],
            message: "A policy-only regrade must retain the exact current revision.",
        });
    }
    if (current.entity_id !== value.catalog_context.entity_revision.entity_id ||
        current.entity_id !== value.catalog_context.declaration_revision.entity_id ||
        current.declaration_revision_digest !==
            value.catalog_context.declaration_revision.revision_digest ||
        !sameAgentReadinessScopeIdentity(current.scope, value.catalog_context.declaration_revision.declaration.scope)) {
        context.addIssue({
            code: "custom",
            path: ["catalog_context"],
            message: "Agent Readiness projection does not match its Entity context.",
        });
    }
    if (value.profile_input &&
        (value.profile_input.agent_readiness_profile_id !== value.agent_readiness_profile_id ||
            value.profile_input.entity_id !== value.catalog_context.entity_revision.entity_id ||
            value.profile_input.declaration_revision_digest !==
                value.catalog_context.declaration_revision.revision_digest ||
            value.profile_input.catalog_binding.entity_revision_digest !==
                value.catalog_context.entity_revision.revision_digest)) {
        context.addIssue({
            code: "custom",
            path: ["catalog_context"],
            message: "Agent Readiness input does not bind its exact Entity context.",
        });
    }
});
function validateOfferRelationRevision(value, context) {
    const canonicalStages = agentReadinessStageSchema.options.filter((stage) => value.applicable_stages.includes(stage));
    if (canonicalStages.length !== value.applicable_stages.length ||
        canonicalStages.some((stage, index) => value.applicable_stages[index] !== stage)) {
        context.addIssue({
            code: "custom",
            path: ["applicable_stages"],
            message: "Offer relation stages must be unique and ordered by the canonical funnel.",
        });
    }
    validateOfferRelationInterval(value, context);
}
function validateOfferRelationInterval(value, context) {
    if (value.effective_until &&
        Date.parse(value.effective_until) <= Date.parse(value.effective_from)) {
        context.addIssue({
            code: "custom",
            path: ["effective_until"],
            message: "Agent Readiness Offer relation effective interval is empty.",
        });
    }
}
export function sameAgentReadinessOfferRelationIdentity(left, right) {
    return (left.relation_id === right.relation_id &&
        left.agent_readiness_profile_id === right.agent_readiness_profile_id &&
        left.offer_id === right.offer_id &&
        left.purpose === right.purpose);
}
function relationMembership(relations, field) {
    const memberships = new Map();
    for (const relation of Object.values(relations)) {
        memberships.set(field === "offer_id" ? relation.offer_id : relation.agent_readiness_profile_id, [
            ...(memberships.get(field === "offer_id" ? relation.offer_id : relation.agent_readiness_profile_id) ?? []),
            relation.relation_id,
        ]);
    }
    for (const [key, ids] of memberships)
        memberships.set(key, [...ids].sort());
    return memberships;
}
function validateRelationMembership(actual, expected, context, path) {
    if (Object.keys(actual).length !== expected.size) {
        context.addIssue({
            code: "custom",
            path,
            message: "Offer relation index membership is incomplete.",
        });
        return;
    }
    for (const [key, expectedIds] of expected) {
        const actualIds = actual[key];
        if (!actualIds ||
            actualIds.length !== expectedIds.length ||
            new Set(actualIds).size !== actualIds.length ||
            actualIds.some((id, index) => id !== expectedIds[index])) {
            context.addIssue({
                code: "custom",
                path: [...path, key],
                message: "Offer relation index membership must be unique, complete, and canonically ordered.",
            });
        }
    }
}
function sameSurface(left, right) {
    return left.node_kind === right.node_kind && left.node_id === right.node_id;
}
function assertUniqueSurfaceReferences(surfaces, context, path) {
    if (new Set(surfaces.map((surface) => `${surface.node_kind}:${surface.node_id}`)).size !==
        surfaces.length) {
        context.addIssue({
            code: "custom",
            path,
            message: "Surface references must be unique.",
        });
    }
}
//# sourceMappingURL=index.js.map