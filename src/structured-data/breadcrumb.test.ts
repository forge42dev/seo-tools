import { breadcrumbs } from "./breadcrumb"

describe("breadcrumbs", () => {
	it("should return a breadcrumb ld+json structured data object", () => {
		expect(breadcrumbs("https://localhost:3000/blog/2021/01/01/article")).toEqual({
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: "blog",
					item: "https://localhost:3000/blog",
				},
				{
					"@type": "ListItem",
					position: 2,
					name: "2021",
					item: "https://localhost:3000/blog/2021",
				},
				{
					"@type": "ListItem",
					position: 3,
					name: "01",
					item: "https://localhost:3000/blog/2021/01",
				},
				{
					"@type": "ListItem",
					position: 4,
					name: "01",
					item: "https://localhost:3000/blog/2021/01/01",
				},
				{
					"@type": "ListItem",
					position: 5,
					name: "article",
					item: "https://localhost:3000/blog/2021/01/01/article",
				},
			],
		})
	})

	it("should work with http urls", () => {
		expect(breadcrumbs("http://localhost:3000/blog/2021/01/01/article")).toEqual({
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: "blog",
					item: "http://localhost:3000/blog",
				},
				{
					"@type": "ListItem",
					position: 2,
					name: "2021",
					item: "http://localhost:3000/blog/2021",
				},
				{
					"@type": "ListItem",
					position: 3,
					name: "01",
					item: "http://localhost:3000/blog/2021/01",
				},
				{
					"@type": "ListItem",
					position: 4,
					name: "01",
					item: "http://localhost:3000/blog/2021/01/01",
				},
				{
					"@type": "ListItem",
					position: 5,
					name: "article",
					item: "http://localhost:3000/blog/2021/01/01/article",
				},
			],
		})
	})
	it("should return a breadcrumb ld+json structured data object with custom names", () => {
		expect(
			breadcrumbs("https://localhost:3000/blog/2021/01/01/article", ["Home", "Year", "Month", "Day", "Article"])
		).toEqual({
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: "https://localhost:3000/blog",
				},
				{
					"@type": "ListItem",
					position: 2,
					name: "Year",
					item: "https://localhost:3000/blog/2021",
				},
				{
					"@type": "ListItem",
					position: 3,
					name: "Month",
					item: "https://localhost:3000/blog/2021/01",
				},
				{
					"@type": "ListItem",
					position: 4,
					name: "Day",
					item: "https://localhost:3000/blog/2021/01/01",
				},
				{
					"@type": "ListItem",
					position: 5,
					name: "Article",
					item: "https://localhost:3000/blog/2021/01/01/article",
				},
			],
		})
	})
})
