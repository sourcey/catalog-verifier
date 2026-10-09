import { z } from "zod";
export declare const startupCreditsReviewRequestIdSchema: z.ZodString;
declare const startupCreditsEntityIconInputSchema: z.ZodObject<{
    source: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"upload">;
        upload_receipt_digest: z.ZodString;
        original_digest: z.ZodString;
        bytes: z.ZodNumber;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/svg+xml": "image/svg+xml";
            "image/webp": "image/webp";
        }>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"official_url">;
        url: z.ZodURL;
    }, z.core.$strict>], "kind">;
    trademark_owner: z.ZodString;
    relationship: z.ZodEnum<{
        "community-contributor": "community-contributor";
        "vendor-representative": "vendor-representative";
    }>;
}, z.core.$strict>;
export declare const startupCreditsExistingRecordReviewPreparationRequestSchema: z.ZodObject<{
    target: z.ZodObject<{
        kind: z.ZodLiteral<"existing_record">;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        entity_revision_digest: z.ZodString;
        offer_id: z.ZodString;
        offer_revision_digest: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
declare const startupCreditsExistingRecordReviewPreparationSchema: z.ZodObject<{
    target: z.ZodObject<{
        kind: z.ZodLiteral<"existing_record">;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        entity_revision_digest: z.ZodString;
        offer_id: z.ZodString;
        offer_revision_digest: z.ZodString;
        expected_purchase_preview_digest: z.ZodString;
    }, z.core.$strict>;
    purchase_preview: z.ZodObject<{
        preview_contract: z.ZodLiteral<"sourcey.startup-credits-purchase-preview/v1alpha1">;
        product_code: z.ZodLiteral<"startup-offer-human-verification">;
        purchase_kind: z.ZodLiteral<"one_off">;
        price_lookup_key: z.ZodLiteral<"startup-offer-human-verification-usd-29">;
        price: z.ZodObject<{
            currency: z.ZodLiteral<"usd">;
            minor_units: z.ZodLiteral<2900>;
        }, z.core.$strict>;
        work_scope: z.ZodLiteral<"one-entity-one-offer">;
        passing_results: z.ZodObject<{
            entity_identity: z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                binding: z.ZodLiteral<"identity-epoch">;
            }, z.core.$strict>;
            offer_terms: z.ZodObject<{
                status: z.ZodLiteral<"checked">;
                binding: z.ZodLiteral<"exact-offer-revision">;
            }, z.core.$strict>;
        }, z.core.$strict>;
        service_level: z.ZodObject<{
            starts_after: z.ZodLiteral<"settled-payment">;
            business_days: z.ZodLiteral<3>;
            time_zone: z.ZodLiteral<"Australia/Sydney">;
        }, z.core.$strict>;
        refunds: z.ZodObject<{
            material_misrepresentation_refundable: z.ZodLiteral<false>;
            service_level_missed_refundable: z.ZodLiteral<true>;
            sourcey_error_refundable: z.ZodLiteral<true>;
        }, z.core.$strict>;
        disclosure: z.ZodLiteral<"Human verification includes publication of a supportable company record with verified status for a legitimate company. Sourcey cannot publish false, unsafe, conflicting, duplicate, or non-existent company or offer claims. Refunds apply when Sourcey cannot deliver the purchased service or misses the review deadline.">;
        policy_bindings: z.ZodObject<{
            assurance_method: z.ZodString;
            purchase_disclosure: z.ZodString;
            service: z.ZodString;
        }, z.core.$strict>;
        preview_digest: z.ZodString;
    }, z.core.$strict>;
    assurance_requirements: z.ZodObject<{
        entity_identity: z.ZodEnum<{
            already_verified: "already_verified";
            required: "required";
        }>;
        offer_terms: z.ZodEnum<{
            already_checked: "already_checked";
            required: "required";
        }>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const startupCreditsExistingRecordReviewPreparationResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        target: z.ZodObject<{
            kind: z.ZodLiteral<"existing_record">;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            entity_revision_digest: z.ZodString;
            offer_id: z.ZodString;
            offer_revision_digest: z.ZodString;
            expected_purchase_preview_digest: z.ZodString;
        }, z.core.$strict>;
        purchase_preview: z.ZodObject<{
            preview_contract: z.ZodLiteral<"sourcey.startup-credits-purchase-preview/v1alpha1">;
            product_code: z.ZodLiteral<"startup-offer-human-verification">;
            purchase_kind: z.ZodLiteral<"one_off">;
            price_lookup_key: z.ZodLiteral<"startup-offer-human-verification-usd-29">;
            price: z.ZodObject<{
                currency: z.ZodLiteral<"usd">;
                minor_units: z.ZodLiteral<2900>;
            }, z.core.$strict>;
            work_scope: z.ZodLiteral<"one-entity-one-offer">;
            passing_results: z.ZodObject<{
                entity_identity: z.ZodObject<{
                    status: z.ZodLiteral<"verified">;
                    binding: z.ZodLiteral<"identity-epoch">;
                }, z.core.$strict>;
                offer_terms: z.ZodObject<{
                    status: z.ZodLiteral<"checked">;
                    binding: z.ZodLiteral<"exact-offer-revision">;
                }, z.core.$strict>;
            }, z.core.$strict>;
            service_level: z.ZodObject<{
                starts_after: z.ZodLiteral<"settled-payment">;
                business_days: z.ZodLiteral<3>;
                time_zone: z.ZodLiteral<"Australia/Sydney">;
            }, z.core.$strict>;
            refunds: z.ZodObject<{
                material_misrepresentation_refundable: z.ZodLiteral<false>;
                service_level_missed_refundable: z.ZodLiteral<true>;
                sourcey_error_refundable: z.ZodLiteral<true>;
            }, z.core.$strict>;
            disclosure: z.ZodLiteral<"Human verification includes publication of a supportable company record with verified status for a legitimate company. Sourcey cannot publish false, unsafe, conflicting, duplicate, or non-existent company or offer claims. Refunds apply when Sourcey cannot deliver the purchased service or misses the review deadline.">;
            policy_bindings: z.ZodObject<{
                assurance_method: z.ZodString;
                purchase_disclosure: z.ZodString;
                service: z.ZodString;
            }, z.core.$strict>;
            preview_digest: z.ZodString;
        }, z.core.$strict>;
        assurance_requirements: z.ZodObject<{
            entity_identity: z.ZodEnum<{
                already_verified: "already_verified";
                required: "required";
            }>;
            offer_terms: z.ZodEnum<{
                already_checked: "already_checked";
                required: "required";
            }>;
        }, z.core.$strict>;
    }, z.core.$strict>;
}, z.core.$strict>;
/** One exact pull request head of a Sourcey data repository, as its buyer names it. */
export declare const startupCreditsGitPullRequestReferenceSchema: z.ZodObject<{
    kind: z.ZodLiteral<"git_pull_request">;
    repository: z.ZodString;
    pull_request_number: z.ZodNumber;
    head_sha: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsGitPullRequestReviewPreparationRequestSchema: z.ZodObject<{
    target: z.ZodObject<{
        kind: z.ZodLiteral<"git_pull_request">;
        repository: z.ZodString;
        pull_request_number: z.ZodNumber;
        head_sha: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
/** What one held pull request head's verification buys, before checkout. */
export declare const startupCreditsGitPullRequestReviewPreparationResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        target: z.ZodObject<{
            kind: z.ZodLiteral<"git_pull_request">;
            repository: z.ZodString;
            pull_request_number: z.ZodNumber;
            head_sha: z.ZodString;
            expected_purchase_preview_digest: z.ZodString;
        }, z.core.$strict>;
        purchase_preview: z.ZodObject<{
            preview_contract: z.ZodLiteral<"sourcey.startup-credits-purchase-preview/v1alpha1">;
            product_code: z.ZodLiteral<"startup-offer-human-verification">;
            purchase_kind: z.ZodLiteral<"one_off">;
            price_lookup_key: z.ZodLiteral<"startup-offer-human-verification-usd-29">;
            price: z.ZodObject<{
                currency: z.ZodLiteral<"usd">;
                minor_units: z.ZodLiteral<2900>;
            }, z.core.$strict>;
            work_scope: z.ZodLiteral<"one-entity-one-offer">;
            passing_results: z.ZodObject<{
                entity_identity: z.ZodObject<{
                    status: z.ZodLiteral<"verified">;
                    binding: z.ZodLiteral<"identity-epoch">;
                }, z.core.$strict>;
                offer_terms: z.ZodObject<{
                    status: z.ZodLiteral<"checked">;
                    binding: z.ZodLiteral<"exact-offer-revision">;
                }, z.core.$strict>;
            }, z.core.$strict>;
            service_level: z.ZodObject<{
                starts_after: z.ZodLiteral<"settled-payment">;
                business_days: z.ZodLiteral<3>;
                time_zone: z.ZodLiteral<"Australia/Sydney">;
            }, z.core.$strict>;
            refunds: z.ZodObject<{
                material_misrepresentation_refundable: z.ZodLiteral<false>;
                service_level_missed_refundable: z.ZodLiteral<true>;
                sourcey_error_refundable: z.ZodLiteral<true>;
            }, z.core.$strict>;
            disclosure: z.ZodLiteral<"Human verification includes publication of a supportable company record with verified status for a legitimate company. Sourcey cannot publish false, unsafe, conflicting, duplicate, or non-existent company or offer claims. Refunds apply when Sourcey cannot deliver the purchased service or misses the review deadline.">;
            policy_bindings: z.ZodObject<{
                assurance_method: z.ZodString;
                purchase_disclosure: z.ZodString;
                service: z.ZodString;
            }, z.core.$strict>;
            preview_digest: z.ZodString;
        }, z.core.$strict>;
        offer: z.ZodObject<{
            kind: z.ZodLiteral<"git_pull_request">;
            base_release_id: z.ZodString;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            pull_request: z.ZodObject<{
                repository_id: z.ZodString;
                repository: z.ZodString;
                pull_request_number: z.ZodNumber;
                submission_id: z.ZodString;
                head_sha: z.ZodString;
            }, z.core.$strict>;
            standing_result: z.ZodObject<{
                result_contract: z.ZodLiteral<"sourcey.standing-result/v1alpha1">;
                policy_digest: z.ZodString;
                evidence_digest: z.ZodString;
                registrable_domain: z.ZodString;
                official_source_url: z.ZodURL;
                route: z.ZodEnum<{
                    correction_required: "correction_required";
                    free_machine_review: "free_machine_review";
                    human_verification_required: "human_verification_required";
                    repair_required: "repair_required";
                    temporarily_unavailable: "temporarily_unavailable";
                }>;
                reasons: z.ZodArray<z.ZodString>;
                evaluated_at: z.ZodISODateTime;
                expires_at: z.ZodISODateTime;
                result_digest: z.ZodString;
            }, z.core.$strict>;
            authoring_digest: z.ZodString;
            revisions: z.ZodObject<{
                entity_revision_digest: z.ZodString;
                offer_revision_digest: z.ZodString;
            }, z.core.$strict>;
            labels: z.ZodObject<{
                company_name: z.ZodString;
                company_site_url: z.ZodURL;
                offer_title: z.ZodString;
                offer_url: z.ZodURL;
            }, z.core.$strict>;
        }, z.core.$strict>;
    }, z.core.$strict>;
}, z.core.$strict>;
/** Which pull request of a Sourcey data repository a reader asks about. */
export declare const startupCreditsPullRequestQuerySchema: z.ZodObject<{
    repository: z.ZodString;
    pull: z.ZodCoercedNumber<unknown>;
}, z.core.$strict>;
/**
 * Where one pull request stands with Sourcey, for its contributor's page: its current head, what
 * Sourcey's admission concluded for it, and its company verification. The buyer's own order is
 * shown only to the account that bought it.
 */
export declare const startupCreditsPullRequestStatusSchema: z.ZodObject<{
    pull_request: z.ZodObject<{
        repository: z.ZodString;
        pull_request_number: z.ZodNumber;
        url: z.ZodURL;
        state: z.ZodEnum<{
            closed: "closed";
            merged: "merged";
            open: "open";
        }>;
        head_sha: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>;
    result: z.ZodNullable<z.ZodObject<{
        summary_contract: z.ZodLiteral<"sourcey.pull-request-admission-summary/v1alpha1">;
        repository: z.ZodString;
        pull_request_number: z.ZodNumber;
        head_sha: z.ZodString;
        state: z.ZodEnum<{
            needs_change: "needs_change";
            needs_person: "needs_person";
            passed: "passed";
            refused: "refused";
            verification_offered: "verification_offered";
            verification_refused: "verification_refused";
            verifying: "verifying";
        }>;
        title: z.ZodString;
        lead: z.ZodString;
        company: z.ZodNullable<z.ZodString>;
        checks: z.ZodArray<z.ZodObject<{
            key: z.ZodEnum<{
                admission: "admission";
                company: "company";
                conflicts: "conflicts";
                facts: "facts";
                files: "files";
                logo: "logo";
                review: "review";
                sources: "sources";
                standing: "standing";
                verification: "verification";
            }>;
            status: z.ZodEnum<{
                attention: "attention";
                failed: "failed";
                passed: "passed";
                pending: "pending";
            }>;
            title: z.ZodString;
            details: z.ZodArray<z.ZodObject<{
                text: z.ZodString;
                path: z.ZodNullable<z.ZodString>;
                url: z.ZodNullable<z.ZodURL>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        standing: z.ZodNullable<z.ZodObject<{
            evaluated_at: z.ZodISODateTime;
            rule: z.ZodString;
            criteria: z.ZodArray<z.ZodObject<{
                key: z.ZodEnum<{
                    certificate_age: "certificate_age";
                    domain_age: "domain_age";
                    mx: "mx";
                    reach: "reach";
                    source: "source";
                }>;
                label: z.ZodString;
                value: z.ZodString;
                requirement: z.ZodString;
                met: z.ZodNullable<z.ZodBoolean>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        report_url: z.ZodNullable<z.ZodURL>;
    }, z.core.$strict>>;
    checking: z.ZodBoolean;
    verification: z.ZodNullable<z.ZodObject<{
        phase: z.ZodEnum<{
            approved: "approved";
            checkout_open: "checkout_open";
            paid: "paid";
            refunded: "refunded";
            refunding: "refunding";
            refused: "refused";
        }>;
        company: z.ZodString;
        reviewed_head_sha: z.ZodNullable<z.ZodString>;
        checkout_expires_at: z.ZodNullable<z.ZodISODateTime>;
        due_at: z.ZodNullable<z.ZodISODateTime>;
        finding: z.ZodNullable<z.ZodString>;
        refund_reason: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>>;
    purchase: z.ZodNullable<z.ZodObject<{
        order_id: z.ZodString;
        checkout_url: z.ZodNullable<z.ZodURL>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const startupCreditsPullRequestStatusResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        pull_request: z.ZodObject<{
            repository: z.ZodString;
            pull_request_number: z.ZodNumber;
            url: z.ZodURL;
            state: z.ZodEnum<{
                closed: "closed";
                merged: "merged";
                open: "open";
            }>;
            head_sha: z.ZodNullable<z.ZodString>;
        }, z.core.$strict>;
        result: z.ZodNullable<z.ZodObject<{
            summary_contract: z.ZodLiteral<"sourcey.pull-request-admission-summary/v1alpha1">;
            repository: z.ZodString;
            pull_request_number: z.ZodNumber;
            head_sha: z.ZodString;
            state: z.ZodEnum<{
                needs_change: "needs_change";
                needs_person: "needs_person";
                passed: "passed";
                refused: "refused";
                verification_offered: "verification_offered";
                verification_refused: "verification_refused";
                verifying: "verifying";
            }>;
            title: z.ZodString;
            lead: z.ZodString;
            company: z.ZodNullable<z.ZodString>;
            checks: z.ZodArray<z.ZodObject<{
                key: z.ZodEnum<{
                    admission: "admission";
                    company: "company";
                    conflicts: "conflicts";
                    facts: "facts";
                    files: "files";
                    logo: "logo";
                    review: "review";
                    sources: "sources";
                    standing: "standing";
                    verification: "verification";
                }>;
                status: z.ZodEnum<{
                    attention: "attention";
                    failed: "failed";
                    passed: "passed";
                    pending: "pending";
                }>;
                title: z.ZodString;
                details: z.ZodArray<z.ZodObject<{
                    text: z.ZodString;
                    path: z.ZodNullable<z.ZodString>;
                    url: z.ZodNullable<z.ZodURL>;
                }, z.core.$strict>>;
            }, z.core.$strict>>;
            standing: z.ZodNullable<z.ZodObject<{
                evaluated_at: z.ZodISODateTime;
                rule: z.ZodString;
                criteria: z.ZodArray<z.ZodObject<{
                    key: z.ZodEnum<{
                        certificate_age: "certificate_age";
                        domain_age: "domain_age";
                        mx: "mx";
                        reach: "reach";
                        source: "source";
                    }>;
                    label: z.ZodString;
                    value: z.ZodString;
                    requirement: z.ZodString;
                    met: z.ZodNullable<z.ZodBoolean>;
                }, z.core.$strict>>;
            }, z.core.$strict>>;
            report_url: z.ZodNullable<z.ZodURL>;
        }, z.core.$strict>>;
        checking: z.ZodBoolean;
        verification: z.ZodNullable<z.ZodObject<{
            phase: z.ZodEnum<{
                approved: "approved";
                checkout_open: "checkout_open";
                paid: "paid";
                refunded: "refunded";
                refunding: "refunding";
                refused: "refused";
            }>;
            company: z.ZodString;
            reviewed_head_sha: z.ZodNullable<z.ZodString>;
            checkout_expires_at: z.ZodNullable<z.ZodISODateTime>;
            due_at: z.ZodNullable<z.ZodISODateTime>;
            finding: z.ZodNullable<z.ZodString>;
            refund_reason: z.ZodNullable<z.ZodString>;
        }, z.core.$strict>>;
        purchase: z.ZodNullable<z.ZodObject<{
            order_id: z.ZodString;
            checkout_url: z.ZodNullable<z.ZodURL>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const startupCreditsReviewRequestSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    request_id: z.ZodString;
    payment_rail: z.ZodLiteral<"x402">;
    target: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"new_listing">;
        draft: z.ZodObject<{
            standing_result: z.ZodObject<{
                result_contract: z.ZodLiteral<"sourcey.standing-result/v1alpha1">;
                policy_digest: z.ZodString;
                evidence_digest: z.ZodString;
                registrable_domain: z.ZodString;
                official_source_url: z.ZodURL;
                route: z.ZodEnum<{
                    correction_required: "correction_required";
                    free_machine_review: "free_machine_review";
                    human_verification_required: "human_verification_required";
                    repair_required: "repair_required";
                    temporarily_unavailable: "temporarily_unavailable";
                }>;
                reasons: z.ZodArray<z.ZodString>;
                evaluated_at: z.ZodISODateTime;
                expires_at: z.ZodISODateTime;
                result_digest: z.ZodString;
            }, z.core.$strict>;
            existing_entity: z.ZodOptional<z.ZodObject<{
                entity_id: z.ZodString;
                entity_revision_digest: z.ZodString;
            }, z.core.$strict>>;
            company: z.ZodObject<{
                name: z.ZodString;
                domain: z.ZodString;
                category: z.ZodString;
                summary: z.ZodString;
                site_url: z.ZodURL;
            }, z.core.$strict>;
            program: z.ZodOptional<z.ZodObject<{
                title: z.ZodString;
                summary: z.ZodString;
            }, z.core.$strict>>;
            offer: z.ZodObject<{
                title: z.ZodString;
                summary: z.ZodString;
                benefit: z.ZodString;
                eligibility: z.ZodString;
                access_method: z.ZodEnum<{
                    automatic: "automatic";
                    contact: "contact";
                    form: "form";
                    other: "other";
                }>;
                access_url: z.ZodOptional<z.ZodURL>;
            }, z.core.$strict>;
        }, z.core.$strict>;
        entity_icon: z.ZodOptional<z.ZodObject<{
            source: z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"upload">;
                upload_receipt_digest: z.ZodString;
                original_digest: z.ZodString;
                bytes: z.ZodNumber;
                media_type: z.ZodEnum<{
                    "image/jpeg": "image/jpeg";
                    "image/png": "image/png";
                    "image/svg+xml": "image/svg+xml";
                    "image/webp": "image/webp";
                }>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"official_url">;
                url: z.ZodURL;
            }, z.core.$strict>], "kind">;
            trademark_owner: z.ZodString;
            relationship: z.ZodEnum<{
                "community-contributor": "community-contributor";
                "vendor-representative": "vendor-representative";
            }>;
        }, z.core.$strict>>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"existing_record">;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        entity_revision_digest: z.ZodString;
        offer_id: z.ZodString;
        offer_revision_digest: z.ZodString;
        expected_purchase_preview_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"git_pull_request">;
        repository: z.ZodString;
        pull_request_number: z.ZodNumber;
        head_sha: z.ZodString;
        expected_purchase_preview_digest: z.ZodString;
    }, z.core.$strict>], "kind">;
}, z.core.$strict>, z.ZodObject<{
    request_id: z.ZodString;
    payment_rail: z.ZodLiteral<"stripe">;
    target: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"new_listing">;
        draft: z.ZodObject<{
            standing_result: z.ZodObject<{
                result_contract: z.ZodLiteral<"sourcey.standing-result/v1alpha1">;
                policy_digest: z.ZodString;
                evidence_digest: z.ZodString;
                registrable_domain: z.ZodString;
                official_source_url: z.ZodURL;
                route: z.ZodEnum<{
                    correction_required: "correction_required";
                    free_machine_review: "free_machine_review";
                    human_verification_required: "human_verification_required";
                    repair_required: "repair_required";
                    temporarily_unavailable: "temporarily_unavailable";
                }>;
                reasons: z.ZodArray<z.ZodString>;
                evaluated_at: z.ZodISODateTime;
                expires_at: z.ZodISODateTime;
                result_digest: z.ZodString;
            }, z.core.$strict>;
            existing_entity: z.ZodOptional<z.ZodObject<{
                entity_id: z.ZodString;
                entity_revision_digest: z.ZodString;
            }, z.core.$strict>>;
            company: z.ZodObject<{
                name: z.ZodString;
                domain: z.ZodString;
                category: z.ZodString;
                summary: z.ZodString;
                site_url: z.ZodURL;
            }, z.core.$strict>;
            program: z.ZodOptional<z.ZodObject<{
                title: z.ZodString;
                summary: z.ZodString;
            }, z.core.$strict>>;
            offer: z.ZodObject<{
                title: z.ZodString;
                summary: z.ZodString;
                benefit: z.ZodString;
                eligibility: z.ZodString;
                access_method: z.ZodEnum<{
                    automatic: "automatic";
                    contact: "contact";
                    form: "form";
                    other: "other";
                }>;
                access_url: z.ZodOptional<z.ZodURL>;
            }, z.core.$strict>;
        }, z.core.$strict>;
        entity_icon: z.ZodOptional<z.ZodObject<{
            source: z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"upload">;
                upload_receipt_digest: z.ZodString;
                original_digest: z.ZodString;
                bytes: z.ZodNumber;
                media_type: z.ZodEnum<{
                    "image/jpeg": "image/jpeg";
                    "image/png": "image/png";
                    "image/svg+xml": "image/svg+xml";
                    "image/webp": "image/webp";
                }>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"official_url">;
                url: z.ZodURL;
            }, z.core.$strict>], "kind">;
            trademark_owner: z.ZodString;
            relationship: z.ZodEnum<{
                "community-contributor": "community-contributor";
                "vendor-representative": "vendor-representative";
            }>;
        }, z.core.$strict>>;
        expected_draft: z.ZodObject<{
            base_release_id: z.ZodString;
            content_digest: z.ZodString;
            purchase_preview_digest: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"existing_record">;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        entity_revision_digest: z.ZodString;
        offer_id: z.ZodString;
        offer_revision_digest: z.ZodString;
        expected_purchase_preview_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"git_pull_request">;
        repository: z.ZodString;
        pull_request_number: z.ZodNumber;
        head_sha: z.ZodString;
        expected_purchase_preview_digest: z.ZodString;
    }, z.core.$strict>], "kind">;
    replaces_intent: z.ZodOptional<z.ZodObject<{
        intent_id: z.ZodString;
        intent_digest: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>], "payment_rail">;
export declare const startupCreditsVerificationRequiredInputSchema: z.ZodObject<{
    code: z.ZodEnum<{
        access_instructions: "access_instructions";
        company_identity: "company_identity";
        conflicting_identity: "conflicting_identity";
        current_terms: "current_terms";
        domain_control: "domain_control";
        offer_existence: "offer_existence";
        official_offer_page: "official_offer_page";
        pricing_or_consideration: "pricing_or_consideration";
        unsupported_material_claim: "unsupported_material_claim";
    }>;
    path: z.ZodString;
    message: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsVerificationStatusSchema: z.ZodObject<{
    verification_case_id: z.ZodString;
    state: z.ZodEnum<{
        awaiting_payment: "awaiting_payment";
        input_needed: "input_needed";
        live: "live";
        publishing: "publishing";
        refused: "refused";
        verifying: "verifying";
    }>;
    required_input: z.ZodArray<z.ZodObject<{
        code: z.ZodEnum<{
            access_instructions: "access_instructions";
            company_identity: "company_identity";
            conflicting_identity: "conflicting_identity";
            current_terms: "current_terms";
            domain_control: "domain_control";
            offer_existence: "offer_existence";
            official_offer_page: "official_offer_page";
            pricing_or_consideration: "pricing_or_consideration";
            unsupported_material_claim: "unsupported_material_claim";
        }>;
        path: z.ZodString;
        message: z.ZodString;
    }, z.core.$strict>>;
    decision_ref: z.ZodNullable<z.ZodString>;
    publication_release_id: z.ZodNullable<z.ZodString>;
    public_record_url: z.ZodNullable<z.ZodURL>;
    updated_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const startupCreditsReviewResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        request_id: z.ZodString;
        verification: z.ZodObject<{
            verification_case_id: z.ZodString;
            state: z.ZodEnum<{
                awaiting_payment: "awaiting_payment";
                input_needed: "input_needed";
                live: "live";
                publishing: "publishing";
                refused: "refused";
                verifying: "verifying";
            }>;
            required_input: z.ZodArray<z.ZodObject<{
                code: z.ZodEnum<{
                    access_instructions: "access_instructions";
                    company_identity: "company_identity";
                    conflicting_identity: "conflicting_identity";
                    current_terms: "current_terms";
                    domain_control: "domain_control";
                    offer_existence: "offer_existence";
                    official_offer_page: "official_offer_page";
                    pricing_or_consideration: "pricing_or_consideration";
                    unsupported_material_claim: "unsupported_material_claim";
                }>;
                path: z.ZodString;
                message: z.ZodString;
            }, z.core.$strict>>;
            decision_ref: z.ZodNullable<z.ZodString>;
            publication_release_id: z.ZodNullable<z.ZodString>;
            public_record_url: z.ZodNullable<z.ZodURL>;
            updated_at: z.ZodISODateTime;
        }, z.core.$strict>;
        order_id: z.ZodString;
        status_url: z.ZodURL;
        checkout_url: z.ZodNullable<z.ZodURL>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const payableProductDescriptorSchema: z.ZodObject<{
    descriptor_contract: z.ZodLiteral<"sourcey.payable-product-descriptor/v1alpha1">;
    product_code: z.ZodString;
    price_lookup_key: z.ZodString;
    operation_id: z.ZodString;
    method: z.ZodLiteral<"POST">;
    path: z.ZodString;
    success_status: z.ZodLiteral<202>;
    service_name: z.ZodString;
    description: z.ZodString;
    tags: z.ZodTuple<[z.ZodString, z.ZodString, z.ZodString, z.ZodString, z.ZodString], null>;
    floor_price: z.ZodObject<{
        currency: z.ZodLiteral<"usd">;
        minor_units: z.ZodLiteral<2900>;
    }, z.core.$strict>;
    service_policy_url: z.ZodURL;
    refund_policy_url: z.ZodURL;
    input_example: z.ZodDiscriminatedUnion<[z.ZodObject<{
        request_id: z.ZodString;
        payment_rail: z.ZodLiteral<"x402">;
        target: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"new_listing">;
            draft: z.ZodObject<{
                standing_result: z.ZodObject<{
                    result_contract: z.ZodLiteral<"sourcey.standing-result/v1alpha1">;
                    policy_digest: z.ZodString;
                    evidence_digest: z.ZodString;
                    registrable_domain: z.ZodString;
                    official_source_url: z.ZodURL;
                    route: z.ZodEnum<{
                        correction_required: "correction_required";
                        free_machine_review: "free_machine_review";
                        human_verification_required: "human_verification_required";
                        repair_required: "repair_required";
                        temporarily_unavailable: "temporarily_unavailable";
                    }>;
                    reasons: z.ZodArray<z.ZodString>;
                    evaluated_at: z.ZodISODateTime;
                    expires_at: z.ZodISODateTime;
                    result_digest: z.ZodString;
                }, z.core.$strict>;
                existing_entity: z.ZodOptional<z.ZodObject<{
                    entity_id: z.ZodString;
                    entity_revision_digest: z.ZodString;
                }, z.core.$strict>>;
                company: z.ZodObject<{
                    name: z.ZodString;
                    domain: z.ZodString;
                    category: z.ZodString;
                    summary: z.ZodString;
                    site_url: z.ZodURL;
                }, z.core.$strict>;
                program: z.ZodOptional<z.ZodObject<{
                    title: z.ZodString;
                    summary: z.ZodString;
                }, z.core.$strict>>;
                offer: z.ZodObject<{
                    title: z.ZodString;
                    summary: z.ZodString;
                    benefit: z.ZodString;
                    eligibility: z.ZodString;
                    access_method: z.ZodEnum<{
                        automatic: "automatic";
                        contact: "contact";
                        form: "form";
                        other: "other";
                    }>;
                    access_url: z.ZodOptional<z.ZodURL>;
                }, z.core.$strict>;
            }, z.core.$strict>;
            entity_icon: z.ZodOptional<z.ZodObject<{
                source: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"upload">;
                    upload_receipt_digest: z.ZodString;
                    original_digest: z.ZodString;
                    bytes: z.ZodNumber;
                    media_type: z.ZodEnum<{
                        "image/jpeg": "image/jpeg";
                        "image/png": "image/png";
                        "image/svg+xml": "image/svg+xml";
                        "image/webp": "image/webp";
                    }>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"official_url">;
                    url: z.ZodURL;
                }, z.core.$strict>], "kind">;
                trademark_owner: z.ZodString;
                relationship: z.ZodEnum<{
                    "community-contributor": "community-contributor";
                    "vendor-representative": "vendor-representative";
                }>;
            }, z.core.$strict>>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"existing_record">;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            entity_revision_digest: z.ZodString;
            offer_id: z.ZodString;
            offer_revision_digest: z.ZodString;
            expected_purchase_preview_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"git_pull_request">;
            repository: z.ZodString;
            pull_request_number: z.ZodNumber;
            head_sha: z.ZodString;
            expected_purchase_preview_digest: z.ZodString;
        }, z.core.$strict>], "kind">;
    }, z.core.$strict>, z.ZodObject<{
        request_id: z.ZodString;
        payment_rail: z.ZodLiteral<"stripe">;
        target: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"new_listing">;
            draft: z.ZodObject<{
                standing_result: z.ZodObject<{
                    result_contract: z.ZodLiteral<"sourcey.standing-result/v1alpha1">;
                    policy_digest: z.ZodString;
                    evidence_digest: z.ZodString;
                    registrable_domain: z.ZodString;
                    official_source_url: z.ZodURL;
                    route: z.ZodEnum<{
                        correction_required: "correction_required";
                        free_machine_review: "free_machine_review";
                        human_verification_required: "human_verification_required";
                        repair_required: "repair_required";
                        temporarily_unavailable: "temporarily_unavailable";
                    }>;
                    reasons: z.ZodArray<z.ZodString>;
                    evaluated_at: z.ZodISODateTime;
                    expires_at: z.ZodISODateTime;
                    result_digest: z.ZodString;
                }, z.core.$strict>;
                existing_entity: z.ZodOptional<z.ZodObject<{
                    entity_id: z.ZodString;
                    entity_revision_digest: z.ZodString;
                }, z.core.$strict>>;
                company: z.ZodObject<{
                    name: z.ZodString;
                    domain: z.ZodString;
                    category: z.ZodString;
                    summary: z.ZodString;
                    site_url: z.ZodURL;
                }, z.core.$strict>;
                program: z.ZodOptional<z.ZodObject<{
                    title: z.ZodString;
                    summary: z.ZodString;
                }, z.core.$strict>>;
                offer: z.ZodObject<{
                    title: z.ZodString;
                    summary: z.ZodString;
                    benefit: z.ZodString;
                    eligibility: z.ZodString;
                    access_method: z.ZodEnum<{
                        automatic: "automatic";
                        contact: "contact";
                        form: "form";
                        other: "other";
                    }>;
                    access_url: z.ZodOptional<z.ZodURL>;
                }, z.core.$strict>;
            }, z.core.$strict>;
            entity_icon: z.ZodOptional<z.ZodObject<{
                source: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"upload">;
                    upload_receipt_digest: z.ZodString;
                    original_digest: z.ZodString;
                    bytes: z.ZodNumber;
                    media_type: z.ZodEnum<{
                        "image/jpeg": "image/jpeg";
                        "image/png": "image/png";
                        "image/svg+xml": "image/svg+xml";
                        "image/webp": "image/webp";
                    }>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"official_url">;
                    url: z.ZodURL;
                }, z.core.$strict>], "kind">;
                trademark_owner: z.ZodString;
                relationship: z.ZodEnum<{
                    "community-contributor": "community-contributor";
                    "vendor-representative": "vendor-representative";
                }>;
            }, z.core.$strict>>;
            expected_draft: z.ZodObject<{
                base_release_id: z.ZodString;
                content_digest: z.ZodString;
                purchase_preview_digest: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"existing_record">;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            entity_revision_digest: z.ZodString;
            offer_id: z.ZodString;
            offer_revision_digest: z.ZodString;
            expected_purchase_preview_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"git_pull_request">;
            repository: z.ZodString;
            pull_request_number: z.ZodNumber;
            head_sha: z.ZodString;
            expected_purchase_preview_digest: z.ZodString;
        }, z.core.$strict>], "kind">;
        replaces_intent: z.ZodOptional<z.ZodObject<{
            intent_id: z.ZodString;
            intent_digest: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>], "payment_rail">;
    output_example: z.ZodObject<{
        data: z.ZodObject<{
            request_id: z.ZodString;
            verification: z.ZodObject<{
                verification_case_id: z.ZodString;
                state: z.ZodEnum<{
                    awaiting_payment: "awaiting_payment";
                    input_needed: "input_needed";
                    live: "live";
                    publishing: "publishing";
                    refused: "refused";
                    verifying: "verifying";
                }>;
                required_input: z.ZodArray<z.ZodObject<{
                    code: z.ZodEnum<{
                        access_instructions: "access_instructions";
                        company_identity: "company_identity";
                        conflicting_identity: "conflicting_identity";
                        current_terms: "current_terms";
                        domain_control: "domain_control";
                        offer_existence: "offer_existence";
                        official_offer_page: "official_offer_page";
                        pricing_or_consideration: "pricing_or_consideration";
                        unsupported_material_claim: "unsupported_material_claim";
                    }>;
                    path: z.ZodString;
                    message: z.ZodString;
                }, z.core.$strict>>;
                decision_ref: z.ZodNullable<z.ZodString>;
                publication_release_id: z.ZodNullable<z.ZodString>;
                public_record_url: z.ZodNullable<z.ZodURL>;
                updated_at: z.ZodISODateTime;
            }, z.core.$strict>;
            order_id: z.ZodString;
            status_url: z.ZodURL;
            checkout_url: z.ZodNullable<z.ZodURL>;
        }, z.core.$strict>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const startupCreditsReviewProductDescriptor: {
    descriptor_contract: "sourcey.payable-product-descriptor/v1alpha1";
    product_code: string;
    price_lookup_key: string;
    operation_id: string;
    method: "POST";
    path: string;
    success_status: 202;
    service_name: string;
    description: string;
    tags: [string, string, string, string, string];
    floor_price: {
        currency: "usd";
        minor_units: 2900;
    };
    service_policy_url: string;
    refund_policy_url: string;
    input_example: {
        request_id: string;
        payment_rail: "x402";
        target: {
            kind: "new_listing";
            draft: {
                standing_result: {
                    result_contract: "sourcey.standing-result/v1alpha1";
                    policy_digest: string;
                    evidence_digest: string;
                    registrable_domain: string;
                    official_source_url: string;
                    route: "correction_required" | "free_machine_review" | "human_verification_required" | "repair_required" | "temporarily_unavailable";
                    reasons: string[];
                    evaluated_at: string;
                    expires_at: string;
                    result_digest: string;
                };
                existing_entity?: {
                    entity_id: string;
                    entity_revision_digest: string;
                } | undefined;
                company: {
                    name: string;
                    domain: string;
                    category: string;
                    summary: string;
                    site_url: string;
                };
                program?: {
                    title: string;
                    summary: string;
                } | undefined;
                offer: {
                    title: string;
                    summary: string;
                    benefit: string;
                    eligibility: string;
                    access_method: "automatic" | "contact" | "form" | "other";
                    access_url?: string | undefined;
                };
            };
            entity_icon?: {
                source: {
                    kind: "upload";
                    upload_receipt_digest: string;
                    original_digest: string;
                    bytes: number;
                    media_type: "image/jpeg" | "image/png" | "image/svg+xml" | "image/webp";
                } | {
                    kind: "official_url";
                    url: string;
                };
                trademark_owner: string;
                relationship: "community-contributor" | "vendor-representative";
            } | undefined;
        } | {
            kind: "existing_record";
            entity_id: string;
            program_id?: string | undefined;
            entity_revision_digest: string;
            offer_id: string;
            offer_revision_digest: string;
            expected_purchase_preview_digest: string;
        } | {
            kind: "git_pull_request";
            repository: string;
            pull_request_number: number;
            head_sha: string;
            expected_purchase_preview_digest: string;
        };
    } | {
        request_id: string;
        payment_rail: "stripe";
        target: {
            kind: "existing_record";
            entity_id: string;
            program_id?: string | undefined;
            entity_revision_digest: string;
            offer_id: string;
            offer_revision_digest: string;
            expected_purchase_preview_digest: string;
        } | {
            kind: "git_pull_request";
            repository: string;
            pull_request_number: number;
            head_sha: string;
            expected_purchase_preview_digest: string;
        } | {
            kind: "new_listing";
            draft: {
                standing_result: {
                    result_contract: "sourcey.standing-result/v1alpha1";
                    policy_digest: string;
                    evidence_digest: string;
                    registrable_domain: string;
                    official_source_url: string;
                    route: "correction_required" | "free_machine_review" | "human_verification_required" | "repair_required" | "temporarily_unavailable";
                    reasons: string[];
                    evaluated_at: string;
                    expires_at: string;
                    result_digest: string;
                };
                existing_entity?: {
                    entity_id: string;
                    entity_revision_digest: string;
                } | undefined;
                company: {
                    name: string;
                    domain: string;
                    category: string;
                    summary: string;
                    site_url: string;
                };
                program?: {
                    title: string;
                    summary: string;
                } | undefined;
                offer: {
                    title: string;
                    summary: string;
                    benefit: string;
                    eligibility: string;
                    access_method: "automatic" | "contact" | "form" | "other";
                    access_url?: string | undefined;
                };
            };
            entity_icon?: {
                source: {
                    kind: "upload";
                    upload_receipt_digest: string;
                    original_digest: string;
                    bytes: number;
                    media_type: "image/jpeg" | "image/png" | "image/svg+xml" | "image/webp";
                } | {
                    kind: "official_url";
                    url: string;
                };
                trademark_owner: string;
                relationship: "community-contributor" | "vendor-representative";
            } | undefined;
            expected_draft: {
                base_release_id: string;
                content_digest: string;
                purchase_preview_digest: string;
            };
        };
        replaces_intent?: {
            intent_id: string;
            intent_digest: string;
        } | undefined;
    };
    output_example: {
        data: {
            request_id: string;
            verification: {
                verification_case_id: string;
                state: "awaiting_payment" | "input_needed" | "live" | "publishing" | "refused" | "verifying";
                required_input: {
                    code: "access_instructions" | "company_identity" | "conflicting_identity" | "current_terms" | "domain_control" | "offer_existence" | "official_offer_page" | "pricing_or_consideration" | "unsupported_material_claim";
                    path: string;
                    message: string;
                }[];
                decision_ref: string | null;
                publication_release_id: string | null;
                public_record_url: string | null;
                updated_at: string;
            };
            order_id: string;
            status_url: string;
            checkout_url: string | null;
        };
    };
};
export type StartupCreditsEntityIconInput = z.infer<typeof startupCreditsEntityIconInputSchema>;
export type StartupCreditsReviewRequest = z.infer<typeof startupCreditsReviewRequestSchema>;
export type StartupCreditsExistingRecordReviewPreparationRequest = z.infer<typeof startupCreditsExistingRecordReviewPreparationRequestSchema>;
export type StartupCreditsExistingRecordReviewPreparation = z.infer<typeof startupCreditsExistingRecordReviewPreparationSchema>;
export type StartupCreditsGitPullRequestReference = z.infer<typeof startupCreditsGitPullRequestReferenceSchema>;
export type StartupCreditsGitPullRequestReviewPreparation = z.infer<typeof startupCreditsGitPullRequestReviewPreparationResponseSchema>["data"];
export type StartupCreditsReviewResponse = z.infer<typeof startupCreditsReviewResponseSchema>;
export type StartupCreditsPullRequestQuery = z.infer<typeof startupCreditsPullRequestQuerySchema>;
export type StartupCreditsPullRequestStatus = z.infer<typeof startupCreditsPullRequestStatusSchema>;
export type StartupCreditsVerificationStatus = z.infer<typeof startupCreditsVerificationStatusSchema>;
export type PayableProductDescriptor = z.infer<typeof payableProductDescriptorSchema>;
export {};
//# sourceMappingURL=requests.d.ts.map