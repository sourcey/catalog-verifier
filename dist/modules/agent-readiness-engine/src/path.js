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
    const accountIds = input.accountOperations.map(({ operation_id }) => operation_id);
    const answeredRuns = runs.filter((run) => !probeUnanswered(run, id, accountIds));
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
    // A spec reading rests on the spec and on each document its references reached.
    const readFrom = (reading) => [
        reading.attempt_digest,
        ...(reading.references ?? []).map(({ attempt_digest }) => attempt_digest),
    ].map((attempt_digest) => ({
        kind: "discovery",
        run_digest: current.run_digest,
        attempt_digest,
    }));
    const specEvidence = spec ? readFrom(spec) : [];
    // The interface's account operations, by role, as read; and those its spec covers.
    const declaredAccounts = (role) => (current.accounts ?? []).filter(({ operation_id }) => input.accountOperations.some((declared) => declared.operation_id === operation_id && declared.role === role));
    const accounts = (role) => declaredAccounts(role).filter(({ spec: read }) => read.fetched === "read" && read.covers);
    // A step an account operation could have set cites its reading, whichever way it read.
    const accountEvidence = (role) => declaredAccounts(role).flatMap(({ spec: read }) => readFrom(read));
    const declaration = () => [{ kind: "declaration", run_digest: current.run_digest }];
    const chain = probe.authority;
    const refusal = answer === "offer" || answer === "authority" || answer === "error";
    // No account is needed: the request itself answered, or the spec requires no security at
    // all. An empty requirement beside a credential's makes security optional: some deployments
    // let anonymous calls through (Jira, where an admin grants the public a permission), which
    // only an answer shows. A key the listing says travels in the body (Amplitude's), which
    // OpenAPI cannot state as a scheme, leaves the spec's empty security saying nothing.
    const keyInBody = operation.kind === "http" && operation.body?.credential_field !== undefined;
    const anonymous = answer === "success" ||
        answer === "offer" ||
        ((answer === null || answer === "error" || answer === "page") &&
            !keyInBody &&
            covered !== null &&
            covered.security.length > 0 &&
            covered.security.every((kind) => kind === "none"));
    // An agent registration path: the chain's auth.md registration, or a sign-up API the listing
    // declares as a registration account operation, which its spec covers and lets an agent call
    // with no credential. A sign-up the spec does not declare anonymous is for people.
    const signUps = accounts("registration").filter(({ spec: read }) => read.security.length > 0 && read.security.every((kind) => kind === "none"));
    const signedUp = signUps.length > 0;
    const registration = chain?.registration === "agent" || signedUp ? "agent" : (chain?.registration ?? null);
    const registrationEvidence = [
        ...(chain?.registration ? chainEvidence : []),
        ...signUps.flatMap(({ spec: read }) => readFrom(read)),
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
        // A key or token scheme, an OAuth flow the agent's own client cannot start, a key the
        // listing says travels in the body, or nothing machine-readable: a person hands over a credential.
        return result("authority", "workaround", "setup", [
            ...requested,
            ...chainEvidence,
            ...specEvidence,
            ...accountEvidence("registration"),
            ...(keyInBody ? declaration() : []),
        ]);
    })();
    // What the agent makes alone lasts until a person claims it later (the shape's A): the vendor's
    // claim page this interface lists, once it is there.
    const claimed = pagesOf(({ page_id, found }) => input.claimPages.includes(page_id) && found);
    const onboard = (() => {
        if (anonymous) {
            return claimed.length > 0
                ? result("onboard", "approval", "setup", [...authority.evidence, ...claimed])
                : result("onboard", "not_applicable", null, authority.evidence);
        }
        // The vendor's decision stands before any way in: whatever registration exists, it decides.
        const accessPage = pagesOf(({ page_id, found }) => input.accessGates.includes(page_id) && found);
        if (accessPage.length > 0)
            return result("onboard", "gated", null, accessPage);
        // A setting a person on the account turns on once before the agent can use this interface (an
        // organization's MCP write access): a decision made once, whatever way in the agent has.
        const turnedOn = pagesOf(({ page_id, found }) => input.accessSettings.includes(page_id) && found);
        const agentGetsIn = (evidence) => turnedOn.length > 0 || claimed.length > 0
            ? result("onboard", "approval", "setup", [...evidence, ...turnedOn, ...claimed])
            : result("onboard", "machine", null, evidence);
        if (registration === "agent")
            return agentGetsIn(registrationEvidence);
        if (registration === "claimable") {
            return result("onboard", "approval", "setup", [
                ...registrationEvidence,
                ...turnedOn,
                ...claimed,
            ]);
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
            ...accountEvidence("registration"),
        ];
        return result("onboard", "workaround", "setup", evidence.length > 0 ? evidence : declaration());
    })();
    const pay = (() => {
        if (answer === "offer")
            return result("pay", "machine", null, requested);
        if (covered?.payment)
            return result("pay", "machine", null, specEvidence);
        // The agent funds the balance the job draws on itself: a top-up its spec says is paid by 402.
        const funded = accounts("top_up").filter(({ spec: read }) => read.payment);
        if (funded.length > 0) {
            return result("pay", "machine", null, funded.flatMap(({ spec: read }) => readFrom(read)));
        }
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
        // A dead or invented page sets nothing: a page counts once it is found. A balance a person tops
        // up by hand recurs (the shape's "manual top-ups"); a checkout puts a card on file once.
        const toppedUp = pagesOf(({ role, found }) => role === "top_up" && found);
        if (toppedUp.length > 0) {
            return result("pay", "workaround", "recurring", [...toppedUp, ...accountEvidence("top_up")]);
        }
        const checkout = pagesOf(({ role, found }) => role === "checkout" && found);
        return checkout.length > 0
            ? result("pay", "workaround", "setup", [...checkout, ...accountEvidence("top_up")])
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
        // A key the vendor expires with no API to renew it: a person replaces it each time (the shape's
        // "keys that expire with no renewal API"), at the page this interface lists, once it is there.
        const expiring = pagesOf(({ page_id, found }) => input.keyRenewalPages.includes(page_id) && found);
        const evidence = [...authority.evidence, ...specEvidence];
        return expiring.length > 0
            ? result("sustain", "workaround", "recurring", [...evidence, ...expiring])
            : result("sustain", "workaround", "setup", evidence);
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
 * The verified path of one binding: proof, not the grade (north star §5.6). The
 * latest run that did the job, while it is fresh, makes the job `verified`; a
 * verified run sets no step and never makes the job `unavailable`, which only
 * the probes find. The path rests on that run, or on the latest run when none
 * did the job.
 */
export function evaluatePath(input) {
    const runs = oldestFirst(input.runs);
    const latestRun = runs.at(-1);
    if (!latestRun)
        throw new Error("A verified path needs at least one run.");
    const { job } = input;
    const succeeded = (run) => run.assertions.length === job.assertions.length &&
        job.assertions.every(({ name }) => run.assertions.some(({ assertion, holds }) => assertion === name && holds));
    const fresh = (run) => Date.parse(input.asOf) - Date.parse(run.finished_at) <= input.policy.fresh_for_days * DAY_MS;
    const proof = [...runs].reverse().find((run) => succeeded(run) && fresh(run));
    return {
        steps: AGENT_READINESS_STEPS.map(notAssessed),
        job: proof
            ? jobResult("verified", exchangeEvidence(proof, (entry) => entry.purpose === "job"))
            : NOT_ASSESSED_JOB,
        reproducible: false,
        discoveryRun: null,
        verifiedRun: proof ?? latestRun,
        standingRuns: [],
    };
}
/**
 * A binding's path: every step the probes', and the job verified where its run
 * proved a job the probes found reachable (north star §5.6). A verified job
 * grades as a reachable one does, so the run never changes the letter: it
 * cannot lift a probed `unavailable` or settle a job the probes left open.
 */
export function combinePaths(probed, verified) {
    return {
        steps: probed.steps,
        job: verified.job.outcome === "verified" && probed.job.outcome === "reachable"
            ? verified.job
            : probed.job,
        reproducible: probed.reproducible,
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