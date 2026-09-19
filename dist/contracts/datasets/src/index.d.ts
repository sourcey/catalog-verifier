import { z } from "zod";
import { compiledEntitySchema } from "../../artifact/src/index.js";
export declare const SOURCEY_DATASET_CONTRACTS: {
    readonly companies: "sourcey.companies-dataset/v1alpha1";
    readonly startupCredits: "sourcey.startup-credits-dataset/v1alpha1";
    readonly agentReadiness: "sourcey.agent-readiness-dataset/v1alpha1";
};
export type SourceyDataset = keyof typeof SOURCEY_DATASET_CONTRACTS;
/** The compact company identity shared by Sourcey's public datasets. */
export declare const companyDatasetRecordSchema: z.ZodObject<{
    entity_id: z.ZodString;
    slug: z.ZodString;
    revision_digest: z.ZodString;
    name: z.ZodString;
    website: z.ZodURL;
    description: z.ZodString;
    summary: z.ZodOptional<z.ZodString>;
    category: z.ZodString;
    slug_aliases: z.ZodOptional<z.ZodArray<z.ZodString>>;
    identity_assurance: z.ZodOptional<z.ZodObject<{
        status: z.ZodLiteral<"verified">;
        assurance_id: z.ZodString;
        verified_at: z.ZodISODateTime;
        identity_epoch_digest: z.ZodString;
        method_policy_digest: z.ZodString;
        coverage_policy_digest: z.ZodString;
        event_id: z.ZodString;
        receipt_digest: z.ZodString;
    }, z.core.$strict>>;
    provenance: z.ZodObject<{
        freshness: z.ZodEnum<{
            unknown: "unknown";
            fresh: "fresh";
            stale: "stale";
        }>;
        dispute: z.ZodEnum<{
            none: "none";
            open: "open";
            resolved: "resolved";
        }>;
        vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
            status: z.ZodLiteral<"none">;
        }, z.core.$strict>, z.ZodObject<{
            status: z.ZodLiteral<"current">;
            event_id: z.ZodString;
            attested_at: z.ZodISODateTime;
        }, z.core.$strict>], "status">;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const companiesDatasetSchema: z.ZodObject<{
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    dataset_contract: z.ZodLiteral<"sourcey.companies-dataset/v1alpha1">;
    companies: z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        slug: z.ZodString;
        revision_digest: z.ZodString;
        name: z.ZodString;
        website: z.ZodURL;
        description: z.ZodString;
        summary: z.ZodOptional<z.ZodString>;
        category: z.ZodString;
        slug_aliases: z.ZodOptional<z.ZodArray<z.ZodString>>;
        identity_assurance: z.ZodOptional<z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            assurance_id: z.ZodString;
            verified_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>>;
        provenance: z.ZodObject<{
            freshness: z.ZodEnum<{
                unknown: "unknown";
                fresh: "fresh";
                stale: "stale";
            }>;
            dispute: z.ZodEnum<{
                none: "none";
                open: "open";
                resolved: "resolved";
            }>;
            vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                status: z.ZodLiteral<"none">;
            }, z.core.$strict>, z.ZodObject<{
                status: z.ZodLiteral<"current">;
                event_id: z.ZodString;
                attested_at: z.ZodISODateTime;
            }, z.core.$strict>], "status">;
        }, z.core.$strict>;
    }, z.core.$strict>>;
    assets: z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        role: z.ZodEnum<{
            "logo-light": "logo-light";
            "logo-dark": "logo-dark";
            icon: "icon";
        }>;
        asset_object_digest: z.ZodString;
        served_digest: z.ZodString;
        served_path: z.ZodString;
        media_type: z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
            "image/svg+xml": "image/svg+xml";
        }>;
        bytes: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
        authority_basis: z.ZodEnum<{
            "sourcey-owned": "sourcey-owned";
            "vendor-authority": "vendor-authority";
            "editorial-review": "editorial-review";
            "licensed-source": "licensed-source";
        }>;
        authority_claim_id: z.ZodOptional<z.ZodString>;
        approval_receipt_digest: z.ZodString;
        source_basis: z.ZodString;
        license_basis: z.ZodString;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        binding_event_id: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const startupCreditsDatasetSchema: z.ZodObject<{
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    dataset_contract: z.ZodLiteral<"sourcey.startup-credits-dataset/v1alpha1">;
    root_set_digest: z.ZodString;
    signer_registry_digest: z.ZodString;
    policy_as_of: z.ZodISODateTime;
    policy_digests: z.ZodRecord<z.ZodString, z.ZodString>;
    policies: z.ZodArray<z.ZodObject<{
        schema_version: z.ZodLiteral<"sourcey.policy/v1alpha1">;
        slug: z.ZodString;
        title: z.ZodString;
        summary: z.ZodString;
        sections: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"prose">;
            heading: z.ZodOptional<z.ZodString>;
            paragraphs: z.ZodArray<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"clauses">;
            heading: z.ZodOptional<z.ZodString>;
            clauses: z.ZodArray<z.ZodObject<{
                title: z.ZodString;
                body: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"definitions">;
            heading: z.ZodOptional<z.ZodString>;
            definitions: z.ZodArray<z.ZodObject<{
                term: z.ZodString;
                detail: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"steps">;
            heading: z.ZodOptional<z.ZodString>;
            steps: z.ZodArray<z.ZodString>;
        }, z.core.$strict>], "kind">>;
        revision_digest: z.ZodString;
    }, z.core.$strict>>;
    companies: z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        slug: z.ZodString;
        slug_aliases: z.ZodOptional<z.ZodArray<z.ZodString>>;
        name: z.ZodString;
        summary: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
        website: z.ZodURL;
        category: z.ZodString;
        revision_digest: z.ZodString;
        provenance: z.ZodObject<{
            freshness: z.ZodEnum<{
                unknown: "unknown";
                fresh: "fresh";
                stale: "stale";
            }>;
            dispute: z.ZodEnum<{
                none: "none";
                open: "open";
                resolved: "resolved";
            }>;
            coverage_policy_digest: z.ZodString;
            freshness_policy_digest: z.ZodString;
            basis_event_ids: z.ZodArray<z.ZodString>;
            fields: z.ZodArray<z.ZodObject<{
                path: z.ZodString;
                supporting_event_ids: z.ZodArray<z.ZodString>;
                contradicting_event_ids: z.ZodArray<z.ZodString>;
                accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                    observed: "observed";
                    derived: "derived";
                    editorial: "editorial";
                    attested: "attested";
                }>>;
                evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                    observed: "observed";
                    derived: "derived";
                    editorial: "editorial";
                    attested: "attested";
                }>>;
                latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                freshness: z.ZodEnum<{
                    unknown: "unknown";
                    fresh: "fresh";
                    stale: "stale";
                }>;
            }, z.core.$strict>>;
            vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                status: z.ZodLiteral<"none">;
            }, z.core.$strict>, z.ZodObject<{
                status: z.ZodLiteral<"current">;
                event_id: z.ZodString;
                attested_at: z.ZodISODateTime;
            }, z.core.$strict>], "status">;
        }, z.core.$strict>;
        identity_assurance: z.ZodOptional<z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            assurance_id: z.ZodString;
            verified_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>>;
        programs: z.ZodArray<z.ZodObject<{
            program_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    unknown: "unknown";
                    fresh: "fresh";
                    stale: "stale";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        observed: "observed";
                        derived: "derived";
                        editorial: "editorial";
                        attested: "attested";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        observed: "observed";
                        derived: "derived";
                        editorial: "editorial";
                        attested: "attested";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        unknown: "unknown";
                        fresh: "fresh";
                        stale: "stale";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
        }, z.core.$strict>>;
        offers: z.ZodArray<z.ZodObject<{
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
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
                rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
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
            lifecycle: z.ZodEnum<{
                active: "active";
                ended: "ended";
                withdrawn: "withdrawn";
            }>;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    unknown: "unknown";
                    fresh: "fresh";
                    stale: "stale";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        observed: "observed";
                        derived: "derived";
                        editorial: "editorial";
                        attested: "attested";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        observed: "observed";
                        derived: "derived";
                        editorial: "editorial";
                        attested: "attested";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        unknown: "unknown";
                        fresh: "fresh";
                        stale: "stale";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
            terms_assurance: z.ZodOptional<z.ZodObject<{
                status: z.ZodLiteral<"checked">;
                assurance_id: z.ZodString;
                checked_at: z.ZodISODateTime;
                revision_digest: z.ZodString;
                method_policy_digest: z.ZodString;
                coverage_policy_digest: z.ZodString;
                event_id: z.ZodString;
                receipt_digest: z.ZodString;
            }, z.core.$strict>>;
            headline: z.ZodOptional<z.ZodObject<{
                rule: z.ZodLiteral<"sourcey.offer-headline/v1">;
                benefit_id: z.ZodString;
                basis: z.ZodEnum<{
                    typed: "typed";
                    described: "described";
                }>;
                figure: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodOptional<z.ZodString>;
                    duration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>], "kind">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>], "kind">;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessDatasetSchema: z.ZodObject<{
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    dataset_contract: z.ZodLiteral<"sourcey.agent-readiness-dataset/v1alpha1">;
    profiles: z.ZodArray<z.ZodObject<{
        policy_digest: z.ZodString;
        entity_id: z.ZodString;
        effective_from: z.ZodISODateTime;
        revision_digest: z.ZodString;
        agent_readiness_profile_id: z.ZodString;
        scope: z.ZodObject<{
            product: z.ZodObject<{
                key: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
            funnel: z.ZodObject<{
                key: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        coverage: z.ZodObject<{
            status: z.ZodEnum<{
                incomplete: "incomplete";
                complete: "complete";
            }>;
            required_signals: z.ZodNumber;
            covered_signals: z.ZodNumber;
            ratio: z.ZodNumber;
            barrier_signals: z.ZodNumber;
            verified_barrier_signals: z.ZodNumber;
            barrier_ratio: z.ZodNumber;
        }, z.core.$strict>;
        lifecycle: z.ZodEnum<{
            active: "active";
            ended: "ended";
            withdrawn: "withdrawn";
        }>;
        freshness: z.ZodEnum<{
            unknown: "unknown";
            fresh: "fresh";
            stale: "stale";
        }>;
        policy_as_of: z.ZodISODateTime;
        projection_digest: z.ZodString;
        declaration_revision_digest: z.ZodString;
        policy_version: z.ZodString;
        grade_derivation: z.ZodObject<{
            label: z.ZodString;
            explanation: z.ZodString;
            coverage_rule: z.ZodString;
            outcome_rule: z.ZodString;
        }, z.core.$strict>;
        public_state: z.ZodEnum<{
            unknown: "unknown";
            not_applicable: "not_applicable";
            ready: "ready";
            limited: "limited";
            blocked: "blocked";
        }>;
        primary_finding: z.ZodOptional<z.ZodObject<{
            stage: z.ZodEnum<{
                evaluate: "evaluate";
                sign_up: "sign_up";
                pay: "pay";
                provision: "provision";
                operate: "operate";
            }>;
            stage_label: z.ZodString;
            public_state: z.ZodEnum<{
                limited: "limited";
                blocked: "blocked";
            }>;
            finding: z.ZodObject<{
                signal_code: z.ZodString;
                condition: z.ZodString;
                finding: z.ZodString;
                context: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            blocker: z.ZodOptional<z.ZodObject<{
                signal_code: z.ZodString;
                code: z.ZodString;
                explanation: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        state_label: z.ZodString;
        overall_outcome: z.ZodEnum<{
            unknown: "unknown";
            not_applicable: "not_applicable";
            pass: "pass";
            constrained: "constrained";
            fail: "fail";
        }>;
        grade: z.ZodEnum<{
            "A+": "A+";
            A: "A";
            "B+": "B+";
            B: "B";
            "C+": "C+";
            C: "C";
            D: "D";
            F: "F";
            unrated: "unrated";
        }>;
        last_tested_at: z.ZodISODateTime;
        publication: z.ZodObject<{
            visibility: z.ZodEnum<{
                discoverable: "discoverable";
                resolvable_only: "resolvable_only";
                private: "private";
            }>;
            reasons: z.ZodArray<z.ZodEnum<{
                unrated: "unrated";
                lifecycle_not_active: "lifecycle_not_active";
                coverage_incomplete: "coverage_incomplete";
                required_evidence_not_supported: "required_evidence_not_supported";
                freshness_not_fresh: "freshness_not_fresh";
                no_useful_finding: "no_useful_finding";
                open_dispute: "open_dispute";
            }>>;
        }, z.core.$strict>;
        canonical_url: z.ZodURL;
        stages: z.ZodArray<z.ZodObject<{
            outcome: z.ZodEnum<{
                unknown: "unknown";
                not_applicable: "not_applicable";
                pass: "pass";
                constrained: "constrained";
                fail: "fail";
            }>;
            stage: z.ZodEnum<{
                evaluate: "evaluate";
                sign_up: "sign_up";
                pay: "pay";
                provision: "provision";
                operate: "operate";
            }>;
            public_state: z.ZodEnum<{
                unknown: "unknown";
                not_applicable: "not_applicable";
                ready: "ready";
                limited: "limited";
                blocked: "blocked";
            }>;
            primary_finding: z.ZodObject<{
                signal_code: z.ZodString;
                condition: z.ZodString;
                finding: z.ZodString;
                context: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            stage_label: z.ZodString;
            state_label: z.ZodString;
        }, z.core.$strict>>;
        provenance: z.ZodObject<{
            freshness: z.ZodEnum<{
                unknown: "unknown";
                fresh: "fresh";
                stale: "stale";
            }>;
            dispute: z.ZodEnum<{
                none: "none";
                open: "open";
                resolved: "resolved";
            }>;
            vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                status: z.ZodLiteral<"none">;
            }, z.core.$strict>, z.ZodObject<{
                status: z.ZodLiteral<"current">;
                event_id: z.ZodString;
                attested_at: z.ZodISODateTime;
            }, z.core.$strict>], "status">;
        }, z.core.$strict>;
    }, z.core.$strict>>;
    offer_relations: z.ZodArray<z.ZodObject<{
        relation_id: z.ZodString;
        agent_readiness_profile_id: z.ZodString;
        offer_id: z.ZodString;
        purpose: z.ZodEnum<{
            application_path: "application_path";
            redemption_path: "redemption_path";
            operating_path: "operating_path";
        }>;
        applicable_stages: z.ZodArray<z.ZodEnum<{
            evaluate: "evaluate";
            sign_up: "sign_up";
            pay: "pay";
            provision: "provision";
            operate: "operate";
        }>>;
        effective_from: z.ZodISODateTime;
        effective_until: z.ZodOptional<z.ZodISODateTime>;
        declaration_revision_digest: z.ZodString;
        offer_relation_proposal_id: z.ZodString;
        admitted_offer_revision_digest: z.ZodString;
        relation_contract: z.ZodLiteral<"sourcey.agent-readiness-offer-relation/v1alpha1">;
        relation_revision_digest: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare function projectCompanyDatasetRecord(entity: z.infer<typeof compiledEntitySchema>): CompanyDatasetRecord;
export type CompanyDatasetRecord = z.infer<typeof companyDatasetRecordSchema>;
export type CompaniesDataset = z.infer<typeof companiesDatasetSchema>;
export type StartupCreditsDataset = z.infer<typeof startupCreditsDatasetSchema>;
export type AgentReadinessDataset = z.infer<typeof agentReadinessDatasetSchema>;
//# sourceMappingURL=index.d.ts.map