import { agentReadinessBindingCalls, agentReadinessCallTemplates, agentReadinessRequestTemplate, agentReadinessTemplateReferences, } from "../../../contracts/agent-readiness/src/index.js";
import { agentReadinessAssertionProof, OBSERVED_CALL_METHODS } from "./assertions.js";
import { valueAtPointer } from "./templates.js";
/**
 * Why a binding cannot perform its library job, or nothing. A binding maps
 * every library observation exactly once, reads only the job's inputs and sinks,
 * places the run's nonce wherever it locates a request observation, and cleans
 * up when the job is consequential. Whether its calls stay on its declared
 * surface is the declaration's own rule, checked where it is parsed.
 */
export function agentReadinessBindingIssues(input) {
    const { job, binding } = input;
    const issues = [];
    const mapped = binding.assertions.map(({ assertion }) => assertion);
    const required = job.assertions.map(({ name }) => name);
    for (const name of required) {
        if (!mapped.includes(name))
            issues.push(`Assertion ${name} is not mapped.`);
    }
    for (const name of mapped) {
        if (!required.includes(name))
            issues.push(`Assertion ${name} is not one of ${job.job_id}'s.`);
    }
    const calls = new Map(binding.calls.map((call) => [call.call_id, call]));
    const nonces = new Set([
        "{{run.nonce}}",
        ...job.inputs.flatMap(({ kind, name }) => (kind === "nonce" ? [`{{input.${name}}}`] : [])),
    ]);
    for (const assertion of job.assertions) {
        const located = binding.assertions.find(({ assertion: name }) => name === assertion.name);
        if (!located)
            continue;
        const proof = agentReadinessAssertionProof(assertion.proof);
        const observations = new Map(located.observations.map((item) => [item.name, item]));
        for (const required of proof.observations) {
            const observed = observations.get(required.name);
            if (!observed) {
                issues.push(`Assertion ${assertion.name} does not locate ${required.name}.`);
                continue;
            }
            if (observed.source !== required.source) {
                issues.push(`Assertion ${assertion.name}'s ${required.name} must read ${required.source}.`);
            }
            const call = calls.get(observed.call);
            if (call?.kind === "http" &&
                required.method &&
                !OBSERVED_CALL_METHODS[required.method].includes(call.method)) {
                issues.push(`Assertion ${assertion.name}'s ${required.name} needs a ${required.method} call.`);
            }
            if (call && required.source === "request" && observed.source === "request") {
                const template = valueAtPointer(agentReadinessRequestTemplate(call), observed.pointer);
                if (typeof template !== "string" || !nonces.has(template)) {
                    issues.push(`Assertion ${assertion.name}'s ${required.name} must locate the run's nonce in the request.`);
                }
            }
        }
        for (const name of observations.keys()) {
            if (!proof.observations.some((operand) => operand.name === name)) {
                issues.push(`Observation ${name} is not one of ${assertion.name}'s.`);
            }
        }
        for (const [left, right] of proof.sameCall ?? []) {
            const a = observations.get(left);
            const b = observations.get(right);
            if (a && b && a.call !== b.call)
                issues.push(`Assertion ${assertion.name}'s ${left} and ${right} must read the same call.`);
        }
        for (const [left, right] of proof.differentCall ?? []) {
            const a = observations.get(left);
            const b = observations.get(right);
            if (a && b && a.call === b.call)
                issues.push(`Assertion ${assertion.name}'s ${left} and ${right} must read different calls.`);
        }
        for (const [left, right] of proof.independentCall ?? []) {
            const a = observations.get(left);
            const b = observations.get(right);
            const sent = a && calls.get(a.call);
            const reads = (template) => agentReadinessTemplateReferences(template)?.some((reference) => reference.kind === "call" && reference.callId === b?.call);
            if (b && sent && agentReadinessCallTemplates(sent).some(reads))
                issues.push(`Assertion ${assertion.name}'s ${left} must not read ${right}'s call.`);
        }
    }
    for (const { from, to } of job.observation_links) {
        const locate = (reference) => binding.assertions
            .find(({ assertion }) => assertion === reference.assertion)
            ?.observations.find(({ name }) => name === reference.observation);
        const left = locate(from);
        const right = locate(to);
        if (left && right && left.call !== right.call) {
            issues.push(`${from.assertion}.${from.observation} and ${to.assertion}.${to.observation} must read the same call.`);
        }
    }
    const values = new Set(job.inputs.filter(({ kind }) => kind !== "sink").map(({ name }) => name));
    const sinks = new Set(job.inputs.filter(({ kind }) => kind === "sink").map(({ name }) => name));
    const templates = agentReadinessBindingCalls(binding).flatMap(({ call }) => agentReadinessCallTemplates(call));
    for (const template of templates) {
        for (const reference of agentReadinessTemplateReferences(template) ?? []) {
            if (reference.kind === "input" && !values.has(reference.name)) {
                issues.push(`Input ${reference.name} is not one of the job's.`);
            }
            if (reference.kind === "sink" && !sinks.has(reference.name)) {
                issues.push(`Sink ${reference.name} is not one of the job's.`);
            }
        }
    }
    if (job.cleanup === "required" && binding.cleanup.length === 0) {
        issues.push(`${job.job_id} is consequential; the binding must clean up after it.`);
    }
    return [...new Set(issues)];
}
//# sourceMappingURL=binding.js.map