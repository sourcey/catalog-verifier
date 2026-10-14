import { z } from "zod";
import { catalogVerifierDiagnosticSchema, catalogVerifierResultSchema, } from "../../../contracts/catalog-verifier/src/index.js";
/** A verifier operation's passing result, with what it checked. */
export function valid(operation, summary) {
    return catalogVerifierResultSchema.parse({
        result_contract: "sourcey.catalog-verifier-result/v1alpha1",
        operation,
        status: "valid",
        summary,
        diagnostics: [],
    });
}
/** A verifier operation's failing result, with its one diagnostic. */
export function invalid(operation, diagnostic) {
    return catalogVerifierResultSchema.parse({
        result_contract: "sourcey.catalog-verifier-result/v1alpha1",
        operation,
        status: "invalid",
        summary: null,
        diagnostics: [diagnostic],
    });
}
/**
 * What any verifier operation says of an error it has no more specific reading for: a contract
 * the input breaks, or the local environment the run depends on.
 */
export function contractDiagnostic(error, ruleId) {
    if (error instanceof z.ZodError) {
        const issue = error.issues[0];
        return catalogVerifierDiagnosticSchema.parse({
            rule_id: ruleId,
            classification: "contract_failure",
            path: issue ? jsonPointer(issue.path) : null,
            message: issue?.message ?? "Candidate bytes do not satisfy the current contract.",
            guidance: "Correct the exact candidate field and run the same verifier again.",
        });
    }
    const candidate = error;
    const environmental = typeof candidate?.code === "string";
    return catalogVerifierDiagnosticSchema.parse({
        rule_id: ruleId,
        classification: environmental ? "environmental_failure" : "contract_failure",
        path: null,
        message: error instanceof Error ? error.message : String(error),
        guidance: environmental
            ? "Restore the exact local input or Git object and retry without changing candidate bytes."
            : "Correct the candidate closure described by this rule and run the same verifier again.",
    });
}
function jsonPointer(path) {
    if (path.length === 0)
        return "/";
    return `/${path
        .map((segment) => String(segment).replaceAll("~", "~0").replaceAll("/", "~1"))
        .join("/")}`;
}
//# sourceMappingURL=result.js.map