import { z } from "zod";
import { AGENT_READINESS_PROFILE_ID_PATTERN, DIGEST_PATTERN, ENTITY_ID_PATTERN, IDENTIFIER_PATTERN, OFFER_ID_PATTERN, PROGRAM_ID_PATTERN, SLUG_PATTERN, } from "../../../modules/primitives/src/index.js";
import { evidenceProofKindSchema } from "../../evidence/src/index.js";
import { accessSchema, catalogUrlSchema, economicsSchema, eligibilitySchema, lifecycleStatusSchema, offerRevisionContentSchema, offerRolesSchema, programRevisionContentSchema, } from "../../revisions/src/index.js";
const digest = z.string().regex(DIGEST_PATTERN);
const entityId = z.string().regex(ENTITY_ID_PATTERN);
const programId = z.string().regex(PROGRAM_ID_PATTERN);
const offerId = z.string().regex(OFFER_ID_PATTERN);
const agentReadinessProfileId = z.string().regex(AGENT_READINESS_PROFILE_ID_PATTERN);
const identifier = z.string().regex(IDENTIFIER_PATTERN);
const slug = z.string().regex(SLUG_PATTERN);
const instant = z.iso.datetime({ offset: true });
export const fieldCoverageSchema = z
    .object({
    path: z.string().startsWith("/"),
    supporting_event_ids: z.array(digest),
    contradicting_event_ids: z.array(digest),
    accepted_proof_kinds: z.array(evidenceProofKindSchema).min(1),
    evidence_proof_kinds: z.array(evidenceProofKindSchema),
    latest_observation_at: instant.optional(),
    freshness: z.enum(["fresh", "stale", "unknown"]),
})
    .strict();
export const provenanceSchema = z
    .object({
    tier: z.enum(["observed", "signed", "verified"]),
    freshness: z.enum(["fresh", "stale", "unknown"]),
    dispute: z.enum(["none", "open", "resolved"]),
    coverage_policy_digest: digest,
    freshness_policy_digest: digest,
    basis_event_ids: z.array(digest).min(1),
    fields: z.array(fieldCoverageSchema).min(1),
    attestation_event_id: digest.optional(),
    verification_event_id: digest.optional(),
})
    .strict();
export const compiledOfferSchema = z
    .object({
    program_id: programId.optional(),
    offer_id: offerId,
    slug,
    title: offerRevisionContentSchema.shape.title,
    summary: offerRevisionContentSchema.shape.summary,
    description: offerRevisionContentSchema.shape.description,
    economics: economicsSchema,
    eligibility: eligibilitySchema,
    roles: offerRolesSchema,
    access: accessSchema,
    terms_url: catalogUrlSchema.optional(),
    lifecycle: lifecycleStatusSchema,
    effective_from: instant,
    effective_until: instant.optional(),
    revision_digest: digest,
    provenance: provenanceSchema,
})
    .strict();
export const compiledProgramSchema = z
    .object({
    program_id: programId,
    slug,
    title: programRevisionContentSchema.shape.title,
    summary: programRevisionContentSchema.shape.summary,
    revision_digest: digest,
    provenance: provenanceSchema,
})
    .strict();
export const compiledEntitySchema = z
    .object({
    entity_id: entityId,
    slug,
    slug_aliases: z.array(slug).optional(),
    name: z.string().min(1),
    summary: z.string().min(1).optional(),
    description: z.string().min(1),
    website: catalogUrlSchema,
    category: slug,
    revision_digest: digest,
    provenance: provenanceSchema,
    programs: z.array(compiledProgramSchema),
    offers: z.array(compiledOfferSchema),
})
    .strict();
const sectionHeading = z.string().min(1);
export const policySectionSchema = z.discriminatedUnion("kind", [
    z
        .object({
        kind: z.literal("prose"),
        heading: sectionHeading.optional(),
        paragraphs: z.array(z.string().min(1)).min(1),
    })
        .strict(),
    z
        .object({
        kind: z.literal("clauses"),
        heading: sectionHeading.optional(),
        clauses: z
            .array(z.object({ title: z.string().min(1), body: z.string().min(1) }).strict())
            .min(1),
    })
        .strict(),
    z
        .object({
        kind: z.literal("definitions"),
        heading: sectionHeading.optional(),
        definitions: z
            .array(z.object({ term: z.string().min(1), detail: z.string().min(1) }).strict())
            .min(1),
    })
        .strict(),
    z
        .object({
        kind: z.literal("steps"),
        heading: sectionHeading.optional(),
        steps: z.array(z.string().min(1)).min(1),
    })
        .strict(),
]);
/**
 * The digested core of a public policy record: the normative text is part of
 * the content address, so quoting a policy always quotes an exact revision.
 */
export const policyCoreSchema = z
    .object({
    schema_version: z.literal("sourcey.policy/v1alpha1"),
    slug,
    title: z.string().min(1),
    summary: z.string().min(1),
    sections: z.array(policySectionSchema).min(1),
})
    .strict();
export const compiledPolicySchema = policyCoreSchema
    .extend({
    revision_digest: digest,
})
    .strict();
/**
 * The immutable semantic handoff. It deliberately contains no snapshot or
 * release identity, so it can participate in the snapshot hash without a
 * self-reference.
 */
export const canonicalArtifactCoreSchema = z
    .object({
    artifact_contract: z.literal("sourcey.canonical-artifact/v1alpha1"),
    policy_as_of: instant,
    root_set_digest: digest,
    signer_registry_digest: digest,
    policy_digests: z.record(identifier, digest),
    policies: z.array(compiledPolicySchema),
})
    .strict();
