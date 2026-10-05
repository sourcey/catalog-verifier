import { type Digest } from "provenry/primitives";
import type { StandardEvidenceArtifact, StandardEvidenceLocator, StandardEvidenceResidue } from "../../../contracts/standards/src/index.js";
export declare function standardAdapterKey(namespace: string, version: string): string;
export declare function verifyRetainedStandardArtifacts(input: {
    readonly artifacts: readonly StandardEvidenceArtifact[];
    readonly bytesByDigest: ReadonlyMap<Digest, Uint8Array>;
    readonly acceptedMediaTypes: readonly string[];
    readonly adapterDigest: string;
}): void;
export declare function verifyStandardLocatorClosure(input: {
    readonly artifacts: readonly StandardEvidenceArtifact[];
    readonly bytesByDigest: ReadonlyMap<Digest, Uint8Array>;
    readonly locators: readonly StandardEvidenceLocator[];
    readonly residue: readonly StandardEvidenceResidue[];
}): void;
//# sourceMappingURL=index.d.ts.map