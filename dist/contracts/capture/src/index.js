import { z } from "zod";
/** Bounds for a physical capture. Workflow policy composes this contract. */
export const capturePolicyDefinitionSchema = z
    .object({
    policy_contract: z.literal("sourcey.capture-policy/v1alpha1"),
    policy_id: z.string().min(1),
    maximum_bytes: z.number().int().positive(),
    timeout_ms: z.number().int().positive(),
    redirects: z.enum(["reject", "same-origin", "allowed-hosts"]),
    require_https: z.boolean(),
    /** Zero disables the minimum normalized document-text length. */
    minimum_document_text_bytes: z.number().int().nonnegative(),
})
    .strict();
//# sourceMappingURL=index.js.map