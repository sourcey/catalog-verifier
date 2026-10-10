import { digest } from "provenry/primitives";
import { z } from "zod";
import { offerTermsAssuranceSchema } from "../../assurance/src/index.js";
import { companyAuthoringFileSchema, companyDraftDiagnosticSchema, companySubmissionSchema, } from "../../company-authoring/src/index.js";
import { standingResultSchema } from "../../company-standing/src/index.js";
import { companyVerificationDraftSchema } from "../../company-verification/src/commercial.js";
import { companyIdentityReviewDecisionSchema, companyVerificationNewListingTargetSchema, completedCompanyReviewCoreSchema, reviewEvidenceBasisSchema, } from "../../company-verification/src/index.js";
import { fundedWorkIntentEnvelopeSchema } from "../../funded-work/src/index.js";
import { expectedPublicationEntitySchema } from "../../publication/src/index.js";
import { catalogAuthoringUrlSchema } from "../../revisions/src/index.js";
import { startupCreditsExistingEntityDraftBaseSchema, startupCreditsPriceLookupKey, startupCreditsProductCode, startupCreditsPurchasePreviewSchema, } from "./product.js";
import { digestSchema, entityIdSchema, offerIdSchema, programIdSchema } from "./values.js";
/**
 * What a person drafts on Sourcey: a company and one Offer (and its Program, if any), or a new
 * company alone, which is the company-only product. Each draft is materialized under its own
 * product's preview.
 */
export const startupCreditsDraftRequestSchema = z
    .object({
    standing_result: standingResultSchema,
    existing_entity: startupCreditsExistingEntityDraftBaseSchema.optional(),
    company: companySubmissionSchema,
    program: z
        .object({
        title: z.string().trim().min(1).max(240),
        summary: z.string().trim().min(1).max(240),
    })
        .strict()
        .optional(),
    offer: z
        .object({
        title: z.string().trim().min(1).max(240),
        summary: z.string().trim().min(1).max(240),
        benefit: z.string().trim().min(1).max(500),
        eligibility: z.string().trim().min(1).max(500),
        access_method: z.enum(["form", "contact", "automatic", "other"]),
        access_url: catalogAuthoringUrlSchema.optional(),
    })
        .strict()
        .superRefine((offer, context) => {
        if (offer.access_method === "form" && offer.access_url === undefined) {
            context.addIssue({
                code: "custom",
                path: ["access_url"],
                message: "A form offer requires its public application URL.",
            });
        }
    })
        .optional(),
})
    .strict()
    .superRefine((request, context) => {
    if (!request.offer && (request.program || request.existing_entity)) {
        context.addIssue({
            code: "custom",
            path: ["offer"],
            message: "A company drafted alone is a new company with no Program.",
        });
    }
    const existingRoute = request.standing_result.route === "correction_required";
    if (existingRoute !== (request.existing_entity !== undefined)) {
        context.addIssue({
            code: "custom",
            path: ["existing_entity"],
            message: "An existing Entity reference is required only for an exact existing-record draft.",
        });
    }
});
export const startupCreditsOfferDraftSchema = z
    .object({
    status: z.literal("materialized"),
    base_release_id: digestSchema,
    entity_id: entityIdSchema,
    program_id: programIdSchema.optional(),
    offer_id: offerIdSchema,
    purchase_preview: startupCreditsPurchasePreviewSchema,
    expected_current_entities: z.array(expectedPublicationEntitySchema).max(1),
    authoring_file: companyAuthoringFileSchema,
    diagnostics: z.array(companyDraftDiagnosticSchema).max(20),
})
    .strict();
export const startupCreditsDraftResultSchema = z.union([
    z
        .object({
        status: z.enum(["invalid", "incomplete", "conflict", "ineligible"]),
        diagnostics: z.array(companyDraftDiagnosticSchema).min(1),
    })
        .strict(),
    startupCreditsOfferDraftSchema,
    companyVerificationDraftSchema,
]);
export const startupCreditsVerificationCaseIdSchema = z.string().regex(/^hvc_[a-f0-9]{64}$/u);
const startupCreditsNewListingIntentTargetSchema = z
    .object({
    kind: z.literal("new_listing"),
    base_release_id: digestSchema,
    entity_id: entityIdSchema,
    program_id: programIdSchema.optional(),
    offer_id: offerIdSchema,
    submission: z
        .object({
        submission_id: z.string().regex(/^sub_[a-f0-9]{64}$/u),
        payload_digest: digestSchema,
        authorization_policy: z.literal("proposal"),
    })
        .strict(),
    standing_result: standingResultSchema,
    authoring_file_digest: digestSchema,
})
    .strict();
