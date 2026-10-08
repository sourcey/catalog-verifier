import { type Digest } from "provenry/primitives";
import { z } from "zod";
/**
 * Catalog's normalizer identity and the one profile every capture is
 * normalized with. The algorithm is Provenry's `capture/normalize`, which the
 * public verifier also runs; the profile only says what it reads. Evidence an
 * earlier release first included was verified by that release, so no earlier
 * profile is kept (lean-release-chain §3.1).
 */
export declare const EVIDENCE_NORMALIZER_TOOLCHAIN: {
    readonly algorithm: "sourcey.deterministic-content-normalizer/v1";
    readonly html_metadata: readonly ["meta", "structured-data", "canonical-link"];
    readonly html_links: readonly ["a[href]", "form[action]"];
    readonly html_link_protocols: readonly ["http", "https", "mailto"];
    readonly parse5: string;
    readonly unicode: "NFC";
    readonly json_media_types: readonly ["application/json", "application/*+json", "application/*-json"];
    readonly html_empty_values: "omit";
    readonly html_json_attributes: {
        readonly name_prefix: "data-";
        readonly maximum_attribute_bytes: 32768;
        readonly maximum_document_bytes: 131072;
    };
    /** The site's navigation, banner and footer are written apart from the content a reader judges. */
    readonly html_page_chrome: "separate";
};
export declare const EVIDENCE_NORMALIZER: {
    readonly normalizer_contract: "sourcey.evidence-normalizer/v1alpha1";
    readonly normalizer_id: "sourcey-deterministic-content";
    readonly version: "1";
    readonly toolchain_digest: `sha256:${string}`;
};
export declare const evidenceNormalizerSchema: z.ZodObject<{
    normalizer_contract: z.ZodLiteral<"sourcey.evidence-normalizer/v1alpha1">;
    normalizer_id: z.ZodLiteral<"sourcey-deterministic-content">;
    version: z.ZodLiteral<"1">;
    toolchain_digest: z.ZodLiteral<`sha256:${string}`>;
}, z.core.$strict>;
export declare function normalizeEvidenceCapture(input: {
    readonly bytes: Uint8Array;
    readonly mediaType: string;
}): {
    readonly bytes: Uint8Array;
    readonly digest: Digest;
};
//# sourceMappingURL=evidence-normalization.d.ts.map