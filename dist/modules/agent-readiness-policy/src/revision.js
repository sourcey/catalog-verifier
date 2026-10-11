import { canonicalJson, digest } from "provenry/primitives";
import { agentReadinessDeclarationRevisionCoreSchema, agentReadinessDeclarationRevisionSchema, agentReadinessProfileInputSchema, agentReadinessRevisionContract, agentReadinessRevisionCoreSchema, agentReadinessRevisionSchema, sameAgentReadinessScopeIdentity, } from "../../../contracts/agent-readiness/src/index.js";
import { agentReadinessBindingIssues } from "../../agent-readiness-engine/src/binding.js";
import { evaluateInterfacePath } from "../../agent-readiness-engine/src/profile.js";
import { rateGrade } from "../../agent-readiness-engine/src/rate.js";
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
 * An input whose grade is exactly what the engine derives from its run
 * records, under the pinned policy and the job library it carries, for the
 * interface and binding it names in its declaration revision: every step, a
 * letter, and the discovery facts. Anything else is refused.
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
    const binding = profile.binding_id === null
        ? null
        : declaration.job_bindings.find(({ binding_id }) => binding_id === profile.binding_id);
    if (binding === undefined || (binding && digest(binding) !== profile.binding_digest)) {
        return fail("its binding is not the one its declaration declares.");
    }
    if (binding) {
        const issues = agentReadinessBindingIssues({ job, binding });
        if (issues.length > 0)
            fail(issues.join(" "));
    }
    let path;
    try {
        path = evaluateInterfacePath({
            job,
            declaration,
            policy: input.policy,
            interfaceId: profile.interface_id,
            binding,
            probeRuns: runs.filter(({ binding_id }) => binding_id === null),
            verifiedRuns: runs.filter(({ binding_id }) => binding_id !== null),
        });
    }
    catch (error) {
        return fail(error instanceof Error ? error.message : String(error));
    }
    if (canonicalJson(path.steps) !== canonicalJson(profile.steps)) {
        fail("its steps are not the ones its runs establish.");
    }
    if (canonicalJson(path.job) !== canonicalJson(profile.job)) {
        fail("its job is not the one its runs establish.");
    }
    if (canonicalJson(path.runs.map(({ run_digest }) => run_digest)) !==
        canonicalJson(runs.map(({ run_digest }) => run_digest))) {
        fail("its runs are not exactly the ones its steps rest on.");
    }
    if (rateGrade(input.policy, path.steps, path.job) === null) {
        fail("it has a step or its job not yet assessed.");
    }
    if (canonicalJson(path.discovery) !== canonicalJson(profile.discovery) ||
        path.discoveryRunDigest !== profile.discovery_run_digest) {
        fail("its discovery facts are not the ones that decided Discover.");
    }
    const latest = runs.at(-1);
    if (!latest ||
        canonicalJson(summarizeAgentReadinessRun(latest)) !== canonicalJson(profile.latest_run)) {
        fail("its latest run summary is not its latest run's.");
    }
    return profile;
}
//# sourceMappingURL=revision.js.map