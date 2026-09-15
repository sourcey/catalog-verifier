import { policyCoreSchema } from "../../../contracts/artifact/src/index.js";
import { digest } from "../../primitives/src/index.js";
/**
 * Canonical semantic fingerprints for public Catalog projections. Release
 * construction, immutable artifact verification, and public readback all call
 * this one owner so a projection rule cannot drift between producers and
 * consumers.
 */
export function catalogEntityProjectionDigest(entity) {
    const { programs: _programs, offers: _offers, ...projection } = entity;
    return digest(projection);
}
export function catalogProgramProjectionDigest(program) {
    return digest(program);
}
export function catalogOfferProjectionDigest(offer) {
    return digest(offer);
}
/** Hash normative policy text, excluding the compiled revision identifier. */
export function catalogPolicyRevisionDigest(policy) {
    return digest(policyCoreSchema.strip().parse(policy));
}
//# sourceMappingURL=index.js.map