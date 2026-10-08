import { compareInstants } from "provenry/primitives";
import { AGENT_READINESS_STEPS, } from "../../../contracts/agent-readiness/src/index.js";
const MAXIMUM_EVIDENCE = 32;
/** Facts that name an interface an agent can call; others (metadata, registration) do not. */
const NAMING_FACTS = new Set([
    "mcp_endpoint",
    "ard_entry",
    "api_catalog_link",
    "openapi_server",
    "oauth_protected_resource",
]);
/**
 * The Operate path a profile's runs establish: one outcome per step, each
 * resting on entries of the runs. The latest run decides every step; earlier
 * runs count only to reproduce a refusal, the one way a step is `blocked`.
 * Documentation never enters: only exchanges, discovery attempts, recorded
 * credentials and recorded human steps.
 */
export function evaluatePath(input) {
    const runs = [...input.runs].sort((left, right) => compareInstants(left.finished_at, right.finished_at) ||
        (left.run_digest < right.run_digest ? -1 : 1));
    const current = runs.at(-1);
    if (!current)
        throw new Error("A path needs at least one run.");
    const { job, binding } = input;
    const succeeded = (run) => run.assertions.length === job.assertions.length &&
        job.assertions.every(({ name }) => run.assertions.some(({ assertion, holds }) => assertion === name && holds));
    const ok = succeeded(current);
    const jobEvidence = exchangeEvidence(current, (entry) => entry.purpose === "job");
    const refusal = (purpose) => reproducedRefusal(runs, purpose, input.policy.blocked);
    const jobRefusal = ok ? null : refusal("job");
    const jobStep = (() => {
        if (ok)
            return result("job", "machine", null, jobEvidence);
        if (jobRefusal && jobRefusal.status !== 402) {
            return result("job", "blocked", null, jobRefusal.evidence);
        }
        return notAssessed("job");
    })();
    const usedRoles = [...new Set(binding.calls.flatMap(({ credentials }) => credentials))];
    const delegationStep = (() => {
        if (binding.delegation.kind === "none") {
            return ok && usedRoles.length === 0
                ? result("delegation", "not_applicable", null, jobEvidence)
                : notAssessed("delegation");
        }
        const delegationRefusal = refusal("delegation");
        if (delegationRefusal)
            return result("delegation", "blocked", null, delegationRefusal.evidence);
        // The authority the job actually carried: the handles on its own requests.
        const carried = new Set(current.exchanges.flatMap((entry) => entry.purpose === "job" && entry.role === "request"
            ? entry.record.request.credentials.map(({ handle_digest }) => handle_digest)
            : []));
        const held = current.credentials.filter(({ handle_digest }) => carried.has(handle_digest));
        if (usedRoles.length === 0 || held.length === 0 || held.length !== carried.size) {
            return notAssessed("delegation");
        }
        const evidence = held.map((source) => ({
            kind: "credential",
            run_digest: current.run_digest,
            handle_digest: source.handle_digest,
        }));
        const issuedBy = new Set(held.flatMap(({ source }) => (source.kind === "issued" ? [source.exchange_digest] : [])));
        evidence.push(...exchangeEvidence(current, (entry) => issuedBy.has(entry.record.exchange_digest)));
        if (held.some(({ source }) => source.kind === "entered")) {
            return result("delegation", "workaround", "setup", evidence);
        }
        return binding.delegation.kind === "oauth"
            ? result("delegation", "approval", "setup", evidence)
            : result("delegation", "machine", null, evidence);
    })();
    const payStep = (() => {
        if (jobRefusal?.status === 402)
            return result("pay", "blocked", null, jobRefusal.evidence);
        if (binding.payment.kind === "none") {
            return ok ? result("pay", "not_applicable", null, jobEvidence) : notAssessed("pay");
        }
        return human(current, "pay", ok ? jobEvidence : []) ?? notAssessed("pay");
    })();
    const confirmStep = (() => {
        if (!ok || current.error_probe === null)
            return notAssessed("confirm");
        const evidence = [
            ...jobEvidence,
            ...exchangeEvidence(current, (entry) => entry.purpose === "error_probe"),
        ];
        return current.error_probe.typed
            ? result("confirm", "machine", null, evidence)
            : result("confirm", "workaround", "recurring", evidence);
    })();
    const discoverStep = (() => {
        const { attempts, facts } = current.discovery;
        if (attempts.length === 0)
            return notAssessed("discover");
        const used = binding.calls.flatMap(({ endpoint_id }) => {
            const uri = input.endpoints.get(endpoint_id);
            return uri ? [uri] : [];
        });
        const named = facts.filter((fact) => NAMING_FACTS.has(fact.fact) && used.some((uri) => namesEndpoint(fact.value, uri)));
        const evidence = (named.length > 0 ? named.map(({ attempt_digest }) => attempt_digest) : attempts).map((attempt) => ({
            kind: "discovery",
            run_digest: current.run_digest,
            attempt_digest: attempt,
        }));
        return named.length > 0
            ? result("discover", "machine", null, evidence)
            : result("discover", "workaround", "setup", evidence);
    })();
    const sustainStep = (() => {
        if (binding.delegation.kind === "none") {
            return ok ? result("sustain", "not_applicable", null, jobEvidence) : notAssessed("sustain");
        }
        const { rotation, revocation } = binding.sustain;
        const handoffs = current.handoffs.flatMap((handoff, index) => handoff.step === "sustain" ? [index] : []);
        const evidence = [
            ...exchangeEvidence(current, (entry) => entry.purpose.startsWith("sustain_")),
            ...handoffs.map((handoff) => ({ kind: "handoff", run_digest: current.run_digest, handoff })),
        ];
        const witnessed = upkeepWitnesses(current);
        const part = (kind, purpose) => {
            if (kind === "manual")
                return handoffs.some((index) => current.handoffs[index]?.kind === "workaround")
                    ? "workaround"
                    : "not_assessed";
            return (purpose === "sustain_rotation" ? witnessed.rotation : witnessed.revocation)
                ? "machine"
                : "not_assessed";
        };
        const parts = [
            part(rotation.kind, "sustain_rotation"),
            part(revocation.kind, "sustain_revocation"),
        ];
        if (parts.includes("not_assessed"))
            return notAssessed("sustain");
        return parts.includes("workaround")
            ? result("sustain", "workaround", "recurring", evidence)
            : result("sustain", "machine", null, evidence);
    })();
    return {
        runDigest: current.run_digest,
        steps: [discoverStep, delegationStep, payStep, jobStep, confirmStep, sustainStep].map((step) => step.outcome === "not_assessed" || step.outcome === "blocked"
            ? step
            : (human(current, step.step, step.evidence, step) ?? step)),
    };
}
/** Accepted maintenance requests are not effects: correlate their readbacks. */
function upkeepWitnesses(run) {
    const at = (purpose) => run.exchanges.findIndex((entry) => entry.purpose === purpose && entry.role === "request");
    const baselineAt = at("sustain_baseline");
    const rotationAt = at("sustain_rotation");
    const rotatedAt = at("sustain_rotated_probe");
    const revokeAt = at("sustain_revocation");
    const refusedAt = at("sustain_revoked_probe");
    const controlAt = at("sustain_control_probe");
    const baseline = run.exchanges[baselineAt];
    const rotation = run.exchanges[rotationAt];
    const rotated = run.exchanges[rotatedAt];
    const revoke = run.exchanges[revokeAt];
    const refused = run.exchanges[refusedAt];
    const control = run.exchanges[controlAt];
    const succeeded = (entry) => entry?.record.outcome === "responded" &&
        entry.record.response.status >= 200 &&
        entry.record.response.status <= 299;
    const handles = (entry) => entry?.record.request.credentials.map(({ handle_digest }) => handle_digest) ?? [];
    const sameHandles = (a, b) => {
        const left = handles(a);
        const right = handles(b);
        return (left.length > 0 &&
            left.length === right.length &&
            left.every((handle) => right.includes(handle)));
    };
    const sameProbe = (a, b) => a !== undefined &&
        b !== undefined &&
        a.record.request.method === "GET" &&
        b.record.request.method === "GET" &&
        a.record.request.url === b.record.request.url &&
        a.record.request.body === null &&
        b.record.request.body === null;
    const issued = handles(rotated).length > 0 &&
        handles(rotated).every((handle) => run.credentials.some((credential) => credential.handle_digest === handle &&
            credential.source.kind === "issued" &&
            credential.source.exchange_digest === rotation?.record.exchange_digest));
    const renewed = baselineAt >= 0 &&
        baselineAt < rotationAt &&
        rotationAt < rotatedAt &&
        succeeded(baseline) &&
        succeeded(rotation) &&
        succeeded(rotated) &&
        sameProbe(baseline, rotated) &&
        issued &&
        handles(rotated).every((handle) => !handles(baseline).includes(handle));
    const activeAt = rotatedAt >= 0 ? rotatedAt : baselineAt;
    const active = run.exchanges[activeAt];
    const revoked = activeAt >= 0 &&
        activeAt < revokeAt &&
        revokeAt < refusedAt &&
        refusedAt < controlAt &&
        succeeded(active) &&
        succeeded(revoke) &&
        succeeded(control) &&
        refused?.record.outcome === "responded" &&
        [401, 403].includes(refused.record.response.status) &&
        sameHandles(active, refused) &&
        sameProbe(active, refused) &&
        sameProbe(refused, control) &&
        handles(control).length > 0 &&
        handles(control).every((handle) => !handles(refused).includes(handle));
    return { rotation: renewed, revocation: revoked };
}
/** A listing no binding has run: every step not assessed, so no letter. */
export function unexercisedPath() {
    return AGENT_READINESS_STEPS.map(notAssessed);
}
/**
 * Every human step the runner recorded at `step`. A workaround dominates
 * approval, and recurrence is decided among handoffs of that outcome: a
 * recurring consent must not turn a one-time mechanical setup into recurring
 * work. All handoffs remain evidence, independent of their input order.
 */
