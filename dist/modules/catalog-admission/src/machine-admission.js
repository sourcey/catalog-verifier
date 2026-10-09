import { DIGEST_PATTERN, digest, IDENTIFIER_PATTERN } from "provenry/primitives";
import { z } from "zod";
import { companyAdmissionBindingSchema } from "../../../contracts/company-standing/src/index.js";
import { evidenceCaptureMethodSchema } from "../../../contracts/evidence/src/index.js";
import { coveragePolicySchema } from "../../../contracts/policies/src/index.js";
import { entityRevisionSchema, offerRevisionSchema, programRevisionSchema, } from "../../../contracts/revisions/src/index.js";
import { ENTITY_ID_PATTERN, OFFER_ID_PATTERN, PROGRAM_ID_PATTERN, } from "../../catalog-primitives/src/index.js";
import { materialClaimPlanSchema, materialClaimResultSchema } from "../../provenance/src/index.js";
const digestSchema = z.string().regex(DIGEST_PATTERN);
const identifierSchema = z.string().regex(IDENTIFIER_PATTERN);
const gitObjectSchema = z.string().regex(/^[a-f0-9]{40,64}$/u);
const repositorySchema = z.string().regex(/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/u);
export const entityPathSchema = z
    .string()
    .regex(/^entities\/[a-z0-9]{2}\/[a-z0-9]+(?:-[a-z0-9]+)*\.yaml$/u);
export const startupCreditsMachineAdmissionPolicyCoreSchema = z
    .object({
    policy_contract: z.literal("sourcey.startup-credits-machine-admission-policy/v1alpha1"),
    policy_id: identifierSchema,
    coverage_policy_digest: digestSchema,
    scope: z
        .object({
        added_entity_files: z.literal(1),
        added_entities: z.literal(1),
        maximum_added_programs: z.literal(1),
        added_offers: z.literal(1),
        offer_evidence_basis: z.literal("observed"),
        unattended_asset_kind: z.literal("sourcey_monogram"),
    })
        .strict(),
})
    .strict();
export const startupCreditsMachineAdmissionPolicySchema = startupCreditsMachineAdmissionPolicyCoreSchema.extend({ policy_digest: digestSchema }).strict();
const changedSubjectSchema = z.discriminatedUnion("kind", [
    z
        .object({
        kind: z.literal("entity"),
        change: z.enum(["added", "updated", "removed"]),
        entity_id: z.string().regex(ENTITY_ID_PATTERN),
        revision_digest: digestSchema.nullable(),
    })
        .strict(),
    z
        .object({
        kind: z.literal("program"),
        change: z.enum(["added", "updated", "removed"]),
        entity_id: z.string().regex(ENTITY_ID_PATTERN),
        program_id: z.string().regex(PROGRAM_ID_PATTERN),
        revision_digest: digestSchema.nullable(),
    })
        .strict(),
    z
        .object({
        kind: z.literal("offer"),
        change: z.enum(["added", "updated", "removed"]),
        entity_id: z.string().regex(ENTITY_ID_PATTERN),
        program_id: z.string().regex(PROGRAM_ID_PATTERN).optional(),
        offer_id: z.string().regex(OFFER_ID_PATTERN),
        revision_digest: digestSchema.nullable(),
        evidence_basis: z.enum(["observed", "declared"]),
    })
        .strict(),
]);
const sourceEvaluationSchema = z
    .object({
    subject_revision_digest: digestSchema,
    source_id: identifierSchema,
    requested_url: z.url({ protocol: /^https$/u }),
    final_url: z.url({ protocol: /^https$/u }).nullable(),
    authority: z.enum(["canonical", "inert", "ambiguous"]),
    publisher_entity_id: z.string().regex(ENTITY_ID_PATTERN).nullable(),
    capture_status: z.enum([
        "captured",
        "not_attempted",
        "retryable_failure",
        "terminal_failure",
        "anomaly",
    ]),
    capture_method: evidenceCaptureMethodSchema.nullable(),
    capture_policy_digest: digestSchema.nullable(),
    failure_receipt_digest: digestSchema.nullable(),
    response_status_code: z.number().int().min(100).max(599).nullable(),
    availability: z.enum(["public", "restricted"]).nullable(),
    capture_digest: digestSchema.nullable(),
    normalized_object_digest: digestSchema.nullable(),
})
    .strict()
    .superRefine((value, context) => {
    const captured = value.capture_status === "captured";
    const attempted = value.capture_status !== "not_attempted";
    const failed = attempted && !captured;
    if (captured !==
        (value.final_url !== null &&
            value.response_status_code !== null &&
            value.availability !== null &&
            value.capture_digest !== null &&
            value.normalized_object_digest !== null)) {
        context.addIssue({
            code: "custom",
            message: "Captured sources require complete final URL and object digests; failures carry none.",
        });
    }
    if (attempted !== (value.capture_method !== null && value.capture_policy_digest !== null) ||
        failed !== (value.failure_receipt_digest !== null)) {
        context.addIssue({
            code: "custom",
            message: "Every attempted source binds its method and policy; exactly a failed attempt binds a failure receipt.",
        });
    }
    if ((value.authority === "canonical") !== (value.publisher_entity_id !== null) ||
        (value.capture_status === "not_attempted" && value.authority !== "inert")) {
        context.addIssue({
            code: "custom",
            message: "Canonical sources bind one exact publisher Entity; only inert sources may remain uncaptured.",
        });
    }
});
const conflictSchema = z
    .object({
    kind: z.enum([
        "domain",
        "identity",
        "slug",
        "name",
        "url",
        "program",
        "offer",
        "semantic_offer",
        "open_pull_request",
        "pending_git_lineage",
        "pending_submission",
    ]),
    strength: z.enum(["exact", "ambiguous"]),
    key_digest: digestSchema,
    target_references: z.array(z.string().min(1).max(240)).min(1).max(32),
    source_references: z.array(z.string().min(1).max(400)).min(1).max(32),
})
    .strict();
