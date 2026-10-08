import { type AttestedCapture, type CaptureAttemptAttestation } from "provenry/capture/attestation";
import { type Digest } from "provenry/primitives";
import type { AgentReadinessDeclarationRevision, AgentReadinessRevision } from "../../../contracts/agent-readiness/src/index.js";
import { type CatalogEvent } from "../../../contracts/events/src/index.js";
import { type Observation } from "../../../contracts/observations/src/index.js";
import { type ListingRevision } from "../../../contracts/revisions/src/index.js";
import type { VerifiedCatalogRelease } from "../../artifact/src/index.js";
import { type validateSignerRegistry } from "../../authority/src/index.js";
import { type EvidenceCatalogView, evidenceCatalogProposalSchema } from "../../evidence-operations/src/evidence-authority.js";
/** Current Catalog state, which also holds readiness revisions evidence never targets. */
type CatalogRevision = ListingRevision | AgentReadinessRevision | AgentReadinessDeclarationRevision;
type Registry = ReturnType<typeof validateSignerRegistry>;
export interface EvidenceAdmissionBase {
    readonly releaseId: Digest;
    readonly releaseSequence: number;
    readonly coveragePolicyDigest: Digest;
    readonly currentRevisionDigests: ReadonlySet<string>;
    readonly currentAgentReadinessHeads: EvidenceCatalogView["currentAgentReadinessHeads"];
    readonly revisions: ReadonlyMap<Digest, CatalogRevision>;
    readonly events: readonly CatalogEvent[];
    readonly observations: readonly Observation[];
    /** The capture attestations the parent release already carries. */
    readonly captureAttestations: readonly CaptureAttemptAttestation[];
}
export interface AdmittedEvidenceAuthority {
    readonly authoritySetDigest: Digest | null;
    readonly bundleDigests: readonly Digest[];
    readonly revisionDigests: readonly Digest[];
    /** Revision objects the bundles carry, so a delta can ship revisions superseded later in its own range. */
    readonly revisions: readonly CatalogRevision[];
    readonly events: readonly CatalogEvent[];
    readonly observations: readonly Observation[];
    /** The attested captures the bundles prove, by attestation digest. */
    readonly attestedCaptures: ReadonlyMap<string, AttestedCapture>;
    readonly captures: ReadonlyMap<Digest, Buffer>;
    readonly normalizedObjects: ReadonlyMap<Digest, Buffer>;
}
export declare function loadEvidenceAuthorityProposals(input: {
    readonly roots: readonly string[];
    readonly targetRegistry: Registry;
}): Promise<ReturnType<typeof evidenceCatalogProposalSchema.parse>[]>;
export declare function createEvidenceAdmissionBase(parent: VerifiedCatalogRelease | null): EvidenceAdmissionBase;
export declare function emptyAdmittedEvidence(): AdmittedEvidenceAuthority;
export declare function mergeCanonicalById<T>(left: readonly T[], right: readonly T[], label: string, id: (value: T) => string): T[];
export declare function mergeBytesByDigest(left: ReadonlyMap<Digest, Buffer>, right: ReadonlyMap<Digest, Buffer>, label: string): Map<Digest, Buffer>;
/**
 * Release construction is the admission boundary for pending evidence bundles.
 * Every byte is re-read and re-verified here; the materializer's verdict is not
 * trusted and this function performs no mutation.
 */
export declare function loadEvidenceAuthorityBundles(input: {
    readonly root: string;
    readonly base: EvidenceAdmissionBase;
    readonly targetReleaseSequence: number;
    readonly targetCoveragePolicyDigest: Digest;
    readonly targetRegistry: Registry;
}): Promise<AdmittedEvidenceAuthority>;
export {};
//# sourceMappingURL=evidence-admission.d.ts.map