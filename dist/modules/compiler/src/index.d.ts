import { type EntityAuthoring } from "../../../contracts/authoring/src/index.js";
import { type CompiledEntityFacts } from "../../catalog-model/src/index.js";
export interface CompiledCatalogFacts {
    readonly entities: readonly CompiledEntityFacts[];
    readonly authoring: readonly EntityAuthoring[];
    readonly sourceFiles: ReadonlyMap<string, string>;
}
export declare function compileAuthoringTree(entityRoot: string): Promise<CompiledCatalogFacts>;
export declare function compileAuthoringFiles(entityRoot: string, sourceFiles: readonly string[], options?: {
    readonly allowExternalRoleEntities?: boolean;
}): Promise<CompiledCatalogFacts>;
/** Parse exact non-Git authoring bytes through the same compiler-owned lane. */
export declare function compileAuthoringSources(sources: readonly {
    readonly source: string;
    readonly content: string;
}[], options?: {
    readonly allowExternalRoleEntities?: boolean;
}): CompiledCatalogFacts;
/** Compile canonical proposal values without routing non-Git ingress through files. */
export declare function compileAuthoringEntities(values: readonly EntityAuthoring[], options?: {
    readonly allowExternalRoleEntities?: boolean;
}): CompiledCatalogFacts;
//# sourceMappingURL=index.d.ts.map