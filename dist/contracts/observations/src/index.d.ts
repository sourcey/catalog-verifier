import { z } from "zod";
export declare const observationMethodSchema: z.ZodString;
export declare const observationCoreSchema: z.ZodObject<{
    observation_contract: z.ZodLiteral<"sourcey.observation/v1alpha1">;
    source_id: z.ZodString;
    source_uri: z.ZodURL;
    retrieved_at: z.ZodISODateTime;
    method: z.ZodObject<{
        name: z.ZodString;
        version: z.ZodString;
    }, z.core.$strict>;
    outcome: z.ZodEnum<{
        "contradicts-candidate": "contradicts-candidate";
        error: "error";
        "supports-candidate": "supports-candidate";
        unreachable: "unreachable";
    }>;
    capture: z.ZodOptional<z.ZodObject<{
        digest: z.ZodString;
        bytes: z.ZodNumber;
        media_type: z.ZodString;
        availability: z.ZodEnum<{
            "private-receipt": "private-receipt";
            public: "public";
        }>;
        requested_uri: z.ZodOptional<z.ZodURL>;
        final_uri: z.ZodOptional<z.ZodURL>;
        redirect_chain: z.ZodOptional<z.ZodArray<z.ZodObject<{
            status: z.ZodUnion<readonly [z.ZodLiteral<301>, z.ZodLiteral<302>, z.ZodLiteral<303>, z.ZodLiteral<307>, z.ZodLiteral<308>]>;
            from: z.ZodURL;
            to: z.ZodURL;
        }, z.core.$strict>>>;
        source_standing: z.ZodOptional<z.ZodEnum<{
            "archived-first-party": "archived-first-party";
            "archived-third-party": "archived-third-party";
            "live-first-party": "live-first-party";
            "live-third-party": "live-third-party";
            "manual-first-party": "manual-first-party";
            "manual-third-party": "manual-third-party";
        }>>;
        normalized_object: z.ZodOptional<z.ZodObject<{
            digest: z.ZodString;
            bytes: z.ZodNumber;
            media_type: z.ZodLiteral<"text/plain; charset=utf-8">;
            normalizer_contract: z.ZodLiteral<"sourcey.evidence-normalizer/v1alpha1">;
            normalizer_id: z.ZodString;
            version: z.ZodString;
            toolchain_digest: z.ZodString;
        }, z.core.$strict>>;
        artifact_scope: z.ZodOptional<z.ZodEnum<{
            complete_document: "complete_document";
            document_excerpt: "document_excerpt";
        }>>;
        source_content: z.ZodOptional<z.ZodObject<{
            digest: z.ZodString;
            bytes: z.ZodNumber;
            media_type: z.ZodString;
            normalized_digest: z.ZodString;
            normalized_bytes: z.ZodNumber;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    no_capture_reason: z.ZodOptional<z.ZodEnum<{
        "access-denied": "access-denied";
        "connect-timeout": "connect-timeout";
        "dns-failure": "dns-failure";
        "empty-response": "empty-response";
        "extractor-error": "extractor-error";
        "policy-blocked": "policy-blocked";
        "tls-failure": "tls-failure";
    }>>;
}, z.core.$strict>;
export declare const observationSchema: z.ZodObject<{
    observation_contract: z.ZodLiteral<"sourcey.observation/v1alpha1">;
    source_id: z.ZodString;
    source_uri: z.ZodURL;
    retrieved_at: z.ZodISODateTime;
    method: z.ZodObject<{
        name: z.ZodString;
        version: z.ZodString;
    }, z.core.$strict>;
    outcome: z.ZodEnum<{
        "contradicts-candidate": "contradicts-candidate";
        error: "error";
        "supports-candidate": "supports-candidate";
        unreachable: "unreachable";
    }>;
    capture: z.ZodOptional<z.ZodObject<{
        digest: z.ZodString;
        bytes: z.ZodNumber;
        media_type: z.ZodString;
        availability: z.ZodEnum<{
            "private-receipt": "private-receipt";
            public: "public";
        }>;
        requested_uri: z.ZodOptional<z.ZodURL>;
        final_uri: z.ZodOptional<z.ZodURL>;
        redirect_chain: z.ZodOptional<z.ZodArray<z.ZodObject<{
            status: z.ZodUnion<readonly [z.ZodLiteral<301>, z.ZodLiteral<302>, z.ZodLiteral<303>, z.ZodLiteral<307>, z.ZodLiteral<308>]>;
            from: z.ZodURL;
            to: z.ZodURL;
        }, z.core.$strict>>>;
        source_standing: z.ZodOptional<z.ZodEnum<{
            "archived-first-party": "archived-first-party";
            "archived-third-party": "archived-third-party";
            "live-first-party": "live-first-party";
            "live-third-party": "live-third-party";
            "manual-first-party": "manual-first-party";
            "manual-third-party": "manual-third-party";
        }>>;
        normalized_object: z.ZodOptional<z.ZodObject<{
            digest: z.ZodString;
            bytes: z.ZodNumber;
            media_type: z.ZodLiteral<"text/plain; charset=utf-8">;
            normalizer_contract: z.ZodLiteral<"sourcey.evidence-normalizer/v1alpha1">;
            normalizer_id: z.ZodString;
            version: z.ZodString;
            toolchain_digest: z.ZodString;
        }, z.core.$strict>>;
        artifact_scope: z.ZodOptional<z.ZodEnum<{
            complete_document: "complete_document";
            document_excerpt: "document_excerpt";
        }>>;
        source_content: z.ZodOptional<z.ZodObject<{
            digest: z.ZodString;
            bytes: z.ZodNumber;
            media_type: z.ZodString;
            normalized_digest: z.ZodString;
            normalized_bytes: z.ZodNumber;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    no_capture_reason: z.ZodOptional<z.ZodEnum<{
        "access-denied": "access-denied";
        "connect-timeout": "connect-timeout";
        "dns-failure": "dns-failure";
        "empty-response": "empty-response";
        "extractor-error": "extractor-error";
        "policy-blocked": "policy-blocked";
        "tls-failure": "tls-failure";
    }>>;
    observation_id: z.ZodString;
}, z.core.$strict>;
export declare const observationPackManifestSchema: z.ZodObject<{
    schema_version: z.ZodLiteral<"sourcey.observation-pack-manifest/v1alpha1">;
    pack_path: z.ZodString;
    pack_digest: z.ZodString;
    bytes: z.ZodNumber;
    records: z.ZodNumber;
    first_retrieved_at: z.ZodNullable<z.ZodISODateTime>;
    last_retrieved_at: z.ZodNullable<z.ZodISODateTime>;
    shard: z.ZodString;
}, z.core.$strict>;
export type ObservationCore = z.infer<typeof observationCoreSchema>;
export type Observation = z.infer<typeof observationSchema>;
export type ObservationPackManifest = z.infer<typeof observationPackManifestSchema>;
//# sourceMappingURL=index.d.ts.map