import type { Car } from "schema-dts"
import { car } from "./car"

describe("car", () => {
	it("should return structured data for a car", () => {
		const structuredData: Car = {
			"@type": "Car",
			brand: "Audi",
			model: "A4",
			vehicleIdentificationNumber: "12345",
		}
		expect(car(structuredData)).toEqual({
			"@context": "https://schema.org",
			...structuredData,
		})
	})

	it("should return structured data for a car with an image", () => {
		const structuredData: Car = {
			"@type": "Car",
			brand: "Audi",
			model: "A4",
			vehicleIdentificationNumber: "12345",
			image: "https://example.com/image.jpg",
		}
		expect(car(structuredData)).toEqual({
			"@context": "https://schema.org",
			...structuredData,
		})
	})

	it("should return structured data for a car with a description", () => {
		const structuredData: Car = {
			"@type": "Car",
			brand: "Audi",
			model: "A4",
			vehicleIdentificationNumber: "12345",
			description: "Audi A4",
		}
		expect(car(structuredData)).toEqual({
			"@context": "https://schema.org",
			...structuredData,
		})
	})
})
