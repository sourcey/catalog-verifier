import { TextDecoder } from "node:util";
import { canonicalJson, digest, IDENTIFIER_PATTERN, sha256Bytes, } from "provenry/primitives";
import { z } from "zod";
import { sourceyEvidenceCaptureMethodVersion } from "../../../contracts/capture/src/method-names.js";
import { sourceyCaptureMethodRegistry } from "../../../contracts/capture/src/methods.js";
import { EVIDENCE_LOCATORS_PER_ASSERTION_LIMIT, evidenceAssertionSchema, evidenceCaptureDeclarationSchema, evidenceDerivationRuleSchema, evidenceProofKindSchema, evidenceReceiptSubjectSchema, evidenceSourceStandingSchema, } from "../../../contracts/evidence/src/index.js";
import { catalogRevisionContracts, } from "../../../contracts/revisions/src/index.js";
import { evidenceNormalizerSchema, normalizeEvidenceCapture } from "./evidence-normalization.js";
import { hostnameWithinEntityDomains } from "./source-authority.js";
export { EVIDENCE_NORMALIZER, EVIDENCE_NORMALIZER_TOOLCHAIN, evidenceNormalizerSchema, normalizeEvidenceCapture, } from "./evidence-normalization.js";
const digestSchema = z.string().regex(/^sha256:[a-f0-9]{64}$/);
const pointerSchema = z.string().regex(/^\/(?:[^~/]|~0|~1)+(?:\/(?:[^~/]|~0|~1)+)*$/);
const utf8 = new TextDecoder("utf-8", { fatal: true });
const EVIDENCE_SUBMISSION_LIMITS = {
    captureBytes: 10 * 1024 * 1024,
    normalizedBytes: 5 * 1024 * 1024,
    assertions: 128,
    locatorsPerAssertion: EVIDENCE_LOCATORS_PER_ASSERTION_LIMIT,
    redirects: 5,
};
const evidenceSubmissionCaptureSchema = evidenceCaptureDeclarationSchema;
const evidenceSubmissionNormalizationSchema = evidenceNormalizerSchema
    .extend({ object_digest: digestSchema })
    .strict();
export const evidenceSubmissionSchema = z
    .object({
    submission_contract: z.literal("sourcey.evidence-submission/v1alpha1"),
    base_revision_digest: digestSchema,
    capture: evidenceSubmissionCaptureSchema,
    normalization: evidenceSubmissionNormalizationSchema,
    assertions: z.array(evidenceAssertionSchema).min(1).max(EVIDENCE_SUBMISSION_LIMITS.assertions),
})
    .strict();
const reviewValueSchema = z
    .object({
    start_byte: z.number().int().nonnegative(),
    end_byte: z.number().int().positive(),
    value_digest: digestSchema,
    text: z.string().min(1),
})
    .strict();
const evidenceReviewProposalCoreSchema = z
    .object({
    proposal_contract: z.literal("sourcey.evidence-review-proposal/v1alpha1"),
    operation_id: digestSchema,
    job_id: digestSchema,
    target_id: z.string().regex(IDENTIFIER_PATTERN),
    base_release_id: digestSchema,
    capture_policy_digest: digestSchema,
    coverage_policy_digest: digestSchema,
    subject: evidenceReceiptSubjectSchema,
    authority_entity_revision_digest: digestSchema,
    authority_program_revision_digest: digestSchema.nullable(),
    submission: evidenceSubmissionSchema,
    review_projection: z
        .object({
        source_standing: evidenceSourceStandingSchema,
        assertions: z.array(z
            .object({
            path: pointerSchema,
            polarity: z.enum(["supports", "contradicts"]),
            proof_kind: evidenceProofKindSchema,
            derivation_rule: evidenceDerivationRuleSchema.nullable(),
            values: z.array(reviewValueSchema).min(1),
        })
            .strict()),
    })
        .strict(),
})
    .strict()
    .superRefine((value, context) => {
    const requiresProgramAuthority = value.subject.subject_type === "offer" && value.subject.program_id !== undefined;
    if (requiresProgramAuthority !== (value.authority_program_revision_digest !== null)) {
        context.addIssue({
            code: "custom",
            path: ["authority_program_revision_digest"],
            message: requiresProgramAuthority
                ? "Program-backed Offer review proposals require the exact authority Program revision."
                : "Only Program-backed Offer review proposals may carry an authority Program revision.",
        });
    }
});
export const evidenceReviewProposalSchema = evidenceReviewProposalCoreSchema
    .extend({ proposal_digest: digestSchema })
    .strict();
