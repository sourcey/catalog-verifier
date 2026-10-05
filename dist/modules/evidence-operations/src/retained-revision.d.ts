import type { AgentReadinessDeclarationRevision, AgentReadinessRevision } from "../../../contracts/agent-readiness/src/index.js";
import type { EntityRevision, OfferRevision, ProgramRevision } from "../../../contracts/revisions/src/index.js";
export type RetainedCatalogRevision = EntityRevision | ProgramRevision | OfferRevision | AgentReadinessRevision | AgentReadinessDeclarationRevision;
export type RetainedEvidenceBearingRevision = Exclude<RetainedCatalogRevision, AgentReadinessDeclarationRevision>;
/** Parses a revision under the schema its contract names and proves its canonical core. */
export declare function parseRetainedCatalogRevision(value: unknown): RetainedCatalogRevision;
//# sourceMappingURL=retained-revision.d.ts.map