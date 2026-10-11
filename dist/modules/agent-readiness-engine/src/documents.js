import { parse as parseYaml } from "yaml";
/** Reading the documents a service publishes: their shape only, never their prose. */
/** A JSON object, or null for anything else. */
export function record(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value)
        ? value
        : null;
}
/** An HTTPS URL carrying no credentials, normalised, or null. */
export function httpsUrl(value) {
    if (typeof value !== "string")
        return null;
    try {
        const url = new URL(value);
        return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
    }
    catch {
        return null;
    }
}
/** Strict UTF-8, or null for bytes that are not. */
export function utf8(bytes) {
    try {
        return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    }
    catch {
        return null;
    }
}
/** Parsed JSON, or undefined for text that is not. */
export function json(text) {
    try {
        return JSON.parse(text);
    }
    catch {
        return undefined;
    }
}
/**
 * The OpenAPI 3.x version a document states, when it is one: its `openapi`
 * version and the `info` object (a title and a version) OpenAPI requires.
 */
export function openApiVersion(document) {
    const version = document?.openapi;
    const info = record(document?.info);
    return typeof version === "string" &&
        /^3\.\d+\.\d+$/u.test(version) &&
        typeof info?.title === "string" &&
        typeof info.version === "string"
        ? version
        : null;
}
/**
 * A JSON or YAML document parsed, or undefined for text that is neither:
 * vendors publish OpenAPI documents in both. Aliases are bounded, so a small
 * document cannot expand into a large one.
 */
export function jsonOrYaml(text) {
    const parsed = json(text);
    if (parsed !== undefined)
        return parsed;
    try {
        return parseYaml(text, { maxAliasCount: 100 });
    }
    catch {
        return undefined;
    }
}
//# sourceMappingURL=documents.js.map