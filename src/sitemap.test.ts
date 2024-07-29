import {
	type SitemapEntry,
	type SitemapImageEntry,
	type SitemapNewsEntry,
	type SitemapVideoEntry,
	generateAlternateLinks,
	generateImageSitemapData,
	generateNewsSitemapData,
	generateSitemap,
	generateSitemapEntry,
	generateSitemapIndex,
	generateVideoSitemapData,
} from "./sitemap"
const removeWhitespace = (str: string) =>
	str
		.replaceAll(/>\s+</g, "><")
		.replaceAll(/\s+([^<>\s][^<>]*[^<>\s])\s+/g, " $1 ")
		.replaceAll(/(\s+)/g, " ")
		.trim()

describe("generateSitemapIndex", () => {
	it("should generate a sitemap index with multiple sitemaps", () => {
		const sitemaps = [
			{ url: "https://example.com/sitemap1.xml", lastmod: "2021-01-01" },
			{ url: "https://example.com/sitemap2.xml", lastmod: "2021-01-02" },
		]
		const expectedSitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		<sitemap>
			<loc>https://example.com/sitemap1.xml</loc>
			<lastmod>2021-01-01</lastmod>
		</sitemap>
		<sitemap>
			<loc>https://example.com/sitemap2.xml</loc>
			<lastmod>2021-01-02</lastmod>
		</sitemap>
</sitemapindex>`
		expect(removeWhitespace(generateSitemapIndex(sitemaps))).toEqual(removeWhitespace(expectedSitemapIndex))
	})

	it("should generate sitemap index with a single sitemap", () => {
		const sitemaps = [{ url: "https://example.com/sitemap1.xml", lastmod: "2021-01-01" }]
		const expectedSitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		<sitemap>
			<loc>https://example.com/sitemap1.xml</loc>
			<lastmod>2021-01-01</lastmod>
		</sitemap>
</sitemapindex>`
		expect(removeWhitespace(generateSitemapIndex(sitemaps))).toEqual(removeWhitespace(expectedSitemapIndex))
	})
})

