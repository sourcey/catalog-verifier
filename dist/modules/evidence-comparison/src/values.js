import { compareCanonicalStrings } from "provenry/primitives";
import { getPublicSuffix } from "tldts";
import { minorUnitsOf, numericTokens, periodsEqual, } from "../../evidence-grounding/src/index.js";
export function moneyEqual(left, right) {
    return left.currency === right.currency && left.minor_units === right.minor_units;
}
/** Same bound and same amounts: "up to 5,000" never equals "exactly 5,000" or "up to 25,000". */
export function moneyValueEqual(left, right) {
    if (left.kind === "range" || right.kind === "range") {
        return (left.kind === "range" &&
            right.kind === "range" &&
            moneyEqual(left.minimum, right.minimum) &&
            moneyEqual(left.maximum, right.maximum));
    }
    return left.kind === right.kind && moneyEqual(left.amount, right.amount);
}
export function percentageValueEqual(left, right) {
    if (left.kind === "range" || right.kind === "range") {
        return (left.kind === "range" &&
            right.kind === "range" &&
            left.minimum_basis_points === right.minimum_basis_points &&
            left.maximum_basis_points === right.maximum_basis_points);
    }
    return left.kind === right.kind && left.basis_points === right.basis_points;
}
export function durationValueEqual(left, right) {
    return left.kind === right.kind && periodsEqual(left.value, right.value);
}
export function cashbackValueEqual(left, right) {
    if (left.kind === "money" && right.kind === "money")
        return moneyValueEqual(left.value, right.value);
    if (left.kind === "percentage" && right.kind === "percentage") {
        return percentageValueEqual(left.value, right.value);
    }
    return false;
}
/** The written tokens a typed value needs to be stated by its passages. */
export function moneyValueTokens(value) {
    const amounts = value.kind === "range" ? [value.minimum, value.maximum] : [value.amount];
    return amounts.map(({ currency, minor_units: minorUnits }) => ({
        kind: "money",
        currency,
        minorUnits,
    }));
}
export function percentageValueTokens(value) {
    const points = value.kind === "range"
        ? [value.minimum_basis_points, value.maximum_basis_points]
        : [value.basis_points];
    return points.map((basisPoints) => ({ kind: "percentage", basisPoints }));
}
export function durationValueTokens(value) {
    return [{ kind: "period", iso: value.value }];
}
export function cashbackValueTokens(value) {
    return value.kind === "money"
        ? moneyValueTokens(value.value)
        : percentageValueTokens(value.value);
}
/**
 * The figures a numeric or date eligibility condition needs its passage to
 * write, one for each value of a set. A numeric fact's unit comes from its
 * declared suffix in the Catalog vocabulary.
 */
export function conditionValueTokens(condition) {
    if (!("value" in condition))
        return [];
    const { fact, value } = condition;
    if (value.type === "date")
        return [{ kind: "date", iso: value.value }];
    if (value.type === "number")
        return [factFigure(fact, value.value)];
    if (value.type === "number-set")
        return value.values.map((figure) => factFigure(fact, figure));
    return [];
}
/** The category values a condition names, each of which its passage must write. */
export function conditionValueLiterals(condition) {
    if (!("value" in condition))
        return [];
    const { value } = condition;
    if (value.type === "string")
        return [value.value];
    if (value.type === "string-set")
        return value.values;
    return [];
}
function factFigure(fact, value) {
    if (fact.endsWith("_usd"))
        return { kind: "money", currency: "USD", minorUnits: minorUnitsOf("USD", value) };
    if (fact.endsWith("_months"))
        return { kind: "period", iso: `P${value}M` };
    if (fact.endsWith("_years"))
        return { kind: "period", iso: `P${value}Y` };
    if (fact.endsWith("_days"))
        return { kind: "period", iso: `P${value}D` };
    return { kind: "number", value };
}
/** True when every required token is written somewhere in the passages. */
export function tokensWrittenIn(required, passages) {
    const written = passages.flatMap((passage) => numericTokens(passage));
    return required.every((token) => written.some((candidate) => tokensEqual(token, candidate)));
}
export function tokensEqual(left, right) {
    switch (left.kind) {
        case "money":
            return (right.kind === "money" &&
                right.currency === left.currency &&
                right.minorUnits === left.minorUnits);
        case "percentage":
            return right.kind === "percentage" && right.basisPoints === left.basisPoints;
        case "period":
            return right.kind === "period" && periodsEqual(left.iso, right.iso);
        case "date":
            return right.kind === "date" && right.iso === left.iso;
        default:
            return right.kind === "number" && right.value === left.value;
    }
}
const NEGATED_OPERATOR = {
    lt: "gte",
    lte: "gt",
    gt: "lte",
    gte: "lt",
    eq: "neq",
    neq: "eq",
    present: "absent",
    absent: "present",
};
/**
 * One canonical reading of a condition, optionally negated: `not(lt 5M)` reads
 * as `gte 5M`, a boolean `neq true` reads as `eq false`, and category values
 * compare without case or Unicode form. A predicate's criterion ID and
 * statement are identity and prose, never compared.
 */
