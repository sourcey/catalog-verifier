/**
 * Where a quote may sit in a text: the one boundary rule for grounding quotes
 * and for cutting reading chunks, and the locator that binds a passage to
 * the exact span of text it copies.
 */
import { figureSpans } from "./figures.js";
import { boundaryCutsToken } from "./written.js";
/**
 * Where a text may be cut without splitting what it writes: never inside a
 * word, and never inside a written figure with its currency and unit. The
 * one boundary rule for grounding quotes and for cutting reading chunks.
 */
export class TextBoundaries {
    #text;
    #insideFigure;
    constructor(text) {
        this.#text = text;
    }
    /** Whether a boundary before `text[index]` cuts a word or falls inside a written figure. */
    cuts(index) {
        if (boundaryCutsToken(this.#text, index))
            return true;
        if (!this.#insideFigure) {
            const inside = new Uint8Array(this.#text.length + 1);
            for (const { start, end } of figureSpans(this.#text))
                inside.fill(1, start + 1, end);
            this.#insideFigure = inside;
        }
        return this.#insideFigure[index] === 1;
    }
}
/**
 * The latest usable cut at or before `index` and after `floor`. Prefer a line
 * break, then whitespace, but never split a word, Unicode character, or
 * written figure with its currency and unit. A character cut is the bounded
 * fallback only when the requested window contains no semantic boundary.
 */
export function textCutAtOrBefore(text, boundaries, index, floor) {
    const lineBreak = text.lastIndexOf("\n", index - 1);
    if (lineBreak + 1 > floor && !boundaries.cuts(lineBreak + 1))
        return lineBreak + 1;
    for (let at = index; at > floor; at -= 1) {
        if (/\s/u.test(text[at - 1]) && !boundaries.cuts(at))
            return at;
    }
    return isLowSurrogate(text.charCodeAt(index)) ? index - 1 : index;
}
const LONE_SURROGATE = /[\uD800-\uDFFF]/u;
function isLowSurrogate(unit) {
    return unit >= 0xdc00 && unit <= 0xdfff;
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
export class NormalizedTextLocator {
    #text;
    #boundaries;
    #utf8Offsets;
    #compact;
    constructor(text) {
        this.#text = text;
        this.#boundaries = new TextBoundaries(text);
    }
    locate(passage) {
        const normalized = passage.normalize("NFC").trim();
        // Half of a character copies nothing the page writes: decoded text holds whole characters only.
        if (!normalized || LONE_SURROGATE.test(normalized))
            return null;
        for (let exact = this.#text.indexOf(normalized); exact >= 0; exact = this.#text.indexOf(normalized, exact + 1)) {
            if (this.#whole(exact, exact + normalized.length))
                return this.#span(exact, exact + normalized.length);
        }
        const compactPassage = normalized.replace(/\s+/gu, "");
        if (compactPassage.length < 8 || compactPassage === normalized)
            return null;
        const compact = this.#compactIndex();
        let found = null;
        for (let at = compact.text.indexOf(compactPassage); at >= 0; at = compact.text.indexOf(compactPassage, at + 1)) {
            const start = compact.starts[at];
            const end = compact.ends[at + compactPassage.length - 1];
            if (start === undefined || end === undefined || !this.#whole(start, end))
                continue;
            if (found)
                return null;
            found = { start, end };
        }
        if (!found || found.end - found.start > normalized.length * 3 + 32)
            return null;
        return this.#span(found.start, found.end);
    }
    /** Whether a span starts and ends on token boundaries of the text, outside every written figure. */
    #whole(start, end) {
        return !this.#boundaries.cuts(start) && !this.#boundaries.cuts(end);
    }
    /** UTF-8 byte offset of a UTF-16 index into the text. */
    byteOffset(index) {
        this.#utf8Offsets ??= utf8Offsets(this.#text);
        const offset = this.#utf8Offsets[index];
        if (offset === undefined)
            throw new Error("Text index is outside the normalized text.");
        return offset;
    }
    #span(start, end) {
        return {
            start: this.byteOffset(start),
            end: this.byteOffset(end),
            quote: this.#text.slice(start, end),
        };
    }
    #compactIndex() {
        if (this.#compact)
            return this.#compact;
        const text = this.#text;
        const starts = new Uint32Array(text.length);
        const ends = new Uint32Array(text.length);
        let compact = "";
        for (let index = 0; index < text.length;) {
            const character = String.fromCodePoint(text.codePointAt(index));
            const end = index + character.length;
            if (!/\s/u.test(character)) {
                for (let unit = 0; unit < character.length; unit += 1) {
                    starts[compact.length + unit] = index;
                    ends[compact.length + unit] = end;
                }
                compact += character;
            }
            index = end;
        }
        this.#compact = { text: compact, starts, ends };
        return this.#compact;
    }
}
/** A single lookup; readers of one document use a shared `NormalizedTextLocator`. */
export function locateNormalizedEvidenceQuote(normalizedText, quote) {
    return new NormalizedTextLocator(normalizedText).locate(quote);
}
function utf8Offsets(text) {
    const offsets = new Uint32Array(text.length + 1);
    let bytes = 0;
    for (let index = 0; index < text.length; index += 1) {
        offsets[index] = bytes;
        const unit = text.charCodeAt(index);
        if (unit < 0x80)
            bytes += 1;
        else if (unit < 0x800)
            bytes += 2;
        else if (unit >= 0xd800 && unit <= 0xdbff)
            bytes += 4;
        else if (unit < 0xdc00 || unit > 0xdfff)
            bytes += 3;
    }
    offsets[text.length] = bytes;
    return offsets;
}
//# sourceMappingURL=locator.js.map