import type { DiscussionForumPosting } from "schema-dts"
import { discussionForum } from "./discussion-forum"

describe("discussionForum", () => {
	it("should return a discussion forum ld+json structured data object", () => {
		const discussionForumObject: DiscussionForumPosting = {
			"@type": "DiscussionForumPosting",
			headline: "Example Discussion Forum",
			articleBody: "This is an example discussion forum.",
			datePublished: "2022-01-01",
			inLanguage: "en",
		}

		expect(discussionForum(discussionForumObject)).toEqual({
			"@context": "https://schema.org",
			...discussionForumObject,
		})
	})

	it("should return a discussion forum ld+json structured data object with a Question type", () => {
		const discussionForumObject: DiscussionForumPosting = {
			"@type": "DiscussionForumPosting",
			hasPart: {
				"@type": "Question",
				text: "What is the meaning of life?",
			},
			headline: "Example Discussion Forum",
			articleBody: "This is an example discussion forum.",
			datePublished: "2022-01-01",
			inLanguage: "en",
		}

		expect(discussionForum(discussionForumObject)).toEqual({
			"@context": "https://schema.org",
			...discussionForumObject,
		})
	})

	it("should return a discussion forum ld+json structured data object with a Answer type", () => {
		const discussionForumObject: DiscussionForumPosting = {
			"@type": "DiscussionForumPosting",
			hasPart: {
				"@type": "Answer",
				text: "The meaning of life is 42.",
			},
			headline: "Example Discussion Forum",
			articleBody: "This is an example discussion forum.",
			datePublished: "2022-01-01",
			inLanguage: "en",
		}

		expect(discussionForum(discussionForumObject)).toEqual({
			"@context": "https://schema.org",
			...discussionForumObject,
		})
	})

	it("should return a discussion forum ld+json structured data object with a Comment type", () => {
		const discussionForumObject: DiscussionForumPosting = {
			"@type": "DiscussionForumPosting",
			hasPart: {
				"@type": "Comment",
				text: "I agree.",
			},
			headline: "Example Discussion Forum",
			articleBody: "This is an example discussion forum.",
			datePublished: "2022-01-01",
			inLanguage: "en",
		}

		expect(discussionForum(discussionForumObject)).toEqual({
			"@context": "https://schema.org",
			...discussionForumObject,
		})
	})

	it("should return a discussion forum ld+json structured data object with a DiscussionForumPosting type", () => {
		const discussionForumObject: DiscussionForumPosting = {
			"@type": "DiscussionForumPosting",
			headline: "Example Discussion Forum",
			articleBody: "This is an example discussion forum.",
			datePublished: "2022-01-01",
			inLanguage: "en",
		}

		expect(discussionForum(discussionForumObject)).toEqual({
			"@context": "https://schema.org",
			...discussionForumObject,
		})
	})

	it("should return a discussion forum ld+json structured data object with a Question and Answer type", () => {
		const discussionForumObject: DiscussionForumPosting = {
			"@type": "DiscussionForumPosting",
			hasPart: [
				{
					"@type": "Question",
					text: "What is the meaning of life?",
				},
				{
					"@type": "Answer",
					text: "The meaning of life is 42.",
				},
			],
			headline: "Example Discussion Forum",
			articleBody: "This is an example discussion forum.",
			datePublished: "2022-01-01",
			inLanguage: "en",
		}

		expect(discussionForum(discussionForumObject)).toEqual({
			"@context": "https://schema.org",
			...discussionForumObject,
		})
	})
})
