import { z } from "zod";
import { AGENT_READINESS_PROFILE_ID_PATTERN, DIGEST_PATTERN, ENTITY_ID_PATTERN, IDENTIFIER_PATTERN, OFFER_ID_PATTERN, OPERATION_ID_PATTERN, PROGRAM_ID_PATTERN, } from "../../../modules/primitives/src/index.js";
import { decisionBasisSchema, protectedSignatureSchema } from "../../authority/src/index.js";
const digest = z.string().regex(DIGEST_PATTERN);
const agentReadinessProfileId = z.string().regex(AGENT_READINESS_PROFILE_ID_PATTERN);
const entityId = z.string().regex(ENTITY_ID_PATTERN);
const identifier = z.string().regex(IDENTIFIER_PATTERN);
const offerId = z.string().regex(OFFER_ID_PATTERN);
const programId = z.string().regex(PROGRAM_ID_PATTERN);
const operationId = z.string().regex(OPERATION_ID_PATTERN);
const instant = z.iso.datetime({ offset: true });
const pointer = z.string().regex(/^\/(?:[^~/]|~0|~1)+(?:\/(?:[^~/]|~0|~1)+)*$/);
export const EVIDENCE_LOCATORS_PER_ASSERTION_LIMIT = 16;
export const evidenceCaptureMethodSchema = z.enum(["http", "headless", "archive", "manual"]);
export const evidenceCaptureAvailabilitySchema = z.enum(["public", "private-receipt"]);
const PUBLIC_READ_FORBIDDEN_HEADER = /(?:^|[-_])(?:auth(?:orization)?|cookie|credential|idempotency|key|method-override|proxy|secret|token)(?:$|[-_])/u;
export const evidencePublicReadRequestSchema = z
    .object({
    method: z.literal("GET"),
    target_url: z.url({ protocol: /^https$/u }).optional(),
    headers: z
        .array(z
        .object({
        name: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u),
        value: z.string().trim().min(1).max(512),
    })
        .strict())
        .max(16),
})
    .strict()
    .superRefine((value, context) => {
    if (value.target_url) {
        const target = new URL(value.target_url);
        if (target.username || target.password || target.hash) {
            context.addIssue({
                code: "custom",
                path: ["target_url"],
                message: "Public-read target URLs cannot contain credentials or fragments.",
            });
        }
    }
    const names = value.headers.map((header) => header.name);
    if (new Set(names).size !== names.length ||
        names.some((name, index) => name !== [...names].sort()[index])) {
        context.addIssue({
            code: "custom",
            path: ["headers"],
            message: "Public-read request headers must be canonical, ordered, and unique.",
        });
    }
    for (const [index, header] of value.headers.entries()) {
        if (header.name === "host" ||
            header.name === "connection" ||
            header.name === "content-length" ||
            header.name === "transfer-encoding" ||
            header.name === "user-agent" ||
            header.name.startsWith("sec-") ||
            PUBLIC_READ_FORBIDDEN_HEADER.test(header.name)) {
            context.addIssue({
                code: "custom",
                path: ["headers", index, "name"],
                message: "Public-read evidence requests cannot carry controlled or authority-bearing headers.",
            });
        }
    }
});
export const evidencePublicReadRequestSetSchema = z
    .object({
    request_set_contract: z.literal("sourcey.evidence-public-read-request-set/v1alpha1"),
    requests: z.array(z
        .object({
        source_url: z.url({ protocol: /^https$/u }),
        request: evidencePublicReadRequestSchema,
    })
        .strict()),
})
    .strict()
    .superRefine((value, context) => {
    const urls = value.requests.map(({ source_url: sourceUrl }) => sourceUrl);
    if (new Set(urls).size !== urls.length ||
        urls.some((url, index) => url !== [...urls].sort()[index])) {
        context.addIssue({
            code: "custom",
            path: ["requests"],
            message: "Public-read request surfaces must be canonical, ordered, and unique.",
        });
    }
    for (const [index, entry] of value.requests.entries()) {
        if (!entry.request.target_url)
            continue;
        const source = new URL(entry.source_url);
        const target = new URL(entry.request.target_url);
        const sourcePath = source.pathname.endsWith("/") ? source.pathname : `${source.pathname}/`;
        if (target.origin !== source.origin ||
            (target.pathname !== source.pathname && !target.pathname.startsWith(sourcePath))) {
            context.addIssue({
                code: "custom",
                path: ["requests", index, "request", "target_url"],
                message: "A public-read target must remain on the declared source origin and path boundary.",
            });
        }
    }
});
export const evidenceProofKindSchema = z.enum(["observed", "derived", "editorial", "attested"]);
export const evidenceDerivationRuleSchema = z.enum([
    "contact-access-from-first-party-mailto",
    "form-access-from-first-party-application",
    "first-party-access-operator",
    "public-availability-from-application",
]);
export const EVIDENCE_DERIVATION_RULE_PATHS = {
    "contact-access-from-first-party-mailto": "/access/method",
    "form-access-from-first-party-application": "/access/method",
    "first-party-access-operator": "/roles/access_operator_entity_id",
    "public-availability-from-application": "/access/availability",
};
export const evidenceSourceStandingSchema = z.enum([
    "live-first-party",
    "archived-first-party",
    "live-third-party",
    "archived-third-party",
    "manual-first-party",
    "manual-third-party",
]);
export const evidenceRedirectSchema = z
    .object({
    status: z.union([
        z.literal(301),
        z.literal(302),
        z.literal(303),
        z.literal(307),
        z.literal(308),
    ]),
    from: z.url({ protocol: /^https$/ }),
    to: z.url({ protocol: /^https$/ }),
})
    .strict();
