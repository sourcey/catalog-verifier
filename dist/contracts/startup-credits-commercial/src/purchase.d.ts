import { z } from "zod";
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
export declare const startupCreditsVerificationCaseIdSchema: z.ZodString;
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
export declare const startupCreditsExistingRecordReferenceSchema: z.ZodObject<{
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
export type StartupCreditsDraftRequest = z.infer<typeof startupCreditsDraftRequestSchema>;
export type StartupCreditsDraftResult = z.infer<typeof startupCreditsDraftResultSchema>;
export type StartupCreditsFundedWorkIntent = z.infer<typeof startupCreditsFundedWorkIntentSchema>;
export type StartupCreditsReviewCompletionReceipt = z.infer<typeof startupCreditsReviewCompletionReceiptSchema>;
export type StartupCreditsReviewDecision = z.infer<typeof startupCreditsReviewDecisionSchema>;
export type StartupCreditsExistingRecordTarget = z.infer<typeof startupCreditsExistingRecordTargetSchema>;
export type StartupCreditsReviewedPullRequestRevision = z.infer<typeof startupCreditsReviewedPullRequestRevisionSchema>;
export type StartupCreditsGitPullRequestTarget = z.infer<typeof startupCreditsGitPullRequestTargetSchema>;
export type StartupCreditsExistingRecordReference = z.infer<typeof startupCreditsExistingRecordReferenceSchema>;
//# sourceMappingURL=purchase.d.ts.map