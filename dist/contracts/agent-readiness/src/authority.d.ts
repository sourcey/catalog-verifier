import { z } from "zod";
export declare const AGENT_READINESS_AUTHORITY_BUNDLE_CONTRACT: "sourcey.agent-readiness-authority-bundle/v1alpha1";
/** The bundle's two objects: the public release input and its signed admission. */
export declare const AGENT_READINESS_AUTHORITY_OBJECTS: {
    readonly releaseInput: "release-input.json";
    readonly admission: "admission.json";
};
/**
 * One admitted readiness revision as release authority: the exact public
 * release input (profile input with its run records, declaration revision and
 * Offer relation inputs) and the signed event that admitted it.
 */
export declare const agentReadinessAuthorityBundleCoreSchema: z.ZodObject<{
    bundle_contract: z.ZodLiteral<"sourcey.agent-readiness-authority-bundle/v1alpha1">;
    agent_readiness_profile_id: z.ZodString;
    revision_digest: z.ZodString;
    release_input_digest: z.ZodString;
    admission_event_id: z.ZodString;
    target_signer_registry_digest: z.ZodString;
    objects: z.ZodObject<{
        "release-input.json": z.ZodObject<{
            sha256: z.ZodString;
            bytes: z.ZodNumber;
        }, z.core.$strict>;
        "admission.json": z.ZodObject<{
            sha256: z.ZodString;
            bytes: z.ZodNumber;
        }, z.core.$strict>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const agentReadinessAuthorityBundleManifestSchema: z.ZodObject<{
    bundle_contract: z.ZodLiteral<"sourcey.agent-readiness-authority-bundle/v1alpha1">;
    agent_readiness_profile_id: z.ZodString;
    revision_digest: z.ZodString;
    release_input_digest: z.ZodString;
    admission_event_id: z.ZodString;
    target_signer_registry_digest: z.ZodString;
    objects: z.ZodObject<{
        "release-input.json": z.ZodObject<{
            sha256: z.ZodString;
            bytes: z.ZodNumber;
        }, z.core.$strict>;
        "admission.json": z.ZodObject<{
            sha256: z.ZodString;
            bytes: z.ZodNumber;
        }, z.core.$strict>;
    }, z.core.$strict>;
    bundle_digest: z.ZodString;
}, z.core.$strict>;
export type AgentReadinessAuthorityBundleManifest = z.infer<typeof agentReadinessAuthorityBundleManifestSchema>;
//# sourceMappingURL=authority.d.ts.map