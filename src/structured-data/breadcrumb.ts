/**
 * This helper is used to generate an breadcrumb ld+json structured data object.
 *
 *
 * Find more information about the breadcrumb schema here:
 *
 *
 * https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 * @param fullUrl string representing the current page (e.g. https://localhost:3000/blog/2021/01/01/article)
 * @param names optional string array representing the names of the breadcrumb items, matched 1:1 with the path
 * @returns BreadcrumbLdJson object to be used in head via json-ld script tag
 */
export const breadcrumbs = (fullUrl: string, names?: string[]) => {
	const url = new URL(fullUrl)
	const domain = url.origin
	const path = url.pathname.split("/").filter(Boolean)
	const breadcrumb = path.map((_, index) => {
		const pathToOpen = path.slice(0, index + 1).join("/")
		return {
			"@type": "ListItem",
			position: index + 1,
			name: names?.[index] || _,
			item: `${domain}/${pathToOpen}`,
		}
	})
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: breadcrumb,
	}
}
