import type { QAPage } from "schema-dts"
import { qa } from "./qa"

describe("qa", () => {
	it("returns the correct structured data", () => {
		const data: QAPage = {
			"@type": "QAPage",
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

		expect(qa(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})

	it("returns the correct structured data with a description", () => {
		const data: QAPage = {
			"@type": "QAPage",
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
			description: "Frequently asked questions about European capitals.",
		}

		expect(qa(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})

	it("returns the correct structured data with an image", () => {
		const data: QAPage = {
			"@type": "QAPage",
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
			image: "https://example.com/faq.jpg",
		}

		expect(qa(data)).toEqual({
			"@context": "https://schema.org",
			...data,
		})
	})
})
