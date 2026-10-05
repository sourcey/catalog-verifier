import { publicationOwnershipRegistry } from "provenry/contracts/publication";
import { RELEASE_RESOURCES } from "../../release/src/index.js";
import { SOURCEY_PUBLICATION_INSTANCE_ID } from "./instance-id.js";
/**
 * What each installed Sourcey adapter owns in a release. Policy and trust objects
 * stay with the catalog core until authority moves into the engine.
 */
export const sourceyReleaseOwnership = publicationOwnershipRegistry({
    instanceId: SOURCEY_PUBLICATION_INSTANCE_ID,
    adapters: [
        {
            adapterId: "catalog",
            resources: [
                RELEASE_RESOURCES.assetIndex,
                RELEASE_RESOURCES.assetInputs,
                RELEASE_RESOURCES.assetManifest,
                RELEASE_RESOURCES.assuranceMethodPolicy,
                RELEASE_RESOURCES.coveragePolicy,
                RELEASE_RESOURCES.freshnessPolicy,
                RELEASE_RESOURCES.identities,
                RELEASE_RESOURCES.observationInputs,
                RELEASE_RESOURCES.observationManifest,
                RELEASE_RESOURCES.policyInputs,
                RELEASE_RESOURCES.provenance,
                RELEASE_RESOURCES.routes,
                RELEASE_RESOURCES.searchIndex,
            ],
            objects: [
                "assets/",
                "authoring/",
                "capture-receipts/",
                "captures/",
                "catalog.json",
                "entities/",
                "events/",
                "evidence/",
                "identities.json",
                "indexes/search.json",
                "inputs/assets.json",
                "inputs/input-set.json",
                "inputs/observations.json",
                "inputs/policies.json",
                "observations/",
                "policies/",
                "provenance/",
                "publication/",
                "revisions/",
                "routes.json",
                "slices/",
                "taxonomy.json",
                "trust/",
            ],
            subjectTypes: ["entity", "program", "offer", "policy", "asset_binding"],
        },
        {
            adapterId: "agent-readiness",
            resources: [
                RELEASE_RESOURCES.agentReadinessIndex,
                RELEASE_RESOURCES.agentReadinessInputs,
                RELEASE_RESOURCES.agentReadinessOfferRelationIndex,
                RELEASE_RESOURCES.agentReadinessOfferRelationInputs,
                RELEASE_RESOURCES.agentReadinessPolicy,
            ],
            objects: [
                "agent-readiness/",
                "agent-readiness-offer-relations/",
                "agent-readiness-regrade-evidence/",
                "indexes/agent-readiness.json",
                "indexes/agent-readiness-offer-relations.json",
                "inputs/agent-readiness.json",
                "inputs/agent-readiness-offer-relations.json",
                "inputs/agent-readiness/",
                "inputs/agent-readiness-offer-relations/",
                "inputs/agent-readiness-release/",
            ],
            subjectTypes: ["agent_readiness_profile"],
        },
    ],
});
//# sourceMappingURL=ownership.js.map