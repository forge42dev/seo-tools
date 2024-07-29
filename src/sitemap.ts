import UrlPattern from "url-pattern"

export interface LanguageAlternate {
	hreflang: string
	href: string
}
export interface SitemapVideoEntry {
	url: string
	thumbnailUrl: string
	title: string
	description: string
	contentLocation: string
	playerLocation: string
	duration?: string
	expirationDate?: string
	rating?: string
	viewCount?: string
	publicationDate?: string
	familyFriendly?: "yes" | "no"
	restriction?: { relationship: "allow" | "disallow"; value: string }
	platform?: { relationship: "allow" | "disallow"; value: ("web" | "mobile" | "tv")[] }
	requiresSubscription?: "yes" | "no"
	uploader?: { url?: string; name: string }
	live?: "yes" | "no"
	tags?: string[]
}

export interface SitemapIndexEntry {
	url: string
	lastmod: string
}

export interface SitemapNewsEntry {
	publication: { name: string; language: string }
	publicationDate: string
	title: string
}

export type SitemapImageEntry = string

export interface SitemapEntry {
	route: string
	changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
	priority?: 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0
	lastmod?: string
	images?: string[]
	news?: SitemapNewsEntry[]
	videos?: SitemapVideoEntry[]
	alternateLinks?: LanguageAlternate[]
}

export interface SitemapRoute {
	url: string
	lastmod?: string
	changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
	priority?: 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0
	sitemapEntries?: SitemapEntry | SitemapEntry[]
}

const removeWhitespace = (str: string) =>
	str
		.replaceAll(/>\s+</g, "><")
		.replaceAll(/\s+([^<>\s][^<>]*[^<>\s])\s+/g, " $1 ")
		.replaceAll(/(\s+)/g, " ")
		.trim()

/**
 * Helper method used to generate sitemap-index.xml file from an array of sitemaps
 * @param sitemaps Array of sitemaps with url to the sitemaps and lastmod strings
 * @returns Generated sitemap-index xml file as a string
 */
export const generateSitemapIndex = (sitemaps: SitemapIndexEntry[]) => {
	return removeWhitespace(`<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemaps
			.map(
				(sitemap) => `
          <sitemap>
            <loc>${sitemap.url}</loc>
            <lastmod>${sitemap.lastmod}</lastmod>
          </sitemap>
        `
			)
			.join("\n")}
  </sitemapindex>`)
}

export const generateVideoSitemapData = (videos: SitemapEntry["videos"]) => {
	if (!videos) return ""
	return videos
		?.map((video) => {
			return `
      <video:video>
				<video:title>${video.title}</video:title>
				<video:description>${video.description}</video:description>
				<video:thumbnail_loc>${video.thumbnailUrl}</video:thumbnail_loc>

        <video:content_loc>${video.contentLocation}</video:content_loc>
        <video:player_loc>${video.playerLocation}</video:player_loc>
        ${video.duration ? `<video:duration>${video.duration}</video:duration>` : ""}
        ${video.expirationDate ? `<video:expiration_date>${video.expirationDate}</video:expiration_date>` : ""}
        ${video.rating ? `<video:rating>${video.rating}</video:rating>` : ""}
        ${video.viewCount ? `<video:view_count>${video.viewCount}</video:view_count>` : ""}
        ${video.publicationDate ? `<video:publication_date>${video.publicationDate}</video:publication_date>` : ""}
        ${video.familyFriendly ? `<video:family_friendly>${video.familyFriendly}</video:family_friendly>` : ""}
        ${
					video.restriction
						? `<video:restriction relationship="${video.restriction.relationship}">${video.restriction.value}</video:restriction>`
						: ""
				}
        ${
					video.platform
						? `<video:platform relationship="${video.platform.relationship}">${video.platform.value.join(
								" "
							)}</video:platform>`
						: ""
				}
        ${
					video.requiresSubscription
						? `<video:requires_subscription>${video.requiresSubscription}</video:requires_subscription>`
						: ""
				}
        ${
					video.uploader
						? `<video:uploader${video.uploader.url ? ` info="${video.uploader.url}"` : ""}>${
								video.uploader.name
							}</video:uploader>`
						: ""
				}
        ${video.live ? `<video:live>${video.live}</video:live>` : ""}
        ${video.tags ? video.tags.map((tag) => `<video:tag>${tag}</video:tag>`).join("\n") : ""}
      </video:video>
    `
		})
		.join("\n")
}

