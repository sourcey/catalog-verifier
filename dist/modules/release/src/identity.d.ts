import type { AgentReadinessProjection } from "../../../contracts/agent-readiness/src/index.js";
import { type IdentityIndex } from "../../../contracts/artifact/src/index.js";
import type { VerifiedCatalogRelease } from "../../artifact/src/index.js";
import type { CompiledCatalogFacts } from "../../compiler/src/index.js";
import type { RetainedCatalogRevision } from "../../evidence-operations/src/retained-revision.js";
import { type Digest } from "../../primitives/src/index.js";
import type { EventGraph } from "../../provenance/src/index.js";
export interface RevisionHistory {
    readonly all: ReadonlyMap<Digest, RetainedCatalogRevision>;
    readonly currentRevisionDigests: readonly Digest[];
}
export type ParentIdentityState = Pick<VerifiedCatalogRelease, "artifact" | "agentReadinessProfiles">;
export declare function projectIdentities(graph: EventGraph, prior?: IdentityIndex): IdentityIndex;
/** Release projection cannot admit two active claims across connected Entity identities. */
export declare function projectAuthorityClosedIdentities(graph: EventGraph, prior?: IdentityIndex): IdentityIndex;
export declare function validateIdentityClosure(identities: IdentityIndex, revisions: RevisionHistory, facts: CompiledCatalogFacts, agentReadinessProfiles: readonly AgentReadinessProjection[], parent: ParentIdentityState | null, retainedIdentityFloor?: IdentityIndex): void;
//# sourceMappingURL=identity.d.ts.map