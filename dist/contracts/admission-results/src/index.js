import { DIGEST_PATTERN, digest } from "provenry/primitives";
import { z } from "zod";
import { companyAdmissionBindingSchema, standingCriterionSchema, } from "../../company-standing/src/index.js";
import { EVIDENCE_READINGS_PER_EVALUATION_LIMIT, evidenceLocatorSchema, } from "../../evidence/src/index.js";
const digestSchema = z.string().regex(DIGEST_PATTERN);
const gitObjectSchema = z.string().regex(/^[a-f0-9]{40,64}$/u);
const instantSchema = z.iso.datetime({ offset: true });
const identifierSchema = z.string().min(1).max(160);
const REPORT_SUBJECTS_LIMIT = 8;
const REPORT_SOURCES_LIMIT = 32;
const subjectSchema = z
    .object({
    kind: z.enum(["entity", "program", "offer"]),
    entity_id: identifierSchema,
    program_id: identifierSchema.nullable(),
    offer_id: identifierSchema.nullable(),
    label: z.string().min(1).max(300),
    revision_digest: digestSchema.nullable(),
})
    .strict();
const sourceSchema = z
    .object({
    subject_revision_digest: digestSchema,
    source_id: identifierSchema,
    requested_url: z.url({ protocol: /^https$/u }),
    final_url: z.url({ protocol: /^https$/u }).nullable(),
    final_host: z.string().min(1).max(253).nullable(),
    authority: z.enum(["canonical", "inert", "ambiguous"]),
    capture_status: z.enum([
        "captured",
        "not_attempted",
        "retryable_failure",
        "terminal_failure",
        "anomaly",
    ]),
    response_status_code: z.number().int().min(100).max(599).nullable(),
    capture_digest: digestSchema.nullable(),
    normalized_object_digest: digestSchema.nullable(),
})
    .strict();
const claimSchema = z
    .object({
    subject_revision_digest: digestSchema,
    path: z.string().min(1).max(500),
    status: z.enum(["supported", "unsupported", "contradicted", "unresolved"]),
    guidance: z.string().min(1).max(500),
    result_digest: digestSchema,
    bindings: z.array(z
        .object({
        source_id: identifierSchema,
        binding_digest: digestSchema,
        locators: z.array(evidenceLocatorSchema).min(1).max(16),
    })
        .strict()),
    residue_codes: z.array(identifierSchema),
})
    .strict();
const conflictSchema = z
    .object({
    kind: identifierSchema,
    strength: z.enum(["exact", "ambiguous"]),
    key_digest: digestSchema,
    target_references: z.array(z.string().min(1).max(240)),
    source_references: z.array(z.string().min(1).max(400)),
})
    .strict();
const startupCreditsAdmissionReportCoreSchema = z
    .object({
    report_contract: z.literal("sourcey.startup-credits-admission-report/v1alpha1"),
    repository: z.string().regex(/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/u),
    pull_request_number: z.number().int().positive(),
    base_sha: gitObjectSchema,
    head_sha: gitObjectSchema,
    source_tree: gitObjectSchema,
    change_tree: gitObjectSchema,
    live_source_commit: gitObjectSchema,
    live_parent_release_id: digestSchema,
    evaluated_at: instantSchema,
    changed_files: z.array(z.string().min(1).max(512)).min(1).max(32),
    subjects: z.array(subjectSchema).max(REPORT_SUBJECTS_LIMIT),
    candidate_domains: z.array(z.string().min(1).max(253)).max(32),
    sources: z.array(sourceSchema).max(REPORT_SOURCES_LIMIT),
    claims: z.array(claimSchema).max(4096),
    conflicts: z.array(conflictSchema).max(64),
    /** The standing binding a new company was admitted on, from Sourcey's company gate. */
    company_admission: companyAdmissionBindingSchema.optional(),
    outcome: z.enum([
        "auto_admissible",
        "needs_revision",
        "temporarily_unavailable",
        "human_review_required",
        "rejected",
    ]),
    reason_codes: z.array(identifierSchema),
    retryable: z.boolean(),
    next_action: z.enum(["merge", "revise", "retry", "review", "stop"]),
    /**
     * Each model reading behind the verdicts, once, with its spend and every
     * subject and source whose claims were decided from it.
     */
    model_effects: z
        .array(z
        .object({
        provider: identifierSchema,
        model: z.string().min(1).max(120),
        receipt_digest: digestSchema,
        spend_microusd: z.number().int().nonnegative(),
        cached: z.boolean(),
        uses: z
            .array(z
            .object({ subject_revision_digest: digestSchema, source_id: identifierSchema })
            .strict())
            .min(1)
            .max(REPORT_SUBJECTS_LIMIT * REPORT_SOURCES_LIMIT),
    })
        .strict())
        .max(REPORT_SUBJECTS_LIMIT * EVIDENCE_READINGS_PER_EVALUATION_LIMIT),
    authority: z
        .object({
        machine_policy_digest: digestSchema,
        coverage_policy_digest: digestSchema,
        evaluator_digest: digestSchema,
        input_digest: digestSchema.nullable(),
        result_digest: digestSchema.nullable(),
        execution_receipt_digest: digestSchema.nullable(),
        admission_artifact_digest: digestSchema.nullable(),
        admission_candidate_url: z.url({ protocol: /^https$/u }).nullable(),
        evidence_authority_set_digest: digestSchema.nullable(),
        asset_authority_bundle_digest: digestSchema.nullable(),
    })
        .strict(),
})
    .strict();
