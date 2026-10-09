import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { assertDigest, canonicalJson, compareCanonicalStrings, digest, } from "provenry/primitives";
import { z } from "zod";
import { catalogVerifierCriterionSchema, catalogVerifierDiagnosticSchema, catalogVerifierResultSchema, } from "../../../contracts/catalog-verifier/src/index.js";
import { currentAgentReadinessPolicy } from "../../../modules/agent-readiness-policy/src/current-policy.js";
import { inspectAgentReadinessCandidateSources, inspectAgentReadinessRepositoryChangePacket, } from "../../../modules/agent-readiness-repository/src/index.js";
import { verifyCatalogRelease } from "../../../modules/artifact/src/index.js";
import { catalogAdmissionCandidateSchema, createCatalogAdmissionConflictLookupRequest, evaluateCatalogAdmissionConflicts, inspectCatalogPrTree, verifyCatalogVerifierIdentityContextPacket, } from "../../../modules/catalog-admission/src/index.js";
import { assertCatalogContributionAuthoring, inspectCatalogCandidateSources, } from "../../../modules/catalog-authoring-validation/src/index.js";
import { readVerifiedSourceyRelease } from "../../../modules/publication-instance/src/index.js";
import { verifyCatalogDelta } from "../../../modules/sourcey-publication/src/verifier.js";
const execFileAsync = promisify(execFile);
const criteria = Object.freeze([
    {
        rule_id: "startup-credits.changed-closure",
        repository_kind: "startup-credits",
        title: "Changed Catalog closure",
        requirement: "Only canonical Entity YAML may change with Catalog data; every changed Entity, Program, Offer, source, role, path, and identifier must close under the current authoring contract.",
        exclusion: "This structural result does not establish factual truth, source availability, submitter authority, or publication.",
    },
    {
        rule_id: "startup-credits.taxonomy",
        repository_kind: "startup-credits",
        title: "Canonical taxonomy",
        requirement: "Every changed Entity category must exist in the exact supplied Catalog taxonomy.",
        exclusion: null,
    },
    {
        rule_id: "startup-credits.identity-context",
        repository_kind: "startup-credits",
        title: "Shared Entity identity",
        requirement: "Every changed Entity identity must close against an unexpired signed live-Catalog context derived from the exact candidate keys.",
        exclusion: "An identity-context pass does not establish submitter authority, factual truth, or publication.",
    },
    {
        rule_id: "startup-credits.sign-off",
        repository_kind: "startup-credits",
        title: "Developer Certificate of Origin",
        requirement: "Every commit a pull request adds carries a Signed-off-by line, certifying the Developer Certificate of Origin.",
        exclusion: null,
    },
    {
        rule_id: "agent-readiness.changed-closure",
        repository_kind: "agent-readiness",
        title: "Changed declaration closure",
        requirement: "Only canonical Agent Readiness Entity YAML may change with declaration data; every changed declaration and referenced node must close under the current declaration contract.",
        exclusion: "Declarations are assessment inputs. They do not author observations, findings, stage states, grades, or publication authority.",
    },
    {
        rule_id: "agent-readiness.policy-closure",
        repository_kind: "agent-readiness",
        title: "Current policy closure",
        requirement: "Every declaration target, resource, endpoint, interface, relation, source binding, and exclusion must satisfy the exact current Agent Readiness policy closure.",
        exclusion: null,
    },
    {
        rule_id: "agent-readiness.identity-context",
        repository_kind: "agent-readiness",
        title: "Shared Entity identity",
        requirement: "Every changed Entity identity must close against an unexpired signed live-Catalog context derived from the exact candidate keys.",
        exclusion: "An identity-context pass does not establish submitter authority, observed readiness, a grade, or publication.",
    },
    {
        rule_id: "agent-readiness.sign-off",
        repository_kind: "agent-readiness",
        title: "Developer Certificate of Origin",
        requirement: "Every commit a pull request adds carries a Signed-off-by line, certifying the Developer Certificate of Origin.",
        exclusion: null,
    },
].map((criterion) => catalogVerifierCriterionSchema.parse(criterion)));
export class CatalogVerifierApplication {
    explain(repositoryKind) {
        return criteria
            .filter((criterion) => criterion.repository_kind === repositoryKind)
            .map((criterion) => structuredClone(criterion));
    }
    async validateRepositoryChange(input) {
        const operation = `validate.${input.repositoryKind}`;
        try {
            const inspection = await inspectRepositoryChange(input);
            const context = verifyIdentityContext({
                identities: inspection.identities,
                candidate: input.candidate,
                context: input.identityContext,
            });
            return valid(operation, {
                ...inspection.summary,
                identity_context_digest: context.context.context_digest,
                live_parent_release_id: context.context.live_parent_release_id,
            });
        }
        catch (error) {
            return invalid(operation, diagnosticFor(error, ruleForError(error, input.repositoryKind)));
        }
    }
    /**
     * The whole public check of one pull request head, as each data repository's validation
     * workflow runs it: every commit it adds is signed off, the live Catalog is signed under the
     * root the repository trusts, Sourcey issues the identity context for the exact candidate keys,
     * and the change closes against that context.
     */
    async validatePullRequest(input) {
        const operation = `validate.${input.repositoryKind}`;
        const unsigned = await unsignedCommits(input.repositoryRoot, input.baseRevision, input.headRevision);
        if (unsigned.length > 0) {
            return invalid(operation, {
                rule_id: `${input.repositoryKind}.sign-off`,
                classification: "policy_failure",
                path: null,
                message: `These commits carry no Signed-off-by line: ${unsigned.join(", ")}.`,
                guidance: "Sign off each commit (git commit --signoff) to certify the Developer Certificate of Origin, then push again.",
            });
        }
        const candidate = catalogAdmissionCandidateSchema.parse({
            kind: "git_pull_request",
            repository: input.repository,
            pullRequestNumber: input.pullRequestNumber,
            headSha: input.headRevision,
        });
        let packet;
        try {
            packet = await issueIdentityContext({ ...input, candidate, application: this });
        }
        catch (error) {
            return invalid(operation, diagnosticFor(error, `${input.repositoryKind}.identity-context`));
        }
        return this.validateRepositoryChange({
            ...input,
            candidate,
            identityContext: {
                packet,
                rootSet: input.rootSet,
                trustedRootDigest: input.trustedRootDigest,
                verifiedAt: (input.now?.() ?? new Date()).toISOString(),
            },
        });
    }
    async createRepositoryIdentityContextRequest(input) {
        assertDigest(input.liveParentReleaseId, "live parent release ID");
        const inspection = await inspectRepositoryChange(input);
        return createCatalogAdmissionConflictLookupRequest({
            identities: inspection.identities,
            liveParentReleaseId: input.liveParentReleaseId,
            candidate: input.candidate,
        });
    }
    validateCandidate(input) {
        const operation = `validate.${input.repositoryKind}`;
        try {
            if (input.repositoryKind === "startup-credits") {
                if (!input.taxonomy) {
                    return invalid(operation, {
                        rule_id: "startup-credits.taxonomy",
                        classification: "invalid_input",
                        path: null,
                        message: "Startup Credits validation requires an exact Catalog taxonomy.",
                        guidance: "Supply the taxonomy selected by the current hosted verifier context.",
                    });
                }
                const inspection = inspectCatalogCandidateSources({
                    sources: input.sources,
                    taxonomy: input.taxonomy,
                });
                assertCatalogContributionAuthoring(inspection.entries.map(({ value }) => value));
                const context = verifyIdentityContext({
                    identities: inspection.entries.map(({ value }) => value.entity),
                    candidate: input.candidate,
                    context: input.identityContext,
                });
                return valid(operation, {
                    ...inspection.summary,
                    identity_context_digest: context.context.context_digest,
                    live_parent_release_id: context.context.live_parent_release_id,
                });
            }
            const inspection = inspectAgentReadinessCandidateSources({
                sources: input.sources,
                policy: currentAgentReadinessPolicy,
            });
            const context = verifyIdentityContext({
                identities: inspection.authoring.map(({ entity }) => entity),
                candidate: input.candidate,
                context: input.identityContext,
            });
            return valid(operation, {
                ...inspection.summary,
                identity_context_digest: context.context.context_digest,
                live_parent_release_id: context.context.live_parent_release_id,
            });
        }
        catch (error) {
            return invalid(operation, diagnosticFor(error, ruleForError(error, input.repositoryKind)));
        }
    }
    createCandidateIdentityContextRequest(input) {
        assertDigest(input.liveParentReleaseId, "live parent release ID");
        const candidate = input.candidate ?? detachedCandidate(input);
        if (input.repositoryKind === "startup-credits") {
            if (!input.taxonomy) {
                throw new Error("Startup Credits validation requires an exact Catalog taxonomy.");
            }
            const inspection = inspectCatalogCandidateSources({
                sources: input.sources,
                taxonomy: input.taxonomy,
            });
            assertCatalogContributionAuthoring(inspection.entries.map(({ value }) => value));
            return createCatalogAdmissionConflictLookupRequest({
                identities: inspection.entries.map(({ value }) => value.entity),
                liveParentReleaseId: input.liveParentReleaseId,
                candidate,
            });
        }
        const inspection = inspectAgentReadinessCandidateSources({
            sources: input.sources,
            policy: currentAgentReadinessPolicy,
        });
        return createCatalogAdmissionConflictLookupRequest({
            identities: inspection.authoring.map(({ entity }) => entity),
            liveParentReleaseId: input.liveParentReleaseId,
            candidate,
        });
    }
    async verifyRelease(input) {
        const operation = "verify-release";
        try {
            assertDigest(input.trustedRootDigest, "trusted root digest");
            const release = await readVerifiedSourceyRelease(input.directory);
            const trust = { rootSetDigest: input.trustedRootDigest };
            const result = release.kind === "delta"
                ? await verifyCatalogDelta(release, trust)
                : await verifyCatalogRelease(release, trust);
            return valid(operation, {
                entities: "artifact" in result ? result.artifact.entities.length : result.entities.size,
                release_id: result.bundle.release.release_id,
                snapshot_id: result.bundle.release.snapshot_id,
                files: result.files.size,
            });
        }
        catch (error) {
            return invalid(operation, diagnosticFor(error, "release.immutable-closure"));
        }
    }
}
async function inspectRepositoryChange(input) {
    if (input.repositoryKind === "startup-credits") {
        if (!input.taxonomy) {
            throw new CatalogVerifierInputError("Startup Credits validation requires an exact Catalog taxonomy.");
        }
        const inspection = await inspectCatalogPrTree({
            repositoryRoot: input.repositoryRoot,
            baseRevision: input.baseRevision,
            headRevision: input.headRevision,
            taxonomy: input.taxonomy,
        });
        return {
            identities: inspection.identities,
            summary: {
                entities: inspection.entities,
                programs: inspection.programs,
                offers: inspection.offers,
            },
        };
    }
    const inspection = await inspectAgentReadinessRepositoryChangePacket({
        repositoryRoot: input.repositoryRoot,
        baseRevision: input.baseRevision,
        headRevision: input.headRevision,
        policy: currentAgentReadinessPolicy,
    });
    return {
        identities: inspection.paths.flatMap(({ head }) => (head ? [head.authoring.entity] : [])),
        summary: {
            entities: inspection.paths.length,
            declarations: inspection.paths.reduce((count, path) => count + path.declarations.filter((item) => item.kind !== "declaration_unchanged").length, 0),
        },
    };
}
function verifyIdentityContext(input) {
    let verified;
    try {
        assertDigest(input.context.trustedRootDigest, "trusted root digest");
        verified = verifyCatalogVerifierIdentityContextPacket({
            packet: input.context.packet,
            rootSet: input.context.rootSet,
            trustedRootDigest: input.context.trustedRootDigest,
            verifiedAt: input.context.verifiedAt,
        });
    }
    catch (error) {
        throw new CatalogVerifierIdentityContextError(error instanceof Error
            ? error.message
            : "The signed Catalog identity context could not be verified.");
    }
    const expected = createCatalogAdmissionConflictLookupRequest({
        identities: input.identities,
        liveParentReleaseId: verified.query.liveParentReleaseId,
        candidate: catalogAdmissionCandidateSchema.parse(input.candidate),
    });
    if (canonicalJson(verified.query) !== canonicalJson(expected)) {
        throw new CatalogVerifierIdentityContextError("The signed identity context was not issued for these exact candidate identities.");
    }
    const conflicts = evaluateCatalogAdmissionConflicts({
        keys: verified.query.keys,
        matches: verified.response.matches,
        liveParentReleaseId: verified.query.liveParentReleaseId,
        candidate: verified.query.candidate,
    });
    if (conflicts.length > 0) {
        const labels = conflicts
            .map(({ kind, targetReferences }) => `${kind}: ${targetReferences.join(", ")}`)
            .sort(compareCanonicalStrings);
        throw new CatalogVerifierIdentityConflictError(`The candidate conflicts with retained Catalog identity: ${labels.join("; ")}.`);
    }
    return verified;
}
function detachedCandidate(input) {
    const candidateDigest = digest({
        repository_kind: input.repositoryKind,
        sources: [...input.sources].sort((left, right) => compareCanonicalStrings(left.source, right.source)),
    });
    return catalogAdmissionCandidateSchema.parse({
        kind: "detached",
        repositoryKind: input.repositoryKind,
        candidateDigest,
        candidateReference: candidateDigest,
    });
}
/** What Sourcey's API answers can run to; an identity context is far smaller. */
const MAXIMUM_SERVICE_RESPONSE_BYTES = 4 * 1024 * 1024;
const SERVICE_TIMEOUT_MS = 30_000;
const liveReleaseSchema = z.object({
    release_id: z.string().regex(/^sha256:[a-f0-9]{64}$/u),
    descriptor: z.object({
        snapshot_core: z.object({ root_set_digest: z.string().regex(/^sha256:[a-f0-9]{64}$/u) }),
    }),
});
const identityContextResponseSchema = z.object({
    release_id: z.string(),
    data: z.object({ query: z.object({ liveParentReleaseId: z.string() }) }),
});
/**
 * The identity context Sourcey issues for the exact candidate keys, at the live Catalog, which
 * must be signed under the root this repository trusts. Its signature and bindings are verified
 * where it is used, never trusted here.
 */
