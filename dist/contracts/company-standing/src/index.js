import { DIGEST_PATTERN } from "provenry/primitives";
import { z } from "zod";
import { ENTITY_ID_PATTERN } from "../../../modules/catalog-primitives/src/index.js";
import { catalogAuthoringUrlSchema } from "../../revisions/src/index.js";
const digestSchema = z.string().regex(DIGEST_PATTERN);
const instantSchema = z.iso.datetime({ offset: true });
const entityIdSchema = z.string().regex(ENTITY_ID_PATTERN);
export const domainNameSchema = z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/u);
const standingRouteSchema = z.enum([
    "correction_required",
    "repair_required",
    "temporarily_unavailable",
    "free_machine_review",
    "human_verification_required",
]);
export const standingPolicySchema = z
    .object({
    policy_contract: z.literal("sourcey.standing-policy/v1alpha1"),
    reach_provider: z.literal("ahrefs-domain-rating"),
    reach_threshold_exclusive: z.number().int().min(0).max(100),
    fallback_domain_age_days: z.number().int().positive(),
    fallback_certificate_age_days: z.number().int().positive(),
    cache_ttl_seconds: z.number().int().positive().max(86_400),
})
    .strict();
export const standingEvidenceSchema = z
    .object({
    registrable_domain: domainNameSchema,
    official_source_url: catalogAuthoringUrlSchema,
    source: z
        .object({
        status: z.enum(["reachable", "unreachable", "invalid"]),
        first_party: z.boolean(),
        observed_at: instantSchema,
        observation_digest: digestSchema,
    })
        .strict(),
    catalog_identity: z.discriminatedUnion("status", [
        z.object({ status: z.literal("unresolved") }).strict(),
        z
            .object({
            status: z.literal("existing"),
            entity_id: entityIdSchema,
            entity_revision_digest: digestSchema,
        })
            .strict(),
        z
            .object({
            status: z.literal("ambiguous"),
            entity_ids: z.array(entityIdSchema).min(2),
        })
            .strict(),
    ]),
    reach: z.discriminatedUnion("status", [
        z
            .object({
            status: z.literal("available"),
            rating: z.number().min(0).max(100),
            observed_at: instantSchema,
            observation_digest: digestSchema,
        })
            .strict(),
        z
            .object({
            status: z.literal("unavailable"),
            reason: z.enum(["not_found", "provider_unavailable", "provider_rejected"]),
            observed_at: instantSchema,
        })
            .strict(),
    ]),
    domain_age: z.discriminatedUnion("status", [
        z
            .object({ status: z.literal("available"), age_days: z.number().int().nonnegative() })
            .strict(),
        z.object({ status: z.literal("unavailable") }).strict(),
    ]),
    certificate_age: z.discriminatedUnion("status", [
        z
            .object({ status: z.literal("available"), age_days: z.number().int().nonnegative() })
            .strict(),
        z.object({ status: z.literal("unavailable") }).strict(),
    ]),
    mx: z.discriminatedUnion("status", [
        z.object({ status: z.literal("available"), present: z.boolean() }).strict(),
        z.object({ status: z.literal("unavailable") }).strict(),
    ]),
})
    .strict();
export const standingResultCoreSchema = z
    .object({
    result_contract: z.literal("sourcey.standing-result/v1alpha1"),
    policy_digest: digestSchema,
    evidence_digest: digestSchema,
    registrable_domain: domainNameSchema,
    official_source_url: catalogAuthoringUrlSchema,
    route: standingRouteSchema,
    reasons: z.array(z.string().trim().min(1).max(500)).min(1).max(12),
    evaluated_at: instantSchema,
    expires_at: instantSchema,
})
    .strict();
export const standingResultSchema = standingResultCoreSchema
    .safeExtend({ result_digest: digestSchema })
    .strict();
export function isFirstPartyUrlForDomain(value, domain) {
    const hostname = new URL(value).hostname.toLowerCase().replace(/\.$/u, "");
    const canonicalDomain = domainNameSchema.parse(domain);
    return hostname === canonicalDomain || hostname.endsWith(`.${canonicalDomain}`);
}
/**
 * What admitted a new company: the Sourcey-retained standing assessment of its domain and
 * official source that routed it, bound to the Entity identity Sourcey derived for it. A company
 * below the bar also names the person's verification that admitted it. Final admission verifies
 * the binding again against the same retained assessment.
 */
export const companyAdmissionBindingSchema = z
    .object({
    binding_contract: z.literal("sourcey.company-admission-binding/v1alpha1"),
    entity_id: entityIdSchema,
    registrable_domain: domainNameSchema,
    official_source_url: catalogAuthoringUrlSchema,
    route: z.enum(["free_machine_review", "human_verification_required"]),
    result_digest: digestSchema,
    evidence_digest: digestSchema,
    policy_digest: digestSchema,
    expires_at: instantSchema,
    /** The person's verification that admits a company below the bar: its exact approval. */
    verification_digest: digestSchema.optional(),
})
    .strict();
//# sourceMappingURL=index.js.map