import { agentReadinessDeclarationRevisionSchema, agentReadinessRevisionSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { entityRevisionSchema, offerRevisionSchema, programRevisionSchema, } from "../../../contracts/revisions/src/index.js";
import { digest } from "../../primitives/src/index.js";
export function parseRetainedCatalogRevision(value) {
    let revision;
    for (const schema of [
        entityRevisionSchema,
        programRevisionSchema,
        offerRevisionSchema,
        agentReadinessRevisionSchema,
        agentReadinessDeclarationRevisionSchema,
    ]) {
        const parsed = schema.safeParse(value);
        if (parsed.success) {
            revision = parsed.data;
            break;
        }
    }
    if (!revision) {
        const candidate = typeof value === "object" && value !== null ? value : {};
        throw new Error(`Retained revision ${String(candidate.revision_digest ?? "unknown")} (${String(candidate.revision_contract ?? "unknown")}) does not use the current revision contract.`);
    }
    const { revision_digest: revisionDigest, ...core } = revision;
    if (digest(core) !== revisionDigest) {
        throw new Error(`Retained revision ${revisionDigest} does not match its canonical core.`);
    }
    return revision;
}
//# sourceMappingURL=retained-revision.js.map