import { lstat, readdir, readFile } from "node:fs/promises";
import { join, posix } from "node:path";
/** Canonical traversal shared by archive production and file-closure checking.
 * Reading a release must not load the compression implementation. */
export async function regularReleaseFiles(root, directory = "") {
    const entries = [];
    const children = await readdir(join(root, directory), { withFileTypes: true });
    for (const item of children.sort((left, right) => left.name < right.name ? -1 : left.name > right.name ? 1 : 0)) {
        const path = directory ? posix.join(directory, item.name) : item.name;
        const physicalPath = join(root, path);
        const metadata = await lstat(physicalPath);
        if (metadata.isDirectory()) {
            entries.push(...(await regularReleaseFiles(root, path)));
            continue;
        }
        if (!metadata.isFile() || item.isSymbolicLink()) {
            throw new Error(`Release archive contains a non-regular file: ${path}`);
        }
        entries.push({ path, bytes: await readFile(physicalPath) });
    }
    return entries;
}
//# sourceMappingURL=files.js.map