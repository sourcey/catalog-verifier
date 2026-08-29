import { z } from "zod";
export declare const catalogTaxonomySchema: z.ZodObject<{
    schema_version: z.ZodLiteral<"sourcey.taxonomy/v1alpha1">;
    categories: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export type CatalogTaxonomy = z.infer<typeof catalogTaxonomySchema>;
//# sourceMappingURL=index.d.ts.map