describe("generateVideoSitemapData", () => {
	it("should generate video sitemap data with all properties properly set", () => {
		const videos: SitemapVideoEntry[] = [
			{
				title: "Video title",
				description: "Video description",
				thumbnailUrl: "https://example.com",
				url: "https://example.com/video.mp4",
				contentLocation: "https://example.com/video.mp4",
				playerLocation: "https://example.com/player",
				duration: "600",
				expirationDate: "2022-01-01",
				rating: "4.2",
				viewCount: "100",
				publicationDate: "2021-01-01",
				familyFriendly: "yes",
				restriction: { relationship: "allow", value: "IE GB US CA" },
				platform: { relationship: "allow", value: ["web", "mobile"] },
				requiresSubscription: "no",
				uploader: { name: "John Doe", url: "https://example.com/johndoe" },
				live: "no",
				tags: ["tag1", "tag2"],
			},
		]
		const expectedVideoSitemapData = `
			<video:video>
				<video:title>Video title</video:title>
				<video:description>Video description</video:description>
				<video:thumbnail_loc>https://example.com</video:thumbnail_loc>
				<video:content_loc>https://example.com/video.mp4</video:content_loc>
				<video:player_loc>https://example.com/player</video:player_loc>
				<video:duration>600</video:duration>
				<video:expiration_date>2022-01-01</video:expiration_date>
				<video:rating>4.2</video:rating>
				<video:view_count>100</video:view_count>
				<video:publication_date>2021-01-01</video:publication_date>
				<video:family_friendly>yes</video:family_friendly>
				<video:restriction relationship="allow">IE GB US CA</video:restriction>
				<video:platform relationship="allow">web mobile</video:platform>
				<video:requires_subscription>no</video:requires_subscription>
				<video:uploader info="https://example.com/johndoe">John Doe</video:uploader>
				<video:live>no</video:live>
				<video:tag>tag1</video:tag>
				<video:tag>tag2</video:tag>
			</video:video>`
		expect(removeWhitespace(generateVideoSitemapData(videos))).toEqual(removeWhitespace(expectedVideoSitemapData))
	})

	it("should generate the core video sitemap data", () => {
		const videos: SitemapVideoEntry[] = [
			{
				title: "Video title",
				description: "Video description",
				thumbnailUrl: "https://example.com",
				url: "https://example.com/video.mp4",
				contentLocation: "https://example.com/video.mp4",
				playerLocation: "https://example.com/player",
			},
		]
		const expectedVideoSitemapData = `
			<video:video>
				<video:title>Video title</video:title>
				<video:description>Video description</video:description>
				<video:thumbnail_loc>https://example.com</video:thumbnail_loc>
				<video:content_loc>https://example.com/video.mp4</video:content_loc>
				<video:player_loc>https://example.com/player</video:player_loc>
			</video:video>`
		expect(removeWhitespace(generateVideoSitemapData(videos))).toEqual(removeWhitespace(expectedVideoSitemapData))
	})

	it("should generate the uploader field properly when info is not set", () => {
		const videos: SitemapVideoEntry[] = [
			{
				title: "Video title",
				description: "Video description",
				thumbnailUrl: "https://example.com",
				url: "https://example.com/video.mp4",
				contentLocation: "https://example.com/video.mp4",
				playerLocation: "https://example.com/player",
				uploader: { name: "John Doe" },
			},
		]
		const expectedVideoSitemapData = `
			<video:video>
				<video:title>Video title</video:title>
				<video:description>Video description</video:description>
				<video:thumbnail_loc>https://example.com</video:thumbnail_loc>
				<video:content_loc>https://example.com/video.mp4</video:content_loc>
				<video:player_loc>https://example.com/player</video:player_loc>
				<video:uploader>John Doe</video:uploader>
			</video:video>`
		expect(removeWhitespace(generateVideoSitemapData(videos))).toEqual(removeWhitespace(expectedVideoSitemapData))
	})

	it("should return an empty string if no videos are provided", () => {
		expect(generateVideoSitemapData(undefined)).toBe("")
	})
})

describe("generateNewsSitemapData", () => {
	it("should generate news sitemap data with all properties properly set", () => {
		const news: SitemapNewsEntry[] = [
			{
				publication: {
					name: "Publication name",
					language: "en",
				},
				publicationDate: "2021-01-01",
				title: "News title",
			},
		]

		const expectedNewsSitemapData = `
			<news:news>
				<news:publication>
					<news:name>Publication name</news:name>
					<news:language>en</news:language>
				</news:publication>
				<news:publication_date>2021-01-01</news:publication_date>
				<news:title>News title</news:title>

			</news:news>`

		expect(removeWhitespace(generateNewsSitemapData(news))).toEqual(removeWhitespace(expectedNewsSitemapData))
	})

	it("should return an empty string if no news are provided", () => {
		expect(generateNewsSitemapData(undefined)).toBe("")
	})
})

describe("generateImageSitemapData", () => {
	it("should generate image sitemap data with all properties properly set", () => {
		const images: SitemapImageEntry[] = ["https://example.com/image.jpg"]

		const expectedImageSitemapData = `
			<image:image>
				<image:loc>https://example.com/image.jpg</image:loc>
			</image:image>`

		expect(removeWhitespace(generateImageSitemapData(images))).toEqual(removeWhitespace(expectedImageSitemapData))
	})

	it("should generate properly for multiple images", () => {
		const images: SitemapImageEntry[] = ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]

		const expectedImageSitemapData = `
			<image:image>
				<image:loc>https://example.com/image1.jpg</image:loc>
			</image:image>
			<image:image>
				<image:loc>https://example.com/image2.jpg</image:loc>
			</image:image>`

		expect(removeWhitespace(generateImageSitemapData(images))).toEqual(removeWhitespace(expectedImageSitemapData))
	})
	it("should return an empty string if no images are provided", () => {
		expect(generateImageSitemapData(undefined)).toBe("")
	})
})

