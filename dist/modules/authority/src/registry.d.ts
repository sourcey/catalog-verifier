import { type ReceiptKeys } from "provenry/receipts";
import type { RootSet, RootSetTransition, RootSetTransitionCore, SignaturePurpose, SignerRegistry, SignerRegistryCore } from "../../../contracts/authority/src/index.js";
/** The registry's keys as Provenry receipts judges them, built once per registry. */
export declare function signerRegistryReceiptKeys(registry: SignerRegistry): ReceiptKeys;
export declare function signerRegistryPreimage(core: SignerRegistryCore): Buffer;
export declare function rootSetTransitionPreimage(core: RootSetTransitionCore): Buffer;
export declare function validateRootSetTransition(input: {
    readonly previousRootSet: RootSet;
    readonly nextRootSet: RootSet;
    readonly transition: unknown;
    readonly releaseSequence: number;
}): RootSetTransition;
export declare function validateSignerRegistry(rootSet: RootSet, input: unknown): SignerRegistry;
export declare function registryIssuerForPurpose(registry: SignerRegistry, purpose: SignaturePurpose): string;
/**
 * Resolve the one registry authority that may issue a purpose-bound object at
 * an exact instant and release. This is deliberately independent of private
 * key custody: callers learn only the public issuer/key identity that their
 * immutable object must name.
 */
export declare function resolveActiveSignerAuthority(registry: SignerRegistry, input: {
    readonly purpose: SignaturePurpose;
    readonly at: string;
    readonly releaseSequence: number;
}): {
    readonly issuerId: string;
    readonly keyId: string;
};
//# sourceMappingURL=registry.d.ts.map