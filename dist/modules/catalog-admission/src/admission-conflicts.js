import { evaluateIdentityConflicts } from "provenry/identity";
import { canonicalJson, compareCanonicalStrings, digest } from "provenry/primitives";
import { canonicalEntityIdentity, entityAuthoringSchema, entityIdentityAuthoringSchema, } from "../../../contracts/authoring/src/index.js";
import { rootSetSchema } from "../../../contracts/authority/src/index.js";
import { catalogAdmissionCandidateSchema, catalogAdmissionConflictLookupRequestSchema, catalogAdmissionConflictLookupResponseCoreSchema, catalogAdmissionConflictLookupResponseSchema, catalogAdmissionKeyDigestsSchema, catalogAdmissionKeyKindSchema, catalogAdmissionKeyMatchSchema, catalogAdmissionKeySchema, catalogVerifierIdentityContextCoreSchema, catalogVerifierIdentityContextPacketSchema, MAXIMUM_CATALOG_ADMISSION_KEYS, MAXIMUM_CATALOG_ADMISSION_MATCHES, MAXIMUM_PENDING_ADMISSION_KEYS, openPullRequestAdmissionCandidateSchema, openPullRequestAdmissionKeySchema, } from "../../../contracts/catalog-verifier/src/index.js";
import { validateCatalogVerifierIdentityContext, validateSignerRegistry, } from "../../authority/src/index.js";
export { catalogAdmissionCandidateSchema, catalogAdmissionConflictLookupRequestSchema, catalogAdmissionConflictLookupResponseSchema, catalogAdmissionKeyDigestsSchema, catalogAdmissionKeyKindSchema, catalogAdmissionKeyMatchSchema, catalogAdmissionKeySchema, MAXIMUM_CATALOG_ADMISSION_KEYS, MAXIMUM_CATALOG_ADMISSION_MATCHES, MAXIMUM_PENDING_ADMISSION_KEYS, openPullRequestAdmissionCandidateSchema, openPullRequestAdmissionKeySchema, };
export function createCatalogAdmissionConflictLookupResponse(input) {
    const query = catalogAdmissionConflictLookupRequestSchema.parse(input.query);
    const core = catalogAdmissionConflictLookupResponseCoreSchema.parse({
        response_contract: "sourcey.catalog-admission-conflict-response/v1alpha1",
        query_digest: digest(query),
        matches: [...input.matches],
    });
    return catalogAdmissionConflictLookupResponseSchema.parse({
        ...core,
        response_digest: digest(core),
    });
}
export function verifyCatalogAdmissionConflictLookupResponse(input) {
    const query = catalogAdmissionConflictLookupRequestSchema.parse(input.query);
    const response = catalogAdmissionConflictLookupResponseSchema.parse(input.response);
    const { response_digest: responseDigest, ...core } = response;
    if (response.query_digest !== digest(query) || responseDigest !== digest(core)) {
        throw new Error("Catalog admission conflict response is not bound to its exact query.");
    }
    return response;
}
export function createCatalogVerifierIdentityContextCore(input) {
    const query = catalogAdmissionConflictLookupRequestSchema.parse(input.query);
    const response = verifyCatalogAdmissionConflictLookupResponse({
        query,
        response: input.response,
    });
    return catalogVerifierIdentityContextCoreSchema.parse({
        context_contract: "sourcey.catalog-verifier-identity-context/v1alpha1",
        query_digest: digest(query),
        response_digest: response.response_digest,
        live_parent_release_id: query.liveParentReleaseId,
        live_parent_release_sequence: input.liveParentReleaseSequence,
        issued_at: input.issuedAt,
        expires_at: input.expiresAt,
    });
}
export function createCatalogVerifierIdentityContextPacket(input) {
    return catalogVerifierIdentityContextPacketSchema.parse({
        packet_contract: "sourcey.catalog-verifier-identity-context-packet/v1alpha1",
        query: input.query,
        response: input.response,
        context: input.context,
        signer_registry: input.signerRegistry,
    });
}
export function verifyCatalogVerifierIdentityContextPacket(input) {
    const packet = catalogVerifierIdentityContextPacketSchema.parse(input.packet);
    const rootSet = rootSetSchema.parse(input.rootSet);
    if (digest(rootSet) !== input.trustedRootDigest) {
        throw new Error("Catalog verifier identity context does not match the trusted root pin.");
    }
    const registry = validateSignerRegistry(rootSet, packet.signer_registry);
    const query = catalogAdmissionConflictLookupRequestSchema.parse(packet.query);
    const response = verifyCatalogAdmissionConflictLookupResponse({
        query,
        response: packet.response,
    });
    const context = validateCatalogVerifierIdentityContext(packet.context, registry, input.verifiedAt);
    if (context.query_digest !== digest(query) ||
        context.response_digest !== response.response_digest ||
        context.live_parent_release_id !== query.liveParentReleaseId) {
        throw new Error("Catalog verifier identity context does not bind its exact query response.");
    }
    return { packet, query, response, context };
}
export function createCatalogAdmissionConflictLookupRequest(input) {
    const keys = uniqueAdmissionKeys(input.identities.flatMap((identity) => deriveCatalogEntityIdentityAdmissionKeys(identity)));
    if (keys.length > MAXIMUM_CATALOG_ADMISSION_KEYS) {
        throw new Error("Catalog verifier identity context exceeds its bounded key policy.");
    }
    return catalogAdmissionConflictLookupRequestSchema.parse({
        query_contract: "sourcey.catalog-admission-conflict-query/v1alpha1",
        keys,
        liveParentReleaseId: input.liveParentReleaseId,
        candidate: input.candidate,
    });
}
/** Derive once at capture; pending lookups need neither YAML nor normalized offer text. */
export function deriveOpenPullRequestAdmissionKeys(input) {
    const pathKeys = deriveOpenPullRequestPathAdmissionKeys(input.path);
    let keys;
    try {
        keys = deriveCatalogAdmissionKeys(input.document);
    }
    catch {
        // A contract-invalid document cannot pass validation, but its exact path
        // still proves the slug. Uncaptured bytes must never be supplied as null.
        keys = pathKeys;
    }
    return keys.map((key) => openPullRequestAdmissionKeySchema.parse({
        keyDigest: key.keyDigest,
        targetReference: key.candidateReference,
        ...(key.candidateIdentityDigest ? { targetIdentityDigest: key.candidateIdentityDigest } : {}),
    }));
}
/**
 * Query pending keys derived by the same authority as live Catalog state.
 * The reader returns only requested matches, never sibling authoring documents.
 */
