import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { canonicalJson, compareCanonicalStrings, sha256Bytes } from "provenry/primitives";
/**
 * Byte-exact verification of an authority bundle's file tree: every object
 * present, declared, safely pathed, and matching its manifest digest. Split
 * from admission so each lane keeps its semantic checks and this module owns
 * the storage shape.
 */
export async function verifyBundleTree(directory, declarations, label) {
    const declaredPaths = Object.keys(declarations).sort(compareCanonicalStrings);
    for (const path of declaredPaths)
        assertSafeObjectPath(path, label);
    const actualPaths = (await filesUnder(directory, label))
        .map((path) => relative(directory, path).split(sep).join("/"))
        .sort(compareCanonicalStrings);
    const expectedPaths = [...declaredPaths, "manifest.json"].sort(compareCanonicalStrings);
    if (canonicalJson(actualPaths) !== canonicalJson(expectedPaths)) {
        throw new Error(`${label} ${directory} has an undeclared file set.`);
    }
    for (const path of declaredPaths) {
        const declaration = declarations[path];
        if (!declaration)
            throw new Error(`${label} declaration ${path} is absent.`);
        const bytes = await readFile(join(directory, path));
        if (bytes.byteLength !== declaration.bytes || sha256Bytes(bytes) !== declaration.sha256) {
            throw new Error(`${label} object ${path} differs from its declaration.`);
        }
    }
}
export function assertOnlyObjectPaths(declarations, prefix, expected) {
    const actual = Object.keys(declarations)
        .filter((path) => path.startsWith(prefix))
        .sort(compareCanonicalStrings);
    if (canonicalJson(actual) !== canonicalJson([...expected].sort(compareCanonicalStrings))) {
        throw new Error(`Evidence authority bundle ${prefix} object declarations disagree.`);
    }
}
export function assertSafeObjectPath(path, label) {
    if (!path ||
        path === "manifest.json" ||
        path.startsWith("/") ||
        path.includes("\\") ||
        path.split("/").some((segment) => !segment || segment === "." || segment === "..")) {
        throw new Error(`${label} has an unsafe object path: ${path}.`);
    }
}
export async function filesUnder(path, label) {
    const entries = await readdir(path, { withFileTypes: true });
    return (await Promise.all(entries.map((entry) => {
        if (entry.isSymbolicLink()) {
            throw new Error(`${label} cannot contain symlinks: ${path}.`);
        }
        const child = join(path, entry.name);
        return entry.isDirectory() ? filesUnder(child, label) : [child];
    }))).flat();
}
//# sourceMappingURL=evidence-bundle-tree.js.map