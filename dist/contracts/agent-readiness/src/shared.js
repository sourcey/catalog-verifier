import { DIGEST_PATTERN, IDENTIFIER_PATTERN, SLUG_PATTERN } from "provenry/primitives";
import { z } from "zod";
import { AGENT_READINESS_PROFILE_ID_PATTERN, ENTITY_ID_PATTERN, OFFER_ID_PATTERN, } from "../../../modules/catalog-primitives/src/index.js";
export const agentReadinessDigestSchema = z.string().regex(DIGEST_PATTERN);
export const agentReadinessEntityIdSchema = z.string().regex(ENTITY_ID_PATTERN);
export const agentReadinessOfferIdSchema = z.string().regex(OFFER_ID_PATTERN);
export const agentReadinessProfileIdSchema = z.string().regex(AGENT_READINESS_PROFILE_ID_PATTERN);
export const agentReadinessIdentifierSchema = z.string().regex(IDENTIFIER_PATTERN);
export const agentReadinessInstantSchema = z.iso.datetime({ offset: true });
export const agentReadinessScopeKeySchema = z.string().regex(SLUG_PATTERN);
export const agentReadinessHostnameSchema = z
    .string()
    .trim()
    .toLowerCase()
    .max(253)
    .regex(/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/u);
/** Whether a profile's last successful check is within the policy's freshness window. */
export const agentReadinessFreshnessSchema = z.enum(["fresh", "stale"]);
const agentReadinessScopeSubjectSchema = z
    .object({
    key: agentReadinessScopeKeySchema,
    name: z.string().min(1).max(160),
})
    .strict();
/** A profile is one service product and one library job: `job.key` is the job's id. */
export const agentReadinessScopeSchema = z
    .object({
    product: agentReadinessScopeSubjectSchema,
    job: agentReadinessScopeSubjectSchema,
})
    .strict();
export function sameAgentReadinessScopeIdentity(left, right) {
    return left.product.key === right.product.key && left.job.key === right.job.key;
}
export const agentReadinessCatalogBindingSchema = z
    .object({
    base_release_id: agentReadinessDigestSchema,
    entity_revision_digest: agentReadinessDigestSchema,
})
    .strict();
export const agentReadinessResourceRoleSchema = z.enum([
    "discovery",
    "terms",
    "eligibility",
    "pricing",
    "access",
    "checkout",
    "provisioning",
    "operations",
    "recovery",
    "authentication",
    "descriptor",
    "documentation",
    "policy",
    "status",
]);
export const agentReadinessSurfaceNodeKindSchema = z.enum([
    "resource",
    "endpoint",
    "interface",
    "surface_exclusion",
]);
export const agentReadinessSurfaceReferenceSchema = z
    .object({
    node_kind: agentReadinessSurfaceNodeKindSchema,
    node_id: agentReadinessScopeKeySchema,
})
    .strict();
/** A revision rests on at most this many runs: its latest and the earlier refusals it reproduces. */
export const AGENT_READINESS_MAXIMUM_REVISION_RUNS = 4;
/** The Operate path, in order: how a principal's authority becomes a completed, confirmed job. */
export const AGENT_READINESS_STEPS = [
    "discover",
    "delegation",
    "pay",
    "job",
    "confirm",
    "sustain",
];
export const agentReadinessStepSchema = z.enum(AGENT_READINESS_STEPS);
/**
 * What happened at one step: done by the agent, a legitimate principal decision,
 * a human doing the agent's work, reproducibly impossible, proved absent by the
 * executed path, or not yet evidenced.
 */
export const agentReadinessStepOutcomeSchema = z.enum([
    "machine",
    "approval",
    "workaround",
    "blocked",
    "not_applicable",
    "not_assessed",
]);
/** Once per principal or credential lifetime, or on every job, purchase or period. */
export const agentReadinessHandoffTimingSchema = z.enum(["setup", "recurring"]);
export const agentReadinessOperateLetterSchema = z.enum([
    "A+",
    "A",
    "B+",
    "B",
    "C+",
    "C",
    "D",
    "F",
]);
/** 1 no account needed … 6 sales-gated; absence is "not yet assessed". */
export const agentReadinessOnboardLevelSchema = z.number().int().min(1).max(6);
export const agentReadinessEvidenceLabelSchema = z.enum([
    "sourcey_run",
    "vendor_run_verified",
    "probed",
]);
//# sourceMappingURL=shared.js.map