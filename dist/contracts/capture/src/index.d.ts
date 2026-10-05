import { z } from "zod";
/** Bounds for a physical capture. Workflow policy composes this contract. */
export declare const capturePolicyDefinitionSchema: z.ZodObject<{
    policy_contract: z.ZodLiteral<"sourcey.capture-policy/v1alpha1">;
    policy_id: z.ZodString;
    maximum_bytes: z.ZodNumber;
    timeout_ms: z.ZodNumber;
    redirects: z.ZodEnum<{
        "allowed-hosts": "allowed-hosts";
        reject: "reject";
        "same-origin": "same-origin";
    }>;
    require_https: z.ZodBoolean;
    minimum_document_text_bytes: z.ZodNumber;
}, z.core.$strict>;
export type CapturePolicyDefinition = z.infer<typeof capturePolicyDefinitionSchema>;
//# sourceMappingURL=index.d.ts.map