describe("generateAlternateLinks", () => {
	it("should generate alternate links properly", () => {
		const links = [
			{ hreflang: "en", href: "https://example.com/en" },
			{ hreflang: "es", href: "https://example.com/es" },
		]

		const expectedAlternateLinks = `
			<xhtml:link rel="alternate" hreflang="en" href="https://example.com/en" />
			<xhtml:link rel="alternate" hreflang="es" href="https://example.com/es" />`

		expect(removeWhitespace(generateAlternateLinks(links))).toEqual(removeWhitespace(expectedAlternateLinks))
	})

	it("should return an empty string if no links are provided", () => {
		expect(generateAlternateLinks(undefined)).toBe("")
	})
})

describe("generateSitemapEntry", () => {
	it("should generate sitemap entry with all properties properly set", () => {
		const entry: SitemapEntry = {
			route: "https://example.com/page",
			lastmod: "2021-01-01",
			changefreq: "daily",
			priority: 0.8,
			alternateLinks: [
				{ hreflang: "en", href: "https://example.com/en/page" },
				{ hreflang: "es", href: "https://example.com/es/page" },
			],
			images: ["https://example.com/image.jpg"],
			news: [
				{
					publication: {
						name: "Publication name",
						language: "en",
					},
					publicationDate: "2021-01-01",
					title: "News title",
				},
			],
			videos: [
				{
					title: "Video title",
					description: "Video description",
					thumbnailUrl: "https://example.com",
					url: "https://example.com/video.mp4",
					contentLocation: "https://example.com/video.mp4",
					playerLocation: "https://example.com/player",
				},
			],
		}

		const expectedSitemapEntry = `
			<url>
				<loc>https://example.com/page</loc>
				<lastmod>2021-01-01</lastmod>
				<changefreq>daily</changefreq>
				<priority>0.8</priority>
				<xhtml:link rel="alternate" hreflang="en" href="https://example.com/en/page" />
				<xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/page" />
				<image:image>
					<image:loc>https://example.com/image.jpg</image:loc>
				</image:image>
				<news:news>
					<news:publication>
						<news:name>Publication name</news:name>
						<news:language>en</news:language>
					</news:publication>
					<news:publication_date>2021-01-01</news:publication_date>
					<news:title>News title</news:title>
				</news:news>
				<video:video>
					<video:title>Video title</video:title>
					<video:description>Video description</video:description>
					<video:thumbnail_loc>https://example.com</video:thumbnail_loc>
					<video:content_loc>https://example.com/video.mp4</video:content_loc>
					<video:player_loc>https://example.com/player</video:player_loc>
				</video:video>
			</url>`

		expect(removeWhitespace(generateSitemapEntry(entry))).toEqual(removeWhitespace(expectedSitemapEntry))
	})

	it("should generate sitemap entry with only required properties", () => {
		const entry = {
			route: "https://example.com/page",
		}

		const expectedSitemapEntry = `
			<url>
				<loc>https://example.com/page</loc>
			</url>`

		expect(removeWhitespace(generateSitemapEntry(entry))).toEqual(removeWhitespace(expectedSitemapEntry))
	})

	it("should return an empty string if no route is provided", () => {
		expect(generateSitemapEntry({ route: "" })).toBe("")
	})
})

