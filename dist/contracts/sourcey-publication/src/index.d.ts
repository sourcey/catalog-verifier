import { z } from "zod";
/** Sourcey's closed policy-input declaration. The engine only binds its digest. */
export declare const releasePolicyInputsSchema: z.ZodObject<{
    input_contract: z.ZodLiteral<"sourcey.policy-inputs/v1alpha1">;
    agent_readiness_policy_digest: z.ZodString;
    assurance_method_policy_digest: z.ZodString;
    coverage_policy_digest: z.ZodString;
    freshness_policy_digest: z.ZodString;
    public_policy_digests: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
/** Sourcey production policy paths, shared by its release and evidence runtimes. */
export declare const productionReleaseConfigurationSchema: z.ZodObject<{
    configuration_contract: z.ZodLiteral<"sourcey.production-release-configuration/v1alpha1">;
    policy_as_of: z.ZodISODateTime;
    paths: z.ZodObject<{
        taxonomy: z.ZodString;
        root_set: z.ZodString;
        signer_registry: z.ZodString;
        agent_readiness_policy: z.ZodString;
        assurance_method_policy: z.ZodString;
        coverage_policy: z.ZodString;
        freshness_policy: z.ZodString;
        public_policy_root: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export type ProductionReleaseConfiguration = z.infer<typeof productionReleaseConfigurationSchema>;
//# sourceMappingURL=index.d.ts.map