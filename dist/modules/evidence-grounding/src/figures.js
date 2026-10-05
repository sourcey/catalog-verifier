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
/** ISO 4217 minor-unit exponents other than two. */
const CURRENCY_EXPONENT = {
    BHD: 3,
    CLP: 0,
    ISK: 0,
    JOD: 3,
    JPY: 0,
    KRW: 0,
    KWD: 3,
    OMR: 3,
    TND: 3,
    VND: 0,
};
/** The symbols the grammar reads, each naming one currency. */
const SYMBOLS = { US$: "USD", $: "USD", "€": "EUR", "£": "GBP" };
/** ISO 4217 codes; a code that is also an English word never reads as money ("TOP 10"). */
const SUPPORTED_CURRENCIES = new Set(Intl.supportedValuesOf("currency"));
const WORD_CODES = new Set(["ALL", "BOB", "CUP", "GEL", "MAD", "MOP", "PEN", "SOS", "TOP", "TRY"]);
const MULTIPLIERS = {
    k: 1_000,
    K: 1_000,
    M: 1_000_000,
    B: 1_000_000_000,
    bn: 1_000_000_000,
    mn: 1_000_000,
    thousand: 1_000,
    million: 1_000_000,
    billion: 1_000_000_000,
};
/** Glued letters read as a multiplier ("10k", "$1.5M"); the words may also stand one space apart. */
const MULTIPLIER = /^(?:(k|K|M|B|bn|mn)|[ \t]?(thousand|million|billion))(?![\p{L}\p{N}])/u;
const PERIOD_UNITS = {
    day: "D",
    days: "D",
    week: "W",
    weeks: "W",
    month: "M",
    months: "M",
    mo: "M",
    mos: "M",
    year: "Y",
    years: "Y",
    yr: "Y",
    yrs: "Y",
};
const UNIT = Object.keys(PERIOD_UNITS).join("|");
const PERIOD_AFTER = new RegExp(String.raw `^[ \t-]?(${UNIT})(?![\p{L}\p{N}])`, "iu");
const PERCENT_AFTER = /^[ \t]?(?:%|percent(?![\p{L}])|per[ \t]?cent(?![\p{L}]))/iu;
/**
 * Words that can change what a figure beside them means, in any language: a
 * currency, a scale, a letter currency, a nationality or a fraction the
 * grammar does not read. Broad by design: one beside a figure leaves it
 * unread, which can only leave a value unchecked.
 */
const MARKER_WORD = /^(?:dollars?|d[oó]lar(?:es)?|dollari?|euros?|pounds?|sterling|yen|yuan|renminbi|rmb|rs|rp|rm|rupees?|rupias?|rupiahs?|pesos?|reais|real|rand|won|ringgits?|baht|dong|liras?|lire|francs?|kron(?:a|e|or|er)|zlot(?:y|ys|ych)|forints?|korun(?:a|y)|shekels?|dirhams?|riyals?|nairas?|cedis?|shillings?|thousands|millions|billions|trillions?|lakhs?|lacs?|crores?|crs?|mil|mill|mln|mio|mrd|bln|tsd|millionen|milliarden|mill[oó]n(?:es)?|milh(?:ão|ões)|milion[ei]|milliards?|miliar|juta|ribu|тыс|млн|млрд|руб\p{L}*|canadian|australian|mexican|jamaican|canadien\p{L}*|australien\p{L}*|am[ée]ricain\p{L}*|estadounidense\p{L}*|canadiense\p{L}*|australian[oa]s?|mexican[oa]s?|americano\p{L}*|half|halves|quarters?|thirds?|[万萬億亿千百円元圆원만억천]|लाख|करोड़)$/iu;
/** Country prefixes that make a dollar sign another country's: "AU $", "$5,000 CDN". */
const COUNTRY_PREFIXES = new Set("US USA AU AUS CA CAN CDN NZ HK SG NT MX RD CN UK EU".split(" "));
const MONTHS = {
    january: 1,
    jan: 1,
    february: 2,
    feb: 2,
    march: 3,
    mar: 3,
    april: 4,
    apr: 4,
    may: 5,
    june: 6,
    jun: 6,
    july: 7,
    jul: 7,
    august: 8,
    aug: 8,
    september: 9,
    sept: 9,
    sep: 9,
    october: 10,
    oct: 10,
    november: 11,
    nov: 11,
    december: 12,
    dec: 12,
};
/** Figures written as words. */
const NUMBER_WORDS = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
};
const SCALE_WORDS = {
    hundred: 100,
    thousand: 1_000,
    million: 1_000_000,
    billion: 1_000_000_000,
};
/**
 * Words that write a quantity the grammar does not value: a number word that
 * is not one figure ("two three"), a magnitude, multiple, fraction or long
 * period ("thousands", "twice", "half", "a dozen", "a decade"). "one" is left
 * out, since it is prose far more often, and so is "third" ("third-party").
 */
