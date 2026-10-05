import { readdir, readFile } from "node:fs/promises";
import { basename, join, relative, sep } from "node:path";
import { canonicalJson, compareCanonicalStrings, deriveOperationId, digest, digestFromPathSegment, digestPathSegment, sha256Bytes, } from "provenry/primitives";
import { assetAuthorityBundleCoreSchema, assetAuthorityBundleManifestSchema, entityAssetReviewArtifactCoreSchema, entityAssetReviewArtifactSchema, } from "../../../contracts/assets/src/index.js";
import { catalogEventCoreSchema, catalogEventPayloadSchemas, catalogEventSchema, } from "../../../contracts/events/src/index.js";
import { validateProtectedEvent } from "../../authority/src/index.js";
import { verifyEntityAssetProposal } from "./index.js";
export function createAssetBindingEventIntent(input) {
    const proposal = verifyEntityAssetProposal(input.proposal);
    const core = catalogEventCoreSchema.parse({
        event_contract: "sourcey.catalog-event/v1alpha1",
        kind: "asset.bound",
        issuer_id: input.issuerId,
        operation_id: deriveOperationId("sourcey.asset-binding/v1alpha1", {
            proposal_digest: proposal.proposal_digest,
            issuer_id: input.issuerId,
        }),
        subject: {
            subject_type: "entity",
            entity_id: proposal.entity_id,
        },
        occurred_at: proposal.effective_from,
        payload: {
            role: proposal.role,
            asset_object_digest: proposal.asset.asset_object_digest,
            served_derivative_digest: proposal.served_digest,
            authority_basis: proposal.authority_basis,
            ...(proposal.authority_claim_id ? { authority_claim_id: proposal.authority_claim_id } : {}),
            approval_receipt_digest: proposal.review.review_artifact_digest,
            approval_scope: proposal.approval_scope,
            source_basis: proposal.source_basis,
            license_basis: proposal.asset.redistribution.basis,
            effective_from: proposal.effective_from,
            ...(proposal.expected_current_binding_event_id
                ? { superseded_binding_event_id: proposal.expected_current_binding_event_id }
                : {}),
        },
    });
    return { event_id: digest(core), core };
}
export async function readAssetAuthorityBundle(root) {
    const manifestBytes = await readFile(join(root, "manifest.json"));
    const manifest = assetAuthorityBundleManifestSchema.parse(JSON.parse(manifestBytes.toString("utf8")));
    const { bundle_digest: bundleDigest, ...core } = manifest;
    if (digest(assetAuthorityBundleCoreSchema.parse(core)) !== bundleDigest) {
        throw new Error("Asset authority bundle is not content addressed.");
    }
    const expectedPaths = ["manifest.json", ...Object.keys(manifest.objects)].sort(compareCanonicalStrings);
    const actualPaths = (await filesUnder(root))
        .map((path) => relative(root, path).split(sep).join("/"))
        .sort(compareCanonicalStrings);
    if (canonicalJson(actualPaths) !== canonicalJson(expectedPaths)) {
        throw new Error("Asset authority bundle has an unexpected file set.");
    }
    const objects = new Map();
    for (const [path, declaration] of Object.entries(manifest.objects)) {
        assertSafeRelativePath(path);
        const bytes = await readFile(join(root, path));
        if (bytes.byteLength !== declaration.bytes || sha256Bytes(bytes) !== declaration.sha256) {
            throw new Error(`Asset authority bundle object ${path} differs.`);
        }
        objects.set(path, bytes);
    }
    const proposals = [...objects.entries()]
        .filter(([path]) => path.startsWith("proposals/"))
        .map(([path, bytes]) => {
        const proposal = verifyEntityAssetProposal(JSON.parse(bytes.toString("utf8")));
        if (proposal.proposal_digest !== digestFromPathSegment(basename(path, ".json"))) {
            throw new Error(`Asset proposal ${path} is stored under the wrong address.`);
        }
        return proposal;
    })
        .sort((left, right) => compareCanonicalStrings(left.proposal_digest, right.proposal_digest));
    const events = [...objects.entries()]
        .filter(([path]) => path.startsWith("events/"))
        .map(([path, bytes]) => {
        const event = catalogEventSchema.parse(JSON.parse(bytes.toString("utf8")));
        if (event.event_id !== digestFromPathSegment(basename(path, ".json"))) {
            throw new Error(`Asset event ${path} is stored under the wrong address.`);
        }
        return event;
    })
        .sort((left, right) => compareCanonicalStrings(left.event_id, right.event_id));
    const reviews = [...objects.entries()]
        .filter(([path]) => path.startsWith("reviews/"))
        .map(([path, bytes]) => {
        const review = entityAssetReviewArtifactSchema.parse(JSON.parse(bytes.toString("utf8")));
        const { review_artifact_digest: reviewDigest, ...reviewCore } = review;
        if (digest(entityAssetReviewArtifactCoreSchema.parse(reviewCore)) !== reviewDigest ||
            reviewDigest !== digestFromPathSegment(basename(path, ".json"))) {
            throw new Error(`Asset review ${path} is stored under the wrong address.`);
        }
        return review;
    })
        .sort((left, right) => compareCanonicalStrings(left.review_artifact_digest, right.review_artifact_digest));
    const safeBytes = new Map();
    for (const [path, bytes] of objects) {
        if (!path.startsWith("assets/sha256/"))
            continue;
        const objectDigest = digestFromPathSegment(basename(path));
        if (sha256Bytes(bytes) !== objectDigest) {
            throw new Error(`Safe asset ${path} is stored under the wrong address.`);
        }
        safeBytes.set(objectDigest, bytes);
    }
    if (canonicalJson(proposals.map((proposal) => proposal.proposal_digest)) !==
        canonicalJson(manifest.asset_proposal_digests) ||
        canonicalJson(events.map((event) => event.event_id)) !== canonicalJson(manifest.event_ids)) {
        throw new Error("Asset authority bundle manifest disagrees with its objects.");
    }
    for (const proposal of proposals) {
        const bytes = safeBytes.get(proposal.served_digest);
        const variant = proposal.asset.safe_variants.find((candidate) => candidate.digest === proposal.served_digest);
        if (!bytes || !variant || bytes.byteLength !== variant.bytes) {
            throw new Error(`Asset proposal ${proposal.proposal_digest} lacks its exact safe bytes.`);
        }
        const review = reviews.find((candidate) => candidate.review_artifact_digest === proposal.review.review_artifact_digest);
        if (!review || canonicalJson(review) !== canonicalJson(proposal.review)) {
            throw new Error(`Asset proposal ${proposal.proposal_digest} lacks its exact review artifact.`);
        }
    }
    const referencedSafeDigests = new Set(proposals.map(({ served_digest: servedDigest }) => servedDigest));
    if (safeBytes.size !== referencedSafeDigests.size ||
        [...safeBytes.keys()].some((safeDigest) => !referencedSafeDigests.has(safeDigest))) {
        throw new Error("Asset authority bundle contains a missing or unreferenced safe object.");
    }
    if (reviews.length !== proposals.length ||
        new Set(reviews.map(({ review_artifact_digest: reviewDigest }) => reviewDigest)).size !==
            reviews.length) {
        throw new Error("Asset authority bundle must contain one unique review per proposal.");
    }
    return { manifest, proposals, reviews, events, safeBytes };
}
export function admitAssetAuthorityBundle(input) {
    // The base is immutable review provenance. The activation proposal binds the
    // current Entity and icon snapshots; each retained event must still satisfy
    // its exact signed registry and the target release sequence below.
    if (input.bundle.manifest.target_signer_registry_digest !== input.targetRegistry.registry_digest) {
        throw new Error("Asset authority bundle targets another signer registry.");
    }
    const declared = new Map(input.publicationProposal.candidate_assets.map((proposal) => [
        proposal.proposal_digest,
        proposal,
    ]));
    const undeclared = input.bundle.proposals.filter((proposal) => {
        const match = declared.get(proposal.proposal_digest);
        return match === undefined || canonicalJson(match) !== canonicalJson(proposal);
    });
    if (undeclared.length > 0) {
        throw new Error(`Asset authority bundle carries proposals this publication does not declare: ${undeclared
            .map(({ proposal_digest: proposalDigest }) => proposalDigest)
            .join(", ")}.`);
    }
    const previouslyUsedReviews = new Set(input.existingEvents
        .filter((event) => event.kind === "asset.bound")
        .map((event) => `${event.subject.entity_id}:${catalogEventPayloadSchemas["asset.bound"].parse(event.payload).approval_receipt_digest}`));
    for (const proposal of input.bundle.proposals) {
        if (previouslyUsedReviews.has(`${proposal.entity_id}:${proposal.review.review_artifact_digest}`)) {
            throw new Error(`Asset review ${proposal.review.review_artifact_digest} was already published; rebinding requires a new review.`);
        }
    }
    const expected = new Map(input.bundle.proposals.map((proposal) => {
        const intent = createAssetBindingEventIntent({
            proposal,
            issuerId: input.bundle.manifest.issuer_id,
        });
        return [intent.event_id, intent];
    }));
    if (expected.size !== input.bundle.events.length) {
        throw new Error("Asset authority bundle does not contain one exact event per proposal.");
    }
    for (const inputEvent of input.bundle.events) {
        const event = validateProtectedEvent(inputEvent, input.targetRegistry, input.targetReleaseSequence);
        if (event.protected.signature_purpose !== "catalog-identity") {
            throw new Error("Asset authority event uses the wrong signing purpose.");
        }
        const intent = expected.get(event.event_id);
        if (!intent)
            throw new Error(`Asset authority bundle has unexpected event ${event.event_id}.`);
        const { event_id: _, protected: __, ...eventCore } = event;
        if (canonicalJson(eventCore) !== canonicalJson(intent.core)) {
            throw new Error(`Asset authority event ${event.event_id} differs from its intent.`);
        }
    }
    return {
        authoritySetDigest: input.bundle.manifest.bundle_digest,
        proposals: input.bundle.proposals,
        events: input.bundle.events,
        safeBytes: input.bundle.safeBytes,
    };
}
/**
 * The converse of one bundle's own check, asserted where every admitted bundle
 * is visible: each declared asset has signed binding authority. Distinct
 * materializations may carry the same exact proposal; each is independently
 * admitted before the release owner composes their byte-identical events.
 */
