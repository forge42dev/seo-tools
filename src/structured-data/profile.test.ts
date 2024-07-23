import type { ProfilePage } from "schema-dts"
import { profile } from "./profile"

describe("profile", () => {
	it("returns structured data", () => {
		const data: ProfilePage = {
			"@type": "ProfilePage",
			mainEntity: {
				"@type": "Person",
				name: "John Doe",
				jobTitle: "Software Developer",
				worksFor: {
					"@type": "Organization",
					name: "Acme Corp",
				},
			},
		}
		expect(profile(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})

	it("returns structured data with an image", () => {
		const data: ProfilePage = {
			"@type": "ProfilePage",
			mainEntity: {
				"@type": "Person",
				name: "John Doe",
				jobTitle: "Software Developer",
				image: "https://example.com/john-doe.jpg",
			},
		}
		expect(profile(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})

	it("returns structured data with a description", () => {
		const data: ProfilePage = {
			"@type": "ProfilePage",
			mainEntity: {
				"@type": "Person",
				name: "John Doe",
				jobTitle: "Software Developer",
				description: "John Doe is a software developer at Acme Corp.",
			},
		}
		expect(profile(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})

	it("returns structured data with a description and an image", () => {
		const data: ProfilePage = {
			"@type": "ProfilePage",
			mainEntity: {
				"@type": "Person",
				name: "John Doe",
				jobTitle: "Software Developer",
				description: "John Doe is a software developer at Acme Corp.",
				image: "https://example.com/john-doe.jpg",
			},
		}
		expect(profile(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})

	it("returns structured data with a description and an image and an email", () => {
		const data: ProfilePage = {
			"@type": "ProfilePage",
			mainEntity: {
				"@type": "Person",
				name: "John Doe",
				jobTitle: "Software Developer",
				description: "John Doe is a software developer at Acme Corp.",
				image: "https://example.com/john-doe.jpg",
				email: "test@test.com",
			},
		}
		expect(profile(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})
})
