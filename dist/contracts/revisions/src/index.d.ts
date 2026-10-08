import { z } from "zod";
/**
 * Canonical discriminants for the three core Catalog revision documents.
 * Consumers import these values instead of reproducing wire-contract strings.
 */
export declare const catalogRevisionContracts: {
    readonly entity: "sourcey.entity-revision/v1alpha1";
    readonly program: "sourcey.program-revision/v1alpha1";
    readonly offer: "sourcey.offer-revision/v1alpha1";
};
/**
 * The compact public synopsis used by catalog listings, metadata, and page
 * ledes. Longer explanatory copy belongs in the adjacent description field;
 * structured economics, eligibility, and access remain authoritative.
 */
export declare const catalogSummarySchema: z.ZodString;
/** Long-form plain text. Resource limits belong to the enclosing document boundary. */
export declare const catalogDescriptionSchema: z.ZodString;
export declare const catalogUrlSchema: z.ZodURL;
export declare const catalogAuthoringUrlSchema: z.ZodURL;
export declare const catalogAccessUrlSchema: z.ZodURL;
export declare const domainSchema: z.ZodObject<{
    value: z.ZodString;
    role: z.ZodEnum<{
        alias: "alias";
        primary: "primary";
    }>;
    valid_from: z.ZodISODateTime;
    valid_until: z.ZodOptional<z.ZodISODateTime>;
}, z.core.$strict>;
type EntityDomain = z.infer<typeof domainSchema>;
/** The single current primary domain, or undefined when the identity is invalid. */
export declare function currentEntityPrimaryDomainValue(domains: readonly EntityDomain[]): string | undefined;
/** True only for the canonical domain itself or one of its DNS subdomains. */
export declare function hostnameIsWithinDomain(hostname: string, domain: string): boolean;
export declare function entityOfficialSiteProblem(domains: readonly EntityDomain[], site: string): "primary-domain-count" | "site-outside-current-domains" | undefined;
declare const moneySchema: z.ZodObject<{
    currency: z.ZodString;
    minor_units: z.ZodNumber;
}, z.core.$strict>;
export declare const moneyValueSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
export declare const percentageValueSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
export declare const durationValueSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
}, z.core.$strict>], "kind">;
/** A benefit's named scope: the plan a discount applies to, the item waived, the free service. */
export declare const benefitTextSchema: z.ZodString;
export declare const cashbackValueSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
export declare const benefitSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
}, z.core.$strict>], "kind">;
export declare const considerationSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
export declare const economicsSchema: z.ZodObject<{
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
declare const eligibilityFactValueSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"null">;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"string">;
    value: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"number">;
    value: z.ZodNumber;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"boolean">;
    value: z.ZodBoolean;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"date">;
    value: z.ZodISODate;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"string-set">;
    values: z.ZodArray<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"number-set">;
    values: z.ZodArray<z.ZodNumber>;
}, z.core.$strict>], "type">;
export declare const eligibilityFactsSchema: z.ZodRecord<z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"null">;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"string">;
    value: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"number">;
    value: z.ZodNumber;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"boolean">;
    value: z.ZodBoolean;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"date">;
    value: z.ZodISODate;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"string-set">;
    values: z.ZodArray<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"number-set">;
    values: z.ZodArray<z.ZodNumber>;
}, z.core.$strict>], "type">>;
/**
 * The eligibility facts a page requirement is read into, one key per
 * quantity, each with what it means. A requirement none of them states
 * exactly is a statement, never a typed condition.
 */
