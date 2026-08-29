import { z } from "zod";
import { DIGEST_PATTERN, ENTITY_ID_PATTERN, IDENTIFIER_PATTERN, } from "../../../modules/primitives/src/index.js";
import { agentReadinessProfileIdSchema, agentReadinessSignalCodeSchema, agentReadinessStageSchema, } from "../../agent-readiness/src/index.js";
import { assetBindingProjectionSchema, entityAssetProposalSchema } from "../../assets/src/index.js";
import { entityAuthoringSchema } from "../../authoring/src/index.js";
import { signaturePurposeSchema } from "../../authority/src/index.js";
const digestSchema = z.string().regex(DIGEST_PATTERN);
const entityIdSchema = z.string().regex(ENTITY_ID_PATTERN);
const identifierSchema = z.string().regex(IDENTIFIER_PATTERN);
const gitObjectIdSchema = z.string().regex(/^[a-f0-9]{40,64}$/);
const safeRelativePathSchema = z
    .string()
    .regex(/^[^/\\]+(?:\/[^/\\]+)*$/)
    .refine((path) => path.split("/").every((segment) => segment !== "." && segment !== ".."));
const jsonPointerSchema = z.string().regex(/^(?:|\/(?:[^~/]|~0|~1)*(?:\/(?:[^~/]|~0|~1)*)*)$/);
export const PUBLICATION_STAGES = [
    "validation",
    "evidence",
    "identity",
    "content",
    "readiness",
    "authorization",
    "publication",
    "readback",
];
export const publicationStageSchema = z.enum(PUBLICATION_STAGES);
export const publicationStageStatusSchema = z.enum([
    "pending",
    "passed",
    "failed",
    "not_required",
    "invalidated",
]);
export const publicationDiagnosticSchema = z
    .object({
    stage: publicationStageSchema,
    code: identifierSchema,
    message: z.string().min(1),
    path: z.string().optional(),
})
    .strict();
export const publicationStageResultSchema = z
    .object({
    stage: publicationStageSchema,
    status: publicationStageStatusSchema,
    diagnostics: z.array(publicationDiagnosticSchema),
})
    .strict();
export const publicationAdmissionTargetSchema = z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("git"), changed_tree: gitObjectIdSchema }).strict(),
    z
        .object({
        kind: z.literal("payload"),
        payload_digest: digestSchema,
        live_parent_release_id: digestSchema,
    })
        .strict(),
]);
export const publicationAdmissionAuthoritySchema = z
    .object({
    kind: z.enum(["asset", "evidence", "identity", "claim", "verification"]),
    root: safeRelativePathSchema,
    tree_digest: digestSchema,
})
    .strict();
export const publicationAdmissionManifestCoreSchema = z
    .object({
    admission_contract: z.literal("sourcey.publication-admission/v1"),
    target: publicationAdmissionTargetSchema,
    authorities: z.array(publicationAdmissionAuthoritySchema).min(1),
})
    .strict();
export const publicationAdmissionManifestSchema = publicationAdmissionManifestCoreSchema
    .extend({ admission_digest: digestSchema })
    .strict();
export const publicationPolicyReferenceSchema = z
    .object({ key: identifierSchema, digest: digestSchema })
    .strict();
export const expectedPublicationEntitySchema = z
    .object({ entity_id: entityIdSchema, snapshot_digest: digestSchema.nullable() })
    .strict();
export const expectedPublicationAssetBindingSchema = z
    .object({
    entity_id: entityIdSchema,
    role: z.literal("icon"),
    binding_event_id: digestSchema.nullable(),
    binding_digest: digestSchema.nullable(),
})
    .strict()
    .superRefine((value, context) => {
    if ((value.binding_event_id === null) !== (value.binding_digest === null)) {
        context.addIssue({
            code: "custom",
            path: ["binding_digest"],
            message: "Expected asset binding event and projection digests must be present together.",
        });
    }
});
export const publicationAuthorityProposalSchema = z
    .object({
    purpose: signaturePurposeSchema,
    proposal_digest: digestSchema,
})
    .strict();
