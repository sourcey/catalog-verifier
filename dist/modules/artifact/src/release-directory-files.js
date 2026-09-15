import { basename } from "node:path";
import { regularReleaseFiles, } from "../../deterministic-release-archive/src/files.js";
import { compareCanonicalStrings, digestFromPathSegment, sha256Bytes, } from "../../primitives/src/index.js";
export async function verifiedReleaseFiles(directory, bundle) {
    return verifyReleaseFiles(await regularReleaseFiles(directory), bundle);
}
export function verifyReleaseFiles(entries, bundle) {
    const actual = entries.filter(({ path }) => path !== "bundle.json");
    const actualPaths = actual.map(({ path }) => path).sort(compareCanonicalStrings);
    const declaredPaths = Object.keys(bundle.files).sort(compareCanonicalStrings);
    if (JSON.stringify(actualPaths) !== JSON.stringify(declaredPaths)) {
        throw new Error("Catalog release file set does not match its immutable declaration.");
    }
    const files = new Map();
    for (const { path, bytes } of actual.sort((left, right) => compareCanonicalStrings(left.path, right.path))) {
        const declaration = bundle.files[path];
        if (!declaration ||
            bytes.byteLength !== declaration.bytes ||
            sha256Bytes(bytes) !== declaration.sha256) {
            throw new Error(`Catalog release file ${path} does not match its byte declaration.`);
        }
        files.set(path, bytes);
    }
    return files;
}
export function parseReleaseJson(files, path) {
    return JSON.parse(requiredReleaseFile(files, path).toString("utf8"));
}
export function requiredReleaseFile(files, path) {
    const bytes = files.get(path);
    if (!bytes)
        throw new Error(`Catalog delta bundle is missing ${path}.`);
    return bytes;
}
export function addressFromReleaseJsonPath(path) {
    return digestFromPathSegment(basename(path, ".json"));
}
//# sourceMappingURL=release-directory-files.js.map