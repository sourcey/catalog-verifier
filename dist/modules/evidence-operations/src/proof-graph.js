import { compareInstants, digest, sha256Bytes } from "provenry/primitives";
import { sourceyCaptureMethodRegistry } from "../../../contracts/capture/src/methods.js";
import { evidenceReviewDecisionCoreSchema, evidenceReviewDecisionSchema, } from "../../../contracts/evidence/src/index.js";
import { catalogRevisionContracts, entityRevisionSchema, } from "../../../contracts/revisions/src/index.js";
import { assertAttestedObservationCapture } from "./attested-capture.js";
import { EVIDENCE_NORMALIZER } from "./evidence-normalization.js";
import { currentListingRevision } from "./retained-revision.js";
import { deriveSourceStanding, normalizeEvidenceCapture, verifyEvidenceAssertions, } from "./submission-verifier.js";
/**
 * Verifies the public evidence graph a release holds, from immutable local
 * bytes; this kernel performs no I/O. Evidence the release first includes is
 * proved: its normalized bytes reproduce from its capture with the current
 * profile, its assertions locate in them, and its capture is the one a Provenry
 * attestation the caller has verified (`verifyAttestedCaptures`) proves.
 * Evidence an earlier release first included is carried: that release proved
 * it, so here only its citations must resolve (lean-release-chain §3.1).
 */
export function verifyEvidenceObjectGraph(input) {
    const revisions = new Map(input.revisions.map((revision) => [revision.revision_digest, revision]));
    const observations = new Map(input.observations.map((observation) => [observation.observation_id, observation]));
    const carriedEventIds = input.carriedEventIds ?? new Set();
    const usedAttestations = new Set();
    // Carried evidence resolves its citations; nothing it rests on is proved again.
    const carriedObservationIds = new Set();
    for (const event of input.events) {
        if (event.kind !== "evidence.bound" || !carriedEventIds.has(event.event_id))
            continue;
        const payload = event.payload;
        for (const revisionDigest of [
            event.subject.revision_digest,
            payload.authority_entity_revision_digest,
            payload.authority_program_revision_digest,
        ]) {
            if (typeof revisionDigest === "string" && !revisions.has(revisionDigest)) {
                throw new Error(`Carried evidence event ${event.event_id} lacks its revision ${revisionDigest}.`);
            }
        }
        const observationId = requiredString(payload.observation_id, "observation_id");
        const observation = observations.get(observationId);
        if (!observation) {
            throw new Error(`Carried evidence event ${event.event_id} lacks its observation.`);
        }
        if (payload.normalized_object_digest !== undefined &&
            payload.normalized_object_digest !== observation.capture?.normalized_object?.digest) {
            throw new Error(`Carried evidence event ${event.event_id} names the wrong normalized object.`);
        }
        carriedObservationIds.add(observationId);
        if (payload.capture_attestation_digest !== undefined) {
            const attestationDigest = requiredString(payload.capture_attestation_digest, "capture_attestation_digest");
            if (!input.attestedCaptures.has(attestationDigest)) {
                throw new Error(`Carried evidence event ${event.event_id} lacks its capture attestation.`);
            }
            usedAttestations.add(attestationDigest);
        }
    }
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
        if (!normalizedBytes ||
            normalizedBytes.byteLength !== capture.normalized_object.bytes ||
            (!input.capturesProven && sha256Bytes(normalizedBytes) !== capture.normalized_object.digest)) {
            throw new Error(`Observation ${observation.observation_id} lacks its normalized evidence bytes.`);
        }
        // The release that first included carried evidence normalized it.
        if (carriedObservationIds.has(observation.observation_id))
            continue;
        if (capture.normalized_object.normalizer_contract !== EVIDENCE_NORMALIZER.normalizer_contract ||
            capture.normalized_object.normalizer_id !== EVIDENCE_NORMALIZER.normalizer_id ||
            capture.normalized_object.version !== EVIDENCE_NORMALIZER.version ||
            capture.normalized_object.toolchain_digest !== EVIDENCE_NORMALIZER.toolchain_digest) {
            throw new Error(`Observation ${observation.observation_id} is not normalized with the current profile.`);
        }
        const reproduced = normalizeEvidenceCapture({
            bytes: captureBytes,
            mediaType: capture.media_type,
        });
        if (reproduced.digest !== capture.normalized_object.digest ||
            !bytesEqual(reproduced.bytes, normalizedBytes)) {
            throw new Error(`Observation ${observation.observation_id} does not reproduce its normalized evidence.`);
        }
    }
    for (const event of input.events) {
        if (event.kind !== "evidence.bound" || carriedEventIds.has(event.event_id))
            continue;
        const revisionDigest = event.subject.revision_digest;
        const retained = revisionDigest ? revisions.get(revisionDigest) : undefined;
        if (!retained)
            throw new Error(`Evidence event ${event.event_id} lacks its exact revision.`);
        const revision = currentListingRevision(retained);
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
        const attestationDigest = requiredString(payload.capture_attestation_digest, "capture_attestation_digest");
        const captured = input.attestedCaptures.get(attestationDigest);
        if (!captured) {
            throw new Error(`Evidence event ${event.event_id} lacks its capture attestation.`);
        }
        usedAttestations.add(attestationDigest);
        const decision = evidenceReviewDecisionSchema.parse(payload.review_decision);
        const { decision_digest: decisionDigest, ...decisionCore } = decision;
        if (digest(evidenceReviewDecisionCoreSchema.parse(decisionCore)) !== decisionDigest ||
            decision.decision !== "approved" ||
            compareInstants(decision.decided_at, event.occurred_at) > 0) {
            throw new Error(`Evidence event ${event.event_id} lacks its exact approved review.`);
        }
        if (observation.capture.availability !== "public" ||
            compareInstants(captured.attestation.signed_at, event.occurred_at) > 0) {
            throw new Error(`Evidence event ${event.event_id} disagrees with its capture attestation.`);
        }
        assertAttestedObservationCapture(observation, captured);
    }
    for (const attestationDigest of input.attestedCaptures.keys()) {
        if (!usedAttestations.has(attestationDigest)) {
            throw new Error(`Capture attestation ${attestationDigest} is not bound by an evidence event.`);
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