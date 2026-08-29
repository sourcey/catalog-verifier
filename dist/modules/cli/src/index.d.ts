/**
 * Argument reading for distribution executables. A CLI module owns only its own
 * flags; the generated root shim owns every process concern, so nothing here
 * touches argv, stdout, or the exit code.
 */
export declare function flag(args: readonly string[], name: string): string | undefined;
export declare function flags(args: readonly string[], name: string): string[];
export declare function requiredFlag(args: readonly string[], name: string): string;
export declare function requiredPath(args: readonly string[], name: string): string;
//# sourceMappingURL=index.d.ts.map