import { z } from "zod";
import { protectedSignatureSchema, signerRegistrySchema } from "../../authority/src/index.js";
import { catalogTaxonomySchema } from "../../taxonomy/src/index.js";
const digestSchema = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const instantSchema = z.iso.datetime({ offset: true });
export const verifierRepositoryKindSchema = z.enum(["startup-credits", "agent-readiness"]);
const gitObjectSchema = z.string().regex(/^[a-f0-9]{40,64}$/u);
const repositorySchema = z.string().regex(/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/u);
export const catalogAdmissionKeyKindSchema = z.enum([
    "entity_id",
    "entity_slug",
    "entity_name",
    "domain",
    "entity_url",
    "evidence_url",
    "offer_url",
    "program_id",
    "program_slug",
    "offer_id",
    "offer_slug",
    "semantic_offer",
]);
export const catalogAdmissionKeySchema = z
    .object({
    kind: catalogAdmissionKeyKindSchema,
    normalizedValue: z.string().min(1).max(16_384),
    keyDigest: digestSchema,
    candidateReference: z.string().min(1).max(240),
    candidateIdentityDigest: digestSchema.optional(),
})
    .strict()
    .superRefine((value, context) => {
    if ((value.kind === "entity_id") !== (value.candidateIdentityDigest !== undefined)) {
        context.addIssue({
            code: "custom",
            path: ["candidateIdentityDigest"],
            message: "Exactly an Entity ID admission key carries the candidate identity digest.",
        });
    }
});
export const catalogAdmissionCandidateSchema = z.discriminatedUnion("kind", [
    z
        .object({
        kind: z.literal("git_pull_request"),
        repository: repositorySchema,
        pullRequestNumber: z.number().int().positive(),
        headSha: gitObjectSchema,
    })
        .strict(),
    z
        .object({
        kind: z.literal("detached"),
        repositoryKind: verifierRepositoryKindSchema,
        candidateDigest: digestSchema,
    })
        .strict(),
]);
export const catalogAdmissionKeyMatchSchema = z
    .object({
    keyDigest: digestSchema,
    targetReference: z.string().min(1).max(240),
    targetIdentityDigest: digestSchema.optional(),
    source: z.discriminatedUnion("kind", [
        z
            .object({
            kind: z.literal("current_catalog"),
            liveParentReleaseId: digestSchema,
        })
            .strict(),
        z
            .object({
            kind: z.literal("open_pull_request"),
            repository: repositorySchema,
            pullRequestNumber: z.number().int().positive(),
            headSha: gitObjectSchema,
        })
            .strict(),
        z
            .object({
            kind: z.literal("pending_git_lineage"),
            repository: repositorySchema,
            liveSourceCommit: gitObjectSchema,
            targetCommit: gitObjectSchema,
        })
            .strict(),
    ]),
})
    .strict();
export const catalogAdmissionConflictLookupRequestSchema = z
    .object({
    query_contract: z.literal("sourcey.catalog-admission-conflict-query/v1alpha1"),
    keys: z.array(catalogAdmissionKeySchema).max(128),
    liveParentReleaseId: digestSchema,
    candidate: catalogAdmissionCandidateSchema,
})
    .strict();
export const catalogAdmissionConflictLookupResponseCoreSchema = z
    .object({
    response_contract: z.literal("sourcey.catalog-admission-conflict-response/v1alpha1"),
    query_digest: digestSchema,
    matches: z.array(catalogAdmissionKeyMatchSchema).max(512),
})
    .strict();
export const catalogAdmissionConflictLookupResponseSchema = catalogAdmissionConflictLookupResponseCoreSchema
    .extend({ response_digest: digestSchema })
    .strict();
