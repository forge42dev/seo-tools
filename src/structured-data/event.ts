import type { Event, WithContext } from "schema-dts"

/**
 *  This helper is used to generate a Event ld+json structured data object.
 * @param event  Event object
 * @see https://schema.org/Event
 * @returns Returns a Event object to be used in head via json-ld script tag
 */
export const event = (event: Event): WithContext<Event> => {
	return {
		"@context": "https://schema.org",
		...event,
	}
}

export type { Event }