export const generateNewsSitemapData = (news: SitemapEntry["news"]) => {
	if (!news) return ""
	return news
		?.map((news) => {
			return `
      <news:news>
        <news:publication>
          <news:name>${news.publication.name}</news:name>
          <news:language>${news.publication.language}</news:language>
        </news:publication>
        <news:publication_date>${news.publicationDate}</news:publication_date>
        <news:title>${news.title}</news:title>
      </news:news>
    `
		})
		.join("\n")
}

export const generateImageSitemapData = (images: SitemapEntry["images"]) => {
	if (!images) return ""
	return images
		?.map((image) => {
			return `
      <image:image>
        <image:loc>${image}</image:loc>
      </image:image>
    `
		})
		.join("\n")
}

export const generateAlternateLinks = (links: SitemapEntry["alternateLinks"]) => {
	if (!links) return ""
	return links
		.map((link) => {
			return `<xhtml:link rel="alternate" hreflang="${link.hreflang}" href="${link.href}" />`
		})
		.join("\n")
}

export const generateSitemapEntry = (entry: SitemapEntry) => {
	const alternateLinks = generateAlternateLinks(entry.alternateLinks)
	const imageLinks = generateImageSitemapData(entry.images)
	const newsLinks = generateNewsSitemapData(entry.news)
	const videoLinks = generateVideoSitemapData(entry.videos)
	if (!entry.route) {
		return ""
	}
	return `
    <url>
      <loc>${entry.route}</loc>
      ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ""}
      ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ""}
      ${entry.priority ? `<priority>${entry.priority}</priority>` : ""}
      ${alternateLinks}
      ${imageLinks}
      ${newsLinks}
      ${videoLinks}
    </url>
  `
}

const generateSitemapString = (generatedEntries: string) => {
	return removeWhitespace(`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-video/1.1 http://www.google.com/schemas/sitemap-video/1.1/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap.xsd http://www.w3.org/TR/xhtml11/xhtml11_schema.html http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html"
        >
      ${generatedEntries}
    </urlset>`)
}

const generateSitemapEntriesFromRoutes = ({
	routes,
	domain,
	ignore,
	urlTransformer,
}: {
	domain: string
	routes: SitemapRoute[]
	ignore: string[]
	urlTransformer?: (url: string) => string
}) => {
	return routes
		.map((route) => {
			// If the route url doesn't start with / prepend it
			const finalLocation = route.url.startsWith("/") ? route.url : `/${route.url}`

			// If the route matches any ignored pattern ignore it completely
			if (ignore.some((pattern) => new UrlPattern(pattern).match(finalLocation) !== null)) {
				return ""
			}

			// If the route has sitemap entries, generate them
			if (route.sitemapEntries) {
				const sitemapEntries = Array.isArray(route.sitemapEntries) ? route.sitemapEntries : [route.sitemapEntries]
				return sitemapEntries.map((entry) => generateSitemapEntry(entry)).join("\n")
			}
			// Allow the user to transform the url before it's added to the sitemap
			const url = urlTransformer ? urlTransformer(finalLocation) : finalLocation
			// Append the url to the domain
			const final = domain + url
			// Otherwise, just return the route as a single entry
			return generateSitemapEntry({
				route: final,
				lastmod: route.lastmod,
				changefreq: route.changefreq,
				priority: route.priority,
			})
		})
		.join("\n")
}

/**
 * Helper method used to generate a sitemap from all the provided routes
 *
 * By default ignores all xml and txt files and any route that matches the pattern "sitemap*"
 *
 *
 * @param domain - The domain to append the urls to
 * @param routes - All the sitemap routes to generate
 * @param ignore - An array of patterns to ignore (e.g. ["/status"])
 * @param urlTransformer - A function to transform the url before adding it to the domain
 * @returns Sitemap returned as a string
 */
export const generateSitemap = async ({
	domain,
	ignore,
	routes,
	urlTransformer,
}: {
	/**
	 * The domain to append the urls to (e.g. https://example.com)
	 */
	domain: string
	/**
	 * All the sitemap routes to generate
	 * @example [{url: "/page", lastmod: "2021-01-01", changefreq: "daily", priority: 0.5}]
	 */
	routes: SitemapRoute[]
	/**
	 * An array of patterns to ignore (e.g. ["/status"])
	 */
	ignore?: string[]
	/**
	 * A function to transform the url before adding it
	 * @example (url) => url.replace("/page", "/new-page")
	 * @default undefined
	 * */
	urlTransformer?: (url: string) => string
}) => {
	const defaultIgnore = ["*.xml", "*.txt", "sitemap*", ...(ignore ?? [])]
	const sitemapEntries = generateSitemapEntriesFromRoutes({ domain, ignore: defaultIgnore, routes, urlTransformer })
	const sitemap = generateSitemapString(sitemapEntries)
	return sitemap
}
