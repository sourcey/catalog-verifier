import { z } from "zod";
export declare const catalogGitSyncResultSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    status: z.ZodEnum<{
        awaiting_admission: "awaiting_admission";
        no_changes: "no_changes";
        up_to_date: "up_to_date";
    }>;
    head_commit: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    status: z.ZodEnum<{
        converged_elsewhere: "converged_elsewhere";
        published: "published";
    }>;
    head_commit: z.ZodString;
    release_id: z.ZodString;
}, z.core.$strict>], "status">;
export type CatalogGitSyncResult = z.infer<typeof catalogGitSyncResultSchema>;
export declare const PUBLICATION_STAGES: readonly ["validation", "evidence", "identity", "readiness", "authorization", "publication", "readback"];
export declare const publicationStageResultSchema: z.ZodObject<{
    stage: z.ZodEnum<{
        authorization: "authorization";
        evidence: "evidence";
        identity: "identity";
        publication: "publication";
        readback: "readback";
        readiness: "readiness";
        validation: "validation";
    }>;
    status: z.ZodEnum<{
        failed: "failed";
        invalidated: "invalidated";
        not_required: "not_required";
        passed: "passed";
        pending: "pending";
    }>;
    diagnostics: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            authorization: "authorization";
            evidence: "evidence";
            identity: "identity";
            publication: "publication";
            readback: "readback";
            readiness: "readiness";
            validation: "validation";
        }>;
        code: z.ZodString;
        message: z.ZodString;
        path: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type PublicationStageResult = z.infer<typeof publicationStageResultSchema>;
/** Private recovery binding, not admission or a live-release selector. The
 * archive remains in ordinary immutable artifact storage; the submission owner
 * retains this exact association before any publication effect. */
