import { normalizeDocument, PARSE5_VERSION } from "provenry/capture/normalize";
import { digest } from "provenry/primitives";
import { z } from "zod";
/**
 * Catalog's normalizer identity and the one profile every capture is
 * normalized with. The algorithm is Provenry's `capture/normalize`, which the
 * public verifier also runs; the profile only says what it reads. Evidence an
 * earlier release first included was verified by that release, so no earlier
 * profile is kept (lean-release-chain §3.1).
 */
export const EVIDENCE_NORMALIZER_TOOLCHAIN = {
    algorithm: "sourcey.deterministic-content-normalizer/v1",
    html_metadata: ["meta", "structured-data", "canonical-link"],
    html_links: ["a[href]", "form[action]"],
    html_link_protocols: ["http", "https", "mailto"],
    parse5: PARSE5_VERSION,
    unicode: "NFC",
    json_media_types: ["application/json", "application/*+json", "application/*-json"],
    html_empty_values: "omit",
    html_json_attributes: {
        name_prefix: "data-",
        maximum_attribute_bytes: 32_768,
        maximum_document_bytes: 131_072,
    },
    /** The site's navigation, banner and footer are written apart from the content a reader judges. */
    html_page_chrome: "separate",
};
export const EVIDENCE_NORMALIZER = {
    normalizer_contract: "sourcey.evidence-normalizer/v1alpha1",
    normalizer_id: "sourcey-deterministic-content",
    version: "1",
    toolchain_digest: digest(EVIDENCE_NORMALIZER_TOOLCHAIN),
};
export const evidenceNormalizerSchema = z
    .object({
    normalizer_contract: z.literal(EVIDENCE_NORMALIZER.normalizer_contract),
    normalizer_id: z.literal(EVIDENCE_NORMALIZER.normalizer_id),
    version: z.literal(EVIDENCE_NORMALIZER.version),
    toolchain_digest: z.literal(EVIDENCE_NORMALIZER.toolchain_digest),
})
    .strict();
export function normalizeEvidenceCapture(input) {
    const toolchain = EVIDENCE_NORMALIZER_TOOLCHAIN;
    return normalizeDocument({
        bytes: input.bytes,
        mediaType: input.mediaType,
        profile: {
            html: {
                includeCanonicalLinks: true,
                includeDocumentLinks: true,
                includeMailtoLinks: true,
                omitEmptyValues: true,
                embeddedJsonAttributes: toolchain.html_json_attributes,
                separatePageChrome: true,
            },
            jsonMediaTypes: toolchain.json_media_types,
            xmlMediaTypes: [],
        },
    });
}
//# sourceMappingURL=evidence-normalization.js.map