const UNVALUED_WORDS = new Set([
    ...Object.keys(NUMBER_WORDS).filter((word) => word !== "one"),
    ...Object.keys(SCALE_WORDS),
    ...Object.keys(SCALE_WORDS).map((word) => `${word}s`),
    ..."tens half halves quarter quarters thirds double twice triple thrice quadruple dozen dozens".split(" "),
    ..."fortnight fortnights decade decades century centuries semester semesters biennium".split(" "),
]);
const longestFirst = (words) => [...words].sort((left, right) => right.length - left.length).join("|");
const NUMBER = /(?<![\p{N}])(?:\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?)(?![\p{N}])/gu;
const WORD = longestFirst([...Object.keys(NUMBER_WORDS), ...Object.keys(SCALE_WORDS)]);
const SCALE = longestFirst(Object.keys(SCALE_WORDS));
// An article counts one only before a scale word ("a million"); "a six-month trial" is six.
const WORD_FIGURE = new RegExp(String.raw `(?<![\p{L}-])(?:an?[ \t-]+(?=(?:${SCALE})(?![\p{L}])))?(?:${WORD})(?:[ \t-]+(?:and[ \t-]+)?(?:${WORD}))*(?![\p{L}])`, "giu");
/** "a year", "an extra month" is not one: only an article or "first" right before a singular unit counts. */
const ARTICLE_PERIOD = /(?<![\p{L}-])(a|an|first)[ \t-]+(day|week|month|mo|year|yr)(?![\p{L}\p{N}])/giu;
const FRACTION = "half|halves|quarters?|thirds?";
const FRACTION_BEFORE = new RegExp(String.raw `(?<![\p{L}])(?:${FRACTION})\s+(?:(?:of|an?)\s+)*$`, "iu");
const FRACTION_AFTER = new RegExp(String.raw `^\s+and\s+(?:an?\s+)?(?:${FRACTION})(?![\p{L}-])`, "iu");
const UNVALUED_WORD = new RegExp(String.raw `(?<![\p{L}])(?:${longestFirst([...UNVALUED_WORDS])})(?![\p{L}])`, "giu");
// A period unit counted by no figure states a period the text does not value ("for months"),
// unless it names a rate ("per month", "/year").
const PERIOD_WORD = new RegExp(String.raw `(?<![\p{L}])((?:per|each|every)[ \t]+|\/[ \t]?)?(?:${UNIT})(?![\p{L}])`, "giu");
const HALF_PRICE = /(?<![\p{L}-])half[ \t-]+(?:price|priced|off)(?![\p{L}])/giu;
const MONTH = longestFirst(Object.keys(MONTHS));
const ORDINAL = "(?:st|nd|rd|th)?";
const ISO_DATE = /(?<![\p{N}-])(\d{4})-(\d{2})-(\d{2})(?![\p{N}])/gu;
const MONTH_FIRST_DATE = new RegExp(String.raw `(?<![\p{L}])(${MONTH})\.?[ \t]+(\d{1,2})${ORDINAL},?[ \t]+(\d{4})(?![\p{N}])`, "giu");
const DAY_FIRST_DATE = new RegExp(String.raw `(?<![\p{N}])(\d{1,2})${ORDINAL}[ \t]+(?:of[ \t]+)?(${MONTH})\.?,?[ \t]+(\d{4})(?![\p{N}])`, "giu");
/** What joins digits into one written figure the grammar reads whole or not at all. */
const JOINER = /[.,'’/⁄:-]/u;
/** What after a space continues the figure before it: a group of three digits, or a fraction. */
const SPACE_GROUP = /^(?:\d{3}(?!\d)|\d+[/⁄]\d)/u;
/** Superscript and subscript digits: footnote marks after words, part of a figure beside one. */
const MARK_DIGIT = /[²³¹⁰-⁹₀-₉]/u;
const OTHER_FRACTION = /[¼-¾⅐-⅞↉⁄]/u;
const UNREAD_MARK = "\u0000";
/** A frequency or fraction before an article makes "a year" a rate or a fraction: "once a year", "half a year". */
const BEFORE_ARTICLE = new RegExp(String.raw `(?:(?<![\p{L}])(once|twice|thrice|times|half|halves|quarters?|thirds?)|(${UNREAD_MARK}))\s+(?:of\s+)?$`, "iu");
const LETTER = /\p{L}/u;
const ALPHANUMERIC = /[\p{L}\p{N}]/u;
const DIGIT = /\p{N}/u;
/** Every numeric token written in `text`, in order of appearance. */
export function numericTokens(text) {
    return writtenFigures(text).tokens;
}
/** Where every figure in `text` is written, in its own indexes, in order. */
export function figureSpans(text) {
    return writtenFigures(text).spans;
}
/** The minor units of `major` whole units of `currency`. */
export function minorUnitsOf(currency, major) {
    return Math.round(major * 10 ** (CURRENCY_EXPONENT[currency] ?? 2));
}
/** Periods compare by the months or days they denote, so P12M equals P1Y. */
export function periodsEqual(left, right) {
    const a = periodLength(left);
    const b = periodLength(right);
    return a !== null && b !== null && a.unit === b.unit && a.value === b.value;
}
export function writtenFigures(text) {
    const { source, origins } = foldedSource(text);
    const figures = [];
    const identifiers = [];
    const read = new Uint8Array(source.length + 1);
    const figure = (at, end, token) => {
        figures.push({ at, end, token });
        read.fill(1, at, end);
    };
    const name = (at, from) => {
        let end = from;
        while (end < source.length && ALPHANUMERIC.test(source[end]))
            end += 1;
        identifiers.push({ at, end, text: source.slice(at, end) });
        read.fill(1, at, end);
        return end;
    };
    for (const date of writtenDates(source))
        figure(date.at, date.end, date.token);
    for (const match of source.matchAll(NUMBER)) {
        const start = match.index ?? 0;
        const end = start + match[0].length;
        if (read[start] === 1)
            continue;
        let lettersStart = start;
        while (lettersStart > 0 && LETTER.test(source[lettersStart - 1]))
            lettersStart -= 1;
        const letters = source.slice(lettersStart, start);
        if (letters && !isCurrencyCode(letters)) {
            // Digits glued to letters that name no currency are part of a name: "H100", "Q3", "A320".
            name(lettersStart, end);
            continue;
        }
        const run = figureRun(source, start, end);
        if (run.at < start || run.end > end) {
            // The figure goes on past what the grammar reads ("1/2", "5.000", "20,00,000"): unread.
            figure(run.at, run.end, null);
            continue;
        }
        const reading = readFigure(source, start, end, match[0]);
        if (reading === "name") {
            name(start, end);
            continue;
        }
        figure(reading.at, reading.end, reading.token);
    }
    for (const match of source.matchAll(WORD_FIGURE)) {
        for (const segment of wordSegments(match[0], match.index ?? 0)) {
            if (read[segment.start] === 1)
                continue;
            const value = wordNumber(segment.words);
            if (value === null)
                continue;
            const scaled = segment.words.some((word) => SCALE_WORDS[word] !== undefined);
            const unit = unitAfter(source, segment.start, segment.end, value, scaled);
            if (unit !== "name" && (scaled || unit.token?.kind !== "number" || unit.end > segment.end)) {
                figure(unit.at, unit.end, unit.token);
            }
            else if (!(segment.words.length === 1 && segment.words[0] === "one")) {
                // A counted quantity ("seven providers") is a number; "one of our partners" is prose.
                figure(segment.start, segment.end, { kind: "number", value });
            }
        }
    }
    for (const match of source.matchAll(HALF_PRICE)) {
        const at = match.index ?? 0;
        figure(at, at + match[0].length, { kind: "percentage", basisPoints: 5_000 });
    }
    const rates = articlePeriods(source, figures, figure);
    unreadFractions(source, figures);
    unreadRanges(source, figures);
    // A digit no figure, date or name read is unread, with the whole figure it is written in.
    for (let index = 0; index < source.length; index += 1) {
        if (read[index] === 1 || !DIGIT.test(source[index]))
            continue;
        const run = figureRun(source, index, index + 1);
        figure(run.at, run.end, null);
    }
    const tokens = figures
        .filter((candidate) => candidate.token !== null)
        .sort((left, right) => left.at - right.at);
    let complete = tokens.length === figures.length && !source.includes(UNREAD_MARK);
    const covered = new Uint8Array(source.length + 1);
    for (const { at, end } of [...tokens, ...rates])
        covered.fill(1, at, end);
    for (const match of source.matchAll(UNVALUED_WORD)) {
        if (covered[match.index ?? 0] !== 1)
            complete = false;
    }
    for (const match of source.matchAll(PERIOD_WORD)) {
        if (match[1] === undefined && covered[match.index ?? 0] !== 1)
            complete = false;
    }
    return {
        tokens: tokens.map(({ token }) => token),
        identifiers: identifiers.map(({ text: identifier }) => identifier),
        complete,
        spans: [...figures, ...rates, ...identifiers]
            .map(({ at, end }) => ({ start: origins[at], end: origins[end] }))
            .sort((left, right) => left.start - right.start || left.end - right.end),
    };
}
/**
 * The figure written from `[start, end)` with its markers and unit, or
 * "name" when letters glued after it make it part of one ("5G", "10x").
 */
function readFigure(source, start, end, written) {
    // A point before exactly three digits groups thousands in some locales ("5.000 €") and ends a
    // decimal in others ("$1.008"); a figure starting after a point continues one ("Rs.5", ".5").
    const unreadable = /^\d+\.\d{3}$/u.test(written) || source[start - 1] === ".";
    const multiplier = MULTIPLIER.exec(source.slice(end, end + 12));
    const numberEnd = end + (multiplier?.[0].length ?? 0);
    const factor = multiplier ? (MULTIPLIERS[multiplier[1] ?? multiplier[2] ?? ""] ?? 1) : 1;
    const value = Number(written.replaceAll(",", "")) * factor;
    const unit = unitAfter(source, start, numberEnd, value, multiplier !== null);
    if (unit === "name")
        return "name";
    // An unread figure after a point keeps the point in its extent, so no quote takes "5%" from ".5%".
    const at = source[start - 1] === "." ? Math.min(unit.at, start - 1) : unit.at;
    return unreadable || !Number.isFinite(value) ? { ...unit, at, token: null } : unit;
}
/**
 * The token a figure of `value` at `[start, end)` writes with the markers on
 * its own line: a percent sign, a currency before or after it, or a period
 * unit. Its extent grows over every marker read. The figure is unread when a
 * marker it does not read stands beside it, on its line or at the edge of the
 * next line, or its value is finer than its unit counts.
 */
function unitAfter(source, start, end, value, scaled) {
    const after = source.slice(end, end + 48);
    const before = source.slice(Math.max(0, start - 24), start);
    const unread = (extent) => ({ ...extent, token: null });
    const percent = PERCENT_AFTER.exec(after);
    const prefix = currencyBefore(before);
    const suffix = currencyAfter(after);
    const period = PERIOD_AFTER.exec(after);
    // Letters glued after a figure that no unit reads make it part of a name: "5G", "10x".
    if (!percent && !suffix && !period && LETTER.test(after[0] ?? ""))
        return "name";
    if (percent) {
        const stop = end + percent[0].length;
        const basisPoints = wholeCount(value * 100);
        const widened = beside(source, start, stop);
        return scaled || basisPoints === null || widened
            ? unread(widened ?? { at: start, end: stop })
            : { at: start, end: stop, token: { kind: "percentage", basisPoints } };
    }
    if (prefix || suffix) {
        const at = start - (prefix?.length ?? 0);
        const stop = end + (suffix?.length ?? 0);
        // Every marker must name the one currency: "USD $5,000" is dollars, "$5,000 CAD" is unread,
        // and so is an amount that a period unit also claims ("USD 14 DAYS").
        const named = [prefix, suffix].flatMap((marker) => (marker ? [marker.currency] : []));
        const currency = named.every((candidate) => candidate === named[0]) ? named[0] : null;
        const minorUnits = currency
            ? wholeCount(value * 10 ** (CURRENCY_EXPONENT[currency] ?? 2))
            : null;
        const claimed = suffix ? null : period;
        const widened = beside(source, at, stop + (claimed?.[0].length ?? 0));
        return !currency || minorUnits === null || claimed || widened
            ? unread(widened ?? { at, end: stop + (claimed?.[0].length ?? 0) })
            : { at, end: stop, token: { kind: "money", currency, minorUnits } };
    }
    if (period) {
        const stop = end + period[0].length;
        const unit = PERIOD_UNITS[(period[1] ?? "").toLowerCase()];
        const widened = beside(source, start, stop);
        return scaled || !unit || !Number.isInteger(value) || widened
            ? unread(widened ?? { at: start, end: stop })
            : { at: start, end: stop, token: { kind: "period", iso: `P${value}${unit}` } };
    }
    const widened = beside(source, start, end);
    return widened ? unread(widened) : { at: start, end, token: { kind: "number", value } };
}
/**
 * The figure at `[at, end)` widened over what the grammar does not read
 * beside it, or null when nothing stands there. It looks on the figure's own
 * line and at the edge of the next line or the line before, where an inline
 * tag may have split a marker off: a code, country prefix, currency, scale or
 * fraction word, another currency sign or an unreadable fraction, and across
 * a line break also a unit, a percent sign, a multiplier or the rest of a
 * decimal ("$29" / ".99"). The widened extent keeps any quote from taking the
 * figure without it.
 */
function beside(source, at, end) {
    let widened = null;
    const gapAfter = /^[ \t]*(?:\n[ \t]*)?/u.exec(source.slice(end, end + 64))?.[0] ?? "";
    const next = source.slice(end + gapAfter.length, end + gapAfter.length + 32);
    const opened = next.startsWith("(") ? 1 : 0;
    const following = (next[opened] === UNREAD_MARK ? 1 : 0) ||
        markerLength(next.slice(opened)) ||
        (gapAfter === " " ? (/^[kmbl](?![\p{L}])/iu.exec(next)?.[0].length ?? 0) : 0) ||
        (gapAfter.includes("\n")
            ? ((PERIOD_AFTER.exec(next) ??
                PERCENT_AFTER.exec(next) ??
                MULTIPLIER.exec(next) ??
                /^[.,]\p{N}+/u.exec(next))?.[0].length ?? 0)
            : 0);
    if (following > 0)
        widened = { at, end: end + gapAfter.length + opened + following };
    const head = source.slice(Math.max(0, at - 32), at);
    const gapBefore = /(?:[ \t]*\n)?[ \t]*$/u.exec(head)?.[0] ?? "";
    const previous = head.slice(0, head.length - gapBefore.length);
    const token = previous.endsWith(UNREAD_MARK)
        ? UNREAD_MARK
        : /(?:[\p{L}\p{M}]*\p{Sc}|[\p{L}\p{M}]+|[万萬億亿千百円元圆원만억천])\)?:?$/u.exec(previous)?.[0];
    const bare = token?.replace(/[():]/gu, "");
    // A sign glued before a figure, with any letters glued to it, is a compound the grammar does
    // not read ("CA$5,000", "R$5").
    if (bare &&
        (bare === UNREAD_MARK || /\p{Sc}/u.test(bare) || markerLength(bare) === bare.length)) {
        widened = {
            at: at - gapBefore.length - (token?.length ?? 0),
            end: widened?.end ?? end,
        };
    }
    return widened;
}
/** The length of the word or sign starting `text` that can change a figure beside it, or 0. */
function markerLength(text) {
    if (/^\p{Sc}(?![ \t]?\p{N})/u.test(text))
        return 1;
    const code = /^([A-Z]{2,3})(?![\p{L}])/u.exec(text)?.[1];
    if (code)
        return COUNTRY_PREFIXES.has(code) || isCurrencyCode(code) ? code.length : 0;
    const word = /^(?:[\p{L}\p{M}]+|[万萬億亿千百円元圆원만억천])/u.exec(text)?.[0];
    return word !== undefined && MARKER_WORD.test(word) ? word.length : 0;
}
function isCurrencyCode(letters) {
    return (/^[A-Z]{3}$/u.test(letters) && SUPPORTED_CURRENCIES.has(letters) && !WORD_CODES.has(letters));
}
/**
 * The currency written directly before a figure on its line: a read symbol,
 * a code, or a code and a symbol. A word before a symbol that is no code is
 * prose ("AWS $5,000").
 */
