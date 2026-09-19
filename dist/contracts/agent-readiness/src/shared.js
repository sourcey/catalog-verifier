import { z } from "zod";
import { ACTOR_IDENTIFIER_PATTERN, AGENT_READINESS_PROFILE_ID_PATTERN, DIGEST_PATTERN, ENTITY_ID_PATTERN, IDENTIFIER_PATTERN, OFFER_ID_PATTERN, SLUG_PATTERN, } from "../../../modules/primitives/src/index.js";
export const agentReadinessDigestSchema = z.string().regex(DIGEST_PATTERN);
export const agentReadinessEntityIdSchema = z.string().regex(ENTITY_ID_PATTERN);
export const agentReadinessOfferIdSchema = z.string().regex(OFFER_ID_PATTERN);
export const agentReadinessProfileIdSchema = z.string().regex(AGENT_READINESS_PROFILE_ID_PATTERN);
export const agentReadinessIdentifierSchema = z.string().regex(IDENTIFIER_PATTERN);
/** A reviewer identity, in the same form the authority contract's human actor id takes. */
export const agentReadinessReviewerIdSchema = z.string().regex(ACTOR_IDENTIFIER_PATTERN);
export const agentReadinessInstantSchema = z.iso.datetime({ offset: true });
export const agentReadinessSignalCodeSchema = z.string().regex(/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/);
export const agentReadinessScopeKeySchema = z.string().regex(SLUG_PATTERN);
export const agentReadinessMethodNameSchema = z.string().regex(/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/);
export const agentReadinessHostnameSchema = z
    .string()
    .trim()
    .toLowerCase()
    .max(253)
    .regex(/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/u);
export const agentReadinessStageSchema = z.enum([
    "evaluate",
    "sign_up",
    "pay",
    "provision",
    "operate",
]);
const agentReadinessStageLabels = {
    evaluate: "Evaluate",
    sign_up: "Sign up",
    pay: "Pay",
    provision: "Provision",
    operate: "Operate",
};
export function agentReadinessStageLabel(input) {
    return agentReadinessStageLabels[agentReadinessStageSchema.parse(input)];
}
export const agentReadinessSignalValueSchema = z.enum([
    "yes",
    "no",
    "partial",
    "unknown",
    "not_applicable",
]);
export const agentReadinessStageOutcomeSchema = z.enum([
    "pass",
    "constrained",
    "fail",
    "unknown",
    "not_applicable",
]);
export const agentReadinessPublicStateSchema = z.enum([
    "ready",
    "limited",
    "blocked",
    "unknown",
    "not_applicable",
]);
export const agentReadinessEvaluationRoleSchema = z.enum(["graded", "barrier", "informational"]);
export const agentReadinessGradeSchema = z.enum([
    "A+",
    "A",
    "B+",
    "B",
    "C+",
    "C",
    "D",
    "F",
    "unrated",
]);
export const agentReadinessFreshnessSchema = z.enum(["fresh", "stale", "unknown"]);
export const agentReadinessScopeSubjectSchema = z
    .object({
    key: agentReadinessScopeKeySchema,
    name: z.string().min(1).max(160),
})
    .strict();
export const agentReadinessScopeSchema = z
    .object({
    product: agentReadinessScopeSubjectSchema,
    funnel: agentReadinessScopeSubjectSchema,
})
    .strict();
export function sameAgentReadinessScopeIdentity(left, right) {
    return left.product.key === right.product.key && left.funnel.key === right.funnel.key;
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
const agentReadinessResourceRoleLabels = {
    discovery: "Discovery",
    terms: "Terms",
    eligibility: "Eligibility",
    pricing: "Pricing",
    access: "Access",
    checkout: "Checkout",
    provisioning: "Provisioning",
    operations: "Operations",
    recovery: "Recovery",
    authentication: "Authentication",
    descriptor: "Descriptor",
    documentation: "Documentation",
    policy: "Policy",
    status: "Status",
};
export function agentReadinessResourceRoleLabel(input) {
    return agentReadinessResourceRoleLabels[agentReadinessResourceRoleSchema.parse(input)];
}
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
export const agentReadinessAssessmentMethodSchema = z
    .object({
    name: agentReadinessMethodNameSchema,
    version: z.string().min(1).max(160),
    method_digest: agentReadinessDigestSchema,
})
    .strict();
//# sourceMappingURL=shared.js.map