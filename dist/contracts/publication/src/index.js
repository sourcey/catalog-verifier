import { digest as canonicalDigest, DIGEST_PATTERN, IDENTIFIER_PATTERN } from "provenry/primitives";
import { z } from "zod";
import { ENTITY_ID_PATTERN } from "../../../modules/catalog-primitives/src/index.js";
import { assetBindingProjectionSchema, entityAssetProposalSchema } from "../../assets/src/index.js";
import { entityAuthoringSchema } from "../../authoring/src/index.js";
import { signaturePurposeSchema } from "../../authority/src/index.js";
const digestSchema = z.string().regex(DIGEST_PATTERN);
const entityIdSchema = z.string().regex(ENTITY_ID_PATTERN);
const identifierSchema = z.string().regex(IDENTIFIER_PATTERN);
const gitObjectIdSchema = z.string().regex(/^[a-f0-9]{40,64}$/);
export const catalogGitSyncResultSchema = z.discriminatedUnion("status", [
    z
        .object({
        status: z.enum(["up_to_date", "no_changes", "awaiting_admission"]),
        head_commit: gitObjectIdSchema,
    })
        .strict(),
    z
        .object({
        status: z.enum(["published", "converged_elsewhere"]),
        head_commit: gitObjectIdSchema,
        release_id: digestSchema,
    })
        .strict(),
]);
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
const publicationStageSchema = z.enum(PUBLICATION_STAGES);
const publicationStageStatusSchema = z.enum([
    "pending",
    "passed",
    "failed",
    "not_required",
    "invalidated",
]);
const publicationDiagnosticSchema = z
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
/** Private recovery binding, not admission or a live-release selector. The
 * archive remains in ordinary immutable artifact storage; the submission owner
 * retains this exact association before any publication effect. */
export const catalogSubmissionPublicationReferenceCoreSchema = z
    .object({
    work_item_digest: digestSchema,
    release_id: digestSchema,
    release_sequence: z.number().int().positive(),
    parent_release_id: digestSchema,
    bundle_digest: digestSchema,
    verifier_digest: digestSchema,
    archive_digest: digestSchema,
    archive_bytes: z.number().int().positive(),
    archive_expanded_bytes: z.number().int().positive(),
    archive_file_count: z.number().int().positive(),
})
    .strict();