const claimEvaluationSchema = z
    .object({
    plan: materialClaimPlanSchema,
    results: z.array(materialClaimResultSchema).min(1).max(512),
})
    .strict();
export const startupCreditsMachineAdmissionInputCoreSchema = z
    .object({
    evaluation_contract: z.literal("sourcey.startup-credits-machine-admission-input/v1alpha1"),
    repository: repositorySchema,
    pull_request_number: z.number().int().positive(),
    base_sha: gitObjectSchema,
    head_sha: gitObjectSchema,
    change_tree: gitObjectSchema,
    live_source_commit: gitObjectSchema,
    live_parent_release_id: digestSchema,
    policy: startupCreditsMachineAdmissionPolicySchema,
    coverage_policy: coveragePolicySchema,
    evaluator_id: identifierSchema,
    evaluator_digest: digestSchema,
    changed_files: z
        .array(z
        .object({
        path: z.string().min(1).max(512),
        change: z.enum(["added", "updated", "removed"]),
    })
        .strict())
        .min(1)
        .max(32),
    changed_subjects: z.array(changedSubjectSchema).min(1).max(8),
    candidate_revisions: z
        .array(z.union([entityRevisionSchema, programRevisionSchema, offerRevisionSchema]))
        .min(1)
        .max(8),
    claim_evaluations: z.array(claimEvaluationSchema).min(1).max(8),
    sources: z.array(sourceEvaluationSchema).min(1).max(32),
    conflicts: z.array(conflictSchema).max(64),
    /** A new company's standing binding, from Sourcey's company gate; absent in earlier inputs. */
    company_admission: companyAdmissionBindingSchema.optional(),
    asset: z
        .object({
        kind: z.enum(["sourcey_monogram", "vendor_asset"]),
        status: z.enum(["supported", "unsupported", "unresolved"]),
        candidate_digest: digestSchema.nullable(),
        capture_digest: digestSchema.nullable(),
        served_digest: digestSchema.nullable(),
        transform_profile_digest: digestSchema.nullable(),
        fallback_reason_digest: digestSchema.nullable(),
    })
        .strict()
        .superRefine((value, context) => {
        const commonComplete = [
            value.candidate_digest,
            value.capture_digest,
            value.served_digest,
            value.transform_profile_digest,
        ].every((candidate) => candidate !== null);
        const sourceyComplete = commonComplete && value.fallback_reason_digest !== null;
        const vendorComplete = commonComplete && value.fallback_reason_digest === null;
        const complete = value.status === "supported" &&
            (value.kind === "sourcey_monogram" ? sourceyComplete : vendorComplete);
        const empty = [
            value.candidate_digest,
            value.capture_digest,
            value.served_digest,
            value.transform_profile_digest,
            value.fallback_reason_digest,
        ].every((candidate) => candidate === null);
        if (!complete && !empty) {
            context.addIssue({
                code: "custom",
                message: "A supported asset requires its exact candidate, capture, served and transform closure; only a Sourcey monogram binds a fallback reason.",
            });
        }
        if (value.status === "supported" && !complete) {
            context.addIssue({
                code: "custom",
                message: "A supported asset requires a complete authority candidate.",
            });
        }
        if (value.status !== "supported" && !empty) {
            context.addIssue({
                code: "custom",
                message: "An unresolved or unsupported asset cannot claim candidate authority.",
            });
        }
    }),
})
    .strict();
export const startupCreditsMachineAdmissionInputSchema = startupCreditsMachineAdmissionInputCoreSchema.extend({ input_digest: digestSchema }).strict();
const startupCreditsAdmissionCandidateFieldsSchema = startupCreditsMachineAdmissionInputCoreSchema
    .pick({
    live_parent_release_id: true,
    policy: true,
    coverage_policy: true,
    evaluator_id: true,
    evaluator_digest: true,
    changed_files: true,
    changed_subjects: true,
    candidate_revisions: true,
    claim_evaluations: true,
    sources: true,
    conflicts: true,
    company_admission: true,
    asset: true,
})
    .strict();
