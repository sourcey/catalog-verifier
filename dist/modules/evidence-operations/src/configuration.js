import { compareCanonicalStrings, digest, IDENTIFIER_PATTERN } from "provenry/primitives";
import { z } from "zod";
import { capturePolicyDefinitionSchema } from "../../../contracts/capture/src/index.js";
import { evidenceSubjectSchema } from "../../../contracts/evidence/src/index.js";
export { capturePolicyDefinitionSchema, } from "../../../contracts/capture/src/index.js";
const digestSchema = z.string().regex(/^sha256:[a-f0-9]{64}$/);
const evidenceTargetSchema = z
    .object({
    target_contract: z.literal("sourcey.evidence-target/v1alpha1"),
    target_id: z.string().regex(IDENTIFIER_PATTERN),
    source_url: z.url(),
    subject: evidenceSubjectSchema,
    classification: z.enum(["public", "restricted"]),
    capture_policy_id: z.string().min(1),
    retry_policy_id: z.string().min(1),
    extractor_id: z.string().min(1),
    prompt_id: z.string().min(1).nullable(),
})
    .strict();
const evidenceScheduleSchema = z
    .object({
    schedule_contract: z.literal("sourcey.evidence-schedule/v1alpha1"),
    schedule_id: z.string().regex(/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/),
    target_id: z.string().regex(IDENTIFIER_PATTERN),
    cron: z.string().min(1),
    timezone: z.literal("UTC"),
    enabled: z.boolean(),
})
    .strict();
const retryPolicyDefinitionSchema = z
    .object({
    policy_contract: z.literal("sourcey.retry-policy/v1alpha1"),
    policy_id: z.string().min(1),
    maximum_attempts: z.number().int().positive(),
    initial_delay_ms: z.number().int().nonnegative(),
    maximum_delay_ms: z.number().int().nonnegative(),
    strategy: z.enum(["fixed", "exponential"]),
})
    .strict()
    .superRefine((value, context) => {
    if (value.maximum_delay_ms < value.initial_delay_ms) {
        context.addIssue({
            code: "custom",
            path: ["maximum_delay_ms"],
            message: "Retry maximum delay cannot precede its initial delay.",
        });
    }
});
const extractorDefinitionSchema = z
    .object({
    extractor_contract: z.literal("sourcey.extractor-definition/v1alpha1"),
    extractor_id: z.string().min(1),
    kind: z.literal("structured-model"),
    version: z.string().min(1),
    toolchain_digest: digestSchema,
    output_contract: z.string().min(1),
})
    .strict();
const promptDefinitionSchema = z
    .object({
    prompt_contract: z.literal("sourcey.prompt-definition/v1alpha1"),
    prompt_id: z.string().min(1),
    version: z.string().min(1),
    text: z.string().min(1),
    output_contract: z.string().min(1),
})
    .strict();
const evidenceOpsBundleCoreSchema = z
    .object({
    bundle_contract: z.literal("sourcey.evidence-ops-bundle/v1"),
    targets: z.array(evidenceTargetSchema),
    schedules: z.array(evidenceScheduleSchema),
    capture_policies: z.array(capturePolicyDefinitionSchema),
    retry_policies: z.array(retryPolicyDefinitionSchema),
    extractors: z.array(extractorDefinitionSchema),
    prompts: z.array(promptDefinitionSchema),
    entries: z.array(z
        .object({
        kind: z.enum([
            "target",
            "schedule",
            "capture-policy",
            "retry-policy",
            "extractor",
            "prompt",
        ]),
        id: z.string().min(1),
        source_path: z.string().startsWith("ops/evidence/"),
        source_digest: digestSchema,
    })
        .strict()),
})
    .strict();
const evidenceOpsBundleSchema = evidenceOpsBundleCoreSchema
    .extend({ bundle_digest: digestSchema })
    .strict();
