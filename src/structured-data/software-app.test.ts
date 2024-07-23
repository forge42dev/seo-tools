import type { SoftwareApplication } from "schema-dts"
import { softwareApp } from "./software-app"

describe("softwareApp", () => {
	it("should return the correct structured data", () => {
		const data: SoftwareApplication = {
			"@type": "SoftwareApplication",
			name: "Example App",
			applicationCategory: "Game",
			operatingSystem: "Windows",
			offers: {
				"@type": "Offer",
				price: "0.00",
				priceCurrency: "USD",
			},
		}

		expect(softwareApp(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})

	it("should return the correct structured data with an image", () => {
		const data: SoftwareApplication = {
			"@type": "SoftwareApplication",
			name: "Example App",
			applicationCategory: "Game",
			operatingSystem: "Windows",
			offers: {
				"@type": "Offer",
				price: "0.00",
				priceCurrency: "USD",
			},
			image: "https://example.com/example-app.jpg",
		}

		expect(softwareApp(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})

	it("should return the correct structured data with a description", () => {
		const data: SoftwareApplication = {
			"@type": "SoftwareApplication",
			name: "Example App",
			applicationCategory: "Game",
			operatingSystem: "Windows",
			offers: {
				"@type": "Offer",
				price: "0.00",
				priceCurrency: "USD",
			},
			description: "An example app description.",
		}

		expect(softwareApp(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})
})
