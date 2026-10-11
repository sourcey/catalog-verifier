const TOKEN = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+/u;
/**
 * The challenges a `WWW-Authenticate` value carries, as RFC 9110 §11.6.1
 * writes them: comma-separated, each a scheme followed by `name=value`
 * parameters (a value a token or a quoted string) or a token68. A parameter
 * before any scheme belongs to no challenge and is dropped.
 */
export function parseChallenges(header) {
    const challenges = [];
    let rest = header;
    const skip = (pattern) => {
        rest = rest.replace(pattern, "");
    };
    while (rest.length > 0) {
        skip(/^[\s,]+/u);
        const token = TOKEN.exec(rest)?.[0];
        if (!token)
            break;
        rest = rest.slice(token.length);
        skip(/^\s*/u);
        if (rest.startsWith("=") && !rest.startsWith("==")) {
            // A parameter: of the challenge open now, or of none.
            rest = rest.slice(1);
            skip(/^\s*/u);
            const value = readValue();
            const open = challenges.at(-1);
            if (open && value !== null)
                open.params[token.toLowerCase()] = value;
            continue;
        }
        const challenge = { scheme: token.toLowerCase(), params: {} };
        challenges.push(challenge);
        // A token68 directly after the scheme, such as `Basic dXNlcjpwYXNz`.
        const token68 = /^[A-Za-z0-9._~+/-]+=*(?=\s*(?:,|$))/u.exec(rest)?.[0];
        if (token68 && !/^[!#$%&'*+.^_`|~0-9A-Za-z-]+\s*=[^=]/u.test(rest)) {
            rest = rest.slice(token68.length);
        }
    }
    return challenges;
    function readValue() {
        if (rest.startsWith('"')) {
            let value = "";
            let index = 1;
            while (index < rest.length) {
                const char = rest[index];
                if (char === "\\" && index + 1 < rest.length) {
                    value += rest[index + 1];
                    index += 2;
                    continue;
                }
                if (char === '"') {
                    rest = rest.slice(index + 1);
                    return value;
                }
                value += char;
                index += 1;
            }
            rest = "";
            return null;
        }
        const token = TOKEN.exec(rest)?.[0] ?? null;
        if (token)
            rest = rest.slice(token.length);
        return token;
    }
}
//# sourceMappingURL=challenges.js.map