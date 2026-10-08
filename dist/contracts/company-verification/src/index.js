import { DIGEST_PATTERN } from "provenry/primitives";
import { z } from "zod";
import { ENTITY_ID_PATTERN } from "../../../modules/catalog-primitives/src/index.js";
import { entityIdentityAssuranceSchema } from "../../assurance/src/index.js";
import { fundedWorkIntentEnvelopeSchema } from "../../funded-work/src/index.js";
const digestSchema = z.string().regex(DIGEST_PATTERN);
const entityIdSchema = z.string().regex(ENTITY_ID_PATTERN);
const instantSchema = z.iso.datetime({ offset: true });
export const reviewEvidenceBasisSchema = z
    .object({
    evidence_event_ids: z.array(digestSchema),
    observation_ids: z.array(digestSchema),
    retained_artifact_digests: z.array(digestSchema).default([]),
})
    .strict()
    .superRefine((basis, context) => {
    if (basis.evidence_event_ids.length +
        basis.observation_ids.length +
        basis.retained_artifact_digests.length ===
        0) {
        context.addIssue({
            code: "custom",
            message: "A review outcome requires at least one retained evidence or observation ID.",
        });
    }
    for (const [field, values] of Object.entries(basis)) {
        if (new Set(values).size !== values.length ||
            [...values].sort().some((v, i) => v !== values[i])) {
            context.addIssue({
                code: "custom",
                path: [field],
                message: "Review basis IDs must be unique and canonically sorted.",
            });
        }
    }
});
const companyIdentityFailureReasonSchema = z.enum([
    "identity_mismatch",
    "identity_unresolved",
    "insufficient_evidence",
]);
export const companyIdentityReviewDecisionSchema = z.discriminatedUnion("status", [
    z
        .object({
        status: z.literal("passed"),
        rationale: z.string().trim().min(1).max(2_000),
    })
        .strict(),
    z
        .object({
        status: z.literal("failed"),
        reason_code: companyIdentityFailureReasonSchema,
        rationale: z.string().trim().min(1).max(2_000),
        basis: reviewEvidenceBasisSchema,
    })
        .strict(),
]);
const companyIdentityReviewOutcomeSchema = z.discriminatedUnion("status", [
    z
        .object({
        status: z.literal("passed"),
        entity_id: entityIdSchema,
        assurance: entityIdentityAssuranceSchema,
    })
        .strict(),
    z
        .object({
        status: z.literal("reused"),
        entity_id: entityIdSchema,
        assurance: entityIdentityAssuranceSchema,
    })
        .strict(),
    z
        .object({
        status: z.literal("failed"),
        entity_id: entityIdSchema,
        reason_code: companyIdentityFailureReasonSchema,
        rationale: z.string().trim().min(1).max(2_000),
        basis: reviewEvidenceBasisSchema,
    })
        .strict(),
]);
/** The new-listing company target; a product review composes its own required fields. */
export const companyVerificationNewListingTargetSchema = z
    .object({
    kind: z.literal("new_listing"),
    base_release_id: digestSchema,
    entity_id: entityIdSchema,
    submission_id: z.string().regex(/^sub_[a-f0-9]{64}$/u),
    submission_payload_digest: digestSchema,
})
    .strict();
/**
 * One completed identity review's factual fields and binding checks. It is
 * neither payment authority nor evidence admission. Fulfilment must read back
 * the exact assurance against the current identity epoch before completing.
 * Each product composes its exact target; this core binds only its company.
 */
export const completedCompanyReviewCoreSchema = z
    .object({
    order_id: z.string().regex(/^ord_[a-f0-9]{64}$/u),
    funded_work_intent_id: fundedWorkIntentEnvelopeSchema.shape.intent_id,
    funded_work_intent_digest: digestSchema,
    verification_case_id: z.string().regex(/^hvc_[a-f0-9]{64}$/u),
    target: z.object({ entity_id: entityIdSchema }),
    method_policy_digest: digestSchema,
    reviewer_id: z.string().trim().min(1).max(256),
    reviewed_at: instantSchema,
    readback_release_id: digestSchema,
    work_outcome: z.literal("review_delivered"),
    entity_identity: companyIdentityReviewOutcomeSchema,
})
    .strict()
    .superRefine((receipt, context) => {
    const identity = receipt.entity_identity;
    if (identity.entity_id !== receipt.target.entity_id) {
        context.addIssue({
            code: "custom",
            path: ["target"],
            message: "The identity outcome must bind the exact Human Verification target.",
        });
    }
    if (identity.status === "failed")
        return;
    if (identity.assurance.method_policy_digest !== receipt.method_policy_digest ||
        (identity.status === "passed"
            ? identity.assurance.verified_at !== receipt.reviewed_at
            : Date.parse(identity.assurance.verified_at) > Date.parse(receipt.reviewed_at))) {
        context.addIssue({
            code: "custom",
            path: ["entity_identity", "assurance"],
            message: identity.status === "passed"
                ? "A newly passed Entity identity assurance must use this review method and timestamp."
                : "A reused Entity identity assurance must use this review method and cannot postdate this review.",
        });
    }
});
//# sourceMappingURL=index.js.map