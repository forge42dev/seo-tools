import type { EmployerAggregateRating } from "schema-dts"
import { employerRating } from "./employer-rating"

describe("employerRating", () => {
	it("should return structured data for EmployerAggregateRating", () => {
		const employerRatingData: EmployerAggregateRating = {
			"@type": "EmployerAggregateRating",
			itemReviewed: {
				"@type": "Organization",
				name: "Google",
			},
			ratingValue: "4.9",
			ratingCount: "1000",
			bestRating: "5",
			worstRating: "1",
			reviewCount: "1000",
		}
		expect(employerRating(employerRatingData)).toEqual({
			"@context": "https://schema.org",
			...employerRatingData,
		})
	})
})
