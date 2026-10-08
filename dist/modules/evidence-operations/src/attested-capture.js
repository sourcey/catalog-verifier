import { attestCaptureAttempt, captureAttemptAttestationSchema, captureAttemptReceiptTrust, verifyAttestedCaptures, } from "provenry/capture/attestation";
import { verifyCaptureAttemptSettlement, verifyCaptureAttemptStart, } from "provenry/capture/start";
import { canonicalJson, compareCanonicalStrings, digest, digestFromPathSegment, prettyJson, } from "provenry/primitives";
import { sourceyCaptureMethodRegistryDirectory } from "../../../contracts/capture/src/methods.js";
import { releaseCaptureAttemptObjectPath, releaseCaptureAttestationObjectPath, releaseCaptureStartObjectPath, } from "../../../contracts/release/src/index.js";
import { signerRegistryReceiptKeys } from "../../authority/src/index.js";
const CAPTURE_RECORD_FOLDERS = ["capture-starts/", "capture-attempts/", "capture-attestations/"];
/**
 * The release files that carry attested captures: each start, attempt and
 * attestation once, addressed by its own digest. The one definition of their
 * layout, for every writer and every reader.
 */
export function releasedCaptureRecordFiles(captures) {
    const files = new Map();
    for (const { start, attempt, attestation } of captures) {
        files.set(releaseCaptureStartObjectPath(start.start_digest), Buffer.from(prettyJson(start)));
        files.set(releaseCaptureAttemptObjectPath(attempt.attempt_digest), Buffer.from(prettyJson(attempt)));
        files.set(releaseCaptureAttestationObjectPath(attestation.attestation_digest), Buffer.from(prettyJson(attestation)));
    }
    return files;
}
/** Where an attestation is first included: its provenance witness. */
export function captureAttestationInclusion(captured, firstInclusionSequence) {
    const { attestation } = captured;
    return {
        attestation_digest: attestation.attestation_digest,
        attestation_object_digest: digest(attestation),
        start_digest: attestation.start_digest,
        attempt_digest: attestation.attempt_digest,
        signer_registry_digest: attestation.protected.signer_registry_digest,
        first_inclusion_sequence: firstInclusionSequence,
    };
}
/** Whether a release file is a capture start, attempt or attestation. */
export function isReleasedCaptureRecordPath(path) {
    return CAPTURE_RECORD_FOLDERS.some((folder) => path.startsWith(folder));
}
/**
 * The attested captures a release's capture records hold. Every record is
 * addressed by its own digest and every attestation is the exact object its
 * provenance witness names; the witnesses name exactly the attestations held.
 * An attestation the release first includes is proved, joined to its start and
 * attempt, by its registry at this sequence. One an earlier release first
 * included is carried: that release proved it, so here its witness must name a
 * registry the trust history holds and its start and attempt must be present,
 * and nothing is proved again. A witness claiming a later inclusion is refused.
 */
