import type { Organization } from "schema-dts"
import { organization } from "./organization"

describe("organization", () => {
	it("should return an organization ld+json structured data object", () => {
		const organizationObject: Organization = {
			"@type": "Organization",
			name: "Example Publisher",
			logo: {
				"@type": "ImageObject",
				url: "https://example.com/logo.jpg",
			},
		}
		expect(organization(organizationObject)).toEqual({
			"@context": "https://schema.org",
			...organizationObject,
		})
	})

	it("should return an organization ld+json structured data object with a LocalBusiness type", () => {
		const organizationObject: Organization = {
			"@type": "LocalBusiness",
			name: "Example Publisher",
			logo: {
				"@type": "ImageObject",
				url: "https://example.com/logo.jpg",
			},
		}

		expect(organization(organizationObject)).toEqual({
			"@context": "https://schema.org",
			...organizationObject,
		})
	})

	it("should return an organization ld+json structured data object with a Corporation type", () => {
		const organizationObject: Organization = {
			"@type": "Corporation",
			name: "Example Publisher",
			logo: {
				"@type": "ImageObject",
				url: "https://example.com/logo.jpg",
			},
		}

		expect(organization(organizationObject)).toEqual({
			"@context": "https://schema.org",
			...organizationObject,
		})
	})

	it("should return an organization ld+json structured data object with a EducationalOrganization type", () => {
		const organizationObject: Organization = {
			"@type": "EducationalOrganization",
			name: "Example Publisher",
			logo: {
				"@type": "ImageObject",
				url: "https://example.com/logo.jpg",
			},
		}

		expect(organization(organizationObject)).toEqual({
			"@context": "https://schema.org",
			...organizationObject,
		})
	})

	it("should return an organization ld+json structured data object with a GovernmentOrganization type", () => {
		const organizationObject: Organization = {
			"@type": "GovernmentOrganization",
			name: "Example Publisher",
			logo: {
				"@type": "ImageObject",
				url: "https://example.com/logo.jpg",
			},
		}

		expect(organization(organizationObject)).toEqual({
			"@context": "https://schema.org",
			...organizationObject,
		})
	})

	it("should return an organization ld+json structured data object with a NGO type", () => {
		const organizationObject: Organization = {
			"@type": "NGO",
			name: "Example Publisher",
			logo: {
				"@type": "ImageObject",
				url: "https://example.com/logo.jpg",
			},
		}

		expect(organization(organizationObject)).toEqual({
			"@context": "https://schema.org",
			...organizationObject,
		})
	})

	it("should return an organization ld+json structured data object with a PerformingGroup type", () => {
		const organizationObject: Organization = {
			"@type": "PerformingGroup",
			name: "Example Publisher",
			logo: {
				"@type": "ImageObject",
				url: "https://example.com/logo.jpg",
			},
		}

		expect(organization(organizationObject)).toEqual({
			"@context": "https://schema.org",
			...organizationObject,
		})
	})

	it("should return an organization ld+json structured data object with a SportsOrganization type", () => {
		const organizationObject: Organization = {
			"@type": "SportsOrganization",
			name: "Example Publisher",
			logo: {
				"@type": "ImageObject",
				url: "https://example.com/logo.jpg",
			},
		}

		expect(organization(organizationObject)).toEqual({
			"@context": "https://schema.org",
			...organizationObject,
		})
	})

	it("should return an organization ld+json structured data object with a NGO type", () => {
		const organizationObject: Organization = {
			"@type": "NGO",
			name: "Example Publisher",
			logo: {
				"@type": "ImageObject",
				url: "https://example.com/logo.jpg",
			},
		}

		expect(organization(organizationObject)).toEqual({
			"@context": "https://schema.org",
			...organizationObject,
		})
	})

	it("should throw an error if the organization is a string", () => {
		expect(() => organization("Example")).toThrow("Organization must be an object")
	})
})
