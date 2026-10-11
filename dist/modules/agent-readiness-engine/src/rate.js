import { AGENT_READINESS_STEPS, agentReadinessLetterSchema, } from "../../../contracts/agent-readiness/src/index.js";
/**
 * The letter of a path (north star §5.7): its person-steps counted, and the
 * first letter, best first, whose allowance covers them. The job
 * `unavailable` is F whatever else the path holds, once every step it can
 * show is assessed: all of them, or none where the listing names no interface
 * for the job. Any path is null (not publishable) until then.
 */
export function rateGrade(policy, steps, job) {
    if (steps.length !== AGENT_READINESS_STEPS.length) {
        throw new Error("A path has exactly one result per step.");
    }
    const unavailable = job.outcome === "unavailable";
    const unassessed = steps.filter(({ outcome }) => outcome === "not_assessed").length;
    const interfaceless = unavailable && unassessed === steps.length;
    if (job.outcome === "not_assessed" || (unassessed > 0 && !interfaceless))
        return null;
    const approvals = steps.filter(({ outcome }) => outcome === "approval").length;
    const workarounds = steps.filter(({ outcome }) => outcome === "workaround");
    const setup = workarounds.filter(({ timing }) => timing === "setup").length;
    const recurring = workarounds.some(({ timing }) => timing === "recurring");
    const gated = steps.some(({ outcome }) => outcome === "gated");
    for (const { letter, allows } of policy.letters) {
        if ((allows.approvals === null || approvals <= allows.approvals) &&
            (allows.setup_workarounds === null || setup <= allows.setup_workarounds) &&
            (allows.recurring_workarounds || !recurring) &&
            (allows.gated || !gated) &&
            (allows.unavailable || !unavailable)) {
            return letter;
        }
    }
    throw new Error("The policy's last letter allows every path.");
}
/** Best first: the scale's order, then a path not yet graded. */
export function agentReadinessLetterRank(letter) {
    const order = agentReadinessLetterSchema.options;
    return letter === null ? order.length : order.indexOf(letter);
}
//# sourceMappingURL=rate.js.map