function currencyBefore(before) {
    const symbol = /(?<![\p{L}\p{N}\p{Sc}])(US\$|[$€£])[ \t]?$/u.exec(before);
    const rest = symbol ? before.slice(0, before.length - symbol[0].length) : before;
    const code = /(?<![\p{L}\p{N}])([A-Z]{3})[ \t]?$/u.exec(rest);
    const coded = code && isCurrencyCode(code[1]) ? code : null;
    if (!symbol && !coded)
        return null;
    const named = symbol ? (SYMBOLS[symbol[1]] ?? null) : null;
    const currency = coded?.[1] ?? named;
    return {
        currency: coded && named && coded[1] !== named ? null : currency,
        length: (symbol?.[0].length ?? 0) + (coded?.[0].length ?? 0),
    };
}
/** The currency written directly after a figure on its line: a code, "(code)", or a euro or pound sign. */
function currencyAfter(after) {
    const marker = /^[ \t]?(?:(\(?)([A-Z]{3})(\)?)(?![\p{L}])|([€£]))/u.exec(after);
    if (!marker)
        return null;
    const [written, open, code, close, symbol] = marker;
    if (code) {
        return isCurrencyCode(code) && (open === "") === (close === "")
            ? { currency: code, length: written.length }
            : null;
    }
    return { currency: SYMBOLS[symbol] ?? null, length: written.length };
}
/**
 * `scaled` as the whole count it writes, or null when the figure is written
 * finer than its unit counts ("$0.0035", "0.125%").
 */
