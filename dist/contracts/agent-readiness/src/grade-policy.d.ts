import { z } from "zod";
/**
 * The rating rules as data (north star §5.7): the jobs a profile is rated on,
 * the kind of each person-step a path can hold, the kinds each letter allows
 * (and, for A, how many),
 * how a finding is reproduced, and how long a run stays fresh. The engine
 * applies them; the published file is what every reader, the verifier
 * included, applies.
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
    person_steps: z.ZodArray<z.ZodObject<{
        step: z.ZodEnum<{
            authority: "authority";
            confirm: "confirm";
            discover: "discover";
            onboard: "onboard";
            pay: "pay";
            sustain: "sustain";
        }>;
        outcome: z.ZodEnum<{
            approval: "approval";
            gated: "gated";
            workaround: "workaround";
        }>;
        timing: z.ZodNullable<z.ZodEnum<{
            recurring: "recurring";
            setup: "setup";
        }>>;
        kind: z.ZodEnum<{
            card: "card";
            gated: "gated";
            key: "key";
            light: "light";
            recurring: "recurring";
            sign_up: "sign_up";
        }>;
    }, z.core.$strict>>;
    letters: z.ZodArray<z.ZodObject<{
        letter: z.ZodEnum<{
            A: "A";
            "A+": "A+";
            B: "B";
            "B+": "B+";
            C: "C";
            D: "D";
            F: "F";
        }>;
        allows: z.ZodObject<{
            kinds: z.ZodArray<z.ZodEnum<{
                card: "card";
                gated: "gated";
                key: "key";
                light: "light";
                recurring: "recurring";
                sign_up: "sign_up";
            }>>;
            most_steps: z.ZodNullable<z.ZodNumber>;
            unavailable: z.ZodBoolean;
        }, z.core.$strict>;
        statement: z.ZodString;
    }, z.core.$strict>>;
    reproduction: z.ZodObject<{
        attempts: z.ZodNumber;
        minimum_interval_seconds: z.ZodNumber;
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
    person_steps: z.ZodArray<z.ZodObject<{
        step: z.ZodEnum<{
            authority: "authority";
            confirm: "confirm";
            discover: "discover";
            onboard: "onboard";
            pay: "pay";
            sustain: "sustain";
        }>;
        outcome: z.ZodEnum<{
            approval: "approval";
            gated: "gated";
            workaround: "workaround";
        }>;
        timing: z.ZodNullable<z.ZodEnum<{
            recurring: "recurring";
            setup: "setup";
        }>>;
        kind: z.ZodEnum<{
            card: "card";
            gated: "gated";
            key: "key";
            light: "light";
            recurring: "recurring";
            sign_up: "sign_up";
        }>;
    }, z.core.$strict>>;
    letters: z.ZodArray<z.ZodObject<{
        letter: z.ZodEnum<{
            A: "A";
            "A+": "A+";
            B: "B";
            "B+": "B+";
            C: "C";
            D: "D";
            F: "F";
        }>;
        allows: z.ZodObject<{
            kinds: z.ZodArray<z.ZodEnum<{
                card: "card";
                gated: "gated";
                key: "key";
                light: "light";
                recurring: "recurring";
                sign_up: "sign_up";
            }>>;
            most_steps: z.ZodNullable<z.ZodNumber>;
            unavailable: z.ZodBoolean;
        }, z.core.$strict>;
        statement: z.ZodString;
    }, z.core.$strict>>;
    reproduction: z.ZodObject<{
        attempts: z.ZodNumber;
        minimum_interval_seconds: z.ZodNumber;
    }, z.core.$strict>;
    fresh_for_days: z.ZodNumber;
    policy_digest: z.ZodString;
}, z.core.$strict>;
export type AgentReadinessPolicy = z.infer<typeof agentReadinessPolicySchema>;
//# sourceMappingURL=grade-policy.d.ts.map