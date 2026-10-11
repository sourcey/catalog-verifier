import { compareInstants, digest } from "provenry/primitives";
import { AGENT_READINESS_STEPS, } from "../../../contracts/agent-readiness/src/index.js";
import { combinePaths, declaredUnavailable, evaluatePath, evaluateProbePath, notAssessed, } from "./path.js";
import { agentReadinessLetterRank, rateGrade } from "./rate.js";
/**
 * The vendor's sales or approval pages that stand between an agent and one
 * interface (north star §5.6, Onboard `gated`): one the interface names, since
 * the vendor approves who calls it whatever sign-up exists beside it; and,
 * with no sign-up endpoint, one no interface names, since the vendor decides
 * who gets an account at all. Each holds once the probe's request for it is
 * answered.
 */
export function agentReadinessAccessGates(declaration, interfaceId) {
    const own = new Set(declaration.interfaces.find(({ interface_id }) => interface_id === interfaceId)?.endpoint_ids);
    const named = new Set(declaration.interfaces.flatMap(({ endpoint_ids }) => endpoint_ids));
    const signUp = declaration.endpoints.some(({ roles }) => roles.includes("registration"));
    return declaration.endpoints
        .filter(({ endpoint_id, roles }) => roles.includes("access_request") &&
        (own.has(endpoint_id) || (!signUp && !named.has(endpoint_id))))
        .map(({ endpoint_id }) => endpoint_id);
}
/**
 * The pages one interface lists for a person's step on it (north star §5.6):
 * the `access_setting` a person on the account turns on once and the `claim`
 * page where a person claims later what the agent made alone (Onboard
 * `approval`), and the `key_renewal` page where a person replaces a key the
 * vendor expires with no API to renew it (Sustain, recurring). Each holds once
 * the probe's request for it is answered.
 */
export function agentReadinessInterfacePages(declaration, interfaceId, role) {
    const own = new Set(declaration.interfaces.find(({ interface_id }) => interface_id === interfaceId)?.endpoint_ids);
    return declaration.endpoints
        .filter(({ endpoint_id, roles }) => roles.includes(role) && own.has(endpoint_id))
        .map(({ endpoint_id }) => endpoint_id);
}
/**
 * The declaration rules out a checkout (north star §5.6, Pay): the job is free
 * on an account, or paid per call by the offer its own request answers, which
 * sets Pay before this does.
 */
export function agentReadinessCheckoutRuledOut(declaration) {
    return declaration.surface_exclusions.some(({ role }) => role === "checkout");
}
/**
 * The path of one interface (north star §5.6): its probed path, with the job
 * verified where the binding's run proved it. With no
 * interface, nothing declared performs the job: F on the declaration itself.
 * The verifier re-derives a revision's steps here, for exactly the interface
 * and binding the revision names.
 */
