import { DIGEST_PATTERN, IDENTIFIER_PATTERN } from "provenry/primitives";
import { z } from "zod";
import { ENTITY_ID_PATTERN, isFunctionalAccessQueryParameter, isTrackingQueryParameter, OFFER_ID_PATTERN, PROGRAM_ID_PATTERN, } from "../../../modules/catalog-primitives/src/index.js";
const digest = z.string().regex(DIGEST_PATTERN);
const entityId = z.string().regex(ENTITY_ID_PATTERN);
const programId = z.string().regex(PROGRAM_ID_PATTERN);
const offerId = z.string().regex(OFFER_ID_PATTERN);
const identifier = z.string().regex(IDENTIFIER_PATTERN);
const instant = z.iso.datetime({ offset: true });
const currency = z.string().regex(/^[A-Z]{3}$/);
const duration = z
    .string()
    .regex(/^P(?=\d|T\d)(?:\d+Y)?(?:\d+M)?(?:\d+D)?(?:T(?:\d+H)?(?:\d+M)?(?:\d+S)?)?$/);
const factKey = z.string().regex(/^[a-z][a-z0-9_-]*(?:\.[a-z][a-z0-9_-]*)+$/);
/**
 * Canonical discriminants for the three core Catalog revision documents.
 * Consumers import these values instead of reproducing wire-contract strings.
 */
export const catalogRevisionContracts = {
    entity: "sourcey.entity-revision/v1alpha1",
    program: "sourcey.program-revision/v1alpha1",
    offer: "sourcey.offer-revision/v1alpha1",
};
/**
 * The compact public synopsis used by catalog listings, metadata, and page
 * ledes. Longer explanatory copy belongs in the adjacent description field;
 * structured economics, eligibility, and access remain authoritative.
 */
export const catalogSummarySchema = z
    .string()
    .min(1)
    .max(240, "Summary is the public synopsis and must be at most 240 characters; put longer context in description.");
/** Long-form plain text. Resource limits belong to the enclosing document boundary. */
export const catalogDescriptionSchema = z.string().min(1);
export const catalogUrlSchema = z.url().superRefine((value, context) => {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) {
        context.addIssue({
            code: "custom",
            message: "Catalog URLs must be credential-free HTTPS.",
        });
    }
});
export const catalogAuthoringUrlSchema = catalogUrlSchema.superRefine((value, context) => {
    const url = new URL(value);
    if (url.hash) {
        context.addIssue({
            code: "custom",
            message: "Current Catalog URLs cannot carry fragments; use the clean canonical page URL.",
        });
    }
    const trackingParameters = [...new Set(url.searchParams.keys())]
        .filter(isTrackingQueryParameter)
        .sort();
    if (trackingParameters.length > 0) {
        context.addIssue({
            code: "custom",
            message: `Catalog URLs cannot carry tracking parameters (${trackingParameters.join(", ")}); keep only parameters required to select or redeem the offer, program, plan, or code.`,
        });
    }
});
export const catalogAccessUrlSchema = catalogAuthoringUrlSchema.superRefine((value, context) => {
    const unsupportedParameters = [...new Set(new URL(value).searchParams.keys())]
        .filter((name) => !isFunctionalAccessQueryParameter(name))
        .sort();
    if (unsupportedParameters.length > 0) {
        context.addIssue({
            code: "custom",
            message: `Offer access URLs may use only functional offer selectors; unsupported parameters: ${unsupportedParameters.join(", ")}.`,
        });
    }
});
export const domainSchema = z
    .object({
    value: z.string().min(1),
    role: z.enum(["primary", "alias"]),
    valid_from: instant,
    valid_until: instant.optional(),
})
    .strict();
/** The single current primary domain, or undefined when the identity is invalid. */
export function currentEntityPrimaryDomainValue(domains) {
    const current = domains.filter((domain) => domain.role === "primary" && domain.valid_until === undefined);
    return current.length === 1 ? current[0]?.value.toLowerCase() : undefined;
}
/** True only for the canonical domain itself or one of its DNS subdomains. */
export function hostnameIsWithinDomain(hostname, domain) {
    const normalizedHostname = hostname.toLowerCase();
    const normalizedDomain = domain.toLowerCase();
    return (normalizedHostname === normalizedDomain || normalizedHostname.endsWith(`.${normalizedDomain}`));
}
export function entityOfficialSiteProblem(domains, site) {
    const primary = currentEntityPrimaryDomainValue(domains);
    if (!primary)
        return "primary-domain-count";
    try {
        const hostname = new URL(site).hostname;
        return domains.some((domain) => domain.valid_until === undefined && hostnameIsWithinDomain(hostname, domain.value))
            ? undefined
            : "site-outside-current-domains";
    }
    catch {
        return undefined;
    }
}
/**
 * An Entity's official site participates in identity and outbound-link trust,
 * so it must remain inside one of the identity epoch's current domain boundaries.
 */
