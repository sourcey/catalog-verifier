import { DIGEST_PATTERN } from "provenry/primitives";
import { z } from "zod";
const digestSchema = z.string().regex(DIGEST_PATTERN);
const standardKeySchema = z.string().regex(/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/);
const standardVersionSchema = z.string().trim().min(1).max(160);
const requirementIdSchema = z.string().trim().min(1).max(240);
export const standardIdentitySchema = z
    .object({
    namespace: standardKeySchema,
    version: standardVersionSchema,
})
    .strict();
/**
 * A capture request for one installed, digest-bound standards observation.
 *
 * The request deliberately carries no HTTP method, headers, or body. Those
 * are executable semantics owned by the exact probe digest, so authoring and
 * assessment policy cannot turn the standards lane into an arbitrary effect
 * surface.
 */
export const standardObservationRequestSchema = z
    .object({
    method: z.literal("STANDARD_OBSERVATION"),
    observations: z
        .array(z
        .object({
        standard: standardIdentitySchema,
        probe_digest: digestSchema,
    })
        .strict())
        .min(1)
        .max(8),
})
    .strict()
    .superRefine((value, context) => {
    const keys = value.observations.map(({ standard }) => `${standard.namespace}\u0000${standard.version}`);
    if (new Set(keys).size !== keys.length ||
        keys.some((key, index) => key !== [...keys].sort()[index])) {
        context.addIssue({
            code: "custom",
            path: ["observations"],
            message: "Standards observations must be canonical and unique by exact standard version.",
        });
    }
});
const standardObservationHeaderSchema = z
    .object({
    name: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u),
    value: z.string().min(1).max(512),
})
    .strict();
export const standardObservationTranscriptSchema = z
    .object({
    observation_contract: z.literal("sourcey.standard-observation-transcript/v1alpha1"),
    standard: standardIdentitySchema,
    probe_digest: digestSchema,
    endpoint_uri: z.url({ protocol: /^https$/u }),
    observed_at: z.iso.datetime({ offset: true }),
    exchanges: z
        .array(z
        .object({
        exchange_id: standardKeySchema,
        request: z
            .object({
            method: z.literal("POST"),
            headers: z.array(standardObservationHeaderSchema).min(1).max(16),
            body: z.json(),
            body_digest: digestSchema,
        })
            .strict(),
        response: z
            .object({
            status_code: z.number().int().min(100).max(599),
            media_type: z.string().trim().min(1).max(160),
            body_base64: z.string(),
            body_digest: digestSchema,
            parsed_json: z.json().nullable(),
        })
            .strict(),
    })
        .strict())
        .min(1)
        .max(16),
})
    .strict()
    .superRefine((value, context) => {
    const ids = value.exchanges.map(({ exchange_id: exchangeId }) => exchangeId);
    if (new Set(ids).size !== ids.length) {
        context.addIssue({
            code: "custom",
            path: ["exchanges"],
            message: "A standards observation transcript cannot repeat an exchange.",
        });
    }
    for (const [exchangeIndex, exchange] of value.exchanges.entries()) {
        const names = exchange.request.headers.map(({ name }) => name);
        if (new Set(names).size !== names.length ||
            names.some((name, index) => name !== [...names].sort()[index])) {
            context.addIssue({
                code: "custom",
                path: ["exchanges", exchangeIndex, "request", "headers"],
                message: "Observation request headers must be canonical and unique.",
            });
        }
    }
});
export const standardObservationArtifactSchema = z
    .object({
    artifact_contract: z.literal("sourcey.standard-observation-artifact/v1alpha1"),
    observations: z.array(standardObservationTranscriptSchema).min(1).max(8),
})
    .strict()
    .superRefine((value, context) => {
    const keys = value.observations.map(({ standard }) => `${standard.namespace}\u0000${standard.version}`);
    if (new Set(keys).size !== keys.length ||
        keys.some((key, index) => key !== [...keys].sort()[index])) {
        context.addIssue({
            code: "custom",
            path: ["observations"],
            message: "Observation artifacts must be canonical and unique by exact standard version.",
        });
    }
});
export const standardImplementationBindingSchema = standardIdentitySchema
    .safeExtend({
    relation: z.enum(["declares", "describes", "implements", "uses"]),
})
    .strict();
export const standardRequirementReferenceSchema = standardIdentitySchema
    .safeExtend({
    requirement_id: requirementIdSchema,
    relation: z.enum(["tests", "informational-reference"]),
})
    .strict();