/**
 * Validates the self-contained proposal envelope at a persistence or provider
 * boundary. This intentionally does not claim that the referenced evidence is
 * true; the offline verifier below performs that stronger check from the exact
 * capture, normalized, and revision bytes.
 */
export function validateEvidenceReviewProposalEnvelope(proposal) {
    const parsed = evidenceReviewProposalSchema.parse(proposal);
    const { proposal_digest: proposalDigest, ...core } = parsed;
    if (digest(evidenceReviewProposalCoreSchema.parse(core)) !== proposalDigest) {
        throw new Error("Evidence review proposal digest does not match its canonical core.");
    }
    return parsed;
}
/**
 * The one local-byte verification kernel used by proposal preparation and CI.
 * It has no network, filesystem, provider, signing, or mutation dependency.
 */
export function verifyEvidenceSubmission(input) {
    const submission = evidenceSubmissionSchema.parse(input.submission);
    assertRevisionContentAddressed(input.revision, "subject");
    assertRevisionContentAddressed(input.authorityEntityRevision, "authority entity");
    if (input.authorityProgramRevision) {
        assertRevisionContentAddressed(input.authorityProgramRevision, "authority program");
    }
    if (submission.base_revision_digest !== input.revision.revision_digest) {
        throw new Error("Evidence submission targets a different base revision.");
    }
    assertRevisionAuthorityBindings(input);
    const verifiedCapture = verifyEvidenceCaptureObjects({
        capture: submission.capture,
        normalization: submission.normalization,
        captureBytes: input.captureBytes,
        normalizedBytes: input.normalizedBytes,
    });
    const assertions = verifyEvidenceAssertions({
        assertions: submission.assertions,
        normalizedBytes: input.normalizedBytes,
        revision: input.revision,
    });
    return {
        submission,
        sourceStanding: deriveSourceStanding(submission.capture, input.authorityEntityRevision),
        normalizedBytes: verifiedCapture.normalizedBytes,
        assertions,
    };
}
/**
 * The one byte-level capture verifier used before claim matching and again
 * when accepted matches enter ordinary evidence authority.
 */