export const startupCreditsAdmissionCandidateInputCoreSchema = startupCreditsAdmissionCandidateFieldsSchema
    .extend({
    candidate_contract: z.literal("sourcey.startup-credits-admission-candidate-input/v1alpha1"),
})
    .strict();
export const startupCreditsAdmissionCandidateInputSchema = startupCreditsAdmissionCandidateInputCoreSchema
    .extend({ candidate_digest: digestSchema })
    .strict();
export const startupCreditsMachineAdmissionOutcomeSchema = z.enum([
    "auto_admissible",
    "needs_revision",
    "temporarily_unavailable",
    "human_review_required",
    "rejected",
]);
export const startupCreditsMachineAdmissionReasonSchema = z.enum([
    "scope_requires_one_added_entity_file",
    "scope_requires_one_new_entity",
    "scope_requires_zero_or_one_new_program",
    "scope_requires_one_new_offer",
    "scope_unsupported_change_shape",
    "declared_offer_not_machine_admissible",
    "entity_summary_required",
    "program_summary_required",
    "source_capture_retryable",
    "source_capture_failed",
    "source_capture_anomaly",
    "source_http_status_not_success",
    "source_not_public",
    "capture_method_not_unattended",
    "source_authority_ambiguous",
    "supported_claim_uses_inert_source",
    "claim_unsupported",
    "claim_unresolved",
    "claim_contradicted",
    "exact_conflict",
    "ambiguous_conflict",
    "company_verification_required",
    "company_correction_required",
    "company_standing_unavailable",
    "safe_asset_required",
    "vendor_asset_requires_authority_review",
]);
export const startupCreditsMachineAdmissionResultCoreSchema = z
    .object({
    result_contract: z.literal("sourcey.startup-credits-machine-admission-result/v1alpha1"),
    input_digest: digestSchema,
    outcome: startupCreditsMachineAdmissionOutcomeSchema,
    reason_codes: z.array(startupCreditsMachineAdmissionReasonSchema),
    retryable: z.boolean(),
    claim_plan_digests: z.array(digestSchema).min(1).max(3),
    claim_result_digests: z.array(digestSchema).min(1).max(4096),
})
    .strict();
export const startupCreditsMachineAdmissionResultSchema = startupCreditsMachineAdmissionResultCoreSchema.extend({ result_digest: digestSchema }).strict();
export const startupCreditsAdmissionCandidateResultCoreSchema = z
    .object({
    result_contract: z.literal("sourcey.startup-credits-admission-candidate-result/v1alpha1"),
    candidate_digest: digestSchema,
    outcome: startupCreditsMachineAdmissionOutcomeSchema,
    reason_codes: z.array(startupCreditsMachineAdmissionReasonSchema),
    retryable: z.boolean(),
    claim_plan_digests: z.array(digestSchema).min(1).max(3),
    claim_result_digests: z.array(digestSchema).min(1).max(4096),
})
    .strict();
export const startupCreditsAdmissionCandidateResultSchema = startupCreditsAdmissionCandidateResultCoreSchema.extend({ result_digest: digestSchema }).strict();
export const startupCreditsAdmissionCandidateReceiptCoreSchema = z
    .object({
    receipt_contract: z.literal("sourcey.startup-credits-admission-candidate-receipt/v1alpha1"),
    candidate_digest: digestSchema,
    result_digest: digestSchema,
    policy_id: identifierSchema,
    policy_digest: digestSchema,
    evaluator_id: identifierSchema,
    evaluator_digest: digestSchema,
})
    .strict();
export const startupCreditsAdmissionCandidateReceiptSchema = startupCreditsAdmissionCandidateReceiptCoreSchema
    .extend({ receipt_digest: digestSchema })
    .strict();
export const startupCreditsMachineAdmissionReceiptCoreSchema = z
    .object({
    receipt_contract: z.literal("sourcey.startup-credits-machine-admission-receipt/v1alpha1"),
    input_digest: digestSchema,
    result_digest: digestSchema,
    policy_id: identifierSchema,
    policy_digest: digestSchema,
    evaluator_id: identifierSchema,
    evaluator_digest: digestSchema,
})
    .strict();
export const startupCreditsMachineAdmissionReceiptSchema = startupCreditsMachineAdmissionReceiptCoreSchema.extend({ receipt_digest: digestSchema }).strict();
export function createStartupCreditsMachineAdmissionInput(input) {
    const core = startupCreditsMachineAdmissionInputCoreSchema.parse(input);
    return startupCreditsMachineAdmissionInputSchema.parse({ ...core, input_digest: digest(core) });
}
/**
 * Bind one admission candidate independently of Git, browser, API or paid-work
 * transport. Transport adapters add their own immutable authority coordinates;
 * they never change this candidate's evidence, conflicts, policy or outcome.
 */
export function createStartupCreditsAdmissionCandidateInput(input) {
    const core = startupCreditsAdmissionCandidateInputCoreSchema.parse(input);
    return startupCreditsAdmissionCandidateInputSchema.parse({
        ...core,
        candidate_digest: digest(core),
    });
}
//# sourceMappingURL=machine-admission.js.map