export const evidenceNormalizedObjectSchema = z
    .object({
    digest,
    bytes: z.number().int().nonnegative(),
    media_type: z.literal("text/plain; charset=utf-8"),
    normalizer_contract: z.literal("sourcey.evidence-normalizer/v1alpha1"),
    normalizer_id: z.string().min(1),
    version: z.string().min(1),
    toolchain_digest: digest,
})
    .strict();
export const evidenceLocatorSchema = z
    .object({
    kind: z.literal("utf8-range"),
    start_byte: z.number().int().nonnegative(),
    end_byte: z.number().int().positive(),
    value_digest: digest,
})
    .strict();
export const evidenceAssertionSchema = z
    .object({
    path: pointer,
    polarity: z.enum(["supports", "contradicts"]),
    proof_kind: evidenceProofKindSchema,
    derivation_rule: evidenceDerivationRuleSchema.nullable(),
    locators: z.array(evidenceLocatorSchema).min(1).max(EVIDENCE_LOCATORS_PER_ASSERTION_LIMIT),
})
    .strict()
    .superRefine((value, context) => {
    if ((value.proof_kind === "derived") !== (value.derivation_rule !== null)) {
        context.addIssue({
            code: "custom",
            path: ["derivation_rule"],
            message: value.proof_kind === "derived"
                ? "Derived evidence requires its exact deterministic rule."
                : "Only derived evidence may name a deterministic rule.",
        });
    }
    if (value.derivation_rule !== null &&
        value.path !== EVIDENCE_DERIVATION_RULE_PATHS[value.derivation_rule]) {
        context.addIssue({
            code: "custom",
            path: ["path"],
            message: `Derivation rule ${value.derivation_rule} applies only to ${EVIDENCE_DERIVATION_RULE_PATHS[value.derivation_rule]}.`,
        });
    }
});
export const entityEvidenceSubjectSchema = z
    .object({
    subject_type: z.literal("entity"),
    entity_id: entityId,
})
    .strict();
export const programEvidenceSubjectSchema = z
    .object({
    subject_type: z.literal("program"),
    entity_id: entityId,
    program_id: programId,
})
    .strict();
export const offerEvidenceSubjectSchema = z
    .object({
    subject_type: z.literal("offer"),
    entity_id: entityId,
    program_id: programId.optional(),
    offer_id: offerId,
})
    .strict();
export const agentReadinessEvidenceSubjectSchema = z
    .object({
    subject_type: z.literal("agent_readiness_profile"),
    entity_id: entityId,
    agent_readiness_profile_id: agentReadinessProfileId,
})
    .strict();
