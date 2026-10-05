/**
 * The figures a passage writes, read by one strict grammar so that a value a
 * reader reported can be checked against the passage it cited. The grammar
 * reads amounts in US dollars, euros and pounds (`$`, `US$`, `€`, `£`) or an
 * ISO code, percentages, periods, dates with their year and counts, written
 * with comma thousands and point decimals, each on its own line. Everything
 * else that looks like a figure (another number format, currency, scale word,
 * fraction, range or rate, or a marker on the next line) is unread: it keeps
 * its extent, so no quote can cut a figure out of it, but gives no token, and
 * the text is incomplete. The detector of what is unread is deliberately
 * broad: reading too little only leaves a value unchecked, never admits one.
 * This parses written form; it never judges what a passage means.
 */
export type NumericToken = {
    readonly kind: "money";
    readonly currency: string;
    readonly minorUnits: number;
} | {
    readonly kind: "percentage";
    readonly basisPoints: number;
} | {
    readonly kind: "period";
    readonly iso: string;
} | {
    readonly kind: "date";
    readonly iso: string;
} | {
    readonly kind: "number";
    readonly value: number;
};
/** A figure's exact extent in the text it was read from. */
export interface FigureSpan {
    readonly start: number;
    readonly end: number;
}
/** Everything a text writes as figures. */
export interface WrittenFigures {
    /** Every numeric token, in order of appearance. */
    readonly tokens: readonly NumericToken[];
    /** Names written with digits, such as "H100", "Q3" or "5G": literals a passage must write exactly. */
    readonly identifiers: readonly string[];
    /** False when some figure or quantity word is unread, so not every figure can be checked. */
    readonly complete: boolean;
    /** Where each figure and name is written, markers and units included, in the text's own indexes. */
    readonly spans: readonly FigureSpan[];
}
/** Every numeric token written in `text`, in order of appearance. */
export declare function numericTokens(text: string): readonly NumericToken[];
/** Where every figure in `text` is written, in its own indexes, in order. */
export declare function figureSpans(text: string): readonly FigureSpan[];
/** The minor units of `major` whole units of `currency`. */
export declare function minorUnitsOf(currency: string, major: number): number;
/** Periods compare by the months or days they denote, so P12M equals P1Y. */
export declare function periodsEqual(left: string, right: string): boolean;
export declare function writtenFigures(text: string): WrittenFigures;
//# sourceMappingURL=figures.d.ts.map