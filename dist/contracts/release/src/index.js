import { publicationEnvelopeSchemas, publicationFileDeclarationSchema, publicationResourceDigestsSchema, verifyPublicationBundle, } from "provenry/contracts/publication";
import { DIGEST_PATTERN, digestPathSegment } from "provenry/primitives";
import { z } from "zod";
import { ENTITY_ID_PATTERN } from "../../../modules/catalog-primitives/src/index.js";
import { canonicalArtifactCoreSchema, compiledEntitySchema, identityIndexSchema, provenanceIndexSchema, releaseChangeSchema, } from "../../artifact/src/index.js";
import { entityAuthoringSchema } from "../../authoring/src/index.js";
import { protectedSignatureSchema } from "../../authority/src/index.js";
import { routeIndexSchema } from "../../routes/src/index.js";
const digest = z.string().regex(DIGEST_PATTERN);
const instant = z.iso.datetime({ offset: true });
export const catalogReleaseDeliverySchema = z
    .object({
    bundle_digest: digest,
    artifact_root: z.url({ protocol: /^https$/ }),
    archive_url: z.url({ protocol: /^https$/ }),
    checksum_url: z.url({ protocol: /^https$/ }),
})
    .strict();
/** Sourcey's signed release contract identifiers; the engine owns their envelope shapes. */
export const SOURCEY_PUBLICATION_CONTRACTS = {
    manifest: "sourcey.release-object-manifest/v1alpha1",
    snapshot: "sourcey.snapshot-core/v1alpha1",
    artifact: "sourcey.canonical-artifact/v1alpha1",
    release: "sourcey.release-core/v1alpha1",
    descriptor: "sourcey.release-descriptor/v1alpha1",
    diff: "sourcey.release-diff/v1alpha1",
    bundle: "sourcey.catalog-release-bundle/v1alpha1",
    resourceTransition: "sourcey.projection-transition/v1alpha1",
};
/** The installed envelope schemas of Sourcey's publication instance. */
export const sourceyReleaseEnvelopeSchemas = publicationEnvelopeSchemas(SOURCEY_PUBLICATION_CONTRACTS, releaseChangeSchema);
export const RELEASE_RESOURCES = {
    agentReadinessIndex: "agent-readiness-index",
    agentReadinessInputs: "agent-readiness-inputs",
    agentReadinessOfferRelationIndex: "agent-readiness-offer-relation-index",
    agentReadinessOfferRelationInputs: "agent-readiness-offer-relation-inputs",
    agentReadinessPolicy: "agent-readiness-policy",
    assetIndex: "asset-index",
    assetInputs: "asset-inputs",
    assetManifest: "asset-manifest",
    assuranceMethodPolicy: "assurance-method-policy",
    coveragePolicy: "coverage-policy",
    freshnessPolicy: "freshness-policy",
    identities: "identities",
    observationInputs: "observation-inputs",
    observationManifest: "observation-manifest",
    policyInputs: "policy-inputs",
    provenance: "provenance",
    routes: "routes",
    searchIndex: "search-index",
};
export function releaseResourceDigest(resources, name) {
    const value = resources[name];
    return digest.parse(value);
}
function releaseDigestPath(value) {
    return digestPathSegment(digest.parse(value));
}
export function releaseRootSetObjectPath(rootSetDigest) {
    return `trust/roots/${releaseDigestPath(rootSetDigest)}.json`;
}
export function releaseSignerRegistryObjectPath(signerRegistryDigest) {
    return `trust/registries/${releaseDigestPath(signerRegistryDigest)}.json`;
}
export function releaseTrustTransitionObjectPath(transitionDigest) {
    return `trust/transitions/${releaseDigestPath(transitionDigest)}.json`;
}
export function releasePolicyObjectPath(policyDigest) {
    return `policies/${releaseDigestPath(policyDigest)}.json`;
}
export function releaseCaptureObjectPath(captureDigest) {
    return `captures/${releaseDigestPath(captureDigest)}`;
}
/** A Provenry capture start, the reservation made before the fetch. */
export function releaseCaptureStartObjectPath(startDigest) {
    return `capture-starts/${releaseDigestPath(startDigest)}.json`;
}
/** A Provenry capture attempt, what the fetch returned. */
export function releaseCaptureAttemptObjectPath(attemptDigest) {
    return `capture-attempts/${releaseDigestPath(attemptDigest)}.json`;
}
/** A Provenry capture attestation, the signature that proves a start and its attempt. */
export function releaseCaptureAttestationObjectPath(attestationDigest) {
    return `capture-attestations/${releaseDigestPath(attestationDigest)}.json`;
}
export function releaseNormalizedObjectPath(normalizedDigest) {
    return `evidence/normalized/${releaseDigestPath(normalizedDigest)}`;
}
const catalogDeltaBaseSchema = z
    .object({
    release: sourceyReleaseEnvelopeSchemas.descriptor,
})
    .strict();
const catalogDeltaEntityChangeSchema = z
    .object({
    operation: z.literal("upsert"),
    entity_id: z.string().regex(/^ent_[0-9a-z]+$/),
    prior_projection_digest: digest.nullable(),
    projection_digest: digest,
    path: z.string().regex(/^entities\/ent_[0-9a-z]+\.json$/),
})
    .strict();
