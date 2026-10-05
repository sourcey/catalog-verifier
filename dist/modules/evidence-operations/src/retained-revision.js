import { digest } from "provenry/primitives";
import { agentReadinessDeclarationRevisionSchema, agentReadinessRevisionContract, agentReadinessRevisionSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { catalogRevisionContracts, entityRevisionSchema, offerRevisionSchema, programRevisionSchema, } from "../../../contracts/revisions/src/index.js";
/** Parses a revision under the schema its contract names and proves its canonical core. */
export function parseRetainedCatalogRevision(value) {
    const candidate = typeof value === "object" && value !== null ? value : {};
    const parsed = safeParseRevision(candidate.revision_contract, value);
    if (!parsed.success) {
        throw new Error(`Retained revision ${String(candidate.revision_digest ?? "unknown")} (${String(candidate.revision_contract ?? "unknown")}) does not use the current revision contract.`);
    }
    const revision = parsed.data;
    const { revision_digest: revisionDigest, ...core } = revision;
    if (digest(core) !== revisionDigest) {
        throw new Error(`Retained revision ${revisionDigest} does not match its canonical core.`);
    }
    return revision;
}
function safeParseRevision(contract, value) {
    switch (contract) {
        case catalogRevisionContracts.entity:
            return entityRevisionSchema.safeParse(value);
        case catalogRevisionContracts.program:
            return programRevisionSchema.safeParse(value);
        case catalogRevisionContracts.offer:
            return offerRevisionSchema.safeParse(value);
        case agentReadinessRevisionContract:
            return agentReadinessRevisionSchema.safeParse(value);
        default:
            return agentReadinessDeclarationRevisionSchema.safeParse(value);
    }
}
//# sourceMappingURL=retained-revision.js.map