import type { Product } from "schema-dts"
import { product } from "./product"

describe("product", () => {
	it("should return a product ld+json structured data object", () => {
		const productObject: Product = {
			"@type": "Product",
			name: "Executive Anvil",
			image: ["anvil_executive.jpg"],
			description:
				"Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
			sku: "0446310786",
			mpn: "925872",
			brand: {
				"@type": "Brand",
				name: "ACME",
			},
			review: {
				"@type": "Review",
				reviewRating: {
					"@type": "Rating",
					ratingValue: "4",
					bestRating: "5",
				},
			},
			aggregateRating: {
				"@type": "AggregateRating",
				ratingValue: "4.4",
				reviewCount: "89",
			},
			offers: {
				"@type": "Offer",
				url: "https://example.com/anvil",
				priceCurrency: "USD",
				price: "119.99",
				priceValidUntil: "2020-11-20",
				itemCondition: "https://schema.org/UsedCondition",
				availability: "https://schema.org/InStock",
				seller: {
					"@type": "Organization",
					name: "Executive Objects",
				},
			},
		}

		expect(product(productObject)).toEqual({
			"@context": "https://schema.org",
			...productObject,
		})
	})
})