export const standardSourceProvenanceSchema = z
    .object({
    role: z.enum(["specification", "schema", "conformance-example"]),
    source_uri: z.url({ protocol: /^https$/ }),
    object_digest: digestSchema,
    media_type: z.string().trim().min(1).max(160),
    license: z
        .object({
        spdx_id: z.string().trim().min(1).max(80),
        source_uri: z.url({ protocol: /^https$/ }),
        object_digest: digestSchema,
    })
        .strict(),
})
    .strict();
export const standardAdapterDependencySchema = z
    .object({
    name: standardKeySchema,
    version: standardVersionSchema,
    implementation_digest: digestSchema,
})
    .strict();
export const standardAdapterExecutionSchema = z
    .object({
    network: z.literal("forbidden"),
    external_effects: z.literal("forbidden"),
})
    .strict();
const standardAdapterManifestFields = {
    standard: standardIdentitySchema,
    accepted_media_types: z.array(z.string().trim().min(1).max(160)).min(1),
    implementation_digest: digestSchema,
    official_sources: z.array(standardSourceProvenanceSchema).min(1),
    dependencies: z.array(standardAdapterDependencySchema),
    execution: standardAdapterExecutionSchema,
};
function validateAdapterManifest(value, context) {
    assertUnique(value.accepted_media_types, context, ["accepted_media_types"]);
    assertUnique(value.official_sources.map((source) => `${source.role}\u0000${source.object_digest}`), context, ["official_sources"]);
    assertUnique(value.dependencies.map((dependency) => `${dependency.name}\u0000${dependency.version}`), context, ["dependencies"]);
}
export const standardEvidenceAdapterManifestCoreSchema = z
    .object({
    adapter_contract: z.literal("sourcey.standard-evidence-adapter/v1alpha1"),
    ...standardAdapterManifestFields,
    requirement_ids: z.array(requirementIdSchema).min(1),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.requirement_ids, context, ["requirement_ids"]);
    validateAdapterManifest(value, context);
});
export const standardEvidenceAdapterManifestSchema = standardEvidenceAdapterManifestCoreSchema
    .safeExtend({ adapter_digest: digestSchema })
    .strict();
export const standardResourceImportAdapterManifestCoreSchema = z
    .object({
    adapter_contract: z.literal("sourcey.standard-resource-import-adapter/v1alpha1"),
    ...standardAdapterManifestFields,
    resource_kinds: z.array(standardKeySchema).min(1),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.resource_kinds, context, ["resource_kinds"]);
    validateAdapterManifest(value, context);
});
export const standardResourceImportAdapterManifestSchema = standardResourceImportAdapterManifestCoreSchema
    .safeExtend({ adapter_digest: digestSchema })
    .strict();
export const standardEvidenceArtifactSchema = z
    .object({
    object_digest: digestSchema,
    retention_receipt_digest: digestSchema,
    media_type: z.string().trim().min(1).max(160),
    bytes: z.number().int().positive(),
    source_uri: z.url({ protocol: /^https$/ }),
    role: z.enum([
        "representation",
        "transport_metadata",
        "rendered_view",
        "interaction_trace",
        "manual_record",
    ]),
})
    .strict();
export const standardResourceImportRequestCoreSchema = z
    .object({
    request_contract: z.literal("sourcey.standard-resource-import-request/v1alpha1"),
    adapter: z
        .object({
        namespace: standardKeySchema,
        version: standardVersionSchema,
        adapter_digest: digestSchema,
    })
        .strict(),
    entrypoint_object_digests: z.array(digestSchema).min(1).max(64),
    artifacts: z.array(standardEvidenceArtifactSchema).min(1).max(256),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.entrypoint_object_digests, context, ["entrypoint_object_digests"]);
    assertUnique(value.artifacts.map((artifact) => artifact.object_digest), context, ["artifacts"]);
    const artifacts = new Set(value.artifacts.map((artifact) => artifact.object_digest));
    for (const [index, entrypoint] of value.entrypoint_object_digests.entries()) {
        if (!artifacts.has(entrypoint)) {
            context.addIssue({
                code: "custom",
                path: ["entrypoint_object_digests", index],
                message: "Every resource-import entrypoint must name a retained request artifact.",
            });
        }
    }
});
export const standardResourceImportRequestSchema = standardResourceImportRequestCoreSchema
    .safeExtend({ request_digest: digestSchema })
    .strict();
