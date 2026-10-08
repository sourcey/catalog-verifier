import { DIGEST_PATTERN } from "provenry/primitives";
import { z } from "zod";
import { entityIdentityAuthoringSchema, entityProfileAuthoringSchema, } from "../../authoring/src/index.js";
import { domainNameSchema, standingResultSchema } from "../../company-standing/src/index.js";
/** Company intake is shared by every product; it carries no product or Offer. */
export const companySubmissionSchema = z
    .object({
    name: entityIdentityAuthoringSchema.shape.name.trim().max(160),
    domain: domainNameSchema,
    category: entityIdentityAuthoringSchema.shape.category,
    summary: entityProfileAuthoringSchema.shape.summary.unwrap(),
    site_url: entityProfileAuthoringSchema.shape.links.shape.site,
})
    .strict();
export const companyDraftRequestSchema = z
    .object({
    company: companySubmissionSchema,
    standing_result: standingResultSchema,
})
    .strict();
export const companyDraftDiagnosticSchema = z
    .object({
    code: z.enum(["required", "invalid", "conflict", "ineligible"]),
    path: z.string().startsWith("/"),
    message: z.string().trim().min(1).max(1_000),
})
    .strict();
export const companyAuthoringFileSchema = z
    .object({
    path: z.string().regex(/^entities\/[a-z0-9]{1,2}\/[a-z0-9-]+\.yaml$/u),
    content: z.string().min(1),
    content_digest: z.string().regex(DIGEST_PATTERN),
})
    .strict();
export const companyDraftFailureSchema = z
    .object({
    status: z.enum(["invalid", "incomplete", "conflict", "ineligible"]),
    diagnostics: z.array(companyDraftDiagnosticSchema).min(1),
})
    .strict();
//# sourceMappingURL=index.js.map