import { z } from "zod";
import { provenanceSchema } from "../../artifact/src/index.js";
import { lifecycleStatusSchema } from "../../revisions/src/index.js";
import { validateOfferRelationInterval } from "./checks.js";
import { agentReadinessDeclarationRevisionSchema, agentReadinessDeclaredInterfaceSchema, agentReadinessEndpointSchema, agentReadinessOfferRelationPurposeSchema, agentReadinessParticipantSchema, agentReadinessResourceSchema, agentReadinessSurfaceExclusionSchema, agentReadinessSurfaceRelationSchema, } from "./declaration.js";
import { agentReadinessDeclarationStateSchema } from "./declaration-reference.js";
import { agentReadinessAssertionResultSchema, agentReadinessDiscoveryFactSchema, agentReadinessRunKindSchema, agentReadinessRunRecordSchema, agentReadinessRunSummarySchema, agentReadinessStepResultSchema, } from "./run.js";
import { AGENT_READINESS_MAXIMUM_REVISION_RUNS, AGENT_READINESS_STEPS, agentReadinessCatalogBindingSchema, agentReadinessDigestSchema, agentReadinessEntityIdSchema, agentReadinessEvidenceLabelSchema, agentReadinessFreshnessSchema, agentReadinessHandoffTimingSchema, agentReadinessIdentifierSchema, agentReadinessInstantSchema, agentReadinessOfferIdSchema, agentReadinessOnboardLevelSchema, agentReadinessOperateLetterSchema, agentReadinessProfileIdSchema, agentReadinessScopeKeySchema, agentReadinessScopeSchema, agentReadinessStepOutcomeSchema, agentReadinessStepSchema, sameAgentReadinessScopeIdentity, } from "./shared.js";
/** Canonical discriminant for a published Agent Readiness revision. */
export const agentReadinessRevisionContract = "sourcey.agent-readiness-revision/v1alpha1";
/** A run the revision rests on: the latest, and earlier ones a reproduced refusal needs. */
const agentReadinessRunReferenceSchema = z
    .object({
    run_digest: agentReadinessDigestSchema,
    label: agentReadinessEvidenceLabelSchema,
    run_kind: agentReadinessRunKindSchema,
    finished_at: agentReadinessInstantSchema,
})
    .strict();
export const agentReadinessEngineIdentitySchema = z
    .object({
    name: z.string().min(1).max(80),
    version: z.string().min(1).max(80),
    engine_digest: agentReadinessDigestSchema,
})
    .strict();