function wholeCount(scaled) {
    const count = Math.round(scaled);
    return Math.abs(scaled - count) < 1e-6 ? count : null;
}
/**
 * The whole written figure around the digits at `[start, end)`: every digit
 * joined to them by a separator, slash, colon or hyphen, or by a space
 * before a group of exactly three digits ("10 000") or a fraction ("1 1/2").
 */
function figureRun(source, start, end) {
    const joins = (index) => DIGIT.test(source[index - 1] ?? "") &&
        (JOINER.test(source[index] ?? "")
            ? DIGIT.test(source[index + 1] ?? "")
            : source[index] === " " && SPACE_GROUP.test(source.slice(index + 1, index + 8)));
    let at = start;
    while (DIGIT.test(source[at - 1] ?? ""))
        at -= 1;
    while (joins(at - 1)) {
        at -= 1;
        while (DIGIT.test(source[at - 1] ?? ""))
            at -= 1;
    }
    let stop = end;
    while (DIGIT.test(source[stop] ?? ""))
        stop += 1;
    while (joins(stop)) {
        stop += 1;
        while (DIGIT.test(source[stop] ?? ""))
            stop += 1;
    }
    return { at, end: stop };
}
/**
 * "a", "an" and "first" count one period ("a year", "your first month"). A
 * figure, frequency or fraction right before them, even across a line break,
 * makes "a month" a rate ("$100 a month", "once a year") or a fraction ("½ a
 * year"): an amount keeps its token and takes the rate into its extent, a
 * bare figure is unread with it, and a frequency's rate is returned so its
 * unit counts as read.
 */
