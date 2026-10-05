/**
 * Where a quote may sit in a text: the one boundary rule for grounding quotes
 * and for cutting reading chunks, and the locator that binds a passage to
 * the exact span of text it copies.
 */
/**
 * Where a text may be cut without splitting what it writes: never inside a
 * word, and never inside a written figure with its currency and unit. The
 * one boundary rule for grounding quotes and for cutting reading chunks.
 */
export declare class TextBoundaries {
    #private;
    constructor(text: string);
    /** Whether a boundary before `text[index]` cuts a word or falls inside a written figure. */
    cuts(index: number): boolean;
}
/**
 * The latest usable cut at or before `index` and after `floor`. Prefer a line
 * break, then whitespace, but never split a word, Unicode character, or
 * written figure with its currency and unit. A character cut is the bounded
 * fallback only when the requested window contains no semantic boundary.
 */
export declare function textCutAtOrBefore(text: string, boundaries: TextBoundaries, index: number, floor: number): number;
export interface LocatedEvidenceQuote {
    /** UTF-8 byte offset of the span. */
    readonly start: number;
    readonly end: number;
    /** The exact span of normalized text. */
    readonly quote: string;
}
/**
 * Binds passages to the exact spans of normalized text they copy. A span must
 * start and end on token boundaries, and never inside a written figure with
 * its currency and unit: one that copies "5%" out of "15%" or "$5,000" out of
 * "C$5,000" copies nothing the page states. The first exact match wins.
 * Otherwise, because HTML normalization puts inline text on separate lines,
 * one whitespace-insensitive character-for-character match is accepted when
 * it is unique. The span, never the passage, becomes the quote. Indexes are
 * built once per text.
 */
export declare class NormalizedTextLocator {
    #private;
    constructor(text: string);
    locate(passage: string): LocatedEvidenceQuote | null;
    /** UTF-8 byte offset of a UTF-16 index into the text. */
    byteOffset(index: number): number;
}
/** A single lookup; readers of one document use a shared `NormalizedTextLocator`. */
export declare function locateNormalizedEvidenceQuote(normalizedText: string, quote: string): LocatedEvidenceQuote | null;
//# sourceMappingURL=locator.d.ts.map