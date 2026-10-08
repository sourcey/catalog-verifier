import type { AttestedCapture } from "provenry/capture/attestation";
import { type Digest } from "provenry/primitives";
import { z } from "zod";
import type { DecisionBasis } from "../../../contracts/authority/src/index.js";
import { type CatalogEventIntent } from "../../../contracts/events/src/index.js";
import { type EvidenceReviewDecision } from "../../../contracts/evidence/src/index.js";
import { type Observation } from "../../../contracts/observations/src/index.js";
import { type EntityRevision, type ListingRevision, type ProgramRevision } from "../../../contracts/revisions/src/index.js";
export declare const evidenceCatalogProposalSchema: z.ZodObject<{
    catalog_proposal_contract: z.ZodLiteral<"sourcey.evidence-catalog-proposal/v1alpha1">;
    materialized_at: z.ZodISODateTime;
    review_proposal: z.ZodObject<{
        proposal_contract: z.ZodLiteral<"sourcey.evidence-review-proposal/v1alpha1">;
        operation_id: z.ZodString;
        job_id: z.ZodString;
        target_id: z.ZodString;
        base_release_id: z.ZodString;
        capture_policy_digest: z.ZodString;
        coverage_policy_digest: z.ZodString;
        subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
            subject_type: z.ZodLiteral<"entity">;
            entity_id: z.ZodString;
            revision_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"program">;
            entity_id: z.ZodString;
            program_id: z.ZodString;
            revision_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"offer">;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            revision_digest: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"agent_readiness_profile">;
            entity_id: z.ZodString;
            agent_readiness_profile_id: z.ZodString;
            revision_digest: z.ZodString;
        }, z.core.$strict>], "subject_type">;
        authority_entity_revision_digest: z.ZodString;
        authority_program_revision_digest: z.ZodNullable<z.ZodString>;
        submission: z.ZodObject<{
            submission_contract: z.ZodLiteral<"sourcey.evidence-submission/v1alpha1">;
            base_revision_digest: z.ZodString;
            capture: z.ZodObject<{
                subject_source_url: z.ZodURL;
                requested_url: z.ZodURL;
                final_url: z.ZodURL;
                redirect_chain: z.ZodArray<z.ZodObject<{
                    status: z.ZodUnion<readonly [z.ZodLiteral<301>, z.ZodLiteral<302>, z.ZodLiteral<303>, z.ZodLiteral<307>, z.ZodLiteral<308>]>;
                    from: z.ZodURL;
                    to: z.ZodURL;
                }, z.core.$strict>>;
                retrieved_at: z.ZodISODateTime;
                method: z.ZodEnum<{
                    archive: "archive";
                    headless: "headless";
                    http: "http";
                    manual: "manual";
                }>;
                response_status_code: z.ZodNumber;
                media_type: z.ZodString;
                digest: z.ZodString;
                availability: z.ZodEnum<{
                    public: "public";
                    restricted: "restricted";
                }>;
                artifact_scope: z.ZodOptional<z.ZodEnum<{
                    complete_document: "complete_document";
                    document_excerpt: "document_excerpt";
                }>>;
                source_content: z.ZodOptional<z.ZodObject<{
                    digest: z.ZodString;
                    bytes: z.ZodNumber;
                    media_type: z.ZodString;
                    normalized_digest: z.ZodString;
                    normalized_bytes: z.ZodNumber;
                }, z.core.$strict>>;
            }, z.core.$strict>;
            normalization: z.ZodObject<{
                normalizer_contract: z.ZodLiteral<"sourcey.evidence-normalizer/v1alpha1">;
                normalizer_id: z.ZodLiteral<"sourcey-deterministic-content">;
                version: z.ZodLiteral<"1">;
                toolchain_digest: z.ZodLiteral<`sha256:${string}`>;
                object_digest: z.ZodString;
            }, z.core.$strict>;
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
        }, z.core.$strict>;
        review_projection: z.ZodObject<{
            source_standing: z.ZodEnum<{
                "archived-first-party": "archived-first-party";
                "archived-third-party": "archived-third-party";
                "live-first-party": "live-first-party";
                "live-third-party": "live-third-party";
                "manual-first-party": "manual-first-party";
                "manual-third-party": "manual-third-party";
            }>;
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
                values: z.ZodArray<z.ZodObject<{
                    start_byte: z.ZodNumber;
                    end_byte: z.ZodNumber;
                    value_digest: z.ZodString;
                    text: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>>;
        }, z.core.$strict>;
        proposal_digest: z.ZodString;
    }, z.core.$strict>;
    review_decision: z.ZodObject<{
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
    }, z.core.$strict>;
    subject_revision: z.ZodUnion<readonly [z.ZodObject<{
        revision_contract: z.ZodLiteral<"sourcey.entity-revision/v1alpha1">;
        entity_id: z.ZodString;
        content: z.ZodObject<{
            name: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            description: z.ZodString;
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
            links: z.ZodObject<{
                site: z.ZodURL;
                pricing: z.ZodOptional<z.ZodURL>;
            }, z.core.$strict>;
        }, z.core.$strict>;
        revision_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        revision_contract: z.ZodLiteral<"sourcey.program-revision/v1alpha1">;
        entity_id: z.ZodString;
        program_id: z.ZodString;
        content: z.ZodObject<{
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        revision_digest: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        revision_contract: z.ZodLiteral<"sourcey.offer-revision/v1alpha1">;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
        content: z.ZodObject<{
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
                rule: z.ZodType<import("../../../contracts/revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../../contracts/revisions/src/index.js").EligibilityRule, unknown>>;
            }, z.core.$strict>;
            roles: z.ZodObject<{
                terms_authority_entity_id: z.ZodString;
                access_operator_entity_id: z.ZodString;
            }, z.core.$strict>;
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
                url: z.ZodOptional<z.ZodURL>;
                public_code: z.ZodOptional<z.ZodString>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
        }, z.core.$strict>;
        revision_digest: z.ZodString;
    }, z.core.$strict>]>;
    authority_entity_revision: z.ZodObject<{
        revision_contract: z.ZodLiteral<"sourcey.entity-revision/v1alpha1">;
        entity_id: z.ZodString;
        content: z.ZodObject<{
            name: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            description: z.ZodString;
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
            links: z.ZodObject<{
                site: z.ZodURL;
                pricing: z.ZodOptional<z.ZodURL>;
            }, z.core.$strict>;
        }, z.core.$strict>;
        revision_digest: z.ZodString;
    }, z.core.$strict>;
    authority_program_revision: z.ZodNullable<z.ZodObject<{
        revision_contract: z.ZodLiteral<"sourcey.program-revision/v1alpha1">;
        entity_id: z.ZodString;
        program_id: z.ZodString;
        content: z.ZodObject<{
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        revision_digest: z.ZodString;
    }, z.core.$strict>>;
    capture_attestation_digest: z.ZodString;
    observations: z.ZodArray<z.ZodObject<{
        observation_contract: z.ZodLiteral<"sourcey.observation/v1alpha1">;
        source_id: z.ZodString;
        source_uri: z.ZodURL;
        retrieved_at: z.ZodISODateTime;
        method: z.ZodObject<{
            name: z.ZodString;
            version: z.ZodString;
        }, z.core.$strict>;
        outcome: z.ZodEnum<{
            "contradicts-candidate": "contradicts-candidate";
            error: "error";
            "supports-candidate": "supports-candidate";
            unreachable: "unreachable";
        }>;
        capture: z.ZodOptional<z.ZodObject<{
            digest: z.ZodString;
            bytes: z.ZodNumber;
            media_type: z.ZodString;
            availability: z.ZodEnum<{
                "private-receipt": "private-receipt";
                public: "public";
            }>;
            requested_uri: z.ZodOptional<z.ZodURL>;
            final_uri: z.ZodOptional<z.ZodURL>;
            redirect_chain: z.ZodOptional<z.ZodArray<z.ZodObject<{
                status: z.ZodUnion<readonly [z.ZodLiteral<301>, z.ZodLiteral<302>, z.ZodLiteral<303>, z.ZodLiteral<307>, z.ZodLiteral<308>]>;
                from: z.ZodURL;
                to: z.ZodURL;
            }, z.core.$strict>>>;
            source_standing: z.ZodOptional<z.ZodEnum<{
                "archived-first-party": "archived-first-party";
                "archived-third-party": "archived-third-party";
                "live-first-party": "live-first-party";
                "live-third-party": "live-third-party";
                "manual-first-party": "manual-first-party";
                "manual-third-party": "manual-third-party";
            }>>;
            normalized_object: z.ZodOptional<z.ZodObject<{
                digest: z.ZodString;
                bytes: z.ZodNumber;
                media_type: z.ZodLiteral<"text/plain; charset=utf-8">;
                normalizer_contract: z.ZodLiteral<"sourcey.evidence-normalizer/v1alpha1">;
                normalizer_id: z.ZodString;
                version: z.ZodString;
                toolchain_digest: z.ZodString;
            }, z.core.$strict>>;
            artifact_scope: z.ZodOptional<z.ZodEnum<{
                complete_document: "complete_document";
                document_excerpt: "document_excerpt";
            }>>;
            source_content: z.ZodOptional<z.ZodObject<{
                digest: z.ZodString;
                bytes: z.ZodNumber;
                media_type: z.ZodString;
                normalized_digest: z.ZodString;
                normalized_bytes: z.ZodNumber;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        no_capture_reason: z.ZodOptional<z.ZodEnum<{
            "access-denied": "access-denied";
            "connect-timeout": "connect-timeout";
            "dns-failure": "dns-failure";
            "empty-response": "empty-response";
            "extractor-error": "extractor-error";
            "policy-blocked": "policy-blocked";
            "tls-failure": "tls-failure";
        }>>;
        observation_id: z.ZodString;
    }, z.core.$strict>>;
    event_intents: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strict>>;
    proposal_digest: z.ZodString;
}, z.core.$strict>;
export type EvidenceCatalogProposal = z.infer<typeof evidenceCatalogProposalSchema>;
export declare function evidenceCatalogProposalRevisionDigests(input: EvidenceCatalogProposal | unknown): Digest[];
export interface EvidenceAuthorityPolicy {
    readonly evidenceEventIssuerId: string;
}
export type { EvidenceCatalogView } from "../../catalog-read-port/src/index.js";
import type { EvidenceCatalogView } from "../../catalog-read-port/src/index.js";
interface ValidatedEvidenceCatalogProposal {
    readonly proposal: EvidenceCatalogProposal;
    /** Whether the release already carries the proposal's capture attestation. */
    readonly existingCaptureAttestation: boolean;
    readonly newObservations: readonly Observation[];
    readonly newEventIntents: readonly CatalogEventIntent[];
    readonly existingObservationIds: readonly Digest[];
    readonly existingEventIds: readonly Digest[];
}
export declare function createEvidenceReviewDecision(input: {
    readonly reviewProposal: unknown;
    readonly decisionBasis: DecisionBasis;
    readonly decision: "approved" | "rejected";
    readonly decidedAt: string;
    readonly rationale: string | null;
}): EvidenceReviewDecision;
export declare function createEvidenceCatalogProposal(input: {
    readonly reviewProposal: unknown;
    readonly reviewDecision: unknown;
    readonly attestedCapture: AttestedCapture;
    readonly captureBytes: Uint8Array;
    readonly normalizedBytes: Uint8Array;
    readonly revision: ListingRevision;
    readonly authorityEntityRevision: EntityRevision;
    readonly authorityProgramRevision: ProgramRevision | null;
    readonly materializedAt: string;
    readonly policy: EvidenceAuthorityPolicy;
}): EvidenceCatalogProposal;
export declare function validateEvidenceCatalogProposal(input: {
    readonly proposal: unknown;
    readonly attestedCapture: AttestedCapture;
    readonly captureBytes: Uint8Array;
    readonly normalizedBytes: Uint8Array;
    readonly catalog: EvidenceCatalogView;
    readonly prospectiveRevisionDigests: ReadonlySet<string>;
    readonly policy: EvidenceAuthorityPolicy;
}): ValidatedEvidenceCatalogProposal;
//# sourceMappingURL=evidence-authority.d.ts.map