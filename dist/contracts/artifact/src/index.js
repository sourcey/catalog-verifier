import { publicationChangeSchema } from "provenry/contracts/publication";
import { DIGEST_PATTERN, IDENTIFIER_PATTERN, SLUG_PATTERN } from "provenry/primitives";
import { z } from "zod";
import { AGENT_READINESS_PROFILE_ID_PATTERN, ENTITY_ID_PATTERN, OFFER_ID_PATTERN, PROGRAM_ID_PATTERN, } from "../../../modules/catalog-primitives/src/index.js";
import { entityIdentityAssuranceSchema, offerTermsAssuranceSchema, } from "../../assurance/src/index.js";
import { evidenceProofKindSchema } from "../../evidence/src/index.js";
import { accessSchema, benefitTextSchema, cashbackValueSchema, catalogUrlSchema, durationValueSchema, economicsSchema, eligibilitySchema, lifecycleStatusSchema, moneyValueSchema, offerRevisionContentSchema, offerRolesSchema, percentageValueSchema, programRevisionContentSchema, } from "../../revisions/src/index.js";
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
    freshness: z.enum(["fresh", "stale", "unknown"]),
    dispute: z.enum(["none", "open", "resolved"]),
    coverage_policy_digest: digest,
    freshness_policy_digest: digest,
    basis_event_ids: z.array(digest),
    fields: z.array(fieldCoverageSchema).min(1),
    vendor_attestation: z.discriminatedUnion("status", [
        z.object({ status: z.literal("none") }).strict(),
        z
            .object({
            status: z.literal("current"),
            event_id: digest,
            attested_at: instant,
        })
            .strict(),
    ]),
})
    .strict();
export const OFFER_HEADLINE_RULE = "sourcey.offer-headline/v1";
/**
 * The one figure an offer leads with, projected at release time from its
 * accepted benefits and never part of the revision digest. `typed` names the
 * benefit the author typed; `described` is the exact deterministic reading of
 * an accepted benefit description under the named rule, so every clause binds
 * an already accepted claim. An offer whose benefits state no figure carries
 * no headline.
 */
export const offerHeadlineFigureSchema = z.discriminatedUnion("kind", [
    z
        .object({
        kind: z.literal("credit"),
        value: moneyValueSchema,
        duration: durationValueSchema.optional(),
    })
        .strict(),
    z
        .object({
        kind: z.literal("discount"),
        percentage: percentageValueSchema,
        applies_to: benefitTextSchema.optional(),
        duration: durationValueSchema.optional(),
    })
        .strict(),
    z
        .object({
        kind: z.literal("cashback"),
        value: cashbackValueSchema,
        duration: durationValueSchema.optional(),
    })
        .strict(),
    z
        .object({
        kind: z.literal("free-service"),
        service: benefitTextSchema.optional(),
        duration: durationValueSchema,
    })
        .strict(),
    z.object({ kind: z.literal("waiver"), waived_item: benefitTextSchema }).strict(),
]);
export const offerHeadlineSchema = z
    .object({
    rule: z.literal(OFFER_HEADLINE_RULE),
    benefit_id: identifier,
    basis: z.enum(["typed", "described"]),
    figure: offerHeadlineFigureSchema,
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
    terms_assurance: offerTermsAssuranceSchema.optional(),
    headline: offerHeadlineSchema.optional(),
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
    identity_assurance: entityIdentityAssuranceSchema.optional(),
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
    "agent-readiness.relocated",
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
export const releaseChangeSchema = publicationChangeSchema({
    kind: releaseChangeKindSchema,
    subjectTypes: [
        "entity",
        "program",
        "offer",
        "policy",
        "agent_readiness_profile",
        "asset_binding",
    ],
    tombstone: z
        .object({
        reason: z.enum(["retired", "ended", "withdrawn"]),
        canonical_route: z.string().startsWith("/").optional(),
    })
        .strict(),
});
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
    capture_receipts: z.record(z.string(), captureReceiptInclusionSchema),
})
    .strict();
/** One subject moved from its old owning Entity to a new one by one event. */
const reparentSchema = z
    .object({
    old_entity_id: entityId,
    new_entity_id: entityId,
    event_id: digest,
})
    .strict();
export const identityIndexSchema = z
    .object({
    identity_contract: z.literal("sourcey.identities/v1alpha1"),
    canonical_entity_resolutions: z.record(z.string(), entityId),
    canonical_program_resolutions: z.record(z.string(), programId),
    canonical_offer_resolutions: z.record(z.string(), offerId),
    canonical_agent_readiness_profile_resolutions: z.record(z.string(), agentReadinessProfileId),
    program_reparents: z.record(z.string(), reparentSchema),
    offer_reparents: z.record(z.string(), reparentSchema),
    agent_readiness_profile_reparents: z.record(z.string(), reparentSchema),
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