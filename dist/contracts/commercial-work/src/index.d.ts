import { z } from "zod";
export * from "../../funded-work/src/index.js";
export declare const domainNameSchema: z.ZodString;
export declare const startupCreditsProductCode: "startup-offer-human-verification";
export declare const startupCreditsPriceLookupKey: "startup-offer-human-verification-usd-25";
export declare const startupCreditsServicePolicySchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.startup-credits-verification-service-policy/v1alpha1">;
    product_code: z.ZodLiteral<"startup-offer-human-verification">;
    price_lookup_key: z.ZodLiteral<"startup-offer-human-verification-usd-25">;
    price: z.ZodObject<{
        currency: z.ZodLiteral<"usd">;
        minor_units: z.ZodLiteral<2500>;
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
    failed_review_refundable: z.ZodLiteral<false>;
    sla_miss_refundable: z.ZodLiteral<true>;
    sourcey_error_refundable: z.ZodLiteral<true>;
    payment_changes_truth_or_admission: z.ZodLiteral<false>;
}, z.core.$strict>;
export declare const startupCreditsVerificationMethodPolicySchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.startup-credits-verification-method/v1alpha1">;
    scope: z.ZodLiteral<"one-entity-one-offer">;
    evidence_authority: z.ZodLiteral<"first-party-public-sources">;
    reviewer_decides_from_admitted_evidence: z.ZodLiteral<true>;
    payment_can_select_findings: z.ZodLiteral<false>;
    payment_can_admit_or_publish: z.ZodLiteral<false>;
}, z.core.$strict>;
export declare const startupCreditsPurchaseDisclosureSchema: z.ZodObject<{
    disclosure_contract: z.ZodLiteral<"sourcey.startup-credits-purchase-disclosure/v1alpha1">;
    statement: z.ZodLiteral<"Payment funds one human verification run. It does not buy admission, alter facts or ranking, guarantee a pass, or authorize publication.">;
}, z.core.$strict>;
export declare const startupCreditsPurchasePreviewSchema: z.ZodObject<{
    preview_contract: z.ZodLiteral<"sourcey.startup-credits-purchase-preview/v1alpha1">;
    product_code: z.ZodLiteral<"startup-offer-human-verification">;
    purchase_kind: z.ZodLiteral<"one_off">;
    price_lookup_key: z.ZodLiteral<"startup-offer-human-verification-usd-25">;
    price: z.ZodObject<{
        currency: z.ZodLiteral<"usd">;
        minor_units: z.ZodLiteral<2500>;
    }, z.core.$strict>;
    work_scope: z.ZodLiteral<"one-entity-one-offer">;
    service_level: z.ZodObject<{
        starts_after: z.ZodLiteral<"settled-payment">;
        business_days: z.ZodLiteral<3>;
        time_zone: z.ZodLiteral<"Australia/Sydney">;
    }, z.core.$strict>;
    refunds: z.ZodObject<{
        failed_review_refundable: z.ZodLiteral<false>;
        service_level_missed_refundable: z.ZodLiteral<true>;
        sourcey_error_refundable: z.ZodLiteral<true>;
    }, z.core.$strict>;
    disclosure: z.ZodLiteral<"Payment funds one human verification run. It does not buy admission, alter facts or ranking, guarantee a pass, or authorize publication.">;
    policy_bindings: z.ZodObject<{
        purchase_disclosure: z.ZodString;
        service: z.ZodString;
        verification_method: z.ZodString;
    }, z.core.$strict>;
    preview_digest: z.ZodString;
}, z.core.$strict>;
export declare const standingRouteSchema: z.ZodEnum<{
    correction_required: "correction_required";
    repair_required: "repair_required";
    temporarily_unavailable: "temporarily_unavailable";
    free_machine_review: "free_machine_review";
    claim_or_fund: "claim_or_fund";
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
            invalid: "invalid";
            reachable: "reachable";
            unreachable: "unreachable";
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
        claim_or_fund: "claim_or_fund";
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
        claim_or_fund: "claim_or_fund";
    }>;
    reasons: z.ZodArray<z.ZodString>;
    evaluated_at: z.ZodISODateTime;
    expires_at: z.ZodISODateTime;
    result_digest: z.ZodString;
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
            claim_or_fund: "claim_or_fund";
        }>;
        reasons: z.ZodArray<z.ZodString>;
        evaluated_at: z.ZodISODateTime;
        expires_at: z.ZodISODateTime;
        result_digest: z.ZodString;
    }, z.core.$strict>;
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
        price_lookup_key: z.ZodLiteral<"startup-offer-human-verification-usd-25">;
        price: z.ZodObject<{
            currency: z.ZodLiteral<"usd">;
            minor_units: z.ZodLiteral<2500>;
        }, z.core.$strict>;
        work_scope: z.ZodLiteral<"one-entity-one-offer">;
        service_level: z.ZodObject<{
            starts_after: z.ZodLiteral<"settled-payment">;
            business_days: z.ZodLiteral<3>;
            time_zone: z.ZodLiteral<"Australia/Sydney">;
        }, z.core.$strict>;
        refunds: z.ZodObject<{
            failed_review_refundable: z.ZodLiteral<false>;
            service_level_missed_refundable: z.ZodLiteral<true>;
            sourcey_error_refundable: z.ZodLiteral<true>;
        }, z.core.$strict>;
        disclosure: z.ZodLiteral<"Payment funds one human verification run. It does not buy admission, alter facts or ranking, guarantee a pass, or authorize publication.">;
        policy_bindings: z.ZodObject<{
            purchase_disclosure: z.ZodString;
            service: z.ZodString;
            verification_method: z.ZodString;
        }, z.core.$strict>;
        preview_digest: z.ZodString;
    }, z.core.$strict>;
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
export declare const startupCreditsFundedWorkIntentSchema: z.ZodObject<{
    product_intent_contract: z.ZodLiteral<"sourcey.startup-offer-human-verification-intent/v1alpha1">;
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
            offer_id: z.ZodString;
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
            claim_or_fund: "claim_or_fund";
        }>;
        reasons: z.ZodArray<z.ZodString>;
        evaluated_at: z.ZodISODateTime;
        expires_at: z.ZodISODateTime;
        result_digest: z.ZodString;
    }, z.core.$strict>;
    authoring_file_digest: z.ZodString;
    purchase_preview_digest: z.ZodString;
    disclosure_digest: z.ZodString;
    product_intent_digest: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsReviewRequestIdSchema: z.ZodString;
