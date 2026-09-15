import { type AgentReadinessDeclarationRevision, type AgentReadinessIndex, type AgentReadinessOfferRelationInput, type AgentReadinessOfferRelationRevision, type AgentReadinessPolicy, type AgentReadinessProfileInput, type AgentReadinessProjection, type AgentReadinessRevision } from "../../../contracts/agent-readiness/src/index.js";
import type { AssetManifest } from "../../../contracts/assets/src/index.js";
import { type CatalogEvent } from "../../../contracts/events/src/index.js";
import { type CaptureReceipt } from "../../../contracts/evidence/src/index.js";
import type { Observation } from "../../../contracts/observations/src/index.js";
import type { OfferRevision } from "../../../contracts/revisions/src/index.js";
import { type RetainedCaptureReceipt, type validateSignerRegistry } from "../../authority/src/index.js";
import type { CompiledCatalogFacts } from "../../compiler/src/index.js";
import { type RetainedCatalogRevision } from "../../evidence-operations/src/retained-revision.js";
import { type Digest } from "../../primitives/src/index.js";
import type { RevisionHistory } from "./identity.js";
export interface LoadedAgentReadinessProfile {
    readonly input: AgentReadinessProfileInput;
    readonly declarationRevision: AgentReadinessDeclarationRevision;
    readonly revision: AgentReadinessRevision;
    readonly offerRelationInputs: readonly AgentReadinessOfferRelationInput[];
    readonly offerRelations: readonly AgentReadinessOfferRelationRevision[];
}
export declare function loadCheckpointRevisions(directory: string): Promise<Map<Digest, RetainedCatalogRevision>>;
export interface ParentInputState {
    readonly captureReceipts: readonly RetainedCaptureReceipt[];
    readonly events: readonly CatalogEvent[];
    readonly observations: readonly Observation[];
    readonly revisions: ReadonlyMap<Digest, RetainedCatalogRevision>;
}
export declare function loadAssetSourceBytes(manifest: AssetManifest, assetRoot: string): Promise<Map<string, Buffer>>;
export declare function missingAssetBytes(path: string): never;
export declare function loadAgentReadinessRevisions(directory: string): Promise<LoadedAgentReadinessProfile[]>;
export declare function validateAgentReadinessClosure(input: {
    readonly profiles: readonly LoadedAgentReadinessProfile[];
    readonly policy: AgentReadinessPolicy;
    readonly entityIds: ReadonlySet<string>;
    readonly offers: ReadonlyMap<string, OfferRevision>;
    readonly events: readonly CatalogEvent[];
    readonly observations: readonly Observation[];
}): void;
export declare function assertAgentReadinessOfferRelationAdmission(input: {
    readonly profiles: readonly {
        readonly revision: Pick<AgentReadinessRevision, "agent_readiness_profile_id" | "entity_id">;
        readonly declarationRevision: Pick<AgentReadinessDeclarationRevision, "revision_digest">;
        readonly offerRelations: readonly AgentReadinessOfferRelationRevision[];
    }[];
    readonly offers: ReadonlyMap<string, OfferRevision>;
}): void;
export declare function projectAgentReadinessIndex(profiles: readonly AgentReadinessProjection[]): AgentReadinessIndex;
export declare function assertAgentReadinessReleaseAdmission(profiles: readonly AgentReadinessProjection[]): void;
export declare function loadEvents(directory: string, registry: ReturnType<typeof validateSignerRegistry>, sequence: number): Promise<CatalogEvent[]>;
/**
 * The former generic verification event remains readable as immutable history,
 * but it is not an authoring surface and must never enter a successor release as
 * newly admitted authority. Current assurance uses the typed Entity and Offer
 * events instead.
 */
export declare function assertNoRetiredVerificationIntroductions(events: readonly CatalogEvent[]): void;
export declare function loadCaptureReceipts(directory: string, registry: ReturnType<typeof validateSignerRegistry>, sequence: number): Promise<CaptureReceipt[]>;
export declare function loadPublicPolicies(directory: string): Promise<{
    schema_version: "sourcey.policy/v1alpha1";
    slug: string;
    title: string;
    summary: string;
    sections: ({
        kind: "prose";
        paragraphs: string[];
        heading?: string | undefined;
    } | {
        kind: "clauses";
        clauses: {
            title: string;
            body: string;
        }[];
        heading?: string | undefined;
    } | {
        kind: "definitions";
        definitions: {
            term: string;
            detail: string;
        }[];
        heading?: string | undefined;
    } | {
        kind: "steps";
        steps: string[];
        heading?: string | undefined;
    })[];
}[]>;
export declare function validateCaptures(observations: readonly Observation[], captureRoot: string, normalizedRoot: string): Promise<{
    readonly captures: Map<Digest, Buffer>;
    readonly normalizedObjects: Map<Digest, Buffer>;
}>;
export declare function unionHistoricalEvents(parent: ParentInputState | null, current: readonly CatalogEvent[]): CatalogEvent[];
export declare function unionHistoricalObservations(parent: ParentInputState | null, current: readonly Observation[]): Observation[];
export declare function unionHistoricalCaptureReceipts(parent: ParentInputState | null, current: readonly CaptureReceipt[]): RetainedCaptureReceipt[];
export declare function unionHistoricalRevisions(parent: ParentInputState | null, facts: CompiledCatalogFacts, agentReadinessRevisions: readonly AgentReadinessRevision[], agentReadinessDeclarationRevisions: readonly AgentReadinessDeclarationRevision[]): {
    readonly all: Map<Digest, RetainedCatalogRevision>;
    readonly currentRevisionDigests: Digest[];
};
export declare function assertEventClosure(revisions: RevisionHistory, events: readonly CatalogEvent[], observations: readonly Observation[]): void;
//# sourceMappingURL=inputs.d.ts.map