function articlePeriods(source, figures, figure) {
    const rates = [];
    const endingAt = new Map(figures.map((candidate) => [candidate.end, candidate]));
    for (const match of source.matchAll(ARTICLE_PERIOD)) {
        const at = match.index ?? 0;
        const end = at + match[0].length;
        const head = source.slice(Math.max(0, at - 16), at);
        const gap = /\s+(?:of\s+)?$/iu.exec(head)?.[0].length ?? 0;
        const figureBefore = gap > 0 ? endingAt.get(at - gap) : undefined;
        if (figureBefore) {
            // An amount's rate joins its extent; a bare figure before "a year" is a fraction of it.
            if (figureBefore.token === null || figureBefore.token.kind === "number") {
                figureBefore.token = null;
            }
            figureBefore.end = end;
            continue;
        }
        const lead = BEFORE_ARTICLE.exec(head);
        if (lead) {
            if (/^(?:once|twice|thrice|times)/iu.test(lead[1] ?? ""))
                rates.push({ at, end });
            else
                figure(at - lead[0].length, end, null);
            continue;
        }
        const unit = PERIOD_UNITS[(match[2] ?? "").toLowerCase()];
        if (unit)
            figure(at, end, { kind: "period", iso: `P1${unit}` });
    }
    return rates;
}
/**
 * A fraction word beside a figure changes its value ("half a year", "a year
 * and a half", "5 and a half years", "a quarter of a million"), so the
 * figure is unread, with the words in its extent.
 */
