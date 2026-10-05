import { canonicalJson, digest, sha256Bytes } from "provenry/primitives";
import { sourceyCaptureMethodRegistry } from "../../../contracts/capture/src/methods.js";
import { catalogRevisionContracts, entityRevisionSchema, } from "../../../contracts/revisions/src/index.js";
import { deriveSourceStanding, evidenceNormalizerForToolchainDigest, normalizeEvidenceCapture, verifyEvidenceAssertions, } from "./submission-verifier.js";
/**
 * Verifies the complete public evidence graph from immutable local bytes.
 * Callers supply already-materialized objects; this kernel performs no I/O.
 * Normalized bytes are proven by reproducing them from their capture.
 */
export function verifyEvidenceObjectGraph(input) {
    const revisions = new Map(input.revisions.map((revision) => [revision.revision_digest, revision]));
    const observations = new Map(input.observations.map((observation) => [observation.observation_id, observation]));
    const captureReceipts = new Map();
    const captureReceiptOperations = new Set();
    for (const receipt of input.captureReceipts) {
        const { receipt_digest: receiptDigest, protected: _, ...core } = receipt;
        if (digest(core) !== receiptDigest ||
            captureReceipts.has(receiptDigest) ||
            captureReceiptOperations.has(receipt.operation_id)) {
            throw new Error(`Capture receipt ${receiptDigest} is not uniquely content-addressed.`);
        }
        captureReceipts.set(receiptDigest, receipt);
        captureReceiptOperations.add(receipt.operation_id);
    }
    const usedCaptureReceipts = new Set();
    for (const observation of input.observations) {
        const capture = observation.capture;
        if (capture?.availability !== "public")
            continue;
        const captureBytes = input.captures.get(capture.digest);
        if (!captureBytes ||
            captureBytes.byteLength !== capture.bytes ||
            (!input.capturesProven && sha256Bytes(captureBytes) !== capture.digest)) {
            throw new Error(`Observation ${observation.observation_id} lacks its public capture bytes.`);
        }
        if (!capture.normalized_object) {
            throw new Error(`Observation ${observation.observation_id} lacks its normalized evidence declaration.`);
        }
        const normalizedBytes = input.normalizedObjects.get(capture.normalized_object.digest);
        if (!normalizedBytes || normalizedBytes.byteLength !== capture.normalized_object.bytes) {
            throw new Error(`Observation ${observation.observation_id} lacks its normalized evidence bytes.`);
        }
        const normalizer = evidenceNormalizerForToolchainDigest(capture.normalized_object.toolchain_digest);
        if (capture.normalized_object.normalizer_contract !== normalizer.normalizer_contract ||
            capture.normalized_object.normalizer_id !== normalizer.normalizer_id ||
            capture.normalized_object.version !== normalizer.version) {
            throw new Error(`Observation ${observation.observation_id} uses an unsupported evidence normalizer.`);
        }
        const reproduced = normalizeEvidenceCapture({
            bytes: captureBytes,
            mediaType: capture.media_type,
            normalizerToolchainDigest: normalizer.toolchain_digest,
        });
        if (reproduced.digest !== capture.normalized_object.digest ||
            !bytesEqual(reproduced.bytes, normalizedBytes)) {
            throw new Error(`Observation ${observation.observation_id} does not reproduce its normalized evidence.`);
        }
    }
    for (const event of input.events) {
        if (event.kind !== "evidence.bound")
            continue;
        const revisionDigest = event.subject.revision_digest;
        const revision = revisionDigest ? revisions.get(revisionDigest) : undefined;
        if (!revision)
            throw new Error(`Evidence event ${event.event_id} lacks its exact revision.`);
        if (revision.revision_contract === "sourcey.agent-readiness-declaration-revision/v1alpha1") {
            throw new Error(`Evidence event ${event.event_id} cannot target a declaration revision.`);
        }
        const payload = event.payload;
        const observationId = requiredString(payload.observation_id, "observation_id");
        const observation = observations.get(observationId);
        if (!observation?.capture) {
            throw new Error(`Evidence event ${event.event_id} lacks captured observation bytes.`);
        }
        if (!Array.isArray(payload.assertions)) {
            throw new Error(`Evidence event ${event.event_id} lacks exact proof assertions.`);
        }
        if (!observation.capture.normalized_object) {
            throw new Error(`Evidence event ${event.event_id} lacks a normalized evidence declaration.`);
        }
        const normalizedDigest = requiredString(payload.normalized_object_digest, "normalized_object_digest");
        if (observation.capture.normalized_object.digest !== normalizedDigest) {
            throw new Error(`Evidence event ${event.event_id} names the wrong normalized object.`);
        }
        const normalizedBytes = input.normalizedObjects.get(normalizedDigest);
        if (!normalizedBytes) {
            throw new Error(`Evidence event ${event.event_id} normalized bytes are unavailable.`);
        }
        verifyEvidenceAssertions({
            assertions: payload.assertions,
            normalizedBytes,
            revision,
        });
        const authorityRevisionDigest = requiredString(payload.authority_entity_revision_digest, "authority_entity_revision_digest");
        const authorityEntityRevision = revisions.get(authorityRevisionDigest);
        if (authorityEntityRevision?.revision_contract !== catalogRevisionContracts.entity ||
            authorityEntityRevision.entity_id !== revision.entity_id) {
            throw new Error(`Evidence event ${event.event_id} lacks its authority entity revision.`);
        }
        const authorityProgramRevisionDigest = payload.authority_program_revision_digest;
        if (revision.revision_contract === catalogRevisionContracts.offer &&
            revision.program_id !== undefined) {
            const programDigest = requiredString(authorityProgramRevisionDigest, "authority_program_revision_digest");
            const authorityProgramRevision = revisions.get(programDigest);
            if (authorityProgramRevision?.revision_contract !== catalogRevisionContracts.program ||
                authorityProgramRevision.entity_id !== revision.entity_id ||
                authorityProgramRevision.program_id !== revision.program_id) {
                throw new Error(`Evidence event ${event.event_id} lacks its authority Program revision.`);
            }
        }
        else if (authorityProgramRevisionDigest !== null) {
            throw new Error(`Evidence event ${event.event_id} has an extraneous Program authority.`);
        }
        if (observation.method.name === "fixture") {
            if (!input.allowFixtureEvidence ||
                observation.capture.source_standing !== "live-first-party" ||
                !new URL(observation.source_uri).hostname.endsWith(".example")) {
                throw new Error(`Fixture evidence ${event.event_id} is not allowed.`);
            }
            continue;
        }
        const captureReceiptDigest = requiredString(payload.capture_receipt_digest, "capture_receipt_digest");
        const captureReceipt = captureReceipts.get(captureReceiptDigest);
        if (!captureReceipt) {
            throw new Error(`Evidence event ${event.event_id} lacks its capture receipt.`);
        }
        usedCaptureReceipts.add(captureReceiptDigest);
        if (canonicalJson(captureReceipt.subject) !== canonicalJson(event.subject) ||
            captureReceipt.authority_entity_revision_digest !== authorityRevisionDigest ||
            captureReceipt.authority_program_revision_digest !== authorityProgramRevisionDigest ||
            captureReceipt.issued_at > event.occurred_at) {
            throw new Error(`Evidence event ${event.event_id} disagrees with its capture receipt.`);
        }
        if (!observation.capture.requested_uri ||
            !observation.capture.final_uri ||
            !observation.capture.redirect_chain ||
            !observation.capture.source_standing) {
            throw new Error(`Evidence event ${event.event_id} has incomplete capture provenance.`);
        }
        const method = observation.method.name;
        sourceyCaptureMethodRegistry.require(method, observation.method.version);
        const sourceStanding = deriveSourceStanding({
            subject_source_url: observation.source_uri,
            final_url: observation.capture.final_uri,
            retrieved_at: observation.retrieved_at,
            method: method,
        }, {
            content: {
                domains: entityRevisionSchema.shape.content.shape.domains.parse(authorityEntityRevision.content?.domains),
            },
        });
        if (sourceStanding !== observation.capture.source_standing) {
            throw new Error(`Evidence event ${event.event_id} has incorrect source standing.`);
        }
        const receiptCapture = captureReceipt.capture;
        if (receiptCapture.subject_source_url !== observation.source_uri ||
            receiptCapture.requested_url !== observation.capture.requested_uri ||
            receiptCapture.final_url !== observation.capture.final_uri ||
            canonicalJson(receiptCapture.redirect_chain) !==
                canonicalJson(observation.capture.redirect_chain) ||
            receiptCapture.retrieved_at !== observation.retrieved_at ||
            receiptCapture.method !== observation.method.name ||
            receiptCapture.media_type !== observation.capture.media_type ||
            receiptCapture.digest !== observation.capture.digest ||
            receiptCapture.bytes !== observation.capture.bytes ||
            receiptCapture.availability !==
                (observation.capture.availability === "public" ? "public" : "restricted")) {
            throw new Error(`Evidence event ${event.event_id} capture receipt binds different bytes.`);
        }
    }
    for (const receipt of input.captureReceipts) {
        if (!usedCaptureReceipts.has(receipt.receipt_digest)) {
            throw new Error(`Capture receipt ${receipt.receipt_digest} is not bound by an evidence event.`);
        }
    }
}
function requiredString(value, name) {
    if (typeof value !== "string")
        throw new Error(`Evidence proof ${name} is not a string.`);
    return value;
}
function bytesEqual(left, right) {
    return (left.byteLength === right.byteLength && left.every((value, index) => value === right[index]));
}
//# sourceMappingURL=proof-graph.js.map