import { compareCanonicalStrings, DIGEST_PATTERN, digest, IDENTIFIER_PATTERN, } from "provenry/primitives";
import { z } from "zod";
import { evidenceDerivationRuleSchema, evidenceLocatorSchema, evidenceProofKindSchema, } from "../../../contracts/evidence/src/index.js";
import { catalogRevisionContracts, } from "../../../contracts/revisions/src/index.js";
import { ENTITY_ID_PATTERN, OFFER_ID_PATTERN, PROGRAM_ID_PATTERN, } from "../../catalog-primitives/src/index.js";
import { applicableEvidenceCoverageRequirements, evidenceCoverageCandidateRequirements, valueAtEvidencePointer, } from "./evidence-coverage.js";
const digestSchema = z.string().regex(DIGEST_PATTERN);
const identifierSchema = z.string().regex(IDENTIFIER_PATTERN);
const pointerSchema = z.string().regex(/^\/(?:[^~/]|~0|~1)+(?:\/(?:[^~/]|~0|~1)+)*$/u);
export const materialClaimSemanticTypeSchema = z.enum([
    "exact_text",
    "editorial_text",
    "domain",
    "url",
    "taxonomy",
    "lifecycle_state",
    "qualifier",
    "money_amount",
    "currency",
    "percentage",
    "duration",
    "eligibility_composition",
    "eligibility_value",
    "source_authority",
    "access",
    "boolean",
    "number",
    "composition",
    "structured_value",
]);
export const materialClaimSubjectSchema = z.discriminatedUnion("subject_type", [
    z
        .object({
        subject_type: z.literal("entity"),
        entity_id: z.string().regex(ENTITY_ID_PATTERN),
        revision_digest: digestSchema,
    })
        .strict(),
    z
        .object({
        subject_type: z.literal("program"),
        entity_id: z.string().regex(ENTITY_ID_PATTERN),
        program_id: z.string().regex(PROGRAM_ID_PATTERN),
        revision_digest: digestSchema,
    })
        .strict(),
    z
        .object({
        subject_type: z.literal("offer"),
        entity_id: z.string().regex(ENTITY_ID_PATTERN),
        program_id: z.string().regex(PROGRAM_ID_PATTERN).optional(),
        offer_id: z.string().regex(OFFER_ID_PATTERN),
        revision_digest: digestSchema,
    })
        .strict(),
]);
export const materialClaimCoreSchema = z
    .object({
    policy_path: pointerSchema,
    path: pointerSchema,
    value_digest: digestSchema,
    semantic_type: materialClaimSemanticTypeSchema,
    proof_kinds: z.array(z.enum(["observed", "derived", "editorial", "attested"])).min(1),
    derivation_rules: z.array(identifierSchema),
    guidance: z.string().min(1).max(500),
    depends_on: z.array(digestSchema),
})
    .strict();
export const materialClaimSchema = materialClaimCoreSchema
    .extend({ claim_id: digestSchema })
    .strict();
export const materialClaimPlanCoreSchema = z
    .object({
    plan_contract: z.literal("sourcey.material-claim-plan/v1alpha1"),
    coverage_policy_digest: digestSchema,
    subject: materialClaimSubjectSchema,
    claims: z.array(materialClaimSchema).min(1).max(512),
})
    .strict();
export const materialClaimPlanSchema = materialClaimPlanCoreSchema
    .extend({ plan_digest: digestSchema })
    .strict();
export const materialClaimMatchBindingCoreSchema = z
    .object({
    source_id: identifierSchema,
    capture_digest: digestSchema,
    normalized_object_digest: digestSchema,
    adapter_id: identifierSchema,
    adapter_digest: digestSchema,
    proof_kind: evidenceProofKindSchema,
    derivation_rule: evidenceDerivationRuleSchema.nullable(),
    locators: z.array(evidenceLocatorSchema).min(1).max(16),
})
    .strict()
    .superRefine((value, context) => {
    if ((value.proof_kind === "derived") !== (value.derivation_rule !== null)) {
        context.addIssue({
            code: "custom",
            path: ["derivation_rule"],
            message: "Exactly a derived material-claim binding requires a derivation rule.",
        });
    }
});
export const materialClaimMatchBindingSchema = materialClaimMatchBindingCoreSchema
    .extend({ binding_digest: digestSchema })
    .strict();