export const evidenceSubjectSchema = z.discriminatedUnion("subject_type", [
    entityEvidenceSubjectSchema,
    programEvidenceSubjectSchema,
    offerEvidenceSubjectSchema,
    agentReadinessEvidenceSubjectSchema,
]);
export const evidenceReceiptSubjectSchema = z.discriminatedUnion("subject_type", [
    entityEvidenceSubjectSchema.extend({ revision_digest: digest }).strict(),
    programEvidenceSubjectSchema.extend({ revision_digest: digest }).strict(),
    offerEvidenceSubjectSchema.extend({ revision_digest: digest }).strict(),
    agentReadinessEvidenceSubjectSchema.extend({ revision_digest: digest }).strict(),
]);
export const evidenceReviewDecisionCoreSchema = z
    .object({
    review_decision_contract: z.literal("sourcey.evidence-review-decision/v1alpha1"),
    review_proposal_digest: digest,
    decision_basis: decisionBasisSchema,
    decision: z.enum(["approved", "rejected"]),
    decided_at: instant,
    rationale: z.string().min(1).max(2_000).nullable(),
})
    .strict();
export const evidenceReviewDecisionSchema = evidenceReviewDecisionCoreSchema
    .extend({ decision_digest: digest })
    .strict();
export const evidenceCaptureDeclarationSchema = z
    .object({
    subject_source_url: z.url({ protocol: /^https$/ }),
    requested_url: z.url({ protocol: /^https$/ }),
    final_url: z.url({ protocol: /^https$/ }),
    redirect_chain: z.array(evidenceRedirectSchema).max(5),
    retrieved_at: instant,
    method: evidenceCaptureMethodSchema,
    response_status_code: z.number().int().min(100).max(599),
    media_type: z.string().min(1),
    digest,
    availability: z.enum(["public", "restricted"]),
})
    .strict();
export const captureReceiptCoreSchema = z
    .object({
    receipt_contract: z.literal("sourcey.capture-receipt/v1alpha1"),
    issuer_id: identifier,
    operation_id: operationId,
    job_id: digest,
    base_release_id: digest,
    subject: evidenceReceiptSubjectSchema,
    authority_entity_revision_digest: digest,
    authority_program_revision_digest: digest.nullable(),
    capture_policy_digest: digest,
    review_decision: evidenceReviewDecisionSchema,
    capture: evidenceCaptureDeclarationSchema
        .extend({ bytes: z.number().int().positive() })
        .strict(),
    issued_at: instant,
})
    .strict()
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
export const captureReceiptSchema = captureReceiptCoreSchema
    .extend({
    receipt_digest: digest,
    protected: protectedSignatureSchema,
})
    .strict();
const evidenceAuthorityFileDeclarationSchema = z
    .object({
    sha256: digest,
    bytes: z.number().int().nonnegative(),
})
    .strict();
export const evidenceAuthorityBundleCoreSchema = z
    .object({
    bundle_contract: z.literal("sourcey.evidence-authority-bundle/v1alpha1"),
    proposal_digest: digest,
    review_decision_digest: digest,
    base_release_id: digest,
    capture_receipt_digest: digest,
    revision_digests: z.array(digest).min(1).max(3),
    observation_ids: z.array(digest).min(1).max(2),
    event_ids: z.array(digest).min(1).max(2),
    release_inclusion: z.literal("pending"),
    objects: z.record(z.string(), evidenceAuthorityFileDeclarationSchema),
})
    .strict();
export const evidenceAuthorityBundleManifestSchema = evidenceAuthorityBundleCoreSchema
    .extend({ bundle_digest: digest })
    .strict();
const evidenceAuthoritySetObjectDeclarationSchema = z
    .object({
    digest,
    bytes: z.number().int().nonnegative(),
})
    .strict();
const evidenceAuthoritySetBundleDeclarationSchema = z
    .object({
    proposal_digest: digest,
    bundle_digest: digest,
    manifest: evidenceAuthoritySetObjectDeclarationSchema,
})
    .strict();
export const evidenceAuthoritySetCoreSchema = z
    .object({
    authority_set_contract: z.literal("sourcey.evidence-authority-set/v1alpha1"),
    base_release_id: digest,
    target_signer_registry_digest: digest,
    bundles: z.array(evidenceAuthoritySetBundleDeclarationSchema).min(1),
    objects: z.array(evidenceAuthoritySetObjectDeclarationSchema).min(1),
})
    .strict();
export const evidenceAuthoritySetManifestSchema = evidenceAuthoritySetCoreSchema
    .extend({ authority_set_digest: digest })
    .strict();
//# sourceMappingURL=index.js.map