export const catalogVerifierDiagnosticSchema = z
    .object({
    rule_id: z.string().regex(/^[a-z][a-z0-9-]*(?:\.[a-z][a-z0-9-]*)+$/u),
    classification: z.enum([
        "invalid_input",
        "contract_failure",
        "identity_conflict",
        "policy_failure",
        "environmental_failure",
    ]),
    path: z.string().startsWith("/").nullable(),
    message: z.string().min(1),
    guidance: z.string().min(1),
})
    .strict();
const validationSummarySchema = z
    .object({
    entities: z.number().int().nonnegative(),
    programs: z.number().int().nonnegative().optional(),
    offers: z.number().int().nonnegative().optional(),
    declarations: z.number().int().nonnegative().optional(),
    release_id: z
        .string()
        .regex(/^sha256:[a-f0-9]{64}$/u)
        .optional(),
    snapshot_id: z
        .string()
        .regex(/^sha256:[a-f0-9]{64}$/u)
        .optional(),
    files: z.number().int().nonnegative().optional(),
    identity_context_digest: digestSchema.optional(),
    live_parent_release_id: digestSchema.optional(),
})
    .strict();
export const catalogVerifierResultSchema = z
    .object({
    result_contract: z.literal("sourcey.catalog-verifier-result/v1alpha1"),
    operation: z.enum(["validate.startup-credits", "validate.agent-readiness", "verify-release"]),
    status: z.enum(["valid", "invalid"]),
    summary: validationSummarySchema.nullable(),
    diagnostics: z.array(catalogVerifierDiagnosticSchema),
})
    .strict()
    .superRefine((result, context) => {
    if ((result.status === "valid") !== (result.diagnostics.length === 0)) {
        context.addIssue({
            code: "custom",
            path: ["diagnostics"],
            message: "A valid result has no diagnostics; an invalid result has at least one.",
        });
    }
    if ((result.status === "valid") !== (result.summary !== null)) {
        context.addIssue({
            code: "custom",
            path: ["summary"],
            message: "Only a valid result carries its exact validation summary.",
        });
    }
});
export const catalogVerifierCriterionSchema = z
    .object({
    rule_id: catalogVerifierDiagnosticSchema.shape.rule_id,
    repository_kind: verifierRepositoryKindSchema,
    title: z.string().min(1),
    requirement: z.string().min(1),
    exclusion: z.string().min(1).nullable(),
})
    .strict();
export const catalogVerifierCandidateInputSchema = z
    .object({
    repositoryKind: verifierRepositoryKindSchema,
    sources: z.array(z
        .object({
        source: z.string().min(1),
        content: z.string(),
    })
        .strict()),
    taxonomy: catalogTaxonomySchema.optional(),
})
    .strict();
export const catalogVerifierIdentityContextCoreSchema = z
    .object({
    context_contract: z.literal("sourcey.catalog-verifier-identity-context/v1alpha1"),
    query_digest: digestSchema,
    response_digest: digestSchema,
    live_parent_release_id: digestSchema,
    live_parent_release_sequence: z.number().int().positive(),
    issued_at: instantSchema,
    expires_at: instantSchema,
})
    .strict()
    .superRefine((value, context) => {
    if (Date.parse(value.expires_at) <= Date.parse(value.issued_at)) {
        context.addIssue({
            code: "custom",
            path: ["expires_at"],
            message: "Verifier identity context must expire after it is issued.",
        });
    }
});
export const catalogVerifierIdentityContextSchema = catalogVerifierIdentityContextCoreSchema
    .extend({
    context_digest: digestSchema,
    protected: protectedSignatureSchema,
})
    .strict();
export const catalogVerifierIdentityContextPacketSchema = z
    .object({
    packet_contract: z.literal("sourcey.catalog-verifier-identity-context-packet/v1alpha1"),
    query: catalogAdmissionConflictLookupRequestSchema,
    response: catalogAdmissionConflictLookupResponseSchema,
    context: catalogVerifierIdentityContextSchema,
    signer_registry: signerRegistrySchema,
})
    .strict();
//# sourceMappingURL=index.js.map