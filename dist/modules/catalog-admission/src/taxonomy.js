import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { catalogTaxonomySchema, } from "../../../contracts/taxonomy/src/index.js";
export async function readCatalogTaxonomy(path) {
    return catalogTaxonomySchema.parse(JSON.parse(await readFile(resolve(path), "utf8")));
}
//# sourceMappingURL=taxonomy.js.map