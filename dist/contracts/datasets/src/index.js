import { z } from "zod";
import { DIGEST_PATTERN } from "../../../modules/primitives/src/index.js";
import { agentReadinessOfferRelationRevisionSchema, agentReadinessProfileSummarySchema, } from "../../agent-readiness/src/index.js";
import { canonicalArtifactCoreSchema, compiledEntitySchema, provenanceSchema, } from "../../artifact/src/index.js";
import { assetBindingProjectionSchema } from "../../assets/src/index.js";
const digest = z.string().regex(DIGEST_PATTERN);
export const SOURCEY_DATASET_CONTRACTS = {
    companies: "sourcey.companies-dataset/v1alpha1",
    startupCredits: "sourcey.startup-credits-dataset/v1alpha1",
    agentReadiness: "sourcey.agent-readiness-dataset/v1alpha1",
};
const datasetIdentitySchema = z
    .object({
    release_id: digest,
    artifact_sha256: digest,
})
    .strict();
const companyProvenanceSchema = provenanceSchema
    .pick({
    freshness: true,
    dispute: true,
    vendor_attestation: true,
})
    .strict();
/** The compact company identity shared by Sourcey's public datasets. */
export const companyDatasetRecordSchema = compiledEntitySchema
    .omit({
    programs: true,
    offers: true,
    provenance: true,
})
    .safeExtend({ provenance: companyProvenanceSchema })
    .strict();
export const companiesDatasetSchema = datasetIdentitySchema
    .safeExtend({
    dataset_contract: z.literal(SOURCEY_DATASET_CONTRACTS.companies),
    companies: z.array(companyDatasetRecordSchema),
    assets: z.array(assetBindingProjectionSchema),
})
    .strict();
export const startupCreditsDatasetSchema = datasetIdentitySchema
    .safeExtend({
    dataset_contract: z.literal(SOURCEY_DATASET_CONTRACTS.startupCredits),
    root_set_digest: canonicalArtifactCoreSchema.shape.root_set_digest,
    signer_registry_digest: canonicalArtifactCoreSchema.shape.signer_registry_digest,
    policy_as_of: canonicalArtifactCoreSchema.shape.policy_as_of,
    policy_digests: canonicalArtifactCoreSchema.shape.policy_digests,
    policies: canonicalArtifactCoreSchema.shape.policies,
    companies: z.array(compiledEntitySchema),
})
    .strict();
export const agentReadinessDatasetSchema = datasetIdentitySchema
    .safeExtend({
    dataset_contract: z.literal(SOURCEY_DATASET_CONTRACTS.agentReadiness),
    profiles: z.array(agentReadinessProfileSummarySchema),
    offer_relations: z.array(agentReadinessOfferRelationRevisionSchema),
})
    .strict();
export function projectCompanyDatasetRecord(entity) {
    return companyDatasetRecordSchema.parse({
        entity_id: entity.entity_id,
        slug: entity.slug,
        ...(entity.slug_aliases === undefined ? {} : { slug_aliases: entity.slug_aliases }),
        name: entity.name,
        ...(entity.summary === undefined ? {} : { summary: entity.summary }),
        description: entity.description,
        website: entity.website,
        category: entity.category,
        revision_digest: entity.revision_digest,
        provenance: {
            freshness: entity.provenance.freshness,
            dispute: entity.provenance.dispute,
            vendor_attestation: entity.provenance.vendor_attestation,
        },
        ...(entity.identity_assurance === undefined
            ? {}
            : { identity_assurance: entity.identity_assurance }),
    });
}
//# sourceMappingURL=index.js.map