const agentReadinessRevisionFields = {
    agent_readiness_profile_id: agentReadinessProfileIdSchema,
    entity_id: agentReadinessEntityIdSchema,
    scope: agentReadinessScopeSchema,
    catalog_binding: agentReadinessCatalogBindingSchema,
    declaration_revision_digest: agentReadinessDigestSchema,
    declaration: agentReadinessDeclarationStateSchema,
    lifecycle: lifecycleStatusSchema,
    effective_from: agentReadinessInstantSchema,
    effective_until: agentReadinessInstantSchema.optional(),
    /** The exact library job the runs performed; a changed job needs new runs. */
    job_digest: agentReadinessDigestSchema,
    engine: agentReadinessEngineIdentitySchema,
    /** The binding the rating rests on; null for a listing no binding has run yet. */
    binding_id: agentReadinessScopeKeySchema.nullable(),
    binding_digest: agentReadinessDigestSchema.nullable(),
    /** Oldest first; the last is the run every step's outcome is read from. */
    runs: z.array(agentReadinessRunReferenceSchema).min(1).max(AGENT_READINESS_MAXIMUM_REVISION_RUNS),
    /** One result per step, in path order. */
    steps: z.array(agentReadinessStepResultSchema).length(AGENT_READINESS_STEPS.length),
    onboard_level: agentReadinessOnboardLevelSchema.nullable(),
    /** What the latest run found on the service's own descriptors. */
    discovery: z.array(agentReadinessDiscoveryFactSchema).max(64),
    /** What the latest run asked and what came back, as the card shows it. */
    latest_run: agentReadinessRunSummarySchema,
};
function validateAgentReadinessRevision(value, context) {
    if ((value.binding_id === null) !== (value.binding_digest === null)) {
        context.addIssue({
            code: "custom",
            path: ["binding_digest"],
            message: "A revision names its binding and its digest together, or neither.",
        });
    }
    if (value.binding_id === null &&
        (value.onboard_level !== null || value.steps.some(({ outcome }) => outcome !== "not_assessed"))) {
        context.addIssue({
            code: "custom",
            path: ["steps"],
            message: "A listing no binding has run assesses no step and no Onboard level.",
        });
    }
    if (value.latest_run.finished_at !== value.runs.at(-1)?.finished_at) {
        context.addIssue({
            code: "custom",
            path: ["latest_run"],
            message: "A revision summarises its latest run.",
        });
    }
    if (value.steps.some(({ step }, index) => step !== AGENT_READINESS_STEPS[index])) {
        context.addIssue({
            code: "custom",
            path: ["steps"],
            message: "A revision lists one result per step, in path order.",
        });
    }
    const digests = value.runs.map(({ run_digest }) => run_digest);
    if (new Set(digests).size !== digests.length ||
        value.runs.some((run, index) => index > 0 &&
            Date.parse(run.finished_at) < Date.parse(value.runs[index - 1]?.finished_at ?? ""))) {
        context.addIssue({
            code: "custom",
            path: ["runs"],
            message: "A revision's runs are unique and ordered oldest first.",
        });
    }
    const runs = new Set(digests);
    for (const [index, step] of value.steps.entries()) {
        if (step.evidence.some(({ run_digest }) => !runs.has(run_digest))) {
            context.addIssue({
                code: "custom",
                path: ["steps", index, "evidence"],
                message: "Step evidence rests only on the revision's own runs.",
            });
        }
    }
    if (value.effective_until &&
        Date.parse(value.effective_until) <= Date.parse(value.effective_from)) {
        context.addIssue({
            code: "custom",
            path: ["effective_until"],
            message: "Agent readiness profile effective interval is empty.",
        });
    }
}
/** A revision's exact input: its fields and the run records they rest on, oldest first. */
export const agentReadinessProfileInputSchema = z
    .object({
    input_contract: z.literal("sourcey.agent-readiness-input/v1alpha1"),
    ...agentReadinessRevisionFields,
    run_records: z
        .array(agentReadinessRunRecordSchema)
        .min(1)
        .max(AGENT_READINESS_MAXIMUM_REVISION_RUNS),
})
    .strict()
    .superRefine((value, context) => {
    validateAgentReadinessRevision(value, context);
    const records = value.run_records;
    if (records.length !== value.runs.length ||
        records.some((record, index) => {
            const reference = value.runs[index];
            return (!reference ||
                record.run_digest !== reference.run_digest ||
                record.label !== reference.label ||
                record.run_kind !== reference.run_kind ||
                record.finished_at !== reference.finished_at ||
                record.entity_id !== value.entity_id ||
                record.product_key !== value.scope.product.key ||
                record.job_id !== value.scope.job.key ||
                record.binding_id !== value.binding_id ||
                record.binding_digest !== value.binding_digest ||
                record.job_digest !== value.job_digest);
        })) {
        context.addIssue({
            code: "custom",
            path: ["run_records"],
            message: "Each run record is exactly the run its revision names, for this profile.",
        });
    }
});
export const agentReadinessOfferRelationInputSchema = z
    .object({
    relation_input_contract: z.literal("sourcey.agent-readiness-offer-relation-input/v1alpha1"),
    agent_readiness_profile_id: agentReadinessProfileIdSchema,
    offer_id: agentReadinessOfferIdSchema,
    purpose: agentReadinessOfferRelationPurposeSchema,
    effective_from: agentReadinessInstantSchema,
    effective_until: agentReadinessInstantSchema.optional(),
    declaration_revision_digest: agentReadinessDigestSchema,
    offer_relation_proposal_id: agentReadinessIdentifierSchema,
    admitted_offer_revision_digest: agentReadinessDigestSchema,
})
    .strict()
    .superRefine(validateOfferRelationInterval);
export const agentReadinessProfileReleaseInputSchema = z
    .object({
    release_input_contract: z.literal("sourcey.agent-readiness-release-input/v1alpha1"),
    profile_input: agentReadinessProfileInputSchema,
    declaration_revision: agentReadinessDeclarationRevisionSchema,
    offer_relation_inputs: z.array(agentReadinessOfferRelationInputSchema),
})
    .strict()
    .superRefine((value, context) => {
    if (value.profile_input.entity_id !== value.declaration_revision.entity_id ||
        value.profile_input.declaration_revision_digest !==
            value.declaration_revision.revision_digest ||
        !sameAgentReadinessScopeIdentity(value.profile_input.scope, value.declaration_revision.declaration.scope)) {
        context.addIssue({
            code: "custom",
            path: ["declaration_revision"],
            message: "A profile release input must bind its exact Entity declaration revision.",
        });
    }
    for (const [index, relation] of value.offer_relation_inputs.entries()) {
        if (relation.agent_readiness_profile_id !== value.profile_input.agent_readiness_profile_id ||
            relation.declaration_revision_digest !== value.declaration_revision.revision_digest) {
            context.addIssue({
                code: "custom",
                path: ["offer_relation_inputs", index],
                message: "An Offer relation input must bind its exact profile and declaration revision.",
            });
        }
    }
    const relationIdentities = value.offer_relation_inputs.map((relation) => `${relation.offer_id}:${relation.purpose}`);
    if (new Set(relationIdentities).size !== relationIdentities.length) {
        context.addIssue({
            code: "custom",
            path: ["offer_relation_inputs"],
            message: "A profile release input cannot repeat an Offer and purpose relation.",
        });
    }
});
export const agentReadinessRevisionCoreSchema = z
    .object({
    revision_contract: z.literal(agentReadinessRevisionContract),
    ...agentReadinessRevisionFields,
})
    .strict()
    .superRefine(validateAgentReadinessRevision);
