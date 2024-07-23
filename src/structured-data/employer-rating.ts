import type { EmployerAggregateRating, WithContext } from "schema-dts"

/**
 *  This helper is used to generate a EmployerAggregateRating ld+json structured data object.
 * @param employerRating  EmployerAggregateRating object
 * @see https://schema.org/EmployerAggregateRating
 * @returns Returns a EmployerAggregateRating object to be used in head via json-ld script tag
 */
export const employerRating = (employerRating: EmployerAggregateRating): WithContext<EmployerAggregateRating> => {
	return {
		"@context": "https://schema.org",
		...employerRating,
	}
}

export type { EmployerAggregateRating }
