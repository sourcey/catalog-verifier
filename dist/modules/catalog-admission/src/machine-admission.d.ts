import { z } from "zod";
import type { DecisionBasis } from "../../../contracts/authority/src/index.js";
export declare const startupCreditsMachineAdmissionPolicyCoreSchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.startup-credits-machine-admission-policy/v1alpha1">;
    policy_id: z.ZodString;
    coverage_policy_digest: z.ZodString;
    scope: z.ZodObject<{
        added_entity_files: z.ZodLiteral<1>;
        added_entities: z.ZodLiteral<1>;
        maximum_added_programs: z.ZodLiteral<1>;
        added_offers: z.ZodLiteral<1>;
        offer_evidence_basis: z.ZodLiteral<"observed">;
        unattended_asset_kind: z.ZodLiteral<"sourcey_monogram">;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const startupCreditsMachineAdmissionPolicySchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.startup-credits-machine-admission-policy/v1alpha1">;
    policy_id: z.ZodString;
    coverage_policy_digest: z.ZodString;
    scope: z.ZodObject<{
        added_entity_files: z.ZodLiteral<1>;
        added_entities: z.ZodLiteral<1>;
        maximum_added_programs: z.ZodLiteral<1>;
        added_offers: z.ZodLiteral<1>;
        offer_evidence_basis: z.ZodLiteral<"observed">;
        unattended_asset_kind: z.ZodLiteral<"sourcey_monogram">;
    }, z.core.$strict>;
    policy_digest: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsMachineAdmissionInputCoreSchema: z.ZodObject<{
    evaluation_contract: z.ZodLiteral<"sourcey.startup-credits-machine-admission-input/v1alpha1">;
    repository: z.ZodString;
    pull_request_number: z.ZodNumber;
    base_sha: z.ZodString;
    head_sha: z.ZodString;
    change_tree: z.ZodString;
    live_source_commit: z.ZodString;
    live_parent_release_id: z.ZodString;
    policy: z.ZodObject<{
        policy_contract: z.ZodLiteral<"sourcey.startup-credits-machine-admission-policy/v1alpha1">;
        policy_id: z.ZodString;
        coverage_policy_digest: z.ZodString;
        scope: z.ZodObject<{
            added_entity_files: z.ZodLiteral<1>;
            added_entities: z.ZodLiteral<1>;
            maximum_added_programs: z.ZodLiteral<1>;
            added_offers: z.ZodLiteral<1>;
            offer_evidence_basis: z.ZodLiteral<"observed">;
            unattended_asset_kind: z.ZodLiteral<"sourcey_monogram">;
        }, z.core.$strict>;
        policy_digest: z.ZodString;
    }, z.core.$strict>;
    coverage_policy: z.ZodObject<{
        policy_contract: z.ZodLiteral<"sourcey.coverage/v1alpha1">;
        version: z.ZodString;
        entity_requirements: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            proof_kinds: z.ZodArray<z.ZodEnum<{
                observed: "observed";
                derived: "derived";
                editorial: "editorial";
                attested: "attested";
            }>>;
            derivation_rules: z.ZodArray<z.ZodEnum<{
                "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
                "form-access-from-first-party-application": "form-access-from-first-party-application";
                "first-party-access-operator": "first-party-access-operator";
                "public-availability-from-application": "public-availability-from-application";
            }>>;
            guidance: z.ZodString;
        }, z.core.$strict>>;
        program_requirements: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            proof_kinds: z.ZodArray<z.ZodEnum<{
                observed: "observed";
                derived: "derived";
                editorial: "editorial";
                attested: "attested";
            }>>;
            derivation_rules: z.ZodArray<z.ZodEnum<{
                "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
                "form-access-from-first-party-application": "form-access-from-first-party-application";
                "first-party-access-operator": "first-party-access-operator";
                "public-availability-from-application": "public-availability-from-application";
            }>>;
            guidance: z.ZodString;
        }, z.core.$strict>>;
        offer_requirements: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            proof_kinds: z.ZodArray<z.ZodEnum<{
                observed: "observed";
                derived: "derived";
                editorial: "editorial";
                attested: "attested";
            }>>;
            derivation_rules: z.ZodArray<z.ZodEnum<{
                "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
                "form-access-from-first-party-application": "form-access-from-first-party-application";
                "first-party-access-operator": "first-party-access-operator";
                "public-availability-from-application": "public-availability-from-application";
            }>>;
            guidance: z.ZodString;
        }, z.core.$strict>>;
        policy_digest: z.ZodString;
    }, z.core.$strict>;
    evaluator_id: z.ZodString;
    evaluator_digest: z.ZodString;
    changed_files: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        change: z.ZodEnum<{
            added: "added";
            updated: "updated";
            removed: "removed";
        }>;
    }, z.core.$strict>>;
    changed_subjects: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"entity">;
        change: z.ZodEnum<{
            added: "added";
            updated: "updated";
            removed: "removed";
        }>;
        entity_id: z.ZodString;
        revision_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"program">;
        change: z.ZodEnum<{
            added: "added";
            updated: "updated";
            removed: "removed";
        }>;
        entity_id: z.ZodString;
        program_id: z.ZodString;
        revision_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"offer">;
        change: z.ZodEnum<{
            added: "added";
            updated: "updated";
            removed: "removed";
        }>;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
        revision_digest: z.ZodNullable<z.ZodString>;
        evidence_basis: z.ZodEnum<{
            observed: "observed";
            declared: "declared";
        }>;
    }, z.core.$strict>], "kind">>;
    candidate_revisions: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        revision_contract: z.ZodLiteral<"sourcey.entity-revision/v1alpha1">;
        entity_id: z.ZodString;
        content: z.ZodObject<{
            name: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            description: z.ZodString;
            domains: z.ZodArray<z.ZodObject<{
                value: z.ZodString;
                role: z.ZodEnum<{
                    primary: "primary";
                    alias: "alias";
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"other">;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
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
                    public: "public";
                    other: "other";
                    referral: "referral";
                    membership: "membership";
                    invite: "invite";
                    automatic: "automatic";
                }>;
                method: z.ZodEnum<{
                    code: "code";
                    other: "other";
                    automatic: "automatic";
                    form: "form";
                    contact: "contact";
                }>;
                url: z.ZodOptional<z.ZodURL>;
                public_code: z.ZodOptional<z.ZodString>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
        }, z.core.$strict>;
        revision_digest: z.ZodString;
    }, z.core.$strict>]>>;
    claim_evaluations: z.ZodArray<z.ZodObject<{
        plan: z.ZodObject<{
            plan_contract: z.ZodLiteral<"sourcey.material-claim-plan/v1alpha1">;
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
            }, z.core.$strict>], "subject_type">;
            claims: z.ZodArray<z.ZodObject<{
                policy_path: z.ZodString;
                path: z.ZodString;
                value_digest: z.ZodString;
                semantic_type: z.ZodEnum<{
                    number: "number";
                    boolean: "boolean";
                    url: "url";
                    duration: "duration";
                    currency: "currency";
                    percentage: "percentage";
                    access: "access";
                    domain: "domain";
                    taxonomy: "taxonomy";
                    exact_text: "exact_text";
                    editorial_text: "editorial_text";
                    lifecycle_state: "lifecycle_state";
                    qualifier: "qualifier";
                    money_amount: "money_amount";
                    eligibility_composition: "eligibility_composition";
                    eligibility_value: "eligibility_value";
                    source_authority: "source_authority";
                    composition: "composition";
                    structured_value: "structured_value";
                }>;
                proof_kinds: z.ZodArray<z.ZodEnum<{
                    observed: "observed";
                    derived: "derived";
                    editorial: "editorial";
                    attested: "attested";
                }>>;
                derivation_rules: z.ZodArray<z.ZodString>;
                guidance: z.ZodString;
                depends_on: z.ZodArray<z.ZodString>;
                claim_id: z.ZodString;
            }, z.core.$strict>>;
            plan_digest: z.ZodString;
        }, z.core.$strict>;
        results: z.ZodArray<z.ZodObject<{
            result_contract: z.ZodLiteral<"sourcey.material-claim-result/v1alpha1">;
            claim_id: z.ZodString;
            status: z.ZodEnum<{
                supported: "supported";
                contradicted: "contradicted";
                unresolved: "unresolved";
                unsupported: "unsupported";
            }>;
            bindings: z.ZodArray<z.ZodObject<{
                source_id: z.ZodString;
                capture_digest: z.ZodString;
                normalized_object_digest: z.ZodString;
                adapter_id: z.ZodString;
                adapter_digest: z.ZodString;
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
                binding_digest: z.ZodString;
            }, z.core.$strict>>;
            dependency_result_digests: z.ZodArray<z.ZodString>;
            residue: z.ZodArray<z.ZodObject<{
                code: z.ZodString;
                detail_digest: z.ZodString;
            }, z.core.$strict>>;
            result_digest: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    sources: z.ZodArray<z.ZodObject<{
        subject_revision_digest: z.ZodString;
        source_id: z.ZodString;
        requested_url: z.ZodURL;
        final_url: z.ZodNullable<z.ZodURL>;
        authority: z.ZodEnum<{
            ambiguous: "ambiguous";
            canonical: "canonical";
            inert: "inert";
        }>;
        publisher_entity_id: z.ZodNullable<z.ZodString>;
        capture_status: z.ZodEnum<{
            captured: "captured";
            not_attempted: "not_attempted";
            retryable_failure: "retryable_failure";
            terminal_failure: "terminal_failure";
            anomaly: "anomaly";
        }>;
        capture_method: z.ZodNullable<z.ZodEnum<{
            http: "http";
            headless: "headless";
            archive: "archive";
            manual: "manual";
        }>>;
        capture_policy_digest: z.ZodNullable<z.ZodString>;
        failure_receipt_digest: z.ZodNullable<z.ZodString>;
        response_status_code: z.ZodNullable<z.ZodNumber>;
        availability: z.ZodNullable<z.ZodEnum<{
            public: "public";
            restricted: "restricted";
        }>>;
        capture_digest: z.ZodNullable<z.ZodString>;
        normalized_object_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>>;
    conflicts: z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            url: "url";
            slug: "slug";
            name: "name";
            program: "program";
            offer: "offer";
            identity: "identity";
            domain: "domain";
            semantic_offer: "semantic_offer";
            open_pull_request: "open_pull_request";
            pending_git_lineage: "pending_git_lineage";
            pending_submission: "pending_submission";
        }>;
        strength: z.ZodEnum<{
            exact: "exact";
            ambiguous: "ambiguous";
        }>;
        key_digest: z.ZodString;
        target_references: z.ZodArray<z.ZodString>;
        source_references: z.ZodArray<z.ZodString>;
    }, z.core.$strict>>;
    asset: z.ZodObject<{
        kind: z.ZodEnum<{
            sourcey_monogram: "sourcey_monogram";
            vendor_asset: "vendor_asset";
        }>;
        status: z.ZodEnum<{
            supported: "supported";
            unresolved: "unresolved";
            unsupported: "unsupported";
        }>;
        candidate_digest: z.ZodNullable<z.ZodString>;
        capture_digest: z.ZodNullable<z.ZodString>;
        served_digest: z.ZodNullable<z.ZodString>;
        transform_profile_digest: z.ZodNullable<z.ZodString>;
        fallback_reason_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const startupCreditsMachineAdmissionInputSchema: z.ZodObject<{
    evaluation_contract: z.ZodLiteral<"sourcey.startup-credits-machine-admission-input/v1alpha1">;
    repository: z.ZodString;
    pull_request_number: z.ZodNumber;
    base_sha: z.ZodString;
    head_sha: z.ZodString;
    change_tree: z.ZodString;
    live_source_commit: z.ZodString;
    live_parent_release_id: z.ZodString;
    policy: z.ZodObject<{
        policy_contract: z.ZodLiteral<"sourcey.startup-credits-machine-admission-policy/v1alpha1">;
        policy_id: z.ZodString;
        coverage_policy_digest: z.ZodString;
        scope: z.ZodObject<{
            added_entity_files: z.ZodLiteral<1>;
            added_entities: z.ZodLiteral<1>;
            maximum_added_programs: z.ZodLiteral<1>;
            added_offers: z.ZodLiteral<1>;
            offer_evidence_basis: z.ZodLiteral<"observed">;
            unattended_asset_kind: z.ZodLiteral<"sourcey_monogram">;
        }, z.core.$strict>;
        policy_digest: z.ZodString;
    }, z.core.$strict>;
    coverage_policy: z.ZodObject<{
        policy_contract: z.ZodLiteral<"sourcey.coverage/v1alpha1">;
        version: z.ZodString;
        entity_requirements: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            proof_kinds: z.ZodArray<z.ZodEnum<{
                observed: "observed";
                derived: "derived";
                editorial: "editorial";
                attested: "attested";
            }>>;
            derivation_rules: z.ZodArray<z.ZodEnum<{
                "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
                "form-access-from-first-party-application": "form-access-from-first-party-application";
                "first-party-access-operator": "first-party-access-operator";
                "public-availability-from-application": "public-availability-from-application";
            }>>;
            guidance: z.ZodString;
        }, z.core.$strict>>;
        program_requirements: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            proof_kinds: z.ZodArray<z.ZodEnum<{
                observed: "observed";
                derived: "derived";
                editorial: "editorial";
                attested: "attested";
            }>>;
            derivation_rules: z.ZodArray<z.ZodEnum<{
                "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
                "form-access-from-first-party-application": "form-access-from-first-party-application";
                "first-party-access-operator": "first-party-access-operator";
                "public-availability-from-application": "public-availability-from-application";
            }>>;
            guidance: z.ZodString;
        }, z.core.$strict>>;
        offer_requirements: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            proof_kinds: z.ZodArray<z.ZodEnum<{
                observed: "observed";
                derived: "derived";
                editorial: "editorial";
                attested: "attested";
            }>>;
            derivation_rules: z.ZodArray<z.ZodEnum<{
                "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
                "form-access-from-first-party-application": "form-access-from-first-party-application";
                "first-party-access-operator": "first-party-access-operator";
                "public-availability-from-application": "public-availability-from-application";
            }>>;
            guidance: z.ZodString;
        }, z.core.$strict>>;
        policy_digest: z.ZodString;
    }, z.core.$strict>;
    evaluator_id: z.ZodString;
    evaluator_digest: z.ZodString;
    changed_files: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        change: z.ZodEnum<{
            added: "added";
            updated: "updated";
            removed: "removed";
        }>;
    }, z.core.$strict>>;
    changed_subjects: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"entity">;
        change: z.ZodEnum<{
            added: "added";
            updated: "updated";
            removed: "removed";
        }>;
        entity_id: z.ZodString;
        revision_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"program">;
        change: z.ZodEnum<{
            added: "added";
            updated: "updated";
            removed: "removed";
        }>;
        entity_id: z.ZodString;
        program_id: z.ZodString;
        revision_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"offer">;
        change: z.ZodEnum<{
            added: "added";
            updated: "updated";
            removed: "removed";
        }>;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
        revision_digest: z.ZodNullable<z.ZodString>;
        evidence_basis: z.ZodEnum<{
            observed: "observed";
            declared: "declared";
        }>;
    }, z.core.$strict>], "kind">>;
    candidate_revisions: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        revision_contract: z.ZodLiteral<"sourcey.entity-revision/v1alpha1">;
        entity_id: z.ZodString;
        content: z.ZodObject<{
            name: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            description: z.ZodString;
            domains: z.ZodArray<z.ZodObject<{
                value: z.ZodString;
                role: z.ZodEnum<{
                    primary: "primary";
                    alias: "alias";
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"other">;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
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
                    public: "public";
                    other: "other";
                    referral: "referral";
                    membership: "membership";
                    invite: "invite";
                    automatic: "automatic";
                }>;
                method: z.ZodEnum<{
                    code: "code";
                    other: "other";
                    automatic: "automatic";
                    form: "form";
                    contact: "contact";
                }>;
                url: z.ZodOptional<z.ZodURL>;
                public_code: z.ZodOptional<z.ZodString>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
        }, z.core.$strict>;
        revision_digest: z.ZodString;
    }, z.core.$strict>]>>;
    claim_evaluations: z.ZodArray<z.ZodObject<{
        plan: z.ZodObject<{
            plan_contract: z.ZodLiteral<"sourcey.material-claim-plan/v1alpha1">;
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
            }, z.core.$strict>], "subject_type">;
            claims: z.ZodArray<z.ZodObject<{
                policy_path: z.ZodString;
                path: z.ZodString;
                value_digest: z.ZodString;
                semantic_type: z.ZodEnum<{
                    number: "number";
                    boolean: "boolean";
                    url: "url";
                    duration: "duration";
                    currency: "currency";
                    percentage: "percentage";
                    access: "access";
                    domain: "domain";
                    taxonomy: "taxonomy";
                    exact_text: "exact_text";
                    editorial_text: "editorial_text";
                    lifecycle_state: "lifecycle_state";
                    qualifier: "qualifier";
                    money_amount: "money_amount";
                    eligibility_composition: "eligibility_composition";
                    eligibility_value: "eligibility_value";
                    source_authority: "source_authority";
                    composition: "composition";
                    structured_value: "structured_value";
                }>;
                proof_kinds: z.ZodArray<z.ZodEnum<{
                    observed: "observed";
                    derived: "derived";
                    editorial: "editorial";
                    attested: "attested";
                }>>;
                derivation_rules: z.ZodArray<z.ZodString>;
                guidance: z.ZodString;
                depends_on: z.ZodArray<z.ZodString>;
                claim_id: z.ZodString;
            }, z.core.$strict>>;
            plan_digest: z.ZodString;
        }, z.core.$strict>;
        results: z.ZodArray<z.ZodObject<{
            result_contract: z.ZodLiteral<"sourcey.material-claim-result/v1alpha1">;
            claim_id: z.ZodString;
            status: z.ZodEnum<{
                supported: "supported";
                contradicted: "contradicted";
                unresolved: "unresolved";
                unsupported: "unsupported";
            }>;
            bindings: z.ZodArray<z.ZodObject<{
                source_id: z.ZodString;
                capture_digest: z.ZodString;
                normalized_object_digest: z.ZodString;
                adapter_id: z.ZodString;
                adapter_digest: z.ZodString;
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
                binding_digest: z.ZodString;
            }, z.core.$strict>>;
            dependency_result_digests: z.ZodArray<z.ZodString>;
            residue: z.ZodArray<z.ZodObject<{
                code: z.ZodString;
                detail_digest: z.ZodString;
            }, z.core.$strict>>;
            result_digest: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    sources: z.ZodArray<z.ZodObject<{
        subject_revision_digest: z.ZodString;
        source_id: z.ZodString;
        requested_url: z.ZodURL;
        final_url: z.ZodNullable<z.ZodURL>;
        authority: z.ZodEnum<{
            ambiguous: "ambiguous";
            canonical: "canonical";
            inert: "inert";
        }>;
        publisher_entity_id: z.ZodNullable<z.ZodString>;
        capture_status: z.ZodEnum<{
            captured: "captured";
            not_attempted: "not_attempted";
            retryable_failure: "retryable_failure";
            terminal_failure: "terminal_failure";
            anomaly: "anomaly";
        }>;
        capture_method: z.ZodNullable<z.ZodEnum<{
            http: "http";
            headless: "headless";
            archive: "archive";
            manual: "manual";
        }>>;
        capture_policy_digest: z.ZodNullable<z.ZodString>;
        failure_receipt_digest: z.ZodNullable<z.ZodString>;
        response_status_code: z.ZodNullable<z.ZodNumber>;
        availability: z.ZodNullable<z.ZodEnum<{
            public: "public";
            restricted: "restricted";
        }>>;
        capture_digest: z.ZodNullable<z.ZodString>;
        normalized_object_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>>;
    conflicts: z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            url: "url";
            slug: "slug";
            name: "name";
            program: "program";
            offer: "offer";
            identity: "identity";
            domain: "domain";
            semantic_offer: "semantic_offer";
            open_pull_request: "open_pull_request";
            pending_git_lineage: "pending_git_lineage";
            pending_submission: "pending_submission";
        }>;
        strength: z.ZodEnum<{
            exact: "exact";
            ambiguous: "ambiguous";
        }>;
        key_digest: z.ZodString;
        target_references: z.ZodArray<z.ZodString>;
        source_references: z.ZodArray<z.ZodString>;
    }, z.core.$strict>>;
    asset: z.ZodObject<{
        kind: z.ZodEnum<{
            sourcey_monogram: "sourcey_monogram";
            vendor_asset: "vendor_asset";
        }>;
        status: z.ZodEnum<{
            supported: "supported";
            unresolved: "unresolved";
            unsupported: "unsupported";
        }>;
        candidate_digest: z.ZodNullable<z.ZodString>;
        capture_digest: z.ZodNullable<z.ZodString>;
        served_digest: z.ZodNullable<z.ZodString>;
        transform_profile_digest: z.ZodNullable<z.ZodString>;
        fallback_reason_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>;
    input_digest: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsAdmissionCandidateInputCoreSchema: z.ZodObject<{
    evaluator_id: z.ZodString;
    evaluator_digest: z.ZodString;
    policy: z.ZodObject<{
        policy_contract: z.ZodLiteral<"sourcey.startup-credits-machine-admission-policy/v1alpha1">;
        policy_id: z.ZodString;
        coverage_policy_digest: z.ZodString;
        scope: z.ZodObject<{
            added_entity_files: z.ZodLiteral<1>;
            added_entities: z.ZodLiteral<1>;
            maximum_added_programs: z.ZodLiteral<1>;
            added_offers: z.ZodLiteral<1>;
            offer_evidence_basis: z.ZodLiteral<"observed">;
            unattended_asset_kind: z.ZodLiteral<"sourcey_monogram">;
        }, z.core.$strict>;
        policy_digest: z.ZodString;
    }, z.core.$strict>;
    asset: z.ZodObject<{
        kind: z.ZodEnum<{
            sourcey_monogram: "sourcey_monogram";
            vendor_asset: "vendor_asset";
        }>;
        status: z.ZodEnum<{
            supported: "supported";
            unresolved: "unresolved";
            unsupported: "unsupported";
        }>;
        candidate_digest: z.ZodNullable<z.ZodString>;
        capture_digest: z.ZodNullable<z.ZodString>;
        served_digest: z.ZodNullable<z.ZodString>;
        transform_profile_digest: z.ZodNullable<z.ZodString>;
        fallback_reason_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>;
    live_parent_release_id: z.ZodString;
    sources: z.ZodArray<z.ZodObject<{
        subject_revision_digest: z.ZodString;
        source_id: z.ZodString;
        requested_url: z.ZodURL;
        final_url: z.ZodNullable<z.ZodURL>;
        authority: z.ZodEnum<{
            ambiguous: "ambiguous";
            canonical: "canonical";
            inert: "inert";
        }>;
        publisher_entity_id: z.ZodNullable<z.ZodString>;
        capture_status: z.ZodEnum<{
            captured: "captured";
            not_attempted: "not_attempted";
            retryable_failure: "retryable_failure";
            terminal_failure: "terminal_failure";
            anomaly: "anomaly";
        }>;
        capture_method: z.ZodNullable<z.ZodEnum<{
            http: "http";
            headless: "headless";
            archive: "archive";
            manual: "manual";
        }>>;
        capture_policy_digest: z.ZodNullable<z.ZodString>;
        failure_receipt_digest: z.ZodNullable<z.ZodString>;
        response_status_code: z.ZodNullable<z.ZodNumber>;
        availability: z.ZodNullable<z.ZodEnum<{
            public: "public";
            restricted: "restricted";
        }>>;
        capture_digest: z.ZodNullable<z.ZodString>;
        normalized_object_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>>;
    coverage_policy: z.ZodObject<{
        policy_contract: z.ZodLiteral<"sourcey.coverage/v1alpha1">;
        version: z.ZodString;
        entity_requirements: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            proof_kinds: z.ZodArray<z.ZodEnum<{
                observed: "observed";
                derived: "derived";
                editorial: "editorial";
                attested: "attested";
            }>>;
            derivation_rules: z.ZodArray<z.ZodEnum<{
                "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
                "form-access-from-first-party-application": "form-access-from-first-party-application";
                "first-party-access-operator": "first-party-access-operator";
                "public-availability-from-application": "public-availability-from-application";
            }>>;
            guidance: z.ZodString;
        }, z.core.$strict>>;
        program_requirements: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            proof_kinds: z.ZodArray<z.ZodEnum<{
                observed: "observed";
                derived: "derived";
                editorial: "editorial";
                attested: "attested";
            }>>;
            derivation_rules: z.ZodArray<z.ZodEnum<{
                "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
                "form-access-from-first-party-application": "form-access-from-first-party-application";
                "first-party-access-operator": "first-party-access-operator";
                "public-availability-from-application": "public-availability-from-application";
            }>>;
            guidance: z.ZodString;
        }, z.core.$strict>>;
        offer_requirements: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            proof_kinds: z.ZodArray<z.ZodEnum<{
                observed: "observed";
                derived: "derived";
                editorial: "editorial";
                attested: "attested";
            }>>;
            derivation_rules: z.ZodArray<z.ZodEnum<{
                "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
                "form-access-from-first-party-application": "form-access-from-first-party-application";
                "first-party-access-operator": "first-party-access-operator";
                "public-availability-from-application": "public-availability-from-application";
            }>>;
            guidance: z.ZodString;
        }, z.core.$strict>>;
        policy_digest: z.ZodString;
    }, z.core.$strict>;
    changed_files: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        change: z.ZodEnum<{
            added: "added";
            updated: "updated";
            removed: "removed";
        }>;
    }, z.core.$strict>>;
    changed_subjects: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"entity">;
        change: z.ZodEnum<{
            added: "added";
            updated: "updated";
            removed: "removed";
        }>;
        entity_id: z.ZodString;
        revision_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"program">;
        change: z.ZodEnum<{
            added: "added";
            updated: "updated";
            removed: "removed";
        }>;
        entity_id: z.ZodString;
        program_id: z.ZodString;
        revision_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"offer">;
        change: z.ZodEnum<{
            added: "added";
            updated: "updated";
            removed: "removed";
        }>;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
        revision_digest: z.ZodNullable<z.ZodString>;
        evidence_basis: z.ZodEnum<{
            observed: "observed";
            declared: "declared";
        }>;
    }, z.core.$strict>], "kind">>;
    candidate_revisions: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        revision_contract: z.ZodLiteral<"sourcey.entity-revision/v1alpha1">;
        entity_id: z.ZodString;
        content: z.ZodObject<{
            name: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            description: z.ZodString;
            domains: z.ZodArray<z.ZodObject<{
                value: z.ZodString;
                role: z.ZodEnum<{
                    primary: "primary";
                    alias: "alias";
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"other">;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
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
                    public: "public";
                    other: "other";
                    referral: "referral";
                    membership: "membership";
                    invite: "invite";
                    automatic: "automatic";
                }>;
                method: z.ZodEnum<{
                    code: "code";
                    other: "other";
                    automatic: "automatic";
                    form: "form";
                    contact: "contact";
                }>;
                url: z.ZodOptional<z.ZodURL>;
                public_code: z.ZodOptional<z.ZodString>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
        }, z.core.$strict>;
        revision_digest: z.ZodString;
    }, z.core.$strict>]>>;
    claim_evaluations: z.ZodArray<z.ZodObject<{
        plan: z.ZodObject<{
            plan_contract: z.ZodLiteral<"sourcey.material-claim-plan/v1alpha1">;
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
            }, z.core.$strict>], "subject_type">;
            claims: z.ZodArray<z.ZodObject<{
                policy_path: z.ZodString;
                path: z.ZodString;
                value_digest: z.ZodString;
                semantic_type: z.ZodEnum<{
                    number: "number";
                    boolean: "boolean";
                    url: "url";
                    duration: "duration";
                    currency: "currency";
                    percentage: "percentage";
                    access: "access";
                    domain: "domain";
                    taxonomy: "taxonomy";
                    exact_text: "exact_text";
                    editorial_text: "editorial_text";
                    lifecycle_state: "lifecycle_state";
                    qualifier: "qualifier";
                    money_amount: "money_amount";
                    eligibility_composition: "eligibility_composition";
                    eligibility_value: "eligibility_value";
                    source_authority: "source_authority";
                    composition: "composition";
                    structured_value: "structured_value";
                }>;
                proof_kinds: z.ZodArray<z.ZodEnum<{
                    observed: "observed";
                    derived: "derived";
                    editorial: "editorial";
                    attested: "attested";
                }>>;
                derivation_rules: z.ZodArray<z.ZodString>;
                guidance: z.ZodString;
                depends_on: z.ZodArray<z.ZodString>;
                claim_id: z.ZodString;
            }, z.core.$strict>>;
            plan_digest: z.ZodString;
        }, z.core.$strict>;
        results: z.ZodArray<z.ZodObject<{
            result_contract: z.ZodLiteral<"sourcey.material-claim-result/v1alpha1">;
            claim_id: z.ZodString;
            status: z.ZodEnum<{
                supported: "supported";
                contradicted: "contradicted";
                unresolved: "unresolved";
                unsupported: "unsupported";
            }>;
            bindings: z.ZodArray<z.ZodObject<{
                source_id: z.ZodString;
                capture_digest: z.ZodString;
                normalized_object_digest: z.ZodString;
                adapter_id: z.ZodString;
                adapter_digest: z.ZodString;
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
                binding_digest: z.ZodString;
            }, z.core.$strict>>;
            dependency_result_digests: z.ZodArray<z.ZodString>;
            residue: z.ZodArray<z.ZodObject<{
                code: z.ZodString;
                detail_digest: z.ZodString;
            }, z.core.$strict>>;
            result_digest: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    conflicts: z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            url: "url";
            slug: "slug";
            name: "name";
            program: "program";
            offer: "offer";
            identity: "identity";
            domain: "domain";
            semantic_offer: "semantic_offer";
            open_pull_request: "open_pull_request";
            pending_git_lineage: "pending_git_lineage";
            pending_submission: "pending_submission";
        }>;
        strength: z.ZodEnum<{
            exact: "exact";
            ambiguous: "ambiguous";
        }>;
        key_digest: z.ZodString;
        target_references: z.ZodArray<z.ZodString>;
        source_references: z.ZodArray<z.ZodString>;
    }, z.core.$strict>>;
    candidate_contract: z.ZodLiteral<"sourcey.startup-credits-admission-candidate-input/v1alpha1">;
}, z.core.$strict>;
export declare const startupCreditsAdmissionCandidateInputSchema: z.ZodObject<{
    evaluator_id: z.ZodString;
    evaluator_digest: z.ZodString;
    policy: z.ZodObject<{
        policy_contract: z.ZodLiteral<"sourcey.startup-credits-machine-admission-policy/v1alpha1">;
        policy_id: z.ZodString;
        coverage_policy_digest: z.ZodString;
        scope: z.ZodObject<{
            added_entity_files: z.ZodLiteral<1>;
            added_entities: z.ZodLiteral<1>;
            maximum_added_programs: z.ZodLiteral<1>;
            added_offers: z.ZodLiteral<1>;
            offer_evidence_basis: z.ZodLiteral<"observed">;
            unattended_asset_kind: z.ZodLiteral<"sourcey_monogram">;
        }, z.core.$strict>;
        policy_digest: z.ZodString;
    }, z.core.$strict>;
    asset: z.ZodObject<{
        kind: z.ZodEnum<{
            sourcey_monogram: "sourcey_monogram";
            vendor_asset: "vendor_asset";
        }>;
        status: z.ZodEnum<{
            supported: "supported";
            unresolved: "unresolved";
            unsupported: "unsupported";
        }>;
        candidate_digest: z.ZodNullable<z.ZodString>;
        capture_digest: z.ZodNullable<z.ZodString>;
        served_digest: z.ZodNullable<z.ZodString>;
        transform_profile_digest: z.ZodNullable<z.ZodString>;
        fallback_reason_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>;
    live_parent_release_id: z.ZodString;
    sources: z.ZodArray<z.ZodObject<{
        subject_revision_digest: z.ZodString;
        source_id: z.ZodString;
        requested_url: z.ZodURL;
        final_url: z.ZodNullable<z.ZodURL>;
        authority: z.ZodEnum<{
            ambiguous: "ambiguous";
            canonical: "canonical";
            inert: "inert";
        }>;
        publisher_entity_id: z.ZodNullable<z.ZodString>;
        capture_status: z.ZodEnum<{
            captured: "captured";
            not_attempted: "not_attempted";
            retryable_failure: "retryable_failure";
            terminal_failure: "terminal_failure";
            anomaly: "anomaly";
        }>;
        capture_method: z.ZodNullable<z.ZodEnum<{
            http: "http";
            headless: "headless";
            archive: "archive";
            manual: "manual";
        }>>;
        capture_policy_digest: z.ZodNullable<z.ZodString>;
        failure_receipt_digest: z.ZodNullable<z.ZodString>;
        response_status_code: z.ZodNullable<z.ZodNumber>;
        availability: z.ZodNullable<z.ZodEnum<{
            public: "public";
            restricted: "restricted";
        }>>;
        capture_digest: z.ZodNullable<z.ZodString>;
        normalized_object_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>>;
    coverage_policy: z.ZodObject<{
        policy_contract: z.ZodLiteral<"sourcey.coverage/v1alpha1">;
        version: z.ZodString;
        entity_requirements: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            proof_kinds: z.ZodArray<z.ZodEnum<{
                observed: "observed";
                derived: "derived";
                editorial: "editorial";
                attested: "attested";
            }>>;
            derivation_rules: z.ZodArray<z.ZodEnum<{
                "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
                "form-access-from-first-party-application": "form-access-from-first-party-application";
                "first-party-access-operator": "first-party-access-operator";
                "public-availability-from-application": "public-availability-from-application";
            }>>;
            guidance: z.ZodString;
        }, z.core.$strict>>;
        program_requirements: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            proof_kinds: z.ZodArray<z.ZodEnum<{
                observed: "observed";
                derived: "derived";
                editorial: "editorial";
                attested: "attested";
            }>>;
            derivation_rules: z.ZodArray<z.ZodEnum<{
                "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
                "form-access-from-first-party-application": "form-access-from-first-party-application";
                "first-party-access-operator": "first-party-access-operator";
                "public-availability-from-application": "public-availability-from-application";
            }>>;
            guidance: z.ZodString;
        }, z.core.$strict>>;
        offer_requirements: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            proof_kinds: z.ZodArray<z.ZodEnum<{
                observed: "observed";
                derived: "derived";
                editorial: "editorial";
                attested: "attested";
            }>>;
            derivation_rules: z.ZodArray<z.ZodEnum<{
                "contact-access-from-first-party-mailto": "contact-access-from-first-party-mailto";
                "form-access-from-first-party-application": "form-access-from-first-party-application";
                "first-party-access-operator": "first-party-access-operator";
                "public-availability-from-application": "public-availability-from-application";
            }>>;
            guidance: z.ZodString;
        }, z.core.$strict>>;
        policy_digest: z.ZodString;
    }, z.core.$strict>;
    changed_files: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        change: z.ZodEnum<{
            added: "added";
            updated: "updated";
            removed: "removed";
        }>;
    }, z.core.$strict>>;
    changed_subjects: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"entity">;
        change: z.ZodEnum<{
            added: "added";
            updated: "updated";
            removed: "removed";
        }>;
        entity_id: z.ZodString;
        revision_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"program">;
        change: z.ZodEnum<{
            added: "added";
            updated: "updated";
            removed: "removed";
        }>;
        entity_id: z.ZodString;
        program_id: z.ZodString;
        revision_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"offer">;
        change: z.ZodEnum<{
            added: "added";
            updated: "updated";
            removed: "removed";
        }>;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
        revision_digest: z.ZodNullable<z.ZodString>;
        evidence_basis: z.ZodEnum<{
            observed: "observed";
            declared: "declared";
        }>;
    }, z.core.$strict>], "kind">>;
    candidate_revisions: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        revision_contract: z.ZodLiteral<"sourcey.entity-revision/v1alpha1">;
        entity_id: z.ZodString;
        content: z.ZodObject<{
            name: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            description: z.ZodString;
            domains: z.ZodArray<z.ZodObject<{
                value: z.ZodString;
                role: z.ZodEnum<{
                    primary: "primary";
                    alias: "alias";
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"other">;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
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
                    public: "public";
                    other: "other";
                    referral: "referral";
                    membership: "membership";
                    invite: "invite";
                    automatic: "automatic";
                }>;
                method: z.ZodEnum<{
                    code: "code";
                    other: "other";
                    automatic: "automatic";
                    form: "form";
                    contact: "contact";
                }>;
                url: z.ZodOptional<z.ZodURL>;
                public_code: z.ZodOptional<z.ZodString>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
        }, z.core.$strict>;
        revision_digest: z.ZodString;
    }, z.core.$strict>]>>;
    claim_evaluations: z.ZodArray<z.ZodObject<{
        plan: z.ZodObject<{
            plan_contract: z.ZodLiteral<"sourcey.material-claim-plan/v1alpha1">;
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
            }, z.core.$strict>], "subject_type">;
            claims: z.ZodArray<z.ZodObject<{
                policy_path: z.ZodString;
                path: z.ZodString;
                value_digest: z.ZodString;
                semantic_type: z.ZodEnum<{
                    number: "number";
                    boolean: "boolean";
                    url: "url";
                    duration: "duration";
                    currency: "currency";
                    percentage: "percentage";
                    access: "access";
                    domain: "domain";
                    taxonomy: "taxonomy";
                    exact_text: "exact_text";
                    editorial_text: "editorial_text";
                    lifecycle_state: "lifecycle_state";
                    qualifier: "qualifier";
                    money_amount: "money_amount";
                    eligibility_composition: "eligibility_composition";
                    eligibility_value: "eligibility_value";
                    source_authority: "source_authority";
                    composition: "composition";
                    structured_value: "structured_value";
                }>;
                proof_kinds: z.ZodArray<z.ZodEnum<{
                    observed: "observed";
                    derived: "derived";
                    editorial: "editorial";
                    attested: "attested";
                }>>;
                derivation_rules: z.ZodArray<z.ZodString>;
                guidance: z.ZodString;
                depends_on: z.ZodArray<z.ZodString>;
                claim_id: z.ZodString;
            }, z.core.$strict>>;
            plan_digest: z.ZodString;
        }, z.core.$strict>;
        results: z.ZodArray<z.ZodObject<{
            result_contract: z.ZodLiteral<"sourcey.material-claim-result/v1alpha1">;
            claim_id: z.ZodString;
            status: z.ZodEnum<{
                supported: "supported";
                contradicted: "contradicted";
                unresolved: "unresolved";
                unsupported: "unsupported";
            }>;
            bindings: z.ZodArray<z.ZodObject<{
                source_id: z.ZodString;
                capture_digest: z.ZodString;
                normalized_object_digest: z.ZodString;
                adapter_id: z.ZodString;
                adapter_digest: z.ZodString;
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
                binding_digest: z.ZodString;
            }, z.core.$strict>>;
            dependency_result_digests: z.ZodArray<z.ZodString>;
            residue: z.ZodArray<z.ZodObject<{
                code: z.ZodString;
                detail_digest: z.ZodString;
            }, z.core.$strict>>;
            result_digest: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    conflicts: z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            url: "url";
            slug: "slug";
            name: "name";
            program: "program";
            offer: "offer";
            identity: "identity";
            domain: "domain";
            semantic_offer: "semantic_offer";
            open_pull_request: "open_pull_request";
            pending_git_lineage: "pending_git_lineage";
            pending_submission: "pending_submission";
        }>;
        strength: z.ZodEnum<{
            exact: "exact";
            ambiguous: "ambiguous";
        }>;
        key_digest: z.ZodString;
        target_references: z.ZodArray<z.ZodString>;
        source_references: z.ZodArray<z.ZodString>;
    }, z.core.$strict>>;
    candidate_contract: z.ZodLiteral<"sourcey.startup-credits-admission-candidate-input/v1alpha1">;
    candidate_digest: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsMachineAdmissionOutcomeSchema: z.ZodEnum<{
    rejected: "rejected";
    temporarily_unavailable: "temporarily_unavailable";
    auto_admissible: "auto_admissible";
    needs_revision: "needs_revision";
    human_review_required: "human_review_required";
}>;
export declare const startupCreditsMachineAdmissionReasonSchema: z.ZodEnum<{
    scope_requires_one_added_entity_file: "scope_requires_one_added_entity_file";
    scope_requires_one_new_entity: "scope_requires_one_new_entity";
    scope_requires_zero_or_one_new_program: "scope_requires_zero_or_one_new_program";
    scope_requires_one_new_offer: "scope_requires_one_new_offer";
    scope_unsupported_change_shape: "scope_unsupported_change_shape";
    declared_offer_not_machine_admissible: "declared_offer_not_machine_admissible";
    entity_summary_required: "entity_summary_required";
    program_summary_required: "program_summary_required";
    source_capture_retryable: "source_capture_retryable";
    source_capture_failed: "source_capture_failed";
    source_capture_anomaly: "source_capture_anomaly";
    source_http_status_not_success: "source_http_status_not_success";
    source_not_public: "source_not_public";
    capture_method_not_unattended: "capture_method_not_unattended";
    source_authority_ambiguous: "source_authority_ambiguous";
    supported_claim_uses_inert_source: "supported_claim_uses_inert_source";
    claim_unsupported: "claim_unsupported";
    claim_unresolved: "claim_unresolved";
    claim_contradicted: "claim_contradicted";
    exact_conflict: "exact_conflict";
    ambiguous_conflict: "ambiguous_conflict";
    safe_asset_required: "safe_asset_required";
    vendor_asset_requires_authority_review: "vendor_asset_requires_authority_review";
}>;
export declare const startupCreditsMachineAdmissionResultCoreSchema: z.ZodObject<{
    result_contract: z.ZodLiteral<"sourcey.startup-credits-machine-admission-result/v1alpha1">;
    input_digest: z.ZodString;
    outcome: z.ZodEnum<{
        rejected: "rejected";
        temporarily_unavailable: "temporarily_unavailable";
        auto_admissible: "auto_admissible";
        needs_revision: "needs_revision";
        human_review_required: "human_review_required";
    }>;
    reason_codes: z.ZodArray<z.ZodEnum<{
        scope_requires_one_added_entity_file: "scope_requires_one_added_entity_file";
        scope_requires_one_new_entity: "scope_requires_one_new_entity";
        scope_requires_zero_or_one_new_program: "scope_requires_zero_or_one_new_program";
        scope_requires_one_new_offer: "scope_requires_one_new_offer";
        scope_unsupported_change_shape: "scope_unsupported_change_shape";
        declared_offer_not_machine_admissible: "declared_offer_not_machine_admissible";
        entity_summary_required: "entity_summary_required";
        program_summary_required: "program_summary_required";
        source_capture_retryable: "source_capture_retryable";
        source_capture_failed: "source_capture_failed";
        source_capture_anomaly: "source_capture_anomaly";
        source_http_status_not_success: "source_http_status_not_success";
        source_not_public: "source_not_public";
        capture_method_not_unattended: "capture_method_not_unattended";
        source_authority_ambiguous: "source_authority_ambiguous";
        supported_claim_uses_inert_source: "supported_claim_uses_inert_source";
        claim_unsupported: "claim_unsupported";
        claim_unresolved: "claim_unresolved";
        claim_contradicted: "claim_contradicted";
        exact_conflict: "exact_conflict";
        ambiguous_conflict: "ambiguous_conflict";
        safe_asset_required: "safe_asset_required";
        vendor_asset_requires_authority_review: "vendor_asset_requires_authority_review";
    }>>;
    retryable: z.ZodBoolean;
    claim_plan_digests: z.ZodArray<z.ZodString>;
    claim_result_digests: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export declare const startupCreditsMachineAdmissionResultSchema: z.ZodObject<{
    result_contract: z.ZodLiteral<"sourcey.startup-credits-machine-admission-result/v1alpha1">;
    input_digest: z.ZodString;
    outcome: z.ZodEnum<{
        rejected: "rejected";
        temporarily_unavailable: "temporarily_unavailable";
        auto_admissible: "auto_admissible";
        needs_revision: "needs_revision";
        human_review_required: "human_review_required";
    }>;
    reason_codes: z.ZodArray<z.ZodEnum<{
        scope_requires_one_added_entity_file: "scope_requires_one_added_entity_file";
        scope_requires_one_new_entity: "scope_requires_one_new_entity";
        scope_requires_zero_or_one_new_program: "scope_requires_zero_or_one_new_program";
        scope_requires_one_new_offer: "scope_requires_one_new_offer";
        scope_unsupported_change_shape: "scope_unsupported_change_shape";
        declared_offer_not_machine_admissible: "declared_offer_not_machine_admissible";
        entity_summary_required: "entity_summary_required";
        program_summary_required: "program_summary_required";
        source_capture_retryable: "source_capture_retryable";
        source_capture_failed: "source_capture_failed";
        source_capture_anomaly: "source_capture_anomaly";
        source_http_status_not_success: "source_http_status_not_success";
        source_not_public: "source_not_public";
        capture_method_not_unattended: "capture_method_not_unattended";
        source_authority_ambiguous: "source_authority_ambiguous";
        supported_claim_uses_inert_source: "supported_claim_uses_inert_source";
        claim_unsupported: "claim_unsupported";
        claim_unresolved: "claim_unresolved";
        claim_contradicted: "claim_contradicted";
        exact_conflict: "exact_conflict";
        ambiguous_conflict: "ambiguous_conflict";
        safe_asset_required: "safe_asset_required";
        vendor_asset_requires_authority_review: "vendor_asset_requires_authority_review";
    }>>;
    retryable: z.ZodBoolean;
    claim_plan_digests: z.ZodArray<z.ZodString>;
    claim_result_digests: z.ZodArray<z.ZodString>;
    result_digest: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsAdmissionCandidateResultCoreSchema: z.ZodObject<{
    result_contract: z.ZodLiteral<"sourcey.startup-credits-admission-candidate-result/v1alpha1">;
    candidate_digest: z.ZodString;
    outcome: z.ZodEnum<{
        rejected: "rejected";
        temporarily_unavailable: "temporarily_unavailable";
        auto_admissible: "auto_admissible";
        needs_revision: "needs_revision";
        human_review_required: "human_review_required";
    }>;
    reason_codes: z.ZodArray<z.ZodEnum<{
        scope_requires_one_added_entity_file: "scope_requires_one_added_entity_file";
        scope_requires_one_new_entity: "scope_requires_one_new_entity";
        scope_requires_zero_or_one_new_program: "scope_requires_zero_or_one_new_program";
        scope_requires_one_new_offer: "scope_requires_one_new_offer";
        scope_unsupported_change_shape: "scope_unsupported_change_shape";
        declared_offer_not_machine_admissible: "declared_offer_not_machine_admissible";
        entity_summary_required: "entity_summary_required";
        program_summary_required: "program_summary_required";
        source_capture_retryable: "source_capture_retryable";
        source_capture_failed: "source_capture_failed";
        source_capture_anomaly: "source_capture_anomaly";
        source_http_status_not_success: "source_http_status_not_success";
        source_not_public: "source_not_public";
        capture_method_not_unattended: "capture_method_not_unattended";
        source_authority_ambiguous: "source_authority_ambiguous";
        supported_claim_uses_inert_source: "supported_claim_uses_inert_source";
        claim_unsupported: "claim_unsupported";
        claim_unresolved: "claim_unresolved";
        claim_contradicted: "claim_contradicted";
        exact_conflict: "exact_conflict";
        ambiguous_conflict: "ambiguous_conflict";
        safe_asset_required: "safe_asset_required";
        vendor_asset_requires_authority_review: "vendor_asset_requires_authority_review";
    }>>;
    retryable: z.ZodBoolean;
    claim_plan_digests: z.ZodArray<z.ZodString>;
    claim_result_digests: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export declare const startupCreditsAdmissionCandidateResultSchema: z.ZodObject<{
    result_contract: z.ZodLiteral<"sourcey.startup-credits-admission-candidate-result/v1alpha1">;
    candidate_digest: z.ZodString;
    outcome: z.ZodEnum<{
        rejected: "rejected";
        temporarily_unavailable: "temporarily_unavailable";
        auto_admissible: "auto_admissible";
        needs_revision: "needs_revision";
        human_review_required: "human_review_required";
    }>;
    reason_codes: z.ZodArray<z.ZodEnum<{
        scope_requires_one_added_entity_file: "scope_requires_one_added_entity_file";
        scope_requires_one_new_entity: "scope_requires_one_new_entity";
        scope_requires_zero_or_one_new_program: "scope_requires_zero_or_one_new_program";
        scope_requires_one_new_offer: "scope_requires_one_new_offer";
        scope_unsupported_change_shape: "scope_unsupported_change_shape";
        declared_offer_not_machine_admissible: "declared_offer_not_machine_admissible";
        entity_summary_required: "entity_summary_required";
        program_summary_required: "program_summary_required";
        source_capture_retryable: "source_capture_retryable";
        source_capture_failed: "source_capture_failed";
        source_capture_anomaly: "source_capture_anomaly";
        source_http_status_not_success: "source_http_status_not_success";
        source_not_public: "source_not_public";
        capture_method_not_unattended: "capture_method_not_unattended";
        source_authority_ambiguous: "source_authority_ambiguous";
        supported_claim_uses_inert_source: "supported_claim_uses_inert_source";
        claim_unsupported: "claim_unsupported";
        claim_unresolved: "claim_unresolved";
        claim_contradicted: "claim_contradicted";
        exact_conflict: "exact_conflict";
        ambiguous_conflict: "ambiguous_conflict";
        safe_asset_required: "safe_asset_required";
        vendor_asset_requires_authority_review: "vendor_asset_requires_authority_review";
    }>>;
    retryable: z.ZodBoolean;
    claim_plan_digests: z.ZodArray<z.ZodString>;
    claim_result_digests: z.ZodArray<z.ZodString>;
    result_digest: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsAdmissionCandidateReceiptCoreSchema: z.ZodObject<{
    receipt_contract: z.ZodLiteral<"sourcey.startup-credits-admission-candidate-receipt/v1alpha1">;
    candidate_digest: z.ZodString;
    result_digest: z.ZodString;
    policy_id: z.ZodString;
    policy_digest: z.ZodString;
    evaluator_id: z.ZodString;
    evaluator_digest: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsAdmissionCandidateReceiptSchema: z.ZodObject<{
    receipt_contract: z.ZodLiteral<"sourcey.startup-credits-admission-candidate-receipt/v1alpha1">;
    candidate_digest: z.ZodString;
    result_digest: z.ZodString;
    policy_id: z.ZodString;
    policy_digest: z.ZodString;
    evaluator_id: z.ZodString;
    evaluator_digest: z.ZodString;
    receipt_digest: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsMachineAdmissionReceiptCoreSchema: z.ZodObject<{
    receipt_contract: z.ZodLiteral<"sourcey.startup-credits-machine-admission-receipt/v1alpha1">;
    input_digest: z.ZodString;
    result_digest: z.ZodString;
    policy_id: z.ZodString;
    policy_digest: z.ZodString;
    evaluator_id: z.ZodString;
    evaluator_digest: z.ZodString;
}, z.core.$strict>;
export declare const startupCreditsMachineAdmissionReceiptSchema: z.ZodObject<{
    receipt_contract: z.ZodLiteral<"sourcey.startup-credits-machine-admission-receipt/v1alpha1">;
    input_digest: z.ZodString;
    result_digest: z.ZodString;
    policy_id: z.ZodString;
    policy_digest: z.ZodString;
    evaluator_id: z.ZodString;
    evaluator_digest: z.ZodString;
    receipt_digest: z.ZodString;
}, z.core.$strict>;
export type StartupCreditsMachineAdmissionInput = z.infer<typeof startupCreditsMachineAdmissionInputSchema>;
export type StartupCreditsAdmissionCandidateInput = z.infer<typeof startupCreditsAdmissionCandidateInputSchema>;
export type StartupCreditsMachineAdmissionPolicy = z.infer<typeof startupCreditsMachineAdmissionPolicySchema>;
export type StartupCreditsMachineAdmissionResult = z.infer<typeof startupCreditsMachineAdmissionResultSchema>;
export type StartupCreditsAdmissionCandidateResult = z.infer<typeof startupCreditsAdmissionCandidateResultSchema>;
export type StartupCreditsAdmissionCandidateReceipt = z.infer<typeof startupCreditsAdmissionCandidateReceiptSchema>;
export type StartupCreditsMachineAdmissionReceipt = z.infer<typeof startupCreditsMachineAdmissionReceiptSchema>;
export declare function createStartupCreditsMachineAdmissionInput(input: z.input<typeof startupCreditsMachineAdmissionInputCoreSchema>): StartupCreditsMachineAdmissionInput;
/**
 * Bind one admission candidate independently of Git, browser, API or paid-work
 * transport. Transport adapters add their own immutable authority coordinates;
 * they never change this candidate's evidence, conflicts, policy or outcome.
 */
export declare function createStartupCreditsAdmissionCandidateInput(input: z.input<typeof startupCreditsAdmissionCandidateInputCoreSchema>): StartupCreditsAdmissionCandidateInput;
export declare function createStartupCreditsMachineAdmissionPolicy(input: z.input<typeof startupCreditsMachineAdmissionPolicyCoreSchema>): StartupCreditsMachineAdmissionPolicy;
/** One total pure policy over exact, already verified domain results. */
export declare function evaluateStartupCreditsMachineAdmission(input: unknown): {
    readonly input: StartupCreditsMachineAdmissionInput;
    readonly result: StartupCreditsMachineAdmissionResult;
    readonly receipt: StartupCreditsMachineAdmissionReceipt;
    readonly decisionBasis: DecisionBasis;
};
/**
 * The shared deterministic admission verdict used by transport-specific
 * applications. This emits no publication, payment, Git or reviewer authority.
 */
export declare function evaluateStartupCreditsAdmissionCandidate(input: unknown): {
    readonly input: StartupCreditsAdmissionCandidateInput;
    readonly result: StartupCreditsAdmissionCandidateResult;
    readonly receipt: StartupCreditsAdmissionCandidateReceipt;
    readonly decisionBasis: DecisionBasis;
};
//# sourceMappingURL=machine-admission.d.ts.map