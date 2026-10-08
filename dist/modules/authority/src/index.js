import { digest } from "provenry/primitives";
import { activeReceiptKey, receiptKeys, receiptPreimage, receiptRoots, verifyReceipt, verifyReceiptThreshold, } from "provenry/receipts";
import { rootSetTransitionCoreSchema, rootSetTransitionSchema, signerRegistryCoreSchema, signerRegistrySchema, } from "../../../contracts/authority/src/index.js";
import { catalogVerifierIdentityContextCoreSchema, catalogVerifierIdentityContextSchema, } from "../../../contracts/catalog-verifier/src/index.js";
import { catalogEventCoreSchema, catalogEventSchema, } from "../../../contracts/events/src/index.js";
import { changeCursorCoreSchema, changeCursorSchema, searchCursorCoreSchema, searchCursorSchema, } from "../../../contracts/feed/src/index.js";
import { releasePublicationCoreSchema, releasePublicationSchema, } from "../../../contracts/release/src/index.js";
const REGISTRY_DOMAIN = "sourcey:signer-registry:v1alpha1";
const EVENT_DOMAIN = "sourcey:catalog-event:v1alpha1";
const RELEASE_DOMAIN = "sourcey:release-publication:v1alpha1";
const FEED_CURSOR_DOMAIN = "sourcey:change-cursor:v1alpha1";
const ROOT_TRANSITION_DOMAIN = "sourcey:root-set-transition:v1alpha1";
const VERIFIER_IDENTITY_CONTEXT_DOMAIN = "sourcey:catalog-verifier-identity-context:v1alpha1";
export function signaturePurposeForKind(kind) {
    if (kind === "evidence.bound" ||
        kind === "evidence.retracted" ||
        kind === "discrepancy.resolved" ||
        kind === "agent-readiness-profile.admitted") {
        return "catalog-evidence";
    }
    if (kind.startsWith("authority."))
        return "catalog-authority";
    if (kind === "subject.attested" || kind === "attestation.revoked") {
        return "catalog-attestation";
    }
    if (kind === "verification.completed" ||
        kind === "entity.identity-checked" ||
        kind === "offer.terms-checked" ||
        kind === "assurance.revoked") {
        return "catalog-verification";
    }
    if (kind.startsWith("freshness."))
        return "catalog-policy";
    if (kind.startsWith("dispute."))
        return "catalog-dispute";
    return "catalog-identity";
}
const registryReceiptKeys = new WeakMap();
const rootSetReceiptRoots = new WeakMap();
/** The registry's keys as Provenry receipts judges them, built once per registry. */
export function signerRegistryReceiptKeys(registry) {
    const built = registryReceiptKeys.get(registry);
    if (built)
        return built;
    const keys = receiptKeys(registry.issuers.flatMap((issuer) => issuer.keys.map((key) => ({
        issuerId: issuer.issuer_id,
        keyId: key.key_id,
        purposes: key.purposes,
        publicKeyPem: key.public_key_pem,
        validFrom: key.valid_from,
        validUntil: key.valid_until ?? null,
        compromisedAfterSequence: key.compromised_after_sequence ?? null,
    }))));
    registryReceiptKeys.set(registry, keys);
    return keys;
}
function rootSetRoots(rootSet) {
    const built = rootSetReceiptRoots.get(rootSet);
    if (built)
        return built;
    const roots = receiptRoots(rootSet.keys.map((key) => ({ keyId: key.key_id, publicKeyPem: key.public_key_pem })), rootSet.threshold);
    rootSetReceiptRoots.set(rootSet, roots);
    return roots;
}
function rootSignatures(signatures) {
    return signatures.map(({ key_id, signature }) => ({ keyId: key_id, signature }));
}
export function signerRegistryPreimage(core) {
    return receiptPreimage([REGISTRY_DOMAIN], core);
}
export function rootSetTransitionPreimage(core) {
    return receiptPreimage([ROOT_TRANSITION_DOMAIN], core);
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
    verifyReceiptThreshold(rootSetRoots(input.previousRootSet), {
        subject: "Root-set transition (previous roots)",
        preimage,
        signatures: rootSignatures(previousSignatures),
    });
    verifyReceiptThreshold(rootSetRoots(input.nextRootSet), {
        subject: "Root-set transition (next roots)",
        preimage,
        signatures: rootSignatures(nextSignatures),
    });
    return transition;
}
export function eventSignaturePreimage(core, eventId, protectedHeader) {
    return receiptPreimage([EVENT_DOMAIN, protectedHeader.signature_purpose], {
        event_id: eventId,
        event_core_digest: digest(core),
        protected: protectedHeader,
    });
}
export function releasePublicationSignaturePreimage(core, publicationDigest, protectedHeader) {
    return receiptPreimage([RELEASE_DOMAIN, protectedHeader.signature_purpose], {
        publication_digest: publicationDigest,
        publication_core_digest: digest(core),
        protected: protectedHeader,
    });
}
export function changeCursorSignaturePreimage(core, cursorDigest, protectedHeader) {
    return receiptPreimage([FEED_CURSOR_DOMAIN, protectedHeader.signature_purpose], {
        cursor_digest: cursorDigest,
        cursor_core_digest: digest(core),
        protected: protectedHeader,
    });
}
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
    const { signature, ...protectedHeader } = protectedSignature;
    // A cursor names no signing time; a compromised key is refused unless the release says otherwise.
    verifyReceipt(signerRegistryReceiptKeys(registry), {
        subject: "Search cursor",
        keyId: protectedSignature.key_id,
        purpose: "catalog-feed",
        ...(context ? { sequence: context.releaseSequence } : {}),
        preimage: changeCursorSignaturePreimage(core, cursorDigest, protectedHeader),
        signature,
    });
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
    verifyReceiptThreshold(rootSetRoots(rootSet), {
        subject: "Signer registry",
        preimage: signerRegistryPreimage(core),
        signatures: rootSignatures(signatures),
    });
    // Its keys are judged once, here: every object it authorizes verifies from them.
    signerRegistryReceiptKeys(registry);
    return registry;
}
export function registryIssuerForPurpose(registry, purpose) {
    const issuers = registry.issuers.filter((issuer) => issuer.keys.some((key) => key.purposes.includes(purpose)));
    if (issuers.length !== 1 || !issuers[0]) {
        throw new Error(`Signer registry must name exactly one issuer for ${purpose}.`);
    }
    return issuers[0].issuer_id;
}
/**
 * Resolve the one registry authority that may issue a purpose-bound object at
 * an exact instant and release. This is deliberately independent of private
 * key custody: callers learn only the public issuer/key identity that their
 * immutable object must name.
 */
