export interface CanonicalLinkOptions {
	/**
	 * Transformer function that generates the alternative url for the link tag by looping through the alternatives
	 * @param params Object containing the url, alternative and domain
	 * @returns The url to be passed to the href attribute of the link tag
	 * ```ts
	 * urlTransformer: ({ url, alternative, domain }) => {
	 * return `${domain}/${alternative}${url}`;
	 * }
	 * ```
	 */
	urlTransformer: (params: { url: string; alternative: string; domain: string }) => string
	/**
	 * Transformer function that generates the attributes for the alternative link tag
	 * @param params Object containing the url, alternative and domain
	 * @returns Record of attributes to be added to the link tag
	 *
	 * ```ts
	 * altAttributesTransformer: ({ url, alternative, domain }) => {
	 *  return {
	 *    hreflang: alternative,
	 *    href: `${domain}/${alternative}${url}`,
	 *  };
	 * }
	 * ```
	 */
	altAttributesTransformer?: (params: { url: string; alternative: string; domain: string }) => Omit<
		CanonicalLink,
		"tagName" | "rel" | "href"
	>
	/**
	 * Array of alternative languages/urls or whatever you want to generate the alternative links for
	 * @example ["en", "bs"]
	 */
	alternatives: string[]
	/**
	 * The domain of the website
	 * @example "https://example.com"
	 */
	domain: string
	/**
	 * The url of the current page
	 * @example "/some-page"
	 */
	url: string
	/**
	 * Object containing the attributes to be added to the canonical link tag
	 * @example {rel: "canonical", href: "https://example.com/some-page"}
	 *
	 * */
	canonicalAttributes?: Record<string, string>
}

export interface CanonicalLink {
	tagName: "link"
	rel: string
	href: string
	[key: string]: string
}

const convertObjectToString = (obj: Record<string, string>) => {
	return Object.entries(obj)
		.map(([key, value]) => `${key}="${value}"`)
		.join(" ")
}

/**
 * Method used to generate the canonical and alternative links for a page
 * @param options CanonicalLinkOptions - Object containing the options for generating the canonical links
 * @param asJson Whether to return the canonical links as an array of objects or a string
 * @returns Returns an array of objects or a string containing the canonical and alternative links
 */
export const generateCanonicalLinks = <T extends boolean>(
	options: CanonicalLinkOptions,
	asJson: T = true as T
): T extends true ? CanonicalLink[] : string => {
	const { urlTransformer, alternatives, domain, canonicalAttributes, url, altAttributesTransformer } = options
	const generatedCanonicalAttributes = canonicalAttributes ? convertObjectToString(canonicalAttributes) : ""
	if (asJson) {
		return [
			{
				tagName: "link",
				rel: "canonical",
				href: `${domain + url}`,
				...(canonicalAttributes ? canonicalAttributes : {}),
			},
			...alternatives.map((alternative) => ({
				tagName: "link" as const,
				rel: "alternate",
				href: urlTransformer({ url, alternative, domain }),
				...(altAttributesTransformer ? altAttributesTransformer({ url, alternative, domain }) : {}),
			})),

			// biome-ignore lint/suspicious/noExplicitAny: TODO: fix this
		] satisfies CanonicalLink[] as any
	}
	return [
		`<link  rel="canonical"  href="${domain + url}" ${generatedCanonicalAttributes}>`,
		...alternatives.map(
			(alternative) =>
				`<link rel="alternate" href="${urlTransformer({ url, alternative, domain })}" ${
					altAttributesTransformer ? convertObjectToString(altAttributesTransformer({ url, alternative, domain })) : ""
				} >`
		),
		// biome-ignore lint/suspicious/noExplicitAny: TODO: fix this
	].join("\n") satisfies string as any
}