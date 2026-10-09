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
    readonly library_version: "2026-10-09";
    readonly jobs: [{
        readonly job_id: "bounty-claim";
        readonly category: "bounty-board";
        readonly name: "Claim a bounty";
        readonly statement: "Claim an open bounty with a note that is the run's nonce, then read the claim back.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }];
        readonly assertions: [{
            readonly name: "bounty_claimed";
            readonly statement: "The board accepts the claim and returns its identifier.";
            readonly proof: "resource_created";
        }, {
            readonly name: "read_back";
            readonly statement: "The claim reads back under that identifier with the nonce as its note.";
            readonly proof: "resource_read_back";
        }];
        readonly observation_links: [{
            readonly from: {
                readonly assertion: "bounty_claimed";
                readonly observation: "id";
            };
            readonly to: {
                readonly assertion: "read_back";
                readonly observation: "created_id";
            };
        }];
        readonly error_probe: {
            readonly statement: "A claim on a bounty that does not exist.";
        };
        readonly effect: "consequential";
        readonly cleanup: "required";
    }, {
        readonly job_id: "bucket-create";
        readonly category: "cloud-platform";
        readonly name: "Create a storage bucket";
        readonly statement: "Create a storage bucket named with the run's nonce, then read it back.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }];
        readonly assertions: [{
            readonly name: "bucket_created";
            readonly statement: "The platform creates the bucket and returns its identifier.";
            readonly proof: "resource_created";
        }, {
            readonly name: "read_back";
            readonly statement: "The bucket reads back under that identifier with the nonce as its name.";
            readonly proof: "resource_read_back";
        }];
        readonly observation_links: [{
            readonly from: {
                readonly assertion: "bucket_created";
                readonly observation: "id";
            };
            readonly to: {
                readonly assertion: "read_back";
                readonly observation: "created_id";
            };
        }];
        readonly error_probe: {
            readonly statement: "A bucket request with a name the platform does not allow.";
        };
        readonly effect: "consequential";
        readonly cleanup: "required";
    }, {
        readonly job_id: "chat-message-post";
        readonly category: "team-chat";
        readonly name: "Post a message";
        readonly statement: "Post a message whose text is the run's nonce to a channel, then read it back.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }];
        readonly assertions: [{
            readonly name: "message_posted";
            readonly statement: "The service posts the message and returns its identifier.";
            readonly proof: "resource_created";
        }, {
            readonly name: "read_back";
            readonly statement: "The message reads back under that identifier with the nonce as its text.";
            readonly proof: "resource_read_back";
        }];
        readonly observation_links: [{
            readonly from: {
                readonly assertion: "message_posted";
                readonly observation: "id";
            };
            readonly to: {
                readonly assertion: "read_back";
                readonly observation: "created_id";
            };
        }];
        readonly error_probe: {
            readonly statement: "A message to a channel that does not exist.";
        };
        readonly effect: "consequential";
        readonly cleanup: "required";
    }, {
        readonly job_id: "crm-contact-create";
        readonly category: "crm";
        readonly name: "Create a contact";
        readonly statement: "Create a contact with a field set to the run's nonce, then read it back.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }];
        readonly assertions: [{
            readonly name: "contact_created";
            readonly statement: "The service creates the contact and returns its identifier.";
            readonly proof: "resource_created";
        }, {
            readonly name: "read_back";
            readonly statement: "The contact reads back under that identifier with the nonce in that field.";
            readonly proof: "resource_read_back";
        }];
        readonly observation_links: [{
            readonly from: {
                readonly assertion: "contact_created";
                readonly observation: "id";
            };
            readonly to: {
                readonly assertion: "read_back";
                readonly observation: "created_id";
            };
        }];
        readonly error_probe: {
            readonly statement: "A contact request with an email address that is not valid.";
        };
        readonly effect: "consequential";
        readonly cleanup: "required";
    }, {
        readonly job_id: "database-create";
        readonly category: "database";
        readonly name: "Create a database deployment";
        readonly statement: "Create a database deployment named with the run's nonce, then read it back.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }];
        readonly assertions: [{
            readonly name: "deployment_created";
            readonly statement: "The service creates the deployment and returns its identifier.";
            readonly proof: "resource_created";
        }, {
            readonly name: "read_back";
            readonly statement: "The deployment reads back under that identifier with the nonce as its name.";
            readonly proof: "resource_read_back";
        }];
        readonly observation_links: [{
            readonly from: {
                readonly assertion: "deployment_created";
                readonly observation: "id";
            };
            readonly to: {
                readonly assertion: "read_back";
                readonly observation: "created_id";
            };
        }];
        readonly error_probe: {
            readonly statement: "A database request with a name the service does not allow.";
        };
        readonly effect: "consequential";
        readonly cleanup: "required";
    }, {
        readonly job_id: "deployment-create";
        readonly category: "frontend-hosting";
        readonly name: "Create a deployment";
        readonly statement: "Create a deployment named with the run's nonce, then read it back.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }];
        readonly assertions: [{
            readonly name: "deployment_created";
            readonly statement: "The service creates the deployment and returns its identifier.";
            readonly proof: "resource_created";
        }, {
            readonly name: "read_back";
            readonly statement: "The deployment reads back under that identifier with the nonce as its name.";
            readonly proof: "resource_read_back";
        }];
        readonly observation_links: [{
            readonly from: {
                readonly assertion: "deployment_created";
                readonly observation: "id";
            };
            readonly to: {
                readonly assertion: "read_back";
                readonly observation: "created_id";
            };
        }];
        readonly error_probe: {
            readonly statement: "A deployment request for a project that does not exist.";
        };
        readonly effect: "consequential";
        readonly cleanup: "required";
    }, {
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
        readonly job_id: "email-send";
        readonly category: "email";
        readonly name: "Send an email";
        readonly statement: "Send an email whose body carries the run's nonce to a Sourcey-controlled mailbox.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }, {
            readonly kind: "sink";
            readonly name: "recipient";
            readonly sink: "email";
        }];
        readonly assertions: [{
            readonly name: "message_accepted";
            readonly statement: "The service accepts the email and returns its identifier.";
            readonly proof: "message_accepted";
        }, {
            readonly name: "delivered_to_sink";
            readonly statement: "The email reaches the Sourcey-controlled mailbox, carrying the nonce.";
            readonly proof: "sink_received";
        }];
        readonly observation_links: [];
        readonly error_probe: {
            readonly statement: "An email to a recipient address that is not valid.";
        };
        readonly effect: "billable";
        readonly cleanup: "none";
    }, {
        readonly job_id: "error-event-report";
        readonly category: "error-tracking";
        readonly name: "Report an error";
        readonly statement: "Report an error event whose message is the run's nonce, then read it back.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }];
        readonly assertions: [{
            readonly name: "event_reported";
            readonly statement: "The service accepts the event and returns its identifier.";
            readonly proof: "resource_created";
        }, {
            readonly name: "read_back";
            readonly statement: "The event reads back under that identifier with the nonce as its message.";
            readonly proof: "resource_read_back";
        }];
        readonly observation_links: [{
            readonly from: {
                readonly assertion: "event_reported";
                readonly observation: "id";
            };
            readonly to: {
                readonly assertion: "read_back";
                readonly observation: "created_id";
            };
        }];
        readonly error_probe: {
            readonly statement: "An event sent to a project that does not exist.";
        };
        readonly effect: "consequential";
        readonly cleanup: "required";
    }, {
        readonly job_id: "feature-flag-create";
        readonly category: "feature-flags";
        readonly name: "Create a feature flag";
        readonly statement: "Create a feature flag keyed by the run's nonce, then read it back.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }];
        readonly assertions: [{
            readonly name: "flag_created";
            readonly statement: "The service creates the flag and returns its identifier.";
            readonly proof: "resource_created";
        }, {
            readonly name: "read_back";
            readonly statement: "The flag reads back under that identifier with the nonce as its key.";
            readonly proof: "resource_read_back";
        }];
        readonly observation_links: [{
            readonly from: {
                readonly assertion: "flag_created";
                readonly observation: "id";
            };
            readonly to: {
                readonly assertion: "read_back";
                readonly observation: "created_id";
            };
        }];
        readonly error_probe: {
            readonly statement: "A flag request with a key the service does not allow.";
        };
        readonly effect: "consequential";
        readonly cleanup: "required";
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
        readonly job_id: "monitor-create";
        readonly category: "monitoring";
        readonly name: "Create a monitor";
        readonly statement: "Create a monitor named with the run's nonce, then read it back.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }];
        readonly assertions: [{
            readonly name: "monitor_created";
            readonly statement: "The service creates the monitor and returns its identifier.";
            readonly proof: "resource_created";
        }, {
            readonly name: "read_back";
            readonly statement: "The monitor reads back under that identifier with the nonce as its name.";
            readonly proof: "resource_read_back";
        }];
        readonly observation_links: [{
            readonly from: {
                readonly assertion: "monitor_created";
                readonly observation: "id";
            };
            readonly to: {
                readonly assertion: "read_back";
                readonly observation: "created_id";
            };
        }];
        readonly error_probe: {
            readonly statement: "A monitor request with a query the service cannot parse.";
        };
        readonly effect: "consequential";
        readonly cleanup: "required";
    }, {
        readonly job_id: "payment-create";
        readonly category: "payments";
        readonly name: "Create a payment link";
        readonly statement: "Create a payment link with a field set to the run's nonce, then read it back.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }];
        readonly assertions: [{
            readonly name: "link_created";
            readonly statement: "The service creates the payment link and returns its identifier.";
            readonly proof: "resource_created";
        }, {
            readonly name: "read_back";
            readonly statement: "The payment link reads back under that identifier with the nonce in that field.";
            readonly proof: "resource_read_back";
        }];
        readonly observation_links: [{
            readonly from: {
                readonly assertion: "link_created";
                readonly observation: "id";
            };
            readonly to: {
                readonly assertion: "read_back";
                readonly observation: "created_id";
            };
        }];
        readonly error_probe: {
            readonly statement: "A payment link with an amount the service does not accept.";
        };
        readonly effect: "consequential";
        readonly cleanup: "required";
    }, {
        readonly job_id: "repository-create";
        readonly category: "repository-hosting";
        readonly name: "Create a repository";
        readonly statement: "Create a repository named with the run's nonce, then read it back.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }];
        readonly assertions: [{
            readonly name: "repository_created";
            readonly statement: "The service creates the repository and returns its identifier.";
            readonly proof: "resource_created";
        }, {
            readonly name: "read_back";
            readonly statement: "The repository reads back under that identifier with the nonce as its name.";
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
        readonly job_id: "search-record-find";
        readonly category: "search";
        readonly name: "Find a record by search";
        readonly statement: "Index a record whose content is the run's nonce, then search for the nonce.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }];
        readonly assertions: [{
            readonly name: "record_indexed";
            readonly statement: "The service indexes the record and returns its identifier.";
            readonly proof: "resource_created";
        }, {
            readonly name: "record_found";
            readonly statement: "A search whose query is the nonce, sent without the created identifier, returns the record under that identifier with the nonce as its content.";
            readonly proof: "resource_found_by_query";
        }];
        readonly observation_links: [{
            readonly from: {
                readonly assertion: "record_indexed";
                readonly observation: "id";
            };
            readonly to: {
                readonly assertion: "record_found";
                readonly observation: "created_id";
            };
        }];
        readonly error_probe: {
            readonly statement: "A search against an index that does not exist.";
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
        readonly job_id: "user-create";
        readonly category: "auth";
        readonly name: "Create a user";
        readonly statement: "Create a user with a field set to the run's nonce, then read it back.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }];
        readonly assertions: [{
            readonly name: "user_created";
            readonly statement: "The service creates the user and returns its identifier.";
            readonly proof: "resource_created";
        }, {
            readonly name: "read_back";
            readonly statement: "The user reads back under that identifier with the nonce in that field.";
            readonly proof: "resource_read_back";
        }];
        readonly observation_links: [{
            readonly from: {
                readonly assertion: "user_created";
                readonly observation: "id";
            };
            readonly to: {
                readonly assertion: "read_back";
                readonly observation: "created_id";
            };
        }];
        readonly error_probe: {
            readonly statement: "A user request with an email address that is not valid.";
        };
        readonly effect: "consequential";
        readonly cleanup: "required";
    }, {
        readonly job_id: "vector-upsert-query";
        readonly category: "vector-database";
        readonly name: "Find a vector by query";
        readonly statement: "Write a vector whose metadata value is the run's nonce, then query for the nonce.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }];
        readonly assertions: [{
            readonly name: "vector_written";
            readonly statement: "The service writes the vector and returns its identifier.";
            readonly proof: "resource_created";
        }, {
            readonly name: "vector_found";
            readonly statement: "A query for the nonce, sent without the created identifier, returns the vector under that identifier with the nonce as its metadata value.";
            readonly proof: "resource_found_by_query";
        }];
        readonly observation_links: [{
            readonly from: {
                readonly assertion: "vector_written";
                readonly observation: "id";
            };
            readonly to: {
                readonly assertion: "vector_found";
                readonly observation: "created_id";
            };
        }];
        readonly error_probe: {
            readonly statement: "A query against an index that does not exist.";
        };
        readonly effect: "consequential";
        readonly cleanup: "required";
    }, {
        readonly job_id: "workspace-page-create";
        readonly category: "workspace";
        readonly name: "Create a page";
        readonly statement: "Create a page whose title is the run's nonce in a shared container, then read it back.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }];
        readonly assertions: [{
            readonly name: "page_created";
            readonly statement: "The service creates the page in the container and returns its identifier.";
            readonly proof: "resource_created";
        }, {
            readonly name: "read_back";
            readonly statement: "The page reads back under that identifier with the nonce as its title.";
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