import { z } from "zod";
export declare const authorityClaimMethodKnownValues: readonly ["dns-txt", "domain-email", "well-known", "inbound-dkim"];
export declare const authorityClaimMethodSchema: z.ZodString;
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
        capture_receipt_digest: z.ZodOptional<z.ZodString>;
        normalized_object_digest: z.ZodString;
        authority_entity_revision_digest: z.ZodString;
        authority_program_revision_digest: z.ZodNullable<z.ZodString>;
        assertions: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            polarity: z.ZodEnum<{
                supports: "supports";
                contradicts: "contradicts";
            }>;
            proof_kind: z.ZodEnum<{
                observed: "observed";
                derived: "derived";
                editorial: "editorial";
                attested: "attested";
            }>;
            derivation_rule: z.ZodNullable<z.ZodEnum<{
                "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
                "form-access-from-first-party-application": "form-access-from-first-party-application";
                "first-party-access-operator": "first-party-access-operator";
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
            supports: "supports";
            contradicts: "contradicts";
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
            "support-prevails": "support-prevails";
            "contradiction-prevails": "contradiction-prevails";
            "both-invalid": "both-invalid";
            "new-revision-required": "new-revision-required";
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
        identity_epoch_digest: z.ZodString;
        coverage_policy_digest: z.ZodString;
        coverage_paths: z.ZodArray<z.ZodString>;
        assurance_id: z.ZodString;
        reviewer_id: z.ZodString;
        method_policy_digest: z.ZodString;
        receipt_digest: z.ZodString;
        checked_at: z.ZodISODateTime;
    }, z.core.$strict>;
    readonly "offer.terms-checked": z.ZodObject<{
        coverage_policy_digest: z.ZodString;
        coverage_paths: z.ZodArray<z.ZodString>;
        assurance_id: z.ZodString;
        reviewer_id: z.ZodString;
        method_policy_digest: z.ZodString;
        receipt_digest: z.ZodString;
        checked_at: z.ZodISODateTime;
    }, z.core.$strict>;
    readonly "assurance.revoked": z.ZodDiscriminatedUnion<[z.ZodObject<{
        assurance_kind: z.ZodLiteral<"entity_identity">;
        identity_epoch_digest: z.ZodString;
        assurance_id: z.ZodString;
        reviewer_id: z.ZodString;
        receipt_digest: z.ZodString;
        revoked_at: z.ZodISODateTime;
        reason_code: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        assurance_kind: z.ZodLiteral<"offer_terms">;
        revision_digest: z.ZodString;
        assurance_id: z.ZodString;
        reviewer_id: z.ZodString;
        receipt_digest: z.ZodString;
        revoked_at: z.ZodISODateTime;
        reason_code: z.ZodString;
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
            "logo-light": "logo-light";
            "logo-dark": "logo-dark";
            icon: "icon";
        }>;
        asset_object_digest: z.ZodString;
        served_derivative_digest: z.ZodString;
        authority_basis: z.ZodEnum<{
            "sourcey-owned": "sourcey-owned";
            "vendor-authority": "vendor-authority";
            "editorial-review": "editorial-review";
            "licensed-source": "licensed-source";
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
                    rebind: "rebind";
                    end: "end";
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
                    rebind: "rebind";
                    end: "end";
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
                    rebind: "rebind";
                    end: "end";
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
export declare const catalogEventKindSchema: z.ZodEnum<{
    "program.retired": "program.retired";
    "offer.retired": "offer.retired";
    "asset.bound": "asset.bound";
    "asset.withdrawn": "asset.withdrawn";
    "evidence.bound": "evidence.bound";
    "evidence.retracted": "evidence.retracted";
    "discrepancy.resolved": "discrepancy.resolved";
    "authority.claimed": "authority.claimed";
    "authority.rechecked": "authority.rechecked";
    "authority.revoked": "authority.revoked";
    "authority.superseded": "authority.superseded";
    "subject.attested": "subject.attested";
    "attestation.revoked": "attestation.revoked";
    "verification.completed": "verification.completed";
    "entity.identity-checked": "entity.identity-checked";
    "offer.terms-checked": "offer.terms-checked";
    "assurance.revoked": "assurance.revoked";
    "freshness.exception-granted": "freshness.exception-granted";
    "freshness.exception-revoked": "freshness.exception-revoked";
    "dispute.opened": "dispute.opened";
    "dispute.resolved": "dispute.resolved";
    "asset.takedown-ordered": "asset.takedown-ordered";
    "entity.merged": "entity.merged";
    "entity.split": "entity.split";
    "entity.succeeded": "entity.succeeded";
    "offer.merged": "offer.merged";
    "program.merged": "program.merged";
    "program.reparented": "program.reparented";
    "offer.reparented": "offer.reparented";
    "agent-readiness-profile.merged": "agent-readiness-profile.merged";
    "agent-readiness-profile.reparented": "agent-readiness-profile.reparented";
    "agent-readiness-profile.retired": "agent-readiness-profile.retired";
    "identity.transition-superseded": "identity.transition-superseded";
}>;
export declare const catalogEventCoreSchema: z.ZodObject<{
    event_contract: z.ZodLiteral<"sourcey.catalog-event/v1alpha1">;
    kind: z.ZodEnum<{
        "program.retired": "program.retired";
        "offer.retired": "offer.retired";
        "asset.bound": "asset.bound";
        "asset.withdrawn": "asset.withdrawn";
        "evidence.bound": "evidence.bound";
        "evidence.retracted": "evidence.retracted";
        "discrepancy.resolved": "discrepancy.resolved";
        "authority.claimed": "authority.claimed";
        "authority.rechecked": "authority.rechecked";
        "authority.revoked": "authority.revoked";
        "authority.superseded": "authority.superseded";
        "subject.attested": "subject.attested";
        "attestation.revoked": "attestation.revoked";
        "verification.completed": "verification.completed";
        "entity.identity-checked": "entity.identity-checked";
        "offer.terms-checked": "offer.terms-checked";
        "assurance.revoked": "assurance.revoked";
        "freshness.exception-granted": "freshness.exception-granted";
        "freshness.exception-revoked": "freshness.exception-revoked";
        "dispute.opened": "dispute.opened";
        "dispute.resolved": "dispute.resolved";
        "asset.takedown-ordered": "asset.takedown-ordered";
        "entity.merged": "entity.merged";
        "entity.split": "entity.split";
        "entity.succeeded": "entity.succeeded";
        "offer.merged": "offer.merged";
        "program.merged": "program.merged";
        "program.reparented": "program.reparented";
        "offer.reparented": "offer.reparented";
        "agent-readiness-profile.merged": "agent-readiness-profile.merged";
        "agent-readiness-profile.reparented": "agent-readiness-profile.reparented";
        "agent-readiness-profile.retired": "agent-readiness-profile.retired";
        "identity.transition-superseded": "identity.transition-superseded";
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
            "program.retired": "program.retired";
            "offer.retired": "offer.retired";
            "asset.bound": "asset.bound";
            "asset.withdrawn": "asset.withdrawn";
            "evidence.bound": "evidence.bound";
            "evidence.retracted": "evidence.retracted";
            "discrepancy.resolved": "discrepancy.resolved";
            "authority.claimed": "authority.claimed";
            "authority.rechecked": "authority.rechecked";
            "authority.revoked": "authority.revoked";
            "authority.superseded": "authority.superseded";
            "subject.attested": "subject.attested";
            "attestation.revoked": "attestation.revoked";
            "verification.completed": "verification.completed";
            "entity.identity-checked": "entity.identity-checked";
            "offer.terms-checked": "offer.terms-checked";
            "assurance.revoked": "assurance.revoked";
            "freshness.exception-granted": "freshness.exception-granted";
            "freshness.exception-revoked": "freshness.exception-revoked";
            "dispute.opened": "dispute.opened";
            "dispute.resolved": "dispute.resolved";
            "asset.takedown-ordered": "asset.takedown-ordered";
            "entity.merged": "entity.merged";
            "entity.split": "entity.split";
            "entity.succeeded": "entity.succeeded";
            "offer.merged": "offer.merged";
            "program.merged": "program.merged";
            "program.reparented": "program.reparented";
            "offer.reparented": "offer.reparented";
            "agent-readiness-profile.merged": "agent-readiness-profile.merged";
            "agent-readiness-profile.reparented": "agent-readiness-profile.reparented";
            "agent-readiness-profile.retired": "agent-readiness-profile.retired";
            "identity.transition-superseded": "identity.transition-superseded";
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
        "program.retired": "program.retired";
        "offer.retired": "offer.retired";
        "asset.bound": "asset.bound";
        "asset.withdrawn": "asset.withdrawn";
        "evidence.bound": "evidence.bound";
        "evidence.retracted": "evidence.retracted";
        "discrepancy.resolved": "discrepancy.resolved";
        "authority.claimed": "authority.claimed";
        "authority.rechecked": "authority.rechecked";
        "authority.revoked": "authority.revoked";
        "authority.superseded": "authority.superseded";
        "subject.attested": "subject.attested";
        "attestation.revoked": "attestation.revoked";
        "verification.completed": "verification.completed";
        "entity.identity-checked": "entity.identity-checked";
        "offer.terms-checked": "offer.terms-checked";
        "assurance.revoked": "assurance.revoked";
        "freshness.exception-granted": "freshness.exception-granted";
        "freshness.exception-revoked": "freshness.exception-revoked";
        "dispute.opened": "dispute.opened";
        "dispute.resolved": "dispute.resolved";
        "asset.takedown-ordered": "asset.takedown-ordered";
        "entity.merged": "entity.merged";
        "entity.split": "entity.split";
        "entity.succeeded": "entity.succeeded";
        "offer.merged": "offer.merged";
        "program.merged": "program.merged";
        "program.reparented": "program.reparented";
        "offer.reparented": "offer.reparented";
        "agent-readiness-profile.merged": "agent-readiness-profile.merged";
        "agent-readiness-profile.reparented": "agent-readiness-profile.reparented";
        "agent-readiness-profile.retired": "agent-readiness-profile.retired";
        "identity.transition-superseded": "identity.transition-superseded";
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
            "catalog-capture": "catalog-capture";
            "catalog-evidence": "catalog-evidence";
            "catalog-identity": "catalog-identity";
            "catalog-authority": "catalog-authority";
            "catalog-attestation": "catalog-attestation";
            "catalog-verification": "catalog-verification";
            "catalog-dispute": "catalog-dispute";
            "catalog-policy": "catalog-policy";
            "catalog-release": "catalog-release";
            "catalog-feed": "catalog-feed";
        }>;
        signer_registry_digest: z.ZodString;
        key_id: z.ZodString;
        algorithm: z.ZodLiteral<"ed25519">;
        signature: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export type CatalogEventKind = z.infer<typeof catalogEventKindSchema>;
export type AuthorityClaimMethod = z.infer<typeof authorityClaimMethodSchema>;
export type EventSubject = z.infer<typeof eventSubjectSchema>;
export type CatalogEventCore = z.infer<typeof catalogEventCoreSchema>;
export type CatalogEvent = z.infer<typeof catalogEventSchema>;
export type CatalogEventIntent = z.infer<typeof catalogEventIntentSchema>;
//# sourceMappingURL=index.d.ts.map