export function entityOfficialSiteInvariant(value, context) {
    const problem = entityOfficialSiteProblem(value.domains, value.links.site);
    if (problem === "primary-domain-count") {
        context.addIssue({
            code: "custom",
            path: ["domains"],
            message: "Exactly one current primary domain is required.",
        });
        return;
    }
    if (problem === "site-outside-current-domains") {
        context.addIssue({
            code: "custom",
            path: ["links", "site"],
            message: "The official site must use a current Entity domain or one of its subdomains.",
        });
    }
}
export const moneySchema = z
    .object({
    currency,
    minor_units: z.number().int().nonnegative(),
})
    .strict();
export const moneyValueSchema = z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("exact"), amount: moneySchema }).strict(),
    z.object({ kind: z.literal("up-to"), amount: moneySchema }).strict(),
    z.object({ kind: z.literal("at-least"), amount: moneySchema }).strict(),
    z
        .object({
        kind: z.literal("range"),
        minimum: moneySchema,
        maximum: moneySchema,
    })
        .strict()
        .superRefine((value, context) => {
        if (value.minimum.currency !== value.maximum.currency ||
            value.minimum.minor_units > value.maximum.minor_units) {
            context.addIssue({
                code: "custom",
                message: "A monetary range requires one currency and an ordered minimum/maximum.",
            });
        }
    }),
]);
export const percentageValueSchema = z.discriminatedUnion("kind", [
    z
        .object({
        kind: z.literal("exact"),
        basis_points: z.number().int().min(1).max(10_000),
    })
        .strict(),
    z
        .object({
        kind: z.literal("up-to"),
        basis_points: z.number().int().min(1).max(10_000),
    })
        .strict(),
    z
        .object({
        kind: z.literal("at-least"),
        basis_points: z.number().int().min(1).max(10_000),
    })
        .strict(),
    z
        .object({
        kind: z.literal("range"),
        minimum_basis_points: z.number().int().min(1).max(10_000),
        maximum_basis_points: z.number().int().min(1).max(10_000),
    })
        .strict()
        .superRefine((value, context) => {
        if (value.minimum_basis_points > value.maximum_basis_points) {
            context.addIssue({
                code: "custom",
                message: "A percentage range requires an ordered minimum/maximum.",
            });
        }
    }),
]);
export const durationValueSchema = z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("exact"), value: duration }).strict(),
    z.object({ kind: z.literal("up-to"), value: duration }).strict(),
    z.object({ kind: z.literal("at-least"), value: duration }).strict(),
]);
const benefitBase = {
    benefit_id: identifier,
    description: z.string().min(1).max(500),
};
/** A benefit's named scope: the plan a discount applies to, the item waived, the free service. */
export const benefitTextSchema = z.string().min(1).max(240);
export const cashbackValueSchema = z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("money"), value: moneyValueSchema }).strict(),
    z.object({ kind: z.literal("percentage"), value: percentageValueSchema }).strict(),
]);
export const benefitSchema = z.discriminatedUnion("kind", [
    z
        .object({
        ...benefitBase,
        kind: z.literal("credit"),
        value: moneyValueSchema,
        duration: durationValueSchema.optional(),
    })
        .strict(),
    z
        .object({
        ...benefitBase,
        kind: z.literal("discount"),
        percentage: percentageValueSchema,
        applies_to: benefitTextSchema.optional(),
        duration: durationValueSchema.optional(),
    })
        .strict(),
    z
        .object({
        ...benefitBase,
        kind: z.literal("cashback"),
        value: cashbackValueSchema,
        duration: durationValueSchema.optional(),
    })
        .strict(),
    z
        .object({
        ...benefitBase,
        kind: z.literal("waiver"),
        waived_item: benefitTextSchema,
    })
        .strict(),
    z
        .object({
        ...benefitBase,
        kind: z.literal("free-service"),
        service: benefitTextSchema,
        duration: durationValueSchema.optional(),
    })
        .strict(),
    z
        .object({
        ...benefitBase,
        kind: z.literal("other"),
    })
        .strict(),
]);
export const considerationSchema = z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("none") }).strict(),
    z.object({ kind: z.literal("fixed"), amount: moneySchema }).strict(),
    z
        .object({
        kind: z.literal("variable"),
        description: z.string().min(1).max(500),
    })
        .strict(),
    z
        .object({
        kind: z.literal("unknown"),
        description: z.string().min(1).max(500),
    })
        .strict(),
]);
export const economicsSchema = z
    .object({
    consideration: considerationSchema,
    benefits: z.array(benefitSchema).min(1),
})
    .strict()
    .superRefine((value, context) => {
    assertUniqueIdentifiers(value.benefits.map((benefit) => benefit.benefit_id), "benefit_id", context);
});
export const eligibilityFactValueSchema = z.discriminatedUnion("type", [
    z.object({ type: z.literal("null") }).strict(),
    z.object({ type: z.literal("string"), value: z.string() }).strict(),
    z.object({ type: z.literal("number"), value: z.number().finite() }).strict(),
    z.object({ type: z.literal("boolean"), value: z.boolean() }).strict(),
    z.object({ type: z.literal("date"), value: z.iso.date() }).strict(),
    z.object({ type: z.literal("string-set"), values: z.array(z.string()) }).strict(),
    z.object({ type: z.literal("number-set"), values: z.array(z.number().finite()) }).strict(),
]);
export const eligibilityFactsSchema = z.record(factKey, eligibilityFactValueSchema);
const scalarFactValueSchema = z.discriminatedUnion("type", [
    z.object({ type: z.literal("string"), value: z.string() }).strict(),
    z.object({ type: z.literal("number"), value: z.number().finite() }).strict(),
    z.object({ type: z.literal("boolean"), value: z.boolean() }).strict(),
    z.object({ type: z.literal("date"), value: z.iso.date() }).strict(),
]);
const setFactValueSchema = z.discriminatedUnion("type", [
    z.object({ type: z.literal("string-set"), values: z.array(z.string()).min(1) }).strict(),
    z.object({ type: z.literal("number-set"), values: z.array(z.number().finite()).min(1) }).strict(),
]);
const orderedFactValueSchema = z.discriminatedUnion("type", [
    z.object({ type: z.literal("number"), value: z.number().finite() }).strict(),
    z.object({ type: z.literal("date"), value: z.iso.date() }).strict(),
]);
const criterionBase = {
    criterion_id: identifier,
    statement: z.string().min(1).max(500),
};
/** The typed comparisons a condition makes, each preceded by the fields `head` adds. */
function eligibilityConditionVariants(head) {
    return [
        z.object({ ...head, fact: factKey, operator: z.enum(["present", "absent"]) }).strict(),
        z
            .object({
            ...head,
            fact: factKey,
            operator: z.enum(["eq", "neq", "contains"]),
            value: scalarFactValueSchema,
        })
            .strict(),
        z
            .object({ ...head, fact: factKey, operator: z.literal("in"), value: setFactValueSchema })
            .strict(),
        z
            .object({
            ...head,
            fact: factKey,
            operator: z.enum(["lt", "lte", "gt", "gte"]),
            value: orderedFactValueSchema,
        })
            .strict(),
    ];
}
/** A fact, an operator and its value: what evidence extraction reports for a page threshold. */
export const eligibilityConditionSchema = z.union(eligibilityConditionVariants({}));
/** One typed eligibility condition, with its criterion identity and statement. */
export const eligibilityPredicateSchema = z.union(eligibilityConditionVariants({ kind: z.literal("predicate"), ...criterionBase }));
export const eligibilityManualSchema = z
    .object({
    kind: z.literal("manual"),
    ...criterionBase,
    reason: z.enum([
        "vendor-discretion",
        "external-verification",
        "not-machine-evaluable",
        "other",
    ]),
})
    .strict();
