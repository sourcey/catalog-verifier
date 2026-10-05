import { z } from "zod";
export declare const changeCursorCoreSchema: z.ZodObject<{
    cursor_contract: z.ZodLiteral<"sourcey.change-cursor/v1alpha1">;
    signer_registry_digest: z.ZodString;
    release_id: z.ZodString;
    diff_digest: z.ZodString;
    next_ordinal: z.ZodNumber;
    preceding_change_id: z.ZodNullable<z.ZodString>;
}, z.core.$strict>;
export declare const changeCursorSchema: z.ZodObject<{
    cursor_contract: z.ZodLiteral<"sourcey.change-cursor/v1alpha1">;
    signer_registry_digest: z.ZodString;
    release_id: z.ZodString;
    diff_digest: z.ZodString;
    next_ordinal: z.ZodNumber;
    preceding_change_id: z.ZodNullable<z.ZodString>;
    cursor_digest: z.ZodString;
    protected: z.ZodObject<{
        signature_purpose: z.ZodEnum<{
            "catalog-attestation": "catalog-attestation";
            "catalog-authority": "catalog-authority";
            "catalog-capture": "catalog-capture";
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
export declare const searchCursorCoreSchema: z.ZodObject<{
    cursor_contract: z.ZodLiteral<"sourcey.search-cursor/v1alpha1">;
    signer_registry_digest: z.ZodString;
    release_id: z.ZodString;
    query_digest: z.ZodString;
    sort_contract: z.ZodLiteral<"sourcey.search-sort/keyset-v1">;
    after: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export declare const searchCursorSchema: z.ZodObject<{
    cursor_contract: z.ZodLiteral<"sourcey.search-cursor/v1alpha1">;
    signer_registry_digest: z.ZodString;
    release_id: z.ZodString;
    query_digest: z.ZodString;
    sort_contract: z.ZodLiteral<"sourcey.search-sort/keyset-v1">;
    after: z.ZodArray<z.ZodString>;
    cursor_digest: z.ZodString;
    protected: z.ZodObject<{
        signature_purpose: z.ZodEnum<{
            "catalog-attestation": "catalog-attestation";
            "catalog-authority": "catalog-authority";
            "catalog-capture": "catalog-capture";
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
export declare const changeFeedPageSchema: z.ZodObject<{
    feed_contract: z.ZodLiteral<"sourcey.catalog-feed/v1alpha1">;
    release_id: z.ZodString;
    snapshot_id: z.ZodString;
    diff_digest: z.ZodString;
    retained_from_release_id: z.ZodString;
    data: z.ZodArray<z.ZodObject<{
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
    next_cursor: z.ZodNullable<z.ZodString>;
}, z.core.$strict>;
export declare const catalogJsonFeedSchema: z.ZodObject<{
    version: z.ZodLiteral<"https://jsonfeed.org/version/1.1">;
    title: z.ZodLiteral<"Sourcey catalog changes">;
    home_page_url: z.ZodURL;
    feed_url: z.ZodURL;
    _sourcey: z.ZodObject<{
        release_id: z.ZodString;
        snapshot_id: z.ZodString;
        diff_digest: z.ZodString;
    }, z.core.$strict>;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        url: z.ZodURL;
        title: z.ZodString;
        date_published: z.ZodISODateTime;
        content_text: z.ZodString;
        _sourcey: z.ZodObject<{
            release_id: z.ZodString;
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
        }, z.core.$strict>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type ChangeCursorCore = z.infer<typeof changeCursorCoreSchema>;
export type ChangeCursor = z.infer<typeof changeCursorSchema>;
export type SearchCursorCore = z.infer<typeof searchCursorCoreSchema>;
export type SearchCursor = z.infer<typeof searchCursorSchema>;
export type ChangeFeedPage = z.infer<typeof changeFeedPageSchema>;
export type CatalogJsonFeed = z.infer<typeof catalogJsonFeedSchema>;
//# sourceMappingURL=index.d.ts.map