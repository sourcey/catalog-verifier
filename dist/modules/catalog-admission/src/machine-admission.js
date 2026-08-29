import { z } from "zod";
import { evidenceCaptureMethodSchema } from "../../../contracts/evidence/src/index.js";
import { assertCurrentCoveragePolicyClaimClosure, coveragePolicyCoreSchema, coveragePolicySchema, } from "../../../contracts/policies/src/index.js";
import { entityRevisionSchema, offerRevisionSchema, programRevisionSchema, } from "../../../contracts/revisions/src/index.js";
import { compareCanonicalStrings, DIGEST_PATTERN, digest, ENTITY_ID_PATTERN, IDENTIFIER_PATTERN, OFFER_ID_PATTERN, PROGRAM_ID_PATTERN, } from "../../primitives/src/index.js";
import { deriveMaterialClaimPlan, materialClaimPlanSchema, materialClaimResultSchema, verifyMaterialClaimEvaluation, } from "../../provenance/src/index.js";
const digestSchema = z.string().regex(DIGEST_PATTERN);
const identifierSchema = z.string().regex(IDENTIFIER_PATTERN);
const gitObjectSchema = z.string().regex(/^[a-f0-9]{40,64}$/u);
const repositorySchema = z.string().regex(/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/u);
const entityPathSchema = z
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
        const complete = [
            value.candidate_digest,
            value.capture_digest,
            value.served_digest,
            value.transform_profile_digest,
            value.fallback_reason_digest,
        ].every((candidate) => candidate !== null);
        if ((value.kind === "sourcey_monogram" && value.status === "supported") !== complete) {
            context.addIssue({
                code: "custom",
                message: "Exactly a supported Sourcey monogram requires the complete pre-decision candidate closure.",
            });
        }
    }),
})
    .strict();
