type MetaDescriptor =
	| {
			charSet: "utf-8"
	  }
	| {
			title: string
	  }
	| {
			name: string
			content: string
	  }
	| {
			property: string
			content: string
	  }
	| {
			httpEquiv: string
			content: string
	  }
	| {
			"script:ld+json": LdJsonObject
	  }
	| {
			tagName: "meta" | "link"
			[name: string]: string
	  }
	| {
			[name: string]: unknown
	  }
type LdJsonObject = {
	[Key in string]: LdJsonValue
} & {
	[Key in string]?: LdJsonValue | undefined
}
type LdJsonArray = LdJsonValue[] | readonly LdJsonValue[]
type LdJsonPrimitive = string | number | boolean | null
type LdJsonValue = LdJsonPrimitive | LdJsonObject | LdJsonArray

export interface MetaData {
	/**
	 * The title of the page.
	 * this will be used as the title of the page and in the meta tags.
	 * this also generates the twitter:title and og:title meta tags.
	 */
	title: string
	/**
	 * The description of the page.
	 * this will be used as the description of the page and in the meta tags.
	 * this also generates the twitter:description and og:description meta tags.
	 */
	description: string
	/**
	 * The keywords of the page.
	 */
	keywords?: string[]
	/**
	 * The url of the page.
	 * this generates the og:url meta tag.
	 */
	url: string
	/**
	 * The image of the page.
	 * this generates the og:image meta tag.
	 */
	image?: string
	/**
	 * The site name of the page.
	 * this generates the og:site_name meta tag.
	 */
	siteName?: string
}
/**
 * Generate meta tags for Remix to be consumed by the meta function.
 *
 * The first argument takes common meta tags like title, description, url, siteName, image, and keywords.
 * Then it generates meta tags for Twitter and Open Graph using the same data.
 *
 * @param metaData - MetaData object
 * @param additionalData - Additional meta tags
 * @returns MetaDescriptor[] - Remix compatible meta tags
 */
export const generateMeta = (metaData: MetaData, additionalData?: MetaDescriptor[]) => {
	const { title, description, url, siteName, image, keywords } = metaData
	return [
		{ title },
		{ name: "twitter:title", content: title },
		{ name: "og:title", content: title },
		{ name: "description", content: description },
		{ name: "twitter:description", content: description },
		{ name: "og:description", content: description },
		{ name: "og:url", content: url },
		...(keywords ? [{ name: "keywords", content: keywords.join(", ") }] : []),
		...(siteName ? [{ name: "og:site_name", content: siteName }] : []),
		...(image ? [{ name: "og:image", content: image }] : []),
		...(additionalData ?? []),
	]
}