export const catalogStateTransitionCoreSchema = z
    .object({
    state_contract: z.literal("sourcey.catalog-state-transition/v1alpha1"),
    parent_state_digest: digest,
    policy_as_of: instant,
    artifact_core: canonicalArtifactCoreSchema,
    entity_changes: z.array(catalogDeltaEntityChangeSchema),
    routes: routeIndexSchema,
    identities: identityIndexSchema,
    provenance: provenanceIndexSchema,
    authority_set_digests: z.array(digest),
    object_manifest_digest: digest,
})
    .strict();
export const catalogDeltaCoreSchema = z
    .object({
    delta_contract: z.literal("sourcey.catalog-delta/v1alpha1"),
    base: catalogDeltaBaseSchema,
    admitted_input_digests: z.array(digest).min(1),
    policy_as_of: instant,
    artifact_core: canonicalArtifactCoreSchema,
    entity_changes: z.array(catalogDeltaEntityChangeSchema),
    routes: routeIndexSchema,
    identities: identityIndexSchema,
    provenance: provenanceIndexSchema,
    authority_set_digests: z.array(digest),
    object_manifest_digest: digest,
    state_digest: digest,
})
    .strict();
export const catalogDeltaSchema = catalogDeltaCoreSchema
    .extend({
    delta_digest: digest,
})
    .strict();
export const catalogDeltaEntityObjectSchema = z
    .object({
    object_contract: z.literal("sourcey.entity-object/v1alpha1"),
    entity: compiledEntitySchema,
    prior_entity: compiledEntitySchema.nullable(),
})
    .strict();
export const catalogDeltaAuthoringObjectSchema = z
    .object({
    object_contract: z.literal("sourcey.authoring-change/v1alpha1"),
    entity_id: z.string().regex(ENTITY_ID_PATTERN),
    authoring: entityAuthoringSchema.nullable(),
    prior_authoring: entityAuthoringSchema.nullable(),
})
    .strict()
    .superRefine((value, context) => {
    if (value.authoring === null && value.prior_authoring === null) {
        context.addIssue({ code: "custom", message: "An authoring change cannot be empty." });
    }
    if (value.authoring?.entity.entity_id !== undefined &&
        value.authoring.entity.entity_id !== value.entity_id) {
        context.addIssue({
            code: "custom",
            path: ["authoring"],
            message: "Entity identity differs.",
        });
    }
    if (value.prior_authoring?.entity.entity_id !== undefined &&
        value.prior_authoring.entity.entity_id !== value.entity_id) {
        context.addIssue({
            code: "custom",
            path: ["prior_authoring"],
            message: "Prior Entity identity differs.",
        });
    }
});
/** Every input a full release closes over; each field is always present. */
export const closedInputSetSchema = z
    .object({
    input_contract: z.literal("sourcey.closed-input-set/v1alpha1"),
    environment: z.enum(["production", "dogfood"]),
    authoring_revisions: z.array(digest),
    event_ids: z.array(digest),
    capture_attestation_digests: z.array(digest),
    evidence_authority_set_digest: digest.nullable(),
    evidence_authority_bundle_digests: z.array(digest),
    resource_digests: publicationResourceDigestsSchema,
    taxonomy_digest: digest,
    root_set_digest: digest,
    signer_registry_digest: digest,
    trust_transition_digest: digest.nullable(),
    parent_release_id: digest.nullable(),
})
    .strict();
/** The observation closure of a full release; each field is always present. */
export const releaseObservationInputsSchema = z
    .object({
    input_contract: z.literal("sourcey.observation-inputs/v1alpha1"),
    manifest_digest: digest,
    pack_digest: digest,
    observation_ids: z.array(digest),
    evidence_authority_set_digest: digest.nullable(),
    evidence_authority_bundle_digests: z.array(digest),
    captures: z.record(z.string(), publicationFileDeclarationSchema),
    normalized_objects: z.record(z.string(), publicationFileDeclarationSchema),
})
    .strict();
/** Verifies the immutable bundle envelope; evidence admission is separate. */
export function verifyCatalogReleaseBundle(input) {
    return verifyPublicationBundle(sourceyReleaseEnvelopeSchemas.bundle, input);
}
/**
 * Stable current-parent metadata used by publication planning. Immutable bundle
 * bytes remain verifier-bound audit evidence and are never a runtime parent
 * parser or migration input.
 */
export const catalogPublicationParentCoreSchema = z
    .object({
    parent_contract: z.literal("sourcey.catalog-publication-parent/v1alpha1"),
    release: sourceyReleaseEnvelopeSchemas.descriptor,
    bundle_digest: digest,
    verifier_digest: digest,
    resource_digests: publicationResourceDigestsSchema,
})
    .strict();
export const catalogPublicationParentSchema = catalogPublicationParentCoreSchema
    .extend({ parent_digest: digest })
    .strict();
export const releasePublicationCoreSchema = z
    .object({
    publication_contract: z.literal("sourcey.release-publication/v1alpha1"),
    bundle_digest: digest,
    release_id: digest,
    release_sequence: z.number().int().positive(),
    snapshot_id: digest,
    parent_release_id: digest.nullable(),
    published_at: instant,
})
    .strict();
export const releasePublicationSchema = releasePublicationCoreSchema
    .extend({
    publication_digest: digest,
    protected: protectedSignatureSchema,
})
    .strict();
//# sourceMappingURL=index.js.map