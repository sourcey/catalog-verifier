import { z } from "zod";
export declare const catalogReleaseDeliverySchema: z.ZodObject<{
    bundle_digest: z.ZodString;
    artifact_root: z.ZodURL;
    archive_url: z.ZodURL;
    checksum_url: z.ZodURL;
}, z.core.$strict>;
export declare function catalogReleaseDelivery(bundleDigest: string): CatalogReleaseDelivery;
export declare const releaseObjectManifestSchema: z.ZodObject<{
    manifest_contract: z.ZodLiteral<"sourcey.release-object-manifest/v1alpha1">;
    objects: z.ZodRecord<z.ZodString, z.ZodObject<{
        sha256: z.ZodString;
        bytes: z.ZodNumber;
    }, z.core.$strict>>;
}, z.core.$strict>;
/**
 * Stable content-addressed extension surface for release-owned sidecars.
 * Domain records stay strict; adjacent indexes, inputs, and policies bind here
 * so a new capability does not change the release envelope shape.
 */
export declare const releaseResourceDigestsSchema: z.ZodRecord<z.ZodString, z.ZodString>;
export declare const RELEASE_RESOURCES: {
    readonly agentReadinessIndex: "agent-readiness-index";
    readonly agentReadinessInputs: "agent-readiness-inputs";
    readonly agentReadinessOfferRelationIndex: "agent-readiness-offer-relation-index";
    readonly agentReadinessOfferRelationInputs: "agent-readiness-offer-relation-inputs";
    readonly agentReadinessPolicy: "agent-readiness-policy";
    readonly assetIndex: "asset-index";
    readonly assetInputs: "asset-inputs";
    readonly assetManifest: "asset-manifest";
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
export declare function releasePolicyObjectPath(policyDigest: string): string;
export declare const snapshotCoreSchema: z.ZodObject<{
    snapshot_contract: z.ZodLiteral<"sourcey.snapshot-core/v1alpha1">;
    release_sequence: z.ZodNumber;
    compiler_version: z.ZodString;
    artifact_contract: z.ZodLiteral<"sourcey.canonical-artifact/v1alpha1">;
    input_set_digest: z.ZodString;
    artifact_digest: z.ZodString;
    resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
    root_set_digest: z.ZodString;
    signer_registry_digest: z.ZodString;
    trust_transition_digest: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    policy_as_of: z.ZodISODateTime;
}, z.core.$strict>;
export declare const releaseCoreSchema: z.ZodObject<{
    release_contract: z.ZodLiteral<"sourcey.release-core/v1alpha1">;
    release_sequence: z.ZodNumber;
    snapshot_id: z.ZodString;
    parent_release_id: z.ZodNullable<z.ZodString>;
    diff_digest: z.ZodString;
}, z.core.$strict>;
export declare const releaseDescriptorSchema: z.ZodObject<{
    descriptor_contract: z.ZodLiteral<"sourcey.release-descriptor/v1alpha1">;
    snapshot_core: z.ZodObject<{
        snapshot_contract: z.ZodLiteral<"sourcey.snapshot-core/v1alpha1">;
        release_sequence: z.ZodNumber;
        compiler_version: z.ZodString;
        artifact_contract: z.ZodLiteral<"sourcey.canonical-artifact/v1alpha1">;
        input_set_digest: z.ZodString;
        artifact_digest: z.ZodString;
        resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
        root_set_digest: z.ZodString;
        signer_registry_digest: z.ZodString;
        trust_transition_digest: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        policy_as_of: z.ZodISODateTime;
    }, z.core.$strict>;
    snapshot_id: z.ZodString;
    release_core: z.ZodObject<{
        release_contract: z.ZodLiteral<"sourcey.release-core/v1alpha1">;
        release_sequence: z.ZodNumber;
        snapshot_id: z.ZodString;
        parent_release_id: z.ZodNullable<z.ZodString>;
        diff_digest: z.ZodString;
    }, z.core.$strict>;
    release_id: z.ZodString;
}, z.core.$strict>;
export declare const catalogDeltaEntityChangeSchema: z.ZodObject<{
    operation: z.ZodLiteral<"upsert">;
    entity_id: z.ZodString;
    prior_projection_digest: z.ZodNullable<z.ZodString>;
    projection_digest: z.ZodString;
    path: z.ZodString;
}, z.core.$strict>;
export declare const catalogStateTransitionCoreSchema: z.ZodObject<{
    state_contract: z.ZodLiteral<"sourcey.catalog-state-transition/v1alpha1">;
    parent_state_digest: z.ZodNullable<z.ZodString>;
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
                program: "program";
                offer: "offer";
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
        program_reparents: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            old_entity_id: z.ZodOptional<z.ZodString>;
            new_entity_id: z.ZodString;
            event_id: z.ZodString;
        }, z.core.$strict>>>;
        offer_reparents: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            old_entity_id: z.ZodOptional<z.ZodString>;
            new_entity_id: z.ZodString;
            event_id: z.ZodString;
        }, z.core.$strict>>>;
        agent_readiness_profile_reparents: z.ZodRecord<z.ZodString, z.ZodObject<{
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            event_id: z.ZodString;
        }, z.core.$strict>>;
        asset_binding_dispositions: z.ZodRecord<z.ZodString, z.ZodObject<{
            disposition: z.ZodEnum<{
                rebind: "rebind";
                end: "end";
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
        capture_receipts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            receipt_digest: z.ZodString;
            receipt_object_digest: z.ZodString;
            issuer_id: z.ZodString;
            operation_id: z.ZodString;
            signer_registry_digest: z.ZodString;
            first_inclusion_sequence: z.ZodNumber;
        }, z.core.$strict>>>;
    }, z.core.$strict>;
    authority_set_digests: z.ZodArray<z.ZodString>;
    object_manifest_digest: z.ZodString;
}, z.core.$strict>;
export declare const catalogDeltaCoreSchema: z.ZodObject<{
    delta_contract: z.ZodLiteral<"sourcey.catalog-delta/v1alpha1">;
    base: z.ZodNullable<z.ZodObject<{
        release: z.ZodObject<{
            descriptor_contract: z.ZodLiteral<"sourcey.release-descriptor/v1alpha1">;
            snapshot_core: z.ZodObject<{
                snapshot_contract: z.ZodLiteral<"sourcey.snapshot-core/v1alpha1">;
                release_sequence: z.ZodNumber;
                compiler_version: z.ZodString;
                artifact_contract: z.ZodLiteral<"sourcey.canonical-artifact/v1alpha1">;
                input_set_digest: z.ZodString;
                artifact_digest: z.ZodString;
                resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
                root_set_digest: z.ZodString;
                signer_registry_digest: z.ZodString;
                trust_transition_digest: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                policy_as_of: z.ZodISODateTime;
            }, z.core.$strict>;
            snapshot_id: z.ZodString;
            release_core: z.ZodObject<{
                release_contract: z.ZodLiteral<"sourcey.release-core/v1alpha1">;
                release_sequence: z.ZodNumber;
                snapshot_id: z.ZodString;
                parent_release_id: z.ZodNullable<z.ZodString>;
                diff_digest: z.ZodString;
            }, z.core.$strict>;
            release_id: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>>;
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
                program: "program";
                offer: "offer";
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
        program_reparents: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            old_entity_id: z.ZodOptional<z.ZodString>;
            new_entity_id: z.ZodString;
            event_id: z.ZodString;
        }, z.core.$strict>>>;
        offer_reparents: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            old_entity_id: z.ZodOptional<z.ZodString>;
            new_entity_id: z.ZodString;
            event_id: z.ZodString;
        }, z.core.$strict>>>;
        agent_readiness_profile_reparents: z.ZodRecord<z.ZodString, z.ZodObject<{
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            event_id: z.ZodString;
        }, z.core.$strict>>;
        asset_binding_dispositions: z.ZodRecord<z.ZodString, z.ZodObject<{
            disposition: z.ZodEnum<{
                rebind: "rebind";
                end: "end";
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
        capture_receipts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            receipt_digest: z.ZodString;
            receipt_object_digest: z.ZodString;
            issuer_id: z.ZodString;
            operation_id: z.ZodString;
            signer_registry_digest: z.ZodString;
            first_inclusion_sequence: z.ZodNumber;
        }, z.core.$strict>>>;
    }, z.core.$strict>;
    authority_set_digests: z.ZodArray<z.ZodString>;
    object_manifest_digest: z.ZodString;
    state_digest: z.ZodString;
}, z.core.$strict>;
export declare const catalogDeltaSchema: z.ZodObject<{
    delta_contract: z.ZodLiteral<"sourcey.catalog-delta/v1alpha1">;
    base: z.ZodNullable<z.ZodObject<{
        release: z.ZodObject<{
            descriptor_contract: z.ZodLiteral<"sourcey.release-descriptor/v1alpha1">;
            snapshot_core: z.ZodObject<{
                snapshot_contract: z.ZodLiteral<"sourcey.snapshot-core/v1alpha1">;
                release_sequence: z.ZodNumber;
                compiler_version: z.ZodString;
                artifact_contract: z.ZodLiteral<"sourcey.canonical-artifact/v1alpha1">;
                input_set_digest: z.ZodString;
                artifact_digest: z.ZodString;
                resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
                root_set_digest: z.ZodString;
                signer_registry_digest: z.ZodString;
                trust_transition_digest: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                policy_as_of: z.ZodISODateTime;
            }, z.core.$strict>;
            snapshot_id: z.ZodString;
            release_core: z.ZodObject<{
                release_contract: z.ZodLiteral<"sourcey.release-core/v1alpha1">;
                release_sequence: z.ZodNumber;
                snapshot_id: z.ZodString;
                parent_release_id: z.ZodNullable<z.ZodString>;
                diff_digest: z.ZodString;
            }, z.core.$strict>;
            release_id: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>>;
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
                program: "program";
                offer: "offer";
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
        program_reparents: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            old_entity_id: z.ZodOptional<z.ZodString>;
            new_entity_id: z.ZodString;
            event_id: z.ZodString;
        }, z.core.$strict>>>;
        offer_reparents: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            old_entity_id: z.ZodOptional<z.ZodString>;
            new_entity_id: z.ZodString;
            event_id: z.ZodString;
        }, z.core.$strict>>>;
        agent_readiness_profile_reparents: z.ZodRecord<z.ZodString, z.ZodObject<{
            old_entity_id: z.ZodString;
            new_entity_id: z.ZodString;
            event_id: z.ZodString;
        }, z.core.$strict>>;
        asset_binding_dispositions: z.ZodRecord<z.ZodString, z.ZodObject<{
            disposition: z.ZodEnum<{
                rebind: "rebind";
                end: "end";
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
        capture_receipts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            receipt_digest: z.ZodString;
            receipt_object_digest: z.ZodString;
            issuer_id: z.ZodString;
            operation_id: z.ZodString;
            signer_registry_digest: z.ZodString;
            first_inclusion_sequence: z.ZodNumber;
        }, z.core.$strict>>>;
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
            tier: z.ZodEnum<{
                observed: "observed";
                signed: "signed";
                verified: "verified";
            }>;
            freshness: z.ZodEnum<{
                unknown: "unknown";
                fresh: "fresh";
                stale: "stale";
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
                    observed: "observed";
                    derived: "derived";
                    editorial: "editorial";
                    attested: "attested";
                }>>;
                evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                    observed: "observed";
                    derived: "derived";
                    editorial: "editorial";
                    attested: "attested";
                }>>;
                latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                freshness: z.ZodEnum<{
                    unknown: "unknown";
                    fresh: "fresh";
                    stale: "stale";
                }>;
            }, z.core.$strict>>;
            attestation_event_id: z.ZodOptional<z.ZodString>;
            verification_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        programs: z.ZodArray<z.ZodObject<{
            program_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                tier: z.ZodEnum<{
                    observed: "observed";
                    signed: "signed";
                    verified: "verified";
                }>;
                freshness: z.ZodEnum<{
                    unknown: "unknown";
                    fresh: "fresh";
                    stale: "stale";
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
                        observed: "observed";
                        derived: "derived";
                        editorial: "editorial";
                        attested: "attested";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        observed: "observed";
                        derived: "derived";
                        editorial: "editorial";
                        attested: "attested";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        unknown: "unknown";
                        fresh: "fresh";
                        stale: "stale";
                    }>;
                }, z.core.$strict>>;
                attestation_event_id: z.ZodOptional<z.ZodString>;
                verification_event_id: z.ZodOptional<z.ZodString>;
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"other">;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
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
                    public: "public";
                    other: "other";
                    referral: "referral";
                    membership: "membership";
                    invite: "invite";
                    automatic: "automatic";
                }>;
                method: z.ZodEnum<{
                    code: "code";
                    other: "other";
                    automatic: "automatic";
                    form: "form";
                    contact: "contact";
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
                tier: z.ZodEnum<{
                    observed: "observed";
                    signed: "signed";
                    verified: "verified";
                }>;
                freshness: z.ZodEnum<{
                    unknown: "unknown";
                    fresh: "fresh";
                    stale: "stale";
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
                        observed: "observed";
                        derived: "derived";
                        editorial: "editorial";
                        attested: "attested";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        observed: "observed";
                        derived: "derived";
                        editorial: "editorial";
                        attested: "attested";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        unknown: "unknown";
                        fresh: "fresh";
                        stale: "stale";
                    }>;
                }, z.core.$strict>>;
                attestation_event_id: z.ZodOptional<z.ZodString>;
                verification_event_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
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
            tier: z.ZodEnum<{
                observed: "observed";
                signed: "signed";
                verified: "verified";
            }>;
            freshness: z.ZodEnum<{
                unknown: "unknown";
                fresh: "fresh";
                stale: "stale";
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
                    observed: "observed";
                    derived: "derived";
                    editorial: "editorial";
                    attested: "attested";
                }>>;
                evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                    observed: "observed";
                    derived: "derived";
                    editorial: "editorial";
                    attested: "attested";
                }>>;
                latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                freshness: z.ZodEnum<{
                    unknown: "unknown";
                    fresh: "fresh";
                    stale: "stale";
                }>;
            }, z.core.$strict>>;
            attestation_event_id: z.ZodOptional<z.ZodString>;
            verification_event_id: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        programs: z.ZodArray<z.ZodObject<{
            program_id: z.ZodString;
            slug: z.ZodString;
            title: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            revision_digest: z.ZodString;
            provenance: z.ZodObject<{
                tier: z.ZodEnum<{
                    observed: "observed";
                    signed: "signed";
                    verified: "verified";
                }>;
                freshness: z.ZodEnum<{
                    unknown: "unknown";
                    fresh: "fresh";
                    stale: "stale";
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
                        observed: "observed";
                        derived: "derived";
                        editorial: "editorial";
                        attested: "attested";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        observed: "observed";
                        derived: "derived";
                        editorial: "editorial";
                        attested: "attested";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        unknown: "unknown";
                        fresh: "fresh";
                        stale: "stale";
                    }>;
                }, z.core.$strict>>;
                attestation_event_id: z.ZodOptional<z.ZodString>;
                verification_event_id: z.ZodOptional<z.ZodString>;
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"other">;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
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
                    public: "public";
                    other: "other";
                    referral: "referral";
                    membership: "membership";
                    invite: "invite";
                    automatic: "automatic";
                }>;
                method: z.ZodEnum<{
                    code: "code";
                    other: "other";
                    automatic: "automatic";
                    form: "form";
                    contact: "contact";
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
                tier: z.ZodEnum<{
                    observed: "observed";
                    signed: "signed";
                    verified: "verified";
                }>;
                freshness: z.ZodEnum<{
                    unknown: "unknown";
                    fresh: "fresh";
                    stale: "stale";
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
                        observed: "observed";
                        derived: "derived";
                        editorial: "editorial";
                        attested: "attested";
                    }>>;
                    evidence_proof_kinds: z.ZodArray<z.ZodEnum<{
                        observed: "observed";
                        derived: "derived";
                        editorial: "editorial";
                        attested: "attested";
                    }>>;
                    latest_observation_at: z.ZodOptional<z.ZodISODateTime>;
                    freshness: z.ZodEnum<{
                        unknown: "unknown";
                        fresh: "fresh";
                        stale: "stale";
                    }>;
                }, z.core.$strict>>;
                attestation_event_id: z.ZodOptional<z.ZodString>;
                verification_event_id: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
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
                    primary: "primary";
                    alias: "alias";
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"other">;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
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
                    public: "public";
                    other: "other";
                    referral: "referral";
                    membership: "membership";
                    invite: "invite";
                    automatic: "automatic";
                }>;
                method: z.ZodEnum<{
                    code: "code";
                    other: "other";
                    automatic: "automatic";
                    form: "form";
                    contact: "contact";
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
                    primary: "primary";
                    alias: "alias";
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"waiver">;
                    waived_item: z.ZodString;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
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
                    }, z.core.$strict>], "kind">>;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strict>, z.ZodObject<{
                    kind: z.ZodLiteral<"other">;
                    benefit_id: z.ZodString;
                    description: z.ZodString;
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
                    public: "public";
                    other: "other";
                    referral: "referral";
                    membership: "membership";
                    invite: "invite";
                    automatic: "automatic";
                }>;
                method: z.ZodEnum<{
                    code: "code";
                    other: "other";
                    automatic: "automatic";
                    form: "form";
                    contact: "contact";
                }>;
                public_code: z.ZodOptional<z.ZodString>;
                url: z.ZodOptional<z.ZodURL>;
                instructions: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            terms_url: z.ZodOptional<z.ZodURL>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const catalogReleaseBundleCoreSchema: z.ZodObject<{
    bundle_contract: z.ZodLiteral<"sourcey.catalog-release-bundle/v1alpha1">;
    admitted_input_digests: z.ZodArray<z.ZodString>;
    verifier_digest: z.ZodString;
    object_manifest_digest: z.ZodString;
    release: z.ZodObject<{
        descriptor_contract: z.ZodLiteral<"sourcey.release-descriptor/v1alpha1">;
        snapshot_core: z.ZodObject<{
            snapshot_contract: z.ZodLiteral<"sourcey.snapshot-core/v1alpha1">;
            release_sequence: z.ZodNumber;
            compiler_version: z.ZodString;
            artifact_contract: z.ZodLiteral<"sourcey.canonical-artifact/v1alpha1">;
            input_set_digest: z.ZodString;
            artifact_digest: z.ZodString;
            resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
            root_set_digest: z.ZodString;
            signer_registry_digest: z.ZodString;
            trust_transition_digest: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            policy_as_of: z.ZodISODateTime;
        }, z.core.$strict>;
        snapshot_id: z.ZodString;
        release_core: z.ZodObject<{
            release_contract: z.ZodLiteral<"sourcey.release-core/v1alpha1">;
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
}, z.core.$strict>;
export declare const catalogReleaseBundleSchema: z.ZodObject<{
    bundle_contract: z.ZodLiteral<"sourcey.catalog-release-bundle/v1alpha1">;
    admitted_input_digests: z.ZodArray<z.ZodString>;
    verifier_digest: z.ZodString;
    object_manifest_digest: z.ZodString;
    release: z.ZodObject<{
        descriptor_contract: z.ZodLiteral<"sourcey.release-descriptor/v1alpha1">;
        snapshot_core: z.ZodObject<{
            snapshot_contract: z.ZodLiteral<"sourcey.snapshot-core/v1alpha1">;
            release_sequence: z.ZodNumber;
            compiler_version: z.ZodString;
            artifact_contract: z.ZodLiteral<"sourcey.canonical-artifact/v1alpha1">;
            input_set_digest: z.ZodString;
            artifact_digest: z.ZodString;
            resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
            root_set_digest: z.ZodString;
            signer_registry_digest: z.ZodString;
            trust_transition_digest: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            policy_as_of: z.ZodISODateTime;
        }, z.core.$strict>;
        snapshot_id: z.ZodString;
        release_core: z.ZodObject<{
            release_contract: z.ZodLiteral<"sourcey.release-core/v1alpha1">;
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
/**
 * Stable current-parent metadata used by publication planning. Immutable bundle
 * bytes remain verifier-bound audit evidence and are never a runtime parent
 * parser or migration input.
 */
export declare const catalogPublicationParentCoreSchema: z.ZodObject<{
    parent_contract: z.ZodLiteral<"sourcey.catalog-publication-parent/v1alpha1">;
    release: z.ZodObject<{
        descriptor_contract: z.ZodLiteral<"sourcey.release-descriptor/v1alpha1">;
        snapshot_core: z.ZodObject<{
            snapshot_contract: z.ZodLiteral<"sourcey.snapshot-core/v1alpha1">;
            release_sequence: z.ZodNumber;
            compiler_version: z.ZodString;
            artifact_contract: z.ZodLiteral<"sourcey.canonical-artifact/v1alpha1">;
            input_set_digest: z.ZodString;
            artifact_digest: z.ZodString;
            resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
            root_set_digest: z.ZodString;
            signer_registry_digest: z.ZodString;
            trust_transition_digest: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            policy_as_of: z.ZodISODateTime;
        }, z.core.$strict>;
        snapshot_id: z.ZodString;
        release_core: z.ZodObject<{
            release_contract: z.ZodLiteral<"sourcey.release-core/v1alpha1">;
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
        descriptor_contract: z.ZodLiteral<"sourcey.release-descriptor/v1alpha1">;
        snapshot_core: z.ZodObject<{
            snapshot_contract: z.ZodLiteral<"sourcey.snapshot-core/v1alpha1">;
            release_sequence: z.ZodNumber;
            compiler_version: z.ZodString;
            artifact_contract: z.ZodLiteral<"sourcey.canonical-artifact/v1alpha1">;
            input_set_digest: z.ZodString;
            artifact_digest: z.ZodString;
            resource_digests: z.ZodRecord<z.ZodString, z.ZodString>;
            root_set_digest: z.ZodString;
            signer_registry_digest: z.ZodString;
            trust_transition_digest: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            policy_as_of: z.ZodISODateTime;
        }, z.core.$strict>;
        snapshot_id: z.ZodString;
        release_core: z.ZodObject<{
            release_contract: z.ZodLiteral<"sourcey.release-core/v1alpha1">;
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
            "catalog-capture": "catalog-capture";
            "catalog-evidence": "catalog-evidence";
            "catalog-identity": "catalog-identity";
            "catalog-authority": "catalog-authority";
            "catalog-attestation": "catalog-attestation";
            "catalog-verification": "catalog-verification";
            "catalog-dispute": "catalog-dispute";
            "catalog-policy": "catalog-policy";
            "catalog-release": "catalog-release";
            "catalog-feed": "catalog-feed";
        }>;
        signer_registry_digest: z.ZodString;
        key_id: z.ZodString;
        algorithm: z.ZodLiteral<"ed25519">;
        signature: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export type SnapshotCore = z.infer<typeof snapshotCoreSchema>;
export type ReleaseCore = z.infer<typeof releaseCoreSchema>;
export type ReleaseDescriptor = z.infer<typeof releaseDescriptorSchema>;
export type CatalogReleaseBundleCore = z.infer<typeof catalogReleaseBundleCoreSchema>;
export type CatalogReleaseBundle = z.infer<typeof catalogReleaseBundleSchema>;
export type CatalogPublicationParent = z.infer<typeof catalogPublicationParentSchema>;
export type ReleasePublicationCore = z.infer<typeof releasePublicationCoreSchema>;
export type ReleasePublication = z.infer<typeof releasePublicationSchema>;
export type CatalogReleaseDelivery = z.infer<typeof catalogReleaseDeliverySchema>;
export type CatalogDelta = z.infer<typeof catalogDeltaSchema>;
export type CatalogDeltaCore = z.infer<typeof catalogDeltaCoreSchema>;
export type CatalogDeltaEntityChange = z.infer<typeof catalogDeltaEntityChangeSchema>;
export type CatalogStateTransitionCore = z.infer<typeof catalogStateTransitionCoreSchema>;
//# sourceMappingURL=index.d.ts.map