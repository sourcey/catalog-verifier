import { canonicalizePublicHttpsUrl } from "../../primitives/src/index.js";
/** The narrow direct-HTTP redirect authority shared by scan and PR evidence capture. */
export function evidenceHttpAllowedHosts(input) {
    const hostname = new URL(canonicalizePublicHttpsUrl(input, { fragment: "remove" })).hostname;
    return [hostname, hostname.startsWith("www.") ? hostname.slice(4) : `www.${hostname}`].sort();
}
//# sourceMappingURL=url-canonicalization.js.map