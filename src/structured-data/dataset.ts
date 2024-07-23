import type { Dataset, WithContext } from "schema-dts"

/**
 *  This helper is used to generate a dataset ld+json structured data object.
 * @param dataset  Dataset object
 * @see https://schema.org/Dataset
 * @returns Returns a Dataset object to be used in head via json-ld script tag
 */
export const dataset = (dataset: Dataset): WithContext<Dataset> => {
	return {
		"@context": "https://schema.org",
		...dataset,
	}
}

export type { Dataset }
