import { digest } from "provenry/primitives";
import { receiptPreimage, verifyReceipt } from "provenry/receipts";
import { catalogVerifierIdentityContextCoreSchema, catalogVerifierIdentityContextSchema, } from "../../../contracts/catalog-verifier/src/index.js";
import { signerRegistryReceiptKeys } from "./registry.js";
const VERIFIER_IDENTITY_CONTEXT_DOMAIN = "sourcey:catalog-verifier-identity-context:v1alpha1";
export function catalogVerifierIdentityContextSignaturePreimage(core, contextDigest, protectedHeader) {
    return receiptPreimage([VERIFIER_IDENTITY_CONTEXT_DOMAIN, protectedHeader.signature_purpose], {
        context_digest: contextDigest,
        context_core_digest: digest(core),
        protected: protectedHeader,
    });
}
export function validateCatalogVerifierIdentityContext(input, registry, verifiedAt) {
    const context = catalogVerifierIdentityContextSchema.parse(input);
    const { context_digest: contextDigest, protected: protectedSignature, ...coreInput } = context;
    const core = catalogVerifierIdentityContextCoreSchema.parse(coreInput);
    if (digest(core) !== contextDigest) {
        throw new Error("Catalog verifier identity context digest mismatch.");
    }
    if (protectedSignature.signature_purpose !== "catalog-identity" ||
        protectedSignature.signer_registry_digest !== registry.registry_digest) {
        throw new Error("Catalog verifier identity context uses invalid protected authority.");
    }
    const verificationInstant = Date.parse(verifiedAt);
    if (!Number.isFinite(verificationInstant) ||
        verificationInstant < Date.parse(context.issued_at) ||
        verificationInstant >= Date.parse(context.expires_at)) {
        throw new Error("Catalog verifier identity context is outside its signed freshness interval.");
    }
    const { signature, ...protectedHeader } = protectedSignature;
    verifyReceipt(signerRegistryReceiptKeys(registry), {
        subject: "Catalog verifier identity context",
        keyId: protectedSignature.key_id,
        purpose: "catalog-identity",
        at: context.issued_at,
        sequence: context.live_parent_release_sequence,
        preimage: catalogVerifierIdentityContextSignaturePreimage(core, contextDigest, protectedHeader),
        signature,
    });
    return context;
}
//# sourceMappingURL=identity-context.js.map