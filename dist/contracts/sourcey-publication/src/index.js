import { DIGEST_PATTERN } from "provenry/primitives";
import { z } from "zod";
const digest = z.string().regex(DIGEST_PATTERN);
/** Sourcey's closed policy-input declaration. The engine only binds its digest. */
export const releasePolicyInputsSchema = z
    .object({
    input_contract: z.literal("sourcey.policy-inputs/v1alpha1"),
    agent_readiness_policy_digest: digest,
    assurance_method_policy_digest: digest,
    coverage_policy_digest: digest,
    freshness_policy_digest: digest,
    public_policy_digests: z.array(digest).superRefine((values, context) => {
        const canonical = [...new Set(values)].sort();
        if (canonical.length !== values.length ||
            values.some((value, index) => value !== canonical[index])) {
            context.addIssue({
                code: "custom",
                message: "Public policy digests must be canonical and unique.",
            });
        }
    }),
})
    .strict();
/** Sourcey production policy paths, shared by its release and evidence runtimes. */
export const productionReleaseConfigurationSchema = z
    .object({
    configuration_contract: z.literal("sourcey.production-release-configuration/v1alpha1"),
    policy_as_of: z.iso.datetime({ offset: true }),
    paths: z
        .object({
        taxonomy: z.string().min(1),
        root_set: z.string().min(1),
        signer_registry: z.string().min(1),
        agent_readiness_policy: z.string().min(1),
        assurance_method_policy: z.string().min(1),
        coverage_policy: z.string().min(1),
        freshness_policy: z.string().min(1),
        public_policy_root: z.string().min(1),
    })
        .strict(),
})
    .strict();
//# sourceMappingURL=index.js.map