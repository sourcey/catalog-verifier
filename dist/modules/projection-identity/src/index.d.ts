import { type Digest } from "provenry/primitives";
import type { CompiledEntity, CompiledOffer, CompiledProgram, PolicyCore } from "../../../contracts/artifact/src/index.js";
/**
 * Canonical semantic fingerprints for public Catalog projections. Release
 * construction, immutable artifact verification, and public readback all call
 * this one owner so a projection rule cannot drift between producers and
 * consumers.
 */
export declare function catalogEntityProjectionDigest(entity: CompiledEntity): Digest;
export declare function catalogProgramProjectionDigest(program: CompiledProgram): Digest;
export declare function catalogOfferProjectionDigest(offer: CompiledOffer): Digest;
/** Hash normative policy text, excluding the compiled revision identifier. */
export declare function catalogPolicyRevisionDigest(policy: PolicyCore): Digest;
//# sourceMappingURL=index.d.ts.map