export const standardEvidenceRequestCoreSchema = z
    .object({
    request_contract: z.literal("sourcey.standard-evidence-request/v1alpha1"),
    adapter: z
        .object({
        namespace: standardKeySchema,
        version: standardVersionSchema,
        adapter_digest: digestSchema,
    })
        .strict(),
    requirements: z.array(standardRequirementReferenceSchema).min(1).max(256),
    artifacts: z.array(standardEvidenceArtifactSchema).min(1).max(64),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.requirements.map(requirementKey), context, ["requirements"]);
    assertUnique(value.artifacts.map((artifact) => artifact.object_digest), context, ["artifacts"]);
    for (const [index, requirement] of value.requirements.entries()) {
        if (requirement.namespace !== value.adapter.namespace ||
            requirement.version !== value.adapter.version ||
            requirement.relation !== "tests") {
            context.addIssue({
                code: "custom",
                path: ["requirements", index],
                message: "Every requested requirement must test the exact adapter standard and version.",
            });
        }
    }
});
export const standardEvidenceRequestSchema = standardEvidenceRequestCoreSchema
    .safeExtend({ request_digest: digestSchema })
    .strict();
export const standardEvidenceLocatorSchema = z
    .object({
    object_digest: digestSchema,
    kind: z.literal("utf8-range"),
    start_byte: z.number().int().nonnegative(),
    end_byte: z.number().int().positive(),
    value_digest: digestSchema,
})
    .strict()
    .superRefine((value, context) => {
    if (value.end_byte <= value.start_byte) {
        context.addIssue({
            code: "custom",
            path: ["end_byte"],
            message: "A standards evidence locator must cover at least one byte.",
        });
    }
});
export const standardEvidenceResidueSchema = z
    .object({
    code: z.enum([
        "resource_required",
        "invalid_artifact",
        "insufficient_artifacts",
        "ambiguous_result",
        "unsupported_version",
        "cyclic_reference",
        "unsupported_requirement",
    ]),
    resource_uri: z.url({ protocol: /^https$/ }).nullable(),
    object_digest: digestSchema.nullable(),
    detail: z.string().trim().min(1).max(2_000),
})
    .strict()
    .superRefine((value, context) => {
    if ((value.code === "resource_required") !== (value.resource_uri !== null)) {
        context.addIssue({
            code: "custom",
            path: ["resource_uri"],
            message: "Only resource-required residue names the exact additional resource URI.",
        });
    }
});
export const standardImportedFactSchema = z
    .object({
    fact_id: standardKeySchema,
    value: z.json(),
    locators: z.array(standardEvidenceLocatorSchema).min(1).max(64),
})
    .strict();
export const standardImportedResourceSchema = z
    .object({
    candidate_id: standardKeySchema,
    resource_kind: standardKeySchema,
    source_object_digest: digestSchema,
    canonical_uri: z.url({ protocol: /^https$/ }).optional(),
    facts: z.array(standardImportedFactSchema).max(256),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.facts.map((fact) => fact.fact_id), context, ["facts"]);
    for (const [factIndex, fact] of value.facts.entries()) {
        for (const [locatorIndex, locator] of fact.locators.entries()) {
            if (locator.object_digest !== value.source_object_digest) {
                context.addIssue({
                    code: "custom",
                    path: ["facts", factIndex, "locators", locatorIndex],
                    message: "An imported fact locator must bind its exact source artifact.",
                });
            }
        }
    }
});
export const standardImportedResourceRelationSchema = z
    .object({
    relation_id: standardKeySchema,
    relation_kind: standardKeySchema,
    from_candidate_id: standardKeySchema,
    target: z.union([
        z.object({ candidate_id: standardKeySchema }).strict(),
        z.object({ resource_uri: z.url({ protocol: /^https$/ }) }).strict(),
    ]),
    locators: z.array(standardEvidenceLocatorSchema).min(1).max(64),
})
    .strict();
