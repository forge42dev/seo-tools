import type { DiscussionForumPosting, WithContext } from "schema-dts"

/**
 *  This helper is used to generate a DiscussionForumPosting ld+json structured data object.
 * @param discussionForum  DiscussionForumPosting object
 * @see https://schema.org/DiscussionForumPosting
 * @returns Returns a DiscussionForumPosting object to be used in head via json-ld script tag
 */
export const discussionForum = (discussionForum: DiscussionForumPosting): WithContext<DiscussionForumPosting> => {
	return {
		"@context": "https://schema.org",
		...discussionForum,
	}
}

export type { DiscussionForumPosting }
