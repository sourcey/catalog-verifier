import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { agentReadinessDeclarationRevisionSchema, agentReadinessRevisionSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { catalogEventSchema } from "../../../contracts/events/src/index.js";
import { captureReceiptSchema, evidenceAuthorityBundleCoreSchema, evidenceAuthorityBundleManifestSchema, evidenceAuthoritySetCoreSchema, evidenceAuthoritySetManifestSchema, evidenceReviewDecisionSchema, } from "../../../contracts/evidence/src/index.js";
import { observationSchema } from "../../../contracts/observations/src/index.js";
import { RELEASE_RESOURCES, releaseResourceDigest } from "../../../contracts/release/src/index.js";
import { entityRevisionSchema, offerRevisionSchema, programRevisionSchema, } from "../../../contracts/revisions/src/index.js";
import { compileAgentReadinessRevision } from "../../agent-readiness-policy/src/revision.js";
import { validateProtectedCaptureReceipt, validateProtectedEvent, } from "../../authority/src/index.js";
import { capturePolicyDefinitionSchema } from "../../evidence-operations/src/configuration.js";
import { evidenceCatalogProposalSchema, validateEvidenceCatalogProposal, } from "../../evidence-operations/src/evidence-authority.js";
import { verifyEvidenceObjectGraph } from "../../evidence-operations/src/proof-graph.js";
import { canonicalJson, compareCanonicalStrings, digest, digestPathSegment, sha256Bytes, } from "../../primitives/src/index.js";
import { assertOnlyObjectPaths, assertSafeObjectPath, filesUnder, verifyBundleTree, } from "./evidence-bundle-tree.js";
export async function loadEvidenceAuthorityProposals(input) {
    const proposals = new Map();
    for (const root of [...input.roots].sort(compareCanonicalStrings)) {
        const authoritySet = await loadAuthoritySetReaders({
            root,
            targetRegistry: input.targetRegistry,
        });
        const readers = authoritySet ? authoritySet.readers : await loadDirectoryBundleReaders(root);
        for (const reader of readers) {
            const { proposal } = await readEvidenceAuthorityProposal(reader);
            const existing = proposals.get(proposal.proposal_digest);
            if (existing && canonicalJson(existing) !== canonicalJson(proposal)) {
                throw new Error(`Evidence proposal ${proposal.proposal_digest} has conflicting bytes.`);
            }
            proposals.set(proposal.proposal_digest, proposal);
        }
    }
    return [...proposals.values()].sort((left, right) => compareCanonicalStrings(left.proposal_digest, right.proposal_digest));
}
export function createEvidenceAdmissionBase(parent) {
    if (!parent) {
        throw new Error("Evidence authority bundles require an exact verified parent release.");
    }
    const currentRevisionDigests = new Set(parent.artifact.entities
        .flatMap((entity) => [
        entity.revision_digest,
        ...entity.programs.map((program) => program.revision_digest),
        ...entity.offers.map((offer) => offer.revision_digest),
    ])
        .concat(parent.agentReadinessProfiles.map((profile) => profile.revision_digest)));
    return {
        releaseId: parent.descriptor.release_id,
        releaseSequence: parent.descriptor.release_core.release_sequence,
        coveragePolicyDigest: releaseResourceDigest(parent.bundle.resource_digests, RELEASE_RESOURCES.coveragePolicy),
        agentReadinessPolicyDigest: releaseResourceDigest(parent.bundle.resource_digests, RELEASE_RESOURCES.agentReadinessPolicy),
        currentRevisionDigests,
        currentAgentReadinessHeads: new Map(parent.agentReadinessProfiles.map((profile) => [
            profile.agent_readiness_profile_id,
            {
                entityId: profile.entity_id,
                revisionDigest: profile.revision_digest,
            },
        ])),
        revisions: new Map([...parent.revisions.entries()].filter((entry) => entry[1].revision_contract === "sourcey.entity-revision/v1alpha1" ||
            entry[1].revision_contract === "sourcey.program-revision/v1alpha1" ||
            entry[1].revision_contract === "sourcey.offer-revision/v1alpha1" ||
            entry[1].revision_contract === "sourcey.agent-readiness-declaration-revision/v1alpha1")),
        events: parent.events,
        observations: parent.observations,
        captureReceipts: parent.captureReceipts,
    };
}
export function emptyAdmittedEvidence() {
    return {
        authoritySetDigest: null,
        bundleDigests: [],
        revisionDigests: [],
        revisions: [],
        events: [],
        observations: [],
        captureReceipts: [],
        captures: new Map(),
        normalizedObjects: new Map(),
    };
}
export function mergeCanonicalById(left, right, label, id) {
    const values = new Map();
    for (const value of [...left, ...right]) {
        const key = id(value);
        const prior = values.get(key);
        if (prior && digest(prior) !== digest(value)) {
            throw new Error(`Release ${label} ${key} has conflicting input bytes.`);
        }
        values.set(key, value);
    }
    return [...values.values()].sort((first, second) => compareCanonicalStrings(id(first), id(second)));
}
export function mergeBytesByDigest(left, right, label) {
    const values = new Map(left);
    for (const [objectDigest, bytes] of right) {
        const prior = values.get(objectDigest);
        if (prior && !prior.equals(bytes)) {
            throw new Error(`Release ${label} ${objectDigest} has conflicting input bytes.`);
        }
        values.set(objectDigest, bytes);
    }
    return values;
}
/**
 * Release construction is the admission boundary for pending evidence bundles.
 * Every byte is re-read and re-verified here; the materializer's verdict is not
 * trusted and this function performs no mutation.
 */
export async function loadEvidenceAuthorityBundles(input) {
    if (input.targetReleaseSequence !== input.base.releaseSequence + 1) {
        throw new Error("Evidence authority admission must target the release after its exact base.");
    }
    const authoritySet = await loadAuthoritySetReaders(input);
    const readers = authoritySet
        ? authoritySet.readers
        : await loadDirectoryBundleReaders(input.root);
    if (readers.length === 0) {
        throw new Error("Configured evidence authority root contains no pending bundles.");
    }
    const reviewed = await Promise.all(readers.map(async (reader) => ({
        reader,
        ...(await readEvidenceAuthorityProposal(reader)),
    })));
    const prospectiveRevisionDigests = new Set(reviewed.map(({ proposal }) => proposal.subject_revision.revision_digest));
    const bundles = [];
    for (const { reader, proposal, bundleDigest } of reviewed) {
        bundles.push(await loadBundle({
            reader,
            proposal,
            bundleDigest,
            prospectiveRevisionDigests,
            base: input.base,
            targetReleaseSequence: input.targetReleaseSequence,
            targetCoveragePolicyDigest: input.targetCoveragePolicyDigest,
            targetAgentReadinessPolicyDigest: input.targetAgentReadinessPolicyDigest,
            targetRegistry: input.targetRegistry,
        }));
    }
    const bundleDigests = new Set();
    const revisionDigests = new Set();
    const revisionObjects = new Map();
    const events = new Map();
    const eventOperations = new Map();
    const observations = new Map();
    const captureReceipts = new Map();
    const captureOperations = new Map();
    const captures = new Map();
    const normalizedObjects = new Map();
    for (const bundle of bundles) {
        if (bundleDigests.has(bundle.bundleDigest)) {
            throw new Error(`Duplicate evidence authority bundle ${bundle.bundleDigest}.`);
        }
        bundleDigests.add(bundle.bundleDigest);
        for (const revisionDigest of bundle.revisionDigests)
            revisionDigests.add(revisionDigest);
        for (const event of bundle.events) {
            if (events.has(event.event_id)) {
                throw new Error(`Evidence authority bundles repeat event ${event.event_id}.`);
            }
            const priorOperation = eventOperations.get(event.operation_id);
            if (priorOperation) {
                throw new Error(`Evidence operation ${event.operation_id} is already bound to ${priorOperation}.`);
            }
            events.set(event.event_id, event);
            eventOperations.set(event.operation_id, event.event_id);
        }
        for (const receipt of bundle.captureReceipts) {
            if (captureReceipts.has(receipt.receipt_digest)) {
                throw new Error(`Evidence authority bundles repeat capture receipt ${receipt.receipt_digest}.`);
            }
            const priorOperation = captureOperations.get(receipt.operation_id);
            if (priorOperation) {
                throw new Error(`Capture operation ${receipt.operation_id} is already bound to ${priorOperation}.`);
            }
            captureReceipts.set(receipt.receipt_digest, receipt);
            captureOperations.set(receipt.operation_id, receipt.receipt_digest);
        }
        mergeCanonicalObjects(observations, bundle.observations, "observation", (value) => value.observation_id);
        mergeBytes(captures, bundle.captures, "capture");
        mergeBytes(normalizedObjects, bundle.normalizedObjects, "normalized object");
        for (const revision of bundle.revisions) {
            revisionObjects.set(revision.revision_digest, revision);
        }
    }
    return {
        authoritySetDigest: authoritySet?.digest ?? null,
        bundleDigests: [...bundleDigests].sort(compareCanonicalStrings),
        revisionDigests: [...revisionDigests].sort(compareCanonicalStrings),
        revisions: [...revisionObjects.values()].sort((left, right) => compareCanonicalStrings(left.revision_digest, right.revision_digest)),
        events: [...events.values()].sort((left, right) => compareCanonicalStrings(left.event_id, right.event_id)),
        observations: [...observations.values()].sort((left, right) => compareCanonicalStrings(left.observation_id, right.observation_id)),
        captureReceipts: [...captureReceipts.values()].sort((left, right) => compareCanonicalStrings(left.receipt_digest, right.receipt_digest)),
        captures,
        normalizedObjects,
    };
}
async function loadBundle(input) {
    const manifest = input.reader.manifest;
    const { bundleDigest, proposal } = input;
    const decision = evidenceReviewDecisionSchema.parse(JSON.parse((await input.reader.read("authority/review-decision.json")).toString("utf8")));
    const capturePolicy = capturePolicyDefinitionSchema.parse(JSON.parse((await input.reader.read("authority/capture-policy.json")).toString("utf8")));
    if (proposal.proposal_digest !== manifest.proposal_digest ||
        proposal.review_decision.decision_digest !== manifest.review_decision_digest ||
        canonicalJson(proposal.review_decision) !== canonicalJson(decision)) {
        throw new Error(`Evidence authority bundle ${bundleDigest} has a mismatched authority record.`);
    }
    if (input.reader.address !== digestPathSegment(proposal.proposal_digest)) {
        throw new Error(`Evidence authority bundle ${bundleDigest} is stored under the wrong address.`);
    }
    const targetCoveragePolicyDigest = proposal.subject_revision.revision_contract === "sourcey.agent-readiness-revision/v1alpha1"
        ? input.targetAgentReadinessPolicyDigest
        : input.targetCoveragePolicyDigest;
    if (proposal.review_proposal.coverage_policy_digest !== targetCoveragePolicyDigest) {
        throw new Error(`Evidence authority bundle ${bundleDigest} uses a stale target coverage policy.`);
    }
    if (digest(capturePolicy) !== proposal.review_proposal.capture_policy_digest) {
        throw new Error(`Evidence authority bundle ${bundleDigest} has the wrong capture policy bytes.`);
    }
    const revisions = await readAddressedJsonObjects(input.reader, manifest.objects, "revisions/", (value) => {
        const revisionContract = value
            .revision_contract;
        return revisionContract === "sourcey.entity-revision/v1alpha1"
            ? entityRevisionSchema.parse(value)
            : revisionContract === "sourcey.program-revision/v1alpha1"
                ? programRevisionSchema.parse(value)
                : revisionContract === "sourcey.offer-revision/v1alpha1"
                    ? offerRevisionSchema.parse(value)
                    : revisionContract === "sourcey.agent-readiness-revision/v1alpha1"
                        ? agentReadinessRevisionSchema.parse(value)
                        : agentReadinessDeclarationRevisionSchema.parse(value);
    }, (value) => value.revision_digest, (value) => digest(withoutKey(value, "revision_digest")));
    assertSameSet("revision", manifest.revision_digests, revisions.map((revision) => revision.revision_digest));
    const events = await readAddressedJsonObjects(input.reader, manifest.objects, "events/", (value) => catalogEventSchema.parse(value), (value) => value.event_id, (value) => digest(withoutKeys(value, ["event_id", "protected"])));
    assertSameSet("event", manifest.event_ids, events.map((event) => event.event_id));
    for (const event of events) {
        validateProtectedEvent(event, input.targetRegistry, input.targetReleaseSequence);
    }
    const observations = await readAddressedJsonObjects(input.reader, manifest.objects, "observations/", (value) => observationSchema.parse(value), (value) => value.observation_id, (value) => digest(withoutKey(value, "observation_id")));
    assertSameSet("observation", manifest.observation_ids, observations.map((observation) => observation.observation_id));
    const captureReceipts = await readAddressedJsonObjects(input.reader, manifest.objects, "capture-receipts/", (value) => captureReceiptSchema.parse(value), (value) => value.receipt_digest, (value) => digest(withoutKeys(value, ["receipt_digest", "protected"])));
    if (captureReceipts.length !== 1 ||
        captureReceipts[0]?.receipt_digest !== manifest.capture_receipt_digest) {
        throw new Error(`Evidence authority bundle ${bundleDigest} has the wrong capture receipt.`);
    }
    const receipt = captureReceipts[0];
    if (!receipt)
        throw new Error(`Evidence authority bundle ${bundleDigest} lacks a receipt.`);
    validateProtectedCaptureReceipt(receipt, input.targetRegistry, input.targetReleaseSequence);
    const capturePath = `captures/${digestPathSegment(receipt.capture.digest)}`;
    const normalizedDigest = proposal.review_proposal.submission.normalization
        .object_digest;
    const normalizedPath = `evidence/normalized/${digestPathSegment(normalizedDigest)}`;
    assertOnlyObjectPaths(manifest.objects, "captures/", [capturePath]);
    assertOnlyObjectPaths(manifest.objects, "evidence/normalized/", [normalizedPath]);
    assertOnlyObjectPaths(manifest.objects, "", [
        "authority/proposal.json",
        "authority/review-decision.json",
        "authority/capture-policy.json",
        capturePath,
        normalizedPath,
        ...revisions.map((revision) => `revisions/${digestPathSegment(revision.revision_digest)}.json`),
        ...events.map((event) => `events/${digestPathSegment(event.event_id)}.json`),
        ...observations.map((observation) => `observations/${digestPathSegment(observation.observation_id)}.json`),
        `capture-receipts/${digestPathSegment(receipt.receipt_digest)}.json`,
    ]);
    const captureBytes = await input.reader.read(capturePath);
    const normalizedBytes = await input.reader.read(normalizedPath);
    const validated = validateEvidenceCatalogProposal({
        proposal,
        captureBytes,
        normalizedBytes,
        catalog: {
            releaseId: input.base.releaseId,
            coveragePolicyDigest: input.targetCoveragePolicyDigest,
            agentReadinessPolicyDigest: input.targetAgentReadinessPolicyDigest,
            currentRevisionDigests: input.base.currentRevisionDigests,
            currentAgentReadinessHeads: input.base.currentAgentReadinessHeads,
            revisions: input.base.revisions,
            existingEvents: input.base.events,
            existingObservations: input.base.observations,
            existingCaptureReceipts: input.base.captureReceipts,
        },
        prospectiveRevisionDigests: input.prospectiveRevisionDigests,
        policy: {
            captureReceiptIssuerId: receipt.issuer_id,
            evidenceEventIssuerId: events[0]?.issuer_id ?? "",
        },
        agentReadinessRevisionCompiler: compileAgentReadinessRevision,
    });
    if (validated.newCaptureReceiptIntent === null && validated.newEventIntents.length === 0) {
        throw new Error(`Evidence authority bundle ${bundleDigest} does not contain new authority.`);
    }
    const { protected: _receiptProtection, receipt_digest: _receiptDigest, ...receiptCore } = receipt;
    if (canonicalJson(receiptCore) !== canonicalJson(proposal.capture_receipt_intent.core) ||
        receipt.receipt_digest !== proposal.capture_receipt_intent.receipt_digest) {
        throw new Error(`Evidence authority bundle ${bundleDigest} receipt differs from its intent.`);
    }
    assertMaterializedEvents(proposal.event_intents, events, bundleDigest);
    if (canonicalJson(proposal.observations) !== canonicalJson(observations)) {
        throw new Error(`Evidence authority bundle ${bundleDigest} observations differ from its proposal.`);
    }
    const captures = new Map([[receipt.capture.digest, captureBytes]]);
    const normalizedObjects = new Map([[normalizedDigest, normalizedBytes]]);
    verifyEvidenceObjectGraph({
        revisions,
        events,
        observations,
        captureReceipts,
        captures,
        normalizedObjects,
    });
    return {
        authoritySetDigest: null,
        bundleDigest: bundleDigest,
        bundleDigests: [bundleDigest],
        revisionDigests: manifest.revision_digests,
        revisions,
        events,
        observations,
        captureReceipts,
        captures,
        normalizedObjects,
    };
}
async function readEvidenceAuthorityProposal(reader) {
    const { bundle_digest: bundleDigest, ...manifestCore } = reader.manifest;
    if (digest(evidenceAuthorityBundleCoreSchema.parse(manifestCore)) !== bundleDigest) {
        throw new Error(`Evidence authority bundle ${bundleDigest} is not content-addressed.`);
    }
    await reader.verifyTree(reader.manifest.objects);
    const proposal = evidenceCatalogProposalSchema.parse(JSON.parse((await reader.read("authority/proposal.json")).toString("utf8")));
    if (proposal.proposal_digest !== reader.manifest.proposal_digest ||
        reader.address !== digestPathSegment(proposal.proposal_digest)) {
        throw new Error(`Evidence authority bundle ${bundleDigest} has the wrong proposal.`);
    }
    return { proposal, bundleDigest: bundleDigest };
}
async function loadDirectoryBundleReaders(root) {
    const entries = await readdir(root, { withFileTypes: true });
    const directories = entries
        .filter((entry) => entry.isDirectory())
        .sort((left, right) => compareCanonicalStrings(left.name, right.name));
    if (entries.some((entry) => entry.isSymbolicLink())) {
        throw new Error(`Evidence authority root ${root} cannot contain symlinks.`);
    }
    if (entries.some((entry) => !entry.isDirectory())) {
        throw new Error(`Evidence authority root ${root} must contain only addressed bundles.`);
    }
    return Promise.all(directories.map(async (entry) => {
        const directory = join(root, entry.name);
        const manifest = evidenceAuthorityBundleManifestSchema.parse(JSON.parse(await readFile(join(directory, "manifest.json"), "utf8")));
        return {
            address: entry.name,
            label: directory,
            manifest,
            read: (path) => readFile(join(directory, path)),
            verifyTree: (declarations) => verifyBundleTree(directory, declarations),
        };
    }));
}
async function loadAuthoritySetReaders(input) {
    let manifestBytes;
    try {
        manifestBytes = await readFile(join(input.root, "authority-set.json"));
    }
    catch (error) {
        if (error.code === "ENOENT")
            return null;
        throw error;
    }
    const manifest = evidenceAuthoritySetManifestSchema.parse(JSON.parse(manifestBytes.toString("utf8")));
    const { authority_set_digest: authoritySetDigest, ...core } = manifest;
    if (digest(evidenceAuthoritySetCoreSchema.parse(core)) !== authoritySetDigest) {
        throw new Error("Evidence authority set is not content-addressed.");
    }
    if (manifest.target_signer_registry_digest !== input.targetRegistry.registry_digest) {
        throw new Error(`Evidence authority set ${authoritySetDigest} targets the wrong signer registry.`);
    }
    assertSortedUnique("bundle proposal", manifest.bundles.map((bundle) => bundle.proposal_digest));
    assertUnique("bundle", manifest.bundles.map((bundle) => bundle.bundle_digest));
    assertSortedUnique("object", manifest.objects.map((object) => object.digest));
    const objectBytes = new Map();
    for (const declaration of manifest.objects) {
        const objectDigest = declaration.digest;
        const bytes = await readFile(join(input.root, "objects", digestPathSegment(objectDigest)));
        if (bytes.byteLength !== declaration.bytes || sha256Bytes(bytes) !== objectDigest) {
            throw new Error(`Evidence authority set object ${objectDigest} differs from its declaration.`);
        }
        objectBytes.set(objectDigest, bytes);
    }
    const readers = [];
    const referencedObjects = new Set();
    for (const declaration of manifest.bundles) {
        const proposalDigest = declaration.proposal_digest;
        const address = digestPathSegment(proposalDigest);
        const bytes = await readFile(join(input.root, "bundles", `${address}.json`));
        if (bytes.byteLength !== declaration.manifest.bytes ||
            sha256Bytes(bytes) !== declaration.manifest.digest) {
            throw new Error(`Evidence authority set bundle ${declaration.bundle_digest} differs from its declaration.`);
        }
        const bundle = evidenceAuthorityBundleManifestSchema.parse(JSON.parse(bytes.toString("utf8")));
        const { bundle_digest: bundleDigest, ...bundleCore } = bundle;
        if (bundle.proposal_digest !== proposalDigest ||
            bundleDigest !== declaration.bundle_digest ||
            digest(evidenceAuthorityBundleCoreSchema.parse(bundleCore)) !== bundleDigest) {
            throw new Error(`Evidence authority set bundle ${declaration.bundle_digest} is not content-addressed.`);
        }
        for (const [path, object] of Object.entries(bundle.objects)) {
            assertSafeObjectPath(path);
            referencedObjects.add(object.sha256);
            const value = objectBytes.get(object.sha256);
            if (!value || value.byteLength !== object.bytes || sha256Bytes(value) !== object.sha256) {
                throw new Error(`Evidence authority bundle object ${path} differs from its declaration.`);
            }
        }
        readers.push({
            address,
            label: `${input.root}/bundles/${address}.json`,
            manifest: bundle,
            read: async (path) => {
                const object = bundle.objects[path];
                if (!object) {
                    throw new Error(`Evidence authority bundle ${bundleDigest} does not declare ${path}.`);
                }
                const value = objectBytes.get(object.sha256);
                if (!value || value.byteLength !== object.bytes || sha256Bytes(value) !== object.sha256) {
                    throw new Error(`Evidence authority bundle object ${path} differs from its declaration.`);
                }
                return value;
            },
            verifyTree: async (declarations) => {
                if (canonicalJson(declarations) !== canonicalJson(bundle.objects)) {
                    throw new Error(`Evidence authority bundle ${bundleDigest} was read with different declarations.`);
                }
            },
        });
    }
    const declaredObjects = new Set(manifest.objects.map((object) => object.digest));
    if (referencedObjects.size !== declaredObjects.size ||
        [...referencedObjects].some((objectDigest) => !declaredObjects.has(objectDigest))) {
        throw new Error("Evidence authority set does not close its exact shared object set.");
    }
    const expectedPaths = [
        "authority-set.json",
        ...manifest.bundles.map((bundle) => `bundles/${digestPathSegment(bundle.proposal_digest)}.json`),
        ...manifest.objects.map((object) => `objects/${digestPathSegment(object.digest)}`),
    ].sort(compareCanonicalStrings);
    const actualPaths = (await filesUnder(input.root))
        .map((path) => relative(input.root, path).split(sep).join("/"))
        .sort(compareCanonicalStrings);
    if (canonicalJson(actualPaths) !== canonicalJson(expectedPaths)) {
        throw new Error(`Evidence authority set ${authoritySetDigest} has an undeclared file set.`);
    }
    return {
        digest: authoritySetDigest,
        readers,
    };
}
async function readAddressedJsonObjects(reader, declarations, prefix, parse, address, coreDigest) {
    const paths = Object.keys(declarations)
        .filter((path) => path.startsWith(prefix) && path.endsWith(".json"))
        .sort(compareCanonicalStrings);
    if (paths.length === 0)
        throw new Error(`Evidence authority bundle lacks ${prefix} objects.`);
    const values = [];
    for (const path of paths) {
        const value = parse(JSON.parse((await reader.read(path)).toString("utf8")));
        const objectAddress = address(value);
        if (path !== `${prefix}${digestPathSegment(objectAddress)}.json` ||
            coreDigest(value) !== objectAddress) {
            throw new Error(`Evidence authority bundle object ${path} is misaddressed.`);
        }
        values.push(value);
    }
    assertOnlyObjectPaths(declarations, prefix, paths);
    return values;
}
function assertSortedUnique(label, values) {
    const sorted = [...new Set(values)].sort(compareCanonicalStrings);
    if (canonicalJson(values) !== canonicalJson(sorted)) {
        throw new Error(`Evidence authority set ${label} declarations are not sorted and unique.`);
    }
}
function assertUnique(label, values) {
    if (new Set(values).size !== values.length) {
        throw new Error(`Evidence authority set repeats a ${label} digest.`);
    }
}
function assertMaterializedEvents(intents, events, bundleDigest) {
    const byId = new Map(events.map((event) => [event.event_id, event]));
    if (byId.size !== intents.length) {
        throw new Error(`Evidence authority bundle ${bundleDigest} has the wrong event count.`);
    }
    for (const intent of intents) {
        const event = byId.get(intent.event_id);
        if (!event)
            throw new Error(`Evidence authority bundle ${bundleDigest} lacks an intended event.`);
        const { event_id: eventId, protected: _protection, ...core } = event;
        if (eventId !== intent.event_id || canonicalJson(core) !== canonicalJson(intent.core)) {
            throw new Error(`Evidence authority bundle ${bundleDigest} event differs from its intent.`);
        }
    }
}
function assertSameSet(label, expected, actual) {
    if (canonicalJson([...expected].sort(compareCanonicalStrings)) !==
        canonicalJson([...actual].sort(compareCanonicalStrings))) {
        throw new Error(`Evidence authority bundle ${label} declarations disagree.`);
    }
}
function mergeCanonicalObjects(target, values, label, id) {
    for (const value of values) {
        const key = id(value);
        const prior = target.get(key);
        if (prior && canonicalJson(prior) !== canonicalJson(value)) {
            throw new Error(`Evidence authority ${label} ${key} has conflicting bytes.`);
        }
        target.set(key, value);
    }
}
function mergeBytes(target, values, label) {
    for (const [objectDigest, bytes] of values) {
        const prior = target.get(objectDigest);
        if (prior && !prior.equals(bytes)) {
            throw new Error(`Evidence authority ${label} ${objectDigest} has conflicting bytes.`);
        }
        target.set(objectDigest, bytes);
    }
}
function withoutKey(value, key) {
    const { [key]: _, ...rest } = value;
    return rest;
}
function withoutKeys(value, keys) {
    const result = { ...value };
    for (const key of keys)
        delete result[key];
    return result;
}
//# sourceMappingURL=evidence-admission.js.map