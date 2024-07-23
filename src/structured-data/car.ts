import type { Car, WithContext } from "schema-dts"
/**
 * Helper function to generate a car ld+json structured data object.
 * @param car Car object
 * @returns  object to be used in head via json-ld script tag
 * @see https://schema.org/Car
 */
export const car = (car: Car): WithContext<Car> => {
	return {
		"@context": "https://schema.org",
		...car,
	}
}

export type { Car }
