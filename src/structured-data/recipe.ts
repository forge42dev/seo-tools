import type { Recipe, WithContext } from "schema-dts"

/**
 *  This helper is used to generate a Recipe ld+json structured data object.
 * @param recipe  Recipe object
 * @see https://schema.org/Recipe
 * @returns Returns a Recipe object to be used in head via json-ld script tag
 */
export const recipe = (recipe: Recipe): WithContext<Recipe> => {
	return {
		"@context": "https://schema.org",
		...recipe,
	}
}

export type { Recipe }