export function assertAssetAuthorityCoverage(input) {
    const carried = input.admitted.flatMap((authority) => authority.proposals.map(({ proposal_digest: proposalDigest }) => proposalDigest));
    const carriedOnce = new Set(carried);
    const uncarried = input.declared
        .map(({ proposal_digest: proposalDigest }) => proposalDigest)
        .filter((proposalDigest) => !carriedOnce.has(proposalDigest));
    if (uncarried.length > 0) {
        throw new Error(`Publication asset proposals lack an admitted authority bundle: ${uncarried.join(", ")}.`);
    }
}
export function assetAuthorityObjectPaths(input) {
    return [
        ...input.proposals.map((proposal) => `proposals/${digestPathSegment(proposal.proposal_digest)}.json`),
        ...input.proposals.map((proposal) => `reviews/${digestPathSegment(proposal.review.review_artifact_digest)}.json`),
        ...input.events.map((event) => `events/${digestPathSegment(event.event_id)}.json`),
        ...input.proposals.map((proposal) => `assets/sha256/${digestPathSegment(proposal.served_digest)}`),
    ].sort(compareCanonicalStrings);
}
function assertSafeRelativePath(path) {
    const segments = path.split("/");
    if (!path ||
        path.startsWith("/") ||
        path.includes("\\") ||
        segments.some((segment) => !segment || segment === "." || segment === "..")) {
        throw new Error(`Asset authority bundle has unsafe object path ${path}.`);
    }
}
async function filesUnder(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    return (await Promise.all(entries.map((entry) => {
        const path = join(directory, entry.name);
        if (entry.isSymbolicLink()) {
            throw new Error(`Asset authority bundle contains a symlink: ${path}.`);
        }
        return entry.isDirectory() ? filesUnder(path) : [path];
    }))).flat();
}
//# sourceMappingURL=authority-bundle.js.map