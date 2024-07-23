import type { JobPosting, WithContext } from "schema-dts"
/**
 *  This helper is used to generate a JobPosting ld+json structured data object.
 * @param jobPosting  JobPosting object
 * @see https://schema.org/JobPosting
 * @returns Returns a JobPosting object to be used in head via json-ld script tag
 */
export const jobPosting = (jobPosting: JobPosting): WithContext<JobPosting> => {
	return {
		"@context": "https://schema.org",
		...jobPosting,
	}
}

export type { JobPosting }
