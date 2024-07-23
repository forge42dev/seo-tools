import type { Event } from "schema-dts"
import { event } from "./event"

describe("event", () => {
	it("should create structured data", () => {
		const data: Event = {
			"@type": "Event",
			name: "Foo",
			startDate: "2022-01-01",
			endDate: "2022-01-02",
			location: {
				"@type": "Place",
				name: "Bar",
				address: "Baz",
			},
		}
		expect(event(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})

	it("should create structured data with offers", () => {
		const data: Event = {
			"@type": "Event",
			name: "Foo",
			startDate: "2022-01-01",
			endDate: "2022-01-02",
			location: {
				"@type": "Place",
				name: "Bar",
				address: "Baz",
			},
			offers: {
				"@type": "Offer",
				url: "https://example.com",
				price: "100.00",
				priceCurrency: "USD",
				availability: "https://schema.org/InStock",
			},
		}
		expect(event(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})

	it("should create structured data with offers and performer", () => {
		const data: Event = {
			"@type": "Event",
			name: "Foo",
			startDate: "2022-01-01",
			endDate: "2022-01-02",
			location: {
				"@type": "Place",
				name: "Bar",
				address: "Baz",
			},
			offers: {
				"@type": "Offer",
				url: "https://example.com",
				price: "100.00",
				priceCurrency: "USD",
				availability: "https://schema.org/InStock",
			},
			performer: {
				"@type": "Person",
				name: "John Doe",
			},
		}
		expect(event(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})

	it("should create structured data with offers and performer and organizer", () => {
		const data: Event = {
			"@type": "Event",
			name: "Foo",
			startDate: "2022-01-01",
			endDate: "2022-01-02",
			location: {
				"@type": "Place",
				name: "Bar",
				address: "Baz",
			},
			offers: {
				"@type": "Offer",
				url: "https://example.com",
				price: "100.00",
				priceCurrency: "USD",
				availability: "https://schema.org/InStock",
			},
			performer: {
				"@type": "Person",
				name: "John Doe",
			},
			organizer: {
				"@type": "Organization",
				name: "Example Organizer",
			},
		}
		expect(event(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})

	it("should create structured data with offers and performer and organizer and image", () => {
		const data: Event = {
			"@type": "Event",
			name: "Foo",
			startDate: "2022-01-01",
			endDate: "2022-01-02",
			location: {
				"@type": "Place",
				name: "Bar",
				address: "Baz",
			},
			offers: {
				"@type": "Offer",
				url: "https://example.com",
				price: "100.00",
				priceCurrency: "USD",
				availability: "https://schema.org/InStock",
			},
			performer: {
				"@type": "Person",
				name: "John Doe",
			},
			organizer: {
				"@type": "Organization",
				name: "Example Organizer",
			},
			image: "https://example.com/image.jpg",
		}
		expect(event(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})

	it("should create structured data with offers and performer and organizer and image and description", () => {
		const data: Event = {
			"@type": "Event",
			name: "Foo",
			startDate: "2022-01-01",
			endDate: "2022-01-02",
			location: {
				"@type": "Place",
				name: "Bar",
				address: "Baz",
			},
			offers: {
				"@type": "Offer",
				url: "https://example.com",
				price: "100.00",
				priceCurrency: "USD",
				availability: "https://schema.org/InStock",
			},
			performer: {
				"@type": "Person",
				name: "John Doe",
			},
			organizer: {
				"@type": "Organization",
				name: "Example Organizer",
			},
			image: "https://example.com/image.jpg",
			description: "Event description",
		}
		expect(event(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})
})
