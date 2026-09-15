import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";
import { z } from "zod";
import { verifierRepositoryKindSchema, } from "../../../contracts/catalog-verifier/src/index.js";
import { readCatalogTaxonomy } from "../../../modules/catalog-admission/src/index.js";
import { requiredFlag, requiredPath } from "../../../modules/cli/src/index.js";
import { digest } from "../../../modules/primitives/src/index.js";
import { CatalogVerifierApplication } from "./application.js";
const execFileAsync = promisify(execFile);
export async function main(arguments_) {
    try {
        await run(arguments_);
    }
    catch (error) {
        throw catalogVerifierError(error);
    }
}
async function run(arguments_) {
    const [command, ...commandArguments] = arguments_;
    const [subject, ...args] = commandArguments;
    const application = new CatalogVerifierApplication();
    if (command === "validate") {
        const repositoryKind = verifierRepositoryKindSchema.parse(subject);
        const repositoryRoot = requiredPath(args, "--repository");
        const [baseRevision, headRevision, taxonomy] = await Promise.all([
            resolveCatalogVerifierCommit(repositoryRoot, requiredFlag(args, "--base")),
            resolveCatalogVerifierCommit(repositoryRoot, requiredFlag(args, "--head")),
            repositoryKind === "startup-credits"
                ? readCatalogTaxonomy(requiredPath(args, "--taxonomy"))
                : undefined,
        ]);
        const result = await application.validateRepositoryChange({
            repositoryKind,
            repositoryRoot,
            baseRevision,
            headRevision,
            ...(taxonomy ? { taxonomy } : {}),
            candidate: candidateIdentity(repositoryKind, baseRevision, headRevision, args),
            identityContext: {
                packet: await readJson(requiredPath(args, "--identity-context")),
                rootSet: await readJson(requiredPath(args, "--root-set")),
                trustedRootDigest: requiredFlag(args, "--trusted-root-digest"),
                verifiedAt: requiredFlag(args, "--verified-at"),
            },
        });
        renderResult(result, outputFormat(args));
        if (result.status === "invalid")
            process.exitCode = 2;
        return;
    }
    if (command === "identity-context-request") {
        const repositoryKind = verifierRepositoryKindSchema.parse(subject);
        const repositoryRoot = requiredPath(args, "--repository");
        const [baseRevision, headRevision, taxonomy] = await Promise.all([
            resolveCatalogVerifierCommit(repositoryRoot, requiredFlag(args, "--base")),
            resolveCatalogVerifierCommit(repositoryRoot, requiredFlag(args, "--head")),
            repositoryKind === "startup-credits"
                ? readCatalogTaxonomy(requiredPath(args, "--taxonomy"))
                : undefined,
        ]);
        const request = await application.createRepositoryIdentityContextRequest({
            repositoryKind,
            repositoryRoot,
            baseRevision,
            headRevision,
            ...(taxonomy ? { taxonomy } : {}),
            liveParentReleaseId: requiredFlag(args, "--live-parent-release-id"),
            candidate: candidateIdentity(repositoryKind, baseRevision, headRevision, args),
        });
        process.stdout.write(`${JSON.stringify(request)}\n`);
        return;
    }
    if (command === "explain") {
        const repositoryKind = verifierRepositoryKindSchema.parse(subject);
        renderCriteria(application.explain(repositoryKind), outputFormat(args));
        return;
    }
    if (command === "verify-release") {
        if (commandArguments[0] && !commandArguments[0].startsWith("--")) {
            throw new Error("verify-release accepts flags only.");
        }
        const result = await application.verifyRelease({
            directory: requiredPath(commandArguments, "--release"),
            trustedRootDigest: requiredFlag(commandArguments, "--trusted-root-digest"),
        });
        renderResult(result, outputFormat(commandArguments));
        if (result.status === "invalid")
            process.exitCode = 2;
        return;
    }
    throw new Error(usage());
}
function candidateIdentity(repositoryKind, baseRevision, headRevision, args) {
    const repository = optionalFlag(args, "--candidate-repository");
    const pullRequest = optionalFlag(args, "--pull-request");
    if ((repository === undefined) !== (pullRequest === undefined)) {
        throw new Error("--candidate-repository and --pull-request must be supplied together.");
    }
    if (repository && pullRequest) {
        const pullRequestNumber = Number.parseInt(pullRequest, 10);
        if (!Number.isInteger(pullRequestNumber) || pullRequestNumber < 1) {
            throw new Error("--pull-request must be a positive integer.");
        }
        return {
            kind: "git_pull_request",
            repository,
            pullRequestNumber,
            headSha: headRevision,
        };
    }
    const candidateDigest = digest({
        repository_kind: repositoryKind,
        base_revision: baseRevision,
        head_revision: headRevision,
    });
    return {
        kind: "detached",
        repositoryKind,
        candidateDigest,
        candidateReference: candidateDigest,
    };
}
function optionalFlag(args, name) {
    const index = args.indexOf(name);
    if (index < 0)
        return undefined;
    const value = args[index + 1];
    if (!value || value.startsWith("--"))
        throw new Error(`${name} requires a value.`);
    return value;
}
async function readJson(path) {
    return JSON.parse(await readFile(path, "utf8"));
}
export async function resolveCatalogVerifierCommit(repositoryRoot, revision) {
    const { stdout } = await execFileAsync("git", ["rev-parse", "--verify", "--end-of-options", `${revision}^{commit}`], {
        cwd: repositoryRoot,
        encoding: "utf8",
        maxBuffer: 4 * 1024 * 1024,
    });
    const commit = stdout.trim();
    if (!/^[a-f0-9]{40,64}$/u.test(commit)) {
        throw new Error(`Git did not resolve '${revision}' to an exact commit.`);
    }
    return commit;
}
export function catalogVerifierError(error) {
    if (!(error instanceof z.ZodError)) {
        return error instanceof Error ? error : new Error(String(error));
    }
    const issues = error.issues.map((issue) => {
        const path = issue.path.reduce((result, segment) => typeof segment === "number"
            ? `${result}[${segment}]`
            : `${result}${result ? "." : ""}${String(segment)}`, "");
        return `- ${path || "document"}: ${issue.message}`;
    });
    return new Error(`Catalog data is invalid:\n${issues.join("\n")}`);
}
function outputFormat(args) {
    const formatIndex = args.indexOf("--format");
    if (formatIndex < 0)
        return "human";
    const format = args[formatIndex + 1];
    if (format !== "human" && format !== "json") {
        throw new Error("--format must be human or json.");
    }
    return format;
}
function renderResult(result, format) {
    if (format === "json") {
        process.stdout.write(`${JSON.stringify(result)}\n`);
        return;
    }
    if (result.status === "valid") {
        const counts = Object.entries(result.summary ?? {})
            .map(([key, value]) => `${key.replaceAll("_", " ")}: ${value}`)
            .join(", ");
        process.stdout.write(`Sourcey verification passed (${counts}).\n`);
        return;
    }
    for (const diagnostic of result.diagnostics) {
        process.stderr.write(`${diagnostic.rule_id} [${diagnostic.classification}]${diagnostic.path ? ` ${diagnostic.path}` : ""}\n${diagnostic.message}\n${diagnostic.guidance}\n`);
    }
}
function renderCriteria(criteria, format) {
    if (format === "json") {
        process.stdout.write(`${JSON.stringify({ criteria_contract: "sourcey.catalog-verifier-criteria/v1alpha1", criteria })}\n`);
        return;
    }
    for (const criterion of criteria) {
        process.stdout.write(`${criterion.rule_id}\n${criterion.title}: ${criterion.requirement}${criterion.exclusion ? `\nDoes not establish: ${criterion.exclusion}` : ""}\n\n`);
    }
}
function usage() {
    return [
        "Usage:",
        "  sourcey-catalog-verify identity-context-request startup-credits --repository DIR --base COMMIT --head COMMIT --taxonomy FILE --live-parent-release-id DIGEST [--candidate-repository OWNER/REPO --pull-request NUMBER]",
        "  sourcey-catalog-verify identity-context-request agent-readiness --repository DIR --base COMMIT --head COMMIT --live-parent-release-id DIGEST [--candidate-repository OWNER/REPO --pull-request NUMBER]",
        "  sourcey-catalog-verify validate startup-credits --repository DIR --base COMMIT --head COMMIT --taxonomy FILE --identity-context FILE --root-set FILE --trusted-root-digest DIGEST --verified-at INSTANT [--candidate-repository OWNER/REPO --pull-request NUMBER] [--format human|json]",
        "  sourcey-catalog-verify validate agent-readiness --repository DIR --base COMMIT --head COMMIT --identity-context FILE --root-set FILE --trusted-root-digest DIGEST --verified-at INSTANT [--candidate-repository OWNER/REPO --pull-request NUMBER] [--format human|json]",
        "  sourcey-catalog-verify explain startup-credits|agent-readiness [--format human|json]",
        "  sourcey-catalog-verify verify-release --release DIR --trusted-root-digest DIGEST [--format human|json]",
    ].join("\n");
}
//# sourceMappingURL=program.js.map