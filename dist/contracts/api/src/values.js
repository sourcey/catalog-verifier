import { DIGEST_PATTERN, IDENTIFIER_PATTERN, OPERATION_ID_PATTERN, SLUG_PATTERN, } from "provenry/primitives";
import { z } from "zod";
import { AGENT_READINESS_PROFILE_ID_PATTERN, ENTITY_ID_PATTERN, OFFER_ID_PATTERN, PROGRAM_ID_PATTERN, } from "../../../modules/catalog-primitives/src/index.js";
export const digest = z.string().regex(DIGEST_PATTERN);
export const nonEmpty = z.string().min(1);
export const entityId = z.string().regex(ENTITY_ID_PATTERN);
export const programId = z.string().regex(PROGRAM_ID_PATTERN);
export const offerId = z.string().regex(OFFER_ID_PATTERN);
export const agentReadinessProfileId = z.string().regex(AGENT_READINESS_PROFILE_ID_PATTERN);
export const slug = z.string().regex(SLUG_PATTERN);
export const identifier = z.string().regex(IDENTIFIER_PATTERN);
export const operationId = z.string().regex(OPERATION_ID_PATTERN);
export const instant = z.iso.datetime({ offset: true });
export const catalogApiContractSchema = z.literal("sourcey.catalog-api/v1");
export function apiEnvelope(data) {
    return z
        .object({
        api_contract: catalogApiContractSchema,
        release_id: digest,
        artifact_sha256: digest,
        data,
    })
        .strict();
}
export function pagedApiEnvelope(data) {
    return apiEnvelope(z.array(data)).extend({
        next_cursor: z.string().min(1).nullable().optional(),
    });
}
//# sourceMappingURL=values.js.map