export const canonicalArtifactSchema = canonicalArtifactCoreSchema
    .extend({
    entities: z.array(compiledEntitySchema),
})
    .strict();
export const releaseChangeKindKnownValues = [
    "entity.added",
    "entity.updated",
    "entity.retired",
    "program.added",
    "program.updated",
    "program.retired",
    "offer.added",
    "offer.updated",
    "offer.ended",
    "offer.retired",
    "offer.withdrawn",
    "policy.added",
    "policy.updated",
    "policy.retired",
    "agent-readiness.added",
    "agent-readiness.updated",
    "agent-readiness.regraded",
    "agent-readiness.ended",
    "agent-readiness.withdrawn",
    "asset.bound",
    "asset.updated",
    "asset.withdrawn",
];
export const releaseChangeKindSchema = z
    .string()
    .regex(/^[a-z][a-z0-9-]*(?:\.[a-z][a-z0-9-]*)+$/)
    .meta({
    description: "Append-only release change kind. Known values are examples; new kinds may appear within public API v1.",
    examples: releaseChangeKindKnownValues,
    "x-sourcey-extensible-enum": true,
});
export const releaseChangeSchema = z
    .object({
    change_id: digest,
    kind: releaseChangeKindSchema,
    subject_type: z.enum([
        "entity",
        "program",
        "offer",
        "policy",
        "agent_readiness_profile",
        "asset_binding",
    ]),
    subject_id: z.union([identifier, digest]),
    revision_digest: digest.optional(),
    previous_revision_digest: digest.optional(),
    projection_digest: digest.optional(),
    previous_projection_digest: digest.optional(),
    basis_event_ids: z.array(digest),
    tombstone: z
        .object({
        reason: z.enum(["retired", "ended", "withdrawn"]),
        canonical_route: z.string().startsWith("/").optional(),
    })
        .strict()
        .optional(),
})
    .strict();
export const releaseDiffSchema = z
    .object({
    diff_contract: z.literal("sourcey.release-diff/v1alpha1"),
    parent_snapshot_id: digest.nullable(),
    snapshot_id: digest,
    changes: z.array(releaseChangeSchema),
})
    .strict();
/** Canonical bytes committed by release_core.diff_digest. */
export function encodeReleaseChanges(changes) {
    return changes.length === 0
        ? ""
        : `${changes.map((change) => JSON.stringify(change)).join("\n")}\n`;
}
export const provenanceEntrySchema = z
    .object({
    revision_digest: digest,
    first_inclusion_sequence: z.number().int().positive(),
    event_ids: z.array(digest),
    observation_ids: z.array(digest),
    coverage_policy_digest: digest,
    freshness_policy_digest: digest,
})
    .strict();
export const eventInclusionSchema = z
    .object({
    event_id: digest,
    event_object_digest: digest,
    issuer_id: identifier,
    operation_id: identifier,
    signer_registry_digest: digest,
    first_inclusion_sequence: z.number().int().positive(),
})
    .strict();
export const captureReceiptInclusionSchema = z
    .object({
    receipt_digest: digest,
    receipt_object_digest: digest,
    issuer_id: identifier,
    operation_id: identifier,
    signer_registry_digest: digest,
    first_inclusion_sequence: z.number().int().positive(),
})
    .strict();
export const provenanceIndexSchema = z
    .object({
    provenance_contract: z.literal("sourcey.provenance-index/v1alpha1"),
    revisions: z.record(z.string(), provenanceEntrySchema),
    events: z.record(z.string(), eventInclusionSchema),
    capture_receipts: z.record(z.string(), captureReceiptInclusionSchema).optional(),
})
    .strict();
export const identityIndexSchema = z
    .object({
    identity_contract: z.literal("sourcey.identities/v1alpha1"),
    canonical_entity_resolutions: z.record(z.string(), entityId),
    canonical_program_resolutions: z.record(z.string(), programId),
    canonical_offer_resolutions: z.record(z.string(), offerId),
    canonical_agent_readiness_profile_resolutions: z.record(z.string(), agentReadinessProfileId),
    program_reparents: z
        .record(z.string(), z
        .object({
        old_entity_id: entityId.optional(),
        new_entity_id: entityId,
        event_id: digest,
    })
        .strict())
        .optional(),
    offer_reparents: z
        .record(z.string(), z
        .object({
        old_entity_id: entityId.optional(),
        new_entity_id: entityId,
        event_id: digest,
    })
        .strict())
        .optional(),
    agent_readiness_profile_reparents: z.record(z.string(), z
        .object({
        old_entity_id: entityId,
        new_entity_id: entityId,
        event_id: digest,
    })
        .strict()),
    asset_binding_dispositions: z.record(z.string(), z
        .object({
        disposition: z.enum(["rebind", "end"]),
        event_id: digest,
        replacement_binding_event_id: digest.optional(),
    })
        .strict()),
    split_relationships: z.record(z.string(), z.array(entityId)),
    retired_entities: z.array(entityId),
    retired_programs: z.array(programId),
    retired_offers: z.array(offerId),
    retired_agent_readiness_profiles: z.array(agentReadinessProfileId),
})
    .strict();
export const searchIndexSchema = z
    .object({
    search_contract: z.literal("sourcey.search-index/v1alpha1"),
    records: z.array(z
        .object({
        entity_id: entityId,
        slug,
        text: z.string(),
    })
        .strict()),
})
    .strict();
//# sourceMappingURL=index.js.map