function unreadFractions(source, figures) {
    for (const candidate of figures) {
        const before = FRACTION_BEFORE.exec(source.slice(Math.max(0, candidate.at - 24), candidate.at));
        const after = FRACTION_AFTER.exec(source.slice(candidate.end, candidate.end + 24));
        if (!before && !after)
            continue;
        candidate.token = null;
        candidate.at -= before?.[0].length ?? 0;
        candidate.end += after?.[0].length ?? 0;
    }
}
/**
 * Two figures joined by a range ("5-10k", "$1 to $5 million", "between $1
 * and $5 million") share what only one of them writes, so both are unread,
 * as one extent.
 */
function unreadRanges(source, figures) {
    figures.sort((left, right) => left.at - right.at || left.end - right.end);
    for (let index = 1; index < figures.length; index += 1) {
        const low = figures[index - 1];
        const high = figures[index];
        if (low.end > high.at)
            continue;
        const joiner = source.slice(low.end, high.at);
        const between = /(?<![\p{L}])between\s+$/iu.test(source.slice(Math.max(0, low.at - 12), low.at));
        if (!/^\s*(?:\p{Pd}|to|through|and)\s*$/iu.test(joiner))
            continue;
        if (/and/iu.test(joiner) && !between)
            continue;
        low.token = null;
        high.token = null;
        low.end = high.end;
    }
}
/**
 * The text as the tokenizer reads it, one code point at a time under
 * compatibility folding (so full-width digits and no-break spaces read as
 * their plain forms), and the index in the original text of every character
 * read. A superscript or subscript digit after a word is a footnote mark and
 * reads as a space; beside a figure or a fraction slash it is part of that
 * figure ("$4⁹⁹", "¹⁄₂") and, like every fraction character, unreadable.
 */