export function compileEvidenceOpsBundle(input) {
    const parsed = input.sources.map((source) => {
        if (!source.path.startsWith("ops/evidence/") ||
            source.path.includes("\\") ||
            source.path.split("/").some((segment) => segment === "." || segment === "..")) {
            throw new Error(`Evidence operations source path ${source.path} is invalid.`);
        }
        const parsedSource = parseEvidenceOpsSource(source.value);
        return { ...parsedSource, path: source.path };
    });
    const keys = parsed.map((source) => `${source.kind}:${source.id}`);
    if (new Set(keys).size !== keys.length) {
        throw new Error("Evidence operations sources repeat a kind and ID.");
    }
    const targets = new Map(parsed
        .filter((source) => source.kind === "target")
        .map((source) => [source.id, source.value]));
    const ids = (kind) => new Set(parsed.filter((source) => source.kind === kind).map((source) => source.id));
    const capturePolicies = ids("capture-policy");
    const retryPolicies = ids("retry-policy");
    const extractors = ids("extractor");
    const prompts = ids("prompt");
    for (const target of targets.values()) {
        if (!capturePolicies.has(target.capture_policy_id) ||
            !retryPolicies.has(target.retry_policy_id) ||
            !extractors.has(target.extractor_id) ||
            (target.prompt_id !== null && !prompts.has(target.prompt_id))) {
            throw new Error(`Evidence target ${target.target_id} has an unresolved configuration.`);
        }
    }
    for (const source of parsed.filter((candidate) => candidate.kind === "schedule")) {
        const schedule = source.value;
        if (!targets.has(schedule.target_id)) {
            throw new Error(`Evidence schedule ${schedule.schedule_id} targets an unknown source.`);
        }
    }
    const core = evidenceOpsBundleCoreSchema.parse({
        bundle_contract: "sourcey.evidence-ops-bundle/v1",
        targets: parsed
            .filter((source) => source.kind === "target")
            .map((source) => source.value)
            .sort((left, right) => compareCanonicalStrings(left.target_id, right.target_id)),
        schedules: parsed
            .filter((source) => source.kind === "schedule")
            .map((source) => source.value)
            .sort((left, right) => compareCanonicalStrings(left.schedule_id, right.schedule_id)),
        capture_policies: parsed
            .filter((source) => source.kind === "capture-policy")
            .map((source) => source.value)
            .sort((left, right) => compareCanonicalStrings(left.policy_id, right.policy_id)),
        retry_policies: parsed
            .filter((source) => source.kind === "retry-policy")
            .map((source) => source.value)
            .sort((left, right) => compareCanonicalStrings(left.policy_id, right.policy_id)),
        extractors: parsed
            .filter((source) => source.kind === "extractor")
            .map((source) => source.value)
            .sort((left, right) => compareCanonicalStrings(left.extractor_id, right.extractor_id)),
        prompts: parsed
            .filter((source) => source.kind === "prompt")
            .map((source) => source.value)
            .sort((left, right) => compareCanonicalStrings(left.prompt_id, right.prompt_id)),
        entries: parsed
            .map((source) => ({
            kind: source.kind,
            id: source.id,
            source_path: source.path,
            source_digest: digest(source.value),
        }))
            .sort((left, right) => compareCanonicalStrings(left.kind, right.kind) ||
            compareCanonicalStrings(left.id, right.id)),
    });
    return evidenceOpsBundleSchema.parse({ ...core, bundle_digest: digest(core) });
}
function parseEvidenceOpsSource(input) {
    const value = typeof input === "object" && input !== null ? input : {};
    if (value.target_contract === "sourcey.evidence-target/v1alpha1") {
        const parsed = evidenceTargetSchema.parse(value);
        return { kind: "target", id: parsed.target_id, value: parsed };
    }
    if (value.schedule_contract === "sourcey.evidence-schedule/v1alpha1") {
        const parsed = evidenceScheduleSchema.parse(value);
        return { kind: "schedule", id: parsed.schedule_id, value: parsed };
    }
    if (value.policy_contract === "sourcey.capture-policy/v1alpha1") {
        const parsed = capturePolicyDefinitionSchema.parse(value);
        return { kind: "capture-policy", id: parsed.policy_id, value: parsed };
    }
    if (value.policy_contract === "sourcey.retry-policy/v1alpha1") {
        const parsed = retryPolicyDefinitionSchema.parse(value);
        return { kind: "retry-policy", id: parsed.policy_id, value: parsed };
    }
    if (value.extractor_contract === "sourcey.extractor-definition/v1alpha1") {
        const parsed = extractorDefinitionSchema.parse(value);
        return { kind: "extractor", id: parsed.extractor_id, value: parsed };
    }
    if (value.prompt_contract === "sourcey.prompt-definition/v1alpha1") {
        const parsed = promptDefinitionSchema.parse(value);
        return { kind: "prompt", id: parsed.prompt_id, value: parsed };
    }
    throw new Error("Unknown evidence operations source contract.");
}
//# sourceMappingURL=configuration.js.map