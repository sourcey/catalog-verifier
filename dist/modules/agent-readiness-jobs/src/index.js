import { digest } from "provenry/primitives";
import { AGENT_READINESS_JOB_LIBRARY_CONTRACT, agentReadinessJobLibraryCoreSchema, agentReadinessJobLibrarySchema, } from "../../../contracts/agent-readiness/src/index.js";
/**
 * The job library's authored source, sealed into the current policy. Releases
 * read the library inside the pinned policy file generated from it, so the
 * library a rating cites is exactly the published one.
 */
export const AGENT_READINESS_JOB_LIBRARY_SOURCE = {
    library_contract: AGENT_READINESS_JOB_LIBRARY_CONTRACT,
    library_version: "2026-10-06",
    jobs: [
        {
            job_id: "dns-resolve",
            category: "dns-resolver",
            name: "Resolve a name",
            statement: "Resolve a Sourcey-controlled name to its address records.",
            inputs: [{ kind: "fixed", name: "name", value: "sourcey.com" }],
            assertions: [
                {
                    name: "answer_for_query",
                    statement: "A typed answer names the queried name and carries at least one address record.",
                    proof: "dns_answer",
                },
                {
                    name: "resolution_succeeded",
                    statement: "The resolver reports success for the query.",
                    proof: "dns_success",
                },
            ],
            observation_links: [
                {
                    from: { assertion: "answer_for_query", observation: "query_name" },
                    to: { assertion: "resolution_succeeded", observation: "status" },
                },
            ],
            error_probe: { statement: "A query for a record type the resolver does not define." },
            effect: "read",
            cleanup: "none",
        },
        {
            job_id: "model-chat-stream-tool",
            category: "model-api",
            name: "Stream a completion with a tool call",
            statement: "Choose a model from the service's live model list, stream a chat completion from it and receive a call to a provided tool.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "model_listed",
                    statement: "The model used appears in the service's live model list.",
                    proof: "model_selected",
                },
                {
                    name: "stream_chunks",
                    statement: "The completion streams in more than one chunk.",
                    proof: "stream_chunks",
                },
                {
                    name: "tool_call_emitted",
                    statement: "The model emits a call to the provided tool.",
                    proof: "tool_called",
                },
            ],
            observation_links: [
                {
                    from: { assertion: "model_listed", observation: "used_model" },
                    to: { assertion: "stream_chunks", observation: "chunks" },
                },
                {
                    from: { assertion: "stream_chunks", observation: "chunks" },
                    to: { assertion: "tool_call_emitted", observation: "tool_name" },
                },
            ],
            error_probe: { statement: "A completion request naming a model that does not exist." },
            effect: "billable",
            cleanup: "none",
        },
        {
            job_id: "repository-create",
            category: "repository-hosting",
            name: "Create a repository",
            statement: "Create a repository named for the run and read it back.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "repository_created",
                    statement: "The service creates the repository.",
                    proof: "resource_created",
                },
                {
                    name: "read_back",
                    statement: "The repository reads back under the name that carries the run's nonce.",
                    proof: "resource_read_back",
                },
            ],
            observation_links: [
                {
                    from: { assertion: "repository_created", observation: "id" },
                    to: { assertion: "read_back", observation: "created_id" },
                },
            ],
            error_probe: { statement: "A repository request with a name the service does not allow." },
            effect: "consequential",
            cleanup: "required",
        },
        {
            job_id: "sms-send",
            category: "sms-messaging",
            name: "Send a text message",
            statement: "Send a text message carrying the run's nonce to a Sourcey-controlled number.",
            inputs: [
                { kind: "nonce", name: "nonce" },
                { kind: "sink", name: "recipient", sink: "phone" },
            ],
            assertions: [
                {
                    name: "message_accepted",
                    statement: "The service accepts the message and returns its identifier.",
                    proof: "message_accepted",
                },
                {
                    name: "delivered_to_sink",
                    statement: "The message reaches the Sourcey-controlled number, carrying the nonce.",
                    proof: "sink_received",
                },
            ],
            observation_links: [],
            error_probe: { statement: "A message to a recipient number that cannot exist." },
            effect: "billable",
            cleanup: "none",
        },
        {
            job_id: "workspace-page-create",
            category: "workspace",
            name: "Create a page",
            statement: "Create a page carrying the run's nonce in a shared container and read it back.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "page_created",
                    statement: "The service creates the page in the container.",
                    proof: "resource_created",
                },
                {
                    name: "read_back",
                    statement: "The page reads back with the content that carries the nonce.",
                    proof: "resource_read_back",
                },
            ],
            observation_links: [
                {
                    from: { assertion: "page_created", observation: "id" },
                    to: { assertion: "read_back", observation: "created_id" },
                },
            ],
            error_probe: { statement: "A page request for a container that does not exist." },
            effect: "consequential",
            cleanup: "required",
        },
    ],
};
/** The library with its digest, checked as every reader checks it. */
export function sealAgentReadinessJobLibrary(source) {
    const core = agentReadinessJobLibraryCoreSchema.parse(source);
    return agentReadinessJobLibrarySchema.parse({ ...core, library_digest: digest(core) });
}
/** A published library, only when its digest closes its content. */
export function verifyAgentReadinessJobLibrary(value) {
    const library = agentReadinessJobLibrarySchema.parse(value);
    const { library_digest, ...core } = library;
    if (digest(agentReadinessJobLibraryCoreSchema.parse(core)) !== library_digest) {
        throw new Error("Agent Readiness job library digest does not match its content.");
    }
    return library;
}
/** The identity a run and a revision cite: the exact job definition, not its library. */
export function agentReadinessJobDigest(job) {
    return digest(job);
}
/** The job a profile names, from the exact library it cites. */
export function agentReadinessLibraryJob(library, jobId) {
    const job = library.jobs.find((candidate) => candidate.job_id === jobId);
    if (!job)
        throw new Error(`Job library ${library.library_digest} has no job ${jobId}.`);
    return job;
}
//# sourceMappingURL=index.js.map