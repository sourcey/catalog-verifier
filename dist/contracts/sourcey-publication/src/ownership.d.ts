/**
 * What each installed Sourcey adapter owns in a release. Policy and trust objects
 * stay with the catalog core until authority moves into the engine.
 */
export declare const sourceyReleaseOwnership: Readonly<{
    instanceId: string;
    subjectTypes: readonly string[];
    assertResources(resources: Readonly<Record<string, string>>): void;
    hasResource(name: string): boolean;
    claimsObjectPath(path: string): boolean;
    assertOwned(paths: Iterable<string>): void;
}>;
//# sourceMappingURL=ownership.d.ts.map