export const standardResourceImportResultCoreSchema = z
    .object({
    result_contract: z.literal("sourcey.standard-resource-import-result/v1alpha1"),
    request_digest: digestSchema,
    adapter_digest: digestSchema,
    resources: z.array(standardImportedResourceSchema).max(512),
    relations: z.array(standardImportedResourceRelationSchema).max(1_024),
    residue: z.array(standardEvidenceResidueSchema).max(256),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.resources.map((resource) => resource.candidate_id), context, ["resources"]);
    assertUnique(value.relations.map((relation) => relation.relation_id), context, ["relations"]);
    const resources = new Set(value.resources.map((resource) => resource.candidate_id));
    for (const [index, relation] of value.relations.entries()) {
        if (!resources.has(relation.from_candidate_id) ||
            ("candidate_id" in relation.target && !resources.has(relation.target.candidate_id))) {
            context.addIssue({
                code: "custom",
                path: ["relations", index],
                message: "Imported resource relations must close over exact candidates or unresolved URIs.",
            });
        }
    }
});
export const standardResourceImportResultSchema = standardResourceImportResultCoreSchema
    .safeExtend({ result_digest: digestSchema })
    .strict();
export const standardResourceImportRecordCoreSchema = z
    .object({
    record_contract: z.literal("sourcey.standard-resource-import-record/v1alpha1"),
    request: standardResourceImportRequestSchema,
    result: standardResourceImportResultSchema,
    result_object_digest: digestSchema,
})
    .strict()
    .superRefine((value, context) => {
    if (value.result.request_digest !== value.request.request_digest ||
        value.result.adapter_digest !== value.request.adapter.adapter_digest) {
        context.addIssue({
            code: "custom",
            path: ["result"],
            message: "A resource-import record must bind its exact request and adapter.",
        });
    }
});
export const standardResourceImportRecordSchema = standardResourceImportRecordCoreSchema
    .safeExtend({ record_digest: digestSchema })
    .strict();
export const standardEvidenceRequirementResultSchema = z
    .object({
    requirement: standardRequirementReferenceSchema,
    status: z.enum(["satisfied", "not_satisfied", "indeterminate"]),
    locators: z.array(standardEvidenceLocatorSchema).max(64),
    residue: z.array(standardEvidenceResidueSchema).max(32),
})
    .strict()
    .superRefine((value, context) => {
    if (value.status === "indeterminate" && value.residue.length === 0) {
        context.addIssue({
            code: "custom",
            path: ["residue"],
            message: "An indeterminate standards result must preserve typed residue.",
        });
    }
    if (value.status !== "indeterminate" && value.locators.length === 0) {
        context.addIssue({
            code: "custom",
            path: ["locators"],
            message: "A conclusive standards result requires exact retained-artifact locators.",
        });
    }
});
export const standardEvidenceResultCoreSchema = z
    .object({
    result_contract: z.literal("sourcey.standard-evidence-result/v1alpha1"),
    request_digest: digestSchema,
    adapter_digest: digestSchema,
    requirements: z.array(standardEvidenceRequirementResultSchema).min(1).max(256),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.requirements.map((result) => requirementKey(result.requirement)), context, ["requirements"]);
});
export const standardEvidenceResultSchema = standardEvidenceResultCoreSchema
    .safeExtend({ result_digest: digestSchema })
    .strict();
export const standardEvidenceRecordCoreSchema = z
    .object({
    record_contract: z.literal("sourcey.standard-evidence-record/v1alpha1"),
    request: standardEvidenceRequestSchema,
    result: standardEvidenceResultSchema,
    result_object_digest: digestSchema,
})
    .strict()
    .superRefine((value, context) => {
    if (value.result.request_digest !== value.request.request_digest ||
        value.result.adapter_digest !== value.request.adapter.adapter_digest) {
        context.addIssue({
            code: "custom",
            path: ["result"],
            message: "A standards evidence record must bind its exact request and adapter.",
        });
    }
    const requested = value.request.requirements.map(requirementKey);
    const returned = value.result.requirements.map(({ requirement }) => requirementKey(requirement));
    if (requested.length !== returned.length ||
        requested.some((requirement) => !returned.includes(requirement))) {
        context.addIssue({
            code: "custom",
            path: ["result", "requirements"],
            message: "A standards evidence record must return its exact requested requirement set.",
        });
    }
    const artifacts = new Map(value.request.artifacts.map((artifact) => [artifact.object_digest, artifact]));
    for (const [resultIndex, result] of value.result.requirements.entries()) {
        for (const [locatorIndex, locator] of result.locators.entries()) {
            const artifact = artifacts.get(locator.object_digest);
            if (!artifact) {
                context.addIssue({
                    code: "custom",
                    path: ["result", "requirements", resultIndex, "locators", locatorIndex],
                    message: "A standards result locator must bind an artifact in its exact request.",
                });
            }
            else if (locator.end_byte > artifact.bytes) {
                context.addIssue({
                    code: "custom",
                    path: ["result", "requirements", resultIndex, "locators", locatorIndex],
                    message: "A standards result locator cannot exceed its retained artifact.",
                });
            }
        }
        for (const [residueIndex, residue] of result.residue.entries()) {
            if (residue.object_digest !== null && !artifacts.has(residue.object_digest)) {
                context.addIssue({
                    code: "custom",
                    path: ["result", "requirements", resultIndex, "residue", residueIndex],
                    message: "Standards residue must bind an artifact in its exact request.",
                });
            }
        }
    }
});
export const standardEvidenceRecordSchema = standardEvidenceRecordCoreSchema
    .safeExtend({ record_digest: digestSchema })
    .strict();
