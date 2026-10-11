import { compareInstants } from "provenry/primitives";
import { AGENT_READINESS_STEPS, } from "../../../contracts/agent-readiness/src/index.js";
import { consentReached } from "./authority.js";
import { agentReadinessFactNamesEndpoint, agentReadinessNamesEndpoint } from "./naming.js";
import { probeUnanswered } from "./records.js";
const MAXIMUM_EVIDENCE = 32;
const DAY_MS = 24 * 60 * 60 * 1_000;
/**
 * The probed path of one interface (north star §5.6). The latest probe run that
 * answered the operation decides its steps; a run that left its request, its
 * malformed request, its spec, its authority chain or a declared page
 * unanswered decides nothing, since residue is never a fact. Discovery's
 * latest run decides Discover and the payment manifests, unless an unanswered
 * read could change them: then the latest run whose reads were all answered,
 * or left unanswered only the service's standing answers, does. Earlier runs
 * count only to reproduce a page answer or a standing answer.
 */
export function evaluateProbePath(input) {
    const runs = oldestFirst(input.runs);
    const latest = runs.at(-1);
    if (!latest)
        throw new Error("A probed path needs at least one probe run.");
    const { operation } = input;
    const id = operation.operation_id;
    const answeredRuns = runs.filter((run) => !probeUnanswered(run, id));
    const current = answeredRuns.at(-1);
    const probe = current?.probes.find(({ operation_id }) => operation_id === id);
    if (!current || !probe) {
        return {
            steps: AGENT_READINESS_STEPS.map(notAssessed),
            job: NOT_ASSESSED_JOB,
            reproducible: false,
            discoveryRun: null,
            verifiedRun: null,
            standingRuns: [],
        };
    }
    const answer = probe.request?.answer ?? null;
    const of = (purpose) => exchangeEvidence(current, (entry) => entry.call_id === id && entry.purpose === purpose);
    const requested = of("probe_operation");
    const malformed = of("probe_malformed");
    const metadata = of("probe_authorization_server");
    const chainEvidence = [
        ...of("probe_resource_metadata"),
        ...metadata,
        ...of("probe_client_registration"),
        ...of("probe_authorization"),
    ];
    const pagesOf = (include) => {
        const ids = new Set(current.pages.filter(include).map(({ page_id }) => page_id));
        return exchangeEvidence(current, (entry) => entry.purpose === "probe_page" && ids.has(entry.call_id));
    };
    const spec = probe.spec;
    const specRead = spec?.fetched === "read" ? spec : null;
    const covered = specRead?.covers === true ? specRead : null;
    const specEvidence = spec
        ? [{ kind: "discovery", run_digest: current.run_digest, attempt_digest: spec.attempt_digest }]
        : [];
    const declaration = () => [{ kind: "declaration", run_digest: current.run_digest }];
    const chain = probe.authority;
    const refusal = answer === "offer" || answer === "authority" || answer === "error";
    // No account is needed: the request itself answered, or the spec requires no security.
    const anonymous = answer === "success" ||
        answer === "offer" ||
        ((answer === null || answer === "error" || answer === "page") &&
            covered !== null &&
            covered.security.includes("none"));
    // An agent registration path: the chain's auth.md registration, or a sign-up API the listing names.
    // A sign-up API answers the probe's GET as an API that asks nothing of a person: a success, an
    // offer, or a typed 405 (it signs up by POST). A CAPTCHA or a credential demanded is for people.
    const pageStatus = (page) => {
        const entry = current.exchanges.find(({ purpose, call_id }) => purpose === "probe_page" && call_id === page.page_id);
        return entry?.record.outcome === "responded" ? entry.record.response.status : null;
    };
    const signUpApi = (page) => page.role === "registration" &&
        page.found &&
        (page.answer === "success" ||
            page.answer === "offer" ||
            (page.answer === "error" && pageStatus(page) === 405));
    const signedUp = current.pages.some(signUpApi);
    const registration = chain?.registration === "agent" || signedUp ? "agent" : (chain?.registration ?? null);
    const registrationEvidence = [
        ...(chain?.registration ? chainEvidence : []),
        ...(signedUp ? pagesOf(signUpApi) : []),
    ];
    const target = operation.kind === "http" ? operation.url : input.endpoint;
    // A read unanswered on every probe since it last answered, the first of them the policy's
    // interval before the latest, is the service's standing answer. A run that answered it, or did
    // not read it, starts the count again.
    const stretches = latest.discovery.unanswered.map((url) => {
        const since = runs.findLastIndex(({ discovery }) => !discovery.unanswered.includes(url));
        return { url, runs: reproducing(runs.slice(since + 1), input.policy.reproduction) };
    });
    const standing = new Set(stretches.flatMap(({ url, runs: found }) => (found.length > 0 ? [url] : [])));
    const settled = (run) => run.discovery.unanswered.every((url) => standing.has(url));
    const settledDiscovery = [...runs].reverse().find(settled);
    /** The discovery run that decides: the latest, unless a read there still unanswered could change the reading. */
    const discoveryFor = (decided) => decided(latest) || settled(latest) ? latest : (settledDiscovery ?? null);
    // A server that answers for authority before listing its tools describes them to the agent it
    // authorizes: it asked before any tool was called. A list it refused or cut short describes none.
    const toolCalled = current.exchanges.some((entry) => entry.call_id === id && entry.purpose === "probe_operation" && entry.role === "request");
    const toolDescribed = operation.kind === "mcp" &&
        (probe.tool_listed === true ||
            (probe.tool_listed === null && answer === "authority" && !toolCalled));
    const finds = (run) => discoverStep(run, current, operation, target, covered, specEvidence, toolDescribed);
    const discoveryRun = discoveryFor((candidate) => finds(candidate).outcome === "machine");
    const discover = discoveryRun ? finds(discoveryRun) : notAssessed("discover");
    const authority = (() => {
        if (anonymous) {
            return result("authority", "not_applicable", null, answer === null ? specEvidence : requested);
        }
        if (registration !== null) {
            return result("authority", "machine", null, [...requested, ...registrationEvidence]);
        }
        const authorization = current.exchanges.find((entry) => entry.call_id === id && entry.purpose === "probe_authorization");
        if (chain?.client && authorization && consentReached(authorization.record)) {
            return result("authority", "approval", "setup", [...requested, ...chainEvidence]);
        }
        // A key or token scheme, an OAuth flow the agent's own client cannot start,
        // or nothing machine-readable: a person hands over a credential.
        return result("authority", "workaround", "setup", [
            ...requested,
            ...chainEvidence,
            ...specEvidence,
        ]);
    })();
    const onboard = (() => {
        if (anonymous)
            return result("onboard", "not_applicable", null, authority.evidence);
        // The vendor's decision stands before any way in: whatever registration exists, it decides.
        const accessPage = pagesOf(({ page_id, found }) => input.accessGates.includes(page_id) && found);
        if (accessPage.length > 0)
            return result("onboard", "gated", null, accessPage);
        // A setting a person on the account turns on once before the agent can use this interface (an
        // organization's MCP write access): a decision made once, whatever way in the agent has.
        const turnedOn = pagesOf(({ page_id, found }) => input.accessSettings.includes(page_id) && found);
        const agentGetsIn = (evidence) => turnedOn.length > 0
            ? result("onboard", "approval", "setup", [...evidence, ...turnedOn])
            : result("onboard", "machine", null, evidence);
        if (registration === "agent")
            return agentGetsIn(registrationEvidence);
        if (registration === "claimable") {
            return result("onboard", "approval", "setup", [...registrationEvidence, ...turnedOn]);
        }
        // The agent's own OAuth client gets it in once the server takes it to consent (the shape's A).
        if (chain?.client && authority.outcome === "approval")
            return agentGetsIn(chainEvidence);
        // No path for the agent: what the probes found, or the listing itself when they sent nothing.
        const evidence = [
            ...requested,
            ...pagesOf(({ role }) => role === "registration"),
            ...chainEvidence,
            ...specEvidence,
        ];
        return result("onboard", "workaround", "setup", evidence.length > 0 ? evidence : declaration());
    })();
    const pay = (() => {
        if (answer === "offer")
            return result("pay", "machine", null, requested);
        if (covered?.payment)
            return result("pay", "machine", null, specEvidence);
        const manifests = (run) => target === null
            ? []
            : run.discovery.facts.filter((found) => found.fact === "payment_manifest" &&
                ownDomain(found.descriptor_url, run.discovery.domains) &&
                agentReadinessNamesEndpoint(found.value, target));
        const run = discoveryFor((candidate) => manifests(candidate).length > 0);
        const named = run ? manifests(run) : [];
        if (named.length > 0 && run) {
            return result("pay", "machine", null, named.map(({ attempt_digest }) => ({
                kind: "discovery",
                run_digest: run.run_digest,
                attempt_digest,
            })));
        }
        if (anonymous) {
            return result("pay", "not_applicable", null, answer === null ? specEvidence : requested);
        }
        if (input.checkoutRuledOut)
            return result("pay", "not_applicable", null, declaration());
        // An unanswered read could have held a manifest that names the endpoint.
        if (!run)
            return notAssessed("pay");
        // A dead or invented page sets nothing: the checkout counts once it is found.
        const checkout = pagesOf(({ role, found }) => role === "checkout" && found);
        return checkout.length > 0
            ? result("pay", "workaround", "setup", checkout)
            : notAssessed("pay");
    })();
    const pages = answeredRuns.filter((run) => run.probes.find(({ operation_id }) => operation_id === id)?.request?.answer === "page");
    const pageRuns = answer === "page" ? reproducing(pages, input.policy.reproduction) : [];
    const pageReproduced = pageRuns.length > 0;
    const job = (() => {
        // The job's tool answered, or asked for the authority it needs: whatever an anonymous list
        // says, the server performs it for an agent with that authority.
        if (answer === "success" || answer === "offer" || answer === "authority") {
            return jobResult("reachable", requested);
        }
        // The server lists its tools, the job's is not among them, and its call is refused with an error.
        if (operation.kind === "mcp" && probe.tool_listed === false && answer === "error") {
            return jobResult("unavailable", requested);
        }
        if (refusal)
            return jobResult("reachable", requested);
        if (covered)
            return jobResult("reachable", specEvidence);
        if (answer === null)
            return jobResult("unavailable", specEvidence);
        if (pageReproduced) {
            return jobResult("unavailable", pageRuns.flatMap((run) => exchangeEvidence(run, (entry) => entry.call_id === id && entry.purpose === "probe_operation")));
        }
        return NOT_ASSESSED_JOB;
    })();
    const confirm = (() => {
        const read = refusal ? probe.request : answer === "success" ? probe.malformed : null;
        if (read) {
            const typedRefusal = (read.answer === "offer" || read.answer === "authority" || read.answer === "error") &&
                read.typed === true;
            const evidence = refusal ? requested : [...requested, ...malformed];
            return typedRefusal
                ? result("confirm", "machine", null, evidence)
                : result("confirm", "workaround", "recurring", evidence);
        }
        // A page or a spec operation: the errors the spec declares for the job.
        return covered?.typed_errors
            ? result("confirm", "machine", null, specEvidence)
            : result("confirm", "workaround", "recurring", [...requested, ...specEvidence]);
    })();
    const sustain = (() => {
        if (authority.outcome === "not_applicable") {
            return result("sustain", "not_applicable", null, authority.evidence);
        }
        // Either alternative keeps the agent's authority alive: its key operations, or the chain's
        // grants, whoever obtained the first token.
        if (covered?.key_operations)
            return result("sustain", "machine", null, specEvidence);
        if (chain !== null) {
            if (!chain.renewal)
                return result("sustain", "workaround", "recurring", metadata);
            return chain.revocation
                ? result("sustain", "machine", null, metadata)
                : result("sustain", "workaround", "setup", metadata);
        }
        return result("sustain", "workaround", "setup", [...authority.evidence, ...specEvidence]);
    })();
    return {
        steps: [discover, authority, onboard, pay, confirm, sustain],
        job,
        reproducible: answer === "page" && !pageReproduced && covered === null,
        discoveryRun,
        verifiedRun: null,
        standingRuns: stretches.flatMap(({ runs: found }) => found),
    };
}
/**
 * The verified path of one binding: what performing the job with its authority
 * establishes (north star §5.6, precedence). Only the vendor's own runs can
 * lower a letter: a refusal of authority a vendor run proved valid counts when
 * the vendor's latest run holds it and its earlier runs reproduce it (the
 * job's refusal makes the job `unavailable`, Authority's makes that step
 * `gated`, and a 402 is a balance a person tops up: Pay's recurring
 * `workaround`), and so do failed assertions reproduced the same way (the job
 * `unavailable`). Otherwise the latest run that did the job decides while it
 * is fresh; a failing run from anyone else never lowers a letter.
 */
