/**
 * What a passage writes, apart from numbers: whether a boundary cuts a word,
 * and whether a literal (a code, a name, a category value) is written in a
 * passage as a whole token. This tests written form only; it never judges
 * what a passage means. Where a written figure begins and ends, currency and
 * unit included, is the number tokenizer's (`figureSpans`).
 */
import { figureSpans } from "./figures.js";
const WORD_CHARACTER = /[\p{L}\p{Nd}\p{M}]/u;
/** Hyphens and dashes of every width, and underscores, join words into one token. */
const JOINER = /[\p{Pd}_]/u;
// Scripts written without spaces between words: a boundary between two of their letters cuts nothing.
const UNSPACED_LETTER = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Thai}\p{Script=Lao}\p{Script=Khmer}\p{Script=Myanmar}]/u;
/** A category value this short is a code ("US", "EU", "B2B"); in lower case it is a word ("us", "in"). */
const CODE_LENGTH = 3;
function isHighSurrogate(unit) {
    return unit >= 0xd800 && unit <= 0xdbff;
}
function isLowSurrogate(unit) {
    return unit >= 0xdc00 && unit <= 0xdfff;
}
/** The character that starts at `index`, whole. */
function characterAt(text, index) {
    const point = index >= 0 && index < text.length ? text.codePointAt(index) : undefined;
    return point === undefined ? "" : String.fromCodePoint(point);
}
/** The character that ends just before `index`, whole. */
function characterBefore(text, index) {
    if (index <= 0 || index > text.length)
        return "";
    const start = index >= 2 &&
        isLowSurrogate(text.charCodeAt(index - 1)) &&
        isHighSurrogate(text.charCodeAt(index - 2))
        ? index - 2
        : index - 1;
    return text.slice(start, index);
}
/**
 * Whether the boundary before `text[index]` falls inside a word, so a span
 * starting or ending there would copy part of one: "STARTUP" out of
 * "STARTUP50", or "15" out of "150". A boundary inside a surrogate pair
 * splits one character, so it always cuts.
 */
export function boundaryCutsToken(text, index) {
    if (index <= 0 || index >= text.length)
        return false;
    if (isLowSurrogate(text.charCodeAt(index)) && isHighSurrogate(text.charCodeAt(index - 1))) {
        return true;
    }
    const left = characterBefore(text, index);
    const right = characterAt(text, index);
    return (WORD_CHARACTER.test(left) &&
        WORD_CHARACTER.test(right) &&
        !(UNSPACED_LETTER.test(left) && UNSPACED_LETTER.test(right)));
}
/** A literal's edge also may not stop at a hyphen, dash or underscore that joins it to more of a token. */
function literalEdgeCuts(text, index) {
    if (boundaryCutsToken(text, index))
        return true;
    const after = characterAt(text, index);
    const before = characterBefore(text, index);
    const joinedAfter = WORD_CHARACTER.test(before) &&
        JOINER.test(after) &&
        WORD_CHARACTER.test(characterAt(text, index + after.length));
    const joinedBefore = WORD_CHARACTER.test(after) &&
        JOINER.test(before) &&
        WORD_CHARACTER.test(characterBefore(text, index - before.length));
    return joinedAfter || joinedBefore;
}
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
export function writtenLiteral(passage, literal, options = {}) {
    const text = passage.normalize("NFKC");
    const needle = literal.normalize("NFKC").trim();
    if (!needle)
        return false;
    const code = options.caseInsensitive === true && [...needle].length <= CODE_LENGTH;
    if (code && needle !== needle.toUpperCase())
        return false;
    const foldCase = options.caseInsensitive === true && !code && !/\p{Lu}/u.test(needle);
    // Normalization puts inline text on separate lines, so any run of whitespace writes a space.
    const pattern = new RegExp(needle
        .split(/\s+/u)
        .map((word) => word.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&"))
        .join(String.raw `\s+`), foldCase ? "giu" : "gu");
    let figures;
    // A literal is never read out of a figure: "US" is not written in "US$5,000".
    const insideFigure = (index) => {
        figures ??= figureSpans(text);
        return figures.some(({ start, end }) => start < index && index < end);
    };
    for (const match of text.matchAll(pattern)) {
        const start = match.index ?? 0;
        const end = start + match[0].length;
        if (literalEdgeCuts(text, start) || literalEdgeCuts(text, end))
            continue;
        if (!insideFigure(start) && !insideFigure(end))
            return true;
    }
    return false;
}
//# sourceMappingURL=written.js.map