export const externalStandardSuiteDefinitionCoreSchema = z
    .object({
    suite_contract: z.literal("sourcey.external-standard-suite/v1alpha1"),
    suite: standardIdentitySchema,
    official_sources: z.array(standardSourceProvenanceSchema).min(1),
    assertions: z
        .array(z
        .object({
        assertion_id: requirementIdSchema,
        title: z.string().trim().min(1).max(240),
        metadata: z.record(standardKeySchema, z.json()),
        operator: z.enum(["all", "any"]),
        requirements: z.array(standardRequirementReferenceSchema).max(256),
        mapping_residue: z.array(standardEvidenceResidueSchema).max(32),
    })
        .strict()
        .superRefine((value, context) => {
        assertUnique(value.requirements.map(requirementKey), context, ["requirements"]);
        for (const [index, requirement] of value.requirements.entries()) {
            if (requirement.relation !== "tests") {
                context.addIssue({
                    code: "custom",
                    path: ["requirements", index, "relation"],
                    message: "An external suite assertion can evaluate only tested leaf requirements.",
                });
            }
        }
        if ((value.requirements.length === 0) !== value.mapping_residue.length > 0) {
            context.addIssue({
                code: "custom",
                path: ["mapping_residue"],
                message: "An unmapped suite assertion requires explicit residue; a mapped assertion must omit it.",
            });
        }
    }))
        .min(1)
        .max(512),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.assertions.map((assertion) => assertion.assertion_id), context, ["assertions"]);
    assertUnique(value.official_sources.map((source) => `${source.role}\u0000${source.object_digest}`), context, ["official_sources"]);
});
export const externalStandardSuiteDefinitionSchema = externalStandardSuiteDefinitionCoreSchema
    .safeExtend({ suite_digest: digestSchema })
    .strict();
export const externalStandardSuiteEvaluationCoreSchema = z
    .object({
    evaluation_contract: z.literal("sourcey.external-standard-suite-evaluation/v1alpha1"),
    suite_digest: digestSchema,
    evidence_result_digests: z.array(digestSchema).max(512),
    assertions: z
        .array(z
        .object({
        assertion_id: requirementIdSchema,
        status: z.enum(["passed", "failed", "indeterminate"]),
        leaf_requirements: z
            .array(z
            .object({
            requirement: standardRequirementReferenceSchema,
            evidence_result_digest: digestSchema,
            status: z.enum(["satisfied", "not_satisfied", "indeterminate"]),
        })
            .strict())
            .max(256),
        residue: z.array(standardEvidenceResidueSchema).max(256),
    })
        .strict()
        .superRefine((value, context) => {
        if (value.status === "indeterminate" && value.residue.length === 0) {
            context.addIssue({
                code: "custom",
                path: ["residue"],
                message: "An indeterminate suite assertion must preserve typed residue.",
            });
        }
    }))
        .min(1),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.evidence_result_digests, context, ["evidence_result_digests"]);
    assertUnique(value.assertions.map((assertion) => assertion.assertion_id), context, ["assertions"]);
});
export const externalStandardSuiteEvaluationSchema = externalStandardSuiteEvaluationCoreSchema
    .safeExtend({ evaluation_digest: digestSchema })
    .strict();
export const externalAssessmentAdapterManifestCoreSchema = z
    .object({
    adapter_contract: z.literal("sourcey.external-assessment-adapter/v1alpha1"),
    assessment: standardIdentitySchema,
    assertion_ids: z.array(requirementIdSchema).min(1),
    accepted_media_types: standardAdapterManifestFields.accepted_media_types,
    implementation_digest: digestSchema,
    official_sources: standardAdapterManifestFields.official_sources,
    dependencies: standardAdapterManifestFields.dependencies,
    execution: standardAdapterExecutionSchema,
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.assertion_ids, context, ["assertion_ids"]);
    validateAdapterManifest(value, context);
});
export const externalAssessmentAdapterManifestSchema = externalAssessmentAdapterManifestCoreSchema
    .safeExtend({ adapter_digest: digestSchema })
    .strict();
