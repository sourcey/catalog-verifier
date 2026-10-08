import { AGENT_READINESS_STEPS } from "../../../contracts/agent-readiness/src/index.js";
/**
 * The Operate letter of a path, by the policy's rules: a blocked Delegation or
 * Pay is D and a blocked Job is F; otherwise the job must have been exercised,
 * and the first letter, best first, whose condition and coverage both hold is
 * the letter. A lower letter is never inferred: each asserts a recurring
 * workaround that would have to be observed.
 */
export function rateOperate(policy, steps) {
    const outcome = new Map(steps.map((step) => [step.step, step]));
    if (outcome.size !== AGENT_READINESS_STEPS.length) {
        throw new Error("A path has exactly one result per step.");
    }
    const missing = AGENT_READINESS_STEPS.filter((step) => outcome.get(step)?.outcome === "not_assessed");
    const blocked = (step) => outcome.get(step)?.outcome === "blocked";
    if (blocked("delegation") || blocked("pay"))
        return { letter: "D", missing };
    if (blocked("job"))
        return { letter: "F", missing };
    const job = outcome.get("job")?.outcome;
    if (job !== "machine" && job !== "approval" && job !== "workaround") {
        return { letter: null, missing };
    }
    const workarounds = steps.filter(({ outcome }) => outcome === "workaround");
    const recurring = workarounds
        .filter(({ timing }) => timing === "recurring")
        .map(({ step }) => step);
    const setup = workarounds.filter(({ timing }) => timing === "setup").length;
    for (const rule of policy.letters) {
        const { condition } = rule;
        const holds = (condition.workarounds_allowed || workarounds.length === 0) &&
            recurring.every((step) => condition.recurring_allowed_in.includes(step)) &&
            (condition.recurring_required_in === null ||
                recurring.some((step) => condition.recurring_required_in?.includes(step))) &&
            setup >= condition.setup_workarounds.minimum &&
            (condition.setup_workarounds.maximum === null ||
                setup <= condition.setup_workarounds.maximum) &&
            rule.coverage.every((step) => outcome.get(step)?.outcome !== "not_assessed");
        if (holds)
            return { letter: rule.letter, missing };
    }
    return { letter: null, missing };
}
/**
 * The Onboard level the Operate path alone establishes: 1 when the exercised
 * job needed no account (no credential, and no payment or payment per call).
 * Levels 2 to 6 come only from onboarding runs; otherwise not yet assessed.
 */
export function onboardLevelFromOperate(binding, steps) {
    const outcome = new Map(steps.map((step) => [step.step, step.outcome]));
    const exercised = ["machine", "approval", "workaround"].includes(outcome.get("job") ?? "");
    const accountless = outcome.get("delegation") === "not_applicable";
    const payment = outcome.get("pay") === "not_applicable" ||
        (binding.payment.kind === "per_call" && outcome.get("pay") === "machine");
    return exercised && accountless && payment ? 1 : null;
}
//# sourceMappingURL=rate.js.map