export const catalogPublicationProposalCoreSchema = z
    .object({
    live_parent_release_id: digestSchema,
    candidate_entities: z.array(entityAuthoringSchema),
    candidate_assets: z.array(entityAssetProposalSchema).default([]),
    remove_entity_ids: z.array(entityIdSchema),
    expected_current_entities: z.array(expectedPublicationEntitySchema),
    expected_current_asset_bindings: z.array(expectedPublicationAssetBindingSchema).default([]),
    authority_proposals: z.array(publicationAuthorityProposalSchema),
    target_policies: z.array(publicationPolicyReferenceSchema),
    target_contract_authority_digest: digestSchema,
})
    .strict();
export const catalogPublicationProposalSchema = catalogPublicationProposalCoreSchema
    .extend({ proposal_digest: digestSchema })
    .strict();
const ingressCommon = {
    proposal_digest: digestSchema,
    semantic_input_digest: digestSchema,
};
export const gitPublicationIngressReceiptCoreSchema = z
    .object({
    ...ingressCommon,
    kind: z.literal("git"),
    repository_id: z.string().trim().min(1),
    base_commit: gitObjectIdSchema,
    head_commit: gitObjectIdSchema,
    head_tree: gitObjectIdSchema,
    changed_tree: gitObjectIdSchema,
})
    .strict();
export const authenticatedFormPublicationIngressReceiptCoreSchema = z
    .object({
    ...ingressCommon,
    kind: z.literal("authenticated_form"),
    schema_digest: digestSchema,
    payload_digest: digestSchema,
    authentication_digest: digestSchema,
    authorization_digest: digestSchema,
    operator_admission_digest: digestSchema.nullable(),
    idempotency_key: z.string().trim().min(1),
})
    .strict();
export const paidAgentPublicationIngressReceiptCoreSchema = z
    .object({
    ...ingressCommon,
    kind: z.literal("paid_agent"),
    schema_digest: digestSchema,
    payload_digest: digestSchema,
    authentication_digest: digestSchema,
    authorization_digest: digestSchema,
    request_id: z
        .string()
        .trim()
        .regex(/^[A-Za-z0-9_-]{32,128}$/u),
    idempotency_key: z.string().trim().min(1),
})
    .strict();
export const governedOpsPublicationIngressReceiptCoreSchema = z
    .object({
    ...ingressCommon,
    kind: z.literal("governed_ops"),
    command_digest: digestSchema,
    grant_digest: digestSchema,
    approval_digest: digestSchema.nullable(),
    run_receipt_digest: digestSchema,
    authentication_digest: digestSchema,
    authorization_digest: digestSchema,
    idempotency_key: z.string().trim().min(1),
})
    .strict();
export const scannerPublicationIngressReceiptCoreSchema = z
    .object({
    ...ingressCommon,
    kind: z.literal("scanner"),
    inventory_digest: digestSchema,
    run_receipt_digest: digestSchema,
    idempotency_key: z.string().trim().min(1),
})
    .strict();
export const operatorJobPublicationIngressReceiptCoreSchema = z
    .object({
    ...ingressCommon,
    kind: z.literal("operator_job"),
    job_input_digest: digestSchema,
    authority_digest: digestSchema,
    run_receipt_digest: digestSchema,
    idempotency_key: z.string().trim().min(1),
})
    .strict();
export const policyTransitionPublicationIngressReceiptCoreSchema = z
    .object({
    ...ingressCommon,
    kind: z.literal("policy_transition"),
    intent_digest: digestSchema,
    configuration_digest: digestSchema,
    idempotency_key: z.string().trim().min(1),
})
    .strict();
