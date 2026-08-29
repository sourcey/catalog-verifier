import type { EntityAuthoring } from "../../../contracts/authoring/src/index.js";
import { type EntityRevision, type OfferRevision, type ProgramRevision } from "../../../contracts/revisions/src/index.js";
export interface CompiledOfferFacts {
    readonly revision: OfferRevision;
    readonly slug: string;
    readonly slugAliases: readonly string[];
    readonly sourceIds: readonly string[];
    /** True when the offer's evidence basis is an Entity attestation, not sources. */
    readonly declared: boolean;
}
export interface CompiledProgramFacts {
    readonly revision: ProgramRevision;
    readonly slug: string;
    readonly slugAliases: readonly string[];
    readonly sourceIds: readonly string[];
}
export interface CompiledEntityFacts {
    readonly revision: EntityRevision;
    readonly slug: string;
    readonly slugAliases: readonly string[];
    readonly sources: EntityAuthoring["sources"];
    readonly programs: readonly CompiledProgramFacts[];
    readonly offers: readonly CompiledOfferFacts[];
}
export declare function compileEntity(authoring: EntityAuthoring): CompiledEntityFacts;
//# sourceMappingURL=index.d.ts.map