describe("generateSitemap", () => {
	it("should generate a sitemap with a single entry properly", async () => {
		const expectedSitemap = removeWhitespace(`
			<?xml version="1.0" encoding="UTF-8"?>
			<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-video/1.1 http://www.google.com/schemas/sitemap-video/1.1/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap.xsd http://www.w3.org/TR/xhtml11/xhtml11_schema.html http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html" >
				<url>
					<loc>https://example.com/page1</loc>
				</url>
			</urlset>
					`)
		expect(
			removeWhitespace(
				await generateSitemap({
					routes: [
						{
							url: "/page1",
						},
					],
					domain: "https://example.com",
				})
			)
		).toEqual(expectedSitemap)
	})

	it("should ignore the url and use the sitemapEntries when it's provided for an entry", async () => {
		const expectedSitemap = removeWhitespace(`
			<?xml version="1.0" encoding="UTF-8"?>
			<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-video/1.1 http://www.google.com/schemas/sitemap-video/1.1/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap.xsd http://www.w3.org/TR/xhtml11/xhtml11_schema.html http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html" >
				<url>
					<loc>https://example.com/page2</loc>
				</url>
			</urlset>
					`)
		expect(
			removeWhitespace(
				await generateSitemap({
					routes: [
						{
							url: "/page1",
							sitemapEntries: [
								{
									route: "https://example.com/page2",
								},
							],
						},
					],
					domain: "https://example.com",
				})
			)
		).toEqual(expectedSitemap)
	})

	it("should ignore the url and use the sitemapEntries when it's provided for an entry even if the path is `*`", async () => {
		const expectedSitemap = removeWhitespace(`
			<?xml version="1.0" encoding="UTF-8"?>
			<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-video/1.1 http://www.google.com/schemas/sitemap-video/1.1/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap.xsd http://www.w3.org/TR/xhtml11/xhtml11_schema.html http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html" >
				<url>
					<loc>https://example.com/page2</loc>
				</url>
				<url>
					<loc>another-wildcard-route</loc>
				</url>
			</urlset>
					`)
		expect(
			removeWhitespace(
				await generateSitemap({
					routes: [
						{
							url: "*",

							sitemapEntries: [
								{
									route: "https://example.com/page2",
								},
								{
									route: "another-wildcard-route",
								},
							],
						},
					],
					domain: "https://example.com",
				})
			)
		).toEqual(expectedSitemap)
	})

	it("should ignore the url and use the sitemapEntries when it's provided for an entry and it should loop over all the entries and add all their additional properties", async () => {
		const expectedSitemap = removeWhitespace(`
			<?xml version="1.0" encoding="UTF-8"?>
			<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-video/1.1 http://www.google.com/schemas/sitemap-video/1.1/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap.xsd http://www.w3.org/TR/xhtml11/xhtml11_schema.html http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html" >
				<url>
					<loc>https://example.com/page2</loc>
				</url>
				<url>
					<loc>https://example.com/page3</loc>
					<xhtml:link rel="alternate" hreflang="en" href="https://example.com/en/page3" />
					<xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/page3" />
				</url>
			</urlset>
					`)
		expect(
			removeWhitespace(
				await generateSitemap({
					routes: [
						{
							url: "/page1",
							sitemapEntries: [
								{
									route: "https://example.com/page2",
								},
								{
									route: "https://example.com/page3",
									alternateLinks: [
										{ hreflang: "en", href: "https://example.com/en/page3" },
										{ hreflang: "es", href: "https://example.com/es/page3" },
									],
								},
							],
						},
					],
					domain: "https://example.com",
				})
			)
		).toEqual(expectedSitemap)
	})

	it("should generate sitemap for multiple entries when only urls are provided", async () => {
		const expectedSitemap = removeWhitespace(`
			<?xml version="1.0" encoding="UTF-8"?>
			<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-video/1.1 http://www.google.com/schemas/sitemap-video/1.1/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap.xsd http://www.w3.org/TR/xhtml11/xhtml11_schema.html http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html" >
				<url>
					<loc>https://example.com/page1</loc>
				</url>
				<url>
					<loc>https://example.com/page2</loc>
				</url>
			</urlset>
					`)
		expect(
			removeWhitespace(
				await generateSitemap({
					routes: [
						{
							url: "/page1",
						},
						{
							url: "/page2",
						},
					],
					domain: "https://example.com",
				})
			)
		).toEqual(expectedSitemap)
	})

	it("should ignore all routes that are in the ignore list", async () => {
		const expectedSitemap = removeWhitespace(`
			<?xml version="1.0" encoding="UTF-8"?>
			<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-video/1.1 http://www.google.com/schemas/sitemap-video/1.1/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap.xsd http://www.w3.org/TR/xhtml11/xhtml11_schema.html http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html" >
				<url>
					<loc>https://example.com/page2</loc>
				</url>
			</urlset>
					`)
		expect(
			removeWhitespace(
				await generateSitemap({
					routes: [
						{
							url: "/page1",
						},
						{
							url: "/page2",
						},
					],
					domain: "https://example.com",
					ignore: ["/page1"],
				})
			)
		).toEqual(expectedSitemap)
	})

	it("should ignore wildcard routes that are in the ignore list", async () => {
		const expectedSitemap = removeWhitespace(`
			<?xml version="1.0" encoding="UTF-8"?>
			<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-video/1.1 http://www.google.com/schemas/sitemap-video/1.1/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap.xsd http://www.w3.org/TR/xhtml11/xhtml11_schema.html http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html" >

			</urlset>
					`)
		expect(
			removeWhitespace(
				await generateSitemap({
					routes: [
						{
							url: "/page1",
						},
						{
							url: "/page2",
						},
					],
					domain: "https://example.com",
					ignore: ["/page*"],
				})
			)
		).toEqual(expectedSitemap)
	})

	it("should append / if the route doesn't start with it", async () => {
		const expectedSitemap = removeWhitespace(`
			<?xml version="1.0" encoding="UTF-8"?>
			<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-video/1.1 http://www.google.com/schemas/sitemap-video/1.1/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap.xsd http://www.w3.org/TR/xhtml11/xhtml11_schema.html http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html" >
				<url>
					<loc>https://example.com/page1</loc>
				</url>
			</urlset>
					`)
		expect(
			removeWhitespace(
				await generateSitemap({
					routes: [
						{
							url: "page1",
						},
					],
					domain: "https://example.com",
				})
			)
		).toEqual(expectedSitemap)
	})

	it("should work if sitemapEntries is an object instead of an array", async () => {
		const expectedSitemap = removeWhitespace(`
			<?xml version="1.0" encoding="UTF-8"?>
			<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-video/1.1 http://www.google.com/schemas/sitemap-video/1.1/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap.xsd http://www.w3.org/TR/xhtml11/xhtml11_schema.html http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html" >
				<url>
					<loc>https://example.com/page2</loc>
				</url>
			</urlset>
					`)
		expect(
			removeWhitespace(
				await generateSitemap({
					routes: [
						{
							url: "/page1",
							sitemapEntries: {
								route: "https://example.com/page2",
							},
						},
					],
					domain: "https://example.com",
				})
			)
		).toEqual(expectedSitemap)
	})

	it("should transform all urls properly if urlTransformer is passed in", async () => {
		const expectedSitemap = removeWhitespace(`
			<?xml version="1.0" encoding="UTF-8"?>
			<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-video/1.1 http://www.google.com/schemas/sitemap-video/1.1/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap.xsd http://www.w3.org/TR/xhtml11/xhtml11_schema.html http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html" >
				<url>
					<loc>https://example.com/page1test</loc>
				</url>
				<url>
					<loc>https://example.com/page2test</loc>
				</url>
			</urlset>
					`)
		expect(
			removeWhitespace(
				await generateSitemap({
					routes: [
						{
							url: "/page1",
						},
						{
							url: "/page2",
						},
					],
					domain: "https://example.com",
					urlTransformer: (url) => `${url}test`,
				})
			)
		).toEqual(expectedSitemap)
	})
})
