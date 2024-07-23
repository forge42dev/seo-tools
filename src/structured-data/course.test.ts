import type { Course } from "schema-dts"
import { course } from "./course"

describe("course", () => {
	it("should return a course ld+json structured data object", () => {
		const courseObject: Course = {
			"@type": "Course",
			name: "Course name",
			description: "Course description",
			provider: {
				"@type": "Organization",
				name: "Example Provider",
			},
			aggregateRating: {
				"@type": "AggregateRating",
				ratingValue: "4.9",
				ratingCount: "100",
			},
		}
		expect(course(courseObject)).toEqual({
			"@context": "https://schema.org",
			...courseObject,
		})
	})

	it("should return a course ld+json structured data object with a CourseInstance type", () => {
		const courseObject: Course = {
			"@type": "Course",
			hasCourseInstance: [
				{
					"@type": "CourseInstance",
					name: "Course name",
					description: "Course description",
					startDate: "2021-01-01",
					endDate: "2021-12-31",
				},
			],
			name: "Course name",
			description: "Course description",
			provider: {
				"@type": "Organization",
				name: "Example Provider",
			},
			aggregateRating: {
				"@type": "AggregateRating",
				ratingValue: "4.9",
				ratingCount: "100",
			},
		}

		expect(course(courseObject)).toEqual({
			"@context": "https://schema.org",
			...courseObject,
		})
	})

	it("should return a course ld+json structured data object with a VideoObject type", () => {
		const courseObject: Course = {
			"@type": "Course",
			video: {
				"@type": "VideoObject",
				name: "Course name",
				description: "Course description",
				thumbnailUrl: "https://example.com/image.jpg",
			},
			name: "Course name",
			description: "Course description",
			provider: {
				"@type": "Organization",
				name: "Example Provider",
			},
			aggregateRating: {
				"@type": "AggregateRating",
				ratingValue: "4.9",
				ratingCount: "100",
			},
		}

		expect(course(courseObject)).toEqual({
			"@context": "https://schema.org",
			...courseObject,
		})
	})

	it("should return a course ld+json structured data object with a WebPage type", () => {
		const courseObject: Course = {
			"@type": "Course",
			mainEntityOfPage: {
				"@type": "WebPage",
				"@id": "https://example.com/course",
			},
			name: "Course name",
			description: "Course description",
			provider: {
				"@type": "Organization",
				name: "Example Provider",
			},
			aggregateRating: {
				"@type": "AggregateRating",
				ratingValue: "4.9",
				ratingCount: "100",
			},
		}

		expect(course(courseObject)).toEqual({
			"@context": "https://schema.org",
			...courseObject,
		})
	})
})
