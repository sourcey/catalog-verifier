import { execFile } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";
const execFileAsync = promisify(execFile);
const CANDIDATE_REFERENCE = "refs/sourcey/candidate";
/** Materialize a clean detached checkout of one repository's current main. */
export async function prepareGitRepositoryMain(input) {
    await prepareRepository(input.root, input.remoteUrl);
    await git(input.root, "fetch", "--quiet", "--no-tags", "origin", "+refs/heads/main:refs/remotes/origin/main");
    const head = await gitObject(input.root, "refs/remotes/origin/main^{commit}");
    await git(input.root, "checkout", "--quiet", "--force", "--detach", head);
    await git(input.root, "clean", "--quiet", "-ffdx");
    await assertExactGitCheckout(input.root, head);
    return head;
}
/** Materialize an exact pull-request head as inert Git input. */
export async function prepareGitRepositoryHead(input) {
    const baseSha = parseGitObject(input.baseSha, "pull-request base");
    const headSha = parseGitObject(input.headSha, "pull-request head");
    if (!Number.isSafeInteger(input.pullRequestNumber) || input.pullRequestNumber < 1) {
        throw new Error("Git input preparation requires an exact pull-request number.");
    }
    await prepareRepository(input.root, input.remoteUrl);
    await git(input.root, "fetch", "--quiet", "--no-tags", "origin", baseSha, `+refs/pull/${input.pullRequestNumber}/head:${CANDIDATE_REFERENCE}`);
    if ((await gitObject(input.root, `${CANDIDATE_REFERENCE}^{commit}`)) !== headSha) {
        throw new Error("Fetched pull-request head differs from the requested input.");
    }
    await git(input.root, "checkout", "--quiet", "--force", "--detach", headSha);
    await git(input.root, "clean", "--quiet", "-ffdx");
    await assertExactGitCheckout(input.root, headSha);
}
export async function assertExactGitCheckout(repositoryRoot, expectedHeadSha) {
    if ((await gitObject(repositoryRoot, "HEAD^{commit}")) !== expectedHeadSha) {
        throw new Error("Git input checkout differs from its requested commit.");
    }
    const status = await git(repositoryRoot, "status", "--porcelain=v1", "--untracked-files=all");
    if (status.length > 0)
        throw new Error("Git input checkout is not clean.");
}
export async function fetchExactGitObject(repositoryRoot, revision) {
    const commit = parseGitObject(revision, "requested commit");
    try {
        if ((await gitObject(repositoryRoot, `${commit}^{commit}`)) === commit)
            return;
    }
    catch {
        // The reusable input checkout does not yet retain this object.
    }
    await git(repositoryRoot, "fetch", "--quiet", "--no-tags", "origin", commit);
    if ((await gitObject(repositoryRoot, `${commit}^{commit}`)) !== commit) {
        throw new Error("Git input fetch did not retain the exact requested commit.");
    }
}
export function readGitObject(repositoryRoot, revision) {
    return gitObject(repositoryRoot, revision);
}
/** Resolve the exact shared comparison ancestor for two retained commits. */
export async function gitComparisonBase(input) {
    const baseRevision = parseGitObject(input.baseRevision, "base commit");
    const headRevision = parseGitObject(input.headRevision, "head commit");
    return parseGitObject(await git(input.repositoryRoot, "merge-base", baseRevision, headRevision), "comparison base");
}
/** Reuse one object database without changing its checkout. */
export async function prepareGitRepositoryObjects(input) {
    if (input.commits.length > 4096)
        throw new Error("Git input fetch exceeds its commit bound.");
    const commits = [
        ...new Set(input.commits.map((commit) => parseGitObject(commit, "requested commit"))),
    ];
    await prepareRepository(input.root, input.remoteUrl);
    if (commits.length === 0)
        return;
    const inventory = (await gitInput(input.root, ["cat-file", "--batch-check=%(objectname) %(objecttype)"], `${commits.map((commit) => `${commit}^{commit}`).join("\n")}\n`, commits.length * 128))
        .toString("utf8")
        .trimEnd()
        .split("\n");
    if (inventory.length !== commits.length)
        throw new Error("Git commit inventory is incomplete.");
    const missing = [];
    for (const [index, commit] of commits.entries()) {
        if (inventory[index] === `${commit}^{commit} missing`)
            missing.push(commit);
        else if (inventory[index] !== `${commit} commit`) {
            throw new Error("Git commit inventory differs from its exact requested inputs.");
        }
    }
    if (missing.length === 0)
        return;
    await git(input.root, "fetch", "--quiet", "--no-tags", "origin", ...missing);
    for (const commit of missing) {
        if ((await gitObject(input.root, `${commit}^{commit}`)) !== commit) {
            throw new Error("Git input fetch did not retain the exact requested commit.");
        }
    }
}
export async function gitBytes(repositoryRoot, ...arguments_) {
    const { stdout } = await execFileAsync("git", [...arguments_], {
        cwd: repositoryRoot,
        encoding: "buffer",
        maxBuffer: 4 * 1024 * 1024,
        timeout: 120_000,
    });
    return stdout;
}
export function gitInput(repositoryRoot, arguments_, input, maximumOutputBytes) {
    return new Promise((resolve, reject) => {
        const child = execFile("git", [...arguments_], {
            cwd: repositoryRoot,
            encoding: "buffer",
            maxBuffer: maximumOutputBytes,
            timeout: 120_000,
        }, (error, stdout) => (error ? reject(error) : resolve(stdout)));
        if (!child.stdin) {
            child.kill();
            reject(new Error("Git input stream is unavailable."));
            return;
        }
        child.stdin.on("error", (error) => {
            child.kill();
            reject(error);
        });
        child.stdin.end(input);
    });
}
async function prepareRepository(root, remoteUrl) {
    if (!(await isGitRepository(root))) {
        await mkdir(root, { recursive: true });
        await git(root, "init", "--quiet");
        await git(root, "remote", "add", "origin", remoteUrl);
    }
    else if ((await git(root, "remote", "get-url", "origin")) !== remoteUrl) {
        throw new Error("Git input repository has a different source remote.");
    }
}
async function gitObject(repositoryRoot, revision) {
    return parseGitObject(await git(repositoryRoot, "rev-parse", "--verify", "--end-of-options", revision), "resolved Git object");
}
async function git(repositoryRoot, ...arguments_) {
    return (await gitBytes(repositoryRoot, ...arguments_)).toString("utf8").trim();
}
function parseGitObject(value, label) {
    if (!/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u.test(value)) {
        throw new Error(`${label} is not an exact Git object ID.`);
    }
    return value;
}
async function isGitRepository(root) {
    try {
        return (await stat(join(root, ".git"))).isDirectory();
    }
    catch (error) {
        if (error.code === "ENOENT")
            return false;
        throw error;
    }
}
//# sourceMappingURL=index.js.map