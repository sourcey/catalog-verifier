import { z } from "zod";
import { type AgentReadinessDeclaredSurfaces } from "./binding.js";
export declare const agentReadinessJobOperationSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    operation_id: z.ZodString;
    interface_id: z.ZodString;
    kind: z.ZodLiteral<"http">;
    endpoint_id: z.ZodString;
    method: z.ZodEnum<{
        GET: "GET";
        PATCH: "PATCH";
        POST: "POST";
        PUT: "PUT";
    }>;
    url: z.ZodURL;
    headers: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodString;
    }, z.core.$strict>>;
    body: z.ZodNullable<z.ZodObject<{
        media_type: z.ZodString;
    }, z.core.$strict>>;
    spec: z.ZodNullable<z.ZodObject<{
        url: z.ZodURL;
        key_operations: z.ZodNullable<z.ZodObject<{
            create: z.ZodObject<{
                method: z.ZodEnum<{
                    DELETE: "DELETE";
                    GET: "GET";
                    PATCH: "PATCH";
                    POST: "POST";
                    PUT: "PUT";
                }>;
                path: z.ZodString;
            }, z.core.$strict>;
            revoke: z.ZodObject<{
                method: z.ZodEnum<{
                    DELETE: "DELETE";
                    GET: "GET";
                    PATCH: "PATCH";
                    POST: "POST";
                    PUT: "PUT";
                }>;
                path: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
}, z.core.$strict>, z.ZodObject<{
    operation_id: z.ZodString;
    interface_id: z.ZodString;
    kind: z.ZodLiteral<"mcp">;
    endpoint_id: z.ZodString;
    tool: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    operation_id: z.ZodString;
    interface_id: z.ZodString;
    kind: z.ZodLiteral<"spec">;
    spec_url: z.ZodURL;
    method: z.ZodEnum<{
        DELETE: "DELETE";
        GET: "GET";
        PATCH: "PATCH";
        POST: "POST";
        PUT: "PUT";
    }>;
    path: z.ZodString;
    key_operations: z.ZodNullable<z.ZodObject<{
        create: z.ZodObject<{
            method: z.ZodEnum<{
                DELETE: "DELETE";
                GET: "GET";
                PATCH: "PATCH";
                POST: "POST";
                PUT: "PUT";
            }>;
            path: z.ZodString;
        }, z.core.$strict>;
        revoke: z.ZodObject<{
            method: z.ZodEnum<{
                DELETE: "DELETE";
                GET: "GET";
                PATCH: "PATCH";
                POST: "POST";
                PUT: "PUT";
            }>;
            path: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>>;
}, z.core.$strict>], "kind">;
export type AgentReadinessJobOperation = z.infer<typeof agentReadinessJobOperationSchema>;
/** The vendor's OpenAPI document an operation is read from, or null when it names none. */
export declare function agentReadinessOperationSpecUrl(operation: AgentReadinessJobOperation): string | null;
/** The fields of a job operation its sources cover: every field it declares. */
export declare function agentReadinessJobOperationFieldPaths(operation: AgentReadinessJobOperation): readonly string[];
/** The interface modalities an agent calls directly: an API, or an MCP server. */
export declare const AGENT_READINESS_PROBED_MODALITIES: ReadonlySet<string>;
/**
 * Every API or MCP server that performs the job declares exactly one job
 * operation: an HTTP or MCP operation on one of its HTTP endpoints with the
 * `service` role (an HTTP operation keeps that endpoint's origin), or, when it
 * has no `service` endpoint, a spec operation. Other interfaces (a web
 * application, a command line, a library) are not probed and declare none.
 */
export declare function validateDeclaredJobOperations(value: AgentReadinessDeclaredSurfaces & {
    readonly job_operations: readonly AgentReadinessJobOperation[];
}, context: z.RefinementCtx): void;
//# sourceMappingURL=operation.d.ts.map