import { type RobotsEntry, generateRobotsTxt } from "./robots"

describe("generateRobotsTxt", () => {
	it("should generate a robots.txt file", () => {
		const policies: RobotsEntry[] = [
			{
				userAgent: "*",
				allow: ["/public"],
				disallow: ["/admin"],
				sitemap: ["/sitemap.xml"],
			},
		]
		const expectedRobotsTxt = `User-agent: *
Allow: /public
Disallow: /admin
Sitemap: /sitemap.xml`
		expect(generateRobotsTxt(policies)).toBe(expectedRobotsTxt)
	})

	it("should generate a robots.txt file with a crawl delay", () => {
		const policies: RobotsEntry[] = [
			{
				userAgent: "*",
				disallow: ["/admin"],
				sitemap: ["/sitemap.xml"],
				allow: ["/public"],
				crawlDelay: 1,
			},
		]
		const expectedRobotsTxt = `User-agent: *
Disallow: /admin
Sitemap: /sitemap.xml
Allow: /public
Crawl-delay: 1`
		expect(generateRobotsTxt(policies)).toBe(expectedRobotsTxt)
	})

	it("should generate a robots.txt file with multiple user agents", () => {
		const policies: RobotsEntry[] = [
			{
				userAgent: "Google",
				disallow: ["/admin"],
			},
			{
				userAgent: "Bing",
				disallow: ["/public"],
			},
		]
		const expectedRobotsTxt = `User-agent: Google
Disallow: /admin
User-agent: Bing
Disallow: /public`
		expect(generateRobotsTxt(policies)).toBe(expectedRobotsTxt)
	})

	it("should generate a robots.txt file with multiple user agents and policies", () => {
		const policies: RobotsEntry[] = [
			{
				userAgent: "Google",
				disallow: ["/admin"],
				allow: ["/public"],
			},
			{
				userAgent: "Bing",
				disallow: ["/public"],
			},
		]
		const expectedRobotsTxt = `User-agent: Google
Disallow: /admin
Allow: /public
User-agent: Bing
Disallow: /public`
		expect(generateRobotsTxt(policies)).toBe(expectedRobotsTxt)
	})
})
