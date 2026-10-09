import { DIGEST_PATTERN } from "provenry/primitives";
import { z } from "zod";
import { ENTITY_ID_PATTERN, OFFER_ID_PATTERN, PROGRAM_ID_PATTERN, } from "../../../modules/catalog-primitives/src/index.js";
export const digestSchema = z.string().regex(DIGEST_PATTERN);
export const instantSchema = z.iso.datetime({ offset: true });
export const entityIdSchema = z.string().regex(ENTITY_ID_PATTERN);
export const programIdSchema = z.string().regex(PROGRAM_ID_PATTERN);
export const offerIdSchema = z.string().regex(OFFER_ID_PATTERN);
//# sourceMappingURL=values.js.map