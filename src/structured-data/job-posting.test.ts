import type { JobPosting } from "schema-dts"
import { jobPosting } from "./job-posting"

describe("jobPosting", () => {
	it("should return a JobPosting object", () => {
		const data: JobPosting = {
			"@type": "JobPosting",
			title: "Senior Web Developer",
			description: "We are looking for a senior web developer to join our team.",
			datePosted: "2022-01-01",
			validThrough: "2022-12-31",
			employmentType: "FULL_TIME",
			hiringOrganization: {
				"@type": "Organization",
				name: "Acme Web Development",
				url: "https://example.com",
				logo: "https://example.com/logo.png",
			},
			jobLocation: {
				"@type": "Place",
				address: {
					"@type": "PostalAddress",
					streetAddress: "123 Main St",
					addressLocality: "Springfield",
					addressRegion: "IL",
					postalCode: "62701",
					addressCountry: "US",
				},
			},
			baseSalary: {
				"@type": "MonetaryAmount",
				currency: "USD",
				value: {
					"@type": "QuantitativeValue",
					value: 80000,
					unitText: "YEAR",
				},
			},
			skills: "JavaScript, HTML, CSS",
			experienceRequirements: "5 years",
			educationRequirements: "Bachelor's degree",
			qualifications: "Experience with React, Angular, and Vue",
			responsibilities: "Develop and maintain web applications",
			workHours: "40 hours per week",
			jobBenefits: "Health insurance, paid time off",
			industry: "Web Development",
			occupationalCategory: "15-1134.00",
			jobImmediateStart: true,
		}

		expect(jobPosting(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})
})
