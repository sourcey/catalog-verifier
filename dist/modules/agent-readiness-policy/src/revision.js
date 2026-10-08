import { canonicalJson, digest } from "provenry/primitives";
import { agentReadinessDeclarationRevisionCoreSchema, agentReadinessDeclarationRevisionSchema, agentReadinessProfileInputSchema, agentReadinessRevisionContract, agentReadinessRevisionCoreSchema, agentReadinessRevisionSchema, sameAgentReadinessScopeIdentity, } from "../../../contracts/agent-readiness/src/index.js";
import { agentReadinessBindingIssues } from "../../agent-readiness-engine/src/binding.js";
import { evaluatePath, unexercisedPath } from "../../agent-readiness-engine/src/path.js";
import { onboardLevelFromOperate } from "../../agent-readiness-engine/src/rate.js";
import { summarizeAgentReadinessRun, verifyAgentReadinessRunRecord, } from "../../agent-readiness-engine/src/run.js";
import { agentReadinessJobDigest } from "../../agent-readiness-jobs/src/index.js";
/** The revision an input compiles to: its fields, without the run records they rest on. */
export function compileAgentReadinessRevision(input) {
    const { input_contract: _contract, run_records: _records, ...fields } = agentReadinessProfileInputSchema.parse(input);
    const core = agentReadinessRevisionCoreSchema.parse({
        revision_contract: agentReadinessRevisionContract,
        ...fields,
    });
    return agentReadinessRevisionSchema.parse({ ...core, revision_digest: digest(core) });
}
/**
 * An input whose ratings are exactly what the engine derives from its run
 * records, under the pinned policy and the job library it carries, for the
 * binding its declaration revision declares: every step, the Onboard level and
 * the discovery facts. Anything else is refused.
 */
export function verifyAgentReadinessProfileInput(input) {
    const profile = agentReadinessProfileInputSchema.parse(input.profileInput);
    const declarationRevision = agentReadinessDeclarationRevisionSchema.parse(input.declarationRevision);
    const { revision_digest: declarationDigest, ...declarationCore } = declarationRevision;
    const { declaration } = declarationRevision;
    const fail = (message) => {
        throw new Error(`Agent Readiness profile ${profile.agent_readiness_profile_id}: ${message}`);
    };
    if (digest(agentReadinessDeclarationRevisionCoreSchema.parse(declarationCore)) !==
        declarationDigest ||
        profile.declaration_revision_digest !== declarationDigest ||
        profile.entity_id !== declarationRevision.entity_id ||
        !sameAgentReadinessScopeIdentity(profile.scope, declaration.scope)) {
        fail("its input does not bind its declaration revision.");
    }
    const job = input.policy.job_library.jobs.find(({ job_id }) => job_id === profile.scope.job.key);
    if (!job)
        return fail(`the policy's job library has no job ${profile.scope.job.key}.`);
    if (agentReadinessJobDigest(job) !== profile.job_digest) {
        fail("its runs performed a job other than the policy's.");
    }
    const runs = profile.run_records.map(verifyAgentReadinessRunRecord);
    if (profile.binding_id === null) {
        // A listing no binding has run: discovery only, nothing assessed.
        if (runs.some(({ binding_id }) => binding_id !== null)) {
            fail("its runs used a binding its input does not name.");
        }
        if (canonicalJson(unexercisedPath()) !== canonicalJson(profile.steps)) {
            fail("a listing with no binding assesses no step.");
        }
    }
    else {
        const binding = declaration.job_bindings.find(({ binding_id }) => binding_id === profile.binding_id);
        if (!binding || digest(binding) !== profile.binding_digest) {
            return fail("its binding is not the one its declaration declares.");
        }
        const endpoints = new Map(declaration.endpoints.map(({ endpoint_id, uri }) => [endpoint_id, uri]));
        const issues = agentReadinessBindingIssues({ job, binding });
        if (issues.length > 0)
            fail(issues.join(" "));
        const path = evaluatePath({
            job,
            binding,
            policy: input.policy,
            runs,
            endpoints,
        });
        if (canonicalJson(path.steps) !== canonicalJson(profile.steps)) {
            fail("its steps are not the ones its runs establish.");
        }
        if (onboardLevelFromOperate(binding, path.steps) !== profile.onboard_level) {
            fail("its Onboard level is not the one its runs establish.");
        }
    }
    const latest = runs.at(-1);
    if (!latest || canonicalJson(latest.discovery.facts) !== canonicalJson(profile.discovery)) {
        fail("its discovery facts are not its latest run's.");
    }
    if (!latest ||
        canonicalJson(summarizeAgentReadinessRun(latest)) !== canonicalJson(profile.latest_run)) {
        fail("its latest run summary is not its latest run's.");
    }
    return profile;
}
//# sourceMappingURL=revision.js.map