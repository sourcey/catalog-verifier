import { z } from "zod";
export declare const evidenceTargetSchema: z.ZodObject<{
    target_contract: z.ZodLiteral<"sourcey.evidence-target/v1alpha1">;
    target_id: z.ZodString;
    source_url: z.ZodURL;
    subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
        subject_type: z.ZodLiteral<"entity">;
        entity_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        subject_type: z.ZodLiteral<"program">;
        entity_id: z.ZodString;
        program_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        subject_type: z.ZodLiteral<"offer">;
        entity_id: z.ZodString;
        program_id: z.ZodOptional<z.ZodString>;
        offer_id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        subject_type: z.ZodLiteral<"agent_readiness_profile">;
        entity_id: z.ZodString;
        agent_readiness_profile_id: z.ZodString;
    }, z.core.$strict>], "subject_type">;
    classification: z.ZodEnum<{
        public: "public";
        restricted: "restricted";
    }>;
    capture_policy_id: z.ZodString;
    retry_policy_id: z.ZodString;
    extractor_id: z.ZodString;
    prompt_id: z.ZodNullable<z.ZodString>;
}, z.core.$strict>;
export declare const evidenceScheduleSchema: z.ZodObject<{
    schedule_contract: z.ZodLiteral<"sourcey.evidence-schedule/v1alpha1">;
    schedule_id: z.ZodString;
    target_id: z.ZodString;
    cron: z.ZodString;
    timezone: z.ZodLiteral<"UTC">;
    enabled: z.ZodBoolean;
}, z.core.$strict>;
export declare const capturePolicyDefinitionSchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.capture-policy/v1alpha1">;
    policy_id: z.ZodString;
    maximum_bytes: z.ZodNumber;
    timeout_ms: z.ZodNumber;
    redirects: z.ZodEnum<{
        reject: "reject";
        "same-origin": "same-origin";
        "allowed-hosts": "allowed-hosts";
    }>;
    require_https: z.ZodBoolean;
    minimum_document_text_bytes: z.ZodNumber;
}, z.core.$strict>;
export type CapturePolicyDefinition = z.infer<typeof capturePolicyDefinitionSchema>;
export declare const retryPolicyDefinitionSchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.retry-policy/v1alpha1">;
    policy_id: z.ZodString;
    maximum_attempts: z.ZodNumber;
    initial_delay_ms: z.ZodNumber;
    maximum_delay_ms: z.ZodNumber;
    strategy: z.ZodEnum<{
        fixed: "fixed";
        exponential: "exponential";
    }>;
}, z.core.$strict>;
export declare const extractorDefinitionSchema: z.ZodObject<{
    extractor_contract: z.ZodLiteral<"sourcey.extractor-definition/v1alpha1">;
    extractor_id: z.ZodString;
    kind: z.ZodEnum<{
        "deterministic-text": "deterministic-text";
        "structured-model": "structured-model";
    }>;
    version: z.ZodString;
    toolchain_digest: z.ZodString;
    output_contract: z.ZodString;
}, z.core.$strict>;
export declare const promptDefinitionSchema: z.ZodObject<{
    prompt_contract: z.ZodLiteral<"sourcey.prompt-definition/v1alpha1">;
    prompt_id: z.ZodString;
    version: z.ZodString;
    text: z.ZodString;
    output_contract: z.ZodString;
}, z.core.$strict>;
export declare const evidenceOpsBundleCoreSchema: z.ZodObject<{
    bundle_contract: z.ZodLiteral<"sourcey.evidence-ops-bundle/v1">;
    targets: z.ZodArray<z.ZodObject<{
        target_contract: z.ZodLiteral<"sourcey.evidence-target/v1alpha1">;
        target_id: z.ZodString;
        source_url: z.ZodURL;
        subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
            subject_type: z.ZodLiteral<"entity">;
            entity_id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"program">;
            entity_id: z.ZodString;
            program_id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"offer">;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"agent_readiness_profile">;
            entity_id: z.ZodString;
            agent_readiness_profile_id: z.ZodString;
        }, z.core.$strict>], "subject_type">;
        classification: z.ZodEnum<{
            public: "public";
            restricted: "restricted";
        }>;
        capture_policy_id: z.ZodString;
        retry_policy_id: z.ZodString;
        extractor_id: z.ZodString;
        prompt_id: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>>;
    schedules: z.ZodArray<z.ZodObject<{
        schedule_contract: z.ZodLiteral<"sourcey.evidence-schedule/v1alpha1">;
        schedule_id: z.ZodString;
        target_id: z.ZodString;
        cron: z.ZodString;
        timezone: z.ZodLiteral<"UTC">;
        enabled: z.ZodBoolean;
    }, z.core.$strict>>;
    capture_policies: z.ZodArray<z.ZodObject<{
        policy_contract: z.ZodLiteral<"sourcey.capture-policy/v1alpha1">;
        policy_id: z.ZodString;
        maximum_bytes: z.ZodNumber;
        timeout_ms: z.ZodNumber;
        redirects: z.ZodEnum<{
            reject: "reject";
            "same-origin": "same-origin";
            "allowed-hosts": "allowed-hosts";
        }>;
        require_https: z.ZodBoolean;
        minimum_document_text_bytes: z.ZodNumber;
    }, z.core.$strict>>;
    retry_policies: z.ZodArray<z.ZodObject<{
        policy_contract: z.ZodLiteral<"sourcey.retry-policy/v1alpha1">;
        policy_id: z.ZodString;
        maximum_attempts: z.ZodNumber;
        initial_delay_ms: z.ZodNumber;
        maximum_delay_ms: z.ZodNumber;
        strategy: z.ZodEnum<{
            fixed: "fixed";
            exponential: "exponential";
        }>;
    }, z.core.$strict>>;
    extractors: z.ZodArray<z.ZodObject<{
        extractor_contract: z.ZodLiteral<"sourcey.extractor-definition/v1alpha1">;
        extractor_id: z.ZodString;
        kind: z.ZodEnum<{
            "deterministic-text": "deterministic-text";
            "structured-model": "structured-model";
        }>;
        version: z.ZodString;
        toolchain_digest: z.ZodString;
        output_contract: z.ZodString;
    }, z.core.$strict>>;
    prompts: z.ZodArray<z.ZodObject<{
        prompt_contract: z.ZodLiteral<"sourcey.prompt-definition/v1alpha1">;
        prompt_id: z.ZodString;
        version: z.ZodString;
        text: z.ZodString;
        output_contract: z.ZodString;
    }, z.core.$strict>>;
    entries: z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            target: "target";
            schedule: "schedule";
            "capture-policy": "capture-policy";
            "retry-policy": "retry-policy";
            extractor: "extractor";
            prompt: "prompt";
        }>;
        id: z.ZodString;
        source_path: z.ZodString;
        source_digest: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const evidenceOpsBundleSchema: z.ZodObject<{
    bundle_contract: z.ZodLiteral<"sourcey.evidence-ops-bundle/v1">;
    targets: z.ZodArray<z.ZodObject<{
        target_contract: z.ZodLiteral<"sourcey.evidence-target/v1alpha1">;
        target_id: z.ZodString;
        source_url: z.ZodURL;
        subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
            subject_type: z.ZodLiteral<"entity">;
            entity_id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"program">;
            entity_id: z.ZodString;
            program_id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"offer">;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"agent_readiness_profile">;
            entity_id: z.ZodString;
            agent_readiness_profile_id: z.ZodString;
        }, z.core.$strict>], "subject_type">;
        classification: z.ZodEnum<{
            public: "public";
            restricted: "restricted";
        }>;
        capture_policy_id: z.ZodString;
        retry_policy_id: z.ZodString;
        extractor_id: z.ZodString;
        prompt_id: z.ZodNullable<z.ZodString>;
    }, z.core.$strict>>;
    schedules: z.ZodArray<z.ZodObject<{
        schedule_contract: z.ZodLiteral<"sourcey.evidence-schedule/v1alpha1">;
        schedule_id: z.ZodString;
        target_id: z.ZodString;
        cron: z.ZodString;
        timezone: z.ZodLiteral<"UTC">;
        enabled: z.ZodBoolean;
    }, z.core.$strict>>;
    capture_policies: z.ZodArray<z.ZodObject<{
        policy_contract: z.ZodLiteral<"sourcey.capture-policy/v1alpha1">;
        policy_id: z.ZodString;
        maximum_bytes: z.ZodNumber;
        timeout_ms: z.ZodNumber;
        redirects: z.ZodEnum<{
            reject: "reject";
            "same-origin": "same-origin";
            "allowed-hosts": "allowed-hosts";
        }>;
        require_https: z.ZodBoolean;
        minimum_document_text_bytes: z.ZodNumber;
    }, z.core.$strict>>;
    retry_policies: z.ZodArray<z.ZodObject<{
        policy_contract: z.ZodLiteral<"sourcey.retry-policy/v1alpha1">;
        policy_id: z.ZodString;
        maximum_attempts: z.ZodNumber;
        initial_delay_ms: z.ZodNumber;
        maximum_delay_ms: z.ZodNumber;
        strategy: z.ZodEnum<{
            fixed: "fixed";
            exponential: "exponential";
        }>;
    }, z.core.$strict>>;
    extractors: z.ZodArray<z.ZodObject<{
        extractor_contract: z.ZodLiteral<"sourcey.extractor-definition/v1alpha1">;
        extractor_id: z.ZodString;
        kind: z.ZodEnum<{
            "deterministic-text": "deterministic-text";
            "structured-model": "structured-model";
        }>;
        version: z.ZodString;
        toolchain_digest: z.ZodString;
        output_contract: z.ZodString;
    }, z.core.$strict>>;
    prompts: z.ZodArray<z.ZodObject<{
        prompt_contract: z.ZodLiteral<"sourcey.prompt-definition/v1alpha1">;
        prompt_id: z.ZodString;
        version: z.ZodString;
        text: z.ZodString;
        output_contract: z.ZodString;
    }, z.core.$strict>>;
    entries: z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            target: "target";
            schedule: "schedule";
            "capture-policy": "capture-policy";
            "retry-policy": "retry-policy";
            extractor: "extractor";
            prompt: "prompt";
        }>;
        id: z.ZodString;
        source_path: z.ZodString;
        source_digest: z.ZodString;
    }, z.core.$strict>>;
    bundle_digest: z.ZodString;
}, z.core.$strict>;
export type EvidenceOpsBundle = z.infer<typeof evidenceOpsBundleSchema>;
export declare function compileEvidenceOpsBundle(input: {
    readonly sources: ReadonlyArray<{
        readonly path: string;
        readonly value: unknown;
    }>;
}): EvidenceOpsBundle;
//# sourceMappingURL=configuration.d.ts.map