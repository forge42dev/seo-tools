import type { ImageObject } from "schema-dts"
import { image } from "./image"

describe("image", () => {
	it("should create structured data", () => {
		const structuredData: ImageObject = {
			"@type": "ImageObject",
			url: "https://example.com/image.jpg",
			width: "800",
			height: "600",
		}
		expect(image(structuredData)).toEqual({
			"@context": "https://schema.org",
			...structuredData,
		})
	})

	it("should create structured data with a caption", () => {
		const structuredData: ImageObject = {
			"@type": "ImageObject",
			url: "https://example.com/image.jpg",
			width: "800",
			height: "600",
			caption: "An example image",
		}
		expect(image(structuredData)).toEqual({
			"@context": "https://schema.org",
			...structuredData,
		})
	})

	it("should create structured data with a description", () => {
		const structuredData: ImageObject = {
			"@type": "ImageObject",
			url: "https://example.com/image.jpg",
			width: "800",
			height: "600",
			description: "An example image",
		}
		expect(image(structuredData)).toEqual({
			"@context": "https://schema.org",
			...structuredData,
		})
	})

	it("should create structured data with a name", () => {
		const structuredData: ImageObject = {
			"@type": "ImageObject",
			url: "https://example.com/image.jpg",
			width: "800",
			height: "600",
			name: "Example Image",
		}
		expect(image(structuredData)).toEqual({
			"@context": "https://schema.org",
			...structuredData,
		})
	})

	it("should create structured data with a thumbnail url", () => {
		const structuredData: ImageObject = {
			"@type": "ImageObject",
			url: "https://example.com/image.jpg",
			width: "800",
			height: "600",
			thumbnailUrl: "https://example.com/image-thumbnail.jpg",
		}
		expect(image(structuredData)).toEqual({
			"@context": "https://schema.org",
			...structuredData,
		})
	})

	it("should create structured data with a thumbnail image", () => {
		const structuredData: ImageObject = {
			"@type": "ImageObject",
			url: "https://example.com/image.jpg",
			width: "800",
			height: "600",
			thumbnail: {
				"@type": "ImageObject",
				url: "https://example.com/image-thumbnail.jpg",
				width: "400",
				height: "300",
			},
		}
		expect(image(structuredData)).toEqual({
			"@context": "https://schema.org",
			...structuredData,
		})
	})

	it("should create structured data with a license", () => {
		const structuredData: ImageObject = {
			"@type": "ImageObject",
			url: "https://example.com/image.jpg",
			width: "800",
			height: "600",
			license: "https://example.com/license",
		}
		expect(image(structuredData)).toEqual({
			"@context": "https://schema.org",
			...structuredData,
		})
	})

	it("should create structured data with a representative of page", () => {
		const structuredData: ImageObject = {
			"@type": "ImageObject",
			url: "https://example.com/image.jpg",
			width: "800",
			height: "600",
			representativeOfPage: true,
		}
		expect(image(structuredData)).toEqual({
			"@context": "https://schema.org",
			...structuredData,
		})
	})
})
