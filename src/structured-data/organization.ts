import type { Organization, WithContext } from "schema-dts"

/**
 * This helper is used to generate an organization ld+json structured data object.
 *
 *
 * Find more information about the organization schema here:
 *
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/organization
 * @param organization Organization data object configuration to be used in the structured data
 * @returns Organization object to be used in head via json-ld script tag
 */
export const organization = (organization: Organization): WithContext<Organization> => {
	if (typeof organization === "string") {
		throw new Error("Organization must be an object")
	}
	return {
		"@context": "https://schema.org",
		...organization,
	}
}

export type { Organization }
