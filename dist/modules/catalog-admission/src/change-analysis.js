import { compileAuthoringEntities } from "../../compiler/src/index.js";
import { analyzeCatalogCandidateChanges } from "./publication.js";
import { catalogSubmissionCandidates, catalogSubmissionReviewCandidates, verifyCatalogSubmissionWorkItem, } from "./submission-input.js";
import { verifyCatalogSubmissionPublicationState } from "./submission-state.js";
const CATALOG_ENTITY_ROOT = "entities";
/**
 * Analyze retained non-Git submission bytes through the same compiler and
 * semantic diff used by Git admission. This adapter contains no transport
 * coordinates and performs no publication planning or effects.
 */
export function analyzeCatalogSubmissionWorkItem(input) {
    const workItem = verifyCatalogSubmissionWorkItem(input.workItem);
    const currentState = verifyCatalogSubmissionPublicationState({
        workItem,
        baseState: input.baseState,
        currentState: input.currentState,
    });
    if (workItem.request.remove_entity_ids.length > 0) {
        throw new Error("Submission admission analysis does not accept Entity removal requests.");
    }
    const { candidateEntities } = input.reviewedAuthoringFiles
        ? catalogSubmissionReviewCandidates({
            workItem,
            reviewedAuthoringFiles: input.reviewedAuthoringFiles,
        })
        : catalogSubmissionCandidates(workItem);
    const closure = compileAuthoringEntities(candidateEntities, {
        allowExternalRoleEntities: true,
    });
    const changedEntities = catalogChangedEntitiesFromCurrent({
        currentEntities: currentState.current_entities,
        candidates: closure,
    });
    return {
        baseRevision: workItem.live_parent_release_id,
        entityFiles: (input.reviewedAuthoringFiles ?? workItem.request.authoring_files).map(({ path }) => path.slice(`${CATALOG_ENTITY_ROOT}/`.length)),
        unsupportedChanges: [],
        changedEntities,
        changedRevisions: catalogChangedRevisions(changedEntities),
        closure,
        entities: closure.entities.length,
        programs: closure.entities.flatMap((entity) => entity.programs).length,
        offers: closure.entities.flatMap((entity) => entity.offers).length,
    };
}
/** Compare compiled candidates with the exact live authoring slice, regardless of ingress. */
export function catalogChangedEntitiesFromCurrent(input) {
    const currentAuthoring = new Map(input.currentEntities.map((entity) => [entity.entity.entity_id, entity]));
    const candidateAuthoring = new Map(input.candidates.authoring.map((entity) => [entity.entity.entity_id, entity]));
    const semantic = analyzeCatalogCandidateChanges({
        currentEntities: input.currentEntities.filter((entity) => candidateAuthoring.has(entity.entity.entity_id)),
        candidateEntities: input.candidates.authoring,
    });
    return input.candidates.entities.map((entity) => {
        const entityId = entity.revision.entity_id;
        const current = candidateAuthoring.get(entityId);
        if (!current)
            throw new Error(`Compiled Entity '${entityId}' has no authoring.`);
        const changes = semantic.revisionChanges.filter(({ entity_id: changedEntityId }) => changedEntityId === entityId);
        return {
            entity,
            currentAuthoring: current,
            priorAuthoring: currentAuthoring.get(entityId) ?? null,
            entityChanged: changes.some(({ kind }) => kind === "entity"),
            changedProgramIds: changes
                .filter(({ kind }) => kind === "program")
                .map(({ target_id: targetId }) => targetId),
            changedOfferIds: changes
                .filter(({ kind }) => kind === "offer")
                .map(({ target_id: targetId }) => targetId),
        };
    });
}
export function catalogChangedRevisions(changes) {
    return changes.flatMap(({ entity, entityChanged, changedProgramIds, changedOfferIds }) => [
        ...(entityChanged
            ? [
                {
                    owner: entity,
                    kind: "entity",
                    targetId: entity.revision.entity_id,
                    revisionDigest: entity.revision.revision_digest,
                    title: entity.revision.content.name,
                    accessUrl: entity.revision.content.links.site,
                    termsUrl: null,
                    sourceIds: entity.sources.map(({ source_id: sourceId }) => sourceId),
                },
            ]
            : []),
        ...entity.programs
            .filter(({ revision }) => changedProgramIds.includes(revision.program_id))
            .map((program) => ({
            owner: entity,
            kind: "program",
            targetId: program.revision.program_id,
            revisionDigest: program.revision.revision_digest,
            title: program.revision.content.title,
            accessUrl: null,
            termsUrl: null,
            sourceIds: program.sourceIds,
        })),
        ...entity.offers
            .filter(({ revision }) => changedOfferIds.includes(revision.offer_id))
            .map((offer) => ({
            owner: entity,
            kind: "offer",
            targetId: offer.revision.offer_id,
            revisionDigest: offer.revision.revision_digest,
            title: offer.revision.content.title,
            accessUrl: offer.revision.content.access.url ?? null,
            termsUrl: offer.revision.content.terms_url ?? null,
            sourceIds: offer.sourceIds,
        })),
    ]);
}
//# sourceMappingURL=change-analysis.js.map