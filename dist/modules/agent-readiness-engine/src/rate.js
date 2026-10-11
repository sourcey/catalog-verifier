import { AGENT_READINESS_STEPS, agentReadinessLetterSchema, agentReadinessPersonStepKey, } from "../../../contracts/agent-readiness/src/index.js";
/**
 * The letter of a path (north star §5.7): the kind of each person-step it
 * holds, read from the policy, and the first letter, best first, that allows
 * every one of them and as many as there are where it names a most (A's one). The job `unavailable` is F whatever else the path holds,
 * once every step it can show is assessed: all of them, or none where the
 * listing names no interface for the job. Any path is null (not publishable)
 * until then.
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
    const kinds = steps.flatMap((step) => step.outcome === "machine" ||
        step.outcome === "not_applicable" ||
        step.outcome === "not_assessed"
        ? []
        : [personStepKind(policy, step)]);
    for (const { letter, allows } of policy.letters) {
        if ((allows.unavailable || !unavailable) &&
            (allows.most_steps === null || kinds.length <= allows.most_steps) &&
            kinds.every((kind) => allows.kinds.includes(kind))) {
            return letter;
        }
    }
    throw new Error("The policy's last letter allows every path.");
}
/** The kind the policy gives one person-step; the policy maps every step a result may hold. */
function personStepKind(policy, step) {
    const key = agentReadinessPersonStepKey(step);
    const rule = policy.person_steps.find((candidate) => agentReadinessPersonStepKey(candidate) === key);
    if (!rule)
        throw new Error(`The policy gives no kind to ${key}.`);
    return rule.kind;
}
/** Best first: the scale's order, then a path not yet graded. */
export function agentReadinessLetterRank(letter) {
    const order = agentReadinessLetterSchema.options;
    return letter === null ? order.length : order.indexOf(letter);
}
//# sourceMappingURL=rate.js.map