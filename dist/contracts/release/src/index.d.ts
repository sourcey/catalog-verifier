import { z } from "zod";
export declare const catalogReleaseDeliverySchema: z.ZodObject<{
    bundle_digest: z.ZodString;
    artifact_root: z.ZodURL;
    archive_url: z.ZodURL;
    checksum_url: z.ZodURL;
}, z.core.$strict>;
/** Sourcey's signed release contract identifiers; the engine owns their envelope shapes. */
export declare const SOURCEY_PUBLICATION_CONTRACTS: {
    readonly manifest: "sourcey.release-object-manifest/v1alpha1";
    readonly snapshot: "sourcey.snapshot-core/v1alpha1";
    readonly artifact: "sourcey.canonical-artifact/v1alpha1";
    readonly release: "sourcey.release-core/v1alpha1";
    readonly descriptor: "sourcey.release-descriptor/v1alpha1";
    readonly diff: "sourcey.release-diff/v1alpha1";
    readonly bundle: "sourcey.catalog-release-bundle/v1alpha1";
    readonly resourceTransition: "sourcey.projection-transition/v1alpha1";
};
/** The installed envelope schemas of Sourcey's publication instance. */
export declare const sourceyReleaseEnvelopeSchemas: Readonly<{
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
    change: z.ZodObject<{
        change_id: z.ZodString;
        kind: z.ZodString;
        subject_type: z.ZodEnum<{
            agent_readiness_profile: "agent_readiness_profile";
            asset_binding: "asset_binding";
            entity: "entity";
            offer: "offer";
            policy: "policy";
            program: "program";
        }>;
        subject_id: z.ZodUnion<readonly [z.ZodString, z.ZodString]>;
        revision_digest: z.ZodOptional<z.ZodString>;
        previous_revision_digest: z.ZodOptional<z.ZodString>;
        projection_digest: z.ZodOptional<z.ZodString>;
        previous_projection_digest: z.ZodOptional<z.ZodString>;
        basis_event_ids: z.ZodArray<z.ZodString>;
        tombstone: z.ZodOptional<z.ZodObject<{
            reason: z.ZodEnum<{
                ended: "ended";
                retired: "retired";
                withdrawn: "withdrawn";
            }>;
            canonical_route: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    subjectTypes: readonly string[];
    objectManifest: z.ZodObject<{
        manifest_contract: z.ZodLiteral<string>;
        objects: z.ZodRecord<z.ZodString, z.ZodObject<{
            sha256: z.ZodString;
            bytes: z.ZodNumber;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    snapshotCore: z.ZodObject<{
        snapshot_contract: z.ZodLiteral<string>;
        release_sequence: z.ZodNumber;
        compiler_version: z.ZodString;
        artifact_contract: z.ZodLiteral<string>;
        input_set_digest: z.ZodString;
        artifact_digest: z.ZodString;
        resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
        root_set_digest: z.ZodString;
        signer_registry_digest: z.ZodString;
        trust_transition_digest: z.ZodNullable<z.ZodString>;
        policy_as_of: z.ZodISODateTime;
    }, z.core.$strict>;
    releaseCore: z.ZodObject<{
        release_contract: z.ZodLiteral<string>;
        release_sequence: z.ZodNumber;
        snapshot_id: z.ZodString;
        parent_release_id: z.ZodNullable<z.ZodString>;
        diff_digest: z.ZodString;
    }, z.core.$strict>;
    descriptor: z.ZodObject<{
        descriptor_contract: z.ZodLiteral<string>;
        snapshot_core: z.ZodObject<{
            snapshot_contract: z.ZodLiteral<string>;
            release_sequence: z.ZodNumber;
            compiler_version: z.ZodString;
            artifact_contract: z.ZodLiteral<string>;
            input_set_digest: z.ZodString;
            artifact_digest: z.ZodString;
            resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
            root_set_digest: z.ZodString;
            signer_registry_digest: z.ZodString;
            trust_transition_digest: z.ZodNullable<z.ZodString>;
            policy_as_of: z.ZodISODateTime;
        }, z.core.$strict>;
        snapshot_id: z.ZodString;
        release_core: z.ZodObject<{
            release_contract: z.ZodLiteral<string>;
            release_sequence: z.ZodNumber;
            snapshot_id: z.ZodString;
            parent_release_id: z.ZodNullable<z.ZodString>;
            diff_digest: z.ZodString;
        }, z.core.$strict>;
        release_id: z.ZodString;
    }, z.core.$strict>;
    diff: z.ZodObject<{
        diff_contract: z.ZodLiteral<string>;
        parent_snapshot_id: z.ZodNullable<z.ZodString>;
        snapshot_id: z.ZodString;
        changes: z.ZodArray<z.ZodObject<{
            change_id: z.ZodString;
            kind: z.ZodString;
            subject_type: z.ZodEnum<{
                agent_readiness_profile: "agent_readiness_profile";
                asset_binding: "asset_binding";
                entity: "entity";
                offer: "offer";
                policy: "policy";
                program: "program";
            }>;
            subject_id: z.ZodUnion<readonly [z.ZodString, z.ZodString]>;
            revision_digest: z.ZodOptional<z.ZodString>;
            previous_revision_digest: z.ZodOptional<z.ZodString>;
            projection_digest: z.ZodOptional<z.ZodString>;
            previous_projection_digest: z.ZodOptional<z.ZodString>;
            basis_event_ids: z.ZodArray<z.ZodString>;
            tombstone: z.ZodOptional<z.ZodObject<{
                reason: z.ZodEnum<{
                    ended: "ended";
                    retired: "retired";
                    withdrawn: "withdrawn";
                }>;
                canonical_route: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    bundle: z.ZodObject<{
        bundle_contract: z.ZodLiteral<string>;
        admitted_input_digests: z.ZodArray<z.ZodString>;
        verifier_digest: z.ZodString;
        object_manifest_digest: z.ZodString;
        release: z.ZodObject<{
            descriptor_contract: z.ZodLiteral<string>;
            snapshot_core: z.ZodObject<{
                snapshot_contract: z.ZodLiteral<string>;
                release_sequence: z.ZodNumber;
                compiler_version: z.ZodString;
                artifact_contract: z.ZodLiteral<string>;
                input_set_digest: z.ZodString;
                artifact_digest: z.ZodString;
                resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
                root_set_digest: z.ZodString;
                signer_registry_digest: z.ZodString;
                trust_transition_digest: z.ZodNullable<z.ZodString>;
                policy_as_of: z.ZodISODateTime;
            }, z.core.$strict>;
            snapshot_id: z.ZodString;
            release_core: z.ZodObject<{
                release_contract: z.ZodLiteral<string>;
                release_sequence: z.ZodNumber;
                snapshot_id: z.ZodString;
                parent_release_id: z.ZodNullable<z.ZodString>;
                diff_digest: z.ZodString;
            }, z.core.$strict>;
            release_id: z.ZodString;
        }, z.core.$strict>;
        resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
        files: z.ZodRecord<z.ZodString, z.ZodObject<{
            sha256: z.ZodString;
            bytes: z.ZodNumber;
        }, z.core.$strict>>;
        bundle_digest: z.ZodString;
    }, z.core.$strict>;
}>;
export declare const RELEASE_RESOURCES: {
    readonly agentReadinessIndex: "agent-readiness-index";
    readonly agentReadinessInputs: "agent-readiness-inputs";
    readonly agentReadinessOfferRelationIndex: "agent-readiness-offer-relation-index";
    readonly agentReadinessOfferRelationInputs: "agent-readiness-offer-relation-inputs";
    readonly agentReadinessPolicy: "agent-readiness-policy";
    readonly assetIndex: "asset-index";
    readonly assetInputs: "asset-inputs";
    readonly assetManifest: "asset-manifest";
    readonly assuranceMethodPolicy: "assurance-method-policy";
    readonly coveragePolicy: "coverage-policy";
    readonly freshnessPolicy: "freshness-policy";
    readonly identities: "identities";
    readonly observationInputs: "observation-inputs";
    readonly observationManifest: "observation-manifest";
    readonly policyInputs: "policy-inputs";
    readonly provenance: "provenance";
    readonly routes: "routes";
    readonly searchIndex: "search-index";
};
export declare function releaseResourceDigest(resources: Readonly<Record<string, string>>, name: (typeof RELEASE_RESOURCES)[keyof typeof RELEASE_RESOURCES]): `sha256:${string}`;
export declare function releaseRootSetObjectPath(rootSetDigest: string): string;
export declare function releaseSignerRegistryObjectPath(signerRegistryDigest: string): string;
export declare function releaseTrustTransitionObjectPath(transitionDigest: string): string;
export declare function releasePolicyObjectPath(policyDigest: string): string;
export declare function releaseCaptureObjectPath(captureDigest: string): string;
/** A Provenry capture start, the reservation made before the fetch. */
export declare function releaseCaptureStartObjectPath(startDigest: string): string;
/** A Provenry capture attempt, what the fetch returned. */
export declare function releaseCaptureAttemptObjectPath(attemptDigest: string): string;
/** A Provenry capture attestation, the signature that proves a start and its attempt. */
export declare function releaseCaptureAttestationObjectPath(attestationDigest: string): string;
export declare function releaseNormalizedObjectPath(normalizedDigest: string): string;
declare const catalogDeltaEntityChangeSchema: z.ZodObject<{
    operation: z.ZodLiteral<"upsert">;
    entity_id: z.ZodString;
    prior_projection_digest: z.ZodNullable<z.ZodString>;
    projection_digest: z.ZodString;
    path: z.ZodString;
}, z.core.$strict>;
export declare const catalogStateTransitionCoreSchema: z.ZodObject<{
    state_contract: z.ZodLiteral<"sourcey.catalog-state-transition/v1alpha1">;
    parent_state_digest: z.ZodString;
    policy_as_of: z.ZodISODateTime;
    artifact_core: z.ZodObject<{
        artifact_contract: z.ZodLiteral<"sourcey.canonical-artifact/v1alpha1">;
        policy_as_of: z.ZodISODateTime;
        root_set_digest: z.ZodString;
        signer_registry_digest: z.ZodString;
        policy_digests: z.ZodRecord<z.ZodString, z.ZodString>;
        policies: z.ZodArray<z.ZodObject<{
            schema_version: z.ZodLiteral<"sourcey.policy/v1alpha1">;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodString;
            sections: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"prose">;
                heading: z.ZodOptional<z.ZodString>;
                paragraphs: z.ZodArray<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"clauses">;
                heading: z.ZodOptional<z.ZodString>;
                clauses: z.ZodArray<z.ZodObject<{
                    title: z.ZodString;
                    body: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"definitions">;
                heading: z.ZodOptional<z.ZodString>;
                definitions: z.ZodArray<z.ZodObject<{
                    term: z.ZodString;
                    detail: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"steps">;
                heading: z.ZodOptional<z.ZodString>;
                steps: z.ZodArray<z.ZodString>;
            }, z.core.$strict>], "kind">>;
            revision_digest: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    entity_changes: z.ZodArray<z.ZodObject<{
        operation: z.ZodLiteral<"upsert">;
        entity_id: z.ZodString;
        prior_projection_digest: z.ZodNullable<z.ZodString>;
        projection_digest: z.ZodString;
        path: z.ZodString;
    }, z.core.$strict>>;
    routes: z.ZodObject<{
        route_contract: z.ZodLiteral<"sourcey.catalog-routes/v1alpha1">;
        routes: z.ZodRecord<z.ZodString, z.ZodObject<{
            kind: z.ZodEnum<{
                entity: "entity";
                offer: "offer";
                program: "program";
                tombstone: "tombstone";
            }>;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodOptional<z.ZodString>;
            revision_digest: z.ZodOptional<z.ZodString>;
            canonical: z.ZodBoolean;
            canonical_route: z.ZodString;
            lifecycle: z.ZodOptional<z.ZodEnum<{
                active: "active";
                ended: "ended";
                withdrawn: "withdrawn";
            }>>;
            tombstone_reason: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    identities: z.ZodObject<{
        identity_contract: z.ZodLiteral<"sourcey.identities/v1alpha1">;
        canonical_entity_resolutions: z.ZodRecord<z.ZodString, z.ZodString>;
        canonical_program_resolutions: z.ZodRecord<z.ZodString, z.ZodString>;
        canonical_offer_resolutions: z.ZodRecord<z.ZodString, z.ZodString>;
        canonical_agent_readiness_profile_resolutions: z.ZodRecord<z.ZodString, z.ZodString>;
        program_reparents: z.ZodRecord<z.ZodString, z.ZodObject<{
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            event_id: z.ZodString;
        }, z.core.$strict>>;
        offer_reparents: z.ZodRecord<z.ZodString, z.ZodObject<{
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            event_id: z.ZodString;
        }, z.core.$strict>>;
        agent_readiness_profile_reparents: z.ZodRecord<z.ZodString, z.ZodObject<{
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            event_id: z.ZodString;
        }, z.core.$strict>>;
        asset_binding_dispositions: z.ZodRecord<z.ZodString, z.ZodObject<{
            disposition: z.ZodEnum<{
                end: "end";
                rebind: "rebind";
            }>;
            event_id: z.ZodString;
            replacement_binding_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
        split_relationships: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
        retired_entities: z.ZodArray<z.ZodString>;
        retired_programs: z.ZodArray<z.ZodString>;
        retired_offers: z.ZodArray<z.ZodString>;
        retired_agent_readiness_profiles: z.ZodArray<z.ZodString>;
    }, z.core.$strict>;
    provenance: z.ZodObject<{
        provenance_contract: z.ZodLiteral<"sourcey.provenance-index/v1alpha1">;
        revisions: z.ZodRecord<z.ZodString, z.ZodObject<{
            revision_digest: z.ZodString;
            first_inclusion_sequence: z.ZodNumber;
            event_ids: z.ZodArray<z.ZodString>;
            observation_ids: z.ZodArray<z.ZodString>;
            coverage_policy_digest: z.ZodString;
            freshness_policy_digest: z.ZodString;
        }, z.core.$strict>>;
        events: z.ZodRecord<z.ZodString, z.ZodObject<{
            event_id: z.ZodString;
            event_object_digest: z.ZodString;
            issuer_id: z.ZodString;
            operation_id: z.ZodString;
            signer_registry_digest: z.ZodString;
            first_inclusion_sequence: z.ZodNumber;
        }, z.core.$strict>>;
        capture_attestations: z.ZodRecord<z.ZodString, z.ZodObject<{
            attestation_digest: z.ZodString;
            attestation_object_digest: z.ZodString;
            start_digest: z.ZodString;
            attempt_digest: z.ZodString;
            signer_registry_digest: z.ZodString;
            first_inclusion_sequence: z.ZodNumber;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    authority_set_digests: z.ZodArray<z.ZodString>;
    object_manifest_digest: z.ZodString;
}, z.core.$strict>;
export declare const catalogDeltaCoreSchema: z.ZodObject<{
    delta_contract: z.ZodLiteral<"sourcey.catalog-delta/v1alpha1">;
    base: z.ZodObject<{
        release: z.ZodObject<{
            descriptor_contract: z.ZodLiteral<string>;
            snapshot_core: z.ZodObject<{
                snapshot_contract: z.ZodLiteral<string>;
                release_sequence: z.ZodNumber;
                compiler_version: z.ZodString;
                artifact_contract: z.ZodLiteral<string>;
                input_set_digest: z.ZodString;
                artifact_digest: z.ZodString;
                resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
                root_set_digest: z.ZodString;
                signer_registry_digest: z.ZodString;
                trust_transition_digest: z.ZodNullable<z.ZodString>;
                policy_as_of: z.ZodISODateTime;
            }, z.core.$strict>;
            snapshot_id: z.ZodString;
            release_core: z.ZodObject<{
                release_contract: z.ZodLiteral<string>;
                release_sequence: z.ZodNumber;
                snapshot_id: z.ZodString;
                parent_release_id: z.ZodNullable<z.ZodString>;
                diff_digest: z.ZodString;
            }, z.core.$strict>;
            release_id: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>;
    admitted_input_digests: z.ZodArray<z.ZodString>;
    policy_as_of: z.ZodISODateTime;
    artifact_core: z.ZodObject<{
        artifact_contract: z.ZodLiteral<"sourcey.canonical-artifact/v1alpha1">;
        policy_as_of: z.ZodISODateTime;
        root_set_digest: z.ZodString;
        signer_registry_digest: z.ZodString;
        policy_digests: z.ZodRecord<z.ZodString, z.ZodString>;
        policies: z.ZodArray<z.ZodObject<{
            schema_version: z.ZodLiteral<"sourcey.policy/v1alpha1">;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodString;
            sections: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"prose">;
                heading: z.ZodOptional<z.ZodString>;
                paragraphs: z.ZodArray<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"clauses">;
                heading: z.ZodOptional<z.ZodString>;
                clauses: z.ZodArray<z.ZodObject<{
                    title: z.ZodString;
                    body: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"definitions">;
                heading: z.ZodOptional<z.ZodString>;
                definitions: z.ZodArray<z.ZodObject<{
                    term: z.ZodString;
                    detail: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"steps">;
                heading: z.ZodOptional<z.ZodString>;
                steps: z.ZodArray<z.ZodString>;
            }, z.core.$strict>], "kind">>;
            revision_digest: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    entity_changes: z.ZodArray<z.ZodObject<{
        operation: z.ZodLiteral<"upsert">;
        entity_id: z.ZodString;
        prior_projection_digest: z.ZodNullable<z.ZodString>;
        projection_digest: z.ZodString;
        path: z.ZodString;
    }, z.core.$strict>>;
    routes: z.ZodObject<{
        route_contract: z.ZodLiteral<"sourcey.catalog-routes/v1alpha1">;
        routes: z.ZodRecord<z.ZodString, z.ZodObject<{
            kind: z.ZodEnum<{
                entity: "entity";
                offer: "offer";
                program: "program";
                tombstone: "tombstone";
            }>;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodOptional<z.ZodString>;
            revision_digest: z.ZodOptional<z.ZodString>;
            canonical: z.ZodBoolean;
            canonical_route: z.ZodString;
            lifecycle: z.ZodOptional<z.ZodEnum<{
                active: "active";
                ended: "ended";
                withdrawn: "withdrawn";
            }>>;
            tombstone_reason: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    identities: z.ZodObject<{
        identity_contract: z.ZodLiteral<"sourcey.identities/v1alpha1">;
        canonical_entity_resolutions: z.ZodRecord<z.ZodString, z.ZodString>;
        canonical_program_resolutions: z.ZodRecord<z.ZodString, z.ZodString>;
        canonical_offer_resolutions: z.ZodRecord<z.ZodString, z.ZodString>;
        canonical_agent_readiness_profile_resolutions: z.ZodRecord<z.ZodString, z.ZodString>;
        program_reparents: z.ZodRecord<z.ZodString, z.ZodObject<{
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            event_id: z.ZodString;
        }, z.core.$strict>>;
        offer_reparents: z.ZodRecord<z.ZodString, z.ZodObject<{
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            event_id: z.ZodString;
        }, z.core.$strict>>;
        agent_readiness_profile_reparents: z.ZodRecord<z.ZodString, z.ZodObject<{
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            event_id: z.ZodString;
        }, z.core.$strict>>;
        asset_binding_dispositions: z.ZodRecord<z.ZodString, z.ZodObject<{
            disposition: z.ZodEnum<{
                end: "end";
                rebind: "rebind";
            }>;
            event_id: z.ZodString;
            replacement_binding_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
        split_relationships: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
        retired_entities: z.ZodArray<z.ZodString>;
        retired_programs: z.ZodArray<z.ZodString>;
        retired_offers: z.ZodArray<z.ZodString>;
        retired_agent_readiness_profiles: z.ZodArray<z.ZodString>;
    }, z.core.$strict>;
    provenance: z.ZodObject<{
        provenance_contract: z.ZodLiteral<"sourcey.provenance-index/v1alpha1">;
        revisions: z.ZodRecord<z.ZodString, z.ZodObject<{
            revision_digest: z.ZodString;
            first_inclusion_sequence: z.ZodNumber;
            event_ids: z.ZodArray<z.ZodString>;
            observation_ids: z.ZodArray<z.ZodString>;
            coverage_policy_digest: z.ZodString;
            freshness_policy_digest: z.ZodString;
        }, z.core.$strict>>;
        events: z.ZodRecord<z.ZodString, z.ZodObject<{
            event_id: z.ZodString;
            event_object_digest: z.ZodString;
            issuer_id: z.ZodString;
            operation_id: z.ZodString;
            signer_registry_digest: z.ZodString;
            first_inclusion_sequence: z.ZodNumber;
        }, z.core.$strict>>;
        capture_attestations: z.ZodRecord<z.ZodString, z.ZodObject<{
            attestation_digest: z.ZodString;
            attestation_object_digest: z.ZodString;
            start_digest: z.ZodString;
            attempt_digest: z.ZodString;
            signer_registry_digest: z.ZodString;
            first_inclusion_sequence: z.ZodNumber;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    authority_set_digests: z.ZodArray<z.ZodString>;
    object_manifest_digest: z.ZodString;
    state_digest: z.ZodString;
}, z.core.$strict>;
export declare const catalogDeltaSchema: z.ZodObject<{
    delta_contract: z.ZodLiteral<"sourcey.catalog-delta/v1alpha1">;
    base: z.ZodObject<{
        release: z.ZodObject<{
            descriptor_contract: z.ZodLiteral<string>;
            snapshot_core: z.ZodObject<{
                snapshot_contract: z.ZodLiteral<string>;
                release_sequence: z.ZodNumber;
                compiler_version: z.ZodString;
                artifact_contract: z.ZodLiteral<string>;
                input_set_digest: z.ZodString;
                artifact_digest: z.ZodString;
                resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
                root_set_digest: z.ZodString;
                signer_registry_digest: z.ZodString;
                trust_transition_digest: z.ZodNullable<z.ZodString>;
                policy_as_of: z.ZodISODateTime;
            }, z.core.$strict>;
            snapshot_id: z.ZodString;
            release_core: z.ZodObject<{
                release_contract: z.ZodLiteral<string>;
                release_sequence: z.ZodNumber;
                snapshot_id: z.ZodString;
                parent_release_id: z.ZodNullable<z.ZodString>;
                diff_digest: z.ZodString;
            }, z.core.$strict>;
            release_id: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>;
    admitted_input_digests: z.ZodArray<z.ZodString>;
    policy_as_of: z.ZodISODateTime;
    artifact_core: z.ZodObject<{
        artifact_contract: z.ZodLiteral<"sourcey.canonical-artifact/v1alpha1">;
        policy_as_of: z.ZodISODateTime;
        root_set_digest: z.ZodString;
        signer_registry_digest: z.ZodString;
        policy_digests: z.ZodRecord<z.ZodString, z.ZodString>;
        policies: z.ZodArray<z.ZodObject<{
            schema_version: z.ZodLiteral<"sourcey.policy/v1alpha1">;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodString;
            sections: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"prose">;
                heading: z.ZodOptional<z.ZodString>;
                paragraphs: z.ZodArray<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"clauses">;
                heading: z.ZodOptional<z.ZodString>;
                clauses: z.ZodArray<z.ZodObject<{
                    title: z.ZodString;
                    body: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"definitions">;
                heading: z.ZodOptional<z.ZodString>;
                definitions: z.ZodArray<z.ZodObject<{
                    term: z.ZodString;
                    detail: z.ZodString;
                }, z.core.$strict>>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"steps">;
                heading: z.ZodOptional<z.ZodString>;
                steps: z.ZodArray<z.ZodString>;
            }, z.core.$strict>], "kind">>;
            revision_digest: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    entity_changes: z.ZodArray<z.ZodObject<{
        operation: z.ZodLiteral<"upsert">;
        entity_id: z.ZodString;
        prior_projection_digest: z.ZodNullable<z.ZodString>;
        projection_digest: z.ZodString;
        path: z.ZodString;
    }, z.core.$strict>>;
    routes: z.ZodObject<{
        route_contract: z.ZodLiteral<"sourcey.catalog-routes/v1alpha1">;
        routes: z.ZodRecord<z.ZodString, z.ZodObject<{
            kind: z.ZodEnum<{
                entity: "entity";
                offer: "offer";
                program: "program";
                tombstone: "tombstone";
            }>;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodOptional<z.ZodString>;
            revision_digest: z.ZodOptional<z.ZodString>;
            canonical: z.ZodBoolean;
            canonical_route: z.ZodString;
            lifecycle: z.ZodOptional<z.ZodEnum<{
                active: "active";
                ended: "ended";
                withdrawn: "withdrawn";
            }>>;
            tombstone_reason: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    identities: z.ZodObject<{
        identity_contract: z.ZodLiteral<"sourcey.identities/v1alpha1">;
        canonical_entity_resolutions: z.ZodRecord<z.ZodString, z.ZodString>;
        canonical_program_resolutions: z.ZodRecord<z.ZodString, z.ZodString>;
        canonical_offer_resolutions: z.ZodRecord<z.ZodString, z.ZodString>;
        canonical_agent_readiness_profile_resolutions: z.ZodRecord<z.ZodString, z.ZodString>;
        program_reparents: z.ZodRecord<z.ZodString, z.ZodObject<{
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            event_id: z.ZodString;
        }, z.core.$strict>>;
        offer_reparents: z.ZodRecord<z.ZodString, z.ZodObject<{
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            event_id: z.ZodString;
        }, z.core.$strict>>;
        agent_readiness_profile_reparents: z.ZodRecord<z.ZodString, z.ZodObject<{
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            event_id: z.ZodString;
        }, z.core.$strict>>;
        asset_binding_dispositions: z.ZodRecord<z.ZodString, z.ZodObject<{
            disposition: z.ZodEnum<{
                end: "end";
                rebind: "rebind";
            }>;
            event_id: z.ZodString;
            replacement_binding_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
        split_relationships: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
        retired_entities: z.ZodArray<z.ZodString>;
        retired_programs: z.ZodArray<z.ZodString>;
        retired_offers: z.ZodArray<z.ZodString>;
        retired_agent_readiness_profiles: z.ZodArray<z.ZodString>;
    }, z.core.$strict>;
    provenance: z.ZodObject<{
        provenance_contract: z.ZodLiteral<"sourcey.provenance-index/v1alpha1">;
        revisions: z.ZodRecord<z.ZodString, z.ZodObject<{
            revision_digest: z.ZodString;
            first_inclusion_sequence: z.ZodNumber;
            event_ids: z.ZodArray<z.ZodString>;
            observation_ids: z.ZodArray<z.ZodString>;
            coverage_policy_digest: z.ZodString;
            freshness_policy_digest: z.ZodString;
        }, z.core.$strict>>;
        events: z.ZodRecord<z.ZodString, z.ZodObject<{
            event_id: z.ZodString;
            event_object_digest: z.ZodString;
            issuer_id: z.ZodString;
            operation_id: z.ZodString;
            signer_registry_digest: z.ZodString;
            first_inclusion_sequence: z.ZodNumber;
        }, z.core.$strict>>;
        capture_attestations: z.ZodRecord<z.ZodString, z.ZodObject<{
            attestation_digest: z.ZodString;
            attestation_object_digest: z.ZodString;
            start_digest: z.ZodString;
            attempt_digest: z.ZodString;
            signer_registry_digest: z.ZodString;
            first_inclusion_sequence: z.ZodNumber;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    authority_set_digests: z.ZodArray<z.ZodString>;
    object_manifest_digest: z.ZodString;
    state_digest: z.ZodString;
    delta_digest: z.ZodString;
}, z.core.$strict>;
export declare const catalogDeltaEntityObjectSchema: z.ZodObject<{
    object_contract: z.ZodLiteral<"sourcey.entity-object/v1alpha1">;
    entity: z.ZodObject<{
        entity_id: z.ZodString;
        slug: z.ZodString;
        slug_aliases: z.ZodOptional<z.ZodArray<z.ZodString>>;
        name: z.ZodString;
        summary: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
        website: z.ZodURL;
        category: z.ZodString;
        revision_digest: z.ZodString;
        provenance: z.ZodObject<{
            freshness: z.ZodEnum<{
                fresh: "fresh";
                stale: "stale";
                unknown: "unknown";
            }>;
            dispute: z.ZodEnum<{
                none: "none";
                open: "open";
                resolved: "resolved";
            }>;
            coverage_policy_digest: z.ZodString;
            freshness_policy_digest: z.ZodString;
            basis_event_ids: z.ZodArray<z.ZodString>;
            fields: z.ZodArray<z.ZodObject<{
                path: z.ZodString;
                supporting_event_ids: z.ZodArray<z.ZodString>;
                contradicting_event_ids: z.ZodArray<z.ZodString>;
                accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                    attested: "attested";
                    derived: "derived";
                    editorial: "editorial";
                    observed: "observed";
                }>>;
                evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                    attested: "attested";
                    derived: "derived";
                    editorial: "editorial";
                    observed: "observed";
                }>>;
                latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
            }, z.core.$strict>>;
            vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                status: z.ZodLiteral<"none">;
            }, z.core.$strict>, z.ZodObject<{
                status: z.ZodLiteral<"current">;
                event_id: z.ZodString;
                attested_at: z.ZodISODateTime;
            }, z.core.$strict>], "status">;
        }, z.core.$strict>;
        identity_assurance: z.ZodOptional<z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            assurance_id: z.ZodString;
            verified_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>>;
        programs: z.ZodArray<z.ZodObject<{
            program_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
        }, z.core.$strict>>;
        offers: z.ZodArray<z.ZodObject<{
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            economics: z.ZodObject<{
                consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"fixed">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"variable">;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"unknown">;
                    description: z.ZodString;
                }, z.core.$strict>], "kind">;
                benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodString;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"other">;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>;
            eligibility: z.ZodObject<{
                rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
            }, z.core.$strict>;
            roles: z.ZodObject<{
                terms_authority_entity_id: z.ZodString;
                access_operator_entity_id: z.ZodString;
            }, z.core.$strict>;
            access: z.ZodObject<{
                availability: z.ZodEnum<{
                    automatic: "automatic";
                    invite: "invite";
                    membership: "membership";
                    other: "other";
                    public: "public";
                    referral: "referral";
                }>;
                method: z.ZodEnum<{
                    automatic: "automatic";
                    code: "code";
                    contact: "contact";
                    form: "form";
                    other: "other";
                }>;
                url: z.ZodOptional<z.ZodURL>;
                public_code: z.ZodOptional<z.ZodString>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
            lifecycle: z.ZodEnum<{
                active: "active";
                ended: "ended";
                withdrawn: "withdrawn";
            }>;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
            terms_assurance: z.ZodOptional<z.ZodObject<{
                status: z.ZodLiteral<"checked">;
                assurance_id: z.ZodString;
                checked_at: z.ZodISODateTime;
                revision_digest: z.ZodString;
                method_policy_digest: z.ZodString;
                coverage_policy_digest: z.ZodString;
                event_id: z.ZodString;
                receipt_digest: z.ZodString;
            }, z.core.$strict>>;
            headline: z.ZodOptional<z.ZodObject<{
                rule: z.ZodLiteral<"sourcey.offer-headline/v1">;
                benefit_id: z.ZodString;
                basis: z.ZodEnum<{
                    described: "described";
                    typed: "typed";
                }>;
                figure: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodOptional<z.ZodString>;
                    duration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>], "kind">;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    prior_entity: z.ZodNullable<z.ZodObject<{
        entity_id: z.ZodString;
        slug: z.ZodString;
        slug_aliases: z.ZodOptional<z.ZodArray<z.ZodString>>;
        name: z.ZodString;
        summary: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
        website: z.ZodURL;
        category: z.ZodString;
        revision_digest: z.ZodString;
        provenance: z.ZodObject<{
            freshness: z.ZodEnum<{
                fresh: "fresh";
                stale: "stale";
                unknown: "unknown";
            }>;
            dispute: z.ZodEnum<{
                none: "none";
                open: "open";
                resolved: "resolved";
            }>;
            coverage_policy_digest: z.ZodString;
            freshness_policy_digest: z.ZodString;
            basis_event_ids: z.ZodArray<z.ZodString>;
            fields: z.ZodArray<z.ZodObject<{
                path: z.ZodString;
                supporting_event_ids: z.ZodArray<z.ZodString>;
                contradicting_event_ids: z.ZodArray<z.ZodString>;
                accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                    attested: "attested";
                    derived: "derived";
                    editorial: "editorial";
                    observed: "observed";
                }>>;
                evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                    attested: "attested";
                    derived: "derived";
                    editorial: "editorial";
                    observed: "observed";
                }>>;
                latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
            }, z.core.$strict>>;
            vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                status: z.ZodLiteral<"none">;
            }, z.core.$strict>, z.ZodObject<{
                status: z.ZodLiteral<"current">;
                event_id: z.ZodString;
                attested_at: z.ZodISODateTime;
            }, z.core.$strict>], "status">;
        }, z.core.$strict>;
        identity_assurance: z.ZodOptional<z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            assurance_id: z.ZodString;
            verified_at: z.ZodISODateTime;
            identity_epoch_digest: z.ZodString;
            method_policy_digest: z.ZodString;
            coverage_policy_digest: z.ZodString;
            event_id: z.ZodString;
            receipt_digest: z.ZodString;
        }, z.core.$strict>>;
        programs: z.ZodArray<z.ZodObject<{
            program_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
        }, z.core.$strict>>;
        offers: z.ZodArray<z.ZodObject<{
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            economics: z.ZodObject<{
                consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"fixed">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"variable">;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"unknown">;
                    description: z.ZodString;
                }, z.core.$strict>], "kind">;
                benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodString;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"other">;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>;
            eligibility: z.ZodObject<{
                rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
            }, z.core.$strict>;
            roles: z.ZodObject<{
                terms_authority_entity_id: z.ZodString;
                access_operator_entity_id: z.ZodString;
            }, z.core.$strict>;
            access: z.ZodObject<{
                availability: z.ZodEnum<{
                    automatic: "automatic";
                    invite: "invite";
                    membership: "membership";
                    other: "other";
                    public: "public";
                    referral: "referral";
                }>;
                method: z.ZodEnum<{
                    automatic: "automatic";
                    code: "code";
                    contact: "contact";
                    form: "form";
                    other: "other";
                }>;
                url: z.ZodOptional<z.ZodURL>;
                public_code: z.ZodOptional<z.ZodString>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
            lifecycle: z.ZodEnum<{
                active: "active";
                ended: "ended";
                withdrawn: "withdrawn";
            }>;
            effective_from: z.ZodISODateTime;
            effective_until: z.ZodOptional<z.ZodISODateTime>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                freshness: z.ZodEnum<{
                    fresh: "fresh";
                    stale: "stale";
                    unknown: "unknown";
                }>;
                dispute: z.ZodEnum<{
                    none: "none";
                    open: "open";
                    resolved: "resolved";
                }>;
                coverage_policy_digest: z.ZodString;
                freshness_policy_digest: z.ZodString;
                basis_event_ids: z.ZodArray<z.ZodString>;
                fields: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    supporting_event_ids: z.ZodArray<z.ZodString>;
                    contradicting_event_ids: z.ZodArray<z.ZodString>;
                    accepted_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        attested: "attested";
                        derived: "derived";
                        editorial: "editorial";
                        observed: "observed";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        fresh: "fresh";
                        stale: "stale";
                        unknown: "unknown";
                    }>;
                }, z.core.$strict>>;
                vendor_attestation: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    status: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    status: z.ZodLiteral<"current">;
                    event_id: z.ZodString;
                    attested_at: z.ZodISODateTime;
                }, z.core.$strict>], "status">;
            }, z.core.$strict>;
            terms_assurance: z.ZodOptional<z.ZodObject<{
                status: z.ZodLiteral<"checked">;
                assurance_id: z.ZodString;
                checked_at: z.ZodISODateTime;
                revision_digest: z.ZodString;
                method_policy_digest: z.ZodString;
                coverage_policy_digest: z.ZodString;
                event_id: z.ZodString;
                receipt_digest: z.ZodString;
            }, z.core.$strict>>;
            headline: z.ZodOptional<z.ZodObject<{
                rule: z.ZodLiteral<"sourcey.offer-headline/v1">;
                benefit_id: z.ZodString;
                basis: z.ZodEnum<{
                    described: "described";
                    typed: "typed";
                }>;
                figure: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodOptional<z.ZodString>;
                    duration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>], "kind">;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const catalogDeltaAuthoringObjectSchema: z.ZodObject<{
    object_contract: z.ZodLiteral<"sourcey.authoring-change/v1alpha1">;
    entity_id: z.ZodString;
    authoring: z.ZodNullable<z.ZodObject<{
        schema_version: z.ZodLiteral<"sourcey.entity-authoring/v1alpha1">;
        programs: z.ZodArray<z.ZodObject<{
            program_id: z.ZodString;
            program_slug: z.ZodString;
            program_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            source_ids: z.ZodArray<z.ZodString>;
        }, z.core.$strict>>;
        entity: z.ZodObject<{
            entity_id: z.ZodString;
            slug: z.ZodString;
            slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            name: z.ZodString;
            domains: z.ZodArray<z.ZodObject<{
                value: z.ZodString;
                role: z.ZodEnum<{
                    alias: "alias";
                    primary: "primary";
                }>;
                valid_from: z.ZodISODateTime;
                valid_until: z.ZodOptional<z.ZodISODateTime>;
            }, z.core.$strict>>;
            category: z.ZodString;
        }, z.core.$strict>;
        profile: z.ZodObject<{
            summary: z.ZodOptional<z.ZodString>;
            description: z.ZodString;
            links: z.ZodObject<{
                site: z.ZodURL;
                pricing: z.ZodOptional<z.ZodURL>;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sources: z.ZodArray<z.ZodObject<{
            source_id: z.ZodString;
            url: z.ZodURL;
        }, z.core.$strict>>;
        offers: z.ZodArray<z.ZodObject<{
            offer_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_slug: z.ZodString;
            offer_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            title: z.ZodString;
            summary: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            lifecycle: z.ZodObject<{
                status: z.ZodEnum<{
                    active: "active";
                    ended: "ended";
                    withdrawn: "withdrawn";
                }>;
                effective_from: z.ZodISODateTime;
                effective_until: z.ZodOptional<z.ZodISODateTime>;
            }, z.core.$strict>;
            economics: z.ZodObject<{
                consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"fixed">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"variable">;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"unknown">;
                    description: z.ZodString;
                }, z.core.$strict>], "kind">;
                benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodString;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"other">;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>;
            eligibility: z.ZodObject<{
                rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
            }, z.core.$strict>;
            roles: z.ZodObject<{
                terms_authority_entity_id: z.ZodString;
                access_operator_entity_id: z.ZodString;
            }, z.core.$strict>;
            source_ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
            declared: z.ZodOptional<z.ZodLiteral<true>>;
            access: z.ZodObject<{
                availability: z.ZodEnum<{
                    automatic: "automatic";
                    invite: "invite";
                    membership: "membership";
                    other: "other";
                    public: "public";
                    referral: "referral";
                }>;
                method: z.ZodEnum<{
                    automatic: "automatic";
                    code: "code";
                    contact: "contact";
                    form: "form";
                    other: "other";
                }>;
                public_code: z.ZodOptional<z.ZodString>;
                url: z.ZodOptional<z.ZodURL>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    prior_authoring: z.ZodNullable<z.ZodObject<{
        schema_version: z.ZodLiteral<"sourcey.entity-authoring/v1alpha1">;
        programs: z.ZodArray<z.ZodObject<{
            program_id: z.ZodString;
            program_slug: z.ZodString;
            program_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            source_ids: z.ZodArray<z.ZodString>;
        }, z.core.$strict>>;
        entity: z.ZodObject<{
            entity_id: z.ZodString;
            slug: z.ZodString;
            slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            name: z.ZodString;
            domains: z.ZodArray<z.ZodObject<{
                value: z.ZodString;
                role: z.ZodEnum<{
                    alias: "alias";
                    primary: "primary";
                }>;
                valid_from: z.ZodISODateTime;
                valid_until: z.ZodOptional<z.ZodISODateTime>;
            }, z.core.$strict>>;
            category: z.ZodString;
        }, z.core.$strict>;
        profile: z.ZodObject<{
            summary: z.ZodOptional<z.ZodString>;
            description: z.ZodString;
            links: z.ZodObject<{
                site: z.ZodURL;
                pricing: z.ZodOptional<z.ZodURL>;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sources: z.ZodArray<z.ZodObject<{
            source_id: z.ZodString;
            url: z.ZodURL;
        }, z.core.$strict>>;
        offers: z.ZodArray<z.ZodObject<{
            offer_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_slug: z.ZodString;
            offer_slug_aliases: z.ZodDefault<z.ZodArray<z.ZodString>>;
            title: z.ZodString;
            summary: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            lifecycle: z.ZodObject<{
                status: z.ZodEnum<{
                    active: "active";
                    ended: "ended";
                    withdrawn: "withdrawn";
                }>;
                effective_from: z.ZodISODateTime;
                effective_until: z.ZodOptional<z.ZodISODateTime>;
            }, z.core.$strict>;
            economics: z.ZodObject<{
                consideration: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"none">;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"fixed">;
                    amount: z.ZodObject<{
                        currency: z.ZodString;
                        minor_units: z.ZodNumber;
                    }, z.core.$strict>;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"variable">;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"unknown">;
                    description: z.ZodString;
                }, z.core.$strict>], "kind">;
                benefits: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"credit">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        amount: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                        maximum: z.ZodObject<{
                            currency: z.ZodString;
                            minor_units: z.ZodNumber;
                        }, z.core.$strict>;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"discount">;
                    percentage: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        basis_points: z.ZodNumber;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum_basis_points: z.ZodNumber;
                        maximum_basis_points: z.ZodNumber;
                    }, z.core.$strict>], "kind">;
                    applies_to: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"cashback">;
                    value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"money">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            amount: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                            maximum: z.ZodObject<{
                                currency: z.ZodString;
                                minor_units: z.ZodNumber;
                            }, z.core.$strict>;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"percentage">;
                        value: z.ZodDiscriminatedUnion<[z.ZodObject<{
                            kind: z.ZodLiteral<"exact">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"up-to">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"at-least">;
                            basis_points: z.ZodNumber;
                        }, z.core.$strict>, z.ZodObject<{
                            kind: z.ZodLiteral<"range">;
                            minimum_basis_points: z.ZodNumber;
                            maximum_basis_points: z.ZodNumber;
                        }, z.core.$strict>], "kind">;
                    }, z.core.$strict>], "kind">;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"free-service">;
                    service: z.ZodString;
                    duration: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                        kind: z.ZodLiteral<"exact">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"up-to">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"at-least">;
                        value: z.ZodString;
                    }, z.core.$strict>, z.ZodObject<{
                        kind: z.ZodLiteral<"range">;
                        minimum: z.ZodString;
                        maximum: z.ZodString;
                    }, z.core.$strict>], "kind">>;
                }, z.core.$strict>, z.ZodObject<{
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                    kind: z.ZodLiteral<"other">;
                }, z.core.$strict>], "kind">>;
            }, z.core.$strict>;
            eligibility: z.ZodObject<{
                rule: z.ZodType<import("../../revisions/src/index.js").EligibilityRule, unknown, z.core.$ZodTypeInternals<import("../../revisions/src/index.js").EligibilityRule, unknown>>;
            }, z.core.$strict>;
            roles: z.ZodObject<{
                terms_authority_entity_id: z.ZodString;
                access_operator_entity_id: z.ZodString;
            }, z.core.$strict>;
            source_ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
            declared: z.ZodOptional<z.ZodLiteral<true>>;
            access: z.ZodObject<{
                availability: z.ZodEnum<{
                    automatic: "automatic";
                    invite: "invite";
                    membership: "membership";
                    other: "other";
                    public: "public";
                    referral: "referral";
                }>;
                method: z.ZodEnum<{
                    automatic: "automatic";
                    code: "code";
                    contact: "contact";
                    form: "form";
                    other: "other";
                }>;
                public_code: z.ZodOptional<z.ZodString>;
                url: z.ZodOptional<z.ZodURL>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
/** Every input a full release closes over; each field is always present. */
export declare const closedInputSetSchema: z.ZodObject<{
    input_contract: z.ZodLiteral<"sourcey.closed-input-set/v1alpha1">;
    environment: z.ZodEnum<{
        dogfood: "dogfood";
        production: "production";
    }>;
    authoring_revisions: z.ZodArray<z.ZodString>;
    event_ids: z.ZodArray<z.ZodString>;
    capture_attestation_digests: z.ZodArray<z.ZodString>;
    evidence_authority_set_digest: z.ZodNullable<z.ZodString>;
    evidence_authority_bundle_digests: z.ZodArray<z.ZodString>;
    resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
    taxonomy_digest: z.ZodString;
    root_set_digest: z.ZodString;
    signer_registry_digest: z.ZodString;
    trust_transition_digest: z.ZodNullable<z.ZodString>;
    parent_release_id: z.ZodNullable<z.ZodString>;
}, z.core.$strict>;
/** The observation closure of a full release; each field is always present. */
export declare const releaseObservationInputsSchema: z.ZodObject<{
    input_contract: z.ZodLiteral<"sourcey.observation-inputs/v1alpha1">;
    manifest_digest: z.ZodString;
    pack_digest: z.ZodString;
    observation_ids: z.ZodArray<z.ZodString>;
    evidence_authority_set_digest: z.ZodNullable<z.ZodString>;
    evidence_authority_bundle_digests: z.ZodArray<z.ZodString>;
    captures: z.ZodRecord<z.ZodString, z.ZodObject<{
        sha256: z.ZodString;
        bytes: z.ZodNumber;
    }, z.core.$strict>>;
    normalized_objects: z.ZodRecord<z.ZodString, z.ZodObject<{
        sha256: z.ZodString;
        bytes: z.ZodNumber;
    }, z.core.$strict>>;
}, z.core.$strict>;
/** Verifies the immutable bundle envelope; evidence admission is separate. */
export declare function verifyCatalogReleaseBundle(input: unknown): CatalogReleaseBundle;
/**
 * Stable current-parent metadata used by publication planning. Immutable bundle
 * bytes remain verifier-bound audit evidence and are never a runtime parent
 * parser or migration input.
 */
export declare const catalogPublicationParentCoreSchema: z.ZodObject<{
    parent_contract: z.ZodLiteral<"sourcey.catalog-publication-parent/v1alpha1">;
    release: z.ZodObject<{
        descriptor_contract: z.ZodLiteral<string>;
        snapshot_core: z.ZodObject<{
            snapshot_contract: z.ZodLiteral<string>;
            release_sequence: z.ZodNumber;
            compiler_version: z.ZodString;
            artifact_contract: z.ZodLiteral<string>;
            input_set_digest: z.ZodString;
            artifact_digest: z.ZodString;
            resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
            root_set_digest: z.ZodString;
            signer_registry_digest: z.ZodString;
            trust_transition_digest: z.ZodNullable<z.ZodString>;
            policy_as_of: z.ZodISODateTime;
        }, z.core.$strict>;
        snapshot_id: z.ZodString;
        release_core: z.ZodObject<{
            release_contract: z.ZodLiteral<string>;
            release_sequence: z.ZodNumber;
            snapshot_id: z.ZodString;
            parent_release_id: z.ZodNullable<z.ZodString>;
            diff_digest: z.ZodString;
        }, z.core.$strict>;
        release_id: z.ZodString;
    }, z.core.$strict>;
    bundle_digest: z.ZodString;
    verifier_digest: z.ZodString;
    resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
}, z.core.$strict>;
export declare const catalogPublicationParentSchema: z.ZodObject<{
    parent_contract: z.ZodLiteral<"sourcey.catalog-publication-parent/v1alpha1">;
    release: z.ZodObject<{
        descriptor_contract: z.ZodLiteral<string>;
        snapshot_core: z.ZodObject<{
            snapshot_contract: z.ZodLiteral<string>;
            release_sequence: z.ZodNumber;
            compiler_version: z.ZodString;
            artifact_contract: z.ZodLiteral<string>;
            input_set_digest: z.ZodString;
            artifact_digest: z.ZodString;
            resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
            root_set_digest: z.ZodString;
            signer_registry_digest: z.ZodString;
            trust_transition_digest: z.ZodNullable<z.ZodString>;
            policy_as_of: z.ZodISODateTime;
        }, z.core.$strict>;
        snapshot_id: z.ZodString;
        release_core: z.ZodObject<{
            release_contract: z.ZodLiteral<string>;
            release_sequence: z.ZodNumber;
            snapshot_id: z.ZodString;
            parent_release_id: z.ZodNullable<z.ZodString>;
            diff_digest: z.ZodString;
        }, z.core.$strict>;
        release_id: z.ZodString;
    }, z.core.$strict>;
    bundle_digest: z.ZodString;
    verifier_digest: z.ZodString;
    resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
    parent_digest: z.ZodString;
}, z.core.$strict>;
export declare const releasePublicationCoreSchema: z.ZodObject<{
    publication_contract: z.ZodLiteral<"sourcey.release-publication/v1alpha1">;
    bundle_digest: z.ZodString;
    release_id: z.ZodString;
    release_sequence: z.ZodNumber;
    snapshot_id: z.ZodString;
    parent_release_id: z.ZodNullable<z.ZodString>;
    published_at: z.ZodISODateTime;
}, z.core.$strict>;
export declare const releasePublicationSchema: z.ZodObject<{
    publication_contract: z.ZodLiteral<"sourcey.release-publication/v1alpha1">;
    bundle_digest: z.ZodString;
    release_id: z.ZodString;
    release_sequence: z.ZodNumber;
    snapshot_id: z.ZodString;
    parent_release_id: z.ZodNullable<z.ZodString>;
    published_at: z.ZodISODateTime;
    publication_digest: z.ZodString;
    protected: z.ZodObject<{
        signature_purpose: z.ZodEnum<{
            "catalog-attestation": "catalog-attestation";
            "catalog-authority": "catalog-authority";
            "catalog-dispute": "catalog-dispute";
            "catalog-evidence": "catalog-evidence";
            "catalog-feed": "catalog-feed";
            "catalog-identity": "catalog-identity";
            "catalog-policy": "catalog-policy";
            "catalog-release": "catalog-release";
            "catalog-verification": "catalog-verification";
        }>;
        signer_registry_digest: z.ZodString;
        key_id: z.ZodString;
        algorithm: z.ZodLiteral<"ed25519">;
        signature: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export type SnapshotCore = z.infer<typeof sourceyReleaseEnvelopeSchemas.snapshotCore>;
export type ReleaseDescriptor = z.infer<typeof sourceyReleaseEnvelopeSchemas.descriptor>;
export type ReleaseDiff = z.infer<typeof sourceyReleaseEnvelopeSchemas.diff>;
export type CatalogReleaseBundle = z.infer<typeof sourceyReleaseEnvelopeSchemas.bundle>;
export type CatalogPublicationParent = z.infer<typeof catalogPublicationParentSchema>;
export type ReleasePublicationCore = z.infer<typeof releasePublicationCoreSchema>;
export type ReleasePublication = z.infer<typeof releasePublicationSchema>;
export type CatalogReleaseDelivery = z.infer<typeof catalogReleaseDeliverySchema>;
export type CatalogDelta = z.infer<typeof catalogDeltaSchema>;
export type CatalogDeltaEntityChange = z.infer<typeof catalogDeltaEntityChangeSchema>;
export type CatalogStateTransitionCore = z.infer<typeof catalogStateTransitionCoreSchema>;
export {};
//# sourceMappingURL=index.d.ts.map