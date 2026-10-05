export const SOURCEY_WORKSPACE_REPOSITORY = "https://github.com/sourcey/sourcey-workspace";
export const SOURCEY_ARTIFACT_ORIGIN = "https://artifacts.sourcey.com";
export function contractArtifactDelivery(input) {
    const { distributionId, version, artifactDigest } = input;
    if (!["openapi", "mcp-registry"].includes(distributionId)) {
        throw new Error("Unknown Sourcey contract distribution.");
    }
    if (!/^\d+\.\d+\.\d+$/.test(version)) {
        throw new Error("Sourcey contract version must be exact SemVer.");
    }
    const digestPath = digestPathSegment(artifactDigest);
    const tagPrefix = distributionId === "openapi" ? "api-contract-v" : "mcp-v";
    const tag = `${tagPrefix}${version}`;
    return { tag, prefix: `contracts/${distributionId}/${tag}/${digestPath}` };
}
export function evidenceOpsDelivery(bundleDigest, sourceCommit) {
    const digestPath = digestPathSegment(bundleDigest);
    return {
        tag: `evidence-ops-${digestPath}`,
        prefix: `catalog/evidence-ops/evidence-ops-${digestPath}/${sourcePathSegment(sourceCommit)}`,
    };
}
export function sourceyArtifactUrl(path) {
    if (typeof path !== "string" ||
        path.length === 0 ||
        path.startsWith("/") ||
        path.includes("\\") ||
        path.split("/").some((segment) => !segment || segment === "." || segment === ".."))
        throw new Error("Sourcey artifact path must be a safe relative path.");
    return `${SOURCEY_ARTIFACT_ORIGIN}/${path}`;
}
export function sourceyArtifactPrefix(value, expectedName) {
    const url = new URL(value);
    if (url.origin !== SOURCEY_ARTIFACT_ORIGIN ||
        url.search ||
        url.hash ||
        typeof expectedName !== "string" ||
        !expectedName ||
        !url.pathname.endsWith(`/${expectedName}`))
        throw new Error("Artifact release URL is outside its exact Sourcey publication.");
    const prefix = url.pathname.slice(1, -(expectedName.length + 1));
    if (!prefix ||
        prefix.split("/").some((segment) => !segment || segment === "." || segment === ".."))
        throw new Error("Artifact release URL has an invalid publication prefix.");
    return prefix;
}
function digestPathSegment(value) {
    if (!/^sha256:[a-f0-9]{64}$/.test(value ?? ""))
        throw new Error("Sourcey artifact digest must be an exact SHA-256 digest.");
    return value.replace(":", "-");
}
function sourcePathSegment(value) {
    if (!/^[a-f0-9]{40}$/.test(value ?? ""))
        throw new Error("Sourcey artifact source must be an exact Git commit.");
    return `source-${value}`;
}
//# sourceMappingURL=distribution.js.map