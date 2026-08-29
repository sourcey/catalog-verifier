import { z } from "zod";
import { DIGEST_PATTERN } from "../../../modules/primitives/src/index.js";
import { releaseChangeSchema } from "../../artifact/src/index.js";
import { protectedSignatureSchema } from "../../authority/src/index.js";
const digest = z.string().regex(DIGEST_PATTERN);
export const changeCursorCoreSchema = z
    .object({
    cursor_contract: z.literal("sourcey.change-cursor/v1alpha1"),
    signer_registry_digest: digest,
    release_id: digest,
    diff_digest: digest,
    next_ordinal: z.number().int().nonnegative(),
    preceding_change_id: digest.nullable(),
})
    .strict();
export const changeCursorSchema = changeCursorCoreSchema
    .extend({
    cursor_digest: digest,
    protected: protectedSignatureSchema,
})
    .strict();
export const searchCursorCoreSchema = z
    .object({
    cursor_contract: z.literal("sourcey.search-cursor/v1alpha1"),
    signer_registry_digest: digest,
    release_id: digest,
    query_digest: digest,
    sort_contract: z.literal("sourcey.search-sort/relevance-id-v1"),
    next_ordinal: z.number().int().nonnegative(),
})
    .strict();
export const searchCursorSchema = searchCursorCoreSchema
    .extend({
    cursor_digest: digest,
    protected: protectedSignatureSchema,
})
    .strict();
export const changeFeedPageSchema = z
    .object({
    feed_contract: z.literal("sourcey.catalog-feed/v1alpha1"),
    release_id: digest,
    snapshot_id: digest,
    diff_digest: digest,
    retained_from_release_id: digest,
    data: z.array(releaseChangeSchema),
    next_cursor: z.string().min(1).nullable(),
})
    .strict();
export const catalogJsonFeedSchema = z
    .object({
    version: z.literal("https://jsonfeed.org/version/1.1"),
    title: z.literal("Sourcey catalog changes"),
    home_page_url: z.url(),
    feed_url: z.url(),
    _sourcey: z
        .object({
        release_id: digest,
        snapshot_id: digest,
        diff_digest: digest,
    })
        .strict(),
    items: z.array(z
        .object({
        id: digest,
        url: z.url(),
        title: z.string().min(1),
        date_published: z.iso.datetime({ offset: true }),
        content_text: z.string().min(1),
        _sourcey: z
            .object({
            release_id: digest,
            change: releaseChangeSchema,
        })
            .strict(),
    })
        .strict()),
})
    .strict();
//# sourceMappingURL=index.js.map