import type { QAPage, WithContext } from "schema-dts"

/**
 *  This helper is used to generate a QAPage ld+json structured data object.
 * @param qa  QAPage object
 * @see https://schema.org/QAPage
 * @returns Returns a QAPage object to be used in head via json-ld script tag
 */
export const qa = (qa: QAPage): WithContext<QAPage> => {
	return {
		"@context": "https://schema.org",
		...qa,
	}
}

export type { QAPage }
