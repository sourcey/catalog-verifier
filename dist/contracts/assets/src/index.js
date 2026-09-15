import { z } from "zod";
import { digest as canonicalDigest, DIGEST_PATTERN, ENTITY_ID_PATTERN, IDENTIFIER_PATTERN, } from "../../../modules/primitives/src/index.js";
import { decisionBasisSchema } from "../../authority/src/index.js";
const digest = z.string().regex(DIGEST_PATTERN);
const entityId = z.string().regex(ENTITY_ID_PATTERN);
const identifier = z.string().regex(IDENTIFIER_PATTERN);
const instant = z.iso.datetime({ offset: true });
const httpsUrl = z.url({ protocol: /^https$/ });
const relativePath = z
    .string()
    .min(1)
    .refine((value) => !value.startsWith("/") &&
    !value.includes("\\") &&
    value.split("/").every((segment) => segment && segment !== "." && segment !== ".."), "Asset paths must be normalized relative paths.");
const fileDeclaration = z
    .object({ sha256: digest, bytes: z.number().int().nonnegative() })
    .strict();
export const ENTITY_ICON_MAX_SOURCE_BYTES = 2 * 1024 * 1024;
export const ENTITY_ICON_RASTER_PROFILE_VERSION = "entity-icon-png-256-v1";
export const SOURCEY_ENTITY_MONOGRAM_PROFILE_VERSION = "sourcey-entity-monogram-svg-256-v1";
export const assetRoleSchema = z.enum(["logo-light", "logo-dark", "icon"]);
export const assetMediaTypeSchema = z.enum([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml",
]);
export const entityIconRoleSchema = z.literal("icon");
export const assetRedistributionSchema = z
    .object({
    basis: z.enum([
        "vendor-approved",
        "redistributable-license",
        "nominative-use",
        "sourcey-owned",
    ]),
    license: z.string().trim().min(1),
    notice: z.string().trim().min(1),
    trademark_owner: z.string().trim().min(1),
    fallback_reason: z.string().trim().min(1).optional(),
})
    .strict()
    .superRefine((value, context) => {
    if ((value.basis === "sourcey-owned") !== (value.fallback_reason !== undefined)) {
        context.addIssue({
            code: "custom",
            path: ["fallback_reason"],
            message: "Exactly a Sourcey-owned fallback requires a retained fallback reason.",
        });
    }
});
/** Public transport input. Upload bytes are retained before this reference is accepted. */
export const entityAssetSubmissionSourceSchema = z.discriminatedUnion("kind", [
    z
        .object({
        kind: z.literal("upload"),
        upload_receipt_digest: digest,
        original_digest: digest,
        bytes: z.number().int().positive(),
        media_type: assetMediaTypeSchema,
    })
        .strict(),
    z
        .object({
        kind: z.literal("official_url"),
        url: httpsUrl,
    })
        .strict(),
]);
export const entityAssetUploadHeadersSchema = z.looseObject({
    "content-type": assetMediaTypeSchema,
    "x-sourcey-object-digest": digest,
});
export const entityAssetUploadReceiptCoreSchema = z
    .object({
    receipt_contract: z.literal("sourcey.entity-asset-upload-receipt/v1alpha1"),
    actor_id: z.string().min(1),
    authentication_digest: digest,
    original_digest: digest,
    bytes: z.number().int().positive().max(ENTITY_ICON_MAX_SOURCE_BYTES),
    media_type: assetMediaTypeSchema,
    storage_receipt_digest: digest,
    retained_at: instant,
})
    .strict();
export const entityAssetUploadReceiptSchema = entityAssetUploadReceiptCoreSchema
    .extend({ upload_receipt_digest: digest })
    .strict();
