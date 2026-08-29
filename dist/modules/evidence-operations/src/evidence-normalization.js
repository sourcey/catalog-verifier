import { TextDecoder, TextEncoder } from "node:util";
import { parse } from "parse5";
import { z } from "zod";
import { canonicalJson, digest, sha256Bytes } from "../../primitives/src/index.js";
import { PARSE5_VERSION } from "./dependency-versions.js";
const digestSchema = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const utf8 = new TextDecoder("utf-8", { fatal: true });
const encoder = new TextEncoder();
export const EVIDENCE_NORMALIZER_PRE_JSON_VARIANTS_TOOLCHAIN = {
    algorithm: "sourcey.deterministic-content-normalizer/v1",
    html_metadata: ["meta", "structured-data", "canonical-link"],
    html_links: ["a[href]", "form[action]"],
    html_link_protocols: ["http", "https", "mailto"],
    parse5: PARSE5_VERSION,
    unicode: "NFC",
};
/** Exact retained profile for captures created before empty HTML values were omitted. */
export const EVIDENCE_NORMALIZER_PRE_EMPTY_HTML_VALUES_TOOLCHAIN = {
    ...EVIDENCE_NORMALIZER_PRE_JSON_VARIANTS_TOOLCHAIN,
    json_media_types: ["application/json", "application/*+json", "application/*-json"],
};
export const EVIDENCE_NORMALIZER_TOOLCHAIN = {
    ...EVIDENCE_NORMALIZER_PRE_EMPTY_HTML_VALUES_TOOLCHAIN,
    html_empty_values: "omit",
};
/** Exact retained XML profile for captures created before empty HTML values were omitted. */
export const EVIDENCE_NORMALIZER_PRE_EMPTY_HTML_VALUES_XML_TOOLCHAIN = {
    ...EVIDENCE_NORMALIZER_PRE_EMPTY_HTML_VALUES_TOOLCHAIN,
    xml_media_types: ["application/xml", "text/xml", "application/*+xml"],
};
export const EVIDENCE_NORMALIZER_XML_TOOLCHAIN = {
    ...EVIDENCE_NORMALIZER_TOOLCHAIN,
    xml_media_types: ["application/xml", "text/xml", "application/*+xml"],
};
/** Exact retained profile for evidence captured before public mail actions were preserved. */
export const EVIDENCE_NORMALIZER_WEB_LINK_TOOLCHAIN = {
    algorithm: "sourcey.deterministic-content-normalizer/v1",
    html_metadata: ["meta", "structured-data", "canonical-link"],
    html_links: ["a[href]", "form[action]"],
    parse5: PARSE5_VERSION,
    unicode: "NFC",
};
export const EVIDENCE_NORMALIZER_CANONICAL_LINK_TOOLCHAIN = {
    algorithm: "sourcey.deterministic-content-normalizer/v1",
    html_metadata: ["meta", "structured-data", "canonical-link"],
    parse5: PARSE5_VERSION,
    unicode: "NFC",
};
export const EVIDENCE_NORMALIZER_FOUNDATION_TOOLCHAIN = {
    algorithm: "sourcey.deterministic-content-normalizer/v1",
    parse5: PARSE5_VERSION,
    unicode: "NFC",
};
const EVIDENCE_NORMALIZER_IDENTITY = {
    normalizer_contract: "sourcey.evidence-normalizer/v1alpha1",
    normalizer_id: "sourcey-deterministic-content",
    version: "1",
};
function evidenceNormalizerDefinition(toolchain) {
    return { ...EVIDENCE_NORMALIZER_IDENTITY, toolchain_digest: digest(toolchain) };
}
export const EVIDENCE_NORMALIZER = evidenceNormalizerDefinition(EVIDENCE_NORMALIZER_TOOLCHAIN);
export const EVIDENCE_NORMALIZER_XML = evidenceNormalizerDefinition(EVIDENCE_NORMALIZER_XML_TOOLCHAIN);
export const EVIDENCE_NORMALIZER_CANONICAL_LINK = evidenceNormalizerDefinition(EVIDENCE_NORMALIZER_CANONICAL_LINK_TOOLCHAIN);
export const EVIDENCE_NORMALIZER_FOUNDATION = evidenceNormalizerDefinition(EVIDENCE_NORMALIZER_FOUNDATION_TOOLCHAIN);
const NORMALIZER_TOOLCHAIN_BY_DIGEST = new Map([
    [EVIDENCE_NORMALIZER.toolchain_digest, EVIDENCE_NORMALIZER_TOOLCHAIN],
    [
        digest(EVIDENCE_NORMALIZER_PRE_EMPTY_HTML_VALUES_TOOLCHAIN),
        EVIDENCE_NORMALIZER_PRE_EMPTY_HTML_VALUES_TOOLCHAIN,
    ],
    [
        digest(EVIDENCE_NORMALIZER_PRE_JSON_VARIANTS_TOOLCHAIN),
        EVIDENCE_NORMALIZER_PRE_JSON_VARIANTS_TOOLCHAIN,
    ],
    [EVIDENCE_NORMALIZER_XML.toolchain_digest, EVIDENCE_NORMALIZER_XML_TOOLCHAIN],
    [
        digest(EVIDENCE_NORMALIZER_PRE_EMPTY_HTML_VALUES_XML_TOOLCHAIN),
        EVIDENCE_NORMALIZER_PRE_EMPTY_HTML_VALUES_XML_TOOLCHAIN,
    ],
    [digest(EVIDENCE_NORMALIZER_WEB_LINK_TOOLCHAIN), EVIDENCE_NORMALIZER_WEB_LINK_TOOLCHAIN],
    [
        EVIDENCE_NORMALIZER_CANONICAL_LINK.toolchain_digest,
        EVIDENCE_NORMALIZER_CANONICAL_LINK_TOOLCHAIN,
    ],
    [
        EVIDENCE_NORMALIZER_FOUNDATION.toolchain_digest,
        EVIDENCE_NORMALIZER_FOUNDATION_TOOLCHAIN,
    ],
]);
export const evidenceNormalizerSchema = z
    .object({
    normalizer_contract: z.literal(EVIDENCE_NORMALIZER.normalizer_contract),
    normalizer_id: z.literal(EVIDENCE_NORMALIZER.normalizer_id),
    version: z.literal(EVIDENCE_NORMALIZER.version),
    toolchain_digest: digestSchema,
})
    .strict()
    .superRefine((value, context) => {
    if (!NORMALIZER_TOOLCHAIN_BY_DIGEST.has(value.toolchain_digest)) {
        context.addIssue({
            code: "custom",
            path: ["toolchain_digest"],
            message: "Evidence normalizer toolchain is not retained for exact verification.",
        });
    }
});
export function normalizeEvidenceCapture(input) {
    const toolchainDigest = input.normalizerToolchainDigest ?? EVIDENCE_NORMALIZER.toolchain_digest;
    const toolchain = normalizerToolchainForDigest(toolchainDigest);
    const mediaType = input.mediaType.split(";", 1)[0]?.trim().toLowerCase();
    let normalized;
    if (mediaType && matchesMediaType(mediaType, jsonMediaTypes(toolchainDigest, toolchain))) {
        normalized = `${canonicalJson(JSON.parse(decodeText(input.bytes)))}\n`;
    }
    else if (mediaType === "text/html" || mediaType === "application/xhtml+xml") {
        normalized = normalizeHtml(decodeText(input.bytes), {
            includeCanonicalLinks: "html_metadata" in toolchain && toolchain.html_metadata.includes("canonical-link"),
            includeDocumentLinks: "html_links" in toolchain,
            includeMailtoLinks: "html_link_protocols" in toolchain && toolchain.html_link_protocols.includes("mailto"),
            omitEmptyValues: "html_empty_values" in toolchain,
        });
    }
    else if (mediaType &&
        "xml_media_types" in toolchain &&
        matchesMediaType(mediaType, toolchain.xml_media_types)) {
        normalized = normalizeText(decodeText(input.bytes));
    }
    else if (mediaType?.startsWith("text/")) {
        normalized = normalizeText(decodeText(input.bytes));
    }
    else {
        throw new Error(`Evidence media type ${input.mediaType} has no approved normalizer.`);
    }
    const bytes = encoder.encode(normalized);
    return { bytes, digest: sha256Bytes(bytes) };
}
function jsonMediaTypes(toolchainDigest, toolchain) {
    if ("json_media_types" in toolchain)
        return toolchain.json_media_types;
    if (!NORMALIZER_TOOLCHAIN_BY_DIGEST.has(toolchainDigest)) {
        throw new Error(`Evidence normalizer ${toolchainDigest} is not recognized.`);
    }
    // These retained digests predate the explicit media-type field; their exact
    // historical algorithm normalized application/json and +json variants.
    return ["application/json", "application/*+json"];
}
function matchesMediaType(mediaType, patterns) {
    return patterns.some((pattern) => {
        const wildcard = pattern.indexOf("*");
        return wildcard < 0
            ? mediaType === pattern
            : mediaType.startsWith(pattern.slice(0, wildcard)) &&
                mediaType.endsWith(pattern.slice(wildcard + 1));
    });
}
export function evidenceNormalizerForToolchainDigest(value) {
    return evidenceNormalizerDefinition(normalizerToolchainForDigest(value));
}
function normalizerToolchainForDigest(value) {
    const toolchain = NORMALIZER_TOOLCHAIN_BY_DIGEST.get(value);
    if (!toolchain)
        throw new Error(`Evidence normalizer ${value} is not recognized.`);
    return toolchain;
}
function normalizeHtml(html, options) {
    const document = parse(html);
    const visible = [];
    const metadata = [];
    const structured = [];
    const canonicalLinks = [];
    const documentLinks = [];
    visitHtml(document, false, options.includeMailtoLinks, options.omitEmptyValues, visible, metadata, structured, canonicalLinks, documentLinks);
    const sections = [
        ["metadata", [...new Set(metadata)].sort()],
        ...(options.includeCanonicalLinks
            ? [["canonical-links", [...new Set(canonicalLinks)].sort()]]
            : []),
        ...(options.includeDocumentLinks
            ? [["document-links", [...new Set(documentLinks)].sort()]]
            : []),
        ["structured-data", [...new Set(structured)].sort()],
        ["content", visible],
    ];
    const rendered = sections
        .filter(([, lines]) => lines.length > 0)
        .map(([name, lines]) => `[${name}]\n${lines.join("\n")}`)
        .join("\n\n");
    if (!rendered)
        throw new Error("Evidence HTML is empty after normalization.");
    return `${rendered}\n`;
}
function visitHtml(node, suppressed, includeMailtoLinks, omitEmptyValues, visible, metadata, structured, canonicalLinks, documentLinks) {
    if (isElement(node)) {
        const tag = node.tagName.toLowerCase();
        const attributes = new Map(node.attrs.map((attribute) => [attribute.name, attribute.value]));
        if (tag === "meta") {
            const name = attributes.get("name") ?? attributes.get("property");
            const content = attributes.get("content");
            if (name && content) {
                const normalizedName = normalizeInline(name);
                const normalizedContent = normalizeInline(content);
                if (!omitEmptyValues || (normalizedName && normalizedContent)) {
                    metadata.push(`${normalizedName}: ${normalizedContent}`);
                }
            }
        }
        if (tag === "link" &&
            attributes.get("rel")?.toLowerCase().split(/\s+/u).includes("canonical")) {
            const href = attributes.get("href");
            if (href) {
                const normalizedHref = normalizeInline(href);
                if (!omitEmptyValues || normalizedHref)
                    canonicalLinks.push(normalizedHref);
            }
        }
        if (!suppressed && (tag === "a" || tag === "form")) {
            const destination = evidenceDocumentLink(attributes.get(tag === "a" ? "href" : "action") ?? "", includeMailtoLinks);
            if (destination) {
                const label = visibleElementText(node);
                documentLinks.push(label ? `${label}: ${destination}` : destination);
            }
        }
        if (tag === "script" && attributes.get("type")?.toLowerCase() === "application/ld+json") {
            const source = node.childNodes
                .filter((child) => child.nodeName === "#text")
                .map((child) => ("value" in child ? child.value : ""))
                .join("");
            try {
                structured.push(canonicalJson(JSON.parse(source)));
            }
            catch {
                // Malformed structured data is ignored as input, never repaired or guessed.
            }
        }
        suppressed =
            suppressed || ["script", "style", "template", "noscript", "svg", "canvas"].includes(tag);
    }
    else if (node.nodeName === "#text" && !suppressed && "value" in node) {
        const text = normalizeInline(node.value);
        if (text)
            visible.push(text);
    }
    if ("childNodes" in node) {
        for (const child of node.childNodes) {
            visitHtml(child, suppressed, includeMailtoLinks, omitEmptyValues, visible, metadata, structured, canonicalLinks, documentLinks);
        }
    }
}
function evidenceDocumentLink(value, includeMailtoLinks) {
    const normalized = normalizeInline(value);
    if (!normalized || normalized.startsWith("#"))
        return null;
    try {
        const parsed = new URL(normalized, "https://sourcey.invalid/");
        return parsed.protocol === "http:" ||
            parsed.protocol === "https:" ||
            (includeMailtoLinks && parsed.protocol === "mailto:")
            ? normalized
            : null;
    }
    catch {
        return null;
    }
}
function visibleElementText(node) {
    const parts = [];
    collectVisibleElementText(node, false, parts);
    return normalizeInline(parts.join(" "));
}
function collectVisibleElementText(node, suppressed, parts) {
    if (isElement(node)) {
        suppressed =
            suppressed ||
                ["script", "style", "template", "noscript", "svg", "canvas"].includes(node.tagName.toLowerCase());
    }
    else if (node.nodeName === "#text" && !suppressed && "value" in node) {
        const text = normalizeInline(node.value);
        if (text)
            parts.push(text);
    }
    if ("childNodes" in node) {
        for (const child of node.childNodes)
            collectVisibleElementText(child, suppressed, parts);
    }
}
function isElement(node) {
    return "tagName" in node && "attrs" in node;
}
function decodeText(bytes) {
    return utf8.decode(bytes).replace(/^\uFEFF/u, "");
}
function normalizeText(text) {
    const normalized = text
        .replaceAll("\r\n", "\n")
        .replaceAll("\r", "\n")
        .normalize("NFC")
        .split("\n")
        .map((line) => line.replace(/[ \t]+$/gu, ""))
        .join("\n")
        .trim();
    if (!normalized)
        throw new Error("Evidence text is empty after normalization.");
    return `${normalized}\n`;
}
function normalizeInline(text) {
    return text.normalize("NFC").replace(/\s+/gu, " ").trim();
}
//# sourceMappingURL=evidence-normalization.js.map