export const materialClaimResultCoreSchema = z
    .object({
    result_contract: z.literal("sourcey.material-claim-result/v1alpha1"),
    claim_id: digestSchema,
    status: z.enum(["supported", "unsupported", "contradicted", "unresolved"]),
    bindings: z.array(materialClaimMatchBindingSchema).max(32),
    dependency_result_digests: z.array(digestSchema).max(512),
    residue: z.array(z
        .object({
        code: identifierSchema,
        detail_digest: digestSchema,
    })
        .strict()),
})
    .strict()
    .superRefine((value, context) => {
    if ((value.status === "supported" || value.status === "contradicted") &&
        value.bindings.length === 0 &&
        value.dependency_result_digests.length === 0) {
        context.addIssue({
            code: "custom",
            path: ["bindings"],
            message: `${value.status} material claims require an exact retained evidence binding.`,
        });
    }
    if (value.status === "supported" && value.residue.length > 0) {
        context.addIssue({
            code: "custom",
            path: ["residue"],
            message: "A supported material claim cannot retain unresolved residue.",
        });
    }
    if (value.status === "unresolved" && value.residue.length === 0) {
        context.addIssue({
            code: "custom",
            path: ["residue"],
            message: "An unresolved material claim must explain its typed residue.",
        });
    }
});
export const materialClaimResultSchema = materialClaimResultCoreSchema
    .extend({ result_digest: digestSchema })
    .strict();