export declare const startupCreditsReviewRequestSchema: z.ZodObject<{
    request_id: z.ZodString;
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
                claim_or_fund: "claim_or_fund";
            }>;
            reasons: z.ZodArray<z.ZodString>;
            evaluated_at: z.ZodISODateTime;
            expires_at: z.ZodISODateTime;
            result_digest: z.ZodString;
        }, z.core.$strict>;
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
}, z.core.$strict>;
export declare const startupCreditsReviewResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        request_id: z.ZodString;
        submission_id: z.ZodString;
        order: z.ZodObject<{
            order: z.ZodObject<{
                order_contract: z.ZodLiteral<"sourcey.commercial-order/v1alpha1">;
                order_id: z.ZodString;
                actor_ref: z.ZodString;
                product_code: z.ZodString;
                purchase_kind: z.ZodLiteral<"one_off">;
                product_definition_digest: z.ZodString;
                funded_work_intent_id: z.ZodString;
                funded_work_intent_digest: z.ZodString;
                owner_work_ref: z.ZodString;
                amount: z.ZodObject<{
                    currency: z.ZodString;
                    minor_units: z.ZodNumber;
                }, z.core.$strict>;
                payment_state: z.ZodEnum<{
                    payment_pending: "payment_pending";
                    refund_pending: "refund_pending";
                    refunded: "refunded";
                    paid: "paid";
                    cancelled: "cancelled";
                }>;
                payment_attempt_id: z.ZodString;
                work_state: z.ZodEnum<{
                    failed: "failed";
                    blocked: "blocked";
                    cancelled: "cancelled";
                    queued: "queued";
                    in_review: "in_review";
                    fulfilled: "fulfilled";
                }>;
                paid_at: z.ZodNullable<z.ZodISODateTime>;
                sla_due_at: z.ZodNullable<z.ZodISODateTime>;
                refund_reason: z.ZodNullable<z.ZodEnum<{
                    scope_superseded: "scope_superseded";
                    service_level_missed: "service_level_missed";
                    sourcey_error: "sourcey_error";
                    duplicate_charge: "duplicate_charge";
                }>>;
                refund_requested_at: z.ZodNullable<z.ZodISODateTime>;
                refunded_at: z.ZodNullable<z.ZodISODateTime>;
                fulfilment_receipt_digest: z.ZodNullable<z.ZodString>;
                failure_receipt_digest: z.ZodNullable<z.ZodString>;
                created_at: z.ZodISODateTime;
                updated_at: z.ZodISODateTime;
            }, z.core.$strict>;
            payment_attempt: z.ZodDiscriminatedUnion<[z.ZodObject<{
                attempt_contract: z.ZodLiteral<"sourcey.payment-attempt/v1alpha1">;
                attempt_id: z.ZodString;
                order_id: z.ZodString;
                request_binding_digest: z.ZodString;
                amount: z.ZodObject<{
                    currency: z.ZodString;
                    minor_units: z.ZodNumber;
                }, z.core.$strict>;
                state: z.ZodEnum<{
                    verified: "verified";
                    failed: "failed";
                    prepared: "prepared";
                    payment_pending: "payment_pending";
                    settlement_pending: "settlement_pending";
                    settled: "settled";
                    expired: "expired";
                    refund_pending: "refund_pending";
                    refunded: "refunded";
                }>;
                expires_at: z.ZodISODateTime;
                created_at: z.ZodISODateTime;
                updated_at: z.ZodISODateTime;
                rail: z.ZodLiteral<"stripe">;
                checkout_session_id: z.ZodNullable<z.ZodString>;
                checkout_url: z.ZodNullable<z.ZodURL>;
                payment_intent_id: z.ZodNullable<z.ZodString>;
                refund_id: z.ZodNullable<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                attempt_contract: z.ZodLiteral<"sourcey.payment-attempt/v1alpha1">;
                attempt_id: z.ZodString;
                order_id: z.ZodString;
                request_binding_digest: z.ZodString;
                amount: z.ZodObject<{
                    currency: z.ZodString;
                    minor_units: z.ZodNumber;
                }, z.core.$strict>;
                state: z.ZodEnum<{
                    verified: "verified";
                    failed: "failed";
                    prepared: "prepared";
                    payment_pending: "payment_pending";
                    settlement_pending: "settlement_pending";
                    settled: "settled";
                    expired: "expired";
                    refund_pending: "refund_pending";
                    refunded: "refunded";
                }>;
                expires_at: z.ZodISODateTime;
                created_at: z.ZodISODateTime;
                updated_at: z.ZodISODateTime;
                rail: z.ZodLiteral<"x402">;
                resource: z.ZodURL;
                challenge_digest: z.ZodString;
                payment_payload_digest: z.ZodString;
                payment_requirements_digest: z.ZodString;
                payment_ref: z.ZodNullable<z.ZodString>;
                verification_ref: z.ZodNullable<z.ZodString>;
                settlement_ref: z.ZodNullable<z.ZodString>;
                payer_ref: z.ZodNullable<z.ZodString>;
                refund_ref: z.ZodNullable<z.ZodString>;
            }, z.core.$strict>], "rail">;
        }, z.core.$strict>;
        status_url: z.ZodURL;
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
        minor_units: z.ZodLiteral<2500>;
    }, z.core.$strict>;
    service_policy_url: z.ZodURL;
    refund_policy_url: z.ZodURL;
    input_example: z.ZodObject<{
        request_id: z.ZodString;
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
                    claim_or_fund: "claim_or_fund";
                }>;
                reasons: z.ZodArray<z.ZodString>;
                evaluated_at: z.ZodISODateTime;
                expires_at: z.ZodISODateTime;
                result_digest: z.ZodString;
            }, z.core.$strict>;
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
    }, z.core.$strict>;
    output_example: z.ZodObject<{
        data: z.ZodObject<{
            request_id: z.ZodString;
            submission_id: z.ZodString;
            order: z.ZodObject<{
                order: z.ZodObject<{
                    order_contract: z.ZodLiteral<"sourcey.commercial-order/v1alpha1">;
                    order_id: z.ZodString;
                    actor_ref: z.ZodString;
                    product_code: z.ZodString;
                    purchase_kind: z.ZodLiteral<"one_off">;
                    product_definition_digest: z.ZodString;
                    funded_work_intent_id: z.ZodString;
                    funded_work_intent_digest: z.ZodString;
                    owner_work_ref: z.ZodString;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                    payment_state: z.ZodEnum<{
                        payment_pending: "payment_pending";
                        refund_pending: "refund_pending";
                        refunded: "refunded";
                        paid: "paid";
                        cancelled: "cancelled";
                    }>;
                    payment_attempt_id: z.ZodString;
                    work_state: z.ZodEnum<{
                        failed: "failed";
                        blocked: "blocked";
                        cancelled: "cancelled";
                        queued: "queued";
                        in_review: "in_review";
                        fulfilled: "fulfilled";
                    }>;
                    paid_at: z.ZodNullable<z.ZodISODateTime>;
                    sla_due_at: z.ZodNullable<z.ZodISODateTime>;
                    refund_reason: z.ZodNullable<z.ZodEnum<{
                        scope_superseded: "scope_superseded";
                        service_level_missed: "service_level_missed";
                        sourcey_error: "sourcey_error";
                        duplicate_charge: "duplicate_charge";
                    }>>;
                    refund_requested_at: z.ZodNullable<z.ZodISODateTime>;
                    refunded_at: z.ZodNullable<z.ZodISODateTime>;
                    fulfilment_receipt_digest: z.ZodNullable<z.ZodString>;
                    failure_receipt_digest: z.ZodNullable<z.ZodString>;
                    created_at: z.ZodISODateTime;
                    updated_at: z.ZodISODateTime;
                }, z.core.$strict>;
                payment_attempt: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    attempt_contract: z.ZodLiteral<"sourcey.payment-attempt/v1alpha1">;
                    attempt_id: z.ZodString;
                    order_id: z.ZodString;
                    request_binding_digest: z.ZodString;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                    state: z.ZodEnum<{
                        verified: "verified";
                        failed: "failed";
                        prepared: "prepared";
                        payment_pending: "payment_pending";
                        settlement_pending: "settlement_pending";
                        settled: "settled";
                        expired: "expired";
                        refund_pending: "refund_pending";
                        refunded: "refunded";
                    }>;
                    expires_at: z.ZodISODateTime;
                    created_at: z.ZodISODateTime;
                    updated_at: z.ZodISODateTime;
                    rail: z.ZodLiteral<"stripe">;
                    checkout_session_id: z.ZodNullable<z.ZodString>;
                    checkout_url: z.ZodNullable<z.ZodURL>;
                    payment_intent_id: z.ZodNullable<z.ZodString>;
                    refund_id: z.ZodNullable<z.ZodString>;
                }, z.core.$strict>, z.ZodObject<{
                    attempt_contract: z.ZodLiteral<"sourcey.payment-attempt/v1alpha1">;
                    attempt_id: z.ZodString;
                    order_id: z.ZodString;
                    request_binding_digest: z.ZodString;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                    state: z.ZodEnum<{
                        verified: "verified";
                        failed: "failed";
                        prepared: "prepared";
                        payment_pending: "payment_pending";
                        settlement_pending: "settlement_pending";
                        settled: "settled";
                        expired: "expired";
                        refund_pending: "refund_pending";
                        refunded: "refunded";
                    }>;
                    expires_at: z.ZodISODateTime;
                    created_at: z.ZodISODateTime;
                    updated_at: z.ZodISODateTime;
                    rail: z.ZodLiteral<"x402">;
                    resource: z.ZodURL;
                    challenge_digest: z.ZodString;
                    payment_payload_digest: z.ZodString;
                    payment_requirements_digest: z.ZodString;
                    payment_ref: z.ZodNullable<z.ZodString>;
                    verification_ref: z.ZodNullable<z.ZodString>;
                    settlement_ref: z.ZodNullable<z.ZodString>;
                    payer_ref: z.ZodNullable<z.ZodString>;
                    refund_ref: z.ZodNullable<z.ZodString>;
                }, z.core.$strict>], "rail">;
            }, z.core.$strict>;
            status_url: z.ZodURL;
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
        minor_units: 2500;
    };
    service_policy_url: string;
    refund_policy_url: string;
    input_example: {
        request_id: string;
        draft: {
            standing_result: {
                result_contract: "sourcey.standing-result/v1alpha1";
                policy_digest: string;
                evidence_digest: string;
                registrable_domain: string;
                official_source_url: string;
                route: "correction_required" | "repair_required" | "temporarily_unavailable" | "free_machine_review" | "claim_or_fund";
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
            program?: {
                title: string;
                summary: string;
            } | undefined;
        };
    };
    output_example: {
        data: {
            request_id: string;
            submission_id: string;
            order: {
                order: {
                    order_contract: "sourcey.commercial-order/v1alpha1";
                    order_id: string;
                    actor_ref: string;
                    product_code: string;
                    purchase_kind: "one_off";
                    product_definition_digest: string;
                    funded_work_intent_id: string;
                    funded_work_intent_digest: string;
                    owner_work_ref: string;
                    amount: {
                        currency: string;
                        minor_units: number;
                    };
                    payment_state: "payment_pending" | "refund_pending" | "refunded" | "paid" | "cancelled";
                    payment_attempt_id: string;
                    work_state: "failed" | "blocked" | "cancelled" | "queued" | "in_review" | "fulfilled";
                    paid_at: string | null;
                    sla_due_at: string | null;
                    refund_reason: "scope_superseded" | "service_level_missed" | "sourcey_error" | "duplicate_charge" | null;
                    refund_requested_at: string | null;
                    refunded_at: string | null;
                    fulfilment_receipt_digest: string | null;
                    failure_receipt_digest: string | null;
                    created_at: string;
                    updated_at: string;
                };
                payment_attempt: {
                    attempt_contract: "sourcey.payment-attempt/v1alpha1";
                    attempt_id: string;
                    order_id: string;
                    request_binding_digest: string;
                    amount: {
                        currency: string;
                        minor_units: number;
                    };
                    state: "verified" | "failed" | "prepared" | "payment_pending" | "settlement_pending" | "settled" | "expired" | "refund_pending" | "refunded";
                    expires_at: string;
                    created_at: string;
                    updated_at: string;
                    rail: "stripe";
                    checkout_session_id: string | null;
                    checkout_url: string | null;
                    payment_intent_id: string | null;
                    refund_id: string | null;
                } | {
                    attempt_contract: "sourcey.payment-attempt/v1alpha1";
                    attempt_id: string;
                    order_id: string;
                    request_binding_digest: string;
                    amount: {
                        currency: string;
                        minor_units: number;
                    };
                    state: "verified" | "failed" | "prepared" | "payment_pending" | "settlement_pending" | "settled" | "expired" | "refund_pending" | "refunded";
                    expires_at: string;
                    created_at: string;
                    updated_at: string;
                    rail: "x402";
                    resource: string;
                    challenge_digest: string;
                    payment_payload_digest: string;
                    payment_requirements_digest: string;
                    payment_ref: string | null;
                    verification_ref: string | null;
                    settlement_ref: string | null;
                    payer_ref: string | null;
                    refund_ref: string | null;
                };
            };
            status_url: string;
        };
    };
};
export type StandingPolicy = z.infer<typeof standingPolicySchema>;
export type StandingEvidence = z.infer<typeof standingEvidenceSchema>;
export type StandingResult = z.infer<typeof standingResultSchema>;
export type StartupCreditsDraftRequest = z.infer<typeof startupCreditsDraftRequestSchema>;
export type StartupCreditsDraftResult = z.infer<typeof startupCreditsDraftResultSchema>;
export type StartupCreditsFundedWorkIntent = z.infer<typeof startupCreditsFundedWorkIntentSchema>;
export type StartupCreditsPurchasePreview = z.infer<typeof startupCreditsPurchasePreviewSchema>;
export type StartupCreditsServicePolicy = z.infer<typeof startupCreditsServicePolicySchema>;
export type StartupCreditsReviewRequest = z.infer<typeof startupCreditsReviewRequestSchema>;
export type StartupCreditsReviewResponse = z.infer<typeof startupCreditsReviewResponseSchema>;
export type PayableProductDescriptor = z.infer<typeof payableProductDescriptorSchema>;
export declare function isFirstPartyUrlForDomain(value: string, domain: string): boolean;
//# sourceMappingURL=index.d.ts.map