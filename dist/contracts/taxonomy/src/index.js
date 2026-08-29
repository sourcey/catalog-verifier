import { z } from "zod";
export const catalogTaxonomySchema = z
    .object({
    schema_version: z.literal("sourcey.taxonomy/v1alpha1"),
    categories: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).min(1),
})
    .strict()
    .superRefine((taxonomy, context) => {
    if (new Set(taxonomy.categories).size !== taxonomy.categories.length) {
        context.addIssue({
            code: "custom",
            path: ["categories"],
            message: "Catalog taxonomy categories must be unique.",
        });
    }
    const canonical = [...taxonomy.categories].sort();
    if (canonical.some((category, index) => category !== taxonomy.categories[index])) {
        context.addIssue({
            code: "custom",
            path: ["categories"],
            message: "Catalog taxonomy categories must be canonically sorted.",
        });
    }
});
//# sourceMappingURL=index.js.map