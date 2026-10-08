import type { AttestedCapture } from "provenry/capture/attestation";
import { type Digest } from "provenry/primitives";
import type { CatalogEvent } from "../../../contracts/events/src/index.js";
import type { Observation } from "../../../contracts/observations/src/index.js";
import { type RetainedCatalogRevision } from "./retained-revision.js";
/**
 * Verifies the public evidence graph a release holds, from immutable local
 * bytes; this kernel performs no I/O. Evidence the release first includes is
 * proved: its normalized bytes reproduce from its capture with the current
 * profile, its assertions locate in them, and its capture is the one a Provenry
 * attestation the caller has verified (`verifyAttestedCaptures`) proves.
 * Evidence an earlier release first included is carried: that release proved
 * it, so here only its citations must resolve (lean-release-chain §3.1).
 */
export declare function verifyEvidenceObjectGraph(input: {
    readonly revisions: readonly RetainedCatalogRevision[];
    readonly events: readonly CatalogEvent[];
    readonly observations: readonly Observation[];
    /** Attested captures the release holds, by attestation digest. */
    readonly attestedCaptures: ReadonlyMap<string, AttestedCapture>;
    /** Events an earlier release first included; their evidence is carried. */
    readonly carriedEventIds?: ReadonlySet<string>;
    readonly captures: ReadonlyMap<Digest, Uint8Array>;
    readonly normalizedObjects: ReadonlyMap<Digest, Uint8Array>;
    /**
     * Set when every capture already matches its digest key, as a verified release's
     * byte declarations prove. Otherwise each capture is hashed here.
     */
    readonly capturesProven?: boolean;
    readonly allowFixtureEvidence?: boolean;
}): void;
//# sourceMappingURL=proof-graph.d.ts.map