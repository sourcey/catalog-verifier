import { z } from "zod";
declare const startupCreditsAdmissionReportCoreSchema: z.ZodObject<{
    report_contract: z.ZodLiteral<"sourcey.startup-credits-admission-report/v1alpha1">;
    repository: z.ZodString;
    pull_request_number: z.ZodNumber;
    base_sha: z.ZodString;
    head_sha: z.ZodString;
    source_tree: z.ZodString;
    change_tree: z.ZodString;
    live_source_commit: z.ZodString;
    live_parent_release_id: z.ZodString;
    evaluated_at: z.ZodISODateTime;
    changed_files: z.ZodArray<z.ZodString>;
    subjects: z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            entity: "entity";
            offer: "offer";
            program: "program";
        }>;
        entity_id: z.ZodString;
        program_id: z.ZodNullable<z.ZodString>;
        offer_id: z.ZodNullable<z.ZodString>;
        label: z.ZodString;
        revision_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>>;
    candidate_domains: z.ZodArray<z.ZodString>;
    sources: z.ZodArray<z.ZodObject<{
        subject_revision_digest: z.ZodString;
        source_id: z.ZodString;
        requested_url: z.ZodURL;
        final_url: z.ZodNullable<z.ZodURL>;
        final_host: z.ZodNullable<z.ZodString>;
        authority: z.ZodEnum<{
            ambiguous: "ambiguous";
            canonical: "canonical";
            inert: "inert";
        }>;
        capture_status: z.ZodEnum<{
            anomaly: "anomaly";
            captured: "captured";
            not_attempted: "not_attempted";
            retryable_failure: "retryable_failure";
            terminal_failure: "terminal_failure";
        }>;
        response_status_code: z.ZodNullable<z.ZodNumber>;
        capture_digest: z.ZodNullable<z.ZodString>;
        normalized_object_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>>;
    claims: z.ZodArray<z.ZodObject<{
        subject_revision_digest: z.ZodString;
        path: z.ZodString;
        status: z.ZodEnum<{
            contradicted: "contradicted";
            supported: "supported";
            unresolved: "unresolved";
            unsupported: "unsupported";
        }>;
        guidance: z.ZodString;
        result_digest: z.ZodString;
        bindings: z.ZodArray<z.ZodObject<{
            source_id: z.ZodString;
            binding_digest: z.ZodString;
            locators: z.ZodArray<z.ZodObject<{
                kind: z.ZodLiteral<"utf8-range">;
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        residue_codes: z.ZodArray<z.ZodString>;
    }, z.core.$strict>>;
    conflicts: z.ZodArray<z.ZodObject<{
        kind: z.ZodString;
        strength: z.ZodEnum<{
            ambiguous: "ambiguous";
            exact: "exact";
        }>;
        key_digest: z.ZodString;
        target_references: z.ZodArray<z.ZodString>;
        source_references: z.ZodArray<z.ZodString>;
    }, z.core.$strict>>;
    company_admission: z.ZodOptional<z.ZodObject<{
        binding_contract: z.ZodLiteral<"sourcey.company-admission-binding/v1alpha1">;
        entity_id: z.ZodString;
        registrable_domain: z.ZodString;
        official_source_url: z.ZodURL;
        route: z.ZodEnum<{
            free_machine_review: "free_machine_review";
            human_verification_required: "human_verification_required";
        }>;
        result_digest: z.ZodString;
        evidence_digest: z.ZodString;
        policy_digest: z.ZodString;
        expires_at: z.ZodISODateTime;
        verification_digest: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    outcome: z.ZodEnum<{
        auto_admissible: "auto_admissible";
        human_review_required: "human_review_required";
        needs_revision: "needs_revision";
        rejected: "rejected";
        temporarily_unavailable: "temporarily_unavailable";
    }>;
    reason_codes: z.ZodArray<z.ZodString>;
    retryable: z.ZodBoolean;
    next_action: z.ZodEnum<{
        merge: "merge";
        retry: "retry";
        review: "review";
        revise: "revise";
        stop: "stop";
    }>;
    model_effects: z.ZodArray<z.ZodObject<{
        provider: z.ZodString;
        model: z.ZodString;
        receipt_digest: z.ZodString;
        spend_microusd: z.ZodNumber;
        cached: z.ZodBoolean;
        uses: z.ZodArray<z.ZodObject<{
            subject_revision_digest: z.ZodString;
            source_id: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    authority: z.ZodObject<{
        machine_policy_digest: z.ZodString;
        coverage_policy_digest: z.ZodString;
        evaluator_digest: z.ZodString;
        input_digest: z.ZodNullable<z.ZodString>;
        result_digest: z.ZodNullable<z.ZodString>;
        execution_receipt_digest: z.ZodNullable<z.ZodString>;
        admission_artifact_digest: z.ZodNullable<z.ZodString>;
        admission_candidate_url: z.ZodNullable<z.ZodURL>;
        evidence_authority_set_digest: z.ZodNullable<z.ZodString>;
        asset_authority_bundle_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strict>;
declare const startupCreditsAdmissionReportSchema: z.ZodObject<{
    report_contract: z.ZodLiteral<"sourcey.startup-credits-admission-report/v1alpha1">;
    repository: z.ZodString;
    pull_request_number: z.ZodNumber;
    base_sha: z.ZodString;
    head_sha: z.ZodString;
    source_tree: z.ZodString;
    change_tree: z.ZodString;
    live_source_commit: z.ZodString;
    live_parent_release_id: z.ZodString;
    evaluated_at: z.ZodISODateTime;
    changed_files: z.ZodArray<z.ZodString>;
    subjects: z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            entity: "entity";
            offer: "offer";
            program: "program";
        }>;
        entity_id: z.ZodString;
        program_id: z.ZodNullable<z.ZodString>;
        offer_id: z.ZodNullable<z.ZodString>;
        label: z.ZodString;
        revision_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>>;
    candidate_domains: z.ZodArray<z.ZodString>;
    sources: z.ZodArray<z.ZodObject<{
        subject_revision_digest: z.ZodString;
        source_id: z.ZodString;
        requested_url: z.ZodURL;
        final_url: z.ZodNullable<z.ZodURL>;
        final_host: z.ZodNullable<z.ZodString>;
        authority: z.ZodEnum<{
            ambiguous: "ambiguous";
            canonical: "canonical";
            inert: "inert";
        }>;
        capture_status: z.ZodEnum<{
            anomaly: "anomaly";
            captured: "captured";
            not_attempted: "not_attempted";
            retryable_failure: "retryable_failure";
            terminal_failure: "terminal_failure";
        }>;
        response_status_code: z.ZodNullable<z.ZodNumber>;
        capture_digest: z.ZodNullable<z.ZodString>;
        normalized_object_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>>;
    claims: z.ZodArray<z.ZodObject<{
        subject_revision_digest: z.ZodString;
        path: z.ZodString;
        status: z.ZodEnum<{
            contradicted: "contradicted";
            supported: "supported";
            unresolved: "unresolved";
            unsupported: "unsupported";
        }>;
        guidance: z.ZodString;
        result_digest: z.ZodString;
        bindings: z.ZodArray<z.ZodObject<{
            source_id: z.ZodString;
            binding_digest: z.ZodString;
            locators: z.ZodArray<z.ZodObject<{
                kind: z.ZodLiteral<"utf8-range">;
                start_byte: z.ZodNumber;
                end_byte: z.ZodNumber;
                value_digest: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        residue_codes: z.ZodArray<z.ZodString>;
    }, z.core.$strict>>;
    conflicts: z.ZodArray<z.ZodObject<{
        kind: z.ZodString;
        strength: z.ZodEnum<{
            ambiguous: "ambiguous";
            exact: "exact";
        }>;
        key_digest: z.ZodString;
        target_references: z.ZodArray<z.ZodString>;
        source_references: z.ZodArray<z.ZodString>;
    }, z.core.$strict>>;
    company_admission: z.ZodOptional<z.ZodObject<{
        binding_contract: z.ZodLiteral<"sourcey.company-admission-binding/v1alpha1">;
        entity_id: z.ZodString;
        registrable_domain: z.ZodString;
        official_source_url: z.ZodURL;
        route: z.ZodEnum<{
            free_machine_review: "free_machine_review";
            human_verification_required: "human_verification_required";
        }>;
        result_digest: z.ZodString;
        evidence_digest: z.ZodString;
        policy_digest: z.ZodString;
        expires_at: z.ZodISODateTime;
        verification_digest: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    outcome: z.ZodEnum<{
        auto_admissible: "auto_admissible";
        human_review_required: "human_review_required";
        needs_revision: "needs_revision";
        rejected: "rejected";
        temporarily_unavailable: "temporarily_unavailable";
    }>;
    reason_codes: z.ZodArray<z.ZodString>;
    retryable: z.ZodBoolean;
    next_action: z.ZodEnum<{
        merge: "merge";
        retry: "retry";
        review: "review";
        revise: "revise";
        stop: "stop";
    }>;
    model_effects: z.ZodArray<z.ZodObject<{
        provider: z.ZodString;
        model: z.ZodString;
        receipt_digest: z.ZodString;
        spend_microusd: z.ZodNumber;
        cached: z.ZodBoolean;
        uses: z.ZodArray<z.ZodObject<{
            subject_revision_digest: z.ZodString;
            source_id: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    authority: z.ZodObject<{
        machine_policy_digest: z.ZodString;
        coverage_policy_digest: z.ZodString;
        evaluator_digest: z.ZodString;
        input_digest: z.ZodNullable<z.ZodString>;
        result_digest: z.ZodNullable<z.ZodString>;
        execution_receipt_digest: z.ZodNullable<z.ZodString>;
        admission_artifact_digest: z.ZodNullable<z.ZodString>;
        admission_candidate_url: z.ZodNullable<z.ZodURL>;
        evidence_authority_set_digest: z.ZodNullable<z.ZodString>;
        asset_authority_bundle_digest: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>;
    report_digest: z.ZodString;
}, z.core.$strict>;
export type StartupCreditsAdmissionReport = z.infer<typeof startupCreditsAdmissionReportSchema>;
export declare function createStartupCreditsAdmissionReport(input: z.input<typeof startupCreditsAdmissionReportCoreSchema>): StartupCreditsAdmissionReport;
/** One thing Sourcey checked on a pull request head, worded for its contributor. */
export declare const admissionSummaryCheckSchema: z.ZodObject<{
    key: z.ZodEnum<{
        admission: "admission";
        company: "company";
        conflicts: "conflicts";
        facts: "facts";
        files: "files";
        logo: "logo";
        review: "review";
        sources: "sources";
        standing: "standing";
        verification: "verification";
    }>;
    status: z.ZodEnum<{
        attention: "attention";
        failed: "failed";
        passed: "passed";
        pending: "pending";
    }>;
    title: z.ZodString;
    details: z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        path: z.ZodNullable<z.ZodString>;
        url: z.ZodNullable<z.ZodURL>;
    }, z.core.$strict>>;
}, z.core.$strict>;
/**
 * What Sourcey's admission concluded for one exact pull request head, as its contributor reads it
 * on the `sourcey/admission` check and on Sourcey's page for the pull request: one state, what
 * happens next, and every check with what passed and exactly what did not.
 */
export declare const admissionSummarySchema: z.ZodObject<{
    summary_contract: z.ZodLiteral<"sourcey.pull-request-admission-summary/v1alpha1">;
    repository: z.ZodString;
    pull_request_number: z.ZodNumber;
    head_sha: z.ZodString;
    state: z.ZodEnum<{
        needs_change: "needs_change";
        needs_person: "needs_person";
        passed: "passed";
        refused: "refused";
        verification_offered: "verification_offered";
        verification_refused: "verification_refused";
        verifying: "verifying";
    }>;
    title: z.ZodString;
    lead: z.ZodString;
    company: z.ZodNullable<z.ZodString>;
    checks: z.ZodArray<z.ZodObject<{
        key: z.ZodEnum<{
            admission: "admission";
            company: "company";
            conflicts: "conflicts";
            facts: "facts";
            files: "files";
            logo: "logo";
            review: "review";
            sources: "sources";
            standing: "standing";
            verification: "verification";
        }>;
        status: z.ZodEnum<{
            attention: "attention";
            failed: "failed";
            passed: "passed";
            pending: "pending";
        }>;
        title: z.ZodString;
        details: z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            path: z.ZodNullable<z.ZodString>;
            url: z.ZodNullable<z.ZodURL>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    standing: z.ZodNullable<z.ZodObject<{
        evaluated_at: z.ZodISODateTime;
        rule: z.ZodString;
        criteria: z.ZodArray<z.ZodObject<{
            key: z.ZodEnum<{
                certificate_age: "certificate_age";
                domain_age: "domain_age";
                mx: "mx";
                reach: "reach";
                source: "source";
            }>;
            label: z.ZodString;
            value: z.ZodString;
            requirement: z.ZodString;
            met: z.ZodNullable<z.ZodBoolean>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    report_url: z.ZodNullable<z.ZodURL>;
}, z.core.$strict>;
export type AdmissionSummaryCheck = z.infer<typeof admissionSummaryCheckSchema>;
export type AdmissionSummary = z.infer<typeof admissionSummarySchema>;
export declare function verifyStartupCreditsAdmissionReport(input: unknown): StartupCreditsAdmissionReport;
export {};
//# sourceMappingURL=index.d.ts.map