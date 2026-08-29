import { z } from "zod";
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
        primary: "primary";
        alias: "alias";
    }>;
    valid_from: z.ZodISODateTime;
    valid_until: z.ZodOptional<z.ZodISODateTime>;
}, z.core.$strict>;
export declare const moneySchema: z.ZodObject<{
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
}, z.core.$strict>], "kind">;
export declare const benefitSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
export declare const eligibilityFactValueSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
declare const eligibilityPredicateSchema: z.ZodUnion<readonly [z.ZodObject<{
    fact: z.ZodString;
    operator: z.ZodEnum<{
        absent: "absent";
        present: "present";
    }>;
    criterion_id: z.ZodString;
    statement: z.ZodString;
    kind: z.ZodLiteral<"predicate">;
}, z.core.$strict>, z.ZodObject<{
    fact: z.ZodString;
    operator: z.ZodEnum<{
        eq: "eq";
        neq: "neq";
        contains: "contains";
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
    criterion_id: z.ZodString;
    statement: z.ZodString;
    kind: z.ZodLiteral<"predicate">;
}, z.core.$strict>, z.ZodObject<{
    fact: z.ZodString;
    operator: z.ZodLiteral<"in">;
    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"string-set">;
        values: z.ZodArray<z.ZodString>;
    }, z.core.$strict>, z.ZodObject<{
        type: z.ZodLiteral<"number-set">;
        values: z.ZodArray<z.ZodNumber>;
    }, z.core.$strict>], "type">;
    criterion_id: z.ZodString;
    statement: z.ZodString;
    kind: z.ZodLiteral<"predicate">;
}, z.core.$strict>, z.ZodObject<{
    fact: z.ZodString;
    operator: z.ZodEnum<{
        lt: "lt";
        lte: "lte";
        gt: "gt";
        gte: "gte";
    }>;
    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"number">;
        value: z.ZodNumber;
    }, z.core.$strict>, z.ZodObject<{
        type: z.ZodLiteral<"date">;
        value: z.ZodISODate;
    }, z.core.$strict>], "type">;
    criterion_id: z.ZodString;
    statement: z.ZodString;
    kind: z.ZodLiteral<"predicate">;
}, z.core.$strict>]>;
declare const eligibilityManualSchema: z.ZodObject<{
    reason: z.ZodEnum<{
        other: "other";
        "vendor-discretion": "vendor-discretion";
        "external-verification": "external-verification";
        "not-machine-evaluable": "not-machine-evaluable";
    }>;
    criterion_id: z.ZodString;
    statement: z.ZodString;
    kind: z.ZodLiteral<"manual">;
}, z.core.$strict>;
declare const eligibilityConstantSchema: z.ZodObject<{
    value: z.ZodBoolean;
    criterion_id: z.ZodString;
    statement: z.ZodString;
    kind: z.ZodLiteral<"constant">;
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
export declare const eligibilityRuleSchema: z.ZodType<EligibilityRule>;
export declare const eligibilitySchema: z.ZodObject<{
    rule: z.ZodType<EligibilityRule, unknown, z.core.$ZodTypeInternals<EligibilityRule, unknown>>;
}, z.core.$strict>;
export declare const eligibilityOutcomeSchema: z.ZodEnum<{
    unknown: "unknown";
    met: "met";
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
export declare const eligibilityTraceSchema: z.ZodType<EligibilityTrace>;
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
        rule: z.ZodType<EligibilityRule, unknown, z.core.$ZodTypeInternals<EligibilityRule, unknown>>;
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
            rule: z.ZodType<EligibilityRule, unknown, z.core.$ZodTypeInternals<EligibilityRule, unknown>>;
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
            rule: z.ZodType<EligibilityRule, unknown, z.core.$ZodTypeInternals<EligibilityRule, unknown>>;
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
export type OfferRoles = z.infer<typeof offerRolesSchema>;
export type Access = z.infer<typeof accessSchema>;
export type EntityRevisionCore = z.infer<typeof entityRevisionCoreSchema>;
export type EntityRevision = z.infer<typeof entityRevisionSchema>;
export type ProgramRevisionCore = z.infer<typeof programRevisionCoreSchema>;
export type ProgramRevision = z.infer<typeof programRevisionSchema>;
export type OfferRevisionCore = z.infer<typeof offerRevisionCoreSchema>;
export type OfferRevision = z.infer<typeof offerRevisionSchema>;
export {};
//# sourceMappingURL=index.d.ts.map