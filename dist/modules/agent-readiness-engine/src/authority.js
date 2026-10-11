import { createHash } from "node:crypto";
import { AGENT_READINESS_REDIRECT_URI } from "../../../contracts/agent-readiness/src/index.js";
import { parseChallenges } from "./challenges.js";
import { httpsUrl, record } from "./documents.js";
import { responseHeader, unansweredRecord } from "./records.js";
/**
 * The authority chain an *authority* answer, or an error before authority,
 * points to (north star §5.5): RFC 9728 protected-resource metadata, then the
 * authorization server's RFC 8414 or OpenID metadata, then its auth.md agent
 * registration or how Sourcey's agent can identify itself as an OAuth client,
 * then whether a PKCE authorization request with that client reaches consent.
 * These are the pure readings; the probe suite performs the exchanges.
 */
/** The Bearer challenge's parameters an agent follows: where the metadata is, and what scope. */
export function bearerChallenge(record) {
    const header = responseHeader(record, "www-authenticate");
    if (header === null)
        return null;
    return parseChallenges(header).find(({ scheme }) => scheme === "bearer") ?? null;
}
/**
 * Where the protected-resource metadata for a resource is: the challenge's
 * `resource_metadata`, else RFC 9728 §3.1's well-known location with the
 * resource's path inserted, then at the root.
 */
export function protectedResourceMetadataUrls(resource, challenge) {
    const named = oauthUrl(challenge?.params.resource_metadata);
    if (named)
        return [named];
    const url = new URL(resource);
    const path = url.pathname.replace(/\/+$/u, "");
    return [
        ...(path ? [`${url.origin}/.well-known/oauth-protected-resource${path}`] : []),
        `${url.origin}/.well-known/oauth-protected-resource`,
    ];
}
/** RFC 9728 metadata as published: the resource, its authorization servers and its scopes. */
export function protectedResourceMetadata(document) {
    const metadata = record(document);
    const resource = oauthUrl(metadata?.resource);
    if (!resource)
        return null;
    return {
        resource,
        authorizationServers: Array.isArray(metadata?.authorization_servers)
            ? metadata.authorization_servers.flatMap((server) => oauthUrl(server) ?? [])
            : [],
        scopes: Array.isArray(metadata?.scopes_supported)
            ? metadata.scopes_supported.filter((scope) => typeof scope === "string")
            : [],
    };
}
/** RFC 9728 metadata for a resource on the operation's origin: its first authorization server. */
export function readProtectedResource(document, operationUrl) {
    const metadata = protectedResourceMetadata(document);
    if (!metadata || new URL(metadata.resource).origin !== new URL(operationUrl).origin)
        return null;
    const [authorizationServer] = metadata.authorizationServers;
    return authorizationServer ? { authorizationServer, scopes: metadata.scopes } : null;
}
/**
 * Where an authorization server's metadata is, in the order MCP clients try:
 * RFC 8414 with the issuer's path inserted, OpenID with it inserted, OpenID
 * with it appended; or, for an issuer without a path, RFC 8414 then OpenID.
 */
export function authorizationServerMetadataUrls(issuer) {
    const url = new URL(issuer);
    const path = url.pathname.replace(/\/+$/u, "");
    return path
        ? [
            `${url.origin}/.well-known/oauth-authorization-server${path}`,
            `${url.origin}/.well-known/openid-configuration${path}`,
            `${url.origin}${path}/.well-known/openid-configuration`,
        ]
        : [
            `${url.origin}/.well-known/oauth-authorization-server`,
            `${url.origin}/.well-known/openid-configuration`,
        ];
}
const JWT_BEARER_GRANT = "urn:ietf:params:oauth:grant-type:jwt-bearer";
/** Server metadata for exactly this issuer (RFC 8414 §3.3), or null. */
export function readAuthorizationServer(document, issuer) {
    const metadata = record(document);
    const stated = oauthUrl(metadata?.issuer);
    const authorizationEndpoint = oauthUrl(metadata?.authorization_endpoint);
    const registration = agentRegistration(metadata?.agent_auth);
    if (!stated || trimmed(stated) !== trimmed(issuer))
        return null;
    if (!authorizationEndpoint && !registration)
        return null;
    const strings = (value) => Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
    const grants = strings(metadata?.grant_types_supported);
    return {
        issuer: stated,
        authorizationEndpoint,
        registrationEndpoint: oauthUrl(metadata?.registration_endpoint),
        clientIdMetadataDocument: metadata?.client_id_metadata_document_supported === true,
        pkce: strings(metadata?.code_challenge_methods_supported).includes("S256"),
        registration,
        renewal: grants.includes("refresh_token") ||
            (registration !== null && grants.includes(JWT_BEARER_GRANT)),
        revocation: oauthUrl(metadata?.revocation_endpoint) !== null,
    };
}
/**
 * auth.md's `agent_auth` block: an `identity_endpoint` the agent registers at,
 * and the registration types it accepts (`identity_types_supported`). An
 * `anonymous` registration is the agent's own, unless the block names a
 * `claim_endpoint`: what the agent made then lasts until a person claims it
 * later (north star §5.6, Onboard `approval`), as does a registration a person
 * confirms (`service_auth`, `identity_assertion`).
 */