export const startupCreditsExistingRecordTargetSchema = z
    .object({
    kind: z.literal("existing_record"),
    base_release_id: digestSchema,
    entity_id: entityIdSchema,
    program_id: programIdSchema.optional(),
    entity_revision_digest: digestSchema,
    offer_id: offerIdSchema,
    offer_revision_digest: digestSchema,
})
    .strict();
/**
 * Stable customer reference to one admitted Entity and Offer revision.
 *
 * The current Catalog head is deliberately absent: an unrelated release must
 * not invalidate checkout for this exact record. The product resolver adds the
 * current base release only after proving both revision digests still match.
 */
export const startupCreditsExistingRecordReferenceSchema = startupCreditsExistingRecordTargetSchema
    .omit({ base_release_id: true })
    .strict();
/**
 * A data repository's pull request adding a company below Sourcey's standing bar, with its Offer.
 * The order serves the pull request's own submission and its exact Entity and Offer; the head is
 * where it was bought. A later head keeps the service while it keeps that Entity and Offer, and
 * the person verifies each head again.
 */
export const startupCreditsGitPullRequestTargetSchema = z
    .object({
    kind: z.literal("git_pull_request"),
    base_release_id: digestSchema,
    entity_id: entityIdSchema,
    program_id: programIdSchema.optional(),
    offer_id: offerIdSchema,
    pull_request: z
        .object({
        repository_id: z.string().regex(/^[1-9][0-9]*$/u),
        repository: z.string().regex(/^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/u),
        pull_request_number: z.number().int().positive(),
        submission_id: z.string().regex(/^pull_[a-f0-9]{64}$/u),
        head_sha: z.string().regex(/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u),
    })
        .strict(),
    standing_result: standingResultSchema,
    /** The canonical Entity authoring at the head it was bought at. */
    authoring_digest: digestSchema,
    /** The exact Entity and Offer revisions that head compiles to. */
    revisions: z
        .object({ entity_revision_digest: digestSchema, offer_revision_digest: digestSchema })
        .strict(),
    /** What that head names, as the person verifying it reads it. */
    labels: z
        .object({
        company_name: z.string().trim().min(1).max(240),
        company_site_url: z.url({ protocol: /^https$/u }),
        offer_title: z.string().trim().min(1).max(240),
        offer_url: z.url({ protocol: /^https$/u }),
    })
        .strict(),
})
    .strict();
/**
 * The exact pull request head a person verified: its submission revision, and the Entity and
 * Offer revisions that head compiles to, which the verification attests and nothing later.
 */
export const startupCreditsReviewedPullRequestRevisionSchema = z
    .object({
    submission_id: z.string().regex(/^pull_[a-f0-9]{64}$/u),
    revision_digest: digestSchema,
    head_sha: z.string().regex(/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u),
    entity_revision_digest: digestSchema,
    offer_revision_digest: digestSchema,
})
    .strict();
