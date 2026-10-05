import { compareCanonicalStrings, digest, digestPathSegment, sha256Bytes, } from "provenry/primitives";
import { assetDeltaCoreSchema, assetDeltaSchema, assetIndexSchema, assetInputsSchema, assetManifestSchema, assetNoticesSchema, assetObjectCoreSchema, assetTransformReceiptCoreSchema, entityAssetProposalCoreSchema, entityAssetProposalSchema, retainedAssetCaptureCoreSchema, retainedAssetCaptureSchema, sourceyOwnedEntityIconCandidateCoreSchema, sourceyOwnedEntityIconCandidateSchema, } from "../../../contracts/assets/src/index.js";
export function verifyRetainedAssetCapture(input) {
    const capture = retainedAssetCaptureSchema.parse(input);
    const { capture_digest: captureDigest, ...core } = capture;
    if (digest(retainedAssetCaptureCoreSchema.parse(core)) !== captureDigest) {
        throw new Error("Retained asset capture digest does not match its immutable input.");
    }
    return capture;
}
export function verifySourceyOwnedEntityIconCandidate(input) {
    const candidate = sourceyOwnedEntityIconCandidateSchema.parse(input);
    verifyRetainedAssetCapture(candidate.capture);
    const { candidate_digest: candidateDigest, ...core } = candidate;
    if (digest(sourceyOwnedEntityIconCandidateCoreSchema.parse(core)) !== candidateDigest) {
        throw new Error("Sourcey-owned Entity icon candidate digest does not match its input.");
    }
    return candidate;
}
export function verifyEntityAssetProposal(input) {
    const proposal = entityAssetProposalSchema.parse(input);
    verifyRetainedAssetCapture(proposal.capture);
    const manifest = validateAssetManifest({
        manifest_contract: "sourcey.asset-manifest/v1alpha1",
        transform_profiles: [proposal.transform_profile],
        objects: [proposal.asset],
    });
    if (manifest.objects[0]?.original.digest !== proposal.capture.original_digest) {
        throw new Error("Entity asset proposal differs from its retained original capture.");
    }
    const { review_artifact_digest: reviewArtifactDigest, ...reviewCore } = proposal.review;
    if (digest(reviewCore) !== reviewArtifactDigest) {
        throw new Error("Entity asset review artifact digest does not match its approved input.");
    }
    const { proposal_digest: proposalDigest, ...core } = proposal;
    if (digest(entityAssetProposalCoreSchema.parse(core)) !== proposalDigest) {
        throw new Error("Entity asset proposal digest does not match its canonical input.");
    }
    return proposal;
}
export function verifyAssetDelta(input) {
    const delta = assetDeltaSchema.parse(input);
    const changes = [...delta.changes].sort((left, right) => compareCanonicalStrings(left.entity_id, right.entity_id) ||
        compareCanonicalStrings(left.role, right.role));
    if (changes.some((change, index) => change !== delta.changes[index]) ||
        new Set(changes.map((change) => `${change.entity_id}:${change.role}`)).size !== changes.length) {
        throw new Error("Asset delta changes must be unique and canonically ordered.");
    }
    const { delta_digest: deltaDigest, ...core } = delta;
    if (digest(assetDeltaCoreSchema.parse(core)) !== deltaDigest) {
        throw new Error("Asset delta digest does not match its canonical input.");
    }
    return delta;
}
export function validateAssetManifest(input) {
    const manifest = assetManifestSchema.parse(input);
    const profiles = new Map();
    for (const profile of manifest.transform_profiles) {
        const { profile_digest: _, ...profileCore } = profile;
        if (digest(profileCore) !== profile.profile_digest) {
            throw new Error(`Asset transform profile ${profile.profile_digest} is invalid.`);
        }
        if (profiles.has(profile.profile_digest)) {
            throw new Error(`Asset manifest repeats transform profile ${profile.profile_digest}.`);
        }
        profiles.set(profile.profile_digest, profile);
    }
    const objectDigests = new Set();
    const byteDigests = new Map();
    for (const object of manifest.objects) {
        const { asset_object_digest: _, ...coreInput } = object;
        const core = assetObjectCoreSchema.parse(coreInput);
        if (digest(core) !== object.asset_object_digest) {
            throw new Error(`Asset object ${object.asset_object_digest} has a digest mismatch.`);
        }
        if (objectDigests.has(object.asset_object_digest)) {
            throw new Error(`Asset manifest repeats object ${object.asset_object_digest}.`);
        }
        objectDigests.add(object.asset_object_digest);
        const receipts = new Map(object.transform_receipts.map((receipt) => [receipt.receipt_digest, receipt]));
        for (const receipt of object.transform_receipts) {
            const { receipt_digest: _, ...receiptCore } = receipt;
            if (digest(assetTransformReceiptCoreSchema.parse(receiptCore)) !== receipt.receipt_digest) {
                throw new Error(`Asset transform receipt ${receipt.receipt_digest} is invalid.`);
            }
            if (receipt.original_digest !== object.original.digest) {
                throw new Error("Asset transform receipt is bound to another original.");
            }
        }
        for (const variant of object.safe_variants) {
            const receipt = receipts.get(variant.transform_receipt_digest);
            if (!receipt ||
                receipt.safe_digest !== variant.digest ||
                receipt.profile_digest !== variant.transform_profile_digest ||
                !profiles.has(variant.transform_profile_digest) ||
                profiles.get(variant.transform_profile_digest)?.toolchain_digest !==
                    receipt.toolchain_digest) {
                throw new Error(`Safe asset ${variant.digest} has no exact transform receipt.`);
            }
            const canonicalPath = `sha256/${digestPathSegment(variant.digest)}`;
            if (variant.served_path !== canonicalPath) {
                throw new Error(`Safe asset ${variant.digest} does not use its immutable served path.`);
            }
        }
        for (const bytes of [object.original, ...object.safe_variants]) {
            const prior = byteDigests.get(bytes.source_path);
            if (prior && prior !== bytes.digest) {
                throw new Error(`Asset path ${bytes.source_path} is rebound to different bytes.`);
            }
            byteDigests.set(bytes.source_path, bytes.digest);
        }
    }
    return manifest;
}
export function materializeAssetManifest(input, readBytes) {
    const manifest = validateAssetManifest(input);
    const safeBytes = new Map();
    for (const object of manifest.objects) {
        for (const reference of [object.original, ...object.safe_variants]) {
            const bytes = readBytes(reference.source_path);
            if (bytes.byteLength !== reference.bytes || sha256Bytes(bytes) !== reference.digest) {
                throw new Error(`Asset bytes do not match ${reference.digest}.`);
            }
            if ("served_path" in reference)
                safeBytes.set(reference.digest, bytes);
        }
    }
    const inputs = assetInputsSchema.parse({
        input_contract: "sourcey.asset-inputs/v1alpha1",
        manifest_digest: digest(manifest),
        transform_profile_digests: manifest.transform_profiles
            .map((profile) => profile.profile_digest)
            .sort(compareCanonicalStrings),
        object_digests: manifest.objects
            .map((object) => object.asset_object_digest)
            .sort(compareCanonicalStrings),
        original_digests: manifest.objects
            .map((object) => object.original.digest)
            .sort(compareCanonicalStrings),
        safe_variant_digests: manifest.objects
            .flatMap((object) => object.safe_variants.map((variant) => variant.digest))
            .sort(compareCanonicalStrings),
    });
    return { manifest, inputs, safeBytes };
}
export function projectAssets(input) {
    const manifest = validateAssetManifest(input.manifest);
    const asOf = Date.parse(input.policyAsOf);
    if (!Number.isFinite(asOf))
        throw new Error("Asset projection policy time is invalid.");
    const objects = new Map(manifest.objects.map((object) => [object.asset_object_digest, object]));
    const terminations = new Set(input.events.flatMap((event) => terminatedAssetBinding(event, asOf)));
    const bindings = input.events
        .filter((event) => event.kind === "asset.bound")
        .flatMap((event) => {
        const payload = record(event.payload);
        const effectiveFrom = stringValue(payload.effective_from);
        const effectiveUntil = optionalString(payload.effective_until);
        if (terminations.has(event.event_id) ||
            Date.parse(effectiveFrom) > asOf ||
            (effectiveUntil && Date.parse(effectiveUntil) <= asOf)) {
            return [];
        }
        const objectDigest = stringValue(payload.asset_object_digest);
        const servedDigest = stringValue(payload.served_derivative_digest);
        const object = objects.get(objectDigest);
        const variant = object?.safe_variants.find((candidate) => candidate.digest === servedDigest);
        if (!object || !variant) {
            throw new Error(`Asset binding ${event.event_id} references an unavailable safe asset.`);
        }
        return [
            {
                entity_id: event.subject.entity_id,
                role: payload.role,
                asset_object_digest: objectDigest,
                served_digest: servedDigest,
                served_path: `assets/sha256/${digestPathSegment(servedDigest)}`,
                media_type: variant.media_type,
                bytes: variant.bytes,
                width: variant.width,
                height: variant.height,
                authority_basis: payload.authority_basis,
                ...(payload.authority_claim_id ? { authority_claim_id: payload.authority_claim_id } : {}),
                approval_receipt_digest: payload.approval_receipt_digest,
                source_basis: payload.source_basis,
                license_basis: payload.license_basis,
                effective_from: effectiveFrom,
                ...(effectiveUntil ? { effective_until: effectiveUntil } : {}),
                binding_event_id: event.event_id,
            },
        ];
    })
        .sort((left, right) => compareCanonicalStrings(left.entity_id, right.entity_id) ||
        compareCanonicalStrings(String(left.role), String(right.role)));
    const activeKeys = bindings.map((binding) => `${binding.entity_id}:${binding.role}`);
    if (new Set(activeKeys).size !== activeKeys.length) {
        throw new Error("More than one active asset binding exists for an entity role.");
    }
    const notices = assetNoticesSchema.parse({
        notices_contract: "sourcey.asset-notices/v1alpha1",
        notices: manifest.objects
            .map((object) => ({
            asset_object_digest: object.asset_object_digest,
            ...object.redistribution,
        }))
            .sort((left, right) => compareCanonicalStrings(left.asset_object_digest, right.asset_object_digest)),
    });
    const index = assetIndexSchema.parse({
        asset_index_contract: "sourcey.asset-index/v1alpha1",
        bindings,
        notices_digest: digest(notices),
    });
    return { index, notices };
}
function terminatedAssetBinding(event, asOf) {
    const payload = record(event.payload);
    if (["asset.withdrawn", "asset.takedown-ordered"].includes(event.kind)) {
        return Date.parse(stringValue(payload.effective_at)) <= asOf
            ? [stringValue(payload.target_binding_event_id)]
            : [];
    }
    if (event.kind !== "asset.bound")
        return [];
    const superseded = optionalString(payload.superseded_binding_event_id);
    return superseded && Date.parse(stringValue(payload.effective_from)) <= asOf ? [superseded] : [];
}
function record(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value)
        ? value
        : {};
}
function stringValue(value) {
    if (typeof value !== "string" || !value)
        throw new Error("Asset event value is missing.");
    return value;
}
function optionalString(value) {
    return value === undefined ? null : stringValue(value);
}
export * from "./authority-bundle.js";
export * from "./delta.js";
export * from "./ingestion.js";
//# sourceMappingURL=index.js.map