import { HEADER_NAME_PATTERN } from "provenry/exchange/records";
import { z } from "zod";
import { AGENT_READINESS_RESERVED_HEADERS, } from "./binding.js";
import { agentReadinessScopeKeySchema } from "./shared.js";
/**
 * The job's request on one interface (north star §5.3), in one of three kinds:
 * an HTTP request a probe sends with no authority, a vendor's MCP server and
 * the tool that performs the job, or, for an interface with no public
 * endpoint, the job's operation in the vendor's OpenAPI document, whose steps
 * are read from that document. A well-formed placeholder stands where an
 * account-specific identifier or host label goes, and a body is sent empty.
 * Nothing in an operation carries a credential: Sourcey holds no keys.
 */
const httpsUrlSchema = z.url({ protocol: /^https$/u }).max(2_048);
/** A header or query parameter name that says it carries a credential. */
const CREDENTIAL_NAME = /(?:key|token|secret|auth|session|signature|password|passwd|cookie|credential)/iu;
/** An OpenAPI path template, such as `/v1/payment_links` or `/repos/{owner}/{repo}`. */
const pathTemplateSchema = z
    .string()
    .max(512)
    .regex(/^\/[\x21-\x7E]*$/u, "A path template starts with '/' and holds no spaces.");
const methodSchema = z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]);
const specOperationSchema = z.object({ method: methodSchema, path: pathTemplateSchema }).strict();
/**
 * The operations in the vendor's OpenAPI document an agent creates and
 * revokes its own key with (north star §5.6, Sustain), when the vendor
 * publishes them.
 */
const keyOperationsSchema = z
    .object({ create: specOperationSchema, revoke: specOperationSchema })
    .strict()
    .nullable();
/** The vendor's OpenAPI document that covers an HTTP operation, and its key operations. */
const agentReadinessOperationSpecSchema = z
    .object({ url: httpsUrlSchema, key_operations: keyOperationsSchema })
    .strict();
const agentReadinessHttpOperationSchema = z
    .object({
    operation_id: agentReadinessScopeKeySchema,
    interface_id: agentReadinessScopeKeySchema,
    kind: z.literal("http"),
    /** The declared endpoint whose origin the URL keeps. */
    endpoint_id: agentReadinessScopeKeySchema,
    method: methodSchema.exclude(["DELETE"]),
    url: httpsUrlSchema,
    headers: z
        .array(z
        .object({
        name: z
            .string()
            .regex(HEADER_NAME_PATTERN)
            .refine((name) => !AGENT_READINESS_RESERVED_HEADERS.has(name), "This header is not a job operation's.")
            .refine((name) => !CREDENTIAL_NAME.test(name), "A job operation's header carries no credential."),
        value: z.string().regex(/^[\x21-\x7E](?:[\x20-\x7E]{0,510}[\x21-\x7E])?$/u),
    })
        .strict())
        .max(8),
    /**
     * The media type of the body the job's request carries, as the vendor
     * documents it, which the probe sends empty: services refuse a foreign
     * format before they read authority (S3 refuses JSON; a form guard refuses a
     * bodiless POST; Sentry reads an envelope). Null for none.
     */
    body: z
        .object({
        media_type: z
            .string()
            .max(127)
            .regex(/^[a-z]+\/[a-z0-9][a-z0-9.+-]*$/u, "A body format is a lower-case media type."),
    })
        .strict()
        .nullable(),
    spec: agentReadinessOperationSpecSchema.nullable(),
})
    .strict()
    .superRefine((operation, context) => {
    if (operation.method === "GET" && operation.body !== null) {
        context.addIssue({ code: "custom", path: ["body"], message: "A GET carries no body." });
    }
    const names = operation.headers.map(({ name }) => name);
    if (names.some((name, index) => index > 0 && names[index - 1] >= name)) {
        context.addIssue({
            code: "custom",
            path: ["headers"],
            message: "Operation headers are unique and ordered by name.",
        });
    }
    const url = new URL(operation.url);
    if (url.username ||
        url.password ||
        url.hash ||
        [...url.searchParams.keys()].some((name) => CREDENTIAL_NAME.test(name))) {
        context.addIssue({
            code: "custom",
            path: ["url"],
            message: "An operation URL carries no credentials or fragment.",
        });
    }
});
const agentReadinessMcpOperationSchema = z
    .object({
    operation_id: agentReadinessScopeKeySchema,
    interface_id: agentReadinessScopeKeySchema,
    kind: z.literal("mcp"),
    /** The declared MCP endpoint; the probe opens a session in whichever era the server speaks. */
    endpoint_id: agentReadinessScopeKeySchema,
    /** The tool that performs the job, as the vendor documents it. */
    tool: z.string().regex(/^[A-Za-z0-9_.\-/]{1,128}$/u),
})
    .strict();