function foldedSource(text) {
    const parts = [];
    const origins = [];
    let last = "";
    for (let index = 0; index < text.length;) {
        const character = String.fromCodePoint(text.codePointAt(index));
        const following = String.fromCodePoint(text.codePointAt(index + character.length) ?? 32);
        const folded = MARK_DIGIT.test(character)
            ? DIGIT.test(last) ||
                OTHER_FRACTION.test(last) ||
                last === UNREAD_MARK ||
                OTHER_FRACTION.test(following)
                ? UNREAD_MARK
                : " "
            : OTHER_FRACTION.test(character)
                ? UNREAD_MARK
                : character.normalize("NFKC");
        for (let unit = 0; unit < folded.length; unit += 1)
            origins.push(index);
        parts.push(folded);
        last = folded.at(-1) ?? last;
        index += character.length;
    }
    origins.push(text.length);
    return { source: parts.join(""), origins: Uint32Array.from(origins) };
}
/**
 * Calendar dates written with their year, in ISO, month-first and day-first
 * forms, as tokens. A numeric date in any other form ("05/06/2026",
 * "31-12-2026") is not read: its digits are unread as one figure.
 */
function writtenDates(source) {
    const dates = [];
    const add = (match, year, month, day) => {
        const iso = month === undefined ? null : calendarDate(year, month, day);
        const at = match.index ?? 0;
        if (iso)
            dates.push({ at, end: at + match[0].length, token: { kind: "date", iso } });
    };
    for (const match of source.matchAll(ISO_DATE)) {
        add(match, Number(match[1]), Number(match[2]), Number(match[3]));
    }
    for (const match of source.matchAll(MONTH_FIRST_DATE)) {
        add(match, Number(match[3]), MONTHS[(match[1] ?? "").toLowerCase()], Number(match[2]));
    }
    for (const match of source.matchAll(DAY_FIRST_DATE)) {
        add(match, Number(match[3]), MONTHS[(match[2] ?? "").toLowerCase()], Number(match[1]));
    }
    return dates;
}
function calendarDate(year, month, day) {
    const date = new Date(Date.UTC(year, month - 1, day));
    if (date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month - 1 ||
        date.getUTCDate() !== day) {
        return null;
    }
    return date.toISOString().slice(0, 10);
}
/** A written figure's words split into figures: "one and three years" is two, "one hundred and five" one. */
function wordSegments(written, offset) {
    const segments = [];
    let current;
    for (const match of written.matchAll(/[a-z]+/giu)) {
        const word = (match[0] ?? "").toLowerCase();
        const start = offset + (match.index ?? 0);
        const end = start + word.length;
        const previous = current?.words.at(-1);
        if (word === "and" && (previous === undefined || SCALE_WORDS[previous] === undefined)) {
            if (current)
                segments.push(current);
            current = undefined;
            continue;
        }
        current ??= { words: [], start, end };
        current.words.push(word);
        current.end = end;
    }
    if (current)
        segments.push(current);
    return segments;
}
/** The value of a figure written in words, or null when the words are not one figure. */
function wordNumber(words) {
    let total = 0;
    let current = 0;
    let last = null;
    for (const word of words) {
        if (word === "and") {
            if (last !== "hundred" && last !== "scale")
                return null;
            continue;
        }
        if (word === "a" || word === "an") {
            if (last !== null)
                return null;
            current = 1;
            last = "article";
            continue;
        }
        const scale = SCALE_WORDS[word];
        if (scale !== undefined) {
            if (current === 0)
                return null;
            if (scale === 100) {
                if (current >= 100)
                    return null;
                current *= 100;
                last = "hundred";
            }
            else {
                total += current * scale;
                current = 0;
                last = "scale";
            }
            continue;
        }
        const value = NUMBER_WORDS[word];
        if (value === undefined || last === "article" || last === "unit")
            return null;
        if (last === "tens" && (value >= 10 || value === 0))
            return null;
        current += value;
        last = value >= 20 ? "tens" : "unit";
    }
    return last === "article" ? null : total + current;
}
function periodLength(iso) {
    const match = /^P(\d+(?:\.\d+)?)([DWMY])$/u.exec(iso);
    if (!match)
        return null;
    const count = Number(match[1]);
    switch (match[2]) {
        case "Y":
            return { unit: "months", value: count * 12 };
        case "M":
            return { unit: "months", value: count };
        case "W":
            return { unit: "days", value: count * 7 };
        default:
            return { unit: "days", value: count };
    }
}
//# sourceMappingURL=figures.js.map