async function issueIdentityContext(input) {
    const read = input.fetch ?? fetch;
    const live = serviceShape(liveReleaseSchema, await serviceJson(read, new URL("/v1/release", input.api), { method: "GET" }), "its live release");
    if (live.descriptor.snapshot_core.root_set_digest !== input.trustedRootDigest) {
        throw new CatalogVerifierIdentityContextError("The live Catalog is signed under another root than this repository trusts.");
    }
    const query = await input.application.createRepositoryIdentityContextRequest({
        ...input,
        liveParentReleaseId: live.release_id,
    });
    const answer = await serviceJson(read, new URL("/v1/catalog-verifier/identity-contexts", input.api), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(query),
    });
    const response = serviceShape(identityContextResponseSchema, answer, "an identity context");
    if (response.release_id !== live.release_id ||
        response.data.query.liveParentReleaseId !== live.release_id) {
        throw new CatalogVerifierIdentityContextError("Sourcey issued an identity context for another live Catalog release.");
    }
    // The packet is verified as Sourcey sent it, every byte, where it is used.
    return answer.data;
}
/** One bounded JSON answer from Sourcey's API; anything else is the service's failure. */
async function serviceJson(read, url, init) {
    let response;
    try {
        response = await read(url, { ...init, signal: AbortSignal.timeout(SERVICE_TIMEOUT_MS) });
    }
    catch (error) {
        throw new CatalogVerifierServiceError(`Sourcey's API could not be reached at ${url.href}: ${error instanceof Error ? error.message : String(error)}`);
    }
    const text = await response.text();
    if (!response.ok || text.length > MAXIMUM_SERVICE_RESPONSE_BYTES) {
        throw new CatalogVerifierServiceError(`Sourcey's API answered ${url.href} with HTTP ${response.status}.`);
    }
    try {
        return JSON.parse(text);
    }
    catch {
        throw new CatalogVerifierServiceError(`Sourcey's API answered ${url.href} with no JSON.`);
    }
}
/** A service answer in the shape it promises; any other is the service's failure, not the candidate's. */
function serviceShape(schema, value, what) {
    const parsed = schema.safeParse(value);
    if (!parsed.success) {
        throw new CatalogVerifierServiceError(`Sourcey's API answered ${what} in another shape.`);
    }
    return parsed.data;
}
/** The commits a pull request adds over its base that carry no Signed-off-by line. */
async function unsignedCommits(repositoryRoot, baseRevision, headRevision) {
    const git = async (args) => (await execFileAsync("git", args, {
        cwd: repositoryRoot,
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
    })).stdout;
    const changeBase = (await git(["merge-base", baseRevision, headRevision])).trim();
    const commits = (await git(["rev-list", "--no-merges", `${changeBase}..${headRevision}`]))
        .split("\n")
        .filter(Boolean);
    const unsigned = [];
    for (const commit of commits) {
        const message = await git(["show", "-s", "--format=%B", commit]);
        if (!/^Signed-off-by: .+ <[^>]+>$/mu.test(message))
            unsigned.push(commit);
    }
    return unsigned;
}
class CatalogVerifierInputError extends Error {
}
class CatalogVerifierIdentityContextError extends Error {
}
class CatalogVerifierIdentityConflictError extends Error {
}
/** Sourcey's API could not be read: nothing about the candidate is known yet. */
class CatalogVerifierServiceError extends Error {
}
function ruleForError(error, repositoryKind) {
    return error instanceof CatalogVerifierIdentityContextError ||
        error instanceof CatalogVerifierIdentityConflictError
        ? `${repositoryKind}.identity-context`
        : primaryRule(repositoryKind);
}
function primaryRule(repositoryKind) {
    return `${repositoryKind}.changed-closure`;
}
function valid(operation, summary) {
    return catalogVerifierResultSchema.parse({
        result_contract: "sourcey.catalog-verifier-result/v1alpha1",
        operation,
        status: "valid",
        summary,
        diagnostics: [],
    });
}
function invalid(operation, diagnostic) {
    return catalogVerifierResultSchema.parse({
        result_contract: "sourcey.catalog-verifier-result/v1alpha1",
        operation,
        status: "invalid",
        summary: null,
        diagnostics: [diagnostic],
    });
}
function diagnosticFor(error, ruleId) {
    if (error instanceof CatalogVerifierIdentityConflictError) {
        return catalogVerifierDiagnosticSchema.parse({
            rule_id: ruleId,
            classification: "identity_conflict",
            path: "/identity_context",
            message: error.message,
            guidance: "Reuse the canonical Entity identity or resolve the collision before admission.",
        });
    }
    if (error instanceof CatalogVerifierIdentityContextError) {
        return catalogVerifierDiagnosticSchema.parse({
            rule_id: ruleId,
            classification: "policy_failure",
            path: "/identity_context",
            message: error.message,
            guidance: "Request a fresh identity context for the exact unchanged candidate and retry.",
        });
    }
    if (error instanceof CatalogVerifierServiceError) {
        return catalogVerifierDiagnosticSchema.parse({
            rule_id: ruleId,
            classification: "environmental_failure",
            path: null,
            message: error.message,
            guidance: "Run the same check again; the candidate itself was not judged.",
        });
    }
    if (error instanceof CatalogVerifierInputError) {
        return catalogVerifierDiagnosticSchema.parse({
            rule_id: ruleId,
            classification: "invalid_input",
            path: null,
            message: error.message,
            guidance: "Supply every exact input required by this verifier operation.",
        });
    }
    if (error instanceof z.ZodError) {
        const issue = error.issues[0];
        return catalogVerifierDiagnosticSchema.parse({
            rule_id: ruleId,
            classification: "contract_failure",
            path: issue ? jsonPointer(issue.path) : null,
            message: issue?.message ?? "Candidate bytes do not satisfy the current contract.",
            guidance: "Correct the exact candidate field and run the same verifier again.",
        });
    }
    const candidate = error;
    const environmental = typeof candidate?.code === "string";
    return catalogVerifierDiagnosticSchema.parse({
        rule_id: ruleId,
        classification: environmental ? "environmental_failure" : "contract_failure",
        path: null,
        message: error instanceof Error ? error.message : String(error),
        guidance: environmental
            ? "Restore the exact local input or Git object and retry without changing candidate bytes."
            : "Correct the candidate closure described by this rule and run the same verifier again.",
    });
}
function jsonPointer(path) {
    if (path.length === 0)
        return "/";
    return `/${path
        .map((segment) => String(segment).replaceAll("~", "~0").replaceAll("/", "~1"))
        .join("/")}`;
}
//# sourceMappingURL=application.js.map