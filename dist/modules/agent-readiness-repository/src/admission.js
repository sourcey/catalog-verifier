import { z } from "zod";
import { AGENT_READINESS_REPOSITORY, agentReadinessIdentifierSchema, agentReadinessProfileIdSchema, agentReadinessReviewerIdSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { canonicalJson, digest } from "../../primitives/src/index.js";
const admissionCoreSchema = z
    .object({
    admission_contract: z.literal("sourcey.agent-readiness-repository-merge-admission/v1alpha1"),
    repository: z.literal(AGENT_READINESS_REPOSITORY),
    head_revision: z.string().regex(/^[a-f0-9]{40}$/u),
    reviewer_id: agentReadinessReviewerIdSchema,
    admitted_at: z.iso.datetime({ offset: true }),
    rationale: z.string().trim().min(1).max(2_000),
    profile_allocations: z.array(z
        .object({
        declaration_id: agentReadinessIdentifierSchema,
        agent_readiness_profile_id: agentReadinessProfileIdSchema,
        effective_from: z.iso.datetime({ offset: true }),
    })
        .strict()),
})
    .strict()
    .superRefine((value, context) => {
    if (new Set(value.profile_allocations.map((allocation) => allocation.declaration_id)).size !==
        value.profile_allocations.length) {
        context.addIssue({
            code: "custom",
            path: ["profile_allocations"],
            message: "Profile allocations must name unique declarations.",
        });
    }
});
export const agentReadinessRepositoryMergeAdmissionSchema = admissionCoreSchema
    .safeExtend({ admission_digest: z.string().regex(/^sha256:[a-f0-9]{64}$/u) })
    .strict();
export function buildAgentReadinessRepositoryMergeAdmission(input) {
    const core = admissionCoreSchema.parse(input);
    const allocations = [...core.profile_allocations].sort((left, right) => left.declaration_id.localeCompare(right.declaration_id));
    const normalized = admissionCoreSchema.parse({ ...core, profile_allocations: allocations });
    return agentReadinessRepositoryMergeAdmissionSchema.parse({
        ...normalized,
        admission_digest: digest(normalized),
    });
}
export function verifyAgentReadinessRepositoryMergeAdmission(input) {
    const parsed = agentReadinessRepositoryMergeAdmissionSchema.parse(input);
    const { admission_digest: admissionDigest, ...core } = parsed;
    const rebuilt = buildAgentReadinessRepositoryMergeAdmission(core);
    if (rebuilt.admission_digest !== admissionDigest ||
        canonicalJson(rebuilt) !== canonicalJson(parsed)) {
        throw new Error("Agent Readiness merge admission is not canonical.");
    }
    return parsed;
}
export function agentReadinessMergeAdmissionDigest(input) {
    return verifyAgentReadinessRepositoryMergeAdmission(input).admission_digest;
}
//# sourceMappingURL=admission.js.map