export declare const SOURCEY_WORKSPACE_REPOSITORY = "https://github.com/sourcey/sourcey-workspace";
export declare const SOURCEY_ARTIFACT_ORIGIN = "https://artifacts.sourcey.com";
export declare function contractArtifactDelivery(input: {
    distributionId: string;
    version: string;
    artifactDigest: string;
}): {
    tag: string;
    prefix: string;
};
export declare function evidenceOpsDelivery(bundleDigest: string, sourceCommit: string): {
    tag: string;
    prefix: string;
};
export declare function sourceyArtifactUrl(path: string): string;
export declare function sourceyArtifactPrefix(value: string, expectedName: string): string;
//# sourceMappingURL=distribution.d.ts.map