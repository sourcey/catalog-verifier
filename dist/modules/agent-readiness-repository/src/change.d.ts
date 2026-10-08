import { type Digest } from "provenry/primitives";
import { AGENT_READINESS_REPOSITORY, type AgentReadinessPolicy } from "../../../contracts/agent-readiness/src/index.js";
import { type AgentReadinessDeclarationBlob } from "./declaration-blob.js";
type AgentReadinessDeclarationDelta = {
    readonly kind: "declaration_added";
    readonly declarationId: string;
    readonly currentRevisionDigest: Digest;
    readonly changedNodeKeys: readonly string[];
} | {
    readonly kind: "declaration_changed";
    readonly declarationId: string;
    readonly priorRevisionDigest: Digest;
    readonly currentRevisionDigest: Digest;
    readonly changedNodeKeys: readonly string[];
} | {
    readonly kind: "declaration_removed";
    readonly declarationId: string;
    readonly priorRevisionDigest: Digest;
    readonly changedNodeKeys: readonly string[];
} | {
    readonly kind: "declaration_unchanged";
    readonly declarationId: string;
    readonly revisionDigest: Digest;
    readonly changedNodeKeys: readonly [];
};
/** One Entity file's change from its base bytes to its head bytes, whatever their source. */
export interface AgentReadinessAuthoringDelta {
    readonly base: AgentReadinessDeclarationBlob | null;
    readonly head: AgentReadinessDeclarationBlob | null;
    readonly entitySubjectChanged: boolean;
    readonly declarations: readonly AgentReadinessDeclarationDelta[];
}
interface AgentReadinessRepositoryPathDelta extends AgentReadinessAuthoringDelta {
    readonly status: "added" | "modified" | "removed";
    readonly path: string;
}
export interface AgentReadinessRepositoryChangePacket {
    readonly change_contract: "sourcey.agent-readiness-repository-change/v1alpha1";
    readonly repository: typeof AGENT_READINESS_REPOSITORY;
    readonly comparisonBase: string;
    readonly baseRootTreeOid: string;
    readonly baseEntitiesTreeOid: string | null;
    readonly headRevision: string;
    readonly headRootTreeOid: string;
    readonly headEntitiesTreeOid: string | null;
    readonly paths: readonly AgentReadinessRepositoryPathDelta[];
    readonly packetDigest: Digest;
}
/**
 * Exact ordinary-change intake. Work is proportional to changed blobs and never
 * constructs the recursive entities manifest retained by explicit cohort audits.
 */
export declare function inspectAgentReadinessRepositoryChangePacket(input: {
    readonly repositoryRoot: string;
    readonly baseRevision: string;
    readonly headRevision: string;
    readonly policy: AgentReadinessPolicy;
}): Promise<AgentReadinessRepositoryChangePacket>;
export declare function verifyAgentReadinessRepositoryChangePacket(input: {
    readonly packet: AgentReadinessRepositoryChangePacket;
    readonly repositoryRoot: string;
    readonly policy: AgentReadinessPolicy;
}): Promise<void>;
export declare function selectedAgentReadinessDeclarationDeltas(packet: AgentReadinessRepositoryChangePacket): readonly AgentReadinessDeclarationDelta[];
/**
 * Compare one Entity file's base and head declarations. The Git change packet
 * and hosted intake both select their planning targets from this delta.
 */
export declare function agentReadinessAuthoringDelta(input: {
    readonly base: AgentReadinessDeclarationBlob | null;
    readonly head: AgentReadinessDeclarationBlob | null;
}): AgentReadinessAuthoringDelta;
export {};
//# sourceMappingURL=change.d.ts.map