export const publicationIngressReceiptCoreSchema = z.discriminatedUnion("kind", [
    gitPublicationIngressReceiptCoreSchema,
    authenticatedFormPublicationIngressReceiptCoreSchema,
    paidAgentPublicationIngressReceiptCoreSchema,
    governedOpsPublicationIngressReceiptCoreSchema,
    scannerPublicationIngressReceiptCoreSchema,
    operatorJobPublicationIngressReceiptCoreSchema,
    policyTransitionPublicationIngressReceiptCoreSchema,
]);
export const publicationIngressReceiptSchema = z.discriminatedUnion("kind", [
    gitPublicationIngressReceiptCoreSchema.extend({ receipt_digest: digestSchema }).strict(),
    authenticatedFormPublicationIngressReceiptCoreSchema
        .extend({ receipt_digest: digestSchema })
        .strict(),
    paidAgentPublicationIngressReceiptCoreSchema.extend({ receipt_digest: digestSchema }).strict(),
    governedOpsPublicationIngressReceiptCoreSchema.extend({ receipt_digest: digestSchema }).strict(),
    scannerPublicationIngressReceiptCoreSchema.extend({ receipt_digest: digestSchema }).strict(),
    operatorJobPublicationIngressReceiptCoreSchema.extend({ receipt_digest: digestSchema }).strict(),
    policyTransitionPublicationIngressReceiptCoreSchema
        .extend({ receipt_digest: digestSchema })
        .strict(),
]);
/**
 * The operator-authored authorization for one exact policy transition: it
 * names the live parent it departs from and the precise policy pins the next
 * release adopts, and it is committed to the repository so the activation is
 * auditable alongside the configuration change it authorizes. The planner
 * refuses an intent whose pins differ in any way from the configured target.
 */
const policyTransitionIntentObject = z
    .object({
    intent_contract: z.literal("sourcey.policy-transition-intent/v1alpha1"),
    live_parent_release_id: digestSchema,
    target_policies: z.array(publicationPolicyReferenceSchema).min(1),
    reason: z.string().trim().min(1),
    approved_by: z.string().trim().min(1),
    approved_at: z.iso.datetime({ offset: true }),
})
    .strict();
const assertCanonicalTransitionTargets = (intent, context) => {
    const keys = intent.target_policies.map(({ key }) => key);
    const canonical = [...new Set(keys)].sort();
    if (canonical.length !== keys.length || canonical.some((key, index) => key !== keys[index])) {
        context.addIssue({
            code: "custom",
            path: ["target_policies"],
            message: "Policy transition targets must be unique and canonically ordered.",
        });
    }
};
export const policyTransitionIntentCoreSchema = policyTransitionIntentObject.superRefine(assertCanonicalTransitionTargets);
export const policyTransitionIntentSchema = policyTransitionIntentObject
    .extend({ intent_digest: digestSchema })
    .strict()
    .superRefine(assertCanonicalTransitionTargets);
export const gitPublicationCursorSchema = z
    .object({
    repository_id: z.string().trim().min(1),
    head_commit: gitObjectIdSchema,
    head_tree: gitObjectIdSchema,
})
    .strict();
export const catalogPublicationCurrentStateCoreSchema = z
    .object({
    state_contract: z.literal("sourcey.catalog-publication-state/v1alpha1"),
    live_parent_release_id: digestSchema,
    target_entity_ids: z.array(entityIdSchema),
    current_entities: z.array(entityAuthoringSchema),
    current_asset_bindings: z.array(assetBindingProjectionSchema).default([]),
    git_cursor: gitPublicationCursorSchema.nullable(),
})
    .strict();
export const catalogPublicationCurrentStateSchema = catalogPublicationCurrentStateCoreSchema
    .extend({ state_digest: digestSchema })
    .strict();
export const catalogCurrentAuthoringCutoverEntrySchema = z
    .object({
    entity_id: entityIdSchema,
    prior_document_digest: digestSchema,
    authoring: entityAuthoringSchema,
})
    .strict()
    .refine((entry) => entry.authoring.entity.entity_id === entry.entity_id, {
    message: "Current-authoring cutover identity differs from its authoring document.",
    path: ["authoring", "entity", "entity_id"],
});
export const catalogCurrentAuthoringCutoverCoreSchema = z
    .object({
    cutover_contract: z.literal("sourcey.catalog-current-authoring-cutover/v1alpha1"),
    live_release_id: digestSchema,
    from_git_cursor: gitPublicationCursorSchema,
    to_git_cursor: gitPublicationCursorSchema,
    entries: z.array(catalogCurrentAuthoringCutoverEntrySchema).min(1),
})
    .strict()
    .superRefine((cutover, context) => {
    if (cutover.from_git_cursor.repository_id !== cutover.to_git_cursor.repository_id) {
        context.addIssue({
            code: "custom",
            path: ["to_git_cursor", "repository_id"],
            message: "A current-authoring cutover cannot change repository identity.",
        });
    }
    if (cutover.from_git_cursor.head_commit === cutover.to_git_cursor.head_commit) {
        context.addIssue({
            code: "custom",
            path: ["to_git_cursor", "head_commit"],
            message: "A current-authoring cutover must advance the exact Git cursor.",
        });
    }
});
export const catalogCurrentAuthoringCutoverSchema = catalogCurrentAuthoringCutoverCoreSchema
    .extend({ cutover_digest: digestSchema })
    .strict();
