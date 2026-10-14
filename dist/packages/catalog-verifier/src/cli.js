import { z } from "zod";
/** Every verifier command's error, with a contract failure named field by field. */
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
/** The output format a command was asked for: human-readable unless `--format json`. */
export function outputFormat(args) {
    const formatIndex = args.indexOf("--format");
    if (formatIndex < 0)
        return "human";
    const format = args[formatIndex + 1];
    if (format !== "human" && format !== "json") {
        throw new Error("--format must be human or json.");
    }
    return format;
}
/** Write a verifier result: JSON as-is, or one passing line, or each diagnostic. */
export function renderResult(result, format) {
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
//# sourceMappingURL=cli.js.map