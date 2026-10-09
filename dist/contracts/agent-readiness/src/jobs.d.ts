import { z } from "zod";
/**
 * Sourcey's job library: the canonical job per service category, each with the
 * success assertions a run must satisfy and the class of safe invalid request
 * that must fail typed. A profile binds one service to one library job; a
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
            phone: "phone";
            webhook: "webhook";
        }>;
    }, z.core.$strict>], "kind">>;
    assertions: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        statement: z.ZodString;
        proof: z.ZodEnum<{
            dns_answer: "dns_answer";
            dns_success: "dns_success";
            message_accepted: "message_accepted";
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
    error_probe: z.ZodObject<{
        statement: z.ZodString;
    }, z.core.$strict>;
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
                phone: "phone";
                webhook: "webhook";
            }>;
        }, z.core.$strict>], "kind">>;
        assertions: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            statement: z.ZodString;
            proof: z.ZodEnum<{
                dns_answer: "dns_answer";
                dns_success: "dns_success";
                message_accepted: "message_accepted";
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
        error_probe: z.ZodObject<{
            statement: z.ZodString;
        }, z.core.$strict>;
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
                phone: "phone";
                webhook: "webhook";
            }>;
        }, z.core.$strict>], "kind">>;
        assertions: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            statement: z.ZodString;
            proof: z.ZodEnum<{
                dns_answer: "dns_answer";
                dns_success: "dns_success";
                message_accepted: "message_accepted";
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
        error_probe: z.ZodObject<{
            statement: z.ZodString;
        }, z.core.$strict>;
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
export {};
//# sourceMappingURL=jobs.d.ts.map