export function canonicalCondition(condition, negated = false) {
    let operator = condition.operator;
    if (negated) {
        const flipped = NEGATED_OPERATOR[operator];
        if (!flipped)
            return null;
        operator = flipped;
    }
    let value = "value" in condition ? condition.value : null;
    if ((operator === "eq" || operator === "neq") &&
        typeof value === "object" &&
        value !== null &&
        "type" in value &&
        value.type === "boolean" &&
        "value" in value) {
        value = { type: "boolean", value: operator === "eq" ? value.value : !value.value };
        operator = "eq";
    }
    if (typeof value === "object" && value !== null && "type" in value) {
        if (value.type === "string" && "value" in value && typeof value.value === "string") {
            value = { type: "string", value: categoryValue(value.value) };
        }
        else if (value.type === "string-set" && "values" in value) {
            const values = value.values.map(categoryValue);
            value = { type: "string-set", values: [...new Set(values)].sort(compareCanonicalStrings) };
        }
        else if (value.type === "number-set" && "values" in value) {
            const values = [...new Set(value.values)].sort((a, b) => a - b);
            value = { type: "number-set", values };
        }
        else if ((value.type === "number" || value.type === "date") && "value" in value) {
            // Rebuilt in one key order, so equality never depends on how the value was written.
            value = { type: value.type, value: value.value };
        }
    }
    return { fact: condition.fact, operator, value };
}
function categoryValue(value) {
    return value.normalize("NFKC").toLowerCase().replace(/\s+/gu, " ").trim();
}
export function conditionsEqual(left, right) {
    return (left !== null &&
        right !== null &&
        left.fact === right.fact &&
        left.operator === right.operator &&
        JSON.stringify(left.value) === JSON.stringify(right.value));
}
/**
 * A stated conflict: the same fact bounded the same way at a different
 * figure, a condition and its exact negation, or a yes/no fact required both
 * ways. Any other difference (an
 * inclusive bound, another category, another set) is a different reading,
 * never evidence against the other.
 */
export function conditionsConflict(left, right) {
    if (left === null || right === null || left.fact !== right.fact)
        return false;
    if (conditionsEqual(left, right))
        return false;
    // One condition that is exactly the other's negation (`gte 5M` against `lt 5M`) is a conflict.
    if (NEGATED_OPERATOR[left.operator] === right.operator &&
        JSON.stringify(left.value) === JSON.stringify(right.value)) {
        return true;
    }
    if (left.operator !== right.operator)
        return false;
    const a = left.value;
    const b = right.value;
    if (a?.type !== b?.type || a?.value === b?.value)
        return false;
    if (["lt", "lte", "gt", "gte"].includes(left.operator)) {
        return a?.type === "number" || a?.type === "date";
    }
    return left.operator === "eq" && a?.type === "boolean";
}
/**
 * One resource per URL: for a web URL, scheme, host without `www.`, port,
 * path without a trailing slash, and sorted query; the fragment never names
 * a different resource. Any other URL is its exact form. Relative targets
 * resolve against `base`. Null when the value is not a URL.
 */
export function canonicalResourceUrl(value, base) {
    let url;
    try {
        url = new URL(value, base);
    }
    catch {
        return null;
    }
    if (!WEB_PROTOCOLS.has(url.protocol))
        return url.href;
    const host = url.hostname
        .toLowerCase()
        .replace(/\.$/u, "")
        .replace(/^www\./u, "");
    const path = url.pathname.replace(/\/+$/u, "") || "/";
    const query = [...url.searchParams.entries()].sort(([left], [right]) => compareCanonicalStrings(left, right));
    const port = url.port ? `:${url.port}` : "";
    return `${url.protocol}//${host}${port}${path}?${new URLSearchParams(query).toString()}`;
}
export function sameResource(left, right) {
    const canonical = canonicalResourceUrl(left);
    return canonical !== null && canonical === canonicalResourceUrl(right);
}
const WEB_PROTOCOLS = new Set(["http:", "https:"]);
/** Scheme and host without `www.`: the origin a web URL belongs to, or null for anything else. */
function canonicalOrigin(value) {
    let url;
    try {
        url = new URL(value);
    }
    catch {
        return null;
    }
    if (!WEB_PROTOCOLS.has(url.protocol))
        return null;
    return `${url.protocol}//${url.hostname
        .toLowerCase()
        .replace(/\.$/u, "")
        .replace(/^www\./u, "")}${url.port ? `:${url.port}` : ""}`;
}
export function sameOrigin(left, right) {
    const origin = canonicalOrigin(left);
    return origin !== null && origin === canonicalOrigin(right);
}
/** True for a URL that names an origin itself: the root path, with no query. */
export function originRoot(value) {
    return canonicalResourceUrl(value)?.endsWith("/?") === true;
}
/**
 * Whether a domain is a public suffix, such as `io`, `co.uk` or `github.io`:
 * a namespace many parties register under, which no one vendor can claim.
 */
export function domainIsPublicSuffix(domain) {
    const normalized = domain.toLowerCase().replace(/\.$/u, "");
    return getPublicSuffix(normalized, { allowPrivateDomains: true }) === normalized;
}
/** A host is the domain itself or one of its subdomains. */
export function hostWithinDomain(host, domain) {
    const normalizedHost = host.toLowerCase().replace(/\.$/u, "");
    const normalizedDomain = domain.toLowerCase().replace(/\.$/u, "");
    return normalizedHost === normalizedDomain || normalizedHost.endsWith(`.${normalizedDomain}`);
}
/** Names compare after Unicode, case and spacing normalization only. */
export function normalizedName(name) {
    return name.normalize("NFKC").toLowerCase().replace(/\s+/gu, " ").trim();
}
//# sourceMappingURL=values.js.map