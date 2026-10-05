/**
 * What a passage writes, apart from numbers: whether a boundary cuts a word,
 * and whether a literal (a code, a name, a category value) is written in a
 * passage as a whole token. This tests written form only; it never judges
 * what a passage means. Where a written figure begins and ends, currency and
 * unit included, is the number tokenizer's (`figureSpans`).
 */
/**
 * Whether the boundary before `text[index]` falls inside a word, so a span
 * starting or ending there would copy part of one: "STARTUP" out of
 * "STARTUP50", or "15" out of "150". A boundary inside a surrogate pair
 * splits one character, so it always cuts.
 */
export declare function boundaryCutsToken(text: string, index: number): boolean;
/**
 * Whether `literal` is written in `passage` as a whole token: an occurrence
 * whose edges cut no word and stop at no joining hyphen, dash or underscore,
 * so "STARTUP" is not written in "STARTUP-2025" and "seed" not in "pre-seed"
 * or "pre‑seed". A category value in lower case matches regardless of case,
 * since pages capitalize freely; any literal with a capital must match
 * exactly. A category value of at most three characters is a code, written
 * in capitals and matched exactly, so "us" or "in" never write "US" or "IN"
 * and no code is read out of an ordinary word, nor any literal out of a
 * figure.
 */
export declare function writtenLiteral(passage: string, literal: string, options?: {
    readonly caseInsensitive?: boolean;
}): boolean;
//# sourceMappingURL=written.d.ts.map