/** Compile every applicable policy root into exact material leaves. */
export function deriveMaterialClaimPlan(input) {
    const { revision_digest: revisionDigest, ...revisionCore } = input.revision;
    if (digest(revisionCore) !== revisionDigest) {
        throw new Error("Material claim planning requires a content-addressed revision.");
    }
    const applicable = applicableEvidenceCoverageRequirements(input.revision.content, input.requirements);
    const claims = applicable
        .flatMap((requirement) => {
        const leafClaims = evidenceCoverageCandidateRequirements(input.revision.content, [
            requirement,
        ]).map((candidate) => {
            const value = valueAtEvidencePointer(input.revision.content, candidate.path);
            const core = materialClaimCoreSchema.parse({
                policy_path: requirement.path,
                path: candidate.path,
                value_digest: digest(value),
                semantic_type: classifyMaterialClaim(candidate.path, value, requirement),
                proof_kinds: candidate.proof_kinds,
                derivation_rules: candidate.derivation_rules,
                guidance: candidate.guidance,
                depends_on: [],
            });
            return materialClaimSchema.parse({ ...core, claim_id: digest(core) });
        });
        return [...leafClaims, ...compositionClaims(input.revision.content, requirement, leafClaims)];
    })
        .sort((left, right) => compareCanonicalStrings(left.path, right.path) ||
        compareCanonicalStrings(left.claim_id, right.claim_id));
    if (new Set(claims.map(({ claim_id: claimId }) => claimId)).size !== claims.length) {
        throw new Error("Material claim policy roots overlap after exact composition expansion.");
    }
    const core = materialClaimPlanCoreSchema.parse({
        plan_contract: "sourcey.material-claim-plan/v1alpha1",
        coverage_policy_digest: input.coveragePolicyDigest,
        subject: materialClaimSubject(input.revision),
        claims,
    });
    return materialClaimPlanSchema.parse({ ...core, plan_digest: digest(core) });
}
export function createMaterialClaimMatchBinding(input) {
    const core = materialClaimMatchBindingCoreSchema.parse(input);
    return materialClaimMatchBindingSchema.parse({ ...core, binding_digest: digest(core) });
}
export function createMaterialClaimResult(input) {
    const core = materialClaimResultCoreSchema.parse(input);
    return materialClaimResultSchema.parse({ ...core, result_digest: digest(core) });
}
export function verifyMaterialClaimEvaluation(input) {
    const plan = materialClaimPlanSchema.parse(input.plan);
    const { plan_digest: planDigest, ...planCore } = plan;
    if (digest(materialClaimPlanCoreSchema.parse(planCore)) !== planDigest) {
        throw new Error("Material claim plan digest does not match its exact content.");
    }
    for (const claim of plan.claims) {
        const { claim_id: claimId, ...claimCore } = claim;
        if (digest(materialClaimCoreSchema.parse(claimCore)) !== claimId) {
            throw new Error(`Material claim ${claimId} is not content-addressed correctly.`);
        }
    }
    const results = input.results.map((value) => materialClaimResultSchema.parse(value));
    const resultByClaim = new Map(results.map((result) => [result.claim_id, result]));
    const expected = [...plan.claims.map(({ claim_id: claimId }) => claimId)].sort(compareCanonicalStrings);
    const actual = [...results.map(({ claim_id: claimId }) => claimId)].sort(compareCanonicalStrings);
    if (actual.length !== expected.length ||
        actual.some((claimId, index) => claimId !== expected[index])) {
        throw new Error("Material claim results do not close the exact claim plan.");
    }
    for (const result of results) {
        const { result_digest: resultDigest, ...resultCore } = result;
        if (digest(materialClaimResultCoreSchema.parse(resultCore)) !== resultDigest) {
            throw new Error(`Material claim result ${resultDigest} is not content-addressed correctly.`);
        }
        const claim = plan.claims.find(({ claim_id: claimId }) => claimId === result.claim_id);
        if (!claim)
            throw new Error(`Material claim result ${resultDigest} names no claim.`);
        for (const binding of result.bindings) {
            const { binding_digest: bindingDigest, ...bindingCore } = binding;
            if (digest(materialClaimMatchBindingCoreSchema.parse(bindingCore)) !== bindingDigest) {
                throw new Error(`Material claim binding ${bindingDigest} is not content-addressed.`);
            }
            if (!claim.proof_kinds.includes(binding.proof_kind) ||
                (binding.derivation_rule !== null &&
                    !claim.derivation_rules.includes(binding.derivation_rule))) {
                throw new Error(`Material claim binding ${bindingDigest} uses proof outside claim ${claim.claim_id}.`);
            }
        }
        const expectedDependencies = claim.depends_on
            .map((claimId) => resultByClaim.get(claimId)?.result_digest)
            .filter((candidate) => candidate !== undefined)
            .sort(compareCanonicalStrings);
        const actualDependencies = [...result.dependency_result_digests].sort(compareCanonicalStrings);
        if (expectedDependencies.length !== claim.depends_on.length ||
            expectedDependencies.length !== actualDependencies.length ||
            expectedDependencies.some((candidate, index) => candidate !== actualDependencies[index])) {
            throw new Error(`Material claim result ${resultDigest} has an incomplete dependency closure.`);
        }
        if (result.status === "supported" &&
            claim.depends_on.some((claimId) => resultByClaim.get(claimId)?.status !== "supported")) {
            throw new Error(`Material claim result ${resultDigest} depends on a non-supported claim.`);
        }
    }
    return {
        plan,
        results: [...results].sort((left, right) => compareCanonicalStrings(left.claim_id, right.claim_id)),
    };
}
function compositionClaims(content, requirement, leaves) {
    const candidatePaths = new Set();
    for (const leaf of leaves) {
        let candidate = parentPointer(leaf.path);
        while (candidate !== null && pointerWithin(candidate, requirement.path)) {
            const value = valueAtEvidencePointer(content, candidate);
            if (typeof value === "object" && value !== null)
                candidatePaths.add(candidate);
            if (candidate === requirement.path)
                break;
            candidate = parentPointer(candidate);
        }
    }
    const claims = new Map(leaves.map((claim) => [claim.path, claim]));
    const compositions = [];
    for (const path of [...candidatePaths].sort((left, right) => pointerDepth(right) - pointerDepth(left))) {
        const descendants = [...claims.values()].filter((claim) => claim.path.startsWith(`${path}/`) && !hasIntermediateClaim(path, claim.path, claims));
        const value = valueAtEvidencePointer(content, path);
        if (!Array.isArray(value) && descendants.length < 2)
            continue;
        const dependsOn = descendants
            .map(({ claim_id: claimId }) => claimId)
            .sort(compareCanonicalStrings);
        const core = materialClaimCoreSchema.parse({
            policy_path: requirement.path,
            path,
            value_digest: digest({ composition_path: path, child_claim_ids: dependsOn }),
            semantic_type: "composition",
            proof_kinds: requirement.proof_kinds,
            derivation_rules: requirement.derivation_rules,
            guidance: requirement.guidance,
            depends_on: dependsOn,
        });
        const claim = materialClaimSchema.parse({ ...core, claim_id: digest(core) });
        claims.set(path, claim);
        compositions.push(claim);
    }
    return compositions;
}
function hasIntermediateClaim(ancestor, descendant, claims) {
    let candidate = parentPointer(descendant);
    while (candidate !== null && candidate !== ancestor) {
        if (claims.has(candidate))
            return true;
        candidate = parentPointer(candidate);
    }
    return false;
}
function parentPointer(path) {
    const separator = path.lastIndexOf("/");
    return separator <= 0 ? null : path.slice(0, separator);
}
function pointerWithin(candidate, root) {
    return candidate === root || candidate.startsWith(`${root}/`);
}
function pointerDepth(path) {
    return path.split("/").length - 1;
}
function materialClaimSubject(revision) {
    if (revision.revision_contract === catalogRevisionContracts.entity) {
        return {
            subject_type: "entity",
            entity_id: revision.entity_id,
            revision_digest: revision.revision_digest,
        };
    }
    if (revision.revision_contract === catalogRevisionContracts.program) {
        return {
            subject_type: "program",
            entity_id: revision.entity_id,
            program_id: revision.program_id,
            revision_digest: revision.revision_digest,
        };
    }
    return {
        subject_type: "offer",
        entity_id: revision.entity_id,
        ...(revision.program_id === undefined ? {} : { program_id: revision.program_id }),
        offer_id: revision.offer_id,
        revision_digest: revision.revision_digest,
    };
}
function classifyMaterialClaim(path, value, requirement) {
    if (path === "/category")
        return "taxonomy";
    if (path.startsWith("/domains/"))
        return "domain";
    if (path.startsWith("/roles/"))
        return "source_authority";
    if (path.startsWith("/lifecycle/"))
        return "lifecycle_state";
    if (path.startsWith("/access/"))
        return "access";
    if (/\/(?:url|terms_url)$/u.test(path) || path.startsWith("/links/"))
        return "url";
    if (path.endsWith("/minor_units"))
        return "money_amount";
    if (path.endsWith("/currency"))
        return "currency";
    if (path.includes("basis_points"))
        return "percentage";
    if (path.endsWith("/duration/value"))
        return "duration";
    if (path.startsWith("/eligibility/") && path.endsWith("/kind")) {
        return "eligibility_composition";
    }
    if (path.startsWith("/eligibility/"))
        return "eligibility_value";
    if (path.endsWith("/kind"))
        return "qualifier";
    if (requirement.proof_kinds.includes("editorial"))
        return "editorial_text";
    if (typeof value === "string")
        return "exact_text";
    if (typeof value === "number")
        return "number";
    if (typeof value === "boolean")
        return "boolean";
    return "structured_value";
}
//# sourceMappingURL=material-claims.js.map