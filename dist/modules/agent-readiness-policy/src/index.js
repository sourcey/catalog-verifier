import { canonicalJson, digest } from "provenry/primitives";
import { agentReadinessDeclarationRevisionCoreSchema, agentReadinessDeclarationRevisionSchema, agentReadinessProjectionCoreSchema, agentReadinessProjectionSchema, agentReadinessRevisionSchema, sameAgentReadinessScopeIdentity, } from "../../../contracts/agent-readiness/src/index.js";
import { agentReadinessCanonicalPath } from "../../../contracts/routes/src/index.js";
import { rateOperate } from "../../agent-readiness-engine/src/rate.js";
import { agentReadinessJobDigest } from "../../agent-readiness-jobs/src/index.js";
import { deriveSubjectStanding } from "../../provenance/src/index.js";
import { priorAgentReadinessVisibility } from "./prior-projection.js";
export * from "./current-policy.js";
export * from "./declaration-jobs.js";
export * from "./impact.js";
export * from "./offer-relations.js";
export * from "./operate-policy.js";
export * from "./prior-projection.js";
export * from "./revision.js";
/**
 * The projection a release publishes for one revision: the Operate letter the
 * pinned policy gives its steps, its Onboard level and evidence label, the
 * human boundaries a reader sees, and whether it is discoverable. Freshness is
 * served from the freshness index, never released. Nothing here reads
 * documentation or calls out.
 */
export function deriveAgentReadinessProjection(input) {
    const revision = agentReadinessRevisionSchema.parse(input.revision);
    const declarationRevision = agentReadinessDeclarationRevisionSchema.parse(input.declarationRevision);
    const { revision_digest: declarationDigest, ...declarationCore } = declarationRevision;
    if (digest(agentReadinessDeclarationRevisionCoreSchema.parse(declarationCore)) !==
        declarationDigest ||
        revision.declaration_revision_digest !== declarationDigest ||
        revision.entity_id !== declarationRevision.entity_id ||
        !sameAgentReadinessScopeIdentity(revision.scope, declarationRevision.declaration.scope)) {
        throw new Error("Agent Readiness projection does not bind its exact declaration revision and scope.");
    }
    const { policy } = input;
    const job = policy.job_library.jobs.find(({ job_id }) => job_id === revision.scope.job.key);
    if (job && agentReadinessJobDigest(job) !== revision.job_digest) {
        throw new Error(`Agent Readiness profile ${revision.agent_readiness_profile_id} ran a job this policy changed; it needs new runs.`);
    }
    const binding = revision.binding_id === null
        ? null
        : declarationRevision.declaration.job_bindings.find(({ binding_id }) => binding_id === revision.binding_id);
    if (!job || binding === undefined) {
        throw new Error("Agent Readiness projection names a job or binding it cannot resolve.");
    }
    if (!Number.isFinite(Date.parse(input.policyAsOf))) {
        throw new Error("Agent Readiness projection policy time is invalid.");
    }
    const rating = rateOperate(policy, revision.steps);
    const rule = policy.letters.find(({ letter }) => letter === rating.letter);
    const latest = revision.runs.at(-1);
    const standing = deriveSubjectStanding({
        revisionDigest: revision.revision_digest,
        authorityEntityRevision: input.authorityEntityRevision,
        graph: input.graph,
        policyAsOf: input.policyAsOf,
    });
    const reasons = [
        ...(revision.lifecycle === "active" ? [] : ["lifecycle_not_active"]),
        ...(standing.dispute === "open" ? ["open_dispute"] : []),
    ];
    const prior = priorAgentReadinessVisibility(revision, input.priorProjection);
    const { declaration } = declarationRevision;
    const core = agentReadinessProjectionCoreSchema.parse({
        projection_contract: "sourcey.agent-readiness-projection/v1alpha1",
        agent_readiness_profile_id: revision.agent_readiness_profile_id,
        entity_id: revision.entity_id,
        scope: revision.scope,
        catalog_binding: revision.catalog_binding,
        declaration_revision_digest: revision.declaration_revision_digest,
        declaration: revision.declaration,
        surface_catalog: {
            participants: declaration.participants,
            resources: declaration.resources,
            endpoints: declaration.endpoints,
            interfaces: declaration.interfaces,
            relations: declaration.relations,
            surface_exclusions: declaration.surface_exclusions,
        },
        lifecycle: revision.lifecycle,
        effective_from: revision.effective_from,
        ...(revision.effective_until ? { effective_until: revision.effective_until } : {}),
        revision_digest: revision.revision_digest,
        policy_digest: policy.policy_digest,
        policy_version: policy.policy_version,
        policy_as_of: input.policyAsOf,
        job: {
            job_id: job.job_id,
            job_digest: revision.job_digest,
            category: job.category,
            name: job.name,
            statement: job.statement,
        },
        interface_id: binding?.interface_id ?? null,
        label: latest.label,
        operate: {
            letter: rating.letter,
            statement: rating.letter === "D" || rating.letter === "F"
                ? policy.blocked.statements[rating.letter]
                : (rule?.statement ?? null),
            steps: revision.steps.map(({ step, outcome, timing }) => ({ step, outcome, timing })),
            missing: rating.missing,
            approvals: revision.steps
                .filter(({ outcome }) => outcome === "approval")
                .map(({ step }) => step),
            workarounds: revision.steps.flatMap(({ step, outcome, timing }) => outcome === "workaround" && timing ? [{ step, timing }] : []),
        },
        onboard: { level: revision.onboard_level },
        discovery: revision.discovery,
        run: {
            ...revision.latest_run,
            assertions: revision.latest_run.assertions.map((result) => {
                const assertion = job.assertions.find(({ name }) => name === result.assertion);
                if (!assertion) {
                    throw new Error(`Agent Readiness run reports assertion ${result.assertion}, which its job lacks.`);
                }
                return { ...result, statement: assertion.statement };
            }),
        },
        last_run_at: latest.finished_at,
        publication: {
            visibility: reasons.length === 0
                ? "discoverable"
                : prior === "discoverable" || prior === "resolvable_only"
                    ? "resolvable_only"
                    : "private",
            reasons,
        },
        provenance: standing,
        canonical_url: canonicalUrl(input.entitySlug, revision),
    });
    return agentReadinessProjectionSchema.parse({ ...core, projection_digest: digest(core) });
}
function verifyAgentReadinessProjection(input) {
    const projection = agentReadinessProjectionSchema.parse(input);
    const { projection_digest: projectionDigest, ...coreInput } = projection;
    const core = agentReadinessProjectionCoreSchema.parse(coreInput);
    if (digest(core) !== projectionDigest) {
        throw new Error("Agent Readiness projection digest mismatch.");
    }
    return projection;
}
/** The same revision under a newer policy or a later policy instant. */
export function regradeAgentReadinessProjection(input) {
    const revision = agentReadinessRevisionSchema.parse(input.revision);
    const prior = verifyAgentReadinessProjection(input.priorProjection);
    assertCurrentAgentReadinessProjectionRevision(prior, revision);
    if (Date.parse(input.policyAsOf) < Date.parse(prior.policy_as_of)) {
        throw new Error("Agent Readiness regrade cannot move its policy instant backwards.");
    }
    return deriveAgentReadinessProjection(input);
}
/**
 * Move only the public route of an immutable projection: every assessed fact,
 * letter and publication decision is kept byte for byte.
 */
