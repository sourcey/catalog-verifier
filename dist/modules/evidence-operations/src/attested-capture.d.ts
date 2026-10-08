import type { CaptureAttempt } from "provenry/capture/attempts";
import { type AttestedCapture, type CaptureAttemptAttestation, type CaptureAttemptAttestationSigner, type CaptureAttemptAttestationTrust } from "provenry/capture/attestation";
import { type CaptureAttemptStart } from "provenry/capture/start";
import { type Digest } from "provenry/primitives";
import type { ProvenanceIndex } from "../../../contracts/artifact/src/index.js";
import type { SignerRegistry } from "../../../contracts/authority/src/index.js";
import type { Observation } from "../../../contracts/observations/src/index.js";
/**
 * The release files that carry attested captures: each start, attempt and
 * attestation once, addressed by its own digest. The one definition of their
 * layout, for every writer and every reader.
 */
export declare function releasedCaptureRecordFiles(captures: Iterable<AttestedCapture>): Map<string, Buffer>;
/** Where an attestation is first included: its provenance witness. */
export declare function captureAttestationInclusion(captured: AttestedCapture, firstInclusionSequence: number): NonNullable<ProvenanceIndex["capture_attestations"]>[string];
/** Whether a release file is a capture start, attempt or attestation. */
export declare function isReleasedCaptureRecordPath(path: string): boolean;
/**
 * The attested captures a release's capture records hold. Every record is
 * addressed by its own digest and every attestation is the exact object its
 * provenance witness names; the witnesses name exactly the attestations held.
 * An attestation the release first includes is proved, joined to its start and
 * attempt, by its registry at this sequence. One an earlier release first
 * included is carried: that release proved it, so here its witness must name a
 * registry the trust history holds and its start and attempt must be present,
 * and nothing is proved again. A witness claiming a later inclusion is refused.
 */
export declare function verifyReleasedCaptureRecords(input: {
    readonly files: Iterable<readonly [string, Uint8Array]>;
    readonly inclusions: ProvenanceIndex["capture_attestations"];
    readonly releaseSequence: number;
    readonly registryFor: (signerRegistryDigest: string) => SignerRegistry | undefined;
}): Promise<ReadonlyMap<string, AttestedCapture>>;
/** Attested captures by attestation digest; one digest names exactly one object. */
export declare function mergeAttestedCaptures(left: ReadonlyMap<string, AttestedCapture>, right: ReadonlyMap<string, AttestedCapture>): Map<string, AttestedCapture>;
/** The attestation digests a release carries, sorted, as its input set names them. */
export declare function attestedCaptureDigests(captures: ReadonlyMap<string, AttestedCapture>): Digest[];
/** The trust Catalog's signer registry gives capture attestations at one release sequence. */
export declare function catalogCaptureTrust(registry: SignerRegistry, sequence: number): CaptureAttemptAttestationTrust;
/**
 * Attest one journaled capture for the release being built, judged by its
 * registry at its sequence. A caller signing at a fixed time, such as the
 * materialization time, signs the same attestation on every re-run.
 */
export declare function attestCatalogCapture(input: {
    readonly start: CaptureAttemptStart;
    readonly attempt: CaptureAttempt;
    readonly signedAt: string;
    readonly signer: CaptureAttemptAttestationSigner;
    readonly registry: SignerRegistry;
    readonly sequence: number;
}): Promise<AttestedCapture>;
/**
 * The attested captures a set of released records proves, by attestation
 * digest. Each attestation is judged by the signer registry and release
 * sequence its caller names: where it was first included, or the release
 * being built.
 */
export declare function verifyReleasedAttestedCaptures(input: {
    readonly starts: readonly CaptureAttemptStart[];
    readonly attempts: readonly CaptureAttempt[];
    readonly attestations: readonly CaptureAttemptAttestation[];
    readonly judgedBy: (attestation: CaptureAttemptAttestation) => {
        readonly registry: SignerRegistry;
        readonly sequence: number;
    };
}): Promise<ReadonlyMap<string, AttestedCapture>>;
/**
 * An attested capture is exactly the capture an observation states: the
 * source it was reserved for, what the fetch returned, when, and by which
 * method. Materialization asserts it before an event cites the attestation,
 * and every verifier asserts it again from the released records.
 */
export declare function assertAttestedObservationCapture(observation: Observation, captured: AttestedCapture): void;
//# sourceMappingURL=attested-capture.d.ts.map