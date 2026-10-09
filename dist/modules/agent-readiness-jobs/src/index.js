import { digest } from "provenry/primitives";
import { AGENT_READINESS_JOB_LIBRARY_CONTRACT, agentReadinessJobLibraryCoreSchema, agentReadinessJobLibrarySchema, } from "../../../contracts/agent-readiness/src/index.js";
/**
 * The job library's authored source, sealed into the current policy. Releases
 * read the library inside the pinned policy file generated from it, so the
 * library a rating cites is exactly the published one.
 */
export const AGENT_READINESS_JOB_LIBRARY_SOURCE = {
    library_contract: AGENT_READINESS_JOB_LIBRARY_CONTRACT,
    library_version: "2026-10-09",
    jobs: [
        {
            job_id: "bounty-claim",
            category: "bounty-board",
            name: "Claim a bounty",
            statement: "Claim an open bounty with a note that is the run's nonce, then read the claim back.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "bounty_claimed",
                    statement: "The board accepts the claim and returns its identifier.",
                    proof: "resource_created",
                },
                {
                    name: "read_back",
                    statement: "The claim reads back under that identifier with the nonce as its note.",
                    proof: "resource_read_back",
                },
            ],
            observation_links: [
                {
                    from: { assertion: "bounty_claimed", observation: "id" },
                    to: { assertion: "read_back", observation: "created_id" },
                },
            ],
            error_probe: { statement: "A claim on a bounty that does not exist." },
            effect: "consequential",
            cleanup: "required",
        },
        {
            job_id: "bucket-create",
            category: "cloud-platform",
            name: "Create a storage bucket",
            statement: "Create a storage bucket named with the run's nonce, then read it back.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "bucket_created",
                    statement: "The platform creates the bucket and returns its identifier.",
                    proof: "resource_created",
                },
                {
                    name: "read_back",
                    statement: "The bucket reads back under that identifier with the nonce as its name.",
                    proof: "resource_read_back",
                },
            ],
            observation_links: [
                {
                    from: { assertion: "bucket_created", observation: "id" },
                    to: { assertion: "read_back", observation: "created_id" },
                },
            ],
            error_probe: { statement: "A bucket request with a name the platform does not allow." },
            effect: "consequential",
            cleanup: "required",
        },
        {
            job_id: "chat-message-post",
            category: "team-chat",
            name: "Post a message",
            statement: "Post a message whose text is the run's nonce to a channel, then read it back.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "message_posted",
                    statement: "The service posts the message and returns its identifier.",
                    proof: "resource_created",
                },
                {
                    name: "read_back",
                    statement: "The message reads back under that identifier with the nonce as its text.",
                    proof: "resource_read_back",
                },
            ],
            observation_links: [
                {
                    from: { assertion: "message_posted", observation: "id" },
                    to: { assertion: "read_back", observation: "created_id" },
                },
            ],
            error_probe: { statement: "A message to a channel that does not exist." },
            effect: "consequential",
            cleanup: "required",
        },
        {
            job_id: "crm-contact-create",
            category: "crm",
            name: "Create a contact",
            statement: "Create a contact with a field set to the run's nonce, then read it back.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "contact_created",
                    statement: "The service creates the contact and returns its identifier.",
                    proof: "resource_created",
                },
                {
                    name: "read_back",
                    statement: "The contact reads back under that identifier with the nonce in that field.",
                    proof: "resource_read_back",
                },
            ],
            observation_links: [
                {
                    from: { assertion: "contact_created", observation: "id" },
                    to: { assertion: "read_back", observation: "created_id" },
                },
            ],
            error_probe: { statement: "A contact request with an email address that is not valid." },
            effect: "consequential",
            cleanup: "required",
        },
        {
            job_id: "database-create",
            category: "database",
            name: "Create a database deployment",
            statement: "Create a database deployment named with the run's nonce, then read it back.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "deployment_created",
                    statement: "The service creates the deployment and returns its identifier.",
                    proof: "resource_created",
                },
                {
                    name: "read_back",
                    statement: "The deployment reads back under that identifier with the nonce as its name.",
                    proof: "resource_read_back",
                },
            ],
            observation_links: [
                {
                    from: { assertion: "deployment_created", observation: "id" },
                    to: { assertion: "read_back", observation: "created_id" },
                },
            ],
            error_probe: { statement: "A database request with a name the service does not allow." },
            effect: "consequential",
            cleanup: "required",
        },
        {
            job_id: "deployment-create",
            category: "frontend-hosting",
            name: "Create a deployment",
            statement: "Create a deployment named with the run's nonce, then read it back.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "deployment_created",
                    statement: "The service creates the deployment and returns its identifier.",
                    proof: "resource_created",
                },
                {
                    name: "read_back",
                    statement: "The deployment reads back under that identifier with the nonce as its name.",
                    proof: "resource_read_back",
                },
            ],
            observation_links: [
                {
                    from: { assertion: "deployment_created", observation: "id" },
                    to: { assertion: "read_back", observation: "created_id" },
                },
            ],
            error_probe: { statement: "A deployment request for a project that does not exist." },
            effect: "consequential",
            cleanup: "required",
        },
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
            job_id: "email-send",
            category: "email",
            name: "Send an email",
            statement: "Send an email whose body carries the run's nonce to a Sourcey-controlled mailbox.",
            inputs: [
                { kind: "nonce", name: "nonce" },
                { kind: "sink", name: "recipient", sink: "email" },
            ],
            assertions: [
                {
                    name: "message_accepted",
                    statement: "The service accepts the email and returns its identifier.",
                    proof: "message_accepted",
                },
                {
                    name: "delivered_to_sink",
                    statement: "The email reaches the Sourcey-controlled mailbox, carrying the nonce.",
                    proof: "sink_received",
                },
            ],
            observation_links: [],
            error_probe: { statement: "An email to a recipient address that is not valid." },
            effect: "billable",
            cleanup: "none",
        },
        {
            job_id: "error-event-report",
            category: "error-tracking",
            name: "Report an error",
            statement: "Report an error event whose message is the run's nonce, then read it back.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "event_reported",
                    statement: "The service accepts the event and returns its identifier.",
                    proof: "resource_created",
                },
                {
                    name: "read_back",
                    statement: "The event reads back under that identifier with the nonce as its message.",
                    proof: "resource_read_back",
                },
            ],
            observation_links: [
                {
                    from: { assertion: "event_reported", observation: "id" },
                    to: { assertion: "read_back", observation: "created_id" },
                },
            ],
            error_probe: { statement: "An event sent to a project that does not exist." },
            effect: "consequential",
            cleanup: "required",
        },
        {
            job_id: "feature-flag-create",
            category: "feature-flags",
            name: "Create a feature flag",
            statement: "Create a feature flag keyed by the run's nonce, then read it back.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "flag_created",
                    statement: "The service creates the flag and returns its identifier.",
                    proof: "resource_created",
                },
                {
                    name: "read_back",
                    statement: "The flag reads back under that identifier with the nonce as its key.",
                    proof: "resource_read_back",
                },
            ],
            observation_links: [
                {
                    from: { assertion: "flag_created", observation: "id" },
                    to: { assertion: "read_back", observation: "created_id" },
                },
            ],
            error_probe: { statement: "A flag request with a key the service does not allow." },
            effect: "consequential",
            cleanup: "required",
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
            job_id: "monitor-create",
            category: "monitoring",
            name: "Create a monitor",
            statement: "Create a monitor named with the run's nonce, then read it back.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "monitor_created",
                    statement: "The service creates the monitor and returns its identifier.",
                    proof: "resource_created",
                },
                {
                    name: "read_back",
                    statement: "The monitor reads back under that identifier with the nonce as its name.",
                    proof: "resource_read_back",
                },
            ],
            observation_links: [
                {
                    from: { assertion: "monitor_created", observation: "id" },
                    to: { assertion: "read_back", observation: "created_id" },
                },
            ],
            error_probe: { statement: "A monitor request with a query the service cannot parse." },
            effect: "consequential",
            cleanup: "required",
        },
        {
            job_id: "payment-create",
            category: "payments",
            name: "Create a payment link",
            statement: "Create a payment link with a field set to the run's nonce, then read it back.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "link_created",
                    statement: "The service creates the payment link and returns its identifier.",
                    proof: "resource_created",
                },
                {
                    name: "read_back",
                    statement: "The payment link reads back under that identifier with the nonce in that field.",
                    proof: "resource_read_back",
                },
            ],
            observation_links: [
                {
                    from: { assertion: "link_created", observation: "id" },
                    to: { assertion: "read_back", observation: "created_id" },
                },
            ],
            error_probe: { statement: "A payment link with an amount the service does not accept." },
            effect: "consequential",
            cleanup: "required",
        },
        {
            job_id: "repository-create",
            category: "repository-hosting",
            name: "Create a repository",
            statement: "Create a repository named with the run's nonce, then read it back.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "repository_created",
                    statement: "The service creates the repository and returns its identifier.",
                    proof: "resource_created",
                },
                {
                    name: "read_back",
                    statement: "The repository reads back under that identifier with the nonce as its name.",
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
            job_id: "search-record-find",
            category: "search",
            name: "Find a record by search",
            statement: "Index a record whose content is the run's nonce, then search for the nonce.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "record_indexed",
                    statement: "The service indexes the record and returns its identifier.",
                    proof: "resource_created",
                },
                {
                    name: "record_found",
                    statement: "A search whose query is the nonce, sent without the created identifier, returns the record under that identifier with the nonce as its content.",
                    proof: "resource_found_by_query",
                },
            ],
            observation_links: [
                {
                    from: { assertion: "record_indexed", observation: "id" },
                    to: { assertion: "record_found", observation: "created_id" },
                },
            ],
            error_probe: { statement: "A search against an index that does not exist." },
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
            job_id: "user-create",
            category: "auth",
            name: "Create a user",
            statement: "Create a user with a field set to the run's nonce, then read it back.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "user_created",
                    statement: "The service creates the user and returns its identifier.",
                    proof: "resource_created",
                },
                {
                    name: "read_back",
                    statement: "The user reads back under that identifier with the nonce in that field.",
                    proof: "resource_read_back",
                },
            ],
            observation_links: [
                {
                    from: { assertion: "user_created", observation: "id" },
                    to: { assertion: "read_back", observation: "created_id" },
                },
            ],
            error_probe: { statement: "A user request with an email address that is not valid." },
            effect: "consequential",
            cleanup: "required",
        },
        {
            job_id: "vector-upsert-query",
            category: "vector-database",
            name: "Find a vector by query",
            statement: "Write a vector whose metadata value is the run's nonce, then query for the nonce.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "vector_written",
                    statement: "The service writes the vector and returns its identifier.",
                    proof: "resource_created",
                },
                {
                    name: "vector_found",
                    statement: "A query for the nonce, sent without the created identifier, returns the vector under that identifier with the nonce as its metadata value.",
                    proof: "resource_found_by_query",
                },
            ],
            observation_links: [
                {
                    from: { assertion: "vector_written", observation: "id" },
                    to: { assertion: "vector_found", observation: "created_id" },
                },
            ],
            error_probe: { statement: "A query against an index that does not exist." },
            effect: "consequential",
            cleanup: "required",
        },
        {
            job_id: "workspace-page-create",
            category: "workspace",
            name: "Create a page",
            statement: "Create a page whose title is the run's nonce in a shared container, then read it back.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "page_created",
                    statement: "The service creates the page in the container and returns its identifier.",
                    proof: "resource_created",
                },
                {
                    name: "read_back",
                    statement: "The page reads back under that identifier with the nonce as its title.",
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