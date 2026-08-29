import { coveragePolicyCoreSchema, coveragePolicySchema, freshnessPolicyCoreSchema, freshnessPolicySchema, } from "../../../contracts/policies/src/index.js";
import { RELEASE_RESOURCES, releasePolicyObjectPath, releaseResourceDigest, } from "../../../contracts/release/src/index.js";
import { validateAgentReadinessPolicy } from "../../agent-readiness-policy/src/index.js";
import { digest } from "../../primitives/src/index.js";
export function verifyCatalogDeltaPolicies(bundle, delta, files) {
    const coverageExpected = releaseResourceDigest(bundle.resource_digests, RELEASE_RESOURCES.coveragePolicy);
    const coverage = coveragePolicySchema.parse(parseJson(files, releasePolicyObjectPath(coverageExpected)));
    const { policy_digest: coverageDigest, ...coverageCore } = coverage;
    const freshnessExpected = releaseResourceDigest(bundle.resource_digests, RELEASE_RESOURCES.freshnessPolicy);
    const freshness = freshnessPolicySchema.parse(parseJson(files, releasePolicyObjectPath(freshnessExpected)));
    const { policy_digest: freshnessDigest, ...freshnessCore } = freshness;
    const agentReadinessExpected = releaseResourceDigest(bundle.resource_digests, RELEASE_RESOURCES.agentReadinessPolicy);
    const agentReadiness = validateAgentReadinessPolicy(parseJson(files, releasePolicyObjectPath(agentReadinessExpected)));
    if (digest(coveragePolicyCoreSchema.parse(coverageCore)) !== coverageDigest ||
        digest(freshnessPolicyCoreSchema.parse(freshnessCore)) !== freshnessDigest ||
        coverageExpected !== coverageDigest ||
        freshnessExpected !== freshnessDigest ||
        agentReadinessExpected !== agentReadiness.policy_digest ||
        releaseResourceDigest(delta.artifact_core.policy_digests, RELEASE_RESOURCES.agentReadinessPolicy) !== agentReadiness.policy_digest ||
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
    };
}
function parseJson(files, path) {
    const bytes = files.get(path);
    if (!bytes)
        throw new Error(`Catalog delta bundle is missing ${path}.`);
    return JSON.parse(bytes.toString("utf8"));
}
//# sourceMappingURL=verification-policies.js.map