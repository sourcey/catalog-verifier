import { agentReadinessBindingIssues, } from "../../../contracts/agent-readiness/src/binding.js";
/**
 * Why a declaration cannot be rated, as declaration-relative paths: its job is
 * not in the job library, or a binding does not perform that job. Empty when
 * it can be rated. Only the library decides this, never the grading rules.
 */
export function agentReadinessDeclarationJobIssues(input) {
    const { declaration, jobLibrary } = input;
    const job = jobLibrary.jobs.find(({ job_id }) => job_id === declaration.scope.job.key);
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
/** Refuses a declaration its job library cannot rate. */
export function assertAgentReadinessDeclarationJobs(input) {
    const issues = agentReadinessDeclarationJobIssues(input);
    if (issues.length > 0) {
        throw new Error(`Agent Readiness declaration cannot be rated: ${issues
            .map(({ path, message }) => `${path}: ${message}`)
            .join(" ")}`);
    }
}
//# sourceMappingURL=declaration-jobs.js.map