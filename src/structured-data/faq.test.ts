import type { FAQPage } from "schema-dts"
import { faq } from "./faq"

describe("faq", () => {
	it("should return an object with the FAQ page", () => {
		const data: FAQPage = {
			"@type": "FAQPage",
			mainEntity: [
				{
					"@type": "Question",
					name: "What is the capital of France?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Paris",
					},
				},
			],
		}

		expect(faq(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})

	it("should return an object with the FAQ page with multiple questions", () => {
		const data: FAQPage = {
			"@type": "FAQPage",
			mainEntity: [
				{
					"@type": "Question",
					name: "What is the capital of France?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Paris",
					},
				},
				{
					"@type": "Question",
					name: "What is the capital of Spain?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Madrid",
					},
				},
			],
		}

		expect(faq(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})

	it("should return an object with the FAQ page with a Question type", () => {
		const data: FAQPage = {
			"@type": "FAQPage",
			mainEntity: [
				{
					"@type": "Question",
					name: "What is the capital of France?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Paris",
					},
				},
				{
					"@type": "Question",
					name: "What is the capital of Spain?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Madrid",
					},
				},
			],
		}

		expect(faq(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})

	it("should return an object with the FAQ page with an Answer type", () => {
		const data: FAQPage = {
			"@type": "FAQPage",
			mainEntity: [
				{
					"@type": "Answer",
					text: "Paris",
				},
				{
					"@type": "Answer",
					text: "Madrid",
				},
			],
		}

		expect(faq(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})

	it("should return an object with the FAQ page with a Question and Answer type", () => {
		const data: FAQPage = {
			"@type": "FAQPage",
			mainEntity: [
				{
					"@type": "Question",
					name: "What is the capital of France?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Paris",
					},
				},
				{
					"@type": "Answer",
					text: "Madrid",
				},
			],
		}

		expect(faq(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})
})
