import { type Digest } from "provenry/primitives";
import type { AgentReadinessRevision } from "../../../contracts/agent-readiness/src/index.js";
import type { Provenance } from "../../../contracts/artifact/src/index.js";
import { type CatalogEvent } from "../../../contracts/events/src/index.js";
import type { EvidenceAssertion } from "../../../contracts/evidence/src/index.js";
import type { Observation } from "../../../contracts/observations/src/index.js";
import type { CoveragePolicy, FreshnessPolicy } from "../../../contracts/policies/src/index.js";
import { type EntityRevision, type OfferRevision, type ProgramRevision } from "../../../contracts/revisions/src/index.js";
export { evidenceAssertions } from "./evidence-bindings.js";
export { applicableEvidenceCoverageRequirements, evaluateEvidenceCoverage, evidenceAssertionSatisfiesRequirement, evidenceCoverageCandidateRequirements, evidencePathsOverlap, evidenceRequirementIsCovered, valueAtEvidencePointer, } from "./evidence-coverage.js";
export * from "./material-claims.js";
export { buildProspectiveEvidenceStandingGraph } from "./prospective-evidence.js";
type Revision = EntityRevision | ProgramRevision | OfferRevision | AgentReadinessRevision;
interface FieldCoverage {
    readonly path: string;
    readonly supporting_event_ids: Digest[];
    readonly contradicting_event_ids: Digest[];
    readonly accepted_proof_kinds: EvidenceAssertion["proof_kind"][];
    readonly evidence_proof_kinds: EvidenceAssertion["proof_kind"][];
    readonly latest_observation_at?: string;
    readonly freshness: Provenance["fields"][number]["freshness"];
}
interface DerivedProvenance {
    readonly freshness: Provenance["freshness"];
    readonly dispute: Provenance["dispute"];
    readonly coverage_policy_digest: Digest;
    readonly freshness_policy_digest: Digest;
    readonly basis_event_ids: Digest[];
    readonly fields: FieldCoverage[];
    readonly vendor_attestation: {
        readonly status: "none";
    } | {
        readonly status: "current";
        readonly event_id: Digest;
        readonly attested_at: string;
    };
}
export type ProvenanceEvent = Omit<CatalogEvent, "protected">;
export interface EvidenceStandingGraph {
    readonly byRevisionDigest: ReadonlyMap<string, readonly ProvenanceEvent[]>;
    readonly observations: ReadonlyMap<string, Observation>;
    readonly inactiveEventIds: ReadonlySet<string>;
    readonly evidenceBindingActivity: ReadonlyMap<string, boolean>;
    readonly activeAuthorityClaims: ReadonlyMap<string, {
        readonly entityId: string;
        readonly authorizedIssuerId: string;
        readonly controlledDomain: string;
        readonly validUntil: string;
        readonly eventIds: readonly Digest[];
    }>;
}
export interface EventGraph extends EvidenceStandingGraph {
    readonly events: readonly CatalogEvent[];
    readonly byId: ReadonlyMap<string, CatalogEvent>;
    readonly byRevisionDigest: ReadonlyMap<string, readonly CatalogEvent[]>;
}
/** The unique observations that the evidence events among `eventIds` bind, in canonical order. */
export declare function boundObservationIds(eventIds: Iterable<string>, events: ReadonlyMap<string, ProvenanceEvent>): string[];
export declare function buildEventGraph(events: readonly CatalogEvent[], observations: readonly Observation[]): EventGraph;
/**
 * A revision's standing apart from field coverage: its open or resolved
 * disputes, the Entity's current attestation of it, and the events that
 * establish both. Every subject's provenance carries it; an Agent Readiness
 * profile's provenance is only this, its ratings resting on run records.
 */
export declare function deriveSubjectStanding(input: {
    readonly revisionDigest: string;
    readonly authorityEntityRevision: EntityRevision;
    readonly graph: EvidenceStandingGraph;
    readonly policyAsOf: string;
}): Pick<DerivedProvenance, "dispute" | "vendor_attestation" | "basis_event_ids">;
export declare function deriveProvenance(input: {
    readonly revision: Exclude<Revision, AgentReadinessRevision>;
    readonly authorityEntityRevision: EntityRevision;
    readonly graph: EvidenceStandingGraph;
    readonly coveragePolicy: CoveragePolicy;
    readonly freshnessPolicy: FreshnessPolicy;
    readonly policyAsOf: string;
}): DerivedProvenance;
//# sourceMappingURL=index.d.ts.map