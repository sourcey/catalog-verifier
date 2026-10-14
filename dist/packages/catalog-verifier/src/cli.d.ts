import type { CatalogVerifierResult } from "../../../contracts/catalog-verifier/src/index.js";
/** Every verifier command's error, with a contract failure named field by field. */
export declare function catalogVerifierError(error: unknown): Error;
/** The output format a command was asked for: human-readable unless `--format json`. */
export declare function outputFormat(args: readonly string[]): "human" | "json";
/** Write a verifier result: JSON as-is, or one passing line, or each diagnostic. */
export declare function renderResult(result: CatalogVerifierResult, format: "human" | "json"): void;
//# sourceMappingURL=cli.d.ts.map