export declare const catalogSubmissionPublicationReferenceCoreSchema: z.ZodObject<{
    work_item_digest: z.ZodString;
    release_id: z.ZodString;
    release_sequence: z.ZodNumber;
    parent_release_id: z.ZodString;
    bundle_digest: z.ZodString;
    verifier_digest: z.ZodString;
    archive_digest: z.ZodString;
    archive_bytes: z.ZodNumber;
    archive_expanded_bytes: z.ZodNumber;
    archive_file_count: z.ZodNumber;
}, z.core.$strict>;
export declare const catalogSubmissionPublicationReferenceSchema: z.ZodObject<{
    work_item_digest: z.ZodString;
    release_id: z.ZodString;
    release_sequence: z.ZodNumber;
    parent_release_id: z.ZodString;
    bundle_digest: z.ZodString;
    verifier_digest: z.ZodString;
    archive_digest: z.ZodString;
    archive_bytes: z.ZodNumber;
    archive_expanded_bytes: z.ZodNumber;
    archive_file_count: z.ZodNumber;
    reference_digest: z.ZodString;
}, z.core.$strict>;
export type CatalogSubmissionPublicationReference = z.infer<typeof catalogSubmissionPublicationReferenceSchema>;
export declare const publicationAdmissionTargetSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    kind: z.ZodLiteral<"git">;
    changed_tree: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"payload">;
    payload_digest: z.ZodString;
    live_parent_release_id: z.ZodString;
}, z.core.$strict>], "kind">;
export type PublicationAdmissionTarget = z.infer<typeof publicationAdmissionTargetSchema>;
export declare const publicationAdmissionManifestCoreSchema: z.ZodObject<{
    admission_contract: z.ZodLiteral<"sourcey.publication-admission/v1">;
    target: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"git">;
        changed_tree: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"payload">;
        payload_digest: z.ZodString;
        live_parent_release_id: z.ZodString;
    }, z.core.$strict>], "kind">;
    authorities: z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            asset: "asset";
            assurance: "assurance";
            claim: "claim";
            evidence: "evidence";
            identity: "identity";
            readiness: "readiness";
        }>;
        root: z.ZodString;
        tree_digest: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const publicationAdmissionManifestSchema: z.ZodObject<{
    admission_contract: z.ZodLiteral<"sourcey.publication-admission/v1">;
    target: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"git">;
        changed_tree: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"payload">;
        payload_digest: z.ZodString;
        live_parent_release_id: z.ZodString;
    }, z.core.$strict>], "kind">;
    authorities: z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            asset: "asset";
            assurance: "assurance";
            claim: "claim";
            evidence: "evidence";
            identity: "identity";
            readiness: "readiness";
        }>;
        root: z.ZodString;
        tree_digest: z.ZodString;
    }, z.core.$strict>>;
    admission_digest: z.ZodString;
}, z.core.$strict>;
export type PublicationAdmissionManifest = z.infer<typeof publicationAdmissionManifestSchema>;
export declare const publicationPolicyReferenceSchema: z.ZodObject<{
    key: z.ZodString;
    digest: z.ZodString;
}, z.core.$strict>;
export declare const expectedPublicationEntitySchema: z.ZodObject<{
    entity_id: z.ZodString;
    snapshot_digest: z.ZodNullable<z.ZodString>;
}, z.core.$strict>;
export declare const catalogPublicationProposalCoreSchema: z.ZodObject<{
    live_parent_release_id: z.ZodString;
    candidate_entities: z.ZodArray<z.ZodObject<{
        schema_version: z.ZodLiteral<"sourcey.entity-authoring/v1alpha1">;
        programs: z.ZodArray<z.ZodObject<{
            program_id: z.ZodString;
            program_slug: z.ZodString;
            program_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            source_ids: z.ZodArray<z.ZodString>;
        }, z.core.$strict>>;
        entity: z.ZodObject<{
            entity_id: z.ZodString;
            slug: z.ZodString;
            slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            name: z.ZodString;
            domains: z.ZodArray<z.ZodObject<{
                value: z.ZodString;
                role: z.ZodEnum<{
                    alias: "alias";
                    primary: "primary";
                }>;
                valid_from: z.ZodISODateTime;
                valid_until: z.ZodOptional<z.ZodISODateTime>;
            }, z.core.$strict>>;
            category: z.ZodString;
        }, z.core.$strict>;
        profile: z.ZodObject<{
            summary: z.ZodOptional<z.ZodString>;
            description: z.ZodString;
            links: z.ZodObject<{
                site: z.ZodURL;
                pricing: z.ZodOptional<z.ZodURL>;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sources: z.ZodArray<z.ZodObject<{
            source_id: z.ZodString;
            url: z.ZodURL;
        }, z.core.$strict>>;
        offers: z.ZodArray<z.ZodObject<{
            offer_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_slug: z.ZodString;
            offer_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            title: z.ZodString;
            summary: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            lifecycle: z.ZodObject<{
                status: z.ZodEnum<{
                    active: "active";
                    ended: "ended";
                    withdrawn: "withdrawn";
                }>;
                effective_from: z.ZodISODateTime;
                effective_until: z.ZodOptional<z.ZodISODateTime>;
            }, z.core.$strict>;
            economics: z.ZodObject<{
                consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"fixed">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"variable">;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"unknown">;
                    description: z.ZodString;
                }, z.core.$strict>], "kind">;
                benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodString;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"other">;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>;
            eligibility: z.ZodObject<{
                rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
            }, z.core.$strict>;
            roles: z.ZodObject<{
                terms_authority_entity_id: z.ZodString;
                access_operator_entity_id: z.ZodString;
            }, z.core.$strict>;
            source_ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
            declared: z.ZodOptional<z.ZodLiteral<true>>;
            access: z.ZodObject<{
                availability: z.ZodEnum<{
                    automatic: "automatic";
                    invite: "invite";
                    membership: "membership";
                    other: "other";
                    public: "public";
                    referral: "referral";
                }>;
                method: z.ZodEnum<{
                    automatic: "automatic";
                    code: "code";
                    contact: "contact";
                    form: "form";
                    other: "other";
                }>;
                public_code: z.ZodOptional<z.ZodString>;
                url: z.ZodOptional<z.ZodURL>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    candidate_assets: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
                "image/svg+xml": "image/svg+xml";
                "image/webp": "image/webp";
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
                "image/svg+xml": "image/svg+xml";
                "image/webp": "image/webp";
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
                    "image/svg+xml": "image/svg+xml";
                    "image/webp": "image/webp";
                }>;
                source_path: z.ZodString;
            }, z.core.$strict>;
            safe_variants: z.ZodArray<z.ZodObject<{
                digest: z.ZodString;
                bytes: z.ZodNumber;
                media_type: z.ZodEnum<{
                    "image/jpeg": "image/jpeg";
                    "image/png": "image/png";
                    "image/svg+xml": "image/svg+xml";
                    "image/webp": "image/webp";
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
                    "nominative-use": "nominative-use";
                    "redistributable-license": "redistributable-license";
                    "sourcey-owned": "sourcey-owned";
                    "vendor-approved": "vendor-approved";
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
            "editorial-review": "editorial-review";
            "licensed-source": "licensed-source";
            "sourcey-owned": "sourcey-owned";
            "vendor-authority": "vendor-authority";
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
                    "nominative-use": "nominative-use";
                    "redistributable-license": "redistributable-license";
                    "sourcey-owned": "sourcey-owned";
                    "vendor-approved": "vendor-approved";
                }>;
                license: z.ZodString;
                notice: z.ZodString;
                trademark_owner: z.ZodString;
                fallback_reason: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            authority_basis: z.ZodEnum<{
                "editorial-review": "editorial-review";
                "licensed-source": "licensed-source";
                "sourcey-owned": "sourcey-owned";
                "vendor-authority": "vendor-authority";
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
    }, z.core.$strict>>>;
    remove_entity_ids: z.ZodArray<z.ZodString>;
    expected_current_entities: z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        snapshot_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>>;
    expected_current_asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        role: z.ZodLiteral<"icon">;
        binding_event_id: z.ZodNullable<z.ZodString>;
        binding_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>>>;
    authority_proposals: z.ZodArray<z.ZodObject<{
        purpose: z.ZodEnum<{
            "catalog-attestation": "catalog-attestation";
            "catalog-authority": "catalog-authority";
            "catalog-dispute": "catalog-dispute";
            "catalog-evidence": "catalog-evidence";
            "catalog-feed": "catalog-feed";
            "catalog-identity": "catalog-identity";
            "catalog-policy": "catalog-policy";
            "catalog-release": "catalog-release";
            "catalog-verification": "catalog-verification";
        }>;
        proposal_digest: z.ZodString;
        dependency_keys: z.ZodArray<z.ZodString>;
        public_input_digest: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    target_policies: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        digest: z.ZodString;
    }, z.core.$strict>>;
    target_contract_authority_digest: z.ZodString;
}, z.core.$strict>;
export declare const catalogPublicationProposalSchema: z.ZodObject<{
    live_parent_release_id: z.ZodString;
    candidate_entities: z.ZodArray<z.ZodObject<{
        schema_version: z.ZodLiteral<"sourcey.entity-authoring/v1alpha1">;
        programs: z.ZodArray<z.ZodObject<{
            program_id: z.ZodString;
            program_slug: z.ZodString;
            program_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            source_ids: z.ZodArray<z.ZodString>;
        }, z.core.$strict>>;
        entity: z.ZodObject<{
            entity_id: z.ZodString;
            slug: z.ZodString;
            slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            name: z.ZodString;
            domains: z.ZodArray<z.ZodObject<{
                value: z.ZodString;
                role: z.ZodEnum<{
                    alias: "alias";
                    primary: "primary";
                }>;
                valid_from: z.ZodISODateTime;
                valid_until: z.ZodOptional<z.ZodISODateTime>;
            }, z.core.$strict>>;
            category: z.ZodString;
        }, z.core.$strict>;
        profile: z.ZodObject<{
            summary: z.ZodOptional<z.ZodString>;
            description: z.ZodString;
            links: z.ZodObject<{
                site: z.ZodURL;
                pricing: z.ZodOptional<z.ZodURL>;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sources: z.ZodArray<z.ZodObject<{
            source_id: z.ZodString;
            url: z.ZodURL;
        }, z.core.$strict>>;
        offers: z.ZodArray<z.ZodObject<{
            offer_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_slug: z.ZodString;
            offer_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            title: z.ZodString;
            summary: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            lifecycle: z.ZodObject<{
                status: z.ZodEnum<{
                    active: "active";
                    ended: "ended";
                    withdrawn: "withdrawn";
                }>;
                effective_from: z.ZodISODateTime;
                effective_until: z.ZodOptional<z.ZodISODateTime>;
            }, z.core.$strict>;
            economics: z.ZodObject<{
                consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"fixed">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"variable">;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"unknown">;
                    description: z.ZodString;
                }, z.core.$strict>], "kind">;
                benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodString;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"other">;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>;
            eligibility: z.ZodObject<{
                rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
            }, z.core.$strict>;
            roles: z.ZodObject<{
                terms_authority_entity_id: z.ZodString;
                access_operator_entity_id: z.ZodString;
            }, z.core.$strict>;
            source_ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
            declared: z.ZodOptional<z.ZodLiteral<true>>;
            access: z.ZodObject<{
                availability: z.ZodEnum<{
                    automatic: "automatic";
                    invite: "invite";
                    membership: "membership";
                    other: "other";
                    public: "public";
                    referral: "referral";
                }>;
                method: z.ZodEnum<{
                    automatic: "automatic";
                    code: "code";
                    contact: "contact";
                    form: "form";
                    other: "other";
                }>;
                public_code: z.ZodOptional<z.ZodString>;
                url: z.ZodOptional<z.ZodURL>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    candidate_assets: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
                "image/svg+xml": "image/svg+xml";
                "image/webp": "image/webp";
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
                "image/svg+xml": "image/svg+xml";
                "image/webp": "image/webp";
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
                    "image/svg+xml": "image/svg+xml";
                    "image/webp": "image/webp";
                }>;
                source_path: z.ZodString;
            }, z.core.$strict>;
            safe_variants: z.ZodArray<z.ZodObject<{
                digest: z.ZodString;
                bytes: z.ZodNumber;
                media_type: z.ZodEnum<{
                    "image/jpeg": "image/jpeg";
                    "image/png": "image/png";
                    "image/svg+xml": "image/svg+xml";
                    "image/webp": "image/webp";
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
                    "nominative-use": "nominative-use";
                    "redistributable-license": "redistributable-license";
                    "sourcey-owned": "sourcey-owned";
                    "vendor-approved": "vendor-approved";
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
            "editorial-review": "editorial-review";
            "licensed-source": "licensed-source";
            "sourcey-owned": "sourcey-owned";
            "vendor-authority": "vendor-authority";
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
                    "nominative-use": "nominative-use";
                    "redistributable-license": "redistributable-license";
                    "sourcey-owned": "sourcey-owned";
                    "vendor-approved": "vendor-approved";
                }>;
                license: z.ZodString;
                notice: z.ZodString;
                trademark_owner: z.ZodString;
                fallback_reason: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            authority_basis: z.ZodEnum<{
                "editorial-review": "editorial-review";
                "licensed-source": "licensed-source";
                "sourcey-owned": "sourcey-owned";
                "vendor-authority": "vendor-authority";
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
    }, z.core.$strict>>>;
    remove_entity_ids: z.ZodArray<z.ZodString>;
    expected_current_entities: z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        snapshot_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>>;
    expected_current_asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        role: z.ZodLiteral<"icon">;
        binding_event_id: z.ZodNullable<z.ZodString>;
        binding_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>>>;
    authority_proposals: z.ZodArray<z.ZodObject<{
        purpose: z.ZodEnum<{
            "catalog-attestation": "catalog-attestation";
            "catalog-authority": "catalog-authority";
            "catalog-dispute": "catalog-dispute";
            "catalog-evidence": "catalog-evidence";
            "catalog-feed": "catalog-feed";
            "catalog-identity": "catalog-identity";
            "catalog-policy": "catalog-policy";
            "catalog-release": "catalog-release";
            "catalog-verification": "catalog-verification";
        }>;
        proposal_digest: z.ZodString;
        dependency_keys: z.ZodArray<z.ZodString>;
        public_input_digest: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    target_policies: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        digest: z.ZodString;
    }, z.core.$strict>>;
    target_contract_authority_digest: z.ZodString;
    proposal_digest: z.ZodString;
}, z.core.$strict>;
export type CatalogPublicationProposal = z.infer<typeof catalogPublicationProposalSchema>;
export declare const publicationIngressReceiptCoreSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    proposal_digest: z.ZodString;
    semantic_input_digest: z.ZodString;
    kind: z.ZodLiteral<"git">;
    repository_id: z.ZodString;
    base_commit: z.ZodString;
    head_commit: z.ZodString;
    head_tree: z.ZodString;
    changed_tree: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    proposal_digest: z.ZodString;
    semantic_input_digest: z.ZodString;
    kind: z.ZodLiteral<"authenticated_form">;
    submission_work_item_digest: z.ZodString;
    schema_digest: z.ZodString;
    payload_digest: z.ZodString;
    authentication_digest: z.ZodString;
    authorization_digest: z.ZodString;
    operator_admission_digest: z.ZodNullable<z.ZodString>;
    idempotency_key: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    proposal_digest: z.ZodString;
    semantic_input_digest: z.ZodString;
    kind: z.ZodLiteral<"paid_agent">;
    submission_work_item_digest: z.ZodString;
    schema_digest: z.ZodString;
    payload_digest: z.ZodString;
    authentication_digest: z.ZodString;
    authorization_digest: z.ZodString;
    operator_admission_digest: z.ZodNullable<z.ZodString>;
    request_id: z.ZodString;
    idempotency_key: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    proposal_digest: z.ZodString;
    semantic_input_digest: z.ZodString;
    kind: z.ZodLiteral<"governed_ops">;
    submission_work_item_digest: z.ZodNullable<z.ZodString>;
    command_digest: z.ZodString;
    grant_digest: z.ZodString;
    approval_digest: z.ZodNullable<z.ZodString>;
    run_receipt_digest: z.ZodString;
    authentication_digest: z.ZodString;
    authorization_digest: z.ZodString;
    idempotency_key: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    proposal_digest: z.ZodString;
    semantic_input_digest: z.ZodString;
    kind: z.ZodLiteral<"scanner">;
    inventory_digest: z.ZodString;
    run_receipt_digest: z.ZodString;
    idempotency_key: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    proposal_digest: z.ZodString;
    semantic_input_digest: z.ZodString;
    kind: z.ZodLiteral<"operator_job">;
    job_input_digest: z.ZodString;
    authority_digest: z.ZodString;
    run_receipt_digest: z.ZodString;
    idempotency_key: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    proposal_digest: z.ZodString;
    semantic_input_digest: z.ZodString;
    kind: z.ZodLiteral<"policy_transition">;
    intent_digest: z.ZodString;
    configuration_digest: z.ZodString;
    idempotency_key: z.ZodString;
}, z.core.$strict>], "kind">;
export declare const publicationIngressReceiptSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    proposal_digest: z.ZodString;
    semantic_input_digest: z.ZodString;
    kind: z.ZodLiteral<"git">;
    repository_id: z.ZodString;
    base_commit: z.ZodString;
    head_commit: z.ZodString;
    head_tree: z.ZodString;
    changed_tree: z.ZodString;
    receipt_digest: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    proposal_digest: z.ZodString;
    semantic_input_digest: z.ZodString;
    kind: z.ZodLiteral<"authenticated_form">;
    submission_work_item_digest: z.ZodString;
    schema_digest: z.ZodString;
    payload_digest: z.ZodString;
    authentication_digest: z.ZodString;
    authorization_digest: z.ZodString;
    operator_admission_digest: z.ZodNullable<z.ZodString>;
    idempotency_key: z.ZodString;
    receipt_digest: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    proposal_digest: z.ZodString;
    semantic_input_digest: z.ZodString;
    kind: z.ZodLiteral<"paid_agent">;
    submission_work_item_digest: z.ZodString;
    schema_digest: z.ZodString;
    payload_digest: z.ZodString;
    authentication_digest: z.ZodString;
    authorization_digest: z.ZodString;
    operator_admission_digest: z.ZodNullable<z.ZodString>;
    request_id: z.ZodString;
    idempotency_key: z.ZodString;
    receipt_digest: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    proposal_digest: z.ZodString;
    semantic_input_digest: z.ZodString;
    kind: z.ZodLiteral<"governed_ops">;
    submission_work_item_digest: z.ZodNullable<z.ZodString>;
    command_digest: z.ZodString;
    grant_digest: z.ZodString;
    approval_digest: z.ZodNullable<z.ZodString>;
    run_receipt_digest: z.ZodString;
    authentication_digest: z.ZodString;
    authorization_digest: z.ZodString;
    idempotency_key: z.ZodString;
    receipt_digest: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    proposal_digest: z.ZodString;
    semantic_input_digest: z.ZodString;
    kind: z.ZodLiteral<"scanner">;
    inventory_digest: z.ZodString;
    run_receipt_digest: z.ZodString;
    idempotency_key: z.ZodString;
    receipt_digest: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    proposal_digest: z.ZodString;
    semantic_input_digest: z.ZodString;
    kind: z.ZodLiteral<"operator_job">;
    job_input_digest: z.ZodString;
    authority_digest: z.ZodString;
    run_receipt_digest: z.ZodString;
    idempotency_key: z.ZodString;
    receipt_digest: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    proposal_digest: z.ZodString;
    semantic_input_digest: z.ZodString;
    kind: z.ZodLiteral<"policy_transition">;
    intent_digest: z.ZodString;
    configuration_digest: z.ZodString;
    idempotency_key: z.ZodString;
    receipt_digest: z.ZodString;
}, z.core.$strict>], "kind">;
export type PublicationIngressReceiptCore = z.infer<typeof publicationIngressReceiptCoreSchema>;
export type PublicationIngressReceipt = z.infer<typeof publicationIngressReceiptSchema>;
export declare const policyTransitionIntentCoreSchema: z.ZodObject<{
    intent_contract: z.ZodLiteral<"sourcey.policy-transition-intent/v1alpha1">;
    live_parent_release_id: z.ZodString;
    target_policies: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        digest: z.ZodString;
    }, z.core.$strict>>;
    reason: z.ZodString;
    approved_by: z.ZodString;
    approved_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const policyTransitionIntentSchema: z.ZodObject<{
    intent_contract: z.ZodLiteral<"sourcey.policy-transition-intent/v1alpha1">;
    live_parent_release_id: z.ZodString;
    target_policies: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        digest: z.ZodString;
    }, z.core.$strict>>;
    reason: z.ZodString;
    approved_by: z.ZodString;
    approved_at: z.ZodISODateTime;
    intent_digest: z.ZodString;
}, z.core.$strict>;
export type PolicyTransitionIntent = z.infer<typeof policyTransitionIntentSchema>;
export declare const catalogPublicationCurrentStateCoreSchema: z.ZodObject<{
    state_contract: z.ZodLiteral<"sourcey.catalog-publication-state/v1alpha1">;
    live_parent_release_id: z.ZodString;
    target_entity_ids: z.ZodArray<z.ZodString>;
    current_entities: z.ZodArray<z.ZodObject<{
        schema_version: z.ZodLiteral<"sourcey.entity-authoring/v1alpha1">;
        programs: z.ZodArray<z.ZodObject<{
            program_id: z.ZodString;
            program_slug: z.ZodString;
            program_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            source_ids: z.ZodArray<z.ZodString>;
        }, z.core.$strict>>;
        entity: z.ZodObject<{
            entity_id: z.ZodString;
            slug: z.ZodString;
            slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            name: z.ZodString;
            domains: z.ZodArray<z.ZodObject<{
                value: z.ZodString;
                role: z.ZodEnum<{
                    alias: "alias";
                    primary: "primary";
                }>;
                valid_from: z.ZodISODateTime;
                valid_until: z.ZodOptional<z.ZodISODateTime>;
            }, z.core.$strict>>;
            category: z.ZodString;
        }, z.core.$strict>;
        profile: z.ZodObject<{
            summary: z.ZodOptional<z.ZodString>;
            description: z.ZodString;
            links: z.ZodObject<{
                site: z.ZodURL;
                pricing: z.ZodOptional<z.ZodURL>;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sources: z.ZodArray<z.ZodObject<{
            source_id: z.ZodString;
            url: z.ZodURL;
        }, z.core.$strict>>;
        offers: z.ZodArray<z.ZodObject<{
            offer_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_slug: z.ZodString;
            offer_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            title: z.ZodString;
            summary: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            lifecycle: z.ZodObject<{
                status: z.ZodEnum<{
                    active: "active";
                    ended: "ended";
                    withdrawn: "withdrawn";
                }>;
                effective_from: z.ZodISODateTime;
                effective_until: z.ZodOptional<z.ZodISODateTime>;
            }, z.core.$strict>;
            economics: z.ZodObject<{
                consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"fixed">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"variable">;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"unknown">;
                    description: z.ZodString;
                }, z.core.$strict>], "kind">;
                benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodString;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"other">;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>;
            eligibility: z.ZodObject<{
                rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
            }, z.core.$strict>;
            roles: z.ZodObject<{
                terms_authority_entity_id: z.ZodString;
                access_operator_entity_id: z.ZodString;
            }, z.core.$strict>;
            source_ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
            declared: z.ZodOptional<z.ZodLiteral<true>>;
            access: z.ZodObject<{
                availability: z.ZodEnum<{
                    automatic: "automatic";
                    invite: "invite";
                    membership: "membership";
                    other: "other";
                    public: "public";
                    referral: "referral";
                }>;
                method: z.ZodEnum<{
                    automatic: "automatic";
                    code: "code";
                    contact: "contact";
                    form: "form";
                    other: "other";
                }>;
                public_code: z.ZodOptional<z.ZodString>;
                url: z.ZodOptional<z.ZodURL>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    current_asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        role: z.ZodEnum<{
            icon: "icon";
            "logo-dark": "logo-dark";
            "logo-light": "logo-light";
        }>;
        asset_object_digest: z.ZodString;
        served_digest: z.ZodString;
        served_path: z.ZodString;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/svg+xml": "image/svg+xml";
            "image/webp": "image/webp";
        }>;
        bytes: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
        authority_basis: z.ZodEnum<{
            "editorial-review": "editorial-review";
            "licensed-source": "licensed-source";
            "sourcey-owned": "sourcey-owned";
            "vendor-authority": "vendor-authority";
        }>;
        authority_claim_id: z.ZodOptional<z.ZodString>;
        approval_receipt_digest: z.ZodString;
        source_basis: z.ZodString;
        license_basis: z.ZodString;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        binding_event_id: z.ZodString;
    }, z.core.$strict>>>;
    git_cursor: z.ZodNullable<z.ZodObject<{
        repository_id: z.ZodString;
        head_commit: z.ZodString;
        head_tree: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const catalogPublicationCurrentStateSchema: z.ZodObject<{
    state_contract: z.ZodLiteral<"sourcey.catalog-publication-state/v1alpha1">;
    live_parent_release_id: z.ZodString;
    target_entity_ids: z.ZodArray<z.ZodString>;
    current_entities: z.ZodArray<z.ZodObject<{
        schema_version: z.ZodLiteral<"sourcey.entity-authoring/v1alpha1">;
        programs: z.ZodArray<z.ZodObject<{
            program_id: z.ZodString;
            program_slug: z.ZodString;
            program_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            source_ids: z.ZodArray<z.ZodString>;
        }, z.core.$strict>>;
        entity: z.ZodObject<{
            entity_id: z.ZodString;
            slug: z.ZodString;
            slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            name: z.ZodString;
            domains: z.ZodArray<z.ZodObject<{
                value: z.ZodString;
                role: z.ZodEnum<{
                    alias: "alias";
                    primary: "primary";
                }>;
                valid_from: z.ZodISODateTime;
                valid_until: z.ZodOptional<z.ZodISODateTime>;
            }, z.core.$strict>>;
            category: z.ZodString;
        }, z.core.$strict>;
        profile: z.ZodObject<{
            summary: z.ZodOptional<z.ZodString>;
            description: z.ZodString;
            links: z.ZodObject<{
                site: z.ZodURL;
                pricing: z.ZodOptional<z.ZodURL>;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sources: z.ZodArray<z.ZodObject<{
            source_id: z.ZodString;
            url: z.ZodURL;
        }, z.core.$strict>>;
        offers: z.ZodArray<z.ZodObject<{
            offer_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_slug: z.ZodString;
            offer_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            title: z.ZodString;
            summary: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            lifecycle: z.ZodObject<{
                status: z.ZodEnum<{
                    active: "active";
                    ended: "ended";
                    withdrawn: "withdrawn";
                }>;
                effective_from: z.ZodISODateTime;
                effective_until: z.ZodOptional<z.ZodISODateTime>;
            }, z.core.$strict>;
            economics: z.ZodObject<{
                consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"fixed">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"variable">;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"unknown">;
                    description: z.ZodString;
                }, z.core.$strict>], "kind">;
                benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodString;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"other">;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>;
            eligibility: z.ZodObject<{
                rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
            }, z.core.$strict>;
            roles: z.ZodObject<{
                terms_authority_entity_id: z.ZodString;
                access_operator_entity_id: z.ZodString;
            }, z.core.$strict>;
            source_ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
            declared: z.ZodOptional<z.ZodLiteral<true>>;
            access: z.ZodObject<{
                availability: z.ZodEnum<{
                    automatic: "automatic";
                    invite: "invite";
                    membership: "membership";
                    other: "other";
                    public: "public";
                    referral: "referral";
                }>;
                method: z.ZodEnum<{
                    automatic: "automatic";
                    code: "code";
                    contact: "contact";
                    form: "form";
                    other: "other";
                }>;
                public_code: z.ZodOptional<z.ZodString>;
                url: z.ZodOptional<z.ZodURL>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    current_asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        role: z.ZodEnum<{
            icon: "icon";
            "logo-dark": "logo-dark";
            "logo-light": "logo-light";
        }>;
        asset_object_digest: z.ZodString;
        served_digest: z.ZodString;
        served_path: z.ZodString;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/svg+xml": "image/svg+xml";
            "image/webp": "image/webp";
        }>;
        bytes: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
        authority_basis: z.ZodEnum<{
            "editorial-review": "editorial-review";
            "licensed-source": "licensed-source";
            "sourcey-owned": "sourcey-owned";
            "vendor-authority": "vendor-authority";
        }>;
        authority_claim_id: z.ZodOptional<z.ZodString>;
        approval_receipt_digest: z.ZodString;
        source_basis: z.ZodString;
        license_basis: z.ZodString;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        binding_event_id: z.ZodString;
    }, z.core.$strict>>>;
    git_cursor: z.ZodNullable<z.ZodObject<{
        repository_id: z.ZodString;
        head_commit: z.ZodString;
        head_tree: z.ZodString;
    }, z.core.$strict>>;
    state_digest: z.ZodString;
}, z.core.$strict>;
export type CatalogPublicationCurrentState = z.infer<typeof catalogPublicationCurrentStateSchema>;
export declare const publicationDependencyRegistrationSchema: z.ZodObject<{
    dependent: z.ZodObject<{
        domain: z.ZodString;
        key: z.ZodString;
    }, z.core.$strict>;
    dependency_keys: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export declare const catalogPublicationChangeSetCoreSchema: z.ZodObject<{
    proposal_digest: z.ZodString;
    live_parent_release_id: z.ZodString;
    current_context_digest: z.ZodString;
    target_context_digest: z.ZodString;
    revision_changes: z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            entity: "entity";
            offer: "offer";
            program: "program";
        }>;
        entity_id: z.ZodString;
        target_id: z.ZodString;
        change: z.ZodEnum<{
            added: "added";
            removed: "removed";
            updated: "updated";
        }>;
        current_revision_digest: z.ZodNullable<z.ZodString>;
        candidate_revision_digest: z.ZodNullable<z.ZodString>;
        semantic_paths: z.ZodArray<z.ZodString>;
        source_change_ids: z.ZodArray<z.ZodString>;
        parent_changed: z.ZodBoolean;
    }, z.core.$strict>>;
    source_changes: z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        source_id: z.ZodString;
        change: z.ZodEnum<{
            added: "added";
            removed: "removed";
            updated: "updated";
        }>;
        current_url: z.ZodNullable<z.ZodURL>;
        candidate_url: z.ZodNullable<z.ZodURL>;
    }, z.core.$strict>>;
    asset_changes: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        change: z.ZodLiteral<"upsert">;
        entity_id: z.ZodString;
        role: z.ZodLiteral<"icon">;
        current_binding_event_id: z.ZodNullable<z.ZodString>;
        candidate_proposal_digest: z.ZodString;
        current_asset_object_digest: z.ZodNullable<z.ZodString>;
        candidate_asset_object_digest: z.ZodString;
        current_served_digest: z.ZodNullable<z.ZodString>;
        candidate_served_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        change: z.ZodLiteral<"remove">;
        entity_id: z.ZodString;
        role: z.ZodLiteral<"icon">;
        current_binding_event_id: z.ZodString;
        current_asset_object_digest: z.ZodString;
        current_served_digest: z.ZodString;
    }, z.core.$strict>], "change">>>;
    route_changes: z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            entity: "entity";
            offer: "offer";
            program: "program";
        }>;
        entity_id: z.ZodString;
        target_id: z.ZodString;
        current_slug: z.ZodNullable<z.ZodString>;
        candidate_slug: z.ZodNullable<z.ZodString>;
        added_aliases: z.ZodArray<z.ZodString>;
        removed_aliases: z.ZodArray<z.ZodString>;
    }, z.core.$strict>>;
    context_changes: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"policy">;
        key: z.ZodString;
        current_digest: z.ZodNullable<z.ZodString>;
        target_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"contract_authority">;
        current_digest: z.ZodString;
        target_digest: z.ZodString;
    }, z.core.$strict>], "kind">>;
    public_authoring_paths: z.ZodArray<z.ZodString>;
    changed_dependency_keys: z.ZodArray<z.ZodString>;
    impact_index_digest: z.ZodString;
    dependency_lookups: z.ZodNumber;
    affected_dependents: z.ZodArray<z.ZodObject<{
        domain: z.ZodString;
        key: z.ZodString;
    }, z.core.$strict>>;
    unaffected_dependents_proof_digest: z.ZodString;
    required_authorities: z.ZodArray<z.ZodEnum<{
        "catalog-attestation": "catalog-attestation";
        "catalog-authority": "catalog-authority";
        "catalog-dispute": "catalog-dispute";
        "catalog-evidence": "catalog-evidence";
        "catalog-feed": "catalog-feed";
        "catalog-identity": "catalog-identity";
        "catalog-policy": "catalog-policy";
        "catalog-release": "catalog-release";
        "catalog-verification": "catalog-verification";
    }>>;
}, z.core.$strict>;
export declare const catalogPublicationChangeSetSchema: z.ZodObject<{
    proposal_digest: z.ZodString;
    live_parent_release_id: z.ZodString;
    current_context_digest: z.ZodString;
    target_context_digest: z.ZodString;
    revision_changes: z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            entity: "entity";
            offer: "offer";
            program: "program";
        }>;
        entity_id: z.ZodString;
        target_id: z.ZodString;
        change: z.ZodEnum<{
            added: "added";
            removed: "removed";
            updated: "updated";
        }>;
        current_revision_digest: z.ZodNullable<z.ZodString>;
        candidate_revision_digest: z.ZodNullable<z.ZodString>;
        semantic_paths: z.ZodArray<z.ZodString>;
        source_change_ids: z.ZodArray<z.ZodString>;
        parent_changed: z.ZodBoolean;
    }, z.core.$strict>>;
    source_changes: z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        source_id: z.ZodString;
        change: z.ZodEnum<{
            added: "added";
            removed: "removed";
            updated: "updated";
        }>;
        current_url: z.ZodNullable<z.ZodURL>;
        candidate_url: z.ZodNullable<z.ZodURL>;
    }, z.core.$strict>>;
    asset_changes: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        change: z.ZodLiteral<"upsert">;
        entity_id: z.ZodString;
        role: z.ZodLiteral<"icon">;
        current_binding_event_id: z.ZodNullable<z.ZodString>;
        candidate_proposal_digest: z.ZodString;
        current_asset_object_digest: z.ZodNullable<z.ZodString>;
        candidate_asset_object_digest: z.ZodString;
        current_served_digest: z.ZodNullable<z.ZodString>;
        candidate_served_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        change: z.ZodLiteral<"remove">;
        entity_id: z.ZodString;
        role: z.ZodLiteral<"icon">;
        current_binding_event_id: z.ZodString;
        current_asset_object_digest: z.ZodString;
        current_served_digest: z.ZodString;
    }, z.core.$strict>], "change">>>;
    route_changes: z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            entity: "entity";
            offer: "offer";
            program: "program";
        }>;
        entity_id: z.ZodString;
        target_id: z.ZodString;
        current_slug: z.ZodNullable<z.ZodString>;
        candidate_slug: z.ZodNullable<z.ZodString>;
        added_aliases: z.ZodArray<z.ZodString>;
        removed_aliases: z.ZodArray<z.ZodString>;
    }, z.core.$strict>>;
    context_changes: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"policy">;
        key: z.ZodString;
        current_digest: z.ZodNullable<z.ZodString>;
        target_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"contract_authority">;
        current_digest: z.ZodString;
        target_digest: z.ZodString;
    }, z.core.$strict>], "kind">>;
    public_authoring_paths: z.ZodArray<z.ZodString>;
    changed_dependency_keys: z.ZodArray<z.ZodString>;
    impact_index_digest: z.ZodString;
    dependency_lookups: z.ZodNumber;
    affected_dependents: z.ZodArray<z.ZodObject<{
        domain: z.ZodString;
        key: z.ZodString;
    }, z.core.$strict>>;
    unaffected_dependents_proof_digest: z.ZodString;
    required_authorities: z.ZodArray<z.ZodEnum<{
        "catalog-attestation": "catalog-attestation";
        "catalog-authority": "catalog-authority";
        "catalog-dispute": "catalog-dispute";
        "catalog-evidence": "catalog-evidence";
        "catalog-feed": "catalog-feed";
        "catalog-identity": "catalog-identity";
        "catalog-policy": "catalog-policy";
        "catalog-release": "catalog-release";
        "catalog-verification": "catalog-verification";
    }>>;
    change_set_digest: z.ZodString;
}, z.core.$strict>;
/** Private exact-parent index read; these are the planner's existing selectors. */
export declare const catalogPublicationImpactSelectionSchema: z.ZodObject<{
    live_parent_release_id: z.ZodString;
    changed_dependency_keys: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
/** One ingress retains its own plan. A combined release never broadens its authority. */
declare const catalogPublicationIngressSchema: z.ZodObject<{
    proposal: z.ZodObject<{
        live_parent_release_id: z.ZodString;
        candidate_entities: z.ZodArray<z.ZodObject<{
            schema_version: z.ZodLiteral<"sourcey.entity-authoring/v1alpha1">;
            programs: z.ZodArray<z.ZodObject<{
                program_id: z.ZodString;
                program_slug: z.ZodString;
                program_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                title: z.ZodString;
                summary: z.ZodOptional<z.ZodString>;
                source_ids: z.ZodArray<z.ZodString>;
            }, z.core.$strict>>;
            entity: z.ZodObject<{
                entity_id: z.ZodString;
                slug: z.ZodString;
                slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                name: z.ZodString;
                domains: z.ZodArray<z.ZodObject<{
                    value: z.ZodString;
                    role: z.ZodEnum<{
                        alias: "alias";
                        primary: "primary";
                    }>;
                    valid_from: z.ZodISODateTime;
                    valid_until: z.ZodOptional<z.ZodISODateTime>;
                }, z.core.$strict>>;
                category: z.ZodString;
            }, z.core.$strict>;
            profile: z.ZodObject<{
                summary: z.ZodOptional<z.ZodString>;
                description: z.ZodString;
                links: z.ZodObject<{
                    site: z.ZodURL;
                    pricing: z.ZodOptional<z.ZodURL>;
                }, z.core.$strict>;
            }, z.core.$strict>;
            sources: z.ZodArray<z.ZodObject<{
                source_id: z.ZodString;
                url: z.ZodURL;
            }, z.core.$strict>>;
            offers: z.ZodArray<z.ZodObject<{
                offer_id: z.ZodString;
                program_id: z.ZodOptional<z.ZodString>;
                offer_slug: z.ZodString;
                offer_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                title: z.ZodString;
                summary: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
                lifecycle: z.ZodObject<{
                    status: z.ZodEnum<{
                        active: "active";
                        ended: "ended";
                        withdrawn: "withdrawn";
                    }>;
                    effective_from: z.ZodISODateTime;
                    effective_until: z.ZodOptional<z.ZodISODateTime>;
                }, z.core.$strict>;
                economics: z.ZodObject<{
                    consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"none">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"fixed">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"variable">;
                        description: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"unknown">;
                        description: z.ZodString;
                    }, z.core.$strict>], "kind">;
                    benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"credit">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"discount">;
                        percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                        applies_to: z.ZodOptional<z.ZodString>;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"cashback">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"money">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                                maximum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"percentage">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum_basis_points: z.ZodNumber;
                                maximum_basis_points: z.ZodNumber;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"waiver">;
                        waived_item: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"free-service">;
                        service: z.ZodString;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"other">;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>;
                eligibility: z.ZodObject<{
                    rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
                }, z.core.$strict>;
                roles: z.ZodObject<{
                    terms_authority_entity_id: z.ZodString;
                    access_operator_entity_id: z.ZodString;
                }, z.core.$strict>;
                source_ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
                declared: z.ZodOptional<z.ZodLiteral<true>>;
                access: z.ZodObject<{
                    availability: z.ZodEnum<{
                        automatic: "automatic";
                        invite: "invite";
                        membership: "membership";
                        other: "other";
                        public: "public";
                        referral: "referral";
                    }>;
                    method: z.ZodEnum<{
                        automatic: "automatic";
                        code: "code";
                        contact: "contact";
                        form: "form";
                        other: "other";
                    }>;
                    public_code: z.ZodOptional<z.ZodString>;
                    url: z.ZodOptional<z.ZodURL>;
                    instructions: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>;
                terms_url: z.ZodOptional<z.ZodURL>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        candidate_assets: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
                    "image/svg+xml": "image/svg+xml";
                    "image/webp": "image/webp";
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
                    "image/svg+xml": "image/svg+xml";
                    "image/webp": "image/webp";
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
                        "image/svg+xml": "image/svg+xml";
                        "image/webp": "image/webp";
                    }>;
                    source_path: z.ZodString;
                }, z.core.$strict>;
                safe_variants: z.ZodArray<z.ZodObject<{
                    digest: z.ZodString;
                    bytes: z.ZodNumber;
                    media_type: z.ZodEnum<{
                        "image/jpeg": "image/jpeg";
                        "image/png": "image/png";
                        "image/svg+xml": "image/svg+xml";
                        "image/webp": "image/webp";
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
                        "nominative-use": "nominative-use";
                        "redistributable-license": "redistributable-license";
                        "sourcey-owned": "sourcey-owned";
                        "vendor-approved": "vendor-approved";
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
                "editorial-review": "editorial-review";
                "licensed-source": "licensed-source";
                "sourcey-owned": "sourcey-owned";
                "vendor-authority": "vendor-authority";
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
                        "nominative-use": "nominative-use";
                        "redistributable-license": "redistributable-license";
                        "sourcey-owned": "sourcey-owned";
                        "vendor-approved": "vendor-approved";
                    }>;
                    license: z.ZodString;
                    notice: z.ZodString;
                    trademark_owner: z.ZodString;
                    fallback_reason: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>;
                authority_basis: z.ZodEnum<{
                    "editorial-review": "editorial-review";
                    "licensed-source": "licensed-source";
                    "sourcey-owned": "sourcey-owned";
                    "vendor-authority": "vendor-authority";
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
        }, z.core.$strict>>>;
        remove_entity_ids: z.ZodArray<z.ZodString>;
        expected_current_entities: z.ZodArray<z.ZodObject<{
            entity_id: z.ZodString;
            snapshot_digest: z.ZodNullable<z.ZodString>;
        }, z.core.$strict>>;
        expected_current_asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
            entity_id: z.ZodString;
            role: z.ZodLiteral<"icon">;
            binding_event_id: z.ZodNullable<z.ZodString>;
            binding_digest: z.ZodNullable<z.ZodString>;
        }, z.core.$strict>>>;
        authority_proposals: z.ZodArray<z.ZodObject<{
            purpose: z.ZodEnum<{
                "catalog-attestation": "catalog-attestation";
                "catalog-authority": "catalog-authority";
                "catalog-dispute": "catalog-dispute";
                "catalog-evidence": "catalog-evidence";
                "catalog-feed": "catalog-feed";
                "catalog-identity": "catalog-identity";
                "catalog-policy": "catalog-policy";
                "catalog-release": "catalog-release";
                "catalog-verification": "catalog-verification";
            }>;
            proposal_digest: z.ZodString;
            dependency_keys: z.ZodArray<z.ZodString>;
            public_input_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
        target_policies: z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            digest: z.ZodString;
        }, z.core.$strict>>;
        target_contract_authority_digest: z.ZodString;
        proposal_digest: z.ZodString;
    }, z.core.$strict>;
    change_set: z.ZodObject<{
        proposal_digest: z.ZodString;
        live_parent_release_id: z.ZodString;
        current_context_digest: z.ZodString;
        target_context_digest: z.ZodString;
        revision_changes: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<{
                entity: "entity";
                offer: "offer";
                program: "program";
            }>;
            entity_id: z.ZodString;
            target_id: z.ZodString;
            change: z.ZodEnum<{
                added: "added";
                removed: "removed";
                updated: "updated";
            }>;
            current_revision_digest: z.ZodNullable<z.ZodString>;
            candidate_revision_digest: z.ZodNullable<z.ZodString>;
            semantic_paths: z.ZodArray<z.ZodString>;
            source_change_ids: z.ZodArray<z.ZodString>;
            parent_changed: z.ZodBoolean;
        }, z.core.$strict>>;
        source_changes: z.ZodArray<z.ZodObject<{
            entity_id: z.ZodString;
            source_id: z.ZodString;
            change: z.ZodEnum<{
                added: "added";
                removed: "removed";
                updated: "updated";
            }>;
            current_url: z.ZodNullable<z.ZodURL>;
            candidate_url: z.ZodNullable<z.ZodURL>;
        }, z.core.$strict>>;
        asset_changes: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            change: z.ZodLiteral<"upsert">;
            entity_id: z.ZodString;
            role: z.ZodLiteral<"icon">;
            current_binding_event_id: z.ZodNullable<z.ZodString>;
            candidate_proposal_digest: z.ZodString;
            current_asset_object_digest: z.ZodNullable<z.ZodString>;
            candidate_asset_object_digest: z.ZodString;
            current_served_digest: z.ZodNullable<z.ZodString>;
            candidate_served_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            change: z.ZodLiteral<"remove">;
            entity_id: z.ZodString;
            role: z.ZodLiteral<"icon">;
            current_binding_event_id: z.ZodString;
            current_asset_object_digest: z.ZodString;
            current_served_digest: z.ZodString;
        }, z.core.$strict>], "change">>>;
        route_changes: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<{
                entity: "entity";
                offer: "offer";
                program: "program";
            }>;
            entity_id: z.ZodString;
            target_id: z.ZodString;
            current_slug: z.ZodNullable<z.ZodString>;
            candidate_slug: z.ZodNullable<z.ZodString>;
            added_aliases: z.ZodArray<z.ZodString>;
            removed_aliases: z.ZodArray<z.ZodString>;
        }, z.core.$strict>>;
        context_changes: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"policy">;
            key: z.ZodString;
            current_digest: z.ZodNullable<z.ZodString>;
            target_digest: z.ZodNullable<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"contract_authority">;
            current_digest: z.ZodString;
            target_digest: z.ZodString;
        }, z.core.$strict>], "kind">>;
        public_authoring_paths: z.ZodArray<z.ZodString>;
        changed_dependency_keys: z.ZodArray<z.ZodString>;
        impact_index_digest: z.ZodString;
        dependency_lookups: z.ZodNumber;
        affected_dependents: z.ZodArray<z.ZodObject<{
            domain: z.ZodString;
            key: z.ZodString;
        }, z.core.$strict>>;
        unaffected_dependents_proof_digest: z.ZodString;
        required_authorities: z.ZodArray<z.ZodEnum<{
            "catalog-attestation": "catalog-attestation";
            "catalog-authority": "catalog-authority";
            "catalog-dispute": "catalog-dispute";
            "catalog-evidence": "catalog-evidence";
            "catalog-feed": "catalog-feed";
            "catalog-identity": "catalog-identity";
            "catalog-policy": "catalog-policy";
            "catalog-release": "catalog-release";
            "catalog-verification": "catalog-verification";
        }>>;
        change_set_digest: z.ZodString;
    }, z.core.$strict>;
    ingress_receipt: z.ZodDiscriminatedUnion<[z.ZodObject<{
        proposal_digest: z.ZodString;
        semantic_input_digest: z.ZodString;
        kind: z.ZodLiteral<"git">;
        repository_id: z.ZodString;
        base_commit: z.ZodString;
        head_commit: z.ZodString;
        head_tree: z.ZodString;
        changed_tree: z.ZodString;
        receipt_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        proposal_digest: z.ZodString;
        semantic_input_digest: z.ZodString;
        kind: z.ZodLiteral<"authenticated_form">;
        submission_work_item_digest: z.ZodString;
        schema_digest: z.ZodString;
        payload_digest: z.ZodString;
        authentication_digest: z.ZodString;
        authorization_digest: z.ZodString;
        operator_admission_digest: z.ZodNullable<z.ZodString>;
        idempotency_key: z.ZodString;
        receipt_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        proposal_digest: z.ZodString;
        semantic_input_digest: z.ZodString;
        kind: z.ZodLiteral<"paid_agent">;
        submission_work_item_digest: z.ZodString;
        schema_digest: z.ZodString;
        payload_digest: z.ZodString;
        authentication_digest: z.ZodString;
        authorization_digest: z.ZodString;
        operator_admission_digest: z.ZodNullable<z.ZodString>;
        request_id: z.ZodString;
        idempotency_key: z.ZodString;
        receipt_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        proposal_digest: z.ZodString;
        semantic_input_digest: z.ZodString;
        kind: z.ZodLiteral<"governed_ops">;
        submission_work_item_digest: z.ZodNullable<z.ZodString>;
        command_digest: z.ZodString;
        grant_digest: z.ZodString;
        approval_digest: z.ZodNullable<z.ZodString>;
        run_receipt_digest: z.ZodString;
        authentication_digest: z.ZodString;
        authorization_digest: z.ZodString;
        idempotency_key: z.ZodString;
        receipt_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        proposal_digest: z.ZodString;
        semantic_input_digest: z.ZodString;
        kind: z.ZodLiteral<"scanner">;
        inventory_digest: z.ZodString;
        run_receipt_digest: z.ZodString;
        idempotency_key: z.ZodString;
        receipt_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        proposal_digest: z.ZodString;
        semantic_input_digest: z.ZodString;
        kind: z.ZodLiteral<"operator_job">;
        job_input_digest: z.ZodString;
        authority_digest: z.ZodString;
        run_receipt_digest: z.ZodString;
        idempotency_key: z.ZodString;
        receipt_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        proposal_digest: z.ZodString;
        semantic_input_digest: z.ZodString;
        kind: z.ZodLiteral<"policy_transition">;
        intent_digest: z.ZodString;
        configuration_digest: z.ZodString;
        idempotency_key: z.ZodString;
        receipt_digest: z.ZodString;
    }, z.core.$strict>], "kind">;
}, z.core.$strict>;
export declare const catalogPublicationCompositionSchema: z.ZodObject<{
    proposal: z.ZodObject<{
        live_parent_release_id: z.ZodString;
        candidate_entities: z.ZodArray<z.ZodObject<{
            schema_version: z.ZodLiteral<"sourcey.entity-authoring/v1alpha1">;
            programs: z.ZodArray<z.ZodObject<{
                program_id: z.ZodString;
                program_slug: z.ZodString;
                program_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                title: z.ZodString;
                summary: z.ZodOptional<z.ZodString>;
                source_ids: z.ZodArray<z.ZodString>;
            }, z.core.$strict>>;
            entity: z.ZodObject<{
                entity_id: z.ZodString;
                slug: z.ZodString;
                slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                name: z.ZodString;
                domains: z.ZodArray<z.ZodObject<{
                    value: z.ZodString;
                    role: z.ZodEnum<{
                        alias: "alias";
                        primary: "primary";
                    }>;
                    valid_from: z.ZodISODateTime;
                    valid_until: z.ZodOptional<z.ZodISODateTime>;
                }, z.core.$strict>>;
                category: z.ZodString;
            }, z.core.$strict>;
            profile: z.ZodObject<{
                summary: z.ZodOptional<z.ZodString>;
                description: z.ZodString;
                links: z.ZodObject<{
                    site: z.ZodURL;
                    pricing: z.ZodOptional<z.ZodURL>;
                }, z.core.$strict>;
            }, z.core.$strict>;
            sources: z.ZodArray<z.ZodObject<{
                source_id: z.ZodString;
                url: z.ZodURL;
            }, z.core.$strict>>;
            offers: z.ZodArray<z.ZodObject<{
                offer_id: z.ZodString;
                program_id: z.ZodOptional<z.ZodString>;
                offer_slug: z.ZodString;
                offer_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                title: z.ZodString;
                summary: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
                lifecycle: z.ZodObject<{
                    status: z.ZodEnum<{
                        active: "active";
                        ended: "ended";
                        withdrawn: "withdrawn";
                    }>;
                    effective_from: z.ZodISODateTime;
                    effective_until: z.ZodOptional<z.ZodISODateTime>;
                }, z.core.$strict>;
                economics: z.ZodObject<{
                    consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"none">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"fixed">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"variable">;
                        description: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"unknown">;
                        description: z.ZodString;
                    }, z.core.$strict>], "kind">;
                    benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"credit">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"discount">;
                        percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                        applies_to: z.ZodOptional<z.ZodString>;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"cashback">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"money">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                                maximum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"percentage">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum_basis_points: z.ZodNumber;
                                maximum_basis_points: z.ZodNumber;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"waiver">;
                        waived_item: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"free-service">;
                        service: z.ZodString;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"other">;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>;
                eligibility: z.ZodObject<{
                    rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
                }, z.core.$strict>;
                roles: z.ZodObject<{
                    terms_authority_entity_id: z.ZodString;
                    access_operator_entity_id: z.ZodString;
                }, z.core.$strict>;
                source_ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
                declared: z.ZodOptional<z.ZodLiteral<true>>;
                access: z.ZodObject<{
                    availability: z.ZodEnum<{
                        automatic: "automatic";
                        invite: "invite";
                        membership: "membership";
                        other: "other";
                        public: "public";
                        referral: "referral";
                    }>;
                    method: z.ZodEnum<{
                        automatic: "automatic";
                        code: "code";
                        contact: "contact";
                        form: "form";
                        other: "other";
                    }>;
                    public_code: z.ZodOptional<z.ZodString>;
                    url: z.ZodOptional<z.ZodURL>;
                    instructions: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>;
                terms_url: z.ZodOptional<z.ZodURL>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        candidate_assets: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
                    "image/svg+xml": "image/svg+xml";
                    "image/webp": "image/webp";
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
                    "image/svg+xml": "image/svg+xml";
                    "image/webp": "image/webp";
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
                        "image/svg+xml": "image/svg+xml";
                        "image/webp": "image/webp";
                    }>;
                    source_path: z.ZodString;
                }, z.core.$strict>;
                safe_variants: z.ZodArray<z.ZodObject<{
                    digest: z.ZodString;
                    bytes: z.ZodNumber;
                    media_type: z.ZodEnum<{
                        "image/jpeg": "image/jpeg";
                        "image/png": "image/png";
                        "image/svg+xml": "image/svg+xml";
                        "image/webp": "image/webp";
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
                        "nominative-use": "nominative-use";
                        "redistributable-license": "redistributable-license";
                        "sourcey-owned": "sourcey-owned";
                        "vendor-approved": "vendor-approved";
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
                "editorial-review": "editorial-review";
                "licensed-source": "licensed-source";
                "sourcey-owned": "sourcey-owned";
                "vendor-authority": "vendor-authority";
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
                        "nominative-use": "nominative-use";
                        "redistributable-license": "redistributable-license";
                        "sourcey-owned": "sourcey-owned";
                        "vendor-approved": "vendor-approved";
                    }>;
                    license: z.ZodString;
                    notice: z.ZodString;
                    trademark_owner: z.ZodString;
                    fallback_reason: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>;
                authority_basis: z.ZodEnum<{
                    "editorial-review": "editorial-review";
                    "licensed-source": "licensed-source";
                    "sourcey-owned": "sourcey-owned";
                    "vendor-authority": "vendor-authority";
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
        }, z.core.$strict>>>;
        remove_entity_ids: z.ZodArray<z.ZodString>;
        expected_current_entities: z.ZodArray<z.ZodObject<{
            entity_id: z.ZodString;
            snapshot_digest: z.ZodNullable<z.ZodString>;
        }, z.core.$strict>>;
        expected_current_asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
            entity_id: z.ZodString;
            role: z.ZodLiteral<"icon">;
            binding_event_id: z.ZodNullable<z.ZodString>;
            binding_digest: z.ZodNullable<z.ZodString>;
        }, z.core.$strict>>>;
        authority_proposals: z.ZodArray<z.ZodObject<{
            purpose: z.ZodEnum<{
                "catalog-attestation": "catalog-attestation";
                "catalog-authority": "catalog-authority";
                "catalog-dispute": "catalog-dispute";
                "catalog-evidence": "catalog-evidence";
                "catalog-feed": "catalog-feed";
                "catalog-identity": "catalog-identity";
                "catalog-policy": "catalog-policy";
                "catalog-release": "catalog-release";
                "catalog-verification": "catalog-verification";
            }>;
            proposal_digest: z.ZodString;
            dependency_keys: z.ZodArray<z.ZodString>;
            public_input_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
        target_policies: z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            digest: z.ZodString;
        }, z.core.$strict>>;
        target_contract_authority_digest: z.ZodString;
        proposal_digest: z.ZodString;
    }, z.core.$strict>;
    change_set: z.ZodObject<{
        proposal_digest: z.ZodString;
        live_parent_release_id: z.ZodString;
        current_context_digest: z.ZodString;
        target_context_digest: z.ZodString;
        revision_changes: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<{
                entity: "entity";
                offer: "offer";
                program: "program";
            }>;
            entity_id: z.ZodString;
            target_id: z.ZodString;
            change: z.ZodEnum<{
                added: "added";
                removed: "removed";
                updated: "updated";
            }>;
            current_revision_digest: z.ZodNullable<z.ZodString>;
            candidate_revision_digest: z.ZodNullable<z.ZodString>;
            semantic_paths: z.ZodArray<z.ZodString>;
            source_change_ids: z.ZodArray<z.ZodString>;
            parent_changed: z.ZodBoolean;
        }, z.core.$strict>>;
        source_changes: z.ZodArray<z.ZodObject<{
            entity_id: z.ZodString;
            source_id: z.ZodString;
            change: z.ZodEnum<{
                added: "added";
                removed: "removed";
                updated: "updated";
            }>;
            current_url: z.ZodNullable<z.ZodURL>;
            candidate_url: z.ZodNullable<z.ZodURL>;
        }, z.core.$strict>>;
        asset_changes: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            change: z.ZodLiteral<"upsert">;
            entity_id: z.ZodString;
            role: z.ZodLiteral<"icon">;
            current_binding_event_id: z.ZodNullable<z.ZodString>;
            candidate_proposal_digest: z.ZodString;
            current_asset_object_digest: z.ZodNullable<z.ZodString>;
            candidate_asset_object_digest: z.ZodString;
            current_served_digest: z.ZodNullable<z.ZodString>;
            candidate_served_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            change: z.ZodLiteral<"remove">;
            entity_id: z.ZodString;
            role: z.ZodLiteral<"icon">;
            current_binding_event_id: z.ZodString;
            current_asset_object_digest: z.ZodString;
            current_served_digest: z.ZodString;
        }, z.core.$strict>], "change">>>;
        route_changes: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<{
                entity: "entity";
                offer: "offer";
                program: "program";
            }>;
            entity_id: z.ZodString;
            target_id: z.ZodString;
            current_slug: z.ZodNullable<z.ZodString>;
            candidate_slug: z.ZodNullable<z.ZodString>;
            added_aliases: z.ZodArray<z.ZodString>;
            removed_aliases: z.ZodArray<z.ZodString>;
        }, z.core.$strict>>;
        context_changes: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"policy">;
            key: z.ZodString;
            current_digest: z.ZodNullable<z.ZodString>;
            target_digest: z.ZodNullable<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"contract_authority">;
            current_digest: z.ZodString;
            target_digest: z.ZodString;
        }, z.core.$strict>], "kind">>;
        public_authoring_paths: z.ZodArray<z.ZodString>;
        changed_dependency_keys: z.ZodArray<z.ZodString>;
        impact_index_digest: z.ZodString;
        dependency_lookups: z.ZodNumber;
        affected_dependents: z.ZodArray<z.ZodObject<{
            domain: z.ZodString;
            key: z.ZodString;
        }, z.core.$strict>>;
        unaffected_dependents_proof_digest: z.ZodString;
        required_authorities: z.ZodArray<z.ZodEnum<{
            "catalog-attestation": "catalog-attestation";
            "catalog-authority": "catalog-authority";
            "catalog-dispute": "catalog-dispute";
            "catalog-evidence": "catalog-evidence";
            "catalog-feed": "catalog-feed";
            "catalog-identity": "catalog-identity";
            "catalog-policy": "catalog-policy";
            "catalog-release": "catalog-release";
            "catalog-verification": "catalog-verification";
        }>>;
        change_set_digest: z.ZodString;
    }, z.core.$strict>;
    ingresses: z.ZodArray<z.ZodObject<{
        proposal: z.ZodObject<{
            live_parent_release_id: z.ZodString;
            candidate_entities: z.ZodArray<z.ZodObject<{
                schema_version: z.ZodLiteral<"sourcey.entity-authoring/v1alpha1">;
                programs: z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    program_slug: z.ZodString;
                    program_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                    title: z.ZodString;
                    summary: z.ZodOptional<z.ZodString>;
                    source_ids: z.ZodArray<z.ZodString>;
                }, z.core.$strict>>;
                entity: z.ZodObject<{
                    entity_id: z.ZodString;
                    slug: z.ZodString;
                    slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                    name: z.ZodString;
                    domains: z.ZodArray<z.ZodObject<{
                        value: z.ZodString;
                        role: z.ZodEnum<{
                            alias: "alias";
                            primary: "primary";
                        }>;
                        valid_from: z.ZodISODateTime;
                        valid_until: z.ZodOptional<z.ZodISODateTime>;
                    }, z.core.$strict>>;
                    category: z.ZodString;
                }, z.core.$strict>;
                profile: z.ZodObject<{
                    summary: z.ZodOptional<z.ZodString>;
                    description: z.ZodString;
                    links: z.ZodObject<{
                        site: z.ZodURL;
                        pricing: z.ZodOptional<z.ZodURL>;
                    }, z.core.$strict>;
                }, z.core.$strict>;
                sources: z.ZodArray<z.ZodObject<{
                    source_id: z.ZodString;
                    url: z.ZodURL;
                }, z.core.$strict>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    program_id: z.ZodOptional<z.ZodString>;
                    offer_slug: z.ZodString;
                    offer_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                    title: z.ZodString;
                    summary: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                    lifecycle: z.ZodObject<{
                        status: z.ZodEnum<{
                            active: "active";
                            ended: "ended";
                            withdrawn: "withdrawn";
                        }>;
                        effective_from: z.ZodISODateTime;
                        effective_until: z.ZodOptional<z.ZodISODateTime>;
                    }, z.core.$strict>;
                    economics: z.ZodObject<{
                        consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"none">;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"fixed">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"variable">;
                            description: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"unknown">;
                            description: z.ZodString;
                        }, z.core.$strict>], "kind">;
                        benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            benefit_id: z.ZodString;
                            description: z.ZodString;
                            kind: z.ZodLiteral<"credit">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                                maximum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>], "kind">;
                            duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodString;
                                maximum: z.ZodString;
                            }, z.core.$strict>], "kind">>;
                        }, z.core.$strict>, z.ZodObject<{
                            benefit_id: z.ZodString;
                            description: z.ZodString;
                            kind: z.ZodLiteral<"discount">;
                            percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum_basis_points: z.ZodNumber;
                                maximum_basis_points: z.ZodNumber;
                            }, z.core.$strict>], "kind">;
                            applies_to: z.ZodOptional<z.ZodString>;
                            duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodString;
                                maximum: z.ZodString;
                            }, z.core.$strict>], "kind">>;
                        }, z.core.$strict>, z.ZodObject<{
                            benefit_id: z.ZodString;
                            description: z.ZodString;
                            kind: z.ZodLiteral<"cashback">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"money">;
                                value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                    kind: z.ZodLiteral<"exact">;
                                    amount: z.ZodObject<{
                                        currency: z.ZodString;
                                        minor_units: z.ZodNumber;
                                    }, z.core.$strict>;
                                }, z.core.$strict>, z.ZodObject<{
                                    kind: z.ZodLiteral<"up-to">;
                                    amount: z.ZodObject<{
                                        currency: z.ZodString;
                                        minor_units: z.ZodNumber;
                                    }, z.core.$strict>;
                                }, z.core.$strict>, z.ZodObject<{
                                    kind: z.ZodLiteral<"at-least">;
                                    amount: z.ZodObject<{
                                        currency: z.ZodString;
                                        minor_units: z.ZodNumber;
                                    }, z.core.$strict>;
                                }, z.core.$strict>, z.ZodObject<{
                                    kind: z.ZodLiteral<"range">;
                                    minimum: z.ZodObject<{
                                        currency: z.ZodString;
                                        minor_units: z.ZodNumber;
                                    }, z.core.$strict>;
                                    maximum: z.ZodObject<{
                                        currency: z.ZodString;
                                        minor_units: z.ZodNumber;
                                    }, z.core.$strict>;
                                }, z.core.$strict>], "kind">;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"percentage">;
                                value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                    kind: z.ZodLiteral<"exact">;
                                    basis_points: z.ZodNumber;
                                }, z.core.$strict>, z.ZodObject<{
                                    kind: z.ZodLiteral<"up-to">;
                                    basis_points: z.ZodNumber;
                                }, z.core.$strict>, z.ZodObject<{
                                    kind: z.ZodLiteral<"at-least">;
                                    basis_points: z.ZodNumber;
                                }, z.core.$strict>, z.ZodObject<{
                                    kind: z.ZodLiteral<"range">;
                                    minimum_basis_points: z.ZodNumber;
                                    maximum_basis_points: z.ZodNumber;
                                }, z.core.$strict>], "kind">;
                            }, z.core.$strict>], "kind">;
                            duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodString;
                                maximum: z.ZodString;
                            }, z.core.$strict>], "kind">>;
                        }, z.core.$strict>, z.ZodObject<{
                            benefit_id: z.ZodString;
                            description: z.ZodString;
                            kind: z.ZodLiteral<"waiver">;
                            waived_item: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            benefit_id: z.ZodString;
                            description: z.ZodString;
                            kind: z.ZodLiteral<"free-service">;
                            service: z.ZodString;
                            duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodString;
                                maximum: z.ZodString;
                            }, z.core.$strict>], "kind">>;
                        }, z.core.$strict>, z.ZodObject<{
                            benefit_id: z.ZodString;
                            description: z.ZodString;
                            kind: z.ZodLiteral<"other">;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>;
                    eligibility: z.ZodObject<{
                        rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
                    }, z.core.$strict>;
                    roles: z.ZodObject<{
                        terms_authority_entity_id: z.ZodString;
                        access_operator_entity_id: z.ZodString;
                    }, z.core.$strict>;
                    source_ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
                    declared: z.ZodOptional<z.ZodLiteral<true>>;
                    access: z.ZodObject<{
                        availability: z.ZodEnum<{
                            automatic: "automatic";
                            invite: "invite";
                            membership: "membership";
                            other: "other";
                            public: "public";
                            referral: "referral";
                        }>;
                        method: z.ZodEnum<{
                            automatic: "automatic";
                            code: "code";
                            contact: "contact";
                            form: "form";
                            other: "other";
                        }>;
                        public_code: z.ZodOptional<z.ZodString>;
                        url: z.ZodOptional<z.ZodURL>;
                        instructions: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>;
                    terms_url: z.ZodOptional<z.ZodURL>;
                }, z.core.$strict>>;
            }, z.core.$strict>>;
            candidate_assets: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
                        "image/svg+xml": "image/svg+xml";
                        "image/webp": "image/webp";
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
                        "image/svg+xml": "image/svg+xml";
                        "image/webp": "image/webp";
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
                            "image/svg+xml": "image/svg+xml";
                            "image/webp": "image/webp";
                        }>;
                        source_path: z.ZodString;
                    }, z.core.$strict>;
                    safe_variants: z.ZodArray<z.ZodObject<{
                        digest: z.ZodString;
                        bytes: z.ZodNumber;
                        media_type: z.ZodEnum<{
                            "image/jpeg": "image/jpeg";
                            "image/png": "image/png";
                            "image/svg+xml": "image/svg+xml";
                            "image/webp": "image/webp";
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
                            "nominative-use": "nominative-use";
                            "redistributable-license": "redistributable-license";
                            "sourcey-owned": "sourcey-owned";
                            "vendor-approved": "vendor-approved";
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
                    "editorial-review": "editorial-review";
                    "licensed-source": "licensed-source";
                    "sourcey-owned": "sourcey-owned";
                    "vendor-authority": "vendor-authority";
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
                            "nominative-use": "nominative-use";
                            "redistributable-license": "redistributable-license";
                            "sourcey-owned": "sourcey-owned";
                            "vendor-approved": "vendor-approved";
                        }>;
                        license: z.ZodString;
                        notice: z.ZodString;
                        trademark_owner: z.ZodString;
                        fallback_reason: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>;
                    authority_basis: z.ZodEnum<{
                        "editorial-review": "editorial-review";
                        "licensed-source": "licensed-source";
                        "sourcey-owned": "sourcey-owned";
                        "vendor-authority": "vendor-authority";
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
            }, z.core.$strict>>>;
            remove_entity_ids: z.ZodArray<z.ZodString>;
            expected_current_entities: z.ZodArray<z.ZodObject<{
                entity_id: z.ZodString;
                snapshot_digest: z.ZodNullable<z.ZodString>;
            }, z.core.$strict>>;
            expected_current_asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                entity_id: z.ZodString;
                role: z.ZodLiteral<"icon">;
                binding_event_id: z.ZodNullable<z.ZodString>;
                binding_digest: z.ZodNullable<z.ZodString>;
            }, z.core.$strict>>>;
            authority_proposals: z.ZodArray<z.ZodObject<{
                purpose: z.ZodEnum<{
                    "catalog-attestation": "catalog-attestation";
                    "catalog-authority": "catalog-authority";
                    "catalog-dispute": "catalog-dispute";
                    "catalog-evidence": "catalog-evidence";
                    "catalog-feed": "catalog-feed";
                    "catalog-identity": "catalog-identity";
                    "catalog-policy": "catalog-policy";
                    "catalog-release": "catalog-release";
                    "catalog-verification": "catalog-verification";
                }>;
                proposal_digest: z.ZodString;
                dependency_keys: z.ZodArray<z.ZodString>;
                public_input_digest: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>;
            target_policies: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                digest: z.ZodString;
            }, z.core.$strict>>;
            target_contract_authority_digest: z.ZodString;
            proposal_digest: z.ZodString;
        }, z.core.$strict>;
        change_set: z.ZodObject<{
            proposal_digest: z.ZodString;
            live_parent_release_id: z.ZodString;
            current_context_digest: z.ZodString;
            target_context_digest: z.ZodString;
            revision_changes: z.ZodArray<z.ZodObject<{
                kind: z.ZodEnum<{
                    entity: "entity";
                    offer: "offer";
                    program: "program";
                }>;
                entity_id: z.ZodString;
                target_id: z.ZodString;
                change: z.ZodEnum<{
                    added: "added";
                    removed: "removed";
                    updated: "updated";
                }>;
                current_revision_digest: z.ZodNullable<z.ZodString>;
                candidate_revision_digest: z.ZodNullable<z.ZodString>;
                semantic_paths: z.ZodArray<z.ZodString>;
                source_change_ids: z.ZodArray<z.ZodString>;
                parent_changed: z.ZodBoolean;
            }, z.core.$strict>>;
            source_changes: z.ZodArray<z.ZodObject<{
                entity_id: z.ZodString;
                source_id: z.ZodString;
                change: z.ZodEnum<{
                    added: "added";
                    removed: "removed";
                    updated: "updated";
                }>;
                current_url: z.ZodNullable<z.ZodURL>;
                candidate_url: z.ZodNullable<z.ZodURL>;
            }, z.core.$strict>>;
            asset_changes: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                change: z.ZodLiteral<"upsert">;
                entity_id: z.ZodString;
                role: z.ZodLiteral<"icon">;
                current_binding_event_id: z.ZodNullable<z.ZodString>;
                candidate_proposal_digest: z.ZodString;
                current_asset_object_digest: z.ZodNullable<z.ZodString>;
                candidate_asset_object_digest: z.ZodString;
                current_served_digest: z.ZodNullable<z.ZodString>;
                candidate_served_digest: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                change: z.ZodLiteral<"remove">;
                entity_id: z.ZodString;
                role: z.ZodLiteral<"icon">;
                current_binding_event_id: z.ZodString;
                current_asset_object_digest: z.ZodString;
                current_served_digest: z.ZodString;
            }, z.core.$strict>], "change">>>;
            route_changes: z.ZodArray<z.ZodObject<{
                kind: z.ZodEnum<{
                    entity: "entity";
                    offer: "offer";
                    program: "program";
                }>;
                entity_id: z.ZodString;
                target_id: z.ZodString;
                current_slug: z.ZodNullable<z.ZodString>;
                candidate_slug: z.ZodNullable<z.ZodString>;
                added_aliases: z.ZodArray<z.ZodString>;
                removed_aliases: z.ZodArray<z.ZodString>;
            }, z.core.$strict>>;
            context_changes: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"policy">;
                key: z.ZodString;
                current_digest: z.ZodNullable<z.ZodString>;
                target_digest: z.ZodNullable<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"contract_authority">;
                current_digest: z.ZodString;
                target_digest: z.ZodString;
            }, z.core.$strict>], "kind">>;
            public_authoring_paths: z.ZodArray<z.ZodString>;
            changed_dependency_keys: z.ZodArray<z.ZodString>;
            impact_index_digest: z.ZodString;
            dependency_lookups: z.ZodNumber;
            affected_dependents: z.ZodArray<z.ZodObject<{
                domain: z.ZodString;
                key: z.ZodString;
            }, z.core.$strict>>;
            unaffected_dependents_proof_digest: z.ZodString;
            required_authorities: z.ZodArray<z.ZodEnum<{
                "catalog-attestation": "catalog-attestation";
                "catalog-authority": "catalog-authority";
                "catalog-dispute": "catalog-dispute";
                "catalog-evidence": "catalog-evidence";
                "catalog-feed": "catalog-feed";
                "catalog-identity": "catalog-identity";
                "catalog-policy": "catalog-policy";
                "catalog-release": "catalog-release";
                "catalog-verification": "catalog-verification";
            }>>;
            change_set_digest: z.ZodString;
        }, z.core.$strict>;
        ingress_receipt: z.ZodDiscriminatedUnion<[z.ZodObject<{
            proposal_digest: z.ZodString;
            semantic_input_digest: z.ZodString;
            kind: z.ZodLiteral<"git">;
            repository_id: z.ZodString;
            base_commit: z.ZodString;
            head_commit: z.ZodString;
            head_tree: z.ZodString;
            changed_tree: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            proposal_digest: z.ZodString;
            semantic_input_digest: z.ZodString;
            kind: z.ZodLiteral<"authenticated_form">;
            submission_work_item_digest: z.ZodString;
            schema_digest: z.ZodString;
            payload_digest: z.ZodString;
            authentication_digest: z.ZodString;
            authorization_digest: z.ZodString;
            operator_admission_digest: z.ZodNullable<z.ZodString>;
            idempotency_key: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            proposal_digest: z.ZodString;
            semantic_input_digest: z.ZodString;
            kind: z.ZodLiteral<"paid_agent">;
            submission_work_item_digest: z.ZodString;
            schema_digest: z.ZodString;
            payload_digest: z.ZodString;
            authentication_digest: z.ZodString;
            authorization_digest: z.ZodString;
            operator_admission_digest: z.ZodNullable<z.ZodString>;
            request_id: z.ZodString;
            idempotency_key: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            proposal_digest: z.ZodString;
            semantic_input_digest: z.ZodString;
            kind: z.ZodLiteral<"governed_ops">;
            submission_work_item_digest: z.ZodNullable<z.ZodString>;
            command_digest: z.ZodString;
            grant_digest: z.ZodString;
            approval_digest: z.ZodNullable<z.ZodString>;
            run_receipt_digest: z.ZodString;
            authentication_digest: z.ZodString;
            authorization_digest: z.ZodString;
            idempotency_key: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            proposal_digest: z.ZodString;
            semantic_input_digest: z.ZodString;
            kind: z.ZodLiteral<"scanner">;
            inventory_digest: z.ZodString;
            run_receipt_digest: z.ZodString;
            idempotency_key: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            proposal_digest: z.ZodString;
            semantic_input_digest: z.ZodString;
            kind: z.ZodLiteral<"operator_job">;
            job_input_digest: z.ZodString;
            authority_digest: z.ZodString;
            run_receipt_digest: z.ZodString;
            idempotency_key: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            proposal_digest: z.ZodString;
            semantic_input_digest: z.ZodString;
            kind: z.ZodLiteral<"policy_transition">;
            intent_digest: z.ZodString;
            configuration_digest: z.ZodString;
            idempotency_key: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>], "kind">;
    }, z.core.$strict>>;
}, z.core.$strict>;
/** Immutable composer input. It carries only the targeted live slice, never a Catalog copy. */
export declare const catalogPublicationAdmissionInputSchema: z.ZodObject<{
    proposal: z.ZodObject<{
        live_parent_release_id: z.ZodString;
        candidate_entities: z.ZodArray<z.ZodObject<{
            schema_version: z.ZodLiteral<"sourcey.entity-authoring/v1alpha1">;
            programs: z.ZodArray<z.ZodObject<{
                program_id: z.ZodString;
                program_slug: z.ZodString;
                program_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                title: z.ZodString;
                summary: z.ZodOptional<z.ZodString>;
                source_ids: z.ZodArray<z.ZodString>;
            }, z.core.$strict>>;
            entity: z.ZodObject<{
                entity_id: z.ZodString;
                slug: z.ZodString;
                slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                name: z.ZodString;
                domains: z.ZodArray<z.ZodObject<{
                    value: z.ZodString;
                    role: z.ZodEnum<{
                        alias: "alias";
                        primary: "primary";
                    }>;
                    valid_from: z.ZodISODateTime;
                    valid_until: z.ZodOptional<z.ZodISODateTime>;
                }, z.core.$strict>>;
                category: z.ZodString;
            }, z.core.$strict>;
            profile: z.ZodObject<{
                summary: z.ZodOptional<z.ZodString>;
                description: z.ZodString;
                links: z.ZodObject<{
                    site: z.ZodURL;
                    pricing: z.ZodOptional<z.ZodURL>;
                }, z.core.$strict>;
            }, z.core.$strict>;
            sources: z.ZodArray<z.ZodObject<{
                source_id: z.ZodString;
                url: z.ZodURL;
            }, z.core.$strict>>;
            offers: z.ZodArray<z.ZodObject<{
                offer_id: z.ZodString;
                program_id: z.ZodOptional<z.ZodString>;
                offer_slug: z.ZodString;
                offer_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                title: z.ZodString;
                summary: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
                lifecycle: z.ZodObject<{
                    status: z.ZodEnum<{
                        active: "active";
                        ended: "ended";
                        withdrawn: "withdrawn";
                    }>;
                    effective_from: z.ZodISODateTime;
                    effective_until: z.ZodOptional<z.ZodISODateTime>;
                }, z.core.$strict>;
                economics: z.ZodObject<{
                    consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"none">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"fixed">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"variable">;
                        description: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"unknown">;
                        description: z.ZodString;
                    }, z.core.$strict>], "kind">;
                    benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"credit">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"discount">;
                        percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                        applies_to: z.ZodOptional<z.ZodString>;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"cashback">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"money">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                                maximum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"percentage">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum_basis_points: z.ZodNumber;
                                maximum_basis_points: z.ZodNumber;
                            }, z.core.$strict>], "kind">;
                        }, z.core.$strict>], "kind">;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"waiver">;
                        waived_item: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"free-service">;
                        service: z.ZodString;
                        duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            value: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodString;
                            maximum: z.ZodString;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>, z.ZodObject<{
                        benefit_id: z.ZodString;
                        description: z.ZodString;
                        kind: z.ZodLiteral<"other">;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>;
                eligibility: z.ZodObject<{
                    rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
                }, z.core.$strict>;
                roles: z.ZodObject<{
                    terms_authority_entity_id: z.ZodString;
                    access_operator_entity_id: z.ZodString;
                }, z.core.$strict>;
                source_ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
                declared: z.ZodOptional<z.ZodLiteral<true>>;
                access: z.ZodObject<{
                    availability: z.ZodEnum<{
                        automatic: "automatic";
                        invite: "invite";
                        membership: "membership";
                        other: "other";
                        public: "public";
                        referral: "referral";
                    }>;
                    method: z.ZodEnum<{
                        automatic: "automatic";
                        code: "code";
                        contact: "contact";
                        form: "form";
                        other: "other";
                    }>;
                    public_code: z.ZodOptional<z.ZodString>;
                    url: z.ZodOptional<z.ZodURL>;
                    instructions: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>;
                terms_url: z.ZodOptional<z.ZodURL>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        candidate_assets: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
                    "image/svg+xml": "image/svg+xml";
                    "image/webp": "image/webp";
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
                    "image/svg+xml": "image/svg+xml";
                    "image/webp": "image/webp";
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
                        "image/svg+xml": "image/svg+xml";
                        "image/webp": "image/webp";
                    }>;
                    source_path: z.ZodString;
                }, z.core.$strict>;
                safe_variants: z.ZodArray<z.ZodObject<{
                    digest: z.ZodString;
                    bytes: z.ZodNumber;
                    media_type: z.ZodEnum<{
                        "image/jpeg": "image/jpeg";
                        "image/png": "image/png";
                        "image/svg+xml": "image/svg+xml";
                        "image/webp": "image/webp";
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
                        "nominative-use": "nominative-use";
                        "redistributable-license": "redistributable-license";
                        "sourcey-owned": "sourcey-owned";
                        "vendor-approved": "vendor-approved";
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
                "editorial-review": "editorial-review";
                "licensed-source": "licensed-source";
                "sourcey-owned": "sourcey-owned";
                "vendor-authority": "vendor-authority";
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
                        "nominative-use": "nominative-use";
                        "redistributable-license": "redistributable-license";
                        "sourcey-owned": "sourcey-owned";
                        "vendor-approved": "vendor-approved";
                    }>;
                    license: z.ZodString;
                    notice: z.ZodString;
                    trademark_owner: z.ZodString;
                    fallback_reason: z.ZodOptional<z.ZodString>;
                }, z.core.$strict>;
                authority_basis: z.ZodEnum<{
                    "editorial-review": "editorial-review";
                    "licensed-source": "licensed-source";
                    "sourcey-owned": "sourcey-owned";
                    "vendor-authority": "vendor-authority";
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
        }, z.core.$strict>>>;
        remove_entity_ids: z.ZodArray<z.ZodString>;
        expected_current_entities: z.ZodArray<z.ZodObject<{
            entity_id: z.ZodString;
            snapshot_digest: z.ZodNullable<z.ZodString>;
        }, z.core.$strict>>;
        expected_current_asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
            entity_id: z.ZodString;
            role: z.ZodLiteral<"icon">;
            binding_event_id: z.ZodNullable<z.ZodString>;
            binding_digest: z.ZodNullable<z.ZodString>;
        }, z.core.$strict>>>;
        authority_proposals: z.ZodArray<z.ZodObject<{
            purpose: z.ZodEnum<{
                "catalog-attestation": "catalog-attestation";
                "catalog-authority": "catalog-authority";
                "catalog-dispute": "catalog-dispute";
                "catalog-evidence": "catalog-evidence";
                "catalog-feed": "catalog-feed";
                "catalog-identity": "catalog-identity";
                "catalog-policy": "catalog-policy";
                "catalog-release": "catalog-release";
                "catalog-verification": "catalog-verification";
            }>;
            proposal_digest: z.ZodString;
            dependency_keys: z.ZodArray<z.ZodString>;
            public_input_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
        target_policies: z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            digest: z.ZodString;
        }, z.core.$strict>>;
        target_contract_authority_digest: z.ZodString;
        proposal_digest: z.ZodString;
    }, z.core.$strict>;
    change_set: z.ZodObject<{
        proposal_digest: z.ZodString;
        live_parent_release_id: z.ZodString;
        current_context_digest: z.ZodString;
        target_context_digest: z.ZodString;
        revision_changes: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<{
                entity: "entity";
                offer: "offer";
                program: "program";
            }>;
            entity_id: z.ZodString;
            target_id: z.ZodString;
            change: z.ZodEnum<{
                added: "added";
                removed: "removed";
                updated: "updated";
            }>;
            current_revision_digest: z.ZodNullable<z.ZodString>;
            candidate_revision_digest: z.ZodNullable<z.ZodString>;
            semantic_paths: z.ZodArray<z.ZodString>;
            source_change_ids: z.ZodArray<z.ZodString>;
            parent_changed: z.ZodBoolean;
        }, z.core.$strict>>;
        source_changes: z.ZodArray<z.ZodObject<{
            entity_id: z.ZodString;
            source_id: z.ZodString;
            change: z.ZodEnum<{
                added: "added";
                removed: "removed";
                updated: "updated";
            }>;
            current_url: z.ZodNullable<z.ZodURL>;
            candidate_url: z.ZodNullable<z.ZodURL>;
        }, z.core.$strict>>;
        asset_changes: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            change: z.ZodLiteral<"upsert">;
            entity_id: z.ZodString;
            role: z.ZodLiteral<"icon">;
            current_binding_event_id: z.ZodNullable<z.ZodString>;
            candidate_proposal_digest: z.ZodString;
            current_asset_object_digest: z.ZodNullable<z.ZodString>;
            candidate_asset_object_digest: z.ZodString;
            current_served_digest: z.ZodNullable<z.ZodString>;
            candidate_served_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            change: z.ZodLiteral<"remove">;
            entity_id: z.ZodString;
            role: z.ZodLiteral<"icon">;
            current_binding_event_id: z.ZodString;
            current_asset_object_digest: z.ZodString;
            current_served_digest: z.ZodString;
        }, z.core.$strict>], "change">>>;
        route_changes: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<{
                entity: "entity";
                offer: "offer";
                program: "program";
            }>;
            entity_id: z.ZodString;
            target_id: z.ZodString;
            current_slug: z.ZodNullable<z.ZodString>;
            candidate_slug: z.ZodNullable<z.ZodString>;
            added_aliases: z.ZodArray<z.ZodString>;
            removed_aliases: z.ZodArray<z.ZodString>;
        }, z.core.$strict>>;
        context_changes: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"policy">;
            key: z.ZodString;
            current_digest: z.ZodNullable<z.ZodString>;
            target_digest: z.ZodNullable<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"contract_authority">;
            current_digest: z.ZodString;
            target_digest: z.ZodString;
        }, z.core.$strict>], "kind">>;
        public_authoring_paths: z.ZodArray<z.ZodString>;
        changed_dependency_keys: z.ZodArray<z.ZodString>;
        impact_index_digest: z.ZodString;
        dependency_lookups: z.ZodNumber;
        affected_dependents: z.ZodArray<z.ZodObject<{
            domain: z.ZodString;
            key: z.ZodString;
        }, z.core.$strict>>;
        unaffected_dependents_proof_digest: z.ZodString;
        required_authorities: z.ZodArray<z.ZodEnum<{
            "catalog-attestation": "catalog-attestation";
            "catalog-authority": "catalog-authority";
            "catalog-dispute": "catalog-dispute";
            "catalog-evidence": "catalog-evidence";
            "catalog-feed": "catalog-feed";
            "catalog-identity": "catalog-identity";
            "catalog-policy": "catalog-policy";
            "catalog-release": "catalog-release";
            "catalog-verification": "catalog-verification";
        }>>;
        change_set_digest: z.ZodString;
    }, z.core.$strict>;
    ingresses: z.ZodArray<z.ZodObject<{
        proposal: z.ZodObject<{
            live_parent_release_id: z.ZodString;
            candidate_entities: z.ZodArray<z.ZodObject<{
                schema_version: z.ZodLiteral<"sourcey.entity-authoring/v1alpha1">;
                programs: z.ZodArray<z.ZodObject<{
                    program_id: z.ZodString;
                    program_slug: z.ZodString;
                    program_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                    title: z.ZodString;
                    summary: z.ZodOptional<z.ZodString>;
                    source_ids: z.ZodArray<z.ZodString>;
                }, z.core.$strict>>;
                entity: z.ZodObject<{
                    entity_id: z.ZodString;
                    slug: z.ZodString;
                    slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                    name: z.ZodString;
                    domains: z.ZodArray<z.ZodObject<{
                        value: z.ZodString;
                        role: z.ZodEnum<{
                            alias: "alias";
                            primary: "primary";
                        }>;
                        valid_from: z.ZodISODateTime;
                        valid_until: z.ZodOptional<z.ZodISODateTime>;
                    }, z.core.$strict>>;
                    category: z.ZodString;
                }, z.core.$strict>;
                profile: z.ZodObject<{
                    summary: z.ZodOptional<z.ZodString>;
                    description: z.ZodString;
                    links: z.ZodObject<{
                        site: z.ZodURL;
                        pricing: z.ZodOptional<z.ZodURL>;
                    }, z.core.$strict>;
                }, z.core.$strict>;
                sources: z.ZodArray<z.ZodObject<{
                    source_id: z.ZodString;
                    url: z.ZodURL;
                }, z.core.$strict>>;
                offers: z.ZodArray<z.ZodObject<{
                    offer_id: z.ZodString;
                    program_id: z.ZodOptional<z.ZodString>;
                    offer_slug: z.ZodString;
                    offer_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
                    title: z.ZodString;
                    summary: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                    lifecycle: z.ZodObject<{
                        status: z.ZodEnum<{
                            active: "active";
                            ended: "ended";
                            withdrawn: "withdrawn";
                        }>;
                        effective_from: z.ZodISODateTime;
                        effective_until: z.ZodOptional<z.ZodISODateTime>;
                    }, z.core.$strict>;
                    economics: z.ZodObject<{
                        consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"none">;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"fixed">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"variable">;
                            description: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"unknown">;
                            description: z.ZodString;
                        }, z.core.$strict>], "kind">;
                        benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                            benefit_id: z.ZodString;
                            description: z.ZodString;
                            kind: z.ZodLiteral<"credit">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                amount: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                                maximum: z.ZodObject<{
                                    currency: z.ZodString;
                                    minor_units: z.ZodNumber;
                                }, z.core.$strict>;
                            }, z.core.$strict>], "kind">;
                            duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodString;
                                maximum: z.ZodString;
                            }, z.core.$strict>], "kind">>;
                        }, z.core.$strict>, z.ZodObject<{
                            benefit_id: z.ZodString;
                            description: z.ZodString;
                            kind: z.ZodLiteral<"discount">;
                            percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                basis_points: z.ZodNumber;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum_basis_points: z.ZodNumber;
                                maximum_basis_points: z.ZodNumber;
                            }, z.core.$strict>], "kind">;
                            applies_to: z.ZodOptional<z.ZodString>;
                            duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodString;
                                maximum: z.ZodString;
                            }, z.core.$strict>], "kind">>;
                        }, z.core.$strict>, z.ZodObject<{
                            benefit_id: z.ZodString;
                            description: z.ZodString;
                            kind: z.ZodLiteral<"cashback">;
                            value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"money">;
                                value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                    kind: z.ZodLiteral<"exact">;
                                    amount: z.ZodObject<{
                                        currency: z.ZodString;
                                        minor_units: z.ZodNumber;
                                    }, z.core.$strict>;
                                }, z.core.$strict>, z.ZodObject<{
                                    kind: z.ZodLiteral<"up-to">;
                                    amount: z.ZodObject<{
                                        currency: z.ZodString;
                                        minor_units: z.ZodNumber;
                                    }, z.core.$strict>;
                                }, z.core.$strict>, z.ZodObject<{
                                    kind: z.ZodLiteral<"at-least">;
                                    amount: z.ZodObject<{
                                        currency: z.ZodString;
                                        minor_units: z.ZodNumber;
                                    }, z.core.$strict>;
                                }, z.core.$strict>, z.ZodObject<{
                                    kind: z.ZodLiteral<"range">;
                                    minimum: z.ZodObject<{
                                        currency: z.ZodString;
                                        minor_units: z.ZodNumber;
                                    }, z.core.$strict>;
                                    maximum: z.ZodObject<{
                                        currency: z.ZodString;
                                        minor_units: z.ZodNumber;
                                    }, z.core.$strict>;
                                }, z.core.$strict>], "kind">;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"percentage">;
                                value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                                    kind: z.ZodLiteral<"exact">;
                                    basis_points: z.ZodNumber;
                                }, z.core.$strict>, z.ZodObject<{
                                    kind: z.ZodLiteral<"up-to">;
                                    basis_points: z.ZodNumber;
                                }, z.core.$strict>, z.ZodObject<{
                                    kind: z.ZodLiteral<"at-least">;
                                    basis_points: z.ZodNumber;
                                }, z.core.$strict>, z.ZodObject<{
                                    kind: z.ZodLiteral<"range">;
                                    minimum_basis_points: z.ZodNumber;
                                    maximum_basis_points: z.ZodNumber;
                                }, z.core.$strict>], "kind">;
                            }, z.core.$strict>], "kind">;
                            duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodString;
                                maximum: z.ZodString;
                            }, z.core.$strict>], "kind">>;
                        }, z.core.$strict>, z.ZodObject<{
                            benefit_id: z.ZodString;
                            description: z.ZodString;
                            kind: z.ZodLiteral<"waiver">;
                            waived_item: z.ZodString;
                        }, z.core.$strict>, z.ZodObject<{
                            benefit_id: z.ZodString;
                            description: z.ZodString;
                            kind: z.ZodLiteral<"free-service">;
                            service: z.ZodString;
                            duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                                kind: z.ZodLiteral<"exact">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"up-to">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"at-least">;
                                value: z.ZodString;
                            }, z.core.$strict>, z.ZodObject<{
                                kind: z.ZodLiteral<"range">;
                                minimum: z.ZodString;
                                maximum: z.ZodString;
                            }, z.core.$strict>], "kind">>;
                        }, z.core.$strict>, z.ZodObject<{
                            benefit_id: z.ZodString;
                            description: z.ZodString;
                            kind: z.ZodLiteral<"other">;
                        }, z.core.$strict>], "kind">>;
                    }, z.core.$strict>;
                    eligibility: z.ZodObject<{
                        rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
                    }, z.core.$strict>;
                    roles: z.ZodObject<{
                        terms_authority_entity_id: z.ZodString;
                        access_operator_entity_id: z.ZodString;
                    }, z.core.$strict>;
                    source_ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
                    declared: z.ZodOptional<z.ZodLiteral<true>>;
                    access: z.ZodObject<{
                        availability: z.ZodEnum<{
                            automatic: "automatic";
                            invite: "invite";
                            membership: "membership";
                            other: "other";
                            public: "public";
                            referral: "referral";
                        }>;
                        method: z.ZodEnum<{
                            automatic: "automatic";
                            code: "code";
                            contact: "contact";
                            form: "form";
                            other: "other";
                        }>;
                        public_code: z.ZodOptional<z.ZodString>;
                        url: z.ZodOptional<z.ZodURL>;
                        instructions: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>;
                    terms_url: z.ZodOptional<z.ZodURL>;
                }, z.core.$strict>>;
            }, z.core.$strict>>;
            candidate_assets: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
                        "image/svg+xml": "image/svg+xml";
                        "image/webp": "image/webp";
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
                        "image/svg+xml": "image/svg+xml";
                        "image/webp": "image/webp";
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
                            "image/svg+xml": "image/svg+xml";
                            "image/webp": "image/webp";
                        }>;
                        source_path: z.ZodString;
                    }, z.core.$strict>;
                    safe_variants: z.ZodArray<z.ZodObject<{
                        digest: z.ZodString;
                        bytes: z.ZodNumber;
                        media_type: z.ZodEnum<{
                            "image/jpeg": "image/jpeg";
                            "image/png": "image/png";
                            "image/svg+xml": "image/svg+xml";
                            "image/webp": "image/webp";
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
                            "nominative-use": "nominative-use";
                            "redistributable-license": "redistributable-license";
                            "sourcey-owned": "sourcey-owned";
                            "vendor-approved": "vendor-approved";
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
                    "editorial-review": "editorial-review";
                    "licensed-source": "licensed-source";
                    "sourcey-owned": "sourcey-owned";
                    "vendor-authority": "vendor-authority";
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
                            "nominative-use": "nominative-use";
                            "redistributable-license": "redistributable-license";
                            "sourcey-owned": "sourcey-owned";
                            "vendor-approved": "vendor-approved";
                        }>;
                        license: z.ZodString;
                        notice: z.ZodString;
                        trademark_owner: z.ZodString;
                        fallback_reason: z.ZodOptional<z.ZodString>;
                    }, z.core.$strict>;
                    authority_basis: z.ZodEnum<{
                        "editorial-review": "editorial-review";
                        "licensed-source": "licensed-source";
                        "sourcey-owned": "sourcey-owned";
                        "vendor-authority": "vendor-authority";
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
            }, z.core.$strict>>>;
            remove_entity_ids: z.ZodArray<z.ZodString>;
            expected_current_entities: z.ZodArray<z.ZodObject<{
                entity_id: z.ZodString;
                snapshot_digest: z.ZodNullable<z.ZodString>;
            }, z.core.$strict>>;
            expected_current_asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                entity_id: z.ZodString;
                role: z.ZodLiteral<"icon">;
                binding_event_id: z.ZodNullable<z.ZodString>;
                binding_digest: z.ZodNullable<z.ZodString>;
            }, z.core.$strict>>>;
            authority_proposals: z.ZodArray<z.ZodObject<{
                purpose: z.ZodEnum<{
                    "catalog-attestation": "catalog-attestation";
                    "catalog-authority": "catalog-authority";
                    "catalog-dispute": "catalog-dispute";
                    "catalog-evidence": "catalog-evidence";
                    "catalog-feed": "catalog-feed";
                    "catalog-identity": "catalog-identity";
                    "catalog-policy": "catalog-policy";
                    "catalog-release": "catalog-release";
                    "catalog-verification": "catalog-verification";
                }>;
                proposal_digest: z.ZodString;
                dependency_keys: z.ZodArray<z.ZodString>;
                public_input_digest: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>;
            target_policies: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                digest: z.ZodString;
            }, z.core.$strict>>;
            target_contract_authority_digest: z.ZodString;
            proposal_digest: z.ZodString;
        }, z.core.$strict>;
        change_set: z.ZodObject<{
            proposal_digest: z.ZodString;
            live_parent_release_id: z.ZodString;
            current_context_digest: z.ZodString;
            target_context_digest: z.ZodString;
            revision_changes: z.ZodArray<z.ZodObject<{
                kind: z.ZodEnum<{
                    entity: "entity";
                    offer: "offer";
                    program: "program";
                }>;
                entity_id: z.ZodString;
                target_id: z.ZodString;
                change: z.ZodEnum<{
                    added: "added";
                    removed: "removed";
                    updated: "updated";
                }>;
                current_revision_digest: z.ZodNullable<z.ZodString>;
                candidate_revision_digest: z.ZodNullable<z.ZodString>;
                semantic_paths: z.ZodArray<z.ZodString>;
                source_change_ids: z.ZodArray<z.ZodString>;
                parent_changed: z.ZodBoolean;
            }, z.core.$strict>>;
            source_changes: z.ZodArray<z.ZodObject<{
                entity_id: z.ZodString;
                source_id: z.ZodString;
                change: z.ZodEnum<{
                    added: "added";
                    removed: "removed";
                    updated: "updated";
                }>;
                current_url: z.ZodNullable<z.ZodURL>;
                candidate_url: z.ZodNullable<z.ZodURL>;
            }, z.core.$strict>>;
            asset_changes: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                change: z.ZodLiteral<"upsert">;
                entity_id: z.ZodString;
                role: z.ZodLiteral<"icon">;
                current_binding_event_id: z.ZodNullable<z.ZodString>;
                candidate_proposal_digest: z.ZodString;
                current_asset_object_digest: z.ZodNullable<z.ZodString>;
                candidate_asset_object_digest: z.ZodString;
                current_served_digest: z.ZodNullable<z.ZodString>;
                candidate_served_digest: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                change: z.ZodLiteral<"remove">;
                entity_id: z.ZodString;
                role: z.ZodLiteral<"icon">;
                current_binding_event_id: z.ZodString;
                current_asset_object_digest: z.ZodString;
                current_served_digest: z.ZodString;
            }, z.core.$strict>], "change">>>;
            route_changes: z.ZodArray<z.ZodObject<{
                kind: z.ZodEnum<{
                    entity: "entity";
                    offer: "offer";
                    program: "program";
                }>;
                entity_id: z.ZodString;
                target_id: z.ZodString;
                current_slug: z.ZodNullable<z.ZodString>;
                candidate_slug: z.ZodNullable<z.ZodString>;
                added_aliases: z.ZodArray<z.ZodString>;
                removed_aliases: z.ZodArray<z.ZodString>;
            }, z.core.$strict>>;
            context_changes: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"policy">;
                key: z.ZodString;
                current_digest: z.ZodNullable<z.ZodString>;
                target_digest: z.ZodNullable<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"contract_authority">;
                current_digest: z.ZodString;
                target_digest: z.ZodString;
            }, z.core.$strict>], "kind">>;
            public_authoring_paths: z.ZodArray<z.ZodString>;
            changed_dependency_keys: z.ZodArray<z.ZodString>;
            impact_index_digest: z.ZodString;
            dependency_lookups: z.ZodNumber;
            affected_dependents: z.ZodArray<z.ZodObject<{
                domain: z.ZodString;
                key: z.ZodString;
            }, z.core.$strict>>;
            unaffected_dependents_proof_digest: z.ZodString;
            required_authorities: z.ZodArray<z.ZodEnum<{
                "catalog-attestation": "catalog-attestation";
                "catalog-authority": "catalog-authority";
                "catalog-dispute": "catalog-dispute";
                "catalog-evidence": "catalog-evidence";
                "catalog-feed": "catalog-feed";
                "catalog-identity": "catalog-identity";
                "catalog-policy": "catalog-policy";
                "catalog-release": "catalog-release";
                "catalog-verification": "catalog-verification";
            }>>;
            change_set_digest: z.ZodString;
        }, z.core.$strict>;
        ingress_receipt: z.ZodDiscriminatedUnion<[z.ZodObject<{
            proposal_digest: z.ZodString;
            semantic_input_digest: z.ZodString;
            kind: z.ZodLiteral<"git">;
            repository_id: z.ZodString;
            base_commit: z.ZodString;
            head_commit: z.ZodString;
            head_tree: z.ZodString;
            changed_tree: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            proposal_digest: z.ZodString;
            semantic_input_digest: z.ZodString;
            kind: z.ZodLiteral<"authenticated_form">;
            submission_work_item_digest: z.ZodString;
            schema_digest: z.ZodString;
            payload_digest: z.ZodString;
            authentication_digest: z.ZodString;
            authorization_digest: z.ZodString;
            operator_admission_digest: z.ZodNullable<z.ZodString>;
            idempotency_key: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            proposal_digest: z.ZodString;
            semantic_input_digest: z.ZodString;
            kind: z.ZodLiteral<"paid_agent">;
            submission_work_item_digest: z.ZodString;
            schema_digest: z.ZodString;
            payload_digest: z.ZodString;
            authentication_digest: z.ZodString;
            authorization_digest: z.ZodString;
            operator_admission_digest: z.ZodNullable<z.ZodString>;
            request_id: z.ZodString;
            idempotency_key: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            proposal_digest: z.ZodString;
            semantic_input_digest: z.ZodString;
            kind: z.ZodLiteral<"governed_ops">;
            submission_work_item_digest: z.ZodNullable<z.ZodString>;
            command_digest: z.ZodString;
            grant_digest: z.ZodString;
            approval_digest: z.ZodNullable<z.ZodString>;
            run_receipt_digest: z.ZodString;
            authentication_digest: z.ZodString;
            authorization_digest: z.ZodString;
            idempotency_key: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            proposal_digest: z.ZodString;
            semantic_input_digest: z.ZodString;
            kind: z.ZodLiteral<"scanner">;
            inventory_digest: z.ZodString;
            run_receipt_digest: z.ZodString;
            idempotency_key: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            proposal_digest: z.ZodString;
            semantic_input_digest: z.ZodString;
            kind: z.ZodLiteral<"operator_job">;
            job_input_digest: z.ZodString;
            authority_digest: z.ZodString;
            run_receipt_digest: z.ZodString;
            idempotency_key: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            proposal_digest: z.ZodString;
            semantic_input_digest: z.ZodString;
            kind: z.ZodLiteral<"policy_transition">;
            intent_digest: z.ZodString;
            configuration_digest: z.ZodString;
            idempotency_key: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>], "kind">;
    }, z.core.$strict>>;
    current_entities: z.ZodArray<z.ZodObject<{
        schema_version: z.ZodLiteral<"sourcey.entity-authoring/v1alpha1">;
        programs: z.ZodArray<z.ZodObject<{
            program_id: z.ZodString;
            program_slug: z.ZodString;
            program_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            source_ids: z.ZodArray<z.ZodString>;
        }, z.core.$strict>>;
        entity: z.ZodObject<{
            entity_id: z.ZodString;
            slug: z.ZodString;
            slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            name: z.ZodString;
            domains: z.ZodArray<z.ZodObject<{
                value: z.ZodString;
                role: z.ZodEnum<{
                    alias: "alias";
                    primary: "primary";
                }>;
                valid_from: z.ZodISODateTime;
                valid_until: z.ZodOptional<z.ZodISODateTime>;
            }, z.core.$strict>>;
            category: z.ZodString;
        }, z.core.$strict>;
        profile: z.ZodObject<{
            summary: z.ZodOptional<z.ZodString>;
            description: z.ZodString;
            links: z.ZodObject<{
                site: z.ZodURL;
                pricing: z.ZodOptional<z.ZodURL>;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sources: z.ZodArray<z.ZodObject<{
            source_id: z.ZodString;
            url: z.ZodURL;
        }, z.core.$strict>>;
        offers: z.ZodArray<z.ZodObject<{
            offer_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_slug: z.ZodString;
            offer_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            title: z.ZodString;
            summary: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            lifecycle: z.ZodObject<{
                status: z.ZodEnum<{
                    active: "active";
                    ended: "ended";
                    withdrawn: "withdrawn";
                }>;
                effective_from: z.ZodISODateTime;
                effective_until: z.ZodOptional<z.ZodISODateTime>;
            }, z.core.$strict>;
            economics: z.ZodObject<{
                consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"fixed">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"variable">;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"unknown">;
                    description: z.ZodString;
                }, z.core.$strict>], "kind">;
                benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodString;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"other">;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>;
            eligibility: z.ZodObject<{
                rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
            }, z.core.$strict>;
            roles: z.ZodObject<{
                terms_authority_entity_id: z.ZodString;
                access_operator_entity_id: z.ZodString;
            }, z.core.$strict>;
            source_ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
            declared: z.ZodOptional<z.ZodLiteral<true>>;
            access: z.ZodObject<{
                availability: z.ZodEnum<{
                    automatic: "automatic";
                    invite: "invite";
                    membership: "membership";
                    other: "other";
                    public: "public";
                    referral: "referral";
                }>;
                method: z.ZodEnum<{
                    automatic: "automatic";
                    code: "code";
                    contact: "contact";
                    form: "form";
                    other: "other";
                }>;
                public_code: z.ZodOptional<z.ZodString>;
                url: z.ZodOptional<z.ZodURL>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    current_asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        role: z.ZodEnum<{
            icon: "icon";
            "logo-dark": "logo-dark";
            "logo-light": "logo-light";
        }>;
        asset_object_digest: z.ZodString;
        served_digest: z.ZodString;
        served_path: z.ZodString;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/svg+xml": "image/svg+xml";
            "image/webp": "image/webp";
        }>;
        bytes: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
        authority_basis: z.ZodEnum<{
            "editorial-review": "editorial-review";
            "licensed-source": "licensed-source";
            "sourcey-owned": "sourcey-owned";
            "vendor-authority": "vendor-authority";
        }>;
        authority_claim_id: z.ZodOptional<z.ZodString>;
        approval_receipt_digest: z.ZodString;
        source_basis: z.ZodString;
        license_basis: z.ZodString;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        binding_event_id: z.ZodString;
    }, z.core.$strict>>>;
}, z.core.$strict>;
export type PublicationDependencyRegistration = z.infer<typeof publicationDependencyRegistrationSchema>;
export type CatalogPublicationChangeSet = z.infer<typeof catalogPublicationChangeSetSchema>;
export type CatalogPublicationIngress = z.infer<typeof catalogPublicationIngressSchema>;
export type CatalogPublicationComposition = z.infer<typeof catalogPublicationCompositionSchema>;
export type CatalogPublicationAdmissionInput = z.infer<typeof catalogPublicationAdmissionInputSchema>;
export {};
//# sourceMappingURL=index.d.ts.map