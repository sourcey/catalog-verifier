import { lstat, readdir, readFile } from "node:fs/promises";
import { extname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { compareCanonicalStrings } from "provenry/primitives";
import { entityAuthoringSchema, } from "../../../contracts/authoring/src/index.js";
import { assertCatalogAuthoringIdentity, CatalogAuthoringError, parseCatalogAuthoringSources, } from "../../catalog-authoring-validation/src/index.js";
import { compileEntity } from "../../catalog-model/src/index.js";
export async function compileAuthoringTree(entityRoot) {
    const files = (await filesUnder(entityRoot))
        .filter((file) => [".yaml", ".yml"].includes(extname(file)))
        .map((file) => relative(entityRoot, file));
    return compileAuthoringFiles(entityRoot, files);
}
export async function compileAuthoringFiles(entityRoot, sourceFiles, options = {}) {
    const root = resolve(entityRoot);
    const files = [...new Set(sourceFiles)].sort(compareCanonicalStrings);
    if (files.length !== sourceFiles.length) {
        throw new Error("Authoring file selection contains a duplicate path.");
    }
    const sources = [];
    for (const source of files) {
        const file = resolveAuthoringFile(root, source);
        if ((await lstat(file)).isSymbolicLink()) {
            throw new CatalogAuthoringError(`Authoring file cannot be a symbolic link: ${source}.`, source);
        }
        sources.push({ source, content: await readFile(file, "utf8") });
    }
    return compileAuthoringSources(sources, options);
}
/** Parse exact non-Git authoring bytes through the same compiler-owned lane. */
export function compileAuthoringSources(sources, options = {}) {
    return compileAuthoringEntries(parseCatalogAuthoringSources(sources, options));
}
/** Compile canonical proposal values without routing non-Git ingress through files. */
export function compileAuthoringEntities(values, options = {}) {
    const entries = values.map((value) => {
        const parsed = entityAuthoringSchema.parse(value);
        return {
            source: `${parsed.entity.slug.slice(0, 2)}/${parsed.entity.slug}.yaml`,
            value: parsed,
        };
    });
    assertCatalogAuthoringIdentity(entries, options.allowExternalRoleEntities ?? false);
    return compileAuthoringEntries(entries);
}
function compileAuthoringEntries(entries) {
    const entities = entries
        .map(({ value }) => compileEntity(value))
        .sort((left, right) => compareCanonicalStrings(left.revision.entity_id, right.revision.entity_id));
    return {
        entities,
        authoring: entries
            .map(({ value }) => value)
            .sort((left, right) => compareCanonicalStrings(left.entity.entity_id, right.entity.entity_id)),
        sourceFiles: new Map(entries.map(({ source, value }) => [value.entity.entity_id, source])),
    };
}
function resolveAuthoringFile(root, source) {
    if (isAbsolute(source) || ![".yaml", ".yml"].includes(extname(source))) {
        throw new Error(`Authoring selection is not a relative YAML file: ${source}.`);
    }
    const file = resolve(root, source);
    if (!file.startsWith(`${root}${sep}`)) {
        throw new Error(`Authoring selection escapes the Entity root: ${source}.`);
    }
    return file;
}
async function filesUnder(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = await Promise.all(entries.map((entry) => {
        const path = join(directory, entry.name);
        return entry.isDirectory() ? filesUnder(path) : [path];
    }));
    return files.flat();
}
//# sourceMappingURL=index.js.map