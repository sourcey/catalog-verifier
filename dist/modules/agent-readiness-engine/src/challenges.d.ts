/** One authentication challenge: its scheme, lower-cased, and its parameters by lower-cased name. */
export interface Challenge {
    readonly scheme: string;
    readonly params: Readonly<Record<string, string>>;
}
/**
 * The challenges a `WWW-Authenticate` value carries, as RFC 9110 §11.6.1
 * writes them: comma-separated, each a scheme followed by `name=value`
 * parameters (a value a token or a quoted string) or a token68. A parameter
 * before any scheme belongs to no challenge and is dropped.
 */
export declare function parseChallenges(header: string): readonly Challenge[];
//# sourceMappingURL=challenges.d.ts.map