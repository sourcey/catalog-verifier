import { z } from "zod";
import { DIGEST_PATTERN, digestPathSegment, ENTITY_ID_PATTERN, IDENTIFIER_PATTERN, } from "../../../modules/primitives/src/index.js";
import { canonicalArtifactCoreSchema, compiledEntitySchema, identityIndexSchema, provenanceIndexSchema, } from "../../artifact/src/index.js";
import { entityAuthoringSchema } from "../../authoring/src/index.js";
import { protectedSignatureSchema } from "../../authority/src/index.js";
import { routeIndexSchema } from "../../routes/src/index.js";
const digest = z.string().regex(DIGEST_PATTERN);
const resourceName = z.string().regex(IDENTIFIER_PATTERN);
const instant = z.iso.datetime({ offset: true });
const fileDeclaration = z
    .object({
    sha256: digest,
    bytes: z.number().int().nonnegative(),
})
    .strict();
export const catalogReleaseDeliverySchema = z
    .object({
    bundle_digest: digest,
    artifact_root: z.url({ protocol: /^https$/ }),
    archive_url: z.url({ protocol: /^https$/ }),
    checksum_url: z.url({ protocol: /^https$/ }),
})
    .strict();
export function catalogReleaseDelivery(bundleDigest) {
    const exactDigest = digest.parse(bundleDigest);
    const hexadecimal = exactDigest.slice("sha256:".length);
    const archiveName = `sourcey-catalog-release-sha256-${hexadecimal}.tar.gz`;
    const artifactRoot = `https://artifacts.sourcey.com/catalog/releases/sha256-${hexadecimal}`;
    return catalogReleaseDeliverySchema.parse({
        bundle_digest: exactDigest,
        artifact_root: artifactRoot,
        archive_url: `${artifactRoot}/${archiveName}`,
        checksum_url: `${artifactRoot}/${archiveName}.sha256`,
    });
}
export const releaseObjectManifestSchema = z
    .object({
    manifest_contract: z.literal("sourcey.release-object-manifest/v1alpha1"),
    objects: z.record(z.string(), fileDeclaration),
})
    .strict();
/**
 * Stable content-addressed extension surface for release-owned sidecars.
 * Domain records stay strict; adjacent indexes, inputs, and policies bind here
 * so a new capability does not change the release envelope shape.
 */
export const releaseResourceDigestsSchema = z.record(resourceName, digest);
export const RELEASE_RESOURCES = {
    agentReadinessIndex: "agent-readiness-index",
    agentReadinessInputs: "agent-readiness-inputs",
    agentReadinessOfferRelationIndex: "agent-readiness-offer-relation-index",
    agentReadinessOfferRelationInputs: "agent-readiness-offer-relation-inputs",
    agentReadinessPolicy: "agent-readiness-policy",
    assetIndex: "asset-index",
    assetInputs: "asset-inputs",
    assetManifest: "asset-manifest",
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
export function releasePolicyObjectPath(policyDigest) {
    return `policies/${releaseDigestPath(policyDigest)}.json`;
}
export const snapshotCoreSchema = z
    .object({
    snapshot_contract: z.literal("sourcey.snapshot-core/v1alpha1"),
    release_sequence: z.number().int().positive(),
    compiler_version: z.string().min(1),
    artifact_contract: z.literal("sourcey.canonical-artifact/v1alpha1"),
    input_set_digest: digest,
    artifact_digest: digest,
    resource_digests: releaseResourceDigestsSchema,
    root_set_digest: digest,
    signer_registry_digest: digest,
    trust_transition_digest: digest.nullable().optional(),
    policy_as_of: instant,
})
    .strict();
export const releaseCoreSchema = z
    .object({
    release_contract: z.literal("sourcey.release-core/v1alpha1"),
    release_sequence: z.number().int().positive(),
    snapshot_id: digest,
    parent_release_id: digest.nullable(),
    diff_digest: digest,
})
    .strict();
export const releaseDescriptorSchema = z
    .object({
    descriptor_contract: z.literal("sourcey.release-descriptor/v1alpha1"),
    snapshot_core: snapshotCoreSchema,
    snapshot_id: digest,
    release_core: releaseCoreSchema,
    release_id: digest,
})
    .strict();
const catalogDeltaBaseSchema = z
    .object({
    release: releaseDescriptorSchema,
})
    .strict();
const catalogDeltaEntityUpsertSchema = z
    .object({
    operation: z.literal("upsert"),
    entity_id: z.string().regex(/^ent_[0-9a-z]+$/),
    prior_projection_digest: digest.nullable(),
    projection_digest: digest,
    path: z.string().regex(/^entities\/ent_[0-9a-z]+\.json$/),
})
    .strict();
export const catalogDeltaEntityChangeSchema = catalogDeltaEntityUpsertSchema;
export const catalogStateTransitionCoreSchema = z
    .object({
    state_contract: z.literal("sourcey.catalog-state-transition/v1alpha1"),
    parent_state_digest: digest.nullable(),
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
    base: catalogDeltaBaseSchema.nullable(),
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
export const catalogReleaseBundleCoreSchema = z
    .object({
    bundle_contract: z.literal("sourcey.catalog-release-bundle/v1alpha1"),
    admitted_input_digests: z.array(digest).min(1),
    verifier_digest: digest,
    object_manifest_digest: digest,
    release: releaseDescriptorSchema,
    resource_digests: releaseResourceDigestsSchema,
    files: z.record(z.string(), fileDeclaration),
})
    .strict();
export const catalogReleaseBundleSchema = catalogReleaseBundleCoreSchema
    .extend({
    bundle_digest: digest,
})
    .strict();
/**
 * Stable current-parent metadata used by publication planning. Immutable bundle
 * bytes remain verifier-bound audit evidence and are never a runtime parent
 * parser or migration input.
 */
export const catalogPublicationParentCoreSchema = z
    .object({
    parent_contract: z.literal("sourcey.catalog-publication-parent/v1alpha1"),
    release: releaseDescriptorSchema,
    bundle_digest: digest,
    verifier_digest: digest,
    resource_digests: releaseResourceDigestsSchema,
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