export const entityAssetSubmissionSchema = z
    .object({
    entity_id: entityId,
    role: entityIconRoleSchema,
    source: entityAssetSubmissionSourceSchema,
    redistribution: assetRedistributionSchema,
    submitter_context: z
        .object({
        relationship: z.enum(["vendor-representative", "community-contributor"]),
        authority_asserted: z.boolean(),
    })
        .strict()
        .superRefine((value, context) => {
        if ((value.relationship === "vendor-representative") !== value.authority_asserted) {
            context.addIssue({
                code: "custom",
                path: ["authority_asserted"],
                message: "Only a self-described vendor representative may assert authority.",
            });
        }
    }),
    expected_current_binding_event_id: digest.nullable(),
})
    .strict()
    .superRefine((value, context) => {
    if (value.redistribution.basis !== "nominative-use") {
        context.addIssue({
            code: "custom",
            path: ["redistribution", "basis"],
            message: "Public Entity asset intake is an editorial candidate; vendor, licensed-source, and Sourcey-owned authority require their governed admission lanes.",
        });
    }
});
const retainedAssetCaptureSourceSchema = z.discriminatedUnion("kind", [
    z
        .object({
        kind: z.literal("upload"),
        upload_receipt_digest: digest,
    })
        .strict(),
    z
        .object({
        kind: z.literal("official_url"),
        requested_url: httpsUrl,
        final_url: httpsUrl,
        redirect_count: z.number().int().nonnegative().max(5),
        capture_receipt_digest: digest,
    })
        .strict(),
    z
        .object({
        kind: z.literal("sourcey_fallback"),
        generation_rule: z.literal("sourcey.entity-monogram-5x7/v1"),
        fallback_reason_digest: digest,
    })
        .strict(),
]);
export const retainedAssetCaptureCoreSchema = z
    .object({
    capture_contract: z.literal("sourcey.retained-asset-capture/v1alpha1"),
    source: retainedAssetCaptureSourceSchema,
    original_digest: digest,
    bytes: z.number().int().positive().max(ENTITY_ICON_MAX_SOURCE_BYTES),
    media_type: assetMediaTypeSchema,
    captured_at: instant,
    storage_receipt_digest: digest,
})
    .strict();
export const retainedAssetCaptureSchema = retainedAssetCaptureCoreSchema
    .extend({ capture_digest: digest })
    .strict();
export const assetByteReferenceSchema = z
    .object({
    digest,
    bytes: z.number().int().nonnegative(),
    media_type: assetMediaTypeSchema,
    source_path: relativePath,
})
    .strict();
export const assetTransformProfileCoreSchema = z
    .object({
    profile_contract: z.literal("sourcey.asset-transform-profile/v1alpha1"),
    profile_version: z.string().min(1),
    toolchain_digest: digest,
    output_media_type: assetMediaTypeSchema,
    maximum_width: z.number().int().positive(),
    maximum_height: z.number().int().positive(),
    maximum_source_aspect_ratio: z.number().min(1).nullable(),
    strip_metadata: z.literal(true),
    reject_active_content: z.literal(true),
})
    .strict();
export const assetTransformProfileSchema = assetTransformProfileCoreSchema
    .extend({ profile_digest: digest })
    .strict();
export const assetTransformReceiptCoreSchema = z
    .object({
    receipt_contract: z.literal("sourcey.asset-transform-receipt/v1alpha1"),
    original_digest: digest,
    safe_digest: digest,
    profile_digest: digest,
    toolchain_digest: digest,
})
    .strict();
export const assetTransformReceiptSchema = assetTransformReceiptCoreSchema
    .extend({ receipt_digest: digest })
    .strict();
export const assetSafeVariantSchema = assetByteReferenceSchema
    .extend({
    served_path: relativePath,
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    transform_profile_digest: digest,
    transform_receipt_digest: digest,
})
    .strict();
export const assetObjectCoreSchema = z
    .object({
    asset_contract: z.literal("sourcey.asset/v1alpha1"),
    original: assetByteReferenceSchema,
    safe_variants: z.array(assetSafeVariantSchema).min(1),
    transform_receipts: z.array(assetTransformReceiptSchema).min(1),
    redistribution: assetRedistributionSchema,
})
    .strict();
export const assetObjectSchema = assetObjectCoreSchema
    .extend({ asset_object_digest: digest })
    .strict();
export const assetManifestSchema = z
    .object({
    manifest_contract: z.literal("sourcey.asset-manifest/v1alpha1"),
    transform_profiles: z.array(assetTransformProfileSchema),
    objects: z.array(assetObjectSchema),
})
    .strict();
