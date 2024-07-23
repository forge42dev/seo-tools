export interface RobotsEntry {
	/**
	 * Array of paths to allow crawling
	 */
	allow?: string[]
	/**
	 * Array of paths to disallow crawling
	 */
	disallow?: string[]
	/**
	 * Sitemap to use for the policy
	 */
	sitemap?: string[]
	/**
	 * User agent to apply the policy to
	 */
	userAgent: string
	/**
	 * Crawl delay for the user agent
	 */
	crawlDelay?: number
}

/**
 * Helper method used to generate a robots.txt from all the provided policies.
 *
 * @param policies - Array of policies to generate from
 * @returns Robots.txt as a string
 */
export function generateRobotsTxt(policies: RobotsEntry[] = []) {
	const robotsTxt = policies
		.map((policy) => {
			const policyText = Object.entries(policy)
				.map(([key, value]) => {
					if (key === "userAgent") {
						return `User-agent: ${value}`
					}
					if (key === "crawlDelay") {
						return `Crawl-delay: ${value}`
					}
					if (key === "allow") {
						return value.map((path: string) => `Allow: ${path}`).join("\n")
					}
					if (key === "disallow") {
						return value.map((path: string) => `Disallow: ${path}`).join("\n")
					}
					return `Sitemap: ${value}`
				})
				.join("\n")
			return policyText
		})
		.join("\n")

	return robotsTxt
}
