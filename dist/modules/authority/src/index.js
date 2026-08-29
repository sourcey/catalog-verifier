import { createPublicKey, verify } from "node:crypto";
import { rootSetTransitionCoreSchema, rootSetTransitionSchema, signerRegistryCoreSchema, signerRegistrySchema, } from "../../../contracts/authority/src/index.js";
import { catalogVerifierIdentityContextCoreSchema, catalogVerifierIdentityContextSchema, } from "../../../contracts/catalog-verifier/src/index.js";
import { catalogEventCoreSchema, catalogEventSchema, } from "../../../contracts/events/src/index.js";
import { captureReceiptCoreSchema, captureReceiptSchema, evidenceReviewDecisionCoreSchema, } from "../../../contracts/evidence/src/index.js";
import { changeCursorCoreSchema, changeCursorSchema, searchCursorCoreSchema, searchCursorSchema, } from "../../../contracts/feed/src/index.js";
import { releasePublicationCoreSchema, releasePublicationSchema, } from "../../../contracts/release/src/index.js";
import { canonicalJson, digest } from "../../primitives/src/index.js";
const REGISTRY_DOMAIN = "sourcey:signer-registry:v1alpha1";
const CAPTURE_RECEIPT_DOMAIN = "sourcey:capture-receipt:v1alpha1";
const EVENT_DOMAIN = "sourcey:catalog-event:v1alpha1";
const RELEASE_DOMAIN = "sourcey:release-publication:v1alpha1";
const FEED_CURSOR_DOMAIN = "sourcey:change-cursor:v1alpha1";
const ROOT_TRANSITION_DOMAIN = "sourcey:root-set-transition:v1alpha1";
const VERIFIER_IDENTITY_CONTEXT_DOMAIN = "sourcey:catalog-verifier-identity-context:v1alpha1";
export function signaturePurposeForKind(kind) {
    if (kind === "evidence.bound" ||
        kind === "evidence.retracted" ||
        kind === "discrepancy.resolved") {
        return "catalog-evidence";
    }
    if (kind.startsWith("authority."))
        return "catalog-authority";
    if (kind === "subject.attested" || kind === "attestation.revoked") {
        return "catalog-attestation";
    }
    if (kind.startsWith("verification."))
        return "catalog-verification";
    if (kind.startsWith("freshness."))
        return "catalog-policy";
    if (kind.startsWith("dispute."))
        return "catalog-dispute";
    return "catalog-identity";
}
export function signerRegistryPreimage(core) {
    return Buffer.from(`${REGISTRY_DOMAIN}\0${canonicalJson(core)}`, "utf8");
}
export function rootSetTransitionPreimage(core) {
    return Buffer.from(`${ROOT_TRANSITION_DOMAIN}\0${canonicalJson(core)}`, "utf8");
}
export function validateRootSetTransition(input) {
    const transition = rootSetTransitionSchema.parse(input.transition);
    const { transition_digest: transitionDigest, previous_root_signatures: previousSignatures, next_root_signatures: nextSignatures, ...coreInput } = transition;
    const core = rootSetTransitionCoreSchema.parse(coreInput);
    if (digest(core) !== transitionDigest)
        throw new Error("Root-set transition digest mismatch.");
    if (core.previous_root_set_digest !== digest(input.previousRootSet) ||
        core.next_root_set_digest !== digest(input.nextRootSet) ||
        core.previous_generation !== input.previousRootSet.generation ||
        core.next_generation !== input.nextRootSet.generation ||
        core.next_generation !== core.previous_generation + 1 ||
        core.effective_release_sequence !== input.releaseSequence) {
        throw new Error("Root-set transition does not bind the exact adjacent trust generations.");
    }
    const preimage = rootSetTransitionPreimage(core);
    assertRootThreshold(input.previousRootSet, previousSignatures, preimage, "previous");
    assertRootThreshold(input.nextRootSet, nextSignatures, preimage, "next");
    return transition;
}
function assertRootThreshold(roots, signatures, preimage, label) {
    const keys = new Map(roots.keys.map((key) => [key.key_id, key]));
    const valid = new Set();
    for (const signature of signatures) {
        const key = keys.get(signature.key_id);
        if (key &&
            !valid.has(key.key_id) &&
            verify(null, preimage, createPublicKey(key.public_key_pem), Buffer.from(signature.signature, "base64"))) {
            valid.add(key.key_id);
        }
    }
    if (valid.size < roots.threshold) {
        throw new Error(`Root-set transition has ${valid.size} valid ${label} signatures; ${roots.threshold} required.`);
    }
}
export function eventSignaturePreimage(core, eventId, protectedHeader) {
    return Buffer.from(`${EVENT_DOMAIN}\0${protectedHeader.signature_purpose}\0${canonicalJson({
        event_id: eventId,
        event_core_digest: digest(core),
        protected: protectedHeader,
    })}`, "utf8");
}
export function captureReceiptSignaturePreimage(core, receiptDigest, protectedHeader) {
    return Buffer.from(`${CAPTURE_RECEIPT_DOMAIN}\0${protectedHeader.signature_purpose}\0${canonicalJson({
        receipt_digest: receiptDigest,
        receipt_core_digest: digest(core),
        protected: protectedHeader,
    })}`, "utf8");
}
export function releasePublicationSignaturePreimage(core, publicationDigest, protectedHeader) {
    return Buffer.from(`${RELEASE_DOMAIN}\0${protectedHeader.signature_purpose}\0${canonicalJson({
        publication_digest: publicationDigest,
        publication_core_digest: digest(core),
        protected: protectedHeader,
    })}`, "utf8");
}
export function changeCursorSignaturePreimage(core, cursorDigest, protectedHeader) {
    return Buffer.from(`${FEED_CURSOR_DOMAIN}\0${protectedHeader.signature_purpose}\0${canonicalJson({
        cursor_digest: cursorDigest,
        cursor_core_digest: digest(core),
        protected: protectedHeader,
    })}`, "utf8");
}
export function catalogVerifierIdentityContextSignaturePreimage(core, contextDigest, protectedHeader) {
    return Buffer.from(`${VERIFIER_IDENTITY_CONTEXT_DOMAIN}\0${protectedHeader.signature_purpose}\0${canonicalJson({
        context_digest: contextDigest,
        context_core_digest: digest(core),
        protected: protectedHeader,
    })}`, "utf8");
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
    const issuer = registry.issuers.find((candidate) => candidate.keys.some((key) => key.key_id === protectedSignature.key_id));
    const key = issuer?.keys.find((candidate) => candidate.key_id === protectedSignature.key_id);
    if (!key?.purposes.includes("catalog-identity")) {
        throw new Error("Catalog verifier identity context signer lacks catalog-identity authority.");
    }
    if (context.issued_at < key.valid_from ||
        (key.valid_until && context.issued_at >= key.valid_until) ||
        (key.compromised_after_sequence !== undefined &&
            context.live_parent_release_sequence >= key.compromised_after_sequence)) {
        throw new Error("Catalog verifier identity context uses an ineligible signing key.");
    }
    const verificationInstant = Date.parse(verifiedAt);
    if (!Number.isFinite(verificationInstant) ||
        verificationInstant < Date.parse(context.issued_at) ||
        verificationInstant >= Date.parse(context.expires_at)) {
        throw new Error("Catalog verifier identity context is outside its signed freshness interval.");
    }
    const { signature, ...protectedHeader } = protectedSignature;
    if (!verify(null, catalogVerifierIdentityContextSignaturePreimage(core, contextDigest, protectedHeader), createPublicKey(key.public_key_pem), Buffer.from(signature, "base64"))) {
        throw new Error("Catalog verifier identity context has an invalid protected signature.");
    }
    return context;
}
export function validateSearchCursor(input, registry, context) {
    const cursor = searchCursorSchema.parse(input);
    const { cursor_digest: cursorDigest, protected: protectedSignature, ...coreInput } = cursor;
    const core = searchCursorCoreSchema.parse(coreInput);
    if (cursorDigest !== digest(core))
        throw new Error("Search cursor digest mismatch.");
    if (protectedSignature.signature_purpose !== "catalog-feed" ||
        protectedSignature.signer_registry_digest !== registry.registry_digest) {
        throw new Error("Search cursor uses invalid protected authority.");
    }
    const issuer = registry.issuers.find((candidate) => candidate.keys.some((key) => key.key_id === protectedSignature.key_id));
    const key = issuer?.keys.find((candidate) => candidate.key_id === protectedSignature.key_id);
    if (!key?.purposes.includes("catalog-feed")) {
        throw new Error("Search cursor signer is not authorized for catalog-feed.");
    }
    if (key.compromised_after_sequence !== undefined &&
        (context === undefined || context.releaseSequence >= key.compromised_after_sequence)) {
        throw new Error("Search cursor uses a key rejected for this release.");
    }
    const { signature, ...protectedHeader } = protectedSignature;
    if (!verify(null, changeCursorSignaturePreimage(core, cursorDigest, protectedHeader), createPublicKey(key.public_key_pem), Buffer.from(signature, "base64"))) {
        throw new Error("Search cursor signature is invalid.");
    }
    return cursor;
}
export function validateSignerRegistry(rootSet, input) {
    const registry = signerRegistrySchema.parse(input);
    const { registry_digest: registryDigest, root_signatures: signatures, ...coreInput } = registry;
    const core = signerRegistryCoreSchema.parse(coreInput);
    const expectedDigest = digest(core);
    if (registryDigest !== expectedDigest) {
        throw new Error(`Signer registry digest mismatch: expected ${expectedDigest}, received ${registryDigest}.`);
    }
    const roots = new Map(rootSet.keys.map((key) => [key.key_id, key]));
    const valid = new Set();
    const preimage = signerRegistryPreimage(core);
    for (const signature of signatures) {
        const root = roots.get(signature.key_id);
        if (!root || valid.has(root.key_id))
            continue;
        if (verify(null, preimage, createPublicKey(root.public_key_pem), Buffer.from(signature.signature, "base64"))) {
            valid.add(root.key_id);
        }
    }
    if (valid.size < rootSet.threshold) {
        throw new Error(`Signer registry has ${valid.size} valid root signatures; ${rootSet.threshold} required.`);
    }
    return registry;
}
/**
 * Resolve the one registry authority that may issue a purpose-bound object at
 * an exact instant and release. This is deliberately independent of private
 * key custody: callers learn only the public issuer/key identity that their
 * immutable object must name.
 */
