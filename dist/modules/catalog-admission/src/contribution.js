import { YAMLError } from "yaml";
import { ZodError } from "zod";
import { contributionEntityAuthoringSchema } from "../../../contracts/authoring/src/index.js";
import { assertCatalogAuthoringIdentity, assertCatalogTaxonomy, CatalogAuthoringError, } from "../../catalog-authoring-validation/src/index.js";
import { compileAuthoringFiles } from "../../compiler/src/index.js";
/**
 * A pull request its contributor can fix (`revise`), or one admission cannot judge on its own
 * (`person`). It is raised only where a finding is about what the pull request changed; a fault in
 * live state, Git, policy or Sourcey's own derivation stays an ordinary error.
 */
export class CatalogContributionError extends Error {
    route;
    findings;
    name = "CatalogContributionError";
    constructor(route, findings) {
        super(findings
            .map(({ file, field, message }) => [file, field].filter(Boolean).length > 0
            ? `${[file, field].filter(Boolean).join(" ")}: ${message}`
            : message)
            .join(" "));
        this.route = route;
        this.findings = findings;
    }
}
/**
 * Every way the changed files break what a contribution keeps, file by file: each parses on its own
 * as strict authoring, names a canonical category and keeps the public contribution rules; then
 * together they claim no identity twice. Read before anything else depends on them, so one broken
 * file is named rather than failing the whole set.
 */
export async function changedAuthoringFindings(input) {
    const findings = [];
    const entries = [];
    for (const file of input.changedFiles) {
        try {
            const compiled = await compileAuthoringFiles(input.authoringRoot, [file], {
                allowExternalRoleEntities: true,
            });
            assertCatalogTaxonomy(compiled.authoring, input.taxonomy);
            for (const value of compiled.authoring) {
                contributionEntityAuthoringSchema.parse(value);
                entries.push({ source: file, value });
            }
        }
        catch (error) {
            findings.push(...authoringFindings(file, error));
        }
    }
    if (findings.length > 0)
        return findings;
    try {
        assertCatalogAuthoringIdentity(entries, true);
    }
    catch (error) {
        findings.push(...authoringFindings(null, error));
    }
    return findings;
}
/** What one failure says about a changed file, or the failure itself when it is not the file's. */
function authoringFindings(file, error) {
    if (error instanceof ZodError) {
        return error.issues.map((issue) => ({
            file,
            field: issue.path.length > 0 ? fieldPath(issue.path) : null,
            message: issue.message,
        }));
    }
    if (error instanceof YAMLError) {
        return [{ file, field: null, message: `This file is not valid YAML: ${error.message}` }];
    }
    if (error instanceof CatalogAuthoringError) {
        return [{ file: error.source ?? file, field: error.field, message: error.message }];
    }
    throw error;
}
/** `offers[0].title`, as a contributor finds the field in their file. */
function fieldPath(path) {
    return path
        .map((segment, index) => typeof segment === "number" ? `[${segment}]` : `${index === 0 ? "" : "."}${String(segment)}`)
        .join("");
}
//# sourceMappingURL=contribution.js.map