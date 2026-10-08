import { z } from "zod";
export declare const standardImplementationBindingSchema: z.ZodObject<{
    namespace: z.ZodString;
    version: z.ZodString;
    relation: z.ZodEnum<{
        declares: "declares";
        describes: "describes";
        implements: "implements";
        uses: "uses";
    }>;
}, z.core.$strict>;
//# sourceMappingURL=index.d.ts.map