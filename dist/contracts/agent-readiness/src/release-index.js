import { SLUG_PATTERN } from "provenry/primitives";
import { z } from "zod";
import { entityRevisionSchema, lifecycleStatusSchema } from "../../revisions/src/index.js";
import { sameAgentReadinessScope } from "./checks.js";
import { agentReadinessDeclarationRevisionSchema } from "./declaration.js";
import { agentReadinessProfileInputSchema, agentReadinessProjectionSchema } from "./revision.js";
import { agentReadinessDigestSchema, agentReadinessEntityIdSchema, agentReadinessProfileIdSchema, sameAgentReadinessScopeIdentity, } from "./shared.js";
export const agentReadinessIndexSchema = z
    .object({
    agent_readiness_index_contract: z.literal("sourcey.agent-readiness-index/v1alpha1"),
    profiles: z.record(z.string(), z
        .object({
        agent_readiness_profile_id: agentReadinessProfileIdSchema,
        entity_id: agentReadinessEntityIdSchema,
        lifecycle: lifecycleStatusSchema,
        revision_digest: agentReadinessDigestSchema,
        policy_digest: agentReadinessDigestSchema,
        projection_digest: agentReadinessDigestSchema,
        canonical_url: z.url(),
        path: z.string().startsWith("agent-readiness/"),
    })
        .strict()),
})
    .strict();
export const agentReadinessInputsSchema = z
    .object({
    input_contract: z.literal("sourcey.agent-readiness-inputs/v1alpha1"),
    policy_digest: agentReadinessDigestSchema,
    profiles: z.array(z
        .object({
        agent_readiness_profile_id: agentReadinessProfileIdSchema,
        input_digest: agentReadinessDigestSchema,
        revision_digest: agentReadinessDigestSchema,
        path: z.string().startsWith("inputs/agent-readiness/"),
    })
        .strict()),
})
    .strict();
export const agentReadinessDeltaObjectSchema = z
    .object({
    object_contract: z.literal("sourcey.agent-readiness-delta-object/v1alpha1"),
    agent_readiness_profile_id: agentReadinessProfileIdSchema,
    profile_input: agentReadinessProfileInputSchema.nullable(),
    projection: agentReadinessProjectionSchema.nullable(),
    prior_projection: agentReadinessProjectionSchema.nullable(),
    catalog_context: z
        .object({
        entity_slug: z.string().regex(SLUG_PATTERN),
        entity_revision: entityRevisionSchema,
        declaration_revision: agentReadinessDeclarationRevisionSchema,
    })
        .strict()
        .nullable(),
})
    .strict()
    .superRefine((value, context) => {
    if (!value.projection && !value.prior_projection) {
        context.addIssue({
            code: "custom",
            message: "An Agent Readiness delta object requires a current or prior projection.",
        });
        return;
    }
    for (const [key, projection] of [
        ["projection", value.projection],
        ["prior_projection", value.prior_projection],
    ]) {
        if (projection &&
            projection.agent_readiness_profile_id !== value.agent_readiness_profile_id) {
            context.addIssue({
                code: "custom",
                path: [key, "agent_readiness_profile_id"],
                message: "Agent Readiness delta projections must retain the addressed profile ID.",
            });
        }
    }
    const current = value.projection;
    if (!current) {
        if (value.profile_input || value.catalog_context) {
            context.addIssue({
                code: "custom",
                message: "A retired Agent Readiness delta cannot carry current input or context.",
            });
        }
        return;
    }
    if (!value.catalog_context) {
        context.addIssue({
            code: "custom",
            path: ["catalog_context"],
            message: "A current Agent Readiness projection requires its exact Catalog context.",
        });
        return;
    }
    if (value.prior_projection &&
        !sameAgentReadinessScope(value.prior_projection.scope, current.scope)) {
        context.addIssue({
            code: "custom",
            path: ["projection", "scope"],
            message: "An Agent Readiness profile cannot change product or job identity.",
        });
    }
    if (!value.prior_projection && !value.profile_input) {
        context.addIssue({
            code: "custom",
            path: ["profile_input"],
            message: "A new Agent Readiness profile requires its exact input.",
        });
    }
    if (!value.profile_input &&
        value.prior_projection?.revision_digest !== current.revision_digest) {
        context.addIssue({
            code: "custom",
            path: ["profile_input"],
            message: "A policy-only regrade must retain the exact current revision.",
        });
    }
    if (current.entity_id !== value.catalog_context.entity_revision.entity_id ||
        current.entity_id !== value.catalog_context.declaration_revision.entity_id ||
        current.declaration_revision_digest !==
            value.catalog_context.declaration_revision.revision_digest ||
        !sameAgentReadinessScopeIdentity(current.scope, value.catalog_context.declaration_revision.declaration.scope)) {
        context.addIssue({
            code: "custom",
            path: ["catalog_context"],
            message: "Agent Readiness projection does not match its Entity context.",
        });
    }
    if (value.profile_input &&
        (value.profile_input.agent_readiness_profile_id !== value.agent_readiness_profile_id ||
            value.profile_input.entity_id !== value.catalog_context.entity_revision.entity_id ||
            value.profile_input.declaration_revision_digest !==
                value.catalog_context.declaration_revision.revision_digest ||
            value.profile_input.catalog_binding.entity_revision_digest !==
                value.catalog_context.entity_revision.revision_digest)) {
        context.addIssue({
            code: "custom",
            path: ["catalog_context"],
            message: "Agent Readiness input does not bind its exact Entity context.",
        });
    }
});
//# sourceMappingURL=release-index.js.map