export const publicationRevisionChangeSchema = z
    .object({
    kind: z.enum(["entity", "program", "offer"]),
    entity_id: entityIdSchema,
    target_id: z.string().trim().min(1),
    change: z.enum(["added", "updated", "removed"]),
    current_revision_digest: digestSchema.nullable(),
    candidate_revision_digest: digestSchema.nullable(),
    semantic_paths: z.array(jsonPointerSchema),
    source_change_ids: z.array(identifierSchema),
    parent_changed: z.boolean(),
})
    .strict();
export const publicationSourceChangeSchema = z
    .object({
    entity_id: entityIdSchema,
    source_id: identifierSchema,
    change: z.enum(["added", "updated", "removed"]),
    current_url: z.url().nullable(),
    candidate_url: z.url().nullable(),
})
    .strict();
export const publicationAssetChangeSchema = z.discriminatedUnion("change", [
    z
        .object({
        change: z.literal("upsert"),
        entity_id: entityIdSchema,
        role: z.literal("icon"),
        current_binding_event_id: digestSchema.nullable(),
        candidate_proposal_digest: digestSchema,
        current_asset_object_digest: digestSchema.nullable(),
        candidate_asset_object_digest: digestSchema,
        current_served_digest: digestSchema.nullable(),
        candidate_served_digest: digestSchema,
    })
        .strict(),
    z
        .object({
        change: z.literal("remove"),
        entity_id: entityIdSchema,
        role: z.literal("icon"),
        current_binding_event_id: digestSchema,
        current_asset_object_digest: digestSchema,
        current_served_digest: digestSchema,
    })
        .strict(),
]);
export const publicationRouteChangeSchema = z
    .object({
    kind: z.enum(["entity", "program", "offer"]),
    entity_id: entityIdSchema,
    target_id: z.string().trim().min(1),
    current_slug: z.string().nullable(),
    candidate_slug: z.string().nullable(),
    added_aliases: z.array(z.string()),
    removed_aliases: z.array(z.string()),
})
    .strict();
export const publicationContextChangeSchema = z.discriminatedUnion("kind", [
    z
        .object({
        kind: z.literal("policy"),
        key: identifierSchema,
        current_digest: digestSchema.nullable(),
        target_digest: digestSchema.nullable(),
    })
        .strict(),
    z
        .object({
        kind: z.literal("contract_authority"),
        current_digest: digestSchema,
        target_digest: digestSchema,
    })
        .strict(),
]);
export const publicationDependentRefSchema = z
    .object({ domain: identifierSchema, key: z.string().trim().min(1) })
    .strict();
export const publicationDependencyRegistrationSchema = z
    .object({
    dependent: publicationDependentRefSchema,
    dependency_keys: z.array(z.string().trim().min(1)).min(1),
})
    .strict();
/**
 * Exact factual or projection identity consumed by a maintained surface.
 * This is deliberately a closed union: editorial composition cannot smuggle
 * untyped metadata or infer readiness from a neighbouring Entity or Offer.
 */