function agentRegistration(value) {
    const block = record(value);
    if (!block || !oauthUrl(block.identity_endpoint))
        return null;
    const types = Array.isArray(block.identity_types_supported) ? block.identity_types_supported : [];
    if (types.includes("anonymous"))
        return oauthUrl(block.claim_endpoint) ? "claimable" : "agent";
    return types.includes("service_auth") || types.includes("identity_assertion")
        ? "claimable"
        : null;
}
/** The client id a dynamic registration returned, or null. */
export function registeredClientId(document) {
    const id = record(document)?.client_id;
    return typeof id === "string" && id.length > 0 && id.length <= 512 ? id : null;
}
/**
 * The PKCE authorization request a probe sends: Sourcey's client, its redirect
 * URI, a challenge derived from the run's nonce, and the resource and scope the
 * chain named. Sourcey never redeems a code, so the verifier is never sent.
 */
export function authorizationRequestUrl(input) {
    const url = new URL(input.authorizationEndpoint);
    const verifier = base64url(sha256(`sourcey.agent-readiness-pkce:${input.nonce}`));
    url.searchParams.set("response_type", "code");
    url.searchParams.set("client_id", input.clientId);
    url.searchParams.set("redirect_uri", AGENT_READINESS_REDIRECT_URI);
    url.searchParams.set("state", input.nonce);
    url.searchParams.set("code_challenge", base64url(sha256(verifier)));
    url.searchParams.set("code_challenge_method", "S256");
    url.searchParams.set("resource", input.resource);
    if (input.scopes.length > 0)
        url.searchParams.set("scope", input.scopes.join(" "));
    return url.href;
}
/**
 * Whether an answered authorization request reached consent: the server
 * accepted it and moved to the person's sign-in or consent, answering with a
 * page (2xx HTML) or redirecting, with no `error`, anywhere but back to
 * Sourcey. A redirect back carries an error or a code Sourcey discards; a
 * redirect carrying `error` refused the client; any other answer refused it
 * too. An unanswered request is residue (`probeUnanswered`) and never read here.
 */
export function consentReached(record) {
    if (unansweredRecord(record) || record.outcome !== "responded")
        return false;
    const { status, body } = record.response;
    if (status >= 200 && status <= 299)
        return body.media_type === "text/html";
    if (status >= 300 && status <= 399) {
        const location = responseHeader(record, "location");
        if (location === null)
            return false;
        let target;
        try {
            target = new URL(location, record.request.url);
        }
        catch {
            return false;
        }
        const back = new URL(AGENT_READINESS_REDIRECT_URI);
        return (!target.searchParams.has("error") &&
            !(target.origin === back.origin && target.pathname === back.pathname));
    }
    return false;
}
function sha256(text) {
    return createHash("sha256").update(text, "utf8").digest();
}
function base64url(bytes) {
    return bytes.toString("base64url");
}
function trimmed(url) {
    return url.replace(/\/+$/u, "");
}
/** An OAuth URL (RFC 8414, RFC 9728): HTTPS, with no credentials and no fragment. */
function oauthUrl(value) {
    const url = httpsUrl(value);
    return url !== null && new URL(url).hash === "" ? url : null;
}
//# sourceMappingURL=authority.js.map