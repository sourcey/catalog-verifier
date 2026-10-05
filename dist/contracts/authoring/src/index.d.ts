import { z } from "zod";
export declare const retainedAuthoringSourceSchema: z.ZodObject<{
    source_id: z.ZodString;
    url: z.ZodURL;
}, z.core.$strict>;
export declare const authoringSourceSchema: z.ZodObject<{
    source_id: z.ZodString;
    url: z.ZodURL;
}, z.core.$strict>;
export declare const retainedEntityIdentityAuthoringSchema: z.ZodObject<{
    entity_id: z.ZodString;
    slug: z.ZodString;
    slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
    name: z.ZodString;
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
}, z.core.$strict>;
export declare const entityIdentityAuthoringSchema: z.ZodObject<{
    entity_id: z.ZodString;
    slug: z.ZodString;
    slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
    name: z.ZodString;
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
}, z.core.$strict>;
export declare const retainedEntityProfileAuthoringSchema: z.ZodObject<{
    summary: z.ZodOptional<z.ZodString>;
    description: z.ZodString;
    links: z.ZodObject<{
        site: z.ZodURL;
        pricing: z.ZodOptional<z.ZodURL>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const entityProfileAuthoringSchema: z.ZodObject<{
    summary: z.ZodOptional<z.ZodString>;
    description: z.ZodString;
    links: z.ZodObject<{
        site: z.ZodURL;
        pricing: z.ZodOptional<z.ZodURL>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const authoringOfferSchema: z.ZodObject<{
    offer_id: z.ZodString;
    program_id: z.ZodOptional<z.ZodString>;
    offer_slug: z.ZodString;
    offer_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
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
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>, z.ZodObject<{
            benefit_id: z.ZodString;
            description: z.ZodString;
            kind: z.ZodLiteral<"other">;
        }, z.core.$strict>], "kind">>;
    }, z.core.$strict>;
    eligibility: z.ZodObject<{
        rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
    }, z.core.$strict>;
    roles: z.ZodObject<{
        terms_authority_entity_id: z.ZodString;
        access_operator_entity_id: z.ZodString;
    }, z.core.$strict>;
    source_ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
    declared: z.ZodOptional<z.ZodLiteral<true>>;
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
        public_code: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodURL>;
        instructions: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    terms_url: z.ZodOptional<z.ZodURL>;
}, z.core.$strict>;
export declare const authoringProgramSchema: z.ZodObject<{
    program_id: z.ZodString;
    program_slug: z.ZodString;
    program_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
    title: z.ZodString;
    summary: z.ZodOptional<z.ZodString>;
    source_ids: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export declare const retainedEntityAuthoringSchema: z.ZodObject<{
    schema_version: z.ZodLiteral<"sourcey.entity-authoring/v1alpha1">;
    entity: z.ZodObject<{
        entity_id: z.ZodString;
        slug: z.ZodString;
        slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
        name: z.ZodString;
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
    }, z.core.$strict>;
    profile: z.ZodObject<{
        summary: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
        links: z.ZodObject<{
            site: z.ZodURL;
            pricing: z.ZodOptional<z.ZodURL>;
        }, z.core.$strict>;
    }, z.core.$strict>;
    sources: z.ZodArray<z.ZodObject<{
        source_id: z.ZodString;
        url: z.ZodURL;
    }, z.core.$strict>>;
    programs: z.ZodArray<z.ZodObject<{
        program_id: z.ZodString;
        program_slug: z.ZodString;
        program_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
        title: z.ZodString;
        summary: z.ZodOptional<z.ZodString>;
        source_ids: z.ZodArray<z.ZodString>;
    }, z.core.$strict>>;
    offers: z.ZodArray<z.ZodObject<{
        offer_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_slug: z.ZodString;
        offer_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
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
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>, z.ZodObject<{
                benefit_id: z.ZodString;
                description: z.ZodString;
                kind: z.ZodLiteral<"other">;
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
        source_ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
        declared: z.ZodOptional<z.ZodLiteral<true>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const entityAuthoringSchema: z.ZodObject<{
    schema_version: z.ZodLiteral<"sourcey.entity-authoring/v1alpha1">;
    programs: z.ZodArray<z.ZodObject<{
        program_id: z.ZodString;
        program_slug: z.ZodString;
        program_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
        title: z.ZodString;
        summary: z.ZodOptional<z.ZodString>;
        source_ids: z.ZodArray<z.ZodString>;
    }, z.core.$strict>>;
    entity: z.ZodObject<{
        entity_id: z.ZodString;
        slug: z.ZodString;
        slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
        name: z.ZodString;
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
    }, z.core.$strict>;
    profile: z.ZodObject<{
        summary: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
        links: z.ZodObject<{
            site: z.ZodURL;
            pricing: z.ZodOptional<z.ZodURL>;
        }, z.core.$strict>;
    }, z.core.$strict>;
    sources: z.ZodArray<z.ZodObject<{
        source_id: z.ZodString;
        url: z.ZodURL;
    }, z.core.$strict>>;
    offers: z.ZodArray<z.ZodObject<{
        offer_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_slug: z.ZodString;
        offer_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
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
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>, z.ZodObject<{
                benefit_id: z.ZodString;
                description: z.ZodString;
                kind: z.ZodLiteral<"other">;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>;
        eligibility: z.ZodObject<{
            rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
        }, z.core.$strict>;
        roles: z.ZodObject<{
            terms_authority_entity_id: z.ZodString;
            access_operator_entity_id: z.ZodString;
        }, z.core.$strict>;
        source_ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
        declared: z.ZodOptional<z.ZodLiteral<true>>;
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
            public_code: z.ZodOptional<z.ZodString>;
            url: z.ZodOptional<z.ZodURL>;
            instructions: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        terms_url: z.ZodOptional<z.ZodURL>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const contributionEntityAuthoringSchema: z.ZodObject<{
    schema_version: z.ZodLiteral<"sourcey.entity-authoring/v1alpha1">;
    programs: z.ZodArray<z.ZodObject<{
        program_id: z.ZodString;
        program_slug: z.ZodString;
        program_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
        title: z.ZodString;
        summary: z.ZodOptional<z.ZodString>;
        source_ids: z.ZodArray<z.ZodString>;
    }, z.core.$strict>>;
    entity: z.ZodObject<{
        entity_id: z.ZodString;
        slug: z.ZodString;
        slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
        name: z.ZodString;
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
    }, z.core.$strict>;
    profile: z.ZodObject<{
        summary: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
        links: z.ZodObject<{
            site: z.ZodURL;
            pricing: z.ZodOptional<z.ZodURL>;
        }, z.core.$strict>;
    }, z.core.$strict>;
    sources: z.ZodArray<z.ZodObject<{
        source_id: z.ZodString;
        url: z.ZodURL;
    }, z.core.$strict>>;
    offers: z.ZodArray<z.ZodObject<{
        offer_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_slug: z.ZodString;
        offer_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
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
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>, z.ZodObject<{
                benefit_id: z.ZodString;
                description: z.ZodString;
                kind: z.ZodLiteral<"other">;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>;
        eligibility: z.ZodObject<{
            rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
        }, z.core.$strict>;
        roles: z.ZodObject<{
            terms_authority_entity_id: z.ZodString;
            access_operator_entity_id: z.ZodString;
        }, z.core.$strict>;
        source_ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
        declared: z.ZodOptional<z.ZodLiteral<true>>;
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
            public_code: z.ZodOptional<z.ZodString>;
            url: z.ZodOptional<z.ZodURL>;
            instructions: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        terms_url: z.ZodOptional<z.ZodURL>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type EntityAuthoring = z.infer<typeof entityAuthoringSchema>;
export declare function parseEntityAuthoring(input: unknown): EntityAuthoring;
export type EntityIdentityAuthoring = z.infer<typeof entityIdentityAuthoringSchema>;
export type AuthoringProgram = z.infer<typeof authoringProgramSchema>;
export type AuthoringOffer = z.infer<typeof authoringOfferSchema>;
/**
 * The one canonical order of an Entity's domains. Authoring order carries no
 * meaning (the primary is marked by role), so every compiled revision and every
 * identity comparison sorts by value, then role, then validity start.
 */
export declare function canonicalEntityDomains<Domain extends {
    readonly value: string;
    readonly role: string;
    readonly valid_from: string;
}>(domains: readonly Domain[]): Domain[];
/**
 * The one shared Entity identity envelope in its canonical order. Authoring
 * files, retained Catalog documents and declaration repositories may each
 * list the same aliases and domains differently; identity digests and
 * identity comparisons read this form so order never separates one identity
 * into two.
 */
export declare function canonicalEntityIdentity(identity: unknown): EntityIdentityAuthoring;
//# sourceMappingURL=index.d.ts.map