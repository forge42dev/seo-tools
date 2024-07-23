import type { ItemList } from "schema-dts"
import { itemList } from "./item-list"

describe("itemList", () => {
	it("should return an item list ld+json structured data object", () => {
		const itemListObject: ItemList = {
			"@type": "ItemList",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					url: "https://example.com/page1",
					name: "Page 1",
				},
				{
					"@type": "ListItem",
					position: 2,
					url: "https://example.com/page2",
					name: "Page 2",
				},
			],
		}

		expect(itemList(itemListObject)).toEqual({
			"@context": "https://schema.org",
			...itemListObject,
		})
	})
})
