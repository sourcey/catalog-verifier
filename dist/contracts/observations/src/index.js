import { DIGEST_PATTERN, IDENTIFIER_PATTERN } from "provenry/primitives";
import { z } from "zod";
import { sourceyEvidenceCaptureMethodNames } from "../../capture/src/method-names.js";
import { evidenceArtifactScopeSchema, evidenceCaptureAvailabilitySchema, evidenceNormalizedObjectSchema, evidenceRedirectSchema, evidenceSourceContentSchema, evidenceSourceStandingSchema, validateEvidenceArtifactScopeClosure, } from "../../evidence/src/index.js";
const digest = z.string().regex(DIGEST_PATTERN);
const identifier = z.string().regex(IDENTIFIER_PATTERN);
const instant = z.iso.datetime({ offset: true });
const observationMethodKnownValues = ["fixture", ...sourceyEvidenceCaptureMethodNames];
export const observationMethodSchema = identifier.meta({
    description: "Capture adapter identifier. Known values are examples; new adapters may appear without changing the observation envelope.",
    examples: observationMethodKnownValues,
    "x-sourcey-extensible-enum": true,
});
const captureSchema = z
    .object({
    digest,
    bytes: z.number().int().nonnegative(),
    media_type: z.string().min(1),
    availability: evidenceCaptureAvailabilitySchema,
    requested_uri: z.url({ protocol: /^https$/ }).optional(),
    final_uri: z.url({ protocol: /^https$/ }).optional(),
    redirect_chain: z.array(evidenceRedirectSchema).max(5).optional(),
    source_standing: evidenceSourceStandingSchema.optional(),
    normalized_object: evidenceNormalizedObjectSchema.optional(),
    artifact_scope: evidenceArtifactScopeSchema.optional(),
    source_content: evidenceSourceContentSchema.optional(),
})
    .strict()
    .superRefine(validateEvidenceArtifactScopeClosure);
export const observationCoreSchema = z
    .object({
    observation_contract: z.literal("sourcey.observation/v1alpha1"),
    source_id: identifier,
    source_uri: z.url(),
    retrieved_at: instant,
    method: z
        .object({
        name: observationMethodSchema,
        version: z.string().min(1),
    })
        .strict(),
    outcome: z.enum(["supports-candidate", "contradicts-candidate", "unreachable", "error"]),
    capture: captureSchema.optional(),
    no_capture_reason: z
        .enum([
        "dns-failure",
        "connect-timeout",
        "tls-failure",
        "access-denied",
        "policy-blocked",
        "empty-response",
        "extractor-error",
    ])
        .optional(),
})
    .strict()
    .superRefine((value, context) => {
    const successful = value.outcome === "supports-candidate" || value.outcome === "contradicts-candidate";
    if (successful && !value.capture) {
        context.addIssue({
            code: "custom",
            path: ["capture"],
            message: "A supporting or contradicting observation requires captured bytes.",
        });
    }
    if (!successful && !value.no_capture_reason) {
        context.addIssue({
            code: "custom",
            path: ["no_capture_reason"],
            message: "An unsuccessful observation requires a typed no-capture reason.",
        });
    }
    if (value.capture && value.no_capture_reason) {
        context.addIssue({
            code: "custom",
            message: "An observation cannot have both capture bytes and a no-capture reason.",
        });
    }
});
export const observationSchema = observationCoreSchema
    .extend({
    observation_id: digest,
})
    .strict();
export const observationPackManifestSchema = z
    .object({
    schema_version: z.literal("sourcey.observation-pack-manifest/v1alpha1"),
    pack_path: z.string().min(1),
    pack_digest: digest,
    bytes: z.number().int().nonnegative(),
    records: z.number().int().nonnegative(),
    first_retrieved_at: instant.nullable(),
    last_retrieved_at: instant.nullable(),
    shard: z.string().min(1),
})
    .strict()
    .superRefine((value, context) => {
    const empty = value.records === 0;
    if ((empty &&
        (value.bytes !== 1 ||
            value.first_retrieved_at !== null ||
            value.last_retrieved_at !== null)) ||
        (!empty && (value.first_retrieved_at === null || value.last_retrieved_at === null))) {
        context.addIssue({
            code: "custom",
            message: "Empty observation packs require one terminating LF byte and null time bounds; non-empty packs require both bounds.",
        });
    }
});
//# sourceMappingURL=index.js.map