function human(run, step, evidence, inferred) {
    const handoffs = run.handoffs.flatMap((handoff, index) => handoff.step === step ? [{ handoff, index }] : []);
    if (handoffs.length === 0)
        return null;
    const kind = inferred?.outcome === "workaround" ||
        handoffs.some(({ handoff }) => handoff.kind === "workaround")
        ? "workaround"
        : "approval";
    const timing = (inferred?.outcome === kind && inferred.timing === "recurring") ||
        handoffs.some(({ handoff }) => handoff.kind === kind && handoff.timing === "recurring")
        ? "recurring"
        : "setup";
    return result(step, kind, timing, [
        ...evidence,
        ...handoffs
            .filter(({ index }) => !evidence.some((entry) => entry.kind === "handoff" &&
            entry.run_digest === run.run_digest &&
            entry.handoff === index))
            .map(({ index }) => ({ kind: "handoff", run_digest: run.run_digest, handoff: index })),
    ]);
}
/**
 * A refusal reproduced across runs: the latest run and earlier ones refused at
 * `purpose` with the same status from the policy's list, at least the policy's
 * interval apart, each time holding authority the same run proved valid (the
 * same credentials succeeded on another exchange) or needing none.
 */
function reproducedRefusal(runs, purpose, rule) {
    const refusals = runs.map((run) => {
        const refused = run.exchanges.find((entry) => entry.purpose === purpose &&
            entry.record.outcome === "responded" &&
            rule.statuses.includes(entry.record.response.status));
        if (refused?.record.outcome !== "responded")
            return null;
        const credentials = refused.record.request.credentials.map(({ handle_digest }) => handle_digest);
        const succeeded = (entry) => entry.record.outcome === "responded" &&
            entry.record.response.status >= 200 &&
            entry.record.response.status <= 299;
        // Authority is proved valid by the run itself: the service issued it in this
        // run, or it succeeded on another exchange of this run.
        const proved = (handle) => run.credentials.some(({ handle_digest, source }) => handle_digest === handle &&
            source.kind === "issued" &&
            run.exchanges.some((entry) => entry.record.exchange_digest === source.exchange_digest && succeeded(entry))) ||
            run.exchanges.some((entry) => entry !== refused &&
                succeeded(entry) &&
                entry.record.request.credentials.some(({ handle_digest }) => handle_digest === handle));
        const valid = credentials.every(proved);
        return valid ? { run, entry: refused, status: refused.record.response.status } : null;
    });
    const latest = refusals.at(-1);
    if (!latest)
        return null;
    const same = refusals.filter((refusal) => refusal?.status === latest.status);
    const first = same[0];
    if (!first ||
        same.length < rule.attempts ||
        Date.parse(latest.run.finished_at) - Date.parse(first.run.finished_at) <
            rule.minimum_interval_seconds * 1_000) {
        return null;
    }
    return {
        status: latest.status,
        evidence: same.slice(-MAXIMUM_EVIDENCE).map(({ run, entry }) => ({
            kind: "exchange",
            run_digest: run.run_digest,
            exchange_digest: entry.record.exchange_digest,
        })),
    };
}
function exchangeEvidence(run, include) {
    return run.exchanges.filter(include).map((entry) => ({
        kind: "exchange",
        run_digest: run.run_digest,
        exchange_digest: entry.record.exchange_digest,
    }));
}
/** A descriptor names an endpoint when it gives its exact URI or a base the URI sits under. */
function namesEndpoint(value, uri) {
    const base = value.replace(/\/+$/u, "");
    const endpoint = uri.replace(/\/+$/u, "");
    return endpoint === base || endpoint.startsWith(`${base}/`);
}
function result(step, outcome, timing, evidence) {
    return { step, outcome, timing, evidence: evidence.slice(0, MAXIMUM_EVIDENCE) };
}
function notAssessed(step) {
    return { step, outcome: "not_assessed", timing: null, evidence: [] };
}
//# sourceMappingURL=path.js.map