export function evaluatePath(input) {
    const runs = oldestFirst(input.runs);
    const latestRun = runs.at(-1);
    if (!latestRun)
        throw new Error("A verified path needs at least one run.");
    const { job, binding } = input;
    const { reproduction: rule } = input.policy;
    const succeeded = (run) => run.assertions.length === job.assertions.length &&
        job.assertions.every(({ name }) => run.assertions.some(({ assertion, holds }) => assertion === name && holds));
    const fresh = (run) => Date.parse(input.asOf) - Date.parse(run.finished_at) <= input.policy.fresh_for_days * DAY_MS;
    const vendorRuns = runs.filter(({ label }) => label === "vendor_run_verified");
    const holds = (found) => found?.latest === true && reproduced(found.runs, rule);
    // Runs whose job completed and an assertion did not hold: the API exists but does not do the job.
    const failedRun = (run) => run.assertions.length > 0 && run.assertions.some(({ holds: held }) => !held);
    const vendorLatest = vendorRuns.at(-1);
    const jobRefusals = refusals(vendorRuns, "job", rule.statuses);
    const payRefusals = refusals(vendorRuns, "job", [402]);
    const authorityRefusals = refusals(vendorRuns, "delegation", rule.statuses);
    const failures = vendorRuns.filter(failedRun);
    const failing = vendorLatest !== undefined && failedRun(vendorLatest);
    const lowered = holds(jobRefusals) ||
        holds(payRefusals) ||
        holds(authorityRefusals) ||
        (failing && reproduced(failures, rule));
    // The run that decides: the vendor's, when its runs reproduce a failure; else the latest fresh success.
    const current = (lowered ? vendorLatest : [...runs].reverse().find((run) => succeeded(run) && fresh(run))) ??
        vendorLatest ??
        latestRun;
    const ok = !lowered && succeeded(current) && fresh(current);
    const jobEvidence = exchangeEvidence(current, (entry) => entry.purpose === "job");
    const jobOutcome = (() => {
        if (ok)
            return jobResult("verified", jobEvidence);
        if (holds(jobRefusals))
            return jobResult("unavailable", jobRefusals.evidence);
        if (failing && reproduced(failures, rule)) {
            return jobResult("unavailable", failures.flatMap((run) => exchangeEvidence(run, (entry) => entry.purpose === "job")));
        }
        return NOT_ASSESSED_JOB;
    })();
    const usedRoles = [...new Set(binding.calls.flatMap(({ credentials }) => credentials))];
    const authorityStep = (() => {
        if (binding.delegation.kind === "none") {
            return ok && usedRoles.length === 0
                ? result("authority", "not_applicable", null, jobEvidence)
                : notAssessed("authority");
        }
        if (holds(authorityRefusals)) {
            return result("authority", "gated", null, authorityRefusals.evidence);
        }
        // The authority the job actually carried: the handles on its own requests.
        const carried = new Set(current.exchanges.flatMap((entry) => entry.purpose === "job" && entry.role === "request"
            ? entry.record.request.credentials.map(({ handle_digest }) => handle_digest)
            : []));
        const held = current.credentials.filter(({ handle_digest }) => carried.has(handle_digest));
        if (usedRoles.length === 0 || held.length === 0 || held.length !== carried.size) {
            return notAssessed("authority");
        }
        const evidence = held.map((source) => ({
            kind: "credential",
            run_digest: current.run_digest,
            handle_digest: source.handle_digest,
        }));
        const issuedBy = new Set(held.flatMap(({ source }) => (source.kind === "issued" ? [source.exchange_digest] : [])));
        evidence.push(...exchangeEvidence(current, (entry) => issuedBy.has(entry.record.exchange_digest)));
        if (held.some(({ source }) => source.kind === "entered")) {
            return result("authority", "workaround", "setup", evidence);
        }
        return binding.delegation.kind === "oauth"
            ? result("authority", "approval", "setup", evidence)
            : result("authority", "machine", null, evidence);
    })();
    const payStep = (() => {
        if (holds(payRefusals)) {
            return result("pay", "workaround", "recurring", payRefusals.evidence);
        }
        if (!ok)
            return notAssessed("pay");
        switch (binding.payment.kind) {
            case "none":
                return result("pay", "not_applicable", null, jobEvidence);
            case "per_call":
                return result("pay", "machine", null, jobEvidence);
            case "prepaid_balance":
                // A balance a person set up: the run leaves Pay to the probes.
                return notAssessed("pay");
        }
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
    const sustainStep = (() => {
        if (binding.delegation.kind === "none") {
            return ok ? result("sustain", "not_applicable", null, jobEvidence) : notAssessed("sustain");
        }
        const { rotation, revocation } = binding.sustain;
        const witnessed = upkeepWitnesses(current);
        // Only an exchange witnesses upkeep: a manual or unwitnessed part leaves Sustain to the probes.
        const machine = (rotation.kind === "refresh" || rotation.kind === "mint") &&
            witnessed.rotation &&
            revocation.kind === "call" &&
            witnessed.revocation;
        return machine
            ? result("sustain", "machine", null, exchangeEvidence(current, (entry) => entry.purpose.startsWith("sustain_")))
            : notAssessed("sustain");
    })();
    const pending = (found) => found?.latest === true && !reproduced(found.runs, rule);
    return {
        // Discover and Onboard are the probes' alone: a verified run reads no descriptor and registers nothing.
        steps: [
            notAssessed("discover"),
            authorityStep,
            notAssessed("onboard"),
            payStep,
            confirmStep,
            sustainStep,
        ],
        job: jobOutcome,
        reproducible: pending(jobRefusals) ||
            pending(payRefusals) ||
            pending(authorityRefusals) ||
            (failing && !reproduced(failures, rule)),
        // A verified run reads no descriptor.
        discoveryRun: null,
        verifiedRun: current,
        standingRuns: [],
    };
}
/**
 * Verified outcomes replace probed ones for the steps the verified run
 * assessed, and for the job (north star §5.6, precedence); a step it left
 * unassessed keeps its probed outcome.
 */
export function combinePaths(probed, verified) {
    return {
        steps: probed.steps.map((step, index) => {
            const replacement = verified.steps[index];
            if (replacement?.step !== step.step)
                throw new Error("Paths list steps in path order.");
            return replacement.outcome === "not_assessed" ? step : replacement;
        }),
        job: verified.job.outcome === "not_assessed" ? probed.job : verified.job,
        reproducible: probed.reproducible || verified.reproducible,
        discoveryRun: probed.discoveryRun,
        verifiedRun: verified.verifiedRun,
        standingRuns: probed.standingRuns,
    };
}
/**
 * Discover (north star §5.6): `machine` when the agent finds the interface
 * from the vendor's own domains and a machine-readable description covers the
 * job. Found: a descriptor fetched on an Entity domain names the job's
 * endpoint, or a document written for agents names its origin (the route).
 * Covered: the named spec covers the job, the MCP server lists the job's tool
 * (or lists tools only after authority), or that document for agents. A spec
 * operation has no endpoint to name: its spec, covering the job, is the
 * machine-readable interface. Otherwise a setup workaround: a person tells the
 * agent where the interface is or how to call it.
 */
function discoverStep(run, current, operation, target, covered, specEvidence, 
/** An MCP server listed the job's tool, or lists tools only to the agent it authorizes. */
toolDescribed) {
    const { attempts, facts, domains } = run.discovery;
    const discovery = (attempt) => ({
        kind: "discovery",
        run_digest: run.run_digest,
        attempt_digest: attempt,
    });
    if (operation.kind === "spec") {
        return covered
            ? result("discover", "machine", null, specEvidence)
            : result("discover", "workaround", "setup", specEvidence);
    }
    const named = target
        ? facts.filter((fact) => agentReadinessFactNamesEndpoint(fact, target) && ownDomain(fact.descriptor_url, domains))
        : [];
    const described = covered !== null || toolDescribed;
    const routed = named.some(({ fact }) => fact === "documentation_route");
    if (routed || (named.length > 0 && described)) {
        return result("discover", "machine", null, [
            ...named.map(({ attempt_digest }) => discovery(attempt_digest)),
            ...specEvidence,
        ]);
    }
    const evidence = [...attempts.map(discovery), ...specEvidence];
    return result("discover", "workaround", "setup", evidence.length > 0 ? evidence : [{ kind: "declaration", run_digest: current.run_digest }]);
}
/** Whether a URL is on one of the Entity's domains, or a subdomain of one. */
function ownDomain(url, domains) {
    const host = new URL(url).hostname.toLowerCase();
    return domains.some((domain) => host === domain || host.endsWith(`.${domain}`));
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
/**
 * Each run's refusal at `purpose` with one of `statuses`, holding authority
 * the same run proved valid: at least one credential, each issued in the run
 * by an exchange that succeeded or carried by another exchange that succeeded.
 * A request with no credential proves nothing about authority, so it is never
 * a refusal (missing authority is residue). Null when no run refused.
 */
function refusals(runs, purpose, statuses) {
    const found = runs.flatMap((run) => {
        const refused = run.exchanges.find((entry) => entry.purpose === purpose &&
            entry.record.outcome === "responded" &&
            statuses.includes(entry.record.response.status));
        if (refused?.record.outcome !== "responded")
            return [];
        const credentials = refused.record.request.credentials.map(({ handle_digest }) => handle_digest);
        const proved = (handle) => run.credentials.some(({ handle_digest, source }) => handle_digest === handle &&
            source.kind === "issued" &&
            run.exchanges.some((entry) => entry.record.exchange_digest === source.exchange_digest && succeeded(entry))) ||
            run.exchanges.some((entry) => entry !== refused &&
                succeeded(entry) &&
                entry.record.request.credentials.some(({ handle_digest }) => handle_digest === handle));
        return credentials.length > 0 && credentials.every(proved)
            ? [{ run, entry: refused, status: refused.record.response.status }]
            : [];
    });
    const last = found.at(-1);
    if (!last)
        return null;
    const same = found.filter(({ status }) => status === last.status);
    return {
        runs: same.map(({ run }) => run),
        evidence: same.slice(-MAXIMUM_EVIDENCE).map(({ run, entry }) => ({
            kind: "exchange",
            run_digest: run.run_digest,
            exchange_digest: entry.record.exchange_digest,
        })),
        latest: last.run === runs.at(-1),
    };
}
/**
 * The latest of `found` that reproduce a finding, the fewest that do, or none:
 * a revision cites only these (north star §5.4).
 */
function reproducing(found, rule) {
    for (let start = found.length - rule.attempts; start >= 0; start -= 1) {
        const stretch = found.slice(start);
        if (reproduced(stretch, rule))
            return stretch;
    }
    return [];
}
/**
 * A finding reproduced as the policy asks: in the latest run and in earlier
 * ones, at least `attempts` runs whose first and last are the interval apart.
 */
function reproduced(found, rule) {
    const first = found[0];
    const last = found.at(-1);
    return (first !== undefined &&
        last !== undefined &&
        found.length >= rule.attempts &&
        Date.parse(last.finished_at) - Date.parse(first.finished_at) >=
            rule.minimum_interval_seconds * 1_000);
}
function succeeded(entry) {
    return (entry?.record.outcome === "responded" &&
        entry.record.response.status >= 200 &&
        entry.record.response.status <= 299);
}
function oldestFirst(runs) {
    return [...runs].sort((left, right) => compareInstants(left.finished_at, right.finished_at) ||
        (left.run_digest < right.run_digest ? -1 : 1));
}
function exchangeEvidence(run, include) {
    return run.exchanges.filter(include).map((entry) => ({
        kind: "exchange",
        run_digest: run.run_digest,
        exchange_digest: entry.record.exchange_digest,
    }));
}
function result(step, outcome, timing, evidence) {
    return { step, outcome, timing, evidence: evidence.slice(0, MAXIMUM_EVIDENCE) };
}
export function notAssessed(step) {
    return { step, outcome: "not_assessed", timing: null, evidence: [] };
}
/** The job not yet settled by any run. */
export const NOT_ASSESSED_JOB = { outcome: "not_assessed", evidence: [] };
function jobResult(outcome, evidence) {
    return { outcome, evidence: evidence.slice(0, MAXIMUM_EVIDENCE) };
}
/** The job unavailable on the run's declaration revision alone: it names no interface for the job. */
export function declaredUnavailable(run) {
    return jobResult("unavailable", [{ kind: "declaration", run_digest: run.run_digest }]);
}
//# sourceMappingURL=path.js.map