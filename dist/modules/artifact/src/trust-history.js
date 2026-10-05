import { basename } from "node:path";
import { digest, digestFromPathSegment } from "provenry/primitives";
import { rootSetSchema, rootSetTransitionSchema, signerRegistrySchema, } from "../../../contracts/authority/src/index.js";
import { validateRootSetTransition, validateSignerRegistry } from "../../authority/src/index.js";
export function validateTrustHistory(files, currentRootSet, currentRegistry) {
    const rootSets = new Map();
    const transitions = new Map();
    const registries = new Map();
    for (const [path, bytes] of files) {
        if (path.startsWith("trust/roots/") && path.endsWith(".json")) {
            const rootSet = rootSetSchema.parse(JSON.parse(bytes.toString("utf8")));
            const rootDigest = digest(rootSet);
            if (addressFromJsonPath(path) !== rootDigest || rootSets.has(rootDigest)) {
                throw new Error(`Trust root ${path} is duplicate or misaddressed.`);
            }
            rootSets.set(rootDigest, rootSet);
        }
        else if (path.startsWith("trust/transitions/") && path.endsWith(".json")) {
            const transition = rootSetTransitionSchema.parse(JSON.parse(bytes.toString("utf8")));
            if (addressFromJsonPath(path) !== transition.transition_digest ||
                digest(withoutKeys(transition, [
                    "transition_digest",
                    "previous_root_signatures",
                    "next_root_signatures",
                ])) !== transition.transition_digest ||
                transitions.has(transition.next_root_set_digest)) {
                throw new Error(`Trust transition ${path} is duplicate or misaddressed.`);
            }
            transitions.set(transition.next_root_set_digest, transition);
        }
        else if (path.startsWith("trust/registries/") && path.endsWith(".json")) {
            const signerRegistry = signerRegistrySchema.parse(JSON.parse(bytes.toString("utf8")));
            if (addressFromJsonPath(path) !== signerRegistry.registry_digest ||
                registries.has(signerRegistry.registry_digest)) {
                throw new Error(`Signer registry ${path} is duplicate or misaddressed.`);
            }
            registries.set(signerRegistry.registry_digest, signerRegistry);
        }
    }
    const currentRootDigest = digest(currentRootSet);
    if (!rootSets.has(currentRootDigest)) {
        throw new Error("Current trust root is absent from trust history.");
    }
    const trustedRoots = new Map();
    const usedTransitions = new Set();
    let rootDigest = currentRootDigest;
    while (true) {
        const rootSet = rootSets.get(rootDigest);
        if (!rootSet || trustedRoots.has(rootDigest)) {
            throw new Error("Trust-root history is missing or cyclic.");
        }
        trustedRoots.set(rootDigest, rootSet);
        const transition = transitions.get(rootDigest);
        if (!transition)
            break;
        const previousRoot = rootSets.get(transition.previous_root_set_digest);
        if (!previousRoot)
            throw new Error("Trust-root history lacks a transition predecessor.");
        validateRootSetTransition({
            previousRootSet: previousRoot,
            nextRootSet: rootSet,
            transition,
            releaseSequence: transition.effective_release_sequence,
        });
        usedTransitions.add(transition.transition_digest);
        rootDigest = transition.previous_root_set_digest;
    }
    if (trustedRoots.size !== rootSets.size || usedTransitions.size !== transitions.size) {
        throw new Error("Release contains trust roots or transitions outside the current trust lineage.");
    }
    const currentRegistryDigest = currentRegistry.registry_digest;
    if (!registries.has(currentRegistryDigest)) {
        throw new Error("Current signer registry is absent from trust history.");
    }
    const trustedRegistries = new Map();
    let registry = currentRegistry;
    while (registry) {
        if (trustedRegistries.has(registry.registry_digest)) {
            throw new Error("Signer-registry history is cyclic.");
        }
        const validated = validateRegistryUnderTrustedRoot(registry, trustedRoots);
        trustedRegistries.set(validated.registry_digest, validated);
        if (registry.parent_registry_digest === null) {
            if (registry.generation !== 1) {
                throw new Error("Signer-registry history does not terminate at generation one.");
            }
            break;
        }
        const parent = registries.get(registry.parent_registry_digest);
        if (!parent || parent.generation !== registry.generation - 1) {
            throw new Error("Signer-registry history is not adjacent and predecessor-bound.");
        }
        registry = parent;
    }
    for (const candidate of registries.values()) {
        if (trustedRegistries.has(candidate.registry_digest))
            continue;
        if (candidate.parent_registry_digest === null) {
            if (candidate.generation !== 1) {
                throw new Error("Historical signer-registry branches must terminate at generation one.");
            }
        }
        else {
            const parent = registries.get(candidate.parent_registry_digest);
            if (!parent || parent.generation !== candidate.generation - 1) {
                throw new Error("Historical signer-registry branches must be adjacent and complete.");
            }
        }
        const validated = validateRegistryUnderTrustedRoot(candidate, trustedRoots);
        trustedRegistries.set(validated.registry_digest, validated);
    }
    return trustedRegistries;
}
function validateRegistryUnderTrustedRoot(registry, trustedRoots) {
    for (const rootSet of trustedRoots.values()) {
        try {
            return validateSignerRegistry(rootSet, registry);
        }
        catch {
            // A historical registry needs to validate under only one root in the trusted lineage.
        }
    }
    throw new Error(`Signer registry ${registry.registry_digest} has no valid root in the trusted lineage.`);
}
function addressFromJsonPath(path) {
    return digestFromPathSegment(basename(path, ".json"));
}
function withoutKeys(value, keys) {
    const copy = { ...value };
    for (const key of keys)
        delete copy[key];
    return copy;
}
//# sourceMappingURL=trust-history.js.map