import { compareCanonicalStrings, digest, digestPathSegment, prettyJson, sha256Bytes, } from "provenry/primitives";
import { evidenceAuthorityBundleCoreSchema, evidenceAuthorityBundleManifestSchema, evidenceReviewDecisionSchema, } from "../../../contracts/evidence/src/index.js";
import { entityRevisionSchema, programRevisionSchema, } from "../../../contracts/revisions/src/index.js";
import { validateProtectedEvent } from "../../authority/src/index.js";
import { releasedCaptureRecordFiles, verifyReleasedAttestedCaptures } from "./attested-capture.js";
import { capturePolicyDefinitionSchema } from "./configuration.js";
import { createEvidenceCatalogProposal, evidenceCatalogProposalRevisionDigests, validateEvidenceCatalogProposal, } from "./evidence-authority.js";
import { parseEvidenceRevision } from "./evidence-revision.js";
import { evidenceReviewProposalSchema } from "./submission-verifier.js";
/**
 * Turn one reviewed evidence proposal into a signed immutable authority bundle.
 * Hosts provide exact Catalog context, the attested capture the review read and
 * the evidence event signer; the semantic materialization remains owned by
 * Catalog and shared by CLI and production.
 */
export async function createEvidenceAuthorityBundleFromProjection(input) {
    const { context } = input;
    const reviewProposal = evidenceReviewProposalSchema.parse(input.reviewProposal);
    const reviewDecision = evidenceReviewDecisionSchema.parse(input.reviewDecision);
    const capturePolicy = capturePolicyDefinitionSchema.parse(input.capturePolicy);
    if (digest(capturePolicy) !== reviewProposal.capture_policy_digest) {
        throw new Error("Capture policy bytes do not match the reviewed policy digest.");
    }
    const revision = parseEvidenceRevision(input.revision);
    const authorityRevision = entityRevisionSchema.parse(input.authorityEntityRevision);
    const authorityProgramRevision = programRevisionSchema
        .nullable()
        .parse(input.authorityProgramRevision);
    const proved = await verifyReleasedAttestedCaptures({
        starts: [input.attestedCapture.start],
        attempts: [input.attestedCapture.attempt],
        attestations: [input.attestedCapture.attestation],
        judgedBy: () => ({ registry: context.targetRegistry, sequence: context.targetSequence }),
    });
    const attestedCapture = proved.get(input.attestedCapture.attestation.attestation_digest);
    if (!attestedCapture)
        throw new Error("The reviewed capture's attestation is not proved.");
    const proposal = createEvidenceCatalogProposal({
        reviewProposal,
        reviewDecision,
        attestedCapture,
        captureBytes: input.captureBytes,
        normalizedBytes: input.normalizedBytes,
        revision,
        authorityEntityRevision: authorityRevision,
        authorityProgramRevision,
        materializedAt: input.materializedAt,
        policy: context.policy,
    });
    validateEvidenceCatalogProposal({
        proposal,
        attestedCapture,
        captureBytes: input.captureBytes,
        normalizedBytes: input.normalizedBytes,
        catalog: context.catalog,
        prospectiveRevisionDigests: context.prospectiveRevisionDigests,
        policy: context.policy,
    });
    const existingEvents = new Map(context.catalog.existingEvents.map((event) => [event.event_id, event]));
    const events = await Promise.all(proposal.event_intents.map(async (intent) => {
        const existing = existingEvents.get(intent.event_id);
        if (existing)
            return existing;
        const signed = await context.evidenceEventSigner.signCatalogEvent({
            purpose: "catalog-evidence",
            core: intent.core,
            eventId: intent.event_id,
            signerRegistryDigest: context.registryDigest,
        });
        return {
            ...intent.core,
            event_id: intent.event_id,
            protected: signed.protected,
        };
    }));
    for (const event of events) {
        validateProtectedEvent(event, context.targetRegistry, context.targetSequence);
    }
    if (events.some((event) => event.protected.key_id === attestedCapture.attestation.protected.key_id)) {
        throw new Error("Capture attestations and evidence events require distinct signing keys.");
    }
    const existingObservations = new Map(context.catalog.existingObservations.map((observation) => [
        observation.observation_id,
        observation,
    ]));
    const observations = proposal.observations.map((observation) => existingObservations.get(observation.observation_id) ?? observation);
    const files = authorityBundleFiles({
        proposal,
        attestedCapture,
        observations,
        events,
        captureBytes: input.captureBytes,
        normalizedBytes: input.normalizedBytes,
        capturePolicy,
        revision,
        authorityRevision,
        authorityProgramRevision,
        targetSequence: context.targetSequence,
    });
    const manifest = evidenceAuthorityBundleManifestSchema.parse(JSON.parse((files.get("manifest.json") ?? Buffer.alloc(0)).toString("utf8")));
    return {
        proposalDigest: proposal.proposal_digest,
        bundleDigest: manifest.bundle_digest,
        manifest,
        files,
    };
}
function authorityBundleFiles(input) {
    const files = new Map();
    files.set("authority/proposal.json", Buffer.from(prettyJson(input.proposal)));
    files.set("authority/review-decision.json", Buffer.from(prettyJson(input.proposal.review_decision)));
    files.set("authority/capture-policy.json", Buffer.from(prettyJson(input.capturePolicy)));
    files.set(`captures/${digestPathSegment(input.proposal.review_proposal.submission.capture.digest)}`, Buffer.from(input.captureBytes));
    files.set(`evidence/normalized/${digestPathSegment(input.proposal.review_proposal.submission.normalization.object_digest)}`, Buffer.from(input.normalizedBytes));
    for (const [path, bytes] of releasedCaptureRecordFiles([input.attestedCapture])) {
        files.set(path, bytes);
    }
    const revisions = uniqueRevisions([
        input.revision,
        input.authorityRevision,
        ...(input.authorityProgramRevision ? [input.authorityProgramRevision] : []),
    ]);
    for (const revision of revisions) {
        files.set(`revisions/${digestPathSegment(revision.revision_digest)}.json`, Buffer.from(prettyJson(revision)));
    }
    for (const observation of input.observations) {
        files.set(`observations/${digestPathSegment(observation.observation_id)}.json`, Buffer.from(prettyJson(observation)));
    }
    for (const event of input.events) {
        files.set(`events/${digestPathSegment(event.event_id)}.json`, Buffer.from(prettyJson(event)));
    }
    const objects = declarations(files);
    const core = evidenceAuthorityBundleCoreSchema.parse({
        bundle_contract: "sourcey.evidence-authority-bundle/v1alpha1",
        proposal_digest: input.proposal.proposal_digest,
        review_decision_digest: input.proposal.review_decision.decision_digest,
        base_release_id: input.proposal.review_proposal.base_release_id,
        capture_attestation_digest: input.attestedCapture.attestation.attestation_digest,
        revision_digests: evidenceCatalogProposalRevisionDigests(input.proposal),
        observation_ids: input.observations
            .map((observation) => observation.observation_id)
            .sort(compareCanonicalStrings),
        event_ids: input.events.map((event) => event.event_id).sort(compareCanonicalStrings),
        release_inclusion: "pending",
        objects,
    });
    files.set("manifest.json", Buffer.from(prettyJson(evidenceAuthorityBundleManifestSchema.parse({
        ...core,
        bundle_digest: digest(core),
    }))));
    return files;
}
function declarations(files) {
    return Object.fromEntries([...files.entries()]
        .sort(([left], [right]) => compareCanonicalStrings(left, right))
        .map(([path, bytes]) => [path, { sha256: sha256Bytes(bytes), bytes: bytes.byteLength }]));
}
function uniqueRevisions(revisions) {
    return [...new Map(revisions.map((revision) => [revision.revision_digest, revision])).values()];
}
//# sourceMappingURL=evidence-authority-materialization.js.map