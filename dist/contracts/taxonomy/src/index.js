import { z } from "zod";
const categorySlug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const catalogTaxonomySchema = z
    .object({
    schema_version: z.literal("sourcey.taxonomy/v1alpha1"),
    categories: z.array(categorySlug).min(1),
    /** The reader-facing name of every category, keyed by slug; the release is the only owner of these words. */
    labels: z.record(categorySlug, z.string().min(1).max(60)).optional(),
})
    .strict()
    .superRefine((taxonomy, context) => {
    if (taxonomy.labels) {
        const labelled = Object.keys(taxonomy.labels).sort();
        const categories = [...taxonomy.categories].sort();
        if (labelled.length !== categories.length ||
            labelled.some((slug, index) => slug !== categories[index])) {
            context.addIssue({
                code: "custom",
                path: ["labels"],
                message: "Catalog taxonomy labels must name every category exactly once.",
            });
        }
    }
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