export async function verifyReleasedCaptureRecords(input) {
    const starts = new Map();
    const attempts = new Map();
    const included = [];
    const carried = [];
    for (const [path, bytes] of input.files) {
        if (!isReleasedCaptureRecordPath(path))
            continue;
        const value = JSON.parse(Buffer.from(bytes).toString("utf8"));
        const address = digestFromPathSegment(path.slice(path.indexOf("/") + 1, -".json".length));
        if (path.startsWith("capture-starts/")) {
            if (!addressedBy(value, "start_digest", address)) {
                throw new Error(`Capture start ${path} is misaddressed.`);
            }
            starts.set(address, value);
        }
        else if (path.startsWith("capture-attempts/")) {
            if (!addressedBy(value, "attempt_digest", address)) {
                throw new Error(`Capture attempt ${path} is misaddressed.`);
            }
            attempts.set(address, value);
        }
        else {
            const attestation = captureAttemptAttestationSchema.parse(value);
            const inclusion = input.inclusions[address];
            if (attestation.attestation_digest !== address ||
                !inclusion ||
                digest(attestation) !== inclusion.attestation_object_digest ||
                attestation.start_digest !== inclusion.start_digest ||
                attestation.attempt_digest !== inclusion.attempt_digest ||
                attestation.protected.signer_registry_digest !== inclusion.signer_registry_digest) {
                throw new Error(`Capture attestation ${path} is not its witnessed inclusion.`);
            }
            if (!input.registryFor(inclusion.signer_registry_digest)) {
                throw new Error(`Capture attestation ${address} names a registry outside the trusted history.`);
            }
            if (inclusion.first_inclusion_sequence > input.releaseSequence) {
                throw new Error(`Capture attestation ${address} claims a later first inclusion.`);
            }
            (inclusion.first_inclusion_sequence === input.releaseSequence ? included : carried).push(attestation);
        }
    }
    const witnessed = Object.keys(input.inclusions).sort(compareCanonicalStrings);
    const held = [...included, ...carried]
        .map(({ attestation_digest: attestationDigest }) => attestationDigest)
        .sort(compareCanonicalStrings);
    if (JSON.stringify(held) !== JSON.stringify(witnessed)) {
        throw new Error("Capture attestations and their provenance witnesses disagree.");
    }
    const cited = (attestations) => ({
        starts: new Set(attestations.map(({ start_digest: startDigest }) => startDigest)),
        attempts: new Set(attestations.map(({ attempt_digest: attemptDigest }) => attemptDigest)),
    });
    const proving = cited(included);
    const carrying = cited(carried);
    for (const address of starts.keys()) {
        if (!proving.starts.has(address) && !carrying.starts.has(address)) {
            throw new Error(`Capture start ${address} is not attested.`);
        }
    }
    for (const address of attempts.keys()) {
        if (!proving.attempts.has(address) && !carrying.attempts.has(address)) {
            throw new Error(`Capture attempt ${address} is not attested.`);
        }
    }
    const proved = await verifyReleasedAttestedCaptures({
        starts: [...starts].flatMap(([address, start]) => (proving.starts.has(address) ? [start] : [])),
        attempts: [...attempts].flatMap(([address, attempt]) => proving.attempts.has(address) ? [attempt] : []),
        attestations: included,
        judgedBy: (attestation) => {
            const registry = input.registryFor(attestation.protected.signer_registry_digest);
            if (!registry) {
                throw new Error(`Capture attestation ${attestation.attestation_digest} lacks its registry.`);
            }
            return { registry, sequence: input.releaseSequence };
        },
    });
    const captures = new Map(proved);
    for (const attestation of carried) {
        const start = starts.get(attestation.start_digest);
        const attempt = attempts.get(attestation.attempt_digest);
        if (!start || !attempt) {
            throw new Error(`Carried capture attestation ${attestation.attestation_digest} lacks its start or attempt.`);
        }
        captures.set(attestation.attestation_digest, { start, attempt, attestation });
    }
    return captures;
}
/** A capture start or attempt is addressed by the digest of everything but its address. */
function addressedBy(value, field, address) {
    const { [field]: declared, ...core } = value;
    return declared === address && digest(core) === address;
}
/** Attested captures by attestation digest; one digest names exactly one object. */
export function mergeAttestedCaptures(left, right) {
    const merged = new Map(left);
    for (const [attestationDigest, captured] of right) {
        const prior = merged.get(attestationDigest);
        if (prior && digest(prior.attestation) !== digest(captured.attestation)) {
            throw new Error(`Capture attestation ${attestationDigest} has conflicting bytes.`);
        }
        merged.set(attestationDigest, prior ?? captured);
    }
    return merged;
}
/** The attestation digests a release carries, sorted, as its input set names them. */
export function attestedCaptureDigests(captures) {
    return [...captures.keys()].sort(compareCanonicalStrings);
}
/** The trust Catalog's signer registry gives capture attestations at one release sequence. */
export function catalogCaptureTrust(registry, sequence) {
    return captureAttemptReceiptTrust(signerRegistryReceiptKeys(registry), {
        registryDigest: registry.registry_digest,
        sequence,
    });
}
/**
 * Attest one journaled capture for the release being built, judged by its
 * registry at its sequence. A caller signing at a fixed time, such as the
 * materialization time, signs the same attestation on every re-run.
 */
export async function attestCatalogCapture(input) {
    // The exact records, re-sealed, so nothing but their own fields is ever released.
    const methods = sourceyCaptureMethodRegistryDirectory.resolve(input.start.method_registry_digest);
    const start = verifyCaptureAttemptStart(methods, input.start);
    const attempt = verifyCaptureAttemptSettlement(methods, start, input.attempt);
    const attestation = await attestCaptureAttempt({
        registries: sourceyCaptureMethodRegistryDirectory,
        start,
        result: attempt,
        signedAt: input.signedAt,
        signer: input.signer,
        trust: catalogCaptureTrust(input.registry, input.sequence),
    });
    return { start, attempt, attestation };
}
/**
 * The attested captures a set of released records proves, by attestation
 * digest. Each attestation is judged by the signer registry and release
 * sequence its caller names: where it was first included, or the release
 * being built.
 */
export function verifyReleasedAttestedCaptures(input) {
    return verifyAttestedCaptures({
        registries: sourceyCaptureMethodRegistryDirectory,
        starts: input.starts,
        attempts: input.attempts,
        attestations: input.attestations,
        trustFor: (attestation) => {
            const { registry, sequence } = input.judgedBy(attestation);
            return catalogCaptureTrust(registry, sequence);
        },
    });
}
/**
 * An attested capture is exactly the capture an observation states: the
 * source it was reserved for, what the fetch returned, when, and by which
 * method. Materialization asserts it before an event cites the attestation,
 * and every verifier asserts it again from the released records.
 */
export function assertAttestedObservationCapture(observation, captured) {
    const { start, attempt } = captured;
    const capture = observation.capture;
    if (attempt.outcome !== "captured" || !capture) {
        throw new Error(`Observation ${observation.observation_id} does not rest on a captured attempt.`);
    }
    if (observation.source_uri !== start.source_url ||
        observation.retrieved_at !== attempt.checked_at ||
        observation.method.name !== attempt.method.name ||
        observation.method.version !== attempt.method.version ||
        capture.requested_uri !== attempt.requested_url ||
        capture.final_uri !== attempt.final_url ||
        canonicalJson(capture.redirect_chain ?? []) !== canonicalJson(attempt.redirect_chain) ||
        capture.media_type !== attempt.media_type ||
        capture.digest !== attempt.content_digest ||
        capture.bytes !== attempt.content_bytes) {
        throw new Error(`Observation ${observation.observation_id} is not the capture its attestation proves.`);
    }
}
//# sourceMappingURL=attested-capture.js.map