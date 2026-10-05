import { type Digest } from "provenry/primitives";
import { type StandardEvidenceAdapterManifest, type StandardEvidenceRecord, type StandardEvidenceRequest, type StandardEvidenceRequirementResult, type StandardEvidenceResult, standardEvidenceAdapterManifestCoreSchema, standardEvidenceRequestCoreSchema } from "../../../contracts/standards/src/index.js";
export interface StandardEvidenceAdapter {
    readonly manifest: StandardEvidenceAdapterManifest;
    interpret(input: {
        readonly request: StandardEvidenceRequest;
        readonly artifacts: ReadonlyMap<Digest, Uint8Array>;
    }): readonly StandardEvidenceRequirementResult[];
}
export declare function buildStandardEvidenceAdapterManifest(input: Parameters<typeof standardEvidenceAdapterManifestCoreSchema.parse>[0]): StandardEvidenceAdapterManifest;
export declare function buildStandardEvidenceRequest(input: Parameters<typeof standardEvidenceRequestCoreSchema.parse>[0]): StandardEvidenceRequest;
export declare function buildStandardEvidenceRecord(input: {
    readonly request: StandardEvidenceRequest;
    readonly result: StandardEvidenceResult;
}): StandardEvidenceRecord;
export declare class StandardEvidenceAdapterRegistry {
    #private;
    constructor(adapters: readonly StandardEvidenceAdapter[]);
    interpret(input: {
        readonly request: unknown;
        readonly artifacts: ReadonlyMap<Digest, Uint8Array>;
    }): StandardEvidenceResult;
    verifyRecord(input: {
        readonly record: unknown;
        readonly artifacts: ReadonlyMap<Digest, Uint8Array>;
    }): StandardEvidenceRecord;
}
export declare function verifyStandardEvidenceAdapterManifest(input: unknown): StandardEvidenceAdapterManifest;
export declare function verifyStandardEvidenceResult(input: unknown): StandardEvidenceResult;
export declare function verifyStandardEvidenceRequest(input: unknown): StandardEvidenceRequest;
export declare function verifyStandardEvidenceRecord(input: unknown): StandardEvidenceRecord;
export declare function standardEvidenceResultBytes(result: StandardEvidenceResult): Uint8Array;
//# sourceMappingURL=index.d.ts.map