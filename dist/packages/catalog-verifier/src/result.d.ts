import { z } from "zod";
import { type CatalogVerifierResult, catalogVerifierDiagnosticSchema } from "../../../contracts/catalog-verifier/src/index.js";
/** A verifier operation's passing result, with what it checked. */
export declare function valid(operation: CatalogVerifierResult["operation"], summary: NonNullable<CatalogVerifierResult["summary"]>): CatalogVerifierResult;
/** A verifier operation's failing result, with its one diagnostic. */
export declare function invalid(operation: CatalogVerifierResult["operation"], diagnostic: z.input<typeof catalogVerifierDiagnosticSchema>): CatalogVerifierResult;
/**
 * What any verifier operation says of an error it has no more specific reading for: a contract
 * the input breaks, or the local environment the run depends on.
 */
export declare function contractDiagnostic(error: unknown, ruleId: string): CatalogVerifierResult["diagnostics"][number];
//# sourceMappingURL=result.d.ts.map