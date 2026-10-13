import { z } from "zod";
import { type AgentReadinessDeclaredSurfaces } from "./binding.js";
/**
 * gRPC's media types: `application/grpc` and its `+proto` and `+json` forms.
 * A call under one is a gRPC call, and its answer under one is read by its
 * `grpc-status` (north star §5.4).
 */
export declare function isAgentReadinessGrpcMediaType(mediaType: string): boolean;
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
        credential_field: z.ZodOptional<z.ZodString>;
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
/**
 * What an account operation does for the agent's own account (north star
 * §5.6): `registration` signs it up, issuing its credential; `top_up` funds the
 * balance the job draws on, paid by the agent itself.
 */
export declare const AGENT_READINESS_ACCOUNT_OPERATION_ROLES: readonly ["registration", "top_up"];
/**
 * An operation beside the job that an agent runs on its own account: a sign-up
 * API the vendor documents for agents, or a top-up the agent pays itself. The
 * suite sends nothing to one, since it never signs up or pays: it reads the
 * operation in the vendor's OpenAPI document.
 */
export declare const agentReadinessAccountOperationSchema: z.ZodObject<{
    operation_id: z.ZodString;
    interface_id: z.ZodString;
    role: z.ZodEnum<{
        registration: "registration";
        top_up: "top_up";
    }>;
    endpoint_id: z.ZodString;
    method: z.ZodEnum<{
        PATCH: "PATCH";
        POST: "POST";
        PUT: "PUT";
    }>;
    url: z.ZodURL;
    spec_url: z.ZodURL;
}, z.core.$strict>;
export type AgentReadinessAccountOperation = z.infer<typeof agentReadinessAccountOperationSchema>;
/** The fields of an account operation its sources cover: every field it declares. */
export declare const AGENT_READINESS_ACCOUNT_OPERATION_FIELD_PATHS: readonly ["/interface_id", "/role", "/endpoint_id", "/method", "/url", "/spec_url"];
/** The vendor's OpenAPI document an operation is read from, or null when it names none. */
export declare function agentReadinessOperationSpecUrl(operation: AgentReadinessJobOperation): string | null;
/** The fields of a job operation its sources cover: every field it declares. */
export declare function agentReadinessJobOperationFieldPaths(operation: AgentReadinessJobOperation): readonly string[];
/** The interface modalities an agent calls directly: an API, or an MCP server. */
export declare const AGENT_READINESS_PROBED_MODALITIES: ReadonlySet<string>;
/**
 * Every API or MCP server that performs the job declares exactly one job
 * operation: an HTTP or MCP operation on one of its endpoints with the
 * `service` role (an HTTP operation keeps that endpoint's origin; a gRPC call
 * goes to a gRPC endpoint, which takes nothing else), or, when it has no
 * `service` endpoint, a spec operation. Other interfaces (a web application, a
 * command line, a library) are not probed and declare none.
 */
export declare function validateDeclaredJobOperations(value: AgentReadinessDeclaredSurfaces & {
    readonly job_operations: readonly AgentReadinessJobOperation[];
}, context: z.RefinementCtx): void;
/**
 * Each account operation serves an interface that declares the job's
 * operation (the account is the one that interface's job runs on), and an
 * interface names at most one of each role.
 */
export declare function validateDeclaredAccountOperations(value: AgentReadinessDeclaredSurfaces & {
    readonly job_operations: readonly AgentReadinessJobOperation[];
    readonly account_operations?: readonly AgentReadinessAccountOperation[] | undefined;
}, context: z.RefinementCtx): void;
//# sourceMappingURL=operation.d.ts.map