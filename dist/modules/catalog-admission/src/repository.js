import { execFile } from "node:child_process";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { promisify } from "node:util";
const execFileAsync = promisify(execFile);
/** Where a data repository keeps its company files. */
export const CATALOG_ENTITY_ROOT = "entities";
/** Run Git in `root` and return its output; a non-zero exit throws with Git's exit code. */
export async function git(root, args, maxBuffer = 4 * 1024 * 1024) {
    const { stdout } = await execFileAsync("git", [...args], {
        cwd: resolve(root),
        encoding: "utf8",
        maxBuffer,
    });
    return stdout;
}
export async function gitIsAncestor(root, ancestor, descendant) {
    try {
        await git(root, ["merge-base", "--is-ancestor", ancestor, descendant]);
        return true;
    }
    catch (error) {
        if (error.code === 1)
            return false;
        throw error;
    }
}
/** A company file's bytes at `revision`, or null where the revision has no such file. */
export async function gitSourceAtRevision(input) {
    try {
        return await git(input.repositoryRoot, [
            "show",
            `${input.revision}:${entityPath(input.sourceFile)}`,
        ]);
    }
    catch (error) {
        if (error.code === 128)
            return null;
        throw error;
    }
}
export async function gitRevision(root, revision) {
    const value = (await git(root, ["rev-parse", revision])).trim();
    assertGitRevision(value, "resolved");
    return value;
}
export function assertGitRevision(value, label) {
    if (!/^[a-f0-9]{40,64}$/.test(value)) {
        throw new Error(`Catalog ${label} revision is not an exact Git object ID.`);
    }
}
/** A file under the Entity root as its contributor finds it in their repository. */
export function entityPath(source) {
    return `${CATALOG_ENTITY_ROOT}/${source}`;
}
export function entityPathOf(source) {
    return source === undefined ? null : entityPath(source);
}
export function repositoryPath(repositoryRoot, path) {
    return relative(repositoryRoot, path).split(sep).join("/");
}
export function resolveInside(root, path) {
    if (isAbsolute(path))
        throw new Error(`Catalog input must be repository-relative: ${path}.`);
    const resolved = resolve(root, path);
    if (!resolved.startsWith(`${root}${sep}`)) {
        throw new Error(`Catalog input escapes the repository: ${path}.`);
    }
    return resolved;
}
//# sourceMappingURL=repository.js.map