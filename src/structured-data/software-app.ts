import type { SoftwareApplication, WithContext } from "schema-dts"

/**
 *  This helper is used to generate a SoftwareApplication ld+json structured data object.
 * @param softwareApp  SoftwareApplication object
 * @see https://schema.org/SoftwareApplication
 * @returns Returns a SoftwareApplication object to be used in head via json-ld script tag
 */
export const softwareApp = (softwareApp: SoftwareApplication): WithContext<SoftwareApplication> => {
	return {
		"@context": "https://schema.org",
		...softwareApp,
	}
}

export type { SoftwareApplication }
