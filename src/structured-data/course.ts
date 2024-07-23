import type { Course, WithContext } from "schema-dts"

/**
 * This helper is used to generate a course ld+json structured data object.
 *
 *
 * Find more information about the course schema here:
 *
 *
 * https://developers.google.com/search/docs/appearance/structured-data/course
 * @param course Course object
 * @returns Course object to be used in head via json-ld script tag
 */
export const course = (course: Course): WithContext<Course> => {
	return {
		"@context": "https://schema.org",
		...course,
	}
}

export type { Course }
