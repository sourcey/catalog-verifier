import { coveragePolicyCoreSchema, coveragePolicySchema, freshnessPolicyCoreSchema, freshnessPolicySchema, } from "../../../contracts/policies/src/index.js";
import { RELEASE_RESOURCES, releasePolicyInputsSchema, releasePolicyObjectPath, releaseResourceDigest, } from "../../../contracts/release/src/index.js";
import { validateAgentReadinessPolicy } from "../../agent-readiness-policy/src/policy-validation.js";
import { validateAssuranceMethodPolicy } from "../../assurance/src/index.js";
import { digest } from "../../primitives/src/index.js";
/**
 * Proves that every policy pin, addressed policy object, Artifact projection,
 * and closed policy-input declaration names the same content-addressed bytes.
 */
export function assertReleasedPolicyClosure(input) {
    const policyObject = (resource) => parseJson(input.files, releasePolicyObjectPath(releaseResourceDigest(input.bundle.resource_digests, resource)));
    const agentReadinessPolicy = validateAgentReadinessPolicy(policyObject(RELEASE_RESOURCES.agentReadinessPolicy));
    const assuranceMethodPolicy = validateAssuranceMethodPolicy(policyObject(RELEASE_RESOURCES.assuranceMethodPolicy));
    const coveragePolicy = coveragePolicySchema.parse(policyObject(RELEASE_RESOURCES.coveragePolicy));
    const freshnessPolicy = freshnessPolicySchema.parse(policyObject(RELEASE_RESOURCES.freshnessPolicy));
    const { policy_digest: coveragePolicyDigest, ...coveragePolicyCore } = coveragePolicy;
    const { policy_digest: freshnessPolicyDigest, ...freshnessPolicyCore } = freshnessPolicy;
    if (digest(coveragePolicyCoreSchema.parse(coveragePolicyCore)) !== coveragePolicyDigest ||
        digest(freshnessPolicyCoreSchema.parse(freshnessPolicyCore)) !== freshnessPolicyDigest) {
        throw new Error("Release coverage or freshness policy is not content-addressed.");
    }
    const releasePolicies = {
        [RELEASE_RESOURCES.agentReadinessPolicy]: agentReadinessPolicy.policy_digest,
        [RELEASE_RESOURCES.assuranceMethodPolicy]: assuranceMethodPolicy.policy_digest,
        [RELEASE_RESOURCES.coveragePolicy]: coveragePolicy.policy_digest,
        [RELEASE_RESOURCES.freshnessPolicy]: freshnessPolicy.policy_digest,
    };
    for (const [resource, policyDigest] of Object.entries(releasePolicies)) {
        if (input.bundle.resource_digests[resource] !== policyDigest ||
            input.artifactPolicyDigests[resource] !== policyDigest) {
            throw new Error(`Release policy ${resource} disagrees with its Artifact and bundle pins.`);
        }
    }
    const policyInputs = releasePolicyInputsSchema.parse(parseJson(input.files, "inputs/policies.json"));
    if (digest(policyInputs) !==
        releaseResourceDigest(input.snapshotResourceDigests, RELEASE_RESOURCES.policyInputs)) {
        throw new Error("Release policy inputs digest mismatch.");
    }
    if (policyInputs.agent_readiness_policy_digest !== agentReadinessPolicy.policy_digest ||
        policyInputs.assurance_method_policy_digest !== assuranceMethodPolicy.policy_digest ||
        policyInputs.coverage_policy_digest !== coveragePolicy.policy_digest ||
        policyInputs.freshness_policy_digest !== freshnessPolicy.policy_digest) {
        throw new Error("Release policy inputs disagree with the admitted policy objects.");
    }
}
function parseJson(files, path) {
    const bytes = files.get(path);
    if (!bytes)
        throw new Error(`Release is missing ${path}.`);
    return JSON.parse(bytes.toString("utf8"));
}
//# sourceMappingURL=policy-closure.js.map