export const catalogSubmissionPublicationReferenceSchema = catalogSubmissionPublicationReferenceCoreSchema
    .extend({ reference_digest: digestSchema })
    .strict()
    .superRefine(({ reference_digest: referenceDigest, ...core }, context) => {
    if (canonicalDigest(core) !== referenceDigest)
        context.addIssue({
            code: "custom",
            path: ["reference_digest"],
            message: "Submission publication reference differs from its exact retained binding.",
        });
});
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
const publicationAdmissionAuthoritySchema = z
    .object({
    kind: z.enum(["asset", "assurance", "evidence", "identity", "claim", "readiness"]),
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
const expectedPublicationAssetBindingSchema = z
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
const publicationAuthorityProposalSchema = z
    .object({
    purpose: signaturePurposeSchema,
    proposal_digest: digestSchema,
    dependency_keys: z.array(z.string().min(1)),
    // Public canonical input committed by this authority, when its semantic
    // payload is not already carried by candidate_entities/candidate_assets.
    public_input_digest: digestSchema.optional(),
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
const gitPublicationIngressReceiptCoreSchema = z
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
const authenticatedFormPublicationIngressReceiptCoreSchema = z
    .object({
    ...ingressCommon,
    kind: z.literal("authenticated_form"),
    submission_work_item_digest: digestSchema,
    schema_digest: digestSchema,
    payload_digest: digestSchema,
    authentication_digest: digestSchema,
    authorization_digest: digestSchema,
    operator_admission_digest: digestSchema.nullable(),
    idempotency_key: z.string().trim().min(1),
})
    .strict();
const paidAgentPublicationIngressReceiptCoreSchema = z
    .object({
    ...ingressCommon,
    kind: z.literal("paid_agent"),
    submission_work_item_digest: digestSchema,
    schema_digest: digestSchema,
    payload_digest: digestSchema,
    authentication_digest: digestSchema,
    authorization_digest: digestSchema,
    operator_admission_digest: digestSchema.nullable(),
    request_id: z
        .string()
        .trim()
        .regex(/^[A-Za-z0-9_-]{32,128}$/u),
    idempotency_key: z.string().trim().min(1),
})
    .strict();
const governedOpsPublicationIngressReceiptCoreSchema = z
    .object({
    ...ingressCommon,
    kind: z.literal("governed_ops"),
    submission_work_item_digest: digestSchema.nullable(),
    command_digest: digestSchema,
    grant_digest: digestSchema,
    approval_digest: digestSchema.nullable(),
    run_receipt_digest: digestSchema,
    authentication_digest: digestSchema,
    authorization_digest: digestSchema,
    idempotency_key: z.string().trim().min(1),
})
    .strict();
const scannerPublicationIngressReceiptCoreSchema = z
    .object({
    ...ingressCommon,
    kind: z.literal("scanner"),
    inventory_digest: digestSchema,
    run_receipt_digest: digestSchema,
    idempotency_key: z.string().trim().min(1),
})
    .strict();
const operatorJobPublicationIngressReceiptCoreSchema = z
    .object({
    ...ingressCommon,
    kind: z.literal("operator_job"),
    job_input_digest: digestSchema,
    authority_digest: digestSchema,
    run_receipt_digest: digestSchema,
    idempotency_key: z.string().trim().min(1),
})
    .strict();
const policyTransitionPublicationIngressReceiptCoreSchema = z
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
 * The pins may be empty only when the contract authority itself moves: a new
 * builder and verifier re-project the same admitted facts, and that release is
 * authorized the same way, by a committed intent naming the live parent.
 */
const policyTransitionIntentObject = z
    .object({
    intent_contract: z.literal("sourcey.policy-transition-intent/v1alpha1"),
    live_parent_release_id: digestSchema,
    target_policies: z.array(publicationPolicyReferenceSchema),
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
const gitPublicationCursorSchema = z
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
const publicationRevisionChangeSchema = z
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
const publicationSourceChangeSchema = z
    .object({
    entity_id: entityIdSchema,
    source_id: identifierSchema,
    change: z.enum(["added", "updated", "removed"]),
    current_url: z.url().nullable(),
    candidate_url: z.url().nullable(),
})
    .strict();
const publicationAssetChangeSchema = z.discriminatedUnion("change", [
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
const publicationRouteChangeSchema = z
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
const publicationContextChangeSchema = z.discriminatedUnion("kind", [
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
const publicationDependentRefSchema = z
    .object({ domain: identifierSchema, key: z.string().trim().min(1) })
    .strict();
export const publicationDependencyRegistrationSchema = z
    .object({
    dependent: publicationDependentRefSchema,
    dependency_keys: z.array(z.string().trim().min(1)).min(1),
})
    .strict();
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
/** Private exact-parent index read; these are the planner's existing selectors. */
export const catalogPublicationImpactSelectionSchema = catalogPublicationChangeSetCoreSchema.pick({
    live_parent_release_id: true,
    changed_dependency_keys: true,
});
/** One ingress retains its own plan. A combined release never broadens its authority. */
const catalogPublicationIngressSchema = z
    .object({
    proposal: catalogPublicationProposalSchema,
    change_set: catalogPublicationChangeSetSchema,
    ingress_receipt: publicationIngressReceiptSchema,
})
    .strict();
export const catalogPublicationCompositionSchema = z
    .object({
    proposal: catalogPublicationProposalSchema,
    change_set: catalogPublicationChangeSetSchema,
    ingresses: z.array(catalogPublicationIngressSchema).min(1),
})
    .strict();
/** Immutable composer input. It carries only the targeted live slice, never a Catalog copy. */
export const catalogPublicationAdmissionInputSchema = catalogPublicationCompositionSchema
    .extend({
    current_entities: z.array(entityAuthoringSchema),
    current_asset_bindings: z.array(assetBindingProjectionSchema).default([]),
})
    .strict();
//# sourceMappingURL=index.js.map