#  @forge42/seo-tools
![GitHub Repo stars](https://img.shields.io/github/stars/forge42dev/seo-tools?style=social)
![npm](https://img.shields.io/npm/v/@forge42/seo-tools?style=plastic)
![GitHub](https://img.shields.io/github/license/forge42dev/seo-tools?style=plastic)
![npm](https://img.shields.io/npm/dy/@forge42/seo-tools?style=plastic)
![npm](https://img.shields.io/npm/dw/@forge42/seo-tools?style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/forge42dev/seo-tools?style=plastic)

SEO Tools is a collection of tools to help you with your SEO efforts. It includes tools to help you with sitemaps, robots.txt, canonical links, structured data, and metadata. The package is split into smaller submodules so you can only import the parts you need, in spirit of good SEO we want your bundle as small as possible.


## Installation

Use the package manager of your choice to install the package.

```bash
npm install @forge42/seo-tools
```

## Usage

The package is split into smaller submodules so you can only import the parts you need, in spirit of good SEO we want your bundle as
small as possible.

```javascript
import { generateCanonicalLinks } from '@forge42/seo-tools/canonical';
```

This means we do not include a barrel export and you need to import the specific module you need. We do this so only the parts you need
are actually used in your bundle as mentioned above. Now we will go over each subimport and what they do.

## Canonical & alternate links

The canonical link is a link that tells search engines that a certain URL represents the master copy of a page. This is useful for SEO because it helps search engines avoid duplicate content issues and tell it for alternative languages/content.

The transformer function will return the canonical url and the current alternative, the alternative can be a string, object or anything else that you can pass to the transformer.

```typescript
import { generateCanonicalLinks } from '@forge42/seo-tools/canonical';

const canonicalLinks = generateCanonicalLinks({
	// Used to generate the final url, it passes your alternatives, url and domain to the function for you to create whatever link you need
	urlTransformer: ({ url, domain, alternative, canonicalUrl }) => `${domain}/${url}?lng=${alternative}`,
	// Used to generate the final attributes
	altAttributesTransformer: ({ url, domain, alternative, canonicalUrl }) => attributes,
	// This takes a generic type and returns it in your transformers
	alternatives: ["de", "es"],
	domain: "https://example.com",
	url: "current-url",
	// Used to add additional attributes
	canonicalAttributes: {
		// These are included by default but you can add additional attributes
		rel: 'canonical',
		// These are included by default but you can add additional attributes
		href: 'https://example.com'
	}
},
// Second argument tells the function if it should generate the output as string or as an array of json objects
false
);

console.log(canonicalLinks);
// <link rel="canonical" href="https://example.com/current-url">
// <link rel="alternate" href="https://example.com/current-url?lng=de" hreflang="de">
// <link rel="alternate" href="https://example.com/current-url?lng=es" hreflang="es">
// or as an array of json objects
// [
// 	{ rel: 'canonical', href: 'https://example.com/current-url' },
// 	{ rel: 'alternate', href: 'https://example.com/current-url?lng=de', hreflang: 'de' },
// 	{ rel: 'alternate', href: 'https://example.com/current-url?lng=es', hreflang: 'es' }
// ]
```

## Robots.txt

The robots.txt file is a file that tells search engines which pages they can and cannot index. This is useful for SEO because it helps search engines avoid indexing pages that you don't want them to index.

```typescript
import { generateRobotsTxt } from '@forge42/seo-tools/robots';

const robotsTxt = generateRobotsTxt([
	{
		userAgent: '*',
		allow: ['/'],
		disallow: ['/admin', '/login'],
		crawlDelay: 1,
		sitemap: 'https://example.com/sitemap.xml'
	},
	{
		userAgent: 'Googlebot',
		allow: ['/'],
		disallow: ['/admin', '/login'],
		crawlDelay: 1,
		sitemap: 'https://example.com/sitemap.xml'
	}
]
);

console.log(robotsTxt);
// User-agent: *
// Allow: /
// Disallow: /admin
// Disallow: /login
// Crawl-delay: 1
// Sitemap: https://example.com/sitemap.xml
// User-agent: Googlebot
// Allow: /
// Disallow: /admin
// Disallow: /login
// Crawl-delay: 1
// Sitemap: https://example.com/sitemap.xml
```

## Sitemap.xml

The sitemap.xml file is a file that tells search engines which pages they should index. This is useful for SEO because it helps search engines find all of the pages on your site.

```typescript
import { generateSitemap } from '@forge42/seo-tools/sitemap';

const sitemap = generateSitemap(
	{
		domain: "https://example.com",
		// Defines the routes you want to exclude from the sitemap (useful if routes are dynamic or auto-generated)
		ignore: ["/dashboard*"]
		// Defines the routes you want to include in the sitemap
	  routes: [
			{ url: "/", lastmod: "2020-02-02", changefreq: "monthly", priority: 0.8 },
			{ url: "/about", lastmod: "2020-02-02", changefreq: "monthly", priority: 0.8 },
			{ url: "/contact", lastmod: "2020-02-02", changefreq: "monthly", priority: 0.8 }
		],
		// This is a transformer that allows you to generate the url you need
		transformer: ({ url, domain }) => `${domain}${url}`

	}
);
console.log(sitemap);

// <?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// 	<url>
// 		<loc>https://example.com/</loc>
// 		<lastmod>2020-02-02</lastmod>
// 		<changefreq>monthly</changefreq>
// 		<priority>0.8</priority>
// 	</url>
// 	<url>
// 		<loc>https://example.com/about</loc>
// 		<lastmod>2020-02-02</lastmod>
// 		<changefreq>monthly</changefreq>
// 		<priority>0.8</priority>
// 	</url>
// 	<url>
// 		<loc>https://example.com/contact</loc>
// 		<lastmod>2020-02-02</lastmod>
// 		<changefreq>monthly</changefreq>
// 		<priority>0.8</priority>
// 	</url>
// </urlset>
```

## Sitemap index

The sitemap index is a file that tells search engines where to find all of the sitemaps on your site. This is useful for SEO because it helps search engines find all of the sitemaps on your site.

```typescript
import { generateSitemapIndex } from '@forge42/seo-tools/sitemap';

const sitemapIndex = generateSitemapIndex([
	{
		url: 'https://example.com/sitemap1.xml',
		lastmod: '2022-01-01'
	},
	{
		url: 'https://example.com/sitemap2.xml',
		lastmod: '2022-01-01'
	}
]
);

console.log(sitemapIndex);

// <?xml version="1.0" encoding="UTF-8"?>
// <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// 	<sitemap>
// 		<loc>https://example.com/sitemap1.xml</loc>
// 		<lastmod>2022-01-01</lastmod>
// 	</sitemap>
// 	<sitemap>
// 		<loc>https://example.com/sitemap2.xml</loc>
// 		<lastmod>2022-01-01</lastmod>
// 	</sitemap>
// </sitemapindex>

```
## Structured data

Structured data is a way to provide search engines with information about the content on your site. This is useful for SEO because it helps search engines understand the content on your site and display it in search results.

To better learn about structured data you can find all the information you will need here:
https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data

We offer the following utilities to generate structured data:
- breadcrumb - ``` import { breadcrumbs } from '@forge42/seo-tools/structured-data/breadcrumb'; ```
- article - ``` import { article } from '@forge42/seo-tools/structured-data/article'; ```
- car - ``` import { car } from '@forge42/seo-tools/structured-data/car'; ```
- course - ``` import { course } from '@forge42/seo-tools/structured-data/course'; ```
- dataset - ``` import { dataset } from '@forge42/seo-tools/structured-data/dataset'; ```
- discussion-forum - ``` import { discussionForum } from '@forge42/seo-tools/structured-data/discussion-forum'; ```
- employer-rating - ``` import { employerRating } from '@forge42/seo-tools/structured-data/employer-rating'; ```
- event - ``` import { event } from '@forge42/seo-tools/structured-data/event'; ```
- faq - ``` import { faq } from '@forge42/seo-tools/structured-data/faq'; ```
- image - ``` import { image } from '@forge42/seo-tools/structured-data/image'; ```
- item-list - ``` import { itemList } from '@forge42/seo-tools/structured-data/item-list'; ```
- job-posting - ``` import { jobPosting } from '@forge42/seo-tools/structured-data/job-posting'; ```
- occupation - ``` import { occupation } from '@forge42/seo-tools/structured-data/occupation'; ```
- organization - ``` import { organization } from '@forge42/seo-tools/structured-data/organization'; ```
- product - ``` import { product } from '@forge42/seo-tools/structured-data/product'; ```
- profile - ``` import { profile } from '@forge42/seo-tools/structured-data/profile'; ```
- qa - ``` import { qa } from '@forge42/seo-tools/structured-data/qa'; ```
- recipe - ``` import { recipe } from '@forge42/seo-tools/structured-data/recipe'; ```
- software-app - ``` import { softwareApp } from '@forge42/seo-tools/structured-data/software-app'; ```
- video - ``` import { video } from '@forge42/seo-tools/structured-data/video'; ```

```typescript
import { article } from '@forge42/seo-tools/structured-data/article';

const structuredData = article({
	"@type": "Article",
	"headline": "Article headline",
	"image": "https://example.com/image.jpg",
	"datePublished": "2022-01-01",
});
// Set it somehow in your html
<head>
	<script type="application/ld+json">
		{structuredData}
	</script>
</head>
```

The example above will show an article when a relevant google search is made on top of the search results.

# Remix.run / React Router v7

We have a dedicated module for Remix.run/React Router v7 that will help you with SEO generation. It's all located in the remix module and is compatible
with any runtime you are using.

## Metadata

Meta data is a way to provide search engines with information about the content on your site. This is useful for SEO because it helps search engines understand the content on your site and display it in search results.

We have a lightweight utility that helps you avoid writing the same tags multiple times for different platforms. It will generate the twitter & og title and description tags for you. You can also add structured data to the meta tags like in the example below.

```typescript
import { generateMeta } from "@forge42/seo-tools/remix/metadata";
import { article } from "@forge42/seo-tools/structured-data/article";
import { course } from "@forge42/seo-tools/structured-data/course";

export const meta: MetaFunction = () => {
	// This utility will under the hood generate the twitter & og title and description tags for you.
  const meta = generateMeta({
    title: "test",
    description: "test",
    url: "test",
  }, [
    {
      "script:ld+json": article({
        "@type": "Article",
        headline: "Article headline",
        image: "https://example.com/image.jpg",
        datePublished: "2021-01-01T00:00:00Z",
      })
    },
    {
      "script:ld+json": course({
        "@type": "Course",
        name: "Course name",
        description: "Course description",
      })
    }
  ])
  return meta
};
```

## Sitemap

This sitemap utility is a superset of the sitemap utility above. It will generate the sitemap for you based on all your Remix routes. It ignores
by default the root route, anything with sitemap in the name and robots.txt. You can also pass a custom transformer to generate the url you need.
Refer to the sitemap utility above for more information.

```typescript
// routes/sitemap[.]xml.ts
import { generateRemixSitemap } from "@forge42/seo-tools/remix/sitemap"

export const loader = async() => {
	const sitemap = await generateRemixSitemap({
		 domain: "https://example.com",

	})

	return new Response(sitemap, {
		headers: {
			"Content-Type": "application/xml",
		},
	})
}
```

### Handling dynamic routes

If you want to generate different entries in the sitemap by creating dynamic routes at runtime you can use the following approach:
```typescript
// routes/sitemap[.]xml.ts

import { generateRemixSitemap } from "@forge42/seo-tools/remix/sitemap"

export type SitemapData = {
	lang: Language
}

export const loader = async ({ request }) => {
	const sitemap = await generateRemixSitemap({
		// This gets passed to every handler
		 sitemapData: {
			 "lang": request.query.get("lng") as Language
		 } satisfies SitemapData
	})

	return new Response(sitemap, {
		headers: {
			"Content-Type": "application/xml",
		},
	})
}
// routes/index.tsx
import type { SitemapHandle } from "@forge42/seo-tools/remix/sitemap";
import type { SitemapData } from "~/routes/sitemap[.]xml";
// This utility trumps the default url generation so it's important to at least return the current route from here.
export const handle: SitemapHandle<SitemapData> = {
	sitemap: async (domain, url, { lang }) => {
		const alternateLanguages = supportedLanguages.filter((language) => language !== lang)
		return [
			{
				route: `${domain}${url}?lng=${lang}`,
				changefreq: "monthly",
				priority: 1.0,
				// Create alternate links for each language
				alternateLinks: alternateLanguages.map((lang) => ({
					hreflang: lang,
					href: `${domain}${url}?lng=${lang}`,
				})),
			},
		]
	},
}
```

### Handling sitemap index + dynamic sitemaps + robots.txt

If you want to generate different sitemaps based on the language you can use the following approach:
```typescript
// routes/sitemap.$lang[.]xml.ts
import type { LoaderFunctionArgs } from "@remix-run/node"
import { generateRemixSitemap } from "@forge42/seo-tools/remix/sitemap"
// Optionally import routes from the remix build to be consumed by the sitemap generator if the default one throws an error
import { routes } from "virtual:remix/server-build";
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
	const domain = `${new URL(request.url).origin}`

	const sitemap = await generateRemixSitemap({
		// Domain to append urls to
		domain,
		routes,
		// Ignores all dashboard routes
		ignore: ["/status"],
		// Transforms the url before adding it to the sitemap
		urlTransformer: (url) => `${url}?lng=${params.lang}`,
		sitemapData: {
			lang: params.lang,
		},
	})

	return new Response(sitemap, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	})
}


// routes/sitemap-index[.]xml.ts
import type { LoaderFunctionArgs } from "@remix-run/node"
import { generateSitemapIndex } from "@forge42/seo-tools/sitemap"

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const domain = new URL(request.url).origin
	const sitemaps = generateSitemapIndex([
		{
			url: `${domain}/sitemap/en.xml`,
			lastmod: "2024-07-17",
		},
		{
			url: `${domain}/sitemap/bs.xml`,
			lastmod: "2024-07-17",
		},
	])

	return new Response(sitemaps, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	})
}
// routes/robots[.]txt.ts
import type { LoaderFunctionArgs } from "@remix-run/node"
import { generateRobotsTxt } from "@forge42/seo-tools/robots"

export async function loader({ request }: LoaderFunctionArgs) {
	const isProductionDeployment = process.env.DEPLOYMENT_ENV === "production"
	const domain = new URL(request.url).origin
	const robotsTxt = generateRobotsTxt([
		{
			userAgent: "*",
			[isProductionDeployment ? "allow": "disallow"]:["/"],
			sitemap: [`${domain}/sitemap-index.xml`],
		},
	])

	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain",
		},
	})
}
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Support

If you like the project and want to support it you can sponsor it on GitHub, or even better, open up PR's and contribute to the project.