export const startupCreditsMachineAdmissionInputSchema = startupCreditsMachineAdmissionInputCoreSchema.extend({ input_digest: digestSchema }).strict();
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
export function createStartupCreditsMachineAdmissionPolicy(input) {
    const core = startupCreditsMachineAdmissionPolicyCoreSchema.parse(input);
    return startupCreditsMachineAdmissionPolicySchema.parse({
        ...core,
        policy_digest: digest(core),
    });
}
/** One total pure policy over exact, already verified domain results. */
export function evaluateStartupCreditsMachineAdmission(input) {
    const parsed = startupCreditsMachineAdmissionInputSchema.parse(input);
    const { input_digest: inputDigest, ...inputCore } = parsed;
    if (digest(startupCreditsMachineAdmissionInputCoreSchema.parse(inputCore)) !== inputDigest) {
        throw new Error("Startup Credits machine-admission input digest does not match its content.");
    }
    verifyMachineAdmissionPolicies(parsed);
    const evaluations = parsed.claim_evaluations.map((evaluation) => verifyMaterialClaimEvaluation(evaluation));
    assertClosedEvaluationInput(parsed, evaluations);
    const reasons = evaluateReasons(parsed, evaluations);
    const outcome = outcomeForReasons(reasons);
    const resultCore = startupCreditsMachineAdmissionResultCoreSchema.parse({
        result_contract: "sourcey.startup-credits-machine-admission-result/v1alpha1",
        input_digest: inputDigest,
        outcome,
        reason_codes: reasons,
        retryable: outcome === "temporarily_unavailable",
        claim_plan_digests: evaluations
            .map(({ plan }) => plan.plan_digest)
            .sort(compareCanonicalStrings),
        claim_result_digests: evaluations
            .flatMap(({ results }) => results.map(({ result_digest: resultDigest }) => resultDigest))
            .sort(compareCanonicalStrings),
    });
    const result = startupCreditsMachineAdmissionResultSchema.parse({
        ...resultCore,
        result_digest: digest(resultCore),
    });
    const receiptCore = startupCreditsMachineAdmissionReceiptCoreSchema.parse({
        receipt_contract: "sourcey.startup-credits-machine-admission-receipt/v1alpha1",
        input_digest: inputDigest,
        result_digest: result.result_digest,
        policy_id: parsed.policy.policy_id,
        policy_digest: parsed.policy.policy_digest,
        evaluator_id: parsed.evaluator_id,
        evaluator_digest: parsed.evaluator_digest,
    });
    const receipt = startupCreditsMachineAdmissionReceiptSchema.parse({
        ...receiptCore,
        receipt_digest: digest(receiptCore),
    });
    return {
        input: parsed,
        result,
        receipt,
        decisionBasis: {
            kind: "policy",
            policy_id: parsed.policy.policy_id,
            policy_digest: parsed.policy.policy_digest,
            evaluator_id: parsed.evaluator_id,
            evaluator_digest: parsed.evaluator_digest,
            input_digest: parsed.input_digest,
            execution_receipt_digest: receipt.receipt_digest,
        },
    };
}
function assertClosedEvaluationInput(input, evaluations) {
    const sources = new Map(input.sources.map((source) => [sourceKey(source), source]));
    if (sources.size !== input.sources.length) {
        throw new Error("Machine-admission sources must be unique by subject revision and source_id.");
    }
    const planSubjects = evaluations.map(({ plan }) => subjectKey(plan));
    const changedSubjects = input.changed_subjects
        .filter(({ change }) => change !== "removed")
        .map(subjectKeyFromChange);
    if (new Set(planSubjects).size !== planSubjects.length ||
        [...planSubjects].sort().join("\0") !== [...changedSubjects].sort().join("\0")) {
        throw new Error("Material claim plans do not close the exact changed subject revisions.");
    }
    const revisions = new Map(input.candidate_revisions.map((revision) => [subjectKeyFromRevision(revision), revision]));
    if (revisions.size !== input.candidate_revisions.length ||
        [...revisions.keys()].sort().join("\0") !== [...changedSubjects].sort().join("\0")) {
        throw new Error("Candidate revisions do not close the exact changed subject revisions.");
    }
    for (const evaluation of evaluations) {
        const revision = revisions.get(subjectKey(evaluation.plan));
        if (!revision)
            throw new Error("Material claim plan has no exact candidate revision.");
        const derived = deriveMaterialClaimPlan({
            revision,
            requirements: revision.revision_contract === "sourcey.entity-revision/v1alpha1"
                ? input.coverage_policy.entity_requirements
                : revision.revision_contract === "sourcey.program-revision/v1alpha1"
                    ? input.coverage_policy.program_requirements
                    : input.coverage_policy.offer_requirements,
            coveragePolicyDigest: input.coverage_policy.policy_digest,
        });
        if (derived.plan_digest !== evaluation.plan.plan_digest) {
            throw new Error("Material claim plan is not the exact derivation of its candidate revision.");
        }
    }
    for (const { plan, results } of evaluations) {
        for (const result of results) {
            for (const binding of result.bindings) {
                const source = sources.get(sourceKey({
                    subject_revision_digest: plan.subject.revision_digest,
                    source_id: binding.source_id,
                }));
                if (!source)
                    throw new Error(`Material claim binding names unknown source ${binding.source_id}.`);
                if (source.capture_status !== "captured" ||
                    source.capture_digest !== binding.capture_digest ||
                    source.normalized_object_digest !== binding.normalized_object_digest) {
                    throw new Error("Material claim binding differs from its exact captured source objects.");
                }
            }
        }
    }
}
function verifyMachineAdmissionPolicies(input) {
    const { policy_digest: policyDigest, ...policyCore } = input.policy;
    if (digest(startupCreditsMachineAdmissionPolicyCoreSchema.parse(policyCore)) !== policyDigest) {
        throw new Error("Machine-admission policy is not content-addressed correctly.");
    }
    const coveragePolicy = assertCurrentCoveragePolicyClaimClosure(input.coverage_policy);
    const { policy_digest: coverageDigest, ...coverageCore } = coveragePolicy;
    if (digest(coveragePolicyCoreSchema.parse(coverageCore)) !== coverageDigest ||
        input.policy.coverage_policy_digest !== coverageDigest) {
        throw new Error("Machine-admission policy does not bind the exact current coverage policy.");
    }
}
function evaluateReasons(input, evaluations) {
    const reasons = new Set();
    if (input.changed_files.length !== 1 ||
        input.changed_files[0]?.change !== "added" ||
        !entityPathSchema.safeParse(input.changed_files[0]?.path).success) {
        reasons.add("scope_requires_one_added_entity_file");
    }
    const entities = input.changed_subjects.filter(({ kind }) => kind === "entity");
    const programs = input.changed_subjects.filter(({ kind }) => kind === "program");
    const offers = input.changed_subjects.filter(({ kind }) => kind === "offer");
    if (entities.length !== 1 || entities[0]?.change !== "added") {
        reasons.add("scope_requires_one_new_entity");
    }
    if (programs.length > 1 || programs.some(({ change }) => change !== "added")) {
        reasons.add("scope_requires_zero_or_one_new_program");
    }
    if (offers.length !== 1 || offers[0]?.change !== "added") {
        reasons.add("scope_requires_one_new_offer");
    }
    if (offers.some((offer) => offer.kind === "offer" && offer.evidence_basis === "declared")) {
        reasons.add("declared_offer_not_machine_admissible");
    }
    const entityPlan = evaluations.find(({ plan }) => plan.subject.subject_type === "entity")?.plan;
    if (!entityPlan?.claims.some(({ path }) => path === "/summary")) {
        reasons.add("entity_summary_required");
    }
    const programPlan = evaluations.find(({ plan }) => plan.subject.subject_type === "program")?.plan;
    if (programs.length === 1 && !programPlan?.claims.some(({ path }) => path === "/summary")) {
        reasons.add("program_summary_required");
    }
    for (const source of input.sources) {
        if (source.capture_status === "retryable_failure")
            reasons.add("source_capture_retryable");
        if (source.capture_status === "terminal_failure")
            reasons.add("source_capture_failed");
        if (source.capture_status === "anomaly")
            reasons.add("source_capture_anomaly");
        if (source.response_status_code !== null &&
            (source.response_status_code < 200 || source.response_status_code >= 300)) {
            reasons.add("source_http_status_not_success");
        }
        if (source.availability === "restricted")
            reasons.add("source_not_public");
        if (source.capture_method !== null &&
            source.capture_method !== "http" &&
            source.capture_method !== "headless") {
            reasons.add("capture_method_not_unattended");
        }
        if (source.authority === "ambiguous")
            reasons.add("source_authority_ambiguous");
    }
    const sources = new Map(input.sources.map((source) => [sourceKey(source), source]));
    for (const { plan, results } of evaluations) {
        for (const result of results) {
            if (result.status === "unsupported")
                reasons.add("claim_unsupported");
            if (result.status === "unresolved")
                reasons.add("claim_unresolved");
            if (result.status === "contradicted")
                reasons.add("claim_contradicted");
            if (result.status === "supported" &&
                result.bindings.some((binding) => sources.get(sourceKey({
                    subject_revision_digest: plan.subject.revision_digest,
                    source_id: binding.source_id,
                }))?.authority !== "canonical")) {
                reasons.add("supported_claim_uses_inert_source");
            }
        }
    }
    for (const conflict of input.conflicts) {
        reasons.add(conflict.strength === "exact" ? "exact_conflict" : "ambiguous_conflict");
    }
    if (input.asset.kind === "vendor_asset") {
        reasons.add("vendor_asset_requires_authority_review");
    }
    else if (input.asset.status !== "supported" || input.asset.candidate_digest === null) {
        reasons.add("safe_asset_required");
    }
    return [...reasons].sort(compareCanonicalStrings);
}
function outcomeForReasons(reasons) {
    if (reasons.some((reason) => [
        "declared_offer_not_machine_admissible",
        "source_capture_anomaly",
        "source_http_status_not_success",
        "source_not_public",
        "supported_claim_uses_inert_source",
        "claim_contradicted",
        "exact_conflict",
    ].includes(reason))) {
        return "rejected";
    }
    if (reasons.includes("source_capture_retryable"))
        return "temporarily_unavailable";
    if (reasons.some((reason) => [
        "source_authority_ambiguous",
        "capture_method_not_unattended",
        "claim_unresolved",
        "ambiguous_conflict",
        "vendor_asset_requires_authority_review",
    ].includes(reason))) {
        return "human_review_required";
    }
    if (reasons.length > 0)
        return "needs_revision";
    return "auto_admissible";
}
function subjectKey(plan) {
    return `${subjectIdentity(plan.subject)}\0${plan.subject.revision_digest}`;
}
function subjectKeyFromChange(subject) {
    if (subject.revision_digest === null)
        throw new Error("A non-removed changed subject needs a revision.");
    return `${subjectIdentity(subject)}\0${subject.revision_digest}`;
}
function subjectKeyFromRevision(revision) {
    const subject = revision.revision_contract === "sourcey.entity-revision/v1alpha1"
        ? { kind: "entity", entity_id: revision.entity_id }
        : revision.revision_contract === "sourcey.program-revision/v1alpha1"
            ? {
                kind: "program",
                entity_id: revision.entity_id,
                program_id: revision.program_id,
            }
            : {
                kind: "offer",
                entity_id: revision.entity_id,
                program_id: revision.program_id,
                offer_id: revision.offer_id,
            };
    return `${subjectIdentity(subject)}\0${revision.revision_digest}`;
}
function subjectIdentity(subject) {
    const kind = subject.kind ?? subject.subject_type;
    return `${kind}\0${subject.entity_id}\0${subject.program_id ?? ""}\0${subject.offer_id ?? ""}`;
}
function sourceKey(source) {
    return `${source.subject_revision_digest}\0${source.source_id}`;
}
//# sourceMappingURL=machine-admission.js.map