export function evaluateInterfacePath(input) {
    const { declaration, policy, binding } = input;
    const latestProbe = latest(input.probeRuns);
    if (!latestProbe || input.probeRuns.some(({ binding_id }) => binding_id !== null)) {
        throw new Error("A profile rests on its probe runs.");
    }
    const endpoints = new Map(declaration.endpoints.map(({ endpoint_id, uri }) => [endpoint_id, uri]));
    const bindingDigest = binding ? digest(binding) : null;
    const verifiedRuns = input.verifiedRuns.filter((run) => run.binding_id === binding?.binding_id && run.binding_digest === bindingDigest);
    const path = (() => {
        if (input.interfaceId === null) {
            if (binding)
                throw new Error("A binding performs the job through its interface.");
            if (declaration.job_operations.length > 0) {
                throw new Error("A declaration with job operations rates one of their interfaces.");
            }
            return {
                steps: AGENT_READINESS_STEPS.map(notAssessed),
                job: declaredUnavailable(latestProbe),
                reproducible: false,
                discoveryRun: null,
                verifiedRun: null,
                standingRuns: [],
            };
        }
        const operation = declaration.job_operations.find(({ interface_id }) => interface_id === input.interfaceId);
        if (!operation)
            throw new Error(`Interface ${input.interfaceId} declares no job operation.`);
        const endpoint = operation.kind === "spec" ? null : (endpoints.get(operation.endpoint_id) ?? null);
        if (operation.kind !== "spec" && endpoint === null) {
            throw new Error(`Job operation ${operation.operation_id} names no declared endpoint.`);
        }
        const probed = evaluateProbePath({
            operation,
            endpoint,
            policy,
            accessGates: agentReadinessAccessGates(declaration, operation.interface_id),
            accessSettings: agentReadinessInterfacePages(declaration, operation.interface_id, "access_setting"),
            claimPages: agentReadinessInterfacePages(declaration, operation.interface_id, "claim"),
            keyRenewalPages: agentReadinessInterfacePages(declaration, operation.interface_id, "key_renewal"),
            checkoutRuledOut: agentReadinessCheckoutRuledOut(declaration),
            runs: input.probeRuns,
        });
        if (!binding)
            return probed;
        if (binding.interface_id !== input.interfaceId || verifiedRuns.length === 0) {
            throw new Error(`Binding ${binding.binding_id} has no verified run on its interface.`);
        }
        return combinePaths(probed, evaluatePath({
            job: input.job,
            policy,
            runs: verifiedRuns,
            asOf: latestProbe.finished_at,
        }));
    })();
    const cited = new Set([
        latestProbe.run_digest,
        ...[...path.steps, path.job].flatMap(({ evidence }) => evidence.map(({ run_digest }) => run_digest)),
    ]);
    const discoveryRun = path.discoveryRun ?? latestProbe;
    cited.add(discoveryRun.run_digest);
    // A binding's path rests on the run that decided it, even one that assessed nothing; a read's
    // standing answer rests on the runs that reproduce it.
    if (path.verifiedRun)
        cited.add(path.verifiedRun.run_digest);
    for (const { run_digest } of path.standingRuns)
        cited.add(run_digest);
    // The probe runs it rests on and every one since, so the grade re-derives from them alone: a run
    // between two it rests on can end a read's standing answer.
    const probeRuns = oldestFirst(input.probeRuns);
    const since = probeRuns.findIndex(({ run_digest }) => cited.has(run_digest));
    return {
        interfaceId: input.interfaceId,
        binding,
        steps: path.steps,
        job: path.job,
        letter: rateGrade(policy, path.steps, path.job),
        runs: oldestFirst([
            ...probeRuns.slice(since),
            ...verifiedRuns.filter(({ run_digest }) => cited.has(run_digest)),
        ]),
        reproducible: path.reproducible,
        discovery: discoveryRun.discovery.facts,
        discoveryRunDigest: discoveryRun.run_digest,
    };
}
/**
 * Every interface that performs the job gives its own path: probes alone, or
 * each binding on it that has verified runs, which can only prove the job.
 * The best letter is the profile's; at the same letter a path whose job a run
 * proved comes first, then the earlier declared operation and binding.
 * `reproducible` holds only while nothing grades, since a reproduced finding
 * can only lower a letter.
 */
export function evaluateProfile(input) {
    const { declaration } = input;
    const candidates = declaration.job_operations.length === 0
        ? [{ interfaceId: null, binding: null }]
        : declaration.job_operations.flatMap(({ interface_id }) => {
            const verified = declaration.job_bindings.filter((binding) => {
                const bindingDigest = digest(binding);
                return (binding.interface_id === interface_id &&
                    input.verifiedRuns.some((run) => run.binding_id === binding.binding_id && run.binding_digest === bindingDigest));
            });
            return verified.length > 0
                ? verified.map((binding) => ({ interfaceId: interface_id, binding }))
                : [{ interfaceId: interface_id, binding: null }];
        });
    const paths = candidates.map((candidate) => evaluateInterfacePath({ ...input, ...candidate }));
    // A path whose job a run proved outranks a merely reachable one at the same letter.
    const verified = (path) => path.job.outcome === "verified";
    const best = paths.reduce((left, right) => {
        const order = agentReadinessLetterRank(right.letter) - agentReadinessLetterRank(left.letter);
        return order < 0 || (order === 0 && verified(right) && !verified(left)) ? right : left;
    });
    return {
        ...best,
        reproducible: best.letter === null && paths.some(({ reproducible }) => reproducible),
    };
}
function latest(runs) {
    return oldestFirst(runs).at(-1);
}
function oldestFirst(runs) {
    return [...runs].sort((left, right) => compareInstants(left.finished_at, right.finished_at) ||
        (left.run_digest < right.run_digest ? -1 : 1));
}
//# sourceMappingURL=profile.js.map