const startupCreditsAdmissionReportSchema = startupCreditsAdmissionReportCoreSchema
    .extend({ report_digest: digestSchema })
    .strict();
export function createStartupCreditsAdmissionReport(input) {
    const core = startupCreditsAdmissionReportCoreSchema.parse(input);
    return startupCreditsAdmissionReportSchema.parse({ ...core, report_digest: digest(core) });
}
/** One thing Sourcey checked on a pull request head, worded for its contributor. */
export const admissionSummaryCheckSchema = z
    .object({
    key: z.enum([
        "admission",
        "files",
        "company",
        "standing",
        "conflicts",
        "sources",
        "facts",
        "logo",
        "verification",
        "review",
    ]),
    status: z.enum(["passed", "failed", "attention", "pending"]),
    title: z.string().min(1).max(240),
    /** Each finding on its own line, with the field or file and the link it is about. */
    details: z
        .array(z
        .object({
        text: z.string().min(1).max(600),
        path: z.string().min(1).max(300).nullable(),
        url: z.url({ protocol: /^https$/u }).nullable(),
    })
        .strict())
        .max(24),
})
    .strict();
/**
 * What Sourcey's admission concluded for one exact pull request head, as its contributor reads it
 * on the `sourcey/admission` check and on Sourcey's page for the pull request: one state, what
 * happens next, and every check with what passed and exactly what did not.
 */
export const admissionSummarySchema = z
    .object({
    summary_contract: z.literal("sourcey.pull-request-admission-summary/v1alpha1"),
    repository: z.string().regex(/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/u),
    pull_request_number: z.number().int().positive(),
    head_sha: gitObjectSchema,
    state: z.enum([
        "passed",
        "needs_change",
        "needs_person",
        "refused",
        "verification_offered",
        "verifying",
        "verification_refused",
    ]),
    title: z.string().min(1).max(120),
    /** What this means for the pull request and what its contributor does next. */
    lead: z.string().min(1).max(600),
    company: z.string().min(1).max(240).nullable(),
    checks: z.array(admissionSummaryCheckSchema).min(1).max(10),
    /** The standing a new company was routed by, rule by rule, when it is part of the result. */
    standing: z
        .object({
        evaluated_at: instantSchema,
        /** The rule in one sentence, so every surface states it the same way. */
        rule: z.string().min(1).max(400),
        criteria: z.array(standingCriterionSchema).min(1).max(8),
    })
        .strict()
        .nullable(),
    /** The full machine report, for whoever wants every digest. */
    report_url: z.url({ protocol: /^https$/u }).nullable(),
})
    .strict();
export function verifyStartupCreditsAdmissionReport(input) {
    const report = startupCreditsAdmissionReportSchema.parse(input);
    const { report_digest: reportDigest, ...core } = report;
    if (digest(startupCreditsAdmissionReportCoreSchema.parse(core)) !== reportDigest) {
        throw new Error("Startup Credits admission report digest does not match its content.");
    }
    return report;
}
//# sourceMappingURL=index.js.map