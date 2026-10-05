import { digest } from "provenry/primitives";
import { agentReadinessProfileReleaseInputSchema } from "../../../contracts/agent-readiness/src/index.js";
import { mergeCatalogPublicationAuthorityProposalLanes } from "../../catalog-admission/src/publication-authorities.js";
import { catalogPublicationEventDependencyKeys } from "../../catalog-admission/src/publication-dependencies.js";
/** Public canonical input only; private review and model material stay private. */
export function agentReadinessPublicationInput(proposal) {
    if (!proposal.agent_readiness_profile_input)
        return null;
    return agentReadinessProfileReleaseInputSchema.parse({
        release_input_contract: "sourcey.agent-readiness-release-input/v1alpha1",
        profile_input: proposal.agent_readiness_profile_input,
        declaration_revision: proposal.agent_readiness_declaration_revision,
        offer_relation_inputs: proposal.agent_readiness_offer_relation_inputs,
    });
}
/** Every materialization remains admitted independently; only semantic references form a union. */
export function authorityProposalsForBundles(input) {
    return mergeCatalogPublicationAuthorityProposalLanes(...input.evidenceProposals.map((proposal) => {
        const { proposal_digest, event_intents } = proposal;
        const publicInput = agentReadinessPublicationInput(proposal);
        const publicBinding = publicInput ? { public_input_digest: digest(publicInput) } : {};
        const dependency_keys = catalogPublicationEventDependencyKeys(event_intents.map(({ core, event_id }) => ({ ...core, event_id })));
        return [
            { purpose: "catalog-capture", proposal_digest, dependency_keys },
            {
                purpose: "catalog-evidence",
                proposal_digest,
                dependency_keys,
                ...publicBinding,
            },
        ];
    }), ...input.claimBundles.map(({ proposal: { proposal_digest }, events }) => [...new Set(events.map((event) => event.protected.signature_purpose))].map((purpose) => ({
        purpose,
        proposal_digest,
        dependency_keys: catalogPublicationEventDependencyKeys(events.filter((event) => event.protected.signature_purpose === purpose)),
    }))), ...input.assetBundles.map(({ proposals }) => proposals.map(({ proposal_digest }) => ({
        purpose: "catalog-identity",
        proposal_digest,
        // Asset dependencies come from the exact binding/proposal transitions,
        // including candidates whose custody event has not been issued yet.
        dependency_keys: [],
    }))), ...input.identityBundles.map(({ proposal: { proposal_digest }, events }) => [
        {
            purpose: "catalog-identity",
            proposal_digest,
            dependency_keys: catalogPublicationEventDependencyKeys(events),
        },
    ]), ...input.assuranceBundles.map(({ action: { action_digest }, events }) => [
        {
            purpose: "catalog-verification",
            proposal_digest: action_digest,
            dependency_keys: catalogPublicationEventDependencyKeys(events),
        },
    ]));
}
//# sourceMappingURL=publication-authorities.js.map