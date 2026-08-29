import { z } from "zod";
import { type Digest } from "../../primitives/src/index.js";
export declare const EVIDENCE_NORMALIZER_PRE_JSON_VARIANTS_TOOLCHAIN: {
    readonly algorithm: "sourcey.deterministic-content-normalizer/v1";
    readonly html_metadata: readonly ["meta", "structured-data", "canonical-link"];
    readonly html_links: readonly ["a[href]", "form[action]"];
    readonly html_link_protocols: readonly ["http", "https", "mailto"];
    readonly parse5: string;
    readonly unicode: "NFC";
};
/** Exact retained profile for captures created before empty HTML values were omitted. */
export declare const EVIDENCE_NORMALIZER_PRE_EMPTY_HTML_VALUES_TOOLCHAIN: {
    readonly json_media_types: readonly ["application/json", "application/*+json", "application/*-json"];
    readonly algorithm: "sourcey.deterministic-content-normalizer/v1";
    readonly html_metadata: readonly ["meta", "structured-data", "canonical-link"];
    readonly html_links: readonly ["a[href]", "form[action]"];
    readonly html_link_protocols: readonly ["http", "https", "mailto"];
    readonly parse5: string;
    readonly unicode: "NFC";
};
export declare const EVIDENCE_NORMALIZER_TOOLCHAIN: {
    readonly html_empty_values: "omit";
    readonly json_media_types: readonly ["application/json", "application/*+json", "application/*-json"];
    readonly algorithm: "sourcey.deterministic-content-normalizer/v1";
    readonly html_metadata: readonly ["meta", "structured-data", "canonical-link"];
    readonly html_links: readonly ["a[href]", "form[action]"];
    readonly html_link_protocols: readonly ["http", "https", "mailto"];
    readonly parse5: string;
    readonly unicode: "NFC";
};
/** Exact retained XML profile for captures created before empty HTML values were omitted. */
export declare const EVIDENCE_NORMALIZER_PRE_EMPTY_HTML_VALUES_XML_TOOLCHAIN: {
    readonly xml_media_types: readonly ["application/xml", "text/xml", "application/*+xml"];
    readonly json_media_types: readonly ["application/json", "application/*+json", "application/*-json"];
    readonly algorithm: "sourcey.deterministic-content-normalizer/v1";
    readonly html_metadata: readonly ["meta", "structured-data", "canonical-link"];
    readonly html_links: readonly ["a[href]", "form[action]"];
    readonly html_link_protocols: readonly ["http", "https", "mailto"];
    readonly parse5: string;
    readonly unicode: "NFC";
};
export declare const EVIDENCE_NORMALIZER_XML_TOOLCHAIN: {
    readonly xml_media_types: readonly ["application/xml", "text/xml", "application/*+xml"];
    readonly html_empty_values: "omit";
    readonly json_media_types: readonly ["application/json", "application/*+json", "application/*-json"];
    readonly algorithm: "sourcey.deterministic-content-normalizer/v1";
    readonly html_metadata: readonly ["meta", "structured-data", "canonical-link"];
    readonly html_links: readonly ["a[href]", "form[action]"];
    readonly html_link_protocols: readonly ["http", "https", "mailto"];
    readonly parse5: string;
    readonly unicode: "NFC";
};
/** Exact retained profile for evidence captured before public mail actions were preserved. */
export declare const EVIDENCE_NORMALIZER_WEB_LINK_TOOLCHAIN: {
    readonly algorithm: "sourcey.deterministic-content-normalizer/v1";
    readonly html_metadata: readonly ["meta", "structured-data", "canonical-link"];
    readonly html_links: readonly ["a[href]", "form[action]"];
    readonly parse5: string;
    readonly unicode: "NFC";
};
export declare const EVIDENCE_NORMALIZER_CANONICAL_LINK_TOOLCHAIN: {
    readonly algorithm: "sourcey.deterministic-content-normalizer/v1";
    readonly html_metadata: readonly ["meta", "structured-data", "canonical-link"];
    readonly parse5: string;
    readonly unicode: "NFC";
};
export declare const EVIDENCE_NORMALIZER_FOUNDATION_TOOLCHAIN: {
    readonly algorithm: "sourcey.deterministic-content-normalizer/v1";
    readonly parse5: string;
    readonly unicode: "NFC";
};
export declare const EVIDENCE_NORMALIZER: {
    readonly toolchain_digest: `sha256:${string}`;
    readonly normalizer_contract: "sourcey.evidence-normalizer/v1alpha1";
    readonly normalizer_id: "sourcey-deterministic-content";
    readonly version: "1";
};
export declare const EVIDENCE_NORMALIZER_XML: {
    readonly toolchain_digest: `sha256:${string}`;
    readonly normalizer_contract: "sourcey.evidence-normalizer/v1alpha1";
    readonly normalizer_id: "sourcey-deterministic-content";
    readonly version: "1";
};
export declare const EVIDENCE_NORMALIZER_CANONICAL_LINK: {
    readonly toolchain_digest: `sha256:${string}`;
    readonly normalizer_contract: "sourcey.evidence-normalizer/v1alpha1";
    readonly normalizer_id: "sourcey-deterministic-content";
    readonly version: "1";
};
export declare const EVIDENCE_NORMALIZER_FOUNDATION: {
    readonly toolchain_digest: `sha256:${string}`;
    readonly normalizer_contract: "sourcey.evidence-normalizer/v1alpha1";
    readonly normalizer_id: "sourcey-deterministic-content";
    readonly version: "1";
};
export declare const evidenceNormalizerSchema: z.ZodObject<{
    normalizer_contract: z.ZodLiteral<"sourcey.evidence-normalizer/v1alpha1">;
    normalizer_id: z.ZodLiteral<"sourcey-deterministic-content">;
    version: z.ZodLiteral<"1">;
    toolchain_digest: z.ZodString;
}, z.core.$strict>;
export declare function normalizeEvidenceCapture(input: {
    readonly bytes: Uint8Array;
    readonly mediaType: string;
    readonly normalizerToolchainDigest?: Digest;
}): {
    readonly bytes: Uint8Array;
    readonly digest: Digest;
};
export declare function evidenceNormalizerForToolchainDigest(value: Digest): typeof EVIDENCE_NORMALIZER;
//# sourceMappingURL=evidence-normalization.d.ts.map