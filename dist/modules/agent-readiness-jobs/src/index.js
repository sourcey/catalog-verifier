import { digest } from "provenry/primitives";
import { AGENT_READINESS_JOB_LIBRARY_CONTRACT, agentReadinessJobLibraryCoreSchema, agentReadinessJobLibrarySchema, } from "../../../contracts/agent-readiness/src/index.js";
/**
 * The shape most jobs share: make one thing carrying the run's nonce, then read
 * it back under the identifier its creation returned or was given. A
 * consequential job cleans up what it made; a billable one costs money instead.
 */
function madeAndReadBack(job) {
    const effect = job.effect ?? "consequential";
    return {
        job_id: job.job_id,
        category: job.category,
        name: job.name,
        statement: job.statement,
        inputs: [{ kind: "nonce", name: "nonce" }],
        assertions: [
            { name: job.made, statement: job.made_statement, proof: "resource_created" },
            { name: "read_back", statement: job.read_back_statement, proof: "resource_read_back" },
        ],
        observation_links: [
            {
                from: { assertion: job.made, observation: "id" },
                to: { assertion: "read_back", observation: "created_id" },
            },
        ],
        effect,
        cleanup: effect === "consequential" ? "required" : "none",
    };
}
/**
 * The job library's authored source, sealed into the current policy. Releases
 * read the library inside the pinned policy file generated from it, so the
 * library a rating cites is exactly the published one.
 */
