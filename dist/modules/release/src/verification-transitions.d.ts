import type { AgentReadinessDeltaObject, AgentReadinessOfferRelationDeltaObject, AgentReadinessProfileReleaseInput } from "../../../contracts/agent-readiness/src/index.js";
import type { CatalogPublicationChangeSet } from "../../../contracts/publication/src/index.js";
import { type Digest } from "../../primitives/src/index.js";
import type { ReleaseRevision } from "./release-revision-parser.js";
/** Withdrawal is an independently verified transition, not permission to omit
 * an arbitrary live association. All evidence is in this exact delta. */
export declare function verifyAgentReadinessOfferRelationWithdrawals(input: {
    readonly objects: ReadonlyMap<string, AgentReadinessOfferRelationDeltaObject>;
    readonly profiles: ReadonlyMap<string, AgentReadinessDeltaObject>;
    readonly revisions: ReadonlyMap<Digest, ReleaseRevision>;
    readonly changeSet: Pick<CatalogPublicationChangeSet, "revision_changes">;
    readonly retiredProfileIds: ReadonlySet<string>;
    readonly admittedProfileInputs: ReadonlyMap<string, AgentReadinessProfileReleaseInput>;
}): void;
export declare function verifiedAgentReadinessTransitions(objects: ReadonlyMap<string, AgentReadinessDeltaObject>): {
    agent_readiness_profile_id: string;
    input_digest: `sha256:${string}` | null;
    revision_digest: `sha256:${string}` | null;
    projection_digest: `sha256:${string}` | null;
}[];
export declare function verifiedAgentReadinessOfferRelationTransitions(objects: ReadonlyMap<string, AgentReadinessOfferRelationDeltaObject>): {
    relation_id: string;
    input_digest: `sha256:${string}` | null;
    relation_revision_digest: `sha256:${string}` | null;
    previous_relation_revision_digest: `sha256:${string}` | null;
}[];
//# sourceMappingURL=verification-transitions.d.ts.map