export const surfaceDependencyReferenceSchema = z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("catalog_revision"), revision_digest: digestSchema }).strict(),
    z.object({ kind: z.literal("catalog_field_support"), support_id: digestSchema }).strict(),
    z
        .object({ kind: z.literal("research_fact_revision"), fact_revision_digest: digestSchema })
        .strict(),
    z
        .object({ kind: z.literal("relation_fact_revision"), fact_revision_digest: digestSchema })
        .strict(),
    z.object({ kind: z.literal("query_result"), result_digest: digestSchema }).strict(),
    z
        .object({
        kind: z.literal("agent_readiness_profile_revision"),
        agent_readiness_profile_id: agentReadinessProfileIdSchema,
        profile_revision_digest: digestSchema,
    })
        .strict(),
    z
        .object({
        kind: z.literal("agent_readiness_signal_conclusion"),
        agent_readiness_profile_id: agentReadinessProfileIdSchema,
        stage: agentReadinessStageSchema,
        signal_code: agentReadinessSignalCodeSchema,
        conclusion_digest: digestSchema,
    })
        .strict(),
    z
        .object({
        kind: z.literal("agent_readiness_stage_projection"),
        agent_readiness_profile_id: agentReadinessProfileIdSchema,
        stage: agentReadinessStageSchema,
        stage_projection_digest: digestSchema,
    })
        .strict(),
    z
        .object({
        kind: z.literal("agent_readiness_grade_projection"),
        agent_readiness_profile_id: agentReadinessProfileIdSchema,
        grade_projection_digest: digestSchema,
    })
        .strict(),
    z
        .object({
        kind: z.literal("agent_readiness_offer_relation_revision"),
        relation_id: identifierSchema,
        agent_readiness_profile_id: agentReadinessProfileIdSchema,
        offer_id: identifierSchema,
        relation_revision_digest: digestSchema,
    })
        .strict(),
]);
export const publicationRecompositionActionSchema = z.enum([
    "refresh",
    "reinterpret",
    "reassess",
    "rebind",
    "reproject",
    "withdraw",
]);
export const publicationRecompositionWorkCountsSchema = z
    .object({
    capture: z.number().int().nonnegative(),
    interpretation: z.number().int().nonnegative(),
    signal: z.number().int().nonnegative(),
    profile: z.number().int().nonnegative(),
    projection: z.number().int().nonnegative(),
})
    .strict();
export const publicationRecompositionNodeSchema = z
    .object({
    dependent: publicationDependentRefSchema,
    dependency_keys: z.array(z.string().trim().min(1)).min(1),
    output_dependency_key: z.string().trim().min(1),
    current_output_digest: digestSchema.nullable(),
    candidate_output_digest: digestSchema.nullable(),
    action: publicationRecompositionActionSchema,
    work: publicationRecompositionWorkCountsSchema,
})
    .strict()
    .superRefine((value, context) => {
    if ((value.action === "withdraw") !== (value.candidate_output_digest === null)) {
        context.addIssue({
            code: "custom",
            path: ["candidate_output_digest"],
            message: "Exactly a withdrawal has no candidate semantic output.",
        });
    }
    if (value.current_output_digest === null && value.candidate_output_digest === null) {
        context.addIssue({
            code: "custom",
            path: ["current_output_digest"],
            message: "A recomposition node must have a current or candidate semantic output.",
        });
    }
});
export const catalogPublicationChangeSetCoreSchema = z
    .object({
    proposal_digest: digestSchema,
    live_parent_release_id: digestSchema,
    current_context_digest: digestSchema,
    target_context_digest: digestSchema,
    revision_changes: z.array(publicationRevisionChangeSchema),
    source_changes: z.array(publicationSourceChangeSchema),
    asset_changes: z.array(publicationAssetChangeSchema).default([]),
    route_changes: z.array(publicationRouteChangeSchema),
    context_changes: z.array(publicationContextChangeSchema),
    public_authoring_paths: z.array(z.string().trim().min(1)),
    changed_dependency_keys: z.array(z.string().trim().min(1)),
    impact_index_digest: digestSchema,
    dependency_lookups: z.number().int().nonnegative(),
    affected_dependents: z.array(publicationDependentRefSchema),
    unaffected_dependents_proof_digest: digestSchema,
    required_authorities: z.array(signaturePurposeSchema),
})
    .strict();
export const catalogPublicationChangeSetSchema = catalogPublicationChangeSetCoreSchema
    .extend({ change_set_digest: digestSchema })
    .strict();
/** Immutable composer input. It carries only the targeted live slice, never a Catalog copy. */
export const catalogPublicationAdmissionInputSchema = z
    .object({
    proposal: catalogPublicationProposalSchema,
    change_set: catalogPublicationChangeSetSchema,
    ingress_receipts: z.array(publicationIngressReceiptSchema).min(1),
    current_entities: z.array(entityAuthoringSchema),
    current_asset_bindings: z.array(assetBindingProjectionSchema).default([]),
})
    .strict();
//# sourceMappingURL=index.js.map