export function reprojectAgentReadinessCanonicalRoute(input) {
    const revision = agentReadinessRevisionSchema.parse(input.revision);
    const prior = verifyAgentReadinessProjection(input.priorProjection);
    assertCurrentAgentReadinessProjectionRevision(prior, revision);
    const { projection_digest: _projectionDigest, ...priorCore } = prior;
    const core = agentReadinessProjectionCoreSchema.parse({
        ...priorCore,
        canonical_url: canonicalUrl(input.entitySlug, revision),
    });
    return agentReadinessProjectionSchema.parse({ ...core, projection_digest: digest(core) });
}
/** A relocation changes the locator, never the immutable assessment facts. */
export function isAgentReadinessRouteOnlySuccession(prior, current) {
    const { canonical_url: priorUrl, projection_digest: _priorDigest, ...priorFacts } = prior;
    const { canonical_url: currentUrl, projection_digest: _currentDigest, ...currentFacts } = current;
    return priorUrl !== currentUrl && canonicalJson(priorFacts) === canonicalJson(currentFacts);
}
/** A route move when that is all that changed; otherwise the revision re-rated. */
export function deriveAgentReadinessReprojection(input) {
    const routeProjection = reprojectAgentReadinessCanonicalRoute(input);
    return isAgentReadinessRouteOnlySuccession(input.priorProjection, input.currentProjection) &&
        canonicalJson(routeProjection) === canonicalJson(input.currentProjection)
        ? routeProjection
        : regradeAgentReadinessProjection(input);
}
function assertCurrentAgentReadinessProjectionRevision(prior, revision) {
    if (prior.agent_readiness_profile_id !== revision.agent_readiness_profile_id ||
        prior.revision_digest !== revision.revision_digest ||
        prior.entity_id !== revision.entity_id ||
        canonicalJson(prior.scope) !== canonicalJson(revision.scope) ||
        canonicalJson(prior.catalog_binding) !== canonicalJson(revision.catalog_binding) ||
        prior.declaration_revision_digest !== revision.declaration_revision_digest ||
        canonicalJson(prior.declaration) !== canonicalJson(revision.declaration) ||
        prior.lifecycle !== revision.lifecycle ||
        prior.effective_from !== revision.effective_from ||
        prior.effective_until !== revision.effective_until) {
        throw new Error("Agent Readiness projection does not bind the exact current revision.");
    }
}
function canonicalUrl(entitySlug, revision) {
    return `https://sourcey.com${agentReadinessCanonicalPath({
        entity_slug: entitySlug,
        product_key: revision.scope.product.key,
        job_key: revision.scope.job.key,
    })}`;
}
//# sourceMappingURL=index.js.map