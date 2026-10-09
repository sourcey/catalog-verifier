import { z } from "zod";
export * from "../../funded-work/src/index.js";
export declare const startupCreditsProductCode: "startup-offer-human-verification";
export declare const startupCreditsPrice: {
    readonly currency: "usd";
    readonly minor_units: 2900;
};
export declare const startupCreditsPriceLookupKey: "startup-offer-human-verification-usd-29";
export declare const startupCreditsPurchaseDisclosureStatement: "Human verification includes publication of a supportable company record with verified status for a legitimate company. Sourcey cannot publish false, unsafe, conflicting, duplicate, or non-existent company or offer claims. Refunds apply when Sourcey cannot deliver the purchased service or misses the review deadline.";
export declare const startupCreditsServicePolicySchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.startup-credits-verification-service-policy/v1alpha1">;
    product_code: z.ZodLiteral<"startup-offer-human-verification">;
    price_lookup_key: z.ZodLiteral<"startup-offer-human-verification-usd-29">;
    price: z.ZodObject<{
        currency: z.ZodLiteral<"usd">;
        minor_units: z.ZodLiteral<2900>;
    }, z.core.$strict>;
    service_calendar: z.ZodObject<{
        time_zone: z.ZodLiteral<"Australia/Sydney">;
        business_days: z.ZodLiteral<3>;
        counting: z.ZodLiteral<"next-business-day">;
        deadline: z.ZodLiteral<"end-of-local-day">;
        holiday_dates: z.ZodArray<z.ZodISODate>;
        valid_through: z.ZodISODate;
        source_url: z.ZodLiteral<"https://www.nsw.gov.au/about-nsw/public-holidays">;
        source_observed_at: z.ZodISODateTime;
    }, z.core.$strict>;
    material_misrepresentation_refundable: z.ZodLiteral<false>;
    sla_miss_refundable: z.ZodLiteral<true>;
    sourcey_error_refundable: z.ZodLiteral<true>;
    payment_authorizes_human_verification: z.ZodLiteral<true>;
    payment_changes_truth: z.ZodLiteral<false>;
}, z.core.$strict>;
export declare const startupCreditsReviewWorkDefinitionSchema: z.ZodObject<{
    work_contract: z.ZodLiteral<"sourcey.startup-credits-review-work-definition/v1alpha1">;
    scope: z.ZodLiteral<"one-entity-one-offer">;
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
}, z.core.$strict>;
export declare const startupCreditsPurchaseDisclosureSchema: z.ZodObject<{
    disclosure_contract: z.ZodLiteral<"sourcey.startup-credits-purchase-disclosure/v1alpha1">;
    statement: z.ZodLiteral<"Human verification includes publication of a supportable company record with verified status for a legitimate company. Sourcey cannot publish false, unsafe, conflicting, duplicate, or non-existent company or offer claims. Refunds apply when Sourcey cannot deliver the purchased service or misses the review deadline.">;
}, z.core.$strict>;
export declare const startupCreditsPurchasePreviewSchema: z.ZodObject<{
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
export declare const startupCreditsDraftRequestSchema: z.ZodObject<{
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
export declare const startupCreditsDraftResultSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    status: z.ZodEnum<{
        conflict: "conflict";
        incomplete: "incomplete";
        ineligible: "ineligible";
        invalid: "invalid";
    }>;
    diagnostics: z.ZodArray<z.ZodObject<{
        code: z.ZodEnum<{
            conflict: "conflict";
            ineligible: "ineligible";
            invalid: "invalid";
            required: "required";
        }>;
        path: z.ZodString;
        message: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>, z.ZodObject<{
    status: z.ZodLiteral<"materialized">;
    base_release_id: z.ZodString;
    entity_id: z.ZodString;
    program_id: z.ZodOptional<z.ZodString>;
    offer_id: z.ZodString;
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
    expected_current_entities: z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        snapshot_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>>;
    authoring_file: z.ZodObject<{
        path: z.ZodString;
        content: z.ZodString;
        content_digest: z.ZodString;
    }, z.core.$strict>;
    diagnostics: z.ZodArray<z.ZodObject<{
        code: z.ZodEnum<{
            conflict: "conflict";
            ineligible: "ineligible";
            invalid: "invalid";
            required: "required";
        }>;
        path: z.ZodString;
        message: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>], "status">;
export declare const startupCreditsExistingRecordTargetSchema: z.ZodObject<{
    kind: z.ZodLiteral<"existing_record">;
    base_release_id: z.ZodString;
    entity_id: z.ZodString;
    program_id: z.ZodOptional<z.ZodString>;
    entity_revision_digest: z.ZodString;
    offer_id: z.ZodString;
    offer_revision_digest: z.ZodString;
}, z.core.$strict>;
/**
 * Stable customer reference to one admitted Entity and Offer revision.
 *
 * The current Catalog head is deliberately absent: an unrelated release must
 * not invalidate checkout for this exact record. The product resolver adds the
 * current base release only after proving both revision digests still match.
 */
declare const startupCreditsExistingRecordReferenceSchema: z.ZodObject<{
    kind: z.ZodLiteral<"existing_record">;
    entity_id: z.ZodString;
    program_id: z.ZodOptional<z.ZodString>;
    entity_revision_digest: z.ZodString;
    offer_id: z.ZodString;
    offer_revision_digest: z.ZodString;
}, z.core.$strict>;
/**
 * A data repository's pull request adding a company below Sourcey's standing bar, with its Offer.
 * The order serves the pull request's own submission and its exact Entity and Offer; the head is
 * where it was bought. A later head keeps the service while it keeps that Entity and Offer, and
 * the person verifies each head again.
 */
export declare const startupCreditsGitPullRequestTargetSchema: z.ZodObject<{
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
/**
 * The exact pull request head a person verified: its submission revision, and the Entity and
 * Offer revisions that head compiles to, which the verification attests and nothing later.
 */
export declare const startupCreditsReviewedPullRequestRevisionSchema: z.ZodObject<{
    submission_id: z.ZodString;
    revision_digest: z.ZodString;
    head_sha: z.ZodString;
    entity_revision_digest: z.ZodString;
    offer_revision_digest: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsFundedWorkIntentSchema: z.ZodObject<{
    product_intent_contract: z.ZodLiteral<"sourcey.startup-offer-human-verification-intent/v1alpha1">;
    verification_case_id: z.ZodString;
    billing: z.ZodObject<{
        intent_contract: z.ZodLiteral<"sourcey.funded-work-intent/v1alpha1">;
        intent_id: z.ZodString;
        product_code: z.ZodString;
        purchase_kind: z.ZodLiteral<"one_off">;
        actor_ref: z.ZodString;
        owner_work_ref: z.ZodString;
        owner_payload_digest: z.ZodString;
        subject: z.ZodObject<{
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        base_release_id: z.ZodString;
        eligibility_digest: z.ZodString;
        policy_bindings: z.ZodArray<z.ZodObject<{
            role: z.ZodString;
            policy_digest: z.ZodString;
        }, z.core.$strict>>;
        work_class: z.ZodString;
        forbidden_effects: z.ZodTuple<[z.ZodLiteral<"admit_without_evidence">, z.ZodLiteral<"alter_facts">, z.ZodLiteral<"alter_ranking">, z.ZodLiteral<"guarantee_outcome">, z.ZodLiteral<"publish_without_authority">], null>;
        price_lookup_key: z.ZodString;
        requested_by: z.ZodEnum<{
            contributor: "contributor";
            subject: "subject";
        }>;
        issued_at: z.ZodISODateTime;
        expires_at: z.ZodISODateTime;
        intent_digest: z.ZodString;
    }, z.core.$strict>;
    target: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"new_listing">;
        base_release_id: z.ZodString;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
        submission: z.ZodObject<{
            submission_id: z.ZodString;
            payload_digest: z.ZodString;
            authorization_policy: z.ZodLiteral<"proposal">;
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
        authoring_file_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"existing_record">;
        base_release_id: z.ZodString;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        entity_revision_digest: z.ZodString;
        offer_id: z.ZodString;
        offer_revision_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
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
    }, z.core.$strict>], "kind">;
    purchase_preview_digest: z.ZodString;
    disclosure_digest: z.ZodString;
    product_intent_digest: z.ZodString;
}, z.core.$strict>;
/** The reviewer records two factual decisions. Their dependency is explicit:
 * Offer terms are skipped exactly when company identity cannot be established. */
export declare const startupCreditsReviewDecisionSchema: z.ZodObject<{
    entity_identity: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"passed">;
        rationale: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"failed">;
        reason_code: z.ZodEnum<{
            identity_mismatch: "identity_mismatch";
            identity_unresolved: "identity_unresolved";
            insufficient_evidence: "insufficient_evidence";
        }>;
        rationale: z.ZodString;
        basis: z.ZodObject<{
            evidence_event_ids: z.ZodArray<z.ZodString>;
            observation_ids: z.ZodArray<z.ZodString>;
            retained_artifact_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
        }, z.core.$strict>;
    }, z.core.$strict>], "status">;
    offer_terms: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"passed">;
        rationale: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"failed">;
        reason_code: z.ZodEnum<{
            insufficient_evidence: "insufficient_evidence";
            source_unavailable: "source_unavailable";
            terms_mismatch: "terms_mismatch";
        }>;
        rationale: z.ZodString;
        basis: z.ZodObject<{
            evidence_event_ids: z.ZodArray<z.ZodString>;
            observation_ids: z.ZodArray<z.ZodString>;
            retained_artifact_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"not_evaluated">;
        reason_code: z.ZodLiteral<"identity_unresolved">;
    }, z.core.$strict>], "status">;
}, z.core.$strict>;
export declare const startupCreditsReviewCompletionReceiptCoreSchema: z.ZodObject<{
    order_id: z.ZodString;
    funded_work_intent_id: z.ZodString;
    funded_work_intent_digest: z.ZodString;
    verification_case_id: z.ZodString;
    method_policy_digest: z.ZodString;
    reviewer_id: z.ZodString;
    reviewed_at: z.ZodISODateTime;
    readback_release_id: z.ZodString;
    work_outcome: z.ZodLiteral<"review_delivered">;
    entity_identity: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"passed">;
        entity_id: z.ZodString;
        assurance: z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            assurance_id: z.ZodString;
            verified_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"reused">;
        entity_id: z.ZodString;
        assurance: z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            assurance_id: z.ZodString;
            verified_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"failed">;
        entity_id: z.ZodString;
        reason_code: z.ZodEnum<{
            identity_mismatch: "identity_mismatch";
            identity_unresolved: "identity_unresolved";
            insufficient_evidence: "insufficient_evidence";
        }>;
        rationale: z.ZodString;
        basis: z.ZodObject<{
            evidence_event_ids: z.ZodArray<z.ZodString>;
            observation_ids: z.ZodArray<z.ZodString>;
            retained_artifact_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
        }, z.core.$strict>;
    }, z.core.$strict>], "status">;
    receipt_contract: z.ZodLiteral<"sourcey.startup-credits-review-completion/v1alpha1">;
    target: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"new_listing">;
        base_release_id: z.ZodString;
        entity_id: z.ZodString;
        submission_id: z.ZodString;
        submission_payload_digest: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"existing_record">;
        base_release_id: z.ZodString;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        entity_revision_digest: z.ZodString;
        offer_id: z.ZodString;
        offer_revision_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
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
    }, z.core.$strict>], "kind">;
    reviewed_revision: z.ZodOptional<z.ZodObject<{
        submission_id: z.ZodString;
        revision_digest: z.ZodString;
        head_sha: z.ZodString;
        entity_revision_digest: z.ZodString;
        offer_revision_digest: z.ZodString;
    }, z.core.$strict>>;
    offer_terms: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"passed">;
        entity_id: z.ZodString;
        offer_id: z.ZodString;
        assurance: z.ZodObject<{
            status: z.ZodLiteral<"checked">;
            assurance_id: z.ZodString;
            checked_at: z.ZodISODateTime;
            revision_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"reused">;
        entity_id: z.ZodString;
        offer_id: z.ZodString;
        assurance: z.ZodObject<{
            status: z.ZodLiteral<"checked">;
            assurance_id: z.ZodString;
            checked_at: z.ZodISODateTime;
            revision_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"failed">;
        entity_id: z.ZodString;
        offer_id: z.ZodString;
        revision_digest: z.ZodString;
        reason_code: z.ZodEnum<{
            insufficient_evidence: "insufficient_evidence";
            source_unavailable: "source_unavailable";
            terms_mismatch: "terms_mismatch";
        }>;
        rationale: z.ZodString;
        basis: z.ZodObject<{
            evidence_event_ids: z.ZodArray<z.ZodString>;
            observation_ids: z.ZodArray<z.ZodString>;
            retained_artifact_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"not_evaluated">;
        entity_id: z.ZodString;
        offer_id: z.ZodString;
        reason_code: z.ZodLiteral<"identity_unresolved">;
    }, z.core.$strict>], "status">;
}, z.core.$strict>;
export declare const startupCreditsReviewCompletionReceiptSchema: z.ZodObject<{
    order_id: z.ZodString;
    funded_work_intent_id: z.ZodString;
    funded_work_intent_digest: z.ZodString;
    verification_case_id: z.ZodString;
    method_policy_digest: z.ZodString;
    reviewer_id: z.ZodString;
    reviewed_at: z.ZodISODateTime;
    readback_release_id: z.ZodString;
    work_outcome: z.ZodLiteral<"review_delivered">;
    entity_identity: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"passed">;
        entity_id: z.ZodString;
        assurance: z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            assurance_id: z.ZodString;
            verified_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"reused">;
        entity_id: z.ZodString;
        assurance: z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            assurance_id: z.ZodString;
            verified_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"failed">;
        entity_id: z.ZodString;
        reason_code: z.ZodEnum<{
            identity_mismatch: "identity_mismatch";
            identity_unresolved: "identity_unresolved";
            insufficient_evidence: "insufficient_evidence";
        }>;
        rationale: z.ZodString;
        basis: z.ZodObject<{
            evidence_event_ids: z.ZodArray<z.ZodString>;
            observation_ids: z.ZodArray<z.ZodString>;
            retained_artifact_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
        }, z.core.$strict>;
    }, z.core.$strict>], "status">;
    receipt_contract: z.ZodLiteral<"sourcey.startup-credits-review-completion/v1alpha1">;
    target: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"new_listing">;
        base_release_id: z.ZodString;
        entity_id: z.ZodString;
        submission_id: z.ZodString;
        submission_payload_digest: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"existing_record">;
        base_release_id: z.ZodString;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        entity_revision_digest: z.ZodString;
        offer_id: z.ZodString;
        offer_revision_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
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
    }, z.core.$strict>], "kind">;
    reviewed_revision: z.ZodOptional<z.ZodObject<{
        submission_id: z.ZodString;
        revision_digest: z.ZodString;
        head_sha: z.ZodString;
        entity_revision_digest: z.ZodString;
        offer_revision_digest: z.ZodString;
    }, z.core.$strict>>;
    offer_terms: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"passed">;
        entity_id: z.ZodString;
        offer_id: z.ZodString;
        assurance: z.ZodObject<{
            status: z.ZodLiteral<"checked">;
            assurance_id: z.ZodString;
            checked_at: z.ZodISODateTime;
            revision_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"reused">;
        entity_id: z.ZodString;
        offer_id: z.ZodString;
        assurance: z.ZodObject<{
            status: z.ZodLiteral<"checked">;
            assurance_id: z.ZodString;
            checked_at: z.ZodISODateTime;
            revision_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"failed">;
        entity_id: z.ZodString;
        offer_id: z.ZodString;
        revision_digest: z.ZodString;
        reason_code: z.ZodEnum<{
            insufficient_evidence: "insufficient_evidence";
            source_unavailable: "source_unavailable";
            terms_mismatch: "terms_mismatch";
        }>;
        rationale: z.ZodString;
        basis: z.ZodObject<{
            evidence_event_ids: z.ZodArray<z.ZodString>;
            observation_ids: z.ZodArray<z.ZodString>;
            retained_artifact_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"not_evaluated">;
        entity_id: z.ZodString;
        offer_id: z.ZodString;
        reason_code: z.ZodLiteral<"identity_unresolved">;
    }, z.core.$strict>], "status">;
    receipt_digest: z.ZodString;
}, z.core.$strict>;
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
export type StartupCreditsDraftRequest = z.infer<typeof startupCreditsDraftRequestSchema>;
export type StartupCreditsDraftResult = z.infer<typeof startupCreditsDraftResultSchema>;
export type StartupCreditsEntityIconInput = z.infer<typeof startupCreditsEntityIconInputSchema>;
export type StartupCreditsFundedWorkIntent = z.infer<typeof startupCreditsFundedWorkIntentSchema>;
export type StartupCreditsReviewCompletionReceipt = z.infer<typeof startupCreditsReviewCompletionReceiptSchema>;
export type StartupCreditsReviewDecision = z.infer<typeof startupCreditsReviewDecisionSchema>;
export type StartupCreditsPurchasePreview = z.infer<typeof startupCreditsPurchasePreviewSchema>;
export type StartupCreditsServicePolicy = z.infer<typeof startupCreditsServicePolicySchema>;
export type StartupCreditsReviewRequest = z.infer<typeof startupCreditsReviewRequestSchema>;
export type StartupCreditsExistingRecordTarget = z.infer<typeof startupCreditsExistingRecordTargetSchema>;
export type StartupCreditsReviewedPullRequestRevision = z.infer<typeof startupCreditsReviewedPullRequestRevisionSchema>;
export type StartupCreditsGitPullRequestTarget = z.infer<typeof startupCreditsGitPullRequestTargetSchema>;
export type StartupCreditsExistingRecordReference = z.infer<typeof startupCreditsExistingRecordReferenceSchema>;
export type StartupCreditsExistingRecordReviewPreparationRequest = z.infer<typeof startupCreditsExistingRecordReviewPreparationRequestSchema>;
export type StartupCreditsExistingRecordReviewPreparation = z.infer<typeof startupCreditsExistingRecordReviewPreparationSchema>;
export type StartupCreditsGitPullRequestReference = z.infer<typeof startupCreditsGitPullRequestReferenceSchema>;
export type StartupCreditsGitPullRequestReviewPreparation = z.infer<typeof startupCreditsGitPullRequestReviewPreparationResponseSchema>["data"];
export type StartupCreditsReviewResponse = z.infer<typeof startupCreditsReviewResponseSchema>;
export type StartupCreditsPullRequestQuery = z.infer<typeof startupCreditsPullRequestQuerySchema>;
export type StartupCreditsPullRequestStatus = z.infer<typeof startupCreditsPullRequestStatusSchema>;
export type StartupCreditsVerificationStatus = z.infer<typeof startupCreditsVerificationStatusSchema>;
export type PayableProductDescriptor = z.infer<typeof payableProductDescriptorSchema>;
//# sourceMappingURL=index.d.ts.map