/**
 * The library this code installs: new declarations are checked against its jobs. Sealed here,
 * apart from the library's definitions, so a browser that reads the jobs never computes a digest.
 */
export declare const currentAgentReadinessJobLibrary: {
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
    }[];
    library_digest: string;
};
//# sourceMappingURL=current.d.ts.map