export function resolveActiveSignerAuthority(registry, input) {
    const instant = Date.parse(input.at);
    if (!Number.isFinite(instant))
        throw new Error("Signer authority time is invalid.");
    if (!Number.isInteger(input.releaseSequence) || input.releaseSequence <= 0) {
        throw new Error("Signer authority release sequence must be a positive integer.");
    }
    const candidates = registry.issuers.flatMap((issuer) => issuer.keys
        .filter((key) => key.purposes.includes(input.purpose) &&
        Date.parse(key.valid_from) <= instant &&
        (key.valid_until === undefined || instant < Date.parse(key.valid_until)) &&
        (key.compromised_after_sequence === undefined ||
            input.releaseSequence < key.compromised_after_sequence))
        .map((key) => ({ issuerId: issuer.issuer_id, keyId: key.key_id })));
    if (candidates.length !== 1 || !candidates[0]) {
        throw new Error(`Signer registry must resolve exactly one ${input.purpose} authority at ${input.at}.`);
    }
    return candidates[0];
}
export function validateProtectedEvent(input, registry, releaseSequence) {
    const event = catalogEventSchema.parse(input);
    const { event_id: eventId, protected: protectedSignature, ...coreInput } = event;
    const core = catalogEventCoreSchema.parse(coreInput);
    const expectedEventId = digest(core);
    if (eventId !== expectedEventId) {
        throw new Error(`Event ID mismatch: expected ${expectedEventId}, received ${eventId}.`);
    }
    if (protectedSignature.signer_registry_digest !== registry.registry_digest) {
        throw new Error(`Event ${eventId} does not use the release-pinned signer registry.`);
    }
    const expectedPurpose = signaturePurposeForKind(event.kind);
    if (protectedSignature.signature_purpose !== expectedPurpose) {
        throw new Error(`Event ${eventId} uses ${protectedSignature.signature_purpose}; ${expectedPurpose} required.`);
    }
    const issuer = registry.issuers.find((candidate) => candidate.issuer_id === event.issuer_id);
    const key = issuer?.keys.find((candidate) => candidate.key_id === protectedSignature.key_id);
    if (!issuer || !key) {
        throw new Error(`Event ${eventId} signer is absent from the pinned registry.`);
    }
    if (!key.purposes.includes(expectedPurpose)) {
        throw new Error(`Event ${eventId} signer is not authorized for ${expectedPurpose}.`);
    }
    if (event.occurred_at < key.valid_from ||
        (key.valid_until && event.occurred_at >= key.valid_until)) {
        throw new Error(`Event ${eventId} falls outside its signer's validity interval.`);
    }
    if (key.compromised_after_sequence !== undefined &&
        releaseSequence >= key.compromised_after_sequence) {
        throw new Error(`Event ${eventId} uses a key rejected at this release sequence.`);
    }
    const { signature, ...protectedHeader } = protectedSignature;
    if (!verify(null, eventSignaturePreimage(core, eventId, protectedHeader), createPublicKey(key.public_key_pem), Buffer.from(signature, "base64"))) {
        throw new Error(`Event ${eventId} has an invalid protected signature.`);
    }
    return event;
}
export function validateProtectedCaptureReceipt(input, registry, releaseSequence) {
    const receipt = captureReceiptSchema.parse(input);
    const { receipt_digest: receiptDigest, protected: protectedSignature, ...coreInput } = receipt;
    const core = captureReceiptCoreSchema.parse(coreInput);
    const expectedDigest = digest(core);
    if (receiptDigest !== expectedDigest) {
        throw new Error(`Capture receipt digest mismatch: expected ${expectedDigest}, received ${receiptDigest}.`);
    }
    const { decision_digest: decisionDigest, ...decisionCore } = receipt.review_decision;
    if (digest(evidenceReviewDecisionCoreSchema.parse(decisionCore)) !== decisionDigest ||
        receipt.review_decision.decision !== "approved") {
        throw new Error(`Capture receipt ${receiptDigest} lacks its exact approved review decision.`);
    }
    if (protectedSignature.signature_purpose !== "catalog-capture" ||
        protectedSignature.signer_registry_digest !== registry.registry_digest) {
        throw new Error(`Capture receipt ${receiptDigest} uses invalid protected authority.`);
    }
    const issuer = registry.issuers.find((candidate) => candidate.issuer_id === receipt.issuer_id);
    const key = issuer?.keys.find((candidate) => candidate.key_id === protectedSignature.key_id);
    if (!issuer || !key?.purposes.includes("catalog-capture")) {
        throw new Error(`Capture receipt ${receiptDigest} signer lacks catalog-capture authority.`);
    }
    if (receipt.issued_at < key.valid_from ||
        (key.valid_until && receipt.issued_at >= key.valid_until)) {
        throw new Error(`Capture receipt ${receiptDigest} falls outside signer validity.`);
    }
    if (key.compromised_after_sequence !== undefined &&
        releaseSequence >= key.compromised_after_sequence) {
        throw new Error(`Capture receipt ${receiptDigest} uses a rejected key.`);
    }
    const { signature, ...protectedHeader } = protectedSignature;
    if (!verify(null, captureReceiptSignaturePreimage(core, receiptDigest, protectedHeader), createPublicKey(key.public_key_pem), Buffer.from(signature, "base64"))) {
        throw new Error(`Capture receipt ${receiptDigest} has an invalid protected signature.`);
    }
    return receipt;
}
export function validateReleasePublication(input, registry) {
    const publication = releasePublicationSchema.parse(input);
    const { publication_digest: publicationDigest, protected: protectedSignature, ...coreInput } = publication;
    const core = releasePublicationCoreSchema.parse(coreInput);
    const expectedDigest = digest(core);
    if (publicationDigest !== expectedDigest) {
        throw new Error(`Publication digest mismatch: expected ${expectedDigest}, received ${publicationDigest}.`);
    }
    if (protectedSignature.signature_purpose !== "catalog-release") {
        throw new Error("Release publication requires a catalog-release signature.");
    }
    if (protectedSignature.signer_registry_digest !== registry.registry_digest) {
        throw new Error("Release publication does not use the bundle-pinned signer registry.");
    }
    const issuer = registry.issuers.find((candidate) => candidate.keys.some((key) => key.key_id === protectedSignature.key_id));
    const key = issuer?.keys.find((candidate) => candidate.key_id === protectedSignature.key_id);
    if (!issuer || !key?.purposes.includes("catalog-release")) {
        throw new Error("Release publication signer is not authorized for catalog-release.");
    }
    if (publication.published_at < key.valid_from ||
        (key.valid_until && publication.published_at >= key.valid_until)) {
        throw new Error("Release publication falls outside its signer's validity interval.");
    }
    if (key.compromised_after_sequence !== undefined &&
        publication.release_sequence >= key.compromised_after_sequence) {
        throw new Error("Release publication uses a key rejected at this release sequence.");
    }
    const { signature, ...protectedHeader } = protectedSignature;
    if (!verify(null, releasePublicationSignaturePreimage(core, publicationDigest, protectedHeader), createPublicKey(key.public_key_pem), Buffer.from(signature, "base64"))) {
        throw new Error("Release publication has an invalid protected signature.");
    }
    return publication;
}
export function validateChangeCursor(input, registry, context) {
    const cursor = changeCursorSchema.parse(input);
    const { cursor_digest: cursorDigest, protected: protectedSignature, ...coreInput } = cursor;
    const core = changeCursorCoreSchema.parse(coreInput);
    if (cursorDigest !== digest(core))
        throw new Error("Change cursor digest mismatch.");
    if (protectedSignature.signature_purpose !== "catalog-feed" ||
        protectedSignature.signer_registry_digest !== registry.registry_digest) {
        throw new Error("Change cursor uses invalid protected authority.");
    }
    const issuer = registry.issuers.find((candidate) => candidate.keys.some((key) => key.key_id === protectedSignature.key_id));
    const key = issuer?.keys.find((candidate) => candidate.key_id === protectedSignature.key_id);
    if (!key?.purposes.includes("catalog-feed")) {
        throw new Error("Change cursor signer is not authorized for catalog-feed.");
    }
    if (key.compromised_after_sequence !== undefined &&
        (context === undefined || context.releaseSequence >= key.compromised_after_sequence)) {
        throw new Error("Change cursor uses a key rejected for this release.");
    }
    const { signature, ...protectedHeader } = protectedSignature;
    if (!verify(null, changeCursorSignaturePreimage(core, cursorDigest, protectedHeader), createPublicKey(key.public_key_pem), Buffer.from(signature, "base64"))) {
        throw new Error("Change cursor signature is invalid.");
    }
    return cursor;
}
//# sourceMappingURL=index.js.map