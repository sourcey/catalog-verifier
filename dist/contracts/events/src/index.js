import { z } from "zod";
import { AGENT_READINESS_PROFILE_ID_PATTERN, DIGEST_PATTERN, ENTITY_ID_PATTERN, IDENTIFIER_PATTERN, OFFER_ID_PATTERN, OPERATION_ID_PATTERN, PROGRAM_ID_PATTERN, } from "../../../modules/primitives/src/index.js";
import { protectedSignatureSchema } from "../../authority/src/index.js";
import { evidenceAssertionSchema } from "../../evidence/src/index.js";
const digest = z.string().regex(DIGEST_PATTERN);
const entityId = z.string().regex(ENTITY_ID_PATTERN);
const programId = z.string().regex(PROGRAM_ID_PATTERN);
const offerId = z.string().regex(OFFER_ID_PATTERN);
const agentReadinessProfileId = z.string().regex(AGENT_READINESS_PROFILE_ID_PATTERN);
const identifier = z.string().regex(IDENTIFIER_PATTERN);
const operationId = z.string().regex(OPERATION_ID_PATTERN);
const instant = z.iso.datetime({ offset: true });
const pointer = z.string().regex(/^\/(?:[^~/]|~0|~1)+(?:\/(?:[^~/]|~0|~1)+)*$/);
export const verificationCompletedPayloadCoreSchema = z
    .object({
    verification_id: identifier,
    verifier_id: identifier,
    method_version: z.string().min(1),
    scope: z.enum(["whole-revision", "paths"]),
    verified_paths: z.array(pointer),
    result: z.enum(["pass", "fail", "inconclusive"]),
    receipt_digest: digest,
    checked_at: instant,
    coverage_policy_digest: digest,
})
    .strict();
export function validateVerificationPayloadCoverage(value, context) {
    if (value.scope === "paths" && value.verified_paths.length === 0) {
        context.addIssue({
            code: "custom",
            path: ["verified_paths"],
            message: "Path-scoped verification requires exact verified paths.",
        });
    }
    if (value.scope === "whole-revision" && value.verified_paths.length !== 0) {
        context.addIssue({
            code: "custom",
            path: ["verified_paths"],
            message: "Whole-revision verification must not duplicate path coverage.",
        });
    }
}
export const verificationCompletedPayloadSchema = verificationCompletedPayloadCoreSchema.superRefine(validateVerificationPayloadCoverage);
export const authorityClaimMethodKnownValues = [
    "dns-txt",
    "domain-email",
    "well-known",
    "inbound-dkim",
];
export const authorityClaimMethodSchema = z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .meta({
    description: "Proof method identifier. Known values are examples; new methods may appear without changing the event envelope.",
    examples: authorityClaimMethodKnownValues,
    "x-sourcey-extensible-enum": true,
});
export const eventSubjectSchema = z.discriminatedUnion("subject_type", [
    z
        .object({
        subject_type: z.literal("entity"),
        entity_id: entityId,
        revision_digest: digest.optional(),
    })
        .strict(),
    z
        .object({
        subject_type: z.literal("agent_readiness_profile"),
        entity_id: entityId,
        agent_readiness_profile_id: agentReadinessProfileId,
        revision_digest: digest.optional(),
    })
        .strict(),
    z
        .object({
        subject_type: z.literal("program"),
        entity_id: entityId,
        program_id: programId,
        revision_digest: digest.optional(),
    })
        .strict(),
    z
        .object({
        subject_type: z.literal("offer"),
        entity_id: entityId,
        program_id: programId.optional(),
        offer_id: offerId,
        revision_digest: digest.optional(),
    })
        .strict(),
]);
const identityDispositionSchema = z
    .object({
    aliases: z.array(z.string()).default([]),
    programs: z
        .array(z
        .object({
        program_id: programId,
        disposition: z.enum(["merge", "reparent", "end"]),
        target_entity_id: entityId.optional(),
        target_program_id: programId.optional(),
    })
        .strict())
        .default([]),
    offers: z.array(z
        .object({
        offer_id: offerId,
        disposition: z.enum(["merge", "reparent", "end"]),
        target_entity_id: entityId.optional(),
        target_offer_id: offerId.optional(),
    })
        .strict()),
    agent_readiness_profiles: z
        .array(z
        .object({
        agent_readiness_profile_id: agentReadinessProfileId,
        disposition: z.enum(["merge", "reparent", "end"]),
        target_entity_id: entityId.optional(),
        target_agent_readiness_profile_id: agentReadinessProfileId.optional(),
    })
        .strict())
        .default([]),
    asset_bindings: z
        .array(z
        .object({
        binding_event_id: digest,
        disposition: z.enum(["rebind", "end"]),
        replacement_binding_event_id: digest.optional(),
    })
        .strict())
        .default([]),
})
    .strict();
