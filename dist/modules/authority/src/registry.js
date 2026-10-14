import { digest } from "provenry/primitives";
import { activeReceiptKey, receiptKeys, receiptPreimage, receiptRoots, verifyReceiptThreshold, } from "provenry/receipts";
import { rootSetTransitionCoreSchema, rootSetTransitionSchema, signerRegistryCoreSchema, signerRegistrySchema, } from "../../../contracts/authority/src/index.js";
const REGISTRY_DOMAIN = "sourcey:signer-registry:v1alpha1";
const ROOT_TRANSITION_DOMAIN = "sourcey:root-set-transition:v1alpha1";
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
//# sourceMappingURL=registry.js.map