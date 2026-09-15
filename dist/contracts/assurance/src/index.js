import { z } from "zod";
import { DIGEST_PATTERN, ENTITY_ID_PATTERN, IDENTIFIER_PATTERN, } from "../../../modules/primitives/src/index.js";
import { evidenceCaptureAvailabilitySchema, evidenceProofKindSchema, evidenceSourceStandingSchema, } from "../../evidence/src/index.js";
import { observationMethodSchema } from "../../observations/src/index.js";
const digest = z.string().regex(DIGEST_PATTERN);
const entityId = z.string().regex(ENTITY_ID_PATTERN);
const identifier = z.string().regex(IDENTIFIER_PATTERN);
const instant = z.iso.datetime({ offset: true });
const pointer = z.string().regex(/^\/(?:[^~/]|~0|~1)+(?:\/(?:[^~/]|~0|~1)+)*$/);
function canonicalUnique(values, context) {
    const ordered = [...values].sort();
    if (new Set(values).size !== values.length ||
        values.some((value, index) => value !== ordered[index])) {
        context.addIssue({
            code: "custom",
            message: "Assurance method policy lists must be canonical and unique.",
        });
    }
}
export const ENTITY_IDENTITY_ASSURANCE_COVERAGE_PATHS = ["/domains", "/links", "/name"];
export const assuranceMethodPolicyCoreSchema = z
    .object({
    policy_contract: z.literal("sourcey.assurance-method-policy/v1alpha1"),
    method_id: identifier,
    title: z.string().min(1),
    summary: z.string().min(1),
    decision_authority: z.literal("authorized-human-review"),
    accepted_observation_methods: z
        .array(observationMethodSchema)
        .min(1)
        .superRefine(canonicalUnique),
    accepted_capture_availability: z
        .array(evidenceCaptureAvailabilitySchema)
        .min(1)
        .superRefine(canonicalUnique),
    accepted_source_standings: z
        .array(evidenceSourceStandingSchema)
        .min(1)
        .superRefine(canonicalUnique),
    accepted_proof_kinds: z.array(evidenceProofKindSchema).min(1).superRefine(canonicalUnique),
    outcomes: z
        .object({
        entity_identity: z
            .object({
            scope: z.literal("identity-epoch"),
            coverage_paths: z.tuple([
                z.literal(ENTITY_IDENTITY_ASSURANCE_COVERAGE_PATHS[0]),
                z.literal(ENTITY_IDENTITY_ASSURANCE_COVERAGE_PATHS[1]),
                z.literal(ENTITY_IDENTITY_ASSURANCE_COVERAGE_PATHS[2]),
            ]),
        })
            .strict(),
        offer_terms: z
            .object({
            scope: z.literal("exact-revision"),
            coverage: z.literal("applicable-offer-coverage-policy"),
        })
            .strict(),
    })
        .strict(),
})
    .strict();
export const assuranceMethodPolicySchema = assuranceMethodPolicyCoreSchema
    .extend({ policy_digest: digest })
    .strict();
export const entityIdentityAnchorCoreSchema = z
    .object({
    anchor_contract: z.literal("sourcey.entity-identity-anchor/v1alpha1"),
    entity_id: entityId,
    name: z.string().min(1),
    primary_domain: z.string().min(1),
})
    .strict();
export const entityIdentityAnchorSchema = entityIdentityAnchorCoreSchema
    .extend({ identity_epoch_digest: digest })
    .strict();
const completedAssuranceBase = {
    assurance_id: identifier,
    reviewer_id: identifier,
    method_policy_digest: digest,
    receipt_digest: digest,
    checked_at: instant,
};
export const entityIdentityCheckedPayloadSchema = z
    .object({
    ...completedAssuranceBase,
    identity_epoch_digest: digest,
    coverage_policy_digest: digest,
    coverage_paths: z.array(pointer).min(1),
})
    .strict();
export const offerTermsCheckedPayloadSchema = z
    .object({
    ...completedAssuranceBase,
    coverage_policy_digest: digest,
    coverage_paths: z.array(pointer).min(1),
})
    .strict();
const revokedAssuranceBase = {
    assurance_id: identifier,
    reviewer_id: identifier,
    receipt_digest: digest,
    revoked_at: instant,
    reason_code: z.string().min(1),
};
export const assuranceRevokedPayloadSchema = z.discriminatedUnion("assurance_kind", [
    z
        .object({
        ...revokedAssuranceBase,
        assurance_kind: z.literal("entity_identity"),
        identity_epoch_digest: digest,
    })
        .strict(),
    z
        .object({
        ...revokedAssuranceBase,
        assurance_kind: z.literal("offer_terms"),
        revision_digest: digest,
    })
        .strict(),
]);
export const entityIdentityAssuranceSchema = z
    .object({
    status: z.literal("verified"),
    assurance_id: identifier,
    verified_at: instant,
    identity_epoch_digest: digest,
    method_policy_digest: digest,
    coverage_policy_digest: digest,
    event_id: digest,
    receipt_digest: digest,
})
    .strict();
export const offerTermsAssuranceSchema = z
    .object({
    status: z.literal("checked"),
    assurance_id: identifier,
    checked_at: instant,
    revision_digest: digest,
    method_policy_digest: digest,
    coverage_policy_digest: digest,
    event_id: digest,
    receipt_digest: digest,
})
    .strict();
//# sourceMappingURL=index.js.map