import { z } from "zod";
export declare const fieldCoverageSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const provenanceSchema: z.ZodObject<{
    tier: z.ZodEnum<{
        observed: "observed";
        signed: "signed";
        verified: "verified";
    }>;
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
    attestation_event_id: z.ZodOptional<z.ZodString>;
    verification_event_id: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const compiledOfferSchema: z.ZodObject<{
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
        tier: z.ZodEnum<{
            observed: "observed";
            signed: "signed";
            verified: "verified";
        }>;
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
        attestation_event_id: z.ZodOptional<z.ZodString>;
        verification_event_id: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const compiledProgramSchema: z.ZodObject<{
    program_id: z.ZodString;
    slug: z.ZodString;
    title: z.ZodString;
    summary: z.ZodOptional<z.ZodString>;
    revision_digest: z.ZodString;
    provenance: z.ZodObject<{
        tier: z.ZodEnum<{
            observed: "observed";
            signed: "signed";
            verified: "verified";
        }>;
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
        attestation_event_id: z.ZodOptional<z.ZodString>;
        verification_event_id: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const compiledEntitySchema: z.ZodObject<{
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
        tier: z.ZodEnum<{
            observed: "observed";
            signed: "signed";
            verified: "verified";
        }>;
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
        attestation_event_id: z.ZodOptional<z.ZodString>;
        verification_event_id: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    programs: z.ZodArray<z.ZodObject<{
        program_id: z.ZodString;
        slug: z.ZodString;
        title: z.ZodString;
        summary: z.ZodOptional<z.ZodString>;
        revision_digest: z.ZodString;
        provenance: z.ZodObject<{
            tier: z.ZodEnum<{
                observed: "observed";
                signed: "signed";
                verified: "verified";
            }>;
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
            attestation_event_id: z.ZodOptional<z.ZodString>;
            verification_event_id: z.ZodOptional<z.ZodString>;
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
            tier: z.ZodEnum<{
                observed: "observed";
                signed: "signed";
                verified: "verified";
            }>;
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
            attestation_event_id: z.ZodOptional<z.ZodString>;
            verification_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const policySectionSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
}, z.core.$strict>], "kind">;
/**
 * The digested core of a public policy record: the normative text is part of
 * the content address, so quoting a policy always quotes an exact revision.
 */
export declare const policyCoreSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const compiledPolicySchema: z.ZodObject<{
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
}, z.core.$strict>;
/**
 * The immutable semantic handoff. It deliberately contains no snapshot or
 * release identity, so it can participate in the snapshot hash without a
 * self-reference.
 */
export declare const canonicalArtifactCoreSchema: z.ZodObject<{
    artifact_contract: z.ZodLiteral<"sourcey.canonical-artifact/v1alpha1">;
    policy_as_of: z.ZodISODateTime;
    root_set_digest: z.ZodString;
    signer_registry_digest: z.ZodString;
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
}, z.core.$strict>;
export declare const canonicalArtifactSchema: z.ZodObject<{
    artifact_contract: z.ZodLiteral<"sourcey.canonical-artifact/v1alpha1">;
    policy_as_of: z.ZodISODateTime;
    root_set_digest: z.ZodString;
    signer_registry_digest: z.ZodString;
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
    entities: z.ZodArray<z.ZodObject<{
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
            tier: z.ZodEnum<{
                observed: "observed";
                signed: "signed";
                verified: "verified";
            }>;
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
            attestation_event_id: z.ZodOptional<z.ZodString>;
            verification_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        programs: z.ZodArray<z.ZodObject<{
            program_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                tier: z.ZodEnum<{
                    observed: "observed";
                    signed: "signed";
                    verified: "verified";
                }>;
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
                attestation_event_id: z.ZodOptional<z.ZodString>;
                verification_event_id: z.ZodOptional<z.ZodString>;
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
                tier: z.ZodEnum<{
                    observed: "observed";
                    signed: "signed";
                    verified: "verified";
                }>;
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
                attestation_event_id: z.ZodOptional<z.ZodString>;
                verification_event_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const releaseChangeKindKnownValues: readonly ["entity.added", "entity.updated", "entity.retired", "program.added", "program.updated", "program.retired", "offer.added", "offer.updated", "offer.ended", "offer.retired", "offer.withdrawn", "policy.added", "policy.updated", "policy.retired", "agent-readiness.added", "agent-readiness.updated", "agent-readiness.regraded", "agent-readiness.ended", "agent-readiness.withdrawn", "asset.bound", "asset.updated", "asset.withdrawn"];
export declare const releaseChangeKindSchema: z.ZodString;
export declare const releaseChangeSchema: z.ZodObject<{
    change_id: z.ZodString;
    kind: z.ZodString;
    subject_type: z.ZodEnum<{
        policy: "policy";
        entity: "entity";
        program: "program";
        offer: "offer";
        agent_readiness_profile: "agent_readiness_profile";
        asset_binding: "asset_binding";
    }>;
    subject_id: z.ZodUnion<readonly [z.ZodString, z.ZodString]>;
    revision_digest: z.ZodOptional<z.ZodString>;
    previous_revision_digest: z.ZodOptional<z.ZodString>;
    projection_digest: z.ZodOptional<z.ZodString>;
    previous_projection_digest: z.ZodOptional<z.ZodString>;
    basis_event_ids: z.ZodArray<z.ZodString>;
    tombstone: z.ZodOptional<z.ZodObject<{
        reason: z.ZodEnum<{
            ended: "ended";
            withdrawn: "withdrawn";
            retired: "retired";
        }>;
        canonical_route: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const releaseDiffSchema: z.ZodObject<{
    diff_contract: z.ZodLiteral<"sourcey.release-diff/v1alpha1">;
    parent_snapshot_id: z.ZodNullable<z.ZodString>;
    snapshot_id: z.ZodString;
    changes: z.ZodArray<z.ZodObject<{
        change_id: z.ZodString;
        kind: z.ZodString;
        subject_type: z.ZodEnum<{
            policy: "policy";
            entity: "entity";
            program: "program";
            offer: "offer";
            agent_readiness_profile: "agent_readiness_profile";
            asset_binding: "asset_binding";
        }>;
        subject_id: z.ZodUnion<readonly [z.ZodString, z.ZodString]>;
        revision_digest: z.ZodOptional<z.ZodString>;
        previous_revision_digest: z.ZodOptional<z.ZodString>;
        projection_digest: z.ZodOptional<z.ZodString>;
        previous_projection_digest: z.ZodOptional<z.ZodString>;
        basis_event_ids: z.ZodArray<z.ZodString>;
        tombstone: z.ZodOptional<z.ZodObject<{
            reason: z.ZodEnum<{
                ended: "ended";
                withdrawn: "withdrawn";
                retired: "retired";
            }>;
            canonical_route: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
/** Canonical bytes committed by release_core.diff_digest. */
export declare function encodeReleaseChanges(changes: readonly ReleaseChange[]): string;
export declare const provenanceEntrySchema: z.ZodObject<{
    revision_digest: z.ZodString;
    first_inclusion_sequence: z.ZodNumber;
    event_ids: z.ZodArray<z.ZodString>;
    observation_ids: z.ZodArray<z.ZodString>;
    coverage_policy_digest: z.ZodString;
    freshness_policy_digest: z.ZodString;
}, z.core.$strict>;
export declare const eventInclusionSchema: z.ZodObject<{
    event_id: z.ZodString;
    event_object_digest: z.ZodString;
    issuer_id: z.ZodString;
    operation_id: z.ZodString;
    signer_registry_digest: z.ZodString;
    first_inclusion_sequence: z.ZodNumber;
}, z.core.$strict>;
export declare const captureReceiptInclusionSchema: z.ZodObject<{
    receipt_digest: z.ZodString;
    receipt_object_digest: z.ZodString;
    issuer_id: z.ZodString;
    operation_id: z.ZodString;
    signer_registry_digest: z.ZodString;
    first_inclusion_sequence: z.ZodNumber;
}, z.core.$strict>;
export declare const provenanceIndexSchema: z.ZodObject<{
    provenance_contract: z.ZodLiteral<"sourcey.provenance-index/v1alpha1">;
    revisions: z.ZodRecord<z.ZodString, z.ZodObject<{
        revision_digest: z.ZodString;
        first_inclusion_sequence: z.ZodNumber;
        event_ids: z.ZodArray<z.ZodString>;
        observation_ids: z.ZodArray<z.ZodString>;
        coverage_policy_digest: z.ZodString;
        freshness_policy_digest: z.ZodString;
    }, z.core.$strict>>;
    events: z.ZodRecord<z.ZodString, z.ZodObject<{
        event_id: z.ZodString;
        event_object_digest: z.ZodString;
        issuer_id: z.ZodString;
        operation_id: z.ZodString;
        signer_registry_digest: z.ZodString;
        first_inclusion_sequence: z.ZodNumber;
    }, z.core.$strict>>;
    capture_receipts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        receipt_digest: z.ZodString;
        receipt_object_digest: z.ZodString;
        issuer_id: z.ZodString;
        operation_id: z.ZodString;
        signer_registry_digest: z.ZodString;
        first_inclusion_sequence: z.ZodNumber;
    }, z.core.$strict>>>;
}, z.core.$strict>;
export declare const identityIndexSchema: z.ZodObject<{
    identity_contract: z.ZodLiteral<"sourcey.identities/v1alpha1">;
    canonical_entity_resolutions: z.ZodRecord<z.ZodString, z.ZodString>;
    canonical_program_resolutions: z.ZodRecord<z.ZodString, z.ZodString>;
    canonical_offer_resolutions: z.ZodRecord<z.ZodString, z.ZodString>;
    canonical_agent_readiness_profile_resolutions: z.ZodRecord<z.ZodString, z.ZodString>;
    program_reparents: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        old_entity_id: z.ZodOptional<z.ZodString>;
        new_entity_id: z.ZodString;
        event_id: z.ZodString;
    }, z.core.$strict>>>;
    offer_reparents: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        old_entity_id: z.ZodOptional<z.ZodString>;
        new_entity_id: z.ZodString;
        event_id: z.ZodString;
    }, z.core.$strict>>>;
    agent_readiness_profile_reparents: z.ZodRecord<z.ZodString, z.ZodObject<{
        old_entity_id: z.ZodString;
        new_entity_id: z.ZodString;
        event_id: z.ZodString;
    }, z.core.$strict>>;
    asset_binding_dispositions: z.ZodRecord<z.ZodString, z.ZodObject<{
        disposition: z.ZodEnum<{
            rebind: "rebind";
            end: "end";
        }>;
        event_id: z.ZodString;
        replacement_binding_event_id: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    split_relationships: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
    retired_entities: z.ZodArray<z.ZodString>;
    retired_programs: z.ZodArray<z.ZodString>;
    retired_offers: z.ZodArray<z.ZodString>;
    retired_agent_readiness_profiles: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export declare const searchIndexSchema: z.ZodObject<{
    search_contract: z.ZodLiteral<"sourcey.search-index/v1alpha1">;
    records: z.ZodArray<z.ZodObject<{
        entity_id: z.ZodString;
        slug: z.ZodString;
        text: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type Provenance = z.infer<typeof provenanceSchema>;
export type CompiledOffer = z.infer<typeof compiledOfferSchema>;
export type CompiledProgram = z.infer<typeof compiledProgramSchema>;
export type CompiledEntity = z.infer<typeof compiledEntitySchema>;
export type CompiledPolicy = z.infer<typeof compiledPolicySchema>;
export type PolicyCore = z.infer<typeof policyCoreSchema>;
export type PolicySection = z.infer<typeof policySectionSchema>;
export type CanonicalArtifact = z.infer<typeof canonicalArtifactSchema>;
export type CanonicalArtifactCore = z.infer<typeof canonicalArtifactCoreSchema>;
export type ReleaseChange = z.infer<typeof releaseChangeSchema>;
export type ReleaseDiff = z.infer<typeof releaseDiffSchema>;
export type ProvenanceIndex = z.infer<typeof provenanceIndexSchema>;
export type IdentityIndex = z.infer<typeof identityIndexSchema>;
export type SearchIndex = z.infer<typeof searchIndexSchema>;
//# sourceMappingURL=index.d.ts.map