export class OpenPullRequestCatalogAdmissionConflictQuery {
    #reader;
    #maximumOpenPullRequests;
    #detachedRepository;
    constructor(configuration) {
        this.#reader = configuration.reader;
        this.#maximumOpenPullRequests = configuration.maximumOpenPullRequests ?? 1024;
        this.#detachedRepository = configuration.detachedRepository;
    }
    async lookupAdmissionKeys(input) {
        const repository = input.candidate.kind === "git_pull_request"
            ? input.candidate.repository
            : this.#detachedRepository?.repositoryKind === input.candidate.repositoryKind
                ? this.#detachedRepository.repository
                : undefined;
        if (!repository)
            return [];
        const requested = new Set(catalogAdmissionKeyDigestsSchema.parse(input.keys.map(({ keyDigest }) => keyDigest)));
        if (requested.size === 0)
            return [];
        const pullRequests = await this.#reader.listOpenPullRequestAdmissionCandidates(repository, [
            ...requested,
        ]);
        if (pullRequests.length > this.#maximumOpenPullRequests) {
            throw new Error("Open pull-request admission projection exceeds its bounded policy.");
        }
        const matches = [];
        for (const value of pullRequests) {
            const pullRequest = openPullRequestAdmissionCandidateSchema.parse(value);
            if (pullRequest.repository !== repository ||
                pullRequest.keys.length > MAXIMUM_CATALOG_ADMISSION_MATCHES) {
                throw new Error("Open pull-request admission candidate is outside its bounded contract.");
            }
            for (const key of pullRequest.keys) {
                if (!requested.has(key.keyDigest)) {
                    throw new Error("Pending admission projection returned an unrequested conflict key.");
                }
                matches.push({
                    ...key,
                    source: {
                        kind: "open_pull_request",
                        repository: pullRequest.repository,
                        pullRequestNumber: pullRequest.pullRequestNumber,
                        headSha: pullRequest.headSha,
                    },
                });
                if (matches.length > MAXIMUM_CATALOG_ADMISSION_MATCHES) {
                    throw new Error("Pending admission matches exceed their bounded contract.");
                }
            }
        }
        const unique = new Map();
        for (const match of matches) {
            const source = match.source;
            if (source.kind !== "open_pull_request")
                continue;
            unique.set(`${match.keyDigest}\0${match.targetReference}\0${source.repository}\0${source.pullRequestNumber}\0${source.headSha}`, match);
        }
        return [...unique.values()].sort((left, right) => compareCanonicalStrings(left.keyDigest, right.keyDigest) ||
            compareCanonicalStrings(left.targetReference, right.targetReference) ||
            compareCanonicalStrings(conflictSourceReference(left), conflictSourceReference(right)));
    }
}
export class CompositeCatalogAdmissionConflictQuery {
    queries;
    constructor(queries) {
        this.queries = queries;
        if (queries.length === 0) {
            throw new Error("Composite Catalog admission conflicts require at least one query owner.");
        }
    }
    async lookupAdmissionKeys(input) {
        return (await Promise.all(this.queries.map((query) => query.lookupAdmissionKeys(input))))
            .flat()
            .sort((left, right) => compareCanonicalStrings(left.keyDigest, right.keyDigest) ||
            compareCanonicalStrings(left.targetReference, right.targetReference) ||
            compareCanonicalStrings(conflictSourceReference(left), conflictSourceReference(right)));
    }
}
/**
 * Derive the cross-repository identity keys from the one shared Entity identity
 * envelope. Product repositories may add their own facts, but they cannot
 * redefine identity matching.
 */
