import { agentReadinessProfileReleaseInputSchema, } from "../../../contracts/agent-readiness/src/index.js";
import { parseReleaseJson } from "../../artifact/src/release-directory-files.js";
import { canonicalJson, digest, digestPathSegment, prettyJson, } from "../../primitives/src/index.js";
import { agentReadinessPublicationInput, } from "./publication-authorities.js";
const prefix = "inputs/agent-readiness-release/";
export function addAgentReadinessPublicationInputs(files, proposals) {
    for (const proposal of proposals) {
        const input = agentReadinessPublicationInput(proposal);
        if (input)
            files.set(`${prefix}${digestPathSegment(digest(input))}.json`, prettyJson(input));
    }
}
/** An admitted profile update binds its complete relation set, including an
 * intentional empty set. Regrading/retirement carries no new admission input. */
export function verifyAgentReadinessPublicationInputs(input) {
    const profiles = new Map();
    const paths = new Set();
    for (const reference of input.proposal.authority_proposals) {
        if (!reference.public_input_digest)
            continue;
        if (reference.purpose !== "catalog-evidence")
            throw new Error("Readiness release input has an unrelated authority purpose.");
        const path = `${prefix}${digestPathSegment(reference.public_input_digest)}.json`;
        if (paths.has(path))
            continue;
        paths.add(path);
        const value = agentReadinessProfileReleaseInputSchema.parse(parseReleaseJson(input.files, path));
        const profileId = value.profile_input.agent_readiness_profile_id;
        const object = input.profiles.get(profileId);
        const previous = profiles.get(profileId);
        if (digest(value) !== reference.public_input_digest ||
            !object?.profile_input ||
            canonicalJson(object.profile_input) !== canonicalJson(value.profile_input) ||
            canonicalJson(object.catalog_context?.declaration_revision) !==
                canonicalJson(value.declaration_revision) ||
            (previous && canonicalJson(previous) !== canonicalJson(value)))
            throw new Error(`Readiness release input ${profileId} differs from its admitted closure.`);
        profiles.set(profileId, value);
    }
    for (const [profileId, object] of input.profiles) {
        if (object.profile_input && !profiles.has(profileId))
            throw new Error(`Readiness profile ${profileId} lacks its admitted release input.`);
    }
    if ([...input.files.keys()].some((path) => path.startsWith(prefix) && !paths.has(path)))
        throw new Error("Readiness release inputs contain unadmitted files.");
    return profiles;
}
//# sourceMappingURL=agent-readiness-publication-inputs.js.map