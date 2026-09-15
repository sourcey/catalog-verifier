import { z } from "zod";
export * from "../../funded-work/src/index.js";
export declare const domainNameSchema: z.ZodString;
export declare const startupCreditsProductCode: "startup-offer-human-verification";
export declare const startupCreditsPrice: {
    readonly currency: "usd";
    readonly minor_units: 4900;
};
export declare const startupCreditsPriceLookupKey: "startup-offer-human-verification-usd-49";
export declare const startupCreditsPurchaseDisclosureStatement: "Human verification includes publication of a supportable company record with verified status for a legitimate company. Sourcey cannot publish false, unsafe, conflicting, duplicate, or non-existent company or offer claims. Refunds apply when Sourcey cannot deliver the purchased service or misses the review deadline.";
export declare const startupCreditsServicePolicySchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.startup-credits-verification-service-policy/v1alpha1">;
    product_code: z.ZodLiteral<"startup-offer-human-verification">;
    price_lookup_key: z.ZodLiteral<"startup-offer-human-verification-usd-49">;
    price: z.ZodObject<{
        currency: z.ZodLiteral<"usd">;
        minor_units: z.ZodLiteral<4900>;
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
    price_lookup_key: z.ZodLiteral<"startup-offer-human-verification-usd-49">;
    price: z.ZodObject<{
        currency: z.ZodLiteral<"usd">;
        minor_units: z.ZodLiteral<4900>;
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
export declare const standingRouteSchema: z.ZodEnum<{
    correction_required: "correction_required";
    repair_required: "repair_required";
    temporarily_unavailable: "temporarily_unavailable";
    free_machine_review: "free_machine_review";
    human_verification_required: "human_verification_required";
}>;
export declare const standingPolicySchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.standing-policy/v1alpha1">;
    reach_provider: z.ZodLiteral<"ahrefs-domain-rating">;
    reach_threshold_exclusive: z.ZodNumber;
    fallback_domain_age_days: z.ZodNumber;
    fallback_certificate_age_days: z.ZodNumber;
    cache_ttl_seconds: z.ZodNumber;
}, z.core.$strict>;
export declare const standingEvidenceSchema: z.ZodObject<{
    registrable_domain: z.ZodString;
    official_source_url: z.ZodURL;
    source: z.ZodObject<{
        status: z.ZodEnum<{
            unreachable: "unreachable";
            invalid: "invalid";
            reachable: "reachable";
        }>;
        first_party: z.ZodBoolean;
        observed_at: z.ZodISODateTime;
        observation_digest: z.ZodString;
    }, z.core.$strict>;
    catalog_identity: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"unresolved">;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"existing">;
        entity_id: z.ZodString;
        entity_revision_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"ambiguous">;
        entity_ids: z.ZodArray<z.ZodString>;
    }, z.core.$strict>], "status">;
    reach: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"available">;
        rating: z.ZodNumber;
        observed_at: z.ZodISODateTime;
        observation_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"unavailable">;
        reason: z.ZodEnum<{
            not_found: "not_found";
            provider_unavailable: "provider_unavailable";
            provider_rejected: "provider_rejected";
        }>;
        observed_at: z.ZodISODateTime;
    }, z.core.$strict>], "status">;
    domain_age: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"available">;
        age_days: z.ZodNumber;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"unavailable">;
    }, z.core.$strict>], "status">;
    certificate_age: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"available">;
        age_days: z.ZodNumber;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"unavailable">;
    }, z.core.$strict>], "status">;
    mx: z.ZodDiscriminatedUnion<[z.ZodObject<{
        status: z.ZodLiteral<"available">;
        present: z.ZodBoolean;
    }, z.core.$strict>, z.ZodObject<{
        status: z.ZodLiteral<"unavailable">;
    }, z.core.$strict>], "status">;
}, z.core.$strict>;
export declare const standingResultCoreSchema: z.ZodObject<{
    result_contract: z.ZodLiteral<"sourcey.standing-result/v1alpha1">;
    policy_digest: z.ZodString;
    evidence_digest: z.ZodString;
    registrable_domain: z.ZodString;
    official_source_url: z.ZodURL;
    route: z.ZodEnum<{
        correction_required: "correction_required";
        repair_required: "repair_required";
        temporarily_unavailable: "temporarily_unavailable";
        free_machine_review: "free_machine_review";
        human_verification_required: "human_verification_required";
    }>;
    reasons: z.ZodArray<z.ZodString>;
    evaluated_at: z.ZodISODateTime;
    expires_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const standingResultSchema: z.ZodObject<{
    result_contract: z.ZodLiteral<"sourcey.standing-result/v1alpha1">;
    policy_digest: z.ZodString;
    evidence_digest: z.ZodString;
    registrable_domain: z.ZodString;
    official_source_url: z.ZodURL;
    route: z.ZodEnum<{
        correction_required: "correction_required";
        repair_required: "repair_required";
        temporarily_unavailable: "temporarily_unavailable";
        free_machine_review: "free_machine_review";
        human_verification_required: "human_verification_required";
    }>;
    reasons: z.ZodArray<z.ZodString>;
    evaluated_at: z.ZodISODateTime;
    expires_at: z.ZodISODateTime;
    result_digest: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsExistingEntityDraftBaseSchema: z.ZodObject<{
    entity_id: z.ZodString;
    entity_revision_digest: z.ZodString;
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
            repair_required: "repair_required";
            temporarily_unavailable: "temporarily_unavailable";
            free_machine_review: "free_machine_review";
            human_verification_required: "human_verification_required";
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
            other: "other";
            automatic: "automatic";
            form: "form";
            contact: "contact";
        }>;
        access_url: z.ZodOptional<z.ZodURL>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const startupCreditsDraftResultSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    status: z.ZodEnum<{
        invalid: "invalid";
        incomplete: "incomplete";
        conflict: "conflict";
        ineligible: "ineligible";
    }>;
    diagnostics: z.ZodArray<z.ZodObject<{
        code: z.ZodEnum<{
            required: "required";
            invalid: "invalid";
            conflict: "conflict";
            ineligible: "ineligible";
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
        price_lookup_key: z.ZodLiteral<"startup-offer-human-verification-usd-49">;
        price: z.ZodObject<{
            currency: z.ZodLiteral<"usd">;
            minor_units: z.ZodLiteral<4900>;
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
            required: "required";
            invalid: "invalid";
            conflict: "conflict";
            ineligible: "ineligible";
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
    entity_revision_digest: z.ZodString;
    program_id: z.ZodOptional<z.ZodString>;
    offer_id: z.ZodString;
    offer_revision_digest: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsVerificationIntentTargetSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
            repair_required: "repair_required";
            temporarily_unavailable: "temporarily_unavailable";
            free_machine_review: "free_machine_review";
            human_verification_required: "human_verification_required";
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
}, z.core.$strict>], "kind">;
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
            subject: "subject";
            contributor: "contributor";
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
                repair_required: "repair_required";
                temporarily_unavailable: "temporarily_unavailable";
                free_machine_review: "free_machine_review";
                human_verification_required: "human_verification_required";
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
    }, z.core.$strict>], "kind">;
    purchase_preview_digest: z.ZodString;
    disclosure_digest: z.ZodString;
    product_intent_digest: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsCompletedReviewBasisSchema: z.ZodObject<{
    evidence_event_ids: z.ZodArray<z.ZodString>;
    observation_ids: z.ZodArray<z.ZodString>;
    retained_artifact_digests: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strict>;
export declare const startupCreditsEntityIdentityFailureReasonSchema: z.ZodEnum<{
    identity_mismatch: "identity_mismatch";
    identity_unresolved: "identity_unresolved";
    insufficient_evidence: "insufficient_evidence";
}>;
export declare const startupCreditsOfferTermsFailureReasonSchema: z.ZodEnum<{
    insufficient_evidence: "insufficient_evidence";
    terms_mismatch: "terms_mismatch";
    source_unavailable: "source_unavailable";
}>;
export declare const startupCreditsEntityIdentityReviewDecisionSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
export declare const startupCreditsOfferTermsReviewDecisionSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    status: z.ZodLiteral<"passed">;
    rationale: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    status: z.ZodLiteral<"failed">;
    reason_code: z.ZodEnum<{
        insufficient_evidence: "insufficient_evidence";
        terms_mismatch: "terms_mismatch";
        source_unavailable: "source_unavailable";
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
            terms_mismatch: "terms_mismatch";
            source_unavailable: "source_unavailable";
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
export declare const startupCreditsReviewCompletionTargetSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    kind: z.ZodLiteral<"new_listing">;
    base_release_id: z.ZodString;
    entity_id: z.ZodString;
    program_id: z.ZodOptional<z.ZodString>;
    offer_id: z.ZodString;
    submission_id: z.ZodString;
    submission_payload_digest: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"existing_record">;
    base_release_id: z.ZodString;
    entity_id: z.ZodString;
    program_id: z.ZodOptional<z.ZodString>;
    entity_revision_digest: z.ZodString;
    offer_id: z.ZodString;
    offer_revision_digest: z.ZodString;
}, z.core.$strict>], "kind">;
export declare const startupCreditsReviewCompletionReceiptCoreSchema: z.ZodObject<{
    receipt_contract: z.ZodLiteral<"sourcey.startup-credits-review-completion/v1alpha1">;
    order_id: z.ZodString;
    funded_work_intent_id: z.ZodString;
    funded_work_intent_digest: z.ZodString;
    verification_case_id: z.ZodString;
    target: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"new_listing">;
        base_release_id: z.ZodString;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
        submission_id: z.ZodString;
        submission_payload_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"existing_record">;
        base_release_id: z.ZodString;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        entity_revision_digest: z.ZodString;
        offer_id: z.ZodString;
        offer_revision_digest: z.ZodString;
    }, z.core.$strict>], "kind">;
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
            terms_mismatch: "terms_mismatch";
            source_unavailable: "source_unavailable";
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
    receipt_contract: z.ZodLiteral<"sourcey.startup-credits-review-completion/v1alpha1">;
    order_id: z.ZodString;
    funded_work_intent_id: z.ZodString;
    funded_work_intent_digest: z.ZodString;
    verification_case_id: z.ZodString;
    target: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"new_listing">;
        base_release_id: z.ZodString;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
        submission_id: z.ZodString;
        submission_payload_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"existing_record">;
        base_release_id: z.ZodString;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        entity_revision_digest: z.ZodString;
        offer_id: z.ZodString;
        offer_revision_digest: z.ZodString;
    }, z.core.$strict>], "kind">;
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
            terms_mismatch: "terms_mismatch";
            source_unavailable: "source_unavailable";
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
export declare const startupCreditsEntityIconInputSchema: z.ZodObject<{
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
    trademark_owner: z.ZodString;
    relationship: z.ZodEnum<{
        "vendor-representative": "vendor-representative";
        "community-contributor": "community-contributor";
    }>;
}, z.core.$strict>;
export declare const startupCreditsExpectedDraftSchema: z.ZodObject<{
    base_release_id: z.ZodString;
    content_digest: z.ZodString;
    purchase_preview_digest: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsExistingRecordReviewTargetSchema: z.ZodObject<{
    kind: z.ZodLiteral<"existing_record">;
    entity_id: z.ZodString;
    entity_revision_digest: z.ZodString;
    program_id: z.ZodOptional<z.ZodString>;
    offer_id: z.ZodString;
    offer_revision_digest: z.ZodString;
    expected_purchase_preview_digest: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsExistingRecordReviewPreparationRequestSchema: z.ZodObject<{
    target: z.ZodObject<{
        kind: z.ZodLiteral<"existing_record">;
        entity_id: z.ZodString;
        entity_revision_digest: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
        offer_revision_digest: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const startupCreditsExistingRecordReviewPreparationSchema: z.ZodObject<{
    target: z.ZodObject<{
        kind: z.ZodLiteral<"existing_record">;
        entity_id: z.ZodString;
        entity_revision_digest: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
        offer_revision_digest: z.ZodString;
        expected_purchase_preview_digest: z.ZodString;
    }, z.core.$strict>;
    purchase_preview: z.ZodObject<{
        preview_contract: z.ZodLiteral<"sourcey.startup-credits-purchase-preview/v1alpha1">;
        product_code: z.ZodLiteral<"startup-offer-human-verification">;
        purchase_kind: z.ZodLiteral<"one_off">;
        price_lookup_key: z.ZodLiteral<"startup-offer-human-verification-usd-49">;
        price: z.ZodObject<{
            currency: z.ZodLiteral<"usd">;
            minor_units: z.ZodLiteral<4900>;
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
            required: "required";
            already_verified: "already_verified";
        }>;
        offer_terms: z.ZodEnum<{
            required: "required";
            already_checked: "already_checked";
        }>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const startupCreditsExistingRecordReviewPreparationResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        target: z.ZodObject<{
            kind: z.ZodLiteral<"existing_record">;
            entity_id: z.ZodString;
            entity_revision_digest: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            offer_revision_digest: z.ZodString;
            expected_purchase_preview_digest: z.ZodString;
        }, z.core.$strict>;
        purchase_preview: z.ZodObject<{
            preview_contract: z.ZodLiteral<"sourcey.startup-credits-purchase-preview/v1alpha1">;
            product_code: z.ZodLiteral<"startup-offer-human-verification">;
            purchase_kind: z.ZodLiteral<"one_off">;
            price_lookup_key: z.ZodLiteral<"startup-offer-human-verification-usd-49">;
            price: z.ZodObject<{
                currency: z.ZodLiteral<"usd">;
                minor_units: z.ZodLiteral<4900>;
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
                required: "required";
                already_verified: "already_verified";
            }>;
            offer_terms: z.ZodEnum<{
                required: "required";
                already_checked: "already_checked";
            }>;
        }, z.core.$strict>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const startupCreditsReviewTargetSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
                repair_required: "repair_required";
                temporarily_unavailable: "temporarily_unavailable";
                free_machine_review: "free_machine_review";
                human_verification_required: "human_verification_required";
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
                other: "other";
                automatic: "automatic";
                form: "form";
                contact: "contact";
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
                "image/webp": "image/webp";
                "image/svg+xml": "image/svg+xml";
            }>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"official_url">;
            url: z.ZodURL;
        }, z.core.$strict>], "kind">;
        trademark_owner: z.ZodString;
        relationship: z.ZodEnum<{
            "vendor-representative": "vendor-representative";
            "community-contributor": "community-contributor";
        }>;
    }, z.core.$strict>>;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"existing_record">;
    entity_id: z.ZodString;
    entity_revision_digest: z.ZodString;
    program_id: z.ZodOptional<z.ZodString>;
    offer_id: z.ZodString;
    offer_revision_digest: z.ZodString;
    expected_purchase_preview_digest: z.ZodString;
}, z.core.$strict>], "kind">;
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
                    repair_required: "repair_required";
                    temporarily_unavailable: "temporarily_unavailable";
                    free_machine_review: "free_machine_review";
                    human_verification_required: "human_verification_required";
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
                    other: "other";
                    automatic: "automatic";
                    form: "form";
                    contact: "contact";
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
                    "image/webp": "image/webp";
                    "image/svg+xml": "image/svg+xml";
                }>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"official_url">;
                url: z.ZodURL;
            }, z.core.$strict>], "kind">;
            trademark_owner: z.ZodString;
            relationship: z.ZodEnum<{
                "vendor-representative": "vendor-representative";
                "community-contributor": "community-contributor";
            }>;
        }, z.core.$strict>>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"existing_record">;
        entity_id: z.ZodString;
        entity_revision_digest: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
        offer_revision_digest: z.ZodString;
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
                    repair_required: "repair_required";
                    temporarily_unavailable: "temporarily_unavailable";
                    free_machine_review: "free_machine_review";
                    human_verification_required: "human_verification_required";
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
                    other: "other";
                    automatic: "automatic";
                    form: "form";
                    contact: "contact";
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
                    "image/webp": "image/webp";
                    "image/svg+xml": "image/svg+xml";
                }>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"official_url">;
                url: z.ZodURL;
            }, z.core.$strict>], "kind">;
            trademark_owner: z.ZodString;
            relationship: z.ZodEnum<{
                "vendor-representative": "vendor-representative";
                "community-contributor": "community-contributor";
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
        entity_revision_digest: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
        offer_revision_digest: z.ZodString;
        expected_purchase_preview_digest: z.ZodString;
    }, z.core.$strict>], "kind">;
    replaces_intent: z.ZodOptional<z.ZodObject<{
        intent_id: z.ZodString;
        intent_digest: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>], "payment_rail">;
