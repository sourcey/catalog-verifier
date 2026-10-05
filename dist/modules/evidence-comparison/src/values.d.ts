import type { z } from "zod";
import type { cashbackValueSchema, durationValueSchema, eligibilityConditionSchema, moneySchema, moneyValueSchema, percentageValueSchema } from "../../../contracts/revisions/src/index.js";
import { type NumericToken } from "../../evidence-grounding/src/index.js";
export type Money = z.infer<typeof moneySchema>;
export type MoneyValue = z.infer<typeof moneyValueSchema>;
export type PercentageValue = z.infer<typeof percentageValueSchema>;
export type DurationValue = z.infer<typeof durationValueSchema>;
export type CashbackValue = z.infer<typeof cashbackValueSchema>;
export type EligibilityCondition = z.infer<typeof eligibilityConditionSchema>;
export declare function moneyEqual(left: Money, right: Money): boolean;
/** Same bound and same amounts: "up to 5,000" never equals "exactly 5,000" or "up to 25,000". */
export declare function moneyValueEqual(left: MoneyValue, right: MoneyValue): boolean;
export declare function percentageValueEqual(left: PercentageValue, right: PercentageValue): boolean;
export declare function durationValueEqual(left: DurationValue, right: DurationValue): boolean;
export declare function cashbackValueEqual(left: CashbackValue, right: CashbackValue): boolean;
/** The written tokens a typed value needs to be stated by its passages. */
export declare function moneyValueTokens(value: MoneyValue): readonly NumericToken[];
export declare function percentageValueTokens(value: PercentageValue): readonly NumericToken[];
export declare function durationValueTokens(value: DurationValue): readonly NumericToken[];
export declare function cashbackValueTokens(value: CashbackValue): readonly NumericToken[];
/**
 * The figures a numeric or date eligibility condition needs its passage to
 * write, one for each value of a set. A numeric fact's unit comes from its
 * declared suffix in the Catalog vocabulary.
 */
export declare function conditionValueTokens(condition: EligibilityCondition): readonly NumericToken[];
/** The category values a condition names, each of which its passage must write. */
export declare function conditionValueLiterals(condition: EligibilityCondition): readonly string[];
/** True when every required token is written somewhere in the passages. */
export declare function tokensWrittenIn(required: readonly NumericToken[], passages: readonly string[]): boolean;
export declare function tokensEqual(left: NumericToken, right: NumericToken): boolean;
type Operator = EligibilityCondition["operator"];
export interface CanonicalCondition {
    readonly fact: string;
    readonly operator: Operator;
    readonly value: unknown;
}
/**
 * One canonical reading of a condition, optionally negated: `not(lt 5M)` reads
 * as `gte 5M`, a boolean `neq true` reads as `eq false`, and category values
 * compare without case or Unicode form. A predicate's criterion ID and
 * statement are identity and prose, never compared.
 */
export declare function canonicalCondition(condition: EligibilityCondition, negated?: boolean): CanonicalCondition | null;
export declare function conditionsEqual(left: CanonicalCondition | null, right: CanonicalCondition | null): boolean;
/**
 * A stated conflict: the same fact bounded the same way at a different
 * figure, a condition and its exact negation, or a yes/no fact required both
 * ways. Any other difference (an
 * inclusive bound, another category, another set) is a different reading,
 * never evidence against the other.
 */
export declare function conditionsConflict(left: CanonicalCondition | null, right: CanonicalCondition | null): boolean;
/**
 * One resource per URL: for a web URL, scheme, host without `www.`, port,
 * path without a trailing slash, and sorted query; the fragment never names
 * a different resource. Any other URL is its exact form. Relative targets
 * resolve against `base`. Null when the value is not a URL.
 */
export declare function canonicalResourceUrl(value: string, base?: string): string | null;
export declare function sameResource(left: string, right: string): boolean;
export declare function sameOrigin(left: string, right: string): boolean;
/** True for a URL that names an origin itself: the root path, with no query. */
export declare function originRoot(value: string): boolean;
/**
 * Whether a domain is a public suffix, such as `io`, `co.uk` or `github.io`:
 * a namespace many parties register under, which no one vendor can claim.
 */
export declare function domainIsPublicSuffix(domain: string): boolean;
/** A host is the domain itself or one of its subdomains. */
export declare function hostWithinDomain(host: string, domain: string): boolean;
/** Names compare after Unicode, case and spacing normalization only. */
export declare function normalizedName(name: string): string;
export {};
//# sourceMappingURL=values.d.ts.map