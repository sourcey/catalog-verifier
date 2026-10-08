import { z } from "zod";
/**
 * The rating rules as data: the jobs a profile can be rated on, which letter a
 * path earns and what it must have assessed to earn it, when a step counts as
 * blocked, and how long a run stays fresh. The engine applies them; the
 * published file is what every reader, the verifier included, applies.
 */
export declare const AGENT_READINESS_POLICY_CONTRACT: "sourcey.agent-readiness-policy/v1alpha1";
export declare const agentReadinessPolicyCoreSchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.agent-readiness-policy/v1alpha1">;
    policy_version: z.ZodString;
    job_library: z.ZodObject<{
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
    letters: z.ZodArray<z.ZodObject<{
        letter: z.ZodEnum<{
            A: "A";
            "A+": "A+";
            B: "B";
            "B+": "B+";
            C: "C";
            "C+": "C+";
        }>;
        condition: z.ZodObject<{
            workarounds_allowed: z.ZodBoolean;
            recurring_allowed_in: z.ZodArray<z.ZodEnum<{
                confirm: "confirm";
                delegation: "delegation";
                discover: "discover";
                job: "job";
                pay: "pay";
                sustain: "sustain";
            }>>;
            recurring_required_in: z.ZodNullable<z.ZodArray<z.ZodEnum<{
                confirm: "confirm";
                delegation: "delegation";
                discover: "discover";
                job: "job";
                pay: "pay";
                sustain: "sustain";
            }>>>;
            setup_workarounds: z.ZodObject<{
                minimum: z.ZodNumber;
                maximum: z.ZodNullable<z.ZodNumber>;
            }, z.core.$strict>;
        }, z.core.$strict>;
        coverage: z.ZodArray<z.ZodEnum<{
            confirm: "confirm";
            delegation: "delegation";
            discover: "discover";
            job: "job";
            pay: "pay";
            sustain: "sustain";
        }>>;
        statement: z.ZodString;
    }, z.core.$strict>>;
    blocked: z.ZodObject<{
        attempts: z.ZodNumber;
        minimum_interval_seconds: z.ZodNumber;
        statuses: z.ZodArray<z.ZodNumber>;
        statements: z.ZodObject<{
            D: z.ZodString;
            F: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>;
    fresh_for_days: z.ZodNumber;
}, z.core.$strict>;
export declare const agentReadinessPolicySchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.agent-readiness-policy/v1alpha1">;
    policy_version: z.ZodString;
    job_library: z.ZodObject<{
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
    letters: z.ZodArray<z.ZodObject<{
        letter: z.ZodEnum<{
            A: "A";
            "A+": "A+";
            B: "B";
            "B+": "B+";
            C: "C";
            "C+": "C+";
        }>;
        condition: z.ZodObject<{
            workarounds_allowed: z.ZodBoolean;
            recurring_allowed_in: z.ZodArray<z.ZodEnum<{
                confirm: "confirm";
                delegation: "delegation";
                discover: "discover";
                job: "job";
                pay: "pay";
                sustain: "sustain";
            }>>;
            recurring_required_in: z.ZodNullable<z.ZodArray<z.ZodEnum<{
                confirm: "confirm";
                delegation: "delegation";
                discover: "discover";
                job: "job";
                pay: "pay";
                sustain: "sustain";
            }>>>;
            setup_workarounds: z.ZodObject<{
                minimum: z.ZodNumber;
                maximum: z.ZodNullable<z.ZodNumber>;
            }, z.core.$strict>;
        }, z.core.$strict>;
        coverage: z.ZodArray<z.ZodEnum<{
            confirm: "confirm";
            delegation: "delegation";
            discover: "discover";
            job: "job";
            pay: "pay";
            sustain: "sustain";
        }>>;
        statement: z.ZodString;
    }, z.core.$strict>>;
    blocked: z.ZodObject<{
        attempts: z.ZodNumber;
        minimum_interval_seconds: z.ZodNumber;
        statuses: z.ZodArray<z.ZodNumber>;
        statements: z.ZodObject<{
            D: z.ZodString;
            F: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>;
    fresh_for_days: z.ZodNumber;
    policy_digest: z.ZodString;
}, z.core.$strict>;
export type AgentReadinessPolicy = z.infer<typeof agentReadinessPolicySchema>;
//# sourceMappingURL=operate-policy.d.ts.map