import { type Digest } from "provenry/primitives";
import type { ProtectedSignature, SignerRegistry } from "../../../contracts/authority/src/index.js";
import { type CatalogVerifierIdentityContext, type CatalogVerifierIdentityContextCore } from "../../../contracts/catalog-verifier/src/index.js";
export declare function catalogVerifierIdentityContextSignaturePreimage(core: CatalogVerifierIdentityContextCore, contextDigest: Digest, protectedHeader: Omit<ProtectedSignature, "signature">): Buffer;
export declare function validateCatalogVerifierIdentityContext(input: unknown, registry: SignerRegistry, verifiedAt: string): CatalogVerifierIdentityContext;
//# sourceMappingURL=identity-context.d.ts.map