import type { Article } from "schema-dts"
import { article } from "./article"

describe("article", () => {
	it("should return an article ld+json structured data object", () => {
		const articleObject: Article = {
			"@type": "Article",
			headline: "Article headline",
			image: "https://example.com/image.jpg",
			datePublished: "2021-01-01T00:00:00Z",
			dateModified: "2021-01-01T00:00:00Z",
			author: {
				"@type": "Person",
				name: "John Doe",
			},
			publisher: {
				"@type": "Organization",
				name: "Example Publisher",
				logo: {
					"@type": "ImageObject",
					url: "https://example.com/logo.jpg",
				},
			},
			description: "Article description",
		}
		expect(article(articleObject)).toEqual({
			"@context": "https://schema.org",
			...articleObject,
		})
	})

	it("should return an article ld+json structured data object with a NewsArticle type", () => {
		const articleObject: Article = {
			"@type": "NewsArticle",
			headline: "Article headline",
			image: "https://example.com/image.jpg",
			datePublished: "2021-01-01T00:00:00Z",
			dateModified: "2021-01-01T00:00:00Z",
		}

		expect(article(articleObject)).toEqual({
			"@context": "https://schema.org",
			...articleObject,
		})
	})
})
