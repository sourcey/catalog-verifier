import { z } from "zod";
import { offerRevisionSchema } from "../../revisions/src/index.js";
import { relationMembership, sameAgentReadinessOfferRelationIdentity, validateOfferRelationInterval, validateRelationMembership, } from "./checks.js";
import { agentReadinessDeclarationRevisionSchema, agentReadinessOfferRelationPurposeSchema, } from "./declaration.js";
import { agentReadinessOfferRelationInputSchema } from "./revision.js";
import { agentReadinessDigestSchema, agentReadinessEntityIdSchema, agentReadinessIdentifierSchema, agentReadinessInstantSchema, agentReadinessOfferIdSchema, agentReadinessProfileIdSchema, } from "./shared.js";
const agentReadinessOfferRelationRevisionFields = {
    relation_id: agentReadinessIdentifierSchema,
    agent_readiness_profile_id: agentReadinessProfileIdSchema,
    offer_id: agentReadinessOfferIdSchema,
    purpose: agentReadinessOfferRelationPurposeSchema,
    effective_from: agentReadinessInstantSchema,
    effective_until: agentReadinessInstantSchema.optional(),
    declaration_revision_digest: agentReadinessDigestSchema,
    offer_relation_proposal_id: agentReadinessIdentifierSchema,
    admitted_offer_revision_digest: agentReadinessDigestSchema,
};
const agentReadinessOfferRelationRevisionFieldsSchema = z
    .object({
    relation_contract: z.literal("sourcey.agent-readiness-offer-relation/v1alpha1"),
    ...agentReadinessOfferRelationRevisionFields,
})
    .strict();
export const agentReadinessOfferRelationRevisionCoreSchema = agentReadinessOfferRelationRevisionFieldsSchema.superRefine(validateOfferRelationInterval);
export const agentReadinessOfferRelationRevisionSchema = agentReadinessOfferRelationRevisionCoreSchema
    .safeExtend({ relation_revision_digest: agentReadinessDigestSchema })
    .strict();
