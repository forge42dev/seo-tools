import type { Article, WithContext } from "schema-dts"

/**
 * This helper is used to generate an article ld+json structured data object.
 *
 *
 * Find more information about the article schema here:
 * https://developers.google.com/search/docs/appearance/structured-data/article
 *
 * Article objects must be based on one of the following schema.org types: Article, NewsArticle, BlogPosting.
 * - Article: https://schema.org/Article
 * - NewsArticle: https://schema.org/NewsArticle
 * - BlogPosting: https://schema.org/BlogPosting
 *
 * @param article Article object
 * @returns Article object to be used in head via json-ld script tag
 */
export const article = (article: Article): WithContext<Article> => {
	return {
		"@context": "https://schema.org",
		...article,
	}
}

export type { Article }