export const assetBindingProjectionSchema = z
    .object({
    entity_id: entityId,
    role: assetRoleSchema,
    asset_object_digest: digest,
    served_digest: digest,
    served_path: z.string().startsWith("assets/sha256/"),
    media_type: assetMediaTypeSchema,
    bytes: z.number().int().nonnegative(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    authority_basis: z.enum([
        "vendor-authority",
        "editorial-review",
        "licensed-source",
        "sourcey-owned",
    ]),
    authority_claim_id: z.string().min(1).optional(),
    approval_receipt_digest: digest,
    source_basis: z.string().min(1),
    license_basis: z.string().min(1),
    effective_from: instant,
    effective_until: instant.optional(),
    binding_event_id: digest,
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
    if (value.effective_until && value.effective_until <= value.effective_from) {
        context.addIssue({
            code: "custom",
            path: ["effective_until"],
            message: "Asset binding expiry must follow its effective time.",
        });
    }
});
export const entityAssetReviewArtifactCoreSchema = z
    .object({
    review_contract: z.literal("sourcey.entity-asset-review/v1alpha1"),
    base_release_id: digest,
    entity_id: entityId,
    role: entityIconRoleSchema,
    capture_digest: digest,
    served_digest: digest,
    redistribution: assetRedistributionSchema,
    authority_basis: z.enum([
        "vendor-authority",
        "editorial-review",
        "licensed-source",
        "sourcey-owned",
    ]),
    source_basis: z.string().trim().min(1),
    decision: z.literal("approved"),
    decision_basis: decisionBasisSchema,
    decided_at: instant,
    rationale: z.string().trim().min(1),
})
    .strict();
export const entityAssetReviewArtifactSchema = entityAssetReviewArtifactCoreSchema
    .extend({ review_artifact_digest: digest })
    .strict();
/**
 * Pre-decision closure for the unattended Sourcey-owned fallback. The policy
 * evaluates this candidate digest first; only then can its receipt become the
 * review decision basis and produce the ordinary Entity asset proposal.
 */
export const sourceyOwnedEntityIconCandidateCoreSchema = z
    .object({
    candidate_contract: z.literal("sourcey.sourcey-owned-entity-icon-candidate/v1alpha1"),
    base_release_id: digest,
    entity_id: entityId,
    entity_revision_digest: digest,
    entity_name: z.string().min(1),
    expected_current_binding_event_id: digest.nullable(),
    generation_rule: z.literal("sourcey.entity-monogram-5x7/v1"),
    fallback_reason: z.string().trim().min(1),
    fallback_reason_digest: digest,
    capture: retainedAssetCaptureSchema,
    transform_profile: assetTransformProfileSchema,
    served_digest: digest,
    safe_storage_receipt_digest: digest,
    prepared_at: instant,
})
    .strict()
    .superRefine((value, context) => {
    if (value.capture.source.kind !== "sourcey_fallback" ||
        value.capture.source.generation_rule !== value.generation_rule ||
        value.capture.source.fallback_reason_digest !== value.fallback_reason_digest) {
        context.addIssue({
            code: "custom",
            path: ["capture", "source"],
            message: "Sourcey-owned icon candidate must bind its exact fallback generation input.",
        });
    }
    const expectedReasonDigest = canonicalDigest({
        reason_contract: "sourcey.entity-icon-fallback-reason/v1alpha1",
        entity_id: value.entity_id,
        reason: value.fallback_reason,
    });
    if (value.fallback_reason_digest !== expectedReasonDigest) {
        context.addIssue({
            code: "custom",
            path: ["fallback_reason_digest"],
            message: "Sourcey-owned icon candidate fallback reason is not content addressed.",
        });
    }
    if (value.transform_profile.profile_version !== SOURCEY_ENTITY_MONOGRAM_PROFILE_VERSION ||
        value.transform_profile.output_media_type !== "image/svg+xml" ||
        value.transform_profile.maximum_width !== 256 ||
        value.transform_profile.maximum_height !== 256 ||
        value.transform_profile.maximum_source_aspect_ratio !== 1) {
        context.addIssue({
            code: "custom",
            path: ["transform_profile"],
            message: "Sourcey-owned icon candidate must bind the canonical generated-vector profile.",
        });
    }
});
export const sourceyOwnedEntityIconCandidateSchema = sourceyOwnedEntityIconCandidateCoreSchema
    .extend({ candidate_digest: digest })
    .strict();
export const entityAssetProposalCoreSchema = z
    .object({
    proposal_contract: z.literal("sourcey.entity-asset-proposal/v1alpha1"),
    base_release_id: digest,
    entity_id: entityId,
    role: entityIconRoleSchema,
    expected_current_binding_event_id: digest.nullable(),
    capture: retainedAssetCaptureSchema,
    transform_profile: assetTransformProfileSchema,
    asset: assetObjectSchema,
    served_digest: digest,
    safe_storage_receipt_digest: digest,
    authority_basis: z.enum([
        "vendor-authority",
        "editorial-review",
        "licensed-source",
        "sourcey-owned",
    ]),
    authority_claim_id: z.string().min(1).optional(),
    source_basis: z.string().trim().min(1),
    approval_scope: z.literal("entity-icon"),
    review: entityAssetReviewArtifactSchema,
    effective_from: instant,
})
    .strict()
    .superRefine((value, context) => {
    const served = value.asset.safe_variants.find((variant) => variant.digest === value.served_digest);
    if (!served) {
        context.addIssue({
            code: "custom",
            path: ["served_digest"],
            message: "Entity asset proposal must serve one exact safe variant.",
        });
    }
    if ((value.authority_basis === "vendor-authority") !== Boolean(value.authority_claim_id)) {
        context.addIssue({
            code: "custom",
            path: ["authority_claim_id"],
            message: "Exactly vendor authority requires an authority claim ID.",
        });
    }
    if ((value.authority_basis === "sourcey-owned") !==
        (value.asset.redistribution.basis === "sourcey-owned")) {
        context.addIssue({
            code: "custom",
            path: ["authority_basis"],
            message: "Sourcey-owned authority and redistribution basis must agree.",
        });
    }
    const sourceyFallback = value.capture.source.kind === "sourcey_fallback";
    if (sourceyFallback !== (value.authority_basis === "sourcey-owned")) {
        context.addIssue({
            code: "custom",
            path: ["capture", "source", "kind"],
            message: "Exactly a Sourcey-generated fallback requires Sourcey-owned authority.",
        });
    }
    if (value.capture.source.kind === "sourcey_fallback") {
        const fallbackReason = value.asset.redistribution.fallback_reason;
        const expectedReasonDigest = fallbackReason
            ? canonicalDigest({
                reason_contract: "sourcey.entity-icon-fallback-reason/v1alpha1",
                entity_id: value.entity_id,
                reason: fallbackReason,
            })
            : null;
        if (value.capture.source.fallback_reason_digest !== expectedReasonDigest) {
            context.addIssue({
                code: "custom",
                path: ["capture", "source", "fallback_reason_digest"],
                message: "Sourcey fallback capture must bind its exact retained fallback reason.",
            });
        }
    }
    const expectedRedistribution = value.authority_basis === "vendor-authority"
        ? "vendor-approved"
        : value.authority_basis === "licensed-source"
            ? "redistributable-license"
            : value.authority_basis === "editorial-review"
                ? "nominative-use"
                : "sourcey-owned";
    if (value.asset.redistribution.basis !== expectedRedistribution) {
        context.addIssue({
            code: "custom",
            path: ["asset", "redistribution", "basis"],
            message: "Entity asset authority and redistribution basis must agree.",
        });
    }
    if (value.review.base_release_id !== value.base_release_id ||
        value.review.entity_id !== value.entity_id ||
        value.review.role !== value.role ||
        value.review.capture_digest !== value.capture.capture_digest ||
        value.review.served_digest !== value.served_digest ||
        value.review.authority_basis !== value.authority_basis ||
        value.review.source_basis !== value.source_basis ||
        value.review.redistribution.basis !== value.asset.redistribution.basis ||
        value.review.redistribution.license !== value.asset.redistribution.license ||
        value.review.redistribution.notice !== value.asset.redistribution.notice ||
        value.review.redistribution.trademark_owner !== value.asset.redistribution.trademark_owner ||
        value.review.redistribution.fallback_reason !== value.asset.redistribution.fallback_reason) {
        context.addIssue({
            code: "custom",
            path: ["review"],
            message: "Entity asset proposal differs from its exact approved review artifact.",
        });
    }
});
export const entityAssetProposalSchema = entityAssetProposalCoreSchema
    .extend({ proposal_digest: digest })
    .strict();
const assetDeltaUpsertChangeSchema = z
    .object({
    operation: z.literal("upsert"),
    entity_id: entityId,
    role: entityIconRoleSchema,
    prior_binding_event_id: digest.nullable(),
    binding: assetBindingProjectionSchema,
    asset: assetObjectSchema,
    original_path: relativePath,
    safe_variant_path: relativePath,
})
    .strict()
    .superRefine((value, context) => {
    if (value.binding.entity_id !== value.entity_id || value.binding.role !== value.role) {
        context.addIssue({
            code: "custom",
            path: ["binding"],
            message: "Asset delta binding differs from its exact Entity and role.",
        });
    }
    if (value.binding.asset_object_digest !== value.asset.asset_object_digest) {
        context.addIssue({
            code: "custom",
            path: ["asset"],
            message: "Asset delta object differs from its binding.",
        });
    }
});
const assetDeltaRemoveChangeSchema = z
    .object({
    operation: z.literal("remove"),
    entity_id: entityId,
    role: entityIconRoleSchema,
    prior_binding_event_id: digest,
    prior_binding_digest: digest,
    disposition_event_id: digest,
})
    .strict();
export const assetDeltaChangeSchema = z.discriminatedUnion("operation", [
    assetDeltaUpsertChangeSchema,
    assetDeltaRemoveChangeSchema,
]);
export const assetDeltaCoreSchema = z
    .object({
    delta_contract: z.literal("sourcey.asset-delta/v1alpha1"),
    parent_asset_index_digest: digest,
    changes: z.array(assetDeltaChangeSchema),
})
    .strict();
export const assetDeltaSchema = assetDeltaCoreSchema.extend({ delta_digest: digest }).strict();
export const assetAuthorityBundleCoreSchema = z
    .object({
    bundle_contract: z.literal("sourcey.asset-authority-bundle/v1alpha1"),
    publication_proposal_digest: digest,
    base_release_id: digest,
    target_signer_registry_digest: digest,
    issuer_id: identifier,
    materialized_at: instant,
    asset_proposal_digests: z.array(digest).min(1),
    event_ids: z.array(digest).min(1),
    release_inclusion: z.literal("pending"),
    objects: z.record(z.string(), fileDeclaration),
})
    .strict();
export const assetAuthorityBundleManifestSchema = assetAuthorityBundleCoreSchema
    .extend({ bundle_digest: digest })
    .strict();
export const assetIndexSchema = z
    .object({
    asset_index_contract: z.literal("sourcey.asset-index/v1alpha1"),
    bindings: z.array(assetBindingProjectionSchema),
    notices_digest: digest,
})
    .strict();
export const assetNoticesSchema = z
    .object({
    notices_contract: z.literal("sourcey.asset-notices/v1alpha1"),
    notices: z.array(z
        .object({
        asset_object_digest: digest,
        basis: z.string().min(1),
        license: z.string().min(1),
        notice: z.string().min(1),
        trademark_owner: z.string().min(1),
        fallback_reason: z.string().min(1).optional(),
    })
        .strict()),
})
    .strict();
export const assetInputsSchema = z
    .object({
    input_contract: z.literal("sourcey.asset-inputs/v1alpha1"),
    manifest_digest: digest,
    transform_profile_digests: z.array(digest),
    object_digests: z.array(digest),
    original_digests: z.array(digest),
    safe_variant_digests: z.array(digest),
})
    .strict();
export const reviewedEntityAssetSubmissionCoreSchema = z
    .object({
    review_contract: z.literal("sourcey.reviewed-entity-asset-submission/v1alpha1"),
    work_item_digest: digest,
    base_release_id: digest,
    reviewer_id: z.string().regex(/^[a-z][a-z0-9-]*$/),
    decided_at: instant,
    rationale: z.string().trim().min(1),
    proposal_digests: z.array(digest).min(1),
    review_artifact_digests: z.array(digest).min(1),
    objects: z.record(z.string(), fileDeclaration),
})
    .strict();
export const reviewedEntityAssetSubmissionSchema = reviewedEntityAssetSubmissionCoreSchema
    .extend({ submission_review_digest: digest })
    .strict();
//# sourceMappingURL=index.js.map