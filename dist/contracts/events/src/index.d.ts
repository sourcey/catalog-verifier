import { z } from "zod";
declare const authorityClaimMethodSchema: z.ZodString;
export declare const entityEventSubjectSchema: z.ZodObject<{
    subject_type: z.ZodLiteral<"entity">;
    entity_id: z.ZodString;
    revision_digest: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const offerEventSubjectSchema: z.ZodObject<{
    subject_type: z.ZodLiteral<"offer">;
    entity_id: z.ZodString;
    program_id: z.ZodOptional<z.ZodString>;
    offer_id: z.ZodString;
    revision_digest: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const eventSubjectSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    subject_type: z.ZodLiteral<"entity">;
    entity_id: z.ZodString;
    revision_digest: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    subject_type: z.ZodLiteral<"agent_readiness_profile">;
    entity_id: z.ZodString;
    agent_readiness_profile_id: z.ZodString;
    revision_digest: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    subject_type: z.ZodLiteral<"program">;
    entity_id: z.ZodString;
    program_id: z.ZodString;
    revision_digest: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    subject_type: z.ZodLiteral<"offer">;
    entity_id: z.ZodString;
    program_id: z.ZodOptional<z.ZodString>;
    offer_id: z.ZodString;
    revision_digest: z.ZodOptional<z.ZodString>;
}, z.core.$strict>], "subject_type">;
export declare const catalogEventPayloadSchemas: {
    readonly "evidence.bound": z.ZodObject<{
        observation_id: z.ZodString;
        capture_attestation_digest: z.ZodOptional<z.ZodString>;
        review_decision: z.ZodOptional<z.ZodObject<{
            review_decision_contract: z.ZodLiteral<"sourcey.evidence-review-decision/v1alpha1">;
            review_proposal_digest: z.ZodString;
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
            decision: z.ZodEnum<{
                approved: "approved";
                rejected: "rejected";
            }>;
            decided_at: z.ZodISODateTime;
            rationale: z.ZodNullable<z.ZodString>;
            decision_digest: z.ZodString;
        }, z.core.$strict>>;
        capture_receipt_digest: z.ZodOptional<z.ZodString>;
        normalized_object_digest: z.ZodString;
        authority_entity_revision_digest: z.ZodString;
        authority_program_revision_digest: z.ZodNullable<z.ZodString>;
        assertions: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            polarity: z.ZodEnum<{
                contradicts: "contradicts";
                supports: "supports";
            }>;
            proof_kind: z.ZodEnum<{
                attested: "attested";
                derived: "derived";
                editorial: "editorial";
                observed: "observed";
            }>;
            derivation_rule: z.ZodNullable<z.ZodEnum<{
                "consideration-from-benefits": "consideration-from-benefits";
                "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
                "eligibility-composition-from-criteria": "eligibility-composition-from-criteria";
                "first-party-access-operator": "first-party-access-operator";
                "form-access-from-first-party-application": "form-access-from-first-party-application";
                "public-availability-from-application": "public-availability-from-application";
            }>>;
            locators: z.ZodArray<z.ZodObject<{
                kind: z.ZodLiteral<"utf8-range">;
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        paths: z.ZodArray<z.ZodString>;
        polarity: z.ZodEnum<{
            contradicts: "contradicts";
            supports: "supports";
        }>;
        binding_method: z.ZodString;
        binding_version: z.ZodString;
    }, z.core.$strict>;
    readonly "evidence.retracted": z.ZodObject<{
        target_event_id: z.ZodString;
        reason_code: z.ZodString;
        adjudication_evidence_digest: z.ZodString;
        replacement_event_id: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    readonly "discrepancy.resolved": z.ZodObject<{
        conflicting_event_ids: z.ZodArray<z.ZodString>;
        outcome: z.ZodEnum<{
            "both-invalid": "both-invalid";
            "contradiction-prevails": "contradiction-prevails";
            "new-revision-required": "new-revision-required";
            "support-prevails": "support-prevails";
        }>;
        active_event_ids: z.ZodArray<z.ZodString>;
        replacement_revision_digest: z.ZodOptional<z.ZodString>;
        evidence_digests: z.ZodArray<z.ZodString>;
    }, z.core.$strict>;
    readonly "authority.claimed": z.ZodObject<{
        authority_claim_id: z.ZodString;
        authorized_issuer_id: z.ZodString;
        controlled_domain: z.ZodString;
        method: z.ZodString;
        proof_digest: z.ZodString;
        proven_at: z.ZodISODateTime;
        recheck_due_at: z.ZodISODateTime;
    }, z.core.$strict>;
    readonly "authority.rechecked": z.ZodObject<{
        authority_claim_id: z.ZodString;
        checked_at: z.ZodISODateTime;
        next_recheck_due_at: z.ZodISODateTime;
    }, z.core.$strict>;
    readonly "authority.revoked": z.ZodObject<{
        authority_claim_id: z.ZodString;
        revoked_at: z.ZodISODateTime;
        reason_code: z.ZodString;
    }, z.core.$strict>;
    readonly "authority.superseded": z.ZodObject<{
        old_authority_claim_id: z.ZodString;
        new_authority_claim_id: z.ZodString;
        superseded_at: z.ZodISODateTime;
    }, z.core.$strict>;
    readonly "subject.attested": z.ZodObject<{
        authority_claim_id: z.ZodString;
        attested_at: z.ZodISODateTime;
    }, z.core.$strict>;
    readonly "attestation.revoked": z.ZodObject<{
        target_event_id: z.ZodString;
        authority_claim_id: z.ZodString;
        revoked_at: z.ZodISODateTime;
        reason_code: z.ZodString;
    }, z.core.$strict>;
    /**
     * Retained solely because nine signed production events were admitted before
     * Entity identity and Offer terms assurance became independent contracts.
     * Release construction rejects this kind from every new input. It remains in
     * the read contract so the append-only ledger can expose and verify the exact
     * historical bytes without treating them as current assurance.
     */
    readonly "verification.completed": z.ZodObject<{
        verification_id: z.ZodString;
        verifier_id: z.ZodString;
        method_version: z.ZodString;
        scope: z.ZodLiteral<"whole-revision">;
        result: z.ZodLiteral<"pass">;
        checked_at: z.ZodISODateTime;
        verified_paths: z.ZodArray<z.ZodString>;
        coverage_policy_digest: z.ZodString;
        receipt_digest: z.ZodString;
    }, z.core.$strict>;
    readonly "entity.identity-checked": z.ZodObject<{
        assurance_id: z.ZodString;
        reviewer_id: z.ZodString;
        method_policy_digest: z.ZodString;
        receipt_digest: z.ZodString;
        checked_at: z.ZodISODateTime;
        identity_epoch_digest: z.ZodString;
        coverage_policy_digest: z.ZodString;
        coverage_paths: z.ZodArray<z.ZodString>;
    }, z.core.$strict>;
    readonly "offer.terms-checked": z.ZodObject<{
        assurance_id: z.ZodString;
        reviewer_id: z.ZodString;
        method_policy_digest: z.ZodString;
        receipt_digest: z.ZodString;
        checked_at: z.ZodISODateTime;
        coverage_policy_digest: z.ZodString;
        coverage_paths: z.ZodArray<z.ZodString>;
    }, z.core.$strict>;
    readonly "assurance.revoked": z.ZodDiscriminatedUnion<[z.ZodObject<{
        assurance_id: z.ZodString;
        reviewer_id: z.ZodString;
        receipt_digest: z.ZodString;
        revoked_at: z.ZodISODateTime;
        reason_code: z.ZodString;
        assurance_kind: z.ZodLiteral<"entity_identity">;
        identity_epoch_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        assurance_id: z.ZodString;
        reviewer_id: z.ZodString;
        receipt_digest: z.ZodString;
        revoked_at: z.ZodISODateTime;
        reason_code: z.ZodString;
        assurance_kind: z.ZodLiteral<"offer_terms">;
        revision_digest: z.ZodString;
    }, z.core.$strict>], "assurance_kind">;
    readonly "freshness.exception-granted": z.ZodObject<{
        paths: z.ZodArray<z.ZodString>;
        valid_until: z.ZodISODateTime;
        reason_code: z.ZodString;
        evidence_digest: z.ZodString;
    }, z.core.$strict>;
    readonly "freshness.exception-revoked": z.ZodObject<{
        target_event_id: z.ZodString;
        revoked_at: z.ZodISODateTime;
        reason_code: z.ZodString;
    }, z.core.$strict>;
    readonly "dispute.opened": z.ZodObject<{
        dispute_id: z.ZodString;
        opened_at: z.ZodISODateTime;
        public_reason_code: z.ZodString;
        case_digest: z.ZodString;
    }, z.core.$strict>;
    readonly "dispute.resolved": z.ZodObject<{
        dispute_id: z.ZodString;
        opened_event_id: z.ZodString;
        resolved_at: z.ZodISODateTime;
        resolution_code: z.ZodString;
        case_digest: z.ZodString;
    }, z.core.$strict>;
    readonly "asset.bound": z.ZodObject<{
        role: z.ZodEnum<{
            icon: "icon";
            "logo-dark": "logo-dark";
            "logo-light": "logo-light";
        }>;
        asset_object_digest: z.ZodString;
        served_derivative_digest: z.ZodString;
        authority_basis: z.ZodEnum<{
            "editorial-review": "editorial-review";
            "licensed-source": "licensed-source";
            "sourcey-owned": "sourcey-owned";
            "vendor-authority": "vendor-authority";
        }>;
        authority_claim_id: z.ZodOptional<z.ZodString>;
        approval_receipt_digest: z.ZodString;
        approval_scope: z.ZodString;
        source_basis: z.ZodString;
        license_basis: z.ZodString;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        superseded_binding_event_id: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    readonly "asset.withdrawn": z.ZodObject<{
        target_binding_event_id: z.ZodString;
        effective_at: z.ZodISODateTime;
        reason_code: z.ZodString;
    }, z.core.$strict>;
    readonly "asset.takedown-ordered": z.ZodObject<{
        target_binding_event_id: z.ZodString;
        effective_at: z.ZodISODateTime;
        public_reason_code: z.ZodString;
        case_digest: z.ZodString;
    }, z.core.$strict>;
    readonly "entity.merged": z.ZodObject<{
        surviving_entity_id: z.ZodString;
        retired_entity_ids: z.ZodArray<z.ZodString>;
        disposition: z.ZodObject<{
            aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                program_id: z.ZodString;
                disposition: z.ZodEnum<{
                    end: "end";
                    merge: "merge";
                    reparent: "reparent";
                }>;
                target_entity_id: z.ZodOptional<z.ZodString>;
                target_program_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>>;
            offers: z.ZodArray<z.ZodObject<{
                offer_id: z.ZodString;
                disposition: z.ZodEnum<{
                    end: "end";
                    merge: "merge";
                    reparent: "reparent";
                }>;
                target_entity_id: z.ZodOptional<z.ZodString>;
                target_offer_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>;
            agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                agent_readiness_profile_id: z.ZodString;
                disposition: z.ZodEnum<{
                    end: "end";
                    merge: "merge";
                    reparent: "reparent";
                }>;
                target_entity_id: z.ZodOptional<z.ZodString>;
                target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>>;
            asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                binding_event_id: z.ZodString;
                disposition: z.ZodEnum<{
                    end: "end";
                    rebind: "rebind";
                }>;
                replacement_binding_event_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>>;
        }, z.core.$strict>;
        effective_at: z.ZodISODateTime;
        reason: z.ZodString;
        evidence_digest: z.ZodString;
    }, z.core.$strict>;
    readonly "entity.split": z.ZodObject<{
        original_entity_id: z.ZodString;
        continuing_entity_id: z.ZodOptional<z.ZodString>;
        new_entity_ids: z.ZodArray<z.ZodString>;
        disposition: z.ZodObject<{
            aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                program_id: z.ZodString;
                disposition: z.ZodEnum<{
                    end: "end";
                    merge: "merge";
                    reparent: "reparent";
                }>;
                target_entity_id: z.ZodOptional<z.ZodString>;
                target_program_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>>;
            offers: z.ZodArray<z.ZodObject<{
                offer_id: z.ZodString;
                disposition: z.ZodEnum<{
                    end: "end";
                    merge: "merge";
                    reparent: "reparent";
                }>;
                target_entity_id: z.ZodOptional<z.ZodString>;
                target_offer_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>;
            agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                agent_readiness_profile_id: z.ZodString;
                disposition: z.ZodEnum<{
                    end: "end";
                    merge: "merge";
                    reparent: "reparent";
                }>;
                target_entity_id: z.ZodOptional<z.ZodString>;
                target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>>;
            asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                binding_event_id: z.ZodString;
                disposition: z.ZodEnum<{
                    end: "end";
                    rebind: "rebind";
                }>;
                replacement_binding_event_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>>;
        }, z.core.$strict>;
        effective_at: z.ZodISODateTime;
        reason: z.ZodString;
        evidence_digest: z.ZodString;
    }, z.core.$strict>;
    readonly "entity.succeeded": z.ZodObject<{
        predecessor_entity_id: z.ZodString;
        successor_entity_id: z.ZodString;
        relationship_code: z.ZodString;
        predecessor_retires: z.ZodBoolean;
        disposition: z.ZodOptional<z.ZodObject<{
            aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            programs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                program_id: z.ZodString;
                disposition: z.ZodEnum<{
                    end: "end";
                    merge: "merge";
                    reparent: "reparent";
                }>;
                target_entity_id: z.ZodOptional<z.ZodString>;
                target_program_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>>;
            offers: z.ZodArray<z.ZodObject<{
                offer_id: z.ZodString;
                disposition: z.ZodEnum<{
                    end: "end";
                    merge: "merge";
                    reparent: "reparent";
                }>;
                target_entity_id: z.ZodOptional<z.ZodString>;
                target_offer_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>;
            agent_readiness_profiles: z.ZodDefault<z.ZodArray<z.ZodObject<{
                agent_readiness_profile_id: z.ZodString;
                disposition: z.ZodEnum<{
                    end: "end";
                    merge: "merge";
                    reparent: "reparent";
                }>;
                target_entity_id: z.ZodOptional<z.ZodString>;
                target_agent_readiness_profile_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>>;
            asset_bindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                binding_event_id: z.ZodString;
                disposition: z.ZodEnum<{
                    end: "end";
                    rebind: "rebind";
                }>;
                replacement_binding_event_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>>;
        }, z.core.$strict>>;
        effective_at: z.ZodISODateTime;
        evidence_digest: z.ZodString;
    }, z.core.$strict>;
    readonly "offer.merged": z.ZodObject<{
        surviving_offer_id: z.ZodString;
        retired_offer_ids: z.ZodArray<z.ZodString>;
        entity_id: z.ZodString;
        effective_at: z.ZodISODateTime;
        reason: z.ZodString;
    }, z.core.$strict>;
    readonly "program.merged": z.ZodObject<{
        surviving_program_id: z.ZodString;
        retired_program_ids: z.ZodArray<z.ZodString>;
        entity_id: z.ZodString;
        effective_at: z.ZodISODateTime;
        reason: z.ZodString;
    }, z.core.$strict>;
    readonly "program.reparented": z.ZodObject<{
        program_id: z.ZodString;
        old_entity_id: z.ZodString;
        new_entity_id: z.ZodString;
        valid_from: z.ZodISODateTime;
        valid_until: z.ZodOptional<z.ZodISODateTime>;
        continuity_evidence_digest: z.ZodString;
    }, z.core.$strict>;
    readonly "offer.reparented": z.ZodObject<{
        offer_id: z.ZodString;
        old_entity_id: z.ZodString;
        new_entity_id: z.ZodString;
        valid_from: z.ZodISODateTime;
        valid_until: z.ZodOptional<z.ZodISODateTime>;
        continuity_evidence_digest: z.ZodString;
    }, z.core.$strict>;
    readonly "agent-readiness-profile.merged": z.ZodObject<{
        surviving_agent_readiness_profile_id: z.ZodString;
        retired_agent_readiness_profile_ids: z.ZodArray<z.ZodString>;
        entity_id: z.ZodString;
        effective_at: z.ZodISODateTime;
        continuity_evidence_digest: z.ZodString;
        reason: z.ZodString;
    }, z.core.$strict>;
    readonly "agent-readiness-profile.reparented": z.ZodObject<{
        agent_readiness_profile_id: z.ZodString;
        old_entity_id: z.ZodString;
        new_entity_id: z.ZodString;
        valid_from: z.ZodISODateTime;
        valid_until: z.ZodOptional<z.ZodISODateTime>;
        continuity_evidence_digest: z.ZodString;
    }, z.core.$strict>;
    /**
     * The automatic lane admitted one revision: the engine derived its ratings
     * from exactly this input's run records under this policy.
     */
    readonly "agent-readiness-profile.admitted": z.ZodObject<{
        input_digest: z.ZodString;
        relation_input_digests: z.ZodArray<z.ZodString>;
        policy_digest: z.ZodString;
        engine_digest: z.ZodString;
    }, z.core.$strict>;
    readonly "agent-readiness-profile.retired": z.ZodObject<{
        agent_readiness_profile_id: z.ZodString;
        entity_id: z.ZodString;
        effective_at: z.ZodISODateTime;
        reason_code: z.ZodString;
    }, z.core.$strict>;
    readonly "identity.transition-superseded": z.ZodObject<{
        target_event_id: z.ZodString;
        replacement_event_ids: z.ZodArray<z.ZodString>;
        corrected_at: z.ZodISODateTime;
        reason: z.ZodString;
        evidence_digest: z.ZodString;
    }, z.core.$strict>;
    readonly "offer.retired": z.ZodObject<{
        offer_id: z.ZodString;
        entity_id: z.ZodString;
        effective_at: z.ZodISODateTime;
        reason_code: z.ZodString;
    }, z.core.$strict>;
    readonly "program.retired": z.ZodObject<{
        program_id: z.ZodString;
        entity_id: z.ZodString;
        effective_at: z.ZodISODateTime;
        reason_code: z.ZodString;
    }, z.core.$strict>;
};
declare const catalogEventKindSchema: z.ZodEnum<{
    "agent-readiness-profile.admitted": "agent-readiness-profile.admitted";
    "agent-readiness-profile.merged": "agent-readiness-profile.merged";
    "agent-readiness-profile.reparented": "agent-readiness-profile.reparented";
    "agent-readiness-profile.retired": "agent-readiness-profile.retired";
    "asset.bound": "asset.bound";
    "asset.takedown-ordered": "asset.takedown-ordered";
    "asset.withdrawn": "asset.withdrawn";
    "assurance.revoked": "assurance.revoked";
    "attestation.revoked": "attestation.revoked";
    "authority.claimed": "authority.claimed";
    "authority.rechecked": "authority.rechecked";
    "authority.revoked": "authority.revoked";
    "authority.superseded": "authority.superseded";
    "discrepancy.resolved": "discrepancy.resolved";
    "dispute.opened": "dispute.opened";
    "dispute.resolved": "dispute.resolved";
    "entity.identity-checked": "entity.identity-checked";
    "entity.merged": "entity.merged";
    "entity.split": "entity.split";
    "entity.succeeded": "entity.succeeded";
    "evidence.bound": "evidence.bound";
    "evidence.retracted": "evidence.retracted";
    "freshness.exception-granted": "freshness.exception-granted";
    "freshness.exception-revoked": "freshness.exception-revoked";
    "identity.transition-superseded": "identity.transition-superseded";
    "offer.merged": "offer.merged";
    "offer.reparented": "offer.reparented";
    "offer.retired": "offer.retired";
    "offer.terms-checked": "offer.terms-checked";
    "program.merged": "program.merged";
    "program.reparented": "program.reparented";
    "program.retired": "program.retired";
    "subject.attested": "subject.attested";
    "verification.completed": "verification.completed";
}>;
export declare const catalogEventCoreSchema: z.ZodObject<{
    event_contract: z.ZodLiteral<"sourcey.catalog-event/v1alpha1">;
    kind: z.ZodEnum<{
        "agent-readiness-profile.admitted": "agent-readiness-profile.admitted";
        "agent-readiness-profile.merged": "agent-readiness-profile.merged";
        "agent-readiness-profile.reparented": "agent-readiness-profile.reparented";
        "agent-readiness-profile.retired": "agent-readiness-profile.retired";
        "asset.bound": "asset.bound";
        "asset.takedown-ordered": "asset.takedown-ordered";
        "asset.withdrawn": "asset.withdrawn";
        "assurance.revoked": "assurance.revoked";
        "attestation.revoked": "attestation.revoked";
        "authority.claimed": "authority.claimed";
        "authority.rechecked": "authority.rechecked";
        "authority.revoked": "authority.revoked";
        "authority.superseded": "authority.superseded";
        "discrepancy.resolved": "discrepancy.resolved";
        "dispute.opened": "dispute.opened";
        "dispute.resolved": "dispute.resolved";
        "entity.identity-checked": "entity.identity-checked";
        "entity.merged": "entity.merged";
        "entity.split": "entity.split";
        "entity.succeeded": "entity.succeeded";
        "evidence.bound": "evidence.bound";
        "evidence.retracted": "evidence.retracted";
        "freshness.exception-granted": "freshness.exception-granted";
        "freshness.exception-revoked": "freshness.exception-revoked";
        "identity.transition-superseded": "identity.transition-superseded";
        "offer.merged": "offer.merged";
        "offer.reparented": "offer.reparented";
        "offer.retired": "offer.retired";
        "offer.terms-checked": "offer.terms-checked";
        "program.merged": "program.merged";
        "program.reparented": "program.reparented";
        "program.retired": "program.retired";
        "subject.attested": "subject.attested";
        "verification.completed": "verification.completed";
    }>;
    issuer_id: z.ZodString;
    operation_id: z.ZodString;
    subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
        subject_type: z.ZodLiteral<"entity">;
        entity_id: z.ZodString;
        revision_digest: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        subject_type: z.ZodLiteral<"agent_readiness_profile">;
        entity_id: z.ZodString;
        agent_readiness_profile_id: z.ZodString;
        revision_digest: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        subject_type: z.ZodLiteral<"program">;
        entity_id: z.ZodString;
        program_id: z.ZodString;
        revision_digest: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        subject_type: z.ZodLiteral<"offer">;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
        revision_digest: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>], "subject_type">;
    occurred_at: z.ZodISODateTime;
    payload: z.ZodUnknown;
}, z.core.$strict>;
export declare const catalogEventIntentSchema: z.ZodObject<{
    event_id: z.ZodString;
    core: z.ZodObject<{
        event_contract: z.ZodLiteral<"sourcey.catalog-event/v1alpha1">;
        kind: z.ZodEnum<{
            "agent-readiness-profile.admitted": "agent-readiness-profile.admitted";
            "agent-readiness-profile.merged": "agent-readiness-profile.merged";
            "agent-readiness-profile.reparented": "agent-readiness-profile.reparented";
            "agent-readiness-profile.retired": "agent-readiness-profile.retired";
            "asset.bound": "asset.bound";
            "asset.takedown-ordered": "asset.takedown-ordered";
            "asset.withdrawn": "asset.withdrawn";
            "assurance.revoked": "assurance.revoked";
            "attestation.revoked": "attestation.revoked";
            "authority.claimed": "authority.claimed";
            "authority.rechecked": "authority.rechecked";
            "authority.revoked": "authority.revoked";
            "authority.superseded": "authority.superseded";
            "discrepancy.resolved": "discrepancy.resolved";
            "dispute.opened": "dispute.opened";
            "dispute.resolved": "dispute.resolved";
            "entity.identity-checked": "entity.identity-checked";
            "entity.merged": "entity.merged";
            "entity.split": "entity.split";
            "entity.succeeded": "entity.succeeded";
            "evidence.bound": "evidence.bound";
            "evidence.retracted": "evidence.retracted";
            "freshness.exception-granted": "freshness.exception-granted";
            "freshness.exception-revoked": "freshness.exception-revoked";
            "identity.transition-superseded": "identity.transition-superseded";
            "offer.merged": "offer.merged";
            "offer.reparented": "offer.reparented";
            "offer.retired": "offer.retired";
            "offer.terms-checked": "offer.terms-checked";
            "program.merged": "program.merged";
            "program.reparented": "program.reparented";
            "program.retired": "program.retired";
            "subject.attested": "subject.attested";
            "verification.completed": "verification.completed";
        }>;
        issuer_id: z.ZodString;
        operation_id: z.ZodString;
        subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
            subject_type: z.ZodLiteral<"entity">;
            entity_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"agent_readiness_profile">;
            entity_id: z.ZodString;
            agent_readiness_profile_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"program">;
            entity_id: z.ZodString;
            program_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"offer">;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>], "subject_type">;
        occurred_at: z.ZodISODateTime;
        payload: z.ZodUnknown;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const catalogEventSchema: z.ZodObject<{
    event_contract: z.ZodLiteral<"sourcey.catalog-event/v1alpha1">;
    kind: z.ZodEnum<{
        "agent-readiness-profile.admitted": "agent-readiness-profile.admitted";
        "agent-readiness-profile.merged": "agent-readiness-profile.merged";
        "agent-readiness-profile.reparented": "agent-readiness-profile.reparented";
        "agent-readiness-profile.retired": "agent-readiness-profile.retired";
        "asset.bound": "asset.bound";
        "asset.takedown-ordered": "asset.takedown-ordered";
        "asset.withdrawn": "asset.withdrawn";
        "assurance.revoked": "assurance.revoked";
        "attestation.revoked": "attestation.revoked";
        "authority.claimed": "authority.claimed";
        "authority.rechecked": "authority.rechecked";
        "authority.revoked": "authority.revoked";
        "authority.superseded": "authority.superseded";
        "discrepancy.resolved": "discrepancy.resolved";
        "dispute.opened": "dispute.opened";
        "dispute.resolved": "dispute.resolved";
        "entity.identity-checked": "entity.identity-checked";
        "entity.merged": "entity.merged";
        "entity.split": "entity.split";
        "entity.succeeded": "entity.succeeded";
        "evidence.bound": "evidence.bound";
        "evidence.retracted": "evidence.retracted";
        "freshness.exception-granted": "freshness.exception-granted";
        "freshness.exception-revoked": "freshness.exception-revoked";
        "identity.transition-superseded": "identity.transition-superseded";
        "offer.merged": "offer.merged";
        "offer.reparented": "offer.reparented";
        "offer.retired": "offer.retired";
        "offer.terms-checked": "offer.terms-checked";
        "program.merged": "program.merged";
        "program.reparented": "program.reparented";
        "program.retired": "program.retired";
        "subject.attested": "subject.attested";
        "verification.completed": "verification.completed";
    }>;
    issuer_id: z.ZodString;
    operation_id: z.ZodString;
    subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
        subject_type: z.ZodLiteral<"entity">;
        entity_id: z.ZodString;
        revision_digest: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        subject_type: z.ZodLiteral<"agent_readiness_profile">;
        entity_id: z.ZodString;
        agent_readiness_profile_id: z.ZodString;
        revision_digest: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        subject_type: z.ZodLiteral<"program">;
        entity_id: z.ZodString;
        program_id: z.ZodString;
        revision_digest: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        subject_type: z.ZodLiteral<"offer">;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
        revision_digest: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>], "subject_type">;
    occurred_at: z.ZodISODateTime;
    payload: z.ZodUnknown;
    event_id: z.ZodString;
    protected: z.ZodObject<{
        signature_purpose: z.ZodEnum<{
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
        signer_registry_digest: z.ZodString;
        key_id: z.ZodString;
        algorithm: z.ZodLiteral<"ed25519">;
        signature: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export type CatalogEventKind = z.infer<typeof catalogEventKindSchema>;
export type AuthorityClaimMethod = z.infer<typeof authorityClaimMethodSchema>;
export type CatalogEventCore = z.infer<typeof catalogEventCoreSchema>;
export type CatalogEvent = z.infer<typeof catalogEventSchema>;
export type CatalogEventIntent = z.infer<typeof catalogEventIntentSchema>;
export {};
//# sourceMappingURL=index.d.ts.map