export const AGENT_READINESS_JOB_LIBRARY_SOURCE = {
    library_contract: AGENT_READINESS_JOB_LIBRARY_CONTRACT,
    library_version: "2026-10-12.2",
    jobs: [
        madeAndReadBack({
            job_id: "bounty-claim",
            category: "bounty-board",
            name: "Claim a bounty",
            statement: "Claim an open bounty with a note that is the run's nonce, then read the claim back.",
            made: "bounty_claimed",
            made_statement: "The board accepts the claim under an identifier it returns or was given.",
            read_back_statement: "The claim reads back under that identifier with the nonce as its note.",
        }),
        madeAndReadBack({
            job_id: "bucket-create",
            category: "cloud-platform",
            name: "Create a storage bucket",
            statement: "Create a storage bucket named with the run's nonce, then read it back.",
            made: "bucket_created",
            made_statement: "The platform creates the bucket under an identifier it returns or was given.",
            read_back_statement: "The bucket reads back under that identifier with the nonce as its name.",
        }),
        madeAndReadBack({
            job_id: "cad-document-create",
            category: "cad",
            name: "Create a CAD document",
            statement: "Create a CAD document named with the run's nonce, then read it back.",
            made: "document_created",
            made_statement: "The service creates the document under an identifier it returns or was given.",
            read_back_statement: "The document reads back under that identifier with the nonce as its name.",
        }),
        madeAndReadBack({
            job_id: "chat-message-post",
            category: "team-chat",
            name: "Post a message",
            statement: "Post a message whose text is the run's nonce to a channel, then read it back.",
            made: "message_posted",
            made_statement: "The service posts the message under an identifier it returns or was given.",
            read_back_statement: "The message reads back under that identifier with the nonce as its text.",
        }),
        madeAndReadBack({
            job_id: "compute-instance-create",
            category: "compute",
            name: "Create a compute instance",
            statement: "Create a compute instance labelled with the run's nonce, then read it back.",
            made: "instance_created",
            made_statement: "The service creates the instance under an identifier it returns or was given.",
            read_back_statement: "The instance reads back under that identifier with the nonce as its label.",
        }),
        madeAndReadBack({
            job_id: "content-entry-create",
            category: "content-management",
            name: "Create a content entry",
            statement: "Create a content entry titled with the run's nonce, then read it back.",
            made: "entry_created",
            made_statement: "The service creates the entry under an identifier it returns or was given.",
            read_back_statement: "The entry reads back under that identifier with the nonce as its title.",
        }),
        madeAndReadBack({
            job_id: "crm-contact-create",
            category: "crm",
            name: "Create a contact",
            statement: "Create a contact with a field set to the run's nonce, then read it back.",
            made: "contact_created",
            made_statement: "The service creates the contact under an identifier it returns or was given.",
            read_back_statement: "The contact reads back under that identifier with the nonce in that field.",
        }),
        madeAndReadBack({
            job_id: "database-create",
            category: "database",
            name: "Create a database deployment",
            statement: "Create a database deployment named with the run's nonce, then read it back.",
            made: "deployment_created",
            made_statement: "The service creates the deployment under an identifier it returns or was given.",
            read_back_statement: "The deployment reads back under that identifier with the nonce as its name.",
        }),
        madeAndReadBack({
            job_id: "deployment-create",
            category: "frontend-hosting",
            name: "Create a deployment",
            statement: "Create a deployment named with the run's nonce, then read it back.",
            made: "deployment_created",
            made_statement: "The service creates the deployment under an identifier it returns or was given.",
            read_back_statement: "The deployment reads back under that identifier with the nonce as its name.",
        }),
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
            effect: "billable",
            cleanup: "none",
        },
        madeAndReadBack({
            job_id: "error-event-report",
            category: "error-tracking",
            name: "Report an error",
            statement: "Report an error event whose message is the run's nonce, then read it back.",
            made: "event_reported",
            made_statement: "The service accepts the event under an identifier it returns or was given.",
            read_back_statement: "The event reads back under that identifier with the nonce as its message.",
        }),
        madeAndReadBack({
            job_id: "feature-flag-create",
            category: "feature-flags",
            name: "Create a feature flag",
            statement: "Create a feature flag keyed by the run's nonce, then read it back.",
            made: "flag_created",
            made_statement: "The service creates the flag under an identifier it returns or was given.",
            read_back_statement: "The flag reads back under that identifier with the nonce as its key.",
        }),
        madeAndReadBack({
            job_id: "incident-declare",
            category: "incident-management",
            name: "Declare an incident",
            statement: "Declare an incident named with the run's nonce, then read it back.",
            made: "incident_declared",
            made_statement: "The service declares the incident under an identifier it returns or was given.",
            read_back_statement: "The incident reads back under that identifier with the nonce as its name.",
        }),
        madeAndReadBack({
            job_id: "invoice-create",
            category: "invoicing",
            name: "Create an invoice",
            statement: "Create a draft invoice whose reference is the run's nonce, then read it back.",
            made: "invoice_created",
            made_statement: "The service creates the invoice under an identifier it returns or was given.",
            read_back_statement: "The invoice reads back under that identifier with the nonce as its reference.",
        }),
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
            effect: "billable",
            cleanup: "none",
        },
        madeAndReadBack({
            job_id: "monitor-create",
            category: "monitoring",
            name: "Create a monitor",
            statement: "Create a monitor named with the run's nonce, then read it back.",
            made: "monitor_created",
            made_statement: "The service creates the monitor under an identifier it returns or was given.",
            read_back_statement: "The monitor reads back under that identifier with the nonce as its name.",
        }),
        madeAndReadBack({
            job_id: "payee-create",
            category: "business-banking",
            name: "Add a payee",
            statement: "Add a payee named with the run's nonce, then read it back.",
            made: "payee_added",
            made_statement: "The service adds the payee under an identifier it returns or was given.",
            read_back_statement: "The payee reads back under that identifier with the nonce as its name.",
        }),
        madeAndReadBack({
            job_id: "payment-create",
            category: "payments",
            name: "Create a payment link",
            statement: "Create a payment link with a field set to the run's nonce, then read it back.",
            made: "link_created",
            made_statement: "The service creates the payment link under an identifier it returns or was given.",
            read_back_statement: "The payment link reads back under that identifier with the nonce in that field.",
        }),
        madeAndReadBack({
            job_id: "product-event-capture",
            category: "product-analytics",
            name: "Capture a product event",
            statement: "Capture a product event carrying the run's nonce, then read it back.",
            made: "event_captured",
            made_statement: "The service accepts the event under an identifier it returns or was given.",
            read_back_statement: "The event reads back under that identifier with the nonce among its properties.",
            effect: "billable",
        }),
        madeAndReadBack({
            job_id: "repository-create",
            category: "repository-hosting",
            name: "Create a repository",
            statement: "Create a repository named with the run's nonce, then read it back.",
            made: "repository_created",
            made_statement: "The service creates the repository under an identifier it returns or was given.",
            read_back_statement: "The repository reads back under that identifier with the nonce as its name.",
        }),
        madeAndReadBack({
            job_id: "sandbox-code-run",
            category: "code-sandbox",
            name: "Run code in a sandbox",
            statement: "Start a sandbox carrying the run's nonce, then read the sandbox back.",
            made: "sandbox_started",
            made_statement: "The service starts the sandbox under an identifier it returns or was given.",
            read_back_statement: "The sandbox reads back under that identifier with the nonce.",
        }),
        {
            job_id: "search-record-find",
            category: "search",
            name: "Find a record by search",
            statement: "Index a record whose content is the run's nonce, then search for the nonce.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "record_indexed",
                    statement: "The service indexes the record under an identifier it returns or was given.",
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
            effect: "consequential",
            cleanup: "required",
        },
        {
            job_id: "signature-envelope-send",
            category: "e-signature",
            name: "Send an envelope for signature",
            statement: "Send an envelope to a Sourcey-controlled mailbox, its subject the run's nonce: the service accepts it, and an email carrying the nonce arrives there.",
            inputs: [
                { kind: "nonce", name: "nonce" },
                { kind: "sink", name: "recipient", sink: "email" },
            ],
            assertions: [
                {
                    name: "message_accepted",
                    statement: "The service accepts the envelope and returns its identifier.",
                    proof: "message_accepted",
                },
                {
                    name: "delivered_to_sink",
                    statement: "An email carrying the nonce reaches the Sourcey-controlled mailbox.",
                    proof: "sink_received",
                },
            ],
            observation_links: [],
            effect: "billable",
            cleanup: "none",
        },
        {
            job_id: "sms-send",
            category: "sms-messaging",
            name: "Send a text message",
            statement: "Send a text message carrying the run's nonce to the number its runner supplies, then read its delivery status.",
            inputs: [
                { kind: "nonce", name: "nonce" },
                { kind: "supplied", name: "recipient" },
            ],
            assertions: [
                {
                    name: "message_accepted",
                    statement: "The service accepts the message and returns its identifier.",
                    proof: "message_accepted",
                },
                {
                    name: "message_delivered",
                    statement: "The service's own status for that message reads delivered.",
                    proof: "message_delivered",
                },
            ],
            observation_links: [
                {
                    from: { assertion: "message_accepted", observation: "id" },
                    to: { assertion: "message_delivered", observation: "message_id" },
                },
            ],
            effect: "billable",
            cleanup: "none",
        },
        madeAndReadBack({
            job_id: "support-ticket-create",
            category: "customer-support",
            name: "Create a support ticket",
            statement: "Create a support ticket whose subject is the run's nonce, then read it back.",
            made: "ticket_created",
            made_statement: "The service creates the ticket under an identifier it returns or was given.",
            read_back_statement: "The ticket reads back under that identifier with the nonce as its subject.",
        }),
        madeAndReadBack({
            job_id: "table-record-create",
            category: "tables",
            name: "Add a table record",
            statement: "Add a record whose name is the run's nonce to a table, then read it back.",
            made: "record_added",
            made_statement: "The service adds the record under an identifier it returns or was given.",
            read_back_statement: "The record reads back under that identifier with the nonce as its name.",
        }),
        madeAndReadBack({
            job_id: "task-create",
            category: "task-tracking",
            name: "Create a task",
            statement: "Create a task titled with the run's nonce, then read it back.",
            made: "task_created",
            made_statement: "The service creates the task under an identifier it returns or was given.",
            read_back_statement: "The task reads back under that identifier with the nonce as its title.",
        }),
        madeAndReadBack({
            job_id: "user-create",
            category: "auth",
            name: "Create a user",
            statement: "Create a user with a field set to the run's nonce, then read it back.",
            made: "user_created",
            made_statement: "The service creates the user under an identifier it returns or was given.",
            read_back_statement: "The user reads back under that identifier with the nonce in that field.",
        }),
        {
            job_id: "vector-upsert-query",
            category: "vector-database",
            name: "Find a vector by query",
            statement: "Write a vector whose metadata value is the run's nonce, then query for the nonce.",
            inputs: [{ kind: "nonce", name: "nonce" }],
            assertions: [
                {
                    name: "vector_written",
                    statement: "The service writes the vector under an identifier it returns or was given.",
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
            effect: "consequential",
            cleanup: "required",
        },
        madeAndReadBack({
            job_id: "video-asset-create",
            category: "video",
            name: "Create a video asset",
            statement: "Create a video asset titled with the run's nonce, then read it back.",
            made: "asset_created",
            made_statement: "The service creates the asset under an identifier it returns or was given.",
            read_back_statement: "The asset reads back under that identifier with the nonce as its title.",
        }),
        madeAndReadBack({
            job_id: "workflow-run",
            category: "workflow-automation",
            name: "Run a workflow",
            statement: "Start a run of a workflow with the run's nonce as its input, then read the run back.",
            made: "run_started",
            made_statement: "The service starts the run under an identifier it returns or was given.",
            read_back_statement: "The run reads back under that identifier with the nonce as its input.",
            effect: "billable",
        }),
        madeAndReadBack({
            job_id: "workspace-page-create",
            category: "workspace",
            name: "Create a page",
            statement: "Create a page whose title is the run's nonce in a shared container, then read it back.",
            made: "page_created",
            made_statement: "The service creates the page in the container under an identifier it returns or was given.",
            read_back_statement: "The page reads back under that identifier with the nonce as its title.",
        }),
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