export const agentReadinessOfferRelationTransitionSchema = z
    .object({
    previous: agentReadinessOfferRelationRevisionSchema.nullable(),
    current: agentReadinessOfferRelationRevisionSchema.nullable(),
})
    .strict()
    .superRefine((value, context) => {
    if (!value.previous && !value.current) {
        context.addIssue({
            code: "custom",
            message: "An Offer relation transition cannot be empty.",
        });
        return;
    }
    if (value.previous &&
        value.current &&
        !sameAgentReadinessOfferRelationIdentity(value.previous, value.current)) {
        context.addIssue({
            code: "custom",
            path: ["current"],
            message: "An Offer relation revision cannot change profile, Offer, or purpose identity.",
        });
    }
});
export const agentReadinessOfferRelationDeltaObjectSchema = z
    .object({
    object_contract: z.literal("sourcey.agent-readiness-offer-relation-delta-object/v1alpha1"),
    relation_id: agentReadinessIdentifierSchema,
    relation_input: agentReadinessOfferRelationInputSchema.nullable(),
    relation: agentReadinessOfferRelationRevisionSchema.nullable(),
    prior_relation: agentReadinessOfferRelationRevisionSchema.nullable(),
    catalog_context: z
        .object({
        entity_id: agentReadinessEntityIdSchema,
        profile_revision_digest: agentReadinessDigestSchema,
        declaration_revision: agentReadinessDeclarationRevisionSchema,
        offer_revision: offerRevisionSchema.nullable(),
    })
        .strict(),
})
    .strict()
    .superRefine((value, context) => {
    const transition = agentReadinessOfferRelationTransitionSchema.safeParse({
        previous: value.prior_relation,
        current: value.relation,
    });
    if (!transition.success) {
        context.addIssue({
            code: "custom",
            message: "Offer relation delta must contain one identity-stable transition.",
        });
        return;
    }
    for (const [field, relation] of [
        ["relation", value.relation],
        ["prior_relation", value.prior_relation],
    ]) {
        if (relation && relation.relation_id !== value.relation_id) {
            context.addIssue({
                code: "custom",
                path: [field, "relation_id"],
                message: "Offer relation delta objects retain one exact relation identity.",
            });
        }
    }
    if ((value.relation === null) !== (value.relation_input === null)) {
        context.addIssue({
            code: "custom",
            path: ["relation_input"],
            message: "A current Offer relation requires its exact canonical input.",
        });
    }
    if (value.relation && value.relation_input) {
        const offerRevision = value.catalog_context.offer_revision;
        if (value.relation_input.agent_readiness_profile_id !==
            value.relation.agent_readiness_profile_id ||
            value.relation_input.offer_id !== value.relation.offer_id ||
            value.relation_input.purpose !== value.relation.purpose ||
            value.relation_input.declaration_revision_digest !==
                value.relation.declaration_revision_digest ||
            value.relation_input.admitted_offer_revision_digest !==
                value.relation.admitted_offer_revision_digest ||
            value.catalog_context.declaration_revision.revision_digest !==
                value.relation.declaration_revision_digest ||
            value.catalog_context.entity_id !== value.catalog_context.declaration_revision.entity_id ||
            offerRevision?.offer_id !== value.relation.offer_id ||
            offerRevision?.entity_id !== value.catalog_context.entity_id ||
            offerRevision?.revision_digest !== value.relation.admitted_offer_revision_digest) {
            context.addIssue({
                code: "custom",
                path: ["catalog_context"],
                message: "Current Offer relation delta lacks exact same-Entity Catalog closure.",
            });
        }
    }
    else if (value.catalog_context.offer_revision !== null) {
        context.addIssue({
            code: "custom",
            path: ["catalog_context", "offer_revision"],
            message: "A withdrawn Offer relation carries no current Offer closure.",
        });
    }
});
export const agentReadinessOfferRelationIndexSchema = z
    .object({
    relation_index_contract: z.literal("sourcey.agent-readiness-offer-relation-index/v1alpha1"),
    relations: z.record(agentReadinessIdentifierSchema, agentReadinessOfferRelationRevisionSchema),
    by_profile: z.record(agentReadinessProfileIdSchema, z.array(agentReadinessIdentifierSchema)),
    by_offer: z.record(agentReadinessOfferIdSchema, z.array(agentReadinessIdentifierSchema)),
})
    .strict()
    .superRefine((value, context) => {
    const expectedByProfile = relationMembership(value.relations, "agent_readiness_profile_id");
    const expectedByOffer = relationMembership(value.relations, "offer_id");
    validateRelationMembership(value.by_profile, expectedByProfile, context, ["by_profile"]);
    validateRelationMembership(value.by_offer, expectedByOffer, context, ["by_offer"]);
    for (const [relationId, relation] of Object.entries(value.relations)) {
        if (relation.relation_id !== relationId) {
            context.addIssue({
                code: "custom",
                path: ["relations", relationId, "relation_id"],
                message: "An Offer relation index key must equal the relation identity.",
            });
        }
    }
    const identities = Object.values(value.relations).map((relation) => `${relation.agent_readiness_profile_id}:${relation.offer_id}:${relation.purpose}`);
    if (new Set(identities).size !== identities.length) {
        context.addIssue({
            code: "custom",
            path: ["relations"],
            message: "Current Offer relations cannot repeat profile, Offer, and purpose identity.",
        });
    }
});
export const agentReadinessOfferRelationInputsSchema = z
    .object({
    input_contract: z.literal("sourcey.agent-readiness-offer-relation-inputs/v1alpha1"),
    relations: z.array(z
        .object({
        relation_id: agentReadinessIdentifierSchema,
        input_digest: agentReadinessDigestSchema,
        relation_revision_digest: agentReadinessDigestSchema,
        path: z
            .string()
            .regex(/^inputs\/agent-readiness-offer-relations\/sha256-[a-f0-9]{64}\.json$/u),
    })
        .strict()),
})
    .strict()
    .superRefine((value, context) => {
    const relationIds = value.relations.map((relation) => relation.relation_id);
    const inputDigests = value.relations.map((relation) => relation.input_digest);
    if (new Set(relationIds).size !== relationIds.length ||
        new Set(inputDigests).size !== inputDigests.length) {
        context.addIssue({
            code: "custom",
            path: ["relations"],
            message: "Offer relation input index identities and input digests must be unique.",
        });
    }
    const sorted = [...value.relations].sort((left, right) => left.relation_id.localeCompare(right.relation_id));
    if (sorted.some((relation, index) => relation.relation_id !== value.relations[index]?.relation_id)) {
        context.addIssue({
            code: "custom",
            path: ["relations"],
            message: "Offer relation inputs must be canonically ordered by relation identity.",
        });
    }
});
//# sourceMappingURL=offer-relations.js.map