export const eligibilityConstantSchema = z
    .object({
    kind: z.literal("constant"),
    ...criterionBase,
    value: z.boolean(),
})
    .strict();
export const eligibilityRuleSchema = z.lazy(() => z.union([
    eligibilityPredicateSchema,
    eligibilityManualSchema,
    eligibilityConstantSchema,
    z.object({ kind: z.literal("all"), rules: z.array(eligibilityRuleSchema).min(1) }).strict(),
    z.object({ kind: z.literal("any"), rules: z.array(eligibilityRuleSchema).min(1) }).strict(),
    z
        .object({
        kind: z.literal("not"),
        rule: eligibilityRuleSchema,
    })
        .strict(),
]));
export const eligibilitySchema = z
    .object({
    rule: eligibilityRuleSchema,
})
    .strict()
    .superRefine((value, context) => {
    assertUniqueIdentifiers(collectCriterionIds(value.rule), "criterion_id", context);
});
export const eligibilityOutcomeSchema = z.enum(["met", "unmet", "unknown"]);
export const eligibilityTraceSchema = z.lazy(() => z.union([
    z
        .object({
        kind: z.enum(["all", "any"]),
        outcome: eligibilityOutcomeSchema,
        rules: z.array(eligibilityTraceSchema).min(1),
    })
        .strict(),
    z
        .object({
        kind: z.literal("not"),
        outcome: eligibilityOutcomeSchema,
        rule: eligibilityTraceSchema,
    })
        .strict(),
    z
        .object({
        kind: z.enum(["predicate", "manual", "constant"]),
        criterion_id: identifier,
        statement: z.string().min(1).max(500),
        outcome: eligibilityOutcomeSchema,
    })
        .strict(),
]));
export const eligibilityEvaluationSchema = z
    .object({
    eligible: z.boolean().nullable(),
    trace: eligibilityTraceSchema,
})
    .strict();
