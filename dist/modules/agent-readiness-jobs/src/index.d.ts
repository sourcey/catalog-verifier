import { type Digest } from "provenry/primitives";
import type { z } from "zod";
import { type AgentReadinessJob, type AgentReadinessJobLibrary, agentReadinessJobLibraryCoreSchema } from "../../../contracts/agent-readiness/src/index.js";
/**
 * The job library's authored source, sealed into the current policy. Releases
 * read the library inside the pinned policy file generated from it, so the
 * library a rating cites is exactly the published one.
 */
export declare const AGENT_READINESS_JOB_LIBRARY_SOURCE: {
    readonly library_contract: "sourcey.agent-readiness-job-library/v1alpha1";
    readonly library_version: "2026-10-06";
    readonly jobs: [{
        readonly job_id: "dns-resolve";
        readonly category: "dns-resolver";
        readonly name: "Resolve a name";
        readonly statement: "Resolve a Sourcey-controlled name to its address records.";
        readonly inputs: [{
            readonly kind: "fixed";
            readonly name: "name";
            readonly value: "sourcey.com";
        }];
        readonly assertions: [{
            readonly name: "answer_for_query";
            readonly statement: "A typed answer names the queried name and carries at least one address record.";
            readonly proof: "dns_answer";
        }, {
            readonly name: "resolution_succeeded";
            readonly statement: "The resolver reports success for the query.";
            readonly proof: "dns_success";
        }];
        readonly observation_links: [{
            readonly from: {
                readonly assertion: "answer_for_query";
                readonly observation: "query_name";
            };
            readonly to: {
                readonly assertion: "resolution_succeeded";
                readonly observation: "status";
            };
        }];
        readonly error_probe: {
            readonly statement: "A query for a record type the resolver does not define.";
        };
        readonly effect: "read";
        readonly cleanup: "none";
    }, {
        readonly job_id: "model-chat-stream-tool";
        readonly category: "model-api";
        readonly name: "Stream a completion with a tool call";
        readonly statement: "Choose a model from the service's live model list, stream a chat completion from it and receive a call to a provided tool.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }];
        readonly assertions: [{
            readonly name: "model_listed";
            readonly statement: "The model used appears in the service's live model list.";
            readonly proof: "model_selected";
        }, {
            readonly name: "stream_chunks";
            readonly statement: "The completion streams in more than one chunk.";
            readonly proof: "stream_chunks";
        }, {
            readonly name: "tool_call_emitted";
            readonly statement: "The model emits a call to the provided tool.";
            readonly proof: "tool_called";
        }];
        readonly observation_links: [{
            readonly from: {
                readonly assertion: "model_listed";
                readonly observation: "used_model";
            };
            readonly to: {
                readonly assertion: "stream_chunks";
                readonly observation: "chunks";
            };
        }, {
            readonly from: {
                readonly assertion: "stream_chunks";
                readonly observation: "chunks";
            };
            readonly to: {
                readonly assertion: "tool_call_emitted";
                readonly observation: "tool_name";
            };
        }];
        readonly error_probe: {
            readonly statement: "A completion request naming a model that does not exist.";
        };
        readonly effect: "billable";
        readonly cleanup: "none";
    }, {
        readonly job_id: "repository-create";
        readonly category: "repository-hosting";
        readonly name: "Create a repository";
        readonly statement: "Create a repository named for the run and read it back.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }];
        readonly assertions: [{
            readonly name: "repository_created";
            readonly statement: "The service creates the repository.";
            readonly proof: "resource_created";
        }, {
            readonly name: "read_back";
            readonly statement: "The repository reads back under the name that carries the run's nonce.";
            readonly proof: "resource_read_back";
        }];
        readonly observation_links: [{
            readonly from: {
                readonly assertion: "repository_created";
                readonly observation: "id";
            };
            readonly to: {
                readonly assertion: "read_back";
                readonly observation: "created_id";
            };
        }];
        readonly error_probe: {
            readonly statement: "A repository request with a name the service does not allow.";
        };
        readonly effect: "consequential";
        readonly cleanup: "required";
    }, {
        readonly job_id: "sms-send";
        readonly category: "sms-messaging";
        readonly name: "Send a text message";
        readonly statement: "Send a text message carrying the run's nonce to a Sourcey-controlled number.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }, {
            readonly kind: "sink";
            readonly name: "recipient";
            readonly sink: "phone";
        }];
        readonly assertions: [{
            readonly name: "message_accepted";
            readonly statement: "The service accepts the message and returns its identifier.";
            readonly proof: "message_accepted";
        }, {
            readonly name: "delivered_to_sink";
            readonly statement: "The message reaches the Sourcey-controlled number, carrying the nonce.";
            readonly proof: "sink_received";
        }];
        readonly observation_links: [];
        readonly error_probe: {
            readonly statement: "A message to a recipient number that cannot exist.";
        };
        readonly effect: "billable";
        readonly cleanup: "none";
    }, {
        readonly job_id: "workspace-page-create";
        readonly category: "workspace";
        readonly name: "Create a page";
        readonly statement: "Create a page carrying the run's nonce in a shared container and read it back.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }];
        readonly assertions: [{
            readonly name: "page_created";
            readonly statement: "The service creates the page in the container.";
            readonly proof: "resource_created";
        }, {
            readonly name: "read_back";
            readonly statement: "The page reads back with the content that carries the nonce.";
            readonly proof: "resource_read_back";
        }];
        readonly observation_links: [{
            readonly from: {
                readonly assertion: "page_created";
                readonly observation: "id";
            };
            readonly to: {
                readonly assertion: "read_back";
                readonly observation: "created_id";
            };
        }];
        readonly error_probe: {
            readonly statement: "A page request for a container that does not exist.";
        };
        readonly effect: "consequential";
        readonly cleanup: "required";
    }];
};
/** The library with its digest, checked as every reader checks it. */
export declare function sealAgentReadinessJobLibrary(source: z.input<typeof agentReadinessJobLibraryCoreSchema>): AgentReadinessJobLibrary;
/** A published library, only when its digest closes its content. */
export declare function verifyAgentReadinessJobLibrary(value: unknown): AgentReadinessJobLibrary;
/** The identity a run and a revision cite: the exact job definition, not its library. */
export declare function agentReadinessJobDigest(job: AgentReadinessJob): Digest;
/** The job a profile names, from the exact library it cites. */
export declare function agentReadinessLibraryJob(library: AgentReadinessJobLibrary, jobId: string): AgentReadinessJob;
//# sourceMappingURL=index.d.ts.map