const startupCreditsVerificationIntentTargetSchema = z.discriminatedUnion("kind", [
    startupCreditsNewListingIntentTargetSchema,
    startupCreditsExistingRecordTargetSchema,
    startupCreditsGitPullRequestTargetSchema,
]);
export const startupCreditsFundedWorkIntentSchema = z
    .object({
    product_intent_contract: z.literal("sourcey.startup-offer-human-verification-intent/v1alpha1"),
    verification_case_id: startupCreditsVerificationCaseIdSchema,
    billing: fundedWorkIntentEnvelopeSchema,
    target: startupCreditsVerificationIntentTargetSchema,
    purchase_preview_digest: digestSchema,
    disclosure_digest: digestSchema,
    product_intent_digest: digestSchema,
})
    .strict()
    .superRefine((intent, context) => {
    if (intent.billing.product_code !== startupCreditsProductCode) {
        context.addIssue({
            code: "custom",
            path: ["billing", "product_code"],
            message: "Startup Credits work must use the Startup Credits product code.",
        });
    }
    if (intent.billing.price_lookup_key !== startupCreditsPriceLookupKey) {
        context.addIssue({
            code: "custom",
            path: ["billing", "price_lookup_key"],
            message: "Startup Credits work must use the published Startup Credits price key.",
        });
    }
    if (intent.billing.work_class !== "human-verification") {
        context.addIssue({
            code: "custom",
            path: ["billing", "work_class"],
            message: "Startup Credits funded work must remain human verification.",
        });
    }
    const eligibilityDigest = intent.target.kind === "existing_record"
        ? digest(intent.target)
        : intent.target.standing_result.result_digest;
    if (intent.billing.eligibility_digest !== eligibilityDigest) {
        context.addIssue({
            code: "custom",
            path: ["billing", "eligibility_digest"],
            message: "The billing eligibility binding must be the exact verification target.",
        });
    }
    const bindings = new Map(intent.billing.policy_bindings.map((binding) => [binding.role, binding.policy_digest]));
    if (intent.target.kind !== "existing_record" &&
        bindings.get("standing") !== intent.target.standing_result.policy_digest) {
        context.addIssue({
            code: "custom",
            path: ["billing", "policy_bindings"],
            message: "The standing policy binding must match the exact standing result.",
        });
    }
    if (intent.target.kind === "git_pull_request" &&
        intent.target.standing_result.route !== "human_verification_required") {
        context.addIssue({
            code: "custom",
            path: ["target", "standing_result", "route"],
            message: "A pull request buys verification only for a company below the standing bar.",
        });
    }
    if (intent.target.kind === "existing_record" && bindings.has("standing")) {
        context.addIssue({
            code: "custom",
            path: ["billing", "policy_bindings"],
            message: "Existing-record verification must not invent a standing-policy binding.",
        });
    }
    if (bindings.get("purchase-disclosure") !== intent.disclosure_digest) {
        context.addIssue({
            code: "custom",
            path: ["billing", "policy_bindings"],
            message: "The purchase disclosure binding must match the exact product disclosure.",
        });
    }
    for (const role of ["assurance-method", "service"]) {
        if (bindings.has(role))
            continue;
        context.addIssue({
            code: "custom",
            path: ["billing", "policy_bindings"],
            message: `The ${role} policy binding is required.`,
        });
    }
    if (intent.billing.owner_work_ref !== intent.verification_case_id ||
        intent.billing.base_release_id !== intent.target.base_release_id ||
        intent.billing.subject.entity_id !== intent.target.entity_id ||
        intent.billing.subject.program_id !== intent.target.program_id ||
        intent.billing.subject.offer_id !== intent.target.offer_id) {
        context.addIssue({
            code: "custom",
            path: ["billing"],
            message: "Billing must bind this exact Human Verification case and target.",
        });
    }
});
const startupCreditsOfferTermsFailureReasonSchema = z.enum([
    "terms_mismatch",
    "source_unavailable",
    "insufficient_evidence",
]);
const startupCreditsOfferTermsReviewDecisionSchema = z.discriminatedUnion("status", [
    z
        .object({
        status: z.literal("passed"),
        rationale: z.string().trim().min(1).max(2_000),
    })
        .strict(),
    z
        .object({
        status: z.literal("failed"),
        reason_code: startupCreditsOfferTermsFailureReasonSchema,
        rationale: z.string().trim().min(1).max(2_000),
        basis: reviewEvidenceBasisSchema,
    })
        .strict(),
    z
        .object({
        status: z.literal("not_evaluated"),
        reason_code: z.literal("identity_unresolved"),
    })
        .strict(),
]);
/** The reviewer records two factual decisions. Their dependency is explicit:
 * Offer terms are skipped exactly when company identity cannot be established. */