export const offerRolesSchema = z
    .object({
    terms_authority_entity_id: entityId,
    access_operator_entity_id: entityId,
})
    .strict();
export const accessSchema = z
    .object({
    availability: z.enum(["public", "referral", "membership", "invite", "automatic", "other"]),
    method: z.enum(["form", "code", "contact", "automatic", "other"]),
    url: catalogUrlSchema.optional(),
    public_code: z.string().min(1).max(200).optional(),
    instructions: z.string().min(1).max(1_000).optional(),
})
    .strict()
    .superRefine((value, context) => {
    if (value.method === "form" && value.url === undefined) {
        context.addIssue({ code: "custom", path: ["url"], message: "Form access requires a URL." });
    }
    if (value.method === "code" && value.public_code === undefined) {
        context.addIssue({
            code: "custom",
            path: ["public_code"],
            message: "Code access requires a public code.",
        });
    }
});
/**
 * Migration invariant: an Entity without a summary uses its description as the
 * synopsis surface, so it keeps the synopsis bound. Once every Entity carries
 * a summary, summary becomes required and this refinement drops.
 */
export function entitySynopsisInvariant(value, context) {
    if (value.summary === undefined && value.description.length > 200) {
        context.addIssue({
            code: "custom",
            path: ["description"],
            message: "Entities without a summary use description as the synopsis; add summary before long-form description.",
        });
    }
}
export const entityRevisionContentSchema = z
    .object({
    name: z.string().min(1),
    summary: catalogSummarySchema.optional(),
    description: catalogDescriptionSchema,
    domains: z.array(domainSchema).min(1),
    category: z.string().min(1),
    links: z
        .object({
        site: catalogUrlSchema,
        pricing: catalogUrlSchema.optional(),
    })
        .strict(),
})
    .strict()
    .superRefine(entitySynopsisInvariant)
    .superRefine(entityOfficialSiteInvariant);
export const entityRevisionCoreSchema = z
    .object({
    revision_contract: z.literal(catalogRevisionContracts.entity),
    entity_id: entityId,
    content: entityRevisionContentSchema,
})
    .strict();
export const entityRevisionSchema = entityRevisionCoreSchema
    .extend({
    revision_digest: digest,
})
    .strict();
export const programRevisionContentSchema = z
    .object({
    title: z.string().min(1),
    summary: catalogSummarySchema.optional(),
})
    .strict();
export const programRevisionCoreSchema = z
    .object({
    revision_contract: z.literal(catalogRevisionContracts.program),
    entity_id: entityId,
    program_id: programId,
    content: programRevisionContentSchema,
})
    .strict();
export const programRevisionSchema = programRevisionCoreSchema
    .extend({
    revision_digest: digest,
})
    .strict();
export const lifecycleStatusSchema = z.enum(["active", "ended", "withdrawn"]);
export const offerRevisionContentSchema = z
    .object({
    title: z.string().min(1),
    summary: catalogSummarySchema,
    description: catalogDescriptionSchema.optional(),
    lifecycle: z
        .object({
        status: lifecycleStatusSchema,
        effective_from: instant,
        effective_until: instant.optional(),
    })
        .strict(),
    economics: economicsSchema,
    eligibility: eligibilitySchema,
    roles: offerRolesSchema,
    access: accessSchema,
    terms_url: catalogUrlSchema.optional(),
})
    .strict();
export const offerRevisionCoreSchema = z
    .object({
    revision_contract: z.literal(catalogRevisionContracts.offer),
    entity_id: entityId,
    program_id: programId.optional(),
    offer_id: offerId,
    content: offerRevisionContentSchema,
})
    .strict();
export const offerRevisionSchema = offerRevisionCoreSchema
    .extend({
    revision_digest: digest,
})
    .strict();
function collectCriterionIds(rule) {
    if (rule.kind === "all" || rule.kind === "any")
        return rule.rules.flatMap(collectCriterionIds);
    if (rule.kind === "not")
        return collectCriterionIds(rule.rule);
    return [rule.criterion_id];
}
function assertUniqueIdentifiers(values, label, context) {
    const seen = new Set();
    for (const value of values) {
        if (seen.has(value)) {
            context.addIssue({ code: "custom", message: `${label} values must be unique.` });
            return;
        }
        seen.add(value);
    }
}
//# sourceMappingURL=index.js.map