export const externalAssessmentRequestCoreSchema = z
    .object({
    request_contract: z.literal("sourcey.external-assessment-request/v1alpha1"),
    adapter: z
        .object({
        namespace: standardKeySchema,
        version: standardVersionSchema,
        adapter_digest: digestSchema,
    })
        .strict(),
    assertion_ids: z.array(requirementIdSchema).min(1).max(512),
    artifacts: z.array(standardEvidenceArtifactSchema).min(1).max(256),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.assertion_ids, context, ["assertion_ids"]);
    assertUnique(value.artifacts.map((artifact) => artifact.object_digest), context, ["artifacts"]);
});
export const externalAssessmentRequestSchema = externalAssessmentRequestCoreSchema
    .safeExtend({ request_digest: digestSchema })
    .strict();
export const externalAssessmentResultCoreSchema = z
    .object({
    result_contract: z.literal("sourcey.external-assessment-result/v1alpha1"),
    request_digest: digestSchema,
    adapter_digest: digestSchema,
    assertions: z
        .array(z
        .object({
        assertion_id: requirementIdSchema,
        reported_status: z.enum(["passed", "failed", "indeterminate"]),
        reported_score: z
            .object({
            value: z.number().finite(),
            scale_minimum: z.number().finite(),
            scale_maximum: z.number().finite(),
        })
            .strict()
            .superRefine((value, context) => {
            if (value.scale_minimum >= value.scale_maximum ||
                value.value < value.scale_minimum ||
                value.value > value.scale_maximum) {
                context.addIssue({
                    code: "custom",
                    message: "A reported assessment score must fall inside its exact scale.",
                });
            }
        })
            .optional(),
        locators: z.array(standardEvidenceLocatorSchema).max(64),
        residue: z.array(standardEvidenceResidueSchema).max(64),
    })
        .strict()
        .superRefine((value, context) => {
        if (value.reported_status === "indeterminate" && value.residue.length === 0) {
            context.addIssue({
                code: "custom",
                path: ["residue"],
                message: "An indeterminate external assessment must preserve typed residue.",
            });
        }
        if (value.reported_status !== "indeterminate" && value.locators.length === 0) {
            context.addIssue({
                code: "custom",
                path: ["locators"],
                message: "A conclusive external assessment requires retained-artifact locators.",
            });
        }
    }))
        .min(1),
})
    .strict()
    .superRefine((value, context) => {
    assertUnique(value.assertions.map((assertion) => assertion.assertion_id), context, ["assertions"]);
});
export const externalAssessmentResultSchema = externalAssessmentResultCoreSchema
    .safeExtend({ result_digest: digestSchema })
    .strict();
export const externalAssessmentRecordCoreSchema = z
    .object({
    record_contract: z.literal("sourcey.external-assessment-record/v1alpha1"),
    request: externalAssessmentRequestSchema,
    result: externalAssessmentResultSchema,
    result_object_digest: digestSchema,
})
    .strict()
    .superRefine((value, context) => {
    if (value.result.request_digest !== value.request.request_digest ||
        value.result.adapter_digest !== value.request.adapter.adapter_digest) {
        context.addIssue({
            code: "custom",
            path: ["result"],
            message: "An external-assessment record must bind its exact request and adapter.",
        });
    }
    const requested = new Set(value.request.assertion_ids);
    if (requested.size !== value.result.assertions.length ||
        value.result.assertions.some((assertion) => !requested.has(assertion.assertion_id))) {
        context.addIssue({
            code: "custom",
            path: ["result", "assertions"],
            message: "An external-assessment record must return its exact requested assertions.",
        });
    }
});
export const externalAssessmentRecordSchema = externalAssessmentRecordCoreSchema
    .safeExtend({ record_digest: digestSchema })
    .strict();
function requirementKey(value) {
    return `${value.namespace}\u0000${value.version}\u0000${value.requirement_id}\u0000${value.relation}`;
}
function assertUnique(values, context, path) {
    if (new Set(values).size !== values.length) {
        context.addIssue({ code: "custom", path, message: "Values must be unique." });
    }
}
//# sourceMappingURL=index.js.map