export declare const ELIGIBILITY_FACT_VOCABULARY: {
    readonly "company.age_months": "number: months since the company was founded or incorporated";
    readonly "company.employee_count": "number: people the company employs";
    readonly "company.funding_raised_usd": "number: total outside funding the company has raised, in US dollars";
    readonly "company.annual_revenue_usd": "number: the company's revenue over a year, in US dollars";
    readonly "company.is_current_customer": "boolean: whether the company is a paying customer of the vendor now";
    readonly "company.is_incorporated": "boolean: whether the company is a registered legal entity";
    readonly "company.website_url": "presence: the company has a public website";
    readonly "company.stage": "string: the company's funding stage, as the page names it";
    readonly "company.industry": "string: the company's industry or kind of business, as the page names it";
    readonly "company.partner_memberships": "string-set: accelerators, programs, investors or partners the company belongs to, as the page names them";
    readonly "company.country_code": "string: ISO 3166-1 alpha-3 code of the country the company is in";
};
/** One typed eligibility condition, with its criterion identity and statement. */
export declare const eligibilityPredicateSchema: z.ZodUnion<readonly [z.ZodObject<{
    criterion_id: z.ZodString;
    statement: z.ZodString;
    fact: z.ZodString;
    operator: z.ZodEnum<{
        absent: "absent";
        present: "present";
    }>;
    kind: z.ZodLiteral<"predicate">;
}, z.core.$strict>, z.ZodObject<{
    criterion_id: z.ZodString;
    statement: z.ZodString;
    fact: z.ZodString;
    operator: z.ZodEnum<{
        contains: "contains";
        eq: "eq";
        neq: "neq";
    }>;
    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"string">;
        value: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        type: z.ZodLiteral<"number">;
        value: z.ZodNumber;
    }, z.core.$strict>, z.ZodObject<{
        type: z.ZodLiteral<"boolean">;
        value: z.ZodBoolean;
    }, z.core.$strict>, z.ZodObject<{
        type: z.ZodLiteral<"date">;
        value: z.ZodISODate;
    }, z.core.$strict>], "type">;
    kind: z.ZodLiteral<"predicate">;
}, z.core.$strict>, z.ZodObject<{
    criterion_id: z.ZodString;
    statement: z.ZodString;
    fact: z.ZodString;
    operator: z.ZodLiteral<"in">;
    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"string-set">;
        values: z.ZodArray<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        type: z.ZodLiteral<"number-set">;
        values: z.ZodArray<z.ZodNumber>;
    }, z.core.$strict>], "type">;
    kind: z.ZodLiteral<"predicate">;
}, z.core.$strict>, z.ZodObject<{
    criterion_id: z.ZodString;
    statement: z.ZodString;
    fact: z.ZodString;
    operator: z.ZodEnum<{
        gt: "gt";
        gte: "gte";
        lt: "lt";
        lte: "lte";
    }>;
    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"number">;
        value: z.ZodNumber;
    }, z.core.$strict>, z.ZodObject<{
        type: z.ZodLiteral<"date">;
        value: z.ZodISODate;
    }, z.core.$strict>], "type">;
    kind: z.ZodLiteral<"predicate">;
}, z.core.$strict>]>;
export declare const eligibilityManualSchema: z.ZodObject<{
    criterion_id: z.ZodString;
    statement: z.ZodString;
    kind: z.ZodLiteral<"manual">;
    reason: z.ZodEnum<{
        "external-verification": "external-verification";
        "not-machine-evaluable": "not-machine-evaluable";
        other: "other";
        "vendor-discretion": "vendor-discretion";
    }>;
}, z.core.$strict>;
export declare const eligibilityConstantSchema: z.ZodObject<{
    criterion_id: z.ZodString;
    statement: z.ZodString;
    kind: z.ZodLiteral<"constant">;
    value: z.ZodBoolean;
}, z.core.$strict>;
export type EligibilityFactValue = z.infer<typeof eligibilityFactValueSchema>;
export type EligibilityRule = z.infer<typeof eligibilityPredicateSchema> | z.infer<typeof eligibilityManualSchema> | z.infer<typeof eligibilityConstantSchema> | {
    readonly kind: "all";
    readonly rules: readonly EligibilityRule[];
} | {
    readonly kind: "any";
    readonly rules: readonly EligibilityRule[];
} | {
    readonly kind: "not";
    readonly rule: EligibilityRule;
};
export declare const eligibilitySchema: z.ZodObject<{
    rule: z.ZodType<EligibilityRule, unknown, z.core.$ZodTypeInternals<EligibilityRule, unknown>>;
}, z.core.$strict>;
declare const eligibilityOutcomeSchema: z.ZodEnum<{
    met: "met";
    unknown: "unknown";
    unmet: "unmet";
}>;
export type EligibilityOutcome = z.infer<typeof eligibilityOutcomeSchema>;
export type EligibilityTrace = {
    readonly kind: "all" | "any";
    readonly outcome: EligibilityOutcome;
    readonly rules: readonly EligibilityTrace[];
} | {
    readonly kind: "not";
    readonly outcome: EligibilityOutcome;
    readonly rule: EligibilityTrace;
} | {
    readonly kind: "predicate" | "manual" | "constant";
    readonly criterion_id: string;
    readonly statement: string;
    readonly outcome: EligibilityOutcome;
};
export declare const eligibilityEvaluationSchema: z.ZodObject<{
    eligible: z.ZodNullable<z.ZodBoolean>;
    trace: z.ZodType<EligibilityTrace, unknown, z.core.$ZodTypeInternals<EligibilityTrace, unknown>>;
}, z.core.$strict>;
export declare const offerRolesSchema: z.ZodObject<{
    terms_authority_entity_id: z.ZodString;
    access_operator_entity_id: z.ZodString;
}, z.core.$strict>;
export declare const accessSchema: z.ZodObject<{
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
/**
 * Migration invariant: an Entity without a summary uses its description as the
 * synopsis surface, so it keeps the synopsis bound. Once every Entity carries
 * a summary, summary becomes required and this refinement drops.
 */
export declare function entitySynopsisInvariant(value: {
    summary?: string | undefined;
    description: string;
}, context: z.core.$RefinementCtx): void;
export declare const entityRevisionContentSchema: z.ZodObject<{
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
export declare const entityRevisionCoreSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const entityRevisionSchema: z.ZodObject<{
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
export declare const programRevisionContentSchema: z.ZodObject<{
    title: z.ZodString;
    summary: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const programRevisionCoreSchema: z.ZodObject<{
    revision_contract: z.ZodLiteral<"sourcey.program-revision/v1alpha1">;
    entity_id: z.ZodString;
    program_id: z.ZodString;
    content: z.ZodObject<{
        title: z.ZodString;
        summary: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const programRevisionSchema: z.ZodObject<{
    revision_contract: z.ZodLiteral<"sourcey.program-revision/v1alpha1">;
    entity_id: z.ZodString;
    program_id: z.ZodString;
    content: z.ZodObject<{
        title: z.ZodString;
        summary: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    revision_digest: z.ZodString;
}, z.core.$strict>;
export declare const lifecycleStatusSchema: z.ZodEnum<{
    active: "active";
    ended: "ended";
    withdrawn: "withdrawn";
}>;
export declare const offerRevisionContentSchema: z.ZodObject<{
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
        rule: z.ZodType<EligibilityRule, unknown, z.core.$ZodTypeInternals<EligibilityRule, unknown>>;
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
export declare const offerRevisionCoreSchema: z.ZodObject<{
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
            rule: z.ZodType<EligibilityRule, unknown, z.core.$ZodTypeInternals<EligibilityRule, unknown>>;
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
}, z.core.$strict>;
export declare const offerRevisionSchema: z.ZodObject<{
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
            rule: z.ZodType<EligibilityRule, unknown, z.core.$ZodTypeInternals<EligibilityRule, unknown>>;
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
}, z.core.$strict>;
export type Domain = z.infer<typeof domainSchema>;
export type Money = z.infer<typeof moneySchema>;
export type MoneyValue = z.infer<typeof moneyValueSchema>;
export type PercentageValue = z.infer<typeof percentageValueSchema>;
export type DurationValue = z.infer<typeof durationValueSchema>;
export type Benefit = z.infer<typeof benefitSchema>;
export type Consideration = z.infer<typeof considerationSchema>;
export type Economics = z.infer<typeof economicsSchema>;
export type Eligibility = z.infer<typeof eligibilitySchema>;
export type EligibilityEvaluation = z.infer<typeof eligibilityEvaluationSchema>;
export type Access = z.infer<typeof accessSchema>;
export type EntityRevisionCore = z.infer<typeof entityRevisionCoreSchema>;
export type EntityRevision = z.infer<typeof entityRevisionSchema>;
export type ProgramRevisionCore = z.infer<typeof programRevisionCoreSchema>;
export type ProgramRevision = z.infer<typeof programRevisionSchema>;
export type OfferRevisionCore = z.infer<typeof offerRevisionCoreSchema>;
export type OfferRevision = z.infer<typeof offerRevisionSchema>;
/** A revision of a listing: the Entity, Program or Offer records evidence can bind. */
export type ListingRevision = EntityRevision | ProgramRevision | OfferRevision;
export {};
//# sourceMappingURL=index.d.ts.map