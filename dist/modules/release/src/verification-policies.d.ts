import { type CatalogDelta, type CatalogReleaseBundle } from "../../../contracts/release/src/index.js";
export declare function verifyCatalogDeltaPolicies(bundle: CatalogReleaseBundle, delta: CatalogDelta, files: ReadonlyMap<string, Buffer>): {
    coveragePolicy: {
        policy_contract: "sourcey.coverage/v1alpha1";
        version: string;
        entity_requirements: {
            path: string;
            proof_kinds: ("attested" | "derived" | "editorial" | "observed")[];
            derivation_rules: ("consideration-from-benefits" | "contact-access-from-first-party-mailto" | "eligibility-composition-from-criteria" | "first-party-access-operator" | "form-access-from-first-party-application" | "public-availability-from-application")[];
            guidance: string;
        }[];
        program_requirements: {
            path: string;
            proof_kinds: ("attested" | "derived" | "editorial" | "observed")[];
            derivation_rules: ("consideration-from-benefits" | "contact-access-from-first-party-mailto" | "eligibility-composition-from-criteria" | "first-party-access-operator" | "form-access-from-first-party-application" | "public-availability-from-application")[];
            guidance: string;
        }[];
        offer_requirements: {
            path: string;
            proof_kinds: ("attested" | "derived" | "editorial" | "observed")[];
            derivation_rules: ("consideration-from-benefits" | "contact-access-from-first-party-mailto" | "eligibility-composition-from-criteria" | "first-party-access-operator" | "form-access-from-first-party-application" | "public-availability-from-application")[];
            guidance: string;
        }[];
        policy_digest: string;
    };
    freshnessPolicy: {
        policy_contract: "sourcey.freshness/v1alpha1";
        version: string;
        max_age_days: Record<string, number>;
        policy_digest: string;
    };
    agentReadinessPolicy: {
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
    assuranceMethodPolicy: {
        policy_contract: "sourcey.assurance-method-policy/v1alpha1";
        method_id: string;
        title: string;
        summary: string;
        decision_authority: "authorized-human-review";
        accepted_observation_methods: string[];
        accepted_capture_availability: ("private-receipt" | "public")[];
        accepted_source_standings: ("archived-first-party" | "archived-third-party" | "live-first-party" | "live-third-party" | "manual-first-party" | "manual-third-party")[];
        accepted_proof_kinds: ("attested" | "derived" | "editorial" | "observed")[];
        outcomes: {
            entity_identity: {
                scope: "identity-epoch";
                coverage_paths: ["/domains", "/links", "/name"];
            };
            offer_terms: {
                scope: "exact-revision";
                coverage: "applicable-offer-coverage-policy";
            };
        };
        policy_digest: string;
    };
};
//# sourceMappingURL=verification-policies.d.ts.map