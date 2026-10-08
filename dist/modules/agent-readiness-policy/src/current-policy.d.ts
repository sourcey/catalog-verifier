/**
 * The policy this code pins: new declarations are validated against it.
 * Releases and their verifier read the pinned file instead, which the
 * generator writes from this value and a test proves equal to it.
 */
export declare const currentAgentReadinessPolicy: {
    policy_contract: "sourcey.agent-readiness-policy/v1alpha1";
    policy_version: string;
    job_library: {
        library_contract: "sourcey.agent-readiness-job-library/v1alpha1";
        library_version: string;
        jobs: {
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
                sink: "email" | "phone" | "webhook";
            })[];
            assertions: {
                name: string;
                statement: string;
                proof: "dns_answer" | "dns_success" | "message_accepted" | "model_selected" | "resource_created" | "resource_read_back" | "sink_received" | "stream_chunks" | "tool_called";
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
            error_probe: {
                statement: string;
            };
            effect: "billable" | "consequential" | "read";
            cleanup: "none" | "required";
        }[];
        library_digest: string;
    };
    letters: {
        letter: "A" | "A+" | "B" | "B+" | "C" | "C+";
        condition: {
            workarounds_allowed: boolean;
            recurring_allowed_in: ("confirm" | "delegation" | "discover" | "job" | "pay" | "sustain")[];
            recurring_required_in: ("confirm" | "delegation" | "discover" | "job" | "pay" | "sustain")[] | null;
            setup_workarounds: {
                minimum: number;
                maximum: number | null;
            };
        };
        coverage: ("confirm" | "delegation" | "discover" | "job" | "pay" | "sustain")[];
        statement: string;
    }[];
    blocked: {
        attempts: number;
        minimum_interval_seconds: number;
        statuses: number[];
        statements: {
            D: string;
            F: string;
        };
    };
    fresh_for_days: number;
    policy_digest: string;
};
//# sourceMappingURL=current-policy.d.ts.map