export const agentReadinessRevisionSchema = agentReadinessRevisionCoreSchema
    .safeExtend({ revision_digest: agentReadinessDigestSchema })
    .strict();
/**
 * Stable head identity for closure and ownership checks. Historical Agent
 * Readiness revision bodies remain opaque and are never reparsed through the
 * current contract.
 */
export const agentReadinessRevisionHeadSchema = z.object({
    revision_contract: z.literal(agentReadinessRevisionContract),
    agent_readiness_profile_id: agentReadinessProfileIdSchema,
    entity_id: agentReadinessEntityIdSchema,
    revision_digest: agentReadinessDigestSchema,
});
export const agentReadinessPublicationVisibilitySchema = z.enum([
    "discoverable",
    "resolvable_only",
    "private",
]);
/** What a reader needs of one step: its outcome and, for a human step, when the human is needed. */
const agentReadinessProjectedStepSchema = z
    .object({
    step: agentReadinessStepSchema,
    outcome: agentReadinessStepOutcomeSchema,
    timing: agentReadinessHandoffTimingSchema.nullable(),
})
    .strict();
/** The latest run as the card shows it, each assertion with the job library's statement. */
const agentReadinessProjectedRunSchema = agentReadinessRunSummarySchema
    .safeExtend({
    assertions: z
        .array(agentReadinessAssertionResultSchema.safeExtend({
        statement: z.string().min(1).max(400),
    }))
        .max(8),
})
    .strict();
/**
 * The readiness projection's provenance: the profile's dispute state, its Entity's
 * attestation, and the events establishing both. Ratings rest on run records, not
 * on evidence coverage.
 */
const agentReadinessProvenanceSchema = provenanceSchema
    .pick({ dispute: true, vendor_attestation: true, basis_event_ids: true })
    .strict();
export const agentReadinessProjectionCoreSchema = z
    .object({
    projection_contract: z.literal("sourcey.agent-readiness-projection/v1alpha1"),
    agent_readiness_profile_id: agentReadinessProfileIdSchema,
    entity_id: agentReadinessEntityIdSchema,
    scope: agentReadinessScopeSchema,
    catalog_binding: agentReadinessCatalogBindingSchema,
    declaration_revision_digest: agentReadinessDigestSchema,
    declaration: agentReadinessDeclarationStateSchema,
    surface_catalog: z
        .object({
        participants: z.array(agentReadinessParticipantSchema),
        resources: z.array(agentReadinessResourceSchema),
        endpoints: z.array(agentReadinessEndpointSchema),
        interfaces: z.array(agentReadinessDeclaredInterfaceSchema),
        relations: z.array(agentReadinessSurfaceRelationSchema),
        surface_exclusions: z.array(agentReadinessSurfaceExclusionSchema),
    })
        .strict(),
    lifecycle: lifecycleStatusSchema,
    effective_from: agentReadinessInstantSchema,
    effective_until: agentReadinessInstantSchema.optional(),
    revision_digest: agentReadinessDigestSchema,
    policy_digest: agentReadinessDigestSchema,
    policy_version: z.string().min(1),
    policy_as_of: agentReadinessInstantSchema,
    job: z
        .object({
        job_id: agentReadinessScopeKeySchema,
        job_digest: agentReadinessDigestSchema,
        category: agentReadinessScopeKeySchema,
        name: z.string().min(1).max(120),
        statement: z.string().min(1).max(400),
    })
        .strict(),
    /** The interface the rated binding uses; null until a binding has run. */
    interface_id: agentReadinessScopeKeySchema.nullable(),
    label: agentReadinessEvidenceLabelSchema,
    operate: z
        .object({
        /** Null shows the dash: not yet exercised, or no letter's coverage met. */
        letter: agentReadinessOperateLetterSchema.nullable(),
        /** The letter's exact definition from the policy; null with the dash. */
        statement: z.string().min(1).max(280).nullable(),
        steps: z.array(agentReadinessProjectedStepSchema).length(AGENT_READINESS_STEPS.length),
        /** Steps not yet assessed. */
        missing: z.array(agentReadinessStepSchema),
        /** Where the principal stays in the loop; never lowers the letter. */
        approvals: z.array(agentReadinessStepSchema),
        /** Where a person does the agent's work, and how often. */
        workarounds: z.array(z
            .object({ step: agentReadinessStepSchema, timing: agentReadinessHandoffTimingSchema })
            .strict()),
    })
        .strict(),
    onboard: z.object({ level: agentReadinessOnboardLevelSchema.nullable() }).strict(),
    discovery: z.array(agentReadinessDiscoveryFactSchema).max(64),
    run: agentReadinessProjectedRunSchema,
    /** When the published facts were established: the revision's latest run. */
    last_run_at: agentReadinessInstantSchema,
    publication: z
        .object({
        visibility: agentReadinessPublicationVisibilitySchema,
        reasons: z.array(z.enum(["lifecycle_not_active", "open_dispute"])),
    })
        .strict(),
    provenance: agentReadinessProvenanceSchema,
    canonical_url: z.url(),
})
    .strict();
