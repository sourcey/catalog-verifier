import { z } from "zod";
import { DIGEST_PATTERN } from "../../../modules/primitives/src/index.js";
import { evidenceDerivationRuleSchema, evidenceProofKindSchema } from "../../evidence/src/index.js";
const digest = z.string().regex(DIGEST_PATTERN);
const pointer = z.string().regex(/^\/(?:[^~/]|~0|~1)+(?:\/(?:[^~/]|~0|~1)+)*$/);
export const coverageRequirementSchema = z
    .object({
    path: pointer,
    proof_kinds: z.array(evidenceProofKindSchema).min(1).max(3),
    derivation_rules: z.array(evidenceDerivationRuleSchema).max(4),
    guidance: z.string().min(1).max(500),
})
    .strict()
    .superRefine((value, context) => {
    if (new Set(value.proof_kinds).size !== value.proof_kinds.length) {
        context.addIssue({
            code: "custom",
            path: ["proof_kinds"],
            message: "Coverage requirement proof kinds must be unique.",
        });
    }
    if (new Set(value.derivation_rules).size !== value.derivation_rules.length) {
        context.addIssue({
            code: "custom",
            path: ["derivation_rules"],
            message: "Coverage requirement derivation rules must be unique.",
        });
    }
    if (value.proof_kinds.includes("derived") !== value.derivation_rules.length > 0) {
        context.addIssue({
            code: "custom",
            path: ["derivation_rules"],
            message: value.proof_kinds.includes("derived")
                ? "A derived coverage requirement must declare its accepted rules."
                : "Only a derived coverage requirement may declare derivation rules.",
        });
    }
});
export const coveragePolicyCoreSchema = z
    .object({
    policy_contract: z.literal("sourcey.coverage/v1alpha1"),
    version: z.string().min(1),
    entity_requirements: z.array(coverageRequirementSchema).min(1),
    program_requirements: z.array(coverageRequirementSchema).min(1),
    offer_requirements: z.array(coverageRequirementSchema).min(1),
})
    .strict()
    .superRefine((value, context) => {
    for (const key of [
        "entity_requirements",
        "program_requirements",
        "offer_requirements",
    ]) {
        const paths = value[key].map(({ path }) => path);
        if (new Set(paths).size !== paths.length) {
            context.addIssue({
                code: "custom",
                path: [key],
                message: "Coverage requirement paths must be unique per subject kind.",
            });
        }
    }
});
export const coveragePolicySchema = coveragePolicyCoreSchema
    .extend({
    policy_digest: digest,
})
    .strict();
/**
 * Current Catalog policy completeness. Historical content-addressed policies
 * continue to parse under the contract that produced their releases, while a
 * production target must account for every current public factual root. An
 * optional field is applicable only when a revision publishes it.
 */
export const currentCatalogMaterialClaimPaths = {
    entity: ["/category", "/description", "/domains", "/links", "/name", "/summary"],
    program: ["/summary", "/title"],
    offer: [
        "/access",
        "/description",
        "/economics",
        "/eligibility",
        "/lifecycle",
        "/roles",
        "/summary",
        "/terms_url",
        "/title",
    ],
};
export function assertCurrentCoveragePolicyClaimClosure(policy) {
    for (const [kind, requirements] of [
        ["entity", policy.entity_requirements],
        ["program", policy.program_requirements],
        ["offer", policy.offer_requirements],
    ]) {
        const expected = currentCatalogMaterialClaimPaths[kind];
        const actual = requirements.map(({ path }) => path).sort();
        if (actual.length !== expected.length ||
            actual.some((path, index) => path !== expected[index])) {
            throw new Error(`Current ${kind} coverage policy must exactly cover: ${expected.join(", ")}.`);
        }
        if (requirements.some((requirement) => requirement.proof_kinds.includes("attested"))) {
            throw new Error(`Current ${kind} coverage policy cannot treat vendor attestation as independent evidence.`);
        }
    }
    return policy;
}
export const freshnessPolicyCoreSchema = z
    .object({
    policy_contract: z.literal("sourcey.freshness/v1alpha1"),
    version: z.string().min(1),
    /* Method names are owned by evidence producers, not by this generic
       policy contract. Every admitted method must have an explicit budget. */
    max_age_days: z
        .record(z.string().min(1), z.number().int().positive())
        .refine((value) => Object.keys(value).length > 0, "Freshness policy must declare at least one method age budget."),
})
    .strict();
export const freshnessPolicySchema = freshnessPolicyCoreSchema
    .extend({
    policy_digest: digest,
})
    .strict();
//# sourceMappingURL=index.js.map