export const catalogEventPayloadSchemas = {
    "evidence.bound": z
        .object({
        observation_id: digest,
        capture_receipt_digest: digest.optional(),
        normalized_object_digest: digest,
        authority_entity_revision_digest: digest,
        authority_program_revision_digest: digest.nullable(),
        assertions: z.array(evidenceAssertionSchema).min(1).max(128),
        paths: z.array(pointer).min(1),
        polarity: z.enum(["supports", "contradicts"]),
        binding_method: z.string().min(1),
        binding_version: z.string().min(1),
    })
        .strict()
        .superRefine((value, context) => {
        if (value.capture_receipt_digest === undefined &&
            value.binding_method !== "fixture-exact-path") {
            context.addIssue({
                code: "custom",
                path: ["capture_receipt_digest"],
                message: "Non-fixture evidence bindings require an exact capture receipt.",
            });
        }
        if (value.capture_receipt_digest !== undefined &&
            value.binding_method === "fixture-exact-path") {
            context.addIssue({
                code: "custom",
                path: ["binding_method"],
                message: "Fixture evidence bindings cannot claim a protected capture receipt.",
            });
        }
        const assertionPaths = value.assertions.map((assertion) => assertion.path);
        if (JSON.stringify(assertionPaths) !== JSON.stringify(value.paths) ||
            value.assertions.some((assertion) => assertion.polarity !== value.polarity)) {
            context.addIssue({
                code: "custom",
                message: "Evidence binding path projection must match its exact assertions.",
            });
        }
    }),
    "evidence.retracted": z
        .object({
        target_event_id: digest,
        reason_code: z.string().min(1),
        adjudication_evidence_digest: digest,
        replacement_event_id: digest.optional(),
    })
        .strict(),
    "discrepancy.resolved": z
        .object({
        conflicting_event_ids: z.array(digest).min(2),
        outcome: z.enum([
            "support-prevails",
            "contradiction-prevails",
            "both-invalid",
            "new-revision-required",
        ]),
        active_event_ids: z.array(digest),
        replacement_revision_digest: digest.optional(),
        evidence_digests: z.array(digest).min(1),
    })
        .strict(),
    "authority.claimed": z
        .object({
        authority_claim_id: identifier,
        authorized_issuer_id: identifier,
        controlled_domain: z.string().min(1),
        method: authorityClaimMethodSchema,
        proof_digest: digest,
        proven_at: instant,
        recheck_due_at: instant,
    })
        .strict(),
    "authority.rechecked": z
        .object({
        authority_claim_id: identifier,
        checked_at: instant,
        next_recheck_due_at: instant,
    })
        .strict(),
    "authority.revoked": z
        .object({
        authority_claim_id: identifier,
        revoked_at: instant,
        reason_code: z.string().min(1),
    })
        .strict(),
    "authority.superseded": z
        .object({
        old_authority_claim_id: identifier,
        new_authority_claim_id: identifier,
        superseded_at: instant,
    })
        .strict(),
    "subject.attested": z
        .object({
        authority_claim_id: identifier,
        attested_at: instant,
    })
        .strict(),
    "attestation.revoked": z
        .object({
        target_event_id: digest,
        authority_claim_id: identifier,
        revoked_at: instant,
        reason_code: z.string().min(1),
    })
        .strict(),
    "verification.completed": verificationCompletedPayloadSchema,
    "verification.revoked": z
        .object({
        target_event_id: digest,
        revoked_at: instant,
        reason_code: z.string().min(1),
    })
        .strict(),
    "freshness.exception-granted": z
        .object({
        paths: z.array(pointer).min(1),
        valid_until: instant,
        reason_code: z.string().min(1),
        evidence_digest: digest,
    })
        .strict(),
    "freshness.exception-revoked": z
        .object({
        target_event_id: digest,
        revoked_at: instant,
        reason_code: z.string().min(1),
    })
        .strict(),
    "dispute.opened": z
        .object({
        dispute_id: identifier,
        opened_at: instant,
        public_reason_code: z.string().min(1),
        case_digest: digest,
    })
        .strict(),
    "dispute.resolved": z
        .object({
        dispute_id: identifier,
        opened_event_id: digest,
        resolved_at: instant,
        resolution_code: z.string().min(1),
        case_digest: digest,
    })
        .strict(),
    "asset.bound": z
        .object({
        role: z.enum(["logo-light", "logo-dark", "icon"]),
        asset_object_digest: digest,
        served_derivative_digest: digest,
        authority_basis: z.enum([
            "vendor-authority",
            "editorial-review",
            "licensed-source",
            "sourcey-owned",
        ]),
        authority_claim_id: identifier.optional(),
        approval_receipt_digest: digest,
        approval_scope: z.string().min(1),
        source_basis: z.string().min(1),
        license_basis: z.string().min(1),
        effective_from: instant,
        effective_until: instant.optional(),
        superseded_binding_event_id: digest.optional(),
    })
        .strict()
        .superRefine((value, context) => {
        if ((value.authority_basis === "vendor-authority") !== Boolean(value.authority_claim_id)) {
            context.addIssue({
                code: "custom",
                path: ["authority_claim_id"],
                message: "Exactly vendor authority requires an authority claim ID.",
            });
        }
    }),
    "asset.withdrawn": z
        .object({
        target_binding_event_id: digest,
        effective_at: instant,
        reason_code: z.string().min(1),
    })
        .strict(),
    "asset.takedown-ordered": z
        .object({
        target_binding_event_id: digest,
        effective_at: instant,
        public_reason_code: z.string().min(1),
        case_digest: digest,
    })
        .strict(),
    "entity.merged": z
        .object({
        surviving_entity_id: entityId,
        retired_entity_ids: z.array(entityId).min(1),
        disposition: identityDispositionSchema,
        effective_at: instant,
        reason: z.string().min(1),
        evidence_digest: digest,
    })
        .strict(),
    "entity.split": z
        .object({
        original_entity_id: entityId,
        continuing_entity_id: entityId.optional(),
        new_entity_ids: z.array(entityId).min(1),
        disposition: identityDispositionSchema,
        effective_at: instant,
        reason: z.string().min(1),
        evidence_digest: digest,
    })
        .strict(),
    "entity.succeeded": z
        .object({
        predecessor_entity_id: entityId,
        successor_entity_id: entityId,
        relationship_code: z.string().min(1),
        predecessor_retires: z.boolean(),
        disposition: identityDispositionSchema.optional(),
        effective_at: instant,
        evidence_digest: digest,
    })
        .strict(),
    "offer.merged": z
        .object({
        surviving_offer_id: offerId,
        retired_offer_ids: z.array(offerId).min(1),
        entity_id: entityId,
        effective_at: instant,
        reason: z.string().min(1),
    })
        .strict(),
    "program.merged": z
        .object({
        surviving_program_id: programId,
        retired_program_ids: z.array(programId).min(1),
        entity_id: entityId,
        effective_at: instant,
        reason: z.string().min(1),
    })
        .strict(),
    "program.reparented": z
        .object({
        program_id: programId,
        old_entity_id: entityId,
        new_entity_id: entityId,
        valid_from: instant,
        valid_until: instant.optional(),
        continuity_evidence_digest: digest,
    })
        .strict(),
    "offer.reparented": z
        .object({
        offer_id: offerId,
        old_entity_id: entityId,
        new_entity_id: entityId,
        valid_from: instant,
        valid_until: instant.optional(),
        continuity_evidence_digest: digest,
    })
        .strict(),
    "agent-readiness-profile.merged": z
        .object({
        surviving_agent_readiness_profile_id: agentReadinessProfileId,
        retired_agent_readiness_profile_ids: z.array(agentReadinessProfileId).min(1),
        entity_id: entityId,
        effective_at: instant,
        continuity_evidence_digest: digest,
        reason: z.string().min(1),
    })
        .strict(),
    "agent-readiness-profile.reparented": z
        .object({
        agent_readiness_profile_id: agentReadinessProfileId,
        old_entity_id: entityId,
        new_entity_id: entityId,
        valid_from: instant,
        valid_until: instant.optional(),
        continuity_evidence_digest: digest,
    })
        .strict(),
    "agent-readiness-profile.retired": z
        .object({
        agent_readiness_profile_id: agentReadinessProfileId,
        entity_id: entityId,
        effective_at: instant,
        reason_code: z.string().min(1),
    })
        .strict(),
    "identity.transition-superseded": z
        .object({
        target_event_id: digest,
        replacement_event_ids: z.array(digest).min(1),
        corrected_at: instant,
        reason: z.string().min(1),
        evidence_digest: digest,
    })
        .strict(),
    "offer.retired": z
        .object({
        offer_id: offerId,
        entity_id: entityId,
        effective_at: instant,
        reason_code: z.string().min(1),
    })
        .strict(),
    "program.retired": z
        .object({
        program_id: programId,
        entity_id: entityId,
        effective_at: instant,
        reason_code: z.string().min(1),
    })
        .strict(),
};
export const catalogEventKindSchema = z.enum(Object.keys(catalogEventPayloadSchemas));
const catalogEventIdentitySchema = z
    .object({
    event_contract: z.literal("sourcey.catalog-event/v1alpha1"),
    kind: catalogEventKindSchema,
    issuer_id: identifier,
    operation_id: operationId,
    subject: eventSubjectSchema,
    occurred_at: instant,
    payload: z.unknown(),
})
    .strict()
    .superRefine((value, context) => {
    const schema = catalogEventPayloadSchemas[value.kind];
    const parsed = schema.safeParse(value.payload);
    if (!parsed.success) {
        for (const issue of parsed.error.issues) {
            context.addIssue({
                ...issue,
                path: ["payload", ...issue.path],
            });
        }
    }
    if (value.kind === "evidence.bound" && parsed.success) {
        const payload = parsed.data;
        const requiresProgramAuthority = value.subject.subject_type === "offer" && value.subject.program_id !== undefined;
        if (requiresProgramAuthority !== (payload.authority_program_revision_digest !== null)) {
            context.addIssue({
                code: "custom",
                path: ["payload", "authority_program_revision_digest"],
                message: requiresProgramAuthority
                    ? "Program-backed Offer evidence must bind the exact authority Program revision."
                    : "Only Program-backed Offer evidence may bind an authority Program revision.",
            });
        }
    }
    const requiresRevision = [
        "evidence.bound",
        "evidence.retracted",
        "discrepancy.resolved",
        "subject.attested",
        "attestation.revoked",
        "verification.completed",
        "verification.revoked",
        "freshness.exception-granted",
        "freshness.exception-revoked",
        "dispute.opened",
        "dispute.resolved",
        "offer.retired",
        "program.retired",
        "agent-readiness-profile.retired",
    ].includes(value.kind);
    if (requiresRevision && !value.subject.revision_digest) {
        context.addIssue({
            code: "custom",
            path: ["subject", "revision_digest"],
            message: `${value.kind} must target an exact revision.`,
        });
    }
});
export const catalogEventCoreSchema = catalogEventIdentitySchema;
export const catalogEventIntentSchema = z
    .object({
    event_id: digest,
    core: catalogEventCoreSchema,
})
    .strict();
export const catalogEventSchema = z
    .object({
    event_contract: z.literal("sourcey.catalog-event/v1alpha1"),
    kind: catalogEventKindSchema,
    issuer_id: identifier,
    operation_id: operationId,
    subject: eventSubjectSchema,
    occurred_at: instant,
    payload: z.unknown(),
    event_id: digest,
    protected: protectedSignatureSchema,
})
    .strict()
    .superRefine((value, context) => {
    const core = {
        event_contract: value.event_contract,
        kind: value.kind,
        issuer_id: value.issuer_id,
        operation_id: value.operation_id,
        subject: value.subject,
        occurred_at: value.occurred_at,
        payload: value.payload,
    };
    const parsed = catalogEventCoreSchema.safeParse(core);
    if (!parsed.success) {
        for (const issue of parsed.error.issues) {
            context.addIssue({
                code: "custom",
                path: issue.path,
                message: issue.message,
            });
        }
    }
});
//# sourceMappingURL=index.js.map