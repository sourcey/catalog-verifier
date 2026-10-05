import { digest, parseJsonFile } from "provenry/primitives";
import { coveragePolicyCoreSchema, coveragePolicySchema, freshnessPolicyCoreSchema, freshnessPolicySchema, } from "../../../contracts/policies/src/index.js";
import { RELEASE_RESOURCES, releasePolicyObjectPath, releaseResourceDigest, } from "../../../contracts/release/src/index.js";
import { validateAgentReadinessPolicy } from "../../agent-readiness-policy/src/index.js";
import { CATALOG_RELEASE } from "../../artifact/src/release-directory-files.js";
import { validateAssuranceMethodPolicy } from "../../assurance/src/index.js";
export function verifyCatalogDeltaPolicies(bundle, delta, files) {
    const coverageExpected = releaseResourceDigest(bundle.resource_digests, RELEASE_RESOURCES.coveragePolicy);
    const coverage = coveragePolicySchema.parse(parseJsonFile(files, releasePolicyObjectPath(coverageExpected), CATALOG_RELEASE));
    const { policy_digest: coverageDigest, ...coverageCore } = coverage;
    const freshnessExpected = releaseResourceDigest(bundle.resource_digests, RELEASE_RESOURCES.freshnessPolicy);
    const freshness = freshnessPolicySchema.parse(parseJsonFile(files, releasePolicyObjectPath(freshnessExpected), CATALOG_RELEASE));
    const { policy_digest: freshnessDigest, ...freshnessCore } = freshness;
    const agentReadinessExpected = releaseResourceDigest(bundle.resource_digests, RELEASE_RESOURCES.agentReadinessPolicy);
    const agentReadiness = validateAgentReadinessPolicy(parseJsonFile(files, releasePolicyObjectPath(agentReadinessExpected), CATALOG_RELEASE));
    const assuranceMethodExpected = releaseResourceDigest(bundle.resource_digests, RELEASE_RESOURCES.assuranceMethodPolicy);
    const assuranceMethod = validateAssuranceMethodPolicy(parseJsonFile(files, releasePolicyObjectPath(assuranceMethodExpected), CATALOG_RELEASE));
    if (digest(coveragePolicyCoreSchema.parse(coverageCore)) !== coverageDigest ||
        digest(freshnessPolicyCoreSchema.parse(freshnessCore)) !== freshnessDigest ||
        coverageExpected !== coverageDigest ||
        freshnessExpected !== freshnessDigest ||
        agentReadinessExpected !== agentReadiness.policy_digest ||
        assuranceMethodExpected !== assuranceMethod.policy_digest ||
        releaseResourceDigest(delta.artifact_core.policy_digests, RELEASE_RESOURCES.agentReadinessPolicy) !== agentReadiness.policy_digest ||
        releaseResourceDigest(delta.artifact_core.policy_digests, RELEASE_RESOURCES.assuranceMethodPolicy) !== assuranceMethod.policy_digest ||
        releaseResourceDigest(delta.artifact_core.policy_digests, RELEASE_RESOURCES.coveragePolicy) !==
            coverageDigest ||
        releaseResourceDigest(delta.artifact_core.policy_digests, RELEASE_RESOURCES.freshnessPolicy) !==
            freshnessDigest) {
        throw new Error("Catalog delta policies do not match their canonical bundle digests.");
    }
    return {
        coveragePolicy: coverage,
        freshnessPolicy: freshness,
        agentReadinessPolicy: agentReadiness,
        assuranceMethodPolicy: assuranceMethod,
    };
}
//# sourceMappingURL=verification-policies.js.map