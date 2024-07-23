import type { ItemList, WithContext } from "schema-dts"

/**
 * This helper is used to generate an item list ld+json structured data object.
 *
 *
 * Find more information about the item list schema here:
 *
 *
 * @see https://schema.org/ItemList
 * @param itemList ItemList object
 * @returns ItemList object to be used in head via json-ld script tag
 */
export const itemList = (itemList: ItemList): WithContext<ItemList> => {
	return {
		"@context": "https://schema.org",
		...itemList,
	}
}

export type { ItemList }