export function resolveActiveSignerAuthority(registry, input) {
    if (!Number.isFinite(Date.parse(input.at)))
        throw new Error("Signer authority time is invalid.");
    if (!Number.isInteger(input.releaseSequence) || input.releaseSequence <= 0) {
        throw new Error("Signer authority release sequence must be a positive integer.");
    }
    const key = activeReceiptKey(signerRegistryReceiptKeys(registry), {
        purpose: input.purpose,
        at: input.at,
        sequence: input.releaseSequence,
    });
    return { issuerId: key.issuerId, keyId: key.keyId };
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
    const { signature, ...protectedHeader } = protectedSignature;
    verifyReceipt(signerRegistryReceiptKeys(registry), {
        subject: `Event ${eventId}`,
        keyId: protectedSignature.key_id,
        issuerId: event.issuer_id,
        purpose: expectedPurpose,
        at: event.occurred_at,
        sequence: releaseSequence,
        preimage: eventSignaturePreimage(core, eventId, protectedHeader),
        signature,
    });
    return event;
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
    const { signature, ...protectedHeader } = protectedSignature;
    verifyReceipt(signerRegistryReceiptKeys(registry), {
        subject: "Release publication",
        keyId: protectedSignature.key_id,
        purpose: "catalog-release",
        at: publication.published_at,
        sequence: publication.release_sequence,
        preimage: releasePublicationSignaturePreimage(core, publicationDigest, protectedHeader),
        signature,
    });
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
    const { signature, ...protectedHeader } = protectedSignature;
    verifyReceipt(signerRegistryReceiptKeys(registry), {
        subject: "Change cursor",
        keyId: protectedSignature.key_id,
        purpose: "catalog-feed",
        ...(context ? { sequence: context.releaseSequence } : {}),
        preimage: changeCursorSignaturePreimage(core, cursorDigest, protectedHeader),
        signature,
    });
    return cursor;
}
//# sourceMappingURL=index.js.map