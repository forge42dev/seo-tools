import type { FAQPage, WithContext } from "schema-dts"

/**
 *  This helper is used to generate a FAQPage ld+json structured data object.
 * @param faq  FAQPage object
 * @see https://schema.org/FAQPage
 * @returns Returns a FAQPage object to be used in head via json-ld script tag
 */
export const faq = (faq: FAQPage): WithContext<FAQPage> => {
	return {
		"@context": "https://schema.org",
		...faq,
	}
}
export type { FAQPage }