export function verifyEvidenceCaptureObjects(input) {
    const capture = evidenceSubmissionCaptureSchema.parse(input.capture);
    const normalization = evidenceSubmissionNormalizationSchema.parse(input.normalization);
    if (input.captureBytes.byteLength > EVIDENCE_SUBMISSION_LIMITS.captureBytes) {
        throw new Error("Evidence capture exceeds the verifier byte limit.");
    }
    if (input.normalizedBytes.byteLength > EVIDENCE_SUBMISSION_LIMITS.normalizedBytes) {
        throw new Error("Evidence normalized object exceeds the verifier byte limit.");
    }
    if (sha256Bytes(input.captureBytes) !== capture.digest) {
        throw new Error("Evidence capture bytes do not match the submission digest.");
    }
    assertCaptureUrls(capture);
    assertRedirectChain(capture);
    const normalized = normalizeEvidenceCapture({
        bytes: input.captureBytes,
        mediaType: capture.media_type,
    });
    if (normalized.digest !== normalization.object_digest ||
        sha256Bytes(input.normalizedBytes) !== normalization.object_digest ||
        Buffer.compare(Buffer.from(normalized.bytes), Buffer.from(input.normalizedBytes)) !== 0) {
        throw new Error("Evidence normalized bytes do not reproduce the declared object.");
    }
    return { capture, normalization, normalizedBytes: normalized.bytes };
}
function assertRevisionContentAddressed(revision, label) {
    const { revision_digest: revisionDigest, ...core } = revision;
    if (digest(core) !== revisionDigest) {
        throw new Error(`Evidence ${label} revision is not content-addressed correctly.`);
    }
}
function assertRevisionAuthorityBindings(input) {
    if (input.revision.entity_id !== input.authorityEntityRevision.entity_id) {
        throw new Error("Evidence submission authority entity does not own the revision.");
    }
    if (input.revision.revision_contract === catalogRevisionContracts.offer) {
        if (input.revision.program_id === undefined) {
            if (input.authorityProgramRevision !== null) {
                throw new Error("A standalone Offer cannot carry an authority Program revision.");
            }
        }
        else if (!input.authorityProgramRevision ||
            input.authorityProgramRevision.entity_id !== input.revision.entity_id ||
            input.authorityProgramRevision.program_id !== input.revision.program_id) {
            throw new Error("Evidence submission authority Program does not own the Program-backed Offer revision.");
        }
    }
    else if (input.authorityProgramRevision !== null) {
        throw new Error("Only Program-backed Offer evidence may carry a Program authority.");
    }
}
function revisionSubject(revision) {
    if (revision.revision_contract === catalogRevisionContracts.offer) {
        return {
            subject_type: "offer",
            entity_id: revision.entity_id,
            ...(revision.program_id === undefined ? {} : { program_id: revision.program_id }),
            offer_id: revision.offer_id,
            revision_digest: revision.revision_digest,
        };
    }
    if (revision.revision_contract === catalogRevisionContracts.program) {
        return {
            subject_type: "program",
            entity_id: revision.entity_id,
            program_id: revision.program_id,
            revision_digest: revision.revision_digest,
        };
    }
    return {
        subject_type: "entity",
        entity_id: revision.entity_id,
        revision_digest: revision.revision_digest,
    };
}
export function verifyEvidenceAssertions(input) {
    const paths = new Set();
    return input.assertions.map((assertion) => {
        if (paths.has(assertion.path)) {
            throw new Error(`Evidence submission repeats path ${assertion.path}.`);
        }
        paths.add(assertion.path);
        if (!pointerExists(input.revision.content, assertion.path)) {
            throw new Error(`Evidence assertion targets missing revision path ${assertion.path}.`);
        }
        const values = assertion.locators.map((locator) => {
            const { start_byte: start, end_byte: end } = locator;
            if (end <= start || end > input.normalizedBytes.byteLength) {
                throw new Error(`Evidence locator for ${assertion.path} is outside normalized bytes.`);
            }
            const located = input.normalizedBytes.slice(start, end);
            if (sha256Bytes(located) !== locator.value_digest) {
                throw new Error(`Evidence locator digest for ${assertion.path} does not match.`);
            }
            const text = utf8.decode(located);
            if (!text.trim())
                throw new Error(`Evidence locator for ${assertion.path} is empty.`);
            return {
                valueDigest: locator.value_digest,
                text,
            };
        });
        return {
            path: assertion.path,
            polarity: assertion.polarity,
            proofKind: assertion.proof_kind,
            derivationRule: assertion.derivation_rule,
            values,
        };
    });
}
export function prepareEvidenceReviewProposal(input) {
    const verified = verifyEvidenceSubmission(input);
    const core = evidenceReviewProposalCoreSchema.parse({
        proposal_contract: "sourcey.evidence-review-proposal/v1alpha1",
        operation_id: input.operationId,
        job_id: input.jobId,
        target_id: input.targetId,
        base_release_id: input.baseReleaseId,
        capture_policy_digest: input.capturePolicyDigest,
        coverage_policy_digest: input.coveragePolicyDigest,
        subject: revisionSubject(input.revision),
        authority_entity_revision_digest: input.authorityEntityRevision.revision_digest,
        authority_program_revision_digest: input.authorityProgramRevision?.revision_digest ?? null,
        submission: verified.submission,
        review_projection: {
            source_standing: verified.sourceStanding,
            assertions: verified.assertions.map((assertion, assertionIndex) => ({
                path: assertion.path,
                polarity: assertion.polarity,
                proof_kind: assertion.proofKind,
                derivation_rule: assertion.derivationRule,
                values: assertion.values.map((value, valueIndex) => {
                    const locator = verified.submission.assertions[assertionIndex]?.locators[valueIndex];
                    if (!locator)
                        throw new Error("Verified evidence locator projection is incomplete.");
                    return {
                        start_byte: locator.start_byte,
                        end_byte: locator.end_byte,
                        value_digest: value.valueDigest,
                        text: value.text,
                    };
                }),
            })),
        },
    });
    return evidenceReviewProposalSchema.parse({
        ...core,
        proposal_digest: digest(core),
    });
}
export function verifyEvidenceReviewProposal(input) {
    const proposal = validateEvidenceReviewProposalEnvelope(input.proposal);
    if (input.expectedBaseReleaseId !== undefined &&
        proposal.base_release_id !== input.expectedBaseReleaseId) {
        throw new Error("Evidence review proposal targets a different base release.");
    }
    const expected = prepareEvidenceReviewProposal({
        operationId: proposal.operation_id,
        jobId: proposal.job_id,
        targetId: proposal.target_id,
        baseReleaseId: proposal.base_release_id,
        capturePolicyDigest: proposal.capture_policy_digest,
        coveragePolicyDigest: proposal.coverage_policy_digest,
        submission: proposal.submission,
        captureBytes: input.captureBytes,
        normalizedBytes: input.normalizedBytes,
        revision: input.revision,
        authorityEntityRevision: input.authorityEntityRevision,
        authorityProgramRevision: input.authorityProgramRevision,
    });
    if (canonicalJson(expected) !== canonicalJson(proposal)) {
        throw new Error("Evidence review proposal is not the deterministic proof projection.");
    }
    return proposal;
}
export function deriveSourceStanding(capture, authorityEntityRevision) {
    const capabilities = sourceyCaptureMethodRegistry.require(capture.method, sourceyEvidenceCaptureMethodVersion).capabilities;
    const historical = capabilities.includes("history-only");
    const manual = capabilities.includes("manual-review");
    const live = capabilities.includes("live-source");
    if (Number(historical) + Number(manual) + Number(live) !== 1) {
        throw new Error(`Capture method ${capture.method} has no unique source-standing capability.`);
    }
    const comparedUrl = historical ? capture.subject_source_url : capture.final_url;
    const hostname = new URL(comparedUrl).hostname.toLowerCase().replace(/\.$/, "");
    const retrievedAt = Date.parse(capture.retrieved_at);
    const firstParty = hostnameWithinEntityDomains(hostname, authorityEntityRevision.content.domains, retrievedAt);
    if (historical) {
        return firstParty ? "archived-first-party" : "archived-third-party";
    }
    if (manual) {
        return firstParty ? "manual-first-party" : "manual-third-party";
    }
    return firstParty ? "live-first-party" : "live-third-party";
}
export function validateEvidenceCaptureDeclaration(capture) {
    assertCaptureUrls(capture);
    assertRedirectChain(capture);
    return capture;
}
function assertCaptureUrls(capture) {
    const urls = [
        capture.subject_source_url,
        capture.requested_url,
        capture.final_url,
        ...capture.redirect_chain.flatMap((redirect) => [redirect.from, redirect.to]),
    ];
    for (const value of urls) {
        const url = new URL(value);
        if (url.username || url.password || url.hash) {
            throw new Error("Evidence capture URLs cannot contain credentials or fragments.");
        }
    }
}
function assertRedirectChain(capture) {
    if (capture.redirect_chain.length === 0) {
        if (capture.requested_url !== capture.final_url) {
            assertHeadlessSameOriginNavigation(capture, capture.requested_url);
        }
        return;
    }
    let expected = capture.requested_url;
    const visited = new Set([expected]);
    for (const redirect of capture.redirect_chain) {
        if (redirect.from !== expected || visited.has(redirect.to)) {
            throw new Error("Evidence redirect chain is discontinuous or cyclic.");
        }
        visited.add(redirect.to);
        expected = redirect.to;
    }
    if (expected !== capture.final_url) {
        assertHeadlessSameOriginNavigation(capture, expected);
    }
}
function assertHeadlessSameOriginNavigation(capture, lastTransportUrl) {
    if (capture.method !== "headless" ||
        new URL(lastTransportUrl).origin !== new URL(capture.final_url).origin) {
        throw new Error("Evidence capture changed URL without a complete redirect or same-origin headless navigation.");
    }
}
function pointerExists(value, pointer) {
    let current = value;
    for (const encoded of pointer.slice(1).split("/")) {
        const segment = encoded.replaceAll("~1", "/").replaceAll("~0", "~");
        if (typeof current !== "object" || current === null || !(segment in current))
            return false;
        current = current[segment];
    }
    return true;
}
//# sourceMappingURL=submission-verifier.js.map