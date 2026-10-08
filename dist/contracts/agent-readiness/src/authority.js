import { z } from "zod";
import { agentReadinessDigestSchema, agentReadinessProfileIdSchema } from "./shared.js";
export const AGENT_READINESS_AUTHORITY_BUNDLE_CONTRACT = "sourcey.agent-readiness-authority-bundle/v1alpha1";
/** The bundle's two objects: the public release input and its signed admission. */
export const AGENT_READINESS_AUTHORITY_OBJECTS = {
    releaseInput: "release-input.json",
    admission: "admission.json",
};
const objectDeclarationSchema = z
    .object({ sha256: agentReadinessDigestSchema, bytes: z.number().int().nonnegative() })
    .strict();
/**
 * One admitted readiness revision as release authority: the exact public
 * release input (profile input with its run records, declaration revision and
 * Offer relation inputs) and the signed event that admitted it.
 */
export const agentReadinessAuthorityBundleCoreSchema = z
    .object({
    bundle_contract: z.literal(AGENT_READINESS_AUTHORITY_BUNDLE_CONTRACT),
    agent_readiness_profile_id: agentReadinessProfileIdSchema,
    revision_digest: agentReadinessDigestSchema,
    release_input_digest: agentReadinessDigestSchema,
    admission_event_id: agentReadinessDigestSchema,
    target_signer_registry_digest: agentReadinessDigestSchema,
    objects: z
        .object({
        [AGENT_READINESS_AUTHORITY_OBJECTS.releaseInput]: objectDeclarationSchema,
        [AGENT_READINESS_AUTHORITY_OBJECTS.admission]: objectDeclarationSchema,
    })
        .strict(),
})
    .strict();
export const agentReadinessAuthorityBundleManifestSchema = agentReadinessAuthorityBundleCoreSchema
    .safeExtend({ bundle_digest: agentReadinessDigestSchema })
    .strict();
//# sourceMappingURL=authority.js.map