export declare const startupCreditsVerificationPublicStateSchema: z.ZodEnum<{
    awaiting_payment: "awaiting_payment";
    verifying: "verifying";
    input_needed: "input_needed";
    publishing: "publishing";
    live: "live";
    refused: "refused";
}>;
export declare const startupCreditsVerificationRequiredInputSchema: z.ZodObject<{
    code: z.ZodEnum<{
        domain_control: "domain_control";
        official_offer_page: "official_offer_page";
        company_identity: "company_identity";
        offer_existence: "offer_existence";
        current_terms: "current_terms";
        pricing_or_consideration: "pricing_or_consideration";
        access_instructions: "access_instructions";
        conflicting_identity: "conflicting_identity";
        unsupported_material_claim: "unsupported_material_claim";
    }>;
    path: z.ZodString;
    message: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsVerificationStatusSchema: z.ZodObject<{
    verification_case_id: z.ZodString;
    state: z.ZodEnum<{
        awaiting_payment: "awaiting_payment";
        verifying: "verifying";
        input_needed: "input_needed";
        publishing: "publishing";
        live: "live";
        refused: "refused";
    }>;
    required_input: z.ZodArray<z.ZodObject<{
        code: z.ZodEnum<{
            domain_control: "domain_control";
            official_offer_page: "official_offer_page";
            company_identity: "company_identity";
            offer_existence: "offer_existence";
            current_terms: "current_terms";
            pricing_or_consideration: "pricing_or_consideration";
            access_instructions: "access_instructions";
            conflicting_identity: "conflicting_identity";
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
                verifying: "verifying";
                input_needed: "input_needed";
                publishing: "publishing";
                live: "live";
                refused: "refused";
            }>;
            required_input: z.ZodArray<z.ZodObject<{
                code: z.ZodEnum<{
                    domain_control: "domain_control";
                    official_offer_page: "official_offer_page";
                    company_identity: "company_identity";
                    offer_existence: "offer_existence";
                    current_terms: "current_terms";
                    pricing_or_consideration: "pricing_or_consideration";
                    access_instructions: "access_instructions";
                    conflicting_identity: "conflicting_identity";
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
        minor_units: z.ZodLiteral<4900>;
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
                        repair_required: "repair_required";
                        temporarily_unavailable: "temporarily_unavailable";
                        free_machine_review: "free_machine_review";
                        human_verification_required: "human_verification_required";
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
                        other: "other";
                        automatic: "automatic";
                        form: "form";
                        contact: "contact";
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
                        "image/webp": "image/webp";
                        "image/svg+xml": "image/svg+xml";
                    }>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"official_url">;
                    url: z.ZodURL;
                }, z.core.$strict>], "kind">;
                trademark_owner: z.ZodString;
                relationship: z.ZodEnum<{
                    "vendor-representative": "vendor-representative";
                    "community-contributor": "community-contributor";
                }>;
            }, z.core.$strict>>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"existing_record">;
            entity_id: z.ZodString;
            entity_revision_digest: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            offer_revision_digest: z.ZodString;
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
                        repair_required: "repair_required";
                        temporarily_unavailable: "temporarily_unavailable";
                        free_machine_review: "free_machine_review";
                        human_verification_required: "human_verification_required";
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
                        other: "other";
                        automatic: "automatic";
                        form: "form";
                        contact: "contact";
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
                        "image/webp": "image/webp";
                        "image/svg+xml": "image/svg+xml";
                    }>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"official_url">;
                    url: z.ZodURL;
                }, z.core.$strict>], "kind">;
                trademark_owner: z.ZodString;
                relationship: z.ZodEnum<{
                    "vendor-representative": "vendor-representative";
                    "community-contributor": "community-contributor";
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
            entity_revision_digest: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            offer_revision_digest: z.ZodString;
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
                    verifying: "verifying";
                    input_needed: "input_needed";
                    publishing: "publishing";
                    live: "live";
                    refused: "refused";
                }>;
                required_input: z.ZodArray<z.ZodObject<{
                    code: z.ZodEnum<{
                        domain_control: "domain_control";
                        official_offer_page: "official_offer_page";
                        company_identity: "company_identity";
                        offer_existence: "offer_existence";
                        current_terms: "current_terms";
                        pricing_or_consideration: "pricing_or_consideration";
                        access_instructions: "access_instructions";
                        conflicting_identity: "conflicting_identity";
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
        minor_units: 4900;
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
                    route: "correction_required" | "repair_required" | "temporarily_unavailable" | "free_machine_review" | "human_verification_required";
                    reasons: string[];
                    evaluated_at: string;
                    expires_at: string;
                    result_digest: string;
                };
                company: {
                    name: string;
                    domain: string;
                    category: string;
                    summary: string;
                    site_url: string;
                };
                offer: {
                    title: string;
                    summary: string;
                    benefit: string;
                    eligibility: string;
                    access_method: "other" | "automatic" | "form" | "contact";
                    access_url?: string | undefined;
                };
                existing_entity?: {
                    entity_id: string;
                    entity_revision_digest: string;
                } | undefined;
                program?: {
                    title: string;
                    summary: string;
                } | undefined;
            };
            entity_icon?: {
                source: {
                    kind: "upload";
                    upload_receipt_digest: string;
                    original_digest: string;
                    bytes: number;
                    media_type: "image/jpeg" | "image/png" | "image/webp" | "image/svg+xml";
                } | {
                    kind: "official_url";
                    url: string;
                };
                trademark_owner: string;
                relationship: "vendor-representative" | "community-contributor";
            } | undefined;
        } | {
            kind: "existing_record";
            entity_id: string;
            entity_revision_digest: string;
            offer_id: string;
            offer_revision_digest: string;
            expected_purchase_preview_digest: string;
            program_id?: string | undefined;
        };
    } | {
        request_id: string;
        payment_rail: "stripe";
        target: {
            kind: "existing_record";
            entity_id: string;
            entity_revision_digest: string;
            offer_id: string;
            offer_revision_digest: string;
            expected_purchase_preview_digest: string;
            program_id?: string | undefined;
        } | {
            kind: "new_listing";
            draft: {
                standing_result: {
                    result_contract: "sourcey.standing-result/v1alpha1";
                    policy_digest: string;
                    evidence_digest: string;
                    registrable_domain: string;
                    official_source_url: string;
                    route: "correction_required" | "repair_required" | "temporarily_unavailable" | "free_machine_review" | "human_verification_required";
                    reasons: string[];
                    evaluated_at: string;
                    expires_at: string;
                    result_digest: string;
                };
                company: {
                    name: string;
                    domain: string;
                    category: string;
                    summary: string;
                    site_url: string;
                };
                offer: {
                    title: string;
                    summary: string;
                    benefit: string;
                    eligibility: string;
                    access_method: "other" | "automatic" | "form" | "contact";
                    access_url?: string | undefined;
                };
                existing_entity?: {
                    entity_id: string;
                    entity_revision_digest: string;
                } | undefined;
                program?: {
                    title: string;
                    summary: string;
                } | undefined;
            };
            expected_draft: {
                base_release_id: string;
                content_digest: string;
                purchase_preview_digest: string;
            };
            entity_icon?: {
                source: {
                    kind: "upload";
                    upload_receipt_digest: string;
                    original_digest: string;
                    bytes: number;
                    media_type: "image/jpeg" | "image/png" | "image/webp" | "image/svg+xml";
                } | {
                    kind: "official_url";
                    url: string;
                };
                trademark_owner: string;
                relationship: "vendor-representative" | "community-contributor";
            } | undefined;
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
                state: "awaiting_payment" | "verifying" | "input_needed" | "publishing" | "live" | "refused";
                required_input: {
                    code: "domain_control" | "official_offer_page" | "company_identity" | "offer_existence" | "current_terms" | "pricing_or_consideration" | "access_instructions" | "conflicting_identity" | "unsupported_material_claim";
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
export type StandingPolicy = z.infer<typeof standingPolicySchema>;
export type StandingEvidence = z.infer<typeof standingEvidenceSchema>;
export type StandingResult = z.infer<typeof standingResultSchema>;
export type StartupCreditsDraftRequest = z.infer<typeof startupCreditsDraftRequestSchema>;
export type StartupCreditsDraftResult = z.infer<typeof startupCreditsDraftResultSchema>;
export type StartupCreditsEntityIconInput = z.infer<typeof startupCreditsEntityIconInputSchema>;
export type StartupCreditsFundedWorkIntent = z.infer<typeof startupCreditsFundedWorkIntentSchema>;
export type StartupCreditsReviewCompletionReceipt = z.infer<typeof startupCreditsReviewCompletionReceiptSchema>;
export type StartupCreditsCompletedReviewBasis = z.infer<typeof startupCreditsCompletedReviewBasisSchema>;
export type StartupCreditsReviewDecision = z.infer<typeof startupCreditsReviewDecisionSchema>;
export type StartupCreditsPurchasePreview = z.infer<typeof startupCreditsPurchasePreviewSchema>;
export type StartupCreditsServicePolicy = z.infer<typeof startupCreditsServicePolicySchema>;
export type StartupCreditsReviewRequest = z.infer<typeof startupCreditsReviewRequestSchema>;
export type StartupCreditsReviewTarget = z.infer<typeof startupCreditsReviewTargetSchema>;
export type StartupCreditsExistingRecordTarget = z.infer<typeof startupCreditsExistingRecordTargetSchema>;
export type StartupCreditsExistingRecordReference = z.infer<typeof startupCreditsExistingRecordReferenceSchema>;
export type StartupCreditsExistingRecordReviewPreparationRequest = z.infer<typeof startupCreditsExistingRecordReviewPreparationRequestSchema>;
export type StartupCreditsExistingRecordReviewPreparation = z.infer<typeof startupCreditsExistingRecordReviewPreparationSchema>;
export type StartupCreditsReviewResponse = z.infer<typeof startupCreditsReviewResponseSchema>;
export type StartupCreditsVerificationStatus = z.infer<typeof startupCreditsVerificationStatusSchema>;
export type PayableProductDescriptor = z.infer<typeof payableProductDescriptorSchema>;
export declare function isFirstPartyUrlForDomain(value: string, domain: string): boolean;
//# sourceMappingURL=index.d.ts.map