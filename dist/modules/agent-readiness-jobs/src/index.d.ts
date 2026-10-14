import { type Digest } from "provenry/primitives";
import type { z } from "zod";
import { type AgentReadinessJob, type AgentReadinessJobLibrary, agentReadinessJobLibraryCoreSchema } from "../../../contracts/agent-readiness/src/jobs.js";
/**
 * The job library's authored source, sealed into the current policy. Releases
 * read the library inside the pinned policy file generated from it, so the
 * library a rating cites is exactly the published one.
 */
export declare const AGENT_READINESS_JOB_LIBRARY_SOURCE: {
    readonly library_contract: "sourcey.agent-readiness-job-library/v1alpha1";
    readonly library_version: "2026-10-12.2";
    readonly jobs: [{
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
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
        readonly effect: "billable";
        readonly cleanup: "none";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
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
        readonly effect: "billable";
        readonly cleanup: "none";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
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
            readonly statement: "The service indexes the record under an identifier it returns or was given.";
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
        readonly effect: "consequential";
        readonly cleanup: "required";
    }, {
        readonly job_id: "signature-envelope-send";
        readonly category: "e-signature";
        readonly name: "Send an envelope for signature";
        readonly statement: "Send an envelope to a Sourcey-controlled mailbox, its subject the run's nonce: the service accepts it, and an email carrying the nonce arrives there.";
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
            readonly statement: "The service accepts the envelope and returns its identifier.";
            readonly proof: "message_accepted";
        }, {
            readonly name: "delivered_to_sink";
            readonly statement: "An email carrying the nonce reaches the Sourcey-controlled mailbox.";
            readonly proof: "sink_received";
        }];
        readonly observation_links: [];
        readonly effect: "billable";
        readonly cleanup: "none";
    }, {
        readonly job_id: "sms-send";
        readonly category: "sms-messaging";
        readonly name: "Send a text message";
        readonly statement: "Send a text message carrying the run's nonce to the number its runner supplies, then read its delivery status.";
        readonly inputs: [{
            readonly kind: "nonce";
            readonly name: "nonce";
        }, {
            readonly kind: "supplied";
            readonly name: "recipient";
        }];
        readonly assertions: [{
            readonly name: "message_accepted";
            readonly statement: "The service accepts the message and returns its identifier.";
            readonly proof: "message_accepted";
        }, {
            readonly name: "message_delivered";
            readonly statement: "The service's own status for that message reads delivered.";
            readonly proof: "message_delivered";
        }];
        readonly observation_links: [{
            readonly from: {
                readonly assertion: "message_accepted";
                readonly observation: "id";
            };
            readonly to: {
                readonly assertion: "message_delivered";
                readonly observation: "message_id";
            };
        }];
        readonly effect: "billable";
        readonly cleanup: "none";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
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
            readonly statement: "The service writes the vector under an identifier it returns or was given.";
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
        readonly effect: "consequential";
        readonly cleanup: "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
    }, {
        job_id: string;
        category: string;
        name: string;
        statement: string;
        inputs: ({
            kind: "fixed";
            name: string;
            value: string | number | boolean;
        } | {
            kind: "nonce";
            name: string;
        } | {
            kind: "sink";
            name: string;
            sink: "email" | "webhook";
        } | {
            kind: "supplied";
            name: string;
        })[];
        assertions: {
            name: string;
            statement: string;
            proof: "dns_answer" | "dns_success" | "message_accepted" | "message_delivered" | "model_selected" | "resource_created" | "resource_found_by_query" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
        }[];
        observation_links: {
            from: {
                assertion: string;
                observation: string;
            };
            to: {
                assertion: string;
                observation: string;
            };
        }[];
        effect: "billable" | "consequential" | "read";
        cleanup: "none" | "required";
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