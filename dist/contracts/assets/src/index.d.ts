import { z } from "zod";
export declare const ENTITY_ICON_MAX_SOURCE_BYTES: number;
export declare const ENTITY_ICON_RASTER_PROFILE_VERSION = "entity-icon-png-256-v1";
export declare const SOURCEY_ENTITY_MONOGRAM_PROFILE_VERSION = "sourcey-entity-monogram-svg-256-v1";
export declare const assetRoleSchema: z.ZodEnum<{
    "logo-light": "logo-light";
    "logo-dark": "logo-dark";
    icon: "icon";
}>;
export declare const assetMediaTypeSchema: z.ZodEnum<{
    "image/jpeg": "image/jpeg";
    "image/png": "image/png";
    "image/webp": "image/webp";
    "image/svg+xml": "image/svg+xml";
}>;
export declare const entityIconRoleSchema: z.ZodLiteral<"icon">;
export declare const assetRedistributionSchema: z.ZodObject<{
    basis: z.ZodEnum<{
        "vendor-approved": "vendor-approved";
        "redistributable-license": "redistributable-license";
        "nominative-use": "nominative-use";
        "sourcey-owned": "sourcey-owned";
    }>;
    license: z.ZodString;
    notice: z.ZodString;
    trademark_owner: z.ZodString;
    fallback_reason: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/** Public transport input. Upload bytes are retained before this reference is accepted. */
export declare const entityAssetSubmissionSourceSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    kind: z.ZodLiteral<"upload">;
    upload_receipt_digest: z.ZodString;
    original_digest: z.ZodString;
    bytes: z.ZodNumber;
    media_type: z.ZodEnum<{
        "image/jpeg": "image/jpeg";
        "image/png": "image/png";
        "image/webp": "image/webp";
        "image/svg+xml": "image/svg+xml";
    }>;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"official_url">;
    url: z.ZodURL;
}, z.core.$strict>], "kind">;
export declare const entityAssetUploadHeadersSchema: z.ZodObject<{
    "content-type": z.ZodEnum<{
        "image/jpeg": "image/jpeg";
        "image/png": "image/png";
        "image/webp": "image/webp";
        "image/svg+xml": "image/svg+xml";
    }>;
    "x-sourcey-object-digest": z.ZodString;
}, z.core.$loose>;
export declare const entityAssetUploadReceiptCoreSchema: z.ZodObject<{
    receipt_contract: z.ZodLiteral<"sourcey.entity-asset-upload-receipt/v1alpha1">;
    actor_id: z.ZodString;
    authentication_digest: z.ZodString;
    original_digest: z.ZodString;
    bytes: z.ZodNumber;
    media_type: z.ZodEnum<{
        "image/jpeg": "image/jpeg";
        "image/png": "image/png";
        "image/webp": "image/webp";
        "image/svg+xml": "image/svg+xml";
    }>;
    storage_receipt_digest: z.ZodString;
    retained_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const entityAssetUploadReceiptSchema: z.ZodObject<{
    receipt_contract: z.ZodLiteral<"sourcey.entity-asset-upload-receipt/v1alpha1">;
    actor_id: z.ZodString;
    authentication_digest: z.ZodString;
    original_digest: z.ZodString;
    bytes: z.ZodNumber;
    media_type: z.ZodEnum<{
        "image/jpeg": "image/jpeg";
        "image/png": "image/png";
        "image/webp": "image/webp";
        "image/svg+xml": "image/svg+xml";
    }>;
    storage_receipt_digest: z.ZodString;
    retained_at: z.ZodISODateTime;
    upload_receipt_digest: z.ZodString;
}, z.core.$strict>;
export declare const entityAssetSubmissionSchema: z.ZodObject<{
    entity_id: z.ZodString;
    role: z.ZodLiteral<"icon">;
    source: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"upload">;
        upload_receipt_digest: z.ZodString;
        original_digest: z.ZodString;
        bytes: z.ZodNumber;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
            "image/svg+xml": "image/svg+xml";
        }>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"official_url">;
        url: z.ZodURL;
    }, z.core.$strict>], "kind">;
    redistribution: z.ZodObject<{
        basis: z.ZodEnum<{
            "vendor-approved": "vendor-approved";
            "redistributable-license": "redistributable-license";
            "nominative-use": "nominative-use";
            "sourcey-owned": "sourcey-owned";
        }>;
        license: z.ZodString;
        notice: z.ZodString;
        trademark_owner: z.ZodString;
        fallback_reason: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    submitter_context: z.ZodObject<{
        relationship: z.ZodEnum<{
            "vendor-representative": "vendor-representative";
            "community-contributor": "community-contributor";
        }>;
        authority_asserted: z.ZodBoolean;
    }, z.core.$strict>;
    expected_current_binding_event_id: z.ZodNullable<z.ZodString>;
}, z.core.$strict>;
export declare const retainedAssetCaptureCoreSchema: z.ZodObject<{
    capture_contract: z.ZodLiteral<"sourcey.retained-asset-capture/v1alpha1">;
    source: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"upload">;
        upload_receipt_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"official_url">;
        requested_url: z.ZodURL;
        final_url: z.ZodURL;
        redirect_count: z.ZodNumber;
        capture_receipt_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"sourcey_fallback">;
        generation_rule: z.ZodLiteral<"sourcey.entity-monogram-5x7/v1">;
        fallback_reason_digest: z.ZodString;
    }, z.core.$strict>], "kind">;
    original_digest: z.ZodString;
    bytes: z.ZodNumber;
    media_type: z.ZodEnum<{
        "image/jpeg": "image/jpeg";
        "image/png": "image/png";
        "image/webp": "image/webp";
        "image/svg+xml": "image/svg+xml";
    }>;
    captured_at: z.ZodISODateTime;
    storage_receipt_digest: z.ZodString;
}, z.core.$strict>;
export declare const retainedAssetCaptureSchema: z.ZodObject<{
    capture_contract: z.ZodLiteral<"sourcey.retained-asset-capture/v1alpha1">;
    source: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"upload">;
        upload_receipt_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"official_url">;
        requested_url: z.ZodURL;
        final_url: z.ZodURL;
        redirect_count: z.ZodNumber;
        capture_receipt_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"sourcey_fallback">;
        generation_rule: z.ZodLiteral<"sourcey.entity-monogram-5x7/v1">;
        fallback_reason_digest: z.ZodString;
    }, z.core.$strict>], "kind">;
    original_digest: z.ZodString;
    bytes: z.ZodNumber;
    media_type: z.ZodEnum<{
        "image/jpeg": "image/jpeg";
        "image/png": "image/png";
        "image/webp": "image/webp";
        "image/svg+xml": "image/svg+xml";
    }>;
    captured_at: z.ZodISODateTime;
    storage_receipt_digest: z.ZodString;
    capture_digest: z.ZodString;
}, z.core.$strict>;
export declare const assetByteReferenceSchema: z.ZodObject<{
    digest: z.ZodString;
    bytes: z.ZodNumber;
    media_type: z.ZodEnum<{
        "image/jpeg": "image/jpeg";
        "image/png": "image/png";
        "image/webp": "image/webp";
        "image/svg+xml": "image/svg+xml";
    }>;
    source_path: z.ZodString;
}, z.core.$strict>;
export declare const assetTransformProfileCoreSchema: z.ZodObject<{
    profile_contract: z.ZodLiteral<"sourcey.asset-transform-profile/v1alpha1">;
    profile_version: z.ZodString;
    toolchain_digest: z.ZodString;
    output_media_type: z.ZodEnum<{
        "image/jpeg": "image/jpeg";
        "image/png": "image/png";
        "image/webp": "image/webp";
        "image/svg+xml": "image/svg+xml";
    }>;
    maximum_width: z.ZodNumber;
    maximum_height: z.ZodNumber;
    maximum_source_aspect_ratio: z.ZodNullable<z.ZodNumber>;
    strip_metadata: z.ZodLiteral<true>;
    reject_active_content: z.ZodLiteral<true>;
}, z.core.$strict>;
export declare const assetTransformProfileSchema: z.ZodObject<{
    profile_contract: z.ZodLiteral<"sourcey.asset-transform-profile/v1alpha1">;
    profile_version: z.ZodString;
    toolchain_digest: z.ZodString;
    output_media_type: z.ZodEnum<{
        "image/jpeg": "image/jpeg";
        "image/png": "image/png";
        "image/webp": "image/webp";
        "image/svg+xml": "image/svg+xml";
    }>;
    maximum_width: z.ZodNumber;
    maximum_height: z.ZodNumber;
    maximum_source_aspect_ratio: z.ZodNullable<z.ZodNumber>;
    strip_metadata: z.ZodLiteral<true>;
    reject_active_content: z.ZodLiteral<true>;
    profile_digest: z.ZodString;
}, z.core.$strict>;
export declare const assetTransformReceiptCoreSchema: z.ZodObject<{
    receipt_contract: z.ZodLiteral<"sourcey.asset-transform-receipt/v1alpha1">;
    original_digest: z.ZodString;
    safe_digest: z.ZodString;
    profile_digest: z.ZodString;
    toolchain_digest: z.ZodString;
}, z.core.$strict>;
export declare const assetTransformReceiptSchema: z.ZodObject<{
    receipt_contract: z.ZodLiteral<"sourcey.asset-transform-receipt/v1alpha1">;
    original_digest: z.ZodString;
    safe_digest: z.ZodString;
    profile_digest: z.ZodString;
    toolchain_digest: z.ZodString;
    receipt_digest: z.ZodString;
}, z.core.$strict>;
export declare const assetSafeVariantSchema: z.ZodObject<{
    digest: z.ZodString;
    bytes: z.ZodNumber;
    media_type: z.ZodEnum<{
        "image/jpeg": "image/jpeg";
        "image/png": "image/png";
        "image/webp": "image/webp";
        "image/svg+xml": "image/svg+xml";
    }>;
    source_path: z.ZodString;
    served_path: z.ZodString;
    width: z.ZodNumber;
    height: z.ZodNumber;
    transform_profile_digest: z.ZodString;
    transform_receipt_digest: z.ZodString;
}, z.core.$strict>;
export declare const assetObjectCoreSchema: z.ZodObject<{
    asset_contract: z.ZodLiteral<"sourcey.asset/v1alpha1">;
    original: z.ZodObject<{
        digest: z.ZodString;
        bytes: z.ZodNumber;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
            "image/svg+xml": "image/svg+xml";
        }>;
        source_path: z.ZodString;
    }, z.core.$strict>;
    safe_variants: z.ZodArray<z.ZodObject<{
        digest: z.ZodString;
        bytes: z.ZodNumber;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
            "image/svg+xml": "image/svg+xml";
        }>;
        source_path: z.ZodString;
        served_path: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
        transform_profile_digest: z.ZodString;
        transform_receipt_digest: z.ZodString;
    }, z.core.$strict>>;
    transform_receipts: z.ZodArray<z.ZodObject<{
        receipt_contract: z.ZodLiteral<"sourcey.asset-transform-receipt/v1alpha1">;
        original_digest: z.ZodString;
        safe_digest: z.ZodString;
        profile_digest: z.ZodString;
        toolchain_digest: z.ZodString;
        receipt_digest: z.ZodString;
    }, z.core.$strict>>;
    redistribution: z.ZodObject<{
        basis: z.ZodEnum<{
            "vendor-approved": "vendor-approved";
            "redistributable-license": "redistributable-license";
            "nominative-use": "nominative-use";
            "sourcey-owned": "sourcey-owned";
        }>;
        license: z.ZodString;
        notice: z.ZodString;
        trademark_owner: z.ZodString;
        fallback_reason: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const assetObjectSchema: z.ZodObject<{
    asset_contract: z.ZodLiteral<"sourcey.asset/v1alpha1">;
    original: z.ZodObject<{
        digest: z.ZodString;
        bytes: z.ZodNumber;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
            "image/svg+xml": "image/svg+xml";
        }>;
        source_path: z.ZodString;
    }, z.core.$strict>;
    safe_variants: z.ZodArray<z.ZodObject<{
        digest: z.ZodString;
        bytes: z.ZodNumber;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
            "image/svg+xml": "image/svg+xml";
        }>;
        source_path: z.ZodString;
        served_path: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
        transform_profile_digest: z.ZodString;
        transform_receipt_digest: z.ZodString;
    }, z.core.$strict>>;
    transform_receipts: z.ZodArray<z.ZodObject<{
        receipt_contract: z.ZodLiteral<"sourcey.asset-transform-receipt/v1alpha1">;
        original_digest: z.ZodString;
        safe_digest: z.ZodString;
        profile_digest: z.ZodString;
        toolchain_digest: z.ZodString;
        receipt_digest: z.ZodString;
    }, z.core.$strict>>;
    redistribution: z.ZodObject<{
        basis: z.ZodEnum<{
            "vendor-approved": "vendor-approved";
            "redistributable-license": "redistributable-license";
            "nominative-use": "nominative-use";
            "sourcey-owned": "sourcey-owned";
        }>;
        license: z.ZodString;
        notice: z.ZodString;
        trademark_owner: z.ZodString;
        fallback_reason: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    asset_object_digest: z.ZodString;
}, z.core.$strict>;
export declare const assetManifestSchema: z.ZodObject<{
    manifest_contract: z.ZodLiteral<"sourcey.asset-manifest/v1alpha1">;
    transform_profiles: z.ZodArray<z.ZodObject<{
        profile_contract: z.ZodLiteral<"sourcey.asset-transform-profile/v1alpha1">;
        profile_version: z.ZodString;
        toolchain_digest: z.ZodString;
        output_media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
            "image/svg+xml": "image/svg+xml";
        }>;
        maximum_width: z.ZodNumber;
        maximum_height: z.ZodNumber;
        maximum_source_aspect_ratio: z.ZodNullable<z.ZodNumber>;
        strip_metadata: z.ZodLiteral<true>;
        reject_active_content: z.ZodLiteral<true>;
        profile_digest: z.ZodString;
    }, z.core.$strict>>;
    objects: z.ZodArray<z.ZodObject<{
        asset_contract: z.ZodLiteral<"sourcey.asset/v1alpha1">;
        original: z.ZodObject<{
            digest: z.ZodString;
            bytes: z.ZodNumber;
            media_type: z.ZodEnum<{
                "image/jpeg": "image/jpeg";
                "image/png": "image/png";
                "image/webp": "image/webp";
                "image/svg+xml": "image/svg+xml";
            }>;
            source_path: z.ZodString;
        }, z.core.$strict>;
        safe_variants: z.ZodArray<z.ZodObject<{
            digest: z.ZodString;
            bytes: z.ZodNumber;
            media_type: z.ZodEnum<{
                "image/jpeg": "image/jpeg";
                "image/png": "image/png";
                "image/webp": "image/webp";
                "image/svg+xml": "image/svg+xml";
            }>;
            source_path: z.ZodString;
            served_path: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
            transform_profile_digest: z.ZodString;
            transform_receipt_digest: z.ZodString;
        }, z.core.$strict>>;
        transform_receipts: z.ZodArray<z.ZodObject<{
            receipt_contract: z.ZodLiteral<"sourcey.asset-transform-receipt/v1alpha1">;
            original_digest: z.ZodString;
            safe_digest: z.ZodString;
            profile_digest: z.ZodString;
            toolchain_digest: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>>;
        redistribution: z.ZodObject<{
            basis: z.ZodEnum<{
                "vendor-approved": "vendor-approved";
                "redistributable-license": "redistributable-license";
                "nominative-use": "nominative-use";
                "sourcey-owned": "sourcey-owned";
            }>;
            license: z.ZodString;
            notice: z.ZodString;
            trademark_owner: z.ZodString;
            fallback_reason: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        asset_object_digest: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const assetBindingProjectionSchema: z.ZodObject<{
    entity_id: z.ZodString;
    role: z.ZodEnum<{
        "logo-light": "logo-light";
        "logo-dark": "logo-dark";
        icon: "icon";
    }>;
    asset_object_digest: z.ZodString;
    served_digest: z.ZodString;
    served_path: z.ZodString;
    media_type: z.ZodEnum<{
        "image/jpeg": "image/jpeg";
        "image/png": "image/png";
        "image/webp": "image/webp";
        "image/svg+xml": "image/svg+xml";
    }>;
    bytes: z.ZodNumber;
    width: z.ZodNumber;
    height: z.ZodNumber;
    authority_basis: z.ZodEnum<{
        "sourcey-owned": "sourcey-owned";
        "vendor-authority": "vendor-authority";
        "editorial-review": "editorial-review";
        "licensed-source": "licensed-source";
    }>;
    authority_claim_id: z.ZodOptional<z.ZodString>;
    approval_receipt_digest: z.ZodString;
    source_basis: z.ZodString;
    license_basis: z.ZodString;
    effective_from: z.ZodISODateTime;
    effective_until: z.ZodOptional<z.ZodISODateTime>;
    binding_event_id: z.ZodString;
}, z.core.$strict>;
export declare const entityAssetReviewArtifactCoreSchema: z.ZodObject<{
    review_contract: z.ZodLiteral<"sourcey.entity-asset-review/v1alpha1">;
    base_release_id: z.ZodString;
    entity_id: z.ZodString;
    role: z.ZodLiteral<"icon">;
    capture_digest: z.ZodString;
    served_digest: z.ZodString;
    redistribution: z.ZodObject<{
        basis: z.ZodEnum<{
            "vendor-approved": "vendor-approved";
            "redistributable-license": "redistributable-license";
            "nominative-use": "nominative-use";
            "sourcey-owned": "sourcey-owned";
        }>;
        license: z.ZodString;
        notice: z.ZodString;
        trademark_owner: z.ZodString;
        fallback_reason: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    authority_basis: z.ZodEnum<{
        "sourcey-owned": "sourcey-owned";
        "vendor-authority": "vendor-authority";
        "editorial-review": "editorial-review";
        "licensed-source": "licensed-source";
    }>;
    source_basis: z.ZodString;
    decision: z.ZodLiteral<"approved">;
    decision_basis: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"human">;
        actor_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"policy">;
        policy_id: z.ZodString;
        policy_digest: z.ZodString;
        evaluator_id: z.ZodString;
        evaluator_digest: z.ZodString;
        input_digest: z.ZodString;
        execution_receipt_digest: z.ZodString;
    }, z.core.$strict>], "kind">;
    decided_at: z.ZodISODateTime;
    rationale: z.ZodString;
}, z.core.$strict>;
export declare const entityAssetReviewArtifactSchema: z.ZodObject<{
    review_contract: z.ZodLiteral<"sourcey.entity-asset-review/v1alpha1">;
    base_release_id: z.ZodString;
    entity_id: z.ZodString;
    role: z.ZodLiteral<"icon">;
    capture_digest: z.ZodString;
    served_digest: z.ZodString;
    redistribution: z.ZodObject<{
        basis: z.ZodEnum<{
            "vendor-approved": "vendor-approved";
            "redistributable-license": "redistributable-license";
            "nominative-use": "nominative-use";
            "sourcey-owned": "sourcey-owned";
        }>;
        license: z.ZodString;
        notice: z.ZodString;
        trademark_owner: z.ZodString;
        fallback_reason: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    authority_basis: z.ZodEnum<{
        "sourcey-owned": "sourcey-owned";
        "vendor-authority": "vendor-authority";
        "editorial-review": "editorial-review";
        "licensed-source": "licensed-source";
    }>;
    source_basis: z.ZodString;
    decision: z.ZodLiteral<"approved">;
    decision_basis: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"human">;
        actor_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"policy">;
        policy_id: z.ZodString;
        policy_digest: z.ZodString;
        evaluator_id: z.ZodString;
        evaluator_digest: z.ZodString;
        input_digest: z.ZodString;
        execution_receipt_digest: z.ZodString;
    }, z.core.$strict>], "kind">;
    decided_at: z.ZodISODateTime;
    rationale: z.ZodString;
    review_artifact_digest: z.ZodString;
}, z.core.$strict>;
/**
 * Pre-decision closure for the unattended Sourcey-owned fallback. The policy
 * evaluates this candidate digest first; only then can its receipt become the
 * review decision basis and produce the ordinary Entity asset proposal.
 */
export declare const sourceyOwnedEntityIconCandidateCoreSchema: z.ZodObject<{
    candidate_contract: z.ZodLiteral<"sourcey.sourcey-owned-entity-icon-candidate/v1alpha1">;
    base_release_id: z.ZodString;
    entity_id: z.ZodString;
    entity_revision_digest: z.ZodString;
    entity_name: z.ZodString;
    expected_current_binding_event_id: z.ZodNullable<z.ZodString>;
    generation_rule: z.ZodLiteral<"sourcey.entity-monogram-5x7/v1">;
    fallback_reason: z.ZodString;
    fallback_reason_digest: z.ZodString;
    capture: z.ZodObject<{
        capture_contract: z.ZodLiteral<"sourcey.retained-asset-capture/v1alpha1">;
        source: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"upload">;
            upload_receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"official_url">;
            requested_url: z.ZodURL;
            final_url: z.ZodURL;
            redirect_count: z.ZodNumber;
            capture_receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"sourcey_fallback">;
            generation_rule: z.ZodLiteral<"sourcey.entity-monogram-5x7/v1">;
            fallback_reason_digest: z.ZodString;
        }, z.core.$strict>], "kind">;
        original_digest: z.ZodString;
        bytes: z.ZodNumber;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
            "image/svg+xml": "image/svg+xml";
        }>;
        captured_at: z.ZodISODateTime;
        storage_receipt_digest: z.ZodString;
        capture_digest: z.ZodString;
    }, z.core.$strict>;
    transform_profile: z.ZodObject<{
        profile_contract: z.ZodLiteral<"sourcey.asset-transform-profile/v1alpha1">;
        profile_version: z.ZodString;
        toolchain_digest: z.ZodString;
        output_media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
            "image/svg+xml": "image/svg+xml";
        }>;
        maximum_width: z.ZodNumber;
        maximum_height: z.ZodNumber;
        maximum_source_aspect_ratio: z.ZodNullable<z.ZodNumber>;
        strip_metadata: z.ZodLiteral<true>;
        reject_active_content: z.ZodLiteral<true>;
        profile_digest: z.ZodString;
    }, z.core.$strict>;
    served_digest: z.ZodString;
    safe_storage_receipt_digest: z.ZodString;
    prepared_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const sourceyOwnedEntityIconCandidateSchema: z.ZodObject<{
    candidate_contract: z.ZodLiteral<"sourcey.sourcey-owned-entity-icon-candidate/v1alpha1">;
    base_release_id: z.ZodString;
    entity_id: z.ZodString;
    entity_revision_digest: z.ZodString;
    entity_name: z.ZodString;
    expected_current_binding_event_id: z.ZodNullable<z.ZodString>;
    generation_rule: z.ZodLiteral<"sourcey.entity-monogram-5x7/v1">;
    fallback_reason: z.ZodString;
    fallback_reason_digest: z.ZodString;
    capture: z.ZodObject<{
        capture_contract: z.ZodLiteral<"sourcey.retained-asset-capture/v1alpha1">;
        source: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"upload">;
            upload_receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"official_url">;
            requested_url: z.ZodURL;
            final_url: z.ZodURL;
            redirect_count: z.ZodNumber;
            capture_receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"sourcey_fallback">;
            generation_rule: z.ZodLiteral<"sourcey.entity-monogram-5x7/v1">;
            fallback_reason_digest: z.ZodString;
        }, z.core.$strict>], "kind">;
        original_digest: z.ZodString;
        bytes: z.ZodNumber;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
            "image/svg+xml": "image/svg+xml";
        }>;
        captured_at: z.ZodISODateTime;
        storage_receipt_digest: z.ZodString;
        capture_digest: z.ZodString;
    }, z.core.$strict>;
    transform_profile: z.ZodObject<{
        profile_contract: z.ZodLiteral<"sourcey.asset-transform-profile/v1alpha1">;
        profile_version: z.ZodString;
        toolchain_digest: z.ZodString;
        output_media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
            "image/svg+xml": "image/svg+xml";
        }>;
        maximum_width: z.ZodNumber;
        maximum_height: z.ZodNumber;
        maximum_source_aspect_ratio: z.ZodNullable<z.ZodNumber>;
        strip_metadata: z.ZodLiteral<true>;
        reject_active_content: z.ZodLiteral<true>;
        profile_digest: z.ZodString;
    }, z.core.$strict>;
    served_digest: z.ZodString;
    safe_storage_receipt_digest: z.ZodString;
    prepared_at: z.ZodISODateTime;
    candidate_digest: z.ZodString;
}, z.core.$strict>;
export declare const entityAssetProposalCoreSchema: z.ZodObject<{
    proposal_contract: z.ZodLiteral<"sourcey.entity-asset-proposal/v1alpha1">;
    base_release_id: z.ZodString;
    entity_id: z.ZodString;
    role: z.ZodLiteral<"icon">;
    expected_current_binding_event_id: z.ZodNullable<z.ZodString>;
    capture: z.ZodObject<{
        capture_contract: z.ZodLiteral<"sourcey.retained-asset-capture/v1alpha1">;
        source: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"upload">;
            upload_receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"official_url">;
            requested_url: z.ZodURL;
            final_url: z.ZodURL;
            redirect_count: z.ZodNumber;
            capture_receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"sourcey_fallback">;
            generation_rule: z.ZodLiteral<"sourcey.entity-monogram-5x7/v1">;
            fallback_reason_digest: z.ZodString;
        }, z.core.$strict>], "kind">;
        original_digest: z.ZodString;
        bytes: z.ZodNumber;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
            "image/svg+xml": "image/svg+xml";
        }>;
        captured_at: z.ZodISODateTime;
        storage_receipt_digest: z.ZodString;
        capture_digest: z.ZodString;
    }, z.core.$strict>;
    transform_profile: z.ZodObject<{
        profile_contract: z.ZodLiteral<"sourcey.asset-transform-profile/v1alpha1">;
        profile_version: z.ZodString;
        toolchain_digest: z.ZodString;
        output_media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
            "image/svg+xml": "image/svg+xml";
        }>;
        maximum_width: z.ZodNumber;
        maximum_height: z.ZodNumber;
        maximum_source_aspect_ratio: z.ZodNullable<z.ZodNumber>;
        strip_metadata: z.ZodLiteral<true>;
        reject_active_content: z.ZodLiteral<true>;
        profile_digest: z.ZodString;
    }, z.core.$strict>;
    asset: z.ZodObject<{
        asset_contract: z.ZodLiteral<"sourcey.asset/v1alpha1">;
        original: z.ZodObject<{
            digest: z.ZodString;
            bytes: z.ZodNumber;
            media_type: z.ZodEnum<{
                "image/jpeg": "image/jpeg";
                "image/png": "image/png";
                "image/webp": "image/webp";
                "image/svg+xml": "image/svg+xml";
            }>;
            source_path: z.ZodString;
        }, z.core.$strict>;
        safe_variants: z.ZodArray<z.ZodObject<{
            digest: z.ZodString;
            bytes: z.ZodNumber;
            media_type: z.ZodEnum<{
                "image/jpeg": "image/jpeg";
                "image/png": "image/png";
                "image/webp": "image/webp";
                "image/svg+xml": "image/svg+xml";
            }>;
            source_path: z.ZodString;
            served_path: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
            transform_profile_digest: z.ZodString;
            transform_receipt_digest: z.ZodString;
        }, z.core.$strict>>;
        transform_receipts: z.ZodArray<z.ZodObject<{
            receipt_contract: z.ZodLiteral<"sourcey.asset-transform-receipt/v1alpha1">;
            original_digest: z.ZodString;
            safe_digest: z.ZodString;
            profile_digest: z.ZodString;
            toolchain_digest: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>>;
        redistribution: z.ZodObject<{
            basis: z.ZodEnum<{
                "vendor-approved": "vendor-approved";
                "redistributable-license": "redistributable-license";
                "nominative-use": "nominative-use";
                "sourcey-owned": "sourcey-owned";
            }>;
            license: z.ZodString;
            notice: z.ZodString;
            trademark_owner: z.ZodString;
            fallback_reason: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        asset_object_digest: z.ZodString;
    }, z.core.$strict>;
    served_digest: z.ZodString;
    safe_storage_receipt_digest: z.ZodString;
    authority_basis: z.ZodEnum<{
        "sourcey-owned": "sourcey-owned";
        "vendor-authority": "vendor-authority";
        "editorial-review": "editorial-review";
        "licensed-source": "licensed-source";
    }>;
    authority_claim_id: z.ZodOptional<z.ZodString>;
    source_basis: z.ZodString;
    approval_scope: z.ZodLiteral<"entity-icon">;
    review: z.ZodObject<{
        review_contract: z.ZodLiteral<"sourcey.entity-asset-review/v1alpha1">;
        base_release_id: z.ZodString;
        entity_id: z.ZodString;
        role: z.ZodLiteral<"icon">;
        capture_digest: z.ZodString;
        served_digest: z.ZodString;
        redistribution: z.ZodObject<{
            basis: z.ZodEnum<{
                "vendor-approved": "vendor-approved";
                "redistributable-license": "redistributable-license";
                "nominative-use": "nominative-use";
                "sourcey-owned": "sourcey-owned";
            }>;
            license: z.ZodString;
            notice: z.ZodString;
            trademark_owner: z.ZodString;
            fallback_reason: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        authority_basis: z.ZodEnum<{
            "sourcey-owned": "sourcey-owned";
            "vendor-authority": "vendor-authority";
            "editorial-review": "editorial-review";
            "licensed-source": "licensed-source";
        }>;
        source_basis: z.ZodString;
        decision: z.ZodLiteral<"approved">;
        decision_basis: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"human">;
            actor_id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"policy">;
            policy_id: z.ZodString;
            policy_digest: z.ZodString;
            evaluator_id: z.ZodString;
            evaluator_digest: z.ZodString;
            input_digest: z.ZodString;
            execution_receipt_digest: z.ZodString;
        }, z.core.$strict>], "kind">;
        decided_at: z.ZodISODateTime;
        rationale: z.ZodString;
        review_artifact_digest: z.ZodString;
    }, z.core.$strict>;
    effective_from: z.ZodISODateTime;
}, z.core.$strict>;
export declare const entityAssetProposalSchema: z.ZodObject<{
    proposal_contract: z.ZodLiteral<"sourcey.entity-asset-proposal/v1alpha1">;
    base_release_id: z.ZodString;
    entity_id: z.ZodString;
    role: z.ZodLiteral<"icon">;
    expected_current_binding_event_id: z.ZodNullable<z.ZodString>;
    capture: z.ZodObject<{
        capture_contract: z.ZodLiteral<"sourcey.retained-asset-capture/v1alpha1">;
        source: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"upload">;
            upload_receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"official_url">;
            requested_url: z.ZodURL;
            final_url: z.ZodURL;
            redirect_count: z.ZodNumber;
            capture_receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"sourcey_fallback">;
            generation_rule: z.ZodLiteral<"sourcey.entity-monogram-5x7/v1">;
            fallback_reason_digest: z.ZodString;
        }, z.core.$strict>], "kind">;
        original_digest: z.ZodString;
        bytes: z.ZodNumber;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
            "image/svg+xml": "image/svg+xml";
        }>;
        captured_at: z.ZodISODateTime;
        storage_receipt_digest: z.ZodString;
        capture_digest: z.ZodString;
    }, z.core.$strict>;
    transform_profile: z.ZodObject<{
        profile_contract: z.ZodLiteral<"sourcey.asset-transform-profile/v1alpha1">;
        profile_version: z.ZodString;
        toolchain_digest: z.ZodString;
        output_media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
            "image/svg+xml": "image/svg+xml";
        }>;
        maximum_width: z.ZodNumber;
        maximum_height: z.ZodNumber;
        maximum_source_aspect_ratio: z.ZodNullable<z.ZodNumber>;
        strip_metadata: z.ZodLiteral<true>;
        reject_active_content: z.ZodLiteral<true>;
        profile_digest: z.ZodString;
    }, z.core.$strict>;
    asset: z.ZodObject<{
        asset_contract: z.ZodLiteral<"sourcey.asset/v1alpha1">;
        original: z.ZodObject<{
            digest: z.ZodString;
            bytes: z.ZodNumber;
            media_type: z.ZodEnum<{
                "image/jpeg": "image/jpeg";
                "image/png": "image/png";
                "image/webp": "image/webp";
                "image/svg+xml": "image/svg+xml";
            }>;
            source_path: z.ZodString;
        }, z.core.$strict>;
        safe_variants: z.ZodArray<z.ZodObject<{
            digest: z.ZodString;
            bytes: z.ZodNumber;
            media_type: z.ZodEnum<{
                "image/jpeg": "image/jpeg";
                "image/png": "image/png";
                "image/webp": "image/webp";
                "image/svg+xml": "image/svg+xml";
            }>;
            source_path: z.ZodString;
            served_path: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
            transform_profile_digest: z.ZodString;
            transform_receipt_digest: z.ZodString;
        }, z.core.$strict>>;
        transform_receipts: z.ZodArray<z.ZodObject<{
            receipt_contract: z.ZodLiteral<"sourcey.asset-transform-receipt/v1alpha1">;
            original_digest: z.ZodString;
            safe_digest: z.ZodString;
            profile_digest: z.ZodString;
            toolchain_digest: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>>;
        redistribution: z.ZodObject<{
            basis: z.ZodEnum<{
                "vendor-approved": "vendor-approved";
                "redistributable-license": "redistributable-license";
                "nominative-use": "nominative-use";
                "sourcey-owned": "sourcey-owned";
            }>;
            license: z.ZodString;
            notice: z.ZodString;
            trademark_owner: z.ZodString;
            fallback_reason: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        asset_object_digest: z.ZodString;
    }, z.core.$strict>;
    served_digest: z.ZodString;
    safe_storage_receipt_digest: z.ZodString;
    authority_basis: z.ZodEnum<{
        "sourcey-owned": "sourcey-owned";
        "vendor-authority": "vendor-authority";
        "editorial-review": "editorial-review";
        "licensed-source": "licensed-source";
    }>;
    authority_claim_id: z.ZodOptional<z.ZodString>;
    source_basis: z.ZodString;
    approval_scope: z.ZodLiteral<"entity-icon">;
    review: z.ZodObject<{
        review_contract: z.ZodLiteral<"sourcey.entity-asset-review/v1alpha1">;
        base_release_id: z.ZodString;
        entity_id: z.ZodString;
        role: z.ZodLiteral<"icon">;
        capture_digest: z.ZodString;
        served_digest: z.ZodString;
        redistribution: z.ZodObject<{
            basis: z.ZodEnum<{
                "vendor-approved": "vendor-approved";
                "redistributable-license": "redistributable-license";
                "nominative-use": "nominative-use";
                "sourcey-owned": "sourcey-owned";
            }>;
            license: z.ZodString;
            notice: z.ZodString;
            trademark_owner: z.ZodString;
            fallback_reason: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        authority_basis: z.ZodEnum<{
            "sourcey-owned": "sourcey-owned";
            "vendor-authority": "vendor-authority";
            "editorial-review": "editorial-review";
            "licensed-source": "licensed-source";
        }>;
        source_basis: z.ZodString;
        decision: z.ZodLiteral<"approved">;
        decision_basis: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"human">;
            actor_id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"policy">;
            policy_id: z.ZodString;
            policy_digest: z.ZodString;
            evaluator_id: z.ZodString;
            evaluator_digest: z.ZodString;
            input_digest: z.ZodString;
            execution_receipt_digest: z.ZodString;
        }, z.core.$strict>], "kind">;
        decided_at: z.ZodISODateTime;
        rationale: z.ZodString;
        review_artifact_digest: z.ZodString;
    }, z.core.$strict>;
    effective_from: z.ZodISODateTime;
    proposal_digest: z.ZodString;
}, z.core.$strict>;
export declare const assetDeltaChangeSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    operation: z.ZodLiteral<"upsert">;
    entity_id: z.ZodString;
    role: z.ZodLiteral<"icon">;
    prior_binding_event_id: z.ZodNullable<z.ZodString>;
    binding: z.ZodObject<{
        entity_id: z.ZodString;
        role: z.ZodEnum<{
            "logo-light": "logo-light";
            "logo-dark": "logo-dark";
            icon: "icon";
        }>;
        asset_object_digest: z.ZodString;
        served_digest: z.ZodString;
        served_path: z.ZodString;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
            "image/svg+xml": "image/svg+xml";
        }>;
        bytes: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
        authority_basis: z.ZodEnum<{
            "sourcey-owned": "sourcey-owned";
            "vendor-authority": "vendor-authority";
            "editorial-review": "editorial-review";
            "licensed-source": "licensed-source";
        }>;
        authority_claim_id: z.ZodOptional<z.ZodString>;
        approval_receipt_digest: z.ZodString;
        source_basis: z.ZodString;
        license_basis: z.ZodString;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        binding_event_id: z.ZodString;
    }, z.core.$strict>;
    asset: z.ZodObject<{
        asset_contract: z.ZodLiteral<"sourcey.asset/v1alpha1">;
        original: z.ZodObject<{
            digest: z.ZodString;
            bytes: z.ZodNumber;
            media_type: z.ZodEnum<{
                "image/jpeg": "image/jpeg";
                "image/png": "image/png";
                "image/webp": "image/webp";
                "image/svg+xml": "image/svg+xml";
            }>;
            source_path: z.ZodString;
        }, z.core.$strict>;
        safe_variants: z.ZodArray<z.ZodObject<{
            digest: z.ZodString;
            bytes: z.ZodNumber;
            media_type: z.ZodEnum<{
                "image/jpeg": "image/jpeg";
                "image/png": "image/png";
                "image/webp": "image/webp";
                "image/svg+xml": "image/svg+xml";
            }>;
            source_path: z.ZodString;
            served_path: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
            transform_profile_digest: z.ZodString;
            transform_receipt_digest: z.ZodString;
        }, z.core.$strict>>;
        transform_receipts: z.ZodArray<z.ZodObject<{
            receipt_contract: z.ZodLiteral<"sourcey.asset-transform-receipt/v1alpha1">;
            original_digest: z.ZodString;
            safe_digest: z.ZodString;
            profile_digest: z.ZodString;
            toolchain_digest: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>>;
        redistribution: z.ZodObject<{
            basis: z.ZodEnum<{
                "vendor-approved": "vendor-approved";
                "redistributable-license": "redistributable-license";
                "nominative-use": "nominative-use";
                "sourcey-owned": "sourcey-owned";
            }>;
            license: z.ZodString;
            notice: z.ZodString;
            trademark_owner: z.ZodString;
            fallback_reason: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        asset_object_digest: z.ZodString;
    }, z.core.$strict>;
    original_path: z.ZodString;
    safe_variant_path: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    operation: z.ZodLiteral<"remove">;
    entity_id: z.ZodString;
    role: z.ZodLiteral<"icon">;
    prior_binding_event_id: z.ZodString;
    prior_binding_digest: z.ZodString;
    disposition_event_id: z.ZodString;
}, z.core.$strict>], "operation">;
export declare const assetDeltaCoreSchema: z.ZodObject<{
    delta_contract: z.ZodLiteral<"sourcey.asset-delta/v1alpha1">;
    parent_asset_index_digest: z.ZodString;
    changes: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        operation: z.ZodLiteral<"upsert">;
        entity_id: z.ZodString;
        role: z.ZodLiteral<"icon">;
        prior_binding_event_id: z.ZodNullable<z.ZodString>;
        binding: z.ZodObject<{
            entity_id: z.ZodString;
            role: z.ZodEnum<{
                "logo-light": "logo-light";
                "logo-dark": "logo-dark";
                icon: "icon";
            }>;
            asset_object_digest: z.ZodString;
            served_digest: z.ZodString;
            served_path: z.ZodString;
            media_type: z.ZodEnum<{
                "image/jpeg": "image/jpeg";
                "image/png": "image/png";
                "image/webp": "image/webp";
                "image/svg+xml": "image/svg+xml";
            }>;
            bytes: z.ZodNumber;
            width: z.ZodNumber;
            height: z.ZodNumber;
            authority_basis: z.ZodEnum<{
                "sourcey-owned": "sourcey-owned";
                "vendor-authority": "vendor-authority";
                "editorial-review": "editorial-review";
                "licensed-source": "licensed-source";
            }>;
            authority_claim_id: z.ZodOptional<z.ZodString>;
            approval_receipt_digest: z.ZodString;
            source_basis: z.ZodString;
            license_basis: z.ZodString;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            binding_event_id: z.ZodString;
        }, z.core.$strict>;
        asset: z.ZodObject<{
            asset_contract: z.ZodLiteral<"sourcey.asset/v1alpha1">;
            original: z.ZodObject<{
                digest: z.ZodString;
                bytes: z.ZodNumber;
                media_type: z.ZodEnum<{
                    "image/jpeg": "image/jpeg";
                    "image/png": "image/png";
                    "image/webp": "image/webp";
                    "image/svg+xml": "image/svg+xml";
                }>;
                source_path: z.ZodString;
            }, z.core.$strict>;
            safe_variants: z.ZodArray<z.ZodObject<{
                digest: z.ZodString;
                bytes: z.ZodNumber;
                media_type: z.ZodEnum<{
                    "image/jpeg": "image/jpeg";
                    "image/png": "image/png";
                    "image/webp": "image/webp";
                    "image/svg+xml": "image/svg+xml";
                }>;
                source_path: z.ZodString;
                served_path: z.ZodString;
                width: z.ZodNumber;
                height: z.ZodNumber;
                transform_profile_digest: z.ZodString;
                transform_receipt_digest: z.ZodString;
            }, z.core.$strict>>;
            transform_receipts: z.ZodArray<z.ZodObject<{
                receipt_contract: z.ZodLiteral<"sourcey.asset-transform-receipt/v1alpha1">;
                original_digest: z.ZodString;
                safe_digest: z.ZodString;
                profile_digest: z.ZodString;
                toolchain_digest: z.ZodString;
                receipt_digest: z.ZodString;
            }, z.core.$strict>>;
            redistribution: z.ZodObject<{
                basis: z.ZodEnum<{
                    "vendor-approved": "vendor-approved";
                    "redistributable-license": "redistributable-license";
                    "nominative-use": "nominative-use";
                    "sourcey-owned": "sourcey-owned";
                }>;
                license: z.ZodString;
                notice: z.ZodString;
                trademark_owner: z.ZodString;
                fallback_reason: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            asset_object_digest: z.ZodString;
        }, z.core.$strict>;
        original_path: z.ZodString;
        safe_variant_path: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"remove">;
        entity_id: z.ZodString;
        role: z.ZodLiteral<"icon">;
        prior_binding_event_id: z.ZodString;
        prior_binding_digest: z.ZodString;
        disposition_event_id: z.ZodString;
    }, z.core.$strict>], "operation">>;
}, z.core.$strict>;
export declare const assetDeltaSchema: z.ZodObject<{
    delta_contract: z.ZodLiteral<"sourcey.asset-delta/v1alpha1">;
    parent_asset_index_digest: z.ZodString;
    changes: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        operation: z.ZodLiteral<"upsert">;
        entity_id: z.ZodString;
        role: z.ZodLiteral<"icon">;
        prior_binding_event_id: z.ZodNullable<z.ZodString>;
        binding: z.ZodObject<{
            entity_id: z.ZodString;
            role: z.ZodEnum<{
                "logo-light": "logo-light";
                "logo-dark": "logo-dark";
                icon: "icon";
            }>;
            asset_object_digest: z.ZodString;
            served_digest: z.ZodString;
            served_path: z.ZodString;
            media_type: z.ZodEnum<{
                "image/jpeg": "image/jpeg";
                "image/png": "image/png";
                "image/webp": "image/webp";
                "image/svg+xml": "image/svg+xml";
            }>;
            bytes: z.ZodNumber;
            width: z.ZodNumber;
            height: z.ZodNumber;
            authority_basis: z.ZodEnum<{
                "sourcey-owned": "sourcey-owned";
                "vendor-authority": "vendor-authority";
                "editorial-review": "editorial-review";
                "licensed-source": "licensed-source";
            }>;
            authority_claim_id: z.ZodOptional<z.ZodString>;
            approval_receipt_digest: z.ZodString;
            source_basis: z.ZodString;
            license_basis: z.ZodString;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            binding_event_id: z.ZodString;
        }, z.core.$strict>;
        asset: z.ZodObject<{
            asset_contract: z.ZodLiteral<"sourcey.asset/v1alpha1">;
            original: z.ZodObject<{
                digest: z.ZodString;
                bytes: z.ZodNumber;
                media_type: z.ZodEnum<{
                    "image/jpeg": "image/jpeg";
                    "image/png": "image/png";
                    "image/webp": "image/webp";
                    "image/svg+xml": "image/svg+xml";
                }>;
                source_path: z.ZodString;
            }, z.core.$strict>;
            safe_variants: z.ZodArray<z.ZodObject<{
                digest: z.ZodString;
                bytes: z.ZodNumber;
                media_type: z.ZodEnum<{
                    "image/jpeg": "image/jpeg";
                    "image/png": "image/png";
                    "image/webp": "image/webp";
                    "image/svg+xml": "image/svg+xml";
                }>;
                source_path: z.ZodString;
                served_path: z.ZodString;
                width: z.ZodNumber;
                height: z.ZodNumber;
                transform_profile_digest: z.ZodString;
                transform_receipt_digest: z.ZodString;
            }, z.core.$strict>>;
            transform_receipts: z.ZodArray<z.ZodObject<{
                receipt_contract: z.ZodLiteral<"sourcey.asset-transform-receipt/v1alpha1">;
                original_digest: z.ZodString;
                safe_digest: z.ZodString;
                profile_digest: z.ZodString;
                toolchain_digest: z.ZodString;
                receipt_digest: z.ZodString;
            }, z.core.$strict>>;
            redistribution: z.ZodObject<{
                basis: z.ZodEnum<{
                    "vendor-approved": "vendor-approved";
                    "redistributable-license": "redistributable-license";
                    "nominative-use": "nominative-use";
                    "sourcey-owned": "sourcey-owned";
                }>;
                license: z.ZodString;
                notice: z.ZodString;
                trademark_owner: z.ZodString;
                fallback_reason: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            asset_object_digest: z.ZodString;
        }, z.core.$strict>;
        original_path: z.ZodString;
        safe_variant_path: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"remove">;
        entity_id: z.ZodString;
        role: z.ZodLiteral<"icon">;
        prior_binding_event_id: z.ZodString;
        prior_binding_digest: z.ZodString;
        disposition_event_id: z.ZodString;
    }, z.core.$strict>], "operation">>;
    delta_digest: z.ZodString;
}, z.core.$strict>;
export declare const assetAuthorityBundleCoreSchema: z.ZodObject<{
    bundle_contract: z.ZodLiteral<"sourcey.asset-authority-bundle/v1alpha1">;
    publication_proposal_digest: z.ZodString;
    base_release_id: z.ZodString;
    target_signer_registry_digest: z.ZodString;
    issuer_id: z.ZodString;
    materialized_at: z.ZodISODateTime;
    asset_proposal_digests: z.ZodArray<z.ZodString>;
    event_ids: z.ZodArray<z.ZodString>;
    release_inclusion: z.ZodLiteral<"pending">;
    objects: z.ZodRecord<z.ZodString, z.ZodObject<{
        sha256: z.ZodString;
        bytes: z.ZodNumber;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const assetAuthorityBundleManifestSchema: z.ZodObject<{
    bundle_contract: z.ZodLiteral<"sourcey.asset-authority-bundle/v1alpha1">;
    publication_proposal_digest: z.ZodString;
    base_release_id: z.ZodString;
    target_signer_registry_digest: z.ZodString;
    issuer_id: z.ZodString;
    materialized_at: z.ZodISODateTime;
    asset_proposal_digests: z.ZodArray<z.ZodString>;
    event_ids: z.ZodArray<z.ZodString>;
    release_inclusion: z.ZodLiteral<"pending">;
    objects: z.ZodRecord<z.ZodString, z.ZodObject<{
        sha256: z.ZodString;
        bytes: z.ZodNumber;
    }, z.core.$strict>>;
    bundle_digest: z.ZodString;
}, z.core.$strict>;
export declare const assetIndexSchema: z.ZodObject<{
    asset_index_contract: z.ZodLiteral<"sourcey.asset-index/v1alpha1">;
    bindings: z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        role: z.ZodEnum<{
            "logo-light": "logo-light";
            "logo-dark": "logo-dark";
            icon: "icon";
        }>;
        asset_object_digest: z.ZodString;
        served_digest: z.ZodString;
        served_path: z.ZodString;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
            "image/svg+xml": "image/svg+xml";
        }>;
        bytes: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
        authority_basis: z.ZodEnum<{
            "sourcey-owned": "sourcey-owned";
            "vendor-authority": "vendor-authority";
            "editorial-review": "editorial-review";
            "licensed-source": "licensed-source";
        }>;
        authority_claim_id: z.ZodOptional<z.ZodString>;
        approval_receipt_digest: z.ZodString;
        source_basis: z.ZodString;
        license_basis: z.ZodString;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        binding_event_id: z.ZodString;
    }, z.core.$strict>>;
    notices_digest: z.ZodString;
}, z.core.$strict>;
export declare const assetNoticesSchema: z.ZodObject<{
    notices_contract: z.ZodLiteral<"sourcey.asset-notices/v1alpha1">;
    notices: z.ZodArray<z.ZodObject<{
        asset_object_digest: z.ZodString;
        basis: z.ZodString;
        license: z.ZodString;
        notice: z.ZodString;
        trademark_owner: z.ZodString;
        fallback_reason: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const assetInputsSchema: z.ZodObject<{
    input_contract: z.ZodLiteral<"sourcey.asset-inputs/v1alpha1">;
    manifest_digest: z.ZodString;
    transform_profile_digests: z.ZodArray<z.ZodString>;
    object_digests: z.ZodArray<z.ZodString>;
    original_digests: z.ZodArray<z.ZodString>;
    safe_variant_digests: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export type AssetTransformProfile = z.infer<typeof assetTransformProfileSchema>;
export type AssetMediaType = z.infer<typeof assetMediaTypeSchema>;
export type AssetTransformReceipt = z.infer<typeof assetTransformReceiptSchema>;
export type AssetObject = z.infer<typeof assetObjectSchema>;
export type AssetManifest = z.infer<typeof assetManifestSchema>;
export type AssetIndex = z.infer<typeof assetIndexSchema>;
export type AssetNotices = z.infer<typeof assetNoticesSchema>;
export type AssetInputs = z.infer<typeof assetInputsSchema>;
export type AssetRedistribution = z.infer<typeof assetRedistributionSchema>;
export type EntityAssetSubmission = z.infer<typeof entityAssetSubmissionSchema>;
export type EntityAssetUploadReceipt = z.infer<typeof entityAssetUploadReceiptSchema>;
export type RetainedAssetCapture = z.infer<typeof retainedAssetCaptureSchema>;
export type EntityAssetProposal = z.infer<typeof entityAssetProposalSchema>;
export type EntityAssetReviewArtifact = z.infer<typeof entityAssetReviewArtifactSchema>;
export type SourceyOwnedEntityIconCandidate = z.infer<typeof sourceyOwnedEntityIconCandidateSchema>;
export type AssetBindingProjection = z.infer<typeof assetBindingProjectionSchema>;
export type AssetDeltaChange = z.infer<typeof assetDeltaChangeSchema>;
export type AssetDelta = z.infer<typeof assetDeltaSchema>;
export type AssetAuthorityBundleManifest = z.infer<typeof assetAuthorityBundleManifestSchema>;
export declare const reviewedEntityAssetSubmissionCoreSchema: z.ZodObject<{
    review_contract: z.ZodLiteral<"sourcey.reviewed-entity-asset-submission/v1alpha1">;
    work_item_digest: z.ZodString;
    base_release_id: z.ZodString;
    reviewer_id: z.ZodString;
    decided_at: z.ZodISODateTime;
    rationale: z.ZodString;
    proposal_digests: z.ZodArray<z.ZodString>;
    review_artifact_digests: z.ZodArray<z.ZodString>;
    objects: z.ZodRecord<z.ZodString, z.ZodObject<{
        sha256: z.ZodString;
        bytes: z.ZodNumber;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const reviewedEntityAssetSubmissionSchema: z.ZodObject<{
    review_contract: z.ZodLiteral<"sourcey.reviewed-entity-asset-submission/v1alpha1">;
    work_item_digest: z.ZodString;
    base_release_id: z.ZodString;
    reviewer_id: z.ZodString;
    decided_at: z.ZodISODateTime;
    rationale: z.ZodString;
    proposal_digests: z.ZodArray<z.ZodString>;
    review_artifact_digests: z.ZodArray<z.ZodString>;
    objects: z.ZodRecord<z.ZodString, z.ZodObject<{
        sha256: z.ZodString;
        bytes: z.ZodNumber;
    }, z.core.$strict>>;
    submission_review_digest: z.ZodString;
}, z.core.$strict>;
export type ReviewedEntityAssetSubmission = z.infer<typeof reviewedEntityAssetSubmissionSchema>;
//# sourceMappingURL=index.d.ts.map