import { type Digest } from "provenry/primitives";
import { type ReceiptKeys } from "provenry/receipts";
import type { ProtectedSignature, RootSet, RootSetTransition, RootSetTransitionCore, SignaturePurpose, SignerRegistry, SignerRegistryCore } from "../../../contracts/authority/src/index.js";
import { type CatalogVerifierIdentityContext, type CatalogVerifierIdentityContextCore } from "../../../contracts/catalog-verifier/src/index.js";
import { type CatalogEvent, type CatalogEventCore, type CatalogEventKind } from "../../../contracts/events/src/index.js";
import { type ChangeCursor, type ChangeCursorCore, type SearchCursor, type SearchCursorCore } from "../../../contracts/feed/src/index.js";
import { type ReleasePublication, type ReleasePublicationCore } from "../../../contracts/release/src/index.js";
export declare function signaturePurposeForKind(kind: CatalogEventKind): SignaturePurpose;
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
export declare function eventSignaturePreimage(core: CatalogEventCore, eventId: Digest, protectedHeader: Omit<ProtectedSignature, "signature">): Buffer;
export declare function releasePublicationSignaturePreimage(core: ReleasePublicationCore, publicationDigest: Digest, protectedHeader: Omit<ProtectedSignature, "signature">): Buffer;
export declare function changeCursorSignaturePreimage(core: ChangeCursorCore | SearchCursorCore, cursorDigest: Digest, protectedHeader: Omit<ProtectedSignature, "signature">): Buffer;
export declare function catalogVerifierIdentityContextSignaturePreimage(core: CatalogVerifierIdentityContextCore, contextDigest: Digest, protectedHeader: Omit<ProtectedSignature, "signature">): Buffer;
export declare function validateCatalogVerifierIdentityContext(input: unknown, registry: SignerRegistry, verifiedAt: string): CatalogVerifierIdentityContext;
export declare function validateSearchCursor(input: unknown, registry: SignerRegistry, context?: {
    readonly releaseSequence: number;
}): SearchCursor;
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
export declare function validateProtectedEvent(input: unknown, registry: SignerRegistry, releaseSequence: number): CatalogEvent;
export declare function validateReleasePublication(input: unknown, registry: SignerRegistry): ReleasePublication;
export declare function validateChangeCursor(input: unknown, registry: SignerRegistry, context?: {
    readonly releaseSequence: number;
}): ChangeCursor;
//# sourceMappingURL=index.d.ts.map