export const agentReadinessProjectionSchema = agentReadinessProjectionCoreSchema
    .safeExtend({ projection_digest: agentReadinessDigestSchema })
    .strict();
export const agentReadinessProfileSummarySchema = agentReadinessProjectionSchema
    .pick({
    agent_readiness_profile_id: true,
    entity_id: true,
    scope: true,
    declaration_revision_digest: true,
    lifecycle: true,
    effective_from: true,
    revision_digest: true,
    policy_digest: true,
    policy_version: true,
    policy_as_of: true,
    label: true,
    last_run_at: true,
    publication: true,
    provenance: true,
    canonical_url: true,
    projection_digest: true,
})
    .safeExtend({
    operate: z
        .object({
        letter: agentReadinessOperateLetterSchema.nullable(),
        steps: z.array(agentReadinessProjectedStepSchema).length(AGENT_READINESS_STEPS.length),
    })
        .strict(),
    onboard: z.object({ level: agentReadinessOnboardLevelSchema.nullable() }).strict(),
})
    .strict();
/** The freshness index's namespace for report cards; each subject is a profile id. */
export const AGENT_READINESS_FRESHNESS_NAMESPACE = "agent-readiness";
/**
 * A card's freshness as serving reads it from the freshness index, beside the
 * released facts: never released itself, so a recheck that changes nothing
 * publishes nothing.
 */
export const agentReadinessServedFreshnessSchema = z
    .object({
    /** The last check, successful or not. */
    checked_at: agentReadinessInstantSchema,
    /** The last successful check: the card's "observed" date; null before one. */
    succeeded_at: agentReadinessInstantSchema.nullable(),
    next_due_at: agentReadinessInstantSchema.nullable(),
    /** Stale with no success, or a last success before the policy's window. */
    state: agentReadinessFreshnessSchema,
})
    .strict();
/** Served freshness by profile id: what a response carries beside its released profiles. */
export const agentReadinessServedFreshnessMapSchema = z.record(agentReadinessProfileIdSchema, agentReadinessServedFreshnessSchema);
/** The instant before which a card's last success makes it stale, under the policy's window. */
export function agentReadinessStaleBefore(now, policy) {
    const at = Date.parse(now);
    if (!Number.isFinite(at))
        throw new Error("Agent Readiness freshness needs a valid instant.");
    return new Date(at - policy.fresh_for_days * 86_400_000).toISOString();
}
/** The one definition of staleness: no success yet, or the last one before `staleBefore`. */
export function agentReadinessServedFreshness(record, staleBefore) {
    return agentReadinessServedFreshnessSchema.parse({
        checked_at: record.checkedAt,
        succeeded_at: record.succeededAt,
        next_due_at: record.nextDueAt,
        state: record.succeededAt !== null && Date.parse(record.succeededAt) >= Date.parse(staleBefore)
            ? "fresh"
            : "stale",
    });
}
/** The one compact public-list projection of a complete released profile. */
export function summarizeAgentReadinessProfile(profile) {
    return agentReadinessProfileSummarySchema.parse({
        agent_readiness_profile_id: profile.agent_readiness_profile_id,
        entity_id: profile.entity_id,
        scope: profile.scope,
        declaration_revision_digest: profile.declaration_revision_digest,
        lifecycle: profile.lifecycle,
        effective_from: profile.effective_from,
        revision_digest: profile.revision_digest,
        policy_digest: profile.policy_digest,
        policy_version: profile.policy_version,
        policy_as_of: profile.policy_as_of,
        label: profile.label,
        operate: { letter: profile.operate.letter, steps: profile.operate.steps },
        onboard: profile.onboard,
        last_run_at: profile.last_run_at,
        publication: profile.publication,
        provenance: profile.provenance,
        canonical_url: profile.canonical_url,
        projection_digest: profile.projection_digest,
    });
}
//# sourceMappingURL=revision.js.map