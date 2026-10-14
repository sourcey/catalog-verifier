import type { ExchangeMethod } from "provenry/exchange/records";
import { z } from "zod";
/**
 * Sourcey's job library: the canonical job per service category, each with the
 * success assertions a run must satisfy. A profile binds one service to one library job; a
 * binding maps each assertion to concrete checks, never the other way round,
 * so a service cannot choose an easier job than its category's.
 */
export declare const AGENT_READINESS_JOB_LIBRARY_CONTRACT: "sourcey.agent-readiness-job-library/v1alpha1";
declare const agentReadinessJobSchema: z.ZodObject<{
    job_id: z.ZodString;
    category: z.ZodString;
    name: z.ZodString;
    statement: z.ZodString;
    inputs: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"fixed">;
        name: z.ZodString;
        value: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean]>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"nonce">;
        name: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"sink">;
        name: z.ZodString;
        sink: z.ZodEnum<{
            email: "email";
            webhook: "webhook";
        }>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"supplied">;
        name: z.ZodString;
    }, z.core.$strict>], "kind">>;
    assertions: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        statement: z.ZodString;
        proof: z.ZodEnum<{
            dns_answer: "dns_answer";
            dns_success: "dns_success";
            message_accepted: "message_accepted";
            message_delivered: "message_delivered";
            model_selected: "model_selected";
            resource_created: "resource_created";
            resource_found_by_query: "resource_found_by_query";
            resource_read_back: "resource_read_back";
            sink_received: "sink_received";
            stream_chunks: "stream_chunks";
            tool_called: "tool_called";
        }>;
    }, z.core.$strict>>;
    observation_links: z.ZodArray<z.ZodObject<{
        from: z.ZodObject<{
            assertion: z.ZodString;
            observation: z.ZodString;
        }, z.core.$strict>;
        to: z.ZodObject<{
            assertion: z.ZodString;
            observation: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>>;
    effect: z.ZodEnum<{
        billable: "billable";
        consequential: "consequential";
        read: "read";
    }>;
    cleanup: z.ZodEnum<{
        none: "none";
        required: "required";
    }>;
}, z.core.$strict>;
export type AgentReadinessJob = z.infer<typeof agentReadinessJobSchema>;
export declare const agentReadinessJobLibraryCoreSchema: z.ZodObject<{
    library_contract: z.ZodLiteral<"sourcey.agent-readiness-job-library/v1alpha1">;
    library_version: z.ZodString;
    jobs: z.ZodArray<z.ZodObject<{
        job_id: z.ZodString;
        category: z.ZodString;
        name: z.ZodString;
        statement: z.ZodString;
        inputs: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"fixed">;
            name: z.ZodString;
            value: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean]>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"nonce">;
            name: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"sink">;
            name: z.ZodString;
            sink: z.ZodEnum<{
                email: "email";
                webhook: "webhook";
            }>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"supplied">;
            name: z.ZodString;
        }, z.core.$strict>], "kind">>;
        assertions: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            statement: z.ZodString;
            proof: z.ZodEnum<{
                dns_answer: "dns_answer";
                dns_success: "dns_success";
                message_accepted: "message_accepted";
                message_delivered: "message_delivered";
                model_selected: "model_selected";
                resource_created: "resource_created";
                resource_found_by_query: "resource_found_by_query";
                resource_read_back: "resource_read_back";
                sink_received: "sink_received";
                stream_chunks: "stream_chunks";
                tool_called: "tool_called";
            }>;
        }, z.core.$strict>>;
        observation_links: z.ZodArray<z.ZodObject<{
            from: z.ZodObject<{
                assertion: z.ZodString;
                observation: z.ZodString;
            }, z.core.$strict>;
            to: z.ZodObject<{
                assertion: z.ZodString;
                observation: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
        effect: z.ZodEnum<{
            billable: "billable";
            consequential: "consequential";
            read: "read";
        }>;
        cleanup: z.ZodEnum<{
            none: "none";
            required: "required";
        }>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const agentReadinessJobLibrarySchema: z.ZodObject<{
    library_contract: z.ZodLiteral<"sourcey.agent-readiness-job-library/v1alpha1">;
    library_version: z.ZodString;
    jobs: z.ZodArray<z.ZodObject<{
        job_id: z.ZodString;
        category: z.ZodString;
        name: z.ZodString;
        statement: z.ZodString;
        inputs: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"fixed">;
            name: z.ZodString;
            value: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean]>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"nonce">;
            name: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"sink">;
            name: z.ZodString;
            sink: z.ZodEnum<{
                email: "email";
                webhook: "webhook";
            }>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"supplied">;
            name: z.ZodString;
        }, z.core.$strict>], "kind">>;
        assertions: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            statement: z.ZodString;
            proof: z.ZodEnum<{
                dns_answer: "dns_answer";
                dns_success: "dns_success";
                message_accepted: "message_accepted";
                message_delivered: "message_delivered";
                model_selected: "model_selected";
                resource_created: "resource_created";
                resource_found_by_query: "resource_found_by_query";
                resource_read_back: "resource_read_back";
                sink_received: "sink_received";
                stream_chunks: "stream_chunks";
                tool_called: "tool_called";
            }>;
        }, z.core.$strict>>;
        observation_links: z.ZodArray<z.ZodObject<{
            from: z.ZodObject<{
                assertion: z.ZodString;
                observation: z.ZodString;
            }, z.core.$strict>;
            to: z.ZodObject<{
                assertion: z.ZodString;
                observation: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
        effect: z.ZodEnum<{
            billable: "billable";
            consequential: "consequential";
            read: "read";
        }>;
        cleanup: z.ZodEnum<{
            none: "none";
            required: "required";
        }>;
    }, z.core.$strict>>;
    library_digest: z.ZodString;
}, z.core.$strict>;
export type AgentReadinessJobLibrary = z.infer<typeof agentReadinessJobLibrarySchema>;
export type AgentReadinessProof = AgentReadinessJob["assertions"][number]["proof"];
/** The HTTP methods an observed call may use; a query may send its terms in a body. */
export declare const AGENT_READINESS_OBSERVED_CALL_METHODS: Readonly<Record<"read" | "write" | "query", readonly ExchangeMethod[]>>;
/** One value a proof reads, which a binding locates as an observation. */
export interface AgentReadinessProofOperand {
    readonly name: string;
    /**
     * The call's JSON response or event stream, or what it sent. A binding must
     * place the run's nonce wherever it locates a request observation, so the
     * value is the run's, never the binding's.
     */
    readonly source: "json" | "stream" | "request";
    readonly method?: keyof typeof AGENT_READINESS_OBSERVED_CALL_METHODS;
    /**
     * An identifier the caller may name, as a storage bucket or a vector is named: a binding
     * may locate it in what the write call sent instead of its response, and then the value
     * must carry the run's nonce. A call is observed only once it succeeded, so the service
     * accepted that name.
     */
    readonly callerNamed?: true;
}
/** Whether an observation may locate the operand from this source. */
export declare function agentReadinessOperandReads(operand: AgentReadinessProofOperand, source: AgentReadinessProofOperand["source"]): boolean;
/**
 * What a proof reads and how its reads correlate: the part of its semantics a
 * binding is held to. The engine evaluates what was read.
 */
export interface AgentReadinessProofSignature {
    readonly observations: readonly AgentReadinessProofOperand[];
    readonly sameCall?: readonly (readonly [string, string])[];
    readonly differentCall?: readonly (readonly [string, string])[];
    /** [a, b]: a's call is sent without reading anything b's call returned. */
    readonly independentCall?: readonly (readonly [string, string])[];
}
export declare function agentReadinessProofSignature(proof: AgentReadinessProof): AgentReadinessProofSignature;
export {};
//# sourceMappingURL=jobs.d.ts.map