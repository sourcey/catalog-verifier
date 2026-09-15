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
/**
 * The one canonical order of an Entity's domains. Authoring order carries no
 * meaning (the primary is marked by role), so every compiled revision and every
 * identity comparison sorts by value, then role, then validity start.
 */
export declare function canonicalEntityDomains<Domain extends {
    readonly value: string;
    readonly role: string;
    readonly valid_from: string;
}>(domains: readonly Domain[]): Domain[];
export declare function compileEntity(authoring: EntityAuthoring): CompiledEntityFacts;
//# sourceMappingURL=index.d.ts.map