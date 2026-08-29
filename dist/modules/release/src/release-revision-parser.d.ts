import { type AgentReadinessDeclarationRevision, type AgentReadinessRevision } from "../../../contracts/agent-readiness/src/index.js";
import { type EntityRevision, type OfferRevision, type ProgramRevision } from "../../../contracts/revisions/src/index.js";
export type ReleaseRevision = EntityRevision | ProgramRevision | OfferRevision | AgentReadinessRevision | AgentReadinessDeclarationRevision;
export declare function parseReleaseRevision(value: unknown): ReleaseRevision;
//# sourceMappingURL=release-revision-parser.d.ts.map