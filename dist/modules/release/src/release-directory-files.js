import { readdir, readFile } from "node:fs/promises";
import { basename, join, relative, sep } from "node:path";
import { compareCanonicalStrings, digestFromPathSegment, sha256Bytes, } from "../../primitives/src/index.js";
export async function verifiedReleaseFiles(directory, bundle) {
    const actualPaths = (await filesUnder(directory))
        .map((file) => relative(directory, file).split(sep).join("/"))
        .filter((path) => path !== "bundle.json")
        .sort(compareCanonicalStrings);
    const declaredPaths = Object.keys(bundle.files).sort(compareCanonicalStrings);
    if (JSON.stringify(actualPaths) !== JSON.stringify(declaredPaths)) {
        throw new Error("Catalog delta file set does not match its immutable declaration.");
    }
    const files = new Map();
    for (const path of declaredPaths) {
        const bytes = await readFile(join(directory, path));
        const declaration = bundle.files[path];
        if (!declaration ||
            bytes.byteLength !== declaration.bytes ||
            sha256Bytes(bytes) !== declaration.sha256) {
            throw new Error(`Catalog delta file ${path} does not match its byte declaration.`);
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
async function filesUnder(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const nested = await Promise.all(entries.map((entry) => {
        const path = join(directory, entry.name);
        if (entry.isSymbolicLink()) {
            throw new Error(`Catalog delta bundle contains a symlink: ${path}.`);
        }
        return entry.isDirectory() ? filesUnder(path) : [path];
    }));
    return nested.flat();
}
//# sourceMappingURL=release-directory-files.js.map