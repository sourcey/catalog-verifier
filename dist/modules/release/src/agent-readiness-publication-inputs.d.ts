import { type AgentReadinessDeltaObject, type AgentReadinessProfileReleaseInput } from "../../../contracts/agent-readiness/src/index.js";
import type { CatalogPublicationProposal } from "../../../contracts/publication/src/index.js";
export declare function addAgentReadinessPublicationInputs(files: Map<string, string | Buffer>, releaseInputs: readonly AgentReadinessProfileReleaseInput[]): void;
/** An admitted profile update binds its complete relation set, including an
 * intentional empty set. Regrading/retirement carries no new admission input. */
export declare function verifyAgentReadinessPublicationInputs(input: {
    readonly files: ReadonlyMap<string, Buffer>;
    readonly proposal: CatalogPublicationProposal;
    readonly profiles: ReadonlyMap<string, AgentReadinessDeltaObject>;
}): ReadonlyMap<string, AgentReadinessProfileReleaseInput>;
//# sourceMappingURL=agent-readiness-publication-inputs.d.ts.map