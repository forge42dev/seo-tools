import type { Product, WithContext } from "schema-dts"

/**
 *  This helper is used to generate a Product ld+json structured data object.
 * @param product  Product object
 * @see https://schema.org/Product
 * @returns Returns a Product object to be used in head via json-ld script tag
 */
export const product = (product: Product): WithContext<Product> => {
	return {
		"@context": "https://schema.org",
		...product,
	}
}

export type { Product }
