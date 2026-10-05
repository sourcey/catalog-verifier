import { DIGEST_PATTERN, IDENTIFIER_PATTERN, OPERATION_ID_PATTERN } from "provenry/primitives";
import { z } from "zod";
import { protectedSignatureSchema } from "../../../contracts/authority/src/index.js";
import { evidenceCaptureMethodSchema, evidenceReceiptSubjectSchema, evidenceRedirectSchema, } from "../../../contracts/evidence/src/index.js";
const digest = z.string().regex(DIGEST_PATTERN);
const identifier = z.string().regex(IDENTIFIER_PATTERN);
const operationId = z.string().regex(OPERATION_ID_PATTERN);
const instant = z.iso.datetime({ offset: true });
const retainedReviewDecisionSchema = z
    .object({
    review_decision_contract: z.literal("sourcey.evidence-review-decision/v1alpha1"),
    review_proposal_digest: digest,
    decision_digest: digest,
    decision: z.enum(["approved", "rejected"]),
    decided_at: instant,
    rationale: z.string().min(1).max(2_000).nullable(),
})
    .passthrough();
const retainedCaptureDeclarationSchema = z
    .object({
    subject_source_url: z.url({ protocol: /^https$/ }),
    requested_url: z.url({ protocol: /^https$/ }),
    final_url: z.url({ protocol: /^https$/ }),
    redirect_chain: z.array(evidenceRedirectSchema).max(5),
    retrieved_at: instant,
    method: evidenceCaptureMethodSchema,
    response_status_code: z.number().int().min(100).max(599).optional(),
    media_type: z.string().min(1),
    digest,
    availability: z.enum(["public", "restricted"]),
    bytes: z.number().int().positive(),
})
    .passthrough();
/**
 * Exact historical receipt envelope used only when replaying an immutable
 * release. Current receipt issuance remains governed by captureReceiptSchema.
 * Unknown historical fields are retained because they are signed bytes.
 */
export const retainedCaptureReceiptSchema = z
    .object({
    receipt_contract: z.literal("sourcey.capture-receipt/v1alpha1"),
    receipt_digest: digest,
    issuer_id: identifier,
    operation_id: operationId,
    job_id: digest,
    base_release_id: digest,
    subject: evidenceReceiptSubjectSchema,
    authority_entity_revision_digest: digest,
    authority_program_revision_digest: digest.nullable(),
    capture_policy_digest: digest,
    review_decision: retainedReviewDecisionSchema,
    capture: retainedCaptureDeclarationSchema,
    issued_at: instant,
    protected: protectedSignatureSchema,
})
    .passthrough()
    .superRefine((value, context) => {
    const requiresProgramAuthority = value.subject.subject_type === "offer" && value.subject.program_id !== undefined;
    if (requiresProgramAuthority !== (value.authority_program_revision_digest !== null)) {
        context.addIssue({
            code: "custom",
            path: ["authority_program_revision_digest"],
            message: requiresProgramAuthority
                ? "Program-backed Offer capture receipts require the exact authority Program revision."
                : "Only Program-backed Offer capture receipts may carry an authority Program revision.",
        });
    }
    if (Date.parse(value.issued_at) < Date.parse(value.capture.retrieved_at)) {
        context.addIssue({
            code: "custom",
            path: ["issued_at"],
            message: "Capture receipt cannot be issued before retrieval.",
        });
    }
});
//# sourceMappingURL=retained-capture-receipt.js.map