export const startupCreditsReviewDecisionSchema = z
    .object({
    entity_identity: companyIdentityReviewDecisionSchema,
    offer_terms: startupCreditsOfferTermsReviewDecisionSchema,
})
    .strict()
    .superRefine((decision, context) => {
    const identityFailed = decision.entity_identity.status === "failed";
    const termsNotEvaluated = decision.offer_terms.status === "not_evaluated";
    if (identityFailed !== termsNotEvaluated) {
        context.addIssue({
            code: "custom",
            path: ["offer_terms", "status"],
            message: "Offer terms may be not evaluated only when Entity identity failed, and identity failure cannot carry an Offer terms decision.",
        });
    }
});
const offerTermsReviewOutcomeSchema = z.discriminatedUnion("status", [
    z
        .object({
        status: z.literal("passed"),
        entity_id: entityIdSchema,
        offer_id: offerIdSchema,
        assurance: offerTermsAssuranceSchema,
    })
        .strict(),
    z
        .object({
        status: z.literal("reused"),
        entity_id: entityIdSchema,
        offer_id: offerIdSchema,
        assurance: offerTermsAssuranceSchema,
    })
        .strict(),
    z
        .object({
        status: z.literal("failed"),
        entity_id: entityIdSchema,
        offer_id: offerIdSchema,
        revision_digest: digestSchema,
        reason_code: startupCreditsOfferTermsFailureReasonSchema,
        rationale: z.string().trim().min(1).max(2_000),
        basis: reviewEvidenceBasisSchema,
    })
        .strict(),
    z
        .object({
        status: z.literal("not_evaluated"),
        entity_id: entityIdSchema,
        offer_id: offerIdSchema,
        reason_code: z.literal("identity_unresolved"),
    })
        .strict(),
]);
const startupCreditsReviewCompletionTargetSchema = z.discriminatedUnion("kind", [
    companyVerificationNewListingTargetSchema
        .extend({ program_id: programIdSchema.optional(), offer_id: offerIdSchema })
        .strict(),
    startupCreditsExistingRecordTargetSchema,
    startupCreditsGitPullRequestTargetSchema,
]);
export const startupCreditsReviewCompletionReceiptCoreSchema = completedCompanyReviewCoreSchema
    .safeExtend({
    receipt_contract: z.literal("sourcey.startup-credits-review-completion/v1alpha1"),
    target: startupCreditsReviewCompletionTargetSchema,
    /** For a pull request, the exact head the person verified, which may follow the one bought. */
    reviewed_revision: startupCreditsReviewedPullRequestRevisionSchema.optional(),
    offer_terms: offerTermsReviewOutcomeSchema,
})
    .strict()
    .superRefine((receipt, context) => {
    if ((receipt.target.kind === "git_pull_request") !== (receipt.reviewed_revision !== undefined) ||
        (receipt.target.kind === "git_pull_request" &&
            receipt.reviewed_revision?.submission_id !== receipt.target.pull_request.submission_id)) {
        context.addIssue({
            code: "custom",
            path: ["reviewed_revision"],
            message: "A pull request's completion names exactly the head its person verified.",
        });
    }
    if (receipt.offer_terms.entity_id !== receipt.target.entity_id ||
        receipt.offer_terms.offer_id !== receipt.target.offer_id) {
        context.addIssue({
            code: "custom",
            path: ["target"],
            message: "Review outcomes must bind the exact Human Verification target.",
        });
    }
    const identityFailed = receipt.entity_identity.status === "failed";
    const termsNotEvaluated = receipt.offer_terms.status === "not_evaluated";
    if (identityFailed !== termsNotEvaluated) {
        context.addIssue({
            code: "custom",
            path: ["offer_terms", "status"],
            message: "Offer terms may be not evaluated only when Entity identity failed, and identity failure cannot carry an Offer terms decision.",
        });
    }
    if (receipt.offer_terms.status === "passed" &&
        (receipt.offer_terms.assurance.method_policy_digest !== receipt.method_policy_digest ||
            receipt.offer_terms.assurance.checked_at !== receipt.reviewed_at)) {
        context.addIssue({
            code: "custom",
            path: ["offer_terms", "assurance"],
            message: "A passed Offer terms assurance must use this review method and timestamp.",
        });
    }
    if (receipt.offer_terms.status === "reused" &&
        (receipt.offer_terms.assurance.method_policy_digest !== receipt.method_policy_digest ||
            Date.parse(receipt.offer_terms.assurance.checked_at) > Date.parse(receipt.reviewed_at))) {
        context.addIssue({
            code: "custom",
            path: ["offer_terms", "assurance"],
            message: "A reused Offer terms assurance must use this review method and cannot postdate this review.",
        });
    }
});
export const startupCreditsReviewCompletionReceiptSchema = startupCreditsReviewCompletionReceiptCoreSchema
    .safeExtend({ receipt_digest: digestSchema })
    .strict();
//# sourceMappingURL=purchase.js.map