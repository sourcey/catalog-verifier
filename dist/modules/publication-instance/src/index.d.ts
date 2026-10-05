import { type CatalogReleaseDelivery } from "../../../contracts/release/src/index.js";
/** The domain transition a delta release carries beside its envelope. */
export declare const SOURCEY_DELTA_STATE_FILE = "delta.json";
/**
 * Sourcey's installed release envelope: the engine's layout and checks, Sourcey's
 * signed contract identifiers and the objects each Sourcey adapter owns. A delta
 * release carries its domain transition as a state file; a full release has none.
 */
export declare const sourceyReleaseEnvelope: Readonly<{
    schemas: Readonly<{
        contracts: {
            readonly manifest: "sourcey.release-object-manifest/v1alpha1";
            readonly snapshot: "sourcey.snapshot-core/v1alpha1";
            readonly artifact: "sourcey.canonical-artifact/v1alpha1";
            readonly release: "sourcey.release-core/v1alpha1";
            readonly descriptor: "sourcey.release-descriptor/v1alpha1";
            readonly diff: "sourcey.release-diff/v1alpha1";
            readonly bundle: "sourcey.catalog-release-bundle/v1alpha1";
            readonly resourceTransition: "sourcey.projection-transition/v1alpha1";
        };
        change: import("zod").ZodObject<{
            change_id: import("zod").ZodString;
            kind: import("zod").ZodString;
            subject_type: import("zod").ZodEnum<{
                agent_readiness_profile: "agent_readiness_profile";
                asset_binding: "asset_binding";
                entity: "entity";
                offer: "offer";
                policy: "policy";
                program: "program";
            }>;
            subject_id: import("zod").ZodUnion<readonly [import("zod").ZodString, import("zod").ZodString]>;
            revision_digest: import("zod").ZodOptional<import("zod").ZodString>;
            previous_revision_digest: import("zod").ZodOptional<import("zod").ZodString>;
            projection_digest: import("zod").ZodOptional<import("zod").ZodString>;
            previous_projection_digest: import("zod").ZodOptional<import("zod").ZodString>;
            basis_event_ids: import("zod").ZodArray<import("zod").ZodString>;
            tombstone: import("zod").ZodOptional<import("zod").ZodObject<{
                reason: import("zod").ZodEnum<{
                    ended: "ended";
                    retired: "retired";
                    withdrawn: "withdrawn";
                }>;
                canonical_route: import("zod").ZodOptional<import("zod").ZodString>;
            }, import("zod/v4/core").$strict>>;
        }, import("zod/v4/core").$strict>;
        subjectTypes: readonly string[];
        objectManifest: import("zod").ZodObject<{
            manifest_contract: import("zod").ZodLiteral<string>;
            objects: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                sha256: import("zod").ZodString;
                bytes: import("zod").ZodNumber;
            }, import("zod/v4/core").$strict>>;
        }, import("zod/v4/core").$strict>;
        snapshotCore: import("zod").ZodObject<{
            snapshot_contract: import("zod").ZodLiteral<string>;
            release_sequence: import("zod").ZodNumber;
            compiler_version: import("zod").ZodString;
            artifact_contract: import("zod").ZodLiteral<string>;
            input_set_digest: import("zod").ZodString;
            artifact_digest: import("zod").ZodString;
            resource_digests: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>;
            root_set_digest: import("zod").ZodString;
            signer_registry_digest: import("zod").ZodString;
            trust_transition_digest: import("zod").ZodNullable<import("zod").ZodString>;
            policy_as_of: import("zod").ZodISODateTime;
        }, import("zod/v4/core").$strict>;
        releaseCore: import("zod").ZodObject<{
            release_contract: import("zod").ZodLiteral<string>;
            release_sequence: import("zod").ZodNumber;
            snapshot_id: import("zod").ZodString;
            parent_release_id: import("zod").ZodNullable<import("zod").ZodString>;
            diff_digest: import("zod").ZodString;
        }, import("zod/v4/core").$strict>;
        descriptor: import("zod").ZodObject<{
            descriptor_contract: import("zod").ZodLiteral<string>;
            snapshot_core: import("zod").ZodObject<{
                snapshot_contract: import("zod").ZodLiteral<string>;
                release_sequence: import("zod").ZodNumber;
                compiler_version: import("zod").ZodString;
                artifact_contract: import("zod").ZodLiteral<string>;
                input_set_digest: import("zod").ZodString;
                artifact_digest: import("zod").ZodString;
                resource_digests: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>;
                root_set_digest: import("zod").ZodString;
                signer_registry_digest: import("zod").ZodString;
                trust_transition_digest: import("zod").ZodNullable<import("zod").ZodString>;
                policy_as_of: import("zod").ZodISODateTime;
            }, import("zod/v4/core").$strict>;
            snapshot_id: import("zod").ZodString;
            release_core: import("zod").ZodObject<{
                release_contract: import("zod").ZodLiteral<string>;
                release_sequence: import("zod").ZodNumber;
                snapshot_id: import("zod").ZodString;
                parent_release_id: import("zod").ZodNullable<import("zod").ZodString>;
                diff_digest: import("zod").ZodString;
            }, import("zod/v4/core").$strict>;
            release_id: import("zod").ZodString;
        }, import("zod/v4/core").$strict>;
        diff: import("zod").ZodObject<{
            diff_contract: import("zod").ZodLiteral<string>;
            parent_snapshot_id: import("zod").ZodNullable<import("zod").ZodString>;
            snapshot_id: import("zod").ZodString;
            changes: import("zod").ZodArray<import("zod").ZodObject<{
                change_id: import("zod").ZodString;
                kind: import("zod").ZodString;
                subject_type: import("zod").ZodEnum<{
                    agent_readiness_profile: "agent_readiness_profile";
                    asset_binding: "asset_binding";
                    entity: "entity";
                    offer: "offer";
                    policy: "policy";
                    program: "program";
                }>;
                subject_id: import("zod").ZodUnion<readonly [import("zod").ZodString, import("zod").ZodString]>;
                revision_digest: import("zod").ZodOptional<import("zod").ZodString>;
                previous_revision_digest: import("zod").ZodOptional<import("zod").ZodString>;
                projection_digest: import("zod").ZodOptional<import("zod").ZodString>;
                previous_projection_digest: import("zod").ZodOptional<import("zod").ZodString>;
                basis_event_ids: import("zod").ZodArray<import("zod").ZodString>;
                tombstone: import("zod").ZodOptional<import("zod").ZodObject<{
                    reason: import("zod").ZodEnum<{
                        ended: "ended";
                        retired: "retired";
                        withdrawn: "withdrawn";
                    }>;
                    canonical_route: import("zod").ZodOptional<import("zod").ZodString>;
                }, import("zod/v4/core").$strict>>;
            }, import("zod/v4/core").$strict>>;
        }, import("zod/v4/core").$strict>;
        bundle: import("zod").ZodObject<{
            bundle_contract: import("zod").ZodLiteral<string>;
            admitted_input_digests: import("zod").ZodArray<import("zod").ZodString>;
            verifier_digest: import("zod").ZodString;
            object_manifest_digest: import("zod").ZodString;
            release: import("zod").ZodObject<{
                descriptor_contract: import("zod").ZodLiteral<string>;
                snapshot_core: import("zod").ZodObject<{
                    snapshot_contract: import("zod").ZodLiteral<string>;
                    release_sequence: import("zod").ZodNumber;
                    compiler_version: import("zod").ZodString;
                    artifact_contract: import("zod").ZodLiteral<string>;
                    input_set_digest: import("zod").ZodString;
                    artifact_digest: import("zod").ZodString;
                    resource_digests: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>;
                    root_set_digest: import("zod").ZodString;
                    signer_registry_digest: import("zod").ZodString;
                    trust_transition_digest: import("zod").ZodNullable<import("zod").ZodString>;
                    policy_as_of: import("zod").ZodISODateTime;
                }, import("zod/v4/core").$strict>;
                snapshot_id: import("zod").ZodString;
                release_core: import("zod").ZodObject<{
                    release_contract: import("zod").ZodLiteral<string>;
                    release_sequence: import("zod").ZodNumber;
                    snapshot_id: import("zod").ZodString;
                    parent_release_id: import("zod").ZodNullable<import("zod").ZodString>;
                    diff_digest: import("zod").ZodString;
                }, import("zod/v4/core").$strict>;
                release_id: import("zod").ZodString;
            }, import("zod/v4/core").$strict>;
            resource_digests: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>;
            files: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                sha256: import("zod").ZodString;
                bytes: import("zod").ZodNumber;
            }, import("zod/v4/core").$strict>>;
            bundle_digest: import("zod").ZodString;
        }, import("zod/v4/core").$strict>;
    }>;
    ownership: Readonly<{
        instanceId: string;
        subjectTypes: readonly string[];
        assertResources(resources: Readonly<Record<string, string>>): void;
        hasResource(name: string): boolean;
        claimsObjectPath(path: string): boolean;
        assertOwned(paths: Iterable<string>): void;
    }>;
    stateFiles: readonly string[];
    resourceTransitionDigest(resource: string, parentDigest: string, changes: unknown): import("provenry/primitives").Digest;
    begin(input: ReadonlyMap<string, string | Buffer>): Readonly<{
        manifest: {
            manifest_contract: string;
            objects: Record<string, {
                sha256: string;
                bytes: number;
            }>;
        };
        manifestDigest: `sha256:${string}`;
        seal: (sealInput: import("provenry/publication/envelope").PublicationSealInput<{
            readonly manifest: "sourcey.release-object-manifest/v1alpha1";
            readonly snapshot: "sourcey.snapshot-core/v1alpha1";
            readonly artifact: "sourcey.canonical-artifact/v1alpha1";
            readonly release: "sourcey.release-core/v1alpha1";
            readonly descriptor: "sourcey.release-descriptor/v1alpha1";
            readonly diff: "sourcey.release-diff/v1alpha1";
            readonly bundle: "sourcey.catalog-release-bundle/v1alpha1";
            readonly resourceTransition: "sourcey.projection-transition/v1alpha1";
        }, import("zod").ZodObject<{
            change_id: import("zod").ZodString;
            kind: import("zod").ZodString;
            subject_type: import("zod").ZodEnum<{
                agent_readiness_profile: "agent_readiness_profile";
                asset_binding: "asset_binding";
                entity: "entity";
                offer: "offer";
                policy: "policy";
                program: "program";
            }>;
            subject_id: import("zod").ZodUnion<readonly [import("zod").ZodString, import("zod").ZodString]>;
            revision_digest: import("zod").ZodOptional<import("zod").ZodString>;
            previous_revision_digest: import("zod").ZodOptional<import("zod").ZodString>;
            projection_digest: import("zod").ZodOptional<import("zod").ZodString>;
            previous_projection_digest: import("zod").ZodOptional<import("zod").ZodString>;
            basis_event_ids: import("zod").ZodArray<import("zod").ZodString>;
            tombstone: import("zod").ZodOptional<import("zod").ZodObject<{
                reason: import("zod").ZodEnum<{
                    ended: "ended";
                    retired: "retired";
                    withdrawn: "withdrawn";
                }>;
                canonical_route: import("zod").ZodOptional<import("zod").ZodString>;
            }, import("zod/v4/core").$strict>>;
        }, import("zod/v4/core").$strict>>) => Readonly<{
            files: ReadonlyMap<string, string | Buffer>;
            bundle: {
                bundle_contract: string;
                admitted_input_digests: string[];
                verifier_digest: string;
                object_manifest_digest: string;
                release: {
                    descriptor_contract: string;
                    snapshot_core: {
                        snapshot_contract: string;
                        release_sequence: number;
                        compiler_version: string;
                        artifact_contract: string;
                        input_set_digest: string;
                        artifact_digest: string;
                        resource_digests: Record<string, string>;
                        root_set_digest: string;
                        signer_registry_digest: string;
                        trust_transition_digest: string | null;
                        policy_as_of: string;
                    };
                    snapshot_id: string;
                    release_core: {
                        release_contract: string;
                        release_sequence: number;
                        snapshot_id: string;
                        parent_release_id: string | null;
                        diff_digest: string;
                    };
                    release_id: string;
                };
                resource_digests: Record<string, string>;
                files: Record<string, {
                    sha256: string;
                    bytes: number;
                }>;
                bundle_digest: string;
            };
            bundleBytes: string;
            descriptor: {
                descriptor_contract: string;
                snapshot_core: {
                    snapshot_contract: string;
                    release_sequence: number;
                    compiler_version: string;
                    artifact_contract: string;
                    input_set_digest: string;
                    artifact_digest: string;
                    resource_digests: Record<string, string>;
                    root_set_digest: string;
                    signer_registry_digest: string;
                    trust_transition_digest: string | null;
                    policy_as_of: string;
                };
                snapshot_id: string;
                release_core: {
                    release_contract: string;
                    release_sequence: number;
                    snapshot_id: string;
                    parent_release_id: string | null;
                    diff_digest: string;
                };
                release_id: string;
            };
            diff: {
                diff_contract: string;
                parent_snapshot_id: string | null;
                snapshot_id: string;
                changes: {
                    change_id: string;
                    kind: string;
                    subject_type: "agent_readiness_profile" | "asset_binding" | "entity" | "offer" | "policy" | "program";
                    subject_id: string;
                    revision_digest?: string | undefined;
                    previous_revision_digest?: string | undefined;
                    projection_digest?: string | undefined;
                    previous_projection_digest?: string | undefined;
                    basis_event_ids: string[];
                    tombstone?: {
                        reason: "ended" | "retired" | "withdrawn";
                        canonical_route?: string | undefined;
                    } | undefined;
                }[];
            };
        }>;
    }>;
    verifyFiles(releaseFiles: ReadonlyMap<string, Buffer>): {
        readonly bundle: {
            bundle_contract: string;
            admitted_input_digests: string[];
            verifier_digest: string;
            object_manifest_digest: string;
            release: {
                descriptor_contract: string;
                snapshot_core: {
                    snapshot_contract: string;
                    release_sequence: number;
                    compiler_version: string;
                    artifact_contract: string;
                    input_set_digest: string;
                    artifact_digest: string;
                    resource_digests: Record<string, string>;
                    root_set_digest: string;
                    signer_registry_digest: string;
                    trust_transition_digest: string | null;
                    policy_as_of: string;
                };
                snapshot_id: string;
                release_core: {
                    release_contract: string;
                    release_sequence: number;
                    snapshot_id: string;
                    parent_release_id: string | null;
                    diff_digest: string;
                };
                release_id: string;
            };
            resource_digests: Record<string, string>;
            files: Record<string, {
                sha256: string;
                bytes: number;
            }>;
            bundle_digest: string;
        };
        readonly files: ReadonlyMap<string, Buffer>;
    };
    verify(releaseFiles: ReadonlyMap<string, Buffer>): Readonly<{
        bundle: {
            bundle_contract: string;
            admitted_input_digests: string[];
            verifier_digest: string;
            object_manifest_digest: string;
            release: {
                descriptor_contract: string;
                snapshot_core: {
                    snapshot_contract: string;
                    release_sequence: number;
                    compiler_version: string;
                    artifact_contract: string;
                    input_set_digest: string;
                    artifact_digest: string;
                    resource_digests: Record<string, string>;
                    root_set_digest: string;
                    signer_registry_digest: string;
                    trust_transition_digest: string | null;
                    policy_as_of: string;
                };
                snapshot_id: string;
                release_core: {
                    release_contract: string;
                    release_sequence: number;
                    snapshot_id: string;
                    parent_release_id: string | null;
                    diff_digest: string;
                };
                release_id: string;
            };
            resource_digests: Record<string, string>;
            files: Record<string, {
                sha256: string;
                bytes: number;
            }>;
            bundle_digest: string;
        };
        descriptor: {
            descriptor_contract: string;
            snapshot_core: {
                snapshot_contract: string;
                release_sequence: number;
                compiler_version: string;
                artifact_contract: string;
                input_set_digest: string;
                artifact_digest: string;
                resource_digests: Record<string, string>;
                root_set_digest: string;
                signer_registry_digest: string;
                trust_transition_digest: string | null;
                policy_as_of: string;
            };
            snapshot_id: string;
            release_core: {
                release_contract: string;
                release_sequence: number;
                snapshot_id: string;
                parent_release_id: string | null;
                diff_digest: string;
            };
            release_id: string;
        };
        manifest: {
            manifest_contract: string;
            objects: Record<string, {
                sha256: string;
                bytes: number;
            }>;
        };
        diff: {
            diff_contract: string;
            parent_snapshot_id: string | null;
            snapshot_id: string;
            changes: {
                change_id: string;
                kind: string;
                subject_type: "agent_readiness_profile" | "asset_binding" | "entity" | "offer" | "policy" | "program";
                subject_id: string;
                revision_digest?: string | undefined;
                previous_revision_digest?: string | undefined;
                projection_digest?: string | undefined;
                previous_projection_digest?: string | undefined;
                basis_event_ids: string[];
                tombstone?: {
                    reason: "ended" | "retired" | "withdrawn";
                    canonical_route?: string | undefined;
                } | undefined;
            }[];
        };
        changes: readonly {
            change_id: string;
            kind: string;
            subject_type: "agent_readiness_profile" | "asset_binding" | "entity" | "offer" | "policy" | "program";
            subject_id: string;
            revision_digest?: string | undefined;
            previous_revision_digest?: string | undefined;
            projection_digest?: string | undefined;
            previous_projection_digest?: string | undefined;
            basis_event_ids: string[];
            tombstone?: {
                reason: "ended" | "retired" | "withdrawn";
                canonical_route?: string | undefined;
            } | undefined;
        }[];
        files: ReadonlyMap<string, Buffer<ArrayBufferLike>>;
        stateFiles: ReadonlyMap<string, Buffer>;
    }>;
    assertSuccessor(successor: {
        readonly descriptor: import("provenry/publication/envelope").PublicationDescriptorFields;
        readonly diff: {
            readonly parent_snapshot_id: string | null;
        };
        readonly parent: import("provenry/publication/envelope").PublicationParent | null;
    }): void;
}>;
type VerifiedSourceyEnvelope = ReturnType<typeof sourceyReleaseEnvelope.verify>;
/** One release with verified envelope bindings, typed by the state file it carries. */
export type VerifiedSourceyRelease = {
    readonly kind: "full";
    readonly envelope: VerifiedSourceyEnvelope;
} | {
    readonly kind: "delta";
    readonly envelope: VerifiedSourceyEnvelope;
    readonly delta: Buffer;
};
/** Reads a materialized release once and verifies its envelope once. */
export declare function readVerifiedSourceyRelease(directory: string): Promise<VerifiedSourceyRelease>;
export declare function catalogReleaseDelivery(bundleDigest: string): CatalogReleaseDelivery;
export {};
//# sourceMappingURL=index.d.ts.map