import { standardEvidenceAdapterManifestCoreSchema, standardEvidenceAdapterManifestSchema, standardEvidenceRecordCoreSchema, standardEvidenceRecordSchema, standardEvidenceRequestCoreSchema, standardEvidenceRequestSchema, standardEvidenceResultCoreSchema, standardEvidenceResultSchema, } from "../../../contracts/standards/src/index.js";
import { canonicalJson, compareCanonicalStrings, digest, sha256Bytes, } from "../../primitives/src/index.js";
import { standardAdapterKey, verifyRetainedStandardArtifacts, verifyStandardLocatorClosure, } from "../../standard-adapter-runtime/src/index.js";
export function buildStandardEvidenceAdapterManifest(input) {
    const core = standardEvidenceAdapterManifestCoreSchema.parse(input);
    return standardEvidenceAdapterManifestSchema.parse({
        ...core,
        adapter_digest: digest(core),
    });
}
export function buildStandardEvidenceRequest(input) {
    const core = standardEvidenceRequestCoreSchema.parse(input);
    return standardEvidenceRequestSchema.parse({ ...core, request_digest: digest(core) });
}
export function buildStandardEvidenceRecord(input) {
    const request = verifyStandardEvidenceRequest(input.request);
    const result = verifyStandardEvidenceResult(input.result);
    const core = standardEvidenceRecordCoreSchema.parse({
        record_contract: "sourcey.standard-evidence-record/v1alpha1",
        request,
        result,
        result_object_digest: sha256Bytes(standardEvidenceResultBytes(result)),
    });
    return standardEvidenceRecordSchema.parse({ ...core, record_digest: digest(core) });
}
export class StandardEvidenceAdapterRegistry {
    #adapters;
    constructor(adapters) {
        const byStandard = new Map();
        const digests = new Set();
        for (const adapter of adapters) {
            const manifest = verifyStandardEvidenceAdapterManifest(adapter.manifest);
            const key = standardAdapterKey(manifest.standard.namespace, manifest.standard.version);
            if (byStandard.has(key)) {
                throw new Error(`Standards adapter ${manifest.standard.namespace}@${manifest.standard.version} is registered more than once.`);
            }
            if (digests.has(manifest.adapter_digest)) {
                throw new Error(`Standards adapter digest ${manifest.adapter_digest} is not unique.`);
            }
            byStandard.set(key, adapter);
            digests.add(manifest.adapter_digest);
        }
        this.#adapters = byStandard;
    }
    interpret(input) {
        const request = verifyStandardEvidenceRequest(input.request);
        const adapter = this.#adapters.get(standardAdapterKey(request.adapter.namespace, request.adapter.version));
        if (!adapter) {
            throw new Error(`No exact standards adapter is registered for ${request.adapter.namespace}@${request.adapter.version}.`);
        }
        const manifest = verifyStandardEvidenceAdapterManifest(adapter.manifest);
        if (manifest.adapter_digest !== request.adapter.adapter_digest) {
            throw new Error(`Standards adapter digest does not match ${request.adapter.namespace}@${request.adapter.version}.`);
        }
        const supported = new Set(manifest.requirement_ids);
        for (const requirement of request.requirements) {
            if (!supported.has(requirement.requirement_id)) {
                throw new Error(`Standards adapter ${manifest.adapter_digest} does not implement ${requirement.requirement_id}.`);
            }
        }
        verifyRetainedStandardArtifacts({
            artifacts: request.artifacts,
            bytesByDigest: input.artifacts,
            acceptedMediaTypes: manifest.accepted_media_types,
            adapterDigest: manifest.adapter_digest,
        });
        const interpreted = adapter.interpret({ request, artifacts: input.artifacts });
        const requested = new Set(request.requirements.map(requirementKey));
        const returned = new Set(interpreted.map((result) => requirementKey(result.requirement)));
        if (requested.size !== returned.size ||
            [...requested].some((requirement) => !returned.has(requirement))) {
            throw new Error("A standards adapter must return every requested requirement exactly once.");
        }
        for (const result of interpreted) {
            verifyStandardLocatorClosure({
                artifacts: request.artifacts,
                bytesByDigest: input.artifacts,
                locators: result.locators,
                residue: result.residue,
            });
        }
        const core = standardEvidenceResultCoreSchema.parse({
            result_contract: "sourcey.standard-evidence-result/v1alpha1",
            request_digest: request.request_digest,
            adapter_digest: manifest.adapter_digest,
            requirements: [...interpreted].sort((left, right) => compareCanonicalStrings(requirementKey(left.requirement), requirementKey(right.requirement))),
        });
        return standardEvidenceResultSchema.parse({ ...core, result_digest: digest(core) });
    }
    verifyRecord(input) {
        const record = verifyStandardEvidenceRecord(input.record);
        const replayed = buildStandardEvidenceRecord({
            request: record.request,
            result: this.interpret({ request: record.request, artifacts: input.artifacts }),
        });
        if (canonicalJson(replayed) !== canonicalJson(record)) {
            throw new Error("Standards evidence record does not match exact adapter replay.");
        }
        return record;
    }
}
export function verifyStandardEvidenceAdapterManifest(input) {
    const manifest = standardEvidenceAdapterManifestSchema.parse(input);
    const { adapter_digest: adapterDigest, ...core } = manifest;
    if (digest(standardEvidenceAdapterManifestCoreSchema.parse(core)) !== adapterDigest) {
        throw new Error("Standards adapter manifest digest does not match its canonical core.");
    }
    return manifest;
}
export function verifyStandardEvidenceResult(input) {
    const result = standardEvidenceResultSchema.parse(input);
    const { result_digest: resultDigest, ...core } = result;
    if (digest(standardEvidenceResultCoreSchema.parse(core)) !== resultDigest) {
        throw new Error("Standards evidence result digest does not match its canonical core.");
    }
    return result;
}
export function verifyStandardEvidenceRequest(input) {
    const request = standardEvidenceRequestSchema.parse(input);
    const { request_digest: requestDigest, ...core } = request;
    if (digest(standardEvidenceRequestCoreSchema.parse(core)) !== requestDigest) {
        throw new Error("Standards evidence request digest does not match its canonical core.");
    }
    return request;
}
export function verifyStandardEvidenceRecord(input) {
    const record = standardEvidenceRecordSchema.parse(input);
    const request = verifyStandardEvidenceRequest(record.request);
    const result = verifyStandardEvidenceResult(record.result);
    if (sha256Bytes(standardEvidenceResultBytes(result)) !== record.result_object_digest) {
        throw new Error("Standards evidence result object digest does not match its canonical bytes.");
    }
    const { record_digest: recordDigest, ...core } = record;
    if (digest(standardEvidenceRecordCoreSchema.parse({
        ...core,
        request,
        result,
    })) !== recordDigest) {
        throw new Error("Standards evidence record digest does not match its canonical core.");
    }
    return record;
}
function requirementKey(value) {
    return `${standardAdapterKey(value.namespace, value.version)}\u0000${value.requirement_id}\u0000${value.relation}`;
}
export function standardEvidenceResultBytes(result) {
    return new TextEncoder().encode(`${canonicalJson(result)}\n`);
}
//# sourceMappingURL=index.js.map