export function deriveCatalogEntityIdentityAdmissionKeys(input) {
    const identity = entityIdentityAuthoringSchema.parse(input);
    const keys = [];
    const add = (kind, value, candidateReference) => {
        const normalizedValue = normalizeAdmissionKey(kind, value);
        keys.push({
            kind,
            normalizedValue,
            keyDigest: digest({ kind, normalized_value: normalizedValue }),
            candidateReference,
            ...(kind === "entity_id"
                ? { candidateIdentityDigest: catalogEntityIdentityDigest(identity) }
                : {}),
        });
    };
    const entityReference = `entity:${identity.entity_id}`;
    add("entity_id", identity.entity_id, entityReference);
    add("entity_slug", identity.slug, entityReference);
    for (const alias of identity.slug_aliases)
        add("entity_slug", alias, entityReference);
    add("entity_name", identity.name, entityReference);
    for (const domain of identity.domains) {
        if (domain.valid_until === undefined)
            add("domain", domain.value, entityReference);
    }
    return uniqueAdmissionKeys(keys);
}
/** The one slug key an entity authoring path proves without a parseable document. */
function deriveOpenPullRequestPathAdmissionKeys(path) {
    const match = /^entities\/[a-z0-9]{2}\/(?<slug>[a-z0-9-]+)\.yaml$/u.exec(path);
    if (!match?.groups?.slug) {
        throw new Error("Open pull-request entity path is outside its bounded contract.");
    }
    const normalizedValue = normalizeAdmissionKey("entity_slug", match.groups.slug);
    return [
        {
            kind: "entity_slug",
            normalizedValue,
            keyDigest: digest({
                kind: "entity_slug",
                normalized_value: normalizedValue,
            }),
            candidateReference: `path:${path}`,
        },
    ];
}
/** Derive all exact conflict keys once from the canonical compiled candidate. */
export function deriveCatalogAdmissionKeys(input) {
    const entity = entityAuthoringSchema.parse(input);
    const keys = [...deriveCatalogEntityIdentityAdmissionKeys(entity.entity)];
    const add = (kind, value, candidateReference) => {
        const normalizedValue = normalizeAdmissionKey(kind, value);
        keys.push({
            kind,
            normalizedValue,
            keyDigest: digest({ kind, normalized_value: normalizedValue }),
            candidateReference,
        });
    };
    const entityReference = `entity:${entity.entity.entity_id}`;
    add("entity_url", entity.profile.links.site, entityReference);
    if (entity.profile.links.pricing) {
        add("entity_url", entity.profile.links.pricing, entityReference);
    }
    for (const source of entity.sources)
        add("evidence_url", source.url, entityReference);
    for (const program of entity.programs) {
        const reference = `program:${program.program_id}`;
        add("program_id", program.program_id, reference);
        add("program_slug", `${entity.entity.entity_id}/${program.program_slug}`, reference);
        for (const alias of program.program_slug_aliases) {
            add("program_slug", `${entity.entity.entity_id}/${alias}`, reference);
        }
    }
    const sourceUrls = new Map(entity.sources.map(({ source_id: sourceId, url }) => [sourceId, url]));
    for (const offer of entity.offers) {
        const reference = `offer:${offer.offer_id}`;
        add("offer_id", offer.offer_id, reference);
        add("offer_slug", `${entity.entity.entity_id}/${offer.offer_slug}`, reference);
        for (const alias of offer.offer_slug_aliases) {
            add("offer_slug", `${entity.entity.entity_id}/${alias}`, reference);
        }
        if (offer.access.url) {
            add("offer_url", offer.access.url, reference);
        }
        if (offer.terms_url) {
            add("offer_url", offer.terms_url, reference);
        }
        for (const sourceId of offer.source_ids ?? []) {
            const url = sourceUrls.get(sourceId);
            if (url)
                add("evidence_url", url, reference);
        }
        add("semantic_offer", canonicalJson({
            roles: offer.roles,
            economics: offer.economics,
            eligibility: offer.eligibility,
            access: offer.access,
            terms_url: offer.terms_url ?? null,
        }), reference);
    }
    return uniqueAdmissionKeys(keys);
}
function uniqueAdmissionKeys(keys) {
    const unique = new Map();
    for (const key of keys)
        unique.set(`${key.kind}\0${key.normalizedValue}`, key);
    return [...unique.values()].sort((left, right) => compareCanonicalStrings(left.kind, right.kind) ||
        compareCanonicalStrings(left.normalizedValue, right.normalizedValue));
}
export function evaluateCatalogAdmissionConflicts(input) {
    const { candidate } = input;
    if (input.keys.some((key) => key.kind === "entity_id" && !key.candidateIdentityDigest)) {
        throw new Error("A Catalog Entity ID admission key must carry its identity digest.");
    }
    const catalogMatches = new Map(input.matches.map((match) => [identityConflictMatch(match), match]));
    const conflicts = evaluateIdentityConflicts({
        keys: input.keys,
        matches: [...catalogMatches.keys()],
        candidate: candidate.kind === "git_pull_request"
            ? {
                kind: "pull_request",
                repository: candidate.repository,
                pullRequestNumber: candidate.pullRequestNumber,
                headSha: candidate.headSha,
            }
            : {
                kind: "detached",
                candidateReference: candidate.candidateReference,
                candidateDigest: candidate.candidateDigest,
            },
        liveParentId: input.liveParentReleaseId,
    });
    const keys = new Map(input.keys.map((key) => [key.keyDigest, key]));
    return conflicts
        .map(({ keyDigest, matches: held, identityChanged }) => {
        const key = keys.get(keyDigest);
        if (!key)
            throw new Error("Catalog admission conflict key disappeared.");
        const matches = held.map((match) => catalogMatches.get(match));
        return {
            kind: key.kind === "entity_id" && identityChanged
                ? "identity"
                : matches.some(({ source }) => source.kind === "open_pull_request")
                    ? "open_pull_request"
                    : matches.some(({ source }) => source.kind === "pending_git_lineage")
                        ? "pending_git_lineage"
                        : matches.some(({ source }) => source.kind === "pending_submission")
                            ? "pending_submission"
                            : conflictKind(key.kind),
            strength: conflictStrength(key.kind),
            keyDigest,
            targetReferences: [...new Set(matches.map(({ targetReference }) => targetReference))].sort(compareCanonicalStrings),
            sourceReferences: [...new Set(matches.map(conflictSourceReference))].sort(compareCanonicalStrings),
        };
    })
        .sort((left, right) => compareCanonicalStrings(left.kind, right.kind) ||
        compareCanonicalStrings(left.keyDigest, right.keyDigest));
}
/** A Catalog match in the shared rule's terms. */
function identityConflictMatch(match) {
    const { source } = match;
    return {
        keyDigest: match.keyDigest,
        targetReference: match.targetReference,
        targetIdentityDigest: match.targetIdentityDigest,
        source: source.kind === "current_catalog"
            ? { kind: "live", parentId: source.liveParentReleaseId }
            : source.kind === "pending_git_lineage"
                ? {
                    kind: "merged_lineage",
                    repository: source.repository,
                    liveSourceCommit: source.liveSourceCommit,
                    targetCommit: source.targetCommit,
                }
                : source,
    };
}
/**
 * Exact identity-envelope digest shared by admission projection and verifier
 * context. Retained Catalog documents and authoring files order aliases and
 * domains differently, so the digest reads the canonical envelope: one
 * identity has one digest wherever it was written.
 */
