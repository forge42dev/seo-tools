import { generateRemixSitemap } from "@forge42/seo-tools/remix/sitemap"
// @ts-expect-error
import { routes } from "virtual:remix/server-build"
export const loader = async() => {
	const sitemap = await generateRemixSitemap({
		 domain: "https://example.com",
		 routes
	})

	return new Response(sitemap, {
		headers: {
			"Content-Type": "application/xml",
		},
	})
}