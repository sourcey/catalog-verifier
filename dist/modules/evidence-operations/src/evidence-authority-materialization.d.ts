import type { AttestedCapture } from "provenry/capture/attestation";
import { type Digest } from "provenry/primitives";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import { evidenceAuthorityBundleManifestSchema } from "../../../contracts/evidence/src/index.js";
import { type validateSignerRegistry } from "../../authority/src/index.js";
import { type EvidenceCatalogView } from "./evidence-authority.js";
export interface EvidenceAuthorityEventSigner {
    signCatalogEvent(input: {
        readonly purpose: "catalog-evidence";
        readonly core: Omit<CatalogEvent, "event_id" | "protected">;
        readonly eventId: Digest;
        readonly signerRegistryDigest: Digest;
    }): Promise<{
        readonly protected: CatalogEvent["protected"];
    }>;
}
export interface EvidenceAuthorityMaterializationContext {
    readonly catalog: EvidenceCatalogView;
    readonly prospectiveRevisionDigests: ReadonlySet<string>;
    readonly targetRegistry: ReturnType<typeof validateSignerRegistry>;
    readonly targetSequence: number;
    readonly registryDigest: Digest;
    readonly policy: {
        readonly evidenceEventIssuerId: string;
    };
    readonly evidenceEventSigner: EvidenceAuthorityEventSigner;
}
/**
 * Turn one reviewed evidence proposal into a signed immutable authority bundle.
 * Hosts provide exact Catalog context, the attested capture the review read and
 * the evidence event signer; the semantic materialization remains owned by
 * Catalog and shared by CLI and production.
 */
export declare function createEvidenceAuthorityBundleFromProjection(input: {
    readonly context: EvidenceAuthorityMaterializationContext;
    readonly reviewProposal: unknown;
    readonly reviewDecision: unknown;
    /** The capture's start, attempt and attestation, proved here against the target registry. */
    readonly attestedCapture: AttestedCapture;
    readonly capturePolicy: unknown;
    readonly revision: unknown;
    readonly authorityEntityRevision: unknown;
    readonly authorityProgramRevision: unknown;
    readonly captureBytes: Uint8Array;
    readonly normalizedBytes: Uint8Array;
    readonly materializedAt: string;
}): Promise<{
    readonly proposalDigest: Digest;
    readonly bundleDigest: Digest;
    readonly manifest: ReturnType<typeof evidenceAuthorityBundleManifestSchema.parse>;
    readonly files: ReadonlyMap<string, Buffer>;
}>;
//# sourceMappingURL=evidence-authority-materialization.d.ts.map