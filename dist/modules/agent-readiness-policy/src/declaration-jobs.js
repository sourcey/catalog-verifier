import { agentReadinessBindingIssues } from "../../agent-readiness-engine/src/binding.js";
/**
 * Why a declaration cannot be rated under a policy, as declaration-relative
 * paths: its job is not one of the policy's library, or a binding does not
 * perform that job. Empty when it can be rated.
 */
export function agentReadinessDeclarationJobIssues(input) {
    const { declaration, policy } = input;
    const job = policy.job_library.jobs.find(({ job_id }) => job_id === declaration.scope.job.key);
    if (!job) {
        return [
            {
                path: "/scope/job/key",
                message: `The job library has no job '${declaration.scope.job.key}'.`,
            },
        ];
    }
    return declaration.job_bindings.flatMap((binding, index) => agentReadinessBindingIssues({ job, binding }).map((message) => ({
        path: `/job_bindings/${index}`,
        message,
    })));
}
/** Refuses a declaration its policy cannot rate. */
export function assertAgentReadinessDeclarationJobs(input) {
    const issues = agentReadinessDeclarationJobIssues(input);
    if (issues.length > 0) {
        throw new Error(`Agent Readiness declaration cannot be rated: ${issues
            .map(({ path, message }) => `${path}: ${message}`)
            .join(" ")}`);
    }
}
//# sourceMappingURL=declaration-jobs.js.map