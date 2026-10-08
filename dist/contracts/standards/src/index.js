import { z } from "zod";
const standardKeySchema = z.string().regex(/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/);
const standardVersionSchema = z.string().trim().min(1).max(160);
const standardIdentitySchema = z
    .object({
    namespace: standardKeySchema,
    version: standardVersionSchema,
})
    .strict();
export const standardImplementationBindingSchema = standardIdentitySchema
    .safeExtend({
    relation: z.enum(["declares", "describes", "implements", "uses"]),
})
    .strict();
//# sourceMappingURL=index.js.map