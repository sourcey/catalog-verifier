import { z } from "zod";
export declare const companyVerificationProductCode: "company-human-verification";
export declare const companyVerificationPrice: {
    readonly currency: "usd";
    readonly minor_units: 2900;
};
export declare const companyVerificationPriceLookupKey: "company-human-verification-usd-29";
export declare const companyVerificationPurchaseDisclosureStatement: "Human verification of a company includes publication of a supportable company record with verified status for a legitimate company. Sourcey cannot publish false, unsafe, conflicting, duplicate, or non-existent company claims. Refunds apply when Sourcey cannot deliver the purchased service or misses the review deadline.";
/** The business days a paid verification is delivered in, counted on Sydney's calendar. */
export declare const humanVerificationServiceCalendarSchema: z.ZodObject<{
    time_zone: z.ZodLiteral<"Australia/Sydney">;
    business_days: z.ZodLiteral<3>;
    counting: z.ZodLiteral<"next-business-day">;
    deadline: z.ZodLiteral<"end-of-local-day">;
    holiday_dates: z.ZodArray<z.ZodISODate>;
    valid_through: z.ZodISODate;
    source_url: z.ZodLiteral<"https://www.nsw.gov.au/about-nsw/public-holidays">;
    source_observed_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const companyVerificationServicePolicySchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.company-verification-service-policy/v1alpha1">;
    product_code: z.ZodLiteral<"company-human-verification">;
    price_lookup_key: z.ZodLiteral<"company-human-verification-usd-29">;
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
export declare const companyVerificationWorkDefinitionSchema: z.ZodObject<{
    work_contract: z.ZodLiteral<"sourcey.company-review-work-definition/v1alpha1">;
    scope: z.ZodLiteral<"one-entity">;
    passing_results: z.ZodObject<{
        entity_identity: z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            binding: z.ZodLiteral<"identity-epoch">;
        }, z.core.$strict>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const companyVerificationPurchaseDisclosureSchema: z.ZodObject<{
    disclosure_contract: z.ZodLiteral<"sourcey.company-purchase-disclosure/v1alpha1">;
    statement: z.ZodLiteral<"Human verification of a company includes publication of a supportable company record with verified status for a legitimate company. Sourcey cannot publish false, unsafe, conflicting, duplicate, or non-existent company claims. Refunds apply when Sourcey cannot deliver the purchased service or misses the review deadline.">;
}, z.core.$strict>;
export declare const companyVerificationPurchasePreviewSchema: z.ZodObject<{
    preview_contract: z.ZodLiteral<"sourcey.company-purchase-preview/v1alpha1">;
    product_code: z.ZodLiteral<"company-human-verification">;
    purchase_kind: z.ZodLiteral<"one_off">;
    price_lookup_key: z.ZodLiteral<"company-human-verification-usd-29">;
    price: z.ZodObject<{
        currency: z.ZodLiteral<"usd">;
        minor_units: z.ZodLiteral<2900>;
    }, z.core.$strict>;
    work_scope: z.ZodLiteral<"one-entity">;
    passing_results: z.ZodObject<{
        entity_identity: z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            binding: z.ZodLiteral<"identity-epoch">;
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
    disclosure: z.ZodLiteral<"Human verification of a company includes publication of a supportable company record with verified status for a legitimate company. Sourcey cannot publish false, unsafe, conflicting, duplicate, or non-existent company claims. Refunds apply when Sourcey cannot deliver the purchased service or misses the review deadline.">;
    policy_bindings: z.ZodObject<{
        assurance_method: z.ZodString;
        purchase_disclosure: z.ZodString;
        service: z.ZodString;
    }, z.core.$strict>;
    preview_digest: z.ZodString;
}, z.core.$strict>;
/**
 * A data repository's pull request adding a company alone (no Offer) below Sourcey's standing bar.
 * The order serves the pull request's own submission and its exact Entity; the head is where it
 * was bought. A later head keeps the service while it keeps that Entity, and the person verifies
 * each head again.
 */
export declare const companyVerificationGitPullRequestTargetSchema: z.ZodObject<{
    kind: z.ZodLiteral<"git_pull_request">;
    base_release_id: z.ZodString;
    entity_id: z.ZodString;
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
    }, z.core.$strict>;
    labels: z.ZodObject<{
        company_name: z.ZodString;
        company_site_url: z.ZodURL;
    }, z.core.$strict>;
}, z.core.$strict>;
/** The exact pull request head a person verified, and the Entity revision it compiles to. */
export declare const companyVerificationReviewedRevisionSchema: z.ZodObject<{
    submission_id: z.ZodString;
    revision_digest: z.ZodString;
    head_sha: z.ZodString;
    entity_revision_digest: z.ZodString;
}, z.core.$strict>;
export declare const companyVerificationFundedWorkIntentSchema: z.ZodObject<{
    product_intent_contract: z.ZodLiteral<"sourcey.company-human-verification-intent/v1alpha1">;
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
    target: z.ZodObject<{
        kind: z.ZodLiteral<"git_pull_request">;
        base_release_id: z.ZodString;
        entity_id: z.ZodString;
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
        }, z.core.$strict>;
        labels: z.ZodObject<{
            company_name: z.ZodString;
            company_site_url: z.ZodURL;
        }, z.core.$strict>;
    }, z.core.$strict>;
    purchase_preview_digest: z.ZodString;
    disclosure_digest: z.ZodString;
    product_intent_digest: z.ZodString;
}, z.core.$strict>;
/** What a person records verifying a company alone: its identity, and nothing about an Offer. */
export declare const companyVerificationReviewDecisionSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const companyVerificationReviewCompletionReceiptCoreSchema: z.ZodObject<{
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
    receipt_contract: z.ZodLiteral<"sourcey.company-review-completion/v1alpha1">;
    target: z.ZodObject<{
        kind: z.ZodLiteral<"git_pull_request">;
        base_release_id: z.ZodString;
        entity_id: z.ZodString;
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
        }, z.core.$strict>;
        labels: z.ZodObject<{
            company_name: z.ZodString;
            company_site_url: z.ZodURL;
        }, z.core.$strict>;
    }, z.core.$strict>;
    reviewed_revision: z.ZodObject<{
        submission_id: z.ZodString;
        revision_digest: z.ZodString;
        head_sha: z.ZodString;
        entity_revision_digest: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const companyVerificationReviewCompletionReceiptSchema: z.ZodObject<{
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
    receipt_contract: z.ZodLiteral<"sourcey.company-review-completion/v1alpha1">;
    target: z.ZodObject<{
        kind: z.ZodLiteral<"git_pull_request">;
        base_release_id: z.ZodString;
        entity_id: z.ZodString;
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
        }, z.core.$strict>;
        labels: z.ZodObject<{
            company_name: z.ZodString;
            company_site_url: z.ZodURL;
        }, z.core.$strict>;
    }, z.core.$strict>;
    reviewed_revision: z.ZodObject<{
        submission_id: z.ZodString;
        revision_digest: z.ZodString;
        head_sha: z.ZodString;
        entity_revision_digest: z.ZodString;
    }, z.core.$strict>;
    receipt_digest: z.ZodString;
}, z.core.$strict>;
export type CompanyVerificationServicePolicy = z.infer<typeof companyVerificationServicePolicySchema>;
export type CompanyVerificationPurchasePreview = z.infer<typeof companyVerificationPurchasePreviewSchema>;
export type CompanyVerificationGitPullRequestTarget = z.infer<typeof companyVerificationGitPullRequestTargetSchema>;
export type CompanyVerificationReviewedRevision = z.infer<typeof companyVerificationReviewedRevisionSchema>;
export type CompanyVerificationFundedWorkIntent = z.infer<typeof companyVerificationFundedWorkIntentSchema>;
export type CompanyVerificationReviewDecision = z.infer<typeof companyVerificationReviewDecisionSchema>;
export type CompanyVerificationReviewCompletionReceipt = z.infer<typeof companyVerificationReviewCompletionReceiptSchema>;
//# sourceMappingURL=commercial.d.ts.map