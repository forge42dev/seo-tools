import type { Route, RouteManifest, ServerRoute } from "@remix-run/server-runtime/dist/routes.js"
import { type SitemapEntry, type SitemapRoute, generateSitemap } from "../sitemap"

export type SitemapFunctionReturnData = SitemapEntry | SitemapEntry[]

export type SitemapFunctionReturn = Promise<SitemapFunctionReturnData> | SitemapFunctionReturnData

export interface SitemapHandle<T> {
	sitemap: SitemapFunction<T>
	[key: string]: unknown
}

export type SitemapFunction<T> = (
	domain: string,
	url: string,
	sitemapData: T
) => Promise<SitemapFunctionReturnData> | SitemapFunctionReturnData

const convertRemixPathToUrl = (routes: RouteManifest<Route>, route: Route) => {
	let currentRoute: Route | null = route
	const path = []

	while (currentRoute) {
		path.push(currentRoute.path)
		if (!currentRoute.parentId) break
		if (!routes[currentRoute.parentId]) break
		currentRoute = routes[currentRoute.parentId]
	}
	const output = path.reverse().filter(Boolean).join("/")
	return output === "" ? "/" : output
}

const createExtendedRoutes = (routes: RouteManifest<ServerRoute>) => {
	return Object.values(routes).map((route) => {
		return {
			...route,
			url: convertRemixPathToUrl(routes, route),
		}
	})
}
const generateRemixSitemapRoutes = async ({
	domain,
	sitemapData,
}: {
	domain: string
	sitemapData?: unknown
}) => {
	// @ts-expect-error - This import exists but is not picked up by the typescript compiler because it's a remix internal
	const { routes } = await import("virtual:remix/server-build").catch(() => {
		throw new Error(
			"Could not find the remix server build. Make sure you have Remix running on Vite and not in SPA mode. Otherwise use the generateSitemap utility."
		)
	})
	// Add the url to each route
	const extendedRoutes = createExtendedRoutes(routes)

	const transformedRoutes = await Promise.all(
		extendedRoutes.map(async (route) => {
			const url = route.url
			// We don't want to include the root route in the sitemap
			if (route.id === "root") return
			// If the route has a module, get the handle
			const handle = route.module.handle
			// If the route has a sitemap function, call it and return the sitemap entries
			if (handle && typeof handle === "object" && "sitemap" in handle && typeof handle.sitemap === "function") {
				// Type the function just in case
				const sitemap = handle.sitemap as SitemapFunction<unknown>
				const sitemapEntries: SitemapFunctionReturnData = await sitemap(domain, url, sitemapData)
				return { url, sitemapEntries, id: route.id }
			}
			// Otherwise, just return the route as a single entry
			return { url, sitemapEntries: null, id: route.id }
		})
	)
	// Filter out any undefined routes
	return transformedRoutes.filter(Boolean) as SitemapRoute[]
}

export interface RemixSitemapInfo {
	/**
	 * The domain to append the urls to
	 * @example "https://example.com"
	 */
	domain: string
	/**
	 * Any data you want to pass to the sitemap functions used in the handle exports
	 * @example { lastUpdated: new Date() }
	 */
	sitemapData?: unknown
	/**
	 * An array of patterns to ignore (e.g. ["/status"])
	 * @example ["/status"]
	 */
	ignore?: string[]
	/**
	 * A function to transform the url before adding it to the domain
	 * @example (url) => url.replace(/\/$/, "")
	 */
	urlTransformer?: (url: string) => string
}

/**
 * Helper method used to generate a sitemap from all the remix routes in the project.
 *
 * By default ignores all xml and txt files and any route that matches the pattern "sitemap*"
 *
 *
 * @param sitemapInfo- Object containing the domain, sitemapData, ignore and urlTransformer
 * @throws Error if the remix server build is not found
 * @returns Sitemap string to be passed back to the response.
 */
export const generateRemixSitemap = async (sitemapInfo: RemixSitemapInfo) => {
	const { domain, sitemapData, ignore, urlTransformer } = sitemapInfo
	const routes = await generateRemixSitemapRoutes({ domain, sitemapData })
	return generateSitemap({ domain, routes, ignore, urlTransformer })
}
