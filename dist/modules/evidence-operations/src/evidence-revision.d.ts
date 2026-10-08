import { type EntityRevision, type OfferRevision, type ProgramRevision } from "../../../contracts/revisions/src/index.js";
/** What evidence jobs target: Catalog facts, never readiness ratings, which rest on runs. */
export type EvidenceRevision = EntityRevision | ProgramRevision | OfferRevision;
export declare function parseEvidenceRevision(input: unknown): EvidenceRevision;
//# sourceMappingURL=evidence-revision.d.ts.map