import { z } from "zod";
export declare const digest: z.ZodString;
export declare const nonEmpty: z.ZodString;
export declare const entityId: z.ZodString;
export declare const programId: z.ZodString;
export declare const offerId: z.ZodString;
export declare const agentReadinessProfileId: z.ZodString;
export declare const slug: z.ZodString;
export declare const identifier: z.ZodString;
export declare const operationId: z.ZodString;
export declare const instant: z.ZodISODateTime;
export declare const catalogApiContractSchema: z.ZodLiteral<"sourcey.catalog-api/v1">;
export declare function apiEnvelope<T extends z.ZodType>(data: T): z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: T;
}, z.core.$strict>;
export declare function pagedApiEnvelope<T extends z.ZodType>(data: T): z.ZodObject<{
    api_contract: z.ZodLiteral<"sourcey.catalog-api/v1">;
    release_id: z.ZodString;
    artifact_sha256: z.ZodString;
    data: z.ZodArray<T>;
    next_cursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strict>;
//# sourceMappingURL=values.d.ts.map