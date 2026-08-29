import { sha256Bytes } from "../../primitives/src/index.js";
export function standardAdapterKey(namespace, version) {
    return `${namespace}\u0000${version}`;
}
export function verifyRetainedStandardArtifacts(input) {
    if (input.bytesByDigest.size !== input.artifacts.length) {
        throw new Error("Standard adapter artifact bytes must match the exact request closure.");
    }
    const accepted = new Set(input.acceptedMediaTypes.map(normalizeMediaType));
    for (const artifact of input.artifacts) {
        const bytes = input.bytesByDigest.get(artifact.object_digest);
        if (!bytes ||
            bytes.byteLength !== artifact.bytes ||
            sha256Bytes(bytes) !== artifact.object_digest) {
            throw new Error(`Standard artifact ${artifact.object_digest} does not match retained bytes.`);
        }
        if (!accepted.has(normalizeMediaType(artifact.media_type))) {
            throw new Error(`Standard adapter ${input.adapterDigest} does not accept ${artifact.media_type}.`);
        }
    }
}
export function verifyStandardLocatorClosure(input) {
    const artifacts = new Map(input.artifacts.map((artifact) => [artifact.object_digest, artifact]));
    for (const locator of input.locators) {
        const artifact = artifacts.get(locator.object_digest);
        const bytes = input.bytesByDigest.get(locator.object_digest);
        if (!artifact || !bytes || locator.end_byte > artifact.bytes) {
            throw new Error("A standard locator names bytes outside its exact retained artifact.");
        }
        if (sha256Bytes(bytes.slice(locator.start_byte, locator.end_byte)) !== locator.value_digest) {
            throw new Error("A standard locator does not match its exact retained artifact bytes.");
        }
    }
    for (const item of input.residue) {
        if (item.object_digest && !artifacts.has(item.object_digest)) {
            throw new Error("Standard residue names an artifact outside its exact request.");
        }
    }
}
function normalizeMediaType(value) {
    return value.split(";", 1)[0]?.trim().toLowerCase() ?? value;
}
//# sourceMappingURL=index.js.map