import { compareCanonicalStrings } from "../../primitives/src/index.js";
/**
 * The canonical domain used when opening a new authority claim. A claim is
 * bound to the Entity revision, so this comes from its domain contract rather
 * than from a presentation URL that may use `www` or another site hostname.
 */
export function currentEntityPrimaryDomain(revision) {
    const domains = revision.content.domains.filter((domain) => domain.role === "primary" && domain.valid_until === undefined);
    if (domains.length !== 1) {
        throw new Error(`Entity revision ${revision.revision_digest} must have exactly one current primary domain.`);
    }
    const primary = domains[0];
    if (!primary)
        throw new Error("Entity primary domain selection failed.");
    return primary.value.toLowerCase();
}
/**
 * Exact current hostnames that can support authority for an Entity revision.
 * The primary domain is canonical. The recorded site hostname is retained as
 * an authority domain only when it is the primary domain or one of its
 * subdomains; this admits an exact official `www` proof without treating an
 * arbitrary or cross-domain link as vendor authority.
 */
export function entityClaimAuthorityDomains(revision) {
    const primary = currentEntityPrimaryDomain(revision);
    const site = new URL(revision.content.links.site).hostname.toLowerCase();
    return [
        ...new Set([primary, ...(site === primary || site.endsWith(`.${primary}`) ? [site] : [])]),
    ].sort();
}
export function entityAcceptsClaimAuthorityDomain(revision, domain) {
    return entityClaimAuthorityDomains(revision).includes(domain.toLowerCase());
}
export function deriveAuthorityState(events) {
    const claims = events.filter((event) => event.kind === "authority.claimed");
    const rechecks = indexByClaimId(events.filter((event) => event.kind === "authority.rechecked"), "authority_claim_id");
    const revocations = indexByClaimId(events.filter((event) => event.kind === "authority.revoked"), "authority_claim_id");
    const supersessions = indexByClaimId(events.filter((event) => event.kind === "authority.superseded"), "old_authority_claim_id");
    const claimsById = new Map();
    const activeClaims = new Map();
    const revokedAttestationIds = new Set(events
        .filter((event) => event.kind === "attestation.revoked")
        .map((event) => payloadString(event, "target_event_id")));
    const activeAttestations = events.filter((event) => event.kind === "subject.attested" && !revokedAttestationIds.has(event.event_id));
    for (const claim of claims) {
        const claimId = payloadString(claim, "authority_claim_id");
        if (claimsById.has(claimId))
            throw new Error(`Duplicate authority claim ID ${claimId}.`);
        claimsById.set(claimId, claim);
        const claimRevocations = revocations.get(claimId) ?? [];
        const claimSupersessions = supersessions.get(claimId) ?? [];
        for (const transition of [...claimRevocations, ...claimSupersessions]) {
            if (transition.subject.entity_id !== claim.subject.entity_id) {
                throw new Error(`Authority transition for ${claimId} targets another entity.`);
            }
        }
        if (claimRevocations.length > 1 || claimSupersessions.length > 1) {
            throw new Error(`Authority claim ${claimId} has conflicting terminal transitions.`);
        }
        if (claimRevocations.length > 0 || claimSupersessions.length > 0)
            continue;
        const claimRechecks = [...(rechecks.get(claimId) ?? [])].sort((left, right) => compareCanonicalStrings(payloadString(left, "checked_at"), payloadString(right, "checked_at")));
        for (const recheck of claimRechecks) {
            if (recheck.subject.entity_id !== claim.subject.entity_id) {
                throw new Error(`Authority recheck for ${claimId} targets another entity.`);
            }
        }
        for (const [index, recheck] of claimRechecks.entries()) {
            const previousBoundary = index === 0
                ? payloadString(claim, "recheck_due_at")
                : payloadString(claimRechecks[index - 1], "next_recheck_due_at");
            const checkedAt = payloadString(recheck, "checked_at");
            const nextBoundary = payloadString(recheck, "next_recheck_due_at");
            if (checkedAt > previousBoundary || nextBoundary <= checkedAt) {
                throw new Error(`Authority claim ${claimId} has a non-contiguous recheck chain.`);
            }
            const peer = claimRechecks[index + 1];
            if (peer && payloadString(peer, "checked_at") === checkedAt) {
                throw new Error(`Authority claim ${claimId} has conflicting rechecks at ${checkedAt}.`);
            }
        }
        activeClaims.set(claimId, {
            authorityClaimId: claimId,
            entityId: claim.subject.entity_id,
            authorizedIssuerId: payloadString(claim, "authorized_issuer_id"),
            controlledDomain: payloadString(claim, "controlled_domain"),
            validUntil: claimRechecks.length > 0
                ? payloadString(claimRechecks.at(-1), "next_recheck_due_at")
                : payloadString(claim, "recheck_due_at"),
            eventIds: [
                claim.event_id,
                ...claimRechecks.map((event) => event.event_id),
            ].sort(),
        });
    }
    for (const transition of [
        ...events.filter((event) => event.kind === "authority.rechecked"),
        ...events.filter((event) => event.kind === "authority.revoked"),
    ]) {
        const claimId = payloadString(transition, "authority_claim_id");
        if (!claimsById.has(claimId)) {
            throw new Error(`${transition.kind} targets missing authority claim ${claimId}.`);
        }
    }
    for (const transition of events.filter((event) => event.kind === "authority.superseded")) {
        const oldClaimId = payloadString(transition, "old_authority_claim_id");
        const newClaimId = payloadString(transition, "new_authority_claim_id");
        const oldClaim = claimsById.get(oldClaimId);
        const newClaim = claimsById.get(newClaimId);
        if (!oldClaim || !newClaim) {
            throw new Error(`Authority supersession targets missing replacement claim ${newClaimId}.`);
        }
        if (oldClaim.subject.entity_id !== transition.subject.entity_id ||
            newClaim.subject.entity_id !== transition.subject.entity_id) {
            throw new Error("Authority supersession claims must belong to its exact entity.");
        }
    }
    const activeByEntity = new Map();
    for (const claim of activeClaims.values()) {
        const prior = activeByEntity.get(claim.entityId);
        if (prior) {
            throw new Error(`Entity ${claim.entityId} has conflicting active authority claims ${prior} and ${claim.authorityClaimId}.`);
        }
        activeByEntity.set(claim.entityId, claim.authorityClaimId);
    }
    return { activeClaims, activeAttestations };
}
/** A connected Entity identity lineage may carry only one live claim authority. */
export function assertEntityIdentityAuthorityClosure(input) {
    const adjacency = new Map();
    const connect = (left, right) => {
        const leftEdges = adjacency.get(left) ?? new Set();
        const rightEdges = adjacency.get(right) ?? new Set();
        leftEdges.add(right);
        rightEdges.add(left);
        adjacency.set(left, leftEdges);
        adjacency.set(right, rightEdges);
    };
    for (const [source, target] of Object.entries(input.identities.canonical_entity_resolutions)) {
        connect(source, target);
    }
    for (const [source, targets] of Object.entries(input.identities.split_relationships)) {
        for (const target of targets)
            connect(source, target);
    }
    const claimsByEntity = new Map();
    for (const [claimId, claim] of input.activeClaims) {
        claimsByEntity.set(claim.entityId, { claimId, entityId: claim.entityId });
    }
    const visited = new Set();
    for (const entityId of claimsByEntity.keys()) {
        if (visited.has(entityId))
            continue;
        const queue = [entityId];
        const claims = [];
        while (queue.length > 0) {
            const current = queue.pop();
            if (!current || visited.has(current))
                continue;
            visited.add(current);
            const claim = claimsByEntity.get(current);
            if (claim)
                claims.push(claim);
            for (const connected of adjacency.get(current) ?? []) {
                if (!visited.has(connected))
                    queue.push(connected);
            }
        }
        if (claims.length > 1) {
            throw new Error(`Connected Entity identities have conflicting active authority claims: ${claims
                .map((claim) => `${claim.entityId}:${claim.claimId}`)
                .sort(compareCanonicalStrings)
                .join(", ")}.`);
        }
    }
}
function indexByClaimId(events, field) {
    const index = new Map();
    for (const event of events) {
        const key = payloadString(event, field);
        const entries = index.get(key) ?? [];
        entries.push(event);
        index.set(key, entries);
    }
    return index;
}
function payloadString(event, field) {
    const value = event.payload[field];
    if (typeof value !== "string") {
        throw new Error(`Event ${event.event_id} lacks string payload ${field}.`);
    }
    return value;
}
//# sourceMappingURL=index.js.map