const agentReadinessSpecOperationSchema = z
    .object({
    operation_id: agentReadinessScopeKeySchema,
    interface_id: agentReadinessScopeKeySchema,
    kind: z.literal("spec"),
    /** The vendor's OpenAPI document that holds the job's operation. */
    spec_url: httpsUrlSchema,
    method: methodSchema,
    path: pathTemplateSchema,
    key_operations: keyOperationsSchema,
})
    .strict();
export const agentReadinessJobOperationSchema = z.discriminatedUnion("kind", [
    agentReadinessHttpOperationSchema,
    agentReadinessMcpOperationSchema,
    agentReadinessSpecOperationSchema,
]);
/** The vendor's OpenAPI document an operation is read from, or null when it names none. */
export function agentReadinessOperationSpecUrl(operation) {
    switch (operation.kind) {
        case "spec":
            return operation.spec_url;
        case "http":
            return operation.spec?.url ?? null;
        case "mcp":
            return null;
    }
}
/** The fields of a job operation its sources cover: every field it declares. */
export function agentReadinessJobOperationFieldPaths(operation) {
    switch (operation.kind) {
        case "mcp":
            return ["/interface_id", "/endpoint_id", "/tool"];
        case "spec":
            return [
                "/interface_id",
                "/spec_url",
                "/method",
                "/path",
                ...(operation.key_operations !== null ? ["/key_operations"] : []),
            ];
        case "http":
            return [
                "/interface_id",
                "/endpoint_id",
                "/method",
                "/url",
                ...(operation.headers.length > 0 ? ["/headers"] : []),
                ...(operation.body !== null ? ["/body"] : []),
                ...(operation.spec !== null ? ["/spec"] : []),
            ];
    }
}
/** The interface modalities an agent calls directly: an API, or an MCP server. */
export const AGENT_READINESS_PROBED_MODALITIES = new Set([
    "network_api",
    "tool_server",
]);
/**
 * Every API or MCP server that performs the job declares exactly one job
 * operation: an HTTP or MCP operation on one of its HTTP endpoints with the
 * `service` role (an HTTP operation keeps that endpoint's origin), or, when it
 * has no `service` endpoint, a spec operation. Other interfaces (a web
 * application, a command line, a library) are not probed and declare none.
 */
export function validateDeclaredJobOperations(value, context) {
    const endpoints = new Map(value.endpoints.map((endpoint) => [endpoint.endpoint_id, endpoint]));
    const interfaces = new Map(value.interfaces.map((declared) => [declared.interface_id, declared]));
    const servesAt = (interfaceId) => (interfaces.get(interfaceId)?.endpoint_ids ?? []).filter((id) => {
        const endpoint = endpoints.get(id);
        return endpoint?.transport === "http" && endpoint.roles.includes("service");
    });
    const operated = new Set();
    for (const [index, operation] of value.job_operations.entries()) {
        const issue = (message) => context.addIssue({ code: "custom", path: ["job_operations", index], message });
        const declared = interfaces.get(operation.interface_id);
        if (!declared) {
            issue(`Job operation references unknown interface '${operation.interface_id}'.`);
            continue;
        }
        if (!declared.functions.includes("service_operation") ||
            !AGENT_READINESS_PROBED_MODALITIES.has(declared.modality)) {
            issue(`Interface '${operation.interface_id}' is not an API or MCP server that performs the job.`);
        }
        if (operated.has(operation.interface_id)) {
            issue(`Interface '${operation.interface_id}' declares more than one job operation.`);
        }
        operated.add(operation.interface_id);
        if (operation.kind === "spec") {
            if (servesAt(operation.interface_id).length > 0) {
                issue(`Interface '${operation.interface_id}' has a service endpoint: probe it instead.`);
            }
            continue;
        }
        if (!servesAt(operation.interface_id).includes(operation.endpoint_id)) {
            issue(`Job operation needs one of its interface's HTTP endpoints with the service role.`);
            continue;
        }
        const endpoint = endpoints.get(operation.endpoint_id);
        if (operation.kind === "http" &&
            endpoint &&
            new URL(operation.url).origin !== new URL(endpoint.uri).origin) {
            issue(`Job operation leaves the origin of '${operation.endpoint_id}'.`);
        }
    }
    for (const [index, declared] of value.interfaces.entries()) {
        if (declared.functions.includes("service_operation") &&
            AGENT_READINESS_PROBED_MODALITIES.has(declared.modality) &&
            !operated.has(declared.interface_id)) {
            context.addIssue({
                code: "custom",
                path: ["interfaces", index],
                message: `Interface '${declared.interface_id}' performs the job and declares no job operation.`,
            });
        }
    }
}
//# sourceMappingURL=operation.js.map