export function catalogEntityIdentityDigest(identity) {
    return digest(canonicalEntityIdentity(identity));
}
function conflictSourceReference(match) {
    if (match.source.kind === "current_catalog") {
        return `catalog:${match.source.liveParentReleaseId}:${match.targetReference}`;
    }
    if (match.source.kind === "pending_git_lineage") {
        return `git:${match.source.repository}@${match.source.liveSourceCommit}..${match.source.targetCommit}:${match.targetReference}`;
    }
    if (match.source.kind === "pending_submission") {
        return `submission:${match.source.candidateReference}@${match.source.candidateDigest}:${match.targetReference}`;
    }
    return `github:${match.source.repository}#${match.source.pullRequestNumber}@${match.source.headSha}:${match.targetReference}`;
}
function normalizeAdmissionKey(kind, value) {
    if (kind === "domain")
        return value.normalize("NFKC").trim().toLowerCase().replace(/\.$/u, "");
    if (kind === "entity_url" || kind === "evidence_url" || kind === "offer_url") {
        const url = new URL(value);
        url.hostname = url.hostname.toLowerCase();
        url.hash = "";
        if (url.pathname !== "/")
            url.pathname = url.pathname.replace(/\/+$/u, "");
        return url.href;
    }
    if (kind === "entity_name")
        return value.normalize("NFKC").trim().toLowerCase();
    return value.normalize("NFC").trim().toLowerCase();
}
function conflictKind(kind) {
    if (kind === "domain")
        return "domain";
    if (kind === "entity_url" || kind === "evidence_url" || kind === "offer_url")
        return "url";
    if (kind === "entity_name")
        return "name";
    if (kind === "program_id" || kind === "program_slug")
        return "program";
    if (kind === "offer_id" || kind === "offer_slug")
        return "offer";
    if (kind === "semantic_offer")
        return "semantic_offer";
    return "slug";
}
function conflictStrength(kind) {
    return kind === "entity_name" || kind === "evidence_url" || kind === "offer_url"
        ? "ambiguous"
        : "exact";
}
//# sourceMappingURL=admission-conflicts.js.map