import { occupation } from "./occupation"

describe("occupation", () => {
	it("should return an object with the occupation", () => {
		const result = occupation({
			"@type": "Occupation",
			name: "Software Developer",
		})
		expect(result).toEqual({
			"@context": "https://schema.org",
			"@type": "Occupation",
			name: "Software Developer",
		})
	})

	it("should return an object with the occupation and description", () => {
		const result = occupation({
			"@type": "Occupation",
			name: "Software Developer",
			description: "A software developer is a person concerned with facets of software development.",
		})
		expect(result).toEqual({
			"@context": "https://schema.org",
			"@type": "Occupation",
			name: "Software Developer",
			description: "A software developer is a person concerned with facets of software development.",
		})
	})

	it("should return an object with the occupation and alternate name", () => {
		const result = occupation({
			"@type": "Occupation",
			name: "Software Developer",
			alternateName: "Software Engineer",
		})
		expect(result).toEqual({
			"@context": "https://schema.org",
			"@type": "Occupation",
			name: "Software Developer",
			alternateName: "Software Engineer",
		})
	})
})
