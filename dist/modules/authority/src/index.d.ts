import type { ProtectedSignature, RootSet, RootSetTransition, RootSetTransitionCore, SignaturePurpose, SignerRegistry, SignerRegistryCore } from "../../../contracts/authority/src/index.js";
import { type CatalogVerifierIdentityContext, type CatalogVerifierIdentityContextCore } from "../../../contracts/catalog-verifier/src/index.js";
import { type CatalogEvent, type CatalogEventCore, type CatalogEventKind } from "../../../contracts/events/src/index.js";
import { type CaptureReceipt } from "../../../contracts/evidence/src/index.js";
import { type ChangeCursor, type ChangeCursorCore, type SearchCursor, type SearchCursorCore } from "../../../contracts/feed/src/index.js";
import { type ReleasePublication, type ReleasePublicationCore } from "../../../contracts/release/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
import { type RetainedCaptureReceipt } from "./retained-capture-receipt.js";
export { type RetainedCaptureReceipt, retainedCaptureReceiptSchema, } from "./retained-capture-receipt.js";
export declare function signaturePurposeForKind(kind: CatalogEventKind): SignaturePurpose;
export declare function signerRegistryPreimage(core: SignerRegistryCore): Buffer;
export declare function rootSetTransitionPreimage(core: RootSetTransitionCore): Buffer;
export declare function validateRootSetTransition(input: {
    readonly previousRootSet: RootSet;
    readonly nextRootSet: RootSet;
    readonly transition: unknown;
    readonly releaseSequence: number;
}): RootSetTransition;
export declare function eventSignaturePreimage(core: CatalogEventCore, eventId: Digest, protectedHeader: Omit<ProtectedSignature, "signature">): Buffer;
export declare function captureReceiptSignaturePreimage(core: unknown, receiptDigest: Digest, protectedHeader: Omit<ProtectedSignature, "signature">): Buffer;
export declare function releasePublicationSignaturePreimage(core: ReleasePublicationCore, publicationDigest: Digest, protectedHeader: Omit<ProtectedSignature, "signature">): Buffer;
export declare function changeCursorSignaturePreimage(core: ChangeCursorCore | SearchCursorCore, cursorDigest: Digest, protectedHeader: Omit<ProtectedSignature, "signature">): Buffer;
export declare function catalogVerifierIdentityContextSignaturePreimage(core: CatalogVerifierIdentityContextCore, contextDigest: Digest, protectedHeader: Omit<ProtectedSignature, "signature">): Buffer;
export declare function validateCatalogVerifierIdentityContext(input: unknown, registry: SignerRegistry, verifiedAt: string): CatalogVerifierIdentityContext;
export declare function validateSearchCursor(input: unknown, registry: SignerRegistry, context?: {
    readonly releaseSequence: number;
}): SearchCursor;
export declare function validateSignerRegistry(rootSet: RootSet, input: unknown): SignerRegistry;
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
export declare function validateProtectedCaptureReceipt(input: unknown, registry: SignerRegistry, releaseSequence: number): CaptureReceipt;
/**
 * Replays an already-issued receipt from immutable release history. This does
 * not authorize the historical shape for current issuance.
 */
export declare function validateProtectedRetainedCaptureReceipt(input: unknown, registry: SignerRegistry, releaseSequence: number): RetainedCaptureReceipt;
export declare function validateReleasePublication(input: unknown, registry: SignerRegistry): ReleasePublication;
export declare function validateChangeCursor(input: unknown, registry: SignerRegistry, context?: {
    readonly releaseSequence: number;
}): ChangeCursor;
//# sourceMappingURL=index.d.ts.map