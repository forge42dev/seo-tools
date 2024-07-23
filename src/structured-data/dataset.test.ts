import type { Dataset } from "schema-dts"
import { dataset } from "./dataset"

describe("dataset", () => {
	it("should return a dataset ld+json structured data object", () => {
		const datasetObject: Dataset = {
			"@type": "Dataset",
			name: "Example Dataset",
			url: "https://example.com/dataset",
			description: "This is an example dataset.",
			distribution: [
				{
					"@type": "DataDownload",
					fileFormat: "application/csv",
					contentUrl: "https://example.com/dataset.csv",
				},
			],
		}

		expect(dataset(datasetObject)).toEqual({
			"@context": "https://schema.org",
			...datasetObject,
		})
	})

	it("should return a dataset ld+json structured data object with a DataCatalog type", () => {
		const datasetObject: Dataset = {
			"@type": "Dataset",
			name: "Example Dataset",
			url: "https://example.com/dataset",
			description: "This is an example dataset.",
			includedInDataCatalog: {
				"@type": "DataCatalog",
				name: "Example Data Catalog",
				url: "https://example.com/catalog",
			},
			distribution: [
				{
					"@type": "DataDownload",
					fileFormat: "application/csv",
					contentUrl: "https://example.com/dataset.csv",
				},
			],
		}

		expect(dataset(datasetObject)).toEqual({
			"@context": "https://schema.org",
			...datasetObject,
		})
	})

	it("should return a dataset ld+json structured data object with a DataDownload type", () => {
		const datasetObject: Dataset = {
			"@type": "Dataset",
			name: "Example Dataset",
			url: "https://example.com/dataset",
			description: "This is an example dataset.",
			distribution: [
				{
					"@type": "DataDownload",
					fileFormat: "application/csv",
					contentUrl: "https://example.com/dataset.csv",
				},
			],
		}

		expect